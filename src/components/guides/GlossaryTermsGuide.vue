<template>
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

  <!-- ===================== ABOUT THIS GLOSSARY ===================== -->
  <section id="guide-about-glossary" class="card">
    <button 
      @click="toggleGuideSection('about-glossary')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-bd-amber" />
        About This Glossary
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('about-glossary') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('about-glossary')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon has its own vocabulary of terms, features, and concepts. This glossary serves as a <strong>comprehensive reference</strong> for every important term you'll encounter while playing. Whether you're a new player or an experienced creator, use this as your go-to reference.
        </p>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              Terms are organized into categories. For deeper dives into specific topics, follow the links to the relevant guides throughout this glossary.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CORE GAMEPLAY TERMS ===================== -->
  <section id="guide-core-terms" class="card">
    <button 
      @click="toggleGuideSection('core-terms')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Gamepad2 class="w-5 h-5 text-bd-green" />
        Core Gameplay Terms
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('core-terms') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('core-terms')" class="mt-4 space-y-3">
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-bd-border-subtle">
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider w-1/4">Term</th>
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Action</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Individual entries in the story, created by you, the AI, or another player. You can click these to edit or undo them individually. Comes in 
                  <router-link to="/guides?tab=game-modes" class="text-bd-accent-primary hover:underline">Do, Say, Story, and See</router-link> modes.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Adventure</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Individual play-throughs of AI Dungeon, also referred to as a game or story. Each adventure is automatically saved and can be revisited from "My Stuff".
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Scenario</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  A template for starting an adventure, usually containing customized fields like AI Instructions, Plot Essentials, Story Cards, and Scripts. Typically made by other players and found on the Discovery page. See the 
                  <router-link to="/guides?tab=scenarios-adventures" class="text-bd-accent-primary hover:underline">Scenarios Guide</router-link>.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Prompt</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  A block of text made to start an Adventure, usually the beginning of a Scenario, World, Quick Start, or the first thing you type in a custom game. Also called the "Initial Prompt".
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Input</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Text that you send to the AI, such as an Action, a starting Prompt, or an out-of-story command.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Output</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  What the AI generates for you in response to your Context and Input. This is the AI's contribution to the story.
                </td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">My Stuff</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  A collection of your Adventures, Scenarios, and Worlds. Access it from the main navigation to find and manage all your saved content.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTEXT & AI TERMS ===================== -->
  <section id="guide-context-terms" class="card">
    <button 
      @click="toggleGuideSection('context-terms')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Brain class="w-5 h-5 text-bd-blue" />
        Context &amp; AI Terms
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-terms') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-terms')" class="mt-4 space-y-3">
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-bd-border-subtle">
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider w-1/4">Term</th>
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Token</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Numerical values which correspond to words, parts of words, and phrases, used by the AI to input and output text. Roughly 1 token &asymp; 3-4 characters or &frac34; of a word. See the 
                  <router-link to="/guides?tab=context-memory" class="text-bd-accent-primary hover:underline">Context &amp; Memory Guide</router-link>.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Context</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  The text the AI uses to generate responses. Includes your recent story actions, AI Instructions, Plot Essentials, Story Cards, Author's Note, and Memory Bank entries. The AI can only "see" what fits in the context window.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Current Context</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  The specific portion of the story and metadata that the AI can currently access at any given moment. This changes as the story progresses.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Context Engineering</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  The art of creating context specifically designed with the AI in mind. Crafting efficient, well-structured information so the AI produces the best possible output.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Memory Bank</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  A collection of events that have happened in your story, automatically recalled when relevant to keep consistency. The system creates condensed summaries of story chunks and selects the most relevant memories for context.
                </td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Model Settings</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Options for how the AI generates its responses. Includes Response Length, Temperature, Top-K, Top-P, and Penalties. See the 
                  <router-link to="/guides?tab=ai-models" class="text-bd-accent-primary hover:underline">AI Models Guide</router-link>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== PLOT COMPONENT TERMS ===================== -->
  <section id="guide-plot-terms" class="card">
    <button 
      @click="toggleGuideSection('plot-terms')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <BookMarked class="w-5 h-5 text-bd-purple" />
        Plot Component Terms
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('plot-terms') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('plot-terms')" class="mt-4 space-y-3">

        <p class="text-bd-text-secondary text-sm">
          Plot Components are the core tools you use to guide the AI's storytelling. Think of them as different levers you can pull to shape your narrative.
        </p>
        
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <ScrollText class="w-4 h-4 text-bd-amber" />
              AI Instructions (AIN)
            </h3>
            <p class="text-xs text-bd-text-secondary">
              A list of instructions and rules for the AI to follow when writing your story. Sent as its own system prompt, separate from any other context. Think of it as <strong>programming the brain of an author</strong>. See the 
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline">AI Instructions Guide</router-link>.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-blue" />
              Author's Note (AN)
            </h3>
            <p class="text-xs text-bd-text-secondary">
              A small amount of text added at the end of the Context, to control style, themes, and pacing. Sometimes abbreviated as "AN" or "A/N". Think of it as <strong>providing feedback to the author</strong> about what type of story and writing style you want.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <ClipboardList class="w-4 h-4 text-bd-green" />
              Plot Essentials (PE)
            </h3>
            <p class="text-xs text-bd-text-secondary">
              An editable field used to describe and keep track of essential information, such as details about your main character. Acts as <strong>short-term memory</strong> &mdash; always in context. See the 
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline">Plot Components Guide</router-link>.
            </p>
          </div>

          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-purple" />
              Story Cards (SC)
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Contextual, limited-time information about something specific, only brought into the Context when its Trigger is mentioned in the story. Acts as <strong>long-term memory</strong> &mdash; not always in context. See the 
              <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline">Story Cards Guide</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== STORY CARD RELATED TERMS ===================== -->
  <section id="guide-storycard-terms" class="card">
    <button 
      @click="toggleGuideSection('storycard-terms')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Tag class="w-5 h-5 text-bd-cyan" />
        Story Card Related Terms
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('storycard-terms') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('storycard-terms')" class="mt-4 space-y-3">
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-bd-border-subtle">
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider w-1/4">Term</th>
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Triggers</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Words that you put on a Story Card to tell the system when to activate it. For instance, if you made a Story Card for <em>Joe</em>, you would set the trigger to "Joe". That way, whenever the story mentions "Joe", the card's information is pulled into context. Triggers should be something that appears naturally in the story.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">World Lore</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  The collection of every Story Card currently triggered in your adventure. If you have three Story Cards triggered &mdash; <em>Joe</em>, <em>Jack</em>, and <em>Jack's House</em> &mdash; they are all grouped together under the header "World Lore:" in the context.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Tip:</strong> If you're making a Story Card for a character named <em>Jack Johnson</em>, you may only want to set the trigger to "Jack", because the AI rarely uses full names. Triggers should match what appears naturally in the narrative.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CURRENCY & MEMBERSHIP TERMS ===================== -->
  <section id="guide-currency-terms" class="card">
    <button 
      @click="toggleGuideSection('currency-terms')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Coins class="w-5 h-5 text-bd-amber" />
        Currency &amp; Membership Terms
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('currency-terms') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('currency-terms')" class="mt-4 space-y-3">
        
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-bd-border-subtle">
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider w-1/4">Term</th>
                <th class="text-left py-2 px-3 text-bd-text-muted font-semibold text-xs uppercase tracking-wider">Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Credits</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  AI Dungeon's premium currency, given out monthly to subscribers and sometimes as compensation. Credits are used to access premium AI models and generate images.
                </td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Scales</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  AI Dungeon's soft currency. Can be collected through Daily Login Rewards or received as tips from other creators. Can be used to speed up free models or given to other players as a sign of gratitude.
                </td>
              </tr>
              <tr>
                <td class="py-3 px-3 font-semibold text-bd-text-primary align-top">Scripting</td>
                <td class="py-3 px-3 text-bd-text-secondary text-xs">
                  Program code, written in JavaScript, which makes changes to the text as an Adventure is played. Scripts can generate Story Cards, simulate dice rolls, and more. Can only be added to a Scenario by its creator. See the 
                  <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline">Scripts Guide</router-link>.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== QUICK REFERENCE CARD ===================== -->
  <section id="guide-quick-reference" class="card">
    <button 
      @click="toggleGuideSection('quick-reference')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Zap class="w-5 h-5 text-bd-amber" />
        Quick Reference Card
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-reference') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('quick-reference')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary text-sm">
          A quick mental model for understanding how the core Plot Components work together:
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <div class="flex items-center gap-2 mb-2">
              <ScrollText class="w-4 h-4 text-bd-amber" />
              <h3 class="font-semibold text-bd-text-primary text-sm">AI Instructions</h3>
            </div>
            <p class="text-xs text-bd-text-secondary italic">"Programming the brain of an author"</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <div class="flex items-center gap-2 mb-2">
              <FileText class="w-4 h-4 text-bd-blue" />
              <h3 class="font-semibold text-bd-text-primary text-sm">Author's Note</h3>
            </div>
            <p class="text-xs text-bd-text-secondary italic">"Feedback on the story style you want"</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <div class="flex items-center gap-2 mb-2">
              <ClipboardList class="w-4 h-4 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary text-sm">Plot Essentials</h3>
            </div>
            <p class="text-xs text-bd-text-secondary italic">"Short-term memory, always in context"</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <div class="flex items-center gap-2 mb-2">
              <Layers class="w-4 h-4 text-bd-purple" />
              <h3 class="font-semibold text-bd-text-primary text-sm">Story Cards</h3>
            </div>
            <p class="text-xs text-bd-text-secondary italic">"Long-term memory, not always in context"</p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For detailed guides on each of these components, explore the 
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline">AI Instructions</router-link>,
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline">Plot Components</router-link>, and 
              <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline">Story Cards</router-link> guides.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronDown, ChevronUp, BookOpen, Gamepad2, Brain, BookMarked,
  Tag, Coins, Zap, Info, Lightbulb, ScrollText, FileText, 
  ClipboardList, Layers
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-reference', label: 'Reference', isHeader: true },
  { id: 'about-glossary', label: 'About This Glossary' },
  { id: 'header-terms', label: 'Terms by Category', isHeader: true },
  { id: 'core-terms', label: 'Core Gameplay Terms' },
  { id: 'context-terms', label: 'Context & AI Terms' },
  { id: 'plot-terms', label: 'Plot Component Terms' },
  { id: 'storycard-terms', label: 'Story Card Terms' },
  { id: 'currency-terms', label: 'Currency & Membership' },
  { id: 'header-summary', label: 'Summary', isHeader: true },
  { id: 'quick-reference', label: 'Quick Reference Card' },
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const toggleGuideSection = (id) => {
  if (expandedGuideSections.value.has(id)) {
    expandedGuideSections.value.delete(id)
  } else {
    expandedGuideSections.value.add(id)
  }
}
const expandAllGuideSections = () => {
  guideSections.filter(s => !s.isHeader).forEach(s => expandedGuideSections.value.add(s.id))
}
const collapseAllGuideSections = () => {
  expandedGuideSections.value.clear()
}
const scrollToGuideSection = (id) => {
  if (!isGuideSectionExpanded(id)) toggleGuideSection(id)
  setTimeout(() => {
    document.getElementById(`guide-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>
