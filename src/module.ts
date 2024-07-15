import { defineNuxtModule, createResolver, addComponent } from '@nuxt/kit'
import { schema } from './schema'
import type { ModuleOptions } from './types'

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
    expiresIn: schema['expiresIn'].$default,
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

    // Merge options to app.config
    const runtimeOptions = Object.fromEntries(
      Object.entries(options)
        .filter(([key]) => key in schema),
    )
    nuxt.options.appConfig.twemoji = Object.assign(
      nuxt.options.appConfig.twemoji || {},
      runtimeOptions,
    )
    // Define types
    nuxt.hook('schema:extend', (schemas) => {
      schemas.push({
        appConfig: {
          twemoji: schema,
        },
      })
    })
  },
})
