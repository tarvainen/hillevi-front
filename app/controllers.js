(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('App.Controllers')
        .controller('AppController', AppController)
        .controller('DateTimePickerPopupController', DateTimePickerPopupController)
        .controller('DialogBaseController', DialogBaseController)
    ;

    ///////////////

    AppController.$inject = [
        '$rootScope', 'DataService', 'JWTService', '$timeout', '$location', '$websocket', 'WS', '$toast'
    ];

    /**
     * Main controller for the whole application.
     *
     * @param   {*} $rootScope
     * @param   {*} DataService
     * @param   {*} JWTService
     * @param   {*} $timeout
     * @param   {*} $location
     * @param   {*} $websocket
     * @param   {*} WS
     * @param   {*} $toast
     *
     * @constructor
     * 
     * @ngInject
     */
    function AppController ($rootScope, DataService, JWTService, $timeout, $location, $websocket, WS, $toast) {
        var vm = this;

        vm.user = DataService.storage.get('user');
        var socket;
        vm.connected = false;

        /**
         * Watch authentication status changes.
         */
        $rootScope.$on('authChanged', function (oldVal, newVal) {
            vm.user = JWTService.parse(newVal);
            DataService.storage.set('user', vm.user);
            DataService.storage.set('jwt', newVal);

            vm.connectSocket();
        });

        $rootScope.$on('userUpdate', function (oldVal, newVal) {
            $timeout(function timeout () {
                vm.user = newVal;
            });
        });

        /**
         * Catch the load begin event and show the loading indicator.
         */
        $rootScope.$on('loadBegin', function () {
            vm.loading = true;
        });

        /**
         * Catch the load end event and hide the loader.
         */
        $rootScope.$on('loadEnd', function () {
            vm.loading = false;
        });

        /**
         * Logs the user out. Clears the session by removing the jwt from
         * the local storage. Also clears all the user data saved to the storage.
         */
        vm.logout = function logout () {
            DataService.get('auth/logout')
                .then($timeout(onSuccess))
            ;

            /**
             * Called when the logout is done.
             */
            function onSuccess () {
                vm.user = null;
                DataService.storage.set('user', null);
                DataService.storage.set('jwt', null);

                $location.path('/login');
            }
        };

        /**
         * Initialize the web socket events.
         */
        vm.initSocketEvents = function initSocketEvents () {
            socket.onMessage(onMessage);
            socket.onError(onError);
            socket.onClose(onClose);

            /**
             * Called when a new message is fetched.
             *
             * @param {*} message
             */
            function onMessage (message) {
                vm.connected = true;
                message = JSON.parse(message.data);
                $toast(message.tag);
            }

            /**
             * Called when the web socket fails in some way.
             */
            function onError () {
                $toast('REALTIME_CONNECTION_FAILED_TO_OPEN');
            }

            /**
             * Called when the socket connection is closed.
             */
            function onClose () {
                $toast('REALTIME_CONNECTION_CLOSED');
                vm.connected = false;
            }
        };

        /**
         * Connects the web socket.
         */
        vm.connectSocket = function connectSocket () {
            socket = $websocket(WS.url);

            vm.initSocketEvents();

            if (vm.user) {
                vm.authSocket();
            }
        };

        /**
         * Toggles the socket connection.
         */
        vm.toggleSocket = function toggleSocket() {
            if (vm.connected) {
                socket.close();
            } else {
                vm.connectSocket();
            }
        };

        /**
         * Sends the authentication data to the
         */
        vm.authSocket = function authSocket () {
            var jwt = DataService.storage.get('jwt');
            socket.send(DataService.storage.get('jwt'));
        };

        vm.connectSocket();
    }

    DateTimePickerPopupController.$inject = ['$mdDialog', 'locals'];

    /**
     * Controller for the date time picker popup dialog.
     *
     * @param {*}    $mdDialog
     * @param {*}    locals
     *
     * @constructor
     */
    function DateTimePickerPopupController ($mdDialog, locals) {
        var vm = this;

        vm.model = locals.date || new Date();

        /**
         * Cancel the dialog.
         */
        vm.cancel = function cancel () {
            $mdDialog.cancel();
        };

        /**
         * Save the dialog and close it.
         */
        vm.save = function save () {
            $mdDialog.hide(vm.model);
        };
    }

    DialogBaseController.$inject = ['$mdDialog'];

    /**
     * Controller for the dialog base directive.
     *
     * @param {*}   $mdDialog
     *
     * @constructor
     */
    function DialogBaseController ($mdDialog) {
        var vm = this;

        /**
         * Cancel the dialog.
         */
        vm.cancel = function cancel () {
            if (vm.onCancel instanceof Function) {
                vm.onCancel();
            }

            $mdDialog.cancel();
        };

        /**
         * Save the data and close the dialog.
         */
        vm.save = function save () {
            if (vm.onSave instanceof Function) {
                var result = vm.onSave();
            }

            if (result.then) {
                result.then(onResolve);
            } else if (result !== false) {
                onResolve();
            }

            function onResolve () {
                $mdDialog.hide();
            }
        };
    }

})();