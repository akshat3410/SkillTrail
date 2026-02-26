'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="relative h-[80vh] bg-void-black flex flex-col items-center justify-center overflow-hidden border-t border-graphite/30">
      
      {/* Vertical Gate Lines */}
      <div className="absolute top-0 left-12 w-px h-full bg-graphite/30 hidden md:block" />
      <div className="absolute top-0 right-12 w-px h-full bg-graphite/30 hidden md:block" />
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--graphite)_0%,_var(--void-black)_70%)] opacity-20 pointer-events-none" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }} />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <div className="inline-block mb-8 relative">
            <span className="text-volt font-mono text-xs uppercase tracking-[0.3em] relative z-10">System Ready</span>
            <div className="absolute -bottom-2 left-0 w-full h-px bg-volt/30" />
        </div>
        
        <h2 className="text-5xl md:text-8xl font-bold font-display text-white uppercase tracking-tighter mb-12 mix-blend-plus-lighter"
            style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
          Your Journal <br/> <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px white' }}>Begins Now</span>
        </h2>

        <Link href="/roadmaps" className="btn-premium px-16 py-6 text-xl group relative overflow-hidden">
            <span className="relative z-10">Start Module 01</span>
            <div className="absolute inset-0 bg-volt/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </Link>
      </motion.div>

      {/* Footer Info - Removed to use global Footer */}
      {/* 
      <div className="absolute bottom-12 w-full flex justify-between px-8 md:px-12 text-[10px] font-mono text-muted uppercase tracking-widest opacity-40">
         <span>SkillTrail © 2026</span>
         <span className="hidden md:inline">System Status: Optimal</span>
         <span>Map Version 1.0.4</span>
      </div> 
      */}

    </section>
  );
}
