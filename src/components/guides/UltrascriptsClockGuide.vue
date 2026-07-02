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
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Clock class="w-5 h-5 text-bd-amber" />What Is the Clock Module?</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('what-is') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('what-is')" class="mt-4 space-y-4">
            <p class="text-bd-text-secondary">
              The Clock module grounds scenarios in the player's real wall-clock time. All three operations are deterministic and
              cheap to compute, so every op is marked <strong>safe</strong> for replay.
            </p>

            <div class="grid md:grid-cols-3 gap-3 text-xs">
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Sparkles class="w-4 h-4 text-bd-amber" />What It Reports</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Current timestamp (Unix ms and ISO)</li>
                  <li>&middot; Local date and time strings</li>
                  <li>&middot; UTC offset (minutes and formatted)</li>
                  <li>&middot; System and requested timezones</li>
                  <li>&middot; Custom-formatted time strings</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Info class="w-4 h-4 text-bd-blue" />Why Use It</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Time-of-day narrative steering</li>
                  <li>&middot; Dusk vs. midnight scene selection</li>
                  <li>&middot; Session-length awareness</li>
                  <li>&middot; Timestamp formatting for in-narrative dates</li>
                  <li>&middot; Timezone-aware narration</li>
                </ul>
              </div>
              <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h3 class="font-semibold text-bd-text-primary mb-1.5 flex items-center gap-2"><Rocket class="w-4 h-4 text-bd-green" />How It Works</h3>
                <ul class="text-bd-text-secondary space-y-1">
                  <li>&middot; Three ops: <code class="text-bd-green">now</code>, <code class="text-bd-green">tz</code>, <code class="text-bd-green">format</code></li>
                  <li>&middot; Synchronous, returns on the next turn</li>
                  <li>&middot; All ops marked <code class="text-bd-green">safe</code></li>
                  <li>&middot; No player setup required</li>
                </ul>
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
            <p class="text-bd-text-secondary">Three steps to steer narration by real-world time.</p>

            <div class="space-y-3">
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 1 &mdash; Queue a time request</h4>
                <p class="text-xs text-bd-text-secondary">Call <code class="text-bd-green">bd.us.call('clock', 'now', {})</code> in Context. The request is synchronous and returns on the next turn.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 2 &mdash; Read the result on a later turn</h4>
                <p class="text-xs text-bd-text-secondary">Use <code class="text-bd-green">bd.us.latest('clock', 'now')</code> to pull the most recent response. Use <code class="text-bd-green">data.time</code>, <code class="text-bd-green">data.date</code>, or <code class="text-bd-green">data.local</code> for display.</p>
              </div>
              <div class="p-4 rounded-lg bg-bd-green/10 border border-bd-green/30">
                <h4 class="font-semibold text-bd-green text-[12px] mb-1">Step 3 &mdash; Branch on time of day</h4>
                <p class="text-xs text-bd-text-secondary">Parse <code class="text-bd-green">data.time</code> to pick a scene ambience: night, dawn, day, dusk. Queue the next <code class="text-bd-green">clock.now</code> before <code class="text-bd-green">bd.us.commit()</code>.</p>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ANATOMY / OPERATIONS ===================== -->
      <section id="guide-anatomy" class="card">
        <button @click="toggleGuideSection('anatomy')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Terminal class="w-5 h-5 text-bd-amber" />Operations Reference</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The Clock module exposes three ops. All are synchronous, return on the next turn, and accept an optional
              <code class="text-bd-green">timeZone</code> (alias: <code class="text-bd-green">tz</code>) and optional
              <code class="text-bd-green">ts</code> (Unix ms number or ISO date string, defaults to <code class="text-bd-green">Date.now()</code>).
            </p>

            <!-- clock.now -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-amber/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-amber text-[13px]"><code>clock.now</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Returns the current timestamp plus local date/time fields for the requested timezone. Falls back to the system timezone if none is provided.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">// args: {}  (empty for system timezone)
