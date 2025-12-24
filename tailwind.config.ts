/** @type {import('tailwindcss').Config} */
export default {
  // Ativa a troca de tema baseada em uma classe (ex: <html class="dark">)
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          dark: '#1F2937',
        },
        // Adicionando cores semânticas para facilitar o suporte a Light/Dark mode
        background: {
          light: '#FFFFFF',
          dark: '#0F172A', // slate-900
        },
        surface: {
          light: '#F8FAFC',
          dark: '#1E293B', // slate-800
        }
      },
      fontFamily: {
        // Mapeando as opções que você criou no Customizer
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['ui-serif', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}