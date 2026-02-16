<template>
  <div class="space-y-8">
    <!-- Hero Section with animated gradient backdrop -->
    <section class="hero-section relative rounded-2xl py-14 px-6 text-center">
      <!-- Orb container with overflow-hidden so orbs clip without affecting the search dropdown -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
        <div class="hero-orb hero-orb--orange" />
        <div class="hero-orb hero-orb--purple" />
        <div class="hero-orb hero-orb--cyan" />
      </div>

      <!-- Content -->
      <div class="relative z-10">
        <!-- Logo & Branding -->
        <div class="flex items-center justify-center gap-4 mb-5">
          <img 
            src="/betterrepository_logo.png" 
            alt="BetterRepository" 
            class="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg animate-float"
          />
          <div class="text-left">
            <h1 class="text-3xl md:text-4xl font-bold text-bd-text-primary tracking-tight">
              Better<span class="text-gradient">Repository</span>
            </h1>
            <p class="text-sm text-bd-accent-light font-medium tracking-wide mt-0.5">AI Dungeon Resource Hub</p>
          </div>
        </div>

        <p class="text-bd-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          A curated collection of AI Instructions, Plot Components, Story Cards, Scripts, and Guides.
          Everything you need to craft <span class="text-gradient font-semibold">better adventures</span>.
        </p>

        <!-- Quick Search for global search across all collections -->
        <div class="max-w-lg mx-auto relative" ref="searchContainerRef">
          <div class="relative group">
            <div class="absolute -inset-0.5 bg-gradient-to-r from-bd-accent-primary/20 via-bd-purple/20 to-bd-cyan/20 rounded-xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-300" />
            <div class="relative z-[2]">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-[3] pointer-events-none">
                <Search class="w-5 h-5 text-bd-text-muted" />
              </div>
              <input 
                ref="searchInputRef"
                v-model="searchState.query.value"
                type="text"
                placeholder="Search instructions, templates, scripts..."
                class="input pl-12 pr-12 py-3.5 bg-bd-bg-secondary/80 backdrop-blur-card"
                @focus="showResults = true"
                @keydown.escape="showResults = false"
              />
              <!-- Loading spinner -->
              <div v-if="searchState.isSearching.value" class="absolute right-4 top-1/2 -translate-y-1/2">
                <div class="w-4 h-4 border-2 border-bd-accent-primary/30 border-t-bd-accent-primary rounded-full animate-spin" />
              </div>
              <!-- Clear button -->
              <button
                v-else-if="searchState.hasQuery.value"
                @click="handleClearSearch"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary transition-colors"
              >
                <X class="w-4 h-4" />
              </button>
              <!-- Keyboard shortcut hint -->
              <div 
                v-else
                class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none"
              >
                <kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-bd-text-muted bg-bd-bg-tertiary border border-bd-border-subtle">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
                <kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-bd-text-muted bg-bd-bg-tertiary border border-bd-border-subtle">K</kbd>
              </div>
            </div>
          </div>

          <!-- Search Results Dropdown -->
          <Transition name="search-results">
            <div
              v-if="showResults && searchState.hasQuery.value"
              class="search-results-panel absolute left-0 right-0 mt-3 rounded-xl bg-bd-bg-secondary border border-bd-border-default shadow-xl overflow-hidden"
              style="z-index: 50"
            >
              <!-- Results header -->
              <div class="px-4 py-2.5 border-b border-bd-border-subtle flex items-center justify-between">
                <span class="text-xs text-bd-text-muted font-medium uppercase tracking-wider flex items-center gap-1.5">
                  <Search class="w-3 h-3" />
                  <template v-if="searchState.results.value.totalCount > 0">
                    {{ searchState.results.value.totalCount }} result{{ searchState.results.value.totalCount === 1 ? '' : 's' }} across all resources
                  </template>
                  <template v-else-if="!searchState.isSearching.value">
                    No results found
                  </template>
                  <template v-else>
                    Searching...
                  </template>
                </span>
                <button
                  @click="showResults = false"
                  class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary transition-colors"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>

              <!-- Result groups -->
              <div v-if="searchState.results.value.totalCount > 0" class="max-h-[420px] overflow-y-auto search-results-scroll">
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
                      v-for="result in group.results"
                      :key="result.id"
                      @click="navigateToResult(group, result)"
                      class="w-full text-left px-4 py-2.5 flex items-start gap-3 hover:bg-bd-bg-tertiary transition-colors group/item"
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

                  <!-- "View all" link if more results exist -->
                  <button
                    v-if="group.totalMatches > group.results.length"
                    @click="navigateToPage(group)"
                    class="w-full text-center py-2 text-xs font-medium text-bd-accent-primary hover:text-bd-accent-light hover:bg-bd-bg-tertiary transition-colors border-t border-bd-border-subtle"
                  >
                    View all {{ group.totalMatches }} {{ group.sublabel?.toLowerCase() || 'results' }} →
                  </button>
                </div>
              </div>

              <!-- Empty state -->
              <div v-else-if="!searchState.isSearching.value" class="px-6 py-8 text-center">
                <Search class="w-8 h-8 text-bd-text-muted mx-auto mb-2 opacity-50" />
                <p class="text-sm text-bd-text-muted">No results for "<span class="text-bd-text-secondary">{{ searchState.query.value }}</span>"</p>
                <p class="text-xs text-bd-text-muted mt-1">Try a different search term or check your spelling</p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>

    <!-- Resource Categories with gradient accent borders -->
    <section ref="categoriesRef" :class="['home-section', { 'is-visible': visibleSections.categories }]">
      <div class="section-header mb-5">
        <LayoutGrid class="w-4 h-4" />
        <span>Browse Resources</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link 
          v-for="(category, idx) in resourceCategories" 
          :key="category.path"
          :to="category.path"
          class="category-card group"
          :style="{ animationDelay: `${idx * 80}ms` }"
        >
          <!-- Gradient border glow on hover -->
          <div class="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" :class="category.glowClass" />

          <div class="relative bg-bd-bg-secondary rounded-xl p-4 flex items-start gap-4 h-full">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              :class="category.bgClass"
            >
              <component :is="category.icon" class="w-5 h-5" :class="category.iconClass" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-bd-text-primary group-hover:text-bd-accent-light transition-colors">
                  {{ category.name }}
                </h3>
                <span class="tag text-[10px]" :class="category.bgClass + ' ' + category.iconClass">
                  {{ category.count }}
                </span>
              </div>
              <p class="text-sm text-bd-text-secondary mt-1.5 line-clamp-2 leading-relaxed">{{ category.description }}</p>
            </div>
            <ChevronRight class="w-4 h-4 text-bd-text-muted group-hover:text-bd-accent-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1.5" />
          </div>
        </router-link>
      </div>
    </section>

    <!-- Quick Stats with icons and animated entrance -->
    <section ref="statsRef" :class="['home-section', { 'is-visible': visibleSections.stats }]">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(stat, idx) in stats" 
          :key="stat.label" 
          class="card text-center py-5 group hover:border-bd-accent-primary/20 hover:shadow-glow"
          :style="{ animationDelay: `${idx * 100}ms` }"
        >
          <div class="flex items-center justify-center mb-2">
            <component :is="stat.icon" class="w-5 h-5 text-bd-accent-primary opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>
          <div class="text-2xl font-bold text-gradient">{{ stat.value }}</div>
          <div class="text-xs text-bd-text-muted mt-1 font-medium uppercase tracking-wider">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Quick Start Cards with subtle gradient overlays -->
    <section ref="quickStartRef" :class="['home-section', { 'is-visible': visibleSections.quickStart }]">
      <div class="section-header mb-5">
        <Sparkles class="w-4 h-4" />
        <span>Get Started</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- New Users -->
        <div class="card group relative overflow-hidden hover:border-bd-green/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-green/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-green/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-green/25 transition-colors">
                <Lightbulb class="w-5 h-5 text-bd-green" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">New to AI Dungeon?</h3>
            </div>
            <p class="text-sm text-bd-text-secondary mb-4 leading-relaxed">
              Check out the Guides to learn how AI Instructions, Plot Components, Story Cards, and Scripts work.
            </p>
            <router-link to="/guides" class="inline-flex items-center gap-1.5 text-sm font-medium text-bd-green hover:text-bd-green/80 transition-colors">
              Read the Guides
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>

        <!-- Contribute -->
        <div class="card group relative overflow-hidden hover:border-bd-purple/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-purple/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-purple/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-purple/25 transition-colors">
                <GitPullRequest class="w-5 h-5 text-bd-purple" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">Share Your Work</h3>
            </div>
            <p class="text-sm text-bd-text-secondary mb-4 leading-relaxed">
              Read the Guides to learn the ropes, then share your own creations with the community.
            </p>
            <router-link to="/contribute" class="inline-flex items-center gap-1.5 text-sm font-medium text-bd-purple hover:text-bd-purple/80 transition-colors">
              Submit Creation
              <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>
        </div>

        <!-- Discord -->
        <div class="card group relative overflow-hidden hover:border-bd-cyan/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-cyan/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-cyan/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-cyan/25 transition-colors">
                <MessageCircle class="w-5 h-5 text-bd-cyan" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">Join Community</h3>
            </div>
            <p class="text-sm text-bd-text-secondary mb-4 leading-relaxed">
              Connect with other players, share creations, and get help.
            </p>
            <a 
              href="https://discord.com/invite/HB2YBZYjyf" 
              target="_blank"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-bd-cyan hover:text-bd-cyan/80 transition-colors"
            >
              Join Discord
              <ExternalLink class="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Credits Section with refined styling -->
    <section ref="creditsRef" :class="['home-section', { 'is-visible': visibleSections.credits }]">
      <div class="card relative overflow-hidden">
        <!-- Decorative gradient -->
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan" />

        <div class="flex items-center justify-between mb-4 pt-1">
          <div class="flex items-center gap-2.5">
            <Award class="w-5 h-5 text-bd-accent-primary" />
            <h2 class="text-lg font-semibold text-bd-text-primary">Community Contributors</h2>
          </div>
          <router-link to="/credits" class="text-sm text-bd-accent-primary hover:text-bd-accent-light flex items-center gap-1 transition-colors">
            View All
            <ChevronRight class="w-3.5 h-3.5" />
          </router-link>
        </div>

        <p class="text-sm text-bd-text-secondary mb-5 leading-relaxed">
          BetterRepository is built on the work of amazing community members who created guides, resources, and knowledge.
        </p>

        <!-- Major Contributors Highlight -->
        <div class="flex flex-wrap gap-2 mb-5">
          <span 
            v-for="(name, idx) in majorContributors" 
            :key="name" 
            class="contributor-chip"
            :style="{ animationDelay: `${idx * 60}ms` }"
          >
            {{ name }}
          </span>
        </div>

        <!-- Community Thank You -->
        <div class="flex items-center justify-center gap-2 pt-4 border-t border-bd-border-subtle">
          <Users class="w-4 h-4 text-bd-text-muted" />
          <p class="text-xs text-bd-text-muted">
            And the entire AI Dungeon community. Thank you!
          </p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-5 border-t border-bd-border-subtle">
      <p class="text-xs text-bd-text-muted flex items-center justify-center gap-1.5">
        Made with <Heart class="w-3 h-3 text-bd-error animate-pulse" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { INSTRUCTIONS, CATEGORIES } from '@/data/aiInstructions'
