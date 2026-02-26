'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Check, X } from 'lucide-react';

export default function InteractionTease() {
  const [selected, setSelected] = useState(null);
  const correct = 1;

  return (
    <section className="py-32 bg-void-black border-y border-graphite/30 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at center, var(--graphite) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
        
        <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6 uppercase tracking-tight">Touch the System</h2>
            <p className="text-muted font-mono text-sm md:text-base max-w-xl mx-auto">
                Theory is optional. Implementation is mandatory. <span className="text-volt">Test your intuition.</span>
            </p>
        </div>

        <div className="w-full bg-void-black border border-graphite p-1 relative group">
            {/* Terminal Frame */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-volt/50" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-volt/50" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-volt/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-volt/50" />

            <div className="bg-graphite/10 p-8 md:p-12 border border-graphite/30 backdrop-blur-sm">
                
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-graphite/30">
                    <span className="text-xs font-mono text-volt uppercase tracking-widest">SYSTEM_QUERY::01</span>
                    <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                        <div className="w-2 h-2 rounded-full bg-green-500/20 animate-pulse" />
                    </div>
                </div>

                <h3 className="text-2xl md:text-3xl text-white font-display font-medium mb-10 leading-tight">
                    What is the primary bottleneck in scaling Transformer context windows?
                </h3>

                <div className="grid gap-4">
                {["Vanishing Gradient Problem", "Quadratic Attention Complexity", "Latent Space Collisions"].map((opt, i) => (
                    <button
                        key={i}
                        onClick={() => setSelected(i)}
                        className={clsx(
                            "w-full text-left p-5 border transition-all duration-300 font-mono text-sm relative overflow-hidden group/btn",
                            selected === i 
                            ? (i === correct 
                                ? "border-volt bg-volt text-void-black font-bold shadow-[0_0_30px_rgba(204,255,0,0.3)] scale-[1.02]" 
                                : "border-red-500 bg-red-900/20 text-red-200")
                            : "border-graphite/50 text-muted hover:border-white/50 hover:text-white hover:bg-white/5"
                        )}
                    >
                        <div className="relative z-10 flex justify-between items-center">
                            <span className="tracking-wide">
                                <span className="opacity-30 mr-4">0{i + 1}</span> {opt}
                            </span>
                            {selected === i && (
                                i === correct ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                ))}
                </div>

            </div>
        </div>

      </div>
    </section>
  );
}
