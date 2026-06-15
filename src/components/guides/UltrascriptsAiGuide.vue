<template>
  <div class="flex gap-6 animate-fade-in">
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">Contents</div>
        <button
          v-for="section in guideSections"
          :key="section.id"
          @click="scrollToGuideSection(section.id)"
          class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary text-bd-text-primary"
        >
          {{ section.label }}
        </button>
      </div>
    </aside>

    <div class="flex-1 space-y-4 min-w-0">
      <section id="guide-overview" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <BrainCircuit class="w-5 h-5 text-bd-purple" />
          AI Module Overview
        </h2>
        <div class="mt-4 space-y-4 text-xs text-bd-text-secondary">
          <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5">
            <p>
              The Ultrascripts <code class="text-bd-green">ai</code> module exposes exactly two
              operations: <code class="text-bd-green">status</code> and asynchronous
              <code class="text-bd-green">query</code>. BetterDungeon currently backs those queries
              with Gemini through the extension background worker, so the player's API key stays out
              of AI Dungeon page code and scenario scripts.
            </p>
          </div>
          <p>
            Scripts can request plain text or schema-backed JSON. Queries are always asynchronous:
            a script writes the request to <code class="text-bd-green">ultrascripts:out</code> and
            reads the terminal response from <code class="text-bd-green">ultrascripts:in:ai</code>
            on a later turn.
          </p>
          <p>
            The default automatic model chain starts at
            <code class="text-bd-green">gemini-3.5-flash</code>, then steps down to
            <code class="text-bd-green">gemini-3.1-flash-lite</code>,
            <code class="text-bd-green">gemma-4-31b-it</code>, and
            <code class="text-bd-green">gemma-4-26b-a4b-it</code> when free-tier rate limits
            require it. Players can opt into a manual model instead, but scripts do not choose
            providers or models directly.
          </p>
        </div>
      </section>

      <section id="guide-setup" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Settings2 class="w-5 h-5 text-bd-purple" />
          Player Setup
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>
            Players configure Gemini in the BetterDungeon popup. The API key is stored in extension
            local storage, not in sync storage, story cards, or public script state.
          </p>
          <div class="grid md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">What the player chooses</h4>
              <p class="text-bd-text-muted">Gemini API key, automatic stepdown or manual model selection, and an optional popup connection test.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">What the script sees</h4>
              <p class="text-bd-text-muted">Only <code>ai.status</code> readiness, supported output modes, thinking support, and diagnostic metadata on completed queries.</p>
            </div>
          </div>
          <p>
            Scripts should assume the backend may be unavailable. A scenario that depends on AI
            should check <code class="text-bd-green">ai.status</code> first and surface a clean
            fallback message if the player has not configured Gemini.
          </p>
        </div>
      </section>

      <section id="guide-status" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Terminal class="w-5 h-5 text-bd-purple" />
          Status Contract
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>
            Heartbeat should list module <code class="text-bd-green">ai</code> with
            <code class="text-bd-green">status</code> and
            <code class="text-bd-green">query</code>.
          </p>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "status",
  "args": {}
}</pre>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-blue overflow-x-auto leading-relaxed">{
  "ready": true,
  "available": true,
  "phase": "live",
  "backend": "gemini",
  "backendLabel": "Gemini",
  "supports": {
    "text": true,
    "json": true,
    "thinking": true
  },
  "config": {
    "provider": "gemini",
    "keyConfigured": true,
    "modelMode": "auto",
    "model": "gemini-3.5-flash",
    "selectedModel": "gemini-3.5-flash",
    "activeModel": "gemini-3.1-flash-lite",
    "fallbackModels": [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemma-4-31b-it",
      "gemma-4-26b-a4b-it"
    ],
    "thinkingDefault": "minimal",
    "thinkingLevels": ["minimal", "low", "medium", "high"],
    "lastResolvedModel": "gemini-3.1-flash-lite",
    "lastProviderModel": "gemini-3.1-flash-lite",
    "lastResolvedAtIso": "2026-06-15T20:00:00.000Z",
    "lastFallbackMode": "auto",
    "lastAttemptedModels": [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite"
    ]
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
    "backendConfigured": true
  },
  "message": "Gemini backend is configured."
}</pre>
          <p>
            <code class="text-bd-green">config.model</code> and
            <code class="text-bd-green">config.selectedModel</code> describe the configured starting
            point. <code class="text-bd-green">config.activeModel</code> and
            <code class="text-bd-green">config.lastResolvedModel</code> describe the model that most
            recently served a successful request, which matters when automatic fallback has stepped
            down.
          </p>
        </div>
      </section>

      <section id="guide-query" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <MessageSquareText class="w-5 h-5 text-bd-purple" />
          Query Contract
        </h2>
        <div class="mt-4 space-y-4 text-xs text-bd-text-secondary">
          <p>
            <code class="text-bd-green">ai.query</code> sends one bounded asynchronous request. The
            <code class="text-bd-green">prompt</code> is the full request body: instructions,
            context, examples, and response constraints all live there.
          </p>

          <div class="grid lg:grid-cols-2 gap-3">
            <div class="space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">Text query</h4>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "query",
  "args": {
    "prompt": "Return one short hidden world-state note.",
    "output": { "type": "text" }
  }
}</pre>
            </div>
            <div class="space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">JSON query</h4>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "query",
  "args": {
    "prompt": "Classify whether the player is in combat.",
    "thinking": "low",
    "output": {
      "type": "json",
      "schema": {
        "type": "object",
        "properties": {
          "inCombat": { "type": "boolean" }
        },
        "required": ["inCombat"],
        "additionalProperties": false
      }
    }
  }
}</pre>
            </div>
          </div>

          <p>
            V1 supports two output modes. <code class="text-bd-green">text</code> returns
            <code class="text-bd-green">data.text</code>. <code class="text-bd-green">json</code>
            returns <code class="text-bd-green">data.json</code> and requires a schema up front.
            Schema-less JSON requests fail closed with
            <code class="text-bd-green">invalid_args</code>.
          </p>

          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-blue overflow-x-auto leading-relaxed">{
  "status": "ok",
  "data": {
    "json": { "inCombat": false },
    "meta": {
      "backend": "gemini",
      "outputType": "json",
      "model": "gemini-3.1-flash-lite",
      "providerModel": "gemini-3.1-flash-lite",
      "promptChars": 43,
      "generatedAtIso": "2026-06-15T20:00:00.000Z",
      "thinking": {
        "requestedLevel": "low",
        "applied": true,
        "family": "gemini-3",
        "defaulted": false,
        "appliedLevel": "low"
      },
      "fallback": {
        "mode": "auto",
        "attemptedModels": [
          "gemini-3.5-flash",
          "gemini-3.1-flash-lite"
        ]
      }
    }
  }
}</pre>

          <p>
            Scripts should branch on <code class="text-bd-green">status</code>, then consume
            <code class="text-bd-green">data.text</code> or
            <code class="text-bd-green">data.json</code>. Treat
            <code class="text-bd-green">data.meta</code> as diagnostics, not as hard gameplay logic.
          </p>
        </div>
      </section>

      <section id="guide-thinking" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-bd-purple" />
          Thinking
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>
            <code class="text-bd-green">thinking</code> is optional and defaults to
            <code class="text-bd-green">minimal</code> so ordinary script traffic stays quick. Use
            higher levels when a task needs more reasoning, classification, or structured judgment.
          </p>
          <div class="grid md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">Accepted levels</h4>
              <p class="text-bd-text-muted"><code>minimal</code>, <code>low</code>, <code>medium</code>, and <code>high</code>.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
              <h4 class="font-semibold text-bd-text-primary text-[12px]">Invalid levels</h4>
              <p class="text-bd-text-muted">Fail with <code>invalid_args</code>; they do not reach the backend.</p>
            </div>
          </div>
          <p>
            BetterDungeon translates that single public knob into the Gemini-family controls each
            model actually supports. Gemini 3 style models use
            <code class="text-bd-green">thinkingLevel</code>. Gemini 2.5 style models use
            <code class="text-bd-green">thinkingBudget</code>. Gemma 4 behaves like a toggle, so
            <code class="text-bd-green">minimal</code> leaves thinking off and any non-minimal
            level maps to <code class="text-bd-green">thinkingLevel: "high"</code>.
          </p>
          <p>
            The completed response includes a normalized
            <code class="text-bd-green">data.meta.thinking</code> object so authors can inspect what
            happened during testing without baking provider quirks into runtime logic.
          </p>
        </div>
      </section>

      <section id="guide-errors" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <AlertTriangle class="w-5 h-5 text-bd-pink" />
          Failure Modes
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>
            The AI module normalizes backend failures into stable Ultrascripts-style errors so
            scripts can branch cleanly without reading raw Gemini payloads.
          </p>
          <div class="grid md:grid-cols-2 gap-3 text-[11px]">
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
              <p><code class="text-bd-green">not_configured</code>: no Gemini API key is saved.</p>
              <p><code class="text-bd-green">invalid_args</code>: bad query args, missing JSON schema, or invalid thinking level.</p>
              <p><code class="text-bd-green">auth_failed</code>: the Gemini key was rejected.</p>
              <p><code class="text-bd-green">rate_limit</code>: the current model hit a rate limit.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
              <p><code class="text-bd-green">timeout</code>: the backend exceeded the request timeout.</p>
              <p><code class="text-bd-green">blocked</code>: Gemini refused or blocked the prompt.</p>
              <p><code class="text-bd-green">invalid_response</code>: the backend returned malformed output.</p>
              <p><code class="text-bd-green">backend_failed</code>: transport or provider failure outside the stable cases above.</p>
            </div>
          </div>
          <p>
            Automatic fallback only steps down on rate limiting while the popup is in automatic
            mode. Manual model mode preserves the player's choice and returns the provider error
            directly.
          </p>
        </div>
      </section>

      <section id="guide-authoring" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <ShieldCheck class="w-5 h-5 text-bd-green" />
          Author Guidance
        </h2>
        <div class="mt-4 grid md:grid-cols-2 gap-3 text-[11px]">
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30 space-y-1">
            <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
            <p class="text-bd-text-muted">Check heartbeat and <code>ai.status</code>, validate returned JSON before mutating state, and design AI behavior around later-turn results.</p>
          </div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
            <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
            <p class="text-bd-text-muted">Do not assume same-turn completion, hardcode provider models into gameplay logic, or trust AI output without script-side guards.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {
  AlertTriangle,
  BrainCircuit,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  Sparkles,
  Terminal,
} from 'lucide-vue-next'

const guideSections = [
  { id: 'overview', label: 'Overview' },
  { id: 'setup', label: 'Player Setup' },
  { id: 'status', label: 'Status Contract' },
  { id: 'query', label: 'Query Contract' },
  { id: 'thinking', label: 'Thinking' },
  { id: 'errors', label: 'Failure Modes' },
  { id: 'authoring', label: 'Author Guidance' }
]

const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
