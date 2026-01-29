// =============================================================================
// BetterRepository - Shared Data & Utilities
// =============================================================================
// Common metadata, constants, and helper functions used across all data modules.
// Now includes fuzzy search integration for improved search accuracy.
// =============================================================================

import { 
  searchCollectionSimple, 
  searchCollection as fuzzySearchCollection,
  fuzzyMatch,
  DEFAULT_FIELD_WEIGHTS 
} from '@/composables/useSearch'

export const REPOSITORY_META = {
  version: '1.1.0',
  lastUpdated: '2025-01-25',
  description: 'A curated collection of AI Instructions, Plot Components, Story Cards, and Scripts for AI Dungeon.',
  credits: 'Heavily inspired by OffMetaGamer\'s AI Instructions repository. Extended and refined by computerK.'
}

// ============================================
// PLOT COMPONENT PLACEMENTS
// ============================================
// Each instruction/template has a 'placement' field indicating where it works best:
// - 'ai-instructions': Beginning of context. General rules for AI behavior.
// - 'authors-note': End of context. STRONGEST component. Best for immediate style/tone guidance.
// - 'plot-essentials': Key details the AI should always remember (characters, setting).
// - 'story-summary': Plot direction and storyline tracking.
// - 'any': Works well in multiple locations.
export const PLACEMENTS = [
  { 
    id: 'ai-instructions', 
    name: 'AI Instructions', 
    icon: 'ScrollText',
    position: 'Beginning of context',
    strength: 'Moderate',
    description: 'Give the AI a set of rules about how to generate responses. Best for general behavioral guidelines, writing rules, and comprehensive instruction sets.'
  },
  { 
    id: 'authors-note', 
    name: 'Author\'s Note', 
    icon: 'Feather',
    position: 'End of context (near player input)',
    strength: 'Strongest',
    description: 'Give the AI short guidance about style, tone, and genre. Because it appears near the end, it has the strongest influence. Keep it concise, don\'t overload it.'
  },
  { 
    id: 'plot-essentials', 
    name: 'Plot Essentials', 
    icon: 'Bookmark',
    position: 'Beginning of context',
    strength: 'Moderate',
    description: 'Key details the AI should always remember: character info, relationships, setting details, ongoing plot points. Formerly called "Memory".'
  },
  { 
    id: 'story-summary', 
    name: 'Story Summary', 
    icon: 'FileText',
    position: 'Beginning of context',
    strength: 'Moderate',
    description: 'A summary of your story\'s plot to help the AI track the overall direction. Works with Auto Summarization.'
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get placement info by ID
export const getPlacementById = (placementId) => {
  return PLACEMENTS.find(p => p.id === placementId)
}

/**
 * Search a collection using fuzzy matching with weighted scoring.
 * Returns items sorted by relevance score (highest first).
 * 
 * @param {Array} collection - Array of items to search
 * @param {string} query - Search query (supports typos and partial matches)
 * @param {Array} fields - Fields to search in (default: name, description, tags)
 * @param {Object} options - Additional search options
 * @returns {Array} - Matching items sorted by relevance
 */
export const searchCollection = (collection, query, fields = ['name', 'description', 'tags'], options = {}) => {
  if (!query || !query.trim()) {
    return collection
  }
  
  return searchCollectionSimple(collection, query, { fields, ...options })
}

/**
 * Search a collection and return results with scores for advanced use cases.
 * Useful when you need to display match quality or implement custom sorting.
 * 
 * @param {Array} collection - Array of items to search
 * @param {string} query - Search query
 * @param {Array} fields - Fields to search in
 * @param {Object} options - Additional search options
 * @returns {Array} - Array of { item, score, matched } objects
 */
export const searchCollectionWithScores = (collection, query, fields = ['name', 'description', 'tags'], options = {}) => {
  if (!query || !query.trim()) {
    return collection.map(item => ({ item, score: 100, matched: true }))
  }
  
  return fuzzySearchCollection(collection, query, { fields, ...options })
}

// Filter collection by category
export const filterByCategory = (collection, categoryId) => {
  return collection.filter(item => item.category === categoryId)
}

// Filter collection by tags (exact match)
export const filterByTags = (collection, tags) => {
  return collection.filter(item => 
    tags.some(tag => item.tags && item.tags.includes(tag))
  )
}

/**
 * Filter collection by tags using fuzzy matching.
 * More forgiving than exact tag matching - handles typos and partial matches.
 * 
 * @param {Array} collection - Array of items to search
 * @param {string} tagQuery - Tag search query
 * @param {number} minScore - Minimum match score (default: 5, fuzzy matches score ~9-15)
 * @returns {Array} - Matching items
 */
export const filterByTagsFuzzy = (collection, tagQuery, minScore = 5) => {
  if (!tagQuery || !tagQuery.trim()) {
    return collection
  }
  
  return collection.filter(item => {
    if (!item.tags || !Array.isArray(item.tags)) return false
    
    return item.tags.some(tag => {
      const result = fuzzyMatch(tagQuery, tag)
      return result.matched && result.score >= minScore
    })
  })
}

// Re-export fuzzy match for direct use
export { fuzzyMatch, DEFAULT_FIELD_WEIGHTS }
