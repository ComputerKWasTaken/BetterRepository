<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bd-accent-primary/10 border border-bd-accent-primary/20 mb-6">
        <span>✨</span>
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
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-bd-text-muted">🔍</span>
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
        <span>▦</span>
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
            <span class="text-xl">{{ category.iconChar }}</span>
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
          <span class="text-xl">💡</span>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">New to AI Dungeon?</h3>
          <p class="text-bd-text-secondary mb-4">
            Start with our curated Complete Sets in the AI Instructions section. 
            These are full instruction sets ready to use, designed for various AI models.
          </p>
          <router-link to="/ai-instructions" class="btn btn-primary">
            <span>📜</span>
            Browse AI Instructions
          </router-link>
        </div>
      </div>
    </section>

    <!-- Community Section -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
          <span class="text-xl">👥</span>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Community Driven</h3>
          <p class="text-bd-text-secondary mb-4">
            BetterRepository is built by and for the AI Dungeon community. 
            Have something to share? Contribute your own instructions, templates, or scripts!
          </p>
          <div class="flex flex-wrap gap-3">
            <router-link to="/contribute" class="btn btn-secondary">
              <span>🤝</span>
              How to Contribute
            </router-link>
            <a 
              href="https://discord.gg/aidungeon" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-ghost"
            >
              <span>💬</span>
              Join Discord
              <span class="text-xs">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Credits -->
    <section class="text-center py-8 border-t border-white/[0.06]">
      <p class="text-sm text-bd-text-muted">
        Heavily inspired by 
        <a 
          href="https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU" 
          target="_blank" 
          class="text-bd-accent-primary hover:underline"
        >
          OffMetaGamer's AI Instructions Repository
        </a>
      </p>
      <p class="text-xs text-bd-text-muted mt-2">
        Extended and refined by the AI Dungeon community
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { INSTRUCTIONS, CATEGORIES } from '@/data/repository'

const router = useRouter()
const searchQuery = ref('')

const resourceCategories = [
  { 
    path: '/ai-instructions', 
    name: 'AI Instructions', 
    iconChar: '📜',
    description: 'Rules and guidelines for AI behavior, writing style, and narrative control.',
    count: INSTRUCTIONS.length,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber'
  },
  { 
    path: '/plot-components', 
    name: 'Plot Components', 
    iconChar: '🔖',
    description: 'Author\'s Notes, Plot Essentials, and Story Summaries.',
    count: '12+',
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  { 
    path: '/story-cards', 
    name: 'Story Cards', 
    iconChar: '🎭',
    description: 'Pre-made character cards, location cards, and faction cards.',
    count: '8+',
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  { 
    path: '/scripts', 
    name: 'Scripts', 
    iconChar: '⚙️',
    description: 'Custom scripts and advanced automation for AI Dungeon.',
    count: '5+',
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
]

const stats = [
  { value: INSTRUCTIONS.length + '+', label: 'AI Instructions' },
  { value: CATEGORIES.length, label: 'Categories' },
  { value: '100+', label: 'Community Members' },
  { value: 'Free', label: 'Forever' },
]

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/ai-instructions', query: { q: searchQuery.value } })
  }
}
</script>
