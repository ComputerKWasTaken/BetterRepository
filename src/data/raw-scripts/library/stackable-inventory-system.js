// ===== Stackable Inventory System & Wallet (SIS) v 0.6 =====
// script by bottledfox

// ---------------------------------------------------------------------------
// 0) Constants
// ---------------------------------------------------------------------------

const INVENTORY_CARD_NAME = "Inventory";
const INVENTORY_HEADER = "## Inventory";
const WALLET_HEADER = "## Wallet";
const CUSTOM_COMMAND_CARD_NAME = "Custom Commands";
const CUSTOM_COMMAND_HEADER = "## Custom Commands";
const INVENTORY_ITEM_CAP = 99;

// ---------------------------------------------------------------------------
// 1) Inventory State & Card
// ---------------------------------------------------------------------------

// State guard: ensure state.vars.inventory exists and is an array
function ensureInventoryState() {
    if (!state.vars) state.vars = {};
    if (!Array.isArray(state.vars.inventory)) state.vars.inventory = [];
    return state.vars.inventory;
}

// Story-card guard: ensure a single "Inventory" card exists in the global storyCards
function ensureInventoryCard() {
    if (!Array.isArray(storyCards)) storyCards = []; // AID global; guard it.
    let card = storyCards.find(c => c?.title === INVENTORY_CARD_NAME);
    if (!card) {
        card = {
            type: "list",
            title: INVENTORY_CARD_NAME,
            keys: INVENTORY_CARD_NAME, // matches your other cards' pattern
            description: "",
            entry: `${WALLET_HEADER}\n- (empty)\n\n${INVENTORY_HEADER}\n- (empty)\n`
        };
        storyCards.push(card);
    }
    return card;
}

function rebuildInventoryCardFromState() {
    const inv = ensureInventoryState();
    const card = ensureInventoryCard();

    // --- wallet (always render first) ---
    const walletLines = renderWalletLines();
    let walletBlock = `${WALLET_HEADER}\n${walletLines.join("\n")}\n`;

    // --- inventory list (unchanged logic, just moved under wallet) ---
    if (!inv.length) {
        card.entry = `${walletBlock}\n${INVENTORY_HEADER}\n- (empty)\n`;
        return card;
    }

    const counts = Object.create(null);
    for (const s of inv) {
        const name = String(s || "").trim();
        if (!name) continue;
        counts[name] = (counts[name] || 0) + 1;
    }

    const lines = Object.keys(counts)
        .sort((a, b) => a.localeCompare(b))
        .map(name => `- ${name} x ${counts[name]}`);

    card.entry = `${walletBlock}\n${INVENTORY_HEADER}\n${lines.join("\n")}\n`;
    return card;
}

// Case-insensitive count of a given item name in inventory
function countInInventory(name) {
    if (!state.vars) state.vars = {};
    if (!Array.isArray(state.vars.inventory)) state.vars.inventory = [];
    const k = name.toLowerCase();
    return state.vars.inventory.filter(s => String(s).toLowerCase() === k).length;
}

// Remove up to n copies of a given name (case-insensitive), scanning from the end
function removeFromInventory(name, n) {
    if (!state.vars) state.vars = {};
    if (!Array.isArray(state.vars.inventory)) state.vars.inventory = [];
    let remaining = n;
    for (let i = state.vars.inventory.length - 1; i >= 0 && remaining > 0; i--) {
        if (String(state.vars.inventory[i]).toLowerCase() === name.toLowerCase()) {
            state.vars.inventory.splice(i, 1);
            remaining--;
        }
    }
    return n - remaining;
}

// Add up to `amount` copies without exceeding the cap.
function addToInventoryCapped(name, amount, cap = INVENTORY_ITEM_CAP) {
    ensureInventoryState();
    const have = countInInventory(name);                 // case-insensitive
    const want = Math.max(0, amount | 0);
    const room = Math.max(0, cap - have);
    const toAdd = Math.min(want, room);

    for (let i = 0; i < toAdd; i++) state.vars.inventory.push(name);
    return { added: toAdd, blocked: want - toAdd, newCount: have + toAdd, cap };
}

// ---------------------------------------------------------------------------
// 2) Wallet State + Card Rendering
// ---------------------------------------------------------------------------

