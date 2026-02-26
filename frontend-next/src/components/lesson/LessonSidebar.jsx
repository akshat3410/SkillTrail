'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { ChevronLeft, Lock, CheckCircle, Circle } from 'lucide-react';

export default function LessonSidebar({ nodes, currentNodeId }) {
  return (
    <aside className="w-64 border-r border-white/10 bg-void-black hidden lg:flex flex-col h-[calc(100vh-5rem)] sticky top-20">
      <div className="p-6 border-b border-white/10">
        <Link href="/roadmap/full-stack-ai" className="flex items-center text-xs text-muted hover:text-white transition-colors uppercase tracking-widest font-mono mb-4">
           <ChevronLeft className="w-3 h-3 mr-1" />
           Back to Path
        </Link>
        <h3 className="text-sm font-bold text-white uppercase tracking-tight">
          The Neural Engine
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
         {nodes.map((node, index) => {
            const isActive = node.id === currentNodeId;
            const isLocked = node.status === 'locked';
            const isCompleted = node.status === 'completed';
            
            return (
               <div key={node.id} className={clsx(
                  "px-6 py-3 flex items-start space-x-3 transition-colors",
                  isActive ? "bg-white/5 border-r-2 border-volt" : "hover:bg-white/5"
               )}>
                  <div className="mt-0.5">
                     {isCompleted ? <CheckCircle className="w-4 h-4 text-volt" /> :
                      isLocked ? <Lock className="w-4 h-4 text-muted" /> :
                      <Circle className={clsx("w-4 h-4", isActive ? "text-white" : "text-muted")} />}
                  </div>
                  <div>
                     <p className={clsx(
                        "text-xs font-mono mb-1",
                        isActive ? "text-volt" : "text-muted"
                     )}>
                        0{index + 1}
                     </p>
                     <p className={clsx(
                        "text-sm font-medium leading-tight",
                        isActive ? "text-white" : "text-gray-400"
                     )}>
                        {node.title}
                     </p>
                  </div>
               </div>
            );
         })}
      </div>
    </aside>
  );
}
