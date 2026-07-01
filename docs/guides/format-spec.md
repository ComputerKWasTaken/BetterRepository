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

Guides follow a narrative arc that moves the reader from understanding
to action to mastery. Sections are grouped under TOC headers that
mirror this progression.

### 6.1 Standard section sequence

1. **Guide Overview Banner** *(non-collapsible, before the first section)* —
   See §15. A compact summary with at-a-glance pills and related-guide
   links. Not a TOC entry.
2. **"What Is …?"** — definition + scope, with the 3-up concept grid
   and a context-position diagram where applicable (§14.1).
3. **How It Works** — structural/mechanical breakdown with visual
   diagrams (layer stacks §14.3, flow pipelines §14.2, annotated code
   breakdowns §14.6).
4. **Quick Start** *(optional but strongly preferred)* — 3 numbered
   step cards (§5.7).
5. **Authoring / Writing Techniques** — practical guidance with
   before/after examples and token-efficiency tips.
6. **Comparison & Boundaries** — "Right Tool for the Job" matrix (§5.3)
   plus comparison tables (§14.5) or decision-tree diagrams (§14.4)
   showing where this concept ends and another begins.
7. **Presets / Library / Examples** — ready-to-use content blocks,
   genre presets, or templates.
8. **Advanced Topics** — power-user, niche, or rarely needed material.
9. **Troubleshooting & Diagnostics** — debugging workflow with
   step-by-step instructions and tool references.
10. **Tips & Common Pitfalls** — the pitfall grid pattern (§5.6).
11. **Credits** — contributor pills ONLY. External resource hyperlinks
    (e.g. Discord, external docs, FAQs) must not be included inside
    guide templates to maintain standard UI clarity and layout
    boundaries.

### 6.2 TOC grouping

Group sections under TOC headers that reflect the narrative arc:

- **Understanding** — sections 2–3 (What Is, How It Works)
- **Practical Use** — sections 4–7 (Quick Start, Techniques,
  Comparison, Presets)
- **Advanced** — sections 8–9 (Advanced Topics, Troubleshooting)
- **Pitfalls** — section 10
- **Credits** — section 11, using the `Users` icon

Not every guide will use every section. Omit sections that don't
apply, but never reorder — the arc must flow from understanding →
practice → advanced → pitfalls → credits.

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
   §5 (content patterns) or §14 (visual diagram patterns) before reusing
   it across guides.
5. If the change adds or modifies a visual diagram, verify it renders
   correctly in both light and dark themes and that SVG diagrams use
   `var(--bd-*)` CSS variables, not hardcoded colors.

## 13. Accessibility checklist

- Every collapsible section has a `<button>` with descriptive text (not just an icon).
- Color is never the only way information is conveyed (use icons + text).
- Contrast: rely on the existing `bd-text-primary` / `secondary` / `muted`
  scale; do not introduce new gray values.
- Focus styles inherit from the `card` and `btn-*` Tailwind classes; do not
  override them on guide-internal buttons.
- SVG diagrams must include `role="img"` and `aria-label` attributes.
  Provide a text alternative for any information conveyed only through
  diagram shape or color.

---

## 14. Visual diagram patterns

Diagrams make abstract concepts tangible. Every guide should include
at least one visual diagram in its first two content sections (What
Is / How It Works). Use the patterns below rather than inventing new
ones — if a concept needs a visualization that doesn't fit any
pattern, propose a new one in this section before using it.

### Implementation approach

- **Simple diagrams** (stacks, pipelines, grids, annotated code) use
  CSS/Tailwind-only: styled `<div>` elements with `bd-*` color
  variables, borders, and flexbox/grid layouts. These are
  theme-aware, responsive, and require no external dependencies.
- **Complex diagrams** (decision trees, branching flows) use inline
  `<svg>` elements embedded in the Vue template. These allow curved
  paths, custom shapes, and true branching layouts. Keep SVG
  diagrams under 200 lines and use `viewBox` for responsive scaling.

### Color coding for diagrams

Reuse the semantic colors from §5.2:

