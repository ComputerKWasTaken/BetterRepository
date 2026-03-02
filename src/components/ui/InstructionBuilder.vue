<template>
  <div class="space-y-8">
    <!-- Builder Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-amber" />
          Build Your Instruction Set
        </h2>
        <p class="text-sm text-bd-text-muted mt-1">
          Select directive components to define the AI's role, then pick instruction components to guide its behavior.
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
                    <div class="text-xs text-bd-text-muted">
                      {{ (build.directiveComponents || []).length }} directive + {{ build.instructions.length }} components
                    </div>
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

    <!-- ==================== DIRECTIVE SECTION (top) ==================== -->
    <div class="space-y-4">
      <!-- Directive Header -->
      <div class="card bg-gradient-to-r from-bd-purple/10 to-bd-blue/10 border-bd-purple/30 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-purple via-bd-accent-primary to-bd-blue" />
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Crown class="w-5 h-5 text-bd-purple" />
          </div>
          <div class="flex-1">
            <h3 class="text-base font-semibold text-bd-text-primary mb-1">Directive</h3>
            <p class="text-sm text-bd-text-secondary">
              The directive defines <strong>who the AI is</strong> and its core rules. Select components below to build your directive.
              These are rendered as flowing prose at the top of your Instruction Set.
            </p>
          </div>
          <div class="flex items-center gap-2">
            <span v-if="currentDirectiveComponents.length > 0" class="px-2 py-0.5 rounded-full text-xs bg-bd-purple/20 text-bd-purple font-medium">
              {{ currentDirectiveComponents.length }} selected
            </span>
            <button
              v-if="currentDirectiveComponents.length > 0"
              @click="handleClearDirective"
              class="text-xs text-bd-text-muted hover:text-bd-error transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <!-- Directive Category Tabs -->
      <div class="flex flex-wrap gap-1.5">
        <button
          @click="selectedDirectiveCategory = null"
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
          :class="selectedDirectiveCategory === null
            ? 'bg-bd-purple/20 text-bd-purple'
            : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
        >
          All
        </button>
        <button
          v-for="cat in directiveCategoryList"
          :key="cat.id"
          @click="selectedDirectiveCategory = cat.id"
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
          :class="selectedDirectiveCategory === cat.id
            ? 'bg-bd-purple/20 text-bd-purple'
            : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
        >
          {{ cat.name }}
        </button>
      </div>

      <!-- Directive Components List -->
      <div class="space-y-2 max-h-[400px] overflow-y-auto pr-1">
        <div
          v-for="comp in filteredDirectiveComponents"
          :key="comp.id"
          class="p-3 rounded-lg border transition-all"
          :class="isAnyVariantInDirective(comp)
            ? 'bg-bd-purple/10 border-bd-purple/30'
            : 'bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default'"
        >
          <div class="flex items-start justify-between gap-2">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <span class="font-medium text-sm text-bd-text-primary truncate">{{ comp.name }}</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] bg-bd-purple/15 text-bd-purple">
                  {{ getDirectiveCategoryName(comp.directiveCategory) }}
                </span>
              </div>
              <p class="text-xs text-bd-text-muted mt-1 line-clamp-2">{{ comp.description }}</p>

              <!-- Variants -->
              <div v-if="comp.variants && comp.variants.length > 0" class="mt-2">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wide mb-1">Variants:</div>
                <div class="flex flex-wrap gap-1">
                  <button
                    v-for="(variant, vIndex) in comp.variants"
                    :key="vIndex"
                    @click="toggleDirective(comp.id, vIndex)"
                    class="px-2 py-0.5 rounded text-xs transition-colors"
                    :class="isInDirective(comp.id, vIndex)
                      ? 'bg-bd-purple text-white'
                      : 'bg-bd-bg-primary text-bd-text-secondary hover:bg-bd-purple/20 hover:text-bd-purple'"
                  >
                    {{ variant.label }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Toggle Button (for non-variant components) -->
            <button
              v-if="!comp.variants || comp.variants.length === 0"
              @click="toggleDirective(comp.id)"
              class="p-1.5 rounded-lg transition-colors flex-shrink-0"
              :class="isInDirective(comp.id)
                ? 'bg-bd-purple text-white hover:bg-bd-purple/80'
                : 'bg-bd-bg-primary text-bd-text-muted hover:text-bd-purple hover:bg-bd-purple/10'"
            >
              <Check v-if="isInDirective(comp.id)" class="w-4 h-4" />
              <Plus v-else class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-if="filteredDirectiveComponents.length === 0" class="text-center py-6">
          <Search class="w-6 h-6 text-bd-text-muted mx-auto mb-2" />
          <p class="text-sm text-bd-text-muted">No directive components found</p>
        </div>
      </div>

      <!-- Selected Directive Components (reorderable) -->
      <div v-if="currentDirectiveComponents.length > 0" class="space-y-2">
        <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
          <ListOrdered class="w-3.5 h-3.5" /> Directive Order
        </h4>
        <div class="space-y-1">
          <div
            v-for="(item, index) in resolvedDirectiveComponents"
            :key="'dir-' + item.id + '-' + item.variantIndex"
            class="flex items-center gap-2 p-2 rounded-lg bg-bd-purple/5 border border-bd-purple/20 group"
          >
            <div class="flex flex-col gap-0.5 text-bd-text-muted">
              <button
                @click="moveDirective(index, -1)"
                :disabled="index === 0"
                class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronUp class="w-3 h-3" />
              </button>
              <button
                @click="moveDirective(index, 1)"
                :disabled="index === currentDirectiveComponents.length - 1"
                class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronDown class="w-3 h-3" />
              </button>
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-sm text-bd-text-primary truncate block">
                {{ item.name }}
                <span v-if="item.variantLabel" class="text-bd-text-muted"> ({{ item.variantLabel }})</span>
              </span>
            </div>
            <button
              @click="toggleDirective(item.id, item.variantIndex)"
              class="p-1 rounded text-bd-text-muted hover:text-bd-error hover:bg-bd-error/10 opacity-0 group-hover:opacity-100 transition-all"
            >
              <X class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Visual Separator -->
    <div class="flex items-center gap-4">
      <div class="flex-1 h-px bg-bd-border-subtle" />
      <span class="text-xs text-bd-text-muted uppercase tracking-wider font-medium">Components</span>
      <div class="flex-1 h-px bg-bd-border-subtle" />
    </div>

    <!-- ==================== COMPONENTS SECTION (bottom) ==================== -->
    <div class="space-y-4">
      <!-- Components Header -->
      <div class="card bg-gradient-to-r from-bd-blue/10 to-bd-green/10 border-bd-blue/30 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-blue via-bd-accent-primary to-bd-green" />
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
            <Layers class="w-5 h-5 text-bd-blue" />
          </div>
          <div class="flex-1">
            <h3 class="text-base font-semibold text-bd-text-primary mb-1">Instruction Components</h3>
            <p class="text-sm text-bd-text-secondary">
              Individual instructions that guide the AI's behavior. These are organized by category in your final output.
              Categories with 3+ components get their own header; smaller groups go under Miscellaneous.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Builder Grid -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Left: Available Components -->
        <div class="card space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <Puzzle class="w-4 h-4 text-bd-blue" />
              Available
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
                placeholder="Search components..."
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
                v-for="cat in componentCategories"
                :key="cat.id"
                @click="handleCategorySelect(cat.id)"
                class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                :class="[
                  selectedCategory === cat.id
                    ? 'bg-bd-accent-primary/20 text-bd-accent-light'
                    : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary',
                  cat.isLocked ? 'text-bd-red' : ''
                ]"
              >
                <Lock v-if="cat.isLocked" class="w-3 h-3" />
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
              :class="isAnyVariantInBuild(instruction)
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
              <p class="text-sm text-bd-text-muted">No components found</p>
            </div>
          </div>
        </div>

        <!-- Right: Selected Components -->
        <div class="card space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <ListOrdered class="w-4 h-4 text-bd-green" />
              Selected Components
            </h3>
            <div class="flex items-center gap-2">
              <span class="text-xs text-bd-text-muted">{{ currentBuildInstructions.length }} components</span>
              <button
                v-if="currentBuildInstructions.length > 0"
                @click="handleClearComponents"
                class="text-xs text-bd-text-muted hover:text-bd-error transition-colors"
              >
                Clear
              </button>
            </div>
          </div>

          <!-- Selected Components List -->
          <div
            v-if="currentBuildInstructions.length > 0"
            class="space-y-2 max-h-[400px] overflow-y-auto pr-1"
          >
            <div
              v-for="(item, index) in resolvedBuildInstructions"
              :key="'build-' + item.id + '-' + item.variantIndex"
              class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle group"
            >
              <!-- Reorder Buttons -->
              <div class="flex flex-col gap-0.5 text-bd-text-muted">
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
                <span class="text-[10px] text-bd-text-muted">{{ item.categoryName }}</span>
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
            <p class="text-sm text-bd-text-muted">Select components from the left panel</p>
            <p class="text-xs text-bd-text-muted mt-1">They'll appear here in order</p>
          </div>

          <!-- Save Build -->
          <div v-if="hasAnythingToBuild" class="pt-2 border-t border-bd-border-subtle">
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
    </div>

    <!-- ==================== OUTPUT PREVIEW ==================== -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
          <Eye class="w-4 h-4 text-bd-purple" />
          Output
        </h3>
        <div class="flex items-center gap-2">
          <span class="text-xs text-bd-text-muted">{{ previewCharCount }} characters</span>
          <button
            v-if="previewContent"
            @click="copyToClipboard"
            class="btn btn-primary text-sm"
          >
            <component :is="copied ? Check : Copy" class="w-4 h-4" />
            {{ copied ? 'Copied!' : 'Copy to Clipboard' }}
          </button>
        </div>
      </div>

      <!-- Preview Content -->
      <div
        v-if="previewContent"
        class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle font-mono text-sm text-bd-text-secondary whitespace-pre-wrap max-h-[400px] overflow-y-auto leading-relaxed"
      >{{ previewContent }}</div>

      <!-- Empty Preview -->
      <div v-else class="p-8 text-center border-2 border-dashed border-bd-border-subtle rounded-lg">
        <FileText class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
        <p class="text-sm text-bd-text-muted">Your Instruction Set will appear here</p>
        <p class="text-xs text-bd-text-muted mt-1">Select directive components and/or instruction components to get started</p>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
      <div class="flex items-start gap-3">
        <Lightbulb class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-semibold text-bd-text-primary mb-1">Building Tips</h4>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>&#8226; Start with <strong>directive components</strong> to define the AI's role, perspective, and core rules</li>
            <li>&#8226; Then add <strong>instruction components</strong> to fine-tune writing style, dialogue, and behavior</li>
            <li>&#8226; Directive components are rendered as <strong>flowing prose</strong> under the ## Directive header</li>
            <li>&#8226; Instruction components are <strong>automatically organized</strong> by category (3+ per category gets its own header)</li>
            <li>&#8226; Check the <strong>conflicts</strong> field &#8212; some components contradict each other</li>
            <li>&#8226; Keep it focused &#8212; 10-15 well-chosen components beats 50 vague ones</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Wrench, FolderOpen, Layers, Search, Plus, Check, X, ListOrdered,
  ChevronUp, ChevronDown, Save, Eye, Copy, FileText, Lightbulb,
  Trash2, Puzzle, Lock, Crown
} from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'
import {
  COMPONENTS, CATEGORIES, DIRECTIVE_CATEGORIES,
  getCategoryById
} from '@/data/aiInstructions'
import { searchCollectionWithScores } from '@/data/shared'

