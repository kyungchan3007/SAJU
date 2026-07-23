import Image from "next/image";
import styles from "@/features/community/ui/community.module.css";

export function CommunityHero() {
  return (
    <div className={`relative overflow-hidden ${styles.heroCard}`}>
      <div className={`relative w-full ${styles.heroMedia}`}>
        <Image
          src="/image/community/group.webp"
          alt="커뮤니티 히어로"
          fill
          sizes="(max-width: 768px) 100vw, 860px"
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 ${styles.heroOverlay}`} />
        <div className={`absolute inset-0 flex flex-col justify-center px-6 py-8 sm:px-12 sm:py-12 ${styles.heroContent}`}>
          <span className={`mb-4 inline-block w-fit rounded-full px-4 py-1 font-bold ${styles.heroBadge}`}>
            커뮤니티
          </span>
          <h1 className={`mb-3 font-black leading-snug tracking-tight text-white ${styles.heroTitle}`}>
            나와 비슷한 <br /> 기운의 사람들과
            <br />
            <span className={styles.heroAccent}>연결되어보세요</span>
          </h1>
          <p className={`font-bold leading-relaxed text-white ${styles.heroBody}`}>
            오행별 단체방부터 <br /> 소셜 모임 취향 모임까지
            <br />
            다양한 커뮤니티로 함께해요.
          </p>
        </div>
      </div>
    </div>
  );
}
