// Gate parser for add command validation
(function parseGate() {
    try {
        if (!state?.vars) return;

        // Check if ANY kind of gate is currently pending (wallet, inventory, or legacy flag)
        const pending = !!(state.vars.awaitingGate || state.vars.awaitingMoneyGate || state.vars.awaitingInvGate);
        if (!pending) return;

        // Look for a single-line verdict "APPROVE" or "REJECT" in the model's output
        const rxVerdict = /^\s*(APPROVE|REJECT)\s*$/im;
        const m = String(text || "").match(rxVerdict);
        if (!m) return;

        // Store the verdict and mark the unified flag resolved.
        state.vars.lastGateVerdict = m[1].toUpperCase();
        state.vars.awaitingGate = false;

        // Clear the temporary system prompt from frontMemory once verdict captured.
        if (state?.memory) state.memory.frontMemory = "";
    } catch { }
})();

const modifier = (text) => {
    // Ensure all state and story cards are present each turn.
    ensureInventoryState();
    ensureInventoryCard();
    ensureCustomCommandCard();

    // --- finalize gated operations depending on kind of gate (wallet vs inv) ---
    try {
        const kind = state?.vars?.gateKind || null;
        const verdict = state?.vars?.lastGateVerdict || null;

        if (kind && verdict) {
            // Wallet gate finalization
            if (kind === "wallet") {
                const p = state?.vars?.pendingCollect || null;
                if (p && p.currency && p.amount > 0) {
                    if (verdict === "APPROVE") {
                        // Add currency to wallet
                        const r = addToWallet(p.currency, p.amount);
                        if (r?.ok && typeof rebuildInventoryCardFromState === "function") {
                            rebuildInventoryCardFromState();
                        }
                        // Log and prepend success message
                        recordInventoryAction("wallet_add", p.currency, p.amount, "collect");
                        const msg = `You collected ${p.amount} ${p.currency}.`;
                        text = msg + (text ? `\n\n${text}` : "");
                    } else {
                        // Rejected: prepend failure message
                        const msg = `You failed to collect ${p.amount} ${p.currency}.`;
                        text = msg + (text ? `\n\n${text}` : "");
                    }
                }
                // Clean up pending state and clear gate
                state.vars.pendingCollect = null;
                removeGateText();
                clearUnifiedGate()

                // Inventory gate finalization
            } else if (kind === "inv") {
                const p = state?.vars?.pendingAdd || null;
                if (p && p.itemName) {
                    if (verdict === "APPROVE") {
                        // Add items to inventory (capped)
                        const r = addToInventoryCapped(p.itemName, p.amount);
                        if (r.added > 0 && typeof rebuildInventoryCardFromState === "function") {
                            rebuildInventoryCardFromState();
                        }
                        if (r.added > 0) {
                            recordInventoryAction("add", p.itemName, r.added, p.cmdName);
                        }
                        // Build success message
                        let msg = (r.added === 1)
                            ? `You ${p.verb || "add"} ${p.itemName}, adding it to your inventory.`
                            : `You ${p.verb || "add"} ${r.added} × ${p.itemName}, adding them to your inventory.`;
                        if (r.blocked > 0) msg += ` (inventory cap ${r.cap}; ${r.blocked} couldn’t fit)`;
                        text = msg + (text ? `\n\n${text}` : "");
                    } else {
                        // Rejected: prepend failure message
                        const failVerb = p.verb || "add";
                        const fail = `You fail to ${failVerb} ${p.itemName} × ${p.amount} to your inventory.`;
                        text = fail + (text ? `\n\n${text}` : "");
                    }
                }
                // Clean up pending state and clear gate
                state.vars.pendingAdd = null;
                clearUnifiedGate()
            }
        }
    } catch { }

    // Strip leftover "APPROVE"/"REJECT" lines from the visible output.
    text = String(text || "").replace(/^\s*(APPROVE|REJECT)\s*$/gim, "").trim();

    // --- intro suppression ---
    // On very first turn, blank out the model's intro output once.
    if (info.actionCount === 0 && !state.suppressedIntro) {
        text = '';
        state.suppressedIntro = true;
    }

    return { text };
};

modifier(text);