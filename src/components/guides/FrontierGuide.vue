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
            With a player's permission, your scenarios can finally reach the web, track real time, or tap a
            local AI, while your adventure text stays completely clean.
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

    <!-- ==================== WHEN / CTA ==================== -->
    <section class="card space-y-4">
      <div class="flex items-center gap-2">
        <CalendarClock class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">When can I try it?</h2>
      </div>

      <p class="text-bd-text-secondary leading-relaxed">
        Frontier ships with <strong class="text-bd-text-primary">BetterDungeon V2</strong>, alongside the Android
        build, the Firefox release, and refreshed store pages. One coordinated launch.
      </p>
      <p class="text-bd-text-secondary leading-relaxed">
        The release you're using now, BetterRepository v1.6, is the last V1-era polish pass.
        After this, the work shifts to Frontier.
      </p>

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
  Zap, CalendarClock, MessageCircle, Github
} from 'lucide-vue-next'
</script>