// Props for age verification
const props = defineProps({
  nsfwVerified: {
    type: Boolean,
    default: false
  }
})

// Emits for age verification
const emit = defineEmits(['request-age-verification'])

const {
  preferences,
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
  deleteSavedBuild
} = usePreferences()

// State
const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedDirectiveCategory = ref(null)
const buildName = ref('')
const showSavedBuilds = ref(false)
const copied = ref(false)
const savedBuildsDropdown = ref(null)

// Directive category list
const directiveCategoryList = computed(() => DIRECTIVE_CATEGORIES)

// All directive components
const directiveComponents = computed(() =>
  COMPONENTS.filter(c => c.isDirective)
)

// Filtered directive components based on selected category
const filteredDirectiveComponents = computed(() => {
  if (selectedDirectiveCategory.value) {
    return directiveComponents.value.filter(c => c.directiveCategory === selectedDirectiveCategory.value)
  }
  return directiveComponents.value
})

// Get directive category name by id
const getDirectiveCategoryName = (id) => {
  const cat = DIRECTIVE_CATEGORIES.find(c => c.id === id)
  return cat ? cat.name : id
}

// Check if any variant of a directive component is selected
const isAnyVariantInDirective = (comp) => {
  if (isInDirective(comp.id)) return true
  if (comp.variants) {
    for (let i = 0; i < comp.variants.length; i++) {
      if (isInDirective(comp.id, i)) return true
    }
  }
  return false
}

