// =============================================================================
// BetterRepository - Fuzzy Search Composable
// =============================================================================
// A comprehensive fuzzy search system with weighted scoring, typo tolerance,
// and intelligent ranking. Designed for use across all resource collections.
// Now integrated with the Smart Tag System for alias-aware searching.
// =============================================================================

import { ref, computed, watch } from 'vue'

// Tag system integration - lazy loaded to avoid circular dependencies
let tagSystemLoaded = false
let tagSystemUtils = {
  getCoreTag: (tag) => tag,
  getTagSearchTerms: (tag) => [tag],
  tagMatchesQuery: (query, tags) => tags.some(t => t.toLowerCase().includes(query.toLowerCase())),
  TAG_SYSTEM: {},
  normalizeTagsToCore: (tags) => tags
}

// Lazy load the tag system to avoid circular imports
const loadTagSystem = async () => {
  if (tagSystemLoaded) return tagSystemUtils
  try {
    const module = await import('@/data/tagSystem')
    tagSystemUtils = {
      getCoreTag: module.getCoreTag,
      getTagSearchTerms: module.getTagSearchTerms,
      tagMatchesQuery: module.tagMatchesQuery,
      TAG_SYSTEM: module.TAG_SYSTEM,
      normalizeTagsToCore: module.normalizeTagsToCore
    }
    tagSystemLoaded = true
  } catch (e) {
    // Tag system not available, use defaults
    console.warn('Tag system not loaded, using basic tag matching')
  }
  return tagSystemUtils
}

// Synchronous access (for when already loaded)
const getTagSystem = () => tagSystemUtils

// Initialize tag system on module load (non-blocking)
loadTagSystem()

// =============================================================================
// FUZZY MATCHING UTILITIES
// =============================================================================

/**
 * Calculate Levenshtein distance between two strings.
 * Lower distance = more similar strings.
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Edit distance between strings
 */
export const levenshteinDistance = (a, b) => {
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  const matrix = []

  // Initialize matrix
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }

  // Fill matrix
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        )
      }
    }
  }

  return matrix[b.length][a.length]
}

/**
 * Calculate similarity ratio between two strings (0-1).
 * 1 = identical, 0 = completely different.
 * @param {string} a - First string
 * @param {string} b - Second string
 * @returns {number} - Similarity score between 0 and 1
 */
export const stringSimilarity = (a, b) => {
  if (!a || !b) return 0
  if (a === b) return 1
  
  const distance = levenshteinDistance(a.toLowerCase(), b.toLowerCase())
  const maxLength = Math.max(a.length, b.length)
  
  return maxLength === 0 ? 1 : (maxLength - distance) / maxLength
}

/**
 * Check if query matches target using multiple strategies.
 * Returns a score based on match quality.
 * @param {string} query - Search query
 * @param {string} target - Target string to search in
 * @param {Object} options - Matching options
 * @returns {Object} - { matched: boolean, score: number, matchType: string }
 */
