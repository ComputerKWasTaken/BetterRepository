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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><LayoutDashboard class="w-5 h-5 text-bd-green" />What Is the Widget Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              <strong>Widget</strong> is Ultrascripts' canonical <em>state module</em>. It renders live, responsive UI widgets &mdash; HP bars, stat grids,
              quest lists, badge rows, journal panels, inventory lists &mdash; inside the BetterDungeon sidebar. Scenarios <em>publish</em> structured JSON to a
              single reserved Story Card; the extension does all the rendering.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Renders</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Bars (HP, mana, XP)</li>
                  <li>&middot; Text rows (location, status)</li>
                  <li>&middot; Tag groups (status effects)</li>
                  <li>&middot; Lists (quests, inventory)</li>
                  <li>&middot; Panels (stat grids)</li>
                  <li>&middot; Counters</li>
                  <li>&middot; Toggles, buttons, inputs</li>
                  <li>&middot; Custom HTML blocks</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Persistent HUD for RPG stats</li>
                  <li>&middot; Quest tracker checklists</li>
                  <li>&middot; Character sheet dashboard</li>
                  <li>&middot; Inventory display</li>
                  <li>&middot; Interactive controls</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; State module &mdash; no ops to call</li>
                  <li>&middot; Manifest + history split</li>
                  <li>&middot; Undo-aware via live count</li>
                  <li>&middot; Renders in BetterDungeon sidebar</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">The contract in one sentence</h4>
              <p class="text-[11px] text-bd-text-secondary">
                Write a JSON object to <code class="text-bd-green">ultrascripts:state:widget</code> that contains
                a <strong>manifest</strong> describing your widgets once, and a <strong>history</strong> map giving the values for each turn keyed by live count.
                Widget handles the rest.
              </p>
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
            <p class="text-bd-text-secondary">Three steps to render a live HUD in the BetterDungeon sidebar.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Define the manifest once</h4>
                <p class="text-xs text-bd-text-secondary">In your Library script, call <code class="text-bd-green">bd.us.defineWidget({ widgets: [...] })</code> with stable widget ids and types. This is declared once and reused every turn.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Publish values each turn</h4>
                <p class="text-xs text-bd-text-secondary">From Context, call <code class="text-bd-green">bd.us.publishWidget({ hp: state.hp, mana: state.mana, ... })</code>. The helper keys the snapshot by the current live count automatically.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Skip writes when nothing changed</h4>
                <p class="text-xs text-bd-text-secondary">Widget falls back to the nearest earlier history entry if the current live count is missing. Only write when state actually changes.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY: PAYLOAD SHAPE ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><FileCode class="w-5 h-5 text-bd-blue" />Payload Shape: Manifest &amp; History</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
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
    "12": { "hp": 80, "mana": 35, "where": "Echoing Caverns", "tags": { "items": [{ "text": "Wounded", "color": "#ef4444" }] } },
    "13": { "hp": 72, "mana": 22, "where": "Echoing Caverns", "tags": { "items": [{ "text": "Wounded", "color": "#ef4444" }, { "text": "Cursed", "color": "#a855f7" }] } }
  }
}</pre>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">manifest.widgets[]</h4>
                <p class="text-[11px] text-bd-text-muted">Declared <strong>once</strong>. Each entry has a stable <code>id</code> (referenced by history), a <code>type</code>, and any type-specific configuration (label, color, max, etc.).</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">history[liveCount]</h4>
                <p class="text-[11px] text-bd-text-muted">A turn snapshot. Keys match the manifest widget ids; values are the data to render this turn.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-semibold text-bd-amber text-[12px] mb-1 flex items-center gap-1.5">
                <GitMerge class="w-4 h-4" /> Live-count fallback rule
              </h4>
              <p class="text-[11px] text-bd-text-secondary">
                Widget looks up <code>history[liveCount]</code> first. If that exact key is missing, it falls back to the nearest <em>earlier</em>
                numeric entry, then to the newest available entry. Write only when state actually changes.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY: WIDGET CATALOG ===================== -->
      <section id="guide-catalog" class="card">
        <button @click="toggleGuideSection('catalog')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-amber" />Widget Catalog</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('catalog') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('catalog')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">All widget types supported by the Widget module. Each entry shows the manifest declaration and the history value shape.</p>

            <!-- stat -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>stat</code></h4>
                <span class="text-[10px] text-bd-text-muted">Labeled value</span>
              </div>
              <p>Single labeled value with optional color. Best for HP/MP as text, level, score, or any single prominent stat.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "level", "type": "stat", "label": "Level", "color": "#60a5fa" }
