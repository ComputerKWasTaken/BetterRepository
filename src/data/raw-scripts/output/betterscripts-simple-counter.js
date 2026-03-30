// Display turn counter and location badge
const modifier = (text) => {
  let widgets = '';

  // Turn counter (bdWidget creates or updates existing widget)
  widgets += bdWidget('turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#60a5fa',
    align: 'left',
    order: 1
  });

  // Location badge
  widgets += bdWidget('location', {
    type: 'badge',
    text: state.location,
    icon: '📍',
    color: '#a855f7',
    variant: 'subtle',
    align: 'right',
    order: 1
  });

  return { text: text + widgets };
};
modifier(text);