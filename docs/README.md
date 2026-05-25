# BetterRepository Internal Docs

> Internal reference documents for the BetterRepository site.
> Not shipped to end users. Used by guide authors, data maintainers, and contributors.

## Layout

```
docs/
├── README.md                       # This file
└── guides/
    ├── format-spec.md              # Standardized Guide Format (authoring contract)
    └── info-dumps/                 # Per-topic kitchen-sink knowledge base
        ├── ai-instructions.md
        ├── plot-components.md
        ├── story-cards.md
        ├── scripts.md
        ├── ultrascripts.md
        ├── symbols-commands.md
        └── advanced-settings.md
```

## What lives where

- **`guides/format-spec.md`** — The authoring contract every guide in
  `src/components/guides/*.vue` must follow. Defines section structure, TOC
  conventions, component patterns, tone, length targets, and cross-linking
  rules. Read this before adding or restructuring a guide.

- **`guides/info-dumps/<topic>.md`** — One file per guide tab. Each is the
  complete, unedited knowledge base for that topic: every fact, edge case,
  source citation, and discarded experiment we know about. Guides cite from
  these and surface only what helps the reader. Info dumps are the
  source-of-truth so future guide rewrites never lose information.

## Workflow

1. New fact discovered → record it in the relevant **info dump** first.
2. Decide whether it belongs in the **guide** based on the rules in
   `format-spec.md` (is it essential? is it discoverable elsewhere? is it
   stable?).
3. If it belongs in the guide, write it following the format spec and link
   back to the info dump only if there is genuinely more depth a reader
   might want.

## Related project-management documents

- `Project Management/BetterRepository.md` — roadmap, priorities, known issues.
- `Project Management/BetterDungeon.md` — extension roadmap (Ultrascripts phases).
