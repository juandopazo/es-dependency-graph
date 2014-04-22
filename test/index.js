var graph = require('../lib/index.js'),
    path  = require('path');

graph.crawl(path.join(__dirname, 'assets/'), function (err, importDecs) {
    if (err) {
        return console.error(err);
    }
    console.log(importDecs);
});
