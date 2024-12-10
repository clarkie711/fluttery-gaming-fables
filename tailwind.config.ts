import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'sky-start': '#87CEEB',
        'sky-end': '#E0F6FF',
        'bird': '#FFD700',
        'pipe': '#228B22',
        'ground': '#8B4513',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'slide': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      },
      animation: {
        'float': 'float 2s ease-in-out infinite',
        'slide': 'slide 3s linear infinite',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
