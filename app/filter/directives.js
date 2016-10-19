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
        .directive('dateTimeRangeInput', DateTimeRangeInput)
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

    /**
     * Directive for the custom date time range input.
     *
     * @returns {*}
     *
     * @constructor
     */
    function DateTimeRangeInput () {
        return {
            restrict: 'E',
            scope: {
                startDateTime: '=',
                endDateTime: '=',
                dateRangePreSelect: '='
            },
            templateUrl: 'web/templates/filters/date-time-range-input.html',
            controller: 'DateTimeRangeInputController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
    }

})();