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

      <!-- Introduction -->
      <section id="guide-intro" class="card">
        <button
          @click="toggleGuideSection('intro')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HelpCircle class="w-5 h-5 text-bd-blue" />
            What Are Plot Components?
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('intro') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('intro')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Plot components are tools that help the AI remember crucial information and follow your story's rules. 
              <strong>Managing them is the most important thing you can do</strong> for story coherence.
            </p>
            <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <p class="text-sm text-bd-text-secondary">
                <strong class="text-bd-text-primary">Key principle:</strong> The AI uses everything in context when writing, 
                so what you put in plot components has a <em>big effect</em> on where your story goes. Choose wisely!
              </p>
            </div>

            <!-- Five Plot Components Overview -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-blue" />
                The Five Plot Components
              </h3>
              <div class="overflow-x-auto">
                <table class="w-full text-xs">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Component</th>
                      <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Purpose</th>
                      <th class="text-left py-2 text-bd-text-primary font-semibold">Position in Context</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">AI Instructions</td>
                      <td class="py-2 pr-4">Behavioral rules for the AI</td>
                      <td class="py-2">Very beginning</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Plot Essentials</td>
                      <td class="py-2 pr-4">Key story facts (always present)</td>
                      <td class="py-2">After AI Instructions</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Story Summary</td>
                      <td class="py-2 pr-4">Running plot overview</td>
                      <td class="py-2">After Story Cards</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-2 pr-4 font-medium">Author's Note</td>
                      <td class="py-2 pr-4">Short-term tone/style guidance</td>
                      <td class="py-2">Near end (before last action)</td>
                    </tr>
                    <tr>
                      <td class="py-2 pr-4 font-medium">Third Person</td>
                      <td class="py-2 pr-4">Character name handling</td>
                      <td class="py-2">N/A (affects formatting)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Required Elements Note -->
            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  Plot Components are <strong>Required Elements</strong>, prioritized for inclusion in context (up to 70% of available space). They are always present unless trimmed for space. Without them, the AI relies on recent history alone, which works for casual play but may lose coherence in longer adventures.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Plot Essentials -->
      <section id="guide-plot-essentials" class="card">
        <button
          @click="toggleGuideSection('plot-essentials')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookMarked class="w-5 h-5 text-bd-green" />
            Plot Essentials (PE)
            <span class="tag bg-bd-green/20 text-bd-green text-xs">Always Relevant</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('plot-essentials') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('plot-essentials')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Use Plot Essentials for information that is <strong>always relevant</strong> throughout your story.
            </p>
            <div class="space-y-4">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <User class="w-4 h-4 text-bd-green" />
                    Character Description
                  </h3>
                  <p class="text-sm text-bd-text-secondary">
                    Your character description belongs here. <strong>Update it whenever changes occur</strong> to your character.
                  </p>
                </div>
                <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                  <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                    <Globe class="w-4 h-4 text-bd-green" />
                    World Lore
                  </h3>
                  <p class="text-sm text-bd-text-secondary">
                    Add a paragraph for world lore. Remember to <strong>update it regularly</strong> with new info and changes.
                  </p>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
                <div class="flex items-start gap-3">
                  <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 class="font-semibold text-bd-text-primary">Pro Tip: Traveling Companions</h3>
                    <p class="text-sm text-bd-text-secondary mt-1">
                      If a character is always with you, mention them in PE with a brief identifier:
                    </p>
                    <code class="text-xs text-bd-green mt-2 block bg-bd-bg-tertiary p-2 rounded">
                      Your adventuring party consists of: Bob (grumpy wizard), Frank (eldritch horror), and Twinkletoes (female talking unicorn).
                    </code>
                    <p class="text-xs text-bd-text-muted mt-2">
                      This prevents companions from "disappearing" and ensures the AI includes them in scenes.
                    </p>
                  </div>
                </div>
              </div>
              <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                <div class="flex items-start gap-3">
                  <MapPin class="w-5 h-5 text-bd-cyan mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 class="font-semibold text-bd-text-primary">High Context Tip (16k+)</h3>
                    <p class="text-sm text-bd-text-secondary mt-1">
                      With high context, the AI may try to continue old scenes. Add a "Current scene" note:
                    </p>
                    <code class="text-xs text-bd-green mt-2 block bg-bd-bg-tertiary p-2 rounded">
                      Current scene: You and Mary are at a coffee shop gossiping about Bob.
                    </code>
                    <p class="text-xs text-bd-text-muted mt-2">Update this whenever the scene changes.</p>
                  </div>
                </div>
              </div>

              <!-- Formatting Examples -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-green" />
                  Format Examples
                </h3>
                <div class="grid md:grid-cols-2 gap-3">
                  <div>
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Structured Format</h4>
                    <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                      <div>SETTING: Medieval fantasy kingdom</div>
                      <div>PROTAGONIST: Elara, elven ranger</div>
                      <div>COMPANION: Marcus, human mage</div>
                      <div>CURRENT: Traveling through marshes</div>
                    </div>
                  </div>
                  <div>
                    <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Narrative Format</h4>
                    <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
                      Elara is an elven ranger on a quest for the Sunstone. She travels with Marcus, a human mage. Lord Varen hunts them. Currently crossing the Misty Marshes.
                    </div>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-2">Both formats work. Choose what fits your scenario. Structured is easier to scan; narrative flows more naturally.</p>
              </div>

              <!-- Official Writing Tips -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Ruler class="w-4 h-4 text-bd-green" />
                  Writing Effective Plot Essentials
                </h3>
                <div class="grid md:grid-cols-2 gap-3 text-xs">
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Priming Effect</h4>
                    <p class="text-bd-text-secondary">Anything in PE <strong>primes the AI to bring it up</strong>. Only include info you want the AI to actively reference.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Use "Avoid" Not "Not"</h4>
                    <p class="text-bd-text-secondary">The AI tends to <strong>ignore negatives</strong>. Say "avoid fire" instead of "is not fire-resistant" because negation confuses models.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">Past Tense for Past Events</h4>
                    <p class="text-bd-text-secondary">Label past events explicitly. Without past tense, the AI may <strong>replay them in the present</strong>.</p>
                  </div>
                  <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-text-primary mb-1">One Topic Per Line</h4>
                    <p class="text-bd-text-secondary">Keep individual topics on their own line with the subject's name repeated for <strong>strong word-association</strong>.</p>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-3 flex items-center gap-1">
                  <Info class="w-3 h-3 flex-shrink-0" />
                  Details that only matter when a specific topic comes up are better suited for Story Cards.
                </p>
              </div>

              <!-- PE vs Story Cards vs Story Summary -->
              <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Layers class="w-4 h-4 text-bd-green" />
                  When to Use What
                </h3>
                <div class="grid md:grid-cols-3 gap-2 text-xs text-bd-text-secondary">
                  <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-green/20">
                    <h4 class="font-semibold text-bd-green mb-1">Plot Essentials</h4>
                    <p>Static key facts the AI should <strong>always</strong> know. Character details, world rules, current situation.</p>
                  </div>
                  <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-purple/20">
                    <h4 class="font-semibold text-bd-purple mb-1">Story Cards</h4>
                    <p>Conditional lore, only when <strong>triggered</strong>. Character details, locations, items that appear situationally.</p>
                  </div>
                  <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-cyan/20">
                    <h4 class="font-semibold text-bd-cyan mb-1">Story Summary</h4>
                    <p>Dynamic plot overview. What's <strong>happened</strong> so far. Can be auto-maintained or manually written.</p>
                  </div>
                </div>
                <p class="text-xs text-bd-text-muted mt-2"><strong>Rule of thumb:</strong> If the AI should always know it → Plot Essentials. If only when mentioned → Story Cards. If it's plot history → Story Summary.</p>
              </div>

              <!-- Script Access -->
              <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
                <div class="flex items-start gap-2">
                  <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                  <p class="text-xs text-bd-text-secondary">
                    <strong>Script access:</strong> Scripts can set Plot Essentials via <code class="text-bd-green">state.memory.context</code>. The API uses "context" (legacy term) while the UI uses "Plot Essentials." Script-set values take priority over UI-configured content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Author's Note -->
      <section id="guide-authors-note" class="card">
        <button
          @click="toggleGuideSection('authors-note')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Feather class="w-5 h-5 text-bd-pink" />
            Author's Note (AN)
            <span class="tag bg-bd-pink/20 text-bd-pink text-xs">Scene Setup</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('authors-note') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('authors-note')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Author's Note sets up the <strong>current scene</strong>, use it when the scene differs from your main theme or to temporarily shift focus.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Rocket class="w-4 h-4 text-bd-pink" />
                  Setting Change
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Story was on Earth, now you're in space and the AI struggles? Write a prose description of the new setting in AN.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Focus class="w-4 h-4 text-bd-pink" />
                  Theme Shift
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Want to focus on politics for this scene even though it's not the main theme? Change your "Theme:" in AN.
                </p>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-3">
                <AlertTriangle class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary">Can I Plan Future Events?</h3>
                  <p class="text-sm text-bd-text-secondary mt-1">
                    You can use AN for <strong>immediate</strong> upcoming events. But you <em>cannot</em> steer the AI long-term, if it knows what's going to happen, 
                    it wants to <strong>jump the gun and do it NOW</strong>.
                  </p>
                </div>
              </div>
            </div>

            <!-- How AN Works Internally -->
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-pink/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-pink flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-text-primary">Under the hood:</strong> AN text is wrapped in <code class="text-bd-pink">[ brackets ]</code> before being sent to the AI. 
                  In training data, brackets were used for meta-information, so the AI treats AN as <strong>descriptive instructions</strong> rather than story text. 
                  This means AN can be more technical and out-of-character than other components.
                </p>
              </div>
            </div>

            <!-- Best Practices Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Keep It Short</h4>
                <p class="text-xs text-bd-text-secondary">
                  <strong>3-4 sentences max.</strong> AN sits near the end of context where attention is highest, so overloading it makes the AI fixate on those details instead of the actual story. Very long notes risk being treated as narrative text rather than guidance.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">AN vs AI Instructions</h4>
                <p class="text-xs text-bd-text-secondary">
                  If AI Instructions is talking to customer support, Author's Note is <strong>"Can I speak to the manager?"</strong>. Use AN when AI Instructions isn't enough.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Be Expressive</h4>
                <p class="text-xs text-bd-text-secondary">
                  "Fantasy story" is too simple. Instead: <code class="text-bd-green text-[10px]">Dark fantasy-horror story. World corrupted by evil magic. Rated T for violence.</code>
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/20">
                <h4 class="text-xs font-semibold text-bd-pink mb-1">Use Tags</h4>
                <p class="text-xs text-bd-text-secondary">
                  Tags work well in AN: <code class="text-bd-green text-[10px]">Tags: noblebright, magical, fantastical, fun</code> because they're concise and model-friendly.
                </p>
              </div>
            </div>

            <!-- When to Update AN -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <RefreshCw class="w-4 h-4 text-bd-pink" />
                When to Update Author's Note
              </h3>
              <div class="grid md:grid-cols-2 gap-3 text-xs text-bd-text-secondary">
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1">Scene-Based Updates</h4>
                  <ul class="space-y-1">
                    <li>• Entering a dungeon → <code class="text-bd-green">"Dark, dangerous. Tension. Unknown threats."</code></li>
                    <li>• Tavern scene → <code class="text-bd-green">"Relaxed atmosphere. Character interactions."</code></li>
                    <li>• Battle → <code class="text-bd-green">"Action. Fast pace. Consequences."</code></li>
                  </ul>
                </div>
                <div>
                  <h4 class="font-semibold text-bd-text-primary mb-1">Mood Keywords</h4>
                  <p>Use emotional keywords the AI interprets to shape prose:</p>
                  <p class="mt-1"><code class="text-bd-green">"Melancholy"</code>, <code class="text-bd-green">"Hopeful"</code>, <code class="text-bd-green">"Desperate"</code>, <code class="text-bd-green">"Triumphant"</code></p>
                  <p class="text-bd-text-muted mt-1">Pick 2-3 key elements. Less is often more.</p>
                </div>
              </div>
            </div>

            <!-- AN Troubleshooting -->
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="text-xs font-semibold text-bd-amber mb-2">AN Troubleshooting</h4>
              <div class="grid md:grid-cols-3 gap-2 text-xs text-bd-text-secondary">
                <div><strong>AI ignores AN?</strong> Try shorter text, check for conflicts with AI Instructions, or use more specific language.</div>
                <div><strong>Tone doesn't match?</strong> Be more specific, use genre terms the AI recognizes, include example adjectives.</div>
                <div><strong>AN keeps resetting?</strong> Check if scripts are modifying it via <code class="text-bd-green">state.memory.authorsNote</code>.</div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Story Cards -->
      <section id="guide-story-cards" class="card">
        <button
          @click="toggleGuideSection('story-cards')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-purple" />
            Story Cards (SC)
            <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Triggered Info</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('story-cards') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('story-cards')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Story Cards hold information that's relevant <strong>only when triggered</strong> by keywords. 
              Use them for characters, locations, and items you encounter as the story progresses.
            </p>
            
            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <Plus class="w-4 h-4 text-bd-purple" />
                  When to Create a Story Card
                </h3>
                <ul class="text-sm text-bd-text-secondary space-y-2">
                  <li class="flex items-start gap-2">
                    <Users class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Meet an interesting character
                  </li>
                  <li class="flex items-start gap-2">
                    <MapPin class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Discover a cool location
                  </li>
                  <li class="flex items-start gap-2">
                    <Sword class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    Acquire a legendary item
                  </li>
                  <li class="flex items-start gap-2">
                    <Star class="w-4 h-4 text-bd-purple mt-0.5 flex-shrink-0" />
                    End an amazing scene you want remembered
                  </li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                  <RefreshCw class="w-4 h-4 text-bd-cyan" />
                  Maintenance
                </h3>
                <p class="text-sm text-bd-text-secondary mb-2">
                  <strong>Update your SCs regularly</strong> to fit changes in your story.
                </p>
                <p class="text-sm text-bd-text-muted">
                  The more you wait, the more optimization you'll need later.
                </p>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <p class="text-sm text-bd-text-secondary">
                <strong class="text-bd-text-primary">Want more on Story Cards?</strong> Check out our 
                <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline">Story Cards Guide</router-link> 
                for detailed trigger mechanics and best practices.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- AI Instructions -->
      <section id="guide-ai-instructions" class="card">
        <button
          @click="toggleGuideSection('ai-instructions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ScrollText class="w-5 h-5 text-bd-amber" />
            AI Instructions (AIN)
            <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Behavior Rules</span>
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('ai-instructions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ai-instructions')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">
              AI Instructions hold <strong>global rules</strong> the AI follows while writing, style, pacing, behavior, and focus.
            </p>
            <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-sm text-bd-text-secondary">
                <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline font-medium">→ See the AI Instructions Guide</router-link> 
                for structuring tips, model settings, token optimization, and ready-to-use instruction sets.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Memory Bank & Story Summary -->
      <section id="guide-memory-summary" class="card">
        <button
          @click="toggleGuideSection('memory-summary')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Database class="w-5 h-5 text-bd-cyan" />
            Memory Bank & Story Summary
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('memory-summary') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('memory-summary')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Memory System has two complementary features that work together, like how human memory combines a big-picture overview with specific detail recall.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <Brain class="w-4 h-4 text-bd-green" />
                  Memory Bank
                  <span class="tag bg-bd-green/20 text-bd-green text-xs">Automated</span>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Stores important events and details as your story progresses. Acts like an <strong>automatic Story Card system</strong> that 
                  saves details (your dog's name, where you found the Sword of Demons) and dynamically inserts them when relevant.
                </p>
                <p class="text-sm text-bd-text-muted mt-2">
                  Poorly phrased memories can cause confusion. If the AI misremembers events, 
                  <strong>review and edit your Memory Bank entries</strong> to fix the wording.
                </p>
              </div>
              
              <div class="p-4 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
                <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                  <ScrollText class="w-4 h-4 text-bd-cyan" />
                  Story Summary (Auto Summarization)
                  <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Improved</span>
                </h3>
                <p class="text-sm text-bd-text-secondary">
                  Keeps a running overview of your plot by appending new memories to the Story Summary plot component, 
                  then periodically <strong>re-summarizing</strong> for conciseness. Helps the AI track the overall story direction.
                </p>
                <p class="text-sm text-bd-text-muted mt-2">
                  Still benefits from <strong>regular maintenance</strong>. Review periodically 
                  to remove outdated info and ensure accuracy.
                </p>
              </div>
            </div>

            <!-- How It Works -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <RefreshCw class="w-4 h-4 text-bd-blue" />
                How the Memory Cycle Works
              </h3>
              <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
                <li>After every <strong>4 actions</strong>, the system summarizes that batch into a new memory</li>
                <li>New memories are appended to the <strong>Story Summary</strong> plot component</li>
                <li>When the summary grows long, it's <strong>re-summarized</strong> by an AI model to stay concise</li>
                <li>The Memory Bank uses <strong>embedding vectors</strong> (semantic similarity) to match stored memories to your current action by relevance</li>
                <li>Relevant memories are dynamically included in context (~25% of dynamic token budget)</li>
              </ol>
            </div>

            <!-- 8-Action Buffer -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Database class="w-4 h-4 text-bd-cyan" />
                The 8-Action Buffer
              </h3>
              <p class="text-xs text-bd-text-secondary mb-2">
                Your most recent 4 actions are <strong>never summarized</strong>, creating a buffer that allows editing/undoing recent actions without affecting memories.
              </p>
              <div class="grid md:grid-cols-3 gap-2 text-xs">
                <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <span class="font-semibold text-bd-text-primary">Actions 1–4</span>
                  <p class="text-bd-text-muted">Summarized at action 8</p>
                </div>
                <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <span class="font-semibold text-bd-text-primary">Actions 5–8</span>
                  <p class="text-bd-text-muted">Still in buffer at action 8</p>
                </div>
                <div class="p-2 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                  <span class="font-semibold text-bd-text-primary">Current 4 actions</span>
                  <p class="text-bd-text-muted">Always preserved in full</p>
                </div>
              </div>
            </div>

            <!-- Manual Editing with Auto Summarization -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
                <Edit class="w-4 h-4 text-bd-amber" />
                Editing with Auto Summarization
              </h3>
              <p class="text-xs text-bd-text-secondary mb-2">
                Even with Auto Summarization enabled, <strong>your edits are preserved</strong>. The re-summarization model considers your changes and incorporates them into future summaries.
              </p>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>• <strong>Edit recent actions</strong> (within buffer): Changes are considered when eventually summarized</div>
                <div>• <strong>Edit older actions</strong>: Won't auto-update — manually edit Story Summary instead</div>
                <div>• <strong>Undo recent actions</strong>: Works normally within the 4-action buffer</div>
                <div>• <strong>Existing adventures</strong>: Enabling summarizes the last ~8000 tokens as initial summary</div>
              </div>
            </div>

            <!-- Token Budget Note -->
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <div class="flex items-start gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong>Manual components still matter.</strong> The Memory System complements Plot Essentials and Story Cards but doesn't replace them. 
                  Plot Essentials are <em>always</em> included; Memory Bank entries are only included when relevant. Keep critical info in PE for guaranteed context.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED SECTION DIVIDER ===================== -->
      <div class="flex items-center gap-3 pt-4">
        <div class="h-px flex-1 bg-bd-border-subtle"></div>
        <span class="text-xs font-bold uppercase tracking-widest text-bd-text-muted">Advanced</span>
        <div class="h-px flex-1 bg-bd-border-subtle"></div>
      </div>

      <!-- Scene Transitions -->
      <section id="guide-scene-transitions" class="card">
        <button
          @click="toggleGuideSection('scene-transitions')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRightLeft class="w-5 h-5 text-bd-purple" />
            Scene Transitions
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('scene-transitions') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('scene-transitions')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              When transitioning to a new scene, write a <strong>longer input than usual</strong> to "set the scene", a paragraph 
              describing the new location, significance, or mood. This tells the AI what to focus on and helps it STOP obsessing 
              over the previous scene.
            </p>
            
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2">Scene Break Markers</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Most models understand using <code class="text-bd-green">---</code> or <code class="text-bd-green">***</code> 
                on a line by itself to denote a scene break:
              </p>
              <div class="p-3 rounded bg-bd-bg-primary font-mono text-sm text-bd-text-secondary">
                <div>Blah blah blah.</div>
                <div class="my-2 text-bd-amber">---</div>
                <div>The next morning, blah blah blah.</div>
              </div>
              <p class="text-xs text-bd-text-muted mt-3">
                These markers are common in training data. Tokenizers include many variations 
                (<code>---</code>, <code>------</code>, <code>--------------</code>) as single tokens.
              </p>
            </div>
            
            <div class="p-4 rounded-lg bg-bd-accent-primary/10 border border-bd-accent-primary/30">
              <div class="flex items-start gap-3">
                <Sparkles class="w-5 h-5 text-bd-accent-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 class="font-semibold text-bd-text-primary">BetterDungeon Feature</h3>
                  <p class="text-sm text-bd-text-secondary mt-1">
                    BetterDungeon's <strong>Markdown rendering</strong> automatically formats scene break markers 
                    (<code class="text-bd-green">---</code>, <code class="text-bd-green">***</code>) into styled horizontal 
                    dividers, making your story easier to read while keeping the raw markers intact for the AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Scripting Integration -->
      <section id="guide-scripting-integration" class="card">
        <button
          @click="toggleGuideSection('scripting-integration')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ScrollText class="w-5 h-5 text-bd-cyan" />
            Scripting Integration
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('scripting-integration') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('scripting-integration')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              Scripts can dynamically modify Plot Components via the <code class="text-bd-green">state.memory</code> object, allowing content that changes based on game state.
            </p>
            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h4 class="text-xs font-semibold text-bd-green mb-2">Plot Essentials</h4>
                <code class="text-xs text-bd-green block">state.memory.context</code>
                <p class="text-xs text-bd-text-muted mt-1">Sets Plot Essentials content. Script-set values take priority over UI content.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2">Author's Note</h4>
                <code class="text-xs text-bd-green block">state.memory.authorsNote</code>
                <p class="text-xs text-bd-text-muted mt-1">Sets Author's Note. Changes take effect on the next generation.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
                <h4 class="text-xs font-semibold text-bd-amber mb-2">Front Memory</h4>
                <code class="text-xs text-bd-green block">state.memory.frontMemory</code>
                <p class="text-xs text-bd-text-muted mt-1">Hidden text injected at the very end of context. Not accessible from UI — powerful position for immediate influence.</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
              <div class="flex items-start gap-2">
                <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  There's no direct <code class="text-bd-green">state.memory</code> property for AI Instructions. Scripts can influence AI Instructions indirectly through the context modifier hook (<code class="text-bd-green">onModelContext</code>). See the <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline font-medium">Scripts Guide</router-link> for details.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Tips & Pitfalls (merged) -->
      <section id="guide-tips-pitfalls" class="card">
        <button
          @click="toggleGuideSection('tips-pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Tips & Common Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('tips-pitfalls') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('tips-pitfalls')" class="mt-4 space-y-4">
            <!-- Quick Tips -->
            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Scissors class="w-3 h-3 text-bd-green" /> Be Terse
                </h4>
                <p class="text-xs text-bd-text-secondary">The more info in context, the less efficiently the AI uses it. <strong>Keep entries short and focused.</strong></p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <Edit class="w-3 h-3 text-bd-amber" /> Edit AI Outputs
                </h4>
                <p class="text-xs text-bd-text-secondary">Fix mixed-up characters or wrong details in the last output. The AI will catch on and follow your corrections.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="text-xs font-semibold text-bd-text-primary mb-1 flex items-center gap-1">
                  <XCircle class="w-3 h-3 text-bd-pink" /> Avoid Flashbacks
                </h4>
                <p class="text-xs text-bd-text-secondary">Flashbacks, dreams, and thought experiments confuse memory. The AI often <strong>can't separate real from imagined</strong>.</p>
              </div>
            </div>

            <!-- Make AI Remember -->
            <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h4 class="text-xs font-semibold text-bd-text-primary mb-2 flex items-center gap-1">
                <MessageCircle class="w-3 h-3 text-bd-blue" /> Make the AI Remember Something
              </h4>
              <div class="grid md:grid-cols-3 gap-2 text-xs">
                <div><span class="text-bd-text-muted">Dialogue:</span> <code class="text-bd-green">"Hey, remember when [info]?"</code></div>
                <div><span class="text-bd-text-muted">Action:</span> <code class="text-bd-green">> You think about [info]</code></div>
                <div><span class="text-bd-text-muted">Narrator:</span> <code class="text-bd-green">"of course she knows about [info]"</code></div>
              </div>
            </div>

            <!-- Common Pitfalls Grid -->
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Overloading Plot Essentials
                </h4>
                <p class="text-xs text-bd-text-secondary">Stuffing PE with every detail overwhelms the AI and wastes tokens.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Only include currently relevant info. Move situational details to Story Cards.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Never Updating Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Outdated info actively misleads the AI. Stale plot threads cause confusion.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Review after major story events. Remove resolved threads, update character states.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Duplicating Info Across Components
                </h4>
                <p class="text-xs text-bd-text-secondary">Same info in PE, AN, Story Cards, and AIN wastes tokens and causes weird emphasis.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Each piece of info belongs in ONE place. Use the right tool for the job.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Using Negatives in PE
                </h4>
                <p class="text-xs text-bd-text-secondary">"Bob is NOT evil" because the AI often ignores "not" and treats Bob as evil.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Use positive framing: "Bob is kind and trustworthy" or "Bob avoids violence."</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Ignoring Memory Bank Errors
                </h4>
                <p class="text-xs text-bd-text-secondary">Automated memories can misphrase events. Wrong memories snowball into bigger issues.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Periodically review Memory Bank entries. Edit or delete inaccurate ones.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="text-xs font-semibold text-bd-pink mb-2 flex items-center gap-1">
                  <XCircle class="w-3 h-3" /> Writing AN Like a Novel
                </h4>
                <p class="text-xs text-bd-text-secondary">Long, flowery Author's Notes cause the AI to fixate on AN instead of the story.</p>
                <p class="text-xs text-bd-green mt-1"><strong>Fix:</strong> Keep to 3-4 sentences. Use tags and keywords, not prose.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- Credits -->
      <section id="guide-credits" class="card">
        <button
          @click="toggleGuideSection('credits')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Credits & Resources
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }"
          />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
            <div class="mb-4">
              <p class="text-xs text-bd-text-muted mb-2 flex items-center gap-1.5">
                Contributors who created PEs, SSs, and ANs, or created guides for them:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span v-for="name in plotComponentsContributors" :key="name" 
                      class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-blue/10 text-bd-blue border border-bd-blue/20">
                  {{ name }}
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
                <MessageSquare class="w-3 h-3" /> Discord
              </a>
              <a href="https://github.com/LewdLeah/Multiple-Choice-Assistant/tree/main/docs" target="_blank" class="btn btn-secondary text-xs">
                <BookMarked class="w-3 h-3" /> LewdLeah's AI Dungeon Docs
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
import { PLOT_COMPONENTS_CONTRIBUTORS as plotComponentsContributors } from '@/data/contributors'
import { 
  Info, MapPin, Feather, BookMarked, ScrollText, 
  Lightbulb, Layers, HelpCircle, User, Globe, Plus,
  Users, Sword, Star, RefreshCw, MessageSquare,
  Rocket, Focus, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, Scissors, MessageCircle, XCircle, Edit, Ruler,
  ChevronDown, ChevronUp
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'intro', label: 'Intro' },
  { id: 'plot-essentials', label: 'Plot Essentials' },
  { id: 'authors-note', label: "Author's Note" },
  { id: 'story-cards', label: 'Story Cards' },
  { id: 'ai-instructions', label: 'AI Instructions' },
  { id: 'memory-summary', label: 'Memory + Summary' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'scene-transitions', label: 'Scene Transitions' },
  { id: 'scripting-integration', label: 'Scripting Integration' },
  { id: 'tips-pitfalls', label: 'Tips & Pitfalls' },
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
