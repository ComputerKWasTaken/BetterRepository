<template>
  <div class="space-y-8">
    <!-- Hero Section — community-driven messaging with three animated orbs -->
    <header class="contribute-hero relative overflow-hidden rounded-2xl text-center py-14 px-6">
      <!-- Animated background orbs (matches HomePage triple-orb style) -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none" aria-hidden="true">
        <div class="hero-orb hero-orb--orange" />
        <div class="hero-orb hero-orb--purple" />
        <div class="hero-orb hero-orb--cyan" />
      </div>

      <div class="relative z-10">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-bd-accent-primary/20 to-bd-purple/20 mb-4 animate-float">
          <GitPullRequest class="w-8 h-8 text-bd-accent-primary" />
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-bd-text-primary mb-3 tracking-tight">
          Help Build Something <span class="text-gradient">Better</span>
        </h1>
        <p class="text-bd-text-secondary max-w-lg mx-auto leading-relaxed mb-2">
          BetterRepository exists because people like you shared what they learned.
          Every guide, every template, every script started as someone's contribution.
        </p>
        <p class="text-sm text-bd-text-muted max-w-md mx-auto">
          No coding required — just paste and submit. It takes less than 2 minutes.
        </p>
      </div>
    </header>

    <!-- Community Impact Stats — social proof through numbers -->
    <section ref="statsRef" :class="['contribute-section', { 'is-visible': visibleSections.stats }]">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="(stat, idx) in impactStats" 
          :key="stat.label" 
          class="card text-center py-5 group hover:border-bd-accent-primary/20 hover:shadow-glow"
          :style="{ animationDelay: `${idx * 100}ms` }"
        >
          <div class="flex items-center justify-center mb-2">
            <component :is="stat.icon" class="w-5 h-5 opacity-60 group-hover:opacity-100 transition-opacity" :class="stat.iconClass" />
          </div>
          <div class="text-2xl font-bold text-gradient">{{ stat.value }}</div>
          <div class="text-xs text-bd-text-muted mt-1 font-medium uppercase tracking-wider">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Why Contribute? — motivation cards -->
    <section ref="whyRef" :class="['contribute-section', { 'is-visible': visibleSections.why }]">
      <div class="section-header mb-5">
        <Heart class="w-4 h-4" />
        <span>Why Contribute?</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Help Others -->
        <div class="card group relative overflow-hidden hover:border-bd-green/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-green/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-green/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-green/25 transition-colors">
                <Users class="w-5 h-5 text-bd-green" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">Help Others Succeed</h3>
            </div>
            <p class="text-sm text-bd-text-secondary leading-relaxed">
              New players discover AI Dungeon every day. Your contribution could be the thing that turns a confused
              newcomer into a confident storyteller.
            </p>
          </div>
        </div>

        <!-- Keep It Current -->
        <div class="card group relative overflow-hidden hover:border-bd-amber/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-amber/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-amber/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-amber/25 transition-colors">
                <RefreshCw class="w-5 h-5 text-bd-amber" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">Keep It Current</h3>
            </div>
            <p class="text-sm text-bd-text-secondary leading-relaxed">
              AI Dungeon evolves constantly — new models, new features, new possibilities. Community contributions
              keep the guides and resources accurate and relevant.
            </p>
          </div>
        </div>

        <!-- Get Recognized -->
        <div class="card group relative overflow-hidden hover:border-bd-purple/30">
          <div class="absolute top-0 right-0 w-24 h-24 bg-bd-purple/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-bd-purple/15 flex items-center justify-center flex-shrink-0 group-hover:bg-bd-purple/25 transition-colors">
                <Award class="w-5 h-5 text-bd-purple" />
              </div>
              <h3 class="font-semibold text-bd-text-primary">Get Recognized</h3>
            </div>
            <p class="text-sm text-bd-text-secondary leading-relaxed">
              Every contributor is credited by name. Your work becomes part of the definitive
              AI Dungeon resource hub, helping the community for years to come.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- The Easy Way — Primary CTA -->
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
              Just paste your content and tell me what it does. That's it. I'll handle the formatting, categorization, and everything else.
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

    <!-- What Can You Submit — content types + beyond content -->
    <section ref="submitRef" :class="['contribute-section', { 'is-visible': visibleSections.submit }]">
      <div class="card">
        <div class="section-header mb-4">
          <Layers class="w-4 h-4" />
          <span>What Can You Submit?</span>
        </div>

        <!-- Content types -->
        <div class="grid md:grid-cols-2 gap-3 mb-5">
          <div class="submit-tile group hover:border-bd-amber/40">
            <div class="w-9 h-9 rounded-lg bg-bd-amber/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <ScrollText class="w-4 h-4 text-bd-amber" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">AI Instructions</span>
              <p class="text-xs text-bd-text-muted">Style, pacing, tone rules, genre presets, model-specific instructions</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-blue/40">
            <div class="w-9 h-9 rounded-lg bg-bd-blue/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Bookmark class="w-4 h-4 text-bd-blue" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Plot Components</span>
              <p class="text-xs text-bd-text-muted">Plot Essentials, Story Summary, Author's Notes templates</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-purple/40">
            <div class="w-9 h-9 rounded-lg bg-bd-purple/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Drama class="w-4 h-4 text-bd-purple" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Story Cards</span>
              <p class="text-xs text-bd-text-muted">Templates for characters, locations, items, factions, abilities</p>
            </div>
          </div>
          <div class="submit-tile group hover:border-bd-cyan/40">
            <div class="w-9 h-9 rounded-lg bg-bd-cyan/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <Code class="w-4 h-4 text-bd-cyan" />
            </div>
            <div>
              <span class="font-medium text-bd-text-primary">Scripts</span>
              <p class="text-xs text-bd-text-muted">Game mechanics, utilities, automation, input modifiers</p>
            </div>
          </div>
        </div>

        <!-- Beyond content — other ways to help -->
        <div class="border-t border-bd-border-subtle pt-4">
          <p class="text-xs text-bd-text-muted font-medium uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Lightbulb class="w-3 h-3" />
            Not a creator? You can still help
          </p>
          <div class="grid md:grid-cols-3 gap-2">
            <div class="beyond-tile">
              <Bug class="w-3.5 h-3.5 text-bd-error flex-shrink-0" />
              <span class="text-xs text-bd-text-secondary"><strong class="text-bd-text-primary">Report errors</strong> in existing guides</span>
            </div>
            <div class="beyond-tile">
              <Pencil class="w-3.5 h-3.5 text-bd-amber flex-shrink-0" />
              <span class="text-xs text-bd-text-secondary"><strong class="text-bd-text-primary">Suggest improvements</strong> to content</span>
            </div>
            <div class="beyond-tile">
              <MessageCircle class="w-3.5 h-3.5 text-bd-blue flex-shrink-0" />
              <span class="text-xs text-bd-text-secondary"><strong class="text-bd-text-primary">Request topics</strong> you'd like covered</span>
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
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It works</strong> — you've tested it in AI Dungeon</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's original</strong> — or you have permission to share it</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's described</strong> — a sentence explaining what it does</span>
          </div>
          <div class="checklist-item">
            <Check class="w-4 h-4 text-bd-success flex-shrink-0" />
            <span class="text-sm text-bd-text-secondary"><strong class="text-bd-text-primary">It's appropriate</strong> — follows AI Dungeon ToS</span>
          </div>
        </div>
        <p class="text-sm text-bd-text-muted mt-4 text-center">
          Don't worry about perfect formatting — I'll clean everything up before it goes live.
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
          Here's what a good submission looks like — don't overthink it:
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

    <!-- Contributor Spotlight — social proof showing real names -->
    <section ref="spotlightRef" :class="['contribute-section', { 'is-visible': visibleSections.spotlight }]">
      <div class="card relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-accent-primary via-bd-purple to-bd-cyan" />

        <div class="flex items-center justify-between mb-4 pt-1">
          <div class="flex items-center gap-2.5">
            <Star class="w-5 h-5 text-bd-accent-primary" />
            <h2 class="text-lg font-semibold text-bd-text-primary">Contributors Who Made This Possible</h2>
          </div>
          <router-link to="/credits" class="text-sm text-bd-accent-primary hover:text-bd-accent-light flex items-center gap-1 transition-colors">
            View All
            <ChevronRight class="w-3.5 h-3.5" />
          </router-link>
        </div>

        <p class="text-sm text-bd-text-secondary mb-5 leading-relaxed">
          These community members contributed the guides, templates, scripts, and knowledge that BetterRepository is built on.
          <strong class="text-bd-text-primary">Your name could be here too.</strong>
        </p>

        <!-- Contributor chips -->
        <div class="flex flex-wrap gap-2 mb-4">
          <span 
            v-for="(name, idx) in allContributors" 
            :key="name" 
            class="contributor-chip"
            :style="{ animationDelay: `${idx * 40}ms` }"
          >
            {{ name }}
          </span>
        </div>

        <!-- Community note -->
        <div class="flex items-center justify-center gap-2 pt-4 border-t border-bd-border-subtle">
          <Users class="w-4 h-4 text-bd-text-muted" />
          <p class="text-xs text-bd-text-muted">
            And the entire AI Dungeon community. <strong class="text-bd-text-secondary">Thank you!</strong>
          </p>
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
                If you're comfortable with Git, fork the repo and submit a PR directly.
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

    <!-- FAQ — address common hesitations -->
    <section ref="faqRef" :class="['contribute-section', { 'is-visible': visibleSections.faq }]">
      <div class="card">
        <div class="section-header mb-4">
          <HelpCircle class="w-4 h-4" />
          <span>Common Questions</span>
        </div>
        <div class="space-y-3">
          <div v-for="(faq, idx) in faqs" :key="idx" class="faq-item">
            <button 
              @click="toggleFaq(idx)" 
              class="w-full flex items-center justify-between gap-3 text-left"
            >
              <span class="text-sm font-medium text-bd-text-primary">{{ faq.q }}</span>
              <ChevronRight 
                class="w-4 h-4 text-bd-text-muted flex-shrink-0 transition-transform duration-200" 
                :class="{ 'rotate-90': expandedFaq === idx }" 
              />
            </button>
            <Transition name="faq-expand">
              <p v-if="expandedFaq === idx" class="text-sm text-bd-text-secondary mt-2 leading-relaxed pl-0.5">
                {{ faq.a }}
              </p>
            </Transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA — strong closing push -->
    <section ref="ctaRef" :class="['contribute-section', { 'is-visible': visibleSections.cta }]">
      <div class="card-elevated text-center relative overflow-hidden border-2 border-bd-accent-primary/20">
        <div class="absolute inset-0 bg-gradient-to-t from-bd-accent-primary/5 via-transparent to-bd-purple/5 pointer-events-none" />
        <div class="relative">
          <Sparkles class="w-10 h-10 text-bd-accent-primary mx-auto mb-3" />
          <h2 class="text-xl font-bold text-bd-text-primary mb-2">Ready to Contribute?</h2>
          <p class="text-bd-text-secondary max-w-md mx-auto mb-6 leading-relaxed">
            It doesn't have to be perfect. It doesn't have to be long. If it helped you, it'll help someone else.
            That's what matters.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3">
            <a 
              href="https://github.com/ComputerKWasTaken/BetterRepository/issues/new" 
              target="_blank" 
              rel="noopener noreferrer"
              class="btn btn-primary"
            >
              <Github class="w-4 h-4" />
              Submit a Contribution
              <ExternalLink class="w-3 h-3" />
            </a>
            <router-link to="/credits" class="btn btn-secondary">
              <Award class="w-4 h-4" />
              See Who's Contributed
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { INSTRUCTIONS, CATEGORIES } from '@/data/aiInstructions'
import { TEMPLATES } from '@/data/plotComponents'
import { STORY_CARDS, STORY_CARD_TEMPLATES } from '@/data/storyCards'
import { SCRIPTS } from '@/data/scripts'
import { 
  GitPullRequest, Zap, CheckCircle, Check, Layers, ArrowRight,
  ScrollText, Bookmark, Drama, Code, GitMerge, MessageCircle,
  ExternalLink, Github, FileText, Award, Heart, Users, Star,
  ChevronRight, Lightbulb, Bug, Pencil, HelpCircle, RefreshCw,
  Sparkles, Package
} from 'lucide-vue-next'

