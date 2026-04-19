<template>
  <div class="space-y-6 animate-fade-in">
    <!-- ==================== HERO ==================== -->
    <section class="relative overflow-hidden rounded-2xl border border-bd-border-subtle">
      <div class="absolute inset-0 bg-gradient-to-br from-bd-accent-primary/15 via-bd-purple/10 to-bd-cyan/15" aria-hidden="true" />
      <div class="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div class="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-bd-accent-primary/30 blur-3xl animate-float" />
        <div class="absolute -bottom-24 -left-12 w-80 h-80 rounded-full bg-bd-cyan/25 blur-3xl animate-float" style="animation-delay: 2s" />
      </div>

      <div class="relative p-8 md:p-12 space-y-5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-bd-accent-primary/20 text-bd-accent-light">
            <Sparkles class="w-3 h-3" />
            Coming in BetterDungeon V2
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-bd-purple/20 text-bd-purple">
            <Rocket class="w-3 h-3" />
            The successor to BetterScripts
          </span>
        </div>

        <div class="space-y-4 max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold text-bd-text-primary tracking-tight leading-[1.1]">
            Scripts are about to do a lot more than <span class="text-gradient">draw widgets</span>.
          </h1>
          <p class="text-lg text-bd-text-secondary leading-relaxed">
            <strong class="text-bd-text-primary">Frontier</strong> is the new foundation replacing BetterScripts.
            It's a standardized, bidirectional channel between the AI Dungeon script sandbox and BetterDungeon,
            built to <em>unshackle</em> scenarios from the sandbox's walls. With a player's permission, your
            scripts can finally reach the web, track real time, or tap a local AI, while your adventure
            text stays completely clean.
          </p>
          <p class="text-sm text-bd-text-muted leading-relaxed">
            Frontier isn't a feature. It's a <strong class="text-bd-text-secondary">platform</strong>. Widgets
            become just the first module (<strong class="text-bd-text-secondary">Scripture</strong>); everything
            that comes next: web, clock, local AI all slot in the same way.
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== WHAT CHANGES ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <ArrowLeftRight class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">What changes for your scenarios</h2>
      </div>
      <p class="text-bd-text-secondary">
        BetterScripts was a one-way street. Your scripts could send data out to BetterDungeon to render widgets,
        but that was it. No responses, no answers, no conversation. Frontier changes everything by opening a
        two-way channel. Scripts can now ask BetterDungeon for things and actually get answers back.
      </p>

      <div class="grid md:grid-cols-2 gap-3">
        <!-- BEFORE -->
        <div class="p-5 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-red/15 flex items-center justify-center">
              <Hourglass class="w-4 h-4 text-bd-red" />
            </div>
            <h3 class="font-semibold text-bd-text-primary">With BetterScripts</h3>
          </div>
          <ul class="space-y-2.5 text-sm">
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Invisible characters smuggled into the story to carry widget data.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Every scenario needed a Context Modifier just to hide them from the AI.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Undo and retry could leave widgets out of sync with the story.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>One-way communication only. Scripts sent data out but never heard back.</span>
            </li>
          </ul>
        </div>

        <!-- AFTER -->
        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-accent-primary/10 to-bd-purple/10 border border-bd-accent-primary/30 shadow-glow">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-accent-primary/20 flex items-center justify-center">
              <Sparkles class="w-4 h-4 text-bd-accent-primary" />
            </div>
            <h3 class="font-semibold text-bd-text-primary">With Frontier</h3>
          </div>
          <ul class="space-y-2.5 text-sm">
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>Your adventure text stays exactly as you wrote it.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>No Context Modifier boilerplate. No encode/decode helpers to maintain.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>Undo, retry, edit, and widgets always match the current turn. Automatically.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>Two-way communication. Scripts send requests and get real answers back from the web, time, local models, and more.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ==================== WHAT IT UNLOCKS ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <Wand2 class="w-5 h-5 text-bd-purple" />
        <h2 class="text-lg font-semibold text-bd-text-primary">What this unlocks</h2>
      </div>
      <p class="text-bd-text-secondary">
        Each capability ships as its own <strong class="text-bd-text-primary">module</strong>. Authors pick which ones their scenario uses;
        players decide which ones to turn on. Four examples of what that looks like:
      </p>

      <div class="space-y-3">
        <!-- Scripture -->
        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-green/10 to-transparent border border-bd-green/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-green/20 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard class="w-5 h-5 text-bd-green" />
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-bd-text-primary">Scripture, widgets done right</h3>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-green/25 text-bd-green uppercase tracking-wider">Day one</span>
              </div>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Everything BetterScripts already did beautifully, including HP bars, inventories, status badges,
                and panels, rebuilt on Frontier. Same expressive toolkit, now undo-proof and
                zero-maintenance for the author.
              </p>
            </div>
          </div>
        </div>

        <!-- WebSearch -->
        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-blue/10 to-transparent border border-bd-blue/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
              <Globe class="w-5 h-5 text-bd-blue" />
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-bd-text-primary">An NPC who knows what's real</h3>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-blue/25 text-bd-blue uppercase tracking-wider">Planned</span>
              </div>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Your bartender glances at the rain and mutters that it's cold for March in Seattle. Because
                it is. Your fixer quotes a real headline. Scripts can ask the web, and the answer quietly
                weaves into the AI's context next turn.
              </p>
            </div>
          </div>
        </div>

        <!-- Clock -->
        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-amber/10 to-transparent border border-bd-amber/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
              <Clock class="w-5 h-5 text-bd-amber" />
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-bd-text-primary">A clock that actually keeps time</h3>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-amber/25 text-bd-amber uppercase tracking-wider">Planned</span>
              </div>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                The tavern closes at sunset. The cursed ritual fires at midnight, your midnight.
                Play for a week and come back to a changed world. Long campaigns finally get a calendar
                to hang events on.
              </p>
            </div>
          </div>
        </div>

        <!-- LocalAI -->
        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-purple/10 to-transparent border border-bd-purple/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
              <Cpu class="w-5 h-5 text-bd-purple" />
            </div>
            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-bd-text-primary">A helper AI running on your machine</h3>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-purple/25 text-bd-purple uppercase tracking-wider">Research</span>
              </div>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Let a browser-local model handle the small jobs like classifying commands, summarizing
                the last session, and tagging a new character without eating your AI Dungeon context budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== UNDER THE HOOD ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-cyan" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Under the hood, in plain terms</h2>
      </div>
      <p class="text-bd-text-secondary">
        Frontier rides AI Dungeon's own rails. No side channels, no invisible text, no bespoke backend;
        just story cards and the subscription AI Dungeon already uses.
      </p>

      <div class="grid md:grid-cols-3 gap-3">
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
          <div class="flex items-center gap-2">
            <Radio class="w-4 h-4 text-bd-cyan" />
            <h3 class="text-sm font-semibold text-bd-text-primary">Cards-only transport</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            Scripts publish module state to reserved <code class="text-bd-accent-light">frontier:state:*</code>
            cards. BetterDungeon reads them live from AI Dungeon's WebSocket. One heartbeat card tells scripts
            BD is present.
          </p>
        </div>
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
          <div class="flex items-center gap-2">
            <History class="w-4 h-4 text-bd-amber" />
            <h3 class="text-sm font-semibold text-bd-text-primary">Action-ID history</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            Every turn has a stable id. Scripts stash per-turn values keyed by that id; BD looks up whichever
            id is currently the tail. Undo, retry, edit, and continue all just work with no invisible
            characters required.
          </p>
        </div>
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
          <div class="flex items-center gap-2">
            <Puzzle class="w-4 h-4 text-bd-purple" />
            <h3 class="text-sm font-semibold text-bd-text-primary">Modules, not monoliths</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            Each capability is its own module with a matched Library snippet and BD-side handler. Authors
            opt in per scenario, players opt in per install. Scripture ships day one; more follow.
          </p>
        </div>
      </div>

      <div class="flex items-start gap-3 p-4 rounded-xl bg-bd-green/10 border border-bd-green/30">
        <ShieldCheck class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
        <p class="text-sm text-bd-text-secondary leading-relaxed">
          <strong class="text-bd-text-primary">Players stay in the driver's seat.</strong> Frontier has a master
          toggle and a per-module toggle for every capability. A scenario can <em>ask</em>, but only the player
          can <em>grant</em>.
        </p>
      </div>
    </section>

    <!-- ==================== FOR AUTHORS (CODE PEEK) ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <Code2 class="w-5 h-5 text-bd-green" />
        <h2 class="text-lg font-semibold text-bd-text-primary">For authors: a peek at the shape</h2>
      </div>
      <p class="text-bd-text-secondary">
        No codec. No Context Modifier. No invisible characters to debug. You paste a tiny base Library once,
        then per-module adapters are just a few lines on top. A Scripture widget update ends up looking like:
      </p>

      <div class="rounded-xl border border-bd-border-subtle bg-bd-bg-tertiary overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 border-b border-bd-border-subtle bg-bd-bg-elevated/40">
          <div class="flex items-center gap-2">
            <FileCode class="w-3.5 h-3.5 text-bd-text-muted" />
            <span class="text-xs font-mono text-bd-text-muted">Scenario Library — Output Modifier</span>
          </div>
          <span class="text-[10px] font-semibold text-bd-green uppercase tracking-wider">Illustrative</span>
        </div>
