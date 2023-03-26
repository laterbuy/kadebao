const path = require("path");
const fs = require("fs");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/js/index-main.js",
    label: "./src/js/index-label.js",
    about: "./src/js/index-about.js",
    gradable: "./src/js/index-gradable.js",
    series: "./src/js/index-series.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "doc"),
  },
  mode: process.env.NODE_ENV === "development" ? "development" : "production", // development  production
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|html)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, "src/index.html-template"),
        "utf8"
      ),
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, "src/about.html-template"),
        "utf8"
      ),
      chunks: ["about"],
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, "src/gradable.html-template"),
        "utf8"
      ),
      chunks: ["gradable"],
      filename: "gradable.html",
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, "src/label.html-template"),
        "utf8"
      ),
      chunks: ["label"],
      filename: "label.html",
    }),
    new HtmlWebpackPlugin({
      templateContent: fs.readFileSync(
        path.resolve(__dirname, "src/series.html-template"),
        "utf8"
      ),
      chunks: ["series"],
      filename: "series.html",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "src"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
};
