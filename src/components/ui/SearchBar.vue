<template>
  <div class="relative">
    <div class="relative">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bd-text-muted" />
      <input 
        ref="inputRef"
        v-model="localQuery"
        type="text"
        :placeholder="placeholder"
        class="input pl-12 pr-10"
        @input="handleInput"
        @keyup.enter="handleEnter"
        @keydown.down.prevent="navigateSuggestions(1)"
        @keydown.up.prevent="navigateSuggestions(-1)"
        @keydown.escape="hideSuggestionsImmediate"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <!-- Loading indicator -->
      <div 
        v-if="isSearching"
        class="absolute right-10 top-1/2 -translate-y-1/2"
      >
        <div class="w-4 h-4 border-2 border-bd-accent-primary/30 border-t-bd-accent-primary rounded-full animate-spin"></div>
      </div>
      <button 
        v-if="localQuery && !isSearching"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary transition-colors"
      >
        <X class="w-4 h-4" />
      </button>
    </div>

    <!-- Search Info Badge -->
    <Transition name="fade">
      <div 
        v-if="localQuery && showResultCount && resultCount !== null"
        class="absolute -bottom-6 left-0 text-xs text-bd-text-muted"
      >
        <span v-if="resultCount > 0">{{ resultCount }} result{{ resultCount === 1 ? '' : 's' }} found</span>
        <span v-else class="text-bd-warning">No results found</span>
      </div>
    </Transition>

    <!-- Search Suggestions Dropdown -->
    <Transition name="fade">
      <div 
        v-if="showSuggestions && hasSuggestions"
        class="absolute top-full left-0 right-0 mt-2 bg-bd-bg-secondary border border-bd-border-default rounded-xl shadow-lg overflow-hidden" 
        style="z-index: var(--bd-z-dropdown)"
      >
        <!-- Fuzzy Match Suggestions (when typing) -->
        <div v-if="localQuery && filteredSuggestions.length > 0" class="p-2">
          <span class="px-2 py-1 text-xs text-bd-text-muted uppercase tracking-wider flex items-center gap-2">
            <Sparkles class="w-3 h-3" />
            Smart Suggestions
          </span>
          <button 
            v-for="(item, index) in filteredSuggestions" 
            :key="'suggest-' + item.value"
            @mousedown.prevent="selectSuggestion(item.value)"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors"
            :class="selectedIndex === index 
              ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
              : 'text-bd-text-secondary hover:bg-bd-bg-tertiary hover:text-bd-text-primary'"
          >
            <Tag class="w-4 h-4 text-bd-text-muted flex-shrink-0" />
            <span class="flex-1">{{ item.value }}</span>
            <span 
              v-if="item.matchType && item.matchType !== 'exact'"
              class="text-[10px] px-1.5 py-0.5 rounded bg-bd-bg-tertiary text-bd-text-muted"
            >
              {{ getMatchLabel(item.matchType) }}
            </span>
          </button>
        </div>

        <!-- Recent Searches -->
        <div v-if="searchHistory.length > 0 && !localQuery" class="p-2">
          <div class="flex items-center justify-between px-2 py-1">
            <span class="text-xs text-bd-text-muted uppercase tracking-wider flex items-center gap-2">
              <Clock class="w-3 h-3" />
              Recent
            </span>
            <button 
              @click.stop="clearHistory"
              class="text-xs text-bd-text-muted hover:text-bd-accent-primary transition-colors"
            >
              Clear
            </button>
          </div>
          <button 
            v-for="(item, index) in searchHistory" 
            :key="'history-' + item"
            @mousedown.prevent="selectSuggestion(item)"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors"
            :class="selectedIndex === index 
              ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
              : 'text-bd-text-secondary hover:bg-bd-bg-tertiary hover:text-bd-text-primary'"
          >
            <Clock class="w-4 h-4 text-bd-text-muted" />
            {{ item }}
          </button>
        </div>

        <!-- Popular Tags (when no query) -->
        <div v-if="!localQuery && suggestions.length > 0" class="p-2 border-t border-bd-border-subtle">
          <span class="px-2 py-1 text-xs text-bd-text-muted uppercase tracking-wider flex items-center gap-2">
            <TrendingUp class="w-3 h-3" />
            Popular Tags
          </span>
          <div class="flex flex-wrap gap-1.5 px-2 pt-2">
            <button 
              v-for="item in suggestions.slice(0, 8)" 
              :key="'tag-' + item"
              @mousedown.prevent="selectSuggestion(item)"
              class="px-2.5 py-1 rounded-full text-xs bg-bd-bg-tertiary text-bd-text-secondary hover:bg-bd-accent-primary/20 hover:text-bd-accent-light transition-colors"
            >
              {{ item }}
            </button>
          </div>
        </div>

        <!-- Search Tips -->
        <div v-if="!localQuery && !searchHistory.length && suggestions.length === 0" class="p-4 text-center">
          <Search class="w-8 h-8 text-bd-text-muted mx-auto mb-2" />
          <p class="text-sm text-bd-text-muted">Start typing to search...</p>
          <p class="text-xs text-bd-text-muted mt-1">Supports fuzzy matching for typos</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { Search, X, Clock, Tag, Sparkles, TrendingUp } from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'
