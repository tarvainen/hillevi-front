(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Controllers', []);

    angular.module('App.Controllers')
        .controller('AppController', AppController)
    ;

    ///////////////

    AppController.$inject = ['$rootScope', 'DataService', 'JWTService', '$timeout', '$location'];

    /**
     * Main controller for the whole application.
     *
     * @param   {*} $rootScope
     * @param   {*} DataService
     * @param   {*} JWTService
     * @param   {*} $timeout
     * @param   {*} $location
     *
     * @constructor
     * 
     * @ngInject
     */
    function AppController ($rootScope, DataService, JWTService, $timeout, $location) {
        var vm = this;

        vm.user = DataService.storage.get('user');

        /**
         * Watch authentication status changes.
         */
        $rootScope.$on('authChanged', function (oldVal, newVal) {
            vm.user = JWTService.parse(newVal.msg);
            DataService.storage.set('user', vm.user);
            DataService.storage.set('jwt', newVal.msg);
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
    }

})();