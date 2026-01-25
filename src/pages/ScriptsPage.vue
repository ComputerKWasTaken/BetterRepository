<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-cyan/20 flex items-center justify-center">
          <Code class="w-5 h-5 text-bd-cyan" />
        </div>
        Scripts
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Extend AI Dungeon with custom JavaScript to modify context, input, and output.
      </p>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-white/[0.06] pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-white/[0.06]'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">

      <!-- Introduction -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-blue" />
          What Are Scripts?
        </h2>
        <p class="text-bd-text-secondary mb-4">
          The scripting feature allows you to <strong>add additional features or modify existing features</strong> by 
          changing the model's context or output. You can also modify the player's input and the opening story.
        </p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Check class="w-4 h-4 text-bd-green" />
              What Scripts Can Do
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• Modify player input before processing</li>
              <li>• Inject dynamic content into context</li>
              <li>• Format and post-process AI output</li>
              <li>• Manage story cards programmatically</li>
              <li>• Track game state across turns</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-bd-amber" />
              Important Notes
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• Scripts use <strong>JavaScript</strong> (no async)</li>
              <li>• Added to <strong>scenarios</strong>, not adventures</li>
              <li>• All adventures inherit scenario scripts</li>
              <li>• Updates affect all existing adventures</li>
            </ul>
          </div>
        </div>
        <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30 mt-4">
          <div class="flex items-start gap-3">
            <AlertTriangle class="w-5 h-5 text-bd-pink mt-0.5 flex-shrink-0" />
            <p class="text-sm text-bd-text-secondary">
              <strong class="text-bd-text-primary">Warning:</strong> Updating scripts in a published scenario 
              is <strong>not recommended</strong> as it affects all existing adventures using that scenario.
            </p>
          </div>
        </div>
      </section>

      <!-- Modifier Structure -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Braces class="w-5 h-5 text-bd-purple" />
          Modifier Structure
        </h2>
        <p class="text-bd-text-secondary mb-4">
          All modifiers follow the same basic structure. The <code class="text-bd-green">text</code> parameter 
          contains the content you're modifying, and you return an object with the modified text.
        </p>
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
          <pre class="text-sm text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-purple">const</span> <span class="text-bd-cyan">modifier</span> = (<span class="text-bd-amber">text</span>) => {
  <span class="text-bd-text-muted">// This is an empty modifier.</span>
  <span class="text-bd-text-muted">// Code normally goes here.</span>
  <span class="text-bd-purple">return</span> { <span class="text-bd-amber">text</span> };
};

<span class="text-bd-cyan">modifier</span>(<span class="text-bd-amber">text</span>)</pre>
        </div>
      </section>

      <!-- Script Files -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <FileCode class="w-5 h-5 text-bd-cyan" />
          Script Files
        </h2>
        
        <div class="space-y-4">
          <!-- Library -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Library class="w-4 h-4 text-bd-purple" />
              Library
              <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Runs First</span>
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              The library <strong>isn't a modifier</strong>, but runs before every modifier. Use it to define 
              functions and values needed globally. You can write your entire code here and call it from modifiers.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Define helper functions here</span><br>
              <span class="text-bd-purple">function</span> <span class="text-bd-cyan">myHelper</span>() { ... }
            </div>
          </div>

          <!-- Input -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ArrowRightToLine class="w-4 h-4 text-bd-green" />
              Input Modifier
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Can <strong>change, view, or replace</strong> the player's input. Player actions have the format 
              <code class="text-bd-green">\n> You ...\n</code> where <code>...</code> is the action. Story actions do not have this format.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Process commands, transform input</span><br>
              <span class="text-bd-purple">if</span> (text.includes(<span class="text-bd-green">"/roll"</span>)) { ... }
            </div>
          </div>

          <!-- Context -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-blue" />
              Context Modifier
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Can <strong>change, view, or replace</strong> the context sent to the AI. 
              <strong>Cannot</strong> view or modify AI Instructions directly.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Inject dynamic content</span><br>
              text = <span class="text-bd-green">`[Stats: HP ${hp}]\n`</span> + text;
            </div>
          </div>

          <!-- Output -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ArrowLeftToLine class="w-4 h-4 text-bd-amber" />
              Output Modifier
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Similar to input modifier, but for the <strong>AI's output</strong> instead. 
              Use for formatting and post-processing.
            </p>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto">
              <span class="text-bd-text-muted">// Format output, extract info</span><br>
              text = text.replace(<span class="text-bd-green">/\n{3,}/g</span>, <span class="text-bd-green">"\n\n"</span>);
            </div>
          </div>
        </div>
      </section>

      <!-- Global Variables -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Database class="w-5 h-5 text-bd-green" />
          Global Variables & State
        </h2>
        <p class="text-bd-text-secondary mb-4">
          AI Dungeon provides several pre-existing variables. The most useful is <code class="text-bd-green">info.actionCount</code> 
          which contains the number of turns that have taken place.
        </p>
        
        <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30 mb-4">
          <div class="flex items-start gap-3">
            <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
            <p class="text-sm text-bd-text-secondary">
              <strong class="text-bd-text-primary">Note:</strong> The first real turn is <code class="text-bd-green">'2'</code>, 
              not <code class="text-bd-green">'1'</code>. This can be unintuitive when you're getting started.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
          <h3 class="font-semibold text-bd-text-primary mb-3">Defining Custom Global Variables</h3>
          <p class="text-sm text-bd-text-secondary mb-3">Put this in your <strong>Library</strong> to initialize persistent state:</p>
          <pre class="text-sm text-bd-text-secondary font-mono overflow-x-auto"><span class="text-bd-text-muted">// Initialize with default values if not set</span>
