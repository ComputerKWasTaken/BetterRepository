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
              <p class="text-xs text-bd-text-secondary">Select scripts from the library, add your own custom scripts, or create new ones.</p>
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
              <p class="text-xs text-bd-text-secondary">Copy the generated Library file and the static hook files into AI Dungeon.</p>
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
    <div class="grid lg:grid-cols-[1fr_1fr] gap-6 overflow-hidden">
      <!-- Left: Script Selection & List -->
      <div class="space-y-4 min-w-0">
        <!-- Add Script Section -->
        <div class="card space-y-4">
          <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
            <Plus class="w-4 h-4 text-bd-green" />
            Add Scripts
          </h3>

          <!-- Tab Toggle: Library / Your Scripts / Create New -->
          <div class="flex gap-1 p-1 rounded-lg bg-bd-bg-tertiary">
            <button
              @click="addMode = 'library'"
              class="flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="addMode === 'library'
                ? 'bg-bd-bg-primary text-bd-text-primary shadow-sm'
                : 'text-bd-text-muted hover:text-bd-text-secondary'"
            >
              <Library class="w-3.5 h-3.5 inline mr-1" />
              Library
            </button>
            <button
              @click="addMode = 'yours'"
              class="flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all relative"
              :class="addMode === 'yours'
                ? 'bg-bd-bg-primary text-bd-text-primary shadow-sm'
                : 'text-bd-text-muted hover:text-bd-text-secondary'"
            >
              <User class="w-3.5 h-3.5 inline mr-1" />
              Your Scripts
              <span v-if="savedCustomScripts.length" class="ml-1 px-1 py-0 rounded-full bg-bd-purple/20 text-bd-purple text-[9px]">{{ savedCustomScripts.length }}</span>
            </button>
            <button
              @click="addMode = 'create'"
              class="flex-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all"
              :class="addMode === 'create'
                ? 'bg-bd-bg-primary text-bd-text-primary shadow-sm'
                : 'text-bd-text-muted hover:text-bd-text-secondary'"
            >
              <PenTool class="w-3.5 h-3.5 inline mr-1" />
              Create New
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

          <!-- Your Scripts Mode -->
          <div v-if="addMode === 'yours'" class="space-y-3">
            <div v-if="savedCustomScripts.length === 0" class="text-center py-8 border-2 border-dashed border-bd-border-subtle rounded-lg">
              <User class="w-8 h-8 text-bd-text-muted mx-auto mb-2" />
              <p class="text-sm text-bd-text-muted">No custom scripts saved yet</p>
              <p class="text-xs text-bd-text-muted mt-1">Use the "Create New" tab to build and save a script</p>
            </div>
            <div v-else class="max-h-72 overflow-y-auto space-y-1 pr-1">
              <div
                v-for="cs in savedCustomScripts"
                :key="cs.id"
                class="p-3 rounded-lg border bg-bd-bg-primary border-bd-border-subtle hover:border-bd-purple/40 transition-all group"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-1.5 mb-0.5">
                      <span class="text-sm font-medium text-bd-text-primary truncate">{{ cs.name }}</span>
                      <span class="tag text-[9px] bg-bd-purple/20 text-bd-purple">Custom</span>
                    </div>
                    <div class="flex items-center gap-1 mt-0.5">
                      <span v-for="hook in getActiveHooks(cs)" :key="hook" class="tag text-[8px]" :class="hookBadgeClass(hook)">
                        {{ hook }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      @click="addCustomScriptToBuild(cs)"
                      :disabled="isCustomScriptAdded(cs.id)"
                      class="p-1 rounded transition-colors"
                      :class="isCustomScriptAdded(cs.id) ? 'text-bd-green cursor-default' : 'text-bd-text-muted hover:text-bd-cyan hover:bg-bd-cyan/10'"
                      :title="isCustomScriptAdded(cs.id) ? 'Already added' : 'Add to build'"
                    >
                      <Check v-if="isCustomScriptAdded(cs.id)" class="w-3.5 h-3.5" />
                      <Plus v-else class="w-3.5 h-3.5" />
                    </button>
                    <button
                      @click="editCustomScript(cs)"
                      class="p-1 rounded text-bd-text-muted hover:text-bd-amber hover:bg-bd-amber/10 transition-colors"
                      title="Edit"
                    >
                      <Pencil class="w-3.5 h-3.5" />
                    </button>
                    <button
                      @click="handleDeleteCustomScript(cs.id)"
                      class="p-1 rounded text-bd-text-muted hover:text-bd-error hover:bg-bd-error/10 transition-colors"
                      title="Delete"
                    >
                      <Trash2 class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Create New Custom Script Mode -->
          <div v-if="addMode === 'create'" class="space-y-4">
            <div>
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
                Script Name
              </label>
              <input
                v-model="customName"
                type="text"
                placeholder="My Custom Script"
                class="input text-sm w-full"
              />
              <p class="text-[10px] text-bd-text-muted mt-1">
                Will be registered as <code class="text-bd-cyan">globalThis.{{ customFunctionName || 'MyScript' }}</code>
              </p>
            </div>

            <!-- Multi-hook tabs -->
            <div>
              <label class="block text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5">
                Script Code
                <span class="text-bd-text-muted font-normal normal-case ml-1">(add code for each hook your script needs)</span>
              </label>
              <div class="flex gap-0.5 mb-2">
                <button
                  v-for="ht in hookEditorTabs"
                  :key="ht.id"
                  @click="activeCustomHookTab = ht.id"
                  class="px-2.5 py-1 rounded-t-lg text-[11px] font-medium transition-all flex items-center gap-1"
                  :class="activeCustomHookTab === ht.id
                    ? `${ht.activeClass} border-b-2`
                    : 'text-bd-text-muted hover:text-bd-text-secondary'"
                >
                  <span>{{ ht.icon }}</span>
                  {{ ht.label }}
                  <span v-if="customHooks[ht.id]?.trim()" class="w-1.5 h-1.5 rounded-full bg-current"></span>
                </button>
              </div>
              <textarea
                v-model="customHooks[activeCustomHookTab]"
                rows="10"
                :placeholder="hookPlaceholder"
                class="input text-sm w-full resize-y font-mono"
              />
              <p class="text-[10px] text-bd-text-muted mt-1">
                {{ hookHelpText }}
              </p>
            </div>

            <!-- Active hooks summary -->
            <div v-if="activeCustomHookCount > 0" class="flex items-center gap-1.5 text-[11px]">
              <span class="text-bd-text-muted">Active hooks:</span>
              <span v-for="hook in activeCustomHookList" :key="hook" class="tag text-[9px]" :class="hookBadgeClass(hook)">{{ hook }}</span>
            </div>

            <!-- Action buttons -->
            <div class="flex gap-2">
              <button
                @click="handleSaveAndAddCustom"
                class="btn btn-primary text-sm flex-1"
                :disabled="!customName.trim() || activeCustomHookCount === 0"
              >
                <Plus class="w-4 h-4" />
                Save & Add to Build
              </button>
              <button
                @click="handleSaveCustomOnly"
                class="btn btn-secondary text-sm"
                :disabled="!customName.trim() || activeCustomHookCount === 0"
              >
                <Save class="w-4 h-4" />
                Save Only
              </button>
            </div>

            <!-- Editing indicator -->
            <div v-if="editingCustomScriptId" class="flex items-center justify-between p-2 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <span class="text-xs text-bd-amber font-medium">Editing: {{ customName }}</span>
              <button @click="resetCustomEditor" class="text-xs text-bd-text-muted hover:text-bd-text-primary transition-colors">Cancel</button>
            </div>
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
            <span class="px-2 py-0.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-muted">Turn Start</span>
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
                    <template v-if="entry.type === 'custom'">
                      <span class="tag text-[9px] bg-bd-purple/20 text-bd-purple">Custom</span>
                    </template>
                    <template v-else-if="entry.scriptFormat === 'multi-file'">
                      <span class="tag text-[9px] bg-bd-amber/20 text-bd-amber">Multi-file</span>
                    </template>
                    <template v-else-if="entry.scriptFormat">
                      <span class="tag text-[9px]" :class="hookBadgeClass(entry.scriptFormat)">{{ entry.scriptFormat }}</span>
                    </template>
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
            <p class="text-xs text-bd-text-muted mt-1">Choose scripts from the library or create custom ones</p>
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
      <div class="space-y-4 min-w-0">
        <!-- Library Code (Primary Output) -->
        <div class="card space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-bd-purple" />
              Generated Library
              <span class="text-xs font-normal text-bd-text-muted">— paste into AI Dungeon's Library tab</span>
            </h3>
            <button
              v-if="currentEntries.length > 0"
              @click="copySingleFile('library')"
              class="btn btn-primary text-sm"
            >
              <Clipboard class="w-4 h-4" />
              {{ copiedFile === 'library' ? 'Copied!' : 'Copy Library' }}
            </button>
          </div>

          <!-- No scripts state -->
          <div v-if="currentEntries.length === 0" class="text-center py-16 border-2 border-dashed border-bd-border-subtle rounded-lg">
            <Code class="w-10 h-10 text-bd-text-muted mx-auto mb-3" />
            <p class="text-sm text-bd-text-muted">Add scripts to see the generated Library</p>
            <p class="text-xs text-bd-text-muted mt-1">The Library file is where all your combined script code lives</p>
          </div>

          <!-- Library Code Display -->
          <div v-else class="relative">
            <pre class="code-block-scrollable whitespace-pre-wrap text-xs max-h-[600px] overflow-y-auto">{{ generatedFiles.library }}</pre>
          </div>
        </div>

        <!-- Static Hook Files (Secondary) -->
        <div v-if="currentEntries.length > 0" class="card space-y-3">
          <button @click="showStaticFiles = !showStaticFiles" class="w-full flex items-center justify-between text-left">
            <h3 class="text-sm font-semibold text-bd-text-primary flex items-center gap-2">
              <ArrowRightLeft class="w-4 h-4 text-bd-blue" />
              Hook Files
              <span class="text-xs font-normal text-bd-text-muted">— Input, Context, Output</span>
            </h3>
            <ChevronDown class="w-4 h-4 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !showStaticFiles }" />
          </button>
          <Transition name="slide">
            <div v-if="showStaticFiles" class="space-y-3">
              <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-text-primary">These files are always the same</strong> regardless of which scripts you compose.
                  They simply call the dispatcher, which routes each lifecycle hook to the scripts in your Library file. Copy each one into the corresponding tab in AI Dungeon's script editor.
                </p>
              </div>
              <div class="grid gap-2">
                <div v-for="hook in staticHookFiles" :key="hook.id"
                  class="p-3 rounded-lg border transition-all"
                  :class="hook.borderClass"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">{{ hook.icon }}</span>
                      <span class="text-xs font-semibold uppercase tracking-wider" :class="hook.textClass">{{ hook.label }}</span>
                    </div>
                    <button
                      @click="copySingleFile(hook.id)"
                      class="btn btn-secondary text-xs py-1 px-2"
                    >
                      {{ copiedFile === hook.id ? '✓ Copied!' : '📋 Copy' }}
                    </button>
                  </div>
                  <pre class="text-[11px] font-mono text-bd-text-secondary whitespace-pre-wrap leading-relaxed bg-bd-bg-primary rounded p-2">{{ generatedFiles[hook.id] }}</pre>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Paste Instructions -->
        <div v-if="currentEntries.length > 0" class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-3">
            <Lightbulb class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
            <div>
              <h4 class="font-semibold text-bd-text-primary mb-1">How to Use</h4>
              <ol class="text-sm text-bd-text-secondary space-y-1">
                <li>1. Open your AI Dungeon scenario's <strong>Script Editor</strong></li>
                <li>2. Paste the <strong class="text-bd-purple">Library</strong> file (above) into the Library tab</li>
                <li>3. Expand "Hook Files" above and copy each into the matching tab</li>
              </ol>
              <p class="text-xs text-bd-text-muted mt-2">
                All {{ currentEntries.length }} script{{ currentEntries.length === 1 ? '' : 's' }} will run together automatically each turn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, inject } from 'vue'
