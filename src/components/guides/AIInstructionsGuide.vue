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

      <!-- ===================== 1. WHAT IS AI INSTRUCTIONS ===================== -->
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
              AI Instructions are rules you write to control <strong>how the AI behaves</strong>, including its writing style, pacing, character handling, and world rules. They sit at <strong>position #1</strong> in the context window, making them the first thing the AI reads on every turn.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-amber" />
                  What They Control
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-1">
                  <li>• Writing style & prose quality</li>
                  <li>• Pacing & response length</li>
                  <li>• NPC behavior & world rules</li>
                  <li>• Player character control</li>
                  <li>• Tone, genre, & atmosphere</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Info class="w-4 h-4 text-bd-blue" />
                  Key Fact
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Custom instructions <strong>replace</strong> the defaults entirely; they don't stack on top. If you write your own, the built-in instructions are gone.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Plus class="w-4 h-4 text-bd-green" />
                  How to Add
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  <strong>Sidebar → Plot → Add Plot Component → AI Instructions</strong>
                </p>
              </div>
            </div>

            <!-- Model Defaults & Optional Use -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Model Defaults & When to Use Custom Instructions</h4>
              <div class="space-y-2 text-xs text-bd-text-secondary">
                <p>
                  Every AI model in AI Dungeon includes its own <strong>default system instructions</strong>, tuned specifically for that model's strengths and behavior patterns. AI Instructions are entirely <strong>optional</strong>, and for many users, relying on model defaults is the most stable and effective choice.
                </p>
                <p>
                  Custom instructions work best when introduced to fix <strong>specific, recurring problems</strong> rather than preemptively. Since custom instructions replace defaults entirely, be aware that <strong>switching models may require revising your instructions</strong>, as different models interpret them differently.
                </p>
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

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  For a full breakdown of context assembly order, token budgets, and how all plot components interact, see the 
                  <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">Plot Components Guide</router-link>.
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
            Quick Start: Build Your First Instruction Set
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              New to AI Instructions? Follow these 3 steps to create your first Instruction Set using components.
            </p>
            
            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Give the AI a Role</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">Start with WHO the AI should be. This is the most important part.</p>
                  <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                    You are a talented novelist writing an exciting dark fantasy story.
                  </div>
                  <router-link 
                    to="/ai-instructions?tab=collection"
                    class="mt-2 text-xs text-bd-accent-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink class="w-3 h-3" /> Browse Role Components →
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Add 2-3 Core Rules</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">Pick rules that solve your biggest frustrations. Don't overload.</p>
                  <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
