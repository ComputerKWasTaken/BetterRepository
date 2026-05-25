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
- LewdLeah's docs — extensive hook references and patterns.
- Repo data: `src/data/scripts.js`, `src/data/raw-scripts/*`.
- AI Dungeon Discord — Scripts channel.

## 3. Mechanics

- Hooks: `onInput(text)`, `onModelContext(text)`, `onOutput(text)`.
- Each hook runs in an isolated sandbox: **16 MB** memory limit, **2-second**
  timeout. Exceeding either kills the hook silently for that turn.
- No `async`/`await`. Pure synchronous JS.
- `state` is persisted between hooks and turns.
- `state.memory.*` is the only mutable bridge to the engine's
  context-assembly system.
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

## 5. State exposure (selected)

- `state.memory.frontMemory` — hidden injection at the very end of the
  context. Most powerful, often used by scripts for "right now" nudges.
- `state.memory.authorsNote` — overridable Author's Note.
- `worldEntries` — the scripting representation of Story Cards.
- TODO: complete inventory of script-visible state. Pull from
  raw-scripts examples.

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

- Sandbox sometimes survives the timeout but with a half-applied state
  mutation. Always write `state` mutations atomically.
- Errors thrown inside hooks are swallowed silently — log via
  `state.message` for visibility.
- Memory limit is total across all hooks for the turn, not per-hook.

## 9. Open questions

- Exact JS engine version and which ES features are supported.
- Whether `state` serialization has size caps (separate from sandbox memory).

## 10. Intentionally not in the guide

- Deep BetterScripts internals (deprecated).
- Ultrascripts-specific protocol details — those live in the
  Ultrascripts info dump and in BetterDungeon's `ultrascripts/` planning
  folder.

## 11. Cross-references

- Ultrascripts info dump.
- Plot Components info dump — for what `state.memory.*` writes to.
- Story Cards info dump — for `worldEntries`.
