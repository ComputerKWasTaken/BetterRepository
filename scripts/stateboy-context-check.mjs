import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../src/data/raw-scripts/context/stateboy.js', import.meta.url),
  'utf8'
)
const librarySource = readFileSync(
  new URL('../src/data/raw-scripts/library/stateboy.js', import.meta.url),
  'utf8'
)

assert.match(source, /^\/\/ @cache-compatible\r?\nconst modifier/)

const originalContext = 'Original cache-efficient prompt'
const appendedState = '\n\n## Stateboy\nHealth: 10/10'
const calls = []
const sandbox = {
  text: originalContext,
  Stateboy(hook, context) {
    calls.push({ hook, context })
    return { text: context + appendedState }
  }
}
const result = vm.runInNewContext(source, sandbox, { filename: 'context/stateboy.js' })

assert.deepEqual(calls, [{ hook: 'context', context: originalContext }])
assert.equal(result.text, originalContext + appendedState)
assert.ok(result.text.startsWith(originalContext))

const librarySandbox = { state: {}, info: { actionCount: 0 }, history: [] }
librarySandbox.globalThis = librarySandbox
vm.createContext(librarySandbox)
vm.runInContext(librarySource, librarySandbox, { filename: 'library/stateboy.js' })

const warningContext = librarySandbox.StateboyInternals.renderSetupContextWarning(
  originalContext,
  { level: 'required', message: 'Configure the AI module.' }
)
assert.ok(warningContext.startsWith(originalContext))
assert.equal(
  warningContext,
  `${originalContext}\n\n[Stateboy setup: Configure the AI module.]`
)

librarySandbox.storyCards = []
librarySandbox.addStoryCard = (keys, entry, type) => {
  librarySandbox.storyCards.push({ keys, entry, type })
}
librarySandbox.updateStoryCard = (index, keys, entry, type) => {
  librarySandbox.storyCards[index] = { keys, entry, type }
}
const missingSetupResult = librarySandbox.Stateboy('context', originalContext)
assert.ok(missingSetupResult.text.startsWith(originalContext))
assert.match(missingSetupResult.text, /\[Stateboy setup:/)
assert.match(missingSetupResult.text, /## Player Stats/)

console.log('Stateboy Optimized Context checks passed.')
