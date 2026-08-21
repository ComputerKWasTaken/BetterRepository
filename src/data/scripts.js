// =============================================================================
// BetterRepository - Scripts Data
// =============================================================================
// Script examples and categories for AI Dungeon's scripting system.
// Scripts use JavaScript to modify context, input, and output.
// =============================================================================

// ============================================
// SCRIPT RULESET (Internal Documentation)
// All scripts MUST follow these rules.
// ============================================
//
// 1. FILE TYPE DECLARATION
//    Every script must declare its `fileType` ('input', 'output', 'context', or 'helper')
//    or use the `files` object for multi-file scripts. The file type determines
//    when the script runs in the AI Dungeon pipeline. Helper scripts are utility
//    functions meant to be placed in the Library file.
//
// 2. MODIFIER PATTERN
//    All scripts must use the standard modifier pattern:
//    `const modifier = (text) => { ... return { text } }` followed by
//    `modifier(text)`. Do not deviate from this structure.
//
// 3. CATEGORY ASSIGNMENT
//    Every script must have a `category` field matching one of the
//    SCRIPT_CATEGORIES ids: basics, game-systems, tracking, commands,
//    magic, utilities, ultrascripts-enhanced, ultrascripts-required.
//
// 4. CLEAR COMMENTS
//    Scripts must include inline comments explaining non-obvious logic.
//    The target audience is intermediate JavaScript users who understand
//    basic programming but may not know AI Dungeon's scripting API.
//
// 5. DIFFICULTY RATING
//    - beginner: Simple text manipulation or state tracking
//    - intermediate: Complex state management, regex, or multi-file scripts
//    - advanced: Full game systems, complex context manipulation, or widget integration
//
// 6. IMPACT RATING
//    - high: Fundamentally changes gameplay (quest systems, command parsers)
//    - medium: Adds notable mechanics (dice rolling, inventory tracking)
//    - low: Minor enhancements (text replacement, simple counters)
//
// 7. SOURCE ATTRIBUTION
//    Every script must have a `source` field: 'Official Guidebook' for scripts
//    from AI Dungeon docs, 'Community' for community contributions, or
//    'BetterRepository' for originals. Include `githubUrl` or `externalUrl`
//    when applicable.
//
// 8. SAFE DEFAULTS
//    Scripts must initialize state safely (e.g., `state.items = state.items || []`).
//    Never assume state exists from previous turns. Scripts must handle edge
//    cases gracefully without throwing errors.
//
// 9. NO REDUNDANCY
//    Before creating a script, verify it doesn't duplicate an existing one.
//    If similar, consider extending the existing script or making it more
//    configurable rather than creating a near-duplicate.
//
// 10. METADATA COMPLETENESS
//     Every script must include: id, name, category, difficulty, impact,
//     essential, tags, source, description, purpose, and either content
//     (with fileType) or files (for multi-file scripts). Include githubUrl
//     if the script has specific installation instructions on GitHub.
//

import { searchCollectionSmart } from './shared'

// ============================================
// SCRIPT CATEGORIES
// ============================================
export const SCRIPT_CATEGORIES = [
  {
    id: 'basics',
    name: 'Basic Examples',
    icon: 'BookOpen',
    color: 'bd-green',
    description: 'Simple examples to learn the scripting fundamentals.',
    count: 0
  },
  {
    id: 'game-systems',
    name: 'Game Systems',
    icon: 'Dices',
    color: 'bd-purple',
    description: 'Dice rolling, random events, quests, and game mechanics.',
    count: 0
  },
  {
    id: 'tracking',
    name: 'Tracking & State',
    icon: 'Clock',
    color: 'bd-blue',
    description: 'Notes, inventory, relationships, and persistent state.',
    count: 0
  },
  {
    id: 'commands',
    name: 'Commands & Input',
    icon: 'Terminal',
    color: 'bd-cyan',
    description: 'Command parsers and input processing systems.',
    count: 0
  },
  {
    id: 'magic',
    name: 'Magic & Abilities',
    icon: 'Wand2',
    color: 'bd-pink',
    description: 'Spell systems, special abilities, and magic mechanics.',
    count: 0
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'FolderOpen',
    color: 'bd-amber',
    description: 'Helper functions, debugging tools, and general utilities.',
    count: 0
  },
  {
    id: 'ultrascripts-enhanced',
    name: 'Ultrascripts Enhanced',
    icon: 'Zap',
    color: 'bd-emerald',
    description: 'Vanilla-first scripts whose core flow still works without BetterDungeon, but gain extra capability through Ultrascripts.',
    count: 0
  },
  {
    id: 'ultrascripts-required',
    name: 'Requires Ultrascripts',
    icon: 'Rocket',
    color: 'bd-purple',
    description: 'Scripts whose core behavior depends on BetterDungeon and the Ultrascripts runtime being available.',
    count: 0
  }
]

