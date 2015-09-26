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

let babelPlugins = [];
let babelExtra = {};
let babelOptional = [
  // Using the runtime is good for libs as it doesn't
  // pollute the global scope. However, the polyfill
  // is good for apps, as it enables instance methods.
  // "runtime",
  "es7.decorators",
];

if (__DEV__) {
  babelPlugins = babelPlugins.concat([
    "react-transform",
  ]);

  Object.assign(babelExtra, {
    "react-transform": {
      transforms: [
        {
          "transform": "react-transform-hmr",
          "imports": ["react"],
          "locals": ["module"]
        },
        {
          "transform": "react-transform-catch-errors",
          "imports": [
            "react",
            "redbox-react",
            // the third import is OPTIONAL!
            // when specified, its export is used as options to the reporter.
            // see specific reporter's docs for the options it needs.
            // "./src/reporterOptions",
          ]
        },
      ],
    }
  });
}

if (!__DEV__) {
  plugins = plugins.concat([
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
  ]);

  babelOptional = babelOptional.concat([
    "optimisation.react.constantElements",
    "optimisation.react.inlineElements",
    // "minification.removeConsole", // removes `console.log` lines
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
        query: {
          stage: 2,
          optional: babelOptional,
          plugins: babelPlugins,
          extra: babelExtra,
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
