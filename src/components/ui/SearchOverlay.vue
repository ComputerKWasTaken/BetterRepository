<template>
  <Teleport to="body">
    <Transition name="overlay">
      <div 
        v-if="isOpen"
        class="fixed inset-0 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4"
        style="z-index: var(--bd-z-modal)"
      >
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="close"
        />

        <!-- Search panel -->
        <div 
          ref="panelRef"
          class="relative w-full max-w-lg bg-bd-bg-secondary border border-bd-border-default rounded-xl shadow-xl overflow-hidden animate-scaleIn"
        >
          <!-- Search input -->
          <div class="relative border-b border-bd-border-subtle">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bd-text-muted pointer-events-none" />
            <input
              ref="inputRef"
              v-model="searchState.query.value"
              type="text"
              placeholder="Search all resources..."
              class="w-full bg-transparent pl-12 pr-20 py-4 text-bd-text-primary placeholder-bd-text-muted focus:outline-none text-base"
              @keydown.escape="close"
              @keydown.down.prevent="navigateList(1)"
              @keydown.up.prevent="navigateList(-1)"
              @keydown.enter.prevent="selectHighlighted"
            />
            <!-- Loading spinner -->
            <div v-if="searchState.isSearching.value" class="absolute right-14 top-1/2 -translate-y-1/2">
              <div class="w-4 h-4 border-2 border-bd-accent-primary/30 border-t-bd-accent-primary rounded-full animate-spin" />
            </div>
            <!-- Shortcut hint / close -->
            <button
              @click="close"
              class="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-medium text-bd-text-muted bg-bd-bg-tertiary border border-bd-border-subtle hover:text-bd-text-secondary transition-colors"
            >
              ESC
            </button>
          </div>

          <!-- Results area -->
          <div class="max-h-[360px] overflow-y-auto search-overlay-scroll">
            <!-- Results -->
            <template v-if="searchState.hasQuery.value && searchState.results.value.totalCount > 0">
              <div
                v-for="group in searchState.results.value.groups"
                :key="group.id"
                class="border-b border-bd-border-subtle last:border-b-0"
              >
                <!-- Group header -->
                <div class="px-4 py-2 bg-bd-bg-primary/50 flex items-center gap-2">
                  <component :is="getGroupIcon(group.icon)" class="w-3.5 h-3.5" :class="'text-' + group.color" />
                  <span class="text-xs font-semibold text-bd-text-secondary">{{ group.label }}</span>
                  <span v-if="group.sublabel" class="text-[10px] text-bd-text-muted">· {{ group.sublabel }}</span>
                  <span class="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-medium" :class="'bg-' + group.color + '/15 text-' + group.color">
                    {{ group.totalMatches }}
                  </span>
                </div>

                <!-- Group results -->
                <div class="py-1">
                  <button
                    v-for="(result, rIdx) in group.results"
                    :key="result.id"
                    :ref="el => setItemRef(group.id, rIdx, el)"
                    @click="navigateToResult(group, result)"
                    @mouseenter="setHighlight(group.id, rIdx)"
                    class="w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors group/item"
                    :class="isHighlighted(group.id, rIdx) ? 'bg-bd-bg-tertiary' : 'hover:bg-bd-bg-tertiary'"
                  >
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium text-bd-text-primary group-hover/item:text-bd-accent-light transition-colors truncate">
                          {{ result.name }}
                        </span>
                        <span v-if="result.difficulty" class="text-[10px] px-1.5 py-0.5 rounded-full" :class="difficultyClass(result.difficulty)">
                          {{ result.difficulty }}
                        </span>
                      </div>
                      <p v-if="result.description" class="text-xs text-bd-text-muted mt-0.5 line-clamp-1">
                        {{ result.description }}
                      </p>
                    </div>
                    <ChevronRight class="w-3.5 h-3.5 text-bd-text-muted group-hover/item:text-bd-accent-primary flex-shrink-0 mt-1 transition-colors" />
                  </button>
                </div>

                <!-- View all link -->
                <button
                  v-if="group.totalMatches > group.results.length"
                  @click="navigateToPage(group)"
                  class="w-full text-center py-2 text-xs font-medium text-bd-accent-primary hover:text-bd-accent-light hover:bg-bd-bg-tertiary transition-colors border-t border-bd-border-subtle"
                >
                  View all {{ group.totalMatches }} {{ group.sublabel?.toLowerCase() || 'results' }} →
                </button>
              </div>
            </template>

            <!-- Empty state -->
            <div v-else-if="searchState.hasQuery.value && !searchState.isSearching.value" class="px-6 py-10 text-center">
              <Search class="w-8 h-8 text-bd-text-muted mx-auto mb-2 opacity-50" />
              <p class="text-sm text-bd-text-muted">No results for "<span class="text-bd-text-secondary">{{ searchState.query.value }}</span>"</p>
              <p class="text-xs text-bd-text-muted mt-1">Try a different search term</p>
            </div>

            <!-- Initial state (no query) -->
            <div v-else-if="!searchState.hasQuery.value" class="px-6 py-8 text-center">
              <p class="text-sm text-bd-text-muted">Search across AI Instructions, Plot Components, Story Cards, and Scripts</p>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-4 py-2.5 border-t border-bd-border-subtle flex items-center justify-between text-[10px] text-bd-text-muted">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1"><kbd class="kbd">↑↓</kbd> navigate</span>
              <span class="flex items-center gap-1"><kbd class="kbd">↵</kbd> select</span>
              <span class="flex items-center gap-1"><kbd class="kbd">esc</kbd> close</span>
            </div>
            <span v-if="searchState.results.value.totalCount > 0" class="text-bd-text-muted">
              {{ searchState.results.value.totalCount }} result{{ searchState.results.value.totalCount === 1 ? '' : 's' }}
            </span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGlobalSearch } from '@/composables/useGlobalSearch'
