<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center">
          <Bookmark class="w-5 h-5 text-bd-blue" />
        </div>
        Plot Components
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Master the backbone of your story: Plot Essentials, Author's Notes, Story Cards, and more.
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

      <!-- Introduction -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-blue" />
          What Are Plot Components?
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Plot components are tools that help the AI remember crucial information and follow your story's rules. 
          <strong>Managing them is the most important thing you can do</strong> for story coherence.
        </p>
        <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
          <p class="text-sm text-bd-text-secondary">
            <strong class="text-bd-text-primary">Key principle:</strong> The AI uses everything in context when writing, 
            so what you put in plot components has a <em>big effect</em> on where your story goes. Choose wisely!
          </p>
        </div>
      </section>

      <!-- Plot Essentials -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <BookMarked class="w-5 h-5 text-bd-green" />
          Plot Essentials (PE)
          <span class="tag bg-bd-green/20 text-bd-green text-xs">Always Relevant</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
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
        </div>
      </section>

      <!-- Author's Note -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Feather class="w-5 h-5 text-bd-pink" />
          Author's Note (AN)
          <span class="tag bg-bd-pink/20 text-bd-pink text-xs">Scene Setup</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Author's Note sets up the <strong>current scene</strong>, use it when the scene differs from your main theme or to temporarily shift focus.
        </p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
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
      </section>

      <!-- Story Cards -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Layers class="w-5 h-5 text-bd-purple" />
          Story Cards (SC)
          <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Triggered Info</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Story Cards hold information that's relevant <strong>only when triggered</strong> by keywords. 
          Use them for characters, locations, and items you encounter as the story progresses.
        </p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
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
            <router-link to="/story-cards" class="text-bd-accent-primary hover:underline">Story Cards Guide</router-link> 
            for detailed trigger mechanics and best practices.
          </p>
        </div>
      </section>

      <!-- AI Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <ScrollText class="w-5 h-5 text-bd-amber" />
          AI Instructions (AIN)
          <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Behavior Rules</span>
        </h2>
        <p class="text-bd-text-secondary mb-3">
          AI Instructions hold <strong>global rules</strong> the AI follows while writing, style, pacing, behavior, and focus.
        </p>
        <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <p class="text-sm text-bd-text-secondary">
            <router-link to="/ai-instructions" class="text-bd-accent-primary hover:underline font-medium">→ See the AI Instructions Guide</router-link> 
            for structuring tips, model settings, token optimization, and ready-to-use instruction sets.
          </p>
        </div>
      </section>

      <!-- Memory Bank & Story Summary -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Database class="w-5 h-5 text-bd-cyan" />
          Memory Bank & Story Summary
        </h2>
        
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Brain class="w-4 h-4 text-bd-green" />
              Memory Bank
              <span class="tag bg-bd-green/20 text-bd-green text-xs">Automated</span>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The memory bank is automated, you don't need to mess with it. It works in the background to keep your stories coherent.
            </p>
            <p class="text-sm text-bd-text-muted mt-2">
              <strong>Note:</strong> Don't rely solely on it. There's only so much it can store before the AI starts forgetting. 
              Managing plot components is still essential for longer stories.
            </p>
          </div>
          
          <div class="p-4 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <AlertTriangle class="w-4 h-4 text-bd-pink" />
              Story Summary
              <span class="tag bg-bd-pink/20 text-bd-pink text-xs">Use Caution</span>
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The auto-summary uses a small model that often misunderstands events, mixes up characters, and repeats entries. 
              This can degrade output quality.
            </p>
            <p class="text-sm text-bd-text-muted mt-2">
              <strong>Hand-written summaries</strong> can help since YOU can see long-term patterns the AI can't.
            </p>
          </div>
        </div>
      </section>

      <!-- Scene Transitions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <ArrowRightLeft class="w-5 h-5 text-bd-purple" />
          Scene Transitions
        </h2>
        <p class="text-bd-text-secondary mb-4">
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
      </section>

      <!-- Additional Tips -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Sparkles class="w-5 h-5 text-bd-amber" />
          Additional Coherence Tips
        </h2>
        
        <div class="space-y-4">
          <!-- Be Terse -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Scissors class="w-4 h-4 text-bd-green" />
              Be Terse
            </h3>
            <p class="text-sm text-bd-text-secondary">
              The more different info the AI has in context, the less it can use them efficiently. 
              <strong>Keep plot component entries short and focused.</strong>
            </p>
          </div>

          <!-- Make AI Remember -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <MessageCircle class="w-4 h-4 text-bd-blue" />
              Make the AI Remember Something
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Dialogue:</span>
                <code class="text-bd-green">"Hey, remember when [information]?"</code>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Action:</span>
                <code class="text-bd-green">> You remember/think about [information]</code>
              </div>
              <div class="flex items-start gap-2">
                <span class="text-bd-text-muted">Narrator:</span>
                <code class="text-bd-green">"[...] of course she knows about [information]"</code>
              </div>
            </div>
          </div>

          <!-- Avoid Confusing AI -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <XCircle class="w-4 h-4 text-bd-pink" />
              Avoid Confusing the AI
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Avoid flashbacks, dreams, and thought experiments. Once a memory is created, the AI often 
              <strong>can't distinguish what actually happened</strong> from what was imagined.
            </p>
          </div>

          <!-- Regular Updates -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <RefreshCw class="w-4 h-4 text-bd-cyan" />
              Regular Maintenance
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <strong>Remove</strong> anything you don't want referenced again</li>
              <li>• <strong>Update</strong> with new information as it develops</li>
              <li>• <strong>Remove</strong> info that was never mentioned, if it was needed, you'd have noticed it missing</li>
            </ul>
          </div>

          <!-- Edit Outputs -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Edit class="w-4 h-4 text-bd-amber" />
              Edit AI Outputs
            </h3>
            <p class="text-sm text-bd-text-secondary">
              Edit the last AI output to fix mixed-up characters, add forgotten details, or set a different story direction. 
              The AI will catch on and follow the new path.
            </p>
          </div>
        </div>
      </section>

      <!-- Credits -->
      <section class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
        <p class="text-sm text-bd-text-muted text-center">
          Guide based on community knowledge and the <strong class="text-bd-text-secondary">AI Dungeon</strong> documentation.
          <a href="https://discord.com/invite/HB2YBZYjyf" target="_blank" class="text-bd-accent-primary hover:underline ml-1">
            Join the Discord
            <ExternalLink class="w-3 h-3 inline-block ml-1" />
          </a>
        </p>
      </section>

    </template>

    <!-- ==================== TEMPLATES TAB ==================== -->
    <template v-if="activeTab === 'templates'">

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
    <div class="relative">
      <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bd-text-muted" />
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Search templates..."
        class="input pl-12"
      />
    </div>

    <!-- Filter Panel -->
    <Transition name="slide">
      <div v-if="showFilters" class="card-elevated space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-bd-text-primary">Filters</h3>
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
        Showing {{ filteredTemplates.length }} of {{ templates.length }} templates
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

    <!-- Category Sections (default view) -->
    <div v-if="!hasAnyFilters" class="grid gap-6">
      <!-- Author's Note Section -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
            <Feather class="w-4 h-4 text-bd-purple" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Author's Note</h3>
            <p class="text-xs text-bd-text-muted">Strongest influence. Style, tone, and scene guidance.</p>
          </div>
          <span class="ml-auto tag bg-bd-purple/20 text-bd-purple">{{ authorsNoteComponents.length }}</span>
        </div>
        
        <div class="space-y-3">
          <ResourceCard 
            v-for="component in authorsNoteComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </div>

      <!-- Plot Essentials Section -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
            <BookMarked class="w-4 h-4 text-bd-green" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Plot Essentials</h3>
            <p class="text-xs text-bd-text-muted">Always-relevant info: characters, relationships, world state.</p>
          </div>
          <span class="ml-auto tag bg-bd-green/20 text-bd-green">{{ plotEssentialsComponents.length }}</span>
        </div>
        
        <div class="space-y-3">
          <ResourceCard 
            v-for="component in plotEssentialsComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </div>

      <!-- Story Summary Section -->
      <div class="card">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-lg bg-bd-cyan/20 flex items-center justify-center">
            <ScrollText class="w-4 h-4 text-bd-cyan" />
          </div>
          <div>
            <h3 class="font-semibold text-bd-text-primary">Story Summary</h3>
            <p class="text-xs text-bd-text-muted">Track overall direction, arcs, and long-term goals.</p>
          </div>
          <span class="ml-auto tag bg-bd-cyan/20 text-bd-cyan">{{ storySummaryComponents.length }}</span>
        </div>
        
        <div class="space-y-3">
          <ResourceCard 
            v-for="component in storySummaryComponents" 
            :key="component.id"
            :resource="component"
          />
        </div>
      </div>
    </div>

    <!-- Filtered Results -->
    <div v-if="hasAnyFilters" class="grid gap-3">
      <ResourceCard 
        v-for="template in filteredTemplates" 
        :key="template.id"
        :resource="template"
      />
      
      <!-- Empty State -->
      <div v-if="filteredTemplates.length === 0" class="text-center py-12">
        <FileText class="w-12 h-12 text-bd-text-muted mx-auto mb-4" />
        <h3 class="text-lg font-semibold text-bd-text-primary mb-2">No templates found</h3>
        <p class="text-bd-text-secondary">
          Try adjusting your search or filters.
        </p>
        <button @click="clearAll" class="btn btn-secondary mt-4">
          Clear Filters
        </button>
      </div>
    </div>

    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { 
  TEMPLATES, 
  TEMPLATE_CATEGORIES,
  getEssentialTemplates,
  getStarterSet,
  getHighImpactTemplates
} from '@/data/plotComponents'
import { 
  Bookmark, Info, MapPin, FileText, Feather, BookMarked, ScrollText, 
  Lightbulb, Check, BookOpen, Layers, HelpCircle, User, Globe, Plus,
  Users, Sword, Star, RefreshCw, MessageSquare, Heart, Volume2, Ruler,
  Rocket, Focus, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, Scissors, MessageCircle, XCircle, Edit, SlidersHorizontal, Zap, Search,
  ExternalLink
} from 'lucide-vue-next'

