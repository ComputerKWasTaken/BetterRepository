// ============================================
// INPUT MODIFIER - Parse : Commands
// ============================================

const modifier = (text) => {
  var input = String(text || '').trim();

  if (input.charAt(0) === ':') {
    var result = runDebugCommand(input);
    if (result) {
      state.bd.debugConsole.pendingOutput = result;
      return { text: '[DEBUG COMMAND]' };
    }
  }

  return { text };
};

modifier(text);
