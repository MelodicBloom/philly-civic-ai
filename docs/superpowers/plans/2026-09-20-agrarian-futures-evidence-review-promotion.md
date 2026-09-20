# Agrarian Futures Evidence Review & Promotion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: use subagent-driven development for independent research lanes, but keep Git writes, ledger state transitions, and final adjudication with one coordinator.

**Goal:** Harden the ledger contract, independently review a six-claim evidence subset, and promote only claims whose evidence state is justified by an inspectable receipt.

**Architecture:** GitHub remains canonical. Research subagents return evidence receipts; they do not write directly to the ledger. The coordinator validates receipts, applies bounded changes, and runs the existing Node/ESLint/Vite gate. No UI or Vercel changes belong in this increment.

**Tech Stack:** Node >=22.12, npm lockfile, JSON/JSON Schema, GitHub Actions, Termux-compatible Bash.

**Inputs:**
- `data/agrarian-futures/claim-ledger.json`
- `data/agrarian-futures/claim-ledger.schema.json`
- `scripts/validate-claim-ledger.mjs`
- `docs/research/AGRARIAN_FUTURES_SOURCE_PACK_v0.md`
- `src/data/articles.jsx`

## Global constraints

- Preserve Articles 0 and 3 as editorial source; do not rewrite article prose in this increment.
- Never promote a claim just because a plausible source was found.
- Prefer primary authoritative sources; record secondary sources as pointers when the primary cannot yet be resolved.
- Preserve source revisions, release dates, population definitions, units, jurisdiction, method, and uncertainty.
- No new npm dependencies.
- No database, API service, authentication system, or Vercel project.
- No visual redesign.
- No partner outreach.
- No ProofX claim unless a real creator ID and successful registration receipt exist.
- A research subagent may recommend a state; only the coordinator may edit `claim-ledger.json`.

---

## Current verified engineering state

- Implementation PR: #4 `Add Agrarian Futures Claim/Evidence Ledger v0`
- Branch: `feat/agrarian-futures-claim-ledger-v0`
- Ledger v0: 18 records covering Articles 0 and 3 only.
- Existing remote GitHub Actions run #5 passed before the source-pack/bootstrap preparation commits.
- Existing validator rejects duplicate IDs and unsourced `verified` records.
- Existing workflow watches `data/agrarian-futures/**`, `scripts/**`, package files, and UI/build files.
- No claim is currently marked `verified` or `sourced_unreviewed`.

## Environment

Preferred mobile environment: Termux.

Bootstrap:

```bash
cd ~/philly-civic-ai 2>/dev/null || true
git fetch origin 2>/dev/null || true
git switch feat/agrarian-futures-claim-ledger-v0 2>/dev/null || true
git pull --ff-only origin feat/agrarian-futures-claim-ledger-v0 2>/dev/null || true

bash scripts/bootstrap-agrarian-evidence-termux.sh
```

Fresh clone / automatic setup:

```bash
bash scripts/bootstrap-agrarian-evidence-termux.sh
```

Only install Chromium when UI files unexpectedly change:

```bash
INSTALL_BROWSER=1 bash scripts/bootstrap-agrarian-evidence-termux.sh
```

The bootstrap must finish with a clean tree and passing `npm run validate` before implementation.

---

# Task 0 — Contract hardening before evidence promotion

**Files:**
- Modify: `scripts/validate-claim-ledger.mjs`
- Modify only if needed: `data/agrarian-futures/claim-ledger.schema.json`

**Purpose:** Prevent semantic and schema drift before adding real source metadata.

## Required invariants

1. `sourced_unreviewed` must require non-empty:
   - `source_title`
   - `source_url`
   - `source_date`
   - `source_locator`
2. `verified` must continue to require those fields and `source_required=false`.
3. Validator constants for:
   - allowed evidence states
   - required record fields
   - Article IDs
   should be checked against the checked-in schema, or derived from the schema without adding a dependency.
4. Add negative self-tests for:
   - `sourced_unreviewed` with empty source metadata;
   - invalid evidence state;
   - invalid Article ID;
   - existing duplicate-ID case;
   - existing unsourced-`verified` case.

