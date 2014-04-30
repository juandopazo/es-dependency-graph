var esprima = require('./vendor/esprima.js'),
    async   = require('async'),
    path    = require('path'),
    fs      = require('fs');

exports.parse = parse;
exports.read  = read;
exports.crawl = crawl;

function merge(target, source) {
    var prop;
    for (prop in source) {
        if (source.hasOwnProperty(prop) && !target.hasOwnProperty(prop)) {
            target[prop] = source[prop];
        }
    }
    return target;
}

function parse(moduleBody) {
    return {
        requires: esprima.parse(moduleBody).body
            .filter(function (node) {
                return node.type === 'ImportDeclaration';
            })
            .map(function (declaration) {
                return declaration.source.value;
            })
    };
}

function read(path, callback) {
    return fs.readFile(path, 'utf8', function (err, text) {
        if (err) {
            return callback(err);
        }
        callback(void 0, parse(text));
    });
}

function walk(dirpath, walkFn, callback) {
    fs.readdir(dirpath, function (err, files) {
        if (err) {
            return callback(err);
        }
        files = files.map(function (file) {
            return path.join(dirpath, file);
        });
        async.map(files, fs.stat, function (err, stats) {
            if (err) {
                callback(err);
            }
            async.each(stats, function (stat, next) {
                var filename = files[stats.indexOf(stat)];
                if (stat.isDirectory()) {
                    walk(filename, walkFn, next);
                } else {
                    walkFn(filename, next);
                }
            }, callback);
        });
    });
}

function crawl(dirpath, callback) {
    var graph = {};
    walk(dirpath, function (filename, next) {
        if (path.extname(filename) === '.js') {
            read(filename, function (err, metadata) {
                if (err) {
                    return next(err);
                }
                graph[path.basename(filename, '.js')] = metadata;
                next();
            });
        }
    }, function (err) {
        if (err) {
            return callback(err);
        }
        callback(void 0, graph);
    });
}
