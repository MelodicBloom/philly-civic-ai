# Agrarian Futures Claim/Evidence Ledger v0

This ledger separates externally checkable claims from editorial prose and records what is known about their evidence. It is intentionally conservative: an empty source field means that no independently verified source was available for this increment, not that a source was inferred or fabricated.

## Scope

Version 0 covers only:

- Article 0 — Economics
- Article 3 — Verification / NDI

The following are explicitly out of scope:

- Article 1 — Science
- Article 2 — Politics
- Article 4 — Blueprint
- Article 5 — Human Element

The ledger does not change the six-article narrative or render evidence-state labels in the UI. It is a machine-validated provenance layer for research intake, review, and future editorial decisions.

## Contract

Records live in [`data/agrarian-futures/claim-ledger.json`](../../data/agrarian-futures/claim-ledger.json) and are shaped by [`claim-ledger.schema.json`](../../data/agrarian-futures/claim-ledger.schema.json). Every record has a stable domain ID (`AF-ECO-###` or `AF-MRV-###`), claim text, evidence state, provenance fields, measurement context, review status, and article scope.

Allowed evidence states are exactly: `verified`, `sourced_unreviewed`, `source_required`, `hypothesis`, `proposal`, `simulated`, and `narrative`.

`verified` is reserved for a claim whose source title, URL, date, and locator have all been checked. Unsupported quantitative claims are `source_required`; proposed NDI mechanics are `proposal`; claims requiring causal or measurement research are `hypothesis`. No source is fabricated in v0, and therefore no record is marked `verified` or `sourced_unreviewed`.

Run the built-in validator with:

```text
node scripts/validate-claim-ledger.mjs
node scripts/validate-claim-ledger.mjs --self-test
```

The self-test proves that duplicate IDs and verified records without complete source metadata are rejected. CI invokes the same validator through `npm run validate` before lint and production build.

## Review boundary

This is a data-quality and provenance increment, not a dashboard or interface redesign. Source-required claims remain valid ledger information and should be independently sourced, scoped, and reviewed before being promoted to `sourced_unreviewed` or `verified`. A future review should preserve the source locator, jurisdiction, date scope, units, method, uncertainty, and decision that supports any state change.
