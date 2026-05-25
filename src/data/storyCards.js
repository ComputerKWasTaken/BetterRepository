// =============================================================================
// BetterRepository - Story Cards Data
// =============================================================================
// Example Story Cards and templates for AI Dungeon.
// Story Cards are notes for the AI about characters, locations, and concepts.
// =============================================================================

// ============================================
// STORY CARD RULESET (Internal Documentation)
// All story cards and templates MUST follow these rules.
// ============================================
//
// 1. TRIGGER FORMAT
//    Every story card must have a `triggers` field with comma-separated
//    trigger phrases. These are the keywords that activate the card in
//    context. Use the most natural, in-story references a player would use.
//    Example: triggers: 'Kira,the scout,Kira the Scout'
//
// 2. ENTRY AS PROSE
//    The `entry` field must be written as natural prose, not bullet points.
//    The AI reads story cards as narrative context, so entries should read
//    like encyclopedia entries or character descriptions, not lists.
//
// 3. CATEGORY ASSIGNMENT
//    Every card must have a `category` field matching one of the
//    STORY_CARD_CATEGORIES ids: character, location, faction, item,
//    creature, concept, event, culture, vehicle, role, rumor, relationship.
//
// 4. CONCISE BUT COMPLETE
//    Story cards should contain enough detail to maintain consistency
//    without being so long they waste context tokens. Aim for 3-6
//    sentences for simple cards, 6-10 for complex ones.
//
// 5. DIFFICULTY RATING
//    - beginner: Simple card with obvious use case
//    - intermediate: Requires understanding of trigger placement or AI behavior
//    - advanced: Complex cards with interconnected lore or subtle effects
//
// 6. IMPACT RATING
//    - high: Core to story consistency (main characters, key locations)
//    - medium: Enhances consistency (recurring NPCs, factions)
//    - low: Flavor and detail (minor items, background lore)
//
// 7. SHOW, DON'T PRESCRIBE
//    Story card entries describe what IS, not what the AI should DO.
//    Wrong: "When the player meets Kira, she should be suspicious."
//    Right: "Kira is suspicious of strangers and keeps her hand near her knife."
//
// 8. NO REDUNDANCY
//    Before creating a card, verify it doesn't duplicate an existing one.
//    Cards covering the same entity should be merged, not duplicated.
//
// 9. METADATA COMPLETENESS
//    Every card must include: id, name, category, difficulty, impact,
//    essential, tags, source, description, triggers, and entry.
//    Optional: useCase, combinesWith.
//
// ============================================
// COMMAND PRESET RULESET (Internal Documentation)
// All Story Card Command Presets MUST follow these rules.
// ============================================
//
// Command Presets represent AI Dungeon's Story Card Command tab
// configuration. They are a third data type alongside STORY_CARDS
// (examples) and STORY_CARD_TEMPLATES (manual templates).
//
// A. REQUIRED COMMAND TOKEN
//    The `command` field MUST contain the literal `{{title}}` token.
//    AI Dungeon's editor disables "Finish" when this token is missing.
//
// B. COMMAND LENGTH
//    The `command` field MUST be <= 2000 characters (AI Dungeon limit).
//    The `additionalContext` field MUST also be <= 2000 characters.
//
// C. ENTRY FORMATTING
//    `entryFormatting` is one of: 'none', 'curly' ({}), 'bracket' ([]).
//    Use 'none' unless the prompt is explicitly designed to emit
//    structured field blocks the engine can parse.
//
// D. PRESET DESCRIPTION
//    The `description` describes the underlying generator behavior
//    (which model, which context builder), NOT what the prompt does.
//    What the prompt does belongs in `useCase`.
//
// E. METADATA COMPLETENESS
//    Every preset must include: id, name, category (optional, may be
//    null for general-purpose presets), difficulty, impact, essential,
//    tags, description, useCase, command, entryFormatting,
//    additionalContext, logInNotes, speedCreate.
//    Optional: credit, source.
//
// F. CATEGORY ASSIGNMENT
//    Set `category` to a STORY_CARD_CATEGORIES id when the preset is
//    tuned for that specific category. Leave null for general presets
//    that work across categories.
//

// ============================================
// STORY CARD CATEGORIES
// ============================================
export const STORY_CARD_CATEGORIES = [
  { 
    id: 'character', 
    name: 'Characters', 
    icon: 'Users', 
    color: 'bd-purple',
    description: 'NPCs, companions, and other characters'
  },
  { 
    id: 'location', 
    name: 'Locations', 
    icon: 'MapPin', 
    color: 'bd-green',
    description: 'Places, buildings, and regions'
  },
  { 
    id: 'faction', 
    name: 'Factions', 
    icon: 'Shield', 
    color: 'bd-blue',
    description: 'Organizations, groups, and political entities'
  },
  { 
    id: 'item', 
    name: 'Items', 
    icon: 'Sword', 
    color: 'bd-amber',
    description: 'Weapons, artifacts, and important objects'
  },
  { 
    id: 'creature', 
    name: 'Creatures', 
    icon: 'Sparkles', 
    color: 'bd-pink',
    description: 'Monsters, animals, and fantastical beings'
  },
  { 
    id: 'concept', 
    name: 'Concepts', 
    icon: 'Lightbulb', 
    color: 'bd-cyan',
    description: 'Magic systems, technologies, and world rules'
  },
  { 
    id: 'event', 
    name: 'Events', 
    icon: 'Clock', 
    color: 'bd-amber',
    description: 'Major incidents, disasters, festivals, or milestones'
  },
  { 
    id: 'culture', 
    name: 'Cultures', 
    icon: 'Drama', 
    color: 'bd-purple',
    description: 'Societies, customs, values, and traditions'
  },
  { 
    id: 'vehicle', 
    name: 'Vehicles', 
    icon: 'Rocket', 
    color: 'bd-blue',
    description: 'Ships, mounts, vehicles, and travel methods'
  },
  { 
    id: 'role', 
    name: 'Roles & Titles', 
    icon: 'Award', 
    color: 'bd-green',
    description: 'Recurring positions, titles, or archetypal roles'
  },
  { 
    id: 'rumor', 
    name: 'Rumors', 
    icon: 'MessageSquare', 
    color: 'bd-pink',
    description: 'Whispers, legends, and misleading information'
  },
  { 
    id: 'relationship', 
    name: 'Relationships', 
    icon: 'Heart', 
    color: 'bd-purple',
    description: 'Dynamics between characters or groups'
  }
]

