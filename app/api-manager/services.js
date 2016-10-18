(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiManager.Services', []);

    /**
     * Service initializations.
     */
    angular.module('ApiManager.Services')
        .factory('ApiManagerDataService', ApiManagerDataService)
    ;

    //////////////

    ApiManagerDataService.$inject = ['api'];

    /**
     * Data service for the api manager.
     *
     * @param {*} api
     *
     * @constructor
     */
    function ApiManagerDataService (api) {
        return {
            getInterfaces: getInterfaces,
            getFieldTypes: getFieldTypes,
            getApiTypes: getApiTypes,
            saveApi: saveApi,
            removeApi: removeApi,
            create: create
        };

        /**
         * Returns a list of user's interfaces.
         *
         * @returns {*}
         */
        function getInterfaces () {
            return api.route('interface/all');
        }

        /**
         * Returns api field types.
         *
         * @returns {*}
         */
        function getFieldTypes () {
            return api.route('interface/fields/types');
        }


        /**
         * Returns api types.
         *
         * @returns {*}
         */
        function getApiTypes () {
            return api.route('interface/types');
        }

        /**
         * Saves the api.
         *
         * @param {*} params
         *
         * @returns {*}
         */
        function saveApi (params) {
            return api.route('interface/update', params);
        }

        /**
         * Remove an api by id
         *
         * @param {Number} apiId
         *
         * @returns {*}
         */
        function removeApi (apiId) {
            return api.route('interface/delete/' + apiId);
        }

        /**
         * Create an api.
         *
         * @param params
         *
         * @returns {*}
         */
        function create (params) {
            return api.route('interface/create', params);
        }
    }

})();