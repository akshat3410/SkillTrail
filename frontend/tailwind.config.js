/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            colors: {
                bg: {
                    primary: '#0a0a0b',
                    secondary: '#111113',
                    tertiary: '#1a1a1d',
                    card: '#141416',
                },
                text: {
                    primary: '#fafafa',
                    secondary: '#a1a1aa',
                    muted: '#71717a',
                },
                border: {
                    DEFAULT: '#27272a',
                    hover: '#3f3f46',
                },
                accent: {
                    blue: '#3b82f6',
                    green: '#22c55e',
                },
            },
        },
    },
    plugins: [],
}
