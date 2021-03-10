const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src/index.ts"),
  plugins: [new CleanWebpackPlugin()],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../build/static/js"),
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$|tsx/,
        use: { loader: "awesome-typescript-loader" },
      },
    ],
  },
};
