import RoadmapClient from './RoadmapClient';

export function generateStaticParams() {
  return [{ slug: 'git-fundamentals' }, { slug: 'genai' }];
}

export default function RoadmapPage() {
  return <RoadmapClient />;
}
