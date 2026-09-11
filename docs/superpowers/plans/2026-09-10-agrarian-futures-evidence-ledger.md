# Agrarian Futures Evidence Ledger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the working Agrarian Futures interface as a governed Philly Civic AI product surface, then make its externally verifiable claims traceable before public deployment or policy use.

**Architecture:** `MelodicBloom/philly-civic-ai` remains the canonical repository. The existing React application stays an additive presentation layer; the next build adds a small machine-readable claim/evidence layer beside it rather than turning editorial JSX into a database. Vercel is a downstream preview/deployment surface, not the source of truth.

**Tech Stack:** Vite 8, React 19, Tailwind CSS 3, Node 22+, npm lockfile, JSON Schema, Node validation scripts, GitHub Actions, Termux Chromium visual validation.

**Spec:** `docs/web/AGRARIAN_FUTURES_ARCHITECTURE.md`

## Global Constraints

- Preserve existing Philly Civic AI Markdown personas, grant materials, and context sources as canonical knowledge artifacts.
- Do not convert proposals, candidate partners, simulated telemetry, editorial framing, or research hypotheses into accepted evidence.
- Do not invent sources to make claims look complete.
- Keep the web application additive and independently buildable.
- Keep `package-lock.json` committed and use `npm ci` in CI.
- Keep GitHub Actions dependencies pinned by immutable SHA.
- Do not commit Termux screenshot directories unless a later evidence policy explicitly requires binary artifacts in Git.
- Deployment is downstream of repository validation and evidence-state review.

---

## Preserved checkpoint

Repository: `MelodicBloom/philly-civic-ai`

Branch: `agent/agrarian-futures-web`

Pull request: `#2 — Add Agrarian Futures policy interface and visual validation`

Validated state before this handoff:

- Vite/React/Tailwind application scaffold is committed.
- `package-lock.json` is committed and `npm ci` succeeds.
- GitHub Actions run #3 completed successfully with dependency install, ESLint, and production Vite build.
- Termux system-Chromium visual validation was run by the operator and mobile, tablet, and desktop views were reported good.
- PR #2 is open, mergeable, and marked Ready for review.
- No `philly-civic-ai` project is currently linked in the checked MelodicBloom Vercel project list; do not treat an unrelated Vercel project as canonical or silently deploy there.

## Canonical-home determination

### Canonical repository: `MelodicBloom/philly-civic-ai`

Reasoning:

1. Philly Civic AI already defines itself as MelodicBloom's Philadelphia policy and planning layer, including regenerative infrastructure, grant/policy analysis, land-use strategy, and a planned urban-agriculture/ecological-restoration persona.
2. Agrarian Futures is a policy, governance, measurement, coalition, and bioregional-infrastructure interface. Those responsibilities fit Philly Civic AI directly.
3. `MelodicBloom/adriens-farm` is an adjacent ecological-literacy/storytelling product. It can supply narrative or educational cross-links but should not own the policy/MRV implementation.
4. Beats & Boxes is an adjacent cultural/community activation node. It can participate as a use-case or coalition pathway without becoming the canonical code home.
5. Vercel should host previews/production evidence only after a project is intentionally bound to this repository; it is not a substitute for repository provenance.

### Canonical internal boundaries

- `README.md`, `personas/`, `grant-toolkit/`, and existing context documents: canonical civic knowledge and operating context.
- `src/`: interactive presentation/product surface.
- `src/data/articles.jsx`: current editorial source for the six-part Agrarian Futures narrative, but **not** the future evidence authority.
- `docs/web/AGRARIAN_FUTURES_ARCHITECTURE.md`: architecture and evidence-boundary contract.
- `docs/superpowers/plans/`: executable bounded handoffs and continuation plans.
- Proposed next canonical evidence home: `data/agrarian-futures/`.

## Outcome and output profile

### Current outcome

A working, responsive policy-system demonstrator now turns a large regenerative-agriculture thesis into a navigable civic product. It links narrative, governance/MRV concepts, a Delaware Valley pilot framing, coalition/research pathways, and simulated telemetry without requiring the underlying Markdown knowledge base to become UI code.

### Current outputs

- Ecosystem Hub / sitemap.
- Six-part editorial narrative.
- Blueprint diagram of the governance/evidence architecture.
- Ag-Tech telemetry interaction surface explicitly framed as non-live/simulated where applicable.
- Mobile navigation and responsive layouts.
- Accessible interactive controls and reduced-motion support.
- Static production build suitable for a later Vercel project binding.
- GitHub Actions lint/build validation.
- Termux Chromium visual audit across mobile, tablet, and desktop.
- Architecture documentation that distinguishes verified evidence, simulations, proposals, candidates, and narrative framing.

### What this is not yet

