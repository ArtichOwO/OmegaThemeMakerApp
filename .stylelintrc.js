module.exports = {
  processors: [
    [
      '@mapbox/stylelint-processor-arbitrary-tags',
      {
        fileFilterRegex: [/\.vue$/]
      }
    ]
  ],
  extends: ['stylelint-config-recommended']
}
