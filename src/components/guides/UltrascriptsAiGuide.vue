<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- Sticky TOC sidebar -->
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

    <!-- Main content column -->
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

      <!-- ===================== WHAT IS ===================== -->
      <section id="guide-what-is" class="card">
        <button @click="toggleGuideSection('what-is')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><BrainCircuit class="w-5 h-5 text-bd-purple" />What Is the AI Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Ultrascripts <code class="text-bd-green">ai</code> module exposes exactly two operations: <code class="text-bd-green">status</code> and
              asynchronous <code class="text-bd-green">query</code>. It is an asynchronous LLM query system: scripts send a request out, BetterDungeon
              routes it through the execution layers, and the result comes back on a later turn. The default setup uses Gemini through the
              extension background worker, so the player's API key stays out of AI Dungeon page code and scenario scripts.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Does</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Asynchronous LLM text generation</li>
                  <li>&middot; Schema-backed JSON output</li>
                  <li>&middot; Configurable thinking levels</li>
                  <li>&middot; Automatic model fallback (auto mode)</li>
                  <li>&middot; Backend readiness checks</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Generate hidden world-state notes</li>
                  <li>&middot; Classify player context (combat, mood)</li>
                  <li>&middot; Produce structured scenario data</li>
                  <li>&middot; Summarize or transform narrative</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">status</code> and <code class="text-bd-green">query</code></li>
                  <li>&middot; Async &mdash; responses arrive on a later turn</li>
                  <li>&middot; Player configures API key in popup</li>
                  <li>&middot; 12000 char prompt limit</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Scripts can request plain text or schema-backed JSON. Queries are always asynchronous: a script writes the request to
                  <code class="text-bd-green">ultrascripts:out</code> and reads the terminal response from
                  <code class="text-bd-green">ultrascripts:in:ai</code> on a later turn.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== QUICK START ===================== -->
      <section id="guide-quick-start" class="card">
        <button @click="toggleGuideSection('quick-start')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Zap class="w-5 h-5 text-bd-amber" />Quick Start</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">Three steps to generate AI content with a clean fallback.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Check AI status</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('ai', 'status', {})</code> first. If <code class="text-bd-green">data.ready</code> is false, surface a clean fallback message and skip the query.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Queue a query</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('ai', 'query', { prompt: '...', output: { type: 'text' } })</code>. The query is async and returns on a later turn.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Read and validate</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('ai', 'query')</code> on a later turn. Branch on <code class="text-bd-green">status</code>, then consume <code class="text-bd-green">data.text</code> or <code class="text-bd-green">data.json</code>. Always validate AI output with script-side guards before mutating state.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-purple" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The AI module exposes two ops: <code class="text-bd-green">status</code> for readiness checks and
              <code class="text-bd-green">query</code> for asynchronous LLM generation.
            </p>

            <!-- ai.status -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.status</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Reports whether the AI backend is configured and ready. Always check this before queuing a query.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "backend": "gemini",               // "gemini" | null
  "backendLabel": "Gemini",          // string | null
  "ready": true,                     // boolean
  "available": true,                 // boolean (equals ready)
  "phase": "live",                   // "live" | "executor"
  "reason": null,                    // null when ready, "ai_backend_not_configured" when not
  "supports": {
    "text": true,                    // boolean
    "json": true,                    // boolean
    "thinking": true                 // boolean
  },
  "config": {                        // object | null (null when not configured)
    "provider": "gemini",
    "keyConfigured": true,           // boolean
    "model": "gemini-3.5-flash",     // string
    "thinkingDefault": "minimal",
    "thinkingLevels": ["minimal", "low", "medium", "high"]
  },
  "contract": {
    "ops": ["status", "query"],
    "outputTypes": ["text", "json"],
    "thinkingLevels": ["minimal", "low", "medium", "high"],
    "defaultThinking": "minimal",
    "asyncOnly": true
  },
  "executor": {
    "version": "0.4.0-gemini-meta",
    "promptMaxChars": 12000,
    "backendConfigured": true        // boolean
  },
  "message": "AI querying is available."
}</pre>
                <p class="text-[11px] text-bd-text-muted">The <code>config</code> object may contain additional backend-specific fields. Only the fields shown above are guaranteed by the contract and verified by the test suite.</p>
              </div>
            </div>

            <!-- ai.query -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.query</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-amber/20 text-bd-amber">unsafe</span>
                <span class="text-[10px] text-bd-text-muted">120000ms timeout</span>
              </div>
              <p>Sends one bounded asynchronous LLM request. The <code>prompt</code> is the full request body: instructions, context, examples, and response constraints.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "prompt": "Return one short hidden world-state note.",  // required, non-empty, max 12000 chars
  "output": {                          // optional, defaults to { type: "text" }
    "type": "text",                    // "text" | "json"
    "schema": { ... }                  // required when type is "json" (JSON-serializable object)
  },
  "thinking": "low"                    // optional, defaults to "minimal"
                                      // string (level) or { level: "..." }
}</pre>
                <p class="text-[11px] text-bd-text-muted"><code>output</code> can be a string (interpreted as type) or an object. <code>thinking</code> can be a string (interpreted as level) or an object. Schema-less JSON requests fail with <code class="text-bd-pink">invalid_args</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (text, on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "text": "The ancient library hides a sealed archive...",
  "meta": {
    "backend": "gemini",
    "outputType": "text",
    "promptChars": 43,
    "generatedAtIso": "2026-06-15T20:00:00.000Z",
    "model": "gemini-3.5-flash",
    "providerModel": "gemini-3.5-flash",
    "thinking": {
      "requestedLevel": "minimal",
      "applied": true,
      "family": "gemini-3",
      "defaulted": true
    },
    "fallback": null,                 // object | null (only present when fallback occurred)
    "usage": null                     // object | null
  }
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (json, on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "json": { "inCombat": false },
  "meta": {
    "backend": "gemini",
    "outputType": "json",
    "promptChars": 43,
    "generatedAtIso": "2026-06-15T20:00:00.000Z",
    "model": "gemini-3.1-flash-lite",
    "providerModel": "gemini-3.1-flash-lite",
    "thinking": {
      "requestedLevel": "low",
      "applied": true,
      "family": "gemini-3",
      "defaulted": false
    },
    "fallback": {                     // only present when fallback occurred
      "mode": "auto",
      "attemptedModels": ["gemini-3.5-flash", "gemini-3.1-flash-lite"]
    },
    "usage": null
  }
}</pre>
                <p class="text-[11px] text-bd-text-muted">The <code>fallback</code> object is conditional &mdash; only present when automatic fallback actually occurred. Always check for its presence before reading it.</p>
              </div>
            </div>

            <div class="space-y-1">
              <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
              <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px] space-y-0.5">
                <p><code class="text-bd-pink">unavailable</code> &mdash; executor not loaded or extension runtime unavailable. Retryable.</p>
                <p><code class="text-bd-pink">not_configured</code> &mdash; no API key saved. Not retryable. Shape: <code>{ code, message, retryable, backend, phase, task }</code></p>
                <p><code class="text-bd-pink">invalid_args</code> &mdash; bad query args, missing JSON schema, invalid thinking level, or prompt too long. Shape: <code>{ code, message, retryable, maxChars?, actualChars? }</code></p>
                <p><code class="text-bd-pink">auth_failed</code> &mdash; the saved API key was rejected.</p>
                <p><code class="text-bd-pink">rate_limit</code> &mdash; the current model hit a rate limit.</p>
                <p><code class="text-bd-pink">timeout</code> &mdash; the provider request exceeded the timeout.</p>
                <p><code class="text-bd-pink">blocked</code> &mdash; the provider refused or blocked the prompt.</p>
                <p><code class="text-bd-pink">invalid_response</code> &mdash; the provider returned malformed output. Shape: <code>{ code, message, retryable, detail? }</code></p>
                <p><code class="text-bd-pink">backend_failed</code> &mdash; transport or provider failure outside the stable cases above.</p>
              </div>
              <p class="text-[11px] text-bd-text-muted">Automatic fallback only steps down on rate limiting while the popup is in automatic mode. Manual model mode preserves the player's choice and returns the provider error directly.</p>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Is AI configured?"</strong> &rarr; AI <code>status</code></div>
                <div>&middot; <strong>"Generate text"</strong> &rarr; AI <code>query</code> with <code>output: "text"</code></div>
                <div>&middot; <strong>"Classify context"</strong> &rarr; AI <code>query</code> with JSON schema</div>
                <div>&middot; <strong>"Fetch a URL"</strong> &rarr; <router-link to="/ultrascripts?tab=webfetch" class="text-bd-accent-primary hover:underline">WebFetch</router-link></div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== BEST PRACTICES ===================== -->
      <section id="guide-best-practices" class="card">
        <button @click="toggleGuideSection('best-practices')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-bd-green" />Best Practices</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">Short, opinionated rules for using the AI module well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Check <code>ai.status</code> before queuing a query.</li>
                  <li>&middot; Validate returned JSON before mutating state.</li>
                  <li>&middot; Design AI behavior around later-turn results.</li>
                  <li>&middot; Treat <code>data.meta</code> as diagnostics, not gameplay logic.</li>
                  <li>&middot; Provide a clean fallback when AI is not configured.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not assume same-turn completion.</li>
                  <li>&middot; Do not hardcode provider model ids into gameplay logic.</li>
                  <li>&middot; Do not trust AI output without script-side guards.</li>
                  <li>&middot; Do not send prompts longer than 12000 characters.</li>
                  <li>&middot; Do not request JSON without a schema.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: THINKING ===================== -->
      <section id="guide-thinking" class="card">
        <button @click="toggleGuideSection('thinking')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Thinking Levels</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('thinking') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('thinking')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              <code class="text-bd-green">thinking</code> is optional and defaults to <code class="text-bd-green">minimal</code> so ordinary script
              traffic stays quick. Use higher levels when a task needs more reasoning, classification, or structured judgment.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Accepted levels</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li>&middot; <code>minimal</code> &mdash; fast, default</li>
                  <li>&middot; <code>low</code> &mdash; light reasoning</li>
                  <li>&middot; <code>medium</code> &mdash; moderate reasoning</li>
                  <li>&middot; <code>high</code> &mdash; deep reasoning</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Invalid levels</h4>
                <p class="text-bd-text-muted">Fail with <code>invalid_args</code>; they do not reach the provider request layer.</p>
              </div>
            </div>

            <p class="text-bd-text-secondary">
              BetterDungeon translates that single public knob into the controls each active model family actually supports.
              Gemini 3 style models use <code class="text-bd-green">thinkingLevel</code>. Gemini 2.5 style models use
              <code class="text-bd-green">thinkingBudget</code>. Gemma 4 behaves like a toggle, so <code class="text-bd-green">minimal</code>
              leaves thinking off and any non-minimal level maps to <code class="text-bd-green">thinkingLevel: "high"</code>.
            </p>
            <p class="text-bd-text-secondary">
              The completed response includes a normalized <code class="text-bd-green">data.meta.thinking</code> object with
              <code>requestedLevel</code>, <code>applied</code>, <code>family</code>, and <code>defaulted</code> fields so authors can
              inspect what happened during testing without baking provider quirks into runtime logic.
            </p>
          </div>
        </Transition>
      </section>

      <!-- ===================== PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-bd-pink" />Tips &amp; Common Pitfalls</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the AI module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming same-turn completion</h4>
                <p class="text-bd-text-secondary">Reading the query response on the same turn you queued it.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> AI queries are async. Read <code>bd.us.latest('ai', 'query')</code> on a later turn.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Not checking status first</h4>
                <p class="text-bd-text-secondary">Queuing a query when the backend is not configured.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Call <code>ai.status</code> first; surface a clean fallback if <code>ready</code> is false.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Trusting AI output blindly</h4>
                <p class="text-bd-text-secondary">Mutating state based on unvalidated AI-generated JSON.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always validate AI output with script-side guards before using it.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Requesting JSON without a schema</h4>
                <p class="text-bd-text-secondary">Sending <code>output: { type: "json" }</code> without a <code>schema</code> field.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always include a <code>schema</code> when <code>type</code> is <code>"json"</code>; schema-less JSON fails with <code>invalid_args</code>.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREDITS ===================== -->
      <section id="guide-credits" class="card">
        <button @click="toggleGuideSection('credits')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Users class="w-5 h-5 text-bd-amber" />Credits</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who built and maintain the BetterDungeon Ultrascripts AI module:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  BetterDungeon Dev Team
                </span>
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
  ChevronDown, ChevronUp, BrainCircuit, Terminal, Zap, ArrowRight, ShieldCheck,
  AlertTriangle, Sparkles, Info, Rocket, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the AI Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'thinking', label: 'Thinking Levels' },
  { id: 'pitfalls', label: 'Tips & Common Pitfalls' },
  { id: 'credits', label: 'Credits' }
]

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
