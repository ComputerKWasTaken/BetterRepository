import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import HomePage from '@/pages/HomePage.vue'
import AIInstructionsPage from '@/pages/AIInstructionsPage.vue'
import PlotComponentsPage from '@/pages/PlotComponentsPage.vue'
import StoryCardsPage from '@/pages/StoryCardsPage.vue'
import ScriptsPage from '@/pages/ScriptsPage.vue'
import ContributePage from '@/pages/ContributePage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: { title: 'BetterRepository' }
  },
  {
    path: '/ai-instructions',
    name: 'AIInstructions',
    component: AIInstructionsPage,
    meta: { title: 'AI Instructions - BetterRepository' }
  },
  {
    path: '/plot-components',
    name: 'PlotComponents',
    component: PlotComponentsPage,
    meta: { title: 'Plot Components - BetterRepository' }
  },
  {
    path: '/story-cards',
    name: 'StoryCards',
    component: StoryCardsPage,
    meta: { title: 'Story Cards - BetterRepository' }
  },
  {
    path: '/scripts',
    name: 'Scripts',
    component: ScriptsPage,
    meta: { title: 'Scripts - BetterRepository' }
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: ContributePage,
    meta: { title: 'Contribute - BetterRepository' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Update document title on route change
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'BetterRepository'
  next()
})

export default router
