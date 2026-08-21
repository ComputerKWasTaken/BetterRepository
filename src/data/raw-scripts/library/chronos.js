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
  var WEEKDAY_OFFSETS = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  var WIDGET_IDS = ['chronos-time', 'chronos-date'];
  var MAX_WIDGETS = 100;
  var MAX_CHRONOS_HISTORY = 500;

  function currentActionCount() {
    var value = typeof info !== 'undefined' && info ? Number(info.actionCount) : 0;
    return isFinite(value) && value >= 0 ? Math.floor(value) : 0;
  }

  function defaultClock() {
    return { year: 1000, month: 1, day: 1, hour: 8, minute: 0 };
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
        applyArmed: true,
        notice: '',
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
    if (typeof previous.applyArmed !== 'boolean') previous.applyArmed = true;
    if (typeof previous.notice !== 'string') previous.notice = '';
    previous.ultrascripts = previous.ultrascripts || {};
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
    var year = clampInteger(clock.year, 1, 999999, 1000);
    var month = clampInteger(clock.month, 1, 12, 1);
    var day = clampInteger(clock.day, 1, daysInMonth(year, month), 1);
    return {
      year: year,
      month: month,
      day: day,
      hour: clampInteger(clock.hour, 0, 23, 8),
      minute: clampInteger(clock.minute, 0, 59, 0)
    };
  }

  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }

  function daysInMonth(year, month) {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    return [4, 6, 9, 11].indexOf(month) !== -1 ? 30 : 31;
  }

  function addMinutes(amount) {
    var chronos = initialize();
    if (!chronos) return;
    var remaining = Math.trunc(Number(amount) || 0);
    var clock = chronos.clock;

    while (remaining !== 0) {
      var minuteOfDay = clock.hour * 60 + clock.minute;
      var target = minuteOfDay + remaining;

      if (target >= 0 && target < 1440) {
        clock.hour = Math.floor(target / 60);
        clock.minute = target % 60;
        remaining = 0;
      } else if (target >= 1440) {
        remaining = target - 1440;
        clock.hour = 0;
        clock.minute = 0;
        addDays(clock, 1);
      } else {
        if (clock.year === 1 && clock.month === 1 && clock.day === 1) {
          clock.hour = 0;
          clock.minute = 0;
          remaining = 0;
        } else {
          remaining = target;
          addDays(clock, -1);
          clock.hour = 24;
          clock.minute = 0;
        }
      }
    }
  }

  function addDays(clock, direction) {
    if (direction > 0) {
      clock.day += 1;
      if (clock.day > daysInMonth(clock.year, clock.month)) {
        clock.day = 1;
        clock.month += 1;
        if (clock.month > 12) {
          clock.month = 1;
          clock.year += 1;
        }
      }
      return;
    }

    clock.day -= 1;
    if (clock.day < 1) {
      clock.month -= 1;
      if (clock.month < 1) {
        clock.month = 12;
        clock.year = Math.max(1, clock.year - 1);
      }
      clock.day = daysInMonth(clock.year, clock.month);
    }
  }

  function advanceToCurrentAction() {
    var chronos = initialize();
    if (!chronos) return;
    var actionCount = currentActionCount();
    var delta = actionCount - chronos.lastActionCount;

    if (chronos.settings.enabled && !chronos.settings.paused && delta !== 0) {
      addMinutes(delta * chronos.settings.minutesPerTurn);
    }
    chronos.lastActionCount = actionCount;
  }

  function weekdayIndex(clock) {
    var year = clock.year;
    if (clock.month < 3) year -= 1;
    return (
      year + Math.floor(year / 4) - Math.floor(year / 100) +
      Math.floor(year / 400) + WEEKDAY_OFFSETS[clock.month - 1] + clock.day
    ) % 7;
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

  function formatTimestamp() {
    return formatTime() + ' on ' + formatDate();
  }

  function appendContext(originalText) {
    var text = String(originalText || '');
    var suffix = '\n\n[Chronos: The current in-game time is ' + formatTimestamp() +
      '. Treat this timestamp as authoritative for temporal continuity.]';
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
      '# To set the live clock, fill either field and change Apply Changes to On.',
      '# Time accepts 8:30 AM or 20:30. Date accepts January 2, 1000 or 1000-01-02.',
      'New Time:',
      'New Date:',
      'Apply Changes: Off'
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

    var apply = parseToggle(values.applychanges, false);
    if (!apply) {
      chronos.applyArmed = true;
      return;
    }
    if (!chronos.applyArmed) return;
    chronos.applyArmed = false;

    var timeText = String(values.newtime || '').trim();
    var dateText = String(values.newdate || '').trim();
    var messages = [];
    var applied = false;

    if (timeText) {
      var parsedTime = parseTime(timeText);
      if (parsedTime) {
        chronos.clock.hour = parsedTime.hour;
        chronos.clock.minute = parsedTime.minute;
        applied = true;
      } else {
        messages.push('New Time was invalid');
      }
    }
    if (dateText) {
      var parsedDate = parseDate(dateText);
      if (parsedDate) {
        chronos.clock.year = parsedDate.year;
        chronos.clock.month = parsedDate.month;
        chronos.clock.day = parsedDate.day;
        applied = true;
      } else {
        messages.push('New Date was invalid');
      }
    }
    if (!timeText && !dateText) messages.push('no new time or date was provided');

    chronos.lastActionCount = currentActionCount();
    if (applied) messages.unshift('clock updated');
    chronos.notice = 'Chronos ' + messages.join('; ') + '.';
    writeCard(SETTINGS_CARD, resetApplyFields(entry), card.type || 'Chronos');
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
    var match = String(value || '').trim().match(/^(\d{1,2}):(\d{2})\s*([ap]m)?$/i);
    if (!match) return null;
    var hour = Number(match[1]);
    var minute = Number(match[2]);
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
      month = MONTH_NAMES.map(function (name) { return name.toLowerCase(); })
        .indexOf(monthName[1].toLowerCase()) + 1;
      day = Number(monthName[2]);
    } else {
      return null;
    }

    if (year < 1 || month < 1 || month > 12) return null;
    if (day < 1 || day > daysInMonth(year, month)) return null;
    return { year: year, month: month, day: day };
  }

  function resetApplyFields(entry) {
    var found = { time: false, date: false, apply: false };
    var lines = String(entry || '').split(/\r?\n/).map(function (line) {
      var key = line.indexOf(':') === -1
        ? ''
        : line.slice(0, line.indexOf(':')).toLowerCase().replace(/[^a-z0-9]/g, '');
      if (key === 'newtime') {
        found.time = true;
        return 'New Time:';
      }
      if (key === 'newdate') {
        found.date = true;
        return 'New Date:';
      }
      if (key === 'applychanges') {
        found.apply = true;
        return 'Apply Changes: Off';
      }
      return line;
    });
    if (!found.time || !found.date || !found.apply) return settingsTemplate(initialize().settings);
    return lines.join('\n');
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
    if (otherWidgets.length > MAX_WIDGETS - WIDGET_IDS.length) return false;

    payload.manifest.widgets = otherWidgets.concat([
      { id: 'chronos-time', type: 'stat', label: 'Time', color: '#fbbf24' },
      { id: 'chronos-date', type: 'text', label: 'Date' }
    ]);

    var liveCount = currentActionCount();
    var liveKey = String(liveCount);
    var baseValues = nearestWidgetValues(payload.history, liveCount);
    var currentValues = payload.history[liveKey] && typeof payload.history[liveKey] === 'object'
      ? payload.history[liveKey]
      : {};
    var values = Object.assign({}, baseValues, currentValues);
    values['chronos-time'] = formatTime();
    values['chronos-date'] = formatDate();
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
    advanceToCurrentAction: advanceToCurrentAction,
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
    formatTimestamp: formatTimestamp,
    enabled: enabled,
    _test: {
      addMinutes: addMinutes,
      isLeapYear: isLeapYear,
      daysInMonth: daysInMonth,
      parseTime: parseTime,
      parseDate: parseDate
    }
  };
})();
