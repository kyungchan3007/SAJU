// [DS] 역할: shared/ui 외부 공개 진입점. 도메인 코드는 가능하면 이 barrel export를 통해 공용 UI를 가져간다.
// [DS] 현재 사용처: app layout, auth, payment, mypage 등 여러 도메인의 공용 컴포넌트 import.
export { Badge } from "@/shared/ui/badge/badge";
export { Button, buttonVariants } from "@/shared/ui/button/button";
export { Card } from "@/shared/ui/card/card";
export { ConfirmModal } from "@/shared/ui/confirm-modal/confirm-modal";
export { Footer } from "@/shared/ui/footer/footer";
export { FormMessage } from "@/shared/ui/form-message/form-message";
export { IconBadge } from "@/shared/ui/icon-badge/icon-badge";
export { Input } from "@/shared/ui/input/input";
export { KakaoIcon } from "@/shared/ui/kakao-icon/kakao-icon";
export { Providers } from "@/shared/app-infra/query-provider/query-providers";
export {
  EmptyStateCard,
  ErrorStateCard,
  LoadingStateCard,
  StateCard,
} from "@/shared/ui/state-card/state-card";
export { PageContainer } from "@/shared/ui/page-container";
export { PageContentLayout } from "@/shared/ui/page-content-layout";
export { ProgressBar } from "@/shared/ui/progress-bar/progress-bar";
export { Select } from "@/shared/ui/select/select";
export { StatusMessage } from "@/shared/ui/status-message/status-message";
