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
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication/modules/weather" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-cyan/10 hover:bg-bd-cyan/20 text-bd-cyan text-[11px] font-semibold transition-colors">
          Runtime source
        </a>
      </div>

      <!-- OVERVIEW -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><CloudSun class="w-5 h-5 text-bd-cyan" />Weather Module Overview</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>Weather</strong> module reads current conditions and short forecasts from <strong>Open-Meteo</strong>, a free public API.
              Pair it with Geolocation to drive scene weather, or supply coordinates directly to anchor stories to a known location.
            </p>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Common uses</h4>
              <ul class="space-y-0.5 text-[11px] text-bd-text-muted">
                <li>&middot; Weather-reactive combat modifiers (rain debuffs, lightning specials)</li>
                <li>&middot; Atmospheric scene injection ("rain patters on the cobblestones")</li>
                <li>&middot; Travel pacing (fog slows the party, blizzard stalls progress)</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- OPS -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-cyan" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>weather.current</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms max</span>
              </div>
              <p>Current temperature, wind, humidity, and WMO weather code for coordinates or a place name.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args:
{ "latitude": 41.88, "longitude": -87.62, "units": "metric" }
// data (on ok):
{
  "location": { "latitude": 41.88, "longitude": -87.62, "timezone": "America/Chicago" },
  "units": "metric",
  "source": "open-meteo",
  "current": {
    "temperature": 4.2,
    "windSpeed": 18,
    "windDirection": 270,
    "relativeHumidity": 62,
    "weatherCode": 63,
    "weather": "Moderate rain",
    "isDay": true
  }
}</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>weather.forecast</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms max</span>
              </div>
              <p>Daily forecast for the next few days. Useful for travel arcs that span in-story time.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// args:
{ "place": "Chicago", "days": 3, "units": "metric" }
// data:
{
  "location": { "name": "Chicago", "country": "United States" },
  "units": "metric",
  "source": "open-meteo",
  "days": [
    { "date": "2025-01-16", "temperatureMin": -1, "temperatureMax": 6, "weatherCode": 71, "weather": "Slight snow" },
    { "date": "2025-01-17", "temperatureMin":  0, "temperatureMax": 5, "weatherCode": 61, "weather": "Slight rain" }
  ]
}</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5">WMO weather codes (selected)</h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[10px] font-mono text-bd-text-muted">
                <div>&middot; 0: Clear sky</div>
                <div>&middot; 1&ndash;3: Partly cloudy</div>
                <div>&middot; 45,48: Fog</div>
                <div>&middot; 51&ndash;55: Drizzle</div>
                <div>&middot; 61&ndash;65: Rain</div>
                <div>&middot; 71&ndash;75: Snow</div>
                <div>&middot; 80&ndash;82: Rain showers</div>
                <div>&middot; 95: Thunderstorm</div>
                <div>&middot; 96,99: Thunderstorm + hail</div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- USAGE PATTERN -->
      <section id="guide-recipe" class="card">
        <button @click="toggleGuideSection('recipe')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Rocket class="w-5 h-5 text-bd-green" />Weather-Aware Usage Pattern</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipe') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipe')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Use Weather when outside conditions should inform the fiction: storm combat, seasonal ambience, travel hazards, survival pressure, or
              a location-aware opening scene.
            </p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-1">
                <h4 class="font-semibold text-bd-cyan text-[12px]">Location strategy</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Use <code>{ place: 'Chicago' }</code> for a fixed scenario location.</li>
                  <li>&middot; Use Geolocation first when the story should follow the player's real region.</li>
                  <li>&middot; Cache weather flags on <code>state</code>; do not call the API every turn.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Author flow</h4>
                <ol class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>1. Queue <code>weather.current</code> or <code>weather.forecast</code> only when you need a refresh.</li>
                  <li>2. Read <code>bd.us.latest('weather', 'current')</code> on a later turn.</li>
                  <li>3. Branch on <code>data.current.weatherCode</code> or <code>data.current.weather</code>.</li>
                  <li>4. Store derived story flags, not the whole response, unless you need it.</li>
                </ol>
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
                <h4 class="font-semibold text-bd-pink text-[12px]">Geolocation missing</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Weather call fails because no coordinates are available.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Pass <code>latitude</code>/<code>longitude</code> explicitly, or pass a <code>place</code> string.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Caching for too long</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Weather queried at session start no longer matches hours later.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Re-query every ~30 in-game turns, or expose a "refresh weather" command to the player.</p>
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
import { ChevronDown, ChevronUp, CloudSun, Terminal, Rocket, AlertTriangle, Zap, ArrowRight } from 'lucide-vue-next'

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
