// ============================================================
// LIBRARY - Stateboy
// ============================================================
// Requires BetterDungeon Ultrascripts for AI-assisted updates and Widget display.
// Stateboy still keeps the readable state card synced when AI or Widget is not
// available. Control it through the "Stateboy Settings" story card.

globalThis.bd = globalThis.bd || {};
var bd = globalThis.bd;

globalThis.Stateboy = function Stateboy(hook, inputText) {
  var text = String(inputText || '');

  if (!state || typeof state !== 'object' || !Array.isArray(storyCards)) {
    return { text: text };
  }

  state.stateboy = state.stateboy || {};
  var sb = state.stateboy;
  initializeStateboyStore(sb);

  var us = createStateboyUltrascriptsSdk();
  bd.stateboyUs = us;
  us.tick();

  var stateCard = ensureStateboyCard('Stateboy', DEFAULT_STATEBOY_STATE_CARD, 'Stateboy');
  var settingsCard = ensureStateboyCard('Stateboy Settings', DEFAULT_STATEBOY_SETTINGS_CARD, 'Stateboy');
  var stateCardText = getStateboyCardText(stateCard);
  var settingsResult = parseStateboySettings(getStateboyCardText(settingsCard));
  var sheet = parseStateboySheet(stateCardText);
  var serializedSheet = serializeStateboySheetForState(sheet);

  sb.settings = settingsResult.settings;
  sb.settingsErrors = settingsResult.errors;
  var observation = observeStateboyCardEntry(sb, stateCardText, serializedSheet);
  if (observation.userEdited) {
    if (sb.settings.changelogEnabled && sb.settings.userModificationChangelogEnabled) {
      var manualChanges = detectStateboyManualChanges(observation.previousSheet, serializedSheet);
      if (manualChanges.length > 0) {
        logStateboyManualChanges(sb, manualChanges);
        syncStateboyChangelogToNotes(stateCard, sb);
      }
    }
    sb.pendingAnalysisRequestId = '';
    sb.pendingAnalysisLiveCount = 0;
  }
  sb.sheet = serializedSheet;
  sb.lastSyncLiveCount = getStateboyLiveCount();
  sb.runtimeAvailable = us.available();
  sb.widgetAvailable = us.has('widget');
  sb.aiAvailable = us.has('ai', 'status') && us.has('ai', 'query');

  requestStateboyAiStatusIfNeeded(us, sb);

  if (sb.settings.stateboyEnabled && sb.settings.aiEnabled) {
    processStateboyAiResponse(us, sb, sheet, stateCard);
  } else {
    sb.pendingAnalysisRequestId = '';
    sb.pendingAnalysisLiveCount = 0;
  }

  if (!sb.settings.stateboyEnabled) {
    if (hook === 'context') clearStateboyWidgetIfNeeded(us, sb);
    us.commit();
    return { text: text };
  }

  if (hook === 'context') {
    var contextBlock = renderStateboySheet(sheet);
    if (contextBlock) text += '\n\n' + contextBlock;

    if (sb.settings.widgetsEnabled) {
      publishStateboyWidget(us, sb, sheet);
    } else {
      clearStateboyWidgetIfNeeded(us, sb);
    }
  }

  if (hook === 'output') {
    queueStateboyAiAnalysisIfNeeded(us, sb, sheet, text);
  }

  us.commit();
  return { text: text };
};

var DEFAULT_STATEBOY_STATE_CARD = [
  '## Player Stats',
  'XP: 0/1000',
  'Level: 1',
  '',
  '## Inventory',
  'Inventory: empty',
  '',
  '# How to use Stateboy',
  '# Add a category with ## Category Name',
  '# Add a state with Name: value',
  '# Stateboy guesses the type from how you write the value:',
  '# number: a plain number like 5 or -3.5',
  '# ratio: current/max like 20/100',
  '# percent: a number followed by % like 85%',
  '# boolean: On/Off, True/False, or Yes/No',
  '# list: comma-separated values like Sword, Shield, Potion',
  '# string: anything else',
  '# hide a state from widgets with: Name: value [widget: off]'
].join('\n');

var DEFAULT_STATEBOY_SETTINGS_CARD = [
  '# Stateboy Settings',
  '# Edit the values below. Toggles accept On or Off.',
  '',
  'Stateboy Enabled: On',
  '# When On, Stateboy reads the state sheet and injects it into story context.',
  '',
  'AI Enabled: On',
  '# When On, the AI module may propose state changes based on events.',
  '',
  'Widgets Enabled: On',
  '# When On, Stateboy publishes a widget dashboard.',
  '',
  'Debug Mode: Off',
  '# When On, Stateboy shows runtime, AI, and update-summary debug widgets.',
  '',
  'Minimum Confidence: 0.65',
  '# The minimum AI confidence (0.0 to 1.0) required to apply a change.',
  '',
  'Changelog Enabled: On',
  '# When On, accepted AI updates are written to Notes and shown to the AI updater.',
  '',
  'User Modification Changelog Enabled: On',
  '# When On, manual Stateboy card value/add/remove edits are written to Notes and shown to the AI updater.',
  '',
  'AI Changelog Entries: 6',
  '# How many recent changes the AI updater sees.',
  '',
  'Notes Changelog Entries: 20',
  '# How many recent changes are mirrored into the Stateboy card Notes.'
].join('\n');

var STATEBOY_DEFAULT_SETTINGS = {
  stateboyEnabled: true,
  aiEnabled: true,
  widgetsEnabled: true,
  debugMode: false,
  minimumConfidence: 0.65,
  changelogEnabled: true,
  userModificationChangelogEnabled: true,
  aiChangelogEntries: 6,
  notesChangelogEntries: 20
};

var STATEBOY_PENDING_TURN_LIMIT = 6;

function initializeStateboyStore(sb) {
  sb.version = sb.version || 1;
  sb.changeLog = Array.isArray(sb.changeLog) ? sb.changeLog : [];
  sb.rejectedLog = Array.isArray(sb.rejectedLog) ? sb.rejectedLog : [];
  sb.lastAcceptedSummary = sb.lastAcceptedSummary || '';
  sb.lastAiSummary = sb.lastAiSummary || '';
  sb.lastAiError = sb.lastAiError || '';
  sb.pendingAnalysisRequestId = sb.pendingAnalysisRequestId || '';
  sb.pendingAnalysisLiveCount = Number(sb.pendingAnalysisLiveCount || 0);
  sb.lastQueuedAnalysisLiveCount = Number(sb.lastQueuedAnalysisLiveCount || -1);
  sb.lastAiStatusRequestLiveCount = Number(sb.lastAiStatusRequestLiveCount || -1);
  sb.lastObservedStateCardEntry = typeof sb.lastObservedStateCardEntry === 'string' ? sb.lastObservedStateCardEntry : '';
  sb.lastScriptWrittenStateCardEntry = typeof sb.lastScriptWrittenStateCardEntry === 'string' ? sb.lastScriptWrittenStateCardEntry : '';
  sb.hasObservedStateCardEntry = sb.hasObservedStateCardEntry === true;
  sb.widgetWasPublished = sb.widgetWasPublished === true;
}

