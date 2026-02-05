<template>
  <div class="space-y-8">
    <!-- Page Header — animated hero -->
    <header class="sc-hero relative overflow-hidden rounded-2xl py-10 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--purple" aria-hidden="true" />
      <div class="hero-orb hero-orb--cyan" aria-hidden="true" />

      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center animate-float flex-shrink-0">
          <Drama class="w-6 h-6 text-bd-purple" />
        </div>
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary tracking-tight">
            Story <span class="text-gradient">Cards</span>
          </h1>
          <p class="text-bd-text-secondary mt-1 leading-relaxed">
            Notes for the AI about characters, locations, concepts, and other elements of your story.
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

      <!-- What Are Story Cards -->
      <section id="guide-what-are" class="card">
        <button
          @click="toggleGuideSection('what-are')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-purple" />
            What Are Story Cards?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-are') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-are')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Story Cards are notes for the AI about characters, locations, concepts, or any other elements of your story. 
              The AI only consults them when they become relevant.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-sm text-bd-text-secondary">
                <strong class="text-bd-text-primary">Key concept:</strong> Their relevance is determined by keywords called 
                <strong class="text-bd-purple">triggers</strong>. Story Cards only go into context when activated because 
                their triggers occur in input or output, and they stay in context for a variable period depending on 
                context window size.
              </p>
            </div>
            <p class="text-sm text-bd-text-muted">
              Story Cards are one of several 
              <router-link to="/plot-components" class="text-bd-accent-primary hover:underline">Plot Components</router-link> 
              you can use to guide the AI.
            </p>
          </div>
        </Transition>
      </section>

      <!-- When to Use Story Cards -->
      <section id="guide-when-to-use" class="card">
        <button
          @click="toggleGuideSection('when-to-use')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            When Should I Use Story Cards?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('when-to-use') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('when-to-use')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              You don't have to use Story Cards to enjoy AI Dungeon; they're optional. But if you're willing to take 
              the time to add them, they can help the AI maintain consistency and add depth to your story.
            </p>
            <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Camera class="w-4 h-4 text-bd-blue" />
              <h3 class="font-semibold text-bd-text-primary">Capturing Elements</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              As you play, you might encounter something intriguing. If you want the AI to remember it after 
              it scrolls out of context, create a Story Card with the important details.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Layers class="w-4 h-4 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary">Fleshing Out Elements</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              The AI might mention a person or place without detail. Create a Story Card to expand on it, 
              either writing details yourself or using the Story Card Generator.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Globe class="w-4 h-4 text-bd-purple" />
              <h3 class="font-semibold text-bd-text-primary">Preliminary Worldbuilding</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              Before playing, set up a story world filled with places, people, and concepts. Story Cards 
              ensure the AI has access to your custom worldbuilding.
            </p>
          </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Story Cards vs Memory Bank -->
      <section id="guide-vs-memory" class="card">
        <button
          @click="toggleGuideSection('vs-memory')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Scale class="w-5 h-5 text-bd-cyan" />
            Story Cards vs Memory Bank
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('vs-memory') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('vs-memory')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Memory Bank acts like an <strong>automatic Story Card system</strong>, so why create manual cards? Each has strengths.
            </p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-purple" />
                  Story Cards (Manual)
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-1.5">
                  <li>• <strong>You control</strong> exactly what's stored and when it triggers</li>
                  <li>• Precise keyword-based activation</li>
                  <li>• Perfect for pre-built worldbuilding and lore</li>
                  <li>• Won't contain phrasing errors</li>
                  <li>• Can be shared/exported across scenarios</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Brain class="w-4 h-4 text-bd-green" />
                  Memory Bank (Automatic)
                </h3>
                <ul class="text-xs text-bd-text-secondary space-y-1.5">
                  <li>• <strong>Zero effort</strong> — auto-stores events every 4 actions</li>
                  <li>• Uses embedding vectors for relevance matching</li>
                  <li>• Great for organic story events you didn't plan for</li>
                  <li>• May misphrase events (needs periodic review)</li>
                  <li>• Can't be pre-built for scenarios</li>
                </ul>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-secondary">
                <strong>Best approach:</strong> Use Story Cards for important, pre-planned lore (characters, locations, factions). 
                Let the Memory Bank handle organic events that emerge during play. Review Memory Bank periodically to fix errors.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- How Story Cards Work -->
      <section id="guide-how-it-works" class="card">
        <button
          @click="toggleGuideSection('how-it-works')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cog class="w-5 h-5 text-bd-blue" />
            How Story Cards Work
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('how-it-works') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('how-it-works')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              When a trigger word appears in the AI's output or the player's input, the corresponding Story Card's 
              Entry is added to context. Only the Entry is shown to the AI, prefaced by <code class="text-bd-purple">"World Lore:"</code>.
            </p>
            <div class="p-4 rounded-lg bg-bd-warning/10 border border-bd-warning/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-warning flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary mb-1">Important Timing Note</h3>
                  <p class="text-sm text-bd-text-secondary">
                    The AI <strong>does not know Story Cards exist</strong>. The same AI output that first activates 
                    a Card cannot use the information in that Card. For example, if "Amanda" triggers her Card, the 
                    AI won't have access to her info in that same output, only in subsequent ones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Anatomy of a Story Card -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileText class="w-5 h-5 text-bd-blue" />
            Anatomy of a Story Card
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <div class="flex items-start gap-3">
              <FileText class="w-4 h-4 text-bd-green mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Entry <span class="badge badge-popular ml-2">Most Important</span></h3>
                <p class="text-sm text-bd-text-secondary">
                  The core information sent to the AI when triggered. Use plain English with concise, 
                  clear sentences. This is prefaced with "World Lore:" when shown to the AI.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <div class="flex items-start gap-3">
              <Zap class="w-4 h-4 text-bd-purple mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Trigger <span class="badge badge-new ml-2">Critical</span></h3>
                <p class="text-sm text-bd-text-secondary">
                  Words or phrases that cause the Entry to be sent to the AI. Triggers are 
                  <strong>case-insensitive</strong> but <strong>sensitive to leading/trailing spaces</strong>.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Type class="w-4 h-4 text-bd-text-muted mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Title</h3>
                <p class="text-sm text-bd-text-secondary">
                  For your reference only. <span class="text-bd-warning">The AI does NOT see the Title</span>, 
                  so you must repeat the name in the Entry.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Tag class="w-4 h-4 text-bd-text-muted mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Type & Notes</h3>
                <p class="text-sm text-bd-text-secondary">
                  The AI ignores both. Only relevant for Character Creator scenarios.
                </p>
              </div>
            </div>
          </div>
          </div>
        </Transition>
      </section>

      <!-- Best Practices -->
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
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4">
            <!-- Composing Entries -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <FileText class="w-4 h-4 text-bd-green" />
                Composing Entries
              </h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>Use plain English with natural syntax. Short, simple, unambiguous sentences.</span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>Be brief to save context space. Story Cards are among the first elements removed when context is full.</span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Place the most important info at the beginning and end.</strong> The AI has a bias towards these positions.</span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>Mention and repeat the name of the thing you're describing. The AI doesn't see the Title!</span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>Avoid excessive physical description details unless relevant to the story.</span>
                </li>
              </ul>
            </div>
          </div>
        </Transition>

      </section>

      <!-- Trigger Mastery Section -->
      <section id="guide-trigger-mastery" class="card">
        <button
          @click="toggleGuideSection('trigger-mastery')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-purple" />
            Trigger Mastery
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('trigger-mastery') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('trigger-mastery')" class="mt-4">
            <p class="text-sm text-bd-text-muted mb-4">
              Deep dive into triggers based on <strong>GremmieGremlin</strong>'s comprehensive guide.
            </p>

            <!-- Spacing Matters -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Space class="w-4 h-4 text-bd-blue" />
                Understanding Spaces
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Spaces are <strong>critical</strong> in triggers. The AI reads these differently:
              </p>
              <div class="grid md:grid-cols-2 gap-3 mb-4">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-purple">elf</code>
                  <p class="text-xs text-bd-text-muted mt-1">No spaces - triggers on "shelf", "self", etc.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-purple"> elf</code>
                  <p class="text-xs text-bd-text-muted mt-1">Leading space - only triggers on " elf"</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-purple">elf </code>
                  <p class="text-xs text-bd-text-muted mt-1">Trailing space - only triggers on "elf "</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <code class="text-bd-purple"> elf </code>
                  <p class="text-xs text-bd-text-muted mt-1">Both - only triggers on " elf "</p>
                </div>
              </div>
            </div>

            <!-- Practical Recommendations -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Target class="w-4 h-4 text-bd-green" />
                Practical Recommendations
              </h3>
              <div class="space-y-3">
                <div class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>For <code>elf</code>: Use <code class="text-bd-purple"> elf</code> (space on left only). Words starting with "elf" are usually elf-related.</span>
                </div>
                <div class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>For <code>orc</code>: Use <code class="text-bd-purple">orc </code> (space on right only). Avoids "torch", "porch", "divorce".</span>
                </div>
                <div class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Minimum 5 characters</strong> recommended. 4 is okay if unique enough to avoid false positives.</span>
                </div>
                <div class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span>Format triggers as <code class="text-bd-purple">trigger1,trigger2,trigger3</code>, <strong>no spaces after commas</strong>.</span>
                </div>
              </div>
            </div>

            <!-- Capitalization & Pluralization -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <CaseSensitive class="w-4 h-4 text-bd-amber" />
                Capitalization & Pluralization
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-medium text-bd-text-primary mb-2">Case Insensitive</h4>
                  <p class="text-sm text-bd-text-secondary">
                    <code>elf</code>, <code>Elf</code>, and <code>ELF</code> all work the same. 
                    Capitalization doesn't matter.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-medium text-bd-text-primary mb-2">Plurals (Usually Free)</h4>
                  <p class="text-sm text-bd-text-secondary">
                    <code>boat</code> also triggers on <code>boats</code>. But <code>elf</code> won't trigger 
                    <code>elves</code>, add both if needed!
                  </p>
                </div>
              </div>
            </div>

            <!-- Word Stubbing -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Scissors class="w-4 h-4 text-bd-purple" />
                Word Stubbing (Pro Technique)
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Stub words to a common root to catch all variations with one trigger:
              </p>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <p class="text-sm text-bd-text-secondary">
                  Instead of <code>therapy,therapies,therapist,therapeutic</code>, just use 
                  <code class="text-bd-purple">therap</code>, it catches all of them!
                </p>
              </div>
            </div>

            <!-- Punctuation & Edge Cases -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Quote class="w-4 h-4 text-bd-blue" />
                Punctuation & Edge Cases
              </h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <AlertTriangle class="w-4 h-4 text-bd-warning flex-shrink-0 mt-0.5" />
                  <span>If trigger has space on left, <code>"elf</code> in dialogue <strong>won't trigger</strong>. Add <code class="text-bd-purple">"elf</code> as a separate trigger.</span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <AlertTriangle class="w-4 h-4 text-bd-warning flex-shrink-0 mt-0.5" />
                  <span>Apostrophes vary! The AI may use different symbols. For "Andover's Inn", add: <code class="text-bd-purple">Andover's,Andover's,Andoverʼs</code></span>
                </li>
                <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                  <AlertTriangle class="w-4 h-4 text-bd-warning flex-shrink-0 mt-0.5" />
                  <span>Hyphenated words: <code>Yellow-Dragon</code> is one word, so <code> Dragon</code> won't trigger on it.</span>
                </li>
              </ul>
            </div>

            <!-- Trigger Timing -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Clock class="w-4 h-4 text-bd-green" />
                Trigger Timing
              </h3>
              <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
                <p class="text-sm text-bd-text-secondary mb-2">
                  <strong>Two ways to trigger a Story Card:</strong>
                </p>
                <ol class="space-y-2 text-sm text-bd-text-secondary list-decimal list-inside">
                  <li><strong>Player input:</strong> Triggers immediately, used in the same response.</li>
                  <li><strong>AI output:</strong> Triggers for the <em>next</em> response only. The AI can't use the info in the same output that triggered it.</li>
                </ol>
              </div>
            </div>

            <!-- Cascading Cards -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Cascading Cards
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                You can create card networks where one card's Entry mentions another's trigger:
              </p>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-sm text-bd-text-secondary">
                  <strong>Example:</strong> "Alan" card mentions "Order of Flug" → AI outputs "Order of Flug" → 
                  That card activates <em>next turn</em>. Note: include key context in Alan's card too, so the AI 
                  understands his motivations even without the faction card.
                </p>
              </div>
            </div>

            <!-- Why False Triggers Matter -->
            <div>
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <X class="w-4 h-4 text-bd-error" />
                Why False Triggers Matter
              </h3>
              <div class="p-4 rounded-lg bg-bd-error/10 border border-bd-error/30">
                <p class="text-sm text-bd-text-secondary mb-2">
                  If <code>orc</code> triggers when your guy goes up on the <strong>porch</strong> to give his wife 
                  <strong>orchids</strong>, the AI might turn her into an orc! Irrelevant entries can quickly eat up 
                  context space and confuse the AI.
                </p>
                <p class="text-sm text-bd-text-muted mt-2">
                  <strong>Pro tip:</strong> Use <a href="https://www.merriam-webster.com/wordfinder/classic/contains/common/-1/a/1" 
                  target="_blank" class="text-bd-accent-primary hover:underline">Merriam-Webster's Word Finder</a> to check 
                  for words containing your trigger.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Balancing Information -->
      <section id="guide-balancing" class="card">
        <button
          @click="toggleGuideSection('balancing')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Scale class="w-5 h-5 text-bd-blue" />
            Balancing Information
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('balancing') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('balancing')" class="mt-4 space-y-4">
            <!-- Token Budget -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Coins class="w-4 h-4 text-bd-blue" />
                Token Budget
              </h3>
              <p class="text-sm text-bd-text-secondary">
                Story Cards share approximately <strong>~25%</strong> of the dynamic token budget (the space left after required elements). 
                They're among the <strong>first elements removed</strong> when context is full, so keeping entries concise is critical.
              </p>
            </div>

            <!-- Entry Length Warning -->
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary mb-1">Long Entries Get Partially Ignored</h3>
                  <p class="text-sm text-bd-text-secondary">
                    If an Entry is longer than the AI's output length, it will <strong>pick and choose</strong> which info to use. 
                    The AI won't talk about everything in a single Card for multiple outputs. Keep entries shorter than your response length setting.
                  </p>
                </div>
              </div>
            </div>

            <ul class="space-y-2">
              <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                <span>Aim for Story Cards to activate only when needed, not taking up space constantly. <strong>Proper names</strong> are the safest trigger type.</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                <span>More context window = more room for cards = they stay active longer.</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                <span>To temporarily disable a card, put gibberish in its trigger. Remember to change it back!</span>
              </li>
              <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
                <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                <span>Create <strong>card networks</strong>: have entries reference other cards' triggers so related lore cascades in naturally when needed.</span>
              </li>
            </ul>
          </div>
        </Transition>
      </section>

      <!-- Pro Tips -->
      <section id="guide-pro-tips" class="card">
        <button
          @click="toggleGuideSection('pro-tips')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-amber" />
            Pro Tips
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pro-tips') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pro-tips')" class="mt-4">
            <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Pencil class="w-4 h-4 text-bd-blue" />
              <h3 class="font-semibold text-bd-text-primary">Editable Anytime</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              Story Cards can be edited at any time, even after starting an adventure. Update them to reflect story changes.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Download class="w-4 h-4 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary">Export & Import</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              You can export and import Story Cards to use them in different scenarios (browser only).
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Search class="w-4 h-4 text-bd-purple" />
              <h3 class="font-semibold text-bd-text-primary">Inspect Context</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              Check if your Cards are activating correctly or triggering when they shouldn't. Common mistake: triggers that occur at wrong times.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <Infinity class="w-4 h-4 text-bd-amber" />
              <h3 class="font-semibold text-bd-text-primary">No Limit</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              You can have thousands of Story Cards in a single scenario. The limit is effectively limitless!
            </p>
          </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Common Mistakes -->
      <section id="guide-common-mistakes" class="card">
        <button
          @click="toggleGuideSection('common-mistakes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Mistakes
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('common-mistakes') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-mistakes')" class="mt-4">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Too-Short Triggers
                </h4>
                <p class="text-xs text-bd-text-secondary">Using 2-3 character triggers like "orc" or "cat" that match unrelated words ("porch", "catalog").</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Use spacing tricks (<code>orc </code>) or aim for 5+ character triggers. Check with a word finder tool.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Massive Entries
                </h4>
                <p class="text-xs text-bd-text-secondary">Writing entire backstories in a single card. The AI will pick and choose from long entries, missing important details.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Keep entries shorter than your response length. Put the most important info at the beginning and end.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Forgetting the Title is Invisible
                </h4>
                <p class="text-xs text-bd-text-secondary">Naming a card "Amanda" but never mentioning "Amanda" in the Entry. The AI only sees the Entry, not the Title.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Always repeat the subject's name in the Entry text itself.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Never Reviewing Cards
                </h4>
                <p class="text-xs text-bd-text-secondary">Creating cards early in the story and never updating them. Outdated info causes contradictions.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> Review cards periodically. Remove dead characters, update relationships, fix outdated details.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Spaces After Commas in Triggers
                </h4>
                <p class="text-xs text-bd-text-secondary">Writing <code>Amanda, daughter</code> instead of <code>Amanda,daughter</code>. The space becomes part of the trigger.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> No spaces after commas: <code>Amanda,your daughter,mandy</code></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Duplicating Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">Putting the same info in both PE and Story Cards. Wastes token budget and can cause weird emphasis.</p>
                <p class="text-xs text-bd-green mt-2"><strong>Fix:</strong> PE for always-relevant facts. Story Cards for situational lore that only matters when triggered.</p>
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
            <Info class="w-5 h-5 text-bd-amber" />
            Credits & Resources
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
            <div class="mb-4">
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who created the resources and guides to create, write, and use Story Cards:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in storyCardsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
                  {{ name }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
              </a>
            </div>
          </div>
        </Transition>
      </section>
        </div>
      </div>
    </template>

    <!-- ==================== EXAMPLES TAB ==================== -->
    <template v-if="activeTab === 'examples'">
      <!-- Templates Introduction -->
      <div class="card bg-gradient-to-r from-bd-purple/10 to-bd-green/10 border-bd-purple/30 relative overflow-hidden animate-fade-in">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-purple via-bd-green to-bd-cyan" />
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Layers class="w-6 h-6 text-bd-purple" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-bd-text-primary mb-1">Story Card Templates</h2>
            <p class="text-sm text-bd-text-secondary">
              Fill-in-the-blank templates for characters, locations, items, and more. 
              Customize triggers and entries to fit your story.
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
        placeholder="Search story cards..."
        :suggestions="searchSuggestions"
        :result-count="filteredCards.length"
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

          <!-- Type Filter -->
          <div>
            <h4 class="text-sm text-bd-text-muted mb-2">Type</h4>
            <div class="flex flex-wrap gap-2">
              <button 
                @click="toggleType('examples')"
                class="tag cursor-pointer transition-all"
                :class="selectedType === 'examples' 
                  ? 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30' 
                  : 'hover:bg-bd-tag-bg'"
              >
                Examples
              </button>
              <button 
                @click="toggleType('templates')"
                class="tag cursor-pointer transition-all"
                :class="selectedType === 'templates' 
                  ? 'bg-bd-green/20 text-bd-green border border-bd-green/30' 
                  : 'hover:bg-bd-tag-bg'"
              >
                Templates
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Results Summary -->
      <div class="flex items-center justify-between text-sm">
        <span class="text-bd-text-muted">
          Showing {{ filteredCards.length }} of {{ allCards.length }} cards
        </span>
      </div>

      <!-- Category Sections (default view) -->
      <div v-if="!hasAnyFilters" class="space-y-8">
        <!-- Templates Section -->
        <section>
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
              <FileText class="w-4 h-4 text-bd-green" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Story Card Templates</h3>
              <p class="text-xs text-bd-text-muted">Fill-in-the-blank templates to create your own cards.</p>
            </div>
            <span class="ml-auto tag">{{ templates.length }}</span>
          </div>
          
          <div class="grid gap-3">
            <StoryCardItem 
              v-for="card in templates" 
              :key="card.id"
              :card="card"
              type="template"
            />
          </div>
        </section>
      </div>

      <!-- Filtered Results -->
      <div v-if="hasAnyFilters" class="grid gap-3">
        <StoryCardItem 
          v-for="card in filteredCards" 
          :key="card.id"
          :card="card"
          :type="card.id.startsWith('template-') ? 'template' : 'example'"
        />
        
        <!-- Empty State -->
        <div v-if="filteredCards.length === 0" class="text-center py-12">
          <FileText class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No cards found</h3>
          <p class="text-bd-text-secondary">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button @click="clearAll" class="btn btn-secondary mt-4">
            Clear Search & Filters
          </button>
        </div>
      </div>

      <!-- Key Takeaways -->
      <section v-if="!hasAnyFilters" class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
        <div class="flex items-start gap-3">
          <Lightbulb class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
          <div>
            <h3 class="font-semibold text-bd-text-primary mb-2">Key Takeaways</h3>
            <ul class="space-y-1 text-sm text-bd-text-secondary">
              <li>• <strong>Prose style:</strong> Written in natural English, not bullet points</li>
              <li>• <strong>Name repetition:</strong> The subject's name is mentioned throughout the Entry</li>
              <li>• <strong>Specific details:</strong> Visual descriptions, behaviors, and context are included</li>
              <li>• <strong>Simple triggers:</strong> Usually just the proper name of the subject</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Contribute CTA -->
      <section v-if="!hasAnyFilters" class="card-elevated">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
            <GitPullRequest class="w-6 h-6 text-bd-accent-primary" />
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Improve Our Templates</h3>
            <p class="text-bd-text-secondary mb-4">
              Story Cards are deeply personal to each scenario. If you refine a template or make it clearer, submit the revision so we can improve the shared template library.
            </p>
            <router-link to="/contribute" class="btn btn-primary">
              <GitPullRequest class="w-4 h-4" />
              Submit a Template Revision
            </router-link>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StoryCardItem from '@/components/ui/StoryCardItem.vue'
import SearchBar from '@/components/ui/SearchBar.vue'
import { usePreferences } from '@/composables/usePreferences'
import { 
  STORY_CARDS, 
  STORY_CARD_TEMPLATES,
  STORY_CARD_CATEGORIES,
  getEssentialExamples,
  getEssentialTemplates,
  getStarterExamples,
  getStarterTemplates,
  getHighImpactExamples,
  getHighImpactTemplates
} from '@/data/storyCards'
import { searchCollectionWithScores } from '@/data/shared'
import { 
  Drama, Users, MapPin, Shield, Sparkles, Layers, GitPullRequest,
  HelpCircle, Lightbulb, Camera, Globe, FileText, Tag, Type, Zap,
  StickyNote, Cog, AlertTriangle, Award, Check, Scale, Pencil,
  Download, Search, Infinity, ExternalLink, BookOpen, Space, Target,
  CaseSensitive, Scissors, Quote, Clock, GitMerge, X, Star, Rocket,
  SlidersHorizontal, ChevronDown, ChevronUp, Info, MessageSquare,
  Brain, Coins
} from 'lucide-vue-next'

const activeTab = ref('examples')

const tabs = [
  { id: 'examples', label: 'Templates', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

// Contributors for credits section
const storyCardsContributors = [
  'wanderingstar1', 'GremmieGremlin', 'Lavere', 'Le Onyx', 'Shiny'
]

const examples = ref(STORY_CARDS)
const templates = ref(STORY_CARD_TEMPLATES)
const categories = ref(STORY_CARD_CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDifficulties = ref([])
const selectedImpacts = ref([])
const selectedType = ref(null)
const showFilters = ref(false)
const quickFilter = ref(null)

const { addToSearchHistory } = usePreferences()

// Get unique tags for search suggestions
const searchSuggestions = computed(() => {
  const allTags = [...new Set(allCards.value.flatMap(c => c.tags || []))]
  return allTags.slice(0, 20)
})

const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}

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
  { id: 'what-are', label: 'What Are Story Cards?' },
  { id: 'when-to-use', label: 'When to Use' },
  { id: 'vs-memory', label: 'Cards vs Memory Bank' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'trigger-mastery', label: 'Trigger Mastery' },
  { id: 'balancing', label: 'Balancing Info' },
  { id: 'pro-tips', label: 'Pro Tips' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
  { id: 'credits', label: 'Credits' }
]

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

const allCards = computed(() => [...examples.value, ...templates.value])

const filteredCards = computed(() => {
  let result = [...allCards.value]
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = [...getEssentialExamples(), ...getEssentialTemplates()]
  } else if (quickFilter.value === 'starter') {
    result = [...getStarterExamples(), ...getStarterTemplates()]
  } else if (quickFilter.value === 'high-impact') {
    result = [...getHighImpactExamples(), ...getHighImpactTemplates()]
  }
  
  // Filter by type
  if (selectedType.value === 'examples') {
    result = result.filter(c => !c.id.startsWith('template-'))
  } else if (selectedType.value === 'templates') {
    result = result.filter(c => c.id.startsWith('template-'))
  }
  
  // Filter by search query using fuzzy search
  if (searchQuery.value) {
    const searchResults = searchCollectionWithScores(
      result,
      searchQuery.value,
      ['name', 'description', 'tags', 'entry'],
      { useTagAliases: true }
    )
    result = searchResults.map(r => r.item)
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(c => selectedCategories.value.includes(c.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(c => selectedDifficulties.value.includes(c.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(c => selectedImpacts.value.includes(c.impact))
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
  selectedImpacts.value.length > 0 ||
  selectedType.value !== null
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
    selectedType.value = null
  }
}

const toggleCategory = (categoryId) => {
  quickFilter.value = null
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
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

const toggleType = (type) => {
  quickFilter.value = null
  if (selectedType.value === type) {
    selectedType.value = null
  } else {
    selectedType.value = type
  }
}

const clearFilters = () => {
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  selectedType.value = null
  quickFilter.value = null
}

const clearAll = () => {
  searchQuery.value = ''
  clearFilters()
}
</script>

<style scoped>
/* === Hero background === */
.sc-hero {
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

.hero-orb--purple {
  width: 220px;
  height: 220px;
  background: #a855f7;
  top: -40px;
  right: -20px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--cyan {
  width: 160px;
  height: 160px;
  background: #06b6d4;
  bottom: -30px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}
</style>
