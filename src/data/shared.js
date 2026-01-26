// =============================================================================
// BetterRepository - Shared Data & Utilities
// =============================================================================
// Common metadata, constants, and helper functions used across all data modules.
// =============================================================================

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
    description: 'Give the AI short guidance about style, tone, and genre. Because it appears near the end, it has the strongest influence. Keep it concise—don\'t overload it.'
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

// Generic search function for any collection
export const searchCollection = (collection, query, fields = ['name', 'description', 'tags']) => {
  const lowerQuery = query.toLowerCase()
  return collection.filter(item => 
    fields.some(field => {
      const value = item[field]
      if (Array.isArray(value)) {
        return value.some(v => v.toLowerCase().includes(lowerQuery))
      }
      return value && value.toLowerCase().includes(lowerQuery)
    })
  )
}

// Filter collection by category
export const filterByCategory = (collection, categoryId) => {
  return collection.filter(item => item.category === categoryId)
}

// Filter collection by tags
export const filterByTags = (collection, tags) => {
  return collection.filter(item => 
    tags.some(tag => item.tags && item.tags.includes(tag))
  )
}
