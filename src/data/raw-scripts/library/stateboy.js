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
  ensureStateboyCard('Stateboy Guide', DEFAULT_STATEBOY_GUIDE_CARD, 'Stateboy');
  var stateCardText = getStateboyCardText(stateCard);
  var settingsCardText = getStateboyCardText(settingsCard);
  var settingsResult = parseStateboySettings(settingsCardText);
  var migratedSettingsText = removeStateboyLegacyChangelogCountSettings(settingsCardText);
  if (migratedSettingsText !== settingsCardText) {
    updateStateboyCard('Stateboy Settings', migratedSettingsText, 'Stateboy');
  }
  var sheet = parseStateboySheet(stateCardText);
  var serializedSheet = serializeStateboySheetForState(sheet);

  sb.settings = settingsResult.settings;
  sb.settingsErrors = settingsResult.errors;
  sb.directiveIssues = sheet.directiveIssues;
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
    sb.lastQueuedAnalysisLiveCount = -1;
  }
  if (!observation.staleScriptWrite) sb.sheet = serializedSheet;
  sb.lastSyncLiveCount = getStateboyLiveCount();

  requestStateboyAiStatusIfNeeded(us, sb);
  requestStateboySdkConfigIfNeeded(us, sb);

  var setup = assessStateboySetup(us, sb.settings);
  sb.setup = setup;
  sb.runtimeAvailable = setup.runtimeAvailable;
  sb.widgetAvailable = setup.canPublishWidget;
  sb.aiAvailable = setup.canQueryAi;
  publishStateboySetupWarning(sb, setup);

  var aiProcessingEnabled = sb.settings.stateboyEnabled && sb.settings.aiEnabled && setup.canQueryAi;
  if (aiProcessingEnabled && !observation.staleScriptWrite) {
    processStateboyAiResponse(us, sb, sheet, stateCard);
  } else if (!aiProcessingEnabled) {
    sb.pendingAnalysisRequestId = '';
    sb.pendingAnalysisLiveCount = 0;
  }

  if (!sb.settings.stateboyEnabled) {
    if (hook === 'context') clearStateboyWidgetIfNeeded(us, sb);
    us.commit();
    return { text: text };
  }

  if (hook === 'context') {
    text = renderStateboySetupContextWarning(text, setup);

    var contextBlock = renderStateboyContextSheet(sheet);
    if (contextBlock) text += '\n\n' + contextBlock;

    if (setup.canPublishWidget) {
      publishStateboyWidget(us, sb, sheet);
    } else {
      clearStateboyWidgetIfNeeded(us, sb);
    }
  }

  if (hook === 'output' && !observation.staleScriptWrite) {
    queueStateboyAiAnalysisIfNeeded(us, sb, sheet, text, setup);
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
  'Inventory: empty'
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
  '# When On, manual Stateboy card value/add/remove edits are written to Notes and shown to the AI updater.'
].join('\n');

var DEFAULT_STATEBOY_GUIDE_CARD = [
  '# Stateboy Guide',
  '',
  '## State Sheet Format',
  'Add categories with Markdown-style headers:',
  '## Player Stats',
  '',
  'Add states as simple lines:',
  'XP: 500/1000 (The current XP of the player)',
  'Level: 4 (The current level of the player)',
  'Stamina: 88% (How much stamina remains)',
  'Mood: Tense (Current emotional tone)',
  'Inventory: Sword, Shield, Potion (Items currently carried)',
  '',
  'The Stateboy card is the only source of truth. Add, edit, or remove states directly in that card.',
  '',
  '## Value Types',
  'Stateboy guesses each type from how the value is written:',
  '- Ratio: current/max, such as 20/100.',
  '- Percent: a number followed by %, such as 85%.',
  '- Boolean: On/Off, True/False, Yes/No, or lowercase true/false.',
  '- Number: any finite number, such as 5 or -3.5.',
  '- List: comma-separated values or a JSON array.',
  '- Object: a JSON object for structured key/value data.',
  '- Null: the JSON literal null, meaning no current value.',
  '- Text: anything else.',
  '',
  '## JSON Notation',
  'JSON is an optional way to write a value, not a separate Stateboy type.',
  'Stateboy converts each JSON literal into its actual type:',
  'Active: true (Boolean, exactly like True or On)',
  'Inventory: ["Sword"]',
  'Profile: {"rank":"Captain","trusted":true}',
  '',
  'Use an object when one state genuinely needs related named fields. Prefer separate readable states for information the player should scan quickly.',
  '',
  '## Widget Display',
  'Every visible widget includes its state name. State categories may also appear as dividers when the Widget limit leaves room.',
  'Colors provide stable visual separation between states; boolean colors still communicate On and Off.',
  'Empty text, lists, and objects are shown as Empty rather than disappearing. Objects are displayed as structured named fields.',
  '',
  '## Descriptions',
  'Put a description in parentheses after the value:',
  'Reputation: Neutral (How the city currently views the player)',
  '',
  'Descriptions are shown to the story model and the AI updater. They can include interpretation bands:',
  'Stamina: 88% (0-20 exhausted | 21-60 tired | 61-100 steady)',
  '',
  '## State Directives',
  'Add simple flags in brackets at the end of a category header or state line:',
  '## Secrets [hidden, locked]',
  'Public Clue: Found [visible, unlocked]',
  'Internal Counter: 3 [no-widget]',
  'Main Quest: Find the Crown [important]',
  'Poisoned: On [temporary]',
  '',
  'Flags:',
  '- hidden hides the state from story Context and Widget.',
  '- visible shows it again, overriding an inherited hidden flag.',
  '- locked prevents AI changes; unlocked overrides an inherited lock.',
  '- no-widget hides only the Widget; widget shows it again.',
  '- important marks long-term protected state.',
  '- temporary marks short-lived state that may later be removed or made permanent.',
  '',
  'Category flags act as defaults. State flags override the category:',
  '## Secrets [hidden, locked]',
  'Public Clue: Found [visible, unlocked]',
  '',
  'Do not combine important and temporary. If both appear together, Stateboy ignores both and treats the state as normal.',
  'Unknown or contradictory flags are ignored. Debug Mode reports them.',
  '',
  '## Custom Scenario States',
  'Scenario creators can define their own default Stateboy states by creating a Stateboy card.',
  'Set both the card title to "Stateboy" and the card type to "Stateboy".',
  'When a player starts the scenario, Stateboy will use your custom states instead of the defaults.',
  '',
  'The AI updater can only propose changes to states that already exist in the Stateboy card. Stateboy rejects unknown states, wrong types, low-confidence proposals, and unsupported operations.',
  '',
  'If AI is disabled or unavailable, Stateboy still parses the card and injects manually edited state into context.'
].join('\n');

