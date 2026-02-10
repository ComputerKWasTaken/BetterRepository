import { createRouter, createWebHistory } from 'vue-router'

// Import page components
import HomePage from '@/pages/HomePage.vue'
import AIInstructionsPage from '@/pages/AIInstructionsPage.vue'
import PlotComponentsPage from '@/pages/PlotComponentsPage.vue'
import StoryCardsPage from '@/pages/StoryCardsPage.vue'
import ScriptsPage from '@/pages/ScriptsPage.vue'
import ContributePage from '@/pages/ContributePage.vue'
import EcosystemPage from '@/pages/EcosystemPage.vue'
import CreditsPage from '@/pages/CreditsPage.vue'
import GuidesPage from '@/pages/GuidesPage.vue'
import NotFoundPage from '@/pages/NotFoundPage.vue'

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
    path: '/guides',
    name: 'Guides',
    component: GuidesPage,
    meta: { title: 'Guides - BetterRepository' }
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: ContributePage,
    meta: { title: 'Contribute - BetterRepository' }
  },
  {
    path: '/ecosystem',
    name: 'Ecosystem',
    component: EcosystemPage,
    meta: { title: 'Ecosystem - BetterRepository' }
  },
  {
    path: '/credits',
    name: 'Credits',
    component: CreditsPage,
    meta: { title: 'Credits - BetterRepository' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: '404 - BetterRepository' }
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
