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
  assert.match(result.text, /The current in-game time is 8:00 AM \(Morning\) on Monday, June 1, 2026/)
  assert.equal(adventure.state.chronos.clock.hour, 8)
  assert.equal(adventure.state.chronos.clock.minute, 0)
  assert.match(adventure.state.message, /Chronos · 8:00 AM/)
  const settingsCard = findCard(adventure, 'Chronos Settings')
  assert.ok(settingsCard, 'Chronos should create its compact settings card')
  assert.match(settingsCard.entry, /Track Time: On/)
  assert.match(settingsCard.entry, /Track Date: On/)
  assert.match(settingsCard.entry, /Current Time: 8:00 AM/)
  assert.match(settingsCard.entry, /Time Phase: Morning/)
  assert.match(settingsCard.entry, /Current Date: Monday, June 1, 2026/)
  assert.ok(
    settingsCard.entry.indexOf('Current Time:') < settingsCard.entry.indexOf('# Settings'),
    'The live Chronos readout must appear before configuration'
  )

  adventure.info.actionCount = 11
  const next = runHook(adventure, contextSource, original)
  assert.match(next.text, /8:02 AM/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Current Time: 8:02 AM/)
  const nextMessage = adventure.state.message

  const retry = runHook(adventure, contextSource, original)
  assert.match(retry.text, /8:02 AM/)
  assert.equal(adventure.state.chronos.clock.minute, 2, 'Retry must not advance the clock twice')
  assert.notEqual(
    adventure.state.message,
    nextMessage,
    'Toast fallback must remain unique even when the displayed clock is unchanged'
  )

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

  assert.match(result.text, /12:01 AM \(After Midnight\) on Thursday, February 29, 2024/)

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
  assert.match(clockWidget.html, />Morning</)
  assert.match(clockWidget.html, />Mon, Jun 1, 2026</)
  assert.doesNotMatch(clockWidget.html, /Time:|Date:|🕒|📅/)

  runHook(adventure, inputSource, 'Retry without a new heartbeat.')
  runHook(adventure, contextSource, 'Prefix')
  assert.match(adventure.state.message, /Chronos ·/, 'A stale heartbeat should restore toast fallback')

  findCard(adventure, 'ultrascripts:heartbeat').entry = heartbeatCard(
    2,
    [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]
  ).entry
  findCard(adventure, 'Chronos Settings').entry = findCard(
    adventure,
    'Chronos Settings'
  ).entry.replace('Date Format: Long', 'Date Format: ISO')
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
  assert.match(updatedPayload.history['31']['chronos-clock'].html, />Morning</)
  assert.match(updatedPayload.history['31']['chronos-clock'].html, />2026-06-01</)
  assert.doesNotMatch(updatedPayload.history['31']['chronos-clock'].html, /Mon, Jun/)

  findCard(adventure, 'ultrascripts:heartbeat').entry = heartbeatCard(
    3,
    [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]
  ).entry
  findCard(adventure, 'Chronos Settings').entry = findCard(
    adventure,
    'Chronos Settings'
  ).entry.replace('Track Date: On', 'Track Date: Off')
  adventure.info.actionCount = 32
  runHook(adventure, inputSource, 'Show only the time.')
  runHook(adventure, contextSource, 'Prefix')
  const timeOnlyPayload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  assert.match(timeOnlyPayload.history['32']['chronos-clock'].html, />9:17 AM</)
  assert.match(timeOnlyPayload.history['32']['chronos-clock'].html, />Morning</)
  assert.doesNotMatch(timeOnlyPayload.history['32']['chronos-clock'].html, /Jun 1, 2026/)

  findCard(adventure, 'ultrascripts:heartbeat').entry = heartbeatCard(
    4,
    [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]
  ).entry
  findCard(adventure, 'Chronos Settings').entry = findCard(
    adventure,
    'Chronos Settings'
  ).entry.replace('Enabled: On', 'Enabled: Off')
  adventure.info.actionCount = 33
  runHook(adventure, inputSource, 'Disable the clock.')
  runHook(adventure, contextSource, 'Prefix')
  const clearedPayload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  assert.deepEqual(clearedPayload.manifest.widgets, [])
  assert.ok(
    Object.values(clearedPayload.history).every(values => !values['chronos-clock']),
    'Disabling Chronos must remove its active Widget values from all history'
  )
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
          { id: 'hp', type: 'bar', label: 'Health', max: 100 }
        ]
      },
      history: {
        '39': {
          hp: 75
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
}

{
  const history = {}
  for (let actionCount = 0; actionCount < 502; actionCount += 1) {
    history[String(actionCount)] = {
      'chronos-clock': { html: `old-${actionCount}` }
    }
  }
  history['0'].hp = 25
  const widgetState = {
    id: 150,
    keys: 'ultrascripts:state:widget',
    type: 'Ultrascripts',
    entry: JSON.stringify({
      v: 1,
      manifest: {
        widgets: [
          { id: 'hp', type: 'bar', label: 'Health', max: 100 },
          { id: 'chronos-clock', type: 'custom' }
        ]
      },
      history
    })
  }
  const adventure = createAdventure(600, [
    heartbeatCard(6, [{ id: 'widget', version: '1.0.0', stateNames: ['widget'] }]),
    widgetState
  ])
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  const payload = JSON.parse(findCard(adventure, 'ultrascripts:state:widget').entry)
  const activeHistory = Object.values(payload.history).filter(values => values['chronos-clock'])
  assert.equal(activeHistory.length, 500, 'Chronos Widget history must remain bounded')
  assert.equal(payload.history['0'].hp, 25, 'Pruning must preserve another script\'s history')
  assert.equal(payload.history['0']['chronos-clock'], undefined)
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
      'Show Time Phase: Off',
      'Minutes Per Turn: 15',
      'Clock Format: 24-hour',
      'Date Format: ISO'
    ].join('\n')
  }
  const adventure = createAdventure(50, [settings])
  runHook(adventure, inputSource, 'Continue.')
  const result = runHook(adventure, contextSource, 'Prefix')

  assert.match(result.text, /08:00 on Monday, June 1, 2026/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Minutes Per Turn: 15/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Date Format: ISO/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Time Phase: Off/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Current Date: 2026-06-01/)
  assert.match(adventure.state.message, /Chronos · 08:00 · 2026-06-01/)
  assert.doesNotMatch(adventure.state.message, /Monday/)
  assert.doesNotMatch(adventure.state.message, /Morning/)

  findCard(adventure, 'Chronos Settings').entry = findCard(
    adventure,
    'Chronos Settings'
  ).entry.replace('Minutes Per Turn: 15', 'Minutes Per Turn:')
  adventure.info.actionCount = 51
  const next = runHook(adventure, contextSource, 'Prefix')
  assert.match(next.text, /08:15/)
  assert.equal(
    adventure.state.chronos.settings.minutesPerTurn,
    15,
    'A blank numeric setting must retain the last safe rate'
  )
}

