export const schema = {
  expiresIn: {
    $default: 3.154e+7,
    $schema: {
      title: 'Default SVG cache expiration time',
      description: 'Time in seconds for the SVG local storage cache to expire, defaults to 1 year',
      tsType: 'number',
    },
  },
}