import {
  Blocks, FolderOpen, Trash2, HelpCircle, ChevronDown, ChevronUp,
  Plus, Check, X, Library, FileCode, Search, GitMerge, Save,
  Clipboard, Code, Lightbulb, BookOpen, ArrowRightLeft, User,
  PenTool, Pencil
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
  deleteMultiscriptBuild,
  saveCustomScript,
  updateCustomScript,
  deleteCustomScript
} = usePreferences()

// ============================================
// STATE
// ============================================

const addMode = ref('library')
const librarySearch = ref('')
const showHowItWorks = ref(false)
const showSavedBuilds = ref(false)
const showStaticFiles = ref(false)
const savedBuildsDropdown = ref(null)
const buildName = ref('')

// Custom script editor
const customName = ref('')
const customHooks = reactive({
  library: '',
  input: '',
  context: '',
  output: ''
})
const activeCustomHookTab = ref('library')
const editingCustomScriptId = ref(null)

// Output
const copiedFile = ref(null)
const copiedAll = ref(false)

const hookEditorTabs = [
  { id: 'library', label: 'Library', icon: '📚', activeClass: 'text-bd-purple border-bd-purple' },
  { id: 'input', label: 'Input', icon: '➡️', activeClass: 'text-bd-green border-bd-green' },
  { id: 'context', label: 'Context', icon: '🧠', activeClass: 'text-bd-blue border-bd-blue' },
  { id: 'output', label: 'Output', icon: '⬅️', activeClass: 'text-bd-amber border-bd-amber' }
]