// ============================================
// EXAMPLE STORY CARDS
// ============================================
export const STORY_CARDS = [
  // ========== CHARACTER EXAMPLES ==========
  {
    id: 'example-eccentric-merchant',
    name: 'Eccentric Merchant',
    category: 'character',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['example', 'character', 'npc', 'merchant', 'quirky'],
    source: 'BetterRepository',
    description: 'A quirky merchant NPC with a distinctive personality and hidden depths.',
    useCase: 'Template for creating memorable merchant NPCs with unique quirks and potential plot hooks.',
    triggers: '[Merchant Name]',
    entry: `[Merchant Name] is an eccentric but shrewd businessperson. Despite their odd appearance and mannerisms, they run a successful specialty shop. They can often be found in unexpected places, selling their unique wares to adventurers and travelers. Some speculate that [Merchant Name] may have knowledge of secret locations due to their extensive travels. Others warn that they may have ulterior motives. [Merchant Name] has a distinctive appearance: [describe unusual clothing or features that make them memorable].`
  },
  {
    id: 'example-mysterious-stranger',
    name: 'The Mysterious Stranger',
    category: 'character',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['example', 'character', 'mysterious', 'recurring', 'plot-device'],
    source: 'BetterRepository',
    description: 'Template for a mysterious recurring character who drives plot forward.',
    useCase: 'Creating enigmatic characters who appear at key moments to guide or warn the protagonist.',
    triggers: 'Mysterious Stranger,the stranger,hooded figure',
    entry: `The Mysterious Stranger is a hooded figure who appears at crucial moments. No one knows their true identity or motivations. They speak in riddles and seem to know more than they should. The Stranger wears a deep blue cloak that obscures their features, and their voice is neither distinctly male nor female. They have helped the protagonist before, but their aid always comes with cryptic warnings.`
  },
  {
    id: 'example-companion',
    name: 'Kira the Scout',
    category: 'character',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['example', 'character', 'companion', 'ally', 'scout'],
    source: 'BetterRepository',
    description: 'A loyal companion character with clear personality and skills.',
    useCase: 'Creating party members or companions who travel with the protagonist.',
    triggers: 'Kira,the scout',
    entry: `Kira is a skilled scout and tracker who joined the protagonist after they saved her village from bandits. She is practical, observant, and speaks plainly. Kira excels at finding paths, reading tracks, and spotting danger before it finds them. She carries a short bow, two hunting knives, and moves with the quiet confidence of someone who has survived alone in the wilderness. Kira is loyal but not blindly so, she will voice disagreement and expects her opinions to be heard.`
  },
  {
    id: 'example-antagonist',
    name: 'Lord Varen',
    category: 'character',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['example', 'character', 'antagonist', 'villain', 'noble'],
    source: 'BetterRepository',
    description: 'A morally complex antagonist with understandable motivations.',
    useCase: 'Creating villains who are more than one-dimensional evil. Shows nuanced antagonist writing.',
    triggers: 'Lord Varen,Varen',
    entry: `Lord Varen rules the eastern provinces with an iron grip. He believes order must be maintained at any cost, a conviction born from watching his family die in the Peasant Revolts. Varen is intelligent, patient, and ruthless when crossed. He genuinely believes his harsh methods protect the realm from chaos. Varen respects strength and cunning, even in enemies. He wears simple black attire, keeps his grey hair cropped short, and speaks softly, those who know him fear his quiet voice more than any shout.`
  },

  // ========== LOCATION EXAMPLES ==========
  {
    id: 'example-tavern',
    name: 'The Rusty Anchor',
    category: 'location',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['example', 'location', 'tavern', 'social-hub', 'rumors'],
    source: 'BetterRepository',
    description: 'A classic tavern that serves as a social hub and quest source.',
    useCase: 'Creating gathering places where characters can get information, rest, and find work.',
    triggers: 'Rusty Anchor,the tavern,the inn',
    entry: `The Rusty Anchor is a weathered tavern near the docks. It serves sailors, merchants, and those who don't ask too many questions. The owner, a retired sailor named Greta, keeps order with an iron fist and a loaded crossbow behind the bar. The food is hearty if plain, the ale is cheap, and the rooms upstairs are clean enough. Rumors and job offers flow as freely as the drinks.`
  },
  {
    id: 'example-dungeon',
    name: 'The Sunken Crypts',
    category: 'location',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['example', 'location', 'dungeon', 'dangerous', 'treasure'],
    source: 'BetterRepository',
    description: 'A dangerous location with hazards, lore, and rewards.',
    useCase: 'Creating adventure locations with atmosphere, dangers, and reasons to explore.',
    triggers: 'Sunken Crypts,the crypts,ancient tomb',
    entry: `The Sunken Crypts lie beneath the old temple district, half-flooded from centuries of neglect. The crypts hold the remains of the city's founders and, supposedly, their treasures. Few who enter return. Those who do speak of flooded corridors, collapsed passages, and guardians that do not rest. The water is black and cold, the air thick with decay. Strange lights flicker in the depths, and whispers echo from walls that should hold only the dead.`
  },
  {
    id: 'example-city',
    name: 'Ironhaven',
    category: 'location',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['example', 'location', 'city', 'hub', 'political'],
    source: 'BetterRepository',
    description: 'A major city with districts, factions, and ongoing tensions.',
    useCase: 'Creating complex urban environments with multiple areas and power dynamics.',
    triggers: 'Ironhaven,the city',
    entry: `Ironhaven is a sprawling port city built where the Iron River meets the sea. The Upper City houses nobles and merchants in stone manors, while the Lower City crowds workers and sailors into wooden tenements. The Docks never sleep, handling trade from across the known world. Three powers vie for control: the Lord Mayor's council, the Merchant Guilds, and the criminal underworld known as the Shadow Guild. Tensions run high as taxes rise and work grows scarce.`
  },

  // ========== FACTION EXAMPLES ==========
  {
    id: 'example-monastic-order',
    name: 'Monastic Order',
    category: 'faction',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['example', 'faction', 'religious', 'peaceful', 'monks'],
    source: 'BetterRepository',
    description: 'A peaceful monastic order with distinct customs, beliefs, and practices.',
    useCase: 'Template for creating religious or philosophical factions with rich cultural details.',
    triggers: '[Order Name],monastery,monks',
    entry: `The [Order Name] are a peaceful people who value [core values: life, harmony, wisdom, etc.]. Members live in [type of dwelling] built in [remote/sacred locations]. They wear [distinctive clothing style and colors]. [Gender-specific customs if any]. Masters of the order bear [distinctive marks or symbols of their rank]. The [Order Name] are known for [special abilities, knowledge, or practices]. They have formed bonds with [companion creatures or allies] and use [unique tools or methods] in their daily lives.`
  },
  {
    id: 'example-shadow-guild',
    name: 'The Shadow Guild',
    category: 'faction',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['example', 'faction', 'criminal', 'underground', 'thieves'],
    source: 'BetterRepository',
    description: 'A criminal organization with structure, rules, and reach.',
    useCase: 'Creating criminal factions that can be allies, enemies, or quest sources.',
    triggers: 'Shadow Guild,the Guild,guild members',
    entry: `The Shadow Guild controls most criminal activity in the region. They deal in smuggling, theft, information, and "problem removal." The Guild has rules: no harming children, no betraying fellow members, and always pay your dues. Breaking these rules means death. The Guild is led by a council of five, their identities unknown to most. Guild members identify each other through coded phrases and a small tattoo of a crescent moon. They have eyes and ears everywhere.`
  },

  // ========== CREATURE EXAMPLES ==========
  {
    id: 'example-hybrid-beast',
    name: 'Hybrid Beast',
    category: 'creature',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    tags: ['example', 'creature', 'hybrid', 'wildlife', 'fantasy'],
    source: 'BetterRepository',
    description: 'A hybrid creature combining features of multiple animals.',
    useCase: 'Template for creating unique fantasy creatures by combining familiar animal traits.',
    triggers: '[Creature Name]',
    entry: `The [Creature Name] is a [size] creature native to [habitat/region]. It has [body part] of a [animal A], the [body part] of a [animal B], and [additional features]. Despite its [unusual/awkward] appearance, the [Creature Name] is [behavioral traits: agile, cunning, docile, etc.]. It is known to be [temperament when encountered] and is regarded as [reputation among locals]. [Additional details about diet, abilities, or uses].`
  },
  {
    id: 'example-undead-guardian',
    name: 'Crypt Warden',
    category: 'creature',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['example', 'creature', 'undead', 'guardian', 'dangerous'],
    source: 'BetterRepository',
    description: 'An undead guardian with purpose and behavior patterns.',
    useCase: 'Creating monsters that guard specific locations with defined behavior.',
    triggers: 'Crypt Warden,the warden,skeletal guardian',
    entry: `Crypt Wardens are ancient guardians bound to protect the tombs of the old kings. They appear as skeletal warriors in rusted armor, wielding weapons that still hold an edge. Wardens do not attack those who enter peacefully and take nothing. But any who touch the treasures or disturb the dead will find the Wardens relentless. They feel no pain, know no fear, and will pursue thieves until destroyed or their charge is returned.`
  },

  // ========== ITEM EXAMPLES ==========
  {
    id: 'example-ancient-sword',
    name: 'Blade of the First King',
    category: 'item',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['example', 'item', 'weapon', 'legendary', 'artifact'],
    source: 'BetterRepository',
    description: 'Template for a legendary weapon with history and mystery.',
    useCase: 'Creating important items that have lore, significance, and potential plot hooks.',
    triggers: 'Blade of the First King,ancient sword,the blade',
    entry: `The Blade of the First King is an ancient longsword forged in the founding days of the kingdom. Its steel never dulls and never rusts. The blade bears inscriptions in a language few can read. Legend says it can only be wielded by one of royal blood, though this may just be propaganda. The sword currently rests in the royal vault, though many have tried to steal it over the centuries.`
  },
  {
    id: 'example-cursed-item',
    name: 'The Weeping Pendant',
    category: 'item',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['example', 'item', 'cursed', 'jewelry', 'dangerous'],
    source: 'BetterRepository',
    description: 'A cursed item with benefits and drawbacks.',
    useCase: 'Creating items with double-edged effects that create interesting choices.',
    triggers: 'Weeping Pendant,the pendant,black teardrop',
    entry: `The Weeping Pendant is a black teardrop gemstone on a silver chain. It grants its wearer visions of the future, but only of sorrows to come. The wearer sees deaths, betrayals, and disasters before they happen. Some visions can be prevented, others cannot. The pendant cannot be removed once worn; it falls off only when its wearer dies. Many who wear it are driven mad by the weight of knowing.`
  },

  // ========== CONCEPT EXAMPLES ==========
  {
    id: 'example-magic-system',
    name: 'Resonance Magic',
    category: 'concept',
    difficulty: 'advanced',
    impact: 'high',
    essential: true,
    tags: ['example', 'concept', 'magic', 'system', 'worldbuilding'],
    source: 'BetterRepository',
    description: 'A complete magic system with rules, costs, and organizations.',
    useCase: 'Creating consistent magic systems with clear limitations and consequences.',
    triggers: 'Resonance,resonance magic,the Resonance',
    entry: `Resonance is the magic system of this world. Practitioners attune themselves to one of five Harmonics: Stone, Tide, Flame, Wind, or Void. Each Harmonic grants different abilities but requires years of meditation to master. Using Resonance is physically draining; overuse leads to "Dissonance," a painful condition that can be fatal. The Resonant Orders train practitioners and regulate magic use. Unregistered Resonants are hunted by the Silence, the Order's enforcers.`
  },
  {
    id: 'example-technology',
    name: 'Aether Engines',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['example', 'concept', 'technology', 'steampunk', 'worldbuilding'],
    source: 'BetterRepository',
    description: 'A technology concept that defines how things work in your world.',
    useCase: 'Establishing technological rules and limitations for your setting.',
    triggers: 'Aether Engine,aether,the engines',
    entry: `Aether Engines power the machines of the modern age. They draw energy from aether, a luminous gas mined from deep underground. Engines range from small devices that power tools to massive constructs that drive airships. Aether is expensive and controlled by the Mining Consortium. Prolonged exposure to raw aether causes "the Glow", a wasting sickness that turns skin translucent before death. Engine workers rarely live past forty.`
  }
]

