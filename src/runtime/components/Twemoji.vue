<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, defineComponent, h, watchEffect } from 'vue'
import twemoji from 'twemoji'
import { version } from 'twemoji/package.json'
import { useState } from '#imports'

const props = defineProps({
  emoji: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: '1em'
  },
  png: {
    type: Boolean,
    default: false
  }
})

const isHex = computed(() => (/^[0-9A-Fa-f]{1,6}(-[0-9A-Fa-f]{1,6})?$/i).test(props.emoji.replace(/u\+/ig, '')))

const components = useState('components', () => ({}))
const codePoint = useState('codepPoint', () => ({}))
const isFetching = ref(false)

const parsed =  computed(() => isHex.value ? props.emoji.toLowerCase().replace(/u\+/ig, '') : twemoji.convert.toCodePoint(props.emoji))
codePoint.value[parsed.value] = parsed.value
console.log(props.emoji.toLowerCase());
const cdn = 'https://cdn.jsdelivr.net/gh/twitter/twemoji'
const emojiLinkPNG = computed(() => `${cdn}@${version}/assets/72x72/${codePoint.value[parsed.value]}.png`)

const emojiLinkSVG = computed(() => `${cdn}@${version}/assets/svg/${codePoint.value[parsed.value]}.svg`)
const fetchSVG = () => $fetch(emojiLinkSVG.value).then(async (res) => await res.text()).catch(() => undefined)

const component = computed(() => defineComponent(components.value[parsed.value]))

const loadSVG = async () => {
  isFetching.value = true
  let svg = await fetchSVG()
  isFetching.value = false
  const split = parsed.value.split('-')
  while (!svg && split.length > 1) {
    split.pop()
    codePoint.value[parsed.value] = split.join('-')
    svg = await fetchSVG()
  }
  if (!svg) return
  components.value[parsed.value] = h('svg', {
    class: 'twemoji',
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 36 36',
    innerHTML: svg.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
  })
}
watchEffect(() => codePoint.value, loadSVG)
!props.png && await loadSVG()
</script>

<template>
  <span v-if="isFetching" />
  <img v-else-if="png" class="twemoji" :src="emojiLinkPNG" :alt="emoji" :style="{ width: size, height: size }">
  <Component :is="component" v-else-if="component" :width="size" :height="size" />
  <span v-else>{{ isHex ? emoji : null }}</span>
</template>

<style>
.twemoji {
  display: inline-block;
  vertical-align: middle;
}
</style>
