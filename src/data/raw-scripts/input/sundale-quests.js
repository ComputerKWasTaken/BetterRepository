// INPUT MODIFIER

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

modifier(text)