(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Keyboard.Load.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('Inspector.Keyboard.Load.Controllers')
        .controller('KeyboardLoadController', KeyboardLoadController)
    ;

    /////////////

    KeyboardLoadController.$inject = [
        'InspectorKeyboardDataService', 'KeyboardLoadFormatterService'
    ];

    /**
     * Controller for the keyboard load interface.
     *
     * @param {*} InspectorKeyboardDataService
     * @param {*} KeyboardLoadFormatterService
     *
     * @constructor
     */
    function KeyboardLoadController (
        InspectorKeyboardDataService, KeyboardLoadFormatterService
    ) {
        var vm = this;

        vm.layout = KeyboardLoadFormatterService.getLayout();

        /**
         * Load the data to the controller.
         */
        vm.load = function load () {
            vm.loading = true;
            vm.data = [];

            InspectorKeyboardDataService
                .getKeyboardLoad(angular.copy(vm.filters))
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Fired when the data is fetched.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.data = KeyboardLoadFormatterService.formatData(data.data);
            }

            /**
             * Fires always after the query.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }
})();