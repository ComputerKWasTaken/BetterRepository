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
  searchCollectionSmart,
  filterByCategory,
  filterByTags,
  filterByTagsFuzzy,
  filterByTagSmart,
  fuzzyMatch,
  DEFAULT_FIELD_WEIGHTS,
  // Tag system utilities
  tagMatchesQuery,
  getCoreTag,
  getTagConfig,
  getTagColor,
  getTagClasses,
  normalizeTagsToCore,
  getAllCoreTags,
  getTagStats,
  TAG_SYSTEM,
  TAG_ALIAS_MAP
} from './shared.js'

// AI Instructions
export {
  // Core data
  CATEGORIES,
  INSTRUCTIONS,
  COMPONENTS,
  SETS,
  // Legacy helpers (backwards compatible)
  getInstructionsByCategory,
  getCategoryById,
  searchInstructions,
  getEssentialInstructions,
  getHighImpactInstructions,
  getBeginnerInstructions,
  getStarterSet,
  // New component helpers
  getComponentById,
  getComponentsByCategory,
  getEssentialComponents,
  searchComponents,
  getComponentsByDifficulty,
  getComponentsByImpact,
  getComponentsByGroup,
  getComponentsByModel,
  getComponentsByPlacement,
  getConflictingComponents,
  getCompatibleComponents,
  // Set helpers
  getSetById,
  getEssentialSets,
  searchSets,
  getSetsByDifficulty,
  getSetsByModel,
  // Category & group helpers
  getCategoriesWithComponents,
  getAllGroups,
  getGroupsByCategory
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
  STORY_CARD_COMMAND_PRESETS,
  getStoryCardsByCategory,
  getStoryCardTemplatesByCategory,
  searchStoryCards,
  getAllExamples,
  getAllTemplates,
  getAllCommandPresets,
  getCommandPresetsByCategory,
  getGeneralCommandPresets,
  getCommandPresetById,
  searchCommandPresets,
  getEssentialCommandPresets
} from './storyCards.js'

// Contributors
export {
  AI_INSTRUCTIONS_CONTRIBUTORS,
  PLOT_COMPONENTS_CONTRIBUTORS,
  STORY_CARDS_CONTRIBUTORS,
  SCRIPTING_CONTRIBUTORS,
  MAJOR_CONTRIBUTORS,
  ALL_CONTRIBUTORS
} from './contributors.js'

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

// Advanced Settings
export {
  MODEL_PRESETS,
  getPresetById,
  getPresetDisplayName
} from './advancedSettings.js'
