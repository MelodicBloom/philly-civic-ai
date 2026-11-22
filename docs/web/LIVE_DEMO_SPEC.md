# Agrarian Futures — live demo specification v0.1

**Status:** Design and engineering proposal, 21 November 2026. This document specifies a reviewable vertical slice and a staged public release. The two generated concept sheets are composition studies, not data graphics or approved final assets.

## 1. Purpose and testable promise

**Question:** What can a field tell a city, and what evidence is still needed before a public decision follows?

In 90 seconds a first-time visitor should be able to (1) follow a soil-to-water-to-food-to-civic-decision pathway, (2) distinguish a measured indicator from a plausible mechanism and an untested proposal, (3) inspect a source and a limitation, and (4) choose one useful next step. A portfolio reviewer should be able to inspect the React state, SVG rendering, provenance schema, responsive layout, performance receipt, and accessible fallback.

The site must not say that a farm, sensor, research partner, policy program, pledge campaign, or newsletter is operating when it is only proposed. It must not infer that soil management caused a change in ADHD, autism, infertility, or other disease incidence. The current editorial contains claims that do not meet the publication gate; those articles remain working manuscripts until each assertion is reviewed or rewritten.

### The decision tree visitors can see

| Ask | If yes | If no or unknown |
| --- | --- | --- |
| Is this an observation from a named population, time, method, and source? | Draw a solid trace and show the measured value with its units and limits. | Continue as a question; do not draw a measurement. |
| Does the observation support the stated relationship? | Draw a dashed connection, name the study design and confounders. | Label the connection as a hypothesis and name a discriminating test. |
| Is a response feasible and owned by someone? | Show a dotted proposed action with owner, cost, and success measure. | Show an invitation to co-design, not a claim of adoption. |
| Is the action already in operation? | Show an accountable outcome and dated update. | Keep it as a proposal with no success counter. |

Each scene asks a deeper question that can change the design. *Which soil indicator?* leads to *at what depth, site, season, and comparison?*; *which water outcome?* leads to *what upstream contribution and confounders?*; *which food measurement?* leads to *what cultivar, nutrient assay, and dietary relevance?*; *which civic decision?* leads to *who benefits, pays, and can challenge the inference?* This question tree is visible as expandable “What would change this conclusion?” prompts rather than hidden reasoning.

## 2. Existing implementation and baseline receipt

| Existing component | Demonstrated in `main` | Limit to address |
| --- | --- | --- |
| `src/App.jsx` | React 19/Vite editorial hub, hash navigation, six article views, blueprint and telemetry tabs | Hub gives equal weight to many ideas; current article copy includes unsupported causal and numerical claims. |
| `src/components/BlueprintDiagram.jsx` | A policy-system schematic and metric comparison | Fixed minimum width of 800px forces horizontal scrolling on narrow screens; causal arrows lack provenance. |
| `src/components/TopographyMap.jsx` | CSS/SVG topographic texture and changing readouts | `Math.random()` values, “Live Field Telemetry,” pulsing “SAT LINK” and hover-only labels can imply a real feed despite the footer saying simulated. |
| `src/components/FlipCard.jsx` | A reveal pattern for explanatory concepts | Essential evidence should be visible without flipping or hover. |
| `scripts/visual-audit.mjs` | Screenshot and overflow checks at 390, 820, and 1440px on four views | Extend to keyboard, reduced motion, 320px, source links, story states, and output assertions. |

**Measured local baseline on 21 November 2026:** `npm ci` succeeded; `npm run validate` passed ESLint and Vite build. The production output reported 251.59 kB JavaScript (77.63 kB gzip), 47.83 kB CSS (8.17 kB gzip), and a 0.60 kB HTML file. These are bundle sizes, not field performance or a mobile load benchmark. A public deployment has not been verified.

## 3. Information architecture and storyboard

The first route is `#story`. Its title is a question, not a conclusion. A persistent small legend defines line styles once and repeats status in text. A “skip story / inspect sources” route serves visitors with limited time. The navigation keeps the existing hub and blueprint as a secondary exploratory library. Manuscripts are gated for review before a public release.

