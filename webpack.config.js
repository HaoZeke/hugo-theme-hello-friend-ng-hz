const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");
const ConcatPlugin = require("webpack-concat-plugin");

new ConcatPlugin({
  // examples
  uglify: false,
  sourceMap: false,
  name: "result",
  outputPath: "test/",
  fileName: "[name].[hash:8].js",
  filesToConcat: ["./src/js/**", "!./src/js/codefold.js"],
  attributes: {
    async: true,
  },
});

module.exports = {
  entry: {
    main: path.resolve("src", "js", "main.js"),
    codefold: path.resolve("src", "js", "codefold.js"),
    theme: path.resolve("src", "js", "theme.js"),
    menu: path.resolve("src", "js", "menu.js"),
  },
  output: {
    path: path.resolve("assets", "js"),
    filename: "[name].[contenthash].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve("src", "html", "javascript.html"),
      filename: "./layouts/partials/javascript.html",
      chunks: ["index", "index_head"],
      inject: true,
    }),
    new HtmlWebpackInjector(), // Initialize plugin
  ],
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
