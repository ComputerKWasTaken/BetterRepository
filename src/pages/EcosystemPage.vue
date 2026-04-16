<template>
  <div class="space-y-8">
    <!-- Hero Header -->
    <header class="eco-hero relative text-center py-12 px-6 overflow-hidden rounded-2xl">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--orange" aria-hidden="true" />
      <div class="hero-orb hero-orb--purple" aria-hidden="true" />
      <div class="hero-orb hero-orb--cyan" aria-hidden="true" />
      
      <div class="relative z-10">
        <!-- Logo Showcase -->
        <div class="flex items-center justify-center gap-6 mb-8">
          <div class="relative group">
            <div class="absolute inset-0 bg-bd-accent-primary/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative p-3 rounded-2xl bg-bd-bg-secondary/80 border border-bd-accent-primary/30 backdrop-blur-sm animate-float">
              <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg" />
            </div>
          </div>
          
          <div class="flex flex-col items-center gap-1">
            <Sparkles class="w-6 h-6 text-bd-accent-primary animate-pulse" />
            <Plus class="w-5 h-5 text-bd-text-muted" />
          </div>
          
          <div class="relative group">
            <div class="absolute inset-0 bg-bd-purple/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div class="relative p-3 rounded-2xl bg-bd-bg-secondary/80 border border-bd-purple/30 backdrop-blur-sm animate-float" style="animation-delay: 1s;">
              <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="BetterDungeon" class="w-16 h-16 md:w-20 md:h-20 object-contain drop-shadow-lg" />
            </div>
          </div>
          
        </div>
        
        <h1 class="text-3xl md:text-4xl font-bold text-bd-text-primary mb-3 tracking-tight">
          The <span class="text-gradient bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan bg-clip-text text-transparent">"Better"</span> Ecosystem
        </h1>
        <p class="text-lg text-bd-text-secondary max-w-xl mx-auto mb-6 leading-relaxed">
          A suite of open-source tools designed to enhance your AI Dungeon experience
        </p>
        
        <!-- Stats Bar -->
        <div class="flex flex-wrap justify-center gap-6 text-center">
          <div class="px-4 group">
            <div class="text-2xl font-bold text-bd-accent-primary group-hover:scale-110 transition-transform">2</div>
            <div class="text-xs text-bd-text-muted uppercase tracking-wider font-medium">Active Projects</div>
          </div>
          <div class="w-px h-10 bg-bd-border-subtle hidden sm:block"></div>
          <div class="px-4 group">
            <div class="text-2xl font-bold text-bd-purple group-hover:scale-110 transition-transform">15+</div>
            <div class="text-xs text-bd-text-muted uppercase tracking-wider font-medium">Features</div>
          </div>
          <div class="w-px h-10 bg-bd-border-subtle hidden sm:block"></div>
          <div class="px-4 group">
            <div class="text-2xl font-bold text-bd-cyan group-hover:scale-110 transition-transform">100%</div>
            <div class="text-xs text-bd-text-muted uppercase tracking-wider font-medium">Open Source</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Quick Actions -->
    <div ref="actionsRef" :class="['eco-section', { 'is-visible': visibleSections.actions }]">
      <div class="flex flex-wrap gap-3 justify-center">
        <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" rel="noopener noreferrer" 
           class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-bd-purple/10 border border-bd-purple/30 hover:border-bd-purple hover:bg-bd-purple/20 transition-all duration-300 hover:-translate-y-0.5">
          <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="" class="w-5 h-5" />
          <span class="text-sm text-bd-text-primary font-medium">Get BetterDungeon</span>
          <ExternalLink class="w-3 h-3 text-bd-text-muted group-hover:text-bd-purple transition-colors" />
        </a>
        <router-link to="/" class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-bd-accent-primary/10 border border-bd-accent-primary/30 hover:border-bd-accent-primary hover:bg-bd-accent-primary/20 transition-all duration-300 hover:-translate-y-0.5">
          <img src="/betterrepository_logo.png" alt="" class="w-5 h-5" />
          <span class="text-sm text-bd-text-primary font-medium">Browse Resources</span>
          <ChevronRight class="w-4 h-4 text-bd-text-muted group-hover:text-bd-accent-primary group-hover:translate-x-0.5 transition-all" />
        </router-link>
        <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" rel="noopener noreferrer"
           class="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-bd-discord/10 border border-bd-discord/30 hover:border-bd-discord hover:bg-bd-discord/20 transition-all duration-300 hover:-translate-y-0.5">
          <MessageCircle class="w-5 h-5 text-bd-discord" />
          <span class="text-sm text-bd-text-primary font-medium">Join Discord</span>
          <ExternalLink class="w-3 h-3 text-bd-text-muted group-hover:text-bd-discord transition-colors" />
        </a>
      </div>
    </div>

    <!-- What is the Ecosystem -->
    <section ref="whatIsRef" :class="['eco-section', { 'is-visible': visibleSections.whatIs }]">
      <div class="card-elevated border-2 border-bd-accent-primary/20 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan"></div>
        <div class="flex items-start gap-4 pt-1">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Puzzle class="w-7 h-7 text-bd-accent-primary" />
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-semibold text-bd-text-primary mb-3">What is the "Better" Ecosystem?</h2>
            <p class="text-bd-text-secondary leading-relaxed">
              The "Better" ecosystem is a collection of <strong class="text-bd-text-primary">open-source tools and resources</strong> created to enhance AI Dungeon. 
              Each project focuses on a different aspect of the experience, from browser extensions that add powerful new features 
              to curated repositories of community-created content ready to use in your adventures.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section ref="projectsRef" :class="['eco-section', { 'is-visible': visibleSections.projects }]">
      <div class="space-y-6">
        <div class="section-header">
          <Layers class="w-5 h-5" />
          <span class="text-lg">Projects</span>
        </div>

        <!-- BetterRepository Card -->
        <article class="project-card group relative overflow-hidden border-2 border-bd-success/40 hover:border-bd-success/60 transition-all duration-300">
          <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-bd-success/10 to-transparent rounded-bl-full"></div>
          <div class="relative">
            <div class="flex items-start gap-5">
              <div class="relative flex-shrink-0">
                <div class="absolute inset-0 bg-bd-accent-primary/20 rounded-xl blur-lg"></div>
                <img src="/betterrepository_logo.png" alt="BetterRepository" class="relative w-16 h-16 object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 class="text-xl font-bold text-bd-text-primary">BetterRepository</h3>
                  <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-bd-success/20 text-bd-success border border-bd-success/30">
                    <span class="inline-flex items-center gap-1">
                      <span class="w-1.5 h-1.5 rounded-full bg-bd-success animate-pulse"></span>
                      You're here!
                    </span>
                  </span>
                </div>
                <p class="text-bd-text-secondary mb-5 leading-relaxed">
                  The ultimate AI Dungeon resource hub. Find <strong class="text-bd-text-primary">AI Instructions</strong>, 
                  <strong class="text-bd-text-primary">Plot Components</strong>, <strong class="text-bd-text-primary">Story Cards</strong>, 
                  and <strong class="text-bd-text-primary">Scripts</strong>, all curated, tested, and ready to copy-paste into your adventures.
                </p>
                
                <!-- Resource Types -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                  <div class="flex items-center gap-2 p-2.5 rounded-lg bg-bd-amber/10 border border-bd-amber/20 hover:border-bd-amber/40 transition-colors">
                    <FileText class="w-4 h-4 text-bd-amber flex-shrink-0" />
                    <span class="text-sm text-bd-text-primary font-medium">AI Instructions</span>
                  </div>
                  <div class="flex items-center gap-2 p-2.5 rounded-lg bg-bd-blue/10 border border-bd-blue/20 hover:border-bd-blue/40 transition-colors">
                    <BookOpen class="w-4 h-4 text-bd-blue flex-shrink-0" />
                    <span class="text-sm text-bd-text-primary font-medium">Plot Components</span>
                  </div>
                  <div class="flex items-center gap-2 p-2.5 rounded-lg bg-bd-purple/10 border border-bd-purple/20 hover:border-bd-purple/40 transition-colors">
                    <Layers class="w-4 h-4 text-bd-purple flex-shrink-0" />
                    <span class="text-sm text-bd-text-primary font-medium">Story Cards</span>
                  </div>
                  <div class="flex items-center gap-2 p-2.5 rounded-lg bg-bd-cyan/10 border border-bd-cyan/20 hover:border-bd-cyan/40 transition-colors">
                    <Code class="w-4 h-4 text-bd-cyan flex-shrink-0" />
                    <span class="text-sm text-bd-text-primary font-medium">Scripts</span>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <router-link to="/" class="btn btn-primary">
                    <Home class="w-4 h-4" />
                    Browse Resources
                  </router-link>
                  <a href="https://github.com/ComputerKWasTaken/BetterRepository" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <Github class="w-4 h-4" />
                    GitHub
                    <ExternalLink class="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- BetterDungeon Card -->
        <article class="project-card group relative overflow-hidden border-2 border-bd-purple/30 hover:border-bd-purple/50 transition-all duration-300">
          <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-bd-purple/10 to-transparent rounded-bl-full"></div>
          <div class="relative">
            <div class="flex items-start gap-5">
              <div class="relative flex-shrink-0">
                <div class="absolute inset-0 bg-bd-purple/20 rounded-xl blur-lg"></div>
                <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="BetterDungeon" class="relative w-16 h-16 object-contain" />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 class="text-xl font-bold text-bd-text-primary">BetterDungeon</h3>
                  <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-bd-purple/20 text-bd-purple border border-bd-purple/30">
                    Browser Extension
                  </span>
                </div>
                <p class="text-bd-text-secondary mb-5 leading-relaxed">
                  An all-in-one browser extension that enhances AI Dungeon with QOL additions and brand new features. 
                  Add new input modes, hotkeys, markdown support, and much more, all without leaving your browser.
                </p>
                
                <!-- Feature Grid - Inspired by BetterDungeon popup -->
                <div class="space-y-4 mb-5">
                  <!-- Input Modes Section -->
                  <div class="p-4 rounded-xl bg-bd-bg-tertiary/50 border border-bd-border">
                    <div class="flex items-center gap-2 mb-3">
                      <MessageSquare class="w-4 h-4 text-bd-purple" />
                      <h4 class="text-sm font-semibold text-bd-text-primary">Input Modes</h4>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                      <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-secondary hover:bg-bd-bg-elevated transition-colors">
                        <Terminal class="w-4 h-4 text-orange-500 flex-shrink-0" />
                        <div>
                          <span class="text-sm text-bd-text-primary font-medium">Command Mode</span>
                          <p class="text-xs text-bd-text-muted">Direct AI instructions</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2 p-2 rounded-lg bg-bd-bg-secondary hover:bg-bd-bg-elevated transition-colors">
                        <Dice5 class="w-4 h-4 text-bd-purple flex-shrink-0" />
                        <div>
                          <span class="text-sm text-bd-text-primary font-medium">Try Mode</span>
                          <p class="text-xs text-bd-text-muted">RNG-based outcomes</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Tools & Features Grid -->
                  <div class="grid md:grid-cols-3 gap-3">
                    <div class="feature-tile">
                      <Keyboard class="w-5 h-5 text-bd-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Hotkeys</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Full keyboard control for all actions</p>
                      </div>
                    </div>
                    <div class="feature-tile">
                      <Type class="w-5 h-5 text-bd-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Markdown</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Bold, italic, underline & more</p>
                      </div>
                    </div>
                    <div class="feature-tile">
                      <Palette class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Mode Colors</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Visual input mode feedback</p>
                      </div>
                    </div>
                    <div class="feature-tile">
                      <StickyNote class="w-5 h-5 text-bd-success flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Adventure Notes</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Per-adventure note taking</p>
                      </div>
                    </div>
                    <div class="feature-tile">
                      <User class="w-5 h-5 text-bd-error flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Character Presets</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Save & auto-fill characters</p>
                      </div>
                    </div>
                    <div class="feature-tile">
                      <BarChart3 class="w-5 h-5 text-bd-accent-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-medium">Story Analytics</span>
                        <p class="text-xs text-bd-text-muted mt-0.5">Analyze your story cards</p>
                      </div>
                    </div>
                  </div>

                  <!-- BetterScripts Highlight -->
                  <div class="p-4 rounded-xl bg-gradient-to-r from-bd-cyan/10 to-bd-blue/10 border border-bd-cyan/20 hover:border-bd-cyan/40 transition-colors">
                    <div class="flex items-start gap-3">
                      <Code class="w-5 h-5 text-bd-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <span class="text-sm text-bd-text-primary font-semibold">BetterScripts</span>
                        <p class="text-xs text-bd-text-secondary mt-1">
                          Enables AI Dungeon scripts to create <strong class="text-bd-text-primary">dynamic UI widgets</strong> like 
                          HP bars, stats, panels, and custom displays that update in real-time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" rel="noopener noreferrer" class="btn btn-primary bg-bd-purple hover:bg-bd-purple/80 border-bd-purple">
                    <Download class="w-4 h-4" />
                    Get BetterDungeon
                    <ExternalLink class="w-3 h-3" />
                  </a>
                  <a href="https://github.com/ComputerKWasTaken/BetterDungeon" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                    <Github class="w-4 h-4" />
                    View Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        </article>

        <!-- BetterVoyage Card (Coming Soon) - Compact -->
        <article class="card group relative overflow-hidden border border-dashed border-bd-border/50 hover:border-bd-cyan/30 opacity-60 hover:opacity-80 transition-all duration-300">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-lg bg-bd-cyan/10 flex items-center justify-center flex-shrink-0">
              <Ship class="w-5 h-5 text-bd-cyan" />
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="text-sm font-semibold text-bd-text-primary">BetterVoyage</h3>
                <span class="px-2 py-0.5 text-xs rounded-full bg-bd-cyan/10 text-bd-cyan">Coming Soon</span>
              </div>
              <p class="text-xs text-bd-text-muted mt-0.5">Development begins after Voyage's full public release.</p>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Better Together Section -->
    <section ref="togetherRef" :class="['eco-section', { 'is-visible': visibleSections.together }]">
      <div class="card-elevated border-2 border-bd-purple/30 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-bd-purple/15 to-transparent rounded-bl-full"></div>
        <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-bd-accent-primary/10 to-transparent rounded-tr-full"></div>
        <div class="relative">
          <div class="flex items-center gap-4 mb-5">
            <div class="flex items-center gap-2 p-3 rounded-xl bg-bd-bg-tertiary/80 border border-bd-border">
              <img src="/betterrepository_logo.png" alt="" class="w-8 h-8" />
              <Heart class="w-5 h-5 text-bd-error animate-pulse" />
              <img src="https://raw.githubusercontent.com/ComputerKWasTaken/BetterDungeon/main/icons/icon128.png" alt="" class="w-8 h-8" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-bd-text-primary">Better Together</h2>
              <p class="text-sm text-bd-text-muted">Designed to complement each other</p>
            </div>
          </div>
          
          <p class="text-bd-text-secondary mb-5 leading-relaxed">
            BetterDungeon and BetterRepository work seamlessly together. Use them in tandem for the 
            <strong class="text-bd-text-primary">ultimate AI Dungeon experience</strong>.
          </p>
          
          <!-- Workflow Steps -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="workflow-step group hover:border-bd-accent-primary/30">
              <div class="w-8 h-8 rounded-full bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0 text-bd-accent-primary font-bold text-sm group-hover:scale-110 transition-transform">1</div>
              <div>
                <span class="text-sm text-bd-text-primary font-semibold flex items-center gap-2">
                  <Search class="w-4 h-4 text-bd-accent-primary" />
                  Find Resources
                </span>
                <p class="text-xs text-bd-text-secondary mt-1">Browse AI Instructions, Plot Components, Story Cards, and Scripts on BetterRepository</p>
              </div>
            </div>
            <div class="workflow-step group hover:border-bd-purple/30">
              <div class="w-8 h-8 rounded-full bg-bd-purple/20 flex items-center justify-center flex-shrink-0 text-bd-purple font-bold text-sm group-hover:scale-110 transition-transform">2</div>
              <div>
                <span class="text-sm text-bd-text-primary font-semibold flex items-center gap-2">
                  <Save class="w-4 h-4 text-bd-purple" />
                  Save as Presets
                </span>
                <p class="text-xs text-bd-text-secondary mt-1">Use BetterDungeon's Presets to save and organize your favorite resources</p>
              </div>
            </div>
            <div class="workflow-step group hover:border-bd-cyan/30">
              <div class="w-8 h-8 rounded-full bg-bd-cyan/20 flex items-center justify-center flex-shrink-0 text-bd-cyan font-bold text-sm group-hover:scale-110 transition-transform">3</div>
              <div>
                <span class="text-sm text-bd-text-primary font-semibold flex items-center gap-2">
                  <Type class="w-4 h-4 text-bd-cyan" />
                  Enhanced Formatting
                </span>
                <p class="text-xs text-bd-text-secondary mt-1">BetterDungeon renders markdown syntax from BetterRepository resources beautifully</p>
              </div>
            </div>
            <div class="workflow-step group hover:border-bd-success/30">
              <div class="w-8 h-8 rounded-full bg-bd-success/20 flex items-center justify-center flex-shrink-0 text-bd-success font-bold text-sm group-hover:scale-110 transition-transform">4</div>
              <div>
                <span class="text-sm text-bd-text-primary font-semibold flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-success" />
                  One-Click Apply
                </span>
                <p class="text-xs text-bd-text-secondary mt-1">Apply saved presets to any adventure with a single click</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What's Next Section -->
    <section ref="nextRef" :class="['eco-section', { 'is-visible': visibleSections.next }]">
      <div class="card relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary to-bd-purple"></div>
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Rocket class="w-6 h-6 text-bd-accent-primary" />
          </div>
          <div class="flex-1">
            <h2 class="text-xl font-bold text-bd-text-primary mb-2">What's Next?</h2>
            <p class="text-bd-text-secondary mb-5 leading-relaxed">
              The "Better" ecosystem is always growing. Have an idea for a new tool or feature? 
              <strong class="text-bd-text-primary">I'd love to hear it!</strong>
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <a href="https://github.com/ComputerKWasTaken/BetterDungeon/issues/new?template=feature_request.md" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <Lightbulb class="w-4 h-4" />
                Suggest a Feature
                <ExternalLink class="w-3 h-3" />
              </a>
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                <MessageCircle class="w-4 h-4" />
                Join Discord
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Credits Footer -->
    <section ref="creditsRef" :class="['eco-section', { 'is-visible': visibleSections.credits }]">
      <div class="card text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-bd-error/5 to-transparent pointer-events-none"></div>
        <div class="relative">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bd-error/10 mb-4">
            <Heart class="w-8 h-8 text-bd-error animate-pulse" />
          </div>
          <h2 class="text-xl font-bold text-bd-text-primary mb-2">Made for the Community</h2>
          <p class="text-bd-text-secondary max-w-lg mx-auto leading-relaxed">
            All "Better" projects are <strong class="text-bd-text-primary">open source</strong> and built with love for the AI Dungeon community. 
            Contributions, feedback, and ideas are always welcome.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 mt-5">
            <router-link to="/contribute" class="btn btn-primary text-sm">
              <GitPullRequest class="w-4 h-4" />
              Contribute to BetterRepository
            </router-link>
          </div>
          <div class="flex justify-center gap-4 mt-4">
            <a href="https://github.com/ComputerKWasTaken" target="_blank" rel="noopener noreferrer" class="text-bd-text-muted hover:text-bd-text-primary transition-colors hover:scale-110 transform">
              <Github class="w-5 h-5" />
            </a>
            <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" rel="noopener noreferrer" class="text-bd-text-muted hover:text-bd-discord transition-colors hover:scale-110 transform">
              <MessageCircle class="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { 
  Puzzle, Layers, Github, ExternalLink, Sparkles, Plus, ChevronRight,
  Home, Keyboard, Type, Palette, StickyNote, User, MessageSquare, Terminal, Dice5,
  Rocket, Lightbulb, MessageCircle, Heart, Search, Save, Zap, Ship,
  FileText, BookOpen, Code, Download, BarChart3, GitPullRequest
} from 'lucide-vue-next'