| Scene | Message / question | Main graphic | Evidence state | Next action |
| --- | --- | --- | --- | --- |
| 0. Orientation | What can a field tell a city? | Field-to-city trace with four directly labeled nodes | Each edge has its own state | Start or jump to sources |
| 1. Soil | What can a soil test actually observe? | Sectioned soil core and indicator selector | NRCS indicators are contextual guidance, not field data for this project | Open measurement protocol |
| 2. Water | How might soil structure affect infiltration and runoff? | Two-condition comparison aligned to the same rainfall input; no invented outcome percentages | Mechanism / scenario, not a local outcome | Inspect assumptions |
| 3. Food | Does a farm practice change measured nutrient composition? | Paired sample schematic and uncertainty interval placeholder, populated only with eligible data | Open question; no health-effect causal arrow | See study-design gate |
| 4. Evidence | What survives a source and method check? | Claim card flips between statement, source, method, uncertainty, and counterevidence using explicit tabs | Reviewed source state | Open original source and ledger |
| 5. Decision | What would a Delaware Valley pilot measure and who decides? | Proposed roles and upstream/downstream dependency map | Proposal | Offer feedback, field data, or a pilot conversation |
| 6. Participation | Which next step fits the visitor? | Distinct paths for reading, research, local collaboration, pledge, and updates | Honest status on each path | Confirm an intentional action |

**Motion grammar:** Scroll reveals a new causal step; the trace extends only when that step enters view. Scrolling never changes a chart value. A stepper provides the same scene order and replay. The comparison slider moves a mask between two *labeled scenarios*, not between photographs that imply a documented site transformation. Buttons named “Show condition A/B” make the comparison available without dragging. Charts retain visible axes, units, denominators, date span, sample count, and direct labels. No 3D bars, dual-axis persuasion, or map that suggests an unmeasured geographic footprint.

### Content script, first 45 seconds

1. “What can a field tell a city?” A soil core appears, with a line to the watershed. “Some changes are observable. Others require a careful comparison.”
2. “Start with indicators.” Soil organic matter, infiltration, bulk density, and aggregate stability are selectable examples; the screen says *no local field measurements are connected*.
3. “Follow the water.” The same rain input enters two explicitly simulated conditions. The animation changes a diagram, not a forecast. The visitor can inspect which assumptions were changed.
4. “Where does the evidence stop?” The line toward nutrient composition becomes dashed. A card asks for paired samples, assays, and a credible comparison. The line toward human-health outcomes is withheld.
5. “What could a city test?” A proposed pilot lists a steward, sampling protocol, consent, funding, and a decision threshold, then invites a concrete contribution.

### Media plan

- **Launch media:** SVG soil profile, watershed/path illustration, original line icons, captioned static storyboard, and a 60–90 second optional narrated explainer. Text transcript is the canonical content.
- **Video:** Six short shots aligned to the scenes above. Show sampling and decisions as proposed or illustrative unless footage and consent establish a real event. On-screen text and narration draw from the approved claim ledger. Provide captions, transcript, poster, and a no-video path. No autoplay.
- **Generated imagery:** Background illustration can suggest soil texture and landscape. Numerical marks, source labels, city boundaries, partner names, and policy status remain editable, data-bound UI. Every generated asset has a prompt/version, license or usage status, alt-text purpose, and human review receipt. Avoid fabricated documentary photographs.
- **Editorial thumbnails:** One crop and icon per chapter, consistent focal point and title-safe area. Thumbnails identify subject matter; they do not pre-endorse an unreviewed claim.

## 4. The visual signature, “Trace Thread”

One semantically encoded contour thread connects scales: soil pore → field → watershed → food sample → civic choice. It is an original way to show both path and epistemic status. A solid line is a recorded observation with a source. A dashed line is an inferential connection with assumptions. A dotted line is a proposed intervention. A broken endpoint is an unanswered question. Shape and text repeat status so color is never the only key.

**Determinism contract:** A visual is a pure function of `storyVersion`, `datasetVersion`, `sceneId`, and explicit controls. Generated noise uses a fixed documented seed, never `Math.random()` at render time. Reopening the same URL with the same versions and controls produces the same marks and accessible table. A time animation interpolates between authored states; it does not generate values. Export a still frame and plain-language data table for every chart. The trace is an explanatory relationship, not a claim of a physically connected local water or food supply chain.

