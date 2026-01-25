<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bd-accent-primary/10 border border-bd-accent-primary/20 mb-6">
        <Sparkles class="w-4 h-4 text-bd-accent-primary" />
        <span class="text-sm font-medium text-bd-accent-light">Welcome to the Repository</span>
      </div>
      
      <h1 class="text-4xl font-bold text-bd-text-primary mb-4">
        Find the Perfect <span class="text-gradient">AI Instructions</span>
      </h1>
      
      <p class="text-lg text-bd-text-secondary max-w-2xl mx-auto mb-8">
        A curated collection of AI Instructions, Plot Components, Story Cards, and Scripts 
        for AI Dungeon. No fuss, no hassle, all seamless.
      </p>

      <!-- Quick Search -->
      <div class="max-w-xl mx-auto">
        <div class="relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-bd-text-muted" />
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search for instructions, templates, scripts..."
            class="input pl-12 pr-4 py-4 text-base"
            @keyup.enter="handleSearch"
          />
          <button 
            v-if="searchQuery"
            @click="handleSearch"
            class="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary py-2"
          >
            Search
          </button>
        </div>
      </div>
    </section>

    <!-- Resource Categories -->
    <section>
      <div class="section-header mb-6">
        <LayoutGrid class="w-4 h-4" />
        <span>Browse Resources</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <router-link 
          v-for="category in resourceCategories" 
          :key="category.path"
          :to="category.path"
          class="card group flex items-start gap-4 hover:border-bd-accent-primary/30 hover:shadow-glow"
        >
          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
            :class="category.bgClass"
          >
            <component :is="category.icon" class="w-6 h-6" :class="category.iconClass" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-bd-text-primary group-hover:text-gradient transition-all">
              {{ category.name }}
            </h3>
            <p class="text-sm text-bd-text-secondary mt-1">{{ category.description }}</p>
            <div class="flex items-center gap-2 mt-3">
              <span class="tag">{{ category.count }} items</span>
              <span class="text-bd-text-muted group-hover:text-bd-accent-primary group-hover:translate-x-1 transition-all">→</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="card text-center">
        <div class="text-3xl font-bold text-gradient">{{ stat.value }}</div>
        <div class="text-sm text-bd-text-secondary mt-1">{{ stat.label }}</div>
      </div>
    </section>

    <!-- Getting Started -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <Lightbulb class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">New to AI Dungeon?</h3>
          <p class="text-bd-text-secondary mb-4">
            Start with our curated Complete Sets in the AI Instructions section. 
            These are full instruction sets ready to use, designed for various AI models.
          </p>
          <router-link to="/ai-instructions" class="btn btn-primary">
            <ScrollText class="w-4 h-4" />
            Browse AI Instructions
          </router-link>
        </div>
      </div>
    </section>

    <!-- Community & Contribute -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Share Your Work -->
      <div class="card-elevated">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Heart class="w-5 h-5 text-bd-purple" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Work</h3>
            <p class="text-sm text-bd-text-secondary mb-4">
              Made something cool? Just paste it in a GitHub issue and I'll add it. No coding required.
            </p>
            <router-link to="/contribute" class="btn btn-secondary btn-sm">
              <GitPullRequest class="w-4 h-4" />
              Submit Your Creation
            </router-link>
          </div>
        </div>
      </div>

      <!-- Join Community -->
      <div class="card-elevated">
        <div class="flex items-start gap-4">
          <div class="w-10 h-10 rounded-xl bg-bd-cyan/20 flex items-center justify-center flex-shrink-0">
            <MessageCircle class="w-5 h-5 text-bd-cyan" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Join the Community</h3>
            <p class="text-sm text-bd-text-secondary mb-4">
              Connect with other AI Dungeon players, share creations, and get help.
            </p>
            <a 
              href="https://discord.com/invite/HB2YBZYjyf" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-secondary btn-sm"
            >
              <MessageCircle class="w-4 h-4" />
              Join Discord
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Credits Section -->
    <section class="card border-t-2 border-bd-accent-primary/30">
      <div class="text-center mb-6">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center justify-center gap-2">
          <Award class="w-5 h-5 text-bd-accent-primary" />
          Credits & Acknowledgments
        </h2>
        <p class="text-sm text-bd-text-muted mt-1">
          BetterRepository wouldn't exist without these amazing contributors
        </p>
      </div>

      <!-- Inspiration -->
      <div class="mb-6 p-4 rounded-lg bg-bd-accent-primary/5 border border-bd-accent-primary/20">
        <p class="text-sm text-bd-text-secondary text-center">
          <span class="text-bd-text-muted">Heavily inspired by</span>
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="contributor in contributors" :key="contributor.name" 
             class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-tertiary/50">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
               :class="contributor.bgClass">
            <component :is="contributor.icon" class="w-4 h-4" :class="contributor.iconClass" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-bd-text-primary">{{ contributor.name }}</p>
            <p class="text-xs text-bd-text-muted">{{ contributor.contribution }}</p>
          </div>
        </div>
      </div>

      <!-- Community Thank You -->
      <div class="mt-6 pt-4 border-t border-white/[0.06] text-center">
        <p class="text-sm text-bd-text-secondary flex items-center justify-center gap-2">
          <Users class="w-4 h-4 text-bd-purple" />
          And the entire <span class="text-bd-text-primary font-medium">AI Dungeon Community</span> for sharing their knowledge
        </p>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center py-6 border-t border-white/[0.06]">
      <p class="text-sm text-bd-text-muted flex items-center justify-center gap-1">
        Made with <Heart class="w-4 h-4 text-bd-error" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
      <p class="text-xs text-bd-text-muted mt-2">
        Part of the BetterDungeon ecosystem
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { INSTRUCTIONS, CATEGORIES } from '@/data/repository'
import { 
  Sparkles, Search, LayoutGrid, Lightbulb, ScrollText, Heart,
  GitPullRequest, MessageCircle, ExternalLink, Bookmark, Drama, Settings,
  Award, Users, Code, FileText, Layers
} from 'lucide-vue-next'

const router = useRouter()
const searchQuery = ref('')

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
    description: 'Author\'s Notes, Plot Essentials, and Story Summaries.',
    count: '12+',
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  { 
    path: '/story-cards', 
    name: 'Story Cards', 
    icon: Drama,
    description: 'Pre-made character cards, location cards, and faction cards.',
    count: '8+',
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  { 
    path: '/scripts', 
    name: 'Scripts', 
    icon: Settings,
    description: 'Custom scripts and advanced automation for AI Dungeon.',
    count: '5+',
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
]

const stats = [
  { value: INSTRUCTIONS.length + '+', label: 'AI Instructions' },
  { value: CATEGORIES.length, label: 'Categories' },
  { value: 'v1.0', label: 'Release' },
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
    name: 'Oli, LewdLeah & MrJack',
    contribution: 'Scripts guides & utilities',
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
