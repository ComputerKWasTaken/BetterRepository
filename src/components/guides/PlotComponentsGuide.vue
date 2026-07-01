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

      <!-- ===================== GUIDE OVERVIEW BANNER ===================== -->
      <div class="card p-4 mb-4 space-y-3">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-bd-blue/10 border border-bd-blue/20 flex items-center justify-center">
            <Bookmark class="w-5 h-5 text-bd-blue" />
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-sm text-bd-text-secondary leading-relaxed">
              Plot Components are the persistent text panels that anchor your story's rules, characters, and history in the AI's context window. They are the <strong>structural backbone</strong> of every turn the AI generates.
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Positions #1–9
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Required Elements
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                70% context budget
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Always in context
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[11px] text-bd-text-muted">
              <span>Related:</span>
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline font-medium">
                AI Instructions
              </router-link>
              <span>&middot;</span>
              <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline font-medium">
                Story Cards
              </router-link>
              <span>&middot;</span>
              <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline font-medium">
                Scripts
              </router-link>
            </div>
          </div>
        </div>
      </div>

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

            <!-- Context Stack Diagram (§14.1) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5 font-mono text-[11px]">
              <div class="text-[10px] font-bold uppercase tracking-widest text-bd-text-muted mb-2">Context Assembly Order</div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">AI Instructions</span>
                <span class="text-bd-text-muted text-[10px]">#1</span>
              </div>
              <div class="p-2.5 rounded border-2 border-bd-blue/60 bg-bd-blue/10 flex items-center justify-between">
                <span class="text-bd-blue font-bold">Plot Essentials</span>
                <span class="text-bd-text-muted text-[10px]">#2</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Story Cards (triggered)</span>
                <span class="text-bd-text-muted text-[10px]">#3</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Story Summary</span>
                <span class="text-bd-text-muted text-[10px]">#4</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Memory Bank (vector)</span>
                <span class="text-bd-text-muted text-[10px]">#5</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Action History</span>
                <span class="text-bd-text-muted text-[10px]">#6</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Author's Note</span>
                <span class="text-bd-text-muted text-[10px]">#7</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Last Action</span>
                <span class="text-bd-text-muted text-[10px]">#8</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Front Memory (script-only)</span>
                <span class="text-bd-text-muted text-[10px]">#9</span>
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

            <!-- Trimming Priority Stack (§14.7) -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-amber" />
                Prompt Trimming Priority Hierarchy
              </h4>
              <p class="text-xs text-bd-text-secondary">
                When your total story length exceeds the token context window cap, the engine prunes elements systematically in this order:
              </p>
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5 font-mono text-[11px]">
                <div class="text-[10px] font-bold uppercase tracking-widest text-bd-text-muted mb-2">Trim Order (first dropped &rarr; last kept)</div>
                <div class="p-2 rounded border border-bd-pink/30 bg-bd-pink/5 flex items-center justify-between">
                  <span class="text-bd-pink font-semibold">Story Cards, History, Memory Bank</span>
                  <span class="text-bd-text-muted text-[10px]">dropped first</span>
                </div>
                <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; trimmed next</div>
                <div class="p-2 rounded border border-bd-amber/30 bg-bd-amber/5 flex items-center justify-between">
                  <span class="text-bd-amber font-semibold">AI Instructions, Story Summary</span>
                  <span class="text-bd-text-muted text-[10px]">medium priority</span>
                </div>
                <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; trimmed next</div>
                <div class="p-2.5 rounded border-2 border-bd-blue/60 bg-bd-blue/10 flex items-center justify-between">
                  <span class="text-bd-blue font-bold">Plot Essentials, Author's Note</span>
                  <span class="text-bd-text-muted text-[10px]">high priority</span>
                </div>
                <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; never trimmed</div>
                <div class="p-2 rounded border border-bd-green/30 bg-bd-green/5 flex items-center justify-between">
                  <span class="text-bd-green font-semibold">Front Memory + Last Action</span>
                  <span class="text-bd-text-muted text-[10px]">always kept full</span>
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

      <!-- ===================== COMPARISON & BOUNDARIES ===================== -->
      <section id="guide-comparison" class="card">
        <button
          @click="toggleGuideSection('comparison')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-bd-purple" />
            Comparison &amp; Boundaries
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('comparison') }" />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('comparison')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary text-xs">
              Plot Components overlap in purpose but differ in scope, permanence, and context position. Knowing which tool to use for which need prevents token waste and contradictory signals.
            </p>

            <!-- Decision Tree SVG (§14.4) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs mb-3">
                <GitBranch class="w-4 h-4 text-bd-purple" />
                Which Component Should I Use?
              </h4>
              <svg viewBox="0 0 600 340" class="w-full h-auto" role="img" aria-label="Decision tree: which Plot Component to use for different needs">
                <!-- Root question node -->
                <rect x="200" y="10" width="200" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="2" />
                <text x="300" y="33" text-anchor="middle" class="fill-bd-text-primary"
                      style="font: 600 12px monospace">What do you need?</text>

                <!-- Level 1 branch lines -->
                <line x1="300" y1="46" x2="300" y2="70" stroke="var(--bd-border-default)" />
                <line x1="300" y1="70" x2="100" y2="70" stroke="var(--bd-border-default)" />
                <line x1="300" y1="70" x2="500" y2="70" stroke="var(--bd-border-default)" />
                <line x1="100" y1="70" x2="100" y2="90" stroke="var(--bd-border-default)" />
                <line x1="500" y1="70" x2="500" y2="90" stroke="var(--bd-border-default)" />

                <!-- Level 1 condition labels -->
                <text x="180" y="66" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Always true"</text>
                <text x="420" y="66" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Right now"</text>

                <!-- Level 1 leaf nodes -->
                <rect x="20" y="90" width="160" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
                <text x="100" y="113" text-anchor="middle" class="fill-bd-blue"
                      style="font: 600 11px monospace">Plot Essentials</text>

                <rect x="420" y="90" width="160" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-pink)" stroke-width="1.5" />
                <text x="500" y="113" text-anchor="middle" class="fill-bd-pink"
                      style="font: 600 11px monospace">Author's Note</text>

                <!-- Level 2: "Always true" branch splits further -->
                <line x1="100" y1="126" x2="100" y2="150" stroke="var(--bd-border-default)" />
                <line x1="100" y1="150" x2="40" y2="150" stroke="var(--bd-border-default)" />
                <line x1="100" y1="150" x2="160" y2="150" stroke="var(--bd-border-default)" />
                <line x1="40" y1="150" x2="40" y2="170" stroke="var(--bd-border-default)" />
                <line x1="160" y1="150" x2="160" y2="170" stroke="var(--bd-border-default)" />

                <text x="60" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Write this way"</text>
                <text x="140" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Remember this"</text>

                <rect x="0" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-amber)" stroke-width="1.5" />
                <text x="40" y="191" text-anchor="middle" class="fill-bd-amber"
                      style="font: 600 10px monospace">AI Instructions</text>

                <rect x="120" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
                <text x="160" y="191" text-anchor="middle" class="fill-bd-blue"
                      style="font: 600 10px monospace">Plot Essentials</text>

                <!-- Level 2: "Right now" branch splits further -->
                <line x1="500" y1="126" x2="500" y2="150" stroke="var(--bd-border-default)" />
                <line x1="500" y1="150" x2="440" y2="150" stroke="var(--bd-border-default)" />
                <line x1="500" y1="150" x2="560" y2="150" stroke="var(--bd-border-default)" />
                <line x1="440" y1="150" x2="440" y2="170" stroke="var(--bd-border-default)" />
                <line x1="560" y1="150" x2="560" y2="170" stroke="var(--bd-border-default)" />

                <text x="460" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Style nudge"</text>
                <text x="540" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Hidden inject"</text>

                <rect x="400" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-pink)" stroke-width="1.5" />
                <text x="440" y="191" text-anchor="middle" class="fill-bd-pink"
                      style="font: 600 10px monospace">Author's Note</text>

                <rect x="520" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-red)" stroke-width="1.5" />
                <text x="560" y="191" text-anchor="middle" class="fill-bd-red"
                      style="font: 600 10px monospace">Front Memory</text>

                <!-- Level 3: "Remember this" splits into PE vs Story Cards -->
                <line x1="160" y1="202" x2="160" y2="220" stroke="var(--bd-border-default)" />
                <line x1="160" y1="220" x2="120" y2="220" stroke="var(--bd-border-default)" />
                <line x1="160" y1="220" x2="200" y2="220" stroke="var(--bd-border-default)" />
                <line x1="120" y1="220" x2="120" y2="238" stroke="var(--bd-border-default)" />
                <line x1="200" y1="220" x2="200" y2="238" stroke="var(--bd-border-default)" />

                <text x="132" y="216" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 9px monospace">"Always"</text>
                <text x="188" y="216" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 9px monospace">"Sometimes"</text>

                <rect x="80" y="238" width="80" height="28" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
                <text x="120" y="257" text-anchor="middle" class="fill-bd-blue"
                      style="font: 600 10px monospace">Plot Essentials</text>

                <rect x="160" y="238" width="80" height="28" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-purple)" stroke-width="1.5" />
                <text x="200" y="257" text-anchor="middle" class="fill-bd-purple"
                      style="font: 600 10px monospace">Story Cards</text>
              </svg>
              <p class="text-[10px] text-bd-text-muted mt-2">
                Plot Essentials store facts that are always true. Author's Note handles immediate scene directives. AI Instructions control permanent writing style. Story Cards surface conditional lore only when triggered. Front Memory is script-only for hidden real-time injection.
              </p>
            </div>

            <!-- Comparison Matrix (§14.5) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                Component Boundary Matrix
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Component</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Scope</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Permanence</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Position</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-amber">AI Instructions</td>
                      <td class="py-2 pr-4">Writing style, tone, agency</td>
                      <td class="py-2 pr-4">Permanent (rarely changed)</td>
                      <td class="py-2">#1 (highest structural)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-blue">Plot Essentials</td>
                      <td class="py-2 pr-4">Characters, world rules, companions</td>
                      <td class="py-2 pr-4">Semi-permanent (update at milestones)</td>
                      <td class="py-2">#2 (high structural)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-cyan">Story Summary</td>
                      <td class="py-2 pr-4">Plot milestones, chronological history</td>
                      <td class="py-2 pr-4">Auto-managed (manual edits supported)</td>
                      <td class="py-2">#4 (middle recall)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-pink">Author's Note</td>
                      <td class="py-2 pr-4">Scene mood, pacing, immediate directives</td>
                      <td class="py-2 pr-4">Volatile (changed every few turns)</td>
                      <td class="py-2">#7 (maximum recency)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-red">Front Memory</td>
                      <td class="py-2 pr-4">Hidden script-injected status text</td>
                      <td class="py-2 pr-4">Script-controlled (persists until cleared)</td>
                      <td class="py-2">#9 (absolute end)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SCENE TRANSITIONS ===================== -->
      <section id="guide-scene-transitions" class="card">
        <button
          @click="toggleGuideSection('scene-transitions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-bd-blue" />
            Scene Transitions
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('scene-transitions') }" />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('scene-transitions')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              To clean context during heavy shifts, use three dashes <code class="text-bd-green">---</code> on a line by itself. This tells modern models that the previous spatial timeline is closed.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <ArrowRightLeft class="w-4 h-4 text-bd-blue" />
                Break Marker Example
              </h4>
              <div class="p-3 rounded bg-bd-bg-primary font-mono text-[11px] text-bd-text-muted">
                Elara collapsed in exhaustion inside the cave.
                <div class="text-bd-amber my-1 font-bold">---</div>
                The next morning, sunlight filtered through the cracks...
              </div>
              <p class="text-[11px] text-bd-text-muted mt-2">
                <strong>BetterDungeon Integration:</strong> Our extension automatically detects markdown dividers (<code class="text-bd-green">---</code>) and displays them as a stylized horizontal line in the chat feed.
              </p>
            </div>
            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-bd-text-secondary">
                  Pair scene breaks with an Author's Note update. After a <code class="text-bd-green">---</code> divider, immediately set your AN to reflect the new scene's mood and pacing. This prevents the AI from bleeding the old scene's tone into the new one.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WRITING TECHNIQUES ===================== -->
      <section id="guide-additional-tips" class="card">
        <button
          @click="toggleGuideSection('additional-tips')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-bd-green" />
            Writing Techniques
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('additional-tips') }" />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('additional-tips')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Plot Components are only as good as what you write in them. These techniques maximize the AI's ability to parse and follow your directives.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 text-bd-cyan" />
                  Regular Maintenance
                </h4>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&bull; <strong>Remove</strong> anything you don't want referenced again</li>
                  <li>&bull; <strong>Update</strong> with new information as it develops</li>
                  <li>&bull; <strong>Remove</strong> info that was never mentioned &mdash; if it was needed, you'd have noticed it missing</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-amber" />
                  Make the AI Remember
                </h4>
                <div class="space-y-1.5">
                  <div class="flex items-start gap-2">
                    <span class="text-bd-text-muted">Dialogue:</span>
                    <code class="text-bd-green">"Hey, remember when [information]?"</code>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-bd-text-muted">Action:</span>
                    <code class="text-bd-green">&gt; You remember/think about [information]</code>
                  </div>
                  <div class="flex items-start gap-2">
                    <span class="text-bd-text-muted">Narrator:</span>
                    <code class="text-bd-green">"[...] of course she knows about [information]"</code>
                  </div>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <XCircle class="w-4 h-4 text-bd-pink" />
                  Avoid Confusing the AI
                </h4>
                <p class="text-bd-text-secondary">
                  Avoid flashbacks, dreams, and thought experiments. Once a memory is created, the AI often <strong>can't distinguish what actually happened</strong> from what was imagined.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-amber" />
                  Edit AI Outputs
                </h4>
                <p class="text-bd-text-secondary">
                  Edit the last AI output to fix mixed-up characters, add forgotten details, or set a different story direction. The AI will catch on and follow the new path.
                </p>
              </div>
            </div>

            <!-- Annotated Code Breakdown (§14.6) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Ruler class="w-4 h-4 text-bd-green" />
                Anatomy of a Good Plot Essentials Entry
              </h4>
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <h5 class="font-semibold text-bd-text-primary mb-1">Good Example</h5>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-green whitespace-pre-wrap leading-relaxed text-[11px]">Protagonist: Elara, elven ranger
Stats: HP 100, MP 50
Companions: Sir Marcus (weary knight)
Current Quest: Retrieve the Sunstone</div>
                </div>
                <div>
                  <h5 class="font-semibold text-bd-text-primary mb-1">Bad Example</h5>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-pink whitespace-pre-wrap leading-relaxed text-[11px]">Elara is a brave and beautiful elf
