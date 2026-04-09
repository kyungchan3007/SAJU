import Link from "next/link";

import { Button } from "@/shared/ui";
import styles from "@/widgets/welcom-section/ui/welcom-section.module.css";

export const CtaButton = () => {
  return (
    <>
      <div
        className={`${styles.starAppear4} flex flex-col items-center gap-3 sm:flex-row`}
      >
        <Button
          asChild
          size="lg"
          style={{
            background: "rgba(100,40,200,0.28)",
            border: "1px solid rgba(180,130,255,0.45)",
            color: "rgba(235,220,255,0.97)",
            boxShadow:
              "0 0 24px rgba(120,60,220,0.25), 0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(200,170,255,0.15)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Link href="/saju">✨ 내 사주 보기</Link>
        </Button>

        <Button
          asChild
          size="lg"
          style={{
            background: "transparent",
            border: "1px solid rgba(180,130,255,0.25)",
            color: "rgba(210,185,255,0.80)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Link href="/compatibility">💞 궁합 확인하기</Link>
        </Button>
      </div>
      <p
        className={`${styles.starAppear5} mt-5 text-xs tracking-widest`}
        style={{ color: "rgba(255,190,230,0.55)" }}
      >
        오행 ✦ 천간지지 ✦ 사주 해석
      </p>
    </>
  );
};