var STATEBOY_DEFAULT_SETTINGS = {
  stateboyEnabled: true,
  aiEnabled: true,
  widgetsEnabled: true,
  debugMode: false,
  minimumConfidence: 0.65,
  changelogEnabled: true,
  userModificationChangelogEnabled: true
};

var STATEBOY_PENDING_TURN_LIMIT = 6;
var STATEBOY_CARD_WRITE_TURN_LIMIT = 2;
var STATEBOY_AI_CHANGELOG_ENTRIES = 20;
var STATEBOY_NOTES_CHANGELOG_ENTRIES = 40;
var STATEBOY_WIDGET_LIMIT = 40;
var STATEBOY_WIDGET_COLORS = ['blue', 'green', 'purple', 'cyan', 'orange', 'yellow', 'red'];
var STATEBOY_DIRECTIVE_FLAGS = ['hidden', 'visible', 'locked', 'unlocked', 'no-widget', 'widget', 'important', 'temporary'];

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
  sb.lastSdkConfigRequestLiveCount = Number(sb.lastSdkConfigRequestLiveCount || -1);
  sb.lastSetupWarningCode = typeof sb.lastSetupWarningCode === 'string' ? sb.lastSetupWarningCode : '';
  sb.lastSetupWarningMessage = typeof sb.lastSetupWarningMessage === 'string' ? sb.lastSetupWarningMessage : '';
  sb.lastObservedStateCardEntry = typeof sb.lastObservedStateCardEntry === 'string' ? sb.lastObservedStateCardEntry : '';
  sb.lastScriptWrittenStateCardEntry = typeof sb.lastScriptWrittenStateCardEntry === 'string' ? sb.lastScriptWrittenStateCardEntry : '';
  sb.lastObservedStateSheetFingerprint = typeof sb.lastObservedStateSheetFingerprint === 'string' ? sb.lastObservedStateSheetFingerprint : '';
  sb.lastScriptWrittenStateSheetFingerprint = typeof sb.lastScriptWrittenStateSheetFingerprint === 'string' ? sb.lastScriptWrittenStateSheetFingerprint : '';
  sb.pendingStateCardWrite = sb.pendingStateCardWrite && typeof sb.pendingStateCardWrite === 'object'
    ? sb.pendingStateCardWrite
    : null;
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
    userModificationChangelogEnabled: STATEBOY_DEFAULT_SETTINGS.userModificationChangelogEnabled
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
    else if (key === 'minimumconfidence') {
      var n = Number(valueText);
      if (isFinite(n)) settings.minimumConfidence = clampStateboyNumber(n, 0, 1);
      else errors.push('Minimum Confidence is invalid; using default ' + settings.minimumConfidence + '.');
    }
  }
  return { settings: settings, errors: errors };
}

function removeStateboyLegacyChangelogCountSettings(text) {
  var lines = String(text || '').split(/\r?\n/);
  var kept = [];
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    var normalized = normalizeStateboyKey(line.indexOf(':') === -1 ? line : line.slice(0, line.indexOf(':')));
    var stockHelp = line.trim() === '# How many recent changes the AI updater sees.' ||
      line.trim() === '# How many recent changes are mirrored into the Stateboy card Notes.';
    if (normalized === 'aichangelogentries' || normalized === 'noteschangelogentries' || stockHelp) continue;
    kept.push(line);
  }
  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

function parseStateboyOnOff(value, fallback) {
  var normalized = String(value || '').trim().toLowerCase();
  if (normalized === 'on' || normalized === 'true' || normalized === 'yes' || normalized === 'enabled') return true;
  if (normalized === 'off' || normalized === 'false' || normalized === 'no' || normalized === 'disabled') return false;
  return fallback;
}

