<template>
  <div ref="pageRoot" class="space-y-8">
    <!-- Page Header with animated hero -->
    <header class="ultrascripts-hero relative overflow-hidden rounded-2xl py-12 px-6">
      <!-- Animated background orbs -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
        <div class="hero-orb hero-orb--purple" />
        <div class="hero-orb hero-orb--cyan" />
        <div class="hero-orb hero-orb--green" />
      </div>

      <div class="relative z-10 flex items-start gap-4 flex-wrap">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-bd-purple/25 to-bd-cyan/20 flex items-center justify-center animate-float flex-shrink-0 shadow-lg shadow-bd-purple/10">
          <Rocket class="w-7 h-7 text-bd-purple" />
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap mb-1">
            <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
              <span class="text-gradient">Ultrascripts</span>
            </h1>
            <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-bd-purple/20 text-bd-purple border border-bd-purple/30">Platform</span>
          </div>
          <p class="text-bd-text-secondary leading-relaxed max-w-2xl">
            BetterDungeon's cards-based runtime for AI Dungeon scripting. Two-way communication, dynamic widgets,
            external data, and platform-aware modules &mdash; all over the Story Card transport.
          </p>
          <!-- Quick Stats -->
          <div class="mt-3 flex items-center gap-3 flex-wrap text-[11px] text-bd-text-muted">
            <span class="inline-flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-green" />
              <strong class="text-bd-green">Shipped</strong>
            </span>
            <span class="text-bd-border-default">|</span>
            <span><strong class="text-bd-text-primary">9</strong> first-party modules</span>
            <span class="text-bd-border-default">|</span>
            <span>Protocol <strong class="text-bd-text-primary">v1</strong></span>
            <span class="text-bd-border-default">|</span>
            <span>Chromium, Firefox, Android</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <div class="ultrascripts-tab-bar rounded-xl bg-bd-bg-secondary border border-bd-border-subtle p-2 space-y-1.5">
      <!-- Row 1: Foundation tabs (orientation, architecture, authoring) -->
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="tab in foundationTabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="us-tab us-tab--foundation"
          :class="[
            activeTab === tab.id ? 'us-tab--active' : 'us-tab--inactive',
            activeTab === tab.id ? tab.activeClass : ''
          ]"
        >
          <component :is="tab.icon" class="w-4 h-4" />
          <span>{{ tab.label }}</span>
          <span class="us-tab__dot" :class="tab.dotClass" />
        </button>
      </div>

      <!-- Row 2: Module tabs (one per shipped module) -->
      <div class="flex flex-wrap gap-1.5 pt-1.5 border-t border-bd-border-subtle">
        <span class="self-center text-[10px] uppercase tracking-widest text-bd-text-muted px-1.5">Modules</span>
        <button
          v-for="tab in moduleTabs"
          :key="tab.id"
          @click="switchTab(tab.id)"
          class="us-tab us-tab--module"
          :class="activeTab === tab.id ? 'us-tab--active-module' : 'us-tab--inactive'"
        >
          <component :is="tab.icon" class="w-3.5 h-3.5" :class="activeTab === tab.id ? '' : tab.iconClass" />
          <span>{{ tab.label }}</span>
        </button>
      </div>
    </div>

    <!-- Tab Content -->
    <UltrascriptsGuide v-if="activeTab === 'overview'" />
    <UltrascriptsQuickStartGuide v-if="activeTab === 'quickstart'" />
    <UltrascriptsCookbookGuide v-if="activeTab === 'cookbook'" />
    <UltrascriptsArchitectureGuide v-if="activeTab === 'architecture'" />
    <UltrascriptsAuthoringGuide v-if="activeTab === 'authoring'" />
    <UltrascriptsWidgetGuide v-if="activeTab === 'widget'" />
    <UltrascriptsWebFetchGuide v-if="activeTab === 'webfetch'" />
    <UltrascriptsAiGuide v-if="activeTab === 'ai'" />
    <UltrascriptsSdkGuide v-if="activeTab === 'sdk'" />
    <UltrascriptsClockGuide v-if="activeTab === 'clock'" />
    <UltrascriptsWeatherGuide v-if="activeTab === 'weather'" />
    <UltrascriptsNetworkGuide v-if="activeTab === 'network'" />
    <UltrascriptsSystemGuide v-if="activeTab === 'system'" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UltrascriptsGuide from '@/components/guides/UltrascriptsGuide.vue'
