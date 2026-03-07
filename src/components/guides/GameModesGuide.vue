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

  <!-- ===================== OVERVIEW ===================== -->
  <section id="guide-modes-overview" class="card">
    <button 
      @click="toggleGuideSection('modes-overview')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Gamepad2 class="w-5 h-5 text-bd-amber" />
        Understanding Game Modes
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('modes-overview') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('modes-overview')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Actions are how you communicate with the AI in AI Dungeon. Each action type formats your input differently before sending it to the AI model, which affects how the AI interprets and responds to what you write. Choosing the right mode for each situation gives you maximum control over the narrative.
        </p>

        <div class="grid md:grid-cols-4 gap-3">
          <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-center">
            <div class="text-lg font-bold text-bd-amber mb-1">Do</div>
            <p class="text-[10px] text-bd-text-muted">Perform actions</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30 text-center">
            <div class="text-lg font-bold text-bd-blue mb-1">Say</div>
            <p class="text-[10px] text-bd-text-muted">Speak dialogue</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30 text-center">
            <div class="text-lg font-bold text-bd-purple mb-1">Story</div>
            <p class="text-[10px] text-bd-text-muted">Free-form narration</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-teal/10 border border-bd-teal/30 text-center">
            <div class="text-lg font-bold text-bd-teal mb-1">See</div>
            <p class="text-[10px] text-bd-text-muted">Generate images</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Tip:</strong> Varying between Do, Say, and Story encourages the AI to generate a wider variety of sentence types. If you only use Do and Say, the AI tends to start every sentence with "You".
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== DO MODE ===================== -->
  <section id="guide-do-mode" class="card">
    <button 
      @click="toggleGuideSection('do-mode')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Swords class="w-5 h-5 text-bd-amber" />
        Do Mode
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('do-mode') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('do-mode')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          In Do mode, anything you type is recognized as an <strong>action performed by your character</strong>. The AI reacts by generating the outcome of that action within the context of the story.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">How Do Mode Formats Your Input</h4>
          <ul class="text-xs text-bd-text-secondary space-y-2">
            <li>Adds <strong>"You"</strong> to the beginning of your input</li>
            <li>Converts first-person words (<code class="text-bd-amber">I, me, my, mine</code>) outside of quotes into second-person (<code class="text-bd-green">You, you, your, yours</code>)</li>
            <li>If you start with dialogue, "My", or write "You" yourself, the automatic "You" is <strong>not</strong> added</li>
            <li>With <strong>Third-Person</strong> plot component enabled, uses your character's name instead of "You"</li>
          </ul>
        </div>

        <!-- Examples -->
        <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Examples</h4>
        
        <div class="space-y-2">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/20">
            <div class="font-mono text-xs space-y-1">
              <div class="text-bd-text-muted">Input: <span class="text-bd-amber">Enter the throne room to tell the king of my discovery.</span></div>
              <div class="text-bd-text-muted">Sent to AI: <span class="text-bd-green">&gt; You enter the throne room to tell the king of your discovery.</span></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/20">
            <div class="font-mono text-xs space-y-1">
              <div class="text-bd-text-muted">Input: <span class="text-bd-amber">My heart hurts. "I can't believe this."</span></div>
              <div class="text-bd-text-muted">Sent to AI: <span class="text-bd-green">&gt; Your heart hurts. "I can't believe this."</span></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/20">
            <div class="font-mono text-xs space-y-1">
              <div class="text-bd-text-muted">Input: <span class="text-bd-amber">"She will not get away with this!" I raise my sword.</span></div>
              <div class="text-bd-text-muted">Sent to AI: <span class="text-bd-green">&gt; "She will not get away with this!" You raise your sword.</span></div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Pro Tip:</strong> Vary how you start your Do inputs. If every input starts with a simple action verb, the AI mirrors that pattern and produces repetitive outputs. Try starting with dialogue, descriptions, or combining actions.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SAY MODE ===================== -->
  <section id="guide-say-mode" class="card">
    <button 
      @click="toggleGuideSection('say-mode')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <MessageSquare class="w-5 h-5 text-bd-blue" />
        Say Mode
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('say-mode') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('say-mode')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Say mode adds <strong>"You say,"</strong> to the beginning of your input and wraps your text in quotation marks. It's essentially a <strong>shortcut for speech actions</strong> using Do mode.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">How Say Mode Formats Your Input</h4>
          <ul class="text-xs text-bd-text-secondary space-y-2">
            <li>Adds <strong>"You say,"</strong> to the beginning</li>
            <li>Wraps your text in <strong>quotation marks</strong> (unless you typed them yourself)</li>
            <li>The AI treats Say inputs similarly to Do inputs</li>
            <li>With <strong>Third-Person</strong> enabled, uses your character's name instead of "You"</li>
          </ul>
        </div>

        <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/20">
          <div class="font-mono text-xs space-y-1">
            <div class="text-bd-text-muted">Input: <span class="text-bd-blue">Where in the world did you come from?</span></div>
            <div class="text-bd-text-muted">Sent to AI: <span class="text-bd-green">&gt; You say, "Where in the world did you come from?"</span></div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <div class="flex items-start gap-2">
              <Lightbulb class="w-4 h-4 text-bd-blue flex-shrink-0 mt-0.5" />
              <p class="text-xs text-bd-text-secondary">
                <strong>Spice Up Dialogue:</strong> Use Do mode instead of Say to have more interesting speech tags &mdash; shout, cry, ponder, whisper, or combine actions while speaking.
              </p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <div class="flex items-start gap-2">
              <Lightbulb class="w-4 h-4 text-bd-blue flex-shrink-0 mt-0.5" />
              <p class="text-xs text-bd-text-secondary">
                <strong>Avoid Repetition:</strong> Vary your inputs between Do, Say, and Story. Only using Say leads to repetitive "You say" patterns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== STORY MODE ===================== -->
  <section id="guide-story-mode" class="card">
    <button 
      @click="toggleGuideSection('story-mode')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-bd-purple" />
        Story Mode
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('story-mode') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('story-mode')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Story mode gives you <strong>complete freedom</strong> to write and add text directly in your adventure. Unlike Do and Say, your inputs are <strong>not altered</strong> with "You" &mdash; what you type is what the AI sees. This is the most powerful and flexible mode.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">What Makes Story Mode Special</h4>
          <ul class="text-xs text-bd-text-secondary space-y-2">
            <li>Inputs are sent <strong>exactly as typed</strong> with minimal formatting (only adds a space)</li>
            <li>Story inputs are treated the <strong>same as AI outputs</strong> &mdash; no icon appears next to them</li>
            <li>Does <strong>NOT</strong> automatically change first-person to second-person</li>
            <li>Maximum input size is <strong>4000 characters</strong></li>
          </ul>
        </div>

        <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">What You Can Do With Story Mode</h4>

        <div class="space-y-3">
          <!-- Force events -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">Force Story Events</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
              <div class="text-bd-purple">You type: Then, the wise old man says to you,</div>
              <div class="text-bd-green">AI continues: "Ah... you're an adventurer, I see."</div>
            </div>
          </div>

          <!-- Different perspectives -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">Write From Different Perspectives</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
              <div class="text-bd-purple">You type: Gilbert gives you the stink-eye across the tavern.</div>
              <div class="text-bd-green">AI continues: He starts marching over to you with a determined look on his face.</div>
            </div>
          </div>

          <!-- Let AI finish -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">Let the AI Finish Your Sentences</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
              <div class="text-bd-purple">You type: You sweep your blade at the enemy, and shout,</div>
              <div class="text-bd-green">AI continues: "En garde you fiends! You'll never take me alive!!"</div>
            </div>
          </div>

          <!-- Tandem writing -->
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">Collaborative Prose Writing</h4>
            <p class="text-xs text-bd-text-secondary mb-2">Write full prose and the AI writes alongside you, like a tandem story. Great for standalone stories without "game" elements.</p>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs space-y-1">
              <div class="text-bd-purple">You type: "I stand before you not as a mere individual, but as a vessel of inspiration..."</div>
              <div class="text-bd-green">AI continues: "Life, my friends, is not just about reaching the destination; it's about savoring every step of the journey..."</div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <div class="flex items-start gap-2">
              <Lightbulb class="w-4 h-4 text-bd-purple flex-shrink-0 mt-0.5" />
              <p class="text-xs text-bd-text-secondary">
                <strong>Be detailed!</strong> Simple inputs get simple responses. The more creative and detailed you are, the better the AI's output.
              </p>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <div class="flex items-start gap-2">
              <AlertTriangle class="w-4 h-4 text-bd-purple flex-shrink-0 mt-0.5" />
              <p class="text-xs text-bd-text-secondary">
                <strong>POV Note:</strong> Story mode does NOT convert first-person to second-person. If staying in second-person, remember to write that way yourself.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SEE MODE ===================== -->
  <section id="guide-see-mode" class="card">
    <button 
      @click="toggleGuideSection('see-mode')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Image class="w-5 h-5 text-bd-teal" />
        See Mode: Image Generation
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('see-mode') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('see-mode')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          See mode lets you create and add <strong>AI-generated images</strong> to your Adventure during gameplay. Images don't affect the narrative &mdash; they're purely visual additions to enhance your storytelling experience.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Getting Started with See Mode</h4>
          <div class="space-y-2">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">1</span>
              <p class="text-xs text-bd-text-secondary">Set your <strong>Image Generator</strong> model via Settings &rarr; Gameplay &rarr; AI Models &rarr; Image Generator</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">2</span>
              <p class="text-xs text-bd-text-secondary">Open the <strong>Take a Turn</strong> input, use <code class="text-bd-teal">&gt;</code> to switch to <strong>See</strong> mode</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">3</span>
              <p class="text-xs text-bd-text-secondary">Type what you'd like to see, or <strong>leave blank</strong> for an auto-generated prompt based on recent context</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">4</span>
              <p class="text-xs text-bd-text-secondary">Submit using the <strong>picture icon</strong> on the right side of the input bar</p>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm flex items-center gap-2">
              <Share2 class="w-4 h-4 text-bd-text-muted" />
              Image Actions
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>Share</strong> &mdash; Generate a link to share outside AI Dungeon</li>
              <li><strong>Download</strong> &mdash; Save the image to your device</li>
              <li><strong>Delete</strong> &mdash; Remove the image (cannot be undone)</li>
              <li><strong>Retry Image</strong> &mdash; Re-generate (costs credits again)</li>
              <li><strong>Edit Prompt</strong> &mdash; Modify your text before retrying</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm flex items-center gap-2">
              <Info class="w-4 h-4 text-bd-text-muted" />
              Good to Know
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li>You <strong>own</strong> all images you generate</li>
              <li>Creating images usually requires <strong>Credits</strong></li>
              <li>Undo/Redo works with images like text</li>
              <li>Supports Unicode, emojis, and foreign languages</li>
              <li>Capitalization is ignored; punctuation may help</li>
            </ul>
          </div>
        </div>

        <!-- Prompt Engineering -->
        <div class="p-4 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
          <h4 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-teal" />
            Image Prompt Engineering
          </h4>
          <p class="text-xs text-bd-text-secondary mb-3">
            Build complex image prompts by combining these elements in order:
          </p>
          <div class="space-y-2">
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Medium</span>
              <span class="text-bd-text-secondary">a watercolor painting of...; a photo of...; an illustration of...</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Camera</span>
              <span class="text-bd-text-secondary">close up of...; overhead view of...; view from the river of...</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Modifiers</span>
              <span class="text-bd-text-secondary">dramatic, red, stone, glowing, ancient, ethereal</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Foreground</span>
              <span class="text-bd-text-secondary">ship, castle, dragon, warrior, crystal ball</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Background</span>
              <span class="text-bd-text-secondary">in the forest; on a beach; above the clouds</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Style</span>
              <span class="text-bd-text-secondary">art nouveau; cyberpunk; minimalist; dark and foreboding</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Quality</span>
              <span class="text-bd-text-secondary">beautiful, sharp, intricate, award winning, detailed</span>
            </div>
            <div class="grid grid-cols-[100px_1fr] gap-2 text-xs">
              <span class="font-semibold text-bd-teal">Artist</span>
              <span class="text-bd-text-secondary">by van Gogh; by Donato; by Tyler Edlin</span>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-teal flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Mix artist styles!</strong> Listing multiple artists lets the AI create something original. It may not have enough context about your subject to generate well in a single style, so combining styles often produces better results.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MODE COMPARISON ===================== -->
  <section id="guide-mode-comparison" class="card">
    <button 
      @click="toggleGuideSection('mode-comparison')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-cyan" />
        Mode Comparison & Best Practices
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('mode-comparison') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('mode-comparison')" class="mt-4 space-y-4">
        <!-- Comparison Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-bd-text-secondary">
            <thead>
              <tr class="border-b border-bd-border-subtle text-bd-text-muted text-left">
                <th class="py-2 pr-3 font-semibold">Feature</th>
                <th class="py-2 pr-3 font-semibold text-bd-amber">Do</th>
                <th class="py-2 pr-3 font-semibold text-bd-blue">Say</th>
                <th class="py-2 pr-3 font-semibold text-bd-purple">Story</th>
                <th class="py-2 font-semibold text-bd-teal">See</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-3 font-medium">Adds "You"</td>
                <td class="py-2 pr-3">Yes</td>
                <td class="py-2 pr-3">Yes ("You say,")</td>
                <td class="py-2 pr-3">No</td>
                <td class="py-2">N/A</td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-3 font-medium">Auto-converts POV</td>
                <td class="py-2 pr-3">Yes (1st &rarr; 2nd)</td>
                <td class="py-2 pr-3">Yes</td>
                <td class="py-2 pr-3">No</td>
                <td class="py-2">N/A</td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-3 font-medium">Shows icon</td>
                <td class="py-2 pr-3">Yes (Do icon)</td>
                <td class="py-2 pr-3">Yes (Say icon)</td>
                <td class="py-2 pr-3">No</td>
                <td class="py-2">Image</td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-3 font-medium">Best for</td>
                <td class="py-2 pr-3">Character actions</td>
                <td class="py-2 pr-3">Quick dialogue</td>
                <td class="py-2 pr-3">Narration, directing</td>
                <td class="py-2">Visualizing scenes</td>
              </tr>
              <tr>
                <td class="py-2 pr-3 font-medium">Max length</td>
                <td class="py-2 pr-3">4000 chars</td>
                <td class="py-2 pr-3">4000 chars</td>
                <td class="py-2 pr-3">4000 chars</td>
                <td class="py-2">Varies</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- When to use each -->
        <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">When to Use Each Mode</h4>
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h4 class="font-semibold text-bd-amber text-sm mb-1">Use Do when...</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Your character is performing a physical action</li>
              <li>You want the AI to describe consequences</li>
              <li>Combining actions with dialogue</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="font-semibold text-bd-blue text-sm mb-1">Use Say when...</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Quick, simple dialogue</li>
              <li>Asking NPCs questions</li>
              <li>Responding in conversation</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-purple text-sm mb-1">Use Story when...</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Writing narrative prose or scene descriptions</li>
              <li>Directing NPC actions or world events</li>
              <li>Providing detailed scene-setting</li>
              <li>Collaborative tandem storytelling</li>
            </ul>
          </div>
          <div class="p-3 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
            <h4 class="font-semibold text-bd-teal text-sm mb-1">Use See when...</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Visualizing a key scene or character</li>
              <li>Adding atmosphere to your adventure</li>
              <li>Creating art for published Scenarios</li>
            </ul>
          </div>
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
  Gamepad2, Swords, MessageSquare, BookOpen, Image, Layers,
  ChevronDown, ChevronUp, Info, Lightbulb, AlertTriangle, Sparkles,
  Share2
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'modes-overview', label: 'Understanding Game Modes' },
  { id: 'do-mode', label: 'Do Mode' },
  { id: 'say-mode', label: 'Say Mode' },
  { id: 'story-mode', label: 'Story Mode' },
  { id: 'header-advanced', label: 'Visual & Comparison', isHeader: true },
  { id: 'see-mode', label: 'See Mode: Image Generation' },
  { id: 'mode-comparison', label: 'Mode Comparison' }
]

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