function normalizeStateboyKey(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseStateboySheet(text) {
  var sheet = { categories: [], entries: [], errors: [], directiveIssues: [] };
  var current = createStateboyCategory('General', 0);
  var hasCurrent = false;
  var lines = String(text || '').split(/\r?\n/);
  for (var i = 0; i < lines.length; i++) {
    var rawLine = lines[i];
    var line = rawLine.trim();
    if (!line) continue;
    if (/^#{2,6}\s+/.test(line)) {
      var header = stripStateboyDirectives(line.replace(/^#{2,6}\s+/, '').trim());
      current = createStateboyCategory(header.value.trim() || 'General', sheet.categories.length, header.directives);
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
      categoryDirectives: current.directives,
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
  sheet.directiveIssues = collectStateboyDirectiveIssues(sheet);
  return sheet;
}

function collectStateboyDirectiveIssues(sheet) {
  var issues = [];
  var categories = sheet && Array.isArray(sheet.categories) ? sheet.categories : [];
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    appendStateboyDirectiveIssues(issues, category.directives, 'Category ' + category.name);
    var entries = Array.isArray(category.entries) ? category.entries : [];
    for (var j = 0; j < entries.length; j++) {
      appendStateboyDirectiveIssues(
        issues,
        entries[j].directives,
        'State ' + category.name + '.' + entries[j].name
      );
    }
  }
  return issues;
}

function appendStateboyDirectiveIssues(target, directives, owner) {
  var unknown = directives && Array.isArray(directives.unknown) ? directives.unknown : [];
  var conflicts = directives && Array.isArray(directives.conflicts) ? directives.conflicts : [];
  for (var i = 0; i < unknown.length; i++) {
    target.push({ owner: owner, kind: 'unknown', flags: [unknown[i]], message: owner + ': unknown flag "' + unknown[i] + '" ignored.' });
  }
  for (var j = 0; j < conflicts.length; j++) {
    var pair = conflicts[j];
    var semanticConflict = pair[0] === 'important' && pair[1] === 'temporary';
    target.push({
      owner: owner,
      kind: 'conflict',
      flags: pair.slice(),
      message: owner + ': conflicting flags ' + pair.join(' and ') + ' ignored' + (semanticConflict ? '; treated as normal.' : '.')
    });
  }
}

function createStateboyCategory(name, index, directives) {
  return { name: name, index: index, directives: directives || createStateboyDirectiveSet(), entries: [] };
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
  var directives = createStateboyDirectiveSet();
  var match = value.match(/\s+\[([^\[\]]*)\]\s*$/);
  if (match) {
    directives = parseStateboyDirectives(match[1]);
    value = value.slice(0, match.index).trim();
  }
  return { value: value, directives: directives };
}

function parseStateboyDirectives(text) {
  var directives = createStateboyDirectiveSet();
  var seen = {};
  var parts = String(text || '').split(',');
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim();
    if (!part) continue;
    var flag = normalizeStateboyDirectiveFlag(part);
    if (!flag) {
      directives.unknown.push(part);
      continue;
    }
    if (!seen[flag]) {
      directives.flags.push(flag);
      seen[flag] = true;
    }
  }
  directives.conflicts = findStateboyDirectiveConflicts(directives.flags);
  return directives;
}

function createStateboyDirectiveSet() {
  return { flags: [], unknown: [], conflicts: [] };
}

function normalizeStateboyDirectiveFlag(value) {
  var key = normalizeStateboyKey(value);
  if (key === 'hidden') return 'hidden';
  if (key === 'visible') return 'visible';
  if (key === 'locked') return 'locked';
  if (key === 'unlocked') return 'unlocked';
  if (key === 'nowidget') return 'no-widget';
  if (key === 'widget') return 'widget';
  if (key === 'important') return 'important';
  if (key === 'temporary') return 'temporary';
  return '';
}

function findStateboyDirectiveConflicts(flags) {
  var flagSet = makeStateboyDirectiveFlagMap(flags);
  var conflicts = [];
  if (flagSet.hidden && flagSet.visible) conflicts.push(['hidden', 'visible']);
  if (flagSet.locked && flagSet.unlocked) conflicts.push(['locked', 'unlocked']);
  if (flagSet['no-widget'] && flagSet.widget) conflicts.push(['no-widget', 'widget']);
  if (flagSet.important && flagSet.temporary) conflicts.push(['important', 'temporary']);
  return conflicts;
}

function makeStateboyDirectiveFlagMap(flags) {
  var map = {};
  var list = Array.isArray(flags) ? flags : [];
  for (var i = 0; i < list.length; i++) map[list[i]] = true;
  return map;
}

function getCanonicalStateboyDirectiveFlags(directives) {
  var flags = directives && Array.isArray(directives.flags) ? directives.flags : [];
  var excluded = {};
  var conflicts = findStateboyDirectiveConflicts(flags);
  for (var i = 0; i < conflicts.length; i++) {
    excluded[conflicts[i][0]] = true;
    excluded[conflicts[i][1]] = true;
  }
  return STATEBOY_DIRECTIVE_FLAGS.filter(function (flag) {
    return flags.indexOf(flag) !== -1 && !excluded[flag];
  });
}

function formatStateboyDirectives(directives) {
  var flags = getCanonicalStateboyDirectiveFlags(directives);
  return flags.length ? '[' + flags.join(', ') + ']' : '';
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
        directives: cat.directives || {},
        entries: cat.entries.map(function (entry) {
          return {
            category: entry.category,
            name: entry.name,
            type: entry.type,
            value: entry.value,
            description: entry.description,
            directives: entry.directives,
            categoryDirectives: entry.categoryDirectives || {},
            rawValue: entry.rawValue,
            id: entry.id
          };
        })
      };
    }),
    errors: sheet.errors
  };
}

