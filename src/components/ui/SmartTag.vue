<template>
  <span 
    :class="[
      'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium transition-colors',
      colorClasses.bg,
      colorClasses.text,
      clickable ? 'cursor-pointer hover:opacity-80' : '',
      bordered ? colorClasses.border + ' border' : ''
    ]"
    :title="tooltip"
    @click="handleClick"
  >
    <component v-if="showIcon && icon" :is="icon" class="w-3 h-3" />
    <span>{{ displayTag }}</span>
    <span v-if="showCount && count" class="opacity-70">({{ count }})</span>
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { 
  Tag, Zap, PenTool, Clock, MessageSquare, Palette, Users, Heart,
  Link, Brain, AlertTriangle, Shield, Sparkles, Globe, BookOpen,
  Skull, Crosshair, Eye, Settings, Calendar, Package, Lightbulb,
  Swords, Search
} from 'lucide-vue-next'
import { getCoreTag, getTagConfig, getTagClasses, TAG_SYSTEM } from '@/data/tagSystem'

const props = defineProps({
  tag: {
    type: String,
    required: true
  },
  showCore: {
    type: Boolean,
    default: true
  },
  showIcon: {
    type: Boolean,
    default: false
  },
  showCount: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: null
  },
  clickable: {
    type: Boolean,
    default: false
  },
  bordered: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

// Map core tags to icons
const TAG_ICONS = {
  'essential': Zap,
  'anti-repetition': AlertTriangle,
  'style': PenTool,
  'pacing': Clock,
  'dialogue': MessageSquare,
  'tone': Palette,
  'description': Eye,
  'personality': Users,
  'npc-behavior': Users,
  'emotions': Heart,
  'relationships': Heart,
  'consistency': Link,
  'knowledge': Brain,
  'consequences': AlertTriangle,
  'difficulty': Shield,
  'immersion': Sparkles,
  'fantasy': Sparkles,
  'scifi': Globe,
  'horror': Skull,
  'romance': Heart,
  'thriller': Crosshair,
  'role': BookOpen,
  'pov': Eye,
  'control': Settings,
  'formatting': Settings,
  'setting': Globe,
  'modern': Calendar,
  'historical': Calendar,
  'complete': Package,
  'thinking-mode': Lightbulb,
  'combat': Swords,
  'mystery': Search
}

// Get the core tag for this tag
const coreTag = computed(() => getCoreTag(props.tag))

// Get tag configuration
const tagConfig = computed(() => getTagConfig(props.tag))

// Display tag (core or original)
const displayTag = computed(() => {
  if (props.showCore && tagConfig.value) {
    return coreTag.value
  }
  return props.tag
})

// Get color classes
const colorClasses = computed(() => getTagClasses(props.tag))

// Get icon for this tag
const icon = computed(() => {
  return TAG_ICONS[coreTag.value] || Tag
})

// Tooltip showing aliases
const tooltip = computed(() => {
  if (!tagConfig.value) return props.tag
  
  const config = tagConfig.value
  const aliases = config.aliases.slice(0, 3).join(', ')
  return `${config.description}\nAliases: ${aliases}...`
})

const handleClick = () => {
  if (props.clickable) {
    emit('click', coreTag.value)
  }
}
</script>
