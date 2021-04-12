module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: './src/preload.js',
      builderOptions: {
		    mac: {
		      category: "public.app-category.graphics-design"
		    }
      }
    },
  },
};