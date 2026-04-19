<template>
  <div class="space-y-6">
    <!-- Builder Header -->
    <div>
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Hammer class="w-5 h-5 text-bd-green" />
        Plot Component Builder
      </h2>
      <p class="text-sm text-bd-text-muted mt-1">
        Pick a template, customize it to your story, and copy the result into AI Dungeon.
      </p>
    </div>

    <!-- Template Picker -->
    <div class="card space-y-4">
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
          <Layers class="w-4 h-4 text-bd-blue" />
          Choose a Template
        </h3>
        <button
          v-if="selectedTemplate"
          @click="clearBuilder"
          class="text-xs text-bd-text-muted hover:text-bd-text-primary transition-colors"
        >
          Start Fresh
        </button>
      </div>

      <!-- Category Filter Pills -->
      <div class="flex flex-wrap items-center gap-1.5">
        <button
          @click="pickerCategory = null"
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
          :class="pickerCategory === null
            ? 'bg-bd-accent-primary/20 text-bd-accent-light'
            : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
        >
          All
        </button>
        <button
          v-for="cat in builderCategories"
          :key="cat.id"
          @click="pickerCategory = cat.id"
          class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
          :class="pickerCategory === cat.id
            ? cat.activeClass
            : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
        >
          <component :is="cat.icon" class="w-3 h-3" />
          {{ cat.name }}
        </button>
        <span class="ml-auto text-[10px] text-bd-text-muted">
          {{ filteredPickerTemplates.length }} template{{ filteredPickerTemplates.length === 1 ? '' : 's' }}
        </span>
      </div>

      <!-- Template Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[280px] overflow-y-auto pr-1">
        <button
          v-for="template in filteredPickerTemplates"
          :key="template.id"
          @click="selectTemplate(template)"
          class="text-left p-3 rounded-lg border transition-all group"
          :class="selectedTemplate?.id === template.id
            ? 'bg-bd-accent-primary/10 border-bd-accent-primary/40 ring-1 ring-bd-accent-primary/30'
            : 'bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default hover:bg-bd-bg-elevated'"
        >
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="text-sm font-medium text-bd-text-primary truncate">{{ template.name }}</span>
            <span
              v-if="template.essential"
              class="px-1 py-0.5 rounded text-[8px] font-semibold bg-bd-amber/20 text-bd-amber flex-shrink-0"
            >★</span>
          </div>
          <p class="text-[11px] text-bd-text-muted line-clamp-2">{{ template.description }}</p>
          <div class="flex items-center gap-1.5 mt-1.5">
            <span
              class="px-1 py-0.5 rounded text-[8px] font-medium"
              :class="categoryBadgeClass(template.category)"
            >{{ categoryLabel(template.category) }}</span>
            <span
              class="px-1 py-0.5 rounded text-[8px] font-medium"
              :class="impactBadgeClass(template.impact)"
            >{{ template.impact }}</span>
          </div>
        </button>
      </div>

      <!-- Empty state if no templates match -->
      <div v-if="filteredPickerTemplates.length === 0" class="text-center py-6">
        <p class="text-sm text-bd-text-muted">No templates in this category.</p>
      </div>
    </div>

    <!-- Main Builder Area (shown after template selection) -->
    <Transition name="slide">
      <div v-if="selectedTemplate" class="grid lg:grid-cols-[1fr_320px] gap-6">
        <!-- Left: Editor -->
        <div class="space-y-4">
          <!-- Template Info Bar -->
          <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-semibold text-bd-text-primary">{{ selectedTemplate.name }}</span>
                <span
                  class="px-1.5 py-0.5 rounded text-[9px] font-medium"
                  :class="categoryBadgeClass(selectedTemplate.category)"
                >{{ categoryLabel(selectedTemplate.category) }}</span>
                <span
                  class="px-1.5 py-0.5 rounded text-[9px] font-medium"
                  :class="difficultyBadgeClass(selectedTemplate.difficulty)"
                >{{ selectedTemplate.difficulty }}</span>
              </div>
              <p v-if="selectedTemplate.purpose" class="text-xs text-bd-text-muted mt-1">{{ selectedTemplate.purpose }}</p>
            </div>
            <button
              @click="resetToOriginal"
              class="btn btn-secondary text-xs flex-shrink-0"
              title="Reset to original template"
            >
              <RotateCcw class="w-3 h-3" />
              Reset
            </button>
          </div>

          <!-- Main Editor Textarea -->
          <div class="card space-y-3">
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 text-xs font-semibold text-bd-text-muted uppercase tracking-wider">
                <FileText class="w-3.5 h-3.5 text-bd-green" />
                Edit Template
              </label>
              <span class="text-[10px] text-bd-text-muted">
                {{ editorContent.length }} characters
              </span>
            </div>
            <textarea
              ref="editorTextarea"
              v-model="editorContent"
              rows="12"
              class="input text-sm w-full resize-y font-mono leading-relaxed"
              placeholder="Select a template to start editing..."
              spellcheck="false"
            />

            <!-- Inline advisor -->
            <div class="space-y-1.5">
              <!-- Long content warning -->
              <div v-if="editorContent.length > 1500" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span><strong>Long content ({{ editorContent.length }} chars).</strong> Plot components work best when concise. The AI gets less effective with longer entries.</span>
              </div>
              <!-- Unfilled placeholders hint -->
              <div v-if="unfilledPlaceholders.length > 0" class="flex items-start gap-1.5 text-[11px] text-bd-blue">
                <Info class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <div class="flex-1 min-w-0">
                  <span class="mr-1">{{ unfilledPlaceholders.length }} placeholder{{ unfilledPlaceholders.length === 1 ? '' : 's' }} remaining:</span>
                  <span class="inline-flex flex-wrap gap-1 align-middle">
                    <code
                      v-for="(p, i) in unfilledPlaceholders.slice(0, 5)"
                      :key="i"
                      class="px-1 py-0.5 rounded bg-bd-blue/10 text-bd-accent-primary font-mono text-[10px]"
                    >{{ p }}</code>
                    <span v-if="unfilledPlaceholders.length > 5" class="text-bd-text-muted">
                      +{{ unfilledPlaceholders.length - 5 }} more
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Fill Helpers -->
          <div v-if="detectedPlaceholders.length > 0" class="card space-y-3">
            <button
              @click="showQuickFill = !showQuickFill"
              class="w-full flex items-center justify-between text-left"
            >
              <h4 class="flex items-center gap-2 text-xs font-semibold text-bd-text-muted uppercase tracking-wider">
                <Zap class="w-3.5 h-3.5 text-bd-amber" />
                Quick Fill Helpers
                <span class="px-1.5 py-0.5 rounded-full bg-bd-amber/20 text-bd-amber text-[10px] font-medium normal-case">
                  {{ detectedPlaceholders.length }}
                </span>
              </h4>
              <ChevronDown
                class="w-4 h-4 text-bd-text-muted transition-transform"
                :class="{ 'rotate-180': !showQuickFill }"
              />
            </button>
            <Transition name="slide">
              <div v-if="showQuickFill" class="space-y-2.5">
                <p class="text-[11px] text-bd-text-muted">
                  Fill these fields to replace placeholders in the editor. You can also edit the text directly above.
                </p>
                <div
                  v-for="(placeholder, index) in detectedPlaceholders"
                  :key="index"
                  class="flex items-start gap-2"
                >
                  <label class="text-xs font-medium text-bd-text-secondary whitespace-nowrap pt-2 min-w-[100px] truncate flex items-center gap-1" :title="placeholder.label">
                    <Check v-if="isPlaceholderApplied(placeholder)" class="w-3 h-3 text-bd-green flex-shrink-0" />
                    {{ placeholder.label }}
                  </label>
                  <input
                    v-model="placeholder.value"
                    type="text"
                    :placeholder="placeholder.hint"
                    class="input text-sm flex-1"
                    @input="applyPlaceholder(placeholder)"
                  />
                </div>
                <button
                  @click="applyAllPlaceholders"
                  class="btn btn-secondary text-xs w-full"
                  :disabled="!hasAnyFilledPlaceholder"
                >
                  <Check class="w-3 h-3" />
                  Apply All to Editor
                </button>
              </div>
            </Transition>
          </div>

          <!-- Tips -->
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <div class="flex items-start gap-3">
              <Lightbulb class="w-5 h-5 text-bd-blue flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">Builder Tips</h4>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>&#8226; <strong>Edit freely</strong> — the textarea is your main workspace, change anything you want</li>
                  <li>&#8226; Replace <code class="text-bd-accent-primary">[bracketed text]</code> with your own details</li>
                  <li v-pre>&#8226; Leave <code class="text-bd-green">${character.name}</code> as-is — AI Dungeon fills it automatically</li>
                  <li>&#8226; Keep it <strong>concise</strong> — shorter entries give the AI more room to work</li>
                  <li>&#8226; Add or remove lines as needed for your story</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Output & Actions -->
        <div class="space-y-4">
          <!-- Live Preview -->
          <div class="card space-y-3">
            <div class="flex items-center justify-between">
              <h4 class="text-sm font-semibold text-bd-text-primary flex items-center gap-2">
                <Eye class="w-4 h-4 text-bd-purple" />
                Preview
              </h4>
              <button
                @click="copyOutput"
                class="copy-btn"
                :disabled="!editorContent.trim()"
              >
                <component :is="justCopied ? Check : Clipboard" class="w-3.5 h-3.5" />
                {{ justCopied ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <div
              v-if="editorContent.trim()"
              class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle font-mono text-sm text-bd-text-secondary leading-relaxed whitespace-pre-wrap max-h-[400px] overflow-y-auto"
            >{{ editorContent }}</div>
            <div v-else class="p-4 text-center border-2 border-dashed border-bd-border-subtle rounded-lg">
              <p class="text-sm text-bd-text-muted">Start editing to see the preview</p>
            </div>
          </div>

          <!-- Placement Guide -->
          <div class="card space-y-2">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <MapPin class="w-3.5 h-3.5" />
              Where to paste
            </h4>
            <div
              class="p-3 rounded-lg border"
              :class="placementGuideClass"
            >
              <span class="text-sm font-medium" :class="placementGuideTextClass">
                {{ placementGuideLabel }}
              </span>
              <p class="text-xs text-bd-text-muted mt-1">
                {{ placementGuideDescription }}
              </p>
            </div>
          </div>

          <!-- Combines With -->
          <div v-if="selectedTemplate.combinesWith && selectedTemplate.combinesWith.length > 0" class="card space-y-2">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Link2 class="w-3.5 h-3.5" />
              Works well with
            </h4>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="comboId in selectedTemplate.combinesWith"
                :key="comboId"
                @click="loadComboTemplate(comboId)"
                class="text-[10px] px-2 py-1 rounded-lg bg-bd-green/10 text-bd-green border border-bd-green/20 hover:bg-bd-green/20 transition-colors cursor-pointer"
                :title="'Load ' + formatId(comboId)"
              >
                {{ formatId(comboId) }}
              </button>
            </div>
            <p class="text-[10px] text-bd-text-muted">Click to load a complementary template.</p>
          </div>

          <!-- Use Case -->
          <div v-if="selectedTemplate.useCase" class="card space-y-2">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1.5">
              <Target class="w-3.5 h-3.5" />
              Best for
            </h4>
            <p class="text-sm text-bd-text-secondary">{{ selectedTemplate.useCase }}</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Empty State (no template selected) -->
    <div v-if="!selectedTemplate" class="text-center py-12 border-2 border-dashed border-bd-border-subtle rounded-lg">
      <Layers class="w-12 h-12 text-bd-text-muted mx-auto mb-3" />
      <p class="text-bd-text-muted font-medium">Select a template above to start building</p>
      <p class="text-xs text-bd-text-muted mt-1">Pick any template, customize it, and copy the result into your story</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, inject } from 'vue'
import {
  Hammer, Layers, FileText, Eye, Lightbulb, Zap, Check, Clipboard,
  ChevronDown, RotateCcw, AlertTriangle, Info, MapPin, Link2, Target,
  Feather, BookMarked, ScrollText
} from 'lucide-vue-next'
import { TEMPLATES } from '@/data/plotComponents'

const toast = inject('toast', () => {})

// ============================================
// TEMPLATE PICKER
// ============================================

const pickerCategory = ref(null)
const selectedTemplate = ref(null)
const editorContent = ref('')
const editorTextarea = ref(null)
const showQuickFill = ref(true)
const justCopied = ref(false)

// Categories for the picker (exclude nsfw from builder).
// `activeClass` is a static Tailwind string so JIT picks it up reliably.
const builderCategories = [
  { id: 'authors-note', name: "Author's Note", icon: Feather, activeClass: 'bg-bd-purple/20 text-bd-purple' },
  { id: 'plot-essentials', name: 'Plot Essentials', icon: BookMarked, activeClass: 'bg-bd-green/20 text-bd-green' },
  { id: 'story-summary', name: 'Story Summary', icon: ScrollText, activeClass: 'bg-bd-cyan/20 text-bd-cyan' }
]

// Essentials first, then alphabetical within each group.
const filteredPickerTemplates = computed(() => {
  let templates = TEMPLATES.filter(t => t.category !== 'nsfw')
  if (pickerCategory.value) {
    templates = templates.filter(t => t.category === pickerCategory.value)
  }
  return [...templates].sort((a, b) => {
    const essentialDelta = (b.essential ? 1 : 0) - (a.essential ? 1 : 0)
    if (essentialDelta !== 0) return essentialDelta
    return (a.name || '').localeCompare(b.name || '')
  })
})

// ============================================
// TEMPLATE SELECTION & EDITING
// ============================================

const selectTemplate = (template) => {
  selectedTemplate.value = template
  editorContent.value = template.content
  // Re-parse placeholders
  parsePlaceholders(template.content)
  // Focus the editor
  nextTick(() => {
    editorTextarea.value?.focus()
  })
}

const resetToOriginal = () => {
  if (selectedTemplate.value) {
    editorContent.value = selectedTemplate.value.content
    parsePlaceholders(selectedTemplate.value.content)
  }
}

const clearBuilder = () => {
  selectedTemplate.value = null
  editorContent.value = ''
  detectedPlaceholders.value = []
}

const loadComboTemplate = (templateId) => {
  const template = TEMPLATES.find(t => t.id === templateId)
  if (!template) return
  // Don't silently pull NSFW templates into the builder.
  if (template.category === 'nsfw') {
    toast('That combo lives in the NSFW templates library', 'info')
    return
  }
  selectTemplate(template)
  // Scroll to top of builder
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// ============================================
// PLACEHOLDER PARSING & QUICK FILL
// ============================================

const detectedPlaceholders = ref([])

const parsePlaceholders = (content) => {
  // Match [bracketed placeholders] but NOT ${variable} syntax
  const regex = /\[([^\]]+)\]/g
  const found = []
  const seenLabels = new Set()
  let match

  while ((match = regex.exec(content)) !== null) {
    const raw = match[1]
    // Extract label and hint
    // Patterns: "e.g., Dark Fantasy, Sci-Fi" → label: from context, hint: the content
    // "where" → label: "Where", hint: ""
    // "Name" → label: "Name", hint: ""
    let label = raw
    let hint = ''

    if (raw.startsWith('e.g.,') || raw.startsWith('e.g.')) {
      // The label comes from the text before the colon on the same line
      hint = raw
      label = extractLabelFromContext(content, match.index)
    } else {
      hint = raw
      label = raw.charAt(0).toUpperCase() + raw.slice(1)
    }

    // Deduplicate by label
    const dedupeKey = label.toLowerCase().trim()
    if (!seenLabels.has(dedupeKey)) {
      seenLabels.add(dedupeKey)
      found.push({
        raw: match[0], // Full match including brackets
        label: label.length > 30 ? label.substring(0, 30) + '…' : label,
        hint: hint,
        value: ''
      })
    }
  }

  detectedPlaceholders.value = found
}

// Try to extract a label from the line context (e.g., "Genre: [e.g., ...]" → "Genre")
const extractLabelFromContext = (content, matchIndex) => {
  // Find the start of the line containing this match
  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1
  const beforeMatch = content.substring(lineStart, matchIndex).trim()
  // If there's a colon label before the bracket...
  if (beforeMatch.endsWith(':')) {
    return beforeMatch.slice(0, -1).replace(/^[-*•]\s*/, '').trim()
  }
  if (beforeMatch.includes(':')) {
    return beforeMatch.split(':')[0].replace(/^[-*•]\s*/, '').trim()
  }
  return beforeMatch || 'Field'
}

// Apply a single placeholder value to the editor content
const applyPlaceholder = (placeholder) => {
  if (!placeholder.value.trim()) return
  // Replace the FIRST occurrence of this placeholder's raw text in the editor
  const idx = editorContent.value.indexOf(placeholder.raw)
  if (idx !== -1) {
    editorContent.value =
      editorContent.value.substring(0, idx) +
      placeholder.value +
      editorContent.value.substring(idx + placeholder.raw.length)
  }
}

// Apply all filled placeholders at once
const applyAllPlaceholders = () => {
  let content = editorContent.value
  for (const placeholder of detectedPlaceholders.value) {
    if (placeholder.value.trim()) {
      // Replace first occurrence
      const idx = content.indexOf(placeholder.raw)
      if (idx !== -1) {
        content =
          content.substring(0, idx) +
          placeholder.value +
          content.substring(idx + placeholder.raw.length)
      }
    }
  }
  editorContent.value = content
  toast('Placeholders applied!', 'success')
}

const hasAnyFilledPlaceholder = computed(() =>
  detectedPlaceholders.value.some(p => p.value.trim())
)

// A placeholder is considered applied once its raw token is no longer in the editor.
const isPlaceholderApplied = (placeholder) => {
  return placeholder.value.trim() !== '' && !editorContent.value.includes(placeholder.raw)
}

// Detect unfilled placeholders still in the editor
const unfilledPlaceholders = computed(() => {
  const regex = /\[([^\]]+)\]/g
  const found = []
  let match
  while ((match = regex.exec(editorContent.value)) !== null) {
    found.push(match[0])
  }
  return found
})

