'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Lock, Check, Zap } from 'lucide-react';

function MapNode({ node, index, onClick }) {
  const isLocked = node.status === 'locked';
  const isActive = node.status === 'active';
  const isCompleted = node.status === 'completed';

  return (
    <motion.div 
      onClick={() => !isLocked && onClick(node)}
      whileHover={!isLocked ? { scale: 1.02 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={clsx(
        "relative z-10 p-8 rounded-none w-full max-w-xl mx-auto mb-24 transition-all duration-300 group select-none",
        isLocked ? "cursor-not-allowed opacity-50 grayscale" : "cursor-pointer"
      )}
    >
      {/* Background Plate */}
      <div className={clsx(
        "absolute inset-0 border transition-all duration-500",
        isActive ? "bg-graphite/40 border-volt shadow-[0_0_30px_rgba(204,255,0,0.1)]" : 
        isCompleted ? "bg-void-black border-white/40" :
        "bg-void-black/20 border-white/5"
      )} />

      {/* Connector Line (Upwards) */}
      {index !== 0 && (
         <div className={clsx(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full h-24 w-px transition-colors duration-500",
            (isCompleted || isActive) ? "bg-volt shadow-[0_0_8px_var(--volt)]" : "bg-white/10"
         )} />
      )}

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className={clsx(
            "inline-block px-2 py-1 text-[10px] font-mono uppercase tracking-widest border mb-3 transition-colors duration-300",
            isActive ? "border-volt text-volt bg-volt/10" :
            isCompleted ? "border-white text-white" :
            "border-white/10 text-muted"
          )}>
            {node.type} :: {node.estTime}
          </span>
          
          <h3 className={clsx(
            "text-2xl md:text-3xl font-display font-medium uppercase leading-none mb-3 transition-colors duration-300",
            isActive ? "text-white" : 
            isLocked ? "text-white/30" : "text-white/80 group-hover:text-white"
          )}>
            {node.title}
          </h3>
          
          <p className="text-muted font-mono text-xs md:text-sm leading-relaxed max-w-sm">
            {node.description}
          </p>
        </div>

        <div className={clsx(
           "w-12 h-12 flex items-center justify-center border shrink-0 ml-6 transition-all duration-500",
           isActive ? "bg-volt border-volt text-void-black animate-pulse-slow shadow-[0_0_15px_var(--volt)]" :
           isCompleted ? "bg-white border-white text-void-black" :
           "bg-transparent border-white/10 text-white/20 group-hover:border-white/40 group-hover:text-white/60"
        )}>
           {isActive && <Zap className="w-5 h-5 fill-current" />}
           {isCompleted && <Check className="w-5 h-5" />}
           {isLocked && <Lock className="w-4 h-4" />}
        </div>
      </div>
    </motion.div>
  );
}

export default function InteractiveMap({ stages, onNodeClick }) {
  return (
    <div className="relative py-32 px-4 max-w-5xl mx-auto min-h-screen">
      
      {/* Background Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Central Spine */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-white/10 to-transparent" />
      
      {stages.map((stage, stageIndex) => (
        <div key={stage.id} className="mb-32 relative">
           <div className="sticky top-32 z-0 text-center mb-16 opacity-10 pointer-events-none mix-blend-overlay">
              <h2 className="text-[12rem] leading-none font-display font-bold uppercase tracking-tighter text-transparent stroke-text select-none"
                  style={{ WebkitTextStroke: '2px white' }}>
                0{stageIndex + 1}
              </h2>
           </div>

           <div className="relative z-10 space-y-12">
             {stage.nodes.map((node, nodeIndex) => (
               <MapNode 
                 key={node.id} 
                 node={node} 
                 index={stageIndex * 10 + nodeIndex}
                 onClick={onNodeClick}
               />
             ))}
           </div>
        </div>
      ))}
    </div>
  );
}
