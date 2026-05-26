// Display turn counter and location badge through Scripture.
const modifier = (text) => {
  usPublishCounter({
    turn: usLiveCount(),
    location: { text: state.location || 'Unknown', color: '#a855f7' }
  });

  return { text };
};
modifier(text);
