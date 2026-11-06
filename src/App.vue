<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-bd-bg-primary text-bd-text-primary">
    <a
      href="#main-content"
      class="fixed left-4 top-2 -translate-y-16 focus:translate-y-0 px-3 py-2 rounded-lg bg-bd-accent-primary text-white text-sm font-semibold transition-transform"
      style="z-index: var(--bd-z-modal)"
    >
      Skip to content
    </a>
    <!-- Mobile Header Bar (visible below lg) -->
    <header class="fixed top-0 left-0 right-0 h-14 bg-bd-bg-secondary/95 backdrop-blur-sm border-b border-bd-border-subtle flex items-center justify-between px-4 lg:hidden" style="z-index: var(--bd-z-sticky)">
      <button 
        @click="sidebarOpen = true"
        class="p-2 -ml-1 rounded-lg hover:bg-bd-bg-tertiary text-bd-text-secondary hover:text-bd-text-primary transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu class="w-5 h-5" />
      </button>
      <router-link to="/" class="flex items-center gap-2">
        <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-7 h-7 object-contain" />
        <span class="text-sm font-semibold text-bd-text-primary">Better<span class="text-gradient">Repository</span></span>
      </router-link>
      <!-- Search button (mobile header) -->
      <button
        @click="searchOpen = true"
        class="p-2 -mr-1 rounded-lg hover:bg-bd-bg-tertiary text-bd-text-secondary hover:text-bd-text-primary transition-colors"
        aria-label="Search"
      >
        <Search class="w-5 h-5" />
      </button>
    </header>

    <!-- Sidebar Navigation -->
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" @search="searchOpen = true" />
    
    <!-- Main Content Area -->
    <main id="main-content" class="flex-1 min-w-0 overflow-x-hidden lg:ml-64 pt-14 lg:pt-0" tabindex="-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <!-- V2 Announcement Banner (temporary — remove when V2 ships) -->
        <div class="mb-6 rounded-xl border border-bd-accent-primary/30 bg-gradient-to-r from-bd-accent-primary/10 via-bd-purple/10 to-bd-cyan/10 px-4 py-3 flex items-start gap-3">
          <Sparkles class="w-5 h-5 text-bd-accent-light shrink-0 mt-0.5" />
          <p class="text-sm text-bd-text-secondary leading-relaxed">
            <span class="font-semibold text-bd-text-primary">BetterRepository V2 is in the works.</span>
            A leaner, more polished rebuild is on the way: a trimmed-down collection, extra care throughout, and updates for modern AI Dungeon and BetterDungeon (including Navigator). Everything here stays available in the meantime.
          </p>
        </div>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    
    <!-- Global Search Overlay (Ctrl+K / Cmd+K) -->
    <SearchOverlay :isOpen="searchOpen" @close="searchOpen = false" />

    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, Search, Sparkles } from 'lucide-vue-next'
import Sidebar from '@/components/layout/Sidebar.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import SearchOverlay from '@/components/ui/SearchOverlay.vue'

// Mobile sidebar state
const sidebarOpen = ref(false)

// Global search overlay state
const searchOpen = ref(false)

// Ctrl+K / Cmd+K keyboard shortcut
const handleKeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    searchOpen.value = !searchOpen.value
  }
  if (e.key === 'Escape') {
    sidebarOpen.value = false
    searchOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
