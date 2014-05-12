var esprima = require('../vendor/esprima.js');

module.exports = parse;

function parse(source) {
    return {
        deps: esprima.parse(source).body
            .filter(function (node) {
                return node.type === 'ImportDeclaration';
            })
            .map(function (declaration) {
                return declaration.source.value;
            })
    };
}
