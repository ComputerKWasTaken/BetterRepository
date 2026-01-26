<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-cyan/20 flex items-center justify-center">
          <Code class="w-5 h-5 text-bd-cyan" />
        </div>
        Scripts
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Extend AI Dungeon with custom JavaScript to modify context, input, and output.
      </p>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-white/[0.06] pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-white/[0.06]'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">

      <!-- Introduction -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-blue" />
          What Is Scripting?
        </h2>
        <p class="text-bd-text-secondary mb-4">
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
        <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30 mt-4">
          <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 text-bd-pink mt-0.5 flex-shrink-0" />
            <p class="text-sm text-bd-text-secondary">
              <strong class="text-bd-text-primary">Warning:</strong> Updating scripts in a published scenario 
              affects <strong>all existing adventures</strong> using that scenario. Back up before making changes!
            </p>
          </div>
        </div>
      </section>

      <!-- Modifier Structure -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Braces class="w-5 h-5 text-bd-purple" />
          Modifier Structure
        </h2>
        <p class="text-bd-text-secondary mb-4">
          All modifiers follow the same basic structure. The <code class="text-bd-green">text</code> parameter 
          contains the content you're modifying, and you return an object with the modified text.
        </p>
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
          <pre class="text-sm text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// This is an empty modifier.</span>
  <span class="text-bd-text-muted">// Code normally goes here.</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span> };
};

