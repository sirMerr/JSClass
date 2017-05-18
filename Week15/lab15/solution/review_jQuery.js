"use strict";

var g = {
  imageData: [
    {
      "albumId": 4,
      "id": 151,
      "title": "possimus dolor minima provident ipsam",
      "url": "http://placehold.it/600/1d2ad4",
      "thumbnailUrl": "http://placehold.it/150/1d2ad4"
    },
    {
      "albumId": 4,
      "id": 152,
      "title": "et accusantium enim pariatur eum nihil fugit",
      "url": "http://placehold.it/600/a01c5b",
      "thumbnailUrl": "http://placehold.it/150/a01c5b"
    },
    {
      "albumId": 4,
      "id": 153,
      "title": "eum laborum in sunt ea",
      "url": "http://placehold.it/600/9da52c",
      "thumbnailUrl": "http://placehold.it/150/9da52c"
    },
    {
      "albumId": 4,
      "id": 154,
      "title": "dolorum ipsam odit",
      "url": "http://placehold.it/600/7f330f",
      "thumbnailUrl": "http://placehold.it/150/7f330f"
    },
    {
      "albumId": 4,
      "id": 155,
      "title": "occaecati sed earum ab ut vel quibusdam perferendis nihil",
      "url": "http://placehold.it/600/877cd8",
      "thumbnailUrl": "http://placehold.it/150/877cd8"
    },
    {
      "albumId": 4,
      "id": 156,
      "title": "sed quia accusantium nemo placeat dolor ut",
      "url": "http://placehold.it/600/11af10",
      "thumbnailUrl": "http://placehold.it/150/11af10"
    }
  ]
};

$(function () {
  $("#testAccordion").accordion({
    header: ".subsection",
    active: 2
  });
  var images = g.imageData.map(function(i) {
    return $("<img/>", {
      src: i.thumbnailUrl,
      alt: i.title
    });
  });
  $("section").last().append(
    $("<div/>", {id: "imageWrapper"})
  );
  $("#imageWrapper").css("width", "50%").append(images);
  $("#imageWrapper").on("click", function (e) {
    $(e.target).hide(300);
  });
});
