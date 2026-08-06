<template>
  <div class="flex gap-6 animate-fade-in">
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

    <div class="flex-1 space-y-4 min-w-0">
      <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5 flex items-center gap-3 flex-wrap">
        <Zap class="w-4 h-4 text-bd-amber flex-shrink-0" />
        <div class="flex-1 min-w-0 text-xs text-bd-text-secondary">
          <strong class="text-bd-amber">New to Ultrascripts?</strong> This guide uses the <code class="text-bd-green">bd.us</code> helper from Quick Start.
        </div>
        <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/15 hover:bg-bd-amber/25 text-bd-amber text-[11px] font-semibold transition-colors">
          Quick Start <ArrowRight class="w-3 h-3" />
        </router-link>
      </div>

      <section id="guide-what-is" class="card">
        <button @click="toggleGuideSection('what-is')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Globe class="w-5 h-5 text-bd-blue" />What Is WebFetch?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-3 text-sm text-bd-text-secondary">
            <p>AI Dungeon scripts cannot normally access the internet. WebFetch provides one narrow bridge: scripts can read small public HTTPS resources through BetterDungeon.</p>
            <div class="grid sm:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border">
                <h3 class="text-xs font-semibold text-bd-green mb-2">Designed for</h3>
                <p class="text-xs">Public JSON APIs, remote text files, HTML/XML reference pages, and scenario data that needs to update independently.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border">
                <h3 class="text-xs font-semibold text-bd-pink mb-2">Not designed for</h3>
                <p class="text-xs">Search, authenticated APIs, file downloads, browser automation, private networks, or sending POST data.</p>
              </div>
            </div>
            <p class="text-xs"><strong class="text-bd-text-primary">Player control:</strong> enabling the WebFetch module permits bounded reads. Disabling the module stops WebFetch calls. There are no per-origin prompts.</p>
          </div>
        </Transition>
      </section>

      <section id="guide-quick-start" class="card">
        <button @click="toggleGuideSection('quick-start')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Rocket class="w-5 h-5 text-bd-green" />Quick Start</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-3">
            <pre class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border overflow-x-auto text-xs text-bd-text-secondary"><code>var result = bd.us.latest('webfetch', 'fetch');
if (result &amp;&amp; result.status === 'ok') {
  var payload = JSON.parse(result.data.body);
  state.remoteWeatherName = payload.name;
}

