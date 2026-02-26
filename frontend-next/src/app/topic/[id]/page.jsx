import TopicPage from '@/components/pages/TopicPage'

export function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default function Page() {
  return <TopicPage />
}