function makeStateboySheetFingerprint(sheet) {
  // Compare state meaning rather than raw card formatting. Story Card writes
  // may normalize whitespace or JSON key order between lifecycle hooks.
  var categories = sheet && Array.isArray(sheet.categories) ? sheet.categories : [];
  var errors = sheet && Array.isArray(sheet.errors) ? sheet.errors : [];
  var fingerprint = {
    categories: categories.map(function (category) {
      var entries = category && Array.isArray(category.entries) ? category.entries : [];
      return {
        name: category && category.name ? String(category.name) : '',
        directives: getCanonicalStateboyDirectiveFlags(category && category.directives),
        entries: entries.map(function (entry) {
          return {
            category: entry && entry.category ? String(entry.category) : '',
            name: entry && entry.name ? String(entry.name) : '',
            type: entry && entry.type ? String(entry.type) : '',
            value: canonicalizeStateboyFingerprintValue(entry ? entry.value : null),
            description: entry && entry.description ? String(entry.description) : '',
            directives: getCanonicalStateboyDirectiveFlags(entry && entry.directives)
          };
        })
      };
    }),
    errors: errors.map(function (error) {
      return {
        text: error && error.text ? String(error.text) : '',
        reason: error && error.reason ? String(error.reason) : ''
      };
    })
  };
  return JSON.stringify(fingerprint);
}

function canonicalizeStateboyFingerprintValue(value) {
  if (Array.isArray(value)) {
    return value.map(function (item) {
      return canonicalizeStateboyFingerprintValue(item);
    });
  }
  if (value && typeof value === 'object') {
    var result = {};
    var keys = Object.keys(value).sort();
    for (var i = 0; i < keys.length; i++) {
      result[keys[i]] = canonicalizeStateboyFingerprintValue(value[keys[i]]);
    }
    return result;
  }
  return value;
}

function renderStateboySheet(sheet) {
  return renderStateboySheetWithOptions(sheet, {
    includeDirectives: true,
    filterEntry: null,
    markAiReadonly: false
  });
}

function renderStateboyContextSheet(sheet) {
  var renderedSheet = renderStateboySheetWithOptions(sheet, {
    includeDirectives: false,
    filterEntry: function (entry) { return stateboyShouldShowInContext(entry); },
    markAiReadonly: false
  });
  if (!renderedSheet) return '';
  return [
    '[',
    "This is the world's current state sheet. Use it as reference and continue the story in your response; do not continue or reproduce the state sheet.",
    '',
    renderedSheet,
    ']'
  ].join('\n');
}

function renderStateboyAiSheet(sheet) {
  return renderStateboySheetWithOptions(sheet, {
    includeDirectives: false,
    filterEntry: null,
    markAiReadonly: true
  });
}

function renderStateboySheetWithOptions(sheet, options) {
  options = options || {};
  var lines = [];
  for (var i = 0; i < sheet.categories.length; i++) {
    var cat = sheet.categories[i];
    var categoryLines = [];
    var header = '## ' + cat.name;
    if (options.includeDirectives) {
      var categoryDirectiveText = formatStateboyDirectives(cat.directives);
      if (categoryDirectiveText) header += ' ' + categoryDirectiveText;
    }
    categoryLines.push(header);
    for (var j = 0; j < cat.entries.length; j++) {
      var entry = cat.entries[j];
      if (typeof options.filterEntry === 'function' && !options.filterEntry(entry)) continue;
      categoryLines.push(formatStateboyEntryLine(entry, options));
    }
    if (categoryLines.length <= 1) continue;
    if (lines.length > 0) lines.push('');
    for (var k = 0; k < categoryLines.length; k++) lines.push(categoryLines[k]);
  }
  return lines.join('\n');
}

function formatStateboyEntryLine(entry, options) {
  options = options || {};
  var line = entry.name + ': ' + formatStateboyValue(entry.type, entry.value);
  var notes = [];
  var policy = resolveStateboyPolicy(entry);
  if (entry.description) notes.push(entry.description);
  if (options.markAiReadonly && !policy.aiMutable) notes.push('AI readonly: do not modify');
  if (options.markAiReadonly && policy.important) notes.push('important state');
  if (options.markAiReadonly && policy.temporary) notes.push('temporary state');
  if (notes.length) line += ' (' + notes.join('; ') + ')';
  if (options.includeDirectives) {
    var directiveText = formatStateboyDirectives(entry.directives);
    if (directiveText) line += ' ' + directiveText;
  }
  return line;
}

