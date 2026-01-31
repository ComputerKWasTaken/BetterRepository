// =============================================================================
// BetterRepository - Scripts Data
// =============================================================================
// Script examples and categories for AI Dungeon's scripting system.
// Scripts use JavaScript to modify context, input, and output.
//
// METADATA SCHEMA:
// - difficulty: 'beginner' | 'intermediate' | 'advanced'
// - impact: 'high' | 'medium' | 'low'
// - essential: boolean (recommended for new scripters)
// - source: 'Official Guidebook' | 'Community' | 'BetterRepository'
// - githubUrl: string (optional)
// - externalUrl: string (optional)
// =============================================================================

import { searchCollectionSmart } from './shared'

// ============================================
// SCRIPT CATEGORIES
// ============================================
export const SCRIPT_CATEGORIES = [
  {
    id: 'basics',
    name: 'Basic Examples',
    icon: 'BookOpen',
    color: 'bd-green',
    description: 'Simple examples to learn the scripting fundamentals.',
    count: 0
  },
  {
    id: 'game-systems',
    name: 'Game Systems',
    icon: 'Dices',
    color: 'bd-purple',
    description: 'Dice rolling, random events, quests, and game mechanics.',
    count: 0
  },
  {
    id: 'tracking',
    name: 'Tracking & State',
    icon: 'Clock',
    color: 'bd-blue',
    description: 'Notes, inventory, relationships, and persistent state.',
    count: 0
  },
  {
    id: 'commands',
    name: 'Commands & Input',
    icon: 'Terminal',
    color: 'bd-cyan',
    description: 'Command parsers and input processing systems.',
    count: 0
  },
  {
    id: 'magic',
    name: 'Magic & Abilities',
    icon: 'Wand2',
    color: 'bd-pink',
    description: 'Spell systems, special abilities, and magic mechanics.',
    count: 0
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'FolderOpen',
    color: 'bd-amber',
    description: 'Helper functions, debugging tools, and general utilities.',
    count: 0
  },
  {
    id: 'betterscripts',
    name: 'BetterScripts',
    icon: 'Terminal',
    color: 'bd-emerald',
    description: 'Scripts that use BetterDungeon widgets to display game state.',
    count: 0
  }
]