export const fuzzyMatch = (query, target, options = {}) => {
  const {
    exactBonus = 50,        // Bonus for exact match
    startsWithBonus = 30,   // Bonus for starts-with match
    containsBonus = 20,     // Bonus for contains match
    wordMatchBonus = 25,    // Bonus for matching whole words
    fuzzyThreshold = 0.6,   // Minimum similarity for fuzzy match
    maxFuzzyScore = 15      // Max score for fuzzy matches
  } = options

  if (!query || !target) {
    return { matched: false, score: 0, matchType: 'none' }
  }

  const queryLower = query.toLowerCase().trim()
  const targetLower = target.toLowerCase()

  // Exact match - highest priority
  if (targetLower === queryLower) {
    return { matched: true, score: exactBonus, matchType: 'exact' }
  }

  // Starts with match - high priority
  if (targetLower.startsWith(queryLower)) {
    return { matched: true, score: startsWithBonus, matchType: 'startsWith' }
  }

  // Word boundary match - good priority
  const words = targetLower.split(/\s+/)
  const queryWords = queryLower.split(/\s+/)
  
  let wordMatchCount = 0
  for (const queryWord of queryWords) {
    if (words.some(word => word.startsWith(queryWord) || word === queryWord)) {
      wordMatchCount++
    }
  }
  
  if (wordMatchCount > 0) {
    const wordScore = wordMatchBonus * (wordMatchCount / queryWords.length)
    return { matched: true, score: wordScore, matchType: 'wordMatch' }
  }

  // Contains match - medium priority
  if (targetLower.includes(queryLower)) {
    return { matched: true, score: containsBonus, matchType: 'contains' }
  }

  // Fuzzy match - for typo tolerance
  // Check each word in target against query
  for (const word of words) {
    const similarity = stringSimilarity(queryLower, word)
    if (similarity >= fuzzyThreshold) {
      const fuzzyScore = similarity * maxFuzzyScore
      return { matched: true, score: fuzzyScore, matchType: 'fuzzy' }
    }
  }

  // Check overall similarity for short queries
  if (queryLower.length <= 4) {
    const similarity = stringSimilarity(queryLower, targetLower)
    if (similarity >= fuzzyThreshold) {
      const fuzzyScore = similarity * maxFuzzyScore * 0.5
      return { matched: true, score: fuzzyScore, matchType: 'fuzzy' }
    }
  }

  // Check if query characters appear in order (subsequence match)
  let queryIndex = 0
  for (let i = 0; i < targetLower.length && queryIndex < queryLower.length; i++) {
    if (targetLower[i] === queryLower[queryIndex]) {
      queryIndex++
    }
  }
  
  if (queryIndex === queryLower.length) {
    // All query characters found in order
    const subsequenceScore = 5 * (queryLower.length / targetLower.length)
    return { matched: true, score: subsequenceScore, matchType: 'subsequence' }
  }

  return { matched: false, score: 0, matchType: 'none' }
}

// =============================================================================
// FIELD WEIGHT CONFIGURATION
// =============================================================================

/**
 * Default field weights for scoring.
 * Higher weight = more important field.
 */
export const DEFAULT_FIELD_WEIGHTS = {
  name: 3.0,
  title: 3.0,
  tags: 2.5,
  category: 2.0,
  description: 1.0,
  content: 0.5
}

// =============================================================================
// SEARCH FUNCTIONS
// =============================================================================

/**
 * Search a single item against a query.
 * Now integrates with the Smart Tag System for alias-aware tag searching.
 * @param {Object} item - Item to search
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Object} - { matched: boolean, score: number, item: Object }
 */
export const searchItem = (item, query, options = {}) => {
  const {
    fields = ['name', 'description', 'tags'],
    fieldWeights = DEFAULT_FIELD_WEIGHTS,
    minScore = 0,
    useTagAliases = true
  } = options

  if (!query || !query.trim()) {
    return { matched: true, score: 100, item }
  }

  let totalScore = 0
  let matched = false
  const queryLower = query.toLowerCase().trim()
  const { getCoreTag, getTagSearchTerms, TAG_SYSTEM } = getTagSystem()

  for (const field of fields) {
    const value = item[field]
    const weight = fieldWeights[field] || 1.0

    if (value === undefined || value === null) continue

    if (Array.isArray(value)) {
      // Handle array fields (like tags) with alias support
      if (field === 'tags' && useTagAliases) {
        for (const element of value) {
          if (typeof element === 'string') {
            // Standard fuzzy match against the tag itself
            const result = fuzzyMatch(query, element)
            if (result.matched) {
              matched = true
              totalScore += result.score * weight
            }
            
            // Also check if query matches any of this tag's aliases
            const coreTag = getCoreTag(element)
            const searchTerms = getTagSearchTerms(element)
            
            for (const term of searchTerms) {
              if (term.toLowerCase() !== element.toLowerCase()) {
                const aliasResult = fuzzyMatch(query, term)
                if (aliasResult.matched) {
                  matched = true
                  // Alias matches get a bonus but slightly less than direct matches
                  totalScore += aliasResult.score * weight * 0.8
                  break // Only count one alias match per tag
                }
              }
            }
            
            // Check if query IS a tag alias that maps to this tag's core
            const queryCoreTag = getCoreTag(queryLower)
            if (queryCoreTag === coreTag && TAG_SYSTEM[queryCoreTag]) {
              matched = true
              // Direct core tag match via alias - high bonus
              totalScore += 35 * weight
            }
          }
        }
      } else {
        // Non-tag arrays - standard fuzzy matching
        for (const element of value) {
          if (typeof element === 'string') {
            const result = fuzzyMatch(query, element)
            if (result.matched) {
              matched = true
              totalScore += result.score * weight
            }
          }
        }
      }
    } else if (typeof value === 'string') {
      // Handle string fields
      const result = fuzzyMatch(query, value)
      if (result.matched) {
        matched = true
        totalScore += result.score * weight
      }
    }
  }

  return {
    matched: matched && totalScore >= minScore,
    score: totalScore,
    item
  }
}

