<template>
  <!-- Table of Contents - Sticky Sidebar -->
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all">
              <ChevronDown class="w-3 h-3" />
            </button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse all">
              <ChevronUp class="w-3 h-3" />
            </button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">
            {{ section.label }}
          </div>
          <button
            v-else
            @click="scrollToGuideSection(section.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary"
            :class="[
              isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted'
            ]"
          >
            {{ section.label }}
          </button>
        </template>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 space-y-4 min-w-0">

      <!-- ===================== GUIDE OVERVIEW BANNER ===================== -->
      <div class="card p-4 mb-4 space-y-3">
        <div class="flex items-start gap-3">
          <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-bd-purple/10 border border-bd-purple/20 flex items-center justify-center">
            <Bookmark class="w-5 h-5 text-bd-purple" />
          </div>
          <div class="flex-1 space-y-2">
            <p class="text-sm text-bd-text-secondary leading-relaxed">
              Story Cards are conditionally-injected lore entries that activate when their trigger keywords appear in recent context. They are the <strong>dynamic counterpart</strong> to Plot Essentials — dormant until needed, then loaded only when relevant.
            </p>
            <div class="flex flex-wrap gap-1.5">
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Position #3
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Dynamic Elements pool
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Substring trigger match
              </span>
              <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
                Conditional injection
              </span>
            </div>
            <div class="flex flex-wrap items-center gap-2 text-[11px] text-bd-text-muted">
              <span>Related:</span>
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">
                Plot Components
              </router-link>
              <span>&middot;</span>
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline font-medium">
                AI Instructions
              </router-link>
              <span>&middot;</span>
              <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline font-medium">
                Scripts
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- ===================== WHAT ARE STORY CARDS ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-purple" />
            What Are Story Cards?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              Story Cards are dynamic, conditional lore folders. Unlike Plot Essentials, which are always present, Story Cards remain dormant outside of context, loading only when their specified <strong>case-insensitive triggers</strong> are matching in recent turn history.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-purple" />
                  Trigger Timing Pipeline
                </h3>
                <ul class="space-y-1 text-bd-text-secondary">
                  <li>• <strong>Player Input:</strong> Match triggers instantly. The card is loaded into context for the current turn.</li>
                  <li>• <strong>AI Output:</strong> Match triggers for the subsequent turn. It is loaded on the next turn.</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Search class="w-4 h-4 text-bd-amber" />
                  The Scan Window
                </h3>
                <p class="text-bd-text-secondary">
                  The client scans a minimum of the last <strong>4 turns</strong> for triggers. If active cards take up minimal space, it automatically scales the scan window: `Available Tokens / 100` turns are checked.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-green" />
                  Lore Isolation
                </h3>
                <p class="text-bd-text-secondary">
                  Excellent for separating city maps, historical wars, and minor character metrics, freeing up tokens for core history actions.
                </p>
              </div>
            </div>

            <!-- Quick Start Steps -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Rocket class="w-4 h-4 text-bd-green" />
                Quick Start: Draft Your First Card
              </h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center mb-1">1</span>
                  <strong>Set the Title:</strong> Navigate to Story Cards → Add Card. Enter a name (e.g. `Sir Marcus`). The AI never sees this title; it is strictly admin.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center mb-1">2</span>
                  <strong>Define Triggers:</strong> In the triggers box, type comma-separated keywords (e.g. `marcus,sir marcus`). Case-insensitive, but spaces are literal.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <span class="w-5 h-5 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center mb-1">3</span>
                  <strong>Write the Entry:</strong> Write 2-4 sentences. Always explicitly write the subject name inside the entry (e.g. `Sir Marcus is a royal guard commander.`).
                </div>
              </div>
            </div>

            <!-- Context Stack Diagram (§14.1) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5 font-mono text-[11px]">
              <div class="text-[10px] font-bold uppercase tracking-widest text-bd-text-muted mb-2">Context Assembly Order</div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">AI Instructions</span>
                <span class="text-bd-text-muted text-[10px]">#1</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Plot Essentials</span>
                <span class="text-bd-text-muted text-[10px]">#2</span>
              </div>
              <div class="p-2.5 rounded border-2 border-bd-purple/60 bg-bd-purple/10 flex items-center justify-between">
                <span class="text-bd-purple font-bold">Story Cards (triggered)</span>
                <span class="text-bd-text-muted text-[10px]">#3</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Story Summary</span>
                <span class="text-bd-text-muted text-[10px]">#4</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Memory Bank (vector)</span>
                <span class="text-bd-text-muted text-[10px]">#5</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Action History</span>
                <span class="text-bd-text-muted text-[10px]">#6</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Author's Note</span>
                <span class="text-bd-text-muted text-[10px]">#7</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Last Action</span>
                <span class="text-bd-text-muted text-[10px]">#8</span>
              </div>
              <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
                <span class="text-bd-text-secondary">Front Memory (script-only)</span>
                <span class="text-bd-text-muted text-[10px]">#9</span>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== HOW IT WORKS: TRIGGER MECHANICS ===================== -->
      <section id="guide-how-it-works" class="card">
        <button
          @click="toggleGuideSection('how-it-works')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-amber" />
            How It Works: Trigger Mechanics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('how-it-works') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('how-it-works')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Story Cards use a <strong>substring match</strong> system. When any trigger keyword appears in the recent context window, the card's entry is injected into the next generation's prompt. Understanding this pipeline is key to avoiding false triggers and missed activations.
            </p>

            <!-- Flow Pipeline (§14.2) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Trigger Evaluation Pipeline
              </h4>
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <div class="px-2.5 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">
                  Player Input / AI Output
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">
                  Engine Scans Context
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">
                  Substring Match Check
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">
                  Card Activated
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-blue/20 border border-bd-blue/30 text-bd-blue font-bold">
                  Entry Injected as "World Lore:"
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-cyan/20 border border-bd-cyan/30 text-bd-cyan font-bold">
                  Next AI Generation
                </div>
              </div>
              <p class="text-[10px] text-bd-text-muted">
                <strong>Timing note:</strong> Player input triggers activate on the <em>current</em> turn. AI output triggers activate on the <em>next</em> turn — the AI cannot use a card's info in the same generation that triggered it.
              </p>
            </div>

            <!-- Scan Window Details -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Search class="w-4 h-4 text-bd-amber" />
                  The Scan Window
                </h4>
                <p class="text-bd-text-secondary">
                  The client scans a minimum of the last <strong>4 turns</strong> for triggers. If active cards take up minimal space, it automatically scales the scan window: <code class="text-bd-amber">Available Tokens / 100</code> turns are checked.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-green" />
                  Lore Isolation
                </h4>
                <p class="text-bd-text-secondary">
                  Excellent for separating city maps, historical wars, and minor character metrics, freeing up tokens for core history actions.
                </p>
              </div>
            </div>

            <!-- Token Budget -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                <Coins class="w-4 h-4 text-bd-blue" />
                Token Budget & Trimming
              </h4>
              <p class="text-bd-text-secondary mb-2">
                Story Cards share approximately <strong>~25%</strong> of the Dynamic Elements pool (the space left after Required Elements). They are among the first elements trimmed when context is tight, but within that tier, <strong>frequency and relevance</strong> determine which cards survive — not just insertion order.
              </p>
              <div class="grid md:grid-cols-3 gap-2 text-[11px]">
                <div class="p-2 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-blue block">With Memory Bank</strong>
                  <span class="text-bd-text-muted">Cards ~25% / History ~50% / Memory ~25%</span>
                </div>
                <div class="p-2 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-blue block">Without Memory Bank</strong>
                  <span class="text-bd-text-muted">Cards ~25% / History ~75%</span>
                </div>
                <div class="p-2 rounded bg-bd-bg-tertiary">
                  <strong class="text-bd-green block">Dormant Cards</strong>
                  <span class="text-bd-text-muted">Cost zero tokens — purely conditional</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileText class="w-5 h-5 text-bd-blue" />
            Anatomy &amp; Fields
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary text-xs">
              Every Story Card is composed of distinct properties. Understanding their individual visibility dictates prompt integrity.
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-2">Field Visibility &amp; Compiler Matrix</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Field Name</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Is Sent to AI?</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Compiler Action</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Entry</td>
                      <td class="py-2 pr-4 text-bd-green font-bold">Yes (when active)</td>
                      <td class="py-2">Prefaced in prompt as `World Lore: [Entry Content]`.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Triggers</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Client parses these to conditionally trigger the Entry.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Title</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Scenario creator visual organization tag.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Type</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No</td>
                      <td class="py-2">Categorization metric (Character, Location, Faction, Object).</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Notes</td>
                      <td class="py-2 pr-4 text-bd-pink font-bold">No*</td>
                      <td class="py-2">Private commentary (*Only displayed in Character Creator templates).</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TRIGGER FORMATTING MASTERY ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Trigger Formatting Mastery
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Triggers use exact character substring checks. Standardizing spacing, stubs, and pluralization prevents inactive cards and false triggers.
            </p>

            <!-- Literal Spacing Rules -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Literal Spacing Mechanics</h3>
              <p class="text-xs text-bd-text-secondary">
                How leading and trailing spaces dictate keyword evaluation:
              </p>
              <div class="grid md:grid-cols-4 gap-3 text-xs">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf</code>
                  <p class="text-bd-text-muted">No spaces: matches "elf", "myself", "shelf", "elfish". (High risk of false triggers).</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf</code>
                  <p class="text-bd-text-muted">Left space: matches " elf", "an elf", but safely blocks nested matches like "shelf".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf&nbsp;</code>
                  <p class="text-bd-text-muted">Right space: matches "elf ", "elf's", but blocks trailing nests like "self".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf&nbsp;</code>
                  <p class="text-bd-text-muted">Both spaces: strictly matches the isolated word " elf ". (Will fail on punctuation).</p>
                </div>
              </div>
            </div>

            <!-- Dialogue Quotes & Irregular Plurals -->
            <div class="grid md:grid-cols-2 gap-4 text-xs">
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Dialogue Quotes &amp; Apostrophes</h4>
                <ul class="space-y-1 list-disc list-inside text-bd-text-secondary">
                  <li><strong>Quotes Failure:</strong> Left-spaced triggers like <code class="text-bd-purple">&nbsp;elf</code> fail inside spoken dialogue: <code class="text-bd-green">"elf</code>. Add <code class="text-bd-purple">"elf</code> as a separate trigger.</li>
                  <li><strong>Apostrophes:</strong> Models output multiple quote curly glyphs. For `Marcus's`, add: <code class="text-bd-purple">Marcus's,Marcus's,Marcusʼs</code>.</li>
                  <li><strong>Word Root Stubbing:</strong> Match multiple derived vocabulary words using root stubs: <code class="text-bd-purple">therap</code> will match "therapy", "therapist", and "therapeutic".</li>
                </ul>
              </div>

              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Preventing False Nests &amp; Plurals</h4>
                <ul class="space-y-1 list-disc list-inside text-bd-text-secondary">
                  <li><strong>Short keyword risk:</strong> Keywords under 5 chars (e.g. `orc`) frequently false-trigger (e.g. `orchids`, `porch`). Always use spacing to isolate.</li>
                  <li><strong>Standard Plurals:</strong> Standard suffixes (`boat` -> `boats`) match automatically because `boat` is a substring of `boats`.</li>
                  <li><strong>Irregular Plurals:</strong> Root shifts (`elf` -> `elves`, `wolf` -> `wolves`) require writing both singular and plural triggers explicitly.</li>
                </ul>
              </div>
            </div>

            <!-- Annotated Code Breakdown (§14.6) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <FileText class="w-4 h-4 text-bd-purple" />
                Anatomy of a Good Story Card
              </h4>
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <h5 class="font-semibold text-bd-text-primary mb-1">Good Example</h5>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-green whitespace-pre-wrap leading-relaxed text-[11px]">Title: Sir Marcus
Triggers: marcus,sir marcus,the knight
Entry: Sir Marcus is a veteran
commander of the Royal Guard.
He is stoic, disciplined, and
fiercely loyal to the crown.</div>
                </div>
                <div>
                  <h5 class="font-semibold text-bd-text-primary mb-1">Bad Example</h5>
                  <div class="p-3 rounded bg-bd-bg-primary font-mono text-bd-pink whitespace-pre-wrap leading-relaxed text-[11px]">Title: Marcus Card