{
  const adventure = createAdventure(55)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  adventure.info.actionCount = 56
  runHook(adventure, inputSource, '/time 9:00 AM')
  adventure.info.actionCount = 57
  runHook(adventure, inputSource, 'I changed my mind and keep walking.')
  const result = runHook(adventure, contextSource, 'Prefix')

  assert.match(result.text, /8:04 AM/)
  assert.equal(
    adventure.state.chronos.pendingCommand,
    null,
    'A command abandoned before Context must never execute on a later action'
  )
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

  adventure.info.actionCount = 63
  const advanceInput = runHook(adventure, inputSource, '/advance 8 hours')
  assert.equal(advanceInput.text, 'You allow 8 hours to pass before continuing.')
  result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /7:00 AM \(Morning\) on Wednesday, January 1, 2025/)
  assert.match(adventure.state.message, /advanced 8 hours/)

  const retry = runHook(adventure, contextSource, 'Prefix')
  assert.match(retry.text, /7:00 AM \(Morning\) on Wednesday, January 1, 2025/)
  assert.equal(adventure.state.chronos.clock.hour, 7, 'Retry must not repeat /advance')

  adventure.info.actionCount = 62
  const undo = runHook(adventure, contextSource, 'Prefix')
  assert.match(undo.text, /11:00 PM \(Night\) on Tuesday, December 31, 2024/)

  adventure.info.actionCount = 63
  runHook(adventure, inputSource, '/time bananas')
  const invalid = runHook(adventure, contextSource, 'Prefix')
  assert.match(invalid.text, /11:00 PM/)
  assert.match(adventure.state.message, /could not read that time/)

  adventure.info.actionCount = 64
  const invalidAdvanceInput = runHook(adventure, inputSource, '/advance 1 month')
  assert.equal(invalidAdvanceInput.text, 'You briefly check the Chronos time controls.')
  const invalidAdvance = runHook(adventure, contextSource, 'Prefix')
  assert.match(invalidAdvance.text, /11:00 PM/)
  assert.match(adventure.state.message, /could not read that duration/)

  const unrelated = runHook(adventure, inputSource, '/some-other-script command')
  assert.equal(unrelated.text, '/some-other-script command')
}