- Never write dialogue or actions for the player character
- Continue from where the story left off
- Vary sentence structure to avoid repetition
                  </div>
                  <router-link 
                    to="/ai-instructions?tab=collection"
                    class="mt-2 text-xs text-bd-accent-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink class="w-3 h-3" /> Browse Essential Components →
                  </router-link>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Test & Iterate</h3>
                  <p class="text-xs text-bd-text-secondary mb-2">Play for a bit. Notice what's wrong. Add ONE instruction to fix it. Repeat.</p>
                  <div class="p-2 rounded bg-bd-bg-primary text-xs text-bd-text-secondary">
                    <strong>Common additions:</strong> Pacing too fast? Add "Let scenes breathe". AI too wordy? Add "Be concise". NPCs too agreeable? Add "NPCs have their own goals."
                  </div>
                </div>
              </div>
            </div>

            <!-- Try the Builder CTA -->
            <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30 flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-bd-text-primary">Ready to build?</h3>
                <p class="text-xs text-bd-text-secondary">Use our Builder to assemble components into custom Instruction Sets.</p>
              </div>
              <router-link to="/ai-instructions?tab=builder" class="btn btn-primary text-sm">
                <Wrench class="w-4 h-4" /> Open Builder
              </router-link>
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
            
            <!-- Default breakdown -->
            <div class="space-y-4">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Default Instructions Breakdown</h3>
              <p class="text-bd-text-secondary text-xs">
                Every AI Dungeon adventure starts with <strong>Latitude's built-in default instructions</strong>. When you write your own, they <strong>replace the defaults entirely</strong>, meaning your instructions aren't appended on top. Understanding how the defaults are organized helps you decide what to keep, what to improve, and what to leave out.
              </p>

              <!-- The full default set -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-3 text-xs flex items-center gap-2">
                  <FileText class="w-4 h-4 text-bd-text-muted" />
                  The Default Instruction Set
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
                Line-by-Line Breakdown
              </h4>

              <div class="space-y-3">
                <!-- Line 1: Role -->
                <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-purple/20 text-bd-purple uppercase tracking-wider">Role</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        You are an AI dungeon master that provides any kind of roleplaying game content.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        Sets the AI's <strong>persona</strong>. This is the foundation, as everything else builds on this identity. The "any kind of roleplaying game content" part gives the AI broad creative permission.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 2: Writing Style -->
                <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-blue/20 text-bd-blue uppercase tracking-wider">Style</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Be specific, descriptive, and creative.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        Core <strong>writing style</strong> directive. Three clear adjectives that set the quality bar. Notice how it's positive ("be this") rather than negative ("don't be boring").
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 3: Anti-Repetition -->
                <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-blue/20 text-bd-blue uppercase tracking-wider">Style</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Avoid repetition and avoid summarization.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        Two of the most common AI problems in one line. <strong>Repetition</strong> (reusing phrases, echoing user input) and <strong>summarization</strong> (wrapping up instead of continuing) are the top complaints from players.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 4: POV -->
                <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-green/20 text-bd-green uppercase tracking-wider">POV</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Generally use second person (like this: 'He looks at you.'). But use third person if that's what the story seems to follow.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        Sets the <strong>narrative perspective</strong> with a smart fallback. Second person is the AI Dungeon default ("you walk into the tavern"), but it gracefully defers to third person if the story establishes that pattern. The inline example makes the instruction unambiguous.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Line 5: Player Agency + > Token -->
                <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber uppercase tracking-wider">Gameplay + Meta</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Never decide or write for the user. If the input ends mid sentence, continue where it left off. ">" tokens mean a character action attempt. You should describe what happens when the player attempts that action. Do not output the ">" token.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        The densest line; it packs <strong>three separate concerns</strong> into one instruction:
                      </p>
                      <ul class="text-xs text-bd-text-secondary space-y-1 mt-2">
                        <li>• <strong>Player agency</strong>: "Never decide or write for the user" prevents the AI from controlling your character</li>
                        <li>• <strong>Continuation</strong>: "continue where it left off" ensures seamless mid-sentence pickups</li>
                        <li>• <strong>> token handling</strong>: Explains the AI Dungeon action format and prevents the AI from echoing the > symbol</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <!-- Line 6: Continuation -->
                <div class="p-4 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
                  <div class="flex items-start gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-teal/20 text-bd-teal uppercase tracking-wider">Coherence</span>
                    <div class="flex-1">
                      <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
                        - Make sure you always give responses continuing mid sentence even if it stops partway through.
                      </div>
                      <p class="text-xs text-bd-text-secondary">
                        <strong>Reinforces continuation</strong>; this is essentially a stronger restatement of the mid-sentence rule from the previous line.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Organization Pattern -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary mb-3 text-xs flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-amber" />
                  The Priorities Pattern
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  Notice how the defaults follow a clear priority order. Your custom instructions should follow the same structure:
                </p>
                <div class="space-y-2">
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">1</span>
                    <span class="text-xs text-bd-text-secondary"><strong>Role</strong>: Who is the AI? (persona, tone, genre)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-blue/20 text-bd-blue text-xs font-bold flex items-center justify-center">2</span>
                    <span class="text-xs text-bd-text-secondary"><strong>Style</strong>: How should it write? (prose quality, POV, pacing)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber text-xs font-bold flex items-center justify-center">3</span>
                    <span class="text-xs text-bd-text-secondary"><strong>Gameplay</strong>: What are the rules? (player control, consequences, world behavior)</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">4</span>
                    <span class="text-xs text-bd-text-secondary"><strong>Coherence & Meta</strong>: How should it handle technical concerns? (continuation, formatting, tokens)</span>
                  </div>
                </div>
              </div>

              <!-- Tip -->
              <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
                <div class="flex items-start gap-2">
                  <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-bd-text-secondary">
                    <strong>Your instructions replace these defaults entirely.</strong> Once you write custom instructions, the defaults are gone. If you want to keep any of this behavior (like the > token handling or second-person POV), you need to include it yourself. Use <strong>View Context</strong> on any AI output to verify exactly what the AI sees.
                  </p>
                </div>
              </div>
            </div>

            <!-- Structuring custom sets -->
            <div class="space-y-4 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md">Structuring Your Instruction Set</h3>
              <p class="text-xs text-bd-text-secondary">
                Good structure helps both you and the AI understand what's expected. Follow this order for best results.
              </p>
              
              <div class="space-y-4">
                <!-- Step 1: Define the AI's Role -->
                <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2">1. Define the AI's Persona</h4>
                  <p class="text-xs text-bd-text-secondary mb-2">Start by telling the AI what role it plays. This sets the tone for everything else.</p>
                  <div class="space-y-2">
                    <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                      You are a creative author, known for dark and brutal horror books that are exciting and thrilling.
                    </div>
                    <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs border border-bd-accent-primary/20">
                      <div class="text-bd-accent-light mb-1">// Advanced pattern:</div>
                      <div class="text-bd-green">"The player would like you to pick up a varying novel..."</div>
                      <div class="text-bd-text-muted mt-1 italic text-[10px]">Framing the session as a professional writing project encourages more deliberate, higher-quality prose from the AI.</div>
                    </div>
                  </div>
                  <p class="text-xs text-bd-text-muted mt-2">
                    Examples: Shakespeare, evil DM, snarky narrator, noir detective writer...
                  </p>
                </div>

                <!-- Step 2: Core Writing Rules -->
                <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2">2. Core Writing Rules</h4>
                  <p class="text-xs text-bd-text-secondary mb-2">Define the fundamental rules that apply to all writing. These should be universal to your story.</p>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