// or:
{ "timeZone": "America/Chicago" }   // alias: "tz"
// or:
{ "ts": 1737042131428, "timeZone": "America/Chicago" }</pre>
                <p class="text-[11px] text-bd-text-muted"><code>ts</code> accepts a number (Unix ms) or an ISO date string. Defaults to <code>Date.now()</code>.</p>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "ts": 1737042131428,              // number (Unix ms)
  "iso": "2025-01-16T18:42:11.428Z",
  "timeZone": "America/Chicago",    // resolved timezone
  "offsetMinutes": -360,            // number (UTC offset in minutes)
  "offset": "-06:00",               // string (UTC offset formatted)
  "offsetCompact": "-0600",         // string (compact UTC offset)
  "local": "2025-01-16 12:42:11 -06:00",
  "date": "2025-01-16",
  "time": "12:42:11",
  "systemTimeZone": "America/Chicago"
}</pre>
              </div>
            </div>

            <!-- clock.tz -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-blue/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-blue text-[13px]"><code>clock.tz</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Formats the current or provided timestamp in a named IANA timezone. Same response as <code>now</code> plus a <code>requestedTimeZone</code> field.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{ "timeZone": "Europe/London" }</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">{
  "requestedTimeZone": "Europe/London",  // string | null (null if not provided)
  "ts": 1737042131428,
  "iso": "2025-01-16T18:42:11.428Z",
  "timeZone": "Europe/London",
  "offsetMinutes": 0,
  "offset": "+00:00",
  "offsetCompact": "+0000",
  "local": "2025-01-16 18:42:11 +00:00",
  "date": "2025-01-16",
  "time": "18:42:11",
  "systemTimeZone": "America/Chicago"
}</pre>
              </div>
            </div>

            <!-- clock.format -->
            <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-purple/30 space-y-2">
              <div class="flex items-center gap-2 flex-wrap">
                <h4 class="font-semibold text-bd-purple text-[13px]"><code>clock.format</code></h4>
                <span class="text-[10px] px-1.5 py-0.5 rounded-full bg-bd-green/20 text-bd-green">safe</span>
                <span class="text-[10px] text-bd-text-muted">1000ms timeout</span>
              </div>
              <p>Formats a timestamp using Clock's pattern tokens. Returns a <strong>plain string</strong>, not an object. Defaults to UTC if no timezone is provided.</p>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Request args</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-green overflow-x-auto leading-relaxed">{
  "format": "dddd, MMMM D [at] h:mm A Z",  // required
  "timeZone": "America/Chicago",           // optional, defaults to "UTC" (alias: "tz")
  "ts": 1737042131428                      // optional, defaults to Date.now()
}</pre>
              </div>

              <div class="space-y-1">
                <h5 class="font-semibold text-bd-text-primary text-[11px]">Response shape</h5>
                <pre class="p-2 rounded bg-bd-bg-tertiary font-mono text-[10px] text-bd-blue overflow-x-auto leading-relaxed">"Thursday, January 16 at 12:42 PM -06:00"</pre>
                <p class="text-[11px] text-bd-text-muted">The response is a plain string, not a JSON object. Do not expect <code>data.formatted</code> or <code>data.pattern</code>.</p>
              </div>
            </div>

            <div class="space-y-1">
              <h5 class="font-semibold text-bd-text-primary text-[11px]">Error modes</h5>
              <div class="p-2 rounded bg-bd-bg-tertiary border border-bd-pink/20 text-[11px]">
                <p><code class="text-bd-pink">invalid_args</code> &mdash; args is not an object, timezone is invalid, timestamp is invalid/out of range, or <code>format</code> is missing/empty. Shape: <code>{ code, message }</code></p>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Right Tool for the Job</h4>
              <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
                <div>&middot; <strong>"Player's current local time"</strong> &rarr; <code>clock.now</code></div>
                <div>&middot; <strong>"Time in a specific timezone"</strong> &rarr; <code>clock.tz</code></div>
                <div>&middot; <strong>"Pretty-print a timestamp"</strong> &rarr; <code>clock.format</code></div>
                <div>&middot; <strong>"Is it day or night?"</strong> &rarr; <code>clock.now</code> + parse <code>data.time</code></div>
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
            <p class="text-bd-text-secondary">Short, opinionated rules for using Clock well in real scripts.</p>

            <div class="grid md:grid-cols-2 gap-3">
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Do</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Use <code>data.time</code> for the resolved local hour.</li>
                  <li>&middot; Pass an explicit <code>timeZone</code> for timezone-aware scenes.</li>
                  <li>&middot; Use <code>clock.format</code> for display strings.</li>
                  <li>&middot; Query at most once per turn from a single modifier.</li>
                </ul>
              </div>
              <div class="p-3 rounded-lg bg-bd-bg-primary border border-bd-pink/30 space-y-1">
                <h4 class="font-semibold text-bd-pink text-[12px]">Avoid</h4>
                <ul class="space-y-1 text-[11px] text-bd-text-muted">
                  <li>&middot; Do not read <code>data.ts</code> and manually guess the local hour.</li>
                  <li>&middot; Do not expect <code>clock.format</code> to return an object.</li>
                  <li>&middot; Do not hammer the op on every modifier in the same turn.</li>
                  <li>&middot; Do not assume the player's timezone matches a fixed value.</li>
                </ul>
              </div>
            </div>
          </div>
        </Transition>
      </section>

      <!-- ===================== ADVANCED: FORMAT TOKENS ===================== -->
      <section id="guide-format-tokens" class="card">
        <button @click="toggleGuideSection('format-tokens')" class="w-full flex items-center justify-between text-left">
          <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2"><Layers class="w-5 h-5 text-bd-purple" />Advanced: Format Tokens</h2>
          <ChevronDown class="w-5 h-5 text-bd-text-muted transition-transform" :class="{ 'rotate-180': !isGuideSectionExpanded('format-tokens') }" />
        </button>
        <Transition name="slide">
          <div v-if="isGuideSectionExpanded('format-tokens')" class="mt-4 space-y-3 text-xs text-bd-text-secondary">
            <p class="text-bd-text-secondary">
              The <code class="text-bd-green">clock.format</code> op supports the following pattern tokens. Wrap literal text in
              square brackets (e.g. <code class="text-bd-green">[at]</code>) to prevent it from being interpreted as a token.
            </p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Year</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">YYYY</code> &mdash; 4-digit year (2025)</li>
                  <li><code class="text-bd-green">YY</code> &mdash; 2-digit year (25)</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-amber/30 space-y-1">
                <h4 class="font-semibold text-bd-amber text-[12px]">Month</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">MMMM</code> &mdash; Full month (January)</li>
                  <li><code class="text-bd-green">MMM</code> &mdash; Abbreviated (Jan)</li>
                  <li><code class="text-bd-green">MM</code> &mdash; 2-digit month (01)</li>
                  <li><code class="text-bd-green">M</code> &mdash; Month number (1)</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">Day</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">dddd</code> &mdash; Full weekday (Thursday)</li>
                  <li><code class="text-bd-green">ddd</code> &mdash; Abbreviated (Thu)</li>
                  <li><code class="text-bd-green">DD</code> &mdash; 2-digit day (16)</li>
                  <li><code class="text-bd-green">D</code> &mdash; Day number (16)</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-blue/30 space-y-1">
                <h4 class="font-semibold text-bd-blue text-[12px]">Hour</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">HH</code> &mdash; 24-hour, 2-digit (14)</li>
                  <li><code class="text-bd-green">H</code> &mdash; 24-hour (14)</li>
                  <li><code class="text-bd-green">hh</code> &mdash; 12-hour, 2-digit (02)</li>
                  <li><code class="text-bd-green">h</code> &mdash; 12-hour (2)</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-green/30 space-y-1">
                <h4 class="font-semibold text-bd-green text-[12px]">Minute &amp; Second</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">mm</code> &mdash; 2-digit minute (42)</li>
                  <li><code class="text-bd-green">m</code> &mdash; Minute (42)</li>
                  <li><code class="text-bd-green">ss</code> &mdash; 2-digit second (11)</li>
                  <li><code class="text-bd-green">s</code> &mdash; Second (11)</li>
                </ul>
              </div>
              <div class="p-3 rounded bg-bd-bg-primary border border-bd-purple/30 space-y-1">
                <h4 class="font-semibold text-bd-purple text-[12px]">AM/PM &amp; Offset</h4>
                <ul class="space-y-0.5 text-bd-text-muted">
                  <li><code class="text-bd-green">A</code> &mdash; AM/PM uppercase (PM)</li>
                  <li><code class="text-bd-green">a</code> &mdash; am/pm lowercase (pm)</li>
                  <li><code class="text-bd-green">Z</code> &mdash; UTC offset (-06:00)</li>
                  <li><code class="text-bd-green">ZZ</code> &mdash; Compact offset (-0600)</li>
                  <li><code class="text-bd-green">[text]</code> &mdash; Escaped literal text</li>
                </ul>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
              <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">Example patterns</h4>
              <div class="space-y-1 text-[11px] text-bd-text-secondary">
                <div><code class="text-bd-green">YYYY-MM-DD HH:mm:ss</code> &rarr; <code>2025-01-16 12:42:11</code></div>
                <div><code class="text-bd-green">dddd, MMMM D [at] h:mm A</code> &rarr; <code>Thursday, January 16 at 12:42 PM</code></div>
                <div><code class="text-bd-green">h:mm A Z</code> &rarr; <code>12:42 PM -06:00</code></div>
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
            <p class="text-bd-text-secondary">Avoid these common mistakes when working with the Clock module.</p>

            <div class="grid md:grid-cols-2 gap-3 text-[11px]">
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Confusing UTC and local time</h4>
                <p class="text-bd-text-secondary">Reading <code>data.ts</code> and manually guessing the local hour.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use <code>data.time</code> for the resolved timezone, or call <code>clock.tz</code> with an explicit <code>timeZone</code>.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Expecting an object from format</h4>
                <p class="text-bd-text-secondary">Treating the <code>clock.format</code> response as <code>data.formatted</code> or <code>data.pattern</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> <code>clock.format</code> returns a plain string. Read <code>data</code> directly as the formatted result.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Hammering the op on every modifier</h4>
                <p class="text-bd-text-secondary">Clock ops are cheap but turn-paced &mdash; results don't update mid-turn.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Query at most once per turn from a single modifier.</p>
              </div>
              <div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/20">
                <h4 class="font-semibold text-bd-pink mb-1 flex items-center gap-1"><X class="w-4 h-4 text-bd-pink" /> Using an invalid timezone</h4>
                <p class="text-bd-text-secondary">Passing a non-IANA timezone string like <code>"CST"</code> or <code>"Chicago"</code>.</p>
                <p class="text-bd-green mt-1"><strong>Fix:</strong> Use full IANA identifiers like <code>"America/Chicago"</code> or <code>"Europe/London"</code>.</p>
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
                Contributors who built and maintain the BetterDungeon Ultrascripts Clock module:
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
  ChevronDown, ChevronUp, Clock, Terminal, Rocket, AlertTriangle, Zap, ArrowRight,
  Sparkles, Info, ShieldCheck, Layers, X, Users
} from 'lucide-vue-next'

const guideSections = [
  { id: 'header-core', label: 'Core', isHeader: true },
  { id: 'what-is', label: 'What Is the Clock Module?' },
  { id: 'quick-start', label: 'Quick Start' },
  { id: 'anatomy', label: 'Operations Reference' },
  { id: 'best-practices', label: 'Best Practices' },
  { id: 'header-advanced', label: 'Advanced', isHeader: true },
  { id: 'format-tokens', label: 'Format Tokens' },
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
