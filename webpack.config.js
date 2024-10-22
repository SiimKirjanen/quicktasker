const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

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
  plugins: [
    ...defaultConfig.plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // Generates a static HTML file
      openAnalyzer: false, // Prevents the report from automatically opening
      reportFilename: path.resolve(__dirname, "reports", "bundle-report.html"),
    }),
  ],
};
