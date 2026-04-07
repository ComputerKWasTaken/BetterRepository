// ============================================
// OUTPUT - Create All Widget Types
// ============================================
// Uses bdWidget to create and update widgets each turn.

const modifier = (text) => {
  let w = '';
  
  // ========== Status Bar ==========
  
  // Stats
  w += bdWidget('demo-hp', { type: 'stat', label: 'HP', value: '85/100', color: '#ef4444', align: 'center', order: 1 });
  w += bdWidget('demo-mp', { type: 'stat', label: 'MP', value: '42/60', color: '#3b82f6', align: 'center', order: 2 });
  w += bdWidget('demo-gold', { type: 'stat', label: '💰', value: '1,250', color: '#fbbf24', align: 'center', order: 3 });
  
  // Bars
  w += bdWidget('demo-health-bar', { type: 'bar', label: 'Health', value: 85, max: 100, color: '#22c55e', align: 'center', order: 4 });
  w += bdWidget('demo-mana-bar', { type: 'bar', label: 'Mana', value: 42, max: 60, color: '#8b5cf6', align: 'center', order: 5 });
  w += bdWidget('demo-xp-bar', { type: 'bar', label: 'XP', value: 750, max: 1000, color: '#06b6d4', align: 'center', order: 6 });
  
  // Badges (all three variants)
  w += bdWidget('demo-badge-poison', { type: 'badge', text: 'Poisoned', icon: '☠️', color: '#a855f7', variant: 'subtle', align: 'center', order: 7 });
  w += bdWidget('demo-badge-shield', { type: 'badge', text: 'Shielded', icon: '🛡️', color: '#3b82f6', variant: 'solid', align: 'center', order: 8 });
  w += bdWidget('demo-badge-fire', { type: 'badge', text: 'Burning', icon: '🔥', color: '#f97316', variant: 'outline', align: 'center', order: 9 });
  
  // Counters (positive and negative delta)
  w += bdWidget('demo-counter-up', { type: 'counter', icon: '⚔️', value: 24, delta: 3, color: '#60a5fa', align: 'center', order: 10 });
  w += bdWidget('demo-counter-down', { type: 'counter', icon: '💔', value: 12, delta: -5, color: '#f472b6', align: 'center', order: 11 });
  
  // Icons with tooltips
  w += bdWidget('demo-icon-heart', { type: 'icon', icon: '❤️', color: '#ef4444', tooltip: 'Health', align: 'center', order: 12 });
  w += bdWidget('demo-icon-star', { type: 'icon', icon: '⭐', color: '#fbbf24', tooltip: 'Reputation', align: 'center', order: 13 });
  w += bdWidget('demo-icon-moon', { type: 'icon', icon: '🌙', color: '#94a3b8', tooltip: 'Night', align: 'center', order: 14 });
  
  // ========== Character Info ==========
  
  w += bdWidget('demo-panel', { 
    type: 'panel', title: 'Character', align: 'left',
    items: [
      { label: 'Name', value: 'Adventurer', color: '#f472b6' },
      { label: 'Class', value: 'Warrior', color: '#60a5fa' },
      { label: 'Level', value: '12', color: '#a855f7' }
    ],
    order: 1 
  });
  
  // ========== Inventory/Quest ==========
  
  w += bdWidget('demo-text', { type: 'text', text: '⚡ Quest: Find the Artifact', style: { color: '#fbbf24', fontWeight: '500' }, align: 'right', order: 1 });
  w += bdWidget('demo-list', { 
    type: 'list', title: 'Inventory', align: 'right',
    items: [
      { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
      { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
      { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
      { icon: '📜', text: 'Map' }
    ],
    order: 2 
  });
  
  return { text: text + w };
};

modifier(text);