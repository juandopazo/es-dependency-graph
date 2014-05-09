#!/usr/bin/env node
var cli = require('../lib/cli');

cli(require('nomnom')
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
    .parse());
