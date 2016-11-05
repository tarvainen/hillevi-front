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
        return {
            getData: getData
        };

        /**
         * Function for fetching data for the interface.
         *
         * @param  {*} filters
         *
         * @returns {*}
         */
        function getData (filters) {
            return api.route('inspector/apps/all', filters);
        }
    }
})();