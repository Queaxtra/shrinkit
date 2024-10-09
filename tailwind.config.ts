import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        "cBlack": "#1C1C1E",
        "cRed": "#FF6F61"
      }
    }
  },

  plugins: []
} as Config;
