<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header class="text-center py-6">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 mb-4">
        <GitPullRequest class="w-8 h-8 text-bd-accent-primary" />
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-2">
        Share Your <span class="text-gradient">Creations</span>
      </h1>
      <p class="text-bd-text-secondary max-w-md mx-auto">
        Contribute to the community. No coding required — just paste and submit.
      </p>
    </header>

    <!-- The Easy Way - Primary CTA -->
    <section class="card-elevated border-2 border-bd-accent-primary/30">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <Zap class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">The Easy Way</h2>
          <p class="text-bd-text-secondary mb-4">
            Just paste your content and tell me what it does. That's it. I'll handle the formatting.
          </p>
          <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <span class="w-7 h-7 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold text-sm flex items-center justify-center">1</span>
              <span class="text-sm text-bd-text-primary font-medium">Open an issue</span>
            </div>
            <ArrowRight class="w-4 h-4 text-bd-accent-primary hidden md:block" />
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <span class="w-7 h-7 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold text-sm flex items-center justify-center">2</span>
              <span class="text-sm text-bd-text-primary font-medium">Paste content</span>
            </div>
            <ArrowRight class="w-4 h-4 text-bd-accent-primary hidden md:block" />
            <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-bd-success/10 border border-bd-success/30">
              <span class="w-7 h-7 rounded-full bg-bd-success text-bd-bg-primary font-bold text-sm flex items-center justify-center">✓</span>
              <span class="text-sm text-bd-success font-medium">Done!</span>
            </div>
          </div>
          <a 
            href="https://github.com/ComputerKWasTaken/BetterRepository/issues/new" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <Github class="w-4 h-4" />
            Open a GitHub Issue
            <ExternalLink class="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>

    <!-- What Can You Submit -->
    <section class="card">
      <div class="section-header mb-4">
        <Layers class="w-4 h-4" />
        <span>What Can You Submit?</span>
      </div>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-amber/5 border border-bd-amber/20 hover:border-bd-amber/40 transition-colors">
          <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center flex-shrink-0">
            <ScrollText class="w-4 h-4 text-bd-amber" />
          </div>
          <div>
            <span class="font-medium text-bd-text-primary">AI Instructions</span>
            <p class="text-xs text-bd-text-muted">Style, pacing, tone rules, etc.</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-blue/5 border border-bd-blue/20 hover:border-bd-blue/40 transition-colors">
          <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center flex-shrink-0">
            <Bookmark class="w-4 h-4 text-bd-blue" />
          </div>
          <div>
            <span class="font-medium text-bd-text-primary">Plot Components</span>
            <p class="text-xs text-bd-text-muted">Plot Essentials, Story Summary, Author's Notes</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-purple/5 border border-bd-purple/20 hover:border-bd-purple/40 transition-colors">
          <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0">
            <Drama class="w-4 h-4 text-bd-purple" />
          </div>
          <div>
            <span class="font-medium text-bd-text-primary">Story Cards</span>
            <p class="text-xs text-bd-text-muted">Templates for characters, locations, items</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-cyan/5 border border-bd-cyan/20 hover:border-bd-cyan/40 transition-colors">
          <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center flex-shrink-0">
            <Code class="w-4 h-4 text-bd-cyan" />
          </div>
          <div>
            <span class="font-medium text-bd-text-primary">Scripts</span>
            <p class="text-xs text-bd-text-muted">Game mechanics, utilities, automation</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Checklist -->
    <section class="card">
      <div class="flex items-center gap-2 mb-4">
        <CheckCircle class="w-5 h-5 text-bd-success" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Before You Submit</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It works</strong>, You've tested it in AI Dungeon</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's original</strong>, Or you have permission</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's described</strong>, A sentence explaining what it does</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's appropriate</strong>, Follows AI Dungeon ToS</span>
        </div>
      </div>
      <p class="text-sm text-bd-text-muted mt-4 text-center">
        Don't worry about perfect formatting, I'll clean it up.
      </p>
    </section>

    <!-- Example Submission -->
    <section class="card-elevated border border-bd-border">
      <div class="flex items-center gap-2 mb-4">
        <FileText class="w-5 h-5 text-bd-accent-primary" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Example Submission</h2>
      </div>
      <p class="text-sm text-bd-text-secondary mb-4">
        Here's what a good submission looks like:
      </p>
      <div class="rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle overflow-hidden">
        <div class="px-4 py-2 bg-bd-bg-secondary border-b border-bd-border-subtle flex items-center gap-2">
          <div class="w-3 h-3 rounded-full bg-bd-error/50"></div>
          <div class="w-3 h-3 rounded-full bg-bd-amber/50"></div>
          <div class="w-3 h-3 rounded-full bg-bd-success/50"></div>
          <span class="text-xs text-bd-text-muted ml-2">submission.md</span>
        </div>
        <pre class="p-4 text-sm overflow-x-auto"><span class="text-bd-amber font-medium">**Name:**</span> <span class="text-bd-text-primary">Concise Writing Style</span>

