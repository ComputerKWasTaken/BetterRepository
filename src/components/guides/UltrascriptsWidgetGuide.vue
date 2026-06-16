<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
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

    <!-- Main Content -->
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
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon/tree/two-way-communication/modules/widget" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Runtime source
        </a>
      </div>

      <!-- ===================== WHAT IT IS ===================== -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5 text-bd-green" />
            The Widget Engine
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              <strong>Widget</strong> is Ultrascripts' canonical <em>state module</em>. It renders live, responsive UI widgets &mdash; HP bars, stat grids,
              quest lists, badge rows, journal panels, inventory lists &mdash; inside the BetterDungeon sidebar. Scenarios <em>publish</em> structured JSON to a
              single reserved Story Card; the extension does all the rendering.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Layers class="w-4 h-4 text-bd-green" /> What it renders
                </h3>
                <p class="text-[11px]">Stats, bars, progress meters, text rows, tag groups, lists, panels, counters, inputs, buttons, toggles, and custom HTML blocks.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Code class="w-4 h-4 text-bd-blue" /> How it binds
                </h3>
                <p class="text-[11px]">Variables bind to sandbox <code>state</code> on turn boundaries. Widget refreshes every time the live count changes &mdash; including on undo/redo/retry.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-[12px]">
                  <Monitor class="w-4 h-4 text-bd-purple" /> Where it displays
                </h3>
                <p class="text-[11px]">In the BetterDungeon sidebar &mdash; not in the prompt or output. Free from AI Dungeon's DOM and immune to model-side formatting drift.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">The contract in one sentence</h4>
              <p class="text-[11px]">
                Write a JSON object to <code class="text-bd-green">ultrascripts:state:widget</code> that contains
                a <strong>manifest</strong> describing your widgets once, and a <strong>history</strong> map giving the values for each turn keyed by live count.
                Widget handles the rest.
              </p>
            </div>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">1. Choose widgets</h4>
                <p class="text-[11px] text-bd-text-muted">Pick display widgets for things players should track at a glance: bars, stats, panels, tags, lists, or counters.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">2. Define the manifest</h4>
                <p class="text-[11px] text-bd-text-muted">Put stable widget ids and configuration in Library with <code>bd.us.defineWidget(...)</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">3. Publish values</h4>
                <p class="text-[11px] text-bd-text-muted">From Context, call <code>bd.us.publishWidget(...)</code> with values from plain serializable <code>state</code>.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PAYLOAD SHAPE ===================== -->
      <section id="guide-shape" class="card">
        <button @click="toggleGuideSection('shape')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileCode class="w-5 h-5 text-bd-blue" />
            Payload Shape: Manifest &amp; History
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('shape') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('shape')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The Widget payload uses a <strong>manifest + history</strong> split. The manifest declares widget definitions <em>once</em>; the history
              holds turn-bound values keyed by live count. This separation is what makes Widget undo-aware.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// ultrascripts:state:widget
{
  "v": 1,
  "manifest": {
    "widgets": [
      { "id": "hp",    "type": "bar",       "label": "Health", "max": 100, "color": "#22c55e" },
      { "id": "mana",  "type": "bar",       "label": "Mana",   "max": 50,  "color": "#3b82f6" },
      { "id": "where", "type": "text",      "label": "Region" },
      { "id": "tags",  "type": "taggroup",  "label": "Status" }
    ]
  },
  "history": {
    "12": { "hp": 80, "mana": 35, "where": "Echoing Caverns", "tags": [{ "text": "Wounded", "color": "#ef4444" }] },
    "13": { "hp": 72, "mana": 22, "where": "Echoing Caverns", "tags": [{ "text": "Wounded", "color": "#ef4444" }, { "text": "Cursed", "color": "#a855f7" }] }
  }
}</pre>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">manifest.widgets[]</h4>
                <p class="text-[11px]">Declared <strong>once</strong>. Each entry has a stable <code>id</code> (referenced by history), a <code>type</code>, and any type-specific
                  configuration (label, color, max, etc.). Adding a widget is just appending one entry.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">history[liveCount]</h4>
                <p class="text-[11px]">A turn snapshot. Keys match the manifest widget ids; values are the data to render this turn (numbers, strings, badge arrays, checked items).</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-semibold text-bd-amber text-[12px] mb-1 flex items-center gap-1.5">
                <GitMerge class="w-4 h-4" /> Live-count fallback rule
              </h4>
              <p class="text-[11px]">
                Widget looks up <code>history[liveCount]</code> first. If that exact key is missing, it falls back to the nearest <em>earlier</em>
                numeric entry, then to the newest available entry. This means: you don't have to write a fresh snapshot every turn if nothing changed.
                Write only when state actually changes.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WIDGET CATALOG ===================== -->
      <section id="guide-catalog" class="card">
        <button @click="toggleGuideSection('catalog')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-amber" />
            Widget Catalog
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('catalog') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('catalog')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- bar -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>bar</code></h4>
                <span class="text-[10px] text-bd-text-muted">Progress meter</span>
              </div>
              <p>A labeled progress bar with optional accent color. Best for HP, mana, XP, stamina, hunger.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// manifest entry
{ "id": "hp", "type": "bar", "label": "Health", "max": 100, "color": "#22c55e" }
// history value
80    // a single number; "value" is shorthand for the current fill</pre>
            </div>

            <!-- text -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>text</code></h4>
                <span class="text-[10px] text-bd-text-muted">Label/value row</span>
              </div>
              <p>A single labeled string. Best for location, weapon name, status, time-of-day.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "where", "type": "text", "label": "Region" }
