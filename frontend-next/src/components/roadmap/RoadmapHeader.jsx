'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RoadmapHeader({ title, progress }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-void-black/90 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-24 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/roadmaps" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all group">
            <ArrowLeft className="w-4 h-4 text-muted group-hover:text-white" />
          </Link>
          
          <div className="flex flex-col">
            <div className="flex items-center text-[10px] text-muted font-mono uppercase tracking-[0.2em] space-x-2 mb-1">
              <span>System</span>
              <ChevronRight className="w-3 h-3 text-volt" />
              <span className="text-volt">Active Protocol</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display font-medium uppercase tracking-tight text-white leading-none">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          {/* HUD Stats */}
          <div className="hidden md:flex items-center space-x-8">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">Status</span>
                <span className="text-sm font-mono text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-volt animate-pulse" />
                    Online
                </span>
             </div>
             
             <div className="h-8 w-px bg-white/10" />

             <div className="flex flex-col items-end min-w-[120px]">
                <span className="text-[10px] text-muted font-mono uppercase tracking-widest mb-1">
                  Completion {progress}%
                </span>
                <div className="w-full h-1 bg-graphite relative overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                     transition={{ duration: 1, ease: 'circOut' }}
                     className="absolute top-0 left-0 h-full bg-volt shadow-[0_0_10px_var(--volt)]" 
                   />
                </div>
             </div>
          </div>
          
          <button className="hidden md:flex px-6 py-3 bg-volt text-void-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-void-black transition-colors items-center gap-2">
            <Zap className="w-3 h-3" />
            Resume Protocol
          </button>
        </div>
      </div>
    </header>
  );
}
