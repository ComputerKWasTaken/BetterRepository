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
              The <strong>AI module</strong> (module id <code class="text-bd-green">ai</code>, legacy alias <code class="text-bd-green">providerAI</code>) is Ultrascripts'
              bridge to hosted language models through the player's own <strong>OpenRouter</strong> account. Scenarios can run a "second brain"
              alongside AI Dungeon's main generation: a critic, a planner, a JSON-extractor, a Co-GM, a translator, an inventory bookkeeper &mdash;
              any model task that benefits from a dedicated prompt outside the core narrative.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Sparkles class="w-4 h-4 text-bd-purple" /> What it does
                </h4>
                <p class="text-[11px]">Multi-turn chat completions against the player's configured OpenRouter model. Free-tier models supported, paid models gated by cost controls.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Lock class="w-4 h-4 text-bd-amber" /> Where the key lives
                </h4>
                <p class="text-[11px]">Player enters their OpenRouter API key in the BetterDungeon popup. <strong>Scripts never see the raw key.</strong></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <AlertTriangle class="w-4 h-4 text-bd-pink" /> Replay-unsafe
                </h4>
                <p class="text-[11px]"><code>chat</code> calls real money / quota. Marked <code class="text-bd-green">unsafe</code> &mdash; scripts must filter responses by live count.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5">Three ways scenarios use the AI module</h4>
              <ul class="space-y-1 text-[11px]">
                <li>&middot; <strong>Co-GM narration</strong> &mdash; the configured side model writes ambient flavor that the main model would waste tokens on.</li>
                <li>&middot; <strong>Structured extraction</strong> &mdash; force a JSON output describing characters, items, or scene metadata so Scripture widgets can render it.</li>
                <li>&middot; <strong>Cross-checks &amp; criticism</strong> &mdash; the configured side model evaluates the main model's output for tone, continuity, or rule compliance.</li>
              </ul>
            </div>

            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <h4 class="font-semibold text-bd-purple text-[12px] mb-1">How authors should operate it</h4>
              <ol class="space-y-1 text-[11px] text-bd-text-muted">
                <li>1. Queue <code>sdk.config</code> and wait for <code>ultrascripts.ai.configured</code>.</li>
                <li>2. Queue <code>ai.chat</code> only when configured and when the extra model result is worth the latency/quota.</li>
                <li>3. Read the result on a later turn from <code>data.text</code> or <code>data.message.content</code>.</li>
                <li>4. Keep prompts small, set <code>maxTokens</code>, and design a plain-script fallback for unconfigured players.</li>
              </ol>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PLAYER SETUP ===================== -->
      <section id="guide-setup" class="card">
        <button @click="toggleGuideSection('setup')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Settings class="w-5 h-5 text-bd-amber" />
            Player Setup (One-Time)
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('setup') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('setup')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Before any scenario can use <code class="text-bd-green">ai.chat</code>, the player completes a one-time configuration inside the BetterDungeon extension popup.
              Scenario authors should document this in their scenario notes &mdash; the SDK config response advertises whether it has been done.
            </p>

            <ol class="space-y-2 text-[11px]">
              <li class="flex gap-2">
                <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span>Create an API key at <code class="text-bd-green">openrouter.ai/keys</code>. For transport tests, use <code class="text-bd-green">betterdungeon/dummy:free</code> without an API key.</span>
              </li>
              <li class="flex gap-2">
                <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span>Open the BetterDungeon popup &rarr; <strong>Ultrascripts</strong> tab &rarr; <strong>AI</strong> section.</span>
              </li>
              <li class="flex gap-2">
                <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span>Paste the API key if using OpenRouter. Keep the default <code class="text-bd-green">openrouter/free</code> router, or overwrite it with a specific model ID if you need one.</span>
              </li>
              <li class="flex gap-2">
                <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center flex-shrink-0">4</span>
                <span>Leave free-only cost controls enabled unless you intentionally use paid models. Add $10 in OpenRouter credits to raise the free-model daily limit from 50 requests to 1000.</span>
              </li>
            </ol>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">For scenario authors:</strong> Detect configuration through the SDK module rather than guessing.
                Call <code class="text-bd-green">sdk.config</code> and read <code class="text-bd-green">ultrascripts.ai.configured</code>.
                If <code>false</code>, render a friendly &quot;configure AI in the extension popup&quot; message instead of letting <code>ai.chat</code> fail.
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

            <!-- chat -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.chat</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-pink/20 text-bd-pink">unsafe</span>
                <span class="text-[10px] text-bd-text-muted">configurable timeout</span>
              </div>
              <p>Sends a multi-message conversation to the configured OpenRouter model and returns the assistant's completion.</p>
              <div class="grid md:grid-cols-2 gap-3 mt-2">
                <div>
                  <div class="font-mono text-[10px] text-bd-green font-bold mb-1">args</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "messages": [
    { "role": "system", "content": "..." },
    { "role": "user",   "content": "..." }
  ],
  "temperature": 0.7,
  "maxTokens": 256,
  "responseFormat": { "type": "json_object" }  // optional
}</pre>
                </div>
                <div>
                  <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "provider": "openrouter",
  "model": "openrouter/free",
  "id": "gen-...",
  "text": "Assistant reply text",
  "message": {
    "role": "assistant",
    "content": "Assistant reply text"
  },
  "finishReason": "stop",
  "usage": {
    "promptTokens": 245,
    "completionTokens": 87,
    "totalTokens": 332
  }
}</pre>
                </div>
              </div>
              <div class="p-2 rounded bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
                <strong class="text-bd-amber">If a cost cap blocks the call</strong>, the response comes back as <code>err</code> with an
                <code class="text-bd-green">error.code</code> of <code>cost_control</code> rather than a partial completion. Catch and surface this to the player.
              </div>
            </div>

            <!-- models -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.models</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">60000ms max</span>
              </div>
              <p>Returns the OpenRouter models the player's key can currently access. Use it for setup diagnostics or to help the player choose a default in the popup; <code>ai.chat</code> does not accept a scenario-selected model.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "provider": "openrouter",
  "configured": true,
  "defaultModel": "openrouter/free",
  "dummyModel": false,
  "source": "https://openrouter.ai/api/v1/models",
  "count": 120,
  "totalCount": 120,
  "returned": 1,
  "truncated": true,
  "models": [
    {
      "id": "openrouter/free",
      "name": "OpenRouter Free Router",
      "canonicalSlug": "openrouter/free",
      "contextLength": null,
      "pricing": { "prompt": "0", "completion": "0", "request": null }
    }
  ]
}</pre>
              </div>
            </div>

            <!-- testConnection -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>ai.testConnection</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">60000ms max</span>
              </div>
              <p>Verifies the configured key with a tiny no-cost ping, or confirms the local dummy model is active. Useful in onboarding flows before the first real <code>chat</code>.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (on ok)</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "provider": "openrouter",
  "configured": true,
  "ok": true,
  "defaultModel": "openrouter/free",
  "modelCount": 120,
  "source": "https://openrouter.ai/api/v1/models",
  "checkedAtIso": "2026-05-30T19:45:00.000Z"
}</pre>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COST CONTROLS ===================== -->
      <section id="guide-cost" class="card">
        <button @click="toggleGuideSection('cost')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-green" />
            Cost &amp; Safety Controls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('cost') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('cost')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Players configure granular spending caps inside the extension. Caps are enforced <strong>by the extension before any request reaches OpenRouter</strong>,
              so a runaway scenario cannot bypass them. The exact knobs surfaced through <code>sdk.config</code> are:
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Control</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Effect</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">freeModelsOnly</code></td>
                    <td class="py-2 px-2">Hard-rejects any <code>chat</code> call when the configured default model has nonzero pricing.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">maxPromptPricePerMillion</code></td>
                    <td class="py-2 px-2">Caps the prompt-token price ($/M) the configured model may charge. Higher-priced models are blocked.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">maxCompletionPricePerMillion</code></td>
                    <td class="py-2 px-2">Same as above, for the completion side of the price.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">perCallEstimateCap</code></td>
                    <td class="py-2 px-2">Estimates the cost of a single call from <code>maxTokens</code> + model price; rejects if it exceeds this dollar cap.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">dailySpendCap</code></td>
                    <td class="py-2 px-2">Rolling 24h spend ceiling. Tracked locally by the extension.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2"><code class="text-bd-green">monthlySpendCap</code></td>
                    <td class="py-2 px-2">Rolling 30d spend ceiling. Same enforcement path.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">Scenario authors should recommend <code class="text-bd-green">openrouter/free</code> by default.</strong> Use <code class="text-bd-green">betterdungeon/dummy:free</code> for no-network tests. The player chooses the model in the BetterDungeon popup;
                scripts cannot override that choice. Detect through <code>sdk.config.ultrascripts.ai.costControls.freeModelsOnly</code> if you want to branch.
              </p>
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
            <p>Single round-trip from scenario script to model and back.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// ultrascripts:out
{
  "v": 1,
  "requests": [{
    "id": "cogm-chat-t12",
    "module": "ai",
    "op": "chat",
    "args": {
      "temperature": 0.7,
      "maxTokens": 120,
      "messages": [
        { "role": "system", "content": "You are a Co-GM. Output ONE sentence describing the mystical ambient noise of the current scene." },
        { "role": "user",   "content": "Scene: A crumbling watchtower at dusk. Damp moss. Distant thunder." }
      ]
    }
  }],
  "acks": []
}

