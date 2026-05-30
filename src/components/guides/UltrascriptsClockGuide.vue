<template>
  <div class="flex gap-6 animate-fade-in">
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
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication/modules/clock" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/10 hover:bg-bd-amber/20 text-bd-amber text-[11px] font-semibold transition-colors">
          Runtime source
        </a>
      </div>

      <!-- OVERVIEW -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Clock class="w-5 h-5 text-bd-amber" />Clock Module Overview</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>Clock</strong> module grounds scenarios in the player's real wall-clock time. All three operations are deterministic and
              cheap to compute, so every op is marked <strong>safe</strong> for replay.
            </p>
            <p>
              Common uses include time-of-day narrative steering (dusk vs. midnight scenes), session-length awareness, and timestamp formatting for
              in-narrative dates.
            </p>
          </div>
        </Transition>
      </section>

      <!-- OPS -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-amber" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>clock.now</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Returns the current timestamp plus local date/time fields for the requested timezone.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args: {}  (empty)
// data:
{
  "ts": 1737042131428,
  "iso": "2025-01-16T18:42:11.428Z",
  "timeZone": "America/Chicago",
  "local": "2025-01-16 12:42:11 -06:00",
  "date": "2025-01-16",
  "time": "12:42:11",
  "systemTimeZone": "America/Chicago"
}</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>clock.tz</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Formats the current or provided timestamp in a named IANA timezone and includes the resolved UTC offset.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args:
{ "timeZone": "Europe/London" }
// data:
{
  "requestedTimeZone": "Europe/London",
  "timeZone": "Europe/London",
  "offsetMinutes": 0,
  "offset": "+00:00",
  "local": "2025-01-16 18:42:11 +00:00"
}</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>clock.format</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Formats a timestamp using Clock's pattern tokens. Returns a plain string.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args:
{
  "ts": 1737042131428,
  "timeZone": "America/Chicago",
  "format": "dddd, MMMM D [at] h:mm A Z"
}
// data:
"Thursday, January 16 at 12:42 PM -06:00"</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- USAGE PATTERN -->
      <section id="guide-recipe" class="card">
        <button @click="toggleGuideSection('recipe')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Rocket class="w-5 h-5 text-bd-green" />Time-of-Day Usage Pattern</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipe') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipe')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Use Clock when real-world time should influence context: night ambience, timed events, cooldown labels, session timestamps, or
              timezone-aware narration.
            </p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Author flow</h4>
                <ol class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>1. In Context, call <code>bd.us.tick()</code>.</li>
                  <li>2. Read last turn's <code>bd.us.latest('clock', 'now')</code>.</li>
                  <li>3. Use <code>data.time</code>, <code>data.date</code>, <code>data.iso</code>, or <code>data.local</code>.</li>
                  <li>4. Queue the next <code>clock.now</code>, then <code>bd.us.commit()</code>.</li>
                </ol>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Which op to pick</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; <code>now</code>: player's current resolved local time.</li>
                  <li>&middot; <code>tz</code>: current time in a specific IANA timezone.</li>
                  <li>&middot; <code>format</code>: turn a timestamp into a display string.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- PITFALLS -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-bd-pink" />Pitfalls</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Confusing UTC and local time</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Reading <code>data.ts</code> and manually guessing the local hour.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Use <code>data.time</code> for the resolved timezone, or call <code>clock.tz</code> / <code>clock.format</code> with an explicit <code>timeZone</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Hammering the op on every modifier</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Clock ops are cheap but turn-paced &mdash; results don't update mid-turn.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Query at most once per turn from a single modifier.</p>
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
import { ChevronDown, ChevronUp, Clock, Terminal, Rocket, AlertTriangle, Zap, ArrowRight } from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'recipe', label: 'Usage Pattern' },
  { id: 'pitfalls', label: 'Pitfalls' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => { if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id); else expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) }
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => { const el = document.getElementById(`guide-${id}`); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); if (!expandedGuideSections.value.has(id)) { expandedGuideSections.value.add(id); expandedGuideSections.value = new Set(expandedGuideSections.value) } } }
const expandAllGuideSections = () => { expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)) }
const collapseAllGuideSections = () => { expandedGuideSections.value = new Set() }
</script>