// --- Section refs for IntersectionObserver staggered reveal ---
const actionsRef = ref(null)
const whatIsRef = ref(null)
const projectsRef = ref(null)
const togetherRef = ref(null)
const nextRef = ref(null)
const creditsRef = ref(null)

const visibleSections = reactive({
  actions: false,
  whatIs: false,
  projects: false,
  together: false,
  next: false,
  credits: false,
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (el === actionsRef.value) visibleSections.actions = true
          else if (el === whatIsRef.value) visibleSections.whatIs = true
          else if (el === projectsRef.value) visibleSections.projects = true
          else if (el === togetherRef.value) visibleSections.together = true
          else if (el === nextRef.value) visibleSections.next = true
          else if (el === creditsRef.value) visibleSections.credits = true
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.1 }
  )

  const refs = [actionsRef, whatIsRef, projectsRef, togetherRef, nextRef, creditsRef]
  refs.forEach((r) => { if (r.value) observer.observe(r.value) })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* === Hero background === */
.eco-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  pointer-events: none;
}

.hero-orb--orange {
  width: 260px;
  height: 260px;
  background: var(--bd-accent-primary);
  top: -50px;
  right: -30px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 220px;
  height: 220px;
  background: var(--bd-purple);
  bottom: -50px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

.hero-orb--cyan {
  width: 160px;
  height: 160px;
  background: var(--bd-cyan);
  top: 30%;
  left: -20px;
  animation: float 12s ease-in-out infinite 2s;
}

/* === Section reveal animation === */
.eco-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.eco-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Project cards with lift effect === */
.project-card {
  background: var(--bd-bg-secondary);
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(255, 149, 0, 0.08);
}

/* === Feature tiles === */
.feature-tile {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(30, 30, 36, 0.5);
  border: 1px solid var(--bd-border-default);
  transition: all 0.2s ease;
}

.feature-tile:hover {
  border-color: var(--bd-border-strong);
  background: rgba(37, 37, 48, 0.6);
  transform: translateY(-1px);
}

/* === Workflow steps === */
.workflow-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.75rem;
  background: rgba(30, 30, 36, 0.5);
  border: 1px solid var(--bd-border-default);
  transition: all 0.25s ease;
}

.workflow-step:hover {
  transform: translateY(-1px);
}
</style>
