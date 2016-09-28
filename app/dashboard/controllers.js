(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Dashboard.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Dashboard.Controllers')
        .controller('Dashboard.MainController', MainController)
        .controller('Dashboard.WidgetController', WidgetController)
    ;
    
    //////////////

    /**
     * Main controller for the dashboard application.
     *
     * @constructor
     */
    function MainController () {
        var vm = this;
    }

    WidgetController.$inject = ['$toast'];

    /**
     * The controller for the generic widget.
     *
     * @param {*}   $toast
     *
     * @constructor
     */
    function WidgetController ($toast) {
        var vm = this;

        /**
         * The refresh function for the widget.
         */
        vm.refresh = function refresh () {
            $toast('NOT_IMPLEMENTED');
        };

        /**
         * Opens the widget's settings.
         */
        vm.openSettings = function openSettings () {
            $toast('NOT_IMPLEMENTED');
        };
    }

})();