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
        .directive('dateTimeInput', DateTimeInput)
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
                require: '@',
                collection: '='
            },
            templateUrl: 'web/templates/filters/generic-filter.html',
            controller: 'GenericFilterController',
            controllerAs: 'vm',
            bindToController: true
        };
    }

    /**
     * Directive for the custom date time input controller.
     *
     * @returns {*}
     *
     * @constructor
     */
    function DateTimeInput () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                label: '@',
                id: '@',
                require: '@'
            },
            templateUrl: 'web/templates/filters/date-time-input.html',
            controller: 'DateTimeInputController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
    }

})();