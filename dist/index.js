"use strict"

function update() {

  // Empty the results container
  $("#colors").text("")

  // Try to parse the input
  try {
    var color = colorNamer.chroma($("#query").val())
  } catch(e) {
    return console.error(e)
  }

  // Change background color to query color
  // Change text color to black or white depending on query color
  $("body").css({
    backgroundColor: color.hex(),
    color: (color.luminance() > 0.5) ? "black" : "white"
  })

  // Add hex to URL fragment
  window.location.hash = color.hex()

  // Update page title
  document.title = "Names for " + color.hex()

  // Style input placeholder text color
  $("input").css({
    color: (color.luminance() > 0.5) ? "black" : "white"
  })

  // Toggle input placeholder color
  $("#query").toggleClass("white", color.luminance() < 0.5)
  // Find color names
  var colors = colorNamer(color.hex(), {keep: 'colornamelist'})
  console.log(colors)
  // Refresh list
  colors.colornamelist.forEach(function(c) {
    $("#colors").append(ich.color(c))
  })
}

$(function(){
  $("#query").on('change', update)

  $("form").on('submit', function(e) {
    return false
  })

  if (window.location.hash) {
    $("#query").val(window.location.hash)
  }

  update()
})
