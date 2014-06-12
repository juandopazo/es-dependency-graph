/*
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
https://github.com/yahoo/es-dependency-graph/blob/master/LICENSE.md
*/
/*jslint esnext:true*/
import esprima from 'esprima-fb';

var concat  = Function.prototype.apply.bind(Array.prototype.concat, []);

function getSpecId(spec) {
    return spec.id.name;
}

function getDeclarationName(declaration) {
    return declaration.id.name;
}

function getSpecName(spec) {
    return spec.name ? spec.name.name : spec.id.name;
}

function isImportDeclaration(statement) {
    return statement.type === 'ImportDeclaration';
}

function isExportDeclaration(statement) {
    return statement.type === 'ExportDeclaration';
}

function getExportedNames(export_) {
    var declaration = export_.declaration,
        names;

    if (declaration && declaration.type === 'FunctionDeclaration') {
        names = [declaration.id.name];
    } else if (declaration && declaration.type === 'VariableDeclaration') {
        names = declaration.declarations.map(getDeclarationName);
    } else if (Array.isArray(declaration)) {
        names = declaration.map(getDeclarationName);
    } else if (export_.specifiers) {
        names = export_.specifiers.map(getSpecName);
    } else {
        names = [];
    }

    return names;
}

function getImports(body) {
    var imports = {};

    body.filter(isImportDeclaration).forEach(function (declaration) {
        var source = declaration.source.value;

        if (!imports[source]) {
            imports[source] = [];
        }

        if (declaration.kind === 'default') {
            imports[source].push('default');
        } else {
            declaration.specifiers.forEach(function (specifier) {
                var name = getSpecId(specifier);
                if (imports[source].indexOf(name) < 0) {
                    imports[source].push(name);
                }
            });
        }
    });

    return imports;
}

function getExports(body) {
    return concat(body.filter(isExportDeclaration).map(getExportedNames));
}

function getDependencies(body) {
    var imports = {};
    
    body.filter(isImportDeclaration).forEach(function (declaration) {
        imports[declaration.source.value] = true;
    });

    return Object.keys(imports);
}

export default function parse(ast, options) {
    if (typeof ast === 'string') {
        ast = esprima.parse(ast);
    }
    
    var body = ast.body;

    options = options || {};

    return !options.includeBindings ? getDependencies(body) : {
        imports: getImports(body),
        exports: getExports(body)
    };
}
