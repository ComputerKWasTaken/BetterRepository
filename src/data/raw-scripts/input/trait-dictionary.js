// Your "Input" tab should look like this:
// ── TraitDictionary ────────────────────────────────────────────────
// Reads all story cards typed "TraitDictionary" and caches
// their parsed traits into state so the Context tab can use them.
function cacheTraitDictionaryCards() {
  var custom = {};
  try {
    for (var i = 0; i < storyCards.length; i++) {
      var card = storyCards[i];
      if (!card || !card.type) continue;
      if (card.type.toLowerCase() !== "traitdictionary") continue;
      var lines = (card.entry || "").split("\n");
      for (var j = 0; j < lines.length; j++) {
        var line = lines[j].trim();
        if (!line || line[0] === "#") continue;
        var colon = line.indexOf(":");
        if (colon === -1) continue;
        var key = line.slice(0, colon).trim().toLowerCase().replace(/\s+/g, "_");
        var desc = line.slice(colon + 1).trim();
        if (key && desc) custom[key] = key + ": " + desc;
      }
    }
  } catch (e) {}
  state.customTraits = JSON.stringify(custom);
}
// ───────────────────────────────────────────────────────────────────

// comment/uncomment to toggle InnerSelf
// InnerSelf("input")
const modifier = (text) => {
  // comment/uncomment to toggle TraitDictionary
  cacheTraitDictionaryCards();
  // comment/uncomment to toggle FoxTweaks
  //text = FoxTweaks.Hooks.onInput(text);
  // comment/uncomment to toggle AutoCards
  //text = AutoCards("input", text);
  return {text};
};
modifier(text);