{
  const settings = {
    id: 250,
    keys: 'Chronos Settings',
    type: 'Chronos',
    entry: [
      '# Chronos Settings',
      'Enabled: On',
      'Paused: On',
      'Minutes Per Turn: 15',
      'Clock Format: 12-hour'
    ].join('\n')
  }
  const adventure = createAdventure(65, [settings])
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')
  adventure.info.actionCount = 66
  runHook(adventure, inputSource, 'Wait.')
  const paused = runHook(adventure, contextSource, 'Prefix')
  assert.match(paused.text, /8:00 AM/, 'Paused Chronos must still inform the model')

  findCard(adventure, 'Chronos Settings').entry = findCard(
    adventure,
    'Chronos Settings'
  ).entry.replace('Enabled: On', 'Enabled: Off')
  adventure.info.actionCount = 67
  runHook(adventure, inputSource, 'Continue.')
  const disabled = runHook(adventure, contextSource, 'Prefix')
  assert.equal(disabled.text, 'Prefix', 'Disabled Chronos must not alter model context')
  assert.equal(adventure.state.chronos.clock.minute, 0)
}

{
  const adventure = createAdventure(68)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')

  let settingsCard = findCard(adventure, 'Chronos Settings')
  settingsCard.entry = settingsCard.entry.replace('Track Date: On', 'Track Date: Off')
  adventure.info.actionCount = 69
  runHook(adventure, inputSource, 'Continue.')
  let result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /The current in-game time is 8:02 AM \(Morning\)\./)
  assert.doesNotMatch(result.text, /June 1, 2026/)
  assert.match(adventure.state.message, /Chronos · 8:02 AM/)
  assert.doesNotMatch(adventure.state.message, /June 1, 2026/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Current Date: Hidden/)

  settingsCard = findCard(adventure, 'Chronos Settings')
  settingsCard.entry = settingsCard.entry
    .replace('Track Time: On', 'Track Time: Off')
    .replace('Track Date: Off', 'Track Date: On')
  adventure.info.actionCount = 70
  runHook(adventure, inputSource, 'Continue.')
  result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /The current in-game date is Monday, June 1, 2026\./)
  assert.doesNotMatch(result.text, /8:04 AM/)
  assert.match(adventure.state.message, /Chronos · Monday, June 1, 2026/)
  assert.doesNotMatch(adventure.state.message, /8:04 AM/)
  assert.match(findCard(adventure, 'Chronos Settings').entry, /Current Time: Hidden/)

  settingsCard = findCard(adventure, 'Chronos Settings')
  settingsCard.entry = settingsCard.entry.replace('Track Date: On', 'Track Date: Off')
  adventure.info.actionCount = 71
  runHook(adventure, inputSource, 'Continue.')
  result = runHook(adventure, contextSource, 'Prefix')
  assert.equal(result.text, 'Prefix')
  assert.equal(adventure.state.message, undefined)
  assert.equal(
    adventure.state.chronos.clock.minute,
    6,
    'Hidden components must continue advancing internally for safe re-enabling'
  )
}

