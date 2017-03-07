# Midterm Information

4E.1

12pm - 2pm March 2

Short answers Questions (6-8): 30%    
Programming Questions (6-7 functions): 70%

## On Midterm
1. Difference between Object literals and Objects you define with `new`. Like Prototype
2. Array.Prototype.map
3. Array.Prototype.forEach
4. Array.Prototype.sort

DOMContentLoaded is just the tree, window.load makes sure all external files are loaded too

## Not on Midterm
1. Coercion
2. KeyboardEvent
3. IIFE
4. Defining custom objects
5. Closures
6. No drawing questions

## Exercises

### Write an event handler which changes the background and content of a div to have the text "hello"

```
// change to addEvent from utilities.js
div1.addEventListener('click', doAThing});
div1.addEventListener('mouseout', doAThing});
div2.addEventListener('click', doAThing});
div2.addEventListener('mouseout', doAThing});

function doAThing(e) {
	var evt = e || window.event;
	var target = evt.target || evt.srcElement;
	const eventType = typeof e;
	const target = e.target | e.
	if (target.style.background === 'red') {
		target.style.background = 'blue';
	} else {
		target.style.background = 'red';
	}

	target.textContent = 'Hello ' + evt.type;
}
```
