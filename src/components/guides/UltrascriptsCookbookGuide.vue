<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all"><ChevronDown class="w-3 h-3" /></button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse"><ChevronUp class="w-3 h-3" /></button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">{{ section.label }}</div>
          <button v-else @click="scrollToGuideSection(section.id)" class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary" :class="[isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted']">{{ section.label }}</button>
        </template>
      </div>
    </aside>

    <div class="flex-1 space-y-4 min-w-0">
      <section id="guide-about" class="card">
        <button @click="toggleGuideSection('about')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-bd-amber" />
            Cookbook Overview
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('about') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('about')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The Cookbook is a pattern guide for deciding which Ultrascripts capability fits your scenario. Use it to choose a flow,
              then open Quick Start or the module guide for the exact helper calls and operation contracts.
            </p>
            <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-amber/15 hover:bg-bd-amber/25 border border-bd-amber/30 text-bd-amber text-[11px] font-medium transition-colors">
              <Zap class="w-3.5 h-3.5" />
              Open Quick Start SDK Helper
            </router-link>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Paved path</h4>
              <p class="text-[11px]">
                Every real script should follow the same turn rhythm: call <code>bd.us.tick()</code>, read previous results,
                publish optional Widget state, queue new capability-checked requests, then call <code>bd.us.commit()</code>.
              </p>
            </div>
            <p class="text-[11px] text-bd-text-muted">
              Treat this page as a design map: decide what capability you need here, then open the linked module guide for the exact operation
              contract or Quick Start for the SDK helper.
            </p>
          </div>
        </Transition>
      </section>

      <section id="guide-flow" class="card">
        <button @click="toggleGuideSection('flow')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ListChecks class="w-5 h-5 text-bd-amber" />
            Recipe Flow
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('flow') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('flow')" class="mt-4 grid md:grid-cols-4 gap-3 text-xs text-bd-text-secondary">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
              <h4 class="font-semibold text-bd-amber text-[12px]">1. Detect</h4>
              <p class="text-[11px]">Use <code>bd.us.available()</code> and <code>bd.us.has(module, op)</code> before depending on a capability.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
              <h4 class="font-semibold text-bd-blue text-[12px]">2. Read</h4>
              <p class="text-[11px]">Read previous results first with <code>bd.us.latest()</code>. Responses are never same-turn.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
              <h4 class="font-semibold text-bd-purple text-[12px]">3. Decide</h4>
              <p class="text-[11px]">Convert raw module data into small story flags, context notes, or widget values.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
              <h4 class="font-semibold text-bd-green text-[12px]">4. Queue</h4>
              <p class="text-[11px]">Queue the next request only if useful, then call <code>bd.us.commit()</code> once at the end.</p>
            </div>
          </div>
        </Transition>
      </section>

      <section id="guide-patterns" class="card">
        <button @click="toggleGuideSection('patterns')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-bd-green" />
            Pattern Matrix
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('patterns') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('patterns')" class="mt-4 grid md:grid-cols-2 gap-3 text-xs text-bd-text-secondary">
            <div v-for="pattern in patterns" :key="pattern.title" class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-1.5">
              <h4 class="font-semibold text-bd-text-primary text-[12px] flex items-center gap-1.5">
                <component :is="pattern.icon" class="w-4 h-4" :class="pattern.iconClass" />
                {{ pattern.title }}
              </h4>
              <p>{{ pattern.summary }}</p>
              <p class="text-[11px] text-bd-text-muted" v-html="pattern.guidance"></p>
              <router-link :to="pattern.link" class="inline-flex text-[11px] font-semibold text-bd-amber hover:underline">
                Open {{ pattern.module }} guide
              </router-link>
            </div>
          </div>
        </Transition>
      </section>

      <section id="guide-source" class="card">
        <button @click="toggleGuideSection('source')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code2 class="w-5 h-5 text-bd-cyan" />
            Source Map
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('source') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('source')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              These docs describe the public contract. When you need the hard implementation reference, use the BetterDungeon source folders below.
            </p>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-[11px]">
              <a v-for="source in sourceLinks" :key="source.label" :href="source.href" target="_blank" rel="noopener noreferrer" class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-cyan/50 transition-colors">
                <strong class="block text-bd-text-primary">{{ source.label }}</strong>
                <span class="text-bd-text-muted">{{ source.summary }}</span>
              </a>
            </div>
          </div>
        </Transition>
      </section>

      <section id="guide-review" class="card">
        <button @click="toggleGuideSection('review')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-blue" />
            Pattern Checklist
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('review') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('review')" class="mt-4 grid md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30 space-y-1">
              <h4 class="font-semibold text-bd-green text-[12px]">Must Have</h4>
              <p class="text-bd-text-muted">Uses <code>bd.us</code>, avoids raw card writes, declares Widget manifests before publishing, and commits once at the end.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
              <h4 class="font-semibold text-bd-pink text-[12px]">Must Avoid</h4>
              <p class="text-bd-text-muted">No functions on <code>state</code>, no top-level early returns, no same-turn response reads, and no <code>storyCards.find(c.title)</code>-only lookups.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Turn Rhythm</h4>
              <p class="text-bd-text-muted">Read prior responses before queuing new work, and remember module responses arrive on a later turn.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-cyan/30 space-y-1">
              <h4 class="font-semibold text-bd-cyan text-[12px]">Fallback Posture</h4>
              <p class="text-bd-text-muted">Enhanced scripts should degrade quietly. Required scripts should explain the missing module or configuration clearly.</p>
            </div>
          </div>
        </Transition>
      </section>

      <section id="guide-debug" class="card">
        <button @click="toggleGuideSection('debug')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Search class="w-5 h-5 text-bd-pink" />
            Debugging Checklist
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('debug') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('debug')" class="mt-4 space-y-3">
            <p class="text-xs text-bd-text-secondary">When something is not working, walk this list in order.</p>
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">No runtime</h4>
                <p class="text-bd-text-muted">Check <code>bd.us.available()</code>. If false, the heartbeat card is missing or unreadable.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">No module</h4>
                <p class="text-bd-text-muted">Check <code>bd.us.has(module, op)</code>. If false, the module is disabled, missing, or not mounted yet.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">No response</h4>
                <p class="text-bd-text-muted">Responses arrive on a later turn. Guard <code>bd.us.latest(...)</code> and make sure <code>bd.us.commit()</code> ran.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">No widget</h4>
                <p class="text-bd-text-muted">Declare a Widget manifest before publishing values, then confirm <code>ultrascripts:state:widget</code> exists.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  BookOpen, BrainCircuit, ChevronDown, ChevronUp, Clock, CloudSun, Cpu, Globe,
  Code2, Heart, ListChecks, Search, ShieldCheck, Sparkles, Wand2, Zap
} from 'lucide-vue-next'