function resolveStateboyPolicy(entry) {
  var categoryScope = readStateboyDirectiveScope(entry && entry.categoryDirectives);
  var stateScope = readStateboyDirectiveScope(entry && entry.directives);

  var contextVisible = stateScope.visibility !== undefined
    ? stateScope.visibility
    : (categoryScope.visibility !== undefined ? categoryScope.visibility : true);

  var widgetVisible;
  if (stateScope.widget !== undefined) widgetVisible = stateScope.widget;
  else if (stateScope.visibility !== undefined) widgetVisible = stateScope.visibility;
  else if (categoryScope.widget !== undefined) widgetVisible = categoryScope.widget;
  else if (categoryScope.visibility !== undefined) widgetVisible = categoryScope.visibility;
  else widgetVisible = true;

  var aiMutable = stateScope.aiMutable !== undefined
    ? stateScope.aiMutable
    : (categoryScope.aiMutable !== undefined ? categoryScope.aiMutable : true);

  var semanticScope = stateScope.semanticSpecified ? stateScope : categoryScope;
  return {
    contextVisible: contextVisible,
    widgetVisible: widgetVisible,
    aiMutable: aiMutable,
    important: semanticScope.semanticSpecified ? semanticScope.important : false,
    temporary: semanticScope.semanticSpecified ? semanticScope.temporary : false
  };
}

function readStateboyDirectiveScope(directives) {
  var flags = directives && Array.isArray(directives.flags) ? directives.flags : [];
  var flagSet = makeStateboyDirectiveFlagMap(flags);
  var scope = {
    visibility: undefined,
    widget: undefined,
    aiMutable: undefined,
    semanticSpecified: false,
    important: false,
    temporary: false
  };

  if (!(flagSet.hidden && flagSet.visible)) {
    if (flagSet.hidden) scope.visibility = false;
    else if (flagSet.visible) scope.visibility = true;
  }
  if (!(flagSet['no-widget'] && flagSet.widget)) {
    if (flagSet['no-widget']) scope.widget = false;
    else if (flagSet.widget) scope.widget = true;
  }
  if (!(flagSet.locked && flagSet.unlocked)) {
    if (flagSet.locked) scope.aiMutable = false;
    else if (flagSet.unlocked) scope.aiMutable = true;
  }

  if (flagSet.important || flagSet.temporary) {
    scope.semanticSpecified = true;
    if (!(flagSet.important && flagSet.temporary)) {
      scope.important = !!flagSet.important;
      scope.temporary = !!flagSet.temporary;
    }
  }
  return scope;
}

function stateboyShouldShowInContext(entry) {
  return resolveStateboyPolicy(entry).contextVisible;
}

