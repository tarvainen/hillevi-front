(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Dashboard.Directives', []);

    /**
     * Directive initializations.
     */
    angular.module('Dashboard.Directives')
        .directive('widget', widget)
    ;
    
    //////////////////

    /**
     * The widget directive to do a simple generig widget base.
     *
     * @returns {*}
     */
    function widget () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/dashboard/partials/widget-base.html',
            transclude: true,
            scope: {
                title: '@'
            },
            controller: 'Dashboard.WidgetController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
    
})();