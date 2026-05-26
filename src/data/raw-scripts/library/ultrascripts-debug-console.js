// ============================================
// LIBRARY - Ultrascripts Debug Console
// ============================================
// Type :help, :demo, :clear, or :status in a Story action.

state.bd = state.bd || {};
state.bd.debugConsole = state.bd.debugConsole || {
  lastCommand: '',
  lastResult: 'Type :help for commands.',
  showDemo: false
};

function usFindCard(title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] && cards[i].title === title) return cards[i];
  }
  return null;
}

function usUpsertCard(title, value) {
  var card = usFindCard(title);
  if (card) card.value = value;
  else addStoryCard(title, value);
}

function usLiveCount() {
  return (info && info.actionCount) || 0;
}

function usRuntimeAvailable() {
  return !!usFindCard('ultrascripts:heartbeat');
}

function usPublishDebug(values) {
  var title = 'ultrascripts:state:scripture';
  var existing = usFindCard(title);
  var previous = null;
  try { previous = existing ? JSON.parse(existing.value || '{}') : null; } catch (e) {}

  var widgets = [
    { id: 'runtime', type: 'badge', label: 'Runtime' },
    { id: 'turn', type: 'stat', label: 'Turn', color: '#94a3b8' },
    { id: 'lastCommand', type: 'text', label: 'Last Command' },
    { id: 'lastResult', type: 'custom', label: 'Result' }
  ];

  if (state.bd.debugConsole.showDemo) {
    widgets = widgets.concat([
      { id: 'demoHp', type: 'bar', label: 'HP', max: 100, color: '#22c55e' },
      { id: 'demoTags', type: 'taggroup', label: 'Tags' },
      { id: 'demoPanel', type: 'panel', title: 'Panel' },
      { id: 'demoList', type: 'list', label: 'List' },
      { id: 'demoToggle', type: 'toggle', label: 'Toggle Example', value: false }
    ]);
  }

  var payload = {
    v: 1,
    manifest: { widgets: widgets },
    history: previous && previous.history ? previous.history : {}
  };

  payload.history[usLiveCount()] = values;
  usUpsertCard(title, JSON.stringify(payload));
}

function parseDebugCommand(input) {
  var match = String(input || '').trim().match(/^:([\w-]+)(?:\s+(.*))?$/);
  if (!match) return null;
  return { name: match[1].toLowerCase(), args: match[2] || '' };
}

function runDebugCommand(input) {
  var parsed = parseDebugCommand(input);
  if (!parsed) return null;

  var dc = state.bd.debugConsole;
  dc.lastCommand = ':' + parsed.name + (parsed.args ? ' ' + parsed.args : '');

  if (parsed.name === 'help') {
    dc.lastResult = 'Commands: :help, :demo, :clear, :status';
  } else if (parsed.name === 'demo') {
    dc.showDemo = true;
    dc.lastResult = 'Demo widgets enabled.';
  } else if (parsed.name === 'clear') {
    dc.showDemo = false;
    dc.lastResult = 'Demo widgets hidden.';
  } else if (parsed.name === 'status') {
    dc.lastResult = usRuntimeAvailable()
      ? 'BetterDungeon heartbeat found. Ultrascripts runtime is available.'
      : 'No heartbeat found yet. BetterDungeon or Ultrascripts may be unavailable.';
  } else {
    dc.lastResult = 'Unknown command. Type :help.';
  }

  return dc.lastResult;
}
