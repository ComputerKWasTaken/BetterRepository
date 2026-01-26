// =============================================================================
// BetterRepository - Scripts Data
// =============================================================================
// Script examples and categories for AI Dungeon's scripting system.
// Scripts use JavaScript to modify context, input, and output.
// =============================================================================

// ============================================
// SCRIPT CATEGORIES
// ============================================
export const SCRIPT_CATEGORIES = [
  {
    id: 'game-systems',
    name: 'Game Systems',
    icon: 'Dices',
    color: 'bd-purple',
    description: 'Dice rolling, random events, and probability-based mechanics.',
    count: 0
  },
  {
    id: 'tracking',
    name: 'Tracking & State',
    icon: 'Clock',
    color: 'bd-blue',
    description: 'Time, inventory, relationships, and persistent state management.',
    count: 0
  },
  {
    id: 'combat',
    name: 'Combat & Action',
    icon: 'Swords',
    color: 'bd-error',
    description: 'Combat systems, HP tracking, and action resolution.',
    count: 0
  },
  {
    id: 'magic',
    name: 'Magic & Abilities',
    icon: 'Wand2',
    color: 'bd-cyan',
    description: 'Spell systems, mana management, and special abilities.',
    count: 0
  },
  {
    id: 'formatting',
    name: 'Formatting',
    icon: 'Settings',
    color: 'bd-green',
    description: 'Output formatting, text processing, and display enhancements.',
    count: 0
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'FolderOpen',
    color: 'bd-amber',
    description: 'Helper functions, debugging tools, and general utilities.',
    count: 0
  }
]

// ============================================
// UTILITY FUNCTIONS (For Library)
// ============================================
export const UTILITY_SCRIPTS = [
  {
    id: 'build-card',
    name: 'buildCard()',
    category: 'utilities',
    tags: ['utility', 'story-cards', 'helper'],
    author: 'LewdLeah',
    description: 'Creates a new story card with all properties set properly.',
    purpose: 'Simplifies story card creation in scripts. Returns the created card object.',
    fileType: 'library',
    content: `function buildCard(title = "", entry = "", type = "character", 
              keys = title, description = "", insertionIndex = 0) {
    if (![type, title, keys, entry, description].every(arg => 
        (typeof arg === "string"))) {
        throw new Error("buildCard: strings required");
    } else if (!Number.isInteger(insertionIndex)) {
        throw new Error("buildCard: integer required for insertionIndex");
    } else {
        insertionIndex = Math.min(Math.max(0, insertionIndex), 
                                  storyCards.length);
    }
    addStoryCard("%@%");
    for (const [index, card] of storyCards.entries()) {
        if (card.title !== "%@%") continue;
        card.type = type;
        card.title = title;
        card.keys = keys;
        card.entry = entry;
        card.description = description;
        if (index !== insertionIndex) {
            storyCards.splice(index, 1);
            storyCards.splice(insertionIndex, 0, card);
        }
        return Object.seal(card);
    }
    throw new Error("An unexpected error occurred with buildCard");
}`
  },
  {
    id: 'get-card',
    name: 'getCard()',
    category: 'utilities',
    tags: ['utility', 'story-cards', 'helper', 'search'],
    author: 'LewdLeah',
    description: 'Find story cards using a predicate function.',
    purpose: 'Like Array.find but specialized for story cards. Can return all matches or just the first.',
    fileType: 'library',
    content: `function getCard(predicate, getAll = false) {
    if (typeof predicate !== "function") {
        throw new Error("getCard: function required");
    } else if (typeof getAll !== "boolean") {
        throw new Error("getCard: boolean required for getAll");
    } else if (getAll) {
        const collectedCards = [];
        for (const card of storyCards) {
            if (predicate(card)) {
                Object.seal(card);
                collectedCards.push(card);
            }
        }
        return collectedCards;
    }
    for (const card of storyCards) {
        if (predicate(card)) {
            return Object.seal(card);
        }
    }
    return null;
}`
  },
  {
    id: 'state-init',
    name: 'State Initialization Pattern',
    category: 'utilities',
    tags: ['utility', 'state', 'pattern', 'beginner'],
    author: 'BetterRepository',
    description: 'Pattern for initializing persistent state variables.',
    purpose: 'Ensures variables persist across turns without resetting. Put in Library.',
    fileType: 'library',
    content: `// Initialize state variables with default values
// These persist across turns and won't reset
state.playerHP = state.playerHP ?? 100;
state.playerMaxHP = state.playerMaxHP ?? 100;
state.gold = state.gold ?? 0;
state.inventory = state.inventory ?? [];
state.flags = state.flags ?? {};`
  }
]

