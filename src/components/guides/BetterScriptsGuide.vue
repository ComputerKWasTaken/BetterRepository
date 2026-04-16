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

      <!-- ==================== SECTION 1: Introduction ==================== -->
      <section id="guide-intro" class="card">
        <button @click="toggleGuideSection('intro')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-emerald" />
            Introduction
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('intro')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              <strong>BetterScripts</strong> is a BetterDungeon feature that lets AI Dungeon scripts create 
              <strong>dynamic UI widgets</strong> - stat displays, progress bars, inventory panels, status badges, 
              and more, rendered in a top bar above the story text.
            </p>

            <!-- How It Works (compact flow) -->
            <div class="p-4 rounded-lg bg-bd-emerald/10 border border-bd-emerald/30">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-emerald" />
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
              <p class="text-xs text-bd-text-muted text-center mt-3">
                Scripts embed <code class="text-bd-emerald">[[BD:{json}:BD]]</code> tags in their output. 
                BetterDungeon intercepts them, renders widgets, and strips the tags from view.
              </p>
            </div>

            <!-- Scripting Pipeline Context -->
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Library class="w-4 h-4 text-bd-blue" />
                Where BetterScripts Fits in the Scripting Pipeline
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Player Input</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">onInput</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-semibold">Context Modifier (strip tags)</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">AI Generation</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-emerald/20 border border-bd-emerald/30 text-bd-emerald font-semibold">Output Modifier (emit widgets)</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Display</div>
              </div>
              <p class="text-xs text-bd-text-muted mt-2">BetterScripts uses two hooks from AI Dungeon’s scripting system: the <strong>Context Modifier</strong> (onModelContext) strips protocol tags so the AI never sees them, and the <strong>Output Modifier</strong> (onOutput) appends widget protocol tags after each AI response. The <strong>Library</strong> runs before both hooks and initializes persistent state.</p>
            </div>

            <!-- Capabilities + Requirements side by side -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  Capabilities
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• 9 widget types (stat, bar, badge, panel, list, ...)</li>
                  <li>• Three-zone layout (left / center / right)</li>
                  <li>• Responsive design for all screen sizes</li>
                  <li>• Custom HTML with sanitization</li>
                  <li>• Real-time updates via idempotent creates</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Requirements
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• <strong>BetterDungeon</strong> browser extension installed</li>
                  <li>• AI Dungeon adventure with scripting enabled</li>
                  <li>• Basic JavaScript knowledge</li>
                  <li>• A Context Modifier to strip protocol tags</li>
                </ul>
                <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" class="inline-flex items-center gap-1.5 mt-3 text-xs text-bd-emerald hover:underline">
                  <ExternalLink class="w-3 h-3" />
                  Get BetterDungeon (Chrome, Edge, Firefox)
                </a>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ==================== SECTION 2: Getting Started ==================== -->
      <section id="guide-getting-started" class="card">
        <button @click="toggleGuideSection('getting-started')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-yellow" />
            Getting Started
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('getting-started') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('getting-started')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Three files, three minutes. Add these to your AI Dungeon scenario and you're live.
            </p>

            <div class="p-2 rounded bg-bd-amber/5 border border-bd-amber/20">
              <p class="text-xs text-bd-text-secondary"><strong>State persistence:</strong> Use <code class="text-bd-cyan">state.game = state.game ?? { ... }</code> with nullish coalescing (<code>??</code>) in the Library to initialize state only once. State is serialized between turns, so stick to plain data (strings, numbers, arrays, objects). Avoid methods or circular references.</p>
            </div>

            <!-- Step 1: Library -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">1</div>
                <h3 class="font-semibold text-bd-text-primary">Library: State & Helpers</h3>
              </div>
              <p class="text-xs text-bd-text-muted mb-2">Initialize persistent state and define the protocol helper functions.</p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code><span class="text-bd-text-muted">// Persistent game state (survives across turns)</span>
state.game = state.game ?? { hp: 100, gold: 0 };

