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

      <!-- ===================== THE SCRIPTURE WIDGET ENGINE ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5 text-bd-green" />
            The Scripture Widget Engine
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Scripture is Ultrascripts' core <strong>state module</strong> designed to render dynamic, responsive, and beautiful widget user interfaces directly inside the BetterDungeon sidebar. Instead of hacking custom HTML into prompt fields or outputs, scenario scripts publish raw JSON definitions into a dedicated state card, which the extension compiles into a professional and responsive layout.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-green" />
                  What It Renders
                </h3>
                <p class="text-bd-text-secondary">
                  Stat bars, progress grids, checkable lists, badges, toggles, text fields, and custom HTML sections arranged dynamically.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Code class="w-4 h-4 text-bd-blue" />
                  How It Binds
                </h3>
                <p class="text-bd-text-secondary">
                  Variables bind directly to sandbox <strong>state</strong> updates, writing structure changes on turn boundaries for seamless UI refresh.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Monitor class="w-4 h-4 text-bd-purple" />
                  Where It Displays
                </h3>
                <p class="text-bd-text-secondary">
                  Directly inside the BetterDungeon UI overlay sidebar. Free from AI Dungeon's DOM overrides and safe from page styling updates.
                </p>
              </div>
            </div>

            <!-- Pattern Explanation -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 text-xs">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Palette class="w-4 h-4 text-bd-green" />
                The State-Card Architecture Pattern
              </h3>
              <p class="text-bd-text-secondary">
                To trigger the widget engine, scripts write structured JSON data into a Story Card titled <strong>ultrascripts:state:scripture</strong>. BetterDungeon watches for changes to this card's contents. Because it declares <code class="text-bd-green">tracksLiveCount: true</code>, the extension selectively displays the widgets associated with the player's current action (the active turn counter), reconciling UI updates instantly on undo, redo, and generation retries.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WRITING WIDGET DEFINITIONS ===================== -->
      <section id="guide-definitions" class="card">
        <button
          @click="toggleGuideSection('definitions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code class="w-5 h-5 text-bd-blue" />
            Writing Widget Definitions
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('definitions') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('definitions')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              To declare widgets, assemble a JSON object detailing the widget layout and properties. The root envelope maps turns or live actions to individual lists of widgets.
            </p>

            <div class="space-y-4">
              <h3 class="font-semibold text-bd-text-primary">First-Party Widget Types &amp; Attributes</h3>
              <div class="grid md:grid-cols-2 gap-3 text-[11px]">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                  <strong class="text-bd-green">stat-bar</strong>
                  <p class="text-bd-text-muted">A beautiful progress bar. Configured with <code>label</code>, <code>value</code>, <code>max</code>, and CSS <code>color</code>.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                  <strong class="text-bd-blue">text</strong>
                  <p class="text-bd-text-muted">Descriptive labels or status readouts. Takes <code>label</code> and <code>value</code> properties.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-purple">
                  <strong class="text-bd-purple">badge-list</strong>
                  <p class="text-bd-text-muted">A row of colored pill badges. Takes an array of <code>badges</code> with text and colors.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber">
                  <strong class="text-bd-amber">checklist</strong>
                  <p class="text-bd-text-muted">Checkable quest objectives or achievements. Takes an array of items with <code>id</code>, <code>label</code>, and <code>checked</code>.</p>
                </div>
              </div>
            </div>

            <!-- Complete Library Script Code Block -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary">Library Script - Core State Card Publisher</h4>
              <p class="text-[11px] text-bd-text-secondary mb-2">
                Use the following template in your <strong>Library script</strong> to instantiate the payload envelope and easily write or update Scripture widgets during turn progression.
              </p>
              <pre class="p-3 rounded bg-bd-bg-primary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
var bd = state.bd;

// Initialize Scripture payload
bd.scripturePayload = bd.scripturePayload || {
  history: {}
};

