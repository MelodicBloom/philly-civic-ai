# Agrarian Futures Evidence Source Pack v0

**Purpose:** Give evidence-review agents authoritative starting points for the bounded Claim/Evidence Ledger without silently promoting claims to `verified`.

**Coverage:** Article 0 (Economics) and Article 3 (Verification / NDI) only.

**Rule:** A source listed here is a *candidate evidence input*. The ledger state changes only after an agent checks claim wording, population, date, jurisdiction, units, method, and an exact source locator.

## Promotion rule

Use this order:

1. `source_required` — no checked source yet.
2. `sourced_unreviewed` — a concrete source and locator have been captured, but the claim has not passed independent evidence review.
3. `verified` — only after a second review confirms the source directly supports the claim as written and all required source metadata is complete.

A source can support a `hypothesis` or `proposal` without changing that evidence state. Do not force every sourced record into `verified`.

## Economics candidates

### AF-ECO-001 — 2024 median income from farming: -$1,830

Primary candidate:

- USDA Economic Research Service, **Farm Household Income Estimates**
- https://ers.usda.gov/topics/farm-economy/farm-household-well-being/farm-household-income-estimates
- The current ERS page reports median household income from farming of **-$1,830 in 2024**.
- Review must preserve ERS's population definition: farm operator households / farm households under USDA definitions. Do not rewrite this as all U.S. farmers or all farm businesses.

Promotion candidate after locator check: `sourced_unreviewed`, then `verified` only after independent review.

### AF-ECO-002 — Chapter 12 filings rose 55% in 2024

Strong secondary pointer:

- American Farm Bureau Federation, **2024 Farm Bankruptcies Highlight Worsening Farm Credit**
- https://www.fb.org/intel/markets/2024-farm-bankruptcies-highlight-worsening-farm-credit
- Reports 216 Chapter 12 farm bankruptcies in 2024, up 55% from 2023, and attributes the data to U.S. Courts.

Primary-source target:

- U.S. Courts, **Federal Judicial Caseload Statistics 2024**
- https://www.uscourts.gov/data-news/reports/statistical-reports/federal-judicial-caseload-statistics/federal-judicial-caseload-statistics-2024

Do not promote to `verified` from the Farm Bureau article alone. Locate the U.S. Courts Chapter 12 table / annual filing counts first and record the exact table or row locator.

### AF-ECO-003 — U.S. farm sector debt: about $563 billion in 2024

Primary candidate:

- USDA Economic Research Service, **Farm Income and Wealth Statistics — Current/non-current balance sheet**
- https://data.ers.usda.gov/reports.aspx?ID=4056
- Current ERS series lists 2024 farm sector debt as **563,478,716 in $1,000 units**, i.e. approximately **$563.48 billion**.

Important: ERS revises historical estimates. Record the retrieval/release date and the table locator so the ledger preserves which revision supported the claim.

Promotion candidate after locator check: `sourced_unreviewed`, then `verified` after independent review.

### AF-ECO-008 — organic corn yields 31% higher in drought years

Institutional research candidates:

- Rodale Institute, **Farming Systems Trial**
- https://rodaleinstitute.org/science/farming-systems-trial/
- Rodale reports organic corn yields were 31% higher than conventional production in drought years.

- Rodale Institute, **Farming Systems Trial: 30-Year Report**
- https://rodaleinstitute.org/wp-content/uploads/fst-30-year-report.pdf

Research trail:

- Rodale's current materials point back to long-running Farming Systems Trial evidence and associated peer-reviewed studies. Prefer the underlying study / trial dataset for final verification rather than relying only on a promotional summary.

Keep `source_required` or move to `sourced_unreviewed` only after the exact drought definition, years, crop system, comparator, and locator are captured.

## Verification / spectroscopy candidates

### AF-MRV-005 — spectral fingerprints can estimate food composition using calibrated models

Research review:

- **The Use of Infrared Spectroscopy for the Quantification of Bioactive Compounds in Food: A Review**
- https://pmc.ncbi.nlm.nih.gov/articles/PMC10096661/
- The review summarizes calibration/validation sets, independent test sets, R², RMSECV, RMSEP, matrices, analytes, and model methods across food applications.

Recent broad review:

- **Near-Infrared Spectroscopy in Food Analysis: Applications, Chemometric Strategies, and Technological Advances**
- https://pmc.ncbi.nlm.nih.gov/articles/PMC13206098/
- Useful for model robustness, calibration transfer, matrix interference, and practical food-analysis boundaries.

These sources support feasibility and research framing; they do not validate the proposed NDI implementation. Keep the claim `hypothesis` until commodity-specific calibration and reference methods are defined.

### AF-MRV-007 — R² alone is insufficient for procurement-grade evidence

Review candidate:

- **The Role of Near-Infrared Spectroscopy in Food Quality Assurance: A Review of the Past Two Decades**
- https://pmc.ncbi.nlm.nih.gov/articles/PMC11544831/
- The review treats calibration and validation with multiple metrics, including R²/Q², RMSEC/RMSECV/RMSEP, RPD, and bias.

This is useful support for the narrower methodological statement that predictive validation should not be reduced to R² alone. It does **not** by itself define a legally sufficient procurement standard. Keep the ledger state conservative.

## Agent retrieval priorities

When evidence-review agents have limited time, resolve in this order:

1. AF-ECO-001 — strong USDA primary candidate.
2. AF-ECO-003 — strong USDA primary candidate with revision caveat.
3. AF-ECO-002 — resolve the primary U.S. Courts table behind the 55% secondary claim.
4. AF-ECO-008 — locate the exact Farming Systems Trial study / drought definition.
5. AF-MRV-005 — map feasibility literature to the proposed measurement mechanism without overclaiming.
6. AF-MRV-007 — document accepted validation metrics and keep procurement sufficiency separate.

## Evidence receipt required from each source-review subagent

Return one compact record per claim:

```json
{
  "claim_id": "AF-ECO-001",
  "source_authority": "primary|secondary|review",
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
  "recommended_state": "source_required|sourced_unreviewed|verified|hypothesis|proposal",
  "reason": ""
}
```

No agent may set `recommended_state: "verified"` when `supports_claim_as_written` is false, the exact locator is missing, or a material population/date/unit mismatch remains.
