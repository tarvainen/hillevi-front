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
        .controller('AppSettingsAddUserDialogController', AppSettingsAddUserDialogController)
    ;

    ///////////////

    AppSettingsUsersMainController.$inject = ['AppSettingsDataService', '$dialog', '$location'];

    /**
     * Main controller for this app.
     *
     * @param {*} AppSettingsDataService
     * @param {*} $dialog
     * @param {*} $location
     *
     * @constructor
     */
    function AppSettingsUsersMainController (AppSettingsDataService, $dialog, $location) {
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

        /**
         * Open user creation dialog.
         */
        vm.addUser = function addUser () {
            $dialog({
                controller: 'AppSettingsAddUserDialogController',
                template: 'web/templates/appsettings/users/partials/create-user-dialog.html',
                locals: {
                    users: vm.users
                }
            }).then(vm.load);
        };

        /**
         * Open the user form.
         *
         * @param  {number} id
         */
        vm.openUserForm = function openUserForm (id) {
            $location.path('/appsettings/users/edit/' + id);
        };

        // Initiate the data
        vm.load();
    }

    AppSettingsAddUserDialogController.$inject = ['AppSettingsDataService'];

    /**
     * Controller for the user creation dialog.
     *
     * @param {*} AppSettingsDataService
     *
     * @constructor
     */
    function AppSettingsAddUserDialogController (AppSettingsDataService) {
        var vm = this;

        /**
         * Save handler for the dialog.
         *
         * @returns {*}
         */
        vm.onSave = function onSave () {
            return AppSettingsDataService
                .saveUser(angular.copy(vm.user))
            ;
        };
    }

})();