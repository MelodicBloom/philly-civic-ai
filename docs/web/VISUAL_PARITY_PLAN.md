# Agrarian Futures — concept-to-implementation plan

**Status:** implementation specification, 21 November 2026. This compares the two generated concept sheets with the current `#story` prototype on draft PR #6. The sheets are art direction, not evidence, measured charts, photographs of a pilot, or pixel-perfect production layouts. This plan sets an order of work and acceptance criteria; the features below are not claimed as shipped.

## 0. What is missing

| Concept-sheet feature | Current `#story` | Required outcome |
| --- | --- | --- |
| First-frame field-to-city panorama with soil cutaway, watercourse, Philadelphia/civic cue, and food sample | Large headline followed by a small abstract trace; the soil profile is in the next section | One authored panoramic illustration visible in the first viewport, with separately rendered labels and evidence states; a deliberately recomposed mobile version |
| Six sequential visual questions | Four sections: orientation, soil, water, next test | Orientation, soil, water, food, evidence check, decision/participation as distinct scenes, each changing what a visitor can inspect |
| Continuous visual fingerprint | Legend and isolated paths with generic icons | Reusable Trace Thread geometry, statuses, endpoint grammar, scene transitions and source markers; the same meaning in text |
| Dense material and editorial craft | Flat SVG soil layers, CSS water bands, Georgia/system type and Lucide icons | Custom vector illustration layers, restrained texture, specified type scale, optical icon set, branded controls and consistent surfaces |
| Revealing comparison and direct-label graphics | CSS `clip-path` slider; no quantitative chart | Rebuilt labeled comparison and honest chart slots. Populate a quantitative chart only when an eligible ledger record exists. |
| Mobile composition | Desktop content stacks into a long page | Mobile art direction with cropped/repositioned assets, compact chapters, evidence directly after each graphic, and a keyboard/touch equivalent for each reveal |
| Video, sound, active pledge/newsletter | None; private downloadable pledge and GitHub question link | Optional captioned/transcribed media and explicit audio opt-in. Connect forms only after consent, ownership, storage and confirmation are implemented. |

The desired resemblance is a **visual and semantic parity target**, not an instruction to reproduce false numbers or generated pseudo-text. Review at 320, 390, 820, and 1440 CSS pixels with a fixed screenshot set. Judge composition, scale, hierarchy, line semantics, editorial detail and mobile clarity separately.

## 1. Lock the story and evidence contract before artwork

The throughline is: **What can a field tell a city?** Soil indicators can be measured at a defined place and time; water relationships require controlled comparison; food composition needs paired sampling and laboratory methods; a health outcome requires a separate, more demanding study; a civic pilot is a proposal until owned and implemented.

| Scene ID | Visitor question | Visual change | Required status and source UI | Exit insight |
| --- | --- | --- | --- | --- |
| `question` | What can a field tell a city? | Panoramic soil → water → sample → civic trace | All links explicitly classified; no local measurements implied | Know the path is a set of questions |
| `soil` | What is observable here? | Cutaway reveals one selected indicator and sampling location | Method, depth/season/units needed; NRCS is general guidance | Know what would count as a soil observation |
| `water` | What could change a water outcome? | Same rainfall input, two named schematic conditions, reversible wipe | Simulated illustration; slope, texture, weather, history are unmeasured | Distinguish a mechanism from local runoff evidence |
| `food` | Can a soil change alter measured nutrient content? | Field sample and food assay as separate objects; dashed/question edge | Open question and counterevidence, with study-design gate | No automatic food or disease claim |
| `evidence` | What survives inspection? | A claim, source locator, method, limitation, counterevidence and missing-field view | Claim IDs resolve to one ledger record | See why a statement can or cannot be published |
| `decision` | What should a city test next? | Proposed pilot roles, dependencies, decision threshold and participation routes | Dotted proposal edge; no fictional partner or success count | Choose a specific next step |

