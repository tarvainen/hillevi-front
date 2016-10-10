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
     * @param {*}   ChartJsProvider
     */
    function config ($routeProvider, $httpProvider, $translateProvider, ChartJsProvider) {
        // Setup chart.js
        ChartJsProvider.setOptions({
            global: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Define routes
        $routeProvider
            .when('/', {
                templateUrl: 'web/templates/'
            })
            .when('/login', {
                templateUrl: 'web/templates/login/'
            })
            .when('/settings', {
                templateUrl: 'web/templates/settings/'
            })
            .when('/dashboard', {
                templateUrl: 'web/templates/dashboard/'
            })
            .when('/apis', {
                templateUrl: 'web/templates/api-manager/'
            })
            .when('/apidator', {
                templateUrl: 'web/templates/api-data-manager/'
            })
            .when('/notifications', {
                templateUrl: 'web/templates/notifications/'
            })
        ;

        $translateProvider.useStaticFilesLoader({
            prefix: 'build/translated/',
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
                request: function (req) {
                    $rootScope.$emit('loadBegin');
                    return req;
                },
                response: function (res) {
                    $rootScope.$emit('loadEnd');
                    return res;
                },
                responseError: function (rej) {
                    $rootScope.$emit('loadEnd');

                    if (rej.status === 401) {
                        $location.path('/login');
                        return $q.reject(rej);
                    }

                    return $q.reject(rej);
                }
            };
        }

        $httpProvider.defaults.withCredentials = true;
        $httpProvider.interceptors.push(interceptor);
    }

})();