# Scripts — Info Dump

> Full knowledge base for AI Dungeon Scripting (the JavaScript hook
> system attached to scenarios). The guide
> (`src/components/guides/ScriptsGuide.vue`) is a curated subset.

---

## 1. Definition

Scripts are author-written JavaScript that runs in a sandbox inside the
AI Dungeon engine on three lifecycle hooks: input modifier, context
modifier, and output modifier. Scripts attach to **scenarios**, not
adventures, and only certain scenario types support them.

## 2. Source-of-truth references

- Official AI Dungeon scripting documentation.
- BetterEcosystem Project Management docs (maintained, current through
  Frontier):
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
- No `async`/`await`. Pure synchronous JS. *(Sandbox resource limits —
  commonly cited as a ~16 MB memory cap and ~2-second timeout — are not
  published in the canonical PM docs; treat the exact numbers as
  community/testing lore, not confirmed spec.)*
- `state` is persisted between hooks and turns.
- `state.memory.*` is the mutable bridge to the engine's context-assembly
  system (`context`, `authorsNote`, `frontMemory`); Story Cards are
  mutated through `addStoryCard`/`updateStoryCard`/`removeStoryCard`.
- Only **Simple Start** and **Character Creator** scenarios may have
  scripts. **Multiple Choice** scenarios cannot — but their individual
  **options** can each carry independent scripts.
- Only the scenario creator can see the scripts. They may be reviewed
  for moderation before public release.
- Updating scripts in a published scenario affects **all existing
  adventures** based on that scenario.

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

- `state.memory.context` — overrides **Plot Essentials** (UI "Memory").
  Takes priority over the UI-configured value and over the lower-priority
  `memory.context`.
- `state.memory.authorsNote` — overrides **Author's Note**. Changes apply
  to the *next* generation.
- `state.memory.frontMemory` — hidden injection at the very end of the
  context. Most powerful, often used for "right now" nudges.
- `state.message` — string shown to the player as a toast (implemented
  Phoenix, 2026-03-02 update). Use for command confirmations, stats, and
  surfacing diagnostics.
- Custom properties — store strings, numbers, booleans, arrays, nested
  objects. Avoid circular references and methods (serialized between
  turns).

### 5.2 `info` (read-only metadata)

- `info.actionCount` — total actions in the adventure.
- `info.characters` — array of characters/players (strings or objects
  with a `name`).
- `info.maxChars` — estimated max characters for context (**onModelContext
  only**).
- `info.memoryLength` — characters used by memory/Plot Essentials
  (**onModelContext only**).
- `info.contextTokens` — total tokens in the current context.
- Writes to `info` have no effect.

### 5.3 `history` (read-only)

Array of past actions, chronological (oldest first). Each entry:
`{ text, type, rawText }` where `rawText` is a deprecated alias of `text`.
`type` is one of `start`, `continue`, `do`, `say`, `story`, `see`,
`repeat`, `unknown`. During a hook, `history` excludes the current
in-flight action (input/context/output is added after the hook).

### 5.4 `storyCards` (mutate via functions)

Array of card objects:
`{ id, title, keys, type, entry, description, createdAt, updatedAt, useForCharacterCreation }`.
Mutated only through `addStoryCard(keys, entry, type?)` (returns new
length, or `false` on duplicate keys), `updateStoryCard(index, keys, entry, type)`,
and `removeStoryCard(index)` (both throw if the index doesn't exist).
See the Story Cards info dump §7.

### 5.5 `memory` (lower-priority Plot Essentials)

`memory.context` is the UI Plot Essentials value; `state.memory.context`
takes priority over it.

## 6. Best practices

- Keep hook bodies fast — the 2-second cap includes JIT warm-up.
- Treat `state` as your only memory; do not rely on closures or
  module-scope variables.
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

- Errors thrown inside a hook are **not** silently swallowed: the error
  is logged, the player sees an "Unable to run scenario scripts" message,
  and generation may proceed with the unmodified text (behavior may vary).
  Still write `state` mutations atomically and surface your own
  diagnostics via `state.message`.
- `removeStoryCard` shifts the indexes of all later cards. When removing
  multiple cards, iterate from the highest index down to the lowest.
- `addStoryCard` sets both `keys` and `title` to the `keys` argument and
  returns `false` if a card with identical keys already exists.

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
- Which scenario types support scripts: this dump states Simple Start and
  Character Creator (and per-option scripts on Multiple Choice); PM docs
  do not document scenario-type restrictions, so the specifics are
  unverified by canonical sources.
- Sandbox memory/timeout numbers (PM docs silent — see §3).
- Whether Frontier's "Optimized Context" blocks `onModelContext` edits to
  the stable/cached prefix on supported models (the Frontier release
  notes say Optimized Context prevents scripts from modifying the stable
  parts of the context; PM API docs do not yet describe the mechanism).

## 11. Intentionally not in the guide

- Deep BetterScripts internals (deprecated).
- Ultrascripts-specific protocol details — those live in the
  Ultrascripts info dump and in BetterDungeon's `ultrascripts/` planning
  folder.

## 12. Cross-references

- Ultrascripts info dump.
- Plot Components info dump — for what `state.memory.*` writes to.
- Story Cards info dump — for the `storyCards` array and card APIs.
