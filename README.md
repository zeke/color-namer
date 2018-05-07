# Color Namer [![Build Status](https://travis-ci.org/zeke/color-namer.svg?branch=master)](https://travis-ci.org/zeke/color-namer)

> Give me a color and I'll name it.

Color Namer is an npm package for use in Node.js or the browser that calculates color distance using the
[Delta-E](http://www.colorwiki.com/wiki/Delta_E%3a_The_Color_Difference) color difference technique. Given a color
in [Hexadecimal RGB, RGBA, HSL, or HSV format](https://github.com/gka/chroma.js/blob/master/doc/api.md#chromaa-b-c-a-mode), it converts the color to the [L*a*b* color space](http://en.wikipedia.org/wiki/Lab_color_space),
then calculates the color's
[Euclidean distance](https://npmjs.org/package/euclidean-distance) from a set of colors with
known names.

Mike Bostock of [D3](http://d3js.org/) fame [explains it well](https://gist.github.com/mbostock/3014589):

> Lab and HCL color spaces are special in that the perceived difference between two colors is proportional to their Euclidean distance in color space. This special property, called perceptual uniformity, makes them ideal for accurate visual encoding of data. In contrast, the more familiar RGB and HSL color spaces distort data when used for visualization.

## Lists

The color names are derived from several lists:

- [roygbiv](lib/colors/roygbiv.js)
- [basic](lib/colors/basic.js)
- [html](lib/colors/html.js) - the HTML color names.
- [x11](lib/colors/x11.js) - The list that preceded the HTML color names
- [pantone](lib/colors/pantone.js)
- [ntc](lib/colors/ntc.js), an [astounding collection](http://chir.ag/projects/ntc/) of over 1500 named colors.


## Installation

```
npm install color-namer --save
```

## Usage

Require the module:

```js
var namer = require('color-namer')
var names = namer("#FF0000")
```

From the above code, `names` will have a key for each list:

```
names.roygbiv
names.basic
names.html
names.x11
names.pantone
names.ntc
```

Each list is an array of colors, sorted by their perceptual similarity to the given color:

```js
[
  { name: 'red',
    hex: '#FF0000',
    distance: 0
  },{
    name: 'orangered',
    hex: '#FF4500',
    distance: 13.170205025755513
  },{
    name: 'tomato',
    hex: '#FF6347',
    distance: 31.733444038510665
  },{
    name: 'crimson',
    hex: '#DC143C',
    distance: 35.38084849496472
  },{
    name: 'firebrick',
    hex: '#B22222',
    distance: 40.71076805218006
  },{
    name: 'coral',
    hex: '#FF7F50',
    distance: 42.340752375722616
  },{
    name: 'chocolate',
    hex: '#D2691E',
    distance: 44.378454180212145
  }
]
```

Other input format work too like HSL, RGB, and RGBA:

```js
name("hsl(50,100%,50%)")
name("rgb(255,0,0)")
name("rgba(255,0,0,1)")
```

## Options

### options.pick
This option allows us to derive names from the dedicated lists for faster computation.

```js
var names = namer(color, { pick: ['basic', 'x11'] })
// output: { basic: [...], x11: [...] }
```

### options.omit
The opposite of `options.pick`.

```js
var names = namer(color, { omit: ['pantone', 'roygbiv'] })
// output: { basic: [...], html: [...], x11: [...], ntc: [...] }
```

### options.lists
Use custom color lists object

```js
var names = namer(color, { lists: { custom: require('/path/to/custom.js')}})
```

## Tests

```
npm install
npm test
```

## License

MIT