/**
 * Search a collection of items with fuzzy matching and ranking.
 * @param {Array} collection - Array of items to search
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array} - Sorted array of matching items with scores
 */
export const searchCollection = (collection, query, options = {}) => {
  const {
    fields = ['name', 'description', 'tags'],
    fieldWeights = DEFAULT_FIELD_WEIGHTS,
    minScore = 0,
    limit = 0,
    sortByScore = true,
    useTagAliases = true
  } = options

  if (!query || !query.trim()) {
    return collection.map(item => ({ item, score: 100, matched: true }))
  }

  const results = []

  for (const item of collection) {
    const result = searchItem(item, query, { fields, fieldWeights, minScore, useTagAliases })
    if (result.matched) {
      results.push(result)
    }
  }

  // Sort by score (highest first)
  if (sortByScore) {
    results.sort((a, b) => b.score - a.score)
  }

  // Apply limit if specified
  if (limit > 0) {
    return results.slice(0, limit)
  }

  return results
}

/**
 * Get just the items from search results (without scores).
 * @param {Array} collection - Array of items to search
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @returns {Array} - Array of matching items
 */
export const searchCollectionSimple = (collection, query, options = {}) => {
  return searchCollection(collection, query, options).map(result => result.item)
}

// =============================================================================
// TAG SEARCH UTILITIES
// =============================================================================

/**
 * Extract all unique tags from a collection.
 * Optionally normalizes tags to their core versions using the Smart Tag System.
 * @param {Array} collection - Collection of items with tags
 * @param {string} tagField - Field name containing tags
 * @param {boolean} normalizeToCore - Whether to normalize tags to core versions
 * @returns {Array} - Array of unique tags
 */
export const extractTags = (collection, tagField = 'tags', normalizeToCore = false) => {
  const tagSet = new Set()
  const { normalizeTagsToCore } = getTagSystem()
  
  for (const item of collection) {
    const tags = item[tagField]
    if (Array.isArray(tags)) {
      if (normalizeToCore) {
        const coreTags = normalizeTagsToCore(tags)
        coreTags.forEach(tag => tagSet.add(tag))
      } else {
        tags.forEach(tag => tagSet.add(tag))
      }
    }
  }
  
  return Array.from(tagSet).sort()
}

/**
 * Search tags with fuzzy matching and alias support.
 * Now checks tag aliases from the Smart Tag System.
 * @param {Array} tags - Array of tags to search
 * @param {string} query - Search query
 * @param {number} limit - Max results to return
 * @param {boolean} includeAliasMatches - Whether to include alias matches
 * @returns {Array} - Matching tags sorted by relevance
 */
