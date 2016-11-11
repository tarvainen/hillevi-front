(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('AppSettings.Users.Edit.Controllers', []);

    /**
     * Controller definitions.
     */
    angular.module('AppSettings.Users.Edit.Controllers')
        .controller('AppSettingsUsersEditMainController', AppSettingsUsersEditMainController)
    ;

    /////////////////

    AppSettingsUsersEditMainController.$inject = ['AppSettingsDataService', '$routeParams', '$window'];

    /**
     * Main controller for this module.
     *
     * @param {*} AppSettingsDataService
     * @param {*} $routeParams
     * @param {*} $window
     *
     * @constructor
     */
    function AppSettingsUsersEditMainController (AppSettingsDataService, $routeParams, $window) {
        var vm = this;

        /**
         * Load the data to the interface.
         */
        vm.load = function load () {
            vm.loading = true;

            AppSettingsDataService
                .getUsers($routeParams.userId)
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.user = data.data;
            }

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Save the user settings.
         */
        vm.save = function save () {
            vm.loading = true;

            AppSettingsDataService
                .saveUser(angular.copy(vm.user))
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Success handler.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.user = data.data;
            }

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Delete the user.
         */
        vm.delete = function () {
            vm.loading = true;

            AppSettingsDataService
                .deleteUser(vm.user.id)
                .then(vm.back)
                .finally(onDone)
            ;

            /**
             * Do finally.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Cancel the operation.
         */
        vm.back = function back () {
            $window.history.back();
        };

        vm.load();
    }

})();