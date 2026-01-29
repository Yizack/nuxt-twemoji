export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-08-06',
  twemoji: {
    cache: { maxAge: 1 },
    mode: 'svg',
  },
})
