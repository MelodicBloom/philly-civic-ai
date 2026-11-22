import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, ChevronLeft, ChevronRight, Download, ExternalLink, FlaskConical, Leaf, Waves } from 'lucide-react';
import './StoryExperience.css';

const chapters = [
  { id: 'question', short: 'The question', title: 'What can a field tell a city?' },
  { id: 'soil', short: 'The soil', title: 'Begin with what can be observed' },
  { id: 'water', short: 'The water', title: 'Follow the water, inspect the assumption' },
  { id: 'next', short: 'The next test', title: 'Where should the evidence go next?' },
];

const indicators = [
  { id: 'infiltration', label: 'Infiltration', description: 'A field test of how water enters soil at a particular place and time. Rainfall, soil texture, compaction, and method all matter.' },
  { id: 'organic', label: 'Organic matter', description: 'A laboratory indicator related to nutrient retention and soil structure. Sample depth and the laboratory method belong with any reported value.' },
  { id: 'aggregate', label: 'Aggregate stability', description: 'An indicator of how soil structure withstands disturbance by water. It is one part of soil health, not a universal score.' },
];

const nrcsSource = {
  title: 'USDA NRCS · Soil Health Assessment',
  url: 'https://www.nrcs.usda.gov/conservation-basics/soil/soil-health/soil-health-assessment',
  note: 'Indicator definitions and relationships. This source does not provide measurements for an Agrarian Futures pilot.',
};
const reviewSource = {
  title: 'USDA National Agricultural Library · Nutrient content review',
  url: 'https://www.nal.usda.gov/research-tools/food-safety-research-projects/systematic-review-differences-nutrient-content',
  note: 'A review found broadly comparable nutrient content in the studies it assessed. The proposed field-to-food link needs a more specific study.',
};

function TraceMark({ type, children }) {
  return <span className={`af-mark af-mark--${type}`}><span className="af-mark__line" aria-hidden="true" />{children}</span>;
}

function EvidenceCard({ state, title, question, source, limitations }) {
  return (
    <aside className="af-evidence" aria-label={`Evidence for ${title}`}>
      <div className="af-evidence__top"><span className="af-eyebrow">Evidence note</span><span className={`af-state af-state--${state.replaceAll(' ', '-')}`}>{state}</span></div>
      <h3>{title}</h3>
      <p>{question}</p>
      <p className="af-evidence__limit"><strong>Limit.</strong> {limitations}</p>
      {source && <a href={source.url} target="_blank" rel="noreferrer" className="af-source"><BookOpen size={17} aria-hidden="true" /><span><strong>{source.title}</strong><small>{source.note}</small></span><ExternalLink size={15} aria-hidden="true" /></a>}
    </aside>
  );
}

function SoilGraphic({ selected }) {
  return (
    <div className="af-soil-graphic" role="img" aria-label={`Illustrated soil profile. Selected indicator: ${selected.label}. No local field measurements are shown.`}>
      <svg viewBox="0 0 700 400" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><pattern id="af-speckle" width="23" height="19" patternUnits="userSpaceOnUse"><circle cx="4" cy="6" r="1.2" fill="#7e6b52" opacity=".45"/><circle cx="18" cy="13" r=".8" fill="#7e6b52" opacity=".3"/></pattern></defs>
        <path fill="#d9cbad" d="M0 105 Q160 89 330 111 T700 99 V400 H0Z"/>
        <path fill="#a77e59" d="M0 183 Q120 170 290 190 T700 174 V400 H0Z"/>
        <path fill="#705846" d="M0 281 Q175 259 360 280 T700 270 V400 H0Z"/>
        <path fill="url(#af-speckle)" d="M0 105 Q160 89 330 111 T700 99 V400 H0Z"/>
        <g fill="none" stroke="#365b3c" strokeWidth="5" strokeLinecap="round"><path d="M67 108q-5-38-22-58m22 58q3-47 32-76M210 103q-2-44-22-72m22 72q8-47 38-63M452 108q-8-48-33-76m33 76q10-40 42-62M603 102q-4-49-28-72m28 72q9-41 36-62"/></g>
        <g fill="none" stroke="#e6d8b9" strokeWidth="3" strokeLinecap="round"><path d="M67 108q17 48-9 104m9-104q-18 56 31 125m112-130q-20 46 8 110m-8-110q24 80-30 140m272-135q-27 45-8 128m8-128q22 70 69 103m82-109q-27 66-1 132"/></g>
        <path d="M0 105 Q160 89 330 111 T700 99" fill="none" stroke="#254939" strokeWidth="4"/>
        <path d="M0 183 Q120 170 290 190 T700 174M0 281 Q175 259 360 280 T700 270" fill="none" stroke="#f4ecdc" strokeWidth="2" opacity=".65"/>
      </svg>
      <div className="af-soil-label af-soil-label--top">Surface cover</div>
      <div className="af-soil-label af-soil-label--middle">Soil structure</div>
      <div className="af-soil-label af-soil-label--bottom">Sampling depth matters</div>
    </div>
  );
}

