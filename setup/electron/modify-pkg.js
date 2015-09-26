var fs = require('fs');

var buffer = fs.readFileSync('package.json');
var json = JSON.parse(buffer.toString('utf8'));

json.scripts.start = 'electron .';
// json.scripts.prepublish = 'electron-rebuild';
json.main = 'app/bootstrap.js';

fs.writeFileSync('package.json', JSON.stringify(json, null, "  "));
