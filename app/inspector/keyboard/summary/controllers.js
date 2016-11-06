(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Keyboard.Summary.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('Inspector.Keyboard.Summary.Controllers')
        .controller('KeyboardSummaryMainController', KeyboardSummaryMainController)
    ;

    ///////////

    KeyboardSummaryMainController.$inject = ['InspectorKeyboardDataService'];

    /**
     * Main controller for the keyboard summary interface.
     *
     * @constructor
     */
    function KeyboardSummaryMainController (InspectorKeyboardDataService) {
        var vm = this;

        vm.loading = false;
        vm.filters = {};

        /**
         * Load the data for the interface.
         */
        vm.load = function load () {
            vm.loading = true;

            InspectorKeyboardDataService
                .getSummaryData(angular.copy(vm.filters))
                .then(onSuccess)
                .finally(onDone);

            /**
             * Called after the data fetch is succeeded.
             *
             * @param {*}  data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called always when the data fetch is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();