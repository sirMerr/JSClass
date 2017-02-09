/* global document: true Image: true */

// global name space variable
const g = {};

// check dom is ready
document.addEventListener('DOMContentLoaded', () => {
	// initialisation
	g.images = ['images/blackWidow.jpg', 'images/fishSpider.jpg',
		'images/gardenSpider.jpg', 'images/glassSpider.jpg', 'images/panda.jpg',
		'images/polarbear.jpg', 'images/tarantula.jpg', 'images/weaverSpider.jpg',
		'images/wolfSpider.jpg'];
	loadImages(g.images);

	g.flipflop = document.querySelector('#flipflop');
	g.spider = document.querySelector('#spider');
	g.left = document.querySelector('#left');
	g.right = document.querySelector('#right');
	g.ul = document.querySelector('ul');
	g.counter = 0;

	// add event listeners
	g.left.addEventListener('mouseover', roll);
	g.left.addEventListener('mouseout', out);
	// g.left.childNodes[0].removeEventListener('mouseover', roll);
	// g.left.childNodes[0].removeEventListener('mouseout', out);

	// add buttons elements
	const previous = document.createElement('button');
	previous.appendChild(document.createTextNode('previous'));
	const next = document.createElement('button');
	next.appendChild(document.createTextNode('next'));
	g.ul.appendChild(previous);
	g.ul.appendChild(next);

	g.ul.childNodes[0].addEventListener('click', clickPrevious);
	g.ul.childNodes[1].addEventListener('click', clickNext);
});

function clickPrevious() {
	if (g.counter === 0) {
		g.counter = g.images.length - 1;
	} else {
		g.counter--;
	}
	g.spider.src = g.images[g.counter];
}
function clickNext() {
	if (g.counter === (g.images.length - 1)) {
		g.counter = 0;
	} else {
		g.counter++;
	}
	// console.log(g.images[g.counter]);
	g.spider.src = g.images[g.counter];
	// console.log(g.right.src);
}
function loadImages(array) {
	// makes it so that the list will simply be appended
	// not remade every time the function is called
	if (!loadImages.list) {
		loadImages.list = [];
	}
	const list = loadImages.list;
	for (let i = 0; i < array.lenght; i++) {
		const img = new Image();
		img.onload = () => {
			// checks if image exists
			const index = list.indexOf(this);
			if (index !== -1) {
				// remove image from the array once it's loaded
				list.splice(index, 1);
			}
		};
		list.push(img);
		img.src = array[i];
	}
}

function roll() {
	// console.log(g.left.innerHTML);
	g.left.innerHTML = '<h3 id="flipflop">' + g.flipflop.alt + '</h3>';
}

function out() {
	// console.log('mouseout');
	g.left.innerHTML = '<img id="flipflop" src="images/panda.jpg" alt="panda">';
}
