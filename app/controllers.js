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

})();