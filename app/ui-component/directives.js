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
                unit: '@'
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
                title: '@'
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
                progress: '=',
                model: '=',
                unit: '@'
            },
            replace: true
        };
    }

})();