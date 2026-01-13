import { svelte } from '@sveltejs/vite-plugin-svelte'
/// <reference types="vitest/config" />
import { playwright } from '@vitest/browser-playwright'
import { resolve } from 'node:path'
import { cwd } from 'node:process'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './src',
  plugins: [svelte()],
  resolve: {
    alias: {
      '~/components': resolve(cwd(), './src/components'),
      '~/styles': resolve(cwd(), './src/styles'),
    },
  },
  test: {
    root: '.',
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
      headless: true,
    },
  },
})
