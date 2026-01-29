import { defineNuxtModule, createResolver, addComponent, extendViteConfig } from '@nuxt/kit'
import type { ModuleOptions } from './types'
import { defu } from 'defu'

export type { ModuleOptions }

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-twemoji',
    configKey: 'twemoji',
    compatibility: {
      nuxt: '>=3.0.0',
    },
  },
  defaults: {
    expiresIn: 3.154e+7,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    addComponent({
      name: 'Twemoji',
      global: true,
      filePath: resolve('./runtime/components/Twemoji.vue'),
    })

    addComponent({
      name: 'Twemojify',
      global: true,
      filePath: resolve('./runtime/components/Twemojify.vue'),
    })

    addComponent({
      name: 'TwemojiParse',
      global: true,
      filePath: resolve('./runtime/components/TwemojiParse.vue'),
    })

    extendViteConfig((config) => {
      config.optimizeDeps ||= {}
      config.optimizeDeps.include ||= []
      config.optimizeDeps.include.push('@twemoji/parser')
    })

    const runtimeConfig = nuxt.options.runtimeConfig
    runtimeConfig.public.twemoji = defu(runtimeConfig.public.twemoji, {
      expiresIn: options.expiresIn,
    })
  },
})
