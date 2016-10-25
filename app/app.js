(function () {
    'use strict';

    /**
     * Main module initialization.
     *
     * @ngInject
     */
    angular.module('App', [
        'ngMaterial',
        'md.data.table',
        'ngWebSocket',
        'pascalprecht.translate',
        'chart.js',
        'angular-md5',
        'ngMaterialSidemenu',
        'App.Config',
        'App.Controllers',
        'App.Services',
        'App.Filters',
        'App.Directives',
        'App.Env',
        'Hillevi.Applications'
    ]);

    angular.module('App').run(run);

    //////////////////

    /**
     * Define the location change callback.
     *
     * @param {*}   $rootScope
     * @param {*}   $location
     * @param {*}   $http
     * @param {*}   DataService
     * @param {*}   api
     */
    function run ($rootScope, $location, $http, DataService, api) {
        api.route('auth/me').then(onData, onError);

        // Check the local storage for jwt every
        $rootScope.$on('$locationChangeStart', function (){
            api.route('auth/me').then(onData);
        });

        function onData (data) {
            DataService.storage.set('user', data.data);
            $rootScope.$emit('userUpdate', data.data);
        }

        function onError (err) {
            DataService.storage.set('user', null);
        }
    }
})();