function createStateboyUltrascriptsSdk() {
  state.__stateboyUsSdk = state.__stateboyUsSdk || {};
  var store = state.__stateboyUsSdk;
  store.pendingRequests = store.pendingRequests || [];
  store.pendingAcks = store.pendingAcks || [];
  store.results = store.results || {};
  store.reqCounter = Number(store.reqCounter || 0);
  store.widget = store.widget || null;

  function findCard(title) {
    var cards = Array.isArray(storyCards) ? storyCards : [];
    for (var i = 0; i < cards.length; i++) {
      if (stateboyCardMatches(cards[i], title)) return cards[i];
    }
    return null;
  }

  function findCardIndex(title) {
    var cards = Array.isArray(storyCards) ? storyCards : [];
    for (var i = 0; i < cards.length; i++) {
      if (stateboyCardMatches(cards[i], title)) return i;
    }
    return -1;
  }

  function parseCard(title) {
    var card = findCard(title);
    if (!card) return null;
    try { return JSON.parse(getStateboyCardText(card) || '{}'); } catch (e) { return null; }
  }

  function heartbeat() {
    var cards = Array.isArray(storyCards) ? storyCards : [];
    var best = null;
    var bestScore = -1;
    for (var i = 0; i < cards.length; i++) {
      if (!stateboyCardMatches(cards[i], 'ultrascripts:heartbeat')) continue;
      try {
        var hb = JSON.parse(getStateboyCardText(cards[i]) || '{}');
        var score = stateboyHeartbeatScore(hb);
        if (score > bestScore) {
          best = hb;
          bestScore = score;
        }
      } catch (e) {}
    }
    return best;
  }

  function moduleList(hb) {
    var raw = hb && hb.modules;
    if (Array.isArray(raw)) return raw;
    if (raw && typeof raw === 'object') {
      var list = [];
      for (var id in raw) {
        if (!Object.prototype.hasOwnProperty.call(raw, id)) continue;
        var moduleInfo = raw[id];
        if (moduleInfo && typeof moduleInfo === 'object') {
          if (!moduleInfo.id) moduleInfo.id = id;
          list.push(moduleInfo);
        } else if (moduleInfo) {
          list.push({ id: id, ops: [] });
        }
      }
      return list;
    }
    return [];
  }

  function opList(moduleInfo) {
    var raw = moduleInfo && (moduleInfo.ops || moduleInfo.operations || moduleInfo.capabilities);
    if (Array.isArray(raw)) {
      return raw.map(function (op) {
        return typeof op === 'string' ? op : (op && (op.id || op.name || op.op));
      }).filter(Boolean);
    }
    if (raw && typeof raw === 'object') return Object.keys(raw);
    return [];
  }

  function has(moduleId, opName) {
    var hb = heartbeat();
    var mods = moduleList(hb);
    for (var i = 0; i < mods.length; i++) {
      var mod = mods[i];
      if (!mod || mod.id !== moduleId) continue;
      if (!opName) return true;
      return opList(mod).indexOf(opName) !== -1;
    }
    return false;
  }

  function rememberResult(moduleId, requestId, response) {
    store.results[moduleId] = store.results[moduleId] || {};
    store.results[moduleId][requestId] = response;
    var ids = Object.keys(store.results[moduleId]);
    if (ids.length > 60) {
      ids.sort(function (a, b) {
        var ra = store.results[moduleId][a] || {};
        var rb = store.results[moduleId][b] || {};
        return Number(ra.completedAt || 0) - Number(rb.completedAt || 0);
      });
      while (ids.length > 60) delete store.results[moduleId][ids.shift()];
    }
  }

  function tick() {
    var hb = heartbeat();
    var mods = moduleList(hb);
    for (var i = 0; i < mods.length; i++) {
      var moduleId = mods[i] && mods[i].id;
      if (!moduleId) continue;
      var card = parseCard('ultrascripts:in:' + moduleId);
      if (!card || !card.responses) continue;
      for (var requestId in card.responses) {
        if (!Object.prototype.hasOwnProperty.call(card.responses, requestId)) continue;
        var response = card.responses[requestId];
        if (!response) continue;
        if (response.status === 'ok' || response.status === 'err' || response.status === 'timeout') {
          rememberResult(moduleId, requestId, response);
          if (store.pendingAcks.indexOf(requestId) === -1) store.pendingAcks.push(requestId);
        }
      }
    }
  }

  function call(moduleId, opName, args) {
    store.reqCounter += 1;
    var requestId = 'stateboy.' + moduleId + '.' + opName + '#' + getStateboyLiveCount() + '.' + store.reqCounter;
    store.pendingRequests.push({
      id: requestId,
      module: moduleId,
      op: opName,
      args: args || {},
      ts: Date.now ? Date.now() : new Date().getTime()
    });
    return requestId;
  }

  function latest(moduleId, opName) {
    var bucket = store.results[moduleId];
    if (!bucket) return null;
    var prefix = opName ? ('stateboy.' + moduleId + '.' + opName + '#') : null;
    var best = null;
    for (var requestId in bucket) {
      if (!Object.prototype.hasOwnProperty.call(bucket, requestId)) continue;
      if (prefix && requestId.indexOf(prefix) !== 0) continue;
      var response = bucket[requestId];
      if (!best) {
        best = response;
        continue;
      }
      var responseLiveCount = Number(response.completedLiveCount || 0);
      var bestLiveCount = Number(best.completedLiveCount || 0);
      var responseTime = Number(response.completedAt || 0);
      var bestTime = Number(best.completedAt || 0);
      if (responseLiveCount > bestLiveCount || (responseLiveCount === bestLiveCount && responseTime > bestTime)) {
        best = response;
      }
    }
    return best;
  }

  function result(moduleId, requestId) {
    return store.results[moduleId] && store.results[moduleId][requestId]
      ? store.results[moduleId][requestId]
      : null;
  }

  function upsertCard(title, value, type) {
    var index = findCardIndex(title);
    if (index >= 0) {
      if (typeof updateStoryCard === 'function') updateStoryCard(index, title, value, type || 'Ultrascripts');
    } else if (typeof addStoryCard === 'function') {
      addStoryCard(title, value, type || 'Ultrascripts');
    }
  }

  function defineWidget(manifest) {
    var existing = parseCard('ultrascripts:state:widget');
    var interactions = store.widget && store.widget.interactions
      ? store.widget.interactions
      : (existing && existing.interactions ? existing.interactions : { ackSeq: 0 });
    store.widget = {
      v: 1,
      manifest: manifest,
      history: existing && existing.history ? existing.history : {},
      interactions: interactions
    };
  }

  function publishWidget(values) {
    if (!store.widget) return;
    store.widget.history[getStateboyLiveCount()] = values;
    upsertCard('ultrascripts:state:widget', JSON.stringify(store.widget), 'Ultrascripts');
  }

  function commit() {
    if (store.pendingRequests.length === 0 && store.pendingAcks.length === 0) return;
    upsertCard('ultrascripts:out', JSON.stringify({
      v: 1,
      requests: store.pendingRequests,
      acks: store.pendingAcks
    }), 'Ultrascripts');
    store.pendingRequests = [];
    store.pendingAcks = [];
  }

  return {
    findCard: findCard,
    parseCard: parseCard,
    upsertCard: upsertCard,
    heartbeat: heartbeat,
    available: function () { return !!heartbeat(); },
    has: has,
    tick: tick,
    call: call,
    latest: latest,
    result: result,
    defineWidget: defineWidget,
    publishWidget: publishWidget,
    commit: commit
  };
}

