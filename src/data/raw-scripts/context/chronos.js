// @cache-compatible
// Chronos Context hook: advance the clock, publish its player-facing display,
// and append an authoritative timestamp without changing the cached prefix.
const modifier = (text) => {
  ChronosV2.initialize();
  ChronosV2.syncSettings();
  ChronosV2.advanceToCurrentAction();
  ChronosV2.applyPendingCommand();
  ChronosV2.recordSnapshot();

  if (!ChronosV2.enabled()) {
    ChronosV2.clearWidget();
    if (ChronosV2.hasNotice()) ChronosV2.publishToast();
    else ChronosV2.clearToast();
    return { text };
  }

  if (ChronosV2.widgetAvailable() && ChronosV2.publishWidget()) {
    if (ChronosV2.hasNotice()) ChronosV2.publishToast();
    else ChronosV2.clearToast();
  } else {
    ChronosV2.publishToast();
  }

  return { text: ChronosV2.appendContext(text) };
};
modifier(text);
