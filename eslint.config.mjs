import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    '.nx/**',
    'next-env.d.ts',
    'libs/prisma-client/src/generated/**',
  ]),
]);

export default eslintConfig;
