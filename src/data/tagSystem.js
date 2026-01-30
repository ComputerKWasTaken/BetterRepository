// =============================================================================
// BetterRepository - Smart Tag System
// =============================================================================
// A unified tag system that groups related tags under core concepts while
// preserving searchability for specific terms. This reduces visual clutter
// while maintaining search breadth.
//
// STRUCTURE:
// - Core tags: The main concept displayed in the UI
// - Aliases: Related terms that map to the core tag for search purposes
// - Description: What this tag group represents
// - Color: Visual styling for the tag
// =============================================================================

// ============================================
// TAG DEFINITIONS
// ============================================
// Each core tag has aliases that all map to it during search.
// When displaying tags, we show the core tag.
// When searching, we match against core tag AND all aliases.
// ============================================

export const TAG_SYSTEM = {
  // --- Importance & Quality ---
  essential: {
    core: 'essential',
    aliases: ['must-have', 'important', 'critical', 'required', 'fundamental'],
    description: 'Core instructions that should be in most sets',
    color: 'amber'
  },

  // --- Writing Mechanics ---
  'anti-repetition': {
    core: 'anti-repetition',
    aliases: ['no-echo', 'no-repeat', 'anti-echo', 'no-parroting', 'repetition'],
    description: 'Prevents the AI from repeating content',
    color: 'red'
  },
  style: {
    core: 'style',
    aliases: ['prose', 'writing', 'literary', 'artistic'],
    description: 'Writing style and prose quality',
    color: 'blue'
  },
  pacing: {
    core: 'pacing',
    aliases: ['flow', 'rhythm', 'tempo', 'speed', 'momentum'],
    description: 'Story pacing and narrative flow',
    color: 'cyan'
  },
  dialogue: {
    core: 'dialogue',
    aliases: ['speech', 'conversation', 'talking', 'speaking', 'verbal'],
    description: 'Character dialogue and conversation',
    color: 'green'
  },
  tone: {
    core: 'tone',
    aliases: ['mood', 'atmosphere', 'vibe', 'feeling'],
    description: 'Overall tone and mood',
    color: 'purple'
  },
  description: {
    core: 'description',
    aliases: ['detail', 'imagery', 'visuals', 'sensory'],
    description: 'Descriptive writing and imagery',
    color: 'teal'
  },

  // --- Character & Behavior ---
  personality: {
    core: 'personality',
    aliases: ['character', 'behavior', 'traits', 'depth', 'nuance'],
    description: 'Character personality and depth',
    color: 'purple'
  },
  'npc-behavior': {
    core: 'npc-behavior',
    aliases: ['npc', 'characters', 'npcs', 'cast'],
    description: 'How NPCs act and behave',
    color: 'indigo'
  },
  emotions: {
    core: 'emotions',
    aliases: ['feelings', 'emotional', 'sentiment', 'affect'],
    description: 'Emotional expression and reactions',
    color: 'pink'
  },
  relationships: {
    core: 'relationships',
    aliases: ['romance', 'connection', 'bonds', 'dynamics'],
    description: 'Character relationships and connections',
    color: 'rose'
  },

  // --- Story & World ---
  consistency: {
    core: 'consistency',
    aliases: ['continuity', 'coherence', 'lore', 'canon'],
    description: 'Story and world consistency',
    color: 'green'
  },
  knowledge: {
    core: 'knowledge',
    aliases: ['metagaming', 'awareness', 'information', 'omniscience'],
    description: 'Character knowledge and information',
    color: 'blue'
  },
  consequences: {
    core: 'consequences',
    aliases: ['stakes', 'risk', 'danger', 'outcomes', 'results'],
    description: 'Actions and their consequences',
    color: 'orange'
  },
  difficulty: {
    core: 'difficulty',
    aliases: ['challenge', 'hardcore', 'casual', 'easy', 'hard'],
    description: 'Game/story difficulty level',
    color: 'red'
  },
  immersion: {
    core: 'immersion',
    aliases: ['immersive', 'realism', 'believable', 'grounded'],
    description: 'Story immersion and believability',
    color: 'emerald'
  },

  // --- Genres ---
  fantasy: {
    core: 'fantasy',
    aliases: ['magic', 'magical', 'epic', 'mythical'],
    description: 'Fantasy genre elements',
    color: 'violet'
  },
  scifi: {
    core: 'scifi',
    aliases: ['science-fiction', 'futuristic', 'space', 'technology', 'cyberpunk'],
    description: 'Science fiction elements',
    color: 'cyan'
  },
  horror: {
    core: 'horror',
    aliases: ['dark', 'terror', 'scary', 'dread', 'creepy'],
    description: 'Horror genre elements',
    color: 'slate'
  },
  romance: {
    core: 'romance',
    aliases: ['romantic', 'love', 'relationship'],
    description: 'Romance genre elements',
    color: 'pink'
  },
  thriller: {
    core: 'thriller',
    aliases: ['suspense', 'tension', 'exciting', 'fast-paced'],
    description: 'Thriller/action elements',
    color: 'orange'
  },

  // --- Roles & POV ---
  role: {
    core: 'role',
    aliases: ['persona', 'identity', 'author', 'novelist', 'storyteller', 'narrator'],
    description: 'AI role and persona',
    color: 'amber'
  },
  pov: {
    core: 'pov',
    aliases: ['perspective', 'tense', 'first-person', 'second-person', 'third-person', 'viewpoint'],
    description: 'Point of view and tense',
    color: 'sky'
  },

  // --- Control & Formatting ---
  control: {
    core: 'control',
    aliases: ['agency', 'autonomy', 'freedom', 'restriction'],
    description: 'Player/character control level',
    color: 'yellow'
  },
  formatting: {
    core: 'formatting',
    aliases: ['format', 'output', 'structure', 'layout'],
    description: 'Output formatting and structure',
    color: 'gray'
  },

  // --- Settings ---
  setting: {
    core: 'setting',
    aliases: ['world', 'environment', 'location', 'era', 'period'],
    description: 'World and setting details',
    color: 'emerald'
  },
  modern: {
    core: 'modern',
    aliases: ['contemporary', 'present-day', 'current'],
    description: 'Modern/contemporary settings',
    color: 'slate'
  },
  historical: {
    core: 'historical',
    aliases: ['period', 'victorian', 'medieval', '19th-century', 'feudal'],
    description: 'Historical settings',
    color: 'amber'
  },

  // --- Special ---
  complete: {
    core: 'complete',
    aliases: ['set', 'bundle', 'package', 'full'],
    description: 'Complete instruction sets',
    color: 'amber'
  },
  'thinking-mode': {
    core: 'thinking-mode',
    aliases: ['analytical', 'deliberate', 'thoughtful'],
    description: 'Thinking mode activation',
    color: 'blue'
  },
  combat: {
    core: 'combat',
    aliases: ['fighting', 'battle', 'action', 'tactical'],
    description: 'Combat and action systems',
    color: 'red'
  },
  mystery: {
    core: 'mystery',
    aliases: ['investigation', 'detective', 'clues', 'secrets'],
    description: 'Mystery and investigation elements',
    color: 'indigo'
  },

  // --- Content Types ---
  template: {
    core: 'template',
    aliases: ['starter', 'base', 'foundation', 'boilerplate'],
    description: 'Starter templates and foundations',
    color: 'blue'
  },
  example: {
    core: 'example',
    aliases: ['sample', 'demo', 'reference'],
    description: 'Example content for reference',
    color: 'cyan'
  },
  worldbuilding: {
    core: 'worldbuilding',
    aliases: ['lore', 'world', 'setting-creation'],
    description: 'World and setting creation',
    color: 'emerald'
  },

  // --- Character Types ---
  character: {
    core: 'character',
    aliases: ['npc', 'person', 'individual'],
    description: 'Character-related content',
    color: 'purple'
  },
  companion: {
    core: 'companion',
    aliases: ['ally', 'party-member', 'friend'],
    description: 'Companion and ally content',
    color: 'green'
  },
  antagonist: {
    core: 'antagonist',
    aliases: ['villain', 'enemy', 'rival'],
    description: 'Antagonist and villain content',
    color: 'red'
  },

  // --- Location Types ---
  location: {
    core: 'location',
    aliases: ['place', 'area', 'region'],
    description: 'Location and place content',
    color: 'teal'
  },

  // --- Item Types ---
  item: {
    core: 'item',
    aliases: ['object', 'equipment', 'gear'],
    description: 'Item and equipment content',
    color: 'amber'
  },

  // --- Organization Types ---
  faction: {
    core: 'faction',
    aliases: ['organization', 'group', 'guild', 'order'],
    description: 'Faction and organization content',
    color: 'indigo'
  }
}

