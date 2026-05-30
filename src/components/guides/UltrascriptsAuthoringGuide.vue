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

      <!-- ===================== AUDIENCE CALLOUT ===================== -->
      <section id="guide-audience" class="card">
        <button
          @click="toggleGuideSection('audience')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Info class="w-5 h-5 text-bd-amber" />
            Who This Is For
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('audience') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('audience')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              This guide documents the live Ultrascripts <strong>module contract</strong> &mdash; the same interface the shipped first-party modules implement.
              Read this if you are extending BetterDungeon itself with a new module, or studying the contract to understand how an existing module behaves.
            </p>
            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30 flex gap-2">
              <AlertTriangle class="w-4 h-4 text-bd-amber flex-shrink-0 mt-0.5" />
              <p class="text-[11px]">
                <strong class="text-bd-amber">Scenario script authors:</strong> you do not write modules &mdash; you <em>consume</em> them.
                Use the per-module guides (Scripture, WebFetch &amp; AI, SDK &amp; Lifecycle, System &amp; Utilities) for the script-facing API.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== MODULE KINDS ===================== -->
      <section id="guide-kinds" class="card">
        <button
          @click="toggleGuideSection('kinds')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Boxes class="w-5 h-5 text-bd-cyan" />
            Module Kinds
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('kinds') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('kinds')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>A module can do one or both of two things. Pick the kind that matches your capability before you write a single line.</p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">State module</h4>
                <p class="text-[11px]">Declares <code class="text-bd-green">stateNames</code> and reacts to <code class="text-bd-green">ultrascripts:state:&lt;name&gt;</code> cards. Example: <strong>Scripture</strong>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">Ops module</h4>
                <p class="text-[11px]">Declares <code class="text-bd-green">ops</code> and answers ops requests through the wire envelope. Examples: <strong>WebFetch</strong>, <strong>Clock</strong>, <strong>AI</strong>, <strong>SDK</strong>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">Mixed module</h4>
                <p class="text-[11px]">Declares both. Rare in practice but supported. Use only when the same surface needs both kinds of input.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== MODULE CONTRACT ===================== -->
      <section id="guide-contract" class="card">
        <button
          @click="toggleGuideSection('contract')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <FileCode class="w-5 h-5 text-bd-amber" />
            Module Definition Contract
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('contract') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('contract')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Every module is a single plain object registered with <code class="text-bd-green">window.Ultrascripts.registry.register(MyModule)</code>.
              The full contract is described by this TypeScript-style interface, mirroring the live <code class="text-bd-green">module-registry.js</code> and <code class="text-bd-green">core.js</code> behavior.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">interface UltrascriptsModule {
  id: string;                  // unique short id, e.g. 'clock'
  version?: string;            // semver, advertised in heartbeat
  label?: string;              // human-readable name for UI
  description?: string;        // short summary for popup / settings
  aliases?: string[];          // backwards-compatible alternate ids
  defaultEnabled?: boolean;    // first-party defaults to true

  // State surface
  stateNames?: string[];       // reserved ultrascripts:state:&lt;name&gt; cards to subscribe to
  tracksLiveCount?: boolean;   // re-dispatch on live count change even if card content is stable

  // Ops surface
  ops?: Record&lt;string, {
    handler: (args: unknown, ctx: UltrascriptsContext) =&gt; unknown | Promise&lt;unknown&gt;;
    idempotent?: 'safe' | 'unsafe';
    timeoutMs?: number;
  }&gt;;

  // Lifecycle
  mount(ctx: UltrascriptsContext): void;
  unmount?(): void;
  onEnable?(ctx: UltrascriptsContext): void | Promise&lt;void&gt;;
  onDisable?(ctx: UltrascriptsContext): void | Promise&lt;void&gt;;
  onStateChange?(name: string, parsed: unknown, ctx: UltrascriptsContext): void;
  onAdventureChange?(shortId: string | null, ctx: UltrascriptsContext): void;
}</pre>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Required</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; <code class="text-bd-green">id</code></li>
                  <li>&middot; <code class="text-bd-green">mount(ctx)</code></li>
                  <li>&middot; <code class="text-bd-green">stateNames</code> <em>or</em> <code class="text-bd-green">ops</code> (at least one)</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle">
                <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1">Strongly recommended</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; <code class="text-bd-green">unmount</code> for any module that holds DOM, timers, or listeners</li>
                  <li>&middot; <code class="text-bd-green">onAdventureChange</code> for modules with per-adventure state</li>
                  <li>&middot; explicit <code class="text-bd-green">idempotent</code> per op</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <p class="text-[11px]">
                <strong class="text-bd-cyan">Enablement rules:</strong> Built-in short ids (like <code class="text-bd-green">scripture</code>) default to enabled.
                Dotted third-party-style ids (like <code class="text-bd-green">acme.tracker</code>) default to disabled unless <code class="text-bd-green">defaultEnabled: true</code> is set on the definition.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CONTEXT API ===================== -->
      <section id="guide-context" class="card">
        <button
          @click="toggleGuideSection('context')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Plug class="w-5 h-5 text-bd-purple" />
            Module Context API (ctx)
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('context') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('context')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              Every module receives a scoped <code class="text-bd-green">ctx</code> object on mount, on every state-change dispatch, and on every op invocation.
              The same object surface is available across all three call sites.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">interface UltrascriptsContext {
  id: string;                                            // module id (your own)

  // Event subscription
  on(eventName: string, handler: (detail) =&gt; void): () =&gt; void;

  // State and card reads
  getState(name: string): unknown;
  getCardByTitle(title: string): unknown;

  // Adventure / action stream introspection
  readonly adventureShortId: string | null;
  getAdventureId(): string | null;
  getActions(): unknown[];
  getCurrentActionId(): string | null;
  getTail(): string | null;
  getLiveCount(): number;

  // Authoritative writes (goes through write-queue)
  writeCard(title: string, value: string, opts?: object): Promise&lt;unknown&gt;;

  // Response helpers (ops modules)
  respond(requestId: string, data: unknown): Promise&lt;unknown&gt;;
  respondError(requestId: string, err: unknown): Promise&lt;unknown&gt;;

  // Structured logging
  log(level: 'debug' | 'info' | 'warn' | 'error', ...args): void;

  // Small persistent module preferences
  storage: {
    get(key: string, fallback?: unknown): Promise&lt;unknown&gt;;
    set(key: string, value: unknown): Promise&lt;void&gt;;
    remove(key: string): Promise&lt;void&gt;;
  };
}</pre>

            <ul class="space-y-1 text-[11px]">
              <li>&middot; Use <code class="text-bd-green">ctx.writeCard</code> for every Ultrascripts-owned write &mdash; never bypass the queue.</li>
              <li>&middot; Use <code class="text-bd-green">ctx.storage</code> for preferences and consents. Not a cache.</li>
              <li>&middot; Use <code class="text-bd-green">ctx.log</code> instead of bare <code class="text-bd-green">console.*</code> so debug mode can gate noise consistently.</li>
              <li>&middot; Use <code class="text-bd-green">ctx.getLiveCount()</code> when state semantics depend on turn position, not card identity.</li>
            </ul>
          </div>
        </Transition>
      </section>

      <!-- ===================== LIFECYCLE HOOKS ===================== -->
      <section id="guide-lifecycle" class="card">
        <button
          @click="toggleGuideSection('lifecycle')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <RefreshCw class="w-5 h-5 text-bd-green" />
            Lifecycle Hooks
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('lifecycle') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('lifecycle')" class="mt-4 space-y-3 text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Hook</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">When it fires</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Best for</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">mount(ctx)</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Module is enabled and registered.</td>
                    <td class="py-2 px-2">Long-lived resources, DOM mounts, attaching event subscriptions.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">onEnable(ctx)</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Right after mount.</td>
                    <td class="py-2 px-2">Lightweight startup logging, replaying cached state.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">onStateChange(name, parsed, ctx)</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">A subscribed state card updated, or live count changed (if <code class="text-bd-green">tracksLiveCount</code>).</td>
                    <td class="py-2 px-2">React to script-published state. Must be idempotent.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">onAdventureChange(shortId, ctx)</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">The active adventure switched.</td>
                    <td class="py-2 px-2">Reset per-adventure state without a full unmount/mount cycle.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">onDisable(ctx)</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Right before unmount.</td>
                    <td class="py-2 px-2">Clear active behavior, cancel in-flight work.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2"><code class="text-bd-green">unmount()</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Module disabled or extension teardown.</td>
                    <td class="py-2 px-2">Destroy DOM, timers, and held references.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-[11px]">
                <strong class="text-bd-pink">State replay is normal.</strong> Core may call <code class="text-bd-green">onStateChange</code> with cached state right after enable.
                Live-count-aware modules may also be called when the card itself did not change. Write all logic so repeated calls are safe.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== STATE MODULE PATTERN ===================== -->
      <section id="guide-state-pattern" class="card">
        <button
          @click="toggleGuideSection('state-pattern')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowUpFromLine class="w-5 h-5 text-bd-green" />
            State Module Pattern
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('state-pattern') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('state-pattern')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              A minimal state-only module. Treat parsed data as untrusted: validate before use, and no-op on malformed input rather than throwing
              into the runtime.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">const UltrascriptsExampleStateModule = {
  id: 'exampleState',
  version: '1.0.0',
  label: 'Example State',
  description: 'Reads and reacts to a Ultrascripts state card.',
  stateNames: ['exampleState'],
  tracksLiveCount: false,  // set true if rendering depends on turn position

  mount(ctx) {
    this._ctx = ctx;
  },

  unmount() {
    this._ctx = null;
  },

  onStateChange(name, parsed, ctx) {
    if (name !== 'exampleState') return;
    if (!parsed || typeof parsed !== 'object') {
      ctx.log('warn', 'ignored malformed exampleState payload');
      return;
    }
    ctx.log('debug', 'state changed', parsed);
    // ... render or update derived state ...
  },

  onAdventureChange(shortId, ctx) {
    // clear any per-adventure UI before the next adventure's state arrives
  },
};