// ============================================
// OUTPUT & COPY
// ============================================

const copyOutput = async () => {
  if (!editorContent.value.trim()) return
  try {
    await navigator.clipboard.writeText(editorContent.value)
    justCopied.value = true
    toast('Copied to clipboard!', 'success')
    setTimeout(() => {
      justCopied.value = false
    }, 2000)
  } catch {
    toast('Failed to copy', 'error')
  }
}

// ============================================
// PLACEMENT GUIDE
// ============================================

const placementGuideLabel = computed(() => {
  if (!selectedTemplate.value) return ''
  const cat = selectedTemplate.value.category
  const labels = {
    'authors-note': "Author's Note",
    'plot-essentials': 'Plot Essentials',
    'story-summary': 'Story Summary'
  }
  return labels[cat] || cat
})

const placementGuideDescription = computed(() => {
  if (!selectedTemplate.value) return ''
  const cat = selectedTemplate.value.category
  const descriptions = {
    'authors-note': 'Paste into your Author\'s Note in AI Dungeon. This has the strongest influence — keep it short.',
    'plot-essentials': 'Paste into Plot Essentials in AI Dungeon. This info is always visible to the AI.',
    'story-summary': 'Paste into your Story Summary. Update periodically as the story progresses.'
  }
  return descriptions[cat] || ''
})

