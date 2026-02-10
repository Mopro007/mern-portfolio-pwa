/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'dark-bg': '#111111',
                'dark-card': '#1A1A1A',
                'dark-border': '#2A2A2A',
                'accent-green': '#00FF99',
                'accent-green-bright': '#39FF14',
                'text-light': '#B0B0B0',
                'text-muted': '#707070'
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
                'pulse-green': 'pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00FF99, 0 0 10px #00FF99, 0 0 15px #00FF99' },
                    '100%': { boxShadow: '0 0 10px #00FF99, 0 0 20px #00FF99, 0 0 30px #00FF99' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'pulse-green': {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
