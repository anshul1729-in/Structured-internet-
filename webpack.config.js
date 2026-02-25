// Minimal Webpack configuration for the Tech Navigator React app.
// This handles JSX via Babel and serves/generates index.html via HtmlWebpackPlugin.

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Our single entry file for the client bundle.
  entry: "./src/index.jsx",

  // Where the bundled assets will be emitted (served from memory in dev).
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            // Presets compile modern JS + JSX down to browser-compatible code.
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      }
    ]
  },

  resolve: {
    // Allow importing without specifying these extensions.
    extensions: [".js", ".jsx"]
  },

  plugins: [
    // This plugin takes our index.html template and injects the <script> tag for bundle.js,
    // then writes the final HTML file into /dist for production.
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ],

  devServer: {
    // Serve from the in-memory /dist bundle and let React Router handle client-side routes.
    static: {
      directory: path.resolve(__dirname, "dist")
    },
    historyApiFallback: true,
    port: 3000,
    hot: true
  },

  mode: "development"
};

