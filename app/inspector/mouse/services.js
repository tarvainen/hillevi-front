(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Mouse.Services', []);

    /**
     * Service initializations.
     */
    angular.module('Inspector.Mouse.Services')
        .factory('InspectorMouseDataService', InspectorMouseDataService)
    ;

    /////////////////

    /**
     * Data service for the mouse inspection data.
     *
     * @param {*}  api
     *
     * @returns {*}
     *
     * @constructor
     */
    function InspectorMouseDataService (api) {
        var baseUrl = 'inspector/mouse/';

        return {
            getMousePath: getMousePath
        };

        /**
         * Fetch data for the mouse path view.
         *
         * @param  {*} filters
         *
         * @returns {*}
         */
        function getMousePath (filters) {
            return api.route(baseUrl + 'path', filters);
        }
    }

})();