/**
 * useMeta composable
 * Updates document <head> meta tags on route change for rich social embeds.
 * Works client-side for JS-executing crawlers and browsers.
 * Server-side injection is handled by the Netlify Edge Function for non-JS crawlers.
 */

const SITE_NAME = 'BetterRepository'
const SITE_URL = 'https://better-repository.netlify.app'
const DEFAULT_IMAGE = `${SITE_URL}/og.png`
const THEME_COLOR = '#0d0d0f'

/**
 * Sets or updates a <meta> tag in <head>.
 * @param {string} attr - The attribute name to match ('name' or 'property')
 * @param {string} key - The attribute value to match (e.g. 'og:title')
 * @param {string} content - The content value to set
 */
function setMetaTag(attr, key, content) {
  let el = document.querySelector(`meta[${attr}="${key}"]`)
  if (el) {
    el.setAttribute('content', content)
  } else {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    el.setAttribute('content', content)
    document.head.appendChild(el)
  }
}

/**
 * Updates all meta tags based on route meta information.
 * Called from the router beforeEach guard.
 * @param {object} meta - The route's meta object
 */
export function updateMeta(meta) {
  const title = meta.title || SITE_NAME
  const description = meta.description || 'BetterRepository V1.7: curated AI Dungeon resources, Story Card command presets, and BetterDungeon V2 Ultrascripts guides.'
  const ogTitle = meta.ogTitle || title
  const ogDescription = meta.ogDescription || description
  const ogImage = meta.ogImage || DEFAULT_IMAGE
  const path = meta.path || '/'
  const ogUrl = `${SITE_URL}${path}`

  // Document title
  document.title = title

  // Standard meta
  setMetaTag('name', 'description', description)

  // Open Graph
  setMetaTag('property', 'og:title', ogTitle)
  setMetaTag('property', 'og:description', ogDescription)
  setMetaTag('property', 'og:image', ogImage)
  setMetaTag('property', 'og:url', ogUrl)
  setMetaTag('property', 'og:site_name', SITE_NAME)
  setMetaTag('property', 'og:type', 'website')

  // Twitter Card
  setMetaTag('name', 'twitter:card', 'summary_large_image')
  setMetaTag('name', 'twitter:title', ogTitle)
  setMetaTag('name', 'twitter:description', ogDescription)
  setMetaTag('name', 'twitter:image', ogImage)

  // Theme color
  setMetaTag('name', 'theme-color', meta.themeColor || THEME_COLOR)
}
