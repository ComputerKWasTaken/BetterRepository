# Ultrascripts Info Dump

> Full knowledge base for Ultrascripts, the BetterDungeon-side JavaScript
> runtime extension that talks to AI Dungeon scenario scripts through reserved
> Story Cards. The Vue guide pages in `src/components/guides/Ultrascripts*.vue`
> are the curated public version of this reference.

> **Primary source of truth:** `Project Management/ultrascripts/` and the live
> BetterDungeon source under `BetterDungeon/services/ultrascripts/` and
> `BetterDungeon/modules/`.

---

## 1. Definition

Ultrascripts is BetterDungeon's story-card-based runtime for AI Dungeon
scripting. Scenario scripts publish state or requests by writing reserved
`ultrascripts:*` Story Cards. BetterDungeon observes those cards, executes
extension-side capabilities, and writes results back through the same card
transport.

The current runtime is unified. There is no Lite/full profile split, no
separate heartbeat subsystem, and no zero-width or TagCipher transport.

## 2. Source-of-truth references

- `Project Management/ultrascripts/README.md`
- `Project Management/ultrascripts/reference/runtime.md`
- `Project Management/ultrascripts/reference/modules.md`
- `Project Management/ultrascripts/reference/script-contract.md`
- `Project Management/ultrascripts/reference/sdk.md`
- `Project Management/ultrascripts/reference/verification.md`
- `Project Management/ultrascripts/planning/current-roadmap.md`
- `BetterDungeon/services/ultrascripts/core.js`
- `BetterDungeon/services/ultrascripts/envelope.js`
- `BetterDungeon/services/ultrascripts/ops-dispatcher.js`
- `BetterDungeon/services/ultrascripts/module-registry.js`
- `BetterDungeon/modules/*/module.js`

## 3. Module inventory

All nine first-party modules are shipped and covered by dedicated regression
test suites in `BetterDungeon/tests/aid-scripts/`.

| Module | Kind | Public role | Ops / state |
|---|---|---|---|
| `widget` | State | Dynamic widgets and sidebar UI | `ultrascripts:state:widget` |
| `webfetch` | Ops | Bounded public HTTPS text reads | `fetch` |
| `clock` | Ops | Time, timezone, and format helpers | `now`, `tz`, `format` |
| `sdk` | Ops | Safe BetterDungeon metadata and config | `version`, `config` |
| `weather` | Ops | Current weather and forecasts | `current`, `forecast` |
| `network` | Ops | Browser connectivity hints | `status` |
| `system` | Ops | Device, browser, locale, screen, power | `info`, `power` |
| `ai` | Ops | Provider-neutral async AI query contract | `status`, `query` |
| `audio` | State | Bounded synthesized sound effects | `ultrascripts:state:audio` |

The AI module exposes provider-neutral `ai.status` and asynchronous `ai.query`.
Players explicitly select Gemini, OpenRouter, or a remote Custom HTTPS service;
all three use BetterDungeon's unified OpenAI-compatible backend. Public docs
should teach text output, schema-backed JSON output, `not_configured` when the
selected profile is incomplete, normalized provider errors, and ordinary script
fallbacks. Do not document provider aliases, script-facing service/model
settings, or native generation payloads.

## 4. Reserved cards

- `ultrascripts:heartbeat`: written by BetterDungeon. Turn-to-turn liveness and
  discovery surface for protocol, client platform, current turn, and modules.
- `ultrascripts:state:<name>`: written by scenario scripts. Routed to modules
  that declare matching `stateNames`.
- `ultrascripts:out`: written by scenario scripts. Request envelope plus acks.
- `ultrascripts:in:<module>`: written by BetterDungeon. Response envelope for
  that module. Widget also stores widget interaction events here.

All production Ultrascripts-owned cards use the Story Card type `Ultrascripts`.

## 5. Heartbeat detection

The heartbeat is the only discovery surface. BetterDungeon advances its
persistent `ultrascripts.beat` counter whenever it refreshes the heartbeat,
including after every observed generation action. Scripts compare that value in
the Input hook: a changed beat confirms BetterDungeon remained active through
the preceding adventure activity; an unchanged beat identifies a stale card.
Detection is intentionally one turn behind disappearance, allowing an async
module call to degrade cleanly if the user switches to a client without
BetterDungeon.

