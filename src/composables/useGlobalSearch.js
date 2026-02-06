// =============================================================================
// BetterRepository - Global Search Composable
// =============================================================================
// Searches across ALL data collections (AI Instructions, Plot Components,
// Story Cards, Scripts) and returns categorized, scored results.
// =============================================================================

import { ref, computed, watch } from 'vue'
import { INSTRUCTIONS, SETS } from '@/data/aiInstructions'
import { TEMPLATES } from '@/data/plotComponents'
import { STORY_CARDS, STORY_CARD_TEMPLATES } from '@/data/storyCards'
import { SCRIPTS } from '@/data/scripts'
import { searchCollectionWithScores } from '@/data/shared'
import { usePreferences } from '@/composables/usePreferences'

/**
 * Check if an item is NSFW content.
 * Items are considered NSFW if they have category 'nsfw' or an 'nsfw' tag.
 */
const isNsfwItem = (item) => {
  if (item.category === 'nsfw') return true
  if (Array.isArray(item.tags) && item.tags.includes('nsfw')) return true
  return false
}

// Resource type definitions — icon names, colors, and route paths
const RESOURCE_TYPES = [
  {
    id: 'ai-instructions',
    label: 'AI Instructions',
    sublabel: 'Components',
    icon: 'ScrollText',
    color: 'bd-amber',
    route: '/ai-instructions',
    queryParam: 'q',
    tabHint: 'collection',
  },
  {
    id: 'ai-sets',
    label: 'AI Instructions',
    sublabel: 'Sets',
    icon: 'Layers',
    color: 'bd-orange',
    route: '/ai-instructions',
    queryParam: 'q',
    tabHint: 'sets',
  },
  {
    id: 'plot-components',
    label: 'Plot Components',
    sublabel: 'Templates',
    icon: 'Bookmark',
    color: 'bd-blue',
    route: '/plot-components',
    queryParam: 'q',
    tabHint: 'templates',
  },
  {
    id: 'story-cards',
    label: 'Story Cards',
    sublabel: 'Examples',
    icon: 'Drama',
    color: 'bd-purple',
    route: '/story-cards',
    queryParam: 'q',
    tabHint: 'examples',
  },
  {
    id: 'story-card-templates',
    label: 'Story Cards',
    sublabel: 'Templates',
    icon: 'Drama',
    color: 'bd-purple',
    route: '/story-cards',
    queryParam: 'q',
    tabHint: 'examples',
  },
  {
    id: 'scripts',
    label: 'Scripts',
    sublabel: 'Collection',
    icon: 'Code',
    color: 'bd-cyan',
    route: '/scripts',
    queryParam: 'q',
    tabHint: 'collection',
  },
]

// Fields to search per collection type
const SEARCH_FIELDS = {
  'ai-instructions': ['name', 'description', 'tags', 'purpose'],
  'ai-sets': ['name', 'description', 'tags', 'purpose'],
  'plot-components': ['name', 'description', 'tags', 'purpose', 'useCase'],
  'story-cards': ['name', 'description', 'tags', 'useCase', 'triggers'],
  'story-card-templates': ['name', 'description', 'tags', 'useCase'],
  'scripts': ['name', 'description', 'tags', 'purpose'],
}

/**
 * Perform a global search across all data collections.
 * Returns results grouped by resource type, sorted by relevance.
 *
 * @param {string} query - The search query
 * @param {Object} options - Search options
 * @param {number} options.maxPerGroup - Max results per group (default: 5)
 * @param {number} options.maxTotal - Max total results (default: 20)
 * @param {boolean} options.includeNsfw - Whether to include NSFW results (default: false)
 * @returns {Object} - { groups: Array, totalCount: number, query: string }
 */
