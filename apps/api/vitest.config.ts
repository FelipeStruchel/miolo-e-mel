import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // Resolve os aliases do tsconfig.json (paths).
  plugins: [tsconfigPaths()],
  test: {
    globals: true, // describe, it e expect disponíveis sem import
    root: './',
    include: ['**/*.spec.ts'], // quais arquivos são testes
    coverage: {
      provider: 'v8', // como a cobertura é medida
      // Mede todo o código de src/, inclusive arquivos que nenhum teste importa (aparecem com 0%).
      include: ['src/**/*.ts'],
      // Fora da conta: arquivos de inicialização/fiação, módulos (só declaram), código gerado pelo Prisma e os próprios testes.
      exclude: [
        'src/main.ts',
        'src/setup-app.ts',
        'src/generated/**',
        'src/**/*.module.ts',
        'src/**/*.spec.ts',
      ],
      // Se qualquer índice ficar abaixo de 70%, `pnpm test:cov` falha (e o CI também).
      thresholds: { lines: 70, functions: 70, statements: 70 },
    },
  },
});
