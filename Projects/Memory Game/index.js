/* global document: true */

const g = {};

document.addEventListener('DOMContentLoaded', () => {
	g.tiles = document.querySelectorAll('.tiles');
	g.stopButton = document.querySelector('.stop');
	g.cheatButton = document.querySelector('.cheat');
	g.coverLetters = document.querySelectorAll('.tiles h2');
	g.coverImages = document.querySelectorAll('.tiles img');
	g.layer2Images = document.querySelectorAll('.layer2 img');
	g.images = ['images/svg/abacus.svg', 'images/svg/baby.svg', 'images/svg/toy-1.svg',
		'images/svg/book.svg', 'images/svg/food.svg', 'images/svg/game.svg',
		'images/svg/hat.svg', 'images/svg/teddy-bear.svg', 'images/svg/abacus.svg',
		'images/svg/baby.svg', 'images/svg/toy-1.svg', 'images/svg/book.svg',
		'images/svg/food.svg', 'images/svg/game.svg', 'images/svg/hat.svg',
		'images/svg/teddy-bear.svg'];
	g.holderImage = '';
	g.holderImage.visibility = '';
	g.clicks = 0;

	// add event listeners
	g.stopButton.addEventListener('click', stop);
	g.cheatButton.addEventListener('click', cheat);

	defaultTiles();
});

/**
 * Reveal background image. Ends the game
 * @method stop
 */
function stop() {
	setTilesBg('transparent');
}

/**
 * Shows layer 2 for an easy game.
 * @method cheat
 */
function cheat() {
	// console.log('Cheating');
	g.coverImages.forEach(element => {
		if (element.style.opacity === '0.2') {
			element.style.opacity = 1;
		} else {
			element.style.opacity = 0.2;
		}
	});
}

/**
 * Opens tile depending on click/keypress
 * @method openTile
 * @param  {Event} e  -- event object
 */
function openTile(e) {
	const letter = e.srcElement.innerHTML;
	// e.srcElement.parentElement.style.visibility = 'hidden';

	if (g.holderImage === '') {
		console.log('hi!');
		g.holderImage = findImage(letter);
		g.holderImage.style.visibility = 'hidden';
		console.log(g.holderImage.style.visibility);
		// g.holderImage.style.visibility = 'hidden';
	} else if (g.holderImage.src === findImage(letter).src) {
		console.log('yay!');
	} else {
		console.log('boo');
		g.holderImage = '';
		// g.holderImage.style.visibility = 'visible';
		console.log('invisible time!');
		// e.srcElement.parentElement.style.visibility = 'visible';
	}
}

/**
 * Finds image corresponding to letter
 * @method findImage
 * @param  {String}  letter -- letter [a-z]
 * @return {Object}         -- corresponding element
 */
function findImage(letter) {
	for (let i = 0; i < g.layer2Images.length; i++) {
		if (g.layer2Images[i].classList.contains(letter)) {
			return g.layer2Images[i];
		}
	}
	return '';
}

/**
 * Finds image corresponding to letter
 * @method findImage
 * @param  {String}  letter -- letter [a-z]
 * @return {Object}         -- corresponding element
 */
function findCover(letter) {
	for (let i = 0; i < g.coverLetters.length; i++) {
		if (g.coverLetters[i].innerHTML === letter) {
			return g.coverLetters[i];
		}
	}
	return '';
}

/**
 * Sets default tiles to a background
 */
function defaultTiles() {
	// randomize image array
	g.images = randomizeArray(g.images);

	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].addEventListener('click', openTile);
		g.coverImages[i].src = 'images/pokemon.gif';
		g.layer2Images[i].src = g.images[i];
	}
}

function randomizeArray(array) {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;

  // While there remain elements to shuffle
	while (currentIndex !== 0) {
    // Pick a remaining element
		randomIndex = randomNum(currentIndex, 0);
		currentIndex--;

    // And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
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
