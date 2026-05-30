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
          <strong class="text-bd-amber">New to Ultrascripts?</strong> The patterns below assume the <code class="text-bd-green">bd.us</code> SDK helper from Quick Start.
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
            <Globe class="w-5 h-5 text-bd-blue" />
            WebFetch Module Overview
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              <strong>WebFetch</strong> is Ultrascripts' gateway to the public internet. AI Dungeon's script sandbox blocks all network access by
              default; WebFetch tunnels controlled HTTP(S) requests through the BetterDungeon extension, with explicit per-origin player consent and
              built-in rate limits.
            </p>
            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Wifi class="w-4 h-4 text-bd-blue" /> Capabilities
                </h4>
                <p class="text-[11px]">Consent-gated HTTP <code class="text-bd-green">GET</code>/<code class="text-bd-green">HEAD</code>/<code class="text-bd-green">OPTIONS</code> requests, plus web search lookups.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <ShieldCheck class="w-4 h-4 text-bd-purple" /> Consent Model
                </h4>
                <p class="text-[11px]">Player approves each new origin once. Per-domain allow/deny lists persist in extension storage.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Lock class="w-4 h-4 text-bd-pink" /> Safety Bounds
                </h4>
                <p class="text-[11px]">Per-domain rate limits, response size caps, request timeouts, and an extension-wide kill switch.</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-[11px]">
                <strong class="text-bd-pink">Replay semantics:</strong> Both ops are marked <code class="text-bd-green">safe</code> in the module contract.
                If freshness matters, still compare <code class="text-bd-green">completedLiveCount</code> against the current turn before consuming cached data.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== OPS REFERENCE ===================== -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-blue" />
            Operations Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- fetch -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>webfetch.fetch</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms max</span>
              </div>
              <p>Performs a single HTTP(S) request to an origin the player has approved.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "url": "https://api.example.com/data",
  "method": "GET",
  "headers": { "Accept": "application/json" },
  "timeoutMs": 15000,
  "maxBodyBytes": 50000
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "status": 200,
  "headers": { ... },
  "bodyEncoding": "text",
  "body": "raw response text",
  "truncated": false,
  "request": {
    "url": "https://api.example.com/data",
    "origin": "https://api.example.com",
    "method": "GET",
    "strippedHeaders": []
  }
}</pre>
                </div>
              </div>
            </div>

            <!-- search -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>webfetch.search</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms max</span>
              </div>
              <p>Web search lookup. Returns ranked result snippets for use in narrative grounding or trivia lookups.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "query": "string",
  "maxResults": 5       // optional, 1-10
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "query": "...",
  "provider": "duckduckgo",
  "status": 200,
  "heading": "...",
  "answer": "...",
  "abstractText": "...",
  "abstractUrl": "...",
  "related": [
    { "text": "...", "url": "..." }
  ],
  "truncated": false
}</pre>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WIRE EXAMPLE ===================== -->
      <section id="guide-wire" class="card">
        <button @click="toggleGuideSection('wire')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-amber" />
            Wire Example
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('wire') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('wire')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>One round-trip from request envelope to response envelope.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// ultrascripts:out  (script writes)
{
  "v": 1,
  "requests": [{
    "id": "fetch-lore-t12",
    "module": "webfetch",
    "op": "fetch",
    "args": {
      "url": "https://api.example.com/adventure/stats",
      "method": "GET",
      "headers": { "Accept": "application/json" },
      "maxBodyBytes": 50000
    }
  }],
  "acks": []
}

// ultrascripts:in:webfetch  (extension writes back)
{
  "v": 1,
  "responses": {
    "fetch-lore-t12": {
      "status": "ok",
      "data": {
        "status": 200,
        "bodyEncoding": "text",
        "body": "{ \"worldName\": \"Aethelgard\", \"monstersSlain\": 124 }"
      },
      "completedLiveCount": 12
    }
  }
}</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button @click="toggleGuideSection('recipes')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Usage Patterns
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- Pattern 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-[12px]">
                <Globe class="w-4 h-4" /> External API Data Fetcher
              </h4>
              <p>Issues a GET on every turn to top up scenario state with live data from an external API.</p>
              <p class="text-[11px] text-bd-text-muted">
                Use <code>bd.us.call('webfetch', 'fetch', args)</code> from a gated Context modifier, not raw story-card writes. Keep fetches
                sparse, consent-aware, and scoped to origins the player has approved.
              </p>
            </div>

            <!-- Pattern 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Live-Count-Safe Response Reader
              </h4>
              <p>Reads <code>ultrascripts:in:webfetch</code> on the next turn, ignoring stale responses from undone turns.</p>
              <p class="text-[11px] text-bd-text-muted">
                Read cached results through <code>bd.us.latest('webfetch', 'fetch')</code>. If freshness matters, compare
                <code>completedLiveCount</code> to the current turn before using the body.
              </p>
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
                <h4 class="font-semibold text-bd-pink text-[12px]">Consent denied silently</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Request appears to vanish.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Check the WebFetch tab in the extension popup; the player likely dismissed the origin prompt or the domain is in the deny list.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Slow upstream API</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Responses time out at 30000ms max.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Only call fast endpoints; cache aggressively in <code>state</code>; design narrative fallbacks for missing data.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Stale replay data</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Undo or retry leaves an older fetch response in the cache.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Always validate <code>completedLiveCount</code> against <code>info.actionCount</code> before consuming a response.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">CORS-style failures</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Status comes back <code>err</code> for endpoints that work in a browser tab.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> The host may reject the extension's User-Agent or require auth. Use an endpoint that accepts unauthenticated cross-origin requests.</p>
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
  ChevronDown, ChevronUp, Globe, Wifi, ShieldCheck, Lock, Terminal, Zap,
  Rocket, CheckCircle2, AlertTriangle, ArrowRight
} from 'lucide-vue-next'

// Sections are ordered: orient -> reference -> usage -> debugging.
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'wire', label: 'Wire Example' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipes', label: 'Usage Patterns' },
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
