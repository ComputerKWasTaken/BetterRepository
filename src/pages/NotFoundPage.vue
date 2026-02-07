<template>
  <div class="flex flex-col items-center justify-center text-center py-20 sm:py-32">
    <!-- Animated 404 badge -->
    <div class="relative mb-8">
      <div class="absolute -inset-6 bg-bd-accent-primary/10 rounded-full blur-2xl animate-pulse" />
      <div class="relative w-28 h-28 rounded-2xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 border border-bd-border-subtle flex items-center justify-center animate-float">
        <span class="text-5xl font-bold text-gradient tracking-tight">404</span>
      </div>
    </div>

    <!-- Message -->
    <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-3 tracking-tight">
      Page Not <span class="text-gradient">Found</span>
    </h1>
    <p class="text-bd-text-secondary max-w-md mx-auto leading-relaxed mb-8">
      Looks like you're wandered off into the unknown. 
      Let's get you back to familiar territory.
    </p>

    <!-- Action buttons -->
    <div class="flex flex-col sm:flex-row items-center gap-3">
      <router-link 
        to="/" 
        class="btn btn-primary inline-flex items-center gap-2 px-5 py-2.5"
      >
        <Home class="w-4 h-4" />
        Back to Home
      </router-link>
      <button 
        @click="router.back()"
        class="btn inline-flex items-center gap-2 px-5 py-2.5 text-bd-text-secondary hover:text-bd-text-primary"
      >
        <ArrowLeft class="w-4 h-4" />
        Go Back
      </button>
    </div>

    <!-- Quick links -->
    <div class="mt-12 pt-8 border-t border-bd-border-subtle w-full max-w-md">
      <p class="text-xs text-bd-text-muted uppercase tracking-wider font-medium mb-4">Popular Resources</p>
      <div class="flex flex-wrap justify-center gap-2">
        <router-link 
          v-for="link in quickLinks" 
          :key="link.path"
          :to="link.path"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-bd-text-secondary hover:text-bd-accent-light hover:bg-bd-bg-tertiary transition-colors"
        >
          <component :is="link.icon" class="w-3.5 h-3.5" />
          {{ link.label }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Home, ArrowLeft, ScrollText, Bookmark, Drama, Code } from 'lucide-vue-next'

const router = useRouter()

const quickLinks = [
  { path: '/ai-instructions', label: 'AI Instructions', icon: ScrollText },
  { path: '/plot-components', label: 'Plot Components', icon: Bookmark },
  { path: '/story-cards', label: 'Story Cards', icon: Drama },
  { path: '/scripts', label: 'Scripts', icon: Code },
]
</script>
