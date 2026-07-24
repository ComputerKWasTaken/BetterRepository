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

      <!-- ===================== ELEVATOR PITCH ===================== -->
      <section id="guide-pitch" class="card">
        <button @click="toggleGuideSection('pitch')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Zap class="w-5 h-5 text-bd-amber" />
            Ultrascripts in 30 Seconds
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitch') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitch')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              You write a regular AI Dungeon script. You also want it to render an HP bar in the sidebar, fetch live weather, ask a second AI model for help,
              or react to the player's real-world time. <strong>Ultrascripts is how.</strong>
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <div class="flex items-center gap-2 mb-1">
                  <Package class="w-4 h-4 text-bd-green" />
                  <strong class="text-bd-green text-[12px]">One paste</strong>
                </div>
                <p class="text-[11px]">Drop the SDK helper below into your <strong>Library</strong> script. That's the only setup.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
                <div class="flex items-center gap-2 mb-1">
                  <Wand2 class="w-4 h-4 text-bd-blue" />
                  <strong class="text-bd-blue text-[12px]">Three calls</strong>
                </div>
                <p class="text-[11px]"><code>bd.us.tick()</code> &middot; <code>bd.us.call()</code> &middot; <code>bd.us.commit()</code>. That's the loop.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30">
                <div class="flex items-center gap-2 mb-1">
                  <Rocket class="w-4 h-4 text-bd-purple" />
                  <strong class="text-bd-purple text-[12px]">Real power</strong>
                </div>
                <p class="text-[11px]">Widgets, web, AI, time, weather, network, device hints &mdash; all from your script.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">Heads-up:</strong> Ultrascripts requires the BetterDungeon browser extension. Players who don't have it
                won't see widgets or get module responses &mdash; but your script will still run normally. Always check capability with
                <code class="text-bd-green">bd.us.has()</code> before relying on a feature.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE MENTAL MODEL ===================== -->
      <section id="guide-model" class="card">
        <button @click="toggleGuideSection('model')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Lightbulb class="w-5 h-5 text-bd-blue" />
            The Mental Model (1 minute)
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('model') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('model')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>Three ideas. That's all you need to be productive.</p>

            <div class="space-y-2">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary text-[12px] block mb-1">1. You communicate through reserved Story Cards.</strong>
                <p class="text-[11px]">
                  Your script writes to <code class="text-bd-green">ultrascripts:out</code>. The extension writes back to
                  <code class="text-bd-green">ultrascripts:in:&lt;module&gt;</code>. The SDK helper hides all of that.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary text-[12px] block mb-1">2. Requests take one turn to complete.</strong>
                <p class="text-[11px]">
                  You <em>queue</em> a request this turn with <code>bd.us.call(...)</code> and <em>read</em> the result on the next turn with
                  <code>bd.us.latest(...)</code>. The SDK handles request IDs and acks for you; for history-sensitive logic, still sanity-check
                  <code>completedLiveCount</code> before you apply an older response to a newer turn.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <strong class="text-bd-text-primary text-[12px] block mb-1">3. Widgets are state, not commands.</strong>
                <p class="text-[11px]">
                  For dynamic UI (HP bars, quest lists, etc.) you declare a <em>manifest</em> once and push fresh <em>values</em> each turn with
                  <code>bd.us.publishWidget(...)</code>. Widget handles rendering, undo, redo &mdash; all automatic.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREATOR REALITY CHECK ===================== -->
      <section id="guide-creators" class="card">
        <button @click="toggleGuideSection('creators')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-bd-cyan" />
            Creator Reality Check
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('creators') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('creators')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Decide which kind of scenario you are shipping <strong>before</strong> you build the script contract. Ultrascripts supports both of these author
              postures cleanly, but they should be documented differently and coded differently.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">1. Enhanced with Ultrascripts</h4>
                <p class="text-[11px]">
                  The core scenario works without BetterDungeon. Ultrascripts adds better UI, extra data, or richer automation, but the scenario remains
                  fully playable in plain AI Dungeon.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">2. Requires Ultrascripts</h4>
                <p class="text-[11px]">
                  The core mechanic depends on Ultrascripts modules. If the runtime is missing, the script should detect that immediately, stop pretending
                  everything is fine, and tell the player clearly that BetterDungeon is required.
                </p>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">No heartbeat</h4>
                <p class="text-[11px]">
                  Treat this as <strong>no Ultrascripts runtime</strong>. From your script's perspective, it does not matter whether the cause is
                  "no BetterDungeon", "Ultrascripts disabled", or "runtime not live yet". Enhanced scripts fall back; required scripts surface a hard requirement.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Heartbeat present, module absent</h4>
                <p class="text-[11px]">
                  Ultrascripts exists, but that specific feature is unavailable. The player may have the module disabled, or their current platform may
                  not surface it. Enhanced scripts skip that feature; required scripts should explain which module is needed.
                </p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Module present, setup incomplete</h4>
                <p class="text-[11px]">
                  The player still controls permissions and configuration. Read <code>sdk.config</code>, permission ops, or module-specific status before
                  assuming AI or WebFetch is ready.
                </p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <p class="text-[11px]">
                <strong class="text-bd-cyan">The practical rule:</strong> Enhanced scripts gate Ultrascripts writes with
                <code class="text-bd-green">bd.us.available()</code> or <code class="text-bd-green">bd.us.has(...)</code>. Required scripts gate their
                <em>entire core flow</em> the same way, then show a clear requirement message instead of silently limping along.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WHERE TO PASTE ===================== -->
      <section id="guide-paste-map" class="card">
        <button @click="toggleGuideSection('paste-map')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Package class="w-5 h-5 text-bd-cyan" />
            What Goes Where
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('paste-map') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('paste-map')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              AI Dungeon gives you four script tabs. Ultrascripts does not change that model; it gives those scripts a bridge to BetterDungeon. Most
              scenarios only need Library + Context.
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">AI Dungeon tab</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Put this there</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Why</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2 font-semibold text-bd-green">Library</td>
                    <td class="py-2 px-2">The SDK helper, shared helpers, and Widget manifests.</td>
                    <td class="py-2 px-2">Library is shared by the other hooks, so <code>bd.us</code> is available everywhere.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2 font-semibold text-bd-blue">Context</td>
                    <td class="py-2 px-2"><code>tick</code>, read prior results, publish widgets, queue module calls, <code>commit</code>.</td>
                    <td class="py-2 px-2">Most Ultrascripts features modify the model context or sidebar state before generation.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2 font-semibold text-bd-amber">Input</td>
                    <td class="py-2 px-2">Optional command parsing before the model sees player input.</td>
                    <td class="py-2 px-2">Use sparingly. Empty input or stop returns can error in AI Dungeon.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2 font-semibold text-bd-purple">Output</td>
                    <td class="py-2 px-2">Optional post-processing after the model replies.</td>
                    <td class="py-2 px-2">Useful for logging or state cleanup, but most module requests belong in Context.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">Modifier rule:</strong> place Quick Start modifier code inside AI Dungeon's existing
                <code class="text-bd-green">modifier(text)</code> wrapper. Keep <code>modifier(text)</code> as the final editor line and let the wrapper
                return <code>{ text }</code>.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== THE SDK ===================== -->
      <section id="guide-sdk" class="card">
        <button @click="toggleGuideSection('sdk')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Package class="w-5 h-5 text-bd-green" />
            The Ultrascripts SDK Helper (paste this into your Library)
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('sdk') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('sdk')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Copy this block into your scenario's <strong>Library</strong> script. It handles every piece of Ultrascripts boilerplate &mdash;
              card I/O, request envelopes, ack management, response filtering, the Widget manifest. Then every modifier in your scenario can use
              <code>bd.us</code> cleanly.
            </p>

            <div class="flex items-center gap-2 flex-wrap">
              <button
                @click="copySdk"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bd-green/15 hover:bg-bd-green/25 border border-bd-green/30 text-bd-green text-[11px] font-medium transition-colors"
              >
                <Copy class="w-3.5 h-3.5" />
                {{ copyState === 'copied' ? 'Copied!' : 'Copy SDK helper' }}
              </button>
              <span class="text-[10px] text-bd-text-muted">~120 lines &middot; zero dependencies &middot; v1 protocol</span>
            </div>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{{ sdkCode }}</pre>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5">What you get</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-[11px] border-collapse">
                  <thead>
                    <tr class="border-b border-bd-border-subtle">
                      <th class="text-left py-1.5 px-2 font-semibold text-bd-text-primary">Call</th>
                      <th class="text-left py-1.5 px-2 font-semibold text-bd-text-primary">What it does</th>
                    </tr>
                  </thead>
                  <tbody class="text-bd-text-secondary">
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.tick()</code></td>
                      <td class="py-1.5 px-2">Reads all pending response cards into memory. Auto-queues acks. Call once at the top of each modifier.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.has(mod, op?)</code></td>
                      <td class="py-1.5 px-2">Returns <code>true</code> if the module (and optional op) is mounted in the current heartbeat.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.call(mod, op, args)</code></td>
                      <td class="py-1.5 px-2">Queues an op call for this turn. Auto-generates a unique request id.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.latest(mod, op?)</code></td>
                      <td class="py-1.5 px-2">Returns the most recent completed response for that module/op, or <code>null</code>.</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.defineWidget(manifest)</code></td>
                      <td class="py-1.5 px-2">Declare your widget manifest once (usually at the top of the Library script).</td>
                    </tr>
                    <tr class="border-b border-bd-border-subtle/50">
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.publishWidget(values)</code></td>
                      <td class="py-1.5 px-2">Pushes a new history snapshot for the current turn.</td>
                    </tr>
                    <tr>
                      <td class="py-1.5 px-2"><code class="text-bd-green">bd.us.commit()</code></td>
                      <td class="py-1.5 px-2">Writes the queued requests and acks to the out card. Call once at the bottom of each modifier.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== FALLBACK PATTERN ===================== -->
      <section id="guide-fallbacks" class="card">
        <button @click="toggleGuideSection('fallbacks')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-bd-amber" />
            Enhanced Script Fallback Pattern
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('fallbacks') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('fallbacks')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              This is the creator pattern worth memorizing. It preserves the nice Ultrascripts path when available and degrades cleanly when it is not.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();

