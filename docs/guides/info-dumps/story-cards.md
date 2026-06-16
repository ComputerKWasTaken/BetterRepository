# Story Cards — Info Dump

> Full knowledge base for AI Dungeon Story Cards. The Story Cards guide
> (`src/components/guides/StoryCardsGuide.vue`) is a curated subset of
> this file. Add new facts here first, then decide what (if anything)
> belongs in the guide per `docs/guides/format-spec.md` §12.

---

## 1. Definition

Story Cards are conditionally-injected notes about characters, locations,
factions, items, creatures, concepts, events, cultures, vehicles, roles,
rumors, and relationships. Each card has a set of comma-separated
**triggers** (keys) and an **entry** (value). When any trigger appears in
the active context window, the card's entry is injected so the AI sees it.

Story Cards live on the scenario and are inherited into every adventure
made from that scenario. Adventures can also have their own ad-hoc cards.

## 2. Source-of-truth references

- Official AI Dungeon documentation — Story Cards section.
- LewdLeah's AI Dungeon docs:
  https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs
- AI Dungeon Discord — Story Cards channel (long-running thread; many
  facts only exist there).
- In-app card editor (Details + Command tabs, screenshotted into our
  internal notes when behavior changes).

## 3. Anatomy of a card

| Field | Required | Notes |
|-------|----------|-------|
| `title` | yes | Display name only. **Not** seen by the AI; never use it as the only identifier. |
| `triggers` (`keys`) | yes | Comma-separated, **no spaces after commas**. Each trigger is a substring match. |
| `entry` (`value`) | yes | Prose seen by the AI. Repeat the subject's name here. |
| `type` (`category`) | no | One of `STORY_CARD_CATEGORIES` ids. UI organization only. |
| `description` | no | Author notes. Not seen by the AI. |
| `notes` | no | AI-generation log when "Log generations in notes" is on. |

## 4. Trigger mechanics

- Match is a **substring**, case-insensitive, anywhere in the active context window.
- Card activation pulls the entry into context **next turn**; cards do not
  retro-affect the same turn that mentioned them.
- A space inside a trigger is part of the trigger. `Amanda, daughter`
  searches for the literal string `, daughter` (with leading space) as a
  separate trigger because of the space after the comma.
- Trailing space tricks (`orc `) prevent matches inside words like `porch`.
- Cards can cascade: card A's entry mentions card B's trigger → next turn
  card B activates. Useful for layered worldbuilding but doubles token cost.
- The AI does **not** see card titles, only the entry text. If the entry
  never says "Amanda", the AI may not know whose information this is.

## 5. Context and token budget

- Story Cards collectively receive roughly **25%** of the dynamic-token
  budget after required elements (instructions, plot essentials, summary,
  author's note, recent story).
- Cards are among the **first** elements removed when context overflows.
- Long entries get partial inclusion; the AI picks and chooses sentences,
  often dropping middle content. Keep important facts at the start and end.
- A card whose entry never gets activated still costs zero tokens — it's
  purely conditional.

## 6. AI Card Generation (current state, 2025-Q4)

The card editor now has two tabs: **Details** (the manual form) and
**Command** (the AI generator).

### 6.1 Command tab fields

- **Story Card Command Preset** — copy-ready prompt configurations for
  AI Dungeon's Story Card Command tab. V1.7 ships a curated preset set
  covering general-purpose prompts, category-specific prompts, structured
  field formats, and common use cases such as mysteries and relationships.
- **Story Card Command** — the prompt template. Must include the
  `{{title}}` token. 2000-character limit. Default text:
  > Generate an information card for `{{title}}` using clearly labeled
  > fields which are each on their own line, beginning with a field that
  > identifies the name of `{{title}}`. Each field should represent
  > characteristics of `{{title}}`. Limit the response to 750 characters
  > and do not use markdown or leave empty lines.
- **Entry Formatting** — three modes:
  - `None` — raw AI output, used as-is in the entry field.
  - `{}` — output wrapped/expected in curly-braced field blocks.
  - `[]` — output wrapped/expected in bracketed field blocks.
  These are post-processing hints for the generator about how it should
  shape the response (we have not yet verified whether the engine
  enforces this or only suggests it to the model).
- **Additional Generation Context** — free-text 2000-char field. In
  scenarios, matching words here can also activate related story cards
  (i.e. this acts like both a prompt extension and a keyword bag).
- **Log generations in notes** — toggle. When on, every generation
  (including retries) is appended to the card's `notes` field. Lossless
  history; great for picking-and-mixing parts of multiple gens.
- **Speed Create mode** — toggle. Skips the preview step so the
  generator immediately commits a card and opens the next one. Pairs
  well with batch worldbuilding.

### 6.2 Required token

`{{title}}` is the only required token. If the prompt template is missing
it, the editor's "Finish" button is disabled (verify in UI when this dump
is next reviewed).

### 6.3 Generation flow (observed)

1. User clicks Generate from the Command tab.
2. Engine builds context using the same builder as story generation,
   plus the contents of Additional Generation Context.
