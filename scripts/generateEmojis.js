import { writeFileSync } from 'fs'

const res = await fetch('https://unicode.org/Public/emoji/14.0/emoji-test.txt')
const text = await res.text()
const emojis = {}

text.split('\n').forEach(line => {
  if (line.startsWith('#')) return
  const map1 = line.split(';').map((s)=> {
    if (s.slice(0) !== '') {
      return s.slice(0).trim()
    }
  })
  if (map1[0] === undefined) return

  const l2 = map1[1].split('#')[1]

  const code = map1[0].split(' ').join('-')
  const emoji = l2.split(' ')[1].trim()
  const name = l2.split(' ').slice(3).join('-').trim().replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
  const property = 'tw' + name.split('-').map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  emojis[property] = { code, emoji, name }
})

const path = './src/runtime/assets/emojis.ts'
const exports = Object.keys(emojis).map((key) => {
  return `export const ${key}: EmojiDefinition = ${JSON.stringify(emojis[key], null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '\'')}`
}).join('\n')

writeFileSync(path,  `export type EmojiDefinition = { code: string, emoji: string, name: string }\n${exports}`)
const length = Object.keys(emojis).length
console.info(`[${length} emojis] generated file: ${path}`)
