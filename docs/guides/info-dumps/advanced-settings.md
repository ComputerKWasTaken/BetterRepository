# Advanced Settings — Info Dump

> Full knowledge base for AI Dungeon's per-adventure model settings
> (Context Length, Response Length, Temperature, Top-K, Top-P, Presence
> Penalty, Frequency Penalty, Model Presets). The guide
> (`src/components/guides/AdvancedSettingsGuide.vue`) is a curated subset.

---

## 1. Definition

Advanced Settings expose the underlying sampler and context parameters
that AI Dungeon would otherwise hide. They affect every turn until
changed and can be saved as **Model Presets**.

## 2. Source-of-truth references

- Official AI Dungeon model settings documentation.
- Repo data: `src/data/advancedSettings.js` (`MODEL_PRESETS`).
- AI Dungeon Discord — model-tuning channel.

## 3. Settings reference

| Setting | Range (typical) | Effect |
|---------|-----------------|--------|
| Context Length | tier-dependent | How many tokens of past content the model sees. |
| Response Length | small | How long the AI may generate per turn. |
| Temperature | 0.0 – ~1.5 | Randomness. Higher = more creative / wilder. |
| Top-K | int | Restricts sampling to K most likely tokens. |
| Top-P | 0.0 – 1.0 | Nucleus sampling — cumulative probability cap. |
| Presence Penalty | small | Penalizes any token that has appeared. Reduces topic repetition. |
| Frequency Penalty | small | Penalizes tokens by how often they appeared. Reduces word repetition. |

TODO: fill in concrete recommended ranges per model from Discord
testing notes.

## 4. Mechanics and interactions

- Top-K and Top-P compose: the model first restricts to K, then applies P.
- Temperature is applied after K/P filtering.
- Presence and Frequency penalties act on the model's token logits
  before sampling.
- Context Length is capped by the model's own context window and by
  the subscription tier.

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

## 7. Edge cases

- TODO: model-by-model behavior of penalty stacking.
- TODO: context-length truncation order (which component drops first).

## 8. Open questions

- Documented per-model defaults — does AI Dungeon publish them?
- How does Response Length interact with the model's own max-output cap?

## 9. Intentionally not in the guide

- Mathematical derivation of nucleus sampling.
- Speculation about future settings (e.g. typical-P, mirostat).

## 10. Cross-references

- AI Instructions info dump — for how Instructions length pressures
  Context Length budget.
- Plot Components info dump — for the assembly order that determines
  what gets dropped when Context Length is tight.
