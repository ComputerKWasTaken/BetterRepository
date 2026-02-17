<template>
  <div 
    class="story-card-item"
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
            <!-- Category Badge -->
            <span class="tag text-[9px]" :class="categoryClass">
              {{ categoryName }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ card.description }}</p>
        </div>
        <button 
          @click.stop="copyEntry"
          class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors flex-shrink-0 text-bd-text-muted hover:text-bd-text-primary"
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
      <div v-if="isExpanded" class="border-t border-bd-border-subtle">
        <!-- Use Case -->
        <div v-if="card.useCase" class="p-4 border-b border-bd-border-subtle">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">💡</span>
            <span class="uppercase tracking-wider font-medium">When to Use</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ card.useCase }}</p>
        </div>

        <!-- Triggers -->
        <div class="p-4 border-b border-bd-border-subtle">
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
          <SmartTagList
            :tags="card.tags"
            gap="xs"
            :max-visible="10"
            :show-core="true"
            :show-icons="false"
            :deduplicate="true"
          />
        </div>

        <!-- Credits -->
        <div v-if="card.credit" class="px-4 pb-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/20">
            <span class="text-sm text-bd-amber flex-shrink-0">👥</span>
            <div>
              <span class="text-sm text-bd-amber font-medium">Credits:</span>
              <div class="text-xs text-bd-text-secondary mt-1">
                <div v-if="card.credit.author" class="flex items-center gap-1">
                  <strong>Author:</strong> {{ card.credit.author }}
                </div>
              </div>
            </div>
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
import SmartTagList from '@/components/ui/SmartTagList.vue'
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
  return colorMap[props.card.category] || 'bg-bd-tag-bg text-bd-text-muted'
})

const difficultyClass = computed(() => {
  const classMap = {
    'beginner': 'bg-bd-green/20 text-bd-green border border-bd-green/30',
    'intermediate': 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30',
    'advanced': 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30'
  }
  return classMap[props.card.difficulty] || 'bg-bd-tag-bg text-bd-text-muted'
})

const impactClass = computed(() => {
  const classMap = {
    'high': 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30',
    'medium': 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30',
    'low': 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default'
  }
  return classMap[props.card.impact] || 'bg-bd-tag-bg text-bd-text-muted'
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

