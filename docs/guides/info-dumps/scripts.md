# Scripts — Info Dump

> Full knowledge base for AI Dungeon Scripting (the JavaScript hook
> system used by scenarios and first-class Script resources). The guide
> (`src/components/guides/ScriptsGuide.vue`) is a curated subset.

---

## 1. Definition

Scripts are author-written JavaScript that runs in a sandbox inside the
AI Dungeon engine on three lifecycle hooks: input modifier, model-context
modifier, and output modifier. Scripts can be published and saved as their
own content type, attached directly to owned adventures, or attached to a
scenario for new adventures to inherit.

## 2. Source-of-truth references

- Official AI Dungeon scripting documentation.
- BetterEcosystem Project Management docs (maintained alongside the current
  scripting rollout):
  https://github.com/ComputerKWasTaken/BetterEcosystemProjectManagement/tree/main/docs/01-scripting
- Repo data: `src/data/scripts.js`, `src/data/raw-scripts/*`.
- AI Dungeon Discord — Scripts channel.

## 3. Mechanics

- Hooks: `onInput`, `onModelContext`, `onOutput`. Each receives the
  relevant `text` (player input / assembled context / AI output) and
  **returns an object**: `return { text }` at minimum, optionally
  `return { text, stop: true }` to halt the pipeline. The `text` global
  and `stop` global mirror these.
- Library code runs **fresh each turn** — there is no persistent function
  scope between turns. Use `state` for anything that must persist.
- Every hook runs in an isolated sandbox with a 16 MB memory limit and a
  2-second execution timeout.
- `state` is persisted between hooks and turns and is private to each
  composed script.
- `state.memory.*` is the mutable bridge to the engine's context-assembly
  system (`context`, `authorsNote`, `frontMemory`); Story Cards are
  mutated through `addStoryCard`/`updateStoryCard`/`removeStoryCard`.
- Published scripts appear in Discover, libraries, and profile Script tabs.
- Adventure owners can add saved scripts from Game Settings, toggle them,
  and reorder them. Changes take effect on the next turn.
- Scenario creators attach inherited scripts from the scenario Details
  editor. Script editing remains desktop-only and creator-only.

## 4. Execution pipeline

```
Player input
   → onInput
   → engine assembles context
   → onModelContext  ← edit Instructions/Plot/Story Cards here
   → model generates
   → onOutput        ← rewrite AI output
   → display
```

## 5. Script-visible globals (full inventory)

### 5.1 `state` (read/write, persisted)

- `state.memory.context` — reads or writes **Plot Essentials** (UI "Memory").
  Assigning it overwrites the visible Plot Essentials UI value, but the field
  cannot be edited while Optimized Context is active.
- `state.memory.authorsNote` — reads or writes **Author's Note**. Assigning it
  overwrites the visible Author's Note UI value. Changes made in `onOutput`
  apply to the next generation. It remains writable with Optimized Context.
- `state.memory.frontMemory` — hidden injection at the very end of the
  context. Most powerful, often used for "right now" nudges. It remains
  writable with Optimized Context.
- `state.message` — string shown to the player as a toast whenever its value
  differs from the previous turn. Use unique values for temporary status,
  confirmations, and diagnostics.
- `state.placeholders` — persisted scenario-start placeholder answers as
  `{ question, answer }` objects.
- Custom properties — store strings, numbers, booleans, arrays, nested
  objects. Avoid circular references and methods (serialized between
  turns).

### 5.2 `info` (read-only metadata)

- `info.actionCount` — total actions in the adventure.
- `info.characterNames` — array of player-character names in multiplayer.
- `info.maxChars` — estimated max characters for context (**onModelContext
  only**).
- `info.memoryLength` — characters used by memory/Plot Essentials
  (**onModelContext only**).
- `info.useCacheEfficient` — whether the active story model uses Optimized
  Context (**onModelContext only**).
- `info.storyModel.name` / `info.storyModel.version` — active story-model
  identity when the lifecycle began.
- `info.emptyOutputReason` — explanation when model output failed.
- Writes to `info` have no effect.

### 5.3 `history` (read-only)

