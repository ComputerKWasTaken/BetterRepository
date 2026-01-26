<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center">
          <Drama class="w-5 h-5 text-bd-purple" />
        </div>
        Story Cards
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Notes for the AI about characters, locations, concepts, and other elements of your story.
      </p>
    </header>

    <!-- Navigation Tabs -->
    <div class="flex gap-2 border-b border-white/[0.06] pb-2 overflow-x-auto">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary text-white' 
          : 'text-bd-text-secondary hover:text-bd-text-primary hover:bg-white/5'"
      >
        <component :is="tab.icon" class="w-4 h-4 inline-block mr-2" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Guide Tab -->
    <template v-if="activeTab === 'guide'">
      <!-- What Are Story Cards -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-purple" />
          What Are Story Cards?
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Story Cards are notes for the AI about characters, locations, concepts, or any other elements of your story. 
          The AI only consults them when they become relevant.
        </p>
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <p class="text-sm text-bd-text-secondary">
            <strong class="text-bd-text-primary">Key concept:</strong> Their relevance is determined by keywords called 
            <strong class="text-bd-purple">triggers</strong>. Story Cards only go into context when activated because 
            their triggers occur in input or output, and they stay in context for a variable period depending on 
            context window size.
          </p>
        </div>
      </section>

      <!-- When to Use Story Cards -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Lightbulb class="w-5 h-5 text-bd-amber" />
          When Should I Use Story Cards?
        </h2>
        <p class="text-bd-text-secondary mb-4">
          You don't have to use Story Cards to enjoy AI Dungeon; they're optional. But if you're willing to take 
          the time to add them, they can help the AI maintain consistency and add depth to your story.
        </p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Camera class="w-4 h-4 text-bd-blue" />
              <h3 class="font-semibold text-bd-text-primary">Capturing Elements</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              As you play, you might encounter something intriguing. If you want the AI to remember it after 
              it scrolls out of context, create a Story Card with the important details.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Layers class="w-4 h-4 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary">Fleshing Out Elements</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              The AI might mention a person or place without detail. Create a Story Card to expand on it, 
              either writing details yourself or using the Story Card Generator.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
      </section>

      <!-- Anatomy of a Story Card -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <FileText class="w-5 h-5 text-bd-blue" />
          Anatomy of a Story Card
        </h2>
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-start gap-3">
              <Tag class="w-4 h-4 text-bd-text-muted mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Type</h3>
                <p class="text-sm text-bd-text-secondary">
                  Relevant for Character Creator scenarios (determines if Card is available for character selection). 
                  In other adventures, <span class="text-bd-text-muted">the AI ignores Type</span>.
                </p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-start gap-3">
              <StickyNote class="w-4 h-4 text-bd-text-muted mt-1 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Notes</h3>
                <p class="text-sm text-bd-text-secondary">
                  The AI ignores Notes. Only used in Character Creator scenarios as the description shown 
                  to players during character selection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- How Story Cards Work -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Cog class="w-5 h-5 text-bd-blue" />
          How Story Cards Work
        </h2>
        <div class="space-y-4">
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
                  AI won't have access to her info in that same output—only in subsequent ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Best Practices -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Award class="w-5 h-5 text-bd-amber" />
          Best Practices
        </h2>
        
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

      </section>

      <!-- Trigger Mastery Section -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Zap class="w-5 h-5 text-bd-purple" />
          Trigger Mastery
        </h2>
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
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <code class="text-bd-purple">elf</code>
              <p class="text-xs text-bd-text-muted mt-1">No spaces - triggers on "shelf", "self", etc.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <code class="text-bd-purple"> elf</code>
              <p class="text-xs text-bd-text-muted mt-1">Space before - won't trigger at start of lines or after quotes</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <code class="text-bd-purple">elf </code>
              <p class="text-xs text-bd-text-muted mt-1">Space after - won't trigger "elves" or "elfish"</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <code class="text-bd-purple"> elf </code>
              <p class="text-xs text-bd-text-muted mt-1">Both spaces - most restrictive, cleanest match</p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-warning/10 border border-bd-warning/30">
            <p class="text-sm text-bd-text-secondary">
              <strong class="text-bd-warning">Warning:</strong> A space on the left means it <strong>won't trigger</strong> 
              at the start of a new line or after quotation marks. <code>" elf"</code> won't trigger <code>"elf</code> in dialogue!
            </p>
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
              <span>Format triggers as <code class="text-bd-purple">trigger1,trigger2,trigger3</code> — <strong>no spaces after commas</strong>.</span>
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
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h4 class="font-medium text-bd-text-primary mb-2">Case Insensitive</h4>
              <p class="text-sm text-bd-text-secondary">
                <code>elf</code>, <code>Elf</code>, and <code>ELF</code> all work the same. 
                Capitalization doesn't matter.
              </p>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h4 class="font-medium text-bd-text-primary mb-2">Plurals (Usually Free)</h4>
              <p class="text-sm text-bd-text-secondary">
                <code>boat</code> also triggers on <code>boats</code>. But <code>elf</code> won't trigger 
                <code>elves</code> — add both if needed!
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
              <code class="text-bd-purple">therap</code> — it catches all of them!
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
      </section>

      <!-- Balancing Information -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Scale class="w-5 h-5 text-bd-blue" />
          Balancing Information
        </h2>
        <ul class="space-y-2">
          <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
            <span>Aim for Story Cards to activate only when needed, not taking up space constantly.</span>
          </li>
          <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
            <span>Create Card networks by having Cards refer to each other through Entry information.</span>
          </li>
          <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
            <span>If an Entry is very long, the AI might not relay all the information in a single output.</span>
          </li>
          <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
            <span>Context space is limited. More context = more room for cards = they stay active longer.</span>
          </li>
          <li class="flex items-start gap-2 text-sm text-bd-text-secondary">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
            <span>To temporarily disable a card, put gibberish in its trigger. Remember to change it back!</span>
          </li>
        </ul>
      </section>

      <!-- Pro Tips -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Lightbulb class="w-5 h-5 text-bd-amber" />
          Pro Tips
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Pencil class="w-4 h-4 text-bd-blue" />
              <h3 class="font-semibold text-bd-text-primary">Editable Anytime</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              Story Cards can be edited at any time, even after starting an adventure. Update them to reflect story changes.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Download class="w-4 h-4 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary">Export & Import</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              You can export and import Story Cards to use them in different scenarios (browser only).
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Search class="w-4 h-4 text-bd-purple" />
              <h3 class="font-semibold text-bd-text-primary">Inspect Context</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              Check if your Cards are activating correctly or triggering when they shouldn't. Common mistake: triggers that occur at wrong times.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-2 mb-2">
              <Infinity class="w-4 h-4 text-bd-amber" />
              <h3 class="font-semibold text-bd-text-primary">No Limit</h3>
            </div>
            <p class="text-sm text-bd-text-secondary">
              You can have thousands of Story Cards in a single scenario. The limit is effectively limitless!
            </p>
          </div>
        </div>
      </section>

      <!-- Credit -->
      <section class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
        <p class="text-sm text-bd-text-muted text-center">
          Guide based on the excellent work by <strong class="text-bd-text-secondary">wanderingstar1</strong> (Latitude Team).
          <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="text-bd-accent-primary hover:underline ml-1">
            Join the Discord
            <ExternalLink class="w-3 h-3 inline-block ml-1" />
          </a>
        </p>
      </section>
    </template>

    <!-- Examples Tab -->
    <template v-if="activeTab === 'examples'">
      <!-- Quick Filter Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="toggleQuickFilter('essential')"
          class="btn text-sm"
          :class="quickFilter === 'essential' ? 'btn-primary' : 'btn-secondary'"
        >
          <Star class="w-4 h-4" />
          Essential Only
        </button>
        <button 
          @click="toggleQuickFilter('starter')"
          class="btn text-sm"
          :class="quickFilter === 'starter' ? 'btn-primary' : 'btn-secondary'"
        >
          <Rocket class="w-4 h-4" />
          Starter Set
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
          Filters
          <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-bd-accent-primary"></span>
        </button>
      </div>

      <!-- Search Bar -->
      <div class="relative">
        <input 
          v-model="searchQuery"
          type="text"
          placeholder="Search examples and templates..."
          class="w-full bg-bd-bg-elevated border border-white/10 rounded-lg px-4 py-2.5 text-sm text-bd-text-primary placeholder-bd-text-muted outline-none focus:border-bd-accent-primary"
        />
      </div>

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
                class="tag cursor-pointer transition-all"
                :class="selectedCategories.includes(category.id) 
                  ? 'bg-bd-accent-primary/20 text-bd-accent-light border border-bd-accent-primary/30' 
                  : 'hover:bg-white/[0.12]'"
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
                  : 'hover:bg-white/[0.12]'"
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
                  : 'hover:bg-white/[0.12]'"
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
                  : 'hover:bg-white/[0.12]'"
              >
                Examples
              </button>
              <button 
                @click="toggleType('templates')"
                class="tag cursor-pointer transition-all"
                :class="selectedType === 'templates' 
                  ? 'bg-bd-green/20 text-bd-green border border-bd-green/30' 
                  : 'hover:bg-white/[0.12]'"
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
        <div class="flex items-center gap-2">
          <span class="text-bd-text-muted">Sort by:</span>
          <select 
            v-model="sortBy"
            class="bg-bd-bg-elevated border border-white/10 rounded-lg px-3 py-1.5 text-sm text-bd-text-primary outline-none focus:border-bd-accent-primary"
          >
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="impact">Impact (High→Low)</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>
      </div>

      <!-- Category Sections (default view) -->
      <div v-if="!hasAnyFilters" class="space-y-6">
        <!-- Examples Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
              <Layers class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Example Story Cards</h3>
              <p class="text-xs text-bd-text-muted">Real examples showing effective Story Card writing.</p>
            </div>
            <span class="ml-auto tag bg-bd-purple/20 text-bd-purple">{{ examples.length }}</span>
          </div>
          
          <div class="space-y-3">
            <StoryCardItem 
              v-for="card in examples" 
              :key="card.id"
              :card="card"
              type="example"
            />
          </div>
        </div>

        <!-- Templates Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
              <FileText class="w-4 h-4 text-bd-green" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Story Card Templates</h3>
              <p class="text-xs text-bd-text-muted">Fill-in-the-blank templates to create your own cards.</p>
            </div>
            <span class="ml-auto tag bg-bd-green/20 text-bd-green">{{ templates.length }}</span>
          </div>
          
          <div class="space-y-3">
            <StoryCardItem 
              v-for="card in templates" 
              :key="card.id"
              :card="card"
              type="template"
            />
          </div>
        </div>
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
            Try adjusting your search or filters.
          </p>
          <button @click="clearAll" class="btn btn-secondary mt-4">
            Clear Filters
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
            <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Story Cards</h3>
            <p class="text-bd-text-secondary mb-4">
              Have great Story Cards? Just paste them in a GitHub issue and I'll add them to the collection.
            </p>
            <router-link to="/contribute" class="btn btn-primary">
              <GitPullRequest class="w-4 h-4" />
              Submit Your Cards
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
import { 
  Drama, Users, MapPin, Shield, Sparkles, Layers, GitPullRequest,
  HelpCircle, Lightbulb, Camera, Globe, FileText, Tag, Type, Zap,
  StickyNote, Cog, AlertTriangle, Award, Check, Scale, Pencil,
  Download, Search, Infinity, ExternalLink, BookOpen, Space, Target,
  CaseSensitive, Scissors, Quote, Clock, GitMerge, X, Star, Rocket,
  SlidersHorizontal
} from 'lucide-vue-next'