var hp = state.hp !== undefined ? state.hp : 100;
var usReady = bd.us.available();

if (usReady &amp;&amp; bd.us.has('widget')) {
  bd.us.defineWidget({
    widgets: [
      { id: 'hp', type: 'bar', label: 'HP', max: 100, color: '#22c55e' }
    ]
  });
  bd.us.publishWidget({ hp: hp });
} else {
  text += '\n[HP: ' + hp + '/100]';
}

if (usReady &amp;&amp; bd.us.has('clock', 'now')) {
  bd.us.call('clock', 'now');
}

bd.us.commit();</pre>

            <ul class="space-y-1 text-[11px]">
              <li>&middot; <code class="text-bd-green">bd.us.tick()</code> is always safe. No heartbeat just means no replies get synced.</li>
              <li>&middot; Gate <code class="text-bd-green">publishWidget()</code> if you want non-BetterDungeon players to avoid reserved-card clutter.</li>
              <li>&middot; Gate <code class="text-bd-green">call()</code> so you only write <code class="text-bd-green">ultrascripts:out</code> when a real module is mounted.</li>
              <li>&middot; <code class="text-bd-green">commit()</code> is harmless when nothing was queued.</li>
            </ul>
          </div>
        </Transition>
      </section>

      <!-- ===================== REQUIRED PATTERN ===================== -->
      <section id="guide-required" class="card">
        <button @click="toggleGuideSection('required')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Package class="w-5 h-5 text-bd-purple" />
            Required Script Guard Pattern
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('required') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('required')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              If Ultrascripts is the engine of the scenario, say so plainly and guard the core path immediately. Do not fake a broken fallback for a
              script whose whole point depends on an unavailable module.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();