function WaterGraphic({ reveal }) {
  return (
    <div className="af-water-graphic" role="img" aria-label={`Illustrative comparison. Condition A is ${100 - reveal}% visible and condition B is ${reveal}% visible. No measured runoff or infiltration amounts are shown.`}>
      <div className="af-water-layer af-water-layer--a"><div className="af-rain" aria-hidden="true">··  ··  ··  ··  ··</div><div className="af-water-layer__land"/><span className="af-water-layer__path af-water-layer__path--runoff" aria-hidden="true"/></div>
      <div className="af-water-layer af-water-layer--b" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}><div className="af-rain" aria-hidden="true">··  ··  ··  ··  ··</div><div className="af-water-layer__land"/><span className="af-water-layer__path af-water-layer__path--infiltrate" aria-hidden="true"/></div>
      <div className="af-water-divider" style={{ left: `${reveal}%` }} aria-hidden="true"><span>◀ ▶</span></div>
      <div className="af-water-key"><span>A · exposed surface</span><span>B · covered surface</span></div>
    </div>
  );
}

export default function StoryExperience() {
  const [active, setActive] = useState('question');
  const [indicatorId, setIndicatorId] = useState('infiltration');
  const [reveal, setReveal] = useState(50);
  const refs = useRef({});
  const indicator = indicators.find((item) => item.id === indicatorId);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.dataset.chapter);
    }, { rootMargin: '-15% 0px -55% 0px', threshold: [0, .2, .5, 1] });
    Object.values(refs.current).forEach((node) => node && observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => refs.current[id]?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  const activeIndex = chapters.findIndex((chapter) => chapter.id === active);

  return (
    <div className="af-story" data-testid="field-to-city-story">
      <div className="af-story__rail" aria-label="Story chapters">
        <span className="af-story__rail-title">Field notes / 01</span>
        <div className="af-story__rail-links">{chapters.map((chapter, index) => <button type="button" key={chapter.id} onClick={() => goTo(chapter.id)} aria-current={active === chapter.id ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span>{chapter.short}</button>)}</div>
        <span className="af-story__rail-progress" aria-label={`Chapter ${activeIndex + 1} of ${chapters.length}`}><span style={{ width: `${((activeIndex + 1) / chapters.length) * 100}%` }}/></span>
      </div>

      <section className="af-scene af-scene--hero" id="story-question" data-chapter="question" ref={(node) => { refs.current.question = node; }}>
        <span className="af-eyebrow">An evidence-centered field guide · prototype</span>
        <h1>What can a field<br/><em>tell a city?</em></h1>
        <p className="af-lede">Trace a proposed pathway from soil to water, food, and civic choice. At every step, see what can be observed, what remains a question, and what a community could test.</p>
        <div className="af-legend" aria-label="Evidence states"><TraceMark type="observed">Measured</TraceMark><TraceMark type="inferred">Inference</TraceMark><TraceMark type="proposed">Proposal</TraceMark></div>
        <div className="af-trace" role="img" aria-label="Conceptual path from soil to water to food to civic decision. No local observation is connected. Soil-to-water is a research mechanism; food link is an open question; civic decision is a proposal.">
          <svg viewBox="0 0 980 225" preserveAspectRatio="none" aria-hidden="true"><path className="af-trace__ground" d="M0 165 C180 115 205 195 390 145 S700 115 980 150"/><path className="af-trace__inference" d="M95 132 C200 80 280 202 490 125"/><path className="af-trace__question" d="M490 125 C590 92 670 90 735 120"/><path className="af-trace__proposal" d="M735 120 C820 145 880 100 950 82"/></svg>
          <div className="af-trace__labels"><span><Leaf size={24} aria-hidden="true"/>Soil</span><span><Waves size={24} aria-hidden="true"/>Water</span><span><FlaskConical size={24} aria-hidden="true"/>Food sample</span><span><BookOpen size={24} aria-hidden="true"/>Decision</span></div>
        </div>
        <p className="af-disclosure">Conceptual pathway. No live field data or confirmed Delaware Valley pilot is connected.</p>
        <button type="button" className="af-button af-button--primary" onClick={() => goTo('soil')}>Trace the evidence <ArrowDown size={18} aria-hidden="true"/></button>
      </section>

      <section className="af-scene" id="story-soil" data-chapter="soil" ref={(node) => { refs.current.soil = node; }}>
        <div className="af-scene__header"><span className="af-eyebrow">01 / The soil</span><h2>Begin with what can be observed.</h2><p>Soil health is assessed through indicators. Choose one to see the measurement question, then inspect the source and limit.</p></div>
        <div className="af-scene__grid"><div><div className="af-segment" aria-label="Choose soil indicator">{indicators.map((item) => <button type="button" key={item.id} aria-pressed={indicatorId === item.id} onClick={() => setIndicatorId(item.id)}>{item.label}</button>)}</div><SoilGraphic selected={indicator}/><p className="af-caption"><strong>{indicator.label}.</strong> {indicator.description}</p></div><EvidenceCard state="research context" title="A method, not a local result" question="Which soil, depth, season, sampling method, and comparison would make this indicator useful?" source={nrcsSource} limitations="No soil sample, sensor feed, or local baseline has been supplied to this demo."/></div>
        <button type="button" className="af-next" onClick={() => goTo('water')}>Next: follow the water <ArrowRight size={18} aria-hidden="true"/></button>
      </section>

      <section className="af-scene" id="story-water" data-chapter="water" ref={(node) => { refs.current.water = node; }}>
        <div className="af-scene__header"><span className="af-eyebrow">02 / The water</span><h2>Follow the water. Inspect the assumption.</h2><p>Move between two illustrative surface conditions. The drawing changes, but it does not predict a runoff percentage for any farm or watershed.</p></div>
        <div className="af-scene__grid"><div><WaterGraphic reveal={reveal}/><div className="af-comparison"><label htmlFor="af-reveal">Reveal covered-surface scenario</label><input id="af-reveal" type="range" min="0" max="100" value={reveal} onChange={(event) => setReveal(Number(event.target.value))}/><div className="af-comparison__buttons"><button type="button" onClick={() => setReveal(0)}><ChevronLeft size={16} aria-hidden="true"/> Show A</button><button type="button" onClick={() => setReveal(50)}>Compare equally</button><button type="button" onClick={() => setReveal(100)}>Show B <ChevronRight size={16} aria-hidden="true"/></button></div></div><p className="af-caption">Same conceptual rainfall input. Soil texture and slope are held constant in the illustration. No measured infiltration or runoff amounts are encoded by the paths.</p></div><EvidenceCard state="inference" title="A mechanism with local limits" question="Would paired infiltration and runoff measurements show a difference here, after accounting for slope, soil type, weather, and management history?" source={nrcsSource} limitations="A general soil-water relationship cannot be promoted to a measured Philadelphia watershed outcome."/></div>
        <button type="button" className="af-next" onClick={() => goTo('next')}>Next: define the test <ArrowRight size={18} aria-hidden="true"/></button>
      </section>

      <section className="af-scene af-scene--final" id="story-next" data-chapter="next" ref={(node) => { refs.current.next = node; }}>
        <div className="af-scene__header"><span className="af-eyebrow">03 / The next test</span><h2>Where should the evidence go next?</h2><p>Before linking a field practice to food quality or a health outcome, compare like samples, document methods, test alternative explanations, and publish uncertainty.</p></div>
        <div className="af-scene__grid"><div className="af-test-list"><div><span>01</span><strong>Pair field and food samples</strong><p>Record crop variety, soil context, harvest conditions, laboratory assay, and sample chain of custody.</p></div><div><span>02</span><strong>Compare credible baselines</strong><p>Predefine comparison plots, periods, nutritional units, and confounders before analyzing outcomes.</p></div><div><span>03</span><strong>Make civic decisions reviewable</strong><p>Specify a proposed pilot owner, cost, consent process, measures, and thresholds for continuing or changing course.</p></div></div><EvidenceCard state="open question" title="Food and health are separate tests" question="What evidence would justify a food composition claim, and what additional design would be needed for a human health claim?" source={reviewSource} limitations="This demo makes no claim that a local practice changed crop nutrients or disease rates."/></div>
        <div className="af-actions"><div><span className="af-eyebrow">Join the work</span><h3>Take a documented next step.</h3><p>Offer a testable question, read the project materials, or make a private pledge. No public signature count or mailing list is active.</p></div><div className="af-actions__links"><a className="af-button af-button--primary" href="https://github.com/MelodicBloom/philly-civic-ai/issues/new" target="_blank" rel="noreferrer">Suggest an evidence question <ExternalLink size={17} aria-hidden="true"/></a><a className="af-button af-button--secondary" href="/agrarian-pledge.txt" download>Download a personal pledge <Download size={17} aria-hidden="true"/></a><a className="af-text-link" href="https://github.com/MelodicBloom/philly-civic-ai" target="_blank" rel="noreferrer">Inspect the project source <ArrowRight size={16} aria-hidden="true"/></a></div></div>
      </section>
    </div>
  );
}
