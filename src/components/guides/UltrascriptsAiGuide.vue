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
            :class="[isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted']"
          >
            {{ section.label }}
          </button>
        </template>
      </div>
    </aside>

    <div class="flex-1 space-y-4 min-w-0">

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
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication/modules/ai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-purple/10 hover:bg-bd-purple/20 text-bd-purple text-[11px] font-semibold transition-colors">
          Runtime source
        </a>
      </div>

      <!-- ===================== OVERVIEW ===================== -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BrainCircuit class="w-5 h-5 text-bd-purple" />
            AI Module Overview
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              The <strong>AI module</strong> (module id <code class="text-bd-green">ai</code>) gives scripts two operations:
              <code class="text-bd-green">query</code> for generated helper text and <code class="text-bd-green">status</code> for readiness.
              Use it when a scenario needs a short answer, summary, classification, structured data, or Co-GM note that the script can read later.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Sparkles class="w-4 h-4 text-bd-purple" /> Send a prompt
                </h4>
                <p class="text-[11px]">Pass a required <code>prompt</code> and optional <code>context</code>. Context can be text or JSON-serializable data.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <ShieldCheck class="w-4 h-4 text-bd-green" /> Read generated text
                </h4>
                <p class="text-[11px]">The response arrives on <code>ultrascripts:in:ai</code> with the answer in <code>data.text</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <AlertTriangle class="w-4 h-4 text-bd-pink" /> One at a time
                </h4>
                <p class="text-[11px]">If a query is already running, the next one returns <code>ai_rate_limited</code>. Try again next turn.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <h4 class="font-semibold text-bd-purple text-[12px] mb-1">Typical flow</h4>
              <ol class="space-y-1 text-[11px] text-bd-text-muted">
                <li>1. Check heartbeat for <code>ai.query</code> and <code>ai.status</code>.</li>
                <li>2. Call <code>ai.status</code> until <code>ready</code> is true.</li>
                <li>3. Call <code>ai.query</code> with one clear task.</li>
                <li>4. On a later turn, read <code>data.text</code> and apply it only if it still matches the current live count.</li>
              </ol>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== READINESS ===================== -->
      <section id="guide-readiness" class="card">
        <button @click="toggleGuideSection('readiness')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <CheckCircle2 class="w-5 h-5 text-bd-green" />
            Readiness
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('readiness') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('readiness')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Use <code>ai.status</code> when your script wants to know whether <code>ai.query</code> can run right now.
              It reports the current adventure id, whether page credentials are available, whether the helper card exists, and whether a query is active.
            </p>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5">Ready means</h4>
              <ol class="space-y-1 text-[11px]">
                <li>1. The player has BetterDungeon Ultrascripts enabled.</li>
                <li>2. The player is in an AI Dungeon adventure, not only a scenario edit page.</li>
                <li>3. The adventure page has loaded enough for BetterDungeon to make native AI Dungeon requests.</li>
              </ol>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">First turn tip:</strong> <code>ready</code> can be false while the page is still loading.
                Queue another status check next turn instead of treating it as a hard failure.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== OPS REFERENCE ===================== -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-purple" />
            Operations Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.query</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-pink/20 text-bd-pink">unsafe</span>
                <span class="text-[10px] text-bd-text-muted">one in flight</span>
              </div>
              <p>Sends a prompt with optional context and returns generated text in <code>data.text</code>.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "prompt": "Return exactly one sentence summarizing the current clue.",
  "context": {
    "clue": "The candle burns blue near the locked door."
  },
  "includeStorySummary": true,
  "temperature": 0.2,
  "timeoutMs": 60000
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "backend": "aid-story-card-generator",
  "text": "The blue flame implies the locked door reacts to hidden magic.",
  "generatedAtIso": "2026-06-09T18:45:00.000Z",
  "shellCardId": "197522276",
  "promptChars": 61,
  "contextChars": 62
}</pre>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-3 text-[11px]">
                <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                  <strong class="text-bd-text-primary">Limits:</strong>
                  <code class="text-bd-green">prompt</code> max 6000 chars,
                  <code class="text-bd-green">context</code> max 4000 chars,
                  <code class="text-bd-green">temperature</code> 0..2,
                  <code class="text-bd-green">timeoutMs</code> max 120000.
                </div>
                <div class="p-2 rounded bg-bd-amber/10 border border-bd-amber/30">
                  <strong class="text-bd-amber">Structured output:</strong>
                  prefer XML or YAML for script parsing. AI Dungeon may strip outer JSON braces in some Story Card generator paths.
                </div>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.status</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">readiness diagnostics</span>
              </div>
              <p>Reports whether <code>ai.query</code> can run in the current adventure and whether a request is already active.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "backend": "aid-story-card-generator",
  "ready": true,
  "adventureId": "adventure-...",
  "adventureShortId": "abc123",
  "hasGraphqlCredentials": true,
  "shellCardExists": true,
  "shellCardId": "197522276",
  "queryActive": false
}</pre>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WIRE EXAMPLE ===================== -->
      <section id="guide-wire" class="card">
        <button @click="toggleGuideSection('wire')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-blue" />
            Wire Example
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('wire') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('wire')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>One round trip from scenario script to generated helper text and back.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// ultrascripts:out
{
  "v": 1,
  "requests": [{
    "id": "scene-xml-t12",
    "module": "ai",
    "op": "query",
    "args": {
      "temperature": 0,
      "includeStorySummary": false,
      "prompt": "Return exactly this XML shape: <scene><mood>ominous</mood><risk>magic</risk></scene>",
      "context": "A blue candle burns beside a locked cellar door."
    }
  }],
  "acks": []
}