<span class="text-bd-cyan">modifier</span>(<span class="text-bd-amber">text</span>)</pre>
        </div>
      </section>

      <!-- Script Files (Hooks) -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <FileCode class="w-5 h-5 text-bd-cyan" />
          Script Files (Lifecycle Hooks)
        </h2>
        <p class="text-bd-text-secondary mb-4">
          The Scripting API consists of <strong>three lifecycle hooks</strong> plus a shared library. 
          For non-library scripts, the last line must always be <code class="text-bd-green">modifier(text)</code>
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
              <strong>Not a modifier</strong> — runs before every modifier. Define helper functions and initialize state here.
            </p>
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
            <p class="text-sm text-bd-text-secondary mb-2">
              Changes the <strong>text sent to the AI</strong> before the model is called. 
              The <code class="text-bd-green">text</code> parameter is what would otherwise be sent to the AI.
            </p>
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
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Format output, clean up text</span><br>
              text = text.replace(<span class="text-bd-green">/\n{3,}/g</span>, <span class="text-bd-green">"\\n\\n"</span>);
            </div>
          </div>
        </div>
      </section>

      <!-- API Parameters -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Database class="w-5 h-5 text-bd-green" />
          API Parameters
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Scripts have access to these parameters directly — no need to deconstruct from an object.
        </p>
        
        <div class="space-y-4">
          <!-- text -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">storyCards</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Array of story cards. Each card has:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">id</code> - Unique numerical ID</li>
              <li>• <code class="text-bd-cyan">keys</code> - Trigger keys</li>
              <li>• <code class="text-bd-cyan">entry</code> - The card's content</li>
              <li>• <code class="text-bd-cyan">type</code> - Category type</li>
            </ul>
          </div>

          <!-- state -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">state</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Persistent object for storing data across turns. Special fields:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">state.memory.context</code> - Added to context beginning (replaces Memory)</li>
              <li>• <code class="text-bd-cyan">state.memory.authorsNote</code> - Added before last AI response</li>
              <li>• <code class="text-bd-cyan">state.memory.frontMemory</code> - Added to context end</li>
              <li>• <code class="text-bd-cyan">state.message</code> - Shown to the user as info message</li>
            </ul>
          </div>

          <!-- info -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">info</code>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">Additional useful values:</p>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <code class="text-bd-cyan">info.actionCount</code> - Total number of actions</li>
              <li>• <code class="text-bd-cyan">info.characterNames</code> - Array of player character names (multiplayer)</li>
              <li>• <code class="text-bd-cyan">info.maxChars</code> - Max characters for context <em>(onModelContext only)</em></li>
              <li>• <code class="text-bd-cyan">info.memoryLength</code> - Length of memory section <em>(onModelContext only)</em></li>
            </ul>
          </div>
        </div>
        
        <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30 mt-4">
          <div class="flex items-start gap-3">
            <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
            <p class="text-sm text-bd-text-secondary">
              <strong class="text-bd-text-primary">Note:</strong> The first real turn is <code class="text-bd-green">2</code>, 
              not <code class="text-bd-green">1</code>. This can be unintuitive when you're getting started.
            </p>
          </div>
        </div>
      </section>

      <!-- API Functions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-cyan" />
          API Functions
        </h2>
        
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">log(message)</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Logs information to the console. <code>console.log()</code> also works.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">addStoryCard(keys, entry, type)</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Adds a new story card. Returns index of new card, or <code>false</code> if card with same keys exists.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">updateStoryCard(index, keys, entry, type)</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Updates an existing story card. Throws error if card doesn't exist.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">removeStoryCard(index)</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Removes a story card. Throws error if card doesn't exist.
            </p>
          </div>
        </div>
      </section>

      <!-- Return Values -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <ArrowLeftToLine class="w-5 h-5 text-bd-amber" />
          Return Values
        </h2>
        <p class="text-bd-text-secondary mb-4">
          All modifiers must return an object. You can return these properties:
        </p>
        
        <div class="space-y-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">{ text: "modified text" }</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The modified text to use instead of the original. <strong>Required</strong> in most cases.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2">
              <code class="text-bd-green">{ stop: true }</code>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              If <code>stop === true</code>, the game loop will not proceed. Useful when a player input should update state but not call the AI.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30 mt-4">
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
      </section>

      <!-- Utility Functions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-cyan" />
          Useful Utility Functions
          <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">By LewdLeah</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          These functions make story card management much easier. Add them to your <strong>Library</strong>.
        </p>

        <!-- buildCard -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] mb-4">
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
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
      </section>

      <!-- Troubleshooting -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Bug class="w-5 h-5 text-bd-pink" />
          Troubleshooting
        </h2>
        
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
      </section>

      <!-- Useful Links -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <ExternalLink class="w-5 h-5 text-bd-accent-primary" />
          Useful Links
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <a 
            href="https://github.com/latitudegames/Scripting" 
            target="_blank"
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
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
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
          >
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-bd-blue" />
              Scripting Guidebook
            </h3>
            <p class="text-sm text-bd-text-muted">Comprehensive community scripting guide</p>
          </a>
          <a 
            href="https://github.com/LewdLeah/AI-Dungeon-Auto-Cards" 
            target="_blank"
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
          >
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-purple" />
              Auto Cards
            </h3>
            <p class="text-sm text-bd-text-muted">Automatic story card management by LewdLeah</p>
          </a>
        </div>
      </section>

    </template>

    <!-- ==================== COLLECTION TAB ==================== -->
    <template v-if="activeTab === 'collection'">

    <!-- Warning Notice -->
    <section class="card border-bd-warning/30">
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-5 h-5 text-bd-warning flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Advanced Feature</h3>
          <p class="text-sm text-bd-text-secondary">
            Scripts require JavaScript knowledge. Make sure to backup your scenarios before applying scripts.
            Enable "Run Dangerous Scripts" in Account Settings if scripts don't work.
          </p>
        </div>
      </div>
    </section>

    <!-- Search and Filter -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="flex-1 min-w-[200px]">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search scripts..."
          class="w-full bg-bd-bg-elevated border border-white/10 rounded-lg px-4 py-2.5 text-sm text-bd-text-primary placeholder-bd-text-muted outline-none focus:border-bd-accent-primary"
        />
      </div>
      <select 
        v-model="selectedCategory"
        class="bg-bd-bg-elevated border border-white/10 rounded-lg px-3 py-2.5 text-sm text-bd-text-primary outline-none focus:border-bd-accent-primary"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }} ({{ cat.count }})
        </option>
      </select>
      <select 
        v-model="selectedDifficulty"
        class="bg-bd-bg-elevated border border-white/10 rounded-lg px-3 py-2.5 text-sm text-bd-text-primary outline-none focus:border-bd-accent-primary"
      >
        <option value="">All Difficulties</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>
    </div>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-bd-text-muted">
        Showing {{ filteredScripts.length }} of {{ scripts.length }} scripts
      </span>
    </div>

    <!-- Scripts by Category -->
    <div v-if="!searchQuery && !selectedCategory && !selectedDifficulty" class="space-y-6">
      <div v-for="category in categoriesWithScripts" :key="category.id" class="card">
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
          <span class="ml-auto tag" :class="getCategoryBgClass(category.color) + ' ' + getCategoryTextClass(category.color)">
            {{ category.count }}
          </span>
        </div>
        
        <div class="space-y-3">
          <ScriptItem 
            v-for="script in getScriptsForCategory(category.id)" 
            :key="script.id"
            :script="script"
          />
        </div>
      </div>
    </div>

    <!-- Filtered Results -->
    <div v-else class="space-y-3">
      <ScriptItem 
        v-for="script in filteredScripts" 
        :key="script.id"
        :script="script"
      />
      
      <!-- Empty State -->
      <div v-if="filteredScripts.length === 0" class="text-center py-12">
        <Code class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No scripts found</h3>
        <p class="text-bd-text-secondary">Try adjusting your search or filters.</p>
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
            Have example scripts to share? Submit them to the 
            <a href="mailto:support@aidungeon.com" class="text-bd-accent-primary hover:underline">official Guidebook</a> 
            or post in a GitHub issue here.
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
import { ref, computed } from 'vue'
import ScriptItem from '@/components/ui/ScriptItem.vue'
import { 
  SCRIPTS, 
  SCRIPT_CATEGORIES,
  getScriptsByCategory,
  searchScripts
} from '@/data/scripts'
import { 
  Code, AlertTriangle, Dices, Clock, Terminal, Wand2, FolderOpen, 
  BookOpen, GitPullRequest, HelpCircle, Check, Braces, FileCode, 
  Library, ArrowRightToLine, Layers, ArrowLeftToLine, Database, 
  Lightbulb, Wrench, Plus, Search, Bug, ShieldAlert, Eye, RefreshCw, 
  ExternalLink, Settings
} from 'lucide-vue-next'

