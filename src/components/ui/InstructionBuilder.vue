<template>
  <div class="space-y-6">
    <!-- Builder Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-amber" />
          Build Your Instruction Set
        </h2>
        <p class="text-sm text-bd-text-muted mt-1">
          Select individual instructions to combine into your custom set
        </p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Saved Builds Dropdown -->
        <div class="relative" ref="savedBuildsDropdown">
          <button 
            @click="showSavedBuilds = !showSavedBuilds"
            class="btn btn-secondary text-sm"
          >
            <FolderOpen class="w-4 h-4" />
            Saved Builds
            <span v-if="savedBuilds.length" class="px-1.5 py-0.5 rounded-full bg-bd-accent-primary/20 text-bd-accent-light text-xs">
              {{ savedBuilds.length }}
            </span>
          </button>
          <Transition name="fade">
            <div 
              v-if="showSavedBuilds"
              class="absolute right-0 top-full mt-2 w-72 bg-bd-bg-secondary border border-bd-border-default rounded-xl shadow-lg overflow-hidden"
              style="z-index: var(--bd-z-dropdown)"
            >
              <div class="p-3 border-b border-bd-border-subtle">
                <span class="text-sm font-medium text-bd-text-primary">Your Saved Builds</span>
              </div>
              <div v-if="savedBuilds.length === 0" class="p-4 text-center text-sm text-bd-text-muted">
                No saved builds yet
              </div>
              <div v-else class="max-h-64 overflow-y-auto">
                <div
                  v-for="build in savedBuilds"
                  :key="build.id"
                  @click="handleLoadBuild(build.id)"
                  class="w-full flex items-center justify-between px-4 py-3 hover:bg-bd-bg-tertiary transition-colors text-left cursor-pointer"
                >
                  <div>
                    <div class="text-sm font-medium text-bd-text-primary">{{ build.name }}</div>
                    <div class="text-xs text-bd-text-muted">{{ build.instructions.length }} instructions</div>
                  </div>
                  <button 
                    @click.stop="handleDeleteBuild(build.id)"
                    class="p-1 rounded hover:bg-bd-bg-primary text-bd-text-muted hover:text-bd-error"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>

    <!-- Main Builder Grid -->
    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Left: Available Instructions -->
      <div class="card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-4 h-4 text-bd-blue" />
            Available Instructions
          </h3>
          <span class="text-xs text-bd-text-muted">{{ filteredInstructions.length }} items</span>
        </div>

        <!-- Search & Filter -->
        <div class="space-y-3">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-bd-text-muted" />
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search instructions..."
              class="input pl-10 text-sm"
            />
          </div>
          
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-1.5">
            <button
              @click="selectedCategory = null"
              class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              :class="selectedCategory === null 
                ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
                : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
            >
              All
            </button>
            <button
              v-for="cat in nonSetCategories"
              :key="cat.id"
              @click="selectedCategory = cat.id"
              class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
              :class="selectedCategory === cat.id 
                ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
                : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
            >
              {{ cat.name }}
            </button>
          </div>
        </div>

        <!-- Instructions List -->
        <div class="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          <div 
            v-for="instruction in filteredInstructions" 
            :key="instruction.id"
            class="p-3 rounded-lg border transition-all"
            :class="isInBuild(instruction.id) 
              ? 'bg-bd-accent-primary/10 border-bd-accent-primary/30' 
              : 'bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default'"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <span class="font-medium text-sm text-bd-text-primary truncate">{{ instruction.name }}</span>
                  <span 
                    v-if="instruction.essential"
                    class="px-1.5 py-0.5 rounded text-[10px] bg-bd-amber/20 text-bd-amber"
                  >
                    Essential
                  </span>
                </div>
                <p class="text-xs text-bd-text-muted mt-1 line-clamp-2">{{ instruction.description }}</p>
                
                <!-- Variants -->
                <div v-if="instruction.variants && instruction.variants.length > 0" class="mt-2">
                  <div class="text-[10px] text-bd-text-muted uppercase tracking-wide mb-1">Variants:</div>
                  <div class="flex flex-wrap gap-1">
                    <button
                      v-for="(variant, vIndex) in instruction.variants"
                      :key="vIndex"
                      @click="toggleInstruction(instruction.id, vIndex)"
                      class="px-2 py-0.5 rounded text-xs transition-colors"
                      :class="isInBuild(instruction.id, vIndex)
                        ? 'bg-bd-accent-primary text-white'
                        : 'bg-bd-bg-primary text-bd-text-secondary hover:bg-bd-bg-secondary'"
                    >
                      {{ variant.label }}
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Add/Remove Button (for non-variant instructions) -->
              <button
                v-if="!instruction.variants || instruction.variants.length === 0"
                @click="toggleInstruction(instruction.id)"
                class="p-1.5 rounded-lg transition-colors flex-shrink-0"
                :class="isInBuild(instruction.id)
                  ? 'bg-bd-accent-primary text-white hover:bg-bd-accent-primary/80'
                  : 'bg-bd-bg-primary text-bd-text-muted hover:text-bd-accent-primary hover:bg-bd-accent-primary/10'"
              >
                <Check v-if="isInBuild(instruction.id)" class="w-4 h-4" />
                <Plus v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredInstructions.length === 0" class="text-center py-8">
            <Search class="w-8 h-8 text-bd-text-muted mx-auto mb-2" />
            <p class="text-sm text-bd-text-muted">No instructions found</p>
          </div>
        </div>
      </div>

      <!-- Right: Selected Instructions -->
      <div class="card space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
            <ListOrdered class="w-4 h-4 text-bd-green" />
            Your Build
          </h3>
          <div class="flex items-center gap-2">
            <span class="text-xs text-bd-text-muted">{{ currentBuildInstructions.length }} selected</span>
            <button 
              v-if="currentBuildInstructions.length > 0"
              @click="handleClearBuild"
              class="text-xs text-bd-text-muted hover:text-bd-error transition-colors"
            >
              Clear all
            </button>
          </div>
        </div>

        <!-- Selected Instructions List -->
        <div 
          v-if="currentBuildInstructions.length > 0"
          class="space-y-2 max-h-[300px] overflow-y-auto pr-1"
        >
          <div
            v-for="(item, index) in resolvedBuildInstructions"
            :key="`${item.id}-${item.variantIndex}`"
            class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle group"
          >
            <!-- Drag Handle -->
            <div class="flex flex-col gap-0.5 text-bd-text-muted cursor-grab">
              <button 
                @click="moveInstruction(index, -1)" 
                :disabled="index === 0"
                class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronUp class="w-3 h-3" />
              </button>
              <button 
                @click="moveInstruction(index, 1)" 
                :disabled="index === currentBuildInstructions.length - 1"
                class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronDown class="w-3 h-3" />
              </button>
            </div>
            
            <!-- Instruction Info -->
            <div class="flex-1 min-w-0">
              <span class="text-sm text-bd-text-primary truncate block">
                {{ item.name }}
                <span v-if="item.variantLabel" class="text-bd-text-muted"> ({{ item.variantLabel }})</span>
              </span>
            </div>
            
            <!-- Remove Button -->
            <button
              @click="toggleInstruction(item.id, item.variantIndex)"
              class="p-1 rounded text-bd-text-muted hover:text-bd-error hover:bg-bd-error/10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-12 border-2 border-dashed border-bd-border-subtle rounded-lg">
          <Puzzle class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
          <p class="text-sm text-bd-text-muted">Select instructions from the left panel</p>
          <p class="text-xs text-bd-text-muted mt-1">They'll appear here in order</p>
        </div>

        <!-- Save Build -->
        <div v-if="currentBuildInstructions.length > 0" class="pt-2 border-t border-bd-border-subtle">
          <div class="flex gap-2">
            <input
              v-model="buildName"
              type="text"
              placeholder="Build name..."
              class="input text-sm flex-1"
            />
            <button 
              @click="handleSaveBuild"
              class="btn btn-secondary text-sm"
            >
              <Save class="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Section -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
          <Eye class="w-4 h-4 text-bd-purple" />
          Preview
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-xs text-bd-text-muted">{{ previewCharCount }} characters</span>
          <button
            v-if="previewContent"
            @click="copyToClipboard"
            class="btn btn-primary text-sm"
          >
            <Copy class="w-4 h-4" />
            {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
          </button>
        </div>
      </div>

      <!-- Preview Content -->
      <div 
        v-if="previewContent"
        class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle font-mono text-sm text-bd-text-secondary whitespace-pre-wrap max-h-[400px] overflow-y-auto"
      >{{ previewContent }}</div>

      <!-- Empty Preview -->
      <div v-else class="p-8 text-center border-2 border-dashed border-bd-border-subtle rounded-lg">
        <FileText class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
        <p class="text-sm text-bd-text-muted">Your combined instruction set will appear here</p>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
      <div class="flex items-start gap-3">
        <Lightbulb class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-semibold text-bd-text-primary mb-1">Building Tips</h4>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>• Start with <strong>Anti-Repetition</strong> and <strong>Plot Over Description</strong> - they solve the most common issues</li>
            <li>• Check the <strong>conflicts</strong> field - some instructions contradict each other</li>
            <li>• Order matters! Put your most important rules first and last (AI weighs those positions more)</li>
            <li>• Keep it focused - 10-15 well-chosen lines beats 50 vague ones</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { 
  Wrench, FolderOpen, Layers, Search, Plus, Check, X, ListOrdered,
  ChevronUp, ChevronDown, Save, Eye, Copy, FileText, Lightbulb,
  Trash2, Puzzle
} from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'
import { INSTRUCTIONS, CATEGORIES } from '@/data/aiInstructions'
import { searchCollectionWithScores } from '@/data/shared'

const {
  preferences,
  addToBuild,
  removeFromBuild,
  isInBuild,
  reorderBuild,
  clearBuild,
  saveBuild,
  loadBuild,
  deleteSavedBuild
} = usePreferences()

// State
const searchQuery = ref('')
const selectedCategory = ref(null)
const buildName = ref('')
const showSavedBuilds = ref(false)
const copied = ref(false)
const savedBuildsDropdown = ref(null)

// Filter out complete sets - users should build from individual instructions
const nonSetCategories = computed(() => 
  CATEGORIES.filter(c => c.id !== 'complete-sets')
)

const buildableInstructions = computed(() =>
  INSTRUCTIONS.filter(i => i.category !== 'complete-sets')
)

// Filtered instructions based on search and category
const filteredInstructions = computed(() => {
  let result = buildableInstructions.value

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(i => i.category === selectedCategory.value)
  }

  // Filter by search query using fuzzy search
  if (searchQuery.value.trim()) {
    const searchResults = searchCollectionWithScores(result, searchQuery.value, ['name', 'description', 'tags'])
    result = searchResults.map(r => r.item)
  }

  return result
})

