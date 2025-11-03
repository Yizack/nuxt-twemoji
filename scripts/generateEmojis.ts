import { writeFile } from 'node:fs/promises'
import { $fetch } from 'ofetch'
import { pascalCase } from 'scule'

const prefix = 'tw'
const emojis: Record<string, { code: string, emoji: string, name: string }> = {}
const emojisListUrl = 'https://unicode.org/Public/17.0.0/emoji/emoji-test.txt'

const data = await $fetch<string>(emojisListUrl, {
  retry: 3,
})

for (const line of data.split('\n')) {
  if (line.startsWith('#')) continue

  const emojiLineParts = line.split(';').map((s) => {
    if (s.slice(0) !== '') {
      return s.slice(0).trim()
    }
  })

  if (emojiLineParts[0] === undefined) continue

  const emojiDescription = emojiLineParts[1]!.split('# ')[1]!
  const code = emojiLineParts[0].split(' ').join('-')
  const emoji = emojiDescription.split(' ')[0]!.trim()
  const rawName = emojiDescription.split(' ').slice(2).join('-').trim()

  const name = normalizeEmojiName(rawName)
  const property = prefix + pascalCase(name)

  emojis[property] = { code, emoji, name }
}

const path = './src/runtime/assets/emojis.ts'
const fileContent = [
  'export type EmojiDefinition = { code: string, emoji: string, name: string }',
  Object.keys(emojis).map(key => `export const ${key}: EmojiDefinition = ${transformJsonObject(emojis[key]!)}`).join('\n'),
]

await writeFile(path, fileContent.join('\n'))

const length = Object.keys(emojis).length
console.info(`[${length} emojis] generated file: ${path}`)

function normalizeEmojiName(name: string) {
  return name
    .replace(/[^a-z0-9-*#\s]/gi, '') // Remove invalid characters
    .toLowerCase()
    .replace(/\*/g, 'asterisk') // Replace * with asterisk
    .replace(/#/g, 'number') // Replace # with number
}

function transformJsonObject(obj: typeof emojis[string]) {
  return JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, '$1:').replace(/"/g, '\'')
}