who has been on many adventures.
She is NOT evil. She doesn't like
orcs. Marcus is also there sometimes.</div>
                </div>
              </div>
              <div class="space-y-1.5 text-[11px]">
                <div class="flex items-start gap-2">
                  <span class="text-bd-green font-bold">&checkmark;</span>
                  <span class="text-bd-text-secondary"><strong>Structured:</strong> Each fact on its own line with a clear label. The AI parses this reliably.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-green font-bold">&checkmark;</span>
                  <span class="text-bd-text-secondary"><strong>Current:</strong> Stats and quest reflect the present moment, not backstory.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-pink font-bold">&cross;</span>
                  <span class="text-bd-text-secondary"><strong>Negation:</strong> "NOT evil" often gets ignored &mdash; the AI sees "evil" and runs with it.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-pink font-bold">&cross;</span>
                  <span class="text-bd-text-secondary"><strong>Vague:</strong> "Many adventures" and "sometimes there" give the AI nothing concrete to work with.</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING & DIAGNOSTICS ===================== -->
      <section id="guide-troubleshooting" class="card">
        <button
          @click="toggleGuideSection('troubleshooting')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-purple" />
            Troubleshooting &amp; Diagnostics
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('troubleshooting') }" />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('troubleshooting')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              When the AI seems to be ignoring your Plot Components, the issue is almost always one of three things: stale content, token overflow, or conflicting directives. Use this diagnostic flow to isolate the root cause.
            </p>

            <!-- Flow Pipeline (§14.2) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Diagnostic Workflow
              </h4>
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <div class="px-2.5 py-1.5 rounded bg-bd-pink/20 border border-bd-pink/30 text-bd-pink font-bold">
                  AI Misbehaving
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-teal/20 border border-bd-teal/30 text-bd-teal font-bold">
                  View Context
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">
                  Check Trim
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">
                  Update Component
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">
                  Validate 3-5 Turns
                </div>
              </div>
              <p class="text-[10px] text-bd-text-muted">If the issue persists, loop back to <strong>View Context</strong> and check for conflicting directives across components.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-teal/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <Eye class="w-4 h-4 text-bd-teal" />
                  View Context Analysis
                </h4>
                <p class="text-bd-text-secondary mb-2">
                  <strong>Click any AI turn output &rarr; View Context</strong> to see the exact text sent to the LLM.
                </p>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li>Confirm your Plot Essentials are fully present.</li>
                  <li>Verify if Author's Note was truncated due to token overflow.</li>
                  <li>Audit the active token balance of each component.</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-amber/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Common Diagnostic Findings
                </h4>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li><strong>PE too long:</strong> Truncated, losing critical companion or quest info.</li>
                  <li><strong>AN overwritten:</strong> Script or auto-summary replaced your manual note.</li>
                  <li><strong>Duplicate facts:</strong> Same info in PE + Story Card causes confused emphasis.</li>
                  <li><strong>Stale SS:</strong> Story Summary hasn't been regenerated after major plot shifts.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMMON PITFALLS ===================== -->
      <section id="guide-common-pitfalls" class="card">
        <button
          @click="toggleGuideSection('common-pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('common-pitfalls') }" />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-pitfalls')" class="mt-4 space-y-4 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Author's Note Prose Bloat
                </h4>
                <p class="text-bd-text-secondary">
                  Writing Author's Notes like a novel: <code class="text-bd-pink">[ The rain starts to fall softly as Marcus looks out over the silent marshland. ]</code>
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Keep AN strictly behavioral and direct: <code class="text-bd-green">[ Mood: somber. Focus: soft rain description. ]</code> Keep it under 2-3 sentences max.
                </p>
              </div>

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

              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Overloading Plot Essentials
                </h4>
                <p class="text-bd-text-secondary">
                  Stuffing PE with every detail about your world. The AI gets overwhelmed and you waste tokens.
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Only include currently relevant info. Move situational details to Story Cards.
                </p>
              </div>

              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 space-y-1">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <XCircle class="w-4 h-4 text-bd-pink" /> Using Negatives in PE
                </h4>
                <p class="text-bd-text-secondary">
                  "Bob is NOT evil" &mdash; but the AI often ignores "not" and treats Bob as evil. Negation is unreliable in all plot components.
                </p>
                <p class="text-bd-green">
                  <strong>Fix:</strong> Use positive framing: "Bob is kind and trustworthy" or "Bob avoids violence."
                </p>
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
  Sparkles, XCircle, Ruler, Cpu, ChevronDown, ChevronUp, BookOpen, Swords, Heart, Target, Skull, Eye, Wrench, Users,
  GitBranch, GitMerge, Bookmark
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-understanding', label: 'Understanding', isHeader: true },
  { id: 'what-is', label: 'What Are Plot Components?' },
  { id: 'budgets', label: 'How It Works: Context & Budgets' },
  { id: 'anatomy', label: 'The Four Required Elements' },
  { id: 'header-practice', label: 'Practical Use', isHeader: true },
  { id: 'comparison', label: 'Comparison & Boundaries' },
  { id: 'scene-transitions', label: 'Scene Transitions' },
  { id: 'additional-tips', label: 'Writing Techniques' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'troubleshooting', label: 'Troubleshooting & Diagnostics' },
  { id: 'common-pitfalls', label: 'Common Pitfalls' },
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
