<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all">
              <ChevronDown class="w-3 h-3" />
            </button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse all">
              <ChevronUp class="w-3 h-3" />
            </button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">
            {{ section.label }}
          </div>
          <button
            v-else
            @click="scrollToGuideSection(section.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary"
            :class="[
              isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted'
            ]"
          >
            {{ section.label }}
          </button>
        </template>
      </div>
    </aside>

    <!-- Main Content -->
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

      <!-- ===================== OVERVIEW ===================== -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-cyan" />
            SDK Module Overview
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>SDK module</strong> exposes a narrow, read-only window into the BetterDungeon extension itself: its version, its feature flags,
              and the player's safe-to-expose Ultrascripts preferences. Scenarios call it to <em>adapt</em> behavior to a player's setup, not to control it.
            </p>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <h4 class="font-semibold text-bd-cyan text-[12px] mb-1.5 flex items-center gap-1.5">
                <Search class="w-4 h-4" /> Heartbeat vs. SDK &mdash; pick the right one
              </h4>
              <ul class="space-y-1 text-[11px]">
                <li>&middot; <strong>Heartbeat</strong> = <em>"is Ultrascripts present, and which modules/ops are mounted?"</em> Free, synchronous, present at turn-0.</li>
                <li>&middot; <strong>SDK</strong> = <em>"what does the player's BetterDungeon look like, and how should I adapt?"</em> A real op call, slightly slower, returns rich metadata.</li>
              </ul>
              <p class="text-[11px] mt-1.5">
                If you only need to check availability, read the heartbeat card. Reach for SDK ops when you need the deeper picture (cost controls,
                display preferences, AI configured status, etc.).
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== OPS REFERENCE ===================== -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code class="w-5 h-5 text-bd-cyan" />
            Operations Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- version -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.version</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Returns minimal version metadata. Stable and cheap; safe to call on every adventure load if you need it.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",
  "betterDungeonVersion": "2.0.0",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "BetterDungeon"
}</pre>
              </div>
            </div>

            <!-- config -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.config</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1500ms</span>
              </div>
              <p>Returns the full sanitized configuration surface: feature flags, module preferences, Scripture display knobs, WebFetch consent counts, and Provider AI status + cost controls.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (representative)</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",
  "betterDungeonVersion": "2.0.0",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "BetterDungeon",
  "features": {
    "ultrascripts": true,
    "markdown": true,
    "command": true,
    "try": true,
    "triggerHighlight": true,
    "hotkey": true,
    "favoriteInstructions": true,
    "inputModeColor": true,
    "characterPreset": true,
    "autoSee": false,
    "notes": true,
    "storyCardModalDock": true,
    "inputHistory": true,
    "textToSpeech": false
  },
  "ultrascripts": {
    "enabled": true,
    "runtimeEnabled": true,
    "debug": false,
    "modulePreferences": {
      "scripture": true, "webfetch": true, "clock": true,
      "sdk": true, "geolocation": true, "weather": true,
      "network": true, "system": true, "ai": true
    },
    "scriptureDisplay": {
      "size": "normal",       // "compact" | "normal" | "comfortable" | "large"
      "maxHeight": "medium",  // "short"   | "medium" | "tall"
      "layout": "balanced"    // "balanced" | "stacked"
    },
    "webfetch": {
      "savedOriginCount": 0,
      "allowCount": 0,
      "denyCount": 0
    },
    "ai": {
      "configured": true,
      "defaultModel": "google/gemini-2.0-flash-exp:free",
      "costControls": {
        "freeModelsOnly": true,
        "advancedOpen": false,
        "maxPromptPricePerMillion": 0,
        "maxCompletionPricePerMillion": 0,
        "perCallEstimateCap": 0,
        "dailySpendCap": 0,
        "monthlySpendCap": 0
      }
    }
  }
}</pre>
              </div>
              <div class="p-2 rounded bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
                <strong class="text-bd-amber">Security guarantee:</strong> The OpenRouter API key is <strong>never</strong> exposed.
                The <code>ai.configured</code> boolean is the only signal that a key exists. Domain allow/deny lists for WebFetch are reported as counts, not as origin strings.
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== HELPER LIBRARY ===================== -->
      <section id="guide-helper" class="card">
        <button @click="toggleGuideSection('helper')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Library class="w-5 h-5 text-bd-amber" />
            Script-Side Helper Library
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('helper') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('helper')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Wrap heartbeat lookups behind a small helper so scenario code reads cleanly. Drop this into your <strong>Library</strong> script and reuse it across modifiers.
            </p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
