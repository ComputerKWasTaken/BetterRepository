// Chronos Input hook: observe Ultrascripts and translate Chronos slash commands
// into ordinary narrative actions. Returning stop from onInput is a platform
// error, so handled commands remain safe, valid inputs for the generation loop.
const modifier = (text) => {
  ChronosV2.initialize();
  ChronosV2.observeHeartbeat();
  const handled = ChronosV2.handleInput(text);
  return { text: handled.text };
};
modifier(text);
