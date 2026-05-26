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

      <!-- ===================== 1. WHAT ARE STORY CARDS ===================== -->
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
              Story Cards are situational context notes for the AI about characters, locations, factions, concepts, or other custom lore. 
              Unlike global settings or Plot Essentials, the AI only consults Story Cards when they actively become relevant.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Zap class="w-4 h-4 text-bd-purple" />
                  Dynamic Loading
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Triggered by case-insensitive keywords in recent inputs or outputs, only taking up context space when needed.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Coins class="w-4 h-4 text-bd-amber" />
                  Context Budget
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Ranked by frequency and recency, automatically fitting into the ~25% dynamic token budget allocated for lore.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-green" />
                  Worldbuilding
                </h3>
                <p class="text-xs text-bd-text-secondary">
                  Ideal for pre-configuring complex character relationships, faction behaviors, and detailed regional details.
                </p>
              </div>
            </div>

            <!-- Sub-topic: When to Use -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Lightbulb class="w-4 h-4 text-bd-amber" />
                When to Use Story Cards
              </h3>
              <p class="text-xs text-bd-text-secondary">
                Story Cards are optional but highly recommended to flesh out custom scenarios. Use them to:
              </p>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">Capture Elements</strong>
                  Save persistent facts about emerging characters or locations that appear during organic gameplay.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">Flesh Out Lore</strong>
                  Expand on offhand mentions (like organizations or mythical items) by writing custom background information.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">Scenario Design</strong>
                  Pre-build extensive interactive databases of lore before starting a brand-new scenario.
                </div>
              </div>
            </div>

            <!-- Sub-topic: Story Cards vs Memory Bank -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2">
                <Scale class="w-4 h-4 text-bd-cyan" />
                Story Cards vs. Memory Bank
              </h3>
              <p class="text-xs text-bd-text-secondary">
                While both manage narrative consistency, they have fundamentally distinct use cases:
              </p>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
                  <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <Layers class="w-4 h-4 text-bd-purple" />
                    Story Cards (Manual &amp; Pre-Planned)
                  </h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1.5 list-disc list-inside">
                    <li>Explicit keywords define exactly when facts load.</li>
                    <li>Highly precise, tailored description structures.</li>
                    <li>Excellent for pre-built lore database files.</li>
                    <li>Immune to organic hallucination or phrasal drift.</li>
                  </ul>
                </div>
                <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <Brain class="w-4 h-4 text-bd-green" />
                    Memory Bank (Automated History)
                  </h4>
                  <ul class="text-xs text-bd-text-secondary space-y-1.5 list-disc list-inside">
                    <li>Zero effort; automatically compresses turns as you go.</li>
                    <li>Uses semantic vector relevance matching (no keywords).</li>
                    <li>Flashes out organic changes occurring in play.</li>
                    <li>Requires occasional editing to clean up AI misphrasings.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30 text-xs text-bd-text-secondary">
              <strong>Best Practice:</strong> Use Story Cards for pre-planned structural world elements (factions, characters, magic rules) and let the automated Memory Bank capture plot progression organically.
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 2. QUICK START ===================== -->
      <section id="guide-quick-start" class="card">
        <button
          @click="toggleGuideSection('quick-start')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Quick Start: Setting Up Your First Card
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Follow these three practical steps to write a reliable, functional Story Card in minutes.
            </p>

            <!-- Step 1 -->
            <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-green/20 text-bd-green font-bold flex items-center justify-center">1</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Create the Card &amp; Title</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Navigate to **Sidebar → Story Cards** and click **Add Card**. Give it a clean **Title** (e.g. `Sir Marcus`). 
                    <em>Note: The AI never sees this title; it is strictly for your own organization.</em>
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-blue/20 text-bd-blue font-bold flex items-center justify-center">2</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Configure Case-Insensitive Triggers</h3>
                  <p class="text-xs text-bd-text-secondary">
                    In the **Triggers** field, input comma-separated trigger terms (e.g. `Marcus,sir marcus`). 
                    Do not add spaces after commas. Aim for keywords longer than 5 characters to avoid false triggers.
                  </p>
                </div>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-8 h-8 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center">3</span>
                <div class="flex-1">
                  <h3 class="font-semibold text-bd-text-primary mb-1">Compose the World Lore Entry</h3>
                  <p class="text-xs text-bd-text-secondary">
                    Write 2-4 sentences in the **Entry** field in plain English. Always repeat the name of the subject inside the entry (e.g. `Sir Marcus is a seasoned commander who wears silver plate armor. He is extremely loyal to the Queen.`).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 3. ANATOMY / HOW IT WORKS ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileText class="w-5 h-5 text-bd-blue" />
            Anatomy &amp; How It Works
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6">
            
            <!-- Anatomy breakdown -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">The Components of a Story Card</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-1.5 flex items-center gap-2">
                    <FileText class="w-4 h-4 text-bd-green" />
                    Entry (The Text Block)
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    The core facts sent to the AI when active. It is automatically prefaced with <code class="text-bd-purple">World Lore:</code> in context.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-1.5 flex items-center gap-2">
                    <Zap class="w-4 h-4 text-bd-purple" />
                    Triggers (Activators)
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Comma-separated keywords. Case-insensitive, but trailing and leading spaces are evaluated literally.
                  </p>
                </div>
              </div>

              <!-- Field Summary Table -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-xs mb-2">Field Visibility &amp; Behavior Matrix</h4>
                <div class="overflow-x-auto">
                  <table class="w-full text-xs">
                    <thead>
                      <tr class="border-b border-bd-border-subtle">
                        <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Field Name</th>
                        <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Sent to AI?</th>
                        <th class="text-left py-2 text-bd-text-primary font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody class="text-bd-text-secondary">
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Entry</td>
                        <td class="py-2 pr-4 text-bd-green font-semibold">Yes (when active)</td>
                        <td class="py-2">Prefaced as "World Lore: [Entry]" in the AI's prompt stream.</td>
                      </tr>
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Triggers</td>
                        <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                        <td class="py-2">Keywords parsed by the client engine to load the Entry dynamically.</td>
                      </tr>
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Title</td>
                        <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                        <td class="py-2">Internal tag for scenario management and editing.</td>
                      </tr>
                      <tr class="border-b border-bd-border-subtle/50">
                        <td class="py-2 pr-4 font-medium">Type</td>
                        <td class="py-2 pr-4 text-bd-pink font-semibold">No</td>
                        <td class="py-2">Categorization flag (e.g., Character, Location, Faction).</td>
                      </tr>
                      <tr>
                        <td class="py-2 pr-4 font-medium">Notes</td>
                        <td class="py-2 pr-4 text-bd-pink font-semibold">No*</td>
                        <td class="py-2">Author guidelines (*Only displayed in Character Creator templates).</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Sub-topic: Substring Trigger Matcher -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Trigger Mechanics &amp; Substring Evaluation</h3>
              <p class="text-xs text-bd-text-secondary">
                The engine evaluates triggers within the story using a substring matching framework.
              </p>
              
              <div class="p-4 rounded-lg bg-bd-warning/10 border border-bd-warning/30 space-y-3">
                <div class="flex items-start gap-3">
                  <AlertTriangle class="w-5 h-5 text-bd-warning flex-shrink-0 mt-0.5" />
                  <div class="space-y-2">
                    <h4 class="font-semibold text-bd-text-primary text-xs">Trigger Timing Pipeline</h4>
                    <ol class="text-xs text-bd-text-secondary space-y-1 list-decimal list-inside">
                      <li><strong>Player Inputs:</strong> Trigger instantly. The AI reads the matching card's Entry in the current turn.</li>
                      <li><strong>AI Outputs:</strong> Trigger for the <em>subsequent</em> turn. The output that prints a trigger term does not benefit from that card until the next prompt.</li>
                    </ol>
                  </div>
                </div>

                <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-xs">
                  <h5 class="font-semibold text-bd-text-primary mb-1">Trigger Scan Window</h5>
                  <p class="text-bd-text-secondary">
                    The engine checks a dynamic range of recent history turns based on remaining context:
                  </p>
                  <ul class="list-disc list-inside mt-1 space-y-1 text-bd-text-muted">
                    <li>At minimum, the last **4 turns** are always scanned for triggers.</li>
                    <li>If cards have >500 tokens of budget remaining, it scans more: <code class="text-bd-purple">Available Tokens / 100</code> actions are checked (e.g. 900 tokens = last 9 turns).</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Sub-topic: Token Budget & Context -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Token Budget &amp; Prioritization</h3>
              <p class="text-xs text-bd-text-secondary">
                Story Cards are classed as <strong>Dynamic Elements</strong>, meaning they reside within the flexible 30% segment of the context budget along with the Memory Bank.
              </p>
              <div class="grid md:grid-cols-2 gap-3 text-xs">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary mb-1">Card Allocation Limits</h4>
                  <p class="text-bd-text-secondary">Story Cards generally take up **~25%** of dynamic tokens. If active cards exceed this limit, the engine prioritizes them.</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <h4 class="font-semibold text-bd-text-primary mb-1">Frequency &amp; Recency Ranking</h4>
                  <p class="text-bd-text-secondary">When too many cards trigger, cards with frequent and recent matches are kept in context, while rare or older ones are pruned first.</p>
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 4. BEST PRACTICES ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Best Practices
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-6">
            
            <!-- Composing Entries -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <FileText class="w-4 h-4 text-bd-green" />
                Writing High-Quality Entries
              </h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-2 text-xs text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Plain English Prose:</strong> Avoid complex bracketed formats (e.g. W++ or JSON) inside the Entry field. Simple, concise prose gives contemporary models the best semantic understanding.</span>
                </li>
                <li class="flex items-start gap-2 text-xs text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Anchor the Subject:</strong> Repeat the card's subject name explicitly within the Entry. (Instead of "He is a knight," write "Sir Marcus is a knight".)</span>
                </li>
                <li class="flex items-start gap-2 text-xs text-bd-text-secondary">
                  <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
                  <span><strong>Position Bias:</strong> Place the most critical elements (names, relations, vital strengths) in the first and last sentences of the entry. Models pay highest attention to these locations.</span>
                </li>
              </ul>
            </div>

            <!-- Card Networks & Chained Activation -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <GitMerge class="w-4 h-4 text-bd-purple" />
                Card Networks &amp; Chained Activation
              </h3>
              <p class="text-xs text-bd-text-secondary">
                You can build responsive networks of cards that activate each other sequentially:
              </p>
              <div class="grid md:grid-cols-3 gap-3">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-purple/20 text-xs">
                  <strong class="text-bd-purple block mb-1">Cross-Referencing</strong>
                  Mention Card B's trigger in Card A's Entry. When Card A loads, the AI is prompted with Card B's keywords, increasing the likelihood that Card B triggers next turn.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/20 text-xs">
                  <strong class="text-bd-green block mb-1">Plot Essentials Priming</strong>
                  List active factions or characters in **Plot Essentials** (e.g., "Allies: Marcus, Lyra"). Because PE is always active, the AI routinely outputs those names, auto-triggering their cards.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-blue/20 text-xs">
                  <strong class="text-bd-blue block mb-1">Parent-Child Nodes</strong>
                  For huge cities or organizations, create a parent card with basic facts. Sub-cards handle specific neighborhoods or characters, triggered only when mentioned inside the parent scope.
                </div>
              </div>
            </div>

            <!-- Trigger Best Practices -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-1.5 flex items-center gap-2">
                <Target class="w-4 h-4 text-bd-blue" />
                Trigger Keyword Best Practices
              </h3>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">Minimum 5 Characters</strong>
                  Avoid short keywords like `elf` or `orc` as they match nested syllables (e.g. `shelf`, `porch`). Use spacing to isolate them if needed.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">No Post-Comma Spaces</strong>
                  Write triggers as `marcus,knight,warrior`, NOT `marcus, knight`. The space after the comma is treated as a literal trigger requirement.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-1">Singular &amp; Irregular Plurals</strong>
                  Regular plurals (e.g., `boat` -> `boats`) match automatically. For irregular plurals (e.g., `elf` -> `elves`), add both terms as separate triggers.
                </div>
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 5. ADVANCED TOPICS ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cog class="w-5 h-5 text-bd-purple" />
            Advanced Topics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            
            <!-- Sub-topic: Trigger Mastery -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Trigger Mastery &amp; Literal Space Rules</h3>
              <p class="text-xs text-bd-text-secondary">
                Triggers are highly sensitive to white-space formatting. Here is how spaces impact activation patterns:
              </p>
              
              <div class="grid md:grid-cols-4 gap-3 text-xs mb-3">
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf</code>
                  <p class="text-bd-text-muted">No spaces: matches "shelf", "myself", "elfish".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf</code>
                  <p class="text-bd-text-muted">Left space: matches " elf", " an elf", but not "shelf".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">elf&nbsp;</code>
                  <p class="text-bd-text-muted">Right space: matches "elf ", "elf's", but not "self".</p>
                </div>
                <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle text-center">
                  <code class="text-bd-purple font-mono font-bold block mb-1">&nbsp;elf&nbsp;</code>
                  <p class="text-bd-text-muted">Both spaces: only matches isolated " elf " words.</p>
                </div>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-xs space-y-2">
                <h4 class="font-semibold text-bd-text-primary">Handling Dialogues &amp; Apostrophes</h4>
                <ul class="list-disc list-inside space-y-1 text-bd-text-secondary">
                  <li><strong>Dialogue Quotes:</strong> A left-spaced trigger like <code class="text-bd-purple">&nbsp;elf</code> will fail to match spoken dialogue such as <code class="text-bd-green">"elf</code>. Workaround: add <code class="text-bd-purple">"elf</code> as a separate trigger.</li>
                  <li><strong>Apostrophes:</strong> Models often use different types of apostrophes. For <code class="text-bd-green">Andover's</code>, add variations: <code class="text-bd-purple">Andover's,Andover's,Andoverʼs</code>.</li>
                  <li><strong>Word Stubbing:</strong> Catch multiple related terms by using the word root. E.g., <code class="text-bd-purple">therap</code> will trigger on "therapy", "therapist", and "therapeutic".</li>
                </ul>
              </div>
            </div>

            <!-- Sub-topic: AI Card Generation -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">AI Card Generation &amp; Editor Modes</h3>
              <p class="text-xs text-bd-text-secondary">
                The Story Card creator includes automated generation options to help draft cards quickly.
              </p>
              
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-1 flex items-center gap-1.5">
                    <Pencil class="w-4 h-4 text-bd-blue" />
                    Details Tab (Manual Form)
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Write everything yourself. Excellent when you have custom notes to input, or when you are importing card designs from external lists.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h4 class="font-semibold text-bd-text-primary text-xs mb-1 flex items-center gap-1.5">
                    <Sparkles class="w-4 h-4 text-bd-green" />
                    Command Tab (AI Generator)
                  </h4>
                  <p class="text-xs text-bd-text-secondary">
                    Provide the card title and prompt parameters, then let the selected model build the entry content automatically.
                  </p>
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                  <strong>History Log in Notes:</strong> Toggling this on appends every generated draft, including retries, to the card's private Notes field. This ensures you never lose a great alternative generation.
                </div>
                <div class="p-3 rounded bg-bd-bg-tertiary border border-bd-border-subtle">
                  <strong>Speed Create Mode:</strong> Skip the validation steps. Once generated, the card immediately commits to database, allowing you to bulk-create dozens of world cards quickly.
                </div>
              </div>
            </div>

            <!-- Sub-topic: Command Presets -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">Command Presets</h3>
              <p class="text-xs text-bd-text-secondary">
                A **Command Preset** defines the model parameters, prompt templates, and format limits for AI-generated cards.
              </p>
              
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-3">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                    <Sparkles class="w-4 h-4 text-bd-green" />
                    Standard Preset: Basic List Prompt
                  </h4>
                  <span class="badge badge-popular">Default</span>
                </div>
                <p class="text-xs text-bd-text-secondary">
                  Generates an attributes card starting with the subject's name, formatted as one attribute per line.
                </p>
                <pre class="p-3 rounded bg-bd-bg-tertiary text-[10px] font-mono text-bd-green overflow-x-auto whitespace-pre-wrap leading-relaxed">Generate an information card for &#123;&#123;title&#125;&#125; using clearly labeled fields which are each on their own line, beginning with a field that identifies the name of &#123;&#123;title&#125;&#125;. Each field should represent characteristics of &#123;&#123;title&#125;&#125;. Limit the response to 750 characters and do not use markdown or leave empty lines.</pre>
              </div>

              <div class="p-4 rounded bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 text-xs">
                <h4 class="font-semibold text-bd-text-primary">Entry Formatting Modes</h4>
                <div class="grid md:grid-cols-3 gap-3">
                  <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                    <strong class="text-bd-text-primary block mb-0.5">None</strong>
                    Raw text is used exactly as returned by the AI generator model.
                  </div>
                  <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                    <strong class="text-bd-purple block mb-0.5">Curly Brackets { }</strong>
                    Formats output into structured curly-bracket blocks for parser compatibility.
                  </div>
                  <div class="p-2 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                    <strong class="text-bd-amber block mb-0.5">Square Brackets [ ]</strong>
                    Formats output into classic square-bracket syntax favoured by some lore authors.
                  </div>
                </div>
              </div>
            </div>

            <!-- Sub-topic: Import/Export -->
            <div class="space-y-3">
              <h3 class="font-semibold text-bd-text-primary text-sm border-b border-bd-border-subtle pb-2">JSON Import &amp; Export</h3>
              <p class="text-xs text-bd-text-secondary">
                You can export your database of cards to a JSON file or import a pre-packaged template. <strong class="text-bd-warning">Available on Web only.</strong>
              </p>

              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs">JSON Schema Example</h4>
                <pre class="p-3 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-green overflow-x-auto leading-normal">
