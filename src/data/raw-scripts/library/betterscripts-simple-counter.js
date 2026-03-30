// ============================================
// LIBRARY - Simple Turn Counter
// ============================================
// The simplest possible BetterScripts example.
// Demonstrates bdWidget for creating and updating widgets.

// BetterScripts protocol helpers
function bdMessage(msg) { return \`[[BD:\${JSON.stringify(msg)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// Persistent state
state.location = state.location ?? 'Town';