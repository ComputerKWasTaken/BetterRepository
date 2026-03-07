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

  <!-- ===================== WELCOME TO AI DUNGEON ===================== -->
  <section id="guide-welcome" class="card">
    <button 
      @click="toggleGuideSection('welcome')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Sparkles class="w-5 h-5 text-bd-amber" />
        Welcome to AI Dungeon
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('welcome') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('welcome')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon is an <strong>AI-guided role play experience and interactive storytelling tool</strong>. Unlike most games where you experience worlds created by game designers, AI Dungeon uses cutting-edge AI technology to generate entire worlds, characters, and scenarios that you can interact with freely. There are no rules, no fixed objectives &mdash; only adventure.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Swords class="w-4 h-4 text-bd-amber" />
              Infinite Possibilities
            </h3>
            <p class="text-xs text-bd-text-secondary">
              You can type any action you think of and the AI will try to generate a story from your inputs. Lead an army, investigate a mystery, or build a kingdom &mdash; literally anything is possible.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Wand2 class="w-4 h-4 text-bd-blue" />
              AI-Powered
            </h3>
            <p class="text-xs text-bd-text-secondary">
              AI Dungeon uses large language models to generate responses. The AI isn't always perfect, but you'll be surprised at what's possible. It gets better with each advancement in AI research.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Wrench class="w-4 h-4 text-bd-green" />
              Use the Tools
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Retrying or editing bad outputs helps the AI learn good patterns. Features like Memory and Story Cards keep important information at the forefront of the AI's context.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              Your Adventures and Scenarios are <strong>automatically saved</strong> and can be rejoined or edited at any time by visiting them in "My Stuff". You never lose your progress.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CHOOSE YOUR ADVENTURE ===================== -->
  <section id="guide-choose-adventure" class="card">
    <button 
      @click="toggleGuideSection('choose-adventure')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Compass class="w-5 h-5 text-bd-green" />
        Choose Your Adventure
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('choose-adventure') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('choose-adventure')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          There are two main ways to start playing AI Dungeon: <strong>Quick Start</strong> for jumping right in, or browsing community <strong>Scenarios</strong> for curated experiences.
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- Quick Start -->
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">
                <Zap class="w-4 h-4" />
              </span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Quick Start</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Hit the <strong>Play</strong> button and choose a setting, character, and name. The AI fills in the details and you're off adventuring in seconds.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary text-xs text-bd-text-muted">
                  Play &rarr; Quick Start &rarr; Pick Setting &rarr; Choose Character &rarr; Name &rarr; Play!
                </div>
              </div>
            </div>
          </div>

          <!-- Scenarios -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">
                <Drama class="w-4 h-4" />
              </span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Community Scenarios</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Browse hundreds of community-published, predefined Scenarios. The <strong>Discover</strong> section is a great place to find content you want to play.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary text-xs text-bd-text-muted">
                  Discover &rarr; Browse Categories &rarr; Pick a Scenario &rarr; Play!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TAKING YOUR FIRST TURN ===================== -->
  <section id="guide-first-turn" class="card">
    <button 
      @click="toggleGuideSection('first-turn')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Play class="w-5 h-5 text-bd-blue" />
        Taking Your First Turn
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('first-turn') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('first-turn')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Actions are how you interact with the AI. You type what you want to happen, and the AI generates a response continuing the story. There are <strong>four action types</strong>, each suited for different purposes.
        </p>

        <div class="space-y-3">
          <!-- Do Mode -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber uppercase tracking-wider">Do</span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Take Actions</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Perform actions in the world. Adds "You" to the front and converts first-person to second-person automatically.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
                  <div class="text-bd-text-muted">You type: <span class="text-bd-amber">Enter the throne room</span></div>
                  <div class="text-bd-text-muted">AI sees: <span class="text-bd-green">&gt; You enter the throne room</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Say Mode -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-blue/20 text-bd-blue uppercase tracking-wider">Say</span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Speak Dialogue</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Say something in character. Wraps your text in quotes and adds "You say," automatically.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
                  <div class="text-bd-text-muted">You type: <span class="text-bd-blue">Where did you come from?</span></div>
                  <div class="text-bd-text-muted">AI sees: <span class="text-bd-green">&gt; You say, "Where did you come from?"</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Story Mode -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-purple/20 text-bd-purple uppercase tracking-wider">Story</span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Free-Form Narration</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Complete creative freedom. Your text is sent exactly as typed with minimal formatting. Force events, write from different perspectives, or let the AI finish a sentence.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
                  <div class="text-bd-text-muted">You type: <span class="text-bd-purple">The old wizard turns to you and says,</span></div>
                  <div class="text-bd-text-muted">AI continues: <span class="text-bd-green">"Ah, you're an adventurer, I see."</span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- See Mode -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-teal/20 text-bd-teal uppercase tracking-wider">See</span>
              <div class="flex-1">
                <h3 class="font-semibold text-bd-text-primary mb-1">Generate Images</h3>
                <p class="text-xs text-bd-text-secondary mb-2">
                  Create images during gameplay. Describe what you want to see, or leave blank for the AI to generate an image based on recent context. Does not affect the narrative.
                </p>
                <div class="p-2 rounded bg-bd-bg-primary text-xs text-bd-text-muted">
                  You own all images you generate &mdash; download and use them however you want!
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Tip:</strong> If you only use Do and Say modes, the AI tends to generate repetitive sentences starting with "You". Mix in Story mode to encourage more variety in sentence structure.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For a detailed breakdown of each action mode with advanced formatting details, see the 
              <router-link to="/guides?tab=game-modes" class="text-bd-accent-primary hover:underline font-medium">Game Modes Guide</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MAKE IT YOURS ===================== -->
  <section id="guide-make-it-yours" class="card">
    <button 
      @click="toggleGuideSection('make-it-yours')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Settings class="w-5 h-5 text-bd-purple" />
        Make It Yours
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('make-it-yours') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('make-it-yours')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          You are both the <strong>main character</strong> and the <strong>director</strong> of your story. AI Dungeon provides powerful tools to shape the narrative exactly how you want it.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <RotateCcw class="w-4 h-4 text-bd-text-muted" />
              Story Controls
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>Undo</strong> &mdash; Remove the last action and AI response</li>
              <li><strong>Redo</strong> &mdash; Bring back an undone action</li>
              <li><strong>Retry</strong> &mdash; Ask the AI to regenerate its last response</li>
              <li><strong>Edit</strong> &mdash; Modify any action text directly</li>
              <li><strong>Erase to Here</strong> &mdash; Remove everything after a specific point</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-text-muted" />
              Plot Components
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>AI Instructions</strong> &mdash; Program the AI's writing behavior</li>
              <li><strong>Author's Note</strong> &mdash; Guide the AI's tone for the current scene</li>
              <li><strong>Plot Essentials</strong> &mdash; Always-in-context key facts</li>
              <li><strong>Story Cards</strong> &mdash; Triggered context for characters, locations, etc.</li>
              <li><strong>Story Summary</strong> &mdash; High-level overview of your adventure</li>
            </ul>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Thinking About Plot Components</h4>
          <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
            <div class="p-2 rounded bg-bd-bg-primary">
              <strong class="text-bd-amber">AI Instructions</strong>: Programming the brain of an author
            </div>
            <div class="p-2 rounded bg-bd-bg-primary">
              <strong class="text-bd-blue">Author's Note</strong>: Providing feedback on style and direction
            </div>
            <div class="p-2 rounded bg-bd-bg-primary">
              <strong class="text-bd-green">Plot Essentials</strong>: Short-term memory, always in context
            </div>
            <div class="p-2 rounded bg-bd-bg-primary">
              <strong class="text-bd-purple">Story Cards</strong>: Long-term memory, triggered when relevant
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For in-depth guides on each of these systems, check out the 
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline font-medium">AI Instructions</router-link>,
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">Plot Components</router-link>, and
              <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline font-medium">Story Cards</router-link> guides.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== THINGS YOU SHOULD KNOW ===================== -->
  <section id="guide-things-to-know" class="card">
    <button 
      @click="toggleGuideSection('things-to-know')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <AlertTriangle class="w-5 h-5 text-bd-cyan" />
        Things You Should Know
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('things-to-know') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('things-to-know')" class="mt-4 space-y-4">
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-amber/20 text-bd-amber font-bold flex items-center justify-center">1</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Anything is Possible</h3>
                <p class="text-xs text-bd-text-secondary">You can type any action you think of and the AI will try to generate a story from your inputs. It's not always perfect, but you'll be surprised at what's possible.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">AI is Hard</h3>
                <p class="text-xs text-bd-text-secondary">This is a game unlike anything you've played before. It uses cutting-edge AI technology, so there may be quirks. It improves as new AI advancements come out.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">3</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Use the Tools</h3>
                <p class="text-xs text-bd-text-secondary">Retrying or editing bad outputs helps the AI pick up good patterns. Using Memory and Story Cards keeps important information at the forefront so the AI stays coherent.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">4</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Revisit Your Content</h3>
                <p class="text-xs text-bd-text-secondary">Your Adventures and Scenarios are automatically saved. Rejoin or edit them at any time from "My Stuff".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== KEEPING STORIES COHERENT ===================== -->
  <section id="guide-coherence-tips" class="card">
    <button 
      @click="toggleGuideSection('coherence-tips')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Target class="w-5 h-5 text-bd-teal" />
        Keeping Stories Coherent
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('coherence-tips') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('coherence-tips')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Part of what makes AI Dungeon incredible is the ability to tell any story from start to finish. But keeping coherence &mdash; especially in long adventures &mdash; requires a firm hand. Here are the key strategies:
        </p>

        <div class="space-y-2">
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green text-xs font-bold flex items-center justify-center">1</span>
            <div>
              <span class="text-xs text-bd-text-primary font-medium">Keep all Plot Components up to date</span>
              <p class="text-xs text-bd-text-muted">Update your Plot Essentials, Story Cards, and Author's Note as the story evolves to keep the AI on track.</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-blue/20 text-bd-blue text-xs font-bold flex items-center justify-center">2</span>
            <div>
              <span class="text-xs text-bd-text-primary font-medium">Retry and edit out bad responses</span>
              <p class="text-xs text-bd-text-muted">Bad AI outputs teach bad patterns. Retry or edit them to set a better example for future generations.</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">3</span>
            <div>
              <span class="text-xs text-bd-text-primary font-medium">Switch models occasionally</span>
              <p class="text-xs text-bd-text-muted">Different models have different strengths. Switching from time to time introduces variety into the storytelling.</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber text-xs font-bold flex items-center justify-center">4</span>
            <div>
              <span class="text-xs text-bd-text-primary font-medium">Set a good example</span>
              <p class="text-xs text-bd-text-muted">The more effort you put into your actions, the better responses you get. Detailed, creative inputs lead to detailed, creative outputs.</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle flex items-start gap-3">
            <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">5</span>
            <div>
              <span class="text-xs text-bd-text-primary font-medium">Have fun!</span>
              <p class="text-xs text-bd-text-muted">Take breaks, play other Adventures, and come back whenever you're ready. Burnout from one story is real.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== NEXT STEPS ===================== -->
  <section id="guide-next-steps" class="card">
    <button 
      @click="toggleGuideSection('next-steps')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Rocket class="w-5 h-5 text-bd-accent-primary" />
        Next Steps
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('next-steps') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('next-steps')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Now that you know the basics, explore these guides to level up your AI Dungeon experience:
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <router-link to="/guides?tab=game-modes" class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-amber/50 transition-colors group block">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2 group-hover:text-bd-amber transition-colors">
              <Gamepad2 class="w-4 h-4 text-bd-amber" />
              Game Modes
            </h3>
            <p class="text-xs text-bd-text-muted">Deep dive into Do, Say, Story, and See modes with advanced tips and formatting details.</p>
          </router-link>
          <router-link to="/guides?tab=scenarios-adventures" class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-blue/50 transition-colors group block">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2 group-hover:text-bd-blue transition-colors">
              <Map class="w-4 h-4 text-bd-blue" />
              Scenarios & Adventures
            </h3>
            <p class="text-xs text-bd-text-muted">Learn how Adventures work, create your own Scenarios, and share with the community.</p>
          </router-link>
          <router-link to="/guides?tab=context-memory" class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-green/50 transition-colors group block">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2 group-hover:text-bd-green transition-colors">
              <Brain class="w-4 h-4 text-bd-green" />
              Context & Memory
            </h3>
            <p class="text-xs text-bd-text-muted">Understand tokens, context windows, the Memory System, and how to optimize your context usage.</p>
          </router-link>
          <router-link to="/guides?tab=ai-models" class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle hover:border-bd-purple/50 transition-colors group block">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2 group-hover:text-bd-purple transition-colors">
              <Cpu class="w-4 h-4 text-bd-purple" />
              AI Models
            </h3>
            <p class="text-xs text-bd-text-muted">Compare AI models, understand model settings, and find the best model for your playstyle.</p>
          </router-link>
        </div>

        <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-bd-text-primary">Ready to play?</h3>
            <p class="text-xs text-bd-text-secondary">Jump into AI Dungeon and start your first adventure!</p>
          </div>
          <a href="https://play.aidungeon.com" target="_blank" class="btn btn-primary text-sm">
            <ExternalLink class="w-4 h-4" /> Play Now
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
  Sparkles, Info, Zap, Lightbulb, Rocket, Wrench, Swords, Wand2,
  ChevronDown, ChevronUp, Compass, Play, Drama, Settings, RotateCcw,
  Layers, AlertTriangle, Target, ExternalLink, Gamepad2, Map, Brain, Cpu
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'welcome', label: 'Welcome to AI Dungeon' },
  { id: 'choose-adventure', label: 'Choose Your Adventure' },
  { id: 'first-turn', label: 'Taking Your First Turn' },
  { id: 'header-intermediate', label: 'Intermediate', isHeader: true },
  { id: 'make-it-yours', label: 'Make It Yours' },
  { id: 'things-to-know', label: 'Things You Should Know' },
  { id: 'coherence-tips', label: 'Keeping Stories Coherent' },
  { id: 'next-steps', label: 'Next Steps' }
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
