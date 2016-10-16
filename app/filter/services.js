(function () {
    'use strict';

    angular.module('Filters.Services', []);

    angular.module('Filters.Services')
        .factory('FilterDataService', FilterDataService)
    ;

    //////////////

    FilterDataService.$inject = ['api', '$q', '$timeout'];

    /**
     * Data service for filters.
     *
     * @param {*} api
     * @param {*} $q
     * @param {*} $timeout
     *
     * @constructor
     */
    function FilterDataService (api, $q, $timeout) {
        return {
            getOptions: getOptions
        };

        /**
         * Generic function to fetch options from the filter controller.
         *
         * @param action
         *
         * @returns {*}
         */
        function getOptions (action) {
            return api.route(action);
        }
    }

})();