// ============================================
// EXAMPLE SCRIPTS
// ============================================
export const SCRIPTS = [
  {
    id: 'dice-roll-basic',
    name: 'Basic Dice Roller',
    category: 'game-systems',
    tags: ['dice', 'rng', 'beginner', 'command'],
    author: 'BetterRepository',
    description: 'Simple /roll command for dice rolling.',
    purpose: 'Adds a /roll XdY command to roll dice. Results appear in the story.',
    fileType: 'input',
    content: `const modifier = (text) => {
  // Check for /roll command
  const rollMatch = text.match(/\\/roll\\s+(\\d+)d(\\d+)/i);
  
  if (rollMatch) {
    const numDice = parseInt(rollMatch[1]);
    const sides = parseInt(rollMatch[2]);
    
    let rolls = [];
    let total = 0;
    
    for (let i = 0; i < numDice; i++) {
      const roll = Math.floor(Math.random() * sides) + 1;
      rolls.push(roll);
      total += roll;
    }
    
    // Replace command with result
    const result = \`[Rolling \${numDice}d\${sides}: \${rolls.join(', ')} = \${total}]\\n\`;
    text = text.replace(rollMatch[0], result);
  }
  
  return { text };
};

modifier(text)`
  },
  {
    id: 'hp-tracker',
    name: 'Simple HP Tracker',
    category: 'tracking',
    tags: ['hp', 'health', 'tracking', 'beginner'],
    author: 'BetterRepository',
    description: 'Tracks player HP and displays it in context.',
    purpose: 'Adds HP tracking with /hp, /damage, and /heal commands.',
    files: {
      library: `// Initialize HP state
state.hp = state.hp ?? 100;
state.maxHp = state.maxHp ?? 100;

function getHPBar() {
  const percent = Math.round((state.hp / state.maxHp) * 100);
  const filled = Math.round(percent / 10);
  const empty = 10 - filled;
  return '[' + '█'.repeat(filled) + '░'.repeat(empty) + '] ' + state.hp + '/' + state.maxHp;
}`,
      input: `const modifier = (text) => {
  // /hp - show current HP
  if (text.includes('/hp')) {
    text = text.replace('/hp', '[HP: ' + getHPBar() + ']\\n');
  }
  
  // /damage X - take damage
  const damageMatch = text.match(/\\/damage\\s+(\\d+)/i);
  if (damageMatch) {
    const damage = parseInt(damageMatch[1]);
    state.hp = Math.max(0, state.hp - damage);
    text = text.replace(damageMatch[0], 
      '[Took ' + damage + ' damage! HP: ' + getHPBar() + ']\\n');
  }
  
  // /heal X - restore HP
  const healMatch = text.match(/\\/heal\\s+(\\d+)/i);
  if (healMatch) {
    const heal = parseInt(healMatch[1]);
    state.hp = Math.min(state.maxHp, state.hp + heal);
    text = text.replace(healMatch[0], 
      '[Healed ' + heal + '! HP: ' + getHPBar() + ']\\n');
  }
  
  return { text };
};

modifier(text)`,
      context: `const modifier = (text) => {
  // Inject HP into context so AI knows player's health
  const hpInfo = '[Player Status: HP ' + state.hp + '/' + state.maxHp + ']\\n';
  text = hpInfo + text;
  return { text };
};

modifier(text)`
    }
  },
  {
    id: 'time-tracker',
    name: 'Day/Night Cycle',
    category: 'tracking',
    tags: ['time', 'day-night', 'tracking'],
    author: 'BetterRepository',
    description: 'Tracks in-game time with day/night cycle.',
    purpose: 'Adds time progression and injects current time into context.',
    files: {
      library: `// Time tracking
state.hour = state.hour ?? 8;  // Start at 8 AM
state.day = state.day ?? 1;

function getTimeOfDay() {
  if (state.hour >= 6 && state.hour < 12) return 'morning';
  if (state.hour >= 12 && state.hour < 17) return 'afternoon';
  if (state.hour >= 17 && state.hour < 21) return 'evening';
  return 'night';
}

function advanceTime(hours) {
  state.hour += hours;
  while (state.hour >= 24) {
    state.hour -= 24;
    state.day++;
  }
}

function formatTime() {
  const period = state.hour >= 12 ? 'PM' : 'AM';
  const displayHour = state.hour % 12 || 12;
  return displayHour + ':00 ' + period;
}`,
      context: `const modifier = (text) => {
  const timeInfo = '[Day ' + state.day + ', ' + formatTime() + ' (' + getTimeOfDay() + ')]\\n';
  text = timeInfo + text;
  return { text };
};

modifier(text)`
    }
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get scripts by category
export const getScriptsByCategory = (categoryId) => {
  return SCRIPTS.filter(s => s.category === categoryId)
}

// Get utility scripts
export const getUtilityScripts = () => UTILITY_SCRIPTS

// Search scripts
export const searchScripts = (query) => {
  const lowerQuery = query.toLowerCase()
  const allScripts = [...SCRIPTS, ...UTILITY_SCRIPTS]
  return allScripts.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.description.toLowerCase().includes(lowerQuery) ||
    s.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// Get category counts
export const getCategoryCounts = () => {
  const counts = {}
  SCRIPT_CATEGORIES.forEach(cat => {
    counts[cat.id] = SCRIPTS.filter(s => s.category === cat.id).length
  })
  return counts
}

// Update category counts in SCRIPT_CATEGORIES
export const updateCategoryCounts = () => {
  SCRIPT_CATEGORIES.forEach(cat => {
    cat.count = SCRIPTS.filter(s => s.category === cat.id).length
  })
}
