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
        <p class="text-xs text-bd-text-muted mb-4">
          Good structure helps both you and the AI understand what's expected. Follow this order for best results.
        </p>
        <div class="space-y-4">
          <!-- Step 1: Define the AI's Role -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">1. Define the AI's Persona</h3>
            <p class="text-xs text-bd-text-secondary mb-2">Start by telling the AI what role it plays. This sets the tone for everything else.</p>
            <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
              You are a creative author, known for dark and brutal horror books that are exciting and thrilling.
            </div>
            <p class="text-xs text-bd-text-muted mt-2">
              Examples: Shakespeare, evil DM, snarky narrator, noir detective writer...
            </p>
          </div>

          <!-- Step 2: Core Writing Rules -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">2. Core Writing Rules</h3>
            <p class="text-xs text-bd-text-secondary mb-2">Define the fundamental rules that apply to all writing. These should be universal to your story.</p>
            <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs text-bd-green">
- Be descriptive and creative with prose
- Never write dialogue or actions for the player character
- Continue from where the story left off
- Maintain consistency with established facts
            </div>
          </div>

          <!-- Step 3: Topic-Specific Rules -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2">3. Topic-Specific Rules</h3>
            <p class="text-xs text-bd-text-secondary mb-2">Group related instructions by topic. This helps the AI understand context and apply rules appropriately.</p>
            <div class="p-3 rounded bg-bd-bg-primary font-mono text-xs">
              <div class="text-bd-amber">Dialogue:</div>
              <div class="text-bd-green">- Write natural, character-appropriate dialogue</div>
              <div class="text-bd-green">- Each character has a distinct voice</div>
              <div class="text-bd-amber mt-2">Combat:</div>
              <div class="text-bd-green">- Describe fights with tactical detail</div>
              <div class="text-bd-green">- Injuries affect character performance</div>
              <div class="text-bd-amber mt-2">NPCs:</div>
              <div class="text-bd-green">- NPCs have their own goals and motivations</div>
              <div class="text-bd-green">- NPCs react realistically to player actions</div>
            </div>
          </div>

          <!-- Short vs Long Sets -->
          <div class="grid md:grid-cols-2 gap-4">
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-green" />
                Short Sets
              </h3>
              <p class="text-xs text-bd-text-secondary mb-2">Best for specific themes (horror, comedy). Each line starts with "-". Keep it under 10-15 lines.</p>
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
              <p class="text-xs text-bd-text-secondary mb-2">For complex scenarios. Group related instructions under labeled sections for clarity.</p>
              <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs">
                <div class="text-bd-amber">Dialogue:</div>
                <div class="text-bd-green">- Write natural dialogue</div>
                <div class="text-bd-amber mt-1">Combat:</div>
                <div class="text-bd-green">- Let injuries have consequences</div>
              </div>
            </div>
          </div>

          <!-- Information Flow Tip -->
          <div class="p-4 rounded-lg bg-bd-info/10 border border-bd-info/30">
            <div class="flex items-start gap-3">
              <Info class="w-5 h-5 text-bd-info flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Information Flow Matters</h3>
                <p class="text-sm text-bd-text-secondary">
                  The AI weighs instructions at the <strong>beginning and end</strong> more heavily. Put your most important rules first, 
                  and use the end for reinforcement. Topic sections in the middle help organize without losing impact.
                </p>
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
                <li>• <strong>One idea per line</strong>, keep instructions short</li>
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
        <p class="text-xs text-bd-text-muted mb-3">Add these to your <strong>AI Instructions</strong>. Replace 'Name' with your character.</p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Pacing</h4>
            <div class="space-y-1 text-xs">
              <div><span class="text-bd-text-muted">Faster:</span> <code class="text-bd-green">- Keep scenes moving</code></div>
              <div><span class="text-bd-text-muted">Slower:</span> <code class="text-bd-green">- Let scenes play out</code></div>
              <div><span class="text-bd-text-muted">Balanced:</span> <code class="text-bd-green">- Balance action with atmosphere</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">AI Writing For You</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Write ensuring 'Name' can write own dialogue</code></div>
              <div><code class="text-bd-green">- Never assume 'Name's thoughts or actions</code></div>
              <div><code class="text-bd-green">- Stop before 'Name' would need to respond</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Repetition</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Continue where story left off</code></div>
              <div><code class="text-bd-green">- Avoid repeating recent phrases</code></div>
              <div><code class="text-bd-green">- Vary sentence structure and vocabulary</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Plot Armor & Consequences</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Let 'Name' take injuries</code></div>
              <div><code class="text-bd-green">- Actions have realistic consequences</code></div>
              <div><code class="text-bd-green">- Bad decisions lead to bad outcomes</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Focus Issues</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Focus on everyone in scenes</code></div>
              <div><code class="text-bd-green">- Assume strangers & ignorance</code></div>
              <div><code class="text-bd-green">- NPCs have their own goals and concerns</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Style & Prose</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Write pure prose without symbols</code></div>
              <div><code class="text-bd-green">- Prioritize plot and dialogue over description</code></div>
              <div><code class="text-bd-green">- Show dont tell through character actions</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">Dialogue Quality</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Write natural flowing dialogue</code></div>
              <div><code class="text-bd-green">- Give each character a distinct voice</code></div>
              <div><code class="text-bd-green">- Avoid exposition dumps in dialogue</code></div>
            </div>
          </div>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
            <h4 class="text-xs font-semibold text-bd-text-primary mb-2">World Consistency</h4>
            <div class="space-y-1 text-xs">
              <div><code class="text-bd-green">- Maintain established facts about the world</code></div>
              <div><code class="text-bd-green">- Time passes naturally between scenes</code></div>
              <div><code class="text-bd-green">- Remember character locations and states</code></div>
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
        <p class="text-xs text-bd-text-muted mb-4">These are complete instruction sets you can use as starting points. Customize them to fit your story.</p>
        
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

          <!-- Dark Fantasy -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Swords class="w-4 h-4 text-bd-amber" />
              Dark Fantasy
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a dark fantasy author inspired by George R.R. Martin.
- The world is morally grey, no pure heroes or villains
- Actions have lasting consequences
- Death is permanent and can happen to anyone
- Magic is rare and comes with a cost</div>
          </div>

          <!-- Cozy Adventure -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Lightbulb class="w-4 h-4 text-bd-green" />
              Cozy Adventure
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a wholesome storyteller writing cozy adventures.
- Focus on friendships and small victories
- Conflicts resolve through understanding
- Describe comforting details like warm meals and safe havens
- Maintain an optimistic tone even in challenges</div>
          </div>

          <!-- Mystery Thriller -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Target class="w-4 h-4 text-bd-blue" />
              Mystery Thriller
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">You are a mystery thriller author.
- Plant clues and red herrings throughout the story
- Build suspense through pacing and atmosphere
- Characters have secrets and hidden motives
- Revelations should feel earned and logical</div>
          </div>

          <!-- Combat Focused -->
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Swords class="w-4 h-4 text-bd-cyan" />
              Combat Focused
            </h3>
            <div class="p-2 rounded bg-bd-bg-tertiary font-mono text-xs text-bd-green">Combat:
