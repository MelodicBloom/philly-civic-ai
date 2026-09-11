# Agrarian Futures Evidence Ledger Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the working Agrarian Futures interface as a governed Philly Civic AI product surface, then make its externally verifiable claims traceable before public deployment or policy use.

**Architecture:** `MelodicBloom/philly-civic-ai` is the canonical repository. The React application remains an additive presentation layer. The next increment adds a small machine-readable claim/evidence layer beside it; Vercel remains a downstream preview/deployment surface, not the source of truth.

**Tech Stack:** Vite 8, React 19, Tailwind CSS 3, Node 22+, npm lockfile, JSON Schema, Node validation scripts, GitHub Actions, Termux Chromium visual validation.

**Spec:** `docs/web/AGRARIAN_FUTURES_ARCHITECTURE.md`

## Global Constraints

- Preserve existing Philly Civic AI Markdown personas, grant materials, and context sources as canonical civic knowledge.
- Never promote proposals, candidate partners, simulated telemetry, narrative framing, or hypotheses into verified evidence without receipts.
- Do not invent sources to make the ledger complete.
- Keep the web application additive and independently buildable.
- Keep `package-lock.json` committed and use `npm ci` in CI.
- Keep GitHub Actions dependencies pinned by immutable SHA.
- Do not commit Termux screenshot directories unless a later evidence policy explicitly requires binaries in Git.
- Deployment is downstream of repository validation and evidence-state review.

---

## Preserved checkpoint

- Canonical repository: `MelodicBloom/philly-civic-ai`.
- PR #2, `Add Agrarian Futures policy interface and visual validation`, merged to `main` at merge commit `057fac7471cea494524cd7124d81b7595c8355fe`.
- The merged application includes the Vite/React/Tailwind scaffold, committed npm lockfile, pinned CI, responsive interaction, and Termux Chromium visual-audit tooling.
- GitHub Actions run #3 passed dependency install, ESLint, and the production Vite build before merge.
- The operator ran the Termux visual audit and reported the mobile, tablet, and desktop views good.
- A checked MelodicBloom Vercel project listing did not contain a project linked to `MelodicBloom/philly-civic-ai`; do not silently deploy through another project.

## Canonical-home determination

### Canonical product/code/evidence home

`MelodicBloom/philly-civic-ai`

Why:

1. The repository already defines itself as MelodicBloom's Philadelphia policy and planning layer, including regenerative infrastructure, land use, grant/policy work, and a planned ecological-restoration / urban-agriculture persona.
2. Agrarian Futures is primarily a policy, governance, measurement, coalition, and bioregional-infrastructure product, so it belongs in that boundary.
3. `MelodicBloom/adriens-farm` is an adjacent ecological-literacy/storytelling product; it should cross-link, not own policy/MRV logic.
4. Beats & Boxes is an adjacent cultural/community activation node; it can participate as a use-case or coalition pathway without becoming the canonical implementation home.
5. Vercel should host generated previews/production deployments only after an intentional repository binding. It is delivery evidence, not provenance authority.

### Canonical internal boundaries

- `README.md`, `personas/`, `grant-toolkit/`, and existing context documents: civic knowledge and operating context.
- `src/`: interactive presentation/product surface.
- `src/data/articles.jsx`: current editorial source for six Agrarian Futures essays, but not the future evidence authority.
- `docs/web/AGRARIAN_FUTURES_ARCHITECTURE.md`: architecture and evidence-state contract.
- `docs/superpowers/plans/`: bounded continuation plans and handoffs.
- **Next proposed evidence home:** `data/agrarian-futures/`.

## Outcome / output profile

### Outcome now achieved

A working, responsive policy-system demonstrator turns a large regenerative-agriculture thesis into a navigable civic product. It connects narrative, governance/MRV concepts, a Delaware Valley pilot framing, coalition/research pathways, and simulated telemetry without forcing the underlying civic knowledge base into UI code.

