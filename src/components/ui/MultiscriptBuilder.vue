<template>
  <div class="space-y-8">
    <!-- Builder Header -->
    <div class="flex items-center justify-between flex-wrap gap-3">
      <div>
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Blocks class="w-5 h-5 text-bd-cyan" />
          Multiscript Builder
        </h2>
        <p class="text-sm text-bd-text-muted mt-1">
          Combine multiple scripts into one unified set. Select scripts, set execution order, and copy the generated files into AI Dungeon.
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
            <span v-if="savedBuilds.length" class="px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan text-xs">
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
                      {{ build.entries.length }} script{{ build.entries.length === 1 ? '' : 's' }}
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

    <!-- How It Works (collapsed by default) -->
    <div class="card">
      <button @click="showHowItWorks = !showHowItWorks" class="w-full flex items-center justify-between text-left">
        <h3 class="text-sm font-semibold text-bd-text-primary flex items-center gap-2">
          <HelpCircle class="w-4 h-4 text-bd-cyan" />
          How It Works
        </h3>
        <ChevronDown class="w-4 h-4 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !showHowItWorks }" />
      </button>
      <Transition name="slide">
        <div v-if="showHowItWorks" class="mt-4 space-y-3">
          <div class="grid md:grid-cols-3 gap-3">
            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-bd-green/30 text-bd-green text-xs font-bold flex items-center justify-center">1</span>
                <span class="text-sm font-semibold text-bd-text-primary">Choose Scripts</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Select scripts from the library or paste in custom code.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-bd-blue/30 text-bd-blue text-xs font-bold flex items-center justify-center">2</span>
                <span class="text-sm font-semibold text-bd-text-primary">Set Order</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Arrange execution order. Scripts run top to bottom each turn.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-5 h-5 rounded-full bg-bd-purple/30 text-bd-purple text-xs font-bold flex items-center justify-center">3</span>
                <span class="text-sm font-semibold text-bd-text-primary">Copy & Paste</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Copy each generated file into AI Dungeon's script editor.</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <p class="text-xs text-bd-text-secondary">
              <strong class="text-bd-text-primary">How it works:</strong> The builder uses the
              <strong class="text-bd-emerald">library-centric hook pattern</strong> to consolidate all scripts into the Library file.
              Each lifecycle file (Input, Context, Output) simply calls a dispatcher that runs every script in order.
              This means you never need to manually merge scripts again.
            </p>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Main Builder Grid -->
    <div class="grid lg:grid-cols-[1fr_1fr] gap-6">
      <!-- Left: Script Selection & List -->
      <div class="space-y-4">
        <!-- Add Script Section -->
        <div class="card space-y-4">
          <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
            <Plus class="w-4 h-4 text-bd-green" />
            Add Scripts
          </h3>

          <!-- Tab Toggle: Library / Custom -->
          <div class="flex gap-1 p-1 rounded-lg bg-bd-bg-tertiary">
            <button
              @click="addMode = 'library'"
              class="flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="addMode === 'library'
                ? 'bg-bd-bg-primary text-bd-text-primary shadow-sm'
                : 'text-bd-text-muted hover:text-bd-text-secondary'"
            >
              <Library class="w-3.5 h-3.5 inline mr-1" />
              From Library
            </button>
            <button
              @click="addMode = 'custom'"
              class="flex-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="addMode === 'custom'
                ? 'bg-bd-bg-primary text-bd-text-primary shadow-sm'
                : 'text-bd-text-muted hover:text-bd-text-secondary'"
            >
              <FileCode class="w-3.5 h-3.5 inline mr-1" />
              Custom Script
            </button>
          </div>

          <!-- Library Mode: Search & Select -->
          <div v-if="addMode === 'library'" class="space-y-3">
            <div class="relative">
              <input
                v-model="librarySearch"
                type="text"
                placeholder="Search scripts..."
                class="input text-sm w-full pl-9"
              />
              <Search class="w-4 h-4 text-bd-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <div class="max-h-72 overflow-y-auto space-y-1 pr-1">
              <button
                v-for="script in filteredLibraryScripts"
                :key="script.id"
                @click="addLibraryScript(script)"
                class="w-full text-left p-3 rounded-lg border transition-all group"
                :class="isScriptAdded(script.id)
                  ? 'bg-bd-green/5 border-bd-green/30 cursor-default'
                  : 'bg-bd-bg-primary border-bd-border-subtle hover:border-bd-cyan/40 hover:bg-bd-cyan/5 cursor-pointer'"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <span class="text-sm font-medium text-bd-text-primary truncate">{{ script.name }}</span>
                      <span v-if="isHookPattern(script)" class="tag text-[9px] bg-bd-emerald/20 text-bd-emerald">Hook</span>
                      <span v-if="script.files" class="tag text-[9px] bg-bd-amber/20 text-bd-amber">Multi-file</span>
                      <span v-else-if="script.fileType" class="tag text-[9px]" :class="fileTypeBadgeClass(script.fileType)">{{ script.fileType }}</span>
                    </div>
                    <p class="text-[11px] text-bd-text-muted truncate">{{ script.description }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <Check v-if="isScriptAdded(script.id)" class="w-4 h-4 text-bd-green" />
                    <Plus v-else class="w-4 h-4 text-bd-text-muted group-hover:text-bd-cyan transition-colors" />
                  </div>
                </div>
              </button>
              <div v-if="filteredLibraryScripts.length === 0" class="text-center py-6 text-sm text-bd-text-muted">
                No scripts match your search
              </div>
            </div>
          </div>

          <!-- Custom Mode: Paste Code -->
          <div v-if="addMode === 'custom'" class="space-y-3">
            <div>
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
                Function Name
              </label>
              <input
                v-model="customName"
                type="text"
                placeholder="MyCustomScript"
                class="input text-sm w-full"
              />
              <p class="text-[10px] text-bd-text-muted mt-1">
                Must be unique. Used as <code class="text-bd-cyan">globalThis.{{ customName || 'MyScript' }}</code>
              </p>
            </div>
            <div>
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
                Hook Type
              </label>
              <div class="flex gap-1.5">
                <button
                  v-for="ht in hookTypes"
                  :key="ht.id"
                  @click="customHookType = ht.id"
                  class="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
                  :class="customHookType === ht.id
                    ? `${ht.activeClass}`
                    : 'bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary'"
                >
                  {{ ht.label }}
                </button>
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
                Script Code
                <span class="text-bd-text-muted font-normal normal-case ml-1">(paste your code)</span>
              </label>
              <textarea
                v-model="customCode"
                rows="8"
                placeholder="// Paste your script code here...&#10;// It will be wrapped in a globalThis function automatically."
                class="input text-sm w-full resize-y font-mono"
              />
            </div>
            <button
              @click="addCustomScript"
              class="btn btn-primary text-sm w-full"
              :disabled="!customName.trim() || !customCode.trim()"
            >
              <Plus class="w-4 h-4" />
              Add Custom Script
            </button>
          </div>
        </div>

        <!-- Script List (Execution Order) -->
        <div class="card space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <GitMerge class="w-4 h-4 text-bd-purple" />
              Execution Order
            </h3>
            <span class="text-xs text-bd-text-muted">{{ currentEntries.length }} script{{ currentEntries.length === 1 ? '' : 's' }}</span>
          </div>

          <!-- Pipeline Visualization -->
          <div v-if="currentEntries.length > 0" class="flex flex-wrap items-center gap-1.5 text-[10px] p-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <span class="px-2 py-0.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-muted">Input</span>
            <span class="text-bd-text-muted">→</span>
            <span class="px-2 py-0.5 rounded bg-bd-cyan/20 border border-bd-cyan/30 text-bd-cyan font-semibold">Dispatcher</span>
            <template v-for="(entry, i) in currentEntries" :key="entry.id">
              <span class="text-bd-text-muted">→</span>
              <span class="px-2 py-0.5 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-medium">{{ entry.functionName || entry.name }}</span>
            </template>
          </div>

          <!-- Sortable Script List -->
          <div v-if="currentEntries.length > 0" class="space-y-2">
            <div
              v-for="(entry, index) in currentEntries"
              :key="entry.id"
              class="p-3 rounded-lg border bg-bd-bg-tertiary border-bd-border-subtle hover:border-bd-border-default transition-all group"
            >
              <div class="flex items-center gap-2">
                <!-- Reorder -->
                <div class="flex flex-col gap-0.5 text-bd-text-muted">
                  <button
                    @click="moveEntry(index, -1)"
                    :disabled="index === 0"
                    class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronUp class="w-3 h-3" />
                  </button>
                  <button
                    @click="moveEntry(index, 1)"
                    :disabled="index === currentEntries.length - 1"
                    class="p-0.5 hover:text-bd-text-primary disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronDown class="w-3 h-3" />
                  </button>
                </div>

                <!-- Order Number -->
                <span class="w-6 h-6 rounded-md bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {{ index + 1 }}
                </span>

                <!-- Info -->
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-sm font-medium text-bd-text-primary truncate">{{ entry.name }}</span>
                    <span v-if="entry.type === 'custom'" class="tag text-[9px] bg-bd-amber/20 text-bd-amber">Custom</span>
                    <span v-else class="tag text-[9px] bg-bd-cyan/20 text-bd-cyan">Library</span>
                  </div>
                  <p class="text-[10px] text-bd-text-muted font-mono truncate">
                    globalThis.{{ entry.functionName }}
                  </p>
                </div>

                <!-- Remove -->
                <button
                  @click="handleRemoveEntry(entry.id)"
                  class="p-1 rounded text-bd-text-muted hover:text-bd-error hover:bg-bd-error/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-8 border-2 border-dashed border-bd-border-subtle rounded-lg">
            <Blocks class="w-8 h-8 text-bd-text-muted mx-auto mb-2" />
            <p class="text-sm text-bd-text-muted">No scripts added yet</p>
            <p class="text-xs text-bd-text-muted mt-1">Choose scripts from the library or paste custom code</p>
          </div>

          <!-- Save Build & Clear -->
          <div v-if="currentEntries.length > 0" class="space-y-3 pt-2 border-t border-bd-border-subtle">
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
            <button
              @click="handleClearAll"
              class="w-full text-xs text-bd-text-muted hover:text-bd-error transition-colors py-1"
            >
              Clear All Scripts
            </button>
          </div>
        </div>
      </div>

      <!-- Right: Generated Output -->
      <div class="space-y-4">
        <div class="card space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <FileCode class="w-4 h-4 text-bd-green" />
              Generated Scripts
            </h3>
            <button
              v-if="currentEntries.length > 0"
              @click="copyAllFiles"
              class="btn btn-primary text-sm"
            >
              <Clipboard class="w-4 h-4" />
              {{ copiedAll ? 'Copied All!' : 'Copy All' }}
            </button>
          </div>

          <!-- No scripts state -->
          <div v-if="currentEntries.length === 0" class="text-center py-12 border-2 border-dashed border-bd-border-subtle rounded-lg">
            <Code class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
            <p class="text-sm text-bd-text-muted">Add scripts to see the generated output</p>
          </div>

          <!-- Output Tabs & Code -->
          <template v-else>
            <!-- File Tabs -->
            <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
              <button
                v-for="tab in outputTabs"
                :key="tab.id"
                @click="activeOutputTab = tab.id"
                class="px-3 py-1.5 rounded-t-lg text-xs font-medium transition-all flex items-center gap-1.5"
                :class="activeOutputTab === tab.id
                  ? `${tab.activeClass} border-b-2`
                  : 'text-bd-text-muted hover:text-bd-text-secondary'"
              >
                <span class="text-sm">{{ tab.icon }}</span>
                {{ tab.label }}
              </button>
            </div>

            <!-- Generated Code Display -->
            <div class="relative">
              <button
                @click="copySingleFile(activeOutputTab)"
                class="absolute top-2 right-2 btn btn-secondary text-xs py-1 px-2"
                style="z-index: 1"
              >
                {{ copiedFile === activeOutputTab ? '✓ Copied!' : '📋 Copy' }}
              </button>
              <pre class="code-block-scrollable whitespace-pre-wrap text-xs max-h-[600px] overflow-y-auto">{{ generatedFiles[activeOutputTab] }}</pre>
            </div>

            <!-- File Summary -->
            <div class="grid grid-cols-4 gap-2">
              <div
                v-for="tab in outputTabs"
                :key="'summary-' + tab.id"
                class="p-2 rounded-lg text-center cursor-pointer transition-all"
                :class="activeOutputTab === tab.id
                  ? `${tab.summaryActiveClass}`
                  : 'bg-bd-bg-tertiary hover:bg-bd-bg-primary'"
                @click="activeOutputTab = tab.id"
              >
                <span class="text-lg block">{{ tab.icon }}</span>
                <span class="text-[10px] font-medium block" :class="activeOutputTab === tab.id ? tab.summaryTextClass : 'text-bd-text-muted'">{{ tab.label }}</span>
                <span class="text-[9px] text-bd-text-muted">{{ getFileLineCount(tab.id) }} lines</span>
              </div>
            </div>
          </template>
        </div>

        <!-- Paste Instructions -->
        <div v-if="currentEntries.length > 0" class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-3">
            <Lightbulb class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-bd-text-primary mb-1">How to Use</h4>
              <ol class="text-sm text-bd-text-secondary space-y-1">
                <li>1. Open your AI Dungeon scenario's <strong>Script Editor</strong></li>
                <li>2. Paste the <strong class="text-bd-purple">Library</strong> file into the Library tab</li>
                <li>3. Paste the <strong class="text-bd-green">Input</strong> file into the Input tab</li>
                <li>4. Paste the <strong class="text-bd-blue">Context</strong> file into the Context tab</li>
                <li>5. Paste the <strong class="text-bd-amber">Output</strong> file into the Output tab</li>
              </ol>
              <p class="text-xs text-bd-text-muted mt-2">
                That's it! All {{ currentEntries.length }} script{{ currentEntries.length === 1 ? '' : 's' }} will run together automatically.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, inject } from 'vue'
import {
  Blocks, FolderOpen, Trash2, HelpCircle, ChevronDown, ChevronUp,
  Plus, Check, X, Library, FileCode, Search, GitMerge, Save,
  Clipboard, Code, Lightbulb
} from 'lucide-vue-next'
import { usePreferences } from '@/composables/usePreferences'
import {
  getBuilderCompatibleScripts,
  isHookPatternScript,
  getScriptFunctionName,
  convertToHookPattern,
  toPascalCase
} from '@/data/scripts'

const toast = inject('toast', () => {})

const {
  preferences,
  addMultiscriptEntry,
  removeMultiscriptEntry,
  reorderMultiscriptEntries,
  clearMultiscriptEntries,
  saveMultiscriptBuild,
  loadMultiscriptBuild,
  deleteMultiscriptBuild
} = usePreferences()

// ============================================
// STATE
// ============================================

const addMode = ref('library')
const librarySearch = ref('')
const showHowItWorks = ref(false)
const showSavedBuilds = ref(false)
const savedBuildsDropdown = ref(null)
const buildName = ref('')

// Custom script form
const customName = ref('')
const customCode = ref('')
const customHookType = ref('library')

// Output tabs
const activeOutputTab = ref('library')
const copiedFile = ref(null)
const copiedAll = ref(false)

const hookTypes = [
  { id: 'library', label: 'Full Library', activeClass: 'bg-bd-purple/20 text-bd-purple' },
  { id: 'input', label: 'Input', activeClass: 'bg-bd-green/20 text-bd-green' },
  { id: 'context', label: 'Context', activeClass: 'bg-bd-blue/20 text-bd-blue' },
  { id: 'output', label: 'Output', activeClass: 'bg-bd-amber/20 text-bd-amber' }
]

const outputTabs = [
  { id: 'library', label: 'Library', icon: '📚', activeClass: 'text-bd-purple border-bd-purple', summaryActiveClass: 'bg-bd-purple/10 border border-bd-purple/30', summaryTextClass: 'text-bd-purple' },
  { id: 'input', label: 'Input', icon: '➡️', activeClass: 'text-bd-green border-bd-green', summaryActiveClass: 'bg-bd-green/10 border border-bd-green/30', summaryTextClass: 'text-bd-green' },
  { id: 'context', label: 'Context', icon: '🧠', activeClass: 'text-bd-blue border-bd-blue', summaryActiveClass: 'bg-bd-blue/10 border border-bd-blue/30', summaryTextClass: 'text-bd-blue' },
  { id: 'output', label: 'Output', icon: '⬅️', activeClass: 'text-bd-amber border-bd-amber', summaryActiveClass: 'bg-bd-amber/10 border border-bd-amber/30', summaryTextClass: 'text-bd-amber' }
]

// ============================================
// COMPUTED
// ============================================

const currentEntries = computed(() => preferences.value.currentMultiscriptEntries || [])
const savedBuilds = computed(() => preferences.value.savedMultiscriptBuilds || [])

const allLibraryScripts = computed(() => getBuilderCompatibleScripts())

const filteredLibraryScripts = computed(() => {
  let scripts = allLibraryScripts.value
  if (librarySearch.value.trim()) {
    const q = librarySearch.value.toLowerCase()
    scripts = scripts.filter(s =>
      (s.name || '').toLowerCase().includes(q) ||
      (s.description || '').toLowerCase().includes(q) ||
      (s.tags || []).some(t => t.toLowerCase().includes(q))
    )
  }
  return scripts
})

// Generate the 4 output files
const generatedFiles = computed(() => {
  const entries = currentEntries.value
  if (entries.length === 0) {
    return { library: '', input: '', context: '', output: '' }
  }

  // Collect function names
  const functionNames = entries.map(e => e.functionName)

  // Build the library file
  let libraryParts = []
  libraryParts.push('// ============================================')
  libraryParts.push('// MULTISCRIPT LIBRARY')
  libraryParts.push('// Generated by BetterRepository Multiscript Builder')
  libraryParts.push(`// Scripts: ${functionNames.join(', ')}`)
  libraryParts.push('// ============================================')
  libraryParts.push('')

  // Add each script's library function
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    libraryParts.push(`// --- Script ${i + 1}: ${entry.name} ---`)

    if (entry.type === 'custom') {
      // Custom scripts: wrap the code in a globalThis function
      libraryParts.push(generateCustomHookCode(entry))
    } else {
      // Library scripts: convert to hook pattern
      const script = allLibraryScripts.value.find(s => s.id === entry.scriptId)
      if (script) {
        libraryParts.push(convertToHookPattern(script))
      } else {
        libraryParts.push(`// Script "${entry.name}" not found in library`)
      }
    }
    libraryParts.push('')
  }

  // Add script registry
  libraryParts.push('// --- Script Registry ---')
  libraryParts.push('globalThis.__scripts = [')
  functionNames.forEach((name, i) => {
    libraryParts.push(`  "${name}"${i < functionNames.length - 1 ? ',' : ''}`)
  })
  libraryParts.push('];')
  libraryParts.push('')

  // Add hook dispatcher
  libraryParts.push('// --- Hook Dispatcher ---')
  libraryParts.push('globalThis.__runScripts = function __runScripts(hook) {')
  libraryParts.push('  for (const name of globalThis.__scripts) {')
  libraryParts.push('    const fn = globalThis[name];')
  libraryParts.push('    if (typeof fn === "function") {')
  libraryParts.push('      fn(hook);')
  libraryParts.push('    }')
  libraryParts.push('  }')
  libraryParts.push('};')

  // Generate lifecycle files
  const makeLifecycleFile = (hookName) => {
    const lines = []
    lines.push(`// Generated by BetterRepository Multiscript Builder`)
    lines.push(`const modifier = (text) => {`)
    lines.push(`  globalThis.__runScripts("${hookName}");`)
    lines.push(`  return { text: globalThis.text };`)
    lines.push(`};`)
    lines.push(`modifier(text);`)
    return lines.join('\n')
  }

  return {
    library: libraryParts.join('\n'),
    input: makeLifecycleFile('input'),
    context: makeLifecycleFile('context'),
    output: makeLifecycleFile('output')
  }
})

