module-graph
============

Utility for obtaining the dependency graph from ES6 modules.

API
---

`module-graph` exports a single function that takes a string with source code
and an object with a `deps` property:

```js
var graph = require('module-graph');

var result = graph('import bar from "bar";');

/* result looks like this:
{
    deps: ['bar']
}
*/
```

Note: none of the dependency names are normalized. It's up to you to decide how
to normalize them.

CLI
---

If installed with `npm install module-graph -g` it can be used as a global
command `module-graph paths... [options]` which will generate a JSON file with
all the dependency information. Try `module-graph --help` for more information.

Limitations
-----------

`module-graph` only works for source code that the Esprima parser can parse.
This does not include the whole ES6 syntax at the moment.

License
-------

Yahoo BSD
