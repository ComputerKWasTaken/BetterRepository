// Strip protocol messages from AI context
const modifier = (text) => {
  return { text: text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '') };
};
modifier(text);