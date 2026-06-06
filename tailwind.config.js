/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          50: "#eef7ff",
          100: "#d8ecff",
          200: "#b9deff",
          300: "#89caff",
          400: "#50abff",
          500: "#2788ff",
          600: "#0f68fa",
          700: "#0b52e6",
          800: "#1042bb",
          900: "#133b94",
        },
        surface: {
          950: "#06080c",
          900: "#0b0f17",
          850: "#0e131f",
          800: "#111827",
          750: "#151d2b",
          700: "#1a2332",
          600: "#1f2937",
        },
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(80% 60% at 50% 0%, rgba(39,136,255,0.22) 0%, rgba(11,15,23,0) 60%)",
        "glow-radial": "radial-gradient(50% 50% at 50% 50%, rgba(39,136,255,0.12) 0%, transparent 100%)",
      },
      boxShadow: {
        glow: "0 0 60px rgba(39,136,255,0.25)",
        "glow-sm": "0 0 30px rgba(39,136,255,0.15)",
        card: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 4px rgba(0,0,0,0.1)",
        "card-hover": "0 0 0 1px rgba(39,136,255,0.3), 0 8px 32px rgba(39,136,255,0.12)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
