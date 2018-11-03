const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SriPlugin = require("webpack-subresource-integrity");

module.exports = {
  entry: ["./src/index.js", "./sass/index.scss"],
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        context: ["/login", "/oauth-login-success", "/oauth2", "/api"],
        target: "http://localhost:8081"
      }
    ]
  },
  output: {
    filename: "js/[name].js",
    publicPath: "/",
    path: path.resolve(__dirname, "../src/main/resources/static"),
    crossOriginLoading: "anonymous"
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./templates/index.html",
      inject: "body",
      filename: "index.html",
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: "./templates/logged-out.html",
      filename: "logged-out.html",
      hash: true
    }),
    new SriPlugin({
      hashFuncNames: ["sha256", "sha384"]
    }),
    new CopyWebpackPlugin(
      [
        {
          from: "images",
          to: "images"
        }
      ],
      {}
    )
  ],
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
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
};