### Style tokens and component anatomy

| Token / element | Specification |
| --- | --- |
| Surface | Warm paper `#F6F2E9`, charcoal ink `#232B27`, forest `#173D32`, river `#376C82`, clay `#A4573F`; verify text contrast in actual rendering. |
| Type | Editorial serif for one question title per scene; restrained sans for reading; tabular mono for source IDs, units, and method tags. No tiny text for required evidence. |
| Grid | Desktop reading column 70–78ch with an evidence rail; mobile one column with key graphic and takeaway before controls; fluid spacing, no fixed-width canvas. |
| `TraceThread` | SVG path, endpoint labels, state-specific stroke, `<title>` and nearby textual sequence. Static visible path in reduced motion. No quantitative meaning from stroke width. |
| `EvidenceChip` | Text status plus shape: Observed, Inferred, Proposed, Simulated, Unreviewed, or Unknown. State is derived from the claim record, never set by a decorative component. |
| `SourceCard` | Claim ID, exact wording, population, place, time, unit, method, source and locator, uncertainty, last review, counterevidence, open-original link. Empty fields display “Not yet recorded.” |
| `ScenarioComparator` | Two named conditions, shared input, direct labels, draggable handle, buttons and arrow-key alternative, reset, and a static side-by-side state. No implication of before/after observation. |
| `ChapterRail` | Six labeled destinations, active scene, scroll progress as secondary cue, complete keyboard navigation. The browser scrollbar remains native. |
| `QuestionDrawer` | “What would change this conclusion?” opens the test and missing evidence. It never obscures the source card on small screens. |
| `ActionCard` | One action, owner, destination and state. A pledge and email signup are different consent flows with different storage and confirmation. |
| Buttons / icons | Primary filled action, quiet outlined secondary, text link. Soil core, infiltration, sample, ledger, and civic forum icons use a 24px SVG viewBox, 1.75px rounded strokes and consistent optical bounds; labels accompany icons. |
| Focus / touch | Visible 2px focus ring with offset; 44×44 CSS-pixel comfortable targets; no hover-only evidence, drag-only control, or hidden tap hotspots. |

**Illustration and motion:** Native SVG handles scalable paths, masks, line drawing, and texture layers. CSS and IntersectionObserver reveal scene transitions; on reduced motion, all essential content is immediately visible. React Three Fiber and Drei are reserved for an optional 3D soil cutaway only if depth, occlusion, or camera inspection explains a physical structure better than SVG. Drei is a helper for Three.js scenes, not an SVG renderer. A 3D enhancement must have a static SVG/text equivalent, lazy loading, bounded device pixel ratio, context-loss handling, and explicit disposal of allocated GPU resources. It cannot be required to read a source or complete an action.

**Sound:** Off by default. One explicit “Play sound” control unlocks a short, low-level soil/water transition cue, with pause, mute, caption/description, and no persistence of audio preference beyond the session without consent. Never use sound as the only evidence of a state. An AudioContext starts on a user gesture and is suspended or closed on exit. The first slice can ship silently while the sound asset and consent review are pending.

## 5. Data and provenance orchestration

Records are versioned and checked before publication. A renderer receives an immutable approved claim projection, not arbitrary article prose. A single claim may support a chart mark and a paragraph; both resolve to the same ID. Every edge in the pathway has its own status.

```ts
type Status = 'observed' | 'inferred' | 'proposed' | 'simulated' | 'unreviewed' | 'unknown';
type Claim = {
  id: string; statement: string; status: Status;
  subject: string; geography: string; period: string;
  measure?: { value: number; unit: string; denominator?: string; interval?: [number, number] };
  method: string; uncertainty: string; limitations: string[];
  sources: { title: string; url: string; date: string; locator: string; checkedAt: string }[];
  counterevidence?: string[]; reviewer?: string; reviewedAt?: string;
};
type Link = { from: string; to: string; status: Status; claimIds: string[]; testNeeded?: string };
type Scenario = { id: string; version: string; seed: string; inputs: Record<string, string | number>; assumptions: string[] };
```

