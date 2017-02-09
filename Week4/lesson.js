/* eslint no-unused-vars: 1 */

const o = {
	day: 'Wed',
	isToday: true
};

// How to access isToday from o object?
console.log(o.isToday);
console.log(o['isToday']);

/**
 * Get property of object or false if doesn't exist
 * @method getProp
 * @param  {Property} name 				-- property name
 * @param  {Object} obj  					-- object
 * @return {function}     				-- function
 */
function getProp(name, obj) {
	function result() {
		if (name in obj) { // obj[name] === 'undefined'
			return obj[name]; // why not obj.name?
		}
		// throw new Error('message');
		console.log('Doesn\'t exist');
		return false;
	}
	return result;
}

// x is a function
const x = getProp('isToday', o);

// y is true
const y = x();

const w = getProp('isToday', o)();

function myAwesomeYelling() {

}
// callback function example
function printBanana(x, yell) {
	if (1 + x > 0) console.log('Banana!');
	else yell();
}

printBanana(1, myAwesomeYelling);
