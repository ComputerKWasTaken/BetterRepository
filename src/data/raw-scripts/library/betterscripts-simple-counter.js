// ============================================
// LIBRARY - Simple Turn Counter
// ============================================
// The simplest possible BetterScripts example.
// Demonstrates bdWidget for creating and updating widgets.

// BetterScripts invisible encoding helpers
// Dual strategy: TagCipher (compact surrogates) for ASCII, ZW Binary for non-ASCII
function bdEncode(str) {
  // ASCII fast-path: TagCipher surrogates — 2 chars per byte (4x more compact)
  if (/^[\x00-\x7F]*$/.test(str)) {
    let out = '\uFEFF';
    for (let i = 0; i < str.length; i++) {
      out += String.fromCharCode(0xDB40, 0xDC00 + str.charCodeAt(i));
    }
    return out + '\uFEFF';
  }
  // Non-ASCII fallback: ZW Binary — UTF-8 bytes encoded as ZWNJ/ZWJ bits
  let out = '\u200B';
  for (let i = 0; i < str.length; i++) {
    let cp = str.codePointAt(i);
    if (cp > 0xFFFF) i++; // skip low surrogate half of astral pair
    const bytes = [];
    if (cp < 0x80)         bytes.push(cp);
    else if (cp < 0x800)   bytes.push(0xC0 | (cp >> 6), 0x80 | (cp & 0x3F));
    else if (cp < 0x10000) bytes.push(0xE0 | (cp >> 12), 0x80 | ((cp >> 6) & 0x3F), 0x80 | (cp & 0x3F));
    else                    bytes.push(0xF0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3F), 0x80 | ((cp >> 6) & 0x3F), 0x80 | (cp & 0x3F));
    for (const byte of bytes) {
      for (let b = 7; b >= 0; b--) out += (byte >> b) & 1 ? '\u200D' : '\u200C';
    }
  }
  return out + '\u200B';
}
function bdMessage(msg) { return bdEncode(JSON.stringify(msg)); }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// Persistent state
state.location = state.location ?? 'Town';