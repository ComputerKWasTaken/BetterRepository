// =============================================================================
// BetterRepository - AI Instructions Data
// =============================================================================
// A curated collection of AI Instructions for AI Dungeon.
//
// INSTRUCTION SCHEMA:
// {
//   id: string,                    // Unique identifier (kebab-case)
//   name: string,                  // Display name
//   category: string,              // Category ID
//   difficulty: 'beginner' | 'intermediate' | 'advanced',
//   impact: 'high' | 'medium' | 'low',  // How much it affects output
//   essential: boolean,            // Is this a must-know instruction?
//   placement: string,             // Best placement location
//   tags: string[],                // Searchable tags
//   models: string[],              // Compatible models (optional)
//   conflicts: string[],           // IDs of conflicting instructions (optional)
//   combinesWith: string[],        // IDs of complementary instructions (optional)
//   description: string,           // What it does (1 sentence)
//   purpose: string,               // Why/when to use it (1-2 sentences)
//   content: string,               // The actual instruction text (used if no variants)
//   variants: [                    // Alternative phrasings (optional) - if present, replaces content
//     {
//       label: string,             // Short label for this variant (e.g., "Basic", "Extended")
//       content: string            // The variant's instruction text
//     }
//   ],
//   groupId: string,               // Groups related instructions together (optional)
//   groupLabel: string,            // Display label for the group (only on first item)
//   groupOrder: number             // Order within the group (0 = primary/parent)
// }
//
// Community resources:
// - OffMetaGamer's Repository: https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU
// - AI Dungeon Discord: https://discord.com/invite/HB2YBZYjyf
// =============================================================================

import { PLACEMENTS, searchCollection, filterByCategory } from './shared.js'

// ============================================
// CATEGORIES
// ============================================
export const CATEGORIES = [
  { 
    id: 'complete-sets', 
    name: 'Complete Sets', 
    icon: 'Layers', 
    color: 'bd-amber', 
    description: 'Full instruction sets ready to use. Great starting points that cover multiple areas at once.',
    defaultPlacement: 'ai-instructions'
  },
  { 
    id: 'writing-style', 
    name: 'Writing Style', 
    icon: 'PenTool', 
    color: 'bd-blue', 
    description: 'Control how the AI writes: prose style, pacing, descriptions, and anti-repetition rules.',
    defaultPlacement: 'ai-instructions'
  },
  { 
    id: 'characterization', 
    name: 'Characterization', 
    icon: 'Users', 
    color: 'bd-purple', 
    description: 'How characters behave, speak, and interact. Personality, dialogue, and relationships.',
    defaultPlacement: 'ai-instructions'
  },
  { 
    id: 'coherence', 
    name: 'Story Coherence', 
    icon: 'Link', 
    color: 'bd-green', 
    description: 'Keep your story consistent. Prevent contradictions, manage character knowledge, and maintain continuity.',
    defaultPlacement: 'ai-instructions'
  },
  { 
    id: 'gameplay', 
    name: 'Gameplay & Control', 
    icon: 'Swords', 
    color: 'bd-pink', 
    description: 'Game mechanics, difficulty, consequences, and how much control you have over your character.',
    defaultPlacement: 'ai-instructions'
  },
  { 
    id: 'world-setting', 
    name: 'World & Setting', 
    icon: 'Globe', 
    color: 'bd-cyan', 
    description: 'Define your world: genre, era, magic systems, technology level, and cultural norms.',
    defaultPlacement: 'authors-note'
  },
  { 
    id: 'formatting', 
    name: 'Formatting & Output', 
    icon: 'Settings', 
    color: 'bd-gray', 
    description: 'Control output format: measurements, time display, dialogue formatting, and text style.',
    defaultPlacement: 'ai-instructions'
  }
]

