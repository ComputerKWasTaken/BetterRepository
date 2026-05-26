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

      <!-- ===================== 1. WHAT IS SCRIPTING ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Is Scripting?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Scripting allows creators to modify the player's inputs, the context sent to the AI model, and the AI's outputs dynamically. 
              Using sandboxed JavaScript, you can implement custom stats, command consoles, stateful lore modifiers, and other interactive mechanics.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Terminal class="w-4 h-4 text-bd-blue" />
                  Hook Pipeline
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Intercept player inputs, inject model-context parameters, or filter raw outputs before display.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Database class="w-4 h-4 text-bd-amber" />
                  Stateful Memory
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Store custom JSON properties that persist between turns, such as player health, inventory, or event counters.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Monitor class="w-4 h-4 text-bd-green" />
                  Dynamic Interfaces
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Create fully customized text logs, prompt-driven events, or show dynamic status headers at the top of the chat.
                </p>
              </div>
            </div>

            <!-- Sub-topic: Where Scripts Live -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Monitor class="w-4 h-4 text-bd-purple" />
                Scenario Compatibility &amp; Sandbox Limits
              </h3>
              <p class="text-xs text-bd-text-secondary">
                To keep the platform stable and secure, scripting has structural scope constraints:
              </p>
              <div class="grid md:grid-cols-2 gap-4 text-xs text-bd-text-secondary">
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1">Scenario Availability</h4>
                  <ul class="list-disc list-inside space-y-1 text-bd-text-muted">
                    <li>Attached exclusively to **Scenarios** (not individual Adventures).</li>
                    <li>Supported in **Simple Start** and **Character Creator** scenarios.</li>
                    <li>**Multiple Choice** scenarios can't have global scripts, but their child option branches can.</li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1">Sandbox Constraints</h4>
                  <ul class="list-disc list-inside space-y-1 text-bd-text-muted">
                    <li>Runs standard **ES6 Javascript** synchronously (no async/await).</li>
                    <li>Strict memory limit of **16 MB** per execution instance.</li>
                    <li>Timeout threshold of **2 seconds** per hook call.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Execution Pipeline Map -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle/50 space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-blue" />
                Script Execution Pipeline Flow
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-[11px]">
                <div class="px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-subtle text-bd-text-secondary">Player Input</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-semibold">onInput</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-subtle text-bd-text-secondary">Context Assembly</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-semibold">onModelContext</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-subtle text-bd-text-secondary">AI Generation</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-semibold">onOutput</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-bg-tertiary border border-bd-border-subtle text-bd-text-secondary">Display Response</div>
              </div>
              <p class="text-[10px] text-bd-text-muted">The shared **Library** script runs before each hook file. Variables in the Library are persistent in the script context, but temporary local scopes apply inside modifiers.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 2. QUICK START ===================== -->
      <section id="guide-quick-start" class="card">
        <button
          @click="toggleGuideSection('quick-start')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Quick Start: Your First Custom Command
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Follow this 3-step Quick Start to script a custom command (`:gold`) that intercepts player input and displays stats.
            </p>

            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Initialize State in Library</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Open the **Library** script editor. Initialize a custom gold stat using the nullish coalescing operator so it doesn't get cleared on each turn:
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">state.gold = state.gold ?? 100;</pre>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Intercept the Input Modifier</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Open the **Input Modifier** script. Catch the command, assign the display text to `state.message`, and set `stop: true` to prevent the AI model from responding:
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">const modifier = (text) => {
  if (text.trim() === ":gold") {
    state.message = `Gold inventory: ${state.gold} coins`;
    return { text, stop: true };
  }
  return { text };
};
modifier(text);</pre>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Verify in the Script Test Console</h3>
                  <p class="text-xs text-bd-text-secondary">
                    In the **Script Test** panel on the right, input `:gold`, click **Submit**, and verify that the output indicates `stop: true` and the `state.message` displays your gold count.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 3. ANATOMY / HOW IT WORKS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Braces class="w-5 h-5 text-bd-purple" />
            Anatomy &amp; How It Works
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">
            
            <!-- Modifier Structure -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">The Modifier Function Structure</h3>
              <p class="text-xs text-bd-text-secondary">
                All lifecycle scripts (except the Library) must follow the standard wrapper convention. The modifier intercepts the current string in the argument <code class="text-bd-green">text</code> and must return a modified object.
              </p>
              
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// Modify or check the text here...</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span> };
};
<span class="text-bd-cyan">modifier</span>(<span class="text-bd-amber">text</span>); <span class="text-bd-text-muted">// CRITICAL: This last call MUST be present!</span></pre>
              </div>
            </div>

            <!-- Lifecycle hooks -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Lifecycle Hooks Comparison</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20 text-xs">
                  <h4 class="font-semibold text-bd-green mb-1.5 flex items-center gap-1.5">
                    <ArrowRightToLine class="w-4 h-4 text-bd-green" /> Input Modifier (onInput)
                  </h4>
                  <p class="text-bd-text-secondary mb-1">
                    Triggers before context assembly. Perfect for chat command syntax parsing or blocking bad input words.
                  </p>
                  <strong>Text contains:</strong> The exact raw text typed by the player.
                </div>
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20 text-xs">
                  <h4 class="font-semibold text-bd-blue mb-1.5 flex items-center gap-1.5">
                    <Layers class="w-4 h-4 text-bd-blue" /> Context Modifier (onModelContext)
                  </h4>
                  <p class="text-bd-text-secondary mb-1">
                    Triggers after context generation. Excellent for injecting stats blocks, dynamic system notes, or formatting rules.
                  </p>
                  <strong>Text contains:</strong> The entire assembled raw context text (AI instructions, memories, history).
                </div>
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-amber/20 text-xs">
                  <h4 class="font-semibold text-bd-amber mb-1.5 flex items-center gap-1.5">
                    <ArrowLeftToLine class="w-4 h-4 text-bd-amber" /> Output Modifier (onOutput)
                  </h4>
                  <p class="text-bd-text-secondary mb-1">
                    Triggers after AI generates text, but before it renders. Useful for cleanup, stripping markdown, or game log additions.
                  </p>
                  <strong>Text contains:</strong> The raw text generated by the AI model.
                </div>
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-purple/20 text-xs">
                  <h4 class="font-semibold text-bd-purple mb-1.5 flex items-center gap-1.5">
                    <Library class="w-4 h-4 text-bd-purple" /> Shared Library (Runs First)
                  </h4>
                  <p class="text-bd-text-secondary mb-1">
                    Not a modifier itself. Executes before any hook file is parsed, allowing you to register global objects or functions.
                  </p>
                  <strong>Scope:</strong> Declares shared functions and persistence variables.
                </div>
              </div>
            </div>

            <!-- API Parameters -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Available API Parameters</h3>
              <p class="text-xs text-bd-text-secondary">
                The sandbox makes these core parameters globally accessible in all modifier hook scopes:
              </p>
              <div class="grid md:grid-cols-4 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">text</strong>
                  The target string for the current hook lifecycle phase.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">state</strong>
                  Persistent object. Keeps custom metrics between round turns.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">history</strong>
                  Array of recent inputs/outputs including action type.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">storyCards</strong>
                  Array of active/inactive world lore cards.
                </div>
              </div>

              <!-- state.memory and state.message info -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-xs space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Understanding UI Bridges</h4>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 class="font-semibold text-bd-green mb-1">state.message</h5>
                    <p class="text-bd-text-secondary">Assigning a string to `state.message` displays a notice box in the player's chat log (useful for status commands).</p>
                  </div>
                  <div>
                    <h5 class="font-semibold text-bd-blue mb-1">state.memory</h5>
                    <p class="text-bd-text-secondary">Supports programmatically altering dynamic fields like UI memory (`state.memory.context`) or (`state.memory.authorsNote`).</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- API Functions Reference -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">API Helper Functions</h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-green block font-mono font-bold mb-1">log(message)</code>
                  Prints custom messages to the scenario editor console. `console.log` is also supported. GraphQL will stringify `undefined` as `null`.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-green block font-mono font-bold mb-1">addStoryCard(keys, entry, type)</code>
                  Programmatically spawns a new Story Card during gameplay. Note: Buggy if the player has turned their Memory Bank feature off.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-green block font-mono font-bold mb-1">updateStoryCard(idx, keys, entry, type)</code>
                  Updates an existing card's properties dynamically (e.g., updating relations or character stats as milestones are met).
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 4. BEST PRACTICES ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Best Practices
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            
            <!-- Keeping hooks fast -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <Wrench class="w-4 h-4 text-bd-cyan" />
                Performance &amp; Execution Speed
              </h3>
              <ul class="space-y-2 text-xs">
                <li class="flex items-start gap-2 text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Sandbox Boundaries:</strong> Keep your loops fast. Heavy processes (like iterating through thousands of array entries) will hit the 2-second timeout, crashing the adventure.</span>
                </li>
                <li class="flex items-start gap-2 text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Safe State mutations:</strong> Always validate the type of data you assign to `state`. Stick strictly to serializable values (primitives, plain objects, basic arrays). Never store classes or circular objects.</span>
                </li>
                <li class="flex items-start gap-2 text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Memory Footprint:</strong> Avoid loading humongous JSON configurations inside variables. The sandbox caps memory usage at 16MB; exceeding this instantly halts execution.</span>
                </li>
              </ul>
            </div>

            <!-- Testing workflow -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <Monitor class="w-4 h-4 text-bd-purple" />
                Effective Testing &amp; Debugging
              </h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-text-primary block mb-0.5">Use Script Test Often</strong>
                  Before starting a live playtest, run mock inputs inside the built-in Editor Test panel. This catches simple syntax errors immediately.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-text-primary block mb-0.5">Keep Play Tab Open</strong>
                  Console logs persist on the server for only 15 minutes. Run playtests side-by-side with the editor so you can review real-time log outputs.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-text-primary block mb-0.5">Use Debug Logs strategic</strong>
                  Log status variables at the entry and exit points of custom math functions, e.g. <code class="text-bd-purple">log(`HP updated: ${state.hp}`);</code>.
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 5. ADVANCED TOPICS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-cyan" />
            Advanced Topics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            
            <!-- Sub-topic: Common Scripting Recipes -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Common Scripting Recipes</h3>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/20 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Play class="w-4 h-4 text-bd-blue" />
                  Dynamic UI Status Header (onModelContext)
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Injects dynamic stats or a location description directly into the top of the AI's generation context:
                </p>
                <pre class="p-3 rounded bg-bd-bg-tertiary text-[10px] font-mono text-bd-green overflow-x-auto whitespace-pre-wrap">const modifier = (text) => {
  const contextString = `[Scene: ${state.location} | Active Effects: ${state.poisoned ? 'Poisoned' : 'None'}]\n`;
  return { text: contextString + text };
};
modifier(text);</pre>
              </div>
            </div>

            <!-- Sub-topic: Consolidated Hook Pattern -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">The Library-Centric Hook Pattern</h3>
              <p class="text-xs text-bd-text-secondary">
                For complex scenarios, splitting logic across separate Input/Context/Output files can make debugging difficult. The **Library-Centric Hook Pattern** routes all logic through a single global function inside the Library.
              </p>
              
              <div class="p-4 rounded bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 text-xs">
                <h4 class="font-semibold text-bd-text-primary">1. Library File Setup</h4>
                <pre class="p-2 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-green overflow-x-auto">globalThis.MyScript = function MyScript(hook) {
  "use strict";
  const S = (state.myScript ||= { hp: 100 });

  if (hook === "input") {
    if (globalThis.text === ":heal") { S.hp = 100; globalThis.stop = true; }
  }
  if (hook === "context") {
    globalThis.text = `[HP: ${S.hp}]\n` + globalThis.text;
  }
};</pre>
              </div>

              <div class="grid md:grid-cols-3 gap-3 text-[10px] font-mono text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Input File Modifier</strong>
                  <pre class="mt-1 font-bold text-bd-green">const modifier = (text) => {
  MyScript("input");
  return { text: globalThis.text };
};
modifier(text);</pre>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Context File Modifier</strong>
                  <pre class="mt-1 font-bold text-bd-green">const modifier = (text) => {
  MyScript("context");
  return { text: globalThis.text };
};
modifier(text);</pre>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Output File Modifier</strong>
                  <pre class="mt-1 font-bold text-bd-green">const modifier = (text) => {
  MyScript("output");
  return { text: globalThis.text };
};
modifier(text);</pre>
                </div>
              </div>
            </div>

            <!-- Sub-topic: BetterScripts to Ultrascripts transition -->
            <div class="p-4 rounded bg-gradient-to-r from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30 space-y-2 text-xs">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Terminal class="w-4 h-4 text-bd-accent-primary" />
                BetterScripts to Ultrascripts V2 Evolution
              </h4>
              <p class="text-bd-text-secondary">
                In the upcoming BetterDungeon V2 release, the legacy scripting sandboxes will be superseded by **Ultrascripts**. 
                Ultrascripts establishes a high-performance, bidirectional event-driven bridge between browser variables and AI Dungeon client instances, bypassing formatting limitations entirely.
              </p>
              <div class="flex items-center gap-2">
                <router-link to="/guides?tab=ultrascripts" class="text-bd-accent-primary hover:underline font-semibold">Learn more in the Ultrascripts Guide &rarr;</router-link>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 6. TIPS & COMMON PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips &amp; Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Avoid these scripting pitfalls to prevent execution crashes, performance sluggishness, and state resets.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  "Run Dangerous Scripts" Blocked
                </h4>
                <p class="text-bd-text-secondary">
                  Custom scripts fail to run for new players because security features disable arbitrary sandboxing by default.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Direct players to toggle **Account Settings → Enable Run Dangerous Scripts** on.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Resetting State Every Turn
                </h4>
                <p class="text-bd-text-secondary">
                  Writing absolute assignments like `state.hp = 100` resets your custom variables back to defaults every single action.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Wrap variables in nullish coalescing checks: <code class="text-bd-purple">state.hp = state.hp ?? 100;</code>.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Writing Async Commands
                </h4>
                <p class="text-bd-text-secondary">
                  Using `async/await`, `setTimeout`, or `Promises` inside modifiers will crash. The sandbox runs entirely synchronously.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Keep all script logic synchronous and persist calculations using `state`.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Forgetting the Modifier Return
                </h4>
                <p class="text-bd-text-secondary">
                  Failing to include `return { text }` at the end of your modifier block causes the engine to throw silent errors.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Ensure the final line of modifier files is always exactly: <code class="text-bd-purple">modifier(text);</code>.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 7. CREDITS SECTION ===================== -->
      <section id="guide-credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Credits &amp; Resources
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who researched, developed, and documented the Scripting sandboxes:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in scriptingContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-cyan/10 text-bd-cyan border border-bd-cyan/20">
                  {{ name }}
                </span>
              </div>
            </div>
            
            <div class="grid gap-2">
              <a href="https://help.aidungeon.com/scripting" target="_blank" class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-accent-primary/50 transition-colors">
                <h4 class="text-xs font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <FileCode class="w-3 h-3 text-bd-accent-primary" /> Latitude Scripting API Documentation
                </h4>
                <p class="text-[10px] text-bd-text-muted mt-1">Official platform references for ES6 sandboxing, method lists, and context objects.</p>
              </a>
            </div>

            <div class="flex flex-wrap gap-2">
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
              </a>
              <a href="https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs" target="_blank" class="btn btn-secondary text-xs">
                <BookOpen class="w-3 h-3" /> LewdLeah's AI Dungeon Docs
              </a>
            </div>
          </div>
        </Transition>
      </section>

    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { SCRIPTING_CONTRIBUTORS as scriptingContributors } from '@/data/contributors'
import { 
  AlertTriangle, Braces, FileCode, HelpCircle, Check,
  BookOpen, Layers, Library, ArrowRightToLine, ArrowLeftToLine, Database, 
  Lightbulb, Wrench, Plus, Search, ShieldAlert, RefreshCw, 
  ExternalLink, ChevronDown, ChevronUp, Info, MessageSquare,
  Terminal, X, GitMerge, Monitor, Play, Rocket, Award
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is Scripting?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Anatomy & How It Works' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced-topics', label: 'Advanced Topics' },
  { id: 'pitfalls', label: 'Tips & Common Pitfalls' },
  { id: 'credits', label: 'Credits & Resources' }
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
