# Cookies and DOM manipulation

## Window properties

* `window.screenX` and `window.screenY` | `window.screenLeft` and `window.screenRight` give you the top-left corner of the browser window (0,0)
* `window.innerWidth` and `window.innerHeight` tell the size of the visible content
* `window.screen` gives access to many properties of the physical screen (like `window.screen.height`)

## Opening a new tab
### Using an HTML link:

`<a href=”photos.html” id=”photosLink” target="photosTab"> View photos. (Will open new window)</a>`

### Using JS
NOTE: using javascript to do this is automatically refused by the browser unless the user allows it.

`newTab = window.open("absolute or relative URL")`

 If you don't provide a URL, an empty tab will open. Note that the new window will not necessarily load its URL immediately; 

 You can do `newTab.close()` to close it and check if it is closed with the `newTab.closed` boolean property.

 #### Giving a window focus
```javascript
// here `popup` is a Window object
// assume it represents a second window 
if ((popup !== null) && !popup.closed) {
popup.focus(); }
```

Here's an example of creating a new window object with additional properties:
```javascript
var popup = window.open("somepage.html", "NameForTheWindowWithoutSpaces", "height=200,width=200,location=no,resizable=yes,scrollbars=yes");
```

## Cookies
The HTTP protocol is designed to be stateless: when you navigate from one page to another, or you refresh a page, all information about you and your actions is lost. To compensate for this, browser cookies were invented to persist user data across many visits. (There are also sessions, but that's a server-side thing.) Cookies help implement web apps with user accounts, preferences, targeted ads, etc.

*A cookie is a named collection of information associated with a server, and it is stored by your browser.* A web app can save a cookie in your browser. The cookie can then be accessed later by the web app and processed on the client side or passed to the server that originally created it.

Cookie data includes:
* name
* value
* expiration time (in a format like `Mon, 03 Jul 2006 21:44:38 GMT` )
* path (like /store)
* domain (like example.com)

### Implementing a Cookie

Here's an example of creating two cookies named fontSize and theme with the path, domain and expiration set to the default values:
```javascript
// you can only set one cookie at a time
document.cookie = "fontSize=14";
// each assignment to document.cookie appends to the list of cookies document.cookie = "theme=dark;domain=*.example.com";
// you can replace an existing cookie
document.cookie = "fontSize=12";
// reading from document.cookie shows a string of all valid cookies console.log(document.cookie)
```

### Setting expiration date
To set an expiration date the correct format, use Date's toUTCString method
```javascript
// today's date
 var expire = new Date();
// increment by one day
expire.setDate(expire.getDate() + 1);
// looks like Mon, 03 Jul 2006 21:44:38 GMT
var dateInUTCFormat = expire.toUTCString();
document.cookie = "someName=someValue;expires=" + dateInUTCFormat;
```

### Deleting a Cookie
To delete a cookie, create a cookie with the same name and an expiration date in the past:
```javascript
document.cookie = "fontSize=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
```
