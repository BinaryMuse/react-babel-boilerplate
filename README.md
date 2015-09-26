Webpack/Babel/React/HMR Kickstart
=================================

I love React, especially in conjunction with Babel for ES2015+ features and webpack for dealing with all my client-side asset issues, but getting set up on a new project, especially when I just want to toy with an idea, always feels like more work than it should be. This project provides some boilerplate to set up what **I** consider to be a common and useful starer project.

Instructions
------------

 1. Clone this repo, `cd` into it
 2. Run `./scripts/setup.sh`
 3. [Optional] If you also want to use [Redux](http://rackt.github.io/redux/), run `./scripts/install-redux.sh`
 4. Run `npm start` to start your new app

As you edit the JS file that ships with the repo, the page should update immediately. Syntax errors should show up in your browser console, and runtime errors in React components will cause the page to display the error message in red.

What does it do?
----------------

### `./scripts/setup.sh`

 1. Creates a new `package.json` file via `npm init -y` (accepts all defaults)
 2. Installs and `--save`s the latest stable versions of the following packages:
    * [babel](https://npmjs.com/package/babel)
    * [babel-loader](https://npmjs.com/package/babel-loader)
    * [babel-runtime](https://npmjs.com/package/babel-runtime)
    * [babel-core](https://npmjs.com/package/babel-core)
    * [core-decorators](https://npmjs.com/package/core-decorators)
    * [webpack](https://npmjs.com/package/webpack)
    * [webpack-dev-server](https://npmjs.com/package/webpack-dev-server)
    * [react](https://npmjs.com/package/react) (currently installs 0.14.0-rc1)
    * [react-dom](https://npmjs.com/package/react-dom) (currently installs 0.14.0-rc1)
 3. Installs and `--save-dev`s the latest stable versions of the following packages:
    * [babel-plugin-react-transform](https://npmjs.com/package/babel-plugin-react-transform)
    * [react-transform-hmr](https://npmjs.com/package/react-transform-hmr)
    * [react-transform-catch-errors](https://npmjs.com/package/react-transform-catch-errors)
    * [redbox-react](https://npmjs.com/package/redbox-react)
 4. Adds a `start` script that starts `webpack-dev-server` with hot module replacement enabled and inlined
 5. Sets `private` to `true` inside `package.json` (to prevent accidental publishes)

### `./scripts/install-redux.sh`

 1. Installs and `--save`s the latest stable versions of the following packages:
    * [redux](https://npmjs.com/package/redux)
    * [redux-thunk](https://npmjs.com/package/redux-thunk)
    * [react-redux](https://npmjs.com/package/react-redux)
    * [redux-devtools](https://npmjs.com/package/redux-devtools)

### webpack config

* `process.env.NODE_ENV` is defined client-side to be the same as server-side, defaulting to `"development"`
* `__DEV__` is defined as a `true`/`false` value reflecting whether `NODE_ENV` is `"development"` or not, useful for wrapping debug tools, etc. in `if (__DEV__)`
* Loads an entry from `./client/index.js`
* Loads static content from `./public`
* Builds to `./public/bundle.js`
* Builds all JS in non-`node_modules` folders with Babel (set to [stage 2](https://babeljs.io/docs/usage/experimental/))
    * Also enables the following additional Babel features:
        * Decorators (`es7.decorators`)
* In development, it also:
    * Enables `react-transform`, including the `react-transform-hmr` transform and the `react-transform-catch-errors` transform (using `redbox-react` to display errors)
    * Enables fast source maps
* In production, it also:
    * Enables minification via `UglifyJsPlugin`
    * Enables `DedupePlugin`
    * Enables the following Babel optimizations:
        * Constant elements (extracts `createElement` calls into constants if possible)
        * Inline elements (transform `createElement` calls into objects)

Finally, the repo comes with a simple `.html` file and an `index.js` file to get you started writing real code.

### Isn't this basically just like \<insert boilerplate generator here\>?

This project is designed to generate a very small number of files, with very little magic. Most of the complexity lives in the number of modules installed and the relatively complex webpack configuration.

The generator is small and simple enough that you can just delete the `scripts` directory after you run the initial setup to clean up all non-essential code.
