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
    g.updateCookieObj(document.cookie);


    if (document.cookie) {
      g.guestEl.textContent = g.allCookies['name'];
    }
    g.guestEl.addEventListener('click', function() {
      g.textarea.classList.remove('invisible');
      g.textarea.addEventListener('keyup', enterUsername);
      g.guestEl.classList.add('invisible');
    })

    function enterUsername(e) {
      var keyCode = e.keyCode;
      if (keyCode === 13) {
        debugger
        g.guestEl.classList.remove('invisible');
        g.guestEl.textContent = g.textarea.value;
        g.textarea.classList.add('invisible');
        var date = new Date();
        date.setDate((date.getDate() + 10));
        document.cookie="name=" + g.textarea.value + "; expires=" + date;
      }
    }



    // ajax queries (TODO)
    g.queryButtons = document.querySelectorAll(".query");
    g.queryButtons[0].addEventListener('click', function() {
      g.getRequestHandler('http://jsonplaceholder.typicode.com/comments?postId=4')
    });
    g.queryButtons[1].addEventListener('click', function() {
      g.getRequestHandler('http://jsonplaceholder.typicode.com/unicorns?age=200')
    });
    g.queryDisplayArea = document.querySelector('h2');


    function goodQueryClick() {
      debugger
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://jsonplaceholder.typicode.com/comments?postId=4', true);
      xhr.send(null);
      xhr.onreadystatechange = logChange

      function logChange() {
        if(xhr.readyState === 4 && xhr.status === 200) {
          g.displayEmails(xhr.responseText);
        } else {
          console.log(xhr.statusText)
        }
      }
    }

    function badQueryClick() {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://jsonplaceholder.typicode.com/unicorns?age=200', true);
      xhr.send(null);
      xhr.onreadystatechange = logChange

      function logChange() {
        if(xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        } else {
          g.displayError(xhr);
        }
      }
    }


  },

  displayEmails: function (data) {
    g.parsedData = JSON.parse(data);
    for (var i = 0; i < g.parsedData.length; i++) {
      var li = document.createElement('li');
      var textNode = document.createTextNode(g.parsedData[i]['email']);
      li.appendChild(textNode);
      g.queryDisplayArea.appendChild(li);
    }
    return;
  },

  displayError: function (request) {
    var lis = document.querySelectorAll('li');

    for (var i = 0; i < lis.length; i++) {
      g.queryDisplayArea.removeChild(lis[i]);
    }

    var li = document.createElement('li');
    var textNode = document.createTextNode(request.statusText);
    li.appendChild(textNode);
    g.queryDisplayArea.appendChild(li);
    return;
  },

  getRequestHandler: function(url) {
    var r = new XMLHttpRequest();

    r.open('GET', url, true);
    r.send(null);
    r.onreadystatechange = displayProperMessage;

    function displayProperMessage() {
      if (r.readyState === 4 && r.status === 200) {
        g.displayEmails(r.responseText);
      } else {
        g.displayError(r);
      }
    }
    return;
  },

  updateCookieObj: function () {
    g.allCookies = {};
    function cookiesToObj(str) {
      str = str.split(', ');
      var result = {};
      for (var i = 0; i < str.length; i++) {
          var cur = str[i].split('=');
          result[cur[0]] = cur[1];
      }
      return result;
    }
    g.allCookies = cookiesToObj(document.cookie);

  }

};

document.addEventListener('DOMContentLoaded', g.init)

// $(g.init);