const staticHookFiles = [
  { id: 'input', label: 'Input', icon: '➡️', borderClass: 'bg-bd-bg-tertiary border-bd-green/30', textClass: 'text-bd-green' },
  { id: 'context', label: 'Context', icon: '🧠', borderClass: 'bg-bd-bg-tertiary border-bd-blue/30', textClass: 'text-bd-blue' },
  { id: 'output', label: 'Output', icon: '⬅️', borderClass: 'bg-bd-bg-tertiary border-bd-amber/30', textClass: 'text-bd-amber' }
]

// ============================================
// COMPUTED
// ============================================

const currentEntries = computed(() => preferences.value.currentMultiscriptEntries || [])
const savedBuilds = computed(() => preferences.value.savedMultiscriptBuilds || [])
const savedCustomScripts = computed(() => preferences.value.savedCustomScripts || [])

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

const customFunctionName = computed(() => toPascalCase(customName.value || ''))

const activeCustomHookCount = computed(() => {
  return Object.values(customHooks).filter(v => v?.trim()).length
})

const activeCustomHookList = computed(() => {
  return Object.entries(customHooks)
    .filter(([_, v]) => v?.trim())
    .map(([k]) => k)
})

const hookPlaceholder = computed(() => {
  const tab = activeCustomHookTab.value
  if (tab === 'library') return '// Shared code that runs once when the library loads.\n// State initialization, helper functions, etc.\n\nstate.myVar = state.myVar ?? 0;'
  if (tab === 'input') return '// Runs when the player submits input.\n// Use text to access the player\'s input.\n\n// Example:\n// if (text.startsWith(":command")) { ... }'
  if (tab === 'context') return '// Runs when the AI builds its context.\n// Modify text to change what the AI sees.\n\n// Example:\n// text = text + "\\nExtra context for the AI."'
  if (tab === 'output') return '// Runs when the AI generates output.\n// Modify text to change the AI\'s response.\n\n// Example:\n// text = text.replace(/badword/gi, "***")'
  return '// Enter your script code here...'
})