if (!bd.us.available() || !bd.us.has('ai', 'status') || !bd.us.has('ai', 'query')) {
  text = '[This scenario requires BetterDungeon with Ultrascripts enabled. Install BetterDungeon or switch to a non-Ultrascripts version.]\n' + text;
} else {
  var status = bd.us.latest('ai', 'status');

  if (!status &amp;&amp; bd.us.has('ai', 'status')) {
    bd.us.call('ai', 'status');
    text = '[Checking BetterDungeon AI module status. Try one more action after the status reply arrives.]\n' + text;
  } else {
    var aiUnavailable = status
      &amp;&amp; status.status === 'ok'
      &amp;&amp; status.data
      &amp;&amp; status.data.reason === 'ai_backend_not_configured';

    if (aiUnavailable) {
      text = '[BetterDungeon AI needs a Gemini API key in the BetterDungeon popup before this scenario path can run.]\n' + text;
    } else {
      // Core Ultrascripts-dependent logic starts here.
      text = '[BetterDungeon AI status is present. Queue ai.query work and read the result on a later turn.]\n' + text;
    }
  }
}

bd.us.commit();</pre>

            <ul class="space-y-1 text-[11px]">
              <li>&middot; Put the requirement in the scenario description and opening notes, not just in code.</li>
              <li>&middot; Distinguish <strong>runtime missing</strong> from <strong>player setup incomplete</strong> so the message is actionable.</li>
              <li>&middot; If you maintain both versions, label them clearly: one "Enhanced with Ultrascripts", one "Requires Ultrascripts".</li>
            </ul>
          </div>
        </Transition>
      </section>

      <!-- ===================== STEP 1 ===================== -->
      <section id="guide-step1" class="card">
        <button @click="toggleGuideSection('step1')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center text-[12px]">1</span>
            Render an HP bar
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('step1') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('step1')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The smallest useful Ultrascripts integration: a single HP bar that follows <code>state.hp</code>. Three lines of meaningful code.
            </p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Library Script (after pasting the SDK)</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Declare your widgets ONCE