state.myCustomString = state.myCustomString || <span class="text-bd-green">''</span>;
state.myCustomBoolean = state.myCustomBoolean || <span class="text-bd-purple">false</span>;
state.playerHP = state.playerHP || <span class="text-bd-amber">100</span>;</pre>
          <p class="text-xs text-bd-text-muted mt-3">
            This pattern ensures variables persist across turns without resetting.
          </p>
        </div>
      </section>

      <!-- Utility Functions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-cyan" />
          Useful Utility Functions
          <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">By LewdLeah</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          These functions make story card management much easier. Add them to your <strong>Library</strong>.
        </p>

        <!-- buildCard -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] mb-4">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Plus class="w-4 h-4 text-bd-green" />
            buildCard() - Create Story Cards
          </h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            Creates a new story card with all properties set properly:
          </p>
          <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto mb-3">
            <pre>function buildCard(title = "", entry = "", type = "character", 
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
}</pre>
          </div>
          <div class="p-3 rounded bg-bd-green/10 border border-bd-green/30">
            <p class="text-xs text-bd-text-muted mb-2">Example usage:</p>
            <pre class="text-xs text-bd-text-secondary font-mono">const exampleCard = buildCard("Example!");
exampleCard.entry = "Hello, world!";
log(exampleCard);</pre>
          </div>
        </div>

        <!-- getCard -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Search class="w-4 h-4 text-bd-blue" />
            getCard() - Find Story Cards
          </h3>
          <p class="text-sm text-bd-text-secondary mb-3">
            Like <code class="text-bd-green">Array.find</code> but specialized for story cards:
          </p>
          <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-text-secondary overflow-x-auto mb-3">
            <pre>function getCard(predicate, getAll = false) {
    if (typeof predicate !== "function") {
        throw new Error("getCard: function required");
    } else if (typeof getAll !== "boolean") {
        throw new Error("getCard: boolean required for getAll");
    } else if (getAll) {
        const collectedCards = [];
        for (const card of storyCards) {
            if (predicate(card)) {
                Object.seal(card);
                collectedCards.push(card);
            }
        }
        return collectedCards;
    }
    for (const card of storyCards) {
        if (predicate(card)) {
            return Object.seal(card);
        }
    }
    return null;
}</pre>
          </div>
          <div class="p-3 rounded bg-bd-blue/10 border border-bd-blue/30">
            <p class="text-xs text-bd-text-muted mb-2">Example usage:</p>
            <pre class="text-xs text-bd-text-secondary font-mono">const card = getCard(c => c.title === "Example!");