// Check if any variant of a build component is selected
const isAnyVariantInBuild = (comp) => {
  if (isInBuild(comp.id)) return true
  if (comp.variants) {
    for (let i = 0; i < comp.variants.length; i++) {
      if (isInBuild(comp.id, i)) return true
    }
  }
  return false
}

// Non-directive component categories (exclude role-persona since those are directive, and complete-sets)
const componentCategories = computed(() =>
  CATEGORIES.filter(c => c.id !== 'complete-sets' && c.id !== 'role-persona').map(c => ({
    ...c,
    isLocked: c.id === 'nsfw' && !props.nsfwVerified
  }))
)

// Non-directive buildable instructions
const buildableInstructions = computed(() =>
  COMPONENTS.filter(i => i.category !== 'complete-sets' && !i.isDirective)
)

// Handle category selection with NSFW verification
const handleCategorySelect = (categoryId) => {
  if (categoryId === 'nsfw' && !props.nsfwVerified) {
    emit('request-age-verification', () => {
      selectedCategory.value = 'nsfw'
    })
    return
  }
  selectedCategory.value = categoryId
}

// Filtered instructions based on search and category
const filteredInstructions = computed(() => {
  let result = buildableInstructions.value

  // Filter by category
  if (selectedCategory.value) {
    result = result.filter(i => i.category === selectedCategory.value)
  }

  // Filter out NSFW unless verified or explicitly viewing NSFW category
  if (!props.nsfwVerified && selectedCategory.value !== 'nsfw') {
    result = result.filter(i => i.category !== 'nsfw')
  }

  // Filter by search query using fuzzy search
  if (searchQuery.value.trim()) {
    const searchResults = searchCollectionWithScores(result, searchQuery.value, ['name', 'description', 'tags'])
    result = searchResults.map(r => r.item)
  }

  return result
})