[
  {
    "keys": "Marcus,Sir Marcus,the knight",
    "value": "Sir Marcus is a veteran commander of the Royal Guard.",
    "type": "character",
    "title": "Sir Marcus",
    "description": "Optional administrative notes go here"
  }
]</pre>
                <p class="text-[10px] text-bd-text-muted">Only <code class="text-bd-green">keys</code> (Triggers) and <code class="text-bd-green">value</code> (Entry) are strictly required for import validation.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20 text-xs text-bd-pink">
                <strong>CRITICAL WARNING:</strong> Importing a JSON file replaces your **entire current Story Card list**. It is a full overwrite, not a merge. Always export and back up your current cards before importing!
              </div>
            </div>

          </div>
        </Transition>
      </section>

      <!-- ===================== 6. TIPS & COMMON PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips &amp; Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Avoid these common configuration errors that degrade story coherence or exhaust your token budget.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Triggers Too Short
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Using basic words like `elf` or `cat` triggers the card on accidental matches like `shelf` or `catalog`.
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Add spacing rules (e.g. <code class="text-bd-purple">&nbsp;elf</code>) or choose keywords of 5+ characters.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Massive Lore Bloat
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Dumping thousands of words of backstory into one entry causes the AI to selectively ignore details.
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Restrict entries to 2-4 sentences. Group critical points at the start and end of the prose.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Invisible Titles
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Assuming the AI sees the Card Title. In reality, the AI only reads the content inside the Entry field.
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Always write the subject's name explicitly inside the Entry content block itself.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Spaces After Comma Separators
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Writing triggers with spacing like `Marcus, knight` causes the engine to literally search for " knight".
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Never leave spaces after comma delimiters: write <code class="text-bd-purple">marcus,knight</code>.
                </p>
              </div>

              <!-- Pitfall 5 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Duplicating Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Placing the exact same description in both Plot Essentials and a triggered Story Card wastes valuable tokens.
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Use PE for global, always-relevant facts, and Story Cards exclusively for conditional lore.
                </p>
              </div>

              <!-- Pitfall 6 -->
              <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4 text-bd-pink" />
                  Stale World Elements
                </h4>
                <p class="text-xs text-bd-text-secondary">
                  Keeping old relationship data active (e.g., character is still listed as a best friend after a betrayal).
                </p>
                <p class="text-xs text-bd-green mt-1">
                  <strong>Fix:</strong> Update cards dynamically as story milestones occur to prevent contradictions.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== 7. CREDITS SECTION ===================== -->
      <section id="guide-credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Credits &amp; Resources
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who created the resources, triggers, structures, and guides for Story Cards:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in storyCardsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-purple/10 text-bd-purple border border-bd-purple/20">
                  {{ name }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
              </a>
              <a href="https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs" target="_blank" class="btn btn-secondary text-xs">
                <FileText class="w-3 h-3" /> LewdLeah's AI Dungeon Docs
              </a>
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
  Layers, HelpCircle, Lightbulb, Camera, Globe, FileText, Tag, Type, Zap,
  Cog, AlertTriangle, Award, Check, Scale, Pencil,
  Download, Search, Infinity, Space, Target,
  CaseSensitive, Scissors, Quote, GitMerge, X,
  ChevronDown, ChevronUp, Info, MessageSquare,
  Brain, Coins, Sparkles, Rocket
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Are Story Cards?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Anatomy & How It Works' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'advanced-topics', label: 'Advanced Topics' },
  { id: 'pitfalls', label: 'Tips & Common Pitfalls' },
  { id: 'credits', label: 'Credits & Resources' }
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
