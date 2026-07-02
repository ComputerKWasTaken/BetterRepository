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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><MapPin class="w-5 h-5 text-bd-blue" />What Is the Geolocation Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Geolocation module wraps the browser's standard geolocation API. Scenarios can adapt narration to the player's
              physical region (e.g. weather lookups, regional flavor cues) after the player explicitly grants permission in their browser.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Reports</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Permission state (without prompting)</li>
                  <li>&middot; Latitude and longitude</li>
                  <li>&middot; Horizontal accuracy in meters</li>
                  <li>&middot; Altitude, heading, speed (where available)</li>
                  <li>&middot; Timestamp of the position fix</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Feed coordinates into <router-link to="/ultrascripts?tab=weather" class="text-bd-accent-primary hover:underline">Weather</router-link></li>
                  <li>&middot; Regional language or folklore cues</li>
                  <li>&middot; Travel flavor in the narrative</li>
                  <li>&middot; Local conditions widget panel</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">permission</code> and <code class="text-bd-green">getCurrent</code></li>
                  <li>&middot; Async &mdash; responses arrive on a later turn</li>
                  <li>&middot; Browser-native permission dialog</li>
                  <li>&middot; No BetterDungeon popup config</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-2">
                <ShieldCheck class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-green">Privacy guarantee:</strong> Coordinates are resolved entirely by the player's browser. BetterDungeon does
                  <strong>not</strong> transmit them anywhere &mdash; they sit in the response card on the player's own adventure, written only when the script asked.
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
            <p class="text-bd-text-secondary">Three steps to use real-world location with a clean fallback.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Check permission first</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('geolocation', 'permission', {})</code>. This does <strong>not</strong> prompt the player &mdash; it only reads the current browser state.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Request coordinates if granted</h4>
                <p class="text-xs text-bd-text-secondary">If the later result is <code class="text-bd-green">granted</code> or <code class="text-bd-green">prompt</code>, call <code class="text-bd-green">bd.us.call('geolocation', 'getCurrent', {})</code>. The browser may show its native permission dialog if state is <code>prompt</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Cache and degrade gracefully</h4>
                <p class="text-xs text-bd-text-secondary">Cache the resolved coordinates on <code class="text-bd-green">state.geo</code>. If denied or unsupported, fall back to a place string or generic narration &mdash; never block the scenario on location.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-blue" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The Geolocation module exposes two ops: <code class="text-bd-green">permission</code> for a read-only permission check,
              and <code class="text-bd-green">getCurrent</code> for resolving coordinates.
            </p>

            <!-- geolocation.permission -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>geolocation.permission</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Reports the current browser permission state without prompting the player.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
                <p class="text-[11px] text-bd-text-muted">Pass an empty object. Non-object args throw <code class="text-bd-pink">invalid_args</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "supported": true,               // boolean (false if geolocation API unavailable)
  "permissionState": "granted"     // "granted" | "denied" | "prompt" | "unknown" | "unsupported"
}</pre>
                <p class="text-[11px] text-bd-text-muted"><code>unsupported</code> means the geolocation API itself is not available. <code>unknown</code> means the Permissions API is unavailable but geolocation might still work.</p>
              </div>
            </div>

            <!-- geolocation.getCurrent -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>geolocation.getCurrent</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms timeout</span>
              </div>
              <p>Resolves the player's current coordinates. If permission is <code>prompt</code>, the browser may show its native permission dialog.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "highAccuracy": false,           // optional, default false (enables GPS-level accuracy)
  "timeoutMs": 15000,              // optional, clamped 1000-30000, default 15000
  "maximumAgeMs": 0                // optional, clamped 0-3600000, default 0 (cache age)
}</pre>
                <p class="text-[11px] text-bd-text-muted"><code>highAccuracy</code> maps to the browser's <code>enableHighAccuracy</code> option. It uses more power and may be slower but yields better precision.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "latitude": 41.881832,           // number | null
  "longitude": -87.623177,         // number | null
  "accuracy": 35,                  // number | null (meters)
  "altitude": null,                // number | null (meters)
  "altitudeAccuracy": null,        // number | null (meters)
  "heading": null,                 // number | null (degrees)
  "speed": null,                   // number | null (m/s)
  "timestamp": 1737042131428,      // number (Unix ms)
  "iso": "2025-01-16T18:42:11.428Z",
  "permissionState": "granted"     // "granted" | "denied" | "prompt" | "unknown"
}</pre>
                <p class="text-[11px] text-bd-text-muted">Only <code>timestamp</code> and <code>iso</code> are guaranteed. All coordinate fields may be <code>null</code> depending on the device and browser.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
                <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px] space-y-0.5">
                  <p><code class="text-bd-pink">invalid_args</code> &mdash; args is not an object</p>
                  <p><code class="text-bd-pink">permission_denied</code> &mdash; user denied permission (browser code 1) or pre-check found denied state</p>
                  <p><code class="text-bd-pink">position_unavailable</code> &mdash; position unavailable (browser code 2)</p>
                  <p><code class="text-bd-pink">timeout</code> &mdash; geolocation request timed out (browser code 3)</p>
                  <p><code class="text-bd-pink">geolocation_failed</code> &mdash; generic geolocation failure (unknown browser code)</p>
                  <p><code class="text-bd-pink">unavailable</code> &mdash; geolocation API not available in this browser</p>
                </div>
                <p class="text-[11px] text-bd-text-muted">All errors have shape <code>{ code, message }</code>.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Where is the player?"</strong> &rarr; Geolocation <code>getCurrent</code></div>
                <div>&middot; <strong>"Has the player consented?"</strong> &rarr; Geolocation <code>permission</code></div>
                <div>&middot; <strong>"What's the weather there?"</strong> &rarr; <router-link to="/ultrascripts?tab=weather" class="text-bd-accent-primary hover:underline">Weather</router-link> with lat/lon</div>
                <div>&middot; <strong>"What time is it?"</strong> &rarr; <router-link to="/ultrascripts?tab=clock" class="text-bd-accent-primary hover:underline">Clock</router-link></div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using Geolocation well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Check <code>permission</code> before calling <code>getCurrent</code>.</li>
                  <li>&middot; Cache resolved coordinates on <code>state.geo</code>.</li>
                  <li>&middot; Design a no-location fallback for denied or unsupported cases.</li>
                  <li>&middot; Feed lat/lon into <code>weather.current</code> for local conditions.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not call <code>getCurrent</code> every turn &mdash; cache the result.</li>
                  <li>&middot; Do not block the scenario on location availability.</li>
                  <li>&middot; Do not assume altitude, heading, or speed are non-null.</li>
                  <li>&middot; Do not use <code>highAccuracy: true</code> unless you need GPS precision.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED ===================== -->
      <section id="guide-advanced" class="card">
        <button @click="toggleGuideSection('advanced')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Accuracy &amp; Caching</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">highAccuracy</code> arg maps to the browser's <code class="text-bd-green">enableHighAccuracy</code> option.
              When <code class="text-bd-green">true</code>, the browser may use GPS or more precise positioning methods, which costs more power and
              takes longer. Use it only when you need meter-level precision (e.g. for nearby-landmark narration).
            </p>
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">maximumAgeMs</code> arg controls whether the browser can return a cached position. The default is
              <code class="text-bd-green">0</code> (no cache), which forces a fresh fix every time. Set it to a higher value (up to
              <code class="text-bd-green">3600000</code> ms = 1 hour) if you are comfortable with a slightly stale position and want faster responses.
            </p>
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">timeoutMs</code> arg is the request-side timeout, clamped to <code class="text-bd-green">1000</code>&ndash;<code class="text-bd-green">30000</code> ms.
              If the browser cannot resolve a position within this window, the op returns a <code class="text-bd-pink">timeout</code> error.
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the Geolocation module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Permission denied</h4>
                <p class="text-bd-text-secondary">Calling <code>getCurrent</code> without checking permission first, then failing with <code>permission_denied</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Check <code>geolocation.permission</code> first; degrade narration when <code>permissionState</code> is <code>denied</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Re-prompting on every turn</h4>
                <p class="text-bd-text-secondary">Calling <code>getCurrent</code> repeatedly forces the browser to keep resolving.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Cache the resolved coordinates in <code>state.geo</code> for the rest of the session.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming all coordinate fields exist</h4>
                <p class="text-bd-text-secondary">Reading <code>altitude</code> or <code>heading</code> without null checks.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Treat <code>altitude</code>, <code>altitudeAccuracy</code>, <code>heading</code>, and <code>speed</code> as nullable.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Blocking on location</h4>
                <p class="text-bd-text-secondary">Making location a hard requirement for the scenario to proceed.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always design a no-location fallback path with generic narration.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts Geolocation module:
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
  ChevronDown, ChevronUp, MapPin, Terminal, Rocket, AlertTriangle, ShieldCheck, Zap, ArrowRight,
  Sparkles, Info, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the Geolocation Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced', label: 'Accuracy & Caching' },
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