// ============================================
// STORY CARD TEMPLATES
// ============================================
export const STORY_CARD_TEMPLATES = [
  // ========== BASIC TEMPLATES ==========
  {
    id: 'template-character',
    name: 'Character Template',
    category: 'character',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['character', 'basic', 'starter'],
    description: 'Basic template for creating character Story Cards.',
    useCase: 'Starting point for any NPC, companion, or important character.',
    triggers: '[Character Name]',
    entry: `[Character Name] is a [role/occupation]. [Physical description in 1-2 sentences]. [Personality traits]. [Their relationship to the protagonist or role in the story]. [Any secrets or hidden motivations]. [Current situation or goals].`
  },
  {
    id: 'template-location',
    name: 'Location Template',
    category: 'location',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['location', 'basic', 'starter'],
    description: 'Basic template for creating location Story Cards.',
    useCase: 'Creating any place the protagonist might visit or hear about.',
    triggers: '[Location Name],the [location type]',
    entry: `[Location Name] is a [type of place] located in [region/area]. [Physical description]. [Atmosphere and typical inhabitants]. [What can be found or done here]. [Any dangers or secrets]. [Historical significance if any].`
  },
  {
    id: 'template-faction',
    name: 'Faction Template',
    category: 'faction',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['faction', 'basic', 'starter'],
    description: 'Basic template for creating faction Story Cards.',
    useCase: 'Creating organizations, guilds, governments, or any group with shared goals.',
    triggers: '[Faction Name],the [faction]',
    entry: `[Faction Name] is a [type of organization]. [Their stated goals and values]. [How they operate and their structure]. [Their relationship with other factions]. [How they view the protagonist]. [Their strengths and weaknesses].`
  },
  {
    id: 'template-item',
    name: 'Item Template',
    category: 'item',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['item', 'basic', 'starter'],
    description: 'Basic template for creating item Story Cards.',
    useCase: 'Creating weapons, artifacts, or any significant objects.',
    triggers: '[Item Name],the [item type]',
    entry: `[Item Name] is a [type of item]. [Physical description]. [Its abilities or significance]. [Its history and origin]. [Who currently possesses it or where it can be found]. [Any dangers or costs to using it].`
  },
  {
    id: 'template-creature',
    name: 'Creature Template',
    category: 'creature',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['creature', 'basic', 'starter'],
    description: 'Basic template for creating creature Story Cards.',
    useCase: 'Creating monsters, wildlife, or any non-humanoid beings.',
    triggers: '[Creature Name]',
    entry: `[Creature Name] is a [type of creature] found in [habitat]. [Physical description]. [Behavior and temperament]. [Dangers it poses]. [Any useful resources it provides]. [How to handle encounters with it].`
  },
  {
    id: 'template-concept',
    name: 'Concept Template',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['concept', 'basic', 'worldbuilding'],
    description: 'Basic template for magic systems, technologies, or world rules.',
    useCase: 'Establishing how things work in your world, magic, tech, social norms.',
    triggers: '[Concept Name],the [concept]',
    entry: `[Concept Name] is [what it is in one sentence]. [How it works or its rules]. [Who uses it or is affected by it]. [Its limitations or costs]. [How it shapes society or the world]. [Any organizations that control or study it].`
  },

  // ========== ADVANCED TEMPLATES ==========
  {
    id: 'template-character-detailed',
    name: 'Detailed Character Template',
    category: 'character',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['character', 'detailed', 'comprehensive'],
    description: 'Comprehensive character template with more depth.',
    useCase: 'Major characters who need detailed backgrounds and motivations.',
    triggers: '[Character Name]',
    entry: `[Character Name] is a [age] year old [race/species] [occupation/role]. [Physical appearance: height, build, distinctive features]. [Typical attire and equipment]. [Personality: 2-3 key traits with examples]. [Background: where from, key life events]. [Current goals and motivations]. [Fears or weaknesses]. [Relationship to protagonist]. [Speech patterns or mannerisms]. [Secret or hidden aspect].`
  },
  {
    id: 'template-deity',
    name: 'Deity/God Template',
    category: 'character',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['character', 'deity', 'religion', 'god'],
    description: 'Template for a god, deity, or higher power.',
    useCase: 'Defining the gods of your world, their domains, and how they interact.',
    triggers: '[Deity Name],the [Title]',
    entry: `[Deity Name] is the [God/Goddess] of [Domains: e.g., War, Harvest, Secrets]. [Appearance/Avatar]. [Personality/Nature: e.g., Benevolent, Capricious, Distant]. [Symbols and sacred animals]. [Tenets of their faith: what they demand of followers]. [Relationship with other gods]. [How they manifest or intervene in the world].`
  },
  {
    id: 'template-location-detailed',
    name: 'Detailed Location Template',
    category: 'location',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['location', 'detailed', 'comprehensive'],
    description: 'Comprehensive location template with atmosphere and details.',
    useCase: 'Important locations that will be revisited or explored in depth.',
    triggers: '[Location Name],the [location type]',
    entry: `[Location Name] is a [type] in [region]. [Size and layout]. [Sensory details: sights, sounds, smells]. [Atmosphere and mood]. [Who can typically be found here]. [What services or resources are available]. [Notable features or landmarks]. [History and significance]. [Current events or tensions]. [Hidden areas or secrets]. [Dangers and how to avoid them].`
  },
  {
    id: 'template-region',
    name: 'Region/Nation Template',
    category: 'location',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['location', 'region', 'nation', 'geography'],
    description: 'Template for a broad region, country, or biome.',
    useCase: 'Defining the geography, climate, and general vibe of a large area.',
    triggers: '[Region Name],the [Region Type]',
    entry: `[Region Name] is a [Region Type: e.g., desert kingdom, frozen wasteland] located [where]. [Geography and Climate]. [Major cities or landmarks]. [Flora and Fauna]. [Political structure or ruling power]. [Major exports or resources]. [Common threats or dangers]. [Cultural quirks of the inhabitants].`
  },
  {
    id: 'template-relationship',
    name: 'Relationship Template',
    category: 'relationship',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['character', 'relationship', 'dynamics'],
    description: 'Template for defining relationships between characters.',
    useCase: 'Tracking how characters feel about and interact with each other.',
    triggers: '[Character A] and [Character B]',
    entry: `[Character A] and [Character B] have a [type of relationship: friends, rivals, lovers, etc.]. [How they met]. [What they think of each other]. [Points of conflict or tension]. [What they appreciate about each other]. [Shared history or secrets]. [How their relationship might change].`
  },
  {
    id: 'template-magic-system',
    name: 'Magic System Template',
    category: 'concept',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['concept', 'magic', 'worldbuilding'],
    description: 'Detailed template for creating consistent magic systems.',
    useCase: 'Establishing magic rules that the AI will follow consistently.',
    triggers: '[Magic Name],magic,the [magic type]',
    entry: `[Magic Name] is the [primary/only] form of magic in [world/region]. [Source of power: where does magic come from]. [How one learns or gains magical ability]. [Types or schools of magic]. [What magic CAN do]. [What magic CANNOT do, hard limits]. [Cost or price of using magic]. [Organizations that regulate or teach magic]. [How common magic users are]. [How society views magic and its users].`
  },
  {
    id: 'template-ability',
    name: 'Ability/Spell Template',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['concept', 'magic', 'spell', 'ability'],
    description: 'Template for a specific spell, technique, or superpower.',
    useCase: 'Defining signature moves, spells, or complex abilities.',
    triggers: '[Ability Name]',
    entry: `[Ability Name] is a [Type: e.g., Spell, Martial Technique] used by [Who uses it]. [Effect: What does it actually do]. [Visuals/Sensory details of activation]. [Requirements/Cost to use]. [Limitations or cooldowns]. [History or origin of the technique].`
  },
  {
    id: 'template-quest',
    name: 'Quest/Mission Template',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['concept', 'quest', 'mission', 'objective'],
    description: 'Template for tracking quests, missions, or objectives.',
    useCase: 'Keeping the AI aware of current goals and their context.',
    triggers: '[Quest Name],the mission,the quest',
    entry: `[Quest Name] is the current objective. [Who gave the quest and why]. [What must be done to complete it]. [Where the objective is located]. [Known obstacles or enemies]. [Time pressure if any]. [Reward for completion]. [Consequences of failure]. [Current progress: what has been done, what remains].`
  },
  {
    id: 'template-conflict',
    name: 'Conflict Template',
    category: 'concept',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['concept', 'conflict', 'tension', 'plot'],
    description: 'Template for ongoing conflicts, wars, or tensions.',
    useCase: 'Tracking major conflicts that shape the world and story.',
    triggers: '[Conflict Name],the war,the conflict',
    entry: `[Conflict Name] is an ongoing [war/dispute/tension] between [parties involved]. [Root cause of the conflict]. [What each side wants]. [Current state: who is winning, recent events]. [Key battles or turning points]. [How it affects common people]. [How the protagonist is involved or affected]. [Potential ways it could end]. [What would happen if one side won].`
  },
  {
    id: 'template-event',
    name: 'Major Event Template',
    category: 'event',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['event', 'milestone', 'timeline'],
    description: 'Template for world-shaping events or recent incidents.',
    useCase: 'Establishing incidents that the story references repeatedly.',
    triggers: '[Event Name],the event,the incident',
    entry: `[Event Name] happened on [date/era] in [location]. [What occurred in 1-2 sentences]. [Primary cause or trigger]. [Who was involved]. [Immediate consequences]. [Long-term effects on the world or factions]. [Why it matters to the protagonist].`
  },
  {
    id: 'template-festival',
    name: 'Festival Template',
    category: 'event',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['event', 'festival', 'culture'],
    description: 'Template for seasonal festivals, rituals, or celebrations.',
    useCase: 'Adding atmosphere and social context to a region or culture.',
    triggers: '[Festival Name],the festival',
    entry: `[Festival Name] is a [seasonal/annual] celebration held in [location]. [Purpose of the festival]. [Key rituals or activities]. [Typical foods, music, or dress]. [How locals feel about it]. [Any conflicts, dangers, or political tensions surrounding it].`
  },
  {
    id: 'template-culture',
    name: 'Culture Template',
    category: 'culture',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['culture', 'society', 'worldbuilding'],
    description: 'Template for describing a people, culture, or society.',
    useCase: 'Defining values and customs that influence dialogue and behavior.',
    triggers: '[Culture Name],the [people]',
    entry: `[Culture Name] are a [people/society] known for [core values]. [Where they live and how they survive]. [Social structure and leadership]. [Customs, taboos, and etiquette]. [Typical clothing, art, or architecture]. [How they view outsiders]. [Conflicts or alliances they maintain].`
  },
  {
    id: 'template-vehicle',
    name: 'Vehicle Template',
    category: 'vehicle',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['vehicle', 'travel', 'gear'],
    description: 'Template for ships, mounts, or major vehicles.',
    useCase: 'Keeping travel methods consistent in long adventures.',
    triggers: '[Vehicle Name],the [vehicle type]',
    entry: `[Vehicle Name] is a [type of vehicle/mount] used by [owner or group]. [Appearance and distinctive features]. [Capabilities: speed, cargo, weaponry]. [Limitations or weaknesses]. [Crew or handler details]. [Current condition and location].`
  },
  {
    id: 'template-role',
    name: 'Role/Title Template',
    category: 'role',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['role', 'title', 'position'],
    description: 'Template for recurring positions or titles in a setting.',
    useCase: 'Keeping titles and expected duties consistent.',
    triggers: '[Title Name],the [title]',
    entry: `[Title Name] is a [rank/position] within [organization or society]. [Typical duties and authority]. [How someone earns the title]. [Symbols, regalia, or identifiers]. [How people respond to the title]. [Any current holder, if known].`
  },
  {
    id: 'template-rumor',
    name: 'Rumor Template',
    category: 'rumor',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    tags: ['rumor', 'mystery', 'lead'],
    description: 'Template for hearsay, legends, or misleading information.',
    useCase: 'Feeding investigation hooks or red herrings.',
    triggers: '[Rumor],the rumor,they say',
    entry: `[Rumor] is a piece of hearsay circulating in [location or group]. [What the rumor claims]. [Who spreads it and why]. [How reliable it is]. [What it might actually mean]. [Potential consequences if believed].`
  },
  {
    id: 'template-relationship-detailed',
    name: 'Detailed Relationship Template',
    category: 'relationship',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['relationship', 'character', 'dynamics'],
    description: 'Expanded relationship card for complex dynamics.',
    useCase: 'Tracking evolving bonds, rivalries, and emotional stakes.',
    triggers: '[Character A] and [Character B]',
    entry: `[Character A] and [Character B] share a [relationship type]. [How the relationship started]. [What each believes about the other]. [Emotional tone: trust, resentment, obligation]. [Recent changes or conflicts]. [How their bond affects other characters]. [How it might evolve next].`
  },
  {
    id: 'template-political-party',
    name: 'Political Party Template',
    category: 'faction',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['politics', 'organization', 'faction', 'government', 'ideology'],
    description: 'An in-depth template for the creation of any political party or organisation. Designed to be used in modern/early modern political scenarios.',
    useCase: 'Creating detailed political factions with clear ideologies, leadership, and support bases.',
    triggers: '[Political Party Name],the [ideology] party',
    entry: `[Political Party Name] is a [Political Leaning: Right-Wing, Centrist, Far-Left, etc.] Political Party operating in [Country Name], formed in [Party Formation Year: early 2026, 1989, late 2019]. It is led by [Party Leader] who is a [Gender, Ethnicity, Religion, etc.], and is a committed [Ideology: National Conservative, Social Liberal, Marxist-Leninist]. They have approximately [Number of Supporters] Supporters, predominantly among [Supporting Groups: the working class, students, Christians, etc] and its membership is currently [Growing, Declining, Stagnant, etc]. [Aesthetics and symbols: Its supporters wear black military uniforms, It flies a hammer and sickle with a sword through it, etc.]`,
    credit: {
      author: 'Number19mouseinbakedbeans'
    }
  }
]

