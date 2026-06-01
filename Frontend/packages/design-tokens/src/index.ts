// [DS] domain:shared component:DesignTokens ui:token
// 패키지 분리 전에도 Tailwind/CSS 변수 밖에서 참조할 수 있는 토큰 단일 진입점.
export const sajuColors = {
  brand: {
    primary: "#5956E9",
    purple: "#7C3AED",
    accent: "#A5A3F7",
    border: "#E0DAFF",
    tint: "#EDE9FF",
    soft: "#F5F3FF",
    light: "#F0EEFF",
    bg: "#FAFAFA",
    muted: "#6B7280",
    subtle: "#9CA3AF",
  },
  surface: {
    card: "#FFFFFF",
    raised: "#FFFFFF",
    page: "#FAFAFA",
    soft: "#F9F8FF",
    border: "#E5E7EB",
  },
  content: {
    primary: "#111827",
    secondary: "#374151",
    muted: "#6B7280",
    subtle: "#9CA3AF",
    inverse: "#FFFFFF",
  },
  status: {
    danger: "#EF4444",
    success: "#16A34A",
    warning: "#F59E0B",
    info: "#06B6D4",
  },
  legacySketch: {
    ink: "#5956E9",
    paper: "#FAFAFA",
    muted: "#6B7280",
    subtle: "#9CA3AF",
    active: "#5956E9",
    activeBg: "#F0EEFF",
  },
} as const;

export const sajuRadii = {
  xs: "0.5rem",
  sm: "calc(var(--radius) - 4px)",
  md: "calc(var(--radius) - 2px)",
  lg: "var(--radius)",
  card: "1.25rem",
  panel: "1.5rem",
  modal: "1.75rem",
  full: "999px",
} as const;

export const sajuShadows = {
  sm: "0 1px 4px rgba(89,86,233,0.10)",
  md: "0 2px 12px rgba(89,86,233,0.12)",
  lg: "0 8px 32px rgba(89,86,233,0.20)",
  card: "0 2px 8px rgba(0,0,0,0.06)",
  button: "0 4px 14px rgba(89,86,233,0.35)",
  buttonHover: "0 6px 20px rgba(89,86,233,0.45)",
  modal: "0 24px 64px rgba(0,0,0,0.18)",
  dropdown: "0 16px 40px rgba(15,23,42,0.16)",
} as const;

export const sajuLayout = {
  content: "1152px",
  reading: "720px",
  modal: "360px",
} as const;

type SajuFontSizeToken = [
  string,
  {
    lineHeight: string;
  },
];

export const sajuFontSize: Record<string, SajuFontSizeToken> = {
  hero: ["var(--fs-hero)", { lineHeight: "1.2" }],
  title: ["var(--fs-title)", { lineHeight: "1.25" }],
  section: ["var(--fs-section)", { lineHeight: "1.45" }],
  body: ["var(--fs-body)", { lineHeight: "1.85" }],
  label: ["var(--fs-label)", { lineHeight: "1.4" }],
  badge: ["var(--fs-badge)", { lineHeight: "1.35" }],
};

export const sajuZIndex = {
  nav: "50",
  overlay: "190",
  modal: "200",
  toast: "300",
} as const;

export const sajuGradients = {
  primary: `linear-gradient(to right, ${sajuColors.brand.primary}, ${sajuColors.brand.purple})`,
  primaryBr: `linear-gradient(135deg, ${sajuColors.brand.primary}, ${sajuColors.brand.purple})`,
} as const;
