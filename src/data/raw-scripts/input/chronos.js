// Chronos Input hook: observe the Ultrascripts heartbeat once per action.
// Context and timekeeping behavior live in the Context hook.
const modifier = (text) => {
  ChronosV2.initialize();
  ChronosV2.observeHeartbeat();
  return { text };
};
modifier(text);
