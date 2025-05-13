/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffcc00',     // Dourado primário
        'primary-light': '#ffda44', // Dourado mais claro
        'primary-dark': '#d4aa00', // Dourado mais escuro
        'secondary': '#ff9500',   // Dourado secundário (mais alaranjado)
        'dark': '#121212',        // Preto não tão puro
        'darker': '#080808',      // Preto mais intenso
        'light': '#ffffff',       // Branco
        'gray-dark': '#1a1a1a',   // Cinza muito escuro
        'gray-light': '#333333',  // Cinza escuro
        'vip': '#bf9b30',         // Dourado VIP
        'accent': '#ff5e3a',      // Cor de destaque (opcional para chamadas de ação)
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
          "primary": "#ffcc00",     // Dourado
          "secondary": "#ff9500",   // Dourado mais alaranjado
          "accent": "#ff5e3a",      // Acento/destaque
          "neutral": "#191919",     // Cinza muito escuro
          "base-100": "#121212",    // Fundo escuro 
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