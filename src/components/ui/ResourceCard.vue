<template>
  <div 
    class="resource-card"
    :class="{ 'ring-2 ring-bd-accent-primary': isExpanded }"
    @click="toggleExpand"
  >
    <!-- Card Header -->
    <div class="p-4 cursor-pointer">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <h3 class="font-semibold text-bd-text-primary truncate">{{ resource.name }}</h3>
            <span v-if="resource.models" class="badge badge-new text-[9px]">
              {{ resource.models[0] }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ resource.description }}</p>
        </div>
        <button 
          @click.stop="toggleFavorite"
          class="p-2 rounded-lg hover:bg-white/[0.06] transition-colors flex-shrink-0"
          :class="isFavorited ? 'text-bd-accent-primary' : 'text-bd-text-muted'"
        >
          <span class="text-sm">{{ isFavorited ? '❤️' : '🤍' }}</span>
        </button>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-3">
        <span 
          v-for="tag in displayTags" 
          :key="tag"
          class="tag text-[10px]"
        >
          {{ tag }}
        </span>
        <span v-if="resource.tags.length > 3" class="tag text-[10px]">
          +{{ resource.tags.length - 3 }}
        </span>
      </div>
    </div>

    <!-- Expanded Content -->
    <Transition name="slide">
      <div v-if="isExpanded" class="border-t border-white/[0.06]">
        <!-- Purpose -->
        <div v-if="resource.purpose" class="p-4 border-b border-white/[0.06]">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">ℹ</span>
            <span class="uppercase tracking-wider font-medium">Purpose</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ resource.purpose }}</p>
        </div>

        <!-- Content -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2 text-xs text-bd-text-muted">
              <span class="text-xs">📝</span>
              <span class="uppercase tracking-wider font-medium">Content</span>
            </div>
            <button 
              @click.stop="copyContent"
              class="copy-btn"
            >
              <span class="text-xs">{{ copied ? '✓' : '📋' }}</span>
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block whitespace-pre-wrap text-sm">{{ resource.content }}</pre>
        </div>

        <!-- Placement hint -->
        <div v-if="resource.placement" class="px-4 pb-4">
          <div class="flex items-center gap-2 p-3 rounded-lg bg-bd-info/10 border border-bd-info/20">
            <span class="text-sm text-bd-info flex-shrink-0">🔖</span>
            <span class="text-sm text-bd-info">
              Best used in: <strong>{{ placementName }}</strong>
            </span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Expand indicator -->
    <div class="px-4 pb-3 flex items-center justify-center">
      <span 
        class="text-sm text-bd-text-muted transition-transform inline-block" 
        :class="{ 'rotate-180': isExpanded }"
      >▼</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { usePreferences } from '@/composables/usePreferences'
import { PLACEMENTS } from '@/data/repository'

const props = defineProps({
  resource: {
    type: Object,
    required: true
  }
})

const toast = inject('toast', () => {})
const { toggleFavorite: toggleFav, isFavorite } = usePreferences()

const isExpanded = ref(false)
const copied = ref(false)

const isFavorited = computed(() => isFavorite(props.resource.id))

const displayTags = computed(() => props.resource.tags.slice(0, 3))

const placementName = computed(() => {
  const placement = PLACEMENTS.find(p => p.id === props.resource.placement)
  return placement?.name || props.resource.placement
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const toggleFavorite = () => {
  toggleFav(props.resource.id)
  toast(
    isFavorited.value ? 'Removed from favorites' : 'Added to favorites',
    'success'
  )
}

const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(props.resource.content)
    copied.value = true
    toast('Content copied to clipboard!', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    toast('Failed to copy content', 'error')
  }
}
</script>
