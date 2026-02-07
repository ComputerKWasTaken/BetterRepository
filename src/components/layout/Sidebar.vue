<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-bd-bg-secondary border-r border-bd-border-subtle flex flex-col" style="z-index: var(--bd-z-fixed)">
    <!-- Logo Header -->
    <div class="p-6 border-b border-bd-border-subtle">
      <router-link to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-lg overflow-hidden shadow-glow">
          <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-full h-full object-cover" />
        </div>
        <div>
          <h1 class="text-lg font-semibold text-bd-text-primary group-hover:text-gradient transition-all">
            BetterRepository
          </h1>
          <div class="flex items-center gap-2">
            <span class="text-xs text-bd-text-muted">v1.0.0</span>
          </div>
        </div>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <!-- Main Navigation -->
      <div class="mb-6">
        <div class="section-header">
          <LayoutGrid class="w-3 h-3" />
          <span>Resources</span>
        </div>
        
        <router-link 
          v-for="item in mainNavItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'active': isActive(item.path) }"
        >
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
          <span v-if="item.count" class="ml-auto text-xs text-bd-text-muted bg-bd-tag-bg px-2 py-0.5 rounded-full">
            {{ item.count }}
          </span>
        </router-link>
      </div>

      <!-- Links -->
      <div>
        <div class="section-header">
          <Link2 class="w-3 h-3" />
          <span>Links</span>
        </div>
        
        <router-link 
          to="/contribute"
          class="nav-link contribute-link"
          :class="{ 'active': isActive('/contribute') }"
        >
          <GitPullRequest class="w-4 h-4" />
          <span>Contribute</span>
          <span class="ml-auto text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-bd-accent-primary/15 text-bd-accent-primary">NEW</span>
        </router-link>

        <router-link 
          to="/ecosystem"
          class="nav-link"
          :class="{ 'active': isActive('/ecosystem') }"
        >
          <Sparkles class="w-4 h-4" />
          <span>Ecosystem</span>
        </router-link>
        
        <a 
          href="https://discord.com/invite/HB2YBZYjyf" 
          target="_blank" 
          rel="noopener noreferrer"
          class="nav-link"
        >
          <MessageCircle class="w-4 h-4" />
          <span>Discord</span>
          <ExternalLink class="w-3 h-3 ml-auto opacity-50" />
        </a>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-bd-border-subtle">
      <div class="text-xs text-bd-text-muted text-center">
        <p class="mt-1 flex items-center justify-center gap-1">Made with <Heart class="w-3 h-3 text-bd-error" /> by computerK</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  LayoutGrid, ScrollText, Bookmark, Drama, Code,
  Link2, GitPullRequest, MessageCircle, ExternalLink, Heart, Sparkles
} from 'lucide-vue-next'

const route = useRoute()

const mainNavItems = [
  { path: '/ai-instructions', label: 'AI Instructions', icon: ScrollText, count: null },
  { path: '/plot-components', label: 'Plot Components', icon: Bookmark, count: null },
  { path: '/story-cards', label: 'Story Cards', icon: Drama, count: null },
  { path: '/scripts', label: 'Scripts', icon: Code, count: null },
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
