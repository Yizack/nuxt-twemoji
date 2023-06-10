import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-twemoji',
    configKey: 'nuxtTwemoji',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  setup () {
    const { resolve } = createResolver(import.meta.url)
    addComponent({
      name: 'Twemoji',
      global: true,
      filePath: resolve('./runtime/components/Twemoji.vue')
    })
    addComponent({
      name: 'Twemojify',
      global: true,
      filePath: resolve('./runtime/components/Twemojify.vue')
    })
    addComponent({
      name: 'TwemojiParse',
      global: true,
      filePath: resolve('./runtime/components/TwemojiParse.vue')
    })
  }
})
