/**
 * Netlify Edge Function: inject-meta
 *
 * Intercepts HTML responses and replaces page-specific Open Graph and Twitter Card
 * meta tags based on the request URL path. This ensures that social media crawlers
 * (Discord, Slack, Twitter, Facebook) which don't execute JavaScript still receive
 * the correct embed information for each page.
 *
 * Each tag is replaced individually so that unrelated tags (theme-color, author,
 * keywords) are never touched and no duplicate tags are created.
 */

const SITE_URL = 'https://better-repository.netlify.app'

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
    description: 'Browse over 200+ AI instruction components and sets. Customize AI writing style, pacing, and tone for your AI Dungeon adventures.',
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

/**
 * Replace the content attribute of a specific meta tag matched by attribute + key.
 * For example, replaceMetaContent(html, 'property', 'og:title', 'New Title')
 * replaces <meta property="og:title" content="..."> with the new content value.
 */
function replaceMetaContent(html, attr, key, newContent) {
  const pattern = new RegExp(
    `(<meta\\s+${attr}="${key}"\\s+content=")([^"]*)(")`,
    'i'
  )
  return html.replace(pattern, `$1${escapeAttr(newContent)}$3`)
}

/**
 * Replace <title>...</title> content.
 */
function replaceTitle(html, newTitle) {
  return html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(newTitle)}</title>`)
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

  let html = await response.text()

  // Replace <title>
  html = replaceTitle(html, meta.title)

  // Replace standard meta description
  html = replaceMetaContent(html, 'name', 'description', meta.description)

  // Replace Open Graph tags (individually to preserve all other tags)
  html = replaceMetaContent(html, 'property', 'og:title', meta.title)
  html = replaceMetaContent(html, 'property', 'og:description', meta.description)
  html = replaceMetaContent(html, 'property', 'og:url', ogUrl)

  // Replace Twitter Card tags
  html = replaceMetaContent(html, 'name', 'twitter:title', meta.title)
  html = replaceMetaContent(html, 'name', 'twitter:description', meta.description)

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  })
}

/**
 * Escape a string for safe insertion into an HTML attribute value.
 */
function escapeAttr(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * Escape a string for safe insertion into HTML text content.
 */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const config = {
  path: '/*',
}
