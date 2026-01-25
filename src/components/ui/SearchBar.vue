<template>
  <div class="relative">
    <div class="relative">
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-bd-text-muted">🔍</span>
      <input 
        v-model="localQuery"
        type="text"
        :placeholder="placeholder"
        class="input pl-12 pr-10"
        @input="handleInput"
        @keyup.enter="$emit('search', localQuery)"
        @focus="showSuggestions = true"
        @blur="hideSuggestions"
      />
      <button 
        v-if="localQuery"
        @click="clearSearch"
        class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/[0.06] text-bd-text-muted hover:text-bd-text-primary transition-colors"
      >
        <span class="text-sm">✕</span>
      </button>
    </div>

    <!-- Search Suggestions -->
    <Transition name="fade">
      <div 
        v-if="showSuggestions && (searchHistory.length > 0 || suggestions.length > 0)"
        class="absolute top-full left-0 right-0 mt-2 bg-bd-bg-secondary border border-white/10 rounded-xl shadow-lg z-50 overflow-hidden"
      >
        <!-- Recent Searches -->
        <div v-if="searchHistory.length > 0" class="p-2">
          <div class="flex items-center justify-between px-2 py-1">
            <span class="text-xs text-bd-text-muted uppercase tracking-wider">Recent</span>
            <button 
              @click.stop="clearHistory"
              class="text-xs text-bd-text-muted hover:text-bd-accent-primary"
            >
              Clear
            </button>
          </div>
          <button 
            v-for="item in searchHistory" 
            :key="item"
            @mousedown.prevent="selectSuggestion(item)"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-bd-text-secondary hover:bg-white/[0.06] hover:text-bd-text-primary"
          >
            <span class="text-sm text-bd-text-muted">🕐</span>
            {{ item }}
          </button>
        </div>

        <!-- Suggestions -->
        <div v-if="suggestions.length > 0" class="p-2 border-t border-white/[0.06]">
          <span class="px-2 py-1 text-xs text-bd-text-muted uppercase tracking-wider">Suggestions</span>
          <button 
            v-for="item in suggestions" 
            :key="item"
            @mousedown.prevent="selectSuggestion(item)"
            class="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm text-bd-text-secondary hover:bg-white/[0.06] hover:text-bd-text-primary"
          >
            <span class="text-sm text-bd-text-muted">🔍</span>
            {{ item }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePreferences } from '@/composables/usePreferences'

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
  }
})

const emit = defineEmits(['update:modelValue', 'search'])

const { preferences, addToSearchHistory, clearSearchHistory } = usePreferences()

const localQuery = ref(props.modelValue)
const showSuggestions = ref(false)

const searchHistory = computed(() => preferences.value.searchHistory)

watch(() => props.modelValue, (newVal) => {
  localQuery.value = newVal
})

const handleInput = () => {
  emit('update:modelValue', localQuery.value)
}

const clearSearch = () => {
  localQuery.value = ''
  emit('update:modelValue', '')
}

const selectSuggestion = (suggestion) => {
  localQuery.value = suggestion
  emit('update:modelValue', suggestion)
  emit('search', suggestion)
  showSuggestions.value = false
}

const clearHistory = () => {
  clearSearchHistory()
}

const hideSuggestions = () => {
  setTimeout(() => {
    showSuggestions.value = false
  }, 200)
}
</script>
