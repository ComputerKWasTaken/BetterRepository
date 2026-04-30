// ============================================
// LIBRARY - Widget Showcase
// ============================================
// Creates all widget types for visual testing.
// Uses bdWidget to create or update widgets on subsequent turns.

function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdClearAll() { return bdMessage({ type: 'clearAll' }); }
