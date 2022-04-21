const Webpack = require("webpack");
const path = require("path");
const { ESBuildMinifyPlugin } = require('esbuild-loader');

module.exports = {
  mode: "production",
  output: {
    filename: `bucksapp.js`,
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
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.HOST": JSON.stringify("https://app.prd.bucksapp.com/"),
      "process.env.API_HOST": JSON.stringify("https://api.prd.bucksapp.com/"),
    }),
  ],
};