if (card !== null) {
    card.entry = "Goodbye, cruel world!";
}</pre>
          </div>
        </div>
      </section>

      <!-- Troubleshooting -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Bug class="w-5 h-5 text-bd-pink" />
          Troubleshooting
        </h2>
        
        <div class="space-y-4">
          <!-- Dangerous Scripts -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <ShieldAlert class="w-4 h-4 text-bd-amber" />
              "Dangerous Scripts" Setting
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              New accounts have "dangerous scripts" <strong>disabled by default</strong>. Many useful scripts 
              (including Auto Cards) are classified as "dangerous" even though they're safe.
            </p>
            <p class="text-sm text-bd-text-muted">
              <strong>Fix:</strong> Go to Account Settings → Enable "Run Dangerous Scripts"
            </p>
          </div>

          <!-- Context Viewer Bug -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Eye class="w-4 h-4 text-bd-pink" />
              Context Viewer Shows Wrong Data
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              The context viewer can be misleading! <code class="text-bd-green">state.memory</code> modifications 
              (like <code>frontMemory</code>, <code>authorsNote</code>) may not appear in "Show Context" even when working.
            </p>
            <p class="text-sm text-bd-text-muted">
              <strong>Note:</strong> This commonly confuses new scripters. If your <code>log()</code> output shows 
              the correct values, your script is likely working even if the viewer doesn't show it.
            </p>
          </div>

          <!-- Take a Turn vs Continue -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <RefreshCw class="w-4 h-4 text-bd-cyan" />
              Take a Turn vs Continue
            </h3>
            <p class="text-sm text-bd-text-secondary mb-2">
              Some <code class="text-bd-green">state.memory</code> modifications may only work on <strong>Continue</strong> 
              and not on <strong>Take a Turn</strong>. This is a known quirk.
            </p>
            <p class="text-sm text-bd-text-muted">
              <strong>Workaround:</strong> Modify <code>text</code> directly in the context modifier instead of 
              relying solely on <code>state.memory</code>.
            </p>
          </div>
        </div>
      </section>

      <!-- Useful Links -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <ExternalLink class="w-5 h-5 text-bd-accent-primary" />
          Useful Links
        </h2>
        <div class="grid md:grid-cols-2 gap-4">
          <a 
            href="https://github.com/latitudegames/Scripting" 
            target="_blank"
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
          >
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <FileCode class="w-4 h-4 text-bd-accent-primary" />
              Official Documentation
            </h3>
            <p class="text-sm text-bd-text-muted">Latitude's official scripting repository and examples</p>
          </a>
          <a 
            href="https://docs.google.com/document/d/1DV6b0K-a5mTBpO1-ZbMSaXFOJxGi5MnNnHQCHF0c-DQ" 
            target="_blank"
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
          >
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-bd-blue" />
              Scripting Guidebook
            </h3>
            <p class="text-sm text-bd-text-muted">Comprehensive community scripting guide</p>
          </a>
          <a 
            href="https://github.com/LewdLeah/AI-Dungeon-Auto-Cards" 
            target="_blank"
            class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06] hover:border-bd-accent-primary/50 transition-colors group"
          >
            <h3 class="font-semibold text-bd-text-primary mb-1 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-purple" />
              Auto Cards
            </h3>
            <p class="text-sm text-bd-text-muted">Automatic story card management by LewdLeah</p>
          </a>
        </div>
      </section>

    </template>

    <!-- ==================== COLLECTION TAB ==================== -->
    <template v-if="activeTab === 'collection'">

    <!-- Warning Notice -->
    <section class="card border-bd-warning/30">
      <div class="flex items-start gap-3">
        <AlertTriangle class="w-5 h-5 text-bd-warning flex-shrink-0 mt-0.5" />
        <div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Advanced Feature</h3>
          <p class="text-sm text-bd-text-secondary">
            Scripts require familiarity with AI Dungeon's scripting system. 
            Make sure to backup your scenarios before applying scripts.
          </p>
        </div>
      </div>
    </section>

    <!-- Coming Soon Notice -->
    <section class="card-elevated border-bd-info/30">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-info/20 flex items-center justify-center flex-shrink-0">
          <Construction class="w-6 h-6 text-bd-info" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">Scripts Collection Coming Soon!</h2>
          <p class="text-bd-text-secondary mb-4">
            I'm curating a collection of useful scripts for AI Dungeon. 
            Planned categories include:
          </p>
          <ul class="space-y-2 text-sm text-bd-text-secondary">
            <li class="flex items-center gap-2">
              <Dices class="w-4 h-4 text-bd-purple" />
              <span><strong>Dice & RNG Systems</strong> - Roll dice, random events, probability systems</span>
            </li>
            <li class="flex items-center gap-2">
              <Clock class="w-4 h-4 text-bd-blue" />
              <span><strong>Time & Calendar</strong> - Day/night cycles, scheduling, time tracking</span>
            </li>
            <li class="flex items-center gap-2">
              <Heart class="w-4 h-4 text-bd-error" />
              <span><strong>Relationship Trackers</strong> - NPC affinity and relationship systems</span>
            </li>
            <li class="flex items-center gap-2">
              <Backpack class="w-4 h-4 text-bd-amber" />
              <span><strong>Inventory Systems</strong> - Item management and crafting</span>
            </li>
            <li class="flex items-center gap-2">
              <Swords class="w-4 h-4 text-bd-error" />
              <span><strong>Combat Enhancements</strong> - HP tracking, status effects, combat flow</span>
            </li>
            <li class="flex items-center gap-2">
              <Wand2 class="w-4 h-4 text-bd-cyan" />
              <span><strong>Magic Systems</strong> - Mana, spell slots, cooldowns</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Script Categories Preview -->
    <section>
      <div class="section-header mb-4">
        <FolderOpen class="w-4 h-4" />
        <span>Script Categories</span>
      </div>

      <div class="grid md:grid-cols-3 gap-4">
        <div v-for="category in scriptCategories" :key="category.name" class="card group">
          <div class="flex items-center gap-3 mb-3">
            <div 
              class="w-10 h-10 rounded-xl flex items-center justify-center"
              :class="category.bgClass"
            >
              <component :is="category.icon" class="w-5 h-5" :class="category.iconClass" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">{{ category.name }}</h3>
              <span class="text-xs text-bd-text-muted">{{ category.count }} scripts</span>
            </div>
          </div>
          <p class="text-sm text-bd-text-secondary">{{ category.description }}</p>
          <div class="mt-3 flex items-center justify-between">
            <span class="badge badge-new">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Contribute CTA -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <GitPullRequest class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Share Your Scripts!</h3>
          <p class="text-bd-text-secondary mb-4">
            Created useful scripts? Just paste them in a GitHub issue and I'll add them to the collection.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <GitPullRequest class="w-4 h-4" />
            Submit Your Script
          </router-link>
        </div>
      </div>
    </section>

    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Code, AlertTriangle, Construction, Dices, Clock, Heart, Backpack,
  Swords, Wand2, FolderOpen, BookOpen, GitPullRequest, HelpCircle, Check,
  Braces, FileCode, Library, ArrowRightToLine, Layers, ArrowLeftToLine,
  Database, Lightbulb, Wrench, Plus, Search, Bug, ShieldAlert, Eye,
  RefreshCw, ExternalLink, Settings
} from 'lucide-vue-next'

