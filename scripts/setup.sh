npm init -y > /dev/null
node ./scripts/modify-pkg.js
npm install --save babel babel-loader babel-runtime babel-core core-decorators webpack react@0.14.0-rc1 react-dom@0.14.0-rc1
npm install --save-dev webpack-dev-server babel-plugin-react-transform react-transform-catch-errors react-transform-hmr redbox-react
