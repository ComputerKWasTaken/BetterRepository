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
- LewdLeah's docs — exhaustive symbol reference.
- AI Dungeon Discord — community-driven prompt-symbol cheatsheets.

## 3. Action-box modes

- **Do** — third-person action.
- **Say** — third-person dialog.
- **Story** — free-form narration.
- **See** *(when image gen is enabled)* — image prompt.

## 4. In-prose symbols (typical conventions)

- `[ ... ]` — bracketed OOC / author directive.
- `*...*` — emphasis, often interpreted as action beat.
- `"..."` — explicit dialog.
- `>` — player-action shorthand (legacy / Story mode).

TODO: complete the full table from the existing guide and from LewdLeah's
reference, including which models honor which conventions.

## 5. Retry / Alter / Erase / Continue

- **Retry** — discards last AI output, regenerates with same context.
- **Alter** — manually edit AI output; engine treats edit as canonical.
- **Erase** — strikes the last turn entirely.
- **Continue** — empty input that asks the AI for more on the current beat.

TODO: write down model differences (some models behave noticeably
differently under repeated Retry).

## 6. Best practices

- Use brackets sparingly for OOC; many models leak `[...]` into prose
  if overused.
- Prefer the Author's Note for repeating directives instead of bracketed
  in-prose pleas.
- Continue cheaply when the AI ends a beat early; it costs less context
  pressure than retrying.

## 7. Edge cases

- TODO: model-by-model symbol fidelity.
- TODO: which symbols Ultrascripts / scripts can detect vs strip.

## 8. Open questions

- Are there documented "official" symbols, or is this entirely emergent
  community convention?

## 9. Intentionally not in the guide

- Defunct or deprecated symbols from earlier AI Dungeon versions.

## 10. Cross-references

- AI Instructions info dump — for "always" style rules that replace
  the need for in-prose symbols.
- Scripts info dump — for programmatic symbol-stripping in `onInput`.
