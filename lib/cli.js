/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/module-graph/blob/master/LICENSE.md
*/
/*jslint esnext:true*/
import graph  from './index';
import mkdirp from 'mkdirp';
import extend from 'extend';
import path   from 'path';
import fs     from 'fs';

export default function (options) {
    var dependencies = {};

    options.path.forEach(function parse(filepath) {
        var stat = fs.statSync(filepath),
            sources = {};

        if (stat.isFile() && path.extname(filepath) === '.js') {
            dependencies[path.basename(filepath, '.js')] =
                graph(fs.readFileSync(filepath, 'utf8'));
        } else if (stat.isDirectory()) {
            fs.readdirSync(filepath).forEach(function (filename) {
                var subpath = path.join(filepath, filename),
                    substat = fs.statSync(subpath);

                if (substat.isFile() ||
                    (substat.isDirectory() && options.walk)) {
                    parse(subpath);
                }
            });
        }
    });

    dependencies = JSON.stringify(dependencies);

    mkdirp.sync(path.dirname(options.output));

    fs.writeFileSync(options.output, dependencies, 'utf8');
}
