import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

const expected = {
  svg: 'I <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="twemojify"><path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"/></svg> Nuxt <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" class="twemojify"><path fill="#A0041E" d="M1 17l8-7 16 1 1 16-7 8s.001-5.999-6-12-12-6-12-6z"/><path fill="#FFAC33" d="M.973 35s-.036-7.979 2.985-11S15 21.187 15 21.187 14.999 29 11.999 32c-3 3-11.026 3-11.026 3z"/><circle fill="#FFCC4D" cx="8.999" cy="27" r="4"/><path fill="#55ACEE" d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22z"/><path d="M26.999 5c-1.623 0-3.013.971-3.641 2.36.502-.227 1.055-.36 1.641-.36 2.209 0 4 1.791 4 4 0 .586-.133 1.139-.359 1.64 1.389-.627 2.359-2.017 2.359-3.64 0-2.209-1.791-4-4-4z"/><path fill="#A0041E" d="M8 28s0-4 1-5 13.001-10.999 14-10-9.001 13-10.001 14S8 28 8 28z"/></svg>',
  img: 'I <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/2764.png" class="twemojify" /> Nuxt <img src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/72x72/1f680.png" class="twemojify" />'
} 

await setup({
  rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
})

describe('Twemojify component tests', () => {
  it('renders text with emojis as <svg>', async () => {
    const html = await $fetch('/Twemojify/svg')
    expect(html).toContain(expected.svg)
  })

  it('renders text with emojis as <img>', async () => {
    const html = await $fetch('/Twemojify/png')
    expect(html).toContain(expected.img)
  })
})
