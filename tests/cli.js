/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/es-dependency-graph/blob/master/LICENSE.md
*/
var cli    = require('../dist/cli'),
    path   = require('path'),
    fs     = require('fs'),
    rimraf = require('rimraf'),
    expect = require('chai').expect;

describe('CLI', function () {
    afterEach(function (done) {
        rimraf(path.resolve(__dirname, 'tmp'), done);
    });
    describe('without --include-bindings', function () {
        it('should generate a graph.json', function () {
            var graphPath = path.resolve(__dirname, 'tmp/graph.json'),
                contents;

            cli({
                walk: false,
                path: [path.resolve(__dirname, 'assets/')],
                output: graphPath,
                'include-bindings': false
            });

            expect(fs.existsSync(path.resolve(__dirname, 'tmp/graph.json')))
                .to.equal(true);

            expect(JSON.parse(fs.readFileSync(graphPath, 'utf8')))
                .to.deep.equal({
                    module1: ['module2', 'module3', 'module4']
                });
        });
    });
    describe('with --include-bindings', function () {
        it('should generate a graph.json', function () {
            var graphPath = path.resolve(__dirname, 'tmp/graph.json'),
                contents;

            cli({
                walk: false,
                path: [path.resolve(__dirname, 'assets/')],
                output: graphPath,
                'include-bindings': true
            });

            expect(fs.existsSync(path.resolve(__dirname, 'tmp/graph.json')))
                .to.equal(true);

            expect(JSON.parse(fs.readFileSync(graphPath, 'utf8')))
                .to.deep.equal({
                    module1: {
                        imports: {
                            module2: ['foo'],
                            module3: ['default'],
                            module4: ['foo']
                        },
                        exports: [
                            'bar',
                            'baz',
                            'hello',
                            'asdf',
                            'qwer',
                            'default'
                        ]
                    }
                });
        });
    });
});
