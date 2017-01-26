# DOM :bookmark_tabs:
Document Object Model

Let's say the browser gets an simple html document:

```
<html>
	<head>
		<link href="style.css">
		<script src="mything.js">
	</head>
	<body>
		<section><p>blah</p>
			 	<p>blah</p>
		</section>
		<footer>some stuff</footer>
	</body>
</html>
```
It creates a tree. The root of the tree is always `html`. The child is `footer`←`body`→ `section` →`p` and `head`→`link css`.

Every <b>node</b> in the tree has exactly one <b>parent</b>. Every node in the tree has 0 or more children. Example: `section` is the <b>parent</b> of `p`.

DOM processes things top to bottom in the <b>02_life_cycle.html</b> file.

DOMContentLoaded → event `load` makes sure that everything is loaded.

Where do these events come from? JS runs in the browser (JS engine). It has objects in a global scope (accessible everywhere).

## Window Object
Global object. It's called this way because everything is in window.

If you don't precede an identifier with anything at all without dot notation, the browser will assume you're talking about the `window` object. If you have `const x = 10`, it will see it as `window.x`.
### window.alert() | alert()
So you can just write `alert()`.
### window.load | load
Makes sure everything has been loaded
### window.document | document