import UltrascriptsQuickStartGuide from '@/components/guides/UltrascriptsQuickStartGuide.vue'
import UltrascriptsCookbookGuide from '@/components/guides/UltrascriptsCookbookGuide.vue'
import UltrascriptsArchitectureGuide from '@/components/guides/UltrascriptsArchitectureGuide.vue'
import UltrascriptsAuthoringGuide from '@/components/guides/UltrascriptsAuthoringGuide.vue'
import UltrascriptsWidgetGuide from '@/components/guides/UltrascriptsWidgetGuide.vue'
import UltrascriptsWebFetchGuide from '@/components/guides/UltrascriptsWebFetchGuide.vue'
import UltrascriptsAiGuide from '@/components/guides/UltrascriptsAiGuide.vue'
import UltrascriptsSdkGuide from '@/components/guides/UltrascriptsSdkGuide.vue'
import UltrascriptsClockGuide from '@/components/guides/UltrascriptsClockGuide.vue'
import UltrascriptsWeatherGuide from '@/components/guides/UltrascriptsWeatherGuide.vue'
import UltrascriptsNetworkGuide from '@/components/guides/UltrascriptsNetworkGuide.vue'
import UltrascriptsSystemGuide from '@/components/guides/UltrascriptsSystemGuide.vue'
import {
  Compass, Zap, BookOpen, Network, Wand2, LayoutDashboard, Globe, BrainCircuit, Terminal,
  Clock, CloudSun, Wifi, Cpu, Rocket
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const pageRoot = ref(null)

// Foundation tabs cover orientation, the paved adoption path (Quick Start + Cookbook),
// and the deeper platform-level docs (Architecture, Building Modules).
const foundationTabs = [
  { id: 'overview',     label: 'Overview',         icon: Compass,  dotClass: 'dot--purple', activeClass: 'us-tab--active-purple' },
  { id: 'quickstart',   label: 'Quick Start',      icon: Zap,      dotClass: 'dot--amber',  activeClass: 'us-tab--active-amber'  },
  { id: 'cookbook',     label: 'Cookbook',         icon: BookOpen, dotClass: 'dot--green',  activeClass: 'us-tab--active-green'  },
  { id: 'architecture', label: 'Architecture',     icon: Network,  dotClass: 'dot--cyan',   activeClass: 'us-tab--active-cyan'   },
  { id: 'authoring',    label: 'Building Modules', icon: Wand2,    dotClass: 'dot--blue',   activeClass: 'us-tab--active-blue'   }
]

// One module tab per shipped first-party module.
const moduleTabs = [
  { id: 'widget',   label: 'Widget',   icon: LayoutDashboard, iconClass: 'text-bd-green' },
  { id: 'webfetch',    label: 'WebFetch',    icon: Globe,           iconClass: 'text-bd-blue' },
  { id: 'ai',          label: 'AI',          icon: BrainCircuit,    iconClass: 'text-bd-purple' },
  { id: 'sdk',         label: 'SDK',         icon: Terminal,        iconClass: 'text-bd-cyan' },
  { id: 'clock',       label: 'Clock',       icon: Clock,           iconClass: 'text-bd-amber' },
  { id: 'weather',     label: 'Weather',     icon: CloudSun,        iconClass: 'text-bd-cyan' },
  { id: 'network',     label: 'Network',     icon: Wifi,            iconClass: 'text-bd-green' },
  { id: 'system',      label: 'System',      icon: Cpu,             iconClass: 'text-bd-purple' }
]

const allTabs = [...foundationTabs, ...moduleTabs]
const validTabIds = allTabs.map(t => t.id)
const activeTab = ref('overview')

const enhanceCodeBlocks = async () => {
  await nextTick()

  var root = pageRoot.value
  if (!root) return

  var blocks = root.querySelectorAll('pre')
  blocks.forEach(function (pre) {
    if (!(pre instanceof HTMLElement)) return
    if (pre.dataset.codeEnhanced === 'true') return
    if (!pre.textContent || !pre.textContent.trim()) return

    pre.dataset.codeEnhanced = 'true'

    var wrapper = document.createElement('div')
    wrapper.className = 'us-code-block'
    wrapper.style.position = 'relative'
    wrapper.style.border = '1px solid var(--bd-border-subtle)'
    wrapper.style.borderRadius = '0.75rem'
    wrapper.style.background = 'var(--bd-bg-tertiary)'
    wrapper.style.overflow = 'hidden'

    var parent = pre.parentNode
    if (!parent) return
    parent.insertBefore(wrapper, pre)
    wrapper.appendChild(pre)

    pre.style.margin = '0'
    pre.style.border = '0'
    pre.style.borderRadius = '0'
    pre.style.background = 'transparent'
    pre.style.padding = '1rem'
    pre.style.overflowX = 'auto'
    pre.style.overflowY = 'auto'
    pre.style.maxHeight = '28rem'
    pre.style.maxWidth = '100%'
    pre.style.whiteSpace = 'pre'
    pre.style.scrollbarWidth = 'thin'

    var button = document.createElement('button')
    button.type = 'button'
    button.textContent = 'Copy'
    button.setAttribute('aria-label', 'Copy code block')
    button.style.position = 'absolute'
    button.style.top = '0.5rem'
    button.style.right = '0.5rem'
    button.style.zIndex = '1'
    button.style.display = 'inline-flex'
    button.style.alignItems = 'center'
    button.style.justifyContent = 'center'
    button.style.padding = '0.375rem 0.625rem'
    button.style.borderRadius = '0.5rem'
    button.style.border = '1px solid var(--bd-border-subtle)'
    button.style.background = 'var(--bd-bg-primary)'
    button.style.color = 'var(--bd-text-secondary)'
    button.style.fontSize = '0.6875rem'
    button.style.fontWeight = '600'
    button.style.cursor = 'pointer'
    button.style.transition = 'all 0.15s ease'
    button.style.backdropFilter = 'blur(8px)'
    button.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.18)'

    button.addEventListener('mouseenter', function () {
      button.style.background = 'var(--bd-bg-secondary)'
      button.style.color = 'var(--bd-text-primary)'
    })
    button.addEventListener('mouseleave', function () {
      button.style.background = 'var(--bd-bg-primary)'
      button.style.color = 'var(--bd-text-secondary)'
    })
    button.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(pre.textContent || '')
        var oldText = button.textContent
        button.textContent = 'Copied!'
        button.style.color = 'var(--bd-green)'
        window.setTimeout(function () {
          button.textContent = oldText || 'Copy'
          button.style.color = 'var(--bd-text-secondary)'
        }, 1800)
      } catch (e) {
        button.textContent = 'Copy failed'
        button.style.color = 'var(--bd-red)'
        window.setTimeout(function () {
          button.textContent = 'Copy'
          button.style.color = 'var(--bd-text-secondary)'
        }, 1800)
      }
    })

    wrapper.appendChild(button)
  })
}

