<template>
  <div class="space-y-8">
    <!-- Page Header with animated hero -->
    <header class="scripts-hero relative overflow-hidden rounded-2xl py-10 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--cyan" aria-hidden="true" />
      <div class="hero-orb hero-orb--blue" aria-hidden="true" />

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-cyan/20 flex items-center justify-center animate-float flex-shrink-0">
          <Code class="w-6 h-6 text-bd-cyan" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            <span class="text-gradient">Scripts</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed">
            Extend AI Dungeon with custom JavaScript to modify context, input, and output.
          </p>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-bd-border-subtle pb-2 overflow-x-auto" role="tablist" aria-label="Script sections">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        role="tab"
        :aria-selected="activeTab === tab.id"
        @click="switchTab(tab.id)"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-bd-bg-tertiary'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">

      <!-- Table of Contents - Sticky Sidebar -->
      <div class="flex gap-6 animate-fade-in">
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

        <div class="flex-1 space-y-4 min-w-0">

      <!-- Introduction -->
      <section id="guide-intro" class="card">
        <button
          @click="toggleGuideSection('intro')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Is Scripting?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('intro')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Scripting allows creators to <strong>modify the player experience</strong> beyond what is supported in the Scenario editor. 
              Scripts use JavaScript to modify context, input, and output.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  What Scripts Can Do
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• Modify player input before processing</li>
                  <li>• Change the text sent to the AI model</li>
                  <li>• Modify the AI's output before displaying</li>
                  <li>• Manage story cards programmatically</li>
                  <li>• Track persistent game state across turns</li>
                  <li>• Display messages to the player</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Important Notes
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-1">
                  <li>• Scripts use <strong>JavaScript</strong> (no async/await)</li>
                  <li>• Scripts can be published, saved, and attached to adventures you own</li>
                  <li>• Multiple attached scripts run in order with private persistent state</li>
                  <li>• Script editing remains desktop-only and creator-only</li>
                  <li>• Scripts may be reviewed for moderation</li>
                </ul>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-pink mt-0.5 flex-shrink-0" />
                <p class="text-sm text-bd-text-secondary">
                  <strong class="text-bd-text-primary">Warning:</strong> Updating scripts in a published scenario 
                  affects <strong>all existing adventures</strong> using that scenario. Back up before making changes!
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Modifier Structure -->
      <section id="guide-modifier-structure" class="card">
        <button
          @click="toggleGuideSection('modifier-structure')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Braces class="w-5 h-5 text-bd-purple" />
            Modifier Structure
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('modifier-structure') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('modifier-structure')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              All modifiers follow the same basic structure. The <code class="text-bd-green">text</code> parameter 
              contains the content you're modifying, and you return an object with the modified text.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <pre class="text-sm text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// This is an empty modifier.</span>
  <span class="text-bd-text-muted">// Code normally goes here.</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span> };
};

