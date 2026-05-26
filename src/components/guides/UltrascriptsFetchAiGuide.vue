<template>
  <!-- Table of Contents - Sticky Sidebar -->
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

      <!-- ===================== WEBFETCH (HTTP REQUESTS) ===================== -->
      <section id="guide-webfetch" class="card">
        <button
          @click="toggleGuideSection('webfetch')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Globe class="w-5 h-5 text-bd-blue" />
            WebFetch (HTTP Requests)
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('webfetch') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('webfetch')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              WebFetch is Ultrascripts' secure gateway to the public internet. Operating inside a sandbox usually blocks all network requests, but WebFetch lets scenario scripts make programmatic HTTP calls (GET, POST, etc.) and run web searches. By using the Story Card channel, requests are sent securely to the BetterDungeon client, which executes the request and posts the results back.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Wifi class="w-4 h-4 text-bd-blue" />
                  Capability
                </h3>
                <p class="text-bd-text-secondary">
                  Execute GET/POST requests and perform web searches to query live external APIs or fetch up-to-date documentation.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <ShieldCheck class="w-4 h-4 text-bd-purple" />
                  Consent Model
                </h3>
                <p class="text-bd-text-secondary">
                  Strictly opt-in. The player is presented with a clear consent dialog for every new host domain before a script can connect.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Lock class="w-4 h-4 text-bd-pink" />
                  Rate Limits
                </h3>
                <p class="text-bd-text-secondary">
                  Limits prevent malicious scripts from flooding third-party sites or locking the AI Dungeon generation queue.
                </p>
              </div>
            </div>

            <!-- Request/Response Flow -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3 text-xs">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-blue" />
                The WebFetch Request Cycle
              </h3>
              <p class="text-bd-text-secondary">
                WebFetch operations are marked as <strong>unsafe for replay</strong>. Since network states are mutable and operations cost resources, BetterDungeon blocks these operations during Undo and Redo cycles to prevent accidental duplicated calls.
              </p>
              
              <div class="space-y-2">
                <div class="font-semibold text-[11px] text-bd-text-primary">Wire Format Example:</div>
                <pre class="p-3 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Request - written to 'ultrascripts:out' card
{
  "v": 1,
  "requests": [{
    "id": "fetch-adventure-lore-1",
    "module": "webfetch",
    "op": "fetch",
    "args": { "url": "https://api.example.com/adventure/stats" }
  }],
  "acks": []
}

// Response - read from 'ultrascripts:in:webfetch' card
{
  "v": 1,
  "responses": {
    "fetch-adventure-lore-1": {
      "status": "ok",
      "data": { "worldName": "Aethelgard", "monstersSlain": 124 },
      "completedLiveCount": 12
    }
  }
}</pre>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PROVIDER AI (LLM PIPELINES) ===================== -->
      <section id="guide-provider-ai" class="card">
        <button
          @click="toggleGuideSection('provider-ai')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BrainCircuit class="w-5 h-5 text-bd-purple" />
            Provider AI (LLM Pipelines)
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('provider-ai') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('provider-ai')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              The Provider AI module allows scripts to orchestrate advanced, multi-step LLM operations inside the story sandbox. By communicating with a configured OpenRouter gateway, scenarios can deploy secondary models to act as Co-Game Masters, track inventory logically, or format lore cards dynamically.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- API Key Flow -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/20 space-y-2">
                <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                  <Lock class="w-4 h-4 text-bd-purple" /> OpenRouter Key Integration
                </h4>
                <p>
                  API keys are configured safely by the player inside the BetterDungeon popup. Scenario scripts <strong>never</strong> have direct access to the raw key, preventing malicious scenarios from stealing credentials. Config audits report status via a simple <code>configured: true/false</code> boolean.
                </p>
              </div>

              <!-- Cost Controls -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/20 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Cost &amp; Safety Controls
                </h4>
                <p>
                  To prevent runaway scripts from racking up expensive API bills, players configure granular caps inside the extension. The system enforces: daily/monthly spending caps, maximum price parameters per million tokens, and an option to force free-tier models only.
                </p>
              </div>
            </div>

            <!-- Operations Table -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary">Available Operations</h3>
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
                <div class="grid grid-cols-3 gap-2 border-b border-bd-border-subtle pb-2 font-semibold">
                  <span>Operation</span>
                  <span>Parameters</span>
                  <span>Description</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-[11px]">
                  <strong class="text-bd-green">chat</strong>
                  <span class="text-bd-text-muted">messages[], model, temperature, max_tokens</span>
                  <span class="text-bd-text-secondary">Pipes prompts to OpenRouter models, returning completions. Unsafe for replay.</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <strong class="text-bd-blue">models</strong>
                  <span class="text-bd-text-muted">none</span>
                  <span class="text-bd-text-secondary">Lists all active and supported OpenRouter models. Safe for replay.</span>
                </div>
                <div class="grid grid-cols-3 gap-2 text-[11px] pt-1">
                  <strong class="text-bd-purple">testConnection</strong>
                  <span class="text-bd-text-muted">none</span>
                  <span class="text-bd-text-secondary">Checks whether the player's configured API key is valid. Safe for replay.</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== NETWORK RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button
          @click="toggleGuideSection('recipes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Network Recipes &amp; Boilerplate
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Copy these production-tested templates to orchestrate API queries and external LLM connections directly from your adventure code.
            </p>

            <!-- Recipe 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-3">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-xs">
                <Globe class="w-4 h-4" /> Recipe 1: External API Data Fetcher
              </h4>
              <p>
                Fetches live scenario data or items from an external database API during turn-start, updating the story card payload seamlessly.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Library & Context Modifier
