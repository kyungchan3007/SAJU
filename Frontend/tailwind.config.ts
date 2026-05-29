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
          primary: "#5956E9",    // 주요 CTA, 활성 탭, 포커스 링, 브랜드 아이콘
          purple: "#7C3AED",     // 주요 그라디언트 끝 색상, 프리미엄 강조
          accent: "#A5A3F7",     // 어두운 보라색 표면 위 보조 텍스트
          border: "#E0DAFF",     // 선택 카드, 보라색 테두리
          tint: "#EDE9FF",       // 연보라 패널 배경
          soft: "#F5F3FF",       // hover/선택 약한 배경
          light: "#F0EEFF",      // 배지, 아이콘 타일 배경
          bg: "#FAFAFA",         // 앱 배경
          muted: "#6B7280",      // 보조 본문/도움말 텍스트
          subtle: "#9CA3AF",     // 라벨, placeholder
        },
        /* ── 의미 기반 표면/텍스트/상태 토큰 ── */
        surface: {
          card: "#FFFFFF",       // 카드, 모달, 시트 표면
          raised: "#FFFFFF",     // 그림자가 있는 상위 패널
          page: "#FAFAFA",       // 페이지 배경
          soft: "#F9F8FF",       // 결과/상세 콘텐츠 박스
          border: "#E5E7EB",     // 중립 테두리/입력 필드
        },
        content: {
          primary: "#111827",    // 제목, 주요 텍스트
          secondary: "#374151",  // 본문 텍스트
          muted: "#6B7280",      // 도움말 텍스트
          subtle: "#9CA3AF",     // 라벨, placeholder
          inverse: "#FFFFFF",    // 브랜드/어두운 표면 위 텍스트
        },
        status: {
          danger: "#EF4444",     // 파괴적 액션, 오류
          success: "#16A34A",    // 성공/완료 상태
          warning: "#F59E0B",    // 경고/중간 점수
          info: "#06B6D4",       // 정보/보조 점수
        },
        /* ── sketch 클래스 하위 호환 ── */
        sketch: {
          ink: "#5956E9",
          paper: "#FAFAFA",
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
        xs: "0.5rem",                      // 8px - 작은 컨트롤, 작은 배지
        lg: "var(--radius)",               // 14px - 기본 카드/컨트롤 반경
        md: "calc(var(--radius) - 2px)",   // 12px - 버튼, 입력 필드
        sm: "calc(var(--radius) - 4px)",   // 10px - 소형 컨트롤
        "saju-card": "1.25rem",            // 20px - 큰 카드
        "saju-panel": "1.5rem",            // 24px - 결과 카드, 패널
        "saju-modal": "1.75rem",           // 28px - 확인 모달/다이얼로그 표면
      },
      boxShadow: {
        /* ── saju 그림자 ── */
        "saju-sm":    "0 1px 4px rgba(89,86,233,0.10)",  // 약한 브랜드 elevation
        "saju-md":    "0 2px 12px rgba(89,86,233,0.12)", // 패널
        "saju-lg":    "0 8px 32px rgba(89,86,233,0.20)", // 히어로/중요 카드
        "saju-card":  "0 2px 8px rgba(0,0,0,0.06)",      // 기본 화이트 카드
        "saju-btn":   "0 4px 14px rgba(89,86,233,0.35)", // 주요 CTA
        "saju-modal": "0 24px 64px rgba(0,0,0,0.18)",    // 확인 모달/다이얼로그
        /* ── 구 sketch 이름 하위 호환 ── */
        "sketch-sm": "0 1px 4px rgba(89,86,233,0.10)",
      },
      backgroundImage: {
        "saju-gradient": "linear-gradient(to right, #5956E9, #7C3AED)",
        "saju-gradient-br": "linear-gradient(135deg, #5956E9, #7C3AED)",
      },
      maxWidth: {
        "saju-content": "1152px", // 일반 콘텐츠 페이지
        "saju-reading": "720px",  // 결과/리딩형 상세 페이지
        "saju-modal": "360px",    // 확인 모달/다이얼로그 콘텐츠
      },
      fontSize: {
        "saju-title": ["1.375rem", { lineHeight: "1.25" }],   // 22px - 주요 콘텐츠 제목
        "saju-section": ["0.9375rem", { lineHeight: "1.45" }], // 15px - 섹션 제목
        "saju-body": ["0.8125rem", { lineHeight: "1.85" }],    // 13px - 본문/리딩 텍스트
        "saju-label": ["0.75rem", { lineHeight: "1.4" }],      // 12px - 라벨
        "saju-badge": ["0.6875rem", { lineHeight: "1.35" }],   // 11px - 배지
      },
      zIndex: {
        nav: "50",      // 글로벌 내비게이션
        overlay: "190", // 모달/다이얼로그 백드롭
        modal: "200",   // 모달/다이얼로그 콘텐츠
        toast: "300",   // 토스트/긴급 피드백
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
