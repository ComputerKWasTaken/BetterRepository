<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center">
          <span class="text-lg">🔖</span>
        </div>
        Plot Components
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Author's Notes, Plot Essentials, and Story Summaries to enhance your adventures.
      </p>
    </header>

    <!-- Placement Guide -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <span>ℹ️</span>
        Understanding Plot Component Placements
      </h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div 
          v-for="placement in placements" 
          :key="placement.id"
          class="p-4 rounded-xl bg-bd-bg-primary border border-white/[0.06]"
        >
          <div class="flex items-center gap-3 mb-2">
            <span class="text-bd-accent-primary">{{ getPlacementIconChar(placement.icon) }}</span>
            <h3 class="font-semibold text-bd-text-primary">{{ placement.name }}</h3>
            <span class="tag text-[10px]" :class="getStrengthClass(placement.strength)">
              {{ placement.strength }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-2">{{ placement.description }}</p>
          <div class="text-xs text-bd-text-muted flex items-center gap-1">
            <span class="text-[10px]">📍</span>
            {{ placement.position }}
          </div>
        </div>
      </div>
    </section>

    <!-- Components Grid -->
    <section>
      <div class="section-header mb-4">
        <span>📄</span>
        <span>Available Components</span>
      </div>

      <div class="grid gap-4">
        <!-- Author's Note Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
              <span>🪶</span>
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Author's Note Templates</h3>
              <p class="text-xs text-bd-text-muted">Short guidance for style, tone, and genre</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <ResourceCard 
              v-for="component in authorsNoteComponents" 
              :key="component.id"
              :resource="component"
            />
          </div>
        </div>

        <!-- Plot Essentials Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
              <span>📗</span>
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Plot Essentials Templates</h3>
              <p class="text-xs text-bd-text-muted">Character info, relationships, and ongoing plot points</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <ResourceCard 
              v-for="component in plotEssentialsComponents" 
              :key="component.id"
              :resource="component"
            />
          </div>
        </div>

        <!-- Story Summary Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-cyan/20 flex items-center justify-center">
              <span>📜</span>
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Story Summary Templates</h3>
              <p class="text-xs text-bd-text-muted">Track your story's overall direction</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <ResourceCard 
              v-for="component in storySummaryComponents" 
              :key="component.id"
              :resource="component"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Tips Section -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <span>💡</span>
        Pro Tips
      </h2>
      <ul class="space-y-3 text-sm text-bd-text-secondary">
        <li class="flex items-start gap-2">
          <span class="text-bd-success mt-0.5 flex-shrink-0">✓</span>
          <span><strong class="text-bd-text-primary">Author's Note</strong> has the strongest influence since it appears near the end of context. Keep it concise!</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-bd-success mt-0.5 flex-shrink-0">✓</span>
          <span><strong class="text-bd-text-primary">Plot Essentials</strong> is great for character sheets and relationship tracking.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-bd-success mt-0.5 flex-shrink-0">✓</span>
          <span><strong class="text-bd-text-primary">Story Summary</strong> works well with Auto Summarization to keep the AI on track.</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-bd-success mt-0.5 flex-shrink-0">✓</span>
          <span>Don't overload any single component—spread information across appropriate locations.</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { INSTRUCTIONS, PLACEMENTS } from '@/data/repository'

const placements = PLACEMENTS

// Icon character mapping for placements
const placementIconCharMap = {
  'ScrollText': '📜',
  'Feather': '🪶',
  'Bookmark': '🔖',
  'FileText': '📄'
}

const getPlacementIconChar = (iconName) => {
  return placementIconCharMap[iconName] || '📄'
}

const getStrengthClass = (strength) => {
  if (strength === 'Strongest') return 'bg-bd-success/20 text-bd-success'
  if (strength === 'Moderate') return 'bg-bd-info/20 text-bd-info'
  return 'bg-white/10 text-bd-text-muted'
}

// Filter instructions that are templates with specific placements
const authorsNoteComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'authors-note' || i.tags.includes('authors-note'))
)

const plotEssentialsComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'plot-essentials' || i.tags.includes('plot-essentials'))
)

const storySummaryComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'story-summary' || i.tags.includes('story-summary'))
)
</script>
