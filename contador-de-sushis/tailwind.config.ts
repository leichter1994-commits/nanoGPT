import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        salmon: "#ff8a7a",
        soy: "#3c2f2f",
        rice: "#fff9f4",
        wasabi: "#94c973"
      },
      boxShadow: {
        soft: "0 12px 36px rgba(60, 47, 47, 0.18)"
      },
      keyframes: {
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
          "100%": { transform: "scale(1)" }
        },
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.9)" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translateY(-48px) scale(1.1)" }
        }
      },
      animation: {
        pop: "pop 260ms ease-out",
        floatUp: "floatUp 1s ease-out forwards"
      }
    }
  },
  plugins: []
};

export default config;
