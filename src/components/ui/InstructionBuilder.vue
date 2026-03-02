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
          Define your AI's directive, then select components to build a custom Instruction Set.
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
                      {{ build.instructions.length }} components
                      <span v-if="build.directiveText"> + directive</span>
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

    <!-- Step Indicators -->
    <div class="flex items-center gap-4">
      <button
        @click="builderStep = 'directive'"
        class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border"
        :class="builderStep === 'directive'
          ? 'bg-bd-purple/20 text-bd-purple border-bd-purple/40'
          : 'bg-bd-bg-tertiary text-bd-text-muted border-bd-border-subtle hover:text-bd-text-secondary hover:border-bd-border-default'"
      >
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          :class="builderStep === 'directive' ? 'bg-bd-purple/30 text-bd-purple' : 'bg-bd-bg-primary text-bd-text-muted'"
        >1</span>
        <Crown class="w-4 h-4" />
        Directive
        <span v-if="directiveText.trim()" class="w-2 h-2 rounded-full bg-bd-green flex-shrink-0" />
      </button>
      <div class="w-8 h-px bg-bd-border-subtle" />
      <button
        @click="builderStep = 'components'"
        class="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all border"
        :class="builderStep === 'components'
          ? 'bg-bd-blue/20 text-bd-blue border-bd-blue/40'
          : 'bg-bd-bg-tertiary text-bd-text-muted border-bd-border-subtle hover:text-bd-text-secondary hover:border-bd-border-default'"
      >
        <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
          :class="builderStep === 'components' ? 'bg-bd-blue/30 text-bd-blue' : 'bg-bd-bg-primary text-bd-text-muted'"
        >2</span>
        <Layers class="w-4 h-4" />
        Components
        <span v-if="currentBuildInstructions.length > 0" class="px-1.5 py-0.5 rounded-full text-[10px] bg-bd-blue/20 text-bd-blue">
          {{ currentBuildInstructions.length }}
        </span>
      </button>
    </div>

    <!-- ==================== STEP 1: DIRECTIVE ==================== -->
    <template v-if="builderStep === 'directive'">
      <div class="space-y-6 animate-fade-in">
        <!-- Directive Introduction -->
        <div class="card bg-gradient-to-r from-bd-purple/10 to-bd-blue/10 border-bd-purple/30 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-purple via-bd-accent-primary to-bd-blue" />
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
              <Crown class="w-5 h-5 text-bd-purple" />
            </div>
            <div class="flex-1">
              <h3 class="text-base font-semibold text-bd-text-primary mb-1">Define Your AI's Directive</h3>
              <p class="text-sm text-bd-text-secondary">
                The directive defines <strong>who the AI is</strong> and its core rules. Start from a template or build your own
                by selecting directive components. You can also manually edit the text below.
              </p>
            </div>
          </div>
        </div>

        <!-- Template Selector -->
        <div class="card space-y-4">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <FileText class="w-3.5 h-3.5" /> Start from a Template
          </h4>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <button
              v-for="template in directiveTemplates"
              :key="template.id"
              @click="applyTemplate(template)"
              class="p-3 rounded-lg border text-left transition-all hover:border-bd-accent-primary/40 hover:bg-bd-accent-primary/5"
              :class="selectedTemplate === template.id
                ? 'bg-bd-accent-primary/10 border-bd-accent-primary/40'
                : 'bg-bd-bg-tertiary border-bd-border-subtle'"
            >
              <div class="font-medium text-sm text-bd-text-primary mb-1">{{ template.name }}</div>
              <p class="text-xs text-bd-text-muted line-clamp-2">{{ template.description }}</p>
            </button>
          </div>
        </div>

        <!-- Directive Component Picker -->
        <div class="card space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Puzzle class="w-3.5 h-3.5" /> Add Directive Components
            </h4>
            <span class="text-xs text-bd-text-muted">{{ directiveComponents.length }} available</span>
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
          <div class="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            <div
              v-for="comp in filteredDirectiveComponents"
              :key="comp.id"
              class="p-3 rounded-lg border transition-all bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default"
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
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wide mb-1">Click a variant to insert:</div>
                    <div class="flex flex-wrap gap-1">
                      <button
                        v-for="(variant, vIndex) in comp.variants"
                        :key="vIndex"
                        @click="insertDirectiveComponent(comp, vIndex)"
                        class="px-2 py-0.5 rounded text-xs transition-colors bg-bd-bg-primary text-bd-text-secondary hover:bg-bd-purple/20 hover:text-bd-purple"
                      >
                        {{ variant.label }}
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Insert Button (for non-variant instructions) -->
                <button
                  v-if="!comp.variants || comp.variants.length === 0"
                  @click="insertDirectiveComponent(comp)"
                  class="p-1.5 rounded-lg transition-colors flex-shrink-0 bg-bd-bg-primary text-bd-text-muted hover:text-bd-purple hover:bg-bd-purple/10"
                  title="Insert into directive"
                >
                  <Plus class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div v-if="filteredDirectiveComponents.length === 0" class="text-center py-6">
              <Search class="w-6 h-6 text-bd-text-muted mx-auto mb-2" />
              <p class="text-sm text-bd-text-muted">No directive components found</p>
            </div>
          </div>
        </div>

        <!-- Manual Directive Editor -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <PenTool class="w-3.5 h-3.5" /> Directive Text
            </h4>
            <div class="flex items-center gap-2">
              <span class="text-xs text-bd-text-muted">{{ directiveText.length }} chars</span>
              <button
                v-if="directiveText.trim()"
                @click="directiveText = ''"
                class="text-xs text-bd-text-muted hover:text-bd-error transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
          <textarea
            v-model="directiveText"
            placeholder="Write or customize your AI's directive here..."
            class="input font-mono text-sm leading-relaxed min-h-[200px] resize-y"
            spellcheck="false"
          />
          <p class="text-xs text-bd-text-muted">
            This is free-form text. Use templates and directive components above to populate it, or write your own.
            The directive appears at the top of your final Instruction Set.
          </p>
        </div>

        <!-- Continue to Components Button -->
        <div class="flex justify-end">
          <button
            @click="builderStep = 'components'"
            class="btn btn-primary text-sm"
          >
            Continue to Components
            <ChevronDown class="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>
    </template>

    <!-- ==================== STEP 2: COMPONENTS ==================== -->
    <template v-if="builderStep === 'components'">
      <div class="space-y-6 animate-fade-in">

        <!-- Main Builder Grid -->
        <div class="grid lg:grid-cols-2 gap-6">
          <!-- Left: Available Components -->
          <div class="card space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                Available Components
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
                <p class="text-sm text-bd-text-muted">No components found</p>
              </div>
            </div>
          </div>

          <!-- Right: Selected Components -->
          <div class="card space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <ListOrdered class="w-4 h-4 text-bd-green" />
                Your Build
              </h3>
              <div class="flex items-center gap-2">
                <span class="text-xs text-bd-text-muted">{{ currentBuildInstructions.length }} components</span>
                <button
                  v-if="currentBuildInstructions.length > 0"
                  @click="handleClearComponents"
                  class="text-xs text-bd-text-muted hover:text-bd-error transition-colors"
                >
                  Clear components
                </button>
              </div>
            </div>

            <!-- Directive Summary (if set) -->
            <div v-if="directiveText.trim()" class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-semibold text-bd-purple uppercase tracking-wider flex items-center gap-1">
                  <Crown class="w-3 h-3" /> Directive Set
                </span>
                <button @click="builderStep = 'directive'" class="text-xs text-bd-purple hover:underline">Edit</button>
              </div>
              <p class="text-xs text-bd-text-muted line-clamp-2 font-mono">{{ directiveFirstLine }}</p>
            </div>

            <!-- Selected Components List -->
            <div
              v-if="currentBuildInstructions.length > 0"
              class="space-y-2 max-h-[300px] overflow-y-auto pr-1"
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
    </template>

    <!-- ==================== PREVIEW SECTION (always visible) ==================== -->
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
            <component :is="copied ? Check : Copy" class="w-4 h-4" />
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
        <p class="text-sm text-bd-text-muted">Your combined Instruction Set will appear here</p>
        <p class="text-xs text-bd-text-muted mt-1">Define a directive and/or select components to get started</p>
      </div>
    </div>

    <!-- Tips Section -->
    <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
      <div class="flex items-start gap-3">
        <Lightbulb class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
        <div>
          <h4 class="font-semibold text-bd-text-primary mb-1">Building Tips</h4>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>&#8226; Start with a <strong>directive</strong> that defines the AI's role and core behavior</li>
            <li>&#8226; Then add <strong>components</strong> to fine-tune specific aspects of writing</li>
            <li>&#8226; Components are <strong>automatically organized</strong> by category in the output (3+ per category gets its own header)</li>
            <li>&#8226; Check the <strong>conflicts</strong> field &#8212; some components contradict each other</li>
            <li>&#8226; Keep it focused &#8212; 10-15 well-chosen components beats 50 vague ones</li>
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
  Trash2, Puzzle, Lock, Crown, PenTool
} from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'
import {
  COMPONENTS, CATEGORIES, DIRECTIVE_CATEGORIES, DIRECTIVE_TEMPLATES,
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
  setDirectiveText: saveDirectiveText,
  getDirectiveText,
  saveBuild,
  loadBuild,
  deleteSavedBuild
} = usePreferences()

