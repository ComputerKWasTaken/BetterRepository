// ============================================
// INPUT MODIFIER - Parse : Commands (Story Action)
// ============================================
// Detects commands in Story actions starting with :
// Use Story action (not Do) to type commands like :help
//
// NOTE: We can't use stop:true in onInput (throws error).
// Instead, we detect command, store result, and replace
// the input with a placeholder. Output modifier handles display.

const modifier = (text) => {
  state.bd.isCommand = false;
  const input = text.trim();
  
  // Check if input starts with : (our command prefix)
  if (input.startsWith(':')) {
    const result = executeCommand(input);
    
    if (result) {
      // Store for output modifier to display
      state.bd.pendingOutput = result.output;
      state.bd.pendingWidgets = result.widgets;
      state.bd.isCommand = true;
      
      // Replace input with placeholder (AI will respond to this)
      // We'll override the output in the output modifier
      return { text: '[DEBUG COMMAND]' };
    }
  }
  
  // Not a command - pass through normally
  return { text };
};

modifier(text);