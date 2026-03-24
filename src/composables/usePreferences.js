import { ref, watch } from 'vue'
import Cookies from 'js-cookie'

// Cookie configuration
const COOKIE_NAME = 'br_preferences'
const COOKIE_EXPIRES = 365 // days

// Default preferences
const defaultPreferences = {
  theme: 'dark',
  compactMode: false,
  showDescriptions: true,
  favoriteIds: [],
  recentlyViewed: [],
  categoryFilters: {},
  searchHistory: [],
  // NSFW age verification (persists across sessions)
  nsfwVerified: false,
  // Saved instruction builds
  // Format: { id: string, name: string, directiveComponents: [{id, variantIndex?}], instructions: [{id, variantIndex?}], createdAt: timestamp, updatedAt: timestamp }
  savedBuilds: [],
  // Current working build (auto-saved)
  currentBuild: {
    directiveComponents: [], // Array of { id: string, variantIndex?: number } — rendered as prose in ## Directive
    instructions: [] // Array of { id: string, variantIndex?: number } — rendered as dashed lines under category headers
  },
  // Story Card Builder
  // Current working story cards (auto-saved)
  currentStoryCards: [], // Array of { id, title, type, triggers, entry, notes }
  // Saved story card sets
  // Format: { id: string, name: string, cards: [{id, title, type, triggers, entry, notes}], createdAt: timestamp, updatedAt: timestamp }
  savedStoryCardSets: []
}

// Load preferences from cookie
const loadPreferences = () => {
  try {
    const saved = Cookies.get(COOKIE_NAME)
    if (saved) {
      return { ...defaultPreferences, ...JSON.parse(saved) }
    }
  } catch (e) {
    console.warn('Failed to load preferences from cookie:', e)
  }
  return { ...defaultPreferences }
}

// Save preferences to cookie
const savePreferences = (prefs) => {
  try {
    Cookies.set(COOKIE_NAME, JSON.stringify(prefs), { expires: COOKIE_EXPIRES })
  } catch (e) {
    console.warn('Failed to save preferences to cookie:', e)
  }
}

// Reactive preferences state
const preferences = ref(loadPreferences())

// Watch for changes and save to cookie
watch(preferences, (newPrefs) => {
  savePreferences(newPrefs)
}, { deep: true })

