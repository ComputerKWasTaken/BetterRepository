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
      
      <!-- What Are AI Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <HelpCircle class="w-5 h-5 text-bd-amber" />
          What Are AI Instructions?
        </h2>
        <div class="space-y-4">
          <p class="text-bd-text-secondary">
            AI Instructions (commonly called <strong>AIN</strong>) are rules and guidelines that shape how the AI 
            writes your story. They control writing style, pacing, character behavior, and narrative focus.
          </p>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-bd-amber" />
                What Instructions Can Do
              </h3>
              <ul class="text-sm text-bd-text-secondary space-y-1">
                <li>• Enforce specific writing styles</li>
                <li>• Focus the AI on desired aspects</li>
                <li>• Break the 4th wall (Deadpool-style narration)</li>
                <li>• Set world rules and NPC behavior</li>
                <li>• Control pacing and scene progression</li>
              </ul>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Info class="w-4 h-4 text-bd-blue" />
                Default Instructions
              </h3>
              <p class="text-sm text-bd-text-secondary">
                Each model has default instructions prepared by Latitude. They're used even if you don't add 
                custom ones. Click any output → "View Context" → "AI Instructions" to see them.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How to Structure Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <FileText class="w-5 h-5 text-bd-blue" />
          How to Structure Instructions
        </h2>
        <div class="space-y-6">
          <!-- Define the AI's Role -->
          <div>
            <h3 class="font-semibold text-bd-text-primary mb-2">Step 1: Define Who the AI Is</h3>
            <p class="text-sm text-bd-text-secondary mb-3">
              Start by defining the AI's persona. This sets the tone for everything that follows.
            </p>
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-white/[0.06] font-mono text-sm">
              <span class="text-bd-green">You are a creative author, known for your dark and brutal horror books 
              that are exciting, suspenseful and thrilling. Your task is to use your skills to provide 
              matching style in this story.</span>
            </div>
            <p class="text-xs text-bd-text-muted mt-2">
              Could be anything: child book author, Shakespeare, screenwriter, evil DM, snarky narrator...
            </p>
          </div>

          <!-- Short vs Long Sets -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-green" />
                Short Sets (Recommended Start)
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Simple, focused instructions. Each starts with "-" on a new line.
              </p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs">
                <div class="text-bd-text-muted">Instructions:</div>
                <div class="text-bd-green">- Be specific, descriptive, and creative.</div>
                <div class="text-bd-green">- Avoid repetition and summarization.</div>
                <div class="text-bd-green">- Never decide or write for the user.</div>
              </div>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Layers class="w-4 h-4 text-bd-purple" />
                Long Sets (Organized Sections)
              </h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Group related instructions under labeled sections for complex needs.
              </p>
              <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs">
                <div class="text-bd-amber">Dialogue instructions:</div>
                <div class="text-bd-green">- instruction here</div>
                <div class="text-bd-amber mt-2">Combat instructions:</div>
                <div class="text-bd-green">- instruction here</div>
                <div class="text-bd-amber mt-2">Writing style:</div>
                <div class="text-bd-green">- instruction here</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Writing Good Instructions -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <PenTool class="w-5 h-5 text-bd-purple" />
          Writing Effective Instructions
        </h2>
        <div class="space-y-4">
          <div class="grid md:grid-cols-3 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Target class="w-4 h-4 text-bd-amber" />
                Use Commands
              </h3>
              <p class="text-sm text-bd-text-secondary">
                Start with action verbs: <strong>Make</strong>, <strong>Avoid</strong>, <strong>Use</strong>, 
                <strong>Be</strong>, <strong>Write</strong>, <strong>Remember</strong>
              </p>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Scissors class="w-4 h-4 text-bd-green" />
                Be Precise
              </h3>
              <p class="text-sm text-bd-text-secondary">
                Avoid long, vague instructions. Break complex rules into smaller, specific ones.
              </p>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Scale class="w-4 h-4 text-bd-blue" />
                Match Complexity
              </h3>
              <p class="text-sm text-bd-text-secondary">
                Generic adventures → large universal sets. Specific themes → short specialized sets.
              </p>
            </div>
          </div>
          
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <div class="flex items-start gap-3">
              <Lightbulb class="w-5 h-5 text-bd-amber mt-0.5 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Pro Tip: AI Instructions vs Author's Note</h3>
                <p class="text-sm text-bd-text-secondary mt-1">
                  <strong>AI Instructions</strong> set global rules that persist throughout your adventure. 
                  <strong>Author's Note</strong> provides context-specific guidance that can change as your story evolves. 
                  Many optimized instruction sets split content between both for maximum effectiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Model Settings Tuning -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <SlidersHorizontal class="w-5 h-5 text-bd-cyan" />
          Model Settings (Tuning Parameters)
        </h2>
        <p class="text-bd-text-secondary mb-4">
          Beyond instructions, you can tune how the AI generates text. Think of these as creativity vs consistency dials.
        </p>
        
        <div class="space-y-4">
          <!-- Temperature -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-3 mb-2">
              <Thermometer class="w-5 h-5 text-bd-pink" />
              <h3 class="font-semibold text-bd-text-primary">Temperature (T)</h3>
              <span class="tag text-xs">0.6 - 1.5 typical</span>
            </div>
            <p class="text-sm text-bd-text-secondary mb-2">
              Controls randomness in word selection. Higher = more creative/chaotic, Lower = more focused/predictable.
            </p>
            <div class="flex gap-4 text-xs">
              <span class="text-bd-blue">Low (0.6-0.8): Focused, consistent</span>
              <span class="text-bd-amber">Mid (0.9-1.1): Balanced</span>
              <span class="text-bd-pink">High (1.2+): Creative, wild</span>
            </div>
          </div>

          <!-- Top K -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-3 mb-2">
              <ListOrdered class="w-5 h-5 text-bd-amber" />
              <h3 class="font-semibold text-bd-text-primary">Top K</h3>
              <span class="tag text-xs">30 - 500 typical</span>
            </div>
            <p class="text-sm text-bd-text-secondary mb-2">
              Limits how many words the AI considers for each position. Lower = safer choices, Higher = more variety.
            </p>
            <div class="flex gap-4 text-xs">
              <span class="text-bd-blue">Low (30-50): Conservative</span>
              <span class="text-bd-amber">Mid (100-300): Balanced</span>
              <span class="text-bd-pink">High (400+): Adventurous</span>
            </div>
          </div>

          <!-- Top P -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <div class="flex items-center gap-3 mb-2">
              <Percent class="w-5 h-5 text-bd-green" />
              <h3 class="font-semibold text-bd-text-primary">Top P (Nucleus Sampling)</h3>
              <span class="tag text-xs">0.8 - 1.0 typical</span>
            </div>
            <p class="text-sm text-bd-text-secondary mb-2">
              Considers words until their combined probability reaches P%. Works with Top K to filter choices.
            </p>
            <div class="flex gap-4 text-xs">
              <span class="text-bd-blue">Low (0.7-0.8): Tight focus</span>
              <span class="text-bd-amber">Mid (0.85-0.95): Balanced</span>
              <span class="text-bd-pink">High (1.0): Full range</span>
            </div>
          </div>

          <!-- Presence & Frequency Penalties -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <div class="flex items-center gap-3 mb-2">
                <UserPlus class="w-5 h-5 text-bd-purple" />
                <h3 class="font-semibold text-bd-text-primary">Presence Penalty (PP)</h3>
              </div>
              <p class="text-sm text-bd-text-secondary">
                Encourages introducing <strong>new topics/concepts</strong>. Higher = more variety in ideas.
              </p>
              <p class="text-xs text-bd-text-muted mt-1">Typical: 0.2 - 0.8</p>
            </div>
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
              <div class="flex items-center gap-3 mb-2">
                <Repeat class="w-5 h-5 text-bd-cyan" />
                <h3 class="font-semibold text-bd-text-primary">Frequency Penalty (FP)</h3>
              </div>
              <p class="text-sm text-bd-text-secondary">
                Discourages <strong>repeating the same words</strong>. Higher = less word repetition.
              </p>
              <p class="text-xs text-bd-text-muted mt-1">Typical: 0 - 0.6</p>
            </div>
          </div>

          <!-- Quick Start Settings -->
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <div class="flex items-start gap-3">
              <Rocket class="w-5 h-5 text-bd-green mt-0.5 flex-shrink-0" />
              <div>
                <h3 class="font-semibold text-bd-text-primary">Quick-Start Approach</h3>
                <p class="text-sm text-bd-text-secondary mt-1 mb-3">
                  A practical method from the community to dial in your settings:
                </p>
                <ol class="text-sm text-bd-text-secondary space-y-1 list-decimal list-inside">
                  <li>Set Temperature to <strong>1.2</strong> (1.0 for Mistral Large 2)</li>
                  <li>Set Top K to <strong>300</strong> if available</li>
                  <li>Set PP and FP to <strong>0.7</strong> if supported</li>
                  <li>Begin playing and adjust based on what feels wrong</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Common Problems & Fixes -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Wrench class="w-5 h-5 text-bd-pink" />
          Common Problems & Fixes
        </h2>
        <p class="text-bd-text-secondary mb-4">
          These targeted instructions work best in <strong>Author's Note</strong>. Replace 'Name' with your character's name.
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <!-- Pacing Issues -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Clock class="w-4 h-4 text-bd-amber" />
              Pacing Control
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between items-center">
                <span class="text-bd-text-secondary">Faster:</span>
                <code class="text-bd-green text-xs">- Keep scenes moving</code>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-bd-text-secondary">Slower:</span>
                <code class="text-bd-green text-xs">- Let scenes play out</code>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-bd-text-secondary">Much slower:</span>
                <code class="text-bd-green text-xs">- Avoid dragging scenes but let scenes play out</code>
              </div>
            </div>
          </div>

          <!-- AI Writing For You -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <UserX class="w-4 h-4 text-bd-pink" />
              AI Writing For Your Character
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">All Models:</div>
              <code class="text-bd-green text-xs block">- Write ensuring 'Name' can write own dialogue and make own decisions</code>
              <div class="text-bd-text-secondary mt-2">Mistral Models:</div>
              <code class="text-bd-green text-xs block">- dont write dialogues for 'Name'</code>
            </div>
          </div>

          <!-- Repetition -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Repeat class="w-4 h-4 text-bd-cyan" />
              Repetition Issues
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">AI repeating your dialogue:</div>
              <code class="text-bd-green text-xs block">- Continue where story left off</code>
              <div class="text-bd-text-secondary mt-2">For variety in word choice:</div>
              <code class="text-bd-green text-xs block">- clever shuffle & rephrase text: alter structure, use synonyms</code>
            </div>
          </div>

          <!-- Plot Armor -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Shield class="w-4 h-4 text-bd-green" />
              Plot Armor & Stakes
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">AI giving you plot armor:</div>
              <code class="text-bd-green text-xs block">- Let 'Name' take injuries</code>
              <div class="text-bd-text-secondary mt-2">NPCs mindlessly following:</div>
              <code class="text-bd-green text-xs block">- Let everyone lead</code>
            </div>
          </div>

          <!-- Focus Issues -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Focus class="w-4 h-4 text-bd-purple" />
              Focus & Attention
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">Wrong priorities:</div>
              <code class="text-bd-green text-xs block">- Focus on ...</code>
              <div class="text-bd-text-secondary mt-2">Ignoring other characters:</div>
              <code class="text-bd-green text-xs block">- Focus on everyone in scenes</code>
              <div class="text-bd-text-secondary mt-2">Strangers know your character:</div>
              <code class="text-bd-green text-xs block">- Assume strangers & ignorance</code>
            </div>
          </div>

          <!-- Style Issues -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Type class="w-4 h-4 text-bd-amber" />
              Style & Formatting
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">Remove markdown symbols:</div>
              <code class="text-bd-green text-xs block">- Write pure prose without symbols</code>
              <div class="text-bd-text-secondary mt-2">Too sentimental/flowery:</div>
              <code class="text-bd-green text-xs block">- Avoid being sentimental</code>
              <div class="text-bd-text-secondary mt-2">Rambling about feelings:</div>
              <code class="text-bd-green text-xs block">- Express emotions through actions & physical cues</code>
            </div>
          </div>

          <!-- Sudden Events -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Zap class="w-4 h-4 text-bd-pink" />
              "Suddenly" Moments
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">Random scene interruptions:</div>
              <code class="text-bd-green text-xs block">- Everyone needs reasons to occur</code>
              <div class="text-bd-text-secondary mt-2">Better pacing alternative:</div>
              <code class="text-bd-green text-xs block">- Let events progress in real-time without skipping or summarizing</code>
            </div>
          </div>

          <!-- Description Balance -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-blue" />
              Description Balance
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-bd-text-secondary">Too much description:</div>
              <code class="text-bd-green text-xs block">- Prioritize plot and dialogue over description</code>
              <div class="text-bd-text-secondary mt-2">Better balance:</div>
              <code class="text-bd-green text-xs block">- Alternate grounded dialogue, worldbuilding & action</code>
            </div>
          </div>
        </div>
      </section>

      <!-- Example Instruction Sets -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
          <Drama class="w-5 h-5 text-bd-amber" />
          Example Instruction Sets
        </h2>
        
        <div class="space-y-6">
          <!-- Snarky Narrator -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <MessageSquare class="w-4 h-4 text-bd-purple" />
              Snarky Narrator (Stanley Parable Style)
            </h3>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green whitespace-pre-wrap">You are an all-seeing narrator who constantly breaks the 4th wall, much like Deadpool or Lemony Snicket.

