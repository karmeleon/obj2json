obj2json
========

A simple node.js script to convert .obj to .json. I couldn't find anything quite like it when I needed it, so I decided to make one of my own and share it with the world.

Usage
=====

```
node obj2json.js example.obj
```

Features
========

Supports (x,y,z) vertices, (x,y,z) normals, (x,y) texture coords, and basic triangular faces. It is by no means a complete implementation of the .obj standard, but it should be enough for basic WebGL stuff.
