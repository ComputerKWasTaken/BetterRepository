<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Hero Section -->
    <section class="text-center py-8">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bd-accent-primary/10 border border-bd-accent-primary/20 mb-4">
        <Sparkles class="w-4 h-4 text-bd-accent-primary" />
        <span class="text-sm font-medium text-bd-accent-light">AI Dungeon Resource Hub</span>
      </div>
      
      <h1 class="text-3xl md:text-4xl font-bold text-bd-text-primary mb-3">
        Your <span class="text-gradient">AI Dungeon</span> Toolkit
      </h1>
      
      <p class="text-bd-text-secondary max-w-2xl mx-auto mb-6">
        A curated collection of AI Instructions, Plot Components, Story Cards, and Scripts. 
        Everything you need to craft better adventures.
      </p>

      <!-- Quick Search -->
      <div class="max-w-lg mx-auto">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bd-text-muted" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search instructions, templates, scripts..."
            class="input pl-12 pr-4 py-3"
            @keyup.enter="handleSearch"
          />
          <button 
            v-if="searchQuery"
            @click="handleSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-1.5 px-3 text-sm"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Resource Categories -->
    <section>
      <div class="section-header mb-4">
        <LayoutGrid class="w-4 h-4" />
        <span>Browse Resources</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <router-link 
          v-for="category in resourceCategories" 
          :key="category.path"
          :to="category.path"
          class="card group flex items-start gap-4 hover:border-bd-accent-primary/30 transition-all"
        >
          <div 
            class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
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
            <p class="text-sm text-bd-text-secondary mt-1 line-clamp-2">{{ category.description }}</p>
          </div>
          <ChevronRight class="w-4 h-4 text-bd-text-muted group-hover:text-bd-accent-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
        </router-link>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div v-for="stat in stats" :key="stat.label" class="card text-center py-4">
        <div class="text-2xl font-bold text-gradient">{{ stat.value }}</div>
        <div class="text-xs text-bd-text-muted mt-1">{{ stat.label }}</div>
      </div>
    </section>

    <!-- Quick Start Cards -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <!-- New Users -->
      <div class="card">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-bd-green/20 flex items-center justify-center flex-shrink-0">
            <Lightbulb class="w-4 h-4 text-bd-green" />
          </div>
          <h3 class="font-semibold text-bd-text-primary">New to AI Dungeon?</h3>
        </div>
        <p class="text-sm text-bd-text-secondary mb-3">
          Start with Complete Sets, full instruction sets ready for various AI models.
        </p>
        <router-link to="/ai-instructions" class="text-sm text-bd-accent-primary hover:underline flex items-center gap-1">
          Browse AI Instructions
          <ChevronRight class="w-3 h-3" />
        </router-link>
      </div>

      <!-- Contribute -->
      <div class="card">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <GitPullRequest class="w-4 h-4 text-bd-purple" />
          </div>
          <h3 class="font-semibold text-bd-text-primary">Share Your Work</h3>
        </div>
        <p class="text-sm text-bd-text-secondary mb-3">
          Paste your creation in a GitHub issue, no coding required.
        </p>
        <router-link to="/contribute" class="text-sm text-bd-accent-primary hover:underline flex items-center gap-1">
          Submit Creation
          <ChevronRight class="w-3 h-3" />
        </router-link>
      </div>

      <!-- Discord -->
      <div class="card">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle class="w-4 h-4 text-bd-cyan" />
          </div>
          <h3 class="font-semibold text-bd-text-primary">Join Community</h3>
        </div>
        <p class="text-sm text-bd-text-secondary mb-3">
          Connect with other players, share creations, and get help.
        </p>
        <a 
          href="https://discord.com/invite/HB2YBZYjyf" 
          target="_blank"
          class="text-sm text-bd-accent-primary hover:underline flex items-center gap-1"
        >
          Join Discord
          <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </section>

    <!-- Credits Section -->
    <section class="card">
      <div class="flex items-center gap-2 mb-4">
        <Award class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-xl font-bold text-bd-text-primary">Credits & Acknowledgments</h2>
      </div>

      <!-- Introduction -->
      <div class="mb-6 p-4 rounded-lg bg-bd-accent-primary/5 border border-bd-accent-primary/20">
        <p class="text-sm text-bd-text-secondary text-center leading-relaxed">
          BetterRepository is built on the shoulders of giants. The community members listed below have contributed 
          invaluable guides, resources, and knowledge that directly shaped the comprehensive guides you see here. 
          Their pioneering work in the AI Dungeon community made this project possible.
        </p>
      </div>

      <!-- Major Contributors -->
      <div class="mb-6 p-4 rounded-lg bg-gradient-to-r from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30">
        <div class="flex items-center gap-2 mb-3">
          <div class="w-8 h-8 rounded-lg bg-bd-accent-primary/20 flex items-center justify-center">
            <Star class="w-4 h-4 text-bd-accent-primary" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Major Contributors</h3>
            <p class="text-xs text-bd-text-muted">Contributors whose work significantly shaped BetterRepository</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="name in majorContributors" :key="name" 
                class="px-3 py-1.5 rounded-full text-xs font-semibold bg-bd-accent-primary/15 text-bd-accent-light border border-bd-accent-primary/30">
            {{ name }}
          </span>
        </div>
      </div>

      <!-- Contributor Categories -->
      <div class="space-y-5">
        
        <!-- AI Instructions Contributors -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary/30 border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-bd-amber/20 flex items-center justify-center">
              <ScrollText class="w-4 h-4 text-bd-amber" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">AI Instructions</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created AI Instructions, or created repositories, guides, or other resources</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="name in aiInstructionsContributors" :key="name" 
                  class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Plot Components Contributors -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary/30 border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-bd-blue/20 flex items-center justify-center">
              <Bookmark class="w-4 h-4 text-bd-blue" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Plot Components</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created PEs, SSs, and ANs, or created guides for them</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="name in plotComponentsContributors" :key="name" 
                  class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-blue/10 text-bd-blue border border-bd-blue/20">
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Story Cards Contributors -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary/30 border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
              <Drama class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Story Cards</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created the resources and guides to create, write, and use Story Cards</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="name in storyCardsContributors" :key="name" 
                  class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Scripting Contributors -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary/30 border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-bd-cyan/20 flex items-center justify-center">
              <Code class="w-4 h-4 text-bd-cyan" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Scripting</h3>
              <p class="text-xs text-bd-text-muted">Contributors who wrote scripts and other tools, or created guides and resources for scripting</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span v-for="name in scriptingContributors" :key="name" 
                  class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-cyan/10 text-bd-cyan border border-bd-cyan/20">
              {{ name }}
            </span>
          </div>
        </div>

      </div>

      <!-- Community Thank You -->
      <div class="mt-6 pt-4 border-t border-bd-border-subtle">
        <div class="flex items-center justify-center gap-3 mb-2">
          <Users class="w-5 h-5 text-bd-accent-primary" />
          <p class="text-sm font-medium text-bd-text-primary">And the Entire AI Dungeon Community</p>
        </div>
        <p class="text-xs text-bd-text-muted text-center max-w-md mx-auto">
          Thank you to everyone who has shared their knowledge, answered questions, and helped make AI Dungeon a better experience for all.
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-4 border-t border-bd-border-subtle">
      <p class="text-xs text-bd-text-muted flex items-center justify-center gap-1">
        Made with <Heart class="w-3 h-3 text-bd-error" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { INSTRUCTIONS, CATEGORIES } from '@/data/aiInstructions'
