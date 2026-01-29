<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header class="text-center py-6">
      <div class="flex items-center justify-center gap-3 mb-4">
        <Award class="w-10 h-10 text-bd-accent-primary" />
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-2">
        Credits & Acknowledgments
      </h1>
      <p class="text-bd-text-secondary max-w-xl mx-auto">
        BetterRepository is built on the shoulders of giants. Thank you to everyone who contributed.
      </p>
    </header>

    <!-- Introduction -->
    <section class="card-elevated border-2 border-bd-accent-primary/30">
      <p class="text-bd-text-secondary text-center leading-relaxed">
        The community members listed below have contributed invaluable guides, resources, and knowledge 
        that directly shaped the comprehensive guides you see here. Their pioneering work in the 
        AI Dungeon community made this project possible.
      </p>
    </section>

    <!-- Major Contributors -->
    <section class="card">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 flex items-center justify-center">
          <Star class="w-5 h-5 text-bd-accent-primary" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-bd-text-primary">Major Contributors</h2>
          <p class="text-xs text-bd-text-muted">Contributors whose work significantly shaped BetterRepository</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <span v-for="name in majorContributors" :key="name" 
              class="px-3 py-1.5 rounded-full text-sm font-semibold bg-bd-accent-primary/15 text-bd-accent-light border border-bd-accent-primary/30">
          {{ name }}
        </span>
      </div>
    </section>

    <!-- Contributors by Category -->
    <section class="space-y-4">
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Users class="w-5 h-5 text-bd-text-muted" />
        Contributors by Category
      </h2>

      <!-- AI Instructions Contributors -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center">
            <ScrollText class="w-4 h-4 text-bd-amber" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">AI Instructions</h3>
            <p class="text-xs text-bd-text-muted">Contributors who created AI Instructions, repositories, guides, or other resources</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="name in aiInstructionsContributors" :key="name" 
                class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
            {{ name }}
          </span>
        </div>
      </div>

      <!-- Plot Components Contributors -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center">
            <Bookmark class="w-4 h-4 text-bd-blue" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Plot Components</h3>
            <p class="text-xs text-bd-text-muted">Contributors who created PEs, SSs, and ANs, or created guides for them</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="name in plotComponentsContributors" :key="name" 
                class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-blue/10 text-bd-blue border border-bd-blue/20">
            {{ name }}
          </span>
        </div>
      </div>

      <!-- Story Cards Contributors -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center">
            <Drama class="w-4 h-4 text-bd-purple" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Story Cards</h3>
            <p class="text-xs text-bd-text-muted">Contributors who created the resources and guides to create, write, and use Story Cards</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="name in storyCardsContributors" :key="name" 
                class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
            {{ name }}
          </span>
        </div>
      </div>

      <!-- Scripting Contributors -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center">
            <Code class="w-4 h-4 text-bd-cyan" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Scripting</h3>
            <p class="text-xs text-bd-text-muted">Contributors who wrote scripts and other tools, or created guides and resources for scripting</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="name in scriptingContributors" :key="name" 
                class="px-2.5 py-1 rounded-full text-xs font-medium bg-bd-cyan/10 text-bd-cyan border border-bd-cyan/20">
            {{ name }}
          </span>
        </div>
      </div>
    </section>

    <!-- Community Thank You -->
    <section class="card text-center">
      <Heart class="w-10 h-10 text-bd-error mx-auto mb-3" />
      <h2 class="text-lg font-semibold text-bd-text-primary mb-2">And the Entire AI Dungeon Community</h2>
      <p class="text-bd-text-secondary max-w-md mx-auto mb-4">
        Thank you to everyone who has shared their knowledge, answered questions, and helped make 
        AI Dungeon a better experience for all.
      </p>
      <a 
        href="https://discord.com/invite/HB2YBZYjyf" 
        target="_blank"
        class="btn btn-secondary"
      >
        <MessageCircle class="w-4 h-4" />
        Join the Community
        <ExternalLink class="w-3 h-3" />
      </a>
    </section>

    <!-- Made By -->
    <footer class="text-center py-4 border-t border-bd-border-subtle">
      <p class="text-xs text-bd-text-muted flex items-center justify-center gap-1">
        Made with <Heart class="w-3 h-3 text-bd-error" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { 
  Award, Star, Users, ScrollText, Bookmark, Drama, Code,
  Heart, MessageCircle, ExternalLink
} from 'lucide-vue-next'

// Major contributors whose work significantly shaped BetterRepository
const majorContributors = [
  'OffMetaGamer', 'Wilmar', 'Le Onyx', 'LewdLeah', 'Dragranis', 'Monsieur Boo'
]

// Contributors organized by category
const aiInstructionsContributors = [
  'OffMetaGamer', 'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'Dragranis', 
  'BinKompliziert', 'Wilmar', 'Le Onyx', 'Little Hat', 'SeinSchetten', 
  'Zoocata', 'Monsieur Boo', 'CamSift'
]

const plotComponentsContributors = [
  'Wilmar', 'Le Onyx', 'Dragranis', 'Celyne', 'Monsieur Boo'
]

const storyCardsContributors = [
  'wanderingstar1', 'GremmieGremlin', 'Lavere', 'Le Onyx', 'Shiny'
]

const scriptingContributors = [
  'Latitude', 'LewdLeah', 'Oli', 'Magic', 'BinKompliziert', 'MrJack'
]
</script>
