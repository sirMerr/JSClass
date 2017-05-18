/* global $ */
"use strict";

var g = {
  // used for slide show
  imageData: [
    {
      "albumId": 4,
      "id": 151,
      "title": "0 possimus dolor minima provident ipsam",
      "url": "http://placehold.it/600/1d2ad4",
      "thumbnailUrl": "http://placehold.it/150/1d2ad4"
    },
    {
      "albumId": 4,
      "id": 152,
      "title": "1 et accusantium enim pariatur eum nihil fugit",
      "url": "http://placehold.it/600/a01c5b",
      "thumbnailUrl": "http://placehold.it/150/a01c5b"
    },
    {
      "albumId": 4,
      "id": 153,
      "title": "2 eum laborum in sunt ea",
      "url": "http://placehold.it/600/9da52c",
      "thumbnailUrl": "http://placehold.it/150/9da52c"
    },
    {
      "albumId": 4,
      "id": 154,
      "title": "3 dolorum ipsam odit",
      "url": "http://placehold.it/600/7f330f",
      "thumbnailUrl": "http://placehold.it/150/7f330f"
    },
    {
      "albumId": 4,
      "id": 155,
      "title": "4 occaecati sed earum ab ut vel quibusdam perferendis nihil",
      "url": "http://placehold.it/600/877cd8",
      "thumbnailUrl": "http://placehold.it/150/877cd8"
    },
    {
      "albumId": 4,
      "id": 156,
      "title": "5 sed quia accusantium nemo placeat dolor ut",
      "url": "http://placehold.it/600/11af10",
      "thumbnailUrl": "http://placehold.it/150/11af10"
    }
  ],

  init: function () {
    // slide show (TODO)
    g.showButton = document.getElementById("showBtn");
    g.imageWrapper = document.getElementById("wrapper");
    g.sectionSlideshow = document.querySelector('.slideshow');
    g.counter = 1;

    // preload images
    var preloadedImages = g.imageData.map(function(element) {
      var myImage = new Image();
      myImage.src = element.thumbnailUrl;
      myImage.alt = element.title;
      return myImage;
    });

    g.imageWrapper.appendChild(preloadedImages[0]);

    // // accordion
    // $('#testAccordion').accordion(
    //   { header: '.subsection', option1: 'First Description', option2: 'Second Description',     option3: 'Third Description', active: 2 }
    // );

    // // populate last section with images
    // var actualArray = $.makeArray(g.imageData);
    // var newImageArray = $.map(actualArray, function(element) {
    //   var img = $('<img>');
    //   img.attr('src', element['thumbnailUrl']);
    //   img.attr('alt', element['title']);
    //   return img;
    // });

    // g.hiddenImg = '';
    // $('section').last().append('<div id="imageWrapper"></div>');
    // $('#imageWrapper').css('width', '50%').append(newImageArray).children().click(function() {
    //   $(this).hide();
    // });

    // welcome greeting (TODO)
    g.guestEl = document.querySelector("#welcome a");
    g.textarea = document.querySelector('input');
    g.guestEl.addEventListener('click', function() {
      g.textarea.classList.remove('invisible');
      g.guestEl.classList.add('invisible');
    })



    // ajax queries (TODO)
    g.queryButtons = document.querySelectorAll(".query");


  },

  displayEmails: function (data) {
    // TODO
    return;
  },

  displayError: function (request) {
    // TODO
    return;
  },

  getRequestHandler: function(url) {
    // TODO
    return;
  },

  updateCookieObj: function () {
    g.allCookies = {};
    // TODO
  }

};

document.addEventListener('DOMContentLoaded', g.init)

// $(g.init);