// ============================================
// EXAMPLE SCRIPTS (From Official Guidebook)
// ============================================
export const SCRIPTS = [
  // ========== BASIC EXAMPLES ==========
  {
    id: 'basic-example',
    name: 'Basic Example',
    category: 'basics',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['state', 'memory', 'message'],
    source: 'Official Guidebook',
    description: 'The official basic example showing core scripting concepts.',
    purpose: 'Demonstrates state management, memory modification, messages, and text modification.',
    fileType: 'input'
  },
  {
    id: 'dont-be-negative',
    name: "Don't Be Negative",
    category: 'basics',
    difficulty: 'beginner',
    impact: 'low',
    essential: true,
    tags: ['regex', 'text-replacement'],
    source: 'Official Guidebook',
    description: 'Simple example that removes "not" from all text.',
    purpose: 'Shows basic text replacement using regex. A humorous example that makes everything positive.',
    fileType: 'output'
  },
  {
    id: 'reimplement-authors-note',
    name: 'Reimplement Authors Note',
    category: 'basics',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['authors-note', 'context-injection'],
    source: 'Official Guidebook',
    description: "Re-implements Author's Note functionality as an example.",
    purpose: 'Shows how to inject text at a specific position in the context, useful for understanding context structure.',
    fileType: 'context'
  },

  // ========== COMMANDS & INPUT ==========
  {
    id: 'command-parser',
    name: 'Command Parser',
    category: 'commands',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['commands', 'parser', 'stop-action'],
    source: 'Official Guidebook',
    description: 'Parses user commands in the format :command arg1 arg2.',
    purpose: 'Foundation for building command systems. Extracts command name and arguments from player input.',
    fileType: 'input'
  },

  // ========== TRACKING & STATE ==========
  {
    id: 'true-auto-stats',
    name: 'True Auto Stats (TAS)',
    category: 'tracking',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['stats', 'rpg', 'inventory', 'skills', 'combat'],
    source: 'Community',
    author: 'Yi1i1i',
    description: 'Automatically creates, tracks, and updates player stats during your adventure using story cards.',
    purpose: 'Interprets numerical stats for the AI, tracks inventory/skills/HP, and provides a customizable RPG stat system without needing manual commands.',
    scenarioLink: 'https://play.aidungeon.com/scenario/M8phJMfTapai/tas-wip'
  },
  {
    id: 'stackable-inventory-system',
    name: 'Stackable Inventory System (SIS)',
    category: 'tracking',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['inventory', 'commands', 'items', 'story-cards'],
    source: 'Community',
    author: 'bottledfox',
    description: 'A lightweight, plug-and-play inventory system that auto-stacks items in a live story card.',
    purpose: 'Manages inventory using slash commands (/take, /use, /drop, /give, /throw) with a rules checker to determine if items can reasonably be stored.',
    scenarioLink: 'https://play.aidungeon.link/scenario/-3ouuszCAReF/stackable-inventory-system-sis'
  },
  {
    id: 'notes-system',
    name: 'Notes System',
    category: 'tracking',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['notes', 'context-injection', 'multi-file'],
    source: 'Official Guidebook',
    description: 'Allows players to attach notes to story text that appear to the AI but not the player.',
    purpose: 'Set a note by typing "note: " in Do mode. Notes are tagged to recent text and injected into context.'
  },

  // ========== GAME SYSTEMS ==========
  {
    id: 'story-arc-engine',
    name: 'Story Arc Engine',
    category: 'game-systems',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['story', 'pacing', 'context-injection', 'automation'],
    source: 'Community',
    author: 'Yi1i1i',
    description: 'Automatically helps guide and enhance your story by generating a "Story Arc", which is a high-level plot outline made up of key events.',
    purpose: 'Keeps long stories focused and immersive, reduces inconsistencies, and encourages richer story progression by generating arcs based on player behavior.',
    scenarioLink: 'https://play.aidungeon.com/scenario/piAUFAqzm2xZ/story-arc-engine-wip'
  },
  {
    id: 'death-island',
    name: 'Death Island',
    category: 'game-systems',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['random-events', 'survival', 'horror'],
    source: 'Official Guidebook',
    description: 'A survival horror system with random dangerous events.',
    purpose: 'Demonstrates random event injection, memory progression, and turn-based mechanics.',
    fileType: 'input'
  },
  {
    id: 'guess-or-die',
    name: 'Guess or Die',
    category: 'game-systems',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['minigame', 'multi-file'],
    source: 'Official Guidebook',
    description: 'A number guessing minigame with limited attempts.',
    purpose: 'Shows how to create standalone minigames using input and output modifiers together.'
  },
  {
    id: 'sundale-quests',
    name: 'Sundale Quest System',
    category: 'game-systems',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['quests', 'objectives', 'multi-file'],
    source: 'Official Guidebook',
    description: 'A complete quest management system with objectives and progression.',
    purpose: 'Demonstrates complex state management, quest chains, and dynamic objectives.',
    scenarioLink: 'https://play.aidungeon.com/scenario/80sASRH07Lwk/sundale'
  },

  // ========== MAGIC & ABILITIES ==========
  {
    id: 'magic-spells',
    name: 'Magic Spell System',
    category: 'magic',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['spells', 'discovery', 'keywords'],
    source: 'Official Guidebook',
    description: 'A spell discovery and casting system where players learn spells.',
    purpose: 'Players discover spells through exploration. Casting learned spells triggers special effects.',
    scenarioLink: 'https://play.aidungeon.com/scenario/ANK4YlUw3xYx/legends-of-magic',
    fileType: 'input'
  },

  // ========== UTILITIES ==========
  {
    id: 'localized-languages',
    name: 'Localized Languages (LoLa)',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['translation', 'international', 'auto-cards', 'input-formatting'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Helps players enjoy coherent AI Dungeon adventures using any international language. Improves player inputs.',
    purpose: 'Enforces language consistency by intercepting player input and formatting it correctly.',
    githubUrl: 'https://github.com/LewdLeah/Localized-Languages',
    scenarioLink: 'https://play.aidungeon.link/scenario/AX2nXYIPzcKd/localized-languages'
  },
  {
    id: 'foxtweaks',
    name: 'FoxTweaks',
    category: 'utilities',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['dice', 'formatting', 'redundancy', 'pronouns', 'random-names', 'configuration'],
    source: 'Community',
    author: 'Worldsmythe',
    description: 'A unified script suite for dice rolls, paragraph formatting, redundant output cleanup, pronoun fixes, and random name replacement.',
    purpose: 'Combines several quality-of-life script modules under one configuration card so creators can tune dice outcomes, output formatting, repetition handling, pronoun replacement, and name banks from a single setup.',
    githubUrl: 'https://github.com/Worldsmythe/FoxTweaks',
    externalUrl: 'https://discord.com/channels/903327676884979802/1506111353440702655/1506111353440702655',
    scenarioLink: 'https://play.aidungeon.com/scenario/alR_ZUU1G_2-/foxtweaks-scenario-innerself'
  },
  {
    id: 'build-card',
    name: 'buildCard()',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['story-cards', 'helper-function'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Creates a new story card with all properties set properly.',
    purpose: 'Simplifies story card creation in scripts. Returns the created card object.',
    fileType: 'helper'
  },
  {
    id: 'get-card',
    name: 'getCard()',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['story-cards', 'helper-function', 'search'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Find story cards using a predicate function.',
    purpose: 'Like Array.find but specialized for story cards. Can return all matches or just the first.',
    fileType: 'helper'
  },
  {
    id: 'state-init',
    name: 'State Initialization Pattern',
    category: 'utilities',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['state', 'initialization', 'pattern'],
    source: 'BetterRepository',
    description: 'Pattern for initializing persistent state variables.',
    purpose: 'Ensures variables persist across turns without resetting. Put in Library.',
    fileType: 'helper'
  },
  {
    id: 'auto-cards',
    name: 'Auto-Cards',
    category: 'tracking',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['automation', 'story-cards', 'memory'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Automatically writes & updates plot-relevant story cards during gameplay.',
    purpose: 'Builds a living reference of your adventure\'s world by detecting named entities and managing long-term memory updates.',
    scenarioLink: 'https://play.aidungeon.com/scenario/Ddt0Akd-lVtj/auto-cards'
  },
  {
    id: 'inner-self',
    name: 'Inner Self',
    category: 'game-systems',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['npc', 'agentic', 'memory'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Improves character goals, secrets, planning, and self-reflection.',
    purpose: 'Maintains NPC "brains" that allow them to learn from experiences, form opinions, and adapt behavior over time.',
    scenarioLink: 'https://play.aidungeon.com/scenario/tsu1WMJXaaAZ/inner-self'
  },
  {
    id: 'better-say-actions',
    name: 'Better Say Actions',
    category: 'commands',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: true,
    tags: ['dialogue', 'formatting', 'say-action'],
    source: 'Community',
    author: 'BinKompliziert',
    description: 'Improves the "Say" action with better formatting and custom verbs.',
    purpose: 'Allows actions before dialogue, fixes first-person typos, and adds automatic punctuation.',
    externalUrl: 'https://play.aidungeon.com/scenario/2eiZnXnXXzwR/better-say-actions',
    fileType: 'input'
  },
  {
    id: 'custom-continue',
    name: 'Custom Continue',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['continue-action', 'system-prompt'],
    source: 'Community',
    author: 'Magic',
    description: 'Custom instructions when the player uses the Continue action.',
    purpose: 'Injects specific instructions when the AI is asked to continue from its last response.',
    fileType: 'context'
  },
  {
    id: 'prevent-start-message',
    name: 'Prevent Start Message',
    category: 'utilities',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['initialization', 'starting-message'],
    source: 'Community',
    author: 'Burnout',
    description: 'Prevents the AI from generating an automatic starting message.',
    purpose: 'Useful for scenarios where you want the player to start or have a custom instruction message.',
    fileType: 'output'
  },

  // ========== ULTRASCRIPTS ==========
  // BetterDungeon-powered scripts split into two buckets:
  // 1. Enhanced with Ultrascripts: core scenario still works without the runtime.
  // 2. Requires Ultrascripts: core behavior depends on BetterDungeon being present.
  {
    id: 'ultrascripts-starter-template',
    name: 'Ultrascripts Starter Template',
    category: 'ultrascripts-enhanced',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: true,
    tags: ['ultrascripts', 'template', 'sdk', 'widgets', 'heartbeat', 'clock', 'starter'],
    source: 'BetterRepository',
    description: 'A clean multi-file starter for building AI Dungeon scripts that are enhanced by BetterDungeon and Ultrascripts.',
    purpose: 'Provides a standard bd.us-style helper, heartbeat checks, op calls, response polling, Widget publishing, and safe fallback behavior. Use it as the launchpad for new Ultrascripts-powered scripts.',
    requiresExtension: 'BetterDungeon',
    ultrascriptsMode: 'enhanced'
  },
  {
    id: 'ultrascripts-required-template',
    name: 'Requires Ultrascripts Template',
    category: 'ultrascripts-required',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: true,
    tags: ['ultrascripts', 'template', 'sdk', 'required', 'widgets', 'heartbeat', 'starter'],
    source: 'BetterRepository',
    description: 'A clean multi-file starter for AI Dungeon scripts whose core behavior requires BetterDungeon and Ultrascripts.',
    purpose: 'Provides the same bd.us-style helper as the enhanced starter, plus hard runtime/module gating, clear player-facing requirement messages, response polling, acks, and Widget publishing for scripts that cannot run meaningfully without Ultrascripts.',
    requiresExtension: 'BetterDungeon',
    ultrascriptsMode: 'required'
  },
  {
    id: 'chronos',
    name: 'Chronos V2',
    category: 'ultrascripts-enhanced',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['ultrascripts', 'time', 'calendar', 'widgets', 'context', 'cache-compatible', 'tracking', 'unpublished'],
    source: 'BetterRepository',
    description: 'Unpublished preview of a lightweight in-game clock and Gregorian calendar with cache-compatible model context, Widget display, and a vanilla toast fallback.',
    purpose: 'Keeps story time stable across turns, retries, and Undo without taking over weather or other unrelated simulation systems.',
    requiresExtension: 'BetterDungeon',
    ultrascriptsMode: 'enhanced',
    releaseStatus: 'unpublished',
    releaseNote: 'Chronos V2 is under active development and will publish alongside BetterDungeon V2.1.'
  },
  {
    id: 'stateboy',
    name: 'Stateboy',
    category: 'ultrascripts-required',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['ultrascripts', 'state', 'ai', 'widgets', 'story-cards', 'rpg', 'tracking', 'unpublished'],
    source: 'BetterRepository',
    description: 'Unpublished preview of readable, AI-assisted state management using Stateboy cards, guarded AI updates, State Directives, and a Widget dashboard.',
    purpose: 'Tracks the current Stateboy source for alignment and review. Copy and download actions remain withheld until the dedicated Stateboy release stage.',
    requiresExtension: 'BetterDungeon',
    ultrascriptsMode: 'required',
    releaseStatus: 'unpublished',
    releaseNote: 'Stateboy is not part of BetterRepository V1.7. It will be published in its own release stage after V1.7.'
  }
]

// ============================================
// DYNAMIC SCRIPT LOADING
// ============================================
// Register script contents as lazy raw-text imports. Large community scripts
// are fetched only when a visitor expands, copies, or downloads that entry.
const rawScripts = import.meta.glob(
  [
    './raw-scripts/**/*.js',
    '!./raw-scripts/**/chronos.js',
    '!./raw-scripts/**/stateboy.js'
  ],
  { query: '?raw', import: 'default' }
)

SCRIPTS.forEach(script => {
  // Keep unpublished source in the repository for alignment checks without
  // including it in the public build or exposing copy/download controls.
  if (script.releaseStatus === 'unpublished') return

  // Single file scripts
  if (script.fileType) {
    const contentPath = `./raw-scripts/${script.fileType}/${script.id}.js`
    if (rawScripts[contentPath]) {
      script.contentLoader = rawScripts[contentPath]
    }
  } else {
    // Multi-file scripts
    const types = ['library', 'input', 'context', 'output', 'helper']
    types.forEach(type => {
      const path = `./raw-scripts/${type}/${script.id}.js`
      if (rawScripts[path]) {
        if (!script.fileLoaders) script.fileLoaders = {}
        script.fileLoaders[type] = rawScripts[path]
      }
    })
  }
})

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get scripts by category
export const getScriptsByCategory = (categoryId) => {
  return SCRIPTS.filter(s => s.category === categoryId)
}

// Get all scripts
export const getAllScripts = () => SCRIPTS

// Get essential scripts (recommended for beginners)
export const getEssentialScripts = () => {
  return SCRIPTS.filter(s => s.essential === true)
}

// Get scripts by difficulty
export const getScriptsByDifficulty = (difficulty) => {
  return SCRIPTS.filter(s => s.difficulty === difficulty)
}

// Get beginner scripts
export const getBeginnerScripts = () => getScriptsByDifficulty('beginner')

// Search scripts (includes name, description, tags, purpose, author)
export const searchScripts = (query) => {
  if (!query || !query.trim()) {
    return SCRIPTS
  }
  const results = searchCollectionSmart(
    SCRIPTS,
    query,
    ['name', 'description', 'tags', 'purpose', 'author'],
    { useTagAliases: true }
  )
  return results.map(result => result.item)
}

// Check if script has copyable code content
export const hasCodeContent = (script) => {
  return !!(script.content || script.contentLoader || script.files || script.fileLoaders)
}

// Get category by ID
export const getCategoryById = (categoryId) => {
  return SCRIPT_CATEGORIES.find(c => c.id === categoryId)
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

// Initialize counts on load
updateCategoryCounts()

// ============================================
// MULTISCRIPT BUILDER HELPERS
// ============================================

const hookPatternFunctionPatterns = [
  /globalThis\.([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*function(?:\s+[A-Za-z_$][A-Za-z0-9_$]*)?\s*\(\s*(?:hook|inHook)\b[^)]*\)/m,
  /globalThis\.([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*(?:\(\s*(?:hook|inHook)\b[^)]*\)|(?:hook|inHook))\s*=>\s*\{/m,
  /^function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(\s*(?:hook\s*\)|inHook\s*,\s*inText\s*,\s*inStop\s*\))/m
]

const getHookPatternFunctionMatch = (lib) => {
  if (!lib || typeof lib !== 'string') return null
  for (const pattern of hookPatternFunctionPatterns) {
    const match = lib.match(pattern)
    if (match) return match
  }
  return null
}

// Check if a script uses the library-centric hook pattern.
// A Library file may expose helper functions on globalThis, so only treat it as
// hook-pattern code when the exported/declared function's first argument is the
// lifecycle hook. Otherwise, companion Input/Context/Output files must be merged.
export const isHookPatternScript = (script) => {
  if (!script.files || !script.files.library) return false
  return !!getHookPatternFunctionMatch(script.files.library)
}

// Convert a string to PascalCase function name
export const toPascalCase = (str) => {
  return str
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')
}

// Extract or generate a PascalCase function name for a script
export const getScriptFunctionName = (script) => {
  // If it's a hook pattern script, extract the name from the library
  if (isHookPatternScript(script)) {
    const match = getHookPatternFunctionMatch(script.files.library)
    if (match) return match[1]
  }
  // Otherwise generate from the script name
  return toPascalCase(script.name || 'CustomScript')
}

// Get all scripts that have code content (suitable for the builder)
export const getBuilderCompatibleScripts = () => {
  return SCRIPTS.filter(s => !!(s.content || s.files))
}

// Extract the body of a modifier function from script content.
// Given: `const modifier = (text) => { ...body... }; modifier(text);`
// Returns the body (the statements inside the arrow function).
export const extractModifierBody = (code) => {
  if (!code || typeof code !== 'string') return ''

  // Remove leading/trailing whitespace
  let cleaned = code.trim()

  // Remove comment-only lines at the very start
  const lines = cleaned.split('\n')
  let startIdx = 0
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (trimmed === '' || trimmed.startsWith('//')) {
      startIdx = i + 1
    } else {
      break
    }
  }
  cleaned = lines.slice(startIdx).join('\n').trim()

  // Try to match common AI Dungeon modifier patterns.
  const modifierPatterns = [
    /(?:const|let|var)\s+modifier\s*=\s*\(?\s*text\s*\)?\s*=>\s*\{/,
    /(?:const|let|var)\s+modifier\s*=\s*function\s*\(\s*text\s*\)\s*\{/,
    /function\s+modifier\s*\(\s*text\s*\)\s*\{/
  ]
  let modifierMatch = null
  for (const pattern of modifierPatterns) {
    modifierMatch = cleaned.match(pattern)
    if (modifierMatch) break
  }

  if (!modifierMatch) {
    // If it doesn't match the modifier pattern, return the whole thing
    // (might be raw library code like state initialization)
    return cleaned
  }

  const bodyStart = cleaned.indexOf('{', modifierMatch.index) + 1
  const bodyEnd = findMatchingBrace(cleaned, bodyStart - 1)
  if (bodyEnd === -1) return cleaned

  let body = cleaned.substring(bodyStart, bodyEnd).trim()

  function findMatchingBrace(source, openIndex) {
    let depth = 1
    let mode = 'code'
    let quote = ''
    let inRegexClass = false

    for (let i = openIndex + 1; i < source.length; i++) {
      const char = source[i]
      const next = source[i + 1]

      if (mode === 'lineComment') {
        if (char === '\n') mode = 'code'
        continue
      }

      if (mode === 'blockComment') {
        if (char === '*' && next === '/') {
          mode = 'code'
          i++
        }
        continue
      }

      if (mode === 'string') {
        if (char === '\\') {
          i++
        } else if (char === quote) {
          mode = 'code'
        }
        continue
      }

      if (mode === 'regex') {
        if (char === '\\') {
          i++
        } else if (char === '[') {
          inRegexClass = true
        } else if (char === ']') {
          inRegexClass = false
        } else if (char === '/' && !inRegexClass) {
          mode = 'code'
        }
        continue
      }

      if (char === '/' && next === '/') {
        mode = 'lineComment'
        i++
        continue
      }
      if (char === '/' && next === '*') {
        mode = 'blockComment'
        i++
        continue
      }
      if (char === '"' || char === "'" || char === '`') {
        mode = 'string'
        quote = char
        continue
      }
      if (char === '/' && isLikelyRegexStart(source, i)) {
        mode = 'regex'
        inRegexClass = false
        continue
      }

      if (char === '{') depth++
      if (char === '}') depth--
      if (depth === 0) return i
    }
    return -1
  }

  function isLikelyRegexStart(source, index) {
    const left = source.slice(0, index).trimEnd()
    if (!left) return true
    if (/(return|case|throw|typeof|delete|void|new|in|of)$/.test(left)) return true
    return '({[=,:;!&|?+-*~^<>'.includes(left[left.length - 1])
  }

  // Remove trailing `return { text }` or `return { text: ... }` since the hook pattern
  // uses globalThis.text instead of returning
  // Keep the rest of the logic but convert the return
  body = body.replace(
    /return\s*\{\s*text\s*:\s*([^,}]+)\s*,\s*stop\s*:\s*([^}]+)\}\s*;?\s*$/,
    'globalThis.text = $1;\n    if ($2) globalThis.stop = true;'
  )
  body = body.replace(
    /return\s*\{\s*text\s*:\s*([^,}]+)\s*,\s*stop\s*\}\s*;?\s*$/,
    'globalThis.text = $1;\n    if (stop) globalThis.stop = true;'
  )
  body = body.replace(
    /return\s*\{\s*text\s*,\s*stop\s*:\s*([^}]+)\}\s*;?\s*$/,
    'globalThis.text = text;\n    if ($1) globalThis.stop = true;'
  )
  body = body.replace(
    /return\s*\{\s*text\s*,\s*stop\s*\}\s*;?\s*$/,
    'globalThis.text = text;\n    if (stop) globalThis.stop = true;'
  )
  body = body.replace(
    /return\s*\{\s*text\s*\}\s*;?\s*$/,
    'globalThis.text = text;'
  )
  // Handle simple `return { text }` without semicolon at very end
  body = body.replace(
    /return\s*\{\s*text\s*\}\s*$/,
    'globalThis.text = text;'
  )

  return body
}

// Convert any script format into a hook-pattern library function.
// Returns the full `globalThis.FnName = function FnName(hook) { ... };` string.
export const convertToHookPattern = (script) => {
  const fnName = getScriptFunctionName(script)

  // Case 1: Already a hook-pattern script, so return library content as-is
  if (isHookPatternScript(script)) {
    const lib = script.files.library
    // If it uses a function declaration (not globalThis assignment), add registration
    if (!new RegExp(`globalThis\\.${fnName}\\b`).test(lib)) {
      return `${lib}\nglobalThis.${fnName} = ${fnName};`
    }
    return lib
  }

  // Case 2: Multi-file script with separate lifecycle files
  if (script.files) {
    const libraryCode = script.files.library || ''
    const inputBody = script.files.input ? extractModifierBody(script.files.input) : ''
    const contextBody = script.files.context ? extractModifierBody(script.files.context) : ''
    const outputBody = script.files.output ? extractModifierBody(script.files.output) : ''

    let body = ''

    // Add library code (state init, helper functions) at the top
    if (libraryCode) {
      body += `  // --- Shared Library ---\n`
      body += libraryCode.split('\n').map(l => `  ${l}`).join('\n')
      body += '\n\n'
    }

    if (inputBody) {
      body += `  // -------- hook: input --------\n`
      body += `  if (hook === "input") {\n`
      body += inputBody.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }\n\n`
    }

    if (contextBody) {
      body += `  // -------- hook: context --------\n`
      body += `  if (hook === "context") {\n`
      body += contextBody.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }\n\n`
    }

    if (outputBody) {
      body += `  // -------- hook: output --------\n`
      body += `  if (hook === "output") {\n`
      body += outputBody.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }`
    }

    return `globalThis.${fnName} = function ${fnName}(hook) {\n\n${body}\n};`
  }

  // Case 3: Single-file script with content and fileType
  if (script.content && script.fileType) {
    // Library/helper-type scripts don't need hook wrapping, they're shared code
    if (script.fileType === 'library' || script.fileType === 'helper') {
      // Wrap raw library code in a globalThis function
      const code = script.content.trim()
      return `globalThis.${fnName} = function ${fnName}(hook) {\n\n${code.split('\n').map(l => `  ${l}`).join('\n')}\n};`
    }

    const hookName = script.fileType === 'context' ? 'context'
      : script.fileType === 'output' ? 'output'
        : 'input'
    const body = extractModifierBody(script.content)

    return `globalThis.${fnName} = function ${fnName}(hook) {\n\n  // -------- hook: ${hookName} --------\n  if (hook === "${hookName}") {\n${body.split('\n').map(l => `    ${l}`).join('\n')}\n    return;\n  }\n};`
  }

  // Case 4: Raw content without fileType, so treat as library
  if (script.content) {
    return `globalThis.${fnName} = function ${fnName}(hook) {\n\n${script.content.trim().split('\n').map(l => `  ${l}`).join('\n')}\n};`
  }

  return `// No code content found for ${script.name || 'script'}`
}