// State
const builderStep = ref('directive')
const searchQuery = ref('')
const selectedCategory = ref(null)
const selectedDirectiveCategory = ref(null)
const selectedTemplate = ref(null)
const buildName = ref('')
const showSavedBuilds = ref(false)
const copied = ref(false)
const savedBuildsDropdown = ref(null)

// Initialize directive text from preferences
const directiveText = ref(getDirectiveText())

// Sync directive text back to preferences on change
watch(directiveText, (newVal) => {
  saveDirectiveText(newVal)
})

// Directive templates
const directiveTemplates = computed(() => DIRECTIVE_TEMPLATES)

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

// Non-directive component categories (exclude role-persona since those are now in Directive section)
// Show NSFW category but mark it as locked if not verified
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

// Whether there's anything to build (directive or components)
const hasAnythingToBuild = computed(() =>
  directiveText.value.trim() || currentBuildInstructions.value.length > 0
)

// First line of directive for summary display
const directiveFirstLine = computed(() => {
  const trimmed = directiveText.value.trim()
  if (!trimmed) return ''
  const firstLine = trimmed.split('\n')[0]
  return firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine + '...'
})

// Generate category-organized preview content
const previewContent = computed(() => {
  const sections = []

  // Part 1: Directive
  if (directiveText.value.trim()) {
    sections.push('## Directive\n' + directiveText.value.trim())
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

// Apply a directive template
const applyTemplate = (template) => {
  selectedTemplate.value = template.id
  directiveText.value = template.content
}

// Insert a directive component's content into the directive text
const insertDirectiveComponent = (comp, variantIndex = undefined) => {
  let content
  if (variantIndex !== undefined && comp.variants) {
    content = comp.variants[variantIndex]?.content
  } else {
    content = comp.content
  }

  if (!content) return

  // Append to existing directive text
  if (directiveText.value.trim()) {
    directiveText.value = directiveText.value.trimEnd() + '\n' + content
  } else {
    directiveText.value = content
  }

  // Clear template selection since user is customizing
  selectedTemplate.value = null
}

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
  if (!hasAnythingToBuild.value) return
  saveBuild(buildName.value)
  buildName.value = ''
}

// Handle load build
const handleLoadBuild = (buildId) => {
  loadBuild(buildId)
  // Sync directive text from loaded build
  directiveText.value = getDirectiveText()
  showSavedBuilds.value = false
}

// Handle delete build
const handleDeleteBuild = (buildId) => {
  if (confirm('Delete this saved build?')) {
    deleteSavedBuild(buildId)
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

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
