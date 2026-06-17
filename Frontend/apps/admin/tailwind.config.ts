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
    "./src/features/**/*.{ts,tsx}",
    "./src/widgets/**/*.{ts,tsx}",
    "./src/entities/**/*.{ts,tsx}",
    "./src/shared/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/design-tokens/src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        "saju-sm": sajuShadows.sm,
        "saju-md": sajuShadows.md,
        "saju-lg": sajuShadows.lg,
        "saju-card": sajuShadows.card,
      },
      backgroundImage: {
        "saju-gradient": sajuGradients.primary,
      },
      maxWidth: {
        "saju-content": sajuLayout.content,
        "saju-modal": sajuLayout.modal,
      },
      fontSize: sajuFontSize,
      zIndex: {
        nav: sajuZIndex.nav,
        overlay: sajuZIndex.overlay,
        modal: sajuZIndex.modal,
        toast: sajuZIndex.toast,
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
