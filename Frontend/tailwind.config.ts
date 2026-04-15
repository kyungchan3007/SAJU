import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/domain/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        saju: {
          pink: "rgb(var(--saju-pink) / <alpha-value>)",
          blue: "rgb(var(--saju-blue) / <alpha-value>)",
          text: "rgb(var(--saju-text) / <alpha-value>)",
          "secondary-border":
            "rgb(var(--saju-secondary-border) / <alpha-value>)",
          "secondary-bg": "rgb(var(--saju-secondary-bg) / <alpha-value>)",
          "secondary-hover": "rgb(var(--saju-secondary-hover) / <alpha-value>)",
          "secondary-text": "rgb(var(--saju-secondary-text) / <alpha-value>)",
          "secondary-ring": "rgb(var(--saju-secondary-ring) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 18px 80px rgba(15, 23, 42, 0.18)",
        "saju-primary":
          "0 10px 22px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.14)",
      },
      backgroundImage: {
        aura: "radial-gradient(circle at top, rgba(15, 118, 110, 0.24), transparent 36%), radial-gradient(circle at bottom right, rgba(251, 146, 60, 0.18), transparent 28%)",
        "saju-primary":
          "linear-gradient(135deg, rgb(var(--saju-pink) / 0.1) 0%, rgb(var(--saju-pink) / 0.1) 52%, rgb(var(--saju-blue) / 0) 100%)",
        "saju-primary-hover":
          "linear-gradient(135deg, rgb(var(--saju-pink) / 0.14) 0%, rgb(var(--saju-pink) / 0.14) 52%, rgb(var(--saju-blue) / 0.1) 100%)",
        "saju-primary-card":
          "linear-gradient(160deg, rgb(var(--saju-card-bg) / 0.8) 0%, rgb(var(--saju-card-bg-purple) / 0.6) 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
