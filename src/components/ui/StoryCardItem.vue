<template>
  <div 
    class="story-card-item rounded-xl border border-white/[0.06] bg-bd-bg-secondary overflow-hidden transition-all"
    :class="{ 'ring-2 ring-bd-accent-primary': isExpanded }"
  >
    <!-- Card Header -->
    <div class="p-4 cursor-pointer" @click="toggleExpand">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h3 class="font-semibold text-bd-text-primary">{{ card.name }}</h3>
            <!-- Essential Badge -->
            <span v-if="card.essential" class="badge badge-popular text-[9px]">
              Essential
            </span>
            <!-- Type Badge -->
            <span 
              class="tag text-[9px]"
              :class="type === 'template' ? 'bg-bd-green/20 text-bd-green' : 'bg-bd-purple/20 text-bd-purple'"
            >
              {{ type === 'template' ? 'Template' : 'Example' }}
            </span>
            <!-- Category Badge -->
            <span class="tag text-[9px]" :class="categoryClass">
              {{ categoryName }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ card.description }}</p>
        </div>
        <button 
          @click.stop="copyEntry"
          class="p-2 rounded-lg hover:bg-white/[0.06] transition-colors flex-shrink-0 text-bd-text-muted hover:text-bd-text-primary"
          title="Copy entry"
        >
          <span class="text-sm">{{ copied ? '✓' : '📋' }}</span>
        </button>
      </div>

      <!-- Metadata Badges -->
      <div class="flex flex-wrap gap-1.5 mt-3">
        <!-- Difficulty Badge -->
        <span class="tag text-[10px]" :class="difficultyClass">
          {{ card.difficulty }}
        </span>
        <!-- Impact Badge -->
        <span class="tag text-[10px]" :class="impactClass">
          {{ card.impact }} impact
        </span>
        <!-- Source -->
        <span v-if="card.source" class="tag text-[10px]">
          {{ card.source }}
        </span>
      </div>
    </div>

    <!-- Expanded Content -->
    <Transition name="slide">
      <div v-if="isExpanded" class="border-t border-white/[0.06]">
        <!-- Use Case -->
        <div v-if="card.useCase" class="p-4 border-b border-white/[0.06]">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">💡</span>
            <span class="uppercase tracking-wider font-medium">When to Use</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ card.useCase }}</p>
        </div>

        <!-- Triggers -->
        <div class="p-4 border-b border-white/[0.06]">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">⚡</span>
            <span class="uppercase tracking-wider font-medium">Triggers</span>
          </div>
          <code class="text-sm text-bd-purple bg-bd-bg-tertiary px-2 py-1 rounded">{{ card.triggers }}</code>
        </div>

        <!-- Entry -->
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2 text-xs text-bd-text-muted">
              <span class="text-xs">📝</span>
              <span class="uppercase tracking-wider font-medium">Entry</span>
            </div>
            <button 
              @click.stop="copyEntry"
              class="copy-btn"
            >
              <span class="text-xs">{{ copied ? '✓' : '📋' }}</span>
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block whitespace-pre-wrap text-sm">{{ card.entry }}</pre>
        </div>

        <!-- Tags -->
        <div v-if="card.tags && card.tags.length > 0" class="px-4 pb-4">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">🏷️</span>
            <span class="uppercase tracking-wider font-medium">Tags</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span 
              v-for="tag in card.tags" 
              :key="tag"
              class="tag text-[10px]"
            >
              {{ tag }}
            </span>
          </div>
        </div>

      </div>
    </Transition>

    <!-- Expand indicator -->
    <div class="px-4 pb-3 flex items-center justify-center cursor-pointer" @click="toggleExpand">
      <span 
        class="text-sm text-bd-text-muted transition-transform inline-block" 
        :class="{ 'rotate-180': isExpanded }"
      >▼</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { STORY_CARD_CATEGORIES } from '@/data/storyCards'

const props = defineProps({
  card: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    default: 'example'
  }
})

const toast = inject('toast', () => {})

const isExpanded = ref(false)
const copied = ref(false)

const category = computed(() => 
  STORY_CARD_CATEGORIES.find(c => c.id === props.card.category)
)

const categoryName = computed(() => category.value?.name || props.card.category)

const categoryClass = computed(() => {
  const colorMap = {
    'character': 'bg-bd-purple/20 text-bd-purple',
    'location': 'bg-bd-green/20 text-bd-green',
    'faction': 'bg-bd-blue/20 text-bd-blue',
    'item': 'bg-bd-amber/20 text-bd-amber',
    'creature': 'bg-bd-pink/20 text-bd-pink',
    'concept': 'bg-bd-cyan/20 text-bd-cyan'
  }
  return colorMap[props.card.category] || 'bg-white/10 text-bd-text-muted'
})

const difficultyClass = computed(() => {
  const classMap = {
    'beginner': 'bg-bd-green/20 text-bd-green',
    'intermediate': 'bg-bd-amber/20 text-bd-amber',
    'advanced': 'bg-bd-pink/20 text-bd-pink'
  }
  return classMap[props.card.difficulty] || 'bg-white/10 text-bd-text-muted'
})

const impactClass = computed(() => {
  const classMap = {
    'high': 'bg-bd-purple/20 text-bd-purple',
    'medium': 'bg-bd-blue/20 text-bd-blue',
    'low': 'bg-white/10 text-bd-text-muted'
  }
  return classMap[props.card.impact] || 'bg-white/10 text-bd-text-muted'
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyEntry = async () => {
  try {
    await navigator.clipboard.writeText(props.card.entry)
    copied.value = true
    toast('Entry copied to clipboard!', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    toast('Failed to copy entry', 'error')
  }
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 1000px;
}

.copy-btn {
  @apply flex items-center gap-1.5 px-2 py-1 rounded text-xs text-bd-text-muted hover:text-bd-text-primary hover:bg-white/[0.06] transition-colors;
}

.code-block {
  @apply p-3 rounded-lg bg-bd-bg-tertiary text-bd-text-secondary font-mono;
}
</style>
