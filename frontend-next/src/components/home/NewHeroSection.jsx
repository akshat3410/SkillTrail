'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function NewHeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-void-black text-paper">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--graphite)_0%,_var(--void-black)_80%)] opacity-30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20 pointer-events-none" />

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative z-10 flex flex-col items-center text-center px-4 will-change-transform max-w-6xl mx-auto"
      >
        
        {/* Eyebrow */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 flex items-center space-x-3"
        >
           <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-volt opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-volt"></span>
            </span>
           <span className="text-xs font-mono uppercase tracking-[0.2em] text-volt/80">System Online / Guided Mode</span>
        </motion.div>

        {/* Headline */}
        <h1 className="leading-[0.85] font-bold tracking-tighter text-white mb-8 uppercase text-center" style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
          The End of <br />
          <span className="text-transparent stroke-white opacity-50 block md:inline" style={{ WebkitTextStroke: '1px var(--paper)', color: 'transparent' }}>Fragmented</span> Learning.
        </h1>
        
        {/* Subhead */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl font-mono text-muted max-w-3xl leading-relaxed mb-12"
        >
          Stop piecing together random tutorials. Follow a <span className="text-paper border-b border-volt/50 pb-1">definitive, engineered path</span> from first principles to production mastery.
        </motion.p>

        {/* CTA */}
        <Link href="/roadmaps" className="btn-premium px-10 py-5 text-lg group">
           <span className="relative z-10 flex items-center gap-2">
              ENTER THE PATH 
              <span className="block w-2 h-2 bg-void-black rotate-45 group-hover:bg-volt transition-colors" />
            </span>
        </Link>
      </motion.div>

      {/* Living Spline Visualization */}
      <div className="absolute bottom-0 left-0 w-full h-[25vh] overflow-hidden pointer-events-none">
         <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "100%" }}
            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-volt to-transparent shadow-[0_0_20px_var(--volt)]"
         />
         {/* Pulse at the bottom */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-volt/10 blur-3xl rounded-full" />
      </div>
      
    </section>
  );
}
