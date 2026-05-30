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

      <!-- SDK paved-path banner -->
      <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5 flex items-center gap-3 flex-wrap">
        <Zap class="w-4 h-4 text-bd-amber flex-shrink-0" />
        <div class="flex-1 min-w-0 text-xs text-bd-text-secondary">
          <strong class="text-bd-amber">New to Ultrascripts?</strong> The recipes below assume the <code class="text-bd-green">bd.us</code> SDK helper from Quick Start.
        </div>
        <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/15 hover:bg-bd-amber/25 text-bd-amber text-[11px] font-semibold transition-colors">
          Quick Start
          <ArrowRight class="w-3 h-3" />
        </router-link>
        <router-link to="/ultrascripts?tab=cookbook" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Cookbook
        </router-link>
      </div>

      <!-- ===================== OVERVIEW ===================== -->
      <section id="guide-overview" class="card">
        <button @click="toggleGuideSection('overview')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Terminal class="w-5 h-5 text-bd-cyan" />
            SDK Module Overview
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('overview') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('overview')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <strong>SDK module</strong> exposes a narrow, read-only window into the BetterDungeon extension itself: its version, its feature flags,
              and the player's safe-to-expose Ultrascripts preferences. Scenarios call it to <em>adapt</em> behavior to a player's setup, not to control it.
            </p>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <h4 class="font-semibold text-bd-cyan text-[12px] mb-1.5 flex items-center gap-1.5">
                <Search class="w-4 h-4" /> Heartbeat vs. SDK &mdash; pick the right one
              </h4>
              <ul class="space-y-1 text-[11px]">
                <li>&middot; <strong>Heartbeat</strong> = <em>"is Ultrascripts present, and which modules/ops are mounted?"</em> Free, synchronous, present at turn-0.</li>
                <li>&middot; <strong>SDK</strong> = <em>"what does the player's BetterDungeon look like, and how should I adapt?"</em> A real op call, slightly slower, returns rich metadata.</li>
              </ul>
              <p class="text-[11px] mt-1.5">
                If you only need to check availability, read the heartbeat card. Reach for SDK ops when you need the deeper picture (cost controls,
                display preferences, AI configured status, etc.).
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREATOR PROTOCOL ===================== -->
      <section id="guide-protocol" class="card">
        <button @click="toggleGuideSection('protocol')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-green" />
            Creator Compatibility Protocol
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('protocol') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('protocol')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Start by classifying the scenario. Some scripts are <strong>enhanced with Ultrascripts</strong>; others <strong>require Ultrascripts</strong>.
              The SDK helps you decide which layer the current player is in so your scenario can either adapt gracefully or enforce its requirement clearly.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Enhanced with Ultrascripts</h4>
                <p class="text-[11px]">
                  Use the SDK to decide when to turn on extra UI, better data, or richer automation. Missing runtime means you stay on the plain-script path.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">Requires Ultrascripts</h4>
                <p class="text-[11px]">
                  Use the SDK to distinguish runtime absence from incomplete setup so your requirement message can tell the player exactly what they need.
                </p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What you see</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What it means</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">What to do</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>!bd.us.available()</code></td>
                    <td class="py-2 px-2">No heartbeat, so no live Ultrascripts runtime is available to your script.</td>
                    <td class="py-2 px-2">Run plain AI Dungeon logic. Skip Scripture publishes and op calls.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>bd.us.available()</code> but <code>!bd.us.has('module')</code></td>
                    <td class="py-2 px-2">Ultrascripts exists, but that module is not mounted for this player.</td>
                    <td class="py-2 px-2">Keep the rest of your Ultrascripts flow, but fall back for that one feature.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code>bd.us.has('sdk', 'config')</code> and no cached config yet</td>
                    <td class="py-2 px-2">The runtime is present, but you have not asked for player configuration yet.</td>
                    <td class="py-2 px-2">Queue <code>sdk.config</code> once, then read it on the next turn.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2"><code>cfg.data.ultrascripts...</code> says a feature is off or unconfigured</td>
                    <td class="py-2 px-2">The player has explicitly not enabled that capability yet.</td>
                    <td class="py-2 px-2">Respect it. Use a narrative fallback and document the optional upgrade path in scenario notes.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <p class="text-[11px]">
                <strong class="text-bd-green">Important:</strong> a missing heartbeat is not a special-case error you need to diagnose. From the script side,
                "no BetterDungeon", "Ultrascripts disabled", and "runtime not available" all collapse into the same safe creator behavior:
                <strong>do the plain-script version instead.</strong>
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== OPS REFERENCE ===================== -->
      <section id="guide-ops" class="card">
        <button @click="toggleGuideSection('ops')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Code class="w-5 h-5 text-bd-cyan" />
            Operations Reference
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('ops') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <!-- version -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.version</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms</span>
              </div>
              <p>Returns minimal version metadata. Stable and cheap; safe to call on every adventure load if you need it.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",
  "betterDungeonVersion": "2.0.0",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "BetterDungeon"
}</pre>
              </div>
            </div>

            <!-- config -->
            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-cyan text-[13px]"><code>sdk.config</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1500ms</span>
              </div>
              <p>Returns the full sanitized configuration surface: feature flags, module preferences, Scripture display knobs, WebFetch consent counts, and AI status + cost controls.</p>
              <div>
                <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">data (representative)</div>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">{
  "sdkVersion": "1.0.0",
  "betterDungeonVersion": "2.0.0",
  "ultrascriptsProtocol": 1,
  "ultrascriptsClient": "BetterDungeon",
  "features": {
    "ultrascripts": true,
    "markdown": true,
    "command": true,
    "try": true,
    "triggerHighlight": true,
    "hotkey": true,
    "favoriteInstructions": true,
    "inputModeColor": true,
    "characterPreset": true,
    "autoSee": false,
    "notes": true,
    "storyCardModalDock": true,
    "inputHistory": true,
    "textToSpeech": false
  },
  "ultrascripts": {
    "enabled": true,
    "runtimeEnabled": true,
    "debug": false,
    "modulePreferences": {
      "scripture": true, "webfetch": true, "clock": true,
      "sdk": true, "geolocation": true, "weather": true,
      "network": true, "system": true, "ai": true
    },
    "scriptureDisplay": {
      "size": "normal",       // "compact" | "normal" | "comfortable" | "large"
      "maxHeight": "medium",  // "short"   | "medium" | "tall"
      "layout": "balanced"    // "balanced" | "stacked"
    },
    "webfetch": {
      "savedOriginCount": 0,
      "allowCount": 0,
      "denyCount": 0
    },
    "ai": {
      "configured": true,
      "defaultModel": "google/gemini-2.0-flash-exp:free",
      "costControls": {
        "freeModelsOnly": true,
        "advancedOpen": false,
        "maxPromptPricePerMillion": 0,
        "maxCompletionPricePerMillion": 0,
        "perCallEstimateCap": 0,
        "dailySpendCap": 0,
        "monthlySpendCap": 0
      }
    }
  }
}</pre>
              </div>
              <div class="p-2 rounded bg-bd-amber/10 border border-bd-amber/30 text-[11px]">
                <strong class="text-bd-amber">Security guarantee:</strong> The OpenRouter API key is <strong>never</strong> exposed.
                The <code>ai.configured</code> boolean is the only signal that a key exists. Domain allow/deny lists for WebFetch are reported as counts, not as origin strings.
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== HELPER LIBRARY ===================== -->
      <section id="guide-helper" class="card">
        <button @click="toggleGuideSection('helper')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Library class="w-5 h-5 text-bd-amber" />
            Script-Side Helper Library
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('helper') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('helper')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Wrap heartbeat lookups behind a small helper so scenario code reads cleanly. Drop this into your <strong>Library</strong> script and reuse it across modifiers.
            </p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// Library Script
