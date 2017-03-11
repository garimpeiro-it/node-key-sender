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
        '\\': 'back_slash',
        '/': 'slash',
        '{': 'shift-braceleft',
        '}': 'shift-braceright',
        '^': 'shift-circumflex space',
        '[': 'open_bracket',
        ']': 'close_bracket',
        ':': 'shift-colon',
        ';': 'semicolon',
        ',': 'comma',
        '$': 'shift-dollar',
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
        '?': 'shift-@47',
        '~': '@514 space',
        'ã': '@514 a',
        'ẽ': '@514 e',
        'ĩ': '@514 i',
        'õ': '@514 o',
        'ũ': '@514 u',
        'Ã': '@514 A',
        'Ẽ': '@514 E',
        'Ĩ': '@514 I',
        'Õ': '@514 O',
        'Ũ': '@514 U',
        'â': 'shift-@514 a',
        'ê': 'shift-@514 e',
        'î': 'shift-@514 i',
        'ô': 'shift-@514 o',
        'û': 'shift-@514 u',
        'Â': 'shift-@514 A',
        'Ê': 'shift-@514 E',
        'Î': 'shift-@514 I',
        'Ô': 'shift-@514 O',
        'Û': 'shift-@514 U',
        'à': 'shift-@192 a',
        'è': 'shift-@192 e',
        'ì': 'shift-@192 i',
        'ò': 'shift-@192 o',
        'ù': 'shift-@192 u',
        'À': 'shift-@192 A',
        'È': 'shift-@192 E',
        'Ì': 'shift-@192 I',
        'Ò': 'shift-@192 O',
        'Ù': 'shift-@192 U',
        'á': '@192 a',
        'é': '@192 e',
        'í': '@192 i',
        'ó': '@192 o',
        'ú': '@192 u',
        'Á': '@192 A',
        'É': '@192 E',
        'Í': '@192 I',
        'Ó': '@192 O',
        'Ú': '@192 U',
        'ç': '@192 c',
        'Ç': '@192 C'
    };

    /**
     * A key code is a numeric value starting with @ or a textual. For example, there are two key codes for letter 'A'.
     * The numeric is "@65" and textual is "A".
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

    this.getKeyboardLayout = function() {
        return keyboardLayout;
    };
};

//a = new module.exports();
//a.sendText('Fernando+- &*@`\\/{}^[]:;,$=€!()#.\'\"_|?`~ãẽĩõũÃẼĨÕŨâêîôûÂÊÎÔÛàèìòùÀÈÌÒÙáéíóúÁÉÍÓÚçÇ');