function ensureStateboyCard(title, defaultEntry, type) {
  var index = findStateboyCardIndex(title);
  if (index >= 0) return storyCards[index];
  if (typeof addStoryCard === 'function') {
    addStoryCard(title, defaultEntry, type || 'Stateboy');
    index = findStateboyCardIndex(title);
    if (index >= 0) return storyCards[index];
  }
  return { title: title, keys: title, entry: defaultEntry, type: type || 'Stateboy' };
}

function findStateboyCard(title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (stateboyCardMatches(cards[i], title)) return cards[i];
  }
  return null;
}

function findStateboyCardIndex(title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (stateboyCardMatches(cards[i], title)) return i;
  }
  return -1;
}

function updateStateboyCard(title, entry, type) {
  var index = findStateboyCardIndex(title);
  if (index >= 0) {
    if (typeof updateStoryCard === 'function') {
      var card = storyCards[index] || {};
      updateStoryCard(index, card.keys || card.key || card.title || title, entry, card.type || type || 'Stateboy');
    }
    return;
  }
  if (typeof addStoryCard === 'function') {
    addStoryCard(title, entry, type || 'Stateboy');
  }
}

function stateboyCardMatches(card, title) {
  if (!card) return false;
  if (card.title === title || card.key === title || card.keys === title) return true;
  if (Array.isArray(card.keys) && card.keys.indexOf(title) !== -1) return true;
  return false;
}

function getStateboyCardText(card) {
  if (!card) return '';
  if (card.entry !== undefined && card.entry !== null) return String(card.entry);
  if (card.value !== undefined && card.value !== null) return String(card.value);
  return '';
}

function getStateboyLiveCount() {
  if (typeof info !== 'undefined' && info && isFinite(Number(info.actionCount))) return Number(info.actionCount);
  return 0;
}

function stateboyHeartbeatScore(hb) {
  if (!hb || !hb.ultrascripts || hb.ultrascripts.protocol !== 1) return -1;
  if (hb.ultrascripts.client !== 'BetterDungeon' || hb.ultrascripts.archived) return -1;
  var modules = Array.isArray(hb.modules) ? hb.modules.length : (hb.modules && typeof hb.modules === 'object' ? Object.keys(hb.modules).length : 0);
  var writtenAt = Date.parse(hb.writtenAt || '') || 0;
  return modules * 10000000000000 + writtenAt;
}

function parseStateboySettings(text) {
  var settings = {
    stateboyEnabled: STATEBOY_DEFAULT_SETTINGS.stateboyEnabled,
    aiEnabled: STATEBOY_DEFAULT_SETTINGS.aiEnabled,
    widgetsEnabled: STATEBOY_DEFAULT_SETTINGS.widgetsEnabled,
    debugMode: STATEBOY_DEFAULT_SETTINGS.debugMode,
    minimumConfidence: STATEBOY_DEFAULT_SETTINGS.minimumConfidence,
    changelogEnabled: STATEBOY_DEFAULT_SETTINGS.changelogEnabled,
    userModificationChangelogEnabled: STATEBOY_DEFAULT_SETTINGS.userModificationChangelogEnabled,
    aiChangelogEntries: STATEBOY_DEFAULT_SETTINGS.aiChangelogEntries,
    notesChangelogEntries: STATEBOY_DEFAULT_SETTINGS.notesChangelogEntries
  };
  var errors = [];
  var lines = String(text || '').split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i].trim();
    if (!line || line.indexOf(':') === -1) continue;
    if (/^#\s|^\/\//.test(line)) continue;
    var parsed = splitStateboyNameValue(line);
    var key = normalizeStateboyKey(parsed.name);
    var valueText = stripStateboyDescription(parsed.value).value.trim();
    if (key === 'stateboyenabled') settings.stateboyEnabled = parseStateboyOnOff(valueText, settings.stateboyEnabled);
    else if (key === 'aienabled') settings.aiEnabled = parseStateboyOnOff(valueText, settings.aiEnabled);
    else if (key === 'widgetsenabled') settings.widgetsEnabled = parseStateboyOnOff(valueText, settings.widgetsEnabled);
    else if (key === 'debugmode') settings.debugMode = parseStateboyOnOff(valueText, settings.debugMode);
    else if (key === 'changelogenabled') settings.changelogEnabled = parseStateboyOnOff(valueText, settings.changelogEnabled);
    else if (key === 'usermodificationchangelogenabled') settings.userModificationChangelogEnabled = parseStateboyOnOff(valueText, settings.userModificationChangelogEnabled);
    else if (key === 'aichangelogentries') settings.aiChangelogEntries = parseStateboyInteger(valueText, settings.aiChangelogEntries, 0, 20);
    else if (key === 'noteschangelogentries') settings.notesChangelogEntries = parseStateboyInteger(valueText, settings.notesChangelogEntries, 0, 40);
    else if (key === 'minimumconfidence') {
      var n = Number(valueText);
      if (isFinite(n)) settings.minimumConfidence = clampStateboyNumber(n, 0, 1);
      else errors.push('Minimum Confidence is invalid; using default ' + settings.minimumConfidence + '.');
    }
  }
  return { settings: settings, errors: errors };
}

function parseStateboyOnOff(value, fallback) {
  var normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'on' || normalized === 'true' || normalized === 'yes' || normalized === 'enabled') return true;
  if (normalized === 'off' || normalized === 'false' || normalized === 'no' || normalized === 'disabled') return false;
  return fallback;
}