window.Ultrascripts = window.Ultrascripts || {};
if (window.Ultrascripts?.registry) {
  window.Ultrascripts.registry.register(UltrascriptsExampleStateModule);
}</pre>

            <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
              <h4 class="font-semibold text-bd-green text-[12px] mb-1">Rules of thumb</h4>
              <ul class="space-y-0.5 text-[11px]">
                <li>&middot; <code class="text-bd-green">onStateChange</code> must be safe to run many times.</li>
                <li>&middot; Validate inputs at the top of the handler; log and no-op on malformed data.</li>
                <li>&middot; Tear down owned DOM on disable and adventure change.</li>
                <li>&middot; Don't key behavior only by tail action id when live count is the real index.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== OPS MODULE PATTERN ===================== -->
      <section id="guide-ops-pattern" class="card">
        <button
          @click="toggleGuideSection('ops-pattern')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <ArrowLeftRight class="w-5 h-5 text-bd-blue" />
            Ops Module Pattern
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('ops-pattern') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('ops-pattern')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              A minimal ops module. Each op is a descriptor object &mdash; not a raw function &mdash; so the runtime knows how to handle replay safety and timeouts.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">async function pingOp(args, ctx) {
  if (args !== null &amp;&amp; typeof args !== 'object') {
    throw new Error('ping: args must be an object');
  }
  return {
    ok: true,
    received: args ?? null,
    liveCount: ctx.getLiveCount(),
  };
}