import { Search, ChevronRight, ScrollText, Layers, Bookmark, Drama, Code } from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const router = useRouter()
const searchState = useGlobalSearch({ debounceMs: 150, maxPerGroup: 4 })
const inputRef = ref(null)
const panelRef = ref(null)

// --- Keyboard list navigation ---
const highlightGroupId = ref(null)
const highlightIdx = ref(-1)
const itemRefs = {}

const setItemRef = (groupId, idx, el) => {
  const key = `${groupId}-${idx}`
  if (el) itemRefs[key] = el
}

const isHighlighted = (groupId, idx) => {
  return highlightGroupId.value === groupId && highlightIdx.value === idx
}

const setHighlight = (groupId, idx) => {
  highlightGroupId.value = groupId
  highlightIdx.value = idx
}

// Build flat list of navigable items from current results
const getFlatItems = () => {
  const items = []
  for (const group of searchState.results.value.groups) {
    for (let i = 0; i < group.results.length; i++) {
      items.push({ groupId: group.id, idx: i, group, result: group.results[i] })
    }
  }
  return items
}

const navigateList = (direction) => {
  const flat = getFlatItems()
  if (flat.length === 0) return

  // Find current position
  const currentPos = flat.findIndex(
    item => item.groupId === highlightGroupId.value && item.idx === highlightIdx.value
  )

  let nextPos
  if (currentPos === -1) {
    nextPos = direction > 0 ? 0 : flat.length - 1
  } else {
    nextPos = (currentPos + direction + flat.length) % flat.length
  }

  const next = flat[nextPos]
  highlightGroupId.value = next.groupId
  highlightIdx.value = next.idx

  // Scroll highlighted item into view
  const key = `${next.groupId}-${next.idx}`
  if (itemRefs[key]) {
    itemRefs[key].scrollIntoView({ block: 'nearest' })
  }
}

const selectHighlighted = () => {
  const flat = getFlatItems()
  const current = flat.find(
    item => item.groupId === highlightGroupId.value && item.idx === highlightIdx.value
  )
  if (current) {
    navigateToResult(current.group, current.result)
  }
}

// Reset highlight when results change
watch(() => searchState.results.value, () => {
  highlightGroupId.value = null
  highlightIdx.value = -1
})

// --- Icon map ---
const iconMap = { ScrollText, Layers, Bookmark, Drama, Code }
const getGroupIcon = (name) => iconMap[name] || Search

// --- Difficulty badges ---
const difficultyClass = (diff) => {
  const map = {
    beginner: 'bg-bd-green/15 text-bd-green',
    intermediate: 'bg-bd-amber/15 text-bd-amber',
    advanced: 'bg-bd-pink/15 text-bd-pink',
  }
  return map[diff] || 'bg-bd-tag-bg text-bd-text-muted'
}

// --- Navigation ---
const navigateToResult = (group, result) => {
  close()
  router.push({ 
    path: group.route, 
    query: { q: searchState.query.value, tab: group.tabHint } 
  })
}

const navigateToPage = (group) => {
  close()
  router.push({ 
    path: group.route, 
    query: { q: searchState.query.value, tab: group.tabHint } 
  })
}

// --- Open / close ---
const close = () => {
  emit('close')
}

// Auto-focus input and lock body scroll when opened
watch(() => props.isOpen, async (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    searchState.clearSearch()
    highlightGroupId.value = null
    highlightIdx.value = -1
    await nextTick()
    inputRef.value?.focus()
  } else {
    // Only unlock if sidebar is not open (requires coordination with sidebar state)
    // For now, emit an event or use a global scroll lock manager
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* === Overlay transitions === */
.overlay-enter-active {
  transition: opacity 0.2s ease;
}
.overlay-leave-active {
  transition: opacity 0.15s ease;
}
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

/* === Keyboard hint badges === */
.kbd {
  display: inline-block;
  padding: 0.05rem 0.35rem;
  border-radius: 0.25rem;
  font-family: var(--bd-font-mono);
  font-size: 10px;
  background: var(--bd-bg-tertiary);
  border: 1px solid var(--bd-border-subtle);
  line-height: 1.4;
}

/* === Results scrollbar === */
.search-overlay-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--bd-bg-elevated) transparent;
}

.search-overlay-scroll::-webkit-scrollbar {
  width: 4px;
}

.search-overlay-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.search-overlay-scroll::-webkit-scrollbar-thumb {
  background: var(--bd-bg-elevated);
  border-radius: 4px;
}
</style>
