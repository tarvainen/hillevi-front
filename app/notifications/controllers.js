(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Notifications.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Notifications.Controllers')
        .controller('Notifications.MainController', MainController)
    ;

    //////////////////////

    MainController.$inject = ['api', '$toast'];

    /**
     * The main controller for the notifications interface.
     *
     * @param {*}   api
     * @param {*}   $toast
     *
     * @constructor
     */
    function MainController (api, $toast) {
        var vm = this;

        /**
         * Loads the notification data.
         */
        vm.load = function load () {
            api.route('notifications/latest/10')
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Fired when the data is fetched from the server.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                angular.forEach(data.data, function (notification) {
                    notification.content = JSON.parse(notification.content);
                });

                vm.data = data.data;
            }
        };

        /**
         * Selects all the elements in the interface.
         */
        vm.selectAll = function selectAll () {
            vm.data.forEach(function (notification) {
                notification.selected = true;
            });
        };

        /**
         * Dismiss all the selected notifications. After the
         * operation we will fetch the data again.
         */
        vm.dismiss = function dismiss () {
            var selected = [];

            vm.data.forEach(function (notification) {
                if (notification.selected) {
                    selected.push(notification.id);
                }
            });

            if (selected.length <= 0) {
                return;
            }

            var params = {
                id: selected
            };

            api.route('notifications/dismiss', params)
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Fired when the notifications are successfully dismissed.
             */
            function onSuccess () {
                $toast('NOTIFICATIONS_DISMISSED_SUCCESSFULLY');

                vm.load();
            }
        };

        /**
         * The generic finally called method to close all loaders.
         */
        function onDone () {
            vm.loading = false;
        }
    }

})();