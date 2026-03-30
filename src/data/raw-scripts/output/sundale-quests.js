// OUTPUT MODIFIER

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

modifier(text)