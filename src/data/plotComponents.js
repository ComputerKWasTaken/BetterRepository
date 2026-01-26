// =============================================================================
// BetterRepository - Plot Components Data
// =============================================================================
// Templates for Author's Notes, Plot Essentials, and Story Summaries.
// These are ready-to-use templates that users can copy and customize.
// =============================================================================
//
// METADATA SCHEMA:
// - difficulty: 'beginner' | 'intermediate' | 'advanced'
// - impact: 'high' | 'medium' | 'low' - How much this affects story coherence
// - essential: boolean - Is this a must-have template?
// - useCase: string - When to use this template
// - combinesWith: string[] - Template IDs that work well together
// =============================================================================

// ============================================
// TEMPLATE CATEGORIES
// ============================================
export const TEMPLATE_CATEGORIES = [
  { 
    id: 'authors-note', 
    name: 'Author\'s Note', 
    icon: 'Feather', 
    color: 'bd-purple',
    description: 'Strongest influence on immediate output. Use for style, tone, genre, and scene-specific guidance.',
    strength: 'Strongest'
  },
  { 
    id: 'plot-essentials', 
    name: 'Plot Essentials', 
    icon: 'BookMarked', 
    color: 'bd-green',
    description: 'Always-relevant information: character details, relationships, world state, and companions.',
    strength: 'Moderate'
  },
  { 
    id: 'story-summary', 
    name: 'Story Summary', 
    icon: 'ScrollText', 
    color: 'bd-cyan',
    description: 'Track overall story direction, arcs, and long-term goals. Works with Auto Summarization.',
    strength: 'Moderate'
  }
]

