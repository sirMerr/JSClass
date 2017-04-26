# Unicode notes

(Note: these are rough notes I wrote for myself while learning about this area.
They are vague in some parts, overly detailed in other parts, and are not intended as course
notes. -Maja)

Unicode is widely adopted standard for representing text. Goal: represent every conceivable writing system on the planet with a "universal character set". Catalyst: internationalization and the internet.

## Some definitions

* glyph: symbol rendered on the screen (e.g. a cloud symbol, the number 3, an uppercase A)
* code point: unique identifier for a glyph in Unicode, usually written as a zero-padded hex (e.g. U+hexNumber like U+0000A9)
* encoding: how a glyph is represented internally (binary code, and its hex, decimal equivalents). There are many encodings for Unicode, like utf-8, ucs-2, utf-16. Hundreds of other encodings that were in use before Unicode.
* basic multilingual plane (BMP): This is a category of characters used most often in documents written in English. Unicode code points are grouped into planes (categories). The first two hex symbols of a code point indicate the plane. The 0th plane include U+000000 to U+00FFFF, and it's called the basic multilingual plane. Unicode has 16 other planes, like U+010000 to U+01FFFF, all the way to U+100000 to U+10FFFF. If a character's code point has more than four hex digits, excluding leading zeros, like U+01F4A9, it's outside of the BMP.
* Mojibake: from the Japanese (moji) "character" + (bake, pronounced "bah-keh") "transform", is the garbled symbols that are the result of text being decoded using an unintended character encoding. (e.g. when software opens an Arabic document encoded in utf-8 but reads it as just ASCII)
* escape sequences: JavaScript, for example, has an escape sequence for each character that is in the BMP, written like `'\u00A9'`.

### Some Common Encodings

