import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(
  new URL('../src/data/raw-scripts/library/stateboy.js', import.meta.url),
  'utf8'
)
const sandbox = { state: {}, info: { actionCount: 0 }, history: [] }
sandbox.globalThis = sandbox
vm.createContext(sandbox)
vm.runInContext(source, sandbox, { filename: 'stateboy.js' })

const internals = sandbox.StateboyInternals

function observerState() {
  return {
    sheet: null,
    hasObservedStateCardEntry: false,
    lastObservedStateCardEntry: '',
    lastScriptWrittenStateCardEntry: '',
    lastObservedStateSheetFingerprint: '',
    lastScriptWrittenStateSheetFingerprint: '',
    pendingStateCardWrite: null
  }
}

{
  const sb = observerState()
  const firstText = '## Stats\nLevel: 1'
  const firstSheet = internals.parseSheet(firstText)
  let observation = internals.observeCardEntry(sb, firstText, firstSheet)
  assert.equal(observation.userEdited, false)
  sb.sheet = firstSheet

  const editedText = '## Stats\nLevel: 2'
  const editedSheet = internals.parseSheet(editedText)
  observation = internals.observeCardEntry(sb, editedText, editedSheet)
  assert.equal(observation.userEdited, true)
  sb.sheet = editedSheet

  observation = internals.observeCardEntry(sb, editedText, editedSheet)
  assert.equal(observation.userEdited, false)
}

{
  const sb = observerState()
  const firstText = '## Stats\nLevel: 1'
  const equivalentText = '## Stats\nLevel: 1.0'
  const firstSheet = internals.parseSheet(firstText)
  internals.observeCardEntry(sb, firstText, firstSheet)
  sb.sheet = firstSheet

  const observation = internals.observeCardEntry(
    sb,
    equivalentText,
    internals.parseSheet(equivalentText)
  )
  assert.equal(observation.userEdited, false)
}

{
  const sb = observerState()
  const beforeText = '## Stats\nLevel: 1'
  const afterText = '## Stats\nLevel: 2'
  const beforeSheet = internals.parseSheet(beforeText)
  const afterSheet = internals.parseSheet(afterText)
  internals.observeCardEntry(sb, beforeText, beforeSheet)
  sb.sheet = beforeSheet

  sandbox.info.actionCount = 10
  internals.rememberScriptWrite(sb, afterText, afterSheet)

  let observation = internals.observeCardEntry(sb, beforeText, beforeSheet)
  assert.equal(observation.userEdited, false)
  assert.equal(observation.staleScriptWrite, true)

  observation = internals.observeCardEntry(sb, afterText, afterSheet)
  assert.equal(observation.userEdited, false)
  assert.equal(observation.staleScriptWrite, false)
  assert.equal(sb.pendingStateCardWrite, null)

  const manualText = '## Stats\nLevel: 3'
  observation = internals.observeCardEntry(sb, manualText, internals.parseSheet(manualText))
  assert.equal(observation.userEdited, true)
}

{
  const sb = observerState()
  const beforeText = '## Stats\nLevel: 1'
  const afterText = '## Stats\nLevel: 2'
  const beforeSheet = internals.parseSheet(beforeText)
  const afterSheet = internals.parseSheet(afterText)
  internals.observeCardEntry(sb, beforeText, beforeSheet)
  sb.sheet = beforeSheet

  sandbox.info.actionCount = 20
  internals.rememberScriptWrite(sb, afterText, afterSheet)
  sandbox.info.actionCount = 23

  let observation = internals.observeCardEntry(sb, beforeText, beforeSheet)
  assert.equal(observation.staleScriptWrite, false)
  assert.equal(observation.userEdited, true)
  sb.sheet = beforeSheet

  observation = internals.observeCardEntry(sb, beforeText, beforeSheet)
  assert.equal(observation.userEdited, false)
}

