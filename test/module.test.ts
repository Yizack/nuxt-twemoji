import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

const alts: { [key: string]: string } = {
  codepoint: '1f680',
  name: 'rocket',
  emoji: '🚀'
}

const expected = {
  svg: '<svg class="twemoji" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="1em" height="1em"><path fill="#A0041E" d="M1 17l8-7 16 1 1 16-7 8s.001-5.999-6-12-12-6-12-6z"/><path fill="#FFAC33" d="M.973 35s-.036-7.979 2.985-11S15 21.187 15 21.187 14.999 29 11.999 32c-3 3-11.026 3-11.026 3z"/><circle fill="#FFCC4D" cx="8.999" cy="27" r="4"/><path fill="#55ACEE" d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22z"/><path d="M26.999 5c-1.623 0-3.013.971-3.641 2.36.502-.227 1.055-.36 1.641-.36 2.209 0 4 1.791 4 4 0 .586-.133 1.139-.359 1.64 1.389-.627 2.359-2.017 2.359-3.64 0-2.209-1.791-4-4-4z"/><path fill="#A0041E" d="M8 28s0-4 1-5 13.001-10.999 14-10-9.001 13-10.001 14S8 28 8 28z"/></svg>',
  img: (alt: string) => `<img class="twemoji" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/1f680.png" alt="${alt}" style="width:1em;height:1em;">`,
  error: '<span>1234</span>'
}; 

await setup({
  rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
})

describe('by codepoint', () => {
  it('renders emoji as <svg>', async () => {
    const html = await $fetch('/byCodePoint/svg')
    expect(html).toContain(expected.svg)
  })

  it('renders emoji as <img>', async () => {
    const html = await $fetch('/byCodePoint/png')
    expect(html).toContain(expected.img(alts.codepoint))
  })
})

describe('by emoji', () => {
  it('renders emoji as <svg>', async () => {
    const html = await $fetch('/byEmoji/svg')
    expect(html).toContain(expected.svg)
  })

  it('renders emoji as <img>', async () => {
    const html = await $fetch('/byEmoji/png')
    expect(html).toContain(expected.img(alts.emoji))
  })
})

describe('by definition', () => {
  it('by definition: renders emoji as <svg>', async () => {
    const html = await $fetch('/byDefinition/svg')
    expect(html).toContain(expected.svg)
  })

  it('by definition: renders emoji as <img>', async () => {
    const html = await $fetch('/byDefinition/png')
    expect(html).toContain(expected.img(alts.name))
  })
})

describe('error' , () => {
  it('fails to render, shows original string'), async () => {
    const html = await $fetch('/error')
    expect(html).toContain(expected.error)
  }
})
