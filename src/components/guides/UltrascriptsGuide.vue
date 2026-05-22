<template>
  <div class="space-y-6 animate-fade-in">
    <section class="relative overflow-hidden rounded-2xl border border-bd-border-subtle">
      <div class="absolute inset-0 bg-gradient-to-br from-bd-accent-primary/15 via-bd-cyan/10 to-bd-green/15" aria-hidden="true" />
      <div class="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true">
        <div class="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-bd-accent-primary/30 blur-3xl animate-float" />
        <div class="absolute -bottom-24 -left-12 w-80 h-80 rounded-full bg-bd-cyan/25 blur-3xl animate-float" style="animation-delay: 2s" />
      </div>

      <div class="relative p-8 md:p-12 space-y-5">
        <div class="flex flex-wrap items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-bd-accent-primary/20 text-bd-accent-light">
            <Sparkles class="w-3 h-3" />
            The new scripting foundation
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-bd-green/20 text-bd-green">
            <CheckCircle2 class="w-3 h-3" />
            Built for real scenarios
          </span>
        </div>

        <div class="space-y-4 max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold text-bd-text-primary tracking-tight leading-[1.1]">
            Ultrascripts makes scenarios feel <span class="text-gradient">alive</span>, not just clever.
          </h1>
          <p class="text-lg text-bd-text-secondary leading-relaxed">
            Ultrascripts replaces BetterScripts, but the real upgrade is bigger than widgets. It lets a scenario track
            itself better, react better, and present itself better, so the whole experience feels more intentional
            instead of more improvised.
          </p>
          <p class="text-sm text-bd-text-muted leading-relaxed">
            If BetterScripts made scenarios feel decorated, Ultrascripts makes them feel designed.
          </p>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <HeartHandshake class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Why people should care</h2>
      </div>
      <p class="text-bd-text-secondary">
        Ultrascripts matters because it changes what a scenario can feel like in play.
      </p>

      <div class="grid md:grid-cols-2 gap-3">
        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-green/10 to-transparent border border-bd-green/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-green/20 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard class="w-5 h-5 text-bd-green" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">Your UI can finally be trustworthy</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Health bars, trackers, badges, dashboards, toggles, and control panels can stop feeling like fragile
                ornaments. Players can actually rely on them, which means authors can build mechanics around them
                with confidence.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-blue/10 to-transparent border border-bd-blue/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
              <MessageSquareMore class="w-5 h-5 text-bd-blue" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">Scripts can ask for help and get answers back</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                A scenario can do more than show information. It can check, react, adapt, and use outside help when
                it makes the experience better. That is the difference between a static script gimmick and a living system.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-amber/10 to-transparent border border-bd-amber/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
              <Feather class="w-5 h-5 text-bd-amber" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">Your story stays clean</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Ultrascripts does not ask authors to smear transport junk into the narrative. The writing stays clean,
                the AI sees the story instead of a carrier signal, and the whole scenario feels less hacked together.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-purple/10 to-transparent border border-bd-purple/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
              <ShieldCheck class="w-5 h-5 text-bd-purple" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">Players keep control</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Ultrascripts is ambitious without being invasive. Players decide what they enable, which means authors
                can build bold ideas without crossing the line into “this scenario is doing too much behind my back.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <ArrowLeftRight class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">What changed from BetterScripts</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-3">
        <div class="p-5 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-red/15 flex items-center justify-center">
              <X class="w-4 h-4 text-bd-red" />
            </div>
            <h3 class="font-semibold text-bd-text-primary">With BetterScripts</h3>
          </div>
          <ul class="space-y-2.5 text-sm">
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Widgets were the main event. Everything else was out of reach.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Transport details leaked into the writing experience.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <X class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <span>Undo and retry were the kinds of things you worried about.</span>
            </li>
          </ul>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-br from-bd-accent-primary/10 to-bd-cyan/10 border border-bd-accent-primary/30 shadow-glow">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-bd-accent-primary/20 flex items-center justify-center">
              <Check class="w-4 h-4 text-bd-accent-primary" />
            </div>
            <h3 class="font-semibold text-bd-text-primary">With Ultrascripts</h3>
          </div>
          <ul class="space-y-2.5 text-sm">
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>Widgets are just one module in a much bigger system.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>Scenarios can display state, request outside help, and react to the results.</span>
            </li>
            <li class="flex items-start gap-2 text-bd-text-secondary">
              <Check class="w-4 h-4 text-bd-green flex-shrink-0 mt-0.5" />
              <span>The system is built around the way people actually play, including undoing, retrying, and revising.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <Wand2 class="w-5 h-5 text-bd-purple" />
        <h2 class="text-lg font-semibold text-bd-text-primary">The kinds of scenarios this unlocks</h2>
      </div>
      <p class="text-bd-text-secondary">
        The easiest way to understand Ultrascripts is to picture the kinds of moments it makes possible.
      </p>

      <div class="space-y-3">
        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-green/10 to-transparent border border-bd-green/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-green/20 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard class="w-5 h-5 text-bd-green" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">A proper game-like interface</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                A survival scenario can have a real condition panel. A dungeon crawler can track cooldowns and status
                cleanly. A kingdom sim can expose a whole dashboard. The interface stops feeling like a novelty and
                starts feeling like part of the game.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-blue/10 to-transparent border border-bd-blue/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
              <CloudSun class="w-5 h-5 text-bd-blue" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">A world that feels grounded</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                A city can know what time it is. A travel story can know the weather. A quiet camp scene can feel
                different at dawn than it does at midnight. Ultrascripts helps stories feel placed somewhere instead of nowhere.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-amber/10 to-transparent border border-bd-amber/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
              <BookHeart class="w-5 h-5 text-bd-amber" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">A scenario that remembers what matters</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Progression systems, long arcs, recurring threats, and slow-burn campaign mechanics get easier to
                trust. Authors can commit to ideas that would have felt too fragile before.
              </p>
            </div>
          </div>
        </div>

        <div class="p-5 rounded-xl bg-gradient-to-r from-bd-purple/10 to-transparent border border-bd-purple/30">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
              <BrainCircuit class="w-5 h-5 text-bd-purple" />
            </div>
            <div class="space-y-1.5">
              <h3 class="font-semibold text-bd-text-primary">Scripts that can think a little smarter</h3>
              <p class="text-sm text-bd-text-secondary leading-relaxed">
                Some work belongs in the background: classifying, organizing, summarizing, shaping, cleaning up.
                Ultrascripts makes room for that kind of support work so the main story can stay focused on being a story.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <BookOpen class="w-5 h-5 text-bd-cyan" />
        <h2 class="text-lg font-semibold text-bd-text-primary">What it feels like to author with</h2>
      </div>
      <p class="text-bd-text-secondary">
        The biggest quality-of-life win is that Ultrascripts lets authors think less about transport and more about experience.
      </p>

      <div class="grid md:grid-cols-2 gap-3">
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
          <h3 class="text-sm font-semibold text-bd-text-primary">You think in features</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            “I want a timer.” “I want a ritual tracker.” “I want an NPC control panel.” “I want weather to matter.”
            Ultrascripts keeps those as design ideas instead of turning them into plumbing problems.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
          <h3 class="text-sm font-semibold text-bd-text-primary">You stop fighting the plumbing</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            You do not need one architecture for simple scripts and another for ambitious ones. A small idea can stay
            small, and a growing idea can grow naturally.
          </p>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <ShieldCheck class="w-5 h-5 text-bd-green" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Why this is safer and cleaner</h2>
      </div>

      <div class="space-y-3">
        <div class="flex items-start gap-3 p-4 rounded-xl bg-bd-green/10 border border-bd-green/30">
          <CheckCircle2 class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
          <p class="text-sm text-bd-text-secondary leading-relaxed">
            Ultrascripts keeps communication out of the visible narrative, so the story reads like a story instead of a
            carrier signal.
          </p>
        </div>

        <div class="flex items-start gap-3 p-4 rounded-xl bg-bd-green/10 border border-bd-green/30">
          <CheckCircle2 class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
          <p class="text-sm text-bd-text-secondary leading-relaxed">
            Players control the modules they allow, so a scenario cannot silently claim capabilities the player does
            not want to grant.
          </p>
        </div>

        <div class="flex items-start gap-3 p-4 rounded-xl bg-bd-green/10 border border-bd-green/30">
          <CheckCircle2 class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
          <p class="text-sm text-bd-text-secondary leading-relaxed">
            Authors can build richer systems without needing a separate exception architecture for “simple” scripts.
            Simple and advanced scenarios live on the same foundation.
          </p>
        </div>
      </div>
    </section>

    <section class="card space-y-5">
      <div class="flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-blue" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Quick answers</h2>
      </div>

      <div class="space-y-3">
        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">Do I need to use every part of Ultrascripts?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            No. Some scenarios will only use Scripture. Others will branch into weather, time, AI, or utility modules.
            The point is not that every scenario should do everything. The point is that they finally can grow when it helps.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">Is this mostly for technical authors?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            Technical authors will feel the unlock first, but the long-term value is broader: better scenario formats,
            better authoring patterns, and better player-facing experiences.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5">
          <h3 class="text-sm font-semibold text-bd-text-primary">What is the main takeaway?</h3>
          <p class="text-xs text-bd-text-secondary leading-relaxed">
            Ultrascripts makes a scenario feel authored on purpose. More reliable. More expressive. More like an experience
            someone meant to build, not just something they managed to jury-rig.
          </p>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden rounded-2xl border border-bd-accent-primary/30">
      <div class="absolute inset-0 bg-gradient-to-br from-bd-accent-primary/10 via-bd-cyan/10 to-bd-green/10" aria-hidden="true" />
      <div class="relative p-6 md:p-8 space-y-4">
        <div class="flex items-center gap-2">
          <Zap class="w-5 h-5 text-bd-accent-primary" />
          <h2 class="text-lg font-semibold text-bd-text-primary">The pitch in one sentence</h2>
        </div>
        <p class="text-bd-text-secondary text-lg leading-relaxed max-w-3xl">
          Ultrascripts is worth caring about because it raises the ceiling on what a scenario can be while making the whole
          thing feel cleaner, sturdier, and more intentional.
        </p>
      </div>
    </section>

    <div class="text-center text-xs text-bd-text-muted italic pb-4">
      BetterScripts proved people wanted more. Ultrascripts is what “more” looks like when it is done properly.
    </div>
  </div>
</template>

<script setup>
import {
  Sparkles, CheckCircle2, HeartHandshake, LayoutDashboard, MessageSquareMore,
  Feather, ShieldCheck, ArrowLeftRight, X, Check, Wand2, CloudSun, BookHeart,
  BrainCircuit, BookOpen, HelpCircle, Zap
} from 'lucide-vue-next'
</script>
