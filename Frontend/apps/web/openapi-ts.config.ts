import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@hey-api/openapi-ts";

const configDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  input: resolve(configDir, "./openapi/openapi.yaml"),
  output: resolve(configDir, "./src/generated/api"),
  plugins: [
    {
      name: "@hey-api/typescript",
    },
    {
      name: "zod",
      compatibilityVersion: 4,
    },
    {
      name: "@hey-api/sdk",
      validator: true,
    },
  ],
});