// ============================================
// METHODS
// ============================================

const isScriptAdded = (scriptId) => {
  return currentEntries.value.some(e => e.scriptId === scriptId)
}

const isHookPattern = (script) => {
  return isHookPatternScript(script)
}

const fileTypeBadgeClass = (fileType) => {
  const map = {
    'input': 'bg-bd-green/20 text-bd-green',
    'context': 'bg-bd-blue/20 text-bd-blue',
    'output': 'bg-bd-amber/20 text-bd-amber',
    'library': 'bg-bd-purple/20 text-bd-purple'
  }
  return map[fileType] || 'bg-bd-tag-bg text-bd-text-muted'
}

const addLibraryScript = (script) => {
  if (isScriptAdded(script.id)) return
  const fnName = getScriptFunctionName(script)
  addMultiscriptEntry({
    scriptId: script.id,
    name: script.name,
    functionName: fnName,
    type: 'library'
  })
  toast(`Added "${script.name}"`, 'success')
}

const addCustomScript = () => {
  if (!customName.value.trim() || !customCode.value.trim()) return
  const fnName = toPascalCase(customName.value)
  if (!fnName) {
    toast('Please enter a valid function name', 'error')
    return
  }
  // Check for duplicate function names
  if (currentEntries.value.some(e => e.functionName === fnName)) {
    toast(`A script with function name "${fnName}" already exists`, 'error')
    return
  }
  addMultiscriptEntry({
    name: customName.value.trim(),
    functionName: fnName,
    type: 'custom',
    code: JSON.stringify({
      hookType: customHookType.value,
      content: customCode.value
    })
  })
  toast(`Added custom script "${customName.value}"`, 'success')
  customName.value = ''
  customCode.value = ''
  customHookType.value = 'library'
}

