const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

module.exports = {
  ...defaultConfig,
  entry: {
    app: path.resolve(process.cwd(), "src", "index.js"),
    userApp: path.resolve(process.cwd(), "src", "user-page-app", "index.js"),
  },
  module: {
    rules: [
      ...defaultConfig.module.rules,
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
            },
          },
        ],
      },
    ],
  },
};
