(function () {

    Array.prototype.remove = Array.prototype.remove || remove;
    Array.prototype.removeValue = Array.prototype.removeValue || removeValue;
    Array.prototype.first = Array.prototype.first || first;
    Array.prototype.last = Array.prototype.last || last;
    Array.fill = Array.fill || _fillArray;

    /**
     * Removes element from the given index.
     *
     * @param {Number}  index
     */
    function remove (index) {
        if (index > -1 && index < this.length) {
            this.splice(index, 1);
        }

        return this;
    }

    /**
     * Removes the value from the array using the Array.indexOf method to find it.
     *
     * @param  {*}  val
     *
     * @returns {*}
     */
    function removeValue (val) {
        var index = this.indexOf(val);

        return this.remove(index);
    }

    /**
     * Returns first x elements from the array.
     *
     * @param {Number} howMany
     *
     * @returns {ArrayBuffer|Array.<T>|Blob|string}
     */
    function first (howMany) {
        return this.slice(0, howMany || 1);
    }

    /**
     * Returns last x elements from the array.
     *
     * @param {Number} howMany
     *
     * @returns {ArrayBuffer|Array.<T>|Blob|string}
     */
    function last (howMany) {
        return this.slice(this.length - (howMany || 1), this.length);
    }

    /**
     * Creates an array the length of len and containing values defined by content.
     *
     * @param {Number} len
     * @param {string} content
     *
     * @returns {Array}
     * @private
     */
    function _fillArray (len, content) {
        var res = [];

        len.times(function () {
            res.push(content);
        });

        return res;
    }

    Number.prototype.pad = Number.prototype.pad || _padNumberToFixedLength;
    Number.prototype.times = Number.prototype.times || _eachTimesX;

    /**
     * Pads a number to a fixed length. For example var n = 3; n.pad(2) => '02'.
     *
     * @param {Number} len
     * @param {string} char
     *
     * @returns {string}
     * @private
     */
    function _padNumberToFixedLength (len, char) {
        var str = this.toString();

        len = len || str.length;
        char = char || '0';

        return Array.fill(len - str.length, char).join('') + str;
    }

    /**
     * Loops a callable function such many times that the number says.
     *
     * @param {Function} callable
     *
     * @returns {boolean}
     * @private
     */
    function _eachTimesX (callable) {
        if (!callable) {
            return false;
        }

        for (var i = 0; i < this; i++) {
            callable();
        }
    }

})();