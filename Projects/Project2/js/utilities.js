/**
 * Assignment #1 Part 2 -- Script 8.1 - utilities.js
 * @author Internet Applications II
 * For 420-423-DW Internet Applications II – Winter 2017
 *
 * This script defines an object that has some utilitarian functions.
 * Given by Maja Frydrychowicz to use, with minor change
 * to follow some prefered ESLint rules and removing unused code.
 */
var modernBrowser = true;

/**
 * IFFE utilities const
 * @type {Object}
 */
var U = {
	// Function for creating event listeners
	addEvent(obj, type, fn) {
		'use strict';
		if (obj && obj.addEventListener) { // W3C
			obj.addEventListener(type, fn, false);
		} else if (obj && obj.attachEvent) { // Older IE
			obj.attachEvent('on' + type, fn);
			modernBrowser = false;
		}
	}, // Emd of addEvent() function
	// Function for removing event listeners:
	removeEvent(obj, type, fn) {
		'use strict';
		if (obj && obj.removeEventListener) { // W3C
			obj.removeEventListener(type, fn, false);
		} else if (obj && obj.detachEvent) { // Older IE
			obj.detachEvent('on' + type, fn);
		}
	} // End of removeEvent() function.


}; // End of U declaration.