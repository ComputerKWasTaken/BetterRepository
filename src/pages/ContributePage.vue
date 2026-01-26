<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center">
          <GitPullRequest class="w-5 h-5 text-bd-accent-primary" />
        </div>
        Contribute
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Share your creations with the AI Dungeon community. No coding required.
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
          <div class="flex items-center gap-6 mb-4">
            <div class="flex items-center gap-2 text-sm text-bd-text-secondary">
              <span class="w-6 h-6 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold flex items-center justify-center">1</span>
              Open an issue
            </div>
            <ArrowRight class="w-4 h-4 text-bd-text-muted" />
            <div class="flex items-center gap-2 text-sm text-bd-text-secondary">
              <span class="w-6 h-6 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold flex items-center justify-center">2</span>
              Paste your content
            </div>
            <ArrowRight class="w-4 h-4 text-bd-text-muted" />
            <div class="flex items-center gap-2 text-sm text-bd-text-secondary">
              <span class="w-6 h-6 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold flex items-center justify-center">3</span>
              Done!
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
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <Layers class="w-5 h-5 text-bd-accent-primary" />
        What Can You Submit?
      </h2>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <ScrollText class="w-5 h-5 text-bd-amber" />
          <div>
            <span class="font-medium text-bd-text-primary">AI Instructions</span>
            <span class="text-sm text-bd-text-muted ml-2">Style, pacing, tone rules</span>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Bookmark class="w-5 h-5 text-bd-blue" />
          <div>
            <span class="font-medium text-bd-text-primary">Plot Components</span>
            <span class="text-sm text-bd-text-muted ml-2">Author's Notes, Memory Banks</span>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Drama class="w-5 h-5 text-bd-purple" />
          <div>
            <span class="font-medium text-bd-text-primary">Story Cards</span>
            <span class="text-sm text-bd-text-muted ml-2">Characters, locations, items</span>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-bg-tertiary">
          <Code class="w-5 h-5 text-bd-cyan" />
          <div>
            <span class="font-medium text-bd-text-primary">Scripts</span>
            <span class="text-sm text-bd-text-muted ml-2">Game mechanics, utilities</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Checklist -->
    <section class="card">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-bd-success" />
        Before You Submit
      </h2>
      <div class="grid md:grid-cols-2 gap-3">
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It works</strong> ,  You've tested it in AI Dungeon</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's original</strong> ,  Or you have permission</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's described</strong> ,  A sentence explaining what it does</span>
        </div>
        <div class="flex items-center gap-3 p-3 rounded-lg bg-bd-success/5 border border-bd-success/20">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
          <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's appropriate</strong> ,  Follows AI Dungeon ToS</span>
        </div>
      </div>
      <p class="text-sm text-bd-text-muted mt-4 text-center">
        Don't worry about perfect formatting, I'll clean it up.
      </p>
    </section>

    <!-- Example Submission -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <FileText class="w-5 h-5 text-bd-text-primary" />
        Example Submission
      </h2>
      <p class="text-sm text-bd-text-secondary mb-4">
        Here's what a good submission looks like:
      </p>
      <pre class="code-block text-sm"><span class="text-bd-amber">**Name:**</span> Concise Writing Style

<span class="text-bd-amber">**Category:**</span> AI Instruction

<span class="text-bd-amber">**Description:**</span> Makes the AI write shorter, punchier sentences. Good for action scenes.

<span class="text-bd-amber">**Content:**</span>
Write in a concise, punchy style. Use short sentences. Avoid purple prose.
Favor active voice over passive. Every word should earn its place.</pre>
    </section>

    <!-- Alternative Methods -->
    <section class="card">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <GitMerge class="w-5 h-5 text-bd-text-primary" />
        Other Ways to Contribute
      </h2>
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