**Source integration:** PR #4 contains a bounded Claim/Evidence Ledger for Articles 0 and 3 and is stacked on PR #3. Reconcile those branches before adding a second claim schema. This plan adds a presentation adapter over the canonical ledger, not competing `claims.json` and `sources.json` files. PR #5 holds design recovery context; review it alongside the concept art before freezing tokens. Existing articles and the randomly changing `TopographyMap.jsx` remain a publication gate: audit or remove unsupported public claims and change “Live Field Telemetry” language before a public launch.

### Content and display invariants

- A solid observed trace requires a real, cited observation with population/site, period, method and units. The present hero has **no qualifying local trace**; its field-to-city edges remain inference, open question, or proposal.
- Dashed means an inference with assumptions; dotted means a proposal; a gap with a question mark means the test is missing. Put the words in the legend and at each relevant edge. Never encode status by color alone.
- An illustration is marked **schematic**. Philadelphia landmarks, parcel boundaries and watershed outlines are not presented as surveyed geography until mapped to reviewed geospatial data and attribution.
- The current A/B wipe is an explanatory drawing, not a before/after photograph or numerical prediction. Its `0–100` range is percent of the *screen revealed*, never percent infiltration or runoff.
- A numerical chart is hidden or shown as an empty research question until claim ID, source locator, units, denominator, comparison, uncertainty and review state are present. Do not transfer pseudo-values or invented labels from the image-generation output.

## 2. Visual system to make the concept reproducible

### Composition and art direction

Create an illustration atlas with separately addressable layers: paper/grain, surface vegetation, soil horizons/pore shapes, root network, water flow, field line, sampling vessel/food, and civic architecture. Author key silhouettes as SVG; use carefully optimized WebP/AVIF texture only for non-semantic shading. Place all headlines, labels, chart marks, source text and status strokes in HTML/SVG generated from the scene model. This permits responsive recomposition, accessibility and factual correction without repainting an image.

| Parameter | Starting specification; verify on rendered devices |
| --- | --- |
| Color tokens | Paper `#F6F2E9`, ink `#232B27`, forest `#173D32`, river `#376C82`, clay `#A4573F`; plus pale surface tints derived and contrast-checked. State is also encoded by stroke and text. |
| Layout | Desktop `max-width: 1440px`, 12-column grid; hero art 7–8 columns and title/evidence 4–5. Story stage about `min(72svh, 760px)` with native page scroll. Text measure 65–78 characters. |
| Hero scale | At 1440px, headline `clamp(64px, 7.5vw, 120px)`, art visible within the first viewport. At 390px, headline `clamp(42px, 11vw, 56px)` and a 4:5 art composition with four readable nodes. These are design targets, not a promise of exact first-fold position on every device. |
| Typography | Authored display serif for questions, readable sans for controls/body, tabular numerals for data. Body 18–20px desktop and at least 16px mobile; evidence text at least 14px. Bundle/subset only licensed fonts and check network cost. |
| Illustration | Hero 1440×900 SVG viewBox, mobile 390×520 authored composition or responsive SVG groups; scene assets share source shapes so transitions feel continuous. Avoid rasterized text. |
| Trace Thread | `viewBox` paths with `vector-effect="non-scaling-stroke"`; 3px base stroke on desktop, 2–2.5px mobile; solid/dashed/dotted/gap styles plus direct text. Path geometry changes at authored scene keys, not random per render. |
| Icons | 24×24 viewBox, 1.75–2px rounded stroke, consistent optical bounds. Soil, water, sample, method, ledger, civic, audio, source. Supply visible text on actions. |
| Buttons/controls | Primary filled, secondary outlined, tertiary text. At least 44×44 CSS-pixel target, visible focus ring, active/disabled/loading states; no hover-only explanation. Slider also gets buttons and keyboard operation. |
| Texture | Fixed seeded vector stipple or compressed tile; no layout-changing image load, no animated grain. Texture must never reduce chart or source contrast. |
| Chart | SVG marks and direct labels; axes, units, sample/date span, uncertainty and status visible. Exportable table conveys the same values. A placeholder is clearly a diagram, not a measured chart. |

