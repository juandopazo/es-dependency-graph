dependency-graph
================

Utility for obtaining the dependency graph from ES6 modules.

Usage
-----

```
npm install dependency-graph
```

From your Node application:

```js
var graph = require('dependency-graph');
```

API Reference
-------------

None of the dependency names are normalized. It's up to you to decide how to
normalize them.

### graph.parse(source)
Parses a source file and returns an object with a `requires` property:
```js
{
  'requires': [/* list of dependencies */]
}
```

### graph.read(filePath, callback)
Reads and parses a single source file. Takes a callback that will eventually be
called with an error or an object similar to the one returned by `parse`.

### graph.crawl(folderPath, callback)
Reads all the files in a folder and its subfolders and parses them. The callback
eventually gets an object with each module names as a key and values similar to
the ones returned by `parse`.

License
-------

Yahoo BSD
