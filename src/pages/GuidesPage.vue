<template>
  <div class="space-y-8">
    <!-- Page Header with animated hero -->
    <header class="guides-hero relative overflow-hidden rounded-2xl py-12 px-6">
      <!-- Animated background orbs -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
        <div class="hero-orb hero-orb--blue" />
        <div class="hero-orb hero-orb--green" />
        <div class="hero-orb hero-orb--purple" />
      </div>

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-bd-accent-primary/25 to-bd-purple/20 flex items-center justify-center animate-float flex-shrink-0 shadow-lg shadow-bd-accent-primary/10">
          <BookOpen class="w-7 h-7 text-bd-accent-primary" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            <span class="text-gradient">Guides</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed max-w-lg">
            Everything you need to master AI Dungeon, from AI instructions to advanced model settings.
          </p>
        </div>
      </div>
    </header>

    <!-- Tab Navigation grouped into Primary and Secondary -->
    <div class="guides-tab-bar rounded-xl bg-bd-bg-secondary border border-bd-border-subtle p-2">
      <!-- Primary Guides for core resource guides -->
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="tab in primaryTabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="guide-tab guide-tab--primary"
          :class="[
            activeTab === tab.id 
              ? 'guide-tab--active' 
              : 'guide-tab--inactive',
            activeTab === tab.id ? tab.activeClass : ''
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
          <span class="guide-tab__dot" :class="tab.dotClass" />
        </button>

        <!-- Separator -->
        <div class="hidden sm:flex items-center px-1">
          <div class="w-px h-5 bg-bd-border-subtle" />
        </div>

        <!-- Secondary Guides for supplemental guides -->
        <button
          v-for="tab in secondaryTabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="guide-tab guide-tab--secondary"
          :class="[
            activeTab === tab.id 
              ? 'guide-tab--active-secondary' 
              : 'guide-tab--inactive'
          ]"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" />
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Guide Content -->
    <GettingStartedGuide v-if="activeTab === 'getting-started'" />
    <GameModesGuide v-if="activeTab === 'game-modes'" />
    <ScenariosAdventuresGuide v-if="activeTab === 'scenarios-adventures'" />
    <ContextMemoryGuide v-if="activeTab === 'context-memory'" />
    <AIModelsGuide v-if="activeTab === 'ai-models'" />
    <AIInstructionsGuide v-if="activeTab === 'ai-instructions'" />
    <PlotComponentsGuide v-if="activeTab === 'plot-components'" />
    <StoryCardsGuide v-if="activeTab === 'story-cards'" />
    <ScriptsGuide v-if="activeTab === 'scripts'" />
    <BetterScriptsGuide v-if="activeTab === 'betterscripts'" />
    <AdvancedSettingsGuide v-if="activeTab === 'advanced-settings'" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import GettingStartedGuide from '@/components/guides/GettingStartedGuide.vue'