## If / then

- **If** schema and runtime validator disagree, **then** fail validation and report the disagreement.
- **If** enforcing a rule requires a third-party schema package, **then** do not add it; implement a minimal dependency-free parity check instead.
- **If** the current schema cannot express the desired conditional cleanly without complexity, **then** keep the runtime invariant authoritative for v0 and document that limitation.

## Test

```bash
node scripts/validate-claim-ledger.mjs --self-test
npm run claims:validate
npm run validate
```

Commit:

```text
test: harden Agrarian Futures evidence-state invariants
```

---

# Task 1 — Dispatch independent evidence-review subagents

Run these lanes in parallel. Each subagent is read-only with respect to Git.

Every subagent must read:
- `docs/research/AGRARIAN_FUTURES_SOURCE_PACK_v0.md`
- the exact target record(s) in `claim-ledger.json`

Every subagent returns only structured evidence receipts and a short note on conflicts.

## Subagent A — USDA farm economics

Targets:
- `AF-ECO-001`
- `AF-ECO-003`

Primary targets:
- USDA ERS Farm Household Income Estimates
- USDA ERS Farm Income and Wealth Statistics balance sheet

Questions:
- Does the authoritative source directly support the number as written?
- Is the ledger population description accurate?
- Is the date an estimate, forecast, or revised historical observation?
- Are the units exact?
- Has USDA revised the number since the article was written?

**If** the source directly supports the claim but no second review has occurred, recommend `sourced_unreviewed`, not `verified`.

## Subagent B — Chapter 12 bankruptcy primary-source resolution

Target:
- `AF-ECO-002`

Start from:
- Farm Bureau's 216 filings / +55% article.
- U.S. Courts Federal Judicial Caseload Statistics 2024.

Mission:
- Locate the exact U.S. Courts Chapter 12 annual count/table supporting 2023 and 2024.
- Record exact table/row locator.

**If** only the Farm Bureau secondary source can be confirmed, keep `source_required`.
**If** the primary U.S. Courts table is located and matches exactly, recommend `sourced_unreviewed`.

## Subagent C — Farming Systems Trial drought claim

Target:
- `AF-ECO-008`

Start from:
- Rodale Farming Systems Trial page.
- Rodale 30-Year Report.
- Underlying peer-reviewed study identified by the trial materials.

Resolve:
- drought definition;
- years;
- organic treatment definition;
- conventional comparator;
- corn yield metric;
- whether 31% is an across-drought-years aggregate or a narrower comparison.

**If** only institutional summary language is available, do not recommend `verified`.
**If** the exact primary study supports the same claim/population/comparator, recommend at most `sourced_unreviewed` pending second review.

## Subagent D — NIR / chemometric validation

Targets:
- `AF-MRV-005`
- `AF-MRV-007`

Start from:
- food NIR / infrared spectroscopy reviews listed in the source pack.

Resolve:
- whether food-composition estimation via calibrated spectra is well-supported in general;
- validation metrics besides R²;
- independent/external validation expectations;
- known calibration transfer, matrix, drift, and generalization limitations.

Do **not** infer that NDI itself is validated.

Expected likely outcome:
- claims may remain `hypothesis` while gaining source metadata / stronger method notes.

---

# Required subagent receipt

Each lane returns one JSON object per claim:

```json
{
  "claim_id": "AF-ECO-001",
  "source_authority": "primary",
  "source_title": "",
  "source_url": "",
  "source_date": "",
  "source_locator": "",
  "supports_claim_as_written": false,
  "population_match": "",
  "date_match": "",
  "unit_match": "",
  "method_notes": "",
  "conflicts_or_revisions": "",
  "recommended_state": "source_required",
  "reason": ""
}
```

No prose-only answer is sufficient.

---

# Task 2 — Coordinator adjudication

The coordinator compares each receipt against the literal ledger claim.

For every target, explicitly decide:

- claim wording match;
- population match;
- date match;
- jurisdiction match;
- unit match;
- method adequacy;
- revision/freshness;
- source authority;
- evidence state.

## If / then rules

