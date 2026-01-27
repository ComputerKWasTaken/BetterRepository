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
        <h2 class="font-semibold text-bd-text-primary">Credits & Acknowledgments</h2>
      </div>

      <!-- Inspiration -->
      <div class="mb-4 p-3 rounded-lg bg-bd-accent-primary/5 border border-bd-accent-primary/20">
        <p class="text-sm text-bd-text-secondary text-center">
          <span class="text-bd-text-muted">Inspired by</span>
          <a 
            href="https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU" 
            target="_blank" 
            class="text-bd-accent-primary hover:underline font-medium ml-1"
          >
            OffMetaGamer's AI Instructions Repository
            <ExternalLink class="w-3 h-3 inline ml-0.5" />
          </a>
        </p>
      </div>

      <!-- Contributors Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div v-for="contributor in contributors" :key="contributor.name" 
             class="flex items-center gap-3 p-2.5 rounded-lg bg-bd-bg-tertiary/50">
          <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
               :class="contributor.bgClass">
            <component :is="contributor.icon" class="w-3.5 h-3.5" :class="contributor.iconClass" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-bd-text-primary">{{ contributor.name }}</p>
            <p class="text-xs text-bd-text-muted">{{ contributor.contribution }}</p>
          </div>
        </div>
      </div>

      <!-- Community Thank You -->
      <div class="mt-4 pt-3 border-t border-bd-border-subtle text-center">
        <p class="text-xs text-bd-text-muted flex items-center justify-center gap-2">
          <Users class="w-3 h-3 text-bd-purple" />
          And the entire AI Dungeon Community
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
  Award, Users, ChevronRight
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

const contributors = [
  {
    name: 'OffMetaGamer',
    contribution: 'Original AI Instructions collection',
    icon: ScrollText,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber'
  },
  {
    name: 'dragranis & BinKompliziert',
    contribution: 'AI Instructions guides',
    icon: ScrollText,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber'
  },
  {
    name: 'Wilmar',
    contribution: 'Plot Components guide',
    icon: Bookmark,
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  {
    name: 'wanderstar1 & GremmieGremlin',
    contribution: 'Story Cards guides',
    icon: Drama,
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  {
    name: 'Latitude & LewdLeah',
    contribution: 'Scripts & scripting utilities',
    icon: Code,
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/ai-instructions', query: { q: searchQuery.value } })
  }
}
</script>
