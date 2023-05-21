<template>
  <!-- Using Emojis -->
  <table>
    <thead>
      <tr>
        <th style="width: 200px">Emoji</th>
        <th>Twemoji</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(emoji, i) in emojis" :key="i">
        <td>{{ emoji }}</td>
        <td><Twemoji :emoji="emoji" /></td>
      </tr>
    </tbody>
  </table>

  <!-- Using Code Points-->
  <table>
    <thead>
      <tr>
        <th style="width: 200px">Code Point</th>
        <th>Twemoji</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(codePoint, i) in codePoints" :key="i">
        <td>{{ codePoint }}</td>
        <td><Twemoji :emoji="codePoint" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      emojis: ['❤️', '👍', '😂', '😍', '😭', '😊'],
      codePoints: ['1F60D', 'U+1F602', '1F62D', '1F60A', '1F618', '1F60E']
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
