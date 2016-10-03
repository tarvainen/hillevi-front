(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Directives', []);

    /**
     * Directive initializations.
     */
    angular.module('App.Directives')
        .directive('loader', loader)
    ;

    ////////////////////

    /**
     * Loader directive to be used where ever you need.
     *
     * @returns {*}
     */
    function loader () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/partials/loader.html'
        };
    }
})();