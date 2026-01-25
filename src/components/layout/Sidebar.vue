<template>
  <aside class="fixed left-0 top-0 h-full w-64 bg-bd-bg-secondary border-r border-white/[0.06] flex flex-col z-50">
    <!-- Logo Header -->
    <div class="p-6 border-b border-white/[0.06]">
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
            <span class="badge badge-new">Beta</span>
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
          <span v-if="item.count" class="ml-auto text-xs text-bd-text-muted bg-white/[0.06] px-2 py-0.5 rounded-full">
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
          class="nav-link"
          :class="{ 'active': isActive('/contribute') }"
        >
          <GitPullRequest class="w-4 h-4" />
          <span>Contribute</span>
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
    <div class="p-4 border-t border-white/[0.06]">
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
  LayoutGrid, ScrollText, Bookmark, Drama, Settings,
  Link2, GitPullRequest, MessageCircle, ExternalLink, Heart
} from 'lucide-vue-next'

const route = useRoute()

const mainNavItems = [
  { path: '/ai-instructions', label: 'AI Instructions', icon: ScrollText, count: null },
  { path: '/plot-components', label: 'Plot Components', icon: Bookmark, count: null },
  { path: '/story-cards', label: 'Story Cards', icon: Drama, count: null },
  { path: '/scripts', label: 'Scripts', icon: Settings, count: null },
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
