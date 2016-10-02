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
    ;

    /////////////

    /**
     * Converts the datetime from the API to the mode Angular friendly format.

     * @returns {*}
     */
    function apiDate () {
        return function (input) {
            return new Date(input.date);
        };
    }
})();