<span class="text-bd-text-muted">// BetterScripts protocol helpers</span>
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

            <!-- Step 2: Context Modifier -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">2</div>
                <h3 class="font-semibold text-bd-text-primary">Context Modifier: Strip Tags</h3>
              </div>
              <div class="p-2 rounded bg-bd-pink/10 border border-bd-pink/30 mb-2">
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-text-primary">Required.</strong> Without this, the AI will see and repeat the raw protocol tags.
                </p>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  return { text: text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '') };
};
modifier(text);</code></pre>
            </div>

            <!-- Step 3: Output Modifier -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-6 h-6 rounded-full bg-bd-emerald text-white text-xs flex items-center justify-center font-bold">3</div>
                <h3 class="font-semibold text-bd-text-primary">Output Modifier: Create Widgets</h3>
              </div>
              <p class="text-xs text-bd-text-muted mb-2">Append widget protocol strings to the AI output each turn.</p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><code>const modifier = (text) => {
  <span class="text-bd-text-muted">// Game logic</span>
  state.game.hp = Math.max(0, state.game.hp - 5);
  state.game.gold += 10;

  <span class="text-bd-text-muted">// Build widget strings</span>
  let widgets = '';
  widgets += bdWidget('hp-bar', {
    type: 'bar', label: 'HP',
    value: state.game.hp, max: 100,
    color: 'var(--bd-success)', align: 'left', order: 1
  });
  widgets += bdWidget('gold', {
    type: 'stat', label: 'Gold',
    value: state.game.gold, color: 'var(--bd-amber)',
    align: 'right', order: 1
  });

  return { text: text + widgets };
};
modifier(text);</code></pre>
            </div>

            <!-- Success callout -->
            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30 flex items-start gap-3">
              <Check class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-semibold text-bd-text-primary">Done! Widgets will appear at the top of the adventure page.</p>
                <p class="text-xs text-bd-text-muted mt-1">
                  <code class="text-bd-emerald">bdWidget</code> creates new widgets or updates existing ones in place - 
                  no need for separate create/update logic. Protocol tags are stripped from the visible story text automatically.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ==================== SECTION 3: Widget Reference ==================== -->
      <section id="guide-widgets" class="card">
        <button @click="toggleGuideSection('widgets')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-blue" />
            Widget Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('widgets') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('widgets')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              BetterScripts provides <strong>9 widget types</strong>. Each card below shows a live preview, its config, and type-specific properties.
            </p>

            <!-- ===== Common Properties (shared by all widgets) ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Common Properties <span class="text-xs text-bd-text-muted font-normal">(all widget types)</span></h3>
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
                      <td class="py-2 text-xs"><strong>Required.</strong> One of: <code>stat</code>, <code>bar</code>, <code>text</code>, <code>icon</code>, <code>badge</code>, <code>counter</code>, <code>panel</code>, <code>list</code>, <code>custom</code></td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">align</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs">Zone placement: <code class="text-bd-blue">'left'</code>, <code class="text-bd-green">'center'</code> (default), <code class="text-bd-purple">'right'</code></td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">order</td>
                      <td class="py-2 text-xs">number</td>
                      <td class="py-2 text-xs">Sort order within the zone (lower numbers appear first)</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-cyan">color</td>
                      <td class="py-2 text-xs">string</td>
                      <td class="py-2 text-xs">CSS color for the widget's primary accent (values, fills, tints)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- ===== Stat ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-cyan/20 text-bd-cyan">stat</span>
                    Label + Value
                  </h3>
                  <p class="text-xs text-bd-text-muted">Compact label-value pair. Great for currency, level, or any single number.</p>
                  <div class="text-xs text-bd-text-secondary space-y-0.5">
                    <div><code class="text-bd-cyan">label</code> - display label &nbsp; <code class="text-bd-cyan">value</code> - display value</div>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] text-bd-text-muted">Gold</span>
                    <span class="text-[11px] font-semibold text-bd-amber">1,250</span>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'stat', label: 'Gold', value: 1250, color: '#fbbf24', align: 'right', order: 1 }</pre>
            </div>

            <!-- ===== Bar ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-green/20 text-bd-green">bar</span>
                    Progress Bar
                  </h3>
                  <p class="text-xs text-bd-text-muted">Visual fill bar with optional value text. Ideal for HP, XP, or any bounded quantity.</p>
                  <div class="text-xs text-bd-text-secondary space-y-0.5">
                    <div><code class="text-bd-cyan">label</code> - bar label &nbsp; <code class="text-bd-cyan">value</code> - current value &nbsp; <code class="text-bd-cyan">max</code> - maximum (default 100)</div>
                    <div><code class="text-bd-cyan">showValue</code> - show "value/max" text (default true)</div>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-flex items-center gap-2 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong min-w-[160px]">
                    <span class="text-[11px] text-bd-text-muted w-6">HP</span>
                    <div class="flex-1 h-2.5 rounded-full bg-bd-bg-elevated overflow-hidden">
                      <div class="h-full rounded-full bg-bd-success" style="width: 75%;"></div>
                    </div>
                    <span class="text-[10px] text-bd-text-muted">75/100</span>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'bar', label: 'HP', value: 75, max: 100, color: '#22c55e', align: 'center', order: 1 }</pre>
            </div>

            <!-- ===== Badge ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-pink/20 text-bd-pink">badge</span>
                    Status Tag
                  </h3>
                  <p class="text-xs text-bd-text-muted">Compact status pill with three visual styles.</p>
                  <div class="text-xs text-bd-text-secondary space-y-0.5">
                    <div><code class="text-bd-cyan">text</code> - badge text &nbsp; <code class="text-bd-cyan">icon</code> - optional prefix emoji</div>
                    <div><code class="text-bd-cyan">variant</code> - <code>'subtle'</code> (default), <code>'solid'</code>, or <code>'outline'</code></div>
                  </div>
                </div>
                <div class="flex-shrink-0 flex gap-1.5">
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] text-bd-purple" style="background: rgba(168,85,247,0.15);">☠️ Poisoned</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-bd-amber text-bd-bg-tertiary">⚡ Buffed</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] border border-bd-success text-bd-success">Healthy</span>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'badge', text: 'Poisoned', icon: '☠️', color: '#a855f7', variant: 'subtle', align: 'center' }</pre>
            </div>

            <!-- ===== Counter ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-amber/20 text-bd-amber">counter</span>
                    Number with Delta
                  </h3>
                  <p class="text-xs text-bd-text-muted">Numeric display with optional +/- change indicator.</p>
                  <div class="text-xs text-bd-text-secondary space-y-0.5">
                    <div><code class="text-bd-cyan">icon</code> - emoji prefix &nbsp; <code class="text-bd-cyan">value</code> - current number &nbsp; <code class="text-bd-cyan">delta</code> - change amount</div>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-sm">💰</span>
                    <span class="text-[11px] font-semibold text-bd-amber">1250</span>
                    <span class="text-[10px] font-medium text-bd-success">+50</span>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'counter', icon: '💰', value: 1250, delta: 50, color: '#fbbf24', align: 'right' }</pre>
            </div>

            <!-- ===== Text ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-amber/20 text-bd-amber">text</span>
                    Styled Text
                  </h3>
                  <p class="text-xs text-bd-text-muted">Plain text with optional inline CSS styling.</p>
                  <div class="text-xs text-bd-text-secondary">
                    <code class="text-bd-cyan">text</code> - content &nbsp; <code class="text-bd-cyan">style</code> - CSS object (color, fontWeight, etc.)
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-flex px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] font-bold text-bd-amber">⚡ Quest Active</span>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'text', text: '⚡ Quest Active', style: { fontWeight: 'bold', color: '#fbbf24' }, align: 'center' }</pre>
            </div>

            <!-- ===== Icon ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-purple/20 text-bd-purple">icon</span>
                    Icon Only
                  </h3>
                  <p class="text-xs text-bd-text-muted">Compact emoji/icon indicator with optional tooltip on hover.</p>
                  <div class="text-xs text-bd-text-secondary">
                    <code class="text-bd-cyan">icon</code> - emoji character &nbsp; <code class="text-bd-cyan">tooltip</code> - hover text &nbsp; <code class="text-bd-cyan">size</code> - pixel size
                  </div>
                </div>
                <div class="flex-shrink-0 flex gap-1.5">
                  <div class="inline-flex px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-strong" title="Health"><span class="text-base">❤️</span></div>
                  <div class="inline-flex px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-strong" title="Night"><span class="text-base">🌙</span></div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'icon', icon: '❤️', color: '#ef4444', tooltip: 'Health', align: 'center' }</pre>
            </div>

            <!-- ===== Panel ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-blue/20 text-bd-blue">panel</span>
                    Multi-Item Panel
                  </h3>
                  <p class="text-xs text-bd-text-muted">Titled container with labeled key-value rows. Perfect for character sheets.</p>
                  <div class="text-xs text-bd-text-secondary">
                    <code class="text-bd-cyan">title</code> - header text &nbsp; <code class="text-bd-cyan">items</code> - array of <code>{ label, value, color }</code>
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-block px-3 py-2 rounded bg-bd-bg-tertiary border border-bd-border-strong min-w-[130px]">
                    <div class="text-[10px] font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5 pb-1 border-b border-bd-border-strong">Character</div>
                    <div class="space-y-1">
                      <div class="flex justify-between text-[11px]"><span class="text-bd-text-muted">LVL</span><span class="text-bd-text-secondary">5</span></div>
                      <div class="flex justify-between text-[11px]"><span class="text-bd-text-muted">XP</span><span class="text-bd-info-light">450/1000</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'panel', title: 'Character', align: 'left',
  items: [{ label: 'LVL', value: 5 }, { label: 'XP', value: '450/1000', color: '#60a5fa' }] }</pre>
            </div>

            <!-- ===== List ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-indigo/20 text-bd-indigo">list</span>
                    Item List
                  </h3>
                  <p class="text-xs text-bd-text-muted">Titled bulleted list with optional icons and colors per item.</p>
                  <div class="text-xs text-bd-text-secondary">
                    <code class="text-bd-cyan">title</code> - header &nbsp; <code class="text-bd-cyan">items</code> - array of <code>{ icon, text, color }</code> or plain strings
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-block px-3 py-2 rounded bg-bd-bg-tertiary border border-bd-border-strong min-w-[130px]">
                    <div class="text-[10px] font-semibold text-bd-text-muted uppercase tracking-wider mb-1.5 pb-1 border-b border-bd-border-strong">Inventory</div>
                    <div class="space-y-0.5">
                      <div class="text-[11px] text-bd-text-secondary">🗡️ Iron Sword</div>
                      <div class="text-[11px] text-bd-text-secondary">🛡️ Wooden Shield</div>
                      <div class="text-[11px] text-bd-text-secondary">• Health Potion</div>
                    </div>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'list', title: 'Inventory', align: 'right',
  items: [{ icon: '🗡️', text: 'Iron Sword' }, { icon: '🛡️', text: 'Wooden Shield' }, 'Health Potion'] }</pre>
            </div>

            <!-- ===== Custom ===== -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-start gap-3">
                <div class="flex-1 space-y-2">
                  <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <span class="px-2 py-0.5 rounded text-xs font-mono bg-bd-red/20 text-bd-red">custom</span>
                    Custom HTML
                  </h3>
                  <p class="text-xs text-bd-text-muted">Raw HTML content (sanitized for security). Use when built-in types aren't enough.</p>
                  <div class="text-xs text-bd-text-secondary">
                    <code class="text-bd-cyan">html</code> - HTML string &nbsp; <code class="text-bd-cyan">style</code> - optional wrapper CSS
                  </div>
                </div>
                <div class="flex-shrink-0">
                  <div class="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] font-bold text-bd-text-secondary">HP:</span>
                    <span class="text-[11px] text-bd-success">100</span>
                  </div>
                </div>
              </div>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-3">{ type: 'custom', html: '&lt;strong&gt;HP:&lt;/strong&gt; &lt;span style="color:#22c55e"&gt;100&lt;/span&gt;', align: 'center' }</pre>
              <p class="text-[10px] text-bd-text-muted mt-2">See the <strong>Protocol & API</strong> section for allowed HTML tags, attributes, and CSS properties.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ==================== SECTION 4: Layout & Positioning ==================== -->
      <section id="guide-layout" class="card">
        <button @click="toggleGuideSection('layout')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <LayoutDashboard class="w-5 h-5 text-bd-cyan" />
            Layout & Positioning
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('layout') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('layout')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Widgets render in a <strong>horizontal top bar</strong> that matches the story text width.
              The <code class="text-bd-cyan">align</code> property places each widget in one of three flex zones.
            </p>

            <!-- Visual Layout Diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Live Layout Preview</div>
              <div class="rounded-lg border border-bd-border-subtle overflow-hidden bg-bd-bg-primary">
                <!-- Top Bar -->
                <div class="px-3 py-2 border-b border-bd-border-strong" style="background: rgba(34,197,94,0.08);">
                  <div class="flex items-center justify-between gap-2">
                    <!-- Left zone -->
                    <div class="flex items-center gap-1.5 flex-wrap" style="background: rgba(59,130,246,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                        <span class="text-[9px] text-bd-text-muted">LVL</span>
                        <span class="text-[9px] font-semibold text-bd-purple">12</span>
                      </div>
                    </div>
                    <!-- Center zone -->
                    <div class="flex items-center gap-1.5 flex-wrap justify-center flex-1" style="background: rgba(34,197,94,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                        <span class="text-[10px] text-bd-text-muted">HP</span>
                        <div class="w-14 h-1.5 rounded-full bg-bd-bg-elevated overflow-hidden"><div class="h-full rounded-full bg-bd-success" style="width:75%;"></div></div>
                      </div>
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] text-bd-purple" style="background:rgba(168,85,247,0.15);">☠️ Poisoned</div>
                    </div>
                    <!-- Right zone -->
                    <div class="flex items-center gap-1.5 flex-wrap justify-end" style="background: rgba(168,85,247,0.06); border-radius: 4px; padding: 2px 4px;">
                      <div class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                        <span class="text-[9px]">💰</span>
                        <span class="text-[9px] font-semibold text-bd-amber">1250</span>
                      </div>
                    </div>
                  </div>
                  <div class="flex justify-between mt-1 px-1">
                    <span class="text-[8px] text-bd-blue font-mono">align: 'left'</span>
                    <span class="text-[8px] text-bd-green font-mono">align: 'center' (default)</span>
                    <span class="text-[8px] text-bd-purple font-mono">align: 'right'</span>
                  </div>
                </div>
                <!-- Story area -->
                <div class="flex-1 p-4 flex items-center justify-center min-h-[60px]">
                  <div class="text-xs text-[#555] italic">Story text area</div>
                </div>
              </div>
            </div>

            <!-- Zone descriptions -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="text-sm font-semibold text-bd-text-primary mb-1">Left Zone</h3>
                <p class="text-xs text-bd-text-secondary">Anchored to the left edge. Ideal for persistent identifiers: level, character name.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="text-sm font-semibold text-bd-text-primary mb-1">Center Zone <span class="text-[10px] text-bd-text-muted font-normal">(default)</span></h3>
                <p class="text-xs text-bd-text-secondary">Fills space between left and right. Best for core HUD: HP bars, status badges.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="text-sm font-semibold text-bd-text-primary mb-1">Right Zone</h3>
                <p class="text-xs text-bd-text-secondary">Anchored to the right edge. Currency, counters, secondary information.</p>
              </div>
            </div>

            <!-- Ordering + Responsive -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2">Ordering</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Use the <code class="text-bd-cyan">order</code> property to control widget sequence within each zone. Lower numbers render first.
                </p>
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">bdWidget('hp', { ..., align: 'center', order: 1 });
bdWidget('mp', { ..., align: 'center', order: 2 });
bdWidget('xp', { ..., align: 'center', order: 3 });</pre>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Smartphone class="w-4 h-4 text-bd-amber" />
                  Responsive Scaling
                </h3>
                <p class="text-xs text-bd-text-secondary mb-2">Widgets adapt automatically via two layers:</p>

                <div class="mb-2">
                  <h4 class="text-[11px] font-semibold text-bd-text-primary mb-1">Viewport Breakpoints</h4>
                  <ul class="text-xs text-bd-text-secondary space-y-0.5">
                    <li>• <strong>&lt; 480px</strong> - compact fonts and tighter spacing</li>
                    <li>• <strong>&lt; 768px</strong> - slightly reduced sizing</li>
                    <li>• <strong>≥ 1440px</strong> - larger widgets for QHD+</li>
                    <li>• <strong>≥ 2560px</strong> - maximum sizing for 4K</li>
                  </ul>
                </div>

                <div>
                  <h4 class="text-[11px] font-semibold text-bd-text-primary mb-1">Density Scaling</h4>
                  <p class="text-[11px] text-bd-text-muted mb-1">Widgets also scale based on how many are in the bar:</p>
                  <ul class="text-xs text-bd-text-secondary space-y-0.5">
                    <li>• <strong>Spacious</strong> - few widgets → roomier padding and gaps</li>
                    <li>• <strong>Compact</strong> - bar is filling up → tighter sizing</li>
                    <li>• <strong>Dense</strong> - many widgets → aggressively compressed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED SECTION DIVIDER ===================== -->
      <div class="flex items-center gap-3 pt-4">
        <div class="h-px flex-1 bg-bd-border-subtle"></div>
        <span class="text-xs font-bold uppercase tracking-widest text-bd-text-muted">Advanced</span>
        <div class="h-px flex-1 bg-bd-border-subtle"></div>
      </div>

      <!-- ==================== SECTION 5: Protocol & API ==================== -->
      <section id="guide-protocol" class="card">
        <button @click="toggleGuideSection('protocol')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-bd-purple" />
            Protocol & API
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('protocol') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('protocol')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Under the hood, BetterScripts communicates via JSON messages wrapped in <code class="text-bd-emerald">[[BD:...:BD]]</code> delimiters.
              The helper functions abstract this, but knowing the protocol is useful for debugging.
            </p>

            <!-- Helper Functions -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-emerald/30">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Code class="w-4 h-4 text-bd-emerald" />
                Helper Functions
              </h3>
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Plus class="w-3.5 h-3.5 text-bd-green" />
                    <code class="text-sm font-semibold text-bd-green">bdWidget(id, config)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Create or update a widget. Idempotent: safe to call every turn.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdWidget('hp', { type: 'bar', label: 'HP', value: 85, max: 100, align: 'center' });</pre>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Trash2 class="w-3.5 h-3.5 text-bd-red" />
                    <code class="text-sm font-semibold text-bd-red">bdDestroy(id)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Remove a single widget by ID.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdDestroy('hp'); <span class="text-bd-text-muted">// removes the HP bar</span></pre>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <Trash2 class="w-3.5 h-3.5 text-bd-amber" />
                    <code class="text-sm font-semibold text-bd-amber">bdClearAll()</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Remove <strong>all</strong> widgets at once. Good for scene transitions.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdClearAll();</pre>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                  <div class="flex items-center gap-2">
                    <MessageSquare class="w-3.5 h-3.5 text-bd-purple" />
                    <code class="text-sm font-semibold text-bd-purple">bdMessage(payload)</code>
                  </div>
                  <p class="text-xs text-bd-text-secondary">Low-level: wraps any JSON payload in protocol delimiters.</p>
                  <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-primary">bdMessage({ type: 'ping', data: 'hello' });</pre>
                </div>
              </div>
            </div>

            <!-- Raw Message Types -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Message Types</h3>
              <p class="text-xs text-bd-text-muted mb-3">Each message is a JSON object inside <code class="text-bd-emerald">[[BD:{ ... }:BD]]</code>. The <code class="text-bd-cyan">type</code> field determines the action.</p>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-bd-text-secondary">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 font-medium text-bd-text-primary">Type</th>
                      <th class="text-left py-2 font-medium text-bd-text-primary">Action</th>
                      <th class="text-left py-2 font-medium text-bd-text-primary">Key Fields</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-bd-border-subtle">
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-green">widget</td>
                      <td class="py-2 text-xs"><code>create</code></td>
                      <td class="py-2 text-xs"><code>widgetId</code>, <code>config</code> - creates or updates in place</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-blue">widget</td>
                      <td class="py-2 text-xs"><code>update</code></td>
                      <td class="py-2 text-xs"><code>widgetId</code>, <code>config</code> - partial update; auto-creates if missing</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-red">widget</td>
                      <td class="py-2 text-xs"><code>destroy</code></td>
                      <td class="py-2 text-xs"><code>widgetId</code> - removes the widget</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-red">clearAll</td>
                      <td class="py-2 text-xs">-</td>
                      <td class="py-2 text-xs">Removes every widget at once</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-amber">ping</td>
                      <td class="py-2 text-xs">-</td>
                      <td class="py-2 text-xs"><code>data</code> - test connectivity (logs to console)</td>
                    </tr>
                    <tr>
                      <td class="py-2 font-mono text-xs text-bd-purple">register</td>
                      <td class="py-2 text-xs">-</td>
                      <td class="py-2 text-xs"><code>scriptId</code>, <code>scriptName</code>, <code>version</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-3 p-2 rounded bg-bd-bg-tertiary">
                <p class="text-xs text-bd-text-muted">
                  <strong>Widget IDs</strong> must use alphanumeric characters, hyphens, or underscores only.
                  Use unique prefixes (e.g. <code class="text-bd-green">myscript_hp</code>) to avoid conflicts with other scripts.
                </p>
              </div>
            </div>

            <!-- JavaScript Events -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Browser Events</h3>
              <p class="text-xs text-bd-text-muted mb-3">BetterDungeon dispatches <code class="text-bd-cyan">CustomEvent</code>s on <code>window</code> for every protocol action. Useful for debugging or extension integration.</p>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-3 rounded bg-bd-bg-tertiary"><span class="text-bd-text-muted">// Widget lifecycle</span>
