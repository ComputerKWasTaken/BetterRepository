<template>
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

  <!-- ===================== FIXING REPETITION ===================== -->
  <section id="guide-fixing-repetition" class="card">
    <button 
      @click="toggleGuideSection('fixing-repetition')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <RefreshCw class="w-5 h-5 text-bd-amber" />
        Fixing Repetition
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('fixing-repetition') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('fixing-repetition')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          A common issue with AI is <strong>repetition</strong> &mdash; the AI starts repeating itself in various ways. Understanding the types of repetition and how to fix them is essential.
        </p>

        <div class="space-y-3">
          <h3 class="font-semibold text-bd-text-primary text-sm">Types of Repetition</h3>
          
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-medium text-bd-text-primary text-xs mb-2">Exact Repetition</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-muted">
              "The land is empty. The land is empty. The land is empty..."
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-medium text-bd-text-primary text-xs mb-2">Minor Variation Repetition</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-muted">
              "You can't eat. You can't sleep. You can't move..."
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-medium text-bd-text-primary text-xs mb-2">Echo Repetition</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-muted space-y-1">
              <div><span class="text-bd-blue">You:</span> Go in the house.</div>
              <div><span class="text-bd-green">AI:</span> You go in the house.</div>
              <div><span class="text-bd-blue">You:</span> Look around.</div>
              <div><span class="text-bd-green">AI:</span> You look around.</div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h4 class="font-medium text-bd-text-primary text-xs mb-2">Structural Repetition</h4>
            <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-text-muted space-y-1">
              <div>Output 1: She sighs, <span class="text-bd-amber">a mixture of relief and anticipation</span> in her voice.</div>
              <div>Output 2: She murmurs, <span class="text-bd-amber">a mixture of joy and love</span> in her voice.</div>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="font-semibold text-bd-text-primary text-sm">How to Fix It</h3>

          <div class="space-y-2">
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber font-bold text-xs flex items-center justify-center">1</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Undo to Before the Repetition</p>
                <p class="text-xs text-bd-text-secondary">Click <strong>Undo</strong> repeatedly until you are BEFORE the very first instance of repetition. Alternatively, manually edit out every instance you see.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber font-bold text-xs flex items-center justify-center">2</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Type Something Different</p>
                <p class="text-xs text-bd-text-secondary">Be expansive &mdash; describe what you do in more detail and with more complex language than usual. This causes the AI to also break out of its rut.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber font-bold text-xs flex items-center justify-center">3</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Vary Your Writing</p>
                <p class="text-xs text-bd-text-secondary">Vary your sentence structure, length, and word usage. This encourages the AI to do the same and avoid falling into patterns.</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-bd-amber/20 text-bd-amber font-bold text-xs flex items-center justify-center">4</span>
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Catch It Early</p>
                <p class="text-xs text-bd-text-secondary">Make sure you're catching and deleting repetition before it can poison the rest of your story. The longer it stays, the harder it is to break out of.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <div class="text-xs text-bd-text-secondary">
              <strong>Advanced fix:</strong> Check your Memory Bank and Author's Note for repetitive phrases. Also consider adjusting <strong>Temperature</strong> and <strong>Top-P</strong> (higher = more variety) or <strong>Frequency/Presence Penalty</strong> settings. See the 
              <router-link to="/guides?tab=ai-models" class="text-bd-accent-primary hover:underline">AI Models Guide</router-link> for details on these settings.
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== GENERATING IMAGES ===================== -->
  <section id="guide-generating-images" class="card">
    <button 
      @click="toggleGuideSection('generating-images')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <ImageIcon class="w-5 h-5 text-bd-green" />
        Generating Images
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('generating-images') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('generating-images')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon lets you generate images during gameplay using the <strong>See</strong> action mode. Images are created using AI image generation models and don't impact the narrative.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Pencil class="w-4 h-4 text-bd-green" />
              Describe What You Want
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Type a description in the See mode to generate a specific image. Be descriptive for better results &mdash; include details about the scene, lighting, mood, and style.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-bd-blue" />
              Leave It Blank
            </h3>
            <p class="text-xs text-bd-text-secondary">
              If left empty, the AI will automatically generate an image based on your recent story context, Story Cards, and Plot Essentials.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>You own all images you generate</strong> &mdash; download and use them however you want! Image generation uses Credits.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">Custom Images</h3>
          <p class="text-xs text-bd-text-secondary mb-2">
            You can also upload custom images to your adventures and scenarios. Custom images can be used as cover art for scenarios or inserted into the story at specific points.
          </p>
          <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
            <li>Upload through the adventure or scenario editor</li>
            <li>Use for scenario cover art to make your content stand out</li>
            <li>Add visual storytelling elements to published scenarios</li>
          </ul>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== EDITING YOUR STORY ===================== -->
  <section id="guide-editing-story" class="card">
    <button 
      @click="toggleGuideSection('editing-story')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Edit3 class="w-5 h-5 text-bd-blue" />
        Editing Your Story
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('editing-story') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('editing-story')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Editing is a powerful part of AI Dungeon. You are both the player and the director &mdash; shaping the story to your liking is <strong>encouraged and expected</strong>.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <RotateCcw class="w-5 h-5 text-bd-amber flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Undo / Redo</h3>
                <p class="text-xs text-bd-text-secondary">Remove the last action and AI response, or bring back an undone action. Use Undo to remove bad outputs and try again.</p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <RefreshCw class="w-5 h-5 text-bd-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Retry</h3>
                <p class="text-xs text-bd-text-secondary">Ask the AI to regenerate its last response. Great when the output is okay but not quite what you wanted.</p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Edit3 class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Edit Actions</h3>
                <p class="text-xs text-bd-text-secondary">Click on any action in the story to edit its text directly. Fix typos, adjust dialogue, or rewrite entire sections. The AI will use your edits as context for future responses.</p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Eraser class="w-5 h-5 text-bd-red flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Erase to Here</h3>
                <p class="text-xs text-bd-text-secondary">Removes all actions after a specific point in your story. Useful when a story goes off the rails and you want to return to an earlier point. Be careful &mdash; this cannot be undone!</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Pro tip:</strong> Editing AI outputs teaches the AI good patterns. If the AI writes something almost right, edit it to be perfect rather than retrying. The edited version becomes part of the context and guides future outputs.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== WHY THE AI FORGETS ===================== -->
  <section id="guide-ai-forgets" class="card">
    <button 
      @click="toggleGuideSection('ai-forgets')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <HelpCircle class="w-5 h-5 text-bd-purple" />
        Why the AI Forgets Things
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ai-forgets') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('ai-forgets')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          The AI can only "see" a limited window of text called the <strong>context</strong>. As your story grows longer, older actions fall out of context and the AI effectively "forgets" them.
        </p>

        <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
          <h3 class="font-semibold text-bd-text-primary mb-3 text-sm">Common Reasons the AI Loses Track</h3>
          <div class="space-y-2">
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-amber mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Context overflow</strong> &mdash; Your story has grown longer than the context window, pushing important details out</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-amber mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>No Story Card</strong> &mdash; Important characters or locations aren't saved in a Story Card with proper triggers</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-amber mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Vague references</strong> &mdash; Using pronouns or ambiguous names confuses the AI about who/what is being referenced</p>
            </div>
            <div class="flex items-start gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-bd-amber mt-1.5 flex-shrink-0"></span>
              <p class="text-xs text-bd-text-secondary"><strong>Too many details</strong> &mdash; Overloading context with information makes it harder for the AI to identify what's important</p>
            </div>
          </div>
        </div>

        <div class="space-y-3">
          <h3 class="font-semibold text-bd-text-primary text-sm">Solutions</h3>
          <div class="grid md:grid-cols-2 gap-3">
            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <h4 class="font-medium text-bd-text-primary text-xs mb-1 flex items-center gap-1">
                <Layers class="w-3 h-3 text-bd-green" />
                Use Story Cards
              </h4>
              <p class="text-xs text-bd-text-secondary">Create cards for important characters, locations, and items with descriptive triggers</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h4 class="font-medium text-bd-text-primary text-xs mb-1 flex items-center gap-1">
                <ClipboardList class="w-3 h-3 text-bd-blue" />
                Use Plot Essentials
              </h4>
              <p class="text-xs text-bd-text-secondary">Keep critical ongoing details in Plot Essentials so they're always in context</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <h4 class="font-medium text-bd-text-primary text-xs mb-1 flex items-center gap-1">
                <Brain class="w-3 h-3 text-bd-purple" />
                Trust Memory Bank
              </h4>
              <p class="text-xs text-bd-text-secondary">The Memory Bank automatically creates summaries of past events and recalls them when relevant</p>
            </div>
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-medium text-bd-text-primary text-xs mb-1 flex items-center gap-1">
                <Cpu class="w-3 h-3 text-bd-amber" />
                Upgrade Context
              </h4>
              <p class="text-xs text-bd-text-secondary">Higher membership tiers offer more context tokens, letting the AI remember more at once</p>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For a deep dive into how context works, see the 
              <router-link to="/guides?tab=context-memory" class="text-bd-accent-primary hover:underline">Context &amp; Memory Guide</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== TROUBLESHOOTING ===================== -->
  <section id="guide-troubleshooting" class="card">
    <button 
      @click="toggleGuideSection('troubleshooting')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Wrench class="w-5 h-5 text-bd-cyan" />
        Common Troubleshooting
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('troubleshooting') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('troubleshooting')" class="mt-4 space-y-4">
        
        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">AI isn't generating anything</h3>
            <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
              <li>Check your internet connection</li>
              <li>Check the <a href="https://help.aidungeon.com/status" class="text-bd-accent-primary hover:underline" target="_blank" rel="noopener">AI Dungeon Status page</a> for service outages</li>
              <li>Try refreshing the page or restarting the app</li>
              <li>If on mobile, check if the app needs an update</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">AI writing quality is poor</h3>
            <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
              <li>Try a different AI model &mdash; larger models generally produce better output</li>
              <li>Add or refine your AI Instructions to guide the AI's writing style</li>
              <li>Edit bad outputs rather than just retrying &mdash; this shapes the context</li>
              <li>Ensure your Plot Essentials and Story Cards are well-organized</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">Story going in the wrong direction</h3>
            <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
              <li>Use <strong>Undo</strong> to go back to before things went wrong</li>
              <li>Use <strong>Story</strong> mode to directly write what happens next</li>
              <li>Update your AI Instructions to steer the AI's behavior</li>
              <li>Update Author's Note to emphasize the tone/direction you want</li>
              <li>Use <strong>Erase to Here</strong> as a last resort to return to an earlier point</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">Finding old adventures or scenarios</h3>
            <p class="text-xs text-bd-text-secondary">
              All your content is saved in <strong>My Stuff</strong>, accessible from the main navigation. You can find your Adventures, Scenarios, and Worlds there. Use the search feature to find specific content.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== BEST PRACTICES ===================== -->
  <section id="guide-best-practices" class="card">
    <button 
      @click="toggleGuideSection('best-practices')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Star class="w-5 h-5 text-bd-amber" />
        Best Practices
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-4">
        
        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <BookOpen class="w-4 h-4 text-bd-amber" />
              Write Like a Story
            </h3>
            <p class="text-xs text-bd-text-secondary">
              The AI responds better to descriptive, narrative writing. Instead of "go north", try "You head north along the winding forest path, keeping an eye out for danger."
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Shuffle class="w-4 h-4 text-bd-blue" />
              Mix Action Modes
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Don't just use Do mode. Mix in Say and Story modes for more natural, varied storytelling. Story mode is especially good for setting scenes.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Edit3 class="w-4 h-4 text-bd-green" />
              Edit Aggressively
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Don't settle for "good enough". Edit outputs to be exactly what you want. Your edits become part of the context and teach the AI your preferences.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Layers class="w-4 h-4 text-bd-purple" />
              Use All the Tools
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Don't ignore AI Instructions, Story Cards, and Plot Essentials. These tools dramatically improve story consistency and quality, especially in longer adventures.
            </p>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For detailed guides on each tool, explore: 
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline">AI Instructions</router-link>,
              <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline">Plot Components</router-link>,
              <router-link to="/guides?tab=story-cards" class="text-bd-accent-primary hover:underline">Story Cards</router-link>, and
              <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline">Scripts</router-link>.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronDown, ChevronUp, RefreshCw, Lightbulb, Info, ImageIcon,
  Pencil, Sparkles, Edit3, RotateCcw, Eraser, HelpCircle, Layers,
  ClipboardList, Brain, Cpu, Wrench, Star, BookOpen, Shuffle
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-common-issues', label: 'Common Issues', isHeader: true },
  { id: 'fixing-repetition', label: 'Fixing Repetition' },
  { id: 'ai-forgets', label: 'Why the AI Forgets' },
  { id: 'header-features', label: 'Features', isHeader: true },
  { id: 'generating-images', label: 'Generating Images' },
  { id: 'editing-story', label: 'Editing Your Story' },
  { id: 'header-help', label: 'Help', isHeader: true },
  { id: 'troubleshooting', label: 'Common Troubleshooting' },
  { id: 'best-practices', label: 'Best Practices' },
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const toggleGuideSection = (id) => {
  if (expandedGuideSections.value.has(id)) {
    expandedGuideSections.value.delete(id)
  } else {
    expandedGuideSections.value.add(id)
  }
}
const expandAllGuideSections = () => {
  guideSections.filter(s => !s.isHeader).forEach(s => expandedGuideSections.value.add(s.id))
}
const collapseAllGuideSections = () => {
  expandedGuideSections.value.clear()
}
const scrollToGuideSection = (id) => {
  if (!isGuideSectionExpanded(id)) toggleGuideSection(id)
  setTimeout(() => {
    document.getElementById(`guide-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 100)
}
</script>
