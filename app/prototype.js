(function () {

    Array.prototype.remove = Array.prototype.remove || remove;
    Array.prototype.removeValue = Array.prototype.removeValue || removeValue;

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

})();