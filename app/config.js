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
     * @param {*}   $routeProvider
     * @param {*}   $httpProvider
     * @param {*}   $translateProvider
     */
    function config ($routeProvider, $httpProvider, $translateProvider) {

        // Define routes
        $routeProvider
            .when('/', {
                templateUrl: 'web/templates/index.html'
            })
            .when('/login', {
                templateUrl: 'web/templates/login'
            })
        ;

        $translateProvider.useStaticFilesLoader({
            prefix: 'web/translations/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('fi');
        $translateProvider.useSanitizeValueStrategy(false);

        interceptor.$inject = ['$rootScope', '$q', '$location'];

        /**
         * Catch the global 401 error and redirect to the login.
         *
         * @ngInject
         *
         * @param   {*} $rootScope
         * @param   {*} $q
         * @param   {*} $location
         *
         * @returns {*}
         */
        function interceptor ($rootScope, $q, $location) {
            return {
                responseError: function (rej) {
                    if (rej.status === 401) {
                        $location.path('/login');
                        return $q.reject(rej);
                    }
                }
            };
        }

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(interceptor);
    }

})();