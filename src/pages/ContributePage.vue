<template>
  <div class="space-y-8">
    <!-- Page Header — animated hero -->
    <header class="contribute-hero relative overflow-hidden rounded-2xl text-center py-12 px-6">
      <!-- Animated background orbs -->
      <div class="hero-orb hero-orb--orange" aria-hidden="true" />
      <div class="hero-orb hero-orb--purple" aria-hidden="true" />

      <div class="relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 mb-4 animate-float">
          <GitPullRequest class="w-8 h-8 text-bd-accent-primary" />
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-2 tracking-tight">
          Share Your <span class="text-gradient">Creations</span>
        </h1>
        <p class="text-bd-text-secondary max-w-md mx-auto leading-relaxed">
          Contribute to the community. No coding required — just paste and submit.
        </p>
      </div>
    </header>

    <!-- The Easy Way - Primary CTA -->
    <section ref="easyRef" :class="['contribute-section', { 'is-visible': visibleSections.easy }]">
      <div class="card-elevated border-2 border-bd-accent-primary/30 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan" />
        <div class="flex items-start gap-4 pt-1">
          <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
            <Zap class="w-6 h-6 text-bd-accent-primary" />
          </div>
          <div class="flex-1">
            <h2 class="text-lg font-semibold text-bd-text-primary mb-2">The Easy Way</h2>
            <p class="text-bd-text-secondary mb-4 leading-relaxed">
              Just paste your content and tell me what it does. That's it. I'll handle the formatting.
            </p>
            <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
              <div class="step-pill">
                <span class="w-7 h-7 rounded-full bg-bd-accent-primary text-bd-bg-primary font-bold text-sm flex items-center justify-center">1</span>
                <span class="text-sm text-bd-text-primary font-medium">Open an issue</span>
              </div>
              <ArrowRight class="w-4 h-4 text-bd-accent-primary hidden md:block" />
              <div class="step-pill">
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
      </div>
    </section>

    <!-- What Can You Submit -->
    <section ref="submitRef" :class="['contribute-section', { 'is-visible': visibleSections.submit }]">
      <div class="card">
        <div class="section-header mb-4">
          <Layers class="w-4 h-4" />
          <span>What Can You Submit?</span>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div class="submit-tile group hover:border-bd-amber/40">
            <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <ScrollText class="w-4 h-4 text-bd-amber" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">AI Instructions</span>
              <p class="text-xs text-bd-text-muted">Style, pacing, tone rules, etc.</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-blue/40">
            <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Bookmark class="w-4 h-4 text-bd-blue" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Plot Components</span>
              <p class="text-xs text-bd-text-muted">Plot Essentials, Story Summary, Author's Notes</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-purple/40">
            <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Drama class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Story Cards</span>
              <p class="text-xs text-bd-text-muted">Templates for characters, locations, items</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-cyan/40">
            <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Code class="w-4 h-4 text-bd-cyan" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Scripts</span>
              <p class="text-xs text-bd-text-muted">Game mechanics, utilities, automation</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Checklist -->
    <section ref="checklistRef" :class="['contribute-section', { 'is-visible': visibleSections.checklist }]">
      <div class="card">
        <div class="flex items-center gap-2 mb-4">
          <CheckCircle class="w-5 h-5 text-bd-success" />
          <h2 class="text-lg font-semibold text-bd-text-primary">Before You Submit</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It works</strong>, You've tested it in AI Dungeon</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's original</strong>, Or you have permission</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's described</strong>, A sentence explaining what it does</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's appropriate</strong>, Follows AI Dungeon ToS</span>
          </div>
        </div>
        <p class="text-sm text-bd-text-muted mt-4 text-center">
          Don't worry about perfect formatting, I'll clean it up.
        </p>
      </div>
    </section>

    <!-- Example Submission -->
    <section ref="exampleRef" :class="['contribute-section', { 'is-visible': visibleSections.example }]">
      <div class="card-elevated border border-bd-border">
        <div class="flex items-center gap-2 mb-4">
          <FileText class="w-5 h-5 text-bd-accent-primary" />
          <h2 class="text-lg font-semibold text-bd-text-primary">Example Submission</h2>
        </div>
        <p class="text-sm text-bd-text-secondary mb-4">
          Here's what a good submission looks like:
        </p>
        <div class="rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle overflow-hidden code-window">
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
      </div>
    </section>

    <!-- Alternative Methods -->
    <section ref="altRef" :class="['contribute-section', { 'is-visible': visibleSections.alt }]">
      <div class="card">
        <div class="flex items-center gap-2 mb-4">
          <GitMerge class="w-5 h-5 text-bd-text-muted" />
          <h2 class="text-lg font-semibold text-bd-text-primary">Other Ways to Contribute</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <!-- Pull Request -->
          <div class="alt-card group">
            <div class="absolute top-0 right-0 w-20 h-20 bg-bd-text-primary/3 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div class="relative">
              <div class="flex items-center gap-3 mb-2">
                <Github class="w-5 h-5 text-bd-text-primary" />
                <h3 class="font-medium text-bd-text-primary">Pull Request</h3>
              </div>
              <p class="text-sm text-bd-text-secondary mb-3 leading-relaxed">
                If you're comfortable with Git, fork the repo and submit a PR.
              </p>
              <a 
                href="https://github.com/ComputerKWasTaken/BetterRepository" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-bd-accent-primary hover:text-bd-accent-light transition-colors"
              >
                View Repository <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>

          <!-- Discord -->
          <div class="alt-card group">
            <div class="absolute top-0 right-0 w-20 h-20 bg-[#5865F2]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
            <div class="relative">
              <div class="flex items-center gap-3 mb-2">
                <MessageCircle class="w-5 h-5 text-[#5865F2]" />
                <h3 class="font-medium text-bd-text-primary">Discord</h3>
              </div>
              <p class="text-sm text-bd-text-secondary mb-3 leading-relaxed">
                Share in the AI Dungeon Discord and ping me to add it.
              </p>
              <a 
                href="https://discord.gg/aidungeon" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 text-sm font-medium text-[#5865F2] hover:text-[#5865F2]/80 transition-colors"
              >
                Join Discord <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Recognition -->
    <section ref="recognitionRef" :class="['contribute-section', { 'is-visible': visibleSections.recognition }]">
      <div class="card text-center relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-t from-bd-accent-primary/5 to-transparent pointer-events-none" />
        <div class="relative">
          <Award class="w-10 h-10 text-bd-accent-primary mx-auto mb-3 animate-pulse" />
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">You'll Be Credited</h2>
          <p class="text-bd-text-secondary max-w-md mx-auto leading-relaxed">
            All contributors are recognized in the repository. Your name will appear alongside your contributions.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { 
  GitPullRequest, Zap, CheckCircle, Check, Layers, ArrowRight,
  ScrollText, Bookmark, Drama, Code, GitMerge, MessageCircle,
  ExternalLink, Github, FileText, Award
} from 'lucide-vue-next'

// --- Section refs for IntersectionObserver staggered reveal ---
const easyRef = ref(null)
const submitRef = ref(null)
const checklistRef = ref(null)
const exampleRef = ref(null)
const altRef = ref(null)
const recognitionRef = ref(null)

const visibleSections = reactive({
  easy: false,
  submit: false,
  checklist: false,
  example: false,
  alt: false,
  recognition: false,
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (el === easyRef.value) visibleSections.easy = true
          else if (el === submitRef.value) visibleSections.submit = true
          else if (el === checklistRef.value) visibleSections.checklist = true
          else if (el === exampleRef.value) visibleSections.example = true
          else if (el === altRef.value) visibleSections.alt = true
          else if (el === recognitionRef.value) visibleSections.recognition = true
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15 }
  )

  const refs = [easyRef, submitRef, checklistRef, exampleRef, altRef, recognitionRef]
  refs.forEach((r) => { if (r.value) observer.observe(r.value) })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* === Hero background === */
.contribute-hero {
  background: var(--bd-bg-secondary);
  border: 1px solid var(--bd-border-subtle);
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  pointer-events: none;
}

.hero-orb--orange {
  width: 240px;
  height: 240px;
  background: var(--bd-accent-primary);
  top: -50px;
  right: -30px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 180px;
  height: 180px;
  background: #a855f7;
  bottom: -40px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

/* === Section reveal animation === */
.contribute-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.contribute-section.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* === Step pills === */
.step-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: var(--bd-bg-tertiary);
  border: 1px solid var(--bd-border-subtle);
  transition: all 0.2s ease;
}

.step-pill:hover {
  border-color: var(--bd-border-default);
  transform: translateY(-1px);
}

/* === Submit tiles === */
.submit-tile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--bd-border-subtle);
  background: transparent;
  transition: all 0.2s ease;
}

.submit-tile:hover {
  transform: translateY(-1px);
}

/* === Checklist items === */
.checklist-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(34, 197, 94, 0.05);
  border: 1px solid rgba(34, 197, 94, 0.2);
  transition: all 0.2s ease;
}

.checklist-item:hover {
  border-color: rgba(34, 197, 94, 0.4);
  transform: translateY(-1px);
}

/* === Code window === */
.code-window {
  transition: all 0.3s ease;
}

.code-window:hover {
  border-color: var(--bd-border-default);
  box-shadow: 0 0 20px rgba(255, 149, 0, 0.06);
}

/* === Alt method cards === */
.alt-card {
  position: relative;
  overflow: hidden;
  padding: 1rem;
  border-radius: 0.5rem;
  background: var(--bd-bg-tertiary);
  border: 1px solid var(--bd-border-subtle);
  transition: all 0.25s ease;
}

.alt-card:hover {
  border-color: var(--bd-border-default);
  transform: translateY(-1px);
}
</style>
