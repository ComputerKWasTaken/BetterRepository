// =============================================================================
// BetterRepository - Story Cards Data
// =============================================================================
// Example Story Cards and templates for AI Dungeon.
// Story Cards are notes for the AI about characters, locations, and concepts.
// =============================================================================
//
// METADATA SCHEMA:
// - difficulty: 'beginner' | 'intermediate' | 'advanced'
//   How complex the card is to understand and use effectively
// - impact: 'high' | 'medium' | 'low'
//   How much the card affects story consistency
// - essential: boolean
//   Whether this is a must-have example/template
// - useCase: string
//   When and why to use this type of card
// =============================================================================

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
    tags: ['template', 'character', 'basic', 'starter'],
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
    tags: ['template', 'location', 'basic', 'starter'],
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
    tags: ['template', 'faction', 'basic', 'starter'],
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
    tags: ['template', 'item', 'basic', 'starter'],
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
    tags: ['template', 'creature', 'basic', 'starter'],
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
    tags: ['template', 'concept', 'basic', 'worldbuilding'],
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
    tags: ['template', 'character', 'detailed', 'comprehensive'],
    description: 'Comprehensive character template with more depth.',
    useCase: 'Major characters who need detailed backgrounds and motivations.',
    triggers: '[Character Name]',
    entry: `[Character Name] is a [age] year old [race/species] [occupation/role]. [Physical appearance: height, build, distinctive features]. [Typical attire and equipment]. [Personality: 2-3 key traits with examples]. [Background: where from, key life events]. [Current goals and motivations]. [Fears or weaknesses]. [Relationship to protagonist]. [Speech patterns or mannerisms]. [Secret or hidden aspect].`
  },
  {
    id: 'template-location-detailed',
    name: 'Detailed Location Template',
    category: 'location',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['template', 'location', 'detailed', 'comprehensive'],
    description: 'Comprehensive location template with atmosphere and details.',
    useCase: 'Important locations that will be revisited or explored in depth.',
    triggers: '[Location Name],the [location type]',
    entry: `[Location Name] is a [type] in [region]. [Size and layout]. [Sensory details: sights, sounds, smells]. [Atmosphere and mood]. [Who can typically be found here]. [What services or resources are available]. [Notable features or landmarks]. [History and significance]. [Current events or tensions]. [Hidden areas or secrets]. [Dangers and how to avoid them].`
  },
  {
    id: 'template-relationship',
    name: 'Relationship Template',
    category: 'character',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['template', 'character', 'relationship', 'dynamics'],
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
    tags: ['template', 'concept', 'magic', 'worldbuilding'],
    description: 'Detailed template for creating consistent magic systems.',
    useCase: 'Establishing magic rules that the AI will follow consistently.',
    triggers: '[Magic Name],magic,the [magic type]',
    entry: `[Magic Name] is the [primary/only] form of magic in [world/region]. [Source of power: where does magic come from]. [How one learns or gains magical ability]. [Types or schools of magic]. [What magic CAN do]. [What magic CANNOT do, hard limits]. [Cost or price of using magic]. [Organizations that regulate or teach magic]. [How common magic users are]. [How society views magic and its users].`
  },
  {
    id: 'template-quest',
    name: 'Quest/Mission Template',
    category: 'concept',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['template', 'concept', 'quest', 'mission', 'objective'],
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
    tags: ['template', 'concept', 'conflict', 'tension', 'plot'],
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
    tags: ['template', 'event', 'milestone', 'timeline'],
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
    tags: ['template', 'event', 'festival', 'culture'],
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
    tags: ['template', 'culture', 'society', 'worldbuilding'],
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
    tags: ['template', 'vehicle', 'travel', 'gear'],
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
    tags: ['template', 'role', 'title', 'position'],
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
    tags: ['template', 'rumor', 'mystery', 'lead'],
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
    tags: ['template', 'relationship', 'character', 'dynamics'],
    description: 'Expanded relationship card for complex dynamics.',
    useCase: 'Tracking evolving bonds, rivalries, and emotional stakes.',
    triggers: '[Character A] and [Character B]',
    entry: `[Character A] and [Character B] share a [relationship type]. [How the relationship started]. [What each believes about the other]. [Emotional tone: trust, resentment, obligation]. [Recent changes or conflicts]. [How their bond affects other characters]. [How it might evolve next].`
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

// Get card by ID (searches both examples and templates)
export const getCardById = (cardId) => {
  return STORY_CARDS.find(c => c.id === cardId) || 
         STORY_CARD_TEMPLATES.find(t => t.id === cardId)
}
