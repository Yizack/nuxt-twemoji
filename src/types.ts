export interface NuxtTwemojiRuntimeOptions {
  /**
   * Default SVG cache expiration time
   *
   * Time in seconds for the SVG local storage cache to expire, defaults to 1 year. Set to `0` or `false` to disable cache expiration
   *
   * @default 3.154e+7
   *
   */
  expiresIn: number | false
}

export type ModuleOptions = NuxtTwemojiRuntimeOptions
