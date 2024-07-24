const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
  ...defaultConfig,
  entry: {
    landing: path.resolve(process.cwd(), "src", "landing", "index.js"),
    users: path.resolve(process.cwd(), "src", "users", "index.js"),
  },
  module: {
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
};