// ============================================
// STORY CARD COMMAND PRESETS
// ============================================
// Presets capture AI Dungeon's Story Card Command tab configuration:
// the prompt template (with the required {{title}} token), the entry
// formatting mode, additional generation context, and the
// log-in-notes / speed-create toggles.
//
// Match the in-app field set exactly so presets can be copied verbatim
// into the Story Card editor.
export const STORY_CARD_COMMAND_PRESETS = [
  // ========== GENERAL-PURPOSE PRESETS ==========
  {
    id: 'preset-basic-list-prompt',
    name: 'Basic List Prompt',
    category: null,
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['general', 'starter', 'list', 'fields'],
    source: 'AI Dungeon (default preset)',
    description: 'Uses the player\'s selected story model and the same full-context prompt builder as normal story generation.',
    useCase: 'Default starting point. Produces a flat list of clearly labeled fields, one per line, beginning with the name field. Works well for characters, locations, items, and most general entities.',
    command: 'Generate an information card for {{title}} using clearly labeled fields which are each on their own line, beginning with a field that identifies the name of {{title}}. Each field should represent characteristics of {{title}}. Limit the response to 750 characters and do not use markdown or leave empty lines.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-basic-prose-prompt',
    name: 'Basic Prose Prompt',
    category: null,
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['general', 'prose', 'narrative'],
    source: 'AI Dungeon',
    description: 'Generates cohesive, encyclopedic prose instead of labeled lists. Matches classic story card styles.',
    useCase: 'Best for standard roleplay where you want the AI to read smooth paragraphs rather than lists of fields.',
    command: 'Generate a concise information card for {{title}} that captures the most important identity, role, appearance, personality, and motivations. It must clearly identify {{title}} in third person. Limit the response to 750 characters and do not use markdown or leave empty lines.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-condensed-prompt',
    name: 'Condensed Prompt',
    category: null,
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['general', 'token-saver', 'high-density'],
    source: 'AI Dungeon Community',
    description: 'Optimized for high context-density. Uses telegraphic prose to pack maximum facts into minimum tokens.',
    useCase: 'Excellent for complex or long-running adventures where token budget is extremely tight.',
    command: 'Write a high-density factual summary for {{title}}. Start with {{title}} name. Use short, punchy, declarative sentences. Prioritize permanent attributes and core identity. Omit unnecessary filler words (the, a, is). Avoid repeating facts, avoid meta-commentary, avoid transient details. Limit to 750 characters. No markdown. No empty lines.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },

  // ========== CATEGORY-SPECIFIC PRESETS ==========
  {
    id: 'preset-character-detailed',
    name: 'Detailed Character Prompt',
    category: 'character',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['character', 'detailed', 'npc', 'personality'],
    source: 'BetterRepository',
    description: 'Character-focused prompt that emphasizes personality, motivations, and relationships.',
    useCase: 'Creating rich NPCs with distinct voices and clear motivations that the AI can roleplay consistently.',
    command: 'Generate a detailed character profile for {{title}}. Include: full name, age, occupation, physical appearance (distinctive features), personality traits (3-5 key traits), core motivation, greatest fear, speech patterns or verbal tics, relationship to protagonist, and a secret they keep. Write in third person. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-location-atmospheric',
    name: 'Atmospheric Location Prompt',
    category: 'location',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['location', 'atmosphere', 'sensory', 'immersive'],
    source: 'BetterRepository',
    description: 'Location prompt emphasizing sensory details and atmosphere over dry facts.',
    useCase: 'Creating immersive locations that feel alive through sight, sound, smell, and mood.',
    command: 'Generate an atmospheric description for {{title}}. Focus on sensory details: what you see, hear, smell. Describe the mood and feeling of the place. Include who frequents it, what activities happen there, any dangers or secrets. Write evocatively but concisely. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-item-mechanical',
    name: 'Mechanical Item Prompt',
    category: 'item',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['item', 'mechanical', 'stats', 'game-like'],
    source: 'BetterRepository',
    description: 'Item prompt with emphasis on mechanical properties and game-like attributes.',
    useCase: 'Creating items with clear capabilities and limitations for consistent gameplay.',
    command: 'Generate an item card for {{title}}. Include: item type, physical description, primary function, special properties or abilities, limitations or drawbacks, rarity, origin or creator, current condition. Be specific about what it can and cannot do. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-faction-political',
    name: 'Political Faction Prompt',
    category: 'faction',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['faction', 'political', 'organization', 'worldbuilding'],
    source: 'BetterRepository',
    description: 'Faction prompt focusing on political dynamics, goals, and inter-faction relationships.',
    useCase: 'Creating factions with clear agendas that drive conflict and intrigue in the story.',
    command: 'Generate a faction profile for {{title}}. Include: faction name, type of organization, founding purpose, current leadership, core ideology or goals, methods they use, allies and enemies, public perception vs reality, resources and influence, how they recruit, their relationship to the protagonist. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-creature-bestiary',
    name: 'Bestiary Entry Prompt',
    category: 'creature',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['creature', 'bestiary', 'monster', 'wildlife'],
    source: 'BetterRepository',
    description: 'Creates creature entries in a naturalistic bestiary style.',
    useCase: 'Documenting creatures with behavioral patterns the AI can reference during encounters.',
    command: 'Generate a bestiary entry for {{title}}. Include: species name, classification, physical description, habitat, diet, behavior patterns, threat level, weaknesses, any useful materials that can be harvested, and local folklore about the creature. Write like a naturalist\'s field guide. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-event-historical',
    name: 'Historical Event Prompt',
    category: 'event',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['event', 'history', 'lore', 'worldbuilding'],
    source: 'BetterRepository',
    description: 'Creates historical event entries that establish world lore and consequences.',
    useCase: 'Documenting past events that characters reference and that shape the current world.',
    command: 'Generate a historical record for {{title}}. Include: event name, when it occurred, where it happened, key participants, what triggered it, what happened (brief narrative), immediate aftermath, long-term consequences still felt today, how it is remembered or commemorated. Write as historical documentation. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-curly-fields',
    name: 'Curly Brace Fields Prompt',
    category: null,
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['general', 'structured', 'fields', 'parsing'],
    source: 'BetterRepository',
    description: 'Generates entries with curly-brace field formatting for structured parsing.',
    useCase: 'When you need machine-parseable fields or want clear visual separation of attributes.',
    command: 'Generate an information card for {{title}} using labeled fields wrapped in curly braces like {Field: value}. Each field on its own line. Include name, type, key attributes, and relevant details. Limit to 750 characters. No markdown.',
    entryFormatting: 'curly',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-bracket-fields',
    name: 'Bracket Fields Prompt',
    category: null,
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['general', 'structured', 'fields', 'parsing'],
    source: 'BetterRepository',
    description: 'Generates entries with square bracket field formatting.',
    useCase: 'Alternative structured format that some users prefer for visual clarity.',
    command: 'Generate an information card for {{title}} using labeled fields wrapped in square brackets like [Field: value]. Each field on its own line. Include name, type, key attributes, and relevant details. Limit to 750 characters. No markdown.',
    entryFormatting: 'bracket',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-mystery-hook',
    name: 'Mystery Hook Prompt',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['mystery', 'hook', 'investigation', 'plot'],
    source: 'BetterRepository',
    description: 'Creates mystery or investigation hooks with clues and red herrings.',
    useCase: 'Setting up mysteries that the AI can consistently reference and gradually reveal.',
    command: 'Generate a mystery card for {{title}}. Include: the central question or crime, known facts, key suspects or persons of interest, available clues, red herrings, the actual truth (hidden from characters), what triggers reveal of new information. Write factually. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  },
  {
    id: 'preset-relationship-dynamic',
    name: 'Relationship Dynamic Prompt',
    category: 'relationship',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['relationship', 'dynamic', 'character', 'interaction'],
    source: 'BetterRepository',
    description: 'Captures the dynamic between two characters for consistent interactions.',
    useCase: 'Ensuring the AI portrays relationships with appropriate tension, affection, or history.',
    command: 'Generate a relationship card for {{title}}. Include: the two parties involved, type of relationship, how it began, current status, what each thinks of the other, points of conflict, points of connection, shared secrets, how they typically interact, and how the relationship might evolve. Limit to 750 characters. No markdown.',
    entryFormatting: 'none',
    additionalContext: '',
    logInNotes: true,
    speedCreate: false
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get story cards by category
export const getStoryCardsByCategory = (categoryId) => {
  return STORY_CARDS.filter(c => c.category === categoryId)
}

// Get templates by category
export const getStoryCardTemplatesByCategory = (categoryId) => {
  return STORY_CARD_TEMPLATES.filter(t => t.category === categoryId)
}

// Search story cards
export const searchStoryCards = (query) => {
  const lowerQuery = query.toLowerCase()
  return STORY_CARDS.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) ||
    c.description.toLowerCase().includes(lowerQuery) ||
    c.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    c.entry.toLowerCase().includes(lowerQuery)
  )
}

// Search templates
export const searchTemplates = (query) => {
  const lowerQuery = query.toLowerCase()
  return STORY_CARD_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(lowerQuery) ||
    t.description.toLowerCase().includes(lowerQuery) ||
    t.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    t.entry.toLowerCase().includes(lowerQuery)
  )
}

// Get all examples
export const getAllExamples = () => STORY_CARDS

// Get all templates
export const getAllTemplates = () => STORY_CARD_TEMPLATES

// Get all command presets
export const getAllCommandPresets = () => STORY_CARD_COMMAND_PRESETS

// Get command presets by category (null = general-purpose presets)
export const getCommandPresetsByCategory = (categoryId) => {
  return STORY_CARD_COMMAND_PRESETS.filter(p => p.category === categoryId)
}

// Get general-purpose command presets (category === null)
export const getGeneralCommandPresets = () => {
  return STORY_CARD_COMMAND_PRESETS.filter(p => p.category === null)
}

// Get a command preset by id
export const getCommandPresetById = (presetId) => {
  return STORY_CARD_COMMAND_PRESETS.find(p => p.id === presetId)
}

// Search command presets
export const searchCommandPresets = (query) => {
  const lowerQuery = query.toLowerCase()
  return STORY_CARD_COMMAND_PRESETS.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.useCase.toLowerCase().includes(lowerQuery) ||
    p.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    p.command.toLowerCase().includes(lowerQuery)
  )
}

