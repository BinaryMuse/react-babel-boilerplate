npm init -y > /dev/null
node ./setup/modify-pkg.js
npm install --save babel@^5 babel-loader@^5 babel-runtime@^5 babel-core@^5 core-decorators webpack react react-dom express webpack-dev-middleware webpack-hot-middleware
npm install --save-dev babel-plugin-react-transform react-transform-catch-errors react-transform-hmr redbox-react
cp -r ./setup/template/client ./client
cp -r ./setup/template/public ./public
cp -r ./setup/template/server ./server
cp ./setup/webpack.config.js ./webpack.config.js
cp ./setup/webpack.config.es6.js ./webpack.config.es6.js
cp ./setup/babelrc ./.babelrc
