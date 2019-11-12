"use strict";

var chroma = require('chroma-js')
var WeakMap = require("es6-weak-map")

// These `require` statements are all explicit
// to keep the browserify build from breaking
var lists = {
  basic: require('./lib/colors/basic'),
  html: require('./lib/colors/html'),
  ntc: require('./lib/colors/ntc'),
  pantone: require('./lib/colors/pantone'),
  roygbiv: require('./lib/colors/roygbiv'),
  x11: require('./lib/colors/x11'),
  zeplin: require('./lib/colors/zeplin')
}

var cache = new WeakMap()
var namer = module.exports = function(color, options) {
  options = options || {}

  var cacheKey = {color, options}
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)
  }

  var deltaE = String(options.distance).toLowerCase() === 'deltae';
  color = chroma(color)
  var results = {}
  for (var key in lists) {
    if (options.pick && options.pick.indexOf(key) === -1) {
      continue
    }
    if (options.omit && options.omit.indexOf(key) !== -1) {
      continue
    }
    results[key] = lists[key]
      .map (function(name) {
        name.distance = deltaE ? chroma.deltaE(color, chroma(name.hex)) : chroma.distance(color, chroma(name.hex))
        return name
      })
      .sort (function(a, b) {
        return a.distance - b.distance
      })
  }
  cache.set(cacheKey, results)
  return results
}

namer.chroma = chroma
namer.lists = lists
