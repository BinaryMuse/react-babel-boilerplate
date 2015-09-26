npm init -y > /dev/null
npm install --save babel babel-loader babel-runtime babel-core core-decorators webpack webpack-dev-server react@0.14.0-rc1 react-dom@0.14.0-rc1
npm install --save-dev babel-plugin-react-transform react-transform-catch-errors react-transform-hmr redbox-react
jq '.scripts.start = "babel-node ./node_modules/.bin/webpack-dev-server --inline --hot" | .description = "" | .license = "MIT" | .private = true | del(.main, .repository, .bugs, .homepage)' package.json > modified-package.json
mv modified-package.json package.json
