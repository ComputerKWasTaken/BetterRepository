import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../src/data/raw-scripts/library/stateboy.js', import.meta.url),
  'utf8'
)
const sandbox = {
  state: {},
  info: { actionCount: 42 },
  history: [
    { type: 'do', text: 'You enter the observatory.' },
    { type: 'story', text: 'The brass orrery begins to turn.' }
  ]
}
sandbox.globalThis = sandbox
vm.createContext(sandbox)
vm.runInContext(source, sandbox, { filename: 'stateboy.js' })

const internals = sandbox.StateboyInternals
const sheet = internals.parseSheet('## Location\nPlace: Observatory\nDanger: 2')

const contextSheet = internals.renderContextSheet(sheet)
assert.ok(contextSheet.startsWith('[\n'))
assert.ok(contextSheet.endsWith('\n]'))
assert.match(contextSheet, /This is the world's current state sheet\./)
assert.match(contextSheet, /continue the story in your response/)
assert.match(contextSheet, /## Location\nPlace: Observatory/)

const changeLog = Array.from({ length: 25 }, (_, index) => ({
  liveCount: index + 1,
  source: 'ai',
  operation: 'set',
  category: 'Location',
  name: 'Danger',
  type: 'number',
  oldValue: index,
  value: index + 1,
  confidence: 0.9,
  reason: `Change ${index + 1}`
}))
const prompt = internals.buildAiPrompt({
  settings: { changelogEnabled: true },
  changeLog
}, sheet, 'The mechanism locks into place.')

assert.match(prompt, /Current turn: 42\./)
assert.match(prompt, /Turn 25 \|/)
assert.match(prompt, /Turn 6 \|/)
assert.doesNotMatch(prompt, /Turn 5 \|/)
assert.match(prompt, /Most recent model output:\nThe mechanism locks into place\./)

const legacySettings = [
  '# Stateboy Settings',
  '',
  'AI Enabled: Off',
  '',
  'AI Changelog Entries: 3',
  '# How many recent changes the AI updater sees.',
  '',
  'Notes Changelog Entries: 7',
  '# How many recent changes are mirrored into the Stateboy card Notes.',
  '',
  'Debug Mode: On'
].join('\n')
const migratedSettings = internals.removeLegacyChangelogCountSettings(legacySettings)
assert.doesNotMatch(migratedSettings, /Changelog Entries/i)
assert.doesNotMatch(migratedSettings, /How many recent changes/i)
assert.match(migratedSettings, /AI Enabled: Off/)
assert.match(migratedSettings, /Debug Mode: On/)

const parsedSettings = internals.parseSettings(legacySettings).settings
assert.equal(parsedSettings.aiEnabled, false)
assert.equal(parsedSettings.debugMode, true)
assert.equal('aiChangelogEntries' in parsedSettings, false)
assert.equal('notesChangelogEntries' in parsedSettings, false)

sandbox.state = {}
sandbox.storyCards = [{ keys: 'Stateboy Settings', entry: legacySettings, type: 'Stateboy' }]
sandbox.addStoryCard = (keys, entry, type) => {
  sandbox.storyCards.push({ keys, entry, type })
}
sandbox.updateStoryCard = (index, keys, entry, type) => {
  sandbox.storyCards[index] = { keys, entry, type }
}
sandbox.Stateboy('context', 'Story prompt')
const migratedCard = sandbox.storyCards.find((card) => card.keys === 'Stateboy Settings')
assert.doesNotMatch(migratedCard.entry, /Changelog Entries/i)
assert.match(migratedCard.entry, /AI Enabled: Off/)
assert.match(migratedCard.entry, /Debug Mode: On/)

console.log('Stateboy prompt and Context formatting checks passed.')