globalThis.bd = globalThis.bd || {};
var bd = globalThis.bd;
bd.sdk = bd.sdk || {};

function getHeartbeat() {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (cards[i] &amp;&amp; cards[i].title === 'ultrascripts:heartbeat') {
      try { return JSON.parse(cards[i].value || '{}'); } catch (e) { return null; }
    }
  }
  return null;
}

bd.sdk.runtimePresent = function () {
  return !!getHeartbeat();
};

bd.sdk.hasModule = function (moduleId) {
  var hb = getHeartbeat();
  var mods = normalizeModules(hb);
  for (var i = 0; i < mods.length; i++) {
    if (mods[i] &amp;&amp; mods[i].id === moduleId) return true;
  }
  return false;
};

function normalizeModules(hb) {
  var raw = hb &amp;&amp; hb.modules;
  if (Array.isArray(raw)) return raw;
  if (raw &amp;&amp; typeof raw === 'object') {
    var list = [];
    for (var id in raw) {
      var m = raw[id];
      if (m &amp;&amp; typeof m === 'object') {
        if (!m.id) m.id = id;
        list.push(m);
      } else if (m) {
        list.push({ id: id, ops: [] });
      }
    }
    return list;
  }
  return [];
}

function normalizeOps(moduleInfo) {
  var raw = moduleInfo &amp;&amp; (moduleInfo.ops || moduleInfo.operations || moduleInfo.capabilities);
  if (Array.isArray(raw)) {
    return raw.map(function (op) {
      return typeof op === 'string' ? op : (op &amp;&amp; (op.id || op.name || op.op));
    }).filter(Boolean);
  }
  if (raw &amp;&amp; typeof raw === 'object') return Object.keys(raw);
  return [];
}

