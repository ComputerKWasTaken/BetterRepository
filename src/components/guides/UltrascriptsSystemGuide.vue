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
          <strong class="text-bd-amber">New to Ultrascripts?</strong> The recipes below assume the <code class="text-bd-green">bd.us</code> SDK helper from Quick Start.
        </div>
        <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/15 hover:bg-bd-amber/25 text-bd-amber text-[11px] font-semibold transition-colors">
          Quick Start
          <ArrowRight class="w-3 h-3" />
        </router-link>
        <router-link to="/ultrascripts?tab=cookbook" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Cookbook
        </router-link>
      </div>

      <!-- OVERVIEW -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Cpu class="w-5 h-5 text-bd-purple" />System Module Overview</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>System</strong> module reports device, display, and power hints from the browser. Use it to render
              platform-appropriate widget layouts (mobile vs. desktop), reduce work when the player is on battery, or annotate adventures with
              client metadata for debugging.
            </p>
          </div>
        </Transition>
      </section>

      <!-- OPS -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-purple" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>system.info</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Sanitized device and display metadata.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args: {}
// data:
{
  "platformType": "desktop" | "mobile" | "tablet",
  "userAgentFamily": "Chrome" | "Firefox" | "Safari" | "Edge" | "Other",
  "preferredLocale": "en-US",
  "preferredColorScheme": "light" | "dark",
  "viewport": { "widthPx": 1440, "heightPx": 900, "dpr": 2 }
}</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>system.power</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1500ms</span>
              </div>
              <p>Battery state when the platform supports the Battery Status API.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args: {}
// data (on ok):
{
  "supported": true,
  "charging": false,
  "level": 0.62,                  // 0..1
  "chargingTimeSec": null,
  "dischargingTimeSec": 14400
}
// or:
{ "supported": false }</pre>
              <p class="text-[11px] text-bd-text-muted">Modern Firefox and Safari disable the Battery Status API for privacy &mdash; treat <code>supported: false</code> as the common case.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- RECIPE -->
      <section id="guide-recipe" class="card">
        <button @click="toggleGuideSection('recipe')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Rocket class="w-5 h-5 text-bd-green" />Platform-Adaptive Layout Recipe</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipe') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipe')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Publish a simplified Scripture widget set on mobile; a richer dashboard on desktop.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function () {
  var lc = (info &amp;&amp; info.actionCount) || 1;
  var card = storyCards.find(function (c) { return c.title === 'ultrascripts:in:system'; });
  if (!card) return;
  try {
    var p = JSON.parse(card.value || '{}');
    var r = p.responses &amp;&amp; p.responses['sys-info-t' + (lc - 1)];
    if (r &amp;&amp; r.status === 'ok' &amp;&amp; r.completedLiveCount === (lc - 1)) {
      var widgets = (r.data.platformType === 'mobile')
        ? [{ type: 'stat-bar', label: 'HP', max: 100 }]
        : [
            { type: 'stat-bar', label: 'Health', max: 100 },
            { type: 'stat-bar', label: 'Mana',   max: 50  },
            { type: 'text',     label: 'Weapon' }
          ];
      var scripture = { v: 1, manifest: { widgets: widgets }, history: {} };
      scripture.history[lc] = { hp: state.hp || 100, mana: state.mana || 50, weapon: state.weapon || 'Iron Sword' };
      var s = storyCards.find(function (c) { return c.title === 'ultrascripts:state:scripture'; });
      if (s) s.value = JSON.stringify(scripture);
      else addStoryCard('ultrascripts:state:scripture', JSON.stringify(scripture));
    }
  } catch (e) {}
})();</pre>
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
                <h4 class="font-semibold text-bd-pink text-[12px]">Trusting battery info</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>power.supported</code> is <code>false</code> on most modern browsers.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Always branch on <code>supported</code>; never assume a level is available.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">User-agent sniffing</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Branching on every browser name leads to fragile code.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Prefer <code>platformType</code> + <code>viewport</code> + feature checks (via SDK config) over UA branching.</p>
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
import { ChevronDown, ChevronUp, Cpu, Terminal, Rocket, AlertTriangle, Zap, ArrowRight } from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipe', label: 'Recipe' },
  { id: 'pitfalls', label: 'Pitfalls' }
]
const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => { if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id); else expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) }
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => { const el = document.getElementById(`guide-${id}`); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (!expandedGuideSections.value.has(id)) { expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) } } }
const expandAllGuideSections = () => { expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)) }
const collapseAllGuideSections = () => { expandedGuideSections.value = new Set() }
</script>
