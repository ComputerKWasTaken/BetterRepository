# Ultrascripts — Info Dump

> Full knowledge base for Ultrascripts, the BetterDungeon-side
> JavaScript runtime extension that talks to scenario scripts via the
> Story Card transport. The guide
> (`src/components/guides/UltrascriptsGuide.vue`) is a curated subset.

> **Primary planning folder:** `Project Management/ultrascripts/` —
> these files are the source of truth for protocol, modules, and tests.
> This info dump exists so the BetterRepository site has a consolidated
> view; it should **never** disagree with the planning folder.

---

## 1. Definition

Ultrascripts is the second-generation scripting bridge for AI Dungeon
that runs inside the BetterDungeon browser extension and Android
WebView. Scenario scripts publish requests through specially-typed
Story Cards; BetterDungeon executes them in privileged code and writes
responses back through the same transport.

## 2. Source-of-truth references

- `Project Management/ultrascripts/README.md` (planning index).
- `Project Management/ultrascripts/01-architecture.md`.
- `Project Management/ultrascripts/02-modules.md`.
- `Project Management/ultrascripts/03-implementation-status.md`.
- `Project Management/ultrascripts/04-test-suites.md`.
- `Project Management/ultrascripts/05-betterdungeon-sdk-spec.md`.
- BetterDungeon source: `BetterDungeon/main.js`, `BetterDungeon/core/`.
- Test scripts: `BetterDungeon/tests/aid-scripts/` (per-module suites).

## 3. Module inventory (as of Phase 12)

- Scripture (widget rendering)
- WebFetch (consent-gated HTTP)
- Clock
- BetterDungeon SDK (`version`, `config`)
- Geolocation
- Weather
- Network
- System
- Provider AI (OpenRouter-backed; user-supplied key)

All nine first-party modules are feature-complete with dedicated
regression test suites in `tests/aid-scripts/`.

## 4. Transport mechanics

- Transport: AI Dungeon Story Cards typed `Ultrascripts`.
- Bidirectional request/response envelope.
- Heartbeat for liveness with dedupe.
- Adventure-boundary handling so requests don't leak across stories.
- Write queue prevents lost ops under rapid updates.
- Safer unsafe-op replay behavior to avoid double-execution.

## 5. Platform support

- Chromium: production.
- Firefox: production.
- Android WebView: completed in Phase 12 — Ultrascripts is now
  effectively multiplatform.
- iOS native: not supported (no extension surface).

## 6. Availability detection (from scenario script)

TODO: copy the canonical detection snippet from
`ultrascripts/01-architecture.md` once stabilized for Phase 13.

## 7. Provider AI specifics

- Requires user-supplied OpenRouter key, configured in the
  BetterDungeon popup.
- Opt-in per scenario.
- Bounded by configurable request caps to avoid runaway costs.
- See `Project Management/ultrascripts/archive/17-provider-ai-phase-plan.md`
  and `archive/21-provider-ai-ai-dungeon-test-suite.md`.

## 8. Edge cases

- TODO: enumerate WebView-specific quirks discovered during Phase 12.
- TODO: cross-platform smoke-test matrix (Chromium / Firefox / WebView)
  for Phase 12 sign-off.

## 9. Open questions

- `bd.sdk` helper surface scope (a future epic).
- Third-party module registry / sandboxing model.
- NPM/TS/bundler migration timing.

## 10. Intentionally not in the guide

- Internal protocol byte-level details (live in the planning folder).
- BetterDungeon source-tree internals — only Ultrascripts-facing API
  matters to a scenario author.
- Historical "BetterScripts" tagcipher tricks (deprecated).

## 11. Cross-references

- Scripts info dump — for the scenario-side hook system Ultrascripts
  attaches to.
- BetterRepository "Phase 13" plan in `Project Management/BetterRepository.md`.
