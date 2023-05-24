# nuxt-twemoji

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]


Introducing a Nuxt module for implementing Twemoji in a Nuxt application

- [✨ Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp.vue)

## Index
- [Features](#features)
- [Quick Setup](#quick-setup)
- [Usage](#usage)
  - [Component properties](#component-properties)
  - [Render](#render)
  - [More examples](#more-examples)
  - [Default CSS](#default-css)
- [Development](#development)

## Features
- Nuxt 3 ready
- Emoji 14.0 support
- Render emoji by character
- Render emoji by codepoint
- Render emoji by definition
- SVG rendering by default
- Insert as PNG image fetched from the [jsdelivr](https://www.jsdelivr.com/) CDN

## Quick Setup

1. Add `nuxt-twemoji` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt-twemoji

# Using yarn
yarn add --dev nuxt-twemoji

# Using npm
npm install --save-dev nuxt-twemoji
```

2. Add `nuxt-twemoji` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'nuxt-twemoji'
  ]
})
```

That's it! You can now use `nuxt-twemoji` in your Nuxt app ✨

## Usage

1. Find emojis from the recommended unicode emoji list: https://unicode.org/emoji/charts-14.0/full-emoji-list.html

2. In the project, use the component `<Twemoji emoji="" />`, where `emoji` is the emoji character or codepoint.
3. If you employ SSR (Server Side Rendering) in your Nuxt application, this module will inject the emoji `<svg>` or `<img>` element into the output code during your project's build/generate process. Alternatively, if SSR is not used, the emojis will dynamically render during client runtime.

### Component properties
| Property | Required | Default | Type                 |
|----------|----------|---------|----------------------|
| `emoji`  | Yes      |         | `String` or `Object` |
| `size`   | No       | `1em`   | `String`             |
| `png`    | No       | `false` | `Boolean`            |

### Render

Use the emoji property to render an emoji by character.

```html
<!-- Render SVG element -->
<Twemoji emoji="😊" />

<!-- Resize -->
<Twemoji emoji="😊" size="2em" />

<!-- Render PNG <img> element -->
<Twemoji emoji="😊" png />
```

Use the emoji property to render an emoji by codepoint.

```html
<Twemoji emoji="1F60A" />
```

or

```html
<Twemoji emoji="U+1F60A" />
```

Use the emoji property to render an emoji by [definition](src/runtime/assets/emojis.ts).
```html
<script setup>
import { twSmilingFaceWithSmilingEyes } from 'nuxt-twemoji/emojis'
</script>

<template>
  <Twemoji :emoji="twSmilingFaceWithSmilingEyes" />
</template>
```

The emoji definitions file has been generated using [`generateEmojis.js`](scripts/generateEmojis.js) script, which fetches data from the [Unicode](https://home.unicode.org/) public Emoji 14.0 file available at https://unicode.org/Public/emoji/14.0/emoji-test.txt

### More examples
Check out the [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp.vue) for more examples.

### Default CSS

Both the `<img>` and `<svg>` tags will have the `.twemoji` class assigned to them. These are the default styles, but you can add your own styles by using the class name.

```css
.twemoji {
  display: inline-block;
  vertical-align: middle;
}
```

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-twemoji/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/nuxt-twemoji

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-twemoji.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/nuxt-twemoji

[license-src]: https://img.shields.io/npm/l/nuxt-twemoji.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/nuxt-twemoji

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