- **If** a source is authoritative but the claim wording overstates it, **then** do not promote; record the mismatch.
- **If** the source is secondary and the claim is quantitative, **then** keep `source_required` unless the source itself is the appropriate authority for that fact.
- **If** a source has been revised, **then** preserve the current authoritative value and note the revision; do not silently rewrite history.
- **If** a claim bundles two independent quantities and only one is supported, **then** do not mark the bundled claim verified.
- **If** causality is stronger than the source design supports, **then** keep `hypothesis` or `source_required`.
- **If** an NIR source supports general feasibility but not procurement/NDI sufficiency, **then** keep the NDI-specific state conservative.
- **If** two sources materially conflict, **then** record both and stop promotion until the conflict is resolved.

---

# Task 3 — Apply bounded ledger changes

Only edit target records:

- AF-ECO-001
- AF-ECO-002
- AF-ECO-003
- AF-ECO-008
- AF-MRV-005
- AF-MRV-007

Allowed changes:
- source metadata;
- method notes;
- uncertainty;
- review status;
- `source_required`;
- evidence state when justified by the rules above.

Do not alter other claim text or article prose.

After edits:

```bash
node scripts/validate-claim-ledger.mjs
npm run validate
git diff --check
```

Commit:

```text
data: add reviewed Agrarian Futures evidence receipts
```

---

# Task 4 — Independent second review

Dispatch one fresh reviewer that did not perform Tasks 1–3.

Inputs:
- branch diff;
- evidence receipts;
- source pack;
- ledger schema / validator.

Review questions:

1. Did any claim get promoted beyond its evidence?
2. Does every populated locator actually identify supporting evidence?
3. Did any bundled claim get partially sourced and incorrectly promoted?
4. Do population/date/unit/jurisdiction still match?
5. Did source revisions get recorded?
6. Does validator behavior match the documented evidence-state semantics?

**If** reviewer finds a material mismatch, return the claim to the more conservative state before merge.

No self-approval by the source-research subagent.

---

# Task 5 — CI and PR receipt

Run locally:

```bash
npm ci --no-audit --no-fund
node scripts/validate-claim-ledger.mjs --self-test
npm run validate
git status --short
git diff --check
```

Push:

```bash
git push origin feat/agrarian-futures-claim-ledger-v0
```

Inspect GitHub Actions for the pushed HEAD.

Do not report `READY_FOR_REVIEW` until the remote run is complete and successful.

Update PR #4 description with:
- final HEAD SHA;
- record count;
- evidence-state counts;
- claims reviewed;
- claims promoted;
- claims remaining unresolved;
- validator hardening performed;
- local validation;
- GitHub Actions run ID/conclusion;
- explicit note that no UI/Vercel work occurred.

---

# Definition of done

- Contract hardening passes.
- Six target claims have structured review receipts.
- No unsupported promotion occurred.
- No non-target claim changed.
- No UI code changed.
- No dependency was added.
- `npm ci` passes.
- `npm run validate` passes.
- GitHub Actions passes on final HEAD.
- PR #4 remains bounded and reviewable.
- Final receipt identifies unresolved evidence rather than hiding it.

# Stop conditions

Stop and report when:
- primary source cannot be located for a claim that needs one;
- a source is inaccessible and a secondary source would materially weaken verification;
- source revisions change the meaning of the article claim;
- a claim requires legal/clinical/scientific expert judgment beyond source matching;
- a research lane wants to rewrite article prose;
- any agent proposes Vercel/deployment/UI work;
- any agent wants to add a dependency merely for schema validation;
- branch ancestry or PR base changes unexpectedly.

# Final receipt

Return:

```text
Repository:
PR:
Branch:
Base:
Starting HEAD:
Final HEAD:

Validator hardening:
Self-test:
npm ci:
npm run validate:
GitHub Actions:

Claims reviewed:
Claims promoted to sourced_unreviewed:
Claims promoted to verified:
Claims remaining source_required:
Hypotheses with source support added:

Source conflicts/revisions:

Changed files:

Non-actions confirmed:
- no UI changes
- no dependency additions
- no Vercel changes
- no article prose changes

Decision:
READY_FOR_REVIEW
or
BLOCKED — <specific reason>
```
