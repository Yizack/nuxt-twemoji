![nuxt-twemoji](https://repository-images.githubusercontent.com/643607230/de54220b-3c2a-4a32-933f-1c4d93c00f0a)

# nuxt-twemoji

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Tests][tests-src]][tests-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Modules][modules-src]][modules-href]

Twemoji module for Nuxt. Render emojis as SVG elements or PNG images

- [✨ Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp.vue)

## Index
- [Features](#features)
- [Quick Setup](#quick-setup)
- [Components](#components)
- [Usage (Twemoji)](#usage-twemoji)
  - [Twemoji properties](#twemoji-properties)
  - [Rendering](#rendering)
  - [Definitions](#definitions)
  - [More examples](#more-examples)
  - [Twemoji Default CSS](#twemoji-default-css)
- [Usage (Twemojify)](#usage-twemojify)
  - [Twemojify properties](#twemojify-properties)
  - [Parser](#parser)
  - [Twemojify Default CSS](#twemojify-default-css)
- [Usage (TwemojiParse)](#usage-twemojiparse)
  - [TwemojiParse properties](#twemojiparse-properties)
  - [DOM parser](#dom-parser)
  - [TwemojiParse Default CSS](#twemojiparse-default-css)
- [Credits](#credits)
- [Development](#development)

## Features
- Nuxt 3 ready
- Emoji 14.0 support
- Render emoji by character
- Render emoji by codepoint
- Render emoji by definition object
- SVG rendering by default
- PNG image render option
- Twitter Emoji assets from the original ex-Twitter authors ([jdecked/twemoji](https://github.com/jdecked/twemoji)) fork repository
- Assets from the [jsDelivr](https://www.jsdelivr.com/) CDN
- Multiples ways of use

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

## Components

You can make use of any of these available components according to your Nuxt app needs.

| Name |  Description | SSR |
| -----|---------|----------|
| `Twemoji`      | Renders Twemojis by emoji characters, codepoint or definition. | ✔️ |
| `Twemojify`    | Parses a text and replaces all emoji characters with Twemoji svg elements or png images. | ✔️ |
| `TwemojiParse` | Wrap elements with the component and it will parse all emoji characters found with Twemoji svg or png image elements. | ❌

## Usage (`Twemoji`)

1. Find emojis from the recommended unicode emoji list: https://unicode.org/emoji/charts-14.0/full-emoji-list.html

2. In the project, use the component `<Twemoji emoji="" />`, where `emoji` is the emoji character or codepoint.
3. If you employ SSR (Server Side Rendering) in your Nuxt application, this module will inject the emoji `<svg>` or `<img>` element into the output code during your project's build/generate process. Alternatively, if SSR is not used, the emojis will dynamically render during client runtime.

### `Twemoji` properties
| Property | Required | Default | Type                          |
|----------|----------|---------|-------------------------------|
| `emoji`  | Yes      |         | `string` or `EmojiDefinition` |
| `size`   | No       | `1em`   | `string`                      |
| `png`    | No       | `false` | `boolean`                     |

### Rendering

Use the emoji property to render an emoji by character.

```html
<!-- Render SVG element -->
<Twemoji emoji="🚀" />

<!-- Resize -->
<Twemoji emoji="🚀" size="2em" />

<!-- Render PNG <img> element -->
<Twemoji emoji="🚀" png />
```

Use the emoji property to render an emoji by codepoint.

```html
<Twemoji emoji="1F60A" />
```

or

```html
<Twemoji emoji="U+1F60A" />
```

Use the emoji property to render an emoji by [definition](https://github.com/Yizack/nuxt-twemoji/blob/main/src/runtime/assets/emojis.ts).
```html
<script setup>
import { twSmilingFaceWithSmilingEyes } from 'nuxt-twemoji/emojis'
</script>

<template>
  <Twemoji :emoji="twSmilingFaceWithSmilingEyes" />
</template>
```

The emojis file has been generated using the self made [`generateEmojis.js`](https://github.com/Yizack/nuxt-twemoji/blob/main/scripts/generateEmojis.js) script, which fetches emojis data from the [Unicode](https://home.unicode.org/) public Emoji 14.0 file available at https://unicode.org/Public/emoji/14.0/emoji-test.txt

### Definitions
The `EmojiDefinition` type represents objects that have these specific three string properties:

- `code` represents the code associated with the emoji.
- `emoji` represents the actual emoji.
- `name` represents the name of the emoji.

```ts
type EmojiDefinition = {
  code: string,
  emoji: string,
  name: string
}
```

### More examples
Check out the [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp.vue) for more examples.

### `Twemoji` Default CSS

Both the `<svg>` and `<img>` tags will have the `.twemoji` class assigned to them. These are the default styles, but you can add your own styles by using the class name.

```css
.twemoji {
  display: inline-block;
  vertical-align: middle;
}
```

## Usage (`Twemojify`)

This component parses a string text and replaces all emoji characters with Twemoji svg elements or png images.

1. In the project, use the component `<Twemojify text="" />`, where `text` is a string.
2. If you employ SSR (Server Side Rendering) in your Nuxt application, this module will inject the emoji `<svg>` or `<img>` element into the output code during your project's build/generate process. Alternatively, if SSR is not used, the emojis will dynamically render during client runtime.

### `Twemojify` properties

| Property | Required | Default | Type      |
|----------|----------|---------|-----------|
| `text`   | Yes      |         | `string`  |
| `png`    | No       | `false` | `boolean` |

### Parser

This component uses the `@twemoji/parser` package by [jdecked](https://github.com/jdecked) for identifying emoji entities within a string.

Use the text property to parse all the emoji characters inside a string

```html
<!-- Replaces ❤️ and 🚀 with SVG elements -->
<Twemojify text="I ❤️ Nuxt 🚀" />

<!-- Replaces ❤️ and 🚀 with PNG images -->
<Twemojify text="I ❤️ Nuxt 🚀" png />
```

### `Twemojify` Default CSS

Both the `<svg>` and `<img>` tags will have the `.twemojify` class assigned to them. These are the default styles, but you can add your own styles by using the class name.

These style rules make sure that parsed emojis will have the same size as the wrapper element.

```css
.twemojify {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
```

## Usage (`TwemojiParse`)

This component will parse all emoji characters found.

1. Wrap elements inside the `<TwemojiParse> </TwemojiParse>` component
2. If you want to parse emojis with png images, use the `png` property with the component, otherwise it will parse svg images by default.

Note: This component has a drawback as it does not support SSR (Server-Side Rendering) because it is executed during the mounted Vue lifecycle, functioning solely on the client-side.

### `TwemojiParse` properties

| Property | Required | Default | Type      |
|----------|----------|---------|-----------|
| `png`    | No       | `false` | `boolean` |

### DOM parser

This component uses the `@twemoji/api` package by [jdecked](https://github.com/jdecked) and its DOM parser api.

```html
<!-- Replaces 🚀 with SVG image -->
<TwemojiParse>
  <p>Nuxt Twemoji 🚀</p>
</TwemojiParse>

<!-- Replaces 🚀 with PNG image -->
<TwemojiParse png>
  <p>Nuxt Twemoji 🚀</p>
</TwemojiParse>

<!-- You can wrap any amount of emojis inside the component -->
<TwemojiParse>
  <p>Nuxt Twemoji 🚀</p>
  <div>
    <p>I ❤️ Nuxt 🚀</p>
  </div>
</TwemojiParse>
```

### `TwemojiParse` Default CSS

The `<img>` tags will have the `.twemojiParse` class assigned to them. These are the default styles, but you can add your own styles by using the class name.

These style rules make sure that parsed emojis will have the same size as the wrapper element.

```css
img.twemojiParse {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
```

## Credits

- Twitter Emoji assets from [jdecked/twemoji](https://github.com/jdecked/twemoji)
- Default CDN [jsDelivr](https://www.jsdelivr.com/)
- [Unicode](https://home.unicode.org/) public [Emoji 14.0](https://unicode.org/Public/emoji/14.0/) file
- [Nuxt](https://github.com/nuxt/nuxt), the JavaScript framework for creating SSR Vue applications and its [Module Author Guide](https://nuxt.com/docs/guide/going-further/modules)

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
[license-href]: LICENSE

[tests-src]: https://img.shields.io/github/actions/workflow/status/Yizack/nuxt-twemoji/tests.yml?style=flat&colorA=18181B&colorB=28CF8D&label=tests
[tests-href]: https://github.com/Yizack/nuxt-twemoji/actions/workflows/tests.yml

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com

[modules-src]: https://img.shields.io/badge/Modules-18181B?logo=nuxt.js
[modules-href]: https://nuxt.com/modules/twemoji
