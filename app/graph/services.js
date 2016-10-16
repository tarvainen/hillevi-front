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
            getData: getData,
            getGraphScales: getGraphScales
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
         * Returns scaling options.
         *
         * @returns {*}
         */
        function getGraphScales () {
            return [
                {
                    id: 0,
                    name: 'SCALE_HOUR',
                    type: '%d.%m %k'
                },
                {
                    id: 1,
                    name: 'SCALE_DAY',
                    type: '%d.%m'
                },
                {
                    id: 2,
                    name: 'SCALE_WEEK',
                    type: '%x/%v'
                },
                {
                    id: 3,
                    name: 'SCALE_MONTH',
                    type: '%m/%Y'
                },
                {
                    id: 4,
                    name: 'SCALE_YEAR',
                    type: '%Y'
                }
            ];
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