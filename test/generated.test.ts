import { describe, it, expect } from 'vitest'
import * as emojis from '../src/runtime/assets/emojis'

describe('Generated emoji exports', () => {
  it('Format of all emoji exports', () => {
    for (const emoji of Object.values(emojis)) {
      expect(emoji.name).toMatch(/^[a-z0-9-]+$/i)
    }
  })
})
