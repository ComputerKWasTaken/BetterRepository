// Output Modifier
const modifier = (text) => {
  return {text: state.nextOutput ? state.nextOutput : ""};
}

modifier(text)