import { TEMPLATES } from '@/data/plotComponents'
import { STORY_CARDS, STORY_CARD_TEMPLATES } from '@/data/storyCards'
import { SCRIPTS } from '@/data/scripts'
import { 
  Sparkles, Search, LayoutGrid, Lightbulb, ScrollText, Heart,
  GitPullRequest, MessageCircle, ExternalLink, Bookmark, Drama, Code,
  Award, Users, ChevronRight, Star
} from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')

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
    iconClass: 'text-bd-amber'
  },
  { 
    path: '/plot-components', 
    name: 'Plot Components', 
    icon: Bookmark,
    description: "Author's Notes, Plot Essentials, and Story Summary templates.",
    count: TEMPLATES.length,
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  { 
    path: '/story-cards', 
    name: 'Story Cards', 
    icon: Drama,
    description: 'Example cards and templates for characters, locations, and factions.',
    count: STORY_CARDS.length + STORY_CARD_TEMPLATES.length,
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  { 
    path: '/scripts', 
    name: 'Scripts', 
    icon: Code,
    description: 'JavaScript examples for game systems, tracking, and automation.',
    count: SCRIPTS.length,
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
]

const stats = [
  { value: totalItems.value, label: 'Total Resources' },
  { value: CATEGORIES.length, label: 'Categories' },
  { value: '4', label: 'Sections' },
  { value: 'Free', label: 'Forever' },
]

// Major contributors whose work significantly shaped BetterRepository
const majorContributors = [
  'OffMetaGamer', 'Wilmar', 'Le Onyx', 'LewdLeah', 'Dragranis', 'Monsieur Boo'
]

// Contributors organized by category
const aiInstructionsContributors = [
  'OffMetaGamer', 'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'Dragranis', 
  'BinKompliziert', 'Wilmar', 'Le Onyx', 'Little Hat', 'SeinSchetten', 
  'Zoocata', 'Monsieur Boo', 'CamSift'
]

const plotComponentsContributors = [
  'Wilmar', 'Le Onyx', 'Dragranis', 'Celyne', 'Monsieur Boo'
]

const storyCardsContributors = [
  'wanderingstar1', 'GremmieGremlin', 'Lavere', 'Le Onyx', 'Shiny'
]

const scriptingContributors = [
  'Latitude', 'LewdLeah', 'Oli', 'Magic', 'BinKompliziert', 'MrJack'
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/ai-instructions', query: { q: searchQuery.value } })
  }
}
</script>
