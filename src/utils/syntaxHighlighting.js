import Prism from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-bash'

const HIGHLIGHT_ATTR = 'data-syntax-highlighted-source'
const LANGUAGE_ATTR = 'data-syntax-language'
const CODE_SELECTOR = 'pre'

function normalizeSource(source) {
  return String(source || '').replace(/\r\n/g, '\n')
}

function looksLikeJson(source) {
  const text = source.trim()
  if (!text) return false
  if (!(text.startsWith('{') || text.startsWith('['))) return false
  try {
    JSON.parse(text)
    return true
  } catch {
    return false
  }
}

function looksLikeGraphql(source) {
  const text = source.trim()
  return /^(query|mutation|subscription|fragment)\b/.test(text)
    || /^(type|interface|union|scalar|enum|input)\b/m.test(text)
}

function looksLikeMarkup(source) {
  const text = source.trim()
  return /^<!doctype html>/i.test(text)
    || /^<\/?[a-z][\w:-]*(\s|>)/i.test(text)
    || /<\/[a-z][\w:-]*>/i.test(text)
}

function looksLikeCss(source) {
  return /[.#][\w-]+\s*\{/.test(source)
    || /@media\b/.test(source)
    || /@keyframes\b/.test(source)
}

function looksLikeBash(source) {
  const text = source.trim()
  if (!text) return false
  return /^npm(\.cmd)?\s/m.test(text)
    || /^git\s/m.test(text)
    || /^rg\s/m.test(text)
    || /^pnpm\s/m.test(text)
    || /^yarn\s/m.test(text)
    || /^#\!\/bin\/(ba)?sh/.test(text)
    || /^\/scripture\b/m.test(text)
}

function looksLikeJavascript(source) {
  return /\b(function|const|let|var|return|await|async|try|catch|new)\b/.test(source)
    || /\b(state|storyCards|text|info|addStoryCard|bd\.us)\b/.test(source)
    || /=>/.test(source)
    || /^\/\//m.test(source)
}

function detectLanguage(source) {
  if (looksLikeJson(source)) return 'json'
  if (looksLikeGraphql(source)) return 'graphql'
  if (looksLikeMarkup(source)) return 'markup'
  if (looksLikeCss(source)) return 'css'
  if (looksLikeBash(source)) return 'bash'
  if (looksLikeJavascript(source)) return 'javascript'
  return 'plain'
}

function highlightPre(pre) {
  if (!(pre instanceof HTMLElement)) return

  const rawSource = normalizeSource(pre.textContent)
  if (!rawSource.trim()) return

  if (pre.getAttribute(HIGHLIGHT_ATTR) === rawSource) return

  const language = detectLanguage(rawSource)
  pre.setAttribute(HIGHLIGHT_ATTR, rawSource)
  pre.setAttribute(LANGUAGE_ATTR, language)
  pre.classList.add('syntax-highlighted')

  if (language === 'plain') {
    pre.textContent = rawSource
    return
  }

  const grammar = Prism.languages[language]
  if (!grammar) {
    pre.textContent = rawSource
    return
  }

  const highlighted = Prism.highlight(rawSource, grammar, language)
  pre.innerHTML = `<code class="language-${language}">${highlighted}</code>`
}

export function highlightAllCodeBlocks(root = document) {
  if (!root?.querySelectorAll) return
  root.querySelectorAll(CODE_SELECTOR).forEach(highlightPre)
}

export function startSyntaxHighlighting() {
  let scheduled = false

  const scheduleHighlight = () => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      highlightAllCodeBlocks(document)
    })
  }

  scheduleHighlight()

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        scheduleHighlight()
        break
      }
    }
  })

  observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  })

  return {
    refresh: scheduleHighlight,
    stop: () => observer.disconnect(),
  }
}
