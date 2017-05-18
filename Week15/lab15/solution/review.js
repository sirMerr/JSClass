"use strict";

var g = {
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
    // slide show
    g.showButton = document.getElementById("showBtn");
    if (!g.showButton) {
      return;
    }
    g.showButton.addEventListener("click", g.controlShow);
    g.images = g.imageData.map(function (i) {
      var el = new Image();
      el.src = i.thumbnailUrl;
      el.alt = i.title;
      return el;
    });
    g.currentImage = 0;
    g.imageWrapper = document.getElementById("wrapper");
    g.imageWrapper.appendChild(g.images[g.currentImage]);

    // welcome greeting
    g.guestEl = document.querySelector("#welcome a");
    var username = g.updateCookieObj().username;
    if (username && g.nameRegex.test(username)) {
      g.guestEl.textContent = username;
    }
    g.nameInputEl = document.querySelector("#welcome input");
    g.guestEl.addEventListener("click", g.displayNameField);
    g.nameInputEl.addEventListener("keydown", g.saveName);
    g.nameInputEl.addEventListener("blur", g.saveName);

    //query buttons
    g.queryButtons = document.querySelectorAll(".query");
    g.queryButtons[0].addEventListener("click",
        g.getRequestHandler(
            "http://jsonplaceholder.typicode.com/comments?postId=4"
        )
    );
    g.queryButtons[1].addEventListener("click",
        g.getRequestHandler(
            "http://jsonplaceholder.typicode.com/unicorns?age=200"
        )
    );
  },

  displayEmails: function (data) {
    var d = JSON.parse(data);
    var ul = document.querySelector("section ul");
    // remove all list items first
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    for (var i = 0; i < d.length; i++) {
      var el = document.createElement("li");
      el.textContent = d[i].email;
      ul.appendChild(el);
    }
  },

  displayError: function (request) {
    var ul = document.querySelector("section ul");
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    var el = document.createElement("li");
    el.textContent = "An error occured: " + request.status;
    ul.appendChild(el);
  },

  getRequestHandler: function(url) {
    return function () {
      var r = new XMLHttpRequest();
      r.open("GET", url);
      r.onreadystatechange = function () {
        if (r.readyState === 4) {
          if (r.status === 200) {
            g.displayEmails(r.responseText);
          } else {
            g.displayError(r);
          }
        }
      };
      r.send(null);
    };
  },

  updateCookieObj: function () {
    g.allCookies = {};
    if (document.cookie) {
      var cookieList = document.cookie.split(";");
      cookieList.forEach(function (pair) {
        var c = pair.split("=");
        g.allCookies[c[0]] = c[1];
      });
      console.log(g.allCookies);
    }
    return g.allCookies;
  },

  displayNameField: function (e) {
    g.guestEl.className = "invisible";
    g.nameInputEl.className = "";
    g.nameInputEl.focus();
    e.preventDefault();
  },

  nameRegex: /^[a-zA-Z\- ']+$/,

  saveName: function (e) {
    var name = e.target.value;
    if (e.type === "keydown" && e.code === "Enter" ||
        e.type === "blur") {
      if (name && g.nameRegex.test(name)) {
        g.guestEl.textContent = name;
        g.guestEl.className = "";
        g.nameInputEl.className = "invisible";
        g.nameInputEl.value = "";
        var expire = new Date(); // Today!
        expire.setDate(expire.getDate() + 7); // One week!
        document.cookie = "username=" + name + ";expires=" + expire.toGMTString();
      } else {
        // indicate that value was rejected
        g.nameInputEl.style = "border: 1px solid red";
        setTimeout(function () {
          g.nameInputEl.style = "";
        }, 2000);
      }
    }
  },

  controlShow: function () {
    if (g.showButton.textContent === "Start") {
      g.showButton.textContent = "Pause";
      g.showTimer = setInterval(g.nextImage, 2000);
    } else if (g.showButton.textContent === "Pause") {
      clearInterval(g.showTimer);
      g.showButton.textContent = "Start";
    }
  },

  nextImage: function () {
    var current = g.imageWrapper.querySelector("img");
    g.currentImage = (g.currentImage + 1) % g.images.length;
    g.imageWrapper.replaceChild(
      g.images[g.currentImage],
      current);
  }
};

document.addEventListener("DOMContentLoaded", g.init);
