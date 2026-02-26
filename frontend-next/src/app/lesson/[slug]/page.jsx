import { lessonData } from '@/data/lesson-mock';

export function generateStaticParams() {
  return [{ slug: 'git-fundamentals' }, { slug: 'genai' }];
}
import { roadmapData } from '@/data/roadmap-mock';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import LessonSidebar from '@/components/lesson/LessonSidebar';
import LessonContent from '@/components/lesson/LessonContent';

export default function LessonPage({ params }) {
  const lesson = lessonData;
  const stageNodes = roadmapData.stages[1].nodes; // Mocking nodes from the second stage

  return (
    <main className="bg-void-black min-h-screen text-paper">
      <RoadmapHeader title={roadmapData.title} progress={roadmapData.progress} />
      
      <div className="flex min-h-[calc(100vh-5rem)]">
         <LessonSidebar nodes={stageNodes} currentNodeId={lesson.id} />
         <div className="flex-1">
            <LessonContent 
               title={lesson.title} 
               content={lesson.content} 
               module={lesson.module}
               duration={lesson.duration}
            />
         </div>
      </div>
    </main>
  );
}
