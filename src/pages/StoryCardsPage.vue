<template>
  <div class="space-y-6 animate-fade-in">
    <!-- Page Header -->
    <header>
      <h1 class="text-2xl font-bold text-bd-text-primary flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center">
          <Drama class="w-5 h-5 text-bd-purple" />
        </div>
        Story Cards
      </h1>
      <p class="text-bd-text-secondary mt-2">
        Pre-made character cards, location cards, and faction cards for your adventures.
      </p>
    </header>

    <!-- Coming Soon Notice -->
    <section class="card-elevated border-bd-warning/30">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-warning/20 flex items-center justify-center flex-shrink-0">
          <Construction class="w-6 h-6 text-bd-warning" />
        </div>
        <div>
          <h2 class="text-lg font-semibold text-bd-text-primary mb-2">Coming Soon!</h2>
          <p class="text-bd-text-secondary mb-4">
            We're actively working on building a collection of high-quality Story Cards. 
            This section will include:
          </p>
          <ul class="space-y-2 text-sm text-bd-text-secondary">
            <li class="flex items-center gap-2">
              <Users class="w-4 h-4 text-bd-purple" />
              <span><strong>Character Cards</strong> - Ready-to-use NPCs with personalities and backstories</span>
            </li>
            <li class="flex items-center gap-2">
              <MapPin class="w-4 h-4 text-bd-blue" />
              <span><strong>Location Cards</strong> - Detailed settings and environments</span>
            </li>
            <li class="flex items-center gap-2">
              <Shield class="w-4 h-4 text-bd-green" />
              <span><strong>Faction Cards</strong> - Organizations, guilds, and groups</span>
            </li>
            <li class="flex items-center gap-2">
              <Sparkles class="w-4 h-4 text-bd-amber" />
              <span><strong>Item Cards</strong> - Magical artifacts and equipment</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Card Type Previews -->
    <section>
      <div class="section-header mb-4">
        <Layers class="w-4 h-4" />
        <span>Card Types</span>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <!-- Character Card Preview -->
        <div class="card group hover:border-bd-purple/30">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-bd-purple/20 flex items-center justify-center">
              <Users class="w-5 h-5 text-bd-purple" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Character Cards</h3>
              <span class="text-xs text-bd-text-muted">NPCs & Companions</span>
            </div>
            <span class="ml-auto badge badge-new">Soon</span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-4">
            Fully-realized characters with detailed personalities, speech patterns, 
            motivations, and backstories ready to drop into your adventures.
          </p>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] font-mono text-xs text-bd-text-muted">
            <pre>[Character Name: Elara Nightwhisper
Race: Half-Elf
Age: 127
Personality: Mysterious, wise...
Speech: Speaks in riddles...]</pre>
          </div>
        </div>

        <!-- Location Card Preview -->
        <div class="card group hover:border-bd-blue/30">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-bd-blue/20 flex items-center justify-center">
              <MapPin class="w-5 h-5 text-bd-blue" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Location Cards</h3>
              <span class="text-xs text-bd-text-muted">Settings & Environments</span>
            </div>
            <span class="ml-auto badge badge-new">Soon</span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-4">
            Richly described locations with atmosphere, notable features, 
            inhabitants, and potential story hooks.
          </p>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] font-mono text-xs text-bd-text-muted">
            <pre>[Location: The Gilded Chalice Tavern
Type: Social Hub
Atmosphere: Warm, bustling...
Notable Features: Secret room...]</pre>
          </div>
        </div>

        <!-- Faction Card Preview -->
        <div class="card group hover:border-bd-green/30">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-bd-green/20 flex items-center justify-center">
              <Shield class="w-5 h-5 text-bd-green" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Faction Cards</h3>
              <span class="text-xs text-bd-text-muted">Organizations & Groups</span>
            </div>
            <span class="ml-auto badge badge-new">Soon</span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-4">
            Detailed organizations with hierarchies, goals, resources, 
            and relationships to other factions.
          </p>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] font-mono text-xs text-bd-text-muted">
            <pre>[Faction: The Silver Dawn
Type: Religious Order
Goals: Protect the realm...
Resources: Temple network...]</pre>
          </div>
        </div>

        <!-- Item Card Preview -->
        <div class="card group hover:border-bd-amber/30">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-bd-amber/20 flex items-center justify-center">
              <Sparkles class="w-5 h-5 text-bd-amber" />
            </div>
            <div>
              <h3 class="font-semibold text-bd-text-primary">Item Cards</h3>
              <span class="text-xs text-bd-text-muted">Artifacts & Equipment</span>
            </div>
            <span class="ml-auto badge badge-new">Soon</span>
          </div>
          <p class="text-sm text-bd-text-secondary mb-4">
            Magical items and artifacts with histories, abilities, 
            and potential consequences of use.
          </p>
          <div class="p-3 rounded-lg bg-bd-bg-primary border border-white/[0.06] font-mono text-xs text-bd-text-muted">
            <pre>[Item: Moonblade of Shadows
Type: Legendary Weapon
Abilities: Phase through...
History: Forged by...]</pre>
          </div>
        </div>
      </div>
    </section>

    <!-- Contribute CTA -->
    <section class="card-elevated">
      <div class="flex items-start gap-4">
        <div class="w-12 h-12 rounded-xl bg-bd-accent-primary/20 flex items-center justify-center flex-shrink-0">
          <GitPullRequest class="w-6 h-6 text-bd-accent-primary" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-bd-text-primary mb-2">Help Build This Collection!</h3>
          <p class="text-bd-text-secondary mb-4">
            Have great Story Cards you've created? We'd love to include them in the repository. 
            Your contributions help all AI Dungeon players.
          </p>
          <router-link to="/contribute" class="btn btn-primary">
            <GitPullRequest class="w-4 h-4" />
            Learn How to Contribute
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  Drama, Construction, Users, MapPin, Shield, Sparkles, Layers, GitPullRequest 
} from 'lucide-vue-next'
</script>