import { TEMPLATES } from '@/data/plotComponents'
import { STORY_CARDS, STORY_CARD_TEMPLATES } from '@/data/storyCards'
import { SCRIPTS } from '@/data/scripts'
import { useGlobalSearch } from '@/composables/useGlobalSearch'
import { MAJOR_CONTRIBUTORS as majorContributors } from '@/data/contributors'
import { 
  Search, LayoutGrid, Lightbulb, ScrollText, Heart, Sparkles, ArrowRight,
  GitPullRequest, MessageCircle, ExternalLink, Bookmark, Drama, Code,
  Award, Users, ChevronRight, Package, Layers, LayoutDashboard, Infinity, X
} from 'lucide-vue-next'

const router = useRouter()

// --- Platform detection for keyboard hint ---
const isMac = navigator.userAgent.includes('Mac')

// --- Global search ---
const searchState = useGlobalSearch({ debounceMs: 180, maxPerGroup: 4 })
const showResults = ref(false)
const searchInputRef = ref(null)
const searchContainerRef = ref(null)

// --- Section refs for IntersectionObserver staggered reveal ---
const categoriesRef = ref(null)
const statsRef = ref(null)
const quickStartRef = ref(null)
const creditsRef = ref(null)

const visibleSections = reactive({
  categories: false,
  stats: false,
  quickStart: false,
  credits: false,
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (el === categoriesRef.value) visibleSections.categories = true
          else if (el === statsRef.value) visibleSections.stats = true
          else if (el === quickStartRef.value) visibleSections.quickStart = true
          else if (el === creditsRef.value) visibleSections.credits = true
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15 }
  )

  const refs = [categoriesRef, statsRef, quickStartRef, creditsRef]
  refs.forEach((r) => { if (r.value) observer.observe(r.value) })

  // Close search results when clicking outside
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  if (observer) observer.disconnect()
  document.removeEventListener('mousedown', handleClickOutside)
})

