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
    ;

    ///////////////

    UserSettingsController.$inject = ['$timeout', '$toast', 'api'];

    /**
     * The controller for the user settings.
     *
     * @param {*}   $timeout
     * @param {*}   $toast
     * @param {*}   api

     * @constructor
     */
    function UserSettingsController ($timeout, $toast, api) {
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
            function onSuccess () {
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

})();