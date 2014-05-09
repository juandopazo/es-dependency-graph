var graph  = require('../lib/index'),
    path   = require('path'),
    fs     = require('fs'),
    expect = require('chai').expect;

function hash(a, b) {
    var result = {}, i, length = a.length;
    for (i = 0; i < length; i++) {
        result[a[i]] = b[i];
    }
    return result;
}

describe('graph', function () {
    it('parses several modules correctly', function () {
        var dir = path.join(__dirname, 'assets/'),
            files = fs.readdirSync(dir).map(function (file) {
                return path.join(dir, file);
            }).filter(function (file) {
                return fs.statSync(file).isFile();
            }),
            modules = hash(files.map(function (file) {
                return path.basename(file, '.js');
            }), files.map(function (file) {
                return fs.readFileSync(file, {encoding: 'utf8'});
            }));

        expect(graph(modules))
            .to.deep.equal({
                module1: {
                    requires: ['bar']
                },
                module2: {
                    requires: ['module1']
                }
            });
    });
});
