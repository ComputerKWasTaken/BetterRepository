<template>
  <div class="space-y-8">
    <!-- Page Header - animated hero -->
    <header class="plot-hero relative overflow-hidden rounded-2xl py-10 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--blue" aria-hidden="true" />
      <div class="hero-orb hero-orb--green" aria-hidden="true" />

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-blue/20 flex items-center justify-center animate-float flex-shrink-0">
          <Bookmark class="w-6 h-6 text-bd-blue" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            Plot <span class="text-gradient">Components</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed">
            Master the backbone of your story: Plot Essentials, Author's Notes, Story Cards, and more.
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

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">
      <!-- Table of Contents - Sticky Sidebar -->
      <div class="flex gap-6 animate-fade-in">
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
        <div class="flex-1 space-y-4 min-w-0">
      <!-- Introduction -->
      <section id="guide-intro" class="card">
        <button
          @click="toggleGuideSection('intro')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Are Plot Components?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('intro')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Plot components are tools that help the AI remember crucial information and follow your story's rules. 
              <strong>Managing them is the most important thing you can do</strong> for story coherence.
            </p>
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <p class="text-sm text-bd-text-secondary">
                <strong class="text-bd-text-primary">Key principle:</strong> The AI uses everything in context when writing, 
                so what you put in plot components has a <em>big effect</em> on where your story goes. Choose wisely!
              </p>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Plot Essentials -->
      <section id="guide-plot-essentials" class="card">
        <button
          @click="toggleGuideSection('plot-essentials')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookMarked class="w-5 h-5 text-bd-green" />
            Plot Essentials (PE)
            <span class="tag bg-bd-green/20 text-bd-green text-xs">Always Relevant</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('plot-essentials') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('plot-essentials')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Use Plot Essentials for information that is <strong>always relevant</strong> throughout your story.
            </p>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <User class="w-4 h-4 text-bd-green" />
                    Character Description
                  </h3>
                  <p class="text-sm text-bd-text-secondary">
                    Your character description belongs here. <strong>Update it whenever changes occur</strong> to your character.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <Globe class="w-4 h-4 text-bd-green" />
                    World Lore
                  </h3>
                  <p class="text-sm text-bd-text-secondary">
                    Add a paragraph for world lore. Remember to <strong>update it regularly</strong> with new info and changes.
                  </p>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <div class="flex items-start gap-3">
                  <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 class="font-semibold text-bd-text-primary">Pro Tip: Traveling Companions</h3>
                    <p class="text-sm text-bd-text-secondary mt-1">
                      If a character is always with you, mention them in PE with a brief identifier:
                    </p>
                    <code class="text-xs text-bd-green mt-2 block bg-bd-bg-tertiary p-2 rounded">
                      Your adventuring party consists of: Bob (grumpy wizard), Frank (eldritch horror), and Twinkletoes (female talking unicorn).
                    </code>
                    <p class="text-xs text-bd-text-muted mt-2">
                      This prevents companions from "disappearing" and ensures the AI includes them in scenes.
                    </p>
                  </div>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                <div class="flex items-start gap-3">
                  <MapPin class="w-5 h-5 text-bd-cyan mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 class="font-semibold text-bd-text-primary">High Context Tip (16k+)</h3>
                    <p class="text-sm text-bd-text-secondary mt-1">
                      With high context, the AI may try to continue old scenes. Add a "Current scene" note:
                    </p>
                    <code class="text-xs text-bd-green mt-2 block bg-bd-bg-tertiary p-2 rounded">
                      Current scene: You and Mary are at a coffee shop gossiping about Bob.
                    </code>
                    <p class="text-xs text-bd-text-muted mt-2">Update this whenever the scene changes.</p>
                  </div>
                </div>
              </div>

              <!-- Official Writing Tips -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-green" />
                  Writing Effective Plot Essentials
                </h3>
                <div class="grid md:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Priming Effect</h4>
                    <p class="text-bd-text-secondary">Anything in PE <strong>primes the AI to bring it up</strong>. Only include info you want the AI to actively reference.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Use "Avoid" Not "Not"</h4>
                    <p class="text-bd-text-secondary">The AI tends to <strong>ignore negatives</strong>. Say "avoid fire" instead of "is not fire-resistant" because negation confuses models.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Past Tense for Past Events</h4>
                    <p class="text-bd-text-secondary">Label past events explicitly. Without past tense, the AI may <strong>replay them in the present</strong>.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">One Topic Per Line</h4>
                    <p class="text-bd-text-secondary">Keep individual topics on their own line with the subject's name repeated for <strong>strong word-association</strong>.</p>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-3 flex items-center gap-1">
                  <Info class="w-3 h-3 flex-shrink-0" />
                  Details that only matter when a specific topic comes up are better suited for Story Cards.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Author's Note -->
      <section id="guide-authors-note" class="card">
        <button
          @click="toggleGuideSection('authors-note')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Feather class="w-5 h-5 text-bd-pink" />
            Author's Note (AN)
            <span class="tag bg-bd-pink/20 text-bd-pink text-xs">Scene Setup</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('authors-note') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('authors-note')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Author's Note sets up the <strong>current scene</strong>, use it when the scene differs from your main theme or to temporarily shift focus.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Rocket class="w-4 h-4 text-bd-pink" />
                  Setting Change
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Story was on Earth, now you're in space and the AI struggles? Write a prose description of the new setting in AN.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Focus class="w-4 h-4 text-bd-pink" />
                  Theme Shift
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Want to focus on politics for this scene even though it's not the main theme? Change your "Theme:" in AN.
                </p>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary">Can I Plan Future Events?</h3>
                  <p class="text-sm text-bd-text-secondary mt-1">
                    You can use AN for <strong>immediate</strong> upcoming events. But you <em>cannot</em> steer the AI long-term, if it knows what's going to happen, 
                    it wants to <strong>jump the gun and do it NOW</strong>.
                  </p>
                </div>
              </div>
            </div>

            <!-- How AN Works Internally -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-pink/30">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Info class="w-4 h-4 text-bd-pink" />
                How Author's Note Works Under the Hood
              </h3>
              <div class="space-y-3 text-sm text-bd-text-secondary">
                <p>
                  Author's Note text is automatically wrapped in <code class="text-bd-pink">[ square brackets ]</code> before being sent to the AI. 
                  In the AI's training data, brackets were commonly used by authors to describe meta-information about their writing, 
                  so the AI interprets bracketed text as <strong>descriptive instructions</strong> rather than story text.
                </p>
                <p>
                  This means AN can be <strong>more technical and out-of-character</strong> than other plot components since it's instructions for the AI, not part of the story.
                </p>
              </div>
            </div>

            <!-- Best Practices Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Keep It Short</h4>
                <p class="text-xs text-bd-text-secondary">
                  <strong>3-4 sentences max.</strong> AN sits near the end of context where attention is highest, so overloading it makes the AI fixate on those details instead of the actual story.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">AN vs AI Instructions</h4>
                <p class="text-xs text-bd-text-secondary">
                  If AI Instructions is talking to customer support, Author's Note is <strong>"Can I speak to the manager?"</strong> Use AN when AI Instructions isn't enough.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Be Expressive</h4>
                <p class="text-xs text-bd-text-secondary">
                  "Fantasy story" is too simple. Instead: <code class="text-bd-green text-[10px]">Dark fantasy-horror story. World corrupted by evil magic. Rated T for violence.</code>
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Use Tags</h4>
                <p class="text-xs text-bd-text-secondary">
                  Tags work well in AN: <code class="text-bd-green text-[10px]">Tags: noblebright, magical, fantastical, fun</code> They're concise and model-friendly.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Story Cards -->
      <section id="guide-story-cards" class="card">
        <button
          @click="toggleGuideSection('story-cards')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-purple" />
            Story Cards (SC)
            <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Triggered Info</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('story-cards') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('story-cards')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Story Cards hold information that's relevant <strong>only when triggered</strong> by keywords. 
              Use them for characters, locations, and items you encounter as the story progresses.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Plus class="w-4 h-4 text-bd-purple" />
                  When to Create a Story Card
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-2">
                  <li class="flex items-start gap-2">
                    <Users class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Meet an interesting character
                  </li>
                  <li class="flex items-start gap-2">
                    <MapPin class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Discover a cool location
                  </li>
                  <li class="flex items-start gap-2">
                    <Sword class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Acquire a legendary item
                  </li>
                  <li class="flex items-start gap-2">
                    <Star class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    End an amazing scene you want remembered
                  </li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 text-bd-cyan" />
                  Maintenance
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  <strong>Update your SCs regularly</strong> to fit changes in your story.
                </p>
                <p class="text-sm text-bd-text-muted">
                  The more you wait, the more optimization you'll need later.
                </p>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <p class="text-sm text-bd-text-secondary">
                <strong class="text-bd-text-primary">Want more on Story Cards?</strong> Check out our 
                <router-link to="/story-cards" class="text-bd-accent-primary hover:underline">Story Cards Guide</router-link> 
                for detailed trigger mechanics and best practices.
              </p>
            </div>
          </div>
        </Transition>
      </section>
      <!-- AI Instructions -->
      <section id="guide-ai-instructions" class="card">
        <button
          @click="toggleGuideSection('ai-instructions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ScrollText class="w-5 h-5 text-bd-amber" />
            AI Instructions (AIN)
            <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Behavior Rules</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('ai-instructions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ai-instructions')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">
              AI Instructions hold <strong>global rules</strong> the AI follows while writing, style, pacing, behavior, and focus.
            </p>
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-sm text-bd-text-secondary">
                <router-link to="/ai-instructions" class="text-bd-accent-primary hover:underline font-medium">→ See the AI Instructions Guide</router-link> 
                for structuring tips, model settings, token optimization, and ready-to-use instruction sets.
              </p>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Memory Bank & Story Summary -->
      <section id="guide-memory-summary" class="card">
        <button
          @click="toggleGuideSection('memory-summary')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Database class="w-5 h-5 text-bd-cyan" />
            Memory Bank & Story Summary
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('memory-summary') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('memory-summary')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Memory System has two complementary features that work together, like how human memory combines a big-picture overview with specific detail recall.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Brain class="w-4 h-4 text-bd-green" />
                  Memory Bank
                  <span class="tag bg-bd-green/20 text-bd-green text-xs">Automated</span>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Stores important events and details as your story progresses. Acts like an <strong>automatic Story Card system</strong> that 
                  it saves details (your dog's name, where you found the Sword of Demons) and dynamically inserts them when relevant.
                </p>
                <p class="text-sm text-bd-text-muted mt-2">
                  Poorly phrased memories can cause confusion. If the AI misremembers events, 
                  <strong>review and edit your Memory Bank entries</strong> to fix the wording.
                </p>
              </div>
              
              <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ScrollText class="w-4 h-4 text-bd-cyan" />
                  Story Summary (Auto Summarization)
                  <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Improved</span>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Keeps a running overview of your plot by appending new memories to the Story Summary plot component, 
                  then periodically <strong>re-summarizing</strong> for conciseness. Helps the AI track the overall story direction.
                </p>
                <p class="text-sm text-bd-text-muted mt-2">
                  Still benefits from <strong>regular maintenance</strong>. Review periodically 
                  to remove outdated info and ensure accuracy.
                </p>
              </div>
            </div>

            <!-- How It Works -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <RefreshCw class="w-4 h-4 text-bd-blue" />
                How the Memory Cycle Works
              </h3>
              <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
                <li>After every <strong>4 actions</strong>, the system summarizes that batch into a new memory</li>
                <li>New memories are appended to the <strong>Story Summary</strong> plot component</li>
                <li>When the summary grows long, it's <strong>re-summarized</strong> by an AI model to stay concise</li>
                <li>The Memory Bank uses <strong>embedding vectors</strong> to match stored memories to your current action by relevance</li>
                <li>Relevant memories are dynamically included in context (up to ~25% of dynamic token budget)</li>
              </ol>
            </div>

            <!-- Token Budget Note -->
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong>Manual components still matter.</strong> The Memory System complements Plot Essentials and Story Cards but doesn't replace them. 
                  Plot Essentials are <em>always</em> included; Memory Bank entries are only included when relevant. Keep critical info in PE for guaranteed context.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Scene Transitions -->
      <section id="guide-scene-transitions" class="card">
        <button
          @click="toggleGuideSection('scene-transitions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-bd-purple" />
            Scene Transitions
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('scene-transitions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('scene-transitions')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              When transitioning to a new scene, write a <strong>longer input than usual</strong> to "set the scene", a paragraph 
              describing the new location, significance, or mood. This tells the AI what to focus on and helps it STOP obsessing 
              over the previous scene.
            </p>
            
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2">Scene Break Markers</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Most models understand using <code class="text-bd-green">---</code> or <code class="text-bd-green">***</code> 
                on a line by itself to denote a scene break:
              </p>
              <div class="p-3 rounded bg-bd-bg-primary font-mono text-sm text-bd-text-secondary">
                <div>Blah blah blah.</div>
                <div class="my-2 text-bd-amber">---</div>
                <div>The next morning, blah blah blah.</div>
              </div>
              <p class="text-xs text-bd-text-muted mt-3">
                These markers are common in training data. Tokenizers include many variations 
                (<code>---</code>, <code>------</code>, <code>--------------</code>) as single tokens.
              </p>
            </div>
            
            <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30">
              <div class="flex items-start gap-3">
                <Sparkles class="w-5 h-5 text-bd-accent-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary">BetterDungeon Feature</h3>
                  <p class="text-sm text-bd-text-secondary mt-1">
                    BetterDungeon's <strong>Markdown rendering</strong> automatically formats scene break markers 
                    (<code class="text-bd-green">---</code>, <code class="text-bd-green">***</code>) into styled horizontal 
                    dividers, making your story easier to read while keeping the raw markers intact for the AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Additional Tips -->
      <section id="guide-additional-tips" class="card">
        <button
          @click="toggleGuideSection('additional-tips')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-bd-amber" />
            Additional Coherence Tips
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('additional-tips') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('additional-tips')" class="mt-4">
            <div class="space-y-4">
          <!-- Be Terse -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Scissors class="w-4 h-4 text-bd-green" />
              Be Terse
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The more different info the AI has in context, the less it can use them efficiently. 
              <strong>Keep plot component entries short and focused.</strong>
            </p>
          </div>
          <!-- Make AI Remember -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <MessageCircle class="w-4 h-4 text-bd-blue" />
              Make the AI Remember Something
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Dialogue:</span>
                <code class="text-bd-green">"Hey, remember when [information]?"</code>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Action:</span>
                <code class="text-bd-green">> You remember/think about [information]</code>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Narrator:</span>
                <code class="text-bd-green">"[...] of course she knows about [information]"</code>
              </div>
            </div>
          </div>
          <!-- Avoid Confusing AI -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <XCircle class="w-4 h-4 text-bd-pink" />
              Avoid Confusing the AI
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Avoid flashbacks, dreams, and thought experiments. Once a memory is created, the AI often 
              <strong>can't distinguish what actually happened</strong> from what was imagined.
            </p>
          </div>
          <!-- Regular Updates -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <RefreshCw class="w-4 h-4 text-bd-cyan" />
              Regular Maintenance
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <strong>Remove</strong> anything you don't want referenced again</li>
              <li>• <strong>Update</strong> with new information as it develops</li>
              <li>• <strong>Remove</strong> info that was never mentioned, if it was needed, you'd have noticed it missing</li>
            </ul>
          </div>
          <!-- Edit Outputs -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Edit class="w-4 h-4 text-bd-amber" />
              Edit AI Outputs
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Edit the last AI output to fix mixed-up characters, add forgotten details, or set a different story direction. 
              The AI will catch on and follow the new path.
            </p>
          </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Common Pitfalls -->
      <section id="guide-common-pitfalls" class="card">
        <button
          @click="toggleGuideSection('common-pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('common-pitfalls') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-pitfalls')" class="mt-4">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Overloading Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">Stuffing PE with every detail about your world. The AI gets overwhelmed and you waste tokens.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Only include currently relevant info. Move situational details to Story Cards.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Never Updating Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Setting up PE and AN once and never touching them. Outdated info actively misleads the AI.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Review after major story events. Remove resolved plot threads, update character states.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Writing AN Like a Novel
                </h4>
                <p class="text-xs text-bd-text-secondary">Writing long, flowery Author's Notes with full paragraphs. AN should be short, dense, and technical.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Keep to 3-4 sentences. Use tags and keywords, not prose.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Duplicating Info Across Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Putting the same info in PE, AN, Story Cards, and AI Instructions. Wastes tokens and can cause weird emphasis.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Each piece of info belongs in ONE place. Use the right tool for the job.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Ignoring Memory Bank Errors
                </h4>
                <p class="text-xs text-bd-text-secondary">The automated Memory Bank can misphrase events. Left unchecked, wrong memories snowball into bigger issues.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Periodically review Memory Bank entries. Edit or delete inaccurate ones.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Using Negatives in PE
                </h4>
                <p class="text-xs text-bd-text-secondary">"Bob is NOT evil" but the AI often ignores "not" and treats Bob as evil. Negation is unreliable in all plot components.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use positive framing: "Bob is kind and trustworthy" or "Bob avoids violence."</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <!-- Credits -->
      <section id="guide-credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Users class="w-5 h-5 text-bd-amber" />
            Credits
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
            <div class="mb-4">
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who created PEs, SSs, and ANs, or created guides for them:
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
        </div>
      </div>
    </template>
    <!-- ==================== TEMPLATES TAB ==================== -->
    <template v-if="activeTab === 'templates'">
      <!-- Templates Introduction -->
      <div class="card bg-gradient-to-r from-bd-blue/10 to-bd-green/10 border-bd-blue/30 relative overflow-hidden animate-fade-in">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-blue via-bd-green to-bd-cyan" />
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
            <Layers class="w-6 h-6 text-bd-blue" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-bd-text-primary mb-1">Plot Component Templates</h2>
            <p class="text-sm text-bd-text-secondary">
              Ready-to-use templates for Author's Notes, Plot Essentials, and Story Summaries. 
              Copy, customize, and paste directly into your story.
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
      placeholder="Search templates..."
      :suggestions="searchSuggestions"
      :result-count="filteredTemplates.length"
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
        Showing {{ filteredTemplates.length }} of {{ templates.length }} templates
      </span>
    </div>
    <!-- Category Jump Navigation (default view - no filters active) -->
    <div v-if="!hasAnyFilters" class="sticky top-0 lg:top-0 bg-bd-bg-primary/95 backdrop-blur-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-2 border-b border-bd-border-subtle" style="z-index: var(--bd-z-sticky)">
      <div class="flex items-center gap-1">
        <button
          v-if="hasPrevCategory"
          @click="scrollToPrevCategory"
          class="flex-shrink-0 p-1 rounded-lg text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary transition-all"
          aria-label="Previous category"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>
        <div class="flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span class="text-xs text-bd-text-muted font-medium whitespace-nowrap flex-shrink-0">Jump to:</span>
          <button
            v-for="cat in jumpCategories"
            :key="'jump-' + cat.id"
            @click="scrollToCategory(cat.id)"
            class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
            :class="activeCategoryId === cat.id 
              ? cat.bgClass + ' ' + cat.textClass
              : 'text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary'"
          >
            <component :is="cat.icon" class="w-3 h-3" />
            {{ cat.name }}
            <span class="opacity-60">({{ cat.count }})</span>
          </button>
        </div>
        <button
          v-if="hasNextCategory"
          @click="scrollToNextCategory"
          class="flex-shrink-0 p-1 rounded-lg text-bd-text-muted hover:text-bd-text-secondary hover:bg-bd-bg-tertiary transition-all"
          aria-label="Next category"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Category Sections (default view) -->
    <div v-if="!hasAnyFilters" class="space-y-8">
      <!-- Author's Note Section -->
      <section id="category-authors-note" :ref="el => setCategoryRef('authors-note', el)">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
            <Feather class="w-4 h-4 text-bd-purple" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Author's Note</h3>
            <p class="text-xs text-bd-text-muted">Strongest influence. Style, tone, and scene guidance.</p>
          </div>
          <span class="ml-auto tag">{{ authorsNoteComponents.length }}</span>
        </div>
        
        <div class="grid gap-3">
          <ResourceCard 
            v-for="component in authorsNoteComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </section>
      <!-- Plot Essentials Section -->
      <section id="category-plot-essentials" :ref="el => setCategoryRef('plot-essentials', el)">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
            <BookMarked class="w-4 h-4 text-bd-green" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Plot Essentials</h3>
            <p class="text-xs text-bd-text-muted">Always-relevant info: characters, relationships, world state.</p>
          </div>
          <span class="ml-auto tag">{{ plotEssentialsComponents.length }}</span>
        </div>
        
        <div class="grid gap-3">
          <ResourceCard 
            v-for="component in plotEssentialsComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </section>
      <!-- Story Summary Section -->
      <section id="category-story-summary" :ref="el => setCategoryRef('story-summary', el)">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-cyan/20 flex items-center justify-center">
            <ScrollText class="w-4 h-4 text-bd-cyan" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Story Summary</h3>
            <p class="text-xs text-bd-text-muted">Track overall direction, arcs, and long-term goals.</p>
          </div>
          <span class="ml-auto tag">{{ storySummaryComponents.length }}</span>
        </div>
        
        <div class="grid gap-3">
          <ResourceCard 
            v-for="component in storySummaryComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </section>
      <!-- NSFW Section -->
      <section v-if="nsfwComponents.length > 0" id="category-nsfw" :ref="el => setCategoryRef('nsfw', el)">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-red/20 flex items-center justify-center">
            <Flame class="w-4 h-4 text-bd-red" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
              NSFW / Adult
              <Lock v-if="!nsfwVerified" class="w-3.5 h-3.5 text-bd-red" />
            </h3>
            <p class="text-xs text-bd-text-muted">Templates for adult content and intimate scenes. 18+ only.</p>
          </div>
          <span class="ml-auto tag bg-bd-red/20 text-bd-red">{{ nsfwComponents.length }}</span>
        </div>
        
        <!-- Locked State -->
        <div v-if="!nsfwVerified" class="relative">
          <div class="space-y-3 filter blur-sm pointer-events-none select-none">
            <div v-for="i in Math.min(3, nsfwComponents.length)" :key="i" class="card bg-bd-bg-tertiary/50 p-4">
              <div class="h-4 bg-bd-bg-elevated rounded w-3/4 mb-2"></div>
              <div class="h-3 bg-bd-bg-elevated rounded w-1/2"></div>
            </div>
          </div>
          <div class="absolute inset-0 flex items-center justify-center">
            <button 
              @click="showAgeVerification = true"
              class="flex items-center gap-2 px-4 py-2 rounded-xl bg-bd-red/20 border border-bd-red/30 text-bd-red hover:bg-bd-red/30 transition-colors"
            >
              <Lock class="w-4 h-4" />
              <span class="font-medium">Click to verify age (18+)</span>
            </button>
          </div>
        </div>
        
        <!-- Unlocked State -->
        <div v-else class="grid gap-3">
          <ResourceCard 
            v-for="component in nsfwComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </section>
    </div>
    <!-- Filtered Results -->
    <div v-if="hasAnyFilters" class="grid gap-3">
      <ResourceCard 
        v-for="template in filteredTemplates" 
        :key="template.id"
        :resource="template"
      />
      
      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="text-center py-12">
        <FileText class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No templates found</h3>
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
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Templates</h3>
          <p class="text-bd-text-secondary mb-4">
            Created a Plot Essential, Story Summary, or Author's Note that works well? Help the community by sharing it by pasting it in a GitHub issue.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <GitPullRequest class="w-4 h-4" />
            Submit a Template
          </router-link>
        </div>
      </div>
    </section>

    </template>
    <!-- ==================== BUILDER TAB ==================== -->
    <template v-if="activeTab === 'builder'">
      <PlotComponentBuilder />
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
                I'm 18+ - Continue
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import PlotComponentBuilder from '@/components/ui/PlotComponentBuilder.vue'
import { 
  TEMPLATES, 
  TEMPLATE_CATEGORIES,
  getEssentialTemplates,
  getStarterSet,
  getHighImpactTemplates
} from '@/data/plotComponents'
import { searchCollectionWithScores } from '@/data/shared'
import { PLOT_COMPONENTS_CONTRIBUTORS as plotComponentsContributors } from '@/data/contributors'
import { usePreferences } from '@/composables/usePreferences'
import { 
  Bookmark, Info, MapPin, FileText, Feather, BookMarked, ScrollText, 
  Lightbulb, Check, BookOpen, Layers, HelpCircle, User, Globe, Plus,
  Users, Sword, Star, RefreshCw, MessageSquare, Heart, Volume2, Ruler,
  Rocket, Focus, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, Scissors, MessageCircle, XCircle, Edit, SlidersHorizontal, Zap, Search,
  ExternalLink, Award, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Flame, ShieldAlert, Lock, GitPullRequest,
  Hammer
} from 'lucide-vue-next'
const route = useRoute()
const { preferences, verifyAge, addToSearchHistory } = usePreferences()
const activeTab = ref('templates')
// Get unique tags for search suggestions
const searchSuggestions = computed(() => {
  const allTags = [...new Set(templates.value.flatMap(t => t.tags || []))]
  return allTags.slice(0, 20)
})
const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}
const tabs = [
  { id: 'templates', label: 'Templates', icon: Layers },
  { id: 'builder', label: 'Builder', icon: Hammer },
]
const templates = ref(TEMPLATES)
const categories = ref(TEMPLATE_CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDifficulties = ref([])
const selectedImpacts = ref([])
const showFilters = ref(false)
const quickFilter = ref(null)
// NSFW Age Verification (uses persistent preference)
const nsfwVerified = computed(() => preferences.value.nsfwVerified)
const showAgeVerification = ref(false)
const pendingNsfwAction = ref(null)
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
// ===========================================
// GUIDE TABLE OF CONTENTS
// ===========================================
const guideSections = [
  { id: 'intro', label: 'Intro' },
  { id: 'plot-essentials', label: 'Plot Essentials' },
  { id: 'authors-note', label: "Author's Note" },
  { id: 'story-cards', label: 'Story Cards' },
  { id: 'ai-instructions', label: 'AI Instructions' },
  { id: 'memory-summary', label: 'Memory + Summary' },
  { id: 'scene-transitions', label: 'Scene Transitions' },
  { id: 'additional-tips', label: 'Additional Tips' },
  { id: 'common-pitfalls', label: 'Common Pitfalls' },
  { id: 'credits', label: 'Credits' }
]
const activeGuideSection = ref(guideSections[0]?.id || '')
let guideObserver = null
const expandedGuideSections = ref(new Set(guideSections.map(section => section.id)))
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
    activeGuideSection.value = sectionId
    if (!expandedGuideSections.value.has(sectionId)) {
      expandedGuideSections.value.add(sectionId)
      expandedGuideSections.value = new Set(expandedGuideSections.value)
    }
  }
}
const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.map(section => section.id))
}
const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
onMounted(() => {
  // Handle initial search query and tab from URL (e.g. from global search)
  if (route.query.tab && ['templates', 'builder'].includes(route.query.tab)) {
    activeTab.value = route.query.tab
  }
  if (route.query.q) {
    searchQuery.value = route.query.q
    // Ensure we're on the templates tab so filtered results are visible
    if (!route.query.tab) activeTab.value = 'templates'
  }

  guideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace('guide-', '')
          activeGuideSection.value = sectionId
        }
      })
    },
    { rootMargin: '0px 0px -70% 0px' }
  )
  guideSections.forEach((section) => {
    const element = document.getElementById(`guide-${section.id}`)
    if (element) {
      guideObserver.observe(element)
    }
  })

  // Initialize category observer if starting on templates tab
  if (activeTab.value === 'templates') {
    nextTick(() => {
      setupPlotCategoryObserver()
    })
  }
})
onBeforeUnmount(() => {
  if (guideObserver) {
    guideObserver.disconnect()
  }
  if (plotCategoryObserver) {
    plotCategoryObserver.disconnect()
  }
})
// Filter templates by category
const authorsNoteComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'authors-note')
)
const plotEssentialsComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'plot-essentials')
)
const storySummaryComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'story-summary')
)
const nsfwComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'nsfw')
)
const filteredTemplates = computed(() => {
  let result = [...templates.value]
  
  // Filter out NSFW unless verified OR explicitly selected in category filter
  const nsfwExplicitlySelected = selectedCategories.value.includes('nsfw')
  if (!nsfwVerified.value && !nsfwExplicitlySelected) {
    result = result.filter(t => t.category !== 'nsfw')
  }
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = getEssentialTemplates().filter(t => nsfwVerified.value || t.category !== 'nsfw')
  } else if (quickFilter.value === 'starter') {
    result = getStarterSet().filter(t => nsfwVerified.value || t.category !== 'nsfw')
  } else if (quickFilter.value === 'high-impact') {
    result = getHighImpactTemplates().filter(t => nsfwVerified.value || t.category !== 'nsfw')
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
    result = result.filter(t => selectedCategories.value.includes(t.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(t => selectedDifficulties.value.includes(t.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(t => selectedImpacts.value.includes(t.impact))
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
    selectedCategories.value = []
    selectedDifficulties.value = []
    selectedImpacts.value = []
  }
}
const toggleCategory = (categoryId) => {
  quickFilter.value = null
  
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
const toggleDifficulty = (difficultyId) => {
  quickFilter.value = null
  const index = selectedDifficulties.value.indexOf(difficultyId)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(difficultyId)
  }
}
const toggleImpact = (impactId) => {
  quickFilter.value = null
  const index = selectedImpacts.value.indexOf(impactId)
  if (index > -1) {
    selectedImpacts.value.splice(index, 1)
  } else {
    selectedImpacts.value.push(impactId)
  }
}
const clearFilters = () => {
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}
const clearAll = () => {
  searchQuery.value = ''
  clearFilters()
}

// --- Category jump navigation ---
const jumpCategories = computed(() => {
  const cats = [
    { id: 'authors-note', name: "Author's Note", icon: Feather, bgClass: 'bg-bd-purple/20', textClass: 'text-bd-purple', count: authorsNoteComponents.value.length },
    { id: 'plot-essentials', name: 'Plot Essentials', icon: BookMarked, bgClass: 'bg-bd-green/20', textClass: 'text-bd-green', count: plotEssentialsComponents.value.length },
    { id: 'story-summary', name: 'Story Summary', icon: ScrollText, bgClass: 'bg-bd-cyan/20', textClass: 'text-bd-cyan', count: storySummaryComponents.value.length },
  ]
  if (nsfwComponents.value.length > 0) {
    cats.push({ id: 'nsfw', name: 'NSFW / Adult', icon: Flame, bgClass: 'bg-bd-red/20', textClass: 'text-bd-red', count: nsfwComponents.value.length })
  }
  return cats.filter(c => c.count > 0)
})

const activeCategoryId = ref(null)
const categoryRefs = {}
let plotCategoryObserver = null

// Category arrow navigation
const activeCategoryIndex = computed(() => {
  const cats = jumpCategories.value
  if (!activeCategoryId.value || !cats.length) return -1
  return cats.findIndex(c => c.id === activeCategoryId.value)
})

const hasPrevCategory = computed(() => activeCategoryIndex.value > 0)
const hasNextCategory = computed(() => {
  const cats = jumpCategories.value
  return activeCategoryIndex.value < cats.length - 1
})

const scrollToPrevCategory = () => {
  const cats = jumpCategories.value
  const idx = activeCategoryIndex.value
  if (idx > 0) scrollToCategory(cats[idx - 1].id)
}

const scrollToNextCategory = () => {
  const cats = jumpCategories.value
  const idx = activeCategoryIndex.value
  if (idx < cats.length - 1) scrollToCategory(cats[idx + 1].id)
}

const setCategoryRef= (categoryId, el) => {
  if (el) categoryRefs[categoryId] = el
}

const scrollToCategory = (categoryId) => {
  const el = categoryRefs[categoryId]
  if (!el) return
  const offset = 56
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  activeCategoryId.value = categoryId
}

const setupPlotCategoryObserver = () => {
  if (plotCategoryObserver) plotCategoryObserver.disconnect()

  plotCategoryObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id?.replace('category-', '')
          if (id) activeCategoryId.value = id
        }
      }
    },
    { rootMargin: '-60px 0px -70% 0px', threshold: 0 }
  )

  Object.values(categoryRefs).forEach(el => {
    if (el) plotCategoryObserver.observe(el)
  })
}

watch([() => activeTab.value, jumpCategories], ([tab]) => {
  if (tab === 'templates') {
    nextTick(() => {
      setupPlotCategoryObserver()
    })
  } else {
    if (plotCategoryObserver) plotCategoryObserver.disconnect()
  }
})
</script>

<style scoped>
/* === Hero background === */
.plot-hero {
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

.hero-orb--blue {
  width: 220px;
  height: 220px;
  background: var(--bd-blue);
  top: -40px;
  right: -20px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--green {
  width: 160px;
  height: 160px;
  background: var(--bd-green);
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
