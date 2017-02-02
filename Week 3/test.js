// Will return the element
function a(element) {
	return null || element;
}

// If the element is a number, will return that
// number. If the element is a string, will
// return null[string]. If the element is undefined,
// will return NaN
function b(element) {
	return null + element;
}

// If a string, will return [string]undefined
// If a number, will return NaN
function c(element) {
	return element + undefined;
}

// Will return 5[element]
function d(element) {
	return '5' + element;
}

function e(element) {
	// 5[element]
	console.log('5' + element);
	// 5 * Number
	console.log('5' * element);
	console.log('5' - element);
	console.log(5 + element);
	console.log(5 * element);
	console.log(5 - element);
	console.log(element / null);
	console.log(element * null);
	console.log(element * undefined);
}
