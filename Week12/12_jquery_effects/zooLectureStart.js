"use strict";

var z = {
  files: ["panda.jpg", "glassSpider.jpg"]
};


// TODO rewrite using jQuery
function preload(files) {
  return files.map(function (f) {
    var img = new Image();
    img.src = f;
    img.alt = f;
    return img;
  });
}