function ensureWalletState() {
    if (!state.vars) state.vars = {};
    if (!state.vars.wallet || typeof state.vars.wallet !== "object") {
        state.vars.wallet = Object.create(null);
    }
    return state.vars.wallet;
}

function walletAmount(currency) {
    const w = ensureWalletState();
    const key = String(currency || "").trim();
    return Number(w[key] || 0);
}

function addToWallet(currency, amount) {
    const w = ensureWalletState();
    const key = String(currency || "").trim();
    const delta = Number(amount || 0);
    if (!key || !Number.isFinite(delta)) return { ok: false, newAmount: walletAmount(currency) };
    const next = (w[key] || 0) + delta;
    w[key] = next;
    return { ok: true, newAmount: next };
}

function renderWalletLines() {
    const w = ensureWalletState();
    const keys = Object.keys(w).filter(k => Number.isFinite(w[k]) && w[k] !== 0);
    if (keys.length === 0) return [`- (empty)`];
    // stable alpha sort; feel free to swap to a priority list later
    keys.sort((a, b) => a.localeCompare(b));
    return keys.map(k => `- ${k}: ${w[k]}`);
}

// ---------------------------------------------------------------------------
// 3) Parsing Helpers
// ---------------------------------------------------------------------------

// Escape a literal for safe insertion into a RegExp
function rxEscape(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// Try to match the name of an inventory item at the start of the args
function matchItem(args, invOverride) {
    const argsStr = String(args || "").trim();
    if (!argsStr) return null;

    const inv = Array.isArray(invOverride)
        ? invOverride
        : (state?.vars && Array.isArray(state.vars.inventory) ? state.vars.inventory : []);

    if (!inv.length) return null;

    // Build unique canonical names
    const seen = new Set();
    const uniq = [];
    for (const s of inv) {
        const name = String(s || "").trim();
        if (!name) continue;
        const key = name.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            uniq.push(name);
        }
    }

    // Prefer longest to avoid prefix-capture collisions
    uniq.sort((a, b) => b.length - a.length);

    for (const name of uniq) {
        const rx = new RegExp("^\\s*" + rxEscape(name) + "(?=[\\s,.;:!?)]|$)", "i");
        const m = argsStr.match(rx);
        if (m) {
            return {
                itemName: name,
                remainder: argsStr.slice(m[0].length).trim()
            };
        }
    }
    return null;
}
// Normalize AID "You ..." prefixes and anything before the first slash.
function normalizeCommandText(text) {
    let t = String(text || "");

    // Drop leading "> You ..." narrations and punctuation
    t = t.replace(/^\s*>\s*you\b[:\-]?\s*/i, "");
    t = t.replace(/^[^/]*?(?=\/)/, "");
    t = t.replace(/[.,]/g, "");
    t = t.replace(/[!?]+$/, "");

    return t.trim();
}

// Extract "/name" and the rest as args
function parseSlashCommand(text) {
    const t = normalizeCommandText(text);
    const m = t.match(/^\/([a-z][a-z0-9_]*)\b(?:\s+(.*))?$/i);
    if (!m) return null;
    return { name: m[1].toLowerCase(), args: (m[2] || "").trim() };
}

// Split "a, b, c" into parts; trims whitespace and strips trailing ASCII periods
function parseCSVArgs(argStr) {
    if (!argStr) return [];
    return argStr.split(",").map(s => s.trim().replace(/\.+$/, "")).filter(Boolean);
}

// Try to match a wallet currency name at the start of args
function matchWallet(args) {
    const tokens = String(args || "").trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return null;

    const maybeName = tokens[0];
    if (walletAmount(maybeName) > 0) {
        return {
            itemName: maybeName,
            remainder: tokens.slice(1).join(" ")
        };
    }
    return null;
}

function parseAmount(argStr, defaultAmount = 1) {
    const tokens = String(argStr || "").trim().split(/\s+/).filter(Boolean);
    if (tokens.length && /^\d+$/.test(tokens[0])) {
        const amt = parseInt(tokens[0], 10);
        return { amount: amt, remainder: tokens.slice(1).join(" ") };
    }
    return { amount: defaultAmount, remainder: argStr };
}

