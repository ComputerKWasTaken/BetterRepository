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

      <!-- Context Budget Routing Notice -->
      <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
        <div class="flex items-start gap-3">
          <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-semibold text-bd-text-primary text-sm">System Prompt Architecture & Token Budgets</h4>
            <p class="text-xs text-bd-text-secondary mt-1">
              AI Instructions occupy the high-attention <strong>Position #1</strong> in the LLM prompt stream. For a full technical analysis of context window layouts, positional attention biases, prompt-assembly hierarchies, and the 70/30 required-to-dynamic allocation split, please consult our dedicated
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-semibold">Plot Components Guide</router-link>.
            </p>
          </div>
        </div>
      </div>

      <!-- ===================== WHAT ARE AI INSTRUCTIONS ===================== -->
      <section id="guide-what-is" class="card">
        <button 
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-amber" />
            What Are AI Instructions?
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              AI Instructions are rules you write to steer <strong>how the AI behaves</strong>. They act as a foundational filter defining the model's core persona, narrative perspective, style, pacing, and gameplay boundaries. 
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-amber" />
                  What They Control
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-1">
                  <li>• Voice, tone, and stylistic register</li>
                  <li>• Response pacing and descriptive depth</li>
                  <li>• NPC psychological agency</li>
                  <li>• Narrative perspective (POV)</li>
                  <li>• System-level format bounds</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Info class="w-4 h-4 text-bd-blue" />
                  Replace, Don't Stack
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Custom instructions <strong>replace</strong> the platform defaults entirely; they do not stack on top. Writing custom rules wipes the built-in system directives clean.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Plus class="w-4 h-4 text-bd-green" />
                  Optional Baseline
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  If left empty, AI Dungeon applies Latitude's finely-tuned model defaults. Only introduce custom directives to solve recurring prose or behavioral issues.
                </p>
              </div>
            </div>

            <!-- Builder CTA -->
            <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30 flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-bd-text-primary text-sm">Need a structured setup?</h3>
                <p class="text-xs text-bd-text-secondary">Use our drag-and-drop Builder to assemble modular components into stable Instruction Sets.</p>
              </div>
              <router-link to="/ai-instructions?tab=builder" class="btn btn-primary text-xs">
                <Wrench class="w-3.5 h-3.5" /> Open Instruction Builder
              </router-link>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SYSTEM INSTRUCTION PRINCIPLES ===================== -->
      <section id="guide-anatomy" class="card">
        <button 
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-cyan" />
            System Instruction Principles
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">
            
            <div class="space-y-4">
              <p class="text-bd-text-secondary text-xs">
                To override default behavior effectively, you must understand what is being replaced. Below is the exact line-by-line breakdown of AI Dungeon's default directives.
              </p>

              <!-- The full default set -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-3 text-xs flex items-center gap-2">
                  <FileText class="w-4 h-4 text-bd-text-muted" />
                  Standard Platform System Directives
                </h4>
                <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green space-y-1">
                  <div>You are an AI dungeon master that provides any kind of roleplaying game content.</div>
                  <div class="text-bd-text-muted mt-2">Instructions:</div>
                  <div class="mt-1">- Be specific, descriptive, and creative.</div>
                  <div>- Avoid repetition and avoid summarization.</div>
                  <div>- Generally use second person (like this: 'He looks at you.'). But use third person if that's what the story seems to follow.</div>
                  <div>- Never decide or write for the user. If the input ends mid sentence, continue where it left off. ">" tokens mean a character action attempt. You should describe what happens when the player attempts that action. Do not output the ">" token.</div>
                  <div>- Make sure you always give responses continuing mid sentence even if it stops partway through.</div>
                </div>
              </div>

              <!-- Breakdown by category -->
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-bd-amber" />
                Default Rules Anatomy
              </h4>

              <div class="space-y-3 text-xs">
                <!-- Line 1: Role -->
                <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-purple/20 text-bd-purple uppercase tracking-wider">Role Definition</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        You are an AI dungeon master that provides any kind of roleplaying game content.
                      </div>
                      <p class="text-bd-text-secondary">
                        Establishes the AI's core **persona**. Everything else derives from this primary identity, allowing the AI to take creative liberties within roleplaying bounds.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 2: Style & Pacing -->
                <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-blue/20 text-bd-blue uppercase tracking-wider">Stylistic Directives</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Be specific, descriptive, and creative.
                        - Avoid repetition and avoid summarization.
                      </div>
                      <p class="text-bd-text-secondary">
                        Locks in prose standards. "Avoid repetition" blocks echoing user vocabulary, and "avoid summarization" forces the model to stay in scene rather than prematurely wrapping the narrative.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 3: Perspective -->
                <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-green/20 text-bd-green uppercase tracking-wider">Perspective Rules</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Generally use second person (like this: 'He looks at you.'). But use third person if that's what the story seems to follow.
                      </div>
                      <p class="text-bd-text-secondary">
                        Dictates narrative perspective with an adaptive fallback. The model default is second person ("you"), but it shifts immediately to third person ("he/she") if story logs establish that pattern.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 4: Player Agency & Technical Formatting -->
                <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber uppercase tracking-wider">Agency & Meta-Tokens</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Never decide or write for the user. If the input ends mid sentence, continue where it left off. ">" tokens mean a character action attempt. You should describe what happens when the player attempts that action. Do not output the ">" token.
                      </div>
                      <p class="text-bd-text-secondary">
                        Crucial gameplay protections:
                      </p>
                      <ul class="space-y-1 mt-2 text-bd-text-muted">
                        <li>• <strong>Player Agency:</strong> Stops the AI from taking actions or speaking dialogue for the player's character.</li>
                        <li>• <strong>Mid-Sentence Pickups:</strong> Supports player prompts that terminate mid-sentence for cooperative continuation.</li>
                        <li>• <strong>Do Token Parsing:</strong> Explains how to parse the standard text interface `>` action signifiers without echoing them.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Priorities Framework -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-3 text-xs flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-amber" />
                  The Custom Directive Priorities Pattern
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  When composing custom instructions, we recommend organizing rules under a clear hierarchal framework:
                </p>
                <div class="grid md:grid-cols-4 gap-2 text-xs">
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-purple block mb-1">1. Persona</strong>
                    Define WHO the AI is (genre specialty, target tone, roleplay voice).
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-blue block mb-1">2. Pacing</strong>
                    Define descriptive depth, sentence variety, and time pacing rules.
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-amber block mb-1">3. Agency</strong>
                    Reinforce strict player agency controls and character boundaries.
                  </div>
                  <div class="p-3 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-teal block mb-1">4. Format</strong>
                    Specify spacing formats, dialogue layouts, or mid-turn rules.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DIRECTIVE WRITING TECHNIQUES ===================== -->
      <section id="writing-techniques" class="card">
        <button 
          @click="toggleGuideSection('writing-techniques')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Directive Writing Techniques
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('writing-techniques') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('writing-techniques')" class="mt-4 space-y-6">
            
            <div class="space-y-4">
              <p class="text-bd-text-secondary text-xs">
                Writing instructions is an exercise in tokenizer efficiency. Every superfluous word in your directives represents a lost token that could otherwise store story context.
              </p>

              <!-- Positive Framing and Direct Command Words -->
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                  <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                    <Sparkles class="w-4 h-4 text-bd-purple" />
                    Frame Directives Positively
                  </h3>
                  <p class="text-xs text-bd-text-secondary">
                    Due to how LLM attention architectures are pre-trained, negative directives ("Don't do X") frequently misfire. Instead of telling the AI what <em>not</em> to do, explicitly state what it <strong>should</strong> do:
                  </p>
                  <div class="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div class="p-2 rounded bg-bd-pink/10 border border-bd-pink/20 text-bd-text-muted">
                      <div class="text-[10px] text-bd-pink uppercase font-semibold mb-1">Fragile Negative</div>
                      Don't write boring prose. Avoid short sentences.
                    </div>
                    <div class="p-2 rounded bg-bd-green/10 border border-bd-green/20 text-bd-green">
                      <div class="text-[10px] uppercase font-semibold mb-1">Stable Positive</div>
                      Write vivid, sensory prose. Use highly varied sentence lengths.
                    </div>
                  </div>
                </div>

                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                  <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                    <Coins class="w-4 h-4 text-bd-amber" />
                    Direct Command Words
                  </h3>
                  <p class="text-xs text-bd-text-secondary">
                    Start every single instruction line with active imperative verbs. Never use passive preambles like "please try to" or "make sure that you".
                  </p>
                  <div class="overflow-x-auto text-[11px]">
                    <table class="w-full text-bd-text-secondary">
                      <thead>
                        <tr class="border-b border-bd-border-subtle">
                          <th class="text-left font-semibold text-bd-text-primary py-1 pr-2">Verb</th>
                          <th class="text-left font-semibold text-bd-text-primary py-1">Typical Context</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b border-bd-border-subtle/50">
                          <td class="py-1 font-mono text-bd-purple">Be</td>
                          <td>Set tone: "Be descriptive, atmospheric, and slow-paced."</td>
                        </tr>
                        <tr class="border-b border-bd-border-subtle/50">
                          <td class="py-1 font-mono text-bd-purple">Avoid</td>
                          <td>Prevent behaviors: "Avoid summarization; play out scenes."</td>
                        </tr>
                        <tr class="border-b border-bd-border-subtle/50">
                          <td class="py-1 font-mono text-bd-purple">Write</td>
                          <td>Style formatting: "Write dialogue in a rough-hewn dialect."</td>
                        </tr>
                        <tr>
                          <td class="py-1 font-mono text-bd-purple">Never</td>
                          <td>Critical constraints: "Never speak dialogue for the user."</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <!-- Tokenizer Efficiency -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-3">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Coins class="w-4 h-4 text-bd-amber" />
                  Pruning Token Waste
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Examine how severe wordiness can be compressed to maximize available history buffers:
                </p>
                <div class="grid md:grid-cols-2 gap-3 text-xs font-mono">
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <div class="text-[10px] text-bd-pink font-semibold mb-1 uppercase">Wordy Baseline (19 tokens)</div>
                    Please try to avoid using any metaphors, similes, or other flowery figurative comparisons in your prose.
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-green/20">
                    <div class="text-[10px] text-bd-green font-semibold mb-1 uppercase">Compressed Direct (9 tokens)</div>
                    Avoid similes, metaphors, or flowery figurative comparisons.
                  </div>
                </div>
                <div class="text-xs text-bd-text-muted">
                  <strong>Tip:</strong> You can test your directives on the official <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline">Hugging Face Tokenizer Playground</a> to analyze token representations.
                </div>
              </div>

            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DIRECTIVES VS AUTHOR'S NOTE ===================== -->
      <section id="best-practices" class="card">
        <button 
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            AI Instructions vs. Author's Note
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary text-xs">
              AI Instructions and Author's Notes are both directives, but they reside at opposite ends of the prompt stream. Understanding their distinct roles prevents logic contradictions.
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Technical Feature</th>
                    <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">AI Instructions</th>
                    <th class="text-left py-2 text-bd-text-primary font-semibold">Author's Note</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-3 pr-4 font-medium">Position in Context</td>
                    <td class="py-3 pr-4 text-bd-purple font-semibold">Position #1 (Beginning)</td>
                    <td class="py-3 text-bd-amber font-semibold">Position #7 (Near End)</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-3 pr-4 font-medium">Attention Profile</td>
                    <td class="py-3 pr-4">High structural bias (rules definition)</td>
                    <td class="py-3">Extremely high immediate bias (next token)</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-3 pr-4 font-medium">Scope</td>
                    <td class="py-3 pr-4">Global, permanent writing style rules</td>
                    <td class="py-3">Local, highly volatile scene directives</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-3 pr-4 font-medium">Change Frequency</td>
                    <td class="py-3 pr-4">Rarely altered once validated</td>
                    <td class="py-3">Updated frequently as scene location changes</td>
                  </tr>
                  <tr>
                    <td class="py-3 pr-4 font-medium">Best Used For</td>
                    <td class="py-3 pr-4">"Always write in third-person past tense."</td>
                    <td class="py-3">"[ Scene: Marcus interrogates the merchant. Tense. ]"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== GENRE PRESETS & LIBRARY ===================== -->
      <section id="presets" class="card">
        <button 
          @click="toggleGuideSection('presets')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Swords class="w-5 h-5 text-bd-purple" />
            Genre Presets &amp; Custom Library
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('presets') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('presets')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Directives are highly dependent on the chosen genre. Below are fully optimized, token-efficient modular blocks ready to copy-paste.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Fantasy -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <Swords class="w-4 h-4 text-bd-amber" />
                  Morally Grey Dark Fantasy
                </h4>
                <div class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green leading-relaxed whitespace-pre-wrap">You are a dark fantasy novelist. Write in a gritty, realistic prose style.