// --- Data ---
const totalItems = computed(() => 
  INSTRUCTIONS.length + TEMPLATES.length + STORY_CARDS.length + STORY_CARD_TEMPLATES.length + SCRIPTS.length
)

const resourceCategories = [
  { 
    path: '/ai-instructions', 
    name: 'AI Instructions', 
    icon: ScrollText,
    description: 'Rules and guidelines for AI behavior, writing style, and narrative control.',
    count: INSTRUCTIONS.length,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber',
    glowClass: 'bg-gradient-to-br from-bd-amber/40 to-bd-amber/10',
  },
  { 
    path: '/plot-components', 
    name: 'Plot Components', 
    icon: Bookmark,
    description: "Author's Notes, Plot Essentials, and Story Summary templates.",
    count: TEMPLATES.length,
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue',
    glowClass: 'bg-gradient-to-br from-bd-blue/40 to-bd-blue/10',
  },
  { 
    path: '/story-cards', 
    name: 'Story Cards', 
    icon: Drama,
    description: 'Templates for Story Cards, including characters, locations, factions, abilities, and more.',
    count: STORY_CARDS.length + STORY_CARD_TEMPLATES.length,
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple',
    glowClass: 'bg-gradient-to-br from-bd-purple/40 to-bd-purple/10',
  },
  { 
    path: '/scripts', 
    name: 'Scripts', 
    icon: Code,
    description: 'JavaScript examples for game systems, tracking, and automation.',
    count: SCRIPTS.length,
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan',
    glowClass: 'bg-gradient-to-br from-bd-cyan/40 to-bd-cyan/10',
  },
]

