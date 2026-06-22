# Advanced Settings — Info Dump

> Full knowledge base for AI Dungeon's per-adventure model settings
> (Context Length, Response Length, Temperature, Top-K, Top-P, Presence
> Penalty, Frequency Penalty, Model Presets). The guide
> (`src/components/guides/AdvancedSettingsGuide.vue`) is a curated subset.

---

## 1. Definition

"Advanced Settings" expose the underlying sampler and context parameters
that AI Dungeon would otherwise hide. They affect every turn until
changed and can be saved as **Model Presets**.

Note: in the current UI these are labeled **Model Settings** (formerly
"Advanced Settings"). They were opened to **all players** in the
Renaissance update — previously premium-only. Settings are per-model and
saved per-model.

## 2. Source-of-truth references

- BetterEcosystem Project Management docs (canonical, current through
  Frontier):
  https://github.com/ComputerKWasTaken/BetterEcosystemProjectManagement/tree/main/docs/06-ai-behavior
  and `.../docs/02-context/allocation-rules.md`.
- Official AI Dungeon model settings documentation.
- Repo data: `src/data/advancedSettings.js` (`MODEL_PRESETS`).
- AI Dungeon Discord — model-tuning channel.

## 3. Settings reference

| Setting | Range / default (canonical) | Effect |
|---------|-----------------------------|--------|
| Context Length | tier-dependent (Free limited → up to 128K on Mythic); set to max for your tier | How many tokens of past content the model sees. |
| Response Length | varies by model; default ~**150** | Max tokens generated per turn. Counts toward next turn's context. |
| Temperature | 0.0 – ~2.0; default **0.8** | Randomness. Higher = more creative / wilder. |
| Top-K | integer; **20–40** balanced (≤10 very constrained, 100+ negligible). Some models only | Restricts sampling to the K most likely tokens. |
| Top-P | 0.0 – 1.0; default ~**0.9** (0.85–0.95 typical) | Nucleus sampling — cumulative probability cap. |
| Presence Penalty | small; default not published. Some models only | Fixed penalty for any token that has appeared at least once (binary). |
| Frequency Penalty | small; default not published. Some models only | Penalty proportional to how often a token appeared (graduated). |
| Repetition Penalty | default **1.0** (none); typical **1.01–1.10**; even 1.05 can be too high | Multiplicative penalty discouraging reuse; high values hurt common words. |

Temperature bands (rough): 0.2–0.4 robotic/very predictable · 0.5–0.7
coherent · 0.7–0.9 balanced (default) · 1.0–1.2 creative · 1.3+ chaotic.

## 4. Mechanics and interactions

- Sampler pipeline order (canonical): **Top-K and Top-P filter the token
  set → Temperature adjusts the relative probabilities → a token is
  selected** from the filtered, adjusted distribution.
- Presence Penalty is **binary** (token appeared or not); Frequency
  Penalty **scales with count**. A "Count Penalty" exists on some models,
  similar to frequency penalty (exact implementation is model-specific).
- Penalties **stack** (Repetition + Presence + Frequency all apply at
  once), so combined effects can be stronger than intended — use only what
  you need. Latitude's fine-tuned models (e.g. Wayfarer) often have
  built-in repetition handling, making external penalties less necessary.
- Context Length is capped by the model's own context window and by the
  subscription tier. Some models have a lower context limit regardless of
  the tier setting.
- Frontier's "Optimized Context" setting (supported models) can raise the
  effective context for your tier via KV caching and allows the context to
  overflow the set length by up to ~4K tokens before trimming, so trimming
  doesn't shift the front of the story every turn.

## 5. Model Presets

Stored in `MODEL_PRESETS` as named bundles of the above settings.
The repository exposes them through `getPresetById` and
`getPresetDisplayName`. Presets are model-specific; applying a preset
built for one model to another model is *possible* but often produces
worse results than the destination model's own defaults.

## 6. Best practices

- Change one setting at a time and observe several turns before judging.
- Treat presets as starting points, not destinations.
- Lower Temperature for tight, consistent prose; raise it for wilder,
  more surprising prose.
- Use frequency/presence penalties sparingly — too high and the model
  starts avoiding necessary vocabulary (character names, key nouns).

## 7. Context-length truncation order

When the context budget is tight, AI Dungeon splits the window into
Required Elements (~70% cap) and Dynamic Elements (~30%, but Required
releases unused space back to Dynamic). Trim order:

**Required Elements** (highest-survival first):
1. Front Memory — always full
2. Last Action — always full
3. Author's Note — trimmed if necessary
4. Plot Essentials — trimmed if necessary
5. AI Instructions — trimmed if necessary
6. Story Summary — may be excluded entirely

**Dynamic Elements pool** (with Memory Bank on): Story Cards ~25% /
History ~50% / Memory Bank ~25%; (Memory Bank off): Story Cards ~25% /
History ~75%. Within the dynamic pool, Story Cards / History / Memory
Bank are the flexible tier dropped first overall.

## 8. Open questions

- **Penalty application point** — PM docs document the Top-K/Top-P →
  Temperature → selection order but do **not** say whether the penalties
  act on raw logits before or after that filtering/scaling. (This dump
  previously asserted "penalties act on logits before sampling"; treat
  that as unconfirmed.)
- **Per-model defaults** — AI Dungeon does **not** publish numeric
  per-model defaults; docs only note models respond differently and some
  parameters are unavailable on some models.
- **Response Length vs. model max-output cap** — PM docs are silent on how
  the setting interacts with a model's inherent output limit.
- **Penalty-stacking formula** — confirmed that penalties stack, but
  whether additively, multiplicatively, or otherwise is undocumented.
- **Dynamic-pool internal priority** — exact drop order among Story Cards
  vs. History vs. Memory Bank when the dynamic pool itself is tight.

## 9. Intentionally not in the guide

- Mathematical derivation of nucleus sampling.
- Speculation about future settings (e.g. typical-P, mirostat).

## 10. Cross-references

- AI Instructions info dump — for how Instructions length pressures
  Context Length budget.
- Plot Components info dump — for the assembly order that determines
  what gets dropped when Context Length is tight.
