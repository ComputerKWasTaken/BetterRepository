<template>
  <div class="space-y-8">
    <!-- Page Header — animated hero -->
    <header class="ai-hero relative overflow-hidden rounded-2xl py-10 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--amber" aria-hidden="true" />
      <div class="hero-orb hero-orb--purple" aria-hidden="true" />

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-amber/20 flex items-center justify-center animate-float flex-shrink-0">
          <ScrollText class="w-6 h-6 text-bd-amber" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            AI <span class="text-gradient">Instructions</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed">
            Master the art of guiding AI behavior with Instruction Sets and individual components.
          </p>
        </div>
      </div>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-bd-border-subtle pb-2 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-bd-bg-tertiary'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ==================== SETS TAB ==================== -->
    <template v-if="activeTab === 'sets'">
      <div class="space-y-6 animate-fade-in">
        <!-- Sets Introduction -->
        <div class="card bg-gradient-to-r from-bd-amber/10 to-bd-orange/10 border-bd-amber/30 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-amber via-bd-accent-primary to-bd-orange" />
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
              <Layers class="w-6 h-6 text-bd-amber" />
            </div>
            <div class="flex-1">
              <h2 class="text-lg font-semibold text-bd-text-primary mb-1">Pre-Built Instruction Sets</h2>
              <p class="text-sm text-bd-text-secondary mb-3">
                Complete instruction packages ready to paste directly into your AI's system prompt. 
                Each set is a curated combination of components designed to work well together.
              </p>
              <div class="flex flex-wrap gap-3 text-xs">
                <div class="flex items-center gap-1.5 text-bd-text-muted">
                  <Rocket class="w-3.5 h-3.5 text-bd-green" />
                  <span><strong class="text-bd-text-secondary">New users:</strong> Start with a set, then customize</span>
                </div>
                <div class="flex items-center gap-1.5 text-bd-text-muted">
                  <Sparkles class="w-3.5 h-3.5 text-bd-purple" />
                  <span><strong class="text-bd-text-secondary">Experienced:</strong> Use as templates or inspiration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sets Grid -->
        <div class="grid gap-4">
          <div 
            v-for="set in sets" 
            :key="set.id"
            class="card hover:border-bd-accent-primary/30 transition-all cursor-pointer group"
            :class="{ 'border-bd-accent-primary/50 bg-bd-bg-tertiary': expandedSet === set.id }"
            @click="toggleSetExpand(set.id)"
          >
            <!-- Set Header -->
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-bd-amber/20 to-bd-orange/20 flex items-center justify-center flex-shrink-0 group-hover:from-bd-amber/30 group-hover:to-bd-orange/30 transition-all">
                <Layers class="w-6 h-6 text-bd-amber" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <h3 class="font-semibold text-bd-text-primary text-lg">{{ set.name }}</h3>
                  <span v-if="set.essential" class="tag bg-bd-green/20 text-bd-green text-xs font-medium">
                    <Star class="w-3 h-3" /> Recommended
                  </span>
                </div>
                <p class="text-sm text-bd-text-secondary">{{ set.description }}</p>
                
                <!-- Metadata Row -->
                <div class="flex items-center gap-3 mt-3 flex-wrap">
                  <span class="tag text-xs" :class="{
                    'bg-bd-green/20 text-bd-green': set.difficulty === 'beginner',
                    'bg-bd-amber/20 text-bd-amber': set.difficulty === 'intermediate',
                    'bg-bd-pink/20 text-bd-pink': set.difficulty === 'advanced'
                  }">
                    {{ set.difficulty === 'beginner' ? 'Easy to Use' : set.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced' }}
                  </span>
                  <span v-if="set.models?.length" class="flex items-center gap-1 text-xs text-bd-text-muted">
                    <Cpu class="w-3 h-3" />
                    {{ set.models.join(', ') }}
                  </span>
                  <span v-if="set.settings" class="flex items-center gap-1 text-xs text-bd-text-muted">
                    <SlidersHorizontal class="w-3 h-3" />
                    Temp: {{ set.settings.temperature }} · Length: {{ set.settings.maxTokens }}
                  </span>
                </div>
              </div>
              <div class="flex flex-col items-center gap-1">
                <ChevronDown 
                  class="w-5 h-5 text-bd-text-muted transition-transform" 
                  :class="{ 'rotate-180': expandedSet === set.id }"
                />
                <span class="text-xs text-bd-text-muted">{{ expandedSet === set.id ? 'Close' : 'View' }}</span>
              </div>
            </div>

            <!-- Expanded Content -->
            <Transition name="slide">
              <div v-if="expandedSet === set.id" class="mt-5 pt-5 border-t border-bd-border-subtle" @click.stop>
                <!-- Purpose -->
                <div class="mb-4 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Target class="w-3 h-3" /> Best For
                  </h4>
                  <p class="text-sm text-bd-text-secondary">{{ set.purpose }}</p>
                </div>

                <!-- Content -->
                <div class="mb-4">
                  <div class="flex items-center justify-between mb-2">
                    <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider flex items-center gap-1">
                      <FileText class="w-3 h-3" /> Full Instructions
                    </h4>
                    <button 
                      @click.stop="copySetContent(set.content, set.id)"
                      class="btn text-xs py-1.5 px-3 transition-all"
                      :class="copiedSetId === set.id ? 'btn-success bg-bd-green text-white' : 'btn-primary'"
                    >
                      <Check v-if="copiedSetId === set.id" class="w-3.5 h-3.5" />
                      <Copy v-else class="w-3.5 h-3.5" />
                      {{ copiedSetId === set.id ? 'Copied!' : 'Copy to Clipboard' }}
                    </button>
                  </div>
                  <pre class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-sm text-bd-text-secondary font-mono whitespace-pre-wrap overflow-x-auto max-h-80 leading-relaxed">{{ set.content }}</pre>
                </div>

                <!-- Tags -->
                <div v-if="set.tags?.length" class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs text-bd-text-muted">Tags:</span>
                  <span 
                    v-for="tag in set.tags" 
                    :key="tag"
                    class="tag text-xs"
                  >{{ tag }}</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Bottom CTA -->
        <div class="card bg-bd-bg-tertiary border-dashed text-center py-6">
          <p class="text-sm text-bd-text-secondary mb-2">Want to build your own custom Instruction Set?</p>
          <div class="flex items-center justify-center gap-3">
            <button @click="activeTab = 'collection'" class="btn btn-secondary text-sm">
              <PenTool class="w-4 h-4" />
              Browse Components
            </button>
            <button @click="activeTab = 'builder'" class="btn btn-primary text-sm">
              <Wrench class="w-4 h-4" />
              Open Builder
            </button>
          </div>
        </div>
      </div>
    </template>

    <!-- ==================== BUILDER TAB ==================== -->
    <template v-if="activeTab === 'builder'">
      <InstructionBuilder 
        :nsfw-verified="nsfwVerified"
        @request-age-verification="handleBuilderAgeVerification"
      />
    </template>

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">

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
                  <button 
                    @click="goToCollectionWithFilter('category', 'role-persona')"
                    class="mt-2 text-xs text-bd-accent-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink class="w-3 h-3" /> Browse Role Components →
                  </button>
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
                  <button 
                    @click="goToCollectionWithFilter('essential')"
                    class="mt-2 text-xs text-bd-accent-primary hover:underline flex items-center gap-1"
                  >
                    <ExternalLink class="w-3 h-3" /> Browse Essential Components →
                  </button>
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
              <button @click="activeTab = 'builder'" class="btn btn-primary text-sm">
                <Wrench class="w-4 h-4" /> Open Builder
              </button>
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
                  <router-link to="/plot-components" class="text-bd-accent-primary hover:underline">Author's Note</router-link>.
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
          <!-- Snarky Narrator -->
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

          <!-- Evil DM -->
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

          <!-- Dark Fantasy -->
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

          <!-- Cozy Adventure -->
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

          <!-- Mystery Thriller -->
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

          <!-- Combat Focused -->
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

          <!-- Sci-Fi -->
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

          <!-- Horror -->
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

          <!-- Romance -->
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

    <!-- ==================== COLLECTION TAB ==================== -->
    <template v-if="activeTab === 'collection'">
      
      <!-- Collection Introduction -->
      <div class="card bg-gradient-to-r from-bd-purple/10 to-bd-blue/10 border-bd-purple/30 relative overflow-hidden animate-fade-in">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-purple via-bd-blue to-bd-cyan" />
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <PenTool class="w-6 h-6 text-bd-purple" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-bd-text-primary mb-1">Instruction Components</h2>
            <p class="text-sm text-bd-text-secondary">
              Individual instruction pieces you can mix and match to create your perfect AI prompt. 
              Each component focuses on one specific behavior or style.
            </p>
          </div>
        </div>
      </div>

      <!-- Quick Filter Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <span class="text-xs text-bd-text-muted mr-1">Quick filters:</span>
        <button 
          @click="toggleQuickFilter('essential')"
          class="btn text-sm"
          :class="quickFilter === 'essential' ? 'btn-primary' : 'btn-secondary'"
        >
          <Star class="w-4 h-4" />
          Must-Have
        </button>
        <button 
          @click="toggleQuickFilter('starter')"
          class="btn text-sm"
          :class="quickFilter === 'starter' ? 'btn-primary' : 'btn-secondary'"
        >
          <Rocket class="w-4 h-4" />
          Beginner Friendly
        </button>
        <button 
          @click="toggleQuickFilter('high-impact')"
          class="btn text-sm"
          :class="quickFilter === 'high-impact' ? 'btn-primary' : 'btn-secondary'"
        >
          <Zap class="w-4 h-4" />
          High Impact
        </button>
        <div class="flex-1"></div>
        <button 
          @click="showFilters = !showFilters"
          class="btn btn-secondary text-sm"
          :class="{ 'ring-2 ring-bd-accent-primary': hasActiveFilters }"
        >
          <SlidersHorizontal class="w-4 h-4" />
          Advanced Filters
          <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-bd-accent-primary"></span>
        </button>
      </div>

    <!-- Search Bar -->
    <SearchBar 
      v-model="searchQuery"
      placeholder="Search components by name, tag, or description..."
      :suggestions="searchSuggestions"
      :result-count="filteredInstructions.length"
      @search="handleSearch"
    />

    <!-- Filter Panel -->
    <Transition name="slide">
      <div v-if="showFilters" class="card-elevated space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary">Filters</h3>
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-bd-accent-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <!-- Category Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Category</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="toggleCategory(category.id)"
              class="tag cursor-pointer transition-all flex items-center gap-1.5"
              :class="selectedCategories.includes(category.id) 
                  ? 'bg-bd-accent-primary/20 text-bd-accent-light border border-bd-accent-primary/30' 
                  : 'hover:bg-bd-tag-bg'"
            >
              <Lock v-if="category.id === 'nsfw' && !nsfwVerified" class="w-3 h-3" />
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Difficulty Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Difficulty</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="diff in difficulties" 
              :key="diff.id"
              @click="toggleDifficulty(diff.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedDifficulties.includes(diff.id) 
                ? diff.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Impact Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Impact</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="imp in impacts" 
              :key="imp.id"
              @click="toggleImpact(imp.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedImpacts.includes(imp.id) 
                ? imp.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ imp.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-bd-text-muted">
        Showing {{ filteredInstructions.length }} of {{ instructions.length }} instructions
      </span>
    </div>

    <!-- Category Jump Navigation (default view - no filters active) -->
    <div v-if="!hasAnyFilters" class="sticky top-0 lg:top-0 bg-bd-bg-primary/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 border-b border-bd-border-subtle" style="z-index: var(--bd-z-sticky)">
      <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
        <span class="text-xs text-bd-text-muted font-medium whitespace-nowrap flex-shrink-0">Jump to:</span>
        <button
          v-for="category in categoriesWithInstructions"
          :key="'jump-' + category.id"
          @click="scrollToCategory(category.id)"
          class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
          :class="activeCategoryId === category.id 
            ? getCategoryBgClass(category.id) + ' ' + getCategoryIconClass(category.id)
            : 'text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary'"
        >
          <component :is="getCategoryIcon(category.id)" class="w-3 h-3" />
          {{ category.name }}
          <span class="opacity-60">({{ category.instructions.length }})</span>
        </button>
      </div>
    </div>

    <!-- Category Sections (default view - no filters active) -->
    <div v-if="!hasAnyFilters" class="space-y-8">
      <section 
        v-for="category in categoriesWithInstructions" 
        :key="category.id"
        :id="'category-' + category.id"
        :ref="el => setCategoryRef(category.id, el)"
      >
        <div class="flex items-center gap-3 mb-4">
          <div 
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="getCategoryBgClass(category.id)"
          >
            <component :is="getCategoryIcon(category.id)" class="w-4 h-4" :class="getCategoryIconClass(category.id)" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
              {{ category.name }}
              <Lock v-if="category.isLocked" class="w-4 h-4 text-bd-red" />
            </h2>
            <p class="text-xs text-bd-text-muted">{{ category.description }}</p>
          </div>
          <span 
            class="ml-auto tag"
            :class="category.id === 'nsfw' ? 'bg-bd-red/20 text-bd-red' : ''"
          >{{ category.instructions.length }}</span>
        </div>
        
        <!-- Locked NSFW Section -->
        <div v-if="category.isLocked" class="relative">
          <!-- Blurred preview -->
          <div class="space-y-3 filter blur-sm pointer-events-none select-none">
            <div v-for="i in Math.min(3, category.instructions.length)" :key="i" class="card bg-bd-bg-tertiary/50 p-4">
              <div class="h-4 bg-bd-bg-elevated rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-bd-bg-elevated rounded w-1/2"></div>
            </div>
          </div>
          <!-- Unlock overlay -->
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              @click="toggleCategory('nsfw')"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-bd-red/20 border border-bd-red/30 text-bd-red hover:bg-bd-red/30 transition-colors"
            >
              <Lock class="w-4 h-4" />
              <span class="font-medium">Click to verify age (18+)</span>
            </button>
          </div>
        </div>
        
        <!-- Normal category content -->
        <div v-else class="grid gap-3">
          <template v-for="item in category.organizedItems" :key="item.isGroup ? item.groupId : item.instruction.id">
            <!-- Single instruction (not in a group) -->
            <ResourceCard 
              v-if="!item.isGroup"
              :resource="item.instruction"
            />
            
            <!-- Grouped instructions -->
            <div v-else class="instruction-group rounded-xl border-2 border-bd-purple/30 overflow-hidden bg-bd-bg-secondary">
              <!-- Group header - clickable banner -->
              <button 
                @click="toggleGroup(item.groupId)"
                class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-bd-purple/10 to-bd-blue/10 hover:from-bd-purple/20 hover:to-bd-blue/20 transition-all text-left border-b border-bd-purple/20"
              >
                <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
                  <Layers class="w-4 h-4 text-bd-purple" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="font-semibold text-bd-text-primary">{{ item.groupLabel }}</span>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs px-2 py-0.5 rounded-full bg-bd-purple/20 text-bd-purple font-medium">
                      {{ item.members.length }} variations
                    </span>
                    <span class="text-xs text-bd-text-muted">
                      {{ isGroupExpanded(item.groupId) ? 'Click to collapse' : 'Click to see all options' }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span v-if="!isGroupExpanded(item.groupId)" class="text-xs text-bd-purple font-medium hidden sm:block">
                    +{{ item.members.length - 1 }} more
                  </span>
                  <ChevronDown 
                    class="w-5 h-5 text-bd-purple transition-transform" 
                    :class="{ 'rotate-180': isGroupExpanded(item.groupId) }"
                  />
                </div>
              </button>
              
              <!-- Primary instruction (always visible) -->
              <div>
                <ResourceCard :resource="item.members[0]" />
              </div>
              
              <!-- Expanded group members -->
              <Transition name="slide">
                <div v-if="isGroupExpanded(item.groupId) && item.members.length > 1" class="border-t-2 border-dashed border-bd-purple/20 bg-bd-bg-primary/50">
                  <div class="px-2 py-3 space-y-2">
                    <div class="px-2 pb-2 flex items-center gap-2">
                      <div class="h-px flex-1 bg-bd-border-subtle"></div>
                      <span class="text-xs text-bd-text-muted font-medium uppercase tracking-wider">Alternative Versions</span>
                      <div class="h-px flex-1 bg-bd-border-subtle"></div>
                    </div>
                    <ResourceCard 
                      v-for="member in item.members.slice(1)" 
                      :key="member.id"
                      :resource="member"
                    />
                  </div>
                </div>
              </Transition>
            </div>
          </template>
        </div>
      </section>
    </div>

    <!-- Filtered/Sorted Results -->
    <div v-if="hasAnyFilters" class="grid gap-3">
      <ResourceCard 
        v-for="instruction in filteredInstructions" 
        :key="instruction.id"
        :resource="instruction"
      />
      
      <!-- Empty State -->
      <div v-if="filteredInstructions.length === 0" class="text-center py-12">
        <SearchX class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No results found</h3>
        <p class="text-bd-text-secondary">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <button @click="clearAll" class="btn btn-secondary mt-4">
          Clear Search & Filters
        </button>
      </div>
    </div>

    <!-- Contribute CTA -->
    <section v-if="!hasAnyFilters" class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <GitPullRequest class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Instructions</h3>
          <p class="text-bd-text-secondary mb-4">
            Found a great AI instruction that works well? Share it with the community — no coding required, just paste it in a GitHub issue.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <GitPullRequest class="w-4 h-4" />
            Submit an Instruction
          </router-link>
        </div>
      </div>
    </section>

    </template>

    <!-- Age Verification Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showAgeVerification" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="cancelAgeVerification"></div>
          
          <!-- Modal -->
          <div class="relative bg-bd-bg-secondary border border-bd-red/30 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-fade-in">
            <!-- Icon -->
            <div class="flex justify-center mb-4">
              <div class="w-16 h-16 rounded-full bg-bd-red/20 flex items-center justify-center">
                <ShieldAlert class="w-8 h-8 text-bd-red" />
              </div>
            </div>
            
            <!-- Content -->
            <div class="text-center space-y-3">
              <h2 class="text-xl font-bold text-bd-text-primary">Adult Content Warning</h2>
              <p class="text-bd-text-secondary text-sm">
                The <strong class="text-bd-red">NSFW / Adult</strong> category contains explicit sexual content intended for adults only.
              </p>
              <p class="text-bd-text-muted text-xs">
                By continuing, you confirm that you are <strong>18 years of age or older</strong> and that viewing adult content is legal in your jurisdiction.
              </p>
            </div>
            
            <!-- Buttons -->
            <div class="flex gap-3 mt-6">
              <button 
                @click="cancelAgeVerification"
                class="flex-1 px-4 py-3 rounded-xl bg-bd-bg-tertiary text-bd-text-secondary hover:bg-bd-bg-elevated transition-colors font-medium"
              >
                Go Back
              </button>
              <button 
                @click="confirmAge"
                class="flex-1 px-4 py-3 rounded-xl bg-bd-red text-white hover:bg-bd-red/80 transition-colors font-medium"
              >
                I'm 18+ — Continue
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/ui/SearchBar.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import InstructionBuilder from '@/components/ui/InstructionBuilder.vue'
import { 
  INSTRUCTIONS, 
  CATEGORIES,
  SETS,
  getEssentialInstructions,
  getStarterSet,
  getHighImpactInstructions,
  getBeginnerInstructions
} from '@/data/aiInstructions'
import { searchCollectionWithScores } from '@/data/shared'
import { usePreferences } from '@/composables/usePreferences'
import { 
  ScrollText, SlidersHorizontal, SearchX, Layers, PenTool, Users, 
  Link, Swords, Globe, FileText, Settings, BookOpen, HelpCircle,
  Sparkles, Info, Zap, Target, Scissors, Scale, Lightbulb, Thermometer,
  ListOrdered, Percent, UserPlus, Repeat, Rocket, Wrench, Clock, UserX,
  Shield, Focus, Type, Drama, MessageSquare, Skull, ExternalLink, Star,
  AlertTriangle, Plus, Tag, Braces, Split, AlignLeft, Cpu, Coins,
  Check, X, TrendingUp, Wand2, Link2, Heart, ChevronDown, ChevronUp, UserCog, Flame,
  ShieldAlert, Lock, Copy, Eye, GitPullRequest
} from 'lucide-vue-next'

const activeTab = ref('collection')

const tabs = [
  { id: 'sets', label: 'Sets', icon: Layers },
  { id: 'collection', label: 'Collection', icon: FileText },
  { id: 'builder', label: 'Builder', icon: Wrench },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const sets = ref(SETS)
const expandedSet = ref(null)
const copiedSetId = ref(null)

const toggleSetExpand = (setId) => {
  if (expandedSet.value === setId) {
    expandedSet.value = null
  } else {
    expandedSet.value = setId
  }
}

const copySetContent = async (content, setId) => {
  try {
    await navigator.clipboard.writeText(content)
    copiedSetId.value = setId
    setTimeout(() => {
      copiedSetId.value = null
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const route = useRoute()
const { addToSearchHistory, preferences, verifyAge } = usePreferences()

const instructions = ref(INSTRUCTIONS)
const categories = ref(CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDifficulties = ref([])
const selectedImpacts = ref([])
const showFilters = ref(false)
const quickFilter = ref(null)

// NSFW Age Verification (uses persistent preference)
const nsfwVerified = computed(() => preferences.value.nsfwVerified)
const showAgeVerification = ref(false)
const pendingNsfwAction = ref(null) // Stores the action to perform after verification

const difficulties = [
  { id: 'beginner', label: 'Beginner', activeClass: 'bg-bd-green/20 text-bd-green border border-bd-green/30' },
  { id: 'intermediate', label: 'Intermediate', activeClass: 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30' },
  { id: 'advanced', label: 'Advanced', activeClass: 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30' }
]

const impacts = [
  { id: 'high', label: 'High Impact', activeClass: 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30' },
  { id: 'medium', label: 'Medium Impact', activeClass: 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30' },
  { id: 'low', label: 'Low Impact', activeClass: 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default' }
]

// Icon component mapping for categories
const iconComponentMap = {
  'Layers': Layers,
  'UserCog': UserCog,
  'PenTool': PenTool,
  'Users': Users,
  'Link': Link,
  'Swords': Swords,
  'Globe': Globe,
  'FileText': FileText,
  'Settings': Settings,
  'Flame': Flame,
  'Clock': Clock,
  'MessageSquare': MessageSquare,
  'Heart': Heart,
  'Target': Target,
  'BookOpen': BookOpen,
  'Wrench': Wrench,
  'ScrollText': ScrollText
}

const categoryColorMap = {
  'role-persona': { bg: 'bg-bd-orange/20', icon: 'text-bd-orange' },
  'writing-style': { bg: 'bg-bd-blue/20', icon: 'text-bd-blue' },
  'pacing-flow': { bg: 'bg-bd-cyan/20', icon: 'text-bd-cyan' },
  'dialogue': { bg: 'bg-bd-teal/20', icon: 'text-bd-teal' },
  'characterization': { bg: 'bg-bd-purple/20', icon: 'text-bd-purple' },
  'emotion-tone': { bg: 'bg-bd-pink/20', icon: 'text-bd-pink' },
  'coherence': { bg: 'bg-bd-green/20', icon: 'text-bd-green' },
  'narrative': { bg: 'bg-bd-amber/20', icon: 'text-bd-amber' },
  'world-setting': { bg: 'bg-bd-indigo/20', icon: 'text-bd-indigo' },
  'gameplay': { bg: 'bg-bd-rose/20', icon: 'text-bd-rose' },
  'formatting': { bg: 'bg-bd-gray/20', icon: 'text-bd-gray' },
  'meta': { bg: 'bg-bd-slate/20', icon: 'text-bd-slate' },
  'nsfw': { bg: 'bg-bd-red/20', icon: 'text-bd-red' }
}

const getCategoryIcon = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return iconComponentMap[category?.icon] || Layers
}

const getCategoryBgClass = (categoryId) => {
  return categoryColorMap[categoryId]?.bg || 'bg-bd-tag-bg'
}

const getCategoryIconClass = (categoryId) => {
  return categoryColorMap[categoryId]?.icon || 'text-bd-text-muted'
}

const filteredInstructions = computed(() => {
  let result = [...instructions.value]
  
  // Filter out NSFW unless verified OR explicitly selected in category filter
  const nsfwExplicitlySelected = selectedCategories.value.includes('nsfw')
  if (!nsfwVerified.value && !nsfwExplicitlySelected) {
    result = result.filter(i => i.category !== 'nsfw')
  }
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = getEssentialInstructions().filter(i => nsfwVerified.value || i.category !== 'nsfw')
  } else if (quickFilter.value === 'starter') {
    result = getStarterSet().filter(i => nsfwVerified.value || i.category !== 'nsfw')
  } else if (quickFilter.value === 'high-impact') {
    result = getHighImpactInstructions().filter(i => nsfwVerified.value || i.category !== 'nsfw')
  } else if (quickFilter.value === 'beginner') {
    result = getBeginnerInstructions().filter(i => nsfwVerified.value || i.category !== 'nsfw')
  }
  
  // Filter by search query using fuzzy search
  if (searchQuery.value) {
    const searchResults = searchCollectionWithScores(
      result,
      searchQuery.value,
      ['name', 'description', 'tags'],
      { useTagAliases: true }
    )
    result = searchResults.map(r => r.item)
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(i => selectedCategories.value.includes(i.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(i => selectedDifficulties.value.includes(i.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(i => selectedImpacts.value.includes(i.impact))
  }
  
  // Apply sorting based on active quick filter or default alphabetical
  const impactOrder = { high: 0, medium: 1, low: 2 }
  const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 }
  
  if (quickFilter.value === 'essential' || quickFilter.value === 'starter') {
    // Sort by impact (high first), then by name
    result.sort((a, b) => {
      const impactDiff = (impactOrder[a.impact] ?? 3) - (impactOrder[b.impact] ?? 3)
      if (impactDiff !== 0) return impactDiff
      return (a.name || '').localeCompare(b.name || '')
    })
  } else if (quickFilter.value === 'high-impact') {
    // Sort by difficulty (beginner first), then by name
    result.sort((a, b) => {
      const diffDiff = (difficultyOrder[a.difficulty] ?? 3) - (difficultyOrder[b.difficulty] ?? 3)
      if (diffDiff !== 0) return diffDiff
      return (a.name || '').localeCompare(b.name || '')
    })
  } else if (!searchQuery.value) {
    // Default: sort alphabetically by name when no search query
    result.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }
  // When searching, keep the search relevance order from searchCollectionWithScores
  
  return result
})

// Organize instructions into groups where applicable
const organizeInstructions = (instructionList) => {
  const result = []
  const processedIds = new Set()
  
  for (const instruction of instructionList) {
    if (processedIds.has(instruction.id)) continue
    
    if (instruction.groupId) {
      // Find all instructions in this group
      const groupMembers = instructionList
        .filter(i => i.groupId === instruction.groupId)
        .sort((a, b) => (a.groupOrder || 0) - (b.groupOrder || 0))
      
      // Mark all as processed
      groupMembers.forEach(m => processedIds.add(m.id))
      
      // Add as a group object
      result.push({
        isGroup: true,
        groupId: instruction.groupId,
        groupLabel: groupMembers[0]?.groupLabel || 'Related Instructions',
        members: groupMembers
      })
    } else {
      processedIds.add(instruction.id)
      result.push({ isGroup: false, instruction })
    }
  }
  
  return result
}

const categoriesWithInstructions = computed(() => {
  return categories.value
    .map(cat => ({
      ...cat,
      instructions: instructions.value.filter(i => i.category === cat.id),
      organizedItems: organizeInstructions(instructions.value.filter(i => i.category === cat.id)),
      isLocked: cat.id === 'nsfw' && !nsfwVerified.value
    }))
    .filter(cat => cat.instructions.length > 0)
})

// --- Category jump navigation ---
const activeCategoryId = ref(null)
const categoryRefs = {}
let categoryObserver = null

const setCategoryRef = (categoryId, el) => {
  if (el) categoryRefs[categoryId] = el
}

const scrollToCategory = (categoryId) => {
  const el = categoryRefs[categoryId]
  if (!el) return
  // Offset for sticky jump bar (~48px) + some breathing room
  const offset = 56
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeCategoryId.value = categoryId
}

// Observe category sections to track which is currently visible
const setupCategoryObserver = () => {
  if (categoryObserver) categoryObserver.disconnect()

  categoryObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // Extract category id from the element's id attribute (format: "category-{id}")
          const id = entry.target.id?.replace('category-', '')
          if (id) activeCategoryId.value = id
        }
      }
    },
    { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
  )

  // Observe all category section elements
  Object.values(categoryRefs).forEach(el => {
    if (el) categoryObserver.observe(el)
  })
}

// Re-setup observer when the collection tab is shown or categories change
watch([() => activeTab.value, categoriesWithInstructions], ([tab]) => {
  if (tab === 'collection') {
    nextTick(() => setupCategoryObserver())
  } else {
    if (categoryObserver) categoryObserver.disconnect()
  }
})

// Track expanded groups
const expandedGroups = ref(new Set())

const toggleGroup = (groupId) => {
  if (expandedGroups.value.has(groupId)) {
    expandedGroups.value.delete(groupId)
  } else {
    expandedGroups.value.add(groupId)
  }
  // Force reactivity
  expandedGroups.value = new Set(expandedGroups.value)
}

const isGroupExpanded = (groupId) => expandedGroups.value.has(groupId)

const hasActiveFilters = computed(() => 
  selectedCategories.value.length > 0 || 
  selectedDifficulties.value.length > 0 || 
  selectedImpacts.value.length > 0
)

const hasAnyFilters = computed(() => 
  searchQuery.value || 
  quickFilter.value || 
  hasActiveFilters.value
)

const toggleQuickFilter = (filter) => {
  if (quickFilter.value === filter) {
    quickFilter.value = null
  } else {
    quickFilter.value = filter
    // Clear other filters when using quick filter
    selectedCategories.value = []
    selectedDifficulties.value = []
    selectedImpacts.value = []
  }
}

const toggleDifficulty = (difficultyId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  const index = selectedDifficulties.value.indexOf(difficultyId)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(difficultyId)
  }
}

const toggleImpact = (impactId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  const index = selectedImpacts.value.indexOf(impactId)
  if (index > -1) {
    selectedImpacts.value.splice(index, 1)
  } else {
    selectedImpacts.value.push(impactId)
  }
}

const searchSuggestions = computed(() => {
  const allTags = [...new Set(instructions.value.flatMap(i => i.tags))]
  return allTags.slice(0, 5)
})

const toggleCategory = (categoryId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  
  // Check if trying to enable NSFW category without verification
  if (categoryId === 'nsfw' && !nsfwVerified.value && !selectedCategories.value.includes('nsfw')) {
    pendingNsfwAction.value = () => {
      selectedCategories.value.push('nsfw')
    }
    showAgeVerification.value = true
    return
  }
  
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

// Age verification handlers
const confirmAge = () => {
  verifyAge() // Persists to cookie
  showAgeVerification.value = false
  if (pendingNsfwAction.value) {
    pendingNsfwAction.value()
    pendingNsfwAction.value = null
  }
}

const cancelAgeVerification = () => {
  showAgeVerification.value = false
  pendingNsfwAction.value = null
}

// Handle age verification request from Builder component
const handleBuilderAgeVerification = (callback) => {
  pendingNsfwAction.value = callback
  showAgeVerification.value = true
}

const clearFilters = () => {
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}

const clearAll = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}

// Contributors for credits section
const aiInstructionsContributors = [
  'OffMetaGamer', 'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'Dragranis', 
  'BinKompliziert', 'Wilmar', 'Le Onyx', 'Little Hat', 'SeinSchetten', 
  'Zoocata', 'Monsieur Boo', 'CamSift'
]

// ===========================================
// GUIDE SECTION STATE & FUNCTIONS
// ===========================================

// Guide table of contents sections
const guideSections = [
  { id: 'quick-start', label: 'Quick Start', icon: 'Rocket', color: 'green' },
  { id: 'what-are-instructions', label: 'What Are AI Instructions?', icon: 'HelpCircle', color: 'amber' },
  { id: 'context-architecture', label: 'Context Architecture', icon: 'Layers', color: 'cyan' },
  { id: 'component-comparison', label: 'Instructions vs Others', icon: 'Scale', color: 'green' },
  { id: 'structuring', label: 'Structuring Your Set', icon: 'FileText', color: 'blue' },
  { id: 'common-mistakes', label: 'Common Mistakes', icon: 'AlertTriangle', color: 'pink' },
  { id: 'quick-fixes', label: 'Quick Fixes', icon: 'Wrench', color: 'purple' },
  { id: 'testing', label: 'Testing & Debugging', icon: 'Eye', color: 'teal' },
  { id: 'genre-guides', label: 'Genre Guides', icon: 'Drama', color: 'amber' },
  { id: 'model-settings', label: 'Model Settings', icon: 'SlidersHorizontal', color: 'cyan' },
  { id: 'tokens', label: 'Token Optimization', icon: 'Coins', color: 'amber' },
  { id: 'credits', label: 'Credits', icon: 'Info', color: 'amber' }
]

// Track which guide sections are expanded (all expanded by default)
const expandedGuideSections = ref(new Set(guideSections.map(s => s.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) {
    expandedGuideSections.value.delete(sectionId)
  } else {
    expandedGuideSections.value.add(sectionId)
  }
  // Force reactivity
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = (sectionId) => {
  return expandedGuideSections.value.has(sectionId)
}

const scrollToGuideSection = (sectionId) => {
  const element = document.getElementById(`guide-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    // Ensure section is expanded
    if (!expandedGuideSections.value.has(sectionId)) {
      expandedGuideSections.value.add(sectionId)
      expandedGuideSections.value = new Set(expandedGuideSections.value)
    }
  }
}

// Navigate to collection with a specific search/filter
const goToCollectionWithFilter = (filterType, filterValue) => {
  activeTab.value = 'collection'
  
  if (filterType === 'search') {
    searchQuery.value = filterValue
  } else if (filterType === 'category') {
    clearFilters()
    selectedCategories.value = [filterValue]
  } else if (filterType === 'tag') {
    searchQuery.value = filterValue
  } else if (filterType === 'essential') {
    clearFilters()
    quickFilter.value = 'essential'
  }
}

// Expand/collapse all guide sections
const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}

const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}

// Handle initial search query and tab from URL (e.g. from global search)
onMounted(() => {
  if (route.query.tab && ['sets', 'collection', 'builder', 'guide'].includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
  if (route.query.q) {
    searchQuery.value = route.query.q
    // Default to collection tab so filtered results are visible
    if (!route.query.tab) activeTab.value = 'collection'
  }
  // Initialize category observer if starting on collection tab
  if (activeTab.value === 'collection') {
    nextTick(() => setupCategoryObserver())
  }
})

onUnmounted(() => {
  if (categoryObserver) categoryObserver.disconnect()
})
</script>

<style scoped>
/* === Hero background === */
.ai-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.hero-orb--amber {
  width: 220px;
  height: 220px;
  background: #f59e0b;
  top: -40px;
  right: -20px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 160px;
  height: 160px;
  background: #a855f7;
  bottom: -30px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

/* === Hide scrollbar on category jump nav === */
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
