// Minimal Webpack configuration for the Tech Navigator React app.
// This handles JSX via Babel and serves the bundle through webpack-dev-server in development.

const path = require("path");

module.exports = {
  // Our single entry file for the client bundle.
  entry: "./src/index.jsx",

  // Where the bundled assets will be emitted (served from memory in dev).
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true
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

  devServer: {
    // Serve index.html from the project root and let React Router handle client-side routes.
    static: {
      directory: __dirname
    },
    historyApiFallback: true,
    port: 3000,
    hot: true
  },

  mode: "development"
};

