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
function encryptMessage() {
    if (!g.key.value) {
        return;
    }
    const message = g.input.value;
    let key = g.key.value;
    if (!key.match(/[a-zA-Z]/)) {
        key = emojis.indexOf(key) + 1;
    }
    let output = '', character, code, emoji;

    if (modernBrowser) {
        for (let i = 0; i < message.length; i++) {
            character = message[i];
            if (character.match(/[a-zA-Z]/) || character.match(/[. 0-9!?,-:";()\']/)) {
                code = message.charCodeAt(i);
                if (code >= 65 && code <= 90) {
                    character = String.fromCharCode(((code - 65 + key) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    character = String.fromCharCode(((code - 97 + key) % 26) + 97);
                } else {
                   character;
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
        document.cookie = 'visit=true';
        if (window.location.href.indexOf('wizard') === -1) {
            window.location.href = "wizard.html";
        }
    // const ref = localStorage.getItem('visit');

    // // if this is the first visit, run the wizard
    // // and set visit value to true;
    // if (!ref) {
    //     console.log('This is the wizard');
    //     localStorage.setItem('visit', true);
    // }
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
    for (let i = 0; i < g.gridNodes.length; i++) {
        U.addEvent(g.gridNodes[i], 'click', chooseKey);
    }
    // Array.from(g.gridNodes).forEach(element => {
    //     U.addEvent(element, 'click', chooseKey);
    // });
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
    g.gridNodes = document.querySelectorAll('.emojiGrid td');
    addGridListeners();
}

/**
 * Repopulate the grid to an emoji page 
 * prior to the current one.
 */
function leftClick() {
    if (modernBrowser) {
        if (g.counter === 25) { g.counter = 50 }
        else if (g.counter === 75) { g.counter = 25 }
        else if (g.counter === 50) { g.counter = 0}

        for (let i = 0; i < g.gridNodes.length; i++) {
                g.gridNodes[i].innerHTML = emojis[g.counter];
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
        if (g.counter >= 75) { g.counter = 0 };

        for (let i = 0; i < g.gridNodes.length; i++) {
            g.gridNodes[i].innerHTML = emojis[g.counter];
            g.counter++;
        }        
        // Array.from(g.gridNodes).forEach(element => {
        //     Array.from(element.childNodes).forEach(emoji => {
        //         emoji.innerHTML = emojis[g.counter];
        //         g.counter++;
        //     })
        // })
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

/**
 * Switches between encryption and decryption mode
 */
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

/**
 * Updates the output text based on
 * what was typed in the input field
 */
function updateText() {
    if (g.key.value !== '') {
       encryptMessage();
    }
}

function switchPanels(e) {
    const evt = e || window.event;
    const panelNumber = evt.target.getAttribute('data-panel');
    const panelMessages = 
        ['A Caesar Cypher shifts letters by a certain amount to form a new message',
         'In modern browsers, we can use emojis to determine the shift key',
         'Or even the weather! It\'s up to your imagination.',
         'Companies use different methods (better than emojis) to encrypt your data' +
         ' to make sure it\'s safe from malicious onlookers.',
         'Try it out yourself!']
    const keyExamples = ['1', '😀', 'Clouds', '?'];
    const outputExamples = ['bcd', '😬😁😂', '🌂❄️🎐', '2cf24dba5fb0a...']

    // cross browser
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
        if (g.panelMessage.textContent) {
            g.panelMessage.textContent = panelMessages[panelNumber];
            g.keyExample.textContent = '→ Key: ' + keyExamples[panelNumber] + ' →';
            g.outputExampleText.textContent = outputExamples[panelNumber];
        } else if (g.panelMessage.innerText) {
            g.panelMessage.innerText = panelMessages[panelNumber];
            g.keyExample.innerText = '→ Key: ' + keyExamples[panelNumber] + ' →';
            g.outputExampleText.innerText = outputExamples[panelNumber];
        }
    }

}

function enterEncrypt(e) {
    var evt = e || window.event;
    var keyCode = evt.keyCode || evt.which;
    if (keyCode === 13) {
        evt.preventDefault();
        encryptMessage();
    }
}

U.addEvent(document, 'DOMContentLoaded', () => {
    // the second condition is in case the user brute forces his way to the
    // wizard page (mainly for testing purposes)
    if (!document.cookie || window.location.href.indexOf('wizard') !== -1) {
        runWizard();
        // variables for wizard.html
        g.slideButtons = document.querySelectorAll('.slideButtons button');
        g.panelMessage = document.querySelector('p');
        g.keyExample = document.querySelector('span');
        g.inputExample =  document.querySelector('.inputExample');
        g.outputExample =  document.querySelector('.outputExample');
        g.outputExampleText = document.querySelector('.outputExample h2');
        g.startButton = document.querySelector('.startButton');

        console.log('here3')
        // add event listeners
        for (let i = 0; i < g.slideButtons.length; i++) {
            U.addEvent(g.slideButtons[i], 'click', switchPanels);
        }
        U.addEvent(g.startButton, 'click', function (){
            window.location.href = "index.html";
        })
    } else if (window.location.href.indexOf('index') !== -1){
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
        g.weatherTextArea = document.querySelector('.weather');
        g.encrypt = true;
        g.counter = 0;

        makeGrid();
        //add event listeners
        U.addEvent(g.leftButton, 'click', leftClick);
        U.addEvent(g.rightButton, 'click', rightClick);
        U.addEvent(g.weatherButton, 'click', weatherClick);
        U.addEvent(g.emojisButton, 'click', emojisClick);
        U.addEvent(g.sendButton, 'click', encryptMessage);
        U.addEvent(g.switchButton, 'click', switchClick);
        U.addEvent(g.input, 'keyup', updateText);
        U.addEvent(g.input, 'keydown', enterEncrypt);
    }

});