import { fuzzyMatch, searchTags } from '@/composables/useSearch'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Search...'
  },
  suggestions: {
    type: Array,
    default: () => []
  },
  isSearching: {
    type: Boolean,
    default: false
  },
  resultCount: {
    type: Number,
    default: null
  },
  showResultCount: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const { preferences, addToSearchHistory, clearSearchHistory } = usePreferences()

const inputRef = ref(null)
const localQuery = ref(props.modelValue)
const showSuggestions = ref(false)
const selectedIndex = ref(-1)

// Computed: search history from preferences
const searchHistory = computed(() => preferences.value.searchHistory || [])

// Computed: filter suggestions based on current query using fuzzy search with alias support
const filteredSuggestions = computed(() => {
  if (!localQuery.value.trim() || !props.suggestions.length) return []
  
  // Use searchTags for alias-aware fuzzy matching
  const matchedTags = searchTags(props.suggestions, localQuery.value, 6, true)
  
  // Get match details for each result
  const results = matchedTags.map(tag => {
    const result = fuzzyMatch(localQuery.value, tag)
    return {
      value: tag,
      ...result
    }
  })
  
  return results
})

// Computed: check if there are any suggestions to show
const hasSuggestions = computed(() => {
  if (localQuery.value) {
    return filteredSuggestions.value.length > 0
  }
  return searchHistory.value.length > 0 || props.suggestions.length > 0
})

// Get readable label for match type
const getMatchLabel = (matchType) => {
  const labels = {
    fuzzy: 'fuzzy',
    subsequence: 'partial',
    contains: 'contains',
    wordMatch: 'word',
    startsWith: 'starts with'
  }
  return labels[matchType] || ''
}

// Watch for external modelValue changes
watch(() => props.modelValue, (newVal) => {
  localQuery.value = newVal
})

// Reset selected index when suggestions change
watch(filteredSuggestions, () => {
  selectedIndex.value = -1
})

const handleInput = () => {
  emit('update:modelValue', localQuery.value)
  showSuggestions.value = true
}

const handleEnter = () => {
  // If a suggestion is selected, use it
  if (selectedIndex.value >= 0) {
    const suggestions = localQuery.value ? filteredSuggestions.value : searchHistory.value
    if (suggestions[selectedIndex.value]) {
      const value = localQuery.value 
        ? suggestions[selectedIndex.value].value 
        : suggestions[selectedIndex.value]
      selectSuggestion(value)
      return
    }
  }
  
  // Otherwise emit search with current query
  if (localQuery.value.trim()) {
    addToSearchHistory(localQuery.value.trim())
  }
  emit('search', localQuery.value)
  showSuggestions.value = false
}

const navigateSuggestions = (direction) => {
  const suggestions = localQuery.value ? filteredSuggestions.value : searchHistory.value
  if (!suggestions.length) return
  
  selectedIndex.value += direction
  
  // Wrap around
  if (selectedIndex.value < -1) {
    selectedIndex.value = suggestions.length - 1
  } else if (selectedIndex.value >= suggestions.length) {
    selectedIndex.value = -1
  }
}

const clearSearch = () => {
  localQuery.value = ''
  emit('update:modelValue', '')
  selectedIndex.value = -1
  nextTick(() => inputRef.value?.focus())
}

const selectSuggestion = (suggestion) => {
  localQuery.value = suggestion
  emit('update:modelValue', suggestion)
  addToSearchHistory(suggestion)
  emit('search', suggestion)
  showSuggestions.value = false
  selectedIndex.value = -1
}

const clearHistory = () => {
  clearSearchHistory()
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
    selectedIndex.value = -1
  }, 200)
}

const hideSuggestionsImmediate = () => {
  showSuggestions.value = false
  selectedIndex.value = -1
}

// Expose focus method for parent components
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>
