/**
 * FoxTweaks for AI Dungeon
 * A modular plugin system for enhancing AI Dungeon gameplay
 *
 * Modules:
 * - DiceRoll: Automatic dice rolling for action attempts
 * - Paragraph: Formatting and indentation control
 * - Redundancy: Detection and merging of redundant AI outputs
 * - BetterYou: Pronoun replacement for better narrative flow
 * - Random Names: Replace tropey names in AI output with generated names
 *
 * Usage:
 *   Input modifier:   text = FoxTweaks.Hooks.onInput(text);
 *   Context modifier: text = FoxTweaks.Hooks.onContext(text);
 *   Output modifier:  text = FoxTweaks.Hooks.onOutput(text);
 */
const FoxTweaks = (() => {
  function parseConfigLine(line) {
    let commentIdx = line.indexOf("#"),
      hasComment = commentIdx >= 0,
      effectiveLine = hasComment ? line.substring(0, commentIdx) : line,
      comment = hasComment ? line.substring(commentIdx) : "",
      trimmed = effectiveLine.trim(),
      colonIdx = trimmed.indexOf(":");
    if (colonIdx === -1)
      return { key: "", value: "", comment, hasComment, isValid: !1 };
    let key = trimmed.substring(0, colonIdx).trim(),
      value = trimmed.substring(colonIdx + 1).trim();
    return { key, value, comment, hasComment, isValid: !0 };
  }
  function rebuildConfigLine(key, value, comment, hasComment) {
    let base = `${key}: ${value}`;
    if (hasComment) return base + "  " + comment;
    return base;
  }
  function getIndentDepth(line) {
    let spaces = 0;
    for (let i = 0; i < line.length; i++)
      if (line[i] === " ") spaces++;
      else if (line[i] === "\t") spaces += 2;
      else break;
    if (spaces === 0) return 0;
    if (spaces <= 2) return 1;
    return 2;
  }
  function parseConfig(description, modules) {
    let lines = description.split(`
`),
      context = {
        currentSection: null,
        currentModule: null,
        inReplacements: !1,
        rawConfig: {},
      };
    for (let module of modules) context.rawConfig[module.name] = {};
    let currentNestedKey = null,
      currentNestedObject = null,
      currentSubKey = null,
      currentSubObject = null;
    for (let line of lines) {
      let trimmed = line.trim();
      if (trimmed.startsWith("---") && trimmed.endsWith("---")) {
        let sectionName = trimmed.replace(/---/g, "").trim().toLowerCase();
        ((context.currentModule = null),
          (context.inReplacements = !1),
          (currentNestedKey = null),
          (currentNestedObject = null),
          (currentSubKey = null),
          (currentSubObject = null));
        let normalizedSectionName = sectionName.replace(/\s+/g, "");
        for (let module of modules)
          if (
            normalizedSectionName === module.name.toLowerCase() ||
            (module.name === "redundancy" && normalizedSectionName === "dedup")
          ) {
            ((context.currentSection = module.name),
              (context.currentModule = module));
            break;
          }
        continue;
      }
      let parsed = parseConfigLine(line);
      if (!parsed.isValid && trimmed && !trimmed.startsWith("#")) continue;
      if (!parsed.isValid) continue;
      if (!context.currentSection || !context.currentModule) continue;
      let sectionConfig = context.rawConfig[context.currentSection];
      if (!sectionConfig) continue;
      let indentDepth = getIndentDepth(line),
        lowerKey = parsed.key.toLowerCase();
      if (indentDepth === 0)
        if (
          ((currentNestedKey = null),
          (currentNestedObject = null),
          (currentSubKey = null),
          (currentSubObject = null),
          parsed.value === "" || parsed.value.trim() === "")
        )
          ((currentNestedKey = lowerKey),
            (currentNestedObject = {}),
            (sectionConfig[lowerKey] = currentNestedObject));
        else sectionConfig[lowerKey] = parsed.value;
      else if (indentDepth === 1) {
        if (
          ((currentSubKey = null),
          (currentSubObject = null),
          currentNestedObject && currentNestedKey)
        )
          if (parsed.value === "" || parsed.value.trim() === "")
            ((currentSubKey = lowerKey),
              (currentSubObject = {}),
              (currentNestedObject[lowerKey] = currentSubObject));
          else {
            let nestedKey =
              context.currentSection === "betterYou" ||
              (context.currentSection === "dice" &&
                currentNestedKey === "outcomelabels")
                ? parsed.key
                : lowerKey;
            currentNestedObject[nestedKey] = parsed.value;
          }
      } else if (indentDepth >= 2) {
        if (currentSubObject && currentSubKey)
          currentSubObject[lowerKey] = parsed.value;
      }
    }
    let result = {};
    for (let module of modules) {
      let raw = context.rawConfig[module.name] || {};
      try {
        result[module.name] = module.validateConfig(raw);
      } catch (error) {
        (console.error(
          `Failed to parse config for module ${module.name}:`,
          error
        ),
          (result[module.name] = module.validateConfig({})));
      }
    }
    return result;
  }
  function findStoryCard(predicate) {
    if (!storyCards) return;
    for (let i = 0; i < storyCards.length; i++) {
      let card = storyCards[i];
      if (card && predicate(card)) return card;
    }
    return;
  }
  function findStoryCardIndex(predicate) {
    if (!storyCards) return -1;
    for (let i = 0; i < storyCards.length; i++) {
      let card = storyCards[i];
      if (card && predicate(card)) return i;
    }
    return -1;
  }
  function findCard(titleOrKeys) {
    if (!storyCards) return;
    for (let i = 0; i < storyCards.length; i++) {
      let card = storyCards[i];
      if (
        card &&
        (card.title === titleOrKeys || card.keys?.includes(titleOrKeys))
      )
        return card;
    }
    return;
  }
  function pinAndSortCards(pinnedCards) {
    if (!storyCards || storyCards.length < 2) return;
    storyCards.sort((a, b) => {
      let dateA = a.updatedAt ? Date.parse(a.updatedAt) : 0;
      return (b.updatedAt ? Date.parse(b.updatedAt) : 0) - dateA;
    });
    let cardsToPin = Array.isArray(pinnedCards) ? pinnedCards : [pinnedCards];
    for (let i = cardsToPin.length - 1; i >= 0; i--) {
      let card = cardsToPin[i];
      if (!card) continue;
      let index = storyCards.indexOf(card);
      if (index > 0) (storyCards.splice(index, 1), storyCards.unshift(card));
    }
  }
  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function parseBool(value) {
    let v = value.toLowerCase();
    return ["true", "t", "yes", "y", "on", "1"].includes(v);
  }
  function booleanValidator(raw, key, defaultValue = !1) {
    let value = raw[key];
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return parseBool(value);
    return defaultValue;
  }
  function stringValidator(raw, key, defaultValue = "") {
    return typeof raw[key] === "string" ? raw[key] : defaultValue;
  }
  function numberValidator(raw, key, options = {}, defaultValue = 0) {
    let value;
    if (typeof raw[key] === "number") value = raw[key];
    else if (typeof raw[key] === "string")
      value = options.integer ? parseInt(raw[key], 10) : parseFloat(raw[key]);
    else return defaultValue;
    if (Number.isNaN(value)) return defaultValue;
    if (options.integer) value = Math.floor(value);
    if (options.min !== void 0 && value < options.min) return defaultValue;
    if (options.max !== void 0 && value > options.max) return defaultValue;
    return value;
  }
  function enumValidator(raw, key, validValues, defaultValue) {
    let value = raw[key];
    if (typeof value === "string" && validValues.includes(value)) return value;
    return defaultValue;
  }
  function arrayValidator(raw, key, defaultValue = []) {
    let value = raw[key];
    if (Array.isArray(value)) return value;
    if (typeof value === "string")
      if (value.includes(","))
        return value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      else return value.split(/\s+/).filter(Boolean);
    return defaultValue;
  }
  function objectValidator(raw, key, defaultValue = {}) {
    let value = raw[key];
    if (typeof value === "object" && value !== null && !Array.isArray(value))
      return value;
    return defaultValue;
  }
  const Context = (() => {
    function validateConfig(raw) {
      let headerFormat = stringValidator(raw, "headerformat", "plain"),
        authorsNoteFormat = stringValidator(
          raw,
          "authorsnoteformat",
          "bracket"
        );
      return {
        enable: booleanValidator(raw, "enable"),
        headerFormat: headerFormat === "markdown" ? "markdown" : "plain",
        markdownLevel: stringValidator(raw, "markdownlevel", "##"),
        authorsNoteFormat:
          authorsNoteFormat === "markdown" ? "markdown" : "bracket",
        minRecentStoryPercent: numberValidator(
          raw,
          "minrecentstory",
          { min: 0, max: 100, integer: !0 },
          30
        ),
      };
    }
    function migrateConfigSection(sectionText) {
      return sectionText;
    }
    return {
      name: "context",
      configSection: `--- Context ---
Enable: false  # Enable custom context formatting
HeaderFormat: plain  # plain or markdown
MarkdownLevel: ##  # Header level for markdown mode
AuthorsNoteFormat: bracket  # bracket or markdown
MinRecentStory: 30  # Minimum % of context for Recent Story`,
      validateConfig,
      hooks: {},
      migrateConfigSection,
    };
  })();
  function migrateMarkdownHeadersToContext(configText) {
    let mdHeadersMatch = configText.match(/---\s*Markdown\s+Headers\s*---/i);
    if (!mdHeadersMatch) return configText;
    if (configText.match(/---\s*Context\s*---/i))
      return configText.replace(
        /---\s*Markdown\s+Headers\s*---[^-]*(?=---|$)/i,
        ""
      );
    let mdHeadersStart = configText.indexOf(mdHeadersMatch[0]),
      nextSectionMatch = configText
        .slice(mdHeadersStart + mdHeadersMatch[0].length)
        .match(/\n---\s+/),
      mdHeadersEnd = nextSectionMatch
        ? mdHeadersStart + mdHeadersMatch[0].length + nextSectionMatch.index
        : configText.length,
      mdHeadersSection = configText.slice(mdHeadersStart, mdHeadersEnd),
      enableMatch = mdHeadersSection.match(/Enable:\s*(\S+)/i),
      enabled = enableMatch ? enableMatch[1]?.toLowerCase() === "true" : !1,
      headerLevelMatch = mdHeadersSection.match(/HeaderLevel:\s*(\S+)/i),
      headerLevel = headerLevelMatch ? headerLevelMatch[1] : "##",
      newContextSection = `--- Context ---
Enable: ${enabled}  # Enable custom context formatting
HeaderFormat: ${enabled ? "markdown" : "plain"}  # plain or markdown
MarkdownLevel: ${headerLevel}  # Header level for markdown mode
AuthorsNoteFormat: ${enabled ? "markdown" : "bracket"}  # bracket or markdown
MinRecentStory: 30  # Minimum % of context for Recent Story`,
      beforeMdHeaders = configText.slice(0, mdHeadersStart),
      afterMdHeaders = configText.slice(mdHeadersEnd);
    return beforeMdHeaders + newContextSection + afterMdHeaders;
  }
  const SECTION_ORDER = [
      "World Lore",
      "Story Summary",
      "Memories",
      "Narrative Checklist",
      "Recent Story",
      "Author's Note",
    ],
    DEFAULT_HEADERS = {
      "World Lore": "World Lore:",
      "Story Summary": "Story Summary:",
      Memories: "Memories:",
      "Narrative Checklist": "Narrative Checklist:",
      "Recent Story": "Recent Story:",
      "Author's Note": "[Author's note:",
    },
    SECTION_PATTERNS = [
      { name: "World Lore", pattern: /^World Lore:?/im },
      { name: "Story Summary", pattern: /^Story Summary:?/im },
      { name: "Memories", pattern: /^Memories:?/im },
      { name: "Narrative Checklist", pattern: /^Narrative Checklist:?/im },
      { name: "Recent Story", pattern: /^Recent Story:?/im },
      { name: "Author's Note", pattern: /^\[Author'?s?\s+[Nn]ote:/im },
    ],
    BRACKET_AUTHORS_NOTE_PATTERN = /^\[Author'?s?\s+[Nn]ote:\s*([^\]]*)\]$/im;
  function extractBracketAuthorsNoteBody(text, startIndex) {
    let remaining = text.slice(startIndex),
      closeBracket = remaining.indexOf("]");
    if (closeBracket === -1) return;
    let fullMatch = remaining.slice(0, closeBracket + 1),
      bracketMatch = BRACKET_AUTHORS_NOTE_PATTERN.exec(fullMatch);
    if (bracketMatch)
      return {
        body: bracketMatch[1]?.trim() ?? "",
        endIndex: startIndex + closeBracket + 1,
      };
    return;
  }
  function findSections(text) {
    let found = [];
    for (let { name, pattern } of SECTION_PATTERNS) {
      let match,
        globalPattern = new RegExp(pattern.source, "gim");
      while ((match = globalPattern.exec(text)) !== null)
        found.push({ name, header: match[0], startIndex: match.index });
    }
    found.sort((a, b) => a.startIndex - b.startIndex);
    let sections = [],
      authorsNoteEndIndex = null;
    for (let i = 0; i < found.length; i++) {
      let current = found[i];
      if (!current) continue;
      let next = found[i + 1],
        endIndex = next ? next.startIndex : text.length,
        body;
      if (current.name === "Author's Note") {
        let bracketResult = extractBracketAuthorsNoteBody(
          text,
          current.startIndex
        );
        if (((body = bracketResult?.body ?? ""), bracketResult))
          authorsNoteEndIndex = bracketResult.endIndex;
      } else {
        let fullContent = text.slice(current.startIndex, endIndex),
          headerEndIndex = fullContent.indexOf(`
`);
        body =
          headerEndIndex === -1
            ? ""
            : fullContent.slice(headerEndIndex + 1).trim();
      }
      sections.push({
        name: current.name,
        header: current.header,
        startIndex: current.startIndex,
        endIndex,
        body,
      });
    }
    return { sections, authorsNoteEndIndex };
  }
  function matchCardsToWorldLore(worldLoreBody, storyCards2) {
    let matched = [];
    for (let i = 0; i < storyCards2.length; i++) {
      let card = storyCards2[i];
      if (card?.entry && worldLoreBody.includes(card.entry)) matched.push(card);
    }
    return matched;
  }
  function parseContext(text, storyCards2, maxChars) {
    let { sections: parsedSections, authorsNoteEndIndex } = findSections(text),
      sectionMap = new Map(),
      preamble = "",
      postamble = "";
    if (parsedSections.length > 0 && parsedSections[0])
      preamble = text.slice(0, parsedSections[0].startIndex).trim();
    else preamble = text.trim();
    if (authorsNoteEndIndex !== null && authorsNoteEndIndex < text.length)
      postamble = text.slice(authorsNoteEndIndex).trimStart();
    for (let parsed of parsedSections) {
      let existing = sectionMap.get(parsed.name);
      if (existing) {
        let concatenatedBody = existing.body
          ? existing.body +
            `

` +
            parsed.body
          : parsed.body;
        sectionMap.set(parsed.name, {
          name: parsed.name,
          header: existing.header,
          body: concatenatedBody,
        });
      } else
        sectionMap.set(parsed.name, {
          name: parsed.name,
          header: parsed.header,
          body: parsed.body,
        });
    }
    let worldLoreSection = sectionMap.get("World Lore"),
      worldLoreCards = worldLoreSection
        ? matchCardsToWorldLore(worldLoreSection.body, storyCards2)
        : [];
    return {
      preamble,
      sections: sectionMap,
      postamble,
      worldLoreCards,
      raw: text,
      maxChars,
    };
  }
  function getSection(ctx, name) {
    return ctx.sections.get(name);
  }
  function createSection(name, body) {
    return { name, header: DEFAULT_HEADERS[name], body };
  }
  function cloneWithNewSections(ctx, sections) {
    return {
      preamble: ctx.preamble,
      sections,
      postamble: ctx.postamble,
      worldLoreCards: ctx.worldLoreCards,
      raw: ctx.raw,
      maxChars: ctx.maxChars,
    };
  }
  function setSection(ctx, name, body) {
    let newSections = new Map(ctx.sections),
      existing = ctx.sections.get(name);
    if (existing) newSections.set(name, { ...existing, body });
    else newSections.set(name, createSection(name, body));
    return cloneWithNewSections(ctx, newSections);
  }
  function prependToSection(ctx, name, content) {
    let existing = ctx.sections.get(name),
      newBody = existing?.body
        ? content +
          `

` +
          existing.body
        : content;
    return setSection(ctx, name, newBody);
  }
  function formatHeader(name, originalHeader, options) {
    if (options.headerFormat === "plain") {
      if (name === "Author's Note") return "[Author's note:";
      return `${name}:`;
    }
    if (name === "Author's Note") {
      if (options.authorsNoteFormat === "bracket") return "[Author's note:";
      return `${options.markdownLevel}# Author's Note:`;
    }
    return `${options.markdownLevel} ${name}`;
  }
  function formatSectionContent(section, options) {
    let header = formatHeader(section.name, section.header, options);
    if (section.name === "Author's Note") {
      if (
        options.headerFormat === "plain" ||
        options.authorsNoteFormat === "bracket"
      )
        return `${header} ${section.body}]`;
      return `${header}
${section.body}`;
    }
    if (!section.body) return header;
    return `${header}
${section.body}`;
  }
  function serializeContext(
    ctx,
    options = {
      headerFormat: "plain",
      markdownLevel: "##",
      authorsNoteFormat: "bracket",
    }
  ) {
    let parts = [];
    if (ctx.preamble) parts.push(ctx.preamble);
    for (let sectionName of SECTION_ORDER) {
      let section = ctx.sections.get(sectionName);
      if (section) parts.push(formatSectionContent(section, options));
    }
    if (ctx.postamble)
      if (options.headerFormat === "markdown") {
        let header = options.postambleHeader ?? "Continue From:";
        parts.push(`${options.markdownLevel} ${header}
${ctx.postamble}`);
      } else parts.push(ctx.postamble);
    return parts.join(`

`);
  }
  const CARD_TITLE = "FoxTweaks Config",
    CARD_KEYS = "Configure FoxTweaks behavior";
  function isDebugEnabled(config) {
    let debugConfig = config.debug;
    if (typeof debugConfig === "object" && debugConfig !== null)
      return debugConfig.enableDebugCards === !0;
    return !1;
  }
  class FoxTweaks {
    modules = [];
    cachedConfig = null;
    getGlobalState() {
      let globalState = state;
      if (!globalState) throw Error("Global state object not available");
      if (!globalState.foxTweaks) globalState.foxTweaks = {};
      return globalState.foxTweaks;
    }
    getAIState() {
      let globalState = this.getGlobalState();
      if (!globalState.__foxTweaksAI)
        globalState.__foxTweaksAI = {
          activePrompt: null,
          promptQueue: [],
          promptIdCounter: 0,
          responses: {},
        };
      return globalState.__foxTweaksAI;
    }
    registerModule(module) {
      this.modules.push(module);
    }
    getModuleState(moduleName) {
      if (moduleName === "__foxTweaksAI") return {};
      let globalState = this.getGlobalState();
      if (!globalState[moduleName]) {
        let module = this.modules.find((m) => m.name === moduleName);
        globalState[moduleName] = module?.initialState
          ? { ...module.initialState }
          : {};
      }
      return globalState[moduleName];
    }
    getDefaultSections() {
      let sections = {};
      for (let module of this.modules)
        sections[module.name] = module.configSection;
      return sections;
    }
    getAllModuleNames() {
      return this.modules.map((m) => m.name);
    }
    getDefaultCardEntry() {
      for (let module of this.modules)
        if (module.defaultCardEntry !== void 0) return module.defaultCardEntry;
      return "";
    }
    ensureConfigCard() {
      let card = findCard(CARD_TITLE) || findCard(CARD_KEYS);
      if (!card) {
        if (
          ((card =
            addStoryCard(CARD_KEYS, void 0, void 0, void 0, void 0, {
              returnCard: !0,
            }) ?? void 0),
          card)
        ) {
          ((card.title = CARD_TITLE), (card.type = "class"));
          let defaults = this.getDefaultSections(),
            sections = this.getAllModuleNames();
          ((card.description = sections.map((s) =>
            this.disableConfigSection(defaults[s] || "")
          ).join(`

`)),
            (card.entry = this.getDefaultCardEntry()));
        }
      } else if (
        (this.repairConfig(card),
        this.runConfigMigrations(card),
        !card.entry || card.entry.trim() === "")
      )
        card.entry = this.getDefaultCardEntry();
      return card;
    }
    disableConfigSection(configSection) {
      return configSection.replace(/^(\s*Enable:\s*)\S+(.*)$/m, "$1false$2");
    }
    repairConfig(card) {
      let defaults = this.getDefaultSections(),
        allSections = this.getAllModuleNames(),
        description = card.description || "",
        foundSections = new Set();
      for (let sectionName of allSections) {
        let sectionHeader =
          defaults[sectionName]?.match(/^---\s*(.+?)\s*---/)?.[0];
        if (sectionHeader && description.includes(sectionHeader))
          foundSections.add(sectionName);
      }
      let missingSections = allSections.filter((s) => !foundSections.has(s));
      if (missingSections.length > 0) {
        let repairedDescription = (card.description || "").trim();
        for (let section of missingSections) {
          if (repairedDescription)
            repairedDescription += `

`;
          repairedDescription += this.disableConfigSection(
            defaults[section] || ""
          );
        }
        card.description = repairedDescription;
      }
    }
    runConfigMigrations(card) {
      let defaults = this.getDefaultSections(),
        description = card.description || "",
        hasChanges = !1,
        migratedDescription = migrateMarkdownHeadersToContext(description);
      if (migratedDescription !== description)
        ((description = migratedDescription), (hasChanges = !0));
      for (let module of this.modules) {
        if (!module.migrateConfigSection) continue;
        let sectionHeader =
          defaults[module.name]?.match(/^---\s*(.+?)\s*---/)?.[0];
        if (!sectionHeader || !description.includes(sectionHeader)) continue;
        let sectionStart = description.indexOf(sectionHeader),
          nextSectionMatch = description
            .slice(sectionStart + sectionHeader.length)
            .match(/\n---\s+/),
          sectionEnd = nextSectionMatch
            ? sectionStart + sectionHeader.length + nextSectionMatch.index
            : description.length,
          sectionText = description.slice(sectionStart, sectionEnd),
          migratedText = module.migrateConfigSection(sectionText);
        if (migratedText !== sectionText)
          ((description =
            description.slice(0, sectionStart) +
            migratedText +
            description.slice(sectionEnd)),
            (hasChanges = !0));
      }
      if (hasChanges) card.description = description;
    }
    loadConfig() {
      if (this.cachedConfig) return this.cachedConfig;
      let card = this.ensureConfigCard();
      if (!card) {
        let defaults = this.getDefaultSections(),
          defaultConfig = Object.values(defaults).join(`

`);
        return (
          (this.cachedConfig = parseConfig(defaultConfig, this.modules)),
          this.cachedConfig
        );
      }
      if (
        ((this.cachedConfig = parseConfig(
          card.description || "",
          this.modules
        )),
        this.cachedConfig.narrativeChecklist)
      ) {
        let nc = this.cachedConfig.narrativeChecklist;
      }
      return this.cachedConfig;
    }
    updateConfigValue(sectionName, key, value) {
      let card = findCard(CARD_TITLE);
      if (!card) return;
      let lines = (card.description || "").split(`
`),
        inSection = !1,
        updated = !1;
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        if (line.trim().startsWith("---")) {
          let normalizedLine = line.toLowerCase().replace(/\s+/g, ""),
            normalizedSection = sectionName.toLowerCase().replace(/\s+/g, "");
          inSection = normalizedLine.includes(normalizedSection);
          continue;
        }
        if (inSection) {
          let parsed = parseConfigLine(line);
          if (
            parsed.isValid &&
            parsed.key.toLowerCase() === key.toLowerCase()
          ) {
            let newLine = rebuildConfigLine(
              parsed.key,
              String(value),
              parsed.comment,
              parsed.hasComment
            );
            ((lines[i] = newLine), (updated = !0));
            break;
          }
        }
      }
      ((card.description = lines.join(`
`)),
        (this.cachedConfig = null));
    }
    getSerializeOptions(config) {
      let contextConfig = config.context;
      if (!contextConfig || !contextConfig.enable)
        return {
          headerFormat: "plain",
          markdownLevel: "##",
          authorsNoteFormat: "bracket",
        };
      return {
        headerFormat: contextConfig.headerFormat || "plain",
        markdownLevel: contextConfig.markdownLevel || "##",
        authorsNoteFormat: contextConfig.authorsNoteFormat || "bracket",
        minRecentStoryPercent: contextConfig.minRecentStoryPercent,
      };
    }
    createHooks() {
      let createAIContext = (moduleName) => {
        let aiState = this.getAIState();
        return {
          requestPrompt: (prompt, responseMarker) => {
            if (!aiState.promptQueue) aiState.promptQueue = [];
            if (!aiState.promptIdCounter) aiState.promptIdCounter = 0;
            let request = {
              id: `ai_prompt_${aiState.promptIdCounter++}`,
              moduleName,
              prompt,
              responseMarker,
            };
            if (aiState.activePrompt) {
              aiState.promptQueue.push(request);
              return;
            }
            if (typeof AutoCards === "function")
              try {
                AutoCards?.()?.API?.postponeEvents?.(3);
              } catch (e) {}
            aiState.activePrompt = request;
          },
          hasActivePrompt: () => aiState.activePrompt !== null,
          getResponse: (responseMarker) => {
            if (!aiState.responses) aiState.responses = {};
            return aiState.responses[responseMarker] || null;
          },
          clearResponse: (responseMarker) => {
            if (!aiState.responses) aiState.responses = {};
            delete aiState.responses[responseMarker];
          },
        };
      };
      return {
        onInput: (text) => {
          if (!text) return text;
          let config = this.loadConfig(),
            currentText = text,
            globalHistory = history || [],
            globalStoryCards = storyCards || [],
            globalInfo = info || {},
            debugEnabled = isDebugEnabled(config),
            debugTimings;
          if (debugEnabled) {
            debugTimings = [];
            let debugState = this.getModuleState("debug");
            debugState.timings_input = debugTimings;
          }
          for (let module of this.modules)
            if (module.hooks.onInput) {
              let moduleConfig = config[module.name];
              if (moduleConfig !== void 0) {
                let context = {
                    state: this.getModuleState(module.name),
                    updateConfig: (key, value) => {
                      this.updateConfigValue(module.name, key, value);
                    },
                    history: globalHistory,
                    storyCards: globalStoryCards,
                    info: globalInfo,
                    ai: createAIContext(module.name),
                  },
                  start = debugEnabled ? Date.now() : 0;
                if (
                  ((currentText = module.hooks.onInput(
                    currentText,
                    moduleConfig,
                    context
                  )),
                  debugTimings)
                )
                  debugTimings.push({
                    name: module.name,
                    durationMs: Date.now() - start,
                  });
              }
            }
          return currentText;
        },
        onContext: (text) => {
          if (!text) return text;
          let config = this.loadConfig(),
            globalHistory = history || [],
            globalStoryCards = storyCards || [],
            globalInfo = info || {},
            debugEnabled = isDebugEnabled(config),
            debugTimings;
          if (debugEnabled) {
            debugTimings = [];
            let debugState = this.getModuleState("debug");
            debugState.timings_context = debugTimings;
          }
          let maxChars = globalInfo.maxChars,
            virtualCtx = parseContext(text, globalStoryCards, maxChars);
          for (let module of this.modules)
            if (module.hooks.onContext) {
              let moduleConfig = config[module.name];
              if (moduleConfig !== void 0) {
                let hookContext = {
                    state: this.getModuleState(module.name),
                    updateConfig: (key, value) => {
                      this.updateConfigValue(module.name, key, value);
                    },
                    history: globalHistory,
                    storyCards: globalStoryCards,
                    info: globalInfo,
                    ai: createAIContext(module.name),
                  },
                  start = debugEnabled ? Date.now() : 0;
                if (
                  ((virtualCtx = module.hooks.onContext(
                    virtualCtx,
                    moduleConfig,
                    hookContext
                  )),
                  debugTimings)
                )
                  debugTimings.push({
                    name: module.name,
                    durationMs: Date.now() - start,
                  });
              }
            }
          let serializeOptions = this.getSerializeOptions(config),
            result = serializeContext(virtualCtx, serializeOptions),
            aiState = this.getAIState();
          if (aiState.activePrompt)
            result = result + aiState.activePrompt.prompt;
          return result;
        },
        onOutput: (text) => {
          if (!text) return text;
          let currentText = text,
            aiState = this.getAIState();
          if (aiState.activePrompt) {
            let { responseMarker } = aiState.activePrompt,
              markerPattern = new RegExp(
                `${responseMarker}:\\s*([^\\n]+)`,
                "i"
              ),
              match = currentText.match(markerPattern);
            if (match && match[1]) {
              if (!aiState.responses) aiState.responses = {};
              ((aiState.responses[responseMarker] = match[1].trim()),
                (currentText = currentText.replace(
                  new RegExp(`${responseMarker}:[^\\n]+\\n?`, "gi"),
                  ""
                )));
            }
            if (
              ((aiState.activePrompt = null),
              aiState.promptQueue && aiState.promptQueue.length > 0)
            ) {
              if (
                ((aiState.activePrompt = aiState.promptQueue.shift() || null),
                aiState.activePrompt && typeof AutoCards === "function")
              )
                try {
                  AutoCards?.()?.API?.postponeEvents?.(3);
                } catch (e) {}
            }
          }
          let config = this.loadConfig(),
            globalHistory = history || [],
            globalStoryCards = storyCards || [],
            globalInfo = info || {},
            debugEnabled = isDebugEnabled(config),
            debugTimings;
          if (debugEnabled) {
            debugTimings = [];
            let debugState = this.getModuleState("debug");
            debugState.timings_output = debugTimings;
          }
          for (let module of this.modules)
            if (module.hooks.onOutput) {
              let moduleConfig = config[module.name];
              if (moduleConfig !== void 0) {
                let context = {
                    state: this.getModuleState(module.name),
                    updateConfig: (key, value) => {
                      this.updateConfigValue(module.name, key, value);
                    },
                    history: globalHistory,
                    storyCards: globalStoryCards,
                    info: globalInfo,
                    ai: createAIContext(module.name),
                  },
                  start = debugEnabled ? Date.now() : 0;
                if (
                  ((currentText = module.hooks.onOutput(
                    currentText,
                    moduleConfig,
                    context
                  )),
                  debugTimings)
                )
                  debugTimings.push({
                    name: module.name,
                    durationMs: Date.now() - start,
                  });
              }
            }
          return currentText;
        },
      };
    }
  }
  const DiceRoll = (() => {
    let DEFAULT_OUTCOME_LABELS = {
      S: "Critical Success!",
      s: "Success",
      p: "Partial Success",
      f: "Failure",
      F: "Critical Failure!",
    };
    function parseList(value) {
      if (value.includes(","))
        return value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
      return value.split(/\s+/).filter(Boolean);
    }
    function parseCustomSets(raw) {
      if (typeof raw !== "object" || raw === null || Array.isArray(raw))
        return {};
      let result = {},
        obj = raw;
      for (let key of Object.keys(obj)) {
        let set = obj[key];
        if (typeof set !== "object" || set === null || Array.isArray(set))
          continue;
        let setObj = set,
          outcomesRaw = setObj.outcomes,
          wordsRaw = setObj.words;
        if (typeof outcomesRaw !== "string" || typeof wordsRaw !== "string")
          continue;
        let outcomes = parseList(outcomesRaw),
          words = parseList(wordsRaw);
        if (outcomes.length === 0 || words.length === 0) continue;
        result[key] = { outcomes, words };
      }
      return result;
    }
    function validateConfig(raw) {
      return {
        enable: booleanValidator(raw, "enable"),
        triggers: arrayValidator(raw, "triggers"),
        default: arrayValidator(raw, "default"),
        customSets: parseCustomSets(raw.customsets),
        outcomeLabels: objectValidator(
          raw,
          "outcomelabels",
          DEFAULT_OUTCOME_LABELS
        ),
      };
    }
    function roll(outcomes, labels) {
      let outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
      return `[\uD83C\uDFB2 Dice Roll: ${outcome ? labels[outcome] || outcome : "Unknown"}]`;
    }
    function onInput(text, config, _context) {
      if (!config.enable || !config.triggers.length) return text;
      let triggerPattern = config.triggers.map(escapeRegex).join("|");
      for (let [, setData] of Object.entries(config.customSets)) {
        if (!setData.words.length || !setData.outcomes.length) continue;
        let modifierPattern = setData.words.map(escapeRegex).join("|"),
          regex = new RegExp(
            `> (You (${modifierPattern}) (${triggerPattern})[^.?!\\n]*[.?!]?)`,
            "i"
          ),
          match2 = text.match(regex);
        if (match2) {
          let outcome = roll(setData.outcomes, config.outcomeLabels);
          return text.replace(match2[0], `${match2[0].trim()} ${outcome}`);
        }
      }
      let defaultRegex = new RegExp(
          `> (You (${triggerPattern})[^.?!\\n]*[.?!]?)`,
          "i"
        ),
        match = text.match(defaultRegex);
      if (match && config.default.length) {
        let outcome = roll(config.default, config.outcomeLabels);
        return text.replace(match[0], `${match[0].trim()} ${outcome}`);
      }
      return text;
    }
    function migrateConfigSection(sectionText) {
      if (/^\s*CustomSets:/m.test(sectionText)) return sectionText;
      let setNamePattern =
          /^([A-Za-z][A-Za-z0-9_]*):[ \t]*([^\n#]+?)[ \t]*(#[^\n]*)?$/gm,
        sets = new Map(),
        linesToRemove = new Set(),
        lines = sectionText.split(`
`);
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        if (/^\s/.test(line)) continue;
        setNamePattern.lastIndex = 0;
        let match = setNamePattern.exec(line);
        if (!match) continue;
        let key = match[1],
          value = match[2];
        if (!key || !value) continue;
        if (
          new Set([
            "Enable",
            "Triggers",
            "Default",
            "OutcomeLabels",
            "CustomSets",
          ]).has(key)
        )
          continue;
        if (key.endsWith("Words")) {
          let baseName = key.slice(0, -5);
          if (!baseName) continue;
          let entry = sets.get(baseName) ?? {};
          ((entry.words = value.trim()),
            sets.set(baseName, entry),
            linesToRemove.add(i));
        } else {
          let entry = sets.get(key) ?? {};
          ((entry.outcomes = value.trim()),
            sets.set(key, entry),
            linesToRemove.add(i));
        }
      }
      let customSets = [];
      for (let [name, data] of sets)
        if (data.outcomes && data.words)
          customSets.push({ name, outcomes: data.outcomes, words: data.words });
      if (customSets.length === 0) return sectionText;
      let remainingLines = [];
      for (let i = 0; i < lines.length; i++)
        if (!linesToRemove.has(i)) {
          let line = lines[i];
          if (line !== void 0) remainingLines.push(line);
        }
      while (
        remainingLines.length > 0 &&
        remainingLines[remainingLines.length - 1]?.trim() === ""
      )
        remainingLines.pop();
      let customSetsBlock = ["CustomSets:"];
      for (let set of customSets)
        (customSetsBlock.push(`  ${set.name}:`),
          customSetsBlock.push(`    Outcomes: ${set.outcomes}`),
          customSetsBlock.push(`    Words: ${set.words}`));
      return (
        remainingLines.join(`
`) +
        `
` +
        customSetsBlock.join(`
`)
      );
    }
    return {
      name: "dice",
      configSection: `--- Dice ---
Enable: true  # Enable/disable dice rolling
# Trigger words that activate dice rolls:
Triggers: try, attempt, cast, attack, shoot, throw, brace yourself
# Default probability distribution (S=Crit Success, s=Success, p=Partial, f=Fail, F=Crit Fail):
Default: S s s s p f f F
# Outcome labels (customize the text for each outcome):
OutcomeLabels:
  S: Critical Success!
  s: Success
  p: Partial Success
  f: Failure
  F: Critical Failure!
# Custom probability sets (Words trigger the matching Outcomes distribution):
CustomSets:
  Confident:
    Outcomes: S S s s s p p f f
    Words: assuredly, confidently, doubtlessly, skillfully
  Unconfident:
    Outcomes: s s p p f f f F F
    Words: clumsily, tentatively, doubtfully, hesitantly, haphazardly`,
      validateConfig,
      hooks: { onInput },
      migrateConfigSection,
    };
  })();
  function getLastAction() {
    if (!history || history.length === 0) return;
    return history[history.length - 1];
  }
  function getLastActionOfType(type) {
    if (!history) return;
    for (let i = history.length - 1; i >= 0; i--) {
      let action = history[i];
      if (action && action.type === type) return action;
    }
    return;
  }
  function isActionType(action, types) {
    if (!action) return !1;
    return (Array.isArray(types) ? types : [types]).includes(action.type);
  }
  const Paragraph = (() => {
    let FORMATTING_TYPES = ["none", "basic", "empty-line", "newline"];
    function validateConfig(raw) {
      return {
        enable: booleanValidator(raw, "enable"),
        formattingType: enumValidator(
          raw,
          "formattingtype",
          FORMATTING_TYPES,
          "none"
        ),
        indentParagraphs: booleanValidator(raw, "indentparagraphs"),
      };
    }
    function adjustNewlines(text, prevAction) {
      if (!prevAction) return text;
      if (isActionType(prevAction, ["do", "say", "see"])) return text;
      let prevText = prevAction.text || prevAction.rawText || "",
        endNewlines = Math.min(2, (prevText.match(/\n*$/)?.[0] || "").length),
        startNewlines = Math.min(2, (text.match(/^\n*/)?.[0] || "").length);
      if (endNewlines + startNewlines === 1)
        return (
          `
` + text
        );
      return text;
    }
    function applyIndentation(text, prevAction) {
      if (!prevAction) return text;
      if (isActionType(prevAction, ["do", "say", "see"]))
        return text
          .split(
            `
`
          )
          .map((line) => {
            let trimmed = line.trimStart();
            if (
              trimmed.startsWith(">") ||
              trimmed === "" ||
              line.startsWith("    ")
            )
              return line;
            return "    " + line;
          }).join(`
`);
      else
        return text.replace(
          /\n\n(\s*)(?=\S)(?!>)/g,
          `

    `
        );
    }
    function onContext(ctx, config, context) {
      let recentStory = getSection(ctx, "Recent Story");
      if (!recentStory) return ctx;
      let strippedBody = recentStory.body.replace(/^    /gm, "");
      return setSection(ctx, "Recent Story", strippedBody);
    }
    function onOutput(text, config, context) {
      if (!config.enable || config.formattingType === "none") return text;
      switch (config.formattingType) {
        case "basic":
          text = text.replace(
            /\s{2,}|\n/g,
            `

`
          );
          break;
        case "empty-line":
          text = text.replace(
            /(?<!,) (?=")|\s{2,}|\n/g,
            `

`
          );
          break;
        case "newline":
          text = text
            .replace(
              /\s{2,}|\n/g,
              `

`
            )
            .replace(
              /(?<!,) (?=")/g,
              `
`
            );
          break;
      }
      let prevAction =
        context.history.length > 0
          ? context.history[context.history.length - 1] || null
          : null;
      if (((text = adjustNewlines(text, prevAction)), config.indentParagraphs))
        text = applyIndentation(text, prevAction);
      return text;
    }
    return {
      name: "paragraph",
      configSection: `--- Paragraph ---
Enable: true  # Enable/disable paragraph formatting
# FormattingType options: none, basic, empty-line, newline
# - none: No formatting
# - basic: Converts multiple spaces/newlines to double newlines
# - empty-line: Basic + adds spacing before quotes (except after commas)
# - newline: Basic + newlines before quotes
FormattingType: none
IndentParagraphs: false  # Add 4-space indents to paragraphs`,
      validateConfig,
      hooks: { onContext, onOutput },
    };
  })();
  const QUOTE_PAIRS = [
    ['"', '"'],
    ["‹", "›"],
    ["«", "»"],
    ["「", "」"],
    ["『", "』"],
  ];
  function splitIntoSentences(text) {
    let sentences = [],
      currentSentence = "",
      inQuote = !1,
      expectedClosing = "";
    for (let i = 0; i < text.length; i++) {
      let char = text[i];
      if (!char) continue;
      if (((currentSentence += char), !inQuote)) {
        let pair = QUOTE_PAIRS.find((p) => p[0] === char);
        if (pair && pair[1]) ((inQuote = !0), (expectedClosing = pair[1]));
      } else if (char === expectedClosing)
        ((inQuote = !1), (expectedClosing = ""));
      if (!inQuote && /[.!?。！？]/.test(char)) {
        let isCJK = /[。！？]/.test(char),
          nextChar = i + 1 < text.length ? text[i + 1] : void 0;
        if (isCJK || !nextChar || /\s/.test(nextChar))
          (sentences.push(currentSentence.trim()), (currentSentence = ""));
      }
    }
    if (currentSentence.trim()) sentences.push(currentSentence.trim());
    return sentences.filter((s) => s.length > 0);
  }
  function levenshteinDistance(str1, str2) {
    let len1 = str1.length,
      len2 = str2.length,
      matrix = [];
    for (let i = 0; i <= len1; i++) matrix[i] = [i];
    for (let j = 0; j <= len2; j++) {
      let row0 = matrix[0];
      if (row0) row0[j] = j;
    }
    for (let i = 1; i <= len1; i++)
      for (let j = 1; j <= len2; j++) {
        let cost = str1[i - 1] === str2[j - 1] ? 0 : 1,
          currRow = matrix[i],
          prevRow = matrix[i - 1],
          currCell = matrix[i]?.[j - 1],
          prevCell = matrix[i - 1]?.[j],
          diagCell = matrix[i - 1]?.[j - 1];
        if (
          currRow &&
          prevRow !== void 0 &&
          currCell !== void 0 &&
          prevCell !== void 0 &&
          diagCell !== void 0
        )
          currRow[j] = Math.min(prevCell + 1, currCell + 1, diagCell + cost);
      }
    return matrix[len1]?.[len2] ?? 0;
  }
  function calculateSimilarity(str1, str2) {
    let maxLength = Math.max(str1.length, str2.length);
    if (maxLength === 0) return 100;
    let distance = levenshteinDistance(str1, str2);
    return ((maxLength - distance) / maxLength) * 100;
  }
  function calculateSimilarityWithContinuation(str1, str2) {
    let normalSimilarity = calculateSimilarity(str1, str2);
    if (
      Math.min(str1.length, str2.length) / Math.max(str1.length, str2.length) >
      0.7
    )
      return normalSimilarity;
    let shorter = str1.length < str2.length ? str1 : str2,
      longer = str1.length < str2.length ? str2 : str1,
      normalizeForComparison = (text) => {
        return text
          .replace(/["‹›«»「」『』]/g, "")
          .replace(/[.!?,]+\s*$/, "")
          .trim();
      },
      shorterCore = normalizeForComparison(shorter),
      longerCore = normalizeForComparison(longer),
      shorterLower = shorterCore.toLowerCase(),
      longerLower = longerCore.toLowerCase();
    if (longerLower.startsWith(shorterLower)) {
      let matchRatio = shorterCore.length / shorter.length;
      return Math.max(normalSimilarity, 70 + matchRatio * 20);
    }
    if (longerLower.includes(shorterLower)) {
      if (shorterCore.length / longerCore.length >= 0.5) {
        let matchRatio = shorterCore.length / shorter.length;
        return Math.max(normalSimilarity, 70 + matchRatio * 20);
      }
    }
    let prefixLength = Math.min(longer.length, shorter.length + 20),
      prefix = longer.substring(0, prefixLength),
      prefixSimilarity = calculateSimilarity(shorter, prefix);
    return Math.max(normalSimilarity, prefixSimilarity);
  }
  function findSentenceOverlap(
    sentences1,
    sentences2,
    similarityThreshold = 70
  ) {
    let maxToCheck = Math.min(sentences1.length, sentences2.length),
      bestOverlapCount = 0,
      bestTotalSimilarity = 0;
    for (let overlapSize = maxToCheck; overlapSize >= 1; overlapSize--) {
      let lastSentences1 = sentences1.slice(-overlapSize),
        firstSentences2 = sentences2.slice(0, overlapSize),
        totalSimilarity = 0,
        allAboveThreshold = !0;
      for (let i = 0; i < overlapSize; i++) {
        let sent1 = lastSentences1[i],
          sent2 = firstSentences2[i];
        if (!sent1 || !sent2) {
          allAboveThreshold = !1;
          break;
        }
        let similarity = calculateSimilarityWithContinuation(
          sent1.toLowerCase(),
          sent2.toLowerCase()
        );
        if (
          ((totalSimilarity += similarity), similarity < similarityThreshold)
        ) {
          allAboveThreshold = !1;
          break;
        }
      }
      if (allAboveThreshold && totalSimilarity > bestTotalSimilarity)
        ((bestOverlapCount = overlapSize),
          (bestTotalSimilarity = totalSimilarity));
    }
    return bestOverlapCount;
  }
  function checkAndMerge(
    previousMessage,
    currentMessage,
    similarityThreshold = 70
  ) {
    if (!previousMessage || !currentMessage) return { shouldMerge: !1 };
    let prevTrimmed = previousMessage.trim(),
      currTrimmed = currentMessage.trim();
    if (calculateSimilarity(prevTrimmed, currTrimmed) > 90) {
      if (currTrimmed.length <= prevTrimmed.length)
        return {
          shouldMerge: !0,
          mergedContent: " ",
          reason: "full-duplicate",
        };
    }
    let sentences1 = splitIntoSentences(prevTrimmed),
      sentences2 = splitIntoSentences(currTrimmed),
      overlapCount = findSentenceOverlap(
        sentences1,
        sentences2,
        similarityThreshold
      );
    if (overlapCount > 0) {
      if (sentences2.slice(overlapCount).length === 0)
        return {
          shouldMerge: !0,
          mergedContent: " ",
          reason: "sentence-overlap",
        };
      let searchPos = 0;
      for (let i = 0; i < overlapCount; i++) {
        let sentence = sentences2[i];
        if (sentence) {
          let foundPos = currTrimmed.indexOf(sentence, searchPos);
          if (foundPos !== -1) searchPos = foundPos + sentence.length;
        }
      }
      return {
        shouldMerge: !0,
        mergedContent: currTrimmed.substring(searchPos).trim(),
        reason: "sentence-overlap",
      };
    }
    return { shouldMerge: !1 };
  }
  const Redundancy = (() => {
    function validateConfig(raw) {
      return {
        enable: booleanValidator(raw, "enable"),
        similarityThreshold: numberValidator(
          raw,
          "similaritythreshold",
          { min: 0, max: 100, integer: !0 },
          70
        ),
      };
    }
    function onOutput(text, config, context) {
      if (!config.enable) return text;
      let lastAIMessage;
      for (let i = context.history.length - 1; i >= 0; i--) {
        let action = context.history[i];
        if (action && isActionType(action, ["continue"])) {
          lastAIMessage = action;
          break;
        }
      }
      if (!lastAIMessage) return text;
      let lastText = lastAIMessage.text || "",
        result = checkAndMerge(lastText, text, config.similarityThreshold);
      if (result.shouldMerge && result.mergedContent)
        return result.mergedContent;
      return text;
    }
    return {
      name: "redundancy",
      configSection: `--- Redundancy ---
Enable: true  # Enable/disable redundancy detection and merging
# Similarity threshold (0-100) for fuzzy sentence matching:
SimilarityThreshold: 70`,
      validateConfig,
      hooks: { onOutput },
    };
  })();
  const BetterYou = (() => {
    function validateConfig(raw) {
      let rawReplacements = objectValidator(raw, "replacements", {}),
        replacements = {};
      for (let [key, value] of Object.entries(rawReplacements))
        if (typeof value === "string") replacements[key] = value;
      let rawPatterns = objectValidator(raw, "patterns", {}),
        patterns = {};
      for (let [key, value] of Object.entries(rawPatterns))
        if (typeof value === "string") patterns[key] = value;
      return {
        enable: booleanValidator(raw, "enable"),
        replacements,
        patterns,
      };
    }
    function applyPatterns(line, patterns) {
      let result = line;
      for (let [from, to] of Object.entries(patterns)) {
        let regex = new RegExp(escapeRegex(from), "g");
        result = result.replace(regex, to);
      }
      return result;
    }
    function replaceOutsideQuotes(line, replacements) {
      let parts = line.split('"');
      for (let i = 0; i < parts.length; i += 2) {
        let part = parts[i];
        if (part) {
          for (let [from, to] of Object.entries(replacements)) {
            let regex = new RegExp(`\\b${escapeRegex(from)}\\b`, "g");
            part = part.replace(regex, to);
          }
          parts[i] = part;
        }
      }
      return parts.join('"');
    }
    function onInput(text, config, context) {
      if (!config.enable) return text;
      if (
        Object.keys(config.replacements).length === 0 &&
        Object.keys(config.patterns).length === 0
      )
        return text;
      let lines = text.split(`
`);
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        if (!line.match(/^>\s*You\b/) && !line.match(/^>\s*"/)) continue;
        let processedLine = line;
        if (Object.keys(config.patterns).length > 0)
          processedLine = applyPatterns(processedLine, config.patterns);
        if (Object.keys(config.replacements).length > 0)
          processedLine = replaceOutsideQuotes(
            processedLine,
            config.replacements
          );
        lines[i] = processedLine;
      }
      return lines.join(`
`);
    }
    return {
      name: "betterYou",
      configSection: `--- Better You ---
Enable: true  # Enable/disable pronoun replacements
# Replace words outside of dialogue (respects word boundaries):
Replacements:
  mine: yours
  Mine: Yours
# Pattern replacements applied everywhere (including dialogue):
Patterns:
  . you: . You
  ." you: ." You`,
      validateConfig,
      hooks: { onInput },
    };
  })();
  const DEBUG_TEMP_CARD_KEYS = "foxtweaks_debug_temp";
  function storeTempDebugData(hookType, text) {
    if (findStoryCard((c) => c.type === `debug_temp_${hookType}`)) {
      let index = findStoryCardIndex(
        (c) => c.type === `debug_temp_${hookType}`
      );
      if (index !== -1)
        updateStoryCard(index, DEBUG_TEMP_CARD_KEYS, "", void 0, void 0, text);
    } else {
      let card = addStoryCard(
        DEBUG_TEMP_CARD_KEYS,
        "",
        `debug_temp_${hookType}`,
        void 0,
        text,
        { returnCard: !0 }
      );
      if (card) card.type = `debug_temp_${hookType}`;
    }
  }
  const DebugStart = (() => {
      function validateConfig(raw) {
        return { enableDebugCards: booleanValidator(raw, "enabledebugcards") };
      }
      function onInput(text, config, context) {
        if (config.enableDebugCards) storeTempDebugData("input", text);
        return text;
      }
      function onContext(ctx, config, context) {
        if (config.enableDebugCards)
          storeTempDebugData("context", serializeContext(ctx));
        return ctx;
      }
      function onOutput(text, config, context) {
        if (config.enableDebugCards) storeTempDebugData("output", text);
        return text;
      }
      return {
        name: "debug",
        configSection: `--- Debug ---
EnableDebugCards: false  # Enable/disable debug story cards showing hook text transformations`,
        validateConfig,
        hooks: { onInput, onContext, onOutput },
      };
    })(),
    DebugEnd = (() => {
      function validateConfig(raw) {
        return { enableDebugCards: booleanValidator(raw, "enabledebugcards") };
      }
      function formatTimings(hookType, timings) {
        let lines = [`Module Performance (${hookType}):`],
          total = 0;
        for (let i = 0; i < timings.length; i++) {
          let t = timings[i];
          if (!t) continue;
          (lines.push(`  ${t.name}: ${t.durationMs}ms`),
            (total += t.durationMs));
        }
        return (
          lines.push(`  Total: ${total}ms`),
          lines.join(`
`)
        );
      }
      function createOrUpdateDebugCard(
        hookType,
        originalText,
        finalText,
        entryContent
      ) {
        let cardTitle = `${hookType.charAt(0).toUpperCase() + hookType.slice(1)} Debug`,
          cardContent = `Original ${hookType} text:
\`\`\`
${originalText || "(empty)"}
\`\`\`

Resulting ${hookType} text:
\`\`\`
${finalText || "(empty)"}
\`\`\`

Changed: ${originalText !== finalText ? "Yes" : "No"}`;
        if (findStoryCard((c) => c.type === `debug_${hookType}`)) {
          let index = findStoryCardIndex((c) => c.type === `debug_${hookType}`);
          if (index !== -1) {
            updateStoryCard(
              index,
              "foxtweaks_debug",
              entryContent,
              void 0,
              void 0,
              cardContent
            );
            let card = storyCards[index];
            if (card)
              ((card.title = cardTitle), (card.type = `debug_${hookType}`));
          }
        } else {
          let card = addStoryCard(
            "foxtweaks_debug",
            entryContent,
            `debug_${hookType}`,
            cardTitle,
            cardContent,
            { returnCard: !0 }
          );
          if (card) card.title = cardTitle;
        }
      }
      function processDebugHook(text, config, hookType, context) {
        if (!config.enableDebugCards) return text;
        let tempCard = findStoryCard(
          (c) => c.type === `debug_temp_${hookType}`
        );
        if (tempCard && tempCard.description) {
          let originalText = tempCard.description,
            entryContent = "",
            timingsKey = `timings_${hookType}`,
            timings = context.state[timingsKey];
          if (Array.isArray(timings))
            entryContent = formatTimings(hookType, timings);
          createOrUpdateDebugCard(hookType, originalText, text, entryContent);
          let tempIndex = findStoryCardIndex(
            (c) => c.type === `debug_temp_${hookType}`
          );
          if (tempIndex !== -1) removeStoryCard(tempIndex);
        }
        return text;
      }
      function onInput(text, config, context) {
        return processDebugHook(text, config, "input", context);
      }
      function onContext(ctx, config, context) {
        return (
          processDebugHook(serializeContext(ctx), config, "context", context),
          ctx
        );
      }
      function onOutput(text, config, context) {
        return processDebugHook(text, config, "output", context);
      }
      return {
        name: "debug",
        configSection: "",
        validateConfig,
        hooks: { onInput, onContext, onOutput },
      };
    })();
  const givenNames = [
      "Abbott",
      "Acevedo",
      "Acosta",
      "Adams",
      "Adkins",
      "Aguilar",
      "Aguirre",
      "Albert",
      "Alexander",
      "Alford",
      "Allen",
      "Allison",
      "Alston",
      "Anderson",
      "Andrews",
      "Anthony",
      "Armstrong",
      "Arnold",
      "Ashley",
      "Atkins",
      "Atkinson",
      "Austin",
      "Avery",
      "Avila",
      "Ayala",
      "Ayers",
      "Bailey",
      "Baird",
      "Baker",
      "Baldwin",
      "Ball",
      "Ballard",
      "Banks",
      "Barber",
      "Barker",
      "Barlow",
      "Barnes",
      "Barnett",
      "Barr",
      "Barrera",
      "Barrett",
      "Barron",
      "Barry",
      "Bartlett",
      "Barton",
      "Bass",
      "Bates",
      "Battle",
      "Bauer",
      "Baxter",
      "Beach",
      "Bean",
      "Beard",
      "Beasley",
      "Beck",
      "Becker",
      "Bell",
      "Bender",
      "Benjamin",
      "Bennett",
      "Benson",
      "Bentley",
      "Benton",
      "Berg",
      "Berger",
      "Bernard",
      "Berry",
      "Best",
      "Bird",
      "Bishop",
      "Black",
      "Blackburn",
      "Blackwell",
      "Blair",
      "Blake",
      "Blanchard",
      "Blankenship",
      "Blevins",
      "Bolton",
      "Bond",
      "Bonner",
      "Booker",
      "Boone",
      "Booth",
      "Bowen",
      "Bowers",
      "Bowman",
      "Boyd",
      "Boyer",
      "Boyle",
      "Bradford",
      "Bradley",
      "Bradshaw",
      "Brady",
      "Branch",
      "Bray",
      "Brennan",
      "Brewer",
      "Bridges",
      "Briggs",
      "Bright",
      "Britt",
      "Brock",
      "Brooks",
      "Brown",
      "Browning",
      "Bruce",
      "Bryan",
      "Bryant",
      "Buchanan",
      "Buck",
      "Buckley",
      "Buckner",
      "Bullock",
      "Burch",
      "Burgess",
      "Burke",
      "Burks",
      "Burnett",
      "Burns",
      "Burris",
      "Burt",
      "Burton",
      "Bush",
      "Butler",
      "Byers",
      "Byrd",
      "Byrne",
      "Cabrera",
      "Cain",
      "Calderon",
      "Caldwell",
      "Calhoun",
      "Callahan",
      "Camacho",
      "Cameron",
      "Campbell",
      "Campos",
      "Cannon",
      "Cantrell",
      "Cantu",
      "Cardenas",
      "Carey",
      "Carlson",
      "Carney",
      "Carpenter",
      "Carr",
      "Carrillo",
      "Carroll",
      "Carson",
      "Carter",
      "Carver",
      "Case",
      "Casey",
      "Cash",
      "Castaneda",
      "Castillo",
      "Castro",
      "Cervantes",
      "Chambers",
      "Chan",
      "Chandler",
      "Chaney",
      "Chang",
      "Chapman",
      "Charles",
      "Chase",
      "Chavez",
      "Chen",
      "Cherry",
      "Christensen",
      "Christian",
      "Church",
      "Clark",
      "Clarke",
      "Clay",
      "Clayton",
      "Clements",
      "Clemons",
      "Cleveland",
      "Cline",
      "Cobb",
      "Cochran",
      "Coffey",
      "Cohen",
      "Cole",
      "Coleman",
      "Collier",
      "Collins",
      "Colon",
      "Combs",
      "Compton",
      "Conley",
      "Conner",
      "Conrad",
      "Contreras",
      "Conway",
      "Cook",
      "Cooke",
      "Cooley",
      "Cooper",
      "Copeland",
      "Cortez",
      "Cote",
      "Cotton",
      "Cox",
      "Craft",
      "Craig",
      "Crane",
      "Crawford",
      "Crosby",
      "Cross",
      "Cruz",
      "Cummings",
      "Cunningham",
      "Curry",
      "Curtis",
      "Dale",
      "Dalton",
      "Daniel",
      "Daniels",
      "Daugherty",
      "Davenport",
      "David",
      "Davidson",
      "Davies",
      "Davis",
      "Dawson",
      "Day",
      "Dean",
      "Decker",
      "Dejesus",
      "Delacruz",
      "Delaney",
      "Deleon",
      "Delgado",
      "Dennis",
      "Diaz",
      "Dickerson",
      "Dickson",
      "Dillard",
      "Dillon",
      "Dixon",
      "Dodson",
      "Dominguez",
      "Donaldson",
      "Donovan",
      "Dorsey",
      "Dotson",
      "Douglas",
      "Downs",
      "Doyle",
      "Drake",
      "Dudley",
      "Duffy",
      "Duke",
      "Duncan",
      "Dunlap",
      "Dunn",
      "Duran",
      "Durham",
      "Dyer",
      "Eaton",
      "Edwards",
      "Elliott",
      "Ellis",
      "Ellison",
      "Emerson",
      "England",
      "English",
      "Erickson",
      "Espinoza",
      "Estes",
      "Estrada",
      "Evans",
      "Everett",
      "Ewing",
      "Farley",
      "Farmer",
      "Farrell",
      "Faulkner",
      "Ferguson",
      "Fernandez",
      "Ferrell",
      "Fields",
      "Figueroa",
      "Finch",
      "Finley",
      "Fischer",
      "Fisher",
      "Fitzgerald",
      "Fitzpatrick",
      "Fleming",
      "Fletcher",
      "Flores",
      "Flowers",
      "Floyd",
      "Flynn",
      "Foley",
      "Forbes",
      "Ford",
      "Foreman",
      "Foster",
      "Fowler",
      "Fox",
      "Francis",
      "Franco",
      "Frank",
      "Franklin",
      "Franks",
      "Fraser",
      "Frazier",
      "Frederick",
      "Freeman",
      "French",
      "Frost",
      "Fry",
      "Frye",
      "Fuentes",
      "Fuller",
      "Fulton",
      "Gaines",
      "Gallagher",
      "Gallegos",
      "Galloway",
      "Gamble",
      "Garcia",
      "Gardner",
      "Garner",
      "Garrett",
      "Garrison",
      "Garza",
      "Gates",
      "Gay",
      "Gentry",
      "George",
      "Gibbs",
      "Gibson",
      "Gilbert",
      "Giles",
      "Gill",
      "Gillespie",
      "Gilliam",
      "Gilmore",
      "Glass",
      "Glenn",
      "Glover",
      "Goff",
      "Golden",
      "Gomez",
      "Gonzales",
      "Gonzalez",
      "Good",
      "Goodman",
      "Goodwin",
      "Gordon",
      "Gould",
      "Graham",
      "Grant",
      "Graves",
      "Gray",
      "Green",
      "Greene",
      "Greer",
      "Gregory",
      "Griffin",
      "Griffith",
      "Griffiths",
      "Grimes",
      "Gross",
      "Guerra",
      "Guerrero",
      "Guthrie",
      "Gutierrez",
      "Guy",
      "Guzman",
      "Hahn",
      "Hale",
      "Haley",
      "Hall",
      "Hamilton",
      "Hammond",
      "Hampton",
      "Hancock",
      "Haney",
      "Hansen",
      "Hanson",
      "Hardin",
      "Harding",
      "Hardy",
      "Harmon",
      "Harper",
      "Harrell",
      "Harrington",
      "Harris",
      "Harrison",
      "Hart",
      "Hartman",
      "Harvey",
      "Hatfield",
      "Hawkins",
      "Hayden",
      "Hayes",
      "Haynes",
      "Hays",
      "Head",
      "Heath",
      "Hebert",
      "Henderson",
      "Hendricks",
      "Hendrix",
      "Henry",
      "Hensley",
      "Henson",
      "Herman",
      "Hernandez",
      "Herrera",
      "Herring",
      "Hess",
      "Hester",
      "Hewitt",
      "Hickman",
      "Hicks",
      "Higgins",
      "Hill",
      "Hines",
      "Hinton",
      "Hobbs",
      "Hodge",
      "Hodges",
      "Hoffman",
      "Hogan",
      "Holcomb",
      "Holden",
      "Holder",
      "Holland",
      "Holloway",
      "Holman",
      "Holmes",
      "Holt",
      "Hood",
      "Hooper",
      "Hoover",
      "Hopkins",
      "Hopper",
      "Horn",
      "Horne",
      "Horton",
      "Houghton",
      "House",
      "Houston",
      "Howard",
      "Howe",
      "Howell",
      "Hubbard",
      "Huber",
      "Hudson",
      "Huff",
      "Huffman",
      "Hughes",
      "Hull",
      "Humphrey",
      "Hunt",
      "Hunter",
      "Hurley",
      "Hurst",
      "Hussain",
      "Hutchinson",
      "Hyde",
      "Ingram",
      "Irwin",
      "Jackson",
      "Jacobs",
      "Jacobson",
      "James",
      "Jarvis",
      "Jefferson",
      "Jenkins",
      "Jennings",
      "Jensen",
      "Jimenez",
      "John",
      "Johns",
      "Johnson",
      "Johnston",
      "Jones",
      "Jordan",
      "Joseph",
      "Joyce",
      "Joyner",
      "Juarez",
      "Justice",
      "Kane",
      "Kaufman",
      "Kaur",
      "Keith",
      "Keller",
      "Kelley",
      "Kelly",
      "Kemp",
      "Kennedy",
      "Kent",
      "Kerr",
      "Key",
      "Khan",
      "Kidd",
      "Kim",
      "King",
      "Kinney",
      "Kirby",
      "Kirk",
      "Kirkland",
      "Klein",
      "Kline",
      "Knapp",
      "Knight",
      "Knowles",
      "Knox",
      "Koch",
      "Kramer",
      "Lamb",
      "Lambert",
      "Lancaster",
      "Landry",
      "Lane",
      "Lang",
      "Langley",
      "Lara",
      "Larsen",
      "Larson",
      "Lawrence",
      "Lawson",
      "Leach",
      "Leblanc",
      "Lee",
      "Leon",
      "Leonard",
      "Lester",
      "Levine",
      "Levy",
      "Lewis",
      "Lindsay",
      "Lindsey",
      "Little",
      "Livingston",
      "Lloyd",
      "Logan",
      "Long",
      "Lopez",
      "Lott",
      "Love",
      "Lowe",
      "Lowery",
      "Lucas",
      "Luna",
      "Lynch",
      "Lynn",
      "Lyons",
      "Macdonald",
      "Macias",
      "Mack",
      "Madden",
      "Maddox",
      "Maldonado",
      "Malone",
      "Mann",
      "Manning",
      "Marks",
      "Marquez",
      "Marsh",
      "Marshall",
      "Martin",
      "Martinez",
      "Mason",
      "Massey",
      "Mathews",
      "Mathis",
      "Matthews",
      "Maxwell",
      "May",
      "Mayer",
      "Maynard",
      "Mayo",
      "Mays",
      "Mcbride",
      "Mccall",
      "Mccarthy",
      "Mccarty",
      "Mcclain",
      "Mcclure",
      "Mcconnell",
      "Mccormick",
      "Mccoy",
      "Mccray",
      "Mccullough",
      "Mcdaniel",
      "Mcdonald",
      "Mcdowell",
      "Mcfadden",
      "Mcfarland",
      "Mcgee",
      "Mcgowan",
      "Mcguire",
      "Mcintosh",
      "Mcintyre",
      "Mckay",
      "Mckee",
      "Mckenzie",
      "Mckinney",
      "Mcknight",
      "Mclaughlin",
      "Mclean",
      "Mcleod",
      "Mcmahon",
      "Mcmillan",
      "Mcneil",
      "Mcpherson",
      "Meadows",
      "Medina",
      "Mejia",
      "Melendez",
      "Melton",
      "Mendez",
      "Mendoza",
      "Mercado",
      "Mercer",
      "Merrill",
      "Merritt",
      "Meyer",
      "Meyers",
      "Michael",
      "Middleton",
      "Miles",
      "Miller",
      "Mills",
      "Miranda",
      "Mitchell",
      "Molina",
      "Monroe",
      "Montgomery",
      "Montoya",
      "Moody",
      "Moon",
      "Mooney",
      "Moore",
      "Morales",
      "Moran",
      "Moreno",
      "Morgan",
      "Morin",
      "Morris",
      "Morrison",
      "Morrow",
      "Morse",
      "Morton",
      "Moses",
      "Mosley",
      "Moss",
      "Mueller",
      "Mullen",
      "Mullins",
      "Munoz",
      "Murphy",
      "Murray",
      "Myers",
      "Nash",
      "Navarro",
      "Neal",
      "Nelson",
      "Newman",
      "Newton",
      "Nguyen",
      "Nichols",
      "Nicholson",
      "Nielsen",
      "Nieves",
      "Nixon",
      "Noble",
      "Noel",
      "Nolan",
      "Norman",
      "Norris",
      "Norton",
      "Nunez",
      "O'brien",
      "O'connor",
      "O'donnell",
      "O'neal",
      "O'neil",
      "O'neill",
      "Ochoa",
      "Odom",
      "Oliver",
      "Olsen",
      "Olson",
      "Orr",
      "Ortega",
      "Ortiz",
      "Osborn",
      "Osborne",
      "Owen",
      "Owens",
      "Pace",
      "Pacheco",
      "Padilla",
      "Page",
      "Palmer",
      "Park",
      "Parker",
      "Parks",
      "Parrish",
      "Parry",
      "Parsons",
      "Pate",
      "Patel",
      "Patrick",
      "Patterson",
      "Patton",
      "Paul",
      "Payne",
      "Pearce",
      "Pearson",
      "Peck",
      "Pena",
      "Pennington",
      "Perez",
      "Perkins",
      "Perry",
      "Peters",
      "Petersen",
      "Peterson",
      "Petty",
      "Phelps",
      "Phillips",
      "Pickett",
      "Pierce",
      "Pittman",
      "Pitts",
      "Pollard",
      "Poole",
      "Pope",
      "Porter",
      "Potter",
      "Potts",
      "Powell",
      "Powers",
      "Pratt",
      "Preston",
      "Price",
      "Prince",
      "Pruitt",
      "Puckett",
      "Pugh",
      "Quinn",
      "Ramirez",
      "Ramos",
      "Ramsey",
      "Randall",
      "Randolph",
      "Rasmussen",
      "Ratliff",
      "Ray",
      "Raymond",
      "Read",
      "Reed",
      "Rees",
      "Reese",
      "Reeves",
      "Reid",
      "Reilly",
      "Reyes",
      "Reynolds",
      "Rhodes",
      "Rice",
      "Rich",
      "Richard",
      "Richards",
      "Richardson",
      "Richmond",
      "Riddle",
      "Riggs",
      "Riley",
      "Rios",
      "Rivas",
      "Rivera",
      "Rivers",
      "Roach",
      "Robbins",
      "Roberson",
      "Roberts",
      "Robertson",
      "Robinson",
      "Robles",
      "Rodgers",
      "Rodriguez",
      "Rodriquez",
      "Rogers",
      "Rojas",
      "Rollins",
      "Roman",
      "Romero",
      "Rosa",
      "Rosales",
      "Rosario",
      "Rose",
      "Ross",
      "Roth",
      "Rowe",
      "Rowland",
      "Roy",
      "Ruiz",
      "Rush",
      "Russell",
      "Russo",
      "Rutledge",
      "Ryan",
      "Salas",
      "Salazar",
      "Salinas",
      "Sampson",
      "Sanchez",
      "Sanders",
      "Sandoval",
      "Sanford",
      "Santana",
      "Santiago",
      "Santos",
      "Sargent",
      "Saunders",
      "Savage",
      "Sawyer",
      "Schmidt",
      "Schneider",
      "Schroeder",
      "Schultz",
      "Schwartz",
      "Scott",
      "Sears",
      "Sellers",
      "Serrano",
      "Sexton",
      "Shaffer",
      "Shannon",
      "Sharp",
      "Sharpe",
      "Shaw",
      "Shelton",
      "Shepard",
      "Shepherd",
      "Sheppard",
      "Sherman",
      "Shields",
      "Short",
      "Silva",
      "Simmons",
      "Simon",
      "Simpson",
      "Sims",
      "Singleton",
      "Skinner",
      "Slater",
      "Sloan",
      "Small",
      "Smith",
      "Snider",
      "Snow",
      "Snyder",
      "Solis",
      "Solomon",
      "Sosa",
      "Soto",
      "Sparks",
      "Spears",
      "Spence",
      "Spencer",
      "Stafford",
      "Stanley",
      "Stanton",
      "Stark",
      "Steele",
      "Stein",
      "Stephens",
      "Stephenson",
      "Stevens",
      "Stevenson",
      "Stewart",
      "Stokes",
      "Stone",
      "Stout",
      "Strickland",
      "Strong",
      "Stuart",
      "Suarez",
      "Sullivan",
      "Summers",
      "Sutton",
      "Swanson",
      "Sweeney",
      "Sweet",
      "Sykes",
      "Talley",
      "Tanner",
      "Tate",
      "Taylor",
      "Terrell",
      "Terry",
      "Thomas",
      "Thompson",
      "Thomson",
      "Thornton",
      "Tillman",
      "Todd",
      "Torres",
      "Townsend",
      "Tran",
      "Travis",
      "Trevino",
      "Trujillo",
      "Tucker",
      "Turner",
      "Tyler",
      "Tyson",
      "Underwood",
      "Valencia",
      "Valentine",
      "Valenzuela",
      "Vance",
      "Vargas",
      "Vasquez",
      "Vaughan",
      "Vaughn",
      "Vazquez",
      "Vega",
      "Vincent",
      "Vinson",
      "Wade",
      "Wagner",
      "Walker",
      "Wall",
      "Wallace",
      "Waller",
      "Walls",
      "Walsh",
      "Walter",
      "Walters",
      "Walton",
      "Ward",
      "Ware",
      "Warner",
      "Warren",
      "Washington",
      "Waters",
      "Watkins",
      "Watson",
      "Watts",
      "Weaver",
      "Webb",
      "Weber",
      "Webster",
      "Weeks",
      "Weiss",
      "Welch",
      "Wells",
      "West",
      "Wheeler",
      "Whitaker",
      "White",
      "Whitehead",
      "Whitfield",
      "Whitley",
      "Whitney",
      "Wiggins",
      "Wilcox",
      "Wilder",
      "Wiley",
      "Wilkerson",
      "Wilkins",
      "Wilkinson",
      "William",
      "Williams",
      "Williamson",
      "Willis",
      "Wilson",
      "Winters",
      "Wise",
      "Witt",
      "Wolf",
      "Wolfe",
      "Wong",
      "Wood",
      "Woodard",
      "Woods",
      "Woodward",
      "Wooten",
      "Workman",
      "Wright",
      "Wyatt",
      "Wynn",
      "Yang",
      "Yates",
      "York",
      "Young",
      "Zamora",
      "Zimmerman",
    ],
    englishBanks = {
      englishMasculine: {
        strategy: "spaceJoin",
        columns: [
          [
            "Aaden",
            "Aarav",
            "Aaron",
            "Abdiel",
            "Abdullah",
            "Abel",
            "Abraham",
            "Abram",
            "Ace",
            "Adam",
            "Adan",
            "Aden",
            "Aditya",
            "Adonis",
            "Adrian",
            "Adriel",
            "Adrien",
            "Agustin",
            "Ahmad",
            "Ahmed",
            "Aidan",
            "Aiden",
            "Aidyn",
            "Alan",
            "Albert",
            "Alberto",
            "Alden",
            "Aldo",
            "Alec",
            "Alejandro",
            "Alessandro",
            "Alex",
            "Alexander",
            "Alexis",
            "Alexzander",
            "Alfie",
            "Alfonso",
            "Alfred",
            "Alfredo",
            "Alijah",
            "Allan",
            "Allen",
            "Alonso",
            "Alonzo",
            "Alvaro",
            "Alvin",
            "Amari",
            "Ameer",
            "Amir",
            "Amos",
            "Anders",
            "Anderson",
            "Andre",
            "Andres",
            "Andrew",
            "Andy",
            "Angel",
            "Angelo",
            "Anthony",
            "Antoine",
            "Anton",
            "Antonio",
            "Apollo",
            "Archer",
            "Archie",
            "Ari",
            "Arian",
            "Ariel",
            "Arjun",
            "Arlo",
            "Armando",
            "Armani",
            "Arnav",
            "Aron",
            "Arthur",
            "Arturo",
            "Aryan",
            "Asa",
            "Asher",
            "Ashton",
            "Atticus",
            "August",
            "Augustine",
            "Augustus",
            "Austin",
            "Austyn",
            "Avery",
            "Axel",
            "Axton",
            "Ayaan",
            "Aydan",
            "Ayden",
            "Aydin",
            "Bailey",
            "Barrett",
            "Beau",
            "Beckett",
            "Beckham",
            "Ben",
            "Benjamin",
            "Bennett",
            "Benson",
            "Bentlee",
            "Bentley",
            "Bently",
            "Benton",
            "Billy",
            "Blaine",
            "Blaise",
            "Blake",
            "Blaze",
            "Bo",
            "Bobby",
            "Bodhi",
            "Boston",
            "Bowen",
            "Braden",
            "Bradley",
            "Brady",
            "Bradyn",
            "Braeden",
            "Braiden",
            "Branden",
            "Brandon",
            "Branson",
            "Brantley",
            "Braxton",
            "Brayan",
            "Brayden",
            "Braydon",
            "Braylen",
            "Braylon",
            "Brecken",
            "Brendan",
            "Brenden",
            "Brendon",
            "Brennan",
            "Brennen",
            "Brent",
            "Brentley",
            "Brenton",
            "Brett",
            "Brian",
            "Brice",
            "Bridger",
            "Briggs",
            "Brock",
            "Broderick",
            "Brodie",
            "Brody",
            "Brogan",
            "Bronson",
            "Brooks",
            "Bruce",
            "Bruno",
            "Bryan",
            "Bryant",
            "Bryce",
            "Brycen",
            "Bryson",
            "Byron",
            "Cade",
            "Caden",
            "Cael",
            "Caiden",
            "Cain",
            "Cale",
            "Caleb",
            "Callan",
            "Callen",
            "Callum",
            "Calvin",
            "Camden",
            "Camdyn",
            "Cameron",
            "Camilo",
            "Camren",
            "Camron",
            "Camryn",
            "Cannon",
            "Carl",
            "Carlos",
            "Carmelo",
            "Carson",
            "Carter",
            "Case",
            "Casen",
            "Casey",
            "Cash",
            "Cason",
            "Cassius",
            "Cayden",
            "Cayson",
            "Cedric",
            "Cesar",
            "Chace",
            "Chad",
            "Chaim",
            "Chance",
            "Chandler",
            "Channing",
            "Charles",
            "Charlie",
            "Chase",
            "Chris",
            "Christian",
            "Christopher",
            "Clark",
            "Clay",
            "Clayton",
            "Clinton",
            "Cody",
            "Cohen",
            "Colby",
            "Cole",
            "Coleman",
            "Colin",
            "Collin",
            "Colt",
            "Colten",
            "Colton",
            "Conner",
            "Connor",
            "Conor",
            "Conrad",
            "Cooper",
            "Corbin",
            "Corey",
            "Cory",
            "Craig",
            "Crew",
            "Cristian",
            "Cristopher",
            "Crosby",
            "Cruz",
            "Cullen",
            "Curtis",
            "Cyrus",
            "Dakota",
            "Dallas",
            "Dalton",
            "Damarion",
            "Damian",
            "Damien",
            "Damion",
            "Damon",
            "Dane",
            "Dangelo",
            "Daniel",
            "Danny",
            "Dante",
            "Darian",
            "Dariel",
            "Darien",
            "Dario",
            "Darius",
            "Darnell",
            "Darrell",
            "Darren",
            "Darryl",
            "Darwin",
            "Davian",
            "David",
            "Davin",
            "Davion",
            "Davis",
            "Davon",
            "Dawson",
            "Dax",
            "Daxton",
            "Dayton",
            "Deacon",
            "Dean",
            "Deandre",
            "Deangelo",
            "Declan",
            "Deegan",
            "Demarcus",
            "Demetrius",
            "Dennis",
            "Denzel",
            "Deon",
            "Derek",
            "Derick",
            "Derrick",
            "Deshawn",
            "Desmond",
            "Devan",
            "Devin",
            "Devon",
            "Dexter",
            "Diego",
            "Dillon",
            "Dominic",
            "Dominick",
            "Dominik",
            "Dominique",
            "Donald",
            "Donovan",
            "Donte",
            "Dorian",
            "Douglas",
            "Drake",
            "Draven",
            "Drew",
            "Duncan",
            "Dustin",
            "Dwayne",
            "Dylan",
            "Ean",
            "Easton",
            "Eddie",
            "Eden",
            "Edgar",
            "Edison",
            "Eduardo",
            "Edward",
            "Edwin",
            "Efrain",
            "Eli",
            "Elian",
            "Elias",
            "Elijah",
            "Eliot",
            "Eliseo",
            "Elisha",
            "Elliot",
            "Elliott",
            "Ellis",
            "Emanuel",
            "Emerson",
            "Emery",
            "Emiliano",
            "Emilio",
            "Emmanuel",
            "Emmett",
            "Emmitt",
            "Emory",
            "Enrique",
            "Enzo",
            "Eric",
            "Erick",
            "Erik",
            "Ernest",
            "Ernesto",
            "Esteban",
            "Ethan",
            "Eugene",
            "Evan",
            "Everett",
            "Ewan",
            "Ezekiel",
            "Ezequiel",
            "Ezra",
            "Fabian",
            "Felipe",
            "Felix",
            "Fernando",
            "Finlay",
            "Finley",
            "Finn",
            "Finnegan",
            "Fisher",
            "Fletcher",
            "Flynn",
            "Foster",
            "Francis",
            "Francisco",
            "Franco",
            "Frank",
            "Frankie",
            "Franklin",
            "Freddie",
            "Freddy",
            "Frederick",
            "Gabriel",
            "Gael",
            "Gage",
            "Gaige",
            "Garrett",
            "Gary",
            "Gauge",
            "Gavin",
            "Gavyn",
            "George",
            "Gerald",
            "Gerardo",
            "Giancarlo",
            "Gianni",
            "Gibson",
            "Gideon",
            "Gilbert",
            "Gilberto",
            "Giovani",
            "Giovanni",
            "Giovanny",
            "Grady",
            "Graeme",
            "Graham",
            "Grant",
            "Graysen",
            "Grayson",
            "Gregory",
            "Greyson",
            "Griffin",
            "Guillermo",
            "Gunnar",
            "Gunner",
            "Gustavo",
            "Hamza",
            "Hank",
            "Harley",
            "Harold",
            "Harper",
            "Harrison",
            "Harry",
            "Harvey",
            "Hassan",
            "Hayden",
            "Hayes",
            "Heath",
            "Hector",
            "Hendrix",
            "Henry",
            "Hezekiah",
            "Holden",
            "Houston",
            "Howard",
            "Hudson",
            "Hugh",
            "Hugo",
            "Hunter",
            "Ian",
            "Ibrahim",
            "Ignacio",
            "Iker",
            "Immanuel",
            "Isaac",
            "Isai",
            "Isaiah",
            "Isaias",
            "Ishaan",
            "Isiah",
            "Ismael",
            "Israel",
            "Issac",
            "Ivan",
            "Izaiah",
            "Izayah",
            "Jabari",
            "Jace",
            "Jack",
            "Jackson",
            "Jacob",
            "Jacoby",
            "Jaden",
            "Jadiel",
            "Jadon",
            "Jaeden",
            "Jael",
            "Jagger",
            "Jaiden",
            "Jaidyn",
            "Jaime",
            "Jairo",
            "Jake",
            "Jakob",
            "Jalen",
            "Jamal",
            "Jamar",
            "Jamari",
            "Jamarion",
            "James",
            "Jameson",
            "Jamie",
            "Jamir",
            "Jamison",
            "Jared",
            "Jarrett",
            "Jase",
            "Jasiah",
            "Jason",
            "Jasper",
            "Javier",
            "Javion",
            "Javon",
            "Jax",
            "Jaxen",
            "Jaxon",
            "Jaxson",
            "Jaxton",
            "Jay",
            "Jayce",
            "Jaycob",
            "Jayden",
            "Jaydon",
            "Jaylen",
            "Jaylin",
            "Jaylon",
            "Jayson",
            "Jedidiah",
            "Jefferson",
            "Jeffery",
            "Jeffrey",
            "Jensen",
            "Jenson",
            "Jeremiah",
            "Jeremy",
            "Jermaine",
            "Jerome",
            "Jerry",
            "Jesse",
            "Jessie",
            "Jett",
            "Jimmy",
            "Jionni",
            "Joaquin",
            "Joe",
            "Joel",
            "Joey",
            "Johan",
            "Johann",
            "John",
            "Johnathan",
            "Johnathon",
            "Johnny",
            "Jon",
            "Jonah",
            "Jonas",
            "Jonathan",
            "Jonathon",
            "Jordan",
            "Jorden",
            "Jordyn",
            "Jorge",
            "Jose",
            "Joseph",
            "Josh",
            "Joshua",
            "Josiah",
            "Josue",
            "Jovani",
            "Jovanni",
            "Joziah",
            "Juan",
            "Judah",
            "Jude",
            "Juelz",
            "Julian",
            "Julien",
            "Julio",
            "Julius",
            "Junior",
            "Justice",
            "Justin",
            "Justus",
            "Kade",
            "Kaden",
            "Kaeden",
            "Kael",
            "Kai",
            "Kaiden",
            "Kale",
            "Kaleb",
            "Kamari",
            "Kamden",
            "Kameron",
            "Kamron",
            "Kamryn",
            "Kane",
            "Kareem",
            "Karsen",
            "Karson",
            "Karter",
            "Kase",
            "Kasen",
            "Kash",
            "Kason",
            "Kayden",
            "Kaysen",
            "Kayson",
            "Keagan",
            "Keaton",
            "Keegan",
            "Keenan",
            "Keith",
            "Kellan",
            "Kellen",
            "Kelvin",
            "Kendall",
            "Kendrick",
            "Kenneth",
            "Kenny",
            "Kevin",
            "Khalil",
            "Kian",
            "Kieran",
            "Killian",
            "King",
            "Kingsley",
            "Kingston",
            "Knox",
            "Kobe",
            "Kody",
            "Kohen",
            "Kolby",
            "Kole",
            "Kolten",
            "Kolton",
            "Konner",
            "Konnor",
            "Korbin",
            "Krish",
            "Kristian",
            "Kristopher",
            "Kylan",
            "Kyle",
            "Kylen",
            "Kyler",
            "Kymani",
            "Kyree",
            "Kyrie",
            "Kyson",
            "Lamar",
            "Lance",
            "Landen",
            "Landon",
            "Landry",
            "Landyn",
            "Lane",
            "Larry",
            "Lawrence",
            "Lawson",
            "Layne",
            "Layton",
            "Leandro",
            "Lee",
            "Legend",
            "Leland",
            "Lennon",
            "Lennox",
            "Leo",
            "Leon",
            "Leonard",
            "Leonardo",
            "Leonel",
            "Leonidas",
            "Leroy",
            "Levi",
            "Lewis",
            "Liam",
            "Lincoln",
            "Lionel",
            "Logan",
            "London",
            "Lorenzo",
            "Louie",
            "Louis",
            "Luca",
            "Lucas",
            "Lucca",
            "Lucian",
            "Luciano",
            "Luis",
            "Luka",
            "Lukas",
            "Luke",
            "Lyric",
            "Mack",
            "Madden",
            "Maddox",
            "Maison",
            "Major",
            "Makai",
            "Makhi",
            "Malachi",
            "Malakai",
            "Malaki",
            "Malcolm",
            "Malik",
            "Manuel",
            "Marc",
            "Marcel",
            "Marcelo",
            "Marco",
            "Marcos",
            "Marcus",
            "Mario",
            "Mark",
            "Markus",
            "Marlon",
            "Marquis",
            "Marshall",
            "Martin",
            "Marvin",
            "Masen",
            "Mason",
            "Mateo",
            "Mathew",
            "Mathias",
            "Matias",
            "Matteo",
            "Matthew",
            "Matthias",
            "Maurice",
            "Mauricio",
            "Maverick",
            "Max",
            "Maxim",
            "Maximilian",
            "Maximiliano",
            "Maximo",
            "Maximus",
            "Maxton",
            "Maxwell",
            "Mayson",
            "Mekhi",
            "Melvin",
            "Memphis",
            "Messiah",
            "Micah",
            "Michael",
            "Micheal",
            "Miguel",
            "Mike",
            "Miles",
            "Milo",
            "Misael",
            "Mitchell",
            "Mohamed",
            "Mohammad",
            "Mohammed",
            "Moises",
            "Morgan",
            "Myles",
            "Nash",
            "Nasir",
            "Nathan",
            "Nathanael",
            "Nathaniel",
            "Nehemiah",
            "Neil",
            "Nelson",
            "Neymar",
            "Nicholas",
            "Nickolas",
            "Nico",
            "Nicolas",
            "Niko",
            "Nikolai",
            "Nikolas",
            "Nixon",
            "Noah",
            "Noe",
            "Noel",
            "Nolan",
            "Oakley",
            "Odin",
            "Oliver",
            "Ollie",
            "Omar",
            "Omari",
            "Orion",
            "Orlando",
            "Oscar",
            "Osvaldo",
            "Otto",
            "Owen",
            "Pablo",
            "Parker",
            "Patrick",
            "Paul",
            "Paxton",
            "Payton",
            "Pedro",
            "Peter",
            "Peyton",
            "Philip",
            "Phillip",
            "Phoenix",
            "Pierce",
            "Porter",
            "Preston",
            "Prince",
            "Princeton",
            "Quentin",
            "Quincy",
            "Quinn",
            "Quintin",
            "Quinton",
            "Rafael",
            "Raiden",
            "Ramiro",
            "Ramon",
            "Randall",
            "Randy",
            "Raphael",
            "Rashad",
            "Raul",
            "Ray",
            "Rayan",
            "Rayden",
            "Raylan",
            "Raymond",
            "Reagan",
            "Reece",
            "Reed",
            "Reese",
            "Reginald",
            "Reid",
            "Remington",
            "Remy",
            "Rene",
            "Reuben",
            "Rex",
            "Rey",
            "Rhett",
            "Rhys",
            "Ricardo",
            "Richard",
            "Ricky",
            "Riley",
            "River",
            "Robert",
            "Roberto",
            "Rocco",
            "Roderick",
            "Rodney",
            "Rodolfo",
            "Rodrigo",
            "Rogelio",
            "Roger",
            "Rohan",
            "Roland",
            "Rolando",
            "Roman",
            "Romeo",
            "Ronald",
            "Ronan",
            "Ronin",
            "Ronnie",
            "Rory",
            "Ross",
            "Rowan",
            "Rowen",
            "Roy",
            "Royce",
            "Ruben",
            "Rudy",
            "Russell",
            "Ryan",
            "Ryder",
            "Ryker",
            "Rylan",
            "Ryland",
            "Rylee",
            "Rylen",
            "Sage",
            "Sam",
            "Samson",
            "Samuel",
            "Saul",
            "Sawyer",
            "Scott",
            "Seamus",
            "Sean",
            "Sebastian",
            "Semaj",
            "Sergio",
            "Seth",
            "Shane",
            "Shaun",
            "Shawn",
            "Sheldon",
            "Sidney",
            "Silas",
            "Simeon",
            "Simon",
            "Sincere",
            "Skylar",
            "Skyler",
            "Solomon",
            "Sonny",
            "Soren",
            "Spencer",
            "Stanley",
            "Stefan",
            "Stephen",
            "Sterling",
            "Steve",
            "Steven",
            "Sullivan",
            "Sylas",
            "Talon",
            "Tanner",
            "Tate",
            "Tatum",
            "Taylor",
            "Teagan",
            "Terrance",
            "Terrell",
            "Terrence",
            "Terry",
            "Thaddeus",
            "Theo",
            "Theodore",
            "Thiago",
            "Thomas",
            "Timothy",
            "Titan",
            "Titus",
            "Tobias",
            "Toby",
            "Todd",
            "Tom",
            "Tomas",
            "Tommy",
            "Tony",
            "Trace",
            "Travis",
            "Trent",
            "Trenton",
            "Trevon",
            "Trevor",
            "Trey",
            "Tripp",
            "Tristan",
            "Tristen",
            "Tristian",
            "Tristin",
            "Triston",
            "Troy",
            "Truman",
            "Trystan",
            "Tucker",
            "Turner",
            "Ty",
            "Tyler",
            "Tyree",
            "Tyrell",
            "Tyrone",
            "Tyson",
            "Ulises",
            "Uriah",
            "Uriel",
            "Urijah",
            "Valentin",
            "Valentino",
            "Van",
            "Vance",
            "Vaughn",
            "Vicente",
            "Victor",
            "Vihaan",
            "Vincent",
            "Vincenzo",
            "Wade",
            "Walker",
            "Walter",
            "Warren",
            "Waylon",
            "Wayne",
            "Wesley",
            "Westin",
            "Weston",
            "Will",
            "William",
            "Willie",
            "Wilson",
            "Winston",
            "Wyatt",
            "Xander",
            "Xavi",
            "Xavier",
            "Xzavier",
            "Yael",
            "Yahir",
            "Yandel",
            "Yehuda",
            "Yosef",
            "Yousef",
            "Yusuf",
            "Zac",
            "Zachariah",
            "Zachary",
            "Zackary",
            "Zaid",
            "Zaiden",
            "Zain",
            "Zaire",
            "Zak",
            "Zander",
            "Zane",
            "Zavier",
            "Zayden",
            "Zayne",
            "Zechariah",
            "Zeke",
            "Zion",
          ],
          [...givenNames],
        ],
      },
      englishFeminine: {
        strategy: "spaceJoin",
        columns: [
          [
            "Aaliyah",
            "Abbie",
            "Abbigail",
            "Abby",
            "Abigail",
            "Abrielle",
            "Abril",
            "Ada",
            "Adalyn",
            "Adalynn",
            "Addilyn",
            "Addison",
            "Addisyn",
            "Addyson",
            "Adelaide",
            "Adele",
            "Adelina",
            "Adeline",
            "Adelyn",
            "Adelynn",
            "Adley",
            "Adriana",
            "Adrianna",
            "Adrienne",
            "Aileen",
            "Aimee",
            "Ainsley",
            "Aisha",
            "Aiyana",
            "Akira",
            "Alaina",
            "Alana",
            "Alani",
            "Alanna",
            "Alannah",
            "Alaya",
            "Alayah",
            "Alayna",
            "Alaysia",
            "Aleah",
            "Aleena",
            "Aleigha",
            "Alejandra",
            "Alena",
            "Alessandra",
            "Alex",
            "Alexa",
            "Alexandra",
            "Alexandria",
            "Alexia",
            "Alexis",
            "Ali",
            "Alia",
            "Aliana",
            "Alice",
            "Alicia",
            "Alina",
            "Alisa",
            "Alisha",
            "Alison",
            "Alissa",
            "Alisson",
            "Alivia",
            "Aliya",
            "Aliyah",
            "Aliza",
            "Allie",
            "Allison",
            "Ally",
            "Allyson",
            "Alma",
            "Alondra",
            "Alyson",
            "Alyssa",
            "Alyvia",
            "Amanda",
            "Amani",
            "Amara",
            "Amari",
            "Amaya",
            "Amber",
            "Amelia",
            "Amelie",
            "America",
            "Amina",
            "Amira",
            "Amirah",
            "Amiya",
            "Amiyah",
            "Amy",
            "Amya",
            "Ana",
            "Anabel",
            "Anabella",
            "Anabelle",
            "Anahi",
            "Analia",
            "Anastasia",
            "Anaya",
            "Andrea",
            "Angel",
            "Angela",
            "Angelica",
            "Angelina",
            "Angeline",
            "Angelique",
            "Angie",
            "Anika",
            "Aniya",
            "Aniyah",
            "Ann",
            "Anna",
            "Annabel",
            "Annabell",
            "Annabella",
            "Annabelle",
            "Annalee",
            "Annalise",
            "Anne",
            "Annie",
            "Annika",
            "Ansley",
            "Anya",
            "April",
            "Arabella",
            "Araceli",
            "Arely",
            "Aria",
            "Ariah",
            "Ariana",
            "Arianna",
            "Ariel",
            "Ariella",
            "Arielle",
            "Armani",
            "Arya",
            "Aryana",
            "Aryanna",
            "Ashley",
            "Ashlyn",
            "Ashlynn",
            "Ashtyn",
            "Asia",
            "Aspen",
            "Athena",
            "Aubree",
            "Aubrey",
            "Aubri",
            "Aubriana",
            "Aubrianna",
            "Aubrie",
            "Aubrielle",
            "Audrey",
            "Audriana",
            "Audrianna",
            "Audrina",
            "Aurora",
            "Autumn",
            "Ava",
            "Avah",
            "Averi",
            "Averie",
            "Avery",
            "Aviana",
            "Avianna",
            "Aya",
            "Ayana",
            "Ayanna",
            "Ayla",
            "Ayleen",
            "Aylin",
            "Azalea",
            "Azaria",
            "Azariah",
            "Bailee",
            "Bailey",
            "Barbara",
            "Baylee",
            "Bayleigh",
            "Beatrice",
            "Belen",
            "Bella",
            "Bethany",
            "Bianca",
            "Blair",
            "Blake",
            "Blakely",
            "Braelyn",
            "Braelynn",
            "Braylee",
            "Breanna",
            "Bree",
            "Brenda",
            "Brenna",
            "Bria",
            "Briana",
            "Brianna",
            "Bridget",
            "Briella",
            "Brielle",
            "Briley",
            "Brinley",
            "Brisa",
            "Bristol",
            "Britney",
            "Brittany",
            "Brooke",
            "Brooklyn",
            "Brooklynn",
            "Bryanna",
            "Brylee",
            "Bryleigh",
            "Bryn",
            "Brynlee",
            "Brynn",
            "Cadence",
            "Cailyn",
            "Caitlin",
            "Caitlyn",
            "Cali",
            "Callie",
            "Cambria",
            "Cameron",
            "Camila",
            "Camilla",
            "Camille",
            "Campbell",
            "Camryn",
            "Cara",
            "Carissa",
            "Carla",
            "Carlee",
            "Carleigh",
            "Carley",
            "Carlie",
            "Carly",
            "Carmen",
            "Carolina",
            "Caroline",
            "Carolyn",
            "Casey",
            "Cassandra",
            "Cassidy",
            "Cataleya",
            "Catalina",
            "Catherine",
            "Caylee",
            "Cecelia",
            "Cecilia",
            "Celeste",
            "Celia",
            "Celine",
            "Cerys",
            "Chana",
            "Chanel",
            "Charity",
            "Charlee",
            "Charleigh",
            "Charley",
            "Charli",
            "Charlie",
            "Charlize",
            "Charlotte",
            "Chaya",
            "Chelsea",
            "Cherish",
            "Cheyanne",
            "Cheyenne",
            "Chloe",
            "Christina",
            "Christine",
            "Ciara",
            "Cindy",
            "Claire",
            "Clara",
            "Clare",
            "Clarissa",
            "Claudia",
            "Colette",
            "Collins",
            "Cora",
            "Coraline",
            "Corinne",
            "Courtney",
            "Cristina",
            "Crystal",
            "Cynthia",
            "Dahlia",
            "Daisy",
            "Dakota",
            "Dalilah",
            "Dallas",
            "Dana",
            "Danica",
            "Daniela",
            "Daniella",
            "Danielle",
            "Danika",
            "Danna",
            "Daphne",
            "Dayana",
            "Deanna",
            "Deborah",
            "Delaney",
            "Delilah",
            "Demi",
            "Denise",
            "Desiree",
            "Destinee",
            "Destiny",
            "Devyn",
            "Diamond",
            "Diana",
            "Dixie",
            "Dorothy",
            "Dulce",
            "Dylan",
            "Eden",
            "Edith",
            "Eileen",
            "Elaina",
            "Elaine",
            "Eleanor",
            "Elena",
            "Eliana",
            "Elianna",
            "Elin",
            "Elisa",
            "Elisabeth",
            "Elise",
            "Elissa",
            "Eliza",
            "Elizabeth",
            "Ella",
            "Elle",
            "Ellen",
            "Elliana",
            "Ellie",
            "Elliot",
            "Eloise",
            "Elsa",
            "Elsie",
            "Elyse",
            "Ember",
            "Emelia",
            "Emely",
            "Emerson",
            "Emersyn",
            "Emery",
            "Emilee",
            "Emilia",
            "Emilie",
            "Emily",
            "Emma",
            "Emmalee",
            "Emmaline",
            "Emmalyn",
            "Emmalynn",
            "Emmy",
            "Emory",
            "Erica",
            "Erika",
            "Erin",
            "Esme",
            "Esmeralda",
            "Estella",
            "Estelle",
            "Esther",
            "Estrella",
            "Eva",
            "Evalyn",
            "Evangeline",
            "Eve",
            "Evelyn",
            "Evelynn",
            "Everly",
            "Evie",
            "Faith",
            "Farrah",
            "Fatima",
            "Felicity",
            "Fernanda",
            "Finley",
            "Fiona",
            "Frances",
            "Francesca",
            "Freya",
            "Gabriela",
            "Gabriella",
            "Gabrielle",
            "Galilea",
            "Gemma",
            "Genesis",
            "Genevieve",
            "Georgia",
            "Georgina",
            "Geraldine",
            "Gia",
            "Giada",
            "Giana",
            "Gianna",
            "Giovanna",
            "Giselle",
            "Gisselle",
            "Giuliana",
            "Gloria",
            "Grace",
            "Gracelyn",
            "Gracelynn",
            "Gracie",
            "Greta",
            "Guadalupe",
            "Gwendolyn",
            "Hadassah",
            "Hadley",
            "Hailee",
            "Hailey",
            "Haleigh",
            "Haley",
            "Halle",
            "Hallie",
            "Hana",
            "Hanna",
            "Hannah",
            "Harlee",
            "Harley",
            "Harlow",
            "Harmony",
            "Harper",
            "Harriet",
            "Hattie",
            "Haven",
            "Hayden",
            "Haylee",
            "Hayleigh",
            "Hayley",
            "Haylie",
            "Hazel",
            "Heather",
            "Heaven",
            "Heidi",
            "Helen",
            "Helena",
            "Hollie",
            "Holly",
            "Hope",
            "Iliana",
            "Imani",
            "Imogen",
            "Ingrid",
            "Irene",
            "Iris",
            "Isabel",
            "Isabela",
            "Isabella",
            "Isabelle",
            "Isis",
            "Isla",
            "Isobel",
            "Itzel",
            "Ivanna",
            "Ivy",
            "Izabella",
            "Izabelle",
            "Jacqueline",
            "Jada",
            "Jade",
            "Jaelyn",
            "Jaelynn",
            "Jaida",
            "Jakayla",
            "Jaliyah",
            "Jamie",
            "Janae",
            "Jane",
            "Janelle",
            "Janessa",
            "Janiya",
            "Janiyah",
            "Jaqueline",
            "Jasmin",
            "Jasmine",
            "Jaycee",
            "Jayda",
            "Jayde",
            "Jayden",
            "Jayla",
            "Jaylah",
            "Jaylee",
            "Jayleen",
            "Jaylene",
            "Jaylin",
            "Jaylynn",
            "Jazlyn",
            "Jazlynn",
            "Jazmin",
            "Jazmine",
            "Jazzlyn",
            "Jemma",
            "Jenna",
            "Jennifer",
            "Jenny",
            "Jessa",
            "Jessica",
            "Jessie",
            "Jewel",
            "Jillian",
            "Jimena",
            "Joanna",
            "Jocelyn",
            "Jocelynn",
            "Jodie",
            "Johanna",
            "Jolene",
            "Jolie",
            "Jordan",
            "Jordyn",
            "Jordynn",
            "Joselyn",
            "Josephine",
            "Josie",
            "Joslyn",
            "Journee",
            "Journey",
            "Joy",
            "Joyce",
            "Judith",
            "Julia",
            "Juliana",
            "Julianna",
            "Julianne",
            "Julie",
            "Juliet",
            "Juliette",
            "Julissa",
            "June",
            "Juniper",
            "Justice",
            "Kadence",
            "Kaelyn",
            "Kaelynn",
            "Kaia",
            "Kailee",
            "Kailey",
            "Kailyn",
            "Kailynn",
            "Kairi",
            "Kaitlin",
            "Kaitlyn",
            "Kaitlynn",
            "Kaiya",
            "Kaleigh",
            "Kali",
            "Kaliyah",
            "Kallie",
            "Kamila",
            "Kamryn",
            "Kara",
            "Karen",
            "Karina",
            "Karis",
            "Karissa",
            "Karla",
            "Karlee",
            "Karlie",
            "Karma",
            "Karsyn",
            "Kasey",
            "Kassandra",
            "Kassidy",
            "Katalina",
            "Kate",
            "Katelyn",
            "Katelynn",
            "Katherine",
            "Kathleen",
            "Kathryn",
            "Katie",
            "Katrina",
            "Kaya",
            "Kayden",
            "Kaydence",
            "Kayla",
            "Kaylee",
            "Kayleigh",
            "Kaylen",
            "Kaylie",
            "Kaylin",
            "Kaylyn",
            "Kaylynn",
            "Keira",
            "Kelly",
            "Kelsey",
            "Kendal",
            "Kendall",
            "Kendra",
            "Kendyl",
            "Kenia",
            "Kenley",
            "Kenna",
            "Kennedi",
            "Kennedy",
            "Kensley",
            "Kenya",
            "Kenzie",
            "Keyla",
            "Khloe",
            "Kiana",
            "Kiara",
            "Kiera",
            "Kiley",
            "Kimber",
            "Kimberly",
            "Kimora",
            "Kinley",
            "Kinsley",
            "Kira",
            "Kirsten",
            "Kora",
            "Kourtney",
            "Kristen",
            "Kristina",
            "Krystal",
            "Kyla",
            "Kylah",
            "Kylee",
            "Kyleigh",
            "Kylie",
            "Kyndal",
            "Kyndall",
            "Kynlee",
            "Kyra",
            "Lacey",
            "Laila",
            "Lailah",
            "Lainey",
            "Lana",
            "Landry",
            "Laney",
            "Lara",
            "Larissa",
            "Laura",
            "Laurel",
            "Lauren",
            "Lauryn",
            "Layla",
            "Laylah",
            "Lea",
            "Leah",
            "Leanna",
            "Leia",
            "Leighton",
            "Leila",
            "Leilani",
            "Lena",
            "Leona",
            "Leslie",
            "Lesly",
            "Lexi",
            "Lexie",
            "Leyla",
            "Lia",
            "Liana",
            "Libby",
            "Liberty",
            "Lila",
            "Lilah",
            "Lilia",
            "Lilian",
            "Liliana",
            "Lilianna",
            "Lilith",
            "Lillian",
            "Lilliana",
            "Lillianna",
            "Lillie",
            "Lilly",
            "Lillyana",
            "Lily",
            "Lilyana",
            "Lilyanna",
            "Lina",
            "Linda",
            "Lindsay",
            "Lindsey",
            "Lisa",
            "Litzy",
            "Livia",
            "Lizbeth",
            "Logan",
            "Lola",
            "London",
            "Londyn",
            "Lorelai",
            "Lorelei",
            "Louise",
            "Lucia",
            "Luciana",
            "Lucille",
            "Lucy",
            "Luna",
            "Luz",
            "Lydia",
            "Lyla",
            "Lylah",
            "Lyric",
            "Macey",
            "Maci",
            "Macie",
            "Mackenzie",
            "Macy",
            "Madalyn",
            "Madalynn",
            "Maddison",
            "Madeleine",
            "Madeline",
            "Madelyn",
            "Madelynn",
            "Madilyn",
            "Madilynn",
            "Madison",
            "Madisyn",
            "Madyson",
            "Mae",
            "Maeve",
            "Maggie",
            "Maia",
            "Maisie",
            "Maisy",
            "Makayla",
            "Makenna",
            "Makenzie",
            "Malaya",
            "Malaysia",
            "Maleah",
            "Malia",
            "Maliah",
            "Maliyah",
            "Mallory",
            "Mara",
            "Margaret",
            "Maria",
            "Mariah",
            "Mariam",
            "Mariana",
            "Marianna",
            "Marie",
            "Marilyn",
            "Marina",
            "Marisa",
            "Marisol",
            "Marissa",
            "Maritza",
            "Mariyah",
            "Marlee",
            "Marlene",
            "Marley",
            "Martha",
            "Mary",
            "Maryam",
            "Matilda",
            "Mattie",
            "Maya",
            "Mckayla",
            "Mckenna",
            "Mckenzie",
            "Mckinley",
            "Meadow",
            "Megan",
            "Meghan",
            "Melanie",
            "Melany",
            "Melina",
            "Melissa",
            "Melody",
            "Mercedes",
            "Meredith",
            "Mia",
            "Miah",
            "Micah",
            "Michaela",
            "Michelle",
            "Mikaela",
            "Mikayla",
            "Mila",
            "Milan",
            "Milana",
            "Milania",
            "Milena",
            "Miley",
            "Millie",
            "Mina",
            "Mira",
            "Miracle",
            "Miranda",
            "Miriam",
            "Miya",
            "Mollie",
            "Molly",
            "Monica",
            "Monroe",
            "Morgan",
            "Moriah",
            "Mya",
            "Myah",
            "Myla",
            "Myra",
            "Nadia",
            "Nahla",
            "Nancy",
            "Naomi",
            "Natalee",
            "Natalia",
            "Natalie",
            "Nataly",
            "Natalya",
            "Natasha",
            "Nathalie",
            "Nathaly",
            "Nayeli",
            "Nevaeh",
            "Nia",
            "Niamh",
            "Nicole",
            "Nina",
            "Noelle",
            "Noemi",
            "Nola",
            "Nora",
            "Norah",
            "Nova",
            "Nyla",
            "Nylah",
            "Olive",
            "Olivia",
            "Paige",
            "Paislee",
            "Paisley",
            "Paityn",
            "Paloma",
            "Paola",
            "Paris",
            "Parker",
            "Patience",
            "Patricia",
            "Paula",
            "Paulina",
            "Payton",
            "Pearl",
            "Penelope",
            "Perla",
            "Peyton",
            "Phoebe",
            "Phoenix",
            "Piper",
            "Poppy",
            "Presley",
            "Priscilla",
            "Quinn",
            "Rachael",
            "Rachel",
            "Raegan",
            "Raelyn",
            "Raelynn",
            "Raina",
            "Raquel",
            "Raven",
            "Raylee",
            "Rayna",
            "Rayne",
            "Reagan",
            "Rebecca",
            "Rebekah",
            "Reese",
            "Regan",
            "Regina",
            "Renata",
            "Renee",
            "Reyna",
            "Rihanna",
            "Riley",
            "River",
            "Riya",
            "Rosa",
            "Rosalie",
            "Rose",
            "Roselyn",
            "Rosemary",
            "Rosie",
            "Rowan",
            "Ruby",
            "Ruth",
            "Ryan",
            "Ryann",
            "Rylan",
            "Rylee",
            "Ryleigh",
            "Rylie",
            "Saanvi",
            "Sabrina",
            "Sadie",
            "Sage",
            "Saige",
            "Salma",
            "Samantha",
            "Samara",
            "Samiyah",
            "Sandra",
            "Saniya",
            "Saniyah",
            "Sara",
            "Sarah",
            "Sarahi",
            "Sarai",
            "Sariah",
            "Sariyah",
            "Sasha",
            "Savanna",
            "Savannah",
            "Sawyer",
            "Scarlet",
            "Scarlett",
            "Scarlette",
            "Selah",
            "Selena",
            "Serena",
            "Serenity",
            "Shannon",
            "Sharon",
            "Shayla",
            "Shelby",
            "Sherlyn",
            "Shiloh",
            "Sidney",
            "Siena",
            "Sienna",
            "Sierra",
            "Simone",
            "Sky",
            "Skye",
            "Skyla",
            "Skylar",
            "Skyler",
            "Sloan",
            "Sloane",
            "Sofia",
            "Sofie",
            "Sonia",
            "Sophia",
            "Sophie",
            "Stella",
            "Stephanie",
            "Summer",
            "Susan",
            "Sydney",
            "Sylvia",
            "Tabitha",
            "Talia",
            "Taliyah",
            "Tamia",
            "Tara",
            "Taraji",
            "Taryn",
            "Tatiana",
            "Tatum",
            "Taylor",
            "Teagan",
            "Tegan",
            "Temperance",
            "Tenley",
            "Teresa",
            "Tess",
            "Tessa",
            "Thalia",
            "Tia",
            "Tiana",
            "Tiffany",
            "Tilly",
            "Tinley",
            "Tori",
            "Trinity",
            "Valentina",
            "Valeria",
            "Valerie",
            "Vanessa",
            "Vera",
            "Veronica",
            "Victoria",
            "Violet",
            "Virginia",
            "Vivian",
            "Viviana",
            "Vivienne",
            "Wendy",
            "Whitney",
            "Willa",
            "Willow",
            "Winter",
            "Ximena",
            "Yamileth",
            "Yareli",
            "Yaretzi",
            "Yaritza",
            "Yasmin",
            "Yesenia",
            "Zahra",
            "Zaniyah",
            "Zara",
            "Zaria",
            "Zariah",
            "Zariyah",
            "Zion",
            "Zoe",
            "Zoey",
            "Zoie",
            "Zuri",
          ],
          [...givenNames],
        ],
      },
    };
  const VOWELS = new Set(["a", "e", "i", "o", "u"]),
    BRIDGE_CONSONANTS = ["n", "r", "s", "t", "v"],
    BRIDGE_VOWELS = ["a", "e", "i", "o", "u"];
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  function isVowel(char) {
    return VOWELS.has(char.toLowerCase());
  }
  function generateFromBank(bank) {
    switch (bank.strategy) {
      case "pickOne": {
        let allEntries = [];
        for (let i = 0; i < bank.columns.length; i++) {
          let col = bank.columns[i];
          if (col)
            for (let j = 0; j < col.length; j++) {
              let entry = col[j];
              if (entry) allEntries.push(entry);
            }
        }
        return pickRandom(allEntries) ?? "";
      }
      case "spaceJoin": {
        let parts = [];
        for (let i = 0; i < bank.columns.length; i++) {
          let col = bank.columns[i];
          if (col && col.length > 0) {
            let picked = pickRandom(col);
            if (picked) parts.push(picked);
          }
        }
        return parts.join(" ");
      }
      case "concat": {
        let parts = [];
        for (let i = 0; i < bank.columns.length; i++) {
          let col = bank.columns[i];
          if (col && col.length > 0) {
            let picked = pickRandom(col);
            if (picked) parts.push(picked);
          }
        }
        return parts.join("");
      }
      case "hyphenConcat": {
        let a = bank.columns[0] ? pickRandom(bank.columns[0]) : void 0,
          b = bank.columns[1] ? pickRandom(bank.columns[1]) : void 0;
        if (a && b) return `${a}-${b}`;
        return (a ?? "") + (b ?? "");
      }
      case "vowelSafeConcat": {
        let parts = [];
        for (let i = 0; i < bank.columns.length; i++) {
          let col = bank.columns[i];
          if (!col || col.length === 0) continue;
          let picked = pickRandom(col);
          if (picked && parts.length > 0) {
            let prev = parts[parts.length - 1];
            if (prev) {
              let lastChar = prev[prev.length - 1];
              if (lastChar && isVowel(lastChar))
                for (let retry = 0; retry < 10; retry++) {
                  let firstChar = picked[0];
                  if (!firstChar || !isVowel(firstChar)) break;
                  if (((picked = pickRandom(col)), !picked)) break;
                }
            }
          }
          if (picked) parts.push(picked);
        }
        return parts.join("");
      }
      case "blend": {
        let colA = bank.columns[0],
          colB = bank.columns[1];
        if (!colA || !colB || colA.length === 0 || colB.length === 0) return "";
        let nameA = pickRandom(colA),
          nameB = pickRandom(colB);
        if (!nameA || !nameB) return "";
        let direction = Math.random() < 0.5,
          first = direction ? nameA : nameB,
          second = direction ? nameB : nameA,
          maxSliceFirst = Math.min(first.length, 4),
          sliceFirst = Math.floor(Math.random() * (maxSliceFirst - 1)) + 2,
          maxSliceSecond = Math.min(second.length, 4),
          sliceSecond = Math.floor(Math.random() * (maxSliceSecond - 1)) + 2,
          part1 = first.slice(0, sliceFirst),
          part2 = second.slice(second.length - sliceSecond),
          lastChar = part1[part1.length - 1],
          firstChar = part2[0],
          bridge = "";
        if (lastChar && firstChar) {
          let lastIsVowel = isVowel(lastChar),
            firstIsVowel = isVowel(firstChar);
          if (lastIsVowel && firstIsVowel)
            bridge = pickRandom(BRIDGE_CONSONANTS) ?? "";
          else if (!lastIsVowel && !firstIsVowel)
            bridge = pickRandom(BRIDGE_VOWELS) ?? "";
        }
        return part1 + bridge + part2;
      }
    }
  }
  function generateNamesFromBank(bank, count) {
    let names = [];
    for (let i = 0; i < count; i++) {
      let name = generateFromBank(bank);
      if (name) names.push(name);
    }
    return names;
  }
  const STRUCTURED_NAME_BANKS = { ...englishBanks };
  const NAME_BANKS = {};
  function parseNameBank(text) {
    let lines = text.split(`
`),
      columns = [];
    for (let line of lines) {
      let trimmedLine = line.trim();
      if (!trimmedLine) continue;
      let parts = trimmedLine
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      for (let i = 0; i < parts.length; i++) {
        if (!columns[i]) columns[i] = [];
        let part = parts[i];
        if (part) columns[i]?.push(part);
      }
    }
    return columns;
  }
  function generateName(columns) {
    if (columns.length === 0) return "";
    let selectedParts = [];
    for (let column of columns)
      if (column && column.length > 0) {
        let randomPart = column[Math.floor(Math.random() * column.length)];
        if (randomPart) selectedParts.push(randomPart);
      }
    return selectedParts.join(" ");
  }
  function generateNames(columns, count) {
    let names = [];
    for (let i = 0; i < count; i++) {
      let name = generateName(columns);
      if (name) names.push(name);
    }
    return names;
  }
  function getNameBankFromCard(bankName, storyCards2) {
    for (let i = 0; i < storyCards2.length; i++) {
      let card = storyCards2[i];
      if (card && (card.title === bankName || card.keys?.includes(bankName))) {
        if (card.entry) return parseNameBank(card.entry);
      }
    }
    return;
  }
  function getNamesFromNameBank(bankName, storyCards2, count) {
    let structuredBank = STRUCTURED_NAME_BANKS[bankName];
    if (structuredBank) return generateNamesFromBank(structuredBank, count);
    if (NAME_BANKS[bankName]) {
      let columns = parseNameBank(NAME_BANKS[bankName] ?? "");
      if (columns.length > 0) return generateNames(columns, count);
    }
    let cardColumns = getNameBankFromCard(bankName, storyCards2);
    if (cardColumns && cardColumns.length > 0)
      return generateNames(cardColumns, count);
    let defaultBank = STRUCTURED_NAME_BANKS.default;
    if (defaultBank) return generateNamesFromBank(defaultBank, count);
    return generateNames(parseNameBank(NAME_BANKS.default ?? ""), count);
  }
  function patternToRegex(pattern) {
    if (pattern.startsWith("*") && pattern.endsWith("*")) {
      let inner = escapeRegex2(pattern.slice(1, -1));
      return new RegExp(`\\b\\w*${inner}\\w*\\b`, "g");
    }
    if (pattern.startsWith("*")) {
      let suffix = escapeRegex2(pattern.slice(1));
      return new RegExp(`\\b\\w*${suffix}\\b`, "g");
    }
    if (pattern.endsWith("*")) {
      let prefix = escapeRegex2(pattern.slice(0, -1));
      return new RegExp(`\\b${prefix}\\w*\\b`, "g");
    }
    let exact = escapeRegex2(pattern);
    return new RegExp(`\\b${exact}\\b`, "g");
  }
  function escapeRegex2(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function extractSegment(name, segments) {
    if (segments === 0) return name;
    let parts = name.split(" ");
    if (segments > 0) {
      let idx2 = segments - 1;
      return idx2 < parts.length ? (parts[idx2] ?? name) : name;
    }
    let idx = parts.length + segments;
    return idx >= 0 ? (parts[idx] ?? name) : name;
  }
  function parseNameEntry(raw) {
    if (typeof raw !== "object" || raw === null) return;
    let obj = raw,
      prefix = typeof obj.prefix === "string" ? obj.prefix : void 0,
      id = typeof obj.id === "string" ? obj.id : void 0,
      count =
        typeof obj.count === "number" && obj.count >= 1
          ? Math.floor(obj.count)
          : void 0;
    if (!prefix || !id || !count) return;
    return { prefix, count, id };
  }
  function titleCase(str) {
    return str.replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function parseNamesFromNestedObject(obj) {
    let entries = [];
    for (let key of Object.keys(obj)) {
      let group = obj[key];
      if (typeof group !== "object" || group === null || Array.isArray(group))
        continue;
      let groupObj = group,
        id = typeof groupObj.id === "string" ? groupObj.id : void 0;
      if (!id) continue;
      let count = 3;
      if (typeof groupObj.count === "string") {
        let parsed = parseInt(groupObj.count, 10);
        if (!Number.isNaN(parsed) && parsed >= 1) count = parsed;
      } else if (typeof groupObj.count === "number" && groupObj.count >= 1)
        count = Math.floor(groupObj.count);
      entries.push({ prefix: titleCase(key), count, id });
    }
    return entries;
  }
  function parseNamesConfig(value) {
    if (Array.isArray(value)) {
      let entries = [];
      for (let i = 0; i < value.length; i++) {
        let entry = parseNameEntry(value[i]);
        if (entry) entries.push(entry);
      }
      return entries;
    }
    if (typeof value === "object" && value !== null)
      return parseNamesFromNestedObject(value);
    if (typeof value === "string" && value.trim().startsWith("["))
      try {
        let parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parseNamesConfig(parsed);
      } catch {
        return [];
      }
    return [];
  }
  const RandomNames = (() => {
    function parseReplacements(value) {
      if (typeof value !== "object" || value === null || Array.isArray(value))
        return [];
      let groups = [],
        obj = value;
      for (let key of Object.keys(obj)) {
        let group = obj[key];
        if (typeof group !== "object" || group === null || Array.isArray(group))
          continue;
        let groupObj = group,
          rawNames =
            typeof groupObj.replacenames === "string"
              ? groupObj.replacenames
              : "",
          bankId =
            typeof groupObj.replacefrom === "string"
              ? groupObj.replacefrom
              : "";
        if (!rawNames || !bankId) continue;
        let patterns = rawNames
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        if (patterns.length === 0) continue;
        let segments = 0;
        if (typeof groupObj.segments === "string") {
          if (
            ((segments = parseInt(groupObj.segments, 10)),
            Number.isNaN(segments))
          )
            segments = 0;
        } else if (typeof groupObj.segments === "number")
          segments = groupObj.segments;
        groups.push({ patterns, bankId, segments });
      }
      return groups;
    }
    function validateConfig(raw) {
      return {
        enable: booleanValidator(raw, "enable"),
        sectionHeader: stringValidator(raw, "sectionheader", "Random Names"),
        names: parseNamesConfig(raw.names),
        replacements: parseReplacements(raw.replacements),
      };
    }
    function formatNames(groups, header) {
      let lines = [header + ":"];
      for (let i = 0; i < groups.length; i++) {
        let group = groups[i];
        if (group && group.names.length > 0)
          lines.push(group.prefix + ": " + group.names.join(", "));
      }
      return lines.join(`
`);
    }
    function onContext(ctx, config, context) {
      if (!config.enable || config.names.length === 0) return ctx;
      let groups = [];
      for (let i = 0; i < config.names.length; i++) {
        let entry = config.names[i];
        if (!entry) continue;
        let names = getNamesFromNameBank(
          entry.id,
          context.storyCards,
          entry.count
        );
        if (names.length > 0) groups.push({ prefix: entry.prefix, names });
      }
      if (groups.length === 0) return ctx;
      let content =
        `

` +
        formatNames(groups, config.sectionHeader) +
        `
`;
      if (config.replacements.length > 0)
        content += `
When introducing new characters, use names from the provided name lists rather than common fantasy names.
`;
      return prependToSection(ctx, "Author's Note", content);
    }
    function onOutput(text, config, context) {
      if (!config.enable || config.replacements.length === 0) return text;
      let result = text,
        replacementCache = new Map();
      for (let i = 0; i < config.replacements.length; i++) {
        let group = config.replacements[i];
        if (!group) continue;
        for (let j = 0; j < group.patterns.length; j++) {
          let pattern = group.patterns[j];
          if (!pattern) continue;
          let regex = patternToRegex(pattern);
          result = result.replace(regex, (match) => {
            let cached = replacementCache.get(match);
            if (cached) return cached;
            let generated =
              getNamesFromNameBank(group.bankId, context.storyCards, 1)[0] ??
              "";
            if (!generated) return match;
            let replacement = extractSegment(generated, group.segments);
            return (replacementCache.set(match, replacement), replacement);
          });
        }
      }
      return result;
    }
    return {
      name: "randomNames",
      configSection: `--- Random Names ---
Enable: true
SectionHeader: Random Names
Names:
  English Masculine:
    Count: 3
    Id: englishMasculine
  English Feminine:
    Count: 3
    Id: englishFeminine
# Replace tropey names in AI output with generated names:
Replacements:
  LastNames:
    ReplaceNames: Voss, Vance, Henderson, Chen, Thorne
    ReplaceFrom: englishMasculine
    Segments: -1
  Feminine:
    ReplaceNames: Lyra, Lena, Anya, Elara, Kaela, Kaelin, Clara, Seraphina, Valeria, Sasha, Clara
    ReplaceFrom: englishFeminine
    Segments: 1
  Masculine:
    ReplaceNames: Kael, Kaelan, Valerian, Valerius
    ReplaceFrom: englishMasculine
    Segments: 1`,
      validateConfig,
      hooks: { onContext, onOutput },
    };
  })();
  const core = new FoxTweaks();
  core.registerModule(DebugStart);
  core.registerModule(DiceRoll);
  core.registerModule(Paragraph);
  core.registerModule(Redundancy);
  core.registerModule(BetterYou);
  core.registerModule(RandomNames);
  core.registerModule(DebugEnd);
  const hooks = core.createHooks(),
    FoxTweaks2 = {
      Hooks: {
        onInput: hooks.onInput,
        onContext: hooks.onContext,
        onOutput: hooks.onOutput,
      },
      Utils: {
        pinAndSortCards,
        findCard,
        getLastAction,
        getLastActionOfType,
        splitIntoSentences,
        calculateSimilarity,
      },
    },
    library_default = FoxTweaks2;
  return library_default;
})();
