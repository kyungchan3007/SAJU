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
        /* ── saju 브랜드 컬러 ── */
        saju: {
          primary: "#5956E9",    // 메인 퍼플
          purple: "#7C3AED",     // 딥 퍼플
          light: "#F0EEFF",      // 연보라 (배지·배경)
          bg: "#F4F2FC",         // 페이지 배경
          muted: "#6B7280",      // 보조 텍스트
          subtle: "#9CA3AF",     // 3차 텍스트
        },
        /* ── sketch 클래스 하위 호환 ── */
        sketch: {
          ink: "#5956E9",
          paper: "#F4F2FC",
          muted: "#6B7280",
          subtle: "#9CA3AF",
          active: "#5956E9",
          "active-bg": "#F0EEFF",
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
        lg: "var(--radius)",               // 14px
        md: "calc(var(--radius) - 2px)",   // 12px
        sm: "calc(var(--radius) - 4px)",   // 10px
      },
      boxShadow: {
        /* ── saju 그림자 ── */
        "saju-sm":   "0 1px 4px rgba(89,86,233,0.10)",
        "saju-md":   "0 2px 12px rgba(89,86,233,0.12)",
        "saju-lg":   "0 8px 32px rgba(89,86,233,0.20)",
        "saju-card": "0 2px 8px rgba(0,0,0,0.06)",
        "saju-btn":  "0 4px 14px rgba(89,86,233,0.35)",
        /* ── 구 sketch 이름 하위 호환 ── */
        "sketch-sm": "0 1px 4px rgba(89,86,233,0.10)",
      },
      backgroundImage: {
        "saju-gradient": "linear-gradient(to right, #5956E9, #7C3AED)",
        "saju-gradient-br": "linear-gradient(135deg, #5956E9, #7C3AED)",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(-1.5deg)" },
          "100%": { transform: "rotate(1.5deg)" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.18)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite alternate",
        heartbeat: "heartbeat 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
