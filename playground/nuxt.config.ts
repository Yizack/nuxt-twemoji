export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  compatibilityDate: '2025-08-06',
  twemoji: {
    expiresIn: 1,
  },
})
