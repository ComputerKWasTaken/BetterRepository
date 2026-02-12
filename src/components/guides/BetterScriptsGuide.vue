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
        <button
          v-for="section in guideSections"
          :key="section.id"
          @click="scrollToGuideSection(section.id)"
          class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary"
          :class="[
            isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted'
          ]"
        >
          {{ section.label }}
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 space-y-4 min-w-0">

      <!-- Introduction -->
      <section id="guide-intro" class="card">
        <button @click="toggleGuideSection('intro')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-emerald" />
            What is BetterScripts?
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('intro')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              <strong>BetterScripts</strong> is a feature of the <strong>BetterDungeon</strong> browser extension that 
              enables AI Dungeon scripts to create <strong>dynamic UI widgets</strong> for displaying game state, 
              statistics, progress bars, and custom content, delivering rich visual feedback that surpasses the 
              limitations of vanilla implementations.
            </p>

            <!-- Visual Flow Diagram -->
            <div class="p-4 rounded-lg bg-bd-emerald/10 border border-bd-emerald/30">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Terminal class="w-4 h-4 text-bd-emerald" />
                How It Works
              </h3>
              <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 justify-center">
                <div class="px-3 py-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-center min-w-[120px]">
                  <div class="text-xs font-semibold text-bd-text-primary">Your Script</div>
                  <div class="text-[10px] text-bd-text-muted mt-0.5">Output Modifier</div>
                </div>
                <ArrowRight class="w-4 h-4 text-bd-emerald hidden sm:block mx-1 flex-shrink-0" />
                <ArrowDown class="w-4 h-4 text-bd-emerald sm:hidden flex-shrink-0" />
                <div class="px-3 py-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-center min-w-[120px]">
                  <div class="text-xs font-semibold text-bd-text-primary">Protocol Tags</div>
                  <div class="text-[10px] text-bd-text-muted mt-0.5 font-mono">[[BD:...:BD]]</div>
                </div>
                <ArrowRight class="w-4 h-4 text-bd-emerald hidden sm:block mx-1 flex-shrink-0" />
                <ArrowDown class="w-4 h-4 text-bd-emerald sm:hidden flex-shrink-0" />
                <div class="px-3 py-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-center min-w-[120px]">
                  <div class="text-xs font-semibold text-bd-text-primary">BetterDungeon</div>
                  <div class="text-[10px] text-bd-text-muted mt-0.5">Parse & Render</div>
                </div>
                <ArrowRight class="w-4 h-4 text-bd-emerald hidden sm:block mx-1 flex-shrink-0" />
                <ArrowDown class="w-4 h-4 text-bd-emerald sm:hidden flex-shrink-0" />
                <div class="px-3 py-2 rounded-lg bg-bd-emerald/20 border border-bd-emerald/40 text-center min-w-[120px]">
                  <div class="text-xs font-semibold text-bd-emerald">UI Widgets</div>
                  <div class="text-[10px] text-bd-text-muted mt-0.5">Visible to Player</div>
                </div>
              </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  What You Can Create
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• HP bars and progress indicators</li>
                  <li>• Character stats and panels</li>
                  <li>• Inventory lists with icons</li>
                  <li>• Status badges and notifications</li>
                  <li>• Custom HTML widgets</li>
                  <li>• Responsive layouts for all devices</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Requirements
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• <strong>BetterDungeon</strong> browser extension</li>
                  <li>• AI Dungeon script with access to output modifier</li>
                  <li>• Basic JavaScript knowledge</li>
                  <li>• Context modifier to strip protocol tags</li>
                </ul>
              </div>
            </div>
            <div class="flex items-center gap-3 flex-wrap">
              <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" class="btn btn-primary text-sm">
                <ExternalLink class="w-4 h-4" />
                Get BetterDungeon
              </a>
              <span class="text-xs text-bd-text-muted">Available for Chrome, Edge, and Firefox</span>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Quick Start -->
      <section id="guide-quick-start" class="card">
        <button @click="toggleGuideSection('quick-start')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-yellow" />
            Quick Start
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Get BetterScripts working in minutes with these three essential steps.
            </p>
            
            <div class="space-y-4">
              <!-- Step 1 -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">1</div>
                  <h3 class="font-semibold text-bd-text-primary">Add Helper Functions to Library</h3>
                </div>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Initialize game state safely</span>
state.game = state.game ?? { hp: 100, gold: 0 };

<span class="text-bd-text-muted">// Helper functions for BetterScripts protocol</span>
function bdMessage(msg) {
  return `[[BD:${JSON.stringify(msg)}:BD]]`;
}

function bdWidget(id, config) {
  return bdMessage({ type: 'widget', widgetId: id, action: 'create', config });
}

function bdDestroy(id) {
  return bdMessage({ type: 'widget', widgetId: id, action: 'destroy' });
}

