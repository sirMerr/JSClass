/**
 * Assignment #2
 * @author Tiffany Le-Nguyen
 * For 420-423-DW Internet Applications II – Winter 2017
 */

/* global U modernBrowser emojis asciiKeys document lettersToEmojiObj emojisToLettersObj*/
const g = {};

// NOTE: Need to fix
/**
 * Encrypts using Caesar cypher which takes every character and moves it by
 * a number (key)
 * @param {String} message 
 * @param {Number} key 
 */
function encryptMessage(message, key) {
    let output = '', character, code, emoji;

    if (modernBrowser) {
        for (let i = 0; i < message.length; i++) {
            character = message[i];
            if (character.match(/[a-zA-Z]/) || character.match(/[. 0-9!?,-]/)) {
                code = message.charCodeAt(i);
                // console.log(code);
                if (code >= 65 && code <= 90) {
                    character = String.fromCharCode(((code - 65 + key) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    character = String.fromCharCode(((code - 97 + key) % 26) + 97);
                } else {
                    character = String.fromCharCode(code + key);
                }
                emoji = lettersToEmojiObj[character];
                output += emoji;
            }
        }
    } else {
        for (let i = 0; i < message.length; i++) {
            character = message[i];

            // get code if valid
            if (character.match(/[a-zA-Z]/) || character.match(/[. 0-9!?,-]/)) {
                code = message.charCodeAt(i);
                // console.log(code);
                if (code >= 65 && code <= 90) {
                    character = String.fromCharCode(((code - 65 + key) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    character = String.fromCharCode(((code - 97 + key) % 26) + 97);
                } else {
                    character = String.fromCharCode(code + key);
                }
                output += character;
            }
        }
    }
    g.output.value = output;
}

/**
 * Decrypts an encoded message
 * @param {String} message 
 * @param {Number} key 
 */
function decryptMessage(message, key) {
    let output = '', code;
    for (let i = 0; i < message.length; i++) {
        code = message.charCodeAt(i);
        // console.log(code);
        if (code >= 65 && code <= 90) {
            output += String.fromCharCode((code - 65 - key + 26) % 26 + 97);
        } else if (code >= 97 && code <=122) {
            output += String.fromCharCode((code - 97 - key + 26) % 26 + 97);
        } else {
             output += String.fromCharCode(code - key);
        }
    }
    console.log(output);
}

/**
 * Runs wizard explaining the encryption if it's the user's
 * first time.
 */
function runWizard() {
    const ref = localStorage.getItem('visit');

    // if this is the first visit, run the wizard
    // and set visit value to true;
    if (!ref) {
        console.log('This is the wizard');
        localStorage.setItem('visit', true);
    }
}

/**
 * NOTE: The api key should be in a separate config file. As everything is private
 * it should be fine, but changing the key and putting it in a config after is required.
 * 
 * Gets the weather information from www.from openweathermap.org
 * 
 * @return {String} weather
 */
function getWeatherData() {
    var request = new XMLHttpRequest();
    const city = 'London';
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=b948605bb52e836030b831890f3e6232', true);

    request.onreadystatechange = function() {
        let weatherData;
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.responseText);
                weatherData = data.weather[0].main;
                console.log(weatherData);
            } else {
                weatherData = 'Rain';
            }
        }
    };

    request.send();
    request = null;
}

/**
 * Shows the key selected by the user in the textarea
 * @param {Event} e 
 */
function chooseKey(e) {
    const evt = e || window.event;
    g.key.value = evt.target.innerHTML;
}

function addGridListeners() {
    Array.from(g.gridNodes).forEach(element => {
        U.addEvent(element, 'click', chooseKey);
    });
}
/**
 * Populates grid in a 5x5 manner using either
 * the emojis array or the asciiKeys array (keys.js)
 * @param {Array} array  emojis or ascii array
 */
function populateGrid(array) {
    for (let i = 0; i < 5; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                const td = document.createElement('td');
                td.innerHTML = array[g.counter];
                g.emojiGrid.appendChild(tr);
                tr.appendChild(td);
                g.counter++;
            }
        }
}
/**
 * Populates the grid depending on if the user
 * uses an old browser or not. If they use a modern
 * browser, use emojis. Otherwise, use ASCII keys
 */
