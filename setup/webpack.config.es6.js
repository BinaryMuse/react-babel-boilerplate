process.env.NODE_ENV = process.env.NODE_ENV || "development";

import webpack from "webpack";

const __DEV__ = process.env.NODE_ENV === "development";

let plugins = [
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development"),
    },
    // wrap things in `if (__DEV__)` and they will turn into
    // `if (false)` in production environments, and be
    // dead-code-eliminated away.
    "__DEV__": JSON.stringify(__DEV__),
  }),
];

if (!__DEV__) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]);
}

const config = {
  cache: true,
  entry: "./client/index.js",
  devServer: {
    contentBase: "./public"
  },
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // NOTE: most of the behavior of babel is contained
        // in the `.babelrc` file in this directory.
        query: {
          cacheDirectory: true,
        },
      },
      // To enable these loaders:
      //   npm install --save file-loader style-loader css-loader less-loader
      // {
      //   loader: "file",
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   exclude: /node_modules/,
      // },
      // {
      //   test: /\.less/,
      //   loader: "style!css!less"<
      // },
    ]
  },
  plugins: plugins
};

if (!__DEV__) {
  delete config.devtool;
}

export default config;
