/* global document: true */

const g = {};

document.addEventListener('DOMContentLoaded', () => {
	g.tiles = document.querySelectorAll('.tiles');
	g.revealButton = document.querySelector('.reveal');
	g.images = ['images/svg/abacus.svg', 'images/svg/baby.svg', 'images/svg/toy1.svg',
		'images/svg/book.svg', 'images/svg/food.svg', 'images/svg/game.svg',
		'images/svg/hat.svg', 'images/svg/teddy-bear'];
	g.tileImages = [16];

	defaultTiles();

	// add event listeners
	g.revealButton.addEventListener('click', reveal);
});

function reveal() {
	g.tiles.forEach(element => {
		element.style.background = 'transparent';
	});
}

function defaultTiles() {
	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].style.background = 'grey';
		g.tileImages[i] = g.images[randomNum(0, 8)];
		console.log(g.tileImages[i]);
	}
}


function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
