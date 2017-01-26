/* global document: true */
const g = {};

// Add event listener
document.addEventListener('DOMContentLoaded', ready);

function ready() {
	console.log('DOMContentLoaded ready');
	// Add elements to global namespace
	g.image1 = document.querySelector('#panda').children[0];
	g.footer = document.querySelector('footer');
	g.header = document.querySelector('header');
	// Add event listeners
	g.footer.addEventListener('click', clickFooter);
	g.image1.addEventListener('click', clickImage);
}

function clickImage() {
	console.log('clicking image1');
	if (g.image1.src.match('panda')) {
		g.image1.src = 'images/polarBear.jpg';
	} else {
		g.image1.src = 'images/panda.jpg';
	}
}

function clickFooter() {
	console.log('clicking footer');
	if (g.header.style.backgroundColor === 'red') {
		g.header.style.backgroundColor = 'yellow';
	} else {
		g.header.style.backgroundColor = 'red';
	}
}
