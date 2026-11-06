// Search-only index for Ultrascripts guide destinations. Guide content remains
// in the Vue components; this compact index makes every Ultrascripts module
// discoverable from global search.


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
