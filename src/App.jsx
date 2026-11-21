import { useEffect, useState } from 'react';
import {
  Activity,
  BookOpen,
  ChevronRight,
  Clock,
  Coins,
  Compass,
  Database,
  Droplets,
  Info,
  Leaf,
  Map,
  MapPin,
  Menu,
  Scan,
  Share2,
  TrendingUp,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import BlueprintDiagram from './components/BlueprintDiagram.jsx';
import FlipCard from './components/FlipCard.jsx';
import TopographyMap from './components/TopographyMap.jsx';
import StoryExperience from './components/StoryExperience.jsx';
import { articlesData } from './data/articles.jsx';

const tabs = [
  { id: 'story', label: 'Field to City', icon: Leaf },
  { id: 'sitemap', label: 'Ecosystem Hub', icon: Compass },
  { id: 'article', label: 'The Editorial', icon: BookOpen },
  { id: 'diagram', label: 'Blueprint Diagram', icon: Workflow },
  { id: 'interactive', label: 'Ag-Tech Telemetry', icon: Activity },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(() => window.location.hash.replace('#', '') || 'story');
  const [activeArticleId, setActiveArticleId] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeArticle = articlesData[activeArticleId];
  const ActiveArticleIcon = activeArticle.icon;

  useEffect(() => {
    window.history.replaceState(null, '', `#${activeTab}`);
  }, [activeTab]);

  useEffect(() => {
    const onHashChange = () => {
      const next = window.location.hash.slice(1);
      if (tabs.some((tab) => tab.id === next)) setActiveTab(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (tab) => {
    setActiveTab(tab);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openArticle = (articleId) => {
    setActiveArticleId(articleId);
    navigate('article');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans text-slate-800 selection:bg-emerald-200 selection:text-emerald-900">
      <nav className="sticky top-0 z-50 border-b border-stone-200 bg-[#F9F7F2]/95 shadow-sm backdrop-blur" aria-label="Primary navigation">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <button type="button" onClick={() => navigate('story')} className="flex items-center font-serif text-xl font-bold tracking-tight text-emerald-900">
            AGRARIAN <span className="ml-1 text-emerald-600">FUTURES</span>
          </button>

          <div className="hidden space-x-6 text-sm font-medium text-slate-500 md:flex">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                type="button"
                key={id}
                onClick={() => navigate(id)}
                className={`flex items-center transition-colors hover:text-emerald-700 ${activeTab === id ? 'text-emerald-700 underline decoration-2 underline-offset-4' : ''}`}
                aria-current={activeTab === id ? 'page' : undefined}
              >
                <Icon size={16} className="mr-1.5" /> {label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="p-2 text-slate-600 md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="absolute z-50 flex w-full flex-col space-y-4 border-b border-stone-200 bg-[#F9F7F2] p-4 shadow-lg md:hidden">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button type="button" key={id} onClick={() => navigate(id)} className="flex items-center text-left font-medium text-slate-700">
                <Icon size={16} className="mr-2" /> {label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main id="main-content" className="mx-auto max-w-6xl px-6 py-12">
        {activeTab === 'story' && <StoryExperience />}
        {activeTab === 'sitemap' && (
          <div className="animate-in fade-in duration-500" data-testid="ecosystem-hub">
            <header className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-slate-900 md:text-5xl">The Regenerative Policy Ecosystem</h1>
              <p className="text-xl font-light leading-relaxed text-slate-600">This is not a single policy; it is an organism. Explore the master directory connecting narrative ontology, biophysical metrics, and self-assembling governance.</p>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <section className="group rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 rounded-lg bg-emerald-100 p-3"><BookOpen size={24} className="text-emerald-700" /></div>
                  <h2 className="font-serif text-2xl font-bold text-slate-900">Narrative Ontology</h2>
                </div>
                <p className="mb-6 text-sm text-slate-600">The six-part editorial series breaking down the economic, scientific, political, verification, governance, and human case for regenerative agriculture.</p>
                <div className="space-y-2">
                  {articlesData.map((article) => {
                    const Icon = article.icon;
                    return (
                      <button type="button" key={article.id} onClick={() => openArticle(article.id)} className="flex w-full items-center justify-between rounded-md border border-transparent px-4 py-2 text-left text-sm font-medium text-slate-700 transition-colors hover:border-stone-100 hover:bg-stone-50">
                        <span className="flex items-center"><Icon size={14} className="mr-2 opacity-50" /> {article.navTitle}: {article.title.split(':')[0]}</span>
                        <ChevronRight size={14} className="text-emerald-600 opacity-0 transition-opacity group-hover:opacity-100" />
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-800 bg-gradient-to-br from-blue-900 to-slate-900 p-8 text-white shadow-lg">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 rounded-lg border border-blue-700/50 bg-blue-800/50 p-3"><MapPin size={24} className="text-blue-300" /></div>
                  <div><span className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-blue-400">Pilot Project</span><h2 className="font-serif text-2xl font-bold">Delaware Valley Loop</h2></div>
                </div>
                <p className="mb-6 text-sm text-blue-100/80">A proposed bioregional economy linking upstream soil health in New Jersey to downstream drinking water and public schools in Philadelphia.</p>
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3"><h3 className="mb-1 text-xs font-bold text-blue-300">Mentor Farms</h3><p className="text-xs text-slate-300">Candidate farms and urban agriculture partners require confirmation.</p></div>
                  <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 p-3"><h3 className="mb-1 text-xs font-bold text-emerald-300">Field Truth Corps</h3><p className="text-xs text-slate-300">Student and community sampling with auditable protocols.</p></div>
                  <div className="col-span-2 rounded-lg border border-slate-700/50 bg-slate-800/50 p-3"><h3 className="mb-1 text-xs font-bold text-rose-300">Cultural Interface: Beats & Boxes</h3><p className="text-xs text-slate-300">Music events can support food distribution, participation, and vacant-lot restoration.</p></div>
                </div>
                <button type="button" onClick={() => openArticle(5)} className="w-full rounded-lg bg-white/10 py-2.5 text-sm font-bold transition-colors hover:bg-white/20">Read the Human Systems Case</button>
              </section>

              <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-6 flex items-center"><div className="mr-4 rounded-lg bg-stone-100 p-3"><Workflow size={24} className="text-stone-700" /></div><h2 className="font-serif text-2xl font-bold text-slate-900">Governance & MRV Stack</h2></div>
                <p className="mb-6 text-sm text-slate-600">The digital, scientific, and legal scaffolding required to turn physical measurements into accountable financial decisions.</p>
                <ul className="mb-6 space-y-4">
                  <li className="flex items-start"><Scan className="mr-3 mt-0.5 flex-shrink-0 text-emerald-500" size={18} /><div><span className="block text-sm font-bold text-slate-800">NDI & Standards Board</span><span className="text-xs text-slate-500">A proposed nutrient-density standard with published validation rules.</span></div></li>
                  <li className="flex items-start"><Database className="mr-3 mt-0.5 flex-shrink-0 text-blue-500" size={18} /><div><span className="block text-sm font-bold text-slate-800">DAVL Ledger & Knowledge Graph</span><span className="text-xs text-slate-500">Versioned evidence, provenance, uncertainty, and governance records.</span></div></li>
                  <li className="flex items-start"><Coins className="mr-3 mt-0.5 flex-shrink-0 text-amber-500" size={18} /><div><span className="block text-sm font-bold text-slate-800">RESTA & NIDM Policy</span><span className="text-xs text-slate-500">Incentives linked to verified ecological and public-health outcomes.</span></div></li>
                </ul>
                <div className="flex space-x-3"><button type="button" onClick={() => navigate('diagram')} className="flex-1 rounded-lg bg-stone-100 py-2 text-sm font-bold text-stone-700 hover:bg-stone-200">View Diagram</button><button type="button" onClick={() => navigate('interactive')} className="flex-1 rounded-lg bg-emerald-50 py-2 text-sm font-bold text-emerald-700 hover:bg-emerald-100">View Telemetry</button></div>
              </section>

              <section className="rounded-2xl border border-stone-800 bg-stone-900 p-8 text-white shadow-lg">
                <div className="mb-6 flex items-center"><div className="mr-4 rounded-lg border border-stone-700 bg-stone-800 p-3"><Users size={24} className="text-stone-300" /></div><h2 className="font-serif text-2xl font-bold">Coalition & Research Pathways</h2></div>
                <p className="mb-6 text-sm text-stone-400">Potential organizations, research pathways, and funding concepts that require outreach, verification, and consent before being represented as active partners.</p>
                <div className="mb-6"><h3 className="mb-3 border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-widest text-stone-500">Strategic Research Concepts</h3><div className="mb-2 rounded-lg border border-stone-700/50 bg-stone-800/50 p-3"><span className="mb-1 block text-xs font-bold text-emerald-400">Autopoietic Mind Research Program</span><span className="block text-xs text-stone-300">Test links between regenerative access, agency, connection, and wellbeing.</span></div><div className="rounded-lg border border-stone-700/50 bg-stone-800/50 p-3"><span className="mb-1 block text-xs font-bold text-blue-400">Soil–Food–Body Rhythm Trial</span><span className="block text-xs text-stone-300">Pre-register measures for diet, microbiome, HRV, inflammation, and lived experience.</span></div></div>
                <div><h3 className="mb-3 border-b border-stone-800 pb-1 text-xs font-bold uppercase tracking-widest text-stone-500">Candidate Knowledge Nodes</h3><div className="flex flex-wrap gap-2">{['Rodale Institute', 'Soul Fire Farm', 'Biome Makers', 'Kiss the Ground', 'InPlanet', 'CA4SH'].map((name) => <span key={name} className="rounded border border-stone-700 bg-stone-800 px-2 py-1 text-[10px] text-stone-300">{name}</span>)}</div></div>
              </section>
            </div>
          </div>
        )}

        {activeTab === 'diagram' && (
          <div className="animate-in slide-in-from-bottom duration-500">
            <header className="mb-12 max-w-3xl"><h1 className="mb-4 flex items-center font-serif text-3xl font-bold text-slate-900"><Workflow className="mr-3 text-emerald-600" size={32} /> Visualizing the Master Architecture</h1><p className="text-lg text-slate-600">A structural map of the Regenerative Policy Framework, from fragmented incentives to a coherent bioregional evidence and reward loop.</p></header>
            <BlueprintDiagram />
            <div className="mt-8 flex items-start rounded-xl border border-emerald-100 bg-emerald-50 p-6"><Info size={24} className="mr-4 mt-1 flex-shrink-0 text-emerald-600" /><div><h2 className="mb-2 font-bold text-emerald-900">How to Read the Blueprint</h2><p className="text-sm text-emerald-800">The framework converts measurements into decisions through explicit standards, provenance, uncertainty, and governance. Ecological stewardship is rewarded only after verification—not by label alone.</p></div></div>
          </div>
        )}

        {activeTab === 'article' && (
          <div className="animate-in fade-in flex flex-col gap-12 duration-500 md:flex-row">
            <div className="max-w-3xl flex-1">
              <section className="mb-12"><div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md md:mx-0"><div className="relative h-48 overflow-hidden bg-slate-800"><div className="absolute inset-0 bg-gradient-to-tr from-stone-900 to-stone-700" /><div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-emerald-900/80 to-transparent" /><div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"><span className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400">Agrarian Futures Series</span><h2 className="mb-3 line-clamp-2 font-serif text-2xl font-bold leading-tight text-white drop-shadow-lg">{activeArticle.title.split(':')[0]}</h2><div className="h-1 w-12 rounded-full bg-emerald-500" /></div></div><div className="flex items-center justify-between border-t border-stone-200 bg-stone-50 p-3 text-xs"><span className="font-semibold text-slate-700">MelodicBloom / Philly Civic AI</span><span className="text-slate-400">Share this article <Share2 size={12} className="ml-1 inline" /></span></div></div></section>
              <article key={activeArticle.id} className="animate-in slide-in-from-bottom-4 duration-500">
                <header className="mb-10"><div className="mb-6 inline-flex items-center space-x-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm"><ActiveArticleIcon size={14} /><span>{activeArticle.badge}</span></div><h1 className="mb-6 font-serif text-4xl font-bold leading-tight text-slate-900 md:text-5xl">{activeArticle.title}</h1><p className="text-xl font-light leading-relaxed text-slate-600">{activeArticle.subtitle}</p></header>
                <div className="mb-12 flex items-center space-x-6 border-y border-stone-200 py-4 text-sm text-slate-500"><span className="flex items-center"><Clock size={16} className="mr-2" /> Working draft · 2026</span><button type="button" className="flex items-center hover:text-emerald-600"><Share2 size={16} className="mr-2" /> Share</button></div>
                <div className="prose prose-lg prose-stone max-w-none prose-headings:font-serif prose-headings:text-emerald-950">{activeArticle.content}</div>
              </article>
            </div>

            <aside className="w-full flex-shrink-0 md:w-64"><div className="sticky top-24"><h2 className="mb-4 border-b border-stone-200 pb-2 text-xs font-bold uppercase tracking-widest text-slate-400">The Master Syllabus</h2><div className="flex flex-col space-y-2">{articlesData.map((article) => { const Icon = article.icon; return <button type="button" key={article.id} onClick={() => { setActiveArticleId(article.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`flex items-center rounded-lg border px-4 py-3 text-left text-sm font-medium transition-all ${activeArticleId === article.id ? 'border-emerald-900 bg-emerald-900 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700'}`}><Icon size={16} className={`mr-3 ${activeArticleId === article.id ? 'text-emerald-400' : 'text-slate-400'}`} /><span>{article.navTitle}</span></button>; })}</div><div className="mt-8 rounded-xl border border-stone-200 bg-stone-100 p-4"><h2 className="mb-2 text-sm font-bold text-slate-900">About the Series</h2><p className="text-xs leading-relaxed text-slate-600">This six-part editorial develops a testable Regenerative Policy Framework. Quantitative claims remain hypotheses until linked to source records and review status.</p></div></div></aside>
          </div>
        )}

        {activeTab === 'interactive' && (
          <div className="animate-in slide-in-from-bottom mx-auto max-w-4xl duration-500">
            <header className="mb-12"><h1 className="mb-4 flex items-center font-serif text-3xl font-bold text-slate-900"><Map className="mr-3 text-emerald-600" size={32} /> Ag-Tech Topography & Telemetry</h1><p className="max-w-2xl text-lg text-slate-600">Explore a simulated digital twin of a transitional farm. Values are illustrative and clearly separated from field evidence.</p></header>
            <section className="mb-16"><TopographyMap /><p className="mt-4 text-center text-xs text-slate-500"><Info size={12} className="mb-0.5 mr-1 inline" /> Simulated interface. No live sensor, satellite, or farm data is connected.</p></section>
            <section><h2 className="mb-8 border-b border-stone-200 pb-4 font-serif text-2xl font-bold text-slate-900">Core Concepts: The Data Behind the Transition</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-3"><FlipCard icon={TrendingUp} title="The Valley of Death" frontText="The three-to-five-year financial gauntlet where transition costs arrive before soil biology and new markets mature." theme="rose" backStats={['Years 1–2 can expose severe cash-flow pressure.', 'Transition support should separate yield, input, price, and weather effects.', 'Steady-state profitability varies by commodity, geography, and management.', 'Risk sharing matters more than a single average return.']} /><FlipCard icon={Leaf} title="The Carbon Equation" frontText="How agricultural land can move from net emissions toward a biological carbon sink through roots, cover, and reduced disturbance." theme="emerald" backStats={['Report practice, model, sample depth, permanence, and uncertainty.', 'No-till and cover-crop effects depend on climate and baseline.', 'Carbon price is not the same as farmer revenue.', 'Soil health must not be reduced to carbon alone.']} /><FlipCard icon={Droplets} title="Drought Economics" frontText="Soil structure and organic matter influence water infiltration and retention, changing the economics of weather risk." theme="blue" backStats={['Track infiltration, plant-available water, runoff, and yield together.', 'Benefits depend on soil texture, depth, crop, and rainfall pattern.', 'Insurance and utility contracts need local baselines.', 'Resilience is a distribution, not a single percentage.']} /></div></section>
          </div>
        )}
      </main>
    </div>
  );
}