// --- Community impact stats (pulled from actual data) ---
const totalResources = computed(() =>
  INSTRUCTIONS.length + TEMPLATES.length + STORY_CARDS.length + STORY_CARD_TEMPLATES.length + SCRIPTS.length
)

const impactStats = computed(() => [
  { value: totalResources.value, label: 'Resources', icon: Package, iconClass: 'text-bd-accent-primary' },
  { value: allContributors.length, label: 'Contributors', icon: Users, iconClass: 'text-bd-purple' },
  { value: CATEGORIES.length, label: 'Categories', icon: Layers, iconClass: 'text-bd-amber' },
  { value: '4', label: 'Sections', icon: Bookmark, iconClass: 'text-bd-cyan' },
])

// --- All unique contributors for the spotlight wall ---
const allContributors = [
  ...new Set([
    'OffMetaGamer', 'Wilmar', 'Le Onyx', 'LewdLeah', 'Dragranis', 'Monsieur Boo',
    'Hawk', 'Dirty Kurtis', 'Shiny', 'Leshok', 'BinKompliziert', 'Little Hat',
    'SeinSchetten', 'Zoocata', 'CamSift', 'Celyne', 'wanderingstar1',
    'GremmieGremlin', 'Lavere', 'Latitude', 'Oli', 'Magic', 'MrJack', 'Burnout'
  ])
]

