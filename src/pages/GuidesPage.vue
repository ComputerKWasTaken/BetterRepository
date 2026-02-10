<template>
  <div class="space-y-8">
    <!-- Page Header — animated hero -->
    <header class="guides-hero relative overflow-hidden rounded-2xl py-10 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--blue" aria-hidden="true" />
      <div class="hero-orb hero-orb--green" aria-hidden="true" />

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center animate-float flex-shrink-0">
          <BookOpen class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            <span class="text-gradient">Guides</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed">
            Everything you need to master AI Dungeon — from plot components to scripting.
          </p>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-bd-border-subtle pb-2 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="switchTab(tab.id)"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-bd-bg-tertiary'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Guide Content -->
    <AIInstructionsGuide v-if="activeTab === 'ai-instructions'" />
    <PlotComponentsGuide v-if="activeTab === 'plot-components'" />
    <StoryCardsGuide v-if="activeTab === 'story-cards'" />
    <ScriptsGuide v-if="activeTab === 'scripts'" />
    <BetterScriptsGuide v-if="activeTab === 'betterscripts'" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AIInstructionsGuide from '@/components/guides/AIInstructionsGuide.vue'
import PlotComponentsGuide from '@/components/guides/PlotComponentsGuide.vue'
import StoryCardsGuide from '@/components/guides/StoryCardsGuide.vue'
import ScriptsGuide from '@/components/guides/ScriptsGuide.vue'
import BetterScriptsGuide from '@/components/guides/BetterScriptsGuide.vue'
import { 
  BookOpen, ScrollText, Bookmark, Drama, Code, Terminal
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const tabs = [
  { id: 'ai-instructions', label: 'AI Instructions', icon: ScrollText },
  { id: 'plot-components', label: 'Plot Components', icon: Bookmark },
  { id: 'story-cards', label: 'Story Cards', icon: Drama },
  { id: 'scripts', label: 'Scripts', icon: Code },
  { id: 'betterscripts', label: 'BetterScripts', icon: Terminal }
]

const validTabIds = tabs.map(t => t.id)
const activeTab = ref('ai-instructions')

// Switch tab and update URL query parameter
const switchTab = (tabId) => {
  activeTab.value = tabId
  router.replace({ query: { ...route.query, tab: tabId } })
}

// Initialize tab from URL query on mount
onMounted(() => {
  if (route.query.tab && validTabIds.includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
})

// Watch for external route changes (e.g. back/forward navigation)
watch(() => route.query.tab, (newTab) => {
  if (newTab && validTabIds.includes(newTab)) {
    activeTab.value = newTab
  }
})
</script>

<style scoped>
/* === Hero background === */
.guides-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.hero-orb--blue {
  width: 220px;
  height: 220px;
  background: #3b82f6;
  top: -40px;
  right: -20px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--green {
  width: 160px;
  height: 160px;
  background: #22c55e;
  bottom: -30px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}
</style>
