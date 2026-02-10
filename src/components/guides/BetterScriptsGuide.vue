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
              statistics, progress bars, and custom content—delivering rich visual feedback that surpasses the 
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

function bdUpdate(id, config) {
  return bdMessage({ type: 'widget', widgetId: id, action: 'update', config });
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
    value: state.game.hp, max: 100, color: <span class="text-bd-green">'#22c55e'</span> 
  });
  widgets += bdWidget(<span class="text-bd-green">'gold'</span>, { 
    type: <span class="text-bd-green">'stat'</span>, label: <span class="text-bd-green">'Gold'</span>, 
    value: state.game.gold, color: <span class="text-bd-green">'#fbbf24'</span> 
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
              BetterScripts supports <strong>10 widget types</strong> for different use cases. Each card below shows a 
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

                <!-- Divider -->
                <div class="p-3 rounded bg-bd-bg-tertiary space-y-3">
                  <h4 class="text-sm font-medium text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-gray/20 text-bd-text-muted">divider</span>
                    Visual Separator
                  </h4>
                  <!-- Preview -->
                  <div class="widget-preview">
                    <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-1">Preview</div>
                    <div class="flex items-center gap-2 min-w-[180px] px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <div class="flex-1 h-px" style="background: #60a5fa;"></div>
                      <span class="text-[10px] uppercase tracking-wider" style="color: #60a5fa;">Stats</span>
                      <div class="flex-1 h-px" style="background: #60a5fa;"></div>
                    </div>
                  </div>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">{ type: 'divider', label: 'Stats', color: '#60a5fa' }</pre>
                  <p class="text-xs text-bd-text-muted">Horizontal line with optional centered label.</p>
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
                      <td class="py-2 font-mono text-xs text-bd-cyan">position</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs">Widget area: <code class="text-bd-green">top</code> (default), <code class="text-bd-blue">left</code>, <code class="text-bd-purple">right</code></td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">order</td>
                      <td class="py-2 text-xs">number</td>
                      <td class="py-2 text-xs">Display order within position (lower = first)</td>
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
                    <li><code class="text-bd-cyan">label</code> — Widget label (stat, bar, badge, divider)</li>
                    <li><code class="text-bd-cyan">value</code> — Display value (stat, bar, counter, panel items)</li>
                    <li><code class="text-bd-cyan">text</code> — Text content (text, badge)</li>
                    <li><code class="text-bd-cyan">title</code> — Container title (panel, list)</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Visual Elements</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li><code class="text-bd-cyan">icon</code> — Emoji/icon (badge, list items, icon, counter)</li>
                    <li><code class="text-bd-cyan">items</code> — Array of items (panel, list)</li>
                    <li><code class="text-bd-cyan">html</code> — Custom HTML (custom widget)</li>
                    <li><code class="text-bd-cyan">style</code> — CSS styles (text, custom)</li>
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
                    <li><code class="text-bd-cyan">value</code> — Current value (number)</li>
                    <li><code class="text-bd-cyan">max</code> — Maximum value (number, default: 100)</li>
                    <li><code class="text-bd-cyan">showValue</code> — Show value text (boolean, default: true)</li>
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
                    <li><code class="text-bd-cyan">variant</code> — Badge style: <code class="text-bd-green">subtle</code> (default), <code class="text-bd-blue">solid</code>, <code class="text-bd-purple">outline</code></li>
                    <li><code class="text-bd-cyan">text</code> — Badge text content</li>
                    <li><code class="text-bd-cyan">icon</code> — Optional emoji/icon prefix</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Example</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto">{ 
  type: 'badge',
  text: 'Buffed',
  icon: '⚡',
  color: '#fbbf24',
  variant: 'solid'
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
              Widgets can be placed in three distinct areas using the <code class="text-bd-cyan">position</code> property. 
              Each position adapts responsively to different screen sizes.
            </p>

            <!-- Visual Layout Diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Layout Diagram</div>
              <div class="rounded-lg border border-bd-border-subtle overflow-hidden bg-[#0d0d1a]">
                <!-- Top Bar -->
                <div class="px-3 py-2 border-b border-[#2a2a3e]" style="background: rgba(34,197,94,0.08);">
                  <div class="flex items-center justify-center gap-2 flex-wrap">
                    <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[10px] text-[#8888aa]">HP</span>
                      <div class="w-16 h-1.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:75%;background:#22c55e;"></div></div>
                    </div>
                    <div class="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                      <span class="text-[10px] text-[#8888aa]">Gold</span>
                      <span class="text-[10px] font-semibold" style="color:#fbbf24;">1250</span>
                    </div>
                    <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px]" style="background:rgba(168,85,247,0.15);color:#a855f7;">☠️ Poisoned</div>
                  </div>
                  <div class="text-center mt-1">
                    <span class="text-[9px] text-bd-green font-mono hidden sm:inline">position: 'top'</span>
                  </div>
                </div>
                <!-- Body with sidebars -->
                <div class="flex min-h-[100px]">
                  <!-- Left Sidebar -->
                  <div class="w-28 border-r border-[#2a2a3e] p-2 hidden sm:block" style="background: rgba(59,130,246,0.05);">
                    <div class="text-[9px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1 pb-0.5 border-b border-[#2a2a3e]">Character</div>
                    <div class="space-y-0.5">
                      <div class="flex justify-between text-[9px]"><span class="text-[#666]">LVL</span><span class="text-[#aaa]">5</span></div>
                      <div class="flex justify-between text-[9px]"><span class="text-[#666]">STR</span><span style="color:#ef4444;">18</span></div>
                      <div class="flex justify-between text-[9px]"><span class="text-[#666]">DEX</span><span style="color:#22c55e;">14</span></div>
                    </div>
                    <div class="text-[8px] text-bd-blue font-mono mt-2">position: 'left'</div>
                  </div>
                  <!-- Main Content Area -->
                  <div class="flex-1 p-3 flex items-center justify-center">
                    <div class="text-center">
                      <div class="text-xs text-[#555] italic">Adventure Text Area</div>
                      <div class="text-[10px] text-[#444] mt-1">Your story content appears here...</div>
                    </div>
                  </div>
                  <!-- Right Sidebar -->
                  <div class="w-28 border-l border-[#2a2a3e] p-2 hidden sm:block" style="background: rgba(168,85,247,0.05);">
                    <div class="text-[9px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1 pb-0.5 border-b border-[#2a2a3e]">Inventory</div>
                    <div class="space-y-0.5">
                      <div class="text-[9px] text-[#aaa]">🗡️ Iron Sword</div>
                      <div class="text-[9px] text-[#aaa]">🛡️ Shield</div>
                      <div class="text-[9px] text-[#aaa]">🧪 Potion x3</div>
                    </div>
                    <div class="text-[8px] text-bd-purple font-mono mt-2">position: 'right'</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Top Position -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-8 h-8 rounded bg-bd-green/20 flex items-center justify-center">
                    <ArrowUp class="w-4 h-4 text-bd-green" />
                  </div>
                  <h3 class="font-semibold text-bd-text-primary">Top</h3>
                  <code class="text-xs text-bd-green ml-auto">position: 'top'</code>
                </div>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Horizontal bar at the top of the game area. Best for essential stats and frequently accessed information.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('hp', { 
  type: 'bar', 
  position: 'top',
  label: 'HP', 
  value: 85 
});</pre>
                <div class="mt-3 p-2 rounded bg-bd-green/10 border border-bd-green/30">
                  <p class="text-xs text-bd-text-muted">
                    <strong>Recommended:</strong> Use top position for mobile-friendly widgets that all players can see.
                  </p>
                </div>
              </div>

              <!-- Left Position -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-8 h-8 rounded bg-bd-blue/20 flex items-center justify-center">
                    <ArrowLeft class="w-4 h-4 text-bd-blue" />
                  </div>
                  <h3 class="font-semibold text-bd-text-primary">Left</h3>
                  <code class="text-xs text-bd-blue ml-auto">position: 'left'</code>
                </div>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Vertical sidebar on the left side. Good for character information and detailed stats.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('char', { 
  type: 'panel', 
  position: 'left',
  title: 'Character',
  items: [...] 
});</pre>
                <div class="mt-3 p-2 rounded bg-bd-blue/10 border border-bd-blue/30">
                  <p class="text-xs text-bd-text-muted">
                    <strong>Note:</strong> Hidden on screens smaller than 768px.
                  </p>
                </div>
              </div>

              <!-- Right Position -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-8 h-8 rounded bg-bd-purple/20 flex items-center justify-center">
                    <ArrowRight class="w-4 h-4 text-bd-purple" />
                  </div>
                  <h3 class="font-semibold text-bd-text-primary">Right</h3>
                  <code class="text-xs text-bd-purple ml-auto">position: 'right'</code>
                </div>
                <p class="text-sm text-bd-text-secondary mb-3">
                  Vertical sidebar on the right side. Ideal for inventory, quest lists, and auxiliary information.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('inv', { 
  type: 'list', 
  position: 'right',
  title: 'Inventory',
  items: [...] 
});</pre>
                <div class="mt-3 p-2 rounded bg-bd-purple/10 border border-bd-purple/30">
                  <p class="text-xs text-bd-text-muted">
                    <strong>Note:</strong> Hidden on screens smaller than 768px.
                  </p>
                </div>
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
                  <li>• <strong>&lt; 480px:</strong> Compact inline layout, panels/lists hidden</li>
                  <li>• <strong>&lt; 768px:</strong> Left/right sidebars hidden, smaller widgets</li>
                  <li>• <strong>Default:</strong> Standard sizing</li>
                  <li>• <strong>≥ 1440px:</strong> Larger widgets for QHD displays</li>
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
    value: 85 
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
                  <p class="text-xs text-bd-text-secondary">Create a new widget (or replace an existing one with the same ID).</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdWidget('hp-bar', { type: 'bar', label: 'HP', value: 85, max: 100 });</pre>
                </div>

                <!-- bdUpdate -->
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <RefreshCw class="w-3.5 h-3.5 text-bd-blue" />
                    <code class="text-sm font-semibold text-bd-blue">bdUpdate(id, config)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Update specific properties of an existing widget. Auto-creates if it doesn't exist.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdUpdate('hp-bar', { value: 50 }); <span class="text-bd-text-muted">// only changes value</span></pre>
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
                  <p class="text-xs text-bd-text-secondary">Low-level helper — sends any raw protocol message. The other helpers are built on top of this. Use it for pings, registration, or custom message types.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdMessage({ type: 'ping', data: 'hello' });           <span class="text-bd-text-muted">// test connectivity</span>
bdMessage({ type: 'register', scriptId: 'my-rpg',     <span class="text-bd-text-muted">// announce your script</span>
            scriptName: 'My RPG', version: '1.0' });</pre>
                </div>
              </div>

              <div class="mt-3 p-2 rounded bg-bd-emerald/10 border border-bd-emerald/30">
                <p class="text-xs text-bd-text-muted">
                  <strong class="text-bd-text-primary">Tip:</strong> Prefer <code class="text-bd-blue">bdUpdate</code> over <code class="text-bd-green">bdWidget</code> for value changes — it merges into the existing config instead of replacing it entirely.
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
                padding, margin, border, border-radius,<br>
                width, height, max-width, max-height,<br>
                display, flex, flex-direction, justify-content, align-items, gap,<br>
                opacity, visibility, overflow, position, top, right, bottom, left
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
        '</div>'
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
        '</table>'
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
              Unlock the full potential of BetterScripts with advanced features like condensed mode, 
              responsive design, and JavaScript events.
            </p>

            <!-- Condensed Mode -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Minimize2 class="w-4 h-4 text-bd-yellow" />
                Condensed Mode
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Reduce widget sizes for a more compact display. Useful for smaller screens or when you want to minimize UI clutter.
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">Browser Console Control</h4>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><span class="text-bd-comment">// Toggle condensed mode</span>
window.betterScripts.toggleCondensedMode();

<span class="text-bd-comment">// Set explicitly</span>
window.betterScripts.setCondensedMode(true);   <span class="text-bd-comment">// Enable</span>
window.betterScripts.setCondensedMode(false);  <span class="text-bd-comment">// Disable</span></pre>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-bd-text-primary mb-2">What Gets Reduced</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Widget padding and gaps</li>
                    <li>• Font sizes across all widget types</li>
                    <li>• Bar heights and minimum widths</li>
                    <li>• Panel and list dimensions</li>
                  </ul>
                </div>
              </div>
            </div>

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
                Enable detailed logging to troubleshoot widget creation and message processing.
              </p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><span class="text-bd-comment">// Enable debug mode</span>
window.betterScripts.debug = true;

<span class="text-bd-comment">// Disable debug mode</span>
window.betterScripts.debug = false;</pre>
              <div class="p-2 rounded bg-bd-green/10 border border-bd-green/30 mt-2">
                <p class="text-xs text-bd-text-muted">
                  With debug mode enabled, you'll see detailed logs in the console for message parsing, widget creation, and processing steps.
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
                <li>• <strong>Use update action</strong> for value changes instead of recreating widgets</li>
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
                  <li><strong>Always strip context</strong> — Use Context Modifier to remove <code class="text-bd-green">[[BD:...:BD]]</code> tags</li>
                  <li><strong>Use unique IDs</strong> — Prefix with script name: <code class="text-bd-cyan">myscript_hp</code>, <code class="text-bd-cyan">myscript_gold</code></li>
                  <li><strong>Initialize state safely</strong> — <code class="text-bd-purple">state.x = state.x ?? defaultValue</code></li>
                  <li><strong>Prefer update action</strong> — For value changes, preserves existing config</li>
                  <li><strong>Focus on top position</strong> — Mobile players can't see sidebars</li>
                </ul>
              </div>

              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Common Pitfalls
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-2">
                  <li><strong>Forgetting context modifier</strong> — AI will repeat protocol tags</li>
                  <li><strong>Widget ID conflicts</strong> — Use prefixes to avoid clashes</li>
                  <li><strong>Overusing custom HTML</strong> — Built-in widgets are often better</li>
                  <li><strong>Ignoring mobile layout</strong> — Sidebars hidden on small screens</li>
                  <li><strong>Not handling errors</strong> — Check console for widget errors</li>
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
function bdUpdate(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'update', config: cfg }); }

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
  widgets += bdUpdate(<span class="text-bd-green">'hp-bar'</span>, { value: state.game.hp });
  widgets += bdUpdate(<span class="text-bd-green">'gold'</span>, { value: state.game.gold });
  
  <span class="text-bd-comment">// Conditional widgets</span>
  <span class="text-bd-purple">if</span> (state.game.hp < 30) {
    widgets += bdWidget(<span class="text-bd-green">'warning'</span>, {
      type: <span class="text-bd-green">'text'</span>,
      text: <span class="text-bd-green">'⚠️ Low Health!'</span>,
      style: { color: <span class="text-bd-green">'#ef4444'</span>, fontWeight: <span class="text-bd-green">'bold'</span> }
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
                    <li>• Group related widgets with dividers</li>
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
                    <td class="py-3">Use <code class="text-bd-cyan">update</code> action, check widget ID matches exactly, verify state changes</td>
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
                    <td class="py-3">Use <code class="text-bd-cyan">position: 'top'</code> for mobile-friendly widgets, sidebars hidden on small screens</td>
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
              Ready-to-use examples with visual previews. Each example includes all three script parts 
              (Library, Context Modifier, Output Modifier) needed for a complete implementation.
            </p>

            <!-- ==================== EXAMPLE 1: Simple Status Display ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Activity class="w-5 h-5 text-bd-green flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">Simple Status Display</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Minimal setup for basic status tracking</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-green/20 text-bd-green">Beginner</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex items-center gap-2 flex-wrap">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                    <span class="text-[11px] text-[#8888aa]">HP</span>
                    <span class="text-[11px] font-semibold" style="color: #22c55e;">100</span>
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                    <span class="text-[11px] text-[#8888aa]">Gold</span>
                    <span class="text-[11px] font-semibold" style="color: #fbbf24;">0</span>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style="background: rgba(96,165,250,0.15); color: #60a5fa;">📍 Town</span>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.simple = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.simple === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.simple = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.simple === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context Modifier</span>
                  </button>
                  <button @click="exampleTab.simple = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.simple === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output Modifier</span>
                  </button>
                </div>

                <pre v-if="exampleTab.simple === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Initialize game state safely</span>
state.status = state.status ?? { hp: 100, gold: 0, location: 'Town' };

<span class="text-bd-text-muted">// BetterScripts helpers</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) {
  return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg });
}</code></pre>

                <pre v-if="exampleTab.simple === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Strip protocol tags so the AI never sees them</span>
const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.simple === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  <span class="text-bd-text-muted">// Example: lose 1 HP per turn</span>
  state.status.hp = Math.max(0, state.status.hp - 1);
  
  let widgets = '';
  widgets += bdWidget('hp', { type: 'stat', label: 'HP', value: state.status.hp, color: '#22c55e' });
  widgets += bdWidget('gold', { type: 'stat', label: 'Gold', value: state.status.gold, color: '#fbbf24' });
  widgets += bdWidget('location', { type: 'badge', text: state.status.location, icon: '📍', color: '#60a5fa' });
  
  return { text: text + widgets };
};
modifier(text);</code></pre>
              </div>
            </div>

            <!-- ==================== EXAMPLE 2: RPG Stats System ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Sword class="w-5 h-5 text-bd-indigo flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">RPG Stats System</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">HP, MP, experience bars, character panel, and status effects</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-amber/20 text-bd-amber">Intermediate</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex gap-4">
                  <!-- Top Bars -->
                  <div class="flex-1 space-y-1.5">
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-7">HP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:85%;background:#22c55e;"></div></div>
                      <span class="text-[10px] text-[#8888aa]">85/100</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-7">MP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:70%;background:#3b82f6;"></div></div>
                      <span class="text-[10px] text-[#8888aa]">35/50</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-7">EXP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:45%;background:#a855f7;"></div></div>
                    </div>
                  </div>
                  <!-- Side Panel -->
                  <div class="hidden sm:block px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[110px]">
                    <div class="text-[9px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1 pb-0.5 border-b border-[#2a2a3e]">Level 3 Character</div>
                    <div class="space-y-0.5">
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">HP</span><span style="color:#22c55e;">85/100</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">MP</span><span style="color:#3b82f6;">35/50</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-[#666]">Gold</span><span style="color:#fbbf24;">250</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.rpg = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.rpg === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.rpg = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.rpg === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context Modifier</span>
                  </button>
                  <button @click="exampleTab.rpg = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.rpg === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output Modifier</span>
                  </button>
                </div>

                <pre v-if="exampleTab.rpg === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Initialize character state</span>