// --- FAQ data ---
const faqs = [
  {
    q: 'Is my work good enough to submit?',
    a: "If it helped you, it's good enough. We're not looking for perfection — we're looking for things that work. Even small, focused contributions are incredibly valuable.",
  },
  {
    q: 'Do I need to know how to code?',
    a: "Not at all. Most contributions are just text — AI instructions, story cards, templates. Just paste your content into a GitHub issue and I'll take care of the rest.",
  },
  {
    q: 'How long does it take to get added?',
    a: "Usually within a few days. I review submissions regularly and will let you know if I have any questions. Straightforward submissions often go live the same day.",
  },
  {
    q: 'Can I update or improve something that already exists?',
    a: "Absolutely — in fact, that's one of the most helpful things you can do. If you notice something outdated, unclear, or incomplete, open an issue explaining what could be better.",
  },
  {
    q: "What if I'm not sure what category my submission fits?",
    a: "Don't worry about it. Just describe what it does and I'll figure out where it belongs. You can also ask in Discord if you want feedback first.",
  },
]

const expandedFaq = ref(null)
const toggleFaq = (idx) => {
  expandedFaq.value = expandedFaq.value === idx ? null : idx
}

// --- Section refs for IntersectionObserver staggered reveal ---
const statsRef = ref(null)
const whyRef = ref(null)
const easyRef = ref(null)
const submitRef = ref(null)
const checklistRef = ref(null)
const exampleRef = ref(null)
const spotlightRef = ref(null)
const altRef = ref(null)
const faqRef = ref(null)
const ctaRef = ref(null)