// Main utility to publish dynamic widgets
bd.publishWidgets = function(widgetsList) {
  var lc = (info && info.actionCount) || 1;
  
  // Bind widgets list to current action count
  bd.scripturePayload.history[lc] = {
    widgets: widgetsList
  };

  // Find or create state card and update its content
  var cardTitle = 'ultrascripts:state:scripture';
  var updated = false;
  var cards = Array.isArray(storyCards) ? storyCards : [];
  
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] && cards[i].title === cardTitle) {
      cards[i].value = JSON.stringify(bd.scripturePayload);
      updated = true;
      break;
    }
  }

  if (!updated) {
    addStoryCard(cardTitle, JSON.stringify(bd.scripturePayload));
  }
};</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== LIVE RECIPES & BOILERPLATE ===================== -->
      <section id="guide-recipes" class="card">
        <button
          @click="toggleGuideSection('recipes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Live Recipes &amp; Boilerplate
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Import these complete, copy-paste-ready recipes to inject highly polished displays into your scenarios immediately.
            </p>

            <!-- Recipe 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-3">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 text-xs">
                <Sparkles class="w-4 h-4" /> Recipe 1: Dynamic HP &amp; Mana Stats HUD
              </h4>
              <p>
                Perfect for RPGs. Triggers during the <strong>Context Modifier</strong>, mapping the player's core attributes directly to reactive bars in the sidebar.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  state.hp = state.hp !== undefined ? state.hp : 80;
  state.mana = state.mana !== undefined ? state.mana : 35;
  state.location = state.location || 'Echoing Caverns';

  // Build HUD widgets
  var statsWidgets = [
    {
      type: 'stat-bar',
      label: 'Health Points',
      value: state.hp,
      max: 100,
      color: '#22c55e' // Vibrant green
    },
    {
      type: 'stat-bar',
      label: 'Mana Points',
      value: state.mana,
      max: 50,
      color: '#3b82f6' // Sleek blue
    },
    {
      type: 'text',
      label: 'Current Region',
      value: state.location
    }
  ];

  // Publish using our library helper
  if (state.bd && typeof state.bd.publishWidgets === 'function') {
    state.bd.publishWidgets(statsWidgets);
  }
})();</pre>
            </div>

            <!-- Recipe 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-3">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 text-xs">
                <Layers class="w-4 h-4" /> Recipe 2: Quest Tracker Checklist
              </h4>
              <p>
                Keep track of main scenario goals and optional tasks. Checkboxes update dynamically as goals are met.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  state.quests = state.quests || [
    { id: 'q1', label: 'Retrieve the Amber Relic', checked: false },
    { id: 'q2', label: 'Locate the hidden trapdoor', checked: true },
    { id: 'q3', label: 'Survive the goblin ambush', checked: false }
  ];

  var questWidgets = [
    {
      type: 'text',
      label: 'Active Objectives',
      value: 'Complete tasks to progress'
    },
    {
      type: 'checklist',
      id: 'active-objectives',
      items: state.quests
    }
  ];

  if (state.bd && typeof state.bd.publishWidgets === 'function') {
    state.bd.publishWidgets(questWidgets);
  }
})();</pre>
            </div>

            <!-- Recipe 3 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-3">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-xs">
                <Palette class="w-4 h-4" /> Recipe 3: Character Status &amp; Equipment Dashboard
              </h4>
              <p>
                Displays comprehensive statistics, character class status, level progress, and active equipment slots.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  state.level = state.level || 4;
  state.xp = state.xp || 420;
  state.xpMax = 1000;
  state.weapon = state.weapon || 'Steel Broadsword';
  state.shield = state.shield || 'Iron Buckler';

  var dashboardWidgets = [
    {
      type: 'badge-list',
      badges: [
        { text: 'Level ' + state.level, color: '#f59e0b' },
        { text: 'Fighter', color: '#a855f7' }
      ]
    },
    {
      type: 'stat-bar',
      label: 'Experience Progress',
      value: state.xp,
      max: state.xpMax,
      color: '#eab308' // Gold
    },
    {
      type: 'text',
      label: 'Active Weapon',
      value: state.weapon
    },
    {
      type: 'text',
      label: 'Active Shield',
      value: state.shield
    }
  ];

  if (state.bd && typeof state.bd.publishWidgets === 'function') {
    state.bd.publishWidgets(dashboardWidgets);
  }
})();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DISPLAY CONFIGURATION ===================== -->
      <section id="guide-display-config" class="card">
        <button
          @click="toggleGuideSection('display-config')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Settings class="w-5 h-5 text-bd-purple" />
            Display Configuration &amp; Styling
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('display-config') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('display-config')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              BetterDungeon allows players to fine-tune how the Scripture pane looks, adapting the widget deck to their monitor and preferred visual layout. Authors should design their widget structures with these configuration parameters in mind.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Display Size</strong>
                <p class="text-bd-text-muted">Compact, Normal, Comfortable, or Large. Adjusts font sizing, paddings, and layout spacing globally.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Max Height Caps</strong>
                <p class="text-bd-text-muted">Short, Medium, or Tall. Restricts vertical space with scrollbars to prevent UI creep over story content.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Grid Layouts</strong>
                <p class="text-bd-text-muted">Balanced or Stacked. Balanced splits fields side-by-side, while Stacked lists items in a unified column.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-bd-text-secondary text-[11px]">
              <strong>Design Advice for Scenario Authors:</strong>
              <ul class="list-disc pl-4 mt-1.5 space-y-1">
                <li>Keep lists clean. Avoid rendering more than 6 total widgets at any given turn.</li>
                <li>Write short widget labels. Long labels can truncate or force awkward line-breaks on small screens.</li>
                <li>Design with responsive layouts in mind. Test your widget definitions on both desktop and mobile modes to ensure perfect visibility.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SCRIPTURE TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Scripture Troubleshooting
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-xs text-bd-text-secondary">
              Avoid these common implementation gotchas when developing with the Scripture widget system.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Invalid JSON Crashes
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Stringifying circular references or inserting raw strings into card values causes card deserialization to fail.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Wrap your payload assignments inside standard try/catch blocks and always use <code>JSON.stringify()</code> before pushing to Story Cards.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Widgets Fail to Rerender
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Writing widgets inside <code>onModelContext</code> but forgetting to link the updates to the active turn action count.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Always keys the widgets history list by <code>info.actionCount</code>. Scripture uses this key to check and render the current turn.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Overflow &amp; Styling Creep
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Adding vast amounts of data or countless progress bars causes the sidebar panel to overflow awkwardly.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Group secondary stats under sub-sections and utilize badge-lists to keep secondary stats compact and scannable.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> State Rewind Breaks Display
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Performing an Undo doesn't rewind custom global variables, causing mismatching UI state readouts.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Use the <code>tracksLiveCount</code> pattern. By saving UI state inside the historical turn array, BetterDungeon automatically restores the correct layout on Undo/Redo.
                </p>
              </div>
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
  ChevronDown, ChevronUp, LayoutDashboard, Code, Rocket, Settings, 
  AlertTriangle, Monitor, Palette, Layers, Wrench, X, Sparkles
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Widget System', isHeader: true },
  { id: 'what-is', label: 'The Widget Engine' },
  { id: 'definitions', label: 'Writing Widget Definitions' },
  { id: 'header-recipes', label: 'Recipes', isHeader: true },
  { id: 'recipes', label: 'Live Recipes & Boilerplate' },
  { id: 'display-config', label: 'Display Configuration' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Scripture Troubleshooting' }
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
