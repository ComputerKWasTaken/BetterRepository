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
          <span class="text-xs">▦</span>
          <span>Resources</span>
        </div>
        
        <router-link 
          v-for="item in mainNavItems" 
          :key="item.path"
          :to="item.path"
          class="nav-link"
          :class="{ 'active': isActive(item.path) }"
        >
          <span class="text-sm">{{ item.iconChar }}</span>
          <span>{{ item.label }}</span>
          <span v-if="item.count" class="ml-auto text-xs text-bd-text-muted bg-white/[0.06] px-2 py-0.5 rounded-full">
            {{ item.count }}
          </span>
        </router-link>
      </div>

      <!-- Community -->
      <div>
        <div class="section-header">
          <span class="text-xs">👥</span>
          <span>Community</span>
        </div>
        
        <router-link 
          to="/contribute"
          class="nav-link"
          :class="{ 'active': isActive('/contribute') }"
        >
          <span class="text-sm">🤝</span>
          <span>Contribute</span>
        </router-link>
        
        <a 
          href="https://discord.gg/aidungeon" 
          target="_blank" 
          rel="noopener noreferrer"
          class="nav-link"
        >
          <span class="text-sm">💬</span>
          <span>Discord</span>
          <span class="text-xs ml-auto opacity-50">↗</span>
        </a>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-4 border-t border-white/[0.06]">
      <div class="text-xs text-bd-text-muted text-center">
        <p>Inspired by <a href="https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU" target="_blank" class="text-bd-accent-primary hover:underline">OffMetaGamer's Repository</a></p>
        <p class="mt-1">Made with ❤️ for the AI Dungeon community</p>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const mainNavItems = [
  { path: '/ai-instructions', label: 'AI Instructions', iconChar: '📜', count: null },
  { path: '/plot-components', label: 'Plot Components', iconChar: '🔖', count: null },
  { path: '/story-cards', label: 'Story Cards', iconChar: '🎭', count: null },
  { path: '/scripts', label: 'Scripts', iconChar: '⚙️', count: null },
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>