// ============================================
// EXAMPLE SCRIPTS (From Official Guidebook)
// ============================================
export const SCRIPTS = [
  // ========== BASIC EXAMPLES ==========
  {
    id: 'basic-example',
    name: 'Basic Example',
    category: 'basics',
    difficulty: 'beginner',
    impact: 'medium',
    essential: true,
    tags: ['state', 'memory', 'message'],
    source: 'Official Guidebook',
    description: 'The official basic example showing core scripting concepts.',
    purpose: 'Demonstrates state management, memory modification, messages, and text modification.',
    fileType: 'input',
    content: `const modifier = (text) => {
  
  let modifiedText = text
    
  // The text passed in is either the user's input or players output to modify.
  if(text.includes('grab a sword')) {    
      
    // You can modify the state variable to keep track of state throughout the adventure
    state.items = ['sword']
    
    // Setting state.memory.context will cause that to be used instead of the user set memory
    state.memory = {context: 'You have a sword.'}
    
    // Setting state.message will set an info message that will be displayed in the game 
    state.message = 'You got a sword!'
    
    // You can log things to the side console when testing with console.log
    console.log('Added a sword to player')
    
    modifiedText = text + '\\nYou also now have a sword!'
  }
  
    // You must return an object with the text property defined. 
    return {text: modifiedText}
}

// Don't modify this part
modifier(text)`
  },
  {
    id: 'dont-be-negative',
    name: "Don't Be Negative",
    category: 'basics',
    difficulty: 'beginner',
    impact: 'low',
    essential: true,
    tags: ['regex', 'text-replacement'],
    source: 'Official Guidebook',
    description: 'Simple example that removes "not" from all text.',
    purpose: 'Shows basic text replacement using regex. A humorous example that makes everything positive.',
    fileType: 'output',
    content: `const modifier = (text) => {
  // This will always result in a shorter string, so no need to truncate it.
  return { text: text.replace(/ not /gi, ' ') }
}

// Don't modify this part
modifier(text)`
  },
  {
    id: 'reimplement-authors-note',
    name: 'Reimplement Authors Note',
    category: 'basics',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['authors-note', 'context-injection'],
    source: 'Official Guidebook',
    description: "Re-implements Author's Note functionality as an example.",
    purpose: 'Shows how to inject text at a specific position in the context, useful for understanding context structure.',
    fileType: 'context',
    content: `// info.memoryLength is the length of the memory section of text.
// info.maxChars is the maximum length that text can be. The server will truncate the text you return to this length.

// This modifier re-implements Author's Note as an example.
const modifier = (text) => {
  const contextMemory = info.memoryLength ? text.slice(0, info.memoryLength) : ''
  const context = info.memoryLength ? text.slice(info.memoryLength) : text
  const lines = context.split("\\n")
  if (lines.length > 2) {
    const authorsNote = "Everyone in this story is an AI programmer."
    lines.splice(-3, 0, \`[Author's note: \${authorsNote}]\`)
  }
  // Make sure the new context isn't too long, or it will get truncated by the server.
  const combinedLines = lines.join("\\n").slice(-(info.maxChars - info.memoryLength))
  const finalText = [contextMemory, combinedLines].join("")
  return { text: finalText }
}

// Don't modify this part
modifier(text)`
  },

  // ========== COMMANDS & INPUT ==========
  {
    id: 'command-parser',
    name: 'Command Parser',
    category: 'commands',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['commands', 'parser', 'stop-action'],
    source: 'Official Guidebook',
    description: 'Parses user commands in the format :command arg1 arg2.',
    purpose: 'Foundation for building command systems. Extracts command name and arguments from player input.',
    fileType: 'input',
    content: `// This is an example Input Modifier that looks for commands from the user.

const modifier = (text) => {
  let stop = false

  // This matches when the user types in ":something arg1 arg2" in any of the three input formats. For example, they could
  // type ":status" and then command would be "status" and args would be [], or they could type ":walk north" and command
  // would be "walk" and args would be ["north"].
  const commandMatcher = text.match(/\\n? ?(?:> You |> You say "|):(\\w+?)( [\\w ]+)?[".]?\\n?$/i)
  if (commandMatcher) {
    const command = commandMatcher[1]
    const args = commandMatcher[2] ? commandMatcher[2].trim().split(' ') : []
    state.message = \`Got command '\${command}' with args \${JSON.stringify(args)}\` 
    stop = true
    text = null
  } else {
    delete state.message
  }

  // You must return an object with the text property defined.
  // If you include { stop: true } when inside of an input modifier, processing will be stopped and nothing will be
  // sent to the AI.
  return { text, stop }
}

// Don't modify this part
modifier(text)`
  },

  // ========== TRACKING & STATE ==========
  {
    id: 'notes-system',
    name: 'Notes System',
    category: 'tracking',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['notes', 'context-injection', 'multi-file'],
    source: 'Official Guidebook',
    description: 'Allows players to attach notes to story text that appear to the AI but not the player.',
    purpose: 'Set a note by typing "note: " in Do mode. Notes are tagged to recent text and injected into context.',
    files: {
      input: `// Input Modifier

const modifier = (text) => {
  state.notes = state.notes || []

  if (text.match(/> You note:/i)) {
    const note = text.replace(/> You note: ?/i, '').trim()
    state.notes.push({
      pattern: history.map(({text}) => text).join('').split("\\n").pop(),
      note,
      actionCount: info.actionCount,
    })
    state.message = \`Noted: \${note}\` 
    text = ''
  } else {
    delete state.message
  }

  return {text}
}

// Don't modify this part
modifier(text)`,
      context: `// Context Modifier

// info.memoryLength is the length of the memory section of text. text.slice(0, info.memoryLength) will be the memory.
// info.maxChars is the maximum length that text can be. The server will truncate text to this length. 
// info.actionCount is the number of actions in this adventure.

const modifier = (text) => {
  state.notes = state.notes || []

  const contextMemory = info.memoryLength ? text.slice(0, info.memoryLength) : ''
  let context = info.memoryLength ? text.slice(info.memoryLength) : text

  // Assumes that the notes are sorted from oldest to newest.
  state.notes = state.notes.filter(({ pattern, note, actionCount }) => {
    if (actionCount > info.actionCount) {
      // The user must have hit undo, removing this note.
      return false
    }

    const index = context.indexOf(pattern)
    
    if (index >- 1) {
      context = [context.slice(0, index + pattern.length), "\\n", note, context.slice(index + pattern.length)].join('')
      return true
    } else {
      // Only keep ones that were found, otherwise they must have moved out of the history window.
      return false
    }
  })

  // Make sure the new context isn't too long, or it will get truncated by the server.
  context = context.slice(-(info.maxChars - info.memoryLength))
  const finalText = [contextMemory, context].join("\\n")
  return { text: finalText }
}

// Don't modify this part
modifier(text)`
    }
  },

  // ========== GAME SYSTEMS ==========
  {
    id: 'death-island',
    name: 'Death Island',
    category: 'game-systems',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['random-events', 'survival', 'horror'],
    source: 'Official Guidebook',
    description: 'A survival horror system with random dangerous events.',
    purpose: 'Demonstrates random event injection, memory progression, and turn-based mechanics.',
    fileType: 'input',
    content: `const modifier = (text) => {
  let modifiedText = text
  
  if(!state.events){
    state.turn = 0
    state.events = [
    'You hear a rustling in the bushes near you. Suddenly',
    'An ear splitting scream suddenly echoes',
    'You feel a cold chill go up your spine. You look up and see',
    'You suddenly get hit by',
    'Before you can do that you hear a loud crash. You look towards the sound and see a dark demonic looking creature',
    'You discover a horrifying',
    'You hear a terrifying sound',
    'You wake up and realize you were dreaming. You look down and see that your arms are in shackles',
    'A hand grabs your leg and you trip hitting your head on a stone. You wake up in a cage',
    'An uneasy feeling begins to settle in your stomach as',
    'You remember a dark feeling from last night',
    'Suddenly a bloody head rolls toward you from out of the bushes',
    'You see a massive creature',
    'A band of cannibals',
    'You see a band of cannibals',
    'A dark creature',
    'You feel a sharp pain in your side and realize'
    ]
  }
  else{
    modifiedText = "\\n> You try to " + text.substring(7)
  }
  
  state.turn = state.turn + 1
  
    if (state.turn > 10) {
      state.memory = { context: "You have no hope. There are minutes left till you die." }
    }
    else if (state.turn > 6) {
      state.memory = { context: "You're about to die." }
    }
    else if (state.turn > 2) {
      state.memory = { context: "You're probably going to die." }
    }

  const nTurn = Math.floor((Math.random() * 2)) + 3

  if(state.turn % nTurn === 0){
    const eventInd = Math.floor((Math.random() * state.events.length));
      if(eventInd < state.events.length){
        modifiedText = modifiedText + '\\n' + state.events[eventInd]
        state.events.splice(eventInd, 1)
      }
  }
  
    
    // You must return an object with the text property defined. 
  return {text: modifiedText}
}

// Don't modify this part
modifier(text)`
  },
  {
    id: 'guess-or-die',
    name: 'Guess or Die',
    category: 'game-systems',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['minigame', 'multi-file'],
    source: 'Official Guidebook',
    description: 'A number guessing minigame with limited attempts.',
    purpose: 'Shows how to create standalone minigames using input and output modifiers together.',
    files: {
      input: `// Input Modifier
const modifier = (text) => {
  if(!state.initialized) {
    state.initialized = true;
    state.randomNumber = Math.round(Math.random()*9999+1);
    state.remainingGuesses = 13;
  }
    
    let match = text.match(/(\\d+)/)
    if (match && match[1]) {
      state.remainingGuesses--;
      let number = parseInt(match[1]);

      let output = "\\nYou have " + state.remainingGuesses + " guesses remaining.  ";

    if(number == state.randomNumber) {
      output += "\\nYou guessed the number!  Congratulations, you win!";
    } else if (state.remainingGuesses <= 0) {
      output += "\\nYou ran out of guesses!  You are dead.  You lose!";
    } else if (number > state.randomNumber) {
      output += "\\nYour guess is too high!";
    } else if (number < state.randomNumber) {
      output += "\\nYour guess is too low!";
    }
    state.nextOutput = output;
    return {text}
  }
  state.nextOutput = "\\nPlease enter a number!";
  return {text};
}

modifier(text)`,
      output: `// Output Modifier
const modifier = (text) => {
  return {text: state.nextOutput ? state.nextOutput : ""};
}

modifier(text)`
    }
  },
  {
    id: 'sundale-quests',
    name: 'Sundale Quest System',
    category: 'game-systems',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['quests', 'objectives', 'multi-file'],
    source: 'Official Guidebook',
    description: 'A complete quest management system with objectives and progression.',
    purpose: 'Demonstrates complex state management, quest chains, and dynamic objectives.',
    scenarioLink: 'https://play.aidungeon.com/scenario/80sASRH07Lwk/sundale',
    files: {
      input: `// INPUT MODIFIER

const modifier = (text) => {
    state.configuration = {
        enableSelectionOnCompletedQuest: false, // Whether quest selection should be restricted until a specific quest is completed
        enableSelectionOnQuest: 0, // The line number of the quest in the list of quests (e.g. quest on second line = 2) on the Edit Scenario page. Only used when the above is true.
        initialQuests: 0, // The amount of quests inputted into the Edit Scenario page
        quests: [ // The quests that will become available to the player either after the above quest is completed or at the start of the scenario.
            {
                name: "quit your job", // The quest's name, shown in the selection message
                objectives: ["resign from your job"], // The objectives that are part of the quest
                nextQuests: [ // The quests that should be assigned after the player completes this one
                    {
                        name: "find a new job",
                        objectives: ["get a job"],
                        nextQuests: []
                    }
                ]
            }
        ]
    }

    if (state.initialised != true) {
        state.finishedScenario = false
        state.initialised = true
        if (!state.configuration.enableSelectionOnCompletedQuest) {
            state.availableQuests = JSON.parse(JSON.stringify(state.configuration.quests))
        } else {
            state.availableQuests = []
        }
        state.assignedQuest = ""
        state.nextOutput = ""
    }

    state.nextOutput = ""

    if (text.toLowerCase().startsWith("\\n> you take up quest ")) {
        state.assignedQuest = JSON.parse(JSON.stringify(state.availableQuests[text.toLowerCase().substring(21) - 1]))
        quests.push({
            quest: state.assignedQuest.objectives.shift()
        })
        state.nextOutput = "You decide that the next thing you want to do with your life is " + state.assignedQuest.name.toLowerCase() + "."
    } else if (text.toLowerCase().includes("\\n> you give up on your quest.")) {
        state.nextOutput = "You give up on your quest to " + state.assignedQuest.name.toLowerCase() + "."
        state.assignedQuest = ""
        quests.splice(state.configuration.initialQuests)
    }

    return {
        text: text
    }
}

modifier(text)`,
      output: `// OUTPUT MODIFIER

const modifier = (text) => {

    let modifiedText = text

    if (!state.finishedScenario || !state.configuration.enableSelectionOnCompletedQuest) state.message = ""

    if ((state.finishedScenario || !state.configuration.enableSelectionOnCompletedQuest) && state.assignedQuest == "") {
        let questNames = []
        for (let quest of state.availableQuests) {
            questNames.push(quest.name)
        }
        state.message = "Available Quests: " + questNames.join(", ") + ". To take up a quest, type 'take up quest <quest number in list>'."
    } else if (state.assignedQuest != "") {
        if (!quests[state.configuration.initialQuests].completed) {
            state.message = "Current Objective: " + quests[state.configuration.initialQuests].quest + ". To quit, type 'give up on my quest'."
        } else {
            let nextObjective = state.assignedQuest.objectives.shift()
            if (nextObjective == undefined) {
                quests.splice(state.configuration.initialQuests)
                state.availableQuests = state.availableQuests.filter(e => e.name !== state.assignedQuest.name)
                for (let nextQuest of state.assignedQuest.nextQuests) {
                    state.availableQuests.push(nextQuest)
                }
                state.assignedQuest = ""
                let questNames = []
                for (let quest of state.availableQuests) {
                    questNames.push(quest.name)
                }
                state.message = "Available Quests: " + questNames.join(", ") + ". To take up a quest, type 'take up quest <quest number in list>'."
            } else {
                quests.splice(state.configuration.initialQuests)
                quests.push({
                    quest: nextObjective
                })
                state.message = "Objective completed! New objective: " + quests[state.configuration.initialQuests].quest + ". To quit, type 'give up on my quest'."
            }
        }
    }

    if (state.configuration.enableSelectionOnCompletedQuest) {
        if (quests[state.configuration.enableSelectionOnQuest - 1].completed == true && !state.finishedScenario) {
            state.message = "Quests have been assigned and will be accessible next turn."
            state.finishedScenario = true
            state.availableQuests = JSON.parse(JSON.stringify(state.configuration.quests))
        }
    }


    if (state.nextOutput !== "") {
        return {
            text: state.nextOutput
        }
    }

    return {
        text: modifiedText
    };
}

modifier(text)`
    }
  },

  // ========== MAGIC & ABILITIES ==========
  {
    id: 'magic-spells',
    name: 'Magic Spell System',
    category: 'magic',
    difficulty: 'intermediate',
    impact: 'high',
    essential: false,
    tags: ['spells', 'discovery', 'keywords'],
    source: 'Official Guidebook',
    description: 'A spell discovery and casting system where players learn spells.',
    purpose: 'Players discover spells through exploration. Casting learned spells triggers special effects.',
    scenarioLink: 'https://play.aidungeon.com/scenario/ANK4YlUw3xYx/legends-of-magic',
    fileType: 'input',
    content: `// Here's a fun scripting example where players have to learn these magic spells to have cool effects.
// The world info has entries that should hopefully lead people to these spells and so that they can find and cast them.
// Can find the scenario at https://play.aidungeon.com/scenario/ANK4YlUw3xYx/legends-of-magic
// I changed the spell names so it doesn't ruin the discovery if you play the adventure.

const modifier = (text) => {
  
  let modifiedText = text
  state.message = ''
  
  if(!state.spells){
    state.spells = []
  }
  
  const spells = {
    'SPELL1': 'a deathly fire ball spell that',
    'SPELL2': 'turning yourself into a cloud allowing you to move at will',
    'SPELL3': 'a dark spell that summons an evil demon. You hear a dark rumbling and see a cloud of black smoke appear. Out of it appears a large horned demon'
  }
  
  const lowered = text.toLowerCase()
  for (let spellName in spells) {
    if(lowered.includes('cast ' + spellName.toLowerCase())){
      if(!state.spells.includes(spellName)){
        state.spells.push(spellName)
        state.message = "Congrats you've learned the " + spellName + " spell!"
      }
      modifiedText = text + '\\n' + 'You cast ' + spellName + ', ' + spells[spellName]
    }
  }
    
    return {text: modifiedText}
}

modifier(text)`
  },

  // ========== UTILITIES ==========
  {
    id: 'build-card',
    name: 'buildCard()',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['story-cards', 'helper-function'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Creates a new story card with all properties set properly.',
    purpose: 'Simplifies story card creation in scripts. Returns the created card object.',
    fileType: 'library',
    content: `function buildCard(title = "", entry = "", type = "character", 
              keys = title, description = "", insertionIndex = 0) {
    if (![type, title, keys, entry, description].every(arg => 
        (typeof arg === "string"))) {
        throw new Error("buildCard: strings required");
    } else if (!Number.isInteger(insertionIndex)) {
        throw new Error("buildCard: integer required for insertionIndex");
    } else {
        insertionIndex = Math.min(Math.max(0, insertionIndex), 
                                  storyCards.length);
    }
    addStoryCard("%@%");
    for (const [index, card] of storyCards.entries()) {
        if (card.title !== "%@%") continue;
        card.type = type;
        card.title = title;
        card.keys = keys;
        card.entry = entry;
        card.description = description;
        if (index !== insertionIndex) {
            storyCards.splice(index, 1);
            storyCards.splice(insertionIndex, 0, card);
        }
        return Object.seal(card);
    }
    throw new Error("An unexpected error occurred with buildCard");
}`
  },
  {
    id: 'get-card',
    name: 'getCard()',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['story-cards', 'helper-function', 'search'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Find story cards using a predicate function.',
    purpose: 'Like Array.find but specialized for story cards. Can return all matches or just the first.',
    fileType: 'library',
    content: `function getCard(predicate, getAll = false) {
    if (typeof predicate !== "function") {
        throw new Error("getCard: function required");
    } else if (typeof getAll !== "boolean") {
        throw new Error("getCard: boolean required for getAll");
    } else if (getAll) {
        const collectedCards = [];
        for (const card of storyCards) {
            if (predicate(card)) {
                Object.seal(card);
                collectedCards.push(card);
            }
        }
        return collectedCards;
    }
    for (const card of storyCards) {
        if (predicate(card)) {
            return Object.seal(card);
        }
    }
    return null;
}`
  },
  {
    id: 'state-init',
    name: 'State Initialization Pattern',
    category: 'utilities',
    difficulty: 'beginner',
    impact: 'high',
    essential: true,
    tags: ['state', 'initialization', 'pattern'],
    source: 'BetterRepository',
    description: 'Pattern for initializing persistent state variables.',
    purpose: 'Ensures variables persist across turns without resetting. Put in Library.',
    fileType: 'library',
    content: `// Initialize state variables with default values
// These persist across turns and won't reset
state.playerHP = state.playerHP ?? 100;
state.playerMaxHP = state.playerMaxHP ?? 100;
state.gold = state.gold ?? 0;
state.inventory = state.inventory ?? [];
state.flags = state.flags ?? {};`
  },
  {
    id: 'auto-cards',
    name: 'Auto-Cards',
    category: 'tracking',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['automation', 'story-cards', 'memory'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Automatically writes & updates plot-relevant story cards during gameplay.',
    purpose: 'Builds a living reference of your adventure\'s world by detecting named entities and managing long-term memory updates.',
    githubUrl: 'https://github.com/LewdLeah/Auto-Cards',
    scenarioLink: 'https://play.aidungeon.com/scenario/Ddt0Akd-lVtj/auto-cards'
  },
  {
    id: 'inner-self',
    name: 'Inner Self',
    category: 'game-systems',
    difficulty: 'advanced',
    impact: 'high',
    essential: false,
    tags: ['npc', 'agentic', 'memory'],
    source: 'Community',
    author: 'LewdLeah',
    description: 'Improves character goals, secrets, planning, and self-reflection.',
    purpose: 'Maintains NPC "brains" that allow them to learn from experiences, form opinions, and adapt behavior over time.',
    githubUrl: 'https://github.com/LewdLeah/Inner-Self'
  },
  {
    id: 'better-say-actions',
    name: 'Better Say Actions',
    category: 'commands',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: true,
    tags: ['dialogue', 'formatting', 'say-action'],
    source: 'Community',
    author: 'BinKompliziert',
    description: 'Improves the "Say" action with better formatting and custom verbs.',
    purpose: 'Allows actions before dialogue, fixes first-person typos, and adds automatic punctuation.',
    externalUrl: 'https://play.aidungeon.com/scenario/2eiZnXnXXzwR/better-say-actions',
    fileType: 'input',
    content: `const modifier = (text) => {
  text.match(/".*,,/) ? text = text.replace(/says? "\\s*(\\S)(.*),,\\s*(\\S)/i, (m, a, b, c) => a.toLowerCase() + b.trim() + ', "' + c.toUpperCase()).replace(/(you |i )(your? |i )(\\S)/i, (m, a, b, c) => b.charAt(0).toUpperCase() + b.slice(1) + c.toLowerCase()) : text = text.replace(/\\bi says/i, 'I say').replace(/(says?) "\\s*(\\S)/i, (m, a, b) => a + ', "' + b.toUpperCase())
  text.match(/[^.,?!]"\\n/) ? text = text.replace(/\\s*"\\n/, '."\\n') : text = text.replace(/(say)(s?, ".*)([,?!]")/i, (m, a, b, c) => (c == ',"' ? 'begin' : c == '?"' ? 'ask' : c == '!"' ? 'shout' : '') + b.trim() + c)
  return { text }
}

modifier(text)`
  },
  {
    id: 'custom-continue',
    name: 'Custom Continue',
    category: 'utilities',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['continue-action', 'system-prompt'],
    source: 'Community',
    author: 'Magic',
    description: 'Custom instructions when the player uses the Continue action.',
    purpose: 'Injects specific instructions when the AI is asked to continue from its last response.',
    fileType: 'context',
    content: `const prompt = 'Please continue from your last response';

const continueInstructions = \`\\n<SYSTEM>\\n\${prompt}\\n</SYSTEM>\`;

const modifier = (text) => {
  const isContinue = history.at(-1)?.type === 'continue'
  const isActionComplete = /> [A-Z]/.test(text.split(/\\n/).filter((t) => t.trim() !== '').at(-1) || '')
  
  if (isContinue && !isActionComplete) {
    return { text: text + continueInstructions }
  }
  
  return { text }
}

modifier(text)`
  },
  {
    id: 'prevent-start-message',
    name: 'Prevent Start Message',
    category: 'utilities',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['initialization', 'starting-message'],
    source: 'Community',
    author: 'Burnout',
    description: 'Prevents the AI from generating an automatic starting message.',
    purpose: 'Useful for scenarios where you want the player to start or have a custom instruction message.',
    fileType: 'output',
    content: `const modifier = (text) => {
  if (info.actionCount === 0)
    return { text: " [Place instruction here for users to edit this message.]"}
  return { text }
}

modifier(text)`
  },

  // ========== BETTERSCRIPTS ==========
  // Scripts that use BetterDungeon widgets to display game state.
  // Requires the BetterDungeon browser extension.
  {
    id: 'betterscripts-simple-counter',
    name: 'Simple Turn Counter',
    category: 'betterscripts',
    difficulty: 'beginner',
    impact: 'low',
    essential: true,
    tags: ['widgets', 'counter', 'turn', 'betterscripts', 'stat-widget', 'minimal'],
    source: 'BetterRepository',
    description: 'Minimal example showing a single stat widget that counts turns.',
    purpose: 'The simplest BetterScripts example. Demonstrates the "stat" widget type. Great starting point for learning.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Simple Turn Counter
// ============================================
// Demonstrates the "stat" widget type.
// This is the simplest possible BetterScripts example.

state.turn = state.turn ?? 0;

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================
// These helpers create the protocol messages that
// BetterDungeon detects and processes into widgets.

function bdMessage(message) {
  return \`[[BD:\${JSON.stringify(message)}:BD]]\`;
}

function bdWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'create',
    config: config
  });
}`,
      context: `const modifier = (text) => {
  // Strip protocol messages so AI doesn't see or repeat them
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');
  return { text };
};

modifier(text);`,
      output: `const modifier = (text) => {
  // Increment turn counter
  state.turn++;
  
  // Create stat widget showing turn count
  const widget = bdWidget('turn-counter', {
    type: 'stat',
    label: 'Turn',
    value: state.turn,
    color: '#60a5fa'
  });
  
  return { text: text + widget };
};

modifier(text);`
    }
  },
  {
    id: 'betterscripts-rpg-stats',
    name: 'RPG Stats Widget',
    category: 'betterscripts',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['widgets', 'hp', 'stats', 'betterscripts', 'bar-widget', 'panel-widget'],
    source: 'BetterRepository',
    description: 'Displays HP bar, gold, level, and status using BetterDungeon widgets.',
    purpose: 'Demonstrates "bar" and "panel" widget types. Tracks game state and updates widgets based on story content.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - RPG Stats Widget
// ============================================
// Demonstrates "bar" and "panel" widget types.
// Tracks HP, gold, XP, and level progression.

state.game = state.game ?? {
  turn: 0,
  hp: 100,
  maxHp: 100,
  gold: 0,
  level: 1,
  xp: 0,
  xpToLevel: 100,
  status: 'Healthy'
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

function bdMessage(message) {
  return \`[[BD:\${JSON.stringify(message)}:BD]]\`;
}

function bdWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'create',
    config: config
  });
}

// ============================================
// GAME HELPERS
// ============================================

function getHpColor(current, max) {
  const percent = (current / max) * 100;
  if (percent > 50) return '#22c55e';
  if (percent > 25) return '#fbbf24';
  return '#ef4444';
}

function getStatus(current, max) {
  const percent = (current / max) * 100;
  if (percent <= 0) return 'Dead';
  if (percent <= 25) return 'Critical';
  if (percent <= 50) return 'Wounded';
  if (percent <= 75) return 'Injured';
  return 'Healthy';
}`,
      context: `const modifier = (text) => {
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');
  return { text };
};

modifier(text);`,
      output: `const modifier = (text) => {
  const game = state.game;
  const lowerText = text.toLowerCase();
  
  game.turn++;
  
  // Detect damage
  if (lowerText.includes('hit') || lowerText.includes('wound') || 
      lowerText.includes('hurt') || lowerText.includes('damage')) {
    const damage = Math.floor(Math.random() * 15) + 5;
    game.hp = Math.max(0, game.hp - damage);
  }
  
  // Detect healing
  if (lowerText.includes('heal') || lowerText.includes('potion') || 
      lowerText.includes('rest') || lowerText.includes('recover')) {
    const healing = Math.floor(Math.random() * 20) + 10;
    game.hp = Math.min(game.maxHp, game.hp + healing);
  }
  
  // Detect loot
  if (lowerText.includes('gold') || lowerText.includes('coin') || 
      lowerText.includes('treasure') || lowerText.includes('loot')) {
    game.gold += Math.floor(Math.random() * 50) + 10;
    game.xp += 10;
  }
  
  // Level up check
  if (game.xp >= game.xpToLevel) {
    game.level++;
    game.xp -= game.xpToLevel;
    game.xpToLevel = Math.floor(game.xpToLevel * 1.5);
    game.maxHp += 10;
    game.hp = game.maxHp;
  }
  
  game.status = getStatus(game.hp, game.maxHp);
  const hpColor = getHpColor(game.hp, game.maxHp);
  
  let widgets = '';
  
  // HP bar widget
  widgets += bdWidget('hp-bar', {
    type: 'bar',
    label: 'HP',
    value: game.hp,
    max: game.maxHp,
    color: hpColor,
    showValue: true
  });
  
  // Character panel widget
  widgets += bdWidget('player-stats', {
    type: 'panel',
    title: 'Character',
    items: [
      { label: 'Level', value: game.level, color: '#a855f7' },
      { label: 'XP', value: game.xp + '/' + game.xpToLevel, color: '#60a5fa' },
      { label: 'Gold', value: game.gold, color: '#fbbf24' },
      { label: 'Status', value: game.status, color: hpColor }
    ]
  });
  
  return { text: text + widgets };
};

modifier(text);`
    }
  },
  {
    id: 'betterscripts-inventory',
    name: 'Inventory Panel',
    category: 'betterscripts',
    difficulty: 'intermediate',
    impact: 'medium',
    essential: false,
    tags: ['widgets', 'inventory', 'items', 'betterscripts', 'panel-widget'],
    source: 'BetterRepository',
    description: 'Tracks inventory items with add/remove detection.',
    purpose: 'Demonstrates "panel" widget with dynamic item lists. Detects items picked up or dropped in the story.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - BetterScripts Inventory
// ============================================
// Demonstrates the "panel" widget with dynamic items.
// Tracks items picked up and dropped.

state.inventory = state.inventory ?? [];

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

function bdMessage(message) {
  return \`[[BD:\${JSON.stringify(message)}:BD]]\`;
}

function bdWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'create',
    config: config
  });
}

function bdDestroyWidget(widgetId) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'destroy'
  });
}

// ============================================
// ITEM DEFINITIONS
// ============================================

const ITEMS = [
  { pattern: /sword/i, name: 'Sword', icon: '⚔️' },
  { pattern: /shield/i, name: 'Shield', icon: '🛡️' },
  { pattern: /potion/i, name: 'Potion', icon: '🧪' },
  { pattern: /key/i, name: 'Key', icon: '🔑' },
  { pattern: /torch/i, name: 'Torch', icon: '🔥' },
  { pattern: /rope/i, name: 'Rope', icon: '🪢' },
  { pattern: /map/i, name: 'Map', icon: '🗺️' },
  { pattern: /bow/i, name: 'Bow', icon: '🏹' },
  { pattern: /armor|armour/i, name: 'Armor', icon: '🛡️' },
  { pattern: /staff/i, name: 'Staff', icon: '🪄' }
];

function getItemByName(name) {
  return ITEMS.find(i => i.name === name);
}`,
      context: `const modifier = (text) => {
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');
  return { text };
};

modifier(text);`,
      output: `// ============================================
// OUTPUT MODIFIER - Track Inventory Changes
// ============================================

const modifier = (text) => {
  const lowerText = text.toLowerCase();
  
  // Detect item pickups
  const pickupPatterns = [/pick(?:ed)? up/i, /grab(?:bed)?/i, /take(?:s)?/i, /found/i, /receive(?:d)?/i, /obtain(?:ed)?/i];
  const isPickup = pickupPatterns.some(p => p.test(lowerText));
  
  // Detect item drops/use
  const dropPatterns = [/drop(?:ped)?/i, /use(?:d)?/i, /lose(?:s)?/i, /lost/i, /gave/i, /throw(?:s)?/i];
  const isDrop = dropPatterns.some(p => p.test(lowerText));
  
  // Check for items in text
  ITEMS.forEach(item => {
    if (item.pattern.test(lowerText)) {
      const hasItem = state.inventory.includes(item.name);
      
      if (isPickup && !hasItem) {
        state.inventory.push(item.name);
      } else if (isDrop && hasItem) {
        state.inventory = state.inventory.filter(i => i !== item.name);
      }
    }
  });
  
  // Build widget
  let widgets = '';
  
  if (state.inventory.length > 0) {
    const items = state.inventory.map(name => {
      const item = getItemByName(name);
      return { label: item?.icon || '•', value: name };
    });
    
    widgets = bdWidget('inventory', {
      type: 'panel',
      title: 'Inventory (' + state.inventory.length + ')',
      items: items
    });
  } else {
    // Hide widget when empty
    widgets = bdDestroyWidget('inventory');
  }
  
  return { text: text + widgets };
};

modifier(text);`
    }
  },
  {
    id: 'betterscripts-location',
    name: 'Location Tracker',
    category: 'betterscripts',
    difficulty: 'beginner',
    impact: 'medium',
    essential: false,
    tags: ['widgets', 'location', 'betterscripts', 'text-widget'],
    source: 'BetterRepository',
    description: 'Tracks and displays current location using a text widget.',
    purpose: 'Demonstrates the "text" widget type. Detects location changes from story content.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Location Tracker
// ============================================
// Demonstrates the "text" widget type.
// Tracks current location from story context.

state.location = state.location ?? 'Unknown';

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

function bdMessage(message) {
  return \`[[BD:\${JSON.stringify(message)}:BD]]\`;
}

function bdWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'create',
    config: config
  });
}

// ============================================
// LOCATION DEFINITIONS
// ============================================

const LOCATIONS = [
  { pattern: /tavern|inn|bar/i, name: 'Tavern', icon: '🍺' },
  { pattern: /forest|woods|trees/i, name: 'Forest', icon: '🌲' },
  { pattern: /castle|palace|throne/i, name: 'Castle', icon: '🏰' },
  { pattern: /cave|cavern|underground/i, name: 'Cave', icon: '🕳️' },
  { pattern: /village|town|market/i, name: 'Village', icon: '🏘️' },
  { pattern: /dungeon|prison|cell/i, name: 'Dungeon', icon: '⛓️' },
  { pattern: /mountain|peak|cliff/i, name: 'Mountain', icon: '⛰️' },
  { pattern: /river|lake|water|stream/i, name: 'Waterside', icon: '🌊' },
  { pattern: /road|path|trail/i, name: 'Road', icon: '🛤️' },
  { pattern: /home|house|cottage/i, name: 'Home', icon: '🏠' }
];`,
      context: `const modifier = (text) => {
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');
  return { text };
};

modifier(text);`,
      output: `const modifier = (text) => {
  const lowerText = text.toLowerCase();
  
  // Detect location from text
  for (const loc of LOCATIONS) {
    if (loc.pattern.test(lowerText)) {
      state.location = loc.icon + ' ' + loc.name;
      break;
    }
  }
  
  // Create text widget showing location
  const widget = bdWidget('location', {
    type: 'text',
    text: state.location,
    style: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#a3e635'
    }
  });
  
  return { text: text + widget };
};

modifier(text);`
    }
  },
  {
    id: 'betterscripts-debug-console',
    name: 'BetterScripts Debug Console',
    category: 'betterscripts',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['widgets', 'debug', 'testing', 'betterscripts', 'commands', 'developer-tool'],
    source: 'BetterRepository',
    description: 'A debug console for testing BetterScripts widgets using : commands in Do actions.',
    purpose: 'Allows developers to test all widget types, debug communication, and verify BetterScripts functionality. Type ":help" for available commands.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - BetterScripts Debug Console
// ============================================
// A comprehensive debug tool for testing BetterScripts.
// Use : commands in Do actions to control widgets.
//
// COMMANDS:
//   :help                    - Show all commands
//   :ping                    - Test BetterScripts connection
//   :clear                   - Remove all widgets
//   :stat <id> <label> <val> - Create stat widget
//   :bar <id> <val> <max>    - Create bar widget  
//   :text <id> <message>     - Create text widget
//   :panel <id> <title>      - Create panel widget
//   :custom <id> <html>      - Create custom widget
//   :update <id> <prop> <v>  - Update widget property
//   :destroy <id>            - Remove specific widget
//   :demo                    - Show demo widgets
//   :stress <count>          - Stress test with N widgets

state.bd = state.bd ?? {
  turn: 0,
  lastCommand: null,
  lastResult: null,
  debugMode: true
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

function bdMessage(message) {
  // Add protocol version
  message.v = '1.0';
  return \`[[BD:\${JSON.stringify(message)}:BD]]\`;
}

function bdWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'create',
    config: config
  });
}

function bdUpdateWidget(widgetId, config) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'update',
    config: config
  });
}

function bdDestroyWidget(widgetId) {
  return bdMessage({
    type: 'widget',
    widgetId: widgetId,
    action: 'destroy'
  });
}

function bdPing(data) {
  return bdMessage({
    type: 'ping',
    timestamp: Date.now(),
    data: data || 'debug-console'
  });
}

function bdRegister() {
  return bdMessage({
    type: 'register',
    scriptId: 'debug-console',
    scriptName: 'BetterScripts Debug Console',
    version: '1.0.0',
    capabilities: ['widgets', 'debug']
  });
}

// ============================================
// COMMAND PARSER
// ============================================

function parseCommand(input) {
  // Match : commands - handle quoted strings
  const match = input.match(/^:([\\w-]+)(?:\\s+(.*))?$/);
  if (!match) return null;
  
  const command = match[1].toLowerCase();
  const argsStr = match[2] || '';
  
  // Parse arguments (support quoted strings)
  const args = [];
  const regex = /"([^"]+)"|'([^']+)'|(\\S+)/g;
  let m;
  while ((m = regex.exec(argsStr)) !== null) {
    args.push(m[1] || m[2] || m[3]);
  }
  
  return { command, args, raw: argsStr };
}

// ============================================
// COMMAND HANDLERS
// ============================================

const COMMANDS = {
  help: {
    desc: 'Show all available commands',
    usage: ':help',
    handler: () => {
      let helpText = '\\n📖 **BetterScripts Debug Console**\\n';
      helpText += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n';
      for (const [name, cmd] of Object.entries(COMMANDS)) {
        helpText += \`• \${cmd.usage} - \${cmd.desc}\\n\`;
      }
      return { output: helpText, widgets: '' };
    }
  },
  
  ping: {
    desc: 'Test BetterScripts connection',
    usage: ':ping',
    handler: () => {
      const widgets = bdPing('manual-ping-' + Date.now());
      return { 
        output: '\\n🏓 Ping sent! Check browser console for pong event.', 
        widgets 
      };
    }
  },
  
  register: {
    desc: 'Send script registration message',
    usage: ':register',
    handler: () => {
      const widgets = bdRegister();
      return { 
        output: '\\n📝 Registration sent! Check browser console for event.', 
        widgets 
      };
    }
  },
  
  clear: {
    desc: 'Remove all debug widgets',
    usage: ':clear',
    handler: () => {
      // Use clearAll message type for efficient clearing (single message)
      const widgets = bdMessage({ type: 'clearAll' });
      state.bd.lastResult = 'Cleared all widgets';
      return { output: '\\n🧹 All debug widgets cleared.', widgets };
    }
  },
  
  stat: {
    desc: 'Create a stat widget',
    usage: ':stat <id> <label> <value> [color]',
    handler: (args) => {
      const id = args[0] || 'test-stat';
      const label = args[1] || 'Test';
      const value = args[2] || '42';
      const color = args[3] || '#60a5fa';
      
      const widgets = bdWidget(id, {
        type: 'stat',
        label: label,
        value: value,
        color: color
      });
      
      return { 
        output: \`\\n📊 Created stat widget "\${id}": \${label} = \${value}\`, 
        widgets 
      };
    }
  },
  
  bar: {
    desc: 'Create a bar widget',
    usage: ':bar <id> <value> <max> [label] [color]',
    handler: (args) => {
      const id = args[0] || 'test-bar';
      const value = parseInt(args[1]) || 75;
      const max = parseInt(args[2]) || 100;
      const label = args[3] || 'Progress';
      const color = args[4] || '#22c55e';
      
      const widgets = bdWidget(id, {
        type: 'bar',
        label: label,
        value: value,
        max: max,
        color: color,
        showValue: true
      });
      
      return { 
        output: \`\\n📈 Created bar widget "\${id}": \${label} \${value}/\${max}\`, 
        widgets 
      };
    }
  },
  
  text: {
    desc: 'Create a text widget',
    usage: ':text <id> <message> [color]',
    handler: (args) => {
      const id = args[0] || 'test-text';
      const message = args[1] || 'Hello BetterScripts!';
      const color = args[2] || '#fbbf24';
      
      const widgets = bdWidget(id, {
        type: 'text',
        text: message,
        style: {
          color: color,
          fontWeight: 'bold'
        }
      });
      
      return { 
        output: \`\\n💬 Created text widget "\${id}": "\${message}"\`, 
        widgets 
      };
    }
  },
  
  panel: {
    desc: 'Create a panel widget with sample items',
    usage: ':panel <id> <title>',
    handler: (args) => {
      const id = args[0] || 'test-panel';
      const title = args[1] || 'Test Panel';
      
      const widgets = bdWidget(id, {
        type: 'panel',
        title: title,
        items: [
          { label: 'Item 1', value: 'Value A', color: '#60a5fa' },
          { label: 'Item 2', value: 'Value B', color: '#22c55e' },
          { label: 'Item 3', value: 'Value C', color: '#fbbf24' }
        ]
      });
      
      return { 
        output: \`\\n📋 Created panel widget "\${id}": "\${title}"\`, 
        widgets 
      };
    }
  },
  
  custom: {
    desc: 'Create a custom HTML widget',
    usage: ':custom <id> <html>',
    handler: (args) => {
      const id = args[0] || 'test-custom';
      const html = args[1] || '<div style="padding:8px;background:#1e1e2e;border-radius:4px;"><strong style="color:#f472b6;">Custom</strong> <span style="color:#94a3b8;">HTML Widget</span></div>';
      
      const widgets = bdWidget(id, {
        type: 'custom',
        html: html
      });
      
      return { 
        output: \`\\n🎨 Created custom widget "\${id}"\`, 
        widgets 
      };
    }
  },
  
  update: {
    desc: 'Update a widget property',
    usage: ':update <id> <property> <value>',
    handler: (args) => {
      const id = args[0];
      const prop = args[1];
      const value = args[2];
      
      if (!id || !prop) {
        return { output: '\\n❌ Usage: :update <id> <property> <value>', widgets: '' };
      }
      
      // Parse value (handle numbers)
      let parsedValue = value;
      if (!isNaN(value) && value !== '') {
        parsedValue = parseFloat(value);
      }
      
      const config = {};
      config[prop] = parsedValue;
      
      const widgets = bdUpdateWidget(id, config);
      
      return { 
        output: \`\\n✏️ Updated "\${id}".\${prop} = \${parsedValue}\`, 
        widgets 
      };
    }
  },
  
  destroy: {
    desc: 'Destroy a specific widget',
    usage: ':destroy <id>',
    handler: (args) => {
      const id = args[0];
      if (!id) {
        return { output: '\\n❌ Usage: :destroy <id>', widgets: '' };
      }
      
      const widgets = bdDestroyWidget(id);
      return { output: \`\\n🗑️ Destroyed widget "\${id}"\`, widgets };
    }
  },
  
  demo: {
    desc: 'Show demo widgets of all types',
    usage: ':demo',
    handler: () => {
      let widgets = '';
      
      // HP Bar
      widgets += bdWidget('demo-hp', {
        type: 'bar',
        label: 'HP',
        value: 75,
        max: 100,
        color: '#ef4444',
        showValue: true
      });
      
      // Gold stat
      widgets += bdWidget('demo-gold', {
        type: 'stat',
        label: 'Gold',
        value: '1,250',
        color: '#fbbf24'
      });
      
      // Status text
      widgets += bdWidget('demo-status', {
        type: 'text',
        text: '⚔️ In Combat',
        style: { color: '#f472b6', fontWeight: 'bold' }
      });
      
      // Character panel
      widgets += bdWidget('demo-panel', {
        type: 'panel',
        title: 'Character',
        items: [
          { label: 'Level', value: '12', color: '#a855f7' },
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4,500/5,000', color: '#22c55e' }
        ]
      });
      
      return { 
        output: '\\n🎮 Demo widgets created! (HP bar, Gold stat, Status text, Character panel)', 
        widgets 
      };
    }
  },
  
  stress: {
    desc: 'Stress test with N widgets',
    usage: ':stress <count>',
    handler: (args) => {
      const count = Math.min(parseInt(args[0]) || 10, 50);
      let widgets = '';
      
      for (let i = 0; i < count; i++) {
        widgets += bdWidget('stress-' + i, {
          type: 'stat',
          label: 'Widget ' + i,
          value: Math.floor(Math.random() * 100),
          color: \`hsl(\${(i * 360 / count)}, 70%, 60%)\`
        });
      }
      
      return { 
        output: \`\\n🔥 Created \${count} stress test widgets\`, 
        widgets 
      };
    }
  },
  
  version: {
    desc: 'Test protocol version handling',
    usage: ':version <v>',
    handler: (args) => {
      const version = args[0] || '1.0';
      // Send a message with custom version
      const msg = {
        type: 'ping',
        v: version,
        timestamp: Date.now(),
        data: 'version-test'
      };
      const widgets = \`[[BD:\${JSON.stringify(msg)}:BD]]\`;
      return { 
        output: \`\\n🔢 Sent ping with protocol version "\${version}"\`, 
        widgets 
      };
    }
  },
  
  invalid: {
    desc: 'Send an invalid message to test error handling',
    usage: ':invalid <type>',
    handler: (args) => {
      const errorType = args[0] || 'type';
      let widgets = '';
      
      switch (errorType) {
        case 'json':
          widgets = '[[BD:{ invalid json :BD]]';
          break;
        case 'type':
          widgets = bdMessage({ type: 'nonexistent_type' });
          break;
        case 'widget':
          widgets = bdWidget('bad-widget', { /* missing type */ });
          break;
        case 'id':
          widgets = bdWidget('bad widget id!@#', { type: 'stat', label: 'X', value: 1 });
          break;
        default:
          widgets = bdMessage({ type: 'unknown_message_type' });
      }
      
      return { 
        output: \`\\n⚠️ Sent invalid message (type: \${errorType}). Check console for errors.\`, 
        widgets 
      };
    }
  }
};

// ============================================
// EXECUTE COMMAND
// ============================================

function executeCommand(input) {
  const parsed = parseCommand(input);
  if (!parsed) return null;
  
  const handler = COMMANDS[parsed.command];
  if (!handler) {
    return { 
      output: \`\\n❌ Unknown command: "\${parsed.command}". Type :help for commands.\`,
      widgets: ''
    };
  }
  
  state.bd.lastCommand = parsed;
  const result = handler.handler(parsed.args);
  state.bd.lastResult = result.output;
  return result;
}`,
      context: `// ============================================
// CONTEXT MODIFIER - Strip Protocol Messages
// ============================================
// Critical: Remove [[BD:...:BD]] so AI doesn't see or hallucinate them.

const modifier = (text) => {
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');
  return { text };
};

modifier(text);`,
      input: `// ============================================
// INPUT MODIFIER - Parse : Commands (Story Action)
// ============================================
// Detects commands in Story actions starting with :
// Use Story action (not Do) to type commands like :help
//
// NOTE: We can't use stop:true in onInput (throws error).
// Instead, we detect command, store result, and replace
// the input with a placeholder. Output modifier handles display.

const modifier = (text) => {
  state.bd.turn++;
  state.bd.isCommand = false;
  
  // Get raw input text (trim whitespace)
  const input = text.trim();
  
  // Check if input starts with : (our command prefix)
  if (input.startsWith(':')) {
    const result = executeCommand(input);
    
    if (result) {
      // Store for output modifier to display
      state.bd.pendingOutput = result.output;
      state.bd.pendingWidgets = result.widgets;
      state.bd.isCommand = true;
      
      // Replace input with placeholder (AI will respond to this)
      // We'll override the output in the output modifier
      return { text: '[DEBUG COMMAND]' };
    }
  }
  
  // Not a command - pass through normally
  return { text };
};

modifier(text);`,
      output: `// ============================================
// OUTPUT MODIFIER - Display Results
// ============================================
// Shows command results and appends widget protocol messages.
// If a command was detected in input, we override the AI output.

const modifier = (text) => {
  let output = text;
  let widgets = '';
  
  // Check for pending command output (override AI response)
  if (state.bd.isCommand && state.bd.pendingOutput) {
    output = state.bd.pendingOutput;
    widgets = state.bd.pendingWidgets || '';
    
    // Clear pending
    state.bd.pendingOutput = null;
    state.bd.pendingWidgets = null;
    state.bd.isCommand = false;
  }
  
  // Always show turn counter widget
  widgets += bdWidget('console-turn', {
    type: 'stat',
    label: 'Turn',
    value: state.bd.turn,
    color: '#94a3b8'
  });
  
  return { text: output + widgets };
};

modifier(text);`
    }
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get scripts by category
export const getScriptsByCategory = (categoryId) => {
  return SCRIPTS.filter(s => s.category === categoryId)
}

// Get all scripts
export const getAllScripts = () => SCRIPTS

// Get essential scripts (recommended for beginners)
export const getEssentialScripts = () => {
  return SCRIPTS.filter(s => s.essential === true)
}

// Get scripts by difficulty
export const getScriptsByDifficulty = (difficulty) => {
  return SCRIPTS.filter(s => s.difficulty === difficulty)
}

// Get beginner scripts
export const getBeginnerScripts = () => getScriptsByDifficulty('beginner')

// Search scripts (includes name, description, tags, purpose, author)
export const searchScripts = (query) => {
  if (!query || !query.trim()) {
    return SCRIPTS
  }
  const results = searchCollectionSmart(
    SCRIPTS,
    query,
    ['name', 'description', 'tags', 'purpose', 'author'],
    { useTagAliases: true }
  )
  return results.map(result => result.item)
}

// Check if script has copyable code content
export const hasCodeContent = (script) => {
  return !!(script.content || script.files)
}

// Get category by ID
export const getCategoryById = (categoryId) => {
  return SCRIPT_CATEGORIES.find(c => c.id === categoryId)
}

// Get category counts
export const getCategoryCounts = () => {
  const counts = {}
  SCRIPT_CATEGORIES.forEach(cat => {
    counts[cat.id] = SCRIPTS.filter(s => s.category === cat.id).length
  })
  return counts
}

// Update category counts in SCRIPT_CATEGORIES
export const updateCategoryCounts = () => {
  SCRIPT_CATEGORIES.forEach(cat => {
    cat.count = SCRIPTS.filter(s => s.category === cat.id).length
  })
}

// Initialize counts on load
updateCategoryCounts()
