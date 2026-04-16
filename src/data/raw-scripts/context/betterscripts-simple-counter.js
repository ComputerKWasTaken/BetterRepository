// Strip invisible protocol chars from AI context (both TagCipher surrogates and ZW binary)
const modifier = (text) => {
  return { text: text.replace(/[\u200B-\u200D\uFEFF]|\uDB40[\uDC00-\uDC7F]/g, '') };
};
modifier(text);