Triggers: marcus, knight
Entry: A brave knight who is
strong and good with a sword.
He is NOT evil and doesn't
like orcs.</div>
                </div>
              </div>
              <div class="space-y-1.5 text-[11px]">
                <div class="flex items-start gap-2">
                  <span class="text-bd-green font-bold">&checkmark;</span>
                  <span class="text-bd-text-secondary"><strong>Name in entry:</strong> "Sir Marcus is..." — the AI sees the name, not the title.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-green font-bold">&checkmark;</span>
                  <span class="text-bd-text-secondary"><strong>Multiple triggers:</strong> Covers "marcus", "sir marcus", and "the knight" — all natural in-prose references.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-green font-bold">&checkmark;</span>
                  <span class="text-bd-text-secondary"><strong>Descriptive, not prescriptive:</strong> "He is stoic" describes a trait, not a command.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-pink font-bold">&cross;</span>
                  <span class="text-bd-text-secondary"><strong>Space after comma:</strong> " marcus, knight" — the space before "knight" becomes part of the trigger.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-pink font-bold">&cross;</span>
                  <span class="text-bd-text-secondary"><strong>Negation:</strong> "NOT evil" — the AI often ignores "not" and treats the character as evil.</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="text-bd-pink font-bold">&cross;</span>
                  <span class="text-bd-text-secondary"><strong>No name in entry:</strong> "A brave knight" — who? The AI can't connect this to "Marcus."</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMPARISON & BOUNDARIES ===================== -->
      <section id="guide-comparison" class="card">
        <button
          @click="toggleGuideSection('comparison')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-bd-purple" />
            Comparison &amp; Boundaries
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('comparison') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('comparison')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary text-xs">
              Story Cards and Plot Essentials both deliver lore to the AI, but they differ fundamentally in activation model, token cost, and best use cases. Knowing where to put information prevents duplication and wasted context.
            </p>

            <!-- Decision Tree SVG (§14.4) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs mb-3">
                <GitBranch class="w-4 h-4 text-bd-purple" />
                Story Card or Plot Essentials?
              </h4>
              <svg viewBox="0 0 580 280" class="w-full h-auto" role="img" aria-label="Decision tree: whether to use a Story Card or Plot Essentials for a given piece of information">
                <!-- Root -->
                <rect x="190" y="10" width="200" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-purple)" stroke-width="2" />
                <text x="290" y="33" text-anchor="middle" class="fill-bd-text-primary"
                      style="font: 600 12px monospace">Where does this info belong?</text>

                <!-- Level 1 lines -->
                <line x1="290" y1="46" x2="290" y2="70" stroke="var(--bd-border-default)" />
                <line x1="290" y1="70" x2="100" y2="70" stroke="var(--bd-border-default)" />
                <line x1="290" y1="70" x2="480" y2="70" stroke="var(--bd-border-default)" />
                <line x1="100" y1="70" x2="100" y2="90" stroke="var(--bd-border-default)" />
                <line x1="480" y1="70" x2="480" y2="90" stroke="var(--bd-border-default)" />

                <!-- Level 1 labels -->
                <text x="170" y="66" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Always relevant"</text>
                <text x="400" y="66" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Only sometimes"</text>

                <!-- Level 1 leaves -->
                <rect x="20" y="90" width="160" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
                <text x="100" y="113" text-anchor="middle" class="fill-bd-blue"
                      style="font: 600 11px monospace">Plot Essentials</text>

                <rect x="400" y="90" width="160" height="36" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-purple)" stroke-width="1.5" />
                <text x="480" y="113" text-anchor="middle" class="fill-bd-purple"
                      style="font: 600 11px monospace">Story Card</text>

                <!-- Level 2: "Always relevant" splits -->
                <line x1="100" y1="126" x2="100" y2="150" stroke="var(--bd-border-default)" />
                <line x1="100" y1="150" x2="40" y2="150" stroke="var(--bd-border-default)" />
                <line x1="100" y1="150" x2="160" y2="150" stroke="var(--bd-border-default)" />
                <line x1="40" y1="150" x2="40" y2="170" stroke="var(--bd-border-default)" />
                <line x1="160" y1="150" x2="160" y2="170" stroke="var(--bd-border-default)" />

                <text x="60" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Writing style"</text>
                <text x="140" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Facts / lore"</text>

                <rect x="0" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-amber)" stroke-width="1.5" />
                <text x="40" y="191" text-anchor="middle" class="fill-bd-amber"
                      style="font: 600 10px monospace">AI Instructions</text>

                <rect x="120" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
                <text x="160" y="191" text-anchor="middle" class="fill-bd-blue"
                      style="font: 600 10px monospace">Plot Essentials</text>

                <!-- Level 2: "Only sometimes" splits -->
                <line x1="480" y1="126" x2="480" y2="150" stroke="var(--bd-border-default)" />
                <line x1="480" y1="150" x2="420" y2="150" stroke="var(--bd-border-default)" />
                <line x1="480" y1="150" x2="540" y2="150" stroke="var(--bd-border-default)" />
                <line x1="420" y1="150" x2="420" y2="170" stroke="var(--bd-border-default)" />
                <line x1="540" y1="150" x2="540" y2="170" stroke="var(--bd-border-default)" />

                <text x="440" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Triggered by name"</text>
                <text x="520" y="146" text-anchor="middle" class="fill-bd-text-muted"
                      style="font: 10px monospace">"Script-injected"</text>

                <rect x="380" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-purple)" stroke-width="1.5" />
                <text x="420" y="191" text-anchor="middle" class="fill-bd-purple"
                      style="font: 600 10px monospace">Story Card</text>

                <rect x="500" y="170" width="80" height="32" rx="8"
                      fill="var(--bd-bg-primary)" stroke="var(--bd-red)" stroke-width="1.5" />
                <text x="540" y="191" text-anchor="middle" class="fill-bd-red"
                      style="font: 600 10px monospace">Front Memory</text>
              </svg>
              <p class="text-[10px] text-bd-text-muted mt-2">
                If the information is always relevant (character names, world rules), it belongs in Plot Essentials. If it only matters when a specific name or keyword appears, use a Story Card. Writing style rules go in AI Instructions. Hidden script-injected status goes in Front Memory.
              </p>
            </div>

            <!-- Comparison Matrix (§14.5) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-xs mb-3 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-purple" />
                Story Card vs Plot Essentials
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Attribute</th>
                      <th class="text-left py-2 pr-4 text-bd-purple font-semibold">Story Cards</th>
                      <th class="text-left py-2 text-bd-blue font-semibold">Plot Essentials</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Activation</td>
                      <td class="py-2 pr-4">Conditional (trigger match)</td>
                      <td class="py-2">Always on</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Token cost when dormant</td>
                      <td class="py-2 pr-4">Zero</td>
                      <td class="py-2">Always consumes tokens</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Context position</td>
                      <td class="py-2 pr-4">#3 (Dynamic Elements)</td>
                      <td class="py-2">#2 (Required Elements)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Trimming priority</td>
                      <td class="py-2 pr-4">Flexible (dropped first)</td>
                      <td class="py-2">High priority (kept longer)</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Best for</td>
                      <td class="py-2 pr-4">Situational lore, conditional NPCs, locations</td>
                      <td class="py-2">Permanent facts, protagonist, companions</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-4 font-semibold text-bd-text-primary">Quantity limit</td>
                      <td class="py-2 pr-4">Effectively unlimited</td>
                      <td class="py-2">One field, ~70% budget cap</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cog class="w-5 h-5 text-bd-purple" />
            Presets &amp; Integrations
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            
            <!-- Details vs Command Tab -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">AI Generation Tabs</h3>
              <p class="text-xs text-bd-text-secondary">
                The Story Card creator includes automated generation tabs to draft content quickly:
              </p>
              <div class="grid md:grid-cols-2 gap-4 text-xs">
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20">
                  <strong class="text-bd-blue block mb-1">Details Tab (Manual Creation)</strong>
                  Write everything yourself in prose. Highly recommended to maintain exact control.
                </div>
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20">
                  <strong class="text-bd-green block mb-1">Command Tab (AI Generation pass)</strong>
                  Input the title and a quick prompt parameter, and allow a dedicated background model to generate card content.
                </div>
              </div>
            </div>

            <!-- Command Presets -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Command Presets &amp; Templates</h3>
              <p class="text-xs text-bd-text-secondary">
                Custom presets shape the AI generator's prompt template. The standard template leverages the `{{title}}` token:
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green whitespace-pre-wrap leading-relaxed">Generate an information card for &#123;&#123;title&#125;&#125; using clearly labeled fields which are each on their own line, beginning with a field that identifies the name of &#123;&#123;title&#125;&#125;. Limit response to 750 characters, avoid markdown, and do not leave empty lines.</pre>
              
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-border-subtle text-xs space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Card Formatting Modes</h4>
                <div class="grid md:grid-cols-3 gap-2">
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-text-primary block mb-0.5">None</strong>
                    Prose is saved exactly as returned. (Best for general models).
                  </div>
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-purple block mb-0.5">Curly Brackets { }</strong>
                    Formats output into structured bracket blocks for parser compatibility.
                  </div>
                  <div class="p-2.5 rounded bg-bd-bg-tertiary">
                    <strong class="text-bd-amber block mb-0.5">Square Brackets [ ]</strong>
                    Formats attributes as classic `[Marcus: Stoic rogue knight]` parameters.
                  </div>
                </div>
              </div>
            </div>

            <!-- JSON Import/Export -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">JSON Import &amp; Export Specifications</h3>
              <p class="text-xs text-bd-text-secondary">
                You can import scenarios and card folders in standard JSON formats (Web only):
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-normal">
[
  {
    "keys": "Marcus,Sir Marcus,the knight",
    "value": "Sir Marcus is a veteran commander of the Royal Guard.",
    "type": "character",
    "title": "Sir Marcus"
  }
]</pre>
              <p class="text-[10px] text-bd-text-muted">Only `keys` (Triggers) and `value` (Entry) are strictly mandatory for compiler import validation.</p>
              
              <div class="p-3 rounded bg-bd-pink/10 border border-bd-pink/20 text-xs text-bd-pink">
                <strong>CRITICAL OVERWRITE WARNING:</strong> Importing a JSON card file replaces your <strong>entire active Story Card list</strong>. It is a destructive full overwrite, not a merge. Always export a backup of your current scenario cards before importing a new file!
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING & DIAGNOSTICS ===================== -->
      <section id="guide-troubleshooting" class="card">
        <button
          @click="toggleGuideSection('troubleshooting')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wrench class="w-5 h-5 text-bd-purple" />
            Troubleshooting &amp; Diagnostics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('troubleshooting') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('troubleshooting')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              When Story Cards fail to trigger or bloat your prompts, the issue is almost always one of three things: trigger formatting errors, token budget overflow, or false-positive substring matches. Use this diagnostic flow to isolate the root cause.
            </p>

            <!-- Flow Pipeline (§14.2) -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Diagnostic Workflow
              </h4>
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <div class="px-2.5 py-1.5 rounded bg-bd-pink/20 border border-bd-pink/30 text-bd-pink font-bold">
                  Card Not Triggering
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-teal/20 border border-bd-teal/30 text-bd-teal font-bold">
                  View Context
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">
                  Check Triggers
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">
                  Fix Formatting
                </div>
                <span class="text-bd-text-muted">&rarr;</span>
                <div class="px-2.5 py-1.5 rounded bg-bd-purple/20 border border-bd-purple/30 text-bd-purple font-bold">
                  Validate 3-5 Turns
                </div>
              </div>
              <p class="text-[10px] text-bd-text-muted">If the card still doesn't trigger, check for token budget overflow — other cards may be consuming all available Dynamic Elements space.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-teal/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <Eye class="w-4 h-4 text-bd-teal" />
                  View Context Analysis
                </h4>
                <p class="text-bd-text-secondary mb-2">
                  <strong>Click any AI turn output &rarr; View Context</strong> to see the exact text sent to the LLM.
                </p>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li>Confirm whether your card's entry appears as "World Lore:"</li>
                  <li>Check if triggers are matching but entry was trimmed for budget</li>
                  <li>Verify no false-positive cards are consuming token space</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-amber/30">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2 flex items-center gap-2">
                  <AlertTriangle class="w-4 h-4 text-bd-amber" />
                  Common Diagnostic Findings
                </h4>
                <ul class="text-[11px] text-bd-text-muted list-disc list-inside space-y-1">
                  <li><strong>Space after comma:</strong> "marcus, knight" &rarr; second trigger is " knight" (with space).</li>
                  <li><strong>Too short:</strong> "orc" matches "porch", "orchids", "torch" — wasting context.</li>
                  <li><strong>Name not in entry:</strong> Card triggered but AI ignored it because entry doesn't name the subject.</li>
                  <li><strong>Budget exhausted:</strong> Other active cards consumed all Dynamic Elements space.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMMON PITFALLS ===================== -->
      <section id="guide-common-pitfalls" class="card">
        <button
          @click="toggleGuideSection('common-pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('common-pitfalls') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('common-pitfalls')" class="mt-4 space-y-4 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Post-Comma Spacing
                </h4>
                <p class="text-bd-text-secondary">Writing triggers as <code class="text-bd-pink">marcus, knight</code>. The engine interprets the space literally and searches for " knight" (with a leading space).</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Strip all spaces: write <code class="text-bd-purple">marcus,knight</code>.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Overlapping Keywords
                </h4>
                <p class="text-bd-text-secondary">Setting triggers <code class="text-bd-pink">castle</code> on Card A, and <code class="text-bd-pink">black castle</code> on Card B. When "black castle" is written, both cards trigger, wasting context.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Make keywords distinct, or separate concepts.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Invisible Titles
                </h4>
                <p class="text-bd-text-secondary">Assuming the AI reads the Card Title. In reality, the AI only reads content inside the Entry field.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Always write the subject's name explicitly inside the Entry prose.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Massive Card Bloat
                </h4>
                <p class="text-bd-text-secondary">Writing 500+ words in a single card entry. It eats up the entire dynamic budget, stopping other cards from triggering.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Limit entries to 2-4 sentences max. Put the most important info at the start and end.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Duplicating Plot Essentials
                </h4>
                <p class="text-bd-text-secondary">Putting the same info in both PE and Story Cards. Wastes token budget and can cause weird emphasis.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> PE for always-relevant facts. Story Cards for situational lore that only matters when triggered.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1.5 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Never Reviewing Cards
                </h4>
                <p class="text-bd-text-secondary">Creating cards early in the story and never updating them. Outdated info causes contradictions.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Review cards periodically. Remove dead characters, update relationships, fix outdated details.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREDITS SECTION ===================== -->
      <section id="credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Users class="w-5 h-5 text-bd-purple" />
            Credits
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who researched, cataloged, and built command utilities for Story Cards:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in storyCardsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
                  {{ name }}
                </span>
              </div>
            </div>
          </div>
        </Transition>
      </section>

    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { STORY_CARDS_CONTRIBUTORS as storyCardsContributors } from '@/data/contributors'
