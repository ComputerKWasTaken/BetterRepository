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
    logs: [],
    randomValues: []
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
  const sandboxMath = Object.create(Math)
  sandboxMath.random = () => adventure.randomValues.length
    ? adventure.randomValues.shift()
    : 0.5
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
    console: { log: (...args) => adventure.logs.push(args.join(' ')) },
    Math: sandboxMath
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
  assert.match(result.text, /Chronos: The current in-game time is 8:00 AM on Monday, June 1, 2026/)
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
  runHook(adventure, contextSource, 'Prefix')

  adventure.info.actionCount = 21
  runHook(adventure, inputSource, '/time 23:59')
  runHook(adventure, contextSource, 'Prefix')

  adventure.info.actionCount = 22
  runHook(adventure, inputSource, '/date 2024-02-28')
  runHook(adventure, contextSource, 'Prefix')

  adventure.info.actionCount = 23
  const result = runHook(adventure, contextSource, 'Prefix')

  assert.match(result.text, /12:01 AM on Thursday, February 29, 2024/)

  adventure.info.actionCount = 22
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
    ['chronos-clock']
  )
  assert.equal(payload.manifest.widgets[0].type, 'custom')
  assert.equal(payload.manifest.widgets[0].align, 'center')
  assert.equal(payload.manifest.widgets[0].style.borderRadius, '999px')
  const clockWidget = payload.history['30']['chronos-clock']
  assert.equal(typeof clockWidget.html, 'string')
  assert.match(clockWidget.html, />8:00 AM</)
  assert.match(clockWidget.html, />Mon, Jun 1, 2026</)
  assert.doesNotMatch(clockWidget.html, /Time:|Date:|🕒|📅/)

  runHook(adventure, inputSource, 'Retry without a new heartbeat.')
  runHook(adventure, contextSource, 'Prefix')
  assert.match(adventure.state.message, /Chronos ·/, 'A stale heartbeat should restore toast fallback')

  findCard(adventure, 'ultrascripts:heartbeat').entry = heartbeatCard(
    2,
    [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]
  ).entry
  adventure.info.actionCount = 31
  runHook(adventure, inputSource, '/time 9:15 AM')
  runHook(adventure, contextSource, 'Prefix')
  assert.match(
    adventure.state.message,
    /set the time to 9:15 AM/,
    'Widget mode should retain one-shot command confirmations'
  )
  const updatedPayload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  assert.match(updatedPayload.history['31']['chronos-clock'].html, />9:15 AM</)
}

{
  const sharedWidget = {
    id: 101,
    keys: 'ultrascripts:state:widget',
    type: 'Ultrascripts',
    entry: JSON.stringify({
      v: 1,
      manifest: {
        widgets: [
          { id: 'hp', type: 'bar', label: 'Health', max: 100 },
          { id: 'chronos-time', type: 'text' },
          { id: 'chronos-date', type: 'text' }
        ]
      },
      history: {
        '39': {
          hp: 75,
          'chronos-time': '8:00 AM',
          'chronos-date': 'Monday, June 1, 2026'
        }
      }
    })
  }
  const adventure = createAdventure(40, [
    heartbeatCard(4, [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]),
    sharedWidget
  ])
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  const payload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  assert.deepEqual(payload.manifest.widgets.map(widget => widget.id), ['hp', 'chronos-clock'])
  assert.equal(payload.history['40'].hp, 75, 'Chronos must carry forward another script\'s Widget value')
  assert.equal(payload.history['40']['chronos-time'], undefined)
  assert.equal(payload.history['40']['chronos-date'], undefined)
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

  assert.match(result.text, /08:00 on Monday, June 1, 2026/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Minutes Per Turn: 15/)
  assert.doesNotMatch(findCard(adventure, 'Chronos Settings').entry, /Apply Changes/)
  assert.doesNotMatch(findCard(adventure, 'Chronos Settings').entry, /New Time/)

  adventure.info.actionCount = 51
  const next = runHook(adventure, contextSource, 'Prefix')
  assert.match(next.text, /08:15/)
}

