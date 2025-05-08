/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',     // Branco
        'secondary': '#000000',   // Preto
        'dark': '#121212',
        'light': '#ffffff',
        'accent': '#333333',      // Cinza escuro
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'display': ['SF Pro Display', 'Helvetica', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 5px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-party': 'linear-gradient(to right, #ffffff, #000000)',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        nightclub: {
          "primary": "#ffffff",     // Branco
          "secondary": "#000000",   // Preto
          "accent": "#333333",      // Cinza escuro
          "neutral": "#191919",     
          "base-100": "#121212",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkTheme: "nightclub",
  },
}