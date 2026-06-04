// [DS] 역할: shared/ui 외부 공개 진입점. 도메인 코드는 가능하면 이 barrel export를 통해 공용 UI를 가져간다.
// [DS] 현재 사용처: app layout, auth, payment, mypage 등 여러 도메인의 공용 컴포넌트 import.
export {
  Badge,
  Button,
  buttonVariants,
  Card,
  ConfirmModal,
  EmptyStateCard,
  ErrorStateCard,
  FormMessage,
  IconBadge,
  Input,
  LoadingStateCard,
  ProgressBar,
  Select,
  StateCard,
} from "@saju/ui";
export type {
  ButtonProps,
  ButtonSize,
  ButtonVariant,
  CardProps,
  CardVariant,
  InputProps,
  InputStatus,
  SelectProps,
  SelectStatus,
  StateCardProps,
} from "@saju/ui";
export { Footer } from "@/shared/ui/footer/footer";
export { AppChromeOffset } from "@/shared/ui/app-chrome-offset.client";
export { KakaoIcon } from "@/shared/ui/kakao-icon/kakao-icon";
export { PageContainer } from "@/shared/ui/page-container";
export { PageContentLayout } from "@/shared/ui/page-content-layout";
export { StatusMessage } from "@/shared/ui/status-message/status-message";