function bdClearAll() {
  return bdMessage({ type: 'clearAll' });
}</code></pre>
              </div>

              <!-- Step 2 -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">2</div>
                  <h3 class="font-semibold text-bd-text-primary">Strip Protocol Messages in Context Modifier</h3>
                </div>
                <div class="p-3 rounded bg-bd-pink/10 border border-bd-pink/30 mb-2">
                  <p class="text-xs text-bd-text-secondary">
                    <strong class="text-bd-text-primary">Required:</strong> Prevents AI from seeing or repeating protocol tags.
                  </p>
                </div>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-purple">return</span> { text: text.replace(<span class="text-bd-green">/\[\[BD:[\s\S]*?:BD\]\]/g</span>, <span class="text-bd-green">''</span>) };
};
<span class="text-bd-cyan">modifier</span>(text);</code></pre>
              </div>

              <!-- Step 3 -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">3</div>
                  <h3 class="font-semibold text-bd-text-primary">Create Widgets in Output Modifier</h3>
                </div>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// Update game state</span>
  state.game.hp = Math.max(0, state.game.hp - 5);
  state.game.gold += 10;
  
  <span class="text-bd-text-muted">// Create widgets</span>
  <span class="text-bd-purple">let</span> widgets = <span class="text-bd-green">''</span>;
  widgets += bdWidget(<span class="text-bd-green">'hp-bar'</span>, { 
    type: <span class="text-bd-green">'bar'</span>, label: <span class="text-bd-green">'HP'</span>, 
    value: state.game.hp, max: 100, color: <span class="text-bd-green">'#22c55e'</span>,
    align: <span class="text-bd-green">'left'</span>, order: 1
  });
  widgets += bdWidget(<span class="text-bd-green">'gold'</span>, { 
    type: <span class="text-bd-green">'stat'</span>, label: <span class="text-bd-green">'Gold'</span>, 
    value: state.game.gold, color: <span class="text-bd-green">'#fbbf24'</span>,
    align: <span class="text-bd-green">'right'</span>, order: 1
  });
  
  <span class="text-bd-purple">return</span> { text: text + widgets };
};
<span class="text-bd-cyan">modifier</span>(text);</code></pre>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Check class="w-4 h-4 text-bd-green" />
                That's it! Your widgets will now appear at the top of the adventure page.
              </h3>
              <p class="text-sm text-bd-text-secondary">
                The HP bar will show your current health, and the gold stat will update as you play. 
                Protocol messages are automatically stripped from the visible text.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Widget Types -->
      <section id="guide-widget-types" class="card">
        <button @click="toggleGuideSection('widget-types')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layout class="w-5 h-5 text-bd-blue" />
            Widget Types
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('widget-types') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('widget-types')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              BetterScripts supports <strong>9 widget types</strong> for different use cases. Each card below shows a 
              <strong>live preview</strong> of what the widget looks like alongside its configuration.
            </p>

            <!-- Basic Widgets -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-bd-cyan"></span>
                Basic Display Widgets
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Stat -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-cyan/20 text-bd-cyan">stat</span>
                    Label + Value
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[11px] text-[#8888aa]">Gold</span>
                      <span class="text-[11px] font-semibold" style="color: #fbbf24;">1250</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'stat', label: 'Gold', value: 1250, color: '#fbbf24' }</pre>
                  <p class="text-xs text-bd-text-muted">Simple label-value display with optional color.</p>
                </div>

                <!-- Bar -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-green/20 text-bd-green">bar</span>
                    Progress Bar
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[180px]">
                      <span class="text-[11px] text-[#8888aa] w-6">HP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden">
                        <div class="h-full rounded-full" style="width: 75%; background: #22c55e;"></div>
                      </div>
                      <span class="text-[10px] text-[#8888aa]">75/100</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'bar', label: 'HP', value: 75, max: 100, color: '#22c55e' }</pre>
                  <p class="text-xs text-bd-text-muted">Visual progress bar with fill indicator and value text.</p>
                </div>

                <!-- Text -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-amber/20 text-bd-amber">text</span>
                    Simple Text
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[11px] font-bold" style="color: #fbbf24;">Level Up!</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'text', text: 'Level Up!', style: { fontWeight: 'bold', color: '#fbbf24' } }</pre>
                  <p class="text-xs text-bd-text-muted">Plain text with optional inline styling.</p>
                </div>

                <!-- Icon -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-purple/20 text-bd-purple">icon</span>
                    Icon Only
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]" title="Health">
                      <span class="text-base">❤️</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'icon', icon: '❤️', color: '#ef4444', size: 20, tooltip: 'Health' }</pre>
                  <p class="text-xs text-bd-text-muted">Compact emoji/icon with optional tooltip.</p>
                </div>
              </div>
            </div>

            <!-- Container Widgets -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-bd-blue"></span>
                Container & List Widgets
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Panel -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-blue/20 text-bd-blue">panel</span>
                    Multi-Item Container
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-block px-3 py-2 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[160px]">
                      <div class="text-[10px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1.5 pb-1 border-b border-[#2a2a3e]">Character</div>
                      <div class="space-y-1">
                        <div class="flex justify-between text-[11px]"><span class="text-[#8888aa]">LVL</span><span class="text-[#ccc]">5</span></div>
                        <div class="flex justify-between text-[11px]"><span class="text-[#8888aa]">XP</span><span style="color: #60a5fa;">450/1000</span></div>
                      </div>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'panel', title: 'Character',
  items: [
    { label: 'LVL', value: 5 },
    { label: 'XP', value: '450/1000', color: '#60a5fa' }
  ] }</pre>
                  <p class="text-xs text-bd-text-muted">Container with title and multiple labeled items.</p>
                </div>

                <!-- List -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-indigo/20 text-bd-indigo">list</span>
                    Item List
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-block px-3 py-2 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[160px]">
                      <div class="text-[10px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1.5 pb-1 border-b border-[#2a2a3e]">Inventory</div>
                      <div class="space-y-0.5">
                        <div class="text-[11px] text-[#ccc]">🗡️ Iron Sword</div>
                        <div class="text-[11px] text-[#ccc]">🛡️ Wooden Shield</div>
                        <div class="text-[11px] text-[#ccc]">• Health Potion</div>
                      </div>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'list', title: 'Inventory',
  items: [
    { icon: '🗡️', text: 'Iron Sword' },
    { icon: '🛡️', text: 'Wooden Shield' },
    'Health Potion'
  ] }</pre>
                  <p class="text-xs text-bd-text-muted">Bulleted list with optional icons and colors.</p>
                </div>
              </div>
            </div>

            <!-- Status & Decorative Widgets -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-bd-pink"></span>
                Status & Decorative Widgets
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Badge -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-pink/20 text-bd-pink">badge</span>
                    Status Tag
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="flex gap-2">
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: rgba(168,85,247,0.15); color: #a855f7;">☠️ Poisoned</span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: #fbbf24; color: #1a1a2e;">⚡ Buffed</span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border" style="border-color: #22c55e; color: #22c55e;">Healthy</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'badge', text: 'Poisoned', icon: '☠️',
  color: '#a855f7', variant: 'subtle' }</pre>
                  <p class="text-xs text-bd-text-muted">Compact status pill. Variants: <code class="text-bd-text-secondary">subtle</code>, <code class="text-bd-text-secondary">solid</code>, <code class="text-bd-text-secondary">outline</code>.</p>
                </div>

                <!-- Counter -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-orange/20 text-bd-orange">counter</span>
                    Number with Delta
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-sm">💰</span>
                      <span class="text-[11px] font-semibold" style="color: #fbbf24;">1250</span>
                      <span class="text-[10px] font-medium" style="color: #22c55e;">+50</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'counter', icon: '💰', value: 1250, delta: +50, color: '#fbbf24' }</pre>
                  <p class="text-xs text-bd-text-muted">Number with optional +/- change indicator.</p>
                </div>

                <!-- Custom -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-red/20 text-bd-red">custom</span>
                    Custom HTML
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[11px] font-bold text-[#ccc]">HP:</span>
                      <span class="text-[11px]" style="color: #22c55e;">100</span>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'custom',
  html: '&lt;strong&gt;HP:&lt;/strong&gt; &lt;span style="color:#22c55e"&gt;100&lt;/span&gt;' }</pre>
                  <p class="text-xs text-bd-text-muted">Custom HTML (sanitized). See HTML Reference section.</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Widget Properties -->
      <section id="guide-widget-properties" class="card">
        <button @click="toggleGuideSection('widget-properties')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Settings class="w-5 h-5 text-bd-purple" />
            Widget Properties
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('widget-properties') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('widget-properties')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              All widgets support common properties plus type-specific options. Properties can be mixed and matched to achieve the desired appearance.
            </p>

            <!-- Common Properties -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Common Properties</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-bd-text-secondary">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 font-medium text-bd-text-primary">Property</th>
                      <th class="text-left py-2 font-medium text-bd-text-primary">Type</th>
                      <th class="text-left py-2 font-medium text-bd-text-primary">Description</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-bd-border-subtle">
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">type</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs"><strong>Required.</strong> Widget type identifier</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">align</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs">Alignment within the top bar: <code class="text-bd-blue">left</code>, <code class="text-bd-green">center</code> (default), <code class="text-bd-purple">right</code></td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">order</td>
                      <td class="py-2 text-xs">number</td>
                      <td class="py-2 text-xs">Display order within the alignment zone (lower = first)</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">color</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs">CSS color for values, fills, or tints</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Content Properties -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Content Properties</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Display Text</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li><code class="text-bd-cyan">label</code> - Widget label (stat, bar, badge)</li>
                    <li><code class="text-bd-cyan">value</code> - Display value (stat, bar, counter, panel items)</li>
                    <li><code class="text-bd-cyan">text</code> - Text content (text, badge)</li>
                    <li><code class="text-bd-cyan">title</code> - Container title (panel, list)</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Visual Elements</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li><code class="text-bd-cyan">icon</code> - Emoji/icon (badge, list items, icon, counter)</li>
                    <li><code class="text-bd-cyan">items</code> - Array of items (panel, list)</li>
                    <li><code class="text-bd-cyan">html</code> - Custom HTML (custom widget)</li>
                    <li><code class="text-bd-cyan">style</code> - CSS styles (text, custom)</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Bar-Specific Properties -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Bar Widget Properties</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Progress Control</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li><code class="text-bd-cyan">value</code> - Current value (number)</li>
                    <li><code class="text-bd-cyan">max</code> - Maximum value (number, default: 100)</li>
                    <li><code class="text-bd-cyan">showValue</code> - Show value text (boolean, default: true)</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Example</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto">{ 
  type: 'bar',
  label: 'Experience',
  value: 450,
  max: 1000,
  color: '#60a5fa',
  showValue: true,
  align: 'center',
  order: 2
}</pre>
                </div>
              </div>
            </div>

            <!-- Badge-Specific Properties -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Badge Widget Properties</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Style Variants</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li><code class="text-bd-cyan">variant</code> - Badge style: <code class="text-bd-green">subtle</code> (default), <code class="text-bd-blue">solid</code>, <code class="text-bd-purple">outline</code></li>
                    <li><code class="text-bd-cyan">text</code> - Badge text content</li>
                    <li><code class="text-bd-cyan">icon</code> - Optional emoji/icon prefix</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Example</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto">{ 
  type: 'badge',
  text: 'Buffed',
  icon: '⚡',
  color: '#fbbf24',
  variant: 'solid',
  align: 'center'
}</pre>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Widget Positions -->
      <section id="guide-widget-positions" class="card">
        <button @click="toggleGuideSection('widget-positions')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5 text-bd-cyan" />
            Widget Positions
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('widget-positions') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('widget-positions')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              All widgets appear in a <strong>horizontal top bar</strong> aligned with the story text width.
              Use the <code class="text-bd-cyan">align</code> property to place widgets in one of three zones: <strong>left</strong>, <strong>center</strong>, or <strong>right</strong>.
            </p>

            <!-- Visual Layout Diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Layout Diagram</div>
              <div class="rounded-lg border border-bd-border-subtle overflow-hidden bg-[#0d0d1a]">
                <!-- Top Bar with alignment zones -->
                <div class="px-3 py-2 border-b border-[#2a2a3e]" style="background: rgba(34,197,94,0.08);">
                  <div class="flex items-center justify-between gap-2">
                    <!-- Left zone -->
                    <div class="flex items-center gap-1.5 flex-wrap" style="background: rgba(59,130,246,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[9px] text-[#8888aa]">LVL</span>
                        <span class="text-[9px] font-semibold" style="color:#a855f7;">12</span>
                      </div>
                    </div>
                    <!-- Center zone -->
                    <div class="flex items-center gap-1.5 flex-wrap justify-center flex-1" style="background: rgba(34,197,94,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[10px] text-[#8888aa]">HP</span>
                        <div class="w-14 h-1.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:75%;background:#22c55e;"></div></div>
                      </div>
                      <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[10px] text-[#8888aa]">MP</span>
                        <div class="w-14 h-1.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:60%;background:#3b82f6;"></div></div>
                      </div>
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px]" style="background:rgba(168,85,247,0.15);color:#a855f7;">☠️ Poisoned</div>
                    </div>
                    <!-- Right zone -->
                    <div class="flex items-center gap-1.5 flex-wrap justify-end" style="background: rgba(168,85,247,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[9px]">💰</span>
                        <span class="text-[9px] font-semibold" style="color:#fbbf24;">1250</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between mt-1 px-1">
                    <span class="text-[8px] text-bd-blue font-mono">align: 'left'</span>
                    <span class="text-[8px] text-bd-green font-mono">align: 'center' (default)</span>
                    <span class="text-[8px] text-bd-purple font-mono">align: 'right'</span>
                  </div>
                </div>
                <!-- Main Content Area -->
                <div class="flex-1 p-4 flex items-center justify-center min-h-[80px]">
                  <div class="text-center">
                    <div class="text-xs text-[#555] italic">Adventure Text Area</div>
                    <div class="text-[10px] text-[#444] mt-1">Your story content appears here...</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Alignment Zone Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2">Left Zone</h3>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Widgets anchored to the left edge. Good for persistent identifiers like level or character name.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('level', { 
  type: 'stat', label: 'LVL',
  value: 12, align: 'left'
});</pre>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2">Center Zone <span class="text-xs text-bd-text-muted font-normal">(default)</span></h3>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Primary area for core HUD elements. Fills available space between left and right zones.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('hp', { 
  type: 'bar', label: 'HP',
  value: 85, align: 'center',
  order: 1
});</pre>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2">Right Zone</h3>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Widgets anchored to the right edge. Ideal for currency, counters, or secondary info.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('gold', { 
  type: 'counter', icon: '💰',
  value: 1250, align: 'right'
});</pre>
              </div>
            </div>

            <!-- Responsive Behavior -->
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Smartphone class="w-4 h-4 text-bd-amber" />
                Responsive Behavior
              </h3>
              <div class="text-sm text-bd-text-secondary space-y-2">
                <p>Widgets automatically adapt to screen size:</p>
                <ul class="space-y-1 ml-4">
                  <li>• <strong>&lt; 480px:</strong> Compact inline layout with smaller fonts and tighter spacing</li>
                  <li>• <strong>&lt; 768px:</strong> Slightly reduced sizing for tablet screens</li>
                  <li>• <strong>Default:</strong> Standard sizing</li>
                  <li>• <strong>≥ 1440px:</strong> Larger widgets for QHD displays</li>
                  <li>• <strong>≥ 1920px:</strong> Enhanced sizing for Full HD+ displays</li>
                  <li>• <strong>≥ 2560px:</strong> Maximum sizing for 4K/Ultra displays</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Message Types -->
      <section id="guide-message-types" class="card">
        <button @click="toggleGuideSection('message-types')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <MessageSquare class="w-5 h-5 text-bd-orange" />
            Message Types & Actions
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('message-types') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('message-types')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              BetterScripts uses a protocol message system to communicate between scripts and the extension. 
              Messages are embedded in the AI output and processed in real-time.
            </p>

            <!-- Widget Actions -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Widget Actions</h3>
              <div class="space-y-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <Plus class="w-4 h-4 text-bd-green" />
                    Create Widget
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ 
  type: 'widget', 
  widgetId: 'hp-bar', 
  action: 'create', 
  config: { 
    type: 'bar', 
    label: 'HP', 
    value: 85,
    align: 'center'
  } 
}</pre>
                  <p class="text-xs text-bd-text-muted">Creates a new widget or updates existing widget in place.</p>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <RefreshCw class="w-4 h-4 text-bd-blue" />
                    Update Widget
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ 
  type: 'widget', 
  widgetId: 'hp-bar', 
  action: 'update', 
  config: { 
    value: 50 
  } 
}</pre>
                  <p class="text-xs text-bd-text-muted">Updates specific properties; auto-creates if widget doesn't exist.</p>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <Trash2 class="w-4 h-4 text-bd-red" />
                    Destroy Widget
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ 
  type: 'widget', 
  widgetId: 'hp-bar', 
  action: 'destroy' 
}</pre>
                  <p class="text-xs text-bd-text-muted">Removes the widget from all positions.</p>
                </div>
              </div>
            </div>

            <!-- System Messages -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">System Messages</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <Trash2 class="w-4 h-4 text-bd-red" />
                    Clear All
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ type: 'clearAll' }</pre>
                  <p class="text-xs text-bd-text-muted">Removes all widgets at once.</p>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <Activity class="w-4 h-4 text-bd-green" />
                    Ping
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ 
  type: 'ping', 
  data: 'test' 
}</pre>
                  <p class="text-xs text-bd-text-muted">Test connectivity (logs to console).</p>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <FileText class="w-4 h-4 text-bd-blue" />
                    Register Script
                  </h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto mb-2">{ 
  type: 'register', 
  scriptId: 'my-script', 
  scriptName: 'My Script', 
  version: '1.0' 
}</pre>
                  <p class="text-xs text-bd-text-muted">Announce script to BetterDungeon.</p>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2 flex items-center gap-2">
                    <Hash class="w-4 h-4 text-bd-purple" />
                    Widget ID Rules
                  </h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Alphanumeric, underscores, and hyphens only</li>
                    <li>• Examples: <code class="text-bd-green">hp-bar</code>, <code class="text-bd-blue">gold_stat</code>, <code class="text-bd-purple">player1Health</code></li>
                    <li>• Use unique prefixes to avoid conflicts</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Helper Functions Reference -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-emerald/30">
              <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
                <Code class="w-4 h-4 text-bd-emerald" />
                Helper Functions Reference
              </h3>
              <p class="text-xs text-bd-text-muted mb-4">These helpers wrap the raw protocol format so you never have to write <code class="text-bd-green">[[BD:...:BD]]</code> by hand.</p>

              <div class="grid md:grid-cols-2 gap-3">
                <!-- bdWidget -->
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Plus class="w-3.5 h-3.5 text-bd-green" />
                    <code class="text-sm font-semibold text-bd-green">bdWidget(id, config)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Create or update a widget. If the widget already exists, updates it in place.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdWidget('hp-bar', { type: 'bar', label: 'HP', value: 85, max: 100, align: 'center' });</pre>
                </div>

                <!-- bdDestroy -->
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Trash2 class="w-3.5 h-3.5 text-bd-red" />
                    <code class="text-sm font-semibold text-bd-red">bdDestroy(id)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Remove a single widget by ID. Useful for hiding conditional UI elements.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdDestroy('hp-bar'); <span class="text-bd-text-muted">// removes the HP bar</span></pre>
                </div>

                <!-- bdClearAll -->
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Trash2 class="w-3.5 h-3.5 text-bd-amber" />
                    <code class="text-sm font-semibold text-bd-amber">bdClearAll()</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Remove <strong>all</strong> widgets at once. Great for scene transitions or game resets.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdClearAll(); <span class="text-bd-text-muted">// wipes every widget</span></pre>
                </div>

                <!-- bdMessage -->
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 md:col-span-2">
                  <div class="flex items-center gap-2">
                    <MessageSquare class="w-3.5 h-3.5 text-bd-purple" />
                    <code class="text-sm font-semibold text-bd-purple">bdMessage(payload)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Low-level helper that sends any raw protocol message. The other helpers are built on top of this. Use it for pings, registration, or custom message types.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdMessage({ type: 'ping', data: 'hello' });           <span class="text-bd-text-muted">// test connectivity</span>
