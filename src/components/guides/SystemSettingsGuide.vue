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

  <!-- ===================== SETTINGS OVERVIEW ===================== -->
  <section id="guide-settings-overview" class="card">
    <button 
      @click="toggleGuideSection('settings-overview')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Settings class="w-5 h-5 text-bd-amber" />
        Settings Overview
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('settings-overview') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('settings-overview')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          There are two groups of system settings in AI Dungeon: your <strong>Account Settings</strong> (global, site-wide) and <strong>In-Game Settings</strong> (per-adventure). Understanding both will help you get the most out of your experience.
        </p>

        <div class="grid md:grid-cols-2 gap-3">
          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <User class="w-4 h-4 text-bd-amber" />
              Account Settings
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Global settings that apply across all your adventures. Includes profile, membership, AI safety, and linked accounts.
            </p>
          </div>
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
              <Sliders class="w-4 h-4 text-bd-blue" />
              In-Game Settings
            </h3>
            <p class="text-xs text-bd-text-secondary">
              Per-adventure settings accessible from the gear icon during gameplay. Split into Adventure and Gameplay sections.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== ACCOUNT SETTINGS ===================== -->
  <section id="guide-account-settings" class="card">
    <button 
      @click="toggleGuideSection('account-settings')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <User class="w-5 h-5 text-bd-green" />
        Account Settings
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('account-settings') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('account-settings')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          Access Account Settings by clicking your <strong>profile picture</strong> at the top of any page and selecting <code class="px-1.5 py-0.5 rounded bg-bd-bg-tertiary text-bd-text-primary text-xs">Settings</code> from the popup menu.
        </p>

        <div class="space-y-2">
          <h3 class="font-semibold text-bd-text-primary text-sm">What You Can Manage:</h3>
          <div class="grid md:grid-cols-2 gap-2">
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <UserCog class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Profile</p>
                <p class="text-xs text-bd-text-muted">Change username, email, and password</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <Link class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Linked Accounts</p>
                <p class="text-xs text-bd-text-muted">Manage accounts associated with your AI Dungeon account</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <CreditCard class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Membership</p>
                <p class="text-xs text-bd-text-muted">Change or manage your AI Dungeon membership tier</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <Shield class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">AI Safety</p>
                <p class="text-xs text-bd-text-muted">Control site-wide AI Safety Settings</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <Smartphone class="w-4 h-4 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Release Channel</p>
                <p class="text-xs text-bd-text-muted">Change mobile app's release channel</p>
              </div>
            </div>
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle flex items-start gap-2">
              <Trash2 class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
              <div>
                <p class="text-xs text-bd-text-primary font-medium">Delete Account</p>
                <p class="text-xs text-bd-text-muted">Permanently delete your account and all data</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-red/10 border border-bd-red/30">
          <div class="flex items-start gap-2">
            <AlertTriangle class="w-4 h-4 text-bd-red flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Warning:</strong> Once you delete your account, any content associated with the account will be <strong>unrecoverable</strong>. AI Dungeon is not able to recover deleted accounts.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== AI SAFETY SETTINGS ===================== -->
  <section id="guide-ai-safety" class="card">
    <button 
      @click="toggleGuideSection('ai-safety')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Shield class="w-5 h-5 text-bd-blue" />
        AI Safety Settings
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ai-safety') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('ai-safety')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Safety Settings control how the AI generates responses during your games. These settings are <strong>universal for your account</strong> &mdash; changing them under Account Settings also updates them in-game.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-green/20 text-bd-green uppercase tracking-wider">Safe</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Safe Mode</h3>
                <p class="text-xs text-bd-text-secondary">
                  Prevents the AI from generating sexual, hateful, violent, or triggering content. This is the <strong>default setting</strong> for all accounts.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-amber/20 text-bd-amber uppercase tracking-wider">Moderate</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Moderate Mode</h3>
                <p class="text-xs text-bd-text-secondary">
                  Reduces and limits some sexual, hateful, violent, or triggering content from being generated by the AI, but doesn't fully prevent it.
                </p>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-bd-red/10 border border-bd-red/30">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-red/20 text-bd-red uppercase tracking-wider">Mature</span>
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Mature Mode</h3>
                <p class="text-xs text-bd-text-secondary">
                  Will <strong>not</strong> limit the AI from generating mature, violent, or triggering content. You must confirm that you are 18+ when enabling this level.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              The content rating on a Scenario you play does <strong>not</strong> affect your safety setting. For instance, you can play a Mature-rated scenario on Safe settings &mdash; it just won't generate the mature content that scenario may be optimized for.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== CONTENT FILTER ===================== -->
  <section id="guide-content-filter" class="card">
    <button 
      @click="toggleGuideSection('content-filter')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Filter class="w-5 h-5 text-bd-purple" />
        Content Filter &amp; Troubleshooting
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('content-filter') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('content-filter')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          AI Dungeon uses content filters to enforce safety policies. Understanding how they work helps you troubleshoot unexpected behavior.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">"Content not supported" popup</h3>
            <p class="text-xs text-bd-text-secondary mb-2">
              If you see a popup saying your story content is not supported, it means you've triggered the <strong>SCIM filter</strong> (Sexual Content Involving Minors). This filter is not always 100% accurate.
            </p>
            <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
              <li>If it was a mistake, press the button to continue your story</li>
              <li>When you press continue, your story is anonymously sent for review to improve the filter</li>
              <li>You can continue playing normally after pressing the button</li>
            </ul>
          </div>

          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <h3 class="font-semibold text-bd-text-primary mb-2 text-sm">"I can't continue this story" message</h3>
            <p class="text-xs text-bd-text-secondary mb-2">
              If you get a response <em>in the story</em> saying something like "I'm sorry, but I can't continue..." this is <strong>not</strong> AI Dungeon's filter. This is a <strong>model hallucination</strong> caused by censored training data.
            </p>
            <ul class="text-xs text-bd-text-secondary space-y-1 ml-4 list-disc">
              <li>A <strong>Retry</strong> will usually fix it</li>
              <li>If retrying doesn't help, add lines like "You are a writing assistant" to your AI Instructions</li>
              <li>Alternatively, try changing to a different AI model</li>
            </ul>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
          <div class="flex items-start gap-2">
            <Lightbulb class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              <strong>Note on Banned Words:</strong> The Banned Words feature has been deprecated. AI Dungeon recommends using 
              <router-link to="/guides?tab=ai-instructions" class="text-bd-accent-primary hover:underline">AI Instructions</router-link> 
              instead to guide the AI away from words and topics you wish to avoid.
            </p>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== IN-GAME SETTINGS ===================== -->
  <section id="guide-ingame-settings" class="card">
    <button 
      @click="toggleGuideSection('ingame-settings')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Sliders class="w-5 h-5 text-bd-cyan" />
        In-Game Settings
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ingame-settings') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('ingame-settings')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          In-game settings are accessible from the <strong>gear icon</strong> in the top right corner of your current game. These settings are split into two sections:
        </p>

        <div class="space-y-4">
          <!-- Adventure Settings -->
          <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
            <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
              <Compass class="w-4 h-4 text-bd-green" />
              Adventure Settings
            </h3>
            <div class="space-y-2">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">AI Model</p>
                <p class="text-xs text-bd-text-secondary">Choose which AI model to use for this specific adventure. See the 
                  <router-link to="/guides?tab=ai-models" class="text-bd-accent-primary hover:underline">AI Models Guide</router-link> for detailed comparisons.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">AI Model Settings</p>
                <p class="text-xs text-bd-text-secondary">Fine-tune Temperature, Top-K, Top-P, Response Length, and Penalties. See the 
                  <router-link to="/guides?tab=advanced-settings" class="text-bd-accent-primary hover:underline">Advanced Settings Guide</router-link>.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">AI Safety Level</p>
                <p class="text-xs text-bd-text-secondary">Override the account-wide safety setting for this specific adventure (Safe, Moderate, Mature).</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">Adventure Visibility</p>
                <p class="text-xs text-bd-text-secondary">Set the adventure to Private, Unlisted, or Published.</p>
              </div>
            </div>
          </div>

          <!-- Gameplay Settings -->
          <div class="p-4 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
            <h3 class="font-semibold text-bd-text-primary mb-3 flex items-center gap-2">
              <Gamepad2 class="w-4 h-4 text-bd-blue" />
              Gameplay Settings
            </h3>
            <div class="space-y-2">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">Auto-Generate Images</p>
                <p class="text-xs text-bd-text-secondary">Toggle automatic image generation during gameplay. When enabled, the AI generates images at key story moments.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">Third Person Mode</p>
                <p class="text-xs text-bd-text-secondary">Switch between second person ("You walk...") and third person ("They walk...") narration style.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <p class="text-xs text-bd-text-primary font-medium mb-1">Adventures Display</p>
                <p class="text-xs text-bd-text-secondary">Control how text is displayed in your adventure, including formatting and layout options.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>

  <!-- ===================== PUBLISHING & VISIBILITY ===================== -->
  <section id="guide-publishing" class="card">
    <button 
      @click="toggleGuideSection('publishing')"
      class="w-full flex items-center justify-between text-left"
    >
      <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
        <Globe class="w-5 h-5 text-bd-purple" />
        Publishing &amp; Visibility
      </h2>
      <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('publishing') }" />
    </button>
    
    <Transition name="slide">
      <div v-if="isGuideSectionExpanded('publishing')" class="mt-4 space-y-4">
        <p class="text-bd-text-secondary">
          You can control who sees your content in AI Dungeon through <strong>visibility settings</strong>. These apply to both Adventures and Scenarios.
        </p>

        <div class="space-y-3">
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Lock class="w-5 h-5 text-bd-text-muted flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Private</h3>
                <p class="text-xs text-bd-text-secondary">Only you can see this content. This is the default for all new content.</p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <LinkIcon class="w-5 h-5 text-bd-blue flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Unlisted</h3>
                <p class="text-xs text-bd-text-secondary">Anyone with the link can view and play, but it won't appear in search or discovery. Great for sharing with friends.</p>
              </div>
            </div>
          </div>
          <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
            <div class="flex items-start gap-3">
              <Globe class="w-5 h-5 text-bd-green flex-shrink-0 mt-0.5" />
              <div>
                <h3 class="font-semibold text-bd-text-primary mb-1">Published</h3>
                <p class="text-xs text-bd-text-secondary">Visible to everyone. Appears in search and discovery. Other players can find and play your scenario.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
          <div class="flex items-start gap-2">
            <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
            <p class="text-xs text-bd-text-secondary">
              For more details on creating and publishing scenarios, see the 
              <router-link to="/guides?tab=scenarios-adventures" class="text-bd-accent-primary hover:underline">Scenarios &amp; Adventures Guide</router-link>.
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
  ChevronDown, ChevronUp, Settings, User, UserCog, Link, CreditCard,
  Shield, Smartphone, Trash2, AlertTriangle, Info, Lightbulb,
  Filter, Sliders, Compass, Gamepad2, Globe, Lock, Link as LinkIcon
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-overview', label: 'Overview', isHeader: true },
  { id: 'settings-overview', label: 'Settings Overview' },
  { id: 'header-account', label: 'Account', isHeader: true },
  { id: 'account-settings', label: 'Account Settings' },
  { id: 'ai-safety', label: 'AI Safety Settings' },
  { id: 'content-filter', label: 'Content Filter' },
  { id: 'header-ingame', label: 'In-Game', isHeader: true },
  { id: 'ingame-settings', label: 'In-Game Settings' },
  { id: 'publishing', label: 'Publishing & Visibility' },
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