const activeTab = ref('examples')

const tabs = [
  { id: 'examples', label: 'Examples & Templates', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
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
const sortBy = ref('name')
const quickFilter = ref(null)

const difficulties = [
  { id: 'beginner', label: 'Beginner', activeClass: 'bg-bd-green/20 text-bd-green border border-bd-green/30' },
  { id: 'intermediate', label: 'Intermediate', activeClass: 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30' },
  { id: 'advanced', label: 'Advanced', activeClass: 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30' }
]

const impacts = [
  { id: 'high', label: 'High Impact', activeClass: 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30' },
  { id: 'medium', label: 'Medium Impact', activeClass: 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30' },
  { id: 'low', label: 'Low Impact', activeClass: 'bg-white/20 text-bd-text-muted border border-white/20' }
]

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
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.description.toLowerCase().includes(query) ||
      c.tags.some(tag => tag.toLowerCase().includes(query)) ||
      c.entry.toLowerCase().includes(query)
    )
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
  
  // Sort
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'category') {
    result.sort((a, b) => a.category.localeCompare(b.category))
  } else if (sortBy.value === 'impact') {
    const impactOrder = { 'high': 0, 'medium': 1, 'low': 2 }
    result.sort((a, b) => (impactOrder[a.impact] || 3) - (impactOrder[b.impact] || 3))
  } else if (sortBy.value === 'difficulty') {
    const diffOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 }
    result.sort((a, b) => (diffOrder[a.difficulty] || 3) - (diffOrder[b.difficulty] || 3))
  }
  
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
