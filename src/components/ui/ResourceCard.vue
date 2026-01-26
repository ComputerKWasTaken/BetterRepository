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
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h3 class="font-semibold text-bd-text-primary truncate">{{ resource.name }}</h3>
            <!-- Essential Badge -->
            <span v-if="resource.essential" class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-bd-amber/20 text-bd-amber border border-bd-amber/30">
              ⭐ ESSENTIAL
            </span>
            <!-- Model Badge -->
            <span v-if="resource.models && resource.models[0] !== 'All Models'" class="badge badge-new text-[9px]">
              {{ resource.models[0] }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ resource.description }}</p>
          
          <!-- Difficulty & Impact Badges -->
          <div v-if="resource.difficulty || resource.impact" class="flex items-center gap-2 mt-2">
            <span v-if="resource.difficulty" class="px-1.5 py-0.5 rounded text-[9px] font-medium" :class="difficultyClass">
              {{ resource.difficulty }}
            </span>
            <span v-if="resource.impact" class="px-1.5 py-0.5 rounded text-[9px] font-medium" :class="impactClass">
              {{ resource.impact }} impact
            </span>
          </div>
        </div>
        <button 
          @click.stop="toggleFavorite"
          class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors flex-shrink-0"
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
      <div v-if="isExpanded" class="border-t border-bd-border-subtle">
        <!-- Purpose -->
        <div v-if="resource.purpose" class="p-4 border-b border-bd-border-subtle">
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

        <!-- Combines With -->
        <div v-if="resource.combinesWith && resource.combinesWith.length > 0" class="px-4 pb-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-green/10 border border-bd-green/20">
            <span class="text-sm text-bd-green flex-shrink-0">🔗</span>
            <div>
              <span class="text-sm text-bd-green font-medium">Works well with:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="id in resource.combinesWith" 
                  :key="id"
                  class="text-[10px] px-1.5 py-0.5 rounded bg-bd-green/20 text-bd-green"
                >{{ formatId(id) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Conflicts With -->
        <div v-if="resource.conflicts && resource.conflicts.length > 0" class="px-4 pb-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
            <span class="text-sm text-bd-pink flex-shrink-0">⚠️</span>
            <div>
              <span class="text-sm text-bd-pink font-medium">Conflicts with:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span 
                  v-for="id in resource.conflicts" 
                  :key="id"
                  class="text-[10px] px-1.5 py-0.5 rounded bg-bd-pink/20 text-bd-pink"
                >{{ formatId(id) }}</span>
              </div>
            </div>
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

const difficultyClass = computed(() => {
  const classes = {
    'beginner': 'bg-bd-green/20 text-bd-green border border-bd-green/30',
    'intermediate': 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30',
    'advanced': 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30'
  }
  return classes[props.resource.difficulty] || 'bg-bd-tag-bg text-bd-text-muted'
})

const impactClass = computed(() => {
  const classes = {
    'high': 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30',
    'medium': 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30',
    'low': 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default'
  }
  return classes[props.resource.impact] || 'bg-bd-tag-bg text-bd-text-muted'
})

const formatId = (id) => {
  return id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

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
