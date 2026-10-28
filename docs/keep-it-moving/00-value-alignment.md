# Keep It Moving Philly pre-build value alignment and platform goals

**Status:** Draft concept, 28 October 2026. **Proposed home:** `MelodicBloom/philly-civic-ai`, `docs/keep-it-moving/` on `feature/keep-it-moving-philly-concept-v0`. **Public-facing name:** Keep It Moving Philly. **Descriptor:** A local material commons for repair, reuse, learning, and accountable handoffs. **Suggested tag:** `#KeepItMovingPhilly` (availability and collisions to verify before launch).

## Decision

Build a Philadelphia-first, educational and action-oriented companion to the existing Keep It Moving visual prototype. Four material cards become four destinations: Learn and repair, Find a next handoff, See the material ledger and take action, and Explore the creative studio. A shared journey connects learning, a voluntary survey, a personal action scorecard, verified local routes, a share kit, and a moderated community board. Start with curated content and a manual destination directory; add APIs only where they improve a proven visitor task.

The existing private [interactive prototype](https://keep-it-moving-material-workbench.qt-314wink.chatgpt.site) demonstrates visual language, swatch selection, and a launch dialog. It is not an operational directory, ledger, survey, payments service, or community platform. The `philly-civic-ai` repository currently hosts a separate Agrarian Futures React/Vite web app; this branch adds documentation only and does not replace that app. A dedicated repository or app boundary may be appropriate after the concept is validated.

## Why this exists

Textiles can move through several routes: continued use, repair, gifting, resale, donation, creative reuse, or suitable recycling. The visitor's problem is often a missing *next handoff*: what condition is the item in, which route is appropriate, and which local destination actually accepts it? Philadelphia's official Recycling & Donation Finder already offers address, keyword, and material search. The site should make that source easy to reach and add material-specific education and community pathways, not pretend that a general map pin verifies acceptance. [City finder](https://www.phila.gov/recycling-donation-finder/) · [City textile guide](https://www.phila.gov/2020-10-17-textilewaste/).

## Constitution and decision rights

1. **Useful action before engagement.** Every page offers an understandable next step without an account, survey completion, donation, or social post.
2. **Repair and reuse before vague diversion claims.** Recommend a route based on item condition and destination rules. Do not imply every donation is locally reused or every collected textile is recycled.
3. **Learning without extraction.** Survey participation and answer submission are separate opt-ins. A person can learn, get a scorecard, and use the finder without sending answers.
4. **Community as co-author.** Local repairers, reuse organizations, makers, and residents can correct destinations and challenge the language. Editorial and moderation decisions remain reviewable.
5. **Proof before impact language.** The personal scorecard is a transparent planning aid, not a carbon, waste-diversion, virtue, or verified regenerative-impact score. Public claims need a baseline, denominator, provenance, and time period.
6. **No hidden beneficiaries.** Donations name the receiving organization and open its own verified payment route in the first release. Sponsored or affiliate relationships appear beside the relevant link or video, with a plain-language disclosure.
7. **Creative agency and access.** Offer multiple aesthetics, editable share text, keyboard access, reduced motion, readable data views, and non-social alternatives.
8. **Consent and repair.** No automatic hashtag scraping or cross-posting. Creators opt in to the collage, retain attribution and withdrawal routes, and have a way to report misuse.

## Actors, flows, and capacity

| Actor | Value sought | Contribution or burden | Decision right |
| --- | --- | --- | --- |
| Resident / visitor | Clear next route and skills | Time, optional answers, optional location | Skip, withhold, revise, leave |
| Repairer / maker | Appropriate material and fair visibility | Teaching and moderation labor | Approve attribution, decline requests |
| Donation / recycling destination | Suitable material, fewer unsuitable dropoffs | Listing accuracy and intake load | Confirm accepted items and changes |
| Editor / moderator | Trustworthy articles and gallery | Verification and review work | Publish, correct, remove with reasons |
| Cause partner | Support and accountability | Receipts and outcome reporting | Control own donation flow |
| Platform operator | Maintenance and learning | Data protection, accessibility, moderation | Time-limited stewardship, published rules |

**Candidate feedback loop:** an item description and learning prompt → a more informed route choice → a verified handoff or documented obstacle → corrected directory and educational content → better future choices. The desired long-term capacity is local skill, route clarity, and reciprocal material access. It fails if the directory grows stale, the board becomes a source of unpaid moderation labor, or a high score rewards clicks without any material outcome.

## Regenerative capacity hypotheses

These are hypotheses to test with Philadelphia partners, not demonstrated outcomes.

| Domain | Possible gain | Risk or displaced burden | Leading measure | Later evidence needed |
| --- | --- | --- | --- | --- |
| Energy and materials | More items used or repaired | Extra purchases for crafts; shipping and digital overhead | Verified route selections and repair completion reports | Item-level disposition with counterfactual, uncertainty |
| Life and ecosystems | Less inappropriate disposal | Unverified recycling claims, downstream leakage | Acceptance-rule accuracy | Destination processing evidence and relevant impacts |
| Society and culture | Skill exchange and maker visibility | Unpaid labor, appropriation, moderation inequity | Partner participation and correction response time | Partner-defined benefit and burden review |
| Individual agency | More confidence and practical options | Shame, coercive scoring, inaccessible instructions | Comprehension, skip success, task completion | Follow-up interviews and observed action, opt-in |

**Protected thresholds:** no precise location stored with survey responses; no identifiable public response row; no public collage post before moderation and rights confirmation; no unverified destination represented as accepting a material. Stop or roll back a feature if these fail. A single weighted “impact” total must not hide harm in any domain.

## Scope and options

| Path | Benefit | Cost and risk | Decision |
| --- | --- | --- | --- |
| Leave the static prototype as is | Preserves a compelling visual demonstration | Cards do not lead to a real action | Keep as reference, extend |
| Build every API, feed, payment, and social integration at once | Broad feature surface | High cost, platform approval, moderation and privacy burden before demand is proven | Defer |
| Build a curated, consent-first vertical slice | Test the complete visitor journey with small operational dependencies | Manual editorial and destination maintenance | **Recommended** |

**First release boundary:** four navigable pages, a static evidence-backed article, a curated video modal, an optional client-side scorecard, a 5–10 step checklist, a City-finder handoff and verified small directory, a share-card composer, and manually moderated submissions. Public aggregates, automatic feeds, payments, and third-party account posting wait for separate proof and governance.

## Evidence and open decisions

- The City's textile guide says textiles do not belong in curbside recycling; the current acceptance of any particular destination must be checked before listing. [Source](https://www.phila.gov/2020-10-17-textilewaste/).
- Browser geolocation requires user permission and HTTPS. A ZIP or neighborhood search must work without it. [Source](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation).
- Web Share can pass text, URLs, and sometimes files to a user-chosen app, but support varies; keep download/copy fallbacks. [Source](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API).
- Before a public pilot, decide the first material stream, editorial owner, moderator capacity, destination verification cadence, survey retention, partner permission, and whether a dedicated repository is warranted.

## Proof status

**Concept:** this document and design proposal. **Demonstrated:** private visual prototype and local interaction checks. **Unproven:** user need, route accuracy, data privacy implementation, scorecard usefulness, partner benefit, moderation load, and material outcomes. Do not call the platform regenerative or claim diverted tonnage from the prototype.