// Current build instructions from preferences
const currentBuildInstructions = computed(() => 
  preferences.value.currentBuild?.instructions || []
)

// Resolved build instructions with full data
const resolvedBuildInstructions = computed(() => {
  return currentBuildInstructions.value.map(item => {
    const instruction = INSTRUCTIONS.find(i => i.id === item.id)
    if (!instruction) return null
    
    return {
      ...item,
      name: instruction.name,
      variantLabel: item.variantIndex !== null && instruction.variants 
        ? instruction.variants[item.variantIndex]?.label 
        : null
    }
  }).filter(Boolean)
})

// Saved builds from preferences
const savedBuilds = computed(() => 
  preferences.value.savedBuilds || []
)

// Generate preview content
const previewContent = computed(() => {
  if (currentBuildInstructions.value.length === 0) return ''

  const lines = currentBuildInstructions.value.map(item => {
    const instruction = INSTRUCTIONS.find(i => i.id === item.id)
    if (!instruction) return null

    if (item.variantIndex !== null && instruction.variants) {
      return instruction.variants[item.variantIndex]?.content
    }
    return instruction.content
  }).filter(Boolean)

  return lines.join('\n')
})

const previewCharCount = computed(() => previewContent.value.length)

// Toggle instruction in build
const toggleInstruction = (id, variantIndex = null) => {
  if (isInBuild(id, variantIndex)) {
    removeFromBuild(id, variantIndex)
  } else {
    addToBuild(id, variantIndex)
  }
}

// Move instruction up or down
const moveInstruction = (index, direction) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < currentBuildInstructions.value.length) {
    reorderBuild(index, newIndex)
  }
}

// Handle save build
const handleSaveBuild = () => {
  if (currentBuildInstructions.value.length === 0) return
  saveBuild(buildName.value)
  buildName.value = ''
}

// Handle load build
const handleLoadBuild = (buildId) => {
  loadBuild(buildId)
  showSavedBuilds.value = false
}

// Handle delete build
const handleDeleteBuild = (buildId) => {
  if (confirm('Delete this saved build?')) {
    deleteSavedBuild(buildId)
  }
}

// Handle clear build
const handleClearBuild = () => {
  if (confirm('Clear all selected instructions?')) {
    clearBuild()
  }
}

// Copy to clipboard
const copyToClipboard = async () => {
  if (!previewContent.value) return
  
  try {
    await navigator.clipboard.writeText(previewContent.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (savedBuildsDropdown.value && !savedBuildsDropdown.value.contains(event.target)) {
    showSavedBuilds.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