import { 
  Layers, HelpCircle, Lightbulb, FileText, Zap, Cog, AlertTriangle, Award, Check, Pencil, Download, Search, Target, X, ChevronDown, ChevronUp, Info, MessageSquare, Brain, Coins, Sparkles, Rocket, Users,
  GitBranch, GitMerge, Bookmark, Wrench, Eye, ArrowRightLeft, Globe
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-understanding', label: 'Understanding', isHeader: true },
  { id: 'what-is', label: 'What Are Story Cards?' },
  { id: 'how-it-works', label: 'How It Works: Trigger Mechanics' },
  { id: 'anatomy', label: 'Anatomy & Fields' },
  { id: 'header-practice', label: 'Practical Use', isHeader: true },
  { id: 'best-practices', label: 'Trigger Formatting Mastery' },
  { id: 'comparison', label: 'Comparison & Boundaries' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced-topics', label: 'Presets & Integrations' },
  { id: 'troubleshooting', label: 'Troubleshooting & Diagnostics' },
  { id: 'common-pitfalls', label: 'Common Pitfalls' },
  { id: 'credits', label: 'Credits' }
]

// Track which guide sections are expanded (all expanded by default)
const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) {
    expandedGuideSections.value.delete(sectionId)
  } else {
    expandedGuideSections.value.add(sectionId)
  }
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = (sectionId) => expandedGuideSections.value.has(sectionId)

const scrollToGuideSection = (sectionId) => {
  const element = document.getElementById(`guide-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(sectionId)) {
      expandedGuideSections.value.add(sectionId)
      expandedGuideSections.value = new Set(expandedGuideSections.value)
    }
  }
}

const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