- Not a live farm telemetry platform.
- Not a validated Nutrient Density Index standard.
- Not a clinical or epidemiological evidence system.
- Not proof of active partnerships with named organizations.
- Not a production procurement or subsidy decision engine.
- Not yet a source-complete public policy publication.

## Use-case profile

### UC-1 — Civic policy explainer

**User:** resident, organizer, planner, funder, policy researcher.

**Job:** understand how regenerative agriculture, water, food quality, incentives, and community governance could fit together as one system.

**Current proof:** Ecosystem Hub + editorial + blueprint.

**Success signal:** a reader can identify the proposed actors, flows, evidence states, and decision points without treating hypotheses as settled facts.

### UC-2 — Coalition alignment artifact

**User:** farms, utilities, schools, community organizations, researchers, cultural partners.

**Job:** discuss a Delaware Valley pilot using one shared system map while keeping candidate participation distinct from confirmed partnership.

**Current proof:** Delaware Valley Loop, coalition/research pathway cards, governance stack.

**Success signal:** stakeholders can point to a bounded role, dependency, measurement obligation, and open question.

### UC-3 — MRV / procurement concept demonstrator

**User:** civic technologist, procurement lead, grant reviewer, measurement researcher.

**Job:** inspect how measurements might become auditable decisions through standards, provenance, uncertainty, and governance.

**Current proof:** NDI editorial, governance/MRV stack, blueprint, telemetry surface.

**Success signal:** the interface communicates that labels alone are insufficient and that measurements require calibration, chain of custody, uncertainty, and review.

### UC-4 — Research intake / evidence-governance precursor

**User:** researcher or evidence reviewer.

**Job:** distinguish source-backed observations from hypotheses, proposed mechanisms, simulations, and narrative rhetoric.

**Current proof:** evidence-state language exists, but claims are still embedded in editorial JSX.

**Success signal after next build:** every externally verifiable quantitative or institutional claim has a stable claim ID and explicit evidence state.

### UC-5 — Portfolio / capability proof

**User:** employer, client, collaborator, funder.

**Job:** quickly see integrated research synthesis, service/system design, front-end implementation, evidence governance, visual QA, and civic-product thinking.

**Current proof:** working interface + responsive interaction + CI + architecture/validation receipts.

**Success signal:** the artifact demonstrates executable systems thinking rather than relying on explanatory prose alone.

## Next bounded action — Claim/Evidence Ledger v0

### Why this is next

The UI is functional and visually validated. The largest remaining integrity risk is that quantitative, scientific, financial, political, and institutional statements are embedded directly in `src/data/articles.jsx`. Public deployment would make those statements look more authoritative than their current evidence handling warrants.

### Scope

Create a machine-readable ledger for externally verifiable Agrarian Futures claims and a validator that prevents invalid evidence states. Do **not** source every claim, rewrite the UI, add a database, contact partners, or deploy production in this task.

### Files

- Create: `data/agrarian-futures/claim-ledger.schema.json`
- Create: `data/agrarian-futures/claim-ledger.json`
- Create: `scripts/validate-claim-ledger.mjs`
- Modify: `package.json`
- Modify: `.github/workflows/web-validate.yml`
- Create: `docs/web/AGRARIAN_FUTURES_EVIDENCE_LEDGER.md`

### Interfaces

**Consumes:**

- `src/data/articles.jsx`
- `docs/web/AGRARIAN_FUTURES_ARCHITECTURE.md`

**Produces:**

- Stable claim IDs such as `AF-ECO-001`, `AF-SCI-001`, `AF-POL-001`, `AF-MRV-001`.
- Evidence-state enum: `verified`, `sourced_unreviewed`, `source_required`, `hypothesis`, `proposal`, `simulated`, `narrative`.
- Required fields: `id`, `claim`, `domain`, `evidence_state`, `source_required`, `jurisdiction`, `date_scope`, `units`, `method`, `uncertainty`, `review_status`, `article_id`.
- Optional source fields that must remain empty when no source has actually been verified: `source_title`, `source_url`, `source_date`, `source_locator`.
- A Node validator with non-zero exit status for duplicate IDs, invalid enums, missing required fields, or `verified` claims without source metadata.

### Task 1 — Define and validate the ledger contract

- [ ] **Step 1: Create a failing validator fixture**

Add one temporary in-memory fixture inside `scripts/validate-claim-ledger.mjs` containing a duplicate ID and a `verified` record with no source metadata. The script must first demonstrate those states are rejected before validating the real ledger.

- [ ] **Step 2: Define the JSON Schema**

Create `data/agrarian-futures/claim-ledger.schema.json` with the exact evidence-state enum and fields above. `id`, `claim`, `domain`, `evidence_state`, `source_required`, `review_status`, and `article_id` are required. A record with `evidence_state: "verified"` must require non-empty source title, URL, date, and locator.

