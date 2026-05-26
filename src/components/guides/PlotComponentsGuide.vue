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

      <!-- ===================== 1. WHAT IS PLOT COMPONENTS ===================== -->
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
              Plot components are tools that help the AI remember crucial information and follow your story's rules. 
              <strong>Managing them is the most important thing you can do</strong> for story coherence.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-blue" />
                  What They Do
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Provide persistent, authoritative context that shapes the narrative every single turn.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-amber" />
                  Context Priority
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Categorized as **Required Elements**, meaning they take precedence over history and story cards.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Info class="w-4 h-4 text-bd-green" />
                  Coherence Boost
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Prevents "scene drift" and keeps characters, lore, and current scene details perfectly aligned.
                </p>
              </div>
            </div>

            <!-- Five Plot Components Overview -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                The Five Plot Components
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Component</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Purpose</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Position in Context</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">AI Instructions</td>
                      <td class="py-2 pr-4">Behavioral rules for the AI</td>
                      <td class="py-2">Very beginning (Position #1)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Plot Essentials</td>
                      <td class="py-2 pr-4">Key story facts (always present)</td>
                      <td class="py-2">After AI Instructions</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Story Summary</td>
                      <td class="py-2 pr-4">Running plot overview</td>
                      <td class="py-2">After Story Cards</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Author's Note</td>
                      <td class="py-2 pr-4">Short-term tone/style guidance</td>
                      <td class="py-2">Near end (before last action)</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-4 font-medium">Third Person</td>
                      <td class="py-2 pr-4">Character name handling</td>
                      <td class="py-2">N/A (affects formatting)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Right tool for the job -->
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>• <strong>"Always write this way"</strong> → AI Instructions</div>
                <div>• <strong>"Right now, do this"</strong> → Author's Note</div>
                <div>• <strong>"Always remember this fact"</strong> → Plot Essentials</div>
                <div>• <strong>"Remember this when relevant"</strong> → Story Cards</div>
              </div>
            </div>

            <!-- Required Elements Note -->
            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Plot Components are <strong>Required Elements</strong>, prioritized for inclusion in context (up to 70% of available space). They are always present unless trimmed for space. Without them, the AI relies on recent history alone, which works for casual play but may lose coherence in longer adventures.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 2. QUICK START SECTION ===================== -->
      <section id="guide-quick-start" class="card">
        <button 
          @click="toggleGuideSection('quick-start')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Quick Start: Setting Up Your Plot
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Follow these three practical steps to configure your story's foundational plot controls.
            </p>

            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Establish Your Baseline</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Navigate to **Sidebar → Plot → Plot Essentials**. Write a concise paragraph detailing your character's core identity and your world's basic setup.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Set the Active Scene</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Open **Author's Note**. Insert a short 2-sentence description of the current location and mood (e.g. `[ Tavern scene. Relaxed atmosphere. ]`) to steer the immediate generation.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Enable Automated Tracking</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Turn on **Auto Summarization** in Settings to allow the engine to periodically compress your story events into the **Story Summary** automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 3. ANATOMY & HOW IT WORKS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-cyan" />
            Anatomy &amp; How It Works
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">

            <!-- Plot Essentials -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Plot Essentials (PE)</h3>
              <p class="text-bd-text-secondary text-xs">
                Use Plot Essentials for information that is <strong>always relevant</strong> throughout your story. It stays in context on every turn.
              </p>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <User class="w-4 h-4 text-bd-green" />
                    Character Description
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Your character description belongs here. Update it whenever significant changes occur to your character.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Globe class="w-4 h-4 text-bd-green" />
                    World Lore
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Add a concise paragraph for world lore. Keep it updated as the environment changes or evolves.
                  </p>
                </div>
              </div>

              <!-- Formatting Examples -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-green" />
                  PE Format Examples
                </h4>
                <div class="grid md:grid-cols-2 gap-3">
                  <div>
                    <h5 class="text-xs font-semibold text-bd-text-primary mb-2">Structured Format</h5>
                    <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                      <div>SETTING: Medieval fantasy kingdom</div>
                      <div>PROTAGONIST: Elara, elven ranger</div>
                      <div>COMPANION: Marcus, human mage</div>
                      <div>CURRENT: Traveling through marshes</div>
                    </div>
                  </div>
                  <div>
                    <h5 class="text-xs font-semibold text-bd-text-primary mb-2">Narrative Format</h5>
                    <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                      Elara is an elven ranger on a quest for the Sunstone. She travels with Marcus, a human mage. Lord Varen hunts them. Currently crossing the Misty Marshes.
                    </div>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-2">Both formats work. Structured is easier to edit; narrative flows more naturally into model contexts.</p>
              </div>
            </div>

            <!-- Author's Note -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Author's Note (AN)</h3>
              <p class="text-bd-text-secondary text-xs">
                Author's Note sets up the <strong>current scene</strong>. Use it when the scene temporarily differs from your main theme or to guide tone.
              </p>

              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Rocket class="w-4 h-4 text-bd-pink" />
                    Setting Change
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Story was in a city, now you're in a damp cave? Write a quick setting note in AN to anchor the AI instantly.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Focus class="w-4 h-4 text-bd-pink" />
                    Theme Shift
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Want to focus on psychological tension or high speed combat for this specific scene? Update AN theme tags.
                  </p>
                </div>
              </div>

              <!-- How AN Works Internally -->
              <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-pink/30">
                <div class="flex items-start gap-2">
                  <Info class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-bd-text-secondary">
                    <strong class="text-bd-text-primary">Under the hood:</strong> AN text is wrapped in <code class="text-bd-pink">[ brackets ]</code> before being sent to the AI. Brackets signify meta-information in training data, causing the AI to treat AN as <strong>direct editorial directives</strong> rather than narrative text.
                  </p>
                </div>
              </div>
            </div>

            <!-- Memory Bank & Story Summary -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Memory Bank &amp; Story Summary</h3>
              <p class="text-bd-text-secondary text-xs">
                The Memory System combines automated big-picture tracking with conditional detail retrieval.
              </p>

              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Brain class="w-4 h-4 text-bd-green" />
                    Memory Bank
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Stores semantic facts as your story progresses. Retried dynamically via vector embeddings when related words appear in recent actions, injecting relevant details conditionally.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <ScrollText class="w-4 h-4 text-bd-cyan" />
                    Story Summary
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    A running overview of plot history. When Auto Summarization is active, the engine appends batch events and periodically re-summarizes them using a dedicated AI pass.
                  </p>
                </div>
              </div>

              <!-- How the Memory Cycle Works -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 text-bd-blue" />
                  How the Memory Cycle Works
                </h4>
                <ol class="text-xs text-bd-text-secondary space-y-1.5 list-decimal list-inside">
                  <li>Every <strong>4 actions</strong>, the engine compiles that batch into a new memory entry.</li>
                  <li>New entries are appended to the <strong>Story Summary</strong> plot component.</li>
                  <li>When the summary becomes too long, a dedicated AI model compresses it.</li>
                  <li>The Memory Bank retrievably injects relevant facts based on semantic similarity.</li>
                </ol>
              </div>

              <!-- 8-Action Buffer -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Database class="w-4 h-4 text-bd-cyan" />
                  The 4-Action Buffer
                </h4>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Your most recent 4 actions are <strong>never summarized</strong>, creating a safety buffer that allows editing or undoing recent actions without corrupting your memory history.
                </p>
              </div>
            </div>

            <!-- Front Memory -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Front Memory</h3>
              <p class="text-bd-text-secondary text-xs">
                Front Memory is a specialized, script-only component. It is injected at the <strong>very end</strong> of the context window, giving it unparalleled influence on the model's immediate next token generation.
              </p>
              <div class="p-3 rounded-lg bg-bd-red/10 border border-bd-red/30 text-xs text-bd-text-secondary">
                This field is not accessible via the standard gameplay UI. It can only be programmatically written to by custom JavaScript scripts via the `state.memory.frontMemory` property.
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
            <ScrollText class="w-5 h-5 text-bd-amber" />
            Best Practices
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Follow these opinionated formatting rules to maximize the utility and token efficiency of your Plot Components.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Plot Essentials rules -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h3 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <User class="w-4 h-4 text-bd-green" />
                  Plot Essentials Rules
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-2 list-disc list-inside">
                  <li><strong>Traveling Companions</strong>: If a companion travels with you, mention them in PE (`Bob is a grumpy wizard companion`) so they don't vanish from scenes.</li>
                  <li><strong>Current Scene Note</strong>: In high context settings (16k+), models can fixate on past actions. Explicitly add: `Current scene: You are talking to Kira in the tavern.`</li>
                  <li><strong>Avoid Negations</strong>: Models tend to drop negatives like "is not." Say `Bob is honest` instead of `Bob is not a liar`.</li>
                  <li><strong>One Subject Per Line</strong>: Repeat the subject's name on each line to establish strong word association.</li>
                </ul>
              </div>

              <!-- Author's Note rules -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h3 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <Feather class="w-4 h-4 text-bd-pink" />
                  Author's Note Rules
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-2 list-disc list-inside">
                  <li><strong>Keep It Short</strong>: Strictly limit AN to <strong>3-4 sentences max</strong>. Long notes cause the model to ignore the main story context.</li>
                  <li><strong>Be Expressive</strong>: Avoid flat descriptions. Use descriptive genre cues: `Dark fantasy, gothic atmosphere, tense pacing` rather than just `fantasy`.</li>
                  <li><strong>Use Tag Syntax</strong>: Labeled tags like `Theme: mystery`, `Mood: Melancholic` are compact, easily parsed by samplers, and token-friendly.</li>
                  <li><strong>No Long-term Planning</strong>: If you write future event plans in AN, the model will try to resolve them immediately on the very next turn.</li>
                </ul>
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

      <!-- ===================== 5. ADVANCED TOPICS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Advanced Topics
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">

            <!-- Scene Transitions -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Scene Transitions &amp; Break Markers</h3>
              <p class="text-bd-text-secondary text-xs">
                When transitioning to a new scene, write a <strong>longer input than usual</strong> describing the new setting or mood. This tells the AI what to focus on and forces it to stop repeating elements from the previous location.
              </p>
              
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2">Scene Break Markers</h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  Most modern models recognize <code class="text-bd-green">---</code> or <code class="text-bd-green">***</code> on a line by itself as an explicit scene break:
                </p>
                <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-secondary">
                  <div>Elara collapsed from exhaustion in the cave.</div>
                  <div class="my-2 text-bd-amber">---</div>
                  <div>The next morning, sunlight filtered through the cracks...</div>
                </div>
              </div>
              
              <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30">
                <div class="flex items-start gap-3">
                  <Sparkles class="w-5 h-5 text-bd-accent-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 class="font-semibold text-bd-text-primary text-xs">BetterDungeon Horizonal Divider Styling</h4>
                    <p class="text-xs text-bd-text-secondary mt-1">
                      BetterDungeon's <strong>Markdown feature</strong> automatically renders these scene break lines (`---`) as styled horizontal dividers in the gameplay window, making readability seamless while keeping the raw tokens intact for the model.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Scripting Integration -->
            <div class="space-y-3 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Scripting Integration</h3>
              <p class="text-bd-text-secondary text-xs">
                Custom JavaScript modifiers can programmatically mutate components in real-time, enabling highly dynamic adventures.
              </p>
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h4 class="font-semibold text-bd-green mb-1">Plot Essentials</h4>
                  <code class="text-[10px] text-bd-green block font-mono">state.memory.context</code>
                  <p class="text-[11px] text-bd-text-muted mt-1">Sets PE content. Values set by scripts completely override any UI-configured content.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                  <h4 class="font-semibold text-bd-pink mb-1">Author's Note</h4>
                  <code class="text-[10px] text-bd-green block font-mono">state.memory.authorsNote</code>
                  <p class="text-[11px] text-bd-text-muted mt-1">Modifies AN content. These script edits take effect on the very next generation turn.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                  <h4 class="font-semibold text-bd-amber mb-1">Front Memory</h4>
                  <code class="text-[10px] text-bd-green block font-mono">state.memory.frontMemory</code>
                  <p class="text-[11px] text-bd-text-muted mt-1">Injects text at the absolute tail of the context. Highly reactive, useful for immediate rules.</p>
                </div>
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
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Tips &amp; Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            
            <!-- Quick Tips -->
            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Scissors class="w-3 h-3 text-bd-green" /> Be Terse
                </h4>
                <p class="text-xs text-bd-text-secondary">Too much info in context dilutes AI focus. <strong>Keep entries short.</strong></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Edit class="w-3 h-3 text-bd-amber" /> Edit AI Outputs
                </h4>
                <p class="text-xs text-bd-text-secondary">Directly alter character slips or wrong details. The AI quickly learns from inline corrections.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Avoid Flashbacks
                </h4>
                <p class="text-xs text-bd-text-secondary">Flashbacks confuse story logic. Models often fail to separate imagined timelines from reality.</p>
              </div>
            </div>

            <!-- Common Pitfalls Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Overloading Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">Stuffing PE with every detail overwhelms the AI and wastes valuable tokens.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Keep PE to universal facts. Move situational details to Story Cards.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Never Updating Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Stale, outdated info actively misleads the AI as the story progresses.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Review PE after major story events. Remove resolved threads and update character statuses.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Duplicating Info Across Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Repeating details across PE, AN, and Story Cards causes heavy repetition and wastes tokens.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Keep information in ONE correct place. Rely on the "Right Tool for the Job" matrix.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Writing AN Like a Novel
                </h4>
                <p class="text-xs text-bd-text-secondary">Long, flowery Author's Notes cause the model to hyper-fixate and lose track of historical narrative.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Limit to 3-4 sentences. Use tag and list structures instead of flowery prose.</p>
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
                Contributors who created PEs, SSs, and ANs, or created guides for them:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in plotComponentsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-blue/10 text-bd-blue border border-bd-blue/20">
                  {{ name }}
                </span>
              </div>
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
import { PLOT_COMPONENTS_CONTRIBUTORS as plotComponentsContributors } from '@/data/contributors'
import { 
  Info, MapPin, Feather, BookMarked, ScrollText, 
  Lightbulb, Layers, HelpCircle, User, Globe, Plus,
  Users, Sword, Star, RefreshCw, MessageSquare,
  Rocket, Focus, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, Scissors, MessageCircle, XCircle, Edit, Ruler, Cpu,
  ChevronDown, ChevronUp, BookOpen
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Are Plot Components?' },
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
