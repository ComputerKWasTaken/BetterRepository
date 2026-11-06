<template>
  <div class="space-y-8">
    <!-- Page Header with animated hero -->
    <header class="credits-hero relative overflow-hidden rounded-2xl text-center py-12 px-6">
      <div class="relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-bd-accent-primary/15 mb-4">
          <Award class="w-8 h-8 text-bd-accent-primary" />
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-2 tracking-tight">
          Credits & <span class="text-gradient">Acknowledgments</span>
        </h1>
        <p class="text-bd-text-secondary max-w-xl mx-auto leading-relaxed">
          BetterRepository is built on the shoulders of giants. Thank you to everyone who contributed.
        </p>
      </div>
    </header>

    <!-- Introduction -->
    <section>
      <div class="card-elevated border-2 border-bd-accent-primary/30 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-0.5 bg-bd-accent-primary/70" />
        <p class="text-bd-text-secondary text-center leading-relaxed pt-1">
          The community members listed below have contributed invaluable guides, resources, and knowledge 
          that directly shaped the comprehensive guides you see here. Their pioneering work in the 
          AI Dungeon community made this project possible.
        </p>
      </div>
    </section>

    <!-- Major Contributors -->
    <section>
      <div class="card relative overflow-hidden">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-xl bg-bd-accent-primary/15 flex items-center justify-center">
            <Star class="w-5 h-5 text-bd-accent-primary" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-bd-text-primary">Major Contributors</h2>
            <p class="text-xs text-bd-text-muted">Contributors whose work significantly shaped BetterRepository</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="(name, idx) in majorContributors" 
            :key="name" 
            class="contributor-chip contributor-chip--major"
            :style="{ animationDelay: `${idx * 60}ms` }"
          >
            {{ name }}
          </span>
        </div>
      </div>
    </section>

    <!-- Contributors by Category -->
    <section>
      <div class="space-y-4">
        <div class="section-header">
          <Users class="w-4 h-4" />
          <span>Contributors by Category</span>
        </div>

        <!-- AI Instructions Contributors -->
        <div class="card group hover:border-bd-amber/30 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center transition-transform">
              <ScrollText class="w-4 h-4 text-bd-amber" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">AI Instructions</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created AI Instructions, repositories, guides, or other resources</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(name, idx) in aiInstructionsContributors" 
              :key="name" 
              class="contributor-chip contributor-chip--amber"
              :style="{ animationDelay: `${idx * 40}ms` }"
            >
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Plot Components Contributors -->
        <div class="card group hover:border-bd-blue/30 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center transition-transform">
              <Bookmark class="w-4 h-4 text-bd-blue" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Plot Components</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created PEs, SSs, and ANs, or created guides for them</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(name, idx) in plotComponentsContributors" 
              :key="name" 
              class="contributor-chip contributor-chip--blue"
              :style="{ animationDelay: `${idx * 40}ms` }"
            >
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Story Cards Contributors -->
        <div class="card group hover:border-bd-purple/30 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center transition-transform">
              <Drama class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Story Cards</h3>
              <p class="text-xs text-bd-text-muted">Contributors who created the resources and guides to create, write, and use Story Cards</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(name, idx) in storyCardsContributors" 
              :key="name" 
              class="contributor-chip contributor-chip--purple"
              :style="{ animationDelay: `${idx * 40}ms` }"
            >
              {{ name }}
            </span>
          </div>
        </div>

        <!-- Scripting Contributors -->
        <div class="card group hover:border-bd-cyan/30 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center transition-transform">
              <Code class="w-4 h-4 text-bd-cyan" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Scripting</h3>
              <p class="text-xs text-bd-text-muted">Contributors who wrote scripts and other tools, or created guides and resources for scripting</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(name, idx) in scriptingContributors" 
              :key="name" 
              class="contributor-chip contributor-chip--cyan"
              :style="{ animationDelay: `${idx * 40}ms` }"
            >
              {{ name }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Thank You -->
    <section>
      <div class="card text-center relative overflow-hidden">
        <div class="relative">
          <Heart class="w-10 h-10 text-bd-error mx-auto mb-3" />
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">And the Entire AI Dungeon Community</h2>
          <p class="text-bd-text-secondary max-w-md mx-auto mb-4 leading-relaxed">
            Thank you to everyone who has shared their knowledge, answered questions, and helped make 
            AI Dungeon a better experience for all.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <router-link to="/contribute" class="btn btn-primary">
              <GitPullRequest class="w-4 h-4" />
              Become a Contributor
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Made By -->
    <footer class="text-center py-5 border-t border-bd-border-subtle">
      <p class="text-xs text-bd-text-muted flex items-center justify-center gap-1.5">
        Made with <Heart class="w-3 h-3 text-bd-error" /> by 
        <span class="text-bd-text-secondary font-medium">computerK</span>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { 
  Award, Star, Users, ScrollText, Bookmark, Drama, Code,
  Heart, MessageCircle, ExternalLink, GitPullRequest
} from 'lucide-vue-next'
import {
  MAJOR_CONTRIBUTORS as majorContributors,
  AI_INSTRUCTIONS_CONTRIBUTORS as aiInstructionsContributors,
  PLOT_COMPONENTS_CONTRIBUTORS as plotComponentsContributors,
  STORY_CARDS_CONTRIBUTORS as storyCardsContributors,
  SCRIPTING_CONTRIBUTORS as scriptingContributors
} from '@/data/contributors'






</script>

<style scoped>
/* === Hero background === */
.credits-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}






/* === Contributor chips === */
.contributor-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 600;
  transition: background var(--bd-transition-fast), border-color var(--bd-transition-fast), color var(--bd-transition-fast);
}

.contributor-chip:hover {
  background: var(--bd-tag-hover-bg);
  border-color: var(--bd-border-default);
}

.contributor-chip--major {
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  background: var(--bd-accent-muted);
  color: var(--bd-accent-light);
  border: 1px solid var(--bd-border-accent);
}

.contributor-chip--major:hover {
  background: var(--bd-accent-strong);
  border-color: var(--bd-border-accent);
}

.contributor-chip--amber {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: var(--bd-tag-bg);
  color: var(--bd-amber);
  border: 1px solid var(--bd-border-default);
}

.contributor-chip--amber:hover {
  background: var(--bd-tag-hover-bg);
  border-color: var(--bd-border-default);
}

.contributor-chip--blue {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: var(--bd-tag-bg);
  color: var(--bd-blue);
  border: 1px solid var(--bd-border-default);
}

.contributor-chip--blue:hover {
  background: var(--bd-tag-hover-bg);
  border-color: var(--bd-border-default);
}

.contributor-chip--purple {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: var(--bd-tag-bg);
  color: var(--bd-purple);
  border: 1px solid var(--bd-border-default);
}

.contributor-chip--purple:hover {
  background: var(--bd-tag-hover-bg);
  border-color: var(--bd-border-default);
}

.contributor-chip--cyan {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: var(--bd-tag-bg);
  color: var(--bd-cyan);
  border: 1px solid var(--bd-border-default);
}

.contributor-chip--cyan:hover {
  background: var(--bd-tag-hover-bg);
  border-color: var(--bd-border-default);
}
</style>
