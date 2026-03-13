<script setup lang="ts">
import twemoji from '@twemoji/api'
import { onMounted, computed, useTemplateRef } from 'vue'
import type { NuxtTwemojiRuntimeOptions } from '../../types'
import { useRuntimeConfig } from '#imports'

const props = defineProps<{
  /**
   * Rendering mode
   */
  mode?: 'svg' | 'png'
}>()

const config = useRuntimeConfig().public.twemoji as NuxtTwemojiRuntimeOptions

const renderMode = computed(() => props.mode !== undefined ? props.mode : config.mode)
const twemojiParse = useTemplateRef('twemojiParse')

onMounted(() => {
  if (!twemojiParse.value) return
  twemoji.parse(twemojiParse.value, {
    ext: renderMode.value === 'png' ? '.png' : '.svg',
    folder: renderMode.value === 'png' ? undefined : 'svg',
    className: 'twemoji-parse',
  })
})
</script>

<template>
  <span ref="twemojiParse">
    <slot />
  </span>
</template>
