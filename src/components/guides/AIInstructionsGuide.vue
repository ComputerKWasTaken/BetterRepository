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

  <!-- ===================== QUICK START SECTION ===================== -->
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

  <!-- ===================== WHAT ARE AI INSTRUCTIONS ===================== -->
  <section id="guide-what-are-instructions" class="card">
    <button 
      @click="toggleGuideSection('what-are-instructions')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-amber" />
        What Are AI Instructions?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-are-instructions') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('what-are-instructions')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Instructions (<strong>AIN</strong>) are rules that shape how the AI writes: style, pacing, behavior, and focus. 
          <strong>Pick specific lines</strong> that solve your problems; don't copy everything at once.
        </p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-bd-amber" />
              What They Do
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• Enforce writing styles</li>
              <li>• Control pacing & focus</li>
              <li>• Set world rules & NPC behavior</li>
              <li>• Break 4th wall if desired</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Info class="w-4 h-4 text-bd-blue" />
              Defaults
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Each model has Latitude's default instructions. View them: <strong>Click output → View Context → AI Instructions</strong>
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Plus class="w-4 h-4 text-bd-green" />
              How to Add
            </h3>
            <p class="text-xs text-bd-text-secondary">
              <strong>Sidebar → Plot → Add Plot Component → AI Instructions</strong>
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTEXT & PLACEMENT ===================== -->
  <section id="guide-context-placement" class="card">
    <button 
      @click="toggleGuideSection('context-placement')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-cyan" />
        Where AI Instructions Sit in Context
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-placement') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-placement')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Instructions occupy <strong>position #1</strong> in the context — the very first thing the AI reads. This makes them ideal for 
          persistent, global rules that frame every response. For scene-specific nudges, use <strong>Author's Note</strong> (position #7, near the end where attention is also high).
        </p>

        <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Rule of Thumb</h4>
          <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
            <div>• <strong>"Always do this"</strong> → AI Instructions</div>
            <div>• <strong>"Right now, do this"</strong> → Author's Note</div>
            <div>• <strong>"Always remember this fact"</strong> → Plot Essentials</div>
            <div>• <strong>"Remember this when relevant"</strong> → Story Cards</div>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-3">
            <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-sm text-bd-text-secondary">
              For a full breakdown of context assembly order, token budgets, and how all plot components interact, see the 
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">Plot Components Guide</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== STRUCTURING SECTION ===================== -->
  <section id="guide-structuring" class="card">
    <button 
      @click="toggleGuideSection('structuring')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <FileText class="w-5 h-5 text-bd-blue" />
        Structuring Your Instruction Set
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('structuring') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('structuring')" class="mt-4">
    <p class="text-xs text-bd-text-muted mb-4">
      Good structure helps both you and the AI understand what's expected. Follow this order for best results.
    </p>
    <div class="space-y-4">
      <!-- Step 1: Define the AI's Role -->
      <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
        <h3 class="font-semibold text-bd-text-primary mb-2">1. Define the AI's Persona</h3>
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
        <h3 class="font-semibold text-bd-text-primary mb-2">2. Core Writing Rules</h3>
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
        <h3 class="font-semibold text-bd-text-primary mb-2">3. Topic-Specific Rules</h3>
        <p class="text-xs text-bd-text-secondary mb-2">Group related components by topic. This helps the AI understand context and apply rules appropriately.</p>
        <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs">
          <div class="text-bd-amber">Dialogue:</div>
          <div class="text-bd-green">- Write natural, character-appropriate dialogue</div>
          <div class="text-bd-green">- Each character has a distinct voice</div>
          <div class="text-bd-amber mt-2">Combat:</div>
          <div class="text-bd-green">- Describe fights with tactical detail</div>
          <div class="text-bd-green">- Injuries affect character performance</div>
          <div class="text-bd-amber mt-2">NPCs:</div>
          <div class="text-bd-green">- NPCs have their own goals and motivations</div>
          <div class="text-bd-green">- NPCs react realistically to player actions</div>
        </div>
      </div>

      <!-- Short vs Long Sets -->
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Zap class="w-4 h-4 text-bd-green" />
            Short Sets
          </h3>
          <p class="text-xs text-bd-text-secondary mb-2">Best for specific themes (horror, comedy). Each line starts with "-". Keep it under 10-15 components.</p>
          <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
            <div class="text-bd-green">- Be descriptive and creative</div>
            <div class="text-bd-green">- Avoid repetition</div>
            <div class="text-bd-green">- Never write for the player</div>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Layers class="w-4 h-4 text-bd-purple" />
            Long Sets
          </h3>
          <p class="text-xs text-bd-text-secondary mb-2">For complex scenarios. Group related components under labeled sections for clarity.</p>
          <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
            <div class="text-bd-amber">Dialogue:</div>
            <div class="text-bd-green">- Write natural dialogue</div>
            <div class="text-bd-amber mt-1">Combat:</div>
            <div class="text-bd-green">- Let injuries have consequences</div>
          </div>
        </div>
      </div>

      <!-- Information Flow Tip -->
      <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
        <div class="flex items-start gap-3">
          <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-bd-text-primary mb-1">Information Flow Matters</h3>
            <p class="text-sm text-bd-text-secondary">
              The AI weighs instructions at the <strong>beginning and end</strong> more heavily. Put your most important rules first, 
              and use the end for reinforcement. Topic sections in the middle help organize without losing impact.
            </p>
          </div>
        </div>
      </div>
    </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== COMMON MISTAKES SECTION ===================== -->
  <section id="guide-common-mistakes" class="card">
    <button 
      @click="toggleGuideSection('common-mistakes')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <AlertTriangle class="w-5 h-5 text-bd-pink" />
        Common Mistakes
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('common-mistakes') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('common-mistakes')" class="mt-4 space-y-3">
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
              <X class="w-3 h-3" /> Ignoring Default Instructions
            </h4>
            <p class="text-xs text-bd-text-secondary">Each model has Latitude's built-in instructions. Your instructions stack on top — they can conflict with or duplicate the defaults.</p>
            <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use <strong>View Context</strong> to see the full AI Instructions block including defaults, then write yours to complement, not repeat.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
              <X class="w-3 h-3" /> Putting Facts in Instructions
            </h4>
            <p class="text-xs text-bd-text-secondary">Mixing character details, world facts, and lore into AI Instructions. Instructions are for <em>behavior rules</em>, not data.</p>
            <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Put facts in Plot Essentials or Story Cards. Keep AI Instructions focused on <em>how</em> the AI should write, not <em>what</em> to write about.</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== QUICK FIXES SECTION ===================== -->
  <section id="guide-quick-fixes" class="card">
    <button 
      @click="toggleGuideSection('quick-fixes')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Wrench class="w-5 h-5 text-bd-purple" />
        Quick Fixes
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-fixes') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('quick-fixes')" class="mt-4">
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• <strong>Use commands:</strong> Make, Avoid, Write, Be, Remember</li>
              <li>• <strong>One idea per line</strong>, keep instructions short</li>
              <li>• <strong>Use brackets</strong> <code class="text-bd-amber">[ ]</code> <code class="text-bd-amber">{ }</code> to group related info</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Scope</h4>
            <p class="text-xs text-bd-text-secondary">
              AIN = global rules (whole story). For scene-specific tweaks, use 
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline">Author's Note</router-link>.
            </p>
          </div>
        </div>

        <p class="text-xs text-bd-text-muted mb-3">Proven fixes from the <router-link to="/ai-instructions?tab=collection" class="text-bd-accent-primary hover:underline">Component Library</router-link>. Replace 'Name' with your character.</p>

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
    </Transition>
  </section>

  <!-- ===================== TESTING & DEBUGGING SECTION ===================== -->
  <section id="guide-testing" class="card">
    <button 
      @click="toggleGuideSection('testing')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Eye class="w-5 h-5 text-bd-teal" />
        Testing & Debugging
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('testing') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('testing')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Writing instructions is only half the battle — you need to <strong>verify they're working</strong>. AI Dungeon provides built-in tools to inspect what the AI actually sees.
        </p>

        <!-- Built-in Tools -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-teal/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Eye class="w-4 h-4 text-bd-teal" />
              View Context
            </h3>
            <p class="text-xs text-bd-text-secondary mb-2">
              <strong>Click any AI output → View Context</strong> to see exactly what was sent to the model, including your AI Instructions, triggered Story Cards, and how much of the history fit.
            </p>
            <p class="text-xs text-bd-text-muted">Shows token counts for each section so you can spot bloat.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Info class="w-4 h-4 text-bd-blue" />
              Inspect Input
            </h3>
            <p class="text-xs text-bd-text-secondary mb-2">
              <strong>Settings → Testing & Feedback → Inspect Input</strong> shows a popup of the last text block sent to the AI, including Memory, Author's Note, and triggered Story Cards.
            </p>
            <p class="text-xs text-bd-text-muted">Quick way to verify your changes are taking effect.</p>
          </div>
        </div>

        <!-- Debugging Workflow -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Wrench class="w-4 h-4 text-bd-purple" />
            Debugging Workflow
          </h3>
          <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
            <li><strong>Identify the problem</strong> — What specifically is the AI doing wrong? (e.g., "AI keeps writing dialogue for my character")</li>
            <li><strong>Check View Context</strong> — Are your instructions actually present? Were they trimmed due to token limits?</li>
            <li><strong>Add ONE instruction</strong> — Write a clear, specific rule to fix the issue</li>
            <li><strong>Test with 3-5 actions</strong> — Give the AI enough chances to show whether the instruction works</li>
            <li><strong>Refine or remove</strong> — If it works, keep it. If not, reword it more directly or try a different approach</li>
          </ol>
        </div>

        <!-- Common Debugging Tips -->
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2">Instruction Not Working?</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• Check it's not contradicted by another instruction</li>
              <li>• Move it to the beginning or end (higher attention)</li>
              <li>• Rephrase as a positive ("Do X" instead of "Don't Y")</li>
              <li>• Verify it wasn't trimmed via View Context</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h4 class="text-xs font-semibold text-bd-amber mb-2">AI Ignoring Story Details?</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• Check if Story Card triggers are being mentioned</li>
              <li>• Verify card text isn't too long (wastes token budget)</li>
              <li>• Use View Context to confirm the card was injected</li>
              <li>• Consider moving critical info to Plot Essentials</li>
            </ul>
          </div>
        </div>

        <!-- Raw Model Output tip -->
        <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Pro tip:</strong> Enable <strong>Raw Model Output</strong> in Settings → Testing & Feedback to see unprocessed AI responses. 
              This reveals if the AI is generating content that's being cut off by the interface's punctuation trimming.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== GENRE GUIDES SECTION ===================== -->
  <section id="guide-genre-guides" class="card">
    <button 
      @click="toggleGuideSection('genre-guides')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Drama class="w-5 h-5 text-bd-amber" />
        Genre Guides & Example Sets
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('genre-guides') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('genre-guides')" class="mt-4">
        <p class="text-xs text-bd-text-muted mb-4">Complete instruction sets for different genres. Use as starting points and customize to fit your story.</p>
        
        <div class="grid md:grid-cols-2 gap-4">
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Swords class="w-4 h-4 text-bd-amber" />
          Fantasy
        </h3>
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
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Skull class="w-4 h-4 text-bd-red" />
          Horror
        </h3>
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
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Heart class="w-4 h-4 text-bd-rose" />
          Romance
        </h3>
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
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Target class="w-4 h-4 text-bd-blue" />
          Mystery / Thriller
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a thriller author known for pulse-pounding narratives.
- Plant clues and red herrings throughout the story
- NPCs may lie, withhold information, or have their own agendas
- Information is hidden and must be actively sought
- The solution should be discoverable through investigation</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-indigo/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Rocket class="w-4 h-4 text-bd-indigo" />
          Sci-Fi
        </h3>
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
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Swords class="w-4 h-4 text-bd-cyan" />
          Combat Focused
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">Combat:
- Write action scenes with visceral, dynamic descriptions
- Injuries affect performance realistically
- Environment can be used strategically
- No guaranteed victories; retreat or surrender are valid options</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Lightbulb class="w-4 h-4 text-bd-green" />
          Cozy Adventure
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a wholesome storyteller writing cozy adventures.
- Focus on friendships and small victories
- Conflicts resolve through understanding
- Maintain an optimistic tone even in challenges
- Encourage small talk between characters</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <MessageSquare class="w-4 h-4 text-bd-purple" />
          Snarky Narrator
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a snarky narrator who observes events with dry wit and sardonic commentary, never missing a chance for a clever observation.
- Be sarcastic and over-the-top
- Point out when player does something stupid
- Use melodrama: "little did she know..."</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Skull class="w-4 h-4 text-bd-pink" />
          Ruthless DM
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a ruthless Dungeon Master who enforces consequences and doesn't pull punches.
- The world is lethal and dangerous
- Actions fail unless no sensible way to fail
- NPCs are proactive, competent, and dangerous
- Resolve no-win situations with realistic consequences</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-teal/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <FileText class="w-4 h-4 text-bd-teal" />
          Literary Fiction
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a literary fiction author known for nuanced character studies, evocative prose, and stories that linger in the reader's mind.
- Embrace bittersweet moments: joy tinged with sadness
- Understate emotions rather than over-dramatizing
- Use subtext in dialogue: characters don't always say what they mean</div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

  <!-- ===================== TOKEN TIPS SECTION ===================== -->
  <section id="guide-token-tips" class="card">
    <button 
      @click="toggleGuideSection('token-tips')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Coins class="w-5 h-5 text-bd-amber" />
        Token Tips
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('token-tips') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('token-tips')" class="mt-4 space-y-3">
        <p class="text-bd-text-secondary">
          Every word in your instructions costs tokens — context space that could hold story instead. Write direct, actionable lines.
        </p>
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-tertiary">
            <div class="text-[10px] text-bd-pink font-semibold mb-1 uppercase">Wordy</div>
            <code class="text-[10px] text-bd-text-secondary">Please try to avoid using any metaphors, similes, or other flowery figurative comparisons in your prose.</code>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-green/20">
            <div class="text-[10px] text-bd-green font-semibold mb-1 uppercase">Direct</div>
            <code class="text-[10px] text-bd-text-secondary">Avoid similes, metaphors, or figurative comparisons.</code>
          </div>
        </div>
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <ul class="text-xs text-bd-text-secondary space-y-1">
            <li>• Use <strong>command words</strong>: Make, Avoid, Write, Be, Remember</li>
            <li>• <strong>One idea per line</strong> — short, specific, actionable</li>
            <li>• Use a <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline">tokenizer tool</a> to check your token count</li>
          </ul>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CREDITS SECTION ===================== -->
  <section id="guide-credits" class="card">
    <button 
      @click="toggleGuideSection('credits')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Info class="w-5 h-5 text-bd-amber" />
        Credits & Resources
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
        <div class="mb-4">
      <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
        Contributors who created AI Instructions, or created repositories, guides, or other resources:
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
  AlertTriangle, Plus, Coins,
  X, Heart, ChevronDown, ChevronUp, Eye
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'what-are-instructions', label: 'What Are AI Instructions?' },
  { id: 'context-placement', label: 'Context Placement' },
  { id: 'structuring', label: 'Structuring Your Set' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'quick-fixes', label: 'Quick Fixes' },
  { id: 'testing', label: 'Testing & Debugging' },
  { id: 'genre-guides', label: 'Genre Guides' },
  { id: 'token-tips', label: 'Token Tips' },
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
  expandedGuideSections.value = new Set(guideSections.map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