// ============================================
// TAG UTILITIES
// ============================================

/**
 * Build a reverse lookup map: alias -> core tag
 * This allows O(1) lookup when searching
 */
const buildAliasMap = () => {
  const map = new Map()
  
  for (const [coreTag, config] of Object.entries(TAG_SYSTEM)) {
    // Map the core tag to itself
    map.set(coreTag, coreTag)
    
    // Map each alias to the core tag
    for (const alias of config.aliases) {
      map.set(alias.toLowerCase(), coreTag)
    }
  }
  
  return map
}

// Pre-built alias map for fast lookups
export const TAG_ALIAS_MAP = buildAliasMap()

/**
 * Get the core tag for any tag (resolves aliases)
 * @param {string} tag - The tag to resolve
 * @returns {string} - The core tag, or the original tag if not found
 */
export const getCoreTag = (tag) => {
  const normalized = tag.toLowerCase().trim()
  return TAG_ALIAS_MAP.get(normalized) || tag
}

/**
 * Get tag configuration (color, description, etc.)
 * @param {string} tag - The tag to get config for
 * @returns {object|null} - Tag configuration or null
 */
export const getTagConfig = (tag) => {
  const coreTag = getCoreTag(tag)
  return TAG_SYSTEM[coreTag] || null
}

/**
 * Get the display color for a tag
 * @param {string} tag - The tag
 * @returns {string} - Tailwind color name
 */