function parseItemAndAmount(args, defaultAmount = 1) {
    let amount = defaultAmount;
    let itemName = null;
    let tail = "";

    const tokens = String(args || "").trim().split(/\s+/);

    if (/^\d+$/.test(tokens[0])) {
        // Case A: amount first
        amount = parseInt(tokens[0], 10);
        const rest = tokens.slice(1).join(" ");
        let match = matchItem(rest) || matchWallet(rest);
        if (!match) return null;
        itemName = match.itemName;

        const amtParse = parseAmount(match.remainder, amount);
        amount = amtParse.amount;
        tail = parseTail(amtParse.remainder);
    } else {
        // Case B: item first
        let match = matchItem(args) || matchWallet(args);
        if (!match) return null;
        itemName = match.itemName;

        const amtParse = parseAmount(match.remainder, 1);
        amount = amtParse.amount;
        tail = parseTail(amtParse.remainder);
    }

    return { itemName, amount, tail };
}

// Just turn leftover string into a tail (leading space if nonempty)
function parseTail(argStr) {
    const t = String(argStr || "").trim();
    return t ? ` ${t}` : "";
}

function parseItemName(argStr) {
    return String(argStr || "").trim();
}

// ---------------------------------------------------------------------------
// 4) Core Command Handlers
// ---------------------------------------------------------------------------

// /take command
function handleTakeCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "take") return null;

    const args = String(cmd.args || "").trim();
    if (!args) return "⚠️ Format: /take [amount] [itemName]";

    let amount = 1;
    let itemName = "";

    const tokens = args.split(/\s+/);

    if (/^\d+$/.test(tokens[0])) {
        // Case A: amount first
        amount = parseInt(tokens[0], 10);
        itemName = parseItemName(tokens.slice(1).join(" "));
    } else {
        // Case B: item first (defaults to 1)
        itemName = parseItemName(args);
    }

    if (!itemName || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Format: /take [amount] [itemName]";
    }

    ensureInventoryState();

    // Gate like custom adds
    if (state?.vars?.awaitingInvGate) {
        return "⚠️ An inventory check is already in progress. Try again next turn.";
    }
    if (!state.vars) state.vars = {};
    state.vars.pendingAdd = {
        itemName,
        amount,
        verb: "take",
        cmdName: "take"
    };

    if (typeof startInventoryGate === "function") startInventoryGate();

    return amount === 1
        ? `You attempt to take ${itemName}...`
        : `You attempt to take ${amount} × ${itemName}...`;
}

// /use command
function handleUseCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "use") return null;

    const match = (typeof matchItem === "function") ? matchItem(cmd.args) : null;
    if (!match) return "⚠️ Couldn’t find that item in your inventory.";

    const { itemName, remainder } = match;

    const have = countInInventory(itemName);
    if (have < 1) return `⚠️ You don't have any ${itemName}.`;

    removeFromInventory(itemName, 1); // consume one item
    if (typeof rebuildInventoryCardFromState === "function") rebuildInventoryCardFromState();

    const tail = remainder ? ` ${remainder}` : "";
    return `You use ${itemName}${tail}`;
}

// /drop command
function handleDropCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "drop") return null;

    const args = String(cmd.args || "").trim();
    if (!args) return "⚠️ Format: /drop [amount] [itemName] on [location (optional)]";

    const parsed = parseItemAndAmount(args, 1);
    if (!parsed) return "⚠️ Couldn’t find that item or currency.";
    const { itemName, amount, tail } = parsed;

    if (!itemName || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Amount must be a positive integer.";
    }

    // --- Wallet branch ---
    if (walletAmount(itemName) > 0) {
        if (walletAmount(itemName) < amount) {
            return `⚠️ You only have ${walletAmount(itemName)} ${itemName}.`;
        }
        addToWallet(itemName, -amount);
        recordInventoryAction("wallet_remove", itemName, amount, "drop");
        if (typeof rebuildInventoryCardFromState === "function") rebuildInventoryCardFromState();
        return amount === 1
            ? `You drop 1 ${itemName}${tail}.`
            : `You drop ${amount} ${itemName}${tail}.`;
    }

    // --- Inventory branch ---
    const have = countInInventory(itemName);
    if (have < amount) {
        return `⚠️ You only have ${have} × ${itemName}.`;
    }

    removeFromInventory(itemName, amount);
    recordInventoryAction("remove", itemName, amount, "drop")
    if (typeof rebuildInventoryCardFromState === "function") rebuildInventoryCardFromState();

    return amount === 1
        ? `You drop ${itemName}${tail}.`
        : `You drop ${amount} × ${itemName}${tail}.`;
}