const sourceBase = 'https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication'

const patterns = [
  {
    title: 'HUD Widgets',
    icon: Heart,
    iconClass: 'text-bd-green',
    summary: 'Publish compact Widget state for HP, mana, location, and status tags.',
    guidance: 'Use <code>bd.us.defineWidget(...)</code> once, then <code>bd.us.publishWidget(...)</code> from Context.',
    link: '/ultrascripts?tab=widget',
    module: 'Widget'
  },
  {
    title: 'Time Of Day',
    icon: Clock,
    iconClass: 'text-bd-amber',
    summary: 'Tint narration from the player local clock without hand-editing story cards.',
    guidance: 'Queue <code>clock.now</code>, read <code>data.time</code> next turn, then append a short context note.',
    link: '/ultrascripts?tab=clock',
    module: 'Clock'
  },
  {
    title: 'Weather Gameplay',
    icon: CloudSun,
    iconClass: 'text-bd-cyan',
    summary: 'Apply light mechanical flavor from real weather data.',
    guidance: 'Request <code>weather.current</code> sparingly and read <code>data.current.weatherCode</code>.',
    link: '/ultrascripts?tab=weather',
    module: 'Weather'
  },
  {
    title: 'AI Co-GM',
    icon: BrainCircuit,
    iconClass: 'text-bd-purple',
    summary: 'Queue bounded async AI requests through the AI module.',
    guidance: 'Check <code>ai.status</code>, branch on <code>data.ready</code>, then use <code>ai.query</code> when the backend is configured.',
    link: '/ultrascripts?tab=ai',
    module: 'AI'
  },
  {
    title: 'Structured Extraction',
    icon: Wand2,
    iconClass: 'text-bd-blue',
    summary: 'Ask for JSON output and validate it before applying state changes.',
    guidance: 'Use <code>ai.query</code> with <code>output.type === "json"</code> and a JSON schema once <code>ai.status</code> reports ready.',
    link: '/ultrascripts?tab=ai',
    module: 'AI'
  },
  {
    title: 'External Data',
    icon: Globe,
    iconClass: 'text-bd-blue',
    summary: 'Fetch approved external data once, then cache it on plain scenario state.',
    guidance: 'Use <code>webfetch.fetch</code> or <code>webfetch.search</code> only after consent and capability checks.',
    link: '/ultrascripts?tab=webfetch',
    module: 'WebFetch'
  },
  {
    title: 'Adaptive Layout',
    icon: Cpu,
    iconClass: 'text-bd-purple',
    summary: 'Choose smaller widgets on mobile and richer dashboards on desktop.',
    guidance: 'Read <code>system.info</code> and branch on <code>data.deviceClass</code>.',
    link: '/ultrascripts?tab=system',
    module: 'System'
  }
]

const sourceLinks = [
  { label: 'Core runtime', summary: 'Transport, dispatcher, heartbeat, and shared Ultrascripts services.', href: `${sourceBase}/services/ultrascripts` },
  { label: 'Widget module', summary: 'Widget state publishing and renderer integration.', href: `${sourceBase}/modules/widget` },
  { label: 'WebFetch module', summary: 'Consent-gated fetch and search ops.', href: `${sourceBase}/modules/webfetch` },
  { label: 'AI module', summary: 'Async status/query contract with text, schema-backed JSON, and thinking levels.', href: `${sourceBase}/modules/ai` },
  { label: 'SDK module', summary: 'Runtime version and sanitized player configuration.', href: `${sourceBase}/modules/sdk` },
  { label: 'Clock module', summary: 'Time, timezone, and formatting ops.', href: `${sourceBase}/modules/clock` },
  { label: 'Geolocation module', summary: 'Permission and browser coordinate ops.', href: `${sourceBase}/modules/geolocation` },
  { label: 'Weather module', summary: 'Current conditions and forecast ops.', href: `${sourceBase}/modules/weather` },
  { label: 'Network module', summary: 'Online state and connection quality hints.', href: `${sourceBase}/modules/network` },
  { label: 'System module', summary: 'Device, display, locale, and power hints.', href: `${sourceBase}/modules/system` }
]

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'about', label: 'Cookbook Overview' },
  { id: 'flow', label: 'Recipe Flow' },
  { id: 'patterns', label: 'Pattern Matrix' },
  { id: 'source', label: 'Source Map' },
  { id: 'review', label: 'Pattern Checklist' },
  { id: 'debug', label: 'Debugging Checklist' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => {
  if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id)
  else expandedGuideSections.value.add(id)
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(id)) {
      expandedGuideSections.value.add(id)
      expandedGuideSections.value = new Set(expandedGuideSections.value)
    }
  }
}
const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id))
}
const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
