var fs = require('fs');

var buffer = fs.readFileSync('package.json');
var json = JSON.parse(buffer.toString('utf8'));

json.scripts.start = 'node server/boot.js';
json.scripts.build = 'webpack -p';
json.description = '';
json.license = 'MIT';
json.private = true;

delete json.main;
delete json.repository;
delete json.bugs;
delete json.homepage;

fs.writeFileSync('package.json', JSON.stringify(json, null, "  "));
