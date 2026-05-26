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

      <!-- ===================== SPECIAL CHARACTER DIRECTIVES ===================== -->
      <section id="guide-what-is" class="card">
        <button
          @click="toggleGuideSection('what-is')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Special Character Directives
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary">
              AI Dungeon models were trained on billions of lines of internet documents, including markdown wikis, programming containers, and academic footnotes. Because of this, certain <strong>special symbols carry high semantic weight</strong> directly in the neural weights, letting you guide the AI without wasting verbose prose.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Hash class="w-4 h-4 text-bd-amber" />
                  Markdown Parsing
                </h3>
                <p class="text-bd-text-secondary">
                  Symbols like `#` or `##` mimic headers, naturally signaling to the LLM's attention block that high-priority directives are following.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Brackets class="w-4 h-4 text-bd-blue" />
                  Metadata Brackets
                </h3>
                <p class="text-bd-text-secondary">
                  Square brackets `[ ]` signify out-of-character guidelines or footnotes, preventing instructions from leaking directly into story text.
                </p>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Braces class="w-4 h-4 text-bd-purple" />
                  Data Containers
                </h3>
                <p class="text-bd-text-secondary">
                  Curly brackets `{ }` isolate programmatic key-value traits, stopping lore facts from bleeding across Story Cards.
                </p>
              </div>
            </div>

            <!-- Action Box Modes -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
              <h3 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
                <Terminal class="w-4 h-4 text-bd-cyan" />
                Action Box Modes Translation Pipeline
              </h3>
              <p class="text-xs text-bd-text-secondary">
                AI Dungeon's gameplay input buttons prepend standard fictional prefixes to your raw text before passing it to the AI compiler:
              </p>
              <div class="grid md:grid-cols-4 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-green block mb-0.5">&gt; Do Mode</strong>
                  Prepends `<code class="text-bd-green">&gt;</code> You ` to actions, signaling to the model that you are actively interacting with the environment.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-blue block mb-0.5">&gt; Say Mode</strong>
                  Prepends `<code class="text-bd-blue">&gt;</code> You say "` to text, prompting the AI to parse spoken character dialogue.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-purple block mb-0.5">Story Mode</strong>
                  Sends straight, unformatted prose. Ideal for environmental setups, narration, or temporal shifts.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-amber block mb-0.5">See Mode</strong>
                  Bypasses LLMs entirely, sending your raw prompt directly to stable-diffusion models to generate visual scenes.
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE SYMBOL DICTIONARY ===================== -->
      <section id="guide-anatomy" class="card">
        <button
          @click="toggleGuideSection('anatomy')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Brackets class="w-5 h-5 text-bd-blue" />
            The Symbol Dictionary
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary text-xs">
              Every special character triggers distinct statistical associations inside the model's neural layers.
            </p>

            <div class="space-y-4">
              <!-- ## Double Hash -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Hash class="w-4.5 h-4.5 text-bd-amber" />
                  <code class="text-bd-amber font-mono font-bold text-sm">##</code> Double Hash (Active Steering Commands)
                </h4>
                <p class="text-bd-text-secondary">
                  The most powerful command symbol. Used to issue direct, unavoidable active instructions at the start of a story turn.
                </p>
                <div class="text-bd-text-muted">
                  <strong>Technical reason:</strong> Mimics an `H2` header tag. Headings in pre-training data define structural topics, forcing the model to align with the command immediately.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">## Shift pacing. Fast action combat follows.</pre>
              </div>

              <!-- [] Square Brackets -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Brackets class="w-4.5 h-4.5 text-bd-blue" />
                  <code class="text-bd-blue font-mono font-bold text-sm">[ ]</code> Square Brackets (Editorial Rules)
                </h4>
                <p class="text-bd-text-secondary">
                  Guides style, mood, or background rules silently. The model incorporates these guidelines into generation without repeating the brackets or instruction text.
                </p>
                <div class="text-bd-text-muted">
                  <strong>Technical reason:</strong> Associated with translator notes, editor margins, or parenthetical footnotes in web copy.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Focus: suspenseful silence. Minimal dialogue. ]</pre>
              </div>

              <!-- {} Curly Braces -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
                <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                  <Braces class="w-4.5 h-4.5 text-bd-purple" />
                  <code class="text-bd-purple font-mono font-bold text-sm">{ }</code> Curly Braces (Lore Container)
                </h4>
                <p class="text-bd-text-secondary">
                  Organizes key-value attributes inside Story Cards (e.g. character profiles or magic thresholds) to isolate facts cleanly.
                </p>
                <div class="text-bd-text-muted">
                  <strong>Technical reason:</strong> Mimics coding dictionary formats (JSON, CSS). The model processes these as structured parameters rather than prose.
                </div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">{Name: Marcus, Role: Guard, Strength: High}</pre>
              </div>

              <!-- Inline markdown symbols -->
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Double Asterisks -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/20 space-y-1">
                  <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                    <Bold class="w-4 h-4 text-bd-pink" /> <code class="text-bd-pink font-mono">** **</code> Double Asterisks (Bold Directives)
                  </h4>
                  <p class="text-bd-text-secondary">
                    Aggressively boosts directive priority. Evaluated as bold markdown, emphasizing target instructions.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Marcus is **always** weary ]</pre>
                </div>

                <!-- Single Quotes -->
                <div class="p-4 rounded bg-bd-bg-primary border border-bd-teal/20 space-y-1">
                  <h4 class="font-semibold text-bd-teal flex items-center gap-1.5">
                    <Quote class="w-4 h-4 text-bd-teal" /> <code class="text-bd-teal font-mono">' '</code> Single Quotes (Vocabulary Anchoring)
                  </h4>
                  <p class="text-bd-text-secondary">
                    Anchors specific stylistic descriptors, forcing the AI's vocabulary choices to revolve around that concept.
                  </p>
                  <pre class="p-1.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Focus on 'melancholic' atmosphere ]</pre>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SYMBOL STACKING & NESTING ===================== -->
      <section id="guide-best-practices" class="card">
        <button
          @click="toggleGuideSection('best-practices')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Award class="w-5 h-5 text-bd-amber" />
            Symbol Stacking &amp; Nested Rules
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              Nesting symbols together allows you to compile undeniable guidelines for advanced, large parameter models.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <Hash class="w-4 h-4 text-bd-amber" /> Command + Bold Stacking (`##` + `**`)
                </h4>
                <p class="text-bd-text-secondary">
                  Forces high-level active commands. Injects a header with locked-in bold conditions:
                </p>
                <pre class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">## **Never** allow Marcus to agree with Elara.</pre>
                <p class="text-[10px] text-bd-text-muted">Tells the compiler this is an absolute narrative block limit.</p>
              </div>

              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1.5">
                  <Brackets class="w-4 h-4 text-bd-blue" /> Note + Quote Stacking (`[ ]` + `' '`)
                </h4>
                <p class="text-bd-text-secondary">
                  Locks down stylistic vocabulary terms inside hidden metadata guidelines:
                </p>
                <pre class="p-2.5 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green">[ Write in a 'rough-hewn medieval' dialect. ]</pre>
                <p class="text-[10px] text-bd-text-muted">Steers prose flavor safely without leaking rules directly into chat dialogues.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== BETTERDUNGEON EXTENSION SUPPORT ===================== -->
      <section id="guide-advanced-topics" class="card">
        <button
          @click="toggleGuideSection('advanced-topics')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-cyan" />
            BetterDungeon Extension Support
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('advanced-topics') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('advanced-topics')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Typing these symbols repeatedly during active roleplay can disrupt immersion. The <strong>BetterDungeon</strong> browser extension automates these formatting frameworks directly at input level.
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-accent-primary/30 space-y-3">
              <h4 class="font-semibold text-bd-text-primary text-xs flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-accent-primary" />
                Active Input Sub-Modes
              </h4>
              <div class="grid md:grid-cols-3 gap-3 text-xs text-bd-text-secondary">
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-0.5">Standard Direct Command</strong>
                  Pressing `Enter` automatically prepends double hashes <code class="text-bd-amber">##</code> to steering lines, framing it as an H2 header block.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-0.5">Subtle Command Mode</strong>
                  Wraps input strings in bracketed headers <code class="text-bd-blue">[## ...]</code>. Evaluated as a gentle nudge to guide next token generation.
                </div>
                <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle/50">
                  <strong class="text-bd-text-primary block mb-0.5">Out-Of-Character (OOC) Mode</strong>
                  Wraps user inputs in double parentheses: <code class="text-bd-purple">((OOC: ... | User: ))</code>. Forces the AI to respond as a GM, breaking character.
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SYMBOLS TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Symbols Troubleshooting &amp; Pitfalls
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Avoid these common scripting errors when utilizing character symbols.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Overwhelming Stacking
                </h4>
                <p class="text-bd-text-secondary">Writing strings like `[## **'Kira'** must die ]`. Stacking too many styles results in contradictory pre-training association matches.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Restrict stacking to a maximum of 2 nested symbols (e.g. `##` commands + `**` bold rules).</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Entirely Bracketed Inputs
                </h4>
                <p class="text-bd-text-secondary">Writing your active character actions inside brackets `[ Marcus walks to tavern ]`. The AI treats your actions as background metadata and skips rendering story turns.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Keep character actions in plain text. Use brackets exclusively for background rules.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Expecting Visual Rendering
                </h4>
                <p class="text-bd-text-secondary">Expecting asterisks `**` or hashes `##` to physically display bold text or headers in the AI Dungeon chat feeds.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Understand that the standard UI prints symbols as raw text, but models process markdown formats perfectly.</p>
              </div>

              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1">
                  <X class="w-4.5 h-4.5 text-bd-pink" /> Circular Directives
                </h4>
                <p class="text-bd-text-secondary">Writing direct commands in bracket notes: `[ ## Marcus fights ]`. Mixing H2 tags inside parenthetical annotations confuses parsers.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Keep commands and brackets on separate lines.</p>
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
            <Users class="w-5 h-5 text-bd-amber" />
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
                Contributors who researched, cataloged, and built command utilities for AI Dungeon symbols:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  GremmieGremlin
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  LewdLeah
                </span>
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  BetterDungeon Dev Team
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
import { 
  Info, Lightbulb, Sparkles, Zap, AlertTriangle, BookOpen, MessageSquare, Hash, Bold, Quote, FileCode, Layers, Braces, Brackets, ChevronRight, Check, Terminal, ExternalLink, ChevronDown, ChevronUp, Rocket, Award, X, Users
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-core', label: 'Semantic Steerage', isHeader: true },
  { id: 'what-is', label: 'Special Character Directives' },
  { id: 'anatomy', label: 'The Symbol Dictionary' },
  { id: 'header-stacking', label: 'Advanced Stacking', isHeader: true },
  { id: 'best-practices', label: 'Symbol Stacking & Nesting' },
  { id: 'advanced-topics', label: 'BetterDungeon UI Support' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Symbols Troubleshooting' },
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
