// ============================================================
// LIBRARY - Chronos V2
// ============================================================
// A lightweight in-game clock and Gregorian calendar for AI Dungeon.
//
// Chronos owns only time and date. It does not simulate weather, seasons,
// astronomy, or real-world time. Lifecycle behavior stays in the matching
// Input and Context files; this Library file contains shared helpers only.

globalThis.ChronosV2 = (function createChronosV2() {
  'use strict';

  var VERSION = 2;
  var SETTINGS_CARD = 'Chronos Settings';
  var WIDGET_CARD = 'ultrascripts:state:widget';
  var HEARTBEAT_CARD = 'ultrascripts:heartbeat';
  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var WEEKDAY_NAMES = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'
  ];
  var ACTIVE_WIDGET_ID = 'chronos-clock';
  var LEGACY_WIDGET_IDS = ['chronos-time', 'chronos-date'];
  var WIDGET_IDS = [ACTIVE_WIDGET_ID].concat(LEGACY_WIDGET_IDS);
  var MAX_WIDGETS = 40;
  var MAX_CHRONOS_HISTORY = 500;
  var MAX_YEAR = 999999;

  function currentActionCount() {
    var value = typeof info !== 'undefined' && info ? Number(info.actionCount) : 0;
    return isFinite(value) && value >= 0 ? Math.floor(value) : 0;
  }

  function defaultClock() {
    return { year: 2026, month: 6, day: 1, hour: 8, minute: 0 };
  }

  function initialize() {
    if (!globalThis.state || typeof state !== 'object') return null;

    var previous = state.chronos && typeof state.chronos === 'object'
      ? state.chronos
      : {};
    var legacyClock = {
      year: previous.year,
      month: previous.month,
      day: previous.day,
      hour: previous.hour,
      minute: previous.minute
    };
    var hasLegacyClock = validInteger(legacyClock.year) &&
      validInteger(legacyClock.month) && validInteger(legacyClock.day) &&
      validInteger(legacyClock.hour) && validInteger(legacyClock.minute);

    if (previous.version !== VERSION || !previous.clock) {
      previous = {
        version: VERSION,
        clock: normalizeClock(hasLegacyClock ? legacyClock : defaultClock()),
        settings: {
          enabled: previous.config && typeof previous.config.enabled === 'boolean'
            ? previous.config.enabled
            : true,
          paused: !!previous.paused,
          minutesPerTurn: clampInteger(
            previous.config && previous.config.minutesPerTurn,
            0,
            1440,
            2
          ),
          clockFormat: previous.config && previous.config.use12HourFormat === false
            ? '24-hour'
            : '12-hour'
        },
        lastActionCount: currentActionCount(),
        notice: '',
        pendingCommand: null,
        timeline: {},
        ultrascripts: {}
      };
      state.chronos = previous;
    }

    previous.clock = normalizeClock(previous.clock || defaultClock());
    previous.settings = previous.settings || {};
    if (typeof previous.settings.enabled !== 'boolean') previous.settings.enabled = true;
    if (typeof previous.settings.paused !== 'boolean') previous.settings.paused = false;
    previous.settings.minutesPerTurn = clampInteger(
      previous.settings.minutesPerTurn,
      0,
      1440,
      2
    );
    if (previous.settings.clockFormat !== '24-hour') previous.settings.clockFormat = '12-hour';
    if (!validInteger(previous.lastActionCount)) previous.lastActionCount = currentActionCount();
    if (typeof previous.notice !== 'string') previous.notice = '';
    if (!previous.pendingCommand || typeof previous.pendingCommand !== 'object') {
      previous.pendingCommand = null;
    }
    if (!previous.timeline || typeof previous.timeline !== 'object') previous.timeline = {};
    previous.ultrascripts = previous.ultrascripts || {};
    if (!previous.timeline[String(previous.lastActionCount)]) {
      previous.timeline[String(previous.lastActionCount)] = copyClock(previous.clock);
    }
    return previous;
  }

  function validInteger(value) {
    var number = Number(value);
    return isFinite(number) && Math.floor(number) === number;
  }

  function clampInteger(value, minimum, maximum, fallback) {
    var number = Number(value);
    if (!isFinite(number)) return fallback;
    number = Math.floor(number);
    return Math.max(minimum, Math.min(maximum, number));
  }

  function normalizeClock(value) {
    var clock = value || {};
    var fallback = defaultClock();
    var year = clampInteger(clock.year, 1, MAX_YEAR, fallback.year);
    var month = clampInteger(clock.month, 1, 12, fallback.month);
    var day = clampInteger(clock.day, 1, daysInMonth(year, month), fallback.day);
    return {
      year: year,
      month: month,
      day: day,
      hour: clampInteger(clock.hour, 0, 23, fallback.hour),
      minute: clampInteger(clock.minute, 0, 59, fallback.minute)
    };
  }

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function daysInMonth(year, month) {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].indexOf(month) !== -1 ? 30 : 31;
  }

  function copyClock(clock) {
    return {
      year: clock.year,
      month: clock.month,
      day: clock.day,
      hour: clock.hour,
      minute: clock.minute
    };
  }

  function daysBeforeYear(year) {
    var previousYear = year - 1;
    return previousYear * 365 + Math.floor(previousYear / 4) -
      Math.floor(previousYear / 100) + Math.floor(previousYear / 400);
  }

  function daysBeforeMonth(year, month) {
    var total = 0;
    for (var currentMonth = 1; currentMonth < month; currentMonth += 1) {
      total += daysInMonth(year, currentMonth);
    }
    return total;
  }

  function clockToMinuteIndex(clock) {
    var days = daysBeforeYear(clock.year) + daysBeforeMonth(clock.year, clock.month) +
      clock.day - 1;
    return days * 1440 + clock.hour * 60 + clock.minute;
  }

  function maxMinuteIndex() {
    return (daysBeforeYear(MAX_YEAR + 1) * 1440) - 1;
  }

  function clockFromMinuteIndex(value) {
    var minuteIndex = Math.max(0, Math.min(maxMinuteIndex(), Math.trunc(value)));
    var dayIndex = Math.floor(minuteIndex / 1440);
    var minuteOfDay = minuteIndex % 1440;
    var low = 1;
    var high = MAX_YEAR;

    while (low < high) {
      var middle = Math.ceil((low + high) / 2);
      if (daysBeforeYear(middle) <= dayIndex) low = middle;
      else high = middle - 1;
    }

    var year = low;
    var dayOfYear = dayIndex - daysBeforeYear(year);
    var month = 1;
    while (dayOfYear >= daysInMonth(year, month)) {
      dayOfYear -= daysInMonth(year, month);
      month += 1;
    }

    return {
      year: year,
      month: month,
      day: dayOfYear + 1,
      hour: Math.floor(minuteOfDay / 60),
      minute: minuteOfDay % 60
    };
  }

  function addMinutes(amount) {
    var chronos = initialize();
    if (!chronos) return;
    var amountAsNumber = Number(amount);
    if (!isFinite(amountAsNumber)) return;
    chronos.clock = clockFromMinuteIndex(
      clockToMinuteIndex(chronos.clock) + Math.trunc(amountAsNumber)
    );
  }

  function advanceToCurrentAction() {
    var chronos = initialize();
    if (!chronos) return;
    var actionCount = currentActionCount();
    var delta = actionCount - chronos.lastActionCount;

    if (delta < 0) {
      var snapshot = chronos.timeline[String(actionCount)];
      if (snapshot) chronos.clock = normalizeClock(snapshot);
      else if (chronos.settings.enabled && !chronos.settings.paused) {
        addMinutes(delta * chronos.settings.minutesPerTurn);
      }
      discardFutureSnapshots(chronos.timeline, actionCount);
    } else if (delta > 0 && chronos.settings.enabled && !chronos.settings.paused) {
      var ordinaryActions = chronos.pendingCommand ? Math.max(0, delta - 1) : delta;
      addMinutes(ordinaryActions * chronos.settings.minutesPerTurn);
    }
    chronos.lastActionCount = actionCount;
  }

  function recordSnapshot() {
    var chronos = initialize();
    if (!chronos) return;
    var actionCount = currentActionCount();
    chronos.timeline[String(actionCount)] = copyClock(chronos.clock);
    var keys = Object.keys(chronos.timeline).map(function (key) {
      return { key: key, number: Number(key) };
    }).filter(function (item) {
      return isFinite(item.number);
    }).sort(function (left, right) {
      return right.number - left.number;
    });
    for (var index = MAX_CHRONOS_HISTORY; index < keys.length; index += 1) {
      delete chronos.timeline[keys[index].key];
    }
  }

  function discardFutureSnapshots(timeline, actionCount) {
    Object.keys(timeline || {}).forEach(function (key) {
      var number = Number(key);
      if (isFinite(number) && number > actionCount) delete timeline[key];
    });
  }

  function weekdayIndex(clock) {
    return (daysBeforeYear(clock.year) + daysBeforeMonth(clock.year, clock.month) +
      clock.day) % 7;
  }

  function pad2(value) {
    return String(value).padStart(2, '0');
  }

  function formatTime() {
    var chronos = initialize();
    if (!chronos) return '';
    var clock = chronos.clock;
    if (chronos.settings.clockFormat === '24-hour') {
      return pad2(clock.hour) + ':' + pad2(clock.minute);
    }
    var suffix = clock.hour >= 12 ? 'PM' : 'AM';
    var hour = clock.hour % 12 || 12;
    return hour + ':' + pad2(clock.minute) + ' ' + suffix;
  }

  function formatDate() {
    var chronos = initialize();
    if (!chronos) return '';
    var clock = chronos.clock;
    return WEEKDAY_NAMES[weekdayIndex(clock)] + ', ' +
      MONTH_NAMES[clock.month - 1] + ' ' + clock.day + ', ' + clock.year;
  }

  function formatWidgetDate() {
    var chronos = initialize();
    if (!chronos) return '';
    var clock = chronos.clock;
    return WEEKDAY_NAMES[weekdayIndex(clock)].slice(0, 3) + ', ' +
      MONTH_NAMES[clock.month - 1].slice(0, 3) + ' ' + clock.day + ', ' + clock.year;
  }

  function formatTimestamp() {
    return formatTime() + ' on ' + formatDate();
  }

  function widgetHtml() {
    return '<div title="Current in-game time and date" ' +
      'style="display:flex;align-items:baseline;gap:8px;white-space:nowrap;transform:translateY(3px)">' +
      '<span style="color:#fbbf24;font-weight:700;font-variant-numeric:tabular-nums">' +
      formatTime() + '</span>' +
      '<span aria-hidden="true" style="color:rgba(255,255,255,.28)">·</span>' +
      '<span style="color:rgba(255,255,255,.72);font-weight:500">' +
      formatWidgetDate() + '</span></div>';
  }

  function appendContext(originalText) {
    var text = String(originalText || '');
    var suffix = '\n\n[The current in-game time is ' + formatTimestamp() + '.]';
    return text + suffix;
  }

  function settingsTemplate(settings) {
    var value = settings || initialize().settings;
    return [
      '# Chronos Settings',
      '# Chronos tracks a Gregorian in-game clock and calendar.',
      '# Edit values after the colon. Changes take effect on the next turn.',
      '',
      'Enabled: ' + (value.enabled ? 'On' : 'Off'),
      'Paused: ' + (value.paused ? 'On' : 'Off'),
      'Minutes Per Turn: ' + value.minutesPerTurn,
      'Clock Format: ' + value.clockFormat,
      '',
      '# Commands: /time 8:30 AM, /date June 1, 2026, /sleep'
    ].join('\n');
  }

  function syncSettings() {
    var chronos = initialize();
    if (!chronos) return;
    var card = findCard(SETTINGS_CARD);
    if (!card) {
      writeCard(SETTINGS_CARD, settingsTemplate(chronos.settings), 'Chronos');
      return;
    }

    var entry = cardText(card);
    var values = parseSettingsLines(entry);
    var hasLegacyClockFields = Object.prototype.hasOwnProperty.call(values, 'newtime') ||
      Object.prototype.hasOwnProperty.call(values, 'newdate') ||
      Object.prototype.hasOwnProperty.call(values, 'applychanges');
    chronos.settings.enabled = parseToggle(values.enabled, chronos.settings.enabled);
    chronos.settings.paused = parseToggle(values.paused, chronos.settings.paused);
    chronos.settings.minutesPerTurn = clampInteger(
      values.minutesperturn,
      0,
      1440,
      chronos.settings.minutesPerTurn
    );
    chronos.settings.clockFormat = parseClockFormat(
      values.clockformat,
      chronos.settings.clockFormat
    );
    if (hasLegacyClockFields) {
      writeCard(SETTINGS_CARD, settingsTemplate(chronos.settings), card.type || 'Chronos');
    }
  }

  function parseSettingsLines(entry) {
    var values = {};
    String(entry || '').split(/\r?\n/).forEach(function (rawLine) {
      var line = rawLine.trim();
      if (!line || line.indexOf('#') === 0 || line.indexOf(':') === -1) return;
      var separator = line.indexOf(':');
      var key = line.slice(0, separator).toLowerCase().replace(/[^a-z0-9]/g, '');
      values[key] = line.slice(separator + 1).trim();
    });
    return values;
  }

  function parseToggle(value, fallback) {
    var normalized = String(value || '').trim().toLowerCase();
    if (['on', 'true', 'yes', 'enabled'].indexOf(normalized) !== -1) return true;
    if (['off', 'false', 'no', 'disabled'].indexOf(normalized) !== -1) return false;
    return fallback;
  }

  function parseClockFormat(value, fallback) {
    var normalized = String(value || '').toLowerCase().replace(/\s+/g, '');
    if (normalized === '24' || normalized === '24h' || normalized === '24-hour') return '24-hour';
    if (normalized === '12' || normalized === '12h' || normalized === '12-hour') return '12-hour';
    return fallback;
  }

  function parseTime(value) {
    var match = String(value || '').trim().match(/^(\d{1,2})(?::(\d{2}))?\s*([ap]m)?$/i);
    if (!match) return null;
    var hour = Number(match[1]);
    var minute = match[2] === undefined ? 0 : Number(match[2]);
    var meridiem = String(match[3] || '').toLowerCase();
    if (minute < 0 || minute > 59) return null;
    if (meridiem) {
      if (hour < 1 || hour > 12) return null;
      if (hour === 12) hour = 0;
      if (meridiem === 'pm') hour += 12;
    } else if (hour < 0 || hour > 23) {
      return null;
    }
    return { hour: hour, minute: minute };
  }

  function parseDate(value) {
    var raw = String(value || '').trim();
    var iso = raw.match(/^(\d{1,6})-(\d{1,2})-(\d{1,2})$/);
    var monthName = raw.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{1,6})$/);
    var year;
    var month;
    var day;

    if (iso) {
      year = Number(iso[1]);
      month = Number(iso[2]);
      day = Number(iso[3]);
    } else if (monthName) {
      year = Number(monthName[3]);
      var requestedMonth = monthName[1].toLowerCase();
      month = MONTH_NAMES.map(function (name) { return name.toLowerCase(); })
        .findIndex(function (name) {
          return name === requestedMonth ||
            (requestedMonth.length >= 3 && name.indexOf(requestedMonth) === 0);
        }) + 1;
      day = Number(monthName[2]);
    } else {
      return null;
    }

    if (year < 1 || month < 1 || month > 12) return null;
    if (day < 1 || day > daysInMonth(year, month)) return null;
    return { year: year, month: month, day: day };
  }

  function parseCommand(inputText) {
    var raw = String(inputText || '').trim()
      .replace(/^>\s*You(?:\s+say)?\s*"?/i, '')
      .replace(/[".]+\s*$/, '')
      .trim();
    var match = raw.match(/^\/([a-z]+)(?:\s+([\s\S]*))?$/i);
    if (!match) return null;
    var name = match[1].toLowerCase();
    if (name === 'settime') name = 'time';
    if (name === 'setdate') name = 'date';
    if (['chronos', 'time', 'date', 'sleep'].indexOf(name) === -1) return null;
    return { name: name, argument: String(match[2] || '').trim() };
  }

  function handleInput(inputText) {
    var chronos = initialize();
    var command = parseCommand(inputText);
    if (!chronos || !command) return { handled: false, text: inputText };
    chronos.pendingCommand = command;

    if (command.name === 'sleep') {
      return { handled: true, text: 'You settle down to sleep until the following morning.' };
    }
    if (command.name === 'time' && !command.argument) {
      return { handled: true, text: 'You check the current time.' };
    }
    if (command.name === 'date' && !command.argument) {
      return { handled: true, text: 'You check the current date.' };
    }
    if (command.name === 'time') {
      return { handled: true, text: 'You establish the current time before continuing.' };
    }
    if (command.name === 'date') {
      return { handled: true, text: 'You establish the current date before continuing.' };
    }
    return { handled: true, text: 'You briefly review the Chronos clock controls.' };
  }

  function applyPendingCommand() {
    var chronos = initialize();
    if (!chronos || !chronos.pendingCommand) return false;
    var command = chronos.pendingCommand;
    chronos.pendingCommand = null;

    if (command.name === 'chronos') {
      chronos.notice = 'Chronos commands: /time [8:30 AM or 20:30], ' +
        '/date [June 1, 2026 or 2026-06-01], and /sleep.';
      return true;
    }

    if (command.name === 'time') {
      if (!command.argument) {
        chronos.notice = 'Chronos time: ' + formatTime() + '.';
        return true;
      }
      var parsedTime = parseTime(command.argument);
      if (!parsedTime) {
        chronos.notice = 'Chronos could not read that time. Try /time 8:30 AM or /time 20:30.';
        return true;
      }
      chronos.clock.hour = parsedTime.hour;
      chronos.clock.minute = parsedTime.minute;
      chronos.notice = 'Chronos set the time to ' + formatTime() + '.';
      return true;
    }

    if (command.name === 'date') {
      if (!command.argument) {
        chronos.notice = 'Chronos date: ' + formatDate() + '.';
        return true;
      }
      var parsedDate = parseDate(command.argument);
      if (!parsedDate) {
        chronos.notice = 'Chronos could not read that date. Try /date June 1, 2026 or /date 2026-06-01.';
        return true;
      }
      chronos.clock.year = parsedDate.year;
      chronos.clock.month = parsedDate.month;
      chronos.clock.day = parsedDate.day;
      chronos.notice = 'Chronos set the date to ' + formatDate() + '.';
      return true;
    }

    if (command.name === 'sleep') {
      if (command.argument) {
        chronos.notice = 'Chronos /sleep does not take an argument.';
        return true;
      }
      sleepUntilMorning();
      chronos.notice = 'Chronos advanced to the next morning: ' + formatTimestamp() + '.';
      return true;
    }
    return false;
  }

  function sleepUntilMorning(randomSource) {
    var chronos = initialize();
    if (!chronos) return;
    var random = typeof randomSource === 'function' ? randomSource : Math.random;
    var sleepHours = 6 + randomInteger(0, 3, random);
    var sleepMinutes = randomInteger(0, 59, random);
    var start = copyClock(chronos.clock);
    var nextDay = copyClock(start);
    nextDay.hour = 0;
    nextDay.minute = 0;
    nextDay = clockFromMinuteIndex(clockToMinuteIndex(nextDay) + 1440);

    addMinutes(sleepHours * 60 + sleepMinutes);
    var landedNextMorning = chronos.clock.year === nextDay.year &&
      chronos.clock.month === nextDay.month && chronos.clock.day === nextDay.day &&
      chronos.clock.hour < 12;

    if (!landedNextMorning) {
      chronos.clock = nextDay;
      chronos.clock.hour = sleepHours;
      chronos.clock.minute = sleepMinutes;
    }
  }

  function randomInteger(minimum, maximum, random) {
    var value = Number(random());
    if (!isFinite(value)) value = 0;
    value = Math.max(0, Math.min(0.9999999999999999, value));
    return minimum + Math.floor(value * (maximum - minimum + 1));
  }

  function cardMatches(card, title) {
    if (!card) return false;
    if (card.title === title || card.key === title || card.keys === title) return true;
    return Array.isArray(card.keys) && card.keys.indexOf(title) !== -1;
  }

  function findCardIndex(title) {
    var cards = typeof storyCards !== 'undefined' && Array.isArray(storyCards)
      ? storyCards
      : [];
    for (var index = 0; index < cards.length; index += 1) {
      if (cardMatches(cards[index], title)) return index;
    }
    return -1;
  }

  function findCard(title) {
    var index = findCardIndex(title);
    return index >= 0 ? storyCards[index] : null;
  }

  function cardText(card) {
    if (!card) return '';
    if (card.entry !== undefined && card.entry !== null) return String(card.entry);
    if (card.value !== undefined && card.value !== null) return String(card.value);
    if (card.description !== undefined && card.description !== null) return String(card.description);
    return '';
  }

  function writeCard(title, entry, type) {
    var index = findCardIndex(title);
    if (index >= 0) {
      if (typeof updateStoryCard === 'function') {
        var card = storyCards[index] || {};
        updateStoryCard(
          index,
          card.keys || card.key || card.title || title,
          entry,
          card.type || type || 'Chronos'
        );
      }
      return;
    }
    if (typeof addStoryCard === 'function') addStoryCard(title, entry, type || 'Chronos');
  }

  function heartbeat() {
    var cards = typeof storyCards !== 'undefined' && Array.isArray(storyCards)
      ? storyCards
      : [];
    var best = null;
    var bestBeat = -1;
    for (var index = 0; index < cards.length; index += 1) {
      if (!cardMatches(cards[index], HEARTBEAT_CARD)) continue;
      try {
        var candidate = JSON.parse(cardText(cards[index]) || '{}');
        var beat = heartbeatBeat(candidate);
        if (beat > bestBeat) {
          best = candidate;
          bestBeat = beat;
        }
      } catch (error) {}
    }
    return best;
  }

  function heartbeatBeat(value) {
    var metadata = value && value.ultrascripts;
    var beat = Number(metadata && metadata.beat);
    if (!metadata || metadata.protocol !== 1 || metadata.client !== 'BetterDungeon') return -1;
    if (!metadata.enabled || metadata.archived) return -1;
    return validInteger(beat) && beat >= 0 ? beat : -1;
  }

  function observeHeartbeat() {
    var chronos = initialize();
    if (!chronos) return false;
    var value = heartbeat();
    var beat = heartbeatBeat(value);
    if (beat < 0) {
      chronos.ultrascripts.available = false;
      return false;
    }
    chronos.ultrascripts.available = chronos.ultrascripts.lastBeat === undefined ||
      beat !== chronos.ultrascripts.lastBeat;
    chronos.ultrascripts.lastBeat = beat;
    return chronos.ultrascripts.available;
  }

  function widgetAvailable() {
    var chronos = initialize();
    var value = heartbeat();
    if (!chronos || !chronos.ultrascripts.available || heartbeatBeat(value) < 0) return false;
    var modules = value && Array.isArray(value.modules) ? value.modules : [];
    for (var index = 0; index < modules.length; index += 1) {
      if (modules[index] && modules[index].id === 'widget') return true;
    }
    return false;
  }

  function readWidgetPayload() {
    var card = findCard(WIDGET_CARD);
    if (!card) return { v: 1, manifest: { widgets: [] }, history: {} };
    try {
      var parsed = JSON.parse(cardText(card) || '{}');
      if (!parsed || parsed.v !== 1) throw new Error('unsupported Widget state');
      if (!parsed.manifest || !Array.isArray(parsed.manifest.widgets)) parsed.manifest = { widgets: [] };
      if (!parsed.history || typeof parsed.history !== 'object') parsed.history = {};
      return parsed;
    } catch (error) {
      return { v: 1, manifest: { widgets: [] }, history: {} };
    }
  }

  function publishWidget() {
    if (!widgetAvailable()) return false;
    var payload = readWidgetPayload();
    var otherWidgets = payload.manifest.widgets.filter(function (widget) {
      return widget && WIDGET_IDS.indexOf(widget.id) === -1;
    });
    if (otherWidgets.length > MAX_WIDGETS - 1) return false;

    payload.manifest.widgets = otherWidgets.concat([
      {
        id: ACTIVE_WIDGET_ID,
        type: 'custom',
        align: 'center',
        style: {
          display: 'inline-flex',
          padding: '5px 10px',
          borderRadius: '999px',
          background: 'rgba(20,20,26,.82)',
          border: '1px solid rgba(255,255,255,.12)',
          boxShadow: 'none'
        }
      }
    ]);

    Object.keys(payload.history).forEach(function (key) {
      var historicalValues = payload.history[key];
      if (!historicalValues || typeof historicalValues !== 'object') return;
      LEGACY_WIDGET_IDS.forEach(function (widgetId) { delete historicalValues[widgetId]; });
      if (Object.keys(historicalValues).length === 0) delete payload.history[key];
    });

    var liveCount = currentActionCount();
    var liveKey = String(liveCount);
    var baseValues = nearestWidgetValues(payload.history, liveCount);
    var currentValues = payload.history[liveKey] && typeof payload.history[liveKey] === 'object'
      ? payload.history[liveKey]
      : {};
    var values = Object.assign({}, baseValues, currentValues);
    values[ACTIVE_WIDGET_ID] = { html: widgetHtml() };
    payload.history[liveKey] = values;
    pruneChronosHistory(payload.history);
    writeCard(WIDGET_CARD, JSON.stringify(payload), 'Ultrascripts');
    return true;
  }

  function nearestWidgetValues(history, liveCount) {
    var keys = Object.keys(history || {}).map(function (key) {
      return { key: key, number: Number(key) };
    }).filter(function (item) {
      return isFinite(item.number) && item.number <= liveCount;
    }).sort(function (left, right) {
      return right.number - left.number;
    });
    if (!keys.length) return {};
    var value = history[keys[0].key];
    return value && typeof value === 'object' ? value : {};
  }

  function pruneChronosHistory(history) {
    var keys = Object.keys(history || {}).map(function (key) {
      return { key: key, number: Number(key) };
    }).filter(function (item) {
      return isFinite(item.number);
    }).sort(function (left, right) {
      return right.number - left.number;
    });
    for (var index = MAX_CHRONOS_HISTORY; index < keys.length; index += 1) {
      var values = history[keys[index].key];
      if (!values || typeof values !== 'object') continue;
      delete values['chronos-time'];
      delete values['chronos-date'];
      if (Object.keys(values).length === 0) delete history[keys[index].key];
    }
  }

  function clearWidget() {
    if (!widgetAvailable()) return;
    var card = findCard(WIDGET_CARD);
    if (!card) return;
    var payload = readWidgetPayload();
    payload.manifest.widgets = payload.manifest.widgets.filter(function (widget) {
      return widget && WIDGET_IDS.indexOf(widget.id) === -1;
    });
    Object.keys(payload.history).forEach(function (key) {
      var values = payload.history[key];
      if (!values || typeof values !== 'object') return;
      delete values['chronos-time'];
      delete values['chronos-date'];
      if (Object.keys(values).length === 0) delete payload.history[key];
    });
    writeCard(WIDGET_CARD, JSON.stringify(payload), 'Ultrascripts');
  }

  function publishToast() {
    var chronos = initialize();
    if (!chronos) return;
    var prefix = chronos.notice ? chronos.notice + ' ' : '';
    state.message = prefix + 'Chronos · ' + formatTime() + ' · ' + formatDate();
    chronos.notice = '';
  }

  function clearToast() {
    if (Object.prototype.hasOwnProperty.call(state, 'message')) delete state.message;
    var chronos = initialize();
    if (chronos) chronos.notice = '';
  }

  function hasNotice() {
    var chronos = initialize();
    return !!(chronos && chronos.notice);
  }

  function enabled() {
    var chronos = initialize();
    return !!(chronos && chronos.settings.enabled);
  }

  return {
    initialize: initialize,
    syncSettings: syncSettings,
    handleInput: handleInput,
    advanceToCurrentAction: advanceToCurrentAction,
    applyPendingCommand: applyPendingCommand,
    recordSnapshot: recordSnapshot,
    appendContext: appendContext,
    observeHeartbeat: observeHeartbeat,
    widgetAvailable: widgetAvailable,
    publishWidget: publishWidget,
    clearWidget: clearWidget,
    publishToast: publishToast,
    clearToast: clearToast,
    hasNotice: hasNotice,
    formatTime: formatTime,
    formatDate: formatDate,
    formatWidgetDate: formatWidgetDate,
    formatTimestamp: formatTimestamp,
    enabled: enabled,
    _test: {
      addMinutes: addMinutes,
      isLeapYear: isLeapYear,
      daysInMonth: daysInMonth,
      parseTime: parseTime,
      parseDate: parseDate,
      parseCommand: parseCommand,
      sleepUntilMorning: sleepUntilMorning,
      clockToMinuteIndex: clockToMinuteIndex,
      clockFromMinuteIndex: clockFromMinuteIndex
    }
  };
})();
