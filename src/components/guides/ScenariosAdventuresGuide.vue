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

  <!-- ===================== WHAT ARE ADVENTURES ===================== -->
  <section id="guide-what-are-adventures" class="card">
    <button 
      @click="toggleGuideSection('what-are-adventures')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Swords class="w-5 h-5 text-bd-amber" />
        What Are Adventures?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-are-adventures') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('what-are-adventures')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          An <strong>"Adventure"</strong> is a standalone play-through in AI Dungeon &mdash; your story. Adventures have a title, description, tags, settings, and a collection of Actions (the text blocks that make up your story). When you play AI Dungeon, you are playing in an Adventure.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Zap class="w-4 h-4 text-bd-amber" />
              Starting an Adventure
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>Quick Start</strong> &mdash; Hit Play, choose setting and character, jump in</li>
              <li><strong>From a Scenario</strong> &mdash; Browse Discover, pick a Scenario, hit Play</li>
              <li>Every Adventure is <strong>automatically saved</strong> to My Stuff</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-blue" />
              Actions
            </h3>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li>Text blocks up to <strong>4000 characters</strong> each</li>
              <li>Created when you send input or the AI responds</li>
              <li>Can be individually <strong>edited, undone, redone, or erased</strong></li>
              <li>Do and Say actions show icons; Story and AI outputs don't</li>
            </ul>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Adventure Settings</h4>
          <p class="text-xs text-bd-text-secondary mb-3">
            Access Adventure Settings via the <strong>gear icon</strong> in the upper right corner of gameplay. Settings are split into two tabs:
          </p>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="p-3 rounded bg-bd-bg-primary">
              <h5 class="text-xs font-semibold text-bd-text-primary mb-1">Adventure Tab</h5>
              <ul class="text-[10px] text-bd-text-muted space-y-1">
                <li>Title, description, and tags</li>
                <li>Content rating settings</li>
                <li>Publishing options (Private, Unlisted, Published)</li>
              </ul>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary">
              <h5 class="text-xs font-semibold text-bd-text-primary mb-1">Gameplay Tab</h5>
              <ul class="text-[10px] text-bd-text-muted space-y-1">
                <li>AI Model selection</li>
                <li>Model settings (Temperature, Top-K, etc.)</li>
                <li>Image generator settings</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Finding Adventures:</strong> All your Adventures are saved in <strong>My Stuff</strong>. Use the search feature to find specific Adventures by title, tags, rating, or time range. Your Adventures are completely private &mdash; only you can search for them.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== WHAT ARE SCENARIOS ===================== -->
  <section id="guide-what-are-scenarios" class="card">
    <button 
      @click="toggleGuideSection('what-are-scenarios')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Drama class="w-5 h-5 text-bd-purple" />
        What Are Scenarios?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-are-scenarios') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('what-are-scenarios')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Scenarios are <strong>templates</strong> that players can use to start new Adventures. They're like blueprints that transfer all their Plot Essentials, Story Cards, AI Instructions, and other settings into a fresh Adventure when someone hits "Play".
        </p>

        <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Sparkles class="w-4 h-4 text-bd-purple" />
            What Makes Scenarios Powerful
          </h4>
          <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
            <div>Start multiple Adventures from the same custom beginning</div>
            <div>Publish for other players to experience your creation</div>
            <div>Include custom AI Instructions, Plot Essentials, and Story Cards</div>
            <div>Add Scripting for game mechanics and automation</div>
            <div>Create Character Creator options for player customization</div>
            <div>Build Multiple Choice branching paths</div>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Playing a Scenario</h4>
          <div class="space-y-2">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">1</span>
              <p class="text-xs text-bd-text-secondary">Find a Scenario via <strong>My Stuff</strong>, <strong>Search/Discover</strong>, or a shared link</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">2</span>
              <p class="text-xs text-bd-text-secondary">Click <strong>"Play"</strong> to start a new Adventure from the Scenario</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">3</span>
              <p class="text-xs text-bd-text-secondary">Answer any <strong>setup questions</strong> (character name, background, etc.)</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple text-xs font-bold flex items-center justify-center">4</span>
              <p class="text-xs text-bd-text-secondary">The <strong>Prompt</strong> begins your Adventure and the AI generates the first output</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CREATING SCENARIOS ===================== -->
  <section id="guide-creating-scenarios" class="card">
    <button 
      @click="toggleGuideSection('creating-scenarios')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <PenTool class="w-5 h-5 text-bd-green" />
        Creating Your Own Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('creating-scenarios') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('creating-scenarios')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Creating a Scenario lets you build reusable starting points for Adventures. You can keep them private or publish them for the entire AI Dungeon community to enjoy.
        </p>

        <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
          <h4 class="font-semibold text-bd-text-primary mb-2">How to Create a Scenario</h4>
          <div class="space-y-2">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green text-xs font-bold flex items-center justify-center">1</span>
              <p class="text-xs text-bd-text-secondary"><strong>Desktop:</strong> Click the "Play" button at the top right &rarr; "Create Scenario"</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green text-xs font-bold flex items-center justify-center">2</span>
              <p class="text-xs text-bd-text-secondary"><strong>Mobile:</strong> Press the large "&gt;" button at the bottom &rarr; "Create Scenario"</p>
            </div>
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-green/20 text-bd-green text-xs font-bold flex items-center justify-center">3</span>
              <p class="text-xs text-bd-text-secondary">Fill in the <strong>Basics</strong> and <strong>Technical</strong> tabs (see below)</p>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- The Basics -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Eye class="w-4 h-4 text-bd-text-muted" />
              The Basics (What Players See)
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>Title</strong> &mdash; Name of your Scenario</li>
              <li><strong>Description</strong> &mdash; What players see before they play</li>
              <li><strong>Tags</strong> &mdash; Help players find your Scenario</li>
              <li><strong>Rating</strong> &mdash; Content maturity level</li>
              <li><strong>Published/Unlisted</strong> &mdash; Visibility setting</li>
              <li><strong>Placeholders</strong> &mdash; Custom questions for players</li>
            </ul>
          </div>
          <!-- The Technical -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Code class="w-4 h-4 text-bd-text-muted" />
              The Technical (What the AI Sees)
            </h4>
            <ul class="text-xs text-bd-text-secondary space-y-1.5">
              <li><strong>Prompt</strong> &mdash; The starting text of the Adventure</li>
              <li><strong>Plot Essentials</strong> &mdash; Always-in-context key facts</li>
              <li><strong>Author's Note</strong> &mdash; Tone and style guidance</li>
              <li><strong>Story Cards</strong> &mdash; Character/location/item cards</li>
              <li><strong>Scripting</strong> &mdash; JavaScript for game mechanics</li>
            </ul>
          </div>
        </div>

        <!-- Scenario Types -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Scenario Types</h4>
          <div class="grid md:grid-cols-3 gap-3">
            <div class="p-3 rounded bg-bd-bg-primary">
              <h5 class="text-xs font-semibold text-bd-amber mb-1">Standard</h5>
              <p class="text-[10px] text-bd-text-muted">Simple starting prompt with preconfigured settings. Players jump straight into the story.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary">
              <h5 class="text-xs font-semibold text-bd-blue mb-1">Character Creator</h5>
              <p class="text-[10px] text-bd-text-muted">Players answer questions to customize their character before the Adventure begins.</p>
            </div>
            <div class="p-3 rounded bg-bd-bg-primary">
              <h5 class="text-xs font-semibold text-bd-purple mb-1">Multiple Choice</h5>
              <p class="text-[10px] text-bd-text-muted">Players choose from preset options that branch into different story paths.</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== PUBLISHING CONTENT ===================== -->
  <section id="guide-publishing" class="card">
    <button 
      @click="toggleGuideSection('publishing')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Globe class="w-5 h-5 text-bd-blue" />
        Publishing & Visibility
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('publishing') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('publishing')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon has three visibility levels for your content. Understanding these helps you control who sees your creations.
        </p>

        <div class="grid md:grid-cols-3 gap-3">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <div class="flex items-center gap-2 mb-2">
              <Lock class="w-4 h-4 text-bd-green" />
              <h4 class="font-semibold text-bd-text-primary text-sm">Private</h4>
            </div>
            <p class="text-xs text-bd-text-secondary">Only you can see and access this content. Default for all new content.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <div class="flex items-center gap-2 mb-2">
              <Link class="w-4 h-4 text-bd-amber" />
              <h4 class="font-semibold text-bd-text-primary text-sm">Unlisted</h4>
            </div>
            <p class="text-xs text-bd-text-secondary">Anyone with the direct link can access it, but it won't appear in search or Discover.</p>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <div class="flex items-center gap-2 mb-2">
              <Globe class="w-4 h-4 text-bd-blue" />
              <h4 class="font-semibold text-bd-text-primary text-sm">Published</h4>
            </div>
            <p class="text-xs text-bd-text-secondary">Visible to everyone via search, Discover, and direct links. Can appear in Trending.</p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">How Trending Works</h4>
          <p class="text-xs text-bd-text-secondary">
            Published Scenarios can appear in the Trending category based on recent play activity. The more players engage with your Scenario, the more likely it is to trend. Quality content with good descriptions and tags tends to perform best.
          </p>
        </div>

        <!-- Tips -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Tips for Creating Great Scenarios</h4>
          <div class="space-y-2 text-xs text-bd-text-secondary">
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">1.</span>
              <span><strong>Write a compelling description</strong> &mdash; This is what sells your Scenario. Be descriptive about the setting, tone, and what makes it unique.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">2.</span>
              <span><strong>Use relevant tags</strong> &mdash; Help players find your Scenario by tagging it with genre, theme, and style keywords.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">3.</span>
              <span><strong>Test thoroughly</strong> &mdash; Play through your Scenario multiple times. Test different player choices and make sure the AI handles them well.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">4.</span>
              <span><strong>Set up Plot Components</strong> &mdash; Good AI Instructions, Plot Essentials, and Story Cards make the difference between a mediocre Scenario and an amazing one.</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">5.</span>
              <span><strong>Keep the prompt engaging</strong> &mdash; The opening text sets the tone. Make it immersive and give the player a clear starting point.</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== INITIAL PROMPT ===================== -->
  <section id="guide-initial-prompt" class="card">
    <button 
      @click="toggleGuideSection('initial-prompt')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ScrollText class="w-5 h-5 text-bd-cyan" />
        The Initial Prompt
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('initial-prompt') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('initial-prompt')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The <strong>Initial Prompt</strong> (or just "Prompt") is the first block of text in an Adventure. It sets the scene and gives the AI the starting context to build upon. In Scenarios, the Prompt is what the creator writes as the opening narration.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">What Makes a Good Prompt</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Establishes the <strong>setting</strong> and <strong>atmosphere</strong></li>
              <li>Introduces the <strong>player character's situation</strong></li>
              <li>Gives a clear <strong>starting point</strong> for action</li>
              <li>Matches the <strong>writing style</strong> you want the AI to mimic</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 text-sm">Common Mistakes</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Being too <strong>vague</strong> ("You are in a place")</li>
              <li>Being too <strong>long</strong> (walls of text overwhelm the AI)</li>
              <li>Not matching the <strong>tone</strong> of your AI Instructions</li>
              <li>Ending on a <strong>closed statement</strong> instead of an open one</li>
            </ul>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-cyan flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Tip:</strong> End your prompt on an <strong>open note</strong> that invites action. Instead of "You arrived at the castle," try "You stand before the towering castle gates, wondering what awaits inside..." This gives the AI (and the player) a natural launching point.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== SCRIPTS IN SCENARIOS ===================== -->
  <section id="guide-scenario-scripts" class="card">
    <button 
      @click="toggleGuideSection('scenario-scripts')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Terminal class="w-5 h-5 text-bd-teal" />
        Scripts in Scenarios
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('scenario-scripts') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('scenario-scripts')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Scripts are an advanced way to alter your AI Dungeon experience. They can generate Story Cards, simulate dice rolls, manage inventory systems, and much more. Scripts can only be added to a <strong>Scenario by its creator</strong> &mdash; they cannot be added to an ongoing Adventure unless you own the Scenario it was created from.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Key Points About Scripts</h4>
          <ul class="text-xs text-bd-text-secondary space-y-1.5">
            <li>Scripts use <strong>JavaScript</strong> and run within AI Dungeon's scripting sandbox</li>
            <li>They can modify the AI's <strong>input, context, and output</strong></li>
            <li>Scripts are tied to <strong>Scenarios</strong>, not individual Adventures</li>
            <li>Players can install Scripts from published Scenarios</li>
          </ul>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For a complete guide on writing and using scripts, see the 
              <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline font-medium">Scripts Guide</router-link> and
              <router-link to="/guides?tab=betterscripts" class="text-bd-accent-primary hover:underline font-medium">BetterScripts Guide</router-link>.
            </p>
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
  Swords, Drama, PenTool, Globe, ScrollText, Terminal,
  ChevronDown, ChevronUp, Info, Lightbulb, Sparkles, Zap,
  FileText, Eye, Code, Lock, Link
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Adventures', isHeader: true },
  { id: 'what-are-adventures', label: 'What Are Adventures?' },
  { id: 'header-scenarios', label: 'Scenarios', isHeader: true },
  { id: 'what-are-scenarios', label: 'What Are Scenarios?' },
  { id: 'creating-scenarios', label: 'Creating Your Own Scenarios' },
  { id: 'header-publishing', label: 'Publishing & More', isHeader: true },
  { id: 'publishing', label: 'Publishing & Visibility' },
  { id: 'initial-prompt', label: 'The Initial Prompt' },
  { id: 'scenario-scripts', label: 'Scripts in Scenarios' }
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
