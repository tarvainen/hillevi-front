(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Services', []);

    /**
     * Service initializations.
     */
    angular.module('App.Services')
        .factory('HttpService', HttpService)
        .factory('DataService', DataService)
        .factory('api', api)
        .factory('JWTService', JWTService)
    ;

    ///////////////

    /**
     * The service to contain HTTP settings and functinalities.
     *
     * @returns {*}
     *
     * @constructor
     */
    function HttpService () {
        return {
            toUrlEncoded: toUrlEncoded
        };

        /**
         * Converts object to url encoded string.
         *
         * @param   {*}         obj
         *
         * @returns {string}
         */
        function toUrlEncoded (obj) {
            var str = [];

            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
                }
            }

            return str.join('&');
        }
    }

    DataService.$inject = ['$http', '$window', 'HttpService', 'API'];

    /**
     * The data service to handle the data requests.
     *
     * @param {*}   $http
     * @param {*}   $window
     * @param {*}   HttpService
     * @param {*}   API
     *
     * @return {*}
     *
     * @constructor
     *
     * @ngInject
     */
    function DataService ($http, $window, HttpService, API) {
        return {
            get: get,
            storage: {
                get: getFromStorage,
                set: setToStorage
            }
        };

        function get (path, params) {
            var options = {
                transformRequest: HttpService.toUrlEncoded,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

            return $http.post(API.url + path, params || {}, options);
        }

        /**
         * Returns an item from the local storage.
         *
         * @param   {string}    key
         */
        function getFromStorage (key) {
            return $window.localStorage.getItem(key);
        }

        /**
         * Sets the item to the local storage.
         *
         * @param   {string}    key
         * @param   {string}    value
         */
        function setToStorage (key, value) {
            return $window.localStorage.setItem(key, value);
        }
    }

    api.$inject = ['DataService'];

    /**
     * Wrapper service for the DataService.
     *
     * @param   {*} DataService
     *
     * @returns {*}
     */
    function api (DataService) {
        return {
            route: route
        };

        /**
         * Does a simple HTTP request to the route with the parameters.
         *
         * @param {string}  route
         * @param {*}       params
         *
         * @returns {*}
         */
        function route (route, params) {
            return DataService.get(route, params);
        }
    }

    JWTService.$inject = ['$window'];

    /**
     * Service to handle JWT objects.
     *
     * @param   {*} $window
     *
     * @returns {*}
     *
     * @constructor
     *
     * @ngInject
     */
    function JWTService ($window) {
        return {
            parse: parse
        };

        /**
         * Parses the jwt object from string.
         *
         * @param jwt
         */
        function parse (jwt) {
            var base64Url = jwt.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');

            return JSON.parse($window.atob(base64));
        }
    }

})();