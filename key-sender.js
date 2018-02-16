var exec = require('child_process').exec;
var path = require("path");

module.exports = function() {
    var module = {};

    var batch = [];

    var options = {
        "startDelayMillisec": null,
        "caseCorrection": null,
        "globalDelayPressMillisec": null,
        "globalDelayBetweenMillisec": null,
        "extra": null
    };

    module.BATCH_EVENT_KEY_PRESS = 1;
    module.BATCH_EVENT_KEY_UP = 2;
    module.BATCH_EVENT_KEY_DOWN = 3;

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

            var command = 'java -jar \"' + jarPath + '\" ' + arrParams.join(' ') + module.getCommandLineOptions();

            return exec(command, {}, function(error, stdout, stderr) {
                if (error == null) {
                    resolve(stdout, stderr);
                } else {
                    reject(error, stdout, stderr);
                }
            });
        });
    };

    module.getCommandLineOptions = function() {
        var arguments = '';

        if (typeof options.startDelayMillisec !== 'undefined' && options.startDelayMillisec != null) {
            arguments = arguments + ' -sd ' + options.startDelayMillisec;
        }

        if (typeof options.caseCorrection !== 'undefined' && options.caseCorrection != null) {
            arguments = arguments + ' -c ' + (options.caseCorrection ? '1' : '0');
        }

        if (typeof options.globalDelayPressMillisec !== 'undefined' && options.globalDelayPressMillisec != null) {
            arguments = arguments + ' -pd ' + options.globalDelayPressMillisec;
        }

        if (typeof options.globalDelayBetweenMillisec !== 'undefined' && options.globalDelayBetweenMillisec != null) {
            arguments = arguments + ' -d ' + options.globalDelayBetweenMillisec;
        }

        if (typeof options.extra !== 'undefined' && options.extra != null) {
            arguments = arguments + ' ' + options.extra;
        }

        return arguments;
    };

    module.cleanKeyboardLayout = function() {
        keyboardLayout = {};
    };

    module.setKeyboardLayout = function(newKeyMap) {
        keyboardLayout = newKeyMap;
    };

    module.aggregateKeyboardLayout = function(objKeyMap) {
        keyboardLayout = Object.assign(keyboardLayout, objKeyMap)
    };

    module.getKeyboardLayout = function() {
        return keyboardLayout;
    };

    module.startBatch = function() {
        batch = [];
        return module;
    };

    module.batchTypeKey = function(keyCode, waitMillisec, batchEvent) {
        if (typeof waitMillisec == 'undefined') {
            waitMillisec = 0;
        }

        if (typeof batchEvent == 'undefined') {
            batchEvent = module.BATCH_EVENT_KEY_PRESS;
        }

        var param = {
            "combination": null,
            "keyCode": keyCode,
            "wait": waitMillisec,
            "event": batchEvent
        };

        batch.push(param);

        return this;
    };

    module.batchTypeCombination = function(arrKeys, waitMillisec, batchEvent) {
        if (typeof waitMillisec == 'undefined') {
            waitMillisec = 0;
        }

        if (typeof batchEvent == 'undefined') {
            batchEvent = module.BATCH_EVENT_KEY_PRESS;
        }

        var param = {
            "combination": arrKeys,
            "keyCode": null,
            "wait": waitMillisec,
            "event": batchEvent
        };

        batch.push(param);

        return this;
    };

    module.batchTypeKeys = function(arrKeyCodes) {
        for (var i = 0; i < arrKeyCodes.length; i++) {
            var param = {
                "combination": null,
                "keyCode": arrKeyCodes[i],
                "wait": 0,
                "event": module.BATCH_EVENT_KEY_PRESS
            };

            batch.push(param);
        }

        return this;
    };

    module.batchTypeText = function(text) {
        var arrKeyCodes = [];

        for (var i = 0, len = text.length; i < len; i++) {
            var currentKey = text[i];
            var keyCode = module.getKeyCode(currentKey);

            arrKeyCodes.push(keyCode);
        }

        module.batchTypeKeys(arrKeyCodes);

        return this;
    };

    module.sendBatch = function() {
        var arrArguments = [];

        for (var i = 0; i < batch.length; i++) {
            var param = batch[i];
            var isCombination = param.combination != null;
            var argument = '';

            if (isCombination) {
                argument = param.combination.join('-');
            } else {
                argument = param.keyCode;
            }

            if (param.wait > 0) {
                argument = argument + '.w' + param.wait;
            }

            if (param.event == module.BATCH_EVENT_KEY_UP) {
                argument = argument + '.up';
            }

            if (param.event == module.BATCH_EVENT_KEY_DOWN) {
                argument = argument + '.down';
            }

            arrArguments.push(argument);
        }

        return module.execute(arrArguments);
    };

    module.setOption = function(optionName, optionValue) {
        options[optionName] = optionValue;

        return module;
    };

    module.getOptions = function() {
        return options;
    };

    return module;
}();
