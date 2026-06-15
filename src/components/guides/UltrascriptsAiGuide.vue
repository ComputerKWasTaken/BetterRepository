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
      <section id="guide-status" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <BrainCircuit class="w-5 h-5 text-bd-purple" />
          AI Module Status
        </h2>
        <div class="mt-4 space-y-4 text-xs text-bd-text-secondary">
          <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5">
            <p>
              The Ultrascripts <code class="text-bd-green">ai</code> module exposes
              <code class="text-bd-green">status</code> and asynchronous
              <code class="text-bd-green">query</code>, backed by Gemini when the player
              adds an API key in BetterDungeon. The default auto stepdown chain starts at
              <code class="text-bd-green">gemini-3.5-flash</code>, then tries
              <code class="text-bd-green">gemini-3.1-flash-lite</code>,
              <code class="text-bd-green">gemma-4-31b-it</code>, and
              <code class="text-bd-green">gemma-4-26b-a4b-it</code>.
            </p>
          </div>
          <p>
            Queries are asynchronous and return through
            <code class="text-bd-green">ultrascripts:in:ai</code> like every other ops module.
            Scripts can request plain text or schema-backed JSON. If Gemini is not
            configured, valid queries return <code class="text-bd-green">not_configured</code>.
          </p>
        </div>
      </section>

      <section id="guide-contract" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Terminal class="w-5 h-5 text-bd-purple" />
          Current Contract
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>Heartbeat should list module <code class="text-bd-green">ai</code> with <code class="text-bd-green">status</code> and <code class="text-bd-green">query</code>.</p>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "status",
  "args": {}
}</pre>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-blue overflow-x-auto leading-relaxed">{
  "ready": false,
  "available": false,
  "phase": "executor",
  "backend": "gemini",
  "backendLabel": "Gemini",
  "supports": {
    "text": true,
    "json": true
  },
  "config": {
    "provider": "gemini",
    "keyConfigured": false,
    "model": "gemini-3.5-flash",
    "fallbackModels": [
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemma-4-31b-it",
      "gemma-4-26b-a4b-it"
    ]
  },
  "executor": {
    "version": "0.2.0-gemini",
    "promptMaxChars": 12000,
    "backendConfigured": true
  },
  "reason": "ai_backend_not_configured",
  "message": "Add a Gemini API key in BetterDungeon to enable AI queries."
}</pre>
        </div>
      </section>

      <section id="guide-query" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <MessageSquareText class="w-5 h-5 text-bd-purple" />
          Query Contract
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>
            <code class="text-bd-green">ai.query</code> submits one bounded asynchronous job. The
            <code class="text-bd-green">prompt</code> contains the full request, including any
            instructions, context, or examples the script wants the model to see.
          </p>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "query",
  "args": {
    "prompt": "Classify whether the player is in combat.",
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
          <p>
            V1 output modes are <code class="text-bd-green">text</code> and
            <code class="text-bd-green">json</code>. JSON mode requires a schema and scripts
            should still validate returned values before applying them to state.
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
            <p class="text-bd-text-muted">Check heartbeat, <code>ai.status</code>, and cached query responses before offering AI-powered script behavior.</p>
          </div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
            <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
            <p class="text-bd-text-muted">Do not branch on providers, assume same-turn results, or trust JSON without script-side validation.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { BrainCircuit, MessageSquareText, ShieldCheck, Terminal } from 'lucide-vue-next'

const guideSections = [
  { id: 'status', label: 'Status' },
  { id: 'contract', label: 'Current Contract' },
  { id: 'query', label: 'Query Contract' },
  { id: 'authoring', label: 'Author Guidance' }
]

const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
