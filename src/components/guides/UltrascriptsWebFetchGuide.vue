<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- Sticky TOC sidebar -->
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

    <!-- Main content column -->
    <div class="flex-1 space-y-4 min-w-0">

      <!-- SDK paved-path banner -->
      <div class="p-3 rounded-lg border border-bd-amber/30 bg-bd-amber/5 flex items-center gap-3 flex-wrap">
        <Zap class="w-4 h-4 text-bd-amber flex-shrink-0" />
        <div class="flex-1 min-w-0 text-xs text-bd-text-secondary">
          <strong class="text-bd-amber">New to Ultrascripts?</strong> The patterns below assume the <code class="text-bd-green">bd.us</code> SDK helper from Quick Start.
        </div>
        <router-link to="/ultrascripts?tab=quickstart" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-amber/15 hover:bg-bd-amber/25 text-bd-amber text-[11px] font-semibold transition-colors">
          Quick Start
          <ArrowRight class="w-3 h-3" />
        </router-link>
        <router-link to="/ultrascripts?tab=cookbook" class="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bd-green/10 hover:bg-bd-green/20 text-bd-green text-[11px] font-semibold transition-colors">
          Cookbook
        </router-link>
      </div>

      <!-- ===================== WHAT IS ===================== -->
      <section id="guide-what-is" class="card">
        <button @click="toggleGuideSection('what-is')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Globe class="w-5 h-5 text-bd-blue" />What Is the WebFetch Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              <strong>WebFetch</strong> is Ultrascripts' gateway to the public internet. AI Dungeon's script sandbox blocks all network access by
              default; WebFetch tunnels controlled HTTP(S) requests through the BetterDungeon extension, with explicit per-origin player consent and
              built-in rate limits.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Does</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; HTTP GET, HEAD, OPTIONS requests</li>
                  <li>&middot; Web search lookups (DuckDuckGo)</li>
                  <li>&middot; Custom request headers</li>
                  <li>&middot; Response body as text</li>
                  <li>&middot; Per-origin player consent</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Lore APIs and public JSON feeds</li>
                  <li>&middot; Wiki-style reference lookups</li>
                  <li>&middot; Creator-hosted scenario data</li>
                  <li>&middot; Search-based trivia grounding</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Two ops: <code class="text-bd-green">fetch</code> and <code class="text-bd-green">search</code></li>
                  <li>&middot; Async &mdash; responses arrive on a later turn</li>
                  <li>&middot; Player consent prompt on first use per origin</li>
                  <li>&middot; Rate-limited and size-capped</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-purple/10 border border-bd-purple/30">
              <div class="flex items-start gap-2">
                <ShieldCheck class="w-4 h-4 text-bd-purple flex-shrink-0 mt-0.5" />
                <p class="text-xs text-bd-text-secondary">
                  <strong class="text-bd-purple">Consent model:</strong> The player approves each new origin once. The prompt offers three options:
                  <strong>Deny</strong>, <strong>Allow once</strong> (session-only), or <strong>Always allow</strong> (persisted). Per-domain allow/deny
                  lists persist in extension storage. Scripts never see API keys, cookies, or auth tokens &mdash; sensitive headers are stripped before the request leaves.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== QUICK START ===================== -->
      <section id="guide-quick-start" class="card">
        <button @click="toggleGuideSection('quick-start')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Zap class="w-5 h-5 text-bd-amber" />Quick Start</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('quick-start') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('quick-start')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">Three steps to fetch external data with player consent.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Queue a fetch request</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('webfetch', 'fetch', { url: 'https://api.example.com/data' })</code>. The player will see a consent prompt on first use of that origin.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Read the result on a later turn</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('webfetch', 'fetch')</code> to pull the most recent response. If consent was denied, the response will have <code class="text-bd-pink">status: "err"</code> with <code class="text-bd-pink">error.code: "consent_denied"</code>.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Parse and cache</h4>
                <p class="text-xs text-bd-text-secondary">The body is always returned as a text string. If the response is JSON, call <code class="text-bd-green">JSON.parse(data.body)</code> yourself. Store small normalized facts on <code class="text-bd-green">state</code>, not the entire payload.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-blue" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The WebFetch module exposes two ops: <code class="text-bd-green">fetch</code> for HTTP requests and
              <code class="text-bd-green">search</code> for web search lookups. Both are async and consent-gated.
            </p>

            <!-- webfetch.fetch -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>webfetch.fetch</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms timeout</span>
              </div>
              <p>Performs a single HTTP(S) request to an origin the player has approved.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "url": "https://api.example.com/data",  // required, absolute http(s) URL
  "method": "GET",                        // "GET" | "HEAD" | "OPTIONS", default "GET"
  "headers": { "Accept": "application/json" }, // optional, key-value string pairs
  "timeoutMs": 15000,                     // optional, clamped 1000-30000, default 15000
  "maxBodyBytes": 50000                   // optional, clamped 1024-100000, default 50000
}</pre>
                <p class="text-[11px] text-bd-text-muted"><code>body</code> is not supported in v1 and will throw <code class="text-bd-pink">invalid_args</code> if provided.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "status": 200,                          // HTTP status code
  "headers": { "content-type": "..." },   // response headers (lowercased keys)
  "bodyEncoding": "text",                 // always "text" &mdash; no JSON auto-parse
  "body": "raw response text as string",
  "truncated": false,                     // true if response exceeded maxBodyBytes
  "url": "https://api.example.com/data",  // final URL after redirects
  "request": {
    "url": "https://api.example.com/data",
    "origin": "https://api.example.com",
    "method": "GET",
    "strippedHeaders": []                 // headers that were silently removed
  }
}</pre>
                <p class="text-[11px] text-bd-text-muted">The body is always a text string. Call <code>JSON.parse(data.body)</code> yourself if the response is JSON.</p>
              </div>
            </div>

            <!-- webfetch.search -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>webfetch.search</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">30000ms timeout</span>
              </div>
              <p>Web search lookup via DuckDuckGo. Returns ranked result summaries for narrative grounding or trivia.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "query": "AI Dungeon game",   // required, non-empty string (trimmed)
  "maxResults": 5,              // optional, 1-10, default 5
  "timeoutMs": 15000,           // optional, clamped 1000-30000
  "maxBodyBytes": 60000         // optional, default 60000 for search
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape (on ok)</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "query": "AI Dungeon game",
  "provider": "duckduckgo",
  "status": 200,
  "heading": "AI Dungeon",
  "answer": "AI Dungeon is a text adventure game...",
  "abstractText": "AI Dungeon is a single-player/multiplayer text adventure game...",
  "abstractUrl": "https://en.wikipedia.org/wiki/AI_Dungeon",
  "related": [
    { "text": "AI Dungeon Wiki", "url": "https://aidungeon.fandom.com" },
    { "text": "Latitude.io", "url": "https://latitude.io" }
  ],
  "source": "https://api.duckduckgo.com/?format=json&no_html=1&skip_disambig=1&q=AI%20Dungeon%20game",
  "truncated": false
}</pre>
                <p class="text-[11px] text-bd-text-muted"><code>heading</code>, <code>answer</code>, <code>abstractText</code>, and <code>abstractUrl</code> may be empty strings if not present in the DDG response. <code>related</code> may be an empty array.</p>
              </div>
            </div>

            <div class="space-y-1">
              <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
              <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px] space-y-0.5">
                <p><code class="text-bd-pink">invalid_args</code> &mdash; missing/invalid url, unsupported method, body provided, headers not object, query missing/empty</p>
                <p><code class="text-bd-pink">scheme_blocked</code> &mdash; non-http(s) protocol or blocked host (localhost, private IPs)</p>
                <p><code class="text-bd-pink">consent_denied</code> &mdash; user denied origin in consent prompt, or origin in persistent deny list</p>
                <p><code class="text-bd-pink">rate_limit</code> &mdash; exceeded 20 requests/minute per origin. Shape: <code>{ code, message, retryAfterMs, limit }</code></p>
                <p><code class="text-bd-pink">webfetch_unavailable</code> &mdash; extension runtime unavailable or background fetch failed</p>
                <p><code class="text-bd-pink">webfetch_failed</code> &mdash; generic background fetch failure</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Fetch this URL"</strong> &rarr; WebFetch <code>fetch</code></div>
                <div>&middot; <strong>"Search the web"</strong> &rarr; WebFetch <code>search</code></div>
                <div>&middot; <strong>"Is the player online?"</strong> &rarr; <router-link to="/ultrascripts?tab=network" class="text-bd-accent-primary hover:underline">Network</router-link></div>
                <div>&middot; <strong>"Generate text with AI"</strong> &rarr; <router-link to="/ultrascripts?tab=ai" class="text-bd-accent-primary hover:underline">AI</router-link></div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== BEST PRACTICES ===================== -->
      <section id="guide-best-practices" class="card">
        <button @click="toggleGuideSection('best-practices')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><ShieldCheck class="w-5 h-5 text-bd-green" />Best Practices</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('best-practices') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('best-practices')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">Short, opinionated rules for using WebFetch well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Gate with <code>bd.us.has('webfetch')</code> before calling.</li>
                  <li>&middot; Queue requests only when fresh data is needed.</li>
                  <li>&middot; Parse <code>data.body</code> yourself if JSON.</li>
                  <li>&middot; Cache derived facts on <code>state</code>, not the whole payload.</li>
                  <li>&middot; Handle <code>consent_denied</code> gracefully.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not fetch every turn &mdash; respect rate limits.</li>
                  <li>&middot; Do not send auth tokens or cookies (they are stripped).</li>
                  <li>&middot; Do not expect JSON auto-parsing.</li>
                  <li>&middot; Do not block the scenario on external data.</li>
                  <li>&middot; Do not use WebFetch for private/authenticated APIs.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: SAFETY BOUNDS ===================== -->
      <section id="guide-safety" class="card">
        <button @click="toggleGuideSection('safety')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Lock class="w-5 h-5 text-bd-pink" />Advanced: Safety Bounds</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('safety') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('safety')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              WebFetch enforces several safety bounds to protect the player and the extension. These are built into the module and cannot be overridden by scripts.
            </p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Blocked hosts (SSRF protection)</h4>
                <ul class="space-y-0.5 text-[11px] text-bd-text-muted">
                  <li>&middot; <code>localhost</code>, <code>*.localhost</code></li>
                  <li>&middot; <code>*.local</code>, <code>local</code></li>
                  <li>&middot; IPv4 private: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code></li>
                  <li>&middot; IPv4 loopback: <code>127.0.0.0/8</code></li>
                  <li>&middot; IPv4 link-local: <code>169.254.0.0/16</code></li>
                  <li>&middot; IPv6 loopback and link-local</li>
                </ul>
                <p class="text-[11px] text-bd-text-muted">Requests to these hosts throw <code class="text-bd-pink">scheme_blocked</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Stripped request headers</h4>
                <ul class="space-y-0.5 text-[11px] text-bd-text-muted">
                  <li>&middot; <code>authorization</code>, <code>cookie</code></li>
                  <li>&middot; <code>host</code>, <code>origin</code>, <code>referer</code></li>
                  <li>&middot; <code>user-agent</code>, <code>connection</code></li>
                  <li>&middot; <code>content-length</code>, <code>proxy-authorization</code></li>
                  <li>&middot; <code>x-forwarded-for</code>, <code>x-real-ip</code></li>
                  <li>&middot; Any header starting with <code>sec-</code> or <code>proxy-</code></li>
                </ul>
                <p class="text-[11px] text-bd-text-muted">Stripped headers are listed in <code>request.strippedHeaders</code>.</p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Rate limits &amp; size caps</h4>
              <div class="grid md:grid-cols-2 gap-2 text-[11px] text-bd-text-secondary">
                <div>&middot; <strong>Rate limit:</strong> 20 requests/minute per origin (sliding window)</div>
                <div>&middot; <strong>Default timeout:</strong> 15000ms (max 30000ms)</div>
                <div>&middot; <strong>Default max body:</strong> 50000 bytes (max 100000)</div>
                <div>&middot; <strong>Search max results:</strong> 10 (default 5)</div>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== PITFALLS ===================== -->
      <section id="guide-pitfalls" class="card">
        <button @click="toggleGuideSection('pitfalls')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><AlertTriangle class="w-5 h-5 text-bd-pink" />Tips &amp; Common Pitfalls</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('pitfalls') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('pitfalls')" class="mt-4 space-y-3">
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the WebFetch module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Consent denied silently</h4>
                <p class="text-bd-text-secondary">Request appears to vanish or returns <code>consent_denied</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Handle the <code>consent_denied</code> error code; the player dismissed the prompt or the domain is in the deny list.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Slow upstream API</h4>
                <p class="text-bd-text-secondary">Responses time out at 30000ms max.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Only call fast endpoints; cache aggressively; design narrative fallbacks for missing data.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Stale replay data</h4>
                <p class="text-bd-text-secondary">Undo or retry leaves an older fetch response in the cache.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Compare <code>completedLiveCount</code> to the current turn before consuming a response.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Blocked host errors</h4>
                <p class="text-bd-text-secondary">Requests to localhost or private IPs fail with <code>scheme_blocked</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use public endpoints only; SSRF protection blocks private IP ranges and loopback addresses.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Rate limit exceeded</h4>
                <p class="text-bd-text-secondary">Too many requests to the same origin in a short window.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Cache responses; the <code>rate_limit</code> error includes <code>retryAfterMs</code> to guide backoff.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Expecting JSON auto-parse</h4>
                <p class="text-bd-text-secondary">Treating <code>data.body</code> as a parsed object.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> The body is always a text string. Call <code>JSON.parse(data.body)</code> yourself.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== CREDITS ===================== -->
      <section id="guide-credits" class="card">
        <button @click="toggleGuideSection('credits')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Users class="w-5 h-5 text-bd-amber" />Credits</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('credits') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('credits')" class="mt-4 space-y-4">
            <div>
              <p class="text-xs text-bd-text-muted mb-3">
                Contributors who built and maintain the BetterDungeon Ultrascripts WebFetch module:
              </p>
              <div class="flex flex-wrap gap-1.5">
                <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-bd-amber/10 text-bd-amber border border-bd-amber/20">
                  BetterDungeon Dev Team
                </span>
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
  ChevronDown, ChevronUp, Globe, ShieldCheck, Lock, Terminal, Zap, Rocket,
  AlertTriangle, ArrowRight, Sparkles, Info, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the WebFetch Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'safety', label: 'Safety Bounds' },
  { id: 'pitfalls', label: 'Tips & Common Pitfalls' },
  { id: 'credits', label: 'Credits' }
]

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
