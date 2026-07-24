<template>
  <div 
    class="script-item"
    :class="{
      'ring-2 ring-bd-accent-primary': isExpanded && !isUnpublished,
      'ring-2 ring-bd-amber/50': isExpanded && isUnpublished
    }"
  >
    <!-- Card Header -->
    <div class="p-4 cursor-pointer" @click="toggleExpand" @keydown.enter.self="toggleExpand" @keydown.space.self.prevent="toggleExpand" tabindex="0">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1 flex-wrap">
            <h3 class="font-semibold text-bd-text-primary">{{ script.name }}</h3>
            <!-- Essential Badge -->
            <span v-if="script.essential" class="badge badge-popular text-[9px]">
              Recommended
            </span>
            <span
              v-if="script.ultrascriptsMode === 'enhanced'"
              class="tag text-[9px] bg-bd-emerald/20 text-bd-emerald"
            >
              Ultrascripts Enhanced
            </span>
            <span
              v-else-if="script.ultrascriptsMode === 'required'"
              class="tag text-[9px] bg-bd-purple/20 text-bd-purple"
            >
              Requires Ultrascripts
            </span>
            <span
              v-if="isUnpublished"
              class="tag text-[9px] bg-bd-amber/20 text-bd-amber border border-bd-amber/30"
            >
              Unpublished Preview
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
        <div v-if="hasCode && !isUnpublished" class="flex items-center gap-1 flex-shrink-0">
          <button
            @click.stop="copyMainContent"
            class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors text-bd-text-muted hover:text-bd-text-primary"
            :aria-label="`Copy ${script.name}`"
            title="Copy script"
          >
            <span class="text-sm">{{ copied ? '✓' : '📋' }}</span>
          </button>
          <button
            @click.stop="downloadMainContent"
            class="p-2 rounded-lg hover:bg-bd-bg-tertiary transition-colors text-bd-text-muted hover:text-bd-text-primary"
            :aria-label="`Download ${script.name}`"
            title="Download script"
          >
            <Download class="w-4 h-4" />
          </button>
        </div>
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
        <span v-if="script.files || script.fileLoaders" class="tag text-[10px] bg-bd-amber/20 text-bd-amber">
          Multi-file
        </span>
        <span v-if="script.requiresExtension" class="tag text-[10px] bg-bd-cyan/20 text-bd-cyan">
          BetterDungeon
        </span>
        <!-- External Only Badge -->
        <span v-if="isExternalOnly" class="tag text-[10px] bg-bd-cyan/20 text-bd-cyan">
          External
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
        <div v-if="isUnpublished" class="p-4 border-b border-bd-amber/20 bg-bd-amber/10">
          <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm font-semibold text-bd-amber">Not published in V1.7</p>
              <p class="text-xs text-bd-text-secondary mt-1">
                {{ script.releaseNote }} The current source remains tracked internally, but public copy and download controls are disabled.
              </p>
            </div>
          </div>
        </div>

        <div v-if="isLoading" class="p-4 border-b border-bd-border-subtle text-sm text-bd-text-muted flex items-center gap-2">
          <span class="w-4 h-4 border-2 border-bd-accent-primary/30 border-t-bd-accent-primary rounded-full animate-spin" />
          Loading script files…
        </div>

        <!-- Purpose -->
        <div v-if="script.purpose" class="p-4 border-b border-bd-border-subtle">
          <div class="flex items-center gap-2 text-xs text-bd-text-muted mb-2">
            <span class="text-xs">💡</span>
            <span class="uppercase tracking-wider font-medium">Purpose</span>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ script.purpose }}</p>
        </div>

        <!-- GitHub / External Links -->
        <div v-if="script.githubUrl || script.externalUrl" class="px-4 py-3 border-b border-bd-border-subtle flex flex-wrap gap-4">
          <a 
            v-if="script.githubUrl"
            :href="script.githubUrl" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-2"
          >
            <Github class="w-4 h-4" />
            View GitHub (Install Guide)
            <ExternalLink class="w-3 h-3" />
          </a>
          <a 
            v-if="script.externalUrl"
            :href="script.externalUrl" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-2"
          >
            <span>🔗</span>
            External Site
            <ExternalLink class="w-3 h-3" />
          </a>
        </div>

        <!-- Scenario Link -->
        <div v-if="script.scenarioLink" class="px-4 py-3 border-b border-bd-border-subtle">
          <a 
            :href="script.scenarioLink" 
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-2"
          >
            <span>🎮</span>
            Try this scenario
            <ExternalLink class="w-3 h-3" />
          </a>
        </div>

        <!-- Single File Content -->
        <div v-if="script.content && !isUnpublished" class="p-4">
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2 text-xs text-bd-text-muted">
              <span class="text-xs">📝</span>
              <span class="uppercase tracking-wider font-medium">
                {{ script.fileType || 'Script' }}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click.stop="copyContent(script.content)"
                class="copy-btn"
              >
                <span class="text-xs">{{ copied ? '✓' : '📋' }}</span>
                {{ copied ? 'Copied!' : 'Copy' }}
              </button>
              <button
                @click.stop="downloadContent(script.content, `${script.id}.js`)"
                class="copy-btn"
              >
                <Download class="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
          <pre class="code-block-scrollable whitespace-pre-wrap">{{ script.content }}</pre>
        </div>

        <!-- Multi-File Content -->
        <div v-if="script.files && !isUnpublished" class="divide-y divide-bd-border-subtle">
          <div v-for="(content, fileType) in script.files" :key="fileType" class="p-4">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2 text-xs text-bd-text-muted">
                <span class="text-xs">{{ getFileIcon(fileType) }}</span>
                <span class="uppercase tracking-wider font-medium">{{ fileType }}</span>
              </div>
              <div class="flex items-center gap-2">
                <button
                  @click.stop="copyContent(content)"
                  class="copy-btn"
                >
                  <span class="text-xs">📋</span>
                  Copy
                </button>
                <button
                  @click.stop="downloadContent(content, `${script.id}-${fileType}.js`)"
                  class="copy-btn"
                >
                  <Download class="w-3 h-3" />
                  Download
                </button>
              </div>
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
          <SmartTagList
            :tags="script.tags"
            gap="xs"
            :max-visible="10"
            :show-core="true"
            :show-icons="false"
            :deduplicate="true"
          />
        </div>

        <!-- Credits -->
        <div v-if="script.credit" class="px-4 pb-4">
          <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/20">
            <span class="text-sm text-bd-amber flex-shrink-0">👥</span>
            <div>
              <span class="text-sm text-bd-amber font-medium">Credits:</span>
              <div class="text-xs text-bd-text-secondary mt-1">
                <div v-if="script.credit.author" class="flex items-center gap-1">
                  <strong>Author:</strong> {{ script.credit.author }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Expand indicator -->
    <div 
      v-if="hasExpandableContent"
      class="px-4 pb-3 flex items-center justify-center cursor-pointer" 
      @click="toggleExpand"
    >
      <ChevronDown 
        class="w-4 h-4 text-bd-text-muted transition-transform" 
        :class="{ 'rotate-180': isExpanded }"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import SmartTagList from '@/components/ui/SmartTagList.vue'
import { ExternalLink, Github, ChevronDown, Download, AlertTriangle } from 'lucide-vue-next'

const props = defineProps({
  script: {
    type: Object,
    required: true
  }
})

const toast = inject('toast', () => {})

const isExpanded = ref(false)
const copied = ref(false)
const isLoading = ref(false)
const isUnpublished = computed(() => props.script.releaseStatus === 'unpublished')

// Check if script has copyable code content
const hasCode = computed(() => !!(
  props.script.content ||
  props.script.contentLoader ||
  props.script.files ||
  props.script.fileLoaders
))

// Check if script is external-only (links but no code)
const isExternalOnly = computed(() => 
  !hasCode.value && (props.script.githubUrl || props.script.externalUrl || props.script.scenarioLink)
)

// Check if there's expandable content
const hasExpandableContent = computed(() => 
  props.script.purpose || hasCode.value || props.script.githubUrl || 
  props.script.externalUrl || props.script.scenarioLink || 
  (props.script.tags && props.script.tags.length > 0)
)

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
    'library': 'bg-bd-purple/20 text-bd-purple',
    'helper': 'bg-bd-cyan/20 text-bd-cyan'
  }
  return classMap[props.script.fileType] || 'bg-bd-tag-bg text-bd-text-muted'
})