const activeTab = ref('collection')

const tabs = [
  { id: 'collection', label: 'Examples', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const scripts = ref(SCRIPTS)
const categories = ref(SCRIPT_CATEGORIES)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedDifficulty = ref('')

const filteredScripts = computed(() => {
  let result = [...scripts.value]
  
  if (searchQuery.value) {
    result = searchScripts(searchQuery.value)
  }
  
  if (selectedCategory.value) {
    result = result.filter(s => s.category === selectedCategory.value)
  }
  
  if (selectedDifficulty.value) {
    result = result.filter(s => s.difficulty === selectedDifficulty.value)
  }
  
  return result
})

const categoriesWithScripts = computed(() => {
  return categories.value.filter(cat => cat.count > 0)
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
  'Settings': Settings
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
    'bd-amber': 'bg-bd-amber/20'
  }
  return map[color] || 'bg-white/10'
}

const getCategoryTextClass = (color) => {
  const map = {
    'bd-green': 'text-bd-green',
    'bd-purple': 'text-bd-purple',
    'bd-blue': 'text-bd-blue',
    'bd-cyan': 'text-bd-cyan',
    'bd-pink': 'text-bd-pink',
    'bd-amber': 'text-bd-amber'
  }
  return map[color] || 'text-bd-text-muted'
}
</script>
