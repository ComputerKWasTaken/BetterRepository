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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Wifi class="w-5 h-5 text-bd-green" />What Is the Network Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Network module reports the player's <strong>current</strong> browser-side connection state. It does not perform requests
              itself &mdash; use <router-link to="/ultrascripts?tab=webfetch" class="text-bd-accent-primary hover:underline font-medium">WebFetch</router-link>
              for that. Reach for Network when you want to <em>condition</em> behavior on the player being online or on a fast connection.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Reports</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Online/offline state</li>
                  <li>&middot; Effective connection type (4g, 3g, 2g, slow-2g)</li>
                  <li>&middot; Downlink speed and round-trip time</li>
                  <li>&middot; Data-saver preference</li>
                  <li>&middot; A normalized <code class="text-bd-green">quality</code> classification</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Skip nonessential remote calls when offline</li>
                  <li>&middot; Shorten requests on constrained connections</li>
                  <li>&middot; Reduce or defer nonessential WebFetch or AI work on constrained connections</li>
                  <li>&middot; Fall back to cached data on slow links</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Single op: <code class="text-bd-green">network.status</code></li>
                  <li>&middot; Synchronous, returns on the next turn</li>
                  <li>&middot; Reads <code class="text-bd-green">navigator.onLine</code> and the Network Information API</li>
                  <li>&middot; No player setup or permissions required</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Network state is intentionally mutable, so the op is queried on demand rather than cached at session start. Always re-query
                  before critical network-dependent transitions.
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
            <p class="text-bd-text-secondary">Three steps to gate remote work behind a connection check.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Queue a status request</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('network', 'status', {})</code> at scenario startup or before any remote feature. The request is synchronous and returns on the next turn.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Read the result on a later turn</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('network', 'status')</code> to pull the most recent response. Store a simple flag like <code class="text-bd-green">state.offline = (data.online === false)</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Branch on quality</h4>
                <p class="text-xs text-bd-text-secondary">Skip nonessential remote calls when <code class="text-bd-green">online === false</code>. On <code class="text-bd-green">constrained</code> or <code class="text-bd-green">limited</code> quality, prefer cached data and shorter requests.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-green" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The Network module exposes a single op: <code class="text-bd-green">network.status</code>. It reads the browser's connection
              state at call time and returns a normalized snapshot.
            </p>

            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>network.status</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Reports online state and best-available connection hints from the browser's Network Information API.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
                <p class="text-[11px] text-bd-text-muted">Pass an empty object. Non-object args (arrays, primitives) throw <code class="text-bd-pink">invalid_args</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "online": true,                    // boolean | null (null if navigator.onLine unavailable)
  "quality": "good",                 // "offline" | "constrained" | "limited" | "good" | "unknown"
  "checkedAt": 1737042131428,        // number (Unix ms timestamp)
  "checkedAtIso": "2025-01-16T18:42:11.428Z",
  "connectionSupported": true,       // boolean (true if Network Information API available)
  "effectiveType": "4g",             // "4g" | "3g" | "2g" | "slow-2g" | null
  "type": "wifi",                    // string | null (connection.type)
  "downlinkMbps": 10.2,              // number | null
  "downlinkMaxMbps": 50,             // number | null
  "rttMs": 50,                       // number | null (round-trip time)
  "saveData": false                  // boolean | null (data-saver preference)
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Quality classification</h5>
                <p>The <code class="text-bd-green">quality</code> field is a normalized summary so scripts do not need to interpret raw hints:</p>
                <div class="grid md:grid-cols-2 gap-2 text-[11px]">
                  <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                    <strong class="text-bd-pink">offline</strong> &mdash; <code>online === false</code>
                  </div>
                  <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                    <strong class="text-bd-amber">constrained</strong> &mdash; <code>saveData === true</code> or effectiveType is <code>slow-2g</code>/<code>2g</code>
                  </div>
                  <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                    <strong class="text-bd-amber">limited</strong> &mdash; effectiveType is <code>3g</code>, or downlink &lt; 1 Mbps, or rtt &gt; 500ms
                  </div>
                  <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                    <strong class="text-bd-green">good</strong> &mdash; effectiveType is <code>4g</code> or downlink &ge; 5 Mbps
                  </div>
                </div>
                <p class="text-[11px] text-bd-text-muted">If the Network Information API is unavailable, quality falls back to <code>unknown</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
                <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px]">
                  <p><code class="text-bd-pink">invalid_args</code> &mdash; args is not an object (e.g. array or primitive). Shape: <code>{ code, message }</code></p>
                </div>
                <p class="text-[11px] text-bd-text-muted">Runtime-level errors <code class="text-bd-pink">unknown_op</code> and <code class="text-bd-pink">unknown_module</code> apply to all modules.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Is the player online?"</strong> &rarr; Network</div>
                <div>&middot; <strong>"Fetch this URL"</strong> &rarr; WebFetch</div>
                <div>&middot; <strong>"How fast is the connection?"</strong> &rarr; Network</div>
                <div>&middot; <strong>"Search the web"</strong> &rarr; A purpose-built public search API, read through WebFetch if available</div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using Network well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Re-query <code>network.status</code> before critical remote work.</li>
                  <li>&middot; Branch on <code>quality</code> for high-level decisions.</li>
                  <li>&middot; Treat every field beyond <code>online</code> as nullable.</li>
                  <li>&middot; Use Network as a <em>hint</em>, not a hard gate.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not cache the result at session start and trust it forever.</li>
                  <li>&middot; Do not block the scenario on <code>quality === "good"</code>.</li>
                  <li>&middot; Do not assume <code>downlinkMbps</code> or <code>rttMs</code> are always numbers.</li>
                  <li>&middot; Do not use Network to perform actual HTTP requests.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED ===================== -->
      <section id="guide-advanced" class="card">
        <button @click="toggleGuideSection('advanced')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Browser Compatibility</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The Network Information API (<code class="text-bd-green">navigator.connection</code>) is not available in every browser.
              The module degrades gracefully: when the API is missing, <code class="text-bd-green">connectionSupported</code> is
              <code class="text-bd-green">false</code>, all connection-detail fields are <code class="text-bd-green">null</code>, and
              <code class="text-bd-green">quality</code> falls back to <code class="text-bd-green">"unknown"</code>.
            </p>
            <div class="grid md:grid-cols-3 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30">
                <strong class="text-bd-green block mb-0.5">Chromium</strong>
                Full Network Information API support. All fields populated.
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30">
                <strong class="text-bd-amber block mb-0.5">Firefox</strong>
                No <code>navigator.connection</code>. Only <code>online</code> is reliable; detail fields are <code>null</code>.
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30">
                <strong class="text-bd-amber block mb-0.5">Safari / WebView</strong>
                No <code>navigator.connection</code>. Only <code>online</code> is reliable; detail fields are <code>null</code>.
              </div>
            </div>
            <p class="text-[11px] text-bd-text-muted">
              Always check <code class="text-bd-green">connectionSupported</code> before relying on effectiveType, downlink, or rtt. When it is
              <code class="text-bd-green">false</code>, fall back to <code class="text-bd-green">online</code> alone.
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the Network module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Stale snapshot</h4>
                <p class="text-bd-text-secondary">Caching the result at session start and trusting it for the entire play session.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Re-query <code>network.status</code> before critical network-dependent transitions.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming all fields exist</h4>
                <p class="text-bd-text-secondary">Reading <code>downlinkMbps</code> or <code>rttMs</code> without null checks on Firefox or Safari.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Treat every field beyond <code>online</code> as nullable; check <code>connectionSupported</code> first.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Hard-gating on quality</h4>
                <p class="text-bd-text-secondary">Blocking the scenario entirely when <code>quality</code> is not <code>"good"</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use quality as a hint to reduce work, not as a hard gate that blocks gameplay.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Using Network for requests</h4>
                <p class="text-bd-text-secondary">Expecting Network to fetch URLs or perform HTTP calls.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use <router-link to="/ultrascripts?tab=webfetch" class="text-bd-accent-primary hover:underline">WebFetch</router-link> for actual requests; use Network only for state hints.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts Network module:
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
  ChevronDown, ChevronUp, Wifi, Terminal, Rocket, AlertTriangle, Zap, ArrowRight,
  Sparkles, Info, ShieldCheck, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the Network Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced', label: 'Browser Compatibility' },
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
