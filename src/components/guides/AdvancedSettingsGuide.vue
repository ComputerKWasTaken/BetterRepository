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

      <!-- ===================== 1. WHAT ARE ADVANCED SETTINGS ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-amber" />
            What Are Advanced Settings?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Advanced Settings let you customize exactly how the AI selects vocabulary words and constructs responses. 
              By altering sampling limits, penalties, and random temperatures, you can fine-tune creative diversity and story logic.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Sparkles class="w-4 h-4 text-bd-amber" />
                  Creativity Steering
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Regulate response randomness and restrict choices to keep outputs logical or push them to be highly creative.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ListFilter class="w-4 h-4 text-bd-blue" />
                  Sampling Pools
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Filter out highly unlikely or incoherent words entirely before the AI randomly selects its next token.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Settings class="w-4 h-4 text-bd-green" />
                  Memory Capacities
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Adjust active token counts and budget splits between story instructions, lore cards, and turn histories.
                </p>
              </div>
            </div>

            <!-- Token selection flow map -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <Layers class="w-4 h-4 text-bd-purple" />
                The Token Selection Pipeline
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-[11px]">
                <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Word Probability Calculations</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-semibold">Top-K filter</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-teal/20 border border-bd-teal/30 text-bd-teal font-semibold">Top-P filter</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-semibold">Temperature scale</div>
                <span class="text-bd-text-muted">→</span>
                <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-semibold">Random pick</div>
              </div>
              <p class="text-[10px] text-bd-text-muted">First, Top-K and Top-P filter the allowable word pool. Next, Temperature shifts the relative likelihood of the remaining options. Finally, the engine selects a word and repeats the process.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 2. QUICK START ===================== -->
      <section id="guide-quick-start" class="card">
        <button
          @click="toggleGuideSection('quick-start')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Quick Start: Standard Baseline Settings
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Configure these three baseline settings to establish a solid foundation for optimal generation quality.
            </p>

            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Max Out Context Length</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Navigate to **Adventure Settings → Advanced Settings**. Set **Context Length** to the maximum tokens allowed by your membership tier. More context directly expands AI memory.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Establish Temperature Baseline</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Set your **Temperature** slider between <code class="text-bd-purple">0.8</code> and <code class="text-bd-purple">1.0</code>. This is the sweet spot that balances factual consistency with rich story vocabulary.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Configure Baseline Sampling Pools</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Set **Top-P** to <code class="text-bd-purple">0.95</code> and **Top-K** to <code class="text-bd-purple">500</code>. This trims the most bizarre, irrelevant options, acting as a safety net against gibberish.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 3. ANATOMY / HOW IT WORKS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-blue" />
            Anatomy &amp; How It Works
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">
            
            <!-- Core Generation Parameters -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Core Generation Parameters</h3>
              
              <div class="space-y-4 text-xs">
                <!-- Context Length -->
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/20">
                  <h4 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <BookOpen class="w-4 h-4 text-bd-blue" /> Context Length (Tokens sent to AI)
                  </h4>
                  <p class="text-bd-text-secondary mt-1">
                    Defines the total size of the AI's short-term memory pool. If this pool is too small, earlier segments of history, memory, and lore cards get cut off.
                  </p>
                  <p class="text-bd-text-muted mt-1">
                    <strong>Rule:</strong> Keep this at the absolute maximum allowed limit. Note that responses from the AI take up context space on the next turn, leaving slightly less room for older history turns.
                  </p>
                </div>

                <!-- Temperature -->
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/20">
                  <h4 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <Thermometer class="w-4 h-4 text-bd-amber" /> Temperature (Creativity &amp; Focus)
                  </h4>
                  <p class="text-bd-text-secondary mt-1">
                    Controls randomness. A low temperature focuses the AI on highly probable, predictable words. A high temperature flatlines probabilities, giving eccentric words a chance.
                  </p>
                  <div class="overflow-x-auto mt-2">
                    <table class="w-full text-[11px] text-bd-text-secondary">
                      <thead>
                        <tr class="border-b border-bd-border-subtle">
                          <th class="text-left font-semibold text-bd-text-primary">Temperature</th>
                          <th class="text-left font-semibold text-bd-text-primary">Character</th>
                          <th class="text-left font-semibold text-bd-text-primary">Best For</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="border-b border-bd-border-subtle/50">
                          <td class="py-1 font-mono text-bd-blue">0.3 – 0.5</td>
                          <td>Robotic &amp; repetitive</td>
                          <td>Code, logic puzzles, strict facts</td>
                        </tr>
                        <tr class="border-b border-bd-border-subtle/50">
                          <td class="py-1 font-mono text-bd-green">0.7 – 0.9</td>
                          <td>Balanced &amp; coherent</td>
                          <td>Standard storytelling, general gaming</td>
                        </tr>
                        <tr>
                          <td class="py-1 font-mono text-bd-amber">1.0 – 1.3</td>
                          <td>Very creative, loose</td>
                          <td>Quirky, surreal, experimental tales</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Response Length -->
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                  <h4 class="font-semibold text-bd-text-primary flex items-center gap-2">
                    <MessageSquare class="w-4 h-4 text-bd-green" /> Response Length (Max Output Tokens)
                  </h4>
                  <p class="text-bd-text-secondary mt-1">
                    Caps the maximum response length generated on each turn. 
                  </p>
                  <div class="grid md:grid-cols-2 gap-3 mt-1.5 text-[11px] text-bd-text-muted">
                    <div>
                      <strong class="text-bd-green">Short Responses:</strong> Allows quick-paced, snappy play where you keep immediate control over the scene.
                    </div>
                    <div>
                      <strong class="text-bd-purple">Long Responses:</strong> Promotes descriptive worldbuilding, atmospheric setups, and extended dialogue beats.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sampling and Penalty Selectors -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Sampling &amp; Penalty Selectors</h3>
              
              <div class="grid md:grid-cols-2 gap-4 text-xs">
                <!-- Top-K -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-purple/20 space-y-1">
                  <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                    <ListFilter class="w-4 h-4 text-bd-purple" /> Top-K
                  </h4>
                  <p class="text-bd-text-secondary">
                    Restricts choice to the top K most likely words.
                  </p>
                  <p class="text-bd-text-muted">
                    Setting K = 50 eliminates the remaining 50,000+ words in the vocabulary pool, preventing extremely weird selections.
                  </p>
                </div>

                <!-- Top-P -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-teal/20 space-y-1">
                  <h4 class="font-semibold text-bd-teal flex items-center gap-1.5">
                    <PieChart class="w-4 h-4 text-bd-teal" /> Top-P
                  </h4>
                  <p class="text-bd-text-secondary">
                    Restricts choices to the cumulative probability threshold (e.g. 0.95 = top 95% of word probability).
                  </p>
                  <p class="text-bd-text-muted">
                    If K includes bizarre options, Top-P cuts them off if their combined probability is highly insignificant.
                  </p>
                </div>

                <!-- Presence Penalty -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/20 space-y-1">
                  <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                    <Ban class="w-4 h-4 text-bd-pink" /> Presence Penalty
                  </h4>
                  <p class="text-bd-text-secondary">
                    Applies a one-time penalty weight to any word that has already been chosen in the response.
                  </p>
                  <p class="text-bd-text-muted">
                    Use a low positive value (e.g. 0.3) to stop the AI from repeating a word it used earlier in the same paragraph.
                  </p>
                </div>

                <!-- Frequency Penalty -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-cyan/20 space-y-1">
                  <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5">
                    <Repeat class="w-4 h-4 text-bd-cyan" /> Frequency Penalty
                  </h4>
                  <p class="text-bd-text-secondary">
                    Applies a cumulative penalty that scales based on how many times a word has appeared.
                  </p>
                  <p class="text-bd-text-muted">
                    Use with caution! High values penalize essential words like "the", "and", or character names, leading to chaotic syntax.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 4. BEST PRACTICES ===================== -->
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
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <Check class="w-4 h-4 text-bd-green" />
                Parameter Fine-Tuning Guidelines
              </h3>
              <ul class="space-y-2 text-xs text-bd-text-secondary">
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Nudge One Setting at a Time:</strong> Never adjust temperature, penalties, and Top-P all on the same turn. Make tiny adjustments, observe for 3-4 turns, then adjust again.</span>
                </li>
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Start From Presets:</strong> Community model presets exist for a reason. Establish the standard baseline for your active engine first before customizing settings.</span>
                </li>
                <li class="flex items-start gap-2">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Keep Penalties Low:</strong> Presence, Frequency, and Repetition penalties are powerful. High values cause the model to write extremely weird alternatives. Keep them under <code class="text-bd-purple">0.5</code> unless correcting severe loops.</span>
                </li>
              </ul>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 5. ADVANCED TOPICS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Advanced Topics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            
            <!-- Sub-topic: Model Presets & Performance -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Suggested Model Presets</h3>
              <p class="text-xs text-bd-text-secondary">
                Community-tested configuration metrics for active AI Dungeon models. Format: **Temperature / Top-K / Top-P / Presence / Frequency**.
              </p>

              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle overflow-x-auto">
                <div class="grid gap-2.5" style="min-width: 450px;">
                  <!-- Header -->
                  <div class="grid grid-cols-6 gap-2 text-[10px] font-bold text-bd-text-muted uppercase tracking-wider pb-1.5 border-b border-bd-border-subtle">
                    <div class="col-span-2">Model Name</div>
                    <div class="text-center">Temp</div>
                    <div class="text-center">Top-K</div>
                    <div class="text-center">Top-P</div>
                    <div class="text-center">Pres / Freq</div>
                  </div>
                  
                  <!-- Rows -->
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.0</div>
                    <div class="text-center font-mono text-bd-amber">0.7</div>
                    <div class="text-center font-mono text-bd-purple">500</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.1</div>
                    <div class="text-center font-mono text-bd-amber">1.0</div>
                    <div class="text-center font-mono text-bd-purple">500</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">DeepSeek 3.2</div>
                    <div class="text-center font-mono text-bd-amber">0.7</div>
                    <div class="text-center font-mono text-bd-purple">300</div>
                    <div class="text-center font-mono text-bd-teal">0.9</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Dynamic Deep</div>
                    <div class="text-center font-mono text-bd-amber">0.7</div>
                    <div class="text-center font-mono text-bd-purple">300</div>
                    <div class="text-center font-mono text-bd-teal">0.9</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Atlas <span class="text-bd-text-muted">(DS3.2 Cached)</span></div>
                    <div class="text-center font-mono text-bd-amber">0.7</div>
                    <div class="text-center font-mono text-bd-purple">300</div>
                    <div class="text-center font-mono text-bd-teal">0.9</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Raven <span class="text-bd-text-muted">(GLM 4.6 Cached)</span></div>
                    <div class="text-center font-mono text-bd-amber">0.8</div>
                    <div class="text-center font-mono text-bd-purple">200</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.8 / 0.6</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Wayfarer Large</div>
                    <div class="text-center font-mono text-bd-amber">1.0</div>
                    <div class="text-center font-mono text-bd-purple">500</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.5 / 0</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Harbinger</div>
                    <div class="text-center font-mono text-bd-amber">1.3</div>
                    <div class="text-center font-mono text-bd-purple">450</div>
                    <div class="text-center font-mono text-bd-teal">0.5</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.2 / 0.2</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Hearthfire</div>
                    <div class="text-center font-mono text-bd-amber">1.0</div>
                    <div class="text-center font-mono text-bd-purple">500</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1 border-b border-bd-border-subtle/30">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Muse</div>
                    <div class="text-center font-mono text-bd-amber">1.0</div>
                    <div class="text-center font-mono text-bd-purple">250</div>
                    <div class="text-center font-mono text-bd-teal">1.0</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.25 / 0</div>
                  </div>
                  <div class="grid grid-cols-6 gap-2 text-xs items-center py-1">
                    <div class="col-span-2 font-semibold text-bd-text-primary">Madness</div>
                    <div class="text-center font-mono text-bd-amber">1.0</div>
                    <div class="text-center font-mono text-bd-purple">500</div>
                    <div class="text-center font-mono text-bd-teal">0.95</div>
                    <div class="text-center font-mono text-bd-text-secondary">0.4 / 0.4</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sub-topic: Repetition Penalty Stacking -->
            <div class="space-y-3 text-xs text-bd-text-secondary">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Repetition Penalty Stacking</h3>
              <p>
                In advanced workflows, Presence, Frequency, and standard Repetition penalties stack together. Stacking these too high can make the AI select incoherent words because standard terms (like pronouns) become heavily penalized.
              </p>
              <div class="p-3 rounded bg-bd-warning/10 border border-bd-warning/20">
                <strong>Rule of Thumb:</strong> Prioritize Temperature shifts and Context audits to solve looping issues before enabling cumulative penalties.
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 6. TIPS & COMMON PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips &amp; Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Check this diagnostic matrix to quickly adjust your settings when story coherence degrades.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-xs">
              <!-- Issue 1 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  AI responses too boring or predictable
                </h4>
                <p class="text-bd-text-secondary">
                  The AI repeats common phrases or chooses overly simplistic narration.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Raise Temperature gently to 1.0, or slightly increase Top-P.
                </p>
              </div>

              <!-- Issue 2 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  AI outputs gibberish or unrelated words
                </h4>
                <p class="text-bd-text-secondary">
                  The story gets chaotic, losing logical flow, or outputting random characters.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Lower Temperature to 0.7, or decrease Top-P to 0.90.
                </p>
              </div>

              <!-- Issue 3 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Severe word looping loops
                </h4>
                <p class="text-bd-text-secondary">
                  The AI repeats the same sentence or list of vocabulary words over and over.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Edit context (clear repetitions in memory/history) and set Presence Penalty to 0.4.
                </p>
              </div>

              <!-- Issue 4 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  AI forgets character descriptions or recent turns
                </h4>
                <p class="text-bd-text-secondary">
                  The model breaks consistency, misidentifying people or locations in the scene.
                </p>
                <p class="text-bd-green mt-1">
                  <strong>Fix:</strong> Maximize Context Length, and shorten your active triggered Story Cards to free up space.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 7. CREDITS SECTION ===================== -->
      <section id="guide-credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Credits &amp; Resources
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who researched, cataloged, and tested AI Dungeon sampling metrics:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  GremmieGremlin
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  LewdLeah
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  BetterDungeon Dev Team
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <a href="https://help.aidungeon.com/faq/what-are-advanced-settings" target="_blank" class="btn btn-secondary text-xs">
                <BookOpen class="w-3 h-3" /> Official Advanced Settings FAQ
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
  Ban, Repeat, Cpu, Layers, Target, Check, Rocket, Award, X
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Are Advanced Settings?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Anatomy & How It Works' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced-topics', label: 'Advanced Topics' },
  { id: 'pitfalls', label: 'Tips & Common Pitfalls' },
  { id: 'credits', label: 'Credits & Resources' }
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
