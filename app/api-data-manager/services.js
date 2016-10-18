(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiDataManager.Services', []);

    /**
     * Service initializations.
     */
    angular.module('ApiDataManager.Services')
        .factory('ApiDataManagerDataService', ApiDataManagerDataService)
    ;

    //////////////

    ApiDataManagerDataService.$inject = ['api'];

    /**
     * Data service for the api manager interface.
     *
     * @param  {*} api
     *
     * @returns {*}
     *
     * @constructor
     */
    function ApiDataManagerDataService (api) {
        return {
            getInterfaces: getInterfaces,
            getData: getData,
            getSchema: getSchema,
            remove: remove,
            saveApiDataRow: saveApiDataRow
        };

        /**
         * Get list of interfaces.
         *
         * @returns {*}
         */
        function getInterfaces () {
            return api.route('interface/all');
        }

        /**
         * Get data.
         *
         * @param  {*} params
         *
         * @returns {*}
         */
        function getData (params) {
            return api.route('interface/data', params);
        }

        /**
         * Get schema.
         *
         * @param {*} params
         *
         * @returns {*}
         */
        function getSchema (params) {
            return api.route('interface/schema', params);
        }

        /**
         * Remove api's data.
         *
         * @param {*} params
         *
         * @returns {*}
         */
        function remove (params) {
            return api.route('interface/data/rows/remove', params);
        }

        /**
         * Saves new row for the api.
         *
         * @param {*} row
         *
         * @returns {*}
         */
        function saveApiDataRow (row) {
            return api.route('interface/data/rows/add', row);
        }
    }

})();