// Current directive components from preferences
const currentDirectiveComponents = computed(() =>
  preferences.value.currentBuild?.directiveComponents || []
)

// Resolved directive components with full data
const resolvedDirectiveComponents = computed(() => {
  return currentDirectiveComponents.value.map(item => {
    const comp = COMPONENTS.find(c => c.id === item.id)
    if (!comp) return null
    return {
      ...item,
      name: comp.name,
      variantLabel: item.variantIndex !== null && comp.variants
        ? comp.variants[item.variantIndex]?.label
        : null
    }
  }).filter(Boolean)
})

// Current build instructions from preferences
const currentBuildInstructions = computed(() =>
  preferences.value.currentBuild?.instructions || []
)

// Resolved build instructions with full data
const resolvedBuildInstructions = computed(() => {
  return currentBuildInstructions.value.map(item => {
    const instruction = COMPONENTS.find(i => i.id === item.id)
    if (!instruction) return null

    const cat = getCategoryById(instruction.category)

    return {
      ...item,
      name: instruction.name,
      category: instruction.category,
      categoryName: cat ? cat.name : instruction.category,
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

// Whether there's anything to build
const hasAnythingToBuild = computed(() =>
  currentDirectiveComponents.value.length > 0 || currentBuildInstructions.value.length > 0
)

// Helper: strip leading "- " from content to produce prose
const toProse = (content) => {
  if (!content) return ''
  let text = content.trim()
  if (text.startsWith('- ')) {
    text = text.substring(2)
  }
  // Ensure it ends with a period or appropriate punctuation
  if (text && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
    text += '.'
  }
  return text
}

// Generate category-organized preview content
const previewContent = computed(() => {
  const sections = []

  // Part 1: Directive (rendered as prose)
  if (currentDirectiveComponents.value.length > 0) {
    const proseParts = currentDirectiveComponents.value.map(item => {
      const comp = COMPONENTS.find(c => c.id === item.id)
      if (!comp) return null

      let content
      if (item.variantIndex !== null && comp.variants) {
        content = comp.variants[item.variantIndex]?.content
      } else {
        content = comp.content
      }

      return toProse(content)
    }).filter(Boolean)

    if (proseParts.length > 0) {
      sections.push('## Directive\n' + proseParts.join(' '))
    }
  }

  // Part 2: Components organized by category
  if (currentBuildInstructions.value.length > 0) {
    // Resolve all component content with category info
    const resolvedComponents = currentBuildInstructions.value.map(item => {
      const instruction = COMPONENTS.find(i => i.id === item.id)
      if (!instruction) return null

      let content
      if (item.variantIndex !== null && instruction.variants) {
        content = instruction.variants[item.variantIndex]?.content
      } else {
        content = instruction.content
      }

      const cat = getCategoryById(instruction.category)
      return {
        content,
        category: instruction.category,
        categoryName: cat ? cat.name : instruction.category
      }
    }).filter(Boolean)

    // Group by category
    const categoryGroups = {}
    for (const comp of resolvedComponents) {
      if (!categoryGroups[comp.category]) {
        categoryGroups[comp.category] = {
          name: comp.categoryName,
          items: []
        }
      }
      categoryGroups[comp.category].items.push(comp.content)
    }

    // Separate into "headed" (3+ items) and "miscellaneous" (2 or fewer)
    const headedSections = []
    const miscItems = []

    for (const [, group] of Object.entries(categoryGroups)) {
      if (group.items.length >= 3) {
        headedSections.push({
          name: group.name,
          items: group.items
        })
      } else {
        miscItems.push(...group.items)
      }
    }

    // Add headed sections
    for (const section of headedSections) {
      sections.push('## ' + section.name + '\n' + section.items.join('\n'))
    }

    // Add miscellaneous section if any
    if (miscItems.length > 0) {
      sections.push('## Miscellaneous\n' + miscItems.join('\n'))
    }
  }

  return sections.join('\n\n')
})

const previewCharCount = computed(() => previewContent.value.length)

// Toggle directive component
const toggleDirective = (id, variantIndex = null) => {
  if (isInDirective(id, variantIndex)) {
    removeFromDirective(id, variantIndex)
  } else {
    // If toggling a variant, remove any other variant of same component first
    if (variantIndex !== null) {
      const comp = COMPONENTS.find(c => c.id === id)
      if (comp && comp.variants) {
        for (let i = 0; i < comp.variants.length; i++) {
          if (i !== variantIndex && isInDirective(id, i)) {
            removeFromDirective(id, i)
          }
        }
      }
    }
    // Also remove the no-variant version if exists
    if (variantIndex !== null && isInDirective(id, null)) {
      removeFromDirective(id, null)
    }
    addToDirective(id, variantIndex)
  }
}

// Toggle instruction in build
const toggleInstruction = (id, variantIndex = null) => {
  if (isInBuild(id, variantIndex)) {
    removeFromBuild(id, variantIndex)
  } else {
    // If toggling a variant, remove any other variant of same component first
    if (variantIndex !== null) {
      const comp = COMPONENTS.find(c => c.id === id)
      if (comp && comp.variants) {
        for (let i = 0; i < comp.variants.length; i++) {
          if (i !== variantIndex && isInBuild(id, i)) {
            removeFromBuild(id, i)
          }
        }
      }
    }
    if (variantIndex !== null && isInBuild(id, null)) {
      removeFromBuild(id, null)
    }
    addToBuild(id, variantIndex)
  }
}

// Move directive component up or down
const moveDirective = (index, direction) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < currentDirectiveComponents.value.length) {
    reorderDirective(index, newIndex)
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
  if (!hasAnythingToBuild.value) return
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

// Handle clear directive
const handleClearDirective = () => {
  if (confirm('Clear all directive components?')) {
    preferences.value.currentBuild.directiveComponents = []
  }
}

// Handle clear components only (not directive)
const handleClearComponents = () => {
  if (confirm('Clear all selected components?')) {
    preferences.value.currentBuild.instructions = []
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

// Default preselected components (only if build is empty)
const initializeDefaults = () => {
  const build = preferences.value.currentBuild
  const hasDirective = build.directiveComponents && build.directiveComponents.length > 0
  const hasComponents = build.instructions && build.instructions.length > 0

  if (!hasDirective && !hasComponents) {
    // Default directive: Varying Novel (With Rules), POV Second Person Present
    addToDirective('role-unified', 1) // Varying Novel (With Rules) variant
    addToDirective('pov-tense', 0) // Second Person Present variant

    // Default instruction components
    addToBuild('anti-repetition', 0) // Comprehensive variant
    addToBuild('show-dont-tell', 0) // Standard variant
    addToBuild('genuine-interaction', 0) // Standard variant
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  initializeDefaults()
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
