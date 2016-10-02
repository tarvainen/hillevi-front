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

    /**
     * Controller for the danger zone settings dialog.
     *
     * @constructor
     */
    function DangerZoneController () {
        var vm = this;
    }

})();