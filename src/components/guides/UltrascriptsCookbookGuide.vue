<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- TOC Sidebar -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider">Contents</h3>
          <div class="flex gap-1">
            <button @click="expandAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Expand all"><ChevronDown class="w-3 h-3" /></button>
            <button @click="collapseAllGuideSections" class="p-1 rounded hover:bg-bd-bg-tertiary text-bd-text-muted" title="Collapse all"><ChevronUp class="w-3 h-3" /></button>
          </div>
        </div>
        <template v-for="section in guideSections" :key="section.id">
          <div v-if="section.isHeader" class="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-bd-text-muted">{{ section.label }}</div>
          <button v-else @click="scrollToGuideSection(section.id)" class="w-full text-left px-3 py-2 rounded-lg text-xs transition-colors hover:bg-bd-bg-tertiary" :class="[isGuideSectionExpanded(section.id) ? 'text-bd-text-primary' : 'text-bd-text-muted']">{{ section.label }}</button>
        </template>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 space-y-4 min-w-0">

      <!-- ===================== ABOUT ===================== -->
      <section id="guide-about" class="card">
        <button @click="toggleGuideSection('about')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-bd-amber" />
            About These Recipes
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('about') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('about')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Every recipe below assumes you have already pasted the <strong>Ultrascripts SDK helper</strong> into your Library script.
              If you haven't yet, start there.
            </p>
            <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-amber/15 hover:bg-bd-amber/25 border border-bd-amber/30 text-bd-amber text-[11px] font-medium transition-colors">
              <Zap class="w-3.5 h-3.5" />
              Open Quick Start &rarr; SDK Helper
            </router-link>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">The universal recipe shape</h4>
              <pre class="font-mono text-[10px] text-bd-green leading-relaxed">bd.us.tick();                 // sync responses
... read latest results ...   // use last turn's data
... publish widgets ...       // optional
... queue new requests ...    // capability-checked
bd.us.commit();               // send the out card</pre>
              <p class="text-[11px] mt-1.5">
                Every recipe in this Cookbook is some variation of those five lines.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 1: HP/Mana HUD ===================== -->
      <section id="guide-r1" class="card">
        <button @click="toggleGuideSection('r1')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Heart class="w-5 h-5 text-bd-green" />
            Recipe 1: HP / Mana / Region HUD
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r1') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r1')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>The basic RPG HUD. Manifest declared once; one line per turn to publish a snapshot.</p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Library Script (after the SDK paste)</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.defineScripture({
  widgets: [
    { id: 'hp',    type: 'bar', label: 'Health', max: 100, color: '#22c55e' },
    { id: 'mana',  type: 'bar', label: 'Mana',   max: 50,  color: '#3b82f6' },
    { id: 'where', type: 'text',     label: 'Region' }
  ]
});</pre>
            </div>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();
bd.us.publishScripture({
  hp:    state.hp       !== undefined ? state.hp   : 100,
  mana:  state.mana     !== undefined ? state.mana : 50,
  where: state.location || 'Unknown'
});
bd.us.commit();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 2: Quest tracker with interactions ===================== -->
      <section id="guide-r2" class="card">
        <button @click="toggleGuideSection('r2')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ListTodo class="w-5 h-5 text-bd-amber" />
            Recipe 2: Interactive Quest Tracker
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r2') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r2')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Player can flip an objective toggle in the sidebar; events flow back through <code>ultrascripts:in:scripture</code>.</p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Library Script</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.defineScripture({
  widgets: [{ id: 'questComplete', type: 'toggle', label: 'Amber Relic Retrieved', value: false }]
});

// Helper: consume widget interaction events
bd.us.consumeScriptureEvents = function () {
  var events = bd.us.scriptureEvents();
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    if (e.widgetId === 'questComplete' &amp;&amp; e.action === 'change') {
      state.questComplete = !!e.value;
      bd.us.ackScripture(e.seq);
    }
  }
};</pre>
            </div>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">state.questComplete = state.questComplete || false;

