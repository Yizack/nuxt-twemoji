<script setup lang="ts">
import twemoji from '@twemoji/api'
import { onMounted, computed, useTemplateRef } from 'vue'
import type { NuxtTwemojiRuntimeOptions } from '../../types'
import { useRuntimeConfig } from '#imports'

const props = defineProps<{
  /**
   * Rendering mode
   */
  mode?: NuxtTwemojiRuntimeOptions['mode']
}>()

const config = useRuntimeConfig().public.twemoji as NuxtTwemojiRuntimeOptions

const renderMode = computed(() => props.mode !== undefined ? props.mode : config.mode)
const twemojiParse = useTemplateRef('twemojiParse')

onMounted(() => {
  if (!twemojiParse.value) return
  twemoji.parse(twemojiParse.value, {
    ext: renderMode.value === 'png' ? '.png' : '.svg',
    folder: renderMode.value === 'png' ? undefined : 'svg',
    className: 'twemojiParse',
  })
})
</script>

<template>
  <span ref="twemojiParse">
    <slot />
  </span>
</template>

<style>
img.twemojiParse {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
</style>
