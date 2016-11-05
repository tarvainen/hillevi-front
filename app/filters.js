(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Filters', []);

    /**
     * Filter initializations.
     */
    angular.module('App.Filters')
        .filter('apiDate', apiDate)
        .filter('countdown', _countdown)
    ;

    /////////////

    /**
     * Converts the datetime from the API to the mode Angular friendly format.
     *
     * @returns {*}
     */
    function apiDate () {
        return function (input) {
            return new Date(input.date);
        };
    }

    /**
     * Converts the input (in seconds) to the countdown format like '4min 14s'
     *
     * @return {Function}
     *
     * @private
     */
    function _countdown () {
        function c (input) {
            var date = new Date().setTime(Date.now() + parseInt(input) * 1000);
            return countdown(date).toString();
        }

        return c;
    }
})();