bdMessage({ type: 'register', scriptId: 'my-rpg',     <span class="text-bd-text-muted">// announce your script</span>
            scriptName: 'My RPG', version: '1.0' });</pre>
                </div>
              </div>

              <div class="mt-3 p-2 rounded bg-bd-emerald/10 border border-bd-emerald/30">
                <p class="text-xs text-bd-text-muted">
                  <strong class="text-bd-text-primary">Tip:</strong> Use <code class="text-bd-green">bdWidget</code> for all widget operations. It automatically creates new widgets or updates existing ones in place.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Custom HTML Reference -->
      <section id="guide-custom-html" class="card">
        <button @click="toggleGuideSection('custom-html')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code class="w-5 h-5 text-bd-red" />
            Custom HTML Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('custom-html') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('custom-html')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The <code class="text-bd-red">custom</code> widget type allows you to create custom HTML content 
              with security restrictions. All HTML is sanitized to prevent malicious code.
            </p>

            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-xs text-bd-text-secondary">
                <strong class="text-bd-text-primary">Security Note:</strong> Custom HTML is automatically sanitized 
                to remove potentially dangerous content like scripts, event handlers, and unsafe URLs.
              </p>
            </div>

            <!-- Allowed Tags -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Allowed HTML Tags</h3>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                div, span, p, br, hr, strong, b, em, i, u, s, mark,<br>
                h1, h2, h3, h4, h5, h6, ul, ol, li,<br>
                table, thead, tbody, tr, th, td, img, a,<br>
                pre, code, blockquote
              </div>
            </div>

            <!-- Allowed Attributes -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Allowed Attributes</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Global Attributes</h4>
                  <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary">
                    class, id, style, title
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Tag-Specific</h4>
                  <div class="space-y-2">
                    <div class="p-2 rounded bg-bd-bg-tertiary">
                      <code class="text-xs text-bd-cyan">a:</code> href, target, rel
                    </div>
                    <div class="p-2 rounded bg-bd-bg-tertiary">
                      <code class="text-xs text-bd-cyan">img:</code> src, alt, width, height
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Allowed CSS -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Allowed CSS Properties</h3>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                color, background-color, background,<br>
                font-size, font-weight, font-style, font-family,<br>
                text-align, text-decoration, text-transform,<br>
                padding, padding-top, padding-right, padding-bottom, padding-left,<br>
                margin, margin-top, margin-right, margin-bottom, margin-left,<br>
                border, border-radius, border-color, border-width, border-style,<br>
                width, height, max-width, max-height, min-width, min-height,<br>
                display, flex, flex-direction, justify-content, align-items, gap,<br>
                opacity, visibility, overflow,<br>
                position, top, right, bottom, left, z-index
              </div>
            </div>

            <!-- Blocked Content -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Blocked Content</h3>
              <div class="grid md:grid-cols-3 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Tags</h4>
                  <div class="p-2 rounded bg-bd-red/10 font-mono text-xs text-bd-red">
                    &lt;script&gt;<br>
                    &lt;style&gt;<br>
                    &lt;iframe&gt;<br>
                    &lt;object&gt;<br>
                    &lt;embed&gt;
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Attributes</h4>
                  <div class="p-2 rounded bg-bd-red/10 font-mono text-xs text-bd-red">
                    onclick<br>
                    onload<br>
                    onerror<br>
                    on* (all events)
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">URLs</h4>
                  <div class="p-2 rounded bg-bd-red/10 font-mono text-xs text-bd-red">
                    javascript:<br>
                    vbscript:<br>
                    data:
                  </div>
                </div>
              </div>
            </div>

            <!-- Examples -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Custom Widget Examples</h3>
              <div class="space-y-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Styled Status Display</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto">bdWidget('status', {
  type: 'custom',
  html: '<div style="display: flex; gap: 8px; align-items: center;">' +
        '<span style="color: #ef4444;">❤️</span>' +
        '<span style="font-weight: bold;">Health:</span>' +
        '<span style="color: #22c55e;">100/100</span>' +
        '</div>',
  align: 'center'
});</pre>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Mini Table</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto">bdWidget('stats-table', {
  type: 'custom',
  html: '<table style="font-size: 12px; border-collapse: collapse;">' +
        '<tr><td style="padding: 2px 4px;">STR:</td><td style="color: #60a5fa;">18</td></tr>' +
        '<tr><td style="padding: 2px 4px;">DEX:</td><td style="color: #22c55e;">14</td></tr>' +
        '<tr><td style="padding: 2px 4px;">INT:</td><td style="color: #a855f7;">16</td></tr>' +
        '</table>',
  align: 'left'
});</pre>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Advanced Features -->
      <section id="guide-advanced-features" class="card">
        <button @click="toggleGuideSection('advanced-features')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-yellow" />
            Advanced Features
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-features') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-features')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Unlock the full potential of BetterScripts with advanced features like 
              responsive design, JavaScript events, and debug mode.
            </p>

            <!-- JavaScript Events -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Radio class="w-4 h-4 text-bd-cyan" />
                JavaScript Events
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Listen to widget lifecycle events from the browser console or other extensions for debugging and integration.
              </p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><span class="text-bd-comment">// Widget created/updated/destroyed</span>
