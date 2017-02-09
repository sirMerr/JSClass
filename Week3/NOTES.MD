# JS Literals
Everything, even literals are objects
# Objects
# Arrays
## forEach
For side effects
```
a.forEach(i => {
	print(i)
	});
```
## map
Creates a new array
```
a.map(i => {
	return i+2;
	});
```
```
a = [2, 3, 4, 'stuff'];

// after mapping:
Array [4, 5, 6, 'stuff2'];
// not assigned to any variable
```

## Array examples
```
// Generate random colors and make a list out of it
const a = [];
a.push(i=> {
	return Math.floor(Math.random() * 255);
	});
```
## HTMLCollection
# Cookies
