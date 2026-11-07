// Your "Context" tab should look like this:
// ── TraitDictionary ─────────────────────────────────────────────────
// Built-in traits (always available regardless of story cards)
const TRAITS = {

  //example: "example: trait description",

  secret: "secret: used to be a member of a spooky cult; now ashamed of it, and won't tell anyone except those who are super close",

};
// ───────────────────────────────────────────────────────────────────
function traitDictionary(text) {
  // Merge built-in traits with any custom traits cached by the Input modifier
  var custom = {};
  try { custom = JSON.parse(state.customTraits || "{}"); } catch (e) {}
  var all = Object.assign({}, TRAITS, custom);

  for (var keyword in all) {
    var description = all[keyword];
    var pattern = new RegExp(
      "\\[" + keyword.replace(/_/g, "[_ ]?") + "\\]",
      "gi"
    );
    text = text.replace(pattern, description);
  }
  return text;
}
// ────────────────────────────────────────────────────────────────────

// comment/uncomment to toggle InnerSelf
// InnerSelf("context");
const modifier = (text) => {
  // comment/uncomment to toggle SCE
  //text = StoryCardExtensionContext(text);
  // comment/uncomment to toggle TraitDictionary
  text = traitDictionary(text);
  // comment/uncomment to toggle FoxTweaks
  //text = FoxTweaks.Hooks.onContext(text);
  // comment/uncomment to toggle AutoCards
  //text = AutoCards("input", text);
  return { text };
};
modifier(text);
