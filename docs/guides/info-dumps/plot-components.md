# Plot Components — Info Dump

> Full knowledge base for Plot Components (Plot Essentials, Author's
> Note, Story Summary, Front Memory). The guide
> (`src/components/guides/PlotComponentsGuide.vue`) is a curated subset.

---

## 1. Definition

"Plot Components" is the umbrella term for the always-on text panels
attached to a scenario or adventure that the engine assembles into the
context window every turn. They are distinct from Story Cards
(conditional) and AI Instructions (system-level).

## 2. Source-of-truth references

- Official AI Dungeon documentation — Plot section.
- Repo data: `src/data/plotComponents.js` (TEMPLATES, TEMPLATE_CATEGORIES).
- AI Dungeon Discord — pinned context-assembly diagrams.

## 3. The four components

| Component | `state.memory.*` | Visibility | Role |
|-----------|------------------|------------|------|
| Plot Essentials | `frontMemory`-adjacent | UI editable | "Always remember this fact" |
| Author's Note | `authorsNote` | UI editable | "Right now, do this" / style nudge |
| Story Summary | `storyCards`-adjacent summary | UI editable | Recap of older story compressed for context |
| Front Memory | `frontMemory` | Script-only | Hidden text injected at very end of context |

## 4. Context assembly order (approximate, current)

1. AI Instructions
2. Plot Essentials
3. Story Summary
4. Active Story Cards (triggered)
5. Recent Story (most recent actions)
6. Author's Note (injected near the end with model-specific offset)
7. Front Memory (very end, scripts-only)

The exact offsets vary per model. Front Memory's late position is what
gives it disproportionate influence and why scripts use it heavily.

## 5. Best practices

- Plot Essentials for facts that are *always* true and short.
- Author's Note for transient style and pacing nudges; rotate often.
- Story Summary should be regenerated after major story shifts.
- Front Memory is the most powerful and the easiest to misuse; only
  scripted experiences should write to it routinely.

## 6. Templates

Repository `TEMPLATES` are pre-built Plot Component bodies grouped by
`TEMPLATE_CATEGORIES`. Each template is targeted at a specific component
(`authorsNote`, `plotEssentials`, `storySummary`) — they are not
interchangeable across components.

## 7. Edge cases

- Author's Note's "depth" (how far from the end it's inserted) varies
  by model; what looks like "the same instruction" can land in very
  different positions.
- Plot Essentials silently truncates when too long. The exact limit is
  not exposed in the UI.
- Front Memory persists across turns unless a script clears it.

## 8. Open questions

- Documented exact token budgets per component on each context tier.
- Whether the engine deduplicates content that appears in multiple
  components.

## 9. Intentionally not in the guide

- Implementation history (was it always 4 components? — yes, but
  fields have been renamed).
- Speculation about future components.

## 10. Cross-references

- Story Cards info dump — for the "conditional" injection model.
- AI Instructions info dump — for the position-#1 system block.
- Scripts info dump — for `onModelContext` and `state.memory.frontMemory`.
