import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import {
  sajuColors,
  sajuFontSize,
  sajuGradients,
  sajuLayout,
  sajuRadii,
  sajuShadows,
  sajuZIndex,
} from "@saju/design-tokens";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/domain/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
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
          primary: sajuColors.brand.primary,
          purple: sajuColors.brand.purple,
          accent: sajuColors.brand.accent,
          border: sajuColors.brand.border,
          tint: sajuColors.brand.tint,
          soft: sajuColors.brand.soft,
          light: sajuColors.brand.light,
          bg: sajuColors.brand.bg,
          muted: sajuColors.brand.muted,
          subtle: sajuColors.brand.subtle,
        },
        /* ── 의미 기반 표면/텍스트/상태 토큰 ── */
        surface: {
          card: sajuColors.surface.card,
          raised: sajuColors.surface.raised,
          page: sajuColors.surface.page,
          soft: sajuColors.surface.soft,
          border: sajuColors.surface.border,
        },
        content: {
          primary: sajuColors.content.primary,
          secondary: sajuColors.content.secondary,
          muted: sajuColors.content.muted,
          subtle: sajuColors.content.subtle,
          inverse: sajuColors.content.inverse,
        },
        status: {
          danger: sajuColors.status.danger,
          success: sajuColors.status.success,
          warning: sajuColors.status.warning,
          info: sajuColors.status.info,
        },
        /* ── sketch 클래스 하위 호환 ── */
        sketch: {
          ink: sajuColors.legacySketch.ink,
          paper: sajuColors.legacySketch.paper,
          muted: sajuColors.legacySketch.muted,
          subtle: sajuColors.legacySketch.subtle,
          active: sajuColors.legacySketch.active,
          "active-bg": sajuColors.legacySketch.activeBg,
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
        xs: sajuRadii.xs,
        lg: sajuRadii.lg,
        md: sajuRadii.md,
        sm: sajuRadii.sm,
        "saju-card": sajuRadii.card,
        "saju-panel": sajuRadii.panel,
        "saju-modal": sajuRadii.modal,
      },
      boxShadow: {
        /* ── saju 그림자 ── */
        "saju-sm": sajuShadows.sm,
        "saju-md": sajuShadows.md,
        "saju-lg": sajuShadows.lg,
        "saju-card": sajuShadows.card,
        "saju-btn": sajuShadows.button,
        "saju-modal": sajuShadows.modal,
        "saju-dropdown": sajuShadows.dropdown,
        /* ── 구 sketch 이름 하위 호환 ── */
        "sketch-sm": "0 1px 4px rgba(89,86,233,0.10)",
      },
      backgroundImage: {
        "saju-gradient": sajuGradients.primary,
        "saju-gradient-br": sajuGradients.primaryBr,
      },
      maxWidth: {
        "saju-content": sajuLayout.content,
        "saju-reading": sajuLayout.reading,
        "saju-modal": sajuLayout.modal,
      },
      fontSize: sajuFontSize,
      zIndex: {
        nav: sajuZIndex.nav,
        overlay: sajuZIndex.overlay,
        modal: sajuZIndex.modal,
        toast: sajuZIndex.toast,
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
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite alternate",
        heartbeat: "heartbeat 1.2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
