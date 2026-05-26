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

      <!-- ===================== 1. WHAT ARE SYMBOLS & COMMANDS ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            What Are Symbols &amp; Commands?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              AI Dungeon models were trained on vast amounts of internet text, including markdown formatting, code parameters, and academic containers. Because of this, certain special symbols carry structured meaning directly to the AI, allowing you to influence narrative directions, hidden contexts, and dialogue weights without bloating your story prose.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Hash class="w-4 h-4 text-bd-amber" />
                  Markdown Parsing
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Symbols like <code class="text-bd-amber">##</code> mimic headers or subtitles, directing the AI's model attention.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Brackets class="w-4 h-4 text-bd-blue" />
                  Editorial Metadata
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Containers like <code class="text-bd-blue">[ ]</code> replicate editorial comments or footnotes, hidden from the story output.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Braces class="w-4 h-4 text-bd-purple" />
                  Object Isolation
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Curly braces <code class="text-bd-purple">{ }</code> organize code-like definitions to prevent fact bleeding in cards.
                </p>
              </div>
            </div>

            <!-- Sub-topic: Action Box Modes -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Terminal class="w-4 h-4 text-bd-cyan" />
                Action Box Modes (Do, Say, Story, See)
              </h3>
              <p class="text-xs text-bd-text-secondary">
                AI Dungeon translates player inputs into standard interactive-fiction prefixes so the AI can distinguish players from narrator:
              </p>
              <div class="grid md:grid-cols-4 gap-3 text-xs text-bd-text-secondary">
                <div class="p-2.5 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-green block mb-0.5">&gt; Do Mode</strong>
                  Prepends `<code class="text-bd-green">&gt;</code> You ` to actions, telling the AI that you are performing an active step in the environment.
                </div>
                <div class="p-2.5 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-blue block mb-0.5">&gt; Say Mode</strong>
                  Prepends `<code class="text-bd-blue">&gt;</code> You say "` to inputs, signaling to the model that dialogue is being spoken out loud.
                </div>
                <div class="p-2.5 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-purple block mb-0.5">Story Mode</strong>
                  Does not prepend any symbols. Used for straight prose narration, setting descriptions, or introducing new characters.
                </div>
                <div class="p-2.5 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-amber block mb-0.5">See Mode</strong>
                  Sends image prompts to generation engines, creating a picture of the scene rather than adding story turns.
                </div>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30 text-xs text-bd-text-secondary">
              <strong>Community Note:</strong> None of these are official platform features. They are community-discovered best practices leveraging language model training statistics. Focus on well-tested formatting rules to ensure stability.
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
            Quick Start: Steering the AI
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Try these three basic command styles in your next turn to instantly steer your adventure.
            </p>

            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Issue a Direct Command</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    In Story mode, start a new line with double hashes <code class="text-bd-amber">##</code> to command the AI directly (e.g. shifts in location or pacing):
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">## The scene shifts to the dragon's lair</pre>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Inject Hidden Story Annotations</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Wrap author guidelines in square brackets <code class="text-bd-blue">[ ]</code> to set rules the AI shouldn't write down directly:
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Sera is secretly immune to fire magic ]</pre>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Ask the AI Out-Of-Character Questions</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    Use double parentheses and OOC formatting to ask the AI questions outside of the narrative flow:
                  </p>
                  <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">((OOC: What does Sera see inside the chest? | User: Sera?))</pre>
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
            <Brackets class="w-5 h-5 text-bd-blue" />
            Anatomy &amp; How It Works
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">
            
            <!-- Core Symbols Breakdown -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Core Symbols Breakdown</h3>
              
              <!-- ## Double Hash -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Hash class="w-4 h-4 text-bd-amber" />
                  <code class="text-bd-amber font-mono font-bold text-sm">##</code> Double Hash (Direct Commands)
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  The most powerful single symbol for directing AI output. Place it at the start of a line to steer scenes or pacing.
                </p>
                <div class="text-xs text-bd-text-muted">
                  <strong>Why it works:</strong> Evaluated as a second-level heading in markdown. The AI interprets heading lines as high-priority architectural commands.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">## Write in a grimy, noir detective tone</pre>
              </div>

              <!-- [] Square Brackets -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Brackets class="w-4 h-4 text-bd-blue" />
                  <code class="text-bd-blue font-mono font-bold text-sm">[ ]</code> Square Brackets (Author Notes / Rules)
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Instructs the AI to factor in background rules or constraints silently without repeating them in the story.
                </p>
                <div class="text-xs text-bd-text-muted">
                  <strong>Why it works:</strong> Associated with editorial notes, footnotes, or translator annotations in standard internet documents.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Focus on resource survival; keep magic rare ]</pre>
              </div>

              <!-- {} Curly Braces -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Braces class="w-4 h-4 text-bd-purple" />
                  <code class="text-bd-purple font-mono font-bold text-sm">{ }</code> Curly Braces (Attributes Container)
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Maintains distinct properties in Story Cards, preventing facts from blending into adjacent entries.
                </p>
                <div class="text-xs text-bd-text-muted">
                  <strong>Why it works:</strong> Associated with programming dictionaries, JSON objects, and CSS declarations.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">{Character: Sera, Race: Elf, Weapon: Fire Bow}</pre>
              </div>
            </div>

            <!-- Inline & Formatting Symbols -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Inline &amp; Formatting Symbols</h3>
              <div class="grid md:grid-cols-2 gap-4">
                
                <!-- Double Asterisks -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/20 text-xs space-y-1">
                  <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                    <Bold class="w-4 h-4 text-bd-pink" /> <code class="text-bd-pink font-mono">** **</code> Double Asterisks
                  </h4>
                  <p class="text-bd-text-secondary">
                    Represents **bold markdown**. Amplifies instructions or attributes.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Sera is **immune** to flame ]</pre>
                </div>

                <!-- Single Quotes -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-teal/20 text-xs space-y-1">
                  <h4 class="font-semibold text-bd-teal flex items-center gap-1.5">
                    <Quote class="w-4 h-4 text-bd-teal" /> <code class="text-bd-teal font-mono">' '</code> Single Quotes
                  </h4>
                  <p class="text-bd-text-secondary">
                    Highlights specific concepts or proper nouns to anchor AI vocabulary.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Focus on 'melancholic' atmosphere ]</pre>
                </div>

                <!-- Dash Lists -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle text-xs space-y-1">
                  <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                    <FileCode class="w-4 h-4 text-bd-cyan" /> <code class="text-bd-cyan font-mono">- item</code> Dash Lists
                  </h4>
                  <p class="text-bd-text-secondary">
                    Organizes stats and traits neatly for Story Cards or AI instructions.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">- Class: Rogue Alchemist</pre>
                </div>

                <!-- Section Breaks -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle text-xs space-y-1">
                  <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                    <Layers class="w-4 h-4 text-bd-cyan" /> <code class="text-bd-cyan font-mono">---</code> Section Breaks
                  </h4>
                  <p class="text-bd-text-secondary">
                    Creates hard narrative breaks, useful to separate context blocks.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">---</pre>
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
            
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <Check class="w-4 h-4 text-bd-green" />
                Universal Formatting Rules
              </h3>
              <ul class="space-y-2 text-xs text-bd-text-secondary">
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Use Brackets Sparingly:</strong> If you wrap every single sentence in square brackets `[ ]`, the AI treats the entire input as metadata and fails to generate immersive story turns. Limit rules to 1-2 per action.</span>
                </li>
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Prefer Author's Notes:</strong> Instead of writing scene modifiers inside player input, place tone instructions (e.g. `[ Style: grim ]`) directly in the **Author's Note** field, as it stays anchored in context longer.</span>
                </li>
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Model Compatibility Check:</strong> Larger, advanced models (like WizardLM or GPT-4) respond extremely well to highly structured syntax like XML framing. Smaller mobile models are more reliable when instructed in simple plain English commands.</span>
                </li>
              </ul>
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
            
            <!-- Sub-topic: Combining Symbols -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Combining Symbols for Maximum Control</h3>
              <p class="text-xs text-bd-text-secondary">
                By nesting special characters, you can stack directives to issue undeniable absolute instructions:
              </p>
              
              <div class="space-y-3 text-xs">
                <!-- Comb 1 -->
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/20 space-y-1">
                  <h4 class="font-semibold text-bd-text-primary">
                    <code class="text-bd-amber font-mono font-bold">##</code> + <code class="text-bd-pink font-mono">**</code> (Command + Absolute Emphasis)
                  </h4>
                  <pre class="p-1 rounded bg-bd-bg-tertiary text-bd-green font-mono text-[10px]">## **Never** allow Lyra to trust the masked stranger.</pre>
                  <span class="text-bd-text-muted block">Tells the AI this is a new command section and locks the narrative behavior to a strict rule.</span>
                </div>

                <!-- Comb 2 -->
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-blue/20 space-y-1">
                  <h4 class="font-semibold text-bd-text-primary">
                    <code class="text-bd-blue font-mono font-bold">[ ]</code> + <code class="text-bd-teal font-mono">' '</code> (Author Note + Vocabulary Anchor)
                  </h4>
                  <pre class="p-1 rounded bg-bd-bg-tertiary text-bd-green font-mono text-[10px]">[ Act as 'Game Master'. Write the dialogue in an 'old english' dialect. ]</pre>
                  <span class="text-bd-text-muted block">Directs dialogue style safely as background metadata without the AI outputting the rules.</span>
                </div>
              </div>
            </div>

            <!-- Sub-topic: XML-style framing vs JSON containers -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">XML-Style Framing vs. JSON Containers</h3>
              <p class="text-xs text-bd-text-secondary">
                Advanced models process code syntax with massive clarity. You can organize your Story Cards or instructions using tags or object structures:
              </p>
              
              <div class="grid md:grid-cols-2 gap-4 text-xs">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary mb-2">XML-Style Tags (Highly Recommended for Advanced Models)</h4>
                  <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto">
