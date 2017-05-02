# Review Questions
1. What are the cons of using an external dependency
<b>Cons</b>
    * You might not be familiar with how a framework actually works
    * The version of your framework/library might become deprecated as you update it and methods used might no longer be valid as time
goes by.
    * Might be easier to learn the one thing you need instead of using a whole library
    * Licensing issues

2. In jQuery, create a new paragraph element with CSS class "silly" and insert as last el in body
    ```javascript
    $('document.body').append(('<p></p>').addClass('silly'));
    ```
3. Do the same as above, but without jQuery
    ```javascript
    const par = document.createElement('p');
    par.className = 'silly';
    document.body.appendChild(par);
    ```

4. What does passing a function to $ do?

   * `$(someFunction)` causes that function to be triggered by the DOMContentLoaded event
5. In jQuery, write an event handler that changes the background colour of the event target
mouseover, and changes it back on mouseout.

    Attach it to a div in class boo:
    ```javascript
    <body>
    <div class="boo"></div>
    <div></div>
    </body>
    ```
    ```javascript
    $('div.boo').on({
        mouseover: changeColor,
        mouseout: changeColor;
    },
    {
        originalColor: div.css('background-color');
    }
    );

    function changeColor(e) {
        target = $(e.target);
        if (e.type === 'mouseover') {
            target.css('background-color', 'red');
        } else if (e.type === 'mouseout') {
            target.css('background-color', originalColor);
        }
    }
    ```

# Ajax review
Ajax is a function, not a method on the jQuery object. It's not aware of any state.

```javascript
r = $.ajax({ //object literal
    url: 'http://...com',
    data: { name: 'Trudeau' }, 
    // in the background, encodeURIComponent is being called to make sure the url values are valid. Default GET
    // if you don't want that, you can do data: 'name=Trudeau' to send that exact string.
    type: 'GET', // not necessary, but nice
    success: doSomething,
    error: doSomething
}

r.done(doSomething)
r.fail(doSomethingElse)

// status is usually 'ok'
// xhr is the request object, same instance as r
doSomething(data, status, xhr) {
    //...
}
```