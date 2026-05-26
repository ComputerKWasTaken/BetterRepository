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
                <p class="text-[11px]">HTTP <code class="text-bd-green">GET</code>/<code class="text-bd-green">POST</code> with headers and body, plus web search lookups.</p>
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
                <strong class="text-bd-pink">Replay semantics:</strong> Both ops are marked <code class="text-bd-green">unsafe</code>.
                On undo/restore the script must filter stale responses by comparing <code class="text-bd-green">completedLiveCount</code> against the current turn.
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
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-pink/20 text-bd-pink">unsafe</span>
                <span class="text-[10px] text-bd-text-muted">3000ms</span>
              </div>
              <p>Performs a single HTTP(S) request to an origin the player has approved.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "url": "https://api.example.com/data",
  "options": {
    "method": "GET" | "POST",
    "headers": { "Accept": "application/json" },
    "body": "...",        // optional string
    "responseType": "json" | "text"
  }
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "status": 200,
  "ok": true,
  "headers": { ... },
  "body": { ... } | "raw text"
}</pre>
                </div>
              </div>
            </div>

            <!-- search -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>webfetch.search</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-pink/20 text-bd-pink">unsafe</span>
                <span class="text-[10px] text-bd-text-muted">3000ms</span>
              </div>
              <p>Web search lookup. Returns ranked result snippets for use in narrative grounding or trivia lookups.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "query": "string",
  "limit": 5            // optional, 1-10
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "query": "...",
  "results": [
    { "title": "...", "url": "...", "snippet": "..." }
  ]
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
      "options": { "method": "GET", "responseType": "json" }
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
        "ok": true,
        "body": { "worldName": "Aethelgard", "monstersSlain": 124 }
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
            Recipes
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- Recipe 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-[12px]">
                <Globe class="w-4 h-4" /> External API Data Fetcher
              </h4>
              <p>Issues a GET on every turn to top up scenario state with live data from an external API.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function() {
  var lc = (info && info.actionCount) || 1;
  var reqId = 'fetch-lore-t' + lc;

  var payload = {
    v: 1,
    requests: [{
      id: reqId,
      module: 'webfetch',
      op: 'fetch',
      args: {
        url: 'https://api.example.com/adventure/lore',
        options: { method: 'GET', responseType: 'json' }
      }
    }],
    acks: []
  };

  var out = storyCards.find(function(c) { return c.title === 'ultrascripts:out'; });
  if (out) out.value = JSON.stringify(payload);
  else addStoryCard('ultrascripts:out', JSON.stringify(payload));
})();</pre>
            </div>

            <!-- Recipe 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Live-Count-Safe Response Reader
              </h4>
              <p>Reads <code>ultrascripts:in:webfetch</code> on the next turn, ignoring stale responses from undone turns.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Input Modifier
(function() {
  var lc = (info && info.actionCount) || 1;
  var card = storyCards.find(function(c) { return c.title === 'ultrascripts:in:webfetch'; });
  if (!card) return;
  try {
    var p = JSON.parse(card.value || '{}');
    var r = p.responses && p.responses['fetch-lore-t' + lc];
    if (r && r.status === 'ok' && r.completedLiveCount === lc) {
      state.lore = r.data.body;  // body parsed as JSON
    }
  } catch (e) {}
})();</pre>
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
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Responses time out at 3000ms.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Only call fast endpoints; cache aggressively in <code>state</code>; design narrative fallbacks for missing data.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Duplicate replay charges</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Undo re-issues a fetch that already happened.</p>
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
  Rocket, CheckCircle2, AlertTriangle
} from 'lucide-vue-next'

// Sections are ordered: orient -> reference -> usage -> debugging.
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'wire', label: 'Wire Example' },
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