// Composable function
export function usePreferences() {
  const toggleFavorite = (id) => {
    const index = preferences.value.favoriteIds.indexOf(id)
    if (index > -1) {
      preferences.value.favoriteIds.splice(index, 1)
    } else {
      preferences.value.favoriteIds.push(id)
    }
  }

  const isFavorite = (id) => {
    return preferences.value.favoriteIds.includes(id)
  }

  const addToRecentlyViewed = (id) => {
    const recent = preferences.value.recentlyViewed.filter(r => r !== id)
    recent.unshift(id)
    preferences.value.recentlyViewed = recent.slice(0, 10) // Keep last 10
  }

  const addToSearchHistory = (query) => {
    if (!query.trim()) return
    const history = preferences.value.searchHistory.filter(h => h !== query)
    history.unshift(query)
    preferences.value.searchHistory = history.slice(0, 5) // Keep last 5
  }

  const clearSearchHistory = () => {
    preferences.value.searchHistory = []
  }

  const setPreference = (key, value) => {
    preferences.value[key] = value
  }

  const resetPreferences = () => {
    preferences.value = { ...defaultPreferences }
  }

  // ===========================================
  // INSTRUCTION BUILDER FUNCTIONS
  // ===========================================

  // Add instruction to current build
  const addToBuild = (instructionId, variantIndex = null) => {
    const existing = preferences.value.currentBuild.instructions.find(
      i => i.id === instructionId && i.variantIndex === variantIndex
    )
    if (!existing) {
      preferences.value.currentBuild.instructions.push({
        id: instructionId,
        variantIndex
      })
    }
  }

  // Remove instruction from current build
  const removeFromBuild = (instructionId, variantIndex = null) => {
    preferences.value.currentBuild.instructions = preferences.value.currentBuild.instructions.filter(
      i => !(i.id === instructionId && i.variantIndex === variantIndex)
    )
  }

  // Check if instruction is in current build
  const isInBuild = (instructionId, variantIndex = null) => {
    return preferences.value.currentBuild.instructions.some(
      i => i.id === instructionId && i.variantIndex === variantIndex
    )
  }

  // Reorder instructions in current build
  const reorderBuild = (fromIndex, toIndex) => {
    const instructions = [...preferences.value.currentBuild.instructions]
    const [moved] = instructions.splice(fromIndex, 1)
    instructions.splice(toIndex, 0, moved)
    preferences.value.currentBuild.instructions = instructions
  }

  // Clear current build
  const clearBuild = () => {
    preferences.value.currentBuild.directiveComponents = []
    preferences.value.currentBuild.instructions = []
  }

  // ===========================================
  // DIRECTIVE COMPONENT FUNCTIONS
  // ===========================================

  // Add directive component to current build
  const addToDirective = (instructionId, variantIndex = null) => {
    if (!preferences.value.currentBuild.directiveComponents) {
      preferences.value.currentBuild.directiveComponents = []
    }
    const existing = preferences.value.currentBuild.directiveComponents.find(
      i => i.id === instructionId && i.variantIndex === variantIndex
    )
    if (!existing) {
      preferences.value.currentBuild.directiveComponents.push({
        id: instructionId,
        variantIndex
      })
    }
  }

  // Remove directive component from current build
  const removeFromDirective = (instructionId, variantIndex = null) => {
    if (!preferences.value.currentBuild.directiveComponents) return
    preferences.value.currentBuild.directiveComponents = preferences.value.currentBuild.directiveComponents.filter(
      i => !(i.id === instructionId && i.variantIndex === variantIndex)
    )
  }

  // Check if directive component is in current build
  const isInDirective = (instructionId, variantIndex = null) => {
    if (!preferences.value.currentBuild.directiveComponents) return false
    return preferences.value.currentBuild.directiveComponents.some(
      i => i.id === instructionId && i.variantIndex === variantIndex
    )
  }

  // Reorder directive components in current build
  const reorderDirective = (fromIndex, toIndex) => {
    const directives = [...(preferences.value.currentBuild.directiveComponents || [])]
    const [moved] = directives.splice(fromIndex, 1)
    directives.splice(toIndex, 0, moved)
    preferences.value.currentBuild.directiveComponents = directives
  }

  // Save current build with a name
  const saveBuild = (name) => {
    const now = Date.now()
    const build = {
      id: `build-${now}`,
      name: name.trim() || `Build ${preferences.value.savedBuilds.length + 1}`,
      directiveComponents: [...(preferences.value.currentBuild.directiveComponents || [])],
      instructions: [...preferences.value.currentBuild.instructions],
      createdAt: now,
      updatedAt: now
    }
    preferences.value.savedBuilds.unshift(build)
    return build.id
  }

  // Load a saved build into current build
  const loadBuild = (buildId) => {
    const build = preferences.value.savedBuilds.find(b => b.id === buildId)
    if (build) {
      preferences.value.currentBuild.directiveComponents = [...(build.directiveComponents || [])]
      preferences.value.currentBuild.instructions = [...build.instructions]
      return true
    }
    return false
  }

  // Update an existing saved build
  const updateSavedBuild = (buildId, updates = {}) => {
    const index = preferences.value.savedBuilds.findIndex(b => b.id === buildId)
    if (index !== -1) {
      preferences.value.savedBuilds[index] = {
        ...preferences.value.savedBuilds[index],
        ...updates,
        updatedAt: Date.now()
      }
      return true
    }
    return false
  }

  // Delete a saved build
  const deleteSavedBuild = (buildId) => {
    preferences.value.savedBuilds = preferences.value.savedBuilds.filter(b => b.id !== buildId)
  }

  // Get saved build by ID
  const getSavedBuild = (buildId) => {
    return preferences.value.savedBuilds.find(b => b.id === buildId)
  }

  // ===========================================
  // STORY CARD BUILDER FUNCTIONS
  // ===========================================

  // Ensure currentStoryCards array exists
  const ensureStoryCards = () => {
    if (!preferences.value.currentStoryCards) {
      preferences.value.currentStoryCards = []
    }
  }

  // Add a new story card to the current working set
  const addStoryCard = (card = {}) => {
    ensureStoryCards()
    const newCard = {
      id: `sc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: card.title || '',
      type: card.type || 'character',
      triggers: card.triggers || '',
      entry: card.entry || '',
      notes: card.notes || ''
    }
    preferences.value.currentStoryCards.push(newCard)
    return newCard.id
  }

  // Update a story card by ID
  const updateStoryCard = (cardId, updates) => {
    ensureStoryCards()
    const index = preferences.value.currentStoryCards.findIndex(c => c.id === cardId)
    if (index !== -1) {
      preferences.value.currentStoryCards[index] = {
        ...preferences.value.currentStoryCards[index],
        ...updates
      }
      return true
    }
    return false
  }

  // Remove a story card by ID
  const removeStoryCard = (cardId) => {
    ensureStoryCards()
    preferences.value.currentStoryCards = preferences.value.currentStoryCards.filter(c => c.id !== cardId)
  }

  // Duplicate a story card
  const duplicateStoryCard = (cardId) => {
    ensureStoryCards()
    const original = preferences.value.currentStoryCards.find(c => c.id === cardId)
    if (original) {
      return addStoryCard({
        title: `${original.title} (Copy)`,
        type: original.type,
        triggers: original.triggers,
        entry: original.entry,
        notes: original.notes
      })
    }
    return null
  }

  // Reorder story cards
  const reorderStoryCards = (fromIndex, toIndex) => {
    ensureStoryCards()
    const cards = [...preferences.value.currentStoryCards]
    const [moved] = cards.splice(fromIndex, 1)
    cards.splice(toIndex, 0, moved)
    preferences.value.currentStoryCards = cards
  }

  // Clear all current story cards
  const clearStoryCards = () => {
    preferences.value.currentStoryCards = []
  }

  // Save current story cards as a named set
  const saveStoryCardSet = (name) => {
    if (!preferences.value.savedStoryCardSets) {
      preferences.value.savedStoryCardSets = []
    }
    ensureStoryCards()
    const now = Date.now()
    const set = {
      id: `scset-${now}`,
      name: name?.trim() || `Card Set ${preferences.value.savedStoryCardSets.length + 1}`,
      cards: JSON.parse(JSON.stringify(preferences.value.currentStoryCards)),
      createdAt: now,
      updatedAt: now
    }
    preferences.value.savedStoryCardSets.unshift(set)
    return set.id
  }

  // Load a saved story card set into current working cards
  const loadStoryCardSet = (setId) => {
    if (!preferences.value.savedStoryCardSets) return false
    const set = preferences.value.savedStoryCardSets.find(s => s.id === setId)
    if (set) {
      preferences.value.currentStoryCards = JSON.parse(JSON.stringify(set.cards))
      return true
    }
    return false
  }

  // Delete a saved story card set
  const deleteStoryCardSet = (setId) => {
    if (!preferences.value.savedStoryCardSets) return
    preferences.value.savedStoryCardSets = preferences.value.savedStoryCardSets.filter(s => s.id !== setId)
  }

  // ===========================================
  // NSFW AGE VERIFICATION FUNCTIONS
  // ===========================================

  // Check if user has verified age for NSFW content
  const isNsfwVerified = () => {
    return preferences.value.nsfwVerified === true
  }

  // Set NSFW verification status
  const setNsfwVerified = (verified) => {
    preferences.value.nsfwVerified = verified
  }

  // Verify age (set to true)
  const verifyAge = () => {
    preferences.value.nsfwVerified = true
  }

  // Reset age verification
  const resetAgeVerification = () => {
    preferences.value.nsfwVerified = false
  }

  return {
    preferences,
    toggleFavorite,
    isFavorite,
    addToRecentlyViewed,
    addToSearchHistory,
    clearSearchHistory,
    setPreference,
    resetPreferences,
    // Builder functions
    addToBuild,
    removeFromBuild,
    isInBuild,
    reorderBuild,
    clearBuild,
    addToDirective,
    removeFromDirective,
    isInDirective,
    reorderDirective,
    saveBuild,
    loadBuild,
    updateSavedBuild,
    deleteSavedBuild,
    getSavedBuild,
    // Story Card Builder functions
    addStoryCard,
    updateStoryCard,
    removeStoryCard,
    duplicateStoryCard,
    reorderStoryCards,
    clearStoryCards,
    saveStoryCardSet,
    loadStoryCardSet,
    deleteStoryCardSet,
    // NSFW verification functions
    isNsfwVerified,
    setNsfwVerified,
    verifyAge,
    resetAgeVerification
  }
}
