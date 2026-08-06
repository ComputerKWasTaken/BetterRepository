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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-cyan" />What Is the SDK Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The <strong>SDK module</strong> exposes a narrow, read-only window into the BetterDungeon extension itself: its version, its feature flags,
              and the player's safe-to-expose Ultrascripts preferences. Scenarios call it to <em>adapt</em> behavior to a player's setup, not to control it.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Exposes</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; SDK and BetterDungeon versions</li>
                  <li>&middot; Ultrascripts protocol version</li>
                  <li>&middot; Feature flags (markdown, notes, etc.)</li>
                  <li>&middot; Module preferences (enabled toggles)</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Adapt UI to player's feature flags</li>
                  <li>&middot; Check if a module is enabled</li>
                  <li>&middot; Progressive enhancement decisions</li>
                  <li>&middot; Compatibility banners and diagnostics</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">version</code> and <code class="text-bd-green">config</code></li>
                  <li>&middot; Read-only &mdash; no side effects</li>
                  <li>&middot; No player setup required</li>
                  <li>&middot; Safe summaries only (no secrets)</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <div class="flex items-start gap-2">
                <Search class="w-4 h-4 text-bd-cyan flex-shrink-0 mt-0.5" />
                <div class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-cyan">Heartbeat vs. SDK &mdash; pick the right one:</strong>
                  <ul class="space-y-0.5 mt-1">
                    <li>&middot; <strong>Heartbeat</strong> = <em>"is Ultrascripts present, and which modules/ops are mounted?"</em> Free, synchronous, present at turn-0.</li>
                    <li>&middot; <strong>SDK</strong> = <em>"what does the player's BetterDungeon look like, and how should I adapt?"</em> A real op call, slightly slower, returns rich metadata.</li>
                  </ul>
                  <p class="mt-1.5">If you only need availability, read the heartbeat card. Reach for SDK ops when you need the deeper picture.</p>
                </div>
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
            <p class="text-bd-text-secondary">Three steps to adapt your scenario to the player's setup.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Check availability via heartbeat</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.available()</code> to confirm Ultrascripts is present. If absent, run plain AI Dungeon logic and skip all op calls.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Queue sdk.config once</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('sdk', 'config', {})</code> once per adventure. Cache the response and reuse it on subsequent turns.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Branch on actual configuration</h4>
                <p class="text-xs text-bd-text-secondary">Read <code class="text-bd-green">bd.us.latest('sdk', 'config')</code> and branch on <code class="text-bd-green">data.ultrascripts.modulePreferences</code> and <code class="text-bd-green">data.features</code>. Always keep the plain-script path first-class.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Code class="w-5 h-5 text-bd-cyan" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The SDK module exposes two read-only ops. Both accept an empty object as args; non-object args throw
              <code class="text-bd-pink">invalid_args</code>.
            </p>

            <!-- sdk.version -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.version</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Returns minimal version metadata. Stable and cheap; safe to call on every adventure load.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",              // SDK module contract version
  "betterDungeonVersion": "2.0.0",   // extension manifest version or "unknown"
  "ultrascriptsProtocol": 1,          // Ultrascripts card protocol version
  "ultrascriptsClient": "BetterDungeon" // client name
}</pre>
              </div>
            </div>

            <!-- sdk.config -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.config</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1500ms timeout</span>
              </div>
              <p>Returns the full sanitized configuration surface: feature flags and module preferences.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",
  "betterDungeonVersion": "2.0.0",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "BetterDungeon",
  "features": {
    "ultrascripts": true,        "markdown": true,
    "command": true,             "try": true,
    "triggerHighlight": true,    "hotkey": true,
    "favoriteInstructions": true,"inputModeColor": true,
    "characterPreset": true,     "autoSee": false,      // disabled by default
    "notes": true,               "storyCardModalDock": true,
    "inputHistory": true,        "textToSpeech": false  // disabled by default
  },
  "ultrascripts": {
    "enabled": true,             // ultrascripts feature flag
    "runtimeEnabled": true,      // runtime is live
    "debug": false,
    "modulePreferences": {
      "widget": true, "webfetch": true, "clock": true,
      "sdk": true, "weather": true,
      "network": true, "system": true, "ai": true
    }
  }
}</pre>
                <p class="text-[11px] text-bd-text-muted">The <code>ultrascripts</code> object may contain additional background-provided fields beyond those documented here. Always check for field presence before relying on undocumented fields.</p>
              </div>

              <div class="p-2 rounded bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
                <strong class="text-bd-amber">Security guarantee:</strong> SDK config exposes only safe feature and module preferences. No API keys, cookies, auth tokens, or unrestricted storage data are ever exposed.
              </div>
            </div>

            <div class="space-y-1">
              <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
              <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px]">
                <p><code class="text-bd-pink">invalid_args</code> &mdash; args is an array or primitive instead of an object. Omitted or <code>null</code> args are treated as <code>{}</code>. Shape: <code>{ code, message }</code></p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Is Ultrascripts present?"</strong> &rarr; Heartbeat</div>
                <div>&middot; <strong>"What modules are enabled?"</strong> &rarr; SDK <code>config</code></div>
                <div>&middot; <strong>"What version is this?"</strong> &rarr; SDK <code>version</code></div>
                <div>&middot; <strong>"Is a specific op available?"</strong> &rarr; Heartbeat + <code>bd.us.has(moduleId, opName)</code></div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using the SDK module well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Check the heartbeat first (<code>bd.us.available()</code>).</li>
                  <li>&middot; Queue <code>sdk.config</code> once, then cache the response.</li>
                  <li>&middot; Branch on actual player configuration, not assumptions.</li>
                  <li>&middot; Keep the plain-script path first-class.</li>
                  <li>&middot; Treat every feature flag as user-controlled.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not call <code>sdk.config</code> every turn &mdash; cache it.</li>
                  <li>&middot; Do not assume feature flags have specific values.</li>
                  <li>&middot; Do not expect SDK config to expose AI backend readiness.</li>
                  <li>&middot; Do not use SDK as a substitute for heartbeat discovery.</li>
                  <li>&middot; Do not hardcode <code>autoSee</code> or <code>textToSpeech</code> as true.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: COMPATIBILITY PROTOCOL ===================== -->
      <section id="guide-protocol" class="card">
        <button @click="toggleGuideSection('protocol')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Compatibility Protocol</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('protocol') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('protocol')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Start by classifying the scenario. Some scripts are <strong>enhanced with Ultrascripts</strong>; others <strong>require Ultrascripts</strong>.
              The SDK helps you decide which layer the current player is in.
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What you see</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What it means</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What to do</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>!bd.us.available()</code></td>
                    <td class="py-2 px-2">No heartbeat &mdash; no live Ultrascripts runtime.</td>
                    <td class="py-2 px-2">Run plain AI Dungeon logic. Skip Widget publishes and op calls.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>bd.us.available()</code> but <code>!bd.us.has('widget')</code></td>
                    <td class="py-2 px-2">Ultrascripts exists, but that module is not mounted.</td>
                    <td class="py-2 px-2">Keep the rest of your Ultrascripts flow; fall back for that one feature.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>bd.us.has('sdk', 'config')</code> and no cached config yet</td>
                    <td class="py-2 px-2">Runtime is present, but you have not asked for player configuration.</td>
                    <td class="py-2 px-2">Queue <code>sdk.config</code> once, then read it on the next turn.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2"><code>cfg.data.ultrascripts...</code> says a feature is off</td>
                    <td class="py-2 px-2">The player has not enabled that capability.</td>
                    <td class="py-2 px-2">Respect it. Use a narrative fallback and document the optional upgrade path.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <p class="text-[11px]">
                <strong class="text-bd-green">Important:</strong> a missing heartbeat is not a special-case error. From the script side,
                "no BetterDungeon", "Ultrascripts disabled", and "runtime not available" all collapse into the same safe creator behavior:
                <strong>do the plain-script version instead.</strong>
              </p>
            </div>
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the SDK module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Reading SDK before heartbeat fires</h4>
                <p class="text-bd-text-secondary">SDK call lands before <code>ultrascripts:heartbeat</code> exists.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Check for the heartbeat card first. If absent, treat Ultrascripts as not present.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming AI generation exists</h4>
                <p class="text-bd-text-secondary">Code expects SDK config to expose AI backend readiness.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use heartbeat for op availability and <code>ai.status</code> to detect AI backend configuration.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Hardcoding feature flag values</h4>
                <p class="text-bd-text-secondary">Code assumes <code>features.notes</code> or <code>features.autoSee</code> is always true.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Treat every feature flag as user-controlled. <code>autoSee</code> and <code>textToSpeech</code> default to false.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Calling sdk.config every turn</h4>
                <p class="text-bd-text-secondary">Wasting a request slot on every turn for data that rarely changes.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Queue <code>sdk.config</code> once per adventure and cache the response.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts SDK module:
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
  ChevronDown, ChevronUp, Terminal, Search, Code, Zap, ArrowRight, ShieldCheck,
  AlertTriangle, Sparkles, Info, Rocket, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the SDK Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'protocol', label: 'Compatibility Protocol' },
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
