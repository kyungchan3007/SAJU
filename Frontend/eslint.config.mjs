import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const config = [
  ...nextVitals,
  ...nextTypescript,
  prettierConfig,
  {
    // 빌드 산출물은 검사하지 않는다. 모두 .gitignore 대상이며, 로컬에서 빌드한 사람만
    // lint가 깨지는 상황을 막기 위해 cwd가 루트일 때와 apps/web일 때를 모두 커버한다.
    ignores: [
      ".next/**",
      "apps/*/.next/**",
      ".open-next/**",
      "apps/*/.open-next/**",
      "storybook-static/**",
      "apps/*/storybook-static/**",
      "node_modules/**",
      "coverage/**",
      "apps/*/coverage/**",
      "out/**",
      "apps/*/out/**",
      "public/**",
      "src/generated/**",
      "apps/web/src/generated/**",
      "packages/*/dist/**",
    ],
  },
];

export default config;