// history value:  12    // string or number</pre>
            </div>

            <!-- bar -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>bar</code></h4>
                <span class="text-[10px] text-bd-text-muted">Progress meter</span>
              </div>
              <p>Labeled progress bar with optional accent color. Best for HP, mana, XP, stamina, hunger.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// manifest
{ "id": "hp", "type": "bar", "label": "Health", "max": 100, "color": "#22c55e" }
// history value
80    // number; shorthand for current fill</pre>
            </div>

            <!-- text -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>text</code></h4>
                <span class="text-[10px] text-bd-text-muted">Label/value row</span>
              </div>
              <p>Single labeled string. Best for location, weapon name, status, time-of-day.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "where", "type": "text", "label": "Region" }
// history value:  "Echoing Caverns"</pre>
            </div>

            <!-- badge -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-pink text-[13px]"><code>badge</code></h4>
                <span class="text-[10px] text-bd-text-muted">Status pill</span>
              </div>
              <p>Small colored badge with text and optional variant. Best for rarity tags, role labels, or quick status indicators.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "rarity", "type": "badge", "label": "Rarity", "color": "#a855f7" }
// history value:  { "text": "Legendary", "color": "#a855f7" }</pre>
            </div>

            <!-- icon -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>icon</code></h4>
                <span class="text-[10px] text-bd-text-muted">Icon + label</span>
              </div>
              <p>Emoji or icon character with optional text. Best for character portraits, weather indicators, or compact visual cues.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "hero", "type": "icon", "label": "Class" }
// history value:  { "icon": "&trade;", "text": "Warrior", "color": "#f59e0b" }</pre>
            </div>

            <!-- taggroup -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>taggroup</code></h4>
                <span class="text-[10px] text-bd-text-muted">Pill row</span>
              </div>
              <p>Row of small colored pills. Best for status effects, party traits, faction reputation.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "tags", "type": "taggroup", "label": "Status" }
// history value:
{ "items": [{ "text": "Wounded", "color": "#ef4444" }, { "text": "Cursed", "color": "#a855f7" }] }</pre>
            </div>

            <!-- list -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>list</code></h4>
                <span class="text-[10px] text-bd-text-muted">Row list</span>
              </div>
              <p>Objective or item rows. Best for quest tracking, scene goals, inventory summaries.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "quests", "type": "list", "label": "Objectives" }
// history value:
[
  { "text": "[ ] Retrieve the Amber Relic" },
  { "text": "[x] Find the hidden trapdoor" }
]</pre>
            </div>

            <!-- panel -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>panel</code></h4>
                <span class="text-[10px] text-bd-text-muted">Stat grid</span>
              </div>
              <p>Compact group of label/value pairs. Best for character sheets and equipment summaries.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "stats", "type": "panel", "title": "Stats" }
// history value:
[
  { "label": "STR", "value": 14 },
  { "label": "DEX", "value": 12 },
  { "label": "INT", "value": 16 }
]</pre>
            </div>

            <!-- counter -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>counter</code></h4>
                <span class="text-[10px] text-bd-text-muted">Big number</span>
              </div>
              <p>Large prominent number with optional label. Best for gold, kills, turns remaining, score.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "gold", "type": "counter", "label": "Gold" }
// history value:  1245</pre>
            </div>

            <!-- toggle -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>toggle</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>On/off switch. Player clicks to flip; event arrives in <code>ultrascripts:in:widget</code>.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "stealth", "type": "toggle", "label": "Stealth Mode" }
// history value:  true    // boolean</pre>
            </div>

            <!-- button -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>button</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Clickable action button. Player clicks to trigger an event; script reads it next turn.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "rest", "type": "button", "label": "Rest" }
// history value:  null    // buttons are stateless; the click is the event</pre>
            </div>

            <!-- input -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>input</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Text input field. Player types and submits; the typed value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "note", "type": "input", "label": "Quick Note", "placeholder": "Type here..." }
// history value:  "current text"    // string</pre>
            </div>

            <!-- custom -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-pink text-[13px]"><code>custom</code></h4>
                <span class="text-[10px] text-bd-text-muted">HTML block</span>
              </div>
              <p>Controlled HTML block for in-character notes, lore entries, or session recaps. HTML is sanitized.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "log", "type": "custom", "label": "Adventure Log" }
// history value: { "html": "&lt;p&gt;Recovered the amber map.&lt;/p&gt;" }</pre>
            </div>

            <!-- progress -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>progress</code></h4>
                <span class="text-[10px] text-bd-text-muted">Progress arc</span>
              </div>
              <p>Linear progress indicator with value/max. Best for quest completion, loading states, or chapter progress.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "quest", "type": "progress", "label": "Quest", "max": 100, "color": "#22c55e" }
// history value:  65    // number</pre>
            </div>

            <!-- divider -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-text-muted text-[13px]"><code>divider</code></h4>
                <span class="text-[10px] text-bd-text-muted">Separator</span>
              </div>
              <p>Visual separator with optional label. Best for grouping widgets into sections within a dashboard.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "sep", "type": "divider" }