const heartbeat = {
  ultrascripts: {
    protocol: 1,
    enabled: true,
    client: 'BetterDungeon',
    clientVersion: '2.0.0'
  },
  modules: [
    { id: 'ai', ops: ['status', 'query'] },
    { id: 'sdk', ops: ['config'] },
    { id: 'widget', ops: [] }
  ],
  writtenAt: '2026-07-29T00:00:00.000Z'
}
const aiReady = { status: 'ok', data: { ready: true } }
const sdkReady = {
  status: 'ok',
  data: { ultrascripts: { modulePreferences: { widget: true } } }
}

{
  const initialText = '## Stats\nLevel: 1'
  const manualText = '## Stats\nLevel: 2'
  let delayedStateboyWrite = ''

  sandbox.state = {
    __stateboyUsSdk: {
      pendingRequests: [],
      pendingAcks: [],
      results: {
        ai: { 'stateboy.ai.status#0.ready': aiReady },
        sdk: { 'stateboy.sdk.config#0.ready': sdkReady }
      },
      reqCounter: 0,
      widget: null
    }
  }
  sandbox.info = { actionCount: 4 }
  sandbox.history = []
  sandbox.storyCards = [
    { keys: 'Stateboy', entry: initialText, type: 'Stateboy' },
    { keys: 'ultrascripts:heartbeat', entry: JSON.stringify(heartbeat), type: 'Ultrascripts' }
  ]
  sandbox.addStoryCard = (keys, entry, type) => {
    sandbox.storyCards.push({ keys, entry, type })
  }
  sandbox.updateStoryCard = (index, keys, entry, type) => {
    if (keys === 'Stateboy') {
      delayedStateboyWrite = entry
      return
    }
    sandbox.storyCards[index] = { keys, entry, type }
  }

  sandbox.Stateboy('context', 'initial context')
  const stateCard = sandbox.storyCards.find((card) => card.keys === 'Stateboy')
  stateCard.entry = manualText

  sandbox.info.actionCount = 5
  sandbox.state.stateboy.pendingAnalysisRequestId = 'obsolete-request'
  sandbox.state.stateboy.pendingAnalysisLiveCount = 5
  sandbox.state.stateboy.lastQueuedAnalysisLiveCount = 5
  sandbox.Stateboy('output', 'The hero advances.')

  const replacementRequest = sandbox.state.stateboy.pendingAnalysisRequestId
  assert.notEqual(replacementRequest, '')
  assert.notEqual(replacementRequest, 'obsolete-request')
  assert.equal(sandbox.state.stateboy.changeLog.length, 1)
  assert.equal(sandbox.state.stateboy.changeLog[0].source, 'manual')

  sandbox.state.__stateboyUsSdk.results.ai[replacementRequest] = {
    status: 'ok',
    data: {
      json: {
        changes: [
          {
            category: 'Stats',
            name: 'Level',
            operation: 'set',
            value: 3,
            confidence: 0.95,
            reason: 'The hero advanced.'
          }
        ],
        summary: 'Level advanced.'
      }
    }
  }

  sandbox.info.actionCount = 6
  sandbox.Stateboy('input', 'continue')
  assert.match(delayedStateboyWrite, /Level: 3/)
  assert.equal(sandbox.state.stateboy.changeLog.length, 2)

  sandbox.Stateboy('context', 'same-turn context')
  sandbox.Stateboy('output', 'same-turn output')
  assert.equal(sandbox.state.stateboy.changeLog.length, 2)
  assert.equal(sandbox.state.stateboy.pendingAnalysisRequestId, '')
  assert.notEqual(sandbox.state.stateboy.pendingStateCardWrite, null)

  stateCard.entry = delayedStateboyWrite
  sandbox.info.actionCount = 7
  sandbox.Stateboy('context', 'next-turn context')
  assert.equal(sandbox.state.stateboy.pendingStateCardWrite, null)
  assert.equal(sandbox.state.stateboy.changeLog.length, 2)

  sandbox.Stateboy('output', 'The story continues.')
  assert.notEqual(sandbox.state.stateboy.pendingAnalysisRequestId, '')
}

console.log('Stateboy manual-edit checks passed.')