const visibleSections = reactive({
  stats: false,
  why: false,
  easy: false,
  submit: false,
  checklist: false,
  example: false,
  spotlight: false,
  alt: false,
  faq: false,
  cta: false,
})

let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target
          if (el === statsRef.value) visibleSections.stats = true
          else if (el === whyRef.value) visibleSections.why = true
          else if (el === easyRef.value) visibleSections.easy = true
          else if (el === submitRef.value) visibleSections.submit = true
          else if (el === checklistRef.value) visibleSections.checklist = true
          else if (el === exampleRef.value) visibleSections.example = true
          else if (el === spotlightRef.value) visibleSections.spotlight = true
          else if (el === altRef.value) visibleSections.alt = true
          else if (el === faqRef.value) visibleSections.faq = true
          else if (el === ctaRef.value) visibleSections.cta = true
          observer.unobserve(el)
        }
      })
    },
    { threshold: 0.15 }
  )

  const refs = [statsRef, whyRef, easyRef, submitRef, checklistRef, exampleRef, spotlightRef, altRef, faqRef, ctaRef]
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
  width: 260px;
  height: 260px;
  background: var(--bd-accent-primary);
  top: -50px;
  right: -30px;
  animation: float 8s ease-in-out infinite;
}

.hero-orb--purple {
  width: 200px;
  height: 200px;
  background: #a855f7;
  bottom: -40px;
  left: 5%;
  animation: float 10s ease-in-out infinite reverse;
}

.hero-orb--cyan {
  width: 140px;
  height: 140px;
  background: #06b6d4;
  top: 30%;
  left: -20px;
  animation: float 12s ease-in-out infinite 2s;
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

/* === Beyond-content tiles === */
.beyond-tile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  background: var(--bd-bg-tertiary);
  border: 1px solid var(--bd-border-subtle);
  transition: all 0.2s ease;
}

.beyond-tile:hover {
  border-color: var(--bd-border-default);
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

/* === Contributor chips === */
.contributor-chip {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: rgba(255, 149, 0, 0.1);
  color: var(--bd-accent-light);
  border: 1px solid rgba(255, 149, 0, 0.2);
  transition: all 0.2s ease;
}

.contributor-chip:hover {
  background: rgba(255, 149, 0, 0.2);
  border-color: rgba(255, 149, 0, 0.4);
  transform: translateY(-1px);
}

/* === FAQ items === */
.faq-item {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--bd-border-subtle);
  background: var(--bd-bg-tertiary);
  transition: all 0.2s ease;
}

.faq-item:hover {
  border-color: var(--bd-border-default);
}

/* FAQ expand transition */
.faq-expand-enter-active {
  transition: opacity 0.2s ease, max-height 0.3s ease;
  overflow: hidden;
}

.faq-expand-leave-active {
  transition: opacity 0.15s ease, max-height 0.2s ease;
  overflow: hidden;
}

.faq-expand-enter-from,
.faq-expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.faq-expand-enter-to,
.faq-expand-leave-from {
  max-height: 200px;
}
</style>
