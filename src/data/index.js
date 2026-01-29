// =============================================================================
// BetterRepository - Data Index
// =============================================================================
// Central export file for all data modules.
// Import from here for convenience, or import directly from individual files.
// =============================================================================

// Shared utilities and metadata
export { 
  REPOSITORY_META,
  PLACEMENTS,
  getPlacementById,
  searchCollection,
  searchCollectionWithScores,
  filterByCategory,
  filterByTags,
  filterByTagsFuzzy,
  fuzzyMatch,
  DEFAULT_FIELD_WEIGHTS
} from './shared.js'

// AI Instructions
export {
  CATEGORIES,
  INSTRUCTIONS,
  getInstructionsByCategory,
  getCategoryById,
  searchInstructions
} from './aiInstructions.js'

// Plot Components (Templates)
export {
  TEMPLATE_CATEGORIES,
  TEMPLATES,
  getTemplatesByCategory,
  searchTemplates,
  getAuthorsNoteTemplates,
  getPlotEssentialsTemplates,
  getStorySummaryTemplates
} from './plotComponents.js'

// Story Cards
export {
  STORY_CARD_CATEGORIES,
  STORY_CARDS,
  STORY_CARD_TEMPLATES,
  getStoryCardsByCategory,
  getStoryCardTemplatesByCategory,
  searchStoryCards,
  getAllExamples,
  getAllTemplates
} from './storyCards.js'

// Scripts
export {
  SCRIPT_CATEGORIES,
  SCRIPTS,
  getScriptsByCategory,
  getAllScripts,
  getEssentialScripts,
  searchScripts,
  getCategoryCounts,
  updateCategoryCounts
} from './scripts.js'
