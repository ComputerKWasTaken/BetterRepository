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

      <!-- ===================== WHAT ARE PLOT COMPONENTS ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Are Plot Components?
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Plot Components are the primary structural containers in AI Dungeon. Classified under <strong>Required Elements</strong>, they provide the persistent framework (rules, character states, and summaries) that maintains coherence across thousands of story actions.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-blue" />
                  Structural Anchor
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Plot Components shape the AI's generation baseline on every turn, preventing the model from losing the plot as history grows.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-amber" />
                  Required Elements
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Unlike conditionally triggered Story Cards, these components are designed to stay locked in context on every turn.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Info class="w-4 h-4 text-bd-green" />
                  Right Tool Matrix
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  <strong>Instructions</strong> steer writing style. <strong>Plot Essentials</strong> anchor names/lore. <strong>Author's Note</strong> dictates short-term mood.
                </p>
              </div>
            </div>

            <!-- List Table -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 text-xs flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                The Core Plot Component Array
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Component</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Core Focus</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Usability Mode</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">AI Instructions</td>
                      <td class="py-2 pr-4">Global writing style, tone, and character agency limits.</td>
                      <td class="py-2">Optional (Latitude default is applied if empty).</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Plot Essentials</td>
                      <td class="py-2 pr-4">Character profiles, current companion list, core world rules.</td>
                      <td class="py-2">Highly Recommended (Always in context).</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Story Summary</td>
                      <td class="py-2 pr-4">Running chronological history log of story milestones.</td>
                      <td class="py-2">Automated pass (Manual edits supported).</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Author's Note</td>
                      <td class="py-2 pr-4">Immediate editorial injection to guide the upcoming action scene.</td>
                      <td class="py-2">Volatile (Updated frequently).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE CONTEXT WINDOW & TOKEN BUDGETS ===================== -->
      <section id="guide-budgets" class="card">
        <button
          @click="toggleGuideSection('budgets')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            The Context Window &amp; Token Budgets
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('budgets') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('budgets')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Every turn, AI Dungeon compiles your story files into a single, ordered prompt stream called the <strong>Context Window</strong>. The model's attention is not distributed equally across this stream; positioning dictates influence.
            </p>

            <!-- Context Prompt Stream Order -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Database class="w-4 h-4 text-bd-blue" />
                Prompt Stream Assembled Order
              </h4>
              <div class="grid grid-cols-1 gap-1.5 font-mono text-[10px] text-bd-text-secondary">
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-purple/10 border border-bd-purple/20">
                  <span class="w-16 font-bold text-bd-purple">Pos #1</span>
                  <span><strong>AI Instructions:</strong> Foundational steering (Highest structural attention).</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-purple/10 border border-bd-purple/20">
                  <span class="w-16 font-bold text-bd-purple">Pos #2</span>
                  <span><strong>Plot Essentials:</strong> Core character descriptions and permanent world facts.</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-cyan/10 border border-bd-cyan/20">
                  <span class="w-16 font-bold text-bd-cyan">Pos #3</span>
                  <span><strong>Story Cards:</strong> Triggered world lore entries (conditionally loaded).</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-cyan/10 border border-bd-cyan/20">
                  <span class="w-16 font-bold text-bd-cyan">Pos #4</span>
                  <span><strong>Story Summary:</strong> Compressed narrative history entries.</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-cyan/10 border border-bd-cyan/20">
                  <span class="w-16 font-bold text-bd-cyan">Pos #5</span>
                  <span><strong>Memory Bank:</strong> Vector-retrieved organic memories.</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-blue/10 border border-bd-blue/20">
                  <span class="w-16 font-bold text-bd-blue">Pos #6</span>
                  <span><strong>History:</strong> Recent conversational logs (sliding window actions).</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-pink/10 border border-bd-pink/20">
                  <span class="w-16 font-bold text-bd-pink">Pos #7</span>
                  <span><strong>Author's Note:</strong> Short-term editorial notes (injected in brackets).</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-pink/10 border border-bd-pink/20">
                  <span class="w-16 font-bold text-bd-pink">Pos #8</span>
                  <span><strong>Last Action:</strong> The player's immediate turn input.</span>
                </div>
                <div class="flex items-center gap-2 p-1.5 rounded bg-bd-pink/10 border border-bd-pink/20">
                  <span class="w-16 font-bold text-bd-pink">Pos #9</span>
                  <span><strong>Front Memory:</strong> Custom programmatic scripting injector (Maximum influence).</span>
                </div>
              </div>
            </div>

            <!-- Positional Attention Bias Grids -->
            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                <h4 class="text-xs font-semibold text-bd-purple mb-2">Beginning (Pos 1–2)</h4>
                <p class="text-[11px] text-bd-text-secondary">
                  <strong>High Structural Attention.</strong> Sets the AI's core cognitive filter. Excellent for style definitions and rules because the model evaluates all subsequent turns through this lens.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-muted mb-2">Middle (Pos 3–6)</h4>
                <p class="text-[11px] text-bd-text-secondary">
                  <strong>Flexible Recall Basin.</strong> Attention is statistically lowest here (known as "lost in the middle"). Ideal for conditional lore cards, raw history logs, and background memory files.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2">End (Pos 7–9)</h4>
                <p class="text-[11px] text-bd-text-secondary">
                  <strong>Maximum Recency Attention.</strong> Direct steering boundary. Text located here directly shapes the upcoming generation. Perfect for immediate mood shifting (Author's Note).
                </p>
              </div>
            </div>

            <!-- The 70/30 Context Allocation Split -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-amber" />
                The 70/30 Context Allocation Split
              </h4>
              <p class="text-xs text-bd-text-secondary mb-3">
                To guarantee that core rules and biographies never vanish, the engine divides your total token space (e.g. 8k or 32k limits) into two priority pools:
              </p>
              <div class="grid md:grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                  <h5 class="text-xs font-semibold text-bd-purple mb-1">Required Elements Pool (Up to 70%)</h5>
                  <ul class="text-bd-text-secondary space-y-1 list-disc list-inside">
                    <li>• AI Instructions</li>
                    <li>• Plot Essentials</li>
                    <li>• Story Summary</li>
                    <li>• Author's Note</li>
                    <li>• Player's Last Action</li>
                  </ul>
                  <p class="text-[10px] text-bd-text-muted mt-2">These are protected. They stay in context unless they exceed 70% of the entire token budget.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                  <h5 class="text-xs font-semibold text-bd-cyan mb-1">Dynamic Elements Pool (~30%)</h5>
                  <ul class="text-bd-text-secondary space-y-1 list-disc list-inside">
                    <li>• Triggered Story Cards</li>
                    <li>• turn History Logs</li>
                    <li>• retrieved Vector Memories</li>
                  </ul>
                  <p class="text-[10px] text-bd-text-muted mt-2">These take up the remaining space, competing dynamically based on relevance, frequency, and turn recency.</p>
                </div>
              </div>
            </div>

            <!-- Trimming Priority Hierarchy -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-amber" />
                Prompt Trimming Priority Hierarchy
              </h4>
              <p class="text-xs text-bd-text-secondary">
                When your total story length exceeds the token context window cap, the engine prunes elements systematically in the following order:
              </p>
              <div class="space-y-2 text-xs">
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-24 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-pink/20 text-bd-pink text-center">NEVER TRIMMED</span>
                  <span class="text-bd-text-secondary">Front Memory, Last Action.</span>
                </div>
                <div class="flex-1 h-px bg-bd-border-subtle/50"></div>
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-24 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-purple/20 text-bd-purple text-center">PROTECTED</span>
                  <span class="text-bd-text-secondary">Author's Note, Plot Essentials.</span>
                </div>
                <div class="flex-1 h-px bg-bd-border-subtle/50"></div>
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-24 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber text-center">MEDIUM PRIORITY</span>
                  <span class="text-bd-text-secondary">AI Instructions, Story Summary.</span>
                </div>
                <div class="flex-1 h-px bg-bd-border-subtle/50"></div>
                <div class="flex items-center gap-3">
                  <span class="flex-shrink-0 w-24 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-text-muted/20 text-bd-text-muted text-center font-mono">FLEXIBLE</span>
                  <span class="text-bd-text-secondary">Story Cards, turn History, Memory Bank (trimmed first to fit required elements).</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE FOUR REQUIRED ELEMENTS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-cyan" />
            The Four Required Elements
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">

            <!-- Plot Essentials -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">1. Plot Essentials (PE)</h3>
              <p class="text-bd-text-secondary text-xs">
                Plot Essentials house information that is <strong>permanently relevant</strong> to your adventure. It stays locked in context on every single turn.
              </p>
              
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-green block mb-1">Character Bios</strong>
                  Define your character's class, vital stats, appearance, and core personality traits.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-green block mb-1">Traveling Companions</strong>
                  Always list active sidekicks here (` Marcus is traveling companion `) to prevent them from vanishing.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                  <strong class="text-bd-green block mb-1">World Framework</strong>
                  List the foundational global rules of your world (e.g. ` Realm: high fantasy, low tech `).
                </div>
              </div>

              <!-- Structured vs Narrative PE Examples -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-green" />
                  PE Format Comparison
                </h4>
                <div class="grid md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <h5 class="font-semibold text-bd-text-primary mb-1">Structured Format (Highly Readable)</h5>
                    <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-green whitespace-pre-wrap leading-relaxed">Protagonist: Elara, elven ranger
Stats: HP 100, MP 50
Companions: Sir Marcus (weary knight)
Current Quest: Retrieve the Sunstone</div>
                  </div>
                  <div>
                    <h5 class="font-semibold text-bd-text-primary mb-1">Narrative Format (Natural Prompt Flow)</h5>
                    <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-green whitespace-pre-wrap leading-relaxed">Elara is an elven ranger searching for the mythical Sunstone. She travels with Sir Marcus, a stoic and weary knight commander who protects her path.</div>
                  </div>
                </div>
                <p class="text-[11px] text-bd-text-muted">
                  <strong>Recommendation:</strong> Use structured format for active game metrics (stats, items) as it's easier to edit; use narrative format for complex character backgrounds.
                </p>
              </div>
            </div>

            <!-- Author's Note -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">2. Author's Note (AN)</h3>
              <p class="text-bd-text-secondary text-xs">
                Author's Note is a volatile field designed for <strong>scene-specific guidelines</strong>. Because it resides right before player input, it has immense immediate steering power.
              </p>
              
              <div class="grid md:grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/20">
                  <strong class="text-bd-pink block mb-1">Local Environment Shift</strong>
                  Story moves from city streets to damp dungeons? Update AN immediately: `[ Setting: damp dungeon, echoey cavern ]`.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/20">
                  <strong class="text-bd-pink block mb-1">Immediate Scene Pacing</strong>
                  Want the upcoming fight scene to feel brutal and rapid? Insert: `[ Pacing: rapid. Style: visceral combat description ]`.
                </div>
              </div>

              <!-- Bracket Training Metadata -->
              <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-pink/30 text-xs">
                <div class="flex items-start gap-2">
                  <Info class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
                  <p class="text-bd-text-secondary">
                    <strong>Under-the-Hood Syntax:</strong> Behind the scenes, the client automatically wraps your Author's Note text in <code class="text-bd-pink">[ square brackets ]</code> before compiling the prompt. Because LLMs were pre-trained on internet documents where bracketed lines represent editorial comments, brackets tell the model this text represents <strong>editorial metadata directives</strong> rather than story prose.
                  </p>
                </div>
              </div>
            </div>

            <!-- Story Summary -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">3. Story Summary &amp; Vector Memories</h3>
              <p class="text-bd-text-secondary text-xs">
                The memory pipeline handles long-term narrative consistency through automated batch tracking and semantic recall.
              </p>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30 text-xs space-y-2">
                  <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5">
                    <ScrollText class="w-4 h-4 text-bd-cyan" />
                    Story Summary (SS)
                  </h4>
                  <p class="text-bd-text-secondary">
                    A running chronological log of completed plot points. The client monitors your inputs, and every <strong>4 actions</strong>, compiles them into a new memory entry.
                  </p>
                  <p class="text-bd-text-muted">
                    <strong>Auto Summarization passing:</strong> When the summary becomes too long, AI Dungeon executes a background pass to compress older entries, keeping tokens stable.
                  </p>
                </div>

                <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30 text-xs space-y-2">
                  <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                    <Brain class="w-4 h-4 text-bd-green" />
                    Vector Memory Bank
                  </h4>
                  <p class="text-bd-text-secondary">
                    Stores semantic facts generated in play. When matching words appear in recent history, the engine retrieves matching memory blocks and injects them conditionally.
                  </p>
                  <p class="text-bd-text-muted">
                    <strong>The 4-Action Buffer:</strong> The most recent 4 turns are never summarized. This buffer lets you edit or undo recent turns without corrupting summary files.
                  </p>
                </div>
              </div>
            </div>

            <!-- Front Memory -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">4. Front Memory</h3>
              <p class="text-bd-text-secondary text-xs">
                Front Memory is an advanced, <strong>script-only</strong> component. Injected at the absolute end of the prompt stream (Position #9), it has maximum immediate steering influence over the model's next word choice.
              </p>
              <div class="p-4 rounded-lg bg-bd-red/10 border border-bd-red/30 text-xs">
                This field is completely hidden from the standard gameplay UI. It can only be written to programmatically by JavaScript modifiers via the `state.memory.frontMemory` property. Excellent for real-time combat status displays.
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== STRUCTURAL TROUBLESHOOTING ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Structural Troubleshooting &amp; Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6 text-xs">
            
            <div class="grid md:grid-cols-2 gap-4">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Author's Note Prose Bloat
                </h4>
                <p class="text-bd-text-secondary">
                  Writing Author's Notes like a novel: `[ The rain starts to fall softly as Marcus looks out over the silent marshland. ]` 
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Keep AN strictly behavioral and direct: `[ Mood: somber. Focus: soft rain description. ]` Keep it under 2-3 sentences max.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Stale Plot Essentials
                </h4>
                <p class="text-bd-text-secondary">
                  Leaving outdated metrics or relationship facts in PE (e.g. still listing Marcus as a healthy companion after he dies).
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Perform an audit of your PE after every major plot milestone. Strip out resolved quest lines.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Fact Duplication Bleed
                </h4>
                <p class="text-bd-text-secondary">
                  Repeating the exact same character bio in Plot Essentials, Author's Note, and a triggered Story Card. This heavily dilutes attention.
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Consolidate facts. Keep global profiles exclusively in PE; keep conditional lore exclusively in Story Cards.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Flashback Timelines
                </h4>
                <p class="text-bd-text-secondary">
                  Writing past memories inside active Author's Notes. The AI model has no concept of timeline progression; it will try to make the past happen immediately on the next turn.
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Write flashback cues in Story Cards or PE labeled as historical lore, keeping AN strictly present.
                </p>
              </div>
            </div>

            <!-- Horizontal break markers -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <ArrowRightLeft class="w-4 h-4 text-bd-blue" />
                Scene Transitions &amp; Break Markers
              </h4>
              <p class="text-bd-text-secondary">
                To clean context during heavy shifts, use three dashes <code class="text-bd-green">---</code> on a line by itself. This tells modern models that the previous spatial timeline is closed.
              </p>
              <div class="p-3 rounded bg-bd-bg-primary font-mono text-[11px] text-bd-text-muted">
                Elara collapsed in exhaustion inside the cave.
                <div class="text-bd-amber my-1 font-bold">---</div>
                The next morning, sunlight filtered through the cracks...
              </div>
              <p class="text-[11px] text-bd-text-muted mt-2">
                <strong>BetterDungeon Integration:</strong> Our extension automatically detects markdown dividers (`---`) and displays them as a stylized horizontal line in the chat feed.
              </p>
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
            <Users class="w-5 h-5 text-bd-blue" />
            Credits
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who researched, analyzed, and optimized prompt assembly and Required Elements:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in plotComponentsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-blue/10 text-bd-blue border border-bd-blue/20">
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
import { PLOT_COMPONENTS_CONTRIBUTORS as plotComponentsContributors } from '@/data/contributors'
import { 
  Info, ScrollText, Layers, HelpCircle, User, Globe, Plus,
  RefreshCw, MessageSquare, Rocket, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, XCircle, Ruler, Cpu, ChevronDown, ChevronUp, BookOpen, Swords, Heart, Target, Skull, Eye, Wrench, Users
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Prompt Architecture', isHeader: true },
  { id: 'what-is', label: 'What Are Plot Components?' },
  { id: 'budgets', label: 'Context Windows & Budgets' },
  { id: 'header-elements', label: 'Required Elements', isHeader: true },
  { id: 'anatomy', label: 'The Four Elements' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'advanced-topics', label: 'Structural Pitfalls' },
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
