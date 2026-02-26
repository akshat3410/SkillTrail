'use client';

import { motion } from 'framer-motion';

export default function LessonContent({ title, content, module, duration }) {
  return (
    <article className="max-w-3xl mx-auto px-6 py-12 lg:py-20">
      <header className="mb-12">
        <div className="flex items-center space-x-3 mb-6">
           <span className="text-xs font-mono text-volt uppercase tracking-widest border border-volt px-2 py-0.5 rounded-sm">
              Lesson
           </span>
           <span className="text-xs font-mono text-muted uppercase tracking-widest">
              {module} • {duration}
           </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white mb-8">
          {title}
        </h1>
      </header>

      <div 
        className="prose prose-invert prose-lg max-w-none 
        prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
        prose-p:font-mono prose-p:text-gray-300 prose-p:leading-relaxed
        prose-pre:bg-graphite prose-pre:border prose-pre:border-white/10
        prose-strong:text-white"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
      
      <div className="mt-20 pt-12 border-t border-white/10 flex justify-end">
         <button className="px-8 py-4 bg-volt text-void-black font-mono font-bold uppercase tracking-wide hover:opacity-90 transition-opacity">
            Mark as Complete
         </button>
      </div>
    </article>
  );
}
