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
        
        vm.data = [];

        // Hardcoded label just for test TODO: remove
        vm.labels = ['1', '2', '3', '4', '5', '6'];

        /**
         * Loader method for the widget.
         *
         * TODO: make more sense
         */
        vm.load = function load () {
            vm.data = [
                [1, 3, 2, 5, 3, 2],
                [2, 6, 7, 2, 4, 5]
            ];
        };

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

        vm.load();
    }

})();