state.bd = state.bd || {};

function queryExternalDatabase() {
  var lc = (info && info.actionCount) || 1;
  var reqId = 'db-query-' + lc;

  // Build the WebFetch request
  var requestPayload = {
    v: 1,
    requests: [{
      id: reqId,
      module: 'webfetch',
      op: 'fetch',
      args: {
        url: 'https://api.example.com/adventure/lore',
        options: { method: 'GET' }
      }
    }],
    acks: []
  };

  // Find or update output card
  var outCard = storyCards.find(function(c) { return c.title === 'ultrascripts:out'; });
  if (outCard) {
    outCard.value = JSON.stringify(requestPayload);
  } else {
    addStoryCard('ultrascripts:out', JSON.stringify(requestPayload));
  }
}

// Execute query conditionally
if (info && info.actionCount > 0) {
  queryExternalDatabase();
}</pre>
            </div>

            <!-- Recipe 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-3">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-xs">
                <BrainCircuit class="w-4 h-4" /> Recipe 2: AI Co-GM Assistant
              </h4>
              <p>
                Assembles local story context and prompts a secondary model (e.g. Meta Llama) via OpenRouter to critique or narrate ambient surroundings in the sidebar.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function() {
  var lc = (info && info.actionCount) || 1;
  var reqId = 'cogm-chat-' + lc;

  var messages = [
    { role: 'system', content: 'You are a Co-GM. Analyze the following fantasy scene and output a single sentence describing the mystical ambient noise.' },
    { role: 'user', content: text } // Send current prompt context
  ];

  var requestPayload = {
    v: 1,
    requests: [{
      id: reqId,
      module: 'ai',
      op: 'chat',
      args: {
        model: 'meta-llama/llama-3-8b-instruct:free',
        messages: messages,
        temperature: 0.7
      }
    }],
    acks: []
  };

  var outCard = storyCards.find(function(c) { return c.title === 'ultrascripts:out'; });
  if (outCard) {
    outCard.value = JSON.stringify(requestPayload);
  } else {
    addStoryCard('ultrascripts:out', JSON.stringify(requestPayload));
  }
})();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Network Troubleshooting
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-xs text-bd-text-secondary">
              Review these solutions when debugging network or AI operation failures inside your scripts.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Consent Denied / Blank Page
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Requests return empty because the player closed or rejected the BetterDungeon host approval popup.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Direct players to open the BetterDungeon extension popup, navigate to the WebFetch tab, and verify the domain isn't in the blocklist.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> HTTP Timeout (408/504)
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Calls fail because the external host takes longer than the internal 3.0 second response limit.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Only query fast APIs. Cache responses whenever possible and build elegant fallbacks inside your script to handle missing data.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Provider AI Key Not Found
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> The <code>ai.chat</code> operation immediately throws an error stating that the connection was refused or the key is absent.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Query <code>bd.sdk.hasOp('ai', 'chat')</code> or check client credentials prior to running requests to ensure the API key is set.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Duplicate Replay Triggers
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Performing an Undo or Redo causes network or AI operations to resend, leading to duplicate API fees or state glitches.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> WebFetch and Chat ops are explicitly marked as <code>unsafe</code>. Filter out stale responses by validating that the response's <code>completedLiveCount</code> matches your current <code>info.actionCount</code>.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>


    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronDown, ChevronUp, Globe, BrainCircuit, Rocket, AlertTriangle, 
  ShieldCheck, Zap, X, Lock, Wifi
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-network', label: 'Network Access', isHeader: true },
  { id: 'webfetch', label: 'WebFetch (HTTP Requests)' },
  { id: 'provider-ai', label: 'Provider AI (LLM Pipelines)' },
  { id: 'header-recipes', label: 'Recipes', isHeader: true },
  { id: 'recipes', label: 'Network Recipes' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Network Troubleshooting' }
]

// Track which guide sections are expanded (all expanded by default)
const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) {
    expandedGuideSections.value.delete(sectionId)
  } else {
    expandedGuideSections.value.add(sectionId)
  }
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = (sectionId) => expandedGuideSections.value.has(sectionId)

const scrollToGuideSection = (sectionId) => {
  const element = document.getElementById(`guide-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(sectionId)) {
      expandedGuideSections.value.add(sectionId)
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
