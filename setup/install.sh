npm init -y > /dev/null
node ./setup/modify-pkg.js
npm install --save babel babel-loader babel-runtime babel-core core-decorators webpack react react-dom
npm install --save-dev webpack-dev-server babel-plugin-react-transform react-transform-catch-errors react-transform-hmr redbox-react
cp -r ./setup/template/client ./client
cp -r ./setup/template/public ./public
cp ./setup/webpack.config.js ./webpack.config.js
cp ./setup/webpack.config.es6.js ./webpack.config.es6.js
cp ./setup/babelrc ./.babelrc
