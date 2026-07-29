import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../src/data/raw-scripts/library/stateboy.js', import.meta.url),
  'utf8'
)
const sandbox = { state: {}, info: { actionCount: 12 }, history: [] }
sandbox.globalThis = sandbox
vm.createContext(sandbox)
vm.runInContext(source, sandbox, { filename: 'stateboy.js' })

const internals = sandbox.StateboyInternals
const sheet = internals.parseSheet([
  '## Secrets [hidden, locked]',
  'Secret: Known',
  'Public Clue: Found [visible, unlocked]',
  'Dashboard Clue: Heard [widget]',
  'Story Clue: Seen [visible, no-widget]',
  '## Public [no-widget]',
  'Status: Calm',
  'Dashboard Status: Ready [widget]',
  '## Protected [important]',
  'Main Quest: Find the Crown',
  'Poisoned: On [temporary]',
  '## Problems',
  'Conflicted: Value [important, temporary]',
  'Bad Visibility: Value [hidden, visible]',
  'Unknown: Value [sparkly]',
  'Legacy: Value [widget: off, context: off, ai: readonly]'
].join('\n'))

function entry(name) {
  return sheet.entries.find((candidate) => candidate.name === name)
}

function policyFor(candidate) {
  return JSON.parse(JSON.stringify(internals.resolvePolicy(candidate)))
}

assert.deepEqual(
  policyFor(entry('Secret')),
  { contextVisible: false, widgetVisible: false, aiMutable: false, important: false, temporary: false }
)
assert.deepEqual(
  policyFor(entry('Public Clue')),
  { contextVisible: true, widgetVisible: true, aiMutable: true, important: false, temporary: false }
)
assert.deepEqual(
  policyFor(entry('Dashboard Clue')),
  { contextVisible: false, widgetVisible: true, aiMutable: false, important: false, temporary: false }
)
assert.deepEqual(
  policyFor(entry('Story Clue')),
  { contextVisible: true, widgetVisible: false, aiMutable: false, important: false, temporary: false }
)
assert.equal(policyFor(entry('Status')).widgetVisible, false)
assert.equal(policyFor(entry('Dashboard Status')).widgetVisible, true)
assert.equal(policyFor(entry('Main Quest')).important, true)
assert.deepEqual(
  policyFor(entry('Poisoned')),
  { contextVisible: true, widgetVisible: true, aiMutable: true, important: false, temporary: true }
)
assert.deepEqual(
  policyFor(entry('Conflicted')),
  { contextVisible: true, widgetVisible: true, aiMutable: true, important: false, temporary: false }
)
assert.equal(policyFor(entry('Bad Visibility')).contextVisible, true)
assert.deepEqual(
  policyFor(entry('Legacy')),
  { contextVisible: true, widgetVisible: true, aiMutable: true, important: false, temporary: false }
)

const contextSheet = internals.renderContextSheet(sheet)
assert.doesNotMatch(contextSheet, /Secret: Known/)
assert.match(contextSheet, /Public Clue: Found/)
assert.doesNotMatch(contextSheet, /Dashboard Clue: Heard/)
assert.match(contextSheet, /Story Clue: Seen/)
assert.match(contextSheet, /Status: Calm/)

const aiSheet = internals.renderAiSheet(sheet)
assert.match(aiSheet, /Secret: Known \(AI readonly: do not modify\)/)
assert.match(aiSheet, /Main Quest: Find the Crown \(important state\)/)
assert.match(aiSheet, /Poisoned: On \(temporary state\)/)

const lockedChange = internals.validateChange({
  category: 'Secrets', name: 'Secret', operation: 'set', value: 'Lost', confidence: 0.99
}, { minimumConfidence: 0.65 }, sheet)
assert.equal(lockedChange.ok, false)
assert.equal(lockedChange.reason, 'state is AI readonly')
const unlockedChange = internals.validateChange({
  category: 'Secrets', name: 'Public Clue', operation: 'set', value: 'Lost', confidence: 0.99
}, { minimumConfidence: 0.65 }, sheet)
assert.equal(unlockedChange.ok, true)

const rendered = internals.renderSheet(sheet)
assert.match(rendered, /## Secrets \[hidden, locked\]/)
assert.match(rendered, /Public Clue: Found \[visible, unlocked\]/)
assert.match(rendered, /Story Clue: Seen \[visible, no-widget\]/)
assert.doesNotMatch(rendered, /Conflicted: Value \[/)
assert.doesNotMatch(rendered, /Bad Visibility: Value \[/)
assert.doesNotMatch(rendered, /Unknown: Value \[/)
assert.doesNotMatch(rendered, /Legacy: Value \[/)
assert.doesNotMatch(rendered, /widget:|context:|ai:/)

const roundTrip = internals.parseSheet(rendered)
for (const originalEntry of sheet.entries) {
  const renderedEntry = roundTrip.entries.find((candidate) => candidate.id === originalEntry.id)
  assert.ok(renderedEntry)
  assert.deepEqual(
    policyFor(renderedEntry),
    policyFor(originalEntry),
    `${originalEntry.name} policy changed during canonical render`
  )
}

assert.equal(sheet.directiveIssues.length, 6)
assert.match(internals.directiveIssueSummary(sheet.directiveIssues), /important and temporary/)
assert.match(internals.directiveIssueSummary(sheet.directiveIssues), /unknown flag "sparkly"/)
assert.match(internals.directiveIssueSummary(sheet.directiveIssues), /unknown flag "widget: off"/)

const normalWidgetPayload = internals.buildWidgetPayload({
  settings: { debugMode: false, aiEnabled: true },
  directiveIssues: sheet.directiveIssues
}, sheet)
assert.equal(normalWidgetPayload.widgets.some((widget) => widget.id === 'stateboy_directive_issues'), false)
assert.equal(normalWidgetPayload.widgets.some((widget) => /secret$/.test(widget.id)), false)
assert.equal(normalWidgetPayload.widgets.some((widget) => /dashboardclue$/.test(widget.id)), true)
assert.equal(normalWidgetPayload.widgets.some((widget) => /storyclue$/.test(widget.id)), false)

const debugWidgetPayload = internals.buildWidgetPayload({
  settings: { debugMode: true, aiEnabled: true },
  pendingAnalysisRequestId: '',
  lastAcceptedSummary: '',
  lastAiSummary: '',
  directiveIssues: sheet.directiveIssues
}, sheet)
assert.equal(debugWidgetPayload.widgets.some((widget) => widget.id === 'stateboy_directive_issues'), true)
assert.match(debugWidgetPayload.values.stateboy_directive_issues.content, /unknown flag/)

assert.doesNotMatch(source, /function getStateboyEffectiveDirective/)
assert.doesNotMatch(source, /function parseStateboyDirectiveValue/)

const firstFingerprint = internals.sheetFingerprint(
  internals.parseSheet('## Test [hidden, locked]\nValue: One [visible, unlocked]')
)
const reorderedFingerprint = internals.sheetFingerprint(
  internals.parseSheet('## Test [locked, hidden]\nValue: One [unlocked, visible]')
)
assert.equal(firstFingerprint, reorderedFingerprint)

const plainFingerprint = internals.sheetFingerprint(
  internals.parseSheet('## Test\nValue: One')
)
const ignoredFingerprint = internals.sheetFingerprint(
  internals.parseSheet('## Test [sparkly]\nValue: One [important, temporary]')
)
assert.equal(plainFingerprint, ignoredFingerprint)

console.log('Stateboy canonical directive checks passed.')
