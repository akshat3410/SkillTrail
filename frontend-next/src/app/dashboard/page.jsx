import StreakWidget from '@/components/dashboard/StreakWidget';
import ActivePathsWidget from '@/components/dashboard/ActivePathsWidget';
import SkillRadarWidget from '@/components/dashboard/SkillRadarWidget';

export default function DashboardPage() {
  return (
    <main className="bg-void-black min-h-screen text-paper pb-32">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <header className="mb-12 flex items-end justify-between">
           <div>
              <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-white mb-2">
                 Welcome Back, Pilot
              </h1>
              <p className="text-muted font-mono">
                 Your cognitive systems are online.
              </p>
           </div>
           
           <div className="hidden md:block text-right">
              <div className="text-2xl font-display font-bold text-white">Lvl. 04</div>
              <div className="text-xs text-muted font-mono uppercase tracking-widest">Architect</div>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
           {/* Row 1 */}
           <div className="lg:col-span-1">
              <StreakWidget />
           </div>
           <div className="lg:col-span-2">
              <ActivePathsWidget />
           </div>

           {/* Row 2 */}
           <div className="lg:col-span-2">
              <div className="bg-graphite/10 border border-white/5 p-8 rounded-lg h-full flex flex-col justify-center items-center text-center">
                 <div className="text-6xl font-bold font-display text-white mb-4">85%</div>
                 <p className="text-muted font-mono uppsercase tracking-widest text-sm">Accuracy Rate</p>
              </div>
           </div>
           <div className="lg:col-span-1">
              <SkillRadarWidget />
           </div>
        </div>
      </div>
    </main>
  );
}
