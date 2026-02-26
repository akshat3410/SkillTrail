import NewHeroSection from '@/components/home/NewHeroSection';
import ConceptVisualization from '@/components/home/ConceptVisualization';
import InteractionTease from '@/components/home/InteractionTease';
import ValueGrid from '@/components/home/ValueGrid';
import CinematicScroll from '@/components/home/CinematicScroll';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <main className="bg-void-black min-h-screen">
      <NewHeroSection />
      <ConceptVisualization />
      <ValueGrid />
      <CinematicScroll />
      <InteractionTease />
      <FinalCTA />
    </main>
  );
}
