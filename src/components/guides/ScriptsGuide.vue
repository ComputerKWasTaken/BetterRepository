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

      <!-- ===================== THE SCRIPTING SANDBOX ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            The Scripting Sandbox
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Scripting in AI Dungeon executes standard <strong>ES6 JavaScript</strong> inside a secure, sandboxed server environment. Scripts intercept player inputs, mutate prompt context streams dynamically, and format output text programmatically.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Terminal class="w-4 h-4 text-bd-blue" />
                  Execution Pipeline
                </h3>
                <p class="text-bd-text-secondary">
                  Scripts execute synchronously during the generation pipeline. Asynchronous calls (`async/await`, `setTimeout`) are blocked.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Database class="w-4 h-4 text-bd-amber" />
                  Memory Limit
                </h3>
                <p class="text-bd-text-secondary">
                  Each sandbox instance has a strict limit of <strong>16 MB</strong> RAM. Loading large static databases will instantly crash the script.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Monitor class="w-4 h-4 text-bd-green" />
                  Timeout Threshold
                </h3>
                <p class="text-bd-text-secondary">
                  Scripts must finish within <strong>2.0 seconds</strong>. Slow loop iterations or complex string operations trigger immediate execution timeouts.
                </p>
              </div>
            </div>

            <!-- Pipeline Flow Diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Script Execution Cycle
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle">Player Input</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">onInput</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle">Prompt Assembled</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-bold">onModelContext</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle">AI Model Pass</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">onOutput</div>
              </div>
              <p class="text-[10px] text-bd-text-muted">The shared <strong>Library</strong> script runs before each hook modifier file, letting you declare global persistent variables or utility routines.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE LIFECYCLE HOOKS ===================== -->
      <section id="guide-quick-start" class="card">
        <button
          @click="toggleGuideSection('quick-start')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            The Lifecycle Hooks
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              AI Dungeon divides modifier operations across four distinct files. All hooks (except the Library) must follow the standard wrapper convention.
            </p>

            <!-- Modifier Wrapper Code Block -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary">Standard Modifier Wrapper Contract</h4>
              <pre class="p-3 rounded bg-bd-bg-primary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">const modifier = (text) => {
  // 1. Modify raw string 'text' here...
  // 2. Perform custom state mutations here...
  return { text };
};
modifier(text); // CRITICAL: This last wrapper execution call MUST be present!</pre>
            </div>

            <!-- Hook Breakdown Grid -->
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Input Modifier -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20 space-y-2">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <ArrowRightToLine class="w-4 h-4 text-bd-green" /> Input Modifier (onInput)
                </h4>
                <p class="text-bd-text-secondary">
                  Triggers before context assembly. Ideal for command console line parsers, blocking specific words, or setting custom gold commands.
                </p>
                <div class="text-bd-text-muted font-mono text-[10px]">
                  Input 'text': Raw text submitted by player.
                  Return: { text, stop: true } (stops AI generation).
                </div>
              </div>

              <!-- Context Modifier -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20 space-y-2">
                <h4 class="font-semibold text-bd-blue flex items-center gap-1.5">
                  <Layers class="w-4 h-4 text-bd-blue" /> Context Modifier (onModelContext)
                </h4>
                <p class="text-bd-text-secondary">
                  Triggers after prompt assembly. Ideal for injecting dynamic stat bars, system instructions, or local scene modifiers.
                </p>
                <div class="text-bd-text-muted font-mono text-[10px]">
                  Input 'text': Assembled prompt context string.
                  Return: { text } (modified prompt stream).
                </div>
              </div>

              <!-- Output Modifier -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-amber/20 space-y-2">
                <h4 class="font-semibold text-bd-amber flex items-center gap-1.5">
                  <ArrowLeftToLine class="w-4 h-4 text-bd-amber" /> Output Modifier (onOutput)
                </h4>
                <p class="text-bd-text-secondary">
                  Triggers after AI generates text, but before it renders. Perfect for cleaning up markdown tokens, parsing hidden rolls, or styling chat text.
                </p>
                <div class="text-bd-text-muted font-mono text-[10px]">
                  Input 'text': Raw generated string from model.
                  Return: { text } (final displayed string).
                </div>
              </div>

              <!-- Shared Library -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-purple/20 space-y-2">
                <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                  <Library class="w-4 h-4 text-bd-purple" /> Shared Library (Runs First)
                </h4>
                <p class="text-bd-text-secondary">
                  Not a modifier wrapper itself. Executed globally before any hook modifier is evaluated. Declares global objects, methods, and base functions.
                </p>
                <div class="text-bd-text-muted font-mono text-[10px]">
                  Scope: Persists globally across all hook executions in a turn.
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== API PARAMETERS & FUNCTIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Braces class="w-5 h-5 text-bd-purple" />
            API Parameters &amp; Functions
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The sandboxed container injects core parameters and helper functions globally into all modifier scopes.
            </p>

            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1">1. Sandbox Global Parameters</h3>
              <div class="grid md:grid-cols-4 gap-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block font-mono">text</strong>
                  The active string variable (raw input, assembled context, or raw output).
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block font-mono">state</strong>
                  Shared JSON object. Persists custom metrics between turn cycles.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block font-mono">history</strong>
                  Chronological array of all past actions, labeled by actor types.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block font-mono">storyCards</strong>
                  Array of all world lore cards associated with the active scenario.
                </div>
              </div>
            </div>

            <!-- state.message and state.memory bridges -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary">The UI State Bridges</h4>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="space-y-1">
                  <h5 class="font-semibold text-bd-green font-mono">state.message</h5>
                  <p class="text-[11px] text-bd-text-muted">
                    Assigning a string to `state.message` renders a custom notice box in the player's log window. Perfect for chat consoles, cooldown notifications, or stat displays.
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">state.message = `HP: ${state.hp} / 100`;</pre>
                </div>
                <div class="space-y-1">
                  <h5 class="font-semibold text-bd-blue font-mono">state.memory</h5>
                  <p class="text-[11px] text-bd-text-muted">
                    Mutates active Required Elements. You can programmatically alter the active Plot Essentials (`state.memory.context`) or Author's Note (`state.memory.authorsNote`).
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">state.memory.authorsNote = "Tense scene.";</pre>
                </div>
              </div>
            </div>

            <!-- API Helpers -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1">2. Sandbox Helper Functions</h3>
              <div class="grid md:grid-cols-3 gap-3">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                  <code class="text-bd-green block font-mono font-bold">log(message)</code>
                  <p class="text-[11px] text-bd-text-muted">
                    Prints custom messages to the scenario editor console. `console.log` is supported. GraphQL stringifies `undefined` values as `null`.
                  </p>
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                  <code class="text-bd-green block font-mono font-bold">addStoryCard(keys, val, typ)</code>
                  <p class="text-[11px] text-bd-text-muted">
                    Programmatically spawns a new Story Card during gameplay. Note: Fails if the player turned the Memory Bank setting off.
                  </p>
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                  <code class="text-bd-green block font-mono font-bold">updateStoryCard(idx, keys, val)</code>
                  <p class="text-[11px] text-bd-text-muted">
                    Mutates an existing card's properties dynamically (e.g. updating character relationships as milestones are met).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ARCHITECTURE & PATTERNS ===================== -->
      <section id="best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Architecture &amp; Design Patterns
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Writing scalable scripts requires clean structural patterns to prevent timing timeouts and syntax crashes.
            </p>

            <!-- Library-Centric Hook Pattern -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">The Library-Centric Hook Pattern</h3>
              <p class="text-xs text-bd-text-secondary">
                Splitting complex math and logic files across four separate Input/Context/Output files can make debugging difficult. The <strong>Library-Centric Hook Pattern</strong> routes all operations through a single global routing function defined inside the <strong>Library</strong> script:
              </p>
              
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary">1. Library File Setup</h4>
                <pre class="p-3 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">globalThis.MyScript = function MyScript(hook) {
  "use strict";
  // Safely initialize state
  const S = (state.myScript ||= { hp: 100 });

  if (hook === "input") {
    // Intercept gold command
    if (globalThis.text.trim() === ":heal") {
      S.hp = 100;
      globalThis.text = ""; // clear input
      globalThis.stop = true; // halt AI model pass
      state.message = "HP fully restored!";
    }
  }
  if (hook === "context") {
    // Inject dynamic HUD at the beginning of prompt context
    globalThis.text = `[HP: ${S.hp} / 100]\n` + globalThis.text;
  }
};</pre>
              </div>

              <!-- Labeled hook wrappers -->
              <div class="grid md:grid-cols-3 gap-3 text-[10px] font-mono text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-tertiary border border-bd-border-subtle/50 space-y-1">
                  <strong>Input Modifier File</strong>
                  <pre class="font-bold text-bd-green">const modifier = (text) => {
  globalThis.text = text;
  MyScript("input");
  return { 
    text: globalThis.text,
    stop: globalThis.stop 
  };
};
modifier(text);</pre>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary border border-bd-border-subtle/50 space-y-1">
                  <strong>Context Modifier File</strong>
                  <pre class="font-bold text-bd-green">const modifier = (text) => {
  globalThis.text = text;
  MyScript("context");
  return { text: globalThis.text };
};
modifier(text);</pre>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary border border-bd-border-subtle/50 space-y-1">
                  <strong>Output Modifier File</strong>
                  <pre class="font-bold text-bd-green">const modifier = (text) => {
  globalThis.text = text;
  MyScript("output");
  return { text: globalThis.text };
};
modifier(text);</pre>
                </div>
              </div>
            </div>

            <!-- Ultrascripts Cross-Link -->
            <div class="p-4 rounded-lg bg-gradient-to-r from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30 space-y-2">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                <Terminal class="w-4 h-4 text-bd-accent-primary" />
                Need more than vanilla scripts can do?
              </h4>
              <p class="text-xs text-bd-text-secondary">
                BetterDungeon ships <strong>Ultrascripts</strong>, a cards-based scripting platform that gives scenarios dynamic UI widgets,
                external API access, native AI helper queries, and real-world context (time and weather) through a bidirectional Story Card bridge.
                Start from the Enhanced template for graceful fallback, or the Required template when BetterDungeon is part of the scenario contract.
              </p>
              <div class="grid md:grid-cols-2 gap-3 text-[11px]">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-emerald/20">
                  <strong class="text-bd-emerald block mb-1">Enhanced with Ultrascripts</strong>
                  The script still works without BetterDungeon, but Ultrascripts makes it richer.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-purple/20">
                  <strong class="text-bd-purple block mb-1">Requires Ultrascripts</strong>
                  The core mechanic depends on BetterDungeon being present, so the scenario should say that clearly up front.
                </div>
              </div>
              <div class="flex items-center gap-2">
                <router-link to="/ultrascripts" class="text-bd-accent-primary hover:underline font-semibold">Explore the Ultrascripts platform &rarr;</router-link>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== EDITOR TESTING & DEBUGGING ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Monitor class="w-5 h-5 text-bd-cyan" />
            Editor Testing &amp; Debugging
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Direct live playtests in game logs can make parsing script errors tedious. Leverage the dedicated editor utilities.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Script Test Panel -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <PlayCircle class="w-4 h-4 text-bd-green" />
                  The Script Test Console
                </h4>
                <p class="text-bd-text-secondary">
                  Located in the right-hand panel of the script editor. Input a mock string (e.g. `:gold`) and click <strong>Submit</strong>.
                </p>
                <ul class="list-disc list-inside space-y-1 text-bd-text-muted">
                  <li>• Instantly displays compile syntax errors.</li>
                  <li>• Outputs returned strings and `state.message` modifications.</li>
                  <li>• Displays `stop: true` action block statuses.</li>
                </ul>
              </div>

              <!-- GraphQL logs -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <Terminal class="w-4 h-4 text-bd-purple" />
                  GraphQL Console Logger
                </h4>
                <p class="text-bd-text-secondary">
                  Active `log(...)` statements are written directly to your browser's Developer Tools Console via network GraphQL pipes.
                </p>
                <ul class="list-disc list-inside space-y-1 text-bd-text-muted">
                  <li>• Open Chrome/Firefox DevTools (F12) &rarr; Console.</li>
                  <li>• GraphQL stringifies `undefined` values as `null` in console returns.</li>
                  <li>• Logs persist on the server for only <strong>15 minutes</strong> of inactivity.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING & PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Scripting Troubleshooting &amp; Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Avoid these common configuration errors that cause sandboxed script crashes.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> State Resets on Turn Cycles
                </h4>
                <p class="text-bd-text-secondary">Writing absolute variables assignments like `state.hp = 100` inside your modifiers causes the variable to reset back to 100 on every turn.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Wrap variables in nullish coalescing checks: <code class="text-bd-purple">state.hp = state.hp ?? 100;</code>.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> Omission of Wrapper Return
                </h4>
                <p class="text-bd-text-secondary">Forgetting to add `return { text }` or failing to execute the final wrapper call `modifier(text);` at the end of files.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Ensure the absolute final line of all modifier files is exactly: <code class="text-bd-purple">modifier(text);</code>.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> "Dangerous Scripts" Security Block
                </h4>
                <p class="text-bd-text-secondary">Custom modifier scripts fail to execute entirely for new players because security features block arbitrary script execution by default.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Instruct players to navigate to <strong>Account Settings &rarr; Toggle Enable Run Dangerous Scripts</strong> on.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> Asynchronous Sandbox Crashing
                </h4>
                <p class="text-bd-text-secondary">Using `setTimeout`, `async/await`, or `Promises` inside hooks. The sandboxed V8 execution thread halts immediately on async loops.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> keep all loops synchronous and store values inside `state` variables.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREDITS SECTION ===================== -->
      <section id="credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Users class="w-5 h-5 text-bd-amber" />
            Credits
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who researched, developed, and documented the Scripting sandboxes:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in scriptingContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-cyan/10 text-bd-cyan border border-bd-cyan/20">
                  {{ name }}
                </span>
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
import { SCRIPTING_CONTRIBUTORS as scriptingContributors } from '@/data/contributors'
import { 
  AlertTriangle, Braces, FileCode, HelpCircle, Check,
  BookOpen, Layers, Library, ArrowRightToLine, ArrowLeftToLine, Database, 
  Wrench, Plus, ExternalLink, ChevronDown, ChevronUp, Info, MessageSquare,
  Terminal, X, GitMerge, Monitor, Play, Rocket, Award, PlayCircle, Users
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'V8 Sandbox Basics', isHeader: true },
  { id: 'what-is', label: 'The Scripting Sandbox' },
  { id: 'quick-start', label: 'The Lifecycle Hooks' },
  { id: 'header-apis', label: 'API Ref', isHeader: true },
  { id: 'anatomy', label: 'API Parameters & Methods' },
  { id: 'header-patterns', label: 'Design Patterns', isHeader: true },
  { id: 'best-practices', label: 'Architecture & Design' },
  { id: 'advanced-topics', label: 'Testing & Diagnostics' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Script Troubleshooting' },
  { id: 'credits', label: 'Credits' }
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
