export default function StreakWidget() {
  return (
    <div className="bg-graphite/20 border border-white/5 p-8 rounded-lg flex flex-col justify-between h-full">
       <div className="flex justify-between items-start">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">Current Streak</span>
          <div className="w-2 h-2 rounded-full bg-volt animate-pulse" />
       </div>
       <div>
          <div className="text-6xl md:text-8xl font-display font-bold text-volt leading-none">
             12<span className="text-lg md:text-2xl text-muted ml-2">DAYS</span>
          </div>
       </div>
       <div className="flex space-x-1 mt-6">
          {[...Array(7)].map((_, i) => (
             <div key={i} className={`h-1 flex-1 rounded-full ${i < 5 ? 'bg-volt' : 'bg-white/10'}`} />
          ))}
       </div>
    </div>
  );
}
