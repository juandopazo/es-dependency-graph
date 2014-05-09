#!/usr/bin/env node

var graph  = require('../lib/index'),
    extend = require('extend'),
    path   = require('path'),
    fs     = require('fs');

var options = require('nomnom')
    .options({
        path: {
            position: 0,
            help: 'Files or folders to read',
            list: true
        },
        walk: {
            abbr: 'w',
            help: 'Walk the folder structure looking for more files',
            default: false
        },
        output: {
            abbr: 'o',
            metavar: 'FILE',
            help: 'File to write the dependency information to'
        }
    })
    .nocolors()
    .parse();

var dependencies = {};

options.path
    .forEach(function parse(filepath) {
        var stat = fs.statSync(filepath),
            sources = {};

        if (stat.isFile() && path.extname(filepath) === '.js') {
            sources[path.basename(filepath, '.js')] =
                fs.readFileSync(filepath, 'utf8');
            extend(dependencies, graph(sources));
        } else if (stat.isDirectory()) {
            fs.readdirSync(filepath).forEach(function (filename) {
                var subpath = path.join(filepath, filename),
                    substat = fs.statSync(subpath);

                if (substat.isFile() || (substat.isDirectory() && options.walk)) {
                    parse(subpath);
                }
            });
        }
    });

dependencies = JSON.stringify(dependencies);

fs.writeFileSync(options.output, dependencies, 'utf8');
