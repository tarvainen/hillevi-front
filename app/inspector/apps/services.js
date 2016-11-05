(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Apps.Services', []);

    /**
     * Service initializations.
     */
    angular.module('Inspector.Apps.Services')
        .factory('InspectorAppsDataService', InspectorAppsDataService)
    ;
    
    //////////////

    InspectorAppsDataService.$inject = ['api'];

    /**
     * Data service for the inspector apps interface.
     *
     * @constructor
     */
    function InspectorAppsDataService (api) {
        var baseRoute = 'inspector/apps/';

        return {
            getData: getData,
            getUsagePerTime: getUsagePerTime
        };

        /**
         * Function for fetching data for the interface.
         *
         * @param  {*} filters
         *
         * @returns {*}
         */
        function getData (filters) {
            return api.route(baseRoute + 'all', filters);
        }

        /**
         * Returns the usage per time data.
         *
         * @param  {*} filters
         *
         * @returns {*}
         */
        function getUsagePerTime (filters) {
            return api.route(baseRoute + 'usage-per-time', filters);
        }
    }
})();