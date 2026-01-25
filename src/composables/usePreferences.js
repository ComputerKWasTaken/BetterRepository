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
  searchHistory: []
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

  return {
    preferences,
    toggleFavorite,
    isFavorite,
    addToRecentlyViewed,
    addToSearchHistory,
    clearSearchHistory,
    setPreference,
    resetPreferences
  }
}
