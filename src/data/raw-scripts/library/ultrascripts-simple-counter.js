// ============================================
// LIBRARY - Ultrascripts Simple Turn Counter
// ============================================
// Publishes a tiny Scripture widget state card for BetterDungeon.

state.bd = state.bd || {};
state.bd.usCounter = state.bd.usCounter || {};

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

function usPublishCounter(values) {
  var title = 'ultrascripts:state:scripture';
  var existing = usFindCard(title);
  var previous = null;
  try { previous = existing ? JSON.parse(existing.value || '{}') : null; } catch (e) {}

  var payload = {
    v: 1,
    manifest: {
      widgets: [
        { id: 'turn', type: 'stat', label: 'Turn', color: '#60a5fa' },
        { id: 'location', type: 'badge', label: 'Location', color: '#a855f7' }
      ]
    },
    history: previous && previous.history ? previous.history : {}
  };

  payload.history[usLiveCount()] = values;
  usUpsertCard(title, JSON.stringify(payload));
}

state.location = state.location || 'Town';
