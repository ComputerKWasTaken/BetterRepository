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
            Cookbook Policy
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('about') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('about')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The Cookbook is now a pattern guide, not a second source of copy-paste scripts. Public executable snippets live in Quick Start
              and module-specific examples only when they are short, helper-based, and reviewed against the live runtime.
            </p>
            <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-amber/15 hover:bg-bd-amber/25 border border-bd-amber/30 text-bd-amber text-[11px] font-medium transition-colors">
              <Zap class="w-3.5 h-3.5" />
              Open Quick Start SDK Helper
            </router-link>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Paved path</h4>
              <p class="text-[11px]">
                Every real script should follow the same turn rhythm: call <code>bd.us.tick()</code>, read previous results,
                publish optional Scripture state, queue new capability-checked requests, then call <code>bd.us.commit()</code>.
              </p>
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
            </div>
          </div>
        </Transition>
      </section>

      <section id="guide-review" class="card">
        <button @click="toggleGuideSection('review')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-blue" />
            Before Promoting A Pattern To Code
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('review') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('review')" class="mt-4 grid md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30 space-y-1">
              <h4 class="font-semibold text-bd-green text-[12px]">Must Have</h4>
              <p class="text-bd-text-muted">Uses <code>bd.us</code>, avoids raw card writes, declares Scripture manifests before publishing, and commits once at the end.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
              <h4 class="font-semibold text-bd-pink text-[12px]">Must Avoid</h4>
              <p class="text-bd-text-muted">No functions on <code>state</code>, no top-level early returns, no same-turn response reads, and no <code>storyCards.find(c.title)</code>-only lookups.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30 space-y-1">
              <h4 class="font-semibold text-bd-amber text-[12px]">Manual Test</h4>
              <p class="text-bd-text-muted">Only promote a pattern to a snippet after testing it in AI Dungeon with the target hook and at least two turns of play.</p>
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
                <p class="text-bd-text-muted">Declare a Scripture manifest before publishing values, then confirm <code>ultrascripts:state:scripture</code> exists.</p>
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
  Heart, Search, ShieldCheck, Sparkles, Wand2, Zap
} from 'lucide-vue-next'

const patterns = [
  {
    title: 'HUD Widgets',
    icon: Heart,
    iconClass: 'text-bd-green',
    summary: 'Publish compact Scripture state for HP, mana, location, and status tags.',
    guidance: 'Use <code>bd.us.defineScripture(...)</code> once, then <code>bd.us.publishScripture(...)</code> from Context.'
  },
  {
    title: 'Time Of Day',
    icon: Clock,
    iconClass: 'text-bd-amber',
    summary: 'Tint narration from the player local clock without hand-editing story cards.',
    guidance: 'Queue <code>clock.now</code>, read <code>data.time</code> next turn, then append a short context note.'
  },
  {
    title: 'Weather Gameplay',
    icon: CloudSun,
    iconClass: 'text-bd-cyan',
    summary: 'Apply light mechanical flavor from real weather data.',
    guidance: 'Request <code>weather.current</code> sparingly and read <code>data.current.weatherCode</code>.'
  },
  {
    title: 'AI Co-GM',
    icon: BrainCircuit,
    iconClass: 'text-bd-purple',
    summary: 'Ask a secondary model for short flavor, summaries, or structured extraction.',
    guidance: 'Gate on <code>sdk.config</code>, use <code>ai.chat</code>, and consume the response on a later turn.'
  },
  {
    title: 'Structured Extraction',
    icon: Wand2,
    iconClass: 'text-bd-blue',
    summary: 'Convert prose into JSON that drives scenario state or widgets.',
    guidance: 'Use <code>responseFormat: { type: "json_object" }</code>, low temperature, and defensive parsing.'
  },
  {
    title: 'External Data',
    icon: Globe,
    iconClass: 'text-bd-blue',
    summary: 'Fetch approved external data once, then cache it on plain scenario state.',
    guidance: 'Use <code>webfetch.fetch</code> or <code>webfetch.search</code> only after consent and capability checks.'
  },
  {
    title: 'Adaptive Layout',
    icon: Cpu,
    iconClass: 'text-bd-purple',
    summary: 'Choose smaller widgets on mobile and richer dashboards on desktop.',
    guidance: 'Read <code>system.info</code> and branch on <code>data.deviceClass</code>.'
  }
]

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'about', label: 'Cookbook Policy' },
  { id: 'patterns', label: 'Pattern Matrix' },
  { id: 'review', label: 'Promotion Rules' },
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
