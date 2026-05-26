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

      <!-- ===================== DETECTING ULTRASCRIPTS ===================== -->
      <section id="guide-detection" class="card">
        <button
          @click="toggleGuideSection('detection')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Search class="w-5 h-5 text-bd-cyan" />
            Detecting Ultrascripts via Heartbeat
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('detection') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('detection')" class="mt-4 space-y-6">
            <p class="text-bd-text-secondary text-xs">
              Before attempting to call first-party modules, scenario scripts must detect if the BetterDungeon extension runtime is active in the player's browser. Rather than relying on fragile global namespaces, discovery is performed purely via the <strong>ultrascripts:heartbeat</strong> Story Card. When BetterDungeon loads an adventure, it immediately writes a heartbeat card advertising its protocol version and which modules are currently enabled.
            </p>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-xs text-bd-text-secondary">
              <strong>Heartbeat vs. SDK:</strong> The heartbeat is the sole discovery surface. It fires synchronously at turn-0 and does not depend on prior player inputs. The SDK module, on the other hand, is a dedicated module queried via standard ops requests to retrieve deep extension metadata.
            </div>

            <!-- Discovery Code Snippet -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <h4 class="font-semibold text-bd-text-primary text-xs">Discovery Code Boilerplate (Copy-Paste Ready)</h4>
              <p class="text-[11px] text-bd-text-secondary mb-2">
                Declare this helper structure inside your <strong>Library script</strong> to quickly inspect module and operation availability.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
var bd = state.bd;
bd.sdk = bd.sdk || {};

function getHeartbeat() {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] && cards[i].title === 'ultrascripts:heartbeat') {
      try {
        return JSON.parse(cards[i].value || '{}');
      } catch (e) {
        return null;
      }
    }
  }
  return null;
}

bd.sdk.hasModule = function (moduleId) {
  var hb = getHeartbeat();
  var mods = (hb && Array.isArray(hb.modules)) ? hb.modules : [];
  for (var i = 0; i < mods.length; i++) {
    if (mods[i] && mods[i].id === moduleId) return true;
  }
  return false;
};

