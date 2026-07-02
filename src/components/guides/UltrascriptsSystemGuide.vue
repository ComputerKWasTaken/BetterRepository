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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Cpu class="w-5 h-5 text-bd-purple" />What Is the System Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The System module reports device, display, and power hints from the browser. Use it to render platform-appropriate
              widget layouts (mobile vs. desktop), reduce work when the player is on battery, or annotate adventures with
              client metadata for debugging.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Reports</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Device class (desktop, tablet, mobile)</li>
                  <li>&middot; Platform and browser family</li>
                  <li>&middot; Screen dimensions and viewport</li>
                  <li>&middot; Hardware (cores, memory, touch)</li>
                  <li>&middot; User preferences (dark mode, motion)</li>
                  <li>&middot; Battery state (where supported)</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Choose compact or full widget layouts</li>
                  <li>&middot; Reduce optional work on battery</li>
                  <li>&middot; Respect dark-mode and reduced-motion</li>
                  <li>&middot; Detect touch vs. pointer devices</li>
                  <li>&middot; Annotate debug state with client info</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">system.info</code> and <code class="text-bd-green">system.power</code></li>
                  <li>&middot; Synchronous, returns on the next turn</li>
                  <li>&middot; No player setup or permissions required</li>
                  <li>&middot; Read-only &mdash; no side effects</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Prefer <code class="text-bd-green">deviceClass</code> and <code class="text-bd-green">screen.viewportWidth</code> for layout decisions.
                  Do not branch on raw user-agent strings &mdash; they are fragile and vary across browser versions.
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
            <p class="text-bd-text-secondary">Three steps to adapt your scenario to the player's device.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Queue an info request</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('system', 'info', {})</code> near scenario start. The request is synchronous and returns on the next turn.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Read the result on a later turn</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('system', 'info')</code> to pull the most recent response. Branch on <code class="text-bd-green">data.deviceClass</code> and <code class="text-bd-green">data.screen.viewportWidth</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Choose a layout</h4>
                <p class="text-xs text-bd-text-secondary">Pick a compact or full <router-link to="/ultrascripts?tab=widget" class="text-bd-accent-primary hover:underline">Widget</router-link> manifest based on the device class and viewport width. Optionally check <code class="text-bd-green">system.power</code> to reduce work on battery.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-purple" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The System module exposes two ops: <code class="text-bd-green">system.info</code> for device and display metadata,
              and <code class="text-bd-green">system.power</code> for battery state.
            </p>

            <!-- system.info -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>system.info</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Sanitized device, display, and environment metadata.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
                <p class="text-[11px] text-bd-text-muted">Pass an empty object. Non-object args throw <code class="text-bd-pink">invalid_args</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "checkedAt": 1736992200000,       // number (Unix ms)
  "checkedAtIso": "2025-01-15T20:30:00.000Z",
  "deviceClass": "desktop",         // "desktop" | "tablet" | "mobile" | "unknown"
  "platform": {
    "family": "windows",            // "windows"|"macos"|"linux"|"android"|"ios"|"chromeos"|"unknown"
    "raw": "Win32",                 // string | null
    "mobile": false                 // boolean
  },
  "browser": {
    "name": "chromium",             // "chromium"|"firefox"|"safari"|"edge"|"opera"|"unknown"
    "version": "124.0.0.0",         // string | null
    "userAgentDataSupported": true, // boolean
    "brands": [                     // array of { brand, version }
      { "brand": "Chromium", "version": "124" }
    ]
  },
  "locale": {
    "language": "en-US",            // string | null
    "languages": ["en-US", "en"],   // array of strings
    "timeZone": "America/Chicago"   // string | null
  },
  "screen": {
    "width": 2560,                  // number | null
    "height": 1440,                 // number | null
    "availWidth": 2560,             // number | null
    "availHeight": 1416,            // number | null
    "colorDepth": 24,               // number | null
    "pixelDepth": 24,               // number | null
    "orientationType": "landscape-primary", // string | null
    "orientationAngle": 0,          // number | null
    "viewportWidth": 1440,          // number | null
    "viewportHeight": 900,          // number | null
    "devicePixelRatio": 2           // number | null
  },
  "hardware": {
    "logicalCores": 8,              // number | null
    "deviceMemoryGb": 16,           // number | null
    "maxTouchPoints": 0             // number | null
  },
  "preferences": {
    "reducedMotion": false,         // boolean | null
    "reducedData": false,           // boolean | null
    "colorScheme": "dark",          // "dark" | "light" | null
    "coarsePointer": false,         // boolean | null
    "hover": true                   // boolean | null
  },
  "extension": {
    "available": true,              // boolean
    "name": "BetterDungeon",        // string | null
    "version": "2.0.0"              // string | null
  }
}</pre>
              </div>
            </div>

            <!-- system.power -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>system.power</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1500ms timeout</span>
              </div>
              <p>Battery state when the platform supports the Battery Status API.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (supported)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "checkedAt": 1736992200000,
  "checkedAtIso": "2025-01-15T20:30:00.000Z",
  "supported": true,
  "charging": false,
  "state": "discharging",       // "charging" | "discharging" | "charged" | "unknown"
  "level": 0.62,                // number 0..1
  "levelPercent": 62,           // number 0..100
  "chargingTimeSec": null,      // number | null
  "dischargingTimeSec": 14400   // number | null
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (unsupported)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "checkedAt": 1736992200000,
  "checkedAtIso": "2025-01-15T20:30:00.000Z",
  "supported": false,
  "reason": "battery_unavailable",
  "message": "Battery status is unavailable"
}</pre>
                <p class="text-[11px] text-bd-text-muted">Modern Firefox and Safari disable the Battery Status API for privacy &mdash; treat <code>supported: false</code> as the common case.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
                <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px]">
                  <p><code class="text-bd-pink">invalid_args</code> &mdash; args is not an object. Shape: <code>{ code, message }</code></p>
                </div>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Mobile or desktop?"</strong> &rarr; System <code>info.deviceClass</code></div>
                <div>&middot; <strong>"Is the player on battery?"</strong> &rarr; System <code>power</code></div>
                <div>&middot; <strong>"Dark mode?"</strong> &rarr; System <code>info.preferences.colorScheme</code></div>
                <div>&middot; <strong>"What modules are enabled?"</strong> &rarr; <router-link to="/ultrascripts?tab=sdk" class="text-bd-accent-primary hover:underline">SDK</router-link> <code>config</code></div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using System well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Use <code>deviceClass</code> + <code>screen.viewportWidth</code> for layout decisions.</li>
                  <li>&middot; Check <code>power.supported</code> before reading battery fields.</li>
                  <li>&middot; Respect <code>preferences.colorScheme</code> and <code>reducedMotion</code>.</li>
                  <li>&middot; Use <code>hardware.maxTouchPoints</code> to detect touch devices.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not branch on raw user-agent strings.</li>
                  <li>&middot; Do not assume battery info is always available.</li>
                  <li>&middot; Do not block the scenario on <code>power.supported === true</code>.</li>
                  <li>&middot; Do not use System for fingerprinting or tracking.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED ===================== -->
      <section id="guide-advanced" class="card">
        <button @click="toggleGuideSection('advanced')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Device Classification</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">deviceClass</code> field is a coarse classification derived from a multi-factor heuristic
              that combines screen size, touch support, platform family, and pointer type. It is more reliable than user-agent
              sniffing because it reflects how the player actually interacts with the page.
            </p>
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30">
                <strong class="text-bd-green block mb-0.5">desktop</strong>
                Large viewport, fine pointer (mouse), no touch. Use full widget layouts.
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30">
                <strong class="text-bd-amber block mb-0.5">tablet</strong>
                Medium viewport, touch input, may have hover. Use compact layouts.
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30">
                <strong class="text-bd-amber block mb-0.5">mobile</strong>
                Small viewport, coarse pointer (touch), no hover. Use minimal layouts.
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-muted block mb-0.5">unknown</strong>
                Could not classify. Fall back to viewport width alone.
              </div>
            </div>
            <p class="text-[11px] text-bd-text-muted">
              The <code class="text-bd-green">extension</code> object in <code class="text-bd-green">system.info</code> tells you whether
              BetterDungeon is present and its version. This is useful for debugging and for scripts that adapt behavior based on
              extension availability.
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the System module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Trusting battery info</h4>
                <p class="text-bd-text-secondary">Assuming <code>power.supported</code> is always <code>true</code> and reading battery fields unconditionally.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always branch on <code>supported</code>; treat <code>false</code> as the common case on Firefox and Safari.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> User-agent sniffing</h4>
                <p class="text-bd-text-secondary">Branching on <code>browser.name</code> or <code>platform.raw</code> for layout decisions.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Prefer <code>deviceClass</code> + <code>screen.viewportWidth</code> + feature checks over UA branching.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Ignoring preferences</h4>
                <p class="text-bd-text-secondary">Animating widgets when the player has <code>reducedMotion: true</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Check <code>preferences.reducedMotion</code> and disable nonessential animations when it is <code>true</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Assuming screen fields</h4>
                <p class="text-bd-text-secondary">Reading <code>screen.width</code> without a null check in a headless or embedded context.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Treat all screen and hardware fields as nullable; provide sensible defaults.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts System module:
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
  ChevronDown, ChevronUp, Cpu, Terminal, Rocket, AlertTriangle, Zap, ArrowRight,
  Sparkles, Info, ShieldCheck, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the System Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced', label: 'Device Classification' },
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