window.addEventListener('betterscripts:widget', (e) => {
  console.log(e.detail.action, e.detail.widgetId);
});

<span class="text-bd-text-muted">// All widgets cleared</span>
window.addEventListener('betterscripts:cleared', (e) => {
  console.log('Cleared', e.detail.count, 'widgets');
});

<span class="text-bd-text-muted">// Other events: betterscripts:registered, betterscripts:pong, betterscripts:error</span></pre>
            </div>

            <!-- Custom HTML Sanitization -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <ShieldCheck class="w-4 h-4 text-bd-pink" />
                Custom HTML Sanitization
              </h3>
              <p class="text-xs text-bd-text-muted mb-3">The <code class="text-bd-red">custom</code> widget sanitizes all HTML to prevent XSS. Only whitelisted elements and styles are allowed.</p>

              <div class="grid md:grid-cols-2 gap-3">
                <!-- Allowed -->
                <div class="space-y-3">
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-green mb-1">Allowed Tags</h4>
                    <div class="font-mono text-[11px] text-bd-text-secondary">
                      div, span, p, br, hr, strong, b, em, i, u, s, mark, h1–h6, ul, ol, li, table, thead, tbody, tr, th, td, img, a, pre, code, blockquote
                    </div>
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-green mb-1">Allowed Attributes</h4>
                    <div class="text-[11px] text-bd-text-secondary space-y-0.5">
                      <div><strong>All tags:</strong> <span class="font-mono">class, id, style, title</span></div>
                      <div><strong>&lt;a&gt;:</strong> <span class="font-mono">href, target, rel</span></div>
                      <div><strong>&lt;img&gt;:</strong> <span class="font-mono">src, alt, width, height</span></div>
                    </div>
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-green mb-1">Allowed CSS</h4>
                    <div class="font-mono text-[11px] text-bd-text-secondary leading-relaxed">
                      color, background(-color), font-size/-weight/-style/-family, text-align/-decoration/-transform, padding(*), margin(*), border(*), border-radius, width, height, max/min-width/height, display, flex(*), gap, opacity, visibility, overflow, position, top/right/bottom/left, z-index
                    </div>
                  </div>
                </div>
                <!-- Blocked -->
                <div class="space-y-3">
                  <div class="p-3 rounded bg-bd-red/10 border border-bd-red/20">
                    <h4 class="text-xs font-semibold text-bd-red mb-1">Blocked Tags</h4>
                    <div class="font-mono text-[11px] text-bd-red">
                      &lt;script&gt;, &lt;style&gt;, &lt;iframe&gt;, &lt;object&gt;, &lt;embed&gt;
                    </div>
                  </div>
                  <div class="p-3 rounded bg-bd-red/10 border border-bd-red/20">
                    <h4 class="text-xs font-semibold text-bd-red mb-1">Blocked Attributes</h4>
                    <div class="font-mono text-[11px] text-bd-red">
                      onclick, onload, onerror, on* (all event handlers)
                    </div>
                  </div>
                  <div class="p-3 rounded bg-bd-red/10 border border-bd-red/20">
                    <h4 class="text-xs font-semibold text-bd-red mb-1">Blocked URL Schemes</h4>
                    <div class="font-mono text-[11px] text-bd-red">
                      javascript:, vbscript:, data:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ==================== SECTION 6: Tips & Troubleshooting ==================== -->
      <section id="guide-best-practices" class="card">
        <button @click="toggleGuideSection('best-practices')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-amber" />
            Tips & Troubleshooting
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4">

            <!-- Do / Don't columns -->
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  Do
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1.5">
                  <li><strong>Strip context</strong> - Context Modifier removes <code class="text-bd-green">[[BD:...:BD]]</code> so the AI never sees them</li>
                  <li><strong>Prefix widget IDs</strong> - <code class="text-bd-cyan">myscript_hp</code> avoids conflicts with other scripts</li>
                  <li><strong>Initialize state safely</strong> - <code class="text-bd-purple">state.x = state.x ?? default</code></li>
                  <li><strong>Use <code>bdWidget</code> for everything</strong> - it creates or updates in place</li>
                  <li><strong>Set <code>order</code></strong> - controls widget sequence within each zone</li>
                  <li><strong>Batch widgets</strong> - build one string, append once</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-red/10 border border-bd-red/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-red" />
                  Don't
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1.5">
                  <li><strong>Skip the Context Modifier</strong> - the AI will echo raw protocol tags</li>
                  <li><strong>Reuse generic IDs</strong> - <code class="text-bd-red">'hp'</code> can clash between scripts</li>
                  <li><strong>Over-rely on custom HTML</strong> - built-in types are faster and safer</li>
                  <li><strong>Ignore mobile</strong> - test at smaller viewports</li>
                  <li><strong>Leave stale widgets</strong> - destroy or clear widgets you no longer need</li>
                </ul>
              </div>
            </div>

            <!-- Debug Mode -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Bug class="w-4 h-4 text-bd-green" />
                Debug Mode
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Open the <strong>BetterDungeon popup</strong> → expand <strong>BetterScripts</strong> → toggle <strong>Debug Mode</strong> on.
                    The setting persists across sessions.
                  </p>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Protocol tags stay visible in the story text</li>
                    <li>• Verbose console logging for every message and widget action</li>
                  </ul>
                </div>
                <div>
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Console Output (Debug On)</h4>
                  <pre class="text-[11px] text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary">[BetterScripts] Widget created: hp-bar
