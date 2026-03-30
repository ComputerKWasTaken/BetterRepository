// ============================================
// OUTPUT MODIFIER - Display Results & Run Tests
// ============================================
// Shows command results, runs test suite steps,
// and appends widget protocol messages.

const modifier = (text) => {
  let output = text;
  let widgets = '';
  
  // Check for pending command output (override AI response)
  if (state.bd.isCommand && state.bd.pendingOutput) {
    output = state.bd.pendingOutput;
    widgets = state.bd.pendingWidgets || '';
    
    // Clear pending
    state.bd.pendingOutput = null;
    state.bd.pendingWidgets = null;
    state.bd.isCommand = false;
  }
  // Run next test step if suite is active (and no command was just run)
  else if (state.bd.testRunning) {
    const testResult = runTestStep();
    if (testResult) {
      output = testResult.output;
      widgets = testResult.widgets;
    }
  }
  
  // Always show turn counter widget (order: 0 to appear first)
  widgets += bdWidget('console-turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#94a3b8',
    align: 'left',
    order: 0
  });
  
  // Show test progress badge if suite is running
  if (state.bd.testRunning) {
    widgets += bdWidget('console-test', {
      type: 'badge',
      text: \`Test \${state.bd.testStep}/\${TEST_STEPS.length}\`,
      icon: '🧪',
      color: '#22c55e',
      variant: 'subtle',
      align: 'left',
      order: 1
    });
  }
  
  return { text: output + widgets };
};

modifier(text);