bd.us.defineWidget({
  widgets: [
    { id: 'hp', type: 'bar', label: 'Health', max: 100, color: '#22c55e' }
  ]
});</pre>
            </div>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier (runs every turn)</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();
bd.us.publishWidget({ hp: state.hp !== undefined ? state.hp : 100 });
bd.us.commit();</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <p class="text-[11px]">
                <strong class="text-bd-green">That's it.</strong> The bar appears in the BetterDungeon sidebar, animates as <code>state.hp</code> changes,
                and rewinds correctly on undo/redo &mdash; you wrote zero of that logic.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== STEP 2 ===================== -->
      <section id="guide-step2" class="card">
        <button @click="toggleGuideSection('step2')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center text-[12px]">2</span>
            Call a module (real-world time)
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('step2') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('step2')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Now we ask the Clock module for the current time and tint the narration based on the player's real hour of day.
              The pattern is universal: <strong>read the previous turn's result, queue this turn's request, commit</strong>.
            </p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();

// Use last turn's result. For undo-sensitive logic, also compare completedLiveCount.
var last = bd.us.latest('clock', 'now');
if (last &amp;&amp; last.status === 'ok') {
  var hour = Number(String(last.data.time || '00').slice(0, 2));
  if (hour >= 20 || hour < 5) {
    text += '\n[Ambient: deep night. Shadows crowd the edges.]';
  } else if (hour >= 17) {
    text += '\n[Ambient: amber dusk. Long shadows.]';
  }
}

// Queue this turn's clock request (capability-checked)
if (bd.us.has('clock', 'now')) {
  bd.us.call('clock', 'now');
}

bd.us.commit();</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">How the timing works</h4>
              <pre class="font-mono text-[10px] text-bd-text-muted leading-relaxed">Turn N&nbsp; &nbsp;:  bd.us.call('clock','now')  &rarr; queued, written on commit
                Extension processes between turns
Turn N+1 :  bd.us.latest('clock','now') &rarr; previous turn's reply
                ack auto-sent; new request queued
Turn N+2 :  ...continues every turn</pre>
              <p class="text-[11px] mt-1">First turn there's no previous result &mdash; the <code>if (last &amp;&amp; ...)</code> guard makes that safe.</p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== STEP 3 ===================== -->
      <section id="guide-step3" class="card">
        <button @click="toggleGuideSection('step3')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-bd-purple/20 text-bd-purple font-bold flex items-center justify-center text-[12px]">3</span>
            Check AI query status
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('step3') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('step3')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The AI module exposes <code>status</code> and async <code>query</code>. When the player configures the AI backend in BetterDungeon, scripts can request text, schema-backed JSON, and optional thinking levels.
            </p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">bd.us.tick();

