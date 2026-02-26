'use client';

import { motion } from 'framer-motion';
import { Target, Layers, Zap } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: "Zero Fluff",
    desc: "We stripped away 90% of the internet's noise. Every node is a necessary step toward the objective."
  },
  {
    icon: Layers,
    title: "Context First",
    desc: "Learn why you need a tool before you learn the syntax. We build mental models, not just code snippets."
  },
  {
    icon: Zap,
    title: "Build to Learn",
    desc: "Theory is optional. Implementation is mandatory. You will build production-grade systems, not to-do apps."
  }
];

export default function ValueGrid() {
  return (
    <section className="bg-void-black border-y border-graphite/30 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-graphite/30">
          {VALUES.map((val, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative p-12 hover:bg-graphite/5 transition-colors duration-500"
            >
              {/* Highlight Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-volt/0 to-transparent group-hover:via-volt/50 transition-all duration-500" />
              
              <div className="mb-8 w-14 h-14 flex items-center justify-center bg-graphite/20 border border-graphite/40 group-hover:border-volt/50 group-hover:bg-volt/10 transition-all duration-300">
                <val.icon className="w-6 h-6 text-muted group-hover:text-volt transition-colors duration-300" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 font-display uppercase tracking-tight group-hover:text-volt transition-colors duration-300">
                {val.title}
              </h3>
              
              <p className="text-muted/80 leading-relaxed font-mono text-sm max-w-sm group-hover:text-muted transition-colors duration-300">
                {val.desc}
              </p>

              {/* Corner Accent */}
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-graphite group-hover:text-volt/30 transition-colors duration-300">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