- Magic is rare, volatile, and has visible physical costs.
- Actions have permanent physical and psychological consequences.
- Highlight sensory decay, grime, and atmospheric tension.</div>
              </div>

              <!-- Horror -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-red/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <Skull class="w-4 h-4 text-bd-red" />
                  Cosmic / Psychological Horror
                </h4>
                <div class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green leading-relaxed whitespace-pre-wrap">You are an atmospheric horror author. Focus on building psychological dread.
- Emphasize paranoia, sensory distortion, and what is left unseen.
- NPCs react with visceral panic and emotional instability.
- Keep description pacing slow and deliberate.</div>
              </div>

              <!-- Romance -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-rose/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <Heart class="w-4 h-4 text-bd-rose" />
                  Slow-Burn Character Drama
                </h4>
                <div class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green leading-relaxed whitespace-pre-wrap">You are a character-driven romance novelist. 
- Prioritize slow-burn interpersonal chemistry.
- Focus on micro-expressions, posture, and unspoken dialogue beats.
- NPCs act with distinct personal motivations and agency.</div>
              </div>

              <!-- Mystery -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-sm flex items-center gap-2">
                  <Target class="w-4 h-4 text-bd-blue" />
                  Noir Detective / Procedural
                </h4>
                <div class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green leading-relaxed whitespace-pre-wrap">You are a hardboiled mystery author. Use short, clipped sentence structures.
