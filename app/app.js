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

})();