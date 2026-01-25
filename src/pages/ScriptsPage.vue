<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-cyan/20 flex items-center justify-center">
          <span class="text-lg">⚙️</span>
        </div>
        Scripts
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Custom scripts and advanced automation for AI Dungeon.
      </p>
    </header>

    <!-- Warning Notice -->
    <section class="card border-bd-warning/30">
      <div class="flex items-start gap-3">
        <span class="text-bd-warning flex-shrink-0 mt-0.5">⚠️</span>
        <div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Advanced Feature</h3>
          <p class="text-sm text-bd-text-secondary">
            Scripts require familiarity with AI Dungeon's scripting system. 
            Make sure to backup your scenarios before applying scripts.
          </p>
        </div>
      </div>
    </section>

    <!-- Coming Soon Notice -->
    <section class="card-elevated border-bd-info/30">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-info/20 flex items-center justify-center flex-shrink-0">
          <span class="text-xl">🚧</span>
        </div>
        <div>
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">Scripts Collection Coming Soon!</h2>
          <p class="text-bd-text-secondary mb-4">
            We're curating a collection of useful scripts for AI Dungeon. 
            Planned categories include:
          </p>
          <ul class="space-y-2 text-sm text-bd-text-secondary">
            <li class="flex items-center gap-2">
              <span>🎲</span>
              <span><strong>Dice & RNG Systems</strong> - Roll dice, random events, probability systems</span>
            </li>
            <li class="flex items-center gap-2">
              <span>🕐</span>
              <span><strong>Time & Calendar</strong> - Day/night cycles, scheduling, time tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <span>❤️</span>
              <span><strong>Relationship Trackers</strong> - NPC affinity and relationship systems</span>
            </li>
            <li class="flex items-center gap-2">
              <span>🎒</span>
              <span><strong>Inventory Systems</strong> - Item management and crafting</span>
            </li>
            <li class="flex items-center gap-2">
              <span>⚔️</span>
              <span><strong>Combat Enhancements</strong> - HP tracking, status effects, combat flow</span>
            </li>
            <li class="flex items-center gap-2">
              <span>🪄</span>
              <span><strong>Magic Systems</strong> - Mana, spell slots, cooldowns</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Script Categories Preview -->
    <section>
      <div class="section-header mb-4">
        <span>📂</span>
        <span>Script Categories</span>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="category in scriptCategories" :key="category.name" class="card group">
          <div class="flex items-center gap-3 mb-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="category.bgClass"
            >
              <span class="text-lg">{{ category.iconChar }}</span>
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">{{ category.name }}</h3>
              <span class="text-xs text-bd-text-muted">{{ category.count }} scripts</span>
            </div>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ category.description }}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="badge badge-new">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Script Structure Guide -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <span>📖</span>
        Script Structure Guide
      </h2>
      
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <h3 class="font-medium text-bd-text-primary mb-2">Input Modifier</h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            Runs before your input is processed. Use for command parsing and input transformation.
          </p>
          <pre class="code-block text-xs">const modifier = (text) => {
  // Process user input here
  return { text }
}</pre>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <h3 class="font-medium text-bd-text-primary mb-2">Context Modifier</h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            Runs before the AI generates. Use for injecting dynamic content into context.
          </p>
          <pre class="code-block text-xs">const modifier = (text) => {
  // Modify context here
  return { text }
}</pre>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <h3 class="font-medium text-bd-text-primary mb-2">Output Modifier</h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            Runs after AI generates. Use for formatting and post-processing.
          </p>
          <pre class="code-block text-xs">const modifier = (text) => {
  // Process AI output here
  return { text }
}</pre>
        </div>
      </div>
    </section>

    <!-- Contribute CTA -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <span class="text-xl">🤝</span>
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Scripts!</h3>
          <p class="text-bd-text-secondary mb-4">
            Created useful scripts for AI Dungeon? Share them with the community! 
            We review all submissions for quality and safety.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <span>🤝</span>
            Learn How to Contribute
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Icons removed temporarily

const scriptCategories = [
  {
    name: 'Game Systems',
    iconChar: '🎲',
    description: 'Dice rolling, random events, and probability-based mechanics.',
    count: 0,
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  {
    name: 'Tracking & State',
    iconChar: '🕐',
    description: 'Time, inventory, relationships, and persistent state management.',
    count: 0,
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  {
    name: 'Combat & Action',
    iconChar: '⚔️',
    description: 'Combat systems, HP tracking, and action resolution.',
    count: 0,
    bgClass: 'bg-bd-error/20',
    iconClass: 'text-bd-error'
  },
  {
    name: 'Magic & Abilities',
    iconChar: '🪄',
    description: 'Spell systems, mana management, and special abilities.',
    count: 0,
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
  {
    name: 'Formatting',
    iconChar: '⚙️',
    description: 'Output formatting, text processing, and display enhancements.',
    count: 0,
    bgClass: 'bg-bd-green/20',
    iconClass: 'text-bd-green'
  },
  {
    name: 'Utilities',
    iconChar: '📂',
    description: 'Helper functions, debugging tools, and general utilities.',
    count: 0,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber'
  }
]
</script>