Publication validation rejects an `observed` claim with no source, method, period, geography, or units. It rejects a chart whose units, sample, or baseline are missing. `inferred` requires an explicit study design and limitation; `proposed` requires an owner and test; `simulated` carries visible input assumptions and a “not observed” label. A source URL is not verification until its locator and claim match are reviewed. Record source snapshot/check date, but keep the original URL clickable. The ledger and page build publish together with a version and commit SHA, allowing an exact reproduction or correction receipt.

**Initial evidence floor:** USDA NRCS describes soil health through physical, chemical, and biological indicators including organic matter, infiltration and bulk density. This supports choosing indicators, not a local outcome or downstream disease effect. A historical organic-versus-conventional nutrient systematic review in the USDA National Agricultural Library reports broadly comparable nutrient content under its reviewed study set, a useful counterweight to a one-way “nutrient decline” story. The initial site can ask how a paired local food study would be designed, but cannot assert one exists.

## 6. Runtime and accessibility architecture

Keep the current Vite + React static runtime. A route/scene registry and typed content records (TypeScript in a later migration, or checked JSON schema now) separate presentation from claims. Lazy-load the optional 3D and video modules. Scroll updates a `sceneId` state with IntersectionObserver, while a direct stepper and URL query/hash state give deterministic deep links. A `prefers-reduced-motion` listener sets still-frame behavior. A static `noscript` story and source index cover JavaScript failure.

Component hierarchy: `AppShell` → `StoryRoute` → `ChapterRail` + `StoryScene` → `TraceThread` / `ScenarioComparator` / `ClaimGraphic` + `EvidenceInspector` → `SourceCard` → `ActionCard`. An `AssetManifest` maps visual assets to purpose, creator/license, alt text and version. A `ContentRegistry` maps stories and chapters to claim IDs. Engagement providers are adapters, isolated from the editorial renderer.

**Responsive states:** 320, 390, 768/820, 1024, and 1440px. At 320px the graphic precedes the inspector, controls become full width, chart labels wrap or use a vertical small multiple, and the native page scroll remains intact. Tablets can put the evidence inspector below the graphic. On touch, tap selects, a second tap opens details, and explicit step buttons substitute for hover or precision dragging. A narrow network or disabled animation still conveys the same claim.

## 7. Engagement without false social proof

- **Pledge:** A short, specific statement such as “I will take one documented step to support healthier soil and more transparent food evidence in my community.” Let a person choose `learn`, `measure`, `participate`, or `support`. Preview the exact text and data use before signing. If identity verification, moderation, storage, retention and deletion are not implemented, use a downloadable personal pledge and do not display a public signature counter.
- **Newsletter:** Separate, unchecked opt-in with a named provider, privacy text, double opt-in, unsubscribe and verified confirmation callback. An unconnected input must say “Updates are being prepared” instead of implying submission succeeded. Never conflate newsletter consent with a pledge.
- **Outreach:** A role-specific, mailto or contact path for farmer, researcher, civic institution and neighbor. Candidate organizations are labeled “possible contacts” until they consent to affiliation. Avoid presenting an unconfirmed partner logo.
- **Blog / updates:** Dated field notes with status, authorship, correction history, and “what changed since last version.” Each newsletter issue points to a stable article URL and source ledger.
- **Participation feedback:** Ask “What observation would most change this proposal?” and route feedback to a moderated intake with consent. Public comments only after moderation and retention policy exist.

## 8. Benchmarks, receipts, and release gates

These are targets and test methods, not achieved field results. The baseline above is only a bundle/build receipt.