export const getTagColor = (tag) => {
  const config = getTagConfig(tag)
  return config?.color || 'gray'
}

/**
 * Normalize an array of tags to their core versions
 * Removes duplicates that resolve to the same core tag
 * @param {string[]} tags - Array of tags
 * @returns {string[]} - Array of unique core tags
 */
export const normalizeTagsToCore = (tags) => {
  if (!tags || !Array.isArray(tags)) return []
  
  const seen = new Set()
  const result = []
  
  for (const tag of tags) {
    const coreTag = getCoreTag(tag)
    if (!seen.has(coreTag)) {
      seen.add(coreTag)
      result.push(coreTag)
    }
  }
  
  return result
}

/**
 * Check if a search query matches any tag in the array (including aliases)
 * @param {string} query - Search query
 * @param {string[]} tags - Array of tags to search
 * @returns {boolean} - True if query matches any tag or alias
 */
export const tagMatchesQuery = (query, tags) => {
  if (!query || !tags || !Array.isArray(tags)) return false
  
  const normalizedQuery = query.toLowerCase().trim()
  
  // Check direct match
  if (tags.some(t => t.toLowerCase().includes(normalizedQuery))) {
    return true
  }
  
  // Check if query is an alias that maps to a core tag in the array
  const queryCoreTag = getCoreTag(normalizedQuery)
  const tagCoreTags = tags.map(t => getCoreTag(t))
  
  if (tagCoreTags.includes(queryCoreTag)) {
    return true
  }
  
  // Check if any tag's aliases match the query
  for (const tag of tags) {
    const coreTag = getCoreTag(tag)
    const config = TAG_SYSTEM[coreTag]
    if (config) {
      if (config.aliases.some(alias => alias.toLowerCase().includes(normalizedQuery))) {
        return true
      }
    }
  }
  
  return false
}

