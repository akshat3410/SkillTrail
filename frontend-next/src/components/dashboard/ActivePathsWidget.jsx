import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ActivePathsWidget() {
  return (
    <div className="bg-void-black border border-white/10 p-8 rounded-lg h-full">
       <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">Continue Learning</span>
       </div>

       <div className="space-y-4">
          <Link href="/roadmap/full-stack-ai" className="block group">
             <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-white group-hover:text-volt transition-colors">Full Stack AI Engineer</h4>
                <ArrowRight className="w-4 h-4 text-muted group-hover:translate-x-1 transition-transform" />
             </div>
             <p className="text-xs text-muted font-mono mb-3">Module 02: Neural Networks</p>
             <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-volt w-[35%]" />
             </div>
          </Link>
          
          <div className="border-t border-white/5 pt-4 opacity-50">
             <h4 className="font-bold text-muted">Rust for Systems</h4>
             <p className="text-xs text-muted font-mono mb-3">Module 01: Ownership</p>
             <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-white w-[12%]" />
             </div>
          </div>
       </div>
    </div>
  );
}