- Be descriptive and creative with prose
- Never write dialogue or actions for the player character
- Continue from where the story left off
- Maintain consistency with established facts
                  </div>
                </div>

                <!-- Step 3: Topic-Specific Rules -->
                <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2">3. Topic-Specific Rules</h4>
                  <p class="text-xs text-bd-text-secondary mb-2">Group related components by topic. This helps the AI understand context and apply rules appropriately.</p>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs">
                    <div class="text-bd-amber font-semibold">Dialogue:</div>
                    <div class="text-bd-green">- Write natural, character-appropriate dialogue</div>
                    <div class="text-bd-green">- Each character has a distinct voice</div>
                    <div class="text-bd-amber mt-2 font-semibold">Combat:</div>
                    <div class="text-bd-green">- Describe fights with tactical detail</div>
                    <div class="text-bd-green">- Injuries affect character performance</div>
                    <div class="text-bd-amber mt-2 font-semibold">NPCs:</div>
                    <div class="text-bd-green">- NPCs have their own goals and motivations</div>
                    <div class="text-bd-green">- NPCs react realistically to player actions</div>
                  </div>
                </div>

                <!-- Short vs Long Sets -->
                <div class="grid md:grid-cols-2 gap-4">
                  <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                    <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                      <Zap class="w-4 h-4 text-bd-green" />
                      Short Sets
                    </h4>
                    <p class="text-xs text-bd-text-secondary mb-2">Best for specific themes (horror, comedy). Each line starts with "-". Keep it under 10-15 components.</p>
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
                      <div class="text-bd-green">- Be descriptive and creative</div>
                      <div class="text-bd-green">- Avoid repetition</div>
                      <div class="text-bd-green">- Never write for the player</div>
                    </div>
                  </div>
                  <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                    <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                      <Layers class="w-4 h-4 text-bd-purple" />
                      Long Sets
                    </h4>
                    <p class="text-xs text-bd-text-secondary mb-2">For complex scenarios. Group related components under labeled sections for clarity.</p>
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
                      <div class="text-bd-amber">Dialogue:</div>
                      <div class="text-bd-green">- Write natural dialogue</div>
                      <div class="text-bd-amber mt-1">Combat:</div>
                      <div class="text-bd-green">- Let injuries have consequences</div>
                    </div>
                  </div>
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
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Best Practices
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            
            <div class="space-y-4">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Writing Effective Instructions</h3>
              <p class="text-bd-text-secondary text-xs">
                Every word in your instructions costs tokens, which is context space that could hold story instead. Good instructions are <strong>direct, specific, and actionable</strong>.
              </p>

              <!-- Be Direct -->
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                  <div class="text-[10px] text-bd-pink font-semibold mb-1 uppercase">Wordy (19 tokens)</div>
                  <code class="text-[10px] text-bd-text-secondary">Please try to avoid using any metaphors, similes, or other flowery figurative comparisons in your prose.</code>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-green/20">
                  <div class="text-[10px] text-bd-green font-semibold mb-1 uppercase">Direct (9 tokens)</div>
                  <code class="text-[10px] text-bd-text-secondary">Avoid similes, metaphors, or figurative comparisons.</code>
                </div>
              </div>

              <!-- Writing Rules -->
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Zap class="w-4 h-4 text-bd-amber" />
                    How to Write
                  </h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1.5">
                    <li>• <strong>Command words</strong>: Start with: Make, Avoid, Write, Be, Never, Always</li>
                    <li>• <strong>One idea per line</strong>: Short, specific, actionable</li>
                    <li>• <strong>Positive framing</strong>: "Write vivid descriptions" beats "Don't be boring"</li>
                    <li>• <strong>Be specific</strong>: "Use varied sentence lengths" beats "Write better"</li>
                    <li>• <strong>Give examples</strong>: Inline examples remove ambiguity</li>
                  </ul>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Coins class="w-4 h-4 text-bd-amber" />
                    Token Efficiency
                  </h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1.5">
                    <li>• <strong>Cut filler</strong>: Remove "please", "try to", "make sure to"</li>
                    <li>• <strong>Merge related rules</strong>: Combine lines that address the same concern</li>
                    <li>• <strong>Skip the obvious</strong>: Don't restate what the defaults cover (unless you've replaced them)</li>
                    <li>• <strong>Check your count</strong>: Use a <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline">tokenizer tool</a></li>
                  </ul>
                </div>
              </div>

              <!-- Attention tip -->
              <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
                <div class="flex items-start gap-2">
                  <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-bd-text-secondary">
                    <strong>Attention is highest at the beginning and end.</strong> Put your most important rules first (role, core style) and use the end for reinforcement. Topic sections in the middle help organize without losing impact.
                  </p>
                </div>
              </div>

              <!-- Response Shaping Techniques -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-purple" />
                  Response Shaping Techniques
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  Beyond sampling parameters, you can shape AI responses through careful use of AI Instructions and Author's Note together.
                </p>
                <div class="grid md:grid-cols-2 gap-3">
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Pacing Control</h4>
                    <div class="space-y-1 text-xs text-bd-text-secondary">
                      <div><strong>Fast:</strong> <code class="text-bd-green">"Action scene. Quick cuts. Short sentences."</code></div>
                      <div><strong>Slow:</strong> <code class="text-bd-green">"Quiet moment. Sensory details. Let the scene breathe."</code></div>
                      <div class="text-bd-text-muted mt-1">Update Author's Note when pace should change.</div>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Dialog vs. Description</h4>
                    <div class="space-y-1 text-xs text-bd-text-secondary">
                      <div><code class="text-bd-green">"Dialogue-heavy scene, let characters talk"</code></div>
                      <div><code class="text-bd-green">"Action and description, minimal dialogue"</code></div>
                      <div><code class="text-bd-green">"Balance dialogue with narrative prose"</code></div>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Content Focus</h4>
                    <div class="space-y-1 text-xs text-bd-text-secondary">
                      <div><strong>Include:</strong> <code class="text-bd-green">"Emphasize the character's internal thoughts"</code></div>
                      <div><strong>Avoid:</strong> <code class="text-bd-green">"Don't introduce new major characters without player prompting"</code></div>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Consistency</h4>
                    <div class="space-y-1 text-xs text-bd-text-secondary">
                      <div>• AI Instructions for <strong>permanent</strong> style rules</div>
                      <div>• Author's Note for <strong>current scene</strong> emphasis</div>
                      <div>• Story Cards for <strong>character-specific</strong> styles</div>
                      <div>• The AI also learns from your story's existing tone</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- AI Instructions vs Author's Note -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-blue" />
                  AI Instructions vs. Author's Note
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  These two components work together but serve different purposes. Use both for maximum control.
                </p>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-bd-border-subtle">
                        <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Aspect</th>
                        <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">AI Instructions</th>
                        <th class="text-left py-2 text-bd-text-primary font-semibold">Author's Note</th>
                      </tr>
                    </thead>
                    <tbody class="text-bd-text-secondary">
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Position</td>
                        <td class="py-2 pr-4">Beginning of context</td>
                        <td class="py-2">Near end of context</td>
                      </tr>
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Scope</td>
                        <td class="py-2 pr-4">Permanent rules</td>
                        <td class="py-2">Scene-specific guidance</td>
                      </tr>
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Purpose</td>
                        <td class="py-2 pr-4">Behavioral directives</td>
                        <td class="py-2">Tone/style for current scene</td>
                      </tr>
                      <tr>
                        <td class="py-2 pr-4 font-medium">Update Frequency</td>
                        <td class="py-2 pr-4">Rarely changed</td>
                        <td class="py-2">Updated as story progresses</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Quick Fixes -->
            <div class="space-y-4 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md">Quick Fixes</h3>
              <p class="text-xs text-bd-text-muted mb-3">Proven copy-paste fixes for common problems. Replace <strong>'Name'</strong> with your character. More in the <router-link to="/ai-instructions?tab=collection" class="text-bd-accent-primary hover:underline">Component Library</router-link>.</p>

              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Repetition & Echo</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Never echo, paraphrase, or restate the user's words, speech, or intentions</code></div>
                    <div><code class="text-bd-green">- NPCs should never repeat any content provided by the user</code></div>
                    <div><code class="text-bd-green">- Continue EXACTLY from where the story leaves off</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">AI Writing For You</h4>
                  <div class="space-y-1 text-xs">
                    <div><span class="text-bd-text-muted">Basic:</span> <code class="text-bd-green">- Only the user writes 'Name's speech and dialogue</code></div>
                    <div><span class="text-bd-text-muted">Extended:</span> <code class="text-bd-green">- Never decide or write speech or actions for 'Name'</code></div>
                    <div><span class="text-bd-text-muted">Total:</span> <code class="text-bd-green">- Never control 'Name' in action, thought, expression, reaction, or speech</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Pacing</h4>
                  <div class="space-y-1 text-xs">
                    <div><span class="text-bd-text-muted">Faster:</span> <code class="text-bd-green">- Prioritize plot and dialogue over description</code></div>
                    <div><span class="text-bd-text-muted">Slower:</span> <code class="text-bd-green">- Slow down the pace and let scenes play out naturally</code></div>
                    <div><span class="text-bd-text-muted">Moment by moment:</span> <code class="text-bd-green">- Allow the story to unfold moment by moment</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">NPC Behavior</h4>
                  <div class="space-y-1 text-xs">
                    <div><span class="text-bd-text-muted">Too agreeable:</span> <code class="text-bd-green">- NPCs act according to their own motivations, not player convenience</code></div>
                    <div><span class="text-bd-text-muted">Too aggressive:</span> <code class="text-bd-green">- NPCs avoid excessive aggression or doubt; ensure interactions are nuanced</code></div>
                    <div><span class="text-bd-text-muted">Too clumsy:</span> <code class="text-bd-green">- Characters are not clumsy, jumpy, or incompetent</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Plot Armor & Consequences</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Actions have meaningful consequences. Choices matter</code></div>
                    <div><code class="text-bd-green">- The world does not revolve around the main character</code></div>
                    <div><code class="text-bd-green">- Bad decisions lead to bad outcomes. The world doesn't protect the player</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Focus & Knowledge</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Focus on everyone in the scene</code></div>
                    <div><code class="text-bd-green">- Characters should only know what they logically have information on</code></div>
                    <div><code class="text-bd-green">- Characters are people in situations, not job titles performing functions</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Style & Prose</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Show, don't tell. Demonstrate through actions and dialogue</code></div>
                    <div><code class="text-bd-green">- Avoid simile, metaphor, and figurative comparisons</code></div>
                    <div><code class="text-bd-green">- Let the tone emerge from the scene. Focus on subtlety over explicitness</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Dialogue Quality</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Ensure characters act and speak like how their personality is defined</code></div>
                    <div><code class="text-bd-green">- Make every interaction sound genuine and fitting to the moment</code></div>
                    <div><code class="text-bd-green">- Avoid contradicting the user's speech with NPC responses</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">World Consistency</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Never contradict established lore or timeline</code></div>
                    <div><code class="text-bd-green">- Maintain internal consistency with established world rules</code></div>
                    <div><code class="text-bd-green">- Progress time in a realistic manner</code></div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Immersion Breaking</h4>
                  <div class="space-y-1 text-xs">
                    <div><code class="text-bd-green">- Stay in character and in the narrative at all times</code></div>
                    <div><code class="text-bd-green">- Never summarize, wrap up, or provide closure at the end of responses</code></div>
                    <div><code class="text-bd-green">- Don't insert moral lessons or author commentary</code></div>
                  </div>
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
            
            <!-- Context Position & Priority -->
            <div class="space-y-4">
              <h3 class="font-semibold text-bd-text-primary text-md border-b border-bd-border-subtle pb-2">Context Position &amp; Priority</h3>
              <p class="text-bd-text-secondary text-xs">
                Understanding where AI Instructions sit in the context, and how the AI's attention varies across it, helps you write more effective instructions.
              </p>

              <!-- Context Assembly Order -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-blue" />
                  Context Assembly Order
                </h4>
                <p class="text-[11px] text-bd-text-secondary mb-3">
                  The AI reads context from top to bottom. Here's what it sees, in order:
                </p>
                <div class="space-y-1.5 text-xs">
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple text-[10px] font-bold flex items-center justify-center">1</span>
                    <span class="text-bd-text-primary font-medium">AI Instructions</span>
                    <span class="text-bd-text-muted">: Behavioral rules (you are here)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-green/20 text-bd-green text-[10px] font-bold flex items-center justify-center">2</span>
                    <span class="text-bd-text-primary font-medium">Plot Essentials</span>
                    <span class="text-bd-text-muted">: Key story facts</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-amber/20 text-bd-amber text-[10px] font-bold flex items-center justify-center">3</span>
                    <span class="text-bd-text-primary font-medium">Story Cards</span>
                    <span class="text-bd-text-muted">: Triggered character/location info</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-teal/20 text-bd-teal text-[10px] font-bold flex items-center justify-center">4</span>
                    <span class="text-bd-text-primary font-medium">Story Summary</span>
                    <span class="text-bd-text-muted">: Running plot summary</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-cyan/20 text-bd-cyan text-[10px] font-bold flex items-center justify-center">5</span>
                    <span class="text-bd-text-primary font-medium">Memory Bank</span>
                    <span class="text-bd-text-muted">: Semantically retrieved memories</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-blue/20 text-bd-blue text-[10px] font-bold flex items-center justify-center">6</span>
                    <span class="text-bd-text-primary font-medium">History</span>
                    <span class="text-bd-text-muted">: Recent story actions</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-pink/20 text-bd-pink text-[10px] font-bold flex items-center justify-center">7</span>
                    <span class="text-bd-text-primary font-medium">Author's Note</span>
                    <span class="text-bd-text-muted">: Scene-specific guidance</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-amber/20 text-bd-amber text-[10px] font-bold flex items-center justify-center">8</span>
                    <span class="text-bd-text-primary font-medium">Last Action</span>
                    <span class="text-bd-text-muted">: Most recent player input</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-red/20 text-bd-red text-[10px] font-bold flex items-center justify-center">9</span>
                    <span class="text-bd-text-primary font-medium">Front Memory</span>
                    <span class="text-bd-text-muted">: Script-injected text (not UI accessible)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-bd-text-muted/20 text-bd-text-muted text-[10px] font-bold flex items-center justify-center">10</span>
                    <span class="text-bd-text-primary font-medium">Buffer Tokens</span>
                    <span class="text-bd-text-muted">: Reserved for AI response</span>
                  </div>
                </div>
              </div>

              <!-- Positional Influence -->
              <div class="grid md:grid-cols-3 gap-3">
                <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                  <h4 class="text-xs font-semibold text-bd-purple mb-2">Beginning (Positions 1–3)</h4>
                  <p class="text-xs text-bd-text-secondary">
                    Sets foundational rules and context. AI Instructions define behavior patterns, Plot Essentials establish key facts. Shapes overall approach.
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                  <h4 class="text-xs font-semibold text-bd-blue mb-2">Middle (Positions 4–6)</h4>
                  <p class="text-xs text-bd-text-secondary">
                    Provides narrative continuity. History shows story flow, memories fill in background. This is where the AI picks up the story thread.
                  </p>
                </div>
                <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                  <h4 class="text-xs font-semibold text-bd-pink mb-2">End (Positions 7–10)</h4>
                  <p class="text-xs text-bd-text-secondary">
                    <strong>Strongest immediate influence.</strong> Author's Note shapes tone, Last Action directly prompts response, Front Memory has max influence.
                  </p>
                </div>
              </div>

              <!-- 70/30 Split -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-amber" />
                  The 70/30 Allocation Split
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  Context is divided into two pools. AI Instructions belong to the <strong>Required Elements</strong> pool.
                </p>
                <div class="grid md:grid-cols-2 gap-3">
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h5 class="text-xs font-semibold text-bd-text-primary mb-2">Required Elements (up to 70%)</h5>
                    <ul class="text-xs text-bd-text-secondary space-y-1">
                      <li>• AI Instructions</li>
                      <li>• Plot Essentials</li>
                      <li>• Story Summary</li>
                      <li>• Author's Note</li>
                      <li>• Front Memory</li>
                      <li>• Last Action</li>
                    </ul>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-tertiary">
                    <h5 class="text-xs font-semibold text-bd-text-primary mb-2">Dynamic Elements (~30%)</h5>
                    <ul class="text-xs text-bd-text-secondary space-y-1">
                      <li>• Story Cards (~25% of pool)</li>
                      <li>• History (~50% of pool)</li>
                      <li>• Memory Bank (~25% of pool)</li>
                    </ul>
                    <p class="text-[10px] text-bd-text-muted mt-2">If Required Elements use less than 70%, Dynamic Elements get the extra space.</p>
                  </div>
                </div>
              </div>

              <!-- Trimming Priority -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Trimming Priority
                </h4>
                <p class="text-xs text-bd-text-secondary mb-3">
                  When context exceeds available space, elements are trimmed in priority order. AI Instructions are medium priority and can be trimmed if higher-priority elements take up too much space.
                </p>
                <div class="space-y-2 text-xs">
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-green/20 text-bd-green">ALWAYS FULL</span>
                    <span class="text-bd-text-secondary">Front Memory, Last Action</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-blue/20 text-bd-blue">HIGH PRIORITY</span>
                    <span class="text-bd-text-secondary">Author's Note, Plot Essentials</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber">MEDIUM</span>
                    <span class="text-bd-text-secondary">AI Instructions, Story Summary</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-text-muted/20 text-bd-text-muted">FLEXIBLE</span>
                    <span class="text-bd-text-secondary">Story Cards, History, Memory Bank</span>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-3">
                  <strong>Practical implication:</strong> Keep AI Instructions focused and concise. If they're too long, they'll eat into other content budgets or get trimmed themselves.
                </p>
              </div>
            </div>

            <!-- Genre Guides -->
            <div class="space-y-4 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md">Genre Guides &amp; Example Sets</h3>
              <p class="text-xs text-bd-text-muted mb-4">Complete instruction sets for different genres. Use as starting points and customize to fit your story.</p>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Swords class="w-4 h-4 text-bd-amber" />
                    Fantasy
                  </h4>
                  <div class="space-y-2">
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a dark fantasy author known for morally complex worlds where magic has costs and heroes make difficult choices.
- Actions have lasting consequences
- Death is permanent and can happen to anyone
- Ground fantastic elements in internal logic</div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="tag bg-bd-amber/10 text-bd-amber">Also try: Epic Fantasy</span>
                      <span class="tag bg-bd-amber/10 text-bd-amber">Urban Fantasy</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-red/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Skull class="w-4 h-4 text-bd-red" />
                    Horror
                  </h4>
                  <div class="space-y-2">
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a horror author known for psychological terror that creeps under the skin and lingers in the mind.
- Build dread through atmosphere, implication, and the unknown
- What's unseen is often scarier than what's shown
- Characters make believable mistakes under fear</div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="tag bg-bd-red/10 text-bd-red">Also try: Brutal Horror</span>
                      <span class="tag bg-bd-red/10 text-bd-red">Cosmic Horror</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-rose/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Heart class="w-4 h-4 text-bd-rose" />
                    Romance
                  </h4>
                  <div class="space-y-2">
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a romance author known for slow-burn stories where feelings develop gradually through meaningful interactions.
- Build chemistry through dialogue and small gestures
- Show vulnerability and emotional growth
- Let tension build naturally, don't rush pivotal moments</div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="tag bg-bd-rose/10 text-bd-rose">Also try: Passionate</span>
                      <span class="tag bg-bd-rose/10 text-bd-rose">Character-Driven</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Target class="w-4 h-4 text-bd-blue" />
                    Mystery / Thriller
                  </h4>
                  <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a thriller author known for pulse-pounding narratives.