// history value:  "Echoing Caverns"</pre>
            </div>

            <!-- taggroup -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>taggroup</code></h4>
                <span class="text-[10px] text-bd-text-muted">Pill row</span>
              </div>
              <p>A row of small colored pills. Best for status effects, party traits, faction reputation.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "tags", "type": "taggroup", "label": "Status" }
// history value:
[{ "text": "Wounded", "color": "#ef4444" }, { "text": "Cursed", "color": "#a855f7" }]</pre>
            </div>

            <!-- list -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>list</code></h4>
                <span class="text-[10px] text-bd-text-muted">Quest tracker</span>
              </div>
              <p>Objective rows. Best for quest tracking, scene goals, achievements.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "quests", "type": "list", "label": "Objectives" }
// history value:
[
  { "text": "[ ] Retrieve the Amber Relic" },
  { "text": "[x] Find the hidden trapdoor" }
]</pre>
            </div>

            <!-- panel -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>panel</code></h4>
                <span class="text-[10px] text-bd-text-muted">Stat grid</span>
              </div>
              <p>A compact group of label/value pairs. Best for character sheets and equipment summaries.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "stats", "type": "panel", "title": "Stats" }
// history value:
[
  { "label": "STR", "value": 14 },
  { "label": "DEX", "value": 12 },
  { "label": "INT", "value": 16 }
]</pre>
            </div>

            <!-- inventory list -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-pink text-[13px]"><code>list</code></h4>
                <span class="text-[10px] text-bd-text-muted">Item grid</span>
              </div>
              <p>A compact inventory list. Best for RPG-style item summaries.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "bag", "type": "list", "label": "Bag" }
// history value:
[
  { "text": "Healing Potion x3" },
  { "text": "Iron Key" },
  { "text": "Torch x5" }
]</pre>
            </div>

            <!-- journal -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>custom</code></h4>
                <span class="text-[10px] text-bd-text-muted">Long-form notes</span>
              </div>
              <p>A controlled HTML block for in-character notes, lore entries, or session recaps.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "log", "type": "custom", "label": "Adventure Log" }