function makeGrid() {
    if (modernBrowser) {
        populateGrid(emojis);
    } else {
        populateGrid(asciiKeys);
    }
    addGridListeners();
}

/**
 * Repopulate the grid to an emoji page 
 * prior to the current one.
 */
function leftClick() {
    if (modernBrowser) {
        if (g.counter <= 0) { g.counter = 75 };
        Array.from(g.gridNodes).forEach(element => {
            Array.from(element.childNodes).forEach(emoji => {
                emoji.innerHTML = emojis[g.counter];
                g.counter--;
            })
        })
    }
}

/**
 * Repopulate the grid to an emoji page 
 * after the current one.
 */
function rightClick() {
    if (modernBrowser) {
        if (g.counter >= 75) { g.counter = 0 };

        // NOTE: on IE, the object doesn't support the method forEach
        Array.from(g.gridNodes).forEach(element => {
            Array.from(element.childNodes).forEach(emoji => {
                emoji.innerHTML = emojis[g.counter];
                g.counter++;
            })
        })
    }
}

/**
 * Show weather tab
 */
function weatherClick() {
    g.weatherTextArea.style.visibility = 'visible';
    g.weatherButton.style.backgroundColor = '#b8b8b8';
    g.emojisButton.style.backgroundColor = '#f0f0f0';
}

/**
 * Show emoji tab with grid
 */
function emojisClick() {
    g.weatherTextArea.style.visibility = 'hidden';
    g.emojisButton.style.backgroundColor = '#b8b8b8';
    g.weatherButton.style.backgroundColor = '#f0f0f0';
}

function switchClick() {
    if (g.encrypt) {
        U.removeEvent(g.sendButton, 'click', encryptMessage);
        U.addEvent(g.sendButton, 'click', decryptMessage);
        g.sendButton.innerHTML = 'decrypt';
        g.encrypt = false;
    } else {
        U.removeEvent(g.sendButton, 'click', decryptMessage);
        U.addEvent(g.sendButton, 'click', encryptMessage);
        g.sendButton.innerHTML = 'encrypt';
        g.encrypt = true;
    }
}

function updateText() {
    if (g.key.value !== '') {
       g.output.value = ''; //NOTE: encrypt here
    }
}
U.addEvent(document, 'DOMContentLoaded', () => {
    g.input = document.querySelector('.input textarea');
    g.output = document.querySelector('.output textarea');
    g.key = document.querySelector('.key');
    g.emojiGrid = document.querySelector('.emojiGrid');
    g.rightButton = document.querySelector('.rightButton');
    g.leftButton = document.querySelector('.leftButton');
    g.weatherButton = document.querySelector('.weatherButton');
    g.emojisButton = document.querySelector('.emojisButton');
    g.sendButton = document.querySelector('.sendButton');
    g.switchButton = document.querySelector('.switchButton');
    g.weatherTextArea = document.querySelector('.weather');
    g.gridNodes = g.emojiGrid.childNodes;
    g.encrypt = true;


    g.counter = 0;

    //add event listeners
    U.addEvent(g.leftButton, 'click', leftClick);
    U.addEvent(g.rightButton, 'click', rightClick);
    U.addEvent(g.weatherButton, 'click', weatherClick);
    U.addEvent(g.emojisButton, 'click', emojisClick);
    U.addEvent(g.sendButton, 'click', encryptMessage);
    U.addEvent(g.switchButton, 'click', switchClick);
    U.addEvent(g.input, 'keyup', updateText);
    makeGrid();

    runWizard();

});

