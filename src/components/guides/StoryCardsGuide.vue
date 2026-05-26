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



      <!-- ===================== DYNAMIC LORE TRIGGERING ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-purple" />
            Dynamic Lore Triggering
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Story Cards are dynamic, conditional lore folders. Unlike Plot Essentials, which are always present, Story Cards remain dormant outside of context, loading only when their specified <strong>case-insensitive triggers</strong> are matching in recent turn history.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-purple" />
                  Trigger Timing Pipeline
                </h3>
                <ul class="space-y-1 text-bd-text-secondary">
                  <li>• <strong>Player Input:</strong> Match triggers instantly. The card is loaded into context for the current turn.</li>
                  <li>• <strong>AI Output:</strong> Match triggers for the subsequent turn. It is loaded on the next turn.</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Search class="w-4 h-4 text-bd-amber" />
                  The Scan Window
                </h3>
                <p class="text-bd-text-secondary">
                  The client scans a minimum of the last <strong>4 turns</strong> for triggers. If active cards take up minimal space, it automatically scales the scan window: `Available Tokens / 100` turns are checked.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-green" />
                  Lore Isolation
                </h3>
                <p class="text-bd-text-secondary">
                  Excellent for separating city maps, historical wars, and minor character metrics, freeing up tokens for core history actions.
                </p>
              </div>
            </div>

            <!-- Quick Start Steps -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Rocket class="w-4 h-4 text-bd-green" />
                Quick Start: Draft Your First Card
              </h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center mb-1">1</span>
                  <strong>Set the Title:</strong> Navigate to Story Cards → Add Card. Enter a name (e.g. `Sir Marcus`). The AI never sees this title; it is strictly admin.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center mb-1">2</span>
                  <strong>Define Triggers:</strong> In the triggers box, type comma-separated keywords (e.g. `marcus,sir marcus`). Case-insensitive, but spaces are literal.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center mb-1">3</span>
                  <strong>Write the Entry:</strong> Write 2-4 sentences. Always explicitly write the subject name inside the entry (e.g. `Sir Marcus is a royal guard commander.`).
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY & FIELDS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileText class="w-5 h-5 text-bd-blue" />
            Anatomy &amp; Fields
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary text-xs">
              Every Story Card is composed of distinct properties. Understanding their individual visibility dictates prompt integrity.
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-2">Field Visibility &amp; Compiler Matrix</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Field Name</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Is Sent to AI?</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Compiler Action</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Entry</td>
                      <td class="py-2 pr-4 text-bd-green font-bold">Yes (when active)</td>
                      <td class="py-2">Prefaced in prompt as `World Lore: [Entry Content]`.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Triggers</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Client parses these to conditionally trigger the Entry.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Title</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Scenario creator visual organization tag.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Type</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Categorization metric (Character, Location, Faction, Object).</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Notes</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No*</td>
                      <td class="py-2">Private commentary (*Only displayed in Character Creator templates).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TRIGGER FORMATTING MASTERY ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Trigger Formatting Mastery
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Triggers use exact character substring checks. Standardizing spacing, stubs, and pluralization prevents inactive cards and false triggers.
            </p>

            <!-- Literal Spacing Rules -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Literal Spacing Mechanics</h3>
              <p class="text-xs text-bd-text-secondary">
                How leading and trailing spaces dictate keyword evaluation:
              </p>
              <div class="grid md:grid-cols-4 gap-3 text-xs">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf</code>
                  <p class="text-bd-text-muted">No spaces: matches "elf", "myself", "shelf", "elfish". (High risk of false triggers).</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf</code>
                  <p class="text-bd-text-muted">Left space: matches " elf", "an elf", but safely blocks nested matches like "shelf".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf&nbsp;</code>
                  <p class="text-bd-text-muted">Right space: matches "elf ", "elf's", but blocks trailing nests like "self".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf&nbsp;</code>
                  <p class="text-bd-text-muted">Both spaces: strictly matches the isolated word " elf ". (Will fail on punctuation).</p>
                </div>
              </div>
            </div>

            <!-- Dialogue Quotes & Irregular Plurals -->
            <div class="grid md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Dialogue Quotes &amp; Apostrophes</h4>
                <ul class="space-y-1 list-disc list-inside text-bd-text-secondary">
                  <li><strong>Quotes Failure:</strong> Left-spaced triggers like <code class="text-bd-purple">&nbsp;elf</code> fail inside spoken dialogue: <code class="text-bd-green">"elf</code>. Add <code class="text-bd-purple">"elf</code> as a separate trigger.</li>
                  <li><strong>Apostrophes:</strong> Models output multiple quote curly glyphs. For `Marcus's`, add: <code class="text-bd-purple">Marcus's,Marcus's,Marcusʼs</code>.</li>
                  <li><strong>Word Root Stubbing:</strong> Match multiple derived vocabulary words using root stubs: <code class="text-bd-purple">therap</code> will match "therapy", "therapist", and "therapeutic".</li>
                </ul>
              </div>

              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Preventing False Nests &amp; Plurals</h4>
                <ul class="space-y-1 list-disc list-inside text-bd-text-secondary">
                  <li><strong>Short keyword risk:</strong> Keywords under 5 chars (e.g. `orc`) frequently false-trigger (e.g. `orchids`, `porch`). Always use spacing to isolate.</li>
                  <li><strong>Standard Plurals:</strong> Standard suffixes (`boat` -> `boats`) match automatically because `boat` is a substring of `boats`.</li>
                  <li><strong>Irregular Plurals:</strong> Root shifts (`elf` -> `elves`, `wolf` -> `wolves`) require writing both singular and plural triggers explicitly.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PRESETS & INTEGRATIONS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cog class="w-5 h-5 text-bd-purple" />
            Presets &amp; Integrations
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            
            <!-- Details vs Command Tab -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">AI Generation Tabs</h3>
              <p class="text-xs text-bd-text-secondary">
                The Story Card creator includes automated generation tabs to draft content quickly:
              </p>
              <div class="grid md:grid-cols-2 gap-4 text-xs">
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20">
                  <strong class="text-bd-blue block mb-1">Details Tab (Manual Creation)</strong>
                  Write everything yourself in prose. Highly recommended to maintain exact control.
                </div>
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20">
                  <strong class="text-bd-green block mb-1">Command Tab (AI Generation pass)</strong>
                  Input the title and a quick prompt parameter, and allow a dedicated background model to generate card content.
                </div>
              </div>
            </div>

            <!-- Command Presets -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Command Presets &amp; Templates</h3>
              <p class="text-xs text-bd-text-secondary">
                Custom presets shape the AI generator's prompt template. The standard template leverages the `{{title}}` token:
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green whitespace-pre-wrap leading-relaxed">Generate an information card for &#123;&#123;title&#125;&#125; using clearly labeled fields which are each on their own line, beginning with a field that identifies the name of &#123;&#123;title&#125;&#125;. Limit response to 750 characters, avoid markdown, and do not leave empty lines.</pre>
              
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle text-xs space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Card Formatting Modes</h4>
                <div class="grid md:grid-cols-3 gap-2">
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-text-primary block mb-0.5">None</strong>
                    Prose is saved exactly as returned. (Best for general models).
                  </div>
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-purple block mb-0.5">Curly Brackets { }</strong>
                    Formats output into structured bracket blocks for parser compatibility.
                  </div>
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-amber block mb-0.5">Square Brackets [ ]</strong>
                    Formats attributes as classic `[Marcus: Stoic rogue knight]` parameters.
                  </div>
                </div>
              </div>
            </div>

            <!-- JSON Import/Export -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">JSON Import &amp; Export Specifications</h3>
              <p class="text-xs text-bd-text-secondary">
                You can import scenarios and card folders in standard JSON formats (Web only):
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-normal">
[
  {
    "keys": "Marcus,Sir Marcus,the knight",
    "value": "Sir Marcus is a veteran commander of the Royal Guard.",
    "type": "character",
    "title": "Sir Marcus"
  }
]</pre>
              <p class="text-[10px] text-bd-text-muted">Only `keys` (Triggers) and `value` (Entry) are strictly mandatory for compiler import validation.</p>
              
              <div class="p-3 rounded bg-bd-pink/10 border border-bd-pink/20 text-xs text-bd-pink">
                <strong>CRITICAL OVERWRITE WARNING:</strong> Importing a JSON card file replaces your <strong>entire active Story Card list</strong>. It is a destructive full overwrite, not a merge. Always export a backup of your current scenario cards before importing a new file!
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== TRIGGER TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Trigger Troubleshooting &amp; Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Check this guide when Story Cards fail to trigger or bloat your prompts.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Post-Comma Spacing
                </h4>
                <p class="text-bd-text-secondary">Writing triggers as `marcus, knight`. The engine interprets the space literally and searches for " knight" (with a leading space).</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Strip all spaces: write <code class="text-bd-purple">marcus,knight</code>.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Overlapping Keywords
                </h4>
                <p class="text-bd-text-secondary">Setting triggers `castle` on Card A, and `black castle` on Card B. When "black castle" is written, both cards trigger, wasting context.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Make keywords distinct, or separate concepts.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Invisible Titles
                </h4>
                <p class="text-bd-text-secondary">Assuming the AI reads the Card Title. In reality, the AI only reads content inside the Entry field.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always write the subject's name explicitly inside the Entry prose.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Massive Card Bloat
                </h4>
                <p class="text-bd-text-secondary">Writing 500+ words in a single card entry. It eats up the entire dynamic budget, stopping other cards from triggering.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Limit entries to 2-4 sentences max.</p>
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
            <Users class="w-5 h-5 text-bd-purple" />
            Credits
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who researched, cataloged, and built command utilities for Story Cards:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in storyCardsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
                  {{ name }}
                </span>
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
import { STORY_CARDS_CONTRIBUTORS as storyCardsContributors } from '@/data/contributors'
import { 
  Layers, HelpCircle, Lightbulb, FileText, Zap, Cog, AlertTriangle, Award, Check, Pencil, Download, Search, Target, X, ChevronDown, ChevronUp, Info, MessageSquare, Brain, Coins, Sparkles, Rocket, Users
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Basics & Triggering', isHeader: true },
  { id: 'what-is', label: 'Dynamic Lore Triggering' },
  { id: 'anatomy', label: 'Anatomy & Fields' },
  { id: 'header-formatting', label: 'Trigger Mastery', isHeader: true },
  { id: 'best-practices', label: 'Trigger Formatting' },
  { id: 'header-presets', label: 'Presets & Formats', isHeader: true },
  { id: 'advanced-topics', label: 'Presets & Integrations' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Trigger Troubleshooting' },
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