bd.us.tick();
bd.us.consumeScriptureEvents();              // applies any sidebar clicks
bd.us.publishScripture({ questComplete: state.questComplete });
bd.us.commit();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 3: Time-of-day narration ===================== -->
      <section id="guide-r3" class="card">
        <button @click="toggleGuideSection('r3')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Clock class="w-5 h-5 text-bd-amber" />
            Recipe 3: Time-of-Day Narration
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r3') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r3')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Tints front-context based on the player's real local hour.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Context Modifier
bd.us.tick();

var clock = bd.us.latest('clock', 'now');
if (clock &amp;&amp; clock.status === 'ok') {
  var h = Number(String(clock.data.time || '00').slice(0, 2));
  if      (h >= 20 || h < 5) text += '\n[Ambient: deep night. Shadows crowd the edges.]';
  else if (h >= 17)          text += '\n[Ambient: amber dusk. Long shadows.]';
  else if (h < 9)            text += '\n[Ambient: thin dawn light. Air cool.]';
}

if (bd.us.has('clock', 'now')) bd.us.call('clock', 'now');
bd.us.commit();</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 4: Weather-reactive combat ===================== -->
      <section id="guide-r4" class="card">
        <button @click="toggleGuideSection('r4')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <CloudSun class="w-5 h-5 text-bd-cyan" />
            Recipe 4: Weather-Reactive Combat
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r4') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r4')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Reads real local weather (WMO codes) and applies combat modifiers. Geolocation is auto-resolved when cached.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Context Modifier
bd.us.tick();

var wx = bd.us.latest('weather', 'current');
if (wx &amp;&amp; wx.status === 'ok') {
  var c = wx.data.current &amp;&amp; wx.data.current.weatherCode;
  if (c >= 61 &amp;&amp; c <= 65) {
    state.combatPenalty = -2;
    text += '\n[Combat: rain dampens the ground. Ranged attacks -2.]';
  } else if (c === 95 || c >= 96) {
    state.combatPenalty = -4;
    text += '\n[Combat: thunderstorm overhead. Spell costs doubled.]';
  } else {
    state.combatPenalty = 0;
  }
}

// Re-query every ~10 turns so the weather doesn't go stale
var lc = bd.us.liveCount();
if (bd.us.has('weather', 'current') &amp;&amp; lc % 10 === 0) {
  bd.us.call('weather', 'current', { place: state.weatherPlace || 'Chicago', units: 'metric' });
}
bd.us.commit();</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 5: AI Co-GM ===================== -->
      <section id="guide-r5" class="card">
        <button @click="toggleGuideSection('r5')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <BrainCircuit class="w-5 h-5 text-bd-purple" />
            Recipe 5: AI Co-GM Ambient Narrator
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r5') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r5')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>A free secondary model writes one atmospheric sentence each turn. Skips gracefully when the player hasn't configured an API key.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Context Modifier
bd.us.tick();

// Inject previous turn's Co-GM line as front-context
var coGm = bd.us.latest('ai', 'chat');
if (coGm &amp;&amp; coGm.status === 'ok' &amp;&amp; coGm.data.content) {
  text = '[Ambient: ' + coGm.data.content.trim() + ']\n' + text;
}

// Capability + configured-key check
var cfg = bd.us.latest('sdk', 'config');
var aiReady = bd.us.has('ai', 'chat') &amp;&amp; cfg &amp;&amp; cfg.status === 'ok' &amp;&amp;
              cfg.data &amp;&amp; cfg.data.ultrascripts &amp;&amp; cfg.data.ultrascripts.ai &amp;&amp;
              cfg.data.ultrascripts.ai.configured;

if (aiReady) {
  bd.us.call('ai', 'chat', {
    model: 'google/gemini-2.0-flash-exp:free',
    temperature: 0.7,
    maxTokens: 60,
    messages: [
      { role: 'system', content: 'Output ONE atmospheric sentence describing ambient sensory detail. No dialogue. No new plot.' },
      { role: 'user',   content: 'Current scene:\n' + text }
    ]
  });
}

