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
  new webpack.optimize.OccurenceOrderPlugin(),
];

if (__DEV__) {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]);
} else {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]);
}

const config = {
  cache: true,
  entry: {
    "main": [ "./client/index.js" ]
  },
  devServer: {
    contentBase: "./public"
  },
  output: {
    path: __dirname + "/public",
    filename: "[name]-bundle.js"
  },
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        // NOTE: most of the behavior of babel is contained
        // in the `.babelrc` file in this directory.
        loader: "babel",
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      // To enable these loaders:
      //   npm install --save file-loader style-loader css-loader less-loader
      // {
      //   test: /\.(eot|svg|ttf|woff|woff2)$/,
      //   loader: "file",
      //   exclude: /node_modules/,
      // },
      // {
      //   test: /\.less$/,
      //   loader: "style!css!less",
      // },
    ]
  },
  plugins: plugins
};

if (__DEV__) {
  Object.keys(config.entry).forEach((entry) => {
    config.entry[entry].unshift("webpack-hot-middleware/client");
  });
} else {
  delete config.devtool;
}

export default config;
