import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'openapi/openapi.yaml',
  output: 'src/generated/api',
  plugins: [
    {
      name: '@hey-api/typescript',
    },
    {
      name: 'zod',
      compatibilityVersion: 4,
    },
    {
      name: '@hey-api/sdk',
      validator: true,
    },
  ],
});