// Read the AI backend status when available.
var aiStatus = bd.us.latest('ai', 'status');
var aiBackendMissing = aiStatus &amp;&amp; aiStatus.status === 'ok'
  &amp;&amp; aiStatus.data
  &amp;&amp; aiStatus.data.reason === 'ai_backend_not_configured';
if (aiBackendMissing) {
  text += '\n[BetterDungeon AI needs a Gemini API key in the BetterDungeon popup.]';
}
if (bd.us.has('ai', 'status') &amp;&amp; !aiStatus) bd.us.call('ai', 'status');

// Queue a future query only when status eventually reports ready.
if (aiStatus &amp;&amp; aiStatus.status === 'ok' &amp;&amp; aiStatus.data.ready &amp;&amp; bd.us.has('ai', 'query')) {
  bd.us.call('ai', 'query', {
    prompt: 'Return one short hidden world-state note about the current scene.',
    thinking: 'minimal',
    output: { type: 'text' }
  });
}

bd.us.commit();</pre>
            </div>

            <p>
              This pattern queues <code>ai.status</code> automatically until a response is cached, then only queues <code>ai.query</code> when the module reports that a backend is ready.
            </p>
          </div>
        </Transition>
      </section>

      <!-- ===================== COMPLETE EXAMPLE ===================== -->
      <section id="guide-full" class="card">
        <button @click="toggleGuideSection('full')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <CheckCircle2 class="w-5 h-5 text-bd-green" />
            Complete Minimal Scenario
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('full') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('full')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The working pieces stitched together &mdash; HP bar, real-world time tinting, and AI module status polling. Query calls stay gated until the backend reports ready.
            </p>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Library Script &mdash; PASTE THE SDK HELPER HERE, then add:</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// Declare widgets once
bd.us.defineWidget({
  widgets: [
    { id: 'hp',    type: 'bar',      label: 'Health', max: 100, color: '#22c55e' },
    { id: 'where', type: 'text',     label: 'Region' }
  ]
});</pre>
            </div>

            <div>
              <div class="font-mono text-[10px] text-bd-blue font-bold mb-1">Context Modifier</div>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// 1. Sync the SDK with the latest card state.
bd.us.tick();

// 2. Use the previous turn's results.
var clockResult = bd.us.latest('clock', 'now');
if (clockResult &amp;&amp; clockResult.status === 'ok') {
  var hour = Number(String(clockResult.data.time || '00').slice(0, 2));
  if (hour >= 20 || hour < 5) text += '\n[Ambient: deep night.]';
}

// 3. Publish widget snapshot when Widget is mounted.
if (bd.us.has('widget')) {
  bd.us.publishWidget({
    hp:    state.hp       !== undefined ? state.hp : 100,
    where: state.location || 'Unknown'
  });
}

// 4. Queue this turn's requests.
if (bd.us.has('clock', 'now')) bd.us.call('clock', 'now');

var aiStatus = bd.us.latest('ai', 'status');
if (bd.us.has('ai', 'status') &amp;&amp; !aiStatus) bd.us.call('ai', 'status');

