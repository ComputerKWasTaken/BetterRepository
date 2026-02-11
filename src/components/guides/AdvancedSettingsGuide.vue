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

  <!-- ===================== WHAT ARE ADVANCED SETTINGS ===================== -->
  <section id="guide-what-are" class="card">
    <button 
      @click="toggleGuideSection('what-are')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-amber" />
        What Are Advanced Settings?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-are') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('what-are')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Advanced Settings let you customize and control <strong>how AI responses are generated</strong> during gameplay. These options may vary across different models.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-bd-amber" />
              What They Control
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>• Randomness & creativity</li>
              <li>• Token selection pool</li>
              <li>• Repetition penalties</li>
              <li>• Response & context length</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Info class="w-4 h-4 text-bd-blue" />
              How It Works
            </h3>
            <p class="text-xs text-bd-text-secondary">
              The AI creates a list of all possible next tokens with probabilities, then selects from that list using random sampling. Advanced Settings change the <strong>non-random numbers</strong> in that calculation.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Settings class="w-4 h-4 text-bd-green" />
              How to Access
            </h3>
            <p class="text-xs text-bd-text-secondary">
              <strong>Adventure Settings → Advanced Settings</strong>. Available to all AI Dungeon players.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>This is complicated</strong>, so it's highly recommended that you experiment with each setting or ask for advice on the 
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="text-bd-accent-primary hover:underline font-medium">Discord</a>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTEXT LENGTH ===================== -->
  <section id="guide-context-length" class="card">
    <button 
      @click="toggleGuideSection('context-length')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-bd-blue" />
        Context Length
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-length') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-length')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Context Length determines the <strong>maximum number of tokens</strong> that can be sent to the AI model every turn. It's typically best to set this to the highest value so the AI always receives as much context about your Adventure as possible.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Layers class="w-4 h-4 text-bd-blue" />
            What's Included in Context
          </h3>
          <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
            <div>• <strong>Memory</strong> — persistent info you've set</div>
            <div>• <strong>Triggered Story Cards</strong> — active card entries</div>
            <div>• <strong>Author's Note</strong> — scene-level guidance</div>
            <div>• <strong>Model Instructions</strong> — AI behavior rules</div>
            <div>• <strong>Most recent input</strong> — your last action</div>
            <div>• <strong>Adventure text</strong> — fills remaining space</div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
              <Lightbulb class="w-3 h-3" /> Recommendation
            </h4>
            <p class="text-xs text-bd-text-secondary">Set to the <strong>highest value available</strong> for maximum coherence. More context = the AI remembers more of your story.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h4 class="text-xs font-semibold text-bd-amber mb-2 flex items-center gap-1">
              <AlertTriangle class="w-3 h-3" /> Notes
            </h4>
            <p class="text-xs text-bd-text-secondary">Context Length is determined by your <strong>membership tier</strong>. Not all models support larger context sizes. Subscribed players can spend 1 Credit per action to increase it temporarily.</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== RESPONSE LENGTH ===================== -->
  <section id="guide-response-length" class="card">
    <button 
      @click="toggleGuideSection('response-length')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <MessageSquare class="w-5 h-5 text-bd-green" />
        Response Length
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('response-length') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('response-length')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Response Length determines the <strong>maximum number of tokens the AI will output</strong> every turn. This is purely a matter of personal preference.
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Zap class="w-4 h-4 text-bd-green" />
              Short Responses
            </h3>
            <p class="text-xs text-bd-text-secondary">Quick to read, lets you jump in more often. Great for <strong>fast-paced, interactive</strong> play where you want tight control over the story.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-purple" />
              Long Responses
            </h3>
            <p class="text-xs text-bd-text-secondary">More immersive, fleshed-out scenes. Great for <strong>reading-heavy, narrative</strong> play where you want the AI to really develop moments.</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <p class="text-xs text-bd-text-secondary">
            <strong>Tip:</strong> Do whatever fits your play style! There's no wrong answer here — it's about how you like to experience your Adventure.
          </p>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TEMPERATURE ===================== -->
  <section id="guide-temperature" class="card">
    <button 
      @click="toggleGuideSection('temperature')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Thermometer class="w-5 h-5 text-bd-amber" />
        Temperature
        <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Most Impactful</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('temperature') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('temperature')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Temperature controls the <strong>randomness</strong> of the AI's responses. Higher = more creative and unpredictable. Lower = more consistent and focused.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30 text-center">
            <div class="text-2xl font-bold text-bd-blue mb-1">0.6</div>
            <div class="text-[10px] font-semibold text-bd-blue uppercase tracking-wider mb-1">Low</div>
            <p class="text-xs text-bd-text-secondary">Focused, predictable. Good if the AI is getting too wild.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30 text-center">
            <div class="text-2xl font-bold text-bd-green mb-1">0.8</div>
            <div class="text-[10px] font-semibold text-bd-green uppercase tracking-wider mb-1">Default</div>
            <p class="text-xs text-bd-text-secondary">Balanced creativity and coherence. A solid starting point.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-center">
            <div class="text-2xl font-bold text-bd-amber mb-1">1.2</div>
            <div class="text-[10px] font-semibold text-bd-amber uppercase tracking-wider mb-1">High</div>
            <p class="text-xs text-bd-text-secondary">Very creative, uncommon text. May produce surprising results.</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
          <div class="flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Warning:</strong> Increasing Temperature too high can lead to the AI picking outlandish or even <strong>gibberish tokens</strong>. If outputs stop making sense, lower this first.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TOP-K ===================== -->
  <section id="guide-top-k" class="card">
    <button 
      @click="toggleGuideSection('top-k')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ListFilter class="w-5 h-5 text-bd-purple" />
        Top-K
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('top-k') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('top-k')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Top-K limits the AI's choices to the <strong>K most likely tokens</strong> in its response. By narrowing the possibilities, Top-K helps maintain relevance and consistency.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Target class="w-4 h-4 text-bd-purple" />
            Example
          </h3>
          <p class="text-xs text-bd-text-secondary">
            If Top-K is set to <strong>20</strong>, the AI will only pick from the 20 most likely tokens every turn. This reduces randomness by <strong>excluding less likely options</strong> entirely.
          </p>
        </div>

        <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
          <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
            <Lightbulb class="w-3 h-3" /> When to Adjust
          </h4>
          <p class="text-xs text-bd-text-secondary">
            <strong>Lower values</strong> = more focused, predictable story progression. <strong>Higher values</strong> = more variety, but may include unlikely tokens. Works best <strong>in tandem with Top-P</strong>.
          </p>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TOP-P ===================== -->
  <section id="guide-top-p" class="card">
    <button 
      @click="toggleGuideSection('top-p')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <PieChart class="w-5 h-5 text-bd-teal" />
        Top-P
        <span class="tag bg-bd-teal/20 text-bd-teal text-xs">Safety Net</span>
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('top-p') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('top-p')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Top-P filters out less likely tokens by setting a <strong>cumulative probability threshold</strong>. It selects the most likely tokens until their combined probability reaches the limit (e.g., 90%).
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Layers class="w-4 h-4 text-bd-teal" />
            How Top-K and Top-P Work Together
          </h3>
          <p class="text-xs text-bd-text-secondary mb-3">
            Think of Top-K as picking the guest list, and Top-P as the bouncer. Top-K may select 50 tokens, but some of those might be extremely unlikely. <strong>Top-P cuts off the unlikely ones</strong>, protecting you from bad selections while still allowing variety when all choices are reasonable.
          </p>
          <div class="grid md:grid-cols-2 gap-2 text-xs">
            <div class="p-2 rounded bg-bd-bg-tertiary">
              <strong class="text-bd-text-primary">High Top-K + Low Top-P:</strong>
              <span class="text-bd-text-secondary"> Wide selection, strict filter. Good balance.</span>
            </div>
            <div class="p-2 rounded bg-bd-bg-tertiary">
              <strong class="text-bd-text-primary">Low Top-K + High Top-P:</strong>
              <span class="text-bd-text-secondary"> Narrow selection, loose filter. Also works.</span>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <h4 class="text-xs font-semibold text-bd-pink mb-1">Too Low</h4>
            <p class="text-xs text-bd-text-secondary">AI outputs may be <strong>repetitive and uninteresting</strong> — too few options to choose from.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <h4 class="text-xs font-semibold text-bd-pink mb-1">Too High</h4>
            <p class="text-xs text-bd-text-secondary">AI outputs may be <strong>disjointed, incoherent</strong>, and potentially grammatically incorrect.</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
          <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
            <Lightbulb class="w-3 h-3" /> Recommendation
          </h4>
          <p class="text-xs text-bd-text-secondary">
            A Top-P of <strong>0.90 to 0.95</strong> is probably best for most players. Adjust inversely with Top-K — if you have a high Top-K, opt for a lower Top-P, and vice versa.
          </p>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== PRESENCE PENALTY ===================== -->
  <section id="guide-presence-penalty" class="card">
    <button 
      @click="toggleGuideSection('presence-penalty')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Ban class="w-5 h-5 text-bd-pink" />
        Presence Penalty
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('presence-penalty') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('presence-penalty')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Presence Penalty applies a <strong>one-time weight penalty</strong> to any word that has already appeared in the response. If "Dog" is used once, it gets penalized to help prevent immediate repetition.
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Check class="w-4 h-4 text-bd-green" />
              When It Helps
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Fixes issues where the model is <strong>repeating what it just said</strong>, or trying to repeat an older response. A small positive value can reduce echo and redundancy.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-bd-pink" />
              When It Hurts
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Pushing this too high can <strong>cause more repetition</strong>, not less. If all words are penalized equally, the relative probabilities stay the same — nothing changes.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== FREQUENCY PENALTY ===================== -->
  <section id="guide-frequency-penalty" class="card">
    <button 
      @click="toggleGuideSection('frequency-penalty')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Repeat class="w-5 h-5 text-bd-cyan" />
        Frequency Penalty
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('frequency-penalty') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('frequency-penalty')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Frequency Penalty is like Presence Penalty, but <strong>cumulative</strong> — the more a word has been used, the more it gets penalized in the next response.
        </p>

        <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
            <div>
              <h3 class="font-semibold text-bd-text-primary">Be Careful With This One</h3>
              <p class="text-xs text-bd-text-secondary mt-1">
                Character names, as well as common words like <strong>"You", "I", "and", "a"</strong>, will be penalized heavily. Setting too high of a value will start cutting out these essential tokens in favor of uncommon ones, possibly becoming <strong>grammatically incoherent</strong>.
              </p>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
          <h4 class="text-xs font-semibold text-bd-green mb-2 flex items-center gap-1">
            <Lightbulb class="w-3 h-3" /> Recommendation
          </h4>
          <p class="text-xs text-bd-text-secondary">
            Defaults to <strong>zero</strong>. Keep it low — the AI will start trending towards strange outputs if you push it much past <strong>1</strong>.
          </p>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SUGGESTED MODEL SETTINGS ===================== -->
  <section id="guide-presets" class="card">
    <button 
      @click="toggleGuideSection('presets')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Cpu class="w-5 h-5 text-bd-purple" />
        Suggested Model Settings
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('presets') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('presets')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Community-tested presets for each model. Format: <strong>Temperature / Top-K / Top-P / Presence Penalty / Frequency Penalty</strong>.
        </p>

        <!-- Preset table -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle overflow-x-auto">
          <div class="grid gap-3" style="min-width: 400px;">
            <!-- Header -->
            <div class="grid grid-cols-6 gap-2 text-[10px] font-semibold text-bd-text-muted uppercase tracking-wider pb-2 border-b border-bd-border-subtle">
              <div class="col-span-2">Model</div>
              <div class="text-center">Temp</div>
              <div class="text-center">Top-K</div>
              <div class="text-center">Top-P</div>
              <div class="text-center">Pres / Freq</div>
            </div>
            <!-- DeepSeek 3.0 -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.0</div>
              <div class="text-center font-mono text-bd-amber">0.7</div>
              <div class="text-center font-mono text-bd-purple">500</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
            </div>
            <!-- DeepSeek 3.1 -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.1</div>
              <div class="text-center font-mono text-bd-amber">1</div>
              <div class="text-center font-mono text-bd-purple">500</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
            </div>
            <!-- DeepSeek 3.2 -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.2</div>
              <div class="text-center font-mono text-bd-amber">0.7</div>
              <div class="text-center font-mono text-bd-purple">300</div>
              <div class="text-center font-mono text-bd-teal">0.9</div>
              <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
            </div>
            <!-- Dynamic Deep -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Dynamic Deep</div>
              <div class="text-center font-mono text-bd-amber">0.7</div>
              <div class="text-center font-mono text-bd-purple">300</div>
              <div class="text-center font-mono text-bd-teal">0.9</div>
              <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
            </div>
            <!-- Atlas -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Atlas <span class="text-bd-text-muted">(DS 3.2 Cached)</span></div>
              <div class="text-center font-mono text-bd-amber">0.7</div>
              <div class="text-center font-mono text-bd-purple">300</div>
              <div class="text-center font-mono text-bd-teal">0.9</div>
              <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
            </div>
            <!-- Raven -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Raven <span class="text-bd-text-muted">(GLM 4.6 Cached)</span></div>
              <div class="text-center font-mono text-bd-amber">0.8</div>
              <div class="text-center font-mono text-bd-purple">200</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.6</div>
            </div>
            <!-- Wayfarer Large -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Wayfarer Large</div>
              <div class="text-center font-mono text-bd-amber">1</div>
              <div class="text-center font-mono text-bd-purple">500</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.5 / 0</div>
            </div>
            <!-- Harbinger -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Harbinger</div>
              <div class="text-center font-mono text-bd-amber">1.3</div>
              <div class="text-center font-mono text-bd-purple">450</div>
              <div class="text-center font-mono text-bd-teal">0.5</div>
              <div class="text-center font-mono text-bd-text-secondary">0.2 / 0.2</div>
            </div>
            <!-- Hearthfire -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Hearthfire</div>
              <div class="text-center font-mono text-bd-amber">1</div>
              <div class="text-center font-mono text-bd-purple">500</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
            </div>
            <!-- Muse -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Muse</div>
              <div class="text-center font-mono text-bd-amber">1</div>
              <div class="text-center font-mono text-bd-purple">250</div>
              <div class="text-center font-mono text-bd-teal">1</div>
              <div class="text-center font-mono text-bd-text-secondary">0.25 / 0</div>
            </div>
            <!-- Madness -->
            <div class="grid grid-cols-6 gap-2 text-xs items-center">
              <div class="col-span-2 font-semibold text-bd-text-primary">Madness</div>
              <div class="text-center font-mono text-bd-amber">1</div>
              <div class="text-center font-mono text-bd-purple">500</div>
              <div class="text-center font-mono text-bd-teal">0.95</div>
              <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              These are <strong>starting points</strong>, not gospel. Every story is different — use these as a baseline and tweak based on what you're seeing in your Adventure.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TIPS & TRICKS ===================== -->
  <section id="guide-tips" class="card">
    <button 
      @click="toggleGuideSection('tips')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Sparkles class="w-5 h-5 text-bd-amber" />
        Tips & Tricks
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('tips') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('tips')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          There are <strong>no rules</strong> for these settings. The best way to learn is to experiment — and there's no penalty for doing so.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Zap class="w-3 h-3 text-bd-amber" /> Start With Presets
            </h4>
            <p class="text-xs text-bd-text-secondary">Use the suggested settings for your model as a baseline. Nudge one setting at a time and see what changes.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Thermometer class="w-3 h-3 text-bd-amber" /> Temperature First
            </h4>
            <p class="text-xs text-bd-text-secondary">Temperature and Top-P have the most noticeable impact. Start there when experimenting.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Layers class="w-3 h-3 text-bd-purple" /> K + P Are a Team
            </h4>
            <p class="text-xs text-bd-text-secondary">Top-K and Top-P work together — adjust them in tandem for best results. High K + low P, or low K + high P.</p>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
              <Ban class="w-3 h-3 text-bd-pink" /> Penalties Stay Low
            </h4>
            <p class="text-xs text-bd-text-secondary">Presence and Frequency Penalty are best kept low unless you have specific repetition issues to solve.</p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <p class="text-xs text-bd-text-secondary">
            Sure, the AI responses may get weird and wacky, but <strong>that's part of the fun</strong> of playing AI Dungeon! Nudge settings around based on what you think you'd personally prefer — you might like it better, or you might go back.
          </p>
        </div>

        <div class="flex flex-wrap gap-2">
          <a href="https://help.aidungeon.com/faq/what-are-advanced-settings" target="_blank" class="btn btn-secondary text-xs">
            <BookOpen class="w-3 h-3" /> Official Guide
          </a>
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
import { 
  Settings, HelpCircle, Sparkles, Info, Lightbulb, Zap, AlertTriangle,
  BookOpen, MessageSquare, FileText, Thermometer, ListFilter, PieChart,
  Ban, Repeat, Cpu, Layers, Target, Check,
  ChevronDown, ChevronUp, ExternalLink
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'what-are', label: 'What Are Advanced Settings?' },
  { id: 'context-length', label: 'Context Length' },
  { id: 'response-length', label: 'Response Length' },
  { id: 'temperature', label: 'Temperature' },
  { id: 'top-k', label: 'Top-K' },
  { id: 'top-p', label: 'Top-P' },
  { id: 'presence-penalty', label: 'Presence Penalty' },
  { id: 'frequency-penalty', label: 'Frequency Penalty' },
  { id: 'presets', label: 'Model Presets' },
  { id: 'tips', label: 'Tips & Tricks' }
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