- Plant clues and red herrings throughout the story
- NPCs may lie, withhold information, or have their own agendas
- Information is hidden and must be actively sought
- The solution should be discoverable through investigation</div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-indigo/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Rocket class="w-4 h-4 text-bd-indigo" />
                    Sci-Fi
                  </h4>
                  <div class="space-y-2">
                    <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a hard science fiction author who grounds speculative elements in plausible science and explores their logical consequences.
- Technology has rules and limitations, not magic
- Space is vast, dangerous, and indifferent
- Political and corporate intrigue drives conflict</div>
                    <div class="flex flex-wrap gap-1 text-[10px]">
                      <span class="tag bg-bd-indigo/10 text-bd-indigo">Also try: Space Opera</span>
                      <span class="tag bg-bd-indigo/10 text-bd-indigo">Cyberpunk</span>
                    </div>
                  </div>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
                  <h4 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                    <Swords class="w-4 h-4 text-bd-cyan" />
                    Combat Focused
                  </h4>
                  <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">Combat:
- Write action scenes with visceral, dynamic descriptions
- Injuries affect performance realistically
- Environment can be used strategically
- No guaranteed victories; retreat or surrender are valid options</div>
                </div>
              </div>
            </div>

            <!-- Testing & Debugging -->
            <div class="space-y-4 pt-4 border-t border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-md">Testing &amp; Debugging</h3>
              <p class="text-bd-text-secondary text-xs">
                Writing instructions is only half the battle; you need to <strong>verify they're working</strong>. AI Dungeon provides built-in tools to inspect what the AI actually sees.
              </p>

              <!-- Built-in Tools -->
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-teal/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Eye class="w-4 h-4 text-bd-teal" />
                    View Context
                  </h4>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    <strong>Click any AI output → View Context</strong> to see exactly what was sent to the model, including your AI Instructions, triggered Story Cards, and how much of the history fit.
                  </p>
                  <p class="text-[10px] text-bd-text-muted">Shows token counts for each section so you can spot bloat.</p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-blue/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                    <Info class="w-4 h-4 text-bd-blue" />
                    Inspect Input
                  </h4>
                  <p class="text-xs text-bd-text-secondary mb-2">
                    <strong>Settings → Testing & Feedback → Inspect Input</strong> shows a popup of the last text block sent to the AI, including Memory, Author's Note, and triggered Story Cards.
                  </p>
                  <p class="text-[10px] text-bd-text-muted">Quick way to verify your changes are taking effect.</p>
                </div>
              </div>

              <!-- Debugging Workflow -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                  <Wrench class="w-4 h-4 text-bd-purple" />
                  Debugging Workflow
                </h4>
                <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
                  <li><strong>Identify the problem</strong>: What specifically is the AI doing wrong? (e.g., "AI keeps writing dialogue for my character")</li>
                  <li><strong>Check View Context</strong>: Are your instructions actually present? Were they trimmed due to token limits?</li>
                  <li><strong>Add ONE instruction</strong>: Write a clear, specific rule to fix the issue</li>
                  <li><strong>Test with 3-5 actions</strong>: Give the AI enough chances to show whether the instruction works</li>
                  <li><strong>Refine or remove</strong>: If it works, keep it. If not, reword it more directly or try a different approach</li>
                </ol>
              </div>

              <!-- Common Debugging Tips -->
              <div class="grid md:grid-cols-2 gap-3">
                <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
                  <h5 class="text-xs font-semibold text-bd-green mb-2">Instruction Not Working?</h5>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Check it's not contradicted by another instruction</li>
                    <li>• Move it to the beginning or end (higher attention)</li>
                    <li>• Rephrase as a positive ("Do X" instead of "Don't Y")</li>
                    <li>• Verify it wasn't trimmed via View Context</li>
                  </ul>
                </div>
                <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                  <h5 class="text-xs font-semibold text-bd-amber mb-2">AI Ignoring Story Details?</h5>
                  <ul class="text-xs text-bd-text-secondary space-y-1">
                    <li>• Check if Story Card triggers are being mentioned</li>
                    <li>• Verify card text isn't too long (wastes token budget)</li>
                    <li>• Use View Context to confirm the card was injected</li>
                    <li>• Consider moving critical info to Plot Essentials</li>
                  </ul>
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
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Avoid these common mistakes to keep your AI Instructions highly effective and token-efficient.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Too Many Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">Adding 50 lines hoping something sticks. The AI gets confused, and you don't know what's working.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Start with 3-5 lines. Add one at a time.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Contradicting Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">"Be concise" + "Write detailed descriptions" = AI doesn't know what to do.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Pick one style. Be specific about when to apply each.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Vague Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">"Write better" or "Be more interesting" - the AI doesn't know what that means.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Be specific. "Use varied sentence lengths" or "Include sensory details."</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> No Role Assignment
                </h4>
                <p class="text-xs text-bd-text-secondary">Jumping straight to rules without telling the AI WHO it should be.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Start with "You are a [role]..." - it sets the foundation.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Negative-Only Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">"Don't do X, don't do Y, never do Z" - tells the AI what NOT to do, but not what TO do.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Balance negatives with positives. "Instead of X, do Y."</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Copying Without Understanding
                </h4>
                <p class="text-xs text-bd-text-secondary">Pasting someone's entire instruction set without knowing what each line does.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Read each instruction. Only add what solves YOUR problems.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Forgetting the Defaults Are Gone
                </h4>
                <p class="text-xs text-bd-text-secondary">Custom instructions replace the defaults entirely. If you don't include basics like > token handling or "avoid repetition," the AI loses those rules.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Read the <strong>Default Instructions Breakdown</strong>. Include basics in your own set.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Putting Facts in Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">Mixing character details, world facts, and lore into AI Instructions. Instructions are for behavior rules, not data.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Put facts in Plot Essentials or Story Cards. Keep AI Instructions focused on <em>how</em> the AI should write.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Using Banned Words Instead of Instructions
                </h4>
                <p class="text-xs text-bd-text-secondary">Banned Words has been deprecated. Keyword blocking was less effective than behavioral guidance and didn't work well across different AI models.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use AI Instructions instead. "Never use the word 'suddenly'" is more effective than keyword blocking.</p>
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
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who created AI Instructions, repositories, guides, or other resources:
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
                <BookOpen class="w-3 h-3" /> Official Guide
              </a>
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
              </a>
              <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="btn btn-secondary text-xs">
                <Coins class="w-3 h-3" /> Tokenizer
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
  Drama, MessageSquare, Skull, ExternalLink,
  AlertTriangle, Plus, Coins, Cpu,
  X, Heart, ChevronDown, ChevronUp, Eye
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is AI Instructions?' },
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
