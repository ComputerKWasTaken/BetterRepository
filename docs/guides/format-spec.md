# Standardized Guide Format

> The authoring contract for every guide rendered by `src/pages/GuidesPage.vue`.
> Every file in `src/components/guides/*.vue` must conform to this spec.
> Updates to this spec are the only way to change "the way our guides look and feel".

This document covers the **structure**, **content rules**, **component patterns**,
**tone**, **length targets**, and **cross-linking rules** used by every guide.

---

## 1. File location and registration

- One guide per topic, named `<Topic>Guide.vue`, in
  `src/components/guides/`.
- Registered in `src/pages/GuidesPage.vue` in either `primaryTabs`
  (core resource guides) or `secondaryTabs` (supplemental guides).
- Tab ID is kebab-case (`story-cards`, `symbols-commands`) and is used in
  the URL query (`/guides?tab=story-cards`) and in `scrollToGuideSection`
  via the `guide-<id>` DOM ID convention.

## 2. Top-level template skeleton

Every guide uses the same outer skeleton:

```vue
<template>
  <div class="flex gap-6 animate-fade-in">
    <!-- Sticky TOC sidebar (lg and up) -->
    <aside class="hidden lg:block w-56 flex-shrink-0">
      <div class="sticky top-4 space-y-2">
        <!-- "Contents" header + expand/collapse all buttons -->
        <!-- Sections rendered from `guideSections`, with `isHeader` groups -->
      </div>
    </aside>

    <!-- Main content column -->
    <div class="flex-1 space-y-4 min-w-0">
      <!-- One <section id="guide-<id>" class="card"> per TOC item -->
    </div>
  </div>
</template>
```

The TOC sidebar, expand/collapse-all buttons, and per-section toggle UI
are mandatory. They must be functionally identical across guides.

## 3. TOC and section ID conventions

- Sections live in a single `guideSections` array in `<script setup>`.
- Each entry is either:
  - **Group header**: `{ id: 'header-<group>', label: 'Group Name', isHeader: true }`
  - **Section**: `{ id: '<kebab-id>', label: 'Human Label' }`
- The standard groupings are:
  - **Core** — required reading for any user (concepts, anatomy, best practices).
  - **Advanced** — deeper material (edge cases, optimization, niche features).
- DOM IDs are `guide-<id>` (must match `scrollToGuideSection` lookup).
- Section IDs must be unique per guide and stable (used in URLs, anchor
  links, and cross-references).

### Required boilerplate in `<script setup>`

```js
const guideSections = [ /* see above */ ]

const expandedGuideSections = ref(
  new Set(guideSections.filter(s => !s.isHeader).map(s => s.id))
)

const toggleGuideSection = (sectionId) => { /* set add/delete */ }
const isGuideSectionExpanded = (sectionId) => expandedGuideSections.value.has(sectionId)
const scrollToGuideSection = (sectionId) => { /* scrollIntoView + auto-expand */ }
const expandAllGuideSections = () => { /* set all */ }
const collapseAllGuideSections = () => { /* set empty */ }
```

Do not refactor these into a composable yet; keeping them inline matches
every existing guide and avoids hidden coupling across guides.

## 4. Section anatomy

Each section is a `<section id="guide-<id>" class="card">` containing:

1. A `<button>` header with the section title, a Lucide icon, and a
   `ChevronDown` that rotates 180° when collapsed.
2. A `<Transition name="slide">` wrapping the collapsible body.
3. Body content in `mt-4 space-y-4` (or `space-y-3` for short sections).

