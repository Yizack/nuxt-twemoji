<script setup>
import {
  twOrangeHeart,
  twFuelPump,
  twFaceWithRollingEyes,
  twBoy,
  twGirl,
  twStar,
  twPoliceCarLight
} from './../src/runtime/assets/emojis'
</script>


<template>
  <!-- Demo tables -->
  <table v-for="(demo, key) in demos" :key="key">
    <thead>
      <tr>
        <th style="width: 200px">{{ demo.name }}</th>
        <th>Twemoji (SVG)</th>
        <th>Twemoji (PNG)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(emoji, i) in demo.emojis" :key="i">
        <td>{{ emoji }}</td>
        <td><Twemoji :emoji="emoji" /></td>
        <td><Twemoji :emoji="emoji" png /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      demos: [
        {
          name: "Emoji",
          emojis: ['💙', '😍', '👍', '😂', '💀', '🚀', '😵‍💫', '🌟', '👨‍✈️'],
        },
        {
          name: "Code Point",
          emojis: [
            '2764',
            '1f618',
            'U+231B', 
            'u+1f60e',
            '1F44D-1F3FF',
            '1F9D1-200D-1F4BB',
            '1F9D1-1F3FB-200D-1F393',
            '1F408-200D-2B1B'
          ]
        },
        {
          name: "EmojiDefinition",
          emojis: [
            twOrangeHeart,
            twFuelPump,
            twFaceWithRollingEyes,
            twBoy,
            twGirl,
            twStar,
            twPoliceCarLight
          ]
        },
        {
          name: "Not Rendered",
          emojis: [
            '1234',
            { code: '1F46E', emoji: '👮' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  font-family: Arial;
  border-collapse: collapse;
  border-spacing: 0;
  border: 1px solid #ccc;
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  background-color: transparent;
}

table th, table td {
  text-align: left;
  padding: .75rem;
  vertical-align: top;
  border: 1px solid #ccc;
}
</style>
