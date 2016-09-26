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

    DataService.$inject = ['$http', 'HttpService', 'API'];

    /**
     * The data service to handle the data requests.
     *
     * @param {*}   $http
     * @param {*}   HttpService
     *
     * @return {*}
     *
     * @constructor
     *
     * @ngInject
     */
    function DataService ($http, HttpService, API) {
        return {
            get: get
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

})();