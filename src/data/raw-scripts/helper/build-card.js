function buildCard(title = "", entry = "", type = "character", 
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
}