const stats = [
  { value: totalItems.value, label: 'Resources', icon: Package },
  { value: CATEGORIES.length, label: 'Categories', icon: Layers },
  { value: '4', label: 'Sections', icon: LayoutDashboard },
  { value: 'Free', label: 'Forever', icon: Infinity },
]


// Icon lookup for search result group headers
const iconMap = { ScrollText, Layers, Bookmark, Drama, Code }
const getGroupIcon = (name) => iconMap[name] || Search

// Difficulty badge styles
const difficultyClass = (diff) => {
  const map = {
    beginner: 'bg-bd-green/15 text-bd-green',
    intermediate: 'bg-bd-amber/15 text-bd-amber',
    advanced: 'bg-bd-pink/15 text-bd-pink',
  }
  return map[diff] || 'bg-bd-tag-bg text-bd-text-muted'
}

// Navigate to a specific result item's page with search + tab context
const navigateToResult = (group, result) => {
  showResults.value = false
  router.push({ 
    path: group.route, 
    query: { q: searchState.query.value, tab: group.tabHint } 
  })
}

// Navigate to a resource page ("view all" link)
const navigateToPage = (group) => {
  showResults.value = false
  router.push({ 
    path: group.route, 
    query: { q: searchState.query.value, tab: group.tabHint } 
  })
}

// Clear search and refocus input
const handleClearSearch = () => {
  searchState.clearSearch()
  showResults.value = false
  searchInputRef.value?.focus()
}

// Close results when clicking outside
const handleClickOutside = (e) => {
  if (searchContainerRef.value && !searchContainerRef.value.contains(e.target)) {
    showResults.value = false
  }
}
</script>

<style scoped>
/* === Hero background === */
.hero-section {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}

.hero-orb--orange {
  width: 280px;
  height: 280px;
  background: var(--bd-accent-primary);
  top: -60px;
  right: -40px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 200px;
  height: 200px;
  background: #a855f7;
  bottom: -40px;
  left: 10%;
  animation: float 10s ease-in-out infinite reverse;
}

.hero-orb--cyan {
  width: 160px;
  height: 160px;
  background: #06b6d4;
  top: 20%;
  left: -30px;
  animation: float 12s ease-in-out infinite 2s;
}

/* === Category cards with gradient border trick === */
.category-card {
  position: relative;
  border-radius: 0.75rem;
  transition: transform 0.25s ease;
}

.category-card:hover {
  transform: translateY(-2px);
}

/* === Section reveal animation === */
.home-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.home-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Contributor chips === */
.contributor-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255, 149, 0, 0.1);
  color: var(--bd-accent-light);
  border: 1px solid rgba(255, 149, 0, 0.2);
  transition: all 0.2s ease;
}

.contributor-chip:hover {
  background: rgba(255, 149, 0, 0.2);
  border-color: rgba(255, 149, 0, 0.4);
  transform: translateY(-1px);
}

/* === Search results panel === */
.search-results-panel {
  backdrop-filter: blur(12px);
}

.search-results-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--bd-bg-elevated) transparent;
}

.search-results-scroll::-webkit-scrollbar {
  width: 4px;
}

.search-results-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.search-results-scroll::-webkit-scrollbar-thumb {
  background: var(--bd-bg-elevated);
  border-radius: 4px;
}

/* Transition for results dropdown */
.search-results-enter-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.search-results-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.search-results-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.search-results-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
