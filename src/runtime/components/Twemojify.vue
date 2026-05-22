<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { parse } from '@twemoji/parser'
import type { NuxtTwemojiRuntimeOptions } from '../../types'
import { useState, useRuntimeConfig } from '#imports'

const props = defineProps<{
  /**
   * The text containing emojis to parse
   */
  text: string
  /**
   * Rendering mode
   */
  mode?: 'svg' | 'png'
}>()

const config = useRuntimeConfig().public.twemoji as NuxtTwemojiRuntimeOptions

const renderMode = computed(() => props.mode !== undefined ? props.mode : config.mode)
const twemojify = useState(`twemojify:${renderMode.value}`, () => ({}) as Record<string, string>)
const parsedText = ref(props.text)

const vs16RegExp = /️/gu
const removeVS16s = (text: string) => text.replace(vs16RegExp, '')

const replaceEmojis = (emoji: string, indices: number[], source: string) => {
  if (!twemojify.value[emoji]) return parsedText.value
  return parsedText.value.replace(source.slice(...indices), twemojify.value[emoji])
}

const loadTwemojify = async () => {
  const trimmed = removeVS16s(props.text)
  parsedText.value = trimmed

  const emojis = parse(trimmed, { assetType: renderMode.value })

  for (const { url, indices, text: emoji } of emojis) {
    if (!url) continue

    if (twemojify.value[emoji]) {
      parsedText.value = replaceEmojis(emoji, indices, trimmed)
      continue
    }

    if (renderMode.value === 'png') {
      twemojify.value[emoji] = `<img src="${url}" class="twemojify" />`
    }
    else {
      if (import.meta.client) {
        const expiry = localStorage.getItem(`twemoji-expiry`)
        if (config.cache && config.cache.maxAge > 0) {
          if (Date.now() > Number(expiry)) {
            localStorage.removeItem(`twemojify-${emoji}`)
            localStorage.setItem(`twemoji-expiry`, String(Date.now() + config.cache.maxAge * 1000))
          }

          const cached = localStorage.getItem(`twemojify-${emoji}`)
          if (cached) {
            twemojify.value[emoji] = cached
            parsedText.value = replaceEmojis(emoji, indices, trimmed)
            continue
          }
        }
      }
      const svgFetch = await $fetch(url, { responseType: 'text' }).then(res => res as string).catch(() => '')
      const svgBody = svgFetch.replace(/<\/*svg[^>]*>/g, '')
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="twemojify">${svgBody}</svg>`
      twemojify.value[emoji] = svg

      if (import.meta.client) {
        if (config.cache && config.cache.maxAge > 0) {
          localStorage.setItem(`twemojify-${emoji}`, svg)
        }
      }
    }
    parsedText.value = replaceEmojis(emoji, indices, trimmed)
  }
}

watch(() => props, async () => {
  await loadTwemojify()
}, { deep: true })

await loadTwemojify()
</script>

<!-- eslint-disable vue/no-v-html -->
<template>
  <span v-html="parsedText" />
</template>
