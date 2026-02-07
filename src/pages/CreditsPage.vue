<template>
  <div class="space-y-8">
    <!-- Page Header — animated hero -->
    <header class="credits-hero relative overflow-hidden rounded-2xl text-center py-12 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--orange" aria-hidden="true" />
      <div class="hero-orb hero-orb--purple" aria-hidden="true" />

      <div class="relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-amber/20 mb-4 animate-float">
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
    <section ref="introRef" :class="['credits-section', { 'is-visible': visibleSections.intro }]">
      <div class="card-elevated border-2 border-bd-accent-primary/30 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan" />
        <p class="text-bd-text-secondary text-center leading-relaxed pt-1">
          The community members listed below have contributed invaluable guides, resources, and knowledge 
          that directly shaped the comprehensive guides you see here. Their pioneering work in the 
          AI Dungeon community made this project possible.
        </p>
      </div>
    </section>

    <!-- Major Contributors -->
    <section ref="majorRef" :class="['credits-section', { 'is-visible': visibleSections.major }]">
      <div class="card relative overflow-hidden">
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
    <section ref="categoryRef" :class="['credits-section', { 'is-visible': visibleSections.category }]">
      <div class="space-y-4">
        <div class="section-header">
          <Users class="w-4 h-4" />
          <span>Contributors by Category</span>
        </div>

        <!-- AI Instructions Contributors -->
        <div class="card group hover:border-bd-amber/30 transition-colors">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
            <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center group-hover:scale-110 transition-transform">
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
    <section ref="thanksRef" :class="['credits-section', { 'is-visible': visibleSections.thanks }]">
      <div class="card text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-bd-error/5 to-transparent pointer-events-none" />
        <div class="relative">
          <Heart class="w-10 h-10 text-bd-error mx-auto mb-3 animate-pulse" />
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
            <a 
              href="https://discord.com/invite/HB2YBZYjyf" 
              target="_blank"
              class="btn btn-secondary"
            >
              <MessageCircle class="w-4 h-4" />
              Join the Community
              <ExternalLink class="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Made By -->
    <footer class="text-center py-5 border-t border-bd-border-subtle">
      <p class="text-xs text-bd-text-muted flex items-center justify-center gap-1.5">
        Made with <Heart class="w-3 h-3 text-bd-error animate-pulse" /> by 
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

// --- Section refs for IntersectionObserver staggered reveal ---
const introRef = ref(null)
const majorRef = ref(null)
const categoryRef = ref(null)
const thanksRef = ref(null)

const visibleSections = reactive({
  intro: false,
  major: false,
  category: false,
  thanks: false,
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (el === introRef.value) visibleSections.intro = true
          else if (el === majorRef.value) visibleSections.major = true
          else if (el === categoryRef.value) visibleSections.category = true
          else if (el === thanksRef.value) visibleSections.thanks = true
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15 }
  )

  const refs = [introRef, majorRef, categoryRef, thanksRef]
  refs.forEach((r) => { if (r.value) observer.observe(r.value) })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

</script>

<style scoped>
/* === Hero background === */
.credits-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}

.hero-orb--orange {
  width: 240px;
  height: 240px;
  background: var(--bd-accent-primary);
  top: -50px;
  right: -30px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 180px;
  height: 180px;
  background: #a855f7;
  bottom: -40px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

/* === Section reveal animation === */
.credits-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.credits-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Contributor chips === */
.contributor-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.contributor-chip:hover {
  transform: translateY(-1px);
}

.contributor-chip--major {
  padding: 0.375rem 0.875rem;
  font-size: 0.875rem;
  background: rgba(255, 149, 0, 0.1);
  color: var(--bd-accent-light);
  border: 1px solid rgba(255, 149, 0, 0.25);
}

.contributor-chip--major:hover {
  background: rgba(255, 149, 0, 0.2);
  border-color: rgba(255, 149, 0, 0.4);
}

.contributor-chip--amber {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.2);
}

.contributor-chip--amber:hover {
  background: rgba(251, 191, 36, 0.2);
  border-color: rgba(251, 191, 36, 0.4);
}

.contributor-chip--blue {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.contributor-chip--blue:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.4);
}

.contributor-chip--purple {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.2);
}

.contributor-chip--purple:hover {
  background: rgba(168, 85, 247, 0.2);
  border-color: rgba(168, 85, 247, 0.4);
}

.contributor-chip--cyan {
  padding: 0.3rem 0.625rem;
  font-size: 0.75rem;
  background: rgba(6, 182, 212, 0.1);
  color: #06b6d4;
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.contributor-chip--cyan:hover {
  background: rgba(6, 182, 212, 0.2);
  border-color: rgba(6, 182, 212, 0.4);
}
</style>
