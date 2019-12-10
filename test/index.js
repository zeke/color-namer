"use strict";

var assert = require('assert')
var namer = require('..')

suite('namer', function () {

  test('is a function', function() {
    assert.equal('function', typeof(namer))
  })

  test('returns an object containing named sorted arrays', function() {
    var names = namer('#ffa500')
    assert(!Array.isArray(names))
    assert(names.basic)
    assert(names.html)
    assert(names.ntc)
    assert(names.pantone)
    assert(names.roygbiv)
    assert(names.x11)
    assert.equal(names.basic[0].distance, 0)
  })

  test('matches inexact colors with deltaE', function() {
    var names = namer('FF0001', { distance: 'deltaE' })
    assert.equal(names.basic[0].hex, '#FF0000')
    assert.equal(names.basic[0].name, 'red')
    assert.equal(Math.floor(names.basic[0].distance*100), 13)
  })

  test('matches inexact colors', function() {
    var names = namer('FF0001')
    assert.equal(names.basic[0].hex, '#FF0000')
    assert.equal(names.basic[0].name, 'red')
    assert.equal(Math.floor(names.basic[0].distance*100), 25)
  })


  test('matches exact colors', function() {
    var names = namer('0000FF')
    assert.equal(names.basic[0].hex, '#0000FF')
    assert.equal(names.basic[0].name, 'blue')
    assert.equal(names.basic[0].distance, 0)
  })

  test('accepts hex strings that include a hash symbol', function() {
    var names = namer('#0000FF')
    assert.equal(names.basic[0].hex, '#0000FF')
    assert.equal(names.basic[0].name, 'blue')
    assert.equal(names.basic[0].distance, 0)
  })

  test('accepts HSL input', function() {
    var names = namer("hsl(50,100%,50%)")
    assert.equal(names.basic[0].name, 'gold')
  })


  suite('lists', function() {

    test('are available as a property of the exported module', function() {
      assert(namer.lists)
    })

    test('are arrays of objects with keys `name` and `hex`', function() {
      for (var list in namer.lists) {
        namer.lists[list].forEach(function(color){
          assert(color.name);
          assert(color.hex);
        })
      }
    })

  })

  suite('options', function() {

    test('can receive an empty object', function() {
      var names = namer("hsl(50,100%,50%)", {})
      assert.equal(names.basic[0].name, 'gold')
    })

    test('can receive `pick` option', function() {
      var names = namer("hsl(50,100%,50%)", { pick: ['basic', 'pantone'] })
      assert(Array.isArray(names.basic))
      assert(Array.isArray(names.pantone))
      assert.equal(Object.keys(names).length, 2)
      assert.equal(names.html, undefined)
      assert.equal(names.roygbiv, undefined)
    })

    test('can receive `omit` option', function() {
      var names = namer("hsl(50,100%,50%)", { omit: ['basic', 'pantone'] })
      assert(Array.isArray(names.html))
      assert(Array.isArray(names.roygbiv))
      assert.equal(Object.keys(names).length, Object.keys(namer.lists).length - 2)
      assert.equal(names.basic, undefined)
      assert.equal(names.pantone, undefined)
    })
  })

  suite('custom list', function () {

    test('should be able to add a new custom list', function () {
      const key = 'custom'
      namer.addList(key, './test/custom-list.js')
      const listKeys = Object.keys(namer.lists)
      assert.equal(listKeys.includes(key), true)
    })

    test('should be able to find a custom color in the custom list', function () {
      const key = 'custom'
      namer.addList(key, './test/custom-list.js')

      var names = namer('885418')
      assert.equal(names[key][0].hex, '#885418')
      assert.equal(names[key][0].name, 'brown')
      assert.equal(names[key][0].distance, 0)
    })
  })
})
