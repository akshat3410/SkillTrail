'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Zap, Lock, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function NodeDetailPanel({ node, isOpen, onClose }) {
  if (!node) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-void-black/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-graphite/90 backdrop-blur-xl border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            <div className="p-10 h-full flex flex-col relative overflow-hidden">
              
              {/* Background Noise */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("/noise.png")' }} />

              <div className="relative z-10 flex items-center justify-between mb-12 border-b border-white/10 pb-6">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-volt flex items-center gap-2">
                  <div className="w-2 h-2 bg-volt rounded-full animate-pulse" />
                  Node Details
                </span>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                  <X className="w-5 h-5 text-muted group-hover:text-white transition-colors" />
                </button>
              </div>

              <div className="flex-1 relative z-10">
                <div className="flex items-center space-x-4 mb-8">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 text-white text-[10px] font-mono uppercase tracking-wider">
                    {node.type}
                  </span>
                  {node.estTime && (
                    <span className="flex items-center text-muted text-[10px] font-mono uppercase tracking-wider">
                      <Clock className="w-3 h-3 mr-2" />
                      {node.estTime}
                    </span>
                  )}
                </div>

                <h2 className="text-5xl font-display font-medium uppercase leading-[0.9] mb-8 text-white tracking-tight">
                  {node.title}
                </h2>

                <p className="text-lg text-muted/80 font-mono font-light leading-relaxed mb-12">
                  {node.description}
                </p>

                <div className="space-y-8 bg-void-black/30 p-8 border border-white/5">
                  <h3 className="text-xs font-mono font-bold uppercase text-white tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-volt" />
                    Curriculum
                  </h3>
                  <ul className="space-y-4">
                    {['Core Concepts', 'Practical Application', 'Best Practices', 'System Design'].map((item, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-400 font-mono group">
                        <span className="mr-4 text-volt/50 font-mono text-xs">0{i+1}</span>
                        <span className="group-hover:text-white transition-colors duration-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                {node.status === 'locked' ? (
                  <button disabled className="w-full py-5 bg-void-black/50 border border-white/5 text-muted font-mono font-bold uppercase tracking-widest flex items-center justify-center cursor-not-allowed opacity-50">
                    <Lock className="w-4 h-4 mr-3" />
                    Locked Access
                  </button>
                ) : (
                  <Link 
                    href={`/lesson/${node.id}`}
                    className="flex w-full py-5 bg-volt text-void-black font-mono font-bold uppercase tracking-widest items-center justify-center hover:bg-white transition-colors duration-300 group shadow-[0_0_20px_rgba(204,255,0,0.2)]"
                  >
                    <Zap className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
                    Initiate Lesson
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
