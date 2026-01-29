![nuxt-twemoji](https://github.com/Yizack/nuxt-twemoji/assets/16264115/1b53512c-6ac6-412a-8ff2-3b111ffd33d5)

# nuxt-twemoji

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Tests][tests-src]][tests-href]
[![Nuxt][nuxt-src]][nuxt-href]
[![Modules][modules-src]][modules-href]

Twemoji module for Nuxt. Render emojis as SVG elements or PNG images

- [✨ Release Notes](https://github.com/Yizack/nuxt-twemoji/blob/main/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp%2Fpages%2Findex.vue)

## Table of Contents
- [Features](#features)
- [Quick Setup](#quick-setup)
- [Module configs](#module-configs)
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
- Nuxt 4 ready
- Emoji 17.0 support
- Render emoji by character
- Render emoji by codepoint
- Render emoji by definition object
- SVG rendering by default
- SVG caching with localStorage
- PNG image render option
- Twitter Emoji assets from ex-Twitter author ([jdecked/twemoji](https://github.com/jdecked/twemoji)) fork repository
- Assets from the [jsDelivr](https://www.jsdelivr.com/) CDN
- Multiples ways of use

## Quick Setup

1. Add `nuxt-twemoji` dependency to your project

```bash
npx nuxi@latest module add twemoji
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

## Module configs

You can configure the module by adding the `twemoji` property to the `nuxt.config.ts` file. The following are the default configurations:

```js
export default defineNuxtConfig({
  twemoji: {
    cache: {
      maxAge: 3.154e+7 // SVG cache expiration time in seconds (1 year)
    },
    mode: 'svg' // Default rendering mode. 'svg' or 'png'
  }
})

```

## Components

You can make use of any of these available components according to your Nuxt app needs.

| Name |  Description | SSR |
| -----|---------|----------|
| `Twemoji`      | Renders Twemojis by emoji characters, codepoint or definition. | ✔️ |
| `Twemojify`    | Parses a text and replaces all emoji characters with Twemoji svg elements or png images. | ✔️ |
| `TwemojiParse` | Wrap elements with the component and it will parse all emoji characters found with Twemoji svg or png image elements. | ❌

## Usage (`Twemoji`)

1. Find emojis from [emojipedia](https://emojipedia.org/), [getemoji](https://getemoji.com/) or [unicode emoji list](https://unicode.org/emoji/charts-17.0/full-emoji-list.html)
2. In your project, use the component `<Twemoji emoji="" />`, where `emoji` is the emoji character or codepoint.
3. If you employ SSR (Server Side Rendering) in your Nuxt application, this module will inject the emoji `<svg>` or `<img>` element into the output code during your project's build/generate process. Alternatively, if SSR is not used, the emojis will dynamically render during client runtime.

### `Twemoji` properties
| Property | Required | Default | Type                          |
|----------|----------|---------|-------------------------------|
| `emoji`  | Yes      |         | `string` or `EmojiDefinition` |
| `size`   | No       | `1em`   | `string`                      |
| `mode`   | No       |         | `svg` \| `png`                |

### Rendering

Use the emoji property to render an emoji by character.

```html
<!-- Render SVG element -->
<Twemoji emoji="🚀" />

<!-- Resize -->
<Twemoji emoji="🚀" size="2em" />

<!-- Render PNG <img> element -->
<Twemoji emoji="🚀" mode="png" />
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

The emojis file has been generated using the self made [`generateEmojis.js`](https://github.com/Yizack/nuxt-twemoji/blob/main/scripts/generateEmojis.js) script, which fetches emojis data from the [Unicode](https://home.unicode.org/) public Emoji 17.0 file available at https://unicode.org/Public/17.0.0/emoji/emoji-test.txt

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
Check out the [🏀 Online playground](https://stackblitz.com/github/yizack/nuxt-twemoji?file=playground%2Fapp%2Fpages%2Findex.vue) for more examples.

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

| Property | Required | Type            |
|----------|----------|-----------------|
| `text`   | Yes      | `string`        |
| `mode`   | No       | `svg` \| `png`  |

### Parser

This component uses the `@twemoji/parser` package by [jdecked](https://github.com/jdecked) for identifying emoji entities within a string.

Use the text property to parse all the emoji characters inside a string

```html
<!-- Replaces ❤️ and 🚀 with SVG elements -->
<Twemojify text="I ❤️ Nuxt 🚀" />

<!-- Replaces ❤️ and 🚀 with PNG images -->
<Twemojify text="I ❤️ Nuxt 🚀" mode="png" />
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
2. If you want to parse emojis with png images, use the `mode` configuration or property with the component, otherwise it will parse svg images by default.

Note: This component has a drawback as it does not support SSR (Server-Side Rendering) because it is executed during the mounted Vue lifecycle, functioning solely on the client-side.

### `TwemojiParse` properties

| Property | Required | Type            |
|----------|----------|-----------------|
| `mode`   | No       | `svg` \| `png`  |

### DOM parser

This component uses the `@twemoji/api` package by [jdecked](https://github.com/jdecked) and its DOM parser api.

```html
<!-- Replaces 🚀 with SVG image -->
<TwemojiParse>
  <p>Nuxt Twemoji 🚀</p>
</TwemojiParse>

<!-- Replaces 🚀 with PNG image -->
<TwemojiParse mode="png">
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
- [Unicode](https://home.unicode.org/) public [Emoji 17.0](https://unicode.org/Public/17.0.0/emoji) files
- [Nuxt](https://github.com/nuxt/nuxt), the JavaScript framework for creating SSR Vue applications and its [Module Author Guide](https://nuxt.com/docs/guide/going-further/modules)

## Development

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm dev:prepare

# Develop with the playground
pnpm dev

# Build the playground
pnpm dev:build

# Run ESLint
pnpm lint

# Run Vitest
pnpm test
pnpm test:watch

# Run typecheck
pnpm test:types

# Release new version
pnpm release
```

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-twemoji/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-twemoji

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-twemoji.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-twemoji

[license-src]: https://img.shields.io/npm/l/nuxt-twemoji.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: LICENSE

[tests-src]: https://img.shields.io/github/actions/workflow/status/Yizack/nuxt-twemoji/ci.yml?style=flat&colorA=020420&colorB=00DC82&label=tests
[tests-href]: https://github.com/Yizack/nuxt-twemoji/actions/workflows/ci.yml

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt
[nuxt-href]: https://nuxt.com

[modules-src]: https://img.shields.io/badge/Modules-020420?logo=nuxt
[modules-href]: https://nuxt.com/modules/twemoji
