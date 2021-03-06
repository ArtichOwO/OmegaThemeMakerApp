module.exports = {
  publicPath: "./",
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      preload: "./src/preload.js",
      builderOptions: {
        mac: {
          category: "public.app-category.graphics-design",
        },
        linux: {
          target: ["AppImage", "deb"],
        },
      },
    },
  },
};
