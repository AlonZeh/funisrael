import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem"
      },
      screens: {
        "2xl": "1320px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-heebo)", "system-ui", "sans-serif"],
        display: ["var(--font-rubik)", "system-ui", "sans-serif"]
      },
      colors: {
        /* FUN-ISRAEL brand */
        cream: {
          50: "#FDFBF6",
          100: "#FAF6EC",
          200: "#F4ECD8"
        },
        ink: {
          50: "#F5F6F8",
          100: "#E7EAEF",
          200: "#C9CFDA",
          300: "#9FA8B8",
          400: "#6E7889",
          500: "#4A5363",
          600: "#2E3543",
          700: "#1C2230",
          800: "#10141E",
          900: "#070A12"
        },
        brand: {
          /* Sunset coral — premium, warm, friendly */
          50: "#FFF4F0",
          100: "#FFE3D9",
          200: "#FFC4AF",
          300: "#FF9B7C",
          400: "#FF7A55",
          500: "#FF5E33",
          600: "#E64419",
          700: "#B83312",
          800: "#86230B",
          900: "#561506"
        },
        sky: {
          50: "#EFF8FF",
          100: "#D8EEFF",
          200: "#B4DEFF",
          300: "#82C7FF",
          400: "#4FA9F7",
          500: "#2C8CE8",
          600: "#1B6FC6",
          700: "#14559A",
          800: "#0E3D70",
          900: "#082649"
        },
        mint: {
          50: "#EEFBF4",
          100: "#D6F4E2",
          200: "#A9E6C0",
          300: "#76D29A",
          400: "#4BBA7B",
          500: "#2EA063",
          600: "#1F804E",
          700: "#16633C",
          800: "#0F462B",
          900: "#082B1A"
        },
        sun: {
          50: "#FFFAEB",
          100: "#FFF1C2",
          200: "#FFE389",
          300: "#FFD24E",
          400: "#FFBE1F",
          500: "#F5A400",
          600: "#C68200",
          700: "#945F00",
          800: "#603D00",
          900: "#2E1D00"
        },
        whatsapp: {
          DEFAULT: "#25D366",
          dark: "#128C7E"
        }
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 4px 24px -4px rgba(15, 23, 42, 0.04)",
        card: "0 8px 28px -8px rgba(15, 23, 42, 0.10), 0 4px 12px -4px rgba(15, 23, 42, 0.05)",
        hover: "0 18px 40px -16px rgba(15, 23, 42, 0.18), 0 6px 18px -6px rgba(15, 23, 42, 0.08)",
        glow: "0 12px 40px -8px rgba(255, 94, 51, 0.35)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem"
      },
      backgroundImage: {
        "grid-soft":
          "linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)",
        "hero-blob":
          "radial-gradient(60% 60% at 30% 30%, rgba(255,190,31,0.30) 0%, rgba(255,190,31,0) 70%), radial-gradient(50% 50% at 80% 20%, rgba(255,94,51,0.30) 0%, rgba(255,94,51,0) 70%), radial-gradient(60% 60% at 70% 90%, rgba(75,186,123,0.25) 0%, rgba(75,186,123,0) 70%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shine: "shine 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
