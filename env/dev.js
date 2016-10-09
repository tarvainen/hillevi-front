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
            url: 'http://192.168.8.109:8000/api/'
        })
        .constant('WS', {
            url: 'ws://192.168.8.109:8080/'
        })
    ;

})();