const placementGuideClass = computed(() => {
  if (!selectedTemplate.value) return ''
  const cat = selectedTemplate.value.category
  const classes = {
    'authors-note': 'bg-bd-purple/10 border-bd-purple/30',
    'plot-essentials': 'bg-bd-green/10 border-bd-green/30',
    'story-summary': 'bg-bd-cyan/10 border-bd-cyan/30'
  }
  return classes[cat] || 'bg-bd-bg-tertiary border-bd-border-subtle'
})

const placementGuideTextClass = computed(() => {
  if (!selectedTemplate.value) return ''
  const cat = selectedTemplate.value.category
  const classes = {
    'authors-note': 'text-bd-purple',
    'plot-essentials': 'text-bd-green',
    'story-summary': 'text-bd-cyan'
  }
  return classes[cat] || 'text-bd-text-primary'
})

// ============================================
// HELPERS
// ============================================

const formatId = (id) => {
  return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const categoryLabel = (category) => {
  const labels = {
    'authors-note': 'AN',
    'plot-essentials': 'PE',
    'story-summary': 'SS',
    'nsfw': 'NSFW'
  }
  return labels[category] || category
}

const categoryBadgeClass = (category) => {
  const classes = {
    'authors-note': 'bg-bd-purple/20 text-bd-purple',
    'plot-essentials': 'bg-bd-green/20 text-bd-green',
    'story-summary': 'bg-bd-cyan/20 text-bd-cyan',
    'nsfw': 'bg-bd-red/20 text-bd-red'
  }
  return classes[category] || 'bg-bd-tag-bg text-bd-text-muted'
}

const impactBadgeClass = (impact) => {
  const classes = {
    'high': 'bg-bd-purple/20 text-bd-purple',
    'medium': 'bg-bd-blue/20 text-bd-blue',
    'low': 'bg-bd-tag-bg text-bd-text-muted'
  }
  return classes[impact] || 'bg-bd-tag-bg text-bd-text-muted'
}

const difficultyBadgeClass = (difficulty) => {
  const classes = {
    'beginner': 'bg-bd-green/20 text-bd-green',
    'intermediate': 'bg-bd-amber/20 text-bd-amber',
    'advanced': 'bg-bd-pink/20 text-bd-pink'
  }
  return classes[difficulty] || 'bg-bd-tag-bg text-bd-text-muted'
}
</script>

<style scoped>
.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--bd-text-muted);
  background: var(--bd-bg-tertiary);
  border: 1px solid var(--bd-border-subtle);
  transition: all 0.15s ease;
  cursor: pointer;
}

.copy-btn:hover:not(:disabled) {
  color: var(--bd-text-primary);
  background: var(--bd-bg-elevated);
  border-color: var(--bd-border-default);
}

.copy-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
