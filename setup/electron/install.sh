read -p "This will DESTRUCTIVELY convert this folder into a starter Electron app, including DELETING the 'client' and 'public' folders. Continue? [y/N] " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  npm install --save-dev electron-prebuilt electron-rebuild
  node ./setup/electron/modify-pkg.js
  # ./node_modules/.bin/electron-rebuild
  rm -r client
  rm -r public
  rm webpack.config.js
  rm webpack.config.es6.js
  cp -r ./setup/electron/template ./app
  cp ./setup/electron/babelrc ./.babelrc
fi