// Switch active tab and persist selection in the URL for shareable deep links.
const switchTab = (tabId) => {
  activeTab.value = tabId
  router.replace({ query: { ...route.query, tab: tabId } })
}

// Initialize from URL query (?tab=...) so direct links land on the right section.
onMounted(() => {
  if (route.query.tab && validTabIds.includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
  enhanceCodeBlocks()
})

// Sync with browser back/forward and external link changes.
watch(() => route.query.tab, (newTab) => {
  if (newTab && validTabIds.includes(newTab)) {
    activeTab.value = newTab
  } else if (!newTab) {
    activeTab.value = 'overview'
  }
})

watch(activeTab, () => {
  enhanceCodeBlocks()
})
</script>

<style scoped>
/* === Hero background === */
.ultrascripts-hero {
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

.hero-orb--purple {
  width: 240px;
  height: 240px;
  background: var(--bd-purple);
  top: -50px;
  right: -30px;
  animation: float 9s ease-in-out infinite;
}

.hero-orb--cyan {
  width: 180px;
  height: 180px;
  background: var(--bd-cyan);
  bottom: -40px;
  left: 8%;
  animation: float 11s ease-in-out infinite reverse;
}

.hero-orb--green {
  width: 140px;
  height: 140px;
  background: var(--bd-green);
  top: 15%;
  left: 45%;
  animation: float 13s ease-in-out infinite 2s;
  opacity: 0.18;
}

/* === Tab Bar === */
.ultrascripts-tab-bar {
  overflow-x: auto;
  scrollbar-width: none;
}

.ultrascripts-tab-bar::-webkit-scrollbar {
  display: none;
}

/* === Tab base === */
.us-tab {
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
.us-tab--inactive {
  color: var(--bd-text-muted);
  background: transparent;
}

.us-tab--inactive:hover {
  color: var(--bd-text-primary);
  background: var(--bd-bg-tertiary);
}

/* === Foundation tab dot indicators === */
.us-tab__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.dot--purple { background: var(--bd-purple); }
.dot--cyan { background: var(--bd-cyan); }
.dot--amber { background: var(--bd-amber); }
.dot--green { background: var(--bd-green); }
.dot--blue { background: var(--bd-blue); }

.us-tab--inactive .us-tab__dot {
  opacity: 0.4;
}

.us-tab--inactive:hover .us-tab__dot {
  opacity: 0.7;
}

/* === Active foundation tabs with color-coded backgrounds === */
.us-tab--active {
  color: var(--bd-text-primary);
  font-weight: 600;
}

.us-tab--active .us-tab__dot {
  opacity: 1;
  box-shadow: none;
}

.us-tab--active-purple {
  background: var(--bd-accent-muted);
  border-color: var(--bd-border-accent);
  color: var(--bd-accent-light);
}

.us-tab--active-purple .us-tab__dot {
  box-shadow: none;
}

.us-tab--active-cyan {
  background: var(--bd-accent-muted);
  border-color: var(--bd-border-accent);
  color: var(--bd-accent-light);
}

.us-tab--active-cyan .us-tab__dot {
  box-shadow: none;
}

.us-tab--active-amber {
  background: var(--bd-accent-muted);
  border-color: var(--bd-border-accent);
  color: var(--bd-accent-light);
}

.us-tab--active-amber .us-tab__dot {
  box-shadow: none;
}

.us-tab--active-green {
  background: var(--bd-accent-muted);
  border-color: var(--bd-border-accent);
  color: var(--bd-accent-light);
}

.us-tab--active-green .us-tab__dot {
  box-shadow: none;
}

.us-tab--active-blue {
  background: var(--bd-accent-muted);
  border-color: var(--bd-border-accent);
  color: var(--bd-accent-light);
}

.us-tab--active-blue .us-tab__dot {
  box-shadow: none;
}

/* === Active module tab with neutral accent === */
.us-tab--active-module {
  background: var(--bd-bg-tertiary);
  border-color: var(--bd-border-default);
  color: var(--bd-text-primary);
  font-weight: 600;
}

/* === Module tab styling that's slightly smaller and subtler === */
.us-tab--module {
  font-size: 0.8125rem;
  padding: 0.4375rem 0.75rem;
}
</style>
