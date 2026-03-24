<template>
  <div class="space-y-8">
    <!-- Builder Header -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Hammer class="w-5 h-5 text-bd-purple" />
          Story Card Builder
        </h2>
        <p class="text-sm text-bd-text-muted mt-1">
          Craft Story Cards, refine them, and save sets you can import into AI Dungeon.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Saved Sets Dropdown -->
        <div class="relative" ref="savedSetsDropdown">
          <button 
            @click="showSavedSets = !showSavedSets"
            class="btn btn-secondary text-sm"
          >
            <FolderOpen class="w-4 h-4" />
            Saved Sets
            <span v-if="savedSets.length" class="px-1.5 py-0.5 rounded-full bg-bd-purple/20 text-bd-purple text-xs">
              {{ savedSets.length }}
            </span>
          </button>
          <Transition name="fade">
            <div 
              v-if="showSavedSets"
              class="absolute right-0 top-full mt-2 w-72 bg-bd-bg-secondary border border-bd-border-default rounded-xl shadow-lg overflow-hidden"
              style="z-index: var(--bd-z-dropdown)"
            >
              <div class="p-3 border-b border-bd-border-subtle">
                <span class="text-sm font-medium text-bd-text-primary">Your Saved Sets</span>
              </div>
              <div v-if="savedSets.length === 0" class="p-4 text-center text-sm text-bd-text-muted">
                No saved sets yet
              </div>
              <div v-else class="max-h-64 overflow-y-auto">
                <div
                  v-for="set in savedSets"
                  :key="set.id"
                  @click="handleLoadSet(set.id)"
                  class="w-full flex items-center justify-between px-4 py-3 hover:bg-bd-bg-tertiary transition-colors text-left cursor-pointer"
                >
                  <div>
                    <div class="text-sm font-medium text-bd-text-primary">{{ set.name }}</div>
                    <div class="text-xs text-bd-text-muted">
                      {{ set.cards.length }} card{{ set.cards.length === 1 ? '' : 's' }}
                    </div>
                  </div>
                  <button 
                    @click.stop="handleDeleteSet(set.id)"
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
    <div class="grid lg:grid-cols-[1fr_320px] gap-6">
      <!-- Left: Card Editor -->
      <div class="space-y-6">
        <!-- Card Editor Form -->
        <div class="card space-y-5">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-green" />
              {{ editingCardId ? 'Edit Card' : 'New Card' }}
            </h3>
            <button
              v-if="editingCardId"
              @click="resetEditor"
              class="text-xs text-bd-text-muted hover:text-bd-text-primary transition-colors"
            >
              Cancel Edit
            </button>
          </div>

          <!-- Title -->
          <div>
            <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
              Title
              <span class="text-bd-warning font-normal normal-case ml-1">(AI doesn't see this)</span>
            </label>
            <input
              v-model="editorTitle"
              type="text"
              placeholder="e.g. Sir Marcus, The Rusty Anchor..."
              class="input text-sm w-full"
            />
          </div>

          <!-- Type -->
          <div>
            <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
              Type
              <span class="text-bd-warning font-normal normal-case ml-1">(AI doesn't see this)</span>
            </label>
            <div class="flex flex-wrap gap-1.5">
              <button
                v-for="t in cardTypes"
                :key="t.id"
                @click="selectType(t.id)"
                class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                :class="editorType === t.id
                  ? `bg-${t.color}/20 text-${t.color}`
                  : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
              >
                {{ t.name }}
              </button>
            </div>
            <!-- Custom type input -->
            <Transition name="slide">
              <div v-if="editorType === 'custom'" class="mt-2">
                <input
                  v-model="editorCustomType"
                  type="text"
                  placeholder="Enter custom type name..."
                  class="input text-sm w-full"
                />
              </div>
            </Transition>
          </div>

          <!-- Entry -->
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider">
                Entry
                <span class="text-bd-green font-normal normal-case ml-1">(AI sees this)</span>
              </label>
              <span class="text-[10px] text-bd-text-muted">
                {{ editorEntry.length }} characters
              </span>
            </div>
            <textarea
              v-model="editorEntry"
              rows="6"
              placeholder="Write in natural prose. Mention the subject's name, because the AI doesn't see the Title. Put the most important info at the beginning and end."
              class="input text-sm w-full resize-y"
            />

            <!-- Proactive Inline Advice (context-aware) -->
            <div class="mt-2 space-y-1.5">
              <!-- Double linebreaks warning -->
              <div v-if="hasDoubleLinebreaks" class="flex items-start gap-1.5 text-[11px] text-bd-error">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span><strong>Double line breaks detected.</strong> Blank lines (double newlines) inside entries make the AI think it's reading a separate card. Replace double newlines with single newlines or remove them.</span>
              </div>
              <!-- Character name not mentioned -->
              <div v-if="titleNotInEntry" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span><strong>"{{ editorTitle }}" not found in Entry.</strong> The AI doesn't see the Title field, so you must mention the name in the Entry itself so the AI knows who/what this card is about.</span>
              </div>
              <!-- Long entry warning (graduated) -->
              <div v-if="editorEntry.length > 1000" class="flex items-start gap-1.5 text-[11px] text-bd-error">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span><strong>Very long entry ({{ editorEntry.length }} chars).</strong> Excessively long story cards use up too much of the AI's context. Consider splitting into multiple cards or cutting to the essentials.</span>
              </div>
              <div v-else-if="editorEntry.length > 500" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>Long entry ({{ editorEntry.length }} chars). Entries longer than 500 characters cause the AI to ignore or forget information. Move important info to the front or end of the card.</span>
              </div>
            </div>
          </div>

          <!-- Triggers -->
          <div>
            <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
              Triggers
              <span class="text-bd-purple font-normal normal-case ml-1">(activates the card)</span>
            </label>
            <input
              v-model="editorTriggers"
              type="text"
              placeholder="Marcus,Sir Marcus,the knight"
              class="input text-sm w-full"
            />
            <p class="text-[10px] text-bd-text-muted mt-1">
              Comma-separated, no spaces after commas. Case-insensitive.
            </p>

            <!-- Proactive trigger advice -->
            <div class="mt-1.5 space-y-1.5">
              <!-- No triggers when there's an entry -->
              <div v-if="editorEntry.trim() && !editorTriggers.trim()" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>No triggers set, meaning this card will never activate. Add the subject's name as a trigger.</span>
              </div>
              <!-- Spaces after commas -->
              <div v-if="hasSpacesAfterCommas" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span><strong>Spaces after commas detected.</strong> The space becomes part of the trigger. Use <code class="text-bd-purple">word1,word2</code> with no spaces if this is unintended.</span>
              </div>
              <!-- Short triggers -->
              <div v-if="shortTriggers.length > 0" class="flex items-start gap-1.5 text-[11px] text-bd-amber">
                <AlertTriangle class="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>Short trigger{{ shortTriggers.length > 1 ? 's' : '' }}: <code class="text-bd-purple">{{ shortTriggers.join(', ') }}</code>. Triggers under 4 characters may cause false matches (e.g. "orc" matches "porch"). Consider adding a space to the trigger to prevent this.</span>
              </div>
            </div>
          </div>

          <!-- Notes (collapsible) -->
          <div>
            <button
              @click="showNotes = !showNotes"
              class="flex items-center gap-1.5 text-xs text-bd-text-muted hover:text-bd-text-primary transition-colors"
            >
              <ChevronDown
                class="w-3 h-3 transition-transform"
                :class="{ 'rotate-180': !showNotes }"
              />
              Notes
              <span class="text-bd-warning">(optional, AI doesn't see this)</span>
            </button>
            <Transition name="slide">
              <div v-if="showNotes" class="mt-2">
                <textarea
                  v-model="editorNotes"
                  rows="3"
                  placeholder="Private notes, like why you created this card, alternate versions, etc."
                  class="input text-sm w-full resize-y"
                />
              </div>
            </Transition>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-2 pt-2 border-t border-bd-border-subtle">
            <button
              @click="handleAddOrUpdateCard"
              class="btn btn-primary text-sm flex-1"
              :disabled="!editorEntry.trim()"
            >
              <component :is="editingCardId ? Check : Plus" class="w-4 h-4" />
              {{ editingCardId ? 'Update Card' : 'Add Card' }}
            </button>
            <button
              v-if="editorTitle || editorTriggers || editorEntry || editorNotes"
              @click="resetEditor"
              class="btn btn-secondary text-sm"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Live Preview (accurate AI Dungeon context formatting) -->
        <div class="card space-y-3">
          <h4 class="text-sm font-semibold text-bd-text-primary flex items-center gap-2">
            <Eye class="w-4 h-4 text-bd-purple" />
            AI Preview
            <span class="text-[10px] text-bd-text-muted font-normal">(what the AI actually sees in context when triggered)</span>
          </h4>
          <div
            v-if="editorEntry.trim()"
            class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/20 font-mono text-sm text-bd-text-secondary leading-relaxed whitespace-pre-wrap"
          ><span class="text-bd-purple font-semibold">World Lore:</span>{{ '\n' }}{{ editorEntry }}</div>
          <div v-else class="p-4 text-center border-2 border-dashed border-bd-border-subtle rounded-lg">
            <p class="text-sm text-bd-text-muted">Type in the Entry field to see what the AI will read</p>
          </div>
          <p class="text-[10px] text-bd-text-muted">
            This is the exact formatting the AI receives. The entry content is preserved exactly as typed, including all line breaks.
          </p>
        </div>

        <!-- Tips -->
        <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-3">
            <Lightbulb class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-bd-text-primary mb-1">Building Tips</h4>
              <ul class="text-sm text-bd-text-secondary space-y-1">
                <li>&#8226; <strong>Always mention the name</strong> in the Entry, because the AI doesn't see the Title field</li>
                <li>&#8226; <strong>Front-load</strong> the most important info at the start and end of entries</li>
                <li>&#8226; Use <strong>proper names</strong> as triggers, they're the most consistent type</li>
                <li>&#8226; Format triggers as <code class="text-bd-purple">trigger1,trigger2</code> with <strong>no spaces after commas</strong></li>
                <li>&#8226; Keep entries <strong>concise</strong>, because cards are among the first elements removed when context is full</li>
                <li>&#8226; <strong>Avoid blank lines</strong> inside entries, because the AI reads double newlines as a separator between different cards</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Card List & Export -->
      <div class="space-y-4">
        <!-- Card Count & Actions -->
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-4 h-4 text-bd-purple" />
            Your Cards
          </h3>
          <span class="text-xs text-bd-text-muted">{{ currentCards.length }} card{{ currentCards.length === 1 ? '' : 's' }}</span>
        </div>

        <!-- Card List -->
        <div v-if="currentCards.length > 0" class="space-y-2 max-h-[500px] overflow-y-auto pr-1">
          <div
            v-for="(card, index) in currentCards"
            :key="card.id"
            class="p-3 rounded-lg border transition-all group"
            :class="editingCardId === card.id
              ? 'bg-bd-purple/10 border-bd-purple/30'
              : 'bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default'"
          >
            <div class="flex items-start gap-2">
              <!-- Reorder -->
              <div class="flex flex-col gap-0.5 text-bd-text-muted pt-0.5">
                <button
                  @click="moveCard(index, -1)"
                  :disabled="index === 0"
                  class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronUp class="w-3 h-3" />
                </button>
                <button
                  @click="moveCard(index, 1)"
                  :disabled="index === currentCards.length - 1"
                  class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronDown class="w-3 h-3" />
                </button>
              </div>

              <!-- Card Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-1.5 mb-0.5">
                  <span class="text-sm font-medium text-bd-text-primary truncate">
                    {{ card.title || 'Untitled' }}
                  </span>
                  <span
                    class="px-1.5 py-0.5 rounded text-[9px] font-medium"
                    :class="typeClasses[card.type] || 'bg-bd-tag-bg text-bd-text-muted'"
                  >
                    {{ card.type }}
                  </span>
                </div>
                <p class="text-[11px] text-bd-text-muted truncate">
                  {{ card.triggers || 'No triggers' }}
                </p>
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  @click="editCard(card)"
                  class="p-1 rounded text-bd-text-muted hover:text-bd-accent-primary hover:bg-bd-accent-primary/10"
                  title="Edit"
                >
                  <Pencil class="w-3.5 h-3.5" />
                </button>
                <button
                  @click="handleDuplicate(card.id)"
                  class="p-1 rounded text-bd-text-muted hover:text-bd-blue hover:bg-bd-blue/10"
                  title="Duplicate"
                >
                  <Copy class="w-3.5 h-3.5" />
                </button>
                <button
                  @click="handleCopyCardEntry(card)"
                  class="p-1 rounded text-bd-text-muted hover:text-bd-green hover:bg-bd-green/10"
                  title="Copy entry"
                >
                  <Clipboard class="w-3.5 h-3.5" />
                </button>
                <button
                  @click="handleRemoveCard(card.id)"
                  class="p-1 rounded text-bd-text-muted hover:text-bd-error hover:bg-bd-error/10"
                  title="Delete"
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-10 border-2 border-dashed border-bd-border-subtle rounded-lg">
          <Drama class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
          <p class="text-sm text-bd-text-muted">No cards yet</p>
          <p class="text-xs text-bd-text-muted mt-1">Use the editor to create your first card</p>
        </div>

        <!-- Save Set & Export -->
        <div v-if="currentCards.length > 0" class="space-y-3">
          <!-- Save Set -->
          <div class="card space-y-3">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Save as Set</h4>
            <div class="flex gap-2">
              <input
                v-model="setName"
                type="text"
                placeholder="Set name..."
                class="input text-sm flex-1"
              />
              <button
                @click="handleSaveSet"
                class="btn btn-secondary text-sm"
              >
                <Save class="w-4 h-4" />
                Save
              </button>
            </div>
          </div>

          <!-- Export & Import -->
          <div class="card space-y-3">
            <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Export & Import</h4>
            <div class="flex gap-2">
              <button
                @click="exportAsJson"
                class="btn btn-primary text-sm flex-1"
              >
                <Download class="w-4 h-4" />
                Export JSON
              </button>
              <button
                @click="fileInput?.click()"
                class="btn btn-secondary text-sm flex-1"
              >
                <Upload class="w-4 h-4" />
                Import JSON
              </button>
              <input
                ref="fileInput"
                type="file"
                accept=".json"
                class="hidden"
                @change="handleImportFile"
              />
            </div>
            <p class="text-[10px] text-bd-text-muted">
              Export downloads an AI Dungeon-compatible JSON file. Import appends cards from a JSON file to your current set.
            </p>
          </div>

          <!-- Clear All -->
          <button
            @click="handleClearAll"
            class="w-full text-xs text-bd-text-muted hover:text-bd-error transition-colors py-2"
          >
            Clear All Cards
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import {
  Hammer, FolderOpen, FileText, Eye, Lightbulb, Layers, Plus, Check, X,
  ChevronUp, ChevronDown, Save, Copy, Pencil, Trash2, AlertTriangle,
  Clipboard, Drama, Download, Upload
} from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'

const toast = inject('toast', () => {})

const {
  preferences,
  addStoryCard,
  updateStoryCard,
  removeStoryCard,
  duplicateStoryCard,
  reorderStoryCards,
  clearStoryCards,
  saveStoryCardSet,
  loadStoryCardSet,
  deleteStoryCardSet
} = usePreferences()

// Editor state
const editorTitle = ref('')
const editorType = ref('character')
const editorCustomType = ref('')
const editorTriggers = ref('')
const editorEntry = ref('')
const editorNotes = ref('')
const editingCardId = ref(null)
const showNotes = ref(false)

// UI state
const setName = ref('')
const showSavedSets = ref(false)
const savedSetsDropdown = ref(null)
const fileInput = ref(null)

// AI Dungeon-accurate type options
const cardTypes = [
  { id: 'character', name: 'Character', color: 'bd-purple' },
  { id: 'class', name: 'Class', color: 'bd-blue' },
  { id: 'race', name: 'Race', color: 'bd-green' },
  { id: 'location', name: 'Location', color: 'bd-green' },
  { id: 'faction', name: 'Faction', color: 'bd-blue' },
  { id: 'custom', name: 'Custom', color: 'bd-amber' }
]

const selectType = (typeId) => {
  editorType.value = typeId
  if (typeId !== 'custom') editorCustomType.value = ''
}

// Dynamic type badge classes
const typeClasses = {
  character: 'bg-bd-purple/20 text-bd-purple',
  class: 'bg-bd-blue/20 text-bd-blue',
  race: 'bg-bd-green/20 text-bd-green',
  location: 'bg-bd-green/20 text-bd-green',
  faction: 'bg-bd-blue/20 text-bd-blue',
  custom: 'bg-bd-amber/20 text-bd-amber'
}

// ===========================================
// PROACTIVE INLINE ADVICE (computed)
// ===========================================

// Detect double line breaks in entry (analytics: cardsWithDoubleLinebreaks)
const hasDoubleLinebreaks = computed(() => {
  return editorEntry.value.includes('\n\n')
})

// Detect if title is mentioned in entry (analytics: characterNameIssues)
const titleNotInEntry = computed(() => {
  const title = editorTitle.value.trim()
  if (!title || title.length < 2 || !editorEntry.value.trim()) return false
  return !editorEntry.value.toLowerCase().includes(title.toLowerCase())
})

// Detect spaces after commas in triggers (common mistake)
const hasSpacesAfterCommas = computed(() => {
  if (!editorTriggers.value) return false
  return /,\s/.test(editorTriggers.value)
})

// Detect short triggers (analytics: short triggers cause false matches)
const shortTriggers = computed(() => {
  if (!editorTriggers.value.trim()) return []
  return editorTriggers.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0 && t.length < 4)
})

// Computed
const currentCards = computed(() => preferences.value.currentStoryCards || [])
const savedSets = computed(() => preferences.value.savedStoryCardSets || [])

// Resolve final type string (handles custom type input)
const resolveType = () => {
  if (editorType.value === 'custom') {
    return editorCustomType.value.trim() || 'custom'
  }
  return editorType.value
}

// Editor actions
const resetEditor = () => {
  editorTitle.value = ''
  editorType.value = 'character'
  editorCustomType.value = ''
  editorTriggers.value = ''
  editorEntry.value = ''
  editorNotes.value = ''
  editingCardId.value = null
}

const handleAddOrUpdateCard = () => {
  if (!editorEntry.value.trim()) return

  const cardData = {
    title: editorTitle.value,
    type: resolveType(),
    triggers: editorTriggers.value,
    entry: editorEntry.value,
    notes: editorNotes.value
  }

  if (editingCardId.value) {
    updateStoryCard(editingCardId.value, cardData)
    toast('Card updated!', 'success')
  } else {
    addStoryCard(cardData)
    toast('Card added!', 'success')
  }
  resetEditor()
}

const editCard = (card) => {
  // Check if the card type is one of the built-in types
  const builtInTypes = cardTypes.map(t => t.id)
  if (builtInTypes.includes(card.type)) {
    editorType.value = card.type
    editorCustomType.value = ''
  } else {
    editorType.value = 'custom'
    editorCustomType.value = card.type
  }
  editorTitle.value = card.title
  editorTriggers.value = card.triggers
  editorEntry.value = card.entry
  editorNotes.value = card.notes
  editingCardId.value = card.id
  if (card.notes) showNotes.value = true
}

const handleRemoveCard = (cardId) => {
  if (editingCardId.value === cardId) resetEditor()
  removeStoryCard(cardId)
}

const handleDuplicate = (cardId) => {
  duplicateStoryCard(cardId)
  toast('Card duplicated!', 'success')
}

const moveCard = (index, direction) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < currentCards.value.length) {
    reorderStoryCards(index, newIndex)
  }
}

