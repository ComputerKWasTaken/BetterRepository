// ============================================
// OUTPUT MODIFIER - Publish Debug Widgets
// ============================================

const modifier = (text) => {
  var dc = state.bd.debugConsole;
  var output = text;

  if (dc.pendingOutput) {
    output = dc.pendingOutput;
    dc.pendingOutput = '';
  }

  var values = {
    runtime: {
      text: usRuntimeAvailable() ? 'Ultrascripts Ready' : 'No Runtime',
      color: usRuntimeAvailable() ? '#22c55e' : '#ef4444'
    },
    turn: usLiveCount(),
    lastCommand: dc.lastCommand || '(none)',
    lastResult: { html: '<pre style="white-space:pre-wrap;margin:0;">' + String(dc.lastResult || '').replace(/</g, '&lt;') + '</pre>' }
  };

  if (dc.showDemo) {
    values.demoHp = 75;
    values.demoTags = { items: [{ text: 'Demo', color: '#60a5fa' }, { text: 'Active', color: '#22c55e' }] };
    values.demoPanel = { items: [{ label: 'Module', value: 'Scripture' }, { label: 'Mode', value: 'Debug' }] };
    values.demoList = { items: [{ text: 'stat' }, { text: 'bar' }, { text: 'taggroup' }, { text: 'toggle' }] };
    values.demoToggle = false;
  }

  usPublishDebug(values);
  return { text: output };
};

modifier(text);
