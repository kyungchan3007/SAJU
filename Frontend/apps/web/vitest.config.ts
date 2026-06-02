import { defineConfig } from "vitest/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/test/**/*.test.ts", "src/**/test/**/*.test.tsx"],
    exclude: ["node_modules", ".next", "e2e", "src/generated/**"],
    clearMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "server-only": path.resolve(rootDir, "src/shared/test/server-only.ts"),
    },
  },
});