bd.sdk.hasOp = function (moduleId, opName) {
  var hb = getHeartbeat();
  var mods = (hb && Array.isArray(hb.modules)) ? hb.modules : [];
  for (var i = 0; i < mods.length; i++) {
    var mod = mods[i];
    if (!mod || mod.id !== moduleId) continue;
    var ops = Array.isArray(mod.ops) ? mod.ops : [];
    return ops.indexOf(opName) !== -1;
  }
  return false;
};</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SDK VERSION & CONFIG ===================== -->
      <section id="guide-sdk-ops" class="card">
        <button
          @click="toggleGuideSection('sdk-ops')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Settings class="w-5 h-5 text-bd-purple" />
            SDK Version &amp; Config Queries
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('sdk-ops') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('sdk-ops')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              The first-party <strong>sdk</strong> module provides read-only queries to discover extension preferences and features. It is enabled by default and supports two main operations:
            </p>

            <div class="grid md:grid-cols-2 gap-4">
              <!-- Version Op -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/20 space-y-2">
                <h4 class="font-semibold text-bd-blue flex items-center gap-1">
                  <Terminal class="w-4 h-4" /> version Operation
                </h4>
                <p>
                  Returns basic runtime version metadata (safe for replay, 1000ms timeout).
                </p>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-primary">{
  "sdkVersion": "1.4.0",
  "betterDungeonVersion": "2.8.1",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "web"
}</pre>
              </div>

              <!-- Config Op -->
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/20 space-y-2">
                <h4 class="font-semibold text-bd-purple flex items-center gap-1">
                  <Settings class="w-4 h-4" /> config Operation
                </h4>
                <p>
                  Returns comprehensive feature flags and player settings (safe for replay, 1500ms timeout).
                </p>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-primary">{
  "features": { "highDpi": true, "advancedControls": true },
  "ultrascripts": {
    "enabled": true,
    "runtimeEnabled": true,
    "debug": false,
    "modulePreferences": { "scripture": true, "ai": true },
    "scriptureDisplay": { "size": "comfortable", "maxHeight": "medium" }
  }
}</pre>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
              <strong>Security Guarantee:</strong> The config response contains sanitized metadata only. High-security data such as OpenRouter API keys or raw user session tokens are <strong>never</strong> exposed to sandbox scripts.
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE WIRE PROTOCOL ===================== -->
      <section id="guide-wire-protocol" class="card">
        <button
          @click="toggleGuideSection('wire-protocol')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-blue" />
            Request/Response Wire Protocol
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('wire-protocol') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('wire-protocol')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Scripts execute operations by writing standardized request envelopes to the <strong>ultrascripts:out</strong> Story Card. The extension processes the request, performs any necessary network calls, and returns the response into a module-specific input card titled <strong>ultrascripts:in:&lt;module&gt;</strong>.
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-4">
              <h4 class="font-semibold text-bd-text-primary">Standard Request/Response Wire Envelope</h4>
              
              <div class="grid md:grid-cols-2 gap-4">
                <!-- Request -->
                <div class="space-y-1">
                  <div class="font-mono text-[10px] text-bd-green font-bold">Request Out (ultrascripts:out)</div>
                  <pre class="p-2.5 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "v": 1,
  "requests": [{
    "id": "turn-1-sdk-query-1",
    "module": "sdk",
    "op": "config",
    "args": {}
  }],
  "acks": ["previous-completed-request-id"]
}</pre>
                </div>

                <!-- Response -->
                <div class="space-y-1">
                  <div class="font-mono text-[10px] text-bd-blue font-bold">Response In (ultrascripts:in:sdk)</div>
                  <pre class="p-2.5 rounded bg-bd-bg-primary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "v": 1,
  "responses": {
    "turn-1-sdk-query-1": {
      "status": "ok",
      "data": { ...configData },
      "completedLiveCount": 1
    }
  }
}</pre>
                </div>
              </div>
            </div>

            <!-- Acknowledge and Status -->
            <div class="grid md:grid-cols-2 gap-4 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Acknowledge Cycle (acks)</strong>
                <p class="text-bd-text-muted">To keep the Story Card structure clean, scripts must include completed request IDs inside the <code>acks</code> array of subsequent requests. BetterDungeon clears acknowledged records immediately to conserve memory.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary block mb-1">Response Status Codes</strong>
                <ul class="list-disc pl-4 text-bd-text-muted mt-1 space-y-0.5">
                  <li><code>ok</code>: Operation executed successfully.</li>
                  <li><code>err</code>: Request failed or arguments were invalid.</li>
                  <li><code>timeout</code>: Module failed to reply within time cap.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== LIFECYCLE & TIMING ===================== -->
      <section id="guide-lifecycle" class="card">
        <button
          @click="toggleGuideSection('lifecycle')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <GitMerge class="w-5 h-5 text-bd-blue" />
            Lifecycle &amp; Timing mechanics
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('lifecycle') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('lifecycle')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Understanding execution timing is critical to preventing timing bugs. The complete pipeline dispatches calls through a structured flow:
            </p>

            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle text-[11px] font-mono leading-relaxed space-y-1">
              <div>1. <strong class="text-bd-cyan">Transport Layer</strong>: Shims the browser WebSocket to capture real-time traffic to and from AI Dungeon.</div>
              <div>2. <strong class="text-bd-purple">Core Dispatcher</strong>: Maps the captured input, tracks the current adventure context, and evaluates the live count.</div>
              <div>3. <strong class="text-bd-blue">Module Dispatch</strong>: Parses the request card, runs the operation, and posts the results into the input cards.</div>
            </div>

            <div class="p-4 rounded bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <h4 class="font-semibold text-bd-text-primary">State Rewind &amp; Action Counts</h4>
              <p>
                When a player performs an <strong>Undo</strong> or <strong>Restore</strong>, the story action count shifts back. Ultrascripts core intercepts these rewind calls and handles them systematically:
              </p>
              <ul class="list-disc pl-4 text-bd-text-muted space-y-1 text-[11px]">
                <li><strong>Undo/Redo</strong>: Shift the live action count. Responses corresponding to invalidated turns are skipped.</li>
                <li><strong>Retry</strong>: Generates a new tail action without altering the overall action count. The extension resets the current turn's request queue automatically.</li>
                <li><strong>Edits</strong>: Direct modifications to the story log affect neither the action count nor request states.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SDK RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button
          @click="toggleGuideSection('recipes')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            SDK Recipes &amp; Templates
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-6 text-xs text-bd-text-secondary">
            <p>
              Integrate these core templates to query configurations and build robust, undo-aware operations.
            </p>

            <!-- Recipe 1 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-3">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1 text-xs">
                <Terminal class="w-4 h-4" /> Recipe 1: Platform Capabilities Auto-Detector
              </h4>
              <p>
                Gracefully adjusts your scripts depending on which modules and operations are active. Excellent for implementing progressive enhancement.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function() {
  var sdk = state.bd && state.bd.sdk;
  if (!sdk) {
    // BetterDungeon or Ultrascripts not active
    return;
  }

  if (sdk.hasModule('scripture') && sdk.hasOp('scripture', 'stat-bar')) {
    // Scripture widgets are supported! Publish stats HUD
    state.bd.publishWidgets([
      { type: 'stat-bar', label: 'HP', value: 100, max: 100, color: '#22c55e' }
    ]);
  } else {
    // Scripture not active. Fall back to clean text formatting
    text += '\n[HP: 100/100]';
  }
})();</pre>
            </div>

            <!-- Recipe 2 -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-3">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1 text-xs">
                <RefreshCw class="w-4 h-4" /> Recipe 2: Generic Ultrascripts Request Helper
              </h4>
              <p>
                A reusable, library-level function to queue operations requests, maintain unique request IDs, and process module inputs safely.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