// ============================================
// TEMPLATES
// ============================================
export const TEMPLATES = [
  // ==========================================
  // AUTHOR'S NOTE TEMPLATES
  // ==========================================
  // The most powerful placement. Keep concise!
  // ==========================================
  {
    id: 'authors-note-basic',
    name: 'Basic Author\'s Note',
    category: 'authors-note',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['essential', 'starter', 'setting', 'theme'],
    useCase: 'Starting any new story. Foundation for all Author\'s Notes.',
    combinesWith: ['plot-essentials-basic', 'current-scene'],
    description: 'Simple, effective Author\'s Note structure.',
    purpose: 'Foundation template. Keep it concise, AN has the strongest influence but shouldn\'t be overloaded.',
    content: `Setting: [Your setting here]
Theme: [Your theme here]
Style: [Your preferred writing style]

- \${character.name} is the user's character. Only the user writes \${character.name}'s speech and dialogue`
  },
  {
    id: 'authors-note-genre',
    name: 'Genre-Focused Note',
    category: 'authors-note',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    tags: ['genre', 'tone', 'pacing'],
    useCase: 'When you want strong genre adherence and consistent tone.',
    combinesWith: ['authors-note-basic'],
    description: 'Emphasizes genre conventions and tone.',
    purpose: 'For genre-specific stories. The AI will lean heavily into these conventions.',
    content: `Genre: [e.g., Dark Fantasy, Cozy Mystery, Space Opera]
Tone: [e.g., Gritty, Lighthearted, Tense]
Pacing: [e.g., Slow burn, Fast-paced, Methodical]

Focus on [specific element you want emphasized]`
  },
  {
    id: 'authors-note-mood',
    name: 'Mood & Atmosphere',
    category: 'authors-note',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['mood', 'atmosphere', 'scene', 'temporary'],
    useCase: 'Shifting mood temporarily for a specific scene.',
    description: 'Sets emotional atmosphere for the current scene.',
    purpose: 'Use to shift mood temporarily. Update or remove when the scene changes.',
    content: `Current mood: [e.g., tense, melancholic, hopeful, eerie]
Atmosphere: [e.g., foggy morning, bustling market, quiet tension]
Focus: [e.g., character emotions, environmental details, dialogue]`
  },
  {
    id: 'authors-note-pov',
    name: 'POV & Perspective Control',
    category: 'authors-note',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['pov', 'perspective', 'narration', 'voice'],
    useCase: 'When you need specific narrative perspective or narrator voice.',
    description: 'Controls point of view and narrative voice.',
    purpose: 'Defines who is telling the story and how. Strong effect on prose style.',
    content: `POV: [First person / Third person limited / Third person omniscient]
Narrator: [Reliable / Unreliable / Character name]
Voice: [e.g., Sardonic, Lyrical, Matter-of-fact, Stream of consciousness]`
  },
  {
    id: 'authors-note-scene-setup',
    name: 'Scene Setup Note',
    category: 'authors-note',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['scene', 'transition', 'setup', 'immediate'],
    useCase: 'When transitioning to a new scene or setting.',
    combinesWith: ['current-scene'],
    description: 'Guides the AI through scene transitions.',
    purpose: 'Helps AI understand what\'s happening NOW. Update frequently during scene changes.',
    content: `[Current Scene]
Location: [Where this scene takes place]
Present: [Who is here]
Situation: [What's happening or about to happen]
Tone: [Mood of this specific scene]`
  },
  {
    id: 'authors-note-combat',
    name: 'Combat/Action Scene Note',
    category: 'authors-note',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['combat', 'action', 'tactical', 'temporary'],
    useCase: 'During action sequences or combat encounters.',
    description: 'Optimizes output for action scenes.',
    purpose: 'Temporary note for combat. Remove when action concludes.',
    content: `[Action Scene Active]
Style: [Cinematic / Tactical / Brutal / Swashbuckling]
Pacing: Fast, beat-by-beat
Focus: Physical actions, positioning, consequences
- Track injuries and fatigue realistically
- Enemies act intelligently based on their capabilities`
  },
  
  // ==========================================
  // PLOT ESSENTIALS TEMPLATES
  // ==========================================
  // Always-relevant information. Update regularly!
  // ==========================================
  {
    id: 'plot-essentials-basic',
    name: 'Basic Character Sheet',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['essential', 'character', 'identity', 'starter'],
    useCase: 'Every story needs this. Your character\'s core identity.',
    combinesWith: ['relationship-tracker', 'current-scene'],
    description: 'Core character information template.',
    purpose: 'Foundation for character consistency. Update whenever your character changes.',
    content: `[Character: \${character.name}]
Species: [Species]
Age: [Age]
Gender: [Gender]
Appearance: [Key physical features]
Personality: [Core traits]
Background: [Brief history]

[Current Status]
Health: [Physical condition]
Inventory: [Important items carried]`
  },
  {
    id: 'plot-essentials-detailed',
    name: 'Detailed Character Profile',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['character', 'detailed', 'comprehensive'],
    useCase: 'For longer stories where character depth matters.',
    combinesWith: ['relationship-tracker', 'secrets-tracker'],
    description: 'Comprehensive character information.',
    purpose: 'More detail than basic sheet. Use for complex characters in long-running stories.',
    content: `[Character: \${character.name}]
Species: [Species] | Age: [Age] | Gender: [Gender]

Appearance:
- Build: [Body type, height]
- Features: [Face, hair, distinguishing marks]
- Style: [How they dress, carry themselves]

Personality:
- Core traits: [2-3 defining characteristics]
- Quirks: [Habits, mannerisms]
- Values: [What they care about]
- Fears: [What they avoid]

Background:
- Origin: [Where they're from]
- Occupation: [What they do]
- Key events: [Formative experiences]

Current State:
- Goals: [What they want]
- Struggles: [Current challenges]`
  },
  {
    id: 'relationship-tracker',
    name: 'Relationship Tracker',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['essential', 'relationships', 'npcs', 'dynamics'],
    useCase: 'Any story with recurring characters. Update after significant interactions.',
    combinesWith: ['plot-essentials-basic', 'npc-roster'],
    description: 'Track character relationships and dynamics.',
    purpose: 'Prevents relationship amnesia. Update status after meaningful interactions.',
    content: `[Relationships]
- [Name]: [Relation] - [Current status/feelings] - [Recent development]
- [Name]: [Relation] - [Current status/feelings] - [Recent development]
- [Name]: [Relation] - [Current status/feelings] - [Recent development]`
  },
  {
    id: 'party-tracker',
    name: 'Party/Companion Tracker',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    tags: ['party', 'companions', 'group', 'adventure'],
    useCase: 'Stories with traveling companions or party-based adventures.',
    combinesWith: ['plot-essentials-basic', 'current-scene'],
    description: 'Prevents companions from disappearing.',
    purpose: 'Critical for party-based stories. Without this, the AI often forgets companions exist.',
    content: `[Current Party]
- [Name]: [Role] - [Brief description] - [Current condition]
- [Name]: [Role] - [Brief description] - [Current condition]
- [Name]: [Role] - [Brief description] - [Current condition]

[Party Status]
Morale: [How the group is feeling]
Resources: [Food, money, supplies]
Shared gear: [Important shared items]`
  },
  {
    id: 'current-scene',
    name: 'Current Scene Anchor',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['essential', 'scene', 'context', 'high-context'],
    useCase: 'Especially important with high context (16k+). Update every scene change.',
    combinesWith: ['party-tracker', 'plot-essentials-basic'],
    description: 'Keeps the AI focused on the present scene.',
    purpose: 'Prevents the AI from reverting to old scenes. Critical for high-context stories.',
    content: `[Current Scene]
Location: [Where]
Present: [Who is here]
Doing: [What's happening]
Time: [When - time of day, how long since last scene]`
  },
  {
    id: 'npc-roster',
    name: 'NPC Roster',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['npcs', 'characters', 'cast', 'reference'],
    useCase: 'Stories with many recurring NPCs.',
    combinesWith: ['relationship-tracker'],
    description: 'Quick reference for important NPCs.',
    purpose: 'Helps AI keep NPCs consistent. Include only actively relevant characters.',
    content: `[Key NPCs]
- [Name]: [Role] | [Key trait] | [Current status]
- [Name]: [Role] | [Key trait] | [Current status]
- [Name]: [Role] | [Key trait] | [Current status]

[Recently Met]
- [Name]: [Who they are] | [How you met]`
  },
  {
    id: 'world-state',
    name: 'World State Tracker',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['world', 'state', 'environment', 'ongoing'],
    useCase: 'Stories with significant world events or environmental factors.',
    description: 'Track world-level events and conditions.',
    purpose: 'For stories where the world itself is changing. Update after major events.',
    content: `[World State]
Season/Weather: [Current conditions]
Political climate: [Tensions, alliances, conflicts]
Recent events: [Major happenings affecting the world]
Rumors: [What people are talking about]`
  },
  {
    id: 'schedule-tracker',
    name: 'Schedule & Time Tracker',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['schedule', 'time', 'events', 'planning'],
    useCase: 'Stories with time-sensitive events or daily routines.',
    combinesWith: ['current-scene'],
    description: 'Track scheduled events and time passage.',
    purpose: 'Helps AI understand when things should happen. Great for slice-of-life or timed plots.',
    content: `[Current Time]
Date: [Day/Month]
Time: [Approximate hour]

[Upcoming Events]
- [Date/Time]: [Event]
- [Date/Time]: [Event]

[Routine]
- Morning: [Typical activities]
- Afternoon: [Typical activities]
- Evening: [Typical activities]`
  },
  {
    id: 'secrets-tracker',
    name: 'Secrets & Hidden Info',
    category: 'plot-essentials',
    difficulty: 'advanced',
    impact: 'medium',
    essential: false,
    tags: ['secrets', 'mystery', 'hidden', 'knowledge'],
    useCase: 'Mystery stories or plots with hidden information.',
    description: 'Track what different characters know.',
    purpose: 'Prevents accidental reveals. The AI will respect knowledge boundaries.',
    content: `[Knowledge Boundaries]
\${character.name} knows:
- [Fact they know]
- [Fact they know]

\${character.name} does NOT know:
- [Hidden information]
- [Hidden information]

[Secrets in play]
- [Secret]: Known by [who knows]`
  },
  {
    id: 'inventory-detailed',
    name: 'Detailed Inventory',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    tags: ['inventory', 'items', 'equipment', 'resources'],
    useCase: 'Resource-management or survival stories.',
    description: 'Detailed item and resource tracking.',
    purpose: 'For stories where resources matter. The AI will reference these items.',
    content: `[Inventory]
Weapons: [List]
Armor/Clothing: [List]
Tools: [List]
Consumables: [Food, potions, etc.]
Valuables: [Money, gems, trade goods]
Special items: [Plot-relevant items]

[Encumbrance: Light/Medium/Heavy]`
  },
  
  // ==========================================
  // STORY SUMMARY TEMPLATES
  // ==========================================
  // Long-term story tracking. Update periodically.
  // ==========================================
  {
    id: 'story-summary-basic',
    name: 'Basic Story Summary',
    category: 'story-summary',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['essential', 'summary', 'plot', 'direction'],
    useCase: 'Any story longer than a few sessions. Update every major development.',
    combinesWith: ['story-arc-tracker'],
    description: 'Track overall story direction.',
    purpose: 'Helps the AI maintain long-term coherence. Write this yourself, auto-summary often gets things wrong.',
    content: `[Story So Far]
\${character.name} is [current situation/role].

Recent events:
- [Major event 1]
- [Major event 2]
- [Major event 3]

Current goal: [What you're trying to accomplish]
Main obstacle: [What's in the way]

Unresolved threads:
- [Ongoing plot point]
- [Ongoing plot point]`
  },
  {
    id: 'story-arc-tracker',
    name: 'Story Arc Tracker',
    category: 'story-summary',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['arcs', 'plot', 'multiple', 'complex'],
    useCase: 'Complex stories with multiple plotlines.',
    combinesWith: ['story-summary-basic', 'faction-tracker'],
    description: 'Track multiple story arcs simultaneously.',
    purpose: 'For stories juggling several plotlines. Helps AI balance different threads.',
    content: `[Active Arcs]
Main Plot: [Description] - Stage: [Beginning/Rising/Climax/Resolution]
Subplot A: [Description] - Stage: [Current stage]
Subplot B: [Description] - Stage: [Current stage]
Personal Arc: [Character development thread] - Stage: [Current stage]

[Completed Arcs]
- [Arc name]: [How it resolved]

[Foreshadowed]
- [Setup that hasn't paid off yet]`
  },
  {
    id: 'faction-tracker',
    name: 'Faction Relations',
    category: 'story-summary',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['factions', 'politics', 'reputation', 'groups'],
    useCase: 'Political intrigue or faction-based stories.',
    combinesWith: ['story-arc-tracker', 'npc-roster'],
    description: 'Track standing with different groups.',
    purpose: 'For political stories. The AI will consider faction dynamics in NPC behavior.',
    content: `[Faction Standing]
- [Faction A]: [Hostile/Unfriendly/Neutral/Friendly/Allied] - [Why]
- [Faction B]: [Standing] - [Why]
- [Faction C]: [Standing] - [Why]

[Faction Dynamics]
- [Faction A] vs [Faction B]: [Their relationship]
- [Faction B] allied with [Faction C]: [Context]

[Your reputation]
Known for: [What factions know about you]`
  },
  {
    id: 'mystery-tracker',
    name: 'Mystery Progress Tracker',
    category: 'story-summary',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['mystery', 'investigation', 'clues', 'deduction'],
    useCase: 'Mystery or investigation-focused stories.',
    combinesWith: ['secrets-tracker'],
    description: 'Track clues and deductions in mystery plots.',
    purpose: 'Helps maintain fair mystery. Tracks what\'s been discovered vs. what remains hidden.',
    content: `[The Mystery]
Central question: [What are we trying to figure out?]

[Discovered Clues]
- [Clue]: Found [where/when] - Implies [what it suggests]
- [Clue]: Found [where/when] - Implies [what it suggests]

[Suspects/Theories]
- [Theory 1]: Evidence for/against
- [Theory 2]: Evidence for/against

[Still Unknown]
- [Question we haven't answered]
- [Lead we haven't followed]`
  },
  {
    id: 'character-growth',
    name: 'Character Growth Log',
    category: 'story-summary',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['character', 'development', 'growth', 'arc'],
    useCase: 'Character-driven stories focused on personal development.',
    description: 'Track character development over time.',
    purpose: 'For character-focused stories. Helps AI write consistent character growth.',
    content: `[Character Arc: \${character.name}]
Started as: [Initial state/flaws/beliefs]
Currently: [Where they are now]
Growing toward: [Intended development]

[Key moments]
- [Event]: Changed [what about them]
- [Event]: Learned [what lesson]

[Internal conflicts]
- [Struggle they're dealing with]

[Relationships changed]
- [Person]: From [old dynamic] to [new dynamic]`
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get templates by category
export const getTemplatesByCategory = (categoryId) => {
  return TEMPLATES.filter(t => t.category === categoryId)
}

// Search templates
export const searchTemplates = (query) => {
  const lowerQuery = query.toLowerCase()
  return TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

// Get category by ID
export const getCategoryById = (categoryId) => {
  return TEMPLATE_CATEGORIES.find(c => c.id === categoryId)
}

// Get all Author's Note templates
export const getAuthorsNoteTemplates = () => getTemplatesByCategory('authors-note')

// Get all Plot Essentials templates
export const getPlotEssentialsTemplates = () => getTemplatesByCategory('plot-essentials')

// Get all Story Summary templates
export const getStorySummaryTemplates = () => getTemplatesByCategory('story-summary')

// ============================================
// METADATA HELPER FUNCTIONS
// ============================================

// Get essential templates (must-haves)
export const getEssentialTemplates = () => {
  return TEMPLATES.filter(t => t.essential === true)
}

// Get templates by difficulty
export const getTemplatesByDifficulty = (difficulty) => {
  return TEMPLATES.filter(t => t.difficulty === difficulty)
}

// Get beginner-friendly templates
export const getBeginnerTemplates = () => getTemplatesByDifficulty('beginner')

// Get templates by impact level
export const getTemplatesByImpact = (impact) => {
  return TEMPLATES.filter(t => t.impact === impact)
}

// Get high-impact templates
export const getHighImpactTemplates = () => getTemplatesByImpact('high')

// Get starter set (essential + beginner + high impact)
export const getStarterSet = () => {
  return TEMPLATES.filter(t => 
    t.essential || 
    (t.difficulty === 'beginner' && t.impact === 'high')
  )
}

// Get templates that combine well with a given template
export const getCombinations = (templateId) => {
  const template = TEMPLATES.find(t => t.id === templateId)
  if (!template?.combinesWith) return []
  return TEMPLATES.filter(t => template.combinesWith.includes(t.id))
}

// Get template by ID
export const getTemplateById = (templateId) => {
  return TEMPLATES.find(t => t.id === templateId)
}
