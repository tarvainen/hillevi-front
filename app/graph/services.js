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
            getColumns: getColumns
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
                    name: 'LINE_CHART'
                },
                {
                    id: 1,
                    name: 'PIE_CHART'
                },
                {
                    id: 2,
                    name: 'BAR_CHART'
                }
            ]
        }
        
        function getColumns () {
            return api.route('graph/columns/all');
        }
    }

})();