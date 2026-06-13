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
              The Ultrascripts <code class="text-bd-green">ai</code> module is currently a
              status-only placeholder while its generation backend is rebuilt.
            </p>
          </div>
          <p>
            Scripts can still discover the module through heartbeat and call
            <code class="text-bd-green">ai.status</code>, but no generation operation is
            exposed right now.
          </p>
        </div>
      </section>

      <section id="guide-contract" class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Terminal class="w-5 h-5 text-bd-purple" />
          Current Contract
        </h2>
        <div class="mt-4 space-y-3 text-xs text-bd-text-secondary">
          <p>Heartbeat should list module <code class="text-bd-green">ai</code> with only the <code class="text-bd-green">status</code> op.</p>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "module": "ai",
  "op": "status",
  "args": {}
}</pre>
          <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-blue overflow-x-auto leading-relaxed">{
  "ready": false,
  "available": false,
  "phase": "rebuild",
  "reason": "ai_module_rebuild",
  "message": "The AI module is being rebuilt and has no callable generation backend right now."
}</pre>
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
            <p class="text-bd-text-muted">Check heartbeat and <code>ai.status</code> before offering AI-powered script behavior.</p>
          </div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
            <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
            <p class="text-bd-text-muted">Do not call or document generation ops, provider aliases, or model settings until the rebuild lands.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { BrainCircuit, ShieldCheck, Terminal } from 'lucide-vue-next'

const guideSections = [
  { id: 'status', label: 'Status' },
  { id: 'contract', label: 'Current Contract' },
  { id: 'authoring', label: 'Author Guidance' }
]

const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