<span class="text-bd-amber font-medium">**Category:**</span> <span class="text-bd-text-primary">AI Instruction</span>

<span class="text-bd-amber font-medium">**Description:**</span> <span class="text-bd-text-secondary">Makes the AI write shorter, punchier sentences. Good for action scenes.</span>

<span class="text-bd-amber font-medium">**Content:**</span>
<span class="text-bd-text-primary">Write in a concise, punchy style. Use short sentences. Avoid purple prose.
Favor active voice over passive. Every word should earn its place.</span></pre>
      </div>
    </section>

    <!-- Alternative Methods -->
    <section class="card">
      <div class="flex items-center gap-2 mb-4">
        <GitMerge class="w-5 h-5 text-bd-text-muted" />
        <h2 class="text-lg font-semibold text-bd-text-primary">Other Ways to Contribute</h2>
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <!-- Pull Request -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-center gap-3 mb-2">
            <Github class="w-5 h-5 text-bd-text-primary" />
            <h3 class="font-medium text-bd-text-primary">Pull Request</h3>
          </div>
          <p class="text-sm text-bd-text-secondary mb-3">
            If you're comfortable with Git, fork the repo and submit a PR.
          </p>
          <a 
            href="https://github.com/ComputerKWasTaken/BetterRepository" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-1"
          >
            View Repository <ExternalLink class="w-3 h-3" />
          </a>
        </div>

        <!-- Discord -->
        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <div class="flex items-center gap-3 mb-2">
            <MessageCircle class="w-5 h-5 text-bd-blue" />
            <h3 class="font-medium text-bd-text-primary">Discord</h3>
          </div>
          <p class="text-sm text-bd-text-secondary mb-3">
            Share in the AI Dungeon Discord and ping me to add it.
          </p>
          <a 
            href="https://discord.gg/aidungeon" 
            target="_blank" 
            rel="noopener noreferrer"
            class="text-sm text-bd-accent-primary hover:underline flex items-center gap-1"
          >
            Join Discord <ExternalLink class="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>

    <!-- Recognition -->
    <section class="card text-center">
      <Award class="w-10 h-10 text-bd-accent-primary mx-auto mb-3" />
      <h2 class="text-lg font-semibold text-bd-text-primary mb-2">You'll Be Credited</h2>
      <p class="text-bd-text-secondary max-w-md mx-auto">
        All contributors are recognized in the repository. Your name will appear alongside your contributions.
      </p>
    </section>
  </div>
</template>

<script setup>
import { 
  GitPullRequest, Zap, CheckCircle, Check, Layers, ArrowRight,
  ScrollText, Bookmark, Drama, Code, GitMerge, MessageCircle,
  ExternalLink, Github, FileText, Award
} from 'lucide-vue-next'
</script>