// Re-poll config every ~20 turns in case the player just configured AI mid-session
if (bd.us.has('sdk', 'config') &amp;&amp; bd.us.liveCount() % 20 === 0) {
  bd.us.call('sdk', 'config');
}

bd.us.commit();</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 6: AI structured extraction ===================== -->
      <section id="guide-r6" class="card">
        <button @click="toggleGuideSection('r6')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Wand2 class="w-5 h-5 text-bd-blue" />
            Recipe 6: AI Structured Scene Extraction &rarr; Widgets
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r6') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r6')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>The AI extracts a JSON scene summary; the result drives Scripture badges and a mood meter on the next turn.</p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Library Script</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.defineScripture({
  widgets: [
    { id: 'location', type: 'text',       label: 'Location' },
    { id: 'mood',     type: 'taggroup', label: 'Mood' },
    { id: 'npcs',     type: 'taggroup', label: 'Present NPCs' }
  ]
});</pre>
            </div>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Output Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();

// Consume the previous extraction (if any) and update widgets
var extract = bd.us.latest('ai', 'chat');
if (extract &amp;&amp; extract.status === 'ok' &amp;&amp; extract.data.content) {
  try {
    var scene = JSON.parse(extract.data.content);
    var moodColor = { tense: '#ef4444', calm: '#22c55e', hopeful: '#3b82f6', grim: '#a855f7' };
    bd.us.publishScripture({
      location: scene.location || 'Unknown',
      mood:     [{ text: scene.mood || 'unknown', color: moodColor[scene.mood] || '#71717a' }],
      npcs:     (scene.presentNpcs || []).map(function (n) { return { text: n, color: '#3b82f6' }; })
    });
  } catch (e) { /* model returned non-JSON; skip this turn */ }
}

// Queue the next extraction
if (bd.us.has('ai', 'chat')) {
  bd.us.call('ai', 'chat', {
    model: 'google/gemini-2.0-flash-exp:free',
    temperature: 0.1,
    maxTokens: 200,
    responseFormat: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'Extract scene JSON: { "location": string, "mood": "tense"|"calm"|"hopeful"|"grim", "presentNpcs": string[] }. JSON only.' },
      { role: 'user',   content: text }
    ]
  });
}

bd.us.commit();</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 7: WebFetch external API ===================== -->
      <section id="guide-r7" class="card">
        <button @click="toggleGuideSection('r7')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Globe class="w-5 h-5 text-bd-blue" />
            Recipe 7: External API Lookup
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r7') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r7')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Once-per-session fetch of external lore data, cached in <code>state</code>.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Context Modifier
bd.us.tick();

// Cache the result the first time it arrives
if (!state.loreCache) {
  var fetched = bd.us.latest('webfetch', 'fetch');
  if (fetched &amp;&amp; fetched.status === 'ok' &amp;&amp; fetched.data.status >= 200 &amp;&amp; fetched.data.status < 300) {
    state.loreCache = fetched.data.body;
  }
}

// Issue exactly one fetch (only if not yet cached)
if (!state.loreCache &amp;&amp; !state.loreRequested &amp;&amp; bd.us.has('webfetch', 'fetch')) {
  bd.us.call('webfetch', 'fetch', {
    url: 'https://api.example.com/adventure/lore',
    method: 'GET',
    headers: { Accept: 'application/json' },
    maxBodyBytes: 50000
  });
  state.loreRequested = true;
}

bd.us.commit();</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== RECIPE 8: Platform-adaptive layout ===================== -->
      <section id="guide-r8" class="card">
        <button @click="toggleGuideSection('r8')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Recipe 8: Platform-Adaptive Widget Layout
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('r8') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('r8')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Use a compact manifest on mobile, a rich one on desktop. Decided once, when the first <code>system.info</code> response lands.</p>
            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Context Modifier
bd.us.tick();

