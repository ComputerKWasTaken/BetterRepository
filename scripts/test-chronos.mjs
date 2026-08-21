import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

const librarySource = await readFile(
  new URL('../src/data/raw-scripts/library/chronos.js', import.meta.url),
  'utf8'
)
const inputSource = await readFile(
  new URL('../src/data/raw-scripts/input/chronos.js', import.meta.url),
  'utf8'
)
const contextSource = await readFile(
  new URL('../src/data/raw-scripts/context/chronos.js', import.meta.url),
  'utf8'
)

function createAdventure(actionCount = 10, cards = []) {
  const adventure = {
    state: {},
    storyCards: cards,
    info: { actionCount, maxChars: 12000, memoryLength: 0 },
    logs: []
  }

  adventure.addStoryCard = (keys, entry, type = '') => {
    adventure.storyCards.push({ id: adventure.storyCards.length + 1, keys, entry, type })
    return adventure.storyCards.length - 1
  }
  adventure.updateStoryCard = (index, keys, entry, type = '') => {
    if (!adventure.storyCards[index]) throw new Error(`Missing Story Card ${index}`)
    adventure.storyCards[index] = {
      ...adventure.storyCards[index],
      keys,
      entry,
      type
    }
  }
  return adventure
}

function runHook(adventure, source, text) {
  const sandbox = {
    state: adventure.state,
    storyCards: adventure.storyCards,
    info: adventure.info,
    history: [],
    text,
    addStoryCard: adventure.addStoryCard,
    updateStoryCard: adventure.updateStoryCard,
    removeStoryCard: () => {},
    log: (...args) => adventure.logs.push(args.join(' ')),
    console: { log: (...args) => adventure.logs.push(args.join(' ')) }
  }
  const context = vm.createContext(sandbox)
  vm.runInContext(librarySource, context, { filename: 'chronos-library.js' })
  return vm.runInContext(source, context, { filename: 'chronos-hook.js' })
}

function findCard(adventure, keys) {
  return adventure.storyCards.find(card => card.keys === keys || card.title === keys)
}

function heartbeatCard(beat, modules = []) {
  return {
    id: 100,
    keys: 'ultrascripts:heartbeat',
    type: 'Ultrascripts',
    entry: JSON.stringify({
      ultrascripts: {
        protocol: 1,
        enabled: true,
        client: 'BetterDungeon',
        beat
      },
      modules
    })
  }
}

assert.match(contextSource, /^\/\/ @cache-compatible\r?\n/)

{
  const adventure = createAdventure()
  runHook(adventure, inputSource, 'I enter the city.')
  const original = 'Stable optimized prompt prefix.'
  const result = runHook(adventure, contextSource, original)

  assert.ok(result.text.startsWith(original), 'Context must retain the entire original prefix')
  assert.match(result.text, /Chronos: The current in-game time is 8:00 AM on Wednesday, January 1, 1000/)
  assert.equal(adventure.state.chronos.clock.hour, 8)
  assert.equal(adventure.state.chronos.clock.minute, 0)
  assert.match(adventure.state.message, /Chronos · 8:00 AM/)
  assert.ok(findCard(adventure, 'Chronos Settings'), 'Chronos should create its compact settings card')

  adventure.info.actionCount = 11
  const next = runHook(adventure, contextSource, original)
  assert.match(next.text, /8:02 AM/)

  const retry = runHook(adventure, contextSource, original)
  assert.match(retry.text, /8:02 AM/)
  assert.equal(adventure.state.chronos.clock.minute, 2, 'Retry must not advance the clock twice')

  adventure.info.actionCount = 10
  const undo = runHook(adventure, contextSource, original)
  assert.match(undo.text, /8:00 AM/)
  assert.equal(adventure.state.chronos.clock.minute, 0, 'Undo must reverse action-based time')
}

{
  const adventure = createAdventure(20)
  runHook(adventure, inputSource, 'Wait.')
  adventure.state.chronos.clock = { year: 2024, month: 2, day: 28, hour: 23, minute: 59 }
  adventure.state.chronos.lastActionCount = 20
  adventure.info.actionCount = 21
  const result = runHook(adventure, contextSource, 'Prefix')

  assert.match(result.text, /12:01 AM on Thursday, February 29, 2024/)

  adventure.info.actionCount = 20
  runHook(adventure, contextSource, 'Prefix')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 2024, month: 2, day: 28, hour: 23, minute: 59 }
  )
}

{
  const cards = [heartbeatCard(1, [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }])]
  const adventure = createAdventure(30, cards)
  runHook(adventure, inputSource, 'Look around.')
  runHook(adventure, contextSource, 'Prefix')

  assert.equal(adventure.state.message, undefined, 'Widget display should suppress the toast fallback')
  const widgetCard = findCard(adventure, 'ultrascripts:state:widget')
  assert.ok(widgetCard, 'Widget-capable adventures should receive Widget state')
  const payload = JSON.parse(widgetCard.entry)
  assert.deepEqual(
    payload.manifest.widgets.map(widget => widget.id),
    ['chronos-time', 'chronos-date']
  )
  assert.equal(payload.history['30']['chronos-time'], '8:00 AM')
  assert.equal(payload.history['30']['chronos-date'], 'Wednesday, January 1, 1000')

  runHook(adventure, inputSource, 'Retry without a new heartbeat.')
  runHook(adventure, contextSource, 'Prefix')
  assert.match(adventure.state.message, /Chronos ·/, 'A stale heartbeat should restore toast fallback')

  findCard(adventure, 'ultrascripts:heartbeat').entry = heartbeatCard(
    2,
    [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]
  ).entry
  const settingsCard = findCard(adventure, 'Chronos Settings')
  settingsCard.entry = settingsCard.entry
    .replace('New Time:', 'New Time: 9:15 AM')
    .replace('Apply Changes: Off', 'Apply Changes: On')
  adventure.info.actionCount = 31
  runHook(adventure, inputSource, 'Apply the setting.')
  runHook(adventure, contextSource, 'Prefix')
  assert.match(
    adventure.state.message,
    /clock updated/,
    'Widget mode should retain one-shot settings confirmations'
  )
}

{
  const sharedWidget = {
    id: 101,
    keys: 'ultrascripts:state:widget',
    type: 'Ultrascripts',
    entry: JSON.stringify({
      v: 1,
      manifest: { widgets: [{ id: 'hp', type: 'bar', label: 'Health', max: 100 }] },
      history: { '39': { hp: 75 } }
    })
  }
  const adventure = createAdventure(40, [
    heartbeatCard(4, [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]),
    sharedWidget
  ])
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  const payload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  assert.deepEqual(payload.manifest.widgets.map(widget => widget.id), ['hp', 'chronos-time', 'chronos-date'])
  assert.equal(payload.history['40'].hp, 75, 'Chronos must carry forward another script\'s Widget value')
}

{
  const settings = {
    id: 200,
    keys: 'Chronos Settings',
    type: 'Chronos',
    entry: [
      '# Chronos Settings',
      'Enabled: On',
      'Paused: Off',
      'Minutes Per Turn: 15',
      'Clock Format: 24-hour',
      'New Time: 23:50',
      'New Date: 2028-02-29',
      'Apply Changes: On'
    ].join('\n')
  }
  const adventure = createAdventure(50, [settings])
  runHook(adventure, inputSource, 'Continue.')
  const result = runHook(adventure, contextSource, 'Prefix')

  assert.match(result.text, /23:50 on Tuesday, February 29, 2028/)
  assert.match(adventure.state.message, /clock updated/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Apply Changes: Off/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /New Time:\r?\n/)
}

console.log('Chronos V2 tests passed')