bd.sdk.hasOp = function (moduleId, opName) {
  var hb = getHeartbeat();
  var mods = normalizeModules(hb);
  for (var i = 0; i < mods.length; i++) {
    var m = mods[i];
    if (!m || m.id !== moduleId) continue;
    var ops = normalizeOps(m);
    return ops.indexOf(opName) !== -1;
  }
  return false;
};</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== BOOTSTRAP ===================== -->
      <section id="guide-bootstrap" class="card">
        <button @click="toggleGuideSection('bootstrap')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <RefreshCw class="w-5 h-5 text-bd-amber" />
            One-Shot Bootstrap Pattern
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('bootstrap') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('bootstrap')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Most creator flows only need to ask for <code>sdk.config</code> once per adventure, cache the last response, and branch from there. This is
              the paved path when you are already using the <code>bd.us</code> helper from Quick Start.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">state.bd = state.bd || {};
globalThis.bd = globalThis.bd || {};
state.bd.creator = state.bd.creator || {};

bd.us.tick();

var creator = state.bd.creator;
var cfg = bd.us.latest('sdk', 'config');

if (bd.us.available() &amp;&amp; bd.us.has('sdk', 'config') &amp;&amp; !creator.requestedSdkConfig) {
  creator.requestedSdkConfig = true;
  bd.us.call('sdk', 'config');
}

if (cfg &amp;&amp; cfg.status === 'ok') {
  var aiReady = !!(cfg.data
    &amp;&amp; cfg.data.ultrascripts
    &amp;&amp; cfg.data.ultrascripts.ai
    &amp;&amp; cfg.data.ultrascripts.ai.configured);

  if (aiReady &amp;&amp; bd.us.has('ai', 'chat')) {
    // safe to offer the AI-enhanced path
  } else {
    // plain-script fallback path
  }
}

bd.us.commit();</pre>

            <ul class="space-y-1 text-[11px]">
              <li>&middot; Queue <code class="text-bd-green">sdk.config</code> once, then keep reusing the latest cached response.</li>
              <li>&middot; Branch on the actual player configuration instead of assuming modules are usable just because they exist in heartbeat.</li>
              <li>&middot; Keep your non-Ultrascripts path first-class. The enhanced path should feel like a bonus, not a rescue mission.</li>
            </ul>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPES ===================== -->
      <section id="guide-recipes" class="card">
        <button @click="toggleGuideSection('recipes')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Rocket class="w-5 h-5 text-bd-green" />
            Recipes
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('recipes') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('recipes')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-2">
              <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5 text-[12px]">
                <CheckCircle2 class="w-4 h-4" /> Progressive Enhancement
              </h4>
              <p>Use Scripture widgets when available; otherwise fall back to plain bracketed status text.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Context Modifier
