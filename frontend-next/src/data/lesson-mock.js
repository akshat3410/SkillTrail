export const lessonData = {
    id: 'node-3',
    title: 'Backpropagation Math',
    module: 'The Neural Engine',
    duration: '45 min',
    content: `
    <h2>The Engine of Learning</h2>
    <p>To understand how models learn, we must first understand how they correct their mistakes. This process, known as <strong>gradient descent</strong>, is the engine of modern intelligence.</p>
    
    <h3>The Chain Rule</h3>
    <p>At its core, backpropagation is just repeated application of the chain rule from calculus. We compute the derivative of the loss function with respect to every weight in the network.</p>
    
    <pre><code class="language-python">
# A simple implementation of the chain rule
def chain_rule(d_loss_d_output, d_output_d_input):
    return d_loss_d_output * d_output_d_input
    </code></pre>

    <h3>The Loss Landscape</h3>
    <p>Imagine a hiker trying to descend a mountain in pitch darkness. They can only feel the slope of the ground under their feet. If the slope goes down to the right, they take a step to the right. This is exactly what the optimizer does.</p>
  `,
    nextLessonId: 'node-4'
};
