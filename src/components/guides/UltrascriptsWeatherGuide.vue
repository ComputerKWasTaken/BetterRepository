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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><CloudSun class="w-5 h-5 text-bd-cyan" />What Is the Weather Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Weather module reads current conditions and short forecasts from <strong>Open-Meteo</strong>, a free public API.
              Supply a place name or coordinates directly to anchor stories to a known location.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Reports</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Current temperature and apparent temp</li>
                  <li>&middot; Wind speed and direction</li>
                  <li>&middot; Relative humidity</li>
                  <li>&middot; WMO weather code + label</li>
                  <li>&middot; Day/night flag</li>
                  <li>&middot; Multi-day daily forecasts</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Weather-reactive combat modifiers</li>
                  <li>&middot; Atmospheric scene injection</li>
                  <li>&middot; Travel pacing (fog, blizzard)</li>
                  <li>&middot; Seasonal ambience</li>
                  <li>&middot; Survival pressure mechanics</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">current</code> and <code class="text-bd-green">forecast</code></li>
                  <li>&middot; Async &mdash; responses arrive on a later turn</li>
                  <li>&middot; Accepts lat/lon or a place name string</li>
                  <li>&middot; No player setup required</li>
                </ul>
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
            <p class="text-bd-text-secondary">Three steps to drive scene weather from real conditions.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Queue a weather request</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('weather', 'current', { latitude: 41.88, longitude: -87.62 })</code> or use a place name like <code class="text-bd-green">{ place: 'Chicago' }</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Read the result on a later turn</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('weather', 'current')</code> to pull the most recent response. Branch on <code class="text-bd-green">data.current.weatherCode</code> or <code class="text-bd-green">data.current.weather</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Cache and derive story flags</h4>
                <p class="text-xs text-bd-text-secondary">Store derived flags like <code class="text-bd-green">state.isRaining = (weatherCode &gt;= 51 &amp;&amp; weatherCode &lt;= 67)</code> on state. Do not call the API every turn &mdash; re-query every ~30 in-game turns or expose a refresh command.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-cyan" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The Weather module exposes two ops. Both accept either <code class="text-bd-green">latitude</code> +
              <code class="text-bd-green">longitude</code> or a <code class="text-bd-green">place</code> string for location.
              All numeric fields may be <code class="text-bd-green">null</code> when upstream data is missing.
            </p>

            <!-- weather.current -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>weather.current</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms timeout</span>
              </div>
              <p>Current temperature, wind, humidity, and WMO weather code for coordinates or a place name.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "latitude": 41.88,              // number, -90 to 90 (must pair with longitude)
  "longitude": -87.62,            // number, -180 to 180 (must pair with latitude)
  "place": "Chicago",             // string, alternative to lat/lon (geocoded)
  "units": "metric",              // "metric" | "imperial", default "metric"
  "timeoutMs": 15000              // optional, clamped 1000-30000, default 15000
}</pre>
                <p class="text-[11px] text-bd-text-muted">Provide either <code>latitude</code> + <code>longitude</code> <strong>or</strong> <code>place</code>. Providing neither, or only one of lat/lon, throws <code class="text-bd-pink">invalid_args</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "location": {
    "latitude": 41.88,            // number
    "longitude": -87.62,          // number
    "name": "Chicago",            // string
    "admin1": "Illinois",         // string
    "country": "United States",   // string
    "timezone": "America/Chicago",// string
    "elevation": 180              // number | null
  },
  "units": "metric",              // "metric" | "imperial"
  "source": "open-meteo",
  "current": {
    "observedAt": "2025-01-16T18:00:00.000Z",
    "temperature": 4.2,           // number | null (C or F depending on units)
    "apparentTemperature": 1.5,   // number | null
    "relativeHumidity": 62,       // number | null
    "windSpeed": 18,              // number | null (km/h or mph)
    "windDirection": 270,         // number | null (degrees)
    "isDay": true,                // boolean
    "weatherCode": 63,            // number | null (WMO code)
    "weather": "Moderate rain"    // string (WMO label or "Unknown")
  }
}</pre>
              </div>
            </div>

            <!-- weather.forecast -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>weather.forecast</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms timeout</span>
              </div>
              <p>Daily forecast for the next few days. Useful for travel arcs that span in-story time.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "latitude": 41.88,              // same location rules as current
  "longitude": -87.62,
  "place": "Chicago",
  "units": "metric",
  "days": 3,                      // optional, 1-7, default 3 (clamped to max 7)
  "timeoutMs": 15000
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "location": { /* same shape as current */ },
  "units": "metric",
  "source": "open-meteo",
  "days": [
    {
      "date": "2025-01-16",                   // string (ISO date)
      "weatherCode": 71,                      // number | null
      "weather": "Slight snow",               // string
      "temperatureMax": 6,                    // number | null
      "temperatureMin": -1,                   // number | null
      "precipitationSum": 2.5,                // number | null (mm or inch)
      "precipitationProbabilityMax": 80,      // number | null (0-100)
      "windSpeedMax": 25,                     // number | null (km/h or mph)
      "sunrise": "2025-01-16T07:15:00.000Z",  // string (ISO timestamp)
      "sunset": "2025-01-16T16:45:00.000Z"    // string (ISO timestamp)
    }
  ]
}</pre>
              </div>
            </div>

            <div class="space-y-1">
              <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
              <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px] space-y-0.5">
                <p><code class="text-bd-pink">invalid_args</code> &mdash; args not object, lat/lon out of range, units not metric/imperial, missing location, or partial lat/lon</p>
                <p><code class="text-bd-pink">not_found</code> &mdash; place name geocoding returned no results</p>
                <p><code class="text-bd-pink">weather_unavailable</code> &mdash; extension runtime unavailable or background fetch failed</p>
                <p><code class="text-bd-pink">upstream_error</code> &mdash; Open-Meteo API returned non-2xx status. Shape: <code>{ code, message, status }</code></p>
                <p><code class="text-bd-pink">weather_failed</code> &mdash; generic upstream failure (invalid JSON, non-text response)</p>
              </div>
              <p class="text-[11px] text-bd-text-muted">All errors have shape <code>{ code, message }</code> unless noted.</p>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Is it raining there?"</strong> &rarr; Weather <code>current</code></div>
                <div>&middot; <strong>"Will it snow tomorrow?"</strong> &rarr; Weather <code>forecast</code></div>
                <div>&middot; <strong>"Show weather in a widget"</strong> &rarr; <router-link to="/ultrascripts?tab=widget" class="text-bd-accent-primary hover:underline">Widget</router-link></div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using Weather well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Use <code>{ place: 'Chicago' }</code> for a fixed scenario location.</li>
                  <li>&middot; Cache weather flags on <code>state</code>; re-query every ~30 turns.</li>
                  <li>&middot; Branch on <code>weatherCode</code> for precise conditions.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not call the API every turn.</li>
                  <li>&middot; Do not assume numeric fields are always non-null.</li>
                  <li>&middot; Do not block the scenario on weather availability.</li>
                  <li>&middot; Do not store the whole response &mdash; derive story flags.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: WMO CODES ===================== -->
      <section id="guide-wmo-codes" class="card">
        <button @click="toggleGuideSection('wmo-codes')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: WMO Weather Codes</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('wmo-codes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('wmo-codes')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">weatherCode</code> field uses the World Meteorological Organization (WMO) weather interpretation
              codes. The <code class="text-bd-green">weather</code> field provides a human-readable label for the same code.
            </p>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5">Selected WMO codes</h4>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-1 text-[10px] font-mono text-bd-text-muted">
                <div>&middot; 0: Clear sky</div>
                <div>&middot; 1&ndash;3: Partly cloudy</div>
                <div>&middot; 45,48: Fog</div>
                <div>&middot; 51&ndash;55: Drizzle</div>
                <div>&middot; 56&ndash;57: Freezing drizzle</div>
                <div>&middot; 61&ndash;65: Rain</div>
                <div>&middot; 66&ndash;67: Freezing rain</div>
                <div>&middot; 71&ndash;75: Snow</div>
                <div>&middot; 77: Snow grains</div>
                <div>&middot; 80&ndash;82: Rain showers</div>
                <div>&middot; 85&ndash;86: Snow showers</div>
                <div>&middot; 95: Thunderstorm</div>
                <div>&middot; 96,99: Thunderstorm + hail</div>
              </div>
            </div>

            <p class="text-[11px] text-bd-text-muted">
              When <code class="text-bd-green">weatherCode</code> is <code class="text-bd-green">null</code>, the <code class="text-bd-green">weather</code>
              label is <code class="text-bd-green">"Unknown"</code>. Always handle the null case in your branching logic.
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the Weather module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Missing location</h4>
                <p class="text-bd-text-secondary">Weather call fails because no coordinates or place name are provided.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Pass <code>latitude</code>/<code>longitude</code> explicitly, or pass a <code>place</code> string.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Caching for too long</h4>
                <p class="text-bd-text-secondary">Weather queried at session start no longer matches hours later.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Re-query every ~30 in-game turns, or expose a "refresh weather" command.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Partial lat/lon</h4>
                <p class="text-bd-text-secondary">Passing only <code>latitude</code> without <code>longitude</code> (or vice versa).</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always provide both <code>latitude</code> and <code>longitude</code> together, or use <code>place</code> instead.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming non-null fields</h4>
                <p class="text-bd-text-secondary">Reading <code>temperature</code> or <code>windSpeed</code> without null checks.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Treat all numeric fields as nullable; provide safe defaults for your story logic.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts Weather module:
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
  ChevronDown, ChevronUp, CloudSun, Terminal, Rocket, AlertTriangle, Zap, ArrowRight,
  Sparkles, Info, ShieldCheck, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the Weather Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'wmo-codes', label: 'WMO Weather Codes' },
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
