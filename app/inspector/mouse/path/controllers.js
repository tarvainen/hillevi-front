(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Mouse.Path.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('Inspector.Mouse.Path.Controllers')
        .controller('InspectorMousePathMainController', InspectorMousePathMainController)
    ;

    //////////////

    InspectorMousePathMainController.$inject = ['InspectorMouseDataService'];

    /**
     * Main controller for the mouse path interface.
     *
     * @param {*} InspectorMouseDataService
     *
     * @constructor
     */
    function InspectorMousePathMainController (InspectorMouseDataService) {
        var vm = this;

        /**
         * Load the data for the interface.
         */
        vm.load = function load () {
            vm.loading = true;
            vm.image = null;

            InspectorMouseDataService
                .getMousePath(angular.copy(vm.filters))
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Called when the data is fetched.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.image = data.data;
            }

            /**
             * Called after the query is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();