<template>
  <!-- Using Emojis -->
  <table>
    <thead>
      <tr>
        <th style="width: 200px">Emoji</th>
        <th>Twemoji (SVG)</th>
        <th>Twemoji (PNG)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(emoji, i) in emojis" :key="i">
        <td>{{ emoji }}</td>
        <td><Twemoji :emoji="emoji" /></td>
        <td><Twemoji :emoji="emoji" png /></td>
      </tr>
    </tbody>
  </table>

  <!-- Using Code Points-->
  <table>
    <thead>
      <tr>
        <th style="width: 200px">Code Point</th>
        <th>Twemoji (SVG)</th>
        <th>Twemoji (PNG)</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(codePoint, i) in codePoints" :key="i">
        <td>{{ codePoint }}</td>
        <td><Twemoji :emoji="codePoint" /></td>
        <td><Twemoji :emoji="codePoint" png /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      emojis: ['💙', '😍', '👍', '😂', '💀', '🚀', '😵‍💫', '🌟', '👨‍✈️'],
      codePoints: ['2764', '1f618', 'U+231B', 'u+1f60e', '1F44D-1F3FF', '1F9D1-200D-1F4BB', '1F9D1-1F3FB-200D-1F393', '1F408-200D-2B1B']
    }
  }
};
</script>

<style scoped>
* {
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
