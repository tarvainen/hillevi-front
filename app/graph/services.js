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
            getGraphTypes: getGraphTypes,
            getColumns: getColumns,
            getData: getData
        };

        /**
         * Returns graph types.
         *
         * @returns {*}
         */
        function getGraphTypes () {
            return [
                {
                    id: 0,
                    name: 'LINE_CHART',
                    type: 'line'
                },
                {
                    id: 1,
                    name: 'PIE_CHART',
                    type: 'pie'
                },
                {
                    id: 2,
                    name: 'BAR_CHART',
                    type: 'bar'
                }
            ]
        }

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
    }

})();