Array of past actions, chronological (oldest first). Each entry:
`{ text, type, rawText }` where `rawText` is a deprecated alias of `text`.
`type` is one of `start`, `continue`, `do`, `say`, `story`, `see`,
`repeat`, `unknown`. During a hook, `history` excludes the current
in-flight action (input/context/output is added after the hook).

### 5.4 `storyCards` (mutate via functions)

Array of card objects: `{ id, keys, type, entry }`.
Mutated only through `addStoryCard(keys, entry, type?)` (returns new
card index, or `false` on duplicate keys), `updateStoryCard(index, keys, entry, type)`,
and `removeStoryCard(index)` (both throw if the index doesn't exist).
See the Story Cards info dump §7.

### 5.5 `memory` (Plot Essentials)

`memory.context` reflects the UI Plot Essentials value. Assigning
`state.memory.context` writes through to that Plot Component rather than
creating a separate hidden override. Optimized Context blocks that assignment.

## 6. Best practices

- Keep hook bodies fast — the 2-second cap includes JIT warm-up.
- Treat `state` as your only memory; do not rely on closures or
  module-scope variables.
- Keep behavior in its matching lifecycle hook. Use Library for shared
  helpers, not as a router for Input, Context, and Output.
- Multiple attached scripts already compose in player-selected order and
  receive private persistent state plus independent error isolation.
- On Optimized Context models, put `// @cache-compatible` in a Context
  script that needs to modify model text. Preserve the entire incoming
  prompt unchanged and append only a suffix; prepends, replacements,
  deletions, reordering, and truncation are discarded. Without the annotation,
  Context text alterations are discarded to preserve the cache and the player
  is notified, although script side effects still run.
- The annotation governs returned Context text only. It does not unlock
  `state.memory.context`: on Optimized Context models, `authorsNote` and
  `frontMemory` are the only writable `state.memory` fields.
- For Multiple Choice scenarios, share helpers via copy-paste into each
  option's script (there is no shared module system).
- Test in the same model you target — context-window quirks vary.

## 7. Migration: BetterScripts → Ultrascripts

The legacy BetterScripts material (Zero-width, TagCipher, Context
Modifier patterns) is being retired. Ultrascripts replaces it with a
sanctioned bidirectional transport over Story Cards. Phase 13
(BetterRepository documentation) is the place this migration becomes
visible to readers.

## 8. Edge cases

- Scripts are a first-class content type. Players can save published
  scripts, attach them to owned adventures, toggle them, and reorder them;
  scenario-attached scripts are inherited by new adventures.
- Attached guest scripts can read Plot Essentials and Author's Note, but
  their writes to those fields are discarded. The scenario-owned script
  retains ownership of its Plot Essentials writes.
- Script editing remains desktop-only and creator-only.
- Each composed script has independent error isolation. Still write `state`
  mutations atomically and surface useful diagnostics via `state.message`.
- `removeStoryCard` shifts the indexes of all later cards. When removing
  multiple cards, iterate from the highest index down to the lowest.
- `addStoryCard` returns `false` if a card with identical keys already exists.

## 9. Legacy / deprecated aliases

Old names still work but should not be used in new scripts (PM
`legacy-compatibility.md`):

| Deprecated | Current |
|------------|---------|
| `addWorldEntry(keys, entry)` | `addStoryCard(keys, entry, type?)` |
| `updateWorldEntry(index, keys, entry)` | `updateStoryCard(index, keys, entry, type)` |
| `removeWorldEntry(index)` | `removeStoryCard(index)` |
| `worldEntries` (global) | `storyCards` |
| `rawText` (history property) | `text` |
| `sandboxConsole.log()` | `log()` / `console.log()` |

Terminology renames: "World Info" → "Story Cards", "World Entry" → "Story
Card", UI "Memory" → "Plot Essentials" (the API still uses
`memory`/`context`).

## 10. Open questions

- Exact JS engine version and which ES features are supported (PM docs
  silent).
- Whether `state` serialization has size caps (PM docs silent).

## 11. Intentionally not in the guide

- Deep BetterScripts internals (deprecated).
- Ultrascripts-specific protocol details — those live in the
  Ultrascripts info dump and in BetterDungeon's `ultrascripts/` planning
  folder.

## 12. Cross-references

- Ultrascripts info dump.
- Plot Components info dump — for what `state.memory.*` writes to.
- Story Cards info dump — for the `storyCards` array and card APIs.