import GameModesGuide from '@/components/guides/GameModesGuide.vue'
import ScenariosAdventuresGuide from '@/components/guides/ScenariosAdventuresGuide.vue'
import ContextMemoryGuide from '@/components/guides/ContextMemoryGuide.vue'
import AIModelsGuide from '@/components/guides/AIModelsGuide.vue'
import AIInstructionsGuide from '@/components/guides/AIInstructionsGuide.vue'
import PlotComponentsGuide from '@/components/guides/PlotComponentsGuide.vue'
import StoryCardsGuide from '@/components/guides/StoryCardsGuide.vue'
import ScriptsGuide from '@/components/guides/ScriptsGuide.vue'
import BetterScriptsGuide from '@/components/guides/BetterScriptsGuide.vue'
import AdvancedSettingsGuide from '@/components/guides/AdvancedSettingsGuide.vue'
import { 
  BookOpen, ScrollText, Bookmark, Drama, Code, Terminal, Settings,
  Sparkles, Gamepad2, Map, Brain, Cpu
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

// Primary tabs for core resource guides with colored dot indicators
const primaryTabs = [
  { id: 'getting-started', label: 'Getting Started', icon: Sparkles, dotClass: 'dot--green', activeClass: 'guide-tab--active-green' },
  { id: 'game-modes', label: 'Game Modes', icon: Gamepad2, dotClass: 'dot--amber', activeClass: 'guide-tab--active-amber' },
  { id: 'scenarios-adventures', label: 'Scenarios', icon: Map, dotClass: 'dot--purple', activeClass: 'guide-tab--active-purple' },
  { id: 'context-memory', label: 'Context & Memory', icon: Brain, dotClass: 'dot--blue', activeClass: 'guide-tab--active-blue' },
  { id: 'ai-models', label: 'AI Models', icon: Cpu, dotClass: 'dot--cyan', activeClass: 'guide-tab--active-cyan' },
  { id: 'ai-instructions', label: 'AI Instructions', icon: ScrollText, dotClass: 'dot--amber', activeClass: 'guide-tab--active-amber' },
  { id: 'plot-components', label: 'Plot Components', icon: Bookmark, dotClass: 'dot--blue', activeClass: 'guide-tab--active-blue' },
  { id: 'story-cards', label: 'Story Cards', icon: Drama, dotClass: 'dot--purple', activeClass: 'guide-tab--active-purple' },
  { id: 'scripts', label: 'Scripts', icon: Code, dotClass: 'dot--cyan', activeClass: 'guide-tab--active-cyan' },
]

// Secondary tabs for supplemental guides
const secondaryTabs = [
  { id: 'betterscripts', label: 'BetterScripts', icon: Terminal },
  { id: 'advanced-settings', label: 'Advanced Settings', icon: Settings },
]

const allTabs = [...primaryTabs, ...secondaryTabs]
const validTabIds = allTabs.map(t => t.id)
const activeTab = ref('getting-started')

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

.hero-orb--purple {
  width: 140px;
  height: 140px;
  background: #a855f7;
  top: 10%;
  left: 40%;
  animation: float 12s ease-in-out infinite 2s;
  opacity: 0.2;
}

/* === Tab Bar === */
.guides-tab-bar {
  overflow-x: auto;
  scrollbar-width: none;
}

.guides-tab-bar::-webkit-scrollbar {
  display: none;
}

/* === Tab Base === */
.guide-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  position: relative;
}

/* === Inactive state (shared) === */
.guide-tab--inactive {
  color: var(--bd-text-muted);
  background: transparent;
}

.guide-tab--inactive:hover {
  color: var(--bd-text-primary);
  background: var(--bd-bg-tertiary);
}

/* === Primary tab dot indicator === */
.guide-tab__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.dot--amber { background: #fbbf24; }
.dot--blue { background: #3b82f6; }
.dot--purple { background: #a855f7; }
.dot--cyan { background: #06b6d4; }
.dot--green { background: #22c55e; }

/* Dim the dot when inactive */
.guide-tab--inactive .guide-tab__dot {
  opacity: 0.4;
}

.guide-tab--inactive:hover .guide-tab__dot {
  opacity: 0.7;
}

/* === Active primary tab with color-coded backgrounds === */
.guide-tab--active {
  color: var(--bd-text-primary);
  font-weight: 600;
}

.guide-tab--active .guide-tab__dot {
  opacity: 1;
  box-shadow: 0 0 6px currentColor;
}

.guide-tab--active-amber {
  background: rgba(251, 191, 36, 0.12);
  border-color: rgba(251, 191, 36, 0.25);
  color: #fbbf24;
}

.guide-tab--active-amber .guide-tab__dot {
  box-shadow: 0 0 8px rgba(251, 191, 36, 0.5);
}

.guide-tab--active-blue {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.25);
  color: #3b82f6;
}

.guide-tab--active-blue .guide-tab__dot {
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.guide-tab--active-purple {
  background: rgba(168, 85, 247, 0.12);
  border-color: rgba(168, 85, 247, 0.25);
  color: #a855f7;
}

.guide-tab--active-purple .guide-tab__dot {
  box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
}

.guide-tab--active-cyan {
  background: rgba(6, 182, 212, 0.12);
  border-color: rgba(6, 182, 212, 0.25);
  color: #06b6d4;
}

.guide-tab--active-cyan .guide-tab__dot {
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.5);
}

.guide-tab--active-green {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.25);
  color: #22c55e;
}

.guide-tab--active-green .guide-tab__dot {
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
}

/* === Active secondary tab with neutral accent === */
.guide-tab--active-secondary {
  background: var(--bd-bg-tertiary);
  border-color: var(--bd-border-default);
  color: var(--bd-text-primary);
  font-weight: 600;
}

/* === Secondary tab styling that's slightly smaller and subtler === */
.guide-tab--secondary {
  font-size: 0.8125rem;
  padding: 0.4375rem 0.75rem;
}
</style>
