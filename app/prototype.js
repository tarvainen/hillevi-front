(function () {

    Array.prototype.remove = Array.prototype.remove || remove;
    Array.prototype.removeValue = Array.prototype.removeValue || removeValue;
    Array.prototype.first = Array.prototype.first || first;
    Array.prototype.last = Array.prototype.last || last;

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

})();