&lt;character name="Marcus"&gt;
  &lt;role&gt;Royal Knight Commander&lt;/role&gt;
  &lt;personality&gt;Loyal, weary, stoic&lt;/personality&gt;
&lt;/character&gt;</pre>
                  <p class="text-bd-text-muted mt-2">Forces strict boundaries; perfect for avoiding fact bleeding on 70B+ param models.</p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary mb-2">JSON-Like Containers (Best for Story Cards)</h4>
                  <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto">
{
  "Character": "Marcus",
  "Foil": "The Crimson Order",
  "Secret": "Loves the Queen"
}</pre>
                  <p class="text-bd-text-muted mt-2">Extremely clean data representation. Keeps metrics isolated and easily serializable.</p>
                </div>
              </div>
            </div>

            <!-- BetterDungeon Command Mode Integration -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-accent-primary/30 space-y-3">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Terminal class="w-4 h-4 text-bd-accent-primary" />
                  BetterDungeon Extension Support
                </h3>
                <span class="badge badge-new">Chrome/Firefox</span>
              </div>
              <p class="text-xs text-bd-text-secondary">
                The **BetterDungeon** browser extension automates these formatting structures by adding active sub-modes directly to your chat input panel:
              </p>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-muted">
                <div class="p-2.5 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">Standard Mode</strong>
                  Inserts <code class="text-bd-amber">##</code> commands seamlessly at the start of your line input.
                </div>
                <div class="p-2.5 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">Subtle Mode</strong>
                  Wraps direct inputs in <code class="text-bd-blue">[## ]</code> brackets for delicate AI steering.
                </div>
                <div class="p-2.5 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-text-primary block mb-0.5">OOC mode</strong>
                  Injects the correct <code class="text-bd-purple">((OOC ... | User: ))</code> formatting string automatically.
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
              Avoid these common mistakes when using symbols to steer generation.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Visual Markdown Expectation
                </h4>
                <p class="text-bd-text-secondary">
                  Thinking bold symbols (`**`) will physically render bold text in the AI Dungeon chat logs.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Understand that the interface does not render markdown, but the AI model reads the raw symbols perfectly during generation.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Completely Bracketed Inputs
                </h4>
                <p class="text-bd-text-secondary">
                  Writing your entire player action inside square brackets (`[ ]`).
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Keep story actions in plain text. Use brackets exclusively for background guidelines or rules.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Stacking Unrelated Data in One Bracket
                </h4>
                <p class="text-bd-text-secondary">
                  Writing `[ Marcus is a knight, Sera is a rogue, the sword is magical ]` bleed facts together.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Use `{ }` curly-braced attribute key-value pairs or write separate sentences.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Overwhelming Stacking
                </h4>
                <p class="text-bd-text-secondary">
                  Using hashes, asterisks, brackets, and quotes all on a single line of instruction.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Keep stacking clean: combine at most 2 styles (e.g. `##` commands with `**` bold rules).
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
                Contributors who researched, cataloged, and built command utilities for AI Dungeon symbols:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  GremmieGremlin
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  LewdLeah
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  BetterDungeon Dev Team
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
import { 
  Info, Lightbulb, Sparkles, Zap, AlertTriangle,
  BookOpen, MessageSquare, Hash, Bold, Quote, FileCode, Layers,
  Braces, Brackets, ChevronRight, Check, Terminal, ExternalLink,
  ChevronDown, ChevronUp, Rocket, Award, X
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Are Symbols & Commands?' },
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
