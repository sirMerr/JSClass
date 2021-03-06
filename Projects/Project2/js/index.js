/**
 * This Caesar Cypher Encryption Demo was made for a school project.
 * The requirements can in found in the folder, but the TL;DR of it is, it had to:
 *
 * 1. Encrypt/Decrypt using emojis (modern browsers) and the weather
 * 2. Be cross-browser compatible (😞 rip es6 and transforms)
 * 3. Have a wizard & an about page
 *
 * NOTE: There is a few small unoptimized code/event delegations here and there
 * that will probably be resolved over time
 *
 * @author Tiffany Le-Nguyen <https://github.com/sirMerr>
 * @date Winter 2017
 */

/* global U modernBrowser document */

// global namespace
var g = {};

/**
 * Display a character every 40 miliseconds for a 
 * typing effect on the output
 * @param {String} output
 */
function showOutput(output) {
    if (output === '') {
        g.output.value = '';
        return;
    }
    // makes sure output will not repeat
    g.output.value = '';
    var counter = 0;
    var interval = setInterval(typeOutput, 20);

    // types the output one by one
    function typeOutput() {
        g.input.disabled = true;
        g.output.value += output[counter];
        counter++;
        if (counter >= output.length) {
            clearInterval(interval);
            g.input.disabled = false;
        }
    }

}

/**
 * Parses the key and determines if it's to be encrypted
 * or decrypted
 */
function parseKey() {
    if (g.weatherTextArea.style.visibility === 'visible') {
        getWeatherData();
    }

    // makes sure the key isn't empty
    else if (g.key.value) {
        if (g.encrypt) {
            encryptMessage();
        }
        else {
            decryptMessage();
        }
    }
}

/**
 * Encrypts using Caesar cypher which takes every character and moves it by
 * a number (key)
 * @param {String} message 
 * @param {Number} key 
 */