(function () {
  var bd = state.bd || {};
  if (bd.sdk &amp;&amp; bd.sdk.hasModule('scripture')) {
    // Publish a widget instead of plain text
    var s = { v: 1, manifest: { widgets: [{ id: 'hp', type: 'bar', label: 'HP', max: 100 }] }, history: {} };
    s.history[(info &amp;&amp; info.actionCount) || 1] = { hp: state.hp || 100 };
    var card = storyCards.find(function (c) { return c.title === 'ultrascripts:state:scripture'; });
    if (card) card.value = JSON.stringify(s);
    else addStoryCard('ultrascripts:state:scripture', JSON.stringify(s));
  } else {
    text += '\n[HP: ' + (state.hp || 100) + '/100]';
  }
})();</pre>
            </div>

            <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5 text-[12px]">
                <RefreshCw class="w-4 h-4" /> Generic Ops Helper
              </h4>
              <p>One reusable function that any module call can flow through, with auto-acks and live-count-suffixed request ids.</p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-text-secondary overflow-x-auto leading-relaxed">// Library Script
state.bd = state.bd || {};
state.bd.activeRequests = state.bd.activeRequests || {};

state.bd.sendOpRequest = function (moduleId, opName, args) {
  var lc = (info &amp;&amp; info.actionCount) || 1;
  var reqId = moduleId + '-' + opName + '-t' + lc;

  var payload = {
    v: 1,
    requests: [{ id: reqId, module: moduleId, op: opName, args: args }],
    acks: Object.keys(state.bd.activeRequests)
  };

  var card = storyCards.find(function (c) { return c.title === 'ultrascripts:out'; });
  if (card) card.value = JSON.stringify(payload);
  else addStoryCard('ultrascripts:out', JSON.stringify(payload));

  state.bd.activeRequests[reqId] = true;
  return reqId;
};</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-pink" />
            Common Pitfalls
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Reading SDK before heartbeat fires</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> SDK call lands before <code>ultrascripts:heartbeat</code> exists.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Check for the heartbeat card first. If absent, treat Ultrascripts as not present and fall back gracefully.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Duplicate request ids per turn</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Two SDK calls in one modifier cycle clobber each other.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Suffix every request id with the live count (or a counter you increment yourself).</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Assuming a key is configured</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Code calls <code>ai.chat</code> before reading <code>sdk.config</code>.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Read <code>ultrascripts.ai.configured</code> from <code>sdk.config</code> and surface a friendly prompt if <code>false</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Hardcoding feature flag values</h4>
                <p class="text-bd-text-secondary"><strong>Issue:</strong> Code assumes <code>features.notes</code> is always true.</p>
                <p class="text-bd-text-muted"><strong>Fix:</strong> Treat every feature flag as user-controlled. Always branch on the actual value, never assume.</p>
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
  ChevronDown, ChevronUp, Terminal, Search, Code, Library, Rocket,
  CheckCircle2, RefreshCw, AlertTriangle, Zap, ArrowRight, ShieldCheck
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'overview', label: 'Overview' },
  { id: 'protocol', label: 'Compatibility Protocol' },
  { id: 'header-ref', label: 'Reference', isHeader: true },
  { id: 'ops', label: 'Operations' },
  { id: 'helper', label: 'Helper Library' },
  { id: 'header-use', label: 'Usage', isHeader: true },
  { id: 'bootstrap', label: 'Bootstrap Pattern' },
  { id: 'recipes', label: 'Recipes' },
  { id: 'pitfalls', label: 'Pitfalls' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(s => !s.isHeader).map(s => s.id)))
const toggleGuideSection = (id) => {
  if (expandedGuideSections.value.has(id)) expandedGuideSections.value.delete(id)
  else expandedGuideSections.value.add(id)
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}
const isGuideSectionExpanded = (id) => expandedGuideSections.value.has(id)
const scrollToGuideSection = (id) => {
  const el = document.getElementById(`guide-${id}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (!expandedGuideSections.value.has(id)) {
      expandedGuideSections.value.add(id)
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