<pre class="m-0 p-4 text-xs leading-relaxed text-bd-text-secondary overflow-x-auto"><code><span class="text-bd-text-muted">// Once per turn, update the widgets your author-side logic tracks.</span>
<span class="text-bd-purple">scriptureSet</span>({
  <span class="text-bd-cyan">manifest</span>: [
    { <span class="text-bd-cyan">id</span>: <span class="text-bd-green">'hp'</span>,    <span class="text-bd-cyan">type</span>: <span class="text-bd-green">'bar'</span>,   <span class="text-bd-cyan">label</span>: <span class="text-bd-green">'HP'</span>,    <span class="text-bd-cyan">max</span>: <span class="text-bd-amber">100</span> },
    { <span class="text-bd-cyan">id</span>: <span class="text-bd-green">'gold'</span>,  <span class="text-bd-cyan">type</span>: <span class="text-bd-green">'badge'</span>, <span class="text-bd-cyan">label</span>: <span class="text-bd-green">'Gold'</span> },
  ],
  <span class="text-bd-cyan">values</span>: { <span class="text-bd-cyan">hp</span>: state.player.hp, <span class="text-bd-cyan">gold</span>: state.player.gold },
});
<span class="text-bd-text-muted">// That's it. Undo, retry, edit, refresh: all handled by Frontier.</span></code></pre>
      </div>

      <div class="grid sm:grid-cols-2 gap-3 text-xs">
        <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <Feather class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
          <span class="text-bd-text-secondary">
            The base Library is roughly <strong class="text-bd-text-primary">60 lines</strong>. Paste once; forget it.
          </span>
        </div>
        <div class="flex items-start gap-2 p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <BookOpen class="w-4 h-4 text-bd-blue flex-shrink-0 mt-0.5" />
          <span class="text-bd-text-secondary">
            A dedicated <strong class="text-bd-text-primary">Scripture Guide</strong> lands in BetterRepository
            the moment the first module ships.
          </span>
        </div>
      </div>
    </section>

    <!-- ==================== ROADMAP ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <GitBranch class="w-5 h-5 text-bd-purple" />
        <h2 class="text-lg font-semibold text-bd-text-primary">The roadmap, in phases</h2>
      </div>
      <p class="text-bd-text-secondary">
        Frontier ships in layers. The first release, <strong class="text-bd-text-primary">Frontier Lite</strong>,
        is one-way (scripts to BetterDungeon) and focuses on getting the foundation right. Everything else
        extends it additively: nothing you build on Lite has to be rewritten later.
      </p>

      <ol class="relative border-l-2 border-bd-border-subtle ml-2 space-y-5">
        <li class="pl-6 relative">
          <span class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-bd-green flex items-center justify-center">
            <Check class="w-3 h-3 text-white" />
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-bd-text-primary text-sm">Phase 0: Verify the foundations</h3>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-green/25 text-bd-green uppercase tracking-wider">Planned</span>
            </div>
            <p class="text-xs text-bd-text-secondary leading-relaxed">
              Empirically confirm AI Dungeon's action-ID stability across undo, retry, continue, and edit.
              Pin down the exact WebSocket subscription that carries the action window. Multiplatform smoke
              tests on Chromium, Gecko, and Android WebView.
            </p>
          </div>
        </li>

        <li class="pl-6 relative">
          <span class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-bd-accent-primary flex items-center justify-center">
            <Rocket class="w-3 h-3 text-white" />
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-bd-text-primary text-sm">Phase 1: Frontier Lite + Scripture</h3>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-accent-primary/25 text-bd-accent-light uppercase tracking-wider">MVP</span>
            </div>
            <p class="text-xs text-bd-text-secondary leading-relaxed">
              The actual shipping scope for V2: transport, thin router, module registry, and the Scripture
              module rebuilt on action-ID history. Pixel-identical to BetterScripts' widgets, with
              bulletproof undo/retry out of the box.
            </p>
          </div>
        </li>

        <li class="pl-6 relative">
          <span class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-bd-purple flex items-center justify-center">
            <Zap class="w-3 h-3 text-white" />
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-bd-text-primary text-sm">Phase 2: Full Frontier (two-way)</h3>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-purple/25 text-bd-purple uppercase tracking-wider">Post-MVP</span>
            </div>
            <p class="text-xs text-bd-text-secondary leading-relaxed">
              The real unshackling. Scripts send requests, BetterDungeon returns answers. Adds the WebFetch,
              Clock, and other &ldquo;ask the world&rdquo; modules, plus multi-turn request/response handling.
              Existing Lite modules keep working unchanged.
            </p>
          </div>
        </li>

        <li class="pl-6 relative">
          <span class="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-bd-cyan flex items-center justify-center">
            <Wand2 class="w-3 h-3 text-white" />
          </span>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-bd-text-primary text-sm">Phase 3+: Beyond</h3>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-bd-cyan/25 text-bd-cyan uppercase tracking-wider">Exploring</span>
            </div>
            <p class="text-xs text-bd-text-secondary leading-relaxed">
              Local-AI helpers, third-party modules with a sandboxed loader, richer widget primitives, and
              whatever the community invents once the door is open. Frontier is designed to keep growing
              without breaking what came before.
            </p>
          </div>
        </li>
      </ol>
    </section>

    <!-- ==================== FAQ ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-blue" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Quick answers</h2>
      </div>

      <div class="space-y-3">
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">Do my BetterScripts widgets carry over automatically?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            No. Frontier is a clean break with no backward compatibility with the old wire format. The
            migration is mechanical though: swap the BetterScripts snippet for the Frontier base Library
            plus the Scripture adapter, and your widget definitions map over almost one-to-one. A migration
            walkthrough will land with the V2 release notes.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">Does Frontier touch my adventure text or context?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            No. Nothing Frontier does writes to the visible story or the model context. All communication
            lives in reserved <code class="text-bd-accent-light">frontier:*</code> story cards, which
            BetterDungeon hides from its own UI. Your prose stays exactly as you wrote it.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">What if a player doesn't have BetterDungeon installed?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            The scenario degrades gracefully. The base Library exposes a
            <code class="text-bd-accent-light">frontierIsAvailable()</code> check, so authors can branch
            and skip the fancy bits when BD isn't listening. Nothing breaks; the player just doesn't see
            the enhancements.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">Will Firefox and Android really be feature-parity?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            That's the bar. &ldquo;Multiplatform by default&rdquo; is a locked-in design principle: every
            Frontier decision must work on Chromium, Gecko, and Android WebView, with a documented fallback
            wherever the native path isn't available.
          </p>
        </div>
      </div>
    </section>

    <!-- ==================== THE BIG SHIFT ==================== -->
    <section class="relative overflow-hidden rounded-2xl border border-bd-accent-primary/30">
      <div class="absolute inset-0 bg-gradient-to-br from-bd-accent-primary/10 via-bd-purple/10 to-bd-cyan/10" aria-hidden="true" />
      <div class="relative p-6 md:p-8 space-y-4">
        <div class="flex items-center gap-2">
          <Zap class="w-5 h-5 text-bd-accent-primary" />
          <h2 class="text-lg font-semibold text-bd-text-primary">Why this matters</h2>
        </div>
        <p class="text-bd-text-secondary text-lg leading-relaxed max-w-3xl">
          BetterScripts opened the door for scripts to talk to BetterDungeon, but only one way. Your scripts could
          shout into the void and BetterDungeon would draw widgets, but there was no way to shout back.
        </p>
        <p class="text-bd-text-secondary leading-relaxed max-w-3xl">
          Frontier turns that into a conversation. Scripts still run safely in their sandbox, but now they can
          ask BetterDungeon for real things and get actual answers. The web, the clock, a local AI, anything
          BetterDungeon can reach. The player stays in control by saying yes to each request.
        </p>
      </div>
    </section>

    <!-- ==================== BD V2 TEASER ==================== -->
    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <PackageOpen class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Frontier is just one piece of BetterDungeon V2</h2>
      </div>
      <p class="text-bd-text-secondary leading-relaxed">
        V2 is a coordinated launch. Frontier is the headline feature, but it ships alongside two things
        BetterDungeon has never had before: a <strong class="text-bd-text-primary">native Android build</strong>
        and an official <strong class="text-bd-text-primary">Firefox release</strong>. Three pillars, one release.
      </p>

      <div class="grid md:grid-cols-3 gap-3">
        <!-- Frontier -->
        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-accent-primary/15 to-bd-purple/10 border border-bd-accent-primary/40 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-bd-accent-primary/20 flex items-center justify-center">
              <Sparkles class="w-4 h-4 text-bd-accent-primary" />
            </div>
            <h3 class="font-semibold text-bd-text-primary text-sm">Frontier</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            The new scripting platform. Scripture on day one; web, clock, and local-AI modules on the roadmap.
          </p>
        </div>

        <!-- Android -->
        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-green/15 to-transparent border border-bd-green/40 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-bd-green/20 flex items-center justify-center">
              <Smartphone class="w-4 h-4 text-bd-green" />
            </div>
            <h3 class="font-semibold text-bd-text-primary text-sm">Android build</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            A native APK so BetterDungeon finally rides along on your phone. Same features, same toggles, same
            adventures, distributed outside the Play Store.
          </p>
        </div>

        <!-- Firefox -->
        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-amber/15 to-bd-red/10 border border-bd-amber/40 space-y-2">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-bd-amber/20 flex items-center justify-center">
              <Flame class="w-4 h-4 text-bd-amber" />
            </div>
            <h3 class="font-semibold text-bd-text-primary text-sm">Firefox listing</h3>
          </div>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            An official release on addons.mozilla.org. No more sideloading unsigned builds. Just install
            it like any other extension.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 pt-2">
        <CalendarClock class="w-4 h-4 text-bd-text-muted" />
        <p class="text-sm text-bd-text-muted">
          The release you're using now, <strong class="text-bd-text-secondary">BetterRepository v1.6</strong>,
          is the last V1-era polish pass. After this, the work shifts to V2.
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-bd-border-subtle">
        <p class="text-sm text-bd-text-secondary">
          Want a front-row seat? Come help shape the design.
        </p>
        <div class="flex gap-2">
          <a
            href="https://discord.com/invite/HB2YBZYjyf"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-bd-cyan/20 text-bd-cyan hover:bg-bd-cyan/30 transition-colors"
          >
            <MessageCircle class="w-4 h-4" />
            Join the Discord
          </a>
          <a
            href="https://github.com/ComputerKWasTaken/BetterDungeon"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium bg-bd-bg-tertiary text-bd-text-primary hover:bg-bd-bg-elevated transition-colors"
          >
            <Github class="w-4 h-4" />
            Watch the repo
          </a>
        </div>
      </div>
    </section>

    <!-- ==================== FOOTER NOTE ==================== -->
    <div class="text-center text-xs text-bd-text-muted italic pb-4">
      BetterScripts taught us what was possible. Frontier is where we go from there.
    </div>
  </div>
</template>

<script setup>
import {
  Sparkles, Rocket, ArrowLeftRight, Hourglass, X, Check,
  Wand2, LayoutDashboard, Globe, Clock, Cpu,
  Zap, CalendarClock, MessageCircle, Github,
  Layers, Radio, History, Puzzle, ShieldCheck,
  PackageOpen, Smartphone, Flame,
  Code2, FileCode, Feather, BookOpen, GitBranch, HelpCircle
} from 'lucide-vue-next'
</script>
