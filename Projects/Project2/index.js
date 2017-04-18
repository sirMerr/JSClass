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
            console.log(code);
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
    let output = '';
    for (let i = 0; i < message.length; i++) {
        code = message.charCodeAt(i);
        console.log(code);
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
encryptMessage('abcZz12 a', 20);
decryptMessage('uvwTtEF4u', 20);

U.addEvent(document, 'DOMContentLoaded', () => {
    g.input = document.querySelector('.input');
    g.output = document.querySelector('.output');
});

