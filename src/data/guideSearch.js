// Search-only index for guide destinations. Guide content remains in the Vue
// components; this compact index makes every primary guide and Ultrascripts
// module discoverable from global search.

export const GUIDE_SEARCH_ITEMS = [
  {
    id: 'guide-ai-instructions',
    name: 'AI Instructions Guide',
    description: 'Write clear behavior, style, pacing, and narrative instructions for AI Dungeon.',
    tags: ['guide', 'instructions', 'writing', 'style', 'pacing'],
    route: '/guides',
    tabHint: 'ai-instructions'
  },
  {
    id: 'guide-plot-components',
    name: 'Plot Components Guide',
    description: 'Choose and structure Plot Essentials, Author’s Note, Story Summary, and related context.',
    tags: ['guide', 'plot', 'context', 'authors note', 'story summary'],
    route: '/guides',
    tabHint: 'plot-components'
  },
  {
    id: 'guide-story-cards',
    name: 'Story Cards Guide',
    description: 'Build reliable triggers, entries, command presets, and import-ready Story Cards.',
    tags: ['guide', 'story cards', 'triggers', 'command presets'],
    route: '/guides',
    tabHint: 'story-cards'
  },
  {
    id: 'guide-scripts',
    name: 'Scripts Guide',
    description: 'Understand AI Dungeon script hooks, state, APIs, safe patterns, and Ultrascripts migration.',
    tags: ['guide', 'scripts', 'javascript', 'hooks', 'state'],
    route: '/guides',
    tabHint: 'scripts'
  },
  {
    id: 'guide-symbols-commands',
    name: 'Symbols & Commands Guide',
    description: 'Use AI Dungeon action symbols, input modes, and BetterDungeon command behavior.',
    tags: ['guide', 'symbols', 'commands', 'do', 'say', 'story'],
    route: '/guides',
    tabHint: 'symbols-commands'
  },
  {
    id: 'guide-advanced-settings',
    name: 'Advanced Settings Guide',
    description: 'Tune generation settings and model presets with practical tradeoffs.',
    tags: ['guide', 'advanced settings', 'models', 'temperature', 'generation'],
    route: '/guides',
    tabHint: 'advanced-settings'
  }
]

export const ULTRASCRIPTS_GUIDE_SEARCH_ITEMS = [
  {
    id: 'ultrascripts-overview',
    name: 'Ultrascripts Overview',
    description: 'The shipped BetterDungeon V2.1 runtime, nine-module surface, transport, and platform support.',
    tags: ['ultrascripts', 'guide', 'overview', 'betterdungeon v2', 'modules'],
    route: '/ultrascripts',
    tabHint: 'overview'
  },
  {
    id: 'ultrascripts-quickstart',
    name: 'Ultrascripts Quick Start',
    description: 'Install the bd.us helper and build a turn-safe enhanced script.',
    tags: ['ultrascripts', 'guide', 'quick start', 'helper', 'template'],
    route: '/ultrascripts',
    tabHint: 'quickstart'
  },
  {
    id: 'ultrascripts-cookbook',
    name: 'Ultrascripts Cookbook',
    description: 'Copyable patterns for capability checks, requests, responses, fallbacks, and widgets.',
    tags: ['ultrascripts', 'guide', 'cookbook', 'recipes', 'examples'],
    route: '/ultrascripts',
    tabHint: 'cookbook'
  },
  {
    id: 'ultrascripts-architecture',
    name: 'Ultrascripts Architecture',
    description: 'Understand transport, Core, module lifecycle, reserved cards, and the ops dispatcher.',
    tags: ['ultrascripts', 'guide', 'architecture', 'transport', 'protocol'],
    route: '/ultrascripts',
    tabHint: 'architecture'
  },
  {
    id: 'ultrascripts-authoring',
    name: 'Building Ultrascripts Modules',
    description: 'Implement BetterDungeon modules with the released registry and scoped context contracts.',
    tags: ['ultrascripts', 'guide', 'modules', 'authoring', 'registry'],
    route: '/ultrascripts',
    tabHint: 'authoring'
  },
  {
    id: 'ultrascripts-widget',
    name: 'Widget Module Guide',
    description: 'Publish dynamic UI state and handle later-turn widget interactions.',
    tags: ['ultrascripts', 'guide', 'widget', 'dashboard', 'ackseq'],
    route: '/ultrascripts',
    tabHint: 'widget'
  },
  {
    id: 'ultrascripts-webfetch',
    name: 'WebFetch Module Guide',
    description: 'Read small public HTTPS text resources with bounded GET and HEAD requests.',
    tags: ['ultrascripts', 'guide', 'webfetch', 'https', 'fetch', 'public-data'],
    route: '/ultrascripts',
    tabHint: 'webfetch'
  },
  {
    id: 'ultrascripts-ai',
    name: 'AI Module Guide',
    description: 'Use the asynchronous status/query contract for text and schema-backed JSON.',
    tags: ['ultrascripts', 'guide', 'ai', 'status', 'query', 'json'],
    route: '/ultrascripts',
    tabHint: 'ai'
  },
  {
    id: 'ultrascripts-sdk',
    name: 'SDK Module Guide',
    description: 'Read safe BetterDungeon version and configuration metadata.',
    tags: ['ultrascripts', 'guide', 'sdk', 'version', 'config'],
    route: '/ultrascripts',
    tabHint: 'sdk'
  },
  {
    id: 'ultrascripts-clock',
    name: 'Clock Module Guide',
    description: 'Read current time, timezone data, and formatted timestamps.',
    tags: ['ultrascripts', 'guide', 'clock', 'time', 'timezone', 'format'],
    route: '/ultrascripts',
    tabHint: 'clock'
  },
  {
    id: 'ultrascripts-weather',
    name: 'Weather Module Guide',
    description: 'Read current conditions and forecasts by coordinates or place.',
    tags: ['ultrascripts', 'guide', 'weather', 'current', 'forecast'],
    route: '/ultrascripts',
    tabHint: 'weather'
  },
  {
    id: 'ultrascripts-network',
    name: 'Network Module Guide',
    description: 'Use best-effort online state, connection, and quality hints.',
    tags: ['ultrascripts', 'guide', 'network', 'online', 'connection'],
    route: '/ultrascripts',
    tabHint: 'network'
  },
  {
    id: 'ultrascripts-system',
    name: 'System Module Guide',
    description: 'Adapt to device, browser, display, locale, and battery hints.',
    tags: ['ultrascripts', 'guide', 'system', 'device', 'browser', 'battery'],
    route: '/ultrascripts',
    tabHint: 'system'
  }
]