// First-time: decide the manifest based on platform
if (!state.scriptureReady) {
  var sys = bd.us.latest('system', 'info');
  if (sys &amp;&amp; sys.status === 'ok') {
    var mobile = sys.data.deviceClass === 'mobile';
    bd.us.defineScripture({
      widgets: mobile
        ? [{ id: 'hp', type: 'bar', label: 'HP', max: 100 }]
        : [
            { id: 'hp',     type: 'bar',  label: 'Health', max: 100 },
            { id: 'mana',   type: 'bar',  label: 'Mana',   max: 50  },
            { id: 'weapon', type: 'text',      label: 'Weapon' },
            { id: 'tags',   type: 'taggroup', label: 'Status' }
          ]
    });
    state.scriptureReady = true;
  } else if (bd.us.has('system', 'info')) {
    bd.us.call('system', 'info');                          // ask once
  }
}

// Publish whatever manifest we ended up with
if (state.scriptureReady) {
  bd.us.publishScripture({
    hp:     state.hp || 100,
    mana:   state.mana || 50,
    weapon: state.weapon || 'Iron Sword',
    tags:   state.statusTags || []
  });
}

bd.us.commit();</pre>
          </div>
        </Transition>
      </section>

      <!-- ===================== TROUBLESHOOTING ===================== -->
      <section id="guide-debug" class="card">
        <button @click="toggleGuideSection('debug')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Search class="w-5 h-5 text-bd-pink" />
            Debugging Checklist
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('debug') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('debug')" class="mt-4 space-y-3">
            <p class="text-xs text-bd-text-secondary">When something isn't working, walk this list in order.</p>
            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"Nothing happens"</h4>
                <p class="text-bd-text-muted">Does <code>bd.us.has('scripture')</code> return <code>true</code>? If not, the heartbeat card hasn't appeared &mdash; the player needs the BetterDungeon extension.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"My request never gets a response"</h4>
                <p class="text-bd-text-muted">Did you call <code>bd.us.commit()</code> at the end of the modifier? Without commit nothing is written to the out card.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"<code>bd.us.latest()</code> returns null on turn 1"</h4>
                <p class="text-bd-text-muted">Correct &mdash; responses always land on the <em>next</em> turn. Guard every <code>latest()</code> call with <code>if (result &amp;&amp; result.status === 'ok')</code>.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"Widget stays frozen"</h4>
                <p class="text-bd-text-muted">Did you call <code>bd.us.defineScripture(...)</code> once (in the Library)? Did the current modifier call <code>bd.us.publishScripture(...)</code>?</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"AI call returns err immediately"</h4>
                <p class="text-bd-text-muted">Read <code>bd.us.latest('sdk', 'config').data.ultrascripts.ai.configured</code>. If <code>false</code>, tell the player to configure OpenRouter in the extension popup.</p>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">"Stale data after undo"</h4>
                <p class="text-bd-text-muted">Filter by <code>completedLiveCount</code> if you care about freshness. <code>bd.us.latest()</code> already returns the newest-by-live-count response; if even that's stale for you, compare against <code>bd.us.liveCount()</code>.</p>
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
  ChevronDown, ChevronUp, BookOpen, Zap, Heart, ListTodo, Clock, CloudSun,
  BrainCircuit, Wand2, Globe, Cpu, Search
} from 'lucide-vue-next'

// Sections grouped by "what does this recipe do for me".
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'about', label: 'About These Recipes' },
  { id: 'header-ui', label: 'UI & Widgets', isHeader: true },
  { id: 'r1', label: '1. HP/Mana HUD' },
  { id: 'r2', label: '2. Quest Tracker' },
  { id: 'header-context', label: 'Real-World Context', isHeader: true },
  { id: 'r3', label: '3. Time of Day' },
  { id: 'r4', label: '4. Weather Combat' },
  { id: 'header-ai', label: 'AI Orchestration', isHeader: true },
  { id: 'r5', label: '5. AI Co-GM' },
  { id: 'r6', label: '6. AI Extraction' },
  { id: 'header-data', label: 'External Data & Platform', isHeader: true },
  { id: 'r7', label: '7. External API' },
  { id: 'r8', label: '8. Adaptive Layout' },
  { id: 'header-debug', label: 'Debug', isHeader: true },
  { id: 'debug', label: 'Debugging Checklist' }
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