// ultrascripts:in:ai
{
  "v": 1,
  "responses": {
    "scene-xml-t12": {
      "status": "ok",
      "data": {
        "backend": "aid-story-card-generator",
        "text": "<scene><mood>ominous</mood><risk>magic</risk></scene>",
        "shellCardId": "197522276",
        "promptChars": 69,
        "contextChars": 48
      },
      "completedLiveCount": 12
    }
  }
}</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== PATTERNS ===================== -->
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

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-[12px]">
                <BrainCircuit class="w-4 h-4" /> Pattern 1: Private Scene Classifier
              </h4>
              <p>Ask for a small structured classification of the current scene, then use the result to update Scripture widgets or script state.</p>
              <p class="text-[11px] text-bd-text-muted">
                Set <code>includeStorySummary: false</code> when the answer should only use the context you pass in.
              </p>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-[12px]">
                <Wand2 class="w-4 h-4" /> Pattern 2: Lightweight Memory Summarizer
              </h4>
              <p>Condense recent action snippets into a one- or two-sentence private summary for a script-owned state card.</p>
              <p class="text-[11px] text-bd-text-muted">
                Include only the relevant action text in <code>context</code>. Turn on <code>includeStorySummary</code> when the answer should also consider the broader adventure.
              </p>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Pattern 3: Optional Co-GM Assist
              </h4>
              <p>Use one private helper answer per turn to suggest tone, stakes, or rule-state, then let your normal script decide whether to surface it.</p>
              <p class="text-[11px] text-bd-text-muted">
                Do not fire multiple queries for the same turn. Queue one helper request, read it later, then decide whether to surface it.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== AUTHORING TIPS ===================== -->
      <section id="guide-tips" class="card">
        <button @click="toggleGuideSection('tips')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Authoring Tips
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tips') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('tips')" class="mt-4 space-y-3 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1.5">
                <h4 class="font-semibold text-bd-green text-[12px] flex items-center gap-1.5">
                  <Check class="w-4 h-4" /> Do
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Keep prompts short, concrete, and task-specific.</li>
                  <li>&middot; Use low temperature for extraction and higher temperature only for creative helper text.</li>
                  <li>&middot; Validate XML, YAML, or structured text inside your AI Dungeon script.</li>
                  <li>&middot; Read responses on a later turn and filter by <code>completedLiveCount</code>.</li>
                  <li>&middot; Treat <code>ai_rate_limited</code> as a normal "try next turn" condition.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1.5">
                <h4 class="font-semibold text-bd-pink text-[12px] flex items-center gap-1.5">
                  <X class="w-4 h-4" /> Avoid
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Do not treat <code>ai.query</code> as idempotent. It is replay-unsafe.</li>
                  <li>&middot; Do not queue multiple native generation requests at once.</li>
                  <li>&middot; Do not rely on provider-specific JSON modes or model metadata.</li>
                  <li>&middot; Do not ask the AI module to replace AI Dungeon's main story generation.</li>
                  <li>&middot; Do not expect the helper answer to appear in the story automatically; your script decides what to do with it.</li>
                </ul>
              </div>
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
                <h4 class="font-semibold text-bd-pink text-[12px]">Not ready yet</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>ai.status</code> returns <code>ready: false</code>.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Wait until the player is in an adventure and BetterDungeon has page credentials, then retry next turn.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Another query is active</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>err</code> with <code>error.code === "ai_rate_limited"</code>.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Keep one request in flight. Read the first response before queueing the next query.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Structured text is malformed</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> The answer returns prose, a fragment, or extra text.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Prefer XML or YAML, ask for one complete value, then validate the shape.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Stale response after undo</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Old generated helper text leaks into the current turn.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Compare <code>completedLiveCount</code> with your current live count before applying a response.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Timeout on a broad prompt</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Response returns <code>timeout</code> or no useful text.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Shrink the prompt, reduce context, or split your script logic so the AI only does one bounded task.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Visible story expectations</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> The script expects <code>ai.query</code> to change the story output directly.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Treat the result as private data. Your script decides what, if anything, to surface later.</p>
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
  ChevronDown, ChevronUp, BrainCircuit, Sparkles, ShieldCheck, AlertTriangle,
  Terminal, Zap, Rocket, Wand2, CheckCircle2, Lightbulb, Check, X, ArrowRight
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'readiness', label: 'Readiness' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'wire', label: 'Wire Example' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipes', label: 'Usage Patterns' },
  { id: 'tips', label: 'Authoring Tips' },
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
