(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Settings.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Settings.Controllers')
        .controller('Settings.UserSettingsController', UserSettingsController)
        .controller('Settings.DangerZoneController', DangerZoneController)
        .controller('Settings.AppSettingsController', AppSettingsController)
    ;

    ///////////////

    UserSettingsController.$inject = ['$scope', '$timeout', '$toast', 'api'];

    /**
     * The controller for the user settings.
     *
     * @param {*}   $scope
     * @param {*}   $timeout
     * @param {*}   $toast
     * @param {*}   api

     * @constructor
     */
    function UserSettingsController ($scope, $timeout, $toast, api) {
        var vm = this;

        vm.loading = false;

        /**
         * Loads the user settings for the interface.
         */
        vm.load = function load () {
            vm.loading = true;

            api.route('auth/settings').then(onSuccess, onError);

            /**
             * Fired when the data fetch is done successfully.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                $timeout(function timeout () {
                    vm.form = data.data;
                    vm.loading = false;
                });
            }

            /**
             * Fired on the data fetch error.
             *
             * @param {*}   err
             */
            function onError (err) {
                $toast('DATA_FETCH_FAILED');
            }
        };

        /**
         * Saves the user data to the server.
         */
        vm.save = function save () {
            api.route('auth/settings/save', vm.form).then(onSuccess, onError);

            /**
             * Fired when the data save is done successfully.
             */
            function onSuccess (data) {
                $scope.$emit('userUpdate', data.data);
                $toast('SAVE_SUCCESSFULL');
            }

            /**
             * Fired when the save fails.
             */
            function onError () {
                $toast('SAVE_FAILED');
            }
        };
    }

    DangerZoneController.$inject = ['api', '$toast'];

    /**
     * Controller for the danger zone settings dialog.
     *
     * @param {*}   api
     * @param {*}   $toast
     *
     * @constructor
     */
    function DangerZoneController (api, $toast) {
        var vm = this;

        vm.form = {};

        /**
         * Does the actual password saving operation.
         */
        vm.save = function save () {
            vm.loading = true;

            if (!vm.validate()) {
                $toast('PASSWORD_VALIDATION_FAILED');
                vm.loading = false;
                return;
            }

            vm.checkPassword()
                .then(onPasswordCheck, onPasswordFail);

            /**
             * Runs when the old password is validated to be right.
             */
            function onPasswordCheck () {
                api.route('auth/settings/password/change', vm.form)
                    .then(onSuccess, onError);

                /**
                 * Runs when the password is successfully changed.
                 */
                function onSuccess () {
                    $toast('PASSWORD_CHANGED');
                    vm.loading = false;
                    vm.form = {};
                }

                /**
                 * Runs when the password change fails for some reason.
                 */
                function onError () {
                    vm.loading = false;
                    $toast('PASSWORD_CHANGE_FAILED');
                }
            }

            /**
             * Runs when the old password does not match with the one saved in the database.
             */
            function onPasswordFail () {
                vm.loading = false;
                $toast('OLD_PASSWORD_DOES_NOT_MATCH');
            }
        };

        vm.checkPassword = function checkPassword () {
            return api.route('auth/settings/password/check', {
                'password': vm.form.oldPassword
            });
        };

        /**
         * Validates the user's new password.
         *
         * @returns {*|boolean}
         */
        vm.validate = function validate () {
            return vm.form.oldPassword
                && vm.form.newPassword
                && vm.form.newPasswordAgain === vm.form.newPassword;
        };
    }

    AppSettingsController.$inject = ['api', '$toast'];

    /**
     * Controller for the app settings card.
     *
     * @param {*}   api
     * @param {*}   $toast
     *
     * @constructor
     */
    function AppSettingsController (api, $toast) {
        var vm = this;

        /**
         * Loads the settings data from the server.
         */
        vm.load = function load () {
            api.route('settings/all').then(onSuccess, onError);

            /**
             * Called when the settings data array is loaded.
             *
             * @param   {*}  data
             */
            function onSuccess (data) {
                vm.form = data.data;
            }

            /**
             * Called when the data fetch fails.
             */
            function onError () {
                $toast('DATA_FETCH_FAILED');
            }
        };

        /**
         * Saves the app settings.
         */
        vm.save = function save () {
            vm.loading = true;

            api.route('settings/save', vm.form)
                .then(onSuccess, onError)
                .finally(onDone);

            /**
             * Called when the app settings is saved successfully.
             */
            function onSuccess () {
                $toast('SAVE_SUCCESSFULL');
            }

            /**
             * Called when the app settings save fails.
             */
            function onError () {
                $toast('SAVE_FAILED');
            }

            /**
             * Called every time the request is gone to it's end.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();