const hookHelpText = computed(() => {
  const tab = activeCustomHookTab.value
  if (tab === 'library') return 'Library code runs once when the script loads. Put state init and helpers here. No modifier wrapping needed.'
  if (tab === 'input') return 'Input hook code runs when the player acts. The variable "text" contains the player\'s input.'
  if (tab === 'context') return 'Context hook code runs when the AI builds context. Modify "text" to shape what the AI reads.'
  if (tab === 'output') return 'Output hook code runs after the AI generates its response. Modify "text" to filter or augment the output.'
  return ''
})

// Generate the 4 output files
const generatedFiles = computed(() => {
  const entries = currentEntries.value
  if (entries.length === 0) {
    return { library: '', input: '', context: '', output: '' }
  }

  const functionNames = entries.map(e => e.functionName)

  // Build the library file
  let libraryParts = []
  libraryParts.push('// ============================================')
  libraryParts.push('// MULTISCRIPT LIBRARY')
  libraryParts.push('// Generated by BetterRepository Multiscript Builder')
  libraryParts.push(`// Scripts: ${functionNames.join(', ')}`)
  libraryParts.push('// ============================================')
  libraryParts.push('')

  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i]
    libraryParts.push(`// --- Script ${i + 1}: ${entry.name} ---`)

    if (entry.type === 'custom') {
      libraryParts.push(generateCustomHookCode(entry))
    } else {
      const script = allLibraryScripts.value.find(s => s.id === entry.scriptId)
      if (script) {
        libraryParts.push(convertToHookPattern(script))
      } else {
        libraryParts.push(`// Script "${entry.name}" not found in library`)
      }
    }
    libraryParts.push('')
  }

  // Script registry
  libraryParts.push('// --- Script Registry ---')
  libraryParts.push('globalThis.__scripts = [')
  functionNames.forEach((name, i) => {
    libraryParts.push(`  "${name}"${i < functionNames.length - 1 ? ',' : ''}`)
  })
  libraryParts.push('];')
  libraryParts.push('')

  // Hook dispatcher
  libraryParts.push('// --- Hook Dispatcher ---')
  libraryParts.push('globalThis.__runScripts = function __runScripts(hook) {')
  libraryParts.push('  for (const name of globalThis.__scripts) {')
  libraryParts.push('    const fn = globalThis[name];')
  libraryParts.push('    if (typeof fn === "function") {')
  libraryParts.push('      fn(hook);')
  libraryParts.push('    }')
  libraryParts.push('  }')
  libraryParts.push('};')

  // Static lifecycle files
  const makeLifecycleFile = (hookName) => {
    return [
      `// Generated by BetterRepository Multiscript Builder`,
      `const modifier = (text) => {`,
      `  globalThis.__runScripts("${hookName}");`,
      `  return { text: globalThis.text };`,
      `};`,
      `modifier(text);`
    ].join('\n')
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

const isCustomScriptAdded = (customScriptId) => {
  return currentEntries.value.some(e => e.customScriptId === customScriptId)
}

const isHookPattern = (script) => isHookPatternScript(script)

const fileTypeBadgeClass = (fileType) => {
  const map = {
    'input': 'bg-bd-green/20 text-bd-green',
    'context': 'bg-bd-blue/20 text-bd-blue',
    'output': 'bg-bd-amber/20 text-bd-amber',
    'library': 'bg-bd-purple/20 text-bd-purple',
    'helper': 'bg-bd-cyan/20 text-bd-cyan'
  }
  return map[fileType] || 'bg-bd-tag-bg text-bd-text-muted'
}

const hookBadgeClass = (hook) => {
  const map = {
    'library': 'bg-bd-purple/20 text-bd-purple',
    'input': 'bg-bd-green/20 text-bd-green',
    'context': 'bg-bd-blue/20 text-bd-blue',
    'output': 'bg-bd-amber/20 text-bd-amber',
    'helper': 'bg-bd-cyan/20 text-bd-cyan'
  }
  return map[hook] || 'bg-bd-tag-bg text-bd-text-muted'
}

const getActiveHooks = (customScript) => {
  if (!customScript.hooks) return []
  return Object.entries(customScript.hooks)
    .filter(([_, v]) => v?.trim())
    .map(([k]) => k)
}

// --- Library scripts ---
const getScriptFormat = (script) => {
  if (script.files) return 'multi-file'
  if (script.fileType) return script.fileType
  return 'library'
}

const addLibraryScript = (script) => {
  if (isScriptAdded(script.id)) return
  const fnName = getScriptFunctionName(script)
  addMultiscriptEntry({
    scriptId: script.id,
    name: script.name,
    functionName: fnName,
    type: 'library',
    scriptFormat: getScriptFormat(script)
  })
  toast(`Added "${script.name}"`, 'success')
}

// --- Custom scripts ---
const resetCustomEditor = () => {
  customName.value = ''
  customHooks.library = ''
  customHooks.input = ''
  customHooks.context = ''
  customHooks.output = ''
  activeCustomHookTab.value = 'library'
  editingCustomScriptId.value = null
}

const buildCustomScriptData = () => {
  const fnName = toPascalCase(customName.value)
  if (!fnName) {
    toast('Please enter a valid script name', 'error')
    return null
  }
  return {
    name: customName.value.trim(),
    functionName: fnName,
    hooks: {
      library: customHooks.library || '',
      input: customHooks.input || '',
      context: customHooks.context || '',
      output: customHooks.output || ''
    }
  }
}

const handleSaveAndAddCustom = () => {
  const data = buildCustomScriptData()
  if (!data) return

  let savedId
  if (editingCustomScriptId.value) {
    updateCustomScript(editingCustomScriptId.value, data)
    savedId = editingCustomScriptId.value
    // Update any existing build entries that reference this custom script
    const existingEntry = currentEntries.value.find(e => e.customScriptId === savedId)
    if (existingEntry) {
      // Remove and re-add to get updated code
      removeMultiscriptEntry(existingEntry.id)
    }
    toast(`Updated and added "${data.name}"`, 'success')
  } else {
    savedId = saveCustomScript(data)
    toast(`Saved and added "${data.name}"`, 'success')
  }

  // Add to current build
  addMultiscriptEntry({
    customScriptId: savedId,
    name: data.name,
    functionName: data.functionName,
    type: 'custom',
    code: JSON.stringify(data.hooks)
  })

  resetCustomEditor()
  addMode.value = 'yours'
}

const handleSaveCustomOnly = () => {
  const data = buildCustomScriptData()
  if (!data) return

  if (editingCustomScriptId.value) {
    updateCustomScript(editingCustomScriptId.value, data)
    toast(`Updated "${data.name}"`, 'success')
  } else {
    saveCustomScript(data)
    toast(`Saved "${data.name}" to your scripts`, 'success')
  }

  resetCustomEditor()
  addMode.value = 'yours'
}

const addCustomScriptToBuild = (cs) => {
  if (isCustomScriptAdded(cs.id)) return
  addMultiscriptEntry({
    customScriptId: cs.id,
    name: cs.name,
    functionName: cs.functionName,
    type: 'custom',
    code: JSON.stringify(cs.hooks)
  })
  toast(`Added "${cs.name}"`, 'success')
}

const editCustomScript = (cs) => {
  customName.value = cs.name
  customHooks.library = cs.hooks?.library || ''
  customHooks.input = cs.hooks?.input || ''
  customHooks.context = cs.hooks?.context || ''
  customHooks.output = cs.hooks?.output || ''
  editingCustomScriptId.value = cs.id
  activeCustomHookTab.value = 'library'
  addMode.value = 'create'
}

const handleDeleteCustomScript = (scriptId) => {
  if (confirm('Delete this custom script? It will also be removed from any builds using it.')) {
    deleteCustomScript(scriptId)
    toast('Custom script deleted', 'success')
  }
}

// --- Code generation for custom scripts ---
const generateCustomHookCode = (entry) => {
  try {
    const hooks = JSON.parse(entry.code)
    const fnName = entry.functionName
    const libraryCode = hooks.library?.trim() || ''
    const inputCode = hooks.input?.trim() || ''
    const contextCode = hooks.context?.trim() || ''
    const outputCode = hooks.output?.trim() || ''

    let body = ''

    if (libraryCode) {
      body += `  // --- Shared Library ---\n`
      body += libraryCode.split('\n').map(l => `  ${l}`).join('\n')
      body += '\n\n'
    }

    if (inputCode) {
      body += `  // -------- hook: input --------\n`
      body += `  if (hook === "input") {\n`
      body += inputCode.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }\n\n`
    }

    if (contextCode) {
      body += `  // -------- hook: context --------\n`
      body += `  if (hook === "context") {\n`
      body += contextCode.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }\n\n`
    }

    if (outputCode) {
      body += `  // -------- hook: output --------\n`
      body += `  if (hook === "output") {\n`
      body += outputCode.split('\n').map(l => `    ${l}`).join('\n')
      body += `\n    return;\n  }`
    }

    return `globalThis.${fnName} = function ${fnName}(hook) {\n"use strict";\n\n${body}\n};`
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
  if (confirm('Clear all scripts from the build? This cannot be undone.')) {
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
    const label = fileType.charAt(0).toUpperCase() + fileType.slice(1)
    toast(`${label} file copied!`, 'success')
    setTimeout(() => { copiedFile.value = null }, 2000)
  } catch {
    toast('Failed to copy', 'error')
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
