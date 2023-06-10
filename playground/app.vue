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
  <div>
    <h1>Twemoji Examples</h1>
    <p>The <b>Twemoji</b> component renders emojis by emoji characters, codepoint or definition.</p>
    <table v-for="(demo, key) in twemojiDemos" :key="key">
      <thead>
        <tr>
          <th style="width: 200px">{{ demo.name }}</th>
          <th>Twemoji (SVG)</th>
          <th>Twemoji (PNG)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(emoji, i) in demo.emojis" :key="i">
          <td><code>{{ emoji }}</code></td>
          <td><Twemoji :emoji="emoji" /></td>
          <td><Twemoji :emoji="emoji" png /></td>
        </tr>
      </tbody>
    </table>
  </div>
  <hr>
  <div>
    <h1>Twemojify Examples</h1>
    <p>The <b>Twemojify</b> component parses a string text and replaces all emoji characters or unicode codepoints with Twemoji svg elements or png images.</p>
    <p v-for="(text, i) of twemojifyDemos" :key="i">
      <Twemojify :text="text" />
    </p>
  </div>
  <hr>
  <div>
    <h1>TwemojiParse Examples</h1>
    <p><b>Note</b>: This component has a drawback as it does not support SSR (Server-Side Rendering), functioning solely on the client-side.</p>
    <p>If we wrap elements with the <b>TwemojiParse</b> component, it will parse all emoji characters or unicode codepoints found.</p>
    <p>For example, the next code:</p>
    <code>
      <pre><b>&lt;TwemojiParse&gt;</b><br>
  &lt;h4&gt;Nuxt Twemoji 🚀&lt;/h4&gt;<br>
<b>&lt;/TwemojiParse&gt;</b><br></pre>
    </code>
    <p>Will be parsed to:</p>
    <TwemojiParse png>
      <h4>Nuxt Twemoji 🚀</h4>
    </TwemojiParse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      twemojiDemos: [
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
      ],
      twemojifyDemos: [
        "I ❤️ Nuxt 🚀",
        "Excited to start my Nuxt 🌟 project today! 💫",
        "Debugging 🔧 my Nuxt 🔍 app like a pro! 💻",
        "🌟 Cherishing every moment and making 📸 memories that last a lifetime! ❤️",
        "🌺 Finding joy in the simple things and appreciating the present 🌼 moment! 😊"
      ]
    }
  }
}
</script>

<style scoped>
table, div {
  font-family: Arial;
}

table {
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