window.addEventListener('betterscripts:widget', (e) => {
  console.log(e.detail.action, e.detail.widgetId);
});

<span class="text-bd-comment">// All widgets cleared</span>
window.addEventListener('betterscripts:cleared', (e) => {
  console.log('Cleared', e.detail.count, 'widgets');
});

<span class="text-bd-comment">// Script registered</span>
window.addEventListener('betterscripts:registered', (e) => {
  console.log('Script registered:', e.detail.scriptName);
});

<span class="text-bd-comment">// Ping response</span>
window.addEventListener('betterscripts:pong', (e) => {
  console.log('Ping response:', e.detail.timestamp);
});

<span class="text-bd-comment">// Error occurred</span>
window.addEventListener('betterscripts:error', (e) => {
  console.error('Error:', e.detail.type, e.detail.errors);
});</pre>
            </div>

            <!-- Debug Mode -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Bug class="w-4 h-4 text-bd-green" />
                Debug Mode
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Debug mode helps you troubleshoot widget creation and inspect the raw protocol messages your scripts are sending.
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">How to Enable</h4>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Open the <strong>BetterDungeon popup</strong>, expand the <strong>BetterScripts</strong> card, and toggle <strong>Debug Mode</strong> on.
                  </p>
                  <p class="text-xs text-bd-text-muted">
                    The setting is persisted across sessions and synced to your browser profile.
                  </p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">What It Does</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• <strong>Protocol messages stay visible</strong> in the story text so you can read the raw <code class="text-bd-green">[[BD:...:BD]]</code> tags</li>
                    <li>• <strong>Verbose console logging</strong> for every parsed message, widget create/update/destroy, and processing step</li>
                  </ul>
                </div>
              </div>
              <div class="p-2 rounded bg-bd-green/10 border border-bd-green/30 mt-3">
                <p class="text-xs text-bd-text-muted">
                  <strong>Tip:</strong> Use your browser's DevTools console (<kbd class="px-1 py-0.5 rounded bg-bd-bg-tertiary text-bd-text-secondary text-[10px]">F12</kbd>) alongside debug mode to see the full log output.
                </p>
              </div>
            </div>

            <!-- Performance Tips -->
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-amber" />
                Performance Tips
              </h3>
              <ul class="text-sm text-bd-text-secondary space-y-2">
                <li>• <strong>Use bdWidget for updates</strong> - it automatically updates existing widgets in place</li>
                <li>• <strong>Batch multiple widgets</strong> in a single output modifier call</li>
                <li>• <strong>Limit custom HTML complexity</strong> - complex DOM can impact performance</li>
                <li>• <strong>Use appropriate widget types</strong> - custom HTML isn't always necessary</li>
                <li>• <strong>Clear unused widgets</strong> to prevent memory buildup</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Best Practices -->
      <section id="guide-best-practices" class="card">
        <button @click="toggleGuideSection('best-practices')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Star class="w-5 h-5 text-bd-yellow" />
            Best Practices
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Follow these practices to create robust, maintainable, and user-friendly BetterScripts implementations.
            </p>

            <!-- Essential Practices -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  Essential Practices
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-2">
                  <li><strong>Always strip context</strong> - Use Context Modifier to remove <code class="text-bd-green">[[BD:...:BD]]</code> tags</li>
                  <li><strong>Use unique IDs</strong> - Prefix with script name: <code class="text-bd-cyan">myscript_hp</code>, <code class="text-bd-cyan">myscript_gold</code></li>
                  <li><strong>Initialize state safely</strong> - <code class="text-bd-purple">state.x = state.x ?? defaultValue</code></li>
                  <li><strong>Use bdWidget for all operations</strong> - Creates new or updates existing widgets</li>
                  <li><strong>Use order property</strong> - Control widget arrangement with <code class="text-bd-cyan">order: 1, 2, 3...</code></li>
                </ul>
              </div>

              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Common Pitfalls
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-2">
                  <li><strong>Forgetting context modifier</strong> - AI will repeat protocol tags</li>
                  <li><strong>Widget ID conflicts</strong> - Use prefixes to avoid clashes</li>
                  <li><strong>Overusing custom HTML</strong> - Built-in widgets are often better</li>
                  <li><strong>Ignoring mobile layout</strong> - Test that widgets look good on smaller screens</li>
                  <li><strong>Not handling errors</strong> - Check console for widget errors</li>
                </ul>
              </div>
            </div>

            <!-- Code Organization -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Code Organization</h3>
              <div class="space-y-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Library Structure</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-comment">// === State Management ===</span>