[BetterScripts] Widget updated: hp-bar
[BetterScripts] 🏓 PONG - Ping received</pre>
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1 mt-2">Error Examples</h4>
                  <pre class="text-[11px] text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-red/10 border border-bd-red/20">[BetterScripts] Unknown widget type: "progressbar"
[BetterScripts] Missing required "type" field</pre>
                </div>
              </div>
            </div>

            <!-- Performance -->
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-amber" />
                Performance
              </h3>
              <ul class="text-sm text-bd-text-secondary space-y-1">
                <li>• <code class="text-bd-green">bdWidget</code> updates in place - no destroy/recreate needed</li>
                <li>• Concatenate all widget strings in one output modifier call</li>
                <li>• Keep custom HTML simple - complex DOM slows rendering</li>
                <li>• Prefer built-in widget types over custom HTML when possible</li>
              </ul>
            </div>

            <!-- Common Issues -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3">Common Issues</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm text-bd-text-secondary">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 font-medium text-bd-text-primary">Problem</th>
                      <th class="text-left py-2 font-medium text-bd-text-primary">Fix</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-bd-border-subtle">
                    <tr>
                      <td class="py-2 text-xs">Visible <code class="text-bd-green">[[BD:...]]</code> tags</td>
                      <td class="py-2 text-xs">Ensure BetterDungeon is installed and enabled</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-xs">AI repeats protocol tags</td>
                      <td class="py-2 text-xs">Add Context Modifier: <code class="text-bd-cyan">text.replace(/\[\[BD:[\s\S]*?:BD\]\]/g, '')</code></td>
                    </tr>
                    <tr>
                      <td class="py-2 text-xs">Widgets not appearing</td>
                      <td class="py-2 text-xs">Check console (<kbd class="px-1 py-0.5 rounded bg-bd-bg-tertiary text-[10px]">F12</kbd>) for errors; verify widget ID format</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-xs">Widget not updating</td>
                      <td class="py-2 text-xs">Use <code class="text-bd-cyan">bdWidget</code> with the same ID; verify state actually changed</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-xs">Custom HTML stripped</td>
                      <td class="py-2 text-xs">Check allowed tags/attributes in Protocol & API section</td>
                    </tr>
                    <tr>
                      <td class="py-2 text-xs">Widgets gone after navigation</td>
                      <td class="py-2 text-xs">Normal - widgets are per-adventure; they recreate on the next turn</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Getting Help -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex flex-wrap items-center gap-3">
              <a href="https://github.com/ComputerKWasTaken/BetterDungeon/issues" target="_blank" class="btn btn-secondary text-sm">
                <ExternalLink class="w-4 h-4" />
                Report Bug
              </a>
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-sm">
                <MessageSquare class="w-4 h-4" />
                Discord
              </a>
              <a href="https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs" target="_blank" class="btn btn-secondary text-sm">
                <BookOpen class="w-4 h-4" />
                LewdLeah's Scripting Docs
              </a>
              <span class="text-xs text-bd-text-muted">Include your script code and console errors when reporting issues.</span>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ==================== SECTION 7: Complete Examples ==================== -->
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
              <div class="px-4 py-3 border-b border-bd-border-subtle bg-bd-bg-primary">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex items-center justify-between gap-2 flex-wrap">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] text-bd-text-muted">Turn</span>
                    <span class="text-[11px] font-semibold text-bd-info-light">5</span>
                  </div>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] text-bd-purple" style="background: rgba(168,85,247,0.15);">📍 Town</span>
                </div>
              </div>

              <!-- Widget Preview Only -->
            </div>

            <!-- ==================== EXAMPLE 2: Chronos Time System ==================== -->
            <div class="rounded-xl border border-bd-border-subtle overflow-hidden">
              <!-- Example Header -->
              <div class="px-4 py-3 bg-bd-bg-tertiary border-b border-bd-border-subtle flex items-center gap-3">
                <Clock class="w-5 h-5 text-bd-amber flex-shrink-0" />
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary">Chronos Time System</h3>
                  <p class="text-xs text-bd-text-muted mt-0.5">Full calendar, weather, story card config, and time commands (<code class="text-bd-text-secondary">:time</code>, <code class="text-bd-text-secondary">:date</code>, <code class="text-bd-text-secondary">:advance</code>, <code class="text-bd-text-secondary">:sleep</code>, <code class="text-bd-text-secondary">:settime</code>, <code class="text-bd-text-secondary">:setdate</code>, <code class="text-bd-text-secondary">:weather</code>, <code class="text-bd-text-secondary">:chronos</code>, <code class="text-bd-text-secondary">:pause</code>, <code class="text-bd-text-secondary">:resume</code>)</p>
                </div>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bd-amber/20 text-bd-amber">Intermediate</span>
              </div>

              <!-- Widget Preview -->
              <div class="px-4 py-3 border-b border-bd-border-subtle bg-bd-bg-primary">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex items-center justify-center gap-2 flex-wrap">
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] text-bd-text-muted">&#9728;&#65039;</span>
                    <span class="text-[11px] font-semibold text-bd-amber">10:30 AM</span>
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] text-bd-text-muted">&#128197;</span>
                    <span class="text-[11px] font-semibold text-bd-info-light">Wednesday, June 1</span>
                  </div>
                  <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                    <span class="text-[11px] text-bd-text-muted">&#9925;</span>
                    <span class="text-[11px] font-semibold text-bd-emerald">Partly cloudy, 62&#176;F</span>
                  </div>
                </div>
              </div>

              <!-- Widget Preview Only -->
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
              <div class="px-4 py-3 border-b border-bd-border-subtle bg-bd-bg-primary">
                <div class="text-[10px] text-bd-text-muted uppercase tracking-wider mb-2">Widget Preview</div>
                <div class="flex gap-4">
                  <!-- Center widgets -->
                  <div class="flex-1 space-y-1.5">
                    <div class="flex items-center gap-2 flex-wrap">
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                        <span class="text-[11px] text-bd-text-muted">HP</span>
                        <span class="text-[11px] font-semibold text-bd-error">85/100</span>
                      </div>
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong">
                        <span class="text-[11px] text-bd-text-muted">💰</span>
                        <span class="text-[11px] font-semibold text-bd-amber">1,250</span>
                      </div>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] text-bd-purple" style="background: rgba(168,85,247,0.15);">☠️ Poisoned</span>
                      <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-bd-blue text-bd-text-on-accent">🛡️ Shielded</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-bd-text-muted w-12">Health</span>
                      <div class="flex-1 h-2.5 rounded-full bg-bd-bg-elevated overflow-hidden"><div class="h-full rounded-full bg-bd-success" style="width:85%;"></div></div>
                      <span class="text-[10px] text-bd-text-muted">85/100</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] text-bd-text-muted w-12">XP</span>
                      <div class="flex-1 h-2.5 rounded-full bg-bd-bg-elevated overflow-hidden"><div class="h-full rounded-full bg-bd-cyan" style="width:75%;"></div></div>
                      <span class="text-[10px] text-bd-text-muted">750/1000</span>
                    </div>
                  </div>
                  <!-- Side panel -->
                  <div class="hidden sm:block px-2.5 py-1.5 rounded bg-bd-bg-tertiary border border-bd-border-strong min-w-[110px]">
                    <div class="text-[9px] font-semibold text-bd-text-muted uppercase tracking-wider mb-1 pb-0.5 border-b border-bd-border-strong">Character</div>
                    <div class="space-y-0.5">
                      <div class="flex justify-between text-[10px]"><span class="text-bd-text-muted">Name</span><span class="text-bd-pink">Adventurer</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-bd-text-muted">Class</span><span class="text-bd-info-light">Warrior</span></div>
                      <div class="flex justify-between text-[10px]"><span class="text-bd-text-muted">Level</span><span class="text-bd-purple">12</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Widget Preview Only -->
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
  AlertTriangle, ArrowDown, ArrowLeft, ArrowRight, 
  Terminal, Zap, Layout, LayoutDashboard, Library,
  MessageSquare, Code, Smartphone, Bug,
  HelpCircle, ExternalLink,
  Code2, Clock, Activity, Trash2,
  RefreshCw, Plus, Check, ChevronDown, ChevronUp,
  Layers, BookOpen, Wrench, ShieldCheck
} from 'lucide-vue-next'

// ============================================
// Guide Table of Contents (7 consolidated sections)
// ============================================
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'intro', label: 'Introduction' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'widgets', label: 'Widget Reference' },
  { id: 'layout', label: 'Layout & Positioning' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'protocol', label: 'Protocol & API' },
  { id: 'best-practices', label: 'Tips & Troubleshooting' },
  { id: 'examples', label: 'Complete Examples' }
]

// Example script tab state
const exampleTab = ref({
  counter: 'library',
  time: 'library',
  showcase: 'library'
})

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
