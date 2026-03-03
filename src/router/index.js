import { createRouter, createWebHistory } from 'vue-router'
import { updateMeta } from '@/composables/useMeta'

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
    meta: {
      title: 'BetterRepository - AI Dungeon Resource Hub',
      description: 'A curated collection of AI Instructions, Plot Components, Story Cards, Scripts, and Guides. Everything you need to craft better AI Dungeon adventures.',
      ogTitle: 'BetterRepository',
      ogDescription: 'The ultimate AI Dungeon resource hub. Browse curated AI Instructions, Plot Components, Story Cards, Scripts, and Guides to craft better adventures.',
      path: '/'
    }
  },
  {
    path: '/ai-instructions',
    name: 'AIInstructions',
    component: AIInstructionsPage,
    meta: {
      title: 'AI Instructions - BetterRepository',
      description: 'Master AI behavior with curated instruction sets and individual components. Pre-built playstyle sets, length variants, and a directive builder for AI Dungeon.',
      ogTitle: 'AI Instructions - BetterRepository',
      ogDescription: 'Browse over 200+ AI instruction components and sets. Customize AI writing style, pacing, and tone for your AI Dungeon adventures.',
      path: '/ai-instructions'
    }
  },
  {
    path: '/plot-components',
    name: 'PlotComponents',
    component: PlotComponentsPage,
    meta: {
      title: 'Plot Components - BetterRepository',
      description: 'Learn to use Plot Essentials, Author\'s Notes, Story Summary, and other plot components to maintain story coherence in AI Dungeon.',
      ogTitle: 'Plot Components - BetterRepository',
      ogDescription: 'Master the backbone of your AI Dungeon stories. Guides and templates for Plot Essentials, Author\'s Notes, Story Summary, and more.',
      path: '/plot-components'
    }
  },
  {
    path: '/story-cards',
    name: 'StoryCards',
    component: StoryCardsPage,
    meta: {
      title: 'Story Cards - BetterRepository',
      description: 'Reusable Story Card templates for characters, locations, factions, and items. Learn to write effective Story Cards for AI Dungeon worldbuilding.',
      ogTitle: 'Story Cards - BetterRepository',
      ogDescription: 'Ready-to-use Story Card templates and a complete guide to writing effective cards for characters, locations, factions, and more in AI Dungeon.',
      path: '/story-cards'
    }
  },
  {
    path: '/scripts',
    name: 'Scripts',
    component: ScriptsPage,
    meta: {
      title: 'Scripts - BetterRepository',
      description: 'Extend AI Dungeon with custom JavaScript scripts. Browse ready-to-use scripts and learn the Scripting API with input, context, and output modifiers.',
      ogTitle: 'Scripts - BetterRepository',
      ogDescription: 'Custom JavaScript scripts for AI Dungeon. Game mechanics, utilities, automation, and a complete scripting guide with lifecycle hooks and examples.',
      path: '/scripts'
    }
  },
  {
    path: '/guides',
    name: 'Guides',
    component: GuidesPage,
    meta: {
      title: 'Guides - BetterRepository',
      description: 'Comprehensive guides for AI Dungeon covering AI Instructions, Plot Components, Story Cards, Scripts, BetterScripts, and Advanced Settings.',
      ogTitle: 'Guides - BetterRepository',
      ogDescription: 'Everything you need to master AI Dungeon. In-depth guides on AI Instructions, Plot Components, Story Cards, Scripting, and Advanced Settings.',
      path: '/guides'
    }
  },
  {
    path: '/contribute',
    name: 'Contribute',
    component: ContributePage,
    meta: {
      title: 'Contribute - BetterRepository',
      description: 'Help build BetterRepository by submitting AI Instructions, Plot Components, Story Cards, or Scripts. No account needed.',
      ogTitle: 'Contribute to BetterRepository',
      ogDescription: 'Share your AI Dungeon knowledge with the community. Submit guides, templates, scripts, or report improvements. Every contribution makes a difference.',
      path: '/contribute'
    }
  },
  {
    path: '/ecosystem',
    name: 'Ecosystem',
    component: EcosystemPage,
    meta: {
      title: 'The "Better" Ecosystem - BetterRepository',
      description: 'A suite of open-source tools designed to enhance AI Dungeon. Discover BetterRepository, BetterDungeon, and more community-built projects.',
      ogTitle: 'The "Better" Ecosystem',
      ogDescription: 'Open-source tools for AI Dungeon. BetterRepository for curated content, BetterDungeon browser extension for QOL features, and more.',
      path: '/ecosystem'
    }
  },
  {
    path: '/credits',
    name: 'Credits',
    component: CreditsPage,
    meta: {
      title: 'Credits & Acknowledgments - BetterRepository',
      description: 'Thank you to everyone who contributed guides, resources, and knowledge to BetterRepository and the AI Dungeon community.',
      ogTitle: 'Credits & Acknowledgments - BetterRepository',
      ogDescription: 'Recognizing the community members whose guides, resources, and knowledge made BetterRepository possible.',
      path: '/credits'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: 'Page Not Found - BetterRepository',
      description: 'The page you\'re looking for doesn\'t exist. Browse BetterRepository for AI Dungeon resources.',
      ogTitle: 'Page Not Found - BetterRepository',
      ogDescription: 'This page doesn\'t exist. Head back to BetterRepository to browse AI Instructions, Plot Components, Story Cards, and Scripts for AI Dungeon.',
      path: '/404'
    }
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

// Update document title and meta tags on route change
router.beforeEach((to, from, next) => {
  updateMeta({ ...to.meta, path: to.path })
  next()
})

export default router
