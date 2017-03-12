var exec = require('child_process').exec;
var path = require("path");

module.exports = function() {
    var module = {};

    /**
     * Keyboard layout mapping. This mapping table can be set with setKeyboardLayout().
     */
    var keyboardLayout = {
        '+': 'add',
        '-': 'subtract',
        ' ': 'space',
        '&': 'shift-ampersand',
        '*': 'shift-asterisk',
        '@': 'shift-at',
        '`': 'shift-back_quote space',
        '~': '@514 space',
        '^': 'shift-circumflex space',
        '\\': 'back_slash',
        '/': 'slash',
        '{': 'shift-braceleft',
        '}': 'shift-braceright',
        '[': 'open_bracket',
        ']': 'close_bracket',
        ':': 'shift-colon',
        ';': 'semicolon',
        ',': 'comma',
        '$': 'shift-dollar',
        '€': 'alt_gr-euro_sign',
        '=': 'equals',
        '!': 'shift-exclamation_mark',
        '(': 'shift-left_parenthesis',
        ')': 'shift-right_parenthesis',
        '#': 'shift-number_sign',
        '.': 'period',
        "'": 'quote',
        '"': 'shift-quotedbl',
        '_': 'shift-underscore',
        '|': 'shift-@92',
        '?': 'shift-@47'
    };

    /**
     * A key code is a numeric value starting with @ or a textual. For example, there are two key codes for letter 'A'.
     * The numeric is "@65" and the textual is "A".
     */
    module.sendKey = function(keyCode) {
        return module.execute([keyCode]);
    };

    module.sendKeys = function(arrKeyCodes) {
        return module.execute(arrKeyCodes);
    };

    module.sendLetter = function(letter) {
        return module.sendKey(module.getKeyCode(letter));
    };

    module.sendLetters = function(arrLetters) {
        var arrKeyCodes = [];

        for (var i = 0; i < arrLetters.length; i++) {
            arrKeyCodes.push(module.getKeyCode(arrLetters[i]));
        }

        return module.sendKey(arrKeyCodes);
    };

    module.sendText = function(text) {
        var keyCodes = [];

        for (var i = 0, len = text.length; i < len; i++) {
            var currentKey = text[i];
            var keyCode = module.getKeyCode(currentKey);

            keyCodes.push(keyCode);
        }

        return module.execute(keyCodes);
    };

    module.getKeyCode = function(letter) {
        var keyCode = letter;

        if (typeof keyboardLayout[letter] !== 'undefined') {
            keyCode = keyboardLayout[letter];
        }

        return keyCode;
    };

    module.sendCombination = function(arrKeyCodes) {
        return module.execute([arrKeyCodes.join('-')]);
    };

    module.execute = function(arrParams) {
        return new Promise(function(resolve, reject) {
            var jarPath = path.join(__dirname, 'jar', 'key-sender.jar');

            var command = 'java -jar ' + jarPath + ' ' + arrParams.join(' ');
            console.log('Sending: ' + command);

            return exec(command, {}, function(error, stdout, stderr) {
                if (error == null) {
                    resolve(stdout, stderr);
                } else {
                    reject(error, stdout, stderr);
                }
            });
        });
    };

    module.setKeyboardLayout = function(newKeyMap) {
        keyboardLayout = newKeyMap;
    };

    module.aggregateKeyboardLayout = function(arrKeyMap) {
        keyboardLayout = Object.assign(keyboardLayout, arrKeyMap)
    };

    module.getKeyboardLayout = function() {
        return keyboardLayout;
    };

    return module;
};