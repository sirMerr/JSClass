/* global document: true */

function appendTextArea() {
	const textarea = 	document.querySelector('textarea');
	const x = document.forms.myForm.textcontent.value;
	textarea.textContent += x;
}
