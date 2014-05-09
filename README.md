module-graph
============

Utility for obtaining the dependency graph from ES6 modules.

API
---

`module-graph` exports a single function that takes an object with module names
in its keys and source code in its values. It then returns an object with the
same keys an for each module an object with a `deps` property:

```js
var graph = require('module-graph');

var result = graph({
    foo: 'import bar from "bar";'
});

/* result looks like this:
{
    foo: {
        deps: ['bar']
    }
}
*/
```

Note: none of the dependency names are normalized. It's up to you to decide how to
normalize them.

CLI
---

If installed with `npm install module-graph -g` it can be used as a global
command `module-graph paths... [options]` which will generate a JSON file with
all the dependency information. Try `module-graph --help` for more information.

License
-------

Yahoo BSD