/**
 * Get all searchable terms for a tag (core + aliases)
 * @param {string} tag - The tag
 * @returns {string[]} - Array of all searchable terms
 */
export const getTagSearchTerms = (tag) => {
  const coreTag = getCoreTag(tag)
  const config = TAG_SYSTEM[coreTag]
  
  if (config) {
    return [coreTag, ...config.aliases]
  }
  
  return [tag]
}

/**
 * Get all unique core tags from a collection of items
 * @param {Array} collection - Array of items with tags property
 * @returns {string[]} - Sorted array of unique core tags
 */
export const getAllCoreTags = (collection) => {
  const allTags = new Set()
  
  for (const item of collection) {
    if (item.tags && Array.isArray(item.tags)) {
      for (const tag of item.tags) {
        allTags.add(getCoreTag(tag))
      }
    }
  }
  
  return Array.from(allTags).sort()
}

/**
 * Get tag statistics from a collection
 * @param {Array} collection - Array of items with tags property
 * @returns {Map} - Map of core tag -> count
 */
export const getTagStats = (collection) => {
  const stats = new Map()
  
  for (const item of collection) {
    if (item.tags && Array.isArray(item.tags)) {
      const coreTags = normalizeTagsToCore(item.tags)
      for (const tag of coreTags) {
        stats.set(tag, (stats.get(tag) || 0) + 1)
      }
    }
  }
  
  return stats
}

// ============================================
// TAG COLOR CLASSES
// ============================================
// Tailwind classes for tag colors

export const TAG_COLOR_CLASSES = {
  amber: { bg: 'bg-bd-amber/20', text: 'text-bd-amber', border: 'border-bd-amber/30' },
  red: { bg: 'bg-bd-error/20', text: 'text-bd-error', border: 'border-bd-error/30' },
  blue: { bg: 'bg-bd-blue/20', text: 'text-bd-blue', border: 'border-bd-blue/30' },
  cyan: { bg: 'bg-bd-cyan/20', text: 'text-bd-cyan', border: 'border-bd-cyan/30' },
  green: { bg: 'bg-bd-green/20', text: 'text-bd-green', border: 'border-bd-green/30' },
  purple: { bg: 'bg-bd-purple/20', text: 'text-bd-purple', border: 'border-bd-purple/30' },
  pink: { bg: 'bg-bd-pink/20', text: 'text-bd-pink', border: 'border-bd-pink/30' },
  orange: { bg: 'bg-bd-amber/20', text: 'text-bd-amber', border: 'border-bd-amber/30' },
  teal: { bg: 'bg-bd-cyan/20', text: 'text-bd-cyan', border: 'border-bd-cyan/30' },
  indigo: { bg: 'bg-bd-purple/20', text: 'text-bd-purple', border: 'border-bd-purple/30' },
  rose: { bg: 'bg-bd-pink/20', text: 'text-bd-pink', border: 'border-bd-pink/30' },
  emerald: { bg: 'bg-bd-green/20', text: 'text-bd-green', border: 'border-bd-green/30' },
  violet: { bg: 'bg-bd-purple/20', text: 'text-bd-purple', border: 'border-bd-purple/30' },
  slate: { bg: 'bg-bd-bg-tertiary', text: 'text-bd-text-secondary', border: 'border-bd-border-default' },
  sky: { bg: 'bg-bd-blue/20', text: 'text-bd-blue', border: 'border-bd-blue/30' },
  yellow: { bg: 'bg-bd-amber/20', text: 'text-bd-amber', border: 'border-bd-amber/30' },
  gray: { bg: 'bg-bd-bg-tertiary', text: 'text-bd-text-muted', border: 'border-bd-border-subtle' }
}

/**
 * Get Tailwind classes for a tag
 * @param {string} tag - The tag
 * @returns {object} - Object with bg, text, border classes
 */
export const getTagClasses = (tag) => {
  const color = getTagColor(tag)
  return TAG_COLOR_CLASSES[color] || TAG_COLOR_CLASSES.gray
}
