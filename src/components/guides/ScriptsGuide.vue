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
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Is Scripting?
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }" />
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
                  <li>• Attached to <strong>Scenarios</strong>, not adventures</li>
                  <li>• Only <strong>Simple Start</strong> and <strong>Character Creator</strong> scenarios can have scripts</li>
                  <li>• Only the scenario creator can see the scripts</li>
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

      <!-- Modifier Structure & Return Values -->
      <section id="guide-modifier-structure" class="card">
        <button @click="toggleGuideSection('modifier-structure')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Braces class="w-5 h-5 text-bd-purple" />
            Modifier Structure
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('modifier-structure') }" />
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
            <!-- Return Values (merged) -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1"><code class="text-bd-green">{ text: "..." }</code></h4>
                <p class="text-xs text-bd-text-secondary">The modified text to use instead of the original. <strong>Required</strong> in most cases.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1"><code class="text-bd-green">{ stop: true }</code></h4>
                <p class="text-xs text-bd-text-secondary">Prevents the game loop from proceeding. Useful when input should update state but not call the AI.</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-xs text-bd-text-secondary">
                <strong class="text-bd-text-primary">Empty string warning:</strong> 
                <strong>onInput</strong> & <strong>onOutput</strong> throw errors on empty strings. 
                <strong>onModelContext</strong> rebuilds context without the script.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Script Files (Hooks) -->
      <section id="guide-script-files" class="card">
        <button @click="toggleGuideSection('script-files')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileCode class="w-5 h-5 text-bd-cyan" />
            Script Files (Lifecycle Hooks)
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('script-files') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('script-files')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Scripting API consists of <strong>three lifecycle hooks</strong> plus a shared library. 
              The execution order is always <code>onHook &gt; sharedLibrary &gt; Script</code>.
            </p>
            <div class="space-y-4">
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

      <!-- API Parameters -->
      <section id="guide-api-parameters" class="card">
        <button @click="toggleGuideSection('api-parameters')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Database class="w-5 h-5 text-bd-green" />
            API Parameters
            <span class="tag bg-bd-green/20 text-bd-green text-xs">Reference</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('api-parameters') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('api-parameters')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">Scripts have access to these parameters directly, no need to deconstruct from an object.</p>
            <div class="space-y-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">text</code></h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <strong>onInput:</strong> The text entered by the player</li>
              <li>• <strong>onModelContext:</strong> The text that would be sent to the AI</li>
              <li>• <strong>onOutput:</strong> The text that would be returned to the player</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">history</code></h3>
            <p class="text-sm text-bd-text-secondary mb-2">Array of recent actions. Each action has:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">text</code> - The text of the action</li>
              <li>• <code class="text-bd-cyan">type</code> - Type: <code>start</code>, <code>continue</code>, <code>do</code>, <code>say</code>, <code>story</code>, <code>see</code></li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">storyCards</code></h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Array of <router-link to="/story-cards" class="text-bd-accent-primary hover:underline">story cards</router-link>. Each card has:
            </p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">id</code> - Unique numerical ID</li>
              <li>• <code class="text-bd-cyan">title</code> - Display title</li>
              <li>• <code class="text-bd-cyan">keys</code> - Trigger keys</li>
              <li>• <code class="text-bd-cyan">entry</code> - The card's content</li>
              <li>• <code class="text-bd-cyan">description</code> - Card description</li>
              <li>• <code class="text-bd-cyan">type</code> - Category type</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">state</code></h3>
            <p class="text-sm text-bd-text-secondary mb-2">Persistent object for storing data across turns. Special fields:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">state.memory.context</code> - Added to context beginning (replaces Memory)</li>
              <li>• <code class="text-bd-cyan">state.memory.authorsNote</code> - Added before last AI response</li>
              <li>• <code class="text-bd-cyan">state.memory.frontMemory</code> - Added to context end</li>
              <li>• <code class="text-bd-cyan">state.message</code> - Shown to the player as info message</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">info</code></h3>
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
        <button @click="toggleGuideSection('api-functions')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-cyan" />
            API Functions
            <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Reference</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('api-functions') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('api-functions')" class="mt-4">
            <div class="space-y-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">log(message)</code>
                  <span class="text-[10px] text-bd-text-muted uppercase">Console Quirks</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">Logs information to the console. <code>console.log()</code> also works.</p>
                <div class="p-3 rounded bg-bd-amber/5 border border-bd-amber/20 text-xs text-bd-text-secondary">
                  <p><strong>Note:</strong> AI Dungeon logs are stringified through GraphQL. This causes <code>undefined</code> values to appear as <code>null</code> in the console output.</p>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">addStoryCard(keys, entry, type)</code>
                  <span class="text-[10px] text-bd-pink uppercase">Buggy with Memory Bank OFF</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">Adds a new story card. Returns index of new card, or <code>false</code> if card with same keys exists.</p>
                <p class="text-[11px] text-bd-text-muted"><strong>Tip:</strong> If <code>addStoryCard</code> fails, you can manually push to the <code>storyCards</code> array.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">updateStoryCard(index, keys, entry, type)</code></h3>
                <p class="text-sm text-bd-text-secondary">Updates an existing story card. Throws error if card doesn't exist.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">removeStoryCard(index)</code></h3>
                <p class="text-sm text-bd-text-secondary">Removes a story card. Throws error if card doesn't exist.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Utility Functions -->
      <section id="guide-utility-functions" class="card">
        <button @click="toggleGuideSection('utility-functions')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-cyan" />
            Useful Utility Functions
            <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">By LewdLeah</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('utility-functions') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('utility-functions')" class="mt-4">
            <p class="text-bd-text-secondary mb-4">These functions make story card management much easier. Add them to your <strong>Library</strong>.</p>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle mb-4">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Plus class="w-4 h-4 text-bd-green" />
                buildCard() - Create Story Cards
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">Creates a new story card with all properties set properly:</p>
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
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Search class="w-4 h-4 text-bd-blue" />
                getCard() - Find Story Cards
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">Like <code class="text-bd-green">Array.find</code> but specialized for story cards:</p>
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
        <button @click="toggleGuideSection('common-patterns')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Common Patterns
            <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Recipes</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('common-patterns') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-patterns')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">Practical code patterns you can adapt for your own scripts.</p>
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

      <!-- Library-Centric Hook Pattern -->
      <section id="guide-hook-pattern" class="card">
        <button @click="toggleGuideSection('hook-pattern')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <GitMerge class="w-5 h-5 text-bd-emerald" />
            Library-Centric Hook Pattern
            <span class="tag bg-bd-emerald/20 text-bd-emerald text-xs">Recommended</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('hook-pattern') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('hook-pattern')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Rather than splitting logic across separate script files, this pattern keeps <strong>all logic inside the Library file</strong>
              within a single function on <code class="text-bd-green">globalThis</code>. Each lifecycle hook (Input, Context, Output) simply calls
              that function with a <code class="text-bd-green">hook</code> parameter to control which behavior runs.
            </p>
            <div class="p-4 rounded-lg bg-bd-emerald/10 border border-bd-emerald/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Check class="w-4 h-4 text-bd-emerald" />
                Why Use This Pattern?
              </h3>
              <ul class="text-sm text-bd-text-secondary space-y-1">
                <li>• <strong>Minimal script conflicts</strong> - All logic is self-contained in the Library, so other scripts can coexist without clashing</li>
                <li>• <strong>Easy composability</strong> - To add another script (e.g. Inner Self), just paste its library function into your Library file and call it from each hook</li>
                <li>• <strong>Single source of truth</strong> - No duplicated state or logic across files; everything lives in one place</li>
                <li>• <strong>Clean lifecycle files</strong> - Input, Context, and Output files become one-liners</li>
              </ul>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Library class="w-4 h-4 text-bd-purple" />
                Library File Structure
              </h3>
              <p class="text-xs text-bd-text-secondary mb-3">Define your script as a named function on <code class="text-bd-green">globalThis</code>, then branch on the <code class="text-bd-green">hook</code> parameter.</p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-purple">globalThis</span>.<span class="text-bd-cyan">MyScript</span> = <span class="text-bd-purple">function</span> <span class="text-bd-cyan">MyScript</span>(<span class="text-bd-amber">hook</span>) {
  <span class="text-bd-green">"use strict"</span>;

  <span class="text-bd-text-muted">// State initialization (runs every call, ?? keeps existing values)</span>
  <span class="text-bd-purple">const</span> S = (state.myScript ||= { count: 0 });

  <span class="text-bd-text-muted">// Helper functions available to all hooks</span>
  <span class="text-bd-purple">function</span> <span class="text-bd-cyan">formatStatus</span>() { <span class="text-bd-purple">return</span> <span class="text-bd-green">`Count: ${S.count}`</span>; }

  <span class="text-bd-text-muted">// -------- hook: input --------</span>
  <span class="text-bd-purple">if</span> (<span class="text-bd-amber">hook</span> === <span class="text-bd-green">"input"</span>) {
    S.count += 1;
    <span class="text-bd-purple">return</span>;
  }

  <span class="text-bd-text-muted">// -------- hook: context --------</span>
  <span class="text-bd-purple">if</span> (<span class="text-bd-amber">hook</span> === <span class="text-bd-green">"context"</span>) {
    <span class="text-bd-text-muted">// Modify globalThis.text for AI context</span>
    <span class="text-bd-purple">return</span>;
  }

  <span class="text-bd-text-muted">// -------- hook: output --------</span>
  <span class="text-bd-purple">if</span> (<span class="text-bd-amber">hook</span> === <span class="text-bd-green">"output"</span>) {
    <span class="text-bd-text-muted">// Modify globalThis.text for player display</span>
    <span class="text-bd-purple">return</span>;
  }
};</pre>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ArrowRightToLine class="w-3 h-3 text-bd-green" />
                  Input File
                </h4>
                <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                  <pre><span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"input"</span>);</pre>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Layers class="w-3 h-3 text-bd-blue" />
                  Context File
                </h4>
                <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                  <pre><span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"context"</span>);</pre>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ArrowLeftToLine class="w-3 h-3 text-bd-amber" />
                  Output File
                </h4>
                <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                  <pre><span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"output"</span>);</pre>
                </div>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <GitMerge class="w-4 h-4 text-bd-blue" />
                Composing Multiple Scripts
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Because each script is a self-contained function on <code class="text-bd-green">globalThis</code>, you can combine
                multiple scripts by pasting their library functions together and calling each one from the hook files.
              </p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                <pre><span class="text-bd-text-muted">// Input file - run both scripts</span>