* ASCII, 7 bits, started in USA. Only English alphabet, numbers, symbols, whitespace, some non-printing characters.
* UCS-2: fixed length, always two bytes (represented Unicode's basic multilingual plane only), can be little endian or big endian. Uses the code point value as the encoding. For example, U+00A9 is represented as `0x00A9` (hex).
* UTF-16: extends UCS-2 (i.e. it's the same as UCS-2 in the BMP), variable length, two or four bytes, uses two-byte codes to represent strings in BMP (like UCS-2), and 4 bytes for non-BMP (surrogate pairs). Little endian or big endian. Can represent all Unicode characters.
* UTF-8: variable length; one to four bytes; extends ASCII; most-common; recommended for HTML documents; most common encoding on the web. Can represent all Unicode characters.

For historical reasons, characters that can be represented in ASCII are pretty robust: most software will be able to decode and encode them even if it doesn't pay special attention to encodings. But for characters beyond this range, programmers need to be aware of encodings to avoid subtle bugs.

## Basics

Reference: https://www.joelonsoftware.com/2003/10/08/the-absolute-minimum-every-software-developer-absolutely-positively-must-know-about-unicode-and-character-sets-no-excuses/

Start with 8-bit sequences. 0-127 are what we know as ASCII (English alphanumeric + symbols).

> ...most people just [pretend] that a byte was a character and a character was 8 bits and as long as you never moved a string from one computer to another, or spoke more than one language, it would sort of always work.

Semi-olden days, before ANSI - no agreement about how to handle 128 and up:

> ...which all used the top 128 characters for their own purposes. For example on some PCs the character code 130 would display as é, but on computers sold in Israel it was the Hebrew letter Gimel (ג), so when Americans would send their résumés to Israel they would arrive as rגsumגs.

ANSI code pages: 0-127 was same everywhere, 128 and up had different definitions called "code pages". using Greek and Hebrew on the same computer was not possible out of the box.

> In the ANSI standard, everybody agreed on what to do below 128, which was pretty much the same as ASCII, but there were lots of different ways to handle the characters from 128 and on up, depending on where you lived. These different systems were called code pages. So for example in Israel DOS used a code page called 862, while Greek users used 737.

Asia was a whole other story at that point, because languages in this region have to represent thousands of characters.

Then as the internet became more widely used, the Unicode Consortium was formed to establish a universal character set to facilitate world-wide sharing of documents.

> MYTH: Unicode is simply a 16-bit code where each character takes 16 bits and therefore there are 65,536 possible characters.

(Explains glyph versus Unicode code point versus character encoding.)

When rendering text, if an unrecognized code is encountered, it is transformed into a special "replacement character" U+FFFD, that looks like a question mark.

> If you completely forget everything I just explained, please remember one extremely important fact. It does not make sense to have a string without knowing what encoding it uses. You can no longer stick your head in the sand and pretend that “plain” text is ASCII. There Ain’t No Such Thing As Plain Text.

On the meta charset attribute in HTML:

> But that meta tag really has to be the very first thing in the `<head>` section because as soon as the web browser sees this tag it’s going to stop parsing the page and start over after reinterpreting the whole page using the encoding you specified.

## Character encoding in JavaScript

Reference: https://mathiasbynens.be/notes/javascript-encoding

The JavaScript languages treats strings as UCS-2-encoded. For characters in Unicode's BMP, this behaviour is intuitive: you can represent a BMP character with a single escape character corresponding to its code point like `\u00A9`.

However, for other Unicode planes (which include most emoji, non-West-European characters) this leads to single characters being treated as strings of length 2. Since non-BMP characters don't fit in UCS-2 (they are encoded in 4 bytes instead of 2), they are represented in the language as two 2-byte characters like `'\uD834\uDF06'`. This two-part representation is called a "surrogate pair".

Example: we can't encode the emoji U+1F60F (smirking face) in UCS-2 because it's beyond the BMP (meaning its code is larger than U+FFFF so it needs more than 2 bytes to be represented). The 4-byte representation of U+1F60F in hex is `0xD83D 0xDE0F`. JavaScript uses UCS-2 for strings, so it can represent that with two escape codes: `"\uD83D\uDE0F"`. Even though this represents just a single character, in JavaScript `"\uD83D\uDE0F".length` is 2.

In summary, JavaScript counts every 2-byte "unit" that contributes to forming a Unicode symbol, so what we see as one character (one smirking face emoji) is counted as many units.

Since these 2-byte units are manipulated individually by the language, this can lead to bugs like:

* miscounting length
* cutting off half a character (which will be rendered as an invalid character)
* recording two halves of a character in the wrong order (which also renders as an invalid character) Say you try to reverse a Unicode string that contains non-BMP symbols.
* trouble with regular expressions

>Surrogate pairs are only recombined into a single Unicode character when they’re displayed by the browser (during layout). This happens outside of the JavaScript engine. To demonstrate this, you could write out the high surrogate and the low surrogate in separate `document.write()` calls: `document.write('\uD834'); document.write('\uDF06');``. This ends up getting rendered as one glyph.

Note: There's a math formula to convert between surrogate pairs and code points.

There are libaries out there to abstract away the low-level details of working with non-BMP characters. Also, JavaScript ES6 adds features to make working with non-BMP characters easier: `String.fromCodePoint` and new syntax for code point escape sequences like `\u{1D306}` so that you don't have to worry about surrogate pairs.

## More On JavaScript Unicode Problems

Reference: https://mathiasbynens.be/notes/javascript-unicode

* To represent a non-BMP character in JavaScript, you need to write it as a surrogate pair like `"\uD83D\uDE0F"`, which looks nothing like the code point, which in this case "U+1f60f". To convert between the to, you need to perform a calculation.
* Examples of how this and other problems mess with determining string length.
* ES6 has a String.normalize method to deal with combining marks.
* Normalization doesn't help with all combining marks. Examples of other grapheme clusters that cause issues.
* In ES6, Array.from on a String uses the string iterator, which mostly counts strings right and reverse them right, too. Same problems as above with combining marks and grapheme clusters.
* Iterating over strings is therefore buggy, as are many string methods. ES6 fixes many of these problems, and some can be polyfilled.
* Examples of similar issues with regular expressions.

> This behavior leads to many issues. Twitter, for example, allows 140 characters per tweet, and their back-end doesn’t mind what kind of symbol it is — astral or not. But because the JavaScript counter on their website at some point simply read out the string’s length without accounting for surrogate pairs, it wasn’t possible to enter more than 70 astral symbols. (The bug has since been fixed.)

> Whenever you’re working on a piece of JavaScript code that deals with strings or regular expressions in some way, just add a unit test that contains a pile of poo (💩) in a string, and see if anything breaks. It’s a quick, fun, and easy way to see if your code supports astral symbols.

> A good test string for Unicode support in general is the following: Iñtërnâtiônàlizætiøn☃💩. Its first 20 symbols are in the range from U+0000 to U+00FF, then there’s a symbol in the range from U+0100 to U+FFFF, and finally there’s an astral symbol (from the range of U+010000 to U+10FFFF).

## JavaScript Escape sequences

Reference:

* `String#charCodeAt()` can be used to get the numeric Unicode code point of any character up to U+FFFF (characters in the BMP)
* In ES6, `String#codePointAt()` will work for all Unicode characters.
* JavaScript has hex escape sequences, as well as Unicode escape sequences, which look like `\u1234`. The Unicode escape sequences must always consist of `\u` plus four hex digits. The digits are case-insensitive.
* Octal escape sequences are deprecated.
* In the BMP plane, the hex value in the escape sequence corresponds to the code point. Beyond BMP, JavaScript represents characters with surrogate pairs, which look like "\uD83D\uDE0F".
* You can use Unicode escape in JSON (but not hex or octal escapes)
* ES6 introduces code point escapes, which eliminate the surrogate pair complication for non-BMP characters. Example: `'\u{1f60f}'` instead of the unicode escape `"\uD83D\uDE0F"`. Or `'\u{41}\u{42}\u{43}'` is "ABC".

## Emoji

Reference: https://youtu.be/tITwM5GDIAI

In the 90s, Japanese telecom companies had room for extra symbols in the encodings they were using for SMS. Since the devices couldn't send images in messages, new symbols were added to the character sets used by phones (different sets for different telecom companies) to represent faces, etc. Not standardized yet. These pictograms, called emoji, became popular in Japan.

The pictograms were chosen and designed kind of arbitrarily: determined by a few Japanese programmers and their friends.

Then Unicode Consortium wanted to make a character set for all characters around the world and they decided to include emoji to be able to convert Japanese docs.

When Apple release iPhone in Japan, customers complained that there was no way to write emoji, so Apple added support. They eventually turned this feature on in iOS in their other markets as well and it accidentally became very popular. Then other mobile OSs added support, and browsers, etc.

Once it grew popular, there was criticism that the symbols are very limited (e.g. only pale skin colour), so with every version of Unicode, new symbols are added.


## Resources

Polyfills

  * https://github.com/mathiasbynens/String.prototype.codePointAt
  * https://github.com/mathiasbynens/String.fromCodePoint

Libraries

  * https://github.com/twitter/twemoji