- [ ] **Step 3: Implement the dependency-free Node validator**

Use Node's built-in `fs` and explicit checks; do not add a schema-validation package in this bounded task. Validate JSON parseability, unique IDs, enum membership, required fields, and the verified-source invariant.

- [ ] **Step 4: Run the validator against the failing fixture**

Run:

```bash
node scripts/validate-claim-ledger.mjs --self-test
```

Expected: process exits `0` only if the script successfully detects both intentionally invalid self-test cases.

- [ ] **Step 5: Commit the contract**

```bash
git add data/agrarian-futures/claim-ledger.schema.json scripts/validate-claim-ledger.mjs
git commit -m "feat: define Agrarian Futures claim ledger contract"
```

### Task 2 — Extract the first bounded claim set

- [ ] **Step 1: Extract only externally verifiable claims from articles 0 and 3**

Create `data/agrarian-futures/claim-ledger.json` covering **The Economics** (`article_id: 0`) and **The Verification** (`article_id: 3`) only. Include quantitative claims, named standards/markets/institutions, and proposed NDI mechanisms. Do not broaden to the remaining four articles in this task.

- [ ] **Step 2: Label evidence conservatively**

If a source has not been independently checked in this repository, use `source_required`, `hypothesis`, or `proposal` as appropriate. Do not infer `verified` from confident prose.

- [ ] **Step 3: Validate the real ledger**

Run:

```bash
node scripts/validate-claim-ledger.mjs
```

Expected: `PASS` with record count, zero duplicate IDs, zero invalid evidence states, and zero invalid verified records.

- [ ] **Step 4: Document coverage and exclusions**

Create `docs/web/AGRARIAN_FUTURES_EVIDENCE_LEDGER.md` stating that v0 covers articles 0 and 3 only, lists the extraction rules, and explicitly names articles 1, 2, 4, and 5 as out of scope for this increment.

- [ ] **Step 5: Commit the bounded extraction**

```bash
git add data/agrarian-futures/claim-ledger.json docs/web/AGRARIAN_FUTURES_EVIDENCE_LEDGER.md
git commit -m "data: add bounded Agrarian Futures claim ledger v0"
```

### Task 3 — Put the evidence gate in normal validation

- [ ] **Step 1: Add the script to `package.json`**

Add:

```json
"claims:validate": "node scripts/validate-claim-ledger.mjs"
```

Update `validate` so claim validation runs before lint/build without adding dependencies.

- [ ] **Step 2: Keep CI on the existing validation entrypoint**

If `.github/workflows/web-validate.yml` already calls `npm run validate`, do not duplicate the claim command in YAML. If it does not, change the workflow to call the package script once.

- [ ] **Step 3: Run the complete local gate**

```bash
npm ci
npm run validate
```

Expected: claim ledger validation, ESLint, and Vite production build all pass.

- [ ] **Step 4: Run the Termux visual gate only if UI files changed unexpectedly**

The ledger task should not change rendering. If `src/` or CSS files are untouched, do not create redundant screenshots.

- [ ] **Step 5: Commit integration**

```bash
git add package.json .github/workflows/web-validate.yml
git commit -m "ci: enforce Agrarian Futures claim ledger validation"
```

## Definition of done

The bounded next action is complete when all conditions below are true:

- `data/agrarian-futures/claim-ledger.schema.json` exists.
- `claim-ledger.json` covers articles 0 and 3 only.
- No claim is marked `verified` without actual source metadata.
- Duplicate claim IDs fail validation.
- Invalid evidence states fail validation.
- `npm ci` succeeds from the committed lockfile.
- `npm run validate` passes locally and in GitHub Actions.
- No unrelated repository or UI redesign is introduced.
- PR #2 remains reviewable and its description is updated with the evidence-ledger result.

## Stop conditions

Stop and report rather than improvising if:

- a proposed source cannot be independently verified;
- extracting a claim requires deciding a disputed causal relationship;
- the task would require a new database, hosted service, authentication system, or paid API;
- implementing the ledger would require rewriting the existing six-article narrative;
- a Vercel project appears to be linked to a different canonical repository;
- the branch has diverged from PR #2's remote head and cannot be fast-forwarded safely.

## Git / push readiness

Before starting the next bounded build from Termux:

```bash
cd ~/philly-civic-ai
git fetch origin
git switch agent/agrarian-futures-web
git pull --ff-only origin agent/agrarian-futures-web
git status --short
npm ci
npm run validate
```

Expected before editing: clean working tree and passing validation.

After each bounded commit:

```bash
git status --short
git log -3 --oneline
git push origin agent/agrarian-futures-web
```

Do not merge PR #2 as part of the evidence-ledger implementation unless the operator explicitly requests the merge after the new CI result is reviewed.