const getFileIcon = (fileType) => {
  const icons = {
    'library': '📚',
    'input': '➡️',
    'context': '🧠',
    'output': '⬅️',
    'helper': '🔧'
  }
  return icons[fileType] || '📝'
}

const loadCode = async () => {
  if (isUnpublished.value || isLoading.value) return
  if (props.script.content || props.script.files) return

  isLoading.value = true
  try {
    if (!props.script.content && props.script.contentLoader) {
      props.script.content = await props.script.contentLoader()
    }

    if (props.script.fileLoaders) {
      const entries = await Promise.all(
        Object.entries(props.script.fileLoaders).map(async ([fileType, loader]) => [fileType, await loader()])
      )
      props.script.files = Object.fromEntries(entries)
    }
  } catch (err) {
    toast('Failed to load script files', 'error')
  } finally {
    isLoading.value = false
  }
}

const toggleExpand = async () => {
  isExpanded.value = !isExpanded.value
  if (isExpanded.value && hasCode.value) {
    await loadCode()
  }
}

const copyMainContent = async () => {
  await loadCode()
  const content = props.script.content || 
    (props.script.files ? Object.values(props.script.files).join('\n\n// ===\n\n') : '')
  if (!content) return
  await copyContent(content)
}

const downloadMainContent = async () => {
  await loadCode()
  if (props.script.content) {
    downloadContent(props.script.content, `${props.script.id}.js`)
    return
  }

  if (props.script.files) {
    const bundle = Object.entries(props.script.files)
      .map(([fileType, content]) => `// ===== ${fileType.toUpperCase()} =====\n\n${content}`)
      .join('\n\n')
    downloadContent(bundle, `${props.script.id}-bundle.txt`)
  }
}

const downloadContent = (content, filename) => {
  try {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
    toast(`${filename} downloaded`, 'success')
  } catch (err) {
    toast('Failed to download script', 'error')
  }
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

