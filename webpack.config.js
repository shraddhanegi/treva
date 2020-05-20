
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

var path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)?(\?[a-z0-9#=&.]+)?$/,
        exclude: /node_modules/,
        loader: "url-loader",
        options: {
          name: "fonts/[name].[ext]",
          limit: 1000
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          name: "[name].[ext]",
          outputPath: "./images"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      minify: true
    }),
    new StylelintPlugin({
      configFile: "./.stylelintrc",
      files: "**/*.scss",
      format: "scss",
      failOnError: false,
      quiet: false,
      fix: true,
      emitError: true,
      emitWarning: true,
      ignoreFile: ".stylelintignore"
    }),
    new OptimizeCssAssetsPlugin()
  ]
};
