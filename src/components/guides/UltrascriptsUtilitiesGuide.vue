<template>
  <!-- Table of Contents - Sticky Sidebar -->
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

      <!-- ===================== CLOCK MODULE ===================== -->
      <section id="guide-clock" class="card">
        <button
          @click="toggleGuideSection('clock')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Clock class="w-5 h-5 text-bd-amber" />
            Clock Module
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('clock') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('clock')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              The <strong>Clock</strong> module introduces real-world temporal grounding to scenarios. Instead of stories taking place in static hours, authors can query the player's actual local clock to seamlessly adapt narrative moods, adjust description details, or trigger time-of-day mechanics. Because clock queries are entirely deterministic on execution, all three operations are fully marked as <strong>safe for replay</strong>.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <!-- Now Op -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Clock class="w-4 h-4 text-bd-amber" />
                  now Operation
                </h3>
                <p class="text-bd-text-secondary">
                  Returns the precise current epoch timestamp in milliseconds (1000ms timeout limit).
                </p>
              </div>

              <!-- Tz Op -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Globe class="w-4 h-4 text-bd-blue" />
                  tz Operation
                </h3>
                <p class="text-bd-text-secondary">
                  Exposes full timezone string metadata (e.g. <code>America/New_York</code>) and local UTC offset info.
                </p>
              </div>

              <!-- Format Op -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2">
                  <Cpu class="w-4 h-4 text-bd-purple" />
                  format Operation
                </h3>
                <p class="text-bd-text-secondary">
                  Helper to translate raw timestamps into readable formats based on customizable format strings.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== GEOLOCATION MODULE ===================== -->
      <section id="guide-geolocation" class="card">
        <button
          @click="toggleGuideSection('geolocation')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <MapPin class="w-5 h-5 text-bd-blue" />
            Geolocation Module
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('geolocation') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('geolocation')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              The <strong>Geolocation</strong> module allows scenarios to customize descriptions based on the player's physical coordinates. Highly immersive adventures can spawn specific dungeon maps, alter item drops, or adjust atmospheric elements to align with the player's real surroundings.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Consent Popup -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-blue/20 space-y-2">
                <h4 class="font-semibold text-bd-blue flex items-center gap-1.5">
                  <Globe class="w-4 h-4" /> Browser Permission Gate
                </h4>
                <p>
                  Similar to standard web procedures, querying geolocation requires the player's active consent. The browser prompts with a standard coordinate access confirmation dialog. Scripts can proactively inspect <code>permission</code> before launching queries.
                </p>
              </div>

              <!-- Privacy notes -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/20 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <ShieldCheck class="w-4 h-4" /> Absolute Coordinate Privacy
                </h4>
                <p>
                  Privacy is guaranteed. Real physical coordinates are processed entirely inside the player's local web client. Location and coordinate figures are <strong>never</strong> transmitted to BetterDungeon servers or stored externally.
                </p>
              </div>
            </div>

            <!-- Operations Details -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2">
              <h4 class="font-semibold text-bd-text-primary">Supported Operations</h4>
              <ul class="list-disc pl-4 text-bd-text-muted space-y-1 text-[11px]">
                <li><code>permission</code>: Checks browser permission status (returns <code>granted</code>, <code>prompt</code>, or <code>denied</code>).</li>
                <li><code>getCurrent</code>: Fetches latitude, longitude, and accuracy bounds from browser sensor APIs.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WEATHER MODULE ===================== -->
      <section id="guide-weather" class="card">
        <button
          @click="toggleGuideSection('weather')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <CloudSun class="w-5 h-5 text-bd-cyan" />
            Weather Module
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('weather') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('weather')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              The <strong>Weather</strong> module reads real atmospheric conditions at the player's coordinates. This is perfect for adapting local scenario descriptions or applying environmental gameplay parameters dynamically.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Ops details -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/20 space-y-2">
                <h4 class="font-semibold text-bd-cyan flex items-center gap-1">
                  <Thermometer class="w-4 h-4 text-bd-cyan" /> Meteorological Queries
                </h4>
                <p>
                  Supports two operations: <code>current</code> (delivers temperature, wind speed, relative humidity, and weather code descriptors) and <code>forecast</code> (delivers 3-day projections). Weather API fetches depend on active Geolocation parameters for automatic location resolving.
                </p>
              </div>

              <!-- Weather codes -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-2">
                <h4 class="font-semibold text-bd-text-primary flex items-center gap-1">
                  <CloudSun class="w-4 h-4 text-bd-amber" /> Weather Code Interpretations
                </h4>
                <p>
                  Returns standardized weather code values. These map to common conditions:
                </p>
                <div class="grid grid-cols-2 gap-1 text-[10px] font-mono text-bd-text-muted">
                  <div>• 0: Clear Sky</div>
                  <div>• 1-3: Partly Cloudy</div>
                  <div>• 51-55: Drizzle Rain</div>
                  <div>• 61-65: Rainy Storm</div>
                  <div>• 71-75: Heavy Snow</div>
                  <div>• 95: Thunderstorm</div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SYSTEM & NETWORK DIAGNOSTICS ===================== -->
      <section id="guide-system-network" class="card">
        <button
          @click="toggleGuideSection('system-network')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            System &amp; Network Diagnostics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('system-network') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('system-network')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Build elegant, highly adaptive layouts by inspecting platform capabilities and browser connection metrics.
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Network status -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-green/20 space-y-2">
                <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                  <Wifi class="w-4 h-4 text-bd-green" /> Network.status Operation
                </h4>
                <p>
                  Checks connection stability. Returns boolean <code>online</code> flags and estimated round-trip latency scores. Essential for gracefully falling back when the player is offline.
                </p>
              </div>

              <!-- System info -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-purple/20 space-y-2">
                <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                  <Battery class="w-4 h-4 text-bd-purple" /> System &amp; Power Operations
                </h4>
                <p>
                  Includes <code>info</code> (reports user agent family and device platforms) and <code>power</code> (reports real battery charge levels and power source connections, where supported).
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ENVIRONMENTAL RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button
          @click="toggleGuideSection('recipes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Environmental Recipes &amp; Templates
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Utilize these complete recipes to steer story details and gameplay dynamics based on real-world environment features.
            </p>

            <!-- Recipe 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-3">
              <h4 class="font-semibold text-bd-amber flex items-center gap-1.5 text-xs">
                <Clock class="w-4 h-4" /> Recipe 1: Time-of-Day Narrative Steering
              </h4>
              <p>
                Injects local clock readings directly into the context stream. The AI adjusts ambient scenario descriptions to mirror whether the player is playing at day or night!
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  var lc = (info && info.actionCount) || 1;
  var respCardTitle = 'ultrascripts:in:clock';
  var respCard = storyCards.find(function(c) { return c.title === respCardTitle; });

  if (respCard) {
    try {
      var payload = JSON.parse(respCard.value || '{}');
      var response = payload.responses && payload.responses['clock-now-t' + lc];
      
      if (response && response.status === 'ok') {
        var epoch = response.data.now;
        var date = new Date(epoch);
        var hour = date.getHours(); // Local hour

        if (hour >= 20 || hour < 5) {
          text += '\n[System Context: The sky is pitch black. The chilling night shadows make surroundings highly ominous.]';
        } else {
          text += '\n[System Context: Bright daylight floods the scene. Vision is perfectly clear.]';
        }
      }
    } catch(e) {}
  }
})();</pre>
            </div>

            <!-- Recipe 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-3">
              <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5 text-xs">
                <CloudSun class="w-4 h-4" /> Recipe 2: Weather-Reactive Combat Modifiers
              </h4>
              <p>
                Reads actual local weather conditions and applies negative gameplay stat debuffs or custom combat events on rainy or windy days!
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  var lc = (info && info.actionCount) || 1;
  var respCard = storyCards.find(function(c) { return c.title === 'ultrascripts:in:weather'; });

  if (respCard) {
    try {
      var payload = JSON.parse(respCard.value || '{}');
      var response = payload.responses && payload.responses['weather-curr-t' + lc];

      if (response && response.status === 'ok') {
        var wcode = response.data.weatherCode; // WMO weather code
        
        if (wcode >= 61 && wcode <= 65) {
          state.combatPenalty = -2; // Heavy rain debuff
          text += '\n[Combat Mod: A sudden local rainstorm dampens the ground. Ranged attacks suffer a -2 penalty.]';
        } else if (wcode === 95) {
          state.combatPenalty = -4; // Lightning debuff
          text += '\n[Combat Mod: A violent thunderstorm rages overhead. All spell costs are doubled!]';
        } else {
          state.combatPenalty = 0;
        }
      }
    } catch(e) {}
  }
})();</pre>
            </div>

            <!-- Recipe 3 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-3">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-xs">
                <Cpu class="w-4 h-4" /> Recipe 3: Platform-Adaptive UI Layouts
              </h4>
              <p>
                Queries platform information inside system metrics and dynamically switches Scripture widget display arrangements for optimized viewports (e.g. mobile vs desktop layout).
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier File
(function() {
  var lc = (info && info.actionCount) || 1;
  var respCard = storyCards.find(function(c) { return c.title === 'ultrascripts:in:system'; });

  if (respCard && state.bd && typeof state.bd.publishWidgets === 'function') {
    try {
      var payload = JSON.parse(respCard.value || '{}');
      var response = payload.responses && payload.responses['sys-info-t' + lc];

      if (response && response.status === 'ok') {
        var platform = response.data.platformType; // 'mobile' or 'desktop'

        if (platform === 'mobile') {
          // Send simplified HUD widgets for compact viewports
          state.bd.publishWidgets([
            { type: 'stat-bar', label: 'HP', value: state.hp, max: 100, color: '#22c55e' }
          ]);
        } else {
          // Desktop supports full detailed dashboard grid
          state.bd.publishWidgets([
            { type: 'stat-bar', label: 'Health', value: state.hp, max: 100, color: '#22c55e' },
            { type: 'text', label: 'Weapon', value: 'Iron Claymore' }
          ]);
        }
      }
    } catch(e) {}
  }
})();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== UTILITY TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Utility Troubleshooting
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-xs text-bd-text-secondary">
              Solve browser capability restrictions and hardware blockages with these diagnostics.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Geolocation Denied
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Coordinate queries return errors because the user blocked browser permission requests.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Direct players to click the padlock icon in their browser address bar, reset location permissions, and refresh AI Dungeon.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Weather API Unavailable
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Weather requests fail because Geolocation is unavailable or coordinates are completely blocked.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Geolocation coordinates are vital to resolving meteorological data. Instruct the player to enable browser coordinate access to unlock weather functionality.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Battery API Unsupported
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> System power metrics return empty or trigger exceptions on specific desktop browsers.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Modern desktop browsers (e.g. Firefox) disable the Battery Status API for privacy concerns. Always write fallback checks to ensure scripts handle blank power records gracefully.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Stale Connection Diagnostics
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Network metrics or latency status reports remain outdated because values are fetched only once during start.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Connection states are highly mutable. Trigger fresh <code>Network.status</code> queries periodically during crucial gameplay transitions rather than relying on cached initial status data.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>


    </div><!-- End main content -->
  </div><!-- End flex container -->
