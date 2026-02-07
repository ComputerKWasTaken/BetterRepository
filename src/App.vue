<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-bd-bg-primary text-bd-text-primary">
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
    <Sidebar :isOpen="sidebarOpen" @close="sidebarOpen = false" />
    
    <!-- Main Content Area -->
    <main class="flex-1 lg:ml-64 pt-14 lg:pt-0">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
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
import { Menu, Search } from 'lucide-vue-next'
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
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
