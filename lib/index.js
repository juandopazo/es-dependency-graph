/*jslint esnext:true*/
import esprima from '../vendor/esprima';

var concat  = Function.prototype.apply.bind(Array.prototype.concat, []);

function hashImports(arr) {
    var result = {};
    arr.forEach(function (item) {
        var i, length = item.what.length;
        if (!result[item.from]) {
            result[item.from] = [];
        }
        for (i = 0; i < length; i++) {
            if (result[item.from].indexOf(item.what[i]) < 0) {
                result[item.from].push(item.what[i]);
            }
        }
    });
    return result;
}

export default function parse(source) {
    var body = esprima.parse(source).body,
        imports = body.filter(function (statement) {
            return statement.type === 'ImportDeclaration';
        });

    function getName(declaration) {
        return declaration.id.name;
    }
    function getSpecName(spec) {
        return spec.name ? spec.name.name : spec.id.name;
    }
    return {
        imports: hashImports(imports.map(function (statement) {
            return {
                from: statement.source.value,
                what: statement.kind === 'default' ? ['default'] :
                    statement.specifiers.map(function (spec) {
                        return spec.id.name;
                    })
            };
        })),
        exports: concat(body
            .filter(function (statement) {
                return statement.type === 'ExportDeclaration';
            })
            .map(function (statement) {
                var declaration = statement.declaration;
                return declaration &&
                    declaration.type === 'FunctionDeclaration' ?
                        [declaration.id.name] :
                    declaration && declaration.type === 'VariableDeclaration' ?
                        declaration.declarations.map(getName) :
                    Array.isArray(declaration) ? declaration.map(getName) :
                    statement.specifiers ? statement.specifiers.map(getSpecName) :
                    [];
            }))
    };
}
