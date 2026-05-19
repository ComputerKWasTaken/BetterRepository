// Your "Input" tab should look like this
// InnerSelf can go here if you want to use it, just delete the "// " on the next line
// InnerSelf("input")
const modifier = (text) => {
  text = FoxTweaks.Hooks.onInput(text);
  // AutoCards can go here if you want to use it, just delete the "// " on the next line
  // text = AutoCards("input", text);
  return {text};
};
modifier(text);
