import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "resume-blue": "#2563eb",
        "analysis-green": "#16a34a",
        "warning-yellow": "#d97706",
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
        },
      },
    },
  },
  plugins: [
    // No need for tailwindcss() here - it goes in vite.config.js instead
  ],
});
