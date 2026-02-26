'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const STAGES = [
  { id: '01', title: 'Foundations', sub: 'The First Principles', color: 'bg-white' },
  { id: '02', title: 'Neural Networks', sub: 'The Mathematics', color: 'bg-volt' },
  { id: '03', title: 'Transformers', sub: 'The Architecture', color: 'bg-white' },
  { id: '04', title: 'LLMs', sub: 'The Application', color: 'bg-white' },
  { id: '05', title: 'Agents', sub: 'The Autonomy', color: 'bg-white' },
];

export default function CinematicScroll() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  
  // Parallax for the giant numbers
  const numberX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-void-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-void-black">
        
        {/* Background Grid Line */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-graphite/30 z-0" />
        
        <div className="absolute top-8 left-8 z-10">
           <span className="text-xs font-mono uppercase tracking-widest text-volt bg-volt/10 px-2 py-1 rounded-sm border border-volt/20">The Map</span>
        </div>

        <motion.div style={{ x }} className="flex gap-0 pl-[10vw] items-center h-full">
          {STAGES.map((stage, i) => (
            <div key={i} className="relative min-w-[80vw] md:min-w-[60vw] h-[60vh] flex flex-col justify-center px-12 border-l border-graphite/30 group transition-colors duration-500 hover:bg-graphite/5">
               
               {/* Giant Index Number - Parallaxed slightly if possible, or just huge */}
               <span className="text-[12rem] md:text-[16rem] leading-none font-bold font-display text-transparent stroke-text absolute top-1/2 left-4 -translate-y-1/2 opacity-20 select-none pointer-events-none group-hover:opacity-40 transition-opacity duration-500" 
                     style={{ WebkitTextStroke: '2px var(--color-graphite)' }}>
                 {stage.id}
               </span>
               
               <div className="relative z-10 pl-4 py-8 border-l-2 border-transparent group-hover:border-volt transition-all duration-300">
                   <div className={`w-8 h-1 mb-6 ${stage.color} shadow-[0_0_10px_currentColor]`} />
                   <h3 className="text-5xl md:text-7xl font-bold font-display text-white uppercase tracking-tighter mb-4">{stage.title}</h3>
                   <p className="text-muted font-mono uppercase tracking-widest text-sm">{stage.sub}</p>
               </div>
            </div>
          ))}
          {/* End cap */}
          <div className="min-w-[20vw]" />
        </motion.div>

        {/* Progress Bar Bottom */}
        <motion.div 
            style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} 
            className="absolute bottom-0 left-0 h-1 w-full bg-volt shadow-[0_0_15px_var(--volt)]" 
        />

      </div>
    </section>
  );
}
