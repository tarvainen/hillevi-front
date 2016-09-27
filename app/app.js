(function () {
    'use strict';

    /**
     * Main module initialization.
     *
     * @ngInject
     */
    angular.module('App', [
        'ngMaterial',
        'App.Config',
        'App.Controllers',
        'App.Services',
        'App.Env',
        'LoginApp'
    ]);

    angular.module('App').run(run);

    //////////////////

    /**
     * Define the location change callback.
     *
     * @param {*}   $http
     * @param {*}   API
     * @param {*}   DataService
     */
    function run ($http, API, DataService) {
        $http.defaults.headers.authorization = DataService.storage.get('jwt');
        $http.get(API.url + 'auth/me');
    }

})();