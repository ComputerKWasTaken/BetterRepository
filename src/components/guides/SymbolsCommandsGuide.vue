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
  <section id="guide-overview" class="card">
    <button 
      @click="toggleGuideSection('overview')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Info class="w-5 h-5 text-bd-amber" />
        Overview
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon's underlying AI models were trained on vast amounts of text that includes <strong>markdown, code, and structured formatting</strong>. Because of this, certain symbols and syntax patterns carry meaning to the AI even inside a plain-text adventure. Learning to use them gives you more precise control over the narrative.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Lightbulb class="w-4 h-4 text-bd-amber" />
              Why They Work
            </h3>
            <p class="text-xs text-bd-text-secondary">
              The AI recognizes markdown and structural formatting from its training data. Symbols like <code class="text-bd-amber">##</code>, <code class="text-bd-amber">[]</code>, and <code class="text-bd-amber">**</code> trigger learned associations with headings, annotations, and emphasis, giving you influence over how the AI interprets your input.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-bd-blue" />
              How to Use This Guide
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Each section below covers a specific symbol or syntax. You'll find what it does, why it works, and practical examples you can copy straight into AI Dungeon. Experiment and combine them to find what works best for your play style.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Keep in mind:</strong> These techniques work because of patterns in the AI's training data. Results may vary between models. None of these are "official" features of AI Dungeon; they're community-discovered tricks that leverage how language models process text.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== ## DOUBLE HASH ===================== -->
  <section id="guide-double-hash" class="card">
    <button 
      @click="toggleGuideSection('double-hash')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Hash class="w-5 h-5 text-bd-amber" />
        <code class="text-bd-amber text-lg">##</code> Double Hash (Direct Command)
        <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Most Effective</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('double-hash') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('double-hash')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The double hash <code class="text-bd-amber">##</code> acts as a <strong>direct command to the AI</strong>. It's considered the most effective single symbol for steering AI behavior. Place it at the start of a line followed by your instruction.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-amber" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            In markdown, <code>##</code> denotes a <strong>second-level heading</strong>, which the AI interprets as a new section of story or a high-level directive. It effectively tells the AI: "this is a new section heading; treat what follows as a major instruction." This is why <code>##</code> works better than <code>#</code> (too broad) or <code>###</code> (too specific) for commands.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Good Examples
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## The scene shifts to a dark forest</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## Write in a noir detective style</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## A new character enters the tavern</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="text-xs font-semibold text-bd-blue mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Best Used For
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>&#8226; Scene transitions and setting changes</li>
              <li>&#8226; Changing the AI's writing style mid-adventure</li>
              <li>&#8226; Introducing new plot elements or characters</li>
              <li>&#8226; Giving the AI strong narrative direction</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== [] SQUARE BRACKETS ===================== -->
  <section id="guide-square-brackets" class="card">
    <button 
      @click="toggleGuideSection('square-brackets')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Brackets class="w-5 h-5 text-bd-blue" />
        <code class="text-bd-blue text-lg">[ ]</code> Square Brackets (Author's Note)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('square-brackets') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('square-brackets')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Wrapping text in square brackets <code class="text-bd-blue">[ ]</code> tells the AI to <strong>keep something in mind</strong> without directly mentioning it in the story output. Think of it as a note from the author to the AI.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-blue" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            In the AI's training data, square brackets are commonly used as <strong>editorial annotations or author's notes</strong>, like <code>[Editor's note: ...]</code> or <code>[Translation: ...]</code>. The AI has learned that bracketed text is metadata, meaning it should be considered but not directly echoed in the narrative output.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Good Examples
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[The villain is secretly the hero's father]</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[This world has no magic; keep it realistic]</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[The tone should be melancholic and slow]</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="text-xs font-semibold text-bd-blue mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Best Used For
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>&#8226; Hidden story context the AI should remember</li>
              <li>&#8226; Setting genre or tone without narrating it</li>
              <li>&#8226; Keeping secrets from the visible story text</li>
              <li>&#8226; Background info the AI should factor in</li>
            </ul>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Don't combine multiple unrelated facts in a single set of brackets.</strong> Use <code class="text-bd-purple">{ }</code> curly braces instead when you need to group separate pieces of information, as the AI can mix things up inside a single bracket pair.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== {} CURLY BRACES ===================== -->
  <section id="guide-curly-braces" class="card">
    <button 
      @click="toggleGuideSection('curly-braces')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Braces class="w-5 h-5 text-bd-purple" />
        <code class="text-bd-purple text-lg">{ }</code> Curly Braces (Information Container)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('curly-braces') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('curly-braces')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Curly braces <code class="text-bd-purple">{ }</code> act as a <strong>container for structured information</strong>. They work similarly to square brackets but are better at keeping the AI from mixing up separate pieces of data, especially useful in Story Cards.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-purple" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            In programming and data formats (JSON, JavaScript, CSS), curly braces define <strong>distinct blocks or objects</strong>. The AI recognizes this structure from its training data and tends to treat content inside curly braces as a self-contained unit, helping to prevent information from bleeding between different entries.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Good Examples
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>{Character: Elara, Role: Healer, Trait: Cautious}</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>{Location: Iron Keep, Type: Fortress, Mood: Grim}</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>{Faction: Night Watch, Goal: Protect the wall}</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="text-xs font-semibold text-bd-purple mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Best Used For
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>&#8226; Grouping related attributes in Story Cards</li>
              <li>&#8226; Preventing data from bleeding between entries</li>
              <li>&#8226; Organizing complex world-building info</li>
              <li>&#8226; Keeping character stats separate from lore</li>
            </ul>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Note:</strong> Curly braces don't work perfectly all the time. The AI may still occasionally mix up information, but they perform better than square brackets when you need to keep multiple data blocks distinct within Story Cards.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== > GREATER THAN ===================== -->
  <section id="guide-greater-than" class="card">
    <button 
      @click="toggleGuideSection('greater-than')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ChevronRight class="w-5 h-5 text-bd-green" />
        <code class="text-bd-green text-lg">&gt;</code> Greater Than (Player Action)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('greater-than') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('greater-than')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The greater-than symbol <code class="text-bd-green">&gt;</code> is used as a <strong>player action marker</strong>. In AI Dungeon, it precedes your Do and Say inputs. While it doesn't do much on its own, it works together with AI Dungeon's input system to signal actions.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-green" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            In markdown, <code>&gt;</code> creates a <strong>blockquote</strong>. In interactive fiction and text adventures, it traditionally indicates player input. The AI has seen this convention throughout its training data and associates <code>&gt;</code> with a player taking an action, which helps it understand the boundary between narration and player input.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Example Usage
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>&gt; You draw your sword and face the dragon</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>&gt; You say "I'm not afraid of you!"</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="text-xs font-semibold text-bd-blue mb-2 flex items-center gap-1">
              <Info class="w-3 h-3" /> How It's Used
            </h4>
            <p class="text-xs text-bd-text-secondary">
              AI Dungeon automatically prepends <code>&gt;</code> to your <strong>Do</strong> and <strong>Say</strong> inputs. By itself, the symbol doesn't steer the AI, but combined with AI Dungeon's input system (AIN), it instructs the AI on what to do with the following token.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== '' SINGLE QUOTES ===================== -->
  <section id="guide-single-quotes" class="card">
    <button 
      @click="toggleGuideSection('single-quotes')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Quote class="w-5 h-5 text-bd-teal" />
        <code class="text-bd-teal text-lg">' '</code> Single Quotes (Emphasis)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('single-quotes') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('single-quotes')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Wrapping words in single quotes <code class="text-bd-teal">' '</code> adds <strong>emphasis</strong>, signaling to the AI that those words are particularly important or should be treated as a distinct term.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-teal" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            In written text, single quotes are used to highlight <strong>specific terms, titles, or concepts</strong> that deserve attention. The AI recognizes this convention and gives extra weight to quoted terms when generating its response.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Good Examples
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[The 'Crimson Order' are the antagonists]</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[Keep the tone 'dark' and 'mysterious']</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## Focus on 'survival' elements</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
            <h4 class="text-xs font-semibold text-bd-teal mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Best Used For
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>&#8226; Highlighting important names or terms</li>
              <li>&#8226; Emphasizing key concepts or themes</li>
              <li>&#8226; Drawing the AI's attention to specific words</li>
              <li>&#8226; Combining with other symbols for extra effect</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== ** BOLD/ASTERISKS ===================== -->
  <section id="guide-bold-asterisks" class="card">
    <button 
      @click="toggleGuideSection('bold-asterisks')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Bold class="w-5 h-5 text-bd-pink" />
        <code class="text-bd-pink text-lg">** **</code> Double Asterisks (Strong Emphasis)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('bold-asterisks') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('bold-asterisks')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Double asterisks <code class="text-bd-pink">**</code> around words provide <strong>strong emphasis</strong>, equivalent to bold in markdown. The AI interprets this as a signal that the wrapped text is especially important.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-pink" />
            Why It Works
          </h3>
          <p class="text-xs text-bd-text-secondary">
            <code>**text**</code> is the markdown syntax for <strong>bold text</strong>. The AI was extensively trained on markdown-formatted content and recognizes this as strong emphasis. While AI Dungeon's interface doesn't render the markdown visually, the AI still processes and respects the emphasis when generating output.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Check class="w-3 h-3" /> Good Examples
            </h4>
            <div class="space-y-2">
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[**Never** break character as the narrator]</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[The dragon is **immune** to fire attacks]</code></pre>
              <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## Write in **first person** perspective</code></pre>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Best Used For
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>&#8226; Emphasizing absolute rules or constraints</li>
              <li>&#8226; Highlighting critical character traits</li>
              <li>&#8226; Making key instructions stand out</li>
              <li>&#8226; Combining with <code>[]</code> or <code>##</code> for maximum impact</li>
            </ul>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Markdown in AI Dungeon:</strong> AI Dungeon's interface can't render markdown visually, so you won't see bold text. But the AI model itself fully understands markdown syntax. The emphasis is interpreted during text generation, not during display.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== OTHER MARKDOWN ===================== -->
  <section id="guide-other-markdown" class="card">
    <button 
      @click="toggleGuideSection('other-markdown')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <FileCode class="w-5 h-5 text-bd-cyan" />
        Other Markdown Elements
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('other-markdown') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('other-markdown')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Beyond the main symbols, <strong>other markdown elements</strong> can also influence the AI since it was trained on large amounts of markdown-formatted text. Here are a few additional patterns you can experiment with.
        </p>

        <div class="space-y-3">
          <!-- Single asterisk / italic -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <code class="text-bd-cyan font-bold text-sm">*text*</code>
              <span class="text-xs text-bd-text-muted">-</span>
              <h3 class="font-semibold text-bd-text-primary text-sm">Italic / Light Emphasis</h3>
            </div>
            <p class="text-xs text-bd-text-secondary">
              Single asterisks give a lighter emphasis than double. Useful for subtle hints or stylistic nudges. Think of it as whispering a suggestion to the AI rather than commanding it.
            </p>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-2"><code>[The mood is *unsettling* but not outright horror]</code></pre>
          </div>

          <!-- Dash lists -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <code class="text-bd-cyan font-bold text-sm">- item</code>
              <span class="text-xs text-bd-text-muted">-</span>
              <h3 class="font-semibold text-bd-text-primary text-sm">Dash Lists</h3>
            </div>
            <p class="text-xs text-bd-text-secondary">
              Markdown lists help organize information clearly for the AI. Use them in Story Cards or AI Instructions to present structured data the AI can parse easily.
            </p>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-2"><code>- Name: Kael
- Race: Elf
- Class: Ranger
- Personality: Stoic, loyal</code></pre>
          </div>

          <!-- Horizontal rule -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <div class="flex items-center gap-2 mb-2">
              <code class="text-bd-cyan font-bold text-sm">---</code>
              <span class="text-xs text-bd-text-muted">-</span>
              <h3 class="font-semibold text-bd-text-primary text-sm">Horizontal Rule (Section Break)</h3>
            </div>
            <p class="text-xs text-bd-text-secondary">
              Three dashes create a horizontal rule in markdown. The AI interprets this as a hard section break, which can help separate distinct blocks of information in Story Cards or instructions.
            </p>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary mt-2"><code>[Setting: Medieval Fantasy]
---
[Tone: Dark and gritty]</code></pre>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== COMBINING SYMBOLS ===================== -->
  <section id="guide-combining" class="card">
    <button 
      @click="toggleGuideSection('combining')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-amber" />
        Combining Symbols
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('combining') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('combining')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The real power comes from <strong>combining these symbols together</strong>. Each symbol has a different function, and stacking them can create stronger, more precise instructions for the AI.
        </p>

        <!-- Combination Examples -->
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm flex items-center gap-2">
              <code class="text-bd-amber">##</code> + <code class="text-bd-pink">**</code>
              <span class="text-xs text-bd-text-muted font-normal">Command + Strong Emphasis</span>
            </h3>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>## **Never** reveal the identity of the masked stranger</code></pre>
            <p class="text-xs text-bd-text-muted mt-2">A strong command with an emphasized absolute. The <code>##</code> makes it a directive, <code>**</code> reinforces the "never."</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm flex items-center gap-2">
              <code class="text-bd-blue">[]</code> + <code class="text-bd-teal">' '</code>
              <span class="text-xs text-bd-text-muted font-normal">Author's Note + Emphasis</span>
            </h3>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>[The 'Shadow Court' controls the kingdom from behind the scenes]</code></pre>
            <p class="text-xs text-bd-text-muted mt-2">A hidden note with an emphasized term. The AI will remember the Shadow Court's role without mentioning it directly.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm flex items-center gap-2">
              <code class="text-bd-purple">{}</code> + <code class="text-bd-pink">**</code> + <code class="text-bd-cyan">-</code>
              <span class="text-xs text-bd-text-muted font-normal">Container + Emphasis + Lists</span>
            </h3>
            <pre class="text-xs text-bd-text-secondary font-mono overflow-x-auto p-2 rounded bg-bd-bg-tertiary"><code>{
Character: **Sera**
- Role: Rogue Alchemist
- Trait: Paranoid, brilliant
- Secret: Knows the **true cause** of the plague
}</code></pre>
            <p class="text-xs text-bd-text-muted mt-2">A self-contained character block with emphasized key details. Great for Story Cards.</p>
          </div>
        </div>

        <!-- Quick Reference Table -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3">Quick Reference</h3>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-bd-text-secondary">
              <thead>
                <tr class="border-b border-bd-border-subtle">
                  <th class="text-left py-2 font-medium text-bd-text-primary">Symbol</th>
                  <th class="text-left py-2 font-medium text-bd-text-primary">Function</th>
                  <th class="text-left py-2 font-medium text-bd-text-primary">AI Interprets As</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-bd-border-subtle">
                <tr><td class="py-1.5 font-mono text-bd-amber">##</td><td>Direct command</td><td>Section heading / major directive</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-blue">[ ]</td><td>Keep in mind</td><td>Author's note / editorial annotation</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-purple">{ }</td><td>Info container</td><td>Structured data block / object</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-green">&gt;</td><td>Player action</td><td>Blockquote / player input marker</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-teal">' '</td><td>Emphasis</td><td>Notable term or concept</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-pink">** **</td><td>Strong emphasis</td><td>Bold / high importance</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-cyan">*text*</td><td>Light emphasis</td><td>Italic / subtle suggestion</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-cyan">- item</td><td>List item</td><td>Structured list entry</td></tr>
                <tr><td class="py-1.5 font-mono text-bd-cyan">---</td><td>Section break</td><td>Hard content separator</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TIPS ===================== -->
  <section id="guide-tips" class="card">
    <button 
      @click="toggleGuideSection('tips')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Lightbulb class="w-5 h-5 text-bd-green" />
        Tips &amp; Best Practices
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tips') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('tips')" class="mt-4 space-y-4">
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Zap class="w-3 h-3 text-bd-amber" /> Start With <code class="text-bd-amber">##</code>
            </h4>
            <p class="text-xs text-bd-text-secondary">If you only learn one symbol, make it the double hash. It's the most powerful single tool for directing the AI's behavior.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Layers class="w-3 h-3 text-bd-purple" /> Don't Overdo It
            </h4>
            <p class="text-xs text-bd-text-secondary">Using too many symbols at once can confuse the AI. Keep it clean and purposeful. One or two combined symbols per instruction is ideal.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Braces class="w-3 h-3 text-bd-purple" /> Use <code class="text-bd-purple">{}</code> for Story Cards
            </h4>
            <p class="text-xs text-bd-text-secondary">When writing Story Cards with multiple entries, wrap each block in curly braces to keep the AI from mixing up different characters, locations, or factions.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <AlertTriangle class="w-3 h-3 text-bd-amber" /> Results May Vary
            </h4>
            <p class="text-xs text-bd-text-secondary">Different AI models respond differently to these symbols. What works great on one model might be less effective on another. Experiment and adapt.</p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <p class="text-xs text-bd-text-secondary">
            These symbols and tricks are <strong>community-discovered</strong> techniques that come from understanding how the AI's training data works. They aren't magic, they're just patterns the AI has learned to recognize. The more you experiment, the better you'll get at steering your adventures exactly where you want them.
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
            <MessageSquare class="w-3 h-3" /> AI Dungeon Discord
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
  Info, Lightbulb, Sparkles, Zap, AlertTriangle,
  BookOpen, MessageSquare, Hash, Bold, Quote, FileCode, Layers,
  Braces, Brackets, ChevronRight, Check,
  ChevronDown, ChevronUp
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-basics', label: 'Basics', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'double-hash', label: '## Double Hash' },
  { id: 'square-brackets', label: '[ ] Square Brackets' },
  { id: 'curly-braces', label: '{ } Curly Braces' },
  { id: 'header-more', label: 'More Symbols', isHeader: true },
  { id: 'greater-than', label: '> Greater Than' },
  { id: 'single-quotes', label: "' ' Single Quotes" },
  { id: 'bold-asterisks', label: '** Double Asterisks' },
  { id: 'other-markdown', label: 'Other Markdown' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'combining', label: 'Combining Symbols' },
  { id: 'tips', label: 'Tips & Best Practices' }
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
