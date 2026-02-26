export const quizData = {
    id: 'quiz-node-3',
    title: 'Backpropagation Checkpoint',
    questions: [
        {
            id: 1,
            text: "What is the primary role of the Chain Rule in backpropagation?",
            options: [
                { id: 'a', text: "To initialize random weights" },
                { id: 'b', text: "To compute gradients layer-by-layer" },
                { id: 'c', text: "To normalize the input data" },
                { id: 'd', text: "To increase the learning rate" }
            ],
            correctId: 'b'
        },
        {
            id: 2,
            text: "If the loss landscape is flat, what happens to the gradient?",
            options: [
                { id: 'a', text: "The gradient becomes zero" },
                { id: 'b', text: "The gradient becomes infinite" },
                { id: 'c', text: "The gradient reverses direction" }
            ],
            correctId: 'a'
        }
    ]
};