{
  const adventure = createAdventure(72)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')
  adventure.state.chronos.clock = {
    year: 2026,
    month: 6,
    day: 1,
    hour: 23,
    minute: 59
  }
  const settingsCard = findCard(adventure, 'Chronos Settings')
  settingsCard.entry = settingsCard.entry.replace('Track Time: On', 'Track Time: Off')
  adventure.info.actionCount = 73
  runHook(adventure, inputSource, 'Continue.')
  const result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /The current in-game date is Tuesday, June 2, 2026/)
  assert.equal(adventure.state.chronos.clock.hour, 0)
  assert.equal(adventure.state.chronos.clock.minute, 1)
}

{
  const adventure = createAdventure(70)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')
  adventure.info.actionCount = 71
  runHook(adventure, inputSource, '/advance 2 days')
  const result = runHook(adventure, contextSource, 'Prefix')
  assert.match(
    result.text,
    /8:00 AM \(Morning\) on Wednesday, June 3, 2026/,
    '/advance must handle whole-day calendar rollover'
  )
}

{
  const adventure = createAdventure(75)
  adventure.state.chronos = {
    version: 2,
    clock: [],
    settings: [],
    lastActionCount: -100,
    notice: 42,
    pendingCommand: { name: 'erase-everything', argument: [] },
    timeline: [],
    ultrascripts: []
  }
  runHook(adventure, 'ChronosV2.initialize()', '')
  assert.deepEqual(
    JSON.parse(JSON.stringify(adventure.state.chronos.clock)),
    { year: 2026, month: 6, day: 1, hour: 8, minute: 0 }
  )
  assert.equal(adventure.state.chronos.lastActionCount, 75)
  assert.equal(adventure.state.chronos.pendingCommand, null)
  assert.equal(Array.isArray(adventure.state.chronos.timeline), false)
  assert.equal(Array.isArray(adventure.state.chronos.ultrascripts), false)
}

{
  const adventure = createAdventure(77)
  runHook(adventure, inputSource, 'Continue.')
  runHook(adventure, contextSource, 'Prefix')
  adventure.state.chronos.clock = {
    year: 999999,
    month: 12,
    day: 31,
    hour: 23,
    minute: 59
  }
  adventure.info.actionCount = 78
  runHook(adventure, inputSource, '/advance 1 minute')
  const result = runHook(adventure, contextSource, 'Prefix')
  assert.match(result.text, /11:59 PM \(Night\) on Friday, December 31, 999999/)
  assert.match(adventure.state.message, /cannot advance beyond the supported calendar limit/)
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
  assert.equal(
    runHook(adventure, 'ChronosV2._test.parseAdvance("90 minutes").minutes', ''),
    90
  )
  assert.equal(
    runHook(adventure, 'ChronosV2._test.parseAdvance("2 wks").minutes', ''),
    20160
  )
  for (const alias of ['adv', 'addtime', 'skiptime', 'fastforward']) {
    assert.equal(
      runHook(adventure, `ChronosV2._test.parseCommand("/${alias} 2 hours").name`, ''),
      'advance'
    )
  }
  assert.equal(runHook(adventure, 'ChronosV2._test.parseAdvance("1 month")', ''), null)
  assert.equal(runHook(adventure, 'ChronosV2._test.parseAdvance("0 hours")', ''), null)

  adventure.state.chronos.settings.dateFormat = 'American'
  assert.equal(runHook(adventure, 'ChronosV2.formatDisplayDate()', ''), '06/01/2026')
  adventure.state.chronos.settings.dateFormat = 'European'
  assert.equal(runHook(adventure, 'ChronosV2.formatDisplayDate()', ''), '01/06/2026')
  adventure.state.chronos.settings.dateFormat = 'ISO'
  assert.equal(runHook(adventure, 'ChronosV2.formatDisplayDate()', ''), '2026-06-01')

  const phases = [
    [0, 'After Midnight'],
    [3, 'Predawn'],
    [5, 'Dawn'],
    [7, 'Morning'],
    [10, 'Late Morning'],
    [12, 'Midday'],
    [14, 'Afternoon'],
    [17, 'Evening'],
    [20, 'Night']
  ]
  for (const [hour, phase] of phases) {
    adventure.state.chronos.clock.hour = hour
    assert.equal(runHook(adventure, 'ChronosV2.formatTimePhase()', ''), phase)
  }

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
