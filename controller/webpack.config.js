const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
  },
  devServer: {
    compress: true,
    port: 8080,
  },
};