</template>

<script setup>
import { ref } from 'vue'
import { 
  ChevronDown, ChevronUp, Clock, MapPin, CloudSun, Wifi, Cpu, Rocket, 
  AlertTriangle, Globe, Thermometer, Battery
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-time', label: 'Time & Location', isHeader: true },
  { id: 'clock', label: 'Clock Module' },
  { id: 'geolocation', label: 'Geolocation Module' },
  { id: 'header-environment', label: 'Environment', isHeader: true },
  { id: 'weather', label: 'Weather Module' },
  { id: 'system-network', label: 'System & Network' },
  { id: 'header-recipes', label: 'Recipes', isHeader: true },
  { id: 'recipes', label: 'Environmental Recipes' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'Utility Troubleshooting' }
]

// Track which guide sections are expanded (all expanded by default)
const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) {
    expandedGuideSections.value.delete(sectionId)
  } else {
    expandedGuideSections.value.add(sectionId)
  }
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = (sectionId) => expandedGuideSections.value.has(sectionId)

const scrollToGuideSection = (sectionId) => {
  const element = document.getElementById(`guide-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(sectionId)) {
      expandedGuideSections.value.add(sectionId)
      expandedGuideSections.value = new Set(expandedGuideSections.value)
    }
  }
}

const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.filter(s => !s.isHeader).map(s => s.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
