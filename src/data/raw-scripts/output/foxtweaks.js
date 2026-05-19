// Your "Output" tab should look like this
// InnerSelf can go here if you want to use it, just delete the "// " on the next line
// InnerSelf("output")
const modifier = (text) => {
  text = FoxTweaks.Hooks.onOutput(text);
  // AutoCards can go here if you want to use it, just delete the "// " on the next line
  // text = AutoCards("output", text);
  return {text};
};
modifier(text);
