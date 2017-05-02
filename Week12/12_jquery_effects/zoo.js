"use strict";

var z = {
  files: ["panda.jpg", "glassSpider.jpg"]
};

$(function () {
  console.log("It's ready!");
  var images = preload(z.files);
  // add second section element
  $("#attractions").after($("<section/>"));
  // append images as children of the last (second) section
  $("section").last().append(images);
  // attach event handler to parent section (event delegation)
  $("#attractions").click(showImage);
  // unrelated: a demo of method chaining, also using on instead of click
  $("p a")
    .text("Call")
    .css("color", "red")
    .on("click", function () {
      console.log("hi!")
    });
});

function showImage(e) {
  // Because we attached showImage with jQeury's click method
  // the e represents an event wrapped by jQuery for cross-browser support,
  // so you can use e.target, for example, regardless of browser.
  // e.originalEvent is the original browser Event object.
  // e.target is a DOM element, so we have to wrap it in $() to use jQuery
  // methods.
  var target = $(e.target);
  if (!target.is("a")) {
    return;
  }
  var name = target.text();
  // change name based on textContent of clicked element to match id
  if (name.indexOf("Panda") !== -1) {
    name = "panda";
  } else {
    name = "glassSpider";
  }
  var requestedImage = $("#" + name);
  // (Could use the jquery `toggle` method instead of show/hide.)
  // Hack: hide all images in any section except the requested image.
  $("section img")
    .not(requestedImage)
    .hide();
  requestedImage.show("slow");
}

function preload(files) {
  return files.map(function (f) {
    var name = f.slice(0, f.indexOf("."));
    return $("<img/>", {
        src: f,
        id: name,
        alt: name,
        style: "display:none"
    });
  });
}
