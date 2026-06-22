# Plot Components — Info Dump

> Full knowledge base for Plot Components (Plot Essentials, Author's
> Note, Story Summary, Front Memory). The guide
> (`src/components/guides/PlotComponentsGuide.vue`) is a curated subset.

---

## 1. Definition

"Plot Components" is the umbrella term for the always-on text panels
attached to a scenario or adventure that the engine assembles into the
context window every turn. They are distinct from Story Cards
(conditional, triggered).

Per the canonical PM docs, AI Dungeon classifies **five** Plot
Components (the UI panels under Plot): **AI Instructions**, **Plot
Essentials**, **Story Summary**, **Author's Note**, and **Third Person**
(a formatting/perspective toggle, not a context text block). This info
dump focuses on the text-block components; AI Instructions has its own
info dump, and Third Person is covered there as a perspective control.

**Front Memory is *not* a Plot Component.** It is a script-injected
context element (`state.memory.frontMemory`) with no UI panel. It is
documented here because it shares the same context-assembly stage as the
other components.

## 2. Source-of-truth references

- BetterEcosystem Project Management docs (canonical, current through
  Frontier):
  https://github.com/ComputerKWasTaken/BetterEcosystemProjectManagement/tree/main/docs/05-plot-components
  and `.../docs/02-context/context-assembly-order.md`.
- Official AI Dungeon documentation — Plot section.
- Repo data: `src/data/plotComponents.js` (TEMPLATES, TEMPLATE_CATEGORIES).
- AI Dungeon Discord — pinned context-assembly diagrams.

## 3. The components

| Component | `state.memory.*` | Visibility | Role |
|-----------|------------------|------------|------|
| AI Instructions | *(no direct state field — edit via `onModelContext`)* | UI editable | "Always behave this way" (system-level; see AI Instructions info dump) |
| Plot Essentials | `context` | UI editable | "Always remember this fact" |
| Story Summary | *(no dedicated script field)* | UI editable / auto | Recap of older story, compressed for context |
| Author's Note | `authorsNote` | UI editable | "Right now, do this" / style nudge |
| Front Memory | `frontMemory` | Script-only | Hidden text injected at very end of context (not a UI Plot Component) |

> Note: Plot Essentials maps to `state.memory.context` (it is the UI
> rename of the old "Memory" field). Setting `state.memory.context` from
> a script overrides the UI-configured Plot Essentials. AI Instructions
> has **no** direct `state.memory` field; scripts must rewrite it through
> the `onModelContext` hook.

## 4. Context assembly order (canonical, per PM docs)

The engine assembles context in this exact order (top = earliest, which
the AI reads first; bottom = latest, closest to generation):

1. **AI Instructions**
2. **Plot Essentials**
3. **Story Cards** (triggered; prefaced with `World Lore:`)
4. **Story Summary**
5. **Memory Bank** (semantically retrieved, ranked by embedding similarity)
6. **History** (recent actions, most recent last)
7. **Author's Note** (near the end, immediately before the last action)
8. **Last Action** (most recent player input; always included in full)
9. **Front Memory** (very end, after the last action; scripts-only)
10. **Buffer Tokens** (reserved space so the model has room to respond)

Key corrections vs. older diagrams: **Story Cards come *before* Story
Summary** (position 3 vs. 4), and **Memory Bank** sits at position 5
between Story Summary and History. Author's Note is at position 7,
directly before the Last Action — not floating at a model-specific
offset. Front Memory's near-final position (9) is what gives it
disproportionate influence and why scripts use it heavily.

### 4.1 Trimming priority (when the context budget is tight)

Per `allocation-rules.md`, Required Elements are capped at ~70% of the
context window (Dynamic Elements get the rest, though Required Elements
release unused space back to Dynamic). When trimming is needed:

- **Always full:** Front Memory, Last Action
- **High priority (trimmed only if needed):** Author's Note, Plot Essentials
- **Medium priority:** AI Instructions, Story Summary (Story Summary may
  be excluded entirely)
- **Flexible / dropped first:** Story Cards, History, Memory Bank

Frontier's "Optimized Context" setting reorders the context so the most
stable content (AI Instructions, Plot Essentials, Story Summary, history)
comes first and the most dynamic content (Memory Bank, Story Cards,
Author's Note, last action, Front Memory) comes last, maximizing KV-cache
reuse. See the Frontier release notes and `context-optimization.md`.

## 5. Best practices

- Plot Essentials for facts that are *always* true and short.
- Author's Note for transient style and pacing nudges; rotate often.
  Keep it to keywords or 1–4 short sentences — long notes risk being read
  as narrative rather than meta guidance, and may be trimmed.
- Story Summary should be regenerated after major story shifts. With Auto
  Summarization on you can still edit it manually; the re-summarizer
  incorporates your edits into future summaries.
- Front Memory is the most powerful and the easiest to misuse; only
  scripted experiences should write to it routinely.

## 6. Templates

Repository `TEMPLATES` are pre-built Plot Component bodies grouped by
`TEMPLATE_CATEGORIES`. Each template is targeted at a specific component
(`authorsNote`, `plotEssentials`, `storySummary`) — they are not
interchangeable across components.

## 7. Edge cases

- Author's Note is wrapped by the engine in `[Author's Note: ...]`. The
  bracket framing is **emergent**, not a hard control token — the model
  learned to treat bracketed author-style notes as meta guidance. Using
  square brackets heavily elsewhere (Plot Essentials, Story Cards) dilutes
  the contrast and weakens the note's effect.
- Author's Note changes set from a script take effect on the *next*
  generation, not the current turn (e.g. if set inside `onOutput`).
- Plot Essentials silently truncates when too long. The exact limit is
  not exposed in the UI; it competes inside the Required Elements ~70% cap,
  so longer Plot Essentials means less room for history.
- Front Memory is set via `state.memory.frontMemory` (persistent state),
  so it persists across turns unless a script clears it.
- The engine deduplicates **Memory Bank** entries against the Story
  Summary (it skips memories already present in the summary). PM docs do
  not document dedup across any other pair of components.

## 8. Open questions

- Documented exact token budgets per component on each context tier (PM
  docs give the 70/30 Required/Dynamic split but no per-component caps).
- Author's Note insertion depth: PM docs fix it at position 7 (before the
  last action) and do **not** confirm the older "per-model offset" claim.
  Whether any model shifts it remains unverified.
- Whether the engine deduplicates content across components *other* than
  Memory Bank ↔ Story Summary.

## 9. Intentionally not in the guide

- Implementation history (field renames: UI "Memory" → "Plot Essentials",
  API still uses `memory`/`context`).
- Speculation about future components.

## 10. Cross-references

- Story Cards info dump — for the "conditional" injection model.
- AI Instructions info dump — for the position-#1 system block.
- Scripts info dump — for `onModelContext` and `state.memory.frontMemory`.
