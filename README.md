es-dependency-graph
===================

[![Build Status](https://travis-ci.org/yahoo/es-dependency-graph.svg?branch=master)](https://travis-ci.org/yahoo/es-dependency-graph)
[![Dependency Status](https://gemnasium.com/yahoo/es-dependency-graph.svg)](https://gemnasium.com/yahoo/es-dependency-graph)
[![NPM version](https://badge.fury.io/js/es-dependency-graph.svg)](http://badge.fury.io/js/es-dependency-graph)

Utility for obtaining the dependency graph from ES6 modules.

Limitations
-----------

`es-dependency-graph` only works for source code that the [Esprima parser][] can parse.
This does not include the whole ES6 syntax at the moment. In light of this
limitation, you should consider this module experimental until the ES6 syntax
is standardized and Esprima can parse it.

This module only analyzes imports and exports declared using the ES module syntax.
Dynamic calls to the ES Loader will not be taken into account. If your application
uses the System loader to load modules, you should consider using a tracer like
the [SystemJS build tool][].


API
---

### depGraph(source, [options])

`es-dependency-graph` exports a single function that takes a string with source code
and returns an array of the dependencies in that module:

```js
var depGraph = require('es-dependency-graph');

var result = depGraph('import foo from "bar"; export default foo;');
// returns an array like ['bar']
```

If the `includeBindings` option is set to `true`, then the depGraph function
will return an object containing all the imported and exported names of the
module:

```js
var depGraph = require('es-dependency-graph');

var result = depGraph('import foo from "bar"; export default foo;', {
    includeBindings: true
});
/* result looks like this:
{
    imports: {
        'foo': ['bar']
    },
    exports: ['default']
}
*/
```

Optionally, if you're already dealing with an AST that contains ES6 imports
or exports, you can pass that AST object to the `depGraph` function:

```js
var esprima  = require('esprima'); // Make sure your Esprima version supports ES6!
var depGraph = require('es-dependency-graph');

var ast = esprima.parse('import foo from "bar"; export default foo;');
var result = depGraph(ast);
```

Note: none of the dependency names are normalized. It's up to you to decide how
to normalize them.

CLI
---

If installed with `npm install es-dependency-graph -g` it can be used as a global
command `dep-graph paths... [options]` which will generate a JSON file with
all the dependency information. Try `dep-graph --help` for more information.

License
-------

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

Contribute
----------

See the [CONTRIBUTING file][] for info.


[CONTRIBUTING file]: https://github.com/yahoo/es-dependency-graph/blob/master/CONTRIBUTING.md
[LICENSE file]: https://github.com/yahoo/es-dependency-graph/blob/master/LICENSE.md
[Esprima parser]: http://esprima.org/
[SystemJS build tool]: https://github.com/systemjs/builder/#advanced-build
