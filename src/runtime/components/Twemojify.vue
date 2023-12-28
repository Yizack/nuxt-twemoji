<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
// @ts-ignore
import { parse } from '../utils/twemojify'
import { useState } from '#imports'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  png: {
    type: Boolean,
    default: false
  }
})

const twemojify = useState(`twemojify:${props.png ? 'png' : 'svg'}`, () => ({}) as { [key: string]: string })
const parsedText = ref(props.text)


const loadTwemojify = async () => {
  const emojis = parse(props.text, { assetType: props.png ? 'png' : 'svg' })
  for (const { url, indices, text } of emojis) {
    if (twemojify.value[text]) {
      parsedText.value = parsedText.value.replace(props.text.slice(...indices), twemojify.value[text])
      continue
    }

    if (props.png) {
      twemojify.value[text] = `<img src="${url}" class="twemojify" />`
    }
    else {
      const svgFetch = await $fetch(url).then(async (res: any) => await res.text()).catch(() => '')
      const svgBody = svgFetch.replace(/<\/*svg[^>]*>/g, '')
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="twemojify">${svgBody}</svg>`
      twemojify.value[text] = svg
    }
    parsedText.value = parsedText.value.replace(props.text.slice(...indices), twemojify.value[text])
  }
}

watchEffect(async () => {
  parsedText.value = props.text
  await loadTwemojify()
})

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
