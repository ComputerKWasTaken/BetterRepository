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

  <!-- ===================== MODEL OVERVIEW ===================== -->
  <section id="guide-model-overview" class="card">
    <button 
      @click="toggleGuideSection('model-overview')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Cpu class="w-5 h-5 text-bd-amber" />
        AI Models Overview
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('model-overview') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('model-overview')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon offers several AI models, each with unique characteristics and specialties. Models are organized into <strong>tiers based on size</strong>, which generally correlates with capability and cost. Larger models tend to produce more coherent, creative responses but use more resources.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30 text-center">
            <h3 class="font-semibold text-bd-green text-sm mb-1">Small (12B)</h3>
            <p class="text-[10px] text-bd-text-muted">Fast, efficient, good for casual play. Lower resource cost.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30 text-center">
            <h3 class="font-semibold text-bd-blue text-sm mb-1">Medium (24B-70B)</h3>
            <p class="text-[10px] text-bd-text-muted">Balanced quality and speed. Great for most adventures.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30 text-center">
            <h3 class="font-semibold text-bd-purple text-sm mb-1">Large (350B+)</h3>
            <p class="text-[10px] text-bd-text-muted">Highest quality output. Best for complex, long stories.</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Dynamic Models</strong> (Dynamic Small, Dynamic Large, Dynamic Deep) automatically select the best available model in their size tier. They're great if you don't have a preference and just want good results.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SMALL MODELS ===================== -->
  <section id="guide-small-models" class="card">
    <button 
      @click="toggleGuideSection('small-models')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Zap class="w-5 h-5 text-bd-green" />
        Small Models (12B)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('small-models') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('small-models')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Small models are <strong>fast and efficient</strong>, ideal for casual play and quick adventures. They respond quickly and cost fewer resources, but may struggle with complex narratives or instructions.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Muse (12B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-green/20 text-bd-green">Small</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A versatile small model good for general-purpose storytelling. Fast response times make it great for quick sessions.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Wayfarer Small 2 (12B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-green/20 text-bd-green">Small</span>
            </div>
            <p class="text-xs text-bd-text-secondary">Latitude's own fine-tuned model optimized for AI Dungeon-style storytelling. Designed specifically for adventure generation.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Madness (12B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-green/20 text-bd-green">Small</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A creative, unpredictable model that excels at surprising and unconventional storytelling. Great for wild, chaotic adventures.</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MEDIUM MODELS ===================== -->
  <section id="guide-medium-models" class="card">
    <button 
      @click="toggleGuideSection('medium-models')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Gauge class="w-5 h-5 text-bd-blue" />
        Medium Models (24B-70B)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('medium-models') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('medium-models')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Medium models offer a great balance between <strong>quality and speed</strong>. They handle complex narratives better than small models while remaining reasonably fast.
        </p>

        <div class="space-y-3">
          <!-- 24B models -->
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">24B Models</h4>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Hearthfire (24B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-blue/20 text-bd-blue">Medium</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A warm, character-focused model that excels at dialogue-heavy adventures and building emotional connections with NPCs.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Harbinger (24B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-blue/20 text-bd-blue">Medium</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A darker, more atmospheric model suited for horror, suspense, and dramatic storytelling. Brings tension and weight to narratives.</p>
          </div>

          <!-- 70B models -->
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mt-4">70B Models</h4>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Nova (70B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-blue/20 text-bd-blue">Medium</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A strong general-purpose model with improved coherence and instruction-following. A solid choice for most adventures.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Wayfarer Large (70B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-blue/20 text-bd-blue">Medium</span>
            </div>
            <p class="text-xs text-bd-text-secondary">The larger version of Latitude's custom model. Better instruction-following and narrative quality than its small counterpart.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Hermes 3 70B</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-blue/20 text-bd-blue">Medium</span>
            </div>
            <p class="text-xs text-bd-text-secondary">An open-source model with strong general capabilities. Good at following complex AI Instructions and handling diverse genres.</p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== LARGE MODELS ===================== -->
  <section id="guide-large-models" class="card">
    <button 
      @click="toggleGuideSection('large-models')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Crown class="w-5 h-5 text-bd-purple" />
        Large Models (350B+)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('large-models') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('large-models')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Large models produce the <strong>highest quality output</strong> with the best coherence, instruction-following, and creative writing. They cost more resources and may be slower, but deliver the best AI Dungeon experience.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">DeepSeek (671B / 37B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-purple/20 text-bd-purple">Large (MoE)</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A massive Mixture-of-Experts model. Despite its huge parameter count, the MoE architecture (37B active parameters) keeps it efficient while maintaining exceptional quality.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Atlas (671B / 37B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-purple/20 text-bd-purple">Large (MoE)</span>
            </div>
            <p class="text-xs text-bd-text-secondary">Another MoE model fine-tuned for AI Dungeon-style storytelling. Combines the efficiency of MoE with specialized adventure generation.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Raven (357B / 32B)</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-purple/20 text-bd-purple">Large (MoE)</span>
            </div>
            <p class="text-xs text-bd-text-secondary">A high-quality MoE model with strong narrative capabilities. Known for atmospheric writing and detailed world-building.</p>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start justify-between mb-2">
              <h4 class="font-semibold text-bd-text-primary">Hermes 3 405B</h4>
              <span class="text-[10px] px-2 py-0.5 rounded bg-bd-purple/20 text-bd-purple">Large</span>
            </div>
            <p class="text-xs text-bd-text-secondary">The largest dense model available. Exceptional at following complex instructions, maintaining long narratives, and producing high-quality prose.</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-purple flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>MoE (Mixture of Experts)</strong> models have a large total parameter count but only activate a fraction for each token. This makes them more efficient than you'd expect from their size while maintaining quality close to a full dense model.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MODEL SETTINGS ===================== -->
  <section id="guide-model-settings" class="card">
    <button 
      @click="toggleGuideSection('model-settings')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <SlidersHorizontal class="w-5 h-5 text-bd-teal" />
        Model Settings (Advanced)
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('model-settings') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('model-settings')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Model Settings let you customize how AI responses are generated. The AI creates a probability list of possible next tokens, then selects from that list using these settings. <strong>Experimenting is encouraged</strong> &mdash; there are no consequences and no agreed-upon "best" values.
        </p>

        <!-- Temperature -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-start justify-between mb-2">
            <h4 class="font-semibold text-bd-text-primary flex items-center gap-2">
              <Thermometer class="w-4 h-4 text-bd-amber" />
              Temperature
            </h4>
            <span class="text-[10px] px-2 py-0.5 rounded bg-bd-amber/20 text-bd-amber">Default: 0.8</span>
          </div>
          <p class="text-xs text-bd-text-secondary mb-3">Controls the <strong>randomness</strong> of responses. Higher = more creative and unpredictable. Lower = more consistent and focused.</p>
          <div class="grid grid-cols-3 gap-2 text-[10px]">
            <div class="p-2 rounded bg-bd-blue/10 text-center">
              <strong class="text-bd-blue block">0.4-0.6</strong>
              <span class="text-bd-text-muted">Focused, coherent</span>
            </div>
            <div class="p-2 rounded bg-bd-green/10 text-center">
              <strong class="text-bd-green block">0.7-0.9</strong>
              <span class="text-bd-text-muted">Balanced (default)</span>
            </div>
            <div class="p-2 rounded bg-bd-amber/10 text-center">
              <strong class="text-bd-amber block">1.0-1.2</strong>
              <span class="text-bd-text-muted">Creative, wild</span>
            </div>
          </div>
          <p class="text-[10px] text-bd-text-muted mt-2">Warning: Too high leads to gibberish. Too low leads to repetitive text.</p>
        </div>

        <!-- Top-K -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <ListFilter class="w-4 h-4 text-bd-blue" />
            Top-K
          </h4>
          <p class="text-xs text-bd-text-secondary mb-2">
            Limits the AI to the <strong>K most likely tokens</strong> for each generation step. If set to 20, the AI picks from only the 20 most probable next tokens, reducing randomness by excluding unlikely options.
          </p>
          <div class="p-2 rounded bg-bd-bg-primary text-xs text-bd-text-muted">
            Lower Top-K = more predictable &bull; Higher Top-K = more variety
          </div>
        </div>

        <!-- Top-P -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Target class="w-4 h-4 text-bd-green" />
            Top-P (Nucleus Sampling)
          </h4>
          <p class="text-xs text-bd-text-secondary mb-2">
            Filters tokens by setting a <strong>probability threshold</strong> (e.g., 90%). Selects the most likely tokens until their combined probability reaches the limit. Acts as a <strong>safety net</strong> with Top-K &mdash; it cuts off unlikely tokens that Top-K might still include.
          </p>
          <div class="p-3 rounded bg-bd-green/10 text-xs text-bd-text-secondary">
            <strong>Recommended:</strong> 0.90 to 0.95 for most players. Top-P lets the AI be <strong>certain when it's certain</strong> and <strong>creative when it isn't</strong>.
          </div>
        </div>

        <!-- Response Length -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <AlignLeft class="w-4 h-4 text-bd-purple" />
            Response Length
          </h4>
          <p class="text-xs text-bd-text-secondary">
            Maximum number of tokens per AI response. Shorter responses let you jump in quicker; longer responses give you more to read. Purely a matter of <strong>personal preference</strong> and play style.
          </p>
        </div>

        <!-- Repetition Penalties -->
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Ban class="w-4 h-4 text-bd-amber" />
              Presence Penalty
            </h4>
            <p class="text-xs text-bd-text-secondary">
              Applies a <strong>one-time penalty</strong> to any word that already appeared. Helps prevent immediate repetition. Setting too high can paradoxically cause more repetition by penalizing everything equally.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Repeat class="w-4 h-4 text-bd-red" />
              Frequency Penalty
            </h4>
            <p class="text-xs text-bd-text-secondary">
              <strong>Cumulative penalty</strong> &mdash; the more a word is used, the more it's penalized. Be careful: common words (You, I, and, a) and character names get heavily penalized. Usually defaults to 0.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TIPS & CHOOSING ===================== -->
  <section id="guide-choosing-models" class="card">
    <button 
      @click="toggleGuideSection('choosing-models')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Lightbulb class="w-5 h-5 text-bd-cyan" />
        Tips for Choosing & Configuring Models
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('choosing-models') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('choosing-models')" class="mt-4 space-y-4">
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h4 class="font-semibold text-bd-text-primary mb-2">There Are No Rules</h4>
            <p class="text-xs text-bd-text-secondary">
              The best way to understand models and settings is to experiment. The default values test well, but they may not work for your style. If you like something no one else uses, that's great!
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="font-semibold text-bd-text-primary mb-2">No Real Consequences</h4>
            <p class="text-xs text-bd-text-secondary">
              Everything in AI Dungeon is erasable and editable. Turn all settings to max, watch the AI flail, laugh, then reset. There's no penalty for experimentation.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="font-semibold text-bd-text-primary mb-2">Switch Models for Variety</h4>
            <p class="text-xs text-bd-text-secondary">
              Different models have different writing styles. Switching mid-adventure can introduce fresh perspectives and prevent staleness. This is especially useful for long adventures.
            </p>
          </div>
        </div>

        <!-- Quick Selection Guide -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Quick Selection Guide</h4>
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-bd-text-secondary">
              <thead>
                <tr class="border-b border-bd-border-subtle text-bd-text-muted text-left">
                  <th class="py-2 pr-3 font-semibold">If you want...</th>
                  <th class="py-2 font-semibold">Try...</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-bd-border-subtle/50">
                  <td class="py-2 pr-3">Fast, casual play</td>
                  <td class="py-2"><span class="text-bd-green">Dynamic Small</span> or <span class="text-bd-green">Muse</span></td>
                </tr>
                <tr class="border-b border-bd-border-subtle/50">
                  <td class="py-2 pr-3">Best quality-to-speed ratio</td>
                  <td class="py-2"><span class="text-bd-blue">Dynamic Large</span> or <span class="text-bd-blue">Nova</span></td>
                </tr>
                <tr class="border-b border-bd-border-subtle/50">
                  <td class="py-2 pr-3">Maximum story quality</td>
                  <td class="py-2"><span class="text-bd-purple">Dynamic Deep</span> or <span class="text-bd-purple">Hermes 3 405B</span></td>
                </tr>
                <tr class="border-b border-bd-border-subtle/50">
                  <td class="py-2 pr-3">Chaotic, creative adventures</td>
                  <td class="py-2"><span class="text-bd-green">Madness</span> + high Temperature</td>
                </tr>
                <tr class="border-b border-bd-border-subtle/50">
                  <td class="py-2 pr-3">Character-focused stories</td>
                  <td class="py-2"><span class="text-bd-blue">Hearthfire</span></td>
                </tr>
                <tr>
                  <td class="py-2 pr-3">Horror / dark themes</td>
                  <td class="py-2"><span class="text-bd-blue">Harbinger</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              Model availability may change. Check AI Dungeon's settings for the most current list of available models for your subscription tier.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== HOW AI RESPONSES ARE GENERATED ===================== -->
  <section id="guide-how-responses-work" class="card">
    <button 
      @click="toggleGuideSection('how-responses-work')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Cog class="w-5 h-5 text-bd-accent-primary" />
        How AI Responses Are Generated
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('how-responses-work') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('how-responses-work')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Understanding how the AI generates responses helps you troubleshoot issues and get better results. Here's the process broken down:
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-amber/20 text-bd-amber font-bold flex items-center justify-center text-sm">1</span>
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">You Send Your Input</h4>
                <p class="text-xs text-bd-text-secondary">Your action (Do, Say, Story, or See) is sent from the game interface to AI Dungeon's servers.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center text-sm">2</span>
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">Context Is Compiled</h4>
                <p class="text-xs text-bd-text-secondary">The server assembles the context: your AI Instructions, Plot Essentials, Story Cards, Memory, recent history, and your new input &mdash; all within the token limit.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center text-sm">3</span>
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">Text Is Tokenized</h4>
                <p class="text-xs text-bd-text-secondary">The assembled context is converted from human-readable text into tokens that the AI model can process.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center text-sm">4</span>
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">The AI Generates Tokens</h4>
                <p class="text-xs text-bd-text-secondary">The model creates a probability list of possible next tokens, applies your settings (Temperature, Top-K, Top-P, penalties), and selects tokens one at a time until the response is complete.</p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-teal/20 text-bd-teal font-bold flex items-center justify-center text-sm">5</span>
              <div>
                <h4 class="font-semibold text-bd-text-primary mb-1">De-Tokenization & Output</h4>
                <p class="text-xs text-bd-text-secondary">The generated tokens are converted back into human-readable text and displayed in your Adventure.</p>
              </div>
            </div>
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
  Cpu, Zap, Gauge, Crown, SlidersHorizontal, Lightbulb, Cog,
  ChevronDown, ChevronUp, Info, Thermometer, ListFilter, Target,
  AlignLeft, Ban, Repeat
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Models', isHeader: true },
  { id: 'model-overview', label: 'AI Models Overview' },
  { id: 'small-models', label: 'Small Models (12B)' },
  { id: 'medium-models', label: 'Medium Models (24B-70B)' },
  { id: 'large-models', label: 'Large Models (350B+)' },
  { id: 'header-settings', label: 'Settings', isHeader: true },
  { id: 'model-settings', label: 'Model Settings (Advanced)' },
  { id: 'choosing-models', label: 'Tips for Choosing Models' },
  { id: 'how-responses-work', label: 'How Responses Are Generated' }
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
