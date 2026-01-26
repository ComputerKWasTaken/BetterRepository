<template>
  <div 
    class="script-item"
    :class="{ 'ring-2 ring-bd-accent-primary': isExpanded }"
  >
    <!-- Card Header -->
    <div class="p-4 cursor-pointer" @click="toggleExpand">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h3 class="font-semibold text-bd-text-primary">{{ script.name }}</h3>
            <!-- Essential Badge -->
            <span v-if="script.essential" class="badge badge-popular text-[9px]">
              Recommended
            </span>
            <!-- Source Badge -->
            <span 
              v-if="script.source === 'Official Guidebook'"
              class="tag text-[9px] bg-bd-green/20 text-bd-green"
            >
              Official
            </span>
            <span 
              v-else-if="script.source === 'Community'"
              class="tag text-[9px] bg-bd-purple/20 text-bd-purple"
            >
              Community
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary line-clamp-2">{{ script.description }}</p>
        </div>
        <button 
          @click.stop="copyMainContent"
          class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors flex-shrink-0 text-bd-text-muted hover:text-bd-text-primary"
          title="Copy script"
        >
          <span class="text-sm">{{ copied ? '✓' : '📋' }}</span>
        </button>
      </div>

      <!-- Metadata Badges -->
      <div class="flex flex-wrap gap-1.5 mt-3">
        <!-- Difficulty Badge -->
        <span class="tag text-[10px]" :class="difficultyClass">
          {{ script.difficulty }}
        </span>
        <!-- File Type Badge -->
        <span v-if="script.fileType" class="tag text-[10px]" :class="fileTypeClass">
          {{ script.fileType }}
        </span>
        <span v-if="script.files" class="tag text-[10px] bg-bd-amber/20 text-bd-amber">
          Multi-file
        </span>
        <!-- Author -->
        <span v-if="script.author" class="tag text-[10px]">
          by {{ script.author }}
        </span>
      </div>
    </div>

    <!-- Expanded Content -->
    <Transition name="slide">
      <div v-if="isExpanded" class="border-t border-bd-border-subtle">
        <!-- Purpose -->
        <div v-if="script.purpose" class="p-4 border-b border-bd-border-subtle">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">💡</span>
            <span class="uppercase tracking-wider font-medium">Purpose</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ script.purpose }}</p>
        </div>

        <!-- Scenario Link -->
        <div v-if="script.scenarioLink" class="px-4 py-3 border-b border-bd-border-subtle">
          <a 
            :href="script.scenarioLink" 
            target="_blank"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-2"
          >
            <span>🎮</span>
            Try this scenario
            <ExternalLink class="w-3 h-3" />
          </a>
        </div>

        <!-- Single File Content -->
        <div v-if="script.content" class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2 text-xs text-bd-text-muted">
              <span class="text-xs">📝</span>
              <span class="uppercase tracking-wider font-medium">
                {{ script.fileType || 'Script' }}
              </span>
            </div>
            <button 
              @click.stop="copyContent(script.content)"
              class="copy-btn"
            >
              <span class="text-xs">{{ copied ? '✓' : '📋' }}</span>
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <pre class="code-block-scrollable whitespace-pre-wrap">{{ script.content }}</pre>
        </div>

        <!-- Multi-File Content -->
        <div v-if="script.files" class="divide-y divide-bd-border-subtle">
          <div v-for="(content, fileType) in script.files" :key="fileType" class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2 text-xs text-bd-text-muted">
                <span class="text-xs">{{ getFileIcon(fileType) }}</span>
                <span class="uppercase tracking-wider font-medium">{{ fileType }}</span>
              </div>
              <button 
                @click.stop="copyContent(content)"
                class="copy-btn"
              >
                <span class="text-xs">📋</span>
                Copy
              </button>
            </div>
            <pre class="code-block-scrollable whitespace-pre-wrap">{{ content }}</pre>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="script.tags && script.tags.length > 0" class="px-4 pb-4">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">🏷️</span>
            <span class="uppercase tracking-wider font-medium">Tags</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span 
              v-for="tag in script.tags" 
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
import { ExternalLink } from 'lucide-vue-next'

const props = defineProps({
  script: {
    type: Object,
    required: true
  }
})

const toast = inject('toast', () => {})

const isExpanded = ref(false)
const copied = ref(false)

const difficultyClass = computed(() => {
  const classMap = {
    'beginner': 'bg-bd-green/20 text-bd-green border border-bd-green/30',
    'intermediate': 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30',
    'advanced': 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30'
  }
  return classMap[props.script.difficulty] || 'bg-bd-tag-bg text-bd-text-muted'
})

const fileTypeClass = computed(() => {
  const classMap = {
    'input': 'bg-bd-green/20 text-bd-green',
    'context': 'bg-bd-blue/20 text-bd-blue',
    'output': 'bg-bd-amber/20 text-bd-amber',
    'library': 'bg-bd-purple/20 text-bd-purple'
  }
  return classMap[props.script.fileType] || 'bg-bd-tag-bg text-bd-text-muted'
})

const getFileIcon = (fileType) => {
  const icons = {
    'library': '📚',
    'input': '➡️',
    'context': '🧠',
    'output': '⬅️'
  }
  return icons[fileType] || '📝'
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}

const copyMainContent = async () => {
  const content = props.script.content || 
    (props.script.files ? Object.values(props.script.files).join('\n\n// ===\n\n') : '')
  await copyContent(content)
}

const copyContent = async (content) => {
  try {
    await navigator.clipboard.writeText(content)
    copied.value = true
    toast('Script copied to clipboard!', 'success')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    toast('Failed to copy script', 'error')
  }
}
</script>

