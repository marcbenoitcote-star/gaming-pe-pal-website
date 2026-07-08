import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ember: {
          400: "#ffb15c",
          500: "#ff8a2a"
        },
        reef: {
          300: "#67e8f9",
          400: "#22d3ee"
        },
        moss: {
          300: "#86efac",
          400: "#4ade80"
        },
        night: {
          900: "#071014",
          850: "#0c171b",
          800: "#101d22"
        }
      },
      boxShadow: {
        glow: "0 0 36px rgba(34, 211, 238, 0.18)",
        ember: "0 0 30px rgba(255, 138, 42, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
