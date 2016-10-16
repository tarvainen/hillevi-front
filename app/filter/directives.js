(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Filters.Directives', []);

    /**
     * Directive initializations.
     */
    angular.module('Filters.Directives')
        .directive('genericFilter', GenericFilter)
    ;

    ///////////////

    /**
     * A generic filter.
     *
     * @returns {*}
     *
     * @constructor
     */
    function GenericFilter () {
        return {
            restrict: 'E',
            scope: {
                action: '@',
                ngModel: '=',
                label: '@',
                id: '@',
                collection: '='
            },
            templateUrl: 'web/templates/filters/generic-filter.html',
            controller: 'GenericFilterController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

})();