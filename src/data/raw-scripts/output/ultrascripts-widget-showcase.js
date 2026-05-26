// ============================================
// OUTPUT - Publish Showcase Widgets
// ============================================

const modifier = (text) => {
  usPublishShowcase({
    hp: 85,
    mana: 42,
    gold: '1,250',
    status: {
      items: [
        { text: 'Shielded', color: '#3b82f6' },
        { text: 'Quest Active', color: '#fbbf24' }
      ]
    },
    kills: { value: 24, delta: 3 },
    quest: 'Find the artifact',
    sheet: {
      items: [
        { label: 'Name', value: 'Adventurer', color: '#f472b6' },
        { label: 'Class', value: 'Warrior', color: '#60a5fa' },
        { label: 'Level', value: '12', color: '#a855f7' }
      ]
    },
    bag: {
      items: [
        { text: 'Iron Sword', color: '#60a5fa' },
        { text: 'Potion x3', color: '#22c55e' },
        { text: 'Rusty Key', color: '#fbbf24' },
        { text: 'Map' }
      ]
    },
    note: {
      html: '<strong style="color:#f472b6;">Custom</strong> <span style="color:#94a3b8;">HTML widget</span>'
    }
  });

  return { text };
};

modifier(text);
