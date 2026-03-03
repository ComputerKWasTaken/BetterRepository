/**
 * Netlify Edge Function: inject-meta
 *
 * Intercepts HTML responses and injects page-specific Open Graph and Twitter Card
 * meta tags based on the request URL path. This ensures that social media crawlers
 * (Discord, Slack, Twitter, Facebook) which don't execute JavaScript still receive
 * the correct embed information for each page.
 */

const SITE_NAME = 'BetterRepository'
const SITE_URL = 'https://better-repository.netlify.app'
const DEFAULT_IMAGE = `${SITE_URL}/betterrepository_logo.png`

/**
 * Page-specific metadata keyed by URL path.
 * Each entry defines the OG/Twitter embed content for that route.
 */
const PAGE_META = {
  '/': {
    title: 'BetterRepository',
    description: 'The ultimate AI Dungeon resource hub. Browse curated AI Instructions, Plot Components, Story Cards, Scripts, and Guides to craft better adventures.',
  },
  '/ai-instructions': {
    title: 'AI Instructions - BetterRepository',
    description: 'Browse 213+ AI instruction components and 6 playstyle sets. Customize AI writing style, pacing, and tone for your AI Dungeon adventures.',
  },
  '/plot-components': {
    title: 'Plot Components - BetterRepository',
    description: 'Master the backbone of your AI Dungeon stories. Guides and templates for Plot Essentials, Author\'s Notes, Story Summary, and more.',
  },
  '/story-cards': {
    title: 'Story Cards - BetterRepository',
    description: 'Ready-to-use Story Card templates and a complete guide to writing effective cards for characters, locations, factions, and more in AI Dungeon.',
  },
  '/scripts': {
    title: 'Scripts - BetterRepository',
    description: 'Custom JavaScript scripts for AI Dungeon. Game mechanics, utilities, automation, and a complete scripting guide with lifecycle hooks and examples.',
  },
  '/guides': {
    title: 'Guides - BetterRepository',
    description: 'Everything you need to master AI Dungeon. In-depth guides on AI Instructions, Plot Components, Story Cards, Scripting, and Advanced Settings.',
  },
  '/contribute': {
    title: 'Contribute to BetterRepository',
    description: 'Share your AI Dungeon knowledge with the community. Submit guides, templates, scripts, or report improvements. Every contribution makes a difference.',
  },
  '/ecosystem': {
    title: 'The "Better" Ecosystem',
    description: 'Open-source tools for AI Dungeon. BetterRepository for curated content, BetterDungeon browser extension for QOL features, and more.',
  },
  '/credits': {
    title: 'Credits & Acknowledgments - BetterRepository',
    description: 'Recognizing the community members whose guides, resources, and knowledge made BetterRepository possible.',
  },
}

export default async (request, context) => {
  const response = await context.next()

  // Only process HTML responses (skip assets, API calls, etc.)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('text/html')) {
    return response
  }

  const url = new URL(request.url)
  const path = url.pathname

  // Look up meta for this path, fall back to homepage defaults
  const meta = PAGE_META[path] || PAGE_META['/']
  const ogUrl = `${SITE_URL}${path}`

  const html = await response.text()

  // Build the replacement meta tags
  const metaTags = `
    <meta name="description" content="${escapeAttr(meta.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />
    <meta property="og:title" content="${escapeAttr(meta.title)}" />
    <meta property="og:description" content="${escapeAttr(meta.description)}" />
    <meta property="og:image" content="${escapeAttr(DEFAULT_IMAGE)}" />
    <meta property="og:url" content="${escapeAttr(ogUrl)}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeAttr(meta.title)}" />
    <meta name="twitter:description" content="${escapeAttr(meta.description)}" />
    <meta name="twitter:image" content="${escapeAttr(DEFAULT_IMAGE)}" />`

  // Replace the existing static meta block with page-specific tags.
  // We replace from the "Meta Tags" comment through the closing OG image tag.
  const updatedHtml = html.replace(
    /<!-- Meta Tags -->[\s\S]*?<meta property="og:image"[^>]*>/,
    `<!-- Meta Tags -->${metaTags}`
  )

  return new Response(updatedHtml, {
    status: response.status,
    headers: response.headers,
  })
}

/**
 * Escape a string for safe insertion into an HTML attribute.
 */
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const config = {
  path: '/*',
}
