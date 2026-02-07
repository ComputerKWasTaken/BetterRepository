// =============================================================================
// BetterRepository - Contributors Data
// =============================================================================
// Single source of truth for all contributor accreditation across the site.
// Add new contributors here — every page will automatically reflect changes.
// =============================================================================

// -----------------------------------------------------------------------------
// Contributors by Category
// -----------------------------------------------------------------------------
// Each category lists the people who created content, guides, or resources
// for that specific section of BetterRepository.
// -----------------------------------------------------------------------------

/** Contributors who created AI Instructions, repositories, guides, or other resources */
export const AI_INSTRUCTIONS_CONTRIBUTORS = [
  'OffMetaGamer', 'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'Dragranis',
  'BinKompliziert', 'Wilmar', 'Le Onyx', 'Little Hat', 'SeinSchetten',
  'Zoocata', 'Monsieur Boo', 'CamSift', 'Jason_EcksStreams'
]

/** Contributors who created PEs, SSs, and ANs, or created guides for them */
export const PLOT_COMPONENTS_CONTRIBUTORS = [
  'Wilmar', 'Le Onyx', 'Dragranis', 'Celyne', 'Monsieur Boo'
]

/** Contributors who created the resources and guides to create, write, and use Story Cards */
export const STORY_CARDS_CONTRIBUTORS = [
  'wanderingstar1', 'GremmieGremlin', 'Lavere', 'Le Onyx', 'Shiny'
]

/** Contributors who wrote scripts and other tools, or created guides and resources for scripting */
export const SCRIPTING_CONTRIBUTORS = [
  'LewdLeah', 'Oli', 'Magic', 'BinKompliziert', 'MrJack', 'Burnout'
]

// -----------------------------------------------------------------------------
// Major Contributors
// -----------------------------------------------------------------------------
// Contributors whose work significantly shaped BetterRepository as a whole.
// These are highlighted prominently on the Credits and Home pages.
// -----------------------------------------------------------------------------

export const MAJOR_CONTRIBUTORS = [
  'OffMetaGamer', 'Wilmar', 'Le Onyx', 'LewdLeah', 'Dragranis', 'Monsieur Boo'
]

// -----------------------------------------------------------------------------
// Derived: All Contributors (deduplicated)
// -----------------------------------------------------------------------------
// A flat, deduplicated list of every contributor across all categories.
// Useful for the Contribute page spotlight wall and total contributor count.
// -----------------------------------------------------------------------------

export const ALL_CONTRIBUTORS = [
  ...new Set([
    ...MAJOR_CONTRIBUTORS,
    ...AI_INSTRUCTIONS_CONTRIBUTORS,
    ...PLOT_COMPONENTS_CONTRIBUTORS,
    ...STORY_CARDS_CONTRIBUTORS,
    ...SCRIPTING_CONTRIBUTORS,
  ])
]
