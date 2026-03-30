// Your "Context" tab should look like this
const modifier = (text) => {
    // Your other context modifier scripts go here (preferred)
    [text, stop] = AutoCards("context", text, stop);
    // Your other context modifier scripts go here (alternative)
    return { text, stop };
};
modifier(text);