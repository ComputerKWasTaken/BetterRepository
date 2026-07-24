<template>
  <!-- Table of Contents - Sticky Sidebar -->
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all">
              <ChevronDown class="w-3 h-3" />
            </button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse all">
              <ChevronUp class="w-3 h-3" />
            </button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">
            {{ section.label }}
          </div>
          <button
            v-else
            @click="scrollToGuideSection(section.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary"
            :class="[
              isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted'
            ]"
          >
            {{ section.label }}
          </button>
        </template>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 space-y-4 min-w-0">

      <!-- ===================== GET STARTED CTA (top of overview) ===================== -->
      <div class="rounded-xl p-5 border border-bd-amber/40 bg-gradient-to-br from-bd-amber/10 via-bd-purple/5 to-bd-green/10">
        <div class="flex items-start gap-4 flex-wrap">
          <div class="w-11 h-11 rounded-xl bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
            <Zap class="w-5 h-5 text-bd-amber" />
          </div>
          <div class="flex-1 min-w-0">
            <h2 class="text-base font-semibold text-bd-text-primary mb-1">New here? Start with the paved path.</h2>
            <p class="text-xs text-bd-text-secondary leading-relaxed mb-3">
              <strong>Quick Start</strong> walks you through pasting the Ultrascripts SDK helper into your Library script and building a working
              HP bar + Clock + AI integration in under five minutes. After that, the <strong>Cookbook</strong> maps the eight
              most common patterns without duplicating the starter walkthrough.
            </p>
            <div class="flex flex-wrap items-center gap-2">
              <router-link
                to="/ultrascripts?tab=quickstart"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-amber/20 hover:bg-bd-amber/30 border border-bd-amber/40 text-bd-amber text-xs font-semibold transition-colors"
              >
                <Zap class="w-3.5 h-3.5" />
                Quick Start (5 min)
              </router-link>
              <router-link
                to="/ultrascripts?tab=cookbook"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-green/15 hover:bg-bd-green/25 border border-bd-green/30 text-bd-green text-xs font-semibold transition-colors"
              >
                <BookOpen class="w-3.5 h-3.5" />
                Cookbook
              </router-link>
              <a
                href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/main/services/ultrascripts"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-cyan/15 hover:bg-bd-cyan/25 border border-bd-cyan/30 text-bd-cyan text-xs font-semibold transition-colors"
              >
                <GitMerge class="w-3.5 h-3.5" />
                Core source
              </a>
              <span class="text-[10px] text-bd-text-muted">&middot; or keep reading below for the platform overview</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== WHAT IS ULTRASCRIPTS ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-bd-accent-primary" />
            What Is Ultrascripts
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Ultrascripts is BetterDungeon's scripting platform for AI Dungeon. It is a unified runtime that lets scenario scripts publish dynamic UI, call external APIs, query real-world data, and communicate bidirectionally with the BetterDungeon extension &mdash; all through AI Dungeon's existing Story Card system.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <LayoutDashboard class="w-4 h-4 text-bd-green" />
                  Dynamic UI Widgets
                </h3>
                <p class="text-bd-text-secondary">
                  Widget renders live health bars, stat grids, quest trackers, and dashboards directly in the player's browser, powered by JSON state cards.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-blue" />
                  External Integrations
                </h3>
                <p class="text-bd-text-secondary">
                  WebFetch lets scenarios reach approved external data, while the AI module sends asynchronous text, schema-backed JSON, and thinking-tuned model queries.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Cpu class="w-4 h-4 text-bd-purple" />
                  Environmental Awareness
                </h3>
                <p class="text-bd-text-secondary">
                  Clock, Weather, and System modules ground scenarios in real-world context &mdash; time of day, local weather, and platform capabilities.
                </p>
              </div>
            </div>

            <!-- Module Inventory -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <Layers class="w-4 h-4 text-bd-accent-primary" />
                First-Party Module Inventory
              </h3>
              <div class="grid md:grid-cols-3 gap-2 text-[11px]">
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-green block">Widget</strong>
                  <span class="text-bd-text-muted">State module &mdash; dynamic widget rendering</span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-blue block">WebFetch</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">fetch</code>, <code class="text-bd-green">search</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-purple block">AI</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">status</code>, <code class="text-bd-green">query</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-amber block">Clock</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">now</code>, <code class="text-bd-green">tz</code>, <code class="text-bd-green">format</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-cyan block">SDK</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">version</code>, <code class="text-bd-green">config</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-blue block">Weather</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">current</code>, <code class="text-bd-green">forecast</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-green block">Network</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">status</code></span>
                </div>
                <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-pink block">System</strong>
                  <span class="text-bd-text-muted">Ops: <code class="text-bd-green">info</code>, <code class="text-bd-green">power</code></span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== HOW TO USE THESE DOCS ===================== -->
      <section id="guide-how-to-read" class="card">
        <button
          @click="toggleGuideSection('how-to-read')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-amber" />
            How To Use These Docs
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('how-to-read') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('how-to-read')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              The docs are intentionally split into a starter walkthrough and deeper module references. Start with the flow that gets you moving,
              then use each module page to understand what to ask for, what shape comes back, and how to degrade when the player does not have that
              capability enabled.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">1. Paste the helper</h4>
                <p class="text-[11px]">
                  Quick Start contains the SDK helper. Paste it into the AI Dungeon <strong>Library</strong> script once. That gives every hook access
                  to <code class="text-bd-green">bd.us</code>.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">2. Pick a module</h4>
                <p class="text-[11px]">
                  Module pages explain the purpose, ops, arguments, result fields, and practical author flow. They are guides for what to build,
                  not giant paste bins.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">3. Use the loop</h4>
                <p class="text-[11px]">
                  In Context, call <code>bd.us.tick()</code>, read prior results with <code>bd.us.latest()</code>, queue new work with
                  <code>bd.us.call()</code>, then finish with <code>bd.us.commit()</code>.
                </p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <h4 class="font-semibold text-bd-cyan text-[12px] mb-1">What module pages are for</h4>
              <p class="text-[11px]">
                Use the Operations Reference to know the exact contract, the Usage Pattern to know when and where to call it, and Pitfalls to avoid
                the common broken-script cases. When you need a full runnable starting point, return to Quick Start or the starter templates.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TRANSPORT ARCHITECTURE ===================== -->
      <section id="guide-transport" class="card">
        <button
          @click="toggleGuideSection('transport')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <GitMerge class="w-5 h-5 text-bd-blue" />
            Story Card Transport
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('transport') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('transport')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Ultrascripts communicates through AI Dungeon's Story Card system. Scripts publish data by writing specially-typed Story Cards. BetterDungeon reads them, processes them, and writes responses back through the same channel. No custom server, no separate API &mdash; just cards.
            </p>

            <!-- Transport Flow Diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-blue" />
                Data Flow Pipeline
              </h3>
              <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">Script writes card</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle">AI Dungeon broadcasts</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-bold">Transport captures</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">Core dispatches</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">Module handles</div>
                </div>
                <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                  <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">Module responds</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">Write queue</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle">GraphQL mutation</div>
                  <span class="text-bd-text-muted">&rarr;</span>
                  <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">Script reads response</div>
                </div>
              </div>
            </div>

            <!-- Card Types -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20 space-y-2">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <ArrowUpFromLine class="w-4 h-4 text-bd-green" /> State Publishing
                </h4>
                <p class="text-bd-text-secondary">
                  Scripts write JSON into <code class="text-bd-green">ultrascripts:state:&lt;name&gt;</code> cards. BetterDungeon watches these cards and dispatches updates to the matching module (e.g. Widget reads <code class="text-bd-green">ultrascripts:state:widget</code>).
                </p>
              </div>

              <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20 space-y-2">
                <h4 class="font-semibold text-bd-blue flex items-center gap-1.5">
                  <ArrowDownToLine class="w-4 h-4 text-bd-blue" /> Request/Response Ops
                </h4>
                <p class="text-bd-text-secondary">
                  Scripts write requests into <code class="text-bd-green">ultrascripts:out</code>. Modules process the request and write responses back into <code class="text-bd-green">ultrascripts:in:&lt;module&gt;</code>. Scripts then acknowledge receipt.
                </p>
              </div>
            </div>

            <!-- Heartbeat -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-accent-primary/30 space-y-2">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                <HeartPulse class="w-4 h-4 text-bd-accent-primary" />
                Heartbeat Discovery
              </h4>
              <p class="text-bd-text-secondary">
                BetterDungeon writes a <code class="text-bd-green">ultrascripts:heartbeat</code> card on every adventure load. This card advertises the runtime version, which modules are mounted, and what ops each module exposes. Scripts inspect this card to detect Ultrascripts availability.
              </p>
              <p class="text-[10px] text-bd-text-muted">The heartbeat fires at turn-0 with no dependency on prior user card edits. It is the sole discovery surface &mdash; if the heartbeat is present, the runtime is live.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SECURITY & CONSENT ===================== -->
      <section id="guide-security" class="card">
        <button
          @click="toggleGuideSection('security')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-green" />
            Security &amp; Player Consent
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('security') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('security')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Ultrascripts is designed to be ambitious without being invasive. Players control every capability through explicit toggles and consent flows. Scenarios cannot silently claim permissions the player has not granted.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <Settings class="w-4 h-4 text-bd-purple" /> Extension Popup Controls
                </h4>
                <ul class="space-y-1 text-bd-text-muted">
                  <li>• Master Ultrascripts on/off switch</li>
                  <li>• Per-module enable/disable toggles for all eight modules</li>
                  <li>• WebFetch domain consent management</li>
                  <li>• AI status/query contract toggle</li>
                  <li>• Debug mode for development logging</li>
                </ul>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <Lock class="w-4 h-4 text-bd-amber" /> Security Guarantees
                </h4>
                <ul class="space-y-1 text-bd-text-muted">
                  <li>• Gemini API keys stay in BetterDungeon local extension storage and are not exposed to scenario scripts</li>
                  <li>• WebFetch requires explicit per-domain player approval</li>
                  <li>• AI query requests return <code>not_configured</code> until the player saves a Gemini API key</li>
                  <li>• SDK config returns sanitized data only</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PLATFORM SUPPORT ===================== -->
      <section id="guide-platforms" class="card">
        <button
          @click="toggleGuideSection('platforms')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Monitor class="w-5 h-5 text-bd-cyan" />
            Platform Support
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('platforms') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('platforms')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Ultrascripts runs wherever the BetterDungeon extension can load. The same unified runtime powers all supported platforms.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30 space-y-1.5">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4" /> Chromium Browsers
                </h4>
                <p class="text-bd-text-secondary">Chrome, Edge, Brave, and other Chromium-based browsers. Full production support for all modules.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30 space-y-1.5">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4" /> Firefox
                </h4>
                <p class="text-bd-text-secondary">Full production support via the Firefox add-on. The same runtime and module contracts apply, with browser-specific APIs degrading cleanly when unavailable.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30 space-y-1.5">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <CheckCircle2 class="w-4 h-4" /> Android WebView
                </h4>
                <p class="text-bd-text-secondary">Supported inside the released BetterDungeon Android app through its embedded WebView runtime.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <div class="flex items-start gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-text-primary">iOS:</strong> Not supported. BetterDungeon does not currently ship an iOS app or extension.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DEEP-DIVE GUIDE LINKS ===================== -->
      <section id="guide-deep-dives" class="card">
        <button
          @click="toggleGuideSection('deep-dives')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-bd-amber" />
            Module Deep-Dive Guides
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('deep-dives') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('deep-dives')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Each module family has a dedicated guide with complete API references, usage patterns, and troubleshooting grids.
            </p>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <router-link to="/ultrascripts?tab=widget" class="block p-4 rounded-lg bg-gradient-to-br from-bd-green/10 to-transparent border border-bd-green/30 hover:border-bd-green/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <LayoutDashboard class="w-5 h-5 text-bd-green" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-green transition-colors">Widget</h4>
                </div>
                <p class="text-bd-text-muted">Dynamic UI widgets &mdash; HP bars, stat grids, quest trackers, dashboards.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=webfetch" class="block p-4 rounded-lg bg-gradient-to-br from-bd-blue/10 to-transparent border border-bd-blue/30 hover:border-bd-blue/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <Globe class="w-5 h-5 text-bd-blue" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-blue transition-colors">WebFetch</h4>
                </div>
                <p class="text-bd-text-muted">Consent-gated HTTP requests and web search lookups for live external data.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=ai" class="block p-4 rounded-lg bg-gradient-to-br from-bd-purple/10 to-transparent border border-bd-purple/30 hover:border-bd-purple/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <BrainCircuit class="w-5 h-5 text-bd-purple" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-purple transition-colors">AI</h4>
                </div>
                <p class="text-bd-text-muted">Gemini-backed async status/query contract with text, schema-backed JSON, thinking levels, and automatic rate-limit fallback.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=sdk" class="block p-4 rounded-lg bg-gradient-to-br from-bd-cyan/10 to-transparent border border-bd-cyan/30 hover:border-bd-cyan/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <Terminal class="w-5 h-5 text-bd-cyan" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-cyan transition-colors">SDK</h4>
                </div>
                <p class="text-bd-text-muted">Version + sanitized config introspection. Adapt your scenario to the player's setup.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=clock" class="block p-4 rounded-lg bg-gradient-to-br from-bd-amber/10 to-transparent border border-bd-amber/30 hover:border-bd-amber/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <Clock class="w-5 h-5 text-bd-amber" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-amber transition-colors">Clock</h4>
                </div>
                <p class="text-bd-text-muted">Real-world time, timezone, and formatting helpers for time-of-day-aware scenes.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=weather" class="block p-4 rounded-lg bg-gradient-to-br from-bd-cyan/10 to-transparent border border-bd-cyan/30 hover:border-bd-cyan/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <CloudSun class="w-5 h-5 text-bd-cyan" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-cyan transition-colors">Weather</h4>
                </div>
                <p class="text-bd-text-muted">Open-Meteo current conditions and forecasts for weather-reactive scenarios.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=network" class="block p-4 rounded-lg bg-gradient-to-br from-bd-green/10 to-transparent border border-bd-green/30 hover:border-bd-green/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <Wifi class="w-5 h-5 text-bd-green" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-green transition-colors">Network</h4>
                </div>
                <p class="text-bd-text-muted">Online state and connection hints for graceful offline fallbacks.</p>
              </router-link>

              <router-link to="/ultrascripts?tab=system" class="block p-4 rounded-lg bg-gradient-to-br from-bd-purple/10 to-transparent border border-bd-purple/30 hover:border-bd-purple/50 transition-colors group">
                <div class="flex items-center gap-2 mb-1.5">
                  <Cpu class="w-5 h-5 text-bd-purple" />
                  <h4 class="font-semibold text-bd-text-primary group-hover:text-bd-purple transition-colors">System</h4>
                </div>
                <p class="text-bd-text-muted">Device, display, locale, and battery hints &mdash; for platform-adaptive widget layouts.</p>
              </router-link>
            </div>
          </div>
        </Transition>
      </section>


    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { 
  Sparkles, LayoutDashboard, Globe, Cpu, Layers, GitMerge, 
  ShieldCheck, Monitor, BookOpen, Terminal, Wrench, Lock,
  ArrowUpFromLine, ArrowDownToLine, HeartPulse, Settings,
  CheckCircle2, AlertTriangle, ChevronDown, ChevronUp,
  BrainCircuit, Clock, CloudSun, Wifi, Zap
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Platform Overview', isHeader: true },
  { id: 'what-is', label: 'What Is Ultrascripts' },
  { id: 'how-to-read', label: 'How To Use These Docs' },
  { id: 'transport', label: 'Story Card Transport' },
  { id: 'header-safety', label: 'Safety & Platforms', isHeader: true },
  { id: 'security', label: 'Security & Consent' },
  { id: 'platforms', label: 'Platform Support' },
  { id: 'header-guides', label: 'Module Guides', isHeader: true },
  { id: 'deep-dives', label: 'Deep-Dive Guides' }
]

// Track which guide sections are expanded (all expanded by default)
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

