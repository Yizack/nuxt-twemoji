export interface NuxtTwemojiRuntimeOptions {
  /**
   * SVG local storage cache settings. Available in `Twemoji` and `Twemojify` components
   *
   * Set to `false` to disable SVG caching
   *
   * @default
   * { maxAge: 3.154e+7 }
   */
  cache: {
    /**
     * Default SVG cache expiration time.
     *
     * Time in seconds for the SVG local storage cache to expire, defaults to 1 year.
     *
     * @default 3.154e+7
     *
     */
    maxAge: number
  } | false
  /**
   * Default rendering mode
   *
   * Set the default rendering mode for the components
   *
   * @default 'svg'
   */
  mode: 'svg' | 'png'
}

export type ModuleOptions = NuxtTwemojiRuntimeOptions