// ============================================
// INSTRUCTIONS
// ============================================
export const INSTRUCTIONS = [
  // ==========================================
  // COMPLETE SETS
  // ==========================================
  // Full instruction sets that cover multiple areas. Great starting points.
  // ==========================================
  {
    id: 'set-comprehensive',
    name: 'Comprehensive Narrative Set',
    category: 'complete-sets',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['complete', 'narrative', 'immersive', 'thinking-mode'],
    models: ['DeepSeek', 'Raven'],
    combinesWith: ['natural-pacing', 'assume-ignorance'],
    groupId: 'essential-sets',
    groupLabel: 'Essential Instruction Sets',
    groupOrder: 0,
    description: 'Full instruction set for immersive, novel-quality storytelling.',
    purpose: 'The most thorough starting point for serious roleplay. Covers writing style, character behavior, anti-repetition, and pacing. Use this when you want the AI to feel like a skilled co-author.',
    content: `The user would like you to pick up a varying novel. Enable thinking mode and proceed by following all of the user's rules:
- Use second person, present tense
- Never echo, paraphrase, or restate the user's words, dialogue, or intentions in your response. Do not have NPCs repeat what the user just said. Move the story forward with NEW information only. Only show what happens NEXT
- Make every interaction sound genuine. Speech should flow between characters naturally, without repetition or flat voices. Let emotions change easily
- Ensure characters act and speak like how their personality is defined. Speech should never feel generic
- Prioritize complex personality over flat statements and overly clinical, diagnostic, or esoteric behavior
- Characters are people in situations, not job titles performing functions
- Characters should only know what they logically have information on. Avoid suspicion or automatic knowledge
- Characters are not clumsy, jumpy, or incompetent
- No character should physically harm/bruise/mark those they are close with
- Prioritize plot and dialogue over description. Keep description fresh; avoid describing the same detail or action multiple times
- NPCs avoid excessive aggression or doubt; ensure interactions are nuanced rather than unnecessarily harsh
- NPCs should never repeat any content provided by the user in actions, descriptions, speech, or dialogue; focus on new content instead
- Don't contradict the user's speech with NPC responses
- Allow the story to unfold moment by moment
- Continue EXACTLY from where the story leaves off without reiterating information or content
- Don't use memory as metaphor or metaphor as memory
- Avoid using simile, metaphor, and other figurative comparisons
- Avoid using sensory detail to create immediate intimacy
- Avoid describing ambient or continuous background sounds
- Avoid using sounds, smells, or vibrations. Use visuals instead
- Avoid negative definition, parataxis, hypotaxis, and defamiliarization
- Avoid foreshadowing or giving extra weight to small moments, let details remain rather than giving them undue importance or meaning
- Avoid using pauses in speech`
  },
  {
    id: 'set-streamlined',
    name: 'Streamlined Set',
    category: 'complete-sets',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['complete', 'efficient', 'beginner-friendly', 'thinking-mode'],
    models: ['DeepSeek', 'Atlas'],
    settings: { temperature: 0.6, maxTokens: 300, topP: 0.92, presencePenalty: 0.8 },
    combinesWith: ['more-speech', 'unique-names'],
    groupId: 'essential-sets',
    groupOrder: 1,
    description: 'Concise instruction set that delivers quality without token bloat.',
    purpose: 'Best for users who want good results without lengthy instructions. Covers the essentials: anti-repetition, natural dialogue, and character knowledge limits.',
    content: `The user would like you to pick up a varying novel about the main character. Enable thinking mode and proceed by following all of the user's rules:
- Write in second person, present tense
- Don't repeat, summarize, or fix
- Let the tone emerge from the scene. Avoid adding emotion or meaning beyond what characters do or say. Focus on the subtlety over explicitness
- Make every interaction sound genuine and fitting to the moment. Speech should flow between characters naturally, without repetition, reminding, or flat voices. Let emotions change easily
- Assume ignorance: Characters should only know what they logically have information on
- When introducing a character in a scene, mention their appearance like hairstyle and clothing and additional important details
- Focus on dialogue and character interaction
- Continue from where the story leaves off, even mid-sentence or mid-word`
  },
  {
    id: 'set-minimal',
    name: 'Minimal Essential Set',
    category: 'complete-sets',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['complete', 'minimal', 'token-efficient', 'universal'],
    models: ['All Models'],
    combinesWith: ['plot-over-description', 'genuine-interaction'],
    groupId: 'essential-sets',
    groupOrder: 2,
    description: 'The shortest effective instruction set, maximum impact, minimum tokens.',
    purpose: 'When token count matters or you want a light touch. Covers the absolute essentials that prevent the most common AI problems.',
    content: `The user would like you to pick up a varying novel about the main character's life:
- Write in second person, present tense
- Make every interaction sound genuine and fitting to the moment. Speech should flow between characters naturally, without repetition and should end promptly without going in circles. Let emotions change easily
- Characters are people in situations, not job titles performing functions
- Characters should only know what they logically have information on. Avoid suspicion or automatic knowledge unless supported by context
- Prioritize complex personality over flat statements and overly clinical, diagnostic, or esoteric behavior
- Express character emotions and internal state directly through dialogue without using contrasting language
- Characters never repeat what you say in any form
- Integrate user-provided narrative elements seamlessly into the ongoing story without restatement, rephrasing, or summary
- Ensure characters act and speak like how their personality is defined. Speech should never feel generic or trope-y
- Prioritize plot and dialogue over description. Avoid describing the same detail or action multiple times
- Generally assume that what you say is true rather than contradicting it with NPC responses
- Don't use sensory detail to create immediate intimacy
- Don't use memory as metaphor or metaphor as memory
- Continue mid-sentence after the last paragraph without repeating content`
  },
  {
    id: 'set-dialogue-only',
    name: 'Pure Dialogue Set',
    category: 'complete-sets',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['complete', 'dialogue', 'text-conversation', 'screenplay'],
    models: ['All Models'],
    conflicts: ['atmospheric-writing', 'vivid-action'],
    description: 'Stories told entirely through dialogue, no narration or description.',
    purpose: 'For text message conversations, screenplays, or pure dialogue experiences. Everything the reader learns comes from what characters say.',
    content: `You are a storyteller writing a story that consists entirely of text conversations. The story should include no descriptions or narration at all, instead focusing entirely on the dialogue between characters.

## Character Behavior
- Make every interaction sound genuine and fitting to the moment. Speech should flow between characters naturally, without repetition, reminding, or flat voices, and should end promptly without going in circles. Let emotions change easily
- Characters should only know what they logically have information on. Avoid suspicion or automatic knowledge unless supported by context
- Prioritize complex personality over flat statements and overly clinical, diagnostic, or esoteric behavior
- Avoid back-and-forth clichés (e.g., "you're such an asshole" / "you love it")
- Express character emotions and internal state directly through dialogue without using contrasting language (e.g., "but there's no real heat in it.")
- Characters never repeat what you say in any form

## Style Principles
- All speech and dialogue should be formatted as follows: NAME: "..."
- Only speech and dialogue is allowed, descriptions and narration are strictly prohibited`
  },

  // ==========================================
  // WRITING STYLE
  // ==========================================
  // Control how the AI writes: prose, pacing, descriptions, anti-repetition.
  // ==========================================
  
  // --- Anti-Repetition (Most Important) ---
  {
    id: 'anti-repetition',
    name: 'Anti-Repetition (Essential)',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['anti-repetition', 'essential', 'must-have'],
    models: ['All Models'],
    combinesWith: ['continue-exactly', 'plot-over-description'],
    groupId: 'anti-repetition',
    groupLabel: 'Anti-Repetition Instructions',
    groupOrder: 0,
    description: 'The single most important rule: prevents the AI from echoing or restating content.',
    purpose: 'Stops the #1 AI problem, repeating what you just wrote. This should be in almost every instruction set.',
    content: `- Don't repeat, summarize, or fix`
  },
  {
    id: 'anti-repetition-comprehensive',
    name: 'Anti-Repetition (Comprehensive)',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['anti-repetition', 'thorough', 'npc-echo'],
    models: ['All Models'],
    combinesWith: ['continue-exactly', 'dont-contradict-user'],
    groupId: 'anti-repetition',
    groupOrder: 1,
    description: 'Expanded anti-repetition rules covering NPCs, dialogue, and user input.',
    purpose: 'Use this instead of the basic version when you need stronger anti-echo protection, especially for NPC dialogue.',
    variants: [
      {
        label: 'Core Rule',
        content: '- Never echo, paraphrase, or restate the user\'s words, dialogue, or intentions. Move the story forward with NEW information only'
      },
      {
        label: 'Seamless Integration',
        content: '- Integrate user-provided narrative elements seamlessly into the ongoing story without restatement, treating them as established facts'
      },
      {
        label: 'NPC Echo Prevention',
        content: '- NPCs should never repeat any content provided by the user in actions, descriptions, speech, or dialogue'
      },
      {
        label: 'No Conversation Summary',
        content: '- Do not summarize conversations or repeat what characters just said'
      },
      {
        label: 'Advance Scene',
        content: '- Always advance the scene with fresh details and reactions'
      }
    ]
  },

  // --- Prose Style ---
  {
    id: 'show-dont-tell',
    name: 'Show Don\'t Tell',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['style', 'immersion', 'emotions', 'essential'],
    models: ['All Models'],
    combinesWith: ['subtlety-over-explicitness', 'genuine-interaction'],
    description: 'Demonstrates emotions through action rather than stating them directly.',
    purpose: 'The classic writing rule. Instead of "she was angry," show clenched fists and sharp words. Creates immersive, engaging prose.',
    variants: [
      {
        label: 'Basic',
        content: '- Show emotions through actions, expressions, and dialogue rather than stating them directly'
      },
      {
        label: 'With Example',
        content: '- Instead of "she was angry," show clenched fists, sharp words, or a slammed door'
      },
      {
        label: 'Reader Inference',
        content: '- Let readers infer emotional states from behavior'
      }
    ]
  },
  {
    id: 'subtlety-over-explicitness',
    name: 'Subtlety Over Explicitness',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['tone', 'subtlety', 'natural'],
    models: ['All Models'],
    combinesWith: ['show-dont-tell', 'no-foreshadowing'],
    conflicts: ['atmospheric-writing'],
    description: 'Lets tone emerge naturally from scenes rather than being stated.',
    purpose: 'Prevents the AI from over-explaining the mood. The scene speaks for itself, no need to tell readers how to feel.',
    content: `- Let the tone emerge from the scene. Avoid adding emotion or meaning beyond what characters do or say. Focus on subtlety over explicitness`
  },
  {
    id: 'no-figurative-language',
    name: 'No Figurative Language',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'literal', 'prose', 'no-metaphor'],
    models: ['All Models'],
    conflicts: ['limited-figurative', 'one-simile', 'atmospheric-writing'],
    description: 'Eliminates similes, metaphors, and figurative comparisons entirely.',
    purpose: 'For direct, concrete prose without flowery language. Good for action-heavy or minimalist styles.',
    content: `- Avoid using simile, metaphor, and other figurative comparisons`
  },
  {
    id: 'limited-figurative',
    name: 'Limited Figurative Language',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'balanced', 'prose', 'metaphor'],
    models: ['All Models'],
    conflicts: ['no-figurative-language'],
    description: 'Allows figurative language only when it genuinely clarifies meaning.',
    purpose: 'A balanced approach, metaphors are allowed but only when they help readers understand something unfamiliar.',
    content: `- Not all sentences need flair, only use similes, metaphors, and other figurative comparisons when it improves the reader's understanding (e.g., describing something unfamiliar, like the taste of a rare berry)`
  },
  {
    id: 'no-poetic-padding',
    name: 'No Poetic Padding',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'concise', 'direct', 'grounded'],
    models: ['All Models'],
    combinesWith: ['tight-prose', 'plot-over-description'],
    conflicts: ['atmospheric-writing'],
    description: 'Eliminates flowery, mood-forcing language and environmental personification.',
    purpose: 'For grounded, literal prose. Characters act; scenery does not "watch" or "whisper."',
    content: `- Avoid poetic padding, metaphors, or mood-forcing language
- Write in a grounded, literal style. Avoid shortcuts, quips, poetic phrasing, or environmental personification. Characters act; scenery does not`
  },
  {
    id: 'tight-prose',
    name: 'Tight Prose',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'concise', 'punchy', 'efficient'],
    models: ['All Models'],
    combinesWith: ['plot-over-description', 'no-poetic-padding'],
    description: 'Lean, efficient writing with no wasted words.',
    purpose: 'For fast-paced stories that need momentum. Every word earns its place.',
    content: `- Every word earns its place. Cut filler, hedging, and redundancy
- Prefer strong verbs over adverbs. Prefer specific nouns over adjective clusters
- Short paragraphs. White space is your friend`
  },
  {
    id: 'varied-sentences',
    name: 'Varied Sentence Structure',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'prose', 'variety', 'rhythm'],
    models: ['All Models'],
    description: 'Encourages variety in sentence structure and length.',
    purpose: 'Prevents monotonous prose where every sentence follows the same pattern.',
    content: `- Write sentences with varied openings, lengths, punctuation, and structures`
  },
  {
    id: 'no-negative-comparison',
    name: 'No Negative Comparison',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'affirmative', 'direct', 'tone'],
    models: ['All Models'],
    description: 'Prevents defining things by what they are NOT.',
    purpose: 'Stops phrases like "but there\'s no real heat in it" that undercut emotional moments. Describe what IS, not what ISN\'T.',
    content: `- Avoid using negative comparison and tone statements (e.g., "though there's no real heat in it"), express tone directly instead
- Avoid contrasting what does happen with what doesn't happen
- Define things by what they are, not by what they are not. Avoid phrases like "not X, but Y," "unlike Z," or "there's no B in it"`
  },
  {
    id: 'no-filtering',
    name: 'No Filtering/Narrative Distance',
    category: 'writing-style',
    difficulty: 'advanced',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'immersion', 'direct', 'pov'],
    models: ['All Models'],
    combinesWith: ['show-dont-tell'],
    description: 'Removes narrative distance and filtering phrases.',
    purpose: 'Creates immediate prose. Instead of "she could feel his hand," just "his hand touched her arm." Readers assume the POV character experiences things.',
    content: `- Avoid filtering and narrative distance (e.g., "Fernando's fingers adjusted the halter" → "Fernando adjusted the halter"; "she could feel Mathieu's hand" → "Mathieu put his hand on her arm")`
  },

  // --- Pacing & Flow ---
  {
    id: 'plot-over-description',
    name: 'Plot Over Description',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['pacing', 'dialogue', 'action', 'essential'],
    models: ['All Models'],
    combinesWith: ['more-speech', 'anti-repetition'],
    conflicts: ['atmospheric-writing'],
    description: 'Prioritizes plot advancement and dialogue over lengthy descriptions.',
    purpose: 'Keeps the story moving. Description is seasoning, not the main course.',
    content: `- Prioritize plot and dialogue over description. Keep description fresh; avoid describing the same detail or action multiple times`
  },
  {
    id: 'natural-pacing',
    name: 'Natural Pacing',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['pacing', 'scenes', 'flow', 'time'],
    models: ['All Models'],
    combinesWith: ['no-interrupt-scenes'],
    description: 'Lets scenes play out naturally without rushing or time-skipping.',
    purpose: 'Prevents the AI from jumping ahead past important moments. Scenes breathe, then transition smoothly.',
    variants: [
      {
        label: 'Slow Down',
        content: '- Slow down the pace and let scenes play out naturally without time skips or rushing'
      },
      {
        label: 'Smooth Transitions',
        content: '- Let scenes play out without interruption, and write smooth transitions between scenes'
      },
      {
        label: 'Quiet Moments',
        content: '- Allow quiet moments for conversation or introspection, but if nothing is going to happen, skip time until the next scene'
      }
    ]
  },
  {
    id: 'no-interrupt-scenes',
    name: 'No Scene Interruption',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['scenes', 'flow', 'pacing'],
    models: ['All Models'],
    combinesWith: ['natural-pacing'],
    description: 'Scenes complete without artificial interruption.',
    purpose: 'Prevents random events from breaking up scenes. Conversations finish; moments land.',
    content: `- Interrupting scenes is forbidden
- Let scenes play out without interruption, and write smooth transitions between scenes`
  },
  {
    id: 'no-foreshadowing',
    name: 'No Foreshadowing',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'subtlety', 'moments'],
    models: ['All Models'],
    combinesWith: ['subtlety-over-explicitness'],
    description: 'Prevents the AI from adding artificial weight to small moments.',
    purpose: 'Stops the AI from signaling "this is important!" Let details be details.',
    content: `- Avoid foreshadowing or giving extra weight to small moments, let details remain rather than giving them undue importance or meaning
- Avoid overstating the importance of things and overexplaining the significance of moments`
  },

  // --- Atmosphere & Description ---
  {
    id: 'no-sensory-intimacy',
    name: 'No Sensory Intimacy',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'atmosphere', 'sensory', 'restraint'],
    models: ['All Models'],
    combinesWith: ['no-background-atmosphere', 'no-smells'],
    conflicts: ['atmospheric-writing'],
    description: 'Prevents using sensory details to artificially create closeness.',
    purpose: 'Stops the AI from using sounds, smells, and textures to force emotional moments. Intimacy comes from character interaction, not ambient description.',
    content: `- Don't use sensory detail to create immediate intimacy
- Avoid using sounds, smells, or vibrations. Use visuals instead`
  },
  {
    id: 'no-background-atmosphere',
    name: 'No Background Atmosphere',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'atmosphere', 'minimal', 'focus'],
    models: ['All Models'],
    combinesWith: ['no-sensory-intimacy', 'plot-over-description'],
    conflicts: ['atmospheric-writing'],
    description: 'Minimizes atmospheric and background descriptions.',
    purpose: 'Keeps focus on characters and action. The environment doesn\'t set the mood, characters do.',
    content: `- Avoid describing ambient or continuous background sounds
- Ensure background details are minimal, and avoid atmospheric descriptions
- Avoid using background characters or environmental noises to express the mood of a scene`
  },
  {
    id: 'atmospheric-writing',
    name: 'Atmospheric Writing',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['atmosphere', 'mood', 'description', 'sensory', 'immersive'],
    models: ['All Models'],
    conflicts: ['no-sensory-intimacy', 'no-background-atmosphere', 'no-figurative-language', 'tight-prose'],
    description: 'Rich environmental and atmospheric descriptions.',
    purpose: 'For stories that benefit from immersive environmental detail, horror, literary fiction, exploration.',
    content: `- Use sensory details to establish atmosphere, sounds, smells, textures, lighting, temperature
- Let the environment reflect or contrast with the emotional tone of scenes
- Describe spaces as characters experience them, not as neutral observers`
  },
  {
    id: 'vivid-action',
    name: 'Vivid Action Sequences',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['action', 'pacing', 'detail', 'combat'],
    models: ['All Models'],
    combinesWith: ['varied-sentences'],
    description: 'Action scenes are detailed and moment-by-moment.',
    purpose: 'For exciting, cinematic action. Every punch lands, every dodge matters.',
    content: `- Write action sequences beat-by-beat with specific, visceral details
- Track positioning, movement, and consequences. Every action has a reaction
- Vary sentence length, short punchy sentences for fast action, longer for tension`
  },

  // --- Dialogue Focus ---
  {
    id: 'more-speech',
    name: 'More Dialogue',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'speech', 'focus', 'conversation'],
    models: ['All Models'],
    combinesWith: ['plot-over-description', 'genuine-interaction'],
    description: 'Emphasizes dialogue over description and narration.',
    purpose: 'Gets the AI to include more character conversation. Great for character-driven stories.',
    content: `- More speech
- Less atmospheric description
- Focus on dialogue and character interaction`
  },
  {
    id: 'genre-flexibility',
    name: 'Genre Flexibility',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['tone', 'genre', 'variety', 'adaptive'],
    models: ['All Models'],
    description: 'Allows the writing to adapt to different scene types.',
    purpose: 'Prevents the AI from maintaining one tone throughout. Serious scenes feel serious; funny moments can be light.',
    content: `- Always adjust language to match the scene and the intention of it. Allow for a variety of genres, serious, light-hearted, sentimental, and action-packed if that's what the scene calls for`
  },

  // --- Formatting (Writing) ---
  {
    id: 'plain-text-only',
    name: 'Plain Text Only',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['formatting', 'clean', 'simple', 'no-markdown'],
    models: ['All Models'],
    description: 'Outputs plain text without special formatting.',
    purpose: 'Prevents markdown, asterisks, or other formatting from appearing in the story.',
    content: `- Use only plain text, no formatting, special characters, or markup`
  },
  {
    id: 'adverbs-for-motion',
    name: 'Adverbs for Motion',
    category: 'writing-style',
    difficulty: 'advanced',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'description', 'concise', 'motion'],
    models: ['All Models'],
    description: 'Uses adverbs efficiently to describe movement.',
    purpose: 'A specific stylistic preference for concise motion description.',
    content: `- Use adverbs to describe motion and movement without descriptive fluff (e.g., "he moves deliberately, slowly" instead of "he moves, the motion slow and deliberate")`
  },
  {
    id: 'no-memory-metaphor',
    name: 'No Memory as Metaphor',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'memories', 'literal'],
    models: ['All Models'],
    description: 'Keeps memories literal, not used as metaphors or comparisons.',
    purpose: 'Prevents flowery memory comparisons and unnecessary flashbacks.',
    content: `- Don't use memory as metaphor, don't use metaphor as memory`
  },
  {
    id: 'one-simile',
    name: 'One Simile Limit',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['style', 'figurative', 'limited', 'simile'],
    models: ['All Models'],
    conflicts: ['no-figurative-language'],
    description: 'Limits similes to one per output.',
    purpose: 'Allows occasional figurative language without overuse.',
    content: `- Only one simile is allowed per output, and only at the end of your output`
  },
  {
    id: 'no-smells',
    name: 'No Smell Descriptions',
    category: 'writing-style',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['sensory', 'description', 'restriction', 'smell'],
    models: ['All Models'],
    combinesWith: ['no-sensory-intimacy'],
    description: 'Avoids describing smells and scents entirely.',
    purpose: 'If you find the AI overuses scent descriptions, this removes them.',
    content: `- Never describe smells or scents`
  },
  {
    id: 'no-sentimentality',
    name: 'No Over-Sentimentality',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['tone', 'mature', 'grounded'],
    models: ['All Models'],
    combinesWith: ['subtlety-over-explicitness'],
    description: 'Avoids saccharine or preachy moments.',
    purpose: 'Prevents after-school-special style moralizing and forced emotional beats.',
    content: `- Avoid over-sentimentality and after-school specialism`
  },
  {
    id: 'narrative-cues',
    name: 'Narrative Cue Handling',
    category: 'writing-style',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['input', 'formatting', 'flow', 'cues'],
    models: ['All Models'],
    description: 'Handles > narrative cues properly without echoing.',
    purpose: 'For stories using > to indicate actions. The AI incorporates them seamlessly without outputting the > symbol.',
    content: `- Lines beginning with > are narrative cues. Incorporate the action or event into your next response as part of the story, and continue narration from that point. Never output > tokens`
  },

  // ==========================================
  // CHARACTERIZATION
  // ==========================================
  // How characters behave, speak, and interact.
  // ==========================================
  
  // --- Core Character Behavior ---
  {
    id: 'genuine-interaction',
    name: 'Genuine Interactions',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['dialogue', 'natural', 'essential', 'must-have'],
    models: ['All Models'],
    combinesWith: ['show-dont-tell', 'more-speech', 'personality-defined-speech'],
    description: 'Makes character interactions feel authentic and natural.',
    purpose: 'Core rule for natural dialogue. Speech flows naturally, emotions shift realistically, conversations don\'t go in circles.',
    content: `- Make every interaction sound genuine and fitting to the moment. Speech should flow between characters naturally, without repetition, reminding, or flat voices, and should end promptly without going in circles. Let emotions change easily`
  },
  {
    id: 'personality-defined-speech',
    name: 'Personality-Defined Speech',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['dialogue', 'personality', 'consistency', 'voice'],
    models: ['All Models'],
    combinesWith: ['genuine-interaction', 'complex-personality'],
    description: 'Characters speak according to their defined personality.',
    purpose: 'Ensures characters maintain their established voice. A gruff warrior doesn\'t suddenly speak like a poet.',
    content: `- Ensure characters act and speak according to their defined personality. Speech should never feel generic, trope-y, or interrupt narrative flow
- Age-appropriate speech: teenagers talk like teenagers, children like children, not like little adults`
  },
  {
    id: 'complex-personality',
    name: 'Complex Personality',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['personality', 'depth', 'nuance', 'essential'],
    models: ['All Models'],
    combinesWith: ['personality-defined-speech', 'blended-personality'],
    description: 'Prioritizes nuanced character behavior over simple archetypes.',
    purpose: 'Prevents one-dimensional characters. A doctor is a person who happens to be a doctor, not "the doctor character."',
    content: `- Prioritize complex personality over flat statements and overly clinical, diagnostic, or esoteric behavior
- Characters are people in situations, not job titles performing functions`
  },
  {
    id: 'blended-personality',
    name: 'Blended Personality Traits',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['personality', 'complexity', 'nuance', 'advanced'],
    models: ['All Models'],
    combinesWith: ['complex-personality', 'allow-negative-emotions'],
    description: 'Fuses multiple personality traits into every action.',
    purpose: 'Multi-dimensional characters who express all their traits at once. A scared character can still crack jokes.',
    content: `- Fuse all personality traits into a blended, simultaneous voice in every action, thought, and dialogue. Avoid generic, trope and single-note reactions (e.g., a scared character can still joke; an angry one can be kind, an analytical person talks organically)`
  },

  // --- NPC Behavior ---
  {
    id: 'less-harsh-npcs',
    name: 'Less Harsh NPCs',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['npc-behavior', 'tone', 'gentle', 'friendly'],
    models: ['All Models'],
    conflicts: ['allow-negative-emotions'],
    description: 'NPCs are less aggressive and doubtful.',
    purpose: 'Prevents NPCs from being unnecessarily confrontational. Good for lighter stories or when the AI is too hostile.',
    content: `- NPCs avoid excessive aggression or doubt; ensure interactions are nuanced rather than unnecessarily harsh`
  },
  {
    id: 'no-physical-harm-close',
    name: 'No Harm to Close Characters',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['npc-behavior', 'relationships', 'safety'],
    models: ['All Models'],
    description: 'Characters don\'t physically hurt those they\'re close to.',
    purpose: 'Prevents unwanted violence between friendly characters. Also stops cliché "playful" exchanges.',
    content: `- No character should physically harm, bruise, or mark those they are close with
- Avoid cliché banter exchanges (e.g., "you're such an asshole" / "you love it")`
  },
  {
    id: 'characters-not-clumsy',
    name: 'Competent Characters',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['npc-behavior', 'competence', 'capable'],
    models: ['All Models'],
    description: 'Characters are competent and not unnecessarily clumsy.',
    purpose: 'Prevents comedic incompetence when you want capable characters.',
    content: `- Characters are not clumsy, jumpy, or incompetent
- Characters do not drive or operate machinery unsafely`
  },

  // --- Character Depth ---
  {
    id: 'unique-names',
    name: 'Unique Character Names',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['characters', 'names', 'introduction', 'worldbuilding'],
    models: ['All Models'],
    combinesWith: ['name-fixing'],
    description: 'New characters get unique, memorable names.',
    purpose: 'Ensures newly introduced characters have distinctive names and proper introductions.',
    content: `- Always give and write unique, memorable names when introducing a character
- Introduce characters throughout the story naturally, providing the characters a name, gender, fantasy race, and description of their appearance`
  },
  {
    id: 'profession-not-identity',
    name: 'Profession Not Identity',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['personality', 'depth', 'hobbies', 'interests'],
    models: ['All Models'],
    combinesWith: ['complex-personality', 'small-talk'],
    description: 'Characters have interests beyond their profession.',
    purpose: 'Makes characters feel human. The blacksmith also likes fishing and has opinions about the king.',
    content: `- Professions are part of a character's identity, not their entire identity. Ensure that every character has hobbies or other interests outside of their profession rather than focusing on it outside of work`
  },
  {
    id: 'location-is-backdrop',
    name: 'Location as Backdrop',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['setting', 'behavior', 'natural', 'context'],
    models: ['All Models'],
    description: 'Settings don\'t dictate character behavior.',
    purpose: 'Prevents stereotypical behavior based on location. People in a hospital aren\'t all somber.',
    content: `- Location is a backdrop, not a director. e.g., A hospital is a place with beds and medical equipment, not a mandate for tone, behavior, or language`
  },

  // --- Emotional Expression ---
  {
    id: 'direct-emotions',
    name: 'Direct Emotion Expression',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'emotions', 'direct', 'tone'],
    models: ['All Models'],
    combinesWith: ['no-negative-comparison'],
    description: 'Express emotions directly without contrasting language.',
    purpose: 'Removes hedging phrases that undercut emotional moments. No more "but there\'s no real heat in it."',
    content: `- Express character emotions and internal state directly through dialogue without using contrasting language (e.g., "but there's no real heat in it.")`
  },
  {
    id: 'allow-negative-emotions',
    name: 'Allow Negative Emotions',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['emotions', 'complexity', 'realism', 'conflict'],
    models: ['All Models'],
    combinesWith: ['blended-personality', 'deeper-topics'],
    conflicts: ['less-harsh-npcs'],
    description: 'Characters can have and act on negative emotions.',
    purpose: 'Allows realistic behavior including deception and conflict. Characters can be flawed and even antagonistic.',
    content: `- Allow characters to be coy, deceptive, rebellious, and unhappy; Characters can have negative emotions and act/react based on them
- Allow all characters to act on their own based on their own morals or allegiances
- Characters can be deeply flawed, and can deceive or manipulate the user`
  },
  {
    id: 'no-extreme-reactions',
    name: 'No Extreme Reactions',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['reactions', 'subtlety', 'natural', 'proportionate'],
    models: ['All Models'],
    description: 'Prevents over-the-top reactions to events.',
    purpose: 'Makes reactions proportionate. Not everything deserves gasping or dramatic pauses.',
    content: `- Avoid extreme reactions to surprising news`
  },

  // --- Dialogue Style ---
  {
    id: 'small-talk',
    name: 'Encourage Small Talk',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'conversation', 'natural', 'slice-of-life'],
    models: ['All Models'],
    combinesWith: ['profession-not-identity', 'genuine-interaction'],
    description: 'Characters engage in casual conversation.',
    purpose: 'Adds natural conversational moments. Characters talk about weather, hobbies, not just plot.',
    content: `- Encourage general small talk not directly story related between characters (e.g., hobbies, books, family, pets, movies, weather, etc.)`
  },
  {
    id: 'paralanguage',
    name: 'Natural Paralanguage',
    category: 'characterization',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'speech', 'natural', 'pauses'],
    models: ['All Models'],
    description: 'Uses pauses, gasps, and hesitations in speech.',
    purpose: 'Makes dialogue feel more natural with realistic speech patterns and verbal tics.',
    content: `- Use paralanguage freely (pauses, gasps, hesitations) naturally in speech`
  },
  {
    id: 'say-not-murmur',
    name: 'Say Instead of Murmur',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'speech-tags', 'simple', 'said'],
    models: ['All Models'],
    description: 'Uses simple speech tags instead of flowery alternatives.',
    purpose: 'Prevents overuse of fancy speech tags. Characters "say" things, they don\'t always "murmur."',
    content: `- Use "say" or "says" instead of "murmur" "murmurs" "mutter" or "mutters"`
  },
  {
    id: 'no-dry-humor',
    name: 'No Dry Humor/Sarcasm',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'tone', 'serious', 'no-snark'],
    models: ['All Models'],
    description: 'Avoids dry humor and sarcasm.',
    purpose: 'For more serious narratives without quippy dialogue or Marvel-style banter.',
    content: `- Don't use dry humor or sarcasm`
  },

  // --- Romance & Relationships ---
  {
    id: 'natural-romance',
    name: 'Natural Romance Development',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['romance', 'pacing', 'natural', 'relationships'],
    models: ['All Models'],
    combinesWith: ['sincere-bonding'],
    description: 'Romance develops naturally and slowly.',
    purpose: 'Prevents rushed or forced romantic developments. Relationships need time to grow.',
    content: `- Romance should develop naturally, not be forced or accelerated
- Focus on the slow development of relationships`
  },
  {
    id: 'romance-optional',
    name: 'Romance as Optional',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['romance', 'optional', 'player-choice', 'platonic'],
    models: ['All Models'],
    description: 'Romance is one possible path, not inevitable.',
    purpose: 'Allows for non-romantic story outcomes. Friendship and other arcs are equally valid.',
    content: `- Let romance be one of many outcomes, equally support friendship, solitude, or ambition arcs
- Treat all relationships as platonic unless \${character.name} chooses to pursue further`
  },
  {
    id: 'sincere-bonding',
    name: 'Sincere Bonding Moments',
    category: 'characterization',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['romance', 'emotional', 'moments', 'connection'],
    models: ['All Models'],
    combinesWith: ['natural-romance'],
    description: 'Allows genuine moments of connection.',
    purpose: 'Ensures emotional moments can land without being undercut by humor or deflection.',
    content: `- Ensure sincere moments of bonding or love are allowed`
  },

  // --- Specialized ---
  {
    id: 'gentle-ain',
    name: 'Gentle Caring Behavior',
    category: 'characterization',
    difficulty: 'advanced',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['behavior', 'caring', 'gentle', 'comfort'],
    models: ['Kooling Katie'],
    description: 'Replaces clinical observations with gentle care.',
    purpose: 'Changes how characters express concern, offers help instead of pointing out problems.',
    content: `[Kooling Katie: Gentle AIN]
- Caring behaviors must manifest as offers to help ('are you okay?" 'we can take a break') not observations
- Dialogue about physical state is prohibited unless phrased as a question about wellbeing
- Pauses automatically trigger default caring phrases from established relationship history
- All concern must be expressed through character-specific care (e.g., comforting words, offers to ease burdens)
- Avoid cliches ('e.g., you're favoring your left side' or 'you're shaking') and replace them with gentle check-ins instead`
  },

  // ==========================================
  // COHERENCE
  // ==========================================
  // Keep your story consistent. Prevent contradictions, manage knowledge.
  // ==========================================
  
  // --- Knowledge Management ---
  {
    id: 'assume-ignorance',
    name: 'Assume Ignorance',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['knowledge', 'consistency', 'essential', 'metagaming'],
    models: ['All Models'],
    combinesWith: ['no-contradict-lore', 'continue-exactly'],
    description: 'Characters only know what they could logically know.',
    purpose: 'Prevents metagaming. Characters don\'t know about events they weren\'t present for.',
    variants: [
      {
        label: 'Short',
        content: '- Assume strangers & ignorance'
      },
      {
        label: 'Standard',
        content: '- Characters should only know what they logically have information on. Avoid suspicion or automatic knowledge unless supported by context'
      },
      {
        label: 'Scene-Aware',
        content: '- Assume ignorance of events in previous scenes unless the character was involved in that scene'
      }
    ]
  },
  {
    id: 'strict-information',
    name: 'Strict Information Isolation',
    category: 'coherence',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['knowledge', 'consistency', 'strict', 'hardcore'],
    models: ['All Models'],
    combinesWith: ['assume-ignorance', 'lethal-world'],
    description: 'Rigorous enforcement of information barriers.',
    purpose: 'Strongest version of knowledge isolation. Characters ONLY know witnessed events. Information spreads through plausible channels.',
    content: `- Maintain strict information isolation: Character knowledge is restricted only to events they explicitly witnessed or were told on-screen
- Characters only know what they personally witnessed or were told; no off-screen, assumed, or shared knowledge exists
- Characters only know what they could realistically know: no giving directions to places they've never been, no referencing events they didn't witness or hear about, no enemies appearing without logical means to track the party; information spreads through plausible channels (rumors, messengers, witnesses), not narrative convenience`
  },
  {
    id: 'dont-contradict-user',
    name: 'Don\'t Contradict User',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['arguing', 'agreement', 'cooperation'],
    models: ['All Models'],
    combinesWith: ['anti-repetition'],
    description: 'NPCs don\'t argue with user statements.',
    purpose: 'Prevents the AI from having NPCs dispute what you say. They listen and consider.',
    content: `- Don't contradict the user's speech with NPC responses
- Generally assume that what the user inputs is true rather than contradicting it with responses
- Other characters listen to, consider, and are likely to go along with user suggestions`
  },

  // --- Story Consistency ---
  {
    id: 'no-contradict-lore',
    name: 'No Lore Contradiction',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['lore', 'consistency', 'timeline', 'essential'],
    models: ['All Models'],
    combinesWith: ['assume-ignorance', 'continue-exactly'],
    description: 'Never contradict established facts or timeline.',
    purpose: 'Maintains story consistency. What happened, happened. Facts don\'t change.',
    content: `- Never contradict established lore or timeline`
  },
  {
    id: 'minimal-history',
    name: 'Minimal History Addition',
    category: 'coherence',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['backstory', 'minimal', 'consistency', 'invention'],
    models: ['All Models'],
    description: 'Avoids inventing extensive history for things.',
    purpose: 'Prevents the AI from creating elaborate backstories that might conflict with your vision.',
    content: `- Add only minimal history to things. Avoid using memories as comparisons`
  },
  {
    id: 'no-add-characters',
    name: 'No Random New Characters',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['characters', 'scenes', 'restriction'],
    models: ['All Models'],
    description: 'Doesn\'t add characters to existing scenes.',
    purpose: 'Prevents random NPCs from appearing mid-scene without reason.',
    content: `- Don't add characters to an existing scene`
  },

  // --- Continuation & Flow ---
  {
    id: 'continue-exactly',
    name: 'Continue Exactly',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['continuation', 'flow', 'essential', 'must-have'],
    models: ['All Models'],
    combinesWith: ['anti-repetition', 'no-contradict-lore'],
    description: 'Continues precisely from where the story left off.',
    purpose: 'Prevents recaps or scene restarts. The story picks up exactly where it stopped.',
    variants: [
      {
        label: 'Basic',
        content: '- Continue EXACTLY from where the story leaves off without reiterating information or content'
      },
      {
        label: 'Mid-Sentence',
        content: '- Continue EXACTLY from where the story leaves off, even mid-sentence or mid-word, without reiterating information or content'
      },
      {
        label: 'Story Beat',
        content: '- Begin the new output at the next logical story beat, the next line of dialogue, the next sensory detail, the next internal thought, or the next physical action, without any introductory phrase or reference to the previous output\'s conclusion'
      }
    ]
  },
  {
    id: 'secrets-buildup',
    name: 'Secrets Require Buildup',
    category: 'coherence',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['pacing', 'secrets', 'suspense', 'mystery'],
    models: ['All Models'],
    combinesWith: ['mystery-mode'],
    description: 'Doesn\'t reveal secrets without proper buildup.',
    purpose: 'Maintains mystery and suspense. Revelations are earned, not dumped.',
    content: `- Don't reveal secrets without a careful buildup, suspense is more interesting than truth`
  },
  {
    id: 'realistic-time',
    name: 'Realistic Time Progression',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['time', 'realism', 'pacing'],
    models: ['All Models'],
    description: 'Time progresses realistically.',
    purpose: 'Actions take appropriate amounts of time. Travel isn\'t instant.',
    content: `- Progress time in a realistic manner`
  },
  {
    id: 'characters-dry-off',
    name: 'Characters Dry Off',
    category: 'coherence',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['state', 'continuity', 'minor'],
    models: ['All Models'],
    description: 'Characters fully dry after being wet.',
    purpose: 'Fixes the issue of characters staying perpetually damp.',
    content: `- Characters dry off completely and are not damp`
  },

  // ==========================================
  // GAMEPLAY & CONTROL
  // ==========================================
  // Game mechanics, difficulty, consequences, and player character control.
  // ==========================================
  
  // --- Difficulty & Consequences ---
  {
    id: 'realistic-consequences',
    name: 'Realistic Consequences',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    placement: 'ai-instructions',
    tags: ['consequences', 'difficulty', 'realism', 'essential'],
    models: ['All Models'],
    combinesWith: ['world-not-revolving', 'real-jeopardy'],
    conflicts: ['forgiving-world'],
    groupId: 'world-difficulty',
    groupLabel: 'World Difficulty Settings',
    groupOrder: 0,
    description: 'Actions have realistic consequences including failure.',
    purpose: 'Creates stakes by allowing real failure. The hero can lose. Bad choices hurt.',
    content: `- Resolve "no-win" situations with realistic consequences, including injury or death
- Let all characters face misfortune, adversity, and failure
- Avoid offering easy solutions to problems
- The main character can fail; do not offer easy solutions to difficult situations`
  },
  {
    id: 'world-not-revolving',
    name: 'World Doesn\'t Revolve Around PC',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['difficulty', 'realism', 'world', 'immersion'],
    models: ['All Models'],
    combinesWith: ['realistic-consequences', 'sandbox-freedom'],
    description: 'The world doesn\'t cater to the player character.',
    purpose: 'Creates an immersive world that exists beyond the protagonist. You\'re not special by default.',
    content: `- The world does not revolve around the \${character.name}, not everything goes your way
- \${character.name} is just a regular person. \${character.name} is not in charge and has no extra authority
- \${character.name} is a person living in the world, not its sole focus. They are not the automatic focus of every scene or the subject of every discussion but instead one participant`
  },
  {
    id: 'lethal-world',
    name: 'Lethal World',
    category: 'gameplay',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['difficulty', 'death', 'consequences', 'hardcore'],
    models: ['All Models'],
    combinesWith: ['realistic-consequences', 'strict-information', 'no-action-no-movement'],
    conflicts: ['forgiving-world'],
    groupId: 'world-difficulty',
    groupOrder: 2,
    description: 'Lethal threats can actually kill characters.',
    purpose: 'Real danger. Inaction or failure can mean death. For hardcore survival or dark stories.',
    content: `- The world is lethal for all entities. Inaction or failed action against a lethal threat results in death or severe injury based on logical causality. For \${character.name}, terminal consequences end the simulation with [GAMEOVER: <cause>]. For NPCs, death occurs when actions or events would logically cause it, without narrative protection. No character is immune to the world's physical laws. Severity of injury must match the cause; a minor wound doesn't kill, but a mortal blow does. NPCs with established motives may flee or surrender if plausible, but death is always an option if circumstances dictate.`
  },
  {
    id: 'real-jeopardy',
    name: 'Real Jeopardy',
    category: 'gameplay',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['stakes', 'consequences', 'risk', 'danger'],
    models: ['All Models'],
    combinesWith: ['realistic-consequences'],
    description: 'Allows the PC to face real danger and loss.',
    purpose: 'Meaningful stakes beyond physical harm, political, social, and material loss.',
    content: `- You are allowed to put \${character.name} in real jeopardy, physically, politically or socially,  when it makes sense for the scene and motivations. Such risks must remain credible, have stakes, and trigger realistic consequences (injury, loss of allies, reputational damage, shifts in faction power)`
  },
  {
    id: 'forgiving-world',
    name: 'Forgiving World',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['difficulty', 'casual', 'forgiving', 'easy'],
    models: ['All Models'],
    conflicts: ['lethal-world', 'realistic-consequences'],
    groupId: 'world-difficulty',
    groupOrder: 1,
    description: 'The world is lenient and allows recovery from mistakes.',
    purpose: 'For casual play. Mistakes have consequences but rarely fatal ones. Story continues.',
    content: `- The world is forgiving. Mistakes have consequences but rarely fatal ones
- NPCs give second chances, dangers have escape routes, and failure leads to setbacks rather than endings
- Focus on fun and story progression over punishing the player`
  },

  // --- Game Modes ---
  {
    id: 'sandbox-freedom',
    name: 'Sandbox Freedom',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['freedom', 'sandbox', 'open-world', 'exploration'],
    models: ['All Models'],
    combinesWith: ['world-not-revolving'],
    description: 'Complete freedom to explore and act without plot rails.',
    purpose: 'For open-world exploration. No forced narrative, no "correct" path.',
    content: `- The world exists independently of any main plot. \${character.name} is free to pursue any goal or none at all
- NPCs have their own lives and agendas that continue regardless of player involvement
- There is no "correct" path. Every direction leads to potential stories`
  },
  {
    id: 'mystery-mode',
    name: 'Mystery & Investigation',
    category: 'gameplay',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['mystery', 'investigation', 'clues', 'detective'],
    models: ['All Models'],
    combinesWith: ['secrets-buildup'],
    description: 'Supports mystery and investigation gameplay.',
    purpose: 'For detective stories. Fair clues, lying NPCs, and discoverable truth.',
    content: `- Plant clues fairly but don't make them obvious. Let \${character.name} piece things together
- NPCs have secrets and alibis. Some lie, some withhold, some genuinely don't know
- Red herrings exist but don't dominate. The truth should be discoverable through careful investigation`
  },

  // --- Combat ---
  {
    id: 'combat-set',
    name: 'Combat System (Aassmodeuss)',
    category: 'gameplay',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['combat', 'tactical', 'comprehensive', 'system'],
    models: ['Aassmodeuss'],
    combinesWith: ['realistic-consequences', 'lethal-world'],
    description: 'Comprehensive combat rules for tactical encounters.',
    purpose: 'Structured combat with tracking, consequences, and realistic outcomes. No guaranteed victories.',
    content: `[Aassmodeuss: Combat Set]
Combat (when engaged)
- Cinematic and tactical; track space, cover, and timing. Show actions beat-by-beat; no summary gloss
- Enemies and allies act on their own initiative. Injury, equipment state, and terrain meaningfully affect outcomes
- Severe injuries change capacity; death is possible. Keep consequences consistent with prior fiction
- No guaranteed victories; if retreat, surrender, or negotiation are the only viable options, surface them honestly

Failure, Challenge, and Consequences
- The world is indifferent: do not reshape events to secure user success. Apply outcomes per in-world logic and established stakes
- Consequences should be tangible and sometimes harsh: lasting injuries, resource loss, reputation shifts, time pressure, doors closing
- Keep consequences consistent with setting lore and prior fiction; foreshadow risks and provide diegetic warning signs where reasonable
- Allow recovery and alternative paths, but keep costs real; success after failure should feel earned, not granted
- Use failure to drive play: blocked actions and missing resources should push the user toward alternatives (search/scavenge, craft, buy/barter, negotiate, explore, wait). Surface viable next steps diegetically, with costs and risks`
  },

  // --- Character Control (how much the AI controls your character) ---
  {
    id: 'speech-only-control',
    name: 'Speech Only Control',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['control', 'dialogue', 'basic', 'speech'],
    models: ['All Models'],
    groupId: 'character-control',
    groupLabel: 'Character Control Levels',
    groupOrder: 0,
    description: 'AI never writes the player character\'s dialogue.',
    purpose: 'Basic control, you write what your character says. AI handles actions.',
    content: `- This is a roleplaying scenario. \${character.name} is the user's character. Only the user writes \${character.name}'s speech and dialogue; never decide what \${character.name} says`
  },
  {
    id: 'speech-action-control',
    name: 'Speech & Action Control',
    category: 'gameplay',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['control', 'actions', 'extended'],
    models: ['All Models'],
    combinesWith: ['speech-only-control'],
    groupId: 'character-control',
    groupOrder: 1,
    description: 'AI never writes speech or actions for PC.',
    purpose: 'Extended control, you write speech and decide actions.',
    content: `- Never decide or write speech for \${character.name}`
  },
  {
    id: 'advanced-control',
    name: 'Advanced Character Control',
    category: 'gameplay',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['control', 'comprehensive', 'strict', 'expressions'],
    models: ['All Models'],
    groupId: 'character-control',
    groupOrder: 2,
    description: 'Complete control over all PC behavior.',
    purpose: 'Full control including micro-expressions and reflexes. > indicates player actions.',
    content: `- Exclude \${character.name}'s speech, micro expressions, actions, reactions or reflex from all outputs. \${character.name} is the user's character.  > indicates a user generated action for \${character.name}
- Never write \${character.name}'s dialogue, thoughts, or actions. Narrative emerges from \${character.name}'s choices. \${character.name}'s input is defined with (>...)`
  },
  {
    id: 'total-control',
    name: 'Total Control (Leshok)',
    category: 'gameplay',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['control', 'absolute', 'strict', 'maximum'],
    models: ['Leshok'],
    combinesWith: ['no-action-no-movement'],
    groupId: 'character-control',
    groupOrder: 3,
    description: 'Absolute control over the player character.',
    purpose: 'Maximum control, no assumptions about PC at all. Not even posture or muscle tension.',
    content: `[Leshok's Total Control]
User Character Rules (\${character.name})
- Never control \${character.name} in action, thought, expression, reaction, or speech
- Do not assume \${character.name}'s facial expressions, posture, muscle tension, or involuntary reactions
- Do not progress or assume \${character.name}'s actions beyond user input
- Do not assume \${character.name}'s memory associations`
  },
  {
    id: 'no-action-no-movement',
    name: 'No Input = No Action',
    category: 'gameplay',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    placement: 'ai-instructions',
    tags: ['control', 'difficulty', 'strict', 'inaction'],
    models: ['All Models'],
    combinesWith: ['total-control', 'lethal-world'],
    description: 'The character doesn\'t act without player input.',
    purpose: 'Strictest control. No input = character does nothing. World reacts to inaction.',
    content: `- \${character.name}'s actions are defined solely by user input. No input means no action. The world reacts to inaction with logical consequences, including immediate death if applicable. Never describe any movement, thought, or reaction from \${character.name} without explicit input. This is non-negotiable.`
  },


  // ==========================================
  // FORMATTING & OUTPUT
  // ==========================================
  // Control output format: measurements, time, dialogue formatting.
  // ==========================================
  {
    id: 'metric-system',
    name: 'Metric System',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['formatting', 'units', 'metric', 'international'],
    models: ['All Models'],
    description: 'Uses metric measurements.',
    purpose: 'All measurements use the metric system (meters, kilometers, Celsius).',
    content: `- Use the official international metric system when describing any length, distance and other measurements.`
  },
  {
    id: '24-hour-time',
    name: '24-Hour Time Format',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['formatting', 'time', 'clock', '24h'],
    models: ['All Models'],
    description: 'Uses 24-hour time format.',
    purpose: 'Times displayed as 16:15 instead of 4:15 PM. Military/European style.',
    content: `- Use a 24-hour format when describing times (e.g. 16:15 instead of 4:15 PM)`
  },
  {
    id: 'dialogue-descriptors',
    name: 'Dialogue Descriptors',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['dialogue', 'formatting', 'action', 'anchoring'],
    models: ['All Models'],
    description: 'Adds action or description to dialogue.',
    purpose: 'Prevents floating dialogue. Every line is anchored to a character doing something.',
    content: `- Always add a short character descriptor or action to dialogue`
  },
  {
    id: 'no-phone-texts',
    name: 'No Phone Texts Unless Prompted',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['communication', 'phone', 'restriction', 'modern'],
    models: ['All Models'],
    description: 'Characters don\'t randomly text.',
    purpose: 'Prevents unwanted phone/text interruptions in modern settings.',
    content: `- Don't use phone texts unless prompted`
  },
  {
    id: 'focus-everyone',
    name: 'Focus on Everyone',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['scenes', 'characters', 'attention', 'ensemble'],
    models: ['All Models'],
    description: 'Gives attention to all characters in a scene.',
    purpose: 'Prevents characters from being forgotten mid-scene. Everyone present matters.',
    content: `- Focus on everyone in the scene`
  },
  {
    id: 'no-beast-features',
    name: 'No Extra Beast Features',
    category: 'formatting',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['appearance', 'characters', 'consistency', 'description'],
    models: ['All Models'],
    description: 'Only uses listed appearance features.',
    purpose: 'Prevents the AI from adding animal features not in character descriptions.',
    content: `- Don't describe beast or animal features on characters beyond what is listed in their Appearance`
  },
  {
    id: 'deeper-topics',
    name: 'Allow Deeper Topics',
    category: 'formatting',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['themes', 'mature', 'complexity', 'adult'],
    models: ['All Models'],
    combinesWith: ['allow-negative-emotions'],
    description: 'Allows exploration of uncomfortable topics.',
    purpose: 'Permits complex themes that don\'t have easy resolutions. Life isn\'t always neat.',
    content: `- Allow for exploration into deeper topics, even topics that are uncomfortable or ones that can't be wrapped up with a bow`
  },

  // ==========================================
  // WORLD & SETTING
  // ==========================================
  // Define your world: genre, era, magic systems, technology, culture.
  // ==========================================
  
  // --- Era & Culture Presets ---
  {
    id: 'modern-culture',
    name: 'Modern Real-World Culture',
    category: 'world-setting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'modern', 'culture', 'contemporary'],
    models: ['All Models'],
    description: 'References real modern culture and brands.',
    purpose: 'For modern settings. Real celebrities, brands, media, and current events exist.',
    content: `- The world reflects real modern-day culture in full, celebrities, music, sports, video games, technology brands, fashion labels, politics, and global events all exist naturally. They appear in dialogue, media, advertising, online chatter, or casual references`
  },
  {
    id: 'victorian-culture',
    name: 'Victorian Era Culture',
    category: 'world-setting',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'victorian', 'historical', '19th-century'],
    models: ['All Models'],
    conflicts: ['modern-culture', 'scifi-culture'],
    description: 'Enforces Victorian-era social norms and aesthetics.',
    purpose: 'For historically accurate Victorian/Edwardian settings. Class, propriety, and scandal.',
    content: `- The world reflects Victorian-era culture, strict social etiquette, class consciousness, industrialization, colonialism, and rigid gender roles exist naturally
- Characters speak with period-appropriate formality. Propriety governs public behavior; scandal is serious. Technology is steam and gas, not electric. Medicine is primitive. Religion and reputation matter deeply`
  },
  {
    id: 'medieval-culture',
    name: 'Medieval Culture',
    category: 'world-setting',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'medieval', 'historical', 'feudal'],
    models: ['All Models'],
    conflicts: ['modern-culture', 'scifi-culture'],
    description: 'Enforces medieval social norms and culture.',
    purpose: 'For historically accurate medieval settings. Strict hierarchy, no modern values.',
    content: `- The world reflects a fully realized medieval culture, nobility, guilds, faith, warfare, trade, healers, herbal lore, folklore, and county conflicts all exist naturally in dialogue and daily life
- Characters must follow strict medieval class and gender norms. Nobles defer to royalty in public; daughters do not speak over their fathers or the king unless directly invited. Strong women navigate power through wit, etiquette, or political maneuvering, not open rebellion. Backtalk, defiance, or disrespect toward the Crown is rare, dangerous, and never casual. Avoid modern speech or values; no democracy, no equality, no anachronistic attitudes`
  },
  {
    id: 'scifi-culture',
    name: 'Science Fiction Setting',
    category: 'world-setting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'scifi', 'futuristic', 'space'],
    models: ['All Models'],
    conflicts: ['victorian-culture', 'medieval-culture'],
    description: 'Establishes sci-fi conventions and technology.',
    purpose: 'For science fiction. FTL, AI, cybernetics are normal. No marveling at tech.',
    content: `- The world operates on science fiction logic, faster-than-light travel, AI, cybernetics, alien species, and advanced technology are normal parts of life
- Characters don't marvel at everyday technology. Spaceships are transport, not miracles. Focus on the human stories within the technological setting`
  },

  // --- Fantasy Settings ---
  {
    id: 'low-fantasy',
    name: 'Low Fantasy Setting',
    category: 'world-setting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'fantasy', 'low-magic', 'grounded'],
    models: ['All Models'],
    conflicts: ['high-fantasy'],
    description: 'Magic is rare and wondrous, not commonplace.',
    purpose: 'For grounded fantasy. Magic is exceptional, mysterious, and often dangerous.',
    content: `- Magic is rare, mysterious, and often dangerous. Most people have never seen real magic and may not believe in it
- Magical creatures are legendary, not common. When magic appears, it should feel significant and costly`
  },
  {
    id: 'high-fantasy',
    name: 'High Fantasy Setting',
    category: 'world-setting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['setting', 'fantasy', 'high-magic', 'epic'],
    models: ['All Models'],
    conflicts: ['low-fantasy'],
    combinesWith: ['magic-is-normal'],
    description: 'Magic is common and integrated into society.',
    purpose: 'For epic fantasy. Magic everywhere, enchanted items, magical transport, arcane schools.',
    content: `- Magic is woven into everyday life, enchanted items, magical transportation, arcane education, and supernatural creatures are normal
- Society has adapted to magic's existence. Cities may have magical infrastructure, laws govern spell use, and magical professions are respected`
  },

  // --- Magic Rules ---
  {
    id: 'magic-is-normal',
    name: 'Magic is Mundane',
    category: 'world-setting',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    placement: 'authors-note',
    tags: ['magic', 'fantasy', 'setting', 'normalized'],
    models: ['All Models'],
    combinesWith: ['high-fantasy'],
    description: 'Magic is normal, not constantly remarked upon.',
    purpose: 'Characters in magical worlds don\'t act amazed by magic. It\'s just physics here.',
    content: `- Magic is the setting's physics, not its constant subject. Characters live in a world where magic is real; they don't feel the need to constantly remark on it unless a specific, active magical event is occurring`
  },
  {
    id: 'magic-not-sensed',
    name: 'Magic Not Passively Sensed',
    category: 'world-setting',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['magic', 'fantasy', 'detection', 'auras'],
    models: ['All Models'],
    description: 'Magic is only detected when actively used.',
    purpose: 'Prevents "I sense magic" tropes. No passive aura detection.',
    content: `- Characters do not have perceivable magic auras, energy or feeling, magic is only detected when actively being used or cast. magic must be directly observed, not felt or sensed`
  },

  // --- Species & Names ---
  {
    id: 'no-anthropocentrism',
    name: 'No Anthropocentrism',
    category: 'world-setting',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    placement: 'ai-instructions',
    tags: ['species', 'fantasy', 'alien', 'nonhuman'],
    models: ['All Models'],
    description: 'Non-human species feel truly alien.',
    purpose: 'Makes fantasy races feel distinct from humans. Not just humans with pointy ears.',
    content: `- Avoid anthropocentrism, [SPECIES NAME] are truly alien`
  },
  {
    id: 'name-fixing',
    name: 'Unique Name Generation',
    category: 'world-setting',
    difficulty: 'advanced',
    impact: 'low',
    essential: false,
    placement: 'ai-instructions',
    tags: ['names', 'fantasy', 'generation', 'invention'],
    models: ['SeinSchatten'],
    combinesWith: ['unique-names'],
    description: 'Generates unique fantasy names instead of clichés.',
    purpose: 'Creates memorable invented names. No more "Thorin" or "Legolas" clones.',
    content: `[SeinSchatten]

[HUMAN & FANTASY RACES NAMES MUST BE: Invented syllable combinations only. NO real-world names. NO fantasy clichés.

FORMULA: Pick 2-4 random syllables and combine:
Use varied sounds: harsh (gar, bral, krel), soft (lum, ven, myn), exotic (qal, zix, pyx).
Never reuse the same name twice.

Example combinations: Bardor, Calven, Drelfenn, Garkor, Heljor, Kalren

Every character = NEW combination. Never reuse.]`
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get instructions by category
export const getInstructionsByCategory = (categoryId) => {
  return INSTRUCTIONS.filter(i => i.category === categoryId)
}

// Get category info by ID
export const getCategoryById = (categoryId) => {
  return CATEGORIES.find(c => c.id === categoryId)
}

// Get instruction by ID
export const getInstructionById = (instructionId) => {
  return INSTRUCTIONS.find(i => i.id === instructionId)
}

// Search instructions by query
export const searchInstructions = (query) => {
  const lowerQuery = query.toLowerCase()
  return INSTRUCTIONS.filter(i => 
    i.name.toLowerCase().includes(lowerQuery) ||
    i.description.toLowerCase().includes(lowerQuery) ||
    i.tags.some(t => t.toLowerCase().includes(lowerQuery))
  )
}

// ============================================
// NEW METADATA HELPERS
// ============================================

// Get all essential instructions (must-know for beginners)
export const getEssentialInstructions = () => {
  return INSTRUCTIONS.filter(i => i.essential === true)
}

// Get instructions by difficulty level
export const getByDifficulty = (difficulty) => {
  return INSTRUCTIONS.filter(i => i.difficulty === difficulty)
}

// Get instructions by impact level
export const getByImpact = (impact) => {
  return INSTRUCTIONS.filter(i => i.impact === impact)
}

// Get high-impact instructions (most effective)
export const getHighImpactInstructions = () => {
  return INSTRUCTIONS.filter(i => i.impact === 'high')
}

// Get beginner-friendly instructions
export const getBeginnerInstructions = () => {
  return INSTRUCTIONS.filter(i => i.difficulty === 'beginner')
}

// Get instructions that work well together with a given instruction
export const getCombinations = (instructionId) => {
  const instruction = getInstructionById(instructionId)
  if (!instruction || !instruction.combinesWith) return []
  return instruction.combinesWith
    .map(id => getInstructionById(id))
    .filter(Boolean)
}

// Get instructions that conflict with a given instruction
export const getConflicts = (instructionId) => {
  const instruction = getInstructionById(instructionId)
  if (!instruction || !instruction.conflicts) return []
  return instruction.conflicts
    .map(id => getInstructionById(id))
    .filter(Boolean)
}

// Check if two instructions conflict
export const doInstructionsConflict = (id1, id2) => {
  const i1 = getInstructionById(id1)
  const i2 = getInstructionById(id2)
  if (!i1 || !i2) return false
  return (i1.conflicts?.includes(id2) || i2.conflicts?.includes(id1))
}

// Get instructions by placement
export const getByPlacement = (placement) => {
  return INSTRUCTIONS.filter(i => i.placement === placement)
}

// Get instructions compatible with specific models
export const getByModel = (modelName) => {
  return INSTRUCTIONS.filter(i => 
    !i.models || 
    i.models.includes('All Models') || 
    i.models.some(m => m.toLowerCase().includes(modelName.toLowerCase()))
  )
}

// Get a starter set for beginners (essential + beginner-friendly + high-impact)
export const getStarterSet = () => {
  return INSTRUCTIONS.filter(i => 
    i.essential === true || 
    (i.difficulty === 'beginner' && i.impact === 'high')
  )
}

// Re-export from shared for convenience
export { PLACEMENTS, getPlacementById } from './shared.js'
