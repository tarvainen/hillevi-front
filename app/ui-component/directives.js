(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('UiComponent.Directives', []);

    /**
     * Directive definitions.
     */
    angular.module('UiComponent.Directives')
        .directive('simpleCard', SimpleCard)
        .directive('transcludeCard', TranscludeCard)
        .directive('progressCard', ProgressCard)
        .directive('chartCard', ChartCard)
    ;

    /////////////

    /**
     * Directive for the simple card ui component.
     *
     * @returns {*}
     *
     * @constructor
     */
    function SimpleCard () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/ui-component/cards/simple-card.html',
            controller: 'SimpleCardController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                model: '=',
                title: '@',
                unit: '@',
                info: '@'
            },
            replace: true
        };
    }

    /**
     * Directive for the transclude card ui component.
     *
     * @returns {*}
     *
     * @constructor
     */
    function TranscludeCard () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/ui-component/cards/transclude-card.html',
            controller: 'TranscludeCardController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                title: '@',
                info: '@'
            },
            replace: true,
            transclude: true
        };
    }

    /**
     * Directive for the progress card ui component.
     *
     * @returns {*}
     *
     * @constructor
     */
    function ProgressCard () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/ui-component/cards/progress-card.html',
            controller: 'ProgressCardController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                title: '@',
                model: '=',
                unit: '@',
                url: '@',
                param: '@',
                info: '@'
            },
            replace: true
        };
    }

    /**
     * Directive for the chart card ui component.
     *
     * @returns {*}
     *
     * @constructor
     */
    function ChartCard () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/ui-component/cards/chart-card.html',
            controller: 'ChartCardController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                title: '@',
                model: '=',
                type: '=',
                url: '@',
                info: '@'
            },
            replace: true
        };
    }

})();