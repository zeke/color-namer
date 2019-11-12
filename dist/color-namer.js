(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.colorNamer = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./lib/colors/basic":2,"./lib/colors/html":3,"./lib/colors/ntc":4,"./lib/colors/pantone":5,"./lib/colors/roygbiv":6,"./lib/colors/x11":7,"./lib/colors/zeplin":8,"chroma-js":9,"es6-weak-map":61}],2:[function(require,module,exports){
module.exports = [
  { name: 'black', hex: '#000000' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'cyan', hex: '#00FFFF' },
  { name: 'green', hex: '#008000' },
  { name: 'teal', hex: '#008080' },
  { name: 'turquoise', hex: '#40E0D0' },
  { name: 'indigo', hex: '#4B0082' },
  { name: 'gray', hex: '#808080' },
  { name: 'purple', hex: '#800080' },
  { name: 'brown', hex: '#A52A2A' },
  { name: 'tan', hex: '#D2B48C' },
  { name: 'violet', hex: '#EE82EE' },
  { name: 'beige', hex: '#F5F5DC' },
  { name: 'fuchsia', hex: '#FF00FF' },
  { name: 'gold', hex: '#FFD700' },
  { name: 'magenta', hex: '#FF00FF' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'pink', hex: '#FFC0CB' },
  { name: 'red', hex: '#FF0000' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'yellow', hex: '#FFFF00' }
]

},{}],3:[function(require,module,exports){
module.exports = [
  { name: 'aqua', hex: '#00FFFF' },
  { name: 'aliceblue', hex: '#F0F8FF' },
  { name: 'antiquewhite', hex: '#FAEBD7' },
  { name: 'black', hex: '#000000' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'cyan', hex: '#00FFFF' },
  { name: 'darkblue', hex: '#00008B' },
  { name: 'darkcyan', hex: '#008B8B' },
  { name: 'darkgreen', hex: '#006400' },
  { name: 'darkturquoise', hex: '#00CED1' },
  { name: 'deepskyblue', hex: '#00BFFF' },
  { name: 'green', hex: '#008000' },
  { name: 'lime', hex: '#00FF00' },
  { name: 'mediumblue', hex: '#0000CD' },
  { name: 'mediumspringgreen', hex: '#00FA9A' },
  { name: 'navy', hex: '#000080' },
  { name: 'springgreen', hex: '#00FF7F' },
  { name: 'teal', hex: '#008080' },
  { name: 'midnightblue', hex: '#191970' },
  { name: 'dodgerblue', hex: '#1E90FF' },
  { name: 'lightseagreen', hex: '#20B2AA' },
  { name: 'forestgreen', hex: '#228B22' },
  { name: 'seagreen', hex: '#2E8B57' },
  { name: 'darkslategray', hex: '#2F4F4F' },
  { name: 'darkslategrey', hex: '#2F4F4F' },
  { name: 'limegreen', hex: '#32CD32' },
  { name: 'mediumseagreen', hex: '#3CB371' },
  { name: 'turquoise', hex: '#40E0D0' },
  { name: 'royalblue', hex: '#4169E1' },
  { name: 'steelblue', hex: '#4682B4' },
  { name: 'darkslateblue', hex: '#483D8B' },
  { name: 'mediumturquoise', hex: '#48D1CC' },
  { name: 'indigo', hex: '#4B0082' },
  { name: 'darkolivegreen', hex: '#556B2F' },
  { name: 'cadetblue', hex: '#5F9EA0' },
  { name: 'cornflowerblue', hex: '#6495ED' },
  { name: 'mediumaquamarine', hex: '#66CDAA' },
  { name: 'dimgray', hex: '#696969' },
  { name: 'dimgrey', hex: '#696969' },
  { name: 'slateblue', hex: '#6A5ACD' },
  { name: 'olivedrab', hex: '#6B8E23' },
  { name: 'slategray', hex: '#708090' },
  { name: 'slategrey', hex: '#708090' },
  { name: 'lightslategray', hex: '#778899' },
  { name: 'lightslategrey', hex: '#778899' },
  { name: 'mediumslateblue', hex: '#7B68EE' },
  { name: 'lawngreen', hex: '#7CFC00' },
  { name: 'aquamarine', hex: '#7FFFD4' },
  { name: 'chartreuse', hex: '#7FFF00' },
  { name: 'gray', hex: '#808080' },
  { name: 'grey', hex: '#808080' },
  { name: 'maroon', hex: '#800000' },
  { name: 'olive', hex: '#808000' },
  { name: 'purple', hex: '#800080' },
  { name: 'lightskyblue', hex: '#87CEFA' },
  { name: 'skyblue', hex: '#87CEEB' },
  { name: 'blueviolet', hex: '#8A2BE2' },
  { name: 'darkmagenta', hex: '#8B008B' },
  { name: 'darkred', hex: '#8B0000' },
  { name: 'saddlebrown', hex: '#8B4513' },
  { name: 'darkseagreen', hex: '#8FBC8F' },
  { name: 'lightgreen', hex: '#90EE90' },
  { name: 'mediumpurple', hex: '#9370DB' },
  { name: 'darkviolet', hex: '#9400D3' },
  { name: 'palegreen', hex: '#98FB98' },
  { name: 'darkorchid', hex: '#9932CC' },
  { name: 'yellowgreen', hex: '#9ACD32' },
  { name: 'sienna', hex: '#A0522D' },
  { name: 'brown', hex: '#A52A2A' },
  { name: 'darkgray', hex: '#A9A9A9' },
  { name: 'darkgrey', hex: '#A9A9A9' },
  { name: 'greenyellow', hex: '#ADFF2F' },
  { name: 'lightblue', hex: '#ADD8E6' },
  { name: 'paleturquoise', hex: '#AFEEEE' },
  { name: 'lightsteelblue', hex: '#B0C4DE' },
  { name: 'powderblue', hex: '#B0E0E6' },
  { name: 'firebrick', hex: '#B22222' },
  { name: 'darkgoldenrod', hex: '#B8860B' },
  { name: 'mediumorchid', hex: '#BA55D3' },
  { name: 'rosybrown', hex: '#BC8F8F' },
  { name: 'darkkhaki', hex: '#BDB76B' },
  { name: 'silver', hex: '#C0C0C0' },
  { name: 'mediumvioletred', hex: '#C71585' },
  { name: 'indianred', hex: '#CD5C5C' },
  { name: 'peru', hex: '#CD853F' },
  { name: 'chocolate', hex: '#D2691E' },
  { name: 'tan', hex: '#D2B48C' },
  { name: 'lightgray', hex: '#D3D3D3' },
  { name: 'lightgrey', hex: '#D3D3D3' },
  { name: 'thistle', hex: '#D8BFD8' },
  { name: 'goldenrod', hex: '#DAA520' },
  { name: 'orchid', hex: '#DA70D6' },
  { name: 'palevioletred', hex: '#DB7093' },
  { name: 'crimson', hex: '#DC143C' },
  { name: 'gainsboro', hex: '#DCDCDC' },
  { name: 'plum', hex: '#DDA0DD' },
  { name: 'burlywood', hex: '#DEB887' },
  { name: 'lightcyan', hex: '#E0FFFF' },
  { name: 'lavender', hex: '#E6E6FA' },
  { name: 'darksalmon', hex: '#E9967A' },
  { name: 'palegoldenrod', hex: '#EEE8AA' },
  { name: 'violet', hex: '#EE82EE' },
  { name: 'azure', hex: '#F0FFFF' },
  { name: 'honeydew', hex: '#F0FFF0' },
  { name: 'khaki', hex: '#F0E68C' },
  { name: 'lightcoral', hex: '#F08080' },
  { name: 'sandybrown', hex: '#F4A460' },
  { name: 'beige', hex: '#F5F5DC' },
  { name: 'mintcream', hex: '#F5FFFA' },
  { name: 'wheat', hex: '#F5DEB3' },
  { name: 'whitesmoke', hex: '#F5F5F5' },
  { name: 'ghostwhite', hex: '#F8F8FF' },
  { name: 'lightgoldenrodyellow',
    hex: '#FAFAD2' },
  { name: 'linen', hex: '#FAF0E6' },
  { name: 'salmon', hex: '#FA8072' },
  { name: 'oldlace', hex: '#FDF5E6' },
  { name: 'bisque', hex: '#FFE4C4' },
  { name: 'blanchedalmond', hex: '#FFEBCD' },
  { name: 'coral', hex: '#FF7F50' },
  { name: 'cornsilk', hex: '#FFF8DC' },
  { name: 'darkorange', hex: '#FF8C00' },
  { name: 'deeppink', hex: '#FF1493' },
  { name: 'floralwhite', hex: '#FFFAF0' },
  { name: 'fuchsia', hex: '#FF00FF' },
  { name: 'gold', hex: '#FFD700' },
  { name: 'hotpink', hex: '#FF69B4' },
  { name: 'ivory', hex: '#FFFFF0' },
  { name: 'lavenderblush', hex: '#FFF0F5' },
  { name: 'lemonchiffon', hex: '#FFFACD' },
  { name: 'lightpink', hex: '#FFB6C1' },
  { name: 'lightsalmon', hex: '#FFA07A' },
  { name: 'lightyellow', hex: '#FFFFE0' },
  { name: 'magenta', hex: '#FF00FF' },
  { name: 'mistyrose', hex: '#FFE4E1' },
  { name: 'moccasin', hex: '#FFE4B5' },
  { name: 'navajowhite', hex: '#FFDEAD' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'orangered', hex: '#FF4500' },
  { name: 'papayawhip', hex: '#FFEFD5' },
  { name: 'peachpuff', hex: '#FFDAB9' },
  { name: 'pink', hex: '#FFC0CB' },
  { name: 'red', hex: '#FF0000' },
  { name: 'seashell', hex: '#FFF5EE' },
  { name: 'snow', hex: '#FFFAFA' },
  { name: 'tomato', hex: '#FF6347' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'yellow', hex: '#FFFF00' }
]

},{}],4:[function(require,module,exports){
module.exports = [
  {
    "name": "Black",
    "hex": "000000"
  },
  {
    "name": "Navy Blue",
    "hex": "000080"
  },
  {
    "name": "Dark Blue",
    "hex": "0000C8"
  },
  {
    "name": "Blue",
    "hex": "0000FF"
  },
  {
    "name": "Stratos",
    "hex": "000741"
  },
  {
    "name": "Swamp",
    "hex": "001B1C"
  },
  {
    "name": "Resolution Blue",
    "hex": "002387"
  },
  {
    "name": "Deep Fir",
    "hex": "002900"
  },
  {
    "name": "Burnham",
    "hex": "002E20"
  },
  {
    "name": "International Klein Blue",
    "hex": "002FA7"
  },
  {
    "name": "Prussian Blue",
    "hex": "003153"
  },
  {
    "name": "Midnight Blue",
    "hex": "003366"
  },
  {
    "name": "Smalt",
    "hex": "003399"
  },
  {
    "name": "Deep Teal",
    "hex": "003532"
  },
  {
    "name": "Cyprus",
    "hex": "003E40"
  },
  {
    "name": "Kaitoke Green",
    "hex": "004620"
  },
  {
    "name": "Cobalt",
    "hex": "0047AB"
  },
  {
    "name": "Crusoe",
    "hex": "004816"
  },
  {
    "name": "Sherpa Blue",
    "hex": "004950"
  },
  {
    "name": "Endeavour",
    "hex": "0056A7"
  },
  {
    "name": "Camarone",
    "hex": "00581A"
  },
  {
    "name": "Science Blue",
    "hex": "0066CC"
  },
  {
    "name": "Blue Ribbon",
    "hex": "0066FF"
  },
  {
    "name": "Tropical Rain Forest",
    "hex": "00755E"
  },
  {
    "name": "Allports",
    "hex": "0076A3"
  },
  {
    "name": "Deep Cerulean",
    "hex": "007BA7"
  },
  {
    "name": "Lochmara",
    "hex": "007EC7"
  },
  {
    "name": "Azure Radiance",
    "hex": "007FFF"
  },
  {
    "name": "Teal",
    "hex": "008080"
  },
  {
    "name": "Bondi Blue",
    "hex": "0095B6"
  },
  {
    "name": "Pacific Blue",
    "hex": "009DC4"
  },
  {
    "name": "Persian Green",
    "hex": "00A693"
  },
  {
    "name": "Jade",
    "hex": "00A86B"
  },
  {
    "name": "Caribbean Green",
    "hex": "00CC99"
  },
  {
    "name": "Robin's Egg Blue",
    "hex": "00CCCC"
  },
  {
    "name": "Green",
    "hex": "00FF00"
  },
  {
    "name": "Spring Green",
    "hex": "00FF7F"
  },
  {
    "name": "Cyan / Aqua",
    "hex": "00FFFF"
  },
  {
    "name": "Blue Charcoal",
    "hex": "010D1A"
  },
  {
    "name": "Midnight",
    "hex": "011635"
  },
  {
    "name": "Holly",
    "hex": "011D13"
  },
  {
    "name": "Daintree",
    "hex": "012731"
  },
  {
    "name": "Cardin Green",
    "hex": "01361C"
  },
  {
    "name": "County Green",
    "hex": "01371A"
  },
  {
    "name": "Astronaut Blue",
    "hex": "013E62"
  },
  {
    "name": "Regal Blue",
    "hex": "013F6A"
  },
  {
    "name": "Aqua Deep",
    "hex": "014B43"
  },
  {
    "name": "Orient",
    "hex": "015E85"
  },
  {
    "name": "Blue Stone",
    "hex": "016162"
  },
  {
    "name": "Fun Green",
    "hex": "016D39"
  },
  {
    "name": "Pine Green",
    "hex": "01796F"
  },
  {
    "name": "Blue Lagoon",
    "hex": "017987"
  },
  {
    "name": "Deep Sea",
    "hex": "01826B"
  },
  {
    "name": "Green Haze",
    "hex": "01A368"
  },
  {
    "name": "English Holly",
    "hex": "022D15"
  },
  {
    "name": "Sherwood Green",
    "hex": "02402C"
  },
  {
    "name": "Congress Blue",
    "hex": "02478E"
  },
  {
    "name": "Evening Sea",
    "hex": "024E46"
  },
  {
    "name": "Bahama Blue",
    "hex": "026395"
  },
  {
    "name": "Observatory",
    "hex": "02866F"
  },
  {
    "name": "Cerulean",
    "hex": "02A4D3"
  },
  {
    "name": "Tangaroa",
    "hex": "03163C"
  },
  {
    "name": "Green Vogue",
    "hex": "032B52"
  },
  {
    "name": "Mosque",
    "hex": "036A6E"
  },
  {
    "name": "Midnight Moss",
    "hex": "041004"
  },
  {
    "name": "Black Pearl",
    "hex": "041322"
  },
  {
    "name": "Blue Whale",
    "hex": "042E4C"
  },
  {
    "name": "Zuccini",
    "hex": "044022"
  },
  {
    "name": "Teal Blue",
    "hex": "044259"
  },
  {
    "name": "Deep Cove",
    "hex": "051040"
  },
  {
    "name": "Gulf Blue",
    "hex": "051657"
  },
  {
    "name": "Venice Blue",
    "hex": "055989"
  },
  {
    "name": "Watercourse",
    "hex": "056F57"
  },
  {
    "name": "Catalina Blue",
    "hex": "062A78"
  },
  {
    "name": "Tiber",
    "hex": "063537"
  },
  {
    "name": "Gossamer",
    "hex": "069B81"
  },
  {
    "name": "Niagara",
    "hex": "06A189"
  },
  {
    "name": "Tarawera",
    "hex": "073A50"
  },
  {
    "name": "Jaguar",
    "hex": "080110"
  },
  {
    "name": "Black Bean",
    "hex": "081910"
  },
  {
    "name": "Deep Sapphire",
    "hex": "082567"
  },
  {
    "name": "Elf Green",
    "hex": "088370"
  },
  {
    "name": "Bright Turquoise",
    "hex": "08E8DE"
  },
  {
    "name": "Downriver",
    "hex": "092256"
  },
  {
    "name": "Palm Green",
    "hex": "09230F"
  },
  {
    "name": "Madison",
    "hex": "09255D"
  },
  {
    "name": "Bottle Green",
    "hex": "093624"
  },
  {
    "name": "Deep Sea Green",
    "hex": "095859"
  },
  {
    "name": "Salem",
    "hex": "097F4B"
  },
  {
    "name": "Black Russian",
    "hex": "0A001C"
  },
  {
    "name": "Dark Fern",
    "hex": "0A480D"
  },
  {
    "name": "Japanese Laurel",
    "hex": "0A6906"
  },
  {
    "name": "Atoll",
    "hex": "0A6F75"
  },
  {
    "name": "Cod Gray",
    "hex": "0B0B0B"
  },
  {
    "name": "Marshland",
    "hex": "0B0F08"
  },
  {
    "name": "Gordons Green",
    "hex": "0B1107"
  },
  {
    "name": "Black Forest",
    "hex": "0B1304"
  },
  {
    "name": "San Felix",
    "hex": "0B6207"
  },
  {
    "name": "Malachite",
    "hex": "0BDA51"
  },
  {
    "name": "Ebony",
    "hex": "0C0B1D"
  },
  {
    "name": "Woodsmoke",
    "hex": "0C0D0F"
  },
  {
    "name": "Racing Green",
    "hex": "0C1911"
  },
  {
    "name": "Surfie Green",
    "hex": "0C7A79"
  },
  {
    "name": "Blue Chill",
    "hex": "0C8990"
  },
  {
    "name": "Black Rock",
    "hex": "0D0332"
  },
  {
    "name": "Bunker",
    "hex": "0D1117"
  },
  {
    "name": "Aztec",
    "hex": "0D1C19"
  },
  {
    "name": "Bush",
    "hex": "0D2E1C"
  },
  {
    "name": "Cinder",
    "hex": "0E0E18"
  },
  {
    "name": "Firefly",
    "hex": "0E2A30"
  },
  {
    "name": "Torea Bay",
    "hex": "0F2D9E"
  },
  {
    "name": "Vulcan",
    "hex": "10121D"
  },
  {
    "name": "Green Waterloo",
    "hex": "101405"
  },
  {
    "name": "Eden",
    "hex": "105852"
  },
  {
    "name": "Arapawa",
    "hex": "110C6C"
  },
  {
    "name": "Ultramarine",
    "hex": "120A8F"
  },
  {
    "name": "Elephant",
    "hex": "123447"
  },
  {
    "name": "Jewel",
    "hex": "126B40"
  },
  {
    "name": "Diesel",
    "hex": "130000"
  },
  {
    "name": "Asphalt",
    "hex": "130A06"
  },
  {
    "name": "Blue Zodiac",
    "hex": "13264D"
  },
  {
    "name": "Parsley",
    "hex": "134F19"
  },
  {
    "name": "Nero",
    "hex": "140600"
  },
  {
    "name": "Tory Blue",
    "hex": "1450AA"
  },
  {
    "name": "Bunting",
    "hex": "151F4C"
  },
  {
    "name": "Denim",
    "hex": "1560BD"
  },
  {
    "name": "Genoa",
    "hex": "15736B"
  },
  {
    "name": "Mirage",
    "hex": "161928"
  },
  {
    "name": "Hunter Green",
    "hex": "161D10"
  },
  {
    "name": "Big Stone",
    "hex": "162A40"
  },
  {
    "name": "Celtic",
    "hex": "163222"
  },
  {
    "name": "Timber Green",
    "hex": "16322C"
  },
  {
    "name": "Gable Green",
    "hex": "163531"
  },
  {
    "name": "Pine Tree",
    "hex": "171F04"
  },
  {
    "name": "Chathams Blue",
    "hex": "175579"
  },
  {
    "name": "Deep Forest Green",
    "hex": "182D09"
  },
  {
    "name": "Blumine",
    "hex": "18587A"
  },
  {
    "name": "Palm Leaf",
    "hex": "19330E"
  },
  {
    "name": "Nile Blue",
    "hex": "193751"
  },
  {
    "name": "Fun Blue",
    "hex": "1959A8"
  },
  {
    "name": "Lucky Point",
    "hex": "1A1A68"
  },
  {
    "name": "Mountain Meadow",
    "hex": "1AB385"
  },
  {
    "name": "Tolopea",
    "hex": "1B0245"
  },
  {
    "name": "Haiti",
    "hex": "1B1035"
  },
  {
    "name": "Deep Koamaru",
    "hex": "1B127B"
  },
  {
    "name": "Acadia",
    "hex": "1B1404"
  },
  {
    "name": "Seaweed",
    "hex": "1B2F11"
  },
  {
    "name": "Biscay",
    "hex": "1B3162"
  },
  {
    "name": "Matisse",
    "hex": "1B659D"
  },
  {
    "name": "Crowshead",
    "hex": "1C1208"
  },
  {
    "name": "Rangoon Green",
    "hex": "1C1E13"
  },
  {
    "name": "Persian Blue",
    "hex": "1C39BB"
  },
  {
    "name": "Everglade",
    "hex": "1C402E"
  },
  {
    "name": "Elm",
    "hex": "1C7C7D"
  },
  {
    "name": "Green Pea",
    "hex": "1D6142"
  },
  {
    "name": "Creole",
    "hex": "1E0F04"
  },
  {
    "name": "Karaka",
    "hex": "1E1609"
  },
  {
    "name": "El Paso",
    "hex": "1E1708"
  },
  {
    "name": "Cello",
    "hex": "1E385B"
  },
  {
    "name": "Te Papa Green",
    "hex": "1E433C"
  },
  {
    "name": "Dodger Blue",
    "hex": "1E90FF"
  },
  {
    "name": "Eastern Blue",
    "hex": "1E9AB0"
  },
  {
    "name": "Night Rider",
    "hex": "1F120F"
  },
  {
    "name": "Java",
    "hex": "1FC2C2"
  },
  {
    "name": "Jacksons Purple",
    "hex": "20208D"
  },
  {
    "name": "Cloud Burst",
    "hex": "202E54"
  },
  {
    "name": "Blue Dianne",
    "hex": "204852"
  },
  {
    "name": "Eternity",
    "hex": "211A0E"
  },
  {
    "name": "Deep Blue",
    "hex": "220878"
  },
  {
    "name": "Forest Green",
    "hex": "228B22"
  },
  {
    "name": "Mallard",
    "hex": "233418"
  },
  {
    "name": "Violet",
    "hex": "240A40"
  },
  {
    "name": "Kilamanjaro",
    "hex": "240C02"
  },
  {
    "name": "Log Cabin",
    "hex": "242A1D"
  },
  {
    "name": "Black Olive",
    "hex": "242E16"
  },
  {
    "name": "Green House",
    "hex": "24500F"
  },
  {
    "name": "Graphite",
    "hex": "251607"
  },
  {
    "name": "Cannon Black",
    "hex": "251706"
  },
  {
    "name": "Port Gore",
    "hex": "251F4F"
  },
  {
    "name": "Shark",
    "hex": "25272C"
  },
  {
    "name": "Green Kelp",
    "hex": "25311C"
  },
  {
    "name": "Curious Blue",
    "hex": "2596D1"
  },
  {
    "name": "Paua",
    "hex": "260368"
  },
  {
    "name": "Paris M",
    "hex": "26056A"
  },
  {
    "name": "Wood Bark",
    "hex": "261105"
  },
  {
    "name": "Gondola",
    "hex": "261414"
  },
  {
    "name": "Steel Gray",
    "hex": "262335"
  },
  {
    "name": "Ebony Clay",
    "hex": "26283B"
  },
  {
    "name": "Bay of Many",
    "hex": "273A81"
  },
  {
    "name": "Plantation",
    "hex": "27504B"
  },
  {
    "name": "Eucalyptus",
    "hex": "278A5B"
  },
  {
    "name": "Oil",
    "hex": "281E15"
  },
  {
    "name": "Astronaut",
    "hex": "283A77"
  },
  {
    "name": "Mariner",
    "hex": "286ACD"
  },
  {
    "name": "Violent Violet",
    "hex": "290C5E"
  },
  {
    "name": "Bastille",
    "hex": "292130"
  },
  {
    "name": "Zeus",
    "hex": "292319"
  },
  {
    "name": "Charade",
    "hex": "292937"
  },
  {
    "name": "Jelly Bean",
    "hex": "297B9A"
  },
  {
    "name": "Jungle Green",
    "hex": "29AB87"
  },
  {
    "name": "Cherry Pie",
    "hex": "2A0359"
  },
  {
    "name": "Coffee Bean",
    "hex": "2A140E"
  },
  {
    "name": "Baltic Sea",
    "hex": "2A2630"
  },
  {
    "name": "Turtle Green",
    "hex": "2A380B"
  },
  {
    "name": "Cerulean Blue",
    "hex": "2A52BE"
  },
  {
    "name": "Sepia Black",
    "hex": "2B0202"
  },
  {
    "name": "Valhalla",
    "hex": "2B194F"
  },
  {
    "name": "Heavy Metal",
    "hex": "2B3228"
  },
  {
    "name": "Blue Gem",
    "hex": "2C0E8C"
  },
  {
    "name": "Revolver",
    "hex": "2C1632"
  },
  {
    "name": "Bleached Cedar",
    "hex": "2C2133"
  },
  {
    "name": "Lochinvar",
    "hex": "2C8C84"
  },
  {
    "name": "Mikado",
    "hex": "2D2510"
  },
  {
    "name": "Outer Space",
    "hex": "2D383A"
  },
  {
    "name": "St Tropaz",
    "hex": "2D569B"
  },
  {
    "name": "Jacaranda",
    "hex": "2E0329"
  },
  {
    "name": "Jacko Bean",
    "hex": "2E1905"
  },
  {
    "name": "Rangitoto",
    "hex": "2E3222"
  },
  {
    "name": "Rhino",
    "hex": "2E3F62"
  },
  {
    "name": "Sea Green",
    "hex": "2E8B57"
  },
  {
    "name": "Scooter",
    "hex": "2EBFD4"
  },
  {
    "name": "Onion",
    "hex": "2F270E"
  },
  {
    "name": "Governor Bay",
    "hex": "2F3CB3"
  },
  {
    "name": "Sapphire",
    "hex": "2F519E"
  },
  {
    "name": "Spectra",
    "hex": "2F5A57"
  },
  {
    "name": "Casal",
    "hex": "2F6168"
  },
  {
    "name": "Melanzane",
    "hex": "300529"
  },
  {
    "name": "Cocoa Brown",
    "hex": "301F1E"
  },
  {
    "name": "Woodrush",
    "hex": "302A0F"
  },
  {
    "name": "San Juan",
    "hex": "304B6A"
  },
  {
    "name": "Turquoise",
    "hex": "30D5C8"
  },
  {
    "name": "Eclipse",
    "hex": "311C17"
  },
  {
    "name": "Pickled Bluewood",
    "hex": "314459"
  },
  {
    "name": "Azure",
    "hex": "315BA1"
  },
  {
    "name": "Calypso",
    "hex": "31728D"
  },
  {
    "name": "Paradiso",
    "hex": "317D82"
  },
  {
    "name": "Persian Indigo",
    "hex": "32127A"
  },
  {
    "name": "Blackcurrant",
    "hex": "32293A"
  },
  {
    "name": "Mine Shaft",
    "hex": "323232"
  },
  {
    "name": "Stromboli",
    "hex": "325D52"
  },
  {
    "name": "Bilbao",
    "hex": "327C14"
  },
  {
    "name": "Astral",
    "hex": "327DA0"
  },
  {
    "name": "Christalle",
    "hex": "33036B"
  },
  {
    "name": "Thunder",
    "hex": "33292F"
  },
  {
    "name": "Shamrock",
    "hex": "33CC99"
  },
  {
    "name": "Tamarind",
    "hex": "341515"
  },
  {
    "name": "Mardi Gras",
    "hex": "350036"
  },
  {
    "name": "Valentino",
    "hex": "350E42"
  },
  {
    "name": "Jagger",
    "hex": "350E57"
  },
  {
    "name": "Tuna",
    "hex": "353542"
  },
  {
    "name": "Chambray",
    "hex": "354E8C"
  },
  {
    "name": "Martinique",
    "hex": "363050"
  },
  {
    "name": "Tuatara",
    "hex": "363534"
  },
  {
    "name": "Waiouru",
    "hex": "363C0D"
  },
  {
    "name": "Ming",
    "hex": "36747D"
  },
  {
    "name": "La Palma",
    "hex": "368716"
  },
  {
    "name": "Chocolate",
    "hex": "370202"
  },
  {
    "name": "Clinker",
    "hex": "371D09"
  },
  {
    "name": "Brown Tumbleweed",
    "hex": "37290E"
  },
  {
    "name": "Birch",
    "hex": "373021"
  },
  {
    "name": "Oracle",
    "hex": "377475"
  },
  {
    "name": "Blue Diamond",
    "hex": "380474"
  },
  {
    "name": "Grape",
    "hex": "381A51"
  },
  {
    "name": "Dune",
    "hex": "383533"
  },
  {
    "name": "Oxford Blue",
    "hex": "384555"
  },
  {
    "name": "Clover",
    "hex": "384910"
  },
  {
    "name": "Limed Spruce",
    "hex": "394851"
  },
  {
    "name": "Dell",
    "hex": "396413"
  },
  {
    "name": "Toledo",
    "hex": "3A0020"
  },
  {
    "name": "Sambuca",
    "hex": "3A2010"
  },
  {
    "name": "Jacarta",
    "hex": "3A2A6A"
  },
  {
    "name": "William",
    "hex": "3A686C"
  },
  {
    "name": "Killarney",
    "hex": "3A6A47"
  },
  {
    "name": "Keppel",
    "hex": "3AB09E"
  },
  {
    "name": "Temptress",
    "hex": "3B000B"
  },
  {
    "name": "Aubergine",
    "hex": "3B0910"
  },
  {
    "name": "Jon",
    "hex": "3B1F1F"
  },
  {
    "name": "Treehouse",
    "hex": "3B2820"
  },
  {
    "name": "Amazon",
    "hex": "3B7A57"
  },
  {
    "name": "Boston Blue",
    "hex": "3B91B4"
  },
  {
    "name": "Windsor",
    "hex": "3C0878"
  },
  {
    "name": "Rebel",
    "hex": "3C1206"
  },
  {
    "name": "Meteorite",
    "hex": "3C1F76"
  },
  {
    "name": "Dark Ebony",
    "hex": "3C2005"
  },
  {
    "name": "Camouflage",
    "hex": "3C3910"
  },
  {
    "name": "Bright Gray",
    "hex": "3C4151"
  },
  {
    "name": "Cape Cod",
    "hex": "3C4443"
  },
  {
    "name": "Lunar Green",
    "hex": "3C493A"
  },
  {
    "name": "Bean  ",
    "hex": "3D0C02"
  },
  {
    "name": "Bistre",
    "hex": "3D2B1F"
  },
  {
    "name": "Goblin",
    "hex": "3D7D52"
  },
  {
    "name": "Kingfisher Daisy",
    "hex": "3E0480"
  },
  {
    "name": "Cedar",
    "hex": "3E1C14"
  },
  {
    "name": "English Walnut",
    "hex": "3E2B23"
  },
  {
    "name": "Black Marlin",
    "hex": "3E2C1C"
  },
  {
    "name": "Ship Gray",
    "hex": "3E3A44"
  },
  {
    "name": "Pelorous",
    "hex": "3EABBF"
  },
  {
    "name": "Bronze",
    "hex": "3F2109"
  },
  {
    "name": "Cola",
    "hex": "3F2500"
  },
  {
    "name": "Madras",
    "hex": "3F3002"
  },
  {
    "name": "Minsk",
    "hex": "3F307F"
  },
  {
    "name": "Cabbage Pont",
    "hex": "3F4C3A"
  },
  {
    "name": "Tom Thumb",
    "hex": "3F583B"
  },
  {
    "name": "Mineral Green",
    "hex": "3F5D53"
  },
  {
    "name": "Puerto Rico",
    "hex": "3FC1AA"
  },
  {
    "name": "Harlequin",
    "hex": "3FFF00"
  },
  {
    "name": "Brown Pod",
    "hex": "401801"
  },
  {
    "name": "Cork",
    "hex": "40291D"
  },
  {
    "name": "Masala",
    "hex": "403B38"
  },
  {
    "name": "Thatch Green",
    "hex": "403D19"
  },
  {
    "name": "Fiord",
    "hex": "405169"
  },
  {
    "name": "Viridian",
    "hex": "40826D"
  },
  {
    "name": "Chateau Green",
    "hex": "40A860"
  },
  {
    "name": "Ripe Plum",
    "hex": "410056"
  },
  {
    "name": "Paco",
    "hex": "411F10"
  },
  {
    "name": "Deep Oak",
    "hex": "412010"
  },
  {
    "name": "Merlin",
    "hex": "413C37"
  },
  {
    "name": "Gun Powder",
    "hex": "414257"
  },
  {
    "name": "East Bay",
    "hex": "414C7D"
  },
  {
    "name": "Royal Blue",
    "hex": "4169E1"
  },
  {
    "name": "Ocean Green",
    "hex": "41AA78"
  },
  {
    "name": "Burnt Maroon",
    "hex": "420303"
  },
  {
    "name": "Lisbon Brown",
    "hex": "423921"
  },
  {
    "name": "Faded Jade",
    "hex": "427977"
  },
  {
    "name": "Scarlet Gum",
    "hex": "431560"
  },
  {
    "name": "Iroko",
    "hex": "433120"
  },
  {
    "name": "Armadillo",
    "hex": "433E37"
  },
  {
    "name": "River Bed",
    "hex": "434C59"
  },
  {
    "name": "Green Leaf",
    "hex": "436A0D"
  },
  {
    "name": "Barossa",
    "hex": "44012D"
  },
  {
    "name": "Morocco Brown",
    "hex": "441D00"
  },
  {
    "name": "Mako",
    "hex": "444954"
  },
  {
    "name": "Kelp",
    "hex": "454936"
  },
  {
    "name": "San Marino",
    "hex": "456CAC"
  },
  {
    "name": "Picton Blue",
    "hex": "45B1E8"
  },
  {
    "name": "Loulou",
    "hex": "460B41"
  },
  {
    "name": "Crater Brown",
    "hex": "462425"
  },
  {
    "name": "Gray Asparagus",
    "hex": "465945"
  },
  {
    "name": "Steel Blue",
    "hex": "4682B4"
  },
  {
    "name": "Rustic Red",
    "hex": "480404"
  },
  {
    "name": "Bulgarian Rose",
    "hex": "480607"
  },
  {
    "name": "Clairvoyant",
    "hex": "480656"
  },
  {
    "name": "Cocoa Bean",
    "hex": "481C1C"
  },
  {
    "name": "Woody Brown",
    "hex": "483131"
  },
  {
    "name": "Taupe",
    "hex": "483C32"
  },
  {
    "name": "Van Cleef",
    "hex": "49170C"
  },
  {
    "name": "Brown Derby",
    "hex": "492615"
  },
  {
    "name": "Metallic Bronze",
    "hex": "49371B"
  },
  {
    "name": "Verdun Green",
    "hex": "495400"
  },
  {
    "name": "Blue Bayoux",
    "hex": "496679"
  },
  {
    "name": "Bismark",
    "hex": "497183"
  },
  {
    "name": "Bracken",
    "hex": "4A2A04"
  },
  {
    "name": "Deep Bronze",
    "hex": "4A3004"
  },
  {
    "name": "Mondo",
    "hex": "4A3C30"
  },
  {
    "name": "Tundora",
    "hex": "4A4244"
  },
  {
    "name": "Gravel",
    "hex": "4A444B"
  },
  {
    "name": "Trout",
    "hex": "4A4E5A"
  },
  {
    "name": "Pigment Indigo",
    "hex": "4B0082"
  },
  {
    "name": "Nandor",
    "hex": "4B5D52"
  },
  {
    "name": "Saddle",
    "hex": "4C3024"
  },
  {
    "name": "Abbey",
    "hex": "4C4F56"
  },
  {
    "name": "Blackberry",
    "hex": "4D0135"
  },
  {
    "name": "Cab Sav",
    "hex": "4D0A18"
  },
  {
    "name": "Indian Tan",
    "hex": "4D1E01"
  },
  {
    "name": "Cowboy",
    "hex": "4D282D"
  },
  {
    "name": "Livid Brown",
    "hex": "4D282E"
  },
  {
    "name": "Rock",
    "hex": "4D3833"
  },
  {
    "name": "Punga",
    "hex": "4D3D14"
  },
  {
    "name": "Bronzetone",
    "hex": "4D400F"
  },
  {
    "name": "Woodland",
    "hex": "4D5328"
  },
  {
    "name": "Mahogany",
    "hex": "4E0606"
  },
  {
    "name": "Bossanova",
    "hex": "4E2A5A"
  },
  {
    "name": "Matterhorn",
    "hex": "4E3B41"
  },
  {
    "name": "Bronze Olive",
    "hex": "4E420C"
  },
  {
    "name": "Mulled Wine",
    "hex": "4E4562"
  },
  {
    "name": "Axolotl",
    "hex": "4E6649"
  },
  {
    "name": "Wedgewood",
    "hex": "4E7F9E"
  },
  {
    "name": "Shakespeare",
    "hex": "4EABD1"
  },
  {
    "name": "Honey Flower",
    "hex": "4F1C70"
  },
  {
    "name": "Daisy Bush",
    "hex": "4F2398"
  },
  {
    "name": "Indigo",
    "hex": "4F69C6"
  },
  {
    "name": "Fern Green",
    "hex": "4F7942"
  },
  {
    "name": "Fruit Salad",
    "hex": "4F9D5D"
  },
  {
    "name": "Apple",
    "hex": "4FA83D"
  },
  {
    "name": "Mortar",
    "hex": "504351"
  },
  {
    "name": "Kashmir Blue",
    "hex": "507096"
  },
  {
    "name": "Cutty Sark",
    "hex": "507672"
  },
  {
    "name": "Emerald",
    "hex": "50C878"
  },
  {
    "name": "Emperor",
    "hex": "514649"
  },
  {
    "name": "Chalet Green",
    "hex": "516E3D"
  },
  {
    "name": "Como",
    "hex": "517C66"
  },
  {
    "name": "Smalt Blue",
    "hex": "51808F"
  },
  {
    "name": "Castro",
    "hex": "52001F"
  },
  {
    "name": "Maroon Oak",
    "hex": "520C17"
  },
  {
    "name": "Gigas",
    "hex": "523C94"
  },
  {
    "name": "Voodoo",
    "hex": "533455"
  },
  {
    "name": "Victoria",
    "hex": "534491"
  },
  {
    "name": "Hippie Green",
    "hex": "53824B"
  },
  {
    "name": "Heath",
    "hex": "541012"
  },
  {
    "name": "Judge Gray",
    "hex": "544333"
  },
  {
    "name": "Fuscous Gray",
    "hex": "54534D"
  },
  {
    "name": "Vida Loca",
    "hex": "549019"
  },
  {
    "name": "Cioccolato",
    "hex": "55280C"
  },
  {
    "name": "Saratoga",
    "hex": "555B10"
  },
  {
    "name": "Finlandia",
    "hex": "556D56"
  },
  {
    "name": "Havelock Blue",
    "hex": "5590D9"
  },
  {
    "name": "Fountain Blue",
    "hex": "56B4BE"
  },
  {
    "name": "Spring Leaves",
    "hex": "578363"
  },
  {
    "name": "Saddle Brown",
    "hex": "583401"
  },
  {
    "name": "Scarpa Flow",
    "hex": "585562"
  },
  {
    "name": "Cactus",
    "hex": "587156"
  },
  {
    "name": "Hippie Blue",
    "hex": "589AAF"
  },
  {
    "name": "Wine Berry",
    "hex": "591D35"
  },
  {
    "name": "Brown Bramble",
    "hex": "592804"
  },
  {
    "name": "Congo Brown",
    "hex": "593737"
  },
  {
    "name": "Millbrook",
    "hex": "594433"
  },
  {
    "name": "Waikawa Gray",
    "hex": "5A6E9C"
  },
  {
    "name": "Horizon",
    "hex": "5A87A0"
  },
  {
    "name": "Jambalaya",
    "hex": "5B3013"
  },
  {
    "name": "Bordeaux",
    "hex": "5C0120"
  },
  {
    "name": "Mulberry Wood",
    "hex": "5C0536"
  },
  {
    "name": "Carnaby Tan",
    "hex": "5C2E01"
  },
  {
    "name": "Comet",
    "hex": "5C5D75"
  },
  {
    "name": "Redwood",
    "hex": "5D1E0F"
  },
  {
    "name": "Don Juan",
    "hex": "5D4C51"
  },
  {
    "name": "Chicago",
    "hex": "5D5C58"
  },
  {
    "name": "Verdigris",
    "hex": "5D5E37"
  },
  {
    "name": "Dingley",
    "hex": "5D7747"
  },
  {
    "name": "Breaker Bay",
    "hex": "5DA19F"
  },
  {
    "name": "Kabul",
    "hex": "5E483E"
  },
  {
    "name": "Hemlock",
    "hex": "5E5D3B"
  },
  {
    "name": "Irish Coffee",
    "hex": "5F3D26"
  },
  {
    "name": "Mid Gray",
    "hex": "5F5F6E"
  },
  {
    "name": "Shuttle Gray",
    "hex": "5F6672"
  },
  {
    "name": "Aqua Forest",
    "hex": "5FA777"
  },
  {
    "name": "Tradewind",
    "hex": "5FB3AC"
  },
  {
    "name": "Horses Neck",
    "hex": "604913"
  },
  {
    "name": "Smoky",
    "hex": "605B73"
  },
  {
    "name": "Corduroy",
    "hex": "606E68"
  },
  {
    "name": "Danube",
    "hex": "6093D1"
  },
  {
    "name": "Espresso",
    "hex": "612718"
  },
  {
    "name": "Eggplant",
    "hex": "614051"
  },
  {
    "name": "Costa Del Sol",
    "hex": "615D30"
  },
  {
    "name": "Glade Green",
    "hex": "61845F"
  },
  {
    "name": "Buccaneer",
    "hex": "622F30"
  },
  {
    "name": "Quincy",
    "hex": "623F2D"
  },
  {
    "name": "Butterfly Bush",
    "hex": "624E9A"
  },
  {
    "name": "West Coast",
    "hex": "625119"
  },
  {
    "name": "Finch",
    "hex": "626649"
  },
  {
    "name": "Patina",
    "hex": "639A8F"
  },
  {
    "name": "Fern",
    "hex": "63B76C"
  },
  {
    "name": "Blue Violet",
    "hex": "6456B7"
  },
  {
    "name": "Dolphin",
    "hex": "646077"
  },
  {
    "name": "Storm Dust",
    "hex": "646463"
  },
  {
    "name": "Siam",
    "hex": "646A54"
  },
  {
    "name": "Nevada",
    "hex": "646E75"
  },
  {
    "name": "Cornflower Blue",
    "hex": "6495ED"
  },
  {
    "name": "Viking",
    "hex": "64CCDB"
  },
  {
    "name": "Rosewood",
    "hex": "65000B"
  },
  {
    "name": "Cherrywood",
    "hex": "651A14"
  },
  {
    "name": "Purple Heart",
    "hex": "652DC1"
  },
  {
    "name": "Fern Frond",
    "hex": "657220"
  },
  {
    "name": "Willow Grove",
    "hex": "65745D"
  },
  {
    "name": "Hoki",
    "hex": "65869F"
  },
  {
    "name": "Pompadour",
    "hex": "660045"
  },
  {
    "name": "Purple",
    "hex": "660099"
  },
  {
    "name": "Tyrian Purple",
    "hex": "66023C"
  },
  {
    "name": "Dark Tan",
    "hex": "661010"
  },
  {
    "name": "Silver Tree",
    "hex": "66B58F"
  },
  {
    "name": "Bright Green",
    "hex": "66FF00"
  },
  {
    "name": "Screamin' Green",
    "hex": "66FF66"
  },
  {
    "name": "Black Rose",
    "hex": "67032D"
  },
  {
    "name": "Scampi",
    "hex": "675FA6"
  },
  {
    "name": "Ironside Gray",
    "hex": "676662"
  },
  {
    "name": "Viridian Green",
    "hex": "678975"
  },
  {
    "name": "Christi",
    "hex": "67A712"
  },
  {
    "name": "Nutmeg Wood Finish",
    "hex": "683600"
  },
  {
    "name": "Zambezi",
    "hex": "685558"
  },
  {
    "name": "Salt Box",
    "hex": "685E6E"
  },
  {
    "name": "Tawny Port",
    "hex": "692545"
  },
  {
    "name": "Finn",
    "hex": "692D54"
  },
  {
    "name": "Scorpion",
    "hex": "695F62"
  },
  {
    "name": "Lynch",
    "hex": "697E9A"
  },
  {
    "name": "Spice",
    "hex": "6A442E"
  },
  {
    "name": "Himalaya",
    "hex": "6A5D1B"
  },
  {
    "name": "Soya Bean",
    "hex": "6A6051"
  },
  {
    "name": "Hairy Heath",
    "hex": "6B2A14"
  },
  {
    "name": "Royal Purple",
    "hex": "6B3FA0"
  },
  {
    "name": "Shingle Fawn",
    "hex": "6B4E31"
  },
  {
    "name": "Dorado",
    "hex": "6B5755"
  },
  {
    "name": "Bermuda Gray",
    "hex": "6B8BA2"
  },
  {
    "name": "Olive Drab",
    "hex": "6B8E23"
  },
  {
    "name": "Eminence",
    "hex": "6C3082"
  },
  {
    "name": "Turquoise Blue",
    "hex": "6CDAE7"
  },
  {
    "name": "Lonestar",
    "hex": "6D0101"
  },
  {
    "name": "Pine Cone",
    "hex": "6D5E54"
  },
  {
    "name": "Dove Gray",
    "hex": "6D6C6C"
  },
  {
    "name": "Juniper",
    "hex": "6D9292"
  },
  {
    "name": "Gothic",
    "hex": "6D92A1"
  },
  {
    "name": "Red Oxide",
    "hex": "6E0902"
  },
  {
    "name": "Moccaccino",
    "hex": "6E1D14"
  },
  {
    "name": "Pickled Bean",
    "hex": "6E4826"
  },
  {
    "name": "Dallas",
    "hex": "6E4B26"
  },
  {
    "name": "Kokoda",
    "hex": "6E6D57"
  },
  {
    "name": "Pale Sky",
    "hex": "6E7783"
  },
  {
    "name": "Cafe Royale",
    "hex": "6F440C"
  },
  {
    "name": "Flint",
    "hex": "6F6A61"
  },
  {
    "name": "Highland",
    "hex": "6F8E63"
  },
  {
    "name": "Limeade",
    "hex": "6F9D02"
  },
  {
    "name": "Downy",
    "hex": "6FD0C5"
  },
  {
    "name": "Persian Plum",
    "hex": "701C1C"
  },
  {
    "name": "Sepia",
    "hex": "704214"
  },
  {
    "name": "Antique Bronze",
    "hex": "704A07"
  },
  {
    "name": "Ferra",
    "hex": "704F50"
  },
  {
    "name": "Coffee",
    "hex": "706555"
  },
  {
    "name": "Slate Gray",
    "hex": "708090"
  },
  {
    "name": "Cedar Wood Finish",
    "hex": "711A00"
  },
  {
    "name": "Metallic Copper",
    "hex": "71291D"
  },
  {
    "name": "Affair",
    "hex": "714693"
  },
  {
    "name": "Studio",
    "hex": "714AB2"
  },
  {
    "name": "Tobacco Brown",
    "hex": "715D47"
  },
  {
    "name": "Yellow Metal",
    "hex": "716338"
  },
  {
    "name": "Peat",
    "hex": "716B56"
  },
  {
    "name": "Olivetone",
    "hex": "716E10"
  },
  {
    "name": "Storm Gray",
    "hex": "717486"
  },
  {
    "name": "Sirocco",
    "hex": "718080"
  },
  {
    "name": "Aquamarine Blue",
    "hex": "71D9E2"
  },
  {
    "name": "Venetian Red",
    "hex": "72010F"
  },
  {
    "name": "Old Copper",
    "hex": "724A2F"
  },
  {
    "name": "Go Ben",
    "hex": "726D4E"
  },
  {
    "name": "Raven",
    "hex": "727B89"
  },
  {
    "name": "Seance",
    "hex": "731E8F"
  },
  {
    "name": "Raw Umber",
    "hex": "734A12"
  },
  {
    "name": "Kimberly",
    "hex": "736C9F"
  },
  {
    "name": "Crocodile",
    "hex": "736D58"
  },
  {
    "name": "Crete",
    "hex": "737829"
  },
  {
    "name": "Xanadu",
    "hex": "738678"
  },
  {
    "name": "Spicy Mustard",
    "hex": "74640D"
  },
  {
    "name": "Limed Ash",
    "hex": "747D63"
  },
  {
    "name": "Rolling Stone",
    "hex": "747D83"
  },
  {
    "name": "Blue Smoke",
    "hex": "748881"
  },
  {
    "name": "Laurel",
    "hex": "749378"
  },
  {
    "name": "Mantis",
    "hex": "74C365"
  },
  {
    "name": "Russett",
    "hex": "755A57"
  },
  {
    "name": "Deluge",
    "hex": "7563A8"
  },
  {
    "name": "Cosmic",
    "hex": "76395D"
  },
  {
    "name": "Blue Marguerite",
    "hex": "7666C6"
  },
  {
    "name": "Lima",
    "hex": "76BD17"
  },
  {
    "name": "Sky Blue",
    "hex": "76D7EA"
  },
  {
    "name": "Dark Burgundy",
    "hex": "770F05"
  },
  {
    "name": "Crown of Thorns",
    "hex": "771F1F"
  },
  {
    "name": "Walnut",
    "hex": "773F1A"
  },
  {
    "name": "Pablo",
    "hex": "776F61"
  },
  {
    "name": "Pacifika",
    "hex": "778120"
  },
  {
    "name": "Oxley",
    "hex": "779E86"
  },
  {
    "name": "Pastel Green",
    "hex": "77DD77"
  },
  {
    "name": "Japanese Maple",
    "hex": "780109"
  },
  {
    "name": "Mocha",
    "hex": "782D19"
  },
  {
    "name": "Peanut",
    "hex": "782F16"
  },
  {
    "name": "Camouflage Green",
    "hex": "78866B"
  },
  {
    "name": "Wasabi",
    "hex": "788A25"
  },
  {
    "name": "Ship Cove",
    "hex": "788BBA"
  },
  {
    "name": "Sea Nymph",
    "hex": "78A39C"
  },
  {
    "name": "Roman Coffee",
    "hex": "795D4C"
  },
  {
    "name": "Old Lavender",
    "hex": "796878"
  },
  {
    "name": "Rum",
    "hex": "796989"
  },
  {
    "name": "Fedora",
    "hex": "796A78"
  },
  {
    "name": "Sandstone",
    "hex": "796D62"
  },
  {
    "name": "Spray",
    "hex": "79DEEC"
  },
  {
    "name": "Siren",
    "hex": "7A013A"
  },
  {
    "name": "Fuchsia Blue",
    "hex": "7A58C1"
  },
  {
    "name": "Boulder",
    "hex": "7A7A7A"
  },
  {
    "name": "Wild Blue Yonder",
    "hex": "7A89B8"
  },
  {
    "name": "De York",
    "hex": "7AC488"
  },
  {
    "name": "Red Beech",
    "hex": "7B3801"
  },
  {
    "name": "Cinnamon",
    "hex": "7B3F00"
  },
  {
    "name": "Yukon Gold",
    "hex": "7B6608"
  },
  {
    "name": "Tapa",
    "hex": "7B7874"
  },
  {
    "name": "Waterloo ",
    "hex": "7B7C94"
  },
  {
    "name": "Flax Smoke",
    "hex": "7B8265"
  },
  {
    "name": "Amulet",
    "hex": "7B9F80"
  },
  {
    "name": "Asparagus",
    "hex": "7BA05B"
  },
  {
    "name": "Kenyan Copper",
    "hex": "7C1C05"
  },
  {
    "name": "Pesto",
    "hex": "7C7631"
  },
  {
    "name": "Topaz",
    "hex": "7C778A"
  },
  {
    "name": "Concord",
    "hex": "7C7B7A"
  },
  {
    "name": "Jumbo",
    "hex": "7C7B82"
  },
  {
    "name": "Trendy Green",
    "hex": "7C881A"
  },
  {
    "name": "Gumbo",
    "hex": "7CA1A6"
  },
  {
    "name": "Acapulco",
    "hex": "7CB0A1"
  },
  {
    "name": "Neptune",
    "hex": "7CB7BB"
  },
  {
    "name": "Pueblo",
    "hex": "7D2C14"
  },
  {
    "name": "Bay Leaf",
    "hex": "7DA98D"
  },
  {
    "name": "Malibu",
    "hex": "7DC8F7"
  },
  {
    "name": "Bermuda",
    "hex": "7DD8C6"
  },
  {
    "name": "Copper Canyon",
    "hex": "7E3A15"
  },
  {
    "name": "Claret",
    "hex": "7F1734"
  },
  {
    "name": "Peru Tan",
    "hex": "7F3A02"
  },
  {
    "name": "Falcon",
    "hex": "7F626D"
  },
  {
    "name": "Mobster",
    "hex": "7F7589"
  },
  {
    "name": "Moody Blue",
    "hex": "7F76D3"
  },
  {
    "name": "Chartreuse",
    "hex": "7FFF00"
  },
  {
    "name": "Aquamarine",
    "hex": "7FFFD4"
  },
  {
    "name": "Maroon",
    "hex": "800000"
  },
  {
    "name": "Rose Bud Cherry",
    "hex": "800B47"
  },
  {
    "name": "Falu Red",
    "hex": "801818"
  },
  {
    "name": "Red Robin",
    "hex": "80341F"
  },
  {
    "name": "Vivid Violet",
    "hex": "803790"
  },
  {
    "name": "Russet",
    "hex": "80461B"
  },
  {
    "name": "Friar Gray",
    "hex": "807E79"
  },
  {
    "name": "Olive",
    "hex": "808000"
  },
  {
    "name": "Gray",
    "hex": "808080"
  },
  {
    "name": "Gulf Stream",
    "hex": "80B3AE"
  },
  {
    "name": "Glacier",
    "hex": "80B3C4"
  },
  {
    "name": "Seagull",
    "hex": "80CCEA"
  },
  {
    "name": "Nutmeg",
    "hex": "81422C"
  },
  {
    "name": "Spicy Pink",
    "hex": "816E71"
  },
  {
    "name": "Empress",
    "hex": "817377"
  },
  {
    "name": "Spanish Green",
    "hex": "819885"
  },
  {
    "name": "Sand Dune",
    "hex": "826F65"
  },
  {
    "name": "Gunsmoke",
    "hex": "828685"
  },
  {
    "name": "Battleship Gray",
    "hex": "828F72"
  },
  {
    "name": "Merlot",
    "hex": "831923"
  },
  {
    "name": "Shadow",
    "hex": "837050"
  },
  {
    "name": "Chelsea Cucumber",
    "hex": "83AA5D"
  },
  {
    "name": "Monte Carlo",
    "hex": "83D0C6"
  },
  {
    "name": "Plum",
    "hex": "843179"
  },
  {
    "name": "Granny Smith",
    "hex": "84A0A0"
  },
  {
    "name": "Chetwode Blue",
    "hex": "8581D9"
  },
  {
    "name": "Bandicoot",
    "hex": "858470"
  },
  {
    "name": "Bali Hai",
    "hex": "859FAF"
  },
  {
    "name": "Half Baked",
    "hex": "85C4CC"
  },
  {
    "name": "Red Devil",
    "hex": "860111"
  },
  {
    "name": "Lotus",
    "hex": "863C3C"
  },
  {
    "name": "Ironstone",
    "hex": "86483C"
  },
  {
    "name": "Bull Shot",
    "hex": "864D1E"
  },
  {
    "name": "Rusty Nail",
    "hex": "86560A"
  },
  {
    "name": "Bitter",
    "hex": "868974"
  },
  {
    "name": "Regent Gray",
    "hex": "86949F"
  },
  {
    "name": "Disco",
    "hex": "871550"
  },
  {
    "name": "Americano",
    "hex": "87756E"
  },
  {
    "name": "Hurricane",
    "hex": "877C7B"
  },
  {
    "name": "Oslo Gray",
    "hex": "878D91"
  },
  {
    "name": "Sushi",
    "hex": "87AB39"
  },
  {
    "name": "Spicy Mix",
    "hex": "885342"
  },
  {
    "name": "Kumera",
    "hex": "886221"
  },
  {
    "name": "Suva Gray",
    "hex": "888387"
  },
  {
    "name": "Avocado",
    "hex": "888D65"
  },
  {
    "name": "Camelot",
    "hex": "893456"
  },
  {
    "name": "Solid Pink",
    "hex": "893843"
  },
  {
    "name": "Cannon Pink",
    "hex": "894367"
  },
  {
    "name": "Makara",
    "hex": "897D6D"
  },
  {
    "name": "Burnt Umber",
    "hex": "8A3324"
  },
  {
    "name": "True V",
    "hex": "8A73D6"
  },
  {
    "name": "Clay Creek",
    "hex": "8A8360"
  },
  {
    "name": "Monsoon",
    "hex": "8A8389"
  },
  {
    "name": "Stack",
    "hex": "8A8F8A"
  },
  {
    "name": "Jordy Blue",
    "hex": "8AB9F1"
  },
  {
    "name": "Electric Violet",
    "hex": "8B00FF"
  },
  {
    "name": "Monarch",
    "hex": "8B0723"
  },
  {
    "name": "Corn Harvest",
    "hex": "8B6B0B"
  },
  {
    "name": "Olive Haze",
    "hex": "8B8470"
  },
  {
    "name": "Schooner",
    "hex": "8B847E"
  },
  {
    "name": "Natural Gray",
    "hex": "8B8680"
  },
  {
    "name": "Mantle",
    "hex": "8B9C90"
  },
  {
    "name": "Portage",
    "hex": "8B9FEE"
  },
  {
    "name": "Envy",
    "hex": "8BA690"
  },
  {
    "name": "Cascade",
    "hex": "8BA9A5"
  },
  {
    "name": "Riptide",
    "hex": "8BE6D8"
  },
  {
    "name": "Cardinal Pink",
    "hex": "8C055E"
  },
  {
    "name": "Mule Fawn",
    "hex": "8C472F"
  },
  {
    "name": "Potters Clay",
    "hex": "8C5738"
  },
  {
    "name": "Trendy Pink",
    "hex": "8C6495"
  },
  {
    "name": "Paprika",
    "hex": "8D0226"
  },
  {
    "name": "Sanguine Brown",
    "hex": "8D3D38"
  },
  {
    "name": "Tosca",
    "hex": "8D3F3F"
  },
  {
    "name": "Cement",
    "hex": "8D7662"
  },
  {
    "name": "Granite Green",
    "hex": "8D8974"
  },
  {
    "name": "Manatee",
    "hex": "8D90A1"
  },
  {
    "name": "Polo Blue",
    "hex": "8DA8CC"
  },
  {
    "name": "Red Berry",
    "hex": "8E0000"
  },
  {
    "name": "Rope",
    "hex": "8E4D1E"
  },
  {
    "name": "Opium",
    "hex": "8E6F70"
  },
  {
    "name": "Domino",
    "hex": "8E775E"
  },
  {
    "name": "Mamba",
    "hex": "8E8190"
  },
  {
    "name": "Nepal",
    "hex": "8EABC1"
  },
  {
    "name": "Pohutukawa",
    "hex": "8F021C"
  },
  {
    "name": "El Salva",
    "hex": "8F3E33"
  },
  {
    "name": "Korma",
    "hex": "8F4B0E"
  },
  {
    "name": "Squirrel",
    "hex": "8F8176"
  },
  {
    "name": "Vista Blue",
    "hex": "8FD6B4"
  },
  {
    "name": "Burgundy",
    "hex": "900020"
  },
  {
    "name": "Old Brick",
    "hex": "901E1E"
  },
  {
    "name": "Hemp",
    "hex": "907874"
  },
  {
    "name": "Almond Frost",
    "hex": "907B71"
  },
  {
    "name": "Sycamore",
    "hex": "908D39"
  },
  {
    "name": "Sangria",
    "hex": "92000A"
  },
  {
    "name": "Cumin",
    "hex": "924321"
  },
  {
    "name": "Beaver",
    "hex": "926F5B"
  },
  {
    "name": "Stonewall",
    "hex": "928573"
  },
  {
    "name": "Venus",
    "hex": "928590"
  },
  {
    "name": "Medium Purple",
    "hex": "9370DB"
  },
  {
    "name": "Cornflower",
    "hex": "93CCEA"
  },
  {
    "name": "Algae Green",
    "hex": "93DFB8"
  },
  {
    "name": "Copper Rust",
    "hex": "944747"
  },
  {
    "name": "Arrowtown",
    "hex": "948771"
  },
  {
    "name": "Scarlett",
    "hex": "950015"
  },
  {
    "name": "Strikemaster",
    "hex": "956387"
  },
  {
    "name": "Mountain Mist",
    "hex": "959396"
  },
  {
    "name": "Carmine",
    "hex": "960018"
  },
  {
    "name": "Brown",
    "hex": "964B00"
  },
  {
    "name": "Leather",
    "hex": "967059"
  },
  {
    "name": "Purple Mountain's Majesty",
    "hex": "9678B6"
  },
  {
    "name": "Lavender Purple",
    "hex": "967BB6"
  },
  {
    "name": "Pewter",
    "hex": "96A8A1"
  },
  {
    "name": "Summer Green",
    "hex": "96BBAB"
  },
  {
    "name": "Au Chico",
    "hex": "97605D"
  },
  {
    "name": "Wisteria",
    "hex": "9771B5"
  },
  {
    "name": "Atlantis",
    "hex": "97CD2D"
  },
  {
    "name": "Vin Rouge",
    "hex": "983D61"
  },
  {
    "name": "Lilac Bush",
    "hex": "9874D3"
  },
  {
    "name": "Bazaar",
    "hex": "98777B"
  },
  {
    "name": "Hacienda",
    "hex": "98811B"
  },
  {
    "name": "Pale Oyster",
    "hex": "988D77"
  },
  {
    "name": "Mint Green",
    "hex": "98FF98"
  },
  {
    "name": "Fresh Eggplant",
    "hex": "990066"
  },
  {
    "name": "Violet Eggplant",
    "hex": "991199"
  },
  {
    "name": "Tamarillo",
    "hex": "991613"
  },
  {
    "name": "Totem Pole",
    "hex": "991B07"
  },
  {
    "name": "Copper Rose",
    "hex": "996666"
  },
  {
    "name": "Amethyst",
    "hex": "9966CC"
  },
  {
    "name": "Mountbatten Pink",
    "hex": "997A8D"
  },
  {
    "name": "Blue Bell",
    "hex": "9999CC"
  },
  {
    "name": "Prairie Sand",
    "hex": "9A3820"
  },
  {
    "name": "Toast",
    "hex": "9A6E61"
  },
  {
    "name": "Gurkha",
    "hex": "9A9577"
  },
  {
    "name": "Olivine",
    "hex": "9AB973"
  },
  {
    "name": "Shadow Green",
    "hex": "9AC2B8"
  },
  {
    "name": "Oregon",
    "hex": "9B4703"
  },
  {
    "name": "Lemon Grass",
    "hex": "9B9E8F"
  },
  {
    "name": "Stiletto",
    "hex": "9C3336"
  },
  {
    "name": "Hawaiian Tan",
    "hex": "9D5616"
  },
  {
    "name": "Gull Gray",
    "hex": "9DACB7"
  },
  {
    "name": "Pistachio",
    "hex": "9DC209"
  },
  {
    "name": "Granny Smith Apple",
    "hex": "9DE093"
  },
  {
    "name": "Anakiwa",
    "hex": "9DE5FF"
  },
  {
    "name": "Chelsea Gem",
    "hex": "9E5302"
  },
  {
    "name": "Sepia Skin",
    "hex": "9E5B40"
  },
  {
    "name": "Sage",
    "hex": "9EA587"
  },
  {
    "name": "Citron",
    "hex": "9EA91F"
  },
  {
    "name": "Rock Blue",
    "hex": "9EB1CD"
  },
  {
    "name": "Morning Glory",
    "hex": "9EDEE0"
  },
  {
    "name": "Cognac",
    "hex": "9F381D"
  },
  {
    "name": "Reef Gold",
    "hex": "9F821C"
  },
  {
    "name": "Star Dust",
    "hex": "9F9F9C"
  },
  {
    "name": "Santas Gray",
    "hex": "9FA0B1"
  },
  {
    "name": "Sinbad",
    "hex": "9FD7D3"
  },
  {
    "name": "Feijoa",
    "hex": "9FDD8C"
  },
  {
    "name": "Tabasco",
    "hex": "A02712"
  },
  {
    "name": "Buttered Rum",
    "hex": "A1750D"
  },
  {
    "name": "Hit Gray",
    "hex": "A1ADB5"
  },
  {
    "name": "Citrus",
    "hex": "A1C50A"
  },
  {
    "name": "Aqua Island",
    "hex": "A1DAD7"
  },
  {
    "name": "Water Leaf",
    "hex": "A1E9DE"
  },
  {
    "name": "Flirt",
    "hex": "A2006D"
  },
  {
    "name": "Rouge",
    "hex": "A23B6C"
  },
  {
    "name": "Cape Palliser",
    "hex": "A26645"
  },
  {
    "name": "Gray Chateau",
    "hex": "A2AAB3"
  },
  {
    "name": "Edward",
    "hex": "A2AEAB"
  },
  {
    "name": "Pharlap",
    "hex": "A3807B"
  },
  {
    "name": "Amethyst Smoke",
    "hex": "A397B4"
  },
  {
    "name": "Blizzard Blue",
    "hex": "A3E3ED"
  },
  {
    "name": "Delta",
    "hex": "A4A49D"
  },
  {
    "name": "Wistful",
    "hex": "A4A6D3"
  },
  {
    "name": "Green Smoke",
    "hex": "A4AF6E"
  },
  {
    "name": "Jazzberry Jam",
    "hex": "A50B5E"
  },
  {
    "name": "Zorba",
    "hex": "A59B91"
  },
  {
    "name": "Bahia",
    "hex": "A5CB0C"
  },
  {
    "name": "Roof Terracotta",
    "hex": "A62F20"
  },
  {
    "name": "Paarl",
    "hex": "A65529"
  },
  {
    "name": "Barley Corn",
    "hex": "A68B5B"
  },
  {
    "name": "Donkey Brown",
    "hex": "A69279"
  },
  {
    "name": "Dawn",
    "hex": "A6A29A"
  },
  {
    "name": "Mexican Red",
    "hex": "A72525"
  },
  {
    "name": "Luxor Gold",
    "hex": "A7882C"
  },
  {
    "name": "Rich Gold",
    "hex": "A85307"
  },
  {
    "name": "Reno Sand",
    "hex": "A86515"
  },
  {
    "name": "Coral Tree",
    "hex": "A86B6B"
  },
  {
    "name": "Dusty Gray",
    "hex": "A8989B"
  },
  {
    "name": "Dull Lavender",
    "hex": "A899E6"
  },
  {
    "name": "Tallow",
    "hex": "A8A589"
  },
  {
    "name": "Bud",
    "hex": "A8AE9C"
  },
  {
    "name": "Locust",
    "hex": "A8AF8E"
  },
  {
    "name": "Norway",
    "hex": "A8BD9F"
  },
  {
    "name": "Chinook",
    "hex": "A8E3BD"
  },
  {
    "name": "Gray Olive",
    "hex": "A9A491"
  },
  {
    "name": "Aluminium",
    "hex": "A9ACB6"
  },
  {
    "name": "Cadet Blue",
    "hex": "A9B2C3"
  },
  {
    "name": "Schist",
    "hex": "A9B497"
  },
  {
    "name": "Tower Gray",
    "hex": "A9BDBF"
  },
  {
    "name": "Perano",
    "hex": "A9BEF2"
  },
  {
    "name": "Opal",
    "hex": "A9C6C2"
  },
  {
    "name": "Night Shadz",
    "hex": "AA375A"
  },
  {
    "name": "Fire",
    "hex": "AA4203"
  },
  {
    "name": "Muesli",
    "hex": "AA8B5B"
  },
  {
    "name": "Sandal",
    "hex": "AA8D6F"
  },
  {
    "name": "Shady Lady",
    "hex": "AAA5A9"
  },
  {
    "name": "Logan",
    "hex": "AAA9CD"
  },
  {
    "name": "Spun Pearl",
    "hex": "AAABB7"
  },
  {
    "name": "Regent St Blue",
    "hex": "AAD6E6"
  },
  {
    "name": "Magic Mint",
    "hex": "AAF0D1"
  },
  {
    "name": "Lipstick",
    "hex": "AB0563"
  },
  {
    "name": "Royal Heath",
    "hex": "AB3472"
  },
  {
    "name": "Sandrift",
    "hex": "AB917A"
  },
  {
    "name": "Cold Purple",
    "hex": "ABA0D9"
  },
  {
    "name": "Bronco",
    "hex": "ABA196"
  },
  {
    "name": "Limed Oak",
    "hex": "AC8A56"
  },
  {
    "name": "East Side",
    "hex": "AC91CE"
  },
  {
    "name": "Lemon Ginger",
    "hex": "AC9E22"
  },
  {
    "name": "Napa",
    "hex": "ACA494"
  },
  {
    "name": "Hillary",
    "hex": "ACA586"
  },
  {
    "name": "Cloudy",
    "hex": "ACA59F"
  },
  {
    "name": "Silver Chalice",
    "hex": "ACACAC"
  },
  {
    "name": "Swamp Green",
    "hex": "ACB78E"
  },
  {
    "name": "Spring Rain",
    "hex": "ACCBB1"
  },
  {
    "name": "Conifer",
    "hex": "ACDD4D"
  },
  {
    "name": "Celadon",
    "hex": "ACE1AF"
  },
  {
    "name": "Mandalay",
    "hex": "AD781B"
  },
  {
    "name": "Casper",
    "hex": "ADBED1"
  },
  {
    "name": "Moss Green",
    "hex": "ADDFAD"
  },
  {
    "name": "Padua",
    "hex": "ADE6C4"
  },
  {
    "name": "Green Yellow",
    "hex": "ADFF2F"
  },
  {
    "name": "Hippie Pink",
    "hex": "AE4560"
  },
  {
    "name": "Desert",
    "hex": "AE6020"
  },
  {
    "name": "Bouquet",
    "hex": "AE809E"
  },
  {
    "name": "Medium Carmine",
    "hex": "AF4035"
  },
  {
    "name": "Apple Blossom",
    "hex": "AF4D43"
  },
  {
    "name": "Brown Rust",
    "hex": "AF593E"
  },
  {
    "name": "Driftwood",
    "hex": "AF8751"
  },
  {
    "name": "Alpine",
    "hex": "AF8F2C"
  },
  {
    "name": "Lucky",
    "hex": "AF9F1C"
  },
  {
    "name": "Martini",
    "hex": "AFA09E"
  },
  {
    "name": "Bombay",
    "hex": "AFB1B8"
  },
  {
    "name": "Pigeon Post",
    "hex": "AFBDD9"
  },
  {
    "name": "Cadillac",
    "hex": "B04C6A"
  },
  {
    "name": "Matrix",
    "hex": "B05D54"
  },
  {
    "name": "Tapestry",
    "hex": "B05E81"
  },
  {
    "name": "Mai Tai",
    "hex": "B06608"
  },
  {
    "name": "Del Rio",
    "hex": "B09A95"
  },
  {
    "name": "Powder Blue",
    "hex": "B0E0E6"
  },
  {
    "name": "Inch Worm",
    "hex": "B0E313"
  },
  {
    "name": "Bright Red",
    "hex": "B10000"
  },
  {
    "name": "Vesuvius",
    "hex": "B14A0B"
  },
  {
    "name": "Pumpkin Skin",
    "hex": "B1610B"
  },
  {
    "name": "Santa Fe",
    "hex": "B16D52"
  },
  {
    "name": "Teak",
    "hex": "B19461"
  },
  {
    "name": "Fringy Flower",
    "hex": "B1E2C1"
  },
  {
    "name": "Ice Cold",
    "hex": "B1F4E7"
  },
  {
    "name": "Shiraz",
    "hex": "B20931"
  },
  {
    "name": "Biloba Flower",
    "hex": "B2A1EA"
  },
  {
    "name": "Tall Poppy",
    "hex": "B32D29"
  },
  {
    "name": "Fiery Orange",
    "hex": "B35213"
  },
  {
    "name": "Hot Toddy",
    "hex": "B38007"
  },
  {
    "name": "Taupe Gray",
    "hex": "B3AF95"
  },
  {
    "name": "La Rioja",
    "hex": "B3C110"
  },
  {
    "name": "Well Read",
    "hex": "B43332"
  },
  {
    "name": "Blush",
    "hex": "B44668"
  },
  {
    "name": "Jungle Mist",
    "hex": "B4CFD3"
  },
  {
    "name": "Turkish Rose",
    "hex": "B57281"
  },
  {
    "name": "Lavender",
    "hex": "B57EDC"
  },
  {
    "name": "Mongoose",
    "hex": "B5A27F"
  },
  {
    "name": "Olive Green",
    "hex": "B5B35C"
  },
  {
    "name": "Jet Stream",
    "hex": "B5D2CE"
  },
  {
    "name": "Cruise",
    "hex": "B5ECDF"
  },
  {
    "name": "Hibiscus",
    "hex": "B6316C"
  },
  {
    "name": "Thatch",
    "hex": "B69D98"
  },
  {
    "name": "Heathered Gray",
    "hex": "B6B095"
  },
  {
    "name": "Eagle",
    "hex": "B6BAA4"
  },
  {
    "name": "Spindle",
    "hex": "B6D1EA"
  },
  {
    "name": "Gum Leaf",
    "hex": "B6D3BF"
  },
  {
    "name": "Rust",
    "hex": "B7410E"
  },
  {
    "name": "Muddy Waters",
    "hex": "B78E5C"
  },
  {
    "name": "Sahara",
    "hex": "B7A214"
  },
  {
    "name": "Husk",
    "hex": "B7A458"
  },
  {
    "name": "Nobel",
    "hex": "B7B1B1"
  },
  {
    "name": "Heather",
    "hex": "B7C3D0"
  },
  {
    "name": "Madang",
    "hex": "B7F0BE"
  },
  {
    "name": "Milano Red",
    "hex": "B81104"
  },
  {
    "name": "Copper",
    "hex": "B87333"
  },
  {
    "name": "Gimblet",
    "hex": "B8B56A"
  },
  {
    "name": "Green Spring",
    "hex": "B8C1B1"
  },
  {
    "name": "Celery",
    "hex": "B8C25D"
  },
  {
    "name": "Sail",
    "hex": "B8E0F9"
  },
  {
    "name": "Chestnut",
    "hex": "B94E48"
  },
  {
    "name": "Crail",
    "hex": "B95140"
  },
  {
    "name": "Marigold",
    "hex": "B98D28"
  },
  {
    "name": "Wild Willow",
    "hex": "B9C46A"
  },
  {
    "name": "Rainee",
    "hex": "B9C8AC"
  },
  {
    "name": "Guardsman Red",
    "hex": "BA0101"
  },
  {
    "name": "Rock Spray",
    "hex": "BA450C"
  },
  {
    "name": "Bourbon",
    "hex": "BA6F1E"
  },
  {
    "name": "Pirate Gold",
    "hex": "BA7F03"
  },
  {
    "name": "Nomad",
    "hex": "BAB1A2"
  },
  {
    "name": "Submarine",
    "hex": "BAC7C9"
  },
  {
    "name": "Charlotte",
    "hex": "BAEEF9"
  },
  {
    "name": "Medium Red Violet",
    "hex": "BB3385"
  },
  {
    "name": "Brandy Rose",
    "hex": "BB8983"
  },
  {
    "name": "Rio Grande",
    "hex": "BBD009"
  },
  {
    "name": "Surf",
    "hex": "BBD7C1"
  },
  {
    "name": "Powder Ash",
    "hex": "BCC9C2"
  },
  {
    "name": "Tuscany",
    "hex": "BD5E2E"
  },
  {
    "name": "Quicksand",
    "hex": "BD978E"
  },
  {
    "name": "Silk",
    "hex": "BDB1A8"
  },
  {
    "name": "Malta",
    "hex": "BDB2A1"
  },
  {
    "name": "Chatelle",
    "hex": "BDB3C7"
  },
  {
    "name": "Lavender Gray",
    "hex": "BDBBD7"
  },
  {
    "name": "French Gray",
    "hex": "BDBDC6"
  },
  {
    "name": "Clay Ash",
    "hex": "BDC8B3"
  },
  {
    "name": "Loblolly",
    "hex": "BDC9CE"
  },
  {
    "name": "French Pass",
    "hex": "BDEDFD"
  },
  {
    "name": "London Hue",
    "hex": "BEA6C3"
  },
  {
    "name": "Pink Swan",
    "hex": "BEB5B7"
  },
  {
    "name": "Fuego",
    "hex": "BEDE0D"
  },
  {
    "name": "Rose of Sharon",
    "hex": "BF5500"
  },
  {
    "name": "Tide",
    "hex": "BFB8B0"
  },
  {
    "name": "Blue Haze",
    "hex": "BFBED8"
  },
  {
    "name": "Silver Sand",
    "hex": "BFC1C2"
  },
  {
    "name": "Key Lime Pie",
    "hex": "BFC921"
  },
  {
    "name": "Ziggurat",
    "hex": "BFDBE2"
  },
  {
    "name": "Lime",
    "hex": "BFFF00"
  },
  {
    "name": "Thunderbird",
    "hex": "C02B18"
  },
  {
    "name": "Mojo",
    "hex": "C04737"
  },
  {
    "name": "Old Rose",
    "hex": "C08081"
  },
  {
    "name": "Silver",
    "hex": "C0C0C0"
  },
  {
    "name": "Pale Leaf",
    "hex": "C0D3B9"
  },
  {
    "name": "Pixie Green",
    "hex": "C0D8B6"
  },
  {
    "name": "Tia Maria",
    "hex": "C1440E"
  },
  {
    "name": "Fuchsia Pink",
    "hex": "C154C1"
  },
  {
    "name": "Buddha Gold",
    "hex": "C1A004"
  },
  {
    "name": "Bison Hide",
    "hex": "C1B7A4"
  },
  {
    "name": "Tea",
    "hex": "C1BAB0"
  },
  {
    "name": "Gray Suit",
    "hex": "C1BECD"
  },
  {
    "name": "Sprout",
    "hex": "C1D7B0"
  },
  {
    "name": "Sulu",
    "hex": "C1F07C"
  },
  {
    "name": "Indochine",
    "hex": "C26B03"
  },
  {
    "name": "Twine",
    "hex": "C2955D"
  },
  {
    "name": "Cotton Seed",
    "hex": "C2BDB6"
  },
  {
    "name": "Pumice",
    "hex": "C2CAC4"
  },
  {
    "name": "Jagged Ice",
    "hex": "C2E8E5"
  },
  {
    "name": "Maroon Flush",
    "hex": "C32148"
  },
  {
    "name": "Indian Khaki",
    "hex": "C3B091"
  },
  {
    "name": "Pale Slate",
    "hex": "C3BFC1"
  },
  {
    "name": "Gray Nickel",
    "hex": "C3C3BD"
  },
  {
    "name": "Periwinkle Gray",
    "hex": "C3CDE6"
  },
  {
    "name": "Tiara",
    "hex": "C3D1D1"
  },
  {
    "name": "Tropical Blue",
    "hex": "C3DDF9"
  },
  {
    "name": "Cardinal",
    "hex": "C41E3A"
  },
  {
    "name": "Fuzzy Wuzzy Brown",
    "hex": "C45655"
  },
  {
    "name": "Orange Roughy",
    "hex": "C45719"
  },
  {
    "name": "Mist Gray",
    "hex": "C4C4BC"
  },
  {
    "name": "Coriander",
    "hex": "C4D0B0"
  },
  {
    "name": "Mint Tulip",
    "hex": "C4F4EB"
  },
  {
    "name": "Mulberry",
    "hex": "C54B8C"
  },
  {
    "name": "Nugget",
    "hex": "C59922"
  },
  {
    "name": "Tussock",
    "hex": "C5994B"
  },
  {
    "name": "Sea Mist",
    "hex": "C5DBCA"
  },
  {
    "name": "Yellow Green",
    "hex": "C5E17A"
  },
  {
    "name": "Brick Red",
    "hex": "C62D42"
  },
  {
    "name": "Contessa",
    "hex": "C6726B"
  },
  {
    "name": "Oriental Pink",
    "hex": "C69191"
  },
  {
    "name": "Roti",
    "hex": "C6A84B"
  },
  {
    "name": "Ash",
    "hex": "C6C3B5"
  },
  {
    "name": "Kangaroo",
    "hex": "C6C8BD"
  },
  {
    "name": "Las Palmas",
    "hex": "C6E610"
  },
  {
    "name": "Monza",
    "hex": "C7031E"
  },
  {
    "name": "Red Violet",
    "hex": "C71585"
  },
  {
    "name": "Coral Reef",
    "hex": "C7BCA2"
  },
  {
    "name": "Melrose",
    "hex": "C7C1FF"
  },
  {
    "name": "Cloud",
    "hex": "C7C4BF"
  },
  {
    "name": "Ghost",
    "hex": "C7C9D5"
  },
  {
    "name": "Pine Glade",
    "hex": "C7CD90"
  },
  {
    "name": "Botticelli",
    "hex": "C7DDE5"
  },
  {
    "name": "Antique Brass",
    "hex": "C88A65"
  },
  {
    "name": "Lilac",
    "hex": "C8A2C8"
  },
  {
    "name": "Hokey Pokey",
    "hex": "C8A528"
  },
  {
    "name": "Lily",
    "hex": "C8AABF"
  },
  {
    "name": "Laser",
    "hex": "C8B568"
  },
  {
    "name": "Edgewater",
    "hex": "C8E3D7"
  },
  {
    "name": "Piper",
    "hex": "C96323"
  },
  {
    "name": "Pizza",
    "hex": "C99415"
  },
  {
    "name": "Light Wisteria",
    "hex": "C9A0DC"
  },
  {
    "name": "Rodeo Dust",
    "hex": "C9B29B"
  },
  {
    "name": "Sundance",
    "hex": "C9B35B"
  },
  {
    "name": "Earls Green",
    "hex": "C9B93B"
  },
  {
    "name": "Silver Rust",
    "hex": "C9C0BB"
  },
  {
    "name": "Conch",
    "hex": "C9D9D2"
  },
  {
    "name": "Reef",
    "hex": "C9FFA2"
  },
  {
    "name": "Aero Blue",
    "hex": "C9FFE5"
  },
  {
    "name": "Flush Mahogany",
    "hex": "CA3435"
  },
  {
    "name": "Turmeric",
    "hex": "CABB48"
  },
  {
    "name": "Paris White",
    "hex": "CADCD4"
  },
  {
    "name": "Bitter Lemon",
    "hex": "CAE00D"
  },
  {
    "name": "Skeptic",
    "hex": "CAE6DA"
  },
  {
    "name": "Viola",
    "hex": "CB8FA9"
  },
  {
    "name": "Foggy Gray",
    "hex": "CBCAB6"
  },
  {
    "name": "Green Mist",
    "hex": "CBD3B0"
  },
  {
    "name": "Nebula",
    "hex": "CBDBD6"
  },
  {
    "name": "Persian Red",
    "hex": "CC3333"
  },
  {
    "name": "Burnt Orange",
    "hex": "CC5500"
  },
  {
    "name": "Ochre",
    "hex": "CC7722"
  },
  {
    "name": "Puce",
    "hex": "CC8899"
  },
  {
    "name": "Thistle Green",
    "hex": "CCCAA8"
  },
  {
    "name": "Periwinkle",
    "hex": "CCCCFF"
  },
  {
    "name": "Electric Lime",
    "hex": "CCFF00"
  },
  {
    "name": "Tenn",
    "hex": "CD5700"
  },
  {
    "name": "Chestnut Rose",
    "hex": "CD5C5C"
  },
  {
    "name": "Brandy Punch",
    "hex": "CD8429"
  },
  {
    "name": "Onahau",
    "hex": "CDF4FF"
  },
  {
    "name": "Sorrell Brown",
    "hex": "CEB98F"
  },
  {
    "name": "Cold Turkey",
    "hex": "CEBABA"
  },
  {
    "name": "Yuma",
    "hex": "CEC291"
  },
  {
    "name": "Chino",
    "hex": "CEC7A7"
  },
  {
    "name": "Eunry",
    "hex": "CFA39D"
  },
  {
    "name": "Old Gold",
    "hex": "CFB53B"
  },
  {
    "name": "Tasman",
    "hex": "CFDCCF"
  },
  {
    "name": "Surf Crest",
    "hex": "CFE5D2"
  },
  {
    "name": "Humming Bird",
    "hex": "CFF9F3"
  },
  {
    "name": "Scandal",
    "hex": "CFFAF4"
  },
  {
    "name": "Red Stage",
    "hex": "D05F04"
  },
  {
    "name": "Hopbush",
    "hex": "D06DA1"
  },
  {
    "name": "Meteor",
    "hex": "D07D12"
  },
  {
    "name": "Perfume",
    "hex": "D0BEF8"
  },
  {
    "name": "Prelude",
    "hex": "D0C0E5"
  },
  {
    "name": "Tea Green",
    "hex": "D0F0C0"
  },
  {
    "name": "Geebung",
    "hex": "D18F1B"
  },
  {
    "name": "Vanilla",
    "hex": "D1BEA8"
  },
  {
    "name": "Soft Amber",
    "hex": "D1C6B4"
  },
  {
    "name": "Celeste",
    "hex": "D1D2CA"
  },
  {
    "name": "Mischka",
    "hex": "D1D2DD"
  },
  {
    "name": "Pear",
    "hex": "D1E231"
  },
  {
    "name": "Hot Cinnamon",
    "hex": "D2691E"
  },
  {
    "name": "Raw Sienna",
    "hex": "D27D46"
  },
  {
    "name": "Careys Pink",
    "hex": "D29EAA"
  },
  {
    "name": "Tan",
    "hex": "D2B48C"
  },
  {
    "name": "Deco",
    "hex": "D2DA97"
  },
  {
    "name": "Blue Romance",
    "hex": "D2F6DE"
  },
  {
    "name": "Gossip",
    "hex": "D2F8B0"
  },
  {
    "name": "Sisal",
    "hex": "D3CBBA"
  },
  {
    "name": "Swirl",
    "hex": "D3CDC5"
  },
  {
    "name": "Charm",
    "hex": "D47494"
  },
  {
    "name": "Clam Shell",
    "hex": "D4B6AF"
  },
  {
    "name": "Straw",
    "hex": "D4BF8D"
  },
  {
    "name": "Akaroa",
    "hex": "D4C4A8"
  },
  {
    "name": "Bird Flower",
    "hex": "D4CD16"
  },
  {
    "name": "Iron",
    "hex": "D4D7D9"
  },
  {
    "name": "Geyser",
    "hex": "D4DFE2"
  },
  {
    "name": "Hawkes Blue",
    "hex": "D4E2FC"
  },
  {
    "name": "Grenadier",
    "hex": "D54600"
  },
  {
    "name": "Can Can",
    "hex": "D591A4"
  },
  {
    "name": "Whiskey",
    "hex": "D59A6F"
  },
  {
    "name": "Winter Hazel",
    "hex": "D5D195"
  },
  {
    "name": "Granny Apple",
    "hex": "D5F6E3"
  },
  {
    "name": "My Pink",
    "hex": "D69188"
  },
  {
    "name": "Tacha",
    "hex": "D6C562"
  },
  {
    "name": "Moon Raker",
    "hex": "D6CEF6"
  },
  {
    "name": "Quill Gray",
    "hex": "D6D6D1"
  },
  {
    "name": "Snowy Mint",
    "hex": "D6FFDB"
  },
  {
    "name": "New York Pink",
    "hex": "D7837F"
  },
  {
    "name": "Pavlova",
    "hex": "D7C498"
  },
  {
    "name": "Fog",
    "hex": "D7D0FF"
  },
  {
    "name": "Valencia",
    "hex": "D84437"
  },
  {
    "name": "Japonica",
    "hex": "D87C63"
  },
  {
    "name": "Thistle",
    "hex": "D8BFD8"
  },
  {
    "name": "Maverick",
    "hex": "D8C2D5"
  },
  {
    "name": "Foam",
    "hex": "D8FCFA"
  },
  {
    "name": "Cabaret",
    "hex": "D94972"
  },
  {
    "name": "Burning Sand",
    "hex": "D99376"
  },
  {
    "name": "Cameo",
    "hex": "D9B99B"
  },
  {
    "name": "Timberwolf",
    "hex": "D9D6CF"
  },
  {
    "name": "Tana",
    "hex": "D9DCC1"
  },
  {
    "name": "Link Water",
    "hex": "D9E4F5"
  },
  {
    "name": "Mabel",
    "hex": "D9F7FF"
  },
  {
    "name": "Cerise",
    "hex": "DA3287"
  },
  {
    "name": "Flame Pea",
    "hex": "DA5B38"
  },
  {
    "name": "Bamboo",
    "hex": "DA6304"
  },
  {
    "name": "Red Damask",
    "hex": "DA6A41"
  },
  {
    "name": "Orchid",
    "hex": "DA70D6"
  },
  {
    "name": "Copperfield",
    "hex": "DA8A67"
  },
  {
    "name": "Golden Grass",
    "hex": "DAA520"
  },
  {
    "name": "Zanah",
    "hex": "DAECD6"
  },
  {
    "name": "Iceberg",
    "hex": "DAF4F0"
  },
  {
    "name": "Oyster Bay",
    "hex": "DAFAFF"
  },
  {
    "name": "Cranberry",
    "hex": "DB5079"
  },
  {
    "name": "Petite Orchid",
    "hex": "DB9690"
  },
  {
    "name": "Di Serria",
    "hex": "DB995E"
  },
  {
    "name": "Alto",
    "hex": "DBDBDB"
  },
  {
    "name": "Frosted Mint",
    "hex": "DBFFF8"
  },
  {
    "name": "Crimson",
    "hex": "DC143C"
  },
  {
    "name": "Punch",
    "hex": "DC4333"
  },
  {
    "name": "Galliano",
    "hex": "DCB20C"
  },
  {
    "name": "Blossom",
    "hex": "DCB4BC"
  },
  {
    "name": "Wattle",
    "hex": "DCD747"
  },
  {
    "name": "Westar",
    "hex": "DCD9D2"
  },
  {
    "name": "Moon Mist",
    "hex": "DCDDCC"
  },
  {
    "name": "Caper",
    "hex": "DCEDB4"
  },
  {
    "name": "Swans Down",
    "hex": "DCF0EA"
  },
  {
    "name": "Swiss Coffee",
    "hex": "DDD6D5"
  },
  {
    "name": "White Ice",
    "hex": "DDF9F1"
  },
  {
    "name": "Cerise Red",
    "hex": "DE3163"
  },
  {
    "name": "Roman",
    "hex": "DE6360"
  },
  {
    "name": "Tumbleweed",
    "hex": "DEA681"
  },
  {
    "name": "Gold Tips",
    "hex": "DEBA13"
  },
  {
    "name": "Brandy",
    "hex": "DEC196"
  },
  {
    "name": "Wafer",
    "hex": "DECBC6"
  },
  {
    "name": "Sapling",
    "hex": "DED4A4"
  },
  {
    "name": "Barberry",
    "hex": "DED717"
  },
  {
    "name": "Beryl Green",
    "hex": "DEE5C0"
  },
  {
    "name": "Pattens Blue",
    "hex": "DEF5FF"
  },
  {
    "name": "Heliotrope",
    "hex": "DF73FF"
  },
  {
    "name": "Apache",
    "hex": "DFBE6F"
  },
  {
    "name": "Chenin",
    "hex": "DFCD6F"
  },
  {
    "name": "Lola",
    "hex": "DFCFDB"
  },
  {
    "name": "Willow Brook",
    "hex": "DFECDA"
  },
  {
    "name": "Chartreuse Yellow",
    "hex": "DFFF00"
  },
  {
    "name": "Mauve",
    "hex": "E0B0FF"
  },
  {
    "name": "Anzac",
    "hex": "E0B646"
  },
  {
    "name": "Harvest Gold",
    "hex": "E0B974"
  },
  {
    "name": "Calico",
    "hex": "E0C095"
  },
  {
    "name": "Baby Blue",
    "hex": "E0FFFF"
  },
  {
    "name": "Sunglo",
    "hex": "E16865"
  },
  {
    "name": "Equator",
    "hex": "E1BC64"
  },
  {
    "name": "Pink Flare",
    "hex": "E1C0C8"
  },
  {
    "name": "Periglacial Blue",
    "hex": "E1E6D6"
  },
  {
    "name": "Kidnapper",
    "hex": "E1EAD4"
  },
  {
    "name": "Tara",
    "hex": "E1F6E8"
  },
  {
    "name": "Mandy",
    "hex": "E25465"
  },
  {
    "name": "Terracotta",
    "hex": "E2725B"
  },
  {
    "name": "Golden Bell",
    "hex": "E28913"
  },
  {
    "name": "Shocking",
    "hex": "E292C0"
  },
  {
    "name": "Dixie",
    "hex": "E29418"
  },
  {
    "name": "Light Orchid",
    "hex": "E29CD2"
  },
  {
    "name": "Snuff",
    "hex": "E2D8ED"
  },
  {
    "name": "Mystic",
    "hex": "E2EBED"
  },
  {
    "name": "Apple Green",
    "hex": "E2F3EC"
  },
  {
    "name": "Razzmatazz",
    "hex": "E30B5C"
  },
  {
    "name": "Alizarin Crimson",
    "hex": "E32636"
  },
  {
    "name": "Cinnabar",
    "hex": "E34234"
  },
  {
    "name": "Cavern Pink",
    "hex": "E3BEBE"
  },
  {
    "name": "Peppermint",
    "hex": "E3F5E1"
  },
  {
    "name": "Mindaro",
    "hex": "E3F988"
  },
  {
    "name": "Deep Blush",
    "hex": "E47698"
  },
  {
    "name": "Gamboge",
    "hex": "E49B0F"
  },
  {
    "name": "Melanie",
    "hex": "E4C2D5"
  },
  {
    "name": "Twilight",
    "hex": "E4CFDE"
  },
  {
    "name": "Bone",
    "hex": "E4D1C0"
  },
  {
    "name": "Sunflower",
    "hex": "E4D422"
  },
  {
    "name": "Grain Brown",
    "hex": "E4D5B7"
  },
  {
    "name": "Zombie",
    "hex": "E4D69B"
  },
  {
    "name": "Frostee",
    "hex": "E4F6E7"
  },
  {
    "name": "Snow Flurry",
    "hex": "E4FFD1"
  },
  {
    "name": "Amaranth",
    "hex": "E52B50"
  },
  {
    "name": "Zest",
    "hex": "E5841B"
  },
  {
    "name": "Dust Storm",
    "hex": "E5CCC9"
  },
  {
    "name": "Stark White",
    "hex": "E5D7BD"
  },
  {
    "name": "Hampton",
    "hex": "E5D8AF"
  },
  {
    "name": "Bon Jour",
    "hex": "E5E0E1"
  },
  {
    "name": "Mercury",
    "hex": "E5E5E5"
  },
  {
    "name": "Polar",
    "hex": "E5F9F6"
  },
  {
    "name": "Trinidad",
    "hex": "E64E03"
  },
  {
    "name": "Gold Sand",
    "hex": "E6BE8A"
  },
  {
    "name": "Cashmere",
    "hex": "E6BEA5"
  },
  {
    "name": "Double Spanish White",
    "hex": "E6D7B9"
  },
  {
    "name": "Satin Linen",
    "hex": "E6E4D4"
  },
  {
    "name": "Harp",
    "hex": "E6F2EA"
  },
  {
    "name": "Off Green",
    "hex": "E6F8F3"
  },
  {
    "name": "Hint of Green",
    "hex": "E6FFE9"
  },
  {
    "name": "Tranquil",
    "hex": "E6FFFF"
  },
  {
    "name": "Mango Tango",
    "hex": "E77200"
  },
  {
    "name": "Christine",
    "hex": "E7730A"
  },
  {
    "name": "Tonys Pink",
    "hex": "E79F8C"
  },
  {
    "name": "Kobi",
    "hex": "E79FC4"
  },
  {
    "name": "Rose Fog",
    "hex": "E7BCB4"
  },
  {
    "name": "Corn",
    "hex": "E7BF05"
  },
  {
    "name": "Putty",
    "hex": "E7CD8C"
  },
  {
    "name": "Gray Nurse",
    "hex": "E7ECE6"
  },
  {
    "name": "Lily White",
    "hex": "E7F8FF"
  },
  {
    "name": "Bubbles",
    "hex": "E7FEFF"
  },
  {
    "name": "Fire Bush",
    "hex": "E89928"
  },
  {
    "name": "Shilo",
    "hex": "E8B9B3"
  },
  {
    "name": "Pearl Bush",
    "hex": "E8E0D5"
  },
  {
    "name": "Green White",
    "hex": "E8EBE0"
  },
  {
    "name": "Chrome White",
    "hex": "E8F1D4"
  },
  {
    "name": "Gin",
    "hex": "E8F2EB"
  },
  {
    "name": "Aqua Squeeze",
    "hex": "E8F5F2"
  },
  {
    "name": "Clementine",
    "hex": "E96E00"
  },
  {
    "name": "Burnt Sienna",
    "hex": "E97451"
  },
  {
    "name": "Tahiti Gold",
    "hex": "E97C07"
  },
  {
    "name": "Oyster Pink",
    "hex": "E9CECD"
  },
  {
    "name": "Confetti",
    "hex": "E9D75A"
  },
  {
    "name": "Ebb",
    "hex": "E9E3E3"
  },
  {
    "name": "Ottoman",
    "hex": "E9F8ED"
  },
  {
    "name": "Clear Day",
    "hex": "E9FFFD"
  },
  {
    "name": "Carissma",
    "hex": "EA88A8"
  },
  {
    "name": "Porsche",
    "hex": "EAAE69"
  },
  {
    "name": "Tulip Tree",
    "hex": "EAB33B"
  },
  {
    "name": "Rob Roy",
    "hex": "EAC674"
  },
  {
    "name": "Raffia",
    "hex": "EADAB8"
  },
  {
    "name": "White Rock",
    "hex": "EAE8D4"
  },
  {
    "name": "Panache",
    "hex": "EAF6EE"
  },
  {
    "name": "Solitude",
    "hex": "EAF6FF"
  },
  {
    "name": "Aqua Spring",
    "hex": "EAF9F5"
  },
  {
    "name": "Dew",
    "hex": "EAFFFE"
  },
  {
    "name": "Apricot",
    "hex": "EB9373"
  },
  {
    "name": "Zinnwaldite",
    "hex": "EBC2AF"
  },
  {
    "name": "Fuel Yellow",
    "hex": "ECA927"
  },
  {
    "name": "Ronchi",
    "hex": "ECC54E"
  },
  {
    "name": "French Lilac",
    "hex": "ECC7EE"
  },
  {
    "name": "Just Right",
    "hex": "ECCDB9"
  },
  {
    "name": "Wild Rice",
    "hex": "ECE090"
  },
  {
    "name": "Fall Green",
    "hex": "ECEBBD"
  },
  {
    "name": "Aths Special",
    "hex": "ECEBCE"
  },
  {
    "name": "Starship",
    "hex": "ECF245"
  },
  {
    "name": "Red Ribbon",
    "hex": "ED0A3F"
  },
  {
    "name": "Tango",
    "hex": "ED7A1C"
  },
  {
    "name": "Carrot Orange",
    "hex": "ED9121"
  },
  {
    "name": "Sea Pink",
    "hex": "ED989E"
  },
  {
    "name": "Tacao",
    "hex": "EDB381"
  },
  {
    "name": "Desert Sand",
    "hex": "EDC9AF"
  },
  {
    "name": "Pancho",
    "hex": "EDCDAB"
  },
  {
    "name": "Chamois",
    "hex": "EDDCB1"
  },
  {
    "name": "Primrose",
    "hex": "EDEA99"
  },
  {
    "name": "Frost",
    "hex": "EDF5DD"
  },
  {
    "name": "Aqua Haze",
    "hex": "EDF5F5"
  },
  {
    "name": "Zumthor",
    "hex": "EDF6FF"
  },
  {
    "name": "Narvik",
    "hex": "EDF9F1"
  },
  {
    "name": "Honeysuckle",
    "hex": "EDFC84"
  },
  {
    "name": "Lavender Magenta",
    "hex": "EE82EE"
  },
  {
    "name": "Beauty Bush",
    "hex": "EEC1BE"
  },
  {
    "name": "Chalky",
    "hex": "EED794"
  },
  {
    "name": "Almond",
    "hex": "EED9C4"
  },
  {
    "name": "Flax",
    "hex": "EEDC82"
  },
  {
    "name": "Bizarre",
    "hex": "EEDEDA"
  },
  {
    "name": "Double Colonial White",
    "hex": "EEE3AD"
  },
  {
    "name": "Cararra",
    "hex": "EEEEE8"
  },
  {
    "name": "Manz",
    "hex": "EEEF78"
  },
  {
    "name": "Tahuna Sands",
    "hex": "EEF0C8"
  },
  {
    "name": "Athens Gray",
    "hex": "EEF0F3"
  },
  {
    "name": "Tusk",
    "hex": "EEF3C3"
  },
  {
    "name": "Loafer",
    "hex": "EEF4DE"
  },
  {
    "name": "Catskill White",
    "hex": "EEF6F7"
  },
  {
    "name": "Twilight Blue",
    "hex": "EEFDFF"
  },
  {
    "name": "Jonquil",
    "hex": "EEFF9A"
  },
  {
    "name": "Rice Flower",
    "hex": "EEFFE2"
  },
  {
    "name": "Jaffa",
    "hex": "EF863F"
  },
  {
    "name": "Gallery",
    "hex": "EFEFEF"
  },
  {
    "name": "Porcelain",
    "hex": "EFF2F3"
  },
  {
    "name": "Mauvelous",
    "hex": "F091A9"
  },
  {
    "name": "Golden Dream",
    "hex": "F0D52D"
  },
  {
    "name": "Golden Sand",
    "hex": "F0DB7D"
  },
  {
    "name": "Buff",
    "hex": "F0DC82"
  },
  {
    "name": "Prim",
    "hex": "F0E2EC"
  },
  {
    "name": "Khaki",
    "hex": "F0E68C"
  },
  {
    "name": "Selago",
    "hex": "F0EEFD"
  },
  {
    "name": "Titan White",
    "hex": "F0EEFF"
  },
  {
    "name": "Alice Blue",
    "hex": "F0F8FF"
  },
  {
    "name": "Feta",
    "hex": "F0FCEA"
  },
  {
    "name": "Gold Drop",
    "hex": "F18200"
  },
  {
    "name": "Wewak",
    "hex": "F19BAB"
  },
  {
    "name": "Sahara Sand",
    "hex": "F1E788"
  },
  {
    "name": "Parchment",
    "hex": "F1E9D2"
  },
  {
    "name": "Blue Chalk",
    "hex": "F1E9FF"
  },
  {
    "name": "Mint Julep",
    "hex": "F1EEC1"
  },
  {
    "name": "Seashell",
    "hex": "F1F1F1"
  },
  {
    "name": "Saltpan",
    "hex": "F1F7F2"
  },
  {
    "name": "Tidal",
    "hex": "F1FFAD"
  },
  {
    "name": "Chiffon",
    "hex": "F1FFC8"
  },
  {
    "name": "Flamingo",
    "hex": "F2552A"
  },
  {
    "name": "Tangerine",
    "hex": "F28500"
  },
  {
    "name": "Mandys Pink",
    "hex": "F2C3B2"
  },
  {
    "name": "Concrete",
    "hex": "F2F2F2"
  },
  {
    "name": "Black Squeeze",
    "hex": "F2FAFA"
  },
  {
    "name": "Pomegranate",
    "hex": "F34723"
  },
  {
    "name": "Buttercup",
    "hex": "F3AD16"
  },
  {
    "name": "New Orleans",
    "hex": "F3D69D"
  },
  {
    "name": "Vanilla Ice",
    "hex": "F3D9DF"
  },
  {
    "name": "Sidecar",
    "hex": "F3E7BB"
  },
  {
    "name": "Dawn Pink",
    "hex": "F3E9E5"
  },
  {
    "name": "Wheatfield",
    "hex": "F3EDCF"
  },
  {
    "name": "Canary",
    "hex": "F3FB62"
  },
  {
    "name": "Orinoco",
    "hex": "F3FBD4"
  },
  {
    "name": "Carla",
    "hex": "F3FFD8"
  },
  {
    "name": "Hollywood Cerise",
    "hex": "F400A1"
  },
  {
    "name": "Sandy brown",
    "hex": "F4A460"
  },
  {
    "name": "Saffron",
    "hex": "F4C430"
  },
  {
    "name": "Ripe Lemon",
    "hex": "F4D81C"
  },
  {
    "name": "Janna",
    "hex": "F4EBD3"
  },
  {
    "name": "Pampas",
    "hex": "F4F2EE"
  },
  {
    "name": "Wild Sand",
    "hex": "F4F4F4"
  },
  {
    "name": "Zircon",
    "hex": "F4F8FF"
  },
  {
    "name": "Froly",
    "hex": "F57584"
  },
  {
    "name": "Cream Can",
    "hex": "F5C85C"
  },
  {
    "name": "Manhattan",
    "hex": "F5C999"
  },
  {
    "name": "Maize",
    "hex": "F5D5A0"
  },
  {
    "name": "Wheat",
    "hex": "F5DEB3"
  },
  {
    "name": "Sandwisp",
    "hex": "F5E7A2"
  },
  {
    "name": "Pot Pourri",
    "hex": "F5E7E2"
  },
  {
    "name": "Albescent White",
    "hex": "F5E9D3"
  },
  {
    "name": "Soft Peach",
    "hex": "F5EDEF"
  },
  {
    "name": "Ecru White",
    "hex": "F5F3E5"
  },
  {
    "name": "Beige",
    "hex": "F5F5DC"
  },
  {
    "name": "Golden Fizz",
    "hex": "F5FB3D"
  },
  {
    "name": "Australian Mint",
    "hex": "F5FFBE"
  },
  {
    "name": "French Rose",
    "hex": "F64A8A"
  },
  {
    "name": "Brilliant Rose",
    "hex": "F653A6"
  },
  {
    "name": "Illusion",
    "hex": "F6A4C9"
  },
  {
    "name": "Merino",
    "hex": "F6F0E6"
  },
  {
    "name": "Black Haze",
    "hex": "F6F7F7"
  },
  {
    "name": "Spring Sun",
    "hex": "F6FFDC"
  },
  {
    "name": "Violet Red",
    "hex": "F7468A"
  },
  {
    "name": "Chilean Fire",
    "hex": "F77703"
  },
  {
    "name": "Persian Pink",
    "hex": "F77FBE"
  },
  {
    "name": "Rajah",
    "hex": "F7B668"
  },
  {
    "name": "Azalea",
    "hex": "F7C8DA"
  },
  {
    "name": "We Peep",
    "hex": "F7DBE6"
  },
  {
    "name": "Quarter Spanish White",
    "hex": "F7F2E1"
  },
  {
    "name": "Whisper",
    "hex": "F7F5FA"
  },
  {
    "name": "Snow Drift",
    "hex": "F7FAF7"
  },
  {
    "name": "Casablanca",
    "hex": "F8B853"
  },
  {
    "name": "Chantilly",
    "hex": "F8C3DF"
  },
  {
    "name": "Cherub",
    "hex": "F8D9E9"
  },
  {
    "name": "Marzipan",
    "hex": "F8DB9D"
  },
  {
    "name": "Energy Yellow",
    "hex": "F8DD5C"
  },
  {
    "name": "Givry",
    "hex": "F8E4BF"
  },
  {
    "name": "White Linen",
    "hex": "F8F0E8"
  },
  {
    "name": "Magnolia",
    "hex": "F8F4FF"
  },
  {
    "name": "Spring Wood",
    "hex": "F8F6F1"
  },
  {
    "name": "Coconut Cream",
    "hex": "F8F7DC"
  },
  {
    "name": "White Lilac",
    "hex": "F8F7FC"
  },
  {
    "name": "Desert Storm",
    "hex": "F8F8F7"
  },
  {
    "name": "Texas",
    "hex": "F8F99C"
  },
  {
    "name": "Corn Field",
    "hex": "F8FACD"
  },
  {
    "name": "Mimosa",
    "hex": "F8FDD3"
  },
  {
    "name": "Carnation",
    "hex": "F95A61"
  },
  {
    "name": "Saffron Mango",
    "hex": "F9BF58"
  },
  {
    "name": "Carousel Pink",
    "hex": "F9E0ED"
  },
  {
    "name": "Dairy Cream",
    "hex": "F9E4BC"
  },
  {
    "name": "Portica",
    "hex": "F9E663"
  },
  {
    "name": "Amour",
    "hex": "F9EAF3"
  },
  {
    "name": "Rum Swizzle",
    "hex": "F9F8E4"
  },
  {
    "name": "Dolly",
    "hex": "F9FF8B"
  },
  {
    "name": "Sugar Cane",
    "hex": "F9FFF6"
  },
  {
    "name": "Ecstasy",
    "hex": "FA7814"
  },
  {
    "name": "Tan Hide",
    "hex": "FA9D5A"
  },
  {
    "name": "Corvette",
    "hex": "FAD3A2"
  },
  {
    "name": "Peach Yellow",
    "hex": "FADFAD"
  },
  {
    "name": "Turbo",
    "hex": "FAE600"
  },
  {
    "name": "Astra",
    "hex": "FAEAB9"
  },
  {
    "name": "Champagne",
    "hex": "FAECCC"
  },
  {
    "name": "Linen",
    "hex": "FAF0E6"
  },
  {
    "name": "Fantasy",
    "hex": "FAF3F0"
  },
  {
    "name": "Citrine White",
    "hex": "FAF7D6"
  },
  {
    "name": "Alabaster",
    "hex": "FAFAFA"
  },
  {
    "name": "Hint of Yellow",
    "hex": "FAFDE4"
  },
  {
    "name": "Milan",
    "hex": "FAFFA4"
  },
  {
    "name": "Brink Pink",
    "hex": "FB607F"
  },
  {
    "name": "Geraldine",
    "hex": "FB8989"
  },
  {
    "name": "Lavender Rose",
    "hex": "FBA0E3"
  },
  {
    "name": "Sea Buckthorn",
    "hex": "FBA129"
  },
  {
    "name": "Sun",
    "hex": "FBAC13"
  },
  {
    "name": "Lavender Pink",
    "hex": "FBAED2"
  },
  {
    "name": "Rose Bud",
    "hex": "FBB2A3"
  },
  {
    "name": "Cupid",
    "hex": "FBBEDA"
  },
  {
    "name": "Classic Rose",
    "hex": "FBCCE7"
  },
  {
    "name": "Apricot Peach",
    "hex": "FBCEB1"
  },
  {
    "name": "Banana Mania",
    "hex": "FBE7B2"
  },
  {
    "name": "Marigold Yellow",
    "hex": "FBE870"
  },
  {
    "name": "Festival",
    "hex": "FBE96C"
  },
  {
    "name": "Sweet Corn",
    "hex": "FBEA8C"
  },
  {
    "name": "Candy Corn",
    "hex": "FBEC5D"
  },
  {
    "name": "Hint of Red",
    "hex": "FBF9F9"
  },
  {
    "name": "Shalimar",
    "hex": "FBFFBA"
  },
  {
    "name": "Shocking Pink",
    "hex": "FC0FC0"
  },
  {
    "name": "Tickle Me Pink",
    "hex": "FC80A5"
  },
  {
    "name": "Tree Poppy",
    "hex": "FC9C1D"
  },
  {
    "name": "Lightning Yellow",
    "hex": "FCC01E"
  },
  {
    "name": "Goldenrod",
    "hex": "FCD667"
  },
  {
    "name": "Candlelight",
    "hex": "FCD917"
  },
  {
    "name": "Cherokee",
    "hex": "FCDA98"
  },
  {
    "name": "Double Pearl Lusta",
    "hex": "FCF4D0"
  },
  {
    "name": "Pearl Lusta",
    "hex": "FCF4DC"
  },
  {
    "name": "Vista White",
    "hex": "FCF8F7"
  },
  {
    "name": "Bianca",
    "hex": "FCFBF3"
  },
  {
    "name": "Moon Glow",
    "hex": "FCFEDA"
  },
  {
    "name": "China Ivory",
    "hex": "FCFFE7"
  },
  {
    "name": "Ceramic",
    "hex": "FCFFF9"
  },
  {
    "name": "Torch Red",
    "hex": "FD0E35"
  },
  {
    "name": "Wild Watermelon",
    "hex": "FD5B78"
  },
  {
    "name": "Crusta",
    "hex": "FD7B33"
  },
  {
    "name": "Sorbus",
    "hex": "FD7C07"
  },
  {
    "name": "Sweet Pink",
    "hex": "FD9FA2"
  },
  {
    "name": "Light Apricot",
    "hex": "FDD5B1"
  },
  {
    "name": "Pig Pink",
    "hex": "FDD7E4"
  },
  {
    "name": "Cinderella",
    "hex": "FDE1DC"
  },
  {
    "name": "Golden Glow",
    "hex": "FDE295"
  },
  {
    "name": "Lemon",
    "hex": "FDE910"
  },
  {
    "name": "Old Lace",
    "hex": "FDF5E6"
  },
  {
    "name": "Half Colonial White",
    "hex": "FDF6D3"
  },
  {
    "name": "Drover",
    "hex": "FDF7AD"
  },
  {
    "name": "Pale Prim",
    "hex": "FDFEB8"
  },
  {
    "name": "Cumulus",
    "hex": "FDFFD5"
  },
  {
    "name": "Persian Rose",
    "hex": "FE28A2"
  },
  {
    "name": "Sunset Orange",
    "hex": "FE4C40"
  },
  {
    "name": "Bittersweet",
    "hex": "FE6F5E"
  },
  {
    "name": "California",
    "hex": "FE9D04"
  },
  {
    "name": "Yellow Sea",
    "hex": "FEA904"
  },
  {
    "name": "Melon",
    "hex": "FEBAAD"
  },
  {
    "name": "Bright Sun",
    "hex": "FED33C"
  },
  {
    "name": "Dandelion",
    "hex": "FED85D"
  },
  {
    "name": "Salomie",
    "hex": "FEDB8D"
  },
  {
    "name": "Cape Honey",
    "hex": "FEE5AC"
  },
  {
    "name": "Remy",
    "hex": "FEEBF3"
  },
  {
    "name": "Oasis",
    "hex": "FEEFCE"
  },
  {
    "name": "Bridesmaid",
    "hex": "FEF0EC"
  },
  {
    "name": "Beeswax",
    "hex": "FEF2C7"
  },
  {
    "name": "Bleach White",
    "hex": "FEF3D8"
  },
  {
    "name": "Pipi",
    "hex": "FEF4CC"
  },
  {
    "name": "Half Spanish White",
    "hex": "FEF4DB"
  },
  {
    "name": "Wisp Pink",
    "hex": "FEF4F8"
  },
  {
    "name": "Provincial Pink",
    "hex": "FEF5F1"
  },
  {
    "name": "Half Dutch White",
    "hex": "FEF7DE"
  },
  {
    "name": "Solitaire",
    "hex": "FEF8E2"
  },
  {
    "name": "White Pointer",
    "hex": "FEF8FF"
  },
  {
    "name": "Off Yellow",
    "hex": "FEF9E3"
  },
  {
    "name": "Orange White",
    "hex": "FEFCED"
  },
  {
    "name": "Red",
    "hex": "FF0000"
  },
  {
    "name": "Rose",
    "hex": "FF007F"
  },
  {
    "name": "Purple Pizzazz",
    "hex": "FF00CC"
  },
  {
    "name": "Magenta / Fuchsia",
    "hex": "FF00FF"
  },
  {
    "name": "Scarlet",
    "hex": "FF2400"
  },
  {
    "name": "Wild Strawberry",
    "hex": "FF3399"
  },
  {
    "name": "Razzle Dazzle Rose",
    "hex": "FF33CC"
  },
  {
    "name": "Radical Red",
    "hex": "FF355E"
  },
  {
    "name": "Red Orange",
    "hex": "FF3F34"
  },
  {
    "name": "Coral Red",
    "hex": "FF4040"
  },
  {
    "name": "Vermilion",
    "hex": "FF4D00"
  },
  {
    "name": "International Orange",
    "hex": "FF4F00"
  },
  {
    "name": "Outrageous Orange",
    "hex": "FF6037"
  },
  {
    "name": "Blaze Orange",
    "hex": "FF6600"
  },
  {
    "name": "Pink Flamingo",
    "hex": "FF66FF"
  },
  {
    "name": "Orange",
    "hex": "FF681F"
  },
  {
    "name": "Hot Pink",
    "hex": "FF69B4"
  },
  {
    "name": "Persimmon",
    "hex": "FF6B53"
  },
  {
    "name": "Blush Pink",
    "hex": "FF6FFF"
  },
  {
    "name": "Burning Orange",
    "hex": "FF7034"
  },
  {
    "name": "Pumpkin",
    "hex": "FF7518"
  },
  {
    "name": "Flamenco",
    "hex": "FF7D07"
  },
  {
    "name": "Flush Orange",
    "hex": "FF7F00"
  },
  {
    "name": "Coral",
    "hex": "FF7F50"
  },
  {
    "name": "Salmon",
    "hex": "FF8C69"
  },
  {
    "name": "Pizazz",
    "hex": "FF9000"
  },
  {
    "name": "West Side",
    "hex": "FF910F"
  },
  {
    "name": "Pink Salmon",
    "hex": "FF91A4"
  },
  {
    "name": "Neon Carrot",
    "hex": "FF9933"
  },
  {
    "name": "Atomic Tangerine",
    "hex": "FF9966"
  },
  {
    "name": "Vivid Tangerine",
    "hex": "FF9980"
  },
  {
    "name": "Sunshade",
    "hex": "FF9E2C"
  },
  {
    "name": "Orange Peel",
    "hex": "FFA000"
  },
  {
    "name": "Mona Lisa",
    "hex": "FFA194"
  },
  {
    "name": "Web Orange",
    "hex": "FFA500"
  },
  {
    "name": "Carnation Pink",
    "hex": "FFA6C9"
  },
  {
    "name": "Hit Pink",
    "hex": "FFAB81"
  },
  {
    "name": "Yellow Orange",
    "hex": "FFAE42"
  },
  {
    "name": "Cornflower Lilac",
    "hex": "FFB0AC"
  },
  {
    "name": "Sundown",
    "hex": "FFB1B3"
  },
  {
    "name": "My Sin",
    "hex": "FFB31F"
  },
  {
    "name": "Texas Rose",
    "hex": "FFB555"
  },
  {
    "name": "Cotton Candy",
    "hex": "FFB7D5"
  },
  {
    "name": "Macaroni and Cheese",
    "hex": "FFB97B"
  },
  {
    "name": "Selective Yellow",
    "hex": "FFBA00"
  },
  {
    "name": "Koromiko",
    "hex": "FFBD5F"
  },
  {
    "name": "Amber",
    "hex": "FFBF00"
  },
  {
    "name": "Wax Flower",
    "hex": "FFC0A8"
  },
  {
    "name": "Pink",
    "hex": "FFC0CB"
  },
  {
    "name": "Your Pink",
    "hex": "FFC3C0"
  },
  {
    "name": "Supernova",
    "hex": "FFC901"
  },
  {
    "name": "Flesh",
    "hex": "FFCBA4"
  },
  {
    "name": "Sunglow",
    "hex": "FFCC33"
  },
  {
    "name": "Golden Tainoi",
    "hex": "FFCC5C"
  },
  {
    "name": "Peach Orange",
    "hex": "FFCC99"
  },
  {
    "name": "Chardonnay",
    "hex": "FFCD8C"
  },
  {
    "name": "Pastel Pink",
    "hex": "FFD1DC"
  },
  {
    "name": "Romantic",
    "hex": "FFD2B7"
  },
  {
    "name": "Grandis",
    "hex": "FFD38C"
  },
  {
    "name": "Gold",
    "hex": "FFD700"
  },
  {
    "name": "School bus Yellow",
    "hex": "FFD800"
  },
  {
    "name": "Cosmos",
    "hex": "FFD8D9"
  },
  {
    "name": "Mustard",
    "hex": "FFDB58"
  },
  {
    "name": "Peach Schnapps",
    "hex": "FFDCD6"
  },
  {
    "name": "Caramel",
    "hex": "FFDDAF"
  },
  {
    "name": "Tuft Bush",
    "hex": "FFDDCD"
  },
  {
    "name": "Watusi",
    "hex": "FFDDCF"
  },
  {
    "name": "Pink Lace",
    "hex": "FFDDF4"
  },
  {
    "name": "Navajo White",
    "hex": "FFDEAD"
  },
  {
    "name": "Frangipani",
    "hex": "FFDEB3"
  },
  {
    "name": "Pippin",
    "hex": "FFE1DF"
  },
  {
    "name": "Pale Rose",
    "hex": "FFE1F2"
  },
  {
    "name": "Negroni",
    "hex": "FFE2C5"
  },
  {
    "name": "Cream Brulee",
    "hex": "FFE5A0"
  },
  {
    "name": "Peach",
    "hex": "FFE5B4"
  },
  {
    "name": "Tequila",
    "hex": "FFE6C7"
  },
  {
    "name": "Kournikova",
    "hex": "FFE772"
  },
  {
    "name": "Sandy Beach",
    "hex": "FFEAC8"
  },
  {
    "name": "Karry",
    "hex": "FFEAD4"
  },
  {
    "name": "Broom",
    "hex": "FFEC13"
  },
  {
    "name": "Colonial White",
    "hex": "FFEDBC"
  },
  {
    "name": "Derby",
    "hex": "FFEED8"
  },
  {
    "name": "Vis Vis",
    "hex": "FFEFA1"
  },
  {
    "name": "Egg White",
    "hex": "FFEFC1"
  },
  {
    "name": "Papaya Whip",
    "hex": "FFEFD5"
  },
  {
    "name": "Fair Pink",
    "hex": "FFEFEC"
  },
  {
    "name": "Peach Cream",
    "hex": "FFF0DB"
  },
  {
    "name": "Lavender blush",
    "hex": "FFF0F5"
  },
  {
    "name": "Gorse",
    "hex": "FFF14F"
  },
  {
    "name": "Buttermilk",
    "hex": "FFF1B5"
  },
  {
    "name": "Pink Lady",
    "hex": "FFF1D8"
  },
  {
    "name": "Forget Me Not",
    "hex": "FFF1EE"
  },
  {
    "name": "Tutu",
    "hex": "FFF1F9"
  },
  {
    "name": "Picasso",
    "hex": "FFF39D"
  },
  {
    "name": "Chardon",
    "hex": "FFF3F1"
  },
  {
    "name": "Paris Daisy",
    "hex": "FFF46E"
  },
  {
    "name": "Barley White",
    "hex": "FFF4CE"
  },
  {
    "name": "Egg Sour",
    "hex": "FFF4DD"
  },
  {
    "name": "Sazerac",
    "hex": "FFF4E0"
  },
  {
    "name": "Serenade",
    "hex": "FFF4E8"
  },
  {
    "name": "Chablis",
    "hex": "FFF4F3"
  },
  {
    "name": "Seashell Peach",
    "hex": "FFF5EE"
  },
  {
    "name": "Sauvignon",
    "hex": "FFF5F3"
  },
  {
    "name": "Milk Punch",
    "hex": "FFF6D4"
  },
  {
    "name": "Varden",
    "hex": "FFF6DF"
  },
  {
    "name": "Rose White",
    "hex": "FFF6F5"
  },
  {
    "name": "Baja White",
    "hex": "FFF8D1"
  },
  {
    "name": "Gin Fizz",
    "hex": "FFF9E2"
  },
  {
    "name": "Early Dawn",
    "hex": "FFF9E6"
  },
  {
    "name": "Lemon Chiffon",
    "hex": "FFFACD"
  },
  {
    "name": "Bridal Heath",
    "hex": "FFFAF4"
  },
  {
    "name": "Scotch Mist",
    "hex": "FFFBDC"
  },
  {
    "name": "Soapstone",
    "hex": "FFFBF9"
  },
  {
    "name": "Witch Haze",
    "hex": "FFFC99"
  },
  {
    "name": "Buttery White",
    "hex": "FFFCEA"
  },
  {
    "name": "Island Spice",
    "hex": "FFFCEE"
  },
  {
    "name": "Cream",
    "hex": "FFFDD0"
  },
  {
    "name": "Chilean Heath",
    "hex": "FFFDE6"
  },
  {
    "name": "Travertine",
    "hex": "FFFDE8"
  },
  {
    "name": "Orchid White",
    "hex": "FFFDF3"
  },
  {
    "name": "Quarter Pearl Lusta",
    "hex": "FFFDF4"
  },
  {
    "name": "Half and Half",
    "hex": "FFFEE1"
  },
  {
    "name": "Apricot White",
    "hex": "FFFEEC"
  },
  {
    "name": "Rice Cake",
    "hex": "FFFEF0"
  },
  {
    "name": "Black White",
    "hex": "FFFEF6"
  },
  {
    "name": "Romance",
    "hex": "FFFEFD"
  },
  {
    "name": "Yellow",
    "hex": "FFFF00"
  },
  {
    "name": "Laser Lemon",
    "hex": "FFFF66"
  },
  {
    "name": "Pale Canary",
    "hex": "FFFF99"
  },
  {
    "name": "Portafino",
    "hex": "FFFFB4"
  },
  {
    "name": "Ivory",
    "hex": "FFFFF0"
  },
  {
    "name": "White",
    "hex": "FFFFFF"
  }
]

},{}],5:[function(require,module,exports){
module.exports = [{
  "name": "Mahogany",
  "hex": "#CD4A4A"
},{
  "name": "Fuzzy Wuzzy Brown",
  "hex": "#CC6666"
},{
  "name": "Chestnut",
  "hex": "#BC5D58"
},{
  "name": "Red Orange",
  "hex": "#FF5349"
},{
  "name": "Sunset Orange",
  "hex": "#FD5E53"
},{
  "name": "Bittersweet",
  "hex": "#FD7C6E"
},{
  "name": "Melon",
  "hex": "#FDBCB4"
},{
  "name": "Outrageous Orange",
  "hex": "#FF6E4A"
},{
  "name": "Vivid Tangerine",
  "hex": "#FFA089"
},{
  "name": "Burnt Sienna",
  "hex": "#EA7E5D"
},{
  "name": "Brown",
  "hex": "#B4674D"
},{
  "name": "Sepia",
  "hex": "#A5694F"
},{
  "name": "Orange",
  "hex": "#FF7538"
},{
  "name": "Burnt Orange",
  "hex": "#FF7F49"
},{
  "name": "Copper",
  "hex": "#DD9475"
},{
  "name": "Mango Tango",
  "hex": "#FF8243"
},{
  "name": "Atomic Tangerine",
  "hex": "#FFA474"
},{
  "name": "Beaver",
  "hex": "#9F8170"
},{
  "name": "Antique Brass",
  "hex": "#CD9575"
},{
  "name": "Desert Sand",
  "hex": "#EFCDB8"
},{
  "name": "Raw Sienna",
  "hex": "#D68A59"
},{
  "name": "Tumbleweed",
  "hex": "#DEAA88"
},{
  "name": "Tan",
  "hex": "#FAA76C"
},{
  "name": "Peach",
  "hex": "#FFCFAB"
},{
  "name": "Macaroni and Cheese",
  "hex": "#FFBD88"
},{
  "name": "Apricot",
  "hex": "#FDD9B5"
},{
  "name": "Neon Carrot",
  "hex": "#FFA343"
},{
  "name": "Almond",
  "hex": "#EFDBC5"
},{
  "name": "Yellow Orange",
  "hex": "#FFB653"
},{
  "name": "Gold",
  "hex": "#E7C697"
},{
  "name": "Shadow",
  "hex": "#8A795D"
},{
  "name": "Banana Mania",
  "hex": "#FAE7B5"
},{
  "name": "Sunglow",
  "hex": "#FFCF48"
},{
  "name": "Goldenrod",
  "hex": "#FCD975"
},{
  "name": "Dandelion",
  "hex": "#FDDB6D"
},{
  "name": "Yellow",
  "hex": "#FCE883"
},{
  "name": "Green Yellow",
  "hex": "#F0E891"
},{
  "name": "Spring Green",
  "hex": "#ECEABE"
},{
  "name": "Olive Green",
  "hex": "#BAB86C"
},{
  "name": "Laser Lemon",
  "hex": "#FDFC74"
},{
  "name": "Unmellow Yellow",
  "hex": "#FDFC74"
},{
  "name": "Canary",
  "hex": "#FFFF99"
},{
  "name": "Yellow Green",
  "hex": "#C5E384"
},{
  "name": "Inch Worm",
  "hex": "#B2EC5D"
},{
  "name": "Asparagus",
  "hex": "#87A96B"
},{
  "name": "Granny Smith Apple",
  "hex": "#A8E4A0"
},{
  "name": "Electric Lime",
  "hex": "#1DF914"
},{
  "name": "Screamin Green",
  "hex": "#76FF7A"
},{
  "name": "Fern",
  "hex": "#71BC78"
},{
  "name": "Forest Green",
  "hex": "#6DAE81"
},{
  "name": "Sea Green",
  "hex": "#9FE2BF"
},{
  "name": "Green",
  "hex": "#1CAC78"
},{
  "name": "Mountain Meadow",
  "hex": "#30BA8F"
},{
  "name": "Shamrock",
  "hex": "#45CEA2"
},{
  "name": "Jungle Green",
  "hex": "#3BB08F"
},{
  "name": "Caribbean Green",
  "hex": "#1CD3A2"
},{
  "name": "Tropical Rain Forest",
  "hex": "#17806D"
},{
  "name": "Pine Green",
  "hex": "#158078"
},{
  "name": "Robin Egg Blue",
  "hex": "#1FCECB"
},{
  "name": "Aquamarine",
  "hex": "#78DBE2"
},{
  "name": "Turquoise Blue",
  "hex": "#77DDE7"
},{
  "name": "Sky Blue",
  "hex": "#80DAEB"
},{
  "name": "Outer Space",
  "hex": "#414A4C"
},{
  "name": "Blue Green",
  "hex": "#199EBD"
},{
  "name": "Pacific Blue",
  "hex": "#1CA9C9"
},{
  "name": "Cerulean",
  "hex": "#1DACD6"
},{
  "name": "Cornflower",
  "hex": "#9ACEEB"
},{
  "name": "Midnight Blue",
  "hex": "#1A4876"
},{
  "name": "Navy Blue",
  "hex": "#1974D2"
},{
  "name": "Denim",
  "hex": "#2B6CC4"
},{
  "name": "Blue",
  "hex": "#1F75FE"
},{
  "name": "Periwinkle",
  "hex": "#C5D0E6"
},{
  "name": "Cadet Blue",
  "hex": "#B0B7C6"
},{
  "name": "Indigo",
  "hex": "#5D76CB"
},{
  "name": "Wild Blue Yonder",
  "hex": "#A2ADD0"
},{
  "name": "Manatee",
  "hex": "#979AAA"
},{
  "name": "Blue Bell",
  "hex": "#ADADD6"
},{
  "name": "Blue Violet",
  "hex": "#7366BD"
},{
  "name": "Purple Heart",
  "hex": "#7442C8"
},{
  "name": "Royal Purple",
  "hex": "#7851A9"
},{
  "name": "Purple Mountains’ Majesty",
  "hex": "#9D81BA"
},{
  "name": "Violet (Purple)",
  "hex": "#926EAE"
},{
  "name": "Wisteria",
  "hex": "#CDA4DE"
},{
  "name": "Vivid Violet",
  "hex": "#8F509D"
},{
  "name": "Fuchsia",
  "hex": "#C364C5"
},{
  "name": "Shocking Pink",
  "hex": "#FB7EFD"
},{
  "name": "Pink Flamingo",
  "hex": "#FC74FD"
},{
  "name": "Plum",
  "hex": "#8E4585"
},{
  "name": "Hot Magenta",
  "hex": "#FF1DCE"
},{
  "name": "Purple Pizzazz",
  "hex": "#FF1DCE"
},{
  "name": "Razzle Dazzle Rose",
  "hex": "#FF48D0"
},{
  "name": "Orchid",
  "hex": "#E6A8D7"
},{
  "name": "Red Violet",
  "hex": "#C0448F"
},{
  "name": "Eggplant",
  "hex": "#6E5160"
},{
  "name": "Cerise",
  "hex": "#DD4492"
},{
  "name": "Wild Strawberry",
  "hex": "#FF43A4"
},{
  "name": "Magenta",
  "hex": "#F664AF"
},{
  "name": "Lavender",
  "hex": "#FCB4D5"
},{
  "name": "Cotton Candy",
  "hex": "#FFBCD9"
},{
  "name": "Violet Red",
  "hex": "#F75394"
},{
  "name": "Carnation Pink",
  "hex": "#FFAACC"
},{
  "name": "Razzmatazz",
  "hex": "#E3256B"
},{
  "name": "Piggy Pink",
  "hex": "#FDD7E4"
},{
  "name": "Jazzberry Jam",
  "hex": "#CA3767"
},{
  "name": "Blush",
  "hex": "#DE5D83"
},{
  "name": "Tickle Me Pink",
  "hex": "#FC89AC"
},{
  "name": "Pink Sherbet",
  "hex": "#F780A1"
},{
  "name": "Maroon",
  "hex": "#C8385A"
},{
  "name": "Red",
  "hex": "#EE204D"
},{
  "name": "Radical Red",
  "hex": "#FF496C"
},{
  "name": "Mauvelous",
  "hex": "#EF98AA"
},{
  "name": "Wild Watermelon",
  "hex": "#FC6C85"
},{
  "name": "Scarlet",
  "hex": "#FC2847"
},{
  "name": "Salmon",
  "hex": "#FF9BAA"
},{
  "name": "Brick Red",
  "hex": "#CB4154"
},{
  "name": "White",
  "hex": "#EDEDED"
},{
  "name": "Timberwolf",
  "hex": "#DBD7D2"
},{
  "name": "Silver",
  "hex": "#CDC5C2"
},{
  "name": "Gray",
  "hex": "#95918C"
},{
  "name": "Black",
  "hex": "#232323"
}]

},{}],6:[function(require,module,exports){
module.exports = [
  { name: 'red', hex: '#FF0000' },
  { name: 'orange', hex: '#FFA500' },
  { name: 'yellow', hex: '#FFFF00' },
  { name: 'green', hex: '#008000' },
  { name: 'blue', hex: '#0000FF' },
  { name: 'indigo', hex: '#4B0082' },
  { name: 'violet', hex: '#EE82EE' }
]

},{}],7:[function(require,module,exports){
module.exports = [{
  name: 'indigo',
  hex: '#4b0082'
}, {
  name: 'gold',
  hex: '#ffd700'
}, {
  name: 'hotpink',
  hex: '#ff69b4'
}, {
  name: 'firebrick',
  hex: '#b22222'
}, {
  name: 'indianred',
  hex: '#cd5c5c'
}, {
  name: 'yellow',
  hex: '#ffff00'
}, {
  name: 'mistyrose',
  hex: '#ffe4e1'
}, {
  name: 'darkolivegreen',
  hex: '#556b2f'
}, {
  name: 'olive',
  hex: '#808000'
}, {
  name: 'darkseagreen',
  hex: '#8fbc8f'
}, {
  name: 'pink',
  hex: '#ffc0cb'
}, {
  name: 'tomato',
  hex: '#ff6347'
}, {
  name: 'lightcoral',
  hex: '#f08080'
}, {
  name: 'orangered',
  hex: '#ff4500'
}, {
  name: 'navajowhite',
  hex: '#ffdead'
}, {
  name: 'lime',
  hex: '#00ff00'
}, {
  name: 'palegreen',
  hex: '#98fb98'
}, {
  name: 'darkslategrey',
  hex: '#2f4f4f'
}, {
  name: 'greenyellow',
  hex: '#adff2f'
}, {
  name: 'burlywood',
  hex: '#deb887'
}, {
  name: 'seashell',
  hex: '#fff5ee'
}, {
  name: 'mediumspringgreen',
  hex: '#00fa9a'
}, {
  name: 'fuchsia',
  hex: '#ff00ff'
}, {
  name: 'papayawhip',
  hex: '#ffefd5'
}, {
  name: 'blanchedalmond',
  hex: '#ffebcd'
}, {
  name: 'chartreuse',
  hex: '#7fff00'
}, {
  name: 'dimgray',
  hex: '#696969'
}, {
  name: 'black',
  hex: '#000000'
}, {
  name: 'peachpuff',
  hex: '#ffdab9'
}, {
  name: 'springgreen',
  hex: '#00ff7f'
}, {
  name: 'aquamarine',
  hex: '#7fffd4'
}, {
  name: 'white',
  hex: '#ffffff'
}, {
  name: 'orange',
  hex: '#ffa500'
}, {
  name: 'lightsalmon',
  hex: '#ffa07a'
}, {
  name: 'darkslategray',
  hex: '#2f4f4f'
}, {
  name: 'brown',
  hex: '#a52a2a'
}, {
  name: 'ivory',
  hex: '#fffff0'
}, {
  name: 'dodgerblue',
  hex: '#1e90ff'
}, {
  name: 'peru',
  hex: '#cd853f'
}, {
  name: 'lawngreen',
  hex: '#7cfc00'
}, {
  name: 'chocolate',
  hex: '#d2691e'
}, {
  name: 'crimson',
  hex: '#dc143c'
}, {
  name: 'forestgreen',
  hex: '#228b22'
}, {
  name: 'darkgrey',
  hex: '#a9a9a9'
}, {
  name: 'lightseagreen',
  hex: '#20b2aa'
}, {
  name: 'cyan',
  hex: '#00ffff'
}, {
  name: 'mintcream',
  hex: '#f5fffa'
}, {
  name: 'silver',
  hex: '#c0c0c0'
}, {
  name: 'antiquewhite',
  hex: '#faebd7'
}, {
  name: 'mediumorchid',
  hex: '#ba55d3'
}, {
  name: 'skyblue',
  hex: '#87ceeb'
}, {
  name: 'gray',
  hex: '#808080'
}, {
  name: 'darkturquoise',
  hex: '#00ced1'
}, {
  name: 'goldenrod',
  hex: '#daa520'
}, {
  name: 'darkgreen',
  hex: '#006400'
}, {
  name: 'floralwhite',
  hex: '#fffaf0'
}, {
  name: 'darkviolet',
  hex: '#9400d3'
}, {
  name: 'darkgray',
  hex: '#a9a9a9'
}, {
  name: 'moccasin',
  hex: '#ffe4b5'
}, {
  name: 'saddlebrown',
  hex: '#8b4513'
}, {
  name: 'grey',
  hex: '#808080'
}, {
  name: 'darkslateblue',
  hex: '#483d8b'
}, {
  name: 'lightskyblue',
  hex: '#87cefa'
}, {
  name: 'lightpink',
  hex: '#ffb6c1'
}, {
  name: 'mediumvioletred',
  hex: '#c71585'
}, {
  name: 'slategrey',
  hex: '#708090'
}, {
  name: 'red',
  hex: '#ff0000'
}, {
  name: 'deeppink',
  hex: '#ff1493'
}, {
  name: 'limegreen',
  hex: '#32cd32'
}, {
  name: 'darkmagenta',
  hex: '#8b008b'
}, {
  name: 'palegoldenrod',
  hex: '#eee8aa'
}, {
  name: 'plum',
  hex: '#dda0dd'
}, {
  name: 'turquoise',
  hex: '#40e0d0'
}, {
  name: 'lightgrey',
  hex: '#d3d3d3'
}, {
  name: 'lightgoldenrodyellow',
  hex: '#fafad2'
}, {
  name: 'darkgoldenrod',
  hex: '#b8860b'
}, {
  name: 'lavender',
  hex: '#e6e6fa'
}, {
  name: 'maroon',
  hex: '#800000'
}, {
  name: 'yellowgreen',
  hex: '#9acd32'
}, {
  name: 'sandybrown',
  hex: '#f4a460'
}, {
  name: 'thistle',
  hex: '#d8bfd8'
}, {
  name: 'violet',
  hex: '#ee82ee'
}, {
  name: 'navy',
  hex: '#000080'
}, {
  name: 'magenta',
  hex: '#ff00ff'
}, {
  name: 'dimgrey',
  hex: '#696969'
}, {
  name: 'tan',
  hex: '#d2b48c'
}, {
  name: 'rosybrown',
  hex: '#bc8f8f'
}, {
  name: 'olivedrab',
  hex: '#6b8e23'
}, {
  name: 'blue',
  hex: '#0000ff'
}, {
  name: 'lightblue',
  hex: '#add8e6'
}, {
  name: 'ghostwhite',
  hex: '#f8f8ff'
}, {
  name: 'honeydew',
  hex: '#f0fff0'
}, {
  name: 'cornflowerblue',
  hex: '#6495ed'
}, {
  name: 'slateblue',
  hex: '#6a5acd'
}, {
  name: 'linen',
  hex: '#faf0e6'
}, {
  name: 'darkblue',
  hex: '#00008b'
}, {
  name: 'powderblue',
  hex: '#b0e0e6'
}, {
  name: 'seagreen',
  hex: '#2e8b57'
}, {
  name: 'darkkhaki',
  hex: '#bdb76b'
}, {
  name: 'snow',
  hex: '#fffafa'
}, {
  name: 'sienna',
  hex: '#a0522d'
}, {
  name: 'mediumblue',
  hex: '#0000cd'
}, {
  name: 'royalblue',
  hex: '#4169e1'
}, {
  name: 'lightcyan',
  hex: '#e0ffff'
}, {
  name: 'green',
  hex: '#008000'
}, {
  name: 'mediumpurple',
  hex: '#9370db'
}, {
  name: 'midnightblue',
  hex: '#191970'
}, {
  name: 'cornsilk',
  hex: '#fff8dc'
}, {
  name: 'paleturquoise',
  hex: '#afeeee'
}, {
  name: 'bisque',
  hex: '#ffe4c4'
}, {
  name: 'slategray',
  hex: '#708090'
}, {
  name: 'darkcyan',
  hex: '#008b8b'
}, {
  name: 'khaki',
  hex: '#f0e68c'
}, {
  name: 'wheat',
  hex: '#f5deb3'
}, {
  name: 'teal',
  hex: '#008080'
}, {
  name: 'darkorchid',
  hex: '#9932cc'
}, {
  name: 'deepskyblue',
  hex: '#00bfff'
}, {
  name: 'salmon',
  hex: '#fa8072'
}, {
  name: 'darkred',
  hex: '#8b0000'
}, {
  name: 'steelblue',
  hex: '#4682b4'
}, {
  name: 'palevioletred',
  hex: '#db7093'
}, {
  name: 'lightslategray',
  hex: '#778899'
}, {
  name: 'aliceblue',
  hex: '#f0f8ff'
}, {
  name: 'lightslategrey',
  hex: '#778899'
}, {
  name: 'lightgreen',
  hex: '#90ee90'
}, {
  name: 'orchid',
  hex: '#da70d6'
}, {
  name: 'gainsboro',
  hex: '#dcdcdc'
}, {
  name: 'mediumseagreen',
  hex: '#3cb371'
}, {
  name: 'lightgray',
  hex: '#d3d3d3'
}, {
  name: 'mediumturquoise',
  hex: '#48d1cc'
}, {
  name: 'lemonchiffon',
  hex: '#fffacd'
}, {
  name: 'cadetblue',
  hex: '#5f9ea0'
}, {
  name: 'lightyellow',
  hex: '#ffffe0'
}, {
  name: 'lavenderblush',
  hex: '#fff0f5'
}, {
  name: 'coral',
  hex: '#ff7f50'
}, {
  name: 'purple',
  hex: '#800080'
}, {
  name: 'aqua',
  hex: '#00ffff'
}, {
  name: 'whitesmoke',
  hex: '#f5f5f5'
}, {
  name: 'mediumslateblue',
  hex: '#7b68ee'
}, {
  name: 'darkorange',
  hex: '#ff8c00'
}, {
  name: 'mediumaquamarine',
  hex: '#66cdaa'
}, {
  name: 'darksalmon',
  hex: '#e9967a'
}, {
  name: 'beige',
  hex: '#f5f5dc'
}, {
  name: 'blueviolet',
  hex: '#8a2be2'
}, {
  name: 'azure',
  hex: '#f0ffff'
}, {
  name: 'lightsteelblue',
  hex: '#b0c4de'
}, {
  name: 'oldlace',
  hex: '#fdf5e6'
}]

},{}],8:[function(require,module,exports){
// https://github.com/zeplin/zeplin-palette
module.exports = [
    {hex: "#000000", name: "black"},
    {hex: "#000133", name: "very dark blue"},
    {hex: "#00022e", name: "dark navy blue"},
    {hex: "#00035b", name: "dark blue"},
    {hex: "#000435", name: "dark navy"},
    {hex: "#001146", name: "navy blue"},
    {hex: "#002d04", name: "dark forest green"},
    {hex: "#004577", name: "prussian blue"},
    {hex: "#005249", name: "dark blue green"},
    {hex: "#00555a", name: "deep teal"},
    {hex: "#005f6a", name: "petrol"},
    {hex: "#009337", name: "kelley green"},
    {hex: "#00fbb0", name: "greenish turquoise"},
    {hex: "#00ffff", name: "cyan"},
    {hex: "#010fcc", name: "true blue"},
    {hex: "#01153e", name: "navy"},
    {hex: "#01386a", name: "marine blue"},
    {hex: "#014182", name: "darkish blue"},
    {hex: "#014600", name: "racing green"},
    {hex: "#014d4e", name: "dark teal"},
    {hex: "#015482", name: "deep sea blue"},
    {hex: "#0165fc", name: "bright blue"},
    {hex: "#016795", name: "peacock blue"},
    {hex: "#017371", name: "dark aquamarine"},
    {hex: "#017374", name: "deep turquoise"},
    {hex: "#017a79", name: "bluegreen"},
    {hex: "#017b92", name: "ocean"},
    {hex: "#01889f", name: "teal blue"},
    {hex: "#019529", name: "irish green"},
    {hex: "#01a049", name: "emerald"},
    {hex: "#01b44c", name: "shamrock"},
    {hex: "#01c08d", name: "green/blue"},
    {hex: "#01f9c6", name: "bright teal"},
    {hex: "#01ff07", name: "bright green"},
    {hex: "#020035", name: "midnight blue"},
    {hex: "#0203e2", name: "pure blue"},
    {hex: "#02066f", name: "dark royal blue"},
    {hex: "#021bf9", name: "rich blue"},
    {hex: "#02590f", name: "deep green"},
    {hex: "#028f1e", name: "emerald green"},
    {hex: "#029386", name: "teal"},
    {hex: "#02ab2e", name: "kelly green"},
    {hex: "#02c14d", name: "shamrock green"},
    {hex: "#02ccfe", name: "bright sky blue"},
    {hex: "#02d8e9", name: "aqua blue"},
    {hex: "#03012d", name: "midnight"},
    {hex: "#030764", name: "darkblue"},
    {hex: "#030aa7", name: "cobalt blue"},
    {hex: "#033500", name: "dark green"},
    {hex: "#0339f8", name: "vibrant blue"},
    {hex: "#0343df", name: "blue"},
    {hex: "#03719c", name: "ocean blue"},
    {hex: "#040273", name: "deep blue"},
    {hex: "#040348", name: "night blue"},
    {hex: "#042e60", name: "marine"},
    {hex: "#044a05", name: "bottle green"},
    {hex: "#045c5a", name: "dark turquoise"},
    {hex: "#047495", name: "sea blue"},
    {hex: "#048243", name: "jungle green"},
    {hex: "#0485d1", name: "cerulean"},
    {hex: "#04d8b2", name: "aquamarine"},
    {hex: "#04d9ff", name: "neon blue"},
    {hex: "#04f489", name: "turquoise green"},
    {hex: "#0504aa", name: "royal blue"},
    {hex: "#05472a", name: "evergreen"},
    {hex: "#05480d", name: "british racing green"},
    {hex: "#054907", name: "darkgreen"},
    {hex: "#05696b", name: "dark aqua"},
    {hex: "#056eee", name: "cerulean blue"},
    {hex: "#05ffa6", name: "bright sea green"},
    {hex: "#062e03", name: "very dark green"},
    {hex: "#06470c", name: "forest green"},
    {hex: "#0652ff", name: "electric blue"},
    {hex: "#069af3", name: "azure"},
    {hex: "#06b1c4", name: "turquoise blue"},
    {hex: "#06b48b", name: "green blue"},
    {hex: "#06c2ac", name: "turquoise"},
    {hex: "#070d0d", name: "almost black"},
    {hex: "#0804f9", name: "primary blue"},
    {hex: "#08787f", name: "deep aqua"},
    {hex: "#089404", name: "true green"},
    {hex: "#08ff08", name: "fluorescent green"},
    {hex: "#0a437a", name: "twilight blue"},
    {hex: "#0a481e", name: "pine green"},
    {hex: "#0a5f38", name: "spruce"},
    {hex: "#0a888a", name: "dark cyan"},
    {hex: "#0add08", name: "vibrant green"},
    {hex: "#0aff02", name: "fluro green"},
    {hex: "#0b4008", name: "hunter green"},
    {hex: "#0b5509", name: "forest"},
    {hex: "#0b8b87", name: "greenish blue"},
    {hex: "#0bf77d", name: "minty green"},
    {hex: "#0bf9ea", name: "bright aqua"},
    {hex: "#0c06f7", name: "strong blue"},
    {hex: "#0c1793", name: "royal"},
    {hex: "#0cb577", name: "green teal"},
    {hex: "#0cdc73", name: "tealish green"},
    {hex: "#0cff0c", name: "neon green"},
    {hex: "#0d75f8", name: "deep sky blue"},
    {hex: "#0e87cc", name: "water blue"},
    {hex: "#0f9b8e", name: "blue/green"},
    {hex: "#0ffef9", name: "bright turquoise"},
    {hex: "#107ab0", name: "nice blue"},
    {hex: "#10a674", name: "bluish green"},
    {hex: "#11875d", name: "dark sea green"},
    {hex: "#12e193", name: "aqua green"},
    {hex: "#137e6d", name: "blue green"},
    {hex: "#13bbaf", name: "topaz"},
    {hex: "#13eac9", name: "aqua"},
    {hex: "#152eff", name: "vivid blue"},
    {hex: "#154406", name: "forrest green"},
    {hex: "#155084", name: "light navy"},
    {hex: "#15b01a", name: "green"},
    {hex: "#1805db", name: "ultramarine blue"},
    {hex: "#18d17b", name: "seaweed"},
    {hex: "#1b2431", name: "dark"},
    {hex: "#1bfc06", name: "highlighter green"},
    {hex: "#1d0200", name: "very dark brown"},
    {hex: "#1d5dec", name: "azul"},
    {hex: "#1e488f", name: "cobalt"},
    {hex: "#1e9167", name: "viridian"},
    {hex: "#1ef876", name: "spearmint"},
    {hex: "#1f0954", name: "dark indigo"},
    {hex: "#1f3b4d", name: "dark blue grey"},
    {hex: "#1f6357", name: "dark green blue"},
    {hex: "#1fa774", name: "jade"},
    {hex: "#1fb57a", name: "dark seafoam"},
    {hex: "#2000b1", name: "ultramarine"},
    {hex: "#20c073", name: "dark mint green"},
    {hex: "#20f986", name: "wintergreen"},
    {hex: "#2138ab", name: "sapphire"},
    {hex: "#214761", name: "dark slate blue"},
    {hex: "#21c36f", name: "algae green"},
    {hex: "#21fc0d", name: "electric green"},
    {hex: "#2242c7", name: "blue blue"},
    {hex: "#23c48b", name: "greenblue"},
    {hex: "#247afd", name: "clear blue"},
    {hex: "#24bca8", name: "tealish"},
    {hex: "#25a36f", name: "teal green"},
    {hex: "#25ff29", name: "hot green"},
    {hex: "#26538d", name: "dusk blue"},
    {hex: "#26f7fd", name: "bright light blue"},
    {hex: "#276ab3", name: "mid blue"},
    {hex: "#280137", name: "midnight purple"},
    {hex: "#287c37", name: "darkish green"},
    {hex: "#29465b", name: "dark grey blue"},
    {hex: "#2976bb", name: "bluish"},
    {hex: "#2a0134", name: "very dark purple"},
    {hex: "#2a7e19", name: "tree green"},
    {hex: "#2afeb7", name: "greenish cyan"},
    {hex: "#2b5d34", name: "pine"},
    {hex: "#2baf6a", name: "jade green"},
    {hex: "#2bb179", name: "bluey green"},
    {hex: "#2c6fbb", name: "medium blue"},
    {hex: "#2cfa1f", name: "radioactive green"},
    {hex: "#2dfe54", name: "bright light green"},
    {hex: "#2e5a88", name: "light navy blue"},
    {hex: "#2ee8bb", name: "aqua marine"},
    {hex: "#2fef10", name: "vivid green"},
    {hex: "#31668a", name: "ugly blue"},
    {hex: "#32bf84", name: "greenish teal"},
    {hex: "#33b864", name: "cool green"},
    {hex: "#34013f", name: "dark violet"},
    {hex: "#341c02", name: "dark brown"},
    {hex: "#343837", name: "charcoal"},
    {hex: "#35063e", name: "dark purple"},
    {hex: "#35530a", name: "navy green"},
    {hex: "#35ad6b", name: "seaweed green"},
    {hex: "#36013f", name: "deep purple"},
    {hex: "#363737", name: "dark grey"},
    {hex: "#373e02", name: "dark olive"},
    {hex: "#3778bf", name: "windows blue"},
    {hex: "#380282", name: "indigo"},
    {hex: "#380835", name: "eggplant"},
    {hex: "#388004", name: "dark grass green"},
    {hex: "#39ad48", name: "medium green"},
    {hex: "#3a18b1", name: "indigo blue"},
    {hex: "#3a2efe", name: "light royal blue"},
    {hex: "#3ae57f", name: "weird green"},
    {hex: "#3b5b92", name: "denim blue"},
    {hex: "#3b638c", name: "denim"},
    {hex: "#3b719f", name: "muted blue"},
    {hex: "#3c0008", name: "dark maroon"},
    {hex: "#3c4142", name: "charcoal grey"},
    {hex: "#3c4d03", name: "dark olive green"},
    {hex: "#3c73a8", name: "flat blue"},
    {hex: "#3c9992", name: "sea"},
    {hex: "#3d0734", name: "aubergine"},
    {hex: "#3d1c02", name: "chocolate"},
    {hex: "#3d7afd", name: "lightish blue"},
    {hex: "#3d9973", name: "ocean green"},
    {hex: "#3e82fc", name: "dodger blue"},
    {hex: "#3eaf76", name: "dark seafoam green"},
    {hex: "#3f012c", name: "dark plum"},
    {hex: "#3f829d", name: "dirty blue"},
    {hex: "#3f9b0b", name: "grass green"},
    {hex: "#40a368", name: "greenish"},
    {hex: "#40fd14", name: "poison green"},
    {hex: "#410200", name: "deep brown"},
    {hex: "#411900", name: "chocolate brown"},
    {hex: "#419c03", name: "grassy green"},
    {hex: "#41fdfe", name: "bright cyan"},
    {hex: "#42b395", name: "greeny blue"},
    {hex: "#430541", name: "eggplant purple"},
    {hex: "#436bad", name: "french blue"},
    {hex: "#448ee4", name: "dark sky blue"},
    {hex: "#464196", name: "blueberry"},
    {hex: "#475f94", name: "dusky blue"},
    {hex: "#48c072", name: "dark mint"},
    {hex: "#490648", name: "deep violet"},
    {hex: "#49759c", name: "dull blue"},
    {hex: "#4984b8", name: "cool blue"},
    {hex: "#4a0100", name: "mahogany"},
    {hex: "#4b006e", name: "royal purple"},
    {hex: "#4b0101", name: "dried blood"},
    {hex: "#4b57db", name: "warm blue"},
    {hex: "#4b5d16", name: "army green"},
    {hex: "#4b6113", name: "camouflage green"},
    {hex: "#4c9085", name: "dusty teal"},
    {hex: "#4da409", name: "lawn green"},
    {hex: "#4e0550", name: "plum purple"},
    {hex: "#4e518b", name: "twilight"},
    {hex: "#4e5481", name: "dusk"},
    {hex: "#4e7496", name: "cadet blue"},
    {hex: "#4efd54", name: "light neon green"},
    {hex: "#4f738e", name: "metallic blue"},
    {hex: "#4f9153", name: "light forest green"},
    {hex: "#507b9c", name: "stormy blue"},
    {hex: "#50a747", name: "mid green"},
    {hex: "#510ac9", name: "violet blue"},
    {hex: "#516572", name: "slate"},
    {hex: "#5170d7", name: "cornflower blue"},
    {hex: "#51b73b", name: "leafy green"},
    {hex: "#526525", name: "camo green"},
    {hex: "#533cc6", name: "blue with a hint of purple"},
    {hex: "#536267", name: "gunmetal"},
    {hex: "#53fca1", name: "sea green"},
    {hex: "#53fe5c", name: "light bright green"},
    {hex: "#544e03", name: "green brown"},
    {hex: "#548d44", name: "fern green"},
    {hex: "#54ac68", name: "algae"},
    {hex: "#5539cc", name: "blurple"},
    {hex: "#5684ae", name: "off blue"},
    {hex: "#56ae57", name: "dark pastel green"},
    {hex: "#56fca2", name: "light green blue"},
    {hex: "#5729ce", name: "blue purple"},
    {hex: "#580f41", name: "plum"},
    {hex: "#58bc08", name: "frog green"},
    {hex: "#59656d", name: "slate grey"},
    {hex: "#598556", name: "dark sage"},
    {hex: "#5a06ef", name: "blue/purple"},
    {hex: "#5a7d9a", name: "steel blue"},
    {hex: "#5a86ad", name: "dusty blue"},
    {hex: "#5b7c99", name: "slate blue"},
    {hex: "#5c8b15", name: "sap green"},
    {hex: "#5ca904", name: "leaf green"},
    {hex: "#5cac2d", name: "grass"},
    {hex: "#5cb200", name: "kermit green"},
    {hex: "#5d06e9", name: "blue violet"},
    {hex: "#5d1451", name: "grape purple"},
    {hex: "#5d21d0", name: "purple/blue"},
    {hex: "#5e819d", name: "greyish blue"},
    {hex: "#5e9b8a", name: "grey teal"},
    {hex: "#5edc1f", name: "green apple"},
    {hex: "#5f34e7", name: "purpley blue"},
    {hex: "#5f9e8f", name: "dull teal"},
    {hex: "#5fa052", name: "muted green"},
    {hex: "#601ef9", name: "purplish blue"},
    {hex: "#60460f", name: "mud brown"},
    {hex: "#606602", name: "mud green"},
    {hex: "#607c8e", name: "blue grey"},
    {hex: "#610023", name: "burgundy"},
    {hex: "#6140ef", name: "purpleish blue"},
    {hex: "#61de2a", name: "toxic green"},
    {hex: "#61e160", name: "lightish green"},
    {hex: "#6241c7", name: "bluey purple"},
    {hex: "#6258c4", name: "iris"},
    {hex: "#632de9", name: "purple blue"},
    {hex: "#638b27", name: "mossy green"},
    {hex: "#63a950", name: "fern"},
    {hex: "#63b365", name: "boring green"},
    {hex: "#63f7b4", name: "light greenish blue"},
    {hex: "#645403", name: "olive brown"},
    {hex: "#647d8e", name: "grey/blue"},
    {hex: "#6488ea", name: "soft blue"},
    {hex: "#650021", name: "maroon"},
    {hex: "#653700", name: "brown"},
    {hex: "#657432", name: "muddy green"},
    {hex: "#658b38", name: "moss green"},
    {hex: "#658cbb", name: "faded blue"},
    {hex: "#658d6d", name: "slate green"},
    {hex: "#65ab7c", name: "tea"},
    {hex: "#65fe08", name: "bright lime green"},
    {hex: "#661aee", name: "purply blue"},
    {hex: "#665fd1", name: "dark periwinkle"},
    {hex: "#667c3e", name: "military green"},
    {hex: "#667e2c", name: "dirty green"},
    {hex: "#673a3f", name: "purple brown"},
    {hex: "#677a04", name: "olive green"},
    {hex: "#680018", name: "claret"},
    {hex: "#6832e3", name: "burple"},
    {hex: "#696006", name: "greeny brown"},
    {hex: "#696112", name: "greenish brown"},
    {hex: "#698339", name: "swamp"},
    {hex: "#699d4c", name: "flat green"},
    {hex: "#69d84f", name: "fresh green"},
    {hex: "#6a6e09", name: "brownish green"},
    {hex: "#6a79f7", name: "cornflower"},
    {hex: "#6b4247", name: "purplish brown"},
    {hex: "#6b7c85", name: "battleship grey"},
    {hex: "#6b8ba4", name: "grey blue"},
    {hex: "#6ba353", name: "off green"},
    {hex: "#6c3461", name: "grape"},
    {hex: "#6c7a0e", name: "murky green"},
    {hex: "#6d5acf", name: "light indigo"},
    {hex: "#6dedfd", name: "robin's egg"},
    {hex: "#6e1005", name: "reddy brown"},
    {hex: "#6e750e", name: "olive"},
    {hex: "#6ecb3c", name: "apple"},
    {hex: "#6f6c0a", name: "browny green"},
    {hex: "#6f7632", name: "olive drab"},
    {hex: "#6f7c00", name: "poop green"},
    {hex: "#6f828a", name: "steel grey"},
    {hex: "#6fc276", name: "soft green"},
    {hex: "#703be7", name: "bluish purple"},
    {hex: "#706c11", name: "brown green"},
    {hex: "#70b23f", name: "nasty green"},
    {hex: "#719f91", name: "greyish teal"},
    {hex: "#71aa34", name: "leaf"},
    {hex: "#720058", name: "rich purple"},
    {hex: "#728639", name: "khaki green"},
    {hex: "#728f02", name: "dark yellow green"},
    {hex: "#730039", name: "merlot"},
    {hex: "#734a65", name: "dirty purple"},
    {hex: "#735c12", name: "mud"},
    {hex: "#738595", name: "steel"},
    {hex: "#742802", name: "chestnut"},
    {hex: "#748500", name: "swamp green"},
    {hex: "#748b97", name: "bluish grey"},
    {hex: "#749551", name: "drab green"},
    {hex: "#74a662", name: "dull green"},
    {hex: "#750851", name: "velvet"},
    {hex: "#751973", name: "darkish purple"},
    {hex: "#758000", name: "shit green"},
    {hex: "#758da3", name: "blue/grey"},
    {hex: "#75b84f", name: "turtle green"},
    {hex: "#75bbfd", name: "sky blue"},
    {hex: "#75fd63", name: "lighter green"},
    {hex: "#76424e", name: "brownish purple"},
    {hex: "#769958", name: "moss"},
    {hex: "#76a973", name: "dusty green"},
    {hex: "#76cd26", name: "apple green"},
    {hex: "#76fda8", name: "light bluish green"},
    {hex: "#76ff7b", name: "lightgreen"},
    {hex: "#770001", name: "blood"},
    {hex: "#77926f", name: "green grey"},
    {hex: "#77a1b5", name: "greyblue"},
    {hex: "#77ab56", name: "asparagus"},
    {hex: "#789b73", name: "grey green"},
    {hex: "#78d1b6", name: "seafoam blue"},
    {hex: "#7a5901", name: "poop brown"},
    {hex: "#7a687f", name: "purplish grey"},
    {hex: "#7a6a4f", name: "greyish brown"},
    {hex: "#7a9703", name: "ugly green"},
    {hex: "#7af9ab", name: "seafoam green"},
    {hex: "#7b002c", name: "bordeaux"},
    {hex: "#7b0323", name: "wine red"},
    {hex: "#7b5804", name: "shit brown"},
    {hex: "#7bb274", name: "faded green"},
    {hex: "#7bc8f6", name: "lightblue"},
    {hex: "#7bf2da", name: "tiffany blue"},
    {hex: "#7bfdc7", name: "light aquamarine"},
    {hex: "#7d7103", name: "ugly brown"},
    {hex: "#7d7f7c", name: "medium grey"},
    {hex: "#7e1e9c", name: "purple"},
    {hex: "#7e4071", name: "bruise"},
    {hex: "#7ea07a", name: "greeny grey"},
    {hex: "#7ebd01", name: "dark lime green"},
    {hex: "#7ef4cc", name: "light turquoise"},
    {hex: "#7efbb3", name: "light blue green"},
    {hex: "#7f2b0a", name: "reddish brown"},
    {hex: "#7f4e1e", name: "milk chocolate"},
    {hex: "#7f5112", name: "medium brown"},
    {hex: "#7f5e00", name: "poop"},
    {hex: "#7f5f00", name: "shit"},
    {hex: "#7f684e", name: "dark taupe"},
    {hex: "#7f7053", name: "grey brown"},
    {hex: "#7f8f4e", name: "camo"},
    {hex: "#80013f", name: "wine"},
    {hex: "#805b87", name: "muted purple"},
    {hex: "#80f9ad", name: "seafoam"},
    {hex: "#820747", name: "red purple"},
    {hex: "#825f87", name: "dusty purple"},
    {hex: "#826d8c", name: "grey purple"},
    {hex: "#828344", name: "drab"},
    {hex: "#82a67d", name: "greyish green"},
    {hex: "#82cafc", name: "sky"},
    {hex: "#82cbb2", name: "pale teal"},
    {hex: "#836539", name: "dirt brown"},
    {hex: "#840000", name: "dark red"},
    {hex: "#84597e", name: "dull purple"},
    {hex: "#84b701", name: "dark lime"},
    {hex: "#850e04", name: "indian red"},
    {hex: "#856798", name: "dark lavender"},
    {hex: "#85a3b2", name: "bluegrey"},
    {hex: "#866f85", name: "purple grey"},
    {hex: "#86775f", name: "brownish grey"},
    {hex: "#86a17d", name: "grey/green"},
    {hex: "#874c62", name: "dark mauve"},
    {hex: "#8756e4", name: "purpley"},
    {hex: "#875f42", name: "cocoa"},
    {hex: "#876e4b", name: "dull brown"},
    {hex: "#87a922", name: "avocado green"},
    {hex: "#87ae73", name: "sage"},
    {hex: "#87fd05", name: "bright lime"},
    {hex: "#885f01", name: "poo brown"},
    {hex: "#886806", name: "muddy brown"},
    {hex: "#887191", name: "greyish purple"},
    {hex: "#889717", name: "baby shit green"},
    {hex: "#88b378", name: "sage green"},
    {hex: "#894585", name: "light eggplant"},
    {hex: "#895b7b", name: "dusky purple"},
    {hex: "#89a0b0", name: "bluey grey"},
    {hex: "#89a203", name: "vomit green"},
    {hex: "#89fe05", name: "lime green"},
    {hex: "#8a6e45", name: "dirt"},
    {hex: "#8ab8fe", name: "carolina blue"},
    {hex: "#8af1fe", name: "robin egg blue"},
    {hex: "#8b2e16", name: "red brown"},
    {hex: "#8b3103", name: "rust brown"},
    {hex: "#8b88f8", name: "lavender blue"},
    {hex: "#8c000f", name: "crimson"},
    {hex: "#8c0034", name: "red wine"},
    {hex: "#8cfd7e", name: "easter green"},
    {hex: "#8cff9e", name: "baby green"},
    {hex: "#8cffdb", name: "light aqua"},
    {hex: "#8d5eb7", name: "deep lavender"},
    {hex: "#8d8468", name: "brown grey"},
    {hex: "#8e7618", name: "hazel"},
    {hex: "#8e82fe", name: "periwinkle"},
    {hex: "#8eab12", name: "pea green"},
    {hex: "#8ee53f", name: "kiwi green"},
    {hex: "#8f1402", name: "brick red"},
    {hex: "#8f7303", name: "poo"},
    {hex: "#8f8ce7", name: "perrywinkle"},
    {hex: "#8f9805", name: "baby poop green"},
    {hex: "#8f99fb", name: "periwinkle blue"},
    {hex: "#8fae22", name: "icky green"},
    {hex: "#8fb67b", name: "lichen"},
    {hex: "#8ffe09", name: "acid green"},
    {hex: "#8fff9f", name: "mint green"},
    {hex: "#90b134", name: "avocado"},
    {hex: "#90e4c1", name: "light teal"},
    {hex: "#90fda9", name: "foam green"},
    {hex: "#910951", name: "reddish purple"},
    {hex: "#916e99", name: "faded purple"},
    {hex: "#920a4e", name: "mulberry"},
    {hex: "#922b05", name: "brown red"},
    {hex: "#929591", name: "grey"},
    {hex: "#929901", name: "pea soup"},
    {hex: "#937c00", name: "baby poop"},
    {hex: "#94568c", name: "purplish"},
    {hex: "#947706", name: "puke brown"},
    {hex: "#947e94", name: "purpley grey"},
    {hex: "#94a617", name: "pea soup green"},
    {hex: "#94ac02", name: "barf green"},
    {hex: "#94b21c", name: "sickly green"},
    {hex: "#952e8f", name: "warm purple"},
    {hex: "#95a3a6", name: "cool grey"},
    {hex: "#95d0fc", name: "light blue"},
    {hex: "#960056", name: "dark magenta"},
    {hex: "#964e02", name: "warm brown"},
    {hex: "#966ebd", name: "deep lilac"},
    {hex: "#96ae8d", name: "greenish grey"},
    {hex: "#96b403", name: "booger green"},
    {hex: "#96f97b", name: "light green"},
    {hex: "#978a84", name: "warm grey"},
    {hex: "#980002", name: "blood red"},
    {hex: "#983fb2", name: "purply"},
    {hex: "#98568d", name: "purpleish"},
    {hex: "#985e2b", name: "sepia"},
    {hex: "#98eff9", name: "robin's egg blue"},
    {hex: "#98f6b0", name: "light sea green"},
    {hex: "#9900fa", name: "vivid purple"},
    {hex: "#990147", name: "purple red"},
    {hex: "#990f4b", name: "berry"},
    {hex: "#997570", name: "reddish grey"},
    {hex: "#99cc04", name: "slime green"},
    {hex: "#9a0200", name: "deep red"},
    {hex: "#9a0eea", name: "violet"},
    {hex: "#9a3001", name: "auburn"},
    {hex: "#9a6200", name: "raw sienna"},
    {hex: "#9aae07", name: "puke green"},
    {hex: "#9af764", name: "light grass green"},
    {hex: "#9b5fc0", name: "amethyst"},
    {hex: "#9b7a01", name: "yellowish brown"},
    {hex: "#9b8f55", name: "dark khaki"},
    {hex: "#9bb53c", name: "booger"},
    {hex: "#9be5aa", name: "hospital green"},
    {hex: "#9c6d57", name: "brownish"},
    {hex: "#9c6da5", name: "dark lilac"},
    {hex: "#9cbb04", name: "bright olive"},
    {hex: "#9cef43", name: "kiwi"},
    {hex: "#9d0216", name: "carmine"},
    {hex: "#9d0759", name: "dark fuchsia"},
    {hex: "#9d5783", name: "light plum"},
    {hex: "#9d7651", name: "mocha"},
    {hex: "#9db92c", name: "sick green"},
    {hex: "#9dbcd4", name: "light grey blue"},
    {hex: "#9dc100", name: "snot green"},
    {hex: "#9dff00", name: "bright yellow green"},
    {hex: "#9e003a", name: "cranberry"},
    {hex: "#9e0168", name: "red violet"},
    {hex: "#9e3623", name: "brownish red"},
    {hex: "#9e43a2", name: "medium purple"},
    {hex: "#9f2305", name: "burnt red"},
    {hex: "#9f8303", name: "diarrhea"},
    {hex: "#9ffeb0", name: "mint"},
    {hex: "#a0025c", name: "deep magenta"},
    {hex: "#a00498", name: "barney purple"},
    {hex: "#a03623", name: "brick"},
    {hex: "#a0450e", name: "burnt umber"},
    {hex: "#a0bf16", name: "gross green"},
    {hex: "#a0febf", name: "light seafoam"},
    {hex: "#a13905", name: "russet"},
    {hex: "#a24857", name: "light maroon"},
    {hex: "#a2653e", name: "earth"},
    {hex: "#a2a415", name: "vomit"},
    {hex: "#a2bffe", name: "pastel blue"},
    {hex: "#a2cffe", name: "baby blue"},
    {hex: "#a442a0", name: "ugly purple"},
    {hex: "#a484ac", name: "heather"},
    {hex: "#a4be5c", name: "light olive green"},
    {hex: "#a4bf20", name: "pea"},
    {hex: "#a50055", name: "violet red"},
    {hex: "#a552e6", name: "lightish purple"},
    {hex: "#a55af4", name: "lighter purple"},
    {hex: "#a57e52", name: "puce"},
    {hex: "#a5a391", name: "cement"},
    {hex: "#a5a502", name: "puke"},
    {hex: "#a5fbd5", name: "pale turquoise"},
    {hex: "#a66fb5", name: "soft purple"},
    {hex: "#a6814c", name: "coffee"},
    {hex: "#a6c875", name: "light moss green"},
    {hex: "#a6fbb2", name: "light mint green"},
    {hex: "#a75e09", name: "raw umber"},
    {hex: "#a7ffb5", name: "light seafoam green"},
    {hex: "#a83c09", name: "rust"},
    {hex: "#a8415b", name: "light burgundy"},
    {hex: "#a87900", name: "bronze"},
    {hex: "#a87dc2", name: "wisteria"},
    {hex: "#a88905", name: "dark mustard"},
    {hex: "#a88f59", name: "dark sand"},
    {hex: "#a8a495", name: "greyish"},
    {hex: "#a8b504", name: "mustard green"},
    {hex: "#a8ff04", name: "electric lime"},
    {hex: "#a90308", name: "darkish red"},
    {hex: "#a9561e", name: "sienna"},
    {hex: "#a9be70", name: "tan green"},
    {hex: "#a9f971", name: "spring green"},
    {hex: "#aa23ff", name: "electric purple"},
    {hex: "#aa2704", name: "rust red"},
    {hex: "#aaa662", name: "khaki"},
    {hex: "#aaff32", name: "lime"},
    {hex: "#ab1239", name: "rouge"},
    {hex: "#ab7e4c", name: "tan brown"},
    {hex: "#ab9004", name: "baby poo"},
    {hex: "#ac1db8", name: "barney"},
    {hex: "#ac4f06", name: "cinnamon"},
    {hex: "#ac7434", name: "leather"},
    {hex: "#ac7e04", name: "mustard brown"},
    {hex: "#ac86a8", name: "dusty lavender"},
    {hex: "#ac9362", name: "dark beige"},
    {hex: "#acbb0d", name: "snot"},
    {hex: "#acbf69", name: "light olive"},
    {hex: "#acc2d9", name: "cloudy blue"},
    {hex: "#acfffc", name: "light cyan"},
    {hex: "#ad03de", name: "vibrant purple"},
    {hex: "#ad0afd", name: "bright violet"},
    {hex: "#ad8150", name: "light brown"},
    {hex: "#ad900d", name: "baby shit brown"},
    {hex: "#ada587", name: "stone"},
    {hex: "#adf802", name: "lemon green"},
    {hex: "#ae7181", name: "mauve"},
    {hex: "#ae8b0c", name: "yellowy brown"},
    {hex: "#aefd6c", name: "light lime"},
    {hex: "#aeff6e", name: "key lime"},
    {hex: "#af2f0d", name: "rusty red"},
    {hex: "#af6f09", name: "caramel"},
    {hex: "#af884a", name: "dark tan"},
    {hex: "#afa88b", name: "bland"},
    {hex: "#b00149", name: "raspberry"},
    {hex: "#b0054b", name: "purplish red"},
    {hex: "#b04e0f", name: "burnt sienna"},
    {hex: "#b0dd16", name: "yellowish green"},
    {hex: "#b0ff9d", name: "pastel green"},
    {hex: "#b16002", name: "orangey brown"},
    {hex: "#b17261", name: "pinkish brown"},
    {hex: "#b1916e", name: "pale brown"},
    {hex: "#b1d1fc", name: "powder blue"},
    {hex: "#b1d27b", name: "pale olive green"},
    {hex: "#b1fc99", name: "pale light green"},
    {hex: "#b1ff65", name: "pale lime green"},
    {hex: "#b25f03", name: "orangish brown"},
    {hex: "#b26400", name: "umber"},
    {hex: "#b2713d", name: "clay brown"},
    {hex: "#b27a01", name: "golden brown"},
    {hex: "#b29705", name: "brown yellow"},
    {hex: "#b2996e", name: "dust"},
    {hex: "#b2fba5", name: "light pastel green"},
    {hex: "#b36ff6", name: "light urple"},
    {hex: "#b5485d", name: "dark rose"},
    {hex: "#b59410", name: "dark gold"},
    {hex: "#b5c306", name: "bile"},
    {hex: "#b5ce08", name: "green/yellow"},
    {hex: "#b66325", name: "copper"},
    {hex: "#b66a50", name: "clay"},
    {hex: "#b6c406", name: "baby puke green"},
    {hex: "#b6ffbb", name: "light mint"},
    {hex: "#b75203", name: "burnt siena"},
    {hex: "#b790d4", name: "pale purple"},
    {hex: "#b79400", name: "yellow brown"},
    {hex: "#b7c9e2", name: "light blue grey"},
    {hex: "#b7e1a1", name: "light grey green"},
    {hex: "#b7fffa", name: "pale cyan"},
    {hex: "#b8ffeb", name: "pale aqua"},
    {hex: "#b9484e", name: "dusty red"},
    {hex: "#b96902", name: "brown orange"},
    {hex: "#b9a281", name: "taupe"},
    {hex: "#b9cc81", name: "pale olive"},
    {hex: "#b9ff66", name: "light lime green"},
    {hex: "#ba6873", name: "dusky rose"},
    {hex: "#ba9e88", name: "mushroom"},
    {hex: "#bb3f3f", name: "dull red"},
    {hex: "#bbf90f", name: "yellowgreen"},
    {hex: "#bc13fe", name: "neon purple"},
    {hex: "#bccb7a", name: "greenish tan"},
    {hex: "#bcecac", name: "light sage"},
    {hex: "#bcf5a6", name: "washed out green"},
    {hex: "#bd6c48", name: "adobe"},
    {hex: "#bdf6fe", name: "pale sky blue"},
    {hex: "#bdf8a3", name: "tea green"},
    {hex: "#be0119", name: "scarlet"},
    {hex: "#be013c", name: "rose red"},
    {hex: "#be03fd", name: "bright purple"},
    {hex: "#be6400", name: "orange brown"},
    {hex: "#beae8a", name: "putty"},
    {hex: "#befd73", name: "pale lime"},
    {hex: "#befdb7", name: "celadon"},
    {hex: "#bf77f6", name: "light purple"},
    {hex: "#bf9005", name: "ochre"},
    {hex: "#bf9b0c", name: "ocher"},
    {hex: "#bfac05", name: "muddy yellow"},
    {hex: "#bff128", name: "yellowy green"},
    {hex: "#bffe28", name: "lemon lime"},
    {hex: "#c0022f", name: "lipstick red"},
    {hex: "#c04e01", name: "burnt orange"},
    {hex: "#c071fe", name: "easter purple"},
    {hex: "#c0737a", name: "dusty rose"},
    {hex: "#c0fa8b", name: "pistachio"},
    {hex: "#c0fb2d", name: "yellow green"},
    {hex: "#c14a09", name: "brick orange"},
    {hex: "#c1c6fc", name: "light periwinkle"},
    {hex: "#c1f80a", name: "chartreuse"},
    {hex: "#c1fd95", name: "celery"},
    {hex: "#c20078", name: "magenta"},
    {hex: "#c27e79", name: "brownish pink"},
    {hex: "#c292a1", name: "light mauve"},
    {hex: "#c2b709", name: "olive yellow"},
    {hex: "#c2be0e", name: "puke yellow"},
    {hex: "#c2ff89", name: "light yellowish green"},
    {hex: "#c3909b", name: "grey pink"},
    {hex: "#c3fbf4", name: "duck egg blue"},
    {hex: "#c44240", name: "reddish"},
    {hex: "#c45508", name: "rust orange"},
    {hex: "#c48efd", name: "liliac"},
    {hex: "#c4a661", name: "sandy brown"},
    {hex: "#c4fe82", name: "light pea green"},
    {hex: "#c4fff7", name: "eggshell blue"},
    {hex: "#c5c9c7", name: "silver"},
    {hex: "#c65102", name: "dark orange"},
    {hex: "#c69c04", name: "ocre"},
    {hex: "#c69f59", name: "camel"},
    {hex: "#c6f808", name: "greeny yellow"},
    {hex: "#c6fcff", name: "light sky blue"},
    {hex: "#c74767", name: "deep rose"},
    {hex: "#c760ff", name: "bright lavender"},
    {hex: "#c77986", name: "old pink"},
    {hex: "#c79fef", name: "lavender"},
    {hex: "#c7ac7d", name: "toupe"},
    {hex: "#c7c10c", name: "vomit yellow"},
    {hex: "#c7fdb5", name: "pale green"},
    {hex: "#c83cb9", name: "purpley pink"},
    {hex: "#c85a53", name: "dark salmon"},
    {hex: "#c875c4", name: "orchid"},
    {hex: "#c87606", name: "dirty orange"},
    {hex: "#c87f89", name: "old rose"},
    {hex: "#c88d94", name: "greyish pink"},
    {hex: "#c8aca9", name: "pinkish grey"},
    {hex: "#c8fd3d", name: "yellow/green"},
    {hex: "#c8ffb0", name: "light light green"},
    {hex: "#c94cbe", name: "pinky purple"},
    {hex: "#c95efb", name: "bright lilac"},
    {hex: "#c9643b", name: "terra cotta"},
    {hex: "#c9ae74", name: "sandstone"},
    {hex: "#c9b003", name: "brownish yellow"},
    {hex: "#c9d179", name: "greenish beige"},
    {hex: "#c9ff27", name: "green yellow"},
    {hex: "#ca0147", name: "ruby"},
    {hex: "#ca6641", name: "terracotta"},
    {hex: "#ca6b02", name: "browny orange"},
    {hex: "#ca7b80", name: "dirty pink"},
    {hex: "#ca9bf7", name: "baby purple"},
    {hex: "#caa0ff", name: "pastel purple"},
    {hex: "#cafffb", name: "light light blue"},
    {hex: "#cb00f5", name: "hot purple"},
    {hex: "#cb0162", name: "deep pink"},
    {hex: "#cb416b", name: "dark pink"},
    {hex: "#cb6843", name: "terracota"},
    {hex: "#cb7723", name: "brownish orange"},
    {hex: "#cb9d06", name: "yellow ochre"},
    {hex: "#cba560", name: "sand brown"},
    {hex: "#cbf85f", name: "pear"},
    {hex: "#cc7a8b", name: "dusky pink"},
    {hex: "#ccad60", name: "desert"},
    {hex: "#ccfd7f", name: "light yellow green"},
    {hex: "#cd5909", name: "rusty orange"},
    {hex: "#cd7584", name: "ugly pink"},
    {hex: "#cdc50a", name: "dirty yellow"},
    {hex: "#cdfd02", name: "greenish yellow"},
    {hex: "#ce5dae", name: "purplish pink"},
    {hex: "#cea2fd", name: "lilac"},
    {hex: "#ceaefa", name: "pale violet"},
    {hex: "#ceb301", name: "mustard"},
    {hex: "#cf0234", name: "cherry"},
    {hex: "#cf524e", name: "dark coral"},
    {hex: "#cf6275", name: "rose"},
    {hex: "#cfaf7b", name: "fawn"},
    {hex: "#cffdbc", name: "very pale green"},
    {hex: "#cfff04", name: "neon yellow"},
    {hex: "#d0c101", name: "ugly yellow"},
    {hex: "#d0e429", name: "sickly yellow"},
    {hex: "#d0fe1d", name: "lime yellow"},
    {hex: "#d0fefe", name: "pale blue"},
    {hex: "#d1768f", name: "muted pink"},
    {hex: "#d1b26f", name: "tan"},
    {hex: "#d1ffbd", name: "very light green"},
    {hex: "#d2bd0a", name: "mustard yellow"},
    {hex: "#d3494e", name: "faded red"},
    {hex: "#d3b683", name: "very light brown"},
    {hex: "#d46a7e", name: "pinkish"},
    {hex: "#d4ffff", name: "really light blue"},
    {hex: "#d5174e", name: "lipstick"},
    {hex: "#d5869d", name: "dull pink"},
    {hex: "#d58a94", name: "dusty pink"},
    {hex: "#d5ab09", name: "burnt yellow"},
    {hex: "#d5b60a", name: "dark yellow"},
    {hex: "#d5ffff", name: "very light blue"},
    {hex: "#d648d7", name: "pinkish purple"},
    {hex: "#d6b4fc", name: "light violet"},
    {hex: "#d6fffa", name: "ice"},
    {hex: "#d6fffe", name: "very pale blue"},
    {hex: "#d725de", name: "purple/pink"},
    {hex: "#d767ad", name: "pale magenta"},
    {hex: "#d7fffe", name: "ice blue"},
    {hex: "#d8863b", name: "dull orange"},
    {hex: "#d8dcd6", name: "light grey"},
    {hex: "#d90166", name: "dark hot pink"},
    {hex: "#d94ff5", name: "heliotrope"},
    {hex: "#d9544d", name: "pale red"},
    {hex: "#d99b82", name: "pinkish tan"},
    {hex: "#da467d", name: "darkish pink"},
    {hex: "#db4bda", name: "pink purple"},
    {hex: "#db5856", name: "pastel red"},
    {hex: "#dbb40c", name: "gold"},
    {hex: "#dc4d01", name: "deep orange"},
    {hex: "#dd85d7", name: "lavender pink"},
    {hex: "#ddd618", name: "piss yellow"},
    {hex: "#de0c62", name: "cerise"},
    {hex: "#de7e5d", name: "dark peach"},
    {hex: "#de9dac", name: "faded pink"},
    {hex: "#df4ec8", name: "purpleish pink"},
    {hex: "#dfc5fe", name: "light lavender"},
    {hex: "#e03fd8", name: "purple pink"},
    {hex: "#e17701", name: "pumpkin"},
    {hex: "#e2ca76", name: "sand"},
    {hex: "#e4cbff", name: "pale lilac"},
    {hex: "#e50000", name: "red"},
    {hex: "#e6daa6", name: "beige"},
    {hex: "#e6f2a2", name: "light khaki"},
    {hex: "#e78ea5", name: "pig pink"},
    {hex: "#ec2d01", name: "tomato red"},
    {hex: "#ed0dd9", name: "fuchsia"},
    {hex: "#edc8ff", name: "light lilac"},
    {hex: "#eecffe", name: "pale lavender"},
    {hex: "#eedc5b", name: "dull yellow"},
    {hex: "#ef1de7", name: "pink/purple"},
    {hex: "#ef4026", name: "tomato"},
    {hex: "#efb435", name: "macaroni and cheese"},
    {hex: "#efc0fe", name: "light lavendar"},
    {hex: "#f075e6", name: "purply pink"},
    {hex: "#f0833a", name: "dusty orange"},
    {hex: "#f0944d", name: "faded orange"},
    {hex: "#f10c45", name: "pinkish red"},
    {hex: "#f1da7a", name: "sandy"},
    {hex: "#f1f33f", name: "off yellow"},
    {hex: "#f29e8e", name: "blush"},
    {hex: "#f2ab15", name: "squash"},
    {hex: "#f36196", name: "medium pink"},
    {hex: "#f4320c", name: "vermillion"},
    {hex: "#f43605", name: "orangish red"},
    {hex: "#f4d054", name: "maize"},
    {hex: "#f504c9", name: "hot magenta"},
    {hex: "#f5054f", name: "pink red"},
    {hex: "#f5bf03", name: "golden"},
    {hex: "#f6688e", name: "rosy pink"},
    {hex: "#f6cefc", name: "very light purple"},
    {hex: "#f7022a", name: "cherry red"},
    {hex: "#f7879a", name: "rose pink"},
    {hex: "#f7d560", name: "light mustard"},
    {hex: "#f8481c", name: "reddish orange"},
    {hex: "#f97306", name: "orange"},
    {hex: "#f9bc08", name: "golden rod"},
    {hex: "#fa2a55", name: "red pink"},
    {hex: "#fa4224", name: "orangey red"},
    {hex: "#fa5ff7", name: "light magenta"},
    {hex: "#fac205", name: "goldenrod"},
    {hex: "#faee66", name: "yellowish"},
    {hex: "#fafe4b", name: "banana yellow"},
    {hex: "#fb2943", name: "strawberry"},
    {hex: "#fb5581", name: "warm pink"},
    {hex: "#fb5ffc", name: "violet pink"},
    {hex: "#fb7d07", name: "pumpkin orange"},
    {hex: "#fbdd7e", name: "wheat"},
    {hex: "#fbeeac", name: "light tan"},
    {hex: "#fc2647", name: "pinky red"},
    {hex: "#fc5a50", name: "coral"},
    {hex: "#fc824a", name: "orangish"},
    {hex: "#fc86aa", name: "pinky"},
    {hex: "#fcb001", name: "yellow orange"},
    {hex: "#fcc006", name: "marigold"},
    {hex: "#fce166", name: "sand yellow"},
    {hex: "#fcf679", name: "straw"},
    {hex: "#fcfc81", name: "yellowish tan"},
    {hex: "#fd3c06", name: "red orange"},
    {hex: "#fd411e", name: "orange red"},
    {hex: "#fd4659", name: "watermelon"},
    {hex: "#fd5956", name: "grapefruit"},
    {hex: "#fd798f", name: "carnation"},
    {hex: "#fd8d49", name: "orangeish"},
    {hex: "#fdaa48", name: "light orange"},
    {hex: "#fdb0c0", name: "soft pink"},
    {hex: "#fdb147", name: "butterscotch"},
    {hex: "#fdb915", name: "orangey yellow"},
    {hex: "#fdc1c5", name: "pale rose"},
    {hex: "#fddc5c", name: "light gold"},
    {hex: "#fdde6c", name: "pale gold"},
    {hex: "#fdee73", name: "sandy yellow"},
    {hex: "#fdfdfe", name: "pale grey"},
    {hex: "#fdff38", name: "lemon yellow"},
    {hex: "#fdff52", name: "lemon"},
    {hex: "#fdff63", name: "canary"},
    {hex: "#fe0002", name: "fire engine red"},
    {hex: "#fe019a", name: "neon pink"},
    {hex: "#fe01b1", name: "bright pink"},
    {hex: "#fe02a2", name: "shocking pink"},
    {hex: "#fe2c54", name: "reddish pink"},
    {hex: "#fe2f4a", name: "lightish red"},
    {hex: "#fe420f", name: "orangered"},
    {hex: "#fe46a5", name: "barbie pink"},
    {hex: "#fe4b03", name: "blood orange"},
    {hex: "#fe7b7c", name: "salmon pink"},
    {hex: "#fe828c", name: "blush pink"},
    {hex: "#fe83cc", name: "bubblegum pink"},
    {hex: "#fe86a4", name: "rosa"},
    {hex: "#fea993", name: "light salmon"},
    {hex: "#feb209", name: "saffron"},
    {hex: "#feb308", name: "amber"},
    {hex: "#fec615", name: "golden yellow"},
    {hex: "#fed0fc", name: "pale mauve"},
    {hex: "#fedf08", name: "dandelion"},
    {hex: "#fef69e", name: "buff"},
    {hex: "#fefcaf", name: "parchment"},
    {hex: "#feff7f", name: "faded yellow"},
    {hex: "#feffca", name: "ecru"},
    {hex: "#ff000d", name: "bright red"},
    {hex: "#ff028d", name: "hot pink"},
    {hex: "#ff0490", name: "electric pink"},
    {hex: "#ff073a", name: "neon red"},
    {hex: "#ff0789", name: "strong pink"},
    {hex: "#ff08e8", name: "bright magenta"},
    {hex: "#ff474c", name: "light red"},
    {hex: "#ff5b00", name: "bright orange"},
    {hex: "#ff6163", name: "coral pink"},
    {hex: "#ff63e9", name: "candy pink"},
    {hex: "#ff69af", name: "bubble gum pink"},
    {hex: "#ff6cb5", name: "bubblegum"},
    {hex: "#ff6f52", name: "orange pink"},
    {hex: "#ff724c", name: "pinkish orange"},
    {hex: "#ff7855", name: "melon"},
    {hex: "#ff796c", name: "salmon"},
    {hex: "#ff7fa7", name: "carnation pink"},
    {hex: "#ff81c0", name: "pink"},
    {hex: "#ff9408", name: "tangerine"},
    {hex: "#ff964f", name: "pastel orange"},
    {hex: "#ff9a8a", name: "peachy pink"},
    {hex: "#ffa62b", name: "mango"},
    {hex: "#ffa756", name: "pale orange"},
    {hex: "#ffab0f", name: "yellowish orange"},
    {hex: "#ffad01", name: "orange yellow"},
    {hex: "#ffb07c", name: "peach"},
    {hex: "#ffb16d", name: "apricot"},
    {hex: "#ffb19a", name: "pale salmon"},
    {hex: "#ffb2d0", name: "powder pink"},
    {hex: "#ffb7ce", name: "baby pink"},
    {hex: "#ffbacd", name: "pastel pink"},
    {hex: "#ffc512", name: "sunflower"},
    {hex: "#ffc5cb", name: "light rose"},
    {hex: "#ffcfdc", name: "pale pink"},
    {hex: "#ffd1df", name: "light pink"},
    {hex: "#ffd8b1", name: "light peach"},
    {hex: "#ffda03", name: "sunflower yellow"},
    {hex: "#ffdf22", name: "sun yellow"},
    {hex: "#ffe36e", name: "yellow tan"},
    {hex: "#ffe5ad", name: "pale peach"},
    {hex: "#fff39a", name: "dark cream"},
    {hex: "#fff4f2", name: "very light pink"},
    {hex: "#fff917", name: "sunny yellow"},
    {hex: "#fff9d0", name: "pale"},
    {hex: "#fffa86", name: "manilla"},
    {hex: "#fffcc4", name: "egg shell"},
    {hex: "#fffd01", name: "bright yellow"},
    {hex: "#fffd37", name: "sunshine yellow"},
    {hex: "#fffd74", name: "butter yellow"},
    {hex: "#fffd78", name: "custard"},
    {hex: "#fffe40", name: "canary yellow"},
    {hex: "#fffe71", name: "pastel yellow"},
    {hex: "#fffe7a", name: "light yellow"},
    {hex: "#fffeb6", name: "light beige"},
    {hex: "#ffff14", name: "yellow"},
    {hex: "#ffff7e", name: "banana"},
    {hex: "#ffff81", name: "butter"},
    {hex: "#ffff84", name: "pale yellow"},
    {hex: "#ffffb6", name: "creme"},
    {hex: "#ffffc2", name: "cream"},
    {hex: "#ffffcb", name: "ivory"},
    {hex: "#ffffd4", name: "eggshell"},
    {hex: "#ffffe4", name: "off white"},
    {hex: "#ffffff", name: "white"}
]

},{}],9:[function(require,module,exports){
/**
 * chroma.js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2019, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 * derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * -------------------------------------------------------
 *
 * chroma.js includes colors from colorbrewer2.org, which are released under
 * the following license:
 *
 * Copyright (c) 2002 Cynthia Brewer, Mark Harrower,
 * and The Pennsylvania State University.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 *
 * ------------------------------------------------------
 *
 * Named colors are taken from X11 Color Names.
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @preserve
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.chroma = factory());
}(this, (function () { 'use strict';

    var limit = function (x, min, max) {
        if ( min === void 0 ) min=0;
        if ( max === void 0 ) max=1;

        return x < min ? min : x > max ? max : x;
    };

    var clip_rgb = function (rgb) {
        rgb._clipped = false;
        rgb._unclipped = rgb.slice(0);
        for (var i=0; i<=3; i++) {
            if (i < 3) {
                if (rgb[i] < 0 || rgb[i] > 255) { rgb._clipped = true; }
                rgb[i] = limit(rgb[i], 0, 255);
            } else if (i === 3) {
                rgb[i] = limit(rgb[i], 0, 1);
            }
        }
        return rgb;
    };

    // ported from jQuery's $.type
    var classToType = {};
    for (var i = 0, list = ['Boolean', 'Number', 'String', 'Function', 'Array', 'Date', 'RegExp', 'Undefined', 'Null']; i < list.length; i += 1) {
        var name = list[i];

        classToType[("[object " + name + "]")] = name.toLowerCase();
    }
    var type = function(obj) {
        return classToType[Object.prototype.toString.call(obj)] || "object";
    };

    var unpack = function (args, keyOrder) {
        if ( keyOrder === void 0 ) keyOrder=null;

    	// if called with more than 3 arguments, we return the arguments
        if (args.length >= 3) { return Array.prototype.slice.call(args); }
        // with less than 3 args we check if first arg is object
        // and use the keyOrder string to extract and sort properties
    	if (type(args[0]) == 'object' && keyOrder) {
    		return keyOrder.split('')
    			.filter(function (k) { return args[0][k] !== undefined; })
    			.map(function (k) { return args[0][k]; });
    	}
    	// otherwise we just return the first argument
    	// (which we suppose is an array of args)
        return args[0];
    };

    var last = function (args) {
        if (args.length < 2) { return null; }
        var l = args.length-1;
        if (type(args[l]) == 'string') { return args[l].toLowerCase(); }
        return null;
    };

    var PI = Math.PI;

    var utils = {
    	clip_rgb: clip_rgb,
    	limit: limit,
    	type: type,
    	unpack: unpack,
    	last: last,
    	PI: PI,
    	TWOPI: PI*2,
    	PITHIRD: PI/3,
    	DEG2RAD: PI / 180,
    	RAD2DEG: 180 / PI
    };

    var input = {
    	format: {},
    	autodetect: []
    };

    var last$1 = utils.last;
    var clip_rgb$1 = utils.clip_rgb;
    var type$1 = utils.type;


    var Color = function Color() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var me = this;
        if (type$1(args[0]) === 'object' &&
            args[0].constructor &&
            args[0].constructor === this.constructor) {
            // the argument is already a Color instance
            return args[0];
        }

        // last argument could be the mode
        var mode = last$1(args);
        var autodetect = false;

        if (!mode) {
            autodetect = true;
            if (!input.sorted) {
                input.autodetect = input.autodetect.sort(function (a,b) { return b.p - a.p; });
                input.sorted = true;
            }
            // auto-detect format
            for (var i = 0, list = input.autodetect; i < list.length; i += 1) {
                var chk = list[i];

                mode = chk.test.apply(chk, args);
                if (mode) { break; }
            }
        }

        if (input.format[mode]) {
            var rgb = input.format[mode].apply(null, autodetect ? args : args.slice(0,-1));
            me._rgb = clip_rgb$1(rgb);
        } else {
            throw new Error('unknown format: '+args);
        }

        // add alpha channel
        if (me._rgb.length === 3) { me._rgb.push(1); }
    };

    Color.prototype.toString = function toString () {
        if (type$1(this.hex) == 'function') { return this.hex(); }
        return ("[" + (this._rgb.join(',')) + "]");
    };

    var Color_1 = Color;

    var chroma = function () {
    	var args = [], len = arguments.length;
    	while ( len-- ) args[ len ] = arguments[ len ];

    	return new (Function.prototype.bind.apply( chroma.Color, [ null ].concat( args) ));
    };

    chroma.Color = Color_1;
    chroma.version = '2.1.0';

    var chroma_1 = chroma;

    var unpack$1 = utils.unpack;
    var max = Math.max;

    var rgb2cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$1(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r = r / 255;
        g = g / 255;
        b = b / 255;
        var k = 1 - max(r,max(g,b));
        var f = k < 1 ? 1 / (1-k) : 0;
        var c = (1-r-k) * f;
        var m = (1-g-k) * f;
        var y = (1-b-k) * f;
        return [c,m,y,k];
    };

    var rgb2cmyk_1 = rgb2cmyk;

    var unpack$2 = utils.unpack;

    var cmyk2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$2(args, 'cmyk');
        var c = args[0];
        var m = args[1];
        var y = args[2];
        var k = args[3];
        var alpha = args.length > 4 ? args[4] : 1;
        if (k === 1) { return [0,0,0,alpha]; }
        return [
            c >= 1 ? 0 : 255 * (1-c) * (1-k), // r
            m >= 1 ? 0 : 255 * (1-m) * (1-k), // g
            y >= 1 ? 0 : 255 * (1-y) * (1-k), // b
            alpha
        ];
    };

    var cmyk2rgb_1 = cmyk2rgb;

    var unpack$3 = utils.unpack;
    var type$2 = utils.type;



    Color_1.prototype.cmyk = function() {
        return rgb2cmyk_1(this._rgb);
    };

    chroma_1.cmyk = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['cmyk']) ));
    };

    input.format.cmyk = cmyk2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$3(args, 'cmyk');
            if (type$2(args) === 'array' && args.length === 4) {
                return 'cmyk';
            }
        }
    });

    var unpack$4 = utils.unpack;
    var last$2 = utils.last;
    var rnd = function (a) { return Math.round(a*100)/100; };

    /*
     * supported arguments:
     * - hsl2css(h,s,l)
     * - hsl2css(h,s,l,a)
     * - hsl2css([h,s,l], mode)
     * - hsl2css([h,s,l,a], mode)
     * - hsl2css({h,s,l,a}, mode)
     */
    var hsl2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hsla = unpack$4(args, 'hsla');
        var mode = last$2(args) || 'lsa';
        hsla[0] = rnd(hsla[0] || 0);
        hsla[1] = rnd(hsla[1]*100) + '%';
        hsla[2] = rnd(hsla[2]*100) + '%';
        if (mode === 'hsla' || (hsla.length > 3 && hsla[3]<1)) {
            hsla[3] = hsla.length > 3 ? hsla[3] : 1;
            mode = 'hsla';
        } else {
            hsla.length = 3;
        }
        return (mode + "(" + (hsla.join(',')) + ")");
    };

    var hsl2css_1 = hsl2css;

    var unpack$5 = utils.unpack;

    /*
     * supported arguments:
     * - rgb2hsl(r,g,b)
     * - rgb2hsl(r,g,b,a)
     * - rgb2hsl([r,g,b])
     * - rgb2hsl([r,g,b,a])
     * - rgb2hsl({r,g,b,a})
     */
    var rgb2hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$5(args, 'rgba');
        var r = args[0];
        var g = args[1];
        var b = args[2];

        r /= 255;
        g /= 255;
        b /= 255;

        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);

        var l = (max + min) / 2;
        var s, h;

        if (max === min){
            s = 0;
            h = Number.NaN;
        } else {
            s = l < 0.5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        }

        if (r == max) { h = (g - b) / (max - min); }
        else if (g == max) { h = 2 + (b - r) / (max - min); }
        else if (b == max) { h = 4 + (r - g) / (max - min); }

        h *= 60;
        if (h < 0) { h += 360; }
        if (args.length>3 && args[3]!==undefined) { return [h,s,l,args[3]]; }
        return [h,s,l];
    };

    var rgb2hsl_1 = rgb2hsl;

    var unpack$6 = utils.unpack;
    var last$3 = utils.last;


    var round = Math.round;

    /*
     * supported arguments:
     * - rgb2css(r,g,b)
     * - rgb2css(r,g,b,a)
     * - rgb2css([r,g,b], mode)
     * - rgb2css([r,g,b,a], mode)
     * - rgb2css({r,g,b,a}, mode)
     */
    var rgb2css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$6(args, 'rgba');
        var mode = last$3(args) || 'rgb';
        if (mode.substr(0,3) == 'hsl') {
            return hsl2css_1(rgb2hsl_1(rgba), mode);
        }
        rgba[0] = round(rgba[0]);
        rgba[1] = round(rgba[1]);
        rgba[2] = round(rgba[2]);
        if (mode === 'rgba' || (rgba.length > 3 && rgba[3]<1)) {
            rgba[3] = rgba.length > 3 ? rgba[3] : 1;
            mode = 'rgba';
        }
        return (mode + "(" + (rgba.slice(0,mode==='rgb'?3:4).join(',')) + ")");
    };

    var rgb2css_1 = rgb2css;

    var unpack$7 = utils.unpack;
    var round$1 = Math.round;

    var hsl2rgb = function () {
        var assign;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$7(args, 'hsl');
        var h = args[0];
        var s = args[1];
        var l = args[2];
        var r,g,b;
        if (s === 0) {
            r = g = b = l*255;
        } else {
            var t3 = [0,0,0];
            var c = [0,0,0];
            var t2 = l < 0.5 ? l * (1+s) : l+s-l*s;
            var t1 = 2 * l - t2;
            var h_ = h / 360;
            t3[0] = h_ + 1/3;
            t3[1] = h_;
            t3[2] = h_ - 1/3;
            for (var i=0; i<3; i++) {
                if (t3[i] < 0) { t3[i] += 1; }
                if (t3[i] > 1) { t3[i] -= 1; }
                if (6 * t3[i] < 1)
                    { c[i] = t1 + (t2 - t1) * 6 * t3[i]; }
                else if (2 * t3[i] < 1)
                    { c[i] = t2; }
                else if (3 * t3[i] < 2)
                    { c[i] = t1 + (t2 - t1) * ((2 / 3) - t3[i]) * 6; }
                else
                    { c[i] = t1; }
            }
            (assign = [round$1(c[0]*255),round$1(c[1]*255),round$1(c[2]*255)], r = assign[0], g = assign[1], b = assign[2]);
        }
        if (args.length > 3) {
            // keep alpha channel
            return [r,g,b,args[3]];
        }
        return [r,g,b,1];
    };

    var hsl2rgb_1 = hsl2rgb;

    var RE_RGB = /^rgb\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*\)$/;
    var RE_RGBA = /^rgba\(\s*(-?\d+),\s*(-?\d+)\s*,\s*(-?\d+)\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_RGB_PCT = /^rgb\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_RGBA_PCT = /^rgba\(\s*(-?\d+(?:\.\d+)?)%,\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;
    var RE_HSL = /^hsl\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*\)$/;
    var RE_HSLA = /^hsla\(\s*(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)%\s*,\s*(-?\d+(?:\.\d+)?)%\s*,\s*([01]|[01]?\.\d+)\)$/;

    var round$2 = Math.round;

    var css2rgb = function (css) {
        css = css.toLowerCase().trim();
        var m;

        if (input.format.named) {
            try {
                return input.format.named(css);
            } catch (e) {
                // eslint-disable-next-line
            }
        }

        // rgb(250,20,0)
        if ((m = css.match(RE_RGB))) {
            var rgb = m.slice(1,4);
            for (var i=0; i<3; i++) {
                rgb[i] = +rgb[i];
            }
            rgb[3] = 1;  // default alpha
            return rgb;
        }

        // rgba(250,20,0,0.4)
        if ((m = css.match(RE_RGBA))) {
            var rgb$1 = m.slice(1,5);
            for (var i$1=0; i$1<4; i$1++) {
                rgb$1[i$1] = +rgb$1[i$1];
            }
            return rgb$1;
        }

        // rgb(100%,0%,0%)
        if ((m = css.match(RE_RGB_PCT))) {
            var rgb$2 = m.slice(1,4);
            for (var i$2=0; i$2<3; i$2++) {
                rgb$2[i$2] = round$2(rgb$2[i$2] * 2.55);
            }
            rgb$2[3] = 1;  // default alpha
            return rgb$2;
        }

        // rgba(100%,0%,0%,0.4)
        if ((m = css.match(RE_RGBA_PCT))) {
            var rgb$3 = m.slice(1,5);
            for (var i$3=0; i$3<3; i$3++) {
                rgb$3[i$3] = round$2(rgb$3[i$3] * 2.55);
            }
            rgb$3[3] = +rgb$3[3];
            return rgb$3;
        }

        // hsl(0,100%,50%)
        if ((m = css.match(RE_HSL))) {
            var hsl = m.slice(1,4);
            hsl[1] *= 0.01;
            hsl[2] *= 0.01;
            var rgb$4 = hsl2rgb_1(hsl);
            rgb$4[3] = 1;
            return rgb$4;
        }

        // hsla(0,100%,50%,0.5)
        if ((m = css.match(RE_HSLA))) {
            var hsl$1 = m.slice(1,4);
            hsl$1[1] *= 0.01;
            hsl$1[2] *= 0.01;
            var rgb$5 = hsl2rgb_1(hsl$1);
            rgb$5[3] = +m[4];  // default alpha = 1
            return rgb$5;
        }
    };

    css2rgb.test = function (s) {
        return RE_RGB.test(s) ||
            RE_RGBA.test(s) ||
            RE_RGB_PCT.test(s) ||
            RE_RGBA_PCT.test(s) ||
            RE_HSL.test(s) ||
            RE_HSLA.test(s);
    };

    var css2rgb_1 = css2rgb;

    var type$3 = utils.type;




    Color_1.prototype.css = function(mode) {
        return rgb2css_1(this._rgb, mode);
    };

    chroma_1.css = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['css']) ));
    };

    input.format.css = css2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$3(h) === 'string' && css2rgb_1.test(h)) {
                return 'css';
            }
        }
    });

    var unpack$8 = utils.unpack;

    input.format.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$8(args, 'rgba');
        rgb[0] *= 255;
        rgb[1] *= 255;
        rgb[2] *= 255;
        return rgb;
    };

    chroma_1.gl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['gl']) ));
    };

    Color_1.prototype.gl = function() {
        var rgb = this._rgb;
        return [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]];
    };

    var unpack$9 = utils.unpack;

    var rgb2hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$9(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var min = Math.min(r, g, b);
        var max = Math.max(r, g, b);
        var delta = max - min;
        var c = delta * 100 / 255;
        var _g = min / (255 - delta) * 100;
        var h;
        if (delta === 0) {
            h = Number.NaN;
        } else {
            if (r === max) { h = (g - b) / delta; }
            if (g === max) { h = 2+(b - r) / delta; }
            if (b === max) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, c, _g];
    };

    var rgb2hcg_1 = rgb2hcg;

    var unpack$a = utils.unpack;
    var floor = Math.floor;

    /*
     * this is basically just HSV with some minor tweaks
     *
     * hue.. [0..360]
     * chroma .. [0..1]
     * grayness .. [0..1]
     */

    var hcg2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$a(args, 'hcg');
        var h = args[0];
        var c = args[1];
        var _g = args[2];
        var r,g,b;
        _g = _g * 255;
        var _c = c * 255;
        if (c === 0) {
            r = g = b = _g;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;
            var i = floor(h);
            var f = h - i;
            var p = _g * (1 - c);
            var q = p + _c * (1 - f);
            var t = p + _c * f;
            var v = p + _c;
            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var hcg2rgb_1 = hcg2rgb;

    var unpack$b = utils.unpack;
    var type$4 = utils.type;






    Color_1.prototype.hcg = function() {
        return rgb2hcg_1(this._rgb);
    };

    chroma_1.hcg = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcg']) ));
    };

    input.format.hcg = hcg2rgb_1;

    input.autodetect.push({
        p: 1,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$b(args, 'hcg');
            if (type$4(args) === 'array' && args.length === 3) {
                return 'hcg';
            }
        }
    });

    var unpack$c = utils.unpack;
    var last$4 = utils.last;
    var round$3 = Math.round;

    var rgb2hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$c(args, 'rgba');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var a = ref[3];
        var mode = last$4(args) || 'auto';
        if (a === undefined) { a = 1; }
        if (mode === 'auto') {
            mode = a < 1 ? 'rgba' : 'rgb';
        }
        r = round$3(r);
        g = round$3(g);
        b = round$3(b);
        var u = r << 16 | g << 8 | b;
        var str = "000000" + u.toString(16); //#.toUpperCase();
        str = str.substr(str.length - 6);
        var hxa = '0' + round$3(a * 255).toString(16);
        hxa = hxa.substr(hxa.length - 2);
        switch (mode.toLowerCase()) {
            case 'rgba': return ("#" + str + hxa);
            case 'argb': return ("#" + hxa + str);
            default: return ("#" + str);
        }
    };

    var rgb2hex_1 = rgb2hex;

    var RE_HEX = /^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var RE_HEXA = /^#?([A-Fa-f0-9]{8}|[A-Fa-f0-9]{4})$/;

    var hex2rgb = function (hex) {
        if (hex.match(RE_HEX)) {
            // remove optional leading #
            if (hex.length === 4 || hex.length === 7) {
                hex = hex.substr(1);
            }
            // expand short-notation to full six-digit
            if (hex.length === 3) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
            }
            var u = parseInt(hex, 16);
            var r = u >> 16;
            var g = u >> 8 & 0xFF;
            var b = u & 0xFF;
            return [r,g,b,1];
        }

        // match rgba hex format, eg #FF000077
        if (hex.match(RE_HEXA)) {
            if (hex.length === 5 || hex.length === 9) {
                // remove optional leading #
                hex = hex.substr(1);
            }
            // expand short-notation to full eight-digit
            if (hex.length === 4) {
                hex = hex.split('');
                hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]+hex[3]+hex[3];
            }
            var u$1 = parseInt(hex, 16);
            var r$1 = u$1 >> 24 & 0xFF;
            var g$1 = u$1 >> 16 & 0xFF;
            var b$1 = u$1 >> 8 & 0xFF;
            var a = Math.round((u$1 & 0xFF) / 0xFF * 100) / 100;
            return [r$1,g$1,b$1,a];
        }

        // we used to check for css colors here
        // if _input.css? and rgb = _input.css hex
        //     return rgb

        throw new Error(("unknown hex color: " + hex));
    };

    var hex2rgb_1 = hex2rgb;

    var type$5 = utils.type;




    Color_1.prototype.hex = function(mode) {
        return rgb2hex_1(this._rgb, mode);
    };

    chroma_1.hex = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hex']) ));
    };

    input.format.hex = hex2rgb_1;
    input.autodetect.push({
        p: 4,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$5(h) === 'string' && [3,4,5,6,7,8,9].indexOf(h.length) >= 0) {
                return 'hex';
            }
        }
    });

    var unpack$d = utils.unpack;
    var TWOPI = utils.TWOPI;
    var min = Math.min;
    var sqrt = Math.sqrt;
    var acos = Math.acos;

    var rgb2hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/rgb2hsi.cpp
        */
        var ref = unpack$d(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        r /= 255;
        g /= 255;
        b /= 255;
        var h;
        var min_ = min(r,g,b);
        var i = (r+g+b) / 3;
        var s = i > 0 ? 1 - min_/i : 0;
        if (s === 0) {
            h = NaN;
        } else {
            h = ((r-g)+(r-b)) / 2;
            h /= sqrt((r-g)*(r-g) + (r-b)*(g-b));
            h = acos(h);
            if (b > g) {
                h = TWOPI - h;
            }
            h /= TWOPI;
        }
        return [h*360,s,i];
    };

    var rgb2hsi_1 = rgb2hsi;

    var unpack$e = utils.unpack;
    var limit$1 = utils.limit;
    var TWOPI$1 = utils.TWOPI;
    var PITHIRD = utils.PITHIRD;
    var cos = Math.cos;

    /*
     * hue [0..360]
     * saturation [0..1]
     * intensity [0..1]
     */
    var hsi2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        borrowed from here:
        http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
        */
        args = unpack$e(args, 'hsi');
        var h = args[0];
        var s = args[1];
        var i = args[2];
        var r,g,b;

        if (isNaN(h)) { h = 0; }
        if (isNaN(s)) { s = 0; }
        // normalize hue
        if (h > 360) { h -= 360; }
        if (h < 0) { h += 360; }
        h /= 360;
        if (h < 1/3) {
            b = (1-s)/3;
            r = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            g = 1 - (b+r);
        } else if (h < 2/3) {
            h -= 1/3;
            r = (1-s)/3;
            g = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            b = 1 - (r+g);
        } else {
            h -= 2/3;
            g = (1-s)/3;
            b = (1+s*cos(TWOPI$1*h)/cos(PITHIRD-TWOPI$1*h))/3;
            r = 1 - (g+b);
        }
        r = limit$1(i*r*3);
        g = limit$1(i*g*3);
        b = limit$1(i*b*3);
        return [r*255, g*255, b*255, args.length > 3 ? args[3] : 1];
    };

    var hsi2rgb_1 = hsi2rgb;

    var unpack$f = utils.unpack;
    var type$6 = utils.type;






    Color_1.prototype.hsi = function() {
        return rgb2hsi_1(this._rgb);
    };

    chroma_1.hsi = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsi']) ));
    };

    input.format.hsi = hsi2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$f(args, 'hsi');
            if (type$6(args) === 'array' && args.length === 3) {
                return 'hsi';
            }
        }
    });

    var unpack$g = utils.unpack;
    var type$7 = utils.type;






    Color_1.prototype.hsl = function() {
        return rgb2hsl_1(this._rgb);
    };

    chroma_1.hsl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsl']) ));
    };

    input.format.hsl = hsl2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$g(args, 'hsl');
            if (type$7(args) === 'array' && args.length === 3) {
                return 'hsl';
            }
        }
    });

    var unpack$h = utils.unpack;
    var min$1 = Math.min;
    var max$1 = Math.max;

    /*
     * supported arguments:
     * - rgb2hsv(r,g,b)
     * - rgb2hsv([r,g,b])
     * - rgb2hsv({r,g,b})
     */
    var rgb2hsl$1 = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$h(args, 'rgb');
        var r = args[0];
        var g = args[1];
        var b = args[2];
        var min_ = min$1(r, g, b);
        var max_ = max$1(r, g, b);
        var delta = max_ - min_;
        var h,s,v;
        v = max_ / 255.0;
        if (max_ === 0) {
            h = Number.NaN;
            s = 0;
        } else {
            s = delta / max_;
            if (r === max_) { h = (g - b) / delta; }
            if (g === max_) { h = 2+(b - r) / delta; }
            if (b === max_) { h = 4+(r - g) / delta; }
            h *= 60;
            if (h < 0) { h += 360; }
        }
        return [h, s, v]
    };

    var rgb2hsv = rgb2hsl$1;

    var unpack$i = utils.unpack;
    var floor$1 = Math.floor;

    var hsv2rgb = function () {
        var assign, assign$1, assign$2, assign$3, assign$4, assign$5;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        args = unpack$i(args, 'hsv');
        var h = args[0];
        var s = args[1];
        var v = args[2];
        var r,g,b;
        v *= 255;
        if (s === 0) {
            r = g = b = v;
        } else {
            if (h === 360) { h = 0; }
            if (h > 360) { h -= 360; }
            if (h < 0) { h += 360; }
            h /= 60;

            var i = floor$1(h);
            var f = h - i;
            var p = v * (1 - s);
            var q = v * (1 - s * f);
            var t = v * (1 - s * (1 - f));

            switch (i) {
                case 0: (assign = [v, t, p], r = assign[0], g = assign[1], b = assign[2]); break
                case 1: (assign$1 = [q, v, p], r = assign$1[0], g = assign$1[1], b = assign$1[2]); break
                case 2: (assign$2 = [p, v, t], r = assign$2[0], g = assign$2[1], b = assign$2[2]); break
                case 3: (assign$3 = [p, q, v], r = assign$3[0], g = assign$3[1], b = assign$3[2]); break
                case 4: (assign$4 = [t, p, v], r = assign$4[0], g = assign$4[1], b = assign$4[2]); break
                case 5: (assign$5 = [v, p, q], r = assign$5[0], g = assign$5[1], b = assign$5[2]); break
            }
        }
        return [r,g,b,args.length > 3?args[3]:1];
    };

    var hsv2rgb_1 = hsv2rgb;

    var unpack$j = utils.unpack;
    var type$8 = utils.type;






    Color_1.prototype.hsv = function() {
        return rgb2hsv(this._rgb);
    };

    chroma_1.hsv = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hsv']) ));
    };

    input.format.hsv = hsv2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$j(args, 'hsv');
            if (type$8(args) === 'array' && args.length === 3) {
                return 'hsv';
            }
        }
    });

    var labConstants = {
        // Corresponds roughly to RGB brighter/darker
        Kn: 18,

        // D65 standard referent
        Xn: 0.950470,
        Yn: 1,
        Zn: 1.088830,

        t0: 0.137931034,  // 4 / 29
        t1: 0.206896552,  // 6 / 29
        t2: 0.12841855,   // 3 * t1 * t1
        t3: 0.008856452,  // t1 * t1 * t1
    };

    var unpack$k = utils.unpack;
    var pow = Math.pow;

    var rgb2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$k(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2xyz(r,g,b);
        var x = ref$1[0];
        var y = ref$1[1];
        var z = ref$1[2];
        var l = 116 * y - 16;
        return [l < 0 ? 0 : l, 500 * (x - y), 200 * (y - z)];
    };

    var rgb_xyz = function (r) {
        if ((r /= 255) <= 0.04045) { return r / 12.92; }
        return pow((r + 0.055) / 1.055, 2.4);
    };

    var xyz_lab = function (t) {
        if (t > labConstants.t3) { return pow(t, 1 / 3); }
        return t / labConstants.t2 + labConstants.t0;
    };

    var rgb2xyz = function (r,g,b) {
        r = rgb_xyz(r);
        g = rgb_xyz(g);
        b = rgb_xyz(b);
        var x = xyz_lab((0.4124564 * r + 0.3575761 * g + 0.1804375 * b) / labConstants.Xn);
        var y = xyz_lab((0.2126729 * r + 0.7151522 * g + 0.0721750 * b) / labConstants.Yn);
        var z = xyz_lab((0.0193339 * r + 0.1191920 * g + 0.9503041 * b) / labConstants.Zn);
        return [x,y,z];
    };

    var rgb2lab_1 = rgb2lab;

    var unpack$l = utils.unpack;
    var pow$1 = Math.pow;

    /*
     * L* [0..100]
     * a [-100..100]
     * b [-100..100]
     */
    var lab2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$l(args, 'lab');
        var l = args[0];
        var a = args[1];
        var b = args[2];
        var x,y,z, r,g,b_;

        y = (l + 16) / 116;
        x = isNaN(a) ? y : y + a / 500;
        z = isNaN(b) ? y : y - b / 200;

        y = labConstants.Yn * lab_xyz(y);
        x = labConstants.Xn * lab_xyz(x);
        z = labConstants.Zn * lab_xyz(z);

        r = xyz_rgb(3.2404542 * x - 1.5371385 * y - 0.4985314 * z);  // D65 -> sRGB
        g = xyz_rgb(-0.9692660 * x + 1.8760108 * y + 0.0415560 * z);
        b_ = xyz_rgb(0.0556434 * x - 0.2040259 * y + 1.0572252 * z);

        return [r,g,b_,args.length > 3 ? args[3] : 1];
    };

    var xyz_rgb = function (r) {
        return 255 * (r <= 0.00304 ? 12.92 * r : 1.055 * pow$1(r, 1 / 2.4) - 0.055)
    };

    var lab_xyz = function (t) {
        return t > labConstants.t1 ? t * t * t : labConstants.t2 * (t - labConstants.t0)
    };

    var lab2rgb_1 = lab2rgb;

    var unpack$m = utils.unpack;
    var type$9 = utils.type;






    Color_1.prototype.lab = function() {
        return rgb2lab_1(this._rgb);
    };

    chroma_1.lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lab']) ));
    };

    input.format.lab = lab2rgb_1;

    input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$m(args, 'lab');
            if (type$9(args) === 'array' && args.length === 3) {
                return 'lab';
            }
        }
    });

    var unpack$n = utils.unpack;
    var RAD2DEG = utils.RAD2DEG;
    var sqrt$1 = Math.sqrt;
    var atan2 = Math.atan2;
    var round$4 = Math.round;

    var lab2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$n(args, 'lab');
        var l = ref[0];
        var a = ref[1];
        var b = ref[2];
        var c = sqrt$1(a * a + b * b);
        var h = (atan2(b, a) * RAD2DEG + 360) % 360;
        if (round$4(c*10000) === 0) { h = Number.NaN; }
        return [l, c, h];
    };

    var lab2lch_1 = lab2lch;

    var unpack$o = utils.unpack;



    var rgb2lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$o(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        var ref$1 = rgb2lab_1(r,g,b);
        var l = ref$1[0];
        var a = ref$1[1];
        var b_ = ref$1[2];
        return lab2lch_1(l,a,b_);
    };

    var rgb2lch_1 = rgb2lch;

    var unpack$p = utils.unpack;
    var DEG2RAD = utils.DEG2RAD;
    var sin = Math.sin;
    var cos$1 = Math.cos;

    var lch2lab = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        /*
        Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
        These formulas were invented by David Dalrymple to obtain maximum contrast without going
        out of gamut if the parameters are in the range 0-1.

        A saturation multiplier was added by Gregor Aisch
        */
        var ref = unpack$p(args, 'lch');
        var l = ref[0];
        var c = ref[1];
        var h = ref[2];
        if (isNaN(h)) { h = 0; }
        h = h * DEG2RAD;
        return [l, cos$1(h) * c, sin(h) * c]
    };

    var lch2lab_1 = lch2lab;

    var unpack$q = utils.unpack;



    var lch2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        args = unpack$q(args, 'lch');
        var l = args[0];
        var c = args[1];
        var h = args[2];
        var ref = lch2lab_1 (l,c,h);
        var L = ref[0];
        var a = ref[1];
        var b_ = ref[2];
        var ref$1 = lab2rgb_1 (L,a,b_);
        var r = ref$1[0];
        var g = ref$1[1];
        var b = ref$1[2];
        return [r, g, b, args.length > 3 ? args[3] : 1];
    };

    var lch2rgb_1 = lch2rgb;

    var unpack$r = utils.unpack;


    var hcl2rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var hcl = unpack$r(args, 'hcl').reverse();
        return lch2rgb_1.apply(void 0, hcl);
    };

    var hcl2rgb_1 = hcl2rgb;

    var unpack$s = utils.unpack;
    var type$a = utils.type;






    Color_1.prototype.lch = function() { return rgb2lch_1(this._rgb); };
    Color_1.prototype.hcl = function() { return rgb2lch_1(this._rgb).reverse(); };

    chroma_1.lch = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['lch']) ));
    };
    chroma_1.hcl = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['hcl']) ));
    };

    input.format.lch = lch2rgb_1;
    input.format.hcl = hcl2rgb_1;

    ['lch','hcl'].forEach(function (m) { return input.autodetect.push({
        p: 2,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$s(args, m);
            if (type$a(args) === 'array' && args.length === 3) {
                return m;
            }
        }
    }); });

    /**
    	X11 color names

    	http://www.w3.org/TR/css3-color/#svg-color
    */

    var w3cx11 = {
        aliceblue: '#f0f8ff',
        antiquewhite: '#faebd7',
        aqua: '#00ffff',
        aquamarine: '#7fffd4',
        azure: '#f0ffff',
        beige: '#f5f5dc',
        bisque: '#ffe4c4',
        black: '#000000',
        blanchedalmond: '#ffebcd',
        blue: '#0000ff',
        blueviolet: '#8a2be2',
        brown: '#a52a2a',
        burlywood: '#deb887',
        cadetblue: '#5f9ea0',
        chartreuse: '#7fff00',
        chocolate: '#d2691e',
        coral: '#ff7f50',
        cornflower: '#6495ed',
        cornflowerblue: '#6495ed',
        cornsilk: '#fff8dc',
        crimson: '#dc143c',
        cyan: '#00ffff',
        darkblue: '#00008b',
        darkcyan: '#008b8b',
        darkgoldenrod: '#b8860b',
        darkgray: '#a9a9a9',
        darkgreen: '#006400',
        darkgrey: '#a9a9a9',
        darkkhaki: '#bdb76b',
        darkmagenta: '#8b008b',
        darkolivegreen: '#556b2f',
        darkorange: '#ff8c00',
        darkorchid: '#9932cc',
        darkred: '#8b0000',
        darksalmon: '#e9967a',
        darkseagreen: '#8fbc8f',
        darkslateblue: '#483d8b',
        darkslategray: '#2f4f4f',
        darkslategrey: '#2f4f4f',
        darkturquoise: '#00ced1',
        darkviolet: '#9400d3',
        deeppink: '#ff1493',
        deepskyblue: '#00bfff',
        dimgray: '#696969',
        dimgrey: '#696969',
        dodgerblue: '#1e90ff',
        firebrick: '#b22222',
        floralwhite: '#fffaf0',
        forestgreen: '#228b22',
        fuchsia: '#ff00ff',
        gainsboro: '#dcdcdc',
        ghostwhite: '#f8f8ff',
        gold: '#ffd700',
        goldenrod: '#daa520',
        gray: '#808080',
        green: '#008000',
        greenyellow: '#adff2f',
        grey: '#808080',
        honeydew: '#f0fff0',
        hotpink: '#ff69b4',
        indianred: '#cd5c5c',
        indigo: '#4b0082',
        ivory: '#fffff0',
        khaki: '#f0e68c',
        laserlemon: '#ffff54',
        lavender: '#e6e6fa',
        lavenderblush: '#fff0f5',
        lawngreen: '#7cfc00',
        lemonchiffon: '#fffacd',
        lightblue: '#add8e6',
        lightcoral: '#f08080',
        lightcyan: '#e0ffff',
        lightgoldenrod: '#fafad2',
        lightgoldenrodyellow: '#fafad2',
        lightgray: '#d3d3d3',
        lightgreen: '#90ee90',
        lightgrey: '#d3d3d3',
        lightpink: '#ffb6c1',
        lightsalmon: '#ffa07a',
        lightseagreen: '#20b2aa',
        lightskyblue: '#87cefa',
        lightslategray: '#778899',
        lightslategrey: '#778899',
        lightsteelblue: '#b0c4de',
        lightyellow: '#ffffe0',
        lime: '#00ff00',
        limegreen: '#32cd32',
        linen: '#faf0e6',
        magenta: '#ff00ff',
        maroon: '#800000',
        maroon2: '#7f0000',
        maroon3: '#b03060',
        mediumaquamarine: '#66cdaa',
        mediumblue: '#0000cd',
        mediumorchid: '#ba55d3',
        mediumpurple: '#9370db',
        mediumseagreen: '#3cb371',
        mediumslateblue: '#7b68ee',
        mediumspringgreen: '#00fa9a',
        mediumturquoise: '#48d1cc',
        mediumvioletred: '#c71585',
        midnightblue: '#191970',
        mintcream: '#f5fffa',
        mistyrose: '#ffe4e1',
        moccasin: '#ffe4b5',
        navajowhite: '#ffdead',
        navy: '#000080',
        oldlace: '#fdf5e6',
        olive: '#808000',
        olivedrab: '#6b8e23',
        orange: '#ffa500',
        orangered: '#ff4500',
        orchid: '#da70d6',
        palegoldenrod: '#eee8aa',
        palegreen: '#98fb98',
        paleturquoise: '#afeeee',
        palevioletred: '#db7093',
        papayawhip: '#ffefd5',
        peachpuff: '#ffdab9',
        peru: '#cd853f',
        pink: '#ffc0cb',
        plum: '#dda0dd',
        powderblue: '#b0e0e6',
        purple: '#800080',
        purple2: '#7f007f',
        purple3: '#a020f0',
        rebeccapurple: '#663399',
        red: '#ff0000',
        rosybrown: '#bc8f8f',
        royalblue: '#4169e1',
        saddlebrown: '#8b4513',
        salmon: '#fa8072',
        sandybrown: '#f4a460',
        seagreen: '#2e8b57',
        seashell: '#fff5ee',
        sienna: '#a0522d',
        silver: '#c0c0c0',
        skyblue: '#87ceeb',
        slateblue: '#6a5acd',
        slategray: '#708090',
        slategrey: '#708090',
        snow: '#fffafa',
        springgreen: '#00ff7f',
        steelblue: '#4682b4',
        tan: '#d2b48c',
        teal: '#008080',
        thistle: '#d8bfd8',
        tomato: '#ff6347',
        turquoise: '#40e0d0',
        violet: '#ee82ee',
        wheat: '#f5deb3',
        white: '#ffffff',
        whitesmoke: '#f5f5f5',
        yellow: '#ffff00',
        yellowgreen: '#9acd32'
    };

    var w3cx11_1 = w3cx11;

    var type$b = utils.type;





    Color_1.prototype.name = function() {
        var hex = rgb2hex_1(this._rgb, 'rgb');
        for (var i = 0, list = Object.keys(w3cx11_1); i < list.length; i += 1) {
            var n = list[i];

            if (w3cx11_1[n] === hex) { return n.toLowerCase(); }
        }
        return hex;
    };

    input.format.named = function (name) {
        name = name.toLowerCase();
        if (w3cx11_1[name]) { return hex2rgb_1(w3cx11_1[name]); }
        throw new Error('unknown color name: '+name);
    };

    input.autodetect.push({
        p: 5,
        test: function (h) {
            var rest = [], len = arguments.length - 1;
            while ( len-- > 0 ) rest[ len ] = arguments[ len + 1 ];

            if (!rest.length && type$b(h) === 'string' && w3cx11_1[h.toLowerCase()]) {
                return 'named';
            }
        }
    });

    var unpack$t = utils.unpack;

    var rgb2num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var ref = unpack$t(args, 'rgb');
        var r = ref[0];
        var g = ref[1];
        var b = ref[2];
        return (r << 16) + (g << 8) + b;
    };

    var rgb2num_1 = rgb2num;

    var type$c = utils.type;

    var num2rgb = function (num) {
        if (type$c(num) == "number" && num >= 0 && num <= 0xFFFFFF) {
            var r = num >> 16;
            var g = (num >> 8) & 0xFF;
            var b = num & 0xFF;
            return [r,g,b,1];
        }
        throw new Error("unknown num color: "+num);
    };

    var num2rgb_1 = num2rgb;

    var type$d = utils.type;



    Color_1.prototype.num = function() {
        return rgb2num_1(this._rgb);
    };

    chroma_1.num = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['num']) ));
    };

    input.format.num = num2rgb_1;

    input.autodetect.push({
        p: 5,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            if (args.length === 1 && type$d(args[0]) === 'number' && args[0] >= 0 && args[0] <= 0xFFFFFF) {
                return 'num';
            }
        }
    });

    var unpack$u = utils.unpack;
    var type$e = utils.type;
    var round$5 = Math.round;

    Color_1.prototype.rgb = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        if (rnd === false) { return this._rgb.slice(0,3); }
        return this._rgb.slice(0,3).map(round$5);
    };

    Color_1.prototype.rgba = function(rnd) {
        if ( rnd === void 0 ) rnd=true;

        return this._rgb.slice(0,4).map(function (v,i) {
            return i<3 ? (rnd === false ? v : round$5(v)) : v;
        });
    };

    chroma_1.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['rgb']) ));
    };

    input.format.rgb = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgba = unpack$u(args, 'rgba');
        if (rgba[3] === undefined) { rgba[3] = 1; }
        return rgba;
    };

    input.autodetect.push({
        p: 3,
        test: function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            args = unpack$u(args, 'rgba');
            if (type$e(args) === 'array' && (args.length === 3 ||
                args.length === 4 && type$e(args[3]) == 'number' && args[3] >= 0 && args[3] <= 1)) {
                return 'rgb';
            }
        }
    });

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     */

    var log = Math.log;

    var temperature2rgb = function (kelvin) {
        var temp = kelvin / 100;
        var r,g,b;
        if (temp < 66) {
            r = 255;
            g = -155.25485562709179 - 0.44596950469579133 * (g = temp-2) + 104.49216199393888 * log(g);
            b = temp < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (b = temp-10) + 115.67994401066147 * log(b);
        } else {
            r = 351.97690566805693 + 0.114206453784165 * (r = temp-55) - 40.25366309332127 * log(r);
            g = 325.4494125711974 + 0.07943456536662342 * (g = temp-50) - 28.0852963507957 * log(g);
            b = 255;
        }
        return [r,g,b,1];
    };

    var temperature2rgb_1 = temperature2rgb;

    /*
     * Based on implementation by Neil Bartlett
     * https://github.com/neilbartlett/color-temperature
     **/


    var unpack$v = utils.unpack;
    var round$6 = Math.round;

    var rgb2temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        var rgb = unpack$v(args, 'rgb');
        var r = rgb[0], b = rgb[2];
        var minTemp = 1000;
        var maxTemp = 40000;
        var eps = 0.4;
        var temp;
        while (maxTemp - minTemp > eps) {
            temp = (maxTemp + minTemp) * 0.5;
            var rgb$1 = temperature2rgb_1(temp);
            if ((rgb$1[2] / rgb$1[0]) >= (b / r)) {
                maxTemp = temp;
            } else {
                minTemp = temp;
            }
        }
        return round$6(temp);
    };

    var rgb2temperature_1 = rgb2temperature;

    Color_1.prototype.temp =
    Color_1.prototype.kelvin =
    Color_1.prototype.temperature = function() {
        return rgb2temperature_1(this._rgb);
    };

    chroma_1.temp =
    chroma_1.kelvin =
    chroma_1.temperature = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        return new (Function.prototype.bind.apply( Color_1, [ null ].concat( args, ['temp']) ));
    };

    input.format.temp =
    input.format.kelvin =
    input.format.temperature = temperature2rgb_1;

    var type$f = utils.type;

    Color_1.prototype.alpha = function(a, mutate) {
        if ( mutate === void 0 ) mutate=false;

        if (a !== undefined && type$f(a) === 'number') {
            if (mutate) {
                this._rgb[3] = a;
                return this;
            }
            return new Color_1([this._rgb[0], this._rgb[1], this._rgb[2], a], 'rgb');
        }
        return this._rgb[3];
    };

    Color_1.prototype.clipped = function() {
        return this._rgb._clipped || false;
    };

    Color_1.prototype.darken = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lab = me.lab();
    	lab[0] -= labConstants.Kn * amount;
    	return new Color_1(lab, 'lab').alpha(me.alpha(), true);
    };

    Color_1.prototype.brighten = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.darken(-amount);
    };

    Color_1.prototype.darker = Color_1.prototype.darken;
    Color_1.prototype.brighter = Color_1.prototype.brighten;

    Color_1.prototype.get = function(mc) {
        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) { return src[i]; }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var type$g = utils.type;
    var pow$2 = Math.pow;

    var EPS = 1e-7;
    var MAX_ITER = 20;

    Color_1.prototype.luminance = function(lum) {
        if (lum !== undefined && type$g(lum) === 'number') {
            if (lum === 0) {
                // return pure black
                return new Color_1([0,0,0,this._rgb[3]], 'rgb');
            }
            if (lum === 1) {
                // return pure white
                return new Color_1([255,255,255,this._rgb[3]], 'rgb');
            }
            // compute new color using...
            var cur_lum = this.luminance();
            var mode = 'rgb';
            var max_iter = MAX_ITER;

            var test = function (low, high) {
                var mid = low.interpolate(high, 0.5, mode);
                var lm = mid.luminance();
                if (Math.abs(lum - lm) < EPS || !max_iter--) {
                    // close enough
                    return mid;
                }
                return lm > lum ? test(low, mid) : test(mid, high);
            };

            var rgb = (cur_lum > lum ? test(new Color_1([0,0,0]), this) : test(this, new Color_1([255,255,255]))).rgb();
            return new Color_1(rgb.concat( [this._rgb[3]]));
        }
        return rgb2luminance.apply(void 0, (this._rgb).slice(0,3));
    };


    var rgb2luminance = function (r,g,b) {
        // relative luminance
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        r = luminance_x(r);
        g = luminance_x(g);
        b = luminance_x(b);
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    var luminance_x = function (x) {
        x /= 255;
        return x <= 0.03928 ? x/12.92 : pow$2((x+0.055)/1.055, 2.4);
    };

    var interpolator = {};

    var type$h = utils.type;


    var mix = function (col1, col2, f) {
        if ( f === void 0 ) f=0.5;
        var rest = [], len = arguments.length - 3;
        while ( len-- > 0 ) rest[ len ] = arguments[ len + 3 ];

        var mode = rest[0] || 'lrgb';
        if (!interpolator[mode] && !rest.length) {
            // fall back to the first supported mode
            mode = Object.keys(interpolator)[0];
        }
        if (!interpolator[mode]) {
            throw new Error(("interpolation mode " + mode + " is not defined"));
        }
        if (type$h(col1) !== 'object') { col1 = new Color_1(col1); }
        if (type$h(col2) !== 'object') { col2 = new Color_1(col2); }
        return interpolator[mode](col1, col2, f)
            .alpha(col1.alpha() + f * (col2.alpha() - col1.alpha()));
    };

    Color_1.prototype.mix =
    Color_1.prototype.interpolate = function(col2, f) {
    	if ( f === void 0 ) f=0.5;
    	var rest = [], len = arguments.length - 2;
    	while ( len-- > 0 ) rest[ len ] = arguments[ len + 2 ];

    	return mix.apply(void 0, [ this, col2, f ].concat( rest ));
    };

    Color_1.prototype.premultiply = function(mutate) {
    	if ( mutate === void 0 ) mutate=false;

    	var rgb = this._rgb;
    	var a = rgb[3];
    	if (mutate) {
    		this._rgb = [rgb[0]*a, rgb[1]*a, rgb[2]*a, a];
    		return this;
    	} else {
    		return new Color_1([rgb[0]*a, rgb[1]*a, rgb[2]*a, a], 'rgb');
    	}
    };

    Color_1.prototype.saturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	var me = this;
    	var lch = me.lch();
    	lch[1] += labConstants.Kn * amount;
    	if (lch[1] < 0) { lch[1] = 0; }
    	return new Color_1(lch, 'lch').alpha(me.alpha(), true);
    };

    Color_1.prototype.desaturate = function(amount) {
    	if ( amount === void 0 ) amount=1;

    	return this.saturate(-amount);
    };

    var type$i = utils.type;

    Color_1.prototype.set = function(mc, value, mutate) {
        if ( mutate === void 0 ) mutate=false;

        var ref = mc.split('.');
        var mode = ref[0];
        var channel = ref[1];
        var src = this[mode]();
        if (channel) {
            var i = mode.indexOf(channel);
            if (i > -1) {
                if (type$i(value) == 'string') {
                    switch(value.charAt(0)) {
                        case '+': src[i] += +value; break;
                        case '-': src[i] += +value; break;
                        case '*': src[i] *= +(value.substr(1)); break;
                        case '/': src[i] /= +(value.substr(1)); break;
                        default: src[i] = +value;
                    }
                } else if (type$i(value) === 'number') {
                    src[i] = value;
                } else {
                    throw new Error("unsupported value for Color.set");
                }
                var out = new Color_1(src, mode);
                if (mutate) {
                    this._rgb = out._rgb;
                    return this;
                }
                return out;
            }
            throw new Error(("unknown channel " + channel + " in mode " + mode));
        } else {
            return src;
        }
    };

    var rgb$1 = function (col1, col2, f) {
        var xyz0 = col1._rgb;
        var xyz1 = col2._rgb;
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'rgb'
        )
    };

    // register interpolator
    interpolator.rgb = rgb$1;

    var sqrt$2 = Math.sqrt;
    var pow$3 = Math.pow;

    var lrgb = function (col1, col2, f) {
        var ref = col1._rgb;
        var x1 = ref[0];
        var y1 = ref[1];
        var z1 = ref[2];
        var ref$1 = col2._rgb;
        var x2 = ref$1[0];
        var y2 = ref$1[1];
        var z2 = ref$1[2];
        return new Color_1(
            sqrt$2(pow$3(x1,2) * (1-f) + pow$3(x2,2) * f),
            sqrt$2(pow$3(y1,2) * (1-f) + pow$3(y2,2) * f),
            sqrt$2(pow$3(z1,2) * (1-f) + pow$3(z2,2) * f),
            'rgb'
        )
    };

    // register interpolator
    interpolator.lrgb = lrgb;

    var lab$1 = function (col1, col2, f) {
        var xyz0 = col1.lab();
        var xyz1 = col2.lab();
        return new Color_1(
            xyz0[0] + f * (xyz1[0]-xyz0[0]),
            xyz0[1] + f * (xyz1[1]-xyz0[1]),
            xyz0[2] + f * (xyz1[2]-xyz0[2]),
            'lab'
        )
    };

    // register interpolator
    interpolator.lab = lab$1;

    var _hsx = function (col1, col2, f, m) {
        var assign, assign$1;

        var xyz0, xyz1;
        if (m === 'hsl') {
            xyz0 = col1.hsl();
            xyz1 = col2.hsl();
        } else if (m === 'hsv') {
            xyz0 = col1.hsv();
            xyz1 = col2.hsv();
        } else if (m === 'hcg') {
            xyz0 = col1.hcg();
            xyz1 = col2.hcg();
        } else if (m === 'hsi') {
            xyz0 = col1.hsi();
            xyz1 = col2.hsi();
        } else if (m === 'lch' || m === 'hcl') {
            m = 'hcl';
            xyz0 = col1.hcl();
            xyz1 = col2.hcl();
        }

        var hue0, hue1, sat0, sat1, lbv0, lbv1;
        if (m.substr(0, 1) === 'h') {
            (assign = xyz0, hue0 = assign[0], sat0 = assign[1], lbv0 = assign[2]);
            (assign$1 = xyz1, hue1 = assign$1[0], sat1 = assign$1[1], lbv1 = assign$1[2]);
        }

        var sat, hue, lbv, dh;

        if (!isNaN(hue0) && !isNaN(hue1)) {
            // both colors have hue
            if (hue1 > hue0 && hue1 - hue0 > 180) {
                dh = hue1-(hue0+360);
            } else if (hue1 < hue0 && hue0 - hue1 > 180) {
                dh = hue1+360-hue0;
            } else{
                dh = hue1 - hue0;
            }
            hue = hue0 + f * dh;
        } else if (!isNaN(hue0)) {
            hue = hue0;
            if ((lbv1 == 1 || lbv1 == 0) && m != 'hsv') { sat = sat0; }
        } else if (!isNaN(hue1)) {
            hue = hue1;
            if ((lbv0 == 1 || lbv0 == 0) && m != 'hsv') { sat = sat1; }
        } else {
            hue = Number.NaN;
        }

        if (sat === undefined) { sat = sat0 + f * (sat1 - sat0); }
        lbv = lbv0 + f * (lbv1-lbv0);
        return new Color_1([hue, sat, lbv], m);
    };

    var lch$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'lch');
    };

    // register interpolator
    interpolator.lch = lch$1;
    interpolator.hcl = lch$1;

    var num$1 = function (col1, col2, f) {
        var c1 = col1.num();
        var c2 = col2.num();
        return new Color_1(c1 + f * (c2-c1), 'num')
    };

    // register interpolator
    interpolator.num = num$1;

    var hcg$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hcg');
    };

    // register interpolator
    interpolator.hcg = hcg$1;

    var hsi$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsi');
    };

    // register interpolator
    interpolator.hsi = hsi$1;

    var hsl$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsl');
    };

    // register interpolator
    interpolator.hsl = hsl$1;

    var hsv$1 = function (col1, col2, f) {
    	return _hsx(col1, col2, f, 'hsv');
    };

    // register interpolator
    interpolator.hsv = hsv$1;

    var clip_rgb$2 = utils.clip_rgb;
    var pow$4 = Math.pow;
    var sqrt$3 = Math.sqrt;
    var PI$1 = Math.PI;
    var cos$2 = Math.cos;
    var sin$1 = Math.sin;
    var atan2$1 = Math.atan2;

    var average = function (colors, mode, weights) {
        if ( mode === void 0 ) mode='lrgb';
        if ( weights === void 0 ) weights=null;

        var l = colors.length;
        if (!weights) { weights = Array.from(new Array(l)).map(function () { return 1; }); }
        // normalize weights
        var k = l / weights.reduce(function(a, b) { return a + b; });
        weights.forEach(function (w,i) { weights[i] *= k; });
        // convert colors to Color objects
        colors = colors.map(function (c) { return new Color_1(c); });
        if (mode === 'lrgb') {
            return _average_lrgb(colors, weights)
        }
        var first = colors.shift();
        var xyz = first.get(mode);
        var cnt = [];
        var dx = 0;
        var dy = 0;
        // initial color
        for (var i=0; i<xyz.length; i++) {
            xyz[i] = (xyz[i] || 0) * weights[0];
            cnt.push(isNaN(xyz[i]) ? 0 : weights[0]);
            if (mode.charAt(i) === 'h' && !isNaN(xyz[i])) {
                var A = xyz[i] / 180 * PI$1;
                dx += cos$2(A) * weights[0];
                dy += sin$1(A) * weights[0];
            }
        }

        var alpha = first.alpha() * weights[0];
        colors.forEach(function (c,ci) {
            var xyz2 = c.get(mode);
            alpha += c.alpha() * weights[ci+1];
            for (var i=0; i<xyz.length; i++) {
                if (!isNaN(xyz2[i])) {
                    cnt[i] += weights[ci+1];
                    if (mode.charAt(i) === 'h') {
                        var A = xyz2[i] / 180 * PI$1;
                        dx += cos$2(A) * weights[ci+1];
                        dy += sin$1(A) * weights[ci+1];
                    } else {
                        xyz[i] += xyz2[i] * weights[ci+1];
                    }
                }
            }
        });

        for (var i$1=0; i$1<xyz.length; i$1++) {
            if (mode.charAt(i$1) === 'h') {
                var A$1 = atan2$1(dy / cnt[i$1], dx / cnt[i$1]) / PI$1 * 180;
                while (A$1 < 0) { A$1 += 360; }
                while (A$1 >= 360) { A$1 -= 360; }
                xyz[i$1] = A$1;
            } else {
                xyz[i$1] = xyz[i$1]/cnt[i$1];
            }
        }
        alpha /= l;
        return (new Color_1(xyz, mode)).alpha(alpha > 0.99999 ? 1 : alpha, true);
    };


    var _average_lrgb = function (colors, weights) {
        var l = colors.length;
        var xyz = [0,0,0,0];
        for (var i=0; i < colors.length; i++) {
            var col = colors[i];
            var f = weights[i] / l;
            var rgb = col._rgb;
            xyz[0] += pow$4(rgb[0],2) * f;
            xyz[1] += pow$4(rgb[1],2) * f;
            xyz[2] += pow$4(rgb[2],2) * f;
            xyz[3] += rgb[3] * f;
        }
        xyz[0] = sqrt$3(xyz[0]);
        xyz[1] = sqrt$3(xyz[1]);
        xyz[2] = sqrt$3(xyz[2]);
        if (xyz[3] > 0.9999999) { xyz[3] = 1; }
        return new Color_1(clip_rgb$2(xyz));
    };

    // minimal multi-purpose interface

    // @requires utils color analyze


    var type$j = utils.type;

    var pow$5 = Math.pow;

    var scale = function(colors) {

        // constructor
        var _mode = 'rgb';
        var _nacol = chroma_1('#ccc');
        var _spread = 0;
        // const _fixed = false;
        var _domain = [0, 1];
        var _pos = [];
        var _padding = [0,0];
        var _classes = false;
        var _colors = [];
        var _out = false;
        var _min = 0;
        var _max = 1;
        var _correctLightness = false;
        var _colorCache = {};
        var _useCache = true;
        var _gamma = 1;

        // private methods

        var setColors = function(colors) {
            colors = colors || ['#fff', '#000'];
            if (colors && type$j(colors) === 'string' && chroma_1.brewer &&
                chroma_1.brewer[colors.toLowerCase()]) {
                colors = chroma_1.brewer[colors.toLowerCase()];
            }
            if (type$j(colors) === 'array') {
                // handle single color
                if (colors.length === 1) {
                    colors = [colors[0], colors[0]];
                }
                // make a copy of the colors
                colors = colors.slice(0);
                // convert to chroma classes
                for (var c=0; c<colors.length; c++) {
                    colors[c] = chroma_1(colors[c]);
                }
                // auto-fill color position
                _pos.length = 0;
                for (var c$1=0; c$1<colors.length; c$1++) {
                    _pos.push(c$1/(colors.length-1));
                }
            }
            resetCache();
            return _colors = colors;
        };

        var getClass = function(value) {
            if (_classes != null) {
                var n = _classes.length-1;
                var i = 0;
                while (i < n && value >= _classes[i]) {
                    i++;
                }
                return i-1;
            }
            return 0;
        };

        var tMapLightness = function (t) { return t; };
        var tMapDomain = function (t) { return t; };

        // const classifyValue = function(value) {
        //     let val = value;
        //     if (_classes.length > 2) {
        //         const n = _classes.length-1;
        //         const i = getClass(value);
        //         const minc = _classes[0] + ((_classes[1]-_classes[0]) * (0 + (_spread * 0.5)));  // center of 1st class
        //         const maxc = _classes[n-1] + ((_classes[n]-_classes[n-1]) * (1 - (_spread * 0.5)));  // center of last class
        //         val = _min + ((((_classes[i] + ((_classes[i+1] - _classes[i]) * 0.5)) - minc) / (maxc-minc)) * (_max - _min));
        //     }
        //     return val;
        // };

        var getColor = function(val, bypassMap) {
            var col, t;
            if (bypassMap == null) { bypassMap = false; }
            if (isNaN(val) || (val === null)) { return _nacol; }
            if (!bypassMap) {
                if (_classes && (_classes.length > 2)) {
                    // find the class
                    var c = getClass(val);
                    t = c / (_classes.length-2);
                } else if (_max !== _min) {
                    // just interpolate between min/max
                    t = (val - _min) / (_max - _min);
                } else {
                    t = 1;
                }
            } else {
                t = val;
            }

            // domain map
            t = tMapDomain(t);

            if (!bypassMap) {
                t = tMapLightness(t);  // lightness correction
            }

            if (_gamma !== 1) { t = pow$5(t, _gamma); }

            t = _padding[0] + (t * (1 - _padding[0] - _padding[1]));

            t = Math.min(1, Math.max(0, t));

            var k = Math.floor(t * 10000);

            if (_useCache && _colorCache[k]) {
                col = _colorCache[k];
            } else {
                if (type$j(_colors) === 'array') {
                    //for i in [0.._pos.length-1]
                    for (var i=0; i<_pos.length; i++) {
                        var p = _pos[i];
                        if (t <= p) {
                            col = _colors[i];
                            break;
                        }
                        if ((t >= p) && (i === (_pos.length-1))) {
                            col = _colors[i];
                            break;
                        }
                        if (t > p && t < _pos[i+1]) {
                            t = (t-p)/(_pos[i+1]-p);
                            col = chroma_1.interpolate(_colors[i], _colors[i+1], t, _mode);
                            break;
                        }
                    }
                } else if (type$j(_colors) === 'function') {
                    col = _colors(t);
                }
                if (_useCache) { _colorCache[k] = col; }
            }
            return col;
        };

        var resetCache = function () { return _colorCache = {}; };

        setColors(colors);

        // public interface

        var f = function(v) {
            var c = chroma_1(getColor(v));
            if (_out && c[_out]) { return c[_out](); } else { return c; }
        };

        f.classes = function(classes) {
            if (classes != null) {
                if (type$j(classes) === 'array') {
                    _classes = classes;
                    _domain = [classes[0], classes[classes.length-1]];
                } else {
                    var d = chroma_1.analyze(_domain);
                    if (classes === 0) {
                        _classes = [d.min, d.max];
                    } else {
                        _classes = chroma_1.limits(d, 'e', classes);
                    }
                }
                return f;
            }
            return _classes;
        };


        f.domain = function(domain) {
            if (!arguments.length) {
                return _domain;
            }
            _min = domain[0];
            _max = domain[domain.length-1];
            _pos = [];
            var k = _colors.length;
            if ((domain.length === k) && (_min !== _max)) {
                // update positions
                for (var i = 0, list = Array.from(domain); i < list.length; i += 1) {
                    var d = list[i];

                  _pos.push((d-_min) / (_max-_min));
                }
            } else {
                for (var c=0; c<k; c++) {
                    _pos.push(c/(k-1));
                }
                if (domain.length > 2) {
                    // set domain map
                    var tOut = domain.map(function (d,i) { return i/(domain.length-1); });
                    var tBreaks = domain.map(function (d) { return (d - _min) / (_max - _min); });
                    if (!tBreaks.every(function (val, i) { return tOut[i] === val; })) {
                        tMapDomain = function (t) {
                            if (t <= 0 || t >= 1) { return t; }
                            var i = 0;
                            while (t >= tBreaks[i+1]) { i++; }
                            var f = (t - tBreaks[i]) / (tBreaks[i+1] - tBreaks[i]);
                            var out = tOut[i] + f * (tOut[i+1] - tOut[i]);
                            return out;
                        };
                    }

                }
            }
            _domain = [_min, _max];
            return f;
        };

        f.mode = function(_m) {
            if (!arguments.length) {
                return _mode;
            }
            _mode = _m;
            resetCache();
            return f;
        };

        f.range = function(colors, _pos) {
            setColors(colors, _pos);
            return f;
        };

        f.out = function(_o) {
            _out = _o;
            return f;
        };

        f.spread = function(val) {
            if (!arguments.length) {
                return _spread;
            }
            _spread = val;
            return f;
        };

        f.correctLightness = function(v) {
            if (v == null) { v = true; }
            _correctLightness = v;
            resetCache();
            if (_correctLightness) {
                tMapLightness = function(t) {
                    var L0 = getColor(0, true).lab()[0];
                    var L1 = getColor(1, true).lab()[0];
                    var pol = L0 > L1;
                    var L_actual = getColor(t, true).lab()[0];
                    var L_ideal = L0 + ((L1 - L0) * t);
                    var L_diff = L_actual - L_ideal;
                    var t0 = 0;
                    var t1 = 1;
                    var max_iter = 20;
                    while ((Math.abs(L_diff) > 1e-2) && (max_iter-- > 0)) {
                        (function() {
                            if (pol) { L_diff *= -1; }
                            if (L_diff < 0) {
                                t0 = t;
                                t += (t1 - t) * 0.5;
                            } else {
                                t1 = t;
                                t += (t0 - t) * 0.5;
                            }
                            L_actual = getColor(t, true).lab()[0];
                            return L_diff = L_actual - L_ideal;
                        })();
                    }
                    return t;
                };
            } else {
                tMapLightness = function (t) { return t; };
            }
            return f;
        };

        f.padding = function(p) {
            if (p != null) {
                if (type$j(p) === 'number') {
                    p = [p,p];
                }
                _padding = p;
                return f;
            } else {
                return _padding;
            }
        };

        f.colors = function(numColors, out) {
            // If no arguments are given, return the original colors that were provided
            if (arguments.length < 2) { out = 'hex'; }
            var result = [];

            if (arguments.length === 0) {
                result = _colors.slice(0);

            } else if (numColors === 1) {
                result = [f(0.5)];

            } else if (numColors > 1) {
                var dm = _domain[0];
                var dd = _domain[1] - dm;
                result = __range__(0, numColors, false).map(function (i) { return f( dm + ((i/(numColors-1)) * dd) ); });

            } else { // returns all colors based on the defined classes
                colors = [];
                var samples = [];
                if (_classes && (_classes.length > 2)) {
                    for (var i = 1, end = _classes.length, asc = 1 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
                        samples.push((_classes[i-1]+_classes[i])*0.5);
                    }
                } else {
                    samples = _domain;
                }
                result = samples.map(function (v) { return f(v); });
            }

            if (chroma_1[out]) {
                result = result.map(function (c) { return c[out](); });
            }
            return result;
        };

        f.cache = function(c) {
            if (c != null) {
                _useCache = c;
                return f;
            } else {
                return _useCache;
            }
        };

        f.gamma = function(g) {
            if (g != null) {
                _gamma = g;
                return f;
            } else {
                return _gamma;
            }
        };

        f.nodata = function(d) {
            if (d != null) {
                _nacol = chroma_1(d);
                return f;
            } else {
                return _nacol;
            }
        };

        return f;
    };

    function __range__(left, right, inclusive) {
      var range = [];
      var ascending = left < right;
      var end = !inclusive ? right : ascending ? right + 1 : right - 1;
      for (var i = left; ascending ? i < end : i > end; ascending ? i++ : i--) {
        range.push(i);
      }
      return range;
    }

    //
    // interpolates between a set of colors uzing a bezier spline
    //

    // @requires utils lab




    var bezier = function(colors) {
        var assign, assign$1, assign$2;

        var I, lab0, lab1, lab2;
        colors = colors.map(function (c) { return new Color_1(c); });
        if (colors.length === 2) {
            // linear interpolation
            (assign = colors.map(function (c) { return c.lab(); }), lab0 = assign[0], lab1 = assign[1]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return lab0[i] + (t * (lab1[i] - lab0[i])); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 3) {
            // quadratic bezier interpolation
            (assign$1 = colors.map(function (c) { return c.lab(); }), lab0 = assign$1[0], lab1 = assign$1[1], lab2 = assign$1[2]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t) * lab0[i]) + (2 * (1-t) * t * lab1[i]) + (t * t * lab2[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 4) {
            // cubic bezier interpolation
            var lab3;
            (assign$2 = colors.map(function (c) { return c.lab(); }), lab0 = assign$2[0], lab1 = assign$2[1], lab2 = assign$2[2], lab3 = assign$2[3]);
            I = function(t) {
                var lab = ([0, 1, 2].map(function (i) { return ((1-t)*(1-t)*(1-t) * lab0[i]) + (3 * (1-t) * (1-t) * t * lab1[i]) + (3 * (1-t) * t * t * lab2[i]) + (t*t*t * lab3[i]); }));
                return new Color_1(lab, 'lab');
            };
        } else if (colors.length === 5) {
            var I0 = bezier(colors.slice(0, 3));
            var I1 = bezier(colors.slice(2, 5));
            I = function(t) {
                if (t < 0.5) {
                    return I0(t*2);
                } else {
                    return I1((t-0.5)*2);
                }
            };
        }
        return I;
    };

    var bezier_1 = function (colors) {
        var f = bezier(colors);
        f.scale = function () { return scale(f); };
        return f;
    };

    /*
     * interpolates between a set of colors uzing a bezier spline
     * blend mode formulas taken from http://www.venture-ware.com/kevin/coding/lets-learn-math-photoshop-blend-modes/
     */




    var blend = function (bottom, top, mode) {
        if (!blend[mode]) {
            throw new Error('unknown blend mode ' + mode);
        }
        return blend[mode](bottom, top);
    };

    var blend_f = function (f) { return function (bottom,top) {
            var c0 = chroma_1(top).rgb();
            var c1 = chroma_1(bottom).rgb();
            return chroma_1.rgb(f(c0, c1));
        }; };

    var each = function (f) { return function (c0, c1) {
            var out = [];
            out[0] = f(c0[0], c1[0]);
            out[1] = f(c0[1], c1[1]);
            out[2] = f(c0[2], c1[2]);
            return out;
        }; };

    var normal = function (a) { return a; };
    var multiply = function (a,b) { return a * b / 255; };
    var darken$1 = function (a,b) { return a > b ? b : a; };
    var lighten = function (a,b) { return a > b ? a : b; };
    var screen = function (a,b) { return 255 * (1 - (1-a/255) * (1-b/255)); };
    var overlay = function (a,b) { return b < 128 ? 2 * a * b / 255 : 255 * (1 - 2 * (1 - a / 255 ) * ( 1 - b / 255 )); };
    var burn = function (a,b) { return 255 * (1 - (1 - b / 255) / (a/255)); };
    var dodge = function (a,b) {
        if (a === 255) { return 255; }
        a = 255 * (b / 255) / (1 - a / 255);
        return a > 255 ? 255 : a
    };

    // # add = (a,b) ->
    // #     if (a + b > 255) then 255 else a + b

    blend.normal = blend_f(each(normal));
    blend.multiply = blend_f(each(multiply));
    blend.screen = blend_f(each(screen));
    blend.overlay = blend_f(each(overlay));
    blend.darken = blend_f(each(darken$1));
    blend.lighten = blend_f(each(lighten));
    blend.dodge = blend_f(each(dodge));
    blend.burn = blend_f(each(burn));
    // blend.add = blend_f(each(add));

    var blend_1 = blend;

    // cubehelix interpolation
    // based on D.A. Green "A colour scheme for the display of astronomical intensity images"
    // http://astron-soc.in/bulletin/11June/289392011.pdf

    var type$k = utils.type;
    var clip_rgb$3 = utils.clip_rgb;
    var TWOPI$2 = utils.TWOPI;
    var pow$6 = Math.pow;
    var sin$2 = Math.sin;
    var cos$3 = Math.cos;


    var cubehelix = function(start, rotations, hue, gamma, lightness) {
        if ( start === void 0 ) start=300;
        if ( rotations === void 0 ) rotations=-1.5;
        if ( hue === void 0 ) hue=1;
        if ( gamma === void 0 ) gamma=1;
        if ( lightness === void 0 ) lightness=[0,1];

        var dh = 0, dl;
        if (type$k(lightness) === 'array') {
            dl = lightness[1] - lightness[0];
        } else {
            dl = 0;
            lightness = [lightness, lightness];
        }

        var f = function(fract) {
            var a = TWOPI$2 * (((start+120)/360) + (rotations * fract));
            var l = pow$6(lightness[0] + (dl * fract), gamma);
            var h = dh !== 0 ? hue[0] + (fract * dh) : hue;
            var amp = (h * l * (1-l)) / 2;
            var cos_a = cos$3(a);
            var sin_a = sin$2(a);
            var r = l + (amp * ((-0.14861 * cos_a) + (1.78277* sin_a)));
            var g = l + (amp * ((-0.29227 * cos_a) - (0.90649* sin_a)));
            var b = l + (amp * (+1.97294 * cos_a));
            return chroma_1(clip_rgb$3([r*255,g*255,b*255,1]));
        };

        f.start = function(s) {
            if ((s == null)) { return start; }
            start = s;
            return f;
        };

        f.rotations = function(r) {
            if ((r == null)) { return rotations; }
            rotations = r;
            return f;
        };

        f.gamma = function(g) {
            if ((g == null)) { return gamma; }
            gamma = g;
            return f;
        };

        f.hue = function(h) {
            if ((h == null)) { return hue; }
            hue = h;
            if (type$k(hue) === 'array') {
                dh = hue[1] - hue[0];
                if (dh === 0) { hue = hue[1]; }
            } else {
                dh = 0;
            }
            return f;
        };

        f.lightness = function(h) {
            if ((h == null)) { return lightness; }
            if (type$k(h) === 'array') {
                lightness = h;
                dl = h[1] - h[0];
            } else {
                lightness = [h,h];
                dl = 0;
            }
            return f;
        };

        f.scale = function () { return chroma_1.scale(f); };

        f.hue(hue);

        return f;
    };

    var digits = '0123456789abcdef';

    var floor$2 = Math.floor;
    var random = Math.random;

    var random_1 = function () {
        var code = '#';
        for (var i=0; i<6; i++) {
            code += digits.charAt(floor$2(random() * 16));
        }
        return new Color_1(code, 'hex');
    };

    var log$1 = Math.log;
    var pow$7 = Math.pow;
    var floor$3 = Math.floor;
    var abs = Math.abs;


    var analyze = function (data, key) {
        if ( key === void 0 ) key=null;

        var r = {
            min: Number.MAX_VALUE,
            max: Number.MAX_VALUE*-1,
            sum: 0,
            values: [],
            count: 0
        };
        if (type(data) === 'object') {
            data = Object.values(data);
        }
        data.forEach(function (val) {
            if (key && type(val) === 'object') { val = val[key]; }
            if (val !== undefined && val !== null && !isNaN(val)) {
                r.values.push(val);
                r.sum += val;
                if (val < r.min) { r.min = val; }
                if (val > r.max) { r.max = val; }
                r.count += 1;
            }
        });

        r.domain = [r.min, r.max];

        r.limits = function (mode, num) { return limits(r, mode, num); };

        return r;
    };


    var limits = function (data, mode, num) {
        if ( mode === void 0 ) mode='equal';
        if ( num === void 0 ) num=7;

        if (type(data) == 'array') {
            data = analyze(data);
        }
        var min = data.min;
        var max = data.max;
        var values = data.values.sort(function (a,b) { return a-b; });

        if (num === 1) { return [min,max]; }

        var limits = [];

        if (mode.substr(0,1) === 'c') { // continuous
            limits.push(min);
            limits.push(max);
        }

        if (mode.substr(0,1) === 'e') { // equal interval
            limits.push(min);
            for (var i=1; i<num; i++) {
                limits.push(min+((i/num)*(max-min)));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'l') { // log scale
            if (min <= 0) {
                throw new Error('Logarithmic scales are only possible for values > 0');
            }
            var min_log = Math.LOG10E * log$1(min);
            var max_log = Math.LOG10E * log$1(max);
            limits.push(min);
            for (var i$1=1; i$1<num; i$1++) {
                limits.push(pow$7(10, min_log + ((i$1/num) * (max_log - min_log))));
            }
            limits.push(max);
        }

        else if (mode.substr(0,1) === 'q') { // quantile scale
            limits.push(min);
            for (var i$2=1; i$2<num; i$2++) {
                var p = ((values.length-1) * i$2)/num;
                var pb = floor$3(p);
                if (pb === p) {
                    limits.push(values[pb]);
                } else { // p > pb
                    var pr = p - pb;
                    limits.push((values[pb]*(1-pr)) + (values[pb+1]*pr));
                }
            }
            limits.push(max);

        }

        else if (mode.substr(0,1) === 'k') { // k-means clustering
            /*
            implementation based on
            http://code.google.com/p/figue/source/browse/trunk/figue.js#336
            simplified for 1-d input values
            */
            var cluster;
            var n = values.length;
            var assignments = new Array(n);
            var clusterSizes = new Array(num);
            var repeat = true;
            var nb_iters = 0;
            var centroids = null;

            // get seed values
            centroids = [];
            centroids.push(min);
            for (var i$3=1; i$3<num; i$3++) {
                centroids.push(min + ((i$3/num) * (max-min)));
            }
            centroids.push(max);

            while (repeat) {
                // assignment step
                for (var j=0; j<num; j++) {
                    clusterSizes[j] = 0;
                }
                for (var i$4=0; i$4<n; i$4++) {
                    var value = values[i$4];
                    var mindist = Number.MAX_VALUE;
                    var best = (void 0);
                    for (var j$1=0; j$1<num; j$1++) {
                        var dist = abs(centroids[j$1]-value);
                        if (dist < mindist) {
                            mindist = dist;
                            best = j$1;
                        }
                        clusterSizes[best]++;
                        assignments[i$4] = best;
                    }
                }

                // update centroids step
                var newCentroids = new Array(num);
                for (var j$2=0; j$2<num; j$2++) {
                    newCentroids[j$2] = null;
                }
                for (var i$5=0; i$5<n; i$5++) {
                    cluster = assignments[i$5];
                    if (newCentroids[cluster] === null) {
                        newCentroids[cluster] = values[i$5];
                    } else {
                        newCentroids[cluster] += values[i$5];
                    }
                }
                for (var j$3=0; j$3<num; j$3++) {
                    newCentroids[j$3] *= 1/clusterSizes[j$3];
                }

                // check convergence
                repeat = false;
                for (var j$4=0; j$4<num; j$4++) {
                    if (newCentroids[j$4] !== centroids[j$4]) {
                        repeat = true;
                        break;
                    }
                }

                centroids = newCentroids;
                nb_iters++;

                if (nb_iters > 200) {
                    repeat = false;
                }
            }

            // finished k-means clustering
            // the next part is borrowed from gabrielflor.it
            var kClusters = {};
            for (var j$5=0; j$5<num; j$5++) {
                kClusters[j$5] = [];
            }
            for (var i$6=0; i$6<n; i$6++) {
                cluster = assignments[i$6];
                kClusters[cluster].push(values[i$6]);
            }
            var tmpKMeansBreaks = [];
            for (var j$6=0; j$6<num; j$6++) {
                tmpKMeansBreaks.push(kClusters[j$6][0]);
                tmpKMeansBreaks.push(kClusters[j$6][kClusters[j$6].length-1]);
            }
            tmpKMeansBreaks = tmpKMeansBreaks.sort(function (a,b){ return a-b; });
            limits.push(tmpKMeansBreaks[0]);
            for (var i$7=1; i$7 < tmpKMeansBreaks.length; i$7+= 2) {
                var v = tmpKMeansBreaks[i$7];
                if (!isNaN(v) && (limits.indexOf(v) === -1)) {
                    limits.push(v);
                }
            }
        }
        return limits;
    };

    var analyze_1 = {analyze: analyze, limits: limits};

    var contrast = function (a, b) {
        // WCAG contrast ratio
        // see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.luminance();
        var l2 = b.luminance();
        return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
    };

    var sqrt$4 = Math.sqrt;
    var atan2$2 = Math.atan2;
    var abs$1 = Math.abs;
    var cos$4 = Math.cos;
    var PI$2 = Math.PI;

    var deltaE = function(a, b, L, C) {
        if ( L === void 0 ) L=1;
        if ( C === void 0 ) C=1;

        // Delta E (CMC)
        // see http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CMC.html
        a = new Color_1(a);
        b = new Color_1(b);
        var ref = Array.from(a.lab());
        var L1 = ref[0];
        var a1 = ref[1];
        var b1 = ref[2];
        var ref$1 = Array.from(b.lab());
        var L2 = ref$1[0];
        var a2 = ref$1[1];
        var b2 = ref$1[2];
        var c1 = sqrt$4((a1 * a1) + (b1 * b1));
        var c2 = sqrt$4((a2 * a2) + (b2 * b2));
        var sl = L1 < 16.0 ? 0.511 : (0.040975 * L1) / (1.0 + (0.01765 * L1));
        var sc = ((0.0638 * c1) / (1.0 + (0.0131 * c1))) + 0.638;
        var h1 = c1 < 0.000001 ? 0.0 : (atan2$2(b1, a1) * 180.0) / PI$2;
        while (h1 < 0) { h1 += 360; }
        while (h1 >= 360) { h1 -= 360; }
        var t = (h1 >= 164.0) && (h1 <= 345.0) ? (0.56 + abs$1(0.2 * cos$4((PI$2 * (h1 + 168.0)) / 180.0))) : (0.36 + abs$1(0.4 * cos$4((PI$2 * (h1 + 35.0)) / 180.0)));
        var c4 = c1 * c1 * c1 * c1;
        var f = sqrt$4(c4 / (c4 + 1900.0));
        var sh = sc * (((f * t) + 1.0) - f);
        var delL = L1 - L2;
        var delC = c1 - c2;
        var delA = a1 - a2;
        var delB = b1 - b2;
        var dH2 = ((delA * delA) + (delB * delB)) - (delC * delC);
        var v1 = delL / (L * sl);
        var v2 = delC / (C * sc);
        var v3 = sh;
        return sqrt$4((v1 * v1) + (v2 * v2) + (dH2 / (v3 * v3)));
    };

    // simple Euclidean distance
    var distance = function(a, b, mode) {
        if ( mode === void 0 ) mode='lab';

        // Delta E (CIE 1976)
        // see http://www.brucelindbloom.com/index.html?Equations.html
        a = new Color_1(a);
        b = new Color_1(b);
        var l1 = a.get(mode);
        var l2 = b.get(mode);
        var sum_sq = 0;
        for (var i in l1) {
            var d = (l1[i] || 0) - (l2[i] || 0);
            sum_sq += d*d;
        }
        return Math.sqrt(sum_sq);
    };

    var valid = function () {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

        try {
            new (Function.prototype.bind.apply( Color_1, [ null ].concat( args) ));
            return true;
        } catch (e) {
            return false;
        }
    };

    // some pre-defined color scales:




    var scales = {
    	cool: function cool() { return scale([chroma_1.hsl(180,1,.9), chroma_1.hsl(250,.7,.4)]) },
    	hot: function hot() { return scale(['#000','#f00','#ff0','#fff'], [0,.25,.75,1]).mode('rgb') }
    };

    /**
        ColorBrewer colors for chroma.js

        Copyright (c) 2002 Cynthia Brewer, Mark Harrower, and The
        Pennsylvania State University.

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0

        Unless required by applicable law or agreed to in writing, software distributed
        under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
        CONDITIONS OF ANY KIND, either express or implied. See the License for the
        specific language governing permissions and limitations under the License.
    */

    var colorbrewer = {
        // sequential
        OrRd: ['#fff7ec', '#fee8c8', '#fdd49e', '#fdbb84', '#fc8d59', '#ef6548', '#d7301f', '#b30000', '#7f0000'],
        PuBu: ['#fff7fb', '#ece7f2', '#d0d1e6', '#a6bddb', '#74a9cf', '#3690c0', '#0570b0', '#045a8d', '#023858'],
        BuPu: ['#f7fcfd', '#e0ecf4', '#bfd3e6', '#9ebcda', '#8c96c6', '#8c6bb1', '#88419d', '#810f7c', '#4d004b'],
        Oranges: ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704'],
        BuGn: ['#f7fcfd', '#e5f5f9', '#ccece6', '#99d8c9', '#66c2a4', '#41ae76', '#238b45', '#006d2c', '#00441b'],
        YlOrBr: ['#ffffe5', '#fff7bc', '#fee391', '#fec44f', '#fe9929', '#ec7014', '#cc4c02', '#993404', '#662506'],
        YlGn: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
        Reds: ['#fff5f0', '#fee0d2', '#fcbba1', '#fc9272', '#fb6a4a', '#ef3b2c', '#cb181d', '#a50f15', '#67000d'],
        RdPu: ['#fff7f3', '#fde0dd', '#fcc5c0', '#fa9fb5', '#f768a1', '#dd3497', '#ae017e', '#7a0177', '#49006a'],
        Greens: ['#f7fcf5', '#e5f5e0', '#c7e9c0', '#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c', '#00441b'],
        YlGnBu: ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'],
        Purples: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#54278f', '#3f007d'],
        GnBu: ['#f7fcf0', '#e0f3db', '#ccebc5', '#a8ddb5', '#7bccc4', '#4eb3d3', '#2b8cbe', '#0868ac', '#084081'],
        Greys: ['#ffffff', '#f0f0f0', '#d9d9d9', '#bdbdbd', '#969696', '#737373', '#525252', '#252525', '#000000'],
        YlOrRd: ['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026'],
        PuRd: ['#f7f4f9', '#e7e1ef', '#d4b9da', '#c994c7', '#df65b0', '#e7298a', '#ce1256', '#980043', '#67001f'],
        Blues: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
        PuBuGn: ['#fff7fb', '#ece2f0', '#d0d1e6', '#a6bddb', '#67a9cf', '#3690c0', '#02818a', '#016c59', '#014636'],
        Viridis: ['#440154', '#482777', '#3f4a8a', '#31678e', '#26838f', '#1f9d8a', '#6cce5a', '#b6de2b', '#fee825'],

        // diverging

        Spectral: ['#9e0142', '#d53e4f', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#e6f598', '#abdda4', '#66c2a5', '#3288bd', '#5e4fa2'],
        RdYlGn: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'],
        RdBu: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#f7f7f7', '#d1e5f0', '#92c5de', '#4393c3', '#2166ac', '#053061'],
        PiYG: ['#8e0152', '#c51b7d', '#de77ae', '#f1b6da', '#fde0ef', '#f7f7f7', '#e6f5d0', '#b8e186', '#7fbc41', '#4d9221', '#276419'],
        PRGn: ['#40004b', '#762a83', '#9970ab', '#c2a5cf', '#e7d4e8', '#f7f7f7', '#d9f0d3', '#a6dba0', '#5aae61', '#1b7837', '#00441b'],
        RdYlBu: ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4', '#313695'],
        BrBG: ['#543005', '#8c510a', '#bf812d', '#dfc27d', '#f6e8c3', '#f5f5f5', '#c7eae5', '#80cdc1', '#35978f', '#01665e', '#003c30'],
        RdGy: ['#67001f', '#b2182b', '#d6604d', '#f4a582', '#fddbc7', '#ffffff', '#e0e0e0', '#bababa', '#878787', '#4d4d4d', '#1a1a1a'],
        PuOr: ['#7f3b08', '#b35806', '#e08214', '#fdb863', '#fee0b6', '#f7f7f7', '#d8daeb', '#b2abd2', '#8073ac', '#542788', '#2d004b'],

        // qualitative

        Set2: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854', '#ffd92f', '#e5c494', '#b3b3b3'],
        Accent: ['#7fc97f', '#beaed4', '#fdc086', '#ffff99', '#386cb0', '#f0027f', '#bf5b17', '#666666'],
        Set1: ['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'],
        Set3: ['#8dd3c7', '#ffffb3', '#bebada', '#fb8072', '#80b1d3', '#fdb462', '#b3de69', '#fccde5', '#d9d9d9', '#bc80bd', '#ccebc5', '#ffed6f'],
        Dark2: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a', '#66a61e', '#e6ab02', '#a6761d', '#666666'],
        Paired: ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a', '#ffff99', '#b15928'],
        Pastel2: ['#b3e2cd', '#fdcdac', '#cbd5e8', '#f4cae4', '#e6f5c9', '#fff2ae', '#f1e2cc', '#cccccc'],
        Pastel1: ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec', '#f2f2f2'],
    };

    // add lowercase aliases for case-insensitive matches
    for (var i$1 = 0, list$1 = Object.keys(colorbrewer); i$1 < list$1.length; i$1 += 1) {
        var key = list$1[i$1];

        colorbrewer[key.toLowerCase()] = colorbrewer[key];
    }

    var colorbrewer_1 = colorbrewer;

    // feel free to comment out anything to rollup
    // a smaller chroma.js built

    // io --> convert colors















    // operators --> modify existing Colors










    // interpolators










    // generators -- > create new colors
    chroma_1.average = average;
    chroma_1.bezier = bezier_1;
    chroma_1.blend = blend_1;
    chroma_1.cubehelix = cubehelix;
    chroma_1.mix = chroma_1.interpolate = mix;
    chroma_1.random = random_1;
    chroma_1.scale = scale;

    // other utility methods
    chroma_1.analyze = analyze_1.analyze;
    chroma_1.contrast = contrast;
    chroma_1.deltaE = deltaE;
    chroma_1.distance = distance;
    chroma_1.limits = analyze_1.limits;
    chroma_1.valid = valid;

    // scale
    chroma_1.scales = scales;

    // colors
    chroma_1.colors = w3cx11_1;
    chroma_1.brewer = colorbrewer_1;

    var chroma_js = chroma_1;

    return chroma_js;

})));

},{}],10:[function(require,module,exports){
"use strict";

var isValue             = require("type/value/is")
  , ensureValue         = require("type/value/ensure")
  , ensurePlainFunction = require("type/plain-function/ensure")
  , copy                = require("es5-ext/object/copy")
  , normalizeOptions    = require("es5-ext/object/normalize-options")
  , map                 = require("es5-ext/object/map");

var bind = Function.prototype.bind
  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , define;

define = function (name, desc, options) {
	var value = ensureValue(desc) && ensurePlainFunction(desc.value), dgs;
	dgs = copy(desc);
	delete dgs.writable;
	delete dgs.value;
	dgs.get = function () {
		if (!options.overwriteDefinition && hasOwnProperty.call(this, name)) return value;
		desc.value = bind.call(value, options.resolveContext ? options.resolveContext(this) : this);
		defineProperty(this, name, desc);
		return this[name];
	};
	return dgs;
};

module.exports = function (props/*, options*/) {
	var options = normalizeOptions(arguments[1]);
	if (isValue(options.resolveContext)) ensurePlainFunction(options.resolveContext);
	return map(props, function (desc, name) { return define(name, desc, options); });
};

},{"es5-ext/object/copy":28,"es5-ext/object/map":36,"es5-ext/object/normalize-options":37,"type/plain-function/ensure":70,"type/value/ensure":74,"type/value/is":75}],11:[function(require,module,exports){
"use strict";

var isValue         = require("type/value/is")
  , isPlainFunction = require("type/plain-function/is")
  , assign          = require("es5-ext/object/assign")
  , normalizeOpts   = require("es5-ext/object/normalize-options")
  , contains        = require("es5-ext/string/#/contains");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"es5-ext/object/assign":25,"es5-ext/object/normalize-options":37,"es5-ext/string/#/contains":44,"type/plain-function/is":71,"type/value/is":75}],12:[function(require,module,exports){
// Inspired by Google Closure:
// http://closure-library.googlecode.com/svn/docs/
// closure_goog_array_array.js.html#goog.array.clear

"use strict";

var value = require("../../object/valid-value");

module.exports = function () {
	value(this).length = 0;
	return this;
};

},{"../../object/valid-value":43}],13:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Array.from
	: require("./shim");

},{"./is-implemented":14,"./shim":15}],14:[function(require,module,exports){
"use strict";

module.exports = function () {
	var from = Array.from, arr, result;
	if (typeof from !== "function") return false;
	arr = ["raz", "dwa"];
	result = from(arr);
	return Boolean(result && (result !== arr) && (result[1] === "dwa"));
};

},{}],15:[function(require,module,exports){
"use strict";

var iteratorSymbol = require("es6-symbol").iterator
  , isArguments    = require("../../function/is-arguments")
  , isFunction     = require("../../function/is-function")
  , toPosInt       = require("../../number/to-pos-integer")
  , callable       = require("../../object/valid-callable")
  , validValue     = require("../../object/valid-value")
  , isValue        = require("../../object/is-value")
  , isString       = require("../../string/is-string")
  , isArray        = Array.isArray
  , call           = Function.prototype.call
  , desc           = { configurable: true, enumerable: true, writable: true, value: null }
  , defineProperty = Object.defineProperty;

// eslint-disable-next-line complexity, max-lines-per-function
module.exports = function (arrayLike /*, mapFn, thisArg*/) {
	var mapFn = arguments[1]
	  , thisArg = arguments[2]
	  , Context
	  , i
	  , j
	  , arr
	  , length
	  , code
	  , iterator
	  , result
	  , getIterator
	  , value;

	arrayLike = Object(validValue(arrayLike));

	if (isValue(mapFn)) callable(mapFn);
	if (!this || this === Array || !isFunction(this)) {
		// Result: Plain array
		if (!mapFn) {
			if (isArguments(arrayLike)) {
				// Source: Arguments
				length = arrayLike.length;
				if (length !== 1) return Array.apply(null, arrayLike);
				arr = new Array(1);
				arr[0] = arrayLike[0];
				return arr;
			}
			if (isArray(arrayLike)) {
				// Source: Array
				arr = new Array(length = arrayLike.length);
				for (i = 0; i < length; ++i) arr[i] = arrayLike[i];
				return arr;
			}
		}
		arr = [];
	} else {
		// Result: Non plain array
		Context = this;
	}

	if (!isArray(arrayLike)) {
		if ((getIterator = arrayLike[iteratorSymbol]) !== undefined) {
			// Source: Iterator
			iterator = callable(getIterator).call(arrayLike);
			if (Context) arr = new Context();
			result = iterator.next();
			i = 0;
			while (!result.done) {
				value = mapFn ? call.call(mapFn, thisArg, result.value, i) : result.value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, i, desc);
				} else {
					arr[i] = value;
				}
				result = iterator.next();
				++i;
			}
			length = i;
		} else if (isString(arrayLike)) {
			// Source: String
			length = arrayLike.length;
			if (Context) arr = new Context();
			for (i = 0, j = 0; i < length; ++i) {
				value = arrayLike[i];
				if (i + 1 < length) {
					code = value.charCodeAt(0);
					// eslint-disable-next-line max-depth
					if (code >= 0xd800 && code <= 0xdbff) value += arrayLike[++i];
				}
				value = mapFn ? call.call(mapFn, thisArg, value, j) : value;
				if (Context) {
					desc.value = value;
					defineProperty(arr, j, desc);
				} else {
					arr[j] = value;
				}
				++j;
			}
			length = j;
		}
	}
	if (length === undefined) {
		// Source: array or array-like
		length = toPosInt(arrayLike.length);
		if (Context) arr = new Context(length);
		for (i = 0; i < length; ++i) {
			value = mapFn ? call.call(mapFn, thisArg, arrayLike[i], i) : arrayLike[i];
			if (Context) {
				desc.value = value;
				defineProperty(arr, i, desc);
			} else {
				arr[i] = value;
			}
		}
	}
	if (Context) {
		desc.value = null;
		arr.length = length;
	}
	return arr;
};

},{"../../function/is-arguments":16,"../../function/is-function":17,"../../number/to-pos-integer":23,"../../object/is-value":32,"../../object/valid-callable":41,"../../object/valid-value":43,"../../string/is-string":47,"es6-symbol":56}],16:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString
  , id = objToString.call(
	(function () {
		return arguments;
	})()
);

module.exports = function (value) {
	return objToString.call(value) === id;
};

},{}],17:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString, id = objToString.call(require("./noop"));

module.exports = function (value) {
	return typeof value === "function" && objToString.call(value) === id;
};

},{"./noop":18}],18:[function(require,module,exports){
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],19:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Math.sign
	: require("./shim");

},{"./is-implemented":20,"./shim":21}],20:[function(require,module,exports){
"use strict";

module.exports = function () {
	var sign = Math.sign;
	if (typeof sign !== "function") return false;
	return (sign(10) === 1) && (sign(-20) === -1);
};

},{}],21:[function(require,module,exports){
"use strict";

module.exports = function (value) {
	value = Number(value);
	if (isNaN(value) || (value === 0)) return value;
	return value > 0 ? 1 : -1;
};

},{}],22:[function(require,module,exports){
"use strict";

var sign = require("../math/sign")

  , abs = Math.abs, floor = Math.floor;

module.exports = function (value) {
	if (isNaN(value)) return 0;
	value = Number(value);
	if ((value === 0) || !isFinite(value)) return value;
	return sign(value) * floor(abs(value));
};

},{"../math/sign":19}],23:[function(require,module,exports){
"use strict";

var toInteger = require("./to-integer")

  , max = Math.max;

module.exports = function (value) {
 return max(0, toInteger(value));
};

},{"./to-integer":22}],24:[function(require,module,exports){
// Internal method, used by iteration functions.
// Calls a function for each key-value pair found in object
// Optionally takes compareFn to iterate object in specific order

"use strict";

var callable                = require("./valid-callable")
  , value                   = require("./valid-value")
  , bind                    = Function.prototype.bind
  , call                    = Function.prototype.call
  , keys                    = Object.keys
  , objPropertyIsEnumerable = Object.prototype.propertyIsEnumerable;

module.exports = function (method, defVal) {
	return function (obj, cb /*, thisArg, compareFn*/) {
		var list, thisArg = arguments[2], compareFn = arguments[3];
		obj = Object(value(obj));
		callable(cb);

		list = keys(obj);
		if (compareFn) {
			list.sort(typeof compareFn === "function" ? bind.call(compareFn, obj) : undefined);
		}
		if (typeof method !== "function") method = list[method];
		return call.call(method, list, function (key, index) {
			if (!objPropertyIsEnumerable.call(obj, key)) return defVal;
			return call.call(cb, thisArg, obj[key], key, obj, index);
		});
	};
};

},{"./valid-callable":41,"./valid-value":43}],25:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Object.assign
	: require("./shim");

},{"./is-implemented":26,"./shim":27}],26:[function(require,module,exports){
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return (obj.foo + obj.bar + obj.trzy) === "razdwatrzy";
};

},{}],27:[function(require,module,exports){
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src /*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":33,"../valid-value":43}],28:[function(require,module,exports){
"use strict";

var aFrom  = require("../array/from")
  , assign = require("./assign")
  , value  = require("./valid-value");

module.exports = function (obj/*, propertyNames, options*/) {
	var copy = Object(value(obj)), propertyNames = arguments[1], options = Object(arguments[2]);
	if (copy !== obj && !propertyNames) return copy;
	var result = {};
	if (propertyNames) {
		aFrom(propertyNames, function (propertyName) {
			if (options.ensure || propertyName in obj) result[propertyName] = obj[propertyName];
		});
	} else {
		assign(result, obj);
	}
	return result;
};

},{"../array/from":13,"./assign":25,"./valid-value":43}],29:[function(require,module,exports){
// Workaround for http://code.google.com/p/v8/issues/detail?id=2804

"use strict";

var create = Object.create, shim;

if (!require("./set-prototype-of/is-implemented")()) {
	shim = require("./set-prototype-of/shim");
}

module.exports = (function () {
	var nullObject, polyProps, desc;
	if (!shim) return create;
	if (shim.level !== 1) return create;

	nullObject = {};
	polyProps = {};
	desc = {
		configurable: false,
		enumerable: false,
		writable: true,
		value: undefined
	};
	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
		if (name === "__proto__") {
			polyProps[name] = {
				configurable: true,
				enumerable: false,
				writable: true,
				value: undefined
			};
			return;
		}
		polyProps[name] = desc;
	});
	Object.defineProperties(nullObject, polyProps);

	Object.defineProperty(shim, "nullPolyfill", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: nullObject
	});

	return function (prototype, props) {
		return create(prototype === null ? nullObject : prototype, props);
	};
}());

},{"./set-prototype-of/is-implemented":39,"./set-prototype-of/shim":40}],30:[function(require,module,exports){
"use strict";

module.exports = require("./_iterate")("forEach");

},{"./_iterate":24}],31:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

var map = { function: true, object: true };

module.exports = function (value) {
	return (isValue(value) && map[typeof value]) || false;
};

},{"./is-value":32}],32:[function(require,module,exports){
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) {
 return (val !== _undefined) && (val !== null);
};

},{"../function/noop":18}],33:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

},{"./is-implemented":34,"./shim":35}],34:[function(require,module,exports){
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

},{}],35:[function(require,module,exports){
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

},{"../is-value":32}],36:[function(require,module,exports){
"use strict";

var callable = require("./valid-callable")
  , forEach  = require("./for-each")
  , call     = Function.prototype.call;

module.exports = function (obj, cb /*, thisArg*/) {
	var result = {}, thisArg = arguments[2];
	callable(cb);
	forEach(obj, function (value, key, targetObj, index) {
		result[key] = call.call(cb, thisArg, value, key, targetObj, index);
	});
	return result;
};

},{"./for-each":30,"./valid-callable":41}],37:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1 /*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":32}],38:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? Object.setPrototypeOf
	: require("./shim");

},{"./is-implemented":39,"./shim":40}],39:[function(require,module,exports){
"use strict";

var create = Object.create, getPrototypeOf = Object.getPrototypeOf, plainObject = {};

module.exports = function (/* CustomCreate*/) {
	var setPrototypeOf = Object.setPrototypeOf, customCreate = arguments[0] || create;
	if (typeof setPrototypeOf !== "function") return false;
	return getPrototypeOf(setPrototypeOf(customCreate(null), plainObject)) === plainObject;
};

},{}],40:[function(require,module,exports){
/* eslint no-proto: "off" */

// Big thanks to @WebReflection for sorting this out
// https://gist.github.com/WebReflection/5593554

"use strict";

var isObject        = require("../is-object")
  , value           = require("../valid-value")
  , objIsPrototypeOf = Object.prototype.isPrototypeOf
  , defineProperty  = Object.defineProperty
  , nullDesc        = {
	configurable: true,
	enumerable: false,
	writable: true,
	value: undefined
}
  , validate;

validate = function (obj, prototype) {
	value(obj);
	if (prototype === null || isObject(prototype)) return obj;
	throw new TypeError("Prototype must be null or an object");
};

module.exports = (function (status) {
	var fn, set;
	if (!status) return null;
	if (status.level === 2) {
		if (status.set) {
			set = status.set;
			fn = function (obj, prototype) {
				set.call(validate(obj, prototype), prototype);
				return obj;
			};
		} else {
			fn = function (obj, prototype) {
				validate(obj, prototype).__proto__ = prototype;
				return obj;
			};
		}
	} else {
		fn = function self(obj, prototype) {
			var isNullBase;
			validate(obj, prototype);
			isNullBase = objIsPrototypeOf.call(self.nullPolyfill, obj);
			if (isNullBase) delete self.nullPolyfill.__proto__;
			if (prototype === null) prototype = self.nullPolyfill;
			obj.__proto__ = prototype;
			if (isNullBase) defineProperty(self.nullPolyfill, "__proto__", nullDesc);
			return obj;
		};
	}
	return Object.defineProperty(fn, "level", {
		configurable: false,
		enumerable: false,
		writable: false,
		value: status.level
	});
}(
	(function () {
		var tmpObj1 = Object.create(null)
		  , tmpObj2 = {}
		  , set
		  , desc = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__");

		if (desc) {
			try {
				set = desc.set; // Opera crashes at this point
				set.call(tmpObj1, tmpObj2);
			} catch (ignore) {}
			if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { set: set, level: 2 };
		}

		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 2 };

		tmpObj1 = {};
		tmpObj1.__proto__ = tmpObj2;
		if (Object.getPrototypeOf(tmpObj1) === tmpObj2) return { level: 1 };

		return false;
	})()
));

require("../create");

},{"../create":29,"../is-object":31,"../valid-value":43}],41:[function(require,module,exports){
"use strict";

module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],42:[function(require,module,exports){
"use strict";

var isObject = require("./is-object");

module.exports = function (value) {
	if (!isObject(value)) throw new TypeError(value + " is not an Object");
	return value;
};

},{"./is-object":31}],43:[function(require,module,exports){
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":32}],44:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")()
	? String.prototype.contains
	: require("./shim");

},{"./is-implemented":45,"./shim":46}],45:[function(require,module,exports){
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return (str.contains("dwa") === true) && (str.contains("foo") === false);
};

},{}],46:[function(require,module,exports){
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],47:[function(require,module,exports){
"use strict";

var objToString = Object.prototype.toString, id = objToString.call("");

module.exports = function (value) {
	return (
		typeof value === "string" ||
		(value &&
			typeof value === "object" &&
			(value instanceof String || objToString.call(value) === id)) ||
		false
	);
};

},{}],48:[function(require,module,exports){
"use strict";

var generated = Object.create(null), random = Math.random;

module.exports = function () {
	var str;
	do {
		str = random()
			.toString(36)
			.slice(2);
	} while (generated[str]);
	return str;
};

},{}],49:[function(require,module,exports){
"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , contains       = require("es5-ext/string/#/contains")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, ArrayIterator;

ArrayIterator = module.exports = function (arr, kind) {
	if (!(this instanceof ArrayIterator)) throw new TypeError("Constructor requires 'new'");
	Iterator.call(this, arr);
	if (!kind) kind = "value";
	else if (contains.call(kind, "key+value")) kind = "key+value";
	else if (contains.call(kind, "key")) kind = "key";
	else kind = "value";
	defineProperty(this, "__kind__", d("", kind));
};
if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete ArrayIterator.prototype.constructor;

ArrayIterator.prototype = Object.create(Iterator.prototype, {
	_resolve: d(function (i) {
		if (this.__kind__ === "value") return this.__list__[i];
		if (this.__kind__ === "key+value") return [i, this.__list__[i]];
		return i;
	})
});
defineProperty(ArrayIterator.prototype, Symbol.toStringTag, d("c", "Array Iterator"));

},{"./":52,"d":11,"es5-ext/object/set-prototype-of":38,"es5-ext/string/#/contains":44,"es6-symbol":56}],50:[function(require,module,exports){
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , callable    = require("es5-ext/object/valid-callable")
  , isString    = require("es5-ext/string/is-string")
  , get         = require("./get");

var isArray = Array.isArray, call = Function.prototype.call, some = Array.prototype.some;

module.exports = function (iterable, cb /*, thisArg*/) {
	var mode, thisArg = arguments[2], result, doBreak, broken, i, length, char, code;
	if (isArray(iterable) || isArguments(iterable)) mode = "array";
	else if (isString(iterable)) mode = "string";
	else iterable = get(iterable);

	callable(cb);
	doBreak = function () {
		broken = true;
	};
	if (mode === "array") {
		some.call(iterable, function (value) {
			call.call(cb, thisArg, value, doBreak);
			return broken;
		});
		return;
	}
	if (mode === "string") {
		length = iterable.length;
		for (i = 0; i < length; ++i) {
			char = iterable[i];
			if (i + 1 < length) {
				code = char.charCodeAt(0);
				if (code >= 0xd800 && code <= 0xdbff) char += iterable[++i];
			}
			call.call(cb, thisArg, char, doBreak);
			if (broken) break;
		}
		return;
	}
	result = iterable.next();

	while (!result.done) {
		call.call(cb, thisArg, result.value, doBreak);
		if (broken) return;
		result = iterable.next();
	}
};

},{"./get":51,"es5-ext/function/is-arguments":16,"es5-ext/object/valid-callable":41,"es5-ext/string/is-string":47}],51:[function(require,module,exports){
"use strict";

var isArguments    = require("es5-ext/function/is-arguments")
  , isString       = require("es5-ext/string/is-string")
  , ArrayIterator  = require("./array")
  , StringIterator = require("./string")
  , iterable       = require("./valid-iterable")
  , iteratorSymbol = require("es6-symbol").iterator;

module.exports = function (obj) {
	if (typeof iterable(obj)[iteratorSymbol] === "function") return obj[iteratorSymbol]();
	if (isArguments(obj)) return new ArrayIterator(obj);
	if (isString(obj)) return new StringIterator(obj);
	return new ArrayIterator(obj);
};

},{"./array":49,"./string":54,"./valid-iterable":55,"es5-ext/function/is-arguments":16,"es5-ext/string/is-string":47,"es6-symbol":56}],52:[function(require,module,exports){
"use strict";

var clear    = require("es5-ext/array/#/clear")
  , assign   = require("es5-ext/object/assign")
  , callable = require("es5-ext/object/valid-callable")
  , value    = require("es5-ext/object/valid-value")
  , d        = require("d")
  , autoBind = require("d/auto-bind")
  , Symbol   = require("es6-symbol");

var defineProperty = Object.defineProperty, defineProperties = Object.defineProperties, Iterator;

module.exports = Iterator = function (list, context) {
	if (!(this instanceof Iterator)) throw new TypeError("Constructor requires 'new'");
	defineProperties(this, {
		__list__: d("w", value(list)),
		__context__: d("w", context),
		__nextIndex__: d("w", 0)
	});
	if (!context) return;
	callable(context.on);
	context.on("_add", this._onAdd);
	context.on("_delete", this._onDelete);
	context.on("_clear", this._onClear);
};

// Internal %IteratorPrototype% doesn't expose its constructor
delete Iterator.prototype.constructor;

defineProperties(
	Iterator.prototype,
	assign(
		{
			_next: d(function () {
				var i;
				if (!this.__list__) return undefined;
				if (this.__redo__) {
					i = this.__redo__.shift();
					if (i !== undefined) return i;
				}
				if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
				this._unBind();
				return undefined;
			}),
			next: d(function () {
				return this._createResult(this._next());
			}),
			_createResult: d(function (i) {
				if (i === undefined) return { done: true, value: undefined };
				return { done: false, value: this._resolve(i) };
			}),
			_resolve: d(function (i) {
				return this.__list__[i];
			}),
			_unBind: d(function () {
				this.__list__ = null;
				delete this.__redo__;
				if (!this.__context__) return;
				this.__context__.off("_add", this._onAdd);
				this.__context__.off("_delete", this._onDelete);
				this.__context__.off("_clear", this._onClear);
				this.__context__ = null;
			}),
			toString: d(function () {
				return "[object " + (this[Symbol.toStringTag] || "Object") + "]";
			})
		},
		autoBind({
			_onAdd: d(function (index) {
				if (index >= this.__nextIndex__) return;
				++this.__nextIndex__;
				if (!this.__redo__) {
					defineProperty(this, "__redo__", d("c", [index]));
					return;
				}
				this.__redo__.forEach(function (redo, i) {
					if (redo >= index) this.__redo__[i] = ++redo;
				}, this);
				this.__redo__.push(index);
			}),
			_onDelete: d(function (index) {
				var i;
				if (index >= this.__nextIndex__) return;
				--this.__nextIndex__;
				if (!this.__redo__) return;
				i = this.__redo__.indexOf(index);
				if (i !== -1) this.__redo__.splice(i, 1);
				this.__redo__.forEach(function (redo, j) {
					if (redo > index) this.__redo__[j] = --redo;
				}, this);
			}),
			_onClear: d(function () {
				if (this.__redo__) clear.call(this.__redo__);
				this.__nextIndex__ = 0;
			})
		})
	)
);

defineProperty(
	Iterator.prototype,
	Symbol.iterator,
	d(function () {
		return this;
	})
);

},{"d":11,"d/auto-bind":10,"es5-ext/array/#/clear":12,"es5-ext/object/assign":25,"es5-ext/object/valid-callable":41,"es5-ext/object/valid-value":43,"es6-symbol":56}],53:[function(require,module,exports){
"use strict";

var isArguments = require("es5-ext/function/is-arguments")
  , isValue     = require("es5-ext/object/is-value")
  , isString    = require("es5-ext/string/is-string");

var iteratorSymbol = require("es6-symbol").iterator
  , isArray        = Array.isArray;

module.exports = function (value) {
	if (!isValue(value)) return false;
	if (isArray(value)) return true;
	if (isString(value)) return true;
	if (isArguments(value)) return true;
	return typeof value[iteratorSymbol] === "function";
};

},{"es5-ext/function/is-arguments":16,"es5-ext/object/is-value":32,"es5-ext/string/is-string":47,"es6-symbol":56}],54:[function(require,module,exports){
// Thanks @mathiasbynens
// http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols

"use strict";

var setPrototypeOf = require("es5-ext/object/set-prototype-of")
  , d              = require("d")
  , Symbol         = require("es6-symbol")
  , Iterator       = require("./");

var defineProperty = Object.defineProperty, StringIterator;

StringIterator = module.exports = function (str) {
	if (!(this instanceof StringIterator)) throw new TypeError("Constructor requires 'new'");
	str = String(str);
	Iterator.call(this, str);
	defineProperty(this, "__length__", d("", str.length));
};
if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);

// Internal %ArrayIteratorPrototype% doesn't expose its constructor
delete StringIterator.prototype.constructor;

StringIterator.prototype = Object.create(Iterator.prototype, {
	_next: d(function () {
		if (!this.__list__) return undefined;
		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
		this._unBind();
		return undefined;
	}),
	_resolve: d(function (i) {
		var char = this.__list__[i], code;
		if (this.__nextIndex__ === this.__length__) return char;
		code = char.charCodeAt(0);
		if (code >= 0xd800 && code <= 0xdbff) return char + this.__list__[this.__nextIndex__++];
		return char;
	})
});
defineProperty(StringIterator.prototype, Symbol.toStringTag, d("c", "String Iterator"));

},{"./":52,"d":11,"es5-ext/object/set-prototype-of":38,"es6-symbol":56}],55:[function(require,module,exports){
"use strict";

var isIterable = require("./is-iterable");

module.exports = function (value) {
	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
	return value;
};

},{"./is-iterable":53}],56:[function(require,module,exports){
'use strict';

module.exports = require('./is-implemented')() ? Symbol : require('./polyfill');

},{"./is-implemented":57,"./polyfill":59}],57:[function(require,module,exports){
'use strict';

var validTypes = { object: true, symbol: true };

module.exports = function () {
	var symbol;
	if (typeof Symbol !== 'function') return false;
	symbol = Symbol('test symbol');
	try { String(symbol); } catch (e) { return false; }

	// Return 'true' also for polyfills
	if (!validTypes[typeof Symbol.iterator]) return false;
	if (!validTypes[typeof Symbol.toPrimitive]) return false;
	if (!validTypes[typeof Symbol.toStringTag]) return false;

	return true;
};

},{}],58:[function(require,module,exports){
'use strict';

module.exports = function (x) {
	if (!x) return false;
	if (typeof x === 'symbol') return true;
	if (!x.constructor) return false;
	if (x.constructor.name !== 'Symbol') return false;
	return (x[x.constructor.toStringTag] === 'Symbol');
};

},{}],59:[function(require,module,exports){
// ES2015 Symbol polyfill for environments that do not (or partially) support it

'use strict';

var d              = require('d')
  , validateSymbol = require('./validate-symbol')

  , create = Object.create, defineProperties = Object.defineProperties
  , defineProperty = Object.defineProperty, objPrototype = Object.prototype
  , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null)
  , isNativeSafe;

if (typeof Symbol === 'function') {
	NativeSymbol = Symbol;
	try {
		String(NativeSymbol());
		isNativeSafe = true;
	} catch (ignore) {}
}

var generateName = (function () {
	var created = create(null);
	return function (desc) {
		var postfix = 0, name, ie11BugWorkaround;
		while (created[desc + (postfix || '')]) ++postfix;
		desc += (postfix || '');
		created[desc] = true;
		name = '@@' + desc;
		defineProperty(objPrototype, name, d.gs(null, function (value) {
			// For IE11 issue see:
			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
			//    ie11-broken-getters-on-dom-objects
			// https://github.com/medikoo/es6-symbol/issues/12
			if (ie11BugWorkaround) return;
			ie11BugWorkaround = true;
			defineProperty(this, name, d(value));
			ie11BugWorkaround = false;
		}));
		return name;
	};
}());

// Internal constructor (not one exposed) for creating Symbol instances.
// This one is used to ensure that `someSymbol instanceof Symbol` always return false
HiddenSymbol = function Symbol(description) {
	if (this instanceof HiddenSymbol) throw new TypeError('Symbol is not a constructor');
	return SymbolPolyfill(description);
};

// Exposed `Symbol` constructor
// (returns instances of HiddenSymbol)
module.exports = SymbolPolyfill = function Symbol(description) {
	var symbol;
	if (this instanceof Symbol) throw new TypeError('Symbol is not a constructor');
	if (isNativeSafe) return NativeSymbol(description);
	symbol = create(HiddenSymbol.prototype);
	description = (description === undefined ? '' : String(description));
	return defineProperties(symbol, {
		__description__: d('', description),
		__name__: d('', generateName(description))
	});
};
defineProperties(SymbolPolyfill, {
	for: d(function (key) {
		if (globalSymbols[key]) return globalSymbols[key];
		return (globalSymbols[key] = SymbolPolyfill(String(key)));
	}),
	keyFor: d(function (s) {
		var key;
		validateSymbol(s);
		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
	}),

	// To ensure proper interoperability with other native functions (e.g. Array.from)
	// fallback to eventual native implementation of given symbol
	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
		SymbolPolyfill('isConcatSpreadable')),
	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
});

// Internal tweaks for real symbol producer
defineProperties(HiddenSymbol.prototype, {
	constructor: d(SymbolPolyfill),
	toString: d('', function () { return this.__name__; })
});

// Proper implementation of methods exposed on Symbol.prototype
// They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
defineProperties(SymbolPolyfill.prototype, {
	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
	valueOf: d(function () { return validateSymbol(this); })
});
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('', function () {
	var symbol = validateSymbol(this);
	if (typeof symbol === 'symbol') return symbol;
	return symbol.toString();
}));
defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));

// Proper implementaton of toPrimitive and toStringTag for returned symbol instances
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));

// Note: It's important to define `toPrimitive` as last one, as some implementations
// implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
// And that may invoke error in definition flow:
// See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));

},{"./validate-symbol":60,"d":11}],60:[function(require,module,exports){
'use strict';

var isSymbol = require('./is-symbol');

module.exports = function (value) {
	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
	return value;
};

},{"./is-symbol":58}],61:[function(require,module,exports){
"use strict";

module.exports = require("./is-implemented")() ? WeakMap : require("./polyfill");

},{"./is-implemented":62,"./polyfill":64}],62:[function(require,module,exports){
"use strict";

module.exports = function () {
	var weakMap, obj;

	if (typeof WeakMap !== "function") return false;
	try {
		// WebKit doesn't support arguments and crashes
		weakMap = new WeakMap([[obj = {}, "one"], [{}, "two"], [{}, "three"]]);
	} catch (e) {
		return false;
	}
	if (String(weakMap) !== "[object WeakMap]") return false;
	if (typeof weakMap.set !== "function") return false;
	if (weakMap.set({}, 1) !== weakMap) return false;
	if (typeof weakMap.delete !== "function") return false;
	if (typeof weakMap.has !== "function") return false;
	if (weakMap.get(obj) !== "one") return false;

	return true;
};

},{}],63:[function(require,module,exports){
// Exports true if environment provides native `WeakMap` implementation, whatever that is.

"use strict";

module.exports = (function () {
	if (typeof WeakMap !== "function") return false;
	return Object.prototype.toString.call(new WeakMap()) === "[object WeakMap]";
}());

},{}],64:[function(require,module,exports){
"use strict";

var isValue           = require("es5-ext/object/is-value")
  , setPrototypeOf    = require("es5-ext/object/set-prototype-of")
  , object            = require("es5-ext/object/valid-object")
  , ensureValue       = require("es5-ext/object/valid-value")
  , randomUniq        = require("es5-ext/string/random-uniq")
  , d                 = require("d")
  , getIterator       = require("es6-iterator/get")
  , forOf             = require("es6-iterator/for-of")
  , toStringTagSymbol = require("es6-symbol").toStringTag
  , isNative          = require("./is-native-implemented")

  , isArray = Array.isArray, defineProperty = Object.defineProperty
  , objHasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
  , WeakMapPoly;

module.exports = WeakMapPoly = function (/* Iterable*/) {
	var iterable = arguments[0], self;

	if (!(this instanceof WeakMapPoly)) throw new TypeError("Constructor requires 'new'");
	self = isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)
		? setPrototypeOf(new WeakMap(), getPrototypeOf(this)) : this;

	if (isValue(iterable)) {
		if (!isArray(iterable)) iterable = getIterator(iterable);
	}
	defineProperty(self, "__weakMapData__", d("c", "$weakMap$" + randomUniq()));
	if (!iterable) return self;
	forOf(iterable, function (val) {
		ensureValue(val);
		self.set(val[0], val[1]);
	});
	return self;
};

if (isNative) {
	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
	WeakMapPoly.prototype = Object.create(WeakMap.prototype, { constructor: d(WeakMapPoly) });
}

Object.defineProperties(WeakMapPoly.prototype, {
	delete: d(function (key) {
		if (objHasOwnProperty.call(object(key), this.__weakMapData__)) {
			delete key[this.__weakMapData__];
			return true;
		}
		return false;
	}),
	get: d(function (key) {
		if (!objHasOwnProperty.call(object(key), this.__weakMapData__)) return undefined;
		return key[this.__weakMapData__];
	}),
	has: d(function (key) {
		return objHasOwnProperty.call(object(key), this.__weakMapData__);
	}),
	set: d(function (key, value) {
		defineProperty(object(key), this.__weakMapData__, d("c", value));
		return this;
	}),
	toString: d(function () {
		return "[object WeakMap]";
	})
});
defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d("c", "WeakMap"));

},{"./is-native-implemented":63,"d":11,"es5-ext/object/is-value":32,"es5-ext/object/set-prototype-of":38,"es5-ext/object/valid-object":42,"es5-ext/object/valid-value":43,"es5-ext/string/random-uniq":48,"es6-iterator/for-of":50,"es6-iterator/get":51,"es6-symbol":56}],65:[function(require,module,exports){
"use strict";

var isPrototype = require("../prototype/is");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};

},{"../prototype/is":72}],66:[function(require,module,exports){
"use strict";

var isValue       = require("../value/is")
  , isObject      = require("../object/is")
  , stringCoerce  = require("../string/coerce")
  , toShortString = require("./to-short-string");

var resolveMessage = function (message, value) {
	return message.replace("%v", toShortString(value));
};

module.exports = function (value, defaultMessage, inputOptions) {
	if (!isObject(inputOptions)) throw new TypeError(resolveMessage(defaultMessage, value));
	if (!isValue(value)) {
		if ("default" in inputOptions) return inputOptions["default"];
		if (inputOptions.isOptional) return null;
	}
	var errorMessage = stringCoerce(inputOptions.errorMessage);
	if (!isValue(errorMessage)) errorMessage = defaultMessage;
	throw new TypeError(resolveMessage(errorMessage, value));
};

},{"../object/is":69,"../string/coerce":73,"../value/is":75,"./to-short-string":68}],67:[function(require,module,exports){
"use strict";

module.exports = function (value) {
	try {
		return value.toString();
	} catch (error) {
		try { return String(value); }
		catch (error2) { return null; }
	}
};

},{}],68:[function(require,module,exports){
"use strict";

var safeToString = require("./safe-to-string");

var reNewLine = /[\n\r\u2028\u2029]/g;

module.exports = function (value) {
	var string = safeToString(value);
	if (string === null) return "<Non-coercible to string value>";
	// Trim if too long
	if (string.length > 100) string = string.slice(0, 99) + "…";
	// Replace eventual new lines
	string = string.replace(reNewLine, function (char) {
		switch (char) {
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\u2028":
				return "\\u2028";
			case "\u2029":
				return "\\u2029";
			/* istanbul ignore next */
			default:
				throw new Error("Unexpected character");
		}
	});
	return string;
};

},{"./safe-to-string":67}],69:[function(require,module,exports){
"use strict";

var isValue = require("../value/is");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

},{"../value/is":75}],70:[function(require,module,exports){
"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "%v is not a plain function", arguments[1]);
};

},{"../lib/resolve-exception":66,"./is":71}],71:[function(require,module,exports){
"use strict";

var isFunction = require("../function/is");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

},{"../function/is":65}],72:[function(require,module,exports){
"use strict";

var isObject = require("../object/is");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

},{"../object/is":69}],73:[function(require,module,exports){
"use strict";

var isValue  = require("../value/is")
  , isObject = require("../object/is");

var objectToString = Object.prototype.toString;

module.exports = function (value) {
	if (!isValue(value)) return null;
	if (isObject(value)) {
		// Reject Object.prototype.toString coercion
		var valueToString = value.toString;
		if (typeof valueToString !== "function") return null;
		if (valueToString === objectToString) return null;
		// Note: It can be object coming from other realm, still as there's no ES3 and CSP compliant
		// way to resolve its realm's Object.prototype.toString it's left as not addressed edge case
	}
	try {
		return "" + value; // Ensure implicit coercion
	} catch (error) {
		return null;
	}
};

},{"../object/is":69,"../value/is":75}],74:[function(require,module,exports){
"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*, options*/) {
	if (is(value)) return value;
	return resolveException(value, "Cannot use %v", arguments[1]);
};

},{"../lib/resolve-exception":66,"./is":75}],75:[function(require,module,exports){
"use strict";

// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };

},{}]},{},[1])(1)
});
