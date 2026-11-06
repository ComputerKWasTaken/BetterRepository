<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="hero-section relative rounded-2xl py-14 px-6 text-center">
      <!-- Content -->
      <div class="relative z-10">
        <!-- Logo & Branding -->
        <div class="flex items-center justify-center gap-4 mb-5">
          <img 
            src="/betterrepository_logo.png" 
            alt="BetterRepository" 
            class="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg"
          />
          <div class="text-left">
            <h1 class="text-3xl md:text-4xl font-bold text-bd-text-primary tracking-tight">
              Better<span class="text-gradient">Repository</span>
            </h1>
            <p class="text-sm text-bd-accent-light font-medium tracking-wide mt-0.5">AI Dungeon Resource Hub</p>
          </div>
        </div>

        <p class="text-bd-text-secondary max-w-xl mx-auto mb-8 leading-relaxed">
          A curated collection of AI Instructions, Plot Components, Story Cards, and Scripts.
          Everything you need to craft <span class="text-gradient font-semibold">better adventures</span>.
        </p>

        <!-- Quick Search: a launcher for the global search overlay.
             One search experience everywhere; this input opens it. -->
        <div class="max-w-lg mx-auto relative">
          <div class="relative group">
            <div class="relative z-[2]">
              <div class="absolute left-4 top-1/2 -translate-y-1/2 z-[3] pointer-events-none">
                <Search class="w-5 h-5 text-bd-text-muted" />
              </div>
              <input
                type="text"
                readonly
                placeholder="Search resources and presets..."
                aria-label="Search all BetterRepository resources"
                class="input pl-12 pr-12 py-3.5 bg-bd-bg-secondary/80 backdrop-blur-card cursor-pointer"
                @focus="openSearch"
                @click="openSearch"
              />
              <!-- Keyboard shortcut hint -->
              <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-0.5 pointer-events-none">
                <kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-bd-text-muted bg-bd-bg-tertiary border border-bd-border-subtle">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
                <kbd class="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-bd-text-muted bg-bd-bg-tertiary border border-bd-border-subtle">K</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resource Categories with gradient accent borders -->
    <section>
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
          <div class="relative bg-bd-bg-secondary border border-bd-border-subtle group-hover:border-bd-border-default transition-colors rounded-xl p-4 flex items-start gap-4 h-full">
            <div 
              class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
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
    <section>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(stat, idx) in stats" 
          :key="stat.label" 
          class="card text-center py-5 group hover:border-bd-accent-primary/20"
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

    <!-- Credits Section with refined styling -->
    <section>
      <div class="card relative overflow-hidden">
        <!-- Decorative gradient -->
        <div class="absolute top-0 left-0 w-full h-0.5 bg-bd-accent-primary/70" />

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
        Made with <Heart class="w-3 h-3 text-bd-error" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, reactive } from 'vue'
import { INSTRUCTIONS, CATEGORIES } from '@/data/aiInstructions'
import { TEMPLATES } from '@/data/plotComponents'
import { STORY_CARDS, STORY_CARD_TEMPLATES } from '@/data/storyCards'
import { SCRIPTS } from '@/data/scripts'
import { useSearchOverlayState } from '@/composables/useSearchOverlayState'
import { MAJOR_CONTRIBUTORS as majorContributors } from '@/data/contributors'
import { Search, LayoutGrid, ScrollText, Heart, Bookmark, Drama, Code, Award, Users, ChevronRight, Package, Layers, LayoutDashboard, Infinity } from 'lucide-vue-next'


// --- Platform detection for keyboard hint ---
const isMac = navigator.userAgent.includes('Mac')

// --- Global search overlay (shared) ---
const { openSearch } = useSearchOverlayState()






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
    bgClass: 'bg-bd-accent-primary/15',
    iconClass: 'text-bd-accent-primary',
  },
  { 
    path: '/plot-components', 
    name: 'Plot Components', 
    icon: Bookmark,
    description: "Author's Notes, Plot Essentials, and Story Summary templates.",
    count: TEMPLATES.length,
    bgClass: 'bg-bd-accent-primary/15',
    iconClass: 'text-bd-accent-primary',
  },
  { 
    path: '/story-cards', 
    name: 'Story Cards', 
    icon: Drama,
    description: 'Templates for Story Cards, including characters, locations, factions, abilities, and more.',
    count: STORY_CARDS.length + STORY_CARD_TEMPLATES.length,
    bgClass: 'bg-bd-accent-primary/15',
    iconClass: 'text-bd-accent-primary',
  },
  { 
    path: '/scripts', 
    name: 'Scripts', 
    icon: Code,
    description: 'JavaScript examples for game systems, tracking, and automation.',
    count: SCRIPTS.length,
    bgClass: 'bg-bd-accent-primary/15',
    iconClass: 'text-bd-accent-primary',
  },
]

const stats = [
  { value: totalItems.value, label: 'Resources', icon: Package },
  { value: CATEGORIES.length, label: 'Categories', icon: Layers },
  { value: '4', label: 'Sections', icon: LayoutDashboard },
  { value: 'Free', label: 'Forever', icon: Infinity },
]


</script>

<style scoped>
/* === Hero background === */
.hero-section {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}





/* === Category cards === */
.category-card {
  position: relative;
  border-radius: 0.75rem;
  transition: transform 0.25s ease;
}




/* === Contributor chips === */
.contributor-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--bd-accent-muted);
  color: var(--bd-accent-light);
  border: 1px solid var(--bd-border-accent);
  transition: all 0.2s ease;
}

.contributor-chip:hover {
  background: var(--bd-accent-strong);
  border-color: var(--bd-border-accent);
  transform: translateY(-1px);
}

</style>
