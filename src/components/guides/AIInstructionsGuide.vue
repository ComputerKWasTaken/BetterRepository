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

  <!-- ===================== CONTEXT ARCHITECTURE SECTION ===================== -->
  <section id="guide-context-architecture" class="card">
    <button 
      @click="toggleGuideSection('context-architecture')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-cyan" />
        Context Architecture
        <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Important</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-architecture') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-architecture')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Understanding how your AI Instructions fit into the bigger picture is key to writing effective ones.
          The AI doesn't just see your instructions — it sees a carefully assembled <strong>context</strong> built from many sources.
        </p>

        <!-- Context Order -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-cyan/30">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <ListOrdered class="w-4 h-4 text-bd-cyan" />
            Full Context Assembly Order
          </h3>
          <p class="text-xs text-bd-text-muted mb-3">This is the exact order the AI receives information, from first to last:</p>
          <ol class="space-y-2 text-sm">
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber font-bold flex items-center justify-center text-xs">1</span>
              <div><strong class="text-bd-amber">AI Instructions</strong> <span class="text-bd-text-muted">— Your rules and persona (this guide)</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center text-xs">2</span>
              <div><strong class="text-bd-green">Plot Essentials</strong> <span class="text-bd-text-muted">— Key facts the AI should always know</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center text-xs">3</span>
              <div><strong class="text-bd-purple">Story Cards</strong> <span class="text-bd-text-muted">— Triggered by keywords in recent actions</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center text-xs">4</span>
              <div><strong class="text-bd-blue">Story Summary</strong> <span class="text-bd-text-muted">— Auto-generated plot recap</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal font-bold flex items-center justify-center text-xs">5</span>
              <div><strong class="text-bd-teal">Memory Bank</strong> <span class="text-bd-text-muted">— Relevant memories ranked by recency</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-text-muted/20 text-bd-text-secondary font-bold flex items-center justify-center text-xs">6</span>
              <div><strong class="text-bd-text-primary">History</strong> <span class="text-bd-text-muted">— Recent story actions (most recent last)</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-pink/20 text-bd-pink font-bold flex items-center justify-center text-xs">7</span>
              <div><strong class="text-bd-pink">Author's Note</strong> <span class="text-bd-text-muted">— Style/tone guidance (near end = high influence)</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-orange/20 text-bd-orange font-bold flex items-center justify-center text-xs">8</span>
              <div><strong class="text-bd-orange">Last Action</strong> <span class="text-bd-text-muted">— The most recent player input</span></div>
            </li>
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-red/20 text-bd-red font-bold flex items-center justify-center text-xs">9</span>
              <div><strong class="text-bd-red">Front Memory</strong> <span class="text-bd-text-muted">— Highest priority, always included in full</span></div>
            </li>
          </ol>
        </div>

        <!-- Token Budget -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Shield class="w-4 h-4 text-bd-amber" />
              Required Elements
            </h3>
            <p class="text-xs text-bd-text-secondary mb-2">Always included (up to <strong>70%</strong> of context):</p>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• AI Instructions, Plot Essentials, Story Summary</li>
              <li>• Front Memory, Author's Note, Last Action</li>
            </ul>
            <p class="text-xs text-bd-text-muted mt-2">
              If required elements exceed 70%, they're trimmed by priority: <strong>Front Memory → Last Action → Author's Note → Plot Essentials → AI Instructions → Story Summary</strong> (highest first).
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Zap class="w-4 h-4 text-bd-purple" />
              Dynamic Elements
            </h3>
            <p class="text-xs text-bd-text-secondary mb-2">Fill the remaining <strong>30%+</strong> of context:</p>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• <strong>~25%</strong> — Story Cards (keyword-triggered)</li>
              <li>• <strong>~50%</strong> — History (up to 75% if Memory Bank off)</li>
              <li>• <strong>~25%</strong> — Memory Bank (relevance-ranked)</li>
            </ul>
          </div>
        </div>

        <!-- Key Insight -->
        <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-3">
            <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
            <div>
              <h3 class="font-semibold text-bd-text-primary mb-1">Why This Matters for AI Instructions</h3>
              <p class="text-sm text-bd-text-secondary">
                Your AI Instructions sit at position <strong>#1</strong> — the very beginning of context. This means they set the 
                "frame" for everything that follows. However, LLMs also pay strong attention to what's <strong>near the end</strong> of context 
                (Author's Note, Last Action, Front Memory). Use AI Instructions for <em>persistent rules</em> and Author's Note for 
                <em>immediate style nudges</em> to get the best of both positions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== COMPONENT COMPARISON SECTION ===================== -->
  <section id="guide-component-comparison" class="card">
    <button 
      @click="toggleGuideSection('component-comparison')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Scale class="w-5 h-5 text-bd-green" />
        AI Instructions vs Other Components
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('component-comparison') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('component-comparison')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon has multiple tools for guiding the AI. Knowing <strong>which tool to use when</strong> prevents overlap and saves tokens.
        </p>

        <div class="grid gap-3">
          <!-- AI Instructions -->
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <div class="flex items-start gap-3">
              <ScrollText class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">AI Instructions <span class="text-xs text-bd-text-muted font-normal">(Position #1 — start of context)</span></h3>
                <p class="text-xs text-bd-text-secondary mb-2">Persistent, global rules that apply to every single AI response. The AI's "operating manual."</p>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="tag bg-bd-amber/20 text-bd-amber">Writing style</span>
                  <span class="tag bg-bd-amber/20 text-bd-amber">AI persona</span>
                  <span class="tag bg-bd-amber/20 text-bd-amber">Universal rules</span>
                  <span class="tag bg-bd-amber/20 text-bd-amber">Genre tone</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Author's Note -->
          <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <div class="flex items-start gap-3">
              <PenTool class="w-5 h-5 text-bd-pink flex-shrink-0 mt-0.5" />
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Author's Note <span class="text-xs text-bd-text-muted font-normal">(Position #7 — near end, strongest immediate influence)</span></h3>
                <p class="text-xs text-bd-text-secondary mb-2">Short, high-impact nudges placed near the end of context. Keep it brief — overloading it is counterproductive.</p>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="tag bg-bd-pink/20 text-bd-pink">Current mood</span>
                  <span class="tag bg-bd-pink/20 text-bd-pink">Scene tone</span>
                  <span class="tag bg-bd-pink/20 text-bd-pink">Temporary style shifts</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Plot Essentials -->
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <div class="flex items-start gap-3">
              <FileText class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Plot Essentials <span class="text-xs text-bd-text-muted font-normal">(Position #2 — always included)</span></h3>
                <p class="text-xs text-bd-text-secondary mb-2">Key facts the AI should always know. Character details, world state, active goals. Keep it dense and factual — the AI will reference anything you put here.</p>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="tag bg-bd-green/20 text-bd-green">Character info</span>
                  <span class="tag bg-bd-green/20 text-bd-green">World state</span>
                  <span class="tag bg-bd-green/20 text-bd-green">Active goals</span>
                  <span class="tag bg-bd-green/20 text-bd-green">Key relationships</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Story Cards -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <div class="flex items-start gap-3">
              <Layers class="w-5 h-5 text-bd-purple flex-shrink-0 mt-0.5" />
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Story Cards <span class="text-xs text-bd-text-muted font-normal">(Position #3 — keyword-triggered)</span></h3>
                <p class="text-xs text-bd-text-secondary mb-2">Only injected when their trigger keywords appear in recent actions. Perfect for situational lore that doesn't need to be in context 24/7.</p>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="tag bg-bd-purple/20 text-bd-purple">NPC details</span>
                  <span class="tag bg-bd-purple/20 text-bd-purple">Location lore</span>
                  <span class="tag bg-bd-purple/20 text-bd-purple">Item descriptions</span>
                  <span class="tag bg-bd-purple/20 text-bd-purple">Event recaps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rule of Thumb -->
        <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Rule of Thumb</h4>
          <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
            <div>• <strong>"Always do this"</strong> → AI Instructions</div>
            <div>• <strong>"Right now, do this"</strong> → Author's Note</div>
            <div>• <strong>"Always remember this fact"</strong> → Plot Essentials</div>
            <div>• <strong>"Remember this when relevant"</strong> → Story Cards</div>
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
            <div class="text-bd-accent-light mb-1">// Advanced patterns:</div>
            <div class="text-bd-green">"The player would like you to pick up a varying novel..."</div>
            <div class="text-bd-text-muted mt-1 italic text-[10px]">Also works with "talented novelist" or "expert author". This role assignment encourages the AI to treat the session as a professional book project.</div>
            <div class="text-bd-green mt-2">"Enable thinking mode..."</div>
            <div class="text-bd-text-muted mt-1 italic text-[10px]">While AI Dungeon doesn't natively support Thinking Mode, this "gaslights" the model into a more analytical state. It works on most models, but has the strongest impact on DeepSeek.</div>
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

        <p class="text-xs text-bd-text-muted mb-3">Click any fix to find related instructions. Replace 'Name' with your character.</p>

        <div class="grid md:grid-cols-2 gap-3">
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Pacing</h4>
        <div class="space-y-1 text-xs">
          <div><span class="text-bd-text-muted">Faster:</span> <code class="text-bd-green">- Keep scenes moving</code></div>
          <div><span class="text-bd-text-muted">Slower:</span> <code class="text-bd-green">- Let scenes play out</code></div>
          <div><span class="text-bd-text-muted">Balanced:</span> <code class="text-bd-green">- Balance action with atmosphere</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">AI Writing For You</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Write ensuring 'Name' can write own dialogue</code></div>
          <div><code class="text-bd-green">- Never assume 'Name's thoughts or actions</code></div>
          <div><code class="text-bd-green">- Stop before 'Name' would need to respond</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Repetition</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Continue where story left off</code></div>
          <div><code class="text-bd-green">- Avoid repeating recent phrases</code></div>
          <div><code class="text-bd-green">- Vary sentence structure and vocabulary</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Plot Armor & Consequences</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Let 'Name' take injuries</code></div>
          <div><code class="text-bd-green">- Actions have realistic consequences</code></div>
          <div><code class="text-bd-green">- Bad decisions lead to bad outcomes</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Focus Issues</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Focus on everyone in scenes</code></div>
          <div><code class="text-bd-green">- Assume strangers & ignorance</code></div>
          <div><code class="text-bd-green">- NPCs have their own goals and concerns</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Style & Prose</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Write pure prose without symbols</code></div>
          <div><code class="text-bd-green">- Prioritize plot and dialogue over description</code></div>
          <div><code class="text-bd-green">- Show dont tell through character actions</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Dialogue Quality</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Write natural flowing dialogue</code></div>
          <div><code class="text-bd-green">- Give each character a distinct voice</code></div>
          <div><code class="text-bd-green">- Avoid exposition dumps in dialogue</code></div>
        </div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h4 class="text-xs font-semibold text-bd-text-primary mb-2">World Consistency</h4>
        <div class="space-y-1 text-xs">
          <div><code class="text-bd-green">- Maintain established facts about the world</code></div>
          <div><code class="text-bd-green">- Time passes naturally between scenes</code></div>
          <div><code class="text-bd-green">- Remember character locations and states</code></div>
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
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <MessageSquare class="w-4 h-4 text-bd-purple" />
          Snarky Narrator
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are an all-seeing narrator who breaks the 4th wall like Deadpool.
- Be sarcastic and over-the-top
- Point out when player does something stupid
- Use melodrama: "little did she know..."</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Skull class="w-4 h-4 text-bd-pink" />
          Evil DM
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are an evil DM.
- Follow Murphy's Law
- Actions fail unless no sensible way to fail
- Introduce plot twists when things go well</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Swords class="w-4 h-4 text-bd-amber" />
          Dark Fantasy
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a dark fantasy author inspired by George R.R. Martin.
- The world is morally grey, no pure heroes or villains
- Actions have lasting consequences
- Death is permanent and can happen to anyone
- Magic is rare and comes with a cost</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Lightbulb class="w-4 h-4 text-bd-green" />
          Cozy Adventure
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a wholesome storyteller writing cozy adventures.
- Focus on friendships and small victories
- Conflicts resolve through understanding
- Describe comforting details like warm meals and safe havens
- Maintain an optimistic tone even in challenges</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Target class="w-4 h-4 text-bd-blue" />
          Mystery Thriller
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a mystery thriller author.
- Plant clues and red herrings throughout the story
- Build suspense through pacing and atmosphere
- Characters have secrets and hidden motives
- Revelations should feel earned and logical</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Swords class="w-4 h-4 text-bd-cyan" />
          Combat Focused
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">Combat:
- Describe fights with tactical detail
- Injuries affect performance realistically
- Environment can be used strategically
- Opponents fight intelligently based on their abilities</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-indigo/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Rocket class="w-4 h-4 text-bd-indigo" />
          Sci-Fi
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a hard sci-fi author inspired by Asimov and Clarke.
- Technology has rules and limitations, not magic
- Explore the human impact of advanced technology
- Space is vast, dangerous, and indifferent
- Political and corporate intrigue drives conflict</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-red/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Skull class="w-4 h-4 text-bd-red" />
          Horror
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a horror author inspired by Stephen King and Lovecraft.
- Build dread through atmosphere, not jump scares
- The unknown is scarier than the revealed
- Normalcy makes horror hit harder by contrast
- Characters make believable mistakes under fear</div>
      </div>
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-rose/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Heart class="w-4 h-4 text-bd-rose" />
          Romance
        </h3>
        <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a romance novelist with sharp emotional instincts.
- Build chemistry through dialogue and small gestures
- Create meaningful obstacles between characters
- Show vulnerability and emotional growth
- Let tension build naturally, don't rush pivotal moments</div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

  <!-- ===================== MODEL SETTINGS SECTION ===================== -->
  <section id="guide-model-settings" class="card">
    <button 
      @click="toggleGuideSection('model-settings')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <SlidersHorizontal class="w-5 h-5 text-bd-cyan" />
        Model Settings
        <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Advanced</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('model-settings') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('model-settings')" class="mt-4 space-y-4">
      <!-- Parameters Overview -->
      <div class="grid md:grid-cols-2 gap-3">
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-2">
            <Thermometer class="w-4 h-4 text-bd-pink" />
            <span class="font-medium text-bd-text-primary text-sm">Temperature</span>
            <span class="text-xs text-bd-text-muted">(0.6-1.5)</span>
          </div>
          <p class="text-xs text-bd-text-secondary">Randomness. ↑ if bland, ↓ if incoherent.</p>
        </div>
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-2">
            <Percent class="w-4 h-4 text-bd-green" />
            <span class="font-medium text-bd-text-primary text-sm">Top P</span>
            <span class="text-xs text-bd-text-muted">(0.7-1.0)</span>
          </div>
          <p class="text-xs text-bd-text-secondary">Focus. ↓ if weird endings, ↑ if boring. Balances with Temp.</p>
        </div>
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-2">
            <ListOrdered class="w-4 h-4 text-bd-amber" />
            <span class="font-medium text-bd-text-primary text-sm">Top K</span>
            <span class="text-xs text-bd-text-muted">(20-500)</span>
          </div>
          <p class="text-xs text-bd-text-secondary">Word variety. ↑ if robotic, ↓ if nonsense.</p>
        </div>
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-2">
            <Repeat class="w-4 h-4 text-bd-purple" />
            <span class="font-medium text-bd-text-primary text-sm">Penalties (PP/FP)</span>
            <span class="text-xs text-bd-text-muted">(0-1.5)</span>
          </div>
          <p class="text-xs text-bd-text-secondary">Reduce repetition. ↑ if obsessive, ↓ if avoiding names.</p>
        </div>
      </div>

      <!-- Response Length -->
      <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <div class="flex items-center gap-2 mb-2">
          <FileText class="w-4 h-4 text-bd-cyan" />
          <span class="font-medium text-bd-text-primary text-sm">Response Length</span>
          <span class="text-xs text-bd-text-muted">(25-200)</span>
        </div>
        <p class="text-xs text-bd-text-secondary">Max tokens per AI response. Higher = longer outputs. 100-150 is a good range for most stories.</p>
      </div>

      <!-- Official Latitude Settings -->
      <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-cyan/30">
        <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
          <Cpu class="w-4 h-4 text-bd-cyan" />
          Official Latitude Settings <span class="text-xs text-bd-text-muted font-normal">(Len/T/K/P/PP/FP)</span>
        </h3>
        <p class="text-xs text-bd-text-muted mb-3">From the official <a href="https://help.aidungeon.com/ai-model-differences" target="_blank" class="text-bd-accent-primary hover:underline">AI Model Differences</a> page — tuned for a more "engaging experience."</p>
        <div class="grid md:grid-cols-2 gap-3 text-xs">
          <div class="space-y-1.5">
            <div class="flex justify-between"><span class="text-bd-text-secondary">Muse (12B):</span><code class="text-bd-green">150/1/250/1/0.25/0</code></div>
            <div class="flex justify-between"><span class="text-bd-text-secondary">Harbinger (24B):</span><code class="text-bd-green">150/1.3/500/0.95/0.25/0</code></div>
            <div class="flex justify-between gap-2"><span class="text-bd-text-secondary">DeepSeek V3 (cohesive):</span><code class="text-bd-green">150+/0.7/500/1/0.4/0.4</code></div>
          </div>
          <div class="space-y-1.5">
            <div class="flex justify-between gap-2"><span class="text-bd-text-secondary">DeepSeek V3 (creative):</span><code class="text-bd-green">150+/1.2/500/0.95/0.4/0.4</code></div>
          </div>
        </div>
      </div>

      <!-- Community Recommended Settings -->
      <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
        <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
          <Users class="w-4 h-4 text-bd-purple" />
          Community Settings <span class="text-xs text-bd-text-muted font-normal">(T/Len/P/PP/FP)</span>
        </h3>
        <p class="text-xs text-bd-text-muted mb-3">From OffMetaGamer and the AI Dungeon community.</p>
        <div class="grid md:grid-cols-2 gap-3 text-xs">
          <div class="space-y-1.5">
            <div class="flex justify-between"><span class="text-bd-text-secondary">DeepSeek/Atlas:</span><code class="text-bd-green">0.7/300/0.92/0.8/0</code></div>
            <div class="flex justify-between"><span class="text-bd-text-secondary">Wayfarer Large:</span><code class="text-bd-green">1/500/0.95/0.5/0</code></div>
            <div class="flex justify-between"><span class="text-bd-text-secondary">Harbinger:</span><code class="text-bd-green">1.3/500/0.95/0.25/0</code></div>
          </div>
          <div class="space-y-1.5">
            <div class="flex justify-between"><span class="text-bd-text-secondary">Hearthfire:</span><code class="text-bd-green">1/500/0.95/0.4/0.4</code></div>
            <div class="flex justify-between"><span class="text-bd-text-secondary">Muse:</span><code class="text-bd-green">1/250/1/0.25/0</code></div>
            <div class="flex justify-between"><span class="text-bd-text-secondary">Madness:</span><code class="text-bd-green">1/500/0.95/0.4/0.4</code></div>
          </div>
        </div>
        <p class="text-xs text-bd-text-muted mt-2">DeepSeek: use ≤32k context for best results.</p>
      </div>

      <!-- Model Tiers -->
      <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
        <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
          <Layers class="w-4 h-4 text-bd-amber" />
          Model Tiers at a Glance
        </h3>
        <div class="grid md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/20">
            <h4 class="font-semibold text-bd-green mb-1">Dynamic Small</h4>
            <p class="text-bd-text-secondary">Muse, Wayfarer Small 2, Madness (12B). Fast and free-tier friendly. Good for quick stories.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/20">
            <h4 class="font-semibold text-bd-blue mb-1">Dynamic Large</h4>
            <p class="text-bd-text-secondary">Nova, Wayfarer Large, Hearthfire, Harbinger (24-70B). More coherent and creative. Premium.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/20">
            <h4 class="font-semibold text-bd-purple mb-1">Dynamic Deep</h4>
            <p class="text-bd-text-secondary">DeepSeek, Atlas, Raven (357-671B). Most capable but uses more credits. Best for complex stories.</p>
          </div>
        </div>
      </div>

      <!-- Quick Start -->
      <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Rocket class="w-4 h-4 text-bd-green" />
          Quick Start
        </h3>
        <p class="text-xs text-bd-text-secondary">
          <strong>T: 1.0</strong> • <strong>Len: 150</strong> • <strong>K: 300</strong> • <strong>P: 0.95</strong> • <strong>PP: 0.4</strong> • <strong>FP: 0</strong> — a safe starting point for most models. Adjust as you play.
        </p>
      </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TOKEN OPTIMIZATION SECTION ===================== -->
  <section id="guide-tokens" class="card">
    <button 
      @click="toggleGuideSection('tokens')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Coins class="w-5 h-5 text-bd-amber" />
        Token Optimization
        <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Advanced</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tokens') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('tokens')" class="mt-4 space-y-4">
      <!-- What Are Tokens -->
      <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
          <Info class="w-4 h-4 text-bd-blue" />
          What Are Tokens?
        </h3>
        <p class="text-xs text-bd-text-secondary">
          Tokens are word chunks the AI reads. Common words = 1 token. Unusual words, punctuation, or special characters often split into multiple tokens, using more of your context limit.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <!-- Why It Matters -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30 flex flex-col justify-center">
          <h3 class="font-semibold text-bd-text-primary text-base mb-3 flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Why It Matters
          </h3>
          <ul class="text-sm text-bd-text-secondary space-y-3">
            <li>• <strong>Wasted tokens</strong> = less room for story context</li>
            <li>• <strong>Split words</strong> can confuse the AI</li>
            <li>• <strong>Lower reach</strong> for players on smaller context limits</li>
          </ul>
        </div>

        <!-- Token Examples -->
        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
            <Zap class="w-4 h-4 text-bd-amber" />
            Optimization Examples
          </h3>
          <div class="space-y-3">
            <div class="p-2 rounded bg-bd-bg-tertiary">
              <div class="text-[10px] text-bd-pink font-semibold mb-1 uppercase">Fluffy (Wastes Tokens)</div>
              <code class="text-[10px] text-bd-text-secondary">Please try to avoid using any metaphors, similes, or other flowery figurative comparisons in your prose.</code>
            </div>
            <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-green/20">
              <div class="text-[10px] text-bd-green font-semibold mb-1 uppercase">Direct (Optimized)</div>
              <code class="text-[10px] text-bd-text-secondary">Avoid similes, metaphors, or figurative comparisons.</code>
            </div>
            <div class="p-2 rounded bg-bd-bg-tertiary">
              <div class="text-[10px] text-bd-pink font-semibold mb-1 uppercase">Vague (Wastes Tokens)</div>
              <code class="text-[10px] text-bd-text-secondary">Make sure that you are writing in a way that characters only know things that they would realistically know in that moment.</code>
            </div>
            <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-green/20">
              <div class="text-[10px] text-bd-green font-semibold mb-1 uppercase">Action-Oriented (Optimized)</div>
              <code class="text-[10px] text-bd-text-secondary">Assume ignorance: NPCs only know what is logically supported by context.</code>
            </div>
          </div>
        </div>
      </div>

      <!-- How to Optimize -->
      <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
        <h3 class="font-semibold text-bd-text-primary text-sm mb-3 flex items-center gap-2">
          <Wrench class="w-4 h-4 text-bd-green" />
          How to Optimize
        </h3>
        <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
          <li>Paste your instructions into the <a href="https://platform.openai.com/tokenizer" target="_blank" class="text-bd-accent-primary hover:underline font-medium">OpenAI Tokenizer</a></li>
          <li>Look for words highlighted as multiple tokens (common with punctuation)</li>
          <li>Replace with simpler, single-token alternatives where possible</li>
          <li>Test both versions; sometimes unoptimized reads better</li>
        </ol>
        <div class="mt-3 p-2 rounded bg-bd-bg-tertiary">
          <p class="text-xs text-bd-text-muted flex items-center gap-1">
            <Info class="w-3 h-3" />
            Capitalization and spacing affect tokenization!
          </p>
        </div>
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
  ScrollText, SlidersHorizontal, Layers, PenTool, Users, 
  Swords, FileText, BookOpen, HelpCircle,
  Sparkles, Info, Zap, Target, Lightbulb, Thermometer,
  ListOrdered, Percent, Repeat, Rocket, Wrench,
  Shield, Scale, Drama, MessageSquare, Skull, ExternalLink,
  AlertTriangle, Plus, Cpu, Coins,
  X, Heart, ChevronDown, ChevronUp, Eye
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'what-are-instructions', label: 'What Are AI Instructions?' },
  { id: 'context-architecture', label: 'Context Architecture' },
  { id: 'component-comparison', label: 'Instructions vs Others' },
  { id: 'structuring', label: 'Structuring Your Set' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'quick-fixes', label: 'Quick Fixes' },
  { id: 'testing', label: 'Testing & Debugging' },
  { id: 'genre-guides', label: 'Genre Guides' },
  { id: 'model-settings', label: 'Model Settings' },
  { id: 'tokens', label: 'Token Optimization' },
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
