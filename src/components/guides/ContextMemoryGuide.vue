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

  <!-- ===================== WHAT ARE TOKENS ===================== -->
  <section id="guide-what-are-tokens" class="card">
    <button 
      @click="toggleGuideSection('what-are-tokens')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Coins class="w-5 h-5 text-bd-amber" />
        What Are Tokens?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-are-tokens') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('what-are-tokens')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI large language models process information in <strong>tokens</strong>. Tokens represent a word, part of a word, a phrase, or a symbol. In AI Dungeon, <strong>one token is approximately 4 characters</strong>.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">How Tokens Work</h4>
          <div class="space-y-2 text-xs text-bd-text-secondary">
            <p>To generate output, AI models analyze text inputs as tokens, predict the most likely sequence of tokens to return, and then translate those tokens back into human-readable text. Think of it like a <strong>really sophisticated autocomplete</strong>.</p>
            <div class="p-3 rounded bg-bd-bg-primary font-mono text-[10px]">
              <span class="text-bd-text-muted">"The brave knight" &rarr; </span>
              <span class="px-1 py-0.5 rounded bg-bd-amber/20 text-bd-amber mx-0.5">The</span>
              <span class="px-1 py-0.5 rounded bg-bd-blue/20 text-bd-blue mx-0.5">brave</span>
              <span class="px-1 py-0.5 rounded bg-bd-green/20 text-bd-green mx-0.5">knight</span>
              <span class="text-bd-text-muted"> = 3 tokens (~16 characters)</span>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              Different models tokenize text differently. You can use <a href="https://huggingface.co/spaces/Xenova/the-tokenizer-playground" target="_blank" class="text-bd-accent-primary hover:underline">the Tokenizer Playground</a> to see how words get broken down into tokens.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTEXT LENGTH ===================== -->
  <section id="guide-context-length" class="card">
    <button 
      @click="toggleGuideSection('context-length')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Ruler class="w-5 h-5 text-bd-blue" />
        Context Length
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-length') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-length')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          <strong>Context length</strong> is the amount of information the AI can process when generating its next output. It includes your story text, Plot Essentials, AI Instructions, Story Cards, and everything else. Each model has its own max context length, and subscription tiers determine how much you can use.
        </p>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-bd-text-secondary">
            <thead>
              <tr class="border-b border-bd-border-subtle text-bd-text-muted text-left">
                <th class="py-2 pr-4 font-semibold">Membership Tier</th>
                <th class="py-2 font-semibold">Context Length</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-4">Free</td>
                <td class="py-2"><span class="px-2 py-0.5 rounded bg-bd-bg-tertiary">~2k tokens</span></td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-4">Champion*</td>
                <td class="py-2"><span class="px-2 py-0.5 rounded bg-bd-blue/10 text-bd-blue">~8k tokens</span></td>
              </tr>
              <tr class="border-b border-bd-border-subtle/50">
                <td class="py-2 pr-4">Legend*</td>
                <td class="py-2"><span class="px-2 py-0.5 rounded bg-bd-purple/10 text-bd-purple">~16k tokens</span></td>
              </tr>
              <tr>
                <td class="py-2 pr-4">Mythic*</td>
                <td class="py-2"><span class="px-2 py-0.5 rounded bg-bd-amber/10 text-bd-amber">~32k tokens</span></td>
              </tr>
            </tbody>
          </table>
          <p class="text-[10px] text-bd-text-muted mt-2">*Subscribed players can spend 1 Credit per action for extended context on certain models.</p>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              When your story exceeds the context limit, the <strong>oldest parts are cut</strong>. This is why the AI "forgets" things &mdash; it literally can't see them anymore. Use Plot Essentials and Story Cards to keep critical info in context.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== WHAT GOES INTO CONTEXT ===================== -->
  <section id="guide-context-composition" class="card">
    <button 
      @click="toggleGuideSection('context-composition')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-green" />
        What Goes Into Context?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-composition') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-composition')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Context is the data sent to the AI that it considers when generating your next action. It's made up of <strong>Required Elements</strong> (always included) and <strong>Dynamic Elements</strong> (flexible, fill remaining space).
        </p>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Lock class="w-4 h-4 text-bd-green" />
              Required Elements
            </h4>
            <p class="text-[10px] text-bd-text-muted mb-2">Always included (up to 70% of context). Priority order if space runs out:</p>
            <ol class="text-xs text-bd-text-secondary space-y-1 list-decimal list-inside">
              <li>Front Memory &amp; Last Action (always in full)</li>
              <li>Author's Note</li>
              <li>Plot Essentials</li>
              <li>AI Instructions</li>
              <li>Story Summary</li>
            </ol>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Shuffle class="w-4 h-4 text-bd-blue" />
              Dynamic Elements
            </h4>
            <p class="text-[10px] text-bd-text-muted mb-2">Fill remaining tokens after Required Elements:</p>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li><strong>~25%</strong> &rarr; Matching Story Cards</li>
              <li><strong>~50%</strong> &rarr; Adventure History (up to 75% if Memory Bank disabled)</li>
              <li><strong>~25%</strong> &rarr; Memory Bank</li>
            </ul>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Context Assembly Order</h4>
          <p class="text-xs text-bd-text-secondary mb-3">Once determined, the context is assembled in this order and sent to the AI:</p>
          <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
            <div v-for="(item, index) in contextOrder" :key="item" class="p-2 rounded bg-bd-bg-primary text-center">
              <span class="text-[10px] font-bold text-bd-text-muted block">{{ index + 1 }}</span>
              <span class="text-[10px] text-bd-text-secondary">{{ item }}</span>
            </div>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Story Card Matching</h4>
          <p class="text-xs text-bd-text-secondary">
            Story Cards are included based on <strong>how recently and frequently</strong> their triggers appeared. The system evaluates a minimum of 4 recent actions for trigger matches. If more than 500 tokens are available for Story Cards, it divides available tokens by 100 to determine how many actions to scan (e.g., 900 tokens available = 9 actions scanned).
          </p>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== WHY THE AI FORGETS ===================== -->
  <section id="guide-why-ai-forgets" class="card">
    <button 
      @click="toggleGuideSection('why-ai-forgets')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-purple" />
        Why Does the AI Forget Things?
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('why-ai-forgets') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('why-ai-forgets')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The AI can only look back so far in your adventure's history. When information falls outside of the context window, the AI literally <strong>cannot see it anymore</strong>. It's not forgetting &mdash; it never received that information for the current generation.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Why Names Get Mixed Up</h4>
          <p class="text-xs text-bd-text-secondary">
            When the AI has seen a name like "Bob" in context, it's more likely to use that name for other characters later. This is because the AI predicts likely tokens &mdash; if "Bob" has high probability from being seen recently, it may reuse it even for different characters.
          </p>
        </div>

        <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Wrench class="w-4 h-4 text-bd-green" />
            How to Fix Forgetfulness
          </h4>
          <div class="space-y-2 text-xs text-bd-text-secondary">
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">1.</span>
              <span>Use <strong>Plot Essentials</strong> for critical details (always in context)</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">2.</span>
              <span>Use <strong>Story Cards</strong> with good triggers for character details</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">3.</span>
              <span><strong>Retry</strong> if the AI makes a mistake &mdash; it may catch on</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">4.</span>
              <span><strong>Edit</strong> AI outputs to correct mistakes directly</span>
            </div>
            <div class="flex items-start gap-2">
              <span class="text-bd-green font-bold">5.</span>
              <span>Enable the <strong>Memory System</strong> (Auto Summarization + Memory Bank)</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MEMORY SYSTEM ===================== -->
  <section id="guide-memory-system" class="card">
    <button 
      @click="toggleGuideSection('memory-system')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Brain class="w-5 h-5 text-bd-teal" />
        The Memory System
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('memory-system') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('memory-system')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The <strong>Memory System</strong> automatically stores and retrieves key information from your Adventure, helping the AI stay on track even in very long stories. It's made up of two complementary features: <strong>Auto Summarization</strong> and the <strong>Memory Bank</strong>.
        </p>

        <div class="p-4 rounded-lg bg-bd-teal/10 border border-bd-teal/30">
          <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
            <Lightbulb class="w-4 h-4 text-bd-teal" />
            Inspired by the Human Brain
          </h4>
          <div class="grid md:grid-cols-2 gap-3 text-xs text-bd-text-secondary">
            <div class="p-3 rounded bg-bd-bg-primary">
              <strong class="text-bd-teal block mb-1">Compressed Memory</strong>
              Like how your brain distills a long experience into key takeaways, <strong>Auto Summarization</strong> compresses your story into a high-level overview.
            </div>
            <div class="p-3 rounded bg-bd-bg-primary">
              <strong class="text-bd-teal block mb-1">Memory Retrieval</strong>
              Like how hearing "fire hydrant" triggers related memories, the <strong>Memory Bank</strong> recalls specific details when they're relevant to the current action.
            </div>
          </div>
        </div>

        <!-- How Memories Are Created -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">How Memories Are Created</h4>
          <div class="space-y-2 text-xs text-bd-text-secondary">
            <p>A <strong>Memory</strong> is an AI-generated summary of 6 of your previous actions. The process works like this:</p>
            <div class="space-y-2">
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">1</span>
                <p>Wait until you're <strong>12 actions</strong> into your Adventure</p>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">2</span>
                <p>The oldest 6 actions (actions 1-6) are summarized into your <strong>first Memory</strong></p>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">3</span>
                <p>After 6 more actions (now at 18 total), actions 6-12 become your <strong>second Memory</strong></p>
              </div>
              <div class="flex items-start gap-3">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-teal/20 text-bd-teal text-xs font-bold flex items-center justify-center">4</span>
                <p>This cycle repeats &mdash; a new Memory is created <strong>every 6 actions</strong></p>
              </div>
            </div>
            <p class="text-bd-text-muted mt-2">Your most recent 6 actions are never summarized, so you can freely edit/undo them without affecting memories.</p>
          </div>
        </div>

        <!-- Auto Summarization -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <FileText class="w-4 h-4 text-bd-green" />
              Auto Summarization
            </h4>
            <p class="text-xs text-bd-text-secondary mb-2">
              Keeps a running <strong>Story Summary</strong> of your adventure's plot. New memories are appended to the summary, and periodically the whole summary is re-compressed.
            </p>
            <ul class="text-[10px] text-bd-text-muted space-y-1">
              <li>Tracks overall story direction</li>
              <li>Stored in the Story Summary Plot Component</li>
              <li>Can be manually edited</li>
              <li>Visible in Context Viewer</li>
            </ul>
          </div>
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h4 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Database class="w-4 h-4 text-bd-purple" />
              Memory Bank
            </h4>
            <p class="text-xs text-bd-text-secondary mb-2">
              Stores detailed memories and <strong>dynamically retrieves</strong> them when relevant to your current action. Like an automatic Story Card system.
            </p>
            <ul class="text-[10px] text-bd-text-muted space-y-1">
              <li>Recalls specific details (names, locations, items)</li>
              <li>Triggered by relevance to current action</li>
              <li>Uses ~25% of dynamic context space</li>
              <li>Can be disabled if you prefer manual control</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== MANAGING CONTEXT ===================== -->
  <section id="guide-managing-context" class="card">
    <button 
      @click="toggleGuideSection('managing-context')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Wrench class="w-5 h-5 text-bd-cyan" />
        Managing Your Context
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('managing-context') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('managing-context')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          If your story is becoming incoherent, forgetting details, or losing plot elements, your context might be unhealthy. Here's how to diagnose and fix it.
        </p>

        <!-- Healthy vs Unhealthy -->
        <div class="grid md:grid-cols-2 gap-4">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h4 class="font-semibold text-bd-green mb-2 text-sm">Healthy Context</h4>
            <p class="text-xs text-bd-text-secondary mb-2">All components are fairly balanced. Most context is used by <strong>Adventure text</strong> (the pink bar in Context Viewer).</p>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-pink-400/60 flex-1"></div>
                <span class="text-[10px] text-bd-text-muted w-16">History</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-green/60" style="width: 30%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Cards</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-blue/60" style="width: 20%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Instructions</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-purple/60" style="width: 15%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Memory</span>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-red/10 border border-bd-red/30">
            <h4 class="font-semibold text-bd-red mb-2 text-sm">Unhealthy Context</h4>
            <p class="text-xs text-bd-text-secondary mb-2">One component dominates. Adventure text gets squeezed out, causing incoherence.</p>
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-pink-400/60" style="width: 15%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">History</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-green/60 flex-1"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Cards</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-blue/60" style="width: 20%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Instructions</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="h-2 rounded bg-bd-purple/60" style="width: 15%"></div>
                <span class="text-[10px] text-bd-text-muted w-16">Memory</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>View your context:</strong> Press on the last AI response and select "View Context" to see the Context Viewer with a breakdown of how your tokens are allocated.
            </p>
          </div>
        </div>

        <!-- Optimization Tips -->
        <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Optimization Tips by Component</h4>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-amber text-sm mb-2">AI Instructions</h4>
            <div class="space-y-2 text-xs text-bd-text-secondary">
              <p>Look for lines that serve similar purposes and combine them. Trim verbose instructions:</p>
              <div class="grid md:grid-cols-2 gap-2">
                <div class="p-2 rounded bg-bd-red/10 border border-bd-red/20">
                  <span class="text-[10px] text-bd-red font-semibold block mb-1">Before (168 chars)</span>
                  <code class="text-[10px]">Ensure characters act and speak like how their personality is defined. Speech should never feel generic, trope-y, or like it's interrupting the natural narrative flow</code>
                </div>
                <div class="p-2 rounded bg-bd-green/10 border border-bd-green/20">
                  <span class="text-[10px] text-bd-green font-semibold block mb-1">After (57 chars)</span>
                  <code class="text-[10px]">NPCs act lifelike and speak befitting their personality</code>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-blue text-sm mb-2">Plot Essentials</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Keep descriptions as <strong>short as possible</strong></li>
              <li>Ask yourself: Is this <strong>always relevant</strong>? Could it be a Story Card instead?</li>
              <li>Focus on your player character and characters always in the scene</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-purple text-sm mb-2">Author's Note</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Keep it <strong>concise</strong> &mdash; it sits between your past actions and recent action</li>
              <li>Condense rules into styles: instead of "slow down, don't rush", try <code class="text-bd-purple">Style: Slow-paced</code></li>
              <li>Only use strictly necessary instructions</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-semibold text-bd-green text-sm mb-2">Story Cards</h4>
            <ul class="text-xs text-bd-text-secondary space-y-1">
              <li>Triggers are <strong>not case-sensitive</strong> and match inside other words</li>
              <li>Format triggers like <code class="text-bd-green">format,them,like,this</code> (comma-separated, spaces matter)</li>
              <li>Avoid broad triggers: <code class="text-bd-red">Em</code> for Emily also triggers on Empire, Gems, Seem, Them...</li>
              <li>Check your triggers are not firing too broadly</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTEXT PRIORITY ===================== -->
  <section id="guide-context-priority" class="card">
    <button 
      @click="toggleGuideSection('context-priority')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ArrowUpDown class="w-5 h-5 text-bd-accent-primary" />
        Context Priority & Overflow
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('context-priority') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('context-priority')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          When your content exceeds the context limit, AI Dungeon automatically trims components based on priority. Understanding the priority system helps you decide what to keep concise.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-3">Priority System</h4>
          <div class="space-y-2">
            <div class="flex items-center gap-3">
              <span class="flex-shrink-0 w-20 text-[10px] font-bold text-bd-green uppercase">Required</span>
              <div class="flex-1 text-xs text-bd-text-secondary">
                Instructions, Plot Essentials, Story Summary, Front Memory, Author's Note, Last Action
              </div>
            </div>
            <div class="border-t border-bd-border-subtle/50 pt-2 flex items-center gap-3">
              <span class="flex-shrink-0 w-20 text-[10px] font-bold text-bd-blue uppercase">Dynamic</span>
              <div class="flex-1 text-xs text-bd-text-secondary">
                Story Cards, History, Memory Bank
              </div>
            </div>
          </div>
        </div>

        <p class="text-xs text-bd-text-secondary">
          Required elements are included first, up to 70% of context. If even Required elements overflow, lower-priority ones are trimmed or excluded. Dynamic elements fill the remaining space with flexible rules for allocation.
        </p>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>When in doubt, ask the AI!</strong> Start a test game, set AI Instructions to answer questions, and ask it what it knows about a topic. This helps you understand what it already has trained knowledge about vs. what you need to supply.
            </p>
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
  Coins, Ruler, Layers, HelpCircle, Brain, Wrench, ArrowUpDown,
  ChevronDown, ChevronUp, Info, Lightbulb, AlertTriangle,
  Lock, Shuffle, FileText, Database
} from 'lucide-vue-next'

const contextOrder = [
  'Buffer Tokens', 'Front Memory', 'Last Action', 'Author\'s Note', 'History',
  'Memory Bank', 'Story Summary', 'Story Cards', 'Plot Essentials', 'Instructions'
]

const guideSections = [
  { id: 'header-core', label: 'Fundamentals', isHeader: true },
  { id: 'what-are-tokens', label: 'What Are Tokens?' },
  { id: 'context-length', label: 'Context Length' },
  { id: 'context-composition', label: 'What Goes Into Context?' },
  { id: 'why-ai-forgets', label: 'Why the AI Forgets' },
  { id: 'header-memory', label: 'Memory System', isHeader: true },
  { id: 'memory-system', label: 'The Memory System' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'managing-context', label: 'Managing Your Context' },
  { id: 'context-priority', label: 'Context Priority & Overflow' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) {
    expandedGuideSections.value.delete(sectionId)
  } else {
    expandedGuideSections.value.add(sectionId)
  }
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = (sectionId) => {
  return expandedGuideSections.value.has(sectionId)
}

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