// /give command
function handleGiveCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "give") return null;

    const args = String(cmd.args || "").trim();
    if (!args) return "⚠️ Format: /give [amount] [itemName] to [target]";

    const parsed = parseItemAndAmount(args, 1);
    if (!parsed) return "⚠️ Couldn’t find that item or currency.";

    const { itemName, amount, tail } = parsed;

    if (!itemName || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Amount must be a positive integer.";
    }

    // --- Wallet branch ---
    if (walletAmount(itemName) > 0) {
        if (walletAmount(itemName) < amount) {
            return `⚠️ You only have ${walletAmount(itemName)} ${itemName}.`;
        }
        addToWallet(itemName, -amount);
        recordInventoryAction("wallet_remove", itemName, amount, "give");
        if (typeof rebuildInventoryCardFromState === "function") {
            rebuildInventoryCardFromState();
        }
        return amount === 1
            ? `You give 1 ${itemName}${tail}.`
            : `You give ${amount} ${itemName}${tail}.`;
    }

    // --- Inventory branch ---
    const haveItems = countInInventory(itemName);
    if (haveItems < amount) {
        return `⚠️ You only have ${haveItems} × ${itemName}.`;
    }

    removeFromInventory(itemName, amount);
    recordInventoryAction("remove", itemName, amount, "give");
    if (typeof rebuildInventoryCardFromState === "function") {
        rebuildInventoryCardFromState();
    }
    return amount === 1
        ? `You give ${itemName}${tail}.`
        : `You give ${amount} × ${itemName}${tail}.`;
}

// /throw command
function handleThrowCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "throw") return null;

    const args = String(cmd.args || "").trim();
    if (!args) return "⚠️ Format: /throw [amount] itemName at [target]";

    const parsed = parseItemAndAmount(args, 1);
    if (!parsed) return "⚠️ Couldn’t find that item or currency.";
    const { itemName, amount, tail } = parsed;

    if (!itemName || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Amount must be a positive integer.";
    }

    // --- Wallet branch ---
    if (walletAmount(itemName) > 0) {
        if (walletAmount(itemName) < amount) {
            return `⚠️ You only have ${walletAmount(itemName)} ${itemName}.`;
        }
        addToWallet(itemName, -amount);
        recordInventoryAction("wallet_remove", itemName, amount, "drop");
        if (typeof rebuildInventoryCardFromState === "function") rebuildInventoryCardFromState();
        return amount === 1
            ? `You throw 1 ${itemName}${tail}.`
            : `You throw ${amount} ${itemName}${tail}.`;
    }

    // --- Inventory branch ---
    const have = countInInventory(itemName);
    if (have < amount) {
        return `⚠️ You only have ${have} × ${itemName}.`;
    }

    removeFromInventory(itemName, amount);
    recordInventoryAction("remove", itemName, amount, "drop");
    if (typeof rebuildInventoryCardFromState === "function") rebuildInventoryCardFromState();

    return amount === 1
        ? `You throw ${itemName}${tail}.`
        : `You throw ${amount} × ${itemName}${tail}.`;
}

// /collect command
function handleCollectCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "collect") return null;

    if (!state.vars) state.vars = {};
    if (state.vars.awaitingGate || state.vars.awaitingMoneyGate)
        return "ERROR: Action is already pending.";

    const args = String(cmd.args || "").trim();
    if (!args) return "⚠️ Format: /collect [amount] [currency]";

    let amount = 1;
    let currency = "";

    const tokens = args.split(/\s+/);

    if (/^\d+$/.test(tokens[0])) {
        // Case A: amount first
        amount = parseInt(tokens[0], 10);
        currency = parseItemName(tokens.slice(1).join(" "));
    } else {
        // Case B: currency first
        currency = parseItemName(args);
    }

    if (!currency || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Format: /collect [amount] [currency]";
    }

    state.vars.pendingCollect = { currency, amount };

    // Kick off wallet gate
    startMoneyGate();
    return `You attempt to collect ${amount} ${currency}...`;
}

