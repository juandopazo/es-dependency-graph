var graph  = require('../lib/index.js'),
    path   = require('path'),
    expect = require('chai').expect;

describe('graph', function () {
    describe('crawl()', function () {
        it('parses several modules correctly', function (done) {
            graph.crawl(path.join(__dirname, 'assets/'), function (err, importDecs) {
                if (err) {
                    return done(err);
                }
                expect(importDecs).to.deep.equal({
                    'module1': {
                        requires: ['bar']
                    },
                    'module2': {
                        requires: ['module1']
                    }
                });
                done();
            });
        });
    });
});