const UltrascriptsExampleOpsModule = {
  id: 'exampleOps',
  version: '1.0.0',
  label: 'Example Ops',
  description: 'Exposes a simple Ultrascripts op.',

  ops: {
    ping: {
      idempotent: 'safe',   // safe to replay if the script asks again
      timeoutMs: 1000,
      handler: pingOp,
    },
  },

  mount(ctx) {
    this._ctx = ctx;
  },

  unmount() {
    this._ctx = null;
  },
};

window.Ultrascripts = window.Ultrascripts || {};
if (window.Ultrascripts?.registry) {
  window.Ultrascripts.registry.register(UltrascriptsExampleOpsModule);
}</pre>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">idempotent: 'safe'</h4>
                <p class="text-[11px]">Deterministic / read-only / cheap to repeat. Examples: <code class="text-bd-green">clock.now</code>, <code class="text-bd-green">sdk.version</code>, <code class="text-bd-green">network.status</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink text-[12px] mb-1">idempotent: 'unsafe'</h4>
                <p class="text-[11px]">External side effect or cost. Example: <code class="text-bd-green">ai.chat</code>. Consent-gated safe ops like <code class="text-bd-green">webfetch.fetch</code> can still need <code class="text-bd-green">completedLiveCount</code> freshness checks.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h4 class="font-semibold text-bd-blue text-[12px] mb-1">Handler rules</h4>
              <ul class="space-y-0.5 text-[11px]">
                <li>&middot; Validate <code class="text-bd-green">args</code> at the top. Throw structured errors on bad input.</li>
                <li>&middot; Return JSON-serializable data.</li>
                <li>&middot; Pick <code class="text-bd-green">timeoutMs</code> deliberately &mdash; not a global default.</li>
                <li>&middot; Keep handler scope bounded; don't reach across modules.</li>
              </ul>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== REGISTRATION & LOADING ===================== -->
      <section id="guide-registration" class="card">
        <button
          @click="toggleGuideSection('registration')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Power class="w-5 h-5 text-bd-cyan" />
            Registration &amp; Loading
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('registration') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('registration')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              First-party modules live under <code class="text-bd-green">BetterDungeon/modules/&lt;module-id&gt;/module.js</code> and register themselves at the bottom of the file
              once the Ultrascripts registry is present on the page.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">// at the bottom of modules/&lt;module-id&gt;/module.js