Instructions: 
- Be creative, descriptive, and sarcastic. 
- Point out every time the user does something stupid. 
- Randomly interrupt the story with philosophical rants about the absurdity of the world. 
- Write exclusively in third person omniscient perspective, as if constantly aware of the internal thoughts of all characters (and snarkily judging them).
- Be over-the-top. Utilize melodrama and exaggerated suspense, with genre-aware comments such as "little did she know..."</div>
          </div>

          <!-- Evil DM -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Skull class="w-4 h-4 text-bd-pink" />
              Evil DM Mode
            </h3>
            <div class="p-3 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green whitespace-pre-wrap">You are an evil DM whose goal is to make the player's life miserable. 

Instructions: 
- Follow Murphy's Law: anything that can go wrong usually will.
- The player's actions should fail most of the time, and only succeed if you can't think of a sensible way to make them fail. 
- Every time the player seems to be doing well, introduce a new plot twist to throw a wrench in their plans. 
- Villains should have solid motivations for their actions, and should never capitulate just because the player uses logic.</div>
          </div>

          <!-- Gemini's Presets -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
            <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
              <Settings class="w-4 h-4 text-bd-cyan" />
              Settings + Style Combinations
            </h3>
            <div class="grid md:grid-cols-2 gap-4 text-sm">
              <div class="p-3 rounded bg-bd-bg-tertiary">
                <h4 class="text-bd-amber font-medium mb-1">"Creative Coherence"</h4>
                <p class="text-bd-text-muted text-xs mb-2">Balanced creativity with polished output</p>
                <code class="text-bd-green text-xs">T: 0.7-0.8 | P: 0.9 | K: 40-60 | PP: 0.5-1.0 | FP: 0.5-1.0</code>
              </div>
              <div class="p-3 rounded bg-bd-bg-tertiary">
                <h4 class="text-bd-pink font-medium mb-1">"Wild Card"</h4>
                <p class="text-bd-text-muted text-xs mb-2">Chaos mode - expect anything</p>
                <code class="text-bd-green text-xs">T: 0.9+ | P: 0.95+ | K: 20-40 | PP: 1.0-2.0 | FP: 1.0-2.0</code>
              </div>
              <div class="p-3 rounded bg-bd-bg-tertiary">
                <h4 class="text-bd-blue font-medium mb-1">"Controlled Creativity"</h4>
                <p class="text-bd-text-muted text-xs mb-2">Structured with polished feel</p>
                <code class="text-bd-green text-xs">T: 0.7-0.8 | P: 0.7-0.8 | K: 60-80 | PP: 0.1-0.3 | FP: 0.1-0.3</code>
              </div>
              <div class="p-3 rounded bg-bd-bg-tertiary">
                <h4 class="text-bd-green font-medium mb-1">"Focused Narrative"</h4>
                <p class="text-bd-text-muted text-xs mb-2">Highly detailed, controlled world</p>
                <code class="text-bd-green text-xs">T: ≤0.6 | P: ≤0.7 | K: 40-60 | PP: 0-0.1 | FP: 0-0.1</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Community Resources -->
      <section class="card bg-gradient-to-br from-bd-purple/10 to-bd-blue/10 border-bd-purple/30">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <ExternalLink class="w-6 h-6 text-bd-purple" />
          </div>
          <div>
            <h2 class="text-lg font-semibold text-bd-text-primary mb-2">Community Resources</h2>
            <p class="text-bd-text-secondary mb-4">
              Dive deeper with these community-curated resources and stay updated on the latest optimized settings.
            </p>
            <div class="flex flex-wrap gap-3">
              <a 
                href="https://help.aidungeon.com/faq/ai-instructions" 
                target="_blank" 
                class="btn btn-secondary text-sm"
              >
                <BookOpen class="w-4 h-4" />
                Official AI Instructions Guide
              </a>
              <a 
                href="https://discord.com/invite/HB2YBZYjyf" 
                target="_blank" 
                class="btn btn-secondary text-sm"
              >
                <MessageSquare class="w-4 h-4" />
                AI Dungeon Discord
              </a>
              <a 
                href="https://plainenglish.io/blog/mastering-llm-parameters-a-deep-dive-into-temperature-top-k-and-top-p" 
                target="_blank" 
                class="btn btn-secondary text-sm"
              >
                <Thermometer class="w-4 h-4" />
                Deep Dive: LLM Parameters
              </a>
            </div>
          </div>
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
          More Filters
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
                : 'hover:bg-white/[0.12]'"
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
                : 'hover:bg-white/[0.12]'"
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
                : 'hover:bg-white/[0.12]'"
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
          class="bg-bd-bg-elevated border border-white/10 rounded-lg px-3 py-1.5 text-sm text-bd-text-primary outline-none focus:border-bd-accent-primary"
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
  Shield, Focus, Type, Drama, MessageSquare, Skull, ExternalLink, Star
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
  { id: 'low', label: 'Low Impact', activeClass: 'bg-white/20 text-bd-text-muted border border-white/20' }
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
  return categoryColorMap[categoryId]?.bg || 'bg-white/10'
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