### Component-specific design specifications

| Component | Desktop treatment | Mobile/touch treatment | State and content contract |
| --- | --- | --- | --- |
| Hero atlas | Editorial title overlaps the upper-left negative space of an illustrated cross-section; trace and four nodes run through the art, source cue at the edge | Recompose the same layers vertically with a short title above a 4:5 figure; direct node labels remain legible without pinch zoom | A source/status legend sits next to the relevant edge; artwork never conveys a measurement by itself |
| Soil card | Cutaway with horizon/roots/pore shapes and one highlighted indicator; adjacent method card | Figure, selected indicator, then immediately its method/limit; tabs may wrap | Selector changes highlighted feature and explanatory text together; it does not generate a value |
| Slide-scroll comparison | Two equal-viewBox condition illustrations align to one rain input; handle wipes by `clip-path`, with fixed captions and a visible 0/50/100 control | Vertical stacked views at very narrow widths if the handle obscures labels; explicit A/B buttons and range remain | Handle position is visual reveal percent only. When the water scene enters view, an authored scroll cue may move to 50 once; subsequent user control always wins |
| Evidence card | Source tab, method tab, limit/counterevidence tab in a quiet paper panel anchored beside the active graphic | Full-width panel immediately following its claim, no collapsed essential status | Claim ID and status always visible; external source and date/locator inspectable |
| Data chart | A direct-label slope/interval/dot plot only if reviewed data support comparison; one unit scale, uncertainty drawn and explained | Small multiples or vertical intervals, no tiny rotated labels; linked HTML table | Data from canonical ledger only; missing sample, units, baseline or review yields an explicit question-state illustration |
| Chapter thumbnail | 3:2 crop with fixed focal anchor, short chapter title in HTML, small status symbol | 1:1 crop/list row for navigation | Never imply completed fieldwork through generated documentary imagery |
| Progress/scrollbar | Native browser scrollbar plus 2–3px chapter progress rule and six labeled chapter buttons | Native scrollbar plus compact chapter count and tappable chapter menu | Progress is location, not evidence completeness; no custom replacement scrollbar |
| Primary button | Forest fill, compact arrow icon, short verb-first label, 48px height, 8–12px radius | Full-width where needed, minimum 44px target, 8px separation | Focus, hover, pressed, disabled and loading states; no fake submit completion |

**Illustration asset list:** `src/assets/story/atlas-ground.svg`, `atlas-roots.svg`, `atlas-water.svg`, `atlas-sample.svg`, `atlas-civic.svg`, `soil-cutaway.svg`, `water-a.svg`, `water-b.svg`, `texture-paper.webp`, and `icons/{soil,water,sample,method,ledger,civic,source,audio}.svg`. These are target names, not files already present. Export an art-only master and a separate label/annotation overlay; document each asset's focal point and mobile crop in the manifest. If a generated image informs the texture, record its prompt/version and repaint or crop it as illustrative substrate with no generated text.

### Interaction grammar

1. Native scroll and chapter buttons select an authored scene. `IntersectionObserver` determines the active chapter. A sticky illustration stage may hold the visual while its adjacent text passes; section height is content-driven, not scroll-jacked.
2. Each scene reveals one new edge or inspection layer over 250–600ms with transform/opacity or SVG dash interpolation. There is no meaningless parallax, no continuous camera drift and no scroll-dependent change to data values. The native scrollbar remains native; a small branded progress line is supplementary.
3. User controls own their state: indicator tabs choose a measurement explanation, the comparison range chooses a reveal mask, evidence tabs choose source/method/limit, chapter rail deep-links to a scene. Persist only explicit shareable scene/indicator/scenario parameters in the URL. The same state yields the same rendered marks.
4. `prefers-reduced-motion: reduce` displays complete end-state graphics immediately. Keyboard and tap expose everything available on scroll/drag. A static source-first view survives no animation or media.
5. Audio is a later enhancement: off by default; explicit play/mute/pause; brief scene cue with text description, no autoplay or exclusive information. Video has a poster, captions, transcript and a non-video path. SVG animation uses CSS/WAAPI/SVG; Drei belongs only to an optional 3D soil cutaway, not to SVG rendering.

