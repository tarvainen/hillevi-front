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

    AppController.$inject = ['$rootScope', 'DataService', 'JWTService'];

    /**
     * Main controller for the whole application.
     *
     * @param   {*} $rootScope
     * @param   {*} DataService
     * @param   {*} JWTService
     *
     * @constructor
     * 
     * @ngInject
     */
    function AppController ($rootScope, DataService, JWTService) {
        var vm = this;

        vm.jwt = {};

        /**
         * Watch authentication status changes.
         */
        $rootScope.$on('authChanged', function (oldVal, newVal) {
            vm.jwt = JWTService.parse(newVal.msg);

            DataService.storage.set('jwt', vm.jwt);
        });
    }

})();