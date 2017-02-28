/**
 * Assignment #1 Part 2
 * @author Tiffany Le-Nguyen
 * For 420-423-DW Internet Applications II – Winter 2017
 */

/* global document: true window: true Image: true U: true */

// global namespace
const g = {};

document.addEventListener('DOMContentLoaded', () => {
	g.tiles = document.querySelectorAll('.tiles');
	g.startButton = document.querySelector('.start');
	g.stopButton = document.querySelector('.stop');
	g.cheatButton = document.querySelector('.cheat');
	g.coverLetters = document.querySelectorAll('.tiles h2');
	g.coverImages = document.querySelectorAll('.tiles img');
	g.layer2Images = document.querySelectorAll('.layer2 img');
	g.layer2 = document.querySelector('.layer2');
	g.images = ['images/svg/abacus.svg', 'images/svg/baby.svg', 'images/svg/toy-1.svg',
		'images/svg/book.svg', 'images/svg/food.svg', 'images/svg/game.svg',
		'images/svg/hat.svg', 'images/svg/teddy-bear.svg', 'images/svg/abacus.svg',
		'images/svg/baby.svg', 'images/svg/toy-1.svg', 'images/svg/book.svg',
		'images/svg/food.svg', 'images/svg/game.svg', 'images/svg/hat.svg',
		'images/svg/teddy-bear.svg'];
	g.backgroundImages = ['images/background.jpg', 'images/background2.jpg', 'images/background3.jpg',
		'images/background4.jpg', 'images/background5.jpg', 'images/background6.jpg'];
	g.holderImage = '';
	g.holderImage.visibility = '';
	g.holderCover = '';
	g.clicks = 0;
	g.holderBg = 0;

	cacheImages();
	defaultTiles();

	// add event listeners
	U.addEvent(g.startButton, 'click', start);
	U.addEvent(g.stopButton, 'click', stop);
	U.addEvent(g.cheatButton, 'click', cheat);
	U.addEvent(document.body, 'keypress', displayKey);
});

/**
 * Restarts the game
 * @method start
 */
function start() {
	defaultTiles();
	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].style.visibility = 'visible';
		g.layer2Images[i].style.visibility = 'visible';
		// console.log(g.tiles[i]);
	}
}
/**
 * Reveal background image. Ends the game
 * @method stop
 */
function stop() {
	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].style.visibility = 'hidden';
		g.layer2Images[i].style.visibility = 'hidden';
		// console.log(g.tiles[i]);
	}
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
 * @param  {Event} e  event object
 */
function openTile(e) {
	g.clicks++;
	if (g.clicks > 2) {
		g.clicks--;
		return;
	}
	// console.log(e.srcElement);
	const letter = e.srcElement.innerHTML;
	e.srcElement.parentElement.style.visibility = 'hidden';
	const img = findImage(letter);
	if (g.holderImage === '') {
		// console.log('New holders');
		g.holderImage = img;
		g.holderCover = e.srcElement.parentElement;
	} else if (g.holderImage.src === img.src) {
		// console.log('It\'s a match!');
		setVisibility(g.holderImage, img);
	} else {
		// console.log('Not a match');
		setVisibility(g.holderCover, e.srcElement.parentElement);
	}
}

/**
 * Sets visibility of two images to hidden or visible
 * depending on what they are initially
 * @method setVisibility
 * @param  {Image}      img1
 * @param  {Image}      img2
 */
function setVisibility(img1, img2) {
	window.setTimeout(() => {
		img1.style.visibility = img1 !== '' && img1.style.visibility === 'hidden' ? 'visible' : 'hidden';
		img2.style.visibility = img2 !== '' && img2.style.visibility === 'hidden' ? 'visible' : 'hidden';
		g.clicks -= 2;
	}, 1000);

	g.holderImage = '';
	g.holderCover = '';
}
/**
 * Finds image corresponding to letter
 * @method findImage
 * @param  {String}  letter  letter [a-z]
 * @return {Object}          corresponding element
 */
function findImage(letter) {
	for (let i = 0; i < g.layer2Images.length; i++) {
		// console.log(letter);
		// console.log(g.layer2Images[i].classList);
		if (g.layer2Images[i].classList.contains(letter)) {
			return g.layer2Images[i];
		}
	}
	return '';
}

/**
 * Sets default tiles to a background
 * @method defaultTiles
 */
function defaultTiles() {
	g.clicks = 0;
	// randomize image array
	g.images = randomizeArray(g.images);

	for (let i = 0; i < g.tiles.length; i++) {
		g.tiles[i].addEventListener('click', openTile);
		g.coverImages[i].src = 'images/pokemon.gif';
		g.layer2Images[i].src = g.images[i];
	}

	g.layer2.style.backgroundImage = 'url(' + getNextBg() + ')';

	g.coverImages.forEach(element => {
		if (element.style.opacity !== '1') {
			element.style.opacity = 1;
		}
	});
}

/**
 * Gets next background from g.backgroundImages array
 * @method getNextBg
 * @return {String}  image link from ./images
 */
function getNextBg() {
	if (g.holderBg === g.backgroundImages.length - 1) {
		g.holderBg = 0;
	} else {
		g.holderBg++;
	}
	// console.log(g.holderBg);
	return g.backgroundImages[g.holderBg];
}

/**
 * Sorting the array using Array.Prototype.sort.
 *
 * NOTE: As the requirement is to be cross-compatible,
 * I decided to use this sort because we are randomizing it with
 * the custom comparison function, which I felt removed the non-stability
 * issue of browsers that use Array.Prototype.sort. differently.
 * @method randomizeArray
 * @param  {Array}       array	array to shuffle
 * @return {Array}             	randomized array
 */
function randomizeArray(array) {
	array.sort((a, b) => {
		// 0.7 - [0, 1)
		return 0.7 - Math.random();
	});

	// array.forEach(element => {
	// 	console.log(element);
	// })
	return array;
}

/**
 * Caches images
 * @method cacheImages
 */
function cacheImages() {
	const array = [];
	const image = new Image();

	g.images.forEach(element => {
		image.src = element;
		array.push(image);
	});
}

/**
 * Triggers a click event on the cover tiles
 * if there is a corresponding keypress
 * @method displayKey
 * @param  {Event}   e
 */
function displayKey(e) {
	const evt = e || window.event;
	const charCode = evt.which || evt.keyCode;
	const target = document.querySelector(`.tile${charCode - 96} h1`);

	if (target !== null && charCode < 113 && target.style.visibility !== 'hidden') {
		target.click();
	}
}