function parseStateboyInteger(value, fallback, min, max) {
  var n = Number(String(value || '').trim());
  if (!isFinite(n)) return fallback;
  return Math.round(clampStateboyNumber(n, min, max));
}

function normalizeStateboyKey(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseStateboySheet(text) {
  var sheet = { categories: [], entries: [], errors: [] };
  var current = createStateboyCategory('General', 0);
  var hasCurrent = false;
  var lines = String(text || '').split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    var rawLine = lines[i];
    var line = rawLine.trim();
    if (!line) continue;
    if (/^#{2,6}\s+/.test(line)) {
      current = createStateboyCategory(line.replace(/^#{2,6}\s+/, '').trim() || 'General', sheet.categories.length);
      sheet.categories.push(current);
      hasCurrent = true;
      continue;
    }
    if (/^#\s|^\/\//.test(line)) continue;
    if (line.indexOf(':') === -1) {
      sheet.errors.push({ line: i + 1, text: rawLine, reason: 'missing colon' });
      continue;
    }
    if (!hasCurrent) {
      sheet.categories.push(current);
      hasCurrent = true;
    }
    var parts = splitStateboyNameValue(line);
    var directiveResult = stripStateboyDirectives(parts.value);
    var desc = stripStateboyDescription(directiveResult.value);
    var parsedValue = parseStateboyValue(desc.value);
    var entry = {
      category: current.name,
      categoryIndex: current.index,
      name: parts.name.trim(),
      value: parsedValue.value,
      type: parsedValue.type,
      description: desc.description,
      directives: directiveResult.directives,
      rawValue: desc.value.trim(),
      order: sheet.entries.length,
      id: makeStateboyStateId(current.name, parts.name)
    };
    if (!entry.name) {
      sheet.errors.push({ line: i + 1, text: rawLine, reason: 'empty state name' });
      continue;
    }
    current.entries.push(entry);
    sheet.entries.push(entry);
  }
  if (!hasCurrent) sheet.categories = [];
  return sheet;
}

function createStateboyCategory(name, index) {
  return { name: name, index: index, entries: [] };
}

function splitStateboyNameValue(line) {
  var idx = line.indexOf(':');
  return {
    name: line.slice(0, idx),
    value: line.slice(idx + 1)
  };
}

function stripStateboyDescription(valueText) {
  var value = String(valueText || '').trim();
  var description = '';
  var match = value.match(/\s+\(([^()]*)\)\s*$/);
  if (match) {
    description = match[1].trim();
    value = value.slice(0, match.index).trim();
  }
  return { value: value, description: description };
}

function stripStateboyDirectives(valueText) {
  var value = String(valueText || '').trim();
  var directives = {};
  var match = value.match(/\s+\[([^\[\]]*)\]\s*$/);
  if (match) {
    directives = parseStateboyDirectives(match[1]);
    value = value.slice(0, match.index).trim();
  }
  return { value: value, directives: directives };
}

function parseStateboyDirectives(text) {
  var directives = {};
  var parts = String(text || '').split(',');
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim();
    if (!part) continue;
    var idx = part.indexOf(':');
    var rawName = idx >= 0 ? part.slice(0, idx) : part;
    var rawValue = idx >= 0 ? part.slice(idx + 1) : 'on';
    var name = normalizeStateboyDirectiveName(rawName);
    if (!name) continue;
    directives[name] = parseStateboyDirectiveValue(rawValue);
  }
  return directives;
}

function normalizeStateboyDirectiveName(name) {
  var key = normalizeStateboyKey(name);
  if (key === 'widget' || key === 'widgets' || key === 'showwidget' || key === 'showwidgets') return 'widget';
  if (key === 'hidewidget' || key === 'hidewidgets' || key === 'hiddenwidget' || key === 'hiddenwidgets') return 'hiddenWidget';
  return key;
}

function parseStateboyDirectiveValue(value) {
  var text = String(value || '').trim();
  var lowered = text.toLowerCase();
  if (lowered === 'on' || lowered === 'true' || lowered === 'yes' || lowered === 'show' || lowered === 'shown') return true;
  if (lowered === 'off' || lowered === 'false' || lowered === 'no' || lowered === 'hide' || lowered === 'hidden') return false;
  if (/^-?\d+(?:\.\d+)?$/.test(text) && isFinite(Number(text))) return Number(text);
  return text;
}

function formatStateboyDirectives(directives) {
  if (!directives || typeof directives !== 'object') return '';
  var keys = Object.keys(directives);
  if (keys.length === 0) return '';
  keys.sort();
  return '[' + keys.map(function (key) {
    return key + ': ' + formatStateboyDirectiveValue(directives[key]);
  }).join(', ') + ']';
}

function formatStateboyDirectiveValue(value) {
  if (typeof value === 'boolean') return value ? 'on' : 'off';
  if (value === null) return 'null';
  return String(value);
}

function parseStateboyValue(raw) {
  var value = String(raw || '').trim();
  if (!value) return { type: 'string', value: '' };

  var jsonParsed = tryParseStateboyJsonLiteral(value);
  if (jsonParsed.ok) return normalizeStateboyJsonValue(jsonParsed.value);

  var ratio = value.match(/^(-?\d+(?:\.\d+)?)\s*\/\s*(-?\d+(?:\.\d+)?)$/);
  if (ratio) {
    var current = Number(ratio[1]);
    var max = Number(ratio[2]);
    if (isFinite(current) && isFinite(max) && max > 0) {
      return { type: 'ratio', value: { current: clampStateboyNumber(current, 0, max), max: max } };
    }
  }

  var percent = value.match(/^(-?\d+(?:\.\d+)?)\s*%$/);
  if (percent && isFinite(Number(percent[1]))) {
    return { type: 'percent', value: clampStateboyNumber(Number(percent[1]), 0, 100) };
  }

  var lowered = value.toLowerCase();
  if (lowered === 'on' || lowered === 'true' || lowered === 'yes') return { type: 'boolean', value: true };
  if (lowered === 'off' || lowered === 'false' || lowered === 'no') return { type: 'boolean', value: false };

  if (/^-?\d+(?:\.\d+)?$/.test(value) && isFinite(Number(value))) {
    return { type: 'number', value: Number(value) };
  }

  if (value.indexOf(',') !== -1) {
    return {
      type: 'list',
      value: value.split(',').map(function (item) {
        return parseStateboyListItem(item.trim());
      }).filter(function (item) {
        return item !== '';
      })
    };
  }

  return { type: 'string', value: value };
}

function tryParseStateboyJsonLiteral(value) {
  var trimmed = String(value || '').trim();
  if (!/^(\{|\[|"|true$|false$|null$|-?\d)/i.test(trimmed)) return { ok: false };
  try {
    return { ok: true, value: JSON.parse(trimmed) };
  } catch (e) {
    return { ok: false };
  }
}

function normalizeStateboyJsonValue(value) {
  if (Array.isArray(value)) return { type: 'list', value: value };
  if (value === null) return { type: 'null', value: null };
  if (typeof value === 'number') return { type: 'number', value: value };
  if (typeof value === 'boolean') return { type: 'boolean', value: value };
  if (typeof value === 'string') return { type: 'string', value: value };
  if (value && typeof value === 'object') return { type: 'object', value: value };
  return { type: 'string', value: String(value) };
}

function parseStateboyListItem(item) {
  if (!item) return '';
  var jsonParsed = tryParseStateboyJsonLiteral(item);
  if (jsonParsed.ok) return jsonParsed.value;
  var lowered = item.toLowerCase();
  if (lowered === 'on' || lowered === 'true' || lowered === 'yes') return true;
  if (lowered === 'off' || lowered === 'false' || lowered === 'no') return false;
  if (/^-?\d+(?:\.\d+)?$/.test(item) && isFinite(Number(item))) return Number(item);
  return item;
}

function makeStateboyStateId(category, name) {
  return normalizeStateboyKey(category) + '::' + normalizeStateboyKey(name);
}

function serializeStateboySheetForState(sheet) {
  return {
    categories: sheet.categories.map(function (cat) {
      return {
        name: cat.name,
        entries: cat.entries.map(function (entry) {
          return {
            category: entry.category,
            name: entry.name,
            type: entry.type,
            value: entry.value,
            description: entry.description,
            directives: entry.directives,
            rawValue: entry.rawValue,
            id: entry.id
          };
        })
      };
    }),
    errors: sheet.errors
  };
}

function renderStateboySheet(sheet) {
  var lines = [];
  for (var i = 0; i < sheet.categories.length; i++) {
    var cat = sheet.categories[i];
    if (i > 0) lines.push('');
    lines.push('## ' + cat.name);
    for (var j = 0; j < cat.entries.length; j++) {
      var entry = cat.entries[j];
      var line = entry.name + ': ' + formatStateboyValue(entry.type, entry.value);
      if (entry.description) line += ' (' + entry.description + ')';
      var directiveText = formatStateboyDirectives(entry.directives);
      if (directiveText) line += ' ' + directiveText;
      lines.push(line);
    }
  }
  return lines.join('\n');
}

function formatStateboyValue(type, value) {
  if (type === 'ratio') {
    var current = value && isFinite(Number(value.current)) ? Number(value.current) : 0;
    var max = value && isFinite(Number(value.max)) ? Number(value.max) : 1;
    return trimStateboyNumber(current) + '/' + trimStateboyNumber(max);
  }
  if (type === 'percent') return trimStateboyNumber(clampStateboyNumber(Number(value) || 0, 0, 100)) + '%';
  if (type === 'boolean') return value ? 'On' : 'Off';
  if (type === 'number') return trimStateboyNumber(Number(value) || 0);
  if (type === 'list') {
    return (Array.isArray(value) ? value : []).map(formatStateboyListItem).join(', ');
  }
  if (type === 'object') return JSON.stringify(value);
  if (type === 'null') return 'null';
  return String(value === undefined || value === null ? '' : value);
}

function formatStateboyListItem(value) {
  if (value === null) return 'null';
  if (typeof value === 'number') return trimStateboyNumber(value);
  if (typeof value === 'boolean') return value ? 'On' : 'Off';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
}

function trimStateboyNumber(value) {
  var n = Number(value);
  if (!isFinite(n)) return '0';
  if (Math.round(n) === n) return String(n);
  return String(Math.round(n * 1000) / 1000);
}

function clampStateboyNumber(value, min, max) {
  var n = Number(value);
  if (!isFinite(n)) n = min;
  return Math.min(max, Math.max(min, n));
}

function requestStateboyAiStatusIfNeeded(us, sb) {
  var liveCount = getStateboyLiveCount();
  if (!sb.settings || !sb.settings.stateboyEnabled || !sb.settings.aiEnabled) return;
  if (!us.available() || !us.has('ai', 'status')) return;
  if (sb.lastAiStatusRequestLiveCount === liveCount) return;
  var latestStatus = us.latest('ai', 'status');
  if (latestStatus && latestStatus.status === 'ok' && latestStatus.data && latestStatus.data.ready) return;
  sb.lastAiStatusRequestLiveCount = liveCount;
  us.call('ai', 'status', {});
}

function processStateboyAiResponse(us, sb, sheet, stateCard) {
  var pendingId = sb.pendingAnalysisRequestId;
  if (!pendingId) return;
  var response = us.result('ai', pendingId);
  if (!response) {
    if ((getStateboyLiveCount() - Number(sb.pendingAnalysisLiveCount || 0)) > STATEBOY_PENDING_TURN_LIMIT) {
      sb.lastAiError = 'AI request expired without a terminal response.';
      sb.pendingAnalysisRequestId = '';
      sb.pendingAnalysisLiveCount = 0;
    }
    return;
  }

  sb.pendingAnalysisRequestId = '';
  sb.pendingAnalysisLiveCount = 0;

  if (response.status !== 'ok') {
    sb.lastAiError = response.error && response.error.message ? response.error.message : 'AI request failed with status ' + response.status + '.';
    return;
  }

  var payload = response.data && response.data.json;
  var result = applyStateboyAiPayload(payload, sb, sheet);
  if (result.accepted.length > 0) {
    var rendered = renderStateboySheet(sheet);
    updateStateboyCard('Stateboy', rendered, stateCard && stateCard.type ? stateCard.type : 'Stateboy');
    rememberStateboyScriptWrite(sb, rendered, sheet);
    syncStateboyChangelogToNotes(findStateboyCard('Stateboy') || stateCard, sb);
    sb.lastAcceptedSummary = payload && payload.summary ? String(payload.summary).slice(0, 240) : result.accepted.length + ' state change(s) accepted.';
    sb.lastAiSummary = sb.lastAcceptedSummary;
  } else if (payload && payload.summary) {
    sb.lastAiSummary = String(payload.summary).slice(0, 240);
  }
}

function applyStateboyAiPayload(payload, sb, sheet) {
  var accepted = [];
  var rejected = [];
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.changes)) {
    pushStateboyRejected(sb, 'malformed', 'AI response did not include a changes array.');
    return { accepted: accepted, rejected: rejected };
  }

  for (var i = 0; i < payload.changes.length; i++) {
    var change = payload.changes[i];
    var validation = validateStateboyChange(change, sb.settings, sheet);
    if (!validation.ok) {
      rejected.push(validation);
      pushStateboyRejected(sb, change && change.name ? change.name : 'unknown', validation.reason);
      continue;
    }
    if (!sameStateboyValue(validation.entry.value, validation.value)) {
      var oldValue = cloneStateboyValue(validation.entry.value);
      validation.entry.value = validation.value;
      validation.entry.rawValue = formatStateboyValue(validation.entry.type, validation.value);
      accepted.push({
        category: validation.entry.category,
        name: validation.entry.name,
        oldValue: oldValue,
        value: validation.value,
        reason: change.reason || '',
        confidence: change.confidence
      });
      pushStateboyChange(sb, validation.entry, change, oldValue, validation.value);
    }
  }

  return { accepted: accepted, rejected: rejected };
}

function validateStateboyChange(change, settings, sheet) {
  if (!change || typeof change !== 'object') return { ok: false, reason: 'change is not an object' };
  if (change.operation !== 'set') return { ok: false, reason: 'unsupported operation' };
  var confidence = Number(change.confidence);
  if (!isFinite(confidence) || confidence < settings.minimumConfidence) return { ok: false, reason: 'low confidence' };
  var entry = findStateboyEntry(sheet, change.category, change.name);
  if (!entry) return { ok: false, reason: 'unknown state' };
  var coerced = coerceStateboyValueForEntry(entry, change.value);
  if (!coerced.ok) return { ok: false, reason: coerced.reason };
  return { ok: true, entry: entry, value: coerced.value };
}

function findStateboyEntry(sheet, category, name) {
  for (var i = 0; i < sheet.entries.length; i++) {
    var entry = sheet.entries[i];
    if (entry.category === category && entry.name === name) return entry;
  }
  return null;
}

function coerceStateboyValueForEntry(entry, value) {
  if (entry.type === 'ratio') {
    var max = entry.value && isFinite(Number(entry.value.max)) ? Number(entry.value.max) : 1;
    var current = null;
    if (typeof value === 'number') current = value;
    else if (typeof value === 'string') {
      var parsed = parseStateboyValue(value);
      if (parsed.type === 'ratio') current = parsed.value.current;
      else if (parsed.type === 'number') current = parsed.value;
    } else if (value && typeof value === 'object' && isFinite(Number(value.current))) {
      current = Number(value.current);
    }
    if (!isFinite(Number(current))) return { ok: false, reason: 'ratio value must provide a finite current value' };
    return { ok: true, value: { current: clampStateboyNumber(Number(current), 0, max), max: max } };
  }

  if (entry.type === 'percent') {
    var percent = null;
    if (typeof value === 'number') percent = value;
    else if (typeof value === 'string') {
      var parsedPercent = parseStateboyValue(value);
      if (parsedPercent.type === 'percent' || parsedPercent.type === 'number') percent = parsedPercent.value;
    }
    if (!isFinite(Number(percent))) return { ok: false, reason: 'percent value must be finite' };
    return { ok: true, value: clampStateboyNumber(Number(percent), 0, 100) };
  }

  if (entry.type === 'number') {
    var numberValue = typeof value === 'number' ? value : Number(value);
    if (!isFinite(numberValue)) return { ok: false, reason: 'number value must be finite' };
    return { ok: true, value: numberValue };
  }

  if (entry.type === 'boolean') {
    if (typeof value === 'boolean') return { ok: true, value: value };
    if (typeof value === 'string') {
      var lowered = value.trim().toLowerCase();
      if (lowered === 'on' || lowered === 'true' || lowered === 'yes') return { ok: true, value: true };
      if (lowered === 'off' || lowered === 'false' || lowered === 'no') return { ok: true, value: false };
    }
    return { ok: false, reason: 'boolean value must be true/false or on/off' };
  }

  if (entry.type === 'list') {
    if (Array.isArray(value)) return { ok: true, value: value };
    if (typeof value === 'string') {
      var parsedList = parseStateboyValue(value);
      if (parsedList.type === 'list') return { ok: true, value: parsedList.value };
      if (parsedList.type === 'string') return { ok: true, value: [parsedList.value] };
      return { ok: true, value: [parsedList.value] };
    }
    return { ok: false, reason: 'list value must be an array or comma-list string' };
  }

  if (entry.type === 'object') {
    if (value && typeof value === 'object' && !Array.isArray(value)) return { ok: true, value: value };
    return { ok: false, reason: 'object value must be an object' };
  }

  if (entry.type === 'null') {
    if (value === null) return { ok: true, value: null };
    return { ok: false, reason: 'null state only accepts null' };
  }

  if (typeof value === 'object') return { ok: false, reason: 'string value must not be an object' };
  return { ok: true, value: String(value) };
}

function sameStateboyValue(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function cloneStateboyValue(value) {
  if (value === undefined) return value;
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (e) {
    return value;
  }
}

function observeStateboyCardEntry(sb, currentEntry, currentSheet) {
  var previousSheet = sb.sheet;
  var userEdited = false;

  if (!sb.hasObservedStateCardEntry) {
    sb.hasObservedStateCardEntry = true;
  } else if (currentEntry !== sb.lastObservedStateCardEntry && currentEntry !== sb.lastScriptWrittenStateCardEntry) {
    userEdited = true;
  }

  sb.lastObservedStateCardEntry = currentEntry;
  return {
    userEdited: userEdited,
    previousSheet: previousSheet,
    currentSheet: currentSheet
  };
}

function rememberStateboyScriptWrite(sb, entry, sheet) {
  sb.lastScriptWrittenStateCardEntry = entry;
  sb.lastObservedStateCardEntry = entry;
  sb.hasObservedStateCardEntry = true;
  sb.sheet = serializeStateboySheetForState(sheet);
}

function detectStateboyManualChanges(previousSheet, currentSheet) {
  var changes = [];
  if (!previousSheet || !Array.isArray(previousSheet.categories)) return changes;
  if (!currentSheet || !Array.isArray(currentSheet.categories)) return changes;

  var previous = indexStateboySerializedEntries(previousSheet);
  var current = indexStateboySerializedEntries(currentSheet);

  for (var currentId in current.map) {
    if (!Object.prototype.hasOwnProperty.call(current.map, currentId)) continue;
    var currentEntry = current.map[currentId];
    var previousEntry = previous.map[currentId];
    if (!previousEntry) {
      changes.push(makeStateboyManualChange('add', null, currentEntry));
      continue;
    }
    if (previousEntry.type !== currentEntry.type || !sameStateboyValue(previousEntry.value, currentEntry.value)) {
      var valueChange = makeStateboyManualChange('set', previousEntry, currentEntry);
      if (!isNoopStateboyChangeRecord(valueChange)) changes.push(valueChange);
    }
  }

  for (var previousId in previous.map) {
    if (!Object.prototype.hasOwnProperty.call(previous.map, previousId)) continue;
    if (!current.map[previousId]) changes.push(makeStateboyManualChange('remove', previous.map[previousId], null));
  }

  return changes;
}

function indexStateboySerializedEntries(sheet) {
  var map = {};
  var list = [];
  var categories = sheet && Array.isArray(sheet.categories) ? sheet.categories : [];
  for (var i = 0; i < categories.length; i++) {
    var entries = Array.isArray(categories[i].entries) ? categories[i].entries : [];
    for (var j = 0; j < entries.length; j++) {
      var entry = entries[j];
      if (!entry || !entry.id) continue;
      map[entry.id] = entry;
      list.push(entry);
    }
  }
  return { map: map, list: list };
}

function makeStateboyManualChange(operation, previousEntry, currentEntry) {
  var entry = currentEntry || previousEntry || {};
  var oldDisplay = previousEntry ? formatStateboyValue(previousEntry.type, previousEntry.value) : '(missing)';
  var newDisplay = currentEntry ? formatStateboyValue(currentEntry.type, currentEntry.value) : '(removed)';
  var reason = 'User edited the Stateboy card.';

  if (operation === 'add') reason = 'User added this state to the Stateboy card.';
  else if (operation === 'remove') reason = 'User removed this state from the Stateboy card.';
  else if (operation === 'set') reason = 'User corrected this state in the Stateboy card.';
  else if (operation === 'describe') {
    oldDisplay = 'description: ' + (previousEntry && previousEntry.description ? previousEntry.description : '(none)');
    newDisplay = 'description: ' + (currentEntry && currentEntry.description ? currentEntry.description : '(none)');
    reason = 'User edited this state description in the Stateboy card.';
  }

  return {
    source: 'manual',
    operation: operation,
    category: entry.category,
    name: entry.name,
    type: currentEntry ? currentEntry.type : (previousEntry ? previousEntry.type : 'string'),
    oldValue: previousEntry ? cloneStateboyValue(previousEntry.value) : null,
    value: currentEntry ? cloneStateboyValue(currentEntry.value) : null,
    oldDisplay: oldDisplay,
    display: newDisplay,
    confidence: null,
    reason: reason
  };
}

function isNoopStateboyChangeRecord(record) {
  if (!record) return true;
  return String(record.oldDisplay || '') === String(record.display || '');
}

function logStateboyManualChanges(sb, changes) {
  for (var i = 0; i < changes.length; i++) {
    pushStateboyChangeRecord(sb, changes[i]);
  }
  sb.lastAcceptedSummary = summarizeStateboyManualChanges(changes);
}

function summarizeStateboyManualChanges(changes) {
  if (!Array.isArray(changes) || changes.length === 0) return '';
  if (changes.length === 1) {
    var change = changes[0];
    return 'Manual Stateboy edit: ' + change.category + '.' + change.name + ' ' + change.operation + '.';
  }
  return changes.length + ' manual Stateboy edits logged.';
}

function pushStateboyChange(sb, entry, change, oldValue, newValue) {
  pushStateboyChangeRecord(sb, {
    source: 'ai',
    operation: 'set',
    category: entry.category,
    name: entry.name,
    type: entry.type,
    oldValue: oldValue,
    value: newValue,
    oldDisplay: formatStateboyValue(entry.type, oldValue),
    display: formatStateboyValue(entry.type, newValue),
    confidence: Number(change.confidence),
    reason: change.reason || ''
  });
}

function pushStateboyChangeRecord(sb, record) {
  if (record && record.operation === 'set' && isNoopStateboyChangeRecord(record)) return;
  var entry = {
    at: Date.now ? Date.now() : new Date().getTime(),
    liveCount: getStateboyLiveCount(),
    source: record.source || 'ai',
    operation: record.operation || 'set',
    category: record.category,
    name: record.name,
    type: record.type,
    oldValue: record.oldValue,
    value: record.value,
    oldDisplay: record.oldDisplay,
    display: record.display,
    confidence: record.confidence,
    reason: record.reason || ''
  };
  entry.summary = formatStateboyChangeLogLine(entry);
  sb.changeLog.push(entry);
  while (sb.changeLog.length > 40) sb.changeLog.shift();
}

function pushStateboyRejected(sb, name, reason) {
  sb.rejectedLog.push({
    at: Date.now ? Date.now() : new Date().getTime(),
    liveCount: getStateboyLiveCount(),
    name: name,
    reason: reason
  });
  while (sb.rejectedLog.length > 40) sb.rejectedLog.shift();
}

function syncStateboyChangelogToNotes(card, sb) {
  if (!card || !sb || !sb.settings || !sb.settings.changelogEnabled) return;
  var text = renderStateboyChangelogNotes(sb, sb.settings.notesChangelogEntries);
  if (!text) return;
  if (card.description !== text) card.description = text;
  if (Object.prototype.hasOwnProperty.call(card, 'notes') && card.notes !== text) card.notes = text;
}

function renderStateboyChangelogNotes(sb, count) {
  var lines = [
    'Stateboy Changelog',
    'Newest first. AI updates and manual Stateboy card edits.',
    ''
  ];
  var rendered = renderStateboyRecentChanges(sb, count);
  if (rendered) lines.push(rendered);
  else lines.push('No Stateboy changes yet.');
  return lines.join('\n').slice(0, 3000);
}

function renderStateboyRecentChanges(sb, count) {
  if (!sb || !Array.isArray(sb.changeLog) || count <= 0) return '';
  var entries = sb.changeLog.slice(-count).reverse();
  var lines = [];
  for (var i = 0; i < entries.length; i++) {
    lines.push(formatStateboyChangeLogLine(entries[i]));
  }
  return lines.join('\n');
}

function formatStateboyChangeLogLine(entry) {
  if (!entry) return '';
  var oldText = entry.oldDisplay || formatStateboyValue(entry.type, entry.oldValue);
  var newText = entry.display || formatStateboyValue(entry.type, entry.value);
  var source = entry.source === 'manual' ? 'Manual' : 'AI';
  var operation = entry.operation || 'set';
  var confidence = source === 'AI' && isFinite(Number(entry.confidence))
    ? 'confidence ' + trimStateboyNumber(Number(entry.confidence))
    : 'manual edit';
  var reason = String(entry.reason || '').replace(/\s+/g, ' ').trim();
  if (reason.length > 160) reason = reason.slice(0, 157) + '...';
  return [
    'Turn ' + Number(entry.liveCount || 0),
    source + ' ' + operation,
    entry.category + '.' + entry.name + ': ' + oldText + ' -> ' + newText,
    confidence,
    reason || 'No reason provided.'
  ].join(' | ');
}

function queueStateboyAiAnalysisIfNeeded(us, sb, sheet, outputText) {
  var liveCount = getStateboyLiveCount();
  if (!sb.settings.aiEnabled || sheet.entries.length === 0) return;
  if (!us.available() || !us.has('ai', 'query')) return;
  if (sb.pendingAnalysisRequestId) return;
  if (sb.lastQueuedAnalysisLiveCount === liveCount) return;

  var aiStatus = us.latest('ai', 'status');
  if (!aiStatus || aiStatus.status !== 'ok' || !aiStatus.data || aiStatus.data.ready !== true) {
    return;
  }

  var prompt = buildStateboyAiPrompt(sb, sheet, outputText);
  var requestId = us.call('ai', 'query', {
    prompt: prompt,
    thinking: 'low',
    output: {
      type: 'json',
      schema: stateboyAiResponseSchema()
    }
  });
  sb.pendingAnalysisRequestId = requestId;
  sb.pendingAnalysisLiveCount = liveCount;
  sb.lastQueuedAnalysisLiveCount = liveCount;
  sb.lastAiError = '';
}

function buildStateboyAiPrompt(sb, sheet, outputText) {
  var recent = [];
  var actions = Array.isArray(history) ? history.slice(-8) : [];
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i] || {};
    recent.push((action.type || 'action') + ': ' + String(action.text || action.rawText || '').slice(0, 900));
  }
  var recentChanges = sb && sb.settings && sb.settings.changelogEnabled
    ? renderStateboyRecentChanges(sb, sb.settings.aiChangelogEntries)
    : '';

  var prompt = [
    'You are Stateboy, an AI Dungeon state update assistant.',
    'Your job is to propose state changes based only on the recent story.',
    'Return JSON that follows the provided schema.',
    'Only use operation "set".',
    'Only target states that already exist in the current state sheet.',
    'Do not invent, add, delete, rename, or restructure states.',
    'Use confidence from 0.00 to 1.00. Use low confidence when uncertain.',
    'Use the recent Stateboy changelog to avoid repeating updates that were already applied or manually corrected.',
    '',
    'Current state sheet:',
    renderStateboySheet(sheet),
    '',
    'Recent Stateboy changelog:',
    recentChanges || '(No Stateboy changes yet.)',
    '',
    'Recent history:',
    recent.join('\n') || '(No recent history available.)',
    '',
    'Most recent model output:',
    String(outputText || '').slice(0, 2500),
    '',
    'Propose only meaningful state changes caused by the latest events.'
  ].join('\n');

  return prompt;
}

function stateboyAiResponseSchema() {
  return {
    type: 'object',
    properties: {
      changes: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category: { type: 'string' },
            name: { type: 'string' },
            operation: { type: 'string' },
            value: {
              anyOf: [
                { type: 'string' },
                { type: 'number' },
                { type: 'boolean' },
                { type: 'array' },
                { type: 'object' },
                { type: 'null' }
              ]
            },
            confidence: { type: 'number' },
            reason: { type: 'string' }
          },
          required: ['category', 'name', 'operation', 'value', 'confidence', 'reason'],
          additionalProperties: false
        }
      },
      summary: { type: 'string' }
    },
    required: ['changes', 'summary'],
    additionalProperties: false
  };
}