<span class="text-bd-cyan">modifier</span>(<span class="text-bd-amber">text</span>)</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Script Files (Hooks) -->
      <section id="guide-script-files" class="card">
        <button
          @click="toggleGuideSection('script-files')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileCode class="w-5 h-5 text-bd-cyan" />
            Script Files (Lifecycle Hooks)
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('script-files') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('script-files')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Scripting API consists of <strong>three lifecycle hooks</strong> plus a shared library. 
              The execution order is always <code>onHook &gt; sharedLibrary &gt; Script</code>.
            </p>
            
            <div class="space-y-4">
          <!-- Library -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Library class="w-4 h-4 text-bd-purple" />
              Library
              <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Runs First</span>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              A shared library of functions and values that can be used in other scripts. 
              <strong>Not a modifier</strong>, runs before every modifier.
            </p>
            <div class="p-3 rounded bg-bd-amber/5 border border-bd-amber/20 mb-2">
              <p class="text-[11px] text-bd-text-secondary">
                <strong>Scope:</strong> Variables in <code>sharedLibrary</code> are <strong>global</strong>. 
                Variables defined in Input/Context/Output scripts are <strong>local</strong> to those scripts.
              </p>
            </div>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Define helper functions and state</span><br>
              state.hp = state.hp ?? 100;<br>
              <span class="text-bd-purple">function</span> <span class="text-bd-cyan">getHPBar</span>() { ... }
            </div>
          </div>

          <!-- Input (onInput) -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ArrowRightToLine class="w-4 h-4 text-bd-green" />
              Input Modifier
              <span class="tag bg-bd-green/20 text-bd-green text-xs">onInput</span>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Modifies the <strong>player's input text</strong> before it is used to construct the model context. 
              The <code class="text-bd-green">text</code> parameter contains what the player entered.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Process commands, transform input</span><br>
              <span class="text-bd-purple">if</span> (text.includes(<span class="text-bd-green">":status"</span>)) { ... }
            </div>
          </div>

          <!-- Context (onModelContext) -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-blue" />
              Context Modifier
              <span class="tag bg-bd-blue/20 text-bd-blue text-xs">onModelContext</span>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-3">
              Changes the <strong>text sent to the AI</strong> before the model is called.
              Access <code class="text-bd-cyan">info.modelName</code> to detect which AI model is running.
            </p>
            <div class="grid md:grid-cols-2 gap-4 mb-3">
              <div class="text-xs space-y-2">
                <p class="font-medium text-bd-text-primary uppercase tracking-wider">Full Context Order:</p>
                <ol class="text-bd-text-muted space-y-1">
                  <li>1. AI Instructions</li>
                  <li>2. Plot Essentials</li>
                  <li>3. World Lore (Story Cards)</li>
                  <li>4. Story Summary</li>
                  <li>5. Memories</li>
                  <li>6. Recent Story</li>
                  <li>7. [Author's Note]</li>
                  <li>8. Last response/action</li>
                  <li>9. frontMemory</li>
                </ol>
              </div>
              <div class="text-xs space-y-2">
                <p class="font-medium text-bd-text-primary uppercase tracking-wider">Available to Script:</p>
                <ul class="text-bd-text-muted space-y-1">
                  <li>• Plot Essentials</li>
                  <li>• World Lore</li>
                  <li>• Story Summary</li>
                  <li>• Memories</li>
                  <li>• Recent Story</li>
                  <li>• [Author's Note]</li>
                  <li>• Last response/action</li>
                </ul>
              </div>
            </div>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Inject dynamic content into context</span><br>
              text = <span class="text-bd-green">`[Stats: HP ${state.hp}]\n`</span> + text;
            </div>
          </div>

          <!-- Output (onOutput) -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ArrowLeftToLine class="w-4 h-4 text-bd-amber" />
              Output Modifier
              <span class="tag bg-bd-amber/20 text-bd-amber text-xs">onOutput</span>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Modifies the <strong>model's output text</strong> before it is returned to the player. 
              Use for formatting, filtering, or post-processing AI responses.
              Access <code class="text-bd-cyan">info.modelName</code> to detect which AI model generated the response.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Format output, clean up text</span><br>
              text = text.replace(<span class="text-bd-green">/\n{3,}/g</span>, <span class="text-bd-green">"\\n\\n"</span>);
            </div>
          </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Return Values -->
      <section id="guide-return-values" class="card">
        <button
          @click="toggleGuideSection('return-values')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowLeftToLine class="w-5 h-5 text-bd-amber" />
            Return Values
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('return-values') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('return-values')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              All modifiers must return an object. You can return these properties:
            </p>
            
            <div class="space-y-4">
                  <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">{ text: "modified text" }</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The modified text to use instead of the original. <strong>Required</strong> in most cases.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">{ stop: true }</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              If <code>stop === true</code>, the game loop will not proceed. Useful when a player input should update state but not call the AI.
            </p>
          </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-pink mt-0.5 flex-shrink-0" />
                <div class="text-sm text-bd-text-secondary">
                  <p class="mb-2"><strong class="text-bd-text-primary">Warning about empty strings:</strong></p>
                  <ul class="space-y-1">
                    <li>• <strong>onInput:</strong> Empty string throws error</li>
                    <li>• <strong>onModelContext:</strong> Empty string rebuilds context without script</li>
                    <li>• <strong>onOutput:</strong> Empty string throws error</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- API Parameters -->
      <section id="guide-api-parameters" class="card">
        <button
          @click="toggleGuideSection('api-parameters')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Database class="w-5 h-5 text-bd-green" />
            API Parameters
            <span class="tag bg-bd-green/20 text-bd-green text-xs">Reference</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('api-parameters') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('api-parameters')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Scripts have access to these parameters directly, no need to deconstruct from an object.
            </p>
            
            <div class="space-y-4">
          <!-- text -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">text</code>
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <strong>onInput:</strong> The text entered by the player</li>
              <li>• <strong>onModelContext:</strong> The text that would be sent to the AI</li>
              <li>• <strong>onOutput:</strong> The text that would be returned to the player</li>
            </ul>
          </div>

          <!-- history -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">history</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Array of recent actions. Each action has:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">text</code> - The text of the action</li>
              <li>• <code class="text-bd-cyan">type</code> - Type: <code>start</code>, <code>continue</code>, <code>do</code>, <code>say</code>, <code>story</code>, <code>see</code></li>
            </ul>
          </div>

          <!-- storyCards -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">storyCards</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Array of <router-link to="/story-cards" class="text-bd-accent-primary hover:underline">story cards</router-link>. Each card has:
            </p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">id</code> - Unique numerical ID</li>
              <li>• <code class="text-bd-cyan">keys</code> - Trigger keys</li>
              <li>• <code class="text-bd-cyan">entry</code> - The card's content</li>
              <li>• <code class="text-bd-cyan">type</code> - Category type</li>
            </ul>
          </div>

          <!-- state -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">state</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Persistent object for storing data across turns. Special fields:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">state.memory.context</code> - Overwrites visible Plot Essentials; blocked by Optimized Context</li>
              <li>• <code class="text-bd-cyan">state.memory.authorsNote</code> - Overwrites visible Author's Note; writable with Optimized Context</li>
              <li>• <code class="text-bd-cyan">state.memory.frontMemory</code> - Added to context end; writable with Optimized Context</li>
              <li>• <code class="text-bd-cyan">state.message</code> - Shown to the player as info message</li>
            </ul>
            <p class="text-xs text-bd-amber mt-3">
              Optimized Context text edits also require <code>// @cache-compatible</code> and must append to the complete unchanged prompt. Without it, edits are discarded and the player is notified. The annotation does not unlock <code>state.memory.context</code>.
            </p>
          </div>

          <!-- info -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">info</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Additional useful values:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">info.actionCount</code> - Total number of actions</li>
              <li>• <code class="text-bd-cyan">info.characterNames</code> - Array of player character names (multiplayer)</li>
              <li>• <code class="text-bd-cyan">info.maxChars</code> - Max characters for context <em>(onModelContext only)</em></li>
              <li>• <code class="text-bd-cyan">info.memoryLength</code> - Length of memory section <em>(onModelContext only)</em></li>
              <li>• <code class="text-bd-cyan">info.modelName</code> - Name of the AI model currently running <em>(onModelContext &amp; onOutput)</em>
                <span class="tag bg-bd-green/20 text-bd-green text-[10px] ml-1">New</span>
              </li>
              <li>• <code class="text-bd-cyan">info.storyModel.name</code> - Story model name
                <span class="tag bg-bd-green/20 text-bd-green text-[10px] ml-1">New</span>
              </li>
              <li>• <code class="text-bd-cyan">info.storyModel.version</code> - Story model version
                <span class="tag bg-bd-green/20 text-bd-green text-[10px] ml-1">New</span>
              </li>
              <li>• <code class="text-bd-cyan">info.useCacheEfficient</code> - Whether cache-efficient mode is active
                <span class="tag bg-bd-green/20 text-bd-green text-[10px] ml-1">New</span>
              </li>
              <li>• <code class="text-bd-cyan">info.emptyOutputReason</code> - Reason if the AI output was empty
                <span class="tag bg-bd-green/20 text-bd-green text-[10px] ml-1">New</span>
              </li>
            </ul>
          </div>
            </div>
            
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-3">
                <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                <p class="text-sm text-bd-text-secondary">
                  <strong class="text-bd-text-primary">Note:</strong> The first real turn is <code class="text-bd-green">2</code>, 
                  not <code class="text-bd-green">1</code>. This can be unintuitive when you're getting started.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- API Functions -->
      <section id="guide-api-functions" class="card">
        <button
          @click="toggleGuideSection('api-functions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-cyan" />
            API Functions
            <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Reference</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('api-functions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('api-functions')" class="mt-4">
            <div class="space-y-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">log(message)</code>
                  <span class="text-[10px] text-bd-text-muted uppercase">Console Quirks</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  Logs information to the console. <code>console.log()</code> also works.
                </p>
                <div class="p-3 rounded bg-bd-amber/5 border border-bd-amber/20 text-xs text-bd-text-secondary">
                  <p><strong>Note:</strong> AI Dungeon logs are stringified through GraphQL. This causes <code>undefined</code> values to appear as <code>null</code> in the console output.</p>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">addStoryCard(keys, entry, type)</code>
                  <span class="text-[10px] text-bd-pink uppercase">Buggy with Memory Bank OFF</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  Adds a new story card. Returns index of new card, or <code>false</code> if card with same keys exists.
                </p>
                <p class="text-[11px] text-bd-text-muted">
                  <strong>Tip:</strong> If <code>addStoryCard</code> fails, you can manually push to the <code>storyCards</code> array.
                </p>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2">
                  <code class="text-bd-green">updateStoryCard(index, keys, entry, type)</code>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Updates an existing story card. Throws error if card doesn't exist.
                </p>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2">
                  <code class="text-bd-green">removeStoryCard(index)</code>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Removes a story card. Throws error if card doesn't exist.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Utility Functions -->
      <section id="guide-utility-functions" class="card">
        <button
          @click="toggleGuideSection('utility-functions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-cyan" />
            Useful Utility Functions
            <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">By LewdLeah</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('utility-functions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('utility-functions')" class="mt-4">
            <p class="text-bd-text-secondary mb-4">
              These functions make story card management much easier. Add them to your <strong>Library</strong>.
            </p>

            <!-- buildCard -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle mb-4">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Plus class="w-4 h-4 text-bd-green" />
                buildCard() - Create Story Cards
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Creates a new story card with all properties set properly:
              </p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto mb-3">
                <pre>function buildCard(title = "", entry = "", type = "character", 
                  keys = title, description = "", insertionIndex = 0) {
    if (![type, title, keys, entry, description].every(arg => 
        (typeof arg === "string"))) {
        throw new Error("buildCard: strings required");
    } else if (!Number.isInteger(insertionIndex)) {
        throw new Error("buildCard: integer required for insertionIndex");
    } else {
        insertionIndex = Math.min(Math.max(0, insertionIndex), 
                                  storyCards.length);
    }
    addStoryCard("%@%");
    for (const [index, card] of storyCards.entries()) {
        if (card.title !== "%@%") continue;
        card.type = type;
        card.title = title;
        card.keys = keys;
        card.entry = entry;
        card.description = description;
        if (index !== insertionIndex) {
            storyCards.splice(index, 1);
            storyCards.splice(insertionIndex, 0, card);
        }
        return Object.seal(card);
    }
    throw new Error("An unexpected error occurred with buildCard");
}</pre>
              </div>
              <div class="p-3 rounded bg-bd-green/10 border border-bd-green/30">
                <p class="text-xs text-bd-text-muted mb-2">Example usage:</p>
                <pre class="text-xs text-bd-text-secondary font-mono">const exampleCard = buildCard("Example!");
exampleCard.entry = "Hello, world!";
log(exampleCard);</pre>
              </div>
            </div>

            <!-- getCard -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Search class="w-4 h-4 text-bd-blue" />
                getCard() - Find Story Cards
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Like <code class="text-bd-green">Array.find</code> but specialized for story cards:
              </p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto mb-3">
                <pre>function getCard(predicate, getAll = false) {
    if (typeof predicate !== "function") {
        throw new Error("getCard: function required");
    } else if (typeof getAll !== "boolean") {
        throw new Error("getCard: boolean required for getAll");
    } else if (getAll) {
        const collectedCards = [];
        for (const card of storyCards) {
            if (predicate(card)) {
                Object.seal(card);
                collectedCards.push(card);
            }
        }
        return collectedCards;
    }
    for (const card of storyCards) {
        if (predicate(card)) {
            return Object.seal(card);
        }
    }
    return null;
}</pre>
              </div>
              <div class="p-3 rounded bg-bd-blue/10 border border-bd-blue/30">
                <p class="text-xs text-bd-text-muted mb-2">Example usage:</p>
                <pre class="text-xs text-bd-text-secondary font-mono">const card = getCard(c => c.title === "Example!");
if (card !== null) {
    card.entry = "Goodbye, cruel world!";
}</pre>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Common Patterns -->
      <section id="guide-common-patterns" class="card">
        <button
          @click="toggleGuideSection('common-patterns')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Common Patterns
            <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Recipes</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('common-patterns') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-patterns')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Practical code patterns you can adapt for your own scripts.
            </p>

            <!-- Command System -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Terminal class="w-4 h-4 text-bd-green" />
                Command System (onInput)
              </h3>
              <p class="text-xs text-bd-text-secondary mb-3">Let players type commands like <code>:status</code> or <code>:help</code> that trigger game logic instead of AI responses.</p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-purple">const</span> modifier = (text) => {
  <span class="text-bd-purple">if</span> (text.startsWith(<span class="text-bd-green">":status"</span>)) {
    state.message = <span class="text-bd-green">`HP: ${state.hp} | Gold: ${state.gold}`</span>;
    <span class="text-bd-purple">return</span> { text, stop: <span class="text-bd-purple">true</span> };
  }
  <span class="text-bd-purple">return</span> { text };
};
modifier(text);</pre>
              </div>
            </div>

            <!-- Dynamic Context Injection -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                Dynamic Context Injection (onModelContext)
              </h3>
              <p class="text-xs text-bd-text-secondary mb-3">Prepend game state to the context so the AI knows about your custom mechanics.</p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-purple">const</span> modifier = (text) => {
  <span class="text-bd-purple">const</span> stats = <span class="text-bd-green">`[Player HP: ${state.hp}/100, Location: ${state.location}]`</span>;
  <span class="text-bd-purple">return</span> { text: stats + <span class="text-bd-green">"\n"</span> + text };
};
modifier(text);</pre>
              </div>
            </div>

            <!-- State Initialization -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Database class="w-4 h-4 text-bd-purple" />
                Safe State Initialization (Library)
              </h3>
              <p class="text-xs text-bd-text-secondary mb-3">Always use nullish coalescing (<code>??</code>) to avoid resetting state on each turn.</p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-text-muted">// Library - runs before every modifier</span>
state.game = state.game ?? {
  hp: 100, maxHp: 100, gold: 0,
  inventory: [], location: <span class="text-bd-green">"tavern"</span>
};
state.game.turnCount = (state.game.turnCount ?? 0) + 1;</pre>
              </div>
            </div>

            <!-- Output Filtering -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <ArrowLeftToLine class="w-4 h-4 text-bd-amber" />
                Output Filtering (onOutput)
              </h3>
              <p class="text-xs text-bd-text-secondary mb-3">Clean up common AI output issues like excessive newlines or unwanted patterns.</p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-purple">const</span> modifier = (text) => {
  <span class="text-bd-text-muted">// Collapse 3+ newlines into 2</span>
  text = text.replace(<span class="text-bd-green">/\n{3,}/g</span>, <span class="text-bd-green">"\n\n"</span>);
  <span class="text-bd-text-muted">// Remove AI's tendency to write "as an AI"</span>
  text = text.replace(<span class="text-bd-green">/as an ai.*?\./gi</span>, <span class="text-bd-green">""</span>);
  <span class="text-bd-purple">return</span> { text };
};
modifier(text);</pre>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Troubleshooting -->
      <section id="guide-troubleshooting" class="card">
        <button
          @click="toggleGuideSection('troubleshooting')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Bug class="w-5 h-5 text-bd-pink" />
            Troubleshooting
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('troubleshooting') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('troubleshooting')" class="mt-4">
            <div class="space-y-4">
              <!-- Dangerous Scripts -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ShieldAlert class="w-4 h-4 text-bd-amber" />
                  "Dangerous Scripts" Setting
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  New accounts have "dangerous scripts" <strong>disabled by default</strong>. Many useful scripts 
                  (including Auto Cards) are classified as "dangerous" even though they're safe.
                </p>
                <p class="text-sm text-bd-text-muted">
                  <strong>Fix:</strong> Go to Account Settings → Enable "Run Dangerous Scripts"
                </p>
              </div>

              <!-- Context Viewer Bug -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Eye class="w-4 h-4 text-bd-pink" />
                  Context Viewer Shows Wrong Data
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  The context viewer can be misleading! <code class="text-bd-green">state.memory</code> modifications 
                  (like <code>frontMemory</code>, <code>authorsNote</code>) may not appear in "Show Context" even when working.
                </p>
                <p class="text-sm text-bd-text-muted">
                  <strong>Note:</strong> This commonly confuses new scripters. If your <code>log()</code> output shows 
                  the correct values, your script is likely working even if the viewer doesn't show it.
                </p>
              </div>

              <!-- Plot Essentials / Author's Note Visual Updates (Fixed) -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Check class="w-4 h-4 text-bd-green" />
                  Plot Essentials &amp; Author's Note Updates
                  <span class="tag bg-bd-green/20 text-bd-green text-[10px]">Fixed</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  Previously, when scripts modified Plot Essentials or Author's Note fields, the UI would not 
                  visually update until the page was reloaded. <strong>This has been fixed</strong> and changes made 
                  by scripts now reflect in the UI immediately.
                </p>
              </div>

              <!-- Take a Turn vs Continue -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 text-bd-cyan" />
                  Take a Turn vs Continue
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  Some <code class="text-bd-green">state.memory</code> modifications may only work on <strong>Continue</strong> 
                  and not on <strong>Take a Turn</strong>. This is a known quirk.
                </p>
                <p class="text-sm text-bd-text-muted">
                  <strong>Workaround:</strong> Modify <code>text</code> directly in the context modifier instead of 
                  relying solely on <code>state.memory</code>.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Common Mistakes -->
      <section id="guide-common-mistakes" class="card">
        <button
          @click="toggleGuideSection('common-mistakes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Mistakes
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('common-mistakes') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-mistakes')" class="mt-4">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Forgetting to Return Text
                </h4>
                <p class="text-xs text-bd-text-secondary">Modifying <code>text</code> but forgetting <code>return { text }</code>. The modifier silently does nothing.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Always end with <code>return { text };</code> and call <code>modifier(text);</code> at the bottom.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Resetting State Every Turn
                </h4>
                <p class="text-xs text-bd-text-secondary">Writing <code>state.hp = 100</code> instead of <code>state.hp = state.hp ?? 100</code>. Your state resets on every action.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use nullish coalescing (<code>??</code>) for all state initialization in the Library.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Returning Empty String
                </h4>
                <p class="text-xs text-bd-text-secondary">Returning <code>{ text: "" }</code> from onInput or onOutput throws an error. Only onModelContext handles empty strings (rebuilds context).</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Always return non-empty text, or use <code>{ stop: true }</code> to prevent AI from running.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Using async/await
                </h4>
                <p class="text-xs text-bd-text-secondary">AI Dungeon's scripting environment does <strong>not support</strong> async/await, Promises, or any asynchronous operations.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Keep everything synchronous. Use <code>state</code> to persist data across turns instead.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Not Enabling "Dangerous Scripts"
                </h4>
                <p class="text-xs text-bd-text-secondary">Many useful scripts are classified as "dangerous" and won't run on new accounts by default.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Account Settings → Enable "Run Dangerous Scripts". This is safe for community scripts.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Trusting Context Viewer
                </h4>
                <p class="text-xs text-bd-text-secondary"><code>state.memory</code> changes (frontMemory, authorsNote) may not show in View Context even when working correctly.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use <code>log()</code> to verify values. If logs show correct data, your script is working.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Ultrascripts Cross-Link -->
      <section id="guide-ultrascripts" class="card">
        <div class="p-4 rounded-lg bg-gradient-to-r from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Terminal class="w-4 h-4 text-bd-accent-primary" />
            Beyond vanilla scripting: Ultrascripts
          </h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            BetterDungeon ships <strong class="text-bd-text-primary">Ultrascripts</strong>, a cards-based scripting platform
            with dynamic widget rendering, web access, asynchronous AI queries, and real-world context modules &mdash; all over a bidirectional Story Card bridge.
            Vanilla scripts and Ultrascripts coexist; reach for Ultrascripts when you need capabilities the sandbox alone cannot deliver.
          </p>
          <div class="flex items-center gap-3 flex-wrap">
            <router-link to="/ultrascripts" class="btn btn-primary text-sm">
              <Terminal class="w-4 h-4" />
              Explore Ultrascripts
            </router-link>
            <span class="text-xs text-bd-text-muted">8 first-party modules &middot; shipped with BetterDungeon V2</span>
          </div>
        </div>
      </section>

      <!-- Useful Links -->
      <section id="guide-links" class="card">
        <button
          @click="toggleGuideSection('links')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ExternalLink class="w-5 h-5 text-bd-accent-primary" />
            Useful Links
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('links') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('links')" class="mt-4">
            <div class="grid md:grid-cols-2 gap-4">
              <a 
                href="https://github.com/latitudegames/Scripting" 
                target="_blank"
                class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-accent-primary/50 transition-colors group"
              >
                <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
                  <FileCode class="w-4 h-4 text-bd-accent-primary" />
                  Official Documentation
                </h3>
                <p class="text-sm text-bd-text-muted">Latitude's official scripting repository and examples</p>
              </a>
              <a 
                href="https://docs.google.com/document/d/1DV6b0K-a5mTBpO1-ZbMSaXFOJxGi5MnNnHQCHF0c-DQ" 
                target="_blank"
                class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-accent-primary/50 transition-colors group"
              >
                <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
                  <BookOpen class="w-4 h-4 text-bd-blue" />
                  Scripting Guidebook
                </h3>
                <p class="text-sm text-bd-text-muted">Comprehensive community scripting guide</p>
              </a>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Credits -->
      <section id="guide-credits" class="card">
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
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
            <div class="mb-4">
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who wrote scripts and other tools, or created guides and resources for scripting:
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

        </div>
      </div>
    </template>

    <!-- ==================== COLLECTION TAB ==================== -->
    <template v-if="activeTab === 'collection'">

      <!-- Collection Introduction -->
      <div class="card bg-gradient-to-r from-bd-cyan/10 to-bd-blue/10 border-bd-cyan/30 relative overflow-hidden animate-fade-in">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-cyan via-bd-blue to-bd-purple" />
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-bd-cyan/20 flex items-center justify-center flex-shrink-0">
            <Code class="w-6 h-6 text-bd-cyan" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-bd-text-primary mb-1">Script Collection</h2>
            <p class="text-sm text-bd-text-secondary">
              Ready-to-use scripts for AI Dungeon. Copy the code into your scenario's script files 
              to add new features and mechanics.
            </p>
          </div>
        </div>
      </div>

    <!-- Warning Notice -->
    <section class="card border-bd-warning/30">
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-5 h-5 text-bd-warning flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Advanced Feature</h3>
          <p class="text-sm text-bd-text-secondary mb-2">
            Scripts require JavaScript knowledge. Make sure to backup your scenarios before applying scripts.
            Enable "Run Dangerous Scripts" in Account Settings if scripts don't work.
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Filter Buttons -->
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs text-bd-text-muted mr-1">Quick filters:</span>
      <button 
        @click="toggleQuickFilter('essential')"
        class="btn text-sm"
        :class="quickFilter === 'essential' ? 'btn-primary' : 'btn-secondary'"
      >
        <Star class="w-4 h-4" />
        Must-Have
      </button>
      <button 
        @click="toggleQuickFilter('starter')"
        class="btn text-sm"
        :class="quickFilter === 'starter' ? 'btn-primary' : 'btn-secondary'"
      >
        <Rocket class="w-4 h-4" />
        Beginner Friendly
      </button>
      <button 
        @click="toggleQuickFilter('high-impact')"
        class="btn text-sm"
        :class="quickFilter === 'high-impact' ? 'btn-primary' : 'btn-secondary'"
      >
        <Zap class="w-4 h-4" />
        High Impact
      </button>
      <div class="flex-1"></div>
      <button 
        @click="showFilters = !showFilters"
        class="btn btn-secondary text-sm"
        :class="{ 'ring-2 ring-bd-accent-primary': hasActiveFilters }"
      >
        <SlidersHorizontal class="w-4 h-4" />
        Advanced Filters
        <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-bd-accent-primary"></span>
      </button>
    </div>

    <!-- Search Bar -->
    <SearchBar
      v-model="searchQuery"
      placeholder="Search scripts by name, tag, or description..."
      :suggestions="searchSuggestions"
      :result-count="filteredScripts.length"
      @search="handleSearch"
    />

    <section class="rounded-xl border border-bd-accent-primary/30 bg-bd-bg-secondary p-4">
      <div class="flex flex-col gap-4">
        <div>
          <h3 class="text-sm font-semibold text-bd-text-primary">Ultrascripts scripts come in two flavors</h3>
          <p class="text-xs text-bd-text-secondary mt-1">
            Some scripts use BetterDungeon as an upgrade path. Others depend on Ultrascripts for their core mechanic. Browse them as different promises.
            Start with the matching template before building a complete script.
          </p>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div class="rounded-lg border border-bd-emerald/30 bg-bd-bg-primary p-3">
            <div class="flex items-center gap-2 mb-1">
              <Zap class="w-4 h-4 text-bd-emerald" />
              <h4 class="text-xs font-semibold text-bd-emerald">Enhanced with Ultrascripts</h4>
            </div>
            <p class="text-[11px] text-bd-text-secondary">
              The core script still works in plain AI Dungeon. BetterDungeon adds optional sidebar UI, richer display, or smoother interaction on top.
            </p>
          </div>
          <div class="rounded-lg border border-bd-purple/30 bg-bd-bg-primary p-3">
            <div class="flex items-center gap-2 mb-1">
              <Rocket class="w-4 h-4 text-bd-purple" />
              <h4 class="text-xs font-semibold text-bd-purple">Requires Ultrascripts</h4>
            </div>
            <p class="text-[11px] text-bd-text-secondary">
              The main value of the script depends on BetterDungeon being present. If Ultrascripts is missing, the script should be treated as a hard requirement, not an optional bonus.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Filter Panel -->
    <Transition name="slide">
      <div v-if="showFilters" class="card-elevated space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary">Filters</h3>
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-bd-accent-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <!-- Category Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Category</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="toggleCategory(category.id)"
              class="tag cursor-pointer transition-all flex items-center gap-1.5"
              :class="selectedCategories.includes(category.id) 
                  ? 'bg-bd-accent-primary/20 text-bd-accent-light border border-bd-accent-primary/30' 
                  : 'hover:bg-bd-tag-bg'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Difficulty Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Difficulty</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="diff in difficulties" 
              :key="diff.id"
              @click="toggleDifficulty(diff.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedDifficulties.includes(diff.id) 
                ? diff.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Impact Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Impact</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="imp in impacts" 
              :key="imp.id"
              @click="toggleImpact(imp.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedImpacts.includes(imp.id) 
                ? imp.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ imp.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-bd-text-muted">
        Showing {{ filteredScripts.length }} of {{ scripts.length }} scripts
      </span>
    </div>

    <!-- Category Jump Navigation (default view - no filters active) -->
    <div v-if="!hasAnyFilters" class="sticky top-0 lg:top-0 bg-bd-bg-primary/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 border-b border-bd-border-subtle" style="z-index: var(--bd-z-sticky)">
      <div class="flex items-center gap-1">
        <button
          v-if="hasPrevCategory"
          @click="scrollToPrevCategory"
          class="flex-shrink-0 p-1 rounded-lg text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary transition-all"
          aria-label="Previous category"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span class="text-xs text-bd-text-muted font-medium whitespace-nowrap flex-shrink-0">Jump to:</span>
          <button
            v-for="category in categoriesWithScripts"
            :key="'jump-' + category.id"
            @click="scrollToCategory(category.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
            :class="activeCategoryId === category.id 
              ? getCategoryBgClass(category.color) + ' ' + getCategoryTextClass(category.color)
              : 'text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary'"
          >
            <component :is="getCategoryIcon(category.icon)" class="w-3 h-3" />
            {{ category.name }}
            <span class="opacity-60">({{ category.count }})</span>
          </button>
        </div>
        <button
          v-if="hasNextCategory"
          @click="scrollToNextCategory"
          class="flex-shrink-0 p-1 rounded-lg text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary transition-all"
          aria-label="Next category"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Scripts by Category -->
    <div v-if="!hasAnyFilters" class="space-y-8">
      <section 
        v-for="category in categoriesWithScripts" 
        :key="category.id"
        :id="'category-' + category.id"
        :ref="el => setCategoryRef(category.id, el)"
      >
        <div class="flex items-center gap-3 mb-4">
          <div 
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="getCategoryBgClass(category.color)"
          >
            <component :is="getCategoryIcon(category.icon)" class="w-4 h-4" :class="getCategoryTextClass(category.color)" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">{{ category.name }}</h3>
            <p class="text-xs text-bd-text-muted">{{ category.description }}</p>
          </div>
          <span class="ml-auto tag">{{ category.count }}</span>
        </div>
        
        <div class="grid gap-3">
          <ScriptItem 
            v-for="script in getScriptsForCategory(category.id)" 
            :key="script.id"
            :script="script"
          />
        </div>
      </section>
    </div>

    <!-- Filtered Results -->
    <div v-if="hasAnyFilters" class="grid gap-3">
      <ScriptItem 
        v-for="script in filteredScripts" 
        :key="script.id"
        :script="script"
      />
      
      <!-- Empty State -->
      <div v-if="filteredScripts.length === 0" class="text-center py-12">
        <Code class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No scripts found</h3>
        <p class="text-bd-text-secondary">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <button @click="clearFilters" class="btn btn-secondary mt-4">
          Clear Search & Filters
        </button>
      </div>
    </div>

    <!-- Contribute CTA -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <GitPullRequest class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Scripts!</h3>
          <p class="text-bd-text-secondary mb-4">
            Have a useful script to share? We'd love to add it to the collection. 
            Just open a GitHub issue or check our contribution guide.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <GitPullRequest class="w-4 h-4" />
            Submit Your Script
          </router-link>
        </div>
      </div>
    </section>

    </template>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ScriptItem from '@/components/ui/ScriptItem.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import { usePreferences } from '@/composables/usePreferences'
