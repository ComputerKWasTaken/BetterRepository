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
    description: 'Minimal example: displays turn count and a location badge using stat and badge widgets.',
    purpose: 'The simplest BetterScripts example. Demonstrates bdWidget for creating and updating widgets. Great starting point for learning.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Simple Turn Counter
// ============================================
// The simplest possible BetterScripts example.
// Demonstrates bdWidget for creating and updating widgets.

// BetterScripts protocol helpers
function bdMessage(msg) { return \`[[BD:\${JSON.stringify(msg)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// Persistent state
state.location = state.location ?? 'Town';`,
      context: `// Strip protocol messages from AI context
const modifier = (text) => {
  return { text: text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '') };
};
modifier(text);`,
      output: `// Display turn counter and location badge
const modifier = (text) => {
  let widgets = '';

  // Turn counter (bdWidget creates or updates existing widget)
  widgets += bdWidget('turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#60a5fa',
    align: 'left',
    order: 1
  });

  // Location badge
  widgets += bdWidget('location', {
    type: 'badge',
    text: state.location,
    icon: '📍',
    color: '#a855f7',
    variant: 'subtle',
    align: 'right',
    order: 1
  });

  return { text: text + widgets };
};
modifier(text);`
    }
  },
  {
    id: 'chronos-time-system',
    name: 'Chronos Time System',
    category: 'betterscripts',
    difficulty: 'intermediate',
    impact: 'high',
    essential: true,
    tags: ['widgets', 'time', 'clock', 'day-night', 'betterscripts', 'context', 'commands', 'calendar', 'weather', 'story-cards', 'moon'],
    source: 'BetterRepository',
    description: 'Full-featured time, date, weather, and moon phase system with story card configuration and BetterScripts widget support.',
    purpose: 'Tracks time, weekday, month, year, and optional weather. Configurable via story cards. Enhanced with BetterScripts widgets when BetterDungeon is present. Commands: :time, :date, :advance, :sleep, :settime, :setdate, :weather, :chronos.',
    requiresExtension: null,
    files: {
      library: `// ============================================
// LIBRARY - Chronos Time System
// ============================================
// Full-featured time, date, calendar, and weather system.
// - Configurable minutes per turn (default: 2)
// - Full calendar: hour, minute, day, month, year
// - Time periods: Midnight, Dawn, Morning, Afternoon, Evening, Night
// - Season tracking derived from month
// - Optional weather system with season-aware transitions
// - Story card configuration and command reference
// - BetterScripts widget support (standalone-capable)

// ============================================
// STATE INITIALIZATION
// ============================================

state.chronos = state.chronos ?? {
  minute: 0,
  hour: 8,
  day: 1,
  month: 1,
  year: 1,
  config: {
    minutesPerTurn: 2,
    use12HourFormat: true,
    useBetterScripts: false,
    showTimeInOutput: true,
    weatherEnabled: false,
    enabled: true,
    weatherChangeCooldown: 15,
    temperatureUnit: 'F',
    wakeHour: 7,
    customWeekdays: null,
    customMonths: null
  },
  weather: {
    current: 'clear',
    temperature: 70,
    lastChange: 0
  },
  pendingOutput: null,
  isCommand: false,
  lastActionCount: -1,
  initialized: false
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

function bdMessage(msg) { return \`[[BD:\${JSON.stringify(msg)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// ============================================
// CONSTANTS
// ============================================

const DEFAULT_WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const DEFAULT_MONTHS = [
  { name: 'January', days: 31 }, { name: 'February', days: 28 },
  { name: 'March', days: 31 }, { name: 'April', days: 30 },
  { name: 'May', days: 31 }, { name: 'June', days: 30 },
  { name: 'July', days: 31 }, { name: 'August', days: 31 },
  { name: 'September', days: 30 }, { name: 'October', days: 31 },
  { name: 'November', days: 30 }, { name: 'December', days: 31 }
];

const TIME_PERIODS = [
  { name: 'Midnight', icon: '\\u{1F311}', start: 0, end: 4 },
  { name: 'Dawn', icon: '\\u{1F305}', start: 4, end: 6 },
  { name: 'Morning', icon: '\\u{2600}\\u{FE0F}', start: 6, end: 12 },
  { name: 'Afternoon', icon: '\\u{1F324}\\u{FE0F}', start: 12, end: 17 },
  { name: 'Evening', icon: '\\u{1F306}', start: 17, end: 21 },
  { name: 'Night', icon: '\\u{1F319}', start: 21, end: 24 }
];

const SEASONS = [
  { name: 'Summer', months: [6, 7, 8] },
  { name: 'Autumn', months: [9, 10, 11] },
  { name: 'Winter', months: [12, 1, 2] },
  { name: 'Spring', months: [3, 4, 5] }
];

const MOON_PHASES = [
  { name: 'New Moon', icon: '\\u{1F311}' },
  { name: 'Waxing Crescent', icon: '\\u{1F312}' },
  { name: 'First Quarter', icon: '\\u{1F313}' },
  { name: 'Waxing Gibbous', icon: '\\u{1F314}' },
  { name: 'Full Moon', icon: '\\u{1F315}' },
  { name: 'Waning Gibbous', icon: '\\u{1F316}' },
  { name: 'Last Quarter', icon: '\\u{1F317}' },
  { name: 'Waning Crescent', icon: '\\u{1F318}' }
];

// Weather conditions with transition weights per season
// Each condition maps to an array of [condition, weight] for possible next states
const WEATHER_CONDITIONS = {
  clear: { icon: '\\u{2600}\\u{FE0F}', label: 'Clear skies' },
  partly_cloudy: { icon: '\\u{26C5}', label: 'Partly cloudy' },
  cloudy: { icon: '\\u{2601}\\u{FE0F}', label: 'Cloudy' },
  overcast: { icon: '\\u{2601}\\u{FE0F}', label: 'Overcast' },
  light_rain: { icon: '\\u{1F326}\\u{FE0F}', label: 'Light rain' },
  rain: { icon: '\\u{1F327}\\u{FE0F}', label: 'Rain' },
  heavy_rain: { icon: '\\u{1F327}\\u{FE0F}', label: 'Heavy rain' },
  thunderstorm: { icon: '\\u{26C8}\\u{FE0F}', label: 'Thunderstorm' },
  light_snow: { icon: '\\u{1F328}\\u{FE0F}', label: 'Light snow' },
  snow: { icon: '\\u{2744}\\u{FE0F}', label: 'Snow' },
  heavy_snow: { icon: '\\u{2744}\\u{FE0F}', label: 'Heavy snow' },
  fog: { icon: '\\u{1F32B}\\u{FE0F}', label: 'Fog' },
  windy: { icon: '\\u{1F4A8}', label: 'Windy' }
};

// Season-weighted weather transition table
// Key = current weather, value = { season: [[nextWeather, weight], ...] }
const WEATHER_TRANSITIONS = {
  clear: {
    Spring: [['clear',4],['partly_cloudy',3],['light_rain',1],['windy',1]],
    Summer: [['clear',5],['partly_cloudy',2],['thunderstorm',1]],
    Autumn: [['clear',3],['partly_cloudy',3],['cloudy',2],['fog',1]],
    Winter: [['clear',3],['partly_cloudy',2],['cloudy',2],['light_snow',1],['fog',1]]
  },
  partly_cloudy: {
    Spring: [['clear',3],['partly_cloudy',3],['cloudy',2],['light_rain',1]],
    Summer: [['clear',3],['partly_cloudy',3],['cloudy',1],['thunderstorm',1]],
    Autumn: [['clear',2],['partly_cloudy',3],['cloudy',3],['light_rain',1]],
    Winter: [['clear',2],['partly_cloudy',3],['cloudy',3],['light_snow',1]]
  },
  cloudy: {
    Spring: [['partly_cloudy',2],['cloudy',3],['overcast',2],['light_rain',2]],
    Summer: [['partly_cloudy',3],['cloudy',3],['thunderstorm',2]],
    Autumn: [['partly_cloudy',2],['cloudy',3],['overcast',2],['rain',1],['fog',1]],
    Winter: [['partly_cloudy',2],['cloudy',3],['overcast',2],['light_snow',2]]
  },
  overcast: {
    Spring: [['cloudy',3],['overcast',3],['light_rain',2],['rain',1]],
    Summer: [['cloudy',3],['overcast',2],['heavy_rain',1],['thunderstorm',2]],
    Autumn: [['cloudy',2],['overcast',3],['rain',2],['fog',1]],
    Winter: [['cloudy',2],['overcast',3],['snow',2],['light_snow',2]]
  },
  light_rain: {
    Spring: [['partly_cloudy',2],['cloudy',2],['light_rain',3],['rain',2]],
    Summer: [['partly_cloudy',2],['light_rain',3],['rain',2],['thunderstorm',1]],
    Autumn: [['cloudy',2],['light_rain',3],['rain',3]],
    Winter: [['cloudy',2],['light_rain',2],['light_snow',3]]
  },
  rain: {
    Spring: [['light_rain',3],['rain',3],['heavy_rain',1],['cloudy',2]],
    Summer: [['light_rain',2],['rain',3],['heavy_rain',2],['thunderstorm',2]],
    Autumn: [['light_rain',2],['rain',4],['heavy_rain',2]],
    Winter: [['light_rain',2],['rain',2],['snow',2],['cloudy',2]]
  },
  heavy_rain: {
    Spring: [['rain',4],['heavy_rain',2],['overcast',2]],
    Summer: [['rain',3],['heavy_rain',2],['thunderstorm',3]],
    Autumn: [['rain',4],['heavy_rain',3],['overcast',2]],
    Winter: [['rain',3],['heavy_snow',2],['overcast',2]]
  },
  thunderstorm: {
    Spring: [['rain',3],['heavy_rain',2],['overcast',3]],
    Summer: [['rain',2],['heavy_rain',2],['thunderstorm',2],['partly_cloudy',2]],
    Autumn: [['rain',4],['overcast',3],['cloudy',2]],
    Winter: [['heavy_snow',3],['overcast',3],['snow',2]]
  },
  light_snow: {
    Spring: [['cloudy',3],['light_rain',3],['light_snow',2]],
    Summer: [['cloudy',4],['partly_cloudy',4]],
    Autumn: [['cloudy',3],['light_snow',3],['snow',2]],
    Winter: [['light_snow',3],['snow',3],['cloudy',2]]
  },
  snow: {
    Spring: [['light_snow',4],['cloudy',3],['snow',2]],
    Summer: [['light_rain',4],['cloudy',4]],
    Autumn: [['light_snow',3],['snow',3],['overcast',2]],
    Winter: [['snow',4],['heavy_snow',2],['light_snow',2],['overcast',1]]
  },
  heavy_snow: {
    Spring: [['snow',4],['overcast',3],['light_snow',2]],
    Summer: [['rain',4],['cloudy',4]],
    Autumn: [['snow',4],['overcast',3]],
    Winter: [['heavy_snow',3],['snow',4],['overcast',2]]
  },
  fog: {
    Spring: [['partly_cloudy',3],['cloudy',3],['fog',2]],
    Summer: [['clear',3],['partly_cloudy',3],['fog',1]],
    Autumn: [['cloudy',3],['fog',3],['overcast',2]],
    Winter: [['cloudy',3],['fog',3],['light_snow',1],['overcast',2]]
  },
  windy: {
    Spring: [['clear',3],['partly_cloudy',2],['windy',2],['cloudy',1]],
    Summer: [['clear',3],['partly_cloudy',3],['windy',1]],
    Autumn: [['partly_cloudy',3],['cloudy',2],['windy',2]],
    Winter: [['cloudy',3],['light_snow',2],['windy',2]]
  }
};

// Approximate minutes per unit (for weather simulation on time skips)
const UNIT_TO_MINUTES = { minute: 1, minutes: 1, hour: 60, hours: 60, day: 1440, days: 1440, week: 10080, weeks: 10080, month: 43200, months: 43200, year: 525600, years: 525600 };

// Base temperature ranges per season (Fahrenheit)
const SEASON_TEMPS = {
  Winter: { low: 20, high: 42 },
  Spring: { low: 45, high: 68 },
  Summer: { low: 65, high: 95 },
  Autumn: { low: 40, high: 65 }
};

// ============================================
// STORY CARD UTILITIES
// ============================================
// Inspired by LPCroc's CommunityUtils.StoryCards pattern.
// Story cards in AI Dungeon have: title (keys), entry (text), description (notes), type.

function findCard(keyName, createIfNotFound, defaultEntry, defaultDescription) {
  if (!worldInfo) return null;
  // Search existing cards by keys
  for (const card of worldInfo) {
    if (card.keys && card.keys.toLowerCase().includes(keyName.toLowerCase())) {
      return card;
    }
  }
  if (!createIfNotFound) return null;
  // Create the card if not found
  addWorldEntry(keyName, defaultEntry || '', false);
  // Find the newly created card
  for (const card of worldInfo) {
    if (card.keys && card.keys.toLowerCase().includes(keyName.toLowerCase())) {
      if (defaultDescription && !card.description) {
        card.description = defaultDescription;
      }
      return card;
    }
  }
  return null;
}

function readSetting(card, settingName, defaultValue) {
  if (!card || !card.entry) return defaultValue;
  // Match "> Setting Name: value" pattern
  const regex = new RegExp('> ' + settingName.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\\\$&') + ':\\\\s*(.+)', 'i');
  const match = card.entry.match(regex);
  if (!match) return defaultValue;
  const raw = match[1].trim();
  // Parse booleans
  if (raw.toLowerCase() === 'true') return true;
  if (raw.toLowerCase() === 'false') return false;
  // Parse numbers
  const num = Number(raw);
  if (!isNaN(num) && raw !== '') return num;
  // Return as string
  return raw;
}

function writeSetting(card, settingName, newValue) {
  if (!card || !card.entry) return;
  const escapedName = settingName.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\\\$&');
  const regex = new RegExp('(> ' + escapedName + ':\\\\s*).+', 'i');
  if (card.entry.match(regex)) {
    card.entry = card.entry.replace(regex, '\\$1' + String(newValue));
  }
}

// Default content for the Settings story card
const SETTINGS_CARD_ENTRY = \`Chronos Time System - Settings
Edit values below to configure. Changes take effect next turn.

General:
> Enabled: true
> Minutes Per Turn: 2
> Time Format: 12h

Current Time (auto-updated each turn, editable):
> Hour: 8
> Minute: 0
> Day: 1
> Month: 1
> Year: 1

Display:
> Use BetterScripts Widgets: false
  Set to true if you have BetterDungeon installed.
> Show Time in Output: true
  Text block after each turn. Disable to only inject time into AI context.

Sleep:
> Wake Hour: 7

Weather:
> Weather Enabled: false
> Weather Change Cooldown: 15
> Temperature Unit: F\`;

const SETTINGS_CARD_DESCRIPTION = \`Custom Calendar Names (leave blank for defaults):
Weekdays: 
Months: \`;

// Default content for the Commands story card
const COMMANDS_CARD_ENTRY = \`Chronos - Available Commands
Use these in a Do, Say, or Story action.

Time Commands:
  :time              - Show current time and date
  :date              - Show full calendar date
  :sleep             - Skip to morning (wake hour from settings)

Time Manipulation:
  :advance <N> <unit>  - Skip forward in time
  :timeskip <N> <unit> - Alias for :advance
  :skip <N> <unit>     - Alias for :advance
                         Units: minutes, hours, days, weeks, months, years
                         Example: :advance 3 days
  :settime <HH:MM>    - Set clock to specific time
                         Example: :settime 14:30
  :setdate <D> <M> <Y> - Set calendar date
                          Example: :setdate 25 12 1400

Weather (when enabled):
  :weather             - Show current weather
  :setweather <cond>   - Force weather condition
                         Example: :setweather thunderstorm

System:
  :chronos             - Show full status
  :chronos reset       - Reset time and weather to defaults
  :chronos help        - Show this command list\`;

// Sync all configuration from the Settings card into state.chronos.config
function syncSettingsFromCard(card) {
  if (!card) return;
  const c = state.chronos.config;
  c.enabled = readSetting(card, 'Enabled', c.enabled);
  c.minutesPerTurn = readSetting(card, 'Minutes Per Turn', c.minutesPerTurn);
  const fmt = readSetting(card, 'Time Format', c.use12HourFormat ? '12h' : '24h');
  c.use12HourFormat = (fmt === '12h');
  c.useBetterScripts = readSetting(card, 'Use BetterScripts Widgets', c.useBetterScripts);
  c.showTimeInOutput = readSetting(card, 'Show Time in Output', c.showTimeInOutput);
  c.weatherEnabled = readSetting(card, 'Weather Enabled', c.weatherEnabled);
  c.weatherChangeCooldown = readSetting(card, 'Weather Change Cooldown', c.weatherChangeCooldown);
  c.wakeHour = readSetting(card, 'Wake Hour', c.wakeHour);
  const tempUnit = readSetting(card, 'Temperature Unit', c.temperatureUnit);
  c.temperatureUnit = (tempUnit === 'C' || tempUnit === 'c') ? 'C' : 'F';

  // Read current time values (allows user to manually edit time via card)
  state.chronos.hour = readSetting(card, 'Hour', state.chronos.hour);
  state.chronos.minute = readSetting(card, 'Minute', state.chronos.minute);
  state.chronos.day = readSetting(card, 'Day', state.chronos.day);
  state.chronos.month = readSetting(card, 'Month', state.chronos.month);
  state.chronos.year = readSetting(card, 'Year', state.chronos.year);

  // Clamp time values to valid ranges to prevent broken state from bad edits
  const s = state.chronos;
  s.hour = Math.max(0, Math.min(23, Math.floor(Number(s.hour) || 0)));
  s.minute = Math.max(0, Math.min(59, Math.floor(Number(s.minute) || 0)));
  s.month = Math.max(1, Math.min(12, Math.floor(Number(s.month) || 1)));
  s.year = Math.max(1, Math.floor(Number(s.year) || 1));
  s.day = Math.max(1, Math.min(getDaysInMonth(s.month, s.year), Math.floor(Number(s.day) || 1)));
  c.minutesPerTurn = Math.max(0, Math.floor(Number(c.minutesPerTurn) || 2));
  c.weatherChangeCooldown = Math.max(1, Math.floor(Number(c.weatherChangeCooldown) || 15));
  c.wakeHour = Math.max(0, Math.min(23, Math.floor(Number(c.wakeHour) || 7)));

  // Parse custom names from card description/notes
  if (card.description) {
    const wMatch = card.description.match(/Weekdays:\\s*(.+)/i);
    if (wMatch && wMatch[1].trim()) {
      const names = wMatch[1].trim().split(',').map(s => s.trim()).filter(Boolean);
      c.customWeekdays = (names.length === 7) ? names : null;
    }
    const mMatch = card.description.match(/Months:\\s*(.+)/i);
    if (mMatch && mMatch[1].trim()) {
      const names = mMatch[1].trim().split(',').map(s => s.trim()).filter(Boolean);
      c.customMonths = (names.length === 12) ? names : null;
    }
  }
}

// Write current time values back to the Settings card
function syncTimeToCard(card) {
  if (!card) return;
  writeSetting(card, 'Hour', state.chronos.hour);
  writeSetting(card, 'Minute', state.chronos.minute);
  writeSetting(card, 'Day', state.chronos.day);
  writeSetting(card, 'Month', state.chronos.month);
  writeSetting(card, 'Year', state.chronos.year);
}

// ============================================
// CALENDAR ENGINE
// ============================================

function getWeekdays() {
  return state.chronos.config.customWeekdays || DEFAULT_WEEKDAYS;
}

function getMonths() {
  const custom = state.chronos.config.customMonths;
  if (custom) {
    return DEFAULT_MONTHS.map((m, i) => ({ name: custom[i] || m.name, days: m.days }));
  }
  return DEFAULT_MONTHS;
}

function isLeapYear(y) {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

function getDaysInMonth(month, year) {
  const months = getMonths();
  const idx = ((month - 1) % 12 + 12) % 12;
  let days = months[idx].days;
  // February leap year check (only for standard calendar, index 1)
  if (idx === 1 && !state.chronos.config.customMonths && isLeapYear(year)) {
    days = 29;
  }
  return days;
}

function getSeason(month) {
  for (const s of SEASONS) {
    if (s.months.includes(month)) return s;
  }
  return SEASONS[0];
}

function getTimePeriod(hour) {
  for (const p of TIME_PERIODS) {
    if (hour >= p.start && hour < p.end) return p;
  }
  return TIME_PERIODS[0]; // Midnight wraps around
}

// Calculate day-of-week index (0-6) using a simple cumulative day count from year 1, month 1, day 1
function getDayOfYear(day, month, year) {
  let total = 0;
  for (let m = 1; m < month; m++) {
    total += getDaysInMonth(m, year);
  }
  return total + day;
}

function getAbsoluteDay(day, month, year) {
  // O(1) formula: total days from year 1 to start of this year
  const y = year - 1;
  const yearDays = 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400);
  return yearDays + getDayOfYear(day, month, year) - 1;
}

function getWeekdayIndex(day, month, year) {
  return getAbsoluteDay(day, month, year) % getWeekdays().length;
}

function getWeekday() {
  const s = state.chronos;
  return getWeekdays()[getWeekdayIndex(s.day, s.month, s.year)];
}

// Returns current moon phase from an 8-phase, 30-day lunar cycle
function getMoonPhase() {
  const s = state.chronos;
  const absDay = getAbsoluteDay(s.day, s.month, s.year);
  const phaseIndex = Math.floor((absDay % 30) / 3.75);
  return MOON_PHASES[Math.min(phaseIndex, 7)];
}

// ============================================
// TIME FORMATTING
// ============================================

function getTimeString() {
  const h = state.chronos.hour;
  const m = state.chronos.minute;
  if (state.chronos.config.use12HourFormat) {
    const hour12 = h % 12 || 12;
    const ampm = h < 12 ? 'AM' : 'PM';
    return \`\${hour12}:\${String(m).padStart(2, '0')} \${ampm}\`;
  }
  return \`\${String(h).padStart(2, '0')}:\${String(m).padStart(2, '0')}\`;
}

function getMonthName() {
  return getMonths()[(state.chronos.month - 1) % 12].name;
}

function getDateString() {
  const s = state.chronos;
  return \`\${getMonthName()} \${s.day}, Year \${s.year}\`;
}

function getTimeContext() {
  const s = state.chronos;
  const period = getTimePeriod(s.hour);
  const season = getSeason(s.month);
  const moon = getMoonPhase();
  let ctx = \`[Time: \${period.name}, \${getTimeString()} | \${getWeekday()}, \${getMonthName()} \${s.day}, Year \${s.year} | \${season.name}]\`;
  // Include moon phase during nighttime for atmospheric AI context
  if (s.hour >= 19 || s.hour < 6) {
    ctx += \`\\n[Moon: \${moon.name}]\`;
  }
  return ctx;
}

// ============================================
// TIME MANIPULATION
// ============================================

// Core advancement - rolls minutes -> hours -> days -> months -> years
function advanceTime(minutes) {
  const s = state.chronos;
  s.minute += minutes;

  // Roll minutes into hours
  while (s.minute >= 60) {
    s.minute -= 60;
    s.hour += 1;
  }
  while (s.minute < 0) {
    s.minute += 60;
    s.hour -= 1;
  }

  // Roll hours into days
  while (s.hour >= 24) {
    s.hour -= 24;
    s.day += 1;
  }
  while (s.hour < 0) {
    s.hour += 24;
    s.day -= 1;
  }

  // Roll days into months
  while (s.day > getDaysInMonth(s.month, s.year)) {
    s.day -= getDaysInMonth(s.month, s.year);
    s.month += 1;
    if (s.month > 12) {
      s.month = 1;
      s.year += 1;
    }
  }
  while (s.day < 1) {
    s.month -= 1;
    if (s.month < 1) {
      s.month = 12;
      s.year -= 1;
    }
    s.day += getDaysInMonth(s.month, s.year);
  }
}

function setTimeTo(targetHour, targetMinute) {
  const s = state.chronos;
  let minutesToAdd = (targetHour * 60 + targetMinute) - (s.hour * 60 + s.minute);
  if (minutesToAdd < 0) minutesToAdd += 24 * 60; // Wrap to next day
  advanceTime(minutesToAdd);
}

function setDateTo(day, month, year) {
  const s = state.chronos;
  s.day = day;
  s.month = month;
  s.year = year;
  // Clamp day to valid range
  const maxDay = getDaysInMonth(s.month, s.year);
  if (s.day > maxDay) s.day = maxDay;
  if (s.day < 1) s.day = 1;
}

function skipToMorning() {
  const s = state.chronos;
  const targetHour = s.config.wakeHour;
  // Already at target morning - nothing to skip
  if (s.hour === targetHour && s.minute === 0) return 0;
  let minutesToSkip;
  if (s.hour >= targetHour) {
    // Past morning - skip to next day's morning
    minutesToSkip = (24 - s.hour + targetHour) * 60 - s.minute;
  } else {
    // Before morning - skip to this morning
    minutesToSkip = (targetHour - s.hour) * 60 - s.minute;
  }
  // Simulate weather changes over the sleep period before advancing
  simulateWeatherOverSkip(minutesToSkip);
  advanceTime(minutesToSkip);
  return minutesToSkip;
}

// Advance by larger units - uses direct field manipulation for months/years
function advanceByUnit(amount, unit) {
  const s = state.chronos;
  switch (unit) {
    case 'minute': case 'minutes':
      advanceTime(amount);
      break;
    case 'hour': case 'hours':
      advanceTime(amount * 60);
      break;
    case 'day': case 'days':
      advanceTime(amount * 24 * 60);
      break;
    case 'week': case 'weeks':
      advanceTime(amount * 7 * 24 * 60);
      break;
    case 'month': case 'months':
      s.month += amount;
      // Normalize month overflow/underflow into years
      while (s.month > 12) { s.month -= 12; s.year += 1; }
      while (s.month < 1) { s.month += 12; s.year -= 1; }
      // Clamp day if the new month is shorter
      const maxDayM = getDaysInMonth(s.month, s.year);
      if (s.day > maxDayM) s.day = maxDayM;
      break;
    case 'year': case 'years':
      s.year += amount;
      // Clamp day if landing on a shorter month (e.g. Feb 29 -> non-leap)
      const maxDayY = getDaysInMonth(s.month, s.year);
      if (s.day > maxDayY) s.day = maxDayY;
      break;
  }
}

// Simulate weather changes that would have occurred during a large time skip.
// Rolls weather once per cooldown period worth of turns in the skipped interval.
// Capped to prevent excessive computation on extreme skips.
function simulateWeatherOverSkip(minutesSkipped) {
  if (!state.chronos.config.weatherEnabled) return;
  const cooldown = state.chronos.config.weatherChangeCooldown;
  // Estimate equivalent turns for the skipped time, using minutesPerTurn as scale
  const mpt = Math.max(1, state.chronos.config.minutesPerTurn);
  const equivalentTurns = Math.floor(minutesSkipped / mpt);
  const rolls = Math.min(Math.floor(equivalentTurns / cooldown), 50);
  for (let i = 0; i < rolls; i++) {
    rollWeather();
  }
  if (rolls > 0) {
    state.chronos.weather.targetTemp = calcTargetTemp();
    state.chronos.weather.temperature = state.chronos.weather.targetTemp;
  }
}

// Shared handler for :advance/:timeskip/:skip commands
function handleAdvanceTime(amount, unit) {
  const validUnits = ['minute','minutes','hour','hours','day','days','week','weeks','month','months','year','years'];
  if (!validUnits.includes(unit)) {
    return { output: \`\\nInvalid unit: \${unit}. Valid: minutes, hours, days, weeks, months, years.\`, isCommand: true };
  }
  simulateWeatherOverSkip(amount * (UNIT_TO_MINUTES[unit] || 60));
  advanceByUnit(amount, unit);
  const period = getTimePeriod(state.chronos.hour);
  let out = \`\\nAdvanced \${amount} \${unit}. Now: \${period.name}, \${getTimeString()} - \${getWeekday()}, \${getDateString()}\`;
  if (state.chronos.config.weatherEnabled) {
    out += \`\\n\${getWeatherDisplay()}\`;
  }
  return { output: out, isCommand: true };
}

// Retry detection - prevents double-advancing on retries
function isRetry() {
  return state.chronos.lastActionCount === (info.actionCount || 0);
}

// ============================================
// WEATHER ENGINE
// ============================================

function rollWeather() {
  const s = state.chronos;
  const season = getSeason(s.month).name;
  const current = s.weather.current;
  const transitions = WEATHER_TRANSITIONS[current];
  if (!transitions) { s.weather.current = 'clear'; return; }

  const options = transitions[season] || transitions['Spring'];
  // Weighted random selection
  const totalWeight = options.reduce((sum, o) => sum + o[1], 0);
  let roll = Math.random() * totalWeight;
  for (const [condition, weight] of options) {
    roll -= weight;
    if (roll <= 0) {
      s.weather.current = condition;
      break;
    }
  }
  s.weather.lastChange = info.actionCount || 0;
  // Set a new target temp for the smooth drift system
  s.weather.targetTemp = calcTargetTemp();
}

// Calculate a target temperature based on season, time-of-day, and weather.
// Called when weather changes or on first setup to set a new target.
function calcTargetTemp() {
  const s = state.chronos;
  const season = getSeason(s.month).name;
  const temps = SEASON_TEMPS[season] || SEASON_TEMPS['Spring'];
  // Base from midpoint of season range, with mild randomness
  const base = (temps.low + temps.high) / 2 + (Math.random() - 0.5) * (temps.high - temps.low) * 0.6;
  // Time-of-day curve: coldest at 2 AM, warmest at 2 PM
  const hourOffset = Math.cos((s.hour - 14) * Math.PI / 12) * 5;
  // Weather modifier
  let weatherMod = 0;
  const w = s.weather.current;
  if (w.includes('rain') || w === 'thunderstorm') weatherMod = -5;
  if (w.includes('snow') || w === 'fog') weatherMod = -8;
  if (w === 'clear') weatherMod = 3;
  return Math.round(base + hourOffset + weatherMod);
}

// Smoothly drift current temperature toward the target each turn.
// Prevents erratic jumps while still allowing gradual change.
function updateTemperature() {
  const s = state.chronos;
  if (!s.weather.targetTemp) {
    s.weather.targetTemp = calcTargetTemp();
    s.weather.temperature = s.weather.targetTemp;
    return;
  }
  // Periodically recalculate target to reflect time-of-day temperature curve,
  // ensuring gradual day/night temp shifts even when weather is stable
  if (Math.random() < 0.2) {
    s.weather.targetTemp = calcTargetTemp();
  }
  const diff = s.weather.targetTemp - s.weather.temperature;
  // Drift 30% of the remaining distance + a tiny random nudge (+/-1)
  const drift = Math.round(diff * 0.3) + Math.round((Math.random() - 0.5) * 2);
  s.weather.temperature += drift;
}

// Format temperature with unit conversion (internal storage is always F)
function formatTemp(tempF) {
  const unit = state.chronos.config.temperatureUnit;
  if (unit === 'C') {
    return Math.round((tempF - 32) * 5 / 9) + '\\u{00B0}C';
  }
  return tempF + '\\u{00B0}F';
}

function shouldChangeWeather() {
  const s = state.chronos;
  const turnsSinceChange = (info.actionCount || 0) - s.weather.lastChange;
  return turnsSinceChange >= s.config.weatherChangeCooldown;
}

function getWeatherContext() {
  const s = state.chronos;
  const w = WEATHER_CONDITIONS[s.weather.current] || WEATHER_CONDITIONS['clear'];
  return \`[Weather: \${w.label}, \${formatTemp(s.weather.temperature)}]\`;
}

function getWeatherDisplay() {
  const s = state.chronos;
  const w = WEATHER_CONDITIONS[s.weather.current] || WEATHER_CONDITIONS['clear'];
  return \`\${w.icon} \${w.label}, \${formatTemp(s.weather.temperature)}\`;
}

// ============================================
// COMMAND HANDLERS
// ============================================

function handleChronosCommand(input) {
  const lower = input.toLowerCase().trim();

  // :time - concise current-state summary
  if (lower === ':time') {
    const s = state.chronos;
    const period = getTimePeriod(s.hour);
    const season = getSeason(s.month);
    const moon = getMoonPhase();
    let out = \`\\n\${period.icon} \${period.name}, \${getTimeString()}\`;
    out += \`\\n\${getWeekday()}, \${getDateString()} - \${season.name}\`;
    out += \`\\n\${moon.icon} \${moon.name}\`;
    if (s.config.weatherEnabled) {
      out += \`\\n\${getWeatherDisplay()}\`;
    }
    return { output: out, isCommand: true };
  }

  // :date - calendar-focused view
  if (lower === ':date') {
    const s = state.chronos;
    const season = getSeason(s.month);
    const moon = getMoonPhase();
    let out = \`\\n\${getWeekday()}, \${getDateString()}\`;
    out += \`\\nSeason: \${season.name} | Moon: \${moon.icon} \${moon.name}\`;
    return { output: out, isCommand: true };
  }

  // :advance <N> <unit>
  const advMatch = lower.match(/^:advance\\s+(\\d+)\\s+(\\w+)$/);
  if (advMatch) {
    return handleAdvanceTime(parseInt(advMatch[1]), advMatch[2]);
  }

  // :sleep - skip to next morning (weather simulated over sleep period)
  if (lower === ':sleep') {
    if (!skipToMorning()) {
      return { output: '\\nYou are already up. It is morning.', isCommand: true };
    }
    const period = getTimePeriod(state.chronos.hour);
    let out = \`\\nYou rest and wake refreshed.\\n\${period.icon} \${period.name}, \${getTimeString()} - \${getWeekday()}, \${getDateString()}\`;
    if (state.chronos.config.weatherEnabled) {
      out += \`\\n\${getWeatherDisplay()}\`;
    }
    return { output: out, isCommand: true };
  }

  // :settime <HH:MM> or :settime <hour>
  const setTimeMatch = lower.match(/^:settime\\s+(\\d{1,2})(?::(\\d{2}))?$/);
  if (setTimeMatch) {
    const hour = parseInt(setTimeMatch[1]) % 24;
    const minute = setTimeMatch[2] ? parseInt(setTimeMatch[2]) : 0;
    setTimeTo(hour, minute);
    const period = getTimePeriod(state.chronos.hour);
    return {
      output: \`\\nTime set to \${period.name}, \${getTimeString()}.\`,
      isCommand: true
    };
  }

  // :setdate <day> <month> <year>
  const setDateMatch = lower.match(/^:setdate\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)$/);
  if (setDateMatch) {
    const d = parseInt(setDateMatch[1]);
    const m = parseInt(setDateMatch[2]);
    const y = parseInt(setDateMatch[3]);
    if (m < 1 || m > 12) {
      return { output: '\\nInvalid month. Must be 1-12.', isCommand: true };
    }
    if (y < 1) {
      return { output: '\\nInvalid year. Must be 1 or greater.', isCommand: true };
    }
    setDateTo(d, m, y);
    return {
      output: \`\\nDate set to \${getWeekday()}, \${getDateString()}.\`,
      isCommand: true
    };
  }

  // :setweather <condition> - force a specific weather condition
  const setWeatherMatch = lower.match(/^:setweather\\s+(.+)$/);
  if (setWeatherMatch) {
    if (!state.chronos.config.weatherEnabled) {
      return { output: '\\nWeather is disabled. Enable it in the Chronos Settings story card.', isCommand: true };
    }
    const requested = setWeatherMatch[1].trim().replace(/ /g, '_');
    if (!WEATHER_CONDITIONS[requested]) {
      const valid = Object.keys(WEATHER_CONDITIONS).join(', ');
      return { output: \`\\nUnknown condition: \${requested}\\nValid: \${valid}\`, isCommand: true };
    }
    state.chronos.weather.current = requested;
    state.chronos.weather.targetTemp = calcTargetTemp();
    state.chronos.weather.temperature = state.chronos.weather.targetTemp;
    state.chronos.weather.lastChange = info.actionCount || 0;
    return { output: \`\\nWeather set to \${getWeatherDisplay()}\`, isCommand: true };
  }

  // :weather - show current weather with context
  if (lower === ':weather') {
    if (!state.chronos.config.weatherEnabled) {
      return { output: '\\nWeather is disabled. Enable it in the Chronos Settings story card.', isCommand: true };
    }
    const s = state.chronos;
    const season = getSeason(s.month);
    return {
      output: \`\\n\${getWeatherDisplay()}\\n\${season.name} - \${getTimePeriod(s.hour).name}\`,
      isCommand: true
    };
  }

  // :chronos help - show command list
  if (lower === ':chronos help') {
    return { output: \`\\n\${COMMANDS_CARD_ENTRY}\`, isCommand: true };
  }

  // :timeskip / :skip <N> <unit> - aliases for :advance
  const skipMatch = lower.match(/^:(?:timeskip|skip)\\s+(\\d+)\\s+(\\w+)$/);
  if (skipMatch) {
    return handleAdvanceTime(parseInt(skipMatch[1]), skipMatch[2]);
  }

  // :chronos reset - restore all state to defaults
  if (lower === ':chronos reset') {
    state.chronos.minute = 0;
    state.chronos.hour = 8;
    state.chronos.day = 1;
    state.chronos.month = 1;
    state.chronos.year = 1;
    state.chronos.weather = { current: 'clear', temperature: 70, lastChange: 0, targetTemp: null };
    state.chronos.initialized = false;
    return { output: '\\nChronos has been reset to defaults.', isCommand: true };
  }

  // :chronos - full diagnostic status
  if (lower === ':chronos') {
    const s = state.chronos;
    const period = getTimePeriod(s.hour);
    const season = getSeason(s.month);
    const moon = getMoonPhase();
    let out = '\\n--- Chronos Status ---';
    out += \`\\nTime: \${period.name}, \${getTimeString()} (\${s.config.use12HourFormat ? '12h' : '24h'})\`;
    out += \`\\nDate: \${getWeekday()}, \${getDateString()}\`;
    out += \`\\nSeason: \${season.name} | Moon: \${moon.icon} \${moon.name}\`;
    out += \`\\nPacing: \${s.config.minutesPerTurn} min/turn | Turn \${info.actionCount || 0}\`;
    if (s.config.weatherEnabled) {
      out += \`\\nWeather: \${getWeatherDisplay()} (\${s.config.temperatureUnit})\`;
    } else {
      out += '\\nWeather: Disabled';
    }
    out += \`\\nDisplay: \${s.config.useBetterScripts ? 'Widgets' : s.config.showTimeInOutput ? 'Text' : 'Context only'}\`;
    if (s.config.customWeekdays) out += '\\nCustom weekdays: ' + s.config.customWeekdays.join(', ');
    if (s.config.customMonths) out += '\\nCustom months: ' + s.config.customMonths.join(', ');
    out += '\\n---';
    return { output: out, isCommand: true };
  }

  return null;
}`,
      context: `// ============================================
// CONTEXT MODIFIER - Chronos Time System
// ============================================
// 1. Creates/syncs story cards (Settings + Commands)
// 2. Strips protocol messages from context
// 3. Cleans stale timestamps to prevent AI fixation
// 4. Injects current time (and weather) into AI context
// 5. Advances time each turn (with retry detection)

const modifier = (text) => {
  // -- Story Card Setup --
  // Find or create the Settings card, then sync config into state
  const settingsCard = findCard('Chronos Settings', true, SETTINGS_CARD_ENTRY, SETTINGS_CARD_DESCRIPTION);
  syncSettingsFromCard(settingsCard);

  // Find or create the Commands reference card
  const commandsCard = findCard('Chronos Commands', true, COMMANDS_CARD_ENTRY);

  // Early exit if disabled
  if (!state.chronos.config.enabled) return { text };

  // -- First-turn initialization --
  if (!state.chronos.initialized) {
    state.chronos.initialized = true;
    // Set initial weather state if weather is enabled on first load
    if (state.chronos.config.weatherEnabled) {
      rollWeather();
      updateTemperature();
    }
  }
  // Handle weather being enabled mid-adventure (no target temp yet)
  if (state.chronos.config.weatherEnabled && !state.chronos.weather.targetTemp) {
    state.chronos.weather.targetTemp = calcTargetTemp();
    state.chronos.weather.temperature = state.chronos.weather.targetTemp;
  }

  // -- Time Advancement (once per turn, skip retries) --
  if (!isRetry()) {
    advanceTime(state.chronos.config.minutesPerTurn);

    // Weather roll if enabled and cooldown has passed
    if (state.chronos.config.weatherEnabled && shouldChangeWeather()) {
      rollWeather();
    }
    // Smoothly drift temperature toward target each turn
    if (state.chronos.config.weatherEnabled) {
      updateTemperature();
    }
  }
  state.chronos.lastActionCount = info.actionCount || 0;

  // -- Write current time back to Settings card --
  syncTimeToCard(settingsCard);

  // -- Strip BetterScripts protocol messages from context --
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');

  // -- Clean stale Chronos timestamps from older context --
  // Prevents the AI from fixating on outdated time references
  text = text.replace(/\\[Time:[^\\]]*\\]/g, '');
  text = text.replace(/\\[Weather:[^\\]]*\\]/g, '');
  text = text.replace(/\\[Moon:[^\\]]*\\]/g, '');

  // -- Inject current time context at the start --
  let contextHeader = getTimeContext();
  if (state.chronos.config.weatherEnabled) {
    contextHeader += '\\n' + getWeatherContext();
  }
  text = contextHeader + '\\n' + text;

  return { text };
};

modifier(text);`,
      input: `// ============================================
// INPUT MODIFIER - Chronos Time System
// ============================================
// Detects colon-prefixed Chronos commands from player input.
// Commands: :time, :date, :advance, :sleep, :settime, :setdate, :weather, :chronos

const modifier = (text) => {
  const input = text.trim();

  // Only check inputs that exactly match or start with a known command + space
  const commandPrefixes = [':time', ':date', ':advance', ':sleep', ':settime', ':setdate', ':setweather', ':weather', ':chronos', ':timeskip', ':skip'];
  const lower = input.toLowerCase();
  const isChronosCmd = commandPrefixes.some(p => lower === p || lower.startsWith(p + ' '));

  if (isChronosCmd) {
    const result = handleChronosCommand(input);
    if (result) {
      state.chronos.pendingOutput = result.output;
      state.chronos.isCommand = true;
      // Replace input with neutral placeholder so the AI doesn't narrate the command
      return { text: '' };
    }
  }

  return { text };
};

modifier(text);`,
      output: `// ============================================
// OUTPUT MODIFIER - Chronos Time System
// ============================================
// Handles command output, BetterScripts widget emission,
// and standalone text fallback for time display.

const modifier = (text) => {
  let output = text;

  // -- Handle pending command output --
  if (state.chronos.isCommand && state.chronos.pendingOutput) {
    output = state.chronos.pendingOutput;
    state.chronos.pendingOutput = null;
    state.chronos.isCommand = false;
  }

  // Early exit if disabled
  if (!state.chronos.config.enabled) return { text: output };

  const s = state.chronos;
  const period = getTimePeriod(s.hour);
  const season = getSeason(s.month);
  const isNight = period.name === 'Night' || period.name === 'Midnight';

  // -- BetterScripts Widget Mode --
  if (s.config.useBetterScripts) {
    let widgets = '';

    // LEFT ZONE: Time (shows exact time with period icon)
    widgets += bdWidget('chronos-clock', {
      type: 'stat',
      label: period.icon,
      value: getTimeString(),
      color: isNight ? '#94a3b8' : '#fbbf24',
      align: 'left',
      order: 1
    });

    // CENTER ZONE: Date (when weather is enabled)
    if (s.config.weatherEnabled) {
      widgets += bdWidget('chronos-date', {
        type: 'stat',
        label: '\\u{1F4C5}',
        value: getWeekday() + ', ' + getMonthName() + ' ' + s.day,
        color: '#60a5fa',
        align: 'center',
        order: 1
      });
      widgets += bdWidget('chronos-season', {
        type: 'stat',
        label: '\\u{1F30D}',
        value: season.name + ', Year ' + s.year,
        color: '#a78bfa',
        align: 'center',
        order: 2
      });
    }

    // Moon phase only shows at night
    if (isNight) {
      const moon = getMoonPhase();
      widgets += bdWidget('chronos-moon', {
        type: 'badge',
        text: moon.name,
        icon: moon.icon,
        color: '#e2e8f0',
        variant: 'subtle',
        align: s.config.weatherEnabled ? 'center' : 'right',
        order: s.config.weatherEnabled ? 3 : 1
      });
    }

    // RIGHT ZONE: Weather (when enabled) or Date/Season (when weather disabled)
    if (s.config.weatherEnabled) {
      const wInfo = WEATHER_CONDITIONS[s.weather.current] || WEATHER_CONDITIONS['clear'];
      widgets += bdWidget('chronos-weather', {
        type: 'stat',
        label: wInfo.icon,
        value: wInfo.label + ', ' + formatTemp(s.weather.temperature),
        color: '#34d399',
        align: 'right',
        order: 1
      });
    } else {
      // Move date and season to right when weather is disabled
      widgets += bdWidget('chronos-date', {
        type: 'stat',
        label: '\\u{1F4C5}',
        value: getWeekday() + ', ' + getMonthName() + ' ' + s.day,
        color: '#60a5fa',
        align: 'right',
        order: 1
      });
      widgets += bdWidget('chronos-season', {
        type: 'stat',
        label: '\\u{1F30D}',
        value: season.name + ', Year ' + s.year,
        color: '#a78bfa',
        align: 'right',
        order: 2
      });
    }

    return { text: output + widgets };
  }

  // -- Standalone Text Mode --
  // Guarded by showTimeInOutput so users can opt for context-only
  if (!s.config.showTimeInOutput) return { text: output };
  let timeBlock = '\\n';
  timeBlock += '\\n--- ' + period.name + ', ' + getTimeString() + ' ---';
  timeBlock += '\\n' + getWeekday() + ', ' + getDateString() + ' | ' + season.name;
  
  // Only show moon phase at night
  if (isNight) {
    const moonText = getMoonPhase();
    timeBlock += ' | ' + moonText.icon + ' ' + moonText.name;
  }
  
  if (s.config.weatherEnabled) {
    timeBlock += '\\n' + getWeatherDisplay();
  }
  output += timeBlock;

  return { text: output };
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
    tags: ['widgets', 'debug', 'testing', 'betterscripts', 'commands', 'developer-tool', 'test-suite'],
    source: 'BetterRepository',
    description: 'Interactive debug console for testing all 9 widget types, protocol messages, and a sequential test suite.',
    purpose: 'Type :help for commands. Create, update, and destroy all widget types. Run :test to execute a full test suite one step per turn.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - BetterScripts Debug Console
// ============================================
// A comprehensive debug tool for testing BetterScripts.
// Use : commands in Do actions to control widgets.
//
// WIDGET COMMANDS (all 9 types):
//   :stat <id> <label> <val> [color] [order]
//   :bar <id> <val> <max> [label] [color] [order]
//   :badge <id> <text> [icon] [color] [variant]
//   :counter <id> <val> [delta] [icon] [color]
//   :text <id> <msg> [color]
//   :icon <id> <emoji> [tooltip] [color]
//   :panel <id> <title>
//   :list <id> <title>
//   :custom <id> <html>
//
// PROTOCOL COMMANDS:
//   :help              - Show all commands
//   :ping              - Test connection
//   :register          - Register a test script
//   :clear             - Remove all widgets
//   :update <id> <prop> <val>
//   :destroy <id>
//
// TESTING COMMANDS:
//   :demo              - Show all 9 widget types
//   :stress <count>    - Stress test with N widgets
//   :test              - Start sequential test suite (1 step/turn)
//   :test skip         - Skip current test step
//   :test stop         - Stop running test suite
//
// All widgets appear in the top bar

state.bd = state.bd ?? {
  lastCommand: null,
  lastResult: null,
  testRunning: false,
  testStep: 0,
  testResults: []
};

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

// All helpers: create, destroy, clearAll, ping, register
function bdMsg(m) { return \`[[BD:\${JSON.stringify(m)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMsg({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdDestroy(id) { return bdMsg({ type: 'widget', widgetId: id, action: 'destroy' }); }
function bdClearAll() { return bdMsg({ type: 'clearAll' }); }
function bdPing(data) { return bdMsg({ type: 'ping', timestamp: Date.now(), data: data || 'debug' }); }
function bdRegister(id, name, ver) { return bdMsg({ type: 'register', scriptId: id, scriptName: name, version: ver || '1.0', capabilities: ['widgets'] }); }

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
// SEQUENTIAL TEST SUITE
// ============================================
// Each step returns { name, output, widgets }
// Steps run one per turn when :test is active

const TEST_STEPS = [
  // --- Step 0: Register script ---
  {
    name: 'Register Script',
    run: () => {
      const widgets = bdRegister('debug-console', 'Debug Console', '2.0');
      return { output: '📝 Registering test script...', widgets };
    }
  },
  // --- Step 1: Ping ---
  {
    name: 'Ping',
    run: () => {
      const widgets = bdPing('test-suite');
      return { output: '🏓 Sending ping...', widgets };
    }
  },
  // --- Step 2: Stat widget ---
  {
    name: 'Create Stat Widget',
    run: () => {
      const widgets = bdWidget('test-stat', {
        type: 'stat', label: 'Gold', value: '1,250',
        color: '#fbbf24', align: 'right', order: 1
      });
      return { output: '📊 Creating stat widget (Gold)...', widgets };
    }
  },
  // --- Step 3: Bar widget ---
  {
    name: 'Create Bar Widget',
    run: () => {
      const widgets = bdWidget('test-bar', {
        type: 'bar', label: 'HP', value: 75, max: 100,
        color: '#22c55e', showValue: true, align: 'center', order: 1
      });
      return { output: '📈 Creating bar widget (HP 75/100)...', widgets };
    }
  },
  // --- Step 4: Badge widget (subtle) ---
  {
    name: 'Create Badge Widget',
    run: () => {
      const widgets = bdWidget('test-badge', {
        type: 'badge', text: 'Poisoned', icon: '☠️',
        color: '#a855f7', variant: 'subtle', align: 'center', order: 2
      });
      return { output: '🏷️ Creating badge widget (Poisoned)...', widgets };
    }
  },
  // --- Step 5: Counter widget ---
  {
    name: 'Create Counter Widget',
    run: () => {
      const widgets = bdWidget('test-counter', {
        type: 'counter', icon: '⚔️', value: 24, delta: 3,
        color: '#60a5fa', align: 'center', order: 3
      });
      return { output: '🔢 Creating counter widget (24, +3)...', widgets };
    }
  },
  // --- Step 6: Text widget ---
  {
    name: 'Create Text Widget',
    run: () => {
      const widgets = bdWidget('test-text', {
        type: 'text', text: '⚡ Quest Active',
        style: { color: '#fbbf24', fontWeight: 'bold' },
        align: 'center', order: 4
      });
      return { output: '💬 Creating text widget...', widgets };
    }
  },
  // --- Step 7: Icon widget ---
  {
    name: 'Create Icon Widget',
    run: () => {
      const widgets = bdWidget('test-icon', {
        type: 'icon', icon: '❤️', color: '#ef4444',
        tooltip: 'Health Status', align: 'center', order: 5
      });
      return { output: '🎯 Creating icon widget (❤️)...', widgets };
    }
  },
  // --- Step 8: Panel widget ---
  {
    name: 'Create Panel Widget',
    run: () => {
      const widgets = bdWidget('test-panel', {
        type: 'panel', title: 'Character', align: 'left', order: 1,
        items: [
          { label: 'Level', value: '12', color: '#a855f7' },
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4500/5000', color: '#22c55e' }
        ]
      });
      return { output: '📋 Creating panel widget (Character)...', widgets };
    }
  },
  // --- Step 9: List widget ---
  {
    name: 'Create List Widget',
    run: () => {
      const widgets = bdWidget('test-list', {
        type: 'list', title: 'Inventory', align: 'right', order: 2,
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
          { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
          'Health Potion'
        ]
      });
      return { output: '📝 Creating list widget (Inventory)...', widgets };
    }
  },
  // --- Step 10: Custom HTML widget ---
  {
    name: 'Create Custom Widget',
    run: () => {
      const widgets = bdWidget('test-custom', {
        type: 'custom', align: 'center', order: 6,
        html: '<div style="display:flex;gap:6px;align-items:center;"><strong style="color:#f472b6;">Custom</strong><span style="color:#94a3b8;">HTML Widget</span></div>'
      });
      return { output: '🎨 Creating custom HTML widget...', widgets };
    }
  },
  // --- Step 11: Update stat value ---
  {
    name: 'Update Stat Value',
    run: () => {
      const widgets = bdWidget('test-stat', {
        type: 'stat', label: 'Gold', value: '2,500',
        color: '#fbbf24', align: 'right', order: 1
      });
      return { output: '✏️ Updating stat widget (Gold → 2,500)...', widgets };
    }
  },
  // --- Step 12: Update bar value ---
  {
    name: 'Update Bar Value',
    run: () => {
      const widgets = bdWidget('test-bar', {
        type: 'bar', label: 'HP', value: 30, max: 100,
        color: '#ef4444', showValue: true, align: 'center', order: 1
      });
      return { output: '✏️ Updating bar widget (HP → 30/100, red)...', widgets };
    }
  },
  // --- Step 13: Update badge variant ---
  {
    name: 'Update Badge Variant',
    run: () => {
      const widgets = bdWidget('test-badge', {
        type: 'badge', text: 'Shielded', icon: '🛡️',
        color: '#3b82f6', variant: 'solid', align: 'center', order: 2
      });
      return { output: '✏️ Updating badge (Poisoned → Shielded, solid)...', widgets };
    }
  },
  // --- Step 14: Update counter delta ---
  {
    name: 'Update Counter Delta',
    run: () => {
      const widgets = bdWidget('test-counter', {
        type: 'counter', icon: '💔', value: 18, delta: -6,
        color: '#f472b6', align: 'center', order: 3
      });
      return { output: '✏️ Updating counter (24 → 18, delta -6)...', widgets };
    }
  },
  // --- Step 15: Update panel items ---
  {
    name: 'Update Panel Items',
    run: () => {
      const widgets = bdWidget('test-panel', {
        type: 'panel', title: 'Character (Updated)', align: 'left', order: 1,
        items: [
          { label: 'Level', value: '13', color: '#a855f7' },
          { label: 'Class', value: 'Knight', color: '#fbbf24' },
          { label: 'XP', value: '500/6000', color: '#22c55e' },
          { label: 'STR', value: '18', color: '#ef4444' }
        ]
      });
      return { output: '✏️ Updating panel (new items, title)...', widgets };
    }
  },
  // --- Step 16: Test alignment zones ---
  {
    name: 'Test Alignment Zones',
    run: () => {
      let widgets = '';
      widgets += bdWidget('zone-left', {
        type: 'stat', label: 'Left', value: '←',
        color: '#3b82f6', align: 'left', order: 10
      });
      widgets += bdWidget('zone-center', {
        type: 'stat', label: 'Center', value: '●',
        color: '#22c55e', align: 'center', order: 10
      });
      widgets += bdWidget('zone-right', {
        type: 'stat', label: 'Right', value: '→',
        color: '#a855f7', align: 'right', order: 10
      });
      return { output: '↔️ Testing alignment zones (left/center/right)...', widgets };
    }
  },
  // --- Step 17: Test ordering within zone ---
  {
    name: 'Test Widget Ordering',
    run: () => {
      let widgets = '';
      widgets += bdWidget('order-c', {
        type: 'badge', text: 'Third (order:3)', color: '#ef4444',
        variant: 'outline', align: 'center', order: 13
      });
      widgets += bdWidget('order-a', {
        type: 'badge', text: 'First (order:1)', color: '#22c55e',
        variant: 'outline', align: 'center', order: 11
      });
      widgets += bdWidget('order-b', {
        type: 'badge', text: 'Second (order:2)', color: '#3b82f6',
        variant: 'outline', align: 'center', order: 12
      });
      return { output: '🔢 Testing widget ordering (should appear 1,2,3)...', widgets };
    }
  },
  // --- Step 18: Destroy individual widgets ---
  {
    name: 'Destroy Individual Widgets',
    run: () => {
      let widgets = '';
      widgets += bdDestroy('test-text');
      widgets += bdDestroy('test-icon');
      widgets += bdDestroy('test-custom');
      widgets += bdDestroy('zone-left');
      widgets += bdDestroy('zone-center');
      widgets += bdDestroy('zone-right');
      widgets += bdDestroy('order-a');
      widgets += bdDestroy('order-b');
      widgets += bdDestroy('order-c');
      return { output: '🗑️ Destroying text, icon, custom, zone, and order widgets...', widgets };
    }
  },
  // --- Step 19: Clear all ---
  {
    name: 'Clear All Widgets',
    run: () => {
      const widgets = bdClearAll();
      return { output: '🧹 Clearing ALL remaining widgets...', widgets };
    }
  },
  // --- Step 20: Final summary ---
  {
    name: 'Test Complete',
    run: () => {
      const total = TEST_STEPS.length;
      const passed = state.bd.testResults.filter(r => r === 'pass').length;
      let summary = '\\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n';
      summary += '🏁 TEST SUITE COMPLETE\\n';
      summary += \`   Steps run: \${total}\\n\`;
      summary += \`   All steps executed successfully.\\n\`;
      summary += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n';
      summary += '\\nCheck browser console (F12) for detailed BetterScripts logs.';
      state.bd.testRunning = false;
      state.bd.testStep = 0;
      state.bd.testResults = [];
      return { output: summary, widgets: '' };
    }
  }
];

// Run the current test step and advance
function runTestStep() {
  if (!state.bd.testRunning) return null;
  
  const stepIndex = state.bd.testStep;
  if (stepIndex >= TEST_STEPS.length) {
    state.bd.testRunning = false;
    return null;
  }
  
  const step = TEST_STEPS[stepIndex];
  const result = step.run();
  
  // Record result and advance
  state.bd.testResults.push('pass');
  state.bd.testStep = stepIndex + 1;
  
  const progress = \`[\${stepIndex + 1}/\${TEST_STEPS.length}]\`;
  const output = \`\\n🧪 \${progress} \${step.name}\\n\${result.output}\`;
  
  // Show next step preview if not the last step
  let nextHint = '';
  if (stepIndex + 1 < TEST_STEPS.length) {
    nextHint = \`\\n\\n⏭️ Next: \${TEST_STEPS[stepIndex + 1].name} (continue story to proceed)\`;
  }
  
  return { output: output + nextHint, widgets: result.widgets };
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
      helpText += '\\n🔧 WIDGET COMMANDS (all 9 types):\\n';
      for (const name of ['stat','bar','badge','counter','text','icon','panel','list','custom']) {
        const cmd = COMMANDS[name];
        helpText += \`  \${cmd.usage}\\n\`;
      }
      helpText += '\\n📡 PROTOCOL COMMANDS:\\n';
      for (const name of ['ping','register','update','destroy','clear']) {
        const cmd = COMMANDS[name];
        helpText += \`  \${cmd.usage} - \${cmd.desc}\\n\`;
      }
      helpText += '\\n🧪 TESTING COMMANDS:\\n';
      for (const name of ['demo','stress','test']) {
        const cmd = COMMANDS[name];
        helpText += \`  \${cmd.usage} - \${cmd.desc}\\n\`;
      }
      return { output: helpText, widgets: '' };
    }
  },
  
  ping: {
    desc: 'Test BetterScripts connection',
    usage: ':ping',
    handler: () => {
      const widgets = bdPing();
      return { 
        output: '\\n🏓 Ping sent! Check browser console for pong event.', 
        widgets 
      };
    }
  },
  
  register: {
    desc: 'Register a test script',
    usage: ':register [scriptId] [name] [version]',
    handler: (args) => {
      const id = args[0] || 'debug-console';
      const name = args[1] || 'Debug Console';
      const ver = args[2] || '2.0';
      const widgets = bdRegister(id, name, ver);
      return { 
        output: \`\\n📝 Registered script "\${name}" (id: \${id}, v\${ver}). Check console.\`, 
        widgets 
      };
    }
  },
  
  clear: {
    desc: 'Remove all widgets',
    usage: ':clear',
    handler: () => {
      const widgets = bdClearAll();
      state.bd.lastResult = 'Cleared all widgets';
      return { output: '\\n🧹 All widgets cleared.', widgets };
    }
  },
  
  stat: {
    desc: 'Create a stat widget',
    usage: ':stat <id> <label> <value> [color] [order]',
    handler: (args) => {
      const id = args[0] || 'test-stat';
      const label = args[1] || 'Test';
      const value = args[2] || '42';
      const color = args[3] || '#60a5fa';
      const order = args[4] ? parseInt(args[4]) : undefined;
      
      const config = {
        type: 'stat', label: label, value: value,
        color: color, align: 'center'
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      return { 
        output: \`\\n📊 Created stat "\${id}": \${label} = \${value}\`, 
        widgets 
      };
    }
  },
  
  bar: {
    desc: 'Create a bar widget',
    usage: ':bar <id> <value> <max> [label] [color] [order]',
    handler: (args) => {
      const id = args[0] || 'test-bar';
      const value = parseInt(args[1]) || 75;
      const max = parseInt(args[2]) || 100;
      const label = args[3] || 'Progress';
      const color = args[4] || '#22c55e';
      const order = args[5] ? parseInt(args[5]) : undefined;
      
      const config = {
        type: 'bar', label: label, value: value, max: max,
        color: color, showValue: true, align: 'center'
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      return { 
        output: \`\\n📈 Created bar "\${id}": \${label} \${value}/\${max}\`, 
        widgets 
      };
    }
  },
  
  badge: {
    desc: 'Create a badge widget',
    usage: ':badge <id> <text> [icon] [color] [variant]',
    handler: (args) => {
      const id = args[0] || 'test-badge';
      const text = args[1] || 'Status';
      const icon = args[2] || '';
      const color = args[3] || '#a855f7';
      const variant = args[4] || 'subtle';
      
      const config = {
        type: 'badge', text: text, color: color,
        variant: variant, align: 'center'
      };
      if (icon) config.icon = icon;
      
      const widgets = bdWidget(id, config);
      return { 
        output: \`\\n🏷️ Created badge "\${id}": \${icon ? icon + ' ' : ''}\${text} (\${variant})\`, 
        widgets 
      };
    }
  },
  
  counter: {
    desc: 'Create a counter widget',
    usage: ':counter <id> <value> [delta] [icon] [color]',
    handler: (args) => {
      const id = args[0] || 'test-counter';
      const value = parseInt(args[1]) || 0;
      const delta = args[2] ? parseInt(args[2]) : 0;
      const icon = args[3] || '';
      const color = args[4] || '#60a5fa';
      
      const config = {
        type: 'counter', value: value, delta: delta,
        color: color, align: 'center'
      };
      if (icon) config.icon = icon;
      
      const widgets = bdWidget(id, config);
      const deltaStr = delta !== 0 ? \` (\${delta > 0 ? '+' : ''}\${delta})\` : '';
      return { 
        output: \`\\n🔢 Created counter "\${id}": \${value}\${deltaStr}\`, 
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
        type: 'text', text: message,
        style: { color: color, fontWeight: 'bold' },
        align: 'center'
      });
      return { 
        output: \`\\n💬 Created text "\${id}": "\${message}"\`, 
        widgets 
      };
    }
  },
  
  icon: {
    desc: 'Create an icon widget',
    usage: ':icon <id> <emoji> [tooltip] [color]',
    handler: (args) => {
      const id = args[0] || 'test-icon';
      const emoji = args[1] || '❤️';
      const tooltip = args[2] || '';
      const color = args[3] || '#ef4444';
      
      const config = {
        type: 'icon', icon: emoji, color: color, align: 'center'
      };
      if (tooltip) config.tooltip = tooltip;
      
      const widgets = bdWidget(id, config);
      return { 
        output: \`\\n🎯 Created icon "\${id}": \${emoji}\${tooltip ? ' (' + tooltip + ')' : ''}\`, 
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
        type: 'panel', title: title, align: 'center',
        items: [
          { label: 'Item 1', value: 'Value A', color: '#60a5fa' },
          { label: 'Item 2', value: 'Value B', color: '#22c55e' },
          { label: 'Item 3', value: 'Value C', color: '#fbbf24' }
        ]
      });
      return { 
        output: \`\\n📋 Created panel "\${id}": "\${title}"\`, 
        widgets 
      };
    }
  },
  
  list: {
    desc: 'Create a list widget with sample items',
    usage: ':list <id> <title>',
    handler: (args) => {
      const id = args[0] || 'test-list';
      const title = args[1] || 'Test List';
      
      const widgets = bdWidget(id, {
        type: 'list', title: title, align: 'center',
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🛡️', text: 'Wooden Shield', color: '#22c55e' },
          'Health Potion'
        ]
      });
      return { 
        output: \`\\n📝 Created list "\${id}": "\${title}"\`, 
        widgets 
      };
    }
  },
  
  custom: {
    desc: 'Create a custom HTML widget',
    usage: ':custom <id> <html>',
    handler: (args) => {
      const id = args[0] || 'test-custom';
      const html = args[1] || '<div style="display:flex;gap:6px;align-items:center;"><strong style="color:#f472b6;">Custom</strong> <span style="color:#94a3b8;">HTML Widget</span></div>';
      
      const widgets = bdWidget(id, {
        type: 'custom', html: html, align: 'center'
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
      
      const widgets = bdMsg({ type: 'widget', widgetId: id, action: 'update', config });
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
      
      const widgets = bdDestroy(id);
      return { output: \`\\n🗑️ Destroyed widget "\${id}"\`, widgets };
    }
  },
  
  demo: {
    desc: 'Show all 9 widget types at once',
    usage: ':demo',
    handler: () => {
      let widgets = '';
      
      // === CENTER ZONE: Core HUD ===
      
      // Bar: HP (order 1)
      widgets += bdWidget('demo-hp', {
        type: 'bar', label: 'HP', value: 75, max: 100,
        color: '#ef4444', showValue: true, align: 'center', order: 1
      });
      
      // Bar: MP (order 2)
      widgets += bdWidget('demo-mp', {
        type: 'bar', label: 'MP', value: 50, max: 80,
        color: '#3b82f6', showValue: true, align: 'center', order: 2
      });
      
      // Badge: Poisoned (order 3)
      widgets += bdWidget('demo-badge', {
        type: 'badge', text: 'Poisoned', icon: '☠️',
        color: '#a855f7', variant: 'subtle', align: 'center', order: 3
      });
      
      // Counter: Kills (order 4)
      widgets += bdWidget('demo-counter', {
        type: 'counter', icon: '⚔️', value: 24, delta: 3,
        color: '#60a5fa', align: 'center', order: 4
      });
      
      // Text: Quest (order 5)
      widgets += bdWidget('demo-status', {
        type: 'text', text: '⚡ Quest Active',
        style: { color: '#fbbf24', fontWeight: 'bold' },
        align: 'center', order: 5
      });
      
      // Icon: Night indicator (order 6)
      widgets += bdWidget('demo-icon', {
        type: 'icon', icon: '🌙', color: '#94a3b8',
        tooltip: 'Night Time', align: 'center', order: 6
      });
      
      // Custom HTML (order 7)
      widgets += bdWidget('demo-custom', {
        type: 'custom', align: 'center', order: 7,
        html: '<div style="display:flex;gap:4px;align-items:center;"><strong style="color:#f472b6;">LVL</strong><span style="color:#e2e8f0;">12</span></div>'
      });
      
      // === LEFT ZONE: Character Panel ===
      
      widgets += bdWidget('demo-panel', {
        type: 'panel', title: 'Character', align: 'left', order: 1,
        items: [
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4500/5000', color: '#22c55e' }
        ]
      });
      
      // === RIGHT ZONE: Inventory + Gold ===
      
      // Stat: Gold (order 1)
      widgets += bdWidget('demo-gold', {
        type: 'stat', label: 'Gold', value: '1,250',
        color: '#fbbf24', align: 'right', order: 1
      });
      
      // List: Inventory (order 2)
      widgets += bdWidget('demo-list', {
        type: 'list', title: 'Inventory', align: 'right', order: 2,
        items: [
          { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
          { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
          { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' }
        ]
      });
      
      return { 
        output: '\\n🎮 Demo: All 9 widget types created!\\n  Center: bar, badge, counter, text, icon, custom\\n  Left: panel\\n  Right: stat, list', 
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
          label: 'W' + i,
          value: Math.floor(Math.random() * 100),
          color: \`hsl(\${(i * 360 / count)}, 70%, 60%)\`,
          align: 'center', order: i
        });
      }
      
      return { 
        output: \`\\n🔥 Created \${count} stress test widgets\`, 
        widgets 
      };
    }
  },
  
  test: {
    desc: 'Run sequential test suite (1 step/turn)',
    usage: ':test [skip|stop]',
    handler: (args) => {
      const subcommand = (args[0] || '').toLowerCase();
      
      // :test stop - abort running test
      if (subcommand === 'stop') {
        if (!state.bd.testRunning) {
          return { output: '\\n❌ No test suite is running.', widgets: '' };
        }
        const step = state.bd.testStep;
        state.bd.testRunning = false;
        state.bd.testStep = 0;
        state.bd.testResults = [];
        const widgets = bdClearAll();
        return { output: \`\\n🛑 Test suite stopped at step \${step}/\${TEST_STEPS.length}. Widgets cleared.\`, widgets };
      }
      
      // :test skip - skip current step
      if (subcommand === 'skip') {
        if (!state.bd.testRunning) {
          return { output: '\\n❌ No test suite is running.', widgets: '' };
        }
        const skippedName = TEST_STEPS[state.bd.testStep]?.name || '?';
        state.bd.testResults.push('skip');
        state.bd.testStep += 1;
        if (state.bd.testStep >= TEST_STEPS.length) {
          state.bd.testRunning = false;
          return { output: \`\\n⏭️ Skipped "\${skippedName}". Suite complete.\`, widgets: '' };
        }
        const nextName = TEST_STEPS[state.bd.testStep].name;
        return { output: \`\\n⏭️ Skipped "\${skippedName}". Next: \${nextName}\`, widgets: '' };
      }
      
      // :test - start a new test suite
      if (state.bd.testRunning) {
        return { output: \`\\n⚠️ Test already running (step \${state.bd.testStep + 1}/\${TEST_STEPS.length}). Use :test stop to abort.\`, widgets: '' };
      }
      
      state.bd.testRunning = true;
      state.bd.testStep = 0;
      state.bd.testResults = [];
      
      // Clear any existing widgets before starting
      let widgets = bdClearAll();
      
      let output = '\\n🧪 **BetterScripts Test Suite Started**\\n';
      output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n';
      output += \`Total steps: \${TEST_STEPS.length}\\n\`;
      output += 'Each turn runs the next test step.\\n';
      output += 'Commands: :test skip | :test stop\\n';
      output += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\\n';
      output += \`\\n⏭️ Next: \${TEST_STEPS[0].name} (continue story to begin)\`;
      
      return { output, widgets };
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
  state.bd.isCommand = false;
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
// OUTPUT MODIFIER - Display Results & Run Tests
// ============================================
// Shows command results, runs test suite steps,
// and appends widget protocol messages.

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
  // Run next test step if suite is active (and no command was just run)
  else if (state.bd.testRunning) {
    const testResult = runTestStep();
    if (testResult) {
      output = testResult.output;
      widgets = testResult.widgets;
    }
  }
  
  // Always show turn counter widget (order: 0 to appear first)
  widgets += bdWidget('console-turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#94a3b8',
    align: 'left',
    order: 0
  });
  
  // Show test progress badge if suite is running
  if (state.bd.testRunning) {
    widgets += bdWidget('console-test', {
      type: 'badge',
      text: \`Test \${state.bd.testStep}/\${TEST_STEPS.length}\`,
      icon: '🧪',
      color: '#22c55e',
      variant: 'subtle',
      align: 'left',
      order: 1
    });
  }
  
  return { text: output + widgets };
};

modifier(text);`
    }
  },
  {
    id: 'betterscripts-widget-showcase',
    name: 'Widget Showcase',
    category: 'betterscripts',
    difficulty: 'beginner',
    impact: 'low',
    essential: false,
    tags: ['widgets', 'demo', 'showcase', 'betterscripts', 'testing', 'all-widgets'],
    source: 'BetterRepository',
    description: 'Displays all widget types for visual testing.',
    purpose: 'Creates one of every widget type using bdWidget. Perfect for testing styles and layouts. See the BetterScripts Guide for full documentation.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Widget Showcase
// ============================================
// Creates all widget types for visual testing.
// Uses bdWidget to create or update widgets on subsequent turns.

function bdMessage(msg) { return \`[[BD:\${JSON.stringify(msg)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMessage({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdClearAll() { return bdMessage({ type: 'clearAll' }); }`,
      context: `// Strip protocol messages from AI context
const modifier = (text) => {
  return { text: text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '') };
};
modifier(text);`,
      output: `// ============================================
// OUTPUT - Create All Widget Types
// ============================================
// Uses bdWidget to create and update widgets each turn.

const modifier = (text) => {
  let w = '';
  
  // ========== Status Bar ==========
  
  // Stats
  w += bdWidget('demo-hp', { type: 'stat', label: 'HP', value: '85/100', color: '#ef4444', align: 'center', order: 1 });
  w += bdWidget('demo-mp', { type: 'stat', label: 'MP', value: '42/60', color: '#3b82f6', align: 'center', order: 2 });
  w += bdWidget('demo-gold', { type: 'stat', label: '💰', value: '1,250', color: '#fbbf24', align: 'center', order: 3 });
  
  // Bars
  w += bdWidget('demo-health-bar', { type: 'bar', label: 'Health', value: 85, max: 100, color: '#22c55e', align: 'center', order: 4 });
  w += bdWidget('demo-mana-bar', { type: 'bar', label: 'Mana', value: 42, max: 60, color: '#8b5cf6', align: 'center', order: 5 });
  w += bdWidget('demo-xp-bar', { type: 'bar', label: 'XP', value: 750, max: 1000, color: '#06b6d4', align: 'center', order: 6 });
  
  // Badges (all three variants)
  w += bdWidget('demo-badge-poison', { type: 'badge', text: 'Poisoned', icon: '☠️', color: '#a855f7', variant: 'subtle', align: 'center', order: 7 });
  w += bdWidget('demo-badge-shield', { type: 'badge', text: 'Shielded', icon: '🛡️', color: '#3b82f6', variant: 'solid', align: 'center', order: 8 });
  w += bdWidget('demo-badge-fire', { type: 'badge', text: 'Burning', icon: '🔥', color: '#f97316', variant: 'outline', align: 'center', order: 9 });
  
  // Counters (positive and negative delta)
  w += bdWidget('demo-counter-up', { type: 'counter', icon: '⚔️', value: 24, delta: 3, color: '#60a5fa', align: 'center', order: 10 });
  w += bdWidget('demo-counter-down', { type: 'counter', icon: '💔', value: 12, delta: -5, color: '#f472b6', align: 'center', order: 11 });
  
  // Icons with tooltips
  w += bdWidget('demo-icon-heart', { type: 'icon', icon: '❤️', color: '#ef4444', tooltip: 'Health', align: 'center', order: 12 });
  w += bdWidget('demo-icon-star', { type: 'icon', icon: '⭐', color: '#fbbf24', tooltip: 'Reputation', align: 'center', order: 13 });
  w += bdWidget('demo-icon-moon', { type: 'icon', icon: '🌙', color: '#94a3b8', tooltip: 'Night', align: 'center', order: 14 });
  
  // ========== Character Info ==========
  
  w += bdWidget('demo-panel', { 
    type: 'panel', title: 'Character', align: 'left',
    items: [
      { label: 'Name', value: 'Adventurer', color: '#f472b6' },
      { label: 'Class', value: 'Warrior', color: '#60a5fa' },
      { label: 'Level', value: '12', color: '#a855f7' }
    ],
    order: 1 
  });
  
  // ========== Inventory/Quest ==========
  
  w += bdWidget('demo-text', { type: 'text', text: '⚡ Quest: Find the Artifact', style: { color: '#fbbf24', fontWeight: '500' }, align: 'right', order: 1 });
  w += bdWidget('demo-list', { 
    type: 'list', title: 'Inventory', align: 'right',
    items: [
      { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
      { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
      { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
      { icon: '📜', text: 'Map' }
    ],
    order: 2 
  });
  
  return { text: text + w };
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
