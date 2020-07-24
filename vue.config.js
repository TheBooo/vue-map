const ArcGISPlugin = require("@arcgis/webpack-plugin");

module.exports = {
  publicPath: "./",
  configureWebpack: {
    plugins: [new ArcGISPlugin()],
    node: {
      process: false,
      global: false,
      fs: "empty",
    },
    optimization: {
      minimize: true,
      splitChunks: {
        chunks: "all",
        minChunks: Infinity,
      },
    },
  },
};
