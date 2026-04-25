import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#8B7340",
        "gold-light": "#B89B5E",
        cream: "#F7F5F0",
        "cream-accent": "#F0EDE6",
        dark: "#1A1A1A",
        muted: "#8A8A8A",
        "border-gold": "rgba(139, 115, 64, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