function publishStateboyWidget(us, sb, sheet) {
  if (!us.available() || !us.has('widget')) return;

  var widgets = [];
  var values = {};

  if (sb.settings.debugMode) {
    widgets.push(
      { id: 'stateboy_status', type: 'text', label: 'Stateboy' },
      { id: 'stateboy_ai', type: 'badge', label: 'AI' },
      { id: 'stateboy_summary', type: 'text', label: 'Last Update' }
    );
    values.stateboy_status = 'Running';
    values.stateboy_ai = {
      text: sb.settings.aiEnabled ? (sb.pendingAnalysisRequestId ? 'thinking' : 'ready') : 'off',
      color: sb.settings.aiEnabled ? '#22c55e' : '#f59e0b'
    };
    values.stateboy_summary = sb.lastAcceptedSummary || sb.lastAiSummary || 'No accepted updates yet.';
  }

  for (var i = 0; i < sheet.entries.length; i++) {
    var entry = sheet.entries[i];
    var widget = makeStateboyWidget(entry, i);
    if (!widget) continue;
    widgets.push(widget.config);
    values[widget.config.id] = widget.value;
  }

  us.defineWidget({ widgets: widgets });
  us.publishWidget(values);
  sb.widgetWasPublished = true;
}

function makeStateboyWidget(entry, index) {
  if (!stateboyShouldShowWidget(entry)) return null;
  var id = ('stateboy_' + index + '_' + normalizeStateboyKey(entry.name)).slice(0, 60);
  if (entry.type === 'ratio') {
    return {
      config: { id: id, type: 'bar', label: entry.name, max: entry.value.max || 1, color: '#60a5fa' },
      value: entry.value.current || 0
    };
  }
  if (entry.type === 'percent') {
    return {
      config: { id: id, type: 'bar', label: entry.name, max: 100, color: '#22c55e' },
      value: entry.value
    };
  }
  if (entry.type === 'number') {
    return {
      config: { id: id, type: 'stat', label: entry.name, color: '#a78bfa' },
      value: entry.value
    };
  }
  if (entry.type === 'boolean') {
    return {
      config: { id: id, type: 'badge', label: entry.name, color: entry.value ? '#22c55e' : '#f59e0b' },
      value: { text: entry.value ? 'On' : 'Off', color: entry.value ? '#22c55e' : '#f59e0b' }
    };
  }
  if (entry.type === 'list') {
    var items = Array.isArray(entry.value) ? entry.value.map(function (item) { return String(formatStateboyListItem(item)); }) : [];
    if (items.length <= 6) {
      return {
        config: { id: id, type: 'taggroup', label: entry.name },
        value: { items: items }
      };
    }
    return {
      config: { id: id, type: 'list', label: entry.name },
      value: items.slice(0, 12).map(function (item) { return { text: item }; })
    };
  }
  if (entry.type === 'object') {
    return {
      config: { id: id, type: 'text', label: entry.name },
      value: JSON.stringify(entry.value).slice(0, 180)
    };
  }
  return {
    config: { id: id, type: 'text', label: entry.name },
    value: String(entry.value === undefined || entry.value === null ? '' : entry.value).slice(0, 180)
  };
}

function stateboyShouldShowWidget(entry) {
  var directives = entry && entry.directives ? entry.directives : {};
  if (directives.hiddenWidget === true) return false;
  if (directives.widget === false) return false;
  return true;
}

function clearStateboyWidgetIfNeeded(us, sb) {
  if (!sb.widgetWasPublished || !us.available() || !us.has('widget')) return;
  us.defineWidget({ widgets: [] });
  us.publishWidget({});
  sb.widgetWasPublished = false;
}

globalThis.StateboyInternals = {
  parseSettings: parseStateboySettings,
  parseSheet: parseStateboySheet,
  renderSheet: renderStateboySheet,
  parseValue: parseStateboyValue
};
