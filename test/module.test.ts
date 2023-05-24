import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

describe('ssr', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('component renders heart emoji as SVG', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<svg class="twemoji" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="1em" height="1em"><path fill="#DD2E44" d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"/></svg>')
  })

  it('component renders heart emoji as PNG', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<img class="twemoji" src="https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2764.png" alt="2764" style="width:1em;height:1em;">')
  })

  it('component fails to render, shows original string'), async () => {
    const html = await $fetch('/')
    expect(html).toContain('<span>1234</span>')
  }
})
