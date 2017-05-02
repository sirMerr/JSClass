# How to remove a cookie

Set an expiration date to the cookie you want.

## What is the effect of document.cookie=""?

# jQuery

1. Write a statement using jQuery to give a black border to all images in the "portrait" CSS Class

```javascript
$('img.portrait').css('border','solid 1px black') //jQuery object
// you can also do this
$('img.portrait'.css('border', 'solid 1px').css('border-color','black'));
```

`.css()` returns the same jQuery object as `img.portrait`. This is an example of chained method calls.

2. `$` is an alias for `jquery`

3. `$(doSomething);` --> `document.addEvent('DOMContentLoaded', doSomething);` --> `$(document).ready(doSomething) // deprecated`

```javascript
// init function
$(function() {
    $('#attractions ul').click(showImage);

    
}
```

4. `$(<section/>m {'id': 'foo', 'style': '...'})` creates an empty section passed an object literal with certain properties.