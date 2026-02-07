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
      <!-- Spacer to balance the hamburger button -->
      <div class="w-9" />
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
    
    <!-- Toast Notifications -->
    <ToastContainer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Menu } from 'lucide-vue-next'
import Sidebar from '@/components/layout/Sidebar.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'

// Mobile sidebar state
const sidebarOpen = ref(false)
</script>