export const searchTags = (tags, query, limit = 10, includeAliasMatches = true) => {
  if (!query || !query.trim()) {
    return tags.slice(0, limit)
  }

  const { getCoreTag, getTagSearchTerms, TAG_SYSTEM } = getTagSystem()
  const queryLower = query.toLowerCase().trim()
  
  const results = tags.map(tag => {
    // Standard fuzzy match
    const result = fuzzyMatch(query, tag)
    let score = result.score
    let matched = result.matched
    
    // Check alias matches if enabled
    if (includeAliasMatches && !matched) {
      const searchTerms = getTagSearchTerms(tag)
      
      for (const term of searchTerms) {
        const aliasResult = fuzzyMatch(query, term)
        if (aliasResult.matched) {
          matched = true
          score = Math.max(score, aliasResult.score * 0.9) // Slight penalty for alias match
          break
        }
      }
      
      // Check if query maps to this tag's core
      const queryCoreTag = getCoreTag(queryLower)
      const tagCoreTag = getCoreTag(tag)
      if (queryCoreTag === tagCoreTag && TAG_SYSTEM[queryCoreTag]) {
        matched = true
        score = Math.max(score, 40) // Good score for core tag match via alias
      }
    }
    
    return { tag, score, matched }
  })
    .filter(r => r.matched)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(r => r.tag)

  return results
}

// =============================================================================
// VUE COMPOSABLE
// =============================================================================

/**
 * Vue composable for reactive search functionality.
 * @param {Object} options - Composable options
 * @returns {Object} - Reactive search state and methods
 */
export function useSearch(options = {}) {
  const {
    collection = ref([]),
    fields = ['name', 'description', 'tags'],
    fieldWeights = DEFAULT_FIELD_WEIGHTS,
    debounceMs = 150,
    minQueryLength = 1
  } = options

  // Reactive state
  const query = ref('')
  const isSearching = ref(false)
  const results = ref([])
  const allTags = ref([])

  // Debounce timer
  let debounceTimer = null

  // Computed: filtered results (just items)
  const filteredItems = computed(() => {
    return results.value.map(r => r.item)
  })

  // Computed: has active search
  const hasActiveSearch = computed(() => {
    return query.value.trim().length >= minQueryLength
  })

  // Computed: result count
  const resultCount = computed(() => results.value.length)

  // Computed: suggested tags based on query
  const suggestedTags = computed(() => {
    if (!query.value.trim()) return allTags.value.slice(0, 5)
    return searchTags(allTags.value, query.value, 5)
  })

  // Perform search
  const performSearch = () => {
    const collectionValue = collection.value || collection
    
    if (!query.value.trim() || query.value.length < minQueryLength) {
      results.value = collectionValue.map(item => ({ item, score: 100, matched: true }))
      isSearching.value = false
      return
    }

    isSearching.value = true
    
    results.value = searchCollection(collectionValue, query.value, {
      fields,
      fieldWeights
    })
    
    isSearching.value = false
  }

  // Debounced search
  const debouncedSearch = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(performSearch, debounceMs)
  }

  // Watch for query changes
  watch(query, () => {
    debouncedSearch()
  })

  // Watch for collection changes
  watch(
    () => collection.value || collection,
    (newCollection) => {
      allTags.value = extractTags(newCollection)
      performSearch()
    },
    { immediate: true, deep: true }
  )

  // Clear search
  const clearSearch = () => {
    query.value = ''
    performSearch()
  }

  // Set query programmatically
  const setQuery = (newQuery) => {
    query.value = newQuery
    performSearch()
  }

  return {
    // State
    query,
    results,
    filteredItems,
    isSearching,
    hasActiveSearch,
    resultCount,
    suggestedTags,
    allTags,
    
    // Methods
    performSearch,
    clearSearch,
    setQuery,
    
    // Utilities (exposed for direct use)
    searchCollection: (items, q, opts) => searchCollection(items, q, { fields, fieldWeights, ...opts }),
    searchTags: (tags, q, limit) => searchTags(tags, q, limit),
    fuzzyMatch
  }
}

export default useSearch