state.game = state.game ?? {
  hp: 100, maxHp: 100, gold: 0,
  inventory: [], location: 'tavern'
};

<span class="text-bd-comment">// === BetterScripts Helpers ===</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

<span class="text-bd-comment">// === Game Logic Helpers ===</span>
function updateHP(amount) {
  state.game.hp = Math.max(0, Math.min(state.game.maxHp, state.game.hp + amount));
  return state.game.hp;
}

function addGold(amount) {
  state.game.gold += amount;
  return state.game.gold;
}</pre>
                </div>

                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Output Modifier Pattern</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-comment">// Update game state</span>
  updateHP(-5);
  addGold(10);
  
  <span class="text-bd-comment">// Build widgets string</span>
  <span class="text-bd-purple">let</span> widgets = <span class="text-bd-green">''</span>;
  
  <span class="text-bd-comment">// Core stats (always visible)</span>
  widgets += bdWidget(<span class="text-bd-green">'hp-bar'</span>, { type: <span class="text-bd-green">'bar'</span>, label: <span class="text-bd-green">'HP'</span>, value: state.game.hp, max: state.game.maxHp, align: <span class="text-bd-green">'left'</span>, order: 1 });
  widgets += bdWidget(<span class="text-bd-green">'gold'</span>, { type: <span class="text-bd-green">'stat'</span>, label: <span class="text-bd-green">'Gold'</span>, value: state.game.gold, align: <span class="text-bd-green">'right'</span>, order: 1 });
  
  <span class="text-bd-comment">// Conditional widgets</span>
  <span class="text-bd-purple">if</span> (state.game.hp < 30) {
    widgets += bdWidget(<span class="text-bd-green">'warning'</span>, {
      type: <span class="text-bd-green">'text'</span>,
      text: <span class="text-bd-green">'⚠️ Low Health!'</span>,
      style: { color: <span class="text-bd-green">'#ef4444'</span>, fontWeight: <span class="text-bd-green">'bold'</span> },
      align: <span class="text-bd-green">'center'</span>, order: 2
    });
  }
  
  <span class="text-bd-purple">return</span> { text: text + widgets };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
                </div>
              </div>
            </div>

            <!-- User Experience -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">User Experience Guidelines</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Visual Design</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Use consistent colors throughout your widgets</li>
                    <li>• Group related widgets using alignment zones</li>
                    <li>• Use icons to improve visual recognition</li>
                    <li>• Keep text concise and readable</li>
                    <li>• Use progress bars for measurable quantities</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Information Architecture</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Prioritize essential information in top position</li>
                    <li>• Use order property to control widget sequence</li>
                    <li>• Hide irrelevant widgets when not needed</li>
                    <li>• Use panels to organize complex information</li>
                    <li>• Consider mobile layout in all designs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Troubleshooting -->
      <section id="guide-troubleshooting" class="card">
        <button @click="toggleGuideSection('troubleshooting')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-red" />
            Troubleshooting
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('troubleshooting') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('troubleshooting')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Common issues and their solutions. Always check the browser console (F12) for detailed error messages.
            </p>

            <!-- Common Issues Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-sm text-bd-text-secondary">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 font-medium text-bd-text-primary">Problem</th>
                    <th class="text-left py-2 font-medium text-bd-text-primary">Solution</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-bd-border-subtle">
                  <tr>
                    <td class="py-3">Visible <code class="text-bd-green">[[BD:...]]</code> tags in story</td>
                    <td class="py-3">Ensure BetterDungeon is enabled and extension is properly installed</td>
                  </tr>
                  <tr>
                    <td class="py-3">AI repeats protocol tags</td>
                    <td class="py-3">Add Context Modifier to strip tags: <code class="text-bd-cyan">text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '')</code></td>
                  </tr>
                  <tr>
                    <td class="py-3">Widgets not appearing</td>
                    <td class="py-3">Check browser console (F12) for errors, verify widget ID format, ensure protocol syntax is correct</td>
                  </tr>
                  <tr>
                    <td class="py-3">Widget not updating</td>
                    <td class="py-3">Use <code class="text-bd-cyan">bdWidget</code> with the same ID (auto-updates in place), check widget ID matches exactly, verify state changes</td>
                  </tr>
                  <tr>
                    <td class="py-3">Custom HTML stripped</td>
                    <td class="py-3">Check allowed tags/attributes in HTML Reference, ensure no unsafe content</td>
                  </tr>
                  <tr>
                    <td class="py-3">Widgets disappear on navigation</td>
                    <td class="py-3">Normal behavior - widgets are per-adventure. Recreate on new adventure or use persistent state</td>
                  </tr>
                  <tr>
                    <td class="py-3">Mobile layout issues</td>
                    <td class="py-3">All widgets appear in a top bar that wraps automatically. Test your layout at different screen sizes to ensure readability.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Debug Console -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Debug Console Output</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                When widgets are working correctly, you'll see these messages in the console:
              </p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary">[BetterScripts] Widget created: hp-bar