const generateCustomHookCode = (entry) => {
  try {
    const data = JSON.parse(entry.code)
    const fnName = entry.functionName
    const content = data.content || ''
    const hookType = data.hookType || 'library'

    if (hookType === 'library') {
      // Full library code - wrap in globalThis function
      return `globalThis.${fnName} = function ${fnName}(hook) {\n"use strict";\n\n${content.split('\n').map(l => `  ${l}`).join('\n')}\n};`
    }

    // Single hook type
    const body = content.trim()
    return `globalThis.${fnName} = function ${fnName}(hook) {\n"use strict";\n\n  // -------- hook: ${hookType} --------\n  if (hook === "${hookType}") {\n${body.split('\n').map(l => `    ${l}`).join('\n')}\n    return;\n  }\n};`
  } catch {
    return `// Error parsing custom script "${entry.name}"`
  }
}

const handleRemoveEntry = (entryId) => {
  removeMultiscriptEntry(entryId)
}

const moveEntry = (index, direction) => {
  const newIndex = index + direction
  if (newIndex >= 0 && newIndex < currentEntries.value.length) {
    reorderMultiscriptEntries(index, newIndex)
  }
}

const handleClearAll = () => {
  if (confirm('Clear all scripts? This cannot be undone.')) {
    clearMultiscriptEntries()
  }
}

