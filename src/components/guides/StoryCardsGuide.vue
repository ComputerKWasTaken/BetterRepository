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
            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Story Cards are <strong>Dynamic Elements</strong>, sharing the 30% dynamic token budget with Memory Bank entries and action history. They get roughly <strong>~25% of dynamic tokens</strong>. Cards are ranked by recency and frequency of trigger matches, with frequently referenced cards being prioritized.
                </p>
              </div>
            </div>
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
                  <li>• <strong>Zero effort</strong> - auto-stores events every 4 actions</li>
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
                  <h3 class="font-semibold text-bd-text-primary mb-1">Trigger Timing</h3>
                  <ol class="text-sm text-bd-text-secondary space-y-1 list-decimal list-inside">
                    <li><strong>Player input:</strong> Triggers immediately, so the AI can use the card info in its response.</li>
                    <li><strong>AI output:</strong> Triggers for the <em>next</em> response only. The same output that activates a card cannot use it.</li>
                  </ol>
                  <p class="text-xs text-bd-text-muted mt-2">The AI does not know Story Cards exist. It only sees Entry text labeled "World Lore:" when a card is active.</p>
                  <div class="mt-3 p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Trigger Evaluation Window</h4>
                    <div class="grid md:grid-cols-3 gap-2 text-xs text-bd-text-secondary">
                      <div>• <strong>Minimum:</strong> 4 recent actions are always checked for trigger matches</div>
                      <div>• <strong>Dynamic:</strong> If >500 tokens available for cards: (tokens ÷ 100) actions checked</div>
                      <div>• <strong>Example:</strong> 900 tokens available → 9 recent actions are scanned</div>
                    </div>
                    <p class="text-xs text-bd-text-muted mt-2">Once triggered, cards stay in context until pushed out by token limits. There's no fixed turn count, as frequently referenced cards are prioritized over older or less relevant ones.</p>
                  </div>
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

          <!-- Field Summary Table -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-3">Field Visibility Summary</h3>
            <div class="overflow-x-auto">
              <table class="w-full text-xs">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Field</th>
                    <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">AI Sees?</th>
                    <th class="text-left py-2 text-bd-text-primary font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 pr-4 font-medium">Entry</td>
                    <td class="py-2 pr-4 text-bd-green font-semibold">Yes (when triggered)</td>
                    <td class="py-2">Information shown to AI as "World Lore:"</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 pr-4 font-medium">Triggers</td>
                    <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                    <td class="py-2">Keywords that activate the card</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 pr-4 font-medium">Name/Title</td>
                    <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                    <td class="py-2">Your reference label only</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 pr-4 font-medium">Type</td>
                    <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                    <td class="py-2">Organization + Character Creator</td>
                  </tr>
                  <tr>
                    <td class="py-2 pr-4 font-medium">Notes</td>
                    <td class="py-2 pr-4 text-bd-pink font-semibold">No*</td>
                    <td class="py-2">Your private notes (*shown in Character Creator)</td>
                  </tr>
                </tbody>
              </table>
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

            <!-- Card Networks -->
            <div class="mb-6">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Card Networks & Chained Activation
              </h3>
              <div class="space-y-3">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/20">
                  <h4 class="text-xs font-semibold text-bd-purple mb-1">Reference Other Cards</h4>
                  <p class="text-xs text-bd-text-secondary">Mention one entity inside another card's Entry to encourage chained activation. If Card A is active and mentions Card B's name, the AI is more likely to output that name, triggering Card B next turn.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                  <h4 class="text-xs font-semibold text-bd-green mb-1">Embed Triggers in Plot Essentials</h4>
                  <p class="text-xs text-bd-text-secondary">Listing key entity names in Plot Essentials primes the AI to use those names. When the AI outputs them, their Story Cards trigger. Example: PE says "Friends: Joe, Dave" → AI mentions Joe → Joe's card activates.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/20">
                  <h4 class="text-xs font-semibold text-bd-blue mb-1">Parent-Child Relationships</h4>
                  <p class="text-xs text-bd-text-secondary">For complex entities: create a main card for the overall entity and sub-cards for specific details. The main card's Entry references sub-card triggers, creating a hierarchy.</p>
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

            <!-- Capitalization, Plurals & Stubbing Note -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle mb-6">
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                    <CaseSensitive class="w-3 h-3 text-bd-amber" /> Case Insensitive
                  </h4>
                  <p class="text-bd-text-secondary"><code>elf</code>, <code>Elf</code>, <code>ELF</code> all work the same.</p>
                </div>
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1">Plurals (Usually Free)</h4>
                  <p class="text-bd-text-secondary"><code>boat</code> → <code>boats</code> ✓ but <code>elf</code> → <code>elves</code> ✗. Add both if irregular.</p>
                </div>
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                    <Scissors class="w-3 h-3 text-bd-purple" /> Word Stubbing
                  </h4>
                  <p class="text-bd-text-secondary">Use <code class="text-bd-purple">therap</code> to catch therapy, therapist, therapeutic all at once.</p>
                </div>
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

      <!-- Tips & Pitfalls (merged from Balancing, Pro Tips, Common Mistakes) -->
      <section id="guide-tips-pitfalls" class="card">
        <button
          @click="toggleGuideSection('tips-pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips & Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('tips-pitfalls') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('tips-pitfalls')" class="mt-4 space-y-4">
            <!-- Token Budget & Key Facts -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Coins class="w-3 h-3 text-bd-blue" /> Token Budget
                </h4>
                <p class="text-xs text-bd-text-secondary">Story Cards get <strong>~25%</strong> of dynamic tokens (space after required elements). They're among the <strong>first removed</strong> when context is full.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <AlertTriangle class="w-3 h-3 text-bd-amber" /> Long Entries Get Partially Ignored
                </h4>
                <p class="text-xs text-bd-text-secondary">If an Entry is longer than the AI's output length, it will <strong>pick and choose</strong> which info to use from that card.</p>
              </div>
            </div>

            <!-- Quick Tips -->
            <div class="grid md:grid-cols-4 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Pencil class="w-3 h-3 text-bd-blue" /> Editable Anytime
                </h4>
                <p class="text-xs text-bd-text-secondary">Update cards at any time, even mid-adventure. Keep them current.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Download class="w-3 h-3 text-bd-green" /> Export & Import
                </h4>
                <p class="text-xs text-bd-text-secondary">Reuse cards across scenarios via export/import (browser only).</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Search class="w-3 h-3 text-bd-purple" /> Inspect Context
                </h4>
                <p class="text-xs text-bd-text-secondary">Use View Context to verify cards activate when expected.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Infinity class="w-3 h-3 text-bd-amber" /> No Card Limit
                </h4>
                <p class="text-xs text-bd-text-secondary">You can have thousands of cards in a single scenario.</p>
              </div>
            </div>

            <!-- Common Pitfalls Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Too-Short Triggers
                </h4>
                <p class="text-xs text-bd-text-secondary">"orc" or "cat" match unrelated words ("porch", "catalog").</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Use spacing (<code>orc </code>) or aim for 5+ characters.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Massive Entries
                </h4>
                <p class="text-xs text-bd-text-secondary">Entire backstories in one card. AI picks and chooses, missing key details.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Keep entries concise. Most important info at beginning and end.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Forgetting Title is Invisible
                </h4>
                <p class="text-xs text-bd-text-secondary">Card named "Amanda" but "Amanda" never appears in the Entry.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Always repeat the subject's name in the Entry itself.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Never Reviewing Cards
                </h4>
                <p class="text-xs text-bd-text-secondary">Outdated cards cause contradictions and waste tokens.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Review periodically. Remove dead characters, update relationships.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Spaces After Commas
                </h4>
                <p class="text-xs text-bd-text-secondary"><code>Amanda, daughter</code> - the space becomes part of the trigger.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> No spaces after commas: <code>Amanda,your daughter,mandy</code></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <X class="w-3 h-3" /> Duplicating Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">Same info in PE and Story Cards wastes tokens and causes weird emphasis.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> PE for always-relevant. Story Cards for situational lore only.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Card Generation -->
      <section id="guide-card-generation" class="card">
        <button
          @click="toggleGuideSection('card-generation')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-bd-green" />
            AI Card Generation
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('card-generation') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('card-generation')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              AI Dungeon can generate Story Card content using AI, streamlining the creation of characters, locations, and other elements.
            </p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Speed Create Mode</h4>
                <p class="text-xs text-bd-text-secondary">The "Finish" button becomes "Next," letting you save the current card and immediately create another of the same type. Useful for batch card creation.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Include Story Summary</h4>
                <p class="text-xs text-bd-text-secondary">When enabled, the generator considers your Story Summary, helping new cards fit the context of your existing story.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Log Generation in Notes</h4>
                <p class="text-xs text-bd-text-secondary">Every AI generation (including retries) is saved to the card's Notes field. Useful for comparing options and picking the best parts.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1">AI Instructions for Generator</h4>
                <p class="text-xs text-bd-text-secondary">Tell the generator what kind of card you want: style preferences, content guidelines, specific details. E.g., "Create a morally ambiguous character" or "Design a noir-style location."</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-xs text-bd-text-secondary">
                <strong class="text-bd-amber">Tip:</strong> AI-generated content is a starting point. Always edit for accuracy to your vision, remove irrelevant details, and add specific information the generator missed.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Import/Export -->
      <section id="guide-import-export" class="card">
        <button
          @click="toggleGuideSection('import-export')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Download class="w-5 h-5 text-bd-cyan" />
            Import & Export
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('import-export') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('import-export')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Story Cards can be exported to JSON and imported from JSON, enabling sharing, backup, and bulk management. <strong class="text-bd-warning">Web only</strong> as native iOS/Android apps do not support this feature.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2">JSON Format</h3>
              <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green overflow-x-auto">
                <div>[{</div>
                <div>&nbsp;&nbsp;"keys": "Marcus,Sir Marcus,the knight",</div>
                <div>&nbsp;&nbsp;"value": "Sir Marcus is a veteran knight...",</div>
                <div>&nbsp;&nbsp;"type": "character",</div>
                <div>&nbsp;&nbsp;"title": "Sir Marcus",</div>
                <div>&nbsp;&nbsp;"description": "Optional notes"</div>
                <div>}]</div>
              </div>
              <p class="text-xs text-bd-text-muted mt-2">Only <code class="text-bd-green">keys</code> (triggers) and <code class="text-bd-green">value</code> (entry) are required.</p>
            </div>
            <div class="p-4 rounded-lg bg-bd-warning/10 border border-bd-warning/30">
              <div class="flex items-start gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-warning flex-shrink-0 mt-0.5" />
                <div class="text-xs text-bd-text-secondary">
                  <p class="font-semibold text-bd-warning">Importing replaces ALL existing cards</p>
                  <p class="mt-1">This is not a merge. To add cards without losing existing ones: export first, add new cards to the JSON, then import the combined file.</p>
                </div>
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
              <a href="https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs" target="_blank" class="btn btn-secondary text-xs">
                <FileText class="w-3 h-3" /> LewdLeah's AI Dungeon Docs
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
  CaseSensitive, Scissors, Quote, GitMerge, X,
  ChevronDown, ChevronUp, Info, MessageSquare,
  Brain, Coins, Sparkles
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-are', label: 'What Are Story Cards?' },
  { id: 'when-to-use', label: 'When to Use' },
  { id: 'vs-memory', label: 'Cards vs Memory Bank' },
  { id: 'how-it-works', label: 'How They Work' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'trigger-mastery', label: 'Trigger Mastery' },
  { id: 'tips-pitfalls', label: 'Tips & Pitfalls' },
  { id: 'card-generation', label: 'AI Card Generation' },
  { id: 'import-export', label: 'Import & Export' },
  { id: 'credits', label: 'Credits' }
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
