import RoadmapCard from '@/components/roadmaps/RoadmapCard';

// Extended Mock Data
const allRoadmaps = [
  {
    id: 'full-stack-ai',
    title: 'Full Stack AI Engineer',
    description: 'Master the complete stack of modern AI application development, from foundation models to production deployment.',
    duration: '40 Hours',
    isNew: true
  },
  {
    id: 'computational-neuro',
    title: 'Computational Neuroscience',
    description: 'Bridge the gap between biological brains and artificial neural networks.',
    duration: '60 Hours',
    isNew: false
  },
  {
    id: 'agentic-systems',
    title: 'Agentic Systems Design',
    description: 'Build autonomous agents that can plan, reason, and execute complex tasks.',
    duration: '25 Hours',
    isNew: true
  },
  {
    id: 'rust-systems',
    title: 'Rust for Systems',
    description: 'High-performance systems programming with memory safety guarantees.',
    duration: '50 Hours',
    isNew: false
  },
  {
    id: 'graph-rag',
    title: 'GraphRAG Architecture',
    description: 'Design and implement advanced retrieval systems using knowledge graphs and LLMs.',
    duration: '35 Hours',
    isNew: true
  },
  {
    id: 'distributed-ml',
    title: 'Distributed ML Ops',
    description: 'Scale training and inference across massive compute clusters with best practices.',
    duration: '45 Hours',
    isNew: false
  }
];

export default function RoadmapsPage() {
  return (
    <main className="bg-void-black min-h-screen text-paper pb-32 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--graphite)_0%,_var(--void-black)_60%)] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }} />

      <div className="container mx-auto px-6 py-32 relative z-10">
        <header className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-graphite/30 pb-12">
           <div>
               <span className="text-volt font-mono text-xs uppercase tracking-[0.3em] mb-4 block">System Catalog</span>
               <h1 className="text-[12vw] md:text-8xl font-bold font-display uppercase tracking-tighter leading-[0.8] text-white mix-blend-difference mb-6">
                  Explore<br/>Paths
               </h1>
           </div>
           <p className="text-muted font-mono text-lg max-w-sm text-right mb-2">
              Curated protocols for the modern technologist. <br/> <span className="text-volt">Select your objective.</span>
           </p>
        </header>

        {/* Technical Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-graphite/30 border border-graphite/30">
           {allRoadmaps.map((roadmap, index) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
           ))}
        </div>
      </div>
    </main>
  );
}
