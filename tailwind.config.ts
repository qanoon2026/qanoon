import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        // Refined luxury palette
        ivory: {
          50: "#fefefe",
          100: "#fdfdfb",
          200: "#faf9f5",
          300: "#f5f4ef",
          400: "#f0eee6",
          500: "#e8e4d9",
          600: "#d4d0c4",
          700: "#b8b4a7",
          800: "#9c988c",
          900: "#7d7970"
        },
        navy: {
          50: "#f7f8fa",
          100: "#e8ecf0",
          200: "#d1dbe4",
          300: "#b3c5d4",
          400: "#8fa8bb",
          500: "#6d8ba0",
          600: "#5a7388",
          700: "#4a5f70",
          800: "#3d4f5c",
          900: "#34424c",
          950: "#2a3741"
        },
        gold: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12"
        },
        // Semantic colors
        success: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a"
        },
        warning: {
          50: "#fffbeb",
          500: "#f59e0b",
          600: "#d97706"
        },
        error: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626"
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans Arabic",
          "sans-serif"
        ],
        display: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans Arabic",
          "sans-serif"
        ]
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }]
      },
      spacing: {
        18: "4.5rem",
        88: "22rem"
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 2px 15px 0 rgba(0, 0, 0, 0.08)",
        medium: "0 4px 25px 0 rgba(0, 0, 0, 0.12)",
        large: "0 8px 40px 0 rgba(0, 0, 0, 0.16)",
        xl: "0 20px 60px 0 rgba(0, 0, 0, 0.20)",
        glow: "0 0 20px rgba(234, 179, 8, 0.15)"
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        }
      }
    }
  },
  plugins: []
};

export default config;
