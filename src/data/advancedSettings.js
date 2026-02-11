// =============================================================================
// BetterRepository - Advanced AI Settings Data
// =============================================================================
// Suggested model presets for AI Dungeon's Advanced Settings.
// Each preset contains community-tested values for Temperature, Top-K, Top-P,
// Presence Penalty, and Frequency Penalty.
//
// Guide content (setting explanations, tips, etc.) lives in the
// AdvancedSettingsGuide.vue component — this file only stores reusable data.
//
// PRESET SCHEMA:
// - id: string           Unique identifier (kebab-case)
// - name: string         Display name of the model
// - description: string  Optional note about the model variant
// - temperature: number  Controls randomness (0–2, default ~0.8)
// - topK: number         Limits token pool size (0–1000)
// - topP: number         Cumulative probability threshold (0–1)
// - presencePenalty: number   One-time penalty for used words (0–2)
// - frequencyPenalty: number  Cumulative penalty for repeated words (0–2)
// =============================================================================

// ============================================
// MODEL PRESETS
// ============================================
// Community-tested settings for each AI Dungeon model.
// Format: Temperature / Top-K / Top-P / Presence Penalty / Frequency Penalty
// ============================================
export const MODEL_PRESETS = [
  {
    id: 'deepseek-3-0',
    name: 'DeepSeek 3.0',
    temperature: 0.7,
    topK: 500,
    topP: 0.95,
    presencePenalty: 0.4,
    frequencyPenalty: 0.4,
  },
  {
    id: 'deepseek-3-1',
    name: 'DeepSeek 3.1',
    temperature: 1,
    topK: 500,
    topP: 0.95,
    presencePenalty: 0.4,
    frequencyPenalty: 0.4,
  },
  {
    id: 'deepseek-3-2',
    name: 'DeepSeek 3.2',
    temperature: 0.7,
    topK: 300,
    topP: 0.9,
    presencePenalty: 0.8,
    frequencyPenalty: 0.4,
  },
  {
    id: 'dynamic-deep',
    name: 'Dynamic Deep',
    temperature: 0.7,
    topK: 300,
    topP: 0.9,
    presencePenalty: 0.8,
    frequencyPenalty: 0.4,
  },
  {
    id: 'atlas',
    name: 'Atlas',
    description: 'DS 3.2 Cached',
    temperature: 0.7,
    topK: 300,
    topP: 0.9,
    presencePenalty: 0.8,
    frequencyPenalty: 0.4,
  },
  {
    id: 'raven',
    name: 'Raven',
    description: 'GLM 4.6 Cached',
    temperature: 0.8,
    topK: 200,
    topP: 0.95,
    presencePenalty: 0.8,
    frequencyPenalty: 0.6,
  },
  {
    id: 'wayfarer-large',
    name: 'Wayfarer Large',
    temperature: 1,
    topK: 500,
    topP: 0.95,
    presencePenalty: 0.5,
    frequencyPenalty: 0,
  },
  {
    id: 'harbinger',
    name: 'Harbinger',
    temperature: 1.3,
    topK: 450,
    topP: 0.5,
    presencePenalty: 0.2,
    frequencyPenalty: 0.2,
  },
  {
    id: 'hearthfire',
    name: 'Hearthfire',
    temperature: 1,
    topK: 500,
    topP: 0.95,
    presencePenalty: 0.4,
    frequencyPenalty: 0.4,
  },
  {
    id: 'muse',
    name: 'Muse',
    temperature: 1,
    topK: 250,
    topP: 1,
    presencePenalty: 0.25,
    frequencyPenalty: 0,
  },
  {
    id: 'madness',
    name: 'Madness',
    temperature: 1,
    topK: 500,
    topP: 0.95,
    presencePenalty: 0.4,
    frequencyPenalty: 0.4,
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get a model preset by its ID.
 * @param {string} id - The preset ID
 * @returns {object|undefined} The preset object, or undefined if not found
 */
export const getPresetById = (id) => MODEL_PRESETS.find(p => p.id === id)

/**
 * Get the display name for a preset, including its description if present.
 * @param {object} preset - A preset object
 * @returns {string} Formatted name, e.g. "Atlas (DS 3.2 Cached)"
 */
export const getPresetDisplayName = (preset) => {
  if (!preset) return ''
  return preset.description ? `${preset.name} (${preset.description})` : preset.name
}
