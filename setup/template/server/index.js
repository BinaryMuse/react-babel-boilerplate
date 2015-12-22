import { resolve } from "path";

import express from "express";

import webpack from 'webpack';
import webpackConfig from '../webpack.config.es6';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();

if (app.settings.env === "development") {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(resolve(`${__dirname}/../public`)));

// All requests that aren't handled are simply sent
// the index.html file - this only works if you're
// doing client-side routing.
app.get("*", (req, res) => {
  res.sendFile(resolve(`${__dirname}/../public/index.html`));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