```vue
<section id="guide-anatomy" class="card">
  <button
    @click="toggleGuideSection('anatomy')"
    class="w-full flex items-center justify-between text-left"
  >
    <h2 class="text-lg font-semibold text-bd-text-primary flex items-center gap-2">
      <Layers class="w-5 h-5 text-bd-purple" />
      Anatomy of a Story Card
    </h2>
    <ChevronDown
      class="w-5 h-5 text-bd-text-muted transition-transform"
      :class="{ 'rotate-180': !isGuideSectionExpanded('anatomy') }"
    />
  </button>
  <Transition name="slide">
    <div v-if="isGuideSectionExpanded('anatomy')" class="mt-4 space-y-4">
      <!-- body -->
    </div>
  </Transition>
</section>
```

## 5. Canonical content patterns

These are the reusable patterns. Use them rather than inventing new ones.

### 5.1 Lead paragraph
The first child of every section body is a single `<p class="text-bd-text-secondary">`
that states what the section covers in plain language. No callouts before it.

### 5.2 Concept grid (3-up)
Used to introduce a concept's "What / Why / How" or
"Capabilities / Constraints / Setup":

```vue
<div class="grid md:grid-cols-3 gap-3">
  <div class="p-4 rounded-lg bg-bd-bg-primary border border-bd-amber/30">
    <h3 class="font-semibold text-bd-text-primary mb-2 flex items-center gap-2">
      <Sparkles class="w-4 h-4 text-bd-amber" /> What They Control
    </h3>
    <ul class="text-xs text-bd-text-secondary space-y-1">…</ul>
  </div>
  <!-- … -->
</div>
```

Use semantic color coding:
- `bd-amber` → identity / definition
- `bd-blue` → key facts / docs
- `bd-green` → setup, success, "do this"
- `bd-pink` / `bd-error` → warnings, pitfalls
- `bd-purple` → power-user / advanced material
- `bd-info` → cross-links and "see also"

### 5.3 Right Tool for the Job matrix
Whenever a concept overlaps with another guide topic, include this matrix
so readers learn the boundary between tools:

```vue
<div class="p-3 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
  <h4 class="text-xs font-semibold text-bd-text-muted uppercase tracking-wider mb-2">
    Right Tool for the Job
  </h4>
  <div class="grid md:grid-cols-2 gap-2 text-xs text-bd-text-secondary">
    <div>• <strong>"Always write this way"</strong> → AI Instructions</div>
    <div>• <strong>"Right now, do this"</strong> → Author's Note</div>
    <!-- … -->
  </div>
</div>
```

### 5.4 Info callout
For cross-links or supplementary facts that are not load-bearing:

```vue
<div class="p-3 rounded-lg bg-bd-info/10 border border-bd-info/30">
  <div class="flex items-start gap-2">
    <Info class="w-4 h-4 text-bd-info flex-shrink-0 mt-0.5" />
    <p class="text-xs text-bd-text-secondary">
      For details, see the
      <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">
        Plot Components Guide
      </router-link>.
    </p>
  </div>
</div>
```

### 5.5 Warning callout
For destructive actions, data loss, or "this breaks your stuff":

```vue
<div class="p-3 rounded-lg bg-bd-pink/10 border border-bd-pink/30">
  <div class="flex items-start gap-3">
    <AlertTriangle class="w-5 h-5 text-bd-pink mt-0.5 flex-shrink-0" />
    <p class="text-sm text-bd-text-secondary">
      <strong class="text-bd-text-primary">Warning:</strong> …
    </p>
  </div>
</div>
```

### 5.6 Pitfall grid
A 2-column grid of `bd-pink` cards, each with a problem statement and a
green-text "Fix:" line. Used in every "Tips & Common Pitfalls" section.

### 5.7 Numbered step cards
For quick-start walkthroughs use `bd-green/10` panels titled "Step 1", "Step 2", "Step 3".

## 6. Required sections (per guide)

1. **"What Is …?"** — definition + scope, with the 3-up concept grid.
2. **Quick Start** *(optional but strongly preferred)* — 3 numbered steps.
3. **Anatomy / How It Works** — structural breakdown of the thing.
4. **Best Practices** — the short, opinionated rules.
5. **Advanced topics** — anything power-user, niche, or rarely needed.
6. **Tips & Common Pitfalls** — the pitfall grid pattern.
7. **Credits** — contributor pills ONLY. External resource hyperlinks (e.g. Discord, external docs, FAQs) must not be included inside guide templates to maintain standard UI clarity and layout boundaries.

