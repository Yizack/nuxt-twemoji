<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, computed, defineComponent, h, watch } from 'vue'
import { toCodePoints } from '@twemoji/parser'
import type { NuxtTwemojiRuntimeOptions } from '../../types'
import type { EmojiDefinition } from '../assets/emojis'
import { useState, useRuntimeConfig } from '#imports'

const props = withDefaults(defineProps<{
  emoji: string | EmojiDefinition
  size?: string
  png?: boolean
}>(), {
  size: '1em',
})

const isString = typeof props.emoji === 'string'
const isDefinition = typeof props.emoji === 'object' && (props.emoji.code && props.emoji.emoji && props.emoji.name)

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

const vs16RegExp = /\uFE0F/g
const zeroWidthJoiner = String.fromCharCode(0x200D)
const removeVS16s = (rawEmoji: string) => {
  return !rawEmoji.includes(zeroWidthJoiner) ? rawEmoji.replace(vs16RegExp, '') : rawEmoji
}

const parsed = computed(() => {
  if (isHex.value) return twemoji.value
  return toCodePoints(removeVS16s(twemoji.value)).join('-')
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
    const { expiresIn } = useRuntimeConfig().public.twemoji as NuxtTwemojiRuntimeOptions
    if (expiresIn !== false && expiresIn > 0) {
      const expiry = localStorage.getItem(`twemoji-expiry`)
      if (Date.now() > Number(expiry)) {
        localStorage.removeItem(`twemoji-${parsed.value}`)
        localStorage.setItem(`twemoji-expiry`, String(Date.now() + expiresIn * 1000))
      }

      const cached = localStorage.getItem(`twemoji-${parsed.value}`)
      if (cached) {
        svgTwemojis.value[parsed.value] = cached
        return
      }
    }
  }

  isFetching.value = true
  const svgFetch = await fetchSVG()
  isFetching.value = false
  if (!svgFetch) return

  const svgBody = svgFetch.replace(/<\/*svg[^>]*>/g, '')
  svgTwemojis.value[parsed.value] = svgBody
  if (import.meta.client) {
    const { expiresIn } = useRuntimeConfig().public.twemoji as NuxtTwemojiRuntimeOptions
    if (expiresIn !== false && expiresIn > 0) {
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
