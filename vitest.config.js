import { defineConfig } from 'vitest/config';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      include: ['src/**'],
      exclude: ['node_modules/', 'src/**/*.test.{js,jsx}', 'src/index.jsx'],
      all: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov', 'clover'],
      reportsDirectory: './coverage',
    },
  },
});