var bd = state.bd;
bd.sdk = bd.sdk || {};

function getHeartbeat() {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] &amp;&amp; cards[i].title === 'ultrascripts:heartbeat') {
      try { return JSON.parse(cards[i].value || '{}'); } catch (e) { return null; }
    }
  }
  return null;
}

bd.sdk.hasModule = function (moduleId) {
  var hb = getHeartbeat();
  var mods = (hb &amp;&amp; Array.isArray(hb.modules)) ? hb.modules : [];
  for (var i = 0; i < mods.length; i++) {
    if (mods[i] &amp;&amp; mods[i].id === moduleId) return true;
  }
  return false;
};

bd.sdk.hasOp = function (moduleId, opName) {
  var hb = getHeartbeat();
  var mods = (hb &amp;&amp; Array.isArray(hb.modules)) ? hb.modules : [];
  for (var i = 0; i < mods.length; i++) {
    var m = mods[i];
    if (!m || m.id !== moduleId) continue;
    var ops = Array.isArray(m.ops) ? m.ops : [];
    return ops.indexOf(opName) !== -1;
  }
  return false;
};</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button @click="toggleGuideSection('recipes')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Recipes
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Progressive Enhancement
              </h4>
              <p>Use Scripture widgets when available; otherwise fall back to plain bracketed status text.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function () {
  var bd = state.bd || {};
  if (bd.sdk &amp;&amp; bd.sdk.hasModule('scripture')) {
    // Publish a widget instead of plain text
    var s = { v: 1, manifest: { widgets: [{ type: 'stat-bar', label: 'HP', max: 100 }] }, history: {} };
    s.history[(info &amp;&amp; info.actionCount) || 1] = { hp: state.hp || 100 };
    var card = storyCards.find(function (c) { return c.title === 'ultrascripts:state:scripture'; });
    if (card) card.value = JSON.stringify(s);
    else addStoryCard('ultrascripts:state:scripture', JSON.stringify(s));
  } else {
    text += '\n[HP: ' + (state.hp || 100) + '/100]';
  }
})();</pre>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-[12px]">
                <RefreshCw class="w-4 h-4" /> Generic Ops Helper
              </h4>
              <p>One reusable function that any module call can flow through, with auto-acks and live-count-suffixed request ids.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
state.bd.activeRequests = state.bd.activeRequests || {};

state.bd.sendOpRequest = function (moduleId, opName, args) {
  var lc = (info &amp;&amp; info.actionCount) || 1;
  var reqId = moduleId + '-' + opName + '-t' + lc;

  var payload = {
    v: 1,
    requests: [{ id: reqId, module: moduleId, op: opName, args: args }],
    acks: Object.keys(state.bd.activeRequests)
  };

  var card = storyCards.find(function (c) { return c.title === 'ultrascripts:out'; });
  if (card) card.value = JSON.stringify(payload);
  else addStoryCard('ultrascripts:out', JSON.stringify(payload));

  state.bd.activeRequests[reqId] = true;
  return reqId;
};</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Reading SDK before heartbeat fires</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> SDK call lands before <code>ultrascripts:heartbeat</code> exists.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Check for the heartbeat card first. If absent, treat Ultrascripts as not present and fall back gracefully.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Duplicate request ids per turn</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Two SDK calls in one modifier cycle clobber each other.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Suffix every request id with the live count (or a counter you increment yourself).</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Assuming a key is configured</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Code calls <code>ai.chat</code> before reading <code>sdk.config</code>.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Read <code>ultrascripts.ai.configured</code> from <code>sdk.config</code> and surface a friendly prompt if <code>false</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Hardcoding feature flag values</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Code assumes <code>features.notes</code> is always true.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Treat every feature flag as user-controlled. Always branch on the actual value, never assume.</p>
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
  ChevronDown, ChevronUp, Terminal, Search, Code, Library, Rocket,
  CheckCircle2, RefreshCw, AlertTriangle, Zap, ArrowRight
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'helper', label: 'Helper Library' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipes', label: 'Recipes' },
  { id: 'pitfalls', label: 'Pitfalls' }
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