// history value:  (none &mdash; divider is static)</pre>
            </div>

            <!-- select -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>select</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Dropdown picker. Player selects one option; the chosen value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "mode", "type": "select", "label": "Mode",
  "options": [{ "value": "auto", "label": "Auto" }, { "value": "manual", "label": "Manual" }] }
// history value:  "manual"    // matches one option value</pre>
            </div>

            <!-- slider -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>slider</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Range slider. Player drags to pick a number; the value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "volume", "type": "slider", "label": "Volume", "min": 0, "max": 100, "step": 1 }
// history value:  70    // number</pre>
            </div>

            <!-- textarea -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>textarea</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Multi-line text input. Player types longer text; the value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "bio", "type": "textarea", "label": "Character Bio", "rows": 4 }
// history value:  "A knight from the northern reach."    // string</pre>
            </div>

            <!-- radio -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-pink text-[13px]"><code>radio</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Radio button group. Player picks one option from a visible list; the value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "stance", "type": "radio", "label": "Stance",
  "options": [{ "value": "aggro", "label": "Aggressive" }, { "value": "def", "label": "Defensive" }] }
// history value:  "def"    // matches one option value</pre>
            </div>

            <!-- stepper -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>stepper</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Numeric stepper with +/&minus; buttons. Player increments or decrements within min/max range.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "level", "type": "stepper", "label": "Level", "min": 1, "max": 99, "step": 1 }
// history value:  12    // number</pre>
            </div>

            <!-- confirm -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>confirm</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Confirm button with idle/confirming states. Player clicks once, then confirms; prevents accidental actions.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "rest", "type": "confirm", "text": "Rest here" }
// history value:  false    // boolean; true after confirmation</pre>
            </div>

            <!-- chipselect -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>chipselect</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
              </div>
              <p>Multi-select chip group. Player toggles multiple chips on/off; the selected values arrive as an array event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "party", "type": "chipselect", "label": "Party",
  "options": [{ "value": "a", "label": "Aldric" }, { "value": "k", "label": "Kira" }] }
// history value:  ["a", "k"]    // array of selected option values</pre>
            </div>

            <!-- accordion -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>accordion</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
                <span class="text-[10px] text-bd-text-muted">container</span>
              </div>
              <p>Collapsible sections. Player expands/collapses panels; the active section id arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "inv", "type": "accordion",
  "items": [{ "id": "weap", "label": "Weapons", "content": "Flame Blade" }] }
// history value:  "weap"    // id of the expanded section</pre>
            </div>

            <!-- tabs -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>tabs</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
                <span class="text-[10px] text-bd-text-muted">container</span>
              </div>
              <p>Tabbed panel. Player clicks a tab to switch content; the active tab id arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "info", "type": "tabs",
  "items": [{ "id": "stats", "label": "Stats", "content": "HP 87/100" }] }
// history value:  "stats"    // id of the active tab</pre>
            </div>

            <!-- dropdown -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-pink text-[13px]"><code>dropdown</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
                <span class="text-[10px] text-bd-text-muted">container</span>
              </div>
              <p>Menu dropdown. Player opens a menu and picks an item; the selected value arrives as an event.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "actions", "type": "dropdown", "label": "Actions",
  "items": [{ "label": "Inspect", "icon": "&trade;" }, { "divider": true }, { "label": "Attack", "danger": true }] }
// history value:  null    // selected item value</pre>
            </div>

            <!-- sortable -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-green text-[13px]"><code>sortable</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-cyan/20 text-bd-cyan">interactive</span>
                <span class="text-[10px] text-bd-text-muted">container</span>
              </div>
              <p>Drag-to-reorder list. Player drags items to reorder; the new order arrives as an array of ids.</p>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{ "id": "prio", "type": "sortable", "label": "Priority",
  "items": [{ "id": "atk", "label": "Attack" }, { "id": "def", "label": "Defend" }] }