| Gate | Target and method |
| --- | --- |
| Meaning | Five first-time readers: at least four can identify the observed, inferred and proposed layers and one missing test after 90 seconds, without coaching. Record misreadings and revise labels. |
| Provenance | 100% of displayed quantitative values and causal links have a claim ID, visible status and source/method or a visible “simulated”/“unreviewed” boundary. Automated schema and link checks plus manual editorial review. |
| Loading | Aim for p75 mobile LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 after launch using field measurement; lab runs on a defined mid-range mobile/network profile, three repetitions, recording medians and raw traces. |
| Bundle | First slice ≤90 kB gzip initial JavaScript and ≤12 kB gzip CSS, measured from Vite output; lazy 3D/media must not inflate initial JS. Baseline JS 77.63 kB and CSS 8.17 kB gzip. A changed threshold needs an explicit tradeoff receipt. |
| Animation | Target 60 fps on a specified mid-range mobile device in motion scenes, 30 fps floor under the declared stress case; log p50/p95 frame time and long tasks. Stop offscreen animation. No claim from SwiftShader/headless rendering about real GPU performance. |
| Responsive | No unintended page horizontal overflow at 320, 390, 820, 1024 and 1440px. Every chart and evidence card readable at 200% zoom. Screenshot and manual touch checks. |
| Accessibility | WCAG 2.2 AA review, keyboard and screen-reader walkthrough, focus order, accessible names, contrast and reduced-motion states. Use 44px comfortable touch targets as an internal goal. |
| Media | Explicit play, captions, transcript, poster, no autoplay sound, and text alternative. Test no media, blocked media and slow network. |
| Stability | No uncaught errors or unhandled rejection on route changes, rapid scene switching, pause/resume, navigation or WebGL context loss (if 3D exists). |
| Consent | Pledge/newsletter cannot produce a success state without a provider receipt; double opt-in and deletion/retention flows tested before enabling collection. |

The technical acceptance suite extends `visual-audit.mjs`, runs `npm run validate`, then checks browser states at three viewports and reduced motion. A human reviews every chart, source link, mobile screenshot and public claim. Store the screenshots, audit JSON, source-ledger version, build output, test device/profile and commit SHA as a release receipt. “Passed” is claimed only for gates actually run.

## 9. Delivery sequence and release boundary

1. **Evidence and language gate:** Import the existing Article 0/3 evidence work after review; inventory Articles 1/2/4/5, rewrite unsupported numerical and medical causality, and keep unreviewed material out of the public route. Reconcile the open PRs in dependency order.
2. **Reviewable vertical slice:** Build `#story` with scene 0–2, deterministic SVG trace, soil indicator selector, two-condition scenario, source inspector, reduced-motion and mobile states. Record before/after screenshots, bundle change and audit. No fake telemetry.
3. **Full editorial:** Add food, evidence and civic scenes, direct-label charts only where eligible records exist, source ledger, storyboard video, captions and transcripts. Keep an explicit open-question state for unsupported relationships.
4. **Engagement:** Connect a selected pledge and newsletter service only after form copy, consent, security, moderation and ownership are defined. Until then offer a no-data downloadable pledge and a contact route.
5. **Preview and release:** Deploy a Git-connected preview, inspect the actual URL on desktop and mobile, review claim/consent gates, then promote to a public stable URL. Report the URL, commit, release receipt and known limitations. A successful local build is not a live demo.

## 10. Demonstrable engineering decisions for the interview

- “I turned a policy story into a versioned evidence graph. Each relationship has a state, so a measured indicator can remain solid while a food or health implication stays a visible open question.” This is the **specified architecture** until the vertical slice and ledger are implemented.
- “The existing prototype is React and Vite. I found that its simulated telemetry changed with `Math.random()` and carried live-feed language, so the next build replaces that with seeded, declared scenarios and explicit source states.” The first sentence and diagnosis are evidenced in the current code; the replacement is a **planned change** until merged.
- “I use SVG for the causal trace because the marks and labels need crisp scaling, inspection and static fallbacks. I would add Drei only to a physical cutaway that earns its 3D complexity, with lazy load and GPU cleanup.” This is a **design decision**, not a claim that the present site already uses Drei.
- “I benchmark a real device and record the profile. A 77.63 kB gzip JavaScript build is a bundle baseline, not a mobile performance score.” The bundle figure is an **observed local build receipt**.

## References for the evidence floor and benchmarks

- USDA NRCS, Soil Health Assessment: https://www.nrcs.usda.gov/conservation-basics/soil/soil-health/soil-health-assessment
- USDA National Agricultural Library, systematic review summary: https://www.nal.usda.gov/research-tools/food-safety-research-projects/systematic-review-differences-nutrient-content
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- web.dev, Web Vitals thresholds and p75 method: https://web.dev/articles/vitals
