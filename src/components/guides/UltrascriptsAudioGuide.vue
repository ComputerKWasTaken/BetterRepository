<template>
  <div class="flex gap-6 animate-fade-in">
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Contents</h3>
        <button
          v-for="section in sections"
          :key="section.id"
          @click="scrollTo(section.id)"
          class="w-full text-left px-3 py-2 rounded-lg text-xs text-bd-text-muted hover:text-bd-text-primary hover:bg-bd-bg-tertiary transition-colors"
        >
          {{ section.label }}
        </button>
      </div>
    </aside>

    <div class="flex-1 space-y-4 min-w-0">
      <section id="audio-overview" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Volume2 class="w-5 h-5 text-bd-pink" />Audio Module
        </h2>
        <p class="text-bd-text-secondary">
          Audio lets scripts play short, synthesized sound effects. A script describes one effect in <code class="text-bd-green">ultrascripts:state:audio</code>, and BetterDungeon generates it locally with Web Audio.
        </p>
        <div class="grid md:grid-cols-2 gap-3 text-xs">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-blue mb-2 flex items-center gap-2"><AudioLines class="w-4 h-4" />Oscillators</h3>
            <p class="text-bd-text-muted">Create sine, square, triangle, or sawtooth tones with an optional pitch sweep.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-purple mb-2 flex items-center gap-2"><Sparkles class="w-4 h-4" />Noise</h3>
            <p class="text-bd-text-muted">Generate a bounded noise burst for impacts, static, wind-like hits, and other texture-based effects.</p>
          </div>
        </div>
        <p class="text-xs text-bd-text-muted">
          Audio does not play background music, bundled recordings, remote files, or arbitrary audio URLs.
        </p>
      </section>

      <section id="audio-state" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary">State Contract</h2>
        <p class="text-xs text-bd-text-secondary">Every new effect needs a unique <code>id</code>. This prevents card rehydration or page reloads from replaying a stale sound.</p>
        <pre class="p-4 rounded-lg bg-bd-bg-tertiary font-mono text-xs text-bd-green overflow-x-auto">{
  "v": 1,
  "effect": {
    "id": "spell-cast-18",
    "waveform": "sine",
    "frequency": 220,
    "endFrequency": 660,
    "durationMs": 500,
    "attackMs": 10,
    "releaseMs": 140,
    "volume": 0.7
  }
}</pre>
        <div class="grid md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle"><code>effect: null</code><p class="mt-1 text-bd-text-muted">Stops any active effects and requests silence.</p></div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">New unique <code>effect.id</code><p class="mt-1 text-bd-text-muted">Plays the described sound once.</p></div>
        </div>
      </section>

      <section id="audio-synth" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><SlidersHorizontal class="w-5 h-5 text-bd-blue" />Synthesizer</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead><tr class="text-left text-bd-text-muted border-b border-bd-border-subtle"><th class="p-2">Field</th><th class="p-2">Contract</th></tr></thead>
            <tbody class="text-bd-text-secondary">
              <tr v-for="field in synthFields" :key="field.name" class="border-b border-bd-border-subtle/50"><td class="p-2"><code class="text-bd-green">{{ field.name }}</code></td><td class="p-2">{{ field.contract }}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/20 text-xs text-bd-text-secondary">
          <code>frequency</code> and <code>endFrequency</code> do not apply to <code>noise</code>. Attack and release together cannot exceed the total duration.
        </div>
      </section>

      <section id="audio-recipes" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Sparkles class="w-5 h-5 text-bd-purple" />Effect Recipes</h2>
        <div class="grid lg:grid-cols-3 gap-3 text-xs">
          <div v-for="recipe in recipes" :key="recipe.name" class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
            <h3 class="font-semibold text-bd-text-primary">{{ recipe.name }}</h3>
            <p class="text-bd-text-muted">{{ recipe.description }}</p>
            <pre class="p-2 rounded bg-bd-bg-tertiary text-bd-green overflow-x-auto">{{ recipe.effect }}</pre>
          </div>
        </div>
      </section>

      <section id="audio-lifecycle" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-bd-green" />Lifecycle and Safety</h2>
        <ul class="space-y-2 text-xs text-bd-text-secondary">
          <li>&middot; Browsers may wait for a click, tap, or key press before allowing the first effect.</li>
          <li>&middot; The pending effect is retained and played after Web Audio is unlocked.</li>
          <li>&middot; Disabling Audio, removing its state card, or leaving the adventure stops and releases active effects.</li>
          <li>&middot; Invalid waveforms and out-of-bounds parameters are rejected without replacing valid state.</li>
          <li>&middot; Effect duration is limited to 20&ndash;10,000 ms and volume is clamped to 0&ndash;1.</li>
          <li>&middot; Scripts cannot load files, remote URLs, or arbitrary Web Audio graphs.</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<script setup>
import { Volume2, AudioLines, Sparkles, SlidersHorizontal, ShieldCheck } from 'lucide-vue-next'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'state', label: 'State Contract' },
  { id: 'synth', label: 'Synthesizer' },
  { id: 'recipes', label: 'Effect Recipes' },
  { id: 'lifecycle', label: 'Lifecycle and Safety' }
]

const synthFields = [
  { name: 'id', contract: 'Required unique string, at most 160 characters' },
  { name: 'waveform', contract: 'sine, square, triangle, sawtooth, or noise; defaults to sine' },
  { name: 'frequency', contract: '20–20,000 Hz; required except for noise' },
  { name: 'endFrequency', contract: 'Optional 20–20,000 Hz pitch-sweep target' },
  { name: 'durationMs', contract: '20–10,000 ms; defaults to 250' },
  { name: 'attackMs', contract: 'Fade-in time; defaults to 5 ms' },
  { name: 'releaseMs', contract: 'Fade-out time; defaults to at most 80 ms' },
  { name: 'volume', contract: 'Clamped to 0–1; defaults to 0.7' }
]

const recipes = [
  {
    name: 'Notification',
    description: 'A short, clean chime.',
    effect: '{ "waveform": "sine",\n  "frequency": 880, "durationMs": 180,\n  "releaseMs": 100, "volume": 0.4 }'
  },
  {
    name: 'Energy Sweep',
    description: 'A rising electronic effect.',
    effect: '{ "waveform": "sawtooth",\n  "frequency": 180, "endFrequency": 720,\n  "durationMs": 500, "volume": 0.35 }'
  },
  {
    name: 'Impact',
    description: 'A brief generated-noise hit.',
    effect: '{ "waveform": "noise",\n  "durationMs": 240, "attackMs": 0,\n  "releaseMs": 220, "volume": 0.35 }'
  }
]

const scrollTo = (id) => {
  document.getElementById(`audio-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
