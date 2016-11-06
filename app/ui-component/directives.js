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

})();