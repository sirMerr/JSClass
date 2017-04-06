"use strict";

var g = {};

function addEvent(obj, type, fn) {
	if (obj.addEventListener) {
		obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent) {
		obj.attachEvent("on" + type, fn);
  }
}

function createRequestObject() {
  var request;
  if (window.XMLHttpRequest) {
		request = new XMLHttpRequest();
  } else {
		request = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return request;
}

/** Populate form with data from cookie, if available */
function loadCookie() {
	console.log("* function: loadCookie");
	var cookieString = document.cookie;

	// break cookie into its name value pair
	var list = cookieString.split("=");
  // hack: assuming there is at most one cookie in total
	if (list[0] === "address") {
		console.log("First cookie is 'address'");
    // break list of values in cookie into separate strings
		var fieldValues = list[1].split(",");
    console.log("Field values from cookie: ");
    console.log(fieldValues);
		// hack: assuming form fields and cookie data are in same order
    // hack: assuming cookie data is for first 7 fields
    console.log("Fill the fields:");
		for (var i = 0; i < g.addressFields.length; i++) {
      console.log(g.addressFields[i].id + " = " + fieldValues[i]);
      //store value in corresponding field
			g.addressFields[i].value = fieldValues[i];
		}
	}
}

/** Save current form values to a cookie named 'address' */
function writeCookie() {
	console.log("* function: writeCookie");
	// build the name value pair for the cookie
	var cookieString = "address=";
  var values = [];
	for (var i = 0; i < g.addressFields.length; i++) {
		values.push(g.addressFields[i].value);
	}
  cookieString += values.join(",") + ";";

	// setup an expiry date for the cookie ( 1 week from today)
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	console.log("writing cookie: " + cookieString);
	document.cookie = cookieString + "expires=" + expiry.toGMTString() + ";";
	console.log("Now cookies are : " + document.cookie);
}

/** Change form labels according to requested language.
This is the handler/callback for readystatechange of the request
*/
function displayLanguage(){
  console.log("* function: displayLanguage");
  console.log("Ready state: " + g.requestLanguage.readyState);
	if (g.requestLanguage.readyState === 4 && g.requestLanguage.status === 200) {
    console.log("server responded with: " + g.requestLanguage.responseText);
		var fieldText = g.requestLanguage.responseText.split(",");
		var fieldArray = document.getElementsByTagName("label");
		console.log("Updating labels to match requested language");
		for (var i = 0; i < fieldArray.length; i++) {
			fieldArray[i].firstChild.textContent = fieldText[i];
		}
	}
}

/** Trigger request for language data */
function changeLanguage(e) {
  console.log("* function: changeLanguage");
	var evt = e || window.event;
	var target = evt.target || evt.srcElement;
  if (target.nodeName !== "A") {
    return;
  }
	var language = target.id;
	g.requestLanguage = createRequestObject();
  // designate a handler to be called when the request completes
	g.requestLanguage.onreadystatechange = displayLanguage;
  // request the specific language text file
  g.requestLanguage.open("GET", language + ".txt", true);
  // send the request asynchronously
  // If the server takes a long time to respond, other events will continue to be processed
  // until 'readystatechange' is triggered (server has responded) and processed
  g.requestLanguage.send(null);
}

function init() {
  console.log("* function: init");
  g.addressFields = document.getElementById("addressFields").getElementsByTagName("input");
  console.log("Fields: ");
  console.log(g.addressFields);
	if (document.cookie){
		console.log("There are cookies!");
		loadCookie();
	} else {
		console.log("No cookies yet.");
	}

	addEvent(document.getElementById("languageChoice"), "click", changeLanguage);

  g.form = document.getElementById("add1");
	addEvent(g.form, "submit", writeCookie);
}

document.addEventListener("DOMContentLoaded", init);
