(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Env', []);

    /**
     * Constant inits.
     */
    angular.module('App.Env')
        .constant('API', {
            url: 'http://localhost:8000/api/'
        })
        .constant('WS', {
            url: 'ws://localhost:8080/'
        })
    ;

})();