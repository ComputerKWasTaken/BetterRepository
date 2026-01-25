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
          The Backbone of Your Story
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Want your story to stay coherent? The most important thing you can do is <strong>manage your plot components</strong>. 
          These tools help the AI remember crucial information and follow your story's rules.
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

      <!-- Story Cards -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Layers class="w-5 h-5 text-bd-purple" />
          Story Cards (SC)
          <span class="tag bg-bd-purple/20 text-bd-purple text-xs">Occasionally Relevant</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Story Cards hold information that's relevant <strong>only when triggered</strong>. 
          Anything that doesn't need to always be in context should go in a Story Card.
        </p>
        
        <div class="grid md:grid-cols-2 gap-4 mb-4">
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
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
          <span class="tag bg-bd-amber/20 text-bd-amber text-xs">Scenario Rules</span>
        </h2>
        <p class="text-bd-text-secondary mb-4">
          AI Instructions hold <strong>scenario-specific rules</strong> the AI should follow while writing.
        </p>
        
        <div class="space-y-3 mb-4">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] flex items-start gap-3">
            <MessageSquare class="w-4 h-4 text-bd-amber mt-1 flex-shrink-0" />
            <div class="text-sm">
              <span class="text-bd-text-secondary">Peasants talking like modern teenagers?</span>
              <span class="text-bd-text-muted"> → Add a line about dialect/speech patterns</span>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] flex items-start gap-3">
            <Heart class="w-4 h-4 text-bd-amber mt-1 flex-shrink-0" />
            <div class="text-sm">
              <span class="text-bd-text-secondary">Everyone too nice?</span>
              <span class="text-bd-text-muted"> → Add rules about moral ambiguity</span>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] flex items-start gap-3">
            <Volume2 class="w-4 h-4 text-bd-amber mt-1 flex-shrink-0" />
            <div class="text-sm">
              <span class="text-bd-text-secondary">Not enough sound descriptions?</span>
              <span class="text-bd-text-muted"> → Add a line about sensory details</span>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] flex items-start gap-3">
            <Ruler class="w-4 h-4 text-bd-amber mt-1 flex-shrink-0" />
            <div class="text-sm">
              <span class="text-bd-text-secondary">Using wrong measurement system?</span>
              <span class="text-bd-text-muted"> → Specify your world's units</span>
            </div>
          </div>
        </div>

        <p class="text-sm text-bd-text-muted">
          With a good instruction set, you shouldn't need frequent updates. But add new rules as they emerge.
        </p>
        
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06] mt-4">
          <p class="text-sm text-bd-text-secondary">
            <strong class="text-bd-text-primary">Want more on AI Instructions?</strong> Check out our 
            <router-link to="/ai-instructions" class="text-bd-accent-primary hover:underline">AI Instructions Guide</router-link> 
            for comprehensive structuring and tuning tips.
          </p>
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
          Author's Note sets up the current scene when it differs from your main theme, or to temporarily shift focus.
          <strong>This should be the last thing you touch</strong>—handle other components first.
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
                You can use AN for <strong>immediate</strong> upcoming events. But you <em>cannot</em> steer the AI long-term this way—if it knows what's going to happen, 
                it wants to <strong>jump the gun and do it NOW</strong>. The only way to lead to a desired outcome is manual tweaking along the way.
              </p>
            </div>
          </div>
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
              The memory bank is automated—you don't need to mess with it. It works in the background to keep your stories coherent.
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
          When transitioning to a new scene, write a <strong>longer input than usual</strong> to "set the scene"—a paragraph 
          describing the new location, significance, or mood. This tells the AI what to focus on and helps it STOP obsessing 
          over the previous scene.
        </p>
        
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <RefreshCw class="w-4 h-4 text-bd-cyan" />
              Regular Maintenance
            </h3>
            <ul class="text-sm text-bd-text-secondary space-y-1">
              <li>• <strong>Remove</strong> anything you don't want referenced again</li>
              <li>• <strong>Update</strong> with new information as it develops</li>
              <li>• <strong>Remove</strong> info that was never mentioned—if it was needed, you'd have noticed it missing</li>
            </ul>
          </div>

          <!-- Edit Outputs -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
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

    </template>

    <!-- ==================== TEMPLATES TAB ==================== -->
    <template v-if="activeTab === 'templates'">

    <!-- Placement Guide -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <Info class="w-5 h-5 text-bd-info" />
        Understanding Plot Component Placements
      </h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div 
          v-for="placement in placements" 
          :key="placement.id"
          class="p-4 rounded-xl bg-bd-bg-primary border border-white/[0.06]"
        >
          <div class="flex items-center gap-3 mb-2">
            <component :is="getPlacementIcon(placement.icon)" class="w-4 h-4 text-bd-accent-primary" />
            <h3 class="font-semibold text-bd-text-primary">{{ placement.name }}</h3>
            <span class="tag text-[10px]" :class="getStrengthClass(placement.strength)">
              {{ placement.strength }}
            </span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-2">{{ placement.description }}</p>
          <div class="text-xs text-bd-text-muted flex items-center gap-1">
            <MapPin class="w-3 h-3" />
            {{ placement.position }}
          </div>
        </div>
      </div>
    </section>

    <!-- Components Grid -->
    <section>
      <div class="section-header mb-4">
        <FileText class="w-4 h-4" />
        <span>Available Components</span>
      </div>

      <div class="grid gap-4">
        <!-- Author's Note Section -->
        <div class="card">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center">
              <Feather class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Author's Note Templates</h3>
              <p class="text-xs text-bd-text-muted">Short guidance for style, tone, and genre</p>
            </div>
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
              <h3 class="font-semibold text-bd-text-primary">Plot Essentials Templates</h3>
              <p class="text-xs text-bd-text-muted">Character info, relationships, and ongoing plot points</p>
            </div>
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
              <h3 class="font-semibold text-bd-text-primary">Story Summary Templates</h3>
              <p class="text-xs text-bd-text-muted">Track your story's overall direction</p>
            </div>
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
    </section>

    <!-- Tips Section -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <Lightbulb class="w-5 h-5 text-bd-warning" />
        Pro Tips
      </h2>
      <ul class="space-y-3 text-sm text-bd-text-secondary">
        <li class="flex items-start gap-2">
          <Check class="w-4 h-4 text-bd-success mt-0.5 flex-shrink-0" />
          <span><strong class="text-bd-text-primary">Author's Note</strong> has the strongest influence since it appears near the end of context. Keep it concise!</span>
        </li>
        <li class="flex items-start gap-2">
          <Check class="w-4 h-4 text-bd-success mt-0.5 flex-shrink-0" />
          <span><strong class="text-bd-text-primary">Plot Essentials</strong> is great for character sheets and relationship tracking.</span>
        </li>
        <li class="flex items-start gap-2">
          <Check class="w-4 h-4 text-bd-success mt-0.5 flex-shrink-0" />
          <span><strong class="text-bd-text-primary">Story Summary</strong> works well with Auto Summarization to keep the AI on track.</span>
        </li>
        <li class="flex items-start gap-2">
          <Check class="w-4 h-4 text-bd-success mt-0.5 flex-shrink-0" />
          <span>Don't overload any single component—spread information across appropriate locations.</span>
        </li>
      </ul>
    </section>

    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ResourceCard from '@/components/ui/ResourceCard.vue'
