// ============================================
// LIBRARY - Ultrascripts Widget Showcase
// ============================================
// Publishes a Scripture dashboard using real Ultrascripts widget types.

state.bd = state.bd || {};

function usFindCard(title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] && cards[i].title === title) return cards[i];
  }
  return null;
}

function usUpsertCard(title, value) {
  var card = usFindCard(title);
  if (card) card.value = value;
  else addStoryCard(title, value);
}

function usLiveCount() {
  return (info && info.actionCount) || 0;
}

function usPublishShowcase(values) {
  var title = 'ultrascripts:state:scripture';
  var existing = usFindCard(title);
  var previous = null;
  try { previous = existing ? JSON.parse(existing.value || '{}') : null; } catch (e) {}

  var payload = {
    v: 1,
    manifest: {
      widgets: [
        { id: 'hp', type: 'bar', label: 'Health', max: 100, color: '#22c55e' },
        { id: 'mana', type: 'bar', label: 'Mana', max: 60, color: '#3b82f6' },
        { id: 'gold', type: 'stat', label: 'Gold', color: '#fbbf24' },
        { id: 'status', type: 'taggroup', label: 'Status' },
        { id: 'kills', type: 'counter', label: 'Encounters', color: '#60a5fa' },
        { id: 'quest', type: 'text', label: 'Quest' },
        { id: 'sheet', type: 'panel', title: 'Character' },
        { id: 'bag', type: 'list', label: 'Inventory' },
        { id: 'note', type: 'custom', label: 'Note' }
      ]
    },
    history: previous && previous.history ? previous.history : {}
  };

  payload.history[usLiveCount()] = values;
  usUpsertCard(title, JSON.stringify(payload));
}