state.character = state.character ?? {
  hp: 100, maxHp: 100, mp: 50, maxMp: 50,
  exp: 0, expToNext: 100, level: 1, gold: 0, status: []
};

<span class="text-bd-text-muted">// BetterScripts helpers</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdUpdate(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'update', config: cfg }); }

<span class="text-bd-text-muted">// Game logic</span>
function takeDamage(amount) {
  state.character.hp = Math.max(0, state.character.hp - amount);
  return state.character.hp;
}

function heal(amount) {
  state.character.hp = Math.min(state.character.maxHp, state.character.hp + amount);
  return state.character.hp;
}

function addExp(amount) {
  state.character.exp += amount;
  while (state.character.exp >= state.character.expToNext) {
    state.character.exp -= state.character.expToNext;
    state.character.level++;
    state.character.expToNext = state.character.level * 100;
    state.character.maxHp += 10;
    state.character.maxMp += 5;
    state.character.hp = state.character.maxHp;
    state.character.mp = state.character.maxMp;
  }
}

function addStatus(status) {
  if (!state.character.status.includes(status)) state.character.status.push(status);
}

function removeStatus(status) {
  state.character.status = state.character.status.filter(s => s !== status);
}</code></pre>

                <pre v-if="exampleTab.rpg === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Strip protocol tags so the AI never sees them</span>
