export const roadmapData = {
    id: 'full-stack-ai',
    title: 'Full Stack AI Engineer',
    description: 'Master the complete stack of modern AI application development, from foundation models to production deployment.',
    progress: 35,
    stages: [
        {
            id: 'stage-1',
            title: 'Foundations',
            nodes: [
                {
                    id: 'node-1',
                    title: 'Generative AI Architecture',
                    description: 'Understand the high-level architecture of LLMs, Diffusion models, and the transformer block.',
                    status: 'completed',
                    type: 'CORE',
                    estTime: '2h 30m'
                },
                {
                    id: 'node-2',
                    title: 'Prompt Engineering',
                    description: 'Master the art of communicating with large language models efficiently.',
                    status: 'completed',
                    type: 'CORE',
                    estTime: '1h 45m'
                }
            ]
        },
        {
            id: 'stage-2',
            title: 'The Neural Engine',
            nodes: [
                {
                    id: 'node-3',
                    title: 'Backpropagation Math',
                    description: 'Deep dive into the calculus that powers gradient descent.',
                    status: 'active',
                    progress: 45,
                    type: 'CORE',
                    estTime: '4h 00m'
                },
                {
                    id: 'node-4',
                    title: 'Pytorch Fundamentals',
                    description: 'Learn the tensor operations and autograd mechanics in PyTorch.',
                    status: 'locked',
                    type: 'PRACTICAL',
                    estTime: '3h 15m'
                },
                {
                    id: 'node-5',
                    title: 'Attention Mechanisms',
                    description: 'Self-attention, multi-head attention, and positional encoding explained.',
                    status: 'locked',
                    type: 'CORE',
                    estTime: '2h 30m'
                }
            ]
        },
        {
            id: 'stage-3',
            title: 'LLM Systems',
            nodes: [
                {
                    id: 'node-6',
                    title: 'RAG Systems',
                    description: 'Retrieval Augmented Generation architecture and implementation.',
                    status: 'locked',
                    type: 'CORE',
                    estTime: '3h 00m'
                },
                {
                    id: 'node-7',
                    title: 'Vector Databases',
                    description: 'Storing and querying high-dimensional embeddings efficiently.',
                    status: 'locked',
                    type: 'ELECTIVE',
                    estTime: '1h 30m'
                }
            ]
        }
    ]
};
