<template>
  <div class="min-h-screen flex">
    <!-- Sidebar Navigation -->
    <Sidebar />
    
    <!-- Main Content Area -->
    <main class="flex-1 ml-64">
      <div class="max-w-6xl mx-auto px-8 py-8">
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
import Sidebar from '@/components/layout/Sidebar.vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
</script>
