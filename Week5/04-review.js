/* global document: true, window: true */

'use strict';

function showMousePosition(event) {
	console.log('Mouse is at (' + event.pageX + ', ' + event.pageY + ')');
}

function makePrintingHandler(isLog, prefix, property) {
	function getMessage(obj) {
		return [prefix, property, obj[property]].join(': ');
	}
	if (isLog) {
		return e => {
			console.log(getMessage(e));
		};
	}
	return e => {
		const paragraph = document.createElement('p');
		paragraph.textContent = getMessage(e);
		document.body.appendChild(paragraph);
	};
}

document.addEventListener('DOMContentLoaded', () => {
	window.addEventListener('click',
		makePrintingHandler(true, 'Mouse position', 'pageX'));
	document.getElementById('box').addEventListener('click',
		makePrintingHandler(false, 'Event is from', 'target'));
	window.addEventListener('dblclick', showMousePosition);
});
