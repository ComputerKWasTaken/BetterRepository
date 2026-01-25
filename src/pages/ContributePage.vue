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
        Help build the ultimate resource collection for AI Dungeon players.
      </p>
    </header>

    <!-- Why Contribute -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <Sparkles class="w-5 h-5 text-bd-accent-primary" />
        Why Contribute?
      </h2>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="text-center p-4">
          <div class="w-12 h-12 rounded-xl bg-bd-purple/20 flex items-center justify-center mx-auto mb-3">
            <Users class="w-6 h-6 text-bd-purple" />
          </div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Help Others</h3>
          <p class="text-sm text-bd-text-secondary">Your contributions help thousands of AI Dungeon players improve their experience.</p>
        </div>
        <div class="text-center p-4">
          <div class="w-12 h-12 rounded-xl bg-bd-green/20 flex items-center justify-center mx-auto mb-3">
            <Award class="w-6 h-6 text-bd-green" />
          </div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Get Credit</h3>
          <p class="text-sm text-bd-text-secondary">All contributions are credited to their authors in the repository.</p>
        </div>
        <div class="text-center p-4">
          <div class="w-12 h-12 rounded-xl bg-bd-blue/20 flex items-center justify-center mx-auto mb-3">
            <Rocket class="w-6 h-6 text-bd-blue" />
          </div>
          <h3 class="font-semibold text-bd-text-primary mb-1">Shape the Future</h3>
          <p class="text-sm text-bd-text-secondary">Help define best practices and standards for the community.</p>
        </div>
      </div>
    </section>

    <!-- What We Accept -->
    <section class="card">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-bd-success" />
        What We Accept
      </h2>
      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-center gap-2 mb-2">
            <ScrollText class="w-4 h-4 text-bd-amber" />
            <h3 class="font-medium text-bd-text-primary">AI Instructions</h3>
          </div>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>• Complete instruction sets for specific models</li>
            <li>• Individual instructions for specific behaviors</li>
            <li>• Anti-repetition and style rules</li>
            <li>• Character and NPC behavior guidelines</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-center gap-2 mb-2">
            <Bookmark class="w-4 h-4 text-bd-blue" />
            <h3 class="font-medium text-bd-text-primary">Plot Components</h3>
          </div>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>• Author's Note templates</li>
            <li>• Plot Essentials templates</li>
            <li>• Story Summary formats</li>
            <li>• Character sheet templates</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-center gap-2 mb-2">
            <Drama class="w-4 h-4 text-bd-purple" />
            <h3 class="font-medium text-bd-text-primary">Story Cards</h3>
          </div>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>• Character cards with full profiles</li>
            <li>• Location cards with descriptions</li>
            <li>• Faction and organization cards</li>
            <li>• Item and artifact cards</li>
          </ul>
        </div>
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-center gap-2 mb-2">
            <Settings class="w-4 h-4 text-bd-cyan" />
            <h3 class="font-medium text-bd-text-primary">Scripts</h3>
          </div>
          <ul class="text-sm text-bd-text-secondary space-y-1">
            <li>• Game system scripts (dice, combat, etc.)</li>
            <li>• Tracking systems (time, inventory, etc.)</li>
            <li>• Utility and helper scripts</li>
            <li>• Output formatting scripts</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- How to Contribute -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <GitMerge class="w-5 h-5 text-bd-accent-primary" />
        How to Contribute
      </h2>
      
      <div class="space-y-6">
        <!-- Method 1: Discord -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle class="w-5 h-5 text-[#5865F2]" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-bd-text-primary mb-1">Option 1: Discord (Easiest)</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Join the AI Dungeon Discord and share your contributions in the appropriate channels. 
                Community moderators will review and add quality submissions.
              </p>
              <a 
                href="https://discord.gg/aidungeon" 
                target="_blank" 
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                <MessageCircle class="w-4 h-4" />
                Join Discord
                <ExternalLink class="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <!-- Method 2: GitHub -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
              <Github class="w-5 h-5 text-bd-text-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-bd-text-primary mb-1">Option 2: GitHub Pull Request</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                For those familiar with Git, submit a pull request to our repository. 
                This is the preferred method for larger contributions.
              </p>
              <div class="space-y-3">
                <div class="flex items-start gap-2">
                  <span class="w-6 h-6 rounded-full bg-bd-accent-primary/20 text-bd-accent-primary text-sm font-medium flex items-center justify-center flex-shrink-0">1</span>
                  <span class="text-sm text-bd-text-secondary">Fork the BetterRepository repository on GitHub</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="w-6 h-6 rounded-full bg-bd-accent-primary/20 text-bd-accent-primary text-sm font-medium flex items-center justify-center flex-shrink-0">2</span>
                  <span class="text-sm text-bd-text-secondary">Add your contribution following the format guidelines</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="w-6 h-6 rounded-full bg-bd-accent-primary/20 text-bd-accent-primary text-sm font-medium flex items-center justify-center flex-shrink-0">3</span>
                  <span class="text-sm text-bd-text-secondary">Submit a pull request with a clear description</span>
                </div>
                <div class="flex items-start gap-2">
                  <span class="w-6 h-6 rounded-full bg-bd-accent-primary/20 text-bd-accent-primary text-sm font-medium flex items-center justify-center flex-shrink-0">4</span>
                  <span class="text-sm text-bd-text-secondary">Wait for review and feedback</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Method 3: Direct Submission -->
        <div class="p-4 rounded-lg bg-bd-bg-primary border border-white/[0.06]">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-lg bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
              <Mail class="w-5 h-5 text-bd-accent-primary" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-bd-text-primary mb-1">Option 3: Direct Submission</h3>
              <p class="text-sm text-bd-text-secondary mb-3">
                Fill out our submission form with your contribution details. 
                We'll review and add it to the repository if it meets our guidelines.
              </p>
              <span class="badge badge-new">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contribution Guidelines -->
    <section class="card">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <ClipboardList class="w-5 h-5 text-bd-text-primary" />
        Contribution Guidelines
      </h2>
      
      <div class="space-y-4">
        <div class="flex items-start gap-3">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-medium text-bd-text-primary">Test Your Contributions</h4>
            <p class="text-sm text-bd-text-secondary">Make sure your instructions, templates, or scripts work as intended before submitting.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-medium text-bd-text-primary">Include Clear Descriptions</h4>
            <p class="text-sm text-bd-text-secondary">Explain what your contribution does, when to use it, and any requirements.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-medium text-bd-text-primary">Specify Compatible Models</h4>
            <p class="text-sm text-bd-text-secondary">If your contribution works better with specific AI models, let us know.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <Check class="w-4 h-4 text-bd-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-medium text-bd-text-primary">Original or Credited Work</h4>
            <p class="text-sm text-bd-text-secondary">Only submit original work or properly credit the original author if adapting existing content.</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <X class="w-4 h-4 text-bd-error flex-shrink-0 mt-0.5" />
          <div>
            <h4 class="font-medium text-bd-text-primary">No Harmful Content</h4>
            <p class="text-sm text-bd-text-secondary">We do not accept content that promotes harm, violates AI Dungeon's ToS, or is otherwise inappropriate.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Format Template -->
    <section class="card-elevated">
      <h2 class="text-lg font-semibold text-bd-text-primary mb-4 flex items-center gap-2">
        <FileText class="w-5 h-5 text-bd-text-primary" />
        Submission Format
      </h2>
      <p class="text-sm text-bd-text-secondary mb-4">
        When submitting, please include the following information:
      </p>
      <pre class="code-block text-sm">Name: [Name of your contribution]
Category: [AI Instructions / Plot Components / Story Cards / Scripts]
Tags: [Comma-separated relevant tags]
Models: [Compatible AI models, or "All" if universal]
Description: [Brief description of what it does]
Purpose: [When and why to use this]

Content:
[Your actual content here]

---
Author: [Your name/username]
Notes: [Any additional notes or tips]</pre>
    </section>
  </div>
</template>

<script setup>
import { 
  GitPullRequest, Sparkles, Users, Award, Rocket, CheckCircle,
  ScrollText, Bookmark, Drama, Settings, GitMerge, MessageCircle,
  ExternalLink, Github, Mail, ClipboardList, Check, X, FileText
} from 'lucide-vue-next'
</script>
