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
- `Project Management/ultrascripts/00-overview.md`
- `Project Management/ultrascripts/01-architecture.md`
- `Project Management/ultrascripts/02-modules.md`
- `Project Management/ultrascripts/03-implementation-status.md`
- `Project Management/ultrascripts/04-test-suites.md`
- `Project Management/ultrascripts/05-betterdungeon-sdk-spec.md`
- `Project Management/ultrascripts/07-example-contract-reference.md`
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
| `scripture` | State | Dynamic widgets and sidebar UI | `ultrascripts:state:scripture` |
| `webfetch` | Ops | Consent-gated HTTP and search | `fetch`, `search` |
| `clock` | Ops | Time, timezone, and format helpers | `now`, `tz`, `format` |
| `sdk` | Ops | Safe BetterDungeon metadata and config | `version`, `config` |
| `geolocation` | Ops | Browser permission and current position | `permission`, `getCurrent` |
| `weather` | Ops | Current weather and forecasts | `current`, `forecast` |
| `network` | Ops | Browser connectivity hints | `status` |
| `system` | Ops | Device, browser, locale, screen, power | `info`, `power` |
| `ai` | Ops | Native AI Dungeon helper queries | `query`, `status` |

The AI module is native-only. Public docs should teach `ai.query` for generated
helper text and `ai.status` for readiness. `ai.query` accepts a required
`prompt`, optional `context`, optional `systemPrompt`, `includeStorySummary`,
`temperature`, and `timeoutMs`. AI Dungeon also injects native Story Card
generator instructions upstream, including guidance to return only story card
entry text and avoid JSON. For structured query responses, prefer XML or YAML
over raw JSON because the generator path discourages JSON and can strip outer
braces in some paths.

## 4. Reserved cards

- `ultrascripts:heartbeat`: written by BetterDungeon. Discovery surface for
  protocol, client, current turn, and mounted modules.
- `ultrascripts:state:<name>`: written by scenario scripts. Routed to modules
  that declare matching `stateNames`.
- `ultrascripts:out`: written by scenario scripts. Request envelope plus acks.
- `ultrascripts:in:<module>`: written by BetterDungeon. Response envelope for
  that module. Scripture also stores widget interaction events here.

All production Ultrascripts-owned cards use the Story Card type `Ultrascripts`.

## 5. Heartbeat detection

The heartbeat is the only discovery surface. Scripts should read it when they
need to know whether Ultrascripts exists, which modules are mounted, or which
ops are currently exposed.

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

function usHas(moduleId, opName) {
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
`status: "pending"`. Unsafe ops such as `ai.query` and `webfetch.fetch` should
be filtered by `completedLiveCount` before applying the result to current-turn
logic.

## 7. SDK versus heartbeat

- Use heartbeat for availability: runtime present, modules mounted, ops exposed.
- Use `sdk.version` for BetterDungeon/client version metadata.
- Use `sdk.config` for sanitized player configuration such as module
  preferences, Scripture display settings, WebFetch consent counts, and AI
  configured/cost-control status.

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
- WebFetch still requires per-origin consent.
- Geolocation still depends on browser or WebView permission state.
- AI queries depend on the player being in a loaded AI Dungeon adventure where
  BetterDungeon can make native GraphQL requests.

## 9. Public guide coverage

BetterRepository now has public Ultrascripts guides for:

- overview and platform mental model
- quick start with the standard `bd.us` helper
- cookbook recipes
- architecture
- module authoring
- Scripture
- WebFetch
- AI
- SDK
- Clock
- Geolocation
- Weather
- Network
- System

The next documentation track is not filling gaps in the guide set; it is
keeping the Enhanced and Required script templates aligned while reviewing
modules one at a time for conceptual polish.

## 10. Intentionally not in public docs

- Internal transport implementation details beyond what authors need.
- Historical BetterScripts/TagCipher patterns except as deprecated migration
  context.
- Archived Provider AI phase snippets that still use `profile: "full"`,
  `providerAI`, or the retired hosted-model ops.
- Speculative third-party module registry or sandboxing plans.