## 3. File and function map

Use these paths as the implementation target after the phase-zero branch reconciliation. Existing files are called out explicitly; new paths are proposed. Keep `StoryExperience.jsx` as orchestration until the scene components are extracted, then make it a small route shell.

| File | Responsibility | Main interface or function |
| --- | --- | --- |
| `docs/web/VISUAL_PARITY_PLAN.md` | This ordered contract, visual target and gates | Update screenshots/measurements with each phase |
| `docs/web/LIVE_DEMO_SPEC.md` | Product/evidence contract | Link to this visual implementation plan; preserve honest status |
| `src/components/StoryExperience.jsx` | Existing route, active chapter, controls | Split `SoilGraphic`, `WaterGraphic`, `EvidenceCard`, and `TraceMark`; retain `StoryExperience()` route composition |
| `src/components/StoryExperience.css` | Existing single-file style | Move tokens/layout/component rules incrementally; remove superseded CSS; keep reduced-motion rule |
| `src/story/scenes.js` | Six authored scene records | `getScene(id)`, `getChapterIndex(id)`; each record carries `title`, `question`, `visualKey`, `edgeIds`, `claimIds`, `fallbackText`, `nextAction` |
| `src/story/claimView.js` | Adapter to canonical ledger after PR #4 integration | `getClaimDisplayState(claim)`, `getEvidenceForScene(sceneId)`, `assertPublishableMark(mark, claim)`; no raw prose as chart data |
| `src/story/trace.js` | Deterministic vector geometry and status style | `getTraceSegments(sceneId, viewportClass)`, `getEdgeStyle(status)`, `getAccessiblePathText(edges)`; stable keys and no `Math.random()` |
| `src/story/useStoryProgress.js` | Observer and explicit chapter navigation | `useStoryProgress(sectionRefs)`, `goToScene(id, reducedMotion)`; disconnect observer on unmount |
| `src/components/story/StoryStage.jsx` | Sticky stage and fallback figure | `StoryStage({ scene, controls, reducedMotion })` with one visible caption/alt sequence |
| `src/components/story/FieldToCityAtlas.jsx` | Layered panorama and responsive recomposition | `FieldToCityAtlas({ sceneId, edgeStates })`; semantic overlay separate from illustration |
| `src/components/story/TraceThread.jsx` | SVG edge and endpoint system | `TraceThread({ segments, activeId })`; nearby text legend and labeled status |
| `src/components/story/SoilCutaway.jsx` | Selected indicator and core illustration | `SoilCutaway({ indicatorId, onSelect })`; no local reading until supplied |
| `src/components/story/ScenarioComparator.jsx` | Named A/B visual wipe | `ScenarioComparator({ reveal, onChange, scenarioA, scenarioB })`; `reveal` integer 0–100 mask only |
| `src/components/story/EvidenceInspector.jsx` | Claim/source/method/limit/counterevidence tabs | `EvidenceInspector({ claimIds })`; every source link opens original |
| `src/components/story/DirectLabelChart.jsx` | Approved measured marks or explicit empty state | `DirectLabelChart({ series, claimIds, status })`; paired accessible `DataTable` |
| `src/components/story/ChapterRail.jsx` | Six navigation destinations and progress | `ChapterRail({ chapters, activeId, onNavigate })` |
| `src/components/story/ParticipationPanel.jsx` | Role-specific actions | Private pledge download until signed backend receipt; newsletter disabled/clearly upcoming until provider exists |
| `src/styles/tokens.css` | Color, spacing, typography, focus and motion tokens | CSS custom properties; document contrast tests |
| `src/styles/story.css` | Responsive grid, stage, art crops and component states | Breakpoints based on composition at roughly 480/800/1100px, verify 320–1440px |
| `src/assets/story/` | Authored SVG layers, icon set and optimized textures | Manifest includes purpose, version, license/creator and alt-text role; no labels or numbers baked into art |
| `src/assets/story/manifest.js` | Layer stacking, aspect ratio, crop anchors, attribution | `getSceneAssets(sceneId, viewportClass)` returns stable paths and fallback; validates mobile art and label-safe area |
| `src/components/story/ChapterThumbnail.jsx` | Consistent chapter previews | `ChapterThumbnail({ sceneId, active })` uses art-only crop plus live HTML title/status |
| `src/components/story/MediaExplainer.jsx` | Later optional video/audio controls | `MediaExplainer({ poster, captions, transcript, audioCue })`; explicit user activation, no autoplay |
| `src/components/story/SoilCutaway3D.jsx` | **Optional**, lazy 3D only if it explains depth | `React.lazy` boundary, bounded DPR 1–1.5, single RAF, context-loss/static fallback, dispose meshes/materials/textures/targets on unmount |
| `scripts/visual-audit.mjs` | Existing browser audit | Add scene-state screenshots, keyboard, 200% zoom, reduced motion, controls, media unavailable, console error checks |
| `scripts/validate-story-assets.mjs` | New manifest and scene checks | Fail on missing asset/alt/fallback, unknown claim ID, observed edge without reviewed ledger proof, chart without units/source |

