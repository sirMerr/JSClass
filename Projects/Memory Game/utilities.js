/**
 * Assignment #1 Part 2 -- Script 8.1 - utilities.js
 * @author Internet Applications II
 * {@link https://sirmerr.github.io/JSClass/Projects/Memory%20Game/|Github Pages}
 * For 420-423-DW Internet Applications II – Winter 2017
 *
 * This script defines an object that has some utilitarian functions.
 * Given by Maja Frydrychowicz to use for the game, with minor change
 * to follow some prefered ESLint rules and removing unused code.
 */

/**
 * IFFE utilities const
 * @type {Object}
 */
const U = {
	// Function for creating event listeners:
	addEvent(obj, type, fn) {
		'use strict';
		if (obj && obj.addEventListener) { // W3C
			obj.addEventListener(type, fn, false);
		} else if (obj && obj.attachEvent) { // Older IE
			obj.attachEvent('on' + type, fn);
		}
	}

}; // End of U declaration.