```js
function usReadJsonCard(title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] && cards[i].title === title) {
      try { return JSON.parse(cards[i].value || '{}'); } catch (e) { return null; }
    }
  }
  return null;
}

function usHeartbeat() {
  var hb = usReadJsonCard('ultrascripts:heartbeat');
  if (!hb || !hb.ultrascripts || hb.ultrascripts.protocol !== 1) return null;
  if (hb.ultrascripts.client !== 'BetterDungeon') return null;
  return hb;
}

function usObserveHeartbeatOnInput() {
  state.__usPresence = state.__usPresence || {};
  var hb = usHeartbeat();
  var beat = Number(hb && hb.ultrascripts && hb.ultrascripts.beat);
  var valid = !!(hb && hb.ultrascripts.enabled && Number.isFinite(beat) &&
    beat >= 0 && Math.floor(beat) === beat);
  if (!valid) return state.__usPresence.available = false;
  state.__usPresence.available = state.__usPresence.lastBeat == null ||
    beat !== state.__usPresence.lastBeat;
  state.__usPresence.lastBeat = beat;
  return state.__usPresence.available;
}

function usHas(moduleId, opName) {
  if (!state.__usPresence || !state.__usPresence.available) return false;
  var hb = usHeartbeat();
  var mods = (hb && Array.isArray(hb.modules)) ? hb.modules : [];
  for (var i = 0; i < mods.length; i++) {
    var mod = mods[i];
    if (!mod || mod.id !== moduleId) continue;
    if (!opName) return true;
    var ops = Array.isArray(mod.ops) ? mod.ops : [];
    return ops.indexOf(opName) !== -1;
  }
  return false;
}
```

Do not check for `ultrascripts.profile`; the live heartbeat does not include a
profile field.

Call `usObserveHeartbeatOnInput()` once from the Input hook. Model Context and
Output hooks should reuse the stored result instead of comparing the same beat
again.

## 6. Request/response envelope

Request card: `ultrascripts:out`

```json
{
  "v": 1,
  "requests": [
    {
      "id": "turn-12-clock-1",
      "module": "clock",
      "op": "now",
      "args": {}
    }
  ],
  "acks": ["turn-11-clock-1"]
}
```

Response card: `ultrascripts:in:<module>`

```json
{
  "v": 1,
  "responses": {
    "turn-12-clock-1": {
      "status": "ok",
      "data": {},
      "completedAt": 1737042131500,
      "completedLiveCount": 12
    }
  }
}
```

Terminal statuses are `ok`, `err`, and `timeout`. Pending responses use
`status: "pending"`. Side-effect ops such as `webfetch.fetch` should be
filtered by `completedLiveCount` before applying the result to current-turn
logic.

## 7. SDK versus heartbeat

- Use heartbeat for availability: runtime present, modules mounted, ops exposed.
- Use `sdk.version` for BetterDungeon/client version metadata.
- Use `sdk.config` for sanitized player configuration such as feature and
  module preferences.

The SDK does not expose secrets. API keys are never returned to scripts.

## 8. Platform support

| Platform | Status | Notes |
|---|---|---|
| Chromium browsers | Supported | Chrome, Edge, Brave, and similar browsers. |
| Firefox | Supported | Same protocol and module surface. |
| Android WebView | Supported | Phase 12 completed; uses the same unified runtime. |
| iOS native / iOS Safari | Not supported | No suitable extension/WebView surface for Ultrascripts. |

Important cross-platform notes:

- Treat capability as dynamic. Always check heartbeat and module ops instead of
  assuming every player has every module enabled.
- WebFetch uses its module toggle as the sole control and accepts bounded,
  credential-free public HTTPS `GET`/`HEAD` reads without per-origin prompts.
- The AI module keeps service selection outside the script contract. Valid query
  requests return `not_configured` until the player's selected Gemini,
  OpenRouter, or Custom profile is complete. Content restrictions and supported
  capabilities vary by service; scripts should branch on normalized errors.

## 9. Public guide coverage

BetterRepository now has public Ultrascripts guides for:

- overview and platform mental model
- quick start with the standard `bd.us` helper
- cookbook recipes
- architecture
- module authoring
- Widget
- WebFetch
- AI
- SDK
- Clock
- Weather
- Network
- System

The V1.7 documentation track keeps the Enhanced and Required templates aligned
with BetterDungeon V2 and keeps Stateboy current as the first planned Required
Ultrascripts showcase. Stateboy is explicitly unpublished in V1.7 and is not
part of the shipped resource set.

## 10. Intentionally not in public docs

- Internal transport implementation details beyond what authors need.
- Historical BetterScripts/TagCipher patterns except as deprecated migration
  context.
- Archived AI phase snippets that still use provider aliases, hosted-model ops,
  or native generation experiments.
- Speculative third-party module registry or sandboxing plans.
