const Webpack = require("webpack");
const path = require("path");
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  mode: "development",
  output: {
    filename: `bucksapp.dev.js`,
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        keepNames: true,
      }),
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.HOST": JSON.stringify("https://app.dev.bucksapp.com/"),
      "process.env.API_HOST": JSON.stringify("https://api.dev.bucksapp.com/"),
    }),
  ],
};