### Concrete outputs

- Ecosystem Hub / sitemap.
- Six-part editorial narrative.
- Blueprint diagram of the governance/evidence architecture.
- Ag-Tech telemetry interaction surface with non-live/simulated framing where applicable.
- Mobile navigation, responsive layouts, accessible controls, and reduced-motion support.
- Static production build suitable for a later Vercel project binding.
- GitHub Actions lint/build validation.
- Termux Chromium visual audit across mobile, tablet, and desktop.
- Architecture documentation distinguishing verified evidence, simulations, proposals, candidates, and narrative framing.

### Not yet achieved

- No live farm telemetry ingestion.
- No validated Nutrient Density Index standard.
- No clinical or epidemiological evidence engine.
- No proof of active partnerships with named organizations.
- No production procurement/subsidy decision engine.
- No source-complete public policy publication.

## Use-case profile

### UC-1 — Civic policy explainer

**User:** resident, organizer, planner, funder, policy researcher.

**Job:** understand how regenerative agriculture, water, food quality, incentives, and community governance could fit together as one system.

**Current proof:** Ecosystem Hub + editorial + blueprint.

**Success signal:** readers can identify proposed actors, flows, evidence states, and decision points without confusing hypotheses with settled facts.

### UC-2 — Coalition alignment artifact

**User:** farms, utilities, schools, community organizations, researchers, cultural partners.

**Job:** discuss a Delaware Valley pilot using one shared system map while keeping candidate participation distinct from confirmed partnership.

**Current proof:** Delaware Valley Loop, coalition/research pathway cards, governance stack.

**Success signal:** each stakeholder can identify a bounded role, dependency, measurement obligation, and unresolved question.

### UC-3 — MRV / procurement concept demonstrator

**User:** civic technologist, procurement lead, grant reviewer, measurement researcher.

**Job:** inspect how measurements could become auditable decisions through standards, provenance, uncertainty, and governance.

**Current proof:** NDI editorial, governance/MRV stack, blueprint, telemetry surface.

**Success signal:** the product makes clear that labels alone are insufficient and that measurements need calibration, chain of custody, uncertainty, and review.

### UC-4 — Research intake / evidence-governance precursor

**User:** researcher or evidence reviewer.

**Job:** distinguish source-backed observations from hypotheses, proposed mechanisms, simulations, and rhetoric.

**Current proof:** evidence-state language exists, but many claims remain embedded directly in editorial JSX.

**Success signal after the next increment:** every externally verifiable claim in the bounded coverage set has a stable claim ID and explicit evidence state.

### UC-5 — Portfolio / capability proof

**User:** employer, client, collaborator, funder.

**Job:** quickly see integrated research synthesis, service/system design, front-end implementation, evidence governance, visual QA, and civic-product thinking.

**Current proof:** working interface + interaction + CI + architecture/validation receipts.

**Success signal:** the artifact demonstrates executable systems thinking rather than relying on explanatory prose alone.

## Next bounded action — Claim/Evidence Ledger v0

### Why this is next

The UI is functional and visually validated. The largest integrity risk is now evidence handling: quantitative, scientific, financial, political, and institutional statements are embedded directly in `src/data/articles.jsx`. Public deployment before separating claim state from prose could make unverified material look authoritative.

### Scope

Create a machine-readable ledger for externally verifiable Agrarian Futures claims and a dependency-free validator. Cover **only Article 0 (Economics) and Article 3 (Verification)** in this increment.

Do not source every article, redesign the UI, add a database, contact partners, or deploy production in this task.

### Files

- Create `data/agrarian-futures/claim-ledger.schema.json`
- Create `data/agrarian-futures/claim-ledger.json`
- Create `scripts/validate-claim-ledger.mjs`
- Create `docs/web/AGRARIAN_FUTURES_EVIDENCE_LEDGER.md`
- Modify `package.json`
- Modify `.github/workflows/web-validate.yml` only if the existing `npm run validate` entrypoint does not already cover the new validator.

