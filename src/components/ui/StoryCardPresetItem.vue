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
            <h3 class="font-semibold text-bd-text-primary">{{ preset.name }}</h3>
            <!-- Essential Badge -->
            <span v-if="preset.essential" class="badge badge-popular text-[9px]">
              Essential
            </span>
            <!-- Category Badge -->
            <span class="tag text-[9px]" :class="categoryClass">
              {{ categoryName }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ preset.description }}</p>
        </div>
        <button 
          @click.stop="copyCommand"
          class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors flex-shrink-0 text-bd-text-muted hover:text-bd-text-primary"
          title="Copy Command Prompt"
        >
          <span class="text-sm">{{ copied ? '✓' : '📋' }}</span>
        </button>
      </div>

      <!-- Metadata Badges -->
      <div class="flex flex-wrap gap-1.5 mt-3">
        <!-- Difficulty Badge -->
        <span class="tag text-[10px]" :class="difficultyClass">
          {{ preset.difficulty }}
        </span>
        <!-- Impact Badge -->
        <span class="tag text-[10px]" :class="impactClass">
          {{ preset.impact }} impact
        </span>
        <!-- Source -->
        <span v-if="preset.source" class="tag text-[10px]">
          {{ preset.source }}
        </span>
      </div>
    </div>

    <!-- Expanded Content -->
    <Transition name="slide">
      <div v-if="isExpanded" class="border-t border-bd-border-subtle">
        <!-- Use Case -->
        <div v-if="preset.useCase" class="p-4 border-b border-bd-border-subtle">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">💡</span>
            <span class="uppercase tracking-wider font-medium">When to Use</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ preset.useCase }}</p>
        </div>

        <!-- Story Card Command (Prompt) -->
        <div class="p-4 border-b border-bd-border-subtle">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2 text-xs text-bd-text-muted">
              <span class="text-xs">🤖</span>
              <span class="uppercase tracking-wider font-medium">Story Card Command</span>
            </div>
            <button 
              @click.stop="copyCommand"
              class="copy-btn"
            >
              <span class="text-xs">{{ copied ? '✓' : '📋' }}</span>
              {{ copied ? 'Copied!' : 'Copy Prompt' }}
            </button>
          </div>
          <pre class="code-block whitespace-pre-wrap text-sm border border-bd-green/20 bg-bd-bg-tertiary p-3 rounded-lg text-bd-green font-mono">{{ preset.command }}</pre>
        </div>

        <!-- System Settings -->
        <div class="p-4 border-b border-bd-border-subtle space-y-4">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted">
            <span class="text-xs">⚙️</span>
            <span class="uppercase tracking-wider font-medium">In-App Command Tab Settings</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Format & Additional Context -->
            <div class="space-y-3">
              <div>
                <span class="text-xs text-bd-text-muted block mb-1">Entry Formatting</span>
                <span class="px-2 py-1 rounded bg-bd-purple/10 text-bd-purple border border-bd-purple/20 text-xs font-semibold uppercase font-mono">
                  {{ preset.entryFormatting }}
                </span>
              </div>
              <div v-if="preset.additionalContext !== undefined">
                <span class="text-xs text-bd-text-muted block mb-1">Additional Generation Context</span>
                <div v-if="preset.additionalContext" class="p-2 rounded bg-bd-bg-secondary border border-bd-border-subtle font-mono text-xs text-bd-text-secondary whitespace-pre-wrap">
                  {{ preset.additionalContext }}
                </div>
                <span v-else class="text-xs text-bd-text-muted italic">None (leave empty)</span>
              </div>
            </div>

            <!-- Toggles -->
            <div class="space-y-3">
              <div>
                <span class="text-xs text-bd-text-muted block mb-1">Control Toggles</span>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2 text-xs">
                    <span 
                      class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                      :class="preset.logInNotes ? 'bg-bd-green/20 text-bd-green border border-bd-green/30' : 'bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle'"
                    >
                      {{ preset.logInNotes ? '✓' : '✗' }}
                    </span>
                    <span :class="preset.logInNotes ? 'text-bd-text-primary' : 'text-bd-text-muted'">Log Generations in Notes</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs">
                    <span 
                      class="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold"
                      :class="preset.speedCreate ? 'bg-bd-green/20 text-bd-green border border-bd-green/30' : 'bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle'"
                    >
                      {{ preset.speedCreate ? '✓' : '✗' }}
                    </span>
                    <span :class="preset.speedCreate ? 'text-bd-text-primary' : 'text-bd-text-muted'">Speed Create Mode</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="preset.tags && preset.tags.length > 0" class="px-4 pb-4 mt-4">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">🏷️</span>
            <span class="uppercase tracking-wider font-medium">Tags</span>
          </div>
          <SmartTagList
            :tags="preset.tags"
            gap="xs"
            :max-visible="10"
            :show-core="true"
            :show-icons="false"
            :deduplicate="true"
          />
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
  preset: {
    type: Object,
    required: true
  }
})

const toast = inject('toast', () => {})

const isExpanded = ref(false)
const copied = ref(false)

const category = computed(() => 
  STORY_CARD_CATEGORIES.find(c => c.id === props.preset.category)
)

const categoryName = computed(() => category.value?.name || 'General Purpose')

const categoryClass = computed(() => {
  if (!props.preset.category) {
    return 'bg-bd-cyan/20 text-bd-cyan border border-bd-cyan/30'
  }
  const colorMap = {
    'character': 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30',
    'location': 'bg-bd-green/20 text-bd-green border border-bd-green/30',
    'faction': 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30',
    'item': 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30',
    'creature': 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30',
    'concept': 'bg-bd-cyan/20 text-bd-cyan border border-bd-cyan/30'
  }
  return colorMap[props.preset.category] || 'bg-bd-tag-bg text-bd-text-muted'
})

const difficultyClass = computed(() => {
  const classMap = {
    'beginner': 'bg-bd-green/20 text-bd-green border border-bd-green/30',
    'intermediate': 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30',
    'advanced': 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30'
  }
  return classMap[props.preset.difficulty] || 'bg-bd-tag-bg text-bd-text-muted'
})

const impactClass = computed(() => {
  const classMap = {
    'high': 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30',
    'medium': 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30',
    'low': 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default'
  }
  return classMap[props.preset.impact] || 'bg-bd-tag-bg text-bd-text-muted'
})

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(props.preset.command)
    copied.value = true
    toast('Command prompt copied to clipboard!', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    toast('Failed to copy command', 'error')
  }
}
</script>