// history value:  ["atk", "def"]    // array of item ids in order</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
              <strong class="text-bd-amber">Design tip:</strong> The first widget in the manifest renders first. Lead with the most-glanced data (HP / location)
              and tuck deep details (stat panels, inventory lists) further down.
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using Widget well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Declare the manifest <strong>once</strong> in Library.</li>
                  <li>&middot; Key history entries by <code>info.actionCount</code>.</li>
                  <li>&middot; Skip writes when state hasn't changed.</li>
                  <li>&middot; Ack interaction events promptly.</li>
                  <li>&middot; Use semantic <code>id</code>s (<code>hp</code>, not <code>w1</code>).</li>
                  <li>&middot; Keep widget <code>id</code>s unique.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Putting widget definitions in every history entry.</li>
                  <li>&middot; Overwriting older history entries &mdash; breaks undo.</li>
                  <li>&middot; Rendering more than ~6 widgets per turn.</li>
                  <li>&middot; Reusing the same widget <code>id</code> for multiple entries.</li>
                  <li>&middot; Skipping the <code>v: 1</code> protocol marker.</li>
                  <li>&middot; Reading the widget card from another module.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: LIVE COUNT ===================== -->
      <section id="guide-livecount" class="card">
        <button @click="toggleGuideSection('livecount')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Undo2 class="w-5 h-5 text-bd-blue" />Advanced: Live Count &amp; Undo-Awareness</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('livecount') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('livecount')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Widget is the reference module for the <strong>live count</strong> pattern. It declares <code>tracksLiveCount: true</code>,
              which tells Core to re-render Widget whenever the player's live action count changes &mdash; even if the state card itself was not rewritten.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Undo</h4>
                <p class="text-[11px] text-bd-text-muted">Live count drops. Widget looks up the new (lower) key in <code>history</code> and renders the older snapshot.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">Redo</h4>
                <p class="text-[11px] text-bd-text-muted">Live count climbs. The newer snapshot key matches; the bar reanimates forward.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Retry</h4>
                <p class="text-[11px] text-bd-text-muted">Tail changes but live count holds. Widget stays put &mdash; the current snapshot is still correct.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Rule of thumb</h4>
              <p class="text-[11px] text-bd-text-secondary">
                Always write the <em>current turn's</em> snapshot under the current <code>info.actionCount</code>. Never overwrite
                older history entries &mdash; they are the player's path through undo. The history map is append-only from the script's perspective.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: INTERACTION EVENTS ===================== -->
      <section id="guide-interactions" class="card">
        <button @click="toggleGuideSection('interactions')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ArrowDownToLine class="w-5 h-5 text-bd-cyan" />Advanced: Interaction Events</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('interactions') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('interactions')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
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
              <p class="text-[11px] text-bd-text-secondary">
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

      <!-- ===================== ADVANCED: DISPLAY BEHAVIOR ===================== -->
      <section id="guide-display" class="card">
        <button @click="toggleGuideSection('display')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Settings class="w-5 h-5 text-bd-purple" />Advanced: Responsive Display</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('display') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('display')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
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
                <p class="text-bd-text-muted">Narrow screens use a single-column layout, wrapped zones, and a local collapse control.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Overflow</strong>
                <p class="text-bd-text-muted">The widget area keeps a vertical cap and scrolls when needed.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-semibold text-bd-amber text-[12px] mb-1">Design advice</h4>
              <ul class="space-y-0.5 text-[11px] text-bd-text-secondary">
                <li>&middot; Keep each turn's payload <strong>6 widgets or fewer</strong> for the best first impression.</li>
                <li>&middot; Use short labels and values so mobile layouts stay readable.</li>
                <li>&middot; If you publish heavy widgets (<code>list</code>, <code>custom</code>), trim the rest of the manifest accordingly.</li>
                <li>&middot; Test your scenario on both desktop and a narrow/mobile viewport before shipping.</li>
              </ul>
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the Widget module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Widget never appears</h4>
                <p class="text-bd-text-secondary">Card is written but nothing renders.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Check that <code>v: 1</code> is set, the title is exactly <code>ultrascripts:state:widget</code>, and the Widget toggle is on in the popup.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Bars don't update</h4>
                <p class="text-bd-text-secondary">Values change but the sidebar is frozen.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Ensure the new snapshot is written under the <em>current</em> <code>info.actionCount</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Undo shows wrong state</h4>
                <p class="text-bd-text-secondary">Undo restores narration but the HP bar holds the newer value.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Don't overwrite past entries; only add new ones for the current turn.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Interaction not acked</h4>
                <p class="text-bd-text-secondary">The same widget event keeps appearing each turn.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Write the highest handled event <code>seq</code> to <code>interactions.ackSeq</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Interactive value snaps back</h4>
                <p class="text-bd-text-secondary">The UI accepts a choice, then returns to the old value on the next turn.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Apply each event's <code>value</code> to <code>state</code> before calling <code>bd.us.ackWidget(seq)</code>, then publish that state.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> History grows forever</h4>
                <p class="text-bd-text-secondary">Card grows large over a long adventure.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Let <code>bd.us.publishWidget(...)</code> own the history path, and prune old entries if publishing large snapshots.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts Widget module:
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
  ChevronDown, ChevronUp, LayoutDashboard, FileCode, Layers, Undo2,
  ArrowDownToLine, Settings, AlertTriangle, ShieldCheck,
  GitMerge, Sparkles, Info, Rocket, X, Users, Zap, ArrowRight
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the Widget Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Payload Shape' },
  { id: 'catalog', label: 'Widget Catalog' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'livecount', label: 'Live Count & Undo' },
  { id: 'interactions', label: 'Interaction Events' },
  { id: 'display', label: 'Responsive Display' },
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