- Describe fights with tactical detail
- Injuries affect performance realistically
- Environment can be used strategically
- Opponents fight intelligently based on their abilities</div>
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
              <strong>T: 1.2</strong> • <strong>K: 300</strong> • <strong>PP/FP: 0.7</strong>, then adjust as you play.
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
          <!-- What Are Tokens -->
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
              <Info class="w-4 h-4 text-bd-blue" />
              What Are Tokens?
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Tokens are word chunks the AI reads. Common words = 1 token. Unusual words, punctuation, or special characters often split into multiple tokens, using more of your context limit.
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <!-- Why It Matters -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
              <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                <AlertTriangle class="w-4 h-4 text-bd-pink" />
                Why It Matters
              </h3>
              <ul class="text-xs text-bd-text-secondary space-y-1">
                <li>• <strong>Wasted tokens</strong> = less room for story context</li>
                <li>• <strong>Split words</strong> can confuse the AI</li>
                <li>• <strong>Lower reach</strong> for players on smaller context limits</li>
              </ul>
            </div>

            <!-- Token Examples -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <h3 class="font-semibold text-bd-text-primary text-sm mb-2 flex items-center gap-2">
                <Zap class="w-4 h-4 text-bd-amber" />
                Examples
              </h3>
              <div class="space-y-1 text-xs">
                <div class="flex justify-between">
                  <code class="text-bd-green">dont</code>
                  <span class="text-bd-text-muted">→ 1 token ✓</span>
                </div>
                <div class="flex justify-between">
                  <code class="text-bd-pink">don't</code>
                  <span class="text-bd-text-muted">→ 2 tokens ✗</span>
                </div>
                <div class="flex justify-between">
                  <code class="text-bd-green">cannot</code>
                  <span class="text-bd-text-muted">→ 1 token ✓</span>
                </div>
                <div class="flex justify-between">
                  <code class="text-bd-pink">can't</code>
                  <span class="text-bd-text-muted">→ 2 tokens ✗</span>
                </div>
              </div>
            </div>
          </div>

          <!-- How to Optimize -->
          <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary text-sm mb-3 flex items-center gap-2">
              <Wrench class="w-4 h-4 text-bd-green" />
              How to Optimize
            </h3>
            <ol class="text-xs text-bd-text-secondary space-y-2 list-decimal list-inside">
              <li>Paste your instructions into a <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline font-medium">tokenizer tool</a></li>
              <li>Look for words highlighted as multiple tokens</li>
              <li>Replace with simpler, single-token alternatives</li>
              <li>Test both versions; sometimes unoptimized reads better</li>
            </ol>
            <div class="mt-3 p-2 rounded bg-bd-bg-tertiary">
              <p class="text-xs text-bd-text-muted flex items-center gap-1">
                <Info class="w-3 h-3" />
                Capitalization and spacing affect tokenization!
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Credits -->
      <section class="card">
        <h2 class="text-lg font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
          <Award class="w-5 h-5 text-bd-accent-primary" />
          Credits & Resources
        </h2>
        <div class="mb-4">
          <p class="text-xs text-bd-text-muted mb-2">
            Contributors who created AI Instructions, or created repositories, guides, or other resources:
          </p>
          <div class="flex flex-wrap gap-1.5">
            <span v-for="name in aiInstructionsContributors" :key="name" 
                  class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
              {{ name }}
            </span>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <a href="https://docs.google.com/document/d/1na9MeTcx0QY6MkZdQSkFQFL91sT8BSiJ_6gxrC5sNEU" target="_blank" class="btn btn-secondary text-xs">
            <ScrollText class="w-3 h-3" /> OffMetaGamer's Repo
          </a>
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
          <template v-for="item in category.organizedItems" :key="item.isGroup ? item.groupId : item.instruction.id">
            <!-- Single instruction (not in a group) -->
            <ResourceCard 
              v-if="!item.isGroup"
              :resource="item.instruction"
            />
            
            <!-- Grouped instructions -->
            <div v-else class="instruction-group rounded-xl border-2 border-bd-purple/30 overflow-hidden bg-bd-bg-secondary">
              <!-- Group header - clickable banner -->
              <button 
                @click="toggleGroup(item.groupId)"
                class="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-bd-purple/10 to-bd-blue/10 hover:from-bd-purple/20 hover:to-bd-blue/20 transition-all text-left border-b border-bd-purple/20"
              >
                <div class="w-8 h-8 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
                  <Layers class="w-4 h-4 text-bd-purple" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="font-semibold text-bd-text-primary">{{ item.groupLabel }}</span>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs px-2 py-0.5 rounded-full bg-bd-purple/20 text-bd-purple font-medium">
                      {{ item.members.length }} variations
                    </span>
                    <span class="text-xs text-bd-text-muted">
                      {{ isGroupExpanded(item.groupId) ? 'Click to collapse' : 'Click to see all options' }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0">
                  <span v-if="!isGroupExpanded(item.groupId)" class="text-xs text-bd-purple font-medium hidden sm:block">
                    +{{ item.members.length - 1 }} more
                  </span>
                  <ChevronDown 
                    class="w-5 h-5 text-bd-purple transition-transform" 
                    :class="{ 'rotate-180': isGroupExpanded(item.groupId) }"
                  />
                </div>
              </button>
              
              <!-- Primary instruction (always visible) -->
              <div>
                <ResourceCard :resource="item.members[0]" />
              </div>
              
              <!-- Expanded group members -->
              <Transition name="slide">
                <div v-if="isGroupExpanded(item.groupId) && item.members.length > 1" class="border-t-2 border-dashed border-bd-purple/20 bg-bd-bg-primary/50">
                  <div class="px-2 py-3 space-y-2">
                    <div class="px-2 pb-2 flex items-center gap-2">
                      <div class="h-px flex-1 bg-bd-border-subtle"></div>
                      <span class="text-xs text-bd-text-muted font-medium uppercase tracking-wider">Alternative Versions</span>
                      <div class="h-px flex-1 bg-bd-border-subtle"></div>
                    </div>
                    <ResourceCard 
                      v-for="member in item.members.slice(1)" 
                      :key="member.id"
                      :resource="member"
                    />
                  </div>
                </div>
              </Transition>
            </div>
          </template>
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
  Check, X, TrendingUp, Wand2, Link2, Heart, ChevronDown
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
const sortBy = ref('category')
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

// Organize instructions into groups where applicable
const organizeInstructions = (instructionList) => {
  const result = []
  const processedIds = new Set()
  
  for (const instruction of instructionList) {
    if (processedIds.has(instruction.id)) continue
    
    if (instruction.groupId) {
      // Find all instructions in this group
      const groupMembers = instructionList
        .filter(i => i.groupId === instruction.groupId)
        .sort((a, b) => (a.groupOrder || 0) - (b.groupOrder || 0))
      
      // Mark all as processed
      groupMembers.forEach(m => processedIds.add(m.id))
      
      // Add as a group object
      result.push({
        isGroup: true,
        groupId: instruction.groupId,
        groupLabel: groupMembers[0]?.groupLabel || 'Related Instructions',
        members: groupMembers
      })
    } else {
      processedIds.add(instruction.id)
      result.push({ isGroup: false, instruction })
    }
  }
  
  return result
}

const categoriesWithInstructions = computed(() => {
  return categories.value
    .map(cat => ({
      ...cat,
      instructions: instructions.value.filter(i => i.category === cat.id),
      organizedItems: organizeInstructions(instructions.value.filter(i => i.category === cat.id))
    }))
    .filter(cat => cat.instructions.length > 0)
})

// Track expanded groups
const expandedGroups = ref(new Set())

const toggleGroup = (groupId) => {
  if (expandedGroups.value.has(groupId)) {
    expandedGroups.value.delete(groupId)
  } else {
    expandedGroups.value.add(groupId)
  }
  // Force reactivity
  expandedGroups.value = new Set(expandedGroups.value)
}

const isGroupExpanded = (groupId) => expandedGroups.value.has(groupId)

const hasActiveFilters = computed(() => 
  selectedCategories.value.length > 0 || 
  selectedDifficulties.value.length > 0 || 
  selectedImpacts.value.length > 0
)

const hasAnyFilters = computed(() => 
  searchQuery.value || 
  quickFilter.value || 
  hasActiveFilters.value ||
  sortBy.value !== 'category'
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
  sortBy.value = 'category'
}

// Contributors for credits section
const aiInstructionsContributors = [
  'OffMetaGamer', 'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'Dragranis', 
  'BinKompliziert', 'Wilmar', 'Le Onyx', 'Little Hat', 'SeinSchetten', 
  'Zoocata', 'Monsieur Boo', 'CamSift'
]

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