<span class="text-bd-cyan">Chronos</span>(<span class="text-bd-green">"input"</span>);
<span class="text-bd-cyan">InnerSelf</span>(<span class="text-bd-green">"input"</span>);</pre>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-3">
                <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                <p class="text-sm text-bd-text-secondary">
                  <strong class="text-bd-text-primary">Tip:</strong> Scripts like <strong>Inner Self</strong> and <strong>Chronos</strong>
                  already use this pattern. If you want to add them alongside your own script, just paste their library
                  function into your Library file and add the corresponding call in each hook file.
                </p>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <FileCode class="w-4 h-4 text-bd-accent-primary" />
                Relationship to the Official API
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                The <a href="https://help.aidungeon.com/scripting" target="_blank" class="text-bd-accent-primary hover:underline">official AI Dungeon scripting docs</a>
                describe a <code class="text-bd-green">modifier(text)</code> pattern where each non-Library script defines a
                <code class="text-bd-green">const modifier = (text) =&gt; { ... return { text }; };</code> function and ends with
                <code class="text-bd-green">modifier(text);</code> as the last line.
              </p>
              <p class="text-sm text-bd-text-secondary mb-3">
                The library-centric hook pattern is a <strong>community-evolved alternative</strong> used by experienced scripters.
                Instead of returning <code class="text-bd-green">{ text }</code> from a modifier function, it assigns directly to
                <code class="text-bd-green">globalThis.text</code> inside the library. AI Dungeon's runtime reads
                <code class="text-bd-green">globalThis.text</code> after each script executes, so both approaches achieve the same result.
                Similarly, <code class="text-bd-green">globalThis.stop = true</code> works the same as returning
                <code class="text-bd-green">{ stop: true }</code>.
              </p>
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-muted mb-2">Official modifier pattern</h4>
                  <div class="font-mono text-xs text-bd-text-secondary">
                    <pre><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-purple">let</span> modified = text;
  <span class="text-bd-text-muted">// ... logic ...</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: modified };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
                  </div>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-muted mb-2">Hook pattern (globalThis)</h4>
                  <div class="font-mono text-xs text-bd-text-secondary">
                    <pre><span class="text-bd-text-muted">// All logic lives in library</span>