export const globalSearch = (query, options = {}) => {
  const { maxPerGroup = 5, maxTotal = 20, includeNsfw = false } = options

  if (!query || !query.trim()) {
    return { groups: [], totalCount: 0, query: '' }
  }

  const trimmed = query.trim()

  // Search each collection with appropriate fields
  const collections = [
    { typeId: 'ai-instructions', data: INSTRUCTIONS },
    { typeId: 'ai-sets', data: SETS },
    { typeId: 'plot-components', data: TEMPLATES },
    { typeId: 'story-cards', data: STORY_CARDS },
    { typeId: 'story-card-templates', data: STORY_CARD_TEMPLATES },
    { typeId: 'scripts', data: SCRIPTS },
  ]

  const groups = []
  let totalCount = 0

  for (const { typeId, data } of collections) {
    const fields = SEARCH_FIELDS[typeId]
    const scored = searchCollectionWithScores(data, trimmed, fields, { useTagAliases: true })

    // Filter to only actual matches (score > 0 means matched)
    // Also exclude NSFW content unless the user has verified their age
    const matched = scored.filter(r => {
      if (!r.matched || r.score <= 0) return false
      if (!includeNsfw && isNsfwItem(r.item)) return false
      return true
    })

    if (matched.length === 0) continue

    const typeMeta = RESOURCE_TYPES.find(t => t.id === typeId)

    groups.push({
      ...typeMeta,
      results: matched.slice(0, maxPerGroup).map(r => ({
        id: r.item.id,
        name: r.item.name,
        description: r.item.description,
        score: r.score,
        category: r.item.category,
        tags: r.item.tags || [],
        difficulty: r.item.difficulty,
        item: r.item,
      })),
      totalMatches: matched.length,
    })

    totalCount += matched.length
  }

  // Sort groups by their best result score (most relevant group first)
  groups.sort((a, b) => {
    const aTop = a.results[0]?.score ?? 0
    const bTop = b.results[0]?.score ?? 0
    return bTop - aTop
  })

  return { groups, totalCount, query: trimmed }
}

/**
 * Vue composable wrapper for reactive global search.
 * Debounces search input and provides reactive results.
 *
 * @param {Object} options - Composable options
 * @param {number} options.debounceMs - Debounce delay in ms (default: 200)
 * @param {number} options.maxPerGroup - Max results per group (default: 5)
 * @param {number} options.maxTotal - Max total results (default: 20)
 * @returns {Object} - Reactive search state and helpers
 */
export function useGlobalSearch(options = {}) {
  const { debounceMs = 200, maxPerGroup = 5, maxTotal = 20 } = options

  // Access NSFW preference reactively
  const { preferences } = usePreferences()
  const nsfwEnabled = computed(() => preferences.value.nsfwVerified === true)

  const query = ref('')
  const isSearching = ref(false)
  const results = ref({ groups: [], totalCount: 0, query: '' })

  let debounceTimer = null

  // Watch query changes and debounce the search
  watch(query, (newQuery) => {
    if (debounceTimer) clearTimeout(debounceTimer)

    if (!newQuery || !newQuery.trim()) {
      results.value = { groups: [], totalCount: 0, query: '' }
      isSearching.value = false
      return
    }

    isSearching.value = true

    debounceTimer = setTimeout(() => {
      results.value = globalSearch(newQuery, { maxPerGroup, maxTotal, includeNsfw: nsfwEnabled.value })
      isSearching.value = false
    }, debounceMs)
  })

  // Immediately run search (bypass debounce)
  const searchNow = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    if (!query.value || !query.value.trim()) {
      results.value = { groups: [], totalCount: 0, query: '' }
      isSearching.value = false
      return
    }
    results.value = globalSearch(query.value, { maxPerGroup, maxTotal, includeNsfw: nsfwEnabled.value })
    isSearching.value = false
  }

  const clearSearch = () => {
    query.value = ''
    results.value = { groups: [], totalCount: 0, query: '' }
    isSearching.value = false
  }

  const hasResults = computed(() => results.value.totalCount > 0)
  const hasQuery = computed(() => query.value.trim().length > 0)

  return {
    query,
    results,
    isSearching,
    hasResults,
    hasQuery,
    searchNow,
    clearSearch,
  }
}
