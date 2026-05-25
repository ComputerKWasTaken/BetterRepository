# AI Instructions — Info Dump

> Full knowledge base for AI Dungeon AI Instructions. The guide
> (`src/components/guides/AIInstructionsGuide.vue`) is a curated subset.
> Add new facts here first.

---

## 1. Definition

AI Instructions are author-written rules that control *how* the AI
behaves: writing style, pacing, character handling, world rules.
They sit at **position #1** in the context window — the first thing the
AI reads on every turn — which gives them outsized influence.

## 2. Source-of-truth references

- Official AI Dungeon documentation — AI Instructions section.
- LewdLeah's AI Dungeon docs (linked from credits).
- AI Dungeon Discord — Instructions and prompt-engineering channels.
- Repo data: `src/data/aiInstructions.js` (CATEGORIES, INSTRUCTIONS,
  COMPONENTS, SETS).

## 3. Mechanics

- Custom AI Instructions **replace** the model defaults entirely; they
  do not stack. Writing a single instruction removes every built-in rule.
- Every model ships its own default system instructions tuned to that
  model's behavior. Switching models with custom instructions can break
  behavior because the instructions were tuned to a different model.
- Components are atomic instruction snippets (`COMPONENTS`). Sets
  (`SETS`) are curated bundles. The repository site exposes both.
- Instructions interact with author's note, plot essentials, and story
  cards via the context-assembly order documented in the Plot
  Components guide.

## 4. "Right tool for the job"

| Need | Use |
|------|-----|
| "Always write this way" | AI Instructions |
| "Right now, do this" | Author's Note |
| "Always remember this fact" | Plot Essentials |
| "Remember this when relevant" | Story Cards |

## 5. Best practices (full list)

- Introduce custom instructions to fix **specific recurring problems**,
  not preemptively.
- Start from model defaults; only diverge once you have a documented
  complaint.
- Re-test instructions after switching models.
- Prefer short, declarative rules. Long paragraphs get partially ignored.
- Use the repo's COMPONENTS as building blocks; recombine into SETS.

## 6. Edge cases and known weirdness

- TODO: model-by-model interpretation differences (compile from Discord).
- TODO: how Instructions interact with scripted context modification
  via Ultrascripts / `onModelContext` (see Scripts info dump).
- TODO: token budget behavior when Instructions are near the context cap.

## 7. Open questions

- Do all current AI Dungeon models honor the same instruction syntax,
  or do some require XML-style framing, role tags, etc.?
- Is there a hard char-count limit on the Instructions field?

## 8. Intentionally not in the guide

- Comparative analysis of each model's default instructions (changes
  too often; would mislead).
- Discord folklore that we have not personally verified.

## 9. Cross-references

- Plot Components — context assembly order.
- Scripts — `onModelContext` hook (Instructions cannot be edited via
  the usual `state.memory` pattern; scripts work around this).
