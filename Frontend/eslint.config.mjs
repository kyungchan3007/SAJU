import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const config = [
  ...nextVitals,
  ...nextTypescript,
  prettierConfig,
  {
    ignores: [
      ".next/**",
      "apps/*/.next/**",
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