// /undo command
function handleUndoCommand(text) {
    const cmd = parseSlashCommand(text);
    if (!cmd || cmd.name !== "undo") return null;

    if (!state?.vars?.invHistory || !state.vars.invHistory.length) {
        return "⚠️ Nothing to undo.";
    }

    const last = state.vars.invHistory.pop();
    let msg = "";

    switch (last.kind) {
        case "add":
            removeFromInventory(last.itemName, last.amount);
            msg = `Undo: added ${last.amount} × ${last.itemName}.`;
            break;
        case "remove":
            addToInventoryCapped(last.itemName, last.amount);
            msg = `Undo: removed ${last.amount} × ${last.itemName}.`;
            break;
        case "wallet_add":
            addToWallet(last.itemName, -last.amount);
            msg = `Undo: collected ${last.amount} ${last.itemName}.`;
            break;
        case "wallet_remove":
            addToWallet(last.itemName, last.amount);
            msg = `Undo: spent ${last.amount} ${last.itemName}.`;
            break;
    }

    if (typeof rebuildInventoryCardFromState === "function") {
        rebuildInventoryCardFromState();
    }

    return msg;
}

// ---------------------------------------------------------------------------
// 5) Custom Commands System
// ---------------------------------------------------------------------------

function ensureCustomCommandCard() {
    if (!Array.isArray(storyCards)) storyCards = []; // AID global; guard it.
    let card = storyCards.find(c => c?.title === CUSTOM_COMMAND_CARD_NAME);
    if (!card) {
        card = {
            type: "list",
            title: CUSTOM_COMMAND_CARD_NAME,
            keys: CUSTOM_COMMAND_CARD_NAME,
            description: "",
            entry:
                `${CUSTOM_COMMAND_HEADER}
  Name: /example
  Type: add|remove
  Multiples: true|false
  `
        };
        storyCards.push(card);
    }
    return card;
}

// --- Read "Custom Commands" card config
function readCustomCommandConfigs() {
    if (!Array.isArray(storyCards)) return [];
    const card = storyCards.find(c => c?.title === "Custom Commands");
    if (!card || !card.entry) {
        if (state?.vars) state.vars.customCommands = [];
        return [];
    }

    const lines = String(card.entry).split(/\r?\n/);
    const out = [];
    let cur = null;

    for (const raw of lines) {
        const line = String(raw || "").trim();
        if (!line) continue;

        let m;
        if ((m = line.match(/^Name:\s*\/([a-z][a-z0-9_]*)$/i))) {
            if (cur && cur.name && cur.type) {
                if (typeof cur.multiples !== "boolean") cur.multiples = false;
                out.push(cur);
            }
            const raw = m[1];                    // preserve as typed (no slash)
            cur = { name: raw.toLowerCase(), label: raw, type: null, multiples: false };
            continue;
        }
        if (!cur) continue;

        if ((m = line.match(/^Type:\s*(add|remove)$/i))) {
            cur.type = m[1].toLowerCase(); continue;
        }
        if ((m = line.match(/^Multiples:\s*(true|false)$/i))) {
            cur.multiples = /true/i.test(m[1]); continue;
        }
    }
    if (cur && cur.name && cur.type) {
        if (typeof cur.multiples !== "boolean") cur.multiples = false;
        out.push(cur);
    }

    if (!state.vars) state.vars = {};
    state.vars.customCommands = out;       // <-- store all parsed configs
    return out;
}