// 5. Send everything in one envelope.
bd.us.commit();</pre>
            </div>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <p class="text-[11px]">
                <strong class="text-bd-green">That's a complete scenario.</strong> Widgets and real-world time grounding &mdash; all in
                ~25 lines of meaningful code. Every module beyond these three follows the exact same pattern: <code>has</code>, <code>call</code>,
                <code>latest</code>, <code>commit</code>.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== NEXT ===================== -->
      <section id="guide-next" class="card">
        <button @click="toggleGuideSection('next')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowRight class="w-5 h-5 text-bd-blue" />
            Where to Go Next
          </h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('next') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('next')" class="mt-4 space-y-3 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <router-link to="/ultrascripts?tab=cookbook" class="block p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 hover:border-bd-green/50 transition-colors group">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1 flex items-center gap-1.5">
                  <BookOpen class="w-4 h-4" /> Cookbook
                </h4>
                <p class="text-[11px] text-bd-text-secondary">Pattern guidance for common flows: quest tracker, weather combat, AI extraction, inventory grid, and more.</p>
              </router-link>
              <router-link to="/ultrascripts?tab=widget" class="block p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 hover:border-bd-blue/50 transition-colors group">
                <h4 class="font-semibold text-bd-blue text-[12px] mb-1 flex items-center gap-1.5">
                  <LayoutDashboard class="w-4 h-4" /> Widget deep-dive
                </h4>
                <p class="text-[11px] text-bd-text-secondary">Every widget type, the manifest+history contract, interaction events, and responsive display behavior.</p>
              </router-link>
              <router-link to="/ultrascripts?tab=ai" class="block p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 hover:border-bd-purple/50 transition-colors group">
                <h4 class="font-semibold text-bd-purple text-[12px] mb-1 flex items-center gap-1.5">
                  <BrainCircuit class="w-4 h-4" /> AI deep-dive
                </h4>
                <p class="text-[11px] text-bd-text-secondary">Async status/query contract, text mode, schema-backed JSON, and thinking levels.</p>
              </router-link>
              <router-link to="/ultrascripts?tab=architecture" class="block p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 hover:border-bd-cyan/50 transition-colors group">
                <h4 class="font-semibold text-bd-cyan text-[12px] mb-1 flex items-center gap-1.5">
                  <Network class="w-4 h-4" /> Architecture
                </h4>
                <p class="text-[11px] text-bd-text-secondary">For when you want to know exactly what the SDK is doing under the hood &mdash; transport, core, wire envelope.</p>
              </router-link>
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
  ChevronDown, ChevronUp, Zap, Lightbulb, Package, Wand2, Rocket,
  Copy, CheckCircle2, ArrowRight, BookOpen, LayoutDashboard, BrainCircuit, Network,
  ShieldCheck, AlertTriangle
} from 'lucide-vue-next'

