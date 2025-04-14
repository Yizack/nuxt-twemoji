<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, defineComponent, h, watch } from 'vue'
import { toCodePoints } from '@twemoji/parser'
import type { NuxtTwemojiRuntimeOptions } from './../types/schema'
import type { EmojiDefinition } from './../assets/emojis'
import { useState, useAppConfig } from '#imports'

const props = defineProps({
  emoji: {
    type: [String, Object as () => EmojiDefinition],
    required: true,
  },
  size: {
    type: String,
    default: '1em',
  },
  png: {
    type: Boolean,
    default: false,
  },
})

const isString = typeof props.emoji === 'string'
const isDefinition = typeof props.emoji === 'object' && props.emoji.code !== undefined && props.emoji.emoji !== undefined && props.emoji.name !== undefined

const isValid = computed(() => isString || isDefinition)

if (!isValid.value) {
  console.warn(`Invalid emoji property:`, props.emoji)
}

const twemoji = computed(() => {
  if (isDefinition) return props.emoji.code.toLowerCase()
  else if (isString) return props.emoji.replace(/u\+/gi, '').toLowerCase()
  return ''
})

const alt = computed(() => {
  if (isDefinition) return props.emoji.name
  else if (isString) return props.emoji
  return JSON.stringify(props.emoji)
})

const isHex = computed(() => (/^[0-9A-F]{1,6}(?:-[0-9A-F]{1,6})*$/i).test(twemoji.value))

const codePoint = ref<{ [key: string]: string }>({})
const isFetching = ref(false)

const parsed = computed(() => {
  if (isHex.value) return twemoji.value
  return toCodePoints(twemoji.value).join('-')
})

codePoint.value[parsed.value] = parsed.value

const cdn = 'https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets'
const emojiLinkPNG = computed(() => `${cdn}/72x72/${codePoint.value[parsed.value]}.png`)
const emojiLinkSVG = computed(() => `${cdn}/svg/${codePoint.value[parsed.value]}.svg`)

const fetchSVG = () => $fetch(emojiLinkSVG.value, { responseType: 'text' }).then(res => res as string).catch(() => null)
const svgTwemojis = useState('twemojis', () => ({}) as Record<string, string>)

const component = computed (() => {
  if (!svgTwemojis.value[parsed.value]) return
  return defineComponent({
    render() {
      return h('svg', {
        class: 'twemoji',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 36 36',
        width: props.size,
        height: props.size,
        innerHTML: svgTwemojis.value[parsed.value],
      })
    },
  })
})

const loadSVG = async () => {
  if (svgTwemojis.value[parsed.value] || !isValid.value) return

  if (import.meta.client) {
    const { expiresIn } = useAppConfig().twemoji as NuxtTwemojiRuntimeOptions
    if (expiresIn > 0) {
      const expiry = localStorage.getItem(`twemoji-expiry`)
      if (Date.now() > Number(expiry)) {
        localStorage.removeItem(`twemoji-${parsed.value}`)
        localStorage.setItem(`twemoji-expiry`, String(Date.now() + expiresIn * 1000)) // expires after 1 year
      }

      const cached = localStorage.getItem(`twemoji-${parsed.value}`)
      if (cached) {
        svgTwemojis.value[parsed.value] = cached
        return
      }
    }
  }

  isFetching.value = true
  let svgFetch = await fetchSVG()
  isFetching.value = false
  const split = parsed.value.split('-')
  while (!svgFetch && split.length > 1) {
    // While svgFetch fetch fails, retry with previous codepoint segments
    split.pop()
    codePoint.value[parsed.value] = split.join('-')
    svgFetch = await fetchSVG()
  }

  if (!svgFetch) return

  const svgBody = svgFetch.replace(/<\/*svg[^>]*>/g, '')
  svgTwemojis.value[parsed.value] = svgBody

  if (import.meta.client) {
    const { expiresIn } = useAppConfig().twemoji as NuxtTwemojiRuntimeOptions
    if (expiresIn > 0) {
      localStorage.setItem(`twemoji-${parsed.value}`, svgBody)
    }
  }
}

watch(() => props, async () => {
  codePoint.value[parsed.value] = parsed.value
  if (!props.png) await loadSVG()
}, { deep: true })

if (!props.png) await loadSVG()
</script>

<template>
  <span v-if="isFetching" />
  <img v-else-if="png" class="twemoji" :src="emojiLinkPNG" :alt="alt" :style="{ width: size, height: size }">
  <Component :is="component" v-else-if="component" />
  <span v-else>{{ twemoji }}</span>
</template>

<style>
.twemoji {
  display: inline-block;
  vertical-align: middle;
}
</style>
