(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Config', ['ngRoute']);

    /**
     * Configure.
     */
    angular.module('App.Config')
        .config(config);

    /////////////////

    /**
     * The configure function.
     *
     * @ngInject
     *
     * @param $routeProvider
     */
    function config ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'web/templates/index.html'
            })
        ;
    }

})();