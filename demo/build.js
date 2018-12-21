const {
  CheckerPlugin,
  TsConfigPathsPlugin
} = require("awesome-typescript-loader");

module.exports = {
  // Currently we need to add '.ts' to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".js"]
  },

  // Source maps support ('inline-source-map' also works)
  devtool: "source-map",

  entry: {
    index: ["./demo/src/index.ts"]
  },

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  },

  // Add the loader for .ts files.
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  plugins: [
    new TsConfigPathsPlugin({ configFileName: "demo/tsconfig.json" }),
    new CheckerPlugin()
  ]
};
