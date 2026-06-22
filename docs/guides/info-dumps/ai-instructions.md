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
- BetterEcosystem Project Management docs (maintained, current through
  Frontier):
  https://github.com/ComputerKWasTaken/BetterEcosystemProjectManagement/blob/main/docs/05-plot-components/ai-instructions.md
- AI Dungeon Discord — Instructions and prompt-engineering channels.
- Repo data: `src/data/aiInstructions.js` (CATEGORIES, INSTRUCTIONS,
  COMPONENTS, SETS).

## 3. Mechanics

- Custom AI Instructions **replace** the model defaults entirely; they
  do not stack (confirmed canonical). Writing a single instruction removes
  every built-in rule, so missing or vague rules can introduce new
  problems the defaults previously handled.
- AI Instructions sit at **position #1** — the very beginning of the
  context, before all other content. This establishes foundational rules
  before the AI sees any story content.
- Every model ships its own default system instructions tuned to that
  model's behavior. Custom instructions persist across model changes even
  though different models interpret them differently, so switching models
  may require revising instructions for model-specific quirks.
- Components are atomic instruction snippets (`COMPONENTS`). Sets
  (`SETS`) are curated bundles. The repository site exposes both.
- Instructions interact with author's note, plot essentials, and story
  cards via the context-assembly order documented in the Plot
  Components guide.
- **No direct `state.memory` field.** Unlike Plot Essentials
  (`state.memory.context`) and Author's Note (`state.memory.authorsNote`),
  AI Instructions cannot be set through `state.memory`. Scripts must
  rewrite them by editing the assembled context in the `onModelContext`
  hook.
- **Trimming priority is *medium*.** Per `allocation-rules.md`, when the
  Required Elements budget (~70% of context) is tight, the order is:
  Front Memory and Last Action are always kept full; then Author's Note,
  then Plot Essentials, then **AI Instructions**, and Story Summary is
  dropped last. So very long instructions can be trimmed from the end
  before higher-priority elements.

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

- Model-by-model interpretation differences are real and acknowledged by
  the canonical docs, but PM docs do **not** publish a per-model table or
  require any special syntax (no XML/role-tag framing is documented).
  Treat instructions as natural-English imperatives and re-test per model.
- Instructions cannot be set via `state.memory`; scripted modification
  happens by rewriting the context in `onModelContext` (see Scripts info
  dump). Plain Story-Card-based runtimes (Ultrascripts) do not edit
  Instructions directly.
- Token budget near the cap: Instructions are Required Elements (medium
  trim priority — see §3). They are trimmed from the end before
  Author's Note and Plot Essentials, but after Story Summary survives or
  is dropped. Put the most important directives first *and* last so a
  tail-trim is less likely to remove something critical.

## 7. Open questions

- Do all current AI Dungeon models honor the same instruction syntax?
  Canonical docs say interpretation differs per model but document no
  required XML/role-tag framing — so this stays partly unverified.
- Is there a hard char-count limit on the Instructions field? PM docs
  specify none; only "keep focused" guidance.

## 8. Intentionally not in the guide

- Comparative analysis of each model's default instructions (changes
  too often; would mislead).
- Discord folklore that we have not personally verified.

## 9. Cross-references

- Plot Components — context assembly order.
- Scripts — `onModelContext` hook (Instructions cannot be edited via
  the usual `state.memory` pattern; scripts work around this).