- NPCs withhold crucial information, lie, or act with hidden agendas.
- Describe environments in high contrast, highlighting shadows and details.
- Require player investigation to uncover plot clues.</div>
              </div>
            </div>

            <!-- UI Labeled Rules -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-purple" />
                Theme Labeled Modifiers
              </h4>
              <p class="text-xs text-bd-text-secondary">
                To organize massive, multi-genre instruction sets, you can group directives under structured labels:
              </p>
              <pre class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green overflow-x-auto leading-normal">
Dialogue:
- Write character dialogue that matches their region and class.
- Avoid modern slang or idioms in fantasy settings.

Combat:
- Describe fights with brutal realism, tactical details, and consequences.
- Injuries degrade physical performance immediately.</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DIRECTIVES TROUBLESHOOTING & DEBBUGING ===================== -->
      <section id="debugging" class="card">
        <button 
          @click="toggleGuideSection('debugging')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Directives Troubleshooting &amp; Verification
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('debugging') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('debugging')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Directives require active verification. AI Dungeon provides professional diagnostic tools to inspect how the engine compiles your prompt stream.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- View Context -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-teal/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <Eye class="w-4 h-4 text-bd-teal" />
                  View Context Analysis
                </h4>
                <p class="text-xs text-bd-text-secondary mb-2">
                  <strong>Click any AI turn output → View Context</strong> to see the exact text sent to the LLM. 
                </p>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li>• Confirm your custom directives exist at the start.</li>
                  <li>• Verify if rules were truncated due to exceeding token counts.</li>
                  <li>• Audit the active token balance of memory elements.</li>
                </ul>
              </div>

              <!-- Inspect Input -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-blue/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <Info class="w-4 h-4 text-bd-blue" />
                  Inspect Input Console
                </h4>
                <p class="text-xs text-bd-text-secondary mb-2">
                  <strong>Settings → Testing & Feedback → Inspect Input</strong> triggers a raw metadata overlay.
                </p>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li>• Ideal for analyzing raw markdown tags, brackets, or spacing.</li>
                  <li>• Fast visual verification of active Story Cards.</li>
                </ul>
              </div>
            </div>

            <!-- Debugging Workflow -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                <Wrench class="w-4 h-4 text-bd-purple" />
                Iterative Directive Debugging Workflow
              </h4>
              <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
                <li><strong>Isolate the Defect:</strong> Define exactly what the model is doing wrong (e.g. "AI repeatedly describes player facial expressions").</li>
                <li><strong>Perform Context Audit:</strong> Run <em>View Context</em>. Are the directives fully present, or did history take up the budget?</li>
                <li><strong>Deploy a Single Directive:</strong> Draft one positive, active rule. Do not add dozens of instructions at once.</li>
                <li><strong>Validate (3-5 Actions):</strong> Run several turns. Is the model adhering to the new constraint?</li>
                <li><strong>Refine or Consolidate:</strong> If it works, keep it. If it causes contradictions or prose stiltedness, re-draft immediately.</li>
              </ol>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMMON DIRECTIVES PITFALLS ===================== -->
      <section id="pitfalls" class="card">
        <button 
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Directives Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Avoid these architectural mistakes to keep your custom directives token-efficient and stable.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> The Bloat Trap (Too Many Directives)
                </h4>
                <p class="text-bd-text-secondary">Pasting 40+ lines of style rules in one set. This dilutes LLM attention weights, causing the model to arbitrarily ignore rules.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Restrict your set to 5-10 core directives. If style rules are temporary, move them to the Author's Note.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Multiline Style Contradictions
                </h4>
                <p class="text-bd-text-secondary">"Write extremely concise sentences" + "Provide detailed descriptive prose." The contradictory instructions confuse the model.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Consolidate rules. Specify context variables (e.g. "Write dialogue concisely; write settings descriptively").</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Mixing Facts into Instructions
                </h4>
                <p class="text-bd-text-secondary">Pasting character descriptions, inventories, or locations inside system instructions. Instructions are for behaviors, not databases.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Move character details to Plot Essentials, and situational lore to Story Cards.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Negative-Only Constraint Traps
                </h4>
                <p class="text-bd-text-secondary">Using strings like "Don't suddenly start a fight." The model pays attention to "start a fight" due to keyword priming.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Pivot to positive rules: "Allow conflict to develop slowly over multiple turns."</p>
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
            <Info class="w-5 h-5 text-bd-amber" />
            Credits &amp; Resources
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who researched, developed, and documented AI Instructions configurations:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in aiInstructionsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  {{ name }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <a href="https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU" target="_blank" class="btn btn-secondary text-xs">
                <ScrollText class="w-3 h-3" /> OffMetaGamer's Repo
              </a>
              <a href="https://help.aidungeon.com/faq/ai-instructions" target="_blank" class="btn btn-secondary text-xs">
                <BookOpen class="w-3 h-3" /> Official FAQ
              </a>
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord Community
              </a>
              <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="btn btn-secondary text-xs">
                <Coins class="w-3 h-3" /> Tokenizer Playground
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
import { AI_INSTRUCTIONS_CONTRIBUTORS as aiInstructionsContributors } from '@/data/contributors'
import { 
  ScrollText, Layers, Swords, FileText, BookOpen, HelpCircle,
  Sparkles, Info, Zap, Target, Lightbulb, Rocket, Wrench,
  MessageSquare, Skull, ExternalLink,
  AlertTriangle, Plus, Coins, Cpu,
  X, Heart, ChevronDown, ChevronUp, Eye, Bold, Quote
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Basics & Principles', isHeader: true },
  { id: 'what-is', label: 'What Are AI Instructions?' },
  { id: 'anatomy', label: 'System Instruction Principles' },
  { id: 'header-writing', label: 'Prose steering', isHeader: true },
  { id: 'writing-techniques', label: 'Writing Techniques' },
  { id: 'best-practices', label: 'Directives vs Author\'s Note' },
  { id: 'header-advanced', label: 'Presets & Library', isHeader: true },
  { id: 'presets', label: 'Genre Presets & Library' },
  { id: 'header-debugging', label: 'Diagnostics', isHeader: true },
  { id: 'debugging', label: 'Directives Diagnostics' },
  { id: 'pitfalls', label: 'Common Pitfalls' },
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

const isGuideSectionExpanded = (sectionId) => {
  return expandedGuideSections.value.has(sectionId)
}

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
