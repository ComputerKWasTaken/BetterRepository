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
                  <li>• <strong>Multiple Choice</strong> scenarios can't have scripts, but their <strong>options</strong> can (independent scripts per option)</li>
                  <li>• Only the scenario creator can see the scripts</li>
                  <li>• Scripts may be reviewed for moderation</li>
                  <li>• Each hook runs in a sandbox: <strong>16 MB</strong> memory limit, <strong>2-second</strong> timeout</li>
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

            <!-- Execution Pipeline -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <GitMerge class="w-4 h-4 text-bd-blue" />
                Execution Pipeline
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-xs">
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Player Input</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-semibold">onInput</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Context Assembly</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-semibold">onModelContext</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">AI Generation</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-semibold">onOutput</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-3 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Display</div>
              </div>
              <p class="text-xs text-bd-text-muted mt-2">The Library runs before each hook. Each hook receives <code class="text-bd-green">text</code> specific to its stage in the pipeline.</p>
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
              For non-Library scripts, <strong>the last line must always be <code class="text-bd-green">modifier(text)</code></strong>.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <pre class="text-sm text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// This is an empty modifier.</span>
  <span class="text-bd-text-muted">// Code normally goes here.</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span> };
};

<span class="text-bd-cyan">modifier</span>(<span class="text-bd-amber">text</span>)</pre>
            </div>
            <!-- Return Values -->
            <h3 class="font-semibold text-bd-text-primary text-sm">Return Values</h3>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">{ text: "..." }</code></h4>
              <p class="text-xs text-bd-text-secondary mb-2">The modified text to use instead of the original.</p>
              <ul class="text-[11px] text-bd-text-secondary space-y-1">
                <li>• <strong class="text-bd-green">onInput:</strong> Replaces the player's input text</li>
                <li>• <strong class="text-bd-blue">onModelContext:</strong> Replaces the text sent to the AI</li>
                <li>• <strong class="text-bd-amber">onOutput:</strong> Replaces the text shown to the player</li>
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">{ stop: true }</code></h4>
              <p class="text-xs text-bd-text-secondary mb-2">Prevents the game loop from proceeding. Useful when input should update state but not call the AI.</p>
              <ul class="text-[11px] text-bd-text-secondary space-y-1">
                <li>• <strong class="text-bd-green">onInput:</strong> Throws error: <em>"Unable to run scenario scripts"</em></li>
                <li>• <strong class="text-bd-blue">onModelContext:</strong> Throws error: <em>"Sorry, the AI is stumped..."</em></li>
                <li>• <strong class="text-bd-amber">onOutput:</strong> Changes output to "stop" (don't do this)</li>
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-xs text-bd-text-secondary">
                <strong class="text-bd-text-primary">Empty string warning:</strong> 
                <strong>onInput</strong> throws: <em>"Unable to run scenario scripts"</em>. 
                <strong>onOutput</strong> throws: <em>"A custom script running on this scenario failed"</em>. 
                <strong>onModelContext</strong> rebuilds context as though the script did not run.
              </p>
            </div>
            <div class="p-2 rounded bg-bd-info/10 border border-bd-info/30">
              <p class="text-[11px] text-bd-text-secondary">
                <strong>Tip:</strong> Returning the text <code class="text-bd-green">"stop"</code> as the text value is equivalent to returning <code class="text-bd-green">{ stop: true }</code>.
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
              Each hook runs in an <strong>isolated sandbox</strong> with a <code class="text-bd-green">16 MB</code> memory limit 
              and a <code class="text-bd-green">2-second</code> execution timeout.
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
                  <li>• <code class="text-bd-cyan">rawText</code> - Same as <code>text</code> <span class="tag bg-bd-amber/20 text-bd-amber text-[10px] ml-1">Deprecated</span></li>
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
                  <li>• <code class="text-bd-cyan">keys</code> - Keys that trigger inclusion in model context</li>
                  <li>• <code class="text-bd-cyan">entry</code> - Text included in model context when triggered</li>
                  <li>• <code class="text-bd-cyan">type</code> - Text field for separating cards into categories</li>
                </ul>
                <p class="text-[11px] text-bd-text-muted mt-2">This field was formerly named <code>worldInfo</code>. References to <code>worldInfo</code> still work for backwards compatibility.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">state</code></h3>
                <p class="text-sm text-bd-text-secondary mb-2">Persistent object for storing data across turns. Scripts can set values directly without helper functions.</p>
                <div class="space-y-3">
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">state.memory</h4>
                    <ul class="text-sm text-bd-text-secondary space-y-1">
                      <li>• <code class="text-bd-cyan">context</code> - Added to the beginning of context, before history. Corresponds to Memory in the UI.</li>
                      <li>• <code class="text-bd-cyan">authorsNote</code> - Added close to end of context, before the most recent AI response. Corresponds to Author's Note in the UI.</li>
                      <li>• <code class="text-bd-cyan">frontMemory</code> - Added to the very end of context, after the most recent player input.</li>
                    </ul>
                    <div class="mt-2 p-2 rounded bg-bd-amber/10 border border-bd-amber/20">
                      <p class="text-[11px] text-bd-text-secondary"><strong>Precedence:</strong> Setting <code>context</code> or <code>authorsNote</code> here takes precedence over the UI values, but does <strong>not</strong> update them. If set to an empty string, the UI values are still used (you cannot clear memory/author's note via state).</p>
                    </div>
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-1">state.message</h4>
                    <p class="text-sm text-bd-text-secondary">A string which will be shown to the user.</p>
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
                      state.placeholders
                      <span class="tag bg-bd-green/20 text-bd-green text-[10px]">Official</span>
                    </h4>
                    <p class="text-sm text-bd-text-secondary mb-2">Array of objects representing placeholder questions and answers from the scenario start. Populated once when the adventure is created and persists across turns.</p>
                    <ul class="text-sm text-bd-text-secondary space-y-1 mb-2">
                      <li>• <code class="text-bd-cyan">question</code> - The placeholder text between <code>${ }</code> in the scenario</li>
                      <li>• <code class="text-bd-cyan">answer</code> - The value the player entered</li>
                    </ul>
                    <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                      <pre><span class="text-bd-text-muted">// Find a specific placeholder answer</span>
<span class="text-bd-purple">const</span> playerClass = state.placeholders?.find(
  p => p.question === <span class="text-bd-green">'What is your class?'</span>
)?.answer;

<span class="text-bd-text-muted">// Iterate all placeholders</span>
<span class="text-bd-purple">for</span> (<span class="text-bd-purple">const</span> p <span class="text-bd-purple">of</span> state.placeholders || []) {
  log(p.question + <span class="text-bd-green">': '</span> + p.answer);
}</pre>
                    </div>
                  </div>
                </div>
                <div class="mt-3 p-3 rounded bg-bd-amber/5 border border-bd-amber/20">
                  <h4 class="text-xs font-semibold text-bd-amber mb-2">state.memory Timing</h4>
                  <div class="grid md:grid-cols-3 gap-2 text-[11px] text-bd-text-secondary">
                    <div class="p-2 rounded bg-bd-bg-tertiary">
                      <span class="font-semibold text-bd-green">onInput</span>
                      <p class="text-bd-text-muted">Affects context assembly for <strong>current</strong> generation</p>
                    </div>
                    <div class="p-2 rounded bg-bd-bg-tertiary">
                      <span class="font-semibold text-bd-blue">onModelContext</span>
                      <p class="text-bd-text-muted">Does NOT affect current turn (context already assembled). Modify <code>text</code> directly instead</p>
                    </div>
                    <div class="p-2 rounded bg-bd-bg-tertiary">
                      <span class="font-semibold text-bd-amber">onOutput</span>
                      <p class="text-bd-text-muted">Will not have any effect until the <strong>next</strong> player action</p>
                    </div>
                  </div>
                </div>
                <div class="mt-2 p-2 rounded bg-bd-info/10 border border-bd-info/30">
                  <p class="text-[11px] text-bd-text-secondary"><strong>Serialization:</strong> State is serialized between turns. Stick to plain data (strings, numbers, arrays, objects). Complex objects with methods or circular references won't serialize properly.</p>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">info</code></h3>
                <p class="text-sm text-bd-text-secondary mb-2">Additional values that may sometimes be useful. These values may be different for different hooks.</p>
                <div class="space-y-2">
                  <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">All Hooks</h4>
                  <ul class="text-sm text-bd-text-secondary space-y-1">
                    <li>• <code class="text-bd-cyan">info.characterNames</code> - Array of character names for players of a multiplayer adventure</li>
                    <li>• <code class="text-bd-cyan">info.actionCount</code> - Total number of actions in the adventure</li>
                  </ul>
                  <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mt-3">onModelContext Only</h4>
                  <ul class="text-sm text-bd-text-secondary space-y-1">
                    <li>• <code class="text-bd-cyan">info.maxChars</code> - Estimated maximum characters for model context (chars per token can vary)</li>
                    <li>• <code class="text-bd-cyan">info.memoryLength</code> - Number of characters included from memory</li>
                  </ul>
                </div>
                <div class="mt-3 p-3 rounded bg-bd-purple/5 border border-bd-purple/20">
                  <h4 class="text-xs font-semibold text-bd-purple mb-2 flex items-center gap-1">Community-Discovered Fields <span class="tag bg-bd-purple/20 text-bd-purple text-[10px]">Unofficial</span></h4>
                  <p class="text-[11px] text-bd-text-muted mb-2">These fields have been found to work but are not in the official documentation:</p>
                  <ul class="text-sm text-bd-text-secondary space-y-1">
                    <li>• <code class="text-bd-cyan">info.modelName</code> - Name of the AI model <em>(onModelContext &amp; onOutput)</em></li>
                    <li>• <code class="text-bd-cyan">info.storyModel.name</code> - Story model name</li>
                    <li>• <code class="text-bd-cyan">info.storyModel.version</code> - Story model version</li>
                    <li>• <code class="text-bd-cyan">info.useCacheEfficient</code> - Whether cache-efficient mode is active</li>
                    <li>• <code class="text-bd-cyan">info.emptyOutputReason</code> - Reason if the AI output was empty</li>
                  </ul>
                </div>
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
          <div v-if="isGuideSectionExpanded('api-functions')" class="mt-4 space-y-4">
            <div class="space-y-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">log(message)</code>
                  <span class="text-[10px] text-bd-text-muted uppercase">Console Quirks</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">Logs information to the console. <code>console.log()</code> also works.</p>
                <p class="text-[11px] text-bd-text-muted mb-2"><code>sandboxConsole.log</code> also works for backward compatibility, but is deprecated.</p>
                <div class="p-3 rounded bg-bd-amber/5 border border-bd-amber/20 text-xs text-bd-text-secondary">
                  <p><strong>Note:</strong> AI Dungeon logs are stringified through GraphQL. This causes <code>undefined</code> values to appear as <code>null</code> in the console output.</p>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center justify-between">
                  <code class="text-bd-green">addStoryCard(keys, entry, type)</code>
                  <span class="text-[10px] text-bd-pink uppercase">Buggy with Memory Bank OFF</span>
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">Adds a new story card and returns the index of the new card. Returns <code>false</code> if a card with the same keys already exists.</p>
                <p class="text-[11px] text-bd-text-muted mb-1"><strong>Tip:</strong> If <code>addStoryCard</code> fails, you can manually push to the <code>storyCards</code> array.</p>
                <p class="text-[11px] text-bd-text-muted"><code>addWorldEntry</code> also works for backwards compatibility. <span class="tag bg-bd-amber/20 text-bd-amber text-[10px] ml-1">Deprecated</span></p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">removeStoryCard(index)</code></h3>
                <p class="text-sm text-bd-text-secondary mb-1">Removes a story card. Throws error if card doesn't exist.</p>
                <p class="text-[11px] text-bd-text-muted"><code>removeWorldEntry</code> also works for backwards compatibility. <span class="tag bg-bd-amber/20 text-bd-amber text-[10px] ml-1">Deprecated</span></p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2"><code class="text-bd-green">updateStoryCard(index, keys, entry, type)</code></h3>
                <p class="text-sm text-bd-text-secondary mb-1">Updates an existing story card. Throws error if card doesn't exist.</p>
                <p class="text-[11px] text-bd-text-muted"><code>updateWorldEntry</code> also works for backwards compatibility. <span class="tag bg-bd-amber/20 text-bd-amber text-[10px] ml-1">Deprecated</span></p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Scripting UI -->
      <section id="guide-scripting-ui" class="card">
        <button @click="toggleGuideSection('scripting-ui')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Monitor class="w-5 h-5 text-bd-purple" />
            Scripting UI
            <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Editor</span>
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('scripting-ui') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('scripting-ui')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              When editing a Simple Start or Character Creator scenario, you can open scripting from the bottom of the <strong>Details</strong> tab.
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <FileCode class="w-4 h-4 text-bd-cyan" />
                Script Editor
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">On the left, navigate between the four available scripts. Each script has default text to help you get started.</p>
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded bg-bd-purple/10 border border-bd-purple/20">
                  <h4 class="text-xs font-semibold text-bd-purple mb-1">Library</h4>
                  <p class="text-[11px] text-bd-text-secondary">Shared functions and values available to all other scripts</p>
                </div>
                <div class="p-3 rounded bg-bd-green/10 border border-bd-green/20">
                  <h4 class="text-xs font-semibold text-bd-green mb-1">Input</h4>
                  <p class="text-[11px] text-bd-text-secondary">Runs during the <code>onInput</code> hook</p>
                </div>
                <div class="p-3 rounded bg-bd-blue/10 border border-bd-blue/20">
                  <h4 class="text-xs font-semibold text-bd-blue mb-1">Context</h4>
                  <p class="text-[11px] text-bd-text-secondary">Runs during the <code>onModelContext</code> hook</p>
                </div>
                <div class="p-3 rounded bg-bd-amber/10 border border-bd-amber/20">
                  <h4 class="text-xs font-semibold text-bd-amber mb-1">Output</h4>
                  <p class="text-[11px] text-bd-text-secondary">Runs during the <code>onOutput</code> hook</p>
                </div>
              </div>
              <p class="text-[11px] text-bd-text-muted mt-2">A white dot appears next to scripts with unsaved changes. For non-Library scripts, the last line must always be <code>modifier(text)</code>.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Play class="w-4 h-4 text-bd-green" />
                  Script Test
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">After selecting a non-Library script, a Script Test panel appears on the right.</p>
                <ul class="text-[11px] text-bd-text-secondary space-y-1">
                  <li>• <strong>Input:</strong> Text box with default value showing available input structure. Modify to test different inputs.</li>
                  <li>• <strong>Submit:</strong> Sends the input, library, and script to the server for a test run.</li>
                  <li>• <strong>Output:</strong> Shows results: <code>text</code>, <code>stop</code>, <code>logs</code>, <code>state</code>, and <code>storyCards</code>.</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Terminal class="w-4 h-4 text-bd-cyan" />
                  Console Log
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">Shows recent console logs from adventures <strong>you personally started</strong> from this scenario.</p>
                <ul class="text-[11px] text-bd-text-secondary space-y-1">
                  <li>• Logs are pushed in <strong>real time</strong>, keep the editor open alongside a play test tab</li>
                  <li>• Only logs from adventures created by the scenario creator appear</li>
                  <li>• Logs are saved for <strong>15 minutes</strong></li>
                </ul>
              </div>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                Top Navigation Bar
              </h3>
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1">← Back</h4>
                  <p class="text-[11px] text-bd-text-secondary">Returns to Scenario Editor. Prompts to Save or Discard if you have unsaved changes.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1">❓ Help</h4>
                  <p class="text-[11px] text-bd-text-secondary">Opens the official Guidebook article in a new tab.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1">🔍 Inspect</h4>
                  <p class="text-[11px] text-bd-text-secondary">Shows the most recent model context and game state. Only from adventures where owner = scenario owner. Expires after <strong>15 min</strong>.</p>
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-1">▶ Play</h4>
                  <p class="text-[11px] text-bd-text-secondary">Starts a new adventure from this scenario in a new tab. For multiple choice children, goes directly to the child scenario.</p>
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
                  <pre><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"input"</span>);
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: globalThis.text };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Layers class="w-3 h-3 text-bd-blue" />
                  Context File
                </h4>
                <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                  <pre><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"context"</span>);
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: globalThis.text };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ArrowLeftToLine class="w-3 h-3 text-bd-amber" />
                  Output File
                </h4>
                <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
                  <pre><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"output"</span>);
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: globalThis.text };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
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
<span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-cyan">Chronos</span>(<span class="text-bd-green">"input"</span>);
  <span class="text-bd-cyan">InnerSelf</span>(<span class="text-bd-green">"input"</span>);
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: globalThis.text };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
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
                The library-centric hook pattern <strong>still uses the modifier wrapper</strong> in lifecycle files for compatibility,
                but all actual logic lives inside the library function. The modifier delegates to the library and returns
                <code class="text-bd-green">{ text: globalThis.text }</code>. Inside the library, code assigns directly to
                <code class="text-bd-green">globalThis.text</code> rather than returning <code class="text-bd-green">{ text }</code>.
                AI Dungeon's runtime reads <code class="text-bd-green">globalThis.text</code> after each script executes, so both approaches
                achieve the same result. Similarly, <code class="text-bd-green">globalThis.stop = true</code> works the same as returning
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
                  <h4 class="text-xs font-semibold text-bd-text-muted mb-2">Hook pattern (modifier + library)</h4>
                  <div class="font-mono text-xs text-bd-text-secondary">
                    <pre><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) =&gt; {
  <span class="text-bd-cyan">MyScript</span>(<span class="text-bd-green">"context"</span>);
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span>: globalThis.text };
};
<span class="text-bd-cyan">modifier</span>(text);</pre>
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

      <!-- BetterScripts Superseded by Frontier -->
      <section id="guide-frontier" class="card">
        <div class="p-4 rounded-lg bg-gradient-to-r from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Terminal class="w-4 h-4 text-bd-accent-primary" />
            BetterScripts is becoming Frontier
          </h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            In BetterDungeon V2, BetterScripts is replaced by <strong class="text-bd-text-primary">Frontier</strong> &mdash; a standardized,
            bidirectional bridge between AI Dungeon scripts and the browser. No invisible characters, no Context Modifier,
            and a real path forward for web access, clocks, local AI, and more.
          </p>
          <div class="flex items-center gap-3 flex-wrap">
            <router-link to="/guides?tab=frontier" class="btn btn-primary text-sm">
              <Terminal class="w-4 h-4" />
              Read the Frontier Preview
            </router-link>
            <span class="text-xs text-bd-text-muted">Teaser for what's coming in BD V2</span>
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
  Terminal, X, GitMerge, Monitor, Play
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'intro', label: 'Intro' },
  { id: 'modifier-structure', label: 'Modifier Structure' },
  { id: 'script-files', label: 'Script Files' },
  { id: 'api-parameters', label: 'API Parameters' },
  { id: 'api-functions', label: 'API Functions' },
  { id: 'scripting-ui', label: 'Scripting UI' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'common-patterns', label: 'Common Patterns' },
  { id: 'hook-pattern', label: 'Hook Pattern' },
  { id: 'tips-pitfalls', label: 'Tips & Pitfalls' },
  { id: 'frontier', label: 'Frontier Preview' },
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
