<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watch } from 'vue'
import { parse } from '@twemoji/parser'
import type { NuxtTwemojiRuntimeOptions } from './../../schema-types'
import { useState, useAppConfig } from '#imports'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  png: {
    type: Boolean,
    default: false,
  },
})

const twemojify = useState(`twemojify:${props.png ? 'png' : 'svg'}`, () => ({}) as Record<string, string>)
const parsedText = ref(props.text)

const replaceEmojis = (emoji: string, indices: number[]) => {
  if (!twemojify.value[emoji]) return parsedText.value
  return parsedText.value.replace(props.text.slice(...indices), twemojify.value[emoji])
}

const loadTwemojify = async () => {
  const emojis = parse(props.text, { assetType: props.png ? 'png' : 'svg' })
  for (const { url, indices, text: emoji } of emojis) {
    if (twemojify.value[emoji]) {
      parsedText.value = replaceEmojis(emoji, indices)
      continue
    }

    if (props.png) {
      twemojify.value[emoji] = `<img src="${url}" class="twemojify" />`
    }
    else {
      if (import.meta.client) {
        const { expiresIn } = useAppConfig().twemoji as NuxtTwemojiRuntimeOptions
        const expiry = localStorage.getItem(`twemoji-expiry`)
        if (expiresIn > 0) {
          if (Date.now() > Number(expiry)) {
            localStorage.removeItem(`twemojify-${emoji}`)
            localStorage.setItem(`twemoji-expiry`, String(Date.now() + expiresIn * 1000)) // expires after 1 year
          }

          const cached = localStorage.getItem(`twemojify-${emoji}`)
          if (cached) {
            twemojify.value[emoji] = cached
            parsedText.value = replaceEmojis(emoji, indices)
            continue
          }
        }
      }
      const svgFetch = await $fetch(url, { responseType: 'text' }).then(res => res as string).catch(() => '')
      const svgBody = svgFetch.replace(/<\/*svg[^>]*>/g, '')
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="twemojify">${svgBody}</svg>`
      twemojify.value[emoji] = svg

      if (import.meta.client) {
        const { expiresIn } = useAppConfig().twemoji as NuxtTwemojiRuntimeOptions
        if (expiresIn > 0) {
          localStorage.setItem(`twemojify-${emoji}`, svg)
        }
      }
    }
    parsedText.value = replaceEmojis(emoji, indices)
  }
}

watch(() => props, async () => {
  parsedText.value = props.text
  await loadTwemojify()
}, { deep: true })

await loadTwemojify()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-html="parsedText" />
</template>

<style>
.twemojify {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
</style>
