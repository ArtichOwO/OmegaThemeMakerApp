module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: './src/preload.js',
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
      }
    },
  },
};