state.bd.activeRequests = state.bd.activeRequests || {};

state.bd.sendOpRequest = function(moduleId, opName, args) {
  var lc = (info && info.actionCount) || 1;
  var reqId = moduleId + '-' + opName + '-t' + lc;

  var request = {
    v: 1,
    requests: [{
      id: reqId,
      module: moduleId,
      op: opName,
      args: args
    }],
    acks: Object.keys(state.bd.activeRequests)
  };

  // Find or create 'ultrascripts:out' card
  var outCard = storyCards.find(function(c) { return c.title === 'ultrascripts:out'; });
  if (outCard) {
    outCard.value = JSON.stringify(request);
  } else {
    addStoryCard('ultrascripts:out', JSON.stringify(request));
  }

  // Save to active track map
  state.bd.activeRequests[reqId] = true;
  return reqId;
};</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== SDK TROUBLESHOOTING ===================== -->
      <section id="guide-pitfalls" class="card">
        <button
          @click="toggleGuideSection('pitfalls')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            SDK Troubleshooting
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }"
          />
        </button>
        
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-4">
            <p class="text-xs text-bd-text-secondary">
              Resolve these timing and discovery hazards during your development loop.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <!-- Pitfall 1 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Heartbeat Card Not Found
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Your script checks the story cards array, but the heartbeat card is missing.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Verify the BetterDungeon extension is installed and active. Check that the "Master Ultrascripts Switch" in the extension menu is toggled ON.
                </p>
              </div>

              <!-- Pitfall 2 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Response Never Arrives
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Requests are posted to <code>ultrascripts:out</code>, but the corresponding response card is never created.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Ensure the target module is enabled in player config. Double-check your wire format for valid JSON and correct module name capitalization.
                </p>
              </div>

              <!-- Pitfall 3 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Stale Responses on Undo
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Undoing actions causes obsolete turn-state variables to bleed into your new current turn context.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Always compare the response card's <code>completedLiveCount</code> with the active <code>info.actionCount</code> before parsing contents.
                </p>
              </div>

              <!-- Pitfall 4 -->
              <div class="p-4 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-2">
                <h4 class="font-semibold text-bd-pink flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> Duplicate Request ID Clashes
                </h4>
                <p class="text-bd-text-secondary leading-relaxed">
                  <strong>Issue:</strong> Submitting identical request IDs inside a single turn loop causes execution warnings or response overrides.
                </p>
                <p class="text-bd-text-muted leading-relaxed">
                  <strong>Remedy:</strong> Always append the current action count or a microsecond timestamp suffix to your request IDs to guarantee uniqueness.
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
  ChevronDown, ChevronUp, Terminal, Cpu, GitMerge, Layers, Rocket, 
  AlertTriangle, Search, Settings, X, RefreshCw, HelpCircle
} from 'lucide-vue-next'

// Guide table of contents sections
const guideSections = [
  { id: 'header-discovery', label: 'Discovery & Detection', isHeader: true },
  { id: 'detection', label: 'Detecting Ultrascripts' },
  { id: 'sdk-ops', label: 'SDK Version & Config' },
  { id: 'header-protocol', label: 'Wire Protocol', isHeader: true },
  { id: 'wire-protocol', label: 'Request/Response Protocol' },
  { id: 'lifecycle', label: 'Lifecycle & Timing' },
  { id: 'header-recipes', label: 'Recipes', isHeader: true },
  { id: 'recipes', label: 'SDK Recipes' },
  { id: 'header-trouble', label: 'Troubleshooting', isHeader: true },
  { id: 'pitfalls', label: 'SDK Troubleshooting' }
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