[BetterScripts] Widget updated: hp-bar
[BetterScripts] 🏓 PONG - Ping received
[BetterScripts] 📝 Script registered: MyGameScript v1.0</pre>
              
              <div class="mt-3">
                <h4 class="text-sm font-medium text-bd-text-primary mb-2">Error Messages</h4>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-red/10 border border-bd-red/30">[BetterScripts] Widget validation failed: "hp-bar"
[BetterScripts] Unknown widget type: "progressbar"
[BetterScripts] Invalid widget config for "hp-bar": Widget config missing required "type" field</pre>
              </div>
            </div>

            <!-- Testing Steps -->
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <CheckCircle class="w-4 h-4 text-bd-amber" />
                Testing Checklist
              </h3>
              <ol class="text-sm text-bd-text-secondary space-y-2">
                <li>1. <strong>Install BetterDungeon</strong> and verify it's enabled</li>
                <li>2. <strong>Add library functions</strong> to your script</li>
                <li>3. <strong>Implement context modifier</strong> to strip protocol tags</li>
                <li>4. <strong>Create simple widget</strong> (start with a stat widget)</li>
                <li>5. <strong>Test in adventure</strong> - check for widgets and no visible protocol tags</li>
                <li>6. <strong>Check console</strong> for any error messages</li>
                <li>7. <strong>Test on mobile</strong> if using sidebars</li>
                <li>8. <strong>Test widget updates</strong> by changing values</li>
              </ol>
            </div>

            <!-- Getting Help -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Getting Help</h3>
              <div class="flex flex-wrap gap-3">
                <a href="https://github.com/ComputerKWasTaken/BetterDungeon/issues" target="_blank" class="btn btn-secondary text-sm">
                  <ExternalLink class="w-4 h-4" />
                  Report Bug
                </a>
                <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-sm">
                  <MessageSquare class="w-4 h-4" />
                  Discord Support
                </a>
                <span class="text-xs text-bd-text-muted flex items-center">Include script code and console errors when reporting issues</span>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Examples -->
      <section id="guide-examples" class="card">
        <button @click="toggleGuideSection('examples')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code2 class="w-5 h-5 text-bd-indigo" />
            Complete Examples
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('examples') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('examples')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Ready-to-use examples from our <strong>Scripts</strong> collection. Each includes all the script parts 
              needed for a complete implementation. Find these and more in the Scripts tab.
            </p>

            <!-- ==================== EXAMPLE 1: Simple Turn Counter ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Activity class="w-5 h-5 text-bd-green flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">Simple Turn Counter</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Minimal BetterScripts example with a turn counter and location badge</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-green/20 text-bd-green">Beginner</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                    <span class="text-[11px] text-[#8888aa]">Turn</span>
                    <span class="text-[11px] font-semibold" style="color: #60a5fa;">5</span>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: rgba(168,85,247,0.15); color: #a855f7;">📍 Town</span>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.counter = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.counter === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.counter = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.counter === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context Modifier</span>
                  </button>
                  <button @click="exampleTab.counter = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.counter === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output Modifier</span>
                  </button>
                </div>

                <pre v-if="exampleTab.counter === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// The simplest possible BetterScripts example.</span>
<span class="text-bd-text-muted">// Demonstrates bdWidget for creating and updating widgets.</span>

<span class="text-bd-text-muted">// BetterScripts protocol helpers</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

<span class="text-bd-text-muted">// Persistent state</span>
state.location = state.location ?? 'Town';</code></pre>

                <pre v-if="exampleTab.counter === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Strip protocol messages from AI context</span>
const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.counter === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Display turn counter and location badge</span>
const modifier = (text) => {
  let widgets = '';

  <span class="text-bd-text-muted">// Turn counter (bdWidget creates or updates existing widget)</span>
  widgets += bdWidget('turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#60a5fa',
    align: 'left',
    order: 1
  });

  <span class="text-bd-text-muted">// Location badge</span>
  widgets += bdWidget('location', {
    type: 'badge',
    text: state.location,
    icon: '📍',
    color: '#a855f7',
    variant: 'subtle',
    align: 'right',
    order: 1
  });

  return { text: text + widgets };
};
modifier(text);</code></pre>
              </div>
            </div>

            <!-- ==================== EXAMPLE 2: In-Game Time System ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Clock class="w-5 h-5 text-bd-amber flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">In-Game Time System</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Day/night cycle, weekday tracking, and time commands (<code class="text-bd-text-secondary">:time</code>, <code class="text-bd-text-secondary">:sleep</code>, <code class="text-bd-text-secondary">:timeskip</code>)</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-amber/20 text-bd-amber">Intermediate</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <div class="flex items-center gap-2">
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[11px] text-[#8888aa]">☀️</span>
                      <span class="text-[11px] font-semibold" style="color: #fbbf24;">10:30 AM</span>
                    </div>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[11px] text-[#8888aa]">📅</span>
                      <span class="text-[11px] font-semibold" style="color: #60a5fa;">Wed D3</span>
                    </div>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: rgba(244,114,182,0.15); color: #f472b6;">☀️ Morning</span>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 flex-wrap border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.time = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.time === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.time = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.time === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context</span>
                  </button>
                  <button @click="exampleTab.time = 'input'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.time === 'input' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowDown class="w-3 h-3" /> Input</span>
                  </button>
                  <button @click="exampleTab.time = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.time === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output</span>
                  </button>
                </div>

                <pre v-if="exampleTab.time === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Time calculated from info.actionCount (turns).</span>
<span class="text-bd-text-muted">// Each turn = 2 minutes of in-game time.</span>
<span class="text-bd-text-muted">// Commands: :time, :timeskip &lt;hours&gt;, :sleep, :settime &lt;hour&gt;</span>

state.time = state.time ?? {
  offsetMinutes: 0,  <span class="text-bd-text-muted">// Manual time adjustments</span>
  startHour: 8       <span class="text-bd-text-muted">// Starting hour (8 AM)</span>
};

const MINUTES_PER_TURN = 2;
const START_MINUTE = state.time.startHour * 60;

<span class="text-bd-text-muted">// BetterScripts protocol helpers</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const TIME_PERIODS = [
  { name: 'Midnight', icon: '🌑', start: 0, end: 4 },
  { name: 'Dawn', icon: '🌅', start: 4, end: 7 },
  { name: 'Morning', icon: '☀️', start: 7, end: 12 },
  { name: 'Afternoon', icon: '🌤️', start: 12, end: 17 },
  { name: 'Evening', icon: '🌆', start: 17, end: 21 },
  { name: 'Night', icon: '🌙', start: 21, end: 24 }
];

<span class="text-bd-text-muted">// Time calculation functions</span>
function getTotalMinutes() {
  return START_MINUTE + ((info.actionCount || 0) * MINUTES_PER_TURN) + state.time.offsetMinutes;
}
function getHour() { return Math.floor((getTotalMinutes() % (24 * 60)) / 60); }
function getMinute() { return getTotalMinutes() % 60; }
function getDay() { return Math.floor(getTotalMinutes() / (24 * 60)) + 1; }
function getWeekday() { return WEEKDAYS[(getDay() - 1) % 7]; }
function getTimeString() {
  const h = getHour(), m = getMinute();
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${h &lt; 12 ? 'AM' : 'PM'}`;
}
function getTimePeriod() {
  const h = getHour();
  for (const p of TIME_PERIODS) { if (h >= p.start && h &lt; p.end) return p; }
  return TIME_PERIODS[0];
}

<span class="text-bd-text-muted">// Time manipulation</span>
function addOffset(min) { state.time.offsetMinutes += min; }
function setTime(targetHour) {
  let diff = targetHour - getHour();
  if (diff &lt; 0) diff += 24;
  state.time.offsetMinutes += (diff * 60) - getMinute();
}
function skipToMorning() { setTime(7); }

function getTimeContext() {
  const p = getTimePeriod();
  return `[Time: ${getTimeString()} (${p.name}), ${getWeekday()}, Day ${getDay()}]`;
}

<span class="text-bd-text-muted">// Command handler (called from Input Modifier)</span>
function handleTimeCommand(input) {
  const lower = input.toLowerCase().trim();
  if (lower === ':time') {
    const p = getTimePeriod();
    return { output: `\n🕐 ${getTimeString()} - ${p.icon} ${p.name}\n📅 ${getWeekday()}, Day ${getDay()}`, isCommand: true };
  }
  const skipMatch = lower.match(/^:timeskip\s+(\d+)$/);
  if (skipMatch) {
    const hours = parseInt(skipMatch[1]);
    addOffset(hours * 60);
    return { output: `\n⏩ Skipped ${hours}h. Now ${getTimeString()} (${getTimePeriod().name}).`, isCommand: true };
  }
  if (lower === ':sleep') {
    skipToMorning();
    return { output: `\n😴 You wake refreshed. ${getTimeString()}, ${getWeekday()}, Day ${getDay()}.`, isCommand: true };
  }
  const setMatch = lower.match(/^:settime\s+(\d+)$/);
  if (setMatch) {
    setTime(parseInt(setMatch[1]) % 24);
    return { output: `\n🕐 Time set to ${getTimeString()} (${getTimePeriod().name}).`, isCommand: true };
  }
  return null;
}</code></pre>

                <pre v-if="exampleTab.time === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Inject time into AI context + strip protocol tags</span>
const modifier = (text) => {
  text = text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '');
  text = getTimeContext() + '\n' + text;
  return { text };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.time === 'input'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Detect :time, :timeskip, :sleep, :settime commands</span>
const modifier = (text) => {
  const input = text.trim();
  if (input.startsWith(':time') || input.startsWith(':sleep') || input.startsWith(':settime')) {
    const result = handleTimeCommand(input);
    if (result) {
      state.time.pendingOutput = result.output;
      state.time.isCommand = true;
      return { text: '[TIME COMMAND]' };
    }
  }
  return { text };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.time === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  let output = text;

  <span class="text-bd-text-muted">// Check for pending command output</span>
  if (state.time.isCommand && state.time.pendingOutput) {
    output = state.time.pendingOutput;
    state.time.pendingOutput = null;
    state.time.isCommand = false;
  }

  <span class="text-bd-text-muted">// Build time widgets</span>
  const period = getTimePeriod();
  const isNight = period.name === 'Night' || period.name === 'Midnight';
  let widgets = '';

  widgets += bdWidget('time-clock', {
    type: 'stat', label: period.icon,
    value: getTimeString(),
    color: isNight ? '#94a3b8' : '#fbbf24',
    align: 'left', order: 1
  });

  widgets += bdWidget('day-counter', {
    type: 'stat', label: '📅',
    value: getWeekday().substring(0, 3) + ' D' + getDay(),
    color: '#60a5fa',
    align: 'left', order: 2
  });

  widgets += bdWidget('period-badge', {
    type: 'badge', text: period.name,
    icon: period.icon,
    color: isNight ? '#a78bfa' : '#f472b6',
    variant: 'subtle',
    align: 'right', order: 1
  });

  return { text: output + widgets };
};
modifier(text);</code></pre>
              </div>
            </div>

            <!-- ==================== EXAMPLE 3: Widget Showcase ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <LayoutDashboard class="w-5 h-5 text-bd-blue flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">Widget Showcase</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Displays all widget types for visual testing and layout reference</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-green/20 text-bd-green">Beginner</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex gap-4">
                  <!-- Center widgets -->
                  <div class="flex-1 space-y-1.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[11px] text-[#8888aa]">HP</span>
                        <span class="text-[11px] font-semibold" style="color: #ef4444;">85/100</span>
                      </div>
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-[11px] text-[#8888aa]">💰</span>
                        <span class="text-[11px] font-semibold" style="color: #fbbf24;">1,250</span>
                      </div>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: rgba(168,85,247,0.15); color: #a855f7;">☠️ Poisoned</span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: #3b82f6; color: #fff;">🛡️ Shielded</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-12">Health</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:85%;background:#22c55e;"></div></div>
                      <span class="text-[10px] text-[#8888aa]">85/100</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-12">XP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:75%;background:#06b6d4;"></div></div>
                      <span class="text-[10px] text-[#8888aa]">750/1000</span>
                    </div>
                  </div>
                  <!-- Side panel -->
                  <div class="hidden sm:block px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[110px]">
                    <div class="text-[9px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1 pb-0.5 border-b border-[#2a2a3e]">Character</div>
                    <div class="space-y-0.5">
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">Name</span><span style="color:#f472b6;">Adventurer</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">Class</span><span style="color:#60a5fa;">Warrior</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">Level</span><span style="color:#a855f7;">12</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.showcase = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.showcase === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.showcase = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.showcase === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context Modifier</span>
                  </button>
                  <button @click="exampleTab.showcase = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.showcase === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output Modifier</span>
                  </button>
                </div>

                <pre v-if="exampleTab.showcase === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Creates all widget types for visual testing.</span>
<span class="text-bd-text-muted">// Uses bdWidget to create or update widgets on subsequent turns.</span>

function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdClearAll() { return bdMessage({ type: 'clearAll' }); }</code></pre>

                <pre v-if="exampleTab.showcase === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Strip protocol messages from AI context</span>
const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.showcase === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  let w = '';

  <span class="text-bd-text-muted">// ========== Status Bar ==========</span>

  <span class="text-bd-text-muted">// Stats</span>
  w += bdWidget('demo-hp', { type: 'stat', label: 'HP', value: '85/100', color: '#ef4444', align: 'center', order: 1 });
  w += bdWidget('demo-mp', { type: 'stat', label: 'MP', value: '42/60', color: '#3b82f6', align: 'center', order: 2 });
  w += bdWidget('demo-gold', { type: 'stat', label: '💰', value: '1,250', color: '#fbbf24', align: 'center', order: 3 });

  <span class="text-bd-text-muted">// Bars</span>
  w += bdWidget('demo-health-bar', { type: 'bar', label: 'Health', value: 85, max: 100, color: '#22c55e', align: 'center', order: 4 });
  w += bdWidget('demo-mana-bar', { type: 'bar', label: 'Mana', value: 42, max: 60, color: '#8b5cf6', align: 'center', order: 5 });
  w += bdWidget('demo-xp-bar', { type: 'bar', label: 'XP', value: 750, max: 1000, color: '#06b6d4', align: 'center', order: 6 });

  <span class="text-bd-text-muted">// Badges (all three variants)</span>
  w += bdWidget('demo-badge-poison', { type: 'badge', text: 'Poisoned', icon: '☠️', color: '#a855f7', variant: 'subtle', align: 'center', order: 7 });
  w += bdWidget('demo-badge-shield', { type: 'badge', text: 'Shielded', icon: '🛡️', color: '#3b82f6', variant: 'solid', align: 'center', order: 8 });
  w += bdWidget('demo-badge-fire', { type: 'badge', text: 'Burning', icon: '🔥', color: '#f97316', variant: 'outline', align: 'center', order: 9 });

  <span class="text-bd-text-muted">// Counters (positive and negative delta)</span>
  w += bdWidget('demo-counter-up', { type: 'counter', icon: '⚔️', value: 24, delta: 3, color: '#60a5fa', align: 'center', order: 10 });
  w += bdWidget('demo-counter-down', { type: 'counter', icon: '💔', value: 12, delta: -5, color: '#f472b6', align: 'center', order: 11 });

  <span class="text-bd-text-muted">// Icons with tooltips</span>
  w += bdWidget('demo-icon-heart', { type: 'icon', icon: '❤️', color: '#ef4444', tooltip: 'Health', align: 'center', order: 12 });
  w += bdWidget('demo-icon-star', { type: 'icon', icon: '⭐', color: '#fbbf24', tooltip: 'Reputation', align: 'center', order: 13 });
  w += bdWidget('demo-icon-moon', { type: 'icon', icon: '🌙', color: '#94a3b8', tooltip: 'Night', align: 'center', order: 14 });

  <span class="text-bd-text-muted">// ========== Character Info ==========</span>

  w += bdWidget('demo-panel', {
    type: 'panel', title: 'Character', align: 'left',
    items: [
      { label: 'Name', value: 'Adventurer', color: '#f472b6' },
      { label: 'Class', value: 'Warrior', color: '#60a5fa' },
      { label: 'Level', value: '12', color: '#a855f7' }
    ], order: 1
  });

  <span class="text-bd-text-muted">// ========== Inventory/Quest ==========</span>

  w += bdWidget('demo-text', { type: 'text', text: '⚡ Quest: Find the Artifact', style: { color: '#fbbf24', fontWeight: '500' }, align: 'right', order: 1 });
  w += bdWidget('demo-list', {
    type: 'list', title: 'Inventory', align: 'right',
    items: [
      { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
      { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
      { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
      { icon: '📜', text: 'Map' }
    ], order: 2
  });

  return { text: text + w };
};
modifier(text);</code></pre>
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
  AlertTriangle, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, 
  Terminal, Zap, Layout, Settings, LayoutDashboard, Library,
  MessageSquare, Code, Smartphone, Radio, Bug, Star,
  HelpCircle, CheckCircle, ExternalLink,
  Code2, Clock, Activity, Hash, FileText, Trash2,
  RefreshCw, Plus, Check, ChevronDown, ChevronUp
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'intro', label: 'What is BetterScripts?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'widget-types', label: 'Widget Types' },
  { id: 'widget-properties', label: 'Widget Properties' },
  { id: 'widget-positions', label: 'Widget Positions' },
  { id: 'message-types', label: 'Message Types' },
  { id: 'custom-html', label: 'Custom HTML' },
  { id: 'advanced-features', label: 'Advanced Features' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'examples', label: 'Complete Examples' }
]

// Example script tab state
const exampleTab = ref({
  counter: 'library',
  time: 'library',
  showcase: 'library'
})

// Track which guide sections are expanded (all expanded by default)
const expandedGuideSections = ref(new Set(guideSections.map(s => s.id)))

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
  expandedGuideSections.value = new Set(guideSections.map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
