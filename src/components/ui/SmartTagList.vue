<template>
  <div :class="['flex flex-wrap', gapClass]">
    <SmartTag
      v-for="tag in displayTags"
      :key="tag"
      :tag="tag"
      :show-core="showCore"
      :show-icon="showIcons"
      :clickable="clickable"
      :bordered="bordered"
      @click="handleTagClick"
    />
    <span 
      v-if="hiddenCount > 0 && !expanded"
      class="inline-flex items-center px-2 py-0.5 rounded-md text-xs text-bd-text-muted cursor-pointer hover:text-bd-text-secondary"
      @click="expanded = true"
    >
      +{{ hiddenCount }} more
    </span>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SmartTag from './SmartTag.vue'
import { normalizeTagsToCore } from '@/data/tagSystem'

const props = defineProps({
  tags: {
    type: Array,
    default: () => []
  },
  maxVisible: {
    type: Number,
    default: 5
  },
  showCore: {
    type: Boolean,
    default: true
  },
  showIcons: {
    type: Boolean,
    default: false
  },
  clickable: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  },
  gap: {
    type: String,
    default: 'sm',
    validator: (v) => ['xs', 'sm', 'md'].includes(v)
  },
  deduplicate: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['tag-click'])

const expanded = ref(false)

const gapClass = computed(() => {
  const gaps = {
    xs: 'gap-1',
    sm: 'gap-1.5',
    md: 'gap-2'
  }
  return gaps[props.gap]
})

// Process tags - optionally deduplicate to core tags
const processedTags = computed(() => {
  if (!props.tags || !Array.isArray(props.tags)) return []
  
  if (props.deduplicate) {
    return normalizeTagsToCore(props.tags)
  }
  
  return props.tags
})

// Tags to display based on maxVisible and expanded state
const displayTags = computed(() => {
  if (expanded.value || processedTags.value.length <= props.maxVisible) {
    return processedTags.value
  }
  return processedTags.value.slice(0, props.maxVisible)
})

// Count of hidden tags
const hiddenCount = computed(() => {
  return Math.max(0, processedTags.value.length - props.maxVisible)
})

const handleTagClick = (tag) => {
  emit('tag-click', tag)
}
</script>