function stateboyCanAiModify(entry) {
  return resolveStateboyPolicy(entry).aiMutable;
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

function requestStateboySdkConfigIfNeeded(us, sb) {
  var liveCount = getStateboyLiveCount();
  if (!sb.settings || !sb.settings.stateboyEnabled || !sb.settings.widgetsEnabled) return;
  if (!us.available() || !us.has('sdk', 'config')) return;
  if (sb.lastSdkConfigRequestLiveCount === liveCount) return;

  var latestConfig = us.latest('sdk', 'config');
  var widgetPreference = getStateboyWidgetPreference(latestConfig);
  if (latestConfig && latestConfig.status === 'ok' && widgetPreference !== false) return;

  sb.lastSdkConfigRequestLiveCount = liveCount;
  us.call('sdk', 'config', {});
}

function assessStateboySetup(us, settings) {
  settings = settings || STATEBOY_DEFAULT_SETTINGS;
  var runtimeAvailable = us.available();
  var hasAiStatus = runtimeAvailable && us.has('ai', 'status');
  var hasAiQuery = runtimeAvailable && us.has('ai', 'query');
  var hasWidget = runtimeAvailable && us.has('widget');
  var result = {
    level: 'ok',
    code: 'ok',
    message: '',
    runtimeAvailable: runtimeAvailable,
    canQueryAi: false,
    canPublishWidget: false
  };

  if (!settings.stateboyEnabled) {
    result.code = 'stateboy_disabled';
    return result;
  }

  if (!runtimeAvailable) {
    return makeStateboySetupResult(
      result,
      'required',
      'runtime_missing',
      'Stateboy requires BetterDungeon with Ultrascripts enabled. Install or enable BetterDungeon to use Stateboy AI and Widget features.'
    );
  }

  var sdkConfig = us.latest('sdk', 'config');
  var widgetPreference = getStateboyWidgetPreference(sdkConfig);
  result.canPublishWidget = settings.widgetsEnabled && hasWidget && widgetPreference !== false;

  if (settings.aiEnabled) {
    if (!hasAiStatus || !hasAiQuery) {
      return makeStateboySetupResult(
        result,
        'required',
        'ai_missing',
        'Stateboy requires the Ultrascripts AI module with ai.status and ai.query. Enable or update the AI module in BetterDungeon.'
      );
    }

    var aiStatus = us.latest('ai', 'status');
    if (aiStatus && aiStatus.status !== 'ok') {
      return makeStateboySetupResult(
        result,
        'required',
        'ai_status_error',
        'Stateboy could not confirm that the AI module is ready. Check the AI module configuration in BetterDungeon.'
      );
    }

    if (aiStatus && aiStatus.status === 'ok') {
      if (!aiStatus.data || aiStatus.data.ready !== true) {
        var aiMessage = 'Stateboy AI is not ready. Configure the AI module in BetterDungeon and add a Gemini API key.';
        var statusMessage = aiStatus.data && aiStatus.data.message
          ? String(aiStatus.data.message).replace(/\s+/g, ' ').trim()
          : '';
        if (statusMessage && !/api\s*key|configure/i.test(statusMessage)) aiMessage += ' ' + statusMessage;
        return makeStateboySetupResult(result, 'required', 'ai_not_ready', aiMessage);
      }
      result.canQueryAi = true;
    } else {
      result.code = 'ai_status_pending';
    }
  }

  if (!settings.widgetsEnabled) {
    return makeStateboySetupResult(
      result,
      'advisory',
      'widget_disabled',
      'Widgets are disabled in Stateboy Settings. Stateboy works best with Widgets enabled.'
    );
  }

  if (!hasWidget || widgetPreference === false) {
    return makeStateboySetupResult(
      result,
      'advisory',
      'widget_disabled',
      'Enable the Widget module in BetterDungeon. Stateboy works best with Widget enabled.'
    );
  }

  return result;
}

function makeStateboySetupResult(result, level, code, message) {
  result.level = level;
  result.code = code;
  result.message = message;
  return result;
}

function getStateboyWidgetPreference(response) {
  if (!response || response.status !== 'ok' || !response.data) return undefined;
  var ultrascripts = response.data.ultrascripts;
  var preferences = ultrascripts && ultrascripts.modulePreferences;
  return preferences && typeof preferences.widget === 'boolean'
    ? preferences.widget
    : undefined;
}

function publishStateboySetupWarning(sb, setup) {
  var code = setup && setup.message ? setup.code : '';
  var message = setup && setup.message ? setup.message : '';

  if (message) {
    if (sb.lastSetupWarningCode !== code || sb.lastSetupWarningMessage !== message) {
      state.message = message;
    }
    sb.lastSetupWarningCode = code;
    sb.lastSetupWarningMessage = message;
    return;
  }

  if (sb.lastSetupWarningMessage && state.message === sb.lastSetupWarningMessage) {
    state.message = '';
  }
  sb.lastSetupWarningCode = '';
  sb.lastSetupWarningMessage = '';
}

function renderStateboySetupContextWarning(text, setup) {
  if (!setup || setup.level !== 'required' || !setup.message) return text;
  var message = String(setup.message).replace(/\s+/g, ' ').trim();
  var original = String(text || '');
  return original + (original ? '\n\n' : '') + '[Stateboy setup: ' + message + ']';
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
  if (!stateboyCanAiModify(entry)) return { ok: false, reason: 'state is AI readonly' };
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
  var currentFingerprint = makeStateboySheetFingerprint(currentSheet);
  var previousFingerprint = sb.lastObservedStateSheetFingerprint;
  var userEdited = false;
  var pendingWrite = sb.pendingStateCardWrite;

  if (!previousFingerprint && sb.hasObservedStateCardEntry && sb.lastObservedStateCardEntry) {
    previousFingerprint = makeStateboySheetFingerprint(
      serializeStateboySheetForState(parseStateboySheet(sb.lastObservedStateCardEntry))
    );
    sb.lastObservedStateSheetFingerprint = previousFingerprint;
  }

  if (pendingWrite) {
    if (currentFingerprint === pendingWrite.afterFingerprint) {
      sb.pendingStateCardWrite = null;
    } else if (
      currentFingerprint === pendingWrite.beforeFingerprint &&
      getStateboyLiveCount() <= Number(pendingWrite.writtenLiveCount || 0) + STATEBOY_CARD_WRITE_TURN_LIMIT
    ) {
      // updateStoryCard can leave storyCards showing the pre-write snapshot for
      // later hooks in the same lifecycle. It is not another manual edit.
      return {
        userEdited: false,
        staleScriptWrite: true,
        previousSheet: previousSheet,
        currentSheet: currentSheet
      };
    } else {
      sb.pendingStateCardWrite = null;
    }
  }

  if (!sb.hasObservedStateCardEntry) {
    sb.hasObservedStateCardEntry = true;
  } else if (
    currentFingerprint !== previousFingerprint &&
    currentFingerprint !== sb.lastScriptWrittenStateSheetFingerprint
  ) {
    userEdited = true;
  }

  sb.lastObservedStateCardEntry = currentEntry;
  sb.lastObservedStateSheetFingerprint = currentFingerprint;
  return {
    userEdited: userEdited,
    staleScriptWrite: false,
    previousSheet: previousSheet,
    currentSheet: currentSheet
  };
}

function rememberStateboyScriptWrite(sb, entry, sheet) {
  var serializedSheet = serializeStateboySheetForState(sheet);
  var beforeFingerprint = sb.lastObservedStateSheetFingerprint || makeStateboySheetFingerprint(sb.sheet);
  var afterFingerprint = makeStateboySheetFingerprint(serializedSheet);
  sb.pendingStateCardWrite = {
    beforeFingerprint: beforeFingerprint,
    afterFingerprint: afterFingerprint,
    writtenLiveCount: getStateboyLiveCount()
  };
  sb.lastScriptWrittenStateCardEntry = entry;
  sb.lastScriptWrittenStateSheetFingerprint = afterFingerprint;
  sb.lastObservedStateCardEntry = entry;
  sb.lastObservedStateSheetFingerprint = afterFingerprint;
  sb.hasObservedStateCardEntry = true;
  sb.sheet = serializedSheet;
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
  var text = renderStateboyChangelogNotes(sb, STATEBOY_NOTES_CHANGELOG_ENTRIES);
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

function queueStateboyAiAnalysisIfNeeded(us, sb, sheet, outputText, setup) {
  var liveCount = getStateboyLiveCount();
  if (!sb.settings.aiEnabled || sheet.entries.length === 0) return;
  if (!setup || !setup.canQueryAi) return;
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
  var currentTurn = getStateboyLiveCount();
  var recent = [];
  var actions = Array.isArray(history) ? history.slice(-8) : [];
  for (var i = 0; i < actions.length; i++) {
    var action = actions[i] || {};
    recent.push((action.type || 'action') + ': ' + String(action.text || action.rawText || '').slice(0, 900));
  }
  var recentChanges = sb && sb.settings && sb.settings.changelogEnabled
    ? renderStateboyRecentChanges(sb, STATEBOY_AI_CHANGELOG_ENTRIES)
    : '';

  var prompt = [
    'You are Stateboy, an AI Dungeon state update assistant.',
    'Your job is to propose state changes based only on the recent story.',
    'Current turn: ' + currentTurn + '.',
    'Return JSON that follows the provided schema.',
    'Only use operation "set".',
    'Only target states that already exist in the current state sheet.',
    'Do not invent, add, delete, rename, or restructure states.',
    'Do not propose changes for states marked "AI readonly: do not modify".',
    'Use confidence from 0.00 to 1.00. Use low confidence when uncertain.',
    'Use the recent Stateboy changelog to avoid repeating updates that were already applied or manually corrected.',
    '',
    'Current state sheet:',
    renderStateboyAiSheet(sheet),
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

  var payload = buildStateboyWidgetPayload(sb, sheet);
  us.defineWidget({ widgets: payload.widgets });
  us.publishWidget(payload.values);
  sb.widgetWasPublished = true;
}

function buildStateboyWidgetPayload(sb, sheet) {
  var widgets = [];
  var values = {};

  if (sb.settings.debugMode) {
    widgets.push(
      { id: 'stateboy_status', type: 'stat', label: 'Stateboy', color: 'blue' },
      { id: 'stateboy_ai', type: 'stat', label: 'AI' },
      { id: 'stateboy_summary', type: 'panel', title: 'Last Update' }
    );
    values.stateboy_status = 'Running';
    values.stateboy_ai = {
      value: sb.settings.aiEnabled ? (sb.pendingAnalysisRequestId ? 'Thinking' : 'Ready') : 'Off',
      color: sb.settings.aiEnabled ? '#22c55e' : '#f59e0b'
    };
    values.stateboy_summary = {
      content: sb.lastAcceptedSummary || sb.lastAiSummary || 'No accepted updates yet.'
    };
    var directiveIssueText = formatStateboyDirectiveIssueSummary(sb.directiveIssues);
    if (directiveIssueText) {
      widgets.push({ id: 'stateboy_directive_issues', type: 'panel', title: 'Directive Issues' });
      values.stateboy_directive_issues = { content: directiveIssueText };
    }
  }

  var groups = [];
  var stateWidgetCount = 0;
  var categories = sheet && Array.isArray(sheet.categories) ? sheet.categories : [];
  for (var i = 0; i < categories.length; i++) {
    var category = categories[i];
    var group = { category: category, widgets: [] };
    var entries = category && Array.isArray(category.entries) ? category.entries : [];
    for (var j = 0; j < entries.length; j++) {
      var entry = entries[j];
      var entryIndex = isFinite(Number(entry.order)) ? Number(entry.order) : stateWidgetCount;
      var widget = makeStateboyWidget(entry, entryIndex);
      if (!widget) continue;
      group.widgets.push(widget);
      stateWidgetCount += 1;
    }
    if (group.widgets.length > 0) groups.push(group);
  }

  var includeCategoryDividers = groups.length > 1 &&
    widgets.length + stateWidgetCount + groups.length <= STATEBOY_WIDGET_LIMIT;

  for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    var currentGroup = groups[groupIndex];
    if (includeCategoryDividers) {
      widgets.push({
        id: ('stateboy_category_' + groupIndex + '_' + normalizeStateboyKey(currentGroup.category.name)).slice(0, 60),
        type: 'divider',
        label: makeStateboyWidgetLabel(currentGroup.category.name)
      });
    }
    for (var widgetIndex = 0; widgetIndex < currentGroup.widgets.length; widgetIndex++) {
      if (widgets.length >= STATEBOY_WIDGET_LIMIT) break;
      var currentWidget = currentGroup.widgets[widgetIndex];
      widgets.push(currentWidget.config);
      values[currentWidget.config.id] = currentWidget.value;
    }
    if (widgets.length >= STATEBOY_WIDGET_LIMIT) break;
  }

  return { widgets: widgets, values: values };
}

function makeStateboyWidget(entry, index) {
  if (!stateboyShouldShowWidget(entry)) return null;
  var id = ('stateboy_' + index + '_' + normalizeStateboyKey(entry.name)).slice(0, 60);
  var label = makeStateboyWidgetLabel(entry.name);
  var color = getStateboyWidgetColor(entry);
  if (entry.type === 'ratio') {
    return {
      config: { id: id, type: 'bar', label: label, max: entry.value.max || 1, color: color },
      value: entry.value.current || 0
    };
  }
  if (entry.type === 'percent') {
    return {
      config: { id: id, type: 'progress', label: label, max: 100, color: color },
      value: entry.value
    };
  }
  if (entry.type === 'number') {
    return {
      config: { id: id, type: 'stat', label: label, color: color },
      value: entry.value
    };
  }
  if (entry.type === 'boolean') {
    return {
      config: { id: id, type: 'stat', label: label },
      value: { value: entry.value ? 'On' : 'Off', color: entry.value ? '#22c55e' : '#f59e0b' }
    };
  }
  if (entry.type === 'list') {
    var items = Array.isArray(entry.value) ? entry.value.map(function (item) {
      return { text: String(formatStateboyListItem(item)).slice(0, 512), color: color };
    }) : [];
    if (items.length === 0) items.push({ text: 'Empty', color: color });
    if (items.length <= 6) {
      return {
        config: { id: id, type: 'taggroup', label: label },
        value: { items: items }
      };
    }
    var listItems = items.slice(0, 11);
    if (items.length > 11) {
      listItems.push({ text: '+' + (items.length - 11) + ' more', color: color });
    }
    return {
      config: { id: id, type: 'list', title: label },
      value: { items: listItems }
    };
  }
  if (entry.type === 'object') {
    return {
      config: { id: id, type: 'panel', title: makeStateboyWidgetLabel(entry.name, ' · Structured Data') },
      value: { items: makeStateboyObjectWidgetItems(entry.value, color) }
    };
  }
  if (entry.type === 'null') {
    return {
      config: { id: id, type: 'stat', label: label, color: color },
      value: 'No value'
    };
  }
  return {
    config: { id: id, type: 'panel', title: label },
    value: {
      content: String(entry.value === undefined || entry.value === null || entry.value === '' ? 'Empty' : entry.value).slice(0, 512)
    }
  };
}

function makeStateboyWidgetLabel(name, suffix) {
  var ending = String(suffix || '');
  var available = Math.max(0, 120 - ending.length);
  return String(name || 'State').slice(0, available) + ending;
}

function getStateboyWidgetColor(entry) {
  var identity = String(entry && entry.category || '') + '::' + String(entry && entry.name || '');
  var hash = 0;
  for (var i = 0; i < identity.length; i++) {
    hash = ((hash * 31) + identity.charCodeAt(i)) >>> 0;
  }
  return STATEBOY_WIDGET_COLORS[hash % STATEBOY_WIDGET_COLORS.length];
}

function makeStateboyObjectWidgetItems(value, color) {
  var objectValue = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  var keys = Object.keys(objectValue);
  if (keys.length === 0) return [{ label: 'Object', value: 'Empty', color: color }];

  var visibleKeys = keys.slice(0, 11);
  var items = visibleKeys.map(function (key) {
    var display = formatStateboyListItem(objectValue[key]);
    return {
      label: String(key).slice(0, 120),
      value: String(display).slice(0, 512),
      color: color
    };
  });
  if (keys.length > visibleKeys.length) {
    items.push({ label: 'More', value: '+' + (keys.length - visibleKeys.length) + ' fields', color: color });
  }
  return items;
}

function formatStateboyDirectiveIssueSummary(issues) {
  var list = Array.isArray(issues) ? issues : [];
  if (list.length === 0) return '';
  var lines = [];
  for (var i = 0; i < list.length; i++) {
    lines.push(String(list[i] && list[i].message || 'Unknown directive issue.'));
  }
  return lines.join('\n').slice(0, 512);
}

function stateboyShouldShowWidget(entry) {
  return resolveStateboyPolicy(entry).widgetVisible;
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
  renderContextSheet: renderStateboyContextSheet,
  renderAiSheet: renderStateboyAiSheet,
  resolvePolicy: resolveStateboyPolicy,
  canAiModify: stateboyCanAiModify,
  validateChange: validateStateboyChange,
  parseValue: parseStateboyValue,
  assessSetup: assessStateboySetup,
  publishSetupWarning: publishStateboySetupWarning,
  renderSetupContextWarning: renderStateboySetupContextWarning,
  removeLegacyChangelogCountSettings: removeStateboyLegacyChangelogCountSettings,
  renderRecentChanges: renderStateboyRecentChanges,
  buildAiPrompt: buildStateboyAiPrompt,
  directiveIssueSummary: formatStateboyDirectiveIssueSummary,
  sheetFingerprint: makeStateboySheetFingerprint,
  observeCardEntry: observeStateboyCardEntry,
  rememberScriptWrite: rememberStateboyScriptWrite,
  buildWidgetPayload: buildStateboyWidgetPayload,
  makeWidget: makeStateboyWidget,
  widgetColor: getStateboyWidgetColor
};