### Evidence contract

Stable IDs: `AF-ECO-001`, `AF-SCI-001`, `AF-POL-001`, `AF-MRV-001`, etc.

Allowed evidence states:

- `verified`
- `sourced_unreviewed`
- `source_required`
- `hypothesis`
- `proposal`
- `simulated`
- `narrative`

Required fields:

- `id`
- `claim`
- `domain`
- `evidence_state`
- `source_required`
- `jurisdiction`
- `date_scope`
- `units`
- `method`
- `uncertainty`
- `review_status`
- `article_id`

Optional source fields must remain empty until independently checked: `source_title`, `source_url`, `source_date`, `source_locator`.

A record marked `verified` must fail validation unless all required source metadata is non-empty.

## Task 1 — Contract and negative tests

- [ ] Define the JSON Schema and evidence-state enum.
- [ ] Implement a dependency-free Node validator using built-in `fs`.
- [ ] Add `--self-test` fixtures that prove duplicate IDs and unsourced `verified` records are rejected.
- [ ] Run `node scripts/validate-claim-ledger.mjs --self-test`.
- [ ] Commit as `feat: define Agrarian Futures claim ledger contract`.

## Task 2 — Bounded claim extraction

- [ ] Extract externally verifiable claims from Article 0 and Article 3 only.
- [ ] Include quantitative claims, named standards/markets/institutions, and proposed NDI mechanisms.
- [ ] Label uncertain material conservatively; never infer `verified` from confident prose.
- [ ] Run `node scripts/validate-claim-ledger.mjs` and require PASS.
- [ ] Document coverage and explicitly list Articles 1, 2, 4, and 5 as out of scope.
- [ ] Commit as `data: add bounded Agrarian Futures claim ledger v0`.

## Task 3 — Normal validation gate

- [ ] Add `"claims:validate": "node scripts/validate-claim-ledger.mjs"` to `package.json`.
- [ ] Make `npm run validate` execute claim validation before lint/build.
- [ ] Avoid duplicating the command in GitHub Actions if the workflow already calls `npm run validate`.
- [ ] Run `npm ci && npm run validate`.
- [ ] Skip a redundant visual audit if no `src/` or CSS files changed.
- [ ] Commit as `ci: enforce Agrarian Futures claim ledger validation`.

## Definition of done

- Ledger schema exists.
- Ledger v0 covers Article 0 and Article 3 only.
- No unsourced record can be marked `verified`.
- Duplicate IDs and invalid evidence states fail validation.
- `npm ci` succeeds from the committed lockfile.
- `npm run validate` passes locally and in GitHub Actions.
- No unrelated UI redesign, database, hosted service, or invented source is introduced.
- Follow-up PR remains reviewable and its description records coverage, exclusions, CI result, and next unresolved evidence work.

## Stop conditions

Stop and report rather than improvising if:

- a proposed source cannot be independently verified;
- classifying a claim requires deciding a disputed causal relationship;
- the task would require a database, hosted service, authentication system, or paid API;
- implementation would require rewriting the six-article narrative;
- a Vercel project is discovered that is bound to a different canonical repository;
- the working branch cannot be fast-forwarded safely.

## Git / push readiness

Start from the dedicated follow-up branch:

```bash
cd ~/philly-civic-ai
git fetch origin
git switch handoff/agrarian-futures-evidence-ledger-v0
git pull --ff-only origin handoff/agrarian-futures-evidence-ledger-v0
git status --short
npm ci
npm run validate
```

Expected before implementation: clean working tree and passing validation.

After each bounded commit:

```bash
git status --short
git log -3 --oneline
git push origin handoff/agrarian-futures-evidence-ledger-v0
```

Do not merge the follow-up PR until the new CI result is reviewed and the operator explicitly requests merge.
