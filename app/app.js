(function () {
    'use strict';

    /**
     * Main module initialization.
     *
     * @ngInject
     */
    angular.module('App', [
        'ngMaterial',
        'pascalprecht.translate',
        'chart.js',
        'angular-md5',
        'ngMaterialSidemenu',
        'App.Config',
        'App.Controllers',
        'App.Services',
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
     */
    function run ($rootScope, $location, $http, DataService) {
        DataService.get('auth/me').then(onData, onError);

        // Check the local storage for jwt every
        $rootScope.$on('$locationChangeStart', function (){
            DataService.get('auth/me').then(onData);
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