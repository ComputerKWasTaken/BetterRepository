// On first load, make sure cards exist in storyCards.
(function initCardsOnce() {
    if (typeof ensureInventoryCard === "function") ensureInventoryCard();
    if (typeof ensureCustomCommandCard === "function") ensureCustomCommandCard();
})();

const modifier = (text) => {

    // --- Command routing (input handler) ---
    const reply =
        handleCollectCommand(text) || // /collect (adds currency to wallet)
        handleCustomCommand(text) || // dynamic commands from "Custom Commands" card
        handleDropCommand(text) || // /drop (removes items from inventory)
        handleGiveCommand(text) || // /give (gives items to target)
        handleTakeCommand(text) || // /take (adds items to inventory)
        handleThrowCommand(text) || // /throw (throw an item from your inventory)
        handleUndoCommand(text) || // /undo (undo an inventory/wallet action)
        handleUseCommand(text);       // /use (consumes an item to perform an action)
    if (reply) return { text: reply };

    return { text }
}

// Don't modify this part
modifier(text)