// ultrascripts:in:ai
{
  "v": 1,
  "responses": {
    "cogm-chat-t12": {
      "status": "ok",
      "data": {
        "provider": "openrouter",
        "model": "openrouter/free",
        "text": "Beneath the watchtower's ribs, slow drips count out the storm's heartbeat as moss whispers like distant prayers.",
        "message": {
          "role": "assistant",
          "content": "Beneath the watchtower's ribs, slow drips count out the storm's heartbeat as moss whispers like distant prayers."
        },
        "finishReason": "stop",
        "usage": { "promptTokens": 84, "completionTokens": 31, "totalTokens": 115 }
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

            <!-- Pattern 1: Co-GM Ambient Narrator -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-[12px]">
                <BrainCircuit class="w-4 h-4" /> Pattern 1: Co-GM Ambient Narrator
              </h4>
              <p>Each turn, ask the player's configured model for one ambient flavor sentence and inject it as front-context for the main model.</p>
              <p class="text-[11px] text-bd-text-muted">
                Keep the live script in Quick Start, where it uses <code>bd.us.tick()</code>, <code>bd.us.latest('ai', 'chat')</code>,
                <code>bd.us.call('ai', 'chat', ...)</code>, and <code>bd.us.commit()</code>. This module page only documents the AI operation contract.
              </p>
            </div>

            <!-- Pattern 2: Structured Extraction -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-[12px]">
                <Wand2 class="w-4 h-4" /> Pattern 2: Structured Scene Extraction
              </h4>
              <p>Force a JSON output describing the current scene so Scripture widgets can render structured state from prose.</p>
              <p class="text-[11px] text-bd-text-muted">
                Use <code>responseFormat: { type: 'json_object' }</code> for JSON extraction, keep <code>temperature</code> low, and consume
                the response on a later turn with <code>bd.us.latest('ai', 'chat')</code>.
              </p>
            </div>

            <!-- Pattern 3: Cost-Aware Fallback -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Pattern 3: Cost-Aware Fallback
              </h4>
              <p>Respect the player's configured model and gracefully skip optional calls when their cost controls block them.</p>
              <p class="text-[11px] text-bd-text-muted">
                Read <code>sdk.config</code> first, then branch on the player's configured cost controls before queueing optional model work. Keep helpers on
                <code>globalThis.bd</code> if you need reusable functions; store only plain data on <code>state</code>.
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
                  <li>&middot; Keep system prompts <strong>short and specific</strong>. The AI module is best at one job at a time.</li>
                  <li>&middot; Pin <code>temperature</code> low (0.0&ndash;0.2) when extracting JSON; raise it for creative narration.</li>
                  <li>&middot; Recommend a <strong>free-tier</strong> default model in scenario notes so free-only players can use the scenario unchanged.</li>
                  <li>&middot; Always check <code>sdk.config.ultrascripts.ai.configured</code> before the first call.</li>
                  <li>&middot; Filter responses by <code>completedLiveCount</code> on every read.</li>
                  <li>&middot; Cap <code>maxTokens</code> tightly. The smallest useful number wins on both latency and cost.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1.5">
                <h4 class="font-semibold text-bd-pink text-[12px] flex items-center gap-1.5">
                  <X class="w-4 h-4" /> Avoid
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Don't try to make the AI module <strong>replace</strong> the main AI Dungeon model &mdash; orchestrate alongside it.</li>
                  <li>&middot; Don't issue a chat call on every modifier; rate-limit to once per turn at most.</li>
                  <li>&middot; Don't treat <code>ai.chat</code> as idempotent. Replays on undo will burn quota.</li>
                  <li>&middot; Don't bake your own API key into a script &mdash; only the player's key in the popup is supported.</li>
                  <li>&middot; Don't assume the player selected a paid model or try to override their default.</li>
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
                <h4 class="font-semibold text-bd-pink text-[12px]">Key not configured</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>ai.chat</code> returns <code>err</code> immediately.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Gate behind <code>sdk.config.ultrascripts.ai.configured</code>. Surface a friendly prompt to open the extension popup.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Cost cap blocked the call</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> <code>err</code> with <code>error.code === "cost_control"</code>.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Reduce <code>maxTokens</code>, skip optional calls, or ask the player to choose a cheaper default / raise their daily or monthly cap.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Stale response after undo</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Old completion leaks into the new current turn.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Compare <code>completedLiveCount</code> with <code>info.actionCount</code> on every read.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Response never appears</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> A custom script reuses a request id, or polls the wrong <code>ultrascripts:in:&lt;module&gt;</code> card.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Generate a fresh id per queued call, include the live count / counter, and poll the same module id you sent. The SDK helper handles this.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">JSON output isn't pure JSON</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Even with <code>responseFormat: json_object</code>, models occasionally wrap output in code fences.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Strip leading/trailing non-JSON before <code>JSON.parse</code>; or use a stricter system prompt asking for JSON only.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Default model unavailable</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> The player's OpenRouter tier doesn't include their configured default model.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Ask the player to pick an available default in the BetterDungeon popup; <code>ai.models</code> can help diagnose what their key can see.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Timeout on a long context</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Response comes back <code>timeout</code> on huge prompts.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Shrink prompt with a summarization pass, lower <code>maxTokens</code>, or ask the player to pick a faster default model.</p>
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
  ChevronDown, ChevronUp, BrainCircuit, Sparkles, Lock, AlertTriangle, Settings,
  Terminal, ShieldCheck, Zap, Rocket, Wand2, CheckCircle2, Lightbulb, Check, X,
  ArrowRight
} from 'lucide-vue-next'

// Sections ordered: orient -> player setup -> reference -> safety -> usage -> debug.
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'setup', label: 'Player Setup' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'cost', label: 'Cost Controls' },
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
