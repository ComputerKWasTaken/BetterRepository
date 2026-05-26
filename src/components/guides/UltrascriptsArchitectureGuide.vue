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

      <!-- ===================== THREE-LAYER MODEL ===================== -->
      <section id="guide-layers" class="card">
        <button
          @click="toggleGuideSection('layers')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Layers class="w-5 h-5 text-bd-cyan" />
            Three-Layer Runtime Model
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('layers') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('layers')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Ultrascripts is a single unified runtime split into three cleanly-layered concerns: <strong>Transport</strong> watches AI Dungeon's network traffic,
              <strong>Core</strong> tracks shared runtime state and coordinates module lifecycle, and <strong>Modules</strong> deliver concrete capabilities on top
              of that runtime. The same system handles both state publishing and request/response ops &mdash; there is no separate runtime for either path.
            </p>

            <!-- Layer diagram -->
            <div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 font-mono text-[11px]">
              <div class="p-3 rounded border border-bd-amber/40 bg-bd-amber/5">
                <div class="text-bd-amber font-bold mb-1">Modules</div>
                <div class="text-bd-text-muted">scripture &middot; webfetch &middot; clock &middot; sdk &middot; geolocation &middot; weather &middot; network &middot; system &middot; ai</div>
              </div>
              <div class="flex justify-center text-bd-text-muted">&uarr; depends on</div>
              <div class="p-3 rounded border border-bd-purple/40 bg-bd-purple/5">
                <div class="text-bd-purple font-bold mb-1">Ultrascripts Core</div>
                <div class="text-bd-text-muted">event bus &middot; state cache &middot; adventure tracking &middot; heartbeat &middot; module lifecycle &middot; ops dispatch</div>
              </div>
              <div class="flex justify-center text-bd-text-muted">&uarr; depends on</div>
              <div class="p-3 rounded border border-bd-cyan/40 bg-bd-cyan/5">
                <div class="text-bd-cyan font-bold mb-1">Transport</div>
                <div class="text-bd-text-muted">ws-interceptor &rarr; ws-stream &rarr; DOM events; credentials capture &rarr; write queue &rarr; GraphQL writes</div>
              </div>
            </div>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-cyan/30 space-y-1">
                <h4 class="font-semibold text-bd-cyan flex items-center gap-1.5">
                  <Network class="w-4 h-4" /> Transport
                </h4>
                <p class="text-bd-text-secondary">Observes AI Dungeon's WebSocket and GraphQL traffic, captures session credentials, and serializes Ultrascripts card writes back through the live mutation channel.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                  <Cpu class="w-4 h-4" /> Core
                </h4>
                <p class="text-bd-text-secondary">Keeps shared runtime state (adventure, tail, live count), parses reserved cards, emits heartbeats, and exposes a stable module context API.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber flex items-center gap-1.5">
                  <Boxes class="w-4 h-4" /> Modules
                </h4>
                <p class="text-bd-text-secondary">Plug into Core to read state cards, expose callable ops, or both. Each shipped module is narrow and replaceable.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== TRANSPORT DETAIL ===================== -->
      <section id="guide-transport" class="card">
        <button
          @click="toggleGuideSection('transport')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Network class="w-5 h-5 text-bd-cyan" />
            Transport Layer
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('transport') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('transport')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Transport is the only part of Ultrascripts that talks to AI Dungeon directly. It is intentionally ignorant of module semantics &mdash;
              its job is observation, normalization, and authenticated writeback.
            </p>

            <div class="grid md:grid-cols-3 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                <h4 class="font-semibold text-bd-text-primary text-[12px]">ws-interceptor.js</h4>
                <p class="text-[11px]">Page-world shim over <code class="text-bd-green">WebSocket</code>, <code class="text-bd-green">fetch</code>, and <code class="text-bd-green">XMLHttpRequest</code>. Captures GraphQL traffic and the session <code class="text-bd-green">baseCredentials</code> (Firebase Authorization + endpoint URL) from the first successful request.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                <h4 class="font-semibold text-bd-text-primary text-[12px]">ws-stream.js</h4>
                <p class="text-[11px]">Content-script-side stream service. Maintains the live card map, action list, current adventure id, tail action id, and live count. Emits normalized DOM events that Core subscribes to.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border-subtle space-y-1">
                <h4 class="font-semibold text-bd-text-primary text-[12px]">write-queue.js</h4>
                <p class="text-[11px]">Serializes writes per card id, coalesces rapid repeats, applies optimistic local updates, and retries transient failures. Every Ultrascripts-owned write funnels through here.</p>
              </div>
            </div>

            <!-- Tail vs Live Count -->
            <div class="p-3 rounded-lg bg-bd-blue/10 border border-bd-blue/30">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 mb-1">
                <GitMerge class="w-4 h-4" /> Tail vs. Live Count
              </h4>
              <p class="text-[11px]">
                Ultrascripts tracks two distinct positions in the action stream. <strong>Tail</strong> is the highest non-undone action id currently present.
                <strong>Live count</strong> is the count of actions whose <code class="text-bd-green">undoneAt</code> is null. The pair lets modules
                distinguish retry (tail changes, live count stable) from undo/restore (live count changes).
              </p>
            </div>

            <!-- Write mutation -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 mb-2">
                <FileCode class="w-4 h-4" /> Production Write Mutation
              </h4>
              <p class="text-[11px] mb-2">
                All Ultrascripts card writes use a single hardcoded GraphQL mutation authenticated with captured credentials.
                Writes work immediately on adventure load, including turn-0, without any prior user-initiated card edit.
              </p>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">mutation SaveQueueStoryCard($input: UpdateStoryCardInput!) {
  updateStoryCard(input: $input) {
    success
    message
    storyCard { id type title description keys value useForCharacterCreation updatedAt }
  }
}</pre>
            </div>

            <!-- Emitted events -->
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="font-semibold text-bd-text-primary text-[12px] mb-2">Transport Emits These Events</h4>
              <div class="grid sm:grid-cols-2 gap-1 text-[11px] font-mono text-bd-text-muted">
                <span>&middot; ultrascripts:cards:full</span>
                <span>&middot; ultrascripts:cards:diff</span>
                <span>&middot; ultrascripts:actions:change</span>
                <span>&middot; ultrascripts:tail:change</span>
                <span>&middot; ultrascripts:livecount:change</span>
                <span>&middot; ultrascripts:adventure:change</span>
                <span>&middot; ultrascripts:baseCredentials:change</span>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CORE DETAIL ===================== -->
      <section id="guide-core" class="card">
        <button
          @click="toggleGuideSection('core')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Cpu class="w-5 h-5 text-bd-purple" />
            Core Runtime
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('core') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('core')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p>
              Core is the orchestration layer. It owns dispatch and shared runtime state; the registry owns lifecycle; the ops dispatcher owns request routing.
              These three responsibilities stay separate by design.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">core.js</h4>
                <p class="text-[11px]">Subscribes to transport events, tracks adventure / tail / live count, parses <code class="text-bd-green">ultrascripts:state:*</code> cards, dispatches them to matching modules, re-dispatches live-count-aware modules on live count change, and writes the heartbeat card.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">module-registry.js</h4>
                <p class="text-[11px]">Owns module registration, persists per-module enabled state in <code class="text-bd-green">chrome.storage.sync</code>, mounts and unmounts modules, replays cached state to newly-enabled modules, and schedules fresh heartbeats on changes.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">ops-dispatcher.js</h4>
                <p class="text-[11px]">Watches <code class="text-bd-green">ultrascripts:out</code>, parses request envelopes, dedupes request ids, routes calls to module ops, writes pending and terminal responses to <code class="text-bd-green">ultrascripts:in:&lt;module&gt;</code>, honors acks, and garbage-collects stale responses.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">envelope.js</h4>
                <p class="text-[11px]">Shared protocol helper: envelope parsing, response helpers, title helpers, terminal-response pruning, and version handling. Not a dispatcher &mdash; just the protocol glue.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-amber/10 border border-bd-amber/30">
              <h4 class="font-semibold text-bd-amber flex items-center gap-1.5 mb-1">
                <Sparkles class="w-4 h-4" /> Heartbeat Lives in Core
              </h4>
              <p class="text-[11px]">
                The heartbeat writer is part of <code class="text-bd-green">core.js</code> &mdash; there is no separate heartbeat file. It fires on adventure or scenario load
                (gated only on cards being hydrated and credentials being present), is debounced to prevent duplicates, and runs immediately at turn-0 with no dependency on user input.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== DATA FLOW ===================== -->
      <section id="guide-flow" class="card">
        <button
          @click="toggleGuideSection('flow')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <GitMerge class="w-5 h-5 text-bd-blue" />
            Data Flow Paths
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('flow') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('flow')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Four flows describe everything that happens at runtime: state publishing, history movement (undo/rewind/retry), heartbeat discovery, and ops request/response.
            </p>

            <!-- Flow 1: State publishing -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-2">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5">
                <ArrowUpFromLine class="w-4 h-4" /> 1. Script publishes state
              </h4>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-text-muted overflow-x-auto leading-relaxed">Script writes ultrascripts:state:&lt;name&gt;
