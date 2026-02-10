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
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline">Plot Components</router-link> 
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
                    The AI won't talk about everything in a single Card for multiple outputs.
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

    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { STORY_CARDS_CONTRIBUTORS as storyCardsContributors } from '@/data/contributors'
import { 
  Layers, HelpCircle, Lightbulb, Camera, Globe, FileText, Tag, Type, Zap,
  Cog, AlertTriangle, Award, Check, Scale, Pencil,
  Download, Search, Infinity, Space, Target,
  CaseSensitive, Scissors, Quote, Clock, GitMerge, X,
  ChevronDown, ChevronUp, Info, MessageSquare,
  Brain, Coins
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'what-are', label: 'What Are Story Cards?' },
  { id: 'when-to-use', label: 'When to Use' },
  { id: 'vs-memory', label: 'Cards vs Memory Bank' },
  { id: 'how-it-works', label: 'How They Work' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'trigger-mastery', label: 'Trigger Mastery' },
  { id: 'balancing', label: 'Balancing Info' },
  { id: 'pro-tips', label: 'Pro Tips' },
  { id: 'common-mistakes', label: 'Common Mistakes' },
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
  expandedGuideSections.value = new Set(guideSections.map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
