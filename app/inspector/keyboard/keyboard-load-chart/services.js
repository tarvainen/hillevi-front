(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Keyboard.Load.Services', []);

    /**
     * Service definitions.
     */
    angular.module('Inspector.Keyboard.Load.Services')
        .factory('KeyboardLoadFormatterService', KeyboardLoadFormatterService)
    ;

    ////////////

    /**
     * Formatter service for the keyboard load data.
     *
     * @returns {*}
     *
     * @constructor
     */
    function KeyboardLoadFormatterService () {
        return {
            formatData: formatData,
            getLayout: getLayout
        };

        /**
         * Format the data to the desired format.
         *
         * @param {*} data
         *
         * @returns {*}
         */
        function formatData (data) {
            var max = 0;

            angular.forEach(data, function (item) {
                if (parseInt(item) > max) {
                    max = parseInt(item);
                }
            });

            angular.forEach(data, function (item, key) {
                data[key] = {
                    mapped: map(item, max, 1),
                    original: item
                };
            });

            function map (val, oMax, nMax) {
                return ((parseFloat(nMax) / parseFloat(oMax)) * parseFloat(val));
            }

            return data;
        }

        /**
         * Returns the keyboard layout which is used to
         * generate the keyboard view in to the UI.
         *
         * @returns {*}
         */
        function getLayout () {
            return [
                [
                    { key: 'keyEsc', cols: 1, text: 'esc' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyF1', cols: 1, text: 'F1' },
                    { key: 'keyF2', cols: 1, text: 'F2' },
                    { key: 'keyF3', cols: 1, text: 'F3' },
                    { key: 'keyF4', cols: 1, text: 'F4' },
                    { key: 'keyF5', cols: 1, text: 'F5' },
                    { key: 'keyF6', cols: 1, text: 'F6' },
                    { key: 'keyF7', cols: 1, text: 'F7' },
                    { key: 'keyF8', cols: 1, text: 'F8' },
                    { key: 'keyF9', cols: 1, text: 'F9' },
                    { key: 'keyF10', cols: 1, text: 'F10' },
                    { key: 'keyF11', cols: 1, text: 'F11' },
                    { key: 'keyF12', cols: 1, text: 'F12' },
                    { key: 'keyPrintScreen', cols: 1, text: 'Print Screen' },
                    { key: 'keyScrollLock', cols: 1, text: 'Scroll Lock' },
                    { key: 'keyPause', cols: 1, text: 'Pause' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' }
                ],
                [
                    { key: 'keyHalf', cols: 1, text: '§' },
                    { key: 'key1', cols: 1, text: '1' },
                    { key: 'key2', cols: 1, text: '2' },
                    { key: 'key3', cols: 1, text: '3' },
                    { key: 'key4', cols: 1, text: '4' },
                    { key: 'key5', cols: 1, text: '5' },
                    { key: 'key6', cols: 1, text: '6' },
                    { key: 'key7', cols: 1, text: '7' },
                    { key: 'key8', cols: 1, text: '8' },
                    { key: 'key9', cols: 1, text: '9' },
                    { key: 'key0', cols: 1, text: '0' },
                    { key: 'keyQuestionMark', cols: 1, text: '?' },
                    { key: 'keyHips', cols: 1, text: '`' },
                    { key: 'keyBackspace', cols: 1, text: 'Back Space' },
                    { key: 'keyInsert', cols: 1, text: 'Insert' },
                    { key: 'keyHome', cols: 1, text: 'Home' },
                    { key: 'keyPageUp', cols: 1, text: 'Page Up' },
                    { key: 'keyNumLock', cols: 1, text: 'Num Lock' },
                    { key: 'keyDivide', cols: 1, text: '/' },
                    { key: 'keyMultiply', cols: 1, text: '*' }
                ],
                [
                    { key: 'keyTab', cols: 1, text: 'Tab' },
                    { key: 'keyQ', cols: 1, text: 'Q' },
                    { key: 'keyW', cols: 1, text: 'W' },
                    { key: 'keyE', cols: 1, text: 'E' },
                    { key: 'keyR', cols: 1, text: 'R' },
                    { key: 'keyT', cols: 1, text: 'T' },
                    { key: 'keyY', cols: 1, text: 'Y' },
                    { key: 'keyU', cols: 1, text: 'U' },
                    { key: 'keyI', cols: 1, text: 'I' },
                    { key: 'keyO', cols: 1, text: 'O' },
                    { key: 'keyP', cols: 1, text: 'P' },
                    { key: 'keyAO', cols: 1, text: 'Å' },
                    { key: 'keyTilde', cols: 1, text: '^' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyDelete', cols: 1, text: 'Delete' },
                    { key: 'keyEnd', cols: 1, text: 'End' },
                    { key: 'keyPageDown', cols: 1, text: 'Page Down' },
                    { key: 'keyNum7', cols: 1, text: 'Num7' },
                    { key: 'keyNum8', cols: 1, text: 'Num8' },
                    { key: 'keyNum9', cols: 1, text: 'Num9' }
                ],
                [
                    { key: 'keyCapsLock', cols: 1, text: 'Caps Lock' },
                    { key: 'keyA', cols: 1, text: 'A' },
                    { key: 'keyS', cols: 1, text: 'S' },
                    { key: 'keyD', cols: 1, text: 'D' },
                    { key: 'keyF', cols: 1, text: 'F' },
                    { key: 'keyG', cols: 1, text: 'G' },
                    { key: 'keyH', cols: 1, text: 'H' },
                    { key: 'keyJ', cols: 1, text: 'J' },
                    { key: 'keyK', cols: 1, text: 'K' },
                    { key: 'keyL', cols: 1, text: 'L' },
                    { key: 'keyOE', cols: 1, text: 'Ö' },
                    { key: 'keyAE', cols: 1, text: 'Ä' },
                    { key: 'keyMultiply', cols: 1, text: '*' },
                    { key: 'keyEnter', cols: 1, text: 'Enter' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyNum4', cols: 1, text: 'Num4' },
                    { key: 'keyNum5', cols: 1, text: 'Num5' },
                    { key: 'keyNum6', cols: 1, text: 'Num6' }
                ],
                [
                    { key: 'keyLeftShift', cols: 1, text: 'Shift' },
                    { key: 'keyLt', cols: 1, text: '<' },
                    { key: 'keyZ', cols: 1, text: 'Z' },
                    { key: 'keyX', cols: 1, text: 'X' },
                    { key: 'keyC', cols: 1, text: 'C' },
                    { key: 'keyV', cols: 1, text: 'V' },
                    { key: 'keyB', cols: 1, text: 'B' },
                    { key: 'keyN', cols: 1, text: 'N' },
                    { key: 'keyM', cols: 1, text: 'M' },
                    { key: 'keyComma', cols: 1, text: ',' },
                    { key: 'keyPeriod', cols: 1, text: '.' },
                    { key: 'keyMinus', cols: 1, text: '-' },
                    { key: 'keyRightShift', cols: 1, text: 'Shift' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyUp', cols: 1, text: 'Up' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyNum1', cols: 1, text: 'Num1' },
                    { key: 'keyNum2', cols: 1, text: 'Num2' },
                    { key: 'keyNum3', cols: 1, text: 'Num3' }
                ],
                [
                    { key: 'keyLeftCtrl', cols: 1, text: 'LCtrl' },
                    { key: 'keyCmd', cols: 1, text: 'Cmd' },
                    { key: 'keyLeftAlt', cols: 1, text: 'Alt' },
                    { key: 'keySpace', cols: 5, text: 'Space' },
                    { key: 'keyAltGr', cols: 1, text: 'Alt Gr' },
                    { key: 'keyContextMenu', cols: 1, text: 'Ctx Menu' },
                    { key: 'keyRightCtrl', cols: 1, text: 'RCtrl' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: '', cols: 1, text: '' },
                    { key: 'keyLeft', cols: 1, text: 'Left' },
                    { key: 'keyDown', cols: 1, text: 'Down' },
                    { key: 'keyRight', cols: 1, text: 'Right' },
                    { key: 'keyNum0', cols: 1, text: '0' },
                    { key: 'keyNumComma', cols: 1, text: ',' },
                    { key: '', cols: 1, text: '' }
                ]
            ];
        }
    }
})();