var esprima = require('../vendor/esprima.js');

module.exports = parse;

function parseModule(moduleBody) {
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

function parse(modules) {
    var result = {},
        module;

    for (module in modules) {
        if (modules.hasOwnProperty(module)) {
            result[module] = parseModule(modules[module]);
        }
    }

    return result;
}
