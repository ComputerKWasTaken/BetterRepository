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

  <!-- ===================== CREATING CONTENT OVERVIEW ===================== -->
  <section id="guide-content-overview" class="card">
    <button 
      @click="toggleGuideSection('content-overview')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <PenTool class="w-5 h-5 text-bd-amber" />
        Creating Content Overview
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('content-overview') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('content-overview')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon isn't just a game &mdash; it's a <strong>creative platform</strong>. You can create scenarios, build worlds, and share your creations with the community. This guide covers everything you need to know about creating and publishing content.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Drama class="w-4 h-4 text-bd-amber" />
              Scenarios
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Templates for adventures with pre-configured settings, prompts, and Story Cards.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ListTree class="w-4 h-4 text-bd-blue" />
              Multiple Choice
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Branching scenarios where players choose from predefined options to shape their story.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <UserPlus class="w-4 h-4 text-bd-purple" />
              Character Creators
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Interactive scenarios that let players customize their character before the adventure begins.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CHARACTER CREATOR SCENARIOS ===================== -->
  <section id="guide-character-creators" class="card">
    <button 
      @click="toggleGuideSection('character-creators')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <UserPlus class="w-5 h-5 text-bd-green" />
        Character Creator Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('character-creators') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('character-creators')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Character Creator Scenarios let players <strong>customize their character</strong> before starting the adventure. Players can fill in fields like name, class, background, and other traits that get incorporated into the story.
        </p>

        <div class="space-y-3">
          <h3 class="font-semibold text-bd-text-primary text-sm">How It Works</h3>
          
          <div class="space-y-2">
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green font-bold text-xs flex items-center justify-center">1</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Define Input Fields</p>
                <p class="text-xs text-bd-text-secondary">Create fields that players will fill in, such as Name, Class, Race, Background, etc. Each field becomes a variable.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green font-bold text-xs flex items-center justify-center">2</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Use Variables in Your Prompt</p>
                <p class="text-xs text-bd-text-secondary">Reference the player's choices in your initial prompt using the variable syntax. The fields are automatically inserted when the adventure starts.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green font-bold text-xs flex items-center justify-center">3</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Auto-Generate Story Cards</p>
                <p class="text-xs text-bd-text-secondary">Use Scripts to automatically create Story Cards from the player's character choices, ensuring the AI remembers character details throughout the adventure.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Tip:</strong> Keep the number of input fields reasonable (3-6 is ideal). Too many fields can overwhelm players. Focus on choices that meaningfully impact the story.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MULTIPLE CHOICE SCENARIOS ===================== -->
  <section id="guide-multiple-choice" class="card">
    <button 
      @click="toggleGuideSection('multiple-choice')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ListTree class="w-5 h-5 text-bd-blue" />
        Multiple Choice Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('multiple-choice') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('multiple-choice')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Scenario Options allow you to create <strong>branching paths</strong> within your scenario. When a player starts the scenario, they're presented with choices that lead to different story branches.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 text-sm">Building a Branching Scenario</h3>
          <div class="space-y-3">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-primary font-medium mb-1">Root Scenario</p>
              <p class="text-xs text-bd-text-secondary">Start with a base scenario that introduces the setting and presents the first choice to the player.</p>
            </div>
            <div class="flex justify-center">
              <ChevronDown class="w-4 h-4 text-bd-text-muted" />
            </div>
            <div class="grid md:grid-cols-3 gap-2">
              <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30 text-center">
                <p class="text-xs text-bd-text-primary font-medium">Option A</p>
                <p class="text-[10px] text-bd-text-muted">Leads to Branch A</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30 text-center">
                <p class="text-xs text-bd-text-primary font-medium">Option B</p>
                <p class="text-[10px] text-bd-text-muted">Leads to Branch B</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30 text-center">
                <p class="text-xs text-bd-text-primary font-medium">Option C</p>
                <p class="text-[10px] text-bd-text-muted">Leads to Branch C</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">Each Branch Can Have:</h3>
          <div class="grid md:grid-cols-2 gap-2">
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-blue mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary">Its own unique initial prompt</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-blue mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary">Different AI Instructions</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-blue mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary">Custom Story Cards and Plot Essentials</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-blue mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary">Further sub-options for deeper branching</p>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              Multiple choice works well combined with character creators. Present a choice after character creation to set the player on a unique path.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TRENDING & DISCOVERY ===================== -->
  <section id="guide-trending" class="card">
    <button 
      @click="toggleGuideSection('trending')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <TrendingUp class="w-5 h-5 text-bd-purple" />
        Trending &amp; Discovery
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('trending') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('trending')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Published scenarios can appear in the <strong>Trending</strong> and <strong>Discovery</strong> sections, where other players can find and play them. Understanding how these systems work helps you get more visibility for your creations.
        </p>

        <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <TrendingUp class="w-4 h-4 text-bd-purple" />
            How Trending Works
          </h3>
          <p class="text-xs text-bd-text-secondary mb-3">
            The Trending category ranks scenarios based on recent player engagement. Factors include:
          </p>
          <div class="space-y-2">
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-purple mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Recent plays</strong> &mdash; How many players have started the scenario recently</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-purple mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Player engagement</strong> &mdash; How long players spend in the adventure</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-purple mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Recency</strong> &mdash; Newer scenarios get a boost in the algorithm</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-purple mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Tips (Scales)</strong> &mdash; Scenarios that receive Scales from players get a visibility boost</p>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <div class="text-xs text-bd-text-secondary">
              <strong>Tips for getting discovered:</strong>
              <ul class="mt-1 space-y-1 ml-4 list-disc">
                <li>Write a compelling title and description</li>
                <li>Use a good cover image (See mode or custom upload)</li>
                <li>Create well-crafted AI Instructions and Story Cards for quality gameplay</li>
                <li>Share your scenario in the AI Dungeon community (Discord, Reddit)</li>
                <li>Update and improve your scenario based on player feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SCRIPTS IN SCENARIOS ===================== -->
  <section id="guide-scripts-scenarios" class="card">
    <button 
      @click="toggleGuideSection('scripts-scenarios')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Code class="w-5 h-5 text-bd-cyan" />
        Scripts in Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('scripts-scenarios') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('scripts-scenarios')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Scripts are an advanced way to enhance your scenarios with <strong>programmatic behavior</strong>. They can automate tasks, generate dynamic content, and add game mechanics.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 text-sm">What Scripts Can Do</h3>
          <div class="grid md:grid-cols-2 gap-2">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-primary font-medium mb-1">Generate Story Cards</p>
              <p class="text-xs text-bd-text-secondary">Automatically create Story Cards based on player actions or character creation</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-primary font-medium mb-1">Simulate Dice Rolls</p>
              <p class="text-xs text-bd-text-secondary">Add RPG mechanics with random number generation for combat, skill checks, etc.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-primary font-medium mb-1">Track Variables</p>
              <p class="text-xs text-bd-text-secondary">Keep track of health, inventory, relationships, and other game state</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <p class="text-xs text-bd-text-primary font-medium mb-1">Modify Context</p>
              <p class="text-xs text-bd-text-secondary">Dynamically alter what information is sent to the AI based on conditions</p>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-red/10 border border-bd-red/30">
          <div class="flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Important:</strong> Scripts can only be added to a Scenario by the creator of the Scenario. They cannot be added to an ongoing Adventure unless you own the Scenario that was used to create it.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For detailed scripting tutorials and examples, see the 
              <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline">Scripts Guide</router-link> and 
              <router-link to="/guides?tab=betterscripts" class="text-bd-accent-primary hover:underline">BetterScripts Guide</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TIPS FOR GREAT SCENARIOS ===================== -->
  <section id="guide-great-scenarios" class="card">
    <button 
      @click="toggleGuideSection('great-scenarios')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Star class="w-5 h-5 text-bd-amber" />
        Tips for Great Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('great-scenarios') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('great-scenarios')" class="mt-4 space-y-4">
        
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-amber" />
              Strong Initial Prompt
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Write a vivid, immersive opening that sets the scene and gives the player a clear starting point. Include sensory details and establish the tone.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ScrollText class="w-4 h-4 text-bd-blue" />
              Detailed AI Instructions
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Include thorough AI Instructions that define the world, rules, and writing style. This is the most impactful thing you can do for quality.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-green" />
              Story Cards for Key Elements
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Create Story Cards for important characters, locations, and items. This ensures the AI remembers and consistently portrays them.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ClipboardList class="w-4 h-4 text-bd-purple" />
              Clear Plot Essentials
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Set up Plot Essentials with the core information the AI needs to know at all times &mdash; main character details, current objectives, and world rules.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Test your scenario!</strong> Play through it yourself multiple times before publishing. Try different choices and paths to make sure the AI handles them well. A well-tested scenario stands out from the crowd.
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
  ChevronDown, ChevronUp, PenTool, Drama, ListTree, UserPlus,
  Lightbulb, Info, AlertTriangle, TrendingUp, Code, Star,
  FileText, ScrollText, Layers, ClipboardList
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-overview', label: 'Overview', isHeader: true },
  { id: 'content-overview', label: 'Creating Content' },
  { id: 'header-types', label: 'Scenario Types', isHeader: true },
  { id: 'character-creators', label: 'Character Creators' },
  { id: 'multiple-choice', label: 'Multiple Choice' },
  { id: 'header-publishing', label: 'Publishing', isHeader: true },
  { id: 'trending', label: 'Trending & Discovery' },
  { id: 'scripts-scenarios', label: 'Scripts in Scenarios' },
  { id: 'great-scenarios', label: 'Tips for Great Scenarios' },
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
