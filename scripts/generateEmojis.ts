import { writeFile } from 'node:fs/promises'
import { $fetch } from 'ofetch'

const text = await $fetch<string>('https://unicode.org/Public/emoji/16.0/emoji-test.txt')
const emojis: Record<string, { code: string, emoji: string, name: string }> = {}

text.split('\n').forEach((line) => {
  if (line.startsWith('#')) return
  const map1 = line.split(';').map((s) => {
    if (s.slice(0) !== '') {
      return s.slice(0).trim()
    }
  })
  if (map1[0] === undefined) return

  const l2 = map1[1]!.split('# ')[1]
  const code = map1[0].split(' ').join('-')
  const emoji = l2.split(' ')[0].trim()
  const name = l2.split(' ').slice(2).join('-').trim().replace(/[^a-z0-9-*#]/gi, '').toLowerCase().replace(/\*/g, 'asterisk').replace(/#/g, 'number')
  const property = 'tw' + name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  emojis[property] = { code, emoji, name }
})

const path = './src/runtime/assets/emojis.ts'
const exports = Object.keys(emojis).map((key) => {
  return `export const ${key}: EmojiDefinition = ${JSON.stringify(emojis[key], null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '\'')}`
}).join('\n')

await writeFile(path, `export type EmojiDefinition = { code: string, emoji: string, name: string }\n${exports}`)
const length = Object.keys(emojis).length
console.info(`[${length} emojis] generated file: ${path}`)