// Build management
const handleSaveBuild = () => {
  if (currentEntries.value.length === 0) return
  saveMultiscriptBuild(buildName.value)
  buildName.value = ''
  toast('Build saved!', 'success')
}

const handleLoadBuild = (buildId) => {
  loadMultiscriptBuild(buildId)
  showSavedBuilds.value = false
  toast('Build loaded!', 'success')
}

const handleDeleteBuild = (buildId) => {
  if (confirm('Delete this saved build?')) {
    deleteMultiscriptBuild(buildId)
  }
}

// Copy functions
const copySingleFile = async (fileType) => {
  try {
    await navigator.clipboard.writeText(generatedFiles.value[fileType])
    copiedFile.value = fileType
    toast(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} file copied!`, 'success')
    setTimeout(() => { copiedFile.value = null }, 2000)
  } catch {
    toast('Failed to copy', 'error')
  }
}

const copyAllFiles = async () => {
  try {
    const allContent = [
      '// ============================',
      '// LIBRARY FILE',
      '// ============================',
      generatedFiles.value.library,
      '',
      '// ============================',
      '// INPUT FILE',
      '// ============================',
      generatedFiles.value.input,
      '',
      '// ============================',
      '// CONTEXT FILE',
      '// ============================',
      generatedFiles.value.context,
      '',
      '// ============================',
      '// OUTPUT FILE',
      '// ============================',
      generatedFiles.value.output
    ].join('\n')
    await navigator.clipboard.writeText(allContent)
    copiedAll.value = true
    toast('All files copied to clipboard!', 'success')
    setTimeout(() => { copiedAll.value = false }, 2000)
  } catch {
    toast('Failed to copy', 'error')
  }
}

const getFileLineCount = (fileType) => {
  const content = generatedFiles.value[fileType]
  if (!content) return 0
  return content.split('\n').length
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