// Sections ordered as a paved path: pitch -> model -> SDK -> step 1/2/3 -> full -> next.
const guideSections = [
  { id: 'header-intro', label: 'Introduction', isHeader: true },
  { id: 'pitch', label: '30-Second Pitch' },
  { id: 'model', label: 'Mental Model' },
  { id: 'creators', label: 'Creator Reality Check' },
  { id: 'header-paste', label: 'Get the SDK', isHeader: true },
  { id: 'paste-map', label: 'What Goes Where' },
  { id: 'sdk', label: 'The SDK Helper' },
  { id: 'fallbacks', label: 'Enhanced Fallback Pattern' },
  { id: 'required', label: 'Required Script Guard' },
  { id: 'header-build', label: 'Build It', isHeader: true },
  { id: 'step1', label: '1. HP Bar' },
  { id: 'step2', label: '2. Call a Module' },
  { id: 'step3', label: '3. Ask an AI' },
  { id: 'full', label: 'Complete Scenario' },
  { id: 'header-more', label: 'More', isHeader: true },
  { id: 'next', label: 'Where to Go Next' }
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

// The canonical Ultrascripts SDK helper. This is the single most important
// artifact in the public docs: paste it into the Library script and bd.us is
// ready to use across every modifier in the scenario.
const sdkCode = `// ============================================================
// BetterDungeon Ultrascripts SDK helper (v1 protocol)
// Drop this entire block into your scenario's Library script.
// Then in every modifier:  bd.us.tick();  ...your code...  bd.us.commit();
// ============================================================

globalThis.bd = globalThis.bd || {};
var bd = globalThis.bd;
bd.us = bd.us || {};

// --- internal state (kept across turns via 'state') ---
bd.us._pendingRequests = bd.us._pendingRequests || [];
bd.us._pendingAcks     = bd.us._pendingAcks     || [];
bd.us._results         = bd.us._results         || {};   // { moduleId: { reqId: response } }
bd.us._reqCounter      = bd.us._reqCounter      || 0;

// --- card I/O ---
bd.us._cardMatches = function (card, title) {
  if (!card) return false;
  if (card.title === title || card.key === title || card.keys === title) return true;
  if (Array.isArray(card.keys)) return card.keys.indexOf(title) !== -1;
  return false;
};
bd.us._findCard = function (title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (bd.us._cardMatches(cards[i], title)) return cards[i];
  }
  return null;
};
bd.us._findCardIndex = function (title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  for (var i = 0; i < cards.length; i++) {
    if (bd.us._cardMatches(cards[i], title)) return i;
  }
  return -1;
};
bd.us._cardText = function (card) {
  if (!card) return '';
  if (card.value !== undefined && card.value !== null) return card.value;
  if (card.entry !== undefined && card.entry !== null) return card.entry;
  if (card.description !== undefined && card.description !== null) return card.description;
  return '';
};
bd.us._upsertCard = function (title, value) {
  var index = bd.us._findCardIndex(title);
  if (index >= 0) {
    var c = storyCards[index];
    if (typeof updateStoryCard === 'function') {
      updateStoryCard(index, c.keys || c.key || c.title || title, value, c.type || 'Ultrascripts');
    } else {
      log('Ultrascripts SDK: updateStoryCard is unavailable; cannot update ' + title);
    }
  } else {
    if (typeof addStoryCard === 'function') {
      addStoryCard(title, value, 'Ultrascripts');
    } else {
      log('Ultrascripts SDK: addStoryCard is unavailable; cannot create ' + title);
    }
  }
};
bd.us._parseCard = function (title) {
  var c = bd.us._findCard(title);
  if (!c) return null;
  try { return JSON.parse(bd.us._cardText(c) || '{}'); } catch (e) { return null; }
};
bd.us._parseCards = function (title) {
  var cards = Array.isArray(storyCards) ? storyCards : [];
  var parsed = [];
  for (var i = 0; i < cards.length; i++) {
    var c = cards[i];
    if (!bd.us._cardMatches(c, title)) continue;
    try { parsed.push(JSON.parse(bd.us._cardText(c) || '{}')); } catch (e) {}
  }
  return parsed;
};

// --- live count (current action) ---
bd.us.liveCount = function () { return (info && info.actionCount) || 0; };

// --- heartbeat-based capability check ---
bd.us._heartbeatScore = function (hb) {
  if (!hb || !hb.ultrascripts || hb.ultrascripts.protocol !== 1) return -1;
  if (hb.ultrascripts.client !== 'BetterDungeon' || hb.ultrascripts.archived) return -1;
  var moduleCount = bd.us._moduleList(hb).length;
  var writtenAt = Date.parse(hb.writtenAt || '') || 0;
  return moduleCount * 10000000000000 + writtenAt;
};
bd.us.heartbeat = function () {
  var cards = bd.us._parseCards('ultrascripts:heartbeat');
  var best = null;
  var bestScore = -1;
  for (var i = 0; i < cards.length; i++) {
    var score = bd.us._heartbeatScore(cards[i]);
    if (score > bestScore) {
      best = cards[i];
      bestScore = score;
    }
  }
  return best;
};
bd.us.available = function () { return !!bd.us.heartbeat(); };
bd.us._moduleList = function (hb) {
  var raw = hb && hb.modules;
  if (Array.isArray(raw)) return raw;
  if (raw && typeof raw === 'object') {
    var list = [];
    for (var id in raw) {
      var m = raw[id];
      if (m && typeof m === 'object') {
        if (!m.id) m.id = id;
        list.push(m);
      } else if (m) {
        list.push({ id: id, ops: [] });
      }
    }
    return list;
  }
  return [];
};
bd.us._opList = function (moduleInfo) {
  var raw = moduleInfo && (moduleInfo.ops || moduleInfo.operations || moduleInfo.capabilities);
  if (Array.isArray(raw)) {
    return raw.map(function (op) {
      return typeof op === 'string' ? op : (op && (op.id || op.name || op.op));
    }).filter(Boolean);
  }
  if (raw && typeof raw === 'object') return Object.keys(raw);
  return [];
};
bd.us.has = function (moduleId, opName) {
  var hb = bd.us.heartbeat();
  var mods = bd.us._moduleList(hb);
  for (var i = 0; i < mods.length; i++) {
    if (!mods[i] || mods[i].id !== moduleId) continue;
    if (!opName) return true;
    var ops = bd.us._opList(mods[i]);
    return ops.indexOf(opName) !== -1;
  }
  return false;
};

// --- read all in:<module> cards into memory; auto-queue acks ---
bd.us.tick = function () {
  var hb = bd.us.heartbeat();
  var mods = bd.us._moduleList(hb);
  for (var i = 0; i < mods.length; i++) {
    var modId = mods[i].id;
    var card  = bd.us._parseCard('ultrascripts:in:' + modId);
    if (!card || !card.responses) continue;
    bd.us._results[modId] = bd.us._results[modId] || {};
    for (var reqId in card.responses) {
      var r = card.responses[reqId];
      if (r.status === 'ok' || r.status === 'err' || r.status === 'timeout') {
        bd.us._results[modId][reqId] = r;
        if (bd.us._pendingAcks.indexOf(reqId) === -1) bd.us._pendingAcks.push(reqId);
      }
    }
  }
};

// --- queue an op call ---
bd.us.call = function (moduleId, opName, args) {
  bd.us._reqCounter += 1;
  var reqId = moduleId + '.' + opName + '#' + bd.us.liveCount() + '.' + bd.us._reqCounter;
  bd.us._pendingRequests.push({ id: reqId, module: moduleId, op: opName, args: args || {} });
  return reqId;
};

// --- latest completed response for a module / op ---
bd.us.latest = function (moduleId, opName) {
  var bucket = bd.us._results[moduleId];
  if (!bucket) return null;
  var prefix = opName ? (moduleId + '.' + opName + '#') : null;
  var best = null;
  for (var reqId in bucket) {
    if (prefix && reqId.indexOf(prefix) !== 0) continue;
    var r = bucket[reqId];
    if (!best || (r.completedLiveCount || 0) > (best.completedLiveCount || 0)) best = r;
  }
  return best;
};

// --- specific response by request id ---
bd.us.result = function (reqId) {
  for (var modId in bd.us._results) {
    if (bd.us._results[modId][reqId]) return bd.us._results[modId][reqId];
  }
  return null;
};

// --- Widget: declare your manifest once ---
bd.us.defineWidget = function (manifest) {
  var existing = bd.us._parseCard('ultrascripts:state:widget');
  bd.us.widget = {
    v: 1,
    manifest: manifest,
    history: (existing && existing.history) || {},
    interactions: (existing && existing.interactions) || { ackSeq: 0 }
  };
};

// --- Widget: push a turn snapshot ---
bd.us.publishWidget = function (values) {
  if (!bd.us.widget) return;
  bd.us.widget.history[bd.us.liveCount()] = values;
  bd.us._upsertCard('ultrascripts:state:widget', JSON.stringify(bd.us.widget));
};

// --- Widget: read sidebar widget events and ack by sequence ---
bd.us.widgetEvents = function () {
  var card = bd.us._parseCard('ultrascripts:in:widget');
  var events = (card && card.widgetEvents && card.widgetEvents.events) || [];
  var ackSeq = (bd.us.widget && bd.us.widget.interactions && bd.us.widget.interactions.ackSeq) || 0;
  return events.filter(function (e) { return e && Number(e.seq || 0) > ackSeq; });
};
bd.us.ackWidget = function (seq) {
  if (!bd.us.widget) return;
  bd.us.widget.interactions = bd.us.widget.interactions || {};
  bd.us.widget.interactions.ackSeq = Math.max(Number(bd.us.widget.interactions.ackSeq || 0), Number(seq || 0));
};

// --- write the queued requests + acks to ultrascripts:out ---
bd.us.commit = function () {
  if (bd.us._pendingRequests.length === 0 && bd.us._pendingAcks.length === 0) return;
  var payload = { v: 1, requests: bd.us._pendingRequests, acks: bd.us._pendingAcks };
  bd.us._upsertCard('ultrascripts:out', JSON.stringify(payload));
  bd.us._pendingRequests = [];
  bd.us._pendingAcks     = [];
};
`;

const copyState = ref('idle')
const copySdk = async () => {
  try {
    await navigator.clipboard.writeText(sdkCode)
    copyState.value = 'copied'
    setTimeout(() => { copyState.value = 'idle' }, 1800)
  } catch (e) {
    // Clipboard may be unavailable (non-secure context, etc.) - the user can still copy from the code block.
    copyState.value = 'idle'
  }
}
</script>