window.Ultrascripts = window.Ultrascripts || {};
if (window.Ultrascripts?.registry) {
  window.Ultrascripts.registry.register(MyModule);
}</pre>

            <p>When the registry receives a definition it:</p>
            <ol class="space-y-1 text-[11px] list-decimal list-inside">
              <li>stores the definition and applies any aliases</li>
              <li>looks up persisted enabled state from <code class="text-bd-green">chrome.storage.sync</code></li>
              <li>mounts the module if it should be active and calls <code class="text-bd-green">mount(ctx)</code></li>
              <li>replays cached state to newly-mounted state modules</li>
              <li>schedules a fresh heartbeat so scripts see the updated module list</li>
            </ol>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <p class="text-[11px]">
                <strong class="text-bd-amber">Creating the file is not enough.</strong> The module must be part of the shipped extension bundle so the script actually runs.
                The exact loader path depends on how the surrounding BetterDungeon bundle includes the module.
              </p>
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
            <CheckCircle2 class="w-5 h-5 text-bd-green" />
            Authoring Best Practices
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-3 text-xs">
            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1.5 flex items-center gap-1.5">
                  <Check class="w-4 h-4" /> Do
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Keep modules narrow: one capability, one responsibility.</li>
                  <li>&middot; Validate state cards and op args explicitly.</li>
                  <li>&middot; Mark replay-sensitive ops as <code class="text-bd-green">unsafe</code>.</li>
                  <li>&middot; Clear per-adventure state in <code class="text-bd-green">onAdventureChange</code>.</li>
                  <li>&middot; Use <code class="text-bd-green">ctx.writeCard</code> for every Ultrascripts-owned write.</li>
                  <li>&middot; Treat state re-renders as normal.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30">
                <h4 class="font-semibold text-bd-pink text-[12px] mb-1.5 flex items-center gap-1.5">
                  <X class="w-4 h-4" /> Avoid
                </h4>
                <ul class="space-y-1 text-[11px] text-bd-text-secondary">
                  <li>&middot; Inventing a separate profile or capability tier.</li>
                  <li>&middot; Bypassing the write queue with direct GraphQL calls.</li>
                  <li>&middot; Marking unsafe ops as <code class="text-bd-green">safe</code> for replay convenience.</li>
                  <li>&middot; Tying history-sensitive rendering to action id when live count is the real key.</li>
                  <li>&middot; Holding large caches in <code class="text-bd-green">ctx.storage</code>.</li>
                  <li>&middot; Crashing the runtime on malformed input &mdash; log and no-op instead.</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-1.5 flex items-center gap-1.5">
                <BookOpen class="w-4 h-4 text-bd-amber" /> Best reference modules to read
              </h4>
              <ul class="space-y-0.5 text-[11px] text-bd-text-muted">
                <li>&middot; <code class="text-bd-green">modules/scripture/module.js</code> &mdash; canonical state module with live-count rendering</li>
                <li>&middot; <code class="text-bd-green">modules/webfetch/module.js</code> &mdash; safe, consent-gated HTTP(S) ops with rate and size bounds</li>
                <li>&middot; <code class="text-bd-green">modules/sdk/module.js</code> &mdash; small, safe, metadata-only ops</li>
                <li>&middot; <code class="text-bd-green">modules/ai/module.js</code> &mdash; cost controls, configured credentials, unsafe replay semantics</li>
              </ul>
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
  ChevronDown, ChevronUp, Info, AlertTriangle, Boxes, FileCode, Plug,
  RefreshCw, ArrowUpFromLine, ArrowLeftRight, Power, CheckCircle2, Check, X, BookOpen
} from 'lucide-vue-next'

// Guide table of contents sections.
// Order tracks authoring flow: orient -> contract -> patterns -> ship.
const guideSections = [
  { id: 'header-orient', label: 'Orientation', isHeader: true },
  { id: 'audience', label: 'Who This Is For' },
  { id: 'kinds', label: 'Module Kinds' },
  { id: 'header-contract', label: 'The Contract', isHeader: true },
  { id: 'contract', label: 'Module Definition' },
  { id: 'context', label: 'Context API' },
  { id: 'lifecycle', label: 'Lifecycle Hooks' },
  { id: 'header-patterns', label: 'Patterns', isHeader: true },
  { id: 'state-pattern', label: 'State Module' },
  { id: 'ops-pattern', label: 'Ops Module' },
  { id: 'header-ship', label: 'Shipping', isHeader: true },
  { id: 'registration', label: 'Registration & Loading' },
  { id: 'best-practices', label: 'Best Practices' }
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
