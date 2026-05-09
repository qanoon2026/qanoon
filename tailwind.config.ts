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
        navy: {
          950: "#07111f",
          900: "#0b1f3a",
          800: "#12345a",
          700: "#18446f"
        },
        gold: {
          500: "#c9a227",
          400: "#dfbd52",
          100: "#fbf4dc"
        },
        ink: "#172033"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(7, 17, 31, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
