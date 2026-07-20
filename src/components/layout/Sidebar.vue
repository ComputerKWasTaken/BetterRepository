<template>
  <!-- Mobile overlay backdrop -->
  <Transition name="sidebar-backdrop">
    <div 
      v-if="isOpen && isMobile"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
      style="z-index: var(--bd-z-modal-backdrop)"
      @click="emit('close')"
    />
  </Transition>

  <!-- Sidebar panel -->
  <Transition name="sidebar-slide">
    <aside 
      v-if="sidebarVisible"
      ref="sidebarRef"
      class="fixed left-0 top-0 h-full w-64 bg-bd-bg-secondary border-r border-bd-border-subtle flex flex-col"
      :style="{ zIndex: isMobile ? 'var(--bd-z-modal)' : 'var(--bd-z-fixed)' }"
    >
      <!-- Logo Header -->
      <div class="p-6 border-b border-bd-border-subtle flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-3 group" @click="closeMobile">
          <div class="w-10 h-10 rounded-lg overflow-hidden shadow-glow">
            <img src="/betterrepository_logo.png" alt="BetterRepository" class="w-full h-full object-cover" />
          </div>
          <div>
            <h1 class="text-lg font-semibold text-bd-text-primary group-hover:text-gradient transition-all">
              BetterRepository
            </h1>
            <div class="flex items-center gap-2">
              <router-link to="/?section=whats-new" class="text-xs text-bd-text-muted hover:text-bd-accent-primary transition-colors">v1.6</router-link>
            </div>
          </div>
        </router-link>
        <!-- Close button (mobile only) -->
        <button 
          v-if="isMobile"
          @click="emit('close')"
          class="p-2 rounded-lg hover:bg-bd-bg-tertiary text-bd-text-muted hover:text-bd-text-primary transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <X class="w-5 h-5" />
        </button>
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
            @click="closeMobile"
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
            @click="closeMobile"
          >
            <GitPullRequest class="w-4 h-4" />
            <span>Contribute</span>
            </router-link>

          <router-link 
            to="/ecosystem"
            class="nav-link"
            :class="{ 'active': isActive('/ecosystem') }"
            @click="closeMobile"
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

          <a
            href="https://ko-fi.com/computerk"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-link"
          >
            <Coffee class="w-4 h-4" />
            <span>Support on Ko-fi</span>
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
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { 
  LayoutGrid, ScrollText, Bookmark, Drama, Code, BookOpen, Rocket,
  Link2, GitPullRequest, MessageCircle, ExternalLink, Heart, Coffee, Sparkles, X
} from 'lucide-vue-next'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close'])

const route = useRoute()
const sidebarRef = ref(null)

// --- Mobile detection via matchMedia ---
const isMobile = ref(false)
let mediaQuery = null

const updateMobile = () => {
  isMobile.value = !window.matchMedia('(min-width: 1024px)').matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(min-width: 1024px)')
  isMobile.value = !mediaQuery.matches
  mediaQuery.addEventListener('change', updateMobile)
})

onUnmounted(() => {
  if (mediaQuery) mediaQuery.removeEventListener('change', updateMobile)
  document.body.style.overflow = ''
})

// Computed: sidebar is always visible on desktop, controlled by isOpen on mobile
const sidebarVisible = computed(() => !isMobile.value || props.isOpen)

// Close sidebar on mobile when navigating
const closeMobile = () => {
  if (isMobile.value) {
    emit('close')
  }
}

// Lock body scroll when mobile sidebar is open
watch(() => props.isOpen, (open) => {
  if (isMobile.value) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

// Reset scroll lock when resizing to desktop while sidebar is open
watch(isMobile, (mobile) => {
  if (!mobile) {
    document.body.style.overflow = ''
  }
})

// Close sidebar on route change (handles browser back/forward)
watch(() => route.path, () => {
  closeMobile()
})

const mainNavItems = [
  { path: '/ai-instructions', label: 'AI Instructions', icon: ScrollText, count: null },
  { path: '/plot-components', label: 'Plot Components', icon: Bookmark, count: null },
  { path: '/story-cards', label: 'Story Cards', icon: Drama, count: null },
  { path: '/scripts', label: 'Scripts', icon: Code, count: null },
  { path: '/ultrascripts', label: 'Ultrascripts', icon: Rocket, count: null },
  { path: '/guides', label: 'Guides', icon: BookOpen, count: null },
]

const isActive = (path) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path)
}
</script>

<style scoped>
/* === Sidebar slide-in transition (mobile) === */
.sidebar-slide-enter-active,
.sidebar-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar-slide-enter-from,
.sidebar-slide-leave-to {
  transform: translateX(-100%);
}

/* === Backdrop fade transition === */
.sidebar-backdrop-enter-active,
.sidebar-backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.sidebar-backdrop-enter-from,
.sidebar-backdrop-leave-to {
  opacity: 0;
}
</style>
