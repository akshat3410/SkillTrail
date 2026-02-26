'use client';

export default function SkillRadarWidget() {
  return (
    <div className="bg-void-black border border-white/10 p-8 rounded-lg h-full relative overflow-hidden flex items-center justify-center">
       <span className="absolute top-8 left-8 text-xs font-mono uppercase tracking-widest text-muted">Skill Matrix</span>
       
       <div className="relative w-48 h-48 md:w-64 md:h-64">
          {/* Background Circles */}
          <div className="absolute inset-0 border border-white/10 rounded-full" />
          <div className="absolute inset-8 border border-white/10 rounded-full" />
          <div className="absolute inset-16 border border-white/5 rounded-full" />

          {/* Polygon Shape (CSS Clip Path or SVG) */}
          <svg className="absolute inset-0 w-full h-full p-4" viewBox="0 0 100 100">
             <polygon 
                points="50,10 90,40 80,80 20,80 10,40" 
                fill="rgba(204, 255, 0, 0.2)" 
                stroke="#CCFF00" 
                strokeWidth="2" 
                className="drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]"
             />
          </svg>

          {/* Labels */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 text-xs font-bold font-mono text-white">Logic</div>
          <div className="absolute bottom-10 right-0 translate-x-4 text-xs font-bold font-mono text-white">Code</div>
          <div className="absolute bottom-10 left-0 -translate-x-4 text-xs font-bold font-mono text-white">System</div>
       </div>
    </div>
  );
}
