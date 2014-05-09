module-graph
============

Utility for obtaining the dependency graph from ES6 modules.

Installation
------------

```shell
npm install module-graph
```

From your Node application:

```js
var graph = require('module-graph');
```

Usage
-----

`module-graph` exports a single function that takes an object with module names
in its keys and source code in its values. It then returns an object with the
same keys an for each module an object with a `requires` property:

```js
var result = graph({
    foo: 'import bar from "bar";'
});

/* result looks like this:
{
    foo: {
        requires: ['bar']
    }
}
*/
```

Note: none of the dependency names are normalized. It's up to you to decide how to
normalize them.

License
-------

Yahoo BSD
