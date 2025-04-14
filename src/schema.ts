export const schema = {
  expiresIn: {
    $default: 3.154e+7,
    $schema: {
      title: 'Default SVG cache expiration time',
      description: 'Time in seconds for the SVG local storage cache to expire, defaults to 1 year. Set to `0` to disable cache expiration',
      tsType: 'number',
    },
  },
}