Avoid an extra framework migration during the visual rebuild. Current Vite/React is adequate for the demo; a Next.js port is a separate deployment/SEO decision and must not be represented as already implemented. If adding 3D, import `@react-three/fiber` and `@react-three/drei` only inside the lazy enhancement and verify actual bundle impact. Imported textures/materials must be disposed by owner; renderer cleanup alone is insufficient for manually allocated assets.

**Pure-state rule:** `renderedScene = render(sceneVersion, claimLedgerVersion, sceneId, indicatorId, reveal, viewportClass)`. `getTraceSegments` and `getSceneAssets` may select authored coordinates/crops, but must not sample random positions or modify claim status. If procedural stipple is used, generate it offline from a fixed seed and check the SVG into source. The scene observer only selects an active scene; it does not change measurements or overwrite a visitor's comparison choice.

## 4. Ordered phases, dependencies and completion gates

| Order | Build phase and concrete steps | Visible deliverable | Gate before next phase |
| --- | --- | --- | --- |
| **0** | Record current 320/390/820/1440 screenshots and bundle receipt. Review PR #3/#4/#5 dependencies. Freeze six-scene script, edge statuses, source/claim ID contract, illustration labels and exact approved text. Audit old article/telemetry routes for public claims. | Scene storyboard and source map with explicit “unknown” slots. | Each visible factual sentence/edge has a status and destination; no invented numeric chart; publication boundary recorded. |
| **1** | Draw hero atlas and one soil/water scene in layered SVG. Create mobile compositions, type/icon/control tokens and asset manifest. Export separate texture layers at 1×/2× if needed. | Two art-directed stills at 1440 and 390, plus source SVG layers. | Human comparison against concept: first viewport contains the core/path/city cue and a readable question; text is editable; schematic geography labeled. |
| **2** | Extract scene registry and components; rebuild first fold and six chapter skeletons. Wire sticky stage, rail, native scroll observer, direct scene links, source-first fallback. | Six navigable scenes; no animations required yet. | 320–1440 no content clipping; keyboard chapter sequence works; first frame and mobile hierarchy accepted. |
| **3** | Implement trace/path states, soil selector, A/B visual wipe, food study-design and evidence inspector. Integrate PR #4 ledger through adapter; validate mark-to-claim references. | Deterministic visual transitions and source inspector; explicit empty chart where needed. | Every claim/edge/source status matches ledger; same URL/state gives same diagram; no fabricated observed value. |
| **4** | Add scroll-keyed reveals, transitions, arrow/button alternatives, static end states and responsive art crops. Tune 250–600ms motion on target devices; stop offscreen work. | Tactile but readable desktop/mobile story. | Keyboard, touch and reduced motion convey identical meaning; no scrolljacking or layout shift; screenshot sequence approved. |
| **5** | Add only source-backed chart(s), direct labels, table, uncertainty and downloadable still. Produce captioned/transcribed 60–90s explainer and optional audio asset if content/consent approved. Evaluate 3D soil cutaway against SVG explanation and performance cost. | Data graphic and media modules if gates permit; otherwise explicitly empty/research-state modules. | Units/source/uncertainty check; no autoplay sound; video no-media path; real-device frame and bundle receipts. |
| **6** | Complete participation routes: documented question intake, private pledge; then provider-backed newsletter and signed pledge only with separate consent, confirmation, deletion and ownership. | Functional actions with truthful completion states. | No false success message, partner endorsement or public count; privacy text and test receipts. |
| **7** | Run automated and manual audits, fix defects, review publication claims, then deploy protected preview for signoff. Public release only after claims/forms/media gate. | Commit-linked release receipt, screenshots, build and live preview URL. | Meaning, accessibility, responsive, performance and provenance gates below pass on release commit. |