function encryptMessage() {
    // variables
    var output = '', inputChar, outputChar;
    var message = g.input.value;
    var key = g.key.value;
    var varantKey;

    // Parse key into number
    if (key.match(/[a-zA-Z]/)) {
        key = g.asciiKeys.indexOf[key] + 1;
    } else {
        key = g.emojis.indexOf(key) + 1;
    }

    // for resetting key
    varantKey = key;

    if (modernBrowser) {
        for (var i = 0; i < message.length; i++) {
            inputChar = message[i];

            if (inputChar.match(/[a-zA-Z. 0-9!?,-:";()&%\']/)) {
                // find index of the input character in emoji form
                var indexChar = g.emojis.indexOf(g.lettersToEmojiObj[inputChar]);

                // make sure key will not be bigger than the array length,
                // this key is the new index of the shifted emoji
                if (indexChar + key >= g.emojis.length) {
                    key = indexChar + key - g.emojis.length;
                } else {
                    key += indexChar;
                }

                outputChar = g.emojis[key];

                // append shifted emoji to output
                output += outputChar;

                // reset key
                key = varantKey;
            }
        }
    } else {
        for (var i = 0; i < message.length; i++) {
            inputChar = message[i];

            // get code if valid
            if (inputChar.match(/[a-zA-Z. 0-9!?,-:";()&%\']/)) {
                var indexChar = g.asciiInput.indexOf(inputChar);

                // make sure key will not be bigger than the
                // array's length when making the new index
                if (indexChar + key >= g.asciiInput.length) {
                    key = indexChar + key - g.asciiInput.length;
                } else {
                    key += indexChar;
                }

                outputChar = g.asciiInput[key];

                // append shifted varter to output
                output += outputChar;

                // reset key
                key = varantKey;
            }
        }
    }
    showOutput(output);
}

/**
 * Makes an array out of a string of emojis in order to properly handle it
 * 
 * NOTE: Seeing as I could not split the string of emojis, nor could I String.prototype.indexOf()
 * or String.prototype.charAt(). I found that using
 * message.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/) was the way to go.
 * Found on:
 * @link {http://stackoverflow.com/questions/24531751/how-can-i-split-a-string-containing-emoji-into-an-array}
 * 
 * @param {String} message    containing emojis only
 * @return {Array} newArray   containing no invalid chars
 */
function emojiStringToArray(message) {
    var messageArray = message.split(/([\uD800-\uDBFF][\uDC00-\uDFFF])/);
    var newArray = [];
    var char;

    for (var i = 0; i < messageArray.length; i++) {
        char = messageArray[i];
        if (char !== '') {
            newArray.push(char);
        }
    }
    return newArray;
}

/**
 * Decrypts an encoded message. Does the reverse
 * of the encryptMessage() method.
 * 
 * @param {String} message 
 * @param {Number} key 
 */
function decryptMessage() {
    g.output.value = '';

    // variables
    var input = '', inputChar, outputChar;
    var key = g.key.value;
    var varantKey, valid = false;
    var currentIndex;

    // parse key into number
    if (key.match(/[a-zA-Z]/)) {
        key = g.asciiKeys.indexOf[key] + 1;
    } else {
        key = g.emojis.indexOf(key) + 1;
    }

    // for resetting key
    varantKey = key;

    if (modernBrowser) {
        var message = emojiStringToArray(g.input.value);
        for (var i = 0; i < message.length; i++) {
            outputChar = message[i];
            for (var j = 0; j < g.emojis.length; j++) {
                if (outputChar === g.emojis[j]) {
                    valid = true;
                    currentIndex = j;
                    break;
                }
            }
            if (valid) {
                // makes sure input index isn't smaller than 0
                if (currentIndex - key < 0) {
                    key = currentIndex - key + g.emojis.length;
                } else {
                    key = currentIndex - key;
                }
                // find equivalent varter
                inputChar = g.emojisToLettersObj[g.emojis[key]];

                // append to input string
                input += inputChar;
                // reset key
                key = varantKey;
            }
        }
        showOutput(input);

    } else {
        var message = g.input.value;
        for (var i = 0; i < message.length; i++) {
            outputChar = message[i];

            // get code if valid
            if (outputChar.match(/[a-zA-Z. 0-9!?,-:";()&%\']/)) {
                var indexChar = g.asciiInput.indexOf(outputChar);

                // make sure key will not be bigger than the
                // array's length when making the new index
                if (indexChar - key < 0) {
                    key = indexChar - key + g.asciiInput.length;
                } else {
                    key = indexChar - key;
                }

                inputChar = g.asciiInput[key];

                // append shifted varter to input
                input += inputChar;

                // reset key
                key = varantKey;
            }
        }
    }
}

/**
 * Runs wizard explaining the encryption if it's the user's
 * first time.
 * NOTE: This was changed from wizard -> about because the wizard
 * is not pretty right now :C
 */
function runWizard() {
    document.cookie = 'visit=true';
    if (window.location.href.indexOf('wizard') === -1) {
        window.location.href = "wizard.html";
    }
}

/**
 * NOTE: As I have made this project public, I have removed the api key (appid=)
 * If you want to see how this feature works, feel free to go to www.openweathermap.org,
 * generate your own api key and replace it here :). 
 * 
 * Gets the weather information from www.openweathermap.org
 * 
 * @return {String} weather
 */
function getWeatherData() {
    var request = new XMLHttpRequest();
    var city = g.weatherTextArea.value;
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=', true);

    request.onreadystatechange = function () {
        var weatherData;
        if (this.readyState === 4) {
            // standard responses
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.responseText);
                weatherData = data.weather[0].main.toLowerCase();
            } else {
                // default if all goes wrong
                weatherData = 'rain';
            }
            if (modernBrowser) { modernWeatherToKey(weatherData) }
            else { oldWeatherToKey(weatherData) }
        }
    };

    request.send();
    request = null;
}

/**
 * Picks the emoji key depending on the weather's value
 * 
 * @param {String} weatherData
 */
function modernWeatherToKey(weatherData) {
    if (weatherData.match('rain')) {
        g.key.value = '☔';
    } else if (weatherData.match('clouds')) {
        g.key.value = '⛅';
    } else if (weatherData.match('sun')) {
        g.key.value = '🌞';
    } else if (weatherData.match('clear')) {
        g.key.value = '🌈';
    } else if (weatherData.match('snow')) {
        g.key.value = '❄️';
    } else if (weatherData.match('wind')) {
        g.key.value = '🎐';
    }
    if (g.encrypt) {
        encryptMessage();
    } else {
        decryptMessage();
    }
}

/**
 * Chooses a number depending on the weather
 * data and encrypts or decrypts the mssage
 * 
 * @param {String} weatherData
 */
function oldWeatherToKey(weatherData) {
    if (weatherData.match('rain')) {
        g.key.value = '1';
    } else if (weatherData.match('clouds')) {
        g.key.value = '2';
    } else if (weatherData.match('sun')) {
        g.key.value = '3';
    } else if (weatherData.match('clear')) {
        g.key.value = '4';
    } else if (weatherData.match('snow')) {
        g.key.value = '5';
    } else if (weatherData.match('wind')) {
        g.key.value = '6';
    }
    if (g.encrypt) {
        encryptMessage();
    } else {
        decryptMessage();
    }

}

/**
 * Shows the key selected by the user in the textarea
 * @param {Event} e 
 */
function chooseKey(e) {
    var evt = e || window.event;
    g.key.value = evt.target.innerHTML;
}

/**
 * Adds click events to each grid td
 */
function addGridListeners() {
    for (var i = 0; i < g.gridNodes.length; i++) {
        U.addEvent(g.gridNodes[i], 'click', chooseKey);
    }
}

/**
 * Populates grid in a 5x5 manner using either
 * the emojis array or the asciiKeys array (keys.js)
 * @param {Array} array  emojis or ascii array
 */
function populateGrid(array) {
    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
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
        populateGrid(g.emojis);
    } else {
        populateGrid(g.asciiKeys);
    }
    g.gridNodes = document.querySelectorAll('.emojiGrid td');
    addGridListeners();
}

/**
 * Repopulate the grid to an emoji page 
 * prior to the current one.
 */
function leftClick() {
    if (modernBrowser) {
        if (g.counter === 25) { g.counter = 50; }
        else if (g.counter === 75) { g.counter = 25; }
        else if (g.counter === 50) { g.counter = 0; }

        for (var i = 0; i < g.gridNodes.length; i++) {
            g.gridNodes[i].innerHTML = g.emojis[g.counter];
            g.counter++;
        }
    }
}

/**
 * Repopulate the grid to an emoji page 
 * after the current one.
 */
function rightClick() {
    if (modernBrowser) {
        if (g.counter >= 75) { g.counter = 0; };

        for (var i = 0; i < g.gridNodes.length; i++) {
            g.gridNodes[i].innerHTML = g.emojis[g.counter];
            g.counter++;
        }
    }
}

/**
 * Show weather tab
 */
function weatherClick() {
    g.weatherTextArea.style.visibility = 'visible';
    g.weatherButton.style.backgroundColor = 'black';
    g.emojisButton.style.backgroundColor = 'darkgrey';
}

/**
 * Show emoji tab with grid
 */
function emojisClick() {
    g.weatherTextArea.style.visibility = 'hidden';
    g.emojisButton.style.backgroundColor = 'black';
    g.weatherButton.style.backgroundColor = 'darkgrey';
}

/**
 * Switches between encryption and decryption mode
 * and resets textarea values
 */
function switchClick() {
    if (g.encrypt) {
        U.removeEvent(g.sendButton, 'click', parseKey);
        U.addEvent(g.sendButton, 'click', parseKey);
        g.sendButton.innerHTML = 'decrypt';
        g.encrypt = false;

        g.input.value = 'Type the message to decipher here (Emojis only in modern browsers)!';
        g.output.value = '';
        g.key.value = '';

    } else {
        U.removeEvent(g.sendButton, 'click', parseKey);
        U.addEvent(g.sendButton, 'click', parseKey);
        g.sendButton.innerHTML = 'encrypt';
        g.encrypt = true;

        g.input.disabled = false;
        g.input.value = 'Type your message to be encrypted here!';
        g.output.value = '';
        g.key.value = '';
    }
}

/**
 * Updates the output text based on
 * what was typed in the input field
 */
function updateText() {
    if (g.key.value === '') {
        return;
    }

    parseKey();
}

/**
 * Switches panels for the wizard
 * 
 * @param {Event} e
 */
function switchPanels(e) {
    var evt = e || window.event;

    // data-panel is a number from 0 to 4
    var panelNumber = evt.target.getAttribute('data-panel');

    // panel messages to switch between
    var panelMessages =
        ['A Caesar Cypher shifts letters by a certain amount to form a new message',
            'In modern browsers, we can use emojis to determine the shift key',
            'Or even the weather! It\'s up to your imagination.',
            'Companies use different methods (better than emojis) to encrypt your data' +
            ' to make sure it\'s safe from malicious onlookers.',
            'Try it out yourself!'];
    
    // assigns a different array depending on the browser
    var keyExamples = modernBrowser ? ['1', '😀', 'Clouds', '?'] : ['1', 'b', 'Clouds', '?'];
    var outputExamples = modernBrowser ? ['bcd', '😬😁😂', '🌂❄️🎐', '2cf24dba5fb0a...'] : ['bcd', 'cde', 'uvw', '2cf24dba5fb0a...'];

    // the last panel will show the button
    // leading to index.html
    if (panelNumber === '4') {
        g.inputExample.style.visibility = 'hidden';
        g.outputExample.style.visibility = 'hidden';
        g.keyExample.style.visibility = 'hidden';
        g.startButton.style.visibility = 'visible';
        g.panelMessage.textContent = panelMessages[panelNumber];

    } else if (g.inputExample.style.visibility === 'hidden') {
        g.inputExample.style.visibility = 'visible';
        g.outputExample.style.visibility = 'visible';
        g.keyExample.style.visibility = 'visible';
        g.startButton.style.visibility = 'hidden';
    } else {
        // cross browser
        if (g.panelMessage.textContent) {
            g.panelMessage.textContent = panelMessages[panelNumber];
            g.keyExample.textContent = '→ Key: ' + keyExamples[panelNumber] + ' →';
            g.outputExampvarext.textContent = outputExamples[panelNumber];
        } else if (g.panelMessage.innerText) {
            g.panelMessage.innerText = panelMessages[panelNumber];
            g.keyExample.innerText = '→ Key: ' + keyExamples[panelNumber] + ' →';
            g.outputExampvarext.innerText = outputExamples[panelNumber];
        }
    }

}

/**
 * When enter keydown, parse and encrypt
 * based on grid
 */
function enterEncrypt(e) {
    var evt = e || window.event;
    var keyCode = evt.keyCode || evt.which;

    // only parse on enter key
    if (keyCode === 13) {
        evt.preventDefault();
        parseKey();
    }
}


U.addEvent(document, 'DOMContentLoaded', function () {
    // if the cookie doesn't exist or the user is deliberately
    // on the wizard page
    if (!document.cookie || window.location.href.indexOf('wizard') !== -1) {
        runWizard();
        // variables for wizard.html
        g.slideButtons = document.querySelectorAll('.slideButtons button');
        g.panelMessage = document.querySelector('p');
        g.keyExample = document.querySelector('span');
        g.inputExample = document.querySelector('.inputExample');
        g.outputExample = document.querySelector('.outputExample');
        g.outputExampvarext = document.querySelector('.outputExample h2');
        g.startButton = document.querySelector('.startButton');

        // add event listeners
        for (var i = 0; i < g.slideButtons.length; i++) {
            U.addEvent(g.slideButtons[i], 'click', switchPanels);
        }
        U.addEvent(g.startButton, 'click', function () {
            window.location.href = "index.html";
        });
    } else if (window.location.href.indexOf('wizard') === -1) {
        // variables for index.html
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
        g.weatherTextArea = document.querySelector('.weather textarea');
        g.encrypt = true;
        g.counter = 0;

        // fill a 5x5 grid
        makeGrid();

        // add event listeners
        U.addEvent(g.leftButton, 'click', leftClick);
        U.addEvent(g.rightButton, 'click', rightClick);
        U.addEvent(g.weatherButton, 'click', weatherClick);
        U.addEvent(g.emojisButton, 'click', emojisClick);
        U.addEvent(g.sendButton, 'click', parseKey);
        U.addEvent(g.switchButton, 'click', switchClick);
        U.addEvent(g.input, 'keyup', updateText);
        U.addEvent(g.input, 'keydown', enterEncrypt);
        U.addEvent(g.weatherTextArea, 'keydown', enterEncrypt);

    }

});

