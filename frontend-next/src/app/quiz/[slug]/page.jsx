import QuizClient from './QuizClient';

export function generateStaticParams() {
  return [{ slug: 'git-fundamentals' }, { slug: 'genai' }];
}

export default function QuizPage() {
  return <QuizClient />;
}
