# Symbols & Commands — Info Dump

> Full knowledge base for AI Dungeon's in-prose symbols and slash-style
> commands that authors and players use to steer the AI. The guide
> (`src/components/guides/SymbolsCommandsGuide.vue`) is a curated subset.

---

## 1. Definition

Symbols and Commands are the lightweight, character-level conventions
players type directly into the action box (or that scenario text
includes) to nudge the AI: brackets for OOC, asterisks for emphasis,
do/say/story toggles, retry/alter/erase, etc.

## 2. Source-of-truth references

- Official AI Dungeon documentation — Player Commands.
- BetterEcosystem Project Management docs (maintained, current through
  Frontier):
  https://github.com/ComputerKWasTaken/BetterEcosystemProjectManagement/tree/main/docs
- AI Dungeon Discord — community-driven prompt-symbol cheatsheets.

## 3. Action-box modes

AI Dungeon's **native** input modes (each is recorded in the scripting
`history` array with a matching action `type`):

- **Do** *(type `do`)* — an action. Placeholder: "What do you do?"
- **Say** *(type `say`)* — dialog. Placeholder: "What do you say?"
- **Story** *(type `story`)* — free-form narration / continuation.
- **See** *(type `see`)* — image prompt (when image gen is enabled).

> PM docs confirm this four-mode list (and the UI placeholders/icons) but
> are **silent on the exact text transformation** each mode applies —
> e.g. whether "Do" auto-prefixes "You ", or how "Say" wraps the input.
> Treat the precise wrapping as unverified by canonical docs.

> BetterDungeon also injects two extra modes into the picker — **Try** and
> **Command** — which are BetterDungeon features, not native AI Dungeon
> modes.

## 4. In-prose symbols (emergent community conventions)

The canonical PM docs **do not document any in-prose symbol system** — no
brackets, asterisks, quotes, or `>` shorthand are described as official
engine features. As far as authoritative documentation goes, these are
**emergent community conventions**, not guaranteed engine behavior:

- `[ ... ]` — bracketed OOC / author directive. (Note: the engine *does*
  wrap the Author's Note as `[Author's Note: ...]`, and that bracket
  signal is itself emergent/learned, not a hard control token — so heavy
  bracket use elsewhere dilutes its effect.)
- `*...*` — emphasis, often interpreted as an action beat.
- `"..."` — explicit dialog.
- `>` — player-action shorthand (legacy / Story mode).

Model-by-model fidelity for these symbols is not documented in PM sources.

## 5. Command-bar actions

Per PM `adventure-page-commands.md`, the native command bar is:

- **Take a Turn** — the primary action button; opens the text input for
  the player to type their action.
- **Continue** — tells the AI to continue the narrative without player
  input.
- **Retry** — regenerates the last AI response.
- **Erase** — removes the last turn. (PM docs list the button but give no
  detailed behavioral definition.)

**Alter / Edit** (manually editing AI output so the engine treats the edit
as canonical) is a real feature but is **not** part of the command bar in
the PM DOM reference — it's the inline edit affordance on a story block.

PM docs document no Undo/Redo command and do not describe per-model
differences under repeated Retry.

## 6. Best practices

- Use brackets sparingly for OOC; many models leak `[...]` into prose
  if overused.
- Prefer the Author's Note for repeating directives instead of bracketed
  in-prose pleas.
- Continue cheaply when the AI ends a beat early; it costs less context
  pressure than retrying.

## 7. Edge cases

- Model-by-model symbol fidelity is undocumented in canonical PM sources;
  treat it as empirical/per-model.
- Scripts see the player's input in `onInput` and can detect or strip
  symbols there; the stored `history` entry carries the mode as its
  `type` (`do`/`say`/`story`/`see`), but PM docs don't specify whether the
  text is stored verbatim or transformed by mode.

## 8. Open questions

- **Are there documented "official" symbols?** Answer per canonical docs:
  **no** — the PM docs document none, so the in-prose symbol set is
  treated as emergent community convention rather than guaranteed engine
  behavior. The one engine-side bracket usage is the auto-wrapped
  Author's Note, whose effect is also emergent.
- Exact text transformation each input mode applies before storage (PM
  silent — see §3).

## 9. Intentionally not in the guide

- Defunct or deprecated symbols from earlier AI Dungeon versions.

## 10. Cross-references

- AI Instructions info dump — for "always" style rules that replace
  the need for in-prose symbols.
- Scripts info dump — for programmatic symbol-stripping in `onInput`.
