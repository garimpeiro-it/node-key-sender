var exec = require('child_process').exec;

module.exports = function() {
    var parent = this;

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
    this.sendKey = function(keyCode) {
        parent.execute([keyCode]);
    };

    this.sendKeys = function(arrKeyCodes) {
        parent.execute(arrKeyCodes);
    };

    this.sendLetter = function(letter) {
        parent.sendKey(parent.getKeyCode(letter));
    };

    this.sendLetters = function(arrLetters) {
        var arrKeyCodes = [];

        for (var i = 0; i < arrLetters.length; i++) {
            arrKeyCodes.push(parent.getKeyCode(arrLetters[i]));
        }

        parent.sendKey(arrKeyCodes);
    };

    this.sendText = function(text) {
        var keyCodes = [];

        for (var i = 0, len = text.length; i < len; i++) {
            var currentKey = text[i];
            var keyCode = parent.getKeyCode(currentKey);

            keyCodes.push(keyCode);
        }

        parent.execute(keyCodes);
    };

    this.getKeyCode = function(letter) {
        var keyCode = letter;

        if (typeof keyboardLayout[letter] !== 'undefined') {
            keyCode = keyboardLayout[letter];
        }

        return keyCode;
    };

    this.sendCombination = function(arrKeyCodes) {
        parent.execute([arrKeyCodes.join('-')]);
    };

    this.execute = function(arrParams) {
        var command = 'java -jar jar/key-sender.jar ' + arrParams.join(' ');
        console.log('Sending: ' + command);

        exec(command);
    };

    this.setKeyboardLayout = function(newKeyMap) {
        keyboardLayout = newKeyMap;
    };

    this.aggregateKeyboardLayout = function(arrKeyMap) {
        keyboardLayout = Object.assign(keyboardLayout, arrKeyMap)
    };

    this.getKeyboardLayout = function() {
        return keyboardLayout;
    };
};