&rarr; AI Dungeon broadcasts updated cards
&rarr; ws-interceptor captures the traffic
&rarr; ws-stream updates the card map
&rarr; core.js parses and dispatches by name
&rarr; matching module's onStateChange(...) runs</pre>
            </div>

            <!-- Flow 2: History movement -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <h4 class="font-semibold text-bd-amber flex items-center gap-1.5">
                <Undo2 class="w-4 h-4" /> 2. Undo, rewind, restore, retry, edit
              </h4>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-text-muted overflow-x-auto leading-relaxed">AI Dungeon action state changes
&rarr; ws-interceptor captures updated actions
&rarr; ws-stream recomputes tail + live count
&rarr; core.js updates shared runtime state
&rarr; live-count-aware modules refresh as needed</pre>
              <p class="text-[11px] text-bd-text-muted">Undo/restore/rewind/delete &mdash; live count changes. Retry &mdash; tail changes, live count stable. Plain edits may change neither.</p>
            </div>

            <!-- Flow 3: Heartbeat -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <h4 class="font-semibold text-bd-purple flex items-center gap-1.5">
                <HeartPulse class="w-4 h-4" /> 3. Heartbeat discovery
              </h4>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-text-muted overflow-x-auto leading-relaxed">ws-interceptor captures session baseCredentials
