<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center">
          <Sparkles class="w-5 h-5 text-bd-accent-primary" />
        </div>
        The "Better" Ecosystem
      </h1>
      <p class="text-bd-text-secondary mt-2">
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

    <!-- Projects Grid -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-accent-primary" />
        Projects
      </h2>

      <div class="grid gap-4">
        <!-- BetterRepository -->
        <div class="card group hover:border-bd-accent-primary/30 transition-all duration-200">
          <div class="flex items-start gap-4">
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 flex items-center justify-center flex-shrink-0">
              <BookOpen class="w-7 h-7 text-bd-accent-primary" />
            </div>
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
            <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-bd-purple/20 to-bd-blue/20 flex items-center justify-center flex-shrink-0">
              <Chrome class="w-7 h-7 text-bd-purple" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-lg font-semibold text-bd-text-primary">BetterDungeon</h3>
                <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-bd-amber/20 text-bd-amber">Early Access</span>
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
  Sparkles, Puzzle, Layers, BookOpen, Chrome, Github, ExternalLink,
  Home, Gamepad2, Keyboard, Type, Palette, StickyNote, User,
  Rocket, Lightbulb, MessageCircle, Heart
} from 'lucide-vue-next'
</script>
