globalThis.Chronos = function Chronos(hook) {
"use strict";

// ============================================
// LIBRARY - Chronos: In-Game Time System
// ============================================
// Direct-tracking time system for AI Dungeon.
// All time state is stored in state.chronos and advanced each turn.
// Uses the library-centric hook pattern: all logic lives here,
// and each lifecycle file just calls Chronos("input"/"context"/"output").
//
// Features:
// - Configurable time pacing (minutes per turn)
// - Day/night cycle with 6 time periods
// - Weekday and calendar tracking with leap years
// - Season-aware weather with Markov-chain transitions
// - Temperature simulation with smooth drift
// - Story card-based settings (Chronos Settings card)
// - BetterScripts widget integration
//
// Commands (by category):
//   Status: :time, :date, :weather, :chronos
//   Time Control: :advance, :sleep, :settime, :setdate, :pause, :resume
//   Weather: :setweather
//   System: :chronos help, :chronos reset
//   Aliases: :timeskip/:skip

if (!globalThis.state || typeof state !== "object") return;

// ============================================
// STATE INITIALIZATION
// ============================================
// Initializes the persistent state.chronos object on the first turn.
// Uses nullish coalescing (??) so existing state is never overwritten.
//
// Structure:
//   minute/hour/day/month/year - Current in-game date and time
//   config                     - User-configurable settings (synced from story card)
//   weather                    - Current weather condition, temperature, and drift target
//   lastActionCount            - Tracks the previous turn to detect retries
//   initialized                - Whether the first-turn setup has run
//   paused                     - Whether automatic time advancement is suspended

state.chronos = state.chronos ?? {
  minute: 0,
  hour: 7,
  day: 1,
  month: 6,
  year: 2026,
  config: {
    minutesPerTurn: 2,
    use12HourFormat: true,
    useBetterScripts: false,
    showTimeInOutput: true,
    weatherEnabled: true,
    enabled: true,
    weatherChangeCooldown: 15,
    temperatureUnit: 'F',
    wakeHour: 7
  },
  weather: {
    current: 'clear',
    temperature: 70,
    lastChange: 0,
    targetTemp: null
  },
  lastActionCount: -1,
  initialized: false,
  paused: false
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================
// These helpers encode messages in the [[BD:...:BD]] protocol format
// so the BetterDungeon browser extension can parse them from story output.

// Serializes an arbitrary message object into the BetterScripts protocol wrapper.
// @param {Object} msg - The message payload to encode.
// @returns {string} The protocol-wrapped JSON string.
function bdMessage(msg) { return \`[[BD:\${JSON.stringify(msg)}:BD]]\`; }

// Creates (or updates) a BetterScripts widget by ID.
// @param {string} id  - Unique widget identifier (re-using an ID updates the existing widget).
// @param {Object} cfg - Widget configuration (type, label, value, color, align, order, etc.).
// @returns {string} The protocol-wrapped widget creation message.
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// ============================================
// CONSTANTS
// ============================================

// Standard weekday names.
const DEFAULT_WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Standard Gregorian months with their day counts (February adjusted for leap years at runtime).
const DEFAULT_MONTHS = [
  { name: 'January', days: 31 }, { name: 'February', days: 28 },
  { name: 'March', days: 31 }, { name: 'April', days: 30 },
  { name: 'May', days: 31 }, { name: 'June', days: 30 },
  { name: 'July', days: 31 }, { name: 'August', days: 31 },
  { name: 'September', days: 30 }, { name: 'October', days: 31 },
  { name: 'November', days: 30 }, { name: 'December', days: 31 }
];

// The six time-of-day periods that divide a 24-hour clock.
// Each entry has a display name, emoji icon, and the hour range [start, end).
const TIME_PERIODS = [
  { name: 'Midnight', icon: '\\u{1F311}', start: 0, end: 4 },
  { name: 'Dawn', icon: '\\u{1F305}', start: 4, end: 6 },
  { name: 'Morning', icon: '\\u{2600}\\u{FE0F}', start: 6, end: 12 },
  { name: 'Afternoon', icon: '\\u{1F324}\\u{FE0F}', start: 12, end: 17 },
  { name: 'Evening', icon: '\\u{1F306}', start: 17, end: 21 },
  { name: 'Night', icon: '\\u{1F319}', start: 21, end: 24 }
];

// Seasons mapped by the month numbers they contain (1-indexed).
const SEASONS = [
  { name: 'Spring', months: [3, 4, 5] },
  { name: 'Summer', months: [6, 7, 8] },
  { name: 'Autumn', months: [9, 10, 11] },
  { name: 'Winter', months: [12, 1, 2] }
];

// All supported weather conditions with their display icon and human-readable label.
const WEATHER_CONDITIONS = {
  clear: { icon: '\\u{2600}\\u{FE0F}', label: 'Clear skies' },
  partly_cloudy: { icon: '\\u{26C5}', label: 'Partly cloudy' },
  cloudy: { icon: '\\u{2601}\\u{FE0F}', label: 'Cloudy' },
  overcast: { icon: '\\u{2601}\\u{FE0F}', label: 'Overcast' },
  light_rain: { icon: '\\u{1F326}\\u{FE0F}', label: 'Light rain' },
  rain: { icon: '\\u{1F327}\\u{FE0F}', label: 'Rain' },
  heavy_rain: { icon: '\\u{1F327}\\u{FE0F}', label: 'Heavy rain' },
  thunderstorm: { icon: '\\u{26C8}\\u{FE0F}', label: 'Thunderstorm' },
  light_snow: { icon: '\\u{1F328}\\u{FE0F}', label: 'Light snow' },
  snow: { icon: '\\u{2744}\\u{FE0F}', label: 'Snow' },
  heavy_snow: { icon: '\\u{2744}\\u{FE0F}', label: 'Heavy snow' },
  fog: { icon: '\\u{1F32B}\\u{FE0F}', label: 'Fog' },
  windy: { icon: '\\u{1F4A8}', label: 'Windy' }
};

// Markov-chain weather transition table.
// Keyed by current condition, then by season. Each entry is [nextCondition, weight].
// Higher weight = more likely to transition to that condition.
const WEATHER_TRANSITIONS = {
  clear: {
    Spring: [['clear',4],['partly_cloudy',3],['light_rain',1],['windy',1]],
    Summer: [['clear',5],['partly_cloudy',2],['thunderstorm',1]],
    Autumn: [['clear',3],['partly_cloudy',3],['cloudy',2],['fog',1]],
    Winter: [['clear',3],['partly_cloudy',2],['cloudy',2],['light_snow',1],['fog',1]]
  },
  partly_cloudy: {
    Spring: [['clear',3],['partly_cloudy',3],['cloudy',2],['light_rain',1]],
    Summer: [['clear',3],['partly_cloudy',3],['cloudy',1],['thunderstorm',1]],
    Autumn: [['clear',2],['partly_cloudy',3],['cloudy',3],['light_rain',1]],
    Winter: [['clear',2],['partly_cloudy',3],['cloudy',3],['light_snow',1]]
  },
  cloudy: {
    Spring: [['partly_cloudy',2],['cloudy',3],['overcast',2],['light_rain',2]],
    Summer: [['partly_cloudy',3],['cloudy',3],['thunderstorm',2]],
    Autumn: [['partly_cloudy',2],['cloudy',3],['overcast',2],['rain',1],['fog',1]],
    Winter: [['partly_cloudy',2],['cloudy',3],['overcast',2],['light_snow',2]]
  },
  overcast: {
    Spring: [['cloudy',3],['overcast',3],['light_rain',2],['rain',1]],
    Summer: [['cloudy',3],['overcast',2],['heavy_rain',1],['thunderstorm',2]],
    Autumn: [['cloudy',2],['overcast',3],['rain',2],['fog',1]],
    Winter: [['cloudy',2],['overcast',3],['snow',2],['light_snow',2]]
  },
  light_rain: {
    Spring: [['partly_cloudy',2],['cloudy',2],['light_rain',3],['rain',2]],
    Summer: [['partly_cloudy',2],['light_rain',3],['rain',2],['thunderstorm',1]],
    Autumn: [['cloudy',2],['light_rain',3],['rain',3]],
    Winter: [['cloudy',2],['light_rain',2],['light_snow',3]]
  },
  rain: {
    Spring: [['light_rain',3],['rain',3],['heavy_rain',1],['cloudy',2]],
    Summer: [['light_rain',2],['rain',3],['heavy_rain',2],['thunderstorm',2]],
    Autumn: [['light_rain',2],['rain',4],['heavy_rain',2]],
    Winter: [['light_rain',2],['rain',2],['snow',2],['cloudy',2]]
  },
  heavy_rain: {
    Spring: [['rain',4],['heavy_rain',2],['overcast',2]],
    Summer: [['rain',3],['heavy_rain',2],['thunderstorm',3]],
    Autumn: [['rain',4],['heavy_rain',3],['overcast',2]],
    Winter: [['rain',3],['heavy_snow',2],['overcast',2]]
  },
  thunderstorm: {
    Spring: [['rain',3],['heavy_rain',2],['overcast',3]],
    Summer: [['rain',2],['heavy_rain',2],['thunderstorm',2],['partly_cloudy',2]],
    Autumn: [['rain',4],['overcast',3],['cloudy',2]],
    Winter: [['heavy_snow',3],['overcast',3],['snow',2]]
  },
  light_snow: {
    Spring: [['cloudy',3],['light_rain',3],['light_snow',2]],
    Summer: [['cloudy',4],['partly_cloudy',4]],
    Autumn: [['cloudy',3],['light_snow',3],['snow',2]],
    Winter: [['light_snow',3],['snow',3],['cloudy',2]]
  },
  snow: {
    Spring: [['light_snow',4],['cloudy',3],['snow',2]],
    Summer: [['light_rain',4],['cloudy',4]],
    Autumn: [['light_snow',3],['snow',3],['overcast',2]],
    Winter: [['snow',4],['heavy_snow',2],['light_snow',2],['overcast',1]]
  },
  heavy_snow: {
    Spring: [['snow',4],['overcast',3],['light_snow',2]],
    Summer: [['rain',4],['cloudy',4]],
    Autumn: [['snow',4],['overcast',3]],
    Winter: [['heavy_snow',3],['snow',4],['overcast',2]]
  },
  fog: {
    Spring: [['partly_cloudy',3],['cloudy',3],['fog',2]],
    Summer: [['clear',3],['partly_cloudy',3],['fog',1]],
    Autumn: [['cloudy',3],['fog',3],['overcast',2]],
    Winter: [['cloudy',3],['fog',3],['light_snow',1],['overcast',2]]
  },
  windy: {
    Spring: [['clear',3],['partly_cloudy',2],['windy',2],['cloudy',1]],
    Summer: [['clear',3],['partly_cloudy',3],['windy',1]],
    Autumn: [['partly_cloudy',3],['cloudy',2],['windy',2]],
    Winter: [['cloudy',3],['light_snow',2],['windy',2]]
  }
};

// Maps time-unit keywords (singular and plural) to their equivalent in minutes.
// Used by the :advance command to convert "3 hours" into 180 minutes.
const UNIT_TO_MINUTES = { minute: 1, minutes: 1, hour: 60, hours: 60, day: 1440, days: 1440, week: 10080, weeks: 10080, month: 43200, months: 43200, year: 525600, years: 525600 };

// Baseline temperature ranges (in Fahrenheit) for each season.
// calcTargetTemp() picks a random value in this range and applies weather/time modifiers.
const SEASON_TEMPS = {
  Winter: { low: 20, high: 42 },
  Spring: { low: 45, high: 68 },
  Summer: { low: 65, high: 95 },
  Autumn: { low: 40, high: 65 }
};

// Default entry text for the "Chronos Settings" story card.
// Players edit the values after each colon to configure the system.
const SETTINGS_CARD_ENTRY = '--- General ---\\n> Enabled: true\\n> Minutes Per Turn: 2\\n\\n--- Display ---\\n> 12-Hour Format: true\\n> Show Time In Output: true\\n> Use BetterScripts: false\\n\\n--- Weather ---\\n> Weather Enabled: true\\n> Weather Change Cooldown: 15\\n> Temperature Unit: F\\n\\n--- Clock ---\\n> Wake Hour: 7\\n> Current Time: 7:00 AM\\n> Current Date: June 1, 2026';

// Description shown on the Chronos Settings story card.
const SETTINGS_CARD_DESCRIPTION = 'Chronos time system settings. Organized by category. Edit the values after each colon to configure. Time and date update automatically.';

// Default entry text for the "Chronos Commands" story card (in-game reference).
const COMMANDS_CARD_ENTRY = '--- Status ---\\n:time - Show current time and status\\n:date - Show current date and season\\n:weather - Show weather status\\n:chronos - Full diagnostic status\\n\\n--- Time Control ---\\n:advance <N> <unit> - Advance time (e.g. :advance 3 hours)\\n:sleep - Sleep until morning\\n:settime <HH:MM> - Set time (e.g. :settime 14:30)\\n:setdate <day> <month> <year> - Set date\\n:pause - Pause time advancement\\n:resume - Resume time advancement\\n\\n--- Weather ---\\n:setweather <condition> - Set weather condition\\n\\n--- System ---\\n:chronos help - Show this command list\\n:chronos reset - Reset all state to defaults\\n\\n--- Aliases ---\\n:timeskip <N> <unit> - Alias for :advance\\n:skip <N> <unit> - Alias for :advance';

// ============================================
// STORY CARD FUNCTIONS
// ============================================
// These functions manage the "Chronos Settings" and "Chronos Commands" story cards,
// which let players configure and reference the time system directly in-game.

// Searches storyCards for a card whose keys contain the given name (case-insensitive).
// Optionally creates the card with default content if it does not exist.
// @param {string} keyName           - The key to search for (e.g. 'Chronos Settings').
// @param {boolean} createIfNotFound - If true, creates the card when it is missing.
// @param {string} [defaultEntry]    - Default entry text for a newly created card.
// @param {string} [defaultDescription] - Default description for a newly created card.
// @returns {Object|null} The matching story card object, or null if not found.
function findCard(keyName, createIfNotFound, defaultEntry, defaultDescription) {
  if (!storyCards) return null;
  for (const card of storyCards) {
    if (card.keys && card.keys.toLowerCase().includes(keyName.toLowerCase())) {
      return card;
    }
  }
  if (!createIfNotFound) return null;
  addStoryCard(keyName, defaultEntry || '');
  for (const card of storyCards) {
    if (card.keys && card.keys.toLowerCase().includes(keyName.toLowerCase())) {
      if (defaultDescription && !card.description) {
        card.description = defaultDescription;
      }
      return card;
    }
  }
  return null;
}

// Reads a single setting value from a story card's entry text.
// Parses the line "> SettingName: value" and auto-converts booleans and numbers.
// @param {Object} card         - The story card object to read from.
// @param {string} settingName  - The setting label to look for (e.g. 'Minutes Per Turn').
// @param {*} defaultValue      - Fallback returned when the setting is not found.
// @returns {boolean|number|string} The parsed setting value, or defaultValue.
function readSetting(card, settingName, defaultValue) {
  if (!card || !card.entry) return defaultValue;
  const regex = new RegExp('> ' + settingName.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\\\$&') + ':\\\\s*(.+)', 'i');
  const match = card.entry.match(regex);
  if (!match) return defaultValue;
  const raw = match[1].trim();
  if (raw.toLowerCase() === 'true') return true;
  if (raw.toLowerCase() === 'false') return false;
  const num = Number(raw);
  if (!isNaN(num) && raw !== '') return num;
  return raw;
}

// Reads all recognized settings from the Chronos Settings story card
// and writes them into state.chronos.config so the system uses the latest values.
// @param {Object} card - The Chronos Settings story card.
function syncSettingsFromCard(card) {
  if (!card) return;
  const c = state.chronos.config;
  c.enabled = readSetting(card, 'Enabled', c.enabled);
  c.minutesPerTurn = readSetting(card, 'Minutes Per Turn', c.minutesPerTurn);
  c.use12HourFormat = readSetting(card, '12-Hour Format', c.use12HourFormat);
  c.showTimeInOutput = readSetting(card, 'Show Time In Output', c.showTimeInOutput);
  c.useBetterScripts = readSetting(card, 'Use BetterScripts', c.useBetterScripts);
  c.weatherEnabled = readSetting(card, 'Weather Enabled', c.weatherEnabled);
  c.weatherChangeCooldown = readSetting(card, 'Weather Change Cooldown', c.weatherChangeCooldown);
  c.temperatureUnit = readSetting(card, 'Temperature Unit', c.temperatureUnit);
  c.wakeHour = readSetting(card, 'Wake Hour', c.wakeHour);
}

// Writes the current in-game time and date back into the settings card
// so the player can see the live clock when they open it.
// @param {Object} card - The Chronos Settings story card.
function syncTimeToCard(card) {
  if (!card || !card.entry) return;
  const timeStr = getTimeString();
  const dateStr = getDateString();
  card.entry = card.entry
    .replace(/> Current Time:.*/i, '> Current Time: ' + timeStr)
    .replace(/> Current Date:.*/i, '> Current Date: ' + dateStr);
}

// ============================================
// DATE ENGINE
// ============================================
// Calendar math: months, weekdays, leap years, seasons, and date formatting.

// Returns the standard month definitions.
// @returns {Array<{name: string, days: number}>} 12-element month array.
function getMonths() {
  return DEFAULT_MONTHS;
}

// Returns the standard weekday names.
// @returns {string[]} Array of weekday names.
function getWeekdays() {
  return DEFAULT_WEEKDAYS;
}

// Determines whether a given year is a leap year (Gregorian rules).
// @param {number} y - The year to test.
// @returns {boolean} True if the year is a leap year.
function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

// Returns the number of days in a given month, accounting for leap years in February.
// @param {number} month - 1-indexed month (1 = January).
// @param {number} year  - The year (needed for leap-year check).
// @returns {number} Number of days in the month.
function getDaysInMonth(month, year) {
  const months = getMonths();
  const idx = ((month - 1) % 12 + 12) % 12;
  let days = months[idx].days;
  if (idx === 1 && isLeapYear(year)) {
    days = 29;
  }
  return days;
}

// Looks up which season a month belongs to.
// @param {number} month - 1-indexed month number.
// @returns {{name: string, months: number[]}} The matching season object.
function getSeason(month) {
  for (const s of SEASONS) {
    if (s.months.includes(month)) return s;
  }
  return SEASONS[0];
}

// Calculates the ordinal day-of-year (1-indexed) for a given date.
// @param {number} day   - Day of the month.
// @param {number} month - 1-indexed month.
// @param {number} year  - The year.
// @returns {number} Day-of-year (e.g. Feb 1 = 32).
function getDayOfYear(day, month, year) {
  let total = 0;
  for (let m = 1; m < month; m++) {
    total += getDaysInMonth(m, year);
  }
  return total + day;
}

// Converts a date into an absolute day count from a fixed epoch.
// Used to compute weekday indices via modular arithmetic.
// @param {number} day   - Day of the month.
// @param {number} month - 1-indexed month.
// @param {number} year  - The year.
// @returns {number} Absolute day number.
function getAbsoluteDay(day, month, year) {
  const y = year - 1;
  const yearDays = 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  return yearDays + getDayOfYear(day, month, year) - 1;
}

// Computes the weekday index for a given date (0 = first weekday in the list).
// @param {number} day   - Day of the month.
// @param {number} month - 1-indexed month.
// @param {number} year  - The year.
// @returns {number} Index into the weekday array.
function getWeekdayIndex(day, month, year) {
  return getAbsoluteDay(day, month, year) % getWeekdays().length;
}

// Returns the weekday name for the current in-game date.
// @returns {string} e.g. 'Monday'.
function getWeekday() {
  const s = state.chronos;
  return getWeekdays()[getWeekdayIndex(s.day, s.month, s.year)];
}

// Returns the name of the current in-game month.
// @returns {string} e.g. 'June'.
function getMonthName() {
  return getMonths()[(state.chronos.month - 1) % 12].name;
}

// Formats the current in-game date as a human-readable string.
// @returns {string} e.g. 'June 1, 2026'.
function getDateString() {
  const s = state.chronos;
  return getMonthName() + ' ' + s.day + ', ' + s.year;
}

// ============================================
// TIME ENGINE
// ============================================
// Core clock logic: time periods, formatting, advancement, and retry detection.

// Returns the time-of-day period (Midnight, Dawn, Morning, etc.) for a given hour.
// @param {number} hour - Hour in 24-hour format (0-23).
// @returns {{name: string, icon: string, start: number, end: number}} The matching period.
function getTimePeriod(hour) {
  for (const p of TIME_PERIODS) {
    if (hour >= p.start && hour < p.end) return p;
  }
  return TIME_PERIODS[0];
}

// Formats the current in-game time as a display string.
// Respects the 12-hour / 24-hour format setting.
// @returns {string} e.g. '7:00 AM' or '07:00'.
function getTimeString() {
  const h = state.chronos.hour;
  const m = state.chronos.minute;
  if (state.chronos.config.use12HourFormat) {
    const hour12 = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    return \`\${hour12}:\${String(m).padStart(2, '0')} \${ampm}\`;
  }
  return \`\${String(h).padStart(2, '0')}:\${String(m).padStart(2, '0')}\`;
}

// Advances the in-game clock by the given number of minutes.
// Handles minute/hour overflow and rolls over days, months, and years as needed.
// @param {number} minutes - Number of minutes to advance.
function advanceTime(minutes) {
  const s = state.chronos;
  const totalMinutes = s.minute + minutes;
  s.minute = totalMinutes % 60;
  const totalHours = s.hour + Math.floor(totalMinutes / 60);
  s.hour = totalHours % 24;
  s.day += Math.floor(totalHours / 24);
  while (s.day > getDaysInMonth(s.month, s.year)) {
    s.day -= getDaysInMonth(s.month, s.year);
    s.month += 1;
    if (s.month > 12) {
      s.month = 1;
      s.year += 1;
    }
  }
}

// Detects whether the current turn is a retry (player hit "retry" on the same action).
// Prevents double-advancing time on retried turns.
// @returns {boolean} True if the action count has not changed since the last turn.
function isRetry() {
  return (info.actionCount || 0) === state.chronos.lastActionCount;
}

// ============================================
// TIME ADJUSTMENT FUNCTIONS
// ============================================
// Direct setters for time and date, plus sleep and bulk-advance helpers.

// Sets the in-game clock to an exact hour and minute (no date change).
// @param {number} hour   - Hour (0-23; values >= 24 wrap via modulo).
// @param {number} minute - Minute (0-59; values >= 60 wrap via modulo).
function setTimeTo(hour, minute) {
  state.chronos.hour = hour % 24;
  state.chronos.minute = (minute || 0) % 60;
}

// Sets the in-game date, clamping each component to valid ranges.
// @param {number} day   - Day of the month (clamped to month's max).
// @param {number} month - Month (1-12).
// @param {number} year  - Year (minimum 1).
function setDateTo(day, month, year) {
  const s = state.chronos;
  s.year = Math.max(1, year);
  s.month = Math.max(1, Math.min(12, month));
  const maxDay = getDaysInMonth(s.month, s.year);
  s.day = Math.max(1, Math.min(maxDay, day));
}

// Advances time forward to the configured wake hour (next morning).
// If already within the "morning window" (wakeHour to wakeHour+4), returns false.
// Simulates weather rolls proportionally during the skipped time.
// @returns {boolean} True if time was advanced, false if already morning.
function skipToMorning() {
  const s = state.chronos;
  const wakeHour = s.config.wakeHour || 7;
  if (s.hour >= wakeHour && s.hour < wakeHour + 4) {
    return false;
  }
  let minutesToSkip = 0;
  if (s.hour < wakeHour) {
    minutesToSkip = ((wakeHour - s.hour) * 60) - s.minute;
  } else {
    minutesToSkip = ((24 - s.hour + wakeHour) * 60) - s.minute;
  }
  if (s.config.weatherEnabled) {
    const turnsToSimulate = Math.floor(minutesToSkip / Math.max(1, s.config.minutesPerTurn));
    const maxIter = Math.min(turnsToSimulate, 500);
    const expectedRolls = Math.max(1, Math.floor(turnsToSimulate / s.config.weatherChangeCooldown));
    const rollEvery = Math.max(1, Math.floor(maxIter / expectedRolls));
    for (let i = 0; i < maxIter; i++) {
      if (i % rollEvery === 0) {
        rollWeather();
      }
      updateTemperature();
    }
  }
  advanceTime(minutesToSkip);
  return true;
}

// Advances time by an arbitrary amount and unit (e.g. 3 hours, 2 days).
// Validates the unit, simulates weather during the skip, then returns a status message.
// @param {number} amount - How many units to advance.
// @param {string} unit   - Time unit keyword (e.g. 'hours', 'days').
// @returns {{output: string, isCommand: boolean}} Result message for display.
function handleAdvanceTime(amount, unit) {
  const unitLower = unit.toLowerCase();
  const minutesPerUnit = UNIT_TO_MINUTES[unitLower];
  if (!minutesPerUnit) {
    const validUnits = 'minutes, hours, days, weeks, months, years';
    return { output: \`\\nUnknown time unit: \${unit}\\nValid units: \${validUnits}\`, isCommand: true };
  }
  const totalMinutes = amount * minutesPerUnit;
  if (state.chronos.config.weatherEnabled) {
    const turnsToSimulate = Math.floor(totalMinutes / Math.max(1, state.chronos.config.minutesPerTurn));
    const maxIter = Math.min(turnsToSimulate, 500);
    const expectedRolls = Math.max(1, Math.floor(turnsToSimulate / state.chronos.config.weatherChangeCooldown));
    const rollEvery = Math.max(1, Math.floor(maxIter / expectedRolls));
    for (let i = 0; i < maxIter; i++) {
      if (i % rollEvery === 0) {
        rollWeather();
      }
      updateTemperature();
    }
  }
  advanceTime(totalMinutes);
  const period = getTimePeriod(state.chronos.hour);
  let out = \`\\nAdvanced \${amount} \${unitLower}.\\n\${period.icon} \${period.name}, \${getTimeString()} - \${getWeekday()}, \${getDateString()}\`;
  if (state.chronos.config.weatherEnabled) {
    out += \`\\n\${getWeatherDisplay()}\`;
  }
  return { output: out, isCommand: true };
}

// ============================================
// WEATHER SYSTEM
// ============================================
// Season-aware weather with Markov-chain transitions and smooth temperature drift.

// Checks whether enough turns have passed since the last weather change
// to allow a new transition (based on the weatherChangeCooldown setting).
// @returns {boolean} True if a weather roll should occur this turn.
function shouldChangeWeather() {
  const turnsSinceLast = (info.actionCount || 0) - (state.chronos.weather.lastChange || 0);
  return turnsSinceLast >= state.chronos.config.weatherChangeCooldown;
}

// Performs a weighted-random weather transition using the Markov-chain table.
// Picks the next condition based on the current condition and season,
// then resets the cooldown timer and recalculates the temperature target.
function rollWeather() {
  const season = getSeason(state.chronos.month).name;
  const current = state.chronos.weather.current;
  const transitions = WEATHER_TRANSITIONS[current];
  if (!transitions || !transitions[season]) {
    state.chronos.weather.current = 'clear';
    state.chronos.weather.lastChange = info.actionCount || 0;
    state.chronos.weather.targetTemp = calcTargetTemp();
    return;
  }
  const options = transitions[season];
  let totalWeight = 0;
  for (const opt of options) { totalWeight += opt[1]; }
  let roll = Math.random() * totalWeight;
  for (const opt of options) {
    roll -= opt[1];
    if (roll <= 0) {
      state.chronos.weather.current = opt[0];
      break;
    }
  }
  state.chronos.weather.lastChange = info.actionCount || 0;
  state.chronos.weather.targetTemp = calcTargetTemp();
}

// Calculates a new target temperature based on season, weather condition, and time of day.
// A random base value is picked from the season's range, then shifted by weather and hour modifiers.
// @returns {number} The target temperature in Fahrenheit (rounded).
function calcTargetTemp() {
  const season = getSeason(state.chronos.month).name;
  const range = SEASON_TEMPS[season] || SEASON_TEMPS.Spring;
  const baseTemp = range.low + Math.random() * (range.high - range.low);
  const weather = state.chronos.weather.current;
  let modifier = 0;
  if (weather === 'clear') modifier = 3;
  else if (weather === 'partly_cloudy') modifier = 1;
  else if (weather === 'overcast' || weather === 'cloudy') modifier = -2;
  else if (weather === 'rain' || weather === 'light_rain') modifier = -5;
  else if (weather === 'heavy_rain' || weather === 'thunderstorm') modifier = -8;
  else if (weather === 'light_snow') modifier = -10;
  else if (weather === 'snow' || weather === 'heavy_snow') modifier = -15;
  else if (weather === 'fog') modifier = -3;
  else if (weather === 'windy') modifier = -4;
  const hour = state.chronos.hour;
  if (hour >= 0 && hour < 6) modifier -= 5;
  else if (hour >= 11 && hour < 15) modifier += 5;
  else if (hour >= 20) modifier -= 3;
  return Math.round(baseTemp + modifier);
}

// Smoothly drifts the displayed temperature toward the current target.
// Uses a 30% step each turn so changes feel gradual rather than instant.
function updateTemperature() {
  const w = state.chronos.weather;
  if (w.targetTemp === null) {
    w.targetTemp = calcTargetTemp();
    w.temperature = w.targetTemp;
    return;
  }
  const diff = w.targetTemp - w.temperature;
  if (Math.abs(diff) <= 1) {
    w.temperature = w.targetTemp;
  } else {
    w.temperature += Math.round(diff * 0.3);
  }
}

// Builds a human-readable weather string with icon, label, and temperature.
// Converts to Celsius if the temperatureUnit setting is 'C'.
// @returns {string} e.g. '\\u2600\\ufe0f Clear skies (72\\u00b0F)'.
function getWeatherDisplay() {
  const w = state.chronos.weather;
  const cond = WEATHER_CONDITIONS[w.current];
  if (!cond) return 'Unknown weather';
  let tempStr = '';
  if (state.chronos.config.temperatureUnit === 'C') {
    tempStr = Math.round((w.temperature - 32) * 5 / 9) + '\\u{00B0}C';
  } else {
    tempStr = w.temperature + '\\u{00B0}F';
  }
  return cond.icon + ' ' + cond.label + ' (' + tempStr + ')';
}

// ============================================
// CONTEXT BUILDING
// ============================================
// Produces the bracket-wrapped environment string injected into the AI's context window.

// Builds the context-injection string that the AI sees each turn.
// Includes time, period, weekday, date, season, and optionally weather.
// @returns {string} e.g. '[Time: 7:00 AM (Morning), Monday, June 1, 2026 | Season: Summer | Weather: \u2600\ufe0f Clear skies (72\u00b0F)]'.
function getTimeContext() {
  const s = state.chronos;
  const period = getTimePeriod(s.hour);
  const season = getSeason(s.month);
  let ctx = '[Time: ' + getTimeString() + ' (' + period.name + '), ' + getWeekday() + ', ' + getDateString() + ' | Season: ' + season.name;
  if (s.config.weatherEnabled) {
    ctx += ' | Weather: ' + getWeatherDisplay();
  }
  ctx += ']';
  return ctx;
}

// ============================================
// COMMAND HANDLER (Registry Pattern)
// ============================================
// Each key is a command name (e.g. 'time', 'advance', 'sleep').
// The value is a handler function(args) that returns { output, isCommand } or null on bad args.
// null signals invalid arguments so the dispatcher can show a usage hint.

const CHRONOS_COMMANDS = {
  // :time - Displays current time, period, date, turn count, and weather (if enabled).
  time: function () {
    const s = state.chronos;
    const period = getTimePeriod(s.hour);
    let out = \`\\n\\u{1F550} \${getTimeString()} - \${period.icon} \${period.name}\`;
    out += \`\\n\\u{1F4C5} \${getWeekday()}, \${getDateString()} (Turn \${info.actionCount || 0})\`;
    if (s.config.weatherEnabled) {
      out += \`\\n\${getWeatherDisplay()}\`;
    }
    return { output: out, isCommand: true };
  },

  // :date - Shows the current date and season.
  date: function () {
    const s = state.chronos;
    const season = getSeason(s.month);
    let out = \`\\n\${getWeekday()}, \${getDateString()}\`;
    out += \`\\nSeason: \${season.name}\`;
    return { output: out, isCommand: true };
  },

  // :advance <N> <unit> - Jumps time forward by the specified amount (e.g. :advance 3 hours).
  advance: function (args) {
    const m = args.match(/^(\\d+)\\s+(\\w+)$/);
    if (!m) return null;
    return handleAdvanceTime(parseInt(m[1]), m[2]);
  },

  // :sleep - Fast-forwards to the configured wake hour, simulating overnight weather.
  sleep: function () {
    if (!skipToMorning()) {
      return { output: '\\nYou are already up. It is morning.', isCommand: true };
    }
    const period = getTimePeriod(state.chronos.hour);
    let out = \`\\nYou rest and wake refreshed.\\n\${period.icon} \${period.name}, \${getTimeString()} - \${getWeekday()}, \${getDateString()}\`;
    if (state.chronos.config.weatherEnabled) {
      out += \`\\n\${getWeatherDisplay()}\`;
    }
    return { output: out, isCommand: true };
  },

  // :settime <HH:MM> - Sets the clock to an exact time (e.g. :settime 14:30).
  settime: function (args) {
    const m = args.match(/^(\\d{1,2})(?::(\\d{2}))?$/);
    if (!m) return null;
    const hour = parseInt(m[1]) % 24;
    const minute = m[2] ? parseInt(m[2]) : 0;
    setTimeTo(hour, minute);
    const period = getTimePeriod(state.chronos.hour);
    return {
      output: \`\\nTime set to \${period.name}, \${getTimeString()}.\`,
      isCommand: true
    };
  },

  // :setdate <day> <month> <year> - Sets the calendar date directly.
  setdate: function (args) {
    const m = args.match(/^(\\d+)\\s+(\\d+)\\s+(\\d+)$/);
    if (!m) return null;
    const d = parseInt(m[1]);
    const mo = parseInt(m[2]);
    const y = parseInt(m[3]);
    if (mo < 1 || mo > 12) {
      return { output: '\\nInvalid month. Must be 1-12.', isCommand: true };
    }
    if (y < 1) {
      return { output: '\\nInvalid year. Must be 1 or greater.', isCommand: true };
    }
    setDateTo(d, mo, y);
    return {
      output: \`\\nDate set to \${getWeekday()}, \${getDateString()}.\`,
      isCommand: true
    };
  },

  // :setweather <condition> - Overrides the current weather (e.g. :setweather rain).
  setweather: function (args) {
    if (!state.chronos.config.weatherEnabled) {
      return { output: '\\nWeather is disabled. Enable it in the Chronos Settings story card.', isCommand: true };
    }
    const requested = args.trim().replace(/ /g, '_');
    if (!WEATHER_CONDITIONS[requested]) {
      const valid = Object.keys(WEATHER_CONDITIONS).join(', ');
      return { output: \`\\nUnknown condition: \${requested}\\nValid: \${valid}\`, isCommand: true };
    }
    state.chronos.weather.current = requested;
    state.chronos.weather.targetTemp = calcTargetTemp();
    state.chronos.weather.temperature = state.chronos.weather.targetTemp;
    state.chronos.weather.lastChange = info.actionCount || 0;
    return { output: \`\\nWeather set to \${getWeatherDisplay()}\`, isCommand: true };
  },

  // :weather - Displays the current weather condition, temperature, and season.
  weather: function () {
    if (!state.chronos.config.weatherEnabled) {
      return { output: '\\nWeather is disabled. Enable it in the Chronos Settings story card.', isCommand: true };
    }
    const s = state.chronos;
    const season = getSeason(s.month);
    return {
      output: \`\\n\${getWeatherDisplay()}\\n\${season.name} - \${getTimePeriod(s.hour).name}\`,
      isCommand: true
    };
  },

  // :timeskip <N> <unit> - Alias for :advance.
  timeskip: function (args) {
    const m = args.match(/^(\\d+)\\s+(\\w+)$/);
    if (!m) return null;
    return handleAdvanceTime(parseInt(m[1]), m[2]);
  },

  // :skip <N> <unit> - Alias for :advance.
  skip: function (args) {
    const m = args.match(/^(\\d+)\\s+(\\w+)$/);
    if (!m) return null;
    return handleAdvanceTime(parseInt(m[1]), m[2]);
  },

  // :pause - Suspends automatic time advancement until :resume is used.
  pause: function () {
    if (state.chronos.paused) {
      return { output: '\\nTime is already paused.', isCommand: true };
    }
    state.chronos.paused = true;
    return { output: '\\nTime paused. Time will not advance until you use :resume.', isCommand: true };
  },

  // :resume - Resumes automatic time advancement after a :pause.
  resume: function () {
    if (!state.chronos.paused) {
      return { output: '\\nTime is not currently paused.', isCommand: true };
    }
    state.chronos.paused = false;
    return { output: '\\nTime resumed. Time will advance normally each turn.', isCommand: true };
  },

  // :chronos [help|reset] - Shows full diagnostic status, help text, or resets all state.
  chronos: function (args) {
    const sub = args.trim().toLowerCase();

    if (sub === 'help') {
      return { output: \`\\n\${COMMANDS_CARD_ENTRY}\`, isCommand: true };
    }

    if (sub === 'reset') {
      state.chronos.minute = 0;
      state.chronos.hour = state.chronos.config.wakeHour || 7;
      state.chronos.day = 1;
      state.chronos.month = 1;
      state.chronos.year = 1;
      state.chronos.weather = { current: 'clear', temperature: 70, lastChange: 0, targetTemp: null };
      state.chronos.initialized = false;
      state.chronos.paused = false;
      return { output: '\\nChronos has been reset to defaults.', isCommand: true };
    }

    if (sub === '') {
      const s = state.chronos;
      const period = getTimePeriod(s.hour);
      const season = getSeason(s.month);
      let out = '\\n--- Chronos Status ---';
      out += \`\\nTime: \${period.name}, \${getTimeString()} (\${s.config.use12HourFormat ? '12h' : '24h'})\`;
      out += \`\\nDate: \${getWeekday()}, \${getDateString()}\`;
      out += \`\\nSeason: \${season.name}\`;
      out += \`\\nStatus: \${s.paused ? 'Paused' : 'Running'}\`;
      out += \`\\nPacing: \${s.config.minutesPerTurn} min/turn | Turn \${info.actionCount || 0}\`;
      if (s.config.weatherEnabled) {
        out += \`\\nWeather: \${getWeatherDisplay()} (\${s.config.temperatureUnit})\`;
      } else {
        out += '\\nWeather: Disabled';
      }
      out += \`\\nDisplay: \${s.config.useBetterScripts ? 'Widgets' : s.config.showTimeInOutput ? 'Text' : 'Context only'}\`;
      out += '\\n---';
      return { output: out, isCommand: true };
    }

    return null;
  }
};

// Parses a command line (":command args") and dispatches to CHRONOS_COMMANDS.
// Returns null when the input is not a Chronos command.
// @param {string} input - Full player input line.
// @returns {{output: string, isCommand: boolean}|null} Command result or null when not a command.
function handleChronosCommand(input) {
  const trimmed = input.trim();
  const parsed = trimmed.match(/^:(\\w+)(?:\\s+(.*))?$/);
  if (!parsed) return null;
  const cmdName = parsed[1].toLowerCase();
  const args = (parsed[2] || '').toLowerCase();
  const handler = CHRONOS_COMMANDS[cmdName];
  if (!handler) return { output: '\\nUnknown command: :' + cmdName + '. Type :chronos help for commands.', isCommand: true };
  const result = handler(args);
  if (!result) return { output: '\\nInvalid arguments for :' + cmdName + '. Type :chronos help for usage.', isCommand: true };
  return result;
}

// ============================================
// HOOK: INPUT
// ============================================
if (hook === "input") {
  state.chronos.isCommand = false;

  const trimmed = text.trim();

  if (trimmed.startsWith(':')) {
    const result = handleChronosCommand(trimmed);
    if (result) {
      state.chronos.pendingOutput = result.output;
      state.chronos.isCommand = true;
      // Use a single space instead of an empty string to avoid edge cases where
      // an empty input can behave inconsistently across scenarios.
      globalThis.text = ' ';
      return;
    }
  }

  delete state.message;
  return;

}

// ============================================
// HOOK: CONTEXT
// ============================================
if (hook === "context") {
  const settingsCard = findCard('Chronos Settings', true, SETTINGS_CARD_ENTRY, SETTINGS_CARD_DESCRIPTION);
  syncSettingsFromCard(settingsCard);

  // Ensure the Commands card exists as an in-game reference.
  const commandsCard = findCard('Chronos Commands', true, COMMANDS_CARD_ENTRY);

  if (!state.chronos.config.enabled) return;

  if (!state.chronos.initialized) {
    state.chronos.initialized = true;
    if (state.chronos.config.weatherEnabled) {
      rollWeather();
      updateTemperature();
    }
  }

  if (state.chronos.config.weatherEnabled && !state.chronos.weather.targetTemp) {
    state.chronos.weather.targetTemp = calcTargetTemp();
    state.chronos.weather.temperature = state.chronos.weather.targetTemp;
  }

  // Advance time once per turn.
  // Skips retries (so time doesn't double-advance), command turns, and paused state.
  if (!isRetry() && !state.chronos.isCommand && !state.chronos.paused) {
    advanceTime(state.chronos.config.minutesPerTurn);

    if (state.chronos.config.weatherEnabled && shouldChangeWeather()) {
      rollWeather();
    }
    if (state.chronos.config.weatherEnabled) {
      updateTemperature();
    }
  }
  state.chronos.lastActionCount = info.actionCount || 0;

  syncTimeToCard(settingsCard);

  // Strip BetterScripts protocol messages from the text before injecting into AI context.
  let text = globalThis.text;
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');

  const contextMemory = info.memoryLength ? text.slice(0, info.memoryLength) : '';
  let context = info.memoryLength ? text.slice(info.memoryLength) : text;

  // Remove previously injected output headers so the AI doesn't see repeated time banners.
  // Matches the output modifier's format: [<icon> <time> | <weekday>, <month> <day> ...]
  // The \\| after the time distinguishes these from the [Time: ...] context line (which uses parentheses).
  context = context.replace(/\\[\\S+ \\d{1,2}:\\d{2}(?: [AP]M)? \\|[^\\]]+\\]\\n?/g, '');

  const envContext = getTimeContext();
  context = envContext + '\\n' + context;

  context = context.slice(-(info.maxChars - info.memoryLength));
  const finalText = contextMemory + context;

  globalThis.text = finalText;
  return;

}

// ============================================
// HOOK: OUTPUT
// ============================================
if (hook === "output") {
  if (!state.chronos.config.enabled) return;

  let output = globalThis.text;
  let isCommandOutput = false;

  if (state.chronos.isCommand && state.chronos.pendingOutput) {
    output = state.chronos.pendingOutput;
    state.message = state.chronos.pendingOutput;
    state.chronos.pendingOutput = null;
    state.chronos.isCommand = false;
    isCommandOutput = true;
  }

  if (!state.chronos.config.useBetterScripts) {
    if (!isCommandOutput && state.chronos.config.showTimeInOutput) {
      const s = state.chronos;
      const period = getTimePeriod(s.hour);
      let header = '[' + period.icon + ' ' + getTimeString() + ' | ' + getWeekday() + ', ' + getMonthName() + ' ' + s.day;
      if (s.config.weatherEnabled) {
        const cond = WEATHER_CONDITIONS[s.weather.current];
        if (cond) {
          let tempStr = '';
          if (s.config.temperatureUnit === 'C') {
            tempStr = Math.round((s.weather.temperature - 32) * 5 / 9) + '\\u{00B0}C';
          } else {
            tempStr = s.weather.temperature + '\\u{00B0}F';
          }
          header += ' | ' + cond.icon + ' ' + cond.label + ', ' + tempStr;
        }
      }
      header += ']';
      output = '\\n' + header + '\\n' + output;
    }
    globalThis.text = output;
    return;
  }

  const s = state.chronos;
  const period = getTimePeriod(s.hour);
  const isNight = period.name === 'Night' || period.name === 'Midnight';

  let widgets = '';

  widgets += bdWidget('time-clock', {
    type: 'stat',
    label: period.icon,
    value: getTimeString(),
    color: isNight ? '#94a3b8' : '#fbbf24',
    align: 'center',
    order: 1
  });

  widgets += bdWidget('time-date', {
    type: 'stat',
    label: '\\u{1F4C5}',
    value: getWeekday() + ', ' + getMonthName() + ' ' + s.day,
    color: '#60a5fa',
    align: 'center',
    order: 2
  });

  if (s.config.weatherEnabled) {
    const cond = WEATHER_CONDITIONS[s.weather.current];
    if (cond) {
      let tempStr = '';
      if (s.config.temperatureUnit === 'C') {
        tempStr = Math.round((s.weather.temperature - 32) * 5 / 9) + '\\u{00B0}C';
      } else {
        tempStr = s.weather.temperature + '\\u{00B0}F';
      }
      widgets += bdWidget('time-weather', {
        type: 'stat',
        label: cond.icon,
        value: cond.label + ', ' + tempStr,
        color: '#34d399',
        align: 'center',
        order: 3
      });
    }
  }

  globalThis.text = output + widgets;
  return;

}

};