import { INSTRUCTIONS, PLACEMENTS } from '@/data/repository'
import { 
  Bookmark, Info, MapPin, FileText, Feather, BookMarked, ScrollText, 
  Lightbulb, Check, BookOpen, Layers, HelpCircle, User, Globe, Plus,
  Users, Sword, Star, RefreshCw, MessageSquare, Heart, Volume2, Ruler,
  Rocket, Focus, AlertTriangle, Database, Brain, ArrowRightLeft,
  Sparkles, Scissors, MessageCircle, XCircle, Edit
} from 'lucide-vue-next'

const activeTab = ref('templates')

const tabs = [
  { id: 'templates', label: 'Templates', icon: Layers },
  { id: 'guide', label: 'Guide', icon: BookOpen }
]

const placements = PLACEMENTS

// Icon component mapping for placements
const placementIconMap = {
  'ScrollText': ScrollText,
  'Feather': Feather,
  'Bookmark': Bookmark,
  'FileText': FileText
}

const getPlacementIcon = (iconName) => {
  return placementIconMap[iconName] || FileText
}

const getStrengthClass = (strength) => {
  if (strength === 'Strongest') return 'bg-bd-success/20 text-bd-success'
  if (strength === 'Moderate') return 'bg-bd-info/20 text-bd-info'
  return 'bg-white/10 text-bd-text-muted'
}

// Filter instructions that are templates with specific placements
const authorsNoteComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'authors-note' || i.tags.includes('authors-note'))
)

const plotEssentialsComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'plot-essentials' || i.tags.includes('plot-essentials'))
)

const storySummaryComponents = computed(() => 
  INSTRUCTIONS.filter(i => i.placement === 'story-summary' || i.tags.includes('story-summary'))
)
</script>
