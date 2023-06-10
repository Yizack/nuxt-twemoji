<script setup lang="ts">
import twemoji, { Twemoji } from '@twemoji/api'
import { onMounted, ref } from 'vue'

const props = defineProps({
  png: {
    type: Boolean,
    default: false
  }
})

const twemojiParse = ref({} as HTMLElement)
onMounted(() => {
  (twemoji as Twemoji).parse(twemojiParse.value, {
    ext: props.png ? '.png' : '.svg',
    folder: props.png ? undefined : 'svg',
    className: 'twemojiParse'
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
