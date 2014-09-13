/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/es-dependency-graph/blob/master/LICENSE.md
*/
var graph   = require('../dist/index'),
    path    = require('path'),
    fs      = require('fs'),
    esprima = require('esprima'),
    expect  = require('chai').expect;

describe('graph', function () {
    it('deals with AST objects correctly', function () {
        var dir = path.join(__dirname, 'assets/'),
            result = fs.readdirSync(dir)
                .map(function (file) {
                    return path.join(dir, file);
                })
                .filter(function (file) {
                    return fs.statSync(file).isFile();
                })
                .map(function (file) {
                    return graph(esprima.parse(fs.readFileSync(file, 'utf8')));
                });

        expect(result)
            .to.deep.equal([
                ['module2', 'module3', 'module4']
            ]);
    });
    describe('with includeBindings set to: false', function () {
        it('parses several modules correctly', function () {
            var dir = path.join(__dirname, 'assets/'),
                result = fs.readdirSync(dir).map(function (file) {
                    return path.join(dir, file);
                }).filter(function (file) {
                    return fs.statSync(file).isFile();
                }).map(function (file) {
                    return graph(fs.readFileSync(file, 'utf8'), {
                        includeBindings: false
                    });
                });

            expect(result)
                .to.deep.equal([
                    ['module2', 'module3', 'module4']
                ]);
        });
    });
    describe('with includeBindings set to: true', function () {
        it('parses several modules correctly', function () {
            var dir = path.join(__dirname, 'assets/'),
                result = fs.readdirSync(dir).map(function (file) {
                    return path.join(dir, file);
                }).filter(function (file) {
                    return fs.statSync(file).isFile();
                }).map(function (file) {
                    return graph(fs.readFileSync(file, 'utf8'), {
                        includeBindings: true
                    });
                });

            expect(result)
                .to.deep.equal([
                    {
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
                ]);
        });
    });
});