const handleCopyCardEntry = async (card) => {
  try {
    await navigator.clipboard.writeText(card.entry)
    toast('Entry copied!', 'success')
  } catch {
    toast('Failed to copy', 'error')
  }
}

// Set management
const handleSaveSet = () => {
  if (currentCards.value.length === 0) return
  saveStoryCardSet(setName.value)
  setName.value = ''
  toast('Set saved!', 'success')
}

const handleLoadSet = (setId) => {
  loadStoryCardSet(setId)
  showSavedSets.value = false
  resetEditor()
  toast('Set loaded!', 'success')
}

const handleDeleteSet = (setId) => {
  if (confirm('Delete this saved set?')) {
    deleteStoryCardSet(setId)
  }
}

const handleClearAll = () => {
  if (confirm('Clear all cards? This cannot be undone.')) {
    clearStoryCards()
    resetEditor()
  }
}

// Export as AI Dungeon-compatible JSON
const exportAsJson = () => {
  const jsonCards = currentCards.value.map(card => ({
    keys: card.triggers || '',
    value: card.entry || '',
    type: card.type || 'character',
    title: card.title || '',
    description: card.notes || '',
    useForCharacterCreation: false
  }))

  const blob = new Blob([JSON.stringify(jsonCards, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'story-cards.json'
  a.click()
  URL.revokeObjectURL(url)
  toast('JSON exported!', 'success')
}

// Import from AI Dungeon JSON
const handleImportFile = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      if (!Array.isArray(data)) throw new Error('Not an array')

      let count = 0
      for (const item of data) {
        addStoryCard({
          title: item.title || '',
          type: item.type || 'character',
          triggers: item.keys || '',
          entry: item.value || '',
          notes: item.description || ''
        })
        count++
      }
      toast(`Imported ${count} card${count === 1 ? '' : 's'}!`, 'success')
    } catch {
      toast('Invalid JSON file. Expected an array of story cards.', 'error')
    }
    // Reset file input so same file can be re-imported
    event.target.value = ''
  }
  reader.readAsText(file)
}

// Close dropdown on outside click
const handleClickOutside = (event) => {
  if (savedSetsDropdown.value && !savedSetsDropdown.value.contains(event.target)) {
    showSavedSets.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