// Get essential command presets
export const getEssentialCommandPresets = () => {
  return STORY_CARD_COMMAND_PRESETS.filter(p => p.essential === true)
}

// Get category by ID
export const getCategoryById = (categoryId) => {
  return STORY_CARD_CATEGORIES.find(c => c.id === categoryId)
}

// ============================================
// METADATA HELPER FUNCTIONS
// ============================================

// Get essential examples (must-see)
export const getEssentialExamples = () => {
  return STORY_CARDS.filter(c => c.essential === true)
}

// Get essential templates
export const getEssentialTemplates = () => {
  return STORY_CARD_TEMPLATES.filter(t => t.essential === true)
}

// Get examples by difficulty
export const getExamplesByDifficulty = (difficulty) => {
  return STORY_CARDS.filter(c => c.difficulty === difficulty)
}

// Get templates by difficulty
export const getTemplatesByDifficulty = (difficulty) => {
  return STORY_CARD_TEMPLATES.filter(t => t.difficulty === difficulty)
}

// Get beginner examples
export const getBeginnerExamples = () => getExamplesByDifficulty('beginner')

// Get beginner templates
export const getBeginnerTemplates = () => getTemplatesByDifficulty('beginner')

// Get examples by impact
export const getExamplesByImpact = (impact) => {
  return STORY_CARDS.filter(c => c.impact === impact)
}

// Get templates by impact
export const getTemplatesByImpact = (impact) => {
  return STORY_CARD_TEMPLATES.filter(t => t.impact === impact)
}

// Get high-impact examples
export const getHighImpactExamples = () => getExamplesByImpact('high')

// Get high-impact templates
export const getHighImpactTemplates = () => getTemplatesByImpact('high')

// Get starter set (essential + beginner + high impact)
export const getStarterExamples = () => {
  return STORY_CARDS.filter(c => 
    c.essential || 
    (c.difficulty === 'beginner' && c.impact === 'high')
  )
}

// Get starter templates
export const getStarterTemplates = () => {
  return STORY_CARD_TEMPLATES.filter(t => 
    t.essential || 
    (t.difficulty === 'beginner' && t.impact === 'high')
  )
}

// Get card by ID (searches examples, templates, and command presets)
export const getCardById = (cardId) => {
  return STORY_CARDS.find(c => c.id === cardId) ||
         STORY_CARD_TEMPLATES.find(t => t.id === cardId) ||
         STORY_CARD_COMMAND_PRESETS.find(p => p.id === cardId)
}
