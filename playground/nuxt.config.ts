export default defineNuxtConfig({
  modules: ['../src/module.ts'],
  imports: {
    autoImport: true,
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-07-14',
  twemoji: {
    expiresIn: 1,
  },
})
