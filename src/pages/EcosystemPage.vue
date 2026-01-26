<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header class="text-center py-4">
      <div class="flex items-center justify-center gap-4 mb-3">
        <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-12 h-12 object-contain" />
        <span class="text-3xl text-bd-text-muted">+</span>
        <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="BetterDungeon" class="w-12 h-12 object-contain" />
      </div>
      <h1 class="text-2xl font-bold text-bd-text-primary">
        The "Better" Ecosystem
      </h1>
      <p class="text-bd-text-secondary mt-2 max-w-lg mx-auto">
        A suite of community tools designed to enhance your AI Dungeon experience.
      </p>
    </header>

    <!-- Ecosystem Overview -->
    <section class="card-elevated border-2 border-bd-accent-primary/30">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <Puzzle class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">What is the "Better" Ecosystem?</h2>
          <p class="text-bd-text-secondary">
            The "Better" ecosystem is a collection of open-source tools and resources created to enhance AI Dungeon. 
            Each project focuses on a different aspect of the experience, from browser extensions that add new features, 
            to curated repositories of community-created content.
          </p>
        </div>
      </div>
    </section>

    <!-- Quick Links Bar -->
    <div class="flex flex-wrap gap-3 justify-center">
      <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" rel="noopener noreferrer" 
         class="flex items-center gap-2 px-4 py-2 rounded-full bg-bd-bg-tertiary border border-bd-border hover:border-bd-accent-primary/50 transition-all">
        <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="" class="w-5 h-5" />
        <span class="text-sm text-bd-text-primary font-medium">Get BetterDungeon</span>
        <ExternalLink class="w-3 h-3 text-bd-text-muted" />
      </a>
      <router-link to="/" class="flex items-center gap-2 px-4 py-2 rounded-full bg-bd-bg-tertiary border border-bd-border hover:border-bd-accent-primary/50 transition-all">
        <img src="/betterrepository_logo.png" alt="" class="w-5 h-5" />
        <span class="text-sm text-bd-text-primary font-medium">Browse Resources</span>
      </router-link>
      <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" rel="noopener noreferrer"
         class="flex items-center gap-2 px-4 py-2 rounded-full bg-bd-bg-tertiary border border-bd-border hover:border-bd-purple/50 transition-all">
        <MessageCircle class="w-5 h-5 text-bd-purple" />
        <span class="text-sm text-bd-text-primary font-medium">Join Discord</span>
        <ExternalLink class="w-3 h-3 text-bd-text-muted" />
      </a>
    </div>

    <!-- Projects Grid -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-accent-primary" />
        Projects
      </h2>

      <div class="grid gap-4">
        <!-- BetterRepository -->
        <div class="card group hover:border-bd-accent-primary/30 transition-all duration-200 border-2 border-bd-success/30">
          <div class="flex items-start gap-4">
            <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-14 h-14 object-contain flex-shrink-0" />
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-bd-text-primary">BetterRepository</h3>
                <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-bd-success/20 text-bd-success">You're here!</span>
              </div>
              <p class="text-bd-text-secondary mb-4">
                The ultimate AI Dungeon resource hub. Find AI Instructions, Plot Components, Story Cards, and Scripts, 
                all curated, tested, and ready to copy-paste into your adventures.
              </p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="tag tag-amber">AI Instructions</span>
                <span class="tag tag-blue">Plot Components</span>
                <span class="tag tag-purple">Story Cards</span>
                <span class="tag tag-cyan">Scripts</span>
              </div>
              <div class="flex items-center gap-4">
                <router-link to="/" class="btn btn-primary btn-sm">
                  <Home class="w-4 h-4" />
                  Browse Resources
                </router-link>
                <a 
                  href="https://github.com/ComputerKWasTaken/BetterRepository" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-secondary btn-sm"
                >
                  <Github class="w-4 h-4" />
                  GitHub
                  <ExternalLink class="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- BetterDungeon -->
        <div class="card group hover:border-bd-purple/30 transition-all duration-200">
          <div class="flex items-start gap-4">
            <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="BetterDungeon" class="w-14 h-14 object-contain flex-shrink-0" />
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-bd-text-primary">BetterDungeon</h3>
              </div>
              <p class="text-bd-text-secondary mb-4">
                An all-in-one browser extension that enhances AI Dungeon with QOL additions and brand new features. 
                Add new input modes, hotkeys, markdown support, and much more, all without leaving your browser.
              </p>
              
              <!-- Feature Highlights -->
              <div class="grid md:grid-cols-2 gap-3 mb-4">
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <Gamepad2 class="w-4 h-4 text-bd-purple flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">New Input Modes</strong>  — Command & Try modes</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <Keyboard class="w-4 h-4 text-bd-blue flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">Hotkeys</strong>  — Full keyboard control</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <Type class="w-4 h-4 text-bd-cyan flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">Markdown</strong>  — Bold, italic, & more</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <Palette class="w-4 h-4 text-bd-amber flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">Mode Colors</strong>  — Visual feedback</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <StickyNote class="w-4 h-4 text-bd-success flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">Adventure Notes</strong>  — Per-adventure notes</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-tertiary">
                  <User class="w-4 h-4 text-bd-error flex-shrink-0" />
                  <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">Character Presets</strong>  — Save & auto-fill</span>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <a 
                  href="https://github.com/ComputerKWasTaken/BetterDungeon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  class="btn btn-primary btn-sm"
                >
                  <Github class="w-4 h-4" />
                  Get BetterDungeon
                  <ExternalLink class="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Better Together Section -->
    <section class="card-elevated border-2 border-bd-purple/30">
      <div class="flex items-center gap-3 mb-4">
        <div class="flex items-center gap-2">
          <img src="/betterrepository_logo.png" alt="" class="w-8 h-8" />
          <span class="text-bd-text-muted text-lg">+</span>
          <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="" class="w-8 h-8" />
        </div>
        <h2 class="text-lg font-semibold text-bd-text-primary">Better Together</h2>
      </div>
      <p class="text-bd-text-secondary mb-4">
        BetterDungeon and BetterRepository are designed to complement each other. Use them together for the ultimate AI Dungeon experience.
      </p>
      
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Search class="w-4 h-4 text-bd-accent-primary flex-shrink-0 mt-0.5" />
          <div>
            <span class="text-sm text-bd-text-primary font-medium">Find Resources Here</span>
            <p class="text-xs text-bd-text-secondary mt-0.5">Browse AI Instructions, Plot Components, and Scripts on BetterRepository</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Save class="w-4 h-4 text-bd-purple flex-shrink-0 mt-0.5" />
          <div>
            <span class="text-sm text-bd-text-primary font-medium">Save as Presets</span>
            <p class="text-xs text-bd-text-secondary mt-0.5">BetterDungeon's Presets let you save and quickly apply resources to your adventures</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Type class="w-4 h-4 text-bd-cyan flex-shrink-0 mt-0.5" />
          <div>
            <span class="text-sm text-bd-text-primary font-medium">Enhanced Formatting</span>
            <p class="text-xs text-bd-text-secondary mt-0.5">BetterDungeon renders markdown syntax from BetterRepository resources</p>
          </div>
        </div>
        <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Zap class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
          <div>
            <span class="text-sm text-bd-text-primary font-medium">One-Click Apply</span>
            <p class="text-xs text-bd-text-secondary mt-0.5">Copy from BetterRepository, save as a Preset, apply with one click</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Coming Soon / Future Projects -->
    <section class="card">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <Rocket class="w-5 h-5 text-bd-text-primary" />
        What's Next?
      </h2>
      <p class="text-bd-text-secondary mb-4">
        The "Better" ecosystem is always growing. Have an idea for a new tool or feature? 
        I'd love to hear it!
      </p>
      <div class="flex items-center gap-4">
        <a 
          href="https://github.com/ComputerKWasTaken/BetterDungeon/issues/new?template=feature_request.md" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-secondary btn-sm"
        >
          <Lightbulb class="w-4 h-4" />
          Suggest a Feature
          <ExternalLink class="w-3 h-3" />
        </a>
        <a 
          href="https://discord.com/invite/HB2YBZYjyf" 
          target="_blank" 
          rel="noopener noreferrer"
          class="btn btn-secondary btn-sm"
        >
          <MessageCircle class="w-4 h-4" />
          Join Discord
          <ExternalLink class="w-3 h-3" />
        </a>
      </div>
    </section>

    <!-- Credits -->
    <section class="card text-center">
      <Heart class="w-10 h-10 text-bd-error mx-auto mb-3" />
      <h2 class="text-lg font-semibold text-bd-text-primary mb-2">Made for the Community</h2>
      <p class="text-bd-text-secondary max-w-md mx-auto">
        All "Better" projects are open source and built with love for the AI Dungeon community. 
        Contributions, feedback, and ideas are always welcome.
      </p>
    </section>
  </div>
</template>

<script setup>
import { 
  Puzzle, Layers, Github, ExternalLink,
  Home, Gamepad2, Keyboard, Type, Palette, StickyNote, User,
  Rocket, Lightbulb, MessageCircle, Heart, Search, Save, Zap
} from 'lucide-vue-next'
</script>
