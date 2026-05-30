<template>
  <div class="flex gap-6 animate-fade-in">
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all"><ChevronDown class="w-3 h-3" /></button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse all"><ChevronUp class="w-3 h-3" /></button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">{{ section.label }}</div>
          <button v-else @click="scrollToGuideSection(section.id)" class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary" :class="[isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted']">{{ section.label }}</button>
        </template>
      </div>
    </aside>

    <div class="flex-1 space-y-4 min-w-0">

      <!-- SDK paved-path banner -->
      <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5 flex items-center gap-3 flex-wrap">
        <Zap class="w-4 h-4 text-bd-amber flex-shrink-0" />
        <div class="flex-1 min-w-0 text-xs text-bd-text-secondary">
          <strong class="text-bd-amber">New to Ultrascripts?</strong> The patterns below assume the <code class="text-bd-green">bd.us</code> SDK helper from Quick Start.
        </div>
        <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/15 hover:bg-bd-amber/25 text-bd-amber text-[11px] font-semibold transition-colors">
          Quick Start
          <ArrowRight class="w-3 h-3" />
        </router-link>
        <router-link to="/ultrascripts?tab=cookbook" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Cookbook
        </router-link>
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication/modules/network" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Runtime source
        </a>
      </div>

      <!-- OVERVIEW -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Wifi class="w-5 h-5 text-bd-green" />Network Module Overview</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>Network</strong> module reports the player's <em>current</em> browser-side connection state. It does not perform requests
              itself &mdash; use <strong>WebFetch</strong> for that. Reach for Network when you want to <em>condition</em> behavior on the player being online
              or on a fast connection.
            </p>
            <p>
              Network state is intentionally mutable, so the single op is queried on demand rather than cached at session start.
            </p>
          </div>
        </Transition>
      </section>

      <!-- OPS -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-green" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>network.status</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Reports online state and best-available connection hints from the browser's Network Information API.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args: {}
// data:
{
  "online": true,
  "quality": "good" | "limited" | "constrained" | "offline" | "unknown",
  "connectionSupported": true,
  "effectiveType": "4g" | "3g" | "2g" | "slow-2g" | null,
  "downlinkMbps": 10.2,                // optional, may be absent on some browsers
  "rttMs": 50,                         // optional
  "saveData": false
}</pre>
              <p class="text-[11px] text-bd-text-muted">Several fields are best-effort: Firefox and Safari may report only <code>online</code>.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- USAGE PATTERN -->
      <section id="guide-recipe" class="card">
        <button @click="toggleGuideSection('recipe')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Rocket class="w-5 h-5 text-bd-green" />Graceful Offline Usage Pattern</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipe') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipe')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Use Network before optional remote work. It helps you avoid queueing WebFetch or AI tasks when the player is offline or on a constrained
              connection.
            </p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Author flow</h4>
                <ol class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>1. Queue <code>network.status</code> at startup or before remote features.</li>
                  <li>2. Read the later result with <code>bd.us.latest('network', 'status')</code>.</li>
                  <li>3. Store a simple flag like <code>state.offline = true</code>.</li>
                  <li>4. Skip nonessential remote calls when <code>online === false</code>.</li>
                </ol>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">How to interpret quality</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; <code>good</code>: normal behavior is reasonable.</li>
                  <li>&middot; <code>limited</code> or <code>constrained</code>: shorten requests and use cached data.</li>
                  <li>&middot; <code>unknown</code>: proceed carefully; browser hints are incomplete.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- PITFALLS -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-bd-pink" />Pitfalls</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Stale snapshot</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Result from session start is no longer accurate.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Re-query before critical network-dependent transitions.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Assuming all fields exist</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>downlinkMbps</code> is undefined in some browsers.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Treat every field beyond <code>online</code> as optional and use safe defaults.</p>
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
import { ChevronDown, ChevronUp, Wifi, Terminal, Rocket, AlertTriangle, Zap, ArrowRight } from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipe', label: 'Usage Pattern' },
  { id: 'pitfalls', label: 'Pitfalls' }
]
const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => { if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id); else expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) }
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => { const el = document.getElementById(`guide-${id}`); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (!expandedGuideSections.value.has(id)) { expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) } } }
const expandAllGuideSections = () => { expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)) }
const collapseAllGuideSections = () => { expandedGuideSections.value = new Set() }
</script>
