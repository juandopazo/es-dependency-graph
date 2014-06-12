#!/usr/bin/env node
/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/es-dependency-graph/blob/master/LICENSE.md
*/
var cli = require('../dist/cli');

cli(require('nomnom')
    .options({
        path: {
            required: true,
            position: 0,
            help: 'Files or folders to read',
            list: true
        },
        walk: {
            abbr: 'w',
            help: 'Walk the folder structure',
            flag: true
        },
        output: {
            required: true,
            abbr: 'o',
            metavar: 'FILE',
            help: 'Output JSON file'
        },
        'include-bindings': {
            abbr: 'b',
            help: 'Include named imports and exports',
            flag: true
        }
    })
    .nocolors()
    .parse());
