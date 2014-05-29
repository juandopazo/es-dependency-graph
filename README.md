module-graph
============

[![Build Status](https://travis-ci.org/juandopazo/module-graph.svg?branch=master)](https://travis-ci.org/juandopazo/module-graph)

Utility for obtaining the dependency graph from ES6 modules.

Limitations
-----------

`module-graph` only works for source code that the Esprima parser can parse.
This does not include the whole ES6 syntax at the moment. Consider this module
experimental.


API
---

### graph(source, [options])

`module-graph` exports a single function that takes a string with source code
and returns an array of the dependencies in that module:

```js
var graph = require('module-graph');

var result = graph('import foo from "bar"; export default foo;');
// returns an array like ['bar']
```

If the `includeBindings` option is set to `true`, then the graph function
will return an object containing all the imported and exported names of the
module:

```js
var graph = require('module-graph');

var result = graph('import foo from "bar"; export default foo;', {
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
or exports, you can pass that AST object to the `graph` function:

```
var esprima = require('esprima'); // Make sure your Esprima version supports ES6!
var graph   = require('module-graph');

var ast = esprima.parse('import foo from "bar"; export default foo;');
var result = graph(ast);
```

Note: none of the dependency names are normalized. It's up to you to decide how
to normalize them.

CLI
---

If installed with `npm install module-graph -g` it can be used as a global
command `module-graph paths... [options]` which will generate a JSON file with
all the dependency information. Try `module-graph --help` for more information.

License
-------

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

Contribute
----------

See the [CONTRIBUTING file][] for info.


[CONTRIBUTING file]: https://github.com/juandopazo/module-graph/blob/master/CONTRIBUTING.md
[LICENSE file]: https://github.com/juandopazo/module-graph/blob/master/LICENSE.md
