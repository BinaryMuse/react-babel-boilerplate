npm init -y > /dev/null
node ./setup/modify-pkg.js
npm install --save $(cat setup/deps | tr '\n' ' ')
npm install --save-dev $(cat setup/dev-deps | tr '\n' ' ')
cp -r ./setup/template/client ./client
cp -r ./setup/template/public ./public
cp -r ./setup/template/server ./server
cp ./setup/webpack.config.js ./webpack.config.js
cp ./setup/webpack.config.es6.js ./webpack.config.es6.js
cp ./setup/babelrc ./.babelrc
