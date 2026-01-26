<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 space-y-3" style="z-index: var(--bd-z-toast)">
      <TransitionGroup name="slide">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-card animate-slide-up"
          :class="toastClasses(toast.type)"
        >
          <span class="text-base flex-shrink-0">{{ toastIconChar(toast.type) }}</span>
          <span class="text-sm font-medium">{{ toast.message }}</span>
          <button 
            @click="removeToast(toast.id)"
            class="ml-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span class="text-sm">✕</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, provide } from 'vue'

const toasts = ref([])
let toastId = 0

const addToast = (message, type = 'success', duration = 3000) => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  
  if (duration > 0) {
    setTimeout(() => removeToast(id), duration)
  }
}

const removeToast = (id) => {
  const index = toasts.value.findIndex(t => t.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const toastClasses = (type) => {
  const classes = {
    success: 'bg-bd-success/20 border border-bd-success/30 text-bd-success',
    error: 'bg-bd-error/20 border border-bd-error/30 text-bd-error',
    warning: 'bg-bd-warning/20 border border-bd-warning/30 text-bd-warning',
    info: 'bg-bd-info/20 border border-bd-info/30 text-bd-info',
  }
  return classes[type] || classes.info
}

const toastIconChar = (type) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }
  return icons[type] || 'ℹ'
}

// Provide toast function to all components
provide('toast', addToast)
</script>
