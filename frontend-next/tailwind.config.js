/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
                display: ['Space Grotesk', 'sans-serif'],
            },
            colors: {
                'void-black': '#050505',
                paper: '#F2F2F2',
                graphite: '#1A1A1A',
                volt: '#CCFF00',
                muted: '#888888',
            },
            boxShadow: {
                'st-glow': '0 0 20px rgba(204, 255, 0, 0.3)',
            },
            borderRadius: {
                'none': '0',
            }
        },
    },
    plugins: [],
}