const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.rpg === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  let widgets = '';
  
  <span class="text-bd-text-muted">// HP Bar (turns red when low)</span>
  widgets += bdUpdate('hp-bar', {
    type: 'bar', label: 'HP',
    value: state.character.hp, max: state.character.maxHp,
    color: state.character.hp &lt; 30 ? '#ef4444' : '#22c55e', order: 1
  });
  
  <span class="text-bd-text-muted">// MP Bar</span>
  widgets += bdUpdate('mp-bar', {
    type: 'bar', label: 'MP',
    value: state.character.mp, max: state.character.maxMp,
    color: '#3b82f6', order: 2
  });
  
  <span class="text-bd-text-muted">// Experience Bar (no value text)</span>
  widgets += bdUpdate('exp-bar', {
    type: 'bar', label: 'EXP',
    value: state.character.exp, max: state.character.expToNext,
    color: '#a855f7', showValue: false, order: 3
  });
  
  <span class="text-bd-text-muted">// Character Panel (left sidebar)</span>
  widgets += bdUpdate('char-panel', {
    type: 'panel', position: 'left',
    title: `Level ${state.character.level} Character`,
    items: [
      { label: 'HP', value: `${state.character.hp}/${state.character.maxHp}`, color: '#22c55e' },
      { label: 'MP', value: `${state.character.mp}/${state.character.maxMp}`, color: '#3b82f6' },
      { label: 'EXP', value: `${state.character.exp}/${state.character.expToNext}`, color: '#a855f7' },
      { label: 'Gold', value: state.character.gold, color: '#fbbf24' }
    ], order: 1
  });
  
  <span class="text-bd-text-muted">// Status Effects (left sidebar, only if active)</span>
  if (state.character.status.length > 0) {
    widgets += bdUpdate('status-effects', {
      type: 'list', position: 'left', title: 'Status Effects',
      items: state.character.status.map(s => ({ text: s, color: '#f97316' })),
      order: 2
    });
  }
  
  return { text: text + widgets };
};
modifier(text);</code></pre>
              </div>
            </div>

            <!-- ==================== EXAMPLE 3: Inventory System ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Package class="w-5 h-5 text-bd-blue flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">Inventory System</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Item management with weight tracking and dynamic list</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-red/20 text-bd-red">Advanced</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle" style="background: #0d0d1a;">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex gap-4">
                  <!-- Top Widgets -->
                  <div class="flex-1 space-y-1.5">
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-[#8888aa] w-12">Weight</span>
                      <div class="flex-1 h-2.5 rounded-full bg-[#2a2a3e] overflow-hidden"><div class="h-full rounded-full" style="width:29%;background:#60a5fa;"></div></div>
                      <span class="text-[10px] text-[#8888aa]">29/100</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1a1a2e] border border-[#2a2a3e]">
                        <span class="text-sm">💰</span>
                        <span class="text-[11px] font-semibold" style="color: #fbbf24;">350</span>
                        <span class="text-[10px] font-medium" style="color: #22c55e;">+50</span>
                      </div>
                    </div>
                  </div>
                  <!-- Inventory List -->
                  <div class="hidden sm:block px-2.5 py-1.5 rounded bg-[#1a1a2e] border border-[#2a2a3e] min-w-[130px]">
                    <div class="text-[9px] font-semibold text-[#8888aa] uppercase tracking-wider mb-1 pb-0.5 border-b border-[#2a2a3e]">Inventory</div>
                    <div class="space-y-0.5">
                      <div class="text-[10px]" style="color:#60a5fa;">🗡️ Iron Sword x1</div>
                      <div class="text-[10px]" style="color:#60a5fa;">🛡️ Wooden Shield x1</div>
                      <div class="text-[10px]" style="color:#60a5fa;">🧪 Health Potion x3</div>
                      <div class="text-[10px]" style="color:#60a5fa;">🎽 Leather Armor x1</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Script Tabs -->
              <div class="px-4 py-3 space-y-3 bg-bd-bg-primary">
                <div class="flex gap-1 border-b border-bd-border-subtle pb-2">
                  <button @click="exampleTab.inventory = 'library'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.inventory === 'library' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><Library class="w-3 h-3" /> Library</span>
                  </button>
                  <button @click="exampleTab.inventory = 'context'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.inventory === 'context' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowLeft class="w-3 h-3" /> Context Modifier</span>
                  </button>
                  <button @click="exampleTab.inventory = 'output'" class="px-3 py-1 rounded text-xs font-medium transition-colors" :class="exampleTab.inventory === 'output' ? 'bg-bd-accent-primary/20 text-bd-accent-light' : 'text-bd-text-muted hover:text-bd-text-primary'">
                    <span class="flex items-center gap-1"><ArrowRight class="w-3 h-3" /> Output Modifier</span>
                  </button>
                </div>

                <pre v-if="exampleTab.inventory === 'library'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Initialize inventory</span>
state.inventory = state.inventory ?? {
  items: [], maxWeight: 100, currentWeight: 0, gold: 0
};

<span class="text-bd-text-muted">// Item database</span>
const ITEMS = {
  'sword':  { name: 'Iron Sword',    weight: 5,  icon: '🗡️', value: 50 },
  'shield': { name: 'Wooden Shield', weight: 8,  icon: '🛡️', value: 30 },
  'potion': { name: 'Health Potion', weight: 1,  icon: '🧪', value: 10 },
  'armor':  { name: 'Leather Armor', weight: 15, icon: '🎽', value: 75 }
};

<span class="text-bd-text-muted">// BetterScripts helpers</span>
function bdMessage(msg) { return `[[BD:${JSON.stringify(msg)}:BD]]`; }
function bdUpdate(id, cfg) {
  return bdMessage({ type: 'widget', widgetId: id, action: 'update', config: cfg });
}

<span class="text-bd-text-muted">// Inventory management</span>
function addItem(itemId, quantity = 1) {
  const item = ITEMS[itemId];
  if (!item) return false;
  
  const totalWeight = state.inventory.currentWeight + (item.weight * quantity);
  if (totalWeight > state.inventory.maxWeight) return false;
  
  const existing = state.inventory.items.find(i => i.id === itemId);
  if (existing) { existing.quantity += quantity; }
  else { state.inventory.items.push({ id: itemId, quantity }); }
  
  state.inventory.currentWeight = totalWeight;
  return true;
}

function removeItem(itemId, quantity = 1) {
  const index = state.inventory.items.findIndex(i => i.id === itemId);
  if (index === -1) return false;
  
  const item = state.inventory.items[index];
  const itemData = ITEMS[itemId];
  
  if (item.quantity &lt;= quantity) {
    state.inventory.items.splice(index, 1);
    state.inventory.currentWeight -= itemData.weight * item.quantity;
  } else {
    item.quantity -= quantity;
    state.inventory.currentWeight -= itemData.weight * quantity;
  }
  return true;
}</code></pre>

                <pre v-if="exampleTab.inventory === 'context'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Strip protocol tags so the AI never sees them</span>
const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>

                <pre v-if="exampleTab.inventory === 'output'" class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  let widgets = '';
  
  <span class="text-bd-text-muted">// Weight bar (turns red when near capacity)</span>
  widgets += bdUpdate('weight', {
    type: 'bar', label: 'Weight',
    value: state.inventory.currentWeight,
    max: state.inventory.maxWeight,
    color: state.inventory.currentWeight > state.inventory.maxWeight * 0.8
      ? '#ef4444' : '#60a5fa',
    order: 1
  });
  
  <span class="text-bd-text-muted">// Gold counter</span>
  widgets += bdUpdate('gold', {
    type: 'counter', icon: '💰',
    value: state.inventory.gold,
    color: '#fbbf24', order: 2
  });
  
  <span class="text-bd-text-muted">// Inventory list (right sidebar)</span>
  if (state.inventory.items.length > 0) {
    const inventoryItems = state.inventory.items.map(item => {
      const itemData = ITEMS[item.id];
      return {
        icon: itemData.icon,
        text: `${itemData.name} x${item.quantity}`,
        color: '#60a5fa'
      };
    });
    
    widgets += bdUpdate('inventory', {
      type: 'list', title: 'Inventory',
      position: 'right', items: inventoryItems, order: 1
    });
  }
  
  return { text: text + widgets };
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
  MessageSquare, Code, Smartphone, Minimize2, Radio, Bug, Star,
  HelpCircle, CheckCircle, ExternalLink,
  Code2, Sword, Package, Activity, Hash, FileText, Trash2,
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
  simple: 'library',
  rpg: 'library',
  inventory: 'library'
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