- `bd-amber` → identity / definition / the current topic
- `bd-blue` → key facts / reference data
- `bd-green` → success paths / "do this" / positive examples
- `bd-pink` / `bd-error` → warnings / failure paths / negative examples
- `bd-purple` → power-user / advanced / structural
- `bd-cyan` → processes / flows / pipelines
- `bd-teal` → diagnostic / inspection tools

### 14.1 Context Stack Diagram (CSS/Tailwind)

**When to use:** Any guide about an element that occupies a position
in the assembled context window (AI Instructions, Plot Essentials,
Author's Note, Story Cards, Story Summary, Front Memory). Shows
where the element sits relative to everything else.

**Template:**

```vue
<div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5 font-mono text-[11px]">
  <div class="text-[10px] font-bold uppercase tracking-widest text-bd-text-muted mb-2">Context Assembly Order</div>
  <!-- Highlight the current topic's position -->
  <div class="p-2.5 rounded border-2 border-bd-amber/60 bg-bd-amber/10 flex items-center justify-between">
    <span class="text-bd-amber font-bold">AI Instructions</span>
    <span class="text-bd-text-muted text-[10px]">Position #1</span>
  </div>
  <!-- Other positions: neutral styling -->
  <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
    <span class="text-bd-text-secondary">Plot Essentials</span>
    <span class="text-bd-text-muted text-[10px]">#2</span>
  </div>
  <!-- ... remaining positions ... -->
  <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
    <span class="text-bd-text-secondary">Author's Note</span>
    <span class="text-bd-text-muted text-[10px]">#7</span>
  </div>
  <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
    <span class="text-bd-text-secondary">Last Action</span>
    <span class="text-bd-text-muted text-[10px]">#8</span>
  </div>
</div>
```

**Rules:**
- The current guide's topic is always highlighted with a 2px border
  (`border-2`) and `bg-<color>/10` fill. Use the topic's semantic
  color (see §16.5).
- Other positions use the neutral `bd-bg-primary` + `bd-border-subtle`.
- Position numbers are right-aligned in `text-[10px]` muted text.
- Label the diagram with a `text-[10px] uppercase tracking-widest`
  header inside the container.
- Show all 8 context positions even if some are empty — the full
  stack communicates the assembly order.

### 14.2 Flow Pipeline (CSS/Tailwind)

**When to use:** Sequential processes, execution cycles, data flow
paths. Formalizes the existing pill-and-arrow pattern already used
in `ScriptsGuide.vue` and `UltrascriptsGuide.vue`.

**Template:**

```vue
<div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-3">
  <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs">
    <GitMerge class="w-4 h-4 text-bd-cyan" />
    <!-- Diagram title -->
  </h4>
  <div class="flex flex-wrap items-center gap-2 text-[11px] font-mono">
    <div class="px-2.5 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">
      Step One
    </div>
    <span class="text-bd-text-muted">&rarr;</span>
    <div class="px-2.5 py-1.5 rounded bg-bd-green/20 border border-bd-green/30 text-bd-green font-bold">
      Hook / Action
    </div>
    <span class="text-bd-text-muted">&rarr;</span>
    <div class="px-2.5 py-1.5 rounded bg-bd-bg-primary border border-bd-border-subtle text-bd-text-secondary">
      Step Three
    </div>
    <span class="text-bd-text-muted">&rarr;</span>
    <div class="px-2.5 py-1.5 rounded bg-bd-amber/20 border border-bd-amber/30 text-bd-amber font-bold">
      Final Step
    </div>
  </div>
  <p class="text-[10px] text-bd-text-muted"><!-- Optional caption --></p>
</div>
```

**Rules:**
- Neutral steps use `bd-bg-primary` + `bd-border-subtle`.
- Active/hook steps use a semantic color with `/20` bg and `/30`
  border (e.g. `bd-green/20`, `bd-amber/20`).
- Arrows are `&rarr;` in `text-bd-text-muted`.
- The pipeline wraps naturally on small screens via `flex-wrap`.
- Include an optional caption below the pipeline for context.
- For bidirectional flows, use a second row with `&rarr;` arrows
  in the opposite direction (see `UltrascriptsGuide.vue` for
  the existing two-row pattern).

### 14.3 Layer Stack (CSS/Tailwind)

**When to use:** Hierarchical relationships, "depends on" structures,
architecture overviews. Formalizes the existing pattern in
`UltrascriptsArchitectureGuide.vue`.

**Template:**

```vue
<div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-2 font-mono text-[11px]">
  <div class="p-3 rounded border border-bd-amber/40 bg-bd-amber/5">
    <div class="text-bd-amber font-bold mb-1">Top Layer</div>
    <div class="text-bd-text-muted">Details about this layer</div>
  </div>
  <div class="flex justify-center text-bd-text-muted">&uarr; depends on</div>
  <div class="p-3 rounded border border-bd-purple/40 bg-bd-purple/5">
    <div class="text-bd-purple font-bold mb-1">Middle Layer</div>
    <div class="text-bd-text-muted">Details about this layer</div>
  </div>
  <div class="flex justify-center text-bd-text-muted">&uarr; depends on</div>
  <div class="p-3 rounded border border-bd-cyan/40 bg-bd-cyan/5">
    <div class="text-bd-cyan font-bold mb-1">Bottom Layer</div>
    <div class="text-bd-text-muted">Details about this layer</div>
  </div>
</div>
```

**Rules:**
- Each layer is a rounded panel with a semantic color border at
  `/40` opacity and `/5` bg fill.
- Dependency arrows are `&uarr;` (or `&darr;` for "calls into")
  centered in `text-bd-text-muted`.
- Layer name is `font-bold` in the layer's semantic color.
- Layer details are in `text-bd-text-muted`.
- 2–4 layers is ideal; more than 5 becomes hard to scan.

### 14.4 Decision Tree (Inline SVG)

**When to use:** Branching logic, "which tool should I use?"
decisions, conditional flows. Use SVG when the diagram has
branches that can't be expressed as a linear pipeline.

**Template:**

```vue
<div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle">
  <h4 class="font-semibold text-bd-text-primary flex items-center gap-2 text-xs mb-3">
    <GitBranch class="w-4 h-4 text-bd-purple" />
    <!-- Diagram title -->
  </h4>
  <svg viewBox="0 0 600 280" class="w-full h-auto" role="img" aria-label="Decision tree">
    <!-- Root question node -->
    <rect x="200" y="10" width="200" height="36" rx="8"
          fill="var(--bd-bg-primary)" stroke="var(--bd-amber)" stroke-width="2" />
    <text x="300" y="33" text-anchor="middle" class="fill-bd-text-primary"
          style="font: 600 12px monospace">What do you need?</text>

    <!-- Branch lines -->
    <line x1="300" y1="46" x2="300" y2="70" stroke="var(--bd-border-default)" />
    <line x1="300" y1="70" x2="100" y2="70" stroke="var(--bd-border-default)" />
    <line x1="300" y1="70" x2="500" y2="70" stroke="var(--bd-border-default)" />
    <line x1="100" y1="70" x2="100" y2="90" stroke="var(--bd-border-default)" />
    <line x1="500" y1="70" x2="500" y2="90" stroke="var(--bd-border-default)" />

    <!-- Branch condition labels -->
    <text x="180" y="66" text-anchor="middle" class="fill-bd-text-muted"
          style="font: 10px monospace">"Always"</text>
    <text x="420" y="66" text-anchor="middle" class="fill-bd-text-muted"
          style="font: 10px monospace">"Right now"</text>

    <!-- Leaf nodes (results) -->
    <rect x="20" y="90" width="160" height="36" rx="8"
          fill="var(--bd-bg-primary)" stroke="var(--bd-amber)" stroke-width="1.5" />
    <text x="100" y="113" text-anchor="middle" class="fill-bd-amber"
          style="font: 600 11px monospace">AI Instructions</text>

    <rect x="420" y="90" width="160" height="36" rx="8"
          fill="var(--bd-bg-primary)" stroke="var(--bd-blue)" stroke-width="1.5" />
    <text x="500" y="113" text-anchor="middle" class="fill-bd-blue"
          style="font: 600 11px monospace">Author's Note</text>
  </svg>
</div>
```

**Rules:**
- Use `viewBox` for responsive scaling; never set fixed width/height.
- Reference colors via `var(--bd-*)` CSS variables so diagrams
  respect dark/light theme.
- Root/decision nodes use `bd-amber` (the "question" color).
- Leaf/result nodes use the semantic color matching the answer
  (see §16.5 for the color-concept mapping).
- Branch condition labels are in `text-bd-text-muted` at 10px
  monospace, positioned above the branch line.
- Always include `role="img"` and `aria-label` on the `<svg>`.
- Keep SVG diagrams under 200 lines. If a tree is larger, split it
  into multiple diagrams or simplify.
- Use `class="fill-bd-*"` on `<text>` elements for theme-aware text
  color (Tailwind's `fill-*` utility maps to SVG `fill`).

### 14.5 Comparison Matrix (CSS/Tailwind)

**When to use:** Side-by-side feature comparison between two or more
concepts. Formalizes the existing table pattern used in
`AIInstructionsGuide.vue`.

**Template:**

```vue
<div class="overflow-x-auto">
  <table class="w-full text-xs">
    <thead>
      <tr class="border-b border-bd-border-subtle">
        <th class="text-left py-2 pr-4 text-bd-text-muted font-semibold">Feature</th>
        <th class="text-left py-2 pr-4 text-bd-text-primary font-semibold">Concept A</th>
        <th class="text-left py-2 text-bd-text-primary font-semibold">Concept B</th>
      </tr>
    </thead>
    <tbody class="text-bd-text-secondary">
      <tr class="border-b border-bd-border-subtle/50">
        <td class="py-3 pr-4 font-medium">Property</td>
        <td class="py-3 pr-4 text-bd-purple font-semibold">Value A</td>
        <td class="py-3 text-bd-amber font-semibold">Value B</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Rules:**
- Header row uses `bd-text-muted` for the label column and
  `bd-text-primary` for the concept columns.
- Cells can use semantic colors to highlight differences (e.g.
  `text-bd-purple` vs `text-bd-amber`).
- Wrap in `overflow-x-auto` for mobile scrolling.
- Keep to 2–3 compared concepts; more becomes unreadable.
- Use the same concept-color mapping as §16.5.

### 14.6 Annotated Code Breakdown (CSS/Tailwind)

**When to use:** Line-by-line explanation of a code block, default
rule set, or configuration. Formalizes the existing pattern in
`AIInstructionsGuide.vue` (the "Default Rules Anatomy" section).

**Template:**

```vue
<div class="space-y-3 text-xs">
  <!-- One card per code segment -->
  <div class="p-4 rounded-lg bg-bd-<color>/10 border border-bd-<color>/30">
    <div class="flex items-start gap-3">
      <span class="flex-shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-bd-<color>/20 text-bd-<color> uppercase tracking-wider">
        Category Label
      </span>
      <div class="flex-1">
        <div class="p-2 rounded bg-bd-bg-primary font-mono text-xs text-bd-green mb-2">
          The actual code/rule text here.
        </div>
        <p class="text-bd-text-secondary">
          Explanation of what this segment does and why it matters.
        </p>
      </div>
    </div>
  </div>
</div>
```

**Rules:**
- Each segment gets a colored category badge (uppercase,
  `text-[10px]`, `font-bold`).
- The code itself is in a `font-mono text-bd-green` block on
  `bd-bg-primary`.
- Explanation follows below in `text-bd-text-secondary`.
- Use different semantic colors per segment to visually distinguish
  categories.
- Order segments in the same order they appear in the source code.

### 14.7 Trimming Priority Stack (CSS/Tailwind)

**When to use:** Guides for elements that have a trimming priority
in the context budget (AI Instructions, Plot Essentials, Author's
Note, Story Summary). Shows the order in which elements are trimmed
when the context budget is tight.

**Template:**

```vue
<div class="p-4 rounded-lg bg-bd-bg-tertiary border border-bd-border-subtle space-y-1.5 font-mono text-[11px]">
  <div class="text-[10px] font-bold uppercase tracking-widest text-bd-text-muted mb-2">Trim Order (first dropped → last kept)</div>
  <!-- First dropped -->
  <div class="p-2 rounded border border-bd-pink/30 bg-bd-pink/5 flex items-center justify-between">
    <span class="text-bd-pink font-semibold">Story Summary</span>
    <span class="text-bd-text-muted text-[10px]">dropped first</span>
  </div>
  <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; trimmed next</div>
  <div class="p-2 rounded border-2 border-bd-amber/60 bg-bd-amber/10 flex items-center justify-between">
    <span class="text-bd-amber font-bold">AI Instructions</span>
    <span class="text-bd-text-muted text-[10px]">medium priority</span>
  </div>
  <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; trimmed next</div>
  <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
    <span class="text-bd-text-secondary">Plot Essentials</span>
    <span class="text-bd-text-muted text-[10px]">higher priority</span>
  </div>
  <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; trimmed next</div>
  <div class="p-2 rounded border border-bd-border-subtle bg-bd-bg-primary flex items-center justify-between">
    <span class="text-bd-text-secondary">Author's Note</span>
    <span class="text-bd-text-muted text-[10px]">higher priority</span>
  </div>
  <div class="flex justify-center text-bd-text-muted text-[9px]">&darr; never trimmed</div>
  <!-- Always kept -->
  <div class="p-2 rounded border border-bd-green/30 bg-bd-green/5 flex items-center justify-between">
    <span class="text-bd-green font-semibold">Front Memory + Last Action</span>
    <span class="text-bd-text-muted text-[10px]">always kept full</span>
  </div>
</div>
```

**Rules:**
- The current guide's topic is highlighted with `border-2` and
  `bg-<color>/10`.
- First-dropped elements use `bd-pink` styling; always-kept elements
  use `bd-green` styling.
- Arrows are `&darr;` in `text-bd-text-muted` at `text-[9px]`.
- Label the diagram with a header that explains the sort order.

### 14.8 Diagram placement rules

- **What Is…? section:** Include a context stack diagram (§14.1) if
  the topic has a position in the context window. This is the single
  highest-value diagram for orientation.
- **How It Works section:** Include at least one flow pipeline
  (§14.2), layer stack (§14.3), or annotated code breakdown (§14.6).
- **Comparison & Boundaries section:** Use a decision tree (§14.4)
  or comparison matrix (§14.5) — not both, unless the concepts are
  genuinely orthogonal.
- **Advanced Topics section:** Include a trimming priority stack
  (§14.7) if the topic has a trim priority.
- **Other sections:** Diagrams are optional but encouraged wherever
  they aid comprehension.
- Never use more than 3 diagrams in a single section. If a section
  needs more, split it.

---

## 15. Guide overview banner

Every guide begins with a non-collapsible overview banner that sits
above the first `<section>`. It gives readers an instant orientation
before they dive into collapsible content. The banner is not a TOC
entry — it is always visible when the guide tab is active.

### 15.1 Template

```vue
<!-- Guide Overview Banner (non-collapsible, before first section) -->
<div class="card p-4 mb-4 space-y-3">
  <div class="flex items-start gap-3">
    <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-bd-amber/10 border border-bd-amber/20 flex items-center justify-center">
      <ScrollText class="w-5 h-5 text-bd-amber" />
    </div>
    <div class="flex-1 space-y-2">
      <p class="text-sm text-bd-text-secondary leading-relaxed">
        <!-- 1-2 sentence summary of what this guide covers -->
      </p>
      <!-- At-a-glance pills -->
      <div class="flex flex-wrap gap-1.5">
        <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
          Position #1
        </span>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
          Replaces defaults
        </span>
        <span class="px-2 py-0.5 rounded-full text-[11px] font-medium bg-bd-bg-tertiary text-bd-text-muted border border-bd-border-subtle">
          Medium trim priority
        </span>
      </div>
      <!-- Related guides -->
      <div class="flex flex-wrap items-center gap-2 text-[11px] text-bd-text-muted">
        <span>Related:</span>
        <router-link to="/guides?tab=plot-components" class="text-bd-accent-primary hover:underline font-medium">
          Plot Components
        </router-link>
        <span>&middot;</span>
        <router-link to="/guides?tab=scripts" class="text-bd-accent-primary hover:underline font-medium">
          Scripts
        </router-link>
      </div>
    </div>
  </div>
</div>
```

### 15.2 Content rules

- **Summary:** 1–2 sentences in `text-sm text-bd-text-secondary`.
  State what the guide covers and why it matters. No marketing
  language.
- **At-a-glance pills:** 2–5 small pills with the most important
  quick facts (position, scope, persistence, trim priority, etc.).
  These are the facts a reader needs before reading anything else.
  Use neutral styling (`bg-bd-bg-tertiary`, `text-bd-text-muted`,
  `border-bd-border-subtle`) — pills are informational, not
  color-coded.
- **Icon:** Use the same Lucide icon as the guide's tab in
  `GuidesPage.vue`, in the guide's semantic color. The icon container
  uses `bg-<color>/10` and `border-<color>/20`.
- **Related guides:** Link to 1–3 other guides that cover adjacent
  topics. Use `<router-link>`, never raw `<a>`. Separate links with
  `&middot;`.
- The banner uses the `card` class but is NOT a `<section>` — it has
  no collapse toggle, no TOC entry, and no `guide-<id>` DOM ID.
- The banner sits inside the main content column (`flex-1`), before
  the first `<section>`.

---

## 16. Cross-guide consistency rules

Guides should feel like a cohesive series, not independent pages.
These rules ensure visual and structural consistency across all
guides.

### 16.1 Diagram vocabulary

- Use only the patterns defined in §14. If a concept needs a
  visualization that doesn't fit any pattern, add a new pattern to
  §14 before using it.
- The same concept must use the same diagram pattern across guides.
  For example, context position is always shown with a context stack
  diagram (§14.1), never sometimes a table and sometimes a stack.
- When two guides reference the same concept (e.g. AI Instructions
  guide mentions Author's Note position, and Plot Components guide
  shows the full context stack), the visual representation must be
  consistent — same colors, same labels, same position numbering.

### 16.2 Overview banner consistency

- Every guide uses the overview banner defined in §15.
- The at-a-glance pills use the same visual style across guides
  (same size, same colors, same border treatment).
- Related-guide links are always present (minimum 1, maximum 3) and
  are bidirectional — if Guide A links to Guide B, Guide B should
  link back to Guide A where relevant.

### 16.3 Cross-linking discipline

- When a guide mentions a concept owned by another guide, link to
  that guide rather than re-explaining. Use
  `<router-link to="/guides?tab=<id>">`.
- Cross-links in overview banners use the format described in §15.
- Cross-links in section bodies use the info callout pattern (§5.4).
- Never link to a specific section anchor (`#guide-<id>`) from
  another guide — link to the guide tab and let the reader navigate.
  This avoids brittle cross-guide anchor dependencies.

### 16.4 Section parity

Guides covering related topics should have parallel section
structures where the concepts overlap. For example:

- AI Instructions, Plot Components, Story Cards, and Author's Note
  all occupy context positions → all include a context stack diagram
  (§14.1) in their "What Is…?" section.
- Scripts and Ultrascripts both have execution flows → both use the
  flow pipeline pattern (§14.2) with consistent styling.
- Every guide that has a "right tool for the job" boundary with
  another guide uses the same decision tree (§14.4) or comparison
  matrix (§14.5) pattern.
- Every guide for a context-window element with a trim priority
  includes a trimming priority stack (§14.7) in its Advanced section.

### 16.5 Color-concept mapping

A concept uses the same semantic color across all guides. This
mapping is defined once in the `GuidesPage.vue` tab configuration
(`dotClass`, `activeClass`) and reused in every diagram, callout,
pill, and reference:

| Concept | Semantic color | Tab dot class |
|---------|---------------|---------------|
| AI Instructions | `bd-amber` | `dot--amber` |
| Plot Components | `bd-blue` | `dot--blue` |
| Story Cards | `bd-purple` | `dot--purple` |
| Scripts | `bd-cyan` | `dot--cyan` |
| Symbols & Commands | neutral | — |
| Advanced Settings | neutral | — |

When a guide references another guide's concept in a diagram, use
that concept's semantic color — not the current guide's color. This
ensures readers can visually trace a concept across guides.
