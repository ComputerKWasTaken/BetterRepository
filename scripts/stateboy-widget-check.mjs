import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../src/data/raw-scripts/library/stateboy.js', import.meta.url),
  'utf8'
)
const validatorSource = readFileSync(
  new URL('../../BetterDungeon/modules/widget/validators.js', import.meta.url),
  'utf8'
)
const sandbox = { state: {}, info: { actionCount: 0 }, history: [] }
sandbox.globalThis = sandbox
vm.createContext(sandbox)
vm.runInContext(source, sandbox, { filename: 'stateboy.js' })

const validatorSandbox = { window: {} }
vm.createContext(validatorSandbox)
vm.runInContext(validatorSource, validatorSandbox, { filename: 'validators.js' })

const internals = sandbox.StateboyInternals
const validators = validatorSandbox.window.UltrascriptsWidgetValidators
const sheet = internals.parseSheet([
  '## Vitals',
  'Health: 8/10',
  'Quest Progress: 75%',
  'Level: 4',
  'Gold: 120',
  'Active: true',
  'Mood: Focused',
  'Empty Inventory: []',
  '## Details',
  'Inventory: Sword, Shield, Potion, Rope, Torch, Map, Key',
  'Profile: {"rank":"Captain","trusted":true}',
  'Missing: null'
].join('\n'))

const payload = internals.buildWidgetPayload({
  settings: { debugMode: false, aiEnabled: true },
  pendingAnalysisRequestId: '',
  lastAcceptedSummary: '',
  lastAiSummary: ''
}, sheet)

function widgetFor(name) {
  const entry = sheet.entries.find((candidate) => candidate.name === name)
  return payload.widgets.find((widget) => widget.id === `stateboy_${entry.order}_${name.toLowerCase().replace(/[^a-z0-9]/g, '')}`)
}

function valueFor(name) {
  return payload.values[widgetFor(name).id]
}

function assertValidWidgetPayload(candidate) {
  const manifestResult = validators.validateManifest({ widgets: candidate.widgets })
  assert.deepEqual(Array.from(manifestResult.errors), [])
  for (const sourceWidget of manifestResult.widgets) {
    const widget = { ...sourceWidget }
    const stateValue = candidate.values[widget.id]
    if (stateValue !== undefined) {
      if (stateValue && typeof stateValue === 'object' && !Array.isArray(stateValue)) {
        Object.assign(widget, validators.filterWidgetStatePatch(widget, stateValue))
      } else {
        widget[validators.getPrimitiveStateField(widget)] = stateValue
      }
    }
    const result = validators.validateWidgetConfig(widget.id, widget)
    assert.deepEqual(Array.from(result.errors), [], `${widget.id} violated the Widget contract`)
  }
}

assertValidWidgetPayload(payload)

for (const widget of payload.widgets) {
  if (widget.type === 'divider') continue
  assert.ok(widget.label || widget.title, `${widget.id} must display its state name`)
}

assert.equal(payload.widgets.filter((widget) => widget.type === 'divider').length, 2)
assert.equal(widgetFor('Health').type, 'bar')
assert.equal(widgetFor('Health').label, 'Health')
assert.equal(widgetFor('Quest Progress').type, 'progress')
assert.equal(widgetFor('Quest Progress').label, 'Quest Progress')

assert.equal(widgetFor('Level').type, 'stat')
assert.equal(widgetFor('Level').label, 'Level')
assert.match(widgetFor('Level').color, /^(blue|green|purple|cyan|orange|yellow|red)$/)
assert.notEqual(widgetFor('Level').color, widgetFor('Gold').color)
assert.equal(
  internals.widgetColor(sheet.entries.find((entry) => entry.name === 'Level')),
  widgetFor('Level').color
)

assert.equal(widgetFor('Active').type, 'stat')
assert.equal(valueFor('Active').value, 'On')
assert.equal(widgetFor('Mood').type, 'panel')
assert.equal(widgetFor('Mood').title, 'Mood')
assert.equal(valueFor('Mood').content, 'Focused')

assert.equal(widgetFor('Empty Inventory').type, 'taggroup')
assert.equal(widgetFor('Empty Inventory').label, 'Empty Inventory')
assert.equal(valueFor('Empty Inventory').items[0].text, 'Empty')

assert.equal(widgetFor('Inventory').type, 'list')
assert.equal(widgetFor('Inventory').title, 'Inventory')
assert.equal(valueFor('Inventory').items.length, 7)

assert.equal(widgetFor('Profile').type, 'panel')
assert.equal(widgetFor('Profile').title, 'Profile · Structured Data')
assert.deepEqual(
  Array.from(valueFor('Profile').items, (item) => [item.label, item.value]),
  [['rank', 'Captain'], ['trusted', 'On']]
)

assert.equal(widgetFor('Missing').type, 'stat')
assert.equal(widgetFor('Missing').label, 'Missing')
assert.equal(valueFor('Missing'), 'No value')

assert.equal(internals.parseValue('true').type, 'boolean')
assert.equal(internals.parseValue('True').type, 'boolean')
assert.equal(internals.parseValue('["Sword"]').type, 'list')
assert.equal(internals.parseValue('{"rank":"Captain"}').type, 'object')
assert.equal(internals.parseValue('null').type, 'null')

const crowdedSheet = internals.parseSheet([
  '## First',
  ...Array.from({ length: 23 }, (_, index) => `First ${index}: ${index}`),
  '## Second',
  ...Array.from({ length: 22 }, (_, index) => `Second ${index}: ${index}`)
].join('\n'))
const crowdedPayload = internals.buildWidgetPayload({
  settings: { debugMode: false, aiEnabled: true }
}, crowdedSheet)
assert.equal(crowdedPayload.widgets.length, 40)
assert.equal(crowdedPayload.widgets.some((widget) => widget.type === 'divider'), false)
assertValidWidgetPayload(crowdedPayload)

const longName = 'A'.repeat(150)
const boundedWidget = internals.makeWidget(
  internals.parseSheet(`## Long\n${longName}: ${'B'.repeat(600)}`).entries[0],
  0
)
assert.equal(boundedWidget.config.title.length, 120)
assert.equal(boundedWidget.value.content.length, 512)

const debugPayload = internals.buildWidgetPayload({
  settings: { debugMode: true, aiEnabled: true },
  pendingAnalysisRequestId: 'pending',
  lastAcceptedSummary: 'Updated Health.',
  lastAiSummary: ''
}, internals.parseSheet(''))
assert.deepEqual(
  Array.from(debugPayload.widgets, (widget) => [widget.id, widget.label || widget.title]),
  [
    ['stateboy_status', 'Stateboy'],
    ['stateboy_ai', 'AI'],
    ['stateboy_summary', 'Last Update']
  ]
)
assertValidWidgetPayload(debugPayload)

const directiveIssueSheet = internals.parseSheet('## Debug\nValue: One [hidden, visible, unknown-flag]')
const directiveDebugPayload = internals.buildWidgetPayload({
  settings: { debugMode: true, aiEnabled: true },
  pendingAnalysisRequestId: '',
  lastAcceptedSummary: '',
  lastAiSummary: '',
  directiveIssues: directiveIssueSheet.directiveIssues
}, directiveIssueSheet)
assert.equal(
  directiveDebugPayload.widgets.some((widget) => widget.id === 'stateboy_directive_issues'),
  true
)
assertValidWidgetPayload(directiveDebugPayload)

console.log('Stateboy Widget checks passed.')
