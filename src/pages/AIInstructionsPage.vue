<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center">
          <ScrollText class="w-5 h-5 text-bd-amber" />
        </div>
        AI Instructions
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Master the art of guiding AI behavior through custom instructions and model tuning.
      </p>
    </header>

    <!-- Tab Navigation -->
    <div class="flex gap-2 border-b border-bd-border-subtle pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
        :class="activeTab === tab.id 
          ? 'bg-bd-accent-primary/20 text-bd-accent-light' 
          : 'text-bd-text-muted hover:text-bd-text-primary hover:bg-bd-bg-tertiary'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ==================== GUIDE TAB ==================== -->
    <template v-if="activeTab === 'guide'">

      <!-- What Are AI Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-amber" />
          What Are AI Instructions?
        </h2>
        <div class="space-y-4">
          <p class="text-bd-text-secondary">
            AI Instructions (<strong>AIN</strong>) are rules that shape how the AI writes, style, pacing, behavior, and focus. 
            <strong>Pick specific lines</strong> that solve your problems; don't copy everything at once.
          </p>
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-bd-amber" />
                What They Do
              </h3>
              <ul class="text-xs text-bd-text-secondary space-y-1">
                <li>• Enforce writing styles</li>
                <li>• Control pacing & focus</li>
                <li>• Set world rules & NPC behavior</li>
                <li>• Break 4th wall if desired</li>
              </ul>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Info class="w-4 h-4 text-bd-blue" />
                Defaults
              </h3>
              <p class="text-xs text-bd-text-secondary">
                Each model has Latitude's default instructions. View them: <strong>Click output → View Context → AI Instructions</strong>
              </p>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Plus class="w-4 h-4 text-bd-green" />
                How to Add
              </h3>
              <p class="text-xs text-bd-text-secondary">
                <strong>Sidebar → Plot → Add Plot Component → AI Instructions</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How to Structure Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <FileText class="w-5 h-5 text-bd-blue" />
          Structuring Instructions
        </h2>
        <div class="space-y-4">
          <!-- Define the AI's Role -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">1. Define the AI's Persona</h3>
            <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
              You are a creative author, known for dark and brutal horror books that are exciting and thrilling.
            </div>
            <p class="text-xs text-bd-text-muted mt-2">
              Examples: Shakespeare, evil DM, snarky narrator, noir detective writer...
            </p>
          </div>

          <!-- Short vs Long Sets -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-green" />
                Short Sets
              </h3>
              <p class="text-xs text-bd-text-secondary mb-2">Best for specific themes (horror, comedy). Each line starts with "-".</p>
              <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
                <div class="text-bd-green">- Be descriptive and creative</div>
                <div class="text-bd-green">- Avoid repetition</div>
                <div class="text-bd-green">- Never write for the user</div>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-purple" />
                Long Sets
              </h3>
              <p class="text-xs text-bd-text-secondary mb-2">Group related instructions under labeled sections.</p>
              <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
                <div class="text-bd-amber">Dialogue:</div>
                <div class="text-bd-green">- Write natural dialogue</div>
                <div class="text-bd-amber mt-1">Combat:</div>
                <div class="text-bd-green">- Let injuries have consequences</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Writing Tips + AIN vs AN -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <PenTool class="w-5 h-5 text-bd-purple" />
          Writing Tips
        </h2>
        <div class="space-y-4">
          <!-- Quick Tips -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <ul class="text-xs text-bd-text-secondary space-y-1">
                <li>• <strong>Use commands:</strong> Make, Avoid, Write, Be, Remember</li>
                <li>• <strong>One idea per line</strong> ,  keep instructions short</li>
                <li>• <strong>Use brackets</strong> <code class="text-bd-amber">[ ]</code> <code class="text-bd-amber">{ }</code> to group related info</li>
              </ul>
            </div>
            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <h4 class="text-xs font-semibold text-bd-text-primary mb-1">Scope</h4>
              <p class="text-xs text-bd-text-secondary">
                AIN = global rules (whole story). For scene-specific tweaks, use 
                <router-link to="/plot-components" class="text-bd-accent-primary hover:underline">Author's Note</router-link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Common Problems & Fixes -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-pink" />
          Quick Fixes
        </h2>
        <p class="text-xs text-bd-text-muted mb-3">Put these in <strong>Author's Note</strong>. Replace 'Name' with your character.</p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Pacing</h4>
            <div class="space-y-1 text-xs">
              <div><span class="text-bd-text-muted">Faster:</span> <code class="text-bd-green">- Keep scenes moving</code></div>
              <div><span class="text-bd-text-muted">Slower:</span> <code class="text-bd-green">- Let scenes play out</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">AI Writing For You</h4>
            <div class="text-xs">
              <code class="text-bd-green">- Write ensuring 'Name' can write own dialogue</code>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Repetition</h4>
            <div class="text-xs">
              <code class="text-bd-green">- Continue where story left off</code>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Plot Armor</h4>
            <div class="text-xs">
              <code class="text-bd-green">- Let 'Name' take injuries</code>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Focus Issues</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Focus on everyone in scenes</code></div>
              <div><code class="text-bd-green">- Assume strangers & ignorance</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Style</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Write pure prose without symbols</code></div>
              <div><code class="text-bd-green">- Prioritize plot and dialogue over description</code></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Example Instruction Sets -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Drama class="w-5 h-5 text-bd-amber" />
          Example Sets
        </h2>
        
        <div class="grid md:grid-cols-2 gap-4">
          <!-- Snarky Narrator -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <MessageSquare class="w-4 h-4 text-bd-purple" />
              Snarky Narrator
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are an all-seeing narrator who breaks the 4th wall like Deadpool.
- Be sarcastic and over-the-top
- Point out when user does something stupid
- Use melodrama: "little did she know..."</div>
          </div>

          <!-- Evil DM -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Skull class="w-4 h-4 text-bd-pink" />
              Evil DM
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are an evil DM.
- Follow Murphy's Law
- Actions fail unless no sensible way to fail
- Introduce plot twists when things go well</div>
          </div>
        </div>
      </section>

      <!-- Model Settings (Advanced) -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <SlidersHorizontal class="w-5 h-5 text-bd-cyan" />
          Model Settings
          <span class="tag bg-bd-cyan/20 text-bd-cyan text-xs">Advanced</span>
        </h2>
        
        <div class="space-y-4">
          <!-- Parameters Overview -->
          <div class="grid md:grid-cols-2 gap-3">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-2">
                <Thermometer class="w-4 h-4 text-bd-pink" />
                <span class="font-medium text-bd-text-primary text-sm">Temperature</span>
                <span class="text-xs text-bd-text-muted">(0.6-1.5)</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Randomness. ↑ if bland, ↓ if incoherent.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-2">
                <Percent class="w-4 h-4 text-bd-green" />
                <span class="font-medium text-bd-text-primary text-sm">Top P</span>
                <span class="text-xs text-bd-text-muted">(0.7-1.0)</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Focus. ↓ if weird endings, ↑ if boring. Balances with Temp.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-2">
                <ListOrdered class="w-4 h-4 text-bd-amber" />
                <span class="font-medium text-bd-text-primary text-sm">Top K</span>
                <span class="text-xs text-bd-text-muted">(20-500)</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Word variety. ↑ if robotic, ↓ if nonsense.</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <div class="flex items-center gap-2 mb-2">
                <Repeat class="w-4 h-4 text-bd-purple" />
                <span class="font-medium text-bd-text-primary text-sm">Penalties (PP/FP)</span>
                <span class="text-xs text-bd-text-muted">(0-1.5)</span>
              </div>
              <p class="text-xs text-bd-text-secondary">Reduce repetition. ↑ if obsessive, ↓ if avoiding names.</p>
            </div>
          </div>

          <!-- Recommended Settings -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Cpu class="w-4 h-4 text-bd-cyan" />
              Recommended Settings <span class="text-xs text-bd-text-muted font-normal">(T/Len/P/PP/FP)</span>
            </h3>
            <div class="grid md:grid-cols-2 gap-3 text-xs">
              <div class="space-y-1">
                <div class="flex justify-between"><span class="text-bd-text-secondary">DeepSeek 3.2/Atlas:</span><code class="text-bd-green">0.7/300/0.92/0.8/0</code></div>
                <div class="flex justify-between"><span class="text-bd-text-secondary">Wayfarer Large:</span><code class="text-bd-green">1/500/0.95/0.5/0</code></div>
                <div class="flex justify-between"><span class="text-bd-text-secondary">Harbinger:</span><code class="text-bd-green">1.3/500/0.95/0.25/0</code></div>
              </div>
              <div class="space-y-1">
                <div class="flex justify-between"><span class="text-bd-text-secondary">Hearthfire:</span><code class="text-bd-green">1/500/0.95/0.4/0.4</code></div>
                <div class="flex justify-between"><span class="text-bd-text-secondary">Muse:</span><code class="text-bd-green">1/250/1/0.25/0</code></div>
                <div class="flex justify-between"><span class="text-bd-text-secondary">Madness:</span><code class="text-bd-green">1/500/0.95/0.4/0.4</code></div>
              </div>
            </div>
            <p class="text-xs text-bd-text-muted mt-2">From OffMetaGamer. DeepSeek 3.2: use ≤32k context.</p>
          </div>

          <!-- Quick Start -->
          <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Rocket class="w-4 h-4 text-bd-green" />
              Quick Start
            </h3>
            <p class="text-xs text-bd-text-secondary">
              <strong>T: 1.2</strong> • <strong>K: 300</strong> • <strong>PP/FP: 0.7</strong> ,  then adjust as you play.
            </p>
          </div>
        </div>
      </section>

      <!-- Token Optimization (Advanced) -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Coins class="w-5 h-5 text-bd-amber" />
          Token Optimization
          <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Advanced</span>
        </h2>
        
        <div class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-sm mb-2">What & Why</h3>
              <p class="text-xs text-bd-text-secondary mb-2">
                Tokens are word chunks the AI processes. Unknown words split into multiple tokens, costing more and reducing clarity.
              </p>
              <div class="text-xs">
                <span class="text-bd-green"><code>dont</code> = 1 token</span> • 
                <span class="text-bd-pink"><code>don't</code> = 2 tokens</span>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-sm mb-2">How to Optimize</h3>
              <ol class="text-xs text-bd-text-secondary space-y-1 list-decimal list-inside">
                <li>Paste instructions into a <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline">tokenizer</a></li>
                <li>Find words split into multiple tokens</li>
                <li>Replace with single-token synonyms</li>
                <li>Test ,  sometimes unoptimized works better</li>
              </ol>
              <p class="text-xs text-bd-text-muted mt-2">Capitalization & spaces matter!</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Credits & Resources -->
      <section class="card bg-gradient-to-br from-bd-purple/10 to-bd-blue/10 border-bd-purple/30">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
          <Heart class="w-5 h-5 text-bd-pink" />
          Credits & Resources
        </h2>
        <p class="text-xs text-bd-text-muted mb-3">
          Guide compiled from: <strong>OffMetaGamer</strong>, <strong>dragranis</strong>, <strong>BinKompliziert</strong>, 
          <strong>Wilmar</strong>, <strong>Le Onyx</strong>, and the AI Dungeon community.
        </p>
        <div class="flex flex-wrap gap-2">
          <a href="https://help.aidungeon.com/faq/ai-instructions" target="_blank" class="btn btn-secondary text-xs">
            <BookOpen class="w-3 h-3" /> Official Guide
          </a>
          <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="btn btn-secondary text-xs">
            <MessageSquare class="w-3 h-3" /> Discord
          </a>
          <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="btn btn-secondary text-xs">
            <Coins class="w-3 h-3" /> Tokenizer
          </a>
        </div>
      </section>

    </template>

    <!-- ==================== COLLECTION TAB ==================== -->
    <template v-if="activeTab === 'collection'">
      
      <!-- Quick Filter Buttons -->
      <div class="flex flex-wrap items-center gap-2">
        <button 
          @click="toggleQuickFilter('essential')"
          class="btn text-sm"
          :class="quickFilter === 'essential' ? 'btn-primary' : 'btn-secondary'"
        >
          <Star class="w-4 h-4" />
          Essential Only
        </button>
        <button 
          @click="toggleQuickFilter('starter')"
          class="btn text-sm"
          :class="quickFilter === 'starter' ? 'btn-primary' : 'btn-secondary'"
        >
          <Rocket class="w-4 h-4" />
          Starter Set
        </button>
        <button 
          @click="toggleQuickFilter('high-impact')"
          class="btn text-sm"
          :class="quickFilter === 'high-impact' ? 'btn-primary' : 'btn-secondary'"
        >
          <Zap class="w-4 h-4" />
          High Impact
        </button>
        <button 
          @click="toggleQuickFilter('beginner')"
          class="btn text-sm"
          :class="quickFilter === 'beginner' ? 'btn-primary' : 'btn-secondary'"
        >
          <Sparkles class="w-4 h-4" />
          Beginner Friendly
        </button>
        <div class="flex-1"></div>
        <button 
          @click="showFilters = !showFilters"
          class="btn btn-secondary text-sm"
          :class="{ 'ring-2 ring-bd-accent-primary': hasActiveFilters }"
        >
          <SlidersHorizontal class="w-4 h-4" />
          Filters
          <span v-if="hasActiveFilters" class="w-2 h-2 rounded-full bg-bd-accent-primary"></span>
        </button>
      </div>

    <!-- Search Bar -->
    <SearchBar 
      v-model="searchQuery"
      placeholder="Search AI Instructions..."
      :suggestions="searchSuggestions"
      @search="handleSearch"
    />

    <!-- Filter Panel -->
    <Transition name="slide">
      <div v-if="showFilters" class="card-elevated space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary">Advanced Filters</h3>
          <button 
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="text-sm text-bd-accent-primary hover:underline"
          >
            Clear all
          </button>
        </div>

        <!-- Category Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Category</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="category in categories" 
              :key="category.id"
              @click="toggleCategory(category.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedCategories.includes(category.id) 
                ? 'bg-bd-accent-primary/20 text-bd-accent-light border border-bd-accent-primary/30' 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <!-- Difficulty Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Difficulty</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="diff in difficulties" 
              :key="diff.id"
              @click="toggleDifficulty(diff.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedDifficulties.includes(diff.id) 
                ? diff.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ diff.label }}
            </button>
          </div>
        </div>

        <!-- Impact Filter -->
        <div>
          <h4 class="text-sm text-bd-text-muted mb-2">Impact</h4>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="imp in impacts" 
              :key="imp.id"
              @click="toggleImpact(imp.id)"
              class="tag cursor-pointer transition-all"
              :class="selectedImpacts.includes(imp.id) 
                ? imp.activeClass 
                : 'hover:bg-bd-tag-bg'"
            >
              {{ imp.label }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Results Summary -->
    <div class="flex items-center justify-between text-sm">
      <span class="text-bd-text-muted">
        Showing {{ filteredInstructions.length }} of {{ instructions.length }} instructions
      </span>
      <div class="flex items-center gap-2">
        <span class="text-bd-text-muted">Sort by:</span>
        <select 
          v-model="sortBy"
          class="select"
        >
          <option value="name">Name</option>
          <option value="category">Category</option>
          <option value="impact">Impact (High→Low)</option>
          <option value="difficulty">Difficulty</option>
        </select>
      </div>
    </div>

    <!-- Category Sections (default view - no filters active) -->
    <div v-if="!hasAnyFilters" class="space-y-8">
      <section v-for="category in categoriesWithInstructions" :key="category.id">
        <div class="flex items-center gap-3 mb-4">
          <div 
            class="w-8 h-8 rounded-lg flex items-center justify-center"
            :class="getCategoryBgClass(category.id)"
          >
            <component :is="getCategoryIcon(category.id)" class="w-4 h-4" :class="getCategoryIconClass(category.id)" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-bd-text-primary">{{ category.name }}</h2>
            <p class="text-xs text-bd-text-muted">{{ category.description }}</p>
          </div>
          <span class="ml-auto tag">{{ category.instructions.length }}</span>
        </div>
        
        <div class="grid gap-3">
          <ResourceCard 
            v-for="instruction in category.instructions" 
            :key="instruction.id"
            :resource="instruction"
          />
        </div>
      </section>
    </div>

    <!-- Filtered/Sorted Results -->
    <div v-if="hasAnyFilters" class="grid gap-3">
      <ResourceCard 
        v-for="instruction in filteredInstructions" 
        :key="instruction.id"
        :resource="instruction"
      />
      
      <!-- Empty State -->
      <div v-if="filteredInstructions.length === 0" class="text-center py-12">
        <SearchX class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No results found</h3>
        <p class="text-bd-text-secondary">
          Try adjusting your search or filters to find what you're looking for.
        </p>
        <button @click="clearAll" class="btn btn-secondary mt-4">
          Clear Search & Filters
        </button>
      </div>
    </div>

    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/ui/SearchBar.vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { 
  INSTRUCTIONS, 
  CATEGORIES,
  getEssentialInstructions,
  getStarterSet,
  getHighImpactInstructions,
  getBeginnerInstructions
} from '@/data/aiInstructions'
import { usePreferences } from '@/composables/usePreferences'
import { 
  ScrollText, SlidersHorizontal, SearchX, Layers, PenTool, Users, 
  Link, Swords, Globe, FileText, Settings, BookOpen, HelpCircle,
  Sparkles, Info, Zap, Target, Scissors, Scale, Lightbulb, Thermometer,
  ListOrdered, Percent, UserPlus, Repeat, Rocket, Wrench, Clock, UserX,
  Shield, Focus, Type, Drama, MessageSquare, Skull, ExternalLink, Star,
  AlertTriangle, Plus, Tag, Braces, Split, AlignLeft, Cpu, Coins,
  Check, X, TrendingUp, Wand2, Link2, Heart
} from 'lucide-vue-next'

const activeTab = ref('collection')

const tabs = [
  { id: 'collection', label: 'Collection', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const route = useRoute()
const { addToSearchHistory } = usePreferences()

const instructions = ref(INSTRUCTIONS)
const categories = ref(CATEGORIES)
const searchQuery = ref('')
const selectedCategories = ref([])
const selectedDifficulties = ref([])
const selectedImpacts = ref([])
const showFilters = ref(false)
const sortBy = ref('name')
const quickFilter = ref(null)

const difficulties = [
  { id: 'beginner', label: 'Beginner', activeClass: 'bg-bd-green/20 text-bd-green border border-bd-green/30' },
  { id: 'intermediate', label: 'Intermediate', activeClass: 'bg-bd-amber/20 text-bd-amber border border-bd-amber/30' },
  { id: 'advanced', label: 'Advanced', activeClass: 'bg-bd-pink/20 text-bd-pink border border-bd-pink/30' }
]

const impacts = [
  { id: 'high', label: 'High Impact', activeClass: 'bg-bd-purple/20 text-bd-purple border border-bd-purple/30' },
  { id: 'medium', label: 'Medium Impact', activeClass: 'bg-bd-blue/20 text-bd-blue border border-bd-blue/30' },
  { id: 'low', label: 'Low Impact', activeClass: 'bg-bd-tag-bg text-bd-text-muted border border-bd-border-default' }
]

// Icon component mapping
const iconComponentMap = {
  'Layers': Layers,
  'PenTool': PenTool,
  'Users': Users,
  'Link': Link,
  'Swords': Swords,
  'Globe': Globe,
  'FileText': FileText,
  'Settings': Settings
}

const categoryColorMap = {
  'complete-sets': { bg: 'bg-bd-amber/20', icon: 'text-bd-amber' },
  'writing-style': { bg: 'bg-bd-blue/20', icon: 'text-bd-blue' },
  'characterization': { bg: 'bg-bd-purple/20', icon: 'text-bd-purple' },
  'coherence': { bg: 'bg-bd-green/20', icon: 'text-bd-green' },
  'gameplay': { bg: 'bg-bd-pink/20', icon: 'text-bd-pink' },
  'world-setting': { bg: 'bg-bd-cyan/20', icon: 'text-bd-cyan' },
  'templates': { bg: 'bg-bd-amber/20', icon: 'text-bd-amber' },
  'formatting': { bg: 'bg-bd-blue/20', icon: 'text-bd-blue' }
}

const getCategoryIcon = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return iconComponentMap[category?.icon] || Layers
}

const getCategoryBgClass = (categoryId) => {
  return categoryColorMap[categoryId]?.bg || 'bg-bd-tag-bg'
}

const getCategoryIconClass = (categoryId) => {
  return categoryColorMap[categoryId]?.icon || 'text-bd-text-muted'
}

const filteredInstructions = computed(() => {
  let result = [...instructions.value]
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = getEssentialInstructions()
  } else if (quickFilter.value === 'starter') {
    result = getStarterSet()
  } else if (quickFilter.value === 'high-impact') {
    result = getHighImpactInstructions()
  } else if (quickFilter.value === 'beginner') {
    result = getBeginnerInstructions()
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(i => 
      i.name.toLowerCase().includes(query) ||
      i.description.toLowerCase().includes(query) ||
      i.tags.some(t => t.toLowerCase().includes(query))
    )
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(i => selectedCategories.value.includes(i.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(i => selectedDifficulties.value.includes(i.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(i => selectedImpacts.value.includes(i.impact))
  }
  
  // Sort
  if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'category') {
    result.sort((a, b) => a.category.localeCompare(b.category))
  } else if (sortBy.value === 'impact') {
    const impactOrder = { 'high': 0, 'medium': 1, 'low': 2 }
    result.sort((a, b) => (impactOrder[a.impact] || 3) - (impactOrder[b.impact] || 3))
  } else if (sortBy.value === 'difficulty') {
    const diffOrder = { 'beginner': 0, 'intermediate': 1, 'advanced': 2 }
    result.sort((a, b) => (diffOrder[a.difficulty] || 3) - (diffOrder[b.difficulty] || 3))
  }
  
  return result
})

const categoriesWithInstructions = computed(() => {
  return categories.value
    .map(cat => ({
      ...cat,
      instructions: instructions.value.filter(i => i.category === cat.id)
    }))
    .filter(cat => cat.instructions.length > 0)
})

const hasActiveFilters = computed(() => 
  selectedCategories.value.length > 0 || 
  selectedDifficulties.value.length > 0 || 
  selectedImpacts.value.length > 0
)

const hasAnyFilters = computed(() => 
  searchQuery.value || 
  quickFilter.value || 
  hasActiveFilters.value
)

const toggleQuickFilter = (filter) => {
  if (quickFilter.value === filter) {
    quickFilter.value = null
  } else {
    quickFilter.value = filter
    // Clear other filters when using quick filter
    selectedCategories.value = []
    selectedDifficulties.value = []
    selectedImpacts.value = []
  }
}

const toggleDifficulty = (difficultyId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  const index = selectedDifficulties.value.indexOf(difficultyId)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(difficultyId)
  }
}

const toggleImpact = (impactId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  const index = selectedImpacts.value.indexOf(impactId)
  if (index > -1) {
    selectedImpacts.value.splice(index, 1)
  } else {
    selectedImpacts.value.push(impactId)
  }
}

const searchSuggestions = computed(() => {
  const allTags = [...new Set(instructions.value.flatMap(i => i.tags))]
  return allTags.slice(0, 5)
})

const toggleCategory = (categoryId) => {
  quickFilter.value = null // Clear quick filter when using manual filters
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const clearFilters = () => {
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}

const clearAll = () => {
  searchQuery.value = ''
  selectedCategories.value = []
  selectedDifficulties.value = []
  selectedImpacts.value = []
  quickFilter.value = null
}

const handleSearch = (query) => {
  if (query.trim()) {
    addToSearchHistory(query)
  }
}

// Handle initial search query from URL
onMounted(() => {
  if (route.query.q) {
    searchQuery.value = route.query.q
  }
})
</script>
