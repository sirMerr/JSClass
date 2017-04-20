/**
 * Assignment #2
 * @author Tiffany Le-Nguyen
 * For 420-423-DW Internet Applications II – Winter 2017
 */

/* global U document */
const g = {};

// NOTE: need better way to have the punctuation keys and numbers encrypted/decrypted
// as of right now, it doesn't decrypt properly
function encryptMessage(message, key) {
    let output = '', character, code;

    
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
    console.log(output);
}

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

function runWizard() {
    const ref = localStorage.getItem('visit');

    // if this is the first visit, run the wizard
    // and set visit value to true;
    if (!ref) {
        console.log('This is the wizard');
        localStorage.setItem('visit', true);
    }
}

function getWeatherData() {
    var request = new XMLHttpRequest();
    const city = 'London';
    request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=b948605bb52e836030b831890f3e6232', true);

    request.onreadystatechange = function() {
        if (this.readyState === 4) {
            // standard 200 to 400 range from: https://httpstatuses.com/
            if (this.status >= 200 && this.status < 400) {
                var data = JSON.parse(this.responseText);
                console.log(data.weather[0].main);
            } else {
            // Error :(
            }
        }
    };

    request.send();
    request = null;
}

function populateGrid() {

}
encryptMessage('abcZz12 a', 20);
decryptMessage('uvwTtEF4u', 20);

U.addEvent(document, 'DOMContentLoaded', () => {
    g.input = document.querySelector('.input');
    g.output = document.querySelector('.output');
    g.emojiGrid = document.querySelector('.emojiGrid');

    // NOTE: have a make grid function
    // and populate it. Add event listeners
    // to each pane

    // Add event listeners to buttons 
    // and have a function that will change the content
    // with the arrow buttons
    console.log(g.emojiGrid);

    runWizard();
    //getWeatherData();
});