3. Engine substitutes `{{title}}` into the command template.
4. Result populates the entry field (and, if Entry Formatting ≠ `None`,
   may apply structural fixups).
5. If Log-to-notes is on, full output is also written to `notes`.
6. If Speed Create is on, the editor advances; otherwise the user
   reviews and can regenerate.

### 6.4 Repository representation

Command presets are tracked in
`src/data/storyCards.js` as `STORY_CARD_COMMAND_PRESETS`, parallel to
`STORY_CARDS` (examples) and `STORY_CARD_TEMPLATES` (manual templates).

A preset record carries the full AI Dungeon command configuration plus
the standard repository metadata (id, difficulty, impact, tags, source,
useCase).

The repository ships thirteen production presets:

1. **Basic List Prompt** (`preset-basic-list-prompt`): the AI Dungeon default flat list.
2. **Basic Prose Prompt** (`preset-basic-prose-prompt`): standard paragraph style.
3. **Condensed Prompt** (`preset-condensed-prompt`): high-density prose optimized for token-budget efficiency.
4. **Detailed Character Prompt** (`preset-character-detailed`): personality, motivation, relationship, and secret fields for Characters.
5. **Atmospheric Location Prompt** (`preset-location-atmospheric`): sensory and mood-focused descriptions for Locations.
6. **Mechanical Item Prompt** (`preset-item-mechanical`): capabilities, drawbacks, rarity, and condition for Items.
7. **Political Faction Prompt** (`preset-faction-political`): leadership, ideology, methods, allies, enemies, and influence for Factions.
8. **Bestiary Entry Prompt** (`preset-creature-bestiary`): habitat, diet, behavior, threat level, weaknesses, and harvest details for Creatures.
9. **Historical Event Prompt** (`preset-event-historical`): participants, causes, aftermath, and remembered consequences for Events.
10. **Curly Brace Fields Prompt** (`preset-curly-fields`): structured `{Field: value}` entries.
11. **Bracket Fields Prompt** (`preset-bracket-fields`): structured `[Field: value]` entries.
12. **Mystery Hook Prompt** (`preset-mystery-hook`): clues, suspects, red herrings, and hidden truth for mysteries.
13. **Relationship Dynamic Prompt** (`preset-relationship-dynamic`): relationship status, history, conflict, connection, and likely evolution.

## 7. Categories

Twelve canonical categories live in `STORY_CARD_CATEGORIES`. They are UI
organization only — the AI sees only the entry text. Categories double
as filter/sort buckets in the repo UI and as recommended grouping for
template/preset families.

## 8. Best practices (full list — guide ships a shorter subset)

- Repeat the subject's name in the entry.
- Aim for triggers ≥ 5 characters; otherwise lock with a trailing space
  or a punctuation boundary.
- Triggers should be natural in-prose references, not bracketed tags.
- 3–6 sentences for simple cards; 6–10 for complex ones.
- Front-load the most important fact. End with the second-most important.
- Keep cards descriptive ("Kira is suspicious of strangers") not
  prescriptive ("When the player meets Kira, she should be suspicious").
- Review cards periodically — outdated cards waste tokens and cause
  contradictions.
- Don't duplicate Plot Essentials in cards.
- For long-lived NPCs that *always* matter, prefer Plot Essentials; for
  contextual NPCs, Story Cards.

## 9. Edge cases and known weirdness

- **Spaces after commas** in the triggers list silently become part of
  the trigger string and almost always break activation.
- **Import replaces all existing cards** — it is not a merge.
- Card import/export is **web-only**. iOS and Android native apps do
  not currently expose this.
- Card title is not visible to the AI but is visible to the player in
  the card list and in the in-line entity tagging UI.
- Triggers containing punctuation occasionally fail to match across
  contracted forms ("don't" vs "do not").
- View Context window is the only reliable way to confirm what activated
  this turn.

## 10. Open questions

- Does Entry Formatting (`{}` / `[]`) enforce structure server-side, or
  is it only a hint passed to the model?
- What is the exact token budget percentage for cards on each
  context-length tier? The "~25%" figure is an approximation from
  Discord notes and may differ between models.
- Does "Additional Generation Context" persist into future generations
  on the same card, or is it re-read every time?
- Are Speed Create cards saved atomically or batched? (Matters for
  undo / interrupted sessions.)

## 11. Intentionally not in the guide

- Implementation-level details of the prompt builder (covered by the
  generation flow in §6.3 here, but not relevant to a card author).
- Historical AI-generation iterations prior to the Command-tab redesign.
- Speculation about future preset types.
- Per-model behavior differences in entry interpretation (too noisy and
  fast-changing to ship to end users).

## 12. Cross-references

- AI Instructions guide — for "always write this way" style rules that
  don't belong in cards.
- Plot Components guide — for context-assembly order, including where
  Story Cards sit relative to other components.
- Scripts guide — for programmatic card creation via the `worldEntries`
  state.
