'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Map, ArrowRight, Activity } from 'lucide-react';

export default function RoadmapCard({ roadmap, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/roadmap/${roadmap.id}`} className="flex flex-col h-full bg-void-black border border-graphite/40 p-8 relative overflow-hidden group hover:border-volt/50 transition-colors duration-500">
        
        {/* Hover Highlight */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-volt/0 to-transparent group-hover:via-volt/50 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-volt/0 to-transparent group-hover:via-volt/50 transition-all duration-500" />

        <div className="mb-8 flex justify-between items-start">
             <div className="w-14 h-14 bg-graphite/20 border border-graphite/40 flex items-center justify-center group-hover:bg-volt group-hover:text-void-black group-hover:border-volt transition-all duration-300">
                <Map className="w-6 h-6" strokeWidth={1.5} />
             </div>
             {roadmap.isNew && (
                <div className="flex items-center gap-2 px-3 py-1 bg-volt/10 border border-volt/20 text-volt text-[10px] font-mono uppercase font-bold tracking-wider">
                   <Activity className="w-3 h-3" />
                   New Protocol
                </div>
             )}
        </div>

        <h3 className="text-3xl font-display font-bold uppercase leading-[0.9] mb-4 text-white group-hover:text-volt transition-colors duration-300">
             {roadmap.title}
        </h3>
          
        <p className="text-muted text-sm font-mono leading-relaxed mb-12 flex-1 group-hover:text-white/80 transition-colors">
             {roadmap.description}
        </p>

        <div className="pt-6 border-t border-graphite/30 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-muted group-hover:text-white transition-colors">
             <span className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {roadmap.duration}
             </span>
             <span className="flex items-center gap-2 group-hover:text-volt transition-colors">
                Initiate <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
             </span>
        </div>

        {/* Background Noise on Hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity duration-500 mix-blend-overlay" 
             style={{ backgroundImage: 'url("/noise.png")' }} />
      </Link>
    </motion.div>
  );
}
