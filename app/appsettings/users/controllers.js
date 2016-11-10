(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('AppSettings.Users.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('AppSettings.Users.Controllers')
        .controller('AppSettingsUsersMainController', AppSettingsUsersMainController)
    ;

    ///////////////

    AppSettingsUsersMainController.$inject = ['AppSettingsDataService'];

    /**
     * Main controller for this app.
     *
     * @param {*} AppSettingsDataService
     *
     * @constructor
     */
    function AppSettingsUsersMainController (AppSettingsDataService) {
        var vm = this;

        /**
         * Load the data for the interface.
         */
        vm.load = function load () {
            vm.loading = true;

            // Fetch all users
            AppSettingsDataService.getUsers()
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.users = data.data;
            }

            /**
             * Shut down the loader.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        // Initiate the data
        vm.load();
    }

})();