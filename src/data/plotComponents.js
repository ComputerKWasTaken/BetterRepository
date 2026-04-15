// =============================================================================
// BetterRepository - Plot Components Data
// =============================================================================
// Templates for Author's Notes, Plot Essentials, and Story Summaries.
// These are ready-to-use templates that users can copy and customize.
// =============================================================================

// ============================================
// TEMPLATE RULESET (Internal Documentation)
// All templates MUST follow these rules.
// ============================================
//
// 1. FILL-IN-THE-BLANK FORMAT
//    Templates use bracket placeholders [like this] or ${} syntax for
//    user-customizable fields. Every placeholder must be self-explanatory.
//    Example: "Setting: [e.g., Dark Fantasy, Sci-Fi, Modern]" not "Setting: "
//
// 2. CATEGORY ASSIGNMENT
//    Every template must have a `category` field matching one of the
//    TEMPLATE_CATEGORIES ids: authors-note, plot-essentials, story-summary, nsfw.
//    The category determines placement strength and intended use.
//
// 3. CONCISE & STRUCTURED
//    Templates should be as short as possible while remaining useful.
//    Author's Notes especially must stay concise because they have the strongest
//    influence but limited space. Use line breaks and labels for clarity.
//
// 4. DIFFICULTY RATING
//    - beginner: Simple fill-in-the-blank, works immediately
//    - intermediate: Requires understanding of AI behavior or story structure
//    - advanced: Complex multi-section templates needing regular updates
//
// 5. IMPACT RATING
//    - high: Strongly shapes AI output (AN templates, character sheet)
//    - medium: Noticeably guides output (scene anchors, trackers)
//    - low: Subtle organizational aid (glossaries, inventories)
//
// 6. SELF-CONTAINED PURPOSE
//    Each template must serve a distinct, standalone purpose. Templates
//    should not require other templates to function, though they can
//    complement each other (noted via `combinesWith`).
//
// 7. NO REDUNDANCY
//    Before creating a template, verify it doesn't duplicate an existing
//    one. If similar, consider extending the existing template with more
//    placeholder options rather than creating a near-duplicate.
//
// 8. METADATA COMPLETENESS
//    Every template must include: id, name, category, difficulty, impact,
//    essential, tags, description, purpose, and content. Optional fields:
//    useCase, combinesWith.
//

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
  },
  { 
    id: 'nsfw', 
    name: 'NSFW / Adult', 
    icon: 'Flame', 
    color: 'bd-red',
    description: 'Templates for adult content: intimate scenes, romantic encounters, and explicit scenarios. 18+ only.',
    strength: 'High'
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
    content: `Setting: 
Theme: 

- This is a roleplaying scenario. \${character.name} is the user's character. Only the user writes \${character.name}'s speech and dialogue; never decide what \${character.name} says`
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
Focus: [specific element to emphasize]`
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
    content: `Mood: [e.g., tense, melancholic, hopeful, eerie]
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
Voice: [e.g., Sardonic, Lyrical, Matter-of-fact]`
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
Location: [where]
Present: [who is here]
Situation: [what's happening]
Tone: [mood of this scene]`
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
- Track injuries and fatigue realistically`
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
    content: `{Your Name: \${character.name}
Species: \${Species:}
Age: \${Age:}
Gender: \${Gender:}
Appearance: \${Appearance:}
Description: \${Description:}}

[Current Date (MM/DD): 6/1
Schedule:
6/1: ]

[Memories:
- ]`
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
Appearance: [Build, features, distinguishing marks]
Personality: [2-3 core traits, quirks]
Values: [What they care about]
Background: [Origin, occupation]
Goals: [What they want]
Struggles: [Current challenges]`
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
- [Name]: [Relation] - [Status/feelings] - [Recent change]
- [Name]: [Relation] - [Status/feelings] - [Recent change]
- [Name]: [Relation] - [Status/feelings] - [Recent change]`
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
- [Name]: [Role] - [Brief description] - [Condition]
- [Name]: [Role] - [Brief description] - [Condition]
- [Name]: [Role] - [Brief description] - [Condition]

Morale: [How the group feels]
Supplies: [Food, money, gear]`
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
Location: [where]
Present: [who is here]
Doing: [what's happening]
Time: [when]`
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
- [Name]: [Role] | [Key trait] | [Status]
- [Name]: [Role] | [Key trait] | [Status]
- [Name]: [Role] | [Key trait] | [Status]`
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
Season/Weather: [current conditions]
Political climate: [tensions, alliances]
Recent events: [major happenings]
Rumors: [what people are talking about]`
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
Date: [Day/Month] | Time: [Hour]

[Upcoming Events]
- [Date/Time]: [Event]
- [Date/Time]: [Event]`
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

\${character.name} does NOT know:
- [Hidden information]

[Secrets in play]
- [Secret]: Known by [who]`
  },
  {
    id: 'inventory-detailed',
    name: 'Inventory Tracker',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    tags: ['inventory', 'items', 'equipment', 'resources'],
    useCase: 'Resource-management or survival stories.',
    description: 'Track items and resources.',
    purpose: 'For stories where resources matter. The AI will reference these items.',
    content: `[Inventory]
Weapons: [list]
Armor/Clothing: [list]
Consumables: [food, potions, etc.]
Valuables: [money, gems]
Key items: [plot-relevant items]`
  },
  {
    id: 'quest-log',
    name: 'Quest/Mission Log',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['quests', 'objectives', 'missions', 'tasks'],
    useCase: 'RPG-style stories with clear objectives.',
    combinesWith: ['story-summary-basic'],
    description: 'Track active quests and missions.',
    purpose: 'Keeps the AI focused on current goals. Helps prevent "what was I doing?" moments.',
    content: `[Active Quests]
- [Main Quest]: [Objective] - [In Progress]
- [Side Quest]: [Objective] - [Started]

Current goal: [Immediate next step]`
  },
  {
    id: 'location-tracker',
    name: 'Location/Base Tracker',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['location', 'base', 'rooms', 'facilities'],
    useCase: 'Base building, ship management, or dungeon crawling.',
    combinesWith: ['inventory-detailed'],
    description: 'Track the status of specific locations or facilities.',
    purpose: 'For managing a base, ship, or exploring a complex dungeon.',
    content: `[Location: Name]
- [Room/Area]: [Status] - [Notes]
- [Room/Area]: [Status] - [Notes]
- [Room/Area]: [Status] - [Notes]`
  },
  {
    id: 'glossary-terms',
    name: 'Glossary of Terms',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    tags: ['lore', 'terms', 'definitions', 'glossary'],
    useCase: 'Sci-Fi or Fantasy with many unique proper nouns.',
    combinesWith: ['plot-essentials-basic'],
    description: 'Define setting-specific terms and keywords.',
    purpose: 'Helps the AI use made-up words correctly. Essential for hard sci-fi or high fantasy.',
    content: `[Glossary]
- [Term]: [Definition]
- [Term]: [Definition]
- [Term]: [Definition]`
  },

  // ==========================================
  // NEW PLOT ESSENTIALS — General Use
  // ==========================================
  {
    id: 'abilities-powers',
    name: 'Abilities & Powers',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    tags: ['abilities', 'powers', 'magic', 'skills', 'combat'],
    useCase: 'Stories with magic systems, superpowers, or special skills.',
    combinesWith: ['plot-essentials-basic', 'rules-constraints'],
    description: 'Track character abilities, magic, and skills.',
    purpose: 'Keeps the AI consistent about what your character can and cannot do.',
    content: `[Abilities: \${character.name}]
- [Ability]: [What it does] - [Limitation/cost]
- [Ability]: [What it does] - [Limitation/cost]
- [Ability]: [What it does] - [Limitation/cost]

Cannot do: [Important limitations]`
  },
  {
    id: 'rules-constraints',
    name: 'Rules & Constraints',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['rules', 'constraints', 'world', 'laws', 'limits'],
    useCase: 'Stories with hard rules like magic systems, sci-fi physics, or social laws.',
    combinesWith: ['world-state', 'glossary-terms'],
    description: 'Establish world rules the AI must follow.',
    purpose: 'Prevents the AI from breaking your world\'s rules. Very effective for consistency.',
    content: `[World Rules]
- [Rule]: [How it works]
- [Rule]: [How it works]
- [Rule]: [How it works]

[Consequences for breaking rules]
- [What happens if broken]`
  },
  {
    id: 'character-voice',
    name: 'Character Voice Guide',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['voice', 'speech', 'dialogue', 'personality', 'mannerisms'],
    useCase: 'When NPCs keep sounding the same or you want distinct speech patterns.',
    combinesWith: ['npc-roster', 'plot-essentials-basic'],
    description: 'Define how characters talk and behave.',
    purpose: 'Gives NPCs distinct voices. Prevents everyone from sounding identical.',
    content: `[Voice: Character Name]
Speech style: [formal / casual / slang / archaic]
Verbal tics: [catchphrases, filler words, accent notes]
Personality in dialogue: [blunt / evasive / warm / sarcastic]

[Voice: Character Name]
Speech style: [formal / casual / slang / archaic]
Verbal tics: [catchphrases, filler words, accent notes]
Personality in dialogue: [blunt / evasive / warm / sarcastic]`
  },
  {
    id: 'reputation-standing',
    name: 'Reputation & Standing',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['reputation', 'standing', 'social', 'perception', 'fame'],
    useCase: 'When how NPCs treat you matters to the story.',
    combinesWith: ['relationship-tracker', 'world-state'],
    description: 'Track how others perceive your character.',
    purpose: 'Influences how NPCs react to you. Great for social-heavy stories.',
    content: `[Reputation: \${character.name}]
Known as: [title, nickname, or description]
General perception: [respected / feared / unknown / infamous]
- [Group/Place]: [How they see you] - [Why]
- [Group/Place]: [How they see you] - [Why]`
  },
  {
    id: 'condition-status',
    name: 'Condition & Status Effects',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['condition', 'status', 'injuries', 'buffs', 'debuffs', 'health'],
    useCase: 'Survival, combat-heavy, or consequence-driven stories.',
    combinesWith: ['plot-essentials-basic', 'party-tracker'],
    description: 'Track injuries, status effects, and ongoing conditions.',
    purpose: 'Prevents the AI from forgetting you\'re injured or affected by something.',
    content: `[Condition: \${character.name}]
Health: [Healthy / Injured / Critical]
Active effects:
- [Effect]: [Source] - [Duration/severity]
- [Effect]: [Source] - [Duration/severity]

Needs: [Hunger, sleep, morale, etc.]`
  },
  {
    id: 'travel-journey',
    name: 'Travel & Journey Tracker',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['travel', 'journey', 'map', 'destination', 'exploration'],
    useCase: 'Road trips, quests, exploration, or any travel-based story.',
    combinesWith: ['current-scene', 'party-tracker'],
    description: 'Track travel routes and journey progress.',
    purpose: 'Keeps the AI aware of where you are, where you\'re going, and what\'s in between.',
    content: `[Journey]
From: [Origin]
To: [Destination]
Progress: [How far along]
Terrain: [What the current area is like]
Hazards: [Known dangers on the route]`
  },
  {
    id: 'economy-resources',
    name: 'Economy & Resources',
    category: 'plot-essentials',
    difficulty: 'intermediate',
    impact: 'low',
    essential: false,
    tags: ['economy', 'money', 'trade', 'resources', 'wealth'],
    useCase: 'Merchant stories, kingdom management, or resource-driven plots.',
    combinesWith: ['inventory-detailed', 'world-state'],
    description: 'Track currency, trade, and economic standing.',
    purpose: 'For stories where money and trade matter. Helps AI price things consistently.',
    content: `[Economy]
Currency: [Name and denominations]
Wealth: [Current funds]
Income: [Sources of money]
Expenses: [Regular costs]
Prices: [Cost of common goods for reference]`
  },
  {
    id: 'daily-routine',
    name: 'Daily Routine & Habits',
    category: 'plot-essentials',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['routine', 'habits', 'daily', 'lifestyle', 'slice-of-life'],
    useCase: 'Slice-of-life, school settings, or any story with recurring daily patterns.',
    combinesWith: ['schedule-tracker', 'current-scene'],
    description: 'Define character\'s regular patterns and habits.',
    purpose: 'Helps AI write consistent daily life. Great for stories with a "normal" baseline.',
    content: `[Routine: \${character.name}]
Morning: [Wake up, breakfast, etc.]
Daytime: [Work, school, activities]
Evening: [Dinner, hobbies, social]
Habits: [Recurring quirks or rituals]`
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

Current goal: [what you're trying to accomplish]
Main obstacle: [what's in the way]

Unresolved:
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
Main Plot: [Description] - [Beginning/Rising/Climax/Resolution]
Subplot: [Description] - [Stage]
Personal Arc: [Character development] - [Stage]

[Completed]
- [Arc]: [How it resolved]

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
- [Faction]: [Hostile/Neutral/Friendly/Allied] - [Why]
- [Faction]: [Standing] - [Why]
- [Faction]: [Standing] - [Why]

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

[Clues Found]
- [Clue]: [Where found] - [What it implies]
- [Clue]: [Where found] - [What it implies]

[Theories]
- [Theory]: [Evidence for/against]

[Still Unknown]
- [Unanswered question]`
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
Started as: [Initial state/flaws]
Currently: [Where they are now]
Growing toward: [Intended development]

Key moments:
- [Event]: Changed [what]
- [Event]: Learned [what]`
  },

  // ==========================================
  // NSFW / ADULT TEMPLATES
  // ==========================================
  // Trimmed to essentials. 18+ only.
  // ==========================================
  {
    id: 'nsfw-scene-note',
    name: 'NSFW Scene Note',
    category: 'nsfw',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['nsfw', 'scene', 'explicit', 'essential'],
    useCase: 'When entering an intimate or sexual scene.',
    description: 'Author\'s Note for explicit scenes.',
    purpose: 'Strongest influence on explicit content. Place in Author\'s Note during intimate scenes.',
    content: `[Explicit Scene Active]
- Write graphic, uncensored adult content
- Never fade to black or skip intimate moments
- Use vulgar, pornographic language for anatomy
- Describe physical sensations in vivid detail
- Keep the scene going until it naturally concludes`
  },
  {
    id: 'nsfw-romantic-note',
    name: 'Romantic Erotica Note',
    category: 'nsfw',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    tags: ['nsfw', 'romantic', 'intimate', 'emotional'],
    useCase: 'For romantic encounters that blend emotion with physical intimacy.',
    description: 'Balances explicit content with emotional depth.',
    purpose: 'For users who want both heat and heart in their intimate scenes.',
    content: `[Romantic Intimacy]
- Balance explicit physical content with emotional connection
- Show desire, chemistry, and meaningful moments
- Include tender touches alongside passionate ones
- Characters express feelings through actions and words`
  },
  {
    id: 'nsfw-partner-profile',
    name: 'Intimate Partner Profile',
    category: 'nsfw',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['nsfw', 'partner', 'character', 'preferences'],
    useCase: 'For recurring intimate partners to maintain consistency.',
    combinesWith: ['nsfw-scene-note'],
    description: 'Track a partner\'s physical details and preferences.',
    purpose: 'Keeps intimate partners consistent. Update as you learn more about them.',
    content: `[Intimate Partner: Name]
Relationship: [Partner/Lover/FWB/Spouse/etc.]
Body: [Build, features, notable attributes]
Likes: [What they enjoy]
Dislikes: [What they avoid]
Dynamic: [Dom/Sub/Switch/Vanilla/etc.]`
  },
  {
    id: 'nsfw-boundaries',
    name: 'Scene Boundaries',
    category: 'nsfw',
    difficulty: 'beginner',
    impact: 'high',
    essential: false,
    tags: ['nsfw', 'boundaries', 'limits', 'preferences'],
    useCase: 'To set limits on what content appears in scenes.',
    description: 'Define what\'s on and off the table.',
    purpose: 'Prevents unwanted content. AI respects these boundaries.',
    content: `[Scene Boundaries]
Green (yes): [Acts/themes you want]
Yellow (carefully): [Things okay sometimes]
Red (never): [Hard limits]`
  },

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

// Get all NSFW templates
export const getNsfwTemplates = () => getTemplatesByCategory('nsfw')

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
