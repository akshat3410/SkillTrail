'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import clsx from 'clsx';

const KAOS_TAGS = [
  "React", "Docker", "Kubernetes", "SQL", "NoSQL", "GraphRAG", "LLMs", "Transformers",
  "Python", "Rust", "Go", "System Design", "Microservices", "Testing", "CI/CD", "AWS"
];

export default function ConceptVisualization() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="relative min-h-[140vh] bg-void-black py-24 overflow-hidden">
      
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6">
        
        {/* Left: The Chaos */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full p-8">
           {/* Chaos Highlight Gradient - More intense */}
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_60%)] pointer-events-none" />
           
           <h3 className="text-white font-bold font-mono uppercase tracking-widest mb-16 relative z-10 text-xl">The Old Way</h3>
           <div className="relative w-full max-w-md h-[500px]">
              {KAOS_TAGS.map((tag, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 400 - 200, 
                    y: Math.random() * 400 - 200,
                    rotate: Math.random() * 60 - 30,
                    opacity: 0
                  }}
                  animate={{
                    x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                    y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                    rotate: [Math.random() * 60 - 30, Math.random() * 60 - 30],
                    opacity: [0.3, 0.7, 0.3],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{
                    duration: 15 + Math.random() * 15,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                  }}
                  className="absolute p-2 border border-white/10 text-muted/40 font-mono text-xs bg-void-black/90 backdrop-blur-md z-0 hover:text-white hover:border-white/40 hover:z-20 transition-all duration-300 cursor-pointer"
                  style={{
                    left: '50%',
                    top: '50%',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.8)'
                  }}
                  whileHover={{ scale: 1.2, rotate: 0 }}
                >
                  {tag}
                </motion.div>
              ))}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 <span className="text-5xl font-bold font-display text-white tracking-tight uppercase opacity-100">CHAOS</span>
              </div>
           </div>
        </div>

        {/* Divider Line - Broad, Bright, Faded Ends */}
        <div className="hidden md:block w-[2px] h-[80vh] bg-white mx-8 relative shadow-[0_0_10px_rgba(255,255,255,0.3)] opacity-80 mask-image-gradient-vertical" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }} />

        {/* Right: The Order */}
        <div className="flex-1 flex flex-col items-center justify-center relative w-full h-full p-8">
           <h3 className="text-volt font-bold font-mono uppercase tracking-widest mb-16 text-xl">The SkillTrail Way</h3>
           <div className="relative w-full max-w-md h-[500px] flex flex-col items-center justify-center">
              {/* Linear Path */}
              <div className="absolute h-full w-px bg-graphite/30">
                  <motion.div 
                    style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
                    className="absolute top-0 left-0 w-full h-full bg-volt shadow-[0_0_15px_var(--volt)]"
                  />
              </div>
              
              {/* Structured Nodes */}
              {["Foundations", "Architecture", "Implementation", "Mastery"].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="relative z-10 flex items-center w-full max-w-sm my-5 bg-void-black border border-white/10 p-4 group hover:border-volt/50 transition-colors duration-300"
                >
                  <div className="w-10 h-10 flex flex-shrink-0 items-center justify-center bg-volt text-void-black font-bold font-mono text-sm group-hover:scale-110 transition-transform duration-300">
                    0{i + 1}
                  </div>
                  <div className="flex-1 px-6 border-l border-white/10 ml-4 h-full flex items-center">
                    <span className="text-white font-mono uppercase tracking-wider text-base group-hover:text-volt transition-colors duration-300">{step}</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

      </div>

    </section>
  );
}