&rarr; postMessage handshake to isolated world
&rarr; core.js runHeartbeat() (debounced, single-flight)
&rarr; direct SaveQueueStoryCard mutation
&rarr; ultrascripts:heartbeat card lands in adventure</pre>
            </div>

            <!-- Flow 4: Ops -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5">
                <ArrowLeftRight class="w-4 h-4" /> 4. Ops request/response
              </h4>
              <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-text-muted overflow-x-auto leading-relaxed">Script writes request envelope into ultrascripts:out
&rarr; AI Dungeon broadcasts the updated card
&rarr; ops-dispatcher parses envelope and routes call
&rarr; target module's op handler runs
&rarr; response written to ultrascripts:in:&lt;module&gt;
&rarr; script reads response, then acks on a later turn</pre>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== RESERVED CARDS ===================== -->
      <section id="guide-cards" class="card">
        <button
          @click="toggleGuideSection('cards')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Inbox class="w-5 h-5 text-bd-green" />
            Reserved Cards Reference
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('cards') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('cards')" class="mt-4 space-y-4 text-xs">
            <p class="text-bd-text-secondary">
              Any story card whose title begins with <code class="text-bd-green">ultrascripts:</code> is a reserved Ultrascripts card.
              Their values are expected to be JSON when the runtime parses them.
            </p>

            <div class="overflow-x-auto">
              <table class="w-full text-[11px] border-collapse">
                <thead>
                  <tr class="border-b border-bd-border-subtle">
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Card title</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Writer</th>
                    <th class="text-left py-2 px-2 font-semibold text-bd-text-primary">Purpose</th>
                  </tr>
                </thead>
                <tbody class="text-bd-text-secondary">
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">ultrascripts:heartbeat</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">BetterDungeon</td>
                    <td class="py-2 px-2">Discovery surface. Advertises protocol, client, version, current turn, and mounted modules with their ops.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">ultrascripts:state:&lt;name&gt;</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Script</td>
                    <td class="py-2 px-2">Module-specific state. Dispatched to the module that declared the matching <code class="text-bd-green">stateNames</code>.</td>
                  </tr>
                  <tr class="border-b border-bd-border-subtle/50">
                    <td class="py-2 px-2"><code class="text-bd-green">ultrascripts:out</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">Script</td>
                    <td class="py-2 px-2">Ops request envelope. Contains an array of requests and acks for prior responses.</td>
                  </tr>
                  <tr>
                    <td class="py-2 px-2"><code class="text-bd-green">ultrascripts:in:&lt;module&gt;</code></td>
                    <td class="py-2 px-2 text-bd-text-muted">BetterDungeon</td>
                    <td class="py-2 px-2">Response envelope per module. Holds pending, ok, err, and timeout responses keyed by request id.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== HEARTBEAT PAYLOAD ===================== -->
      <section id="guide-heartbeat" class="card">
        <button
          @click="toggleGuideSection('heartbeat')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <HeartPulse class="w-5 h-5 text-bd-purple" />
            Heartbeat Payload Schema
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('heartbeat') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('heartbeat')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              The <code class="text-bd-green">ultrascripts:heartbeat</code> card value is JSON. Scripts that read it can rely on these fields being present;
              additional fields may be added in future protocol versions without breaking older readers.
            </p>

            <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "ultrascripts": {
    "protocol": 1,
    "enabled": true,
    "client": "BetterDungeon",
    "clientVersion": "2.0.0"
  },
  "turn": 12,
  "modules": [
    {
      "id": "scripture",
      "stateNames": ["scripture"],
      "ops": []
    },
    {
      "id": "webfetch",
      "stateNames": [],
      "ops": ["fetch", "search"]
    }
  ]
}</pre>

            <div class="p-3 rounded-lg bg-bd-cyan/10 border border-bd-cyan/30">
              <p class="text-[11px]">
                <strong class="text-bd-cyan">Heartbeat is the sole discovery surface.</strong> The SDK module is intentionally narrow and does
                <strong>not</strong> duplicate heartbeat content. If you need to know which modules are available, read the heartbeat. If you need
                BetterDungeon-facing metadata or configuration context, call <code class="text-bd-green">sdk.version</code> or <code class="text-bd-green">sdk.config</code>.
              </p>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== WIRE ENVELOPE ===================== -->
      <section id="guide-envelope" class="card">
        <button
          @click="toggleGuideSection('envelope')"
          class="w-full flex items-center justify-between text-left"
        >
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
            <Mail class="w-5 h-5 text-bd-blue" />
            Request / Response Wire Envelope
          </h2>
          <ChevronDown
            class="w-5 h-5 text-bd-text-muted transition-transform"
            :class="{ 'rotate-180': !isGuideSectionExpanded('envelope') }"
          />
        </button>

        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('envelope')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p>
              All ops traffic is JSON envelopes. The request side lives in <code class="text-bd-green">ultrascripts:out</code> and the response side lives
              in <code class="text-bd-green">ultrascripts:in:&lt;module&gt;</code>, one card per module.
            </p>

            <!-- Request envelope -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30">
              <h4 class="font-semibold text-bd-green flex items-center gap-1.5 mb-2">
                <ArrowUpFromLine class="w-4 h-4" /> Request envelope (script &rarr; extension)
              </h4>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "v": 1,
  "requests": [
    {
      "id": "turn-12-clock-1",
      "module": "clock",
      "op": "now",
      "args": { "tz": "America/Chicago" }
    }
  ],
  "acks": ["turn-11-clock-1"]
}</pre>
              <ul class="mt-2 space-y-0.5 text-[11px] text-bd-text-muted">
                <li>&middot; <strong>id</strong>: unique per request. Suffix with action count or timestamp to guarantee uniqueness across replays.</li>
                <li>&middot; <strong>module / op</strong>: must match an entry advertised by heartbeat.</li>
                <li>&middot; <strong>acks</strong>: ids of terminal responses you have consumed. The extension can then garbage-collect them.</li>
              </ul>
            </div>

            <!-- Response envelope -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30">
              <h4 class="font-semibold text-bd-blue flex items-center gap-1.5 mb-2">
                <ArrowDownToLine class="w-4 h-4" /> Response envelope (extension &rarr; script)
              </h4>
              <pre class="p-3 rounded bg-bd-bg-tertiary font-mono text-[11px] text-bd-green overflow-x-auto leading-relaxed">{
  "v": 1,
  "responses": {
    "turn-12-clock-1": {
      "status": "ok",
      "data": { "iso": "2025-01-15T18:42:11Z", "tz": "America/Chicago" },
      "completedLiveCount": 12
    }
  }
}</pre>
              <ul class="mt-2 space-y-0.5 text-[11px] text-bd-text-muted">
                <li>&middot; <strong>status</strong>: <code class="text-bd-green">pending</code>, <code class="text-bd-green">ok</code>, <code class="text-bd-green">err</code>, or <code class="text-bd-green">timeout</code>.</li>
                <li>&middot; <strong>data</strong>: JSON-serializable result on <code class="text-bd-green">ok</code>; <code class="text-bd-green">error</code> shape on <code class="text-bd-green">err</code>.</li>
                <li>&middot; <strong>completedLiveCount</strong>: the live count at the moment the response was finalized. Use it to detect stale replies after undo.</li>
              </ul>
            </div>

            <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
              <p class="text-[11px]">
                <strong class="text-bd-pink">Idempotency matters.</strong> Each op is marked <code class="text-bd-green">safe</code> or <code class="text-bd-green">unsafe</code> for replay.
                Hosted AI calls and external HTTP requests are <strong>unsafe</strong> &mdash; scripts must filter out responses whose <code class="text-bd-green">completedLiveCount</code> no longer
                matches the current turn.
              </p>
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
  ChevronDown, ChevronUp, Layers, Network, Cpu, Boxes, GitMerge, FileCode,
  Sparkles, HeartPulse, Mail, Inbox, ArrowUpFromLine, ArrowDownToLine,
  ArrowLeftRight, Undo2
} from 'lucide-vue-next'

// Guide table of contents sections.
// Grouped by architectural layer so the TOC mirrors the mental model.
const guideSections = [
  { id: 'header-model', label: 'Mental Model', isHeader: true },
  { id: 'layers', label: 'Three-Layer Model' },
  { id: 'header-layers', label: 'Layers In Detail', isHeader: true },
  { id: 'transport', label: 'Transport Layer' },
  { id: 'core', label: 'Core Runtime' },
  { id: 'header-protocol', label: 'Wire Protocol', isHeader: true },
  { id: 'flow', label: 'Data Flow Paths' },
  { id: 'cards', label: 'Reserved Cards' },
  { id: 'heartbeat', label: 'Heartbeat Schema' },
  { id: 'envelope', label: 'Request/Response Envelope' }
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
