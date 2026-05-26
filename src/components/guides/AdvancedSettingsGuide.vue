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

      <!-- Context Budget Routing Notice -->
      <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
        <div class="flex items-start gap-3">
          <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-semibold text-bd-text-primary text-sm">Context Length &amp; Prompt Assembly</h4>
            <p class="text-xs text-bd-text-secondary mt-1">
              Advanced Settings fine-tune the AI generation pass, while **Context Length** defines the size of prompt inputs. To understand how context budgets are compiled, or how history and memories compete for token space under the 70/30 split, see our dedicated 
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-semibold">Plot Components Guide</router-link>.
            </p>
          </div>
        </div>
      </div>

      <!-- ===================== SAMPLING PIPELINE ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-amber" />
            The Token Selection Pipeline
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary font-medium">
              Advanced Settings let you customize how the AI selects vocabulary words. By adjusting random temperatures, sampling pools, and repetition penalties, you steer creative variety and logic cohesion.
            </p>

            <!-- Token Selection Pipeline Flow -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <Layers class="w-4 h-4 text-bd-purple" />
                The Token Generation Pipeline Flow
              </h3>
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <div class="px-2 py-1 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">Word Probability Array</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">Top-K filter</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-teal/20 border border-bd-teal/30 text-bd-teal font-bold">Top-P filter</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">Temperature scale</div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2 py-1 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">Token Output</div>
              </div>
              <p class="text-[10px] text-bd-text-muted leading-relaxed">The pipeline filters vocabulary systematically: Top-K cuts off the absolute bottom tier. Top-P dynamically slices the cumulative probability tail. Temperature shifts relative likelihood scales, and the engine picks a word randomly from the refined pool.</p>
            </div>

            <!-- Quick Start Baselines -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Rocket class="w-4 h-4 text-bd-green" />
                Quick Start: Stable Baselines
              </h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Max Context Length:</strong> Set your Context Length slider to the absolute maximum allowed by your membership tier to maximize AI memory capacity.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Standard Temp:</strong> Establish your baseline Temperature between <code class="text-bd-purple">0.8</code> and <code class="text-bd-purple">1.0</code>. (Balances coherence and creativity).
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary">
                  <strong>Refine Pools:</strong> Set baseline **Top-P** to <code class="text-bd-purple">0.95</code> and **Top-K** to <code class="text-bd-purple">500</code> to filter out incoherent choices.
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SAMPLING MATHEMATICS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Sampling Pool Mathematics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            
            <div class="space-y-4">
              <!-- Temperature -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Thermometer class="w-4 h-4 text-bd-amber" />
                  Temperature (Probability Scaling)
                </h4>
                <p class="text-bd-text-secondary">
                  Steers word randomness. During generation, the model predicts the likelihood of every word in its vocabulary. Temperature acts as a **probability multiplier**:
                </p>
                <ul class="list-disc list-inside space-y-1 text-bd-text-muted">
                  <li>• <strong>Low Temperature (&lt; 0.5):</strong> Sharpens the probability peak. The model hyper-fixates on only the highest-probability words. Safe, but stilted and repetitive.</li>
                  <li>• <strong>High Temperature (&gt; 1.0):</strong> Flattens the probability distribution. Unlikely words get a significantly higher chance of selection. Highly creative, but risky and chaotic.</li>
                </ul>
              </div>

              <!-- Top-K & Top-P -->
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Top-K -->
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
                  <h4 class="font-semibold text-bd-purple text-xs flex items-center gap-1.5">
                    <ListFilter class="w-4 h-4 text-bd-purple" />
                    Top-K (Fixed Pool Filter)
                  </h4>
                  <p class="text-bd-text-secondary">
                    Restricts the pool to a fixed number of the most likely words:
                  </p>
                  <div class="text-bd-text-muted leading-relaxed">
                    Setting <code>Top-K = 100</code> wipes out the bottom 50,000+ words in the vocabulary pool entirely. This blocks extremely bizarre tokens from ever loading, even at high Temperatures.
                  </div>
                </div>

                <!-- Top-P -->
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-teal/30 space-y-2">
                  <h4 class="font-semibold text-bd-teal text-xs flex items-center gap-1.5">
                    <PieChart class="w-4 h-4 text-bd-teal" />
                    Top-P (Cumulative Probability Filter)
                  </h4>
                  <p class="text-bd-text-secondary">
                    Dynamically filters vocabulary based on combined likelihood percentage:
                  </p>
                  <div class="text-bd-text-muted leading-relaxed">
                    Setting <code>Top-P = 0.95</code> keeps the top 95% of word probability. If the top 5 words represent 95% of cumulative probability, only those 5 are checked, trimming the rest.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== REPETITION CONTROL ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Ban class="w-5 h-5 text-bd-pink" />
            Repetition Control &amp; Penalties
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              When models get stuck in loops (repeating sentences, recycling descriptors), use repetition penalties to dynamically degrade the probability of chosen words.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Presence Penalty -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/20 space-y-1.5">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <Ban class="w-4 h-4 text-bd-pink" /> Presence Penalty (Word Reuse)
                </h4>
                <p class="text-bd-text-secondary">
                  Applies a flat, one-time penalty weight to any word that has already been generated in the response.
                </p>
                <div class="text-bd-text-muted">
                  <strong>Best for:</strong> Forcing sentence variety within a turn. Set at <code class="text-bd-purple">0.3</code> to prevent immediate phrase echoing.
                </div>
              </div>

              <!-- Frequency Penalty -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/20 space-y-1.5">
                <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5">
                  <Repeat class="w-4 h-4 text-bd-cyan" /> Frequency Penalty (Word Density)
                </h4>
                <p class="text-bd-text-secondary">
                  Applies a cumulative penalty that scales based on how many times a word appeared in the response.
                </p>
                <div class="text-bd-text-muted">
                  <strong>Caution:</strong> High values penalize mandatory structural words ("the", "and") or character names, causing chaotic syntax. Limit to <code class="text-bd-purple">0.4</code>.
                </div>
              </div>
            </div>

            <!-- Stacking Controls -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-1.5">
                <Layers class="w-4 h-4 text-bd-blue" />
                Penalty Stacking Rules
              </h4>
              <p>
                Presence, Frequency, and standard Repetition penalties stack together. Over-stacking values makes the model write extremely stilted prose. Always edit your history text to manually strip repetitive sentences before resorting to penalties.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMMUNITY MODEL PRESETS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Community Model Presets
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            <p class="text-xs text-bd-text-secondary">
              Community-voted configurations. Format: **Temperature / Top-K / Top-P / Presence / Frequency**.
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
        </Transition>
      </section>

      <!-- ===================== TUNING DIAGNOSTICS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tuning Diagnostics &amp; Symptoms
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Use this troubleshooting diagnostic matrix to resolve generation anomalies.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> AI responses stilted or boring
                </h4>
                <p class="text-bd-text-secondary mb-1">The AI keeps repeating simple sentence structures or basic vocabulary.</p>
                <p class="text-bd-green font-bold">Fix: Raise Temperature gently (e.g. to 1.0) or raise Top-P.</p>
              </div>

              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> AI outputs gibberish / incoherent words
                </h4>
                <p class="text-bd-text-secondary mb-1">AI generates non-existent words, random symbols, or breaks logical plot flow.</p>
                <p class="text-bd-green font-bold">Fix: Lower Temperature to 0.7 or decrease Top-P to 0.90.</p>
              </div>

              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> Severe repetition looping loops
                </h4>
                <p class="text-bd-text-secondary mb-1">The model generates the same paragraph or sentence over and over on subsequent turns.</p>
                <p class="text-bd-green font-bold">Fix: Edit history to strip repeated turns, and raise Presence Penalty to 0.4.</p>
              </div>

              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4 h-4 text-bd-pink" /> Character forgetfulness
                </h4>
                <p class="text-bd-text-secondary mb-1">The model forgets character bios, companions, or recent events immediately.</p>
                <p class="text-bd-green font-bold">Fix: Max Context Length. Shorten triggered Story Card sizes to free up tokens.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREDITS SECTION ===================== -->
      <section id="credits" class="card">
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
                <MessageSquare class="w-3 h-3" /> Discord Community
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
  { id: 'header-core', label: 'Basics & Pipeline', isHeader: true },
  { id: 'what-is', label: 'The Selection Pipeline' },
  { id: 'anatomy', label: 'Sampling Mathematics' },
  { id: 'header-penalties', label: 'Repetition control', isHeader: true },
  { id: 'best-practices', label: 'Repetition Penalties' },
  { id: 'advanced-topics', label: 'Community Model Presets' },
  { id: 'header-trouble', label: 'Diagnostics', isHeader: true },
  { id: 'pitfalls', label: 'Tuning Diagnostics' },
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
