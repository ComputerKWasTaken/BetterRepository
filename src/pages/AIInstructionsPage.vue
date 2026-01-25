<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header class="flex items-start justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center">
            <span class="text-lg">📜</span>
          </div>
          AI Instructions
        </h1>
        <p class="text-bd-text-secondary mt-2">
          Rules and guidelines for AI behavior, writing style, and narrative control.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <button 
          @click="showFilters = !showFilters"
          class="btn btn-secondary"
          :class="{ 'ring-2 ring-bd-accent-primary': hasActiveFilters }"
        >
          <span>⚙</span>
          Filters
          <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-bd-accent-primary"></span>
        </button>
      </div>
    </header>

    <!-- Search Bar -->
    <SearchBar 
      v-model="searchQuery"
      placeholder="Search AI Instructions..."
      :suggestions="searchSuggestions"
      @search="handleSearch"
    />

    <!-- Filter Panel -->
    <Transition name="slide">
      <div v-if="showFilters" class="card-elevated">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-bd-text-primary">Filter by Category</h3>
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-bd-accent-primary hover:underline"
          >
            Clear all
          </button>
        </div>
        <div class="flex flex-wrap gap-2">
          <button 
            v-for="category in categories" 
            :key="category.id"
            @click="toggleCategory(category.id)"
            class="tag cursor-pointer transition-all"
            :class="selectedCategories.includes(category.id) 
              ? 'bg-bd-accent-primary/20 text-bd-accent-light border border-bd-accent-primary/30' 
              : 'hover:bg-white/[0.12]'"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </Transition>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-bd-text-muted">
        Showing {{ filteredInstructions.length }} of {{ instructions.length }} instructions
      </span>
      <div class="flex items-center gap-2">
        <span class="text-bd-text-muted">Sort by:</span>
        <select 
          v-model="sortBy"
          class="bg-bd-bg-elevated border border-white/10 rounded-lg px-3 py-1.5 text-sm text-bd-text-primary outline-none focus:border-bd-accent-primary"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="popular">Popular</option>
        </select>
      </div>
    </div>

    <!-- Category Sections -->
    <div v-if="!searchQuery && selectedCategories.length === 0" class="space-y-8">
      <section v-for="category in categoriesWithInstructions" :key="category.id">
        <div class="flex items-center gap-3 mb-4">
          <div 
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="getCategoryBgClass(category.id)"
          >
            <span :class="getCategoryIconClass(category.id)">{{ getCategoryIconChar(category.id) }}</span>
          </div>
          <div>
            <h2 class="text-lg font-semibold text-bd-text-primary">{{ category.name }}</h2>
            <p class="text-xs text-bd-text-muted">{{ category.description }}</p>
          </div>
          <span class="ml-auto tag">{{ category.instructions.length }}</span>
        </div>
        
        <div class="grid gap-3">
          <ResourceCard 
            v-for="instruction in category.instructions" 
            :key="instruction.id"
            :resource="instruction"
          />
        </div>
      </section>
    </div>

    <!-- Filtered/Search Results -->
    <div v-else class="grid gap-3">
      <ResourceCard 
        v-for="instruction in filteredInstructions" 
        :key="instruction.id"
        :resource="instruction"
      />
      
      <!-- Empty State -->
      <div v-if="filteredInstructions.length === 0" class="text-center py-12">
        <span class="text-4xl text-bd-text-muted block mx-auto mb-4">🔍</span>
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No results found</h3>
        <p class="text-bd-text-secondary">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <button @click="clearAll" class="btn btn-secondary mt-4">
          Clear Search & Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/ui/SearchBar.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { INSTRUCTIONS, CATEGORIES } from '@/data/repository'
import { usePreferences } from '@/composables/usePreferences'

const route = useRoute()
const { addToSearchHistory } = usePreferences()

const instructions = ref(INSTRUCTIONS)
const categories = ref(CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const showFilters = ref(false)
const sortBy = ref('name')

// Icon character mapping
const iconCharMap = {
  'Layers': '📚',
  'PenTool': '✍️',
  'Users': '👥',
  'Link': '🔗',
  'Swords': '⚔️',
  'Globe': '🌍',
  'FileText': '📄',
  'Settings': '⚙️'
}

const categoryColorMap = {
  'complete-sets': { bg: 'bg-bd-amber/20', icon: 'text-bd-amber' },
  'writing-style': { bg: 'bg-bd-blue/20', icon: 'text-bd-blue' },
  'characterization': { bg: 'bg-bd-purple/20', icon: 'text-bd-purple' },
  'coherence': { bg: 'bg-bd-green/20', icon: 'text-bd-green' },
  'gameplay': { bg: 'bg-bd-pink/20', icon: 'text-bd-pink' },
  'world-setting': { bg: 'bg-bd-cyan/20', icon: 'text-bd-cyan' },
  'templates': { bg: 'bg-bd-amber/20', icon: 'text-bd-amber' },
  'formatting': { bg: 'bg-bd-blue/20', icon: 'text-bd-blue' }
}

const getCategoryIconChar = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return iconCharMap[category?.icon] || '📚'
}

const getCategoryBgClass = (categoryId) => {
  return categoryColorMap[categoryId]?.bg || 'bg-white/10'
}

const getCategoryIconClass = (categoryId) => {
  return categoryColorMap[categoryId]?.icon || 'text-bd-text-muted'
}

const filteredInstructions = computed(() => {
  let result = [...instructions.value]
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(i => 
      i.name.toLowerCase().includes(query) ||
      i.description.toLowerCase().includes(query) ||
      i.tags.some(t => t.toLowerCase().includes(query))
    )
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(i => selectedCategories.value.includes(i.category))
  }
  
  // Sort
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'category') {
    result.sort((a, b) => a.category.localeCompare(b.category))
  }
  
  return result
})

const categoriesWithInstructions = computed(() => {
  return categories.value
    .map(cat => ({
      ...cat,
      instructions: instructions.value.filter(i => i.category === cat.id)
    }))
    .filter(cat => cat.instructions.length > 0)
})

const hasActiveFilters = computed(() => selectedCategories.value.length > 0)

const searchSuggestions = computed(() => {
  const allTags = [...new Set(instructions.value.flatMap(i => i.tags))]
  return allTags.slice(0, 5)
})

const toggleCategory = (categoryId) => {
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const clearFilters = () => {
  selectedCategories.value = []
}

const clearAll = () => {
  searchQuery.value = ''
  selectedCategories.value = []
}

const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}

// Handle initial search query from URL
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})
</script>