const activeTab = ref('templates')

const tabs = [
  { id: 'templates', label: 'Templates', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const templates = ref(TEMPLATES)
const categories = ref(TEMPLATE_CATEGORIES)
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

// Filter templates by category
const authorsNoteComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'authors-note')
)

const plotEssentialsComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'plot-essentials')
)

const storySummaryComponents = computed(() => 
  TEMPLATES.filter(t => t.category === 'story-summary')
)

const filteredTemplates = computed(() => {
  let result = [...templates.value]
  
  // Apply quick filter first
  if (quickFilter.value === 'essential') {
    result = getEssentialTemplates()
  } else if (quickFilter.value === 'starter') {
    result = getStarterSet()
  } else if (quickFilter.value === 'high-impact') {
    result = getHighImpactTemplates()
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      t.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  // Filter by selected categories
  if (selectedCategories.value.length > 0) {
    result = result.filter(t => selectedCategories.value.includes(t.category))
  }
  
  // Filter by selected difficulties
  if (selectedDifficulties.value.length > 0) {
    result = result.filter(t => selectedDifficulties.value.includes(t.difficulty))
  }
  
  // Filter by selected impacts
  if (selectedImpacts.value.length > 0) {
    result = result.filter(t => selectedImpacts.value.includes(t.impact))
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
    selectedCategories.value = []
    selectedDifficulties.value = []
    selectedImpacts.value = []
  }
}

const toggleCategory = (categoryId) => {
  quickFilter.value = null
  const index = selectedCategories.value.indexOf(categoryId)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(categoryId)
  }
}

const toggleDifficulty = (difficultyId) => {
  quickFilter.value = null
  const index = selectedDifficulties.value.indexOf(difficultyId)
  if (index > -1) {
    selectedDifficulties.value.splice(index, 1)
  } else {
    selectedDifficulties.value.push(difficultyId)
  }
}

const toggleImpact = (impactId) => {
  quickFilter.value = null
  const index = selectedImpacts.value.indexOf(impactId)
  if (index > -1) {
    selectedImpacts.value.splice(index, 1)
  } else {
    selectedImpacts.value.push(impactId)
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
  clearFilters()
}
</script>
