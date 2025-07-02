<script setup lang="ts">
import twemoji from '@twemoji/api'
import { onMounted, useTemplateRef } from 'vue'

const props = defineProps<{
  png?: boolean
}>()

const twemojiParse = useTemplateRef('twemojiParse')
onMounted(() => {
  if (!twemojiParse.value) return
  twemoji.parse(twemojiParse.value, {
    ext: props.png ? '.png' : '.svg',
    folder: props.png ? undefined : 'svg',
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