<span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"context"</span>);
<span class="text-bd-text-muted">// Library sets globalThis.text</span>
<span class="text-bd-text-muted">// directly — same end result</span></pre>
                  </div>
                </div>
              </div>
              <p class="text-xs text-bd-text-muted mt-3">
                Both patterns use the same underlying API params (<code class="text-bd-green">text</code>, <code class="text-bd-green">state</code>,
                <code class="text-bd-green">history</code>, <code class="text-bd-green">storyCards</code>, <code class="text-bd-green">info</code>)
                and functions (<code class="text-bd-green">log</code>, <code class="text-bd-green">addStoryCard</code>,
                <code class="text-bd-green">removeStoryCard</code>, <code class="text-bd-green">updateStoryCard</code>).
                The hook pattern simply consolidates where the logic lives.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Tips & Pitfalls (merged from Troubleshooting + Common Mistakes) -->
      <section id="guide-tips-pitfalls" class="card">
        <button @click="toggleGuideSection('tips-pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips & Common Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tips-pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('tips-pitfalls')" class="mt-4 space-y-4">
            <!-- Key Gotchas -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <ShieldAlert class="w-3 h-3 text-bd-amber" /> "Dangerous Scripts" Setting
                </h4>
                <p class="text-xs text-bd-text-secondary">New accounts have this <strong>disabled by default</strong>. Many useful scripts won't run until you enable it.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Account Settings → Enable "Run Dangerous Scripts"</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <RefreshCw class="w-3 h-3 text-bd-cyan" /> Take a Turn vs Continue
                </h4>
                <p class="text-xs text-bd-text-secondary">Some <code>state.memory</code> changes only work on <strong>Continue</strong>, not Take a Turn.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Modify <code>text</code> directly in the context modifier instead.</p>
              </div>
            </div>

            <!-- Common Mistakes Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1"><X class="w-3 h-3" /> Forgetting to Return Text</h4>
                <p class="text-xs text-bd-text-secondary">Modifying <code>text</code> but forgetting <code>return { text }</code>. The modifier silently does nothing.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Always end with <code>return { text };</code> and call <code>modifier(text);</code></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1"><X class="w-3 h-3" /> Resetting State Every Turn</h4>
                <p class="text-xs text-bd-text-secondary"><code>state.hp = 100</code> instead of <code>state.hp = state.hp ?? 100</code>. State resets every action.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Use nullish coalescing (<code>??</code>) for all state init in the Library.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1"><X class="w-3 h-3" /> Using async/await</h4>
                <p class="text-xs text-bd-text-secondary">The scripting environment does <strong>not support</strong> async/await, Promises, or any async operations.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Keep everything synchronous. Use <code>state</code> to persist data across turns.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1"><X class="w-3 h-3" /> Trusting Context Viewer</h4>
                <p class="text-xs text-bd-text-secondary"><code>state.memory</code> changes (frontMemory, authorsNote) may not show in View Context even when working.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Use <code>log()</code> to verify. If logs show correct data, your script is working.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- BetterScripts Section Moved -->
      <section id="guide-betterscripts" class="card">
        <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Terminal class="w-4 h-4 text-bd-blue" />
            BetterScripts Has Moved
          </h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            The BetterScripts documentation has been moved to its own dedicated guide with expanded content, examples, and detailed explanations.
          </p>
          <div class="flex items-center gap-3">
            <router-link to="/guides?tab=betterscripts" class="btn btn-primary text-sm">
              <Terminal class="w-4 h-4" />
              View BetterScripts Guide
            </router-link>
            <span class="text-xs text-bd-text-muted">Complete documentation for BetterDungeon's widget system</span>
          </div>
        </div>
      </section>

      <!-- Credits & Links -->
      <section id="guide-credits" class="card">
        <button @click="toggleGuideSection('credits')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Credits & Resources
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who wrote scripts and other tools, or created guides and resources for scripting:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in scriptingContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-cyan/10 text-bd-cyan border border-bd-cyan/20">
                  {{ name }}
                </span>
              </div>
            </div>
            <div class="grid gap-3">
              <a href="https://help.aidungeon.com/scripting" target="_blank" class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-accent-primary/50 transition-colors">
                <h4 class="text-xs font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <FileCode class="w-3 h-3 text-bd-accent-primary" /> Official Documentation
                </h4>
                <p class="text-xs text-bd-text-muted mt-1">Latitude's scripting repository and examples</p>
              </a>
            </div>
            <div class="flex flex-wrap gap-2">
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
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
  Terminal, X, GitMerge
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'modifier-structure', label: 'Modifier Structure' },
  { id: 'script-files', label: 'Script Files' },
  { id: 'api-parameters', label: 'API Parameters' },
  { id: 'api-functions', label: 'API Functions' },
  { id: 'utility-functions', label: 'Utility Functions' },
  { id: 'common-patterns', label: 'Common Patterns' },
  { id: 'hook-pattern', label: 'Hook Pattern' },
  { id: 'tips-pitfalls', label: 'Tips & Pitfalls' },
  { id: 'credits', label: 'Credits' }
]

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
