(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('AppSettings.Permissions.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('AppSettings.Permissions.Controllers')
        .controller('AppSettingsPermissionsMainController', AppSettingsPermissionsMainController)
    ;

    /////////////

    AppSettingsPermissionsMainController.$inject = ['AppSettingsDataService'];

    /**
     * Main controller for this module.
     *
     * @param {*} AppSettingsDataService
     *
     * @constructor
     */
    function AppSettingsPermissionsMainController (AppSettingsDataService) {
        var vm = this;

        vm.users = [];

        /**
         * Load the data to the interface.
         */
        vm.load = function load () {
            vm.loading = true;
            vm.page = 1;
            vm.limit = 10;

            AppSettingsDataService
                .getPermissions()
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.permissions = data.data;
            }

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Get users permissions.
         */
        vm.getUsersPermissions = function getUsersPermissions () {
            AppSettingsDataService
                .getUsersPermissions(angular.copy(vm.selectedUsers))
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.usersPermissions = data.data;
            }

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Save the data.
         */
        vm.save = function save () {
            // TODO: implement
        };

        vm.load();
    }

})();