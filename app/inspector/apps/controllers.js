(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Apps.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Inspector.Apps.Controllers')
        .controller('InspectorAppsMainController', MainController)
    ;

    //////////////

    MainController.$inject = ['InspectorAppsDataService'];

    /**
     * Main controller for the app view.
     *
     * @constructor
     */
    function MainController (InspectorAppsDataService) {
        var vm = this;

        vm.page = 1;
        vm.limit = 10;

        vm.filters = {
            startDate: new Date(),
            endDate: new Date()
        };

        /**
         * Load the interfaces data.
         */
        vm.load = function load () {
            vm.loader = InspectorAppsDataService.getData(
                angular.copy(vm.filters)
            );

            vm.loader.then(onSuccess);

            /**
             * Fires when the data is fetched successfully.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }
        };
    }

})();