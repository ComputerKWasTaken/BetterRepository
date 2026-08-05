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
      <div class="p-3 rounded-lg border border-bd-pink/30 bg-bd-pink/5 flex items-center gap-3">
        <Volume2 class="w-4 h-4 text-bd-pink flex-shrink-0" />
        <p class="text-xs text-bd-text-secondary">
          <strong class="text-bd-pink">V2.1 preview:</strong> Audio is available in the current BetterDungeon development build. Mobile parity and final loop verification remain in progress.
        </p>
      </div>

      <section id="audio-overview" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
          <Volume2 class="w-5 h-5 text-bd-pink" />Audio Module
        </h2>
        <p class="text-bd-text-secondary">
          Audio is a state module that gives an adventure a persistent ambient loop and optional one-shot synthesized effects. Scripts publish the complete desired state to <code class="text-bd-green">ultrascripts:state:audio</code>.
        </p>
        <div class="grid md:grid-cols-2 gap-3 text-xs">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-blue mb-2 flex items-center gap-2"><Music class="w-4 h-4" />Ambient</h3>
            <p class="text-bd-text-muted">Select one bundled MP3 by track id. It keeps playing until replaced, stopped, disabled, or the adventure changes.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-purple mb-2 flex items-center gap-2"><Sparkles class="w-4 h-4" />Effects</h3>
            <p class="text-bd-text-muted">Describe a bounded oscillator or noise effect. Each new effect id plays once, even if the state card is hydrated repeatedly.</p>
          </div>
        </div>
      </section>

      <section id="audio-state" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary">State Contract</h2>
        <p class="text-xs text-bd-text-secondary">Ambient and effect state are independent, so a synthesized sound can play over the current loop.</p>
        <pre class="p-4 rounded-lg bg-bd-bg-tertiary font-mono text-xs text-bd-green overflow-x-auto">{
  "v": 1,
  "ambient": {
    "id": "mystery",
    "volume": 0.45
  },
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
        <div class="grid md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle"><code>ambient: null</code><p class="mt-1 text-bd-text-muted">Stops ambient playback.</p></div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle"><code>effect: null</code><p class="mt-1 text-bd-text-muted">Requests no new effect.</p></div>
          <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle"><code>ambient: null</code> + <code>effect: null</code><p class="mt-1 text-bd-text-muted">Stops all active Audio playback.</p></div>
        </div>
      </section>

      <section id="audio-tracks" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Music class="w-5 h-5 text-bd-blue" />Bundled Tracks</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead><tr class="text-left text-bd-text-muted border-b border-bd-border-subtle"><th class="p-2">ID</th><th class="p-2">Mood</th><th class="p-2">Duration</th></tr></thead>
            <tbody class="text-bd-text-secondary">
              <tr v-for="track in tracks" :key="track.id" class="border-b border-bd-border-subtle/50">
                <td class="p-2"><code class="text-bd-green">{{ track.id }}</code></td><td class="p-2">{{ track.mood }}</td><td class="p-2">{{ track.duration }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="p-4 rounded-lg bg-bd-bg-tertiary font-mono text-xs text-bd-green overflow-x-auto">{
  "v": 1,
  "ambient": { "id": "peaceful", "volume": 0.35 },
  "effect": null
}</pre>
        <p class="text-xs text-bd-text-muted">Changing only <code>volume</code> updates the active player without restarting the track. Changing <code>id</code> replaces it.</p>
      </section>

      <section id="audio-synth" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Sparkles class="w-5 h-5 text-bd-purple" />Synthesizer</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead><tr class="text-left text-bd-text-muted border-b border-bd-border-subtle"><th class="p-2">Field</th><th class="p-2">Contract</th></tr></thead>
            <tbody class="text-bd-text-secondary">
              <tr v-for="field in synthFields" :key="field.name" class="border-b border-bd-border-subtle/50"><td class="p-2"><code class="text-bd-green">{{ field.name }}</code></td><td class="p-2">{{ field.contract }}</td></tr>
            </tbody>
          </table>
        </div>
        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/20 text-xs text-bd-text-secondary">
          A new effect requires a new <code>id</code>. Reusing an id is intentionally ignored so reloads and state rehydration do not replay stale sounds.
        </div>
      </section>

      <section id="audio-lifecycle" class="card space-y-4">
        <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-bd-green" />Lifecycle and Safety</h2>
        <ul class="space-y-2 text-xs text-bd-text-secondary">
          <li>&middot; Browsers may wait for a click, tap, or key press before allowing playback.</li>
          <li>&middot; Disabling Audio, removing its state card, or leaving the adventure stops and releases playback.</li>
          <li>&middot; Unknown track ids and invalid synth parameters are rejected without replacing valid state.</li>
          <li>&middot; Effect duration is limited to 20&ndash;10,000 ms and volume is clamped to 0&ndash;1.</li>
          <li>&middot; Audio files are bundled with BetterDungeon; scripts cannot provide remote URLs.</li>
        </ul>
        <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs text-bd-text-secondary flex gap-2">
          <AlertTriangle class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
          <p>The current MP3s were reported as CC0, but their original source, creator, and license records were not retained. Provenance must be recovered or the files replaced before release.</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { Volume2, Music, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-vue-next'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'state', label: 'State Contract' },
  { id: 'tracks', label: 'Bundled Tracks' },
  { id: 'synth', label: 'Synthesizer' },
  { id: 'lifecycle', label: 'Lifecycle and Safety' }
]

const tracks = [
  { id: 'cavern', mood: 'Cavernous atmosphere', duration: '6:54' },
  { id: 'cozy', mood: 'Warm and comfortable', duration: '2:40' },
  { id: 'mystery', mood: 'Uncertain and investigative', duration: '3:39' },
  { id: 'nature', mood: 'Natural outdoor ambience', duration: '3:43' },
  { id: 'ominous', mood: 'Dark and threatening', duration: '3:04' },
  { id: 'peaceful', mood: 'Calm and gentle', duration: '4:32' },
  { id: 'tension', mood: 'Suspense and pressure', duration: '4:39' }
]

const synthFields = [
  { name: 'id', contract: 'Required unique string, at most 160 characters' },
  { name: 'waveform', contract: 'sine, square, triangle, sawtooth, or noise' },
  { name: 'frequency', contract: '20–20,000 Hz; required except for noise' },
  { name: 'endFrequency', contract: 'Optional 20–20,000 Hz pitch-sweep target' },
  { name: 'durationMs', contract: '20–10,000 ms; defaults to 250' },
  { name: 'attackMs', contract: 'Fade-in time; defaults to 5 ms' },
  { name: 'releaseMs', contract: 'Fade-out time; defaults to at most 80 ms' },
  { name: 'volume', contract: 'Clamped to 0–1; defaults to 0.7' }
]

const scrollTo = (id) => {
  document.getElementById(`audio-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