Group 1–4 under the "Core" TOC header; 5–6 under "Advanced"; 7 stands alone under the label "Credits" using the `Users` icon.

## 7. Tone

- Second person ("you"), not third ("the user").
- Active voice. Imperative where useful ("Use a 5+ character trigger").
- No marketing language. No exclamation marks except for genuine warnings.
- Prefer concrete examples over abstract description. Always show, then explain.
- Bold the load-bearing word in a sentence, not the whole sentence.
- Never write raw Markdown bold styling (`**text**`) inside Vue template text nodes as Vue renders these literally. Instead, use HTML `<strong>text</strong>` tags. Keep literal double asterisks exclusively inside syntax illustrations and code segments (`<pre>` or `<code>`).
- Code, field names, and tokens are wrapped in `<code class="text-bd-green">`.

## 8. Length targets

- **Lead paragraph**: 1–3 sentences.
- **Section body (collapsed default content)**: aim for 100–300 words of
  prose plus structural elements. If a section runs past ~600 words,
  consider splitting it or moving depth into the info dump.
- **Pitfall items**: 1 sentence problem + 1 sentence fix.
- **Quick Start step**: ≤ 60 words.

If a fact does not help a reader *do* something or *understand* a concept
they will actually encounter, move it to the info dump.

## 9. Cross-linking rules

- Use `<router-link to="/guides?tab=<id>">` for in-site links. Never raw `<a href>`.
- External links open in a new tab: `target="_blank"` and the Lucide
  `ExternalLink` icon when shown as a button.
- Always link to the **specific** other guide that owns a concept rather
  than restating it. Example: trigger formatting lives in Story Cards;
  Scripts guide links there instead of recapping.

## 10. Data and source-of-truth

- Anything that could be data (categories, presets, templates, examples)
  belongs in `src/data/*.js`, not hardcoded into the guide template.
- Contributor lists come from `src/data/contributors.js`.
- Tag styling comes from `src/data/shared.js` (`getTagClasses`, etc.).
- If a guide needs to enumerate items (e.g. categories), iterate over the
  data export with `v-for`. Do not duplicate the list inline.

## 11. Info-dump contract

For every guide there must be a matching file at
`docs/guides/info-dumps/<topic>.md` containing the full knowledge base
for that topic. The guide is the curated tip of that iceberg.

Each info dump file must include, at minimum:

- **Definition** — canonical one-paragraph definition.
- **Source-of-truth references** — official AI Dungeon docs, Discord
  threads, contributor write-ups, with links and dates.
- **Mechanics** — every observed behavior, including undocumented ones.
- **Edge cases** — known weirdness, limits, version differences,
  platform differences (web vs iOS vs Android, Chromium vs Firefox vs WebView).
- **Open questions** — things we don't yet know but should investigate.
- **What's intentionally not in the guide** — and why.

## 12. Change procedure

1. Open or create the relevant info dump file. Add the new fact there first.
2. Decide whether it changes guide content (see §8 length rule).
3. If yes, edit the guide following §1–§10. If a new section is added,
   update `guideSections` and verify expand/collapse, TOC scroll, and the
   `guide-<id>` anchor all work.
4. If the change introduces a new repeatable pattern, document it here in
   §5 before reusing it across guides.

## 13. Accessibility checklist

- Every collapsible section has a `<button>` with descriptive text (not just an icon).
- Color is never the only way information is conveyed (use icons + text).
- Contrast: rely on the existing `bd-text-primary` / `secondary` / `muted`
  scale; do not introduce new gray values.
- Focus styles inherit from the `card` and `btn-*` Tailwind classes; do not
  override them on guide-internal buttons.