import { 
  SCRIPTS, 
  SCRIPT_CATEGORIES,
  getScriptsByCategory,
  searchScripts
} from '@/data/scripts'
import { searchCollectionWithScores } from '@/data/shared'
import { SCRIPTING_CONTRIBUTORS as scriptingContributors } from '@/data/contributors'
import { 
  Code, AlertTriangle, Dices, Clock, Terminal, Wand2, FolderOpen, 
  BookOpen, GitPullRequest, HelpCircle, Check, Braces, FileCode, 
  Library, ArrowRightToLine, Layers, ArrowLeftToLine, Database, 
  Lightbulb, Wrench, Plus, Search, Bug, ShieldAlert, Eye, RefreshCw, 
  ExternalLink, Settings, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Info, MessageSquare,
  Star, Rocket, SlidersHorizontal, Zap, X, Github
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const activeTab = ref('collection')

const tabs = [
  { id: 'collection', label: 'Examples', icon: Layers },
]

const validTabIds = tabs.map(tab => tab.id)

const switchTab = (tabId) => {
  if (!validTabIds.includes(tabId)) return
  router.replace({ query: { ...route.query, tab: tabId } })
}


const scripts = ref(SCRIPTS)
const categories = ref(SCRIPT_CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDifficulties = ref([])
const showFilters = ref(false)
const quickFilter = ref(null)

const difficulties = [
  { id: 'beginner', label: 'Beginner', activeClass: 'bg-bd-green/20 text-bd-green border border-bd-green/30' },
  { id: 'intermediate', label: 'Intermediate', activeClass: 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30' },
  { id: 'advanced', label: 'Advanced', activeClass: 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30' }
]

const impacts = [
  { id: 'high', label: 'High Impact', activeClass: 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30' },
  { id: 'medium', label: 'Medium Impact', activeClass: 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30' },
  { id: 'low', label: 'Low Impact', activeClass: 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default' }
]

const selectedImpacts = ref([])

const { addToSearchHistory } = usePreferences()

// Get unique tags for search suggestions
const searchSuggestions = computed(() => {
  const allTags = [...new Set(scripts.value.flatMap(s => s.tags || []))]
  return allTags.slice(0, 20)
})

const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}

// ===========================================
// GUIDE TABLE OF CONTENTS
// ===========================================
const guideSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'modifier-structure', label: 'Modifier Structure' },
  { id: 'script-files', label: 'Script Files' },
  { id: 'return-values', label: 'Return Values' },
  { id: 'api-parameters', label: 'API Parameters' },
  { id: 'api-functions', label: 'API Functions' },
  { id: 'utility-functions', label: 'Utility Functions' },
  { id: 'common-patterns', label: 'Common Patterns' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'ultrascripts', label: 'Ultrascripts' },
  { id: 'links', label: 'Useful Links' },
  { id: 'credits', label: 'Credits' }
]

const expandedGuideSections = ref(new Set(guideSections.map(section => section.id)))

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
  expandedGuideSections.value = new Set(guideSections.map(section => section.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}

// Handle initial search query and tab from URL (e.g. from global search)
onMounted(() => {
  if (route.query.tab && validTabIds.includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
  if (route.query.q) {
    searchQuery.value = route.query.q
    // Ensure we're on the collection tab so filtered results are visible
    if (!route.query.tab) activeTab.value = 'collection'
  }
  // Initialize category observer if starting on collection tab
  if (activeTab.value === 'collection') {
    nextTick(() => {
      setupCategoryObserver()
    })
  }
})

watch(() => route.query.tab, (newTab) => {
  activeTab.value = validTabIds.includes(newTab) ? newTab : 'collection'
})

watch(() => route.query.q, (newQuery) => {
  searchQuery.value = typeof newQuery === 'string' ? newQuery : ''
})

onUnmounted(() => {
  if (categoryObserver) categoryObserver.disconnect()
})

const filteredScripts = computed(() => {
  let result = [...scripts.value]
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = result.filter(s => s.essential === true)
  } else if (quickFilter.value === 'starter') {
    result = result.filter(s => s.difficulty === 'beginner')
  } else if (quickFilter.value === 'high-impact') {
    result = result.filter(s => s.impact === 'high')
  }
  
  // Filter by search query using fuzzy search
  if (searchQuery.value) {
    const searchResults = searchCollectionWithScores(
      result,
      searchQuery.value,
      ['name', 'description', 'tags', 'purpose', 'author'],
      { useTagAliases: true }
    )
    result = searchResults.map(r => r.item)
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(s => selectedCategories.value.includes(s.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(s => selectedDifficulties.value.includes(s.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(s => selectedImpacts.value.includes(s.impact))
  }
  
  // Apply sorting based on active quick filter or default alphabetical
  const impactOrder = { high: 0, medium: 1, low: 2 }
  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }
  
  if (quickFilter.value === 'essential' || quickFilter.value === 'starter') {
    // Sort by impact (high first), then by name
    result.sort((a, b) => {
      const impactDiff = (impactOrder[a.impact] ?? 3) - (impactOrder[b.impact] ?? 3)
      if (impactDiff !== 0) return impactDiff
      return (a.name || '').localeCompare(b.name || '')
    })
  } else if (quickFilter.value === 'high-impact') {
    // Sort by difficulty (beginner first), then by name
    result.sort((a, b) => {
      const diffDiff = (difficultyOrder[a.difficulty] ?? 3) - (difficultyOrder[b.difficulty] ?? 3)
      if (diffDiff !== 0) return diffDiff
      return (a.name || '').localeCompare(b.name || '')
    })
  } else if (!searchQuery.value) {
    // Default: sort alphabetically by name when no search query
    result.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }
  // When searching, keep the search relevance order from searchCollectionWithScores
  
  return result
})

const hasActiveFilters = computed(() => 
  selectedCategories.value.length > 0 || 
  selectedDifficulties.value.length > 0 ||
  selectedImpacts.value.length > 0
)

const hasAnyFilters = computed(() => 
  searchQuery.value || 
  quickFilter.value || 
  hasActiveFilters.value
)

const toggleQuickFilter = (filter) => {
  if (quickFilter.value === filter) {
    quickFilter.value = null
  } else {
    quickFilter.value = filter
    selectedCategories.value = []
    selectedDifficulties.value = []
    selectedImpacts.value = []
  }
}

const toggleCategory = (categoryId) => {
  quickFilter.value = null
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const toggleDifficulty = (difficultyId) => {
  quickFilter.value = null
  const index = selectedDifficulties.value.indexOf(difficultyId)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(difficultyId)
  }
}

const toggleImpact = (impactId) => {
  quickFilter.value = null
  const index = selectedImpacts.value.indexOf(impactId)
  if (index > -1) {
    selectedImpacts.value.splice(index, 1)
  } else {
    selectedImpacts.value.push(impactId)
  }
}

const categoriesWithScripts = computed(() => {
  return categories.value.filter(cat => cat.count > 0)
})

// --- Category jump navigation ---
const activeCategoryId = ref(null)
const categoryRefs = {}
let categoryObserver = null

// Category arrow navigation
const activeCategoryIndex = computed(() => {
  const cats = categoriesWithScripts.value
  if (!activeCategoryId.value || !cats.length) return -1
  return cats.findIndex(c => c.id === activeCategoryId.value)
})

const hasPrevCategory = computed(() => activeCategoryIndex.value > 0)
const hasNextCategory = computed(() => {
  const cats = categoriesWithScripts.value
  return activeCategoryIndex.value < cats.length - 1
})

const scrollToPrevCategory = () => {
  const cats = categoriesWithScripts.value
  const idx = activeCategoryIndex.value
  if (idx > 0) scrollToCategory(cats[idx - 1].id)
}

const scrollToNextCategory = () => {
  const cats = categoriesWithScripts.value
  const idx = activeCategoryIndex.value
  if (idx < cats.length - 1) scrollToCategory(cats[idx + 1].id)
}

const setCategoryRef= (categoryId, el) => {
  if (el) categoryRefs[categoryId] = el
}

const scrollToCategory = (categoryId) => {
  const el = categoryRefs[categoryId]
  if (!el) return
  const offset = 56
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeCategoryId.value = categoryId
}

const setupCategoryObserver = () => {
  if (categoryObserver) categoryObserver.disconnect()

  categoryObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id?.replace('category-', '')
          if (id) activeCategoryId.value = id
        }
      }
    },
    { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
  )

  Object.values(categoryRefs).forEach(el => {
    if (el) categoryObserver.observe(el)
  })
}

watch([() => activeTab.value, categoriesWithScripts], ([tab]) => {
  if (tab === 'collection') {
    nextTick(() => {
      setupCategoryObserver()
    })
  } else {
    if (categoryObserver) categoryObserver.disconnect()
  }
})

const getScriptsForCategory = (categoryId) => {
  return getScriptsByCategory(categoryId)
}

const iconMap = {
  'BookOpen': BookOpen,
  'Dices': Dices,
  'Clock': Clock,
  'Terminal': Terminal,
  'Wand2': Wand2,
  'FolderOpen': FolderOpen,
  'Settings': Settings,
  'Zap': Zap,
  'Rocket': Rocket
}

const getCategoryIcon = (iconName) => {
  return iconMap[iconName] || FolderOpen
}

const getCategoryBgClass = (color) => {
  const map = {
    'bd-green': 'bg-bd-green/20',
    'bd-purple': 'bg-bd-purple/20',
    'bd-blue': 'bg-bd-blue/20',
    'bd-cyan': 'bg-bd-cyan/20',
    'bd-pink': 'bg-bd-pink/20',
    'bd-amber': 'bg-bd-amber/20',
    'bd-emerald': 'bg-bd-emerald/20'
  }
  return map[color] || 'bg-bd-tag-bg'
}

const getCategoryTextClass = (color) => {
  const map = {
    'bd-green': 'text-bd-green',
    'bd-purple': 'text-bd-purple',
    'bd-blue': 'text-bd-blue',
    'bd-cyan': 'text-bd-cyan',
    'bd-pink': 'text-bd-pink',
    'bd-amber': 'text-bd-amber',
    'bd-emerald': 'text-bd-emerald'
  }
  return map[color] || 'text-bd-text-muted'
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}
</script>

<style scoped>
/* === Hero background === */
.scripts-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.hero-orb--cyan {
  width: 220px;
  height: 220px;
  background: var(--bd-cyan);
  top: -40px;
  right: -20px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--blue {
  width: 160px;
  height: 160px;
  background: var(--bd-blue);
  bottom: -30px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

/* === Hide scrollbar on category jump nav === */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
