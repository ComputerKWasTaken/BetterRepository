const modifier = (text) => {
    text = StoryCardExtensionContext(text); //must be before "return {" and after "const modifier = (text) => {"
    return { text };
};
modifier(text);