{
  const adventure = createAdventure(60)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  adventure.info.actionCount = 61
  const timeInput = runHook(adventure, inputSource, '> You say "/time 23:00".')
  assert.equal(timeInput.text, 'You establish the current time before continuing.')
  let result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /11:00 PM/)
  assert.match(adventure.state.message, /set the time to 11:00 PM/)

  adventure.info.actionCount = 62
  runHook(adventure, inputSource, '/date December 31, 2024')
  result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /Tuesday, December 31, 2024/)

  adventure.randomValues.push(0.5, 0.5)
  adventure.info.actionCount = 63
  const sleepInput = runHook(adventure, inputSource, '/sleep')
  assert.equal(sleepInput.text, 'You settle down to sleep until the following morning.')
  result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /7:30 AM on Wednesday, January 1, 2025/)

  const retry = runHook(adventure, contextSource, 'Prefix')
  assert.match(retry.text, /7:30 AM on Wednesday, January 1, 2025/)
  assert.equal(adventure.state.chronos.clock.hour, 7, 'Retry must not repeat random sleep')

  adventure.info.actionCount = 62
  const undo = runHook(adventure, contextSource, 'Prefix')
  assert.match(undo.text, /11:00 PM on Tuesday, December 31, 2024/)

  adventure.info.actionCount = 63
  runHook(adventure, inputSource, '/time bananas')
  const invalid = runHook(adventure, contextSource, 'Prefix')
  assert.match(invalid.text, /11:00 PM/)
  assert.match(adventure.state.message, /could not read that time/)

  const unrelated = runHook(adventure, inputSource, '/some-other-script command')
  assert.equal(unrelated.text, '/some-other-script command')
}

{
  const adventure = createAdventure(70)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')
  adventure.randomValues.push(0.5, 0.5)
  adventure.info.actionCount = 71
  runHook(adventure, inputSource, '/sleep')
  const result = runHook(adventure, contextSource, 'Prefix')
  assert.match(
    result.text,
    /8:30 AM on Tuesday, June 2, 2026/,
    'A daytime /sleep must still land on the following morning'
  )
}

{
  const adventure = createAdventure(80)
  runHook(adventure, 'ChronosV2.initialize()', '')
  assert.equal(runHook(adventure, 'ChronosV2._test.isLeapYear(2000)', ''), true)
  assert.equal(runHook(adventure, 'ChronosV2._test.isLeapYear(1900)', ''), false)
  assert.equal(runHook(adventure, 'ChronosV2._test.isLeapYear(2024)', ''), true)
  assert.equal(runHook(adventure, 'ChronosV2._test.isLeapYear(2100)', ''), false)

  assert.equal(
    runHook(adventure, 'ChronosV2._test.parseTime("8 PM").hour', ''),
    20,
    'Whole-hour commands should be accepted'
  )
  assert.equal(
    runHook(adventure, 'ChronosV2._test.parseDate("Jan 2, 1000").month', ''),
    1,
    'Unambiguous month abbreviations should be accepted'
  )

  adventure.state.chronos.clock = { year: 1900, month: 2, day: 28, hour: 23, minute: 59 }
  runHook(adventure, 'ChronosV2._test.addMinutes(1)', '')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 1900, month: 3, day: 1, hour: 0, minute: 0 },
    'Century years must not be leap years unless divisible by 400'
  )

  adventure.state.chronos.clock = { year: 2000, month: 3, day: 1, hour: 0, minute: 0 }
  runHook(adventure, 'ChronosV2._test.addMinutes(-1)', '')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 2000, month: 2, day: 29, hour: 23, minute: 59 }
  )

  adventure.state.chronos.clock = { year: 1, month: 1, day: 1, hour: 0, minute: 0 }
  runHook(adventure, 'ChronosV2._test.addMinutes(-999999)', '')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 1, month: 1, day: 1, hour: 0, minute: 0 },
    'Clock arithmetic must clamp safely at the earliest supported instant'
  )

  adventure.state.chronos.clock = { year: 4321, month: 7, day: 19, hour: 13, minute: 37 }
  runHook(adventure, 'ChronosV2._test.addMinutes(1000000); ChronosV2._test.addMinutes(-1000000)', '')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 4321, month: 7, day: 19, hour: 13, minute: 37 },
    'Large forward and backward jumps must round-trip exactly'
  )
}

console.log('Chronos V2 tests passed')
