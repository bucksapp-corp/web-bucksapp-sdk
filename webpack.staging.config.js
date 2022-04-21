const Webpack = require("webpack");
const path = require("path");

module.exports = {
  mode: "production",
  output: {
    filename: `bucksapp.staging.js`,
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("staging"),
      "process.env.HOST": JSON.stringify("https://app.stg.bucksapp.com/"),
      "process.env.API_HOST": JSON.stringify("https://api.stg.bucksapp.com/"),
    }),
  ],
};