if (bd.us.has('webfetch', 'fetch')) {
  bd.us.call('webfetch', 'fetch', {
    url: 'https://api.example.com/data.json',
    headers: { Accept: 'application/json' }
  });
}</code></pre>
            <p class="text-xs text-bd-text-muted">Ultrascripts results arrive on a later turn. Read the previous response before queueing the next request.</p>
          </div>
        </Transition>
      </section>

      <section id="guide-reference" class="card">
        <button @click="toggleGuideSection('reference')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-purple" />Operation Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('reference') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('reference')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <div>
              <h3 class="font-semibold text-bd-blue mb-2"><code>webfetch.fetch</code></h3>
              <pre class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border overflow-x-auto"><code>{
  "url": "https://example.com/data.json",
  "method": "GET",
  "headers": { "Accept": "application/json" },
  "timeoutMs": 15000,
  "maxBodyBytes": 50000
}</code></pre>
            </div>
            <ul class="space-y-1">
              <li>· <code>url</code> must be an absolute public HTTPS URL.</li>
              <li>· <code>method</code> is <code>GET</code> by default; <code>HEAD</code> is also supported.</li>
              <li>· <code>headers</code> is optional. Credential and browser-controlled headers are stripped.</li>
              <li>· <code>timeoutMs</code> defaults to 15,000 and is capped at 30,000.</li>
              <li>· <code>maxBodyBytes</code> defaults to 50,000 and is capped at 100,000.</li>
              <li>· Request bodies are not supported.</li>
            </ul>
            <pre class="p-3 rounded-lg bg-bd-bg-primary border border-bd-border overflow-x-auto"><code>{
  "url": "https://example.com/data.json",
  "redirected": false,
  "redirectCount": 0,
  "status": 200,
  "statusText": "OK",
  "ok": true,
  "headers": { "content-type": "application/json" },
  "contentType": "application/json",
  "bodyEncoding": "text",
  "body": "{}",
  "bytes": 2,
  "returnedBytes": 2,
  "truncated": false,
  "request": {
    "url": "https://example.com/data.json",
    "origin": "https://example.com",
    "method": "GET",
    "strippedHeaders": []
  }
}</code></pre>
          </div>
        </Transition>
      </section>

      <section id="guide-safety" class="card">
        <button @click="toggleGuideSection('safety')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-bd-green" />Safety and Limits</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('safety') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('safety')" class="mt-4 grid sm:grid-cols-2 gap-3 text-xs text-bd-text-secondary">
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border"><strong class="text-bd-text-primary">Network boundary</strong><p class="mt-1">HTTP, localhost, <code>.local</code>, embedded credentials, and literal non-public IP addresses are blocked. Every redirect is checked before following it.</p></div>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border"><strong class="text-bd-text-primary">Credentials</strong><p class="mt-1">Browser cookies and credentials are never attached. Authorization, Cookie, proxy, forwarding, referrer, and browser-controlled headers are stripped.</p></div>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border"><strong class="text-bd-text-primary">Responses</strong><p class="mt-1">JSON, text, HTML, XML, and undeclared text-like bodies are supported. Declared binary content is rejected rather than base64-encoded.</p></div>
            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border"><strong class="text-bd-text-primary">Abuse bounds</strong><p class="mt-1">20 requests per origin per minute, five redirects, 30-second maximum timeout, 100 KB maximum retained body, and bounded custom headers.</p></div>
          </div>
        </Transition>
      </section>

      <section id="guide-errors" class="card">
        <button @click="toggleGuideSection('errors')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-bd-pink" />Errors</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('errors') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('errors')" class="mt-4 space-y-1 text-xs text-bd-text-secondary">
            <p><code class="text-bd-pink">invalid_args</code> — malformed arguments, unsupported method/body, or oversized headers.</p>
            <p><code class="text-bd-pink">scheme_blocked</code> — the URL is not HTTPS.</p>
            <p><code class="text-bd-pink">credentials_blocked</code> — the URL embeds a username or password.</p>
            <p><code class="text-bd-pink">host_blocked</code> — the destination is local, private, reserved, or otherwise blocked.</p>
            <p><code class="text-bd-pink">content_type_blocked</code> — the response declares binary content.</p>
            <p><code class="text-bd-pink">redirect_blocked</code>, <code class="text-bd-pink">redirect_limit</code>, <code class="text-bd-pink">redirect_loop</code> — redirect validation failed.</p>
            <p><code class="text-bd-pink">rate_limit</code>, <code class="text-bd-pink">timeout</code>, <code class="text-bd-pink">webfetch_unavailable</code>, <code class="text-bd-pink">redirect_unavailable</code>, <code class="text-bd-pink">webfetch_failed</code> — operational failures scripts should handle normally.</p>
          </div>
        </Transition>
      </section>

      <section id="guide-practices" class="card">
        <button @click="toggleGuideSection('practices')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Info class="w-5 h-5 text-bd-amber" />Author Guidance</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('practices') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('practices')" class="mt-4 space-y-2 text-xs text-bd-text-secondary">
            <p>Cache normalized facts on <code>state</code>; do not fetch the same resource every turn or store full payloads unnecessarily.</p>
            <p>Check the capability before calling and always provide an offline fallback. WebFetch may be disabled, unavailable, rate-limited, or delayed.</p>
            <p>A script can deliberately place adventure data in a URL or permitted header. Never transmit story or player information unless the scenario clearly requires and discloses it.</p>
            <p>WebFetch is not a search engine. Use a purpose-built public API when a scenario needs external discovery.</p>
          </div>
        </Transition>
      </section>

      <section id="guide-credits" class="card">
        <button @click="toggleGuideSection('credits')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Users class="w-5 h-5 text-bd-amber" />Credits</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4">
            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">BetterDungeon Dev Team</span>
          </div>
        </Transition>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ChevronDown, ChevronUp, Globe, ShieldCheck, Terminal, Zap, Rocket, AlertTriangle, ArrowRight, Info, Users } from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is WebFetch?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'reference', label: 'Operation Reference' },
  { id: 'header-safety', label: 'Safety', isHeader: true },
  { id: 'safety', label: 'Safety and Limits' },
  { id: 'errors', label: 'Errors' },
  { id: 'practices', label: 'Author Guidance' },
  { id: 'credits', label: 'Credits' }
]

const expandedGuideSections = ref(new Set(guideSections.filter(section => !section.isHeader).map(section => section.id)))

const toggleGuideSection = (sectionId) => {
  if (expandedGuideSections.value.has(sectionId)) expandedGuideSections.value.delete(sectionId)
  else expandedGuideSections.value.add(sectionId)
  expandedGuideSections.value = new Set(expandedGuideSections.value)
}

const isGuideSectionExpanded = sectionId => expandedGuideSections.value.has(sectionId)

const scrollToGuideSection = (sectionId) => {
  const element = document.getElementById(`guide-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    expandedGuideSections.value.add(sectionId)
    expandedGuideSections.value = new Set(expandedGuideSections.value)
  }
}

const expandAllGuideSections = () => {
  expandedGuideSections.value = new Set(guideSections.filter(section => !section.isHeader).map(section => section.id))
}

const collapseAllGuideSections = () => {
  expandedGuideSections.value = new Set()
}
</script>