### Benchmarks and test receipts

- **Measured starting point:** PR #6 CI run `44963713133` passes 20 route/viewport checks. Initial story bundle is 82.57 kB gzip JS and 10.96 kB gzip CSS. It has no field performance measurement. The 320px story audit reports 2px overflow and currently tolerates up to 4px; target zero unintended overflow, including at 200% zoom.
- **First-load budgets:** Existing target ≤90 kB gzip initial JS and ≤12 kB gzip CSS allows only about 7.43 kB JS and 1.04 kB CSS growth. The richer story will require CSS consolidation and lazy art/media/3D. If a budget must change, publish a measured tradeoff with asset breakdown before claiming completion.
- **Web experience targets:** p75 mobile LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 after actual field collection; lab profiles and raw traces in the interim. 60fps target for motion on a declared mid-range device, with a reported stress-case floor rather than assuming headless SwiftShader represents users.
- **Visual checks:** Compare concept and implementation at matched 1440×900 and 390×844 captures for opening composition, four labeled nodes, line status, texture, type, icon detail and control legibility. Also inspect 320×568 and 820×1180; include all six scenes, slider 0/50/100, selected soil indicator, source card open, reduced motion and no media.
- **Meaning:** In a five-person comprehension check, at least four can identify what is observed, inferred and proposed and name a missing test after about 90 seconds. Record specific misreadings and revise, rather than equating visual resemblance with understanding.
- **Accessibility:** WCAG 2.2 AA walkthrough; keyboard and screen reader narrative, direct controls, contrast, focus, 200% zoom, static alternatives. For 3D, test context loss, rapid scene switching, cleanup and fallback on a real GPU device.

## 5. First implementable increment

Start with **Phase 0 + Phase 1**, then one coded vertical slice of Phase 2: the hero and soil scene at 1440 and 390. Do not create all media and chart assets at once. The slice should produce: (1) approved scene/edge content; (2) layered hero SVG with no baked text; (3) a custom soil illustration and four custom node icons; (4) responsive first fold; (5) before/after screenshots; (6) zero-overflow and reduced-motion checks; (7) updated bundle receipt. Only then carry the art grammar across water, food, evidence and decision scenes.

**Interview wording at this stage:** “The live Vite/React prototype demonstrates a source-labeled soil selector and a deterministic illustrative water comparison. I have specified a six-scene visual system and a claim-to-mark contract to bring it closer to the storyboard. The illustrations, data charts, media, optional Drei scene and provider-backed participation are staged work.” Revise the sentence after implementation receipts exist.
