(function () {
    'use strict';

    angular.module('Inspector.Keyboard.Services', []);

    angular.module('Inspector.Keyboard.Services')
        .factory('InspectorKeyboardDataService', InspectorKeyboardDataService)
    ;

    ////////////////

    InspectorKeyboardDataService.$inject = ['api'];

    /**
     * The data service for the inspector keyboard interface.
     *
     * @param {*} api
     *
     * @returns {*}
     *
     * @constructor
     */
    function InspectorKeyboardDataService (api) {
        var baseUrl = 'inspector/keyboard/';

        return {
            getSummaryData: getSummaryData
        };

        /**
         * Fetch the summary data.
         *
         * @param {*} filters
         *
         * @returns {*}
         */
        function getSummaryData (filters) {
            return api.route(baseUrl + 'summary', filters);
        }
    }

})();