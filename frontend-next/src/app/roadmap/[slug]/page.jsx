'use client';

import { useState } from 'react';
import { roadmapData } from '@/data/roadmap-mock';
import RoadmapHeader from '@/components/roadmap/RoadmapHeader';
import InteractiveMap from '@/components/roadmap/InteractiveMap';
import NodeDetailPanel from '@/components/roadmap/NodeDetailPanel';

export default function RoadmapPage({ params }) {
  const data = roadmapData;
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <main className="bg-void-black min-h-screen text-paper">
      <RoadmapHeader title={data.title} progress={data.progress} />
      
      <div className="relative">
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-graphite/20 to-transparent" />
         </div>

         <InteractiveMap 
            stages={data.stages} 
            onNodeClick={(node) => setSelectedNode(node)}
         />
      </div>

      <NodeDetailPanel 
        node={selectedNode} 
        isOpen={!!selectedNode} 
        onClose={() => setSelectedNode(null)} 
      />
    </main>
  );
}
