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
    description: 'Minimal example: displays turn count using a stat widget.',
    purpose: 'The simplest BetterScripts example. Uses info.actionCount for reliable turn tracking. Great starting point for learning.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Simple Turn Counter
// ============================================
// The simplest possible BetterScripts example.
// Uses info.actionCount for reliable turn tracking.

// BetterScripts protocol helper
function bdWidget(id, cfg) {
  return \`[[BD:\${JSON.stringify({ type: 'widget', widgetId: id, action: 'create', config: cfg })}:BD]]\`;
}`,
      context: `// Strip protocol messages from AI context
const modifier = (text) => {
  return { text: text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '') };
};
modifier(text);`,
      output: `// Display turn counter widget
const modifier = (text) => {
  const widget = bdWidget('turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#60a5fa',
    position: 'top'
  });
  return { text: text + widget };
};
modifier(text);`
    }
  },
  {
    id: 'chronos-time-system',
    name: 'Chronos',
    category: 'betterscripts',
    difficulty: 'advanced',
    impact: 'high',
    essential: true,
    tags: ['widgets', 'time', 'clock', 'day-night', 'betterscripts', 'context', 'commands', 'calendar', 'weather', 'date', 'season', 'standalone'],
    source: 'BetterRepository',
    description: 'The ultimate AI Dungeon time system. Full calendar with day/week/month/year tracking, time-of-day periods, optional weather, and rich commands. Works standalone or enhanced with BetterScripts widgets.',
    purpose: 'Standalone time engine enhanced by BetterDungeon. Each turn = configurable minutes. Commands: :time, :timeskip, :sleep, :settime, :setdate, :weather, :chronos. Full calendar with seasons and optional weather cycles.',
    files: {
      library: `// ============================================
// Chronos - The Ultimate AI Dungeon Time System
// ============================================
// A comprehensive time and calendar engine for AI Dungeon.
// Works standalone. Enhanced with BetterScripts widgets when BetterDungeon is present.
//
// FEATURES:
//   Full calendar: hour, minute, day-of-week, day, month, year
//   Time-of-day periods: Dawn, Morning, Afternoon, Evening, Night, Midnight
//   Season tracking with configurable start date
//   Optional weather system with season-aware patterns
//   Rich command set for time manipulation
//   Leap year support, proper month lengths
//
// COMMANDS:
//   :time                    - Show current date/time
//   :timeskip <N> <unit>     - Skip time (minutes/hours/days/weeks/months/years)
//   :sleep                   - Skip to next morning (7 AM)
//   :settime <hour> [minute] - Set clock to specific time (0-23)
//   :setdate <month> <day> [year] - Set calendar date
//   :weather                 - Toggle weather system
//   :chronos                 - Show help and system status

// ============================================
// STATE INITIALIZATION
// ============================================

state.chronos = state.chronos ?? {
  offsetMinutes: 0,
  startMonth: 6,
  startDay: 15,
  startYear: 1,
  startHour: 8,
  startMinute: 0,
  weatherEnabled: false,
  weatherCondition: 'Clear',
  weatherLastChange: 0
};

const CFG = {
  minutesPerTurn: 2,
  morningHour: 7
};

// ============================================
// BETTERSCRIPTS PROTOCOL (OPTIONAL)
// ============================================

function bdMsg(m) { return \`[[BD:\${JSON.stringify(m)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMsg({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }

// ============================================
// CALENDAR CONSTANTS
// ============================================

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MONTHS = [
  { name: 'January', days: 31 },
  { name: 'February', days: 28 },
  { name: 'March', days: 31 },
  { name: 'April', days: 30 },
  { name: 'May', days: 31 },
  { name: 'June', days: 30 },
  { name: 'July', days: 31 },
  { name: 'August', days: 31 },
  { name: 'September', days: 30 },
  { name: 'October', days: 31 },
  { name: 'November', days: 30 },
  { name: 'December', days: 31 }
];

const TIME_PERIODS = [
  { name: 'Midnight', start: 0, end: 4 },
  { name: 'Dawn', start: 4, end: 7 },
  { name: 'Morning', start: 7, end: 12 },
  { name: 'Afternoon', start: 12, end: 17 },
  { name: 'Evening', start: 17, end: 21 },
  { name: 'Night', start: 21, end: 24 }
];

const SEASONS = [
  { name: 'Winter', months: [12, 1, 2] },
  { name: 'Spring', months: [3, 4, 5] },
  { name: 'Summer', months: [6, 7, 8] },
  { name: 'Autumn', months: [9, 10, 11] }
];

const WEATHER_TABLE = {
  Winter: { Clear: 10, Cloudy: 25, Foggy: 15, Snowy: 25, Windy: 10, Rainy: 10, Stormy: 5 },
  Spring: { Clear: 25, Cloudy: 20, Foggy: 10, Rainy: 25, Windy: 10, Stormy: 8, Snowy: 2 },
  Summer: { Clear: 35, Cloudy: 20, Rainy: 15, Stormy: 10, Windy: 10, Foggy: 5, Snowy: 0 },
  Autumn: { Clear: 15, Cloudy: 25, Foggy: 20, Rainy: 20, Windy: 10, Stormy: 5, Snowy: 5 }
};

// ============================================
// CALENDAR ENGINE
// ============================================

function isLeapYear(y) {
  return (y % 4 === 0) && (y % 100 !== 0 || y % 400 === 0);
}

function daysInMonth(month, year) {
  if (month === 2 && isLeapYear(year)) return 29;
  return MONTHS[month - 1].days;
}

function getTotalMinutes() {
  const turns = info.actionCount || 0;
  const startMin = state.chronos.startHour * 60 + state.chronos.startMinute;
  return startMin + (turns * CFG.minutesPerTurn) + state.chronos.offsetMinutes;
}

function resolveDateTime() {
  let totalMin = getTotalMinutes();
  let year = state.chronos.startYear;
  let month = state.chronos.startMonth;
  let day = state.chronos.startDay;

  let daysSinceStart = Math.floor(totalMin / (24 * 60));
  let remainingMin = totalMin % (24 * 60);
  if (remainingMin < 0) {
    daysSinceStart -= 1;
    remainingMin += 24 * 60;
  }

  day += daysSinceStart;

  while (day > daysInMonth(month, year)) {
    day -= daysInMonth(month, year);
    month++;
    if (month > 12) { month = 1; year++; }
  }
  while (day < 1) {
    month--;
    if (month < 1) { month = 12; year--; }
    day += daysInMonth(month, year);
  }

  const hour = Math.floor(remainingMin / 60) % 24;
  const minute = remainingMin % 60;

  return { year, month, day, hour, minute };
}

function getHour() { return resolveDateTime().hour; }
function getMinute() { return resolveDateTime().minute; }

function getTimeString() {
  const dt = resolveDateTime();
  const hour12 = dt.hour % 12 || 12;
  const ampm = dt.hour < 12 ? 'AM' : 'PM';
  return \`\${hour12}:\${String(dt.minute).padStart(2, '0')} \${ampm}\`;
}

function getTimePeriod() {
  const h = getHour();
  for (const p of TIME_PERIODS) {
    if (h >= p.start && h < p.end) return p;
  }
  return TIME_PERIODS[0];
}

function getMonthName() { return MONTHS[resolveDateTime().month - 1].name; }
function getMonthShort() { return getMonthName().substring(0, 3); }
function getDayOfMonth() { return resolveDateTime().day; }
function getYear() { return resolveDateTime().year; }

function getDayCount() {
  return Math.floor(getTotalMinutes() / (24 * 60)) + 1;
}

function getWeekday() {
  return WEEKDAYS[(getDayCount() - 1) % 7];
}

function getSeason() {
  const m = resolveDateTime().month;
  for (const s of SEASONS) {
    if (s.months.includes(m)) return s.name;
  }
  return 'Summer';
}

function getDateString() {
  const dt = resolveDateTime();
  return \`\${getMonthName()} \${dt.day}, Year \${dt.year}\`;
}

function getFullDateString() {
  return \`\${getWeekday()}, \${getDateString()}\`;
}

// ============================================
// TIME MANIPULATION
// ============================================

function addMinutes(n) { state.chronos.offsetMinutes += n; }

function skipToHour(targetHour, targetMinute) {
  const dt = resolveDateTime();
  let minutesToAdd = (targetHour * 60 + (targetMinute || 0)) - (dt.hour * 60 + dt.minute);
  if (minutesToAdd <= 0) minutesToAdd += 24 * 60;
  state.chronos.offsetMinutes += minutesToAdd;
}

function skipToMorning() {
  const h = getHour();
  const m = getMinute();
  if (h < CFG.morningHour) {
    state.chronos.offsetMinutes += (CFG.morningHour * 60) - (h * 60 + m);
  } else {
    state.chronos.offsetMinutes += (24 * 60) - (h * 60 + m) + (CFG.morningHour * 60);
  }
}

function setDateTime(month, day, year) {
  const dt = resolveDateTime();
  const targetY = year !== undefined ? year : dt.year;

  function countDaysFromEpoch(ey, em, ed) {
    let total = 0;
    for (let yr = 1; yr < ey; yr++) {
      total += isLeapYear(yr) ? 366 : 365;
    }
    for (let mn = 1; mn < em; mn++) {
      total += daysInMonth(mn, ey);
    }
    total += ed - 1;
    return total;
  }

  const targetAbsDays = countDaysFromEpoch(targetY, month, day);
  const curAbsDays = countDaysFromEpoch(dt.year, dt.month, dt.day);
  const dayDiff = targetAbsDays - curAbsDays;
  state.chronos.offsetMinutes += dayDiff * 24 * 60;
}

// ============================================
// WEATHER ENGINE
// ============================================

function rollWeather() {
  const season = getSeason();
  const table = WEATHER_TABLE[season];
  const conditions = Object.keys(table);
  const weights = Object.values(table);
  const totalWeight = weights.reduce(function(a, b) { return a + b; }, 0);

  let roll = Math.floor(Math.random() * totalWeight);
  for (let i = 0; i < conditions.length; i++) {
    roll -= weights[i];
    if (roll < 0) return conditions[i];
  }
  return 'Clear';
}

function updateWeather() {
  if (!state.chronos.weatherEnabled) return;
  const dayCount = getDayCount();
  const period = getTimePeriod().name;
  const changePoints = ['Dawn', 'Afternoon', 'Night'];
  const lastChange = state.chronos.weatherLastChange || 0;

  if (dayCount !== lastChange && changePoints.includes(period)) {
    if (Math.random() < 0.4) {
      state.chronos.weatherCondition = rollWeather();
    }
    state.chronos.weatherLastChange = dayCount;
  }
}

function getWeatherString() {
  if (!state.chronos.weatherEnabled) return '';
  return state.chronos.weatherCondition || 'Clear';
}

// ============================================
// CONTEXT BUILDER
// ============================================

function getTimeContext() {
  const period = getTimePeriod();
  let ctx = \`[Time: \${getTimeString()} (\${period.name}), \${getFullDateString()}, \${getSeason()}\`;
  if (state.chronos.weatherEnabled) {
    ctx += \` | Weather: \${getWeatherString()}\`;
  }
  ctx += ']';
  return ctx;
}

// ============================================
// COMMAND HANDLERS
// ============================================

function handleChronosCommand(input) {
  const lower = input.toLowerCase().trim();
  const parts = lower.split(/\\s+/);
  const cmd = parts[0];

  if (cmd === ':chronos') {
    const bd = 'Supported (widgets emitted each turn)';
    const w = state.chronos.weatherEnabled ? 'ON' : 'OFF';
    return {
      output: \`\\nChronos Time System\\n\` +
        \`Time: \${getTimeString()} (\${getTimePeriod().name})\\n\` +
        \`Date: \${getFullDateString()}\\n\` +
        \`Season: \${getSeason()} | Year \${getYear()}\\n\` +
        \`Weather: \${w}\${state.chronos.weatherEnabled ? ' (' + getWeatherString() + ')' : ''}\\n\` +
        \`BetterScripts: \${bd}\\n\` +
        \`Turn: \${info.actionCount || 0} (\${CFG.minutesPerTurn} min/turn)\\n\\n\` +
        \`Commands:\\n\` +
        \`:time - Current time & date\\n\` +
        \`:timeskip <N> <unit> - Skip (minutes/hours/days/weeks/months/years)\\n\` +
        \`:sleep - Rest until morning\\n\` +
        \`:settime <hour> [min] - Set clock (0-23)\\n\` +
        \`:setdate <month> <day> [year] - Set date (1-12, 1-31)\\n\` +
        \`:weather - Toggle weather\\n\` +
        \`:chronos - This help\`,
      isCommand: true
    };
  }

  if (cmd === ':time') {
    const period = getTimePeriod();
    let out = \`\\n\${getTimeString()} - \${period.name}\\n\${getFullDateString()} (\${getSeason()}, Year \${getYear()})\`;
    if (state.chronos.weatherEnabled) {
      out += \`\\nWeather: \${getWeatherString()}\`;
    }
    return { output: out, isCommand: true };
  }

  if (cmd === ':timeskip' && parts.length >= 2) {
    const amount = parseInt(parts[1]);
    if (isNaN(amount) || amount <= 0) {
      return { output: '\\nUsage: :timeskip <number> <minutes|hours|days|weeks|months|years>', isCommand: true };
    }
    const unit = (parts[2] || 'hours').toLowerCase();
    let minutes = 0;
    let label = '';
    if (unit.startsWith('mi')) { minutes = amount; label = \`\${amount} minute\${amount !== 1 ? 's' : ''}\`; }
    else if (unit.startsWith('h')) { minutes = amount * 60; label = \`\${amount} hour\${amount !== 1 ? 's' : ''}\`; }
    else if (unit.startsWith('d')) { minutes = amount * 60 * 24; label = \`\${amount} day\${amount !== 1 ? 's' : ''}\`; }
    else if (unit.startsWith('w')) { minutes = amount * 60 * 24 * 7; label = \`\${amount} week\${amount !== 1 ? 's' : ''}\`; }
    else if (unit.startsWith('mo')) { minutes = amount * 60 * 24 * 30; label = \`\${amount} month\${amount !== 1 ? 's' : ''}\`; }
    else if (unit.startsWith('y')) { minutes = amount * 60 * 24 * 365; label = \`\${amount} year\${amount !== 1 ? 's' : ''}\`; }
    else { minutes = amount * 60; label = \`\${amount} hour\${amount !== 1 ? 's' : ''}\`; }

    addMinutes(minutes);
    const period = getTimePeriod();
    return {
      output: \`\\nSkipped \${label}. It is now \${getTimeString()} (\${period.name}), \${getFullDateString()}.\`,
      isCommand: true
    };
  }

  if (cmd === ':sleep') {
    skipToMorning();
    return {
      output: \`\\nYou rest and wake refreshed. It is now \${getTimeString()} on \${getFullDateString()}.\`,
      isCommand: true
    };
  }

  if (cmd === ':settime' && parts.length >= 2) {
    const hour = parseInt(parts[1]);
    if (isNaN(hour) || hour < 0 || hour > 23) {
      return { output: '\\nUsage: :settime <hour 0-23> [minute 0-59]', isCommand: true };
    }
    const minute = parts[2] ? Math.min(59, Math.max(0, parseInt(parts[2]) || 0)) : 0;
    skipToHour(hour, minute);
    const period = getTimePeriod();
    return {
      output: \`\\nTime set to \${getTimeString()} (\${period.name}).\`,
      isCommand: true
    };
  }

  if (cmd === ':setdate' && parts.length >= 3) {
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const year = parts[3] ? parseInt(parts[3]) : undefined;
    if (isNaN(month) || month < 1 || month > 12 || isNaN(day) || day < 1 || day > 31) {
      return { output: '\\nUsage: :setdate <month 1-12> <day 1-31> [year]', isCommand: true };
    }
    const maxDay = daysInMonth(month, year || getYear());
    const clampedDay = Math.min(day, maxDay);
    setDateTime(month, clampedDay, year);
    return {
      output: \`\\nDate set to \${getFullDateString()}, Year \${getYear()}.\`,
      isCommand: true
    };
  }

  if (cmd === ':weather') {
    state.chronos.weatherEnabled = !state.chronos.weatherEnabled;
    if (state.chronos.weatherEnabled && !state.chronos.weatherCondition) {
      state.chronos.weatherCondition = rollWeather();
    }
    const status = state.chronos.weatherEnabled ? 'enabled' : 'disabled';
    let out = \`\\nWeather system \${status}.\`;
    if (state.chronos.weatherEnabled) {
      out += \` Current: \${getWeatherString()} (\${getSeason()})\`;
    }
    return { output: out, isCommand: true };
  }

  return null;
}`,
      context: `// ============================================
// CONTEXT MODIFIER - Chronos
// ============================================
// Injects current time/date/weather into AI context.
// Strips BetterScripts protocol messages so AI never sees them.

const modifier = (text) => {
  text = text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '');

  updateWeather();

  const timeContext = getTimeContext();
  text = timeContext + '\\n' + text;

  return { text };
};

modifier(text);`,
      input: `// ============================================
// INPUT MODIFIER - Chronos
// ============================================
// Detects Chronos commands from player input.
// Handles: :time, :timeskip, :sleep, :settime, :setdate, :weather, :chronos

const modifier = (text) => {
  const input = text.trim();
  const lower = input.toLowerCase();

  const commandPrefixes = [':time', ':sleep', ':settime', ':setdate', ':weather', ':chronos'];
  const isCommand = commandPrefixes.some(function(p) { return lower.startsWith(p); });

  if (isCommand) {
    const result = handleChronosCommand(input);
    if (result) {
      state.chronos.pendingOutput = result.output;
      state.chronos.isCommand = true;
      return { text: '', stop: true };
    }
  }

  return { text };
};

modifier(text);`,
      output: `// ============================================
// OUTPUT MODIFIER - Chronos
// ============================================
// Progressive enhancement: always emits BetterScripts widget protocol
// messages AND sets state.message. BetterDungeon strips the protocol
// messages from the DOM and renders widgets. Without BetterDungeon,
// state.message provides a clean fallback display.

const modifier = (text) => {
  let output = text;

  if (state.chronos.isCommand && state.chronos.pendingOutput) {
    output = state.chronos.pendingOutput;
    state.chronos.pendingOutput = null;
    state.chronos.isCommand = false;
  }

  updateWeather();

  const period = getTimePeriod();
  const isNight = period.name === 'Night' || period.name === 'Midnight';

  let widgets = '';

  widgets += bdWidget('chronos-clock', {
    type: 'stat',
    label: 'Time',
    value: getTimeString(),
    color: isNight ? '#94a3b8' : '#fbbf24',
    position: 'top',
    order: 1
  });

  widgets += bdWidget('chronos-date', {
    type: 'stat',
    label: 'Date',
    value: getMonthShort() + ' ' + getDayOfMonth() + ', Y' + getYear(),
    color: '#60a5fa',
    position: 'top',
    order: 2
  });

  widgets += bdWidget('chronos-period', {
    type: 'badge',
    text: period.name,
    color: isNight ? '#a78bfa' : '#f472b6',
    variant: 'subtle',
    position: 'top',
    order: 3
  });

  widgets += bdWidget('chronos-day', {
    type: 'badge',
    text: getWeekday().substring(0, 3) + ' D' + getDayCount(),
    color: '#34d399',
    variant: 'subtle',
    position: 'top',
    order: 4
  });

  if (state.chronos.weatherEnabled) {
    widgets += bdWidget('chronos-weather', {
      type: 'badge',
      text: getWeatherString(),
      color: '#38bdf8',
      variant: 'subtle',
      position: 'top',
      order: 5
    });
  }

  output += widgets;

  let msg = \`\${getTimeString()} (\${period.name}) | \${getWeekday().substring(0, 3)}, \${getMonthShort()} \${getDayOfMonth()}\`;
  if (state.chronos.weatherEnabled) {
    msg += \` | \${getWeatherString()}\`;
  }
  state.message = msg;

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
    tags: ['widgets', 'debug', 'testing', 'betterscripts', 'commands', 'developer-tool'],
    source: 'BetterRepository',
    description: 'Interactive debug console for testing all widget types via : commands.',
    purpose: 'Type :help for commands. Create, update, and destroy widgets. Test ordering, styling, and protocol features.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - BetterScripts Debug Console
// ============================================
// A comprehensive debug tool for testing BetterScripts.
// Use : commands in Do actions to control widgets.
//
// COMMANDS:
//   :help              - Show all commands
//   :ping              - Test connection
//   :clear             - Remove all widgets
//   :demo              - Show demo widgets
//   :stat <id> <label> <val> [color] [order] [position]
//   :bar <id> <val> <max> [label] [color] [order] [position]
//   :text <id> <msg> [color] [position]
//   :panel <id> <title> [position]
//   :custom <id> <html>
//   :update <id> <prop> <val>
//   :destroy <id>
//   :stress <count>
//
// POSITIONS: top (default), left, right

state.bd = state.bd ?? { lastCommand: null, lastResult: null };

// ============================================
// BETTERSCRIPTS PROTOCOL HELPERS
// ============================================

// Concise protocol helpers
function bdMsg(m) { return \`[[BD:\${JSON.stringify(m)}:BD]]\`; }
function bdWidget(id, cfg) { return bdMsg({ type: 'widget', widgetId: id, action: 'create', config: cfg }); }
function bdUpdate(id, cfg) { return bdMsg({ type: 'widget', widgetId: id, action: 'update', config: cfg }); }
function bdDestroy(id) { return bdMsg({ type: 'widget', widgetId: id, action: 'destroy' }); }
function bdPing() { return bdMsg({ type: 'ping', timestamp: Date.now(), data: 'debug' }); }

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
      const widgets = bdPing();
      return { 
        output: '\\n🏓 Ping sent! Check browser console for pong event.', 
        widgets 
      };
    }
  },
  
  clear: {
    desc: 'Remove all debug widgets',
    usage: ':clear',
    handler: () => {
      // Use clearAll message type for efficient clearing (single message)
      const widgets = bdMsg({ type: 'clearAll' });
      state.bd.lastResult = 'Cleared all widgets';
      return { output: '\\n🧹 All debug widgets cleared.', widgets };
    }
  },
  
  stat: {
    desc: 'Create a stat widget',
    usage: ':stat <id> <label> <value> [color] [order] [position]',
    handler: (args) => {
      const id = args[0] || 'test-stat';
      const label = args[1] || 'Test';
      const value = args[2] || '42';
      const color = args[3] || '#60a5fa';
      const order = args[4] ? parseInt(args[4]) : undefined;
      const position = args[5] || 'top';
      
      const config = {
        type: 'stat',
        label: label,
        value: value,
        color: color,
        position: position
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      
      return { 
        output: \`\\n📊 Created stat widget "\${id}": \${label} = \${value} [\${position}]\`, 
        widgets 
      };
    }
  },
  
  bar: {
    desc: 'Create a bar widget',
    usage: ':bar <id> <value> <max> [label] [color] [order] [position]',
    handler: (args) => {
      const id = args[0] || 'test-bar';
      const value = parseInt(args[1]) || 75;
      const max = parseInt(args[2]) || 100;
      const label = args[3] || 'Progress';
      const color = args[4] || '#22c55e';
      const order = args[5] ? parseInt(args[5]) : undefined;
      const position = args[6] || 'top';
      
      const config = {
        type: 'bar',
        label: label,
        value: value,
        max: max,
        color: color,
        showValue: true,
        position: position
      };
      if (order !== undefined) config.order = order;
      
      const widgets = bdWidget(id, config);
      
      return { 
        output: \`\\n📈 Created bar widget "\${id}": \${label} \${value}/\${max} [\${position}]\`, 
        widgets 
      };
    }
  },
  
  text: {
    desc: 'Create a text widget',
    usage: ':text <id> <message> [color] [position]',
    handler: (args) => {
      const id = args[0] || 'test-text';
      const message = args[1] || 'Hello BetterScripts!';
      const color = args[2] || '#fbbf24';
      const position = args[3] || 'top';
      
      const widgets = bdWidget(id, {
        type: 'text',
        text: message,
        style: {
          color: color,
          fontWeight: 'bold'
        },
        position: position
      });
      
      return { 
        output: \`\\n💬 Created text widget "\${id}": "\${message}" [\${position}]\`, 
        widgets 
      };
    }
  },
  
  panel: {
    desc: 'Create a panel widget with sample items',
    usage: ':panel <id> <title> [position]',
    handler: (args) => {
      const id = args[0] || 'test-panel';
      const title = args[1] || 'Test Panel';
      const position = args[2] || 'left';
      
      const widgets = bdWidget(id, {
        type: 'panel',
        title: title,
        position: position,
        items: [
          { label: 'Item 1', value: 'Value A', color: '#60a5fa' },
          { label: 'Item 2', value: 'Value B', color: '#22c55e' },
          { label: 'Item 3', value: 'Value C', color: '#fbbf24' }
        ]
      });
      
      return { 
        output: \`\\n📋 Created panel widget "\${id}": "\${title}" [\${position}]\`, 
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
      
      const widgets = bdUpdate(id, config);
      
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
    desc: 'Show demo widgets of all types',
    usage: ':demo',
    handler: () => {
      let widgets = '';
      
      // HP Bar (order: 1 - appears first)
      widgets += bdWidget('demo-hp', {
        type: 'bar',
        label: 'HP',
        value: 75,
        max: 100,
        color: '#ef4444',
        showValue: true,
        order: 1
      });
      
      // MP Bar (order: 2)
      widgets += bdWidget('demo-mp', {
        type: 'bar',
        label: 'MP',
        value: 50,
        max: 80,
        color: '#3b82f6',
        showValue: true,
        order: 2
      });
      
      // Gold stat (order: 3)
      widgets += bdWidget('demo-gold', {
        type: 'stat',
        label: 'Gold',
        value: '1,250',
        color: '#fbbf24',
        order: 3
      });
      
      // Status text (order: 4)
      widgets += bdWidget('demo-status', {
        type: 'text',
        text: '⚔️ In Combat',
        style: { color: '#f472b6', fontWeight: 'bold' },
        order: 4
      });
      
      // Character panel (order: 5)
      widgets += bdWidget('demo-panel', {
        type: 'panel',
        title: 'Character',
        items: [
          { label: 'Level', value: '12', color: '#a855f7' },
          { label: 'Class', value: 'Warrior', color: '#60a5fa' },
          { label: 'XP', value: '4,500/5,000', color: '#22c55e' }
        ],
        order: 5
      });
      
      return { 
        output: '\\n🎮 Demo widgets created! (HP, MP, Gold, Status, Character) - ordered 1-5', 
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
  
  // Always show turn counter widget (order: 0 to appear first)
  widgets += bdWidget('console-turn', {
    type: 'stat',
    label: 'Turn',
    value: info.actionCount || 0,
    color: '#94a3b8',
    order: 0
  });
  
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
    description: 'Displays all widget types for visual testing and design preview.',
    purpose: 'A simple script that creates one of every widget type. Perfect for testing styles and layouts.',
    requiresExtension: 'BetterDungeon',
    files: {
      library: `// ============================================
// LIBRARY - Widget Showcase
// ============================================
// Creates all widget types for visual testing.

function bdWidget(id, cfg) {
  return \`[[BD:\${JSON.stringify({ type: 'widget', widgetId: id, action: 'create', config: cfg })}:BD]]\`;
}`,
      context: `// Strip protocol messages from AI context
const modifier = (text) => {
  return { text: text.replace(/\\[\\[BD:[\\s\\S]*?:BD\\]\\]/g, '') };
};
modifier(text);`,
      output: `// ============================================
// OUTPUT - Create All Widget Types (Multi-Position)
// ============================================

const modifier = (text) => {
  let w = '';
  
  // ========== TOP POSITION (Status Bar) ==========
  
  // Stats
  w += bdWidget('demo-hp', { type: 'stat', label: 'HP', value: '85/100', color: '#ef4444', position: 'top', order: 1 });
  w += bdWidget('demo-mp', { type: 'stat', label: 'MP', value: '42/60', color: '#3b82f6', position: 'top', order: 2 });
  w += bdWidget('demo-gold', { type: 'stat', label: '💰', value: '1,250', color: '#fbbf24', position: 'top', order: 3 });
  
  // Bars
  w += bdWidget('demo-health-bar', { type: 'bar', label: 'Health', value: 85, max: 100, color: '#22c55e', position: 'top', order: 4 });
  w += bdWidget('demo-mana-bar', { type: 'bar', label: 'Mana', value: 42, max: 60, color: '#8b5cf6', position: 'top', order: 5 });
  w += bdWidget('demo-xp-bar', { type: 'bar', label: 'XP', value: 750, max: 1000, color: '#06b6d4', position: 'top', order: 6 });
  
  // Badges (status effects)
  w += bdWidget('demo-badge-poison', { type: 'badge', text: 'Poisoned', icon: '☠️', color: '#a855f7', variant: 'subtle', position: 'top', order: 7 });
  w += bdWidget('demo-badge-shield', { type: 'badge', text: 'Shielded', icon: '🛡️', color: '#3b82f6', variant: 'solid', position: 'top', order: 8 });
  w += bdWidget('demo-badge-fire', { type: 'badge', text: 'Burning', icon: '🔥', color: '#f97316', variant: 'outline', position: 'top', order: 9 });
  
  // Counters
  w += bdWidget('demo-counter-up', { type: 'counter', icon: '⚔️', value: 24, delta: 3, color: '#60a5fa', position: 'top', order: 10 });
  w += bdWidget('demo-counter-down', { type: 'counter', icon: '💔', value: 12, delta: -5, color: '#f472b6', position: 'top', order: 11 });
  
  // Icons
  w += bdWidget('demo-icon-heart', { type: 'icon', icon: '❤️', color: '#ef4444', tooltip: 'Health', position: 'top', order: 12 });
  w += bdWidget('demo-icon-star', { type: 'icon', icon: '⭐', color: '#fbbf24', tooltip: 'Reputation', position: 'top', order: 13 });
  w += bdWidget('demo-icon-moon', { type: 'icon', icon: '🌙', color: '#94a3b8', tooltip: 'Night', position: 'top', order: 14 });
  
  // ========== LEFT POSITION (Character Info) ==========
  
  w += bdWidget('demo-panel', { 
    type: 'panel', 
    title: 'Character', 
    position: 'left',
    items: [
      { label: 'Name', value: 'Adventurer', color: '#f472b6' },
      { label: 'Class', value: 'Warrior', color: '#60a5fa' },
      { label: 'Level', value: '12', color: '#a855f7' }
    ],
    order: 1 
  });
  
  // ========== RIGHT POSITION (Inventory/Quest) ==========
  
  w += bdWidget('demo-text', { type: 'text', text: '⚡ Quest: Find the Artifact', style: { color: '#fbbf24', fontWeight: '500' }, position: 'right', order: 1 });
  
  w += bdWidget('demo-divider', { type: 'divider', label: 'Items', color: '#60a5fa', position: 'right', order: 2 });
  
  w += bdWidget('demo-list', { 
    type: 'list', 
    title: 'Inventory', 
    position: 'right',
    items: [
      { icon: '🗡️', text: 'Iron Sword', color: '#60a5fa' },
      { icon: '🧪', text: 'Potion x3', color: '#22c55e' },
      { icon: '🔑', text: 'Rusty Key', color: '#fbbf24' },
      { icon: '📜', text: 'Map' }
    ],
    order: 3 
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