// history value: { "html": "&lt;p&gt;Recovered the amber map.&lt;/p&gt;" }</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
              <strong class="text-bd-amber">Design tip:</strong> The first widget in the manifest renders first. Lead with the most-glanced data (HP / location)
              and tuck deep details (stat panels, inventory lists) further down.
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== LIVE COUNT MODEL ===================== -->
      <section id="guide-livecount" class="card">
        <button @click="toggleGuideSection('livecount')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Undo2 class="w-5 h-5 text-bd-blue" />
            Live Count &amp; Undo-Awareness
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('livecount') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('livecount')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Widget is the reference module for the <strong>live count</strong> pattern. It declares <code>tracksLiveCount: true</code>,
              which tells Core to re-render Widget whenever the player's live action count changes &mdash; even if the state card itself was not rewritten.
              That single property is why undo and redo "just work" for HP bars and quest lists.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Undo</h4>
                <p class="text-[11px]">Live count drops. Widget looks up the new (lower) key in <code>history</code> and renders the older snapshot. The bar moves back.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">Redo</h4>
                <p class="text-[11px]">Live count climbs. The newer snapshot key matches; the bar reanimates forward.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Retry</h4>
                <p class="text-[11px]">Tail changes but live count holds. Widget stays put &mdash; the current snapshot is still the right one to show.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Rule of thumb for scripts</h4>
              <p class="text-[11px]">
                Always write the <em>current turn's</em> snapshot under the current <code>info.actionCount</code>. Never overwrite
                older history entries &mdash; they are the player's path through undo. The history map is append-only from the script's perspective.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== LIBRARY HELPERS ===================== -->
      <section id="guide-helpers" class="card">
        <button @click="toggleGuideSection('helpers')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-amber" />
            Library Helpers
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('helpers') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('helpers')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Use the <code>bd.us</code> helper from Quick Start instead of maintaining a second Widget helper here. Declare the manifest with
              <code>bd.us.defineWidget(...)</code>, then publish each turn with <code>bd.us.publishWidget(...)</code>.
            </p>
            <p class="text-[11px] text-bd-text-muted">
              This keeps all card I/O, history keys, and interaction acks in one reviewed SDK path instead of teaching authors a second raw-card pattern.
            </p>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button @click="toggleGuideSection('recipes')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Usage Patterns
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- Pattern 1: HP/Mana HUD -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-[12px]">
                <Sparkles class="w-4 h-4" /> Pattern 1: HP / Mana / Region HUD
              </h4>
              <p>The classic RPG sidebar. Combined with the library helper above, this is two lines of code per turn.</p>
              <p class="text-[11px] text-bd-text-muted">
                Keep this as a manifest plus value-shape idea: bars for health/mana, text for location, and a taggroup for status effects.
                Quick Start shows the runnable HP bar version.
              </p>
            </div>

            <!-- Pattern 2: Quest Tracker -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-[12px]">
                <Layers class="w-4 h-4" /> Pattern 2: Quest Tracker Checklist
              </h4>
              <p>Replace the manifest above with a focused quest-tracker manifest.</p>
              <p class="text-[11px] text-bd-text-muted">
                Use a <code>list</code> widget for objectives. Store the quest array as plain data on <code>state.quests</code>, then publish it
                through <code>bd.us.publishWidget({ quests: state.quests })</code>.
              </p>
            </div>

            <!-- Pattern 3: Character Dashboard -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-[12px]">
                <Palette class="w-4 h-4" /> Pattern 3: Character Sheet Dashboard
              </h4>
              <p>Combines tag groups, bars, panels, and text into one rich sheet.</p>
              <p class="text-[11px] text-bd-text-muted">
                Combine <code>taggroup</code>, <code>bar</code>, <code>panel</code>, and <code>text</code> widgets, but publish through the
                Quick Start helper so history and current live-count behavior stay consistent.
              </p>
            </div>

            <!-- Pattern 4: Inventory + Journal -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <h4 class="font-semibold text-bd-pink flex items-center gap-1.5 text-[12px]">
                <BookOpen class="w-4 h-4" /> Pattern 4: Inventory + Adventure Log
              </h4>
              <p>Two heavier widgets together. Use sparingly &mdash; this is the upper bound of what fits comfortably in the sidebar.</p>
              <p class="text-[11px] text-bd-text-muted">
                Use <code>list</code> for compact inventory data and <code>custom</code> only when you need controlled HTML. Keep large journals
                pruned so the state card stays small.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== INTERACTION EVENTS ===================== -->
      <section id="guide-interactions" class="card">
        <button @click="toggleGuideSection('interactions')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowDownToLine class="w-5 h-5 text-bd-cyan" />
            Widget Interaction Events
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('interactions') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('interactions')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Some widgets are interactive in the sidebar &mdash; the player can flip a toggle, click a button, or edit an input. When that
              happens, BetterDungeon writes the event into <code class="text-bd-green">ultrascripts:in:widget</code> for the script to read on its next turn.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// ultrascripts:in:widget  (extension writes when a widget is interacted with)
{
  "v": 1,
  "widgetEvents": {
    "v": 1,
    "module": "widget",
    "latestSeq": 4,
    "ackSeq": 3,
    "liveCount": 13,
    "events": [
      {
        "id": "widget-4",
        "seq": 4,
        "widgetId": "questComplete",
        "widgetType": "toggle",
        "action": "change",
        "value": true,
        "liveCount": 13
      }
    ]
  }
}</pre>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Consuming the events</h4>
              <p class="text-[11px]">
                On the next modifier pass, parse <code>ultrascripts:in:widget</code>, apply events to <code>state</code>, and write the highest handled
                <code>seq</code> to <code>ultrascripts:state:widget.interactions.ackSeq</code>. The extension prunes acked events so the
                card stays lean.
              </p>
            </div>

            <p class="text-[11px] text-bd-text-muted">
              In helper-based scripts, use <code>bd.us.widgetEvents()</code> to read unacked events and <code>bd.us.ackWidget(seq)</code>
              after applying each event to plain scenario state.
            </p>
          </div>
        </Transition>
      </section>

      <!-- ===================== DISPLAY BEHAVIOR ===================== -->
      <section id="guide-display" class="card">
        <button @click="toggleGuideSection('display')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Settings class="w-5 h-5 text-bd-purple" />
            Responsive Display Behavior
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('display') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('display')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Widget adapts automatically to the available story area. On narrow screens it stacks zones into a single column, tightens spacing,
              and scrolls the widget bar when the published manifest needs more vertical room.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Density</strong>
                <p class="text-bd-text-muted">Crowded bars compact automatically based on real widget width.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Mobile</strong>
                <p class="text-bd-text-muted">Narrow screens use a single-column layout with wrapped zones.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Overflow</strong>
                <p class="text-bd-text-muted">The widget area keeps a vertical cap and scrolls when needed.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-semibold text-bd-amber text-[12px] mb-1">Design advice</h4>
              <ul class="space-y-0.5 text-[11px]">
                <li>&middot; Keep each turn's payload <strong>6 widgets or fewer</strong> for the best first impression.</li>
                <li>&middot; Use short labels and values so mobile layouts stay readable.</li>
                <li>&middot; If you publish heavy widgets (<code>list</code>, <code>custom</code>), trim the rest of the manifest accordingly.</li>
                <li>&middot; Test your scenario on both desktop and a narrow/mobile viewport before shipping.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== AUTHORING TIPS ===================== -->
      <section id="guide-tips" class="card">
        <button @click="toggleGuideSection('tips')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Authoring Tips
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tips') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('tips')" class="mt-4 space-y-3 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1.5">
                <h4 class="font-semibold text-bd-green text-[12px] flex items-center gap-1.5">
                  <Check class="w-4 h-4" /> Do
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Declare the manifest <strong>once</strong> in your Library script.</li>
                  <li>&middot; Key history entries by <code>info.actionCount</code> every turn.</li>
                  <li>&middot; Skip writes when state hasn't changed &mdash; the fallback rule will keep the bar steady.</li>
                  <li>&middot; Acknowledge widget interaction events promptly so the response card stays small.</li>
                  <li>&middot; Use semantic <code>id</code>s in the manifest (<code>hp</code>, not <code>w1</code>) for readable debugging.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1.5">
                <h4 class="font-semibold text-bd-pink text-[12px] flex items-center gap-1.5">
                  <X class="w-4 h-4" /> Avoid
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Putting widget definitions in every <code>history</code> entry &mdash; that's what the manifest is for.</li>
                  <li>&middot; Overwriting <em>older</em> history entries; that breaks undo replay.</li>
                  <li>&middot; Rendering more than ~6 widgets per turn &mdash; the sidebar overflows.</li>
                  <li>&middot; Skipping the <code>v: 1</code> protocol marker.</li>
                  <li>&middot; Reading the widget card from another module &mdash; it's owned by Widget.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Troubleshooting
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Widget never appears</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Card is written but nothing renders.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Check that <code>v: 1</code> is set, the title is exactly <code>ultrascripts:state:widget</code>, and the Widget toggle is on in the popup.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Bars don't update</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Values change but the sidebar is frozen.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Ensure the new snapshot is written under the <em>current</em> <code>info.actionCount</code>. Older keys are static history.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Undo shows wrong state</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Undo restores narration but the HP bar holds the newer value.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> You probably re-wrote an old history key. Don't overwrite past entries; only add new ones for the current turn.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Invalid JSON crash</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> The card value is not valid JSON.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Always wrap the value in <code>JSON.stringify()</code>. Avoid circular references in <code>state</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Interaction not acked</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> The same widget event keeps appearing each turn.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Write the highest handled event <code>seq</code> to <code>ultrascripts:state:widget.interactions.ackSeq</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">History grows forever</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Card grows large over a long adventure.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Let <code>bd.us.publishWidget(...)</code> own the Widget history path, and prune old history entries if a scenario publishes large snapshots.</p>
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
  ChevronDown, ChevronUp, LayoutDashboard, FileCode, Layers, Undo2,
  Wrench, Rocket, ArrowDownToLine, Settings, Lightbulb, AlertTriangle,
  Code, Monitor, GitMerge, Sparkles, Palette, BookOpen, Check, X,
  Zap, ArrowRight
} from 'lucide-vue-next'

// Sections ordered: orient -> reference -> behavior -> usage -> debug.
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'What Widget Is' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'shape', label: 'Payload Shape' },
  { id: 'catalog', label: 'Widget Catalog' },
  { id: 'header-behavior', label: 'Behavior', isHeader: true },
  { id: 'livecount', label: 'Live Count Model' },
  { id: 'interactions', label: 'Interaction Events' },
  { id: 'display', label: 'Display Behavior' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'helpers', label: 'Library Helpers' },
  { id: 'recipes', label: 'Usage Patterns' },
  { id: 'tips', label: 'Authoring Tips' },
  { id: 'pitfalls', label: 'Troubleshooting' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => {
  if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id)
  else expandedGuideSections.value.add(id)
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(id)) {
      expandedGuideSections.value.add(id)
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
