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

    AppController.$inject = ['$rootScope'];

    /**
     * Main controller for the whole application.
     *
     * @param   {*} $rootScope
     *
     * @constructor
     * 
     * @ngInject
     */
    function AppController ($rootScope) {
        var vm = this;

        $rootScope.$on('authChanged', function (oldVal, newVal) {
            // TODO: do something with this info
        });
    }

})();