const activeTab = ref('collection')

const tabs = [
  { id: 'collection', label: 'Collection', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const scriptCategories = [
  {
    name: 'Game Systems',
    icon: Dices,
    description: 'Dice rolling, random events, and probability-based mechanics.',
    count: 0,
    bgClass: 'bg-bd-purple/20',
    iconClass: 'text-bd-purple'
  },
  {
    name: 'Tracking & State',
    icon: Clock,
    description: 'Time, inventory, relationships, and persistent state management.',
    count: 0,
    bgClass: 'bg-bd-blue/20',
    iconClass: 'text-bd-blue'
  },
  {
    name: 'Combat & Action',
    icon: Swords,
    description: 'Combat systems, HP tracking, and action resolution.',
    count: 0,
    bgClass: 'bg-bd-error/20',
    iconClass: 'text-bd-error'
  },
  {
    name: 'Magic & Abilities',
    icon: Wand2,
    description: 'Spell systems, mana management, and special abilities.',
    count: 0,
    bgClass: 'bg-bd-cyan/20',
    iconClass: 'text-bd-cyan'
  },
  {
    name: 'Formatting',
    icon: Settings,
    description: 'Output formatting, text processing, and display enhancements.',
    count: 0,
    bgClass: 'bg-bd-green/20',
    iconClass: 'text-bd-green'
  },
  {
    name: 'Utilities',
    icon: FolderOpen,
    description: 'Helper functions, debugging tools, and general utilities',
    count: 0,
    bgClass: 'bg-bd-amber/20',
    iconClass: 'text-bd-amber'
  }
]
</script>
