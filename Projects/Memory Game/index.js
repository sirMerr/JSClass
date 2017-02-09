/* global document: true */

const g = {};

document.addEventListener('DOMContentLoaded', () => {
	g.tiles = document.querySelectorAll('.tiles');
	g.revealButton = document.querySelector('.reveal');
	g.cheatButton = document.querySelector('.cheat');
	g.images = ['images/svg/abacus.svg', 'images/svg/baby.svg', 'images/svg/toy1.svg',
		'images/svg/book.svg', 'images/svg/food.svg', 'images/svg/game.svg',
		'images/svg/hat.svg', 'images/svg/teddy-bear', ''];
	g.tileImages = [16];

	defaultTiles();

	// add event listeners
	g.revealButton.addEventListener('click', reveal);
	g.cheatButton.addEventListener('click', cheat);
});

/**
 * Reveal background image. Ends the game
 */
function reveal() {
	setTilesBg('transparent');
}

function cheat() {
	g.tiles.forEach(element => {
		element.style.background = 'rgba(0, 0, 0, 0.5)';
	})
}

/**
 * Sets default tiles to a background
 */
function defaultTiles() {
	let holder = '';

	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].style.background = 'grey';
		holder = g.images[randomNum(0, 8)];
		g.tileImages[i] = holder;
		console.log(g.tileImages[i]);
	}
}

/**
 * Returns a random number (int) such as: (min, max[
 * @param  {Number} min -- inclusive min
 * @param  {Number} max -- non-inclusive max
 * @return {Number}     -- random number integer
 */
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function setTilesBg(value) {
	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].style.background = value;
	}
}
