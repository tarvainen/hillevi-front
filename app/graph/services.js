(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Graph.Services', []);

    /**
     * Service initializations.
     */
    angular.module('Graph.Services')
        .factory('GraphDataService', GraphDataService)
    ;

    //////////////////

    GraphDataService.$inject = ['api'];

    /**
     * Graph data service for graphs.
     *
     * @returns {*}
     *
     * @constructor
     */
    function GraphDataService (api) {
        return {
            getColumns: getColumns,
            getData: getData,
            saveSettings: saveSettings,
            getSavedSettings: getSavedSettings,
            removeSavedSettings: removeSavedSetting
        };

        /**
         * Fetches the available columns for the data fetch.
         *
         * @returns {*}
         */
        function getColumns () {
            return api.route('graph/columns/all');
        }

        /**
         * Fetch data for the graph.
         *
         * @param {*}   settings
         *
         * @returns {*}
         */
        function getData (settings) {
            return api.route('graph/data', settings);
        }

        /**
         * Save the search settings.
         *
         * @param {*}   settings
         *
         * @returns {*}
         */
        function saveSettings (settings) {
            return api.route('settings/search/trend/save', settings);
        }

        /**
         * Returns the saved settings.
         *
         * @returns {*}
         */
        function getSavedSettings () {
            return api.route('settings/search/trend');
        }

        /**
         * Remove saved settings.
         *
         * @param {*} params
         *
         * @returns {*}
         */
        function removeSavedSetting (params) {
            return api.route('settings/search/trend/delete', params);
        }
    }

})();