// --- Dynamic custom commands
function handleCustomCommand(text) {
    const cfgs = readCustomCommandConfigs();
    if (!cfgs.length) return null;

    const cmd = parseSlashCommand(text);
    if (!cmd) return null;

    // If duplicate names exist, prefer the LAST definition in the card
    const cfg = [...cfgs].reverse().find(c => c.name === cmd.name);
    if (!cfg) return null; // not a custom command; let other handlers try

    // Parse args with modern parser (supports amount-first, item-first, wallet)
    const parsed = parseItemAndAmount(cmd.args, 1);
    if (!parsed) {
        return cfg.multiples
            ? `⚠️ Format: /${cfg.name} [amount] itemName`
            : `⚠️ Format: /${cfg.name} itemName`;
    }

    const { itemName, amount, tail } = parsed;
    if (!itemName || !Number.isFinite(amount) || amount <= 0) {
        return "⚠️ Amount must be a positive integer.";
    }

    ensureInventoryState();
    const verb = cfg.label || cfg.name; // e.g. "stash", "donate"

    // ADD branch
    if (cfg.type === "add") {
        if (state?.vars?.awaitingGate) {
            return "⚠️ An inventory check is already in progress. Try again next turn.";
        }
        if (!state.vars) state.vars = {};
        state.vars.pendingAdd = {
            itemName,
            amount,
            verb,
            cmdName: cfg.name
        };

        if (typeof startInventoryGate === "function") startInventoryGate();

        return amount === 1
            ? `You attempt to ${verb} ${itemName}${tail}...`
            : `You attempt to ${verb} ${amount} × ${itemName}${tail}...`;
    }

    // REMOVE branch
    // --- Wallet branch ---
    if (walletAmount(itemName) > 0) {
        if (walletAmount(itemName) < amount) {
            return `⚠️ You only have ${walletAmount(itemName)} ${itemName}.`;
        }
        addToWallet(itemName, -amount);
        recordInventoryAction("wallet_remove", itemName, amount, cfg.name);
        if (typeof rebuildInventoryCardFromState === "function") {
            rebuildInventoryCardFromState();
        }
        return amount === 1
            ? `You ${verb} 1 ${itemName}${tail}`
            : `You ${verb} ${amount} ${itemName}${tail}`;
    }

    // --- Inventory branch ---
    const have = countInInventory(itemName);
    if (have < amount) {
        return `⚠️ You only have ${have} × ${itemName}.`;
    }

    removeFromInventory(itemName, amount);
    recordInventoryAction("remove", itemName, amount, cfg.name);
    if (typeof rebuildInventoryCardFromState === "function") {
        rebuildInventoryCardFromState();
    }

    return amount === 1
        ? `You ${verb} ${itemName}${tail}, removing it from your inventory.`
        : `You ${verb} ${amount} × ${itemName}${tail}, removing them from your inventory.`;
}

// ---------------------------------------------------------------------------
// 6) Gates (Validation Prompts)
// ---------------------------------------------------------------------------

// Start a 1-turn inventory gate via frontMemory (context-only)
function startInventoryGate() {
    const prompt = `
  <SYSTEM> 
  You are the rules arbiter for inventory changes. Before narrating, quickly verify the requested change(s) against story context.

  Approve only if the item(s) are:
  - Explicitly obtainable
  - Reasonable in size and quantity
  - Not a living creature

  Output exactly one line (verbatim keys):
  APPROVE or REJECT
  Then continue the story.
  </SYSTEM>`.trim();

    if (!state.vars) state.vars = {};
    state.vars.gateKind = "inv";
    state.vars.awaitingGate = true;
    state.vars.lastGateVerdict = null;
    state.memory.frontMemory = prompt;
}

function startMoneyGate() {
    const prompt = `
  <SYSTEM>
  You are the rules arbiter for wallet transactions. Before narrating, quickly verify the requested change(s) against story context.

  Approve only if the item(s) are:
  - Explicitly obtainable
  - Reasonable in quantity
  - Not a living creature
  - Plausibly a currency in this story's setting 

  Output exactly one line (verbatim keys):
  APPROVE or REJECT
  Then continue the story.
  </SYSTEM>`.trim();

    if (!state.vars) state.vars = {};
    state.vars.gateKind = "wallet";
    state.vars.awaitingGate = true;
    state.vars.lastGateVerdict = null;
    state.memory.frontMemory = prompt;
}

function clearUnifiedGate() {
    if (!state.vars) state.vars = {};
    state.vars.gateKind = null;
    state.vars.lastGateVerdict = null;
    state.vars.awaitingGate = false;
}

// ---------------------------------------------------------------------------
// 7) Action Logging
// ---------------------------------------------------------------------------

function recordInventoryAction(kind, itemName, amount, source = null) {
    if (!state?.vars) state.vars = {};
    if (!Array.isArray(state.vars.invHistory)) state.vars.invHistory = [];

    // Keep only a few records to prevent memory bloat
    if (state.vars.invHistory.length > 20) state.vars.invHistory.shift();

    state.vars.invHistory.push({
        kind,       // "add" | "remove" | "wallet_add" | "wallet_remove"
        itemName,
        amount,
        source,     // optional: command name like "take" or "drop"
        ts: Date.now()
    });
}