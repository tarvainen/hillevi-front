(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('AppSettings.Services', []);

    /**
     * Service definitions.
     */
    angular.module('AppSettings.Services')
        .factory('AppSettingsDataService', AppSettingsDataService)
    ;

    /////////////

    AppSettingsDataService.$inject = ['api'];

    /**
     * Data service for this module.
     *
     * @param {*} api
     *
     * @returns {*}
     *
     * @constructor
     */
    function AppSettingsDataService (api) {
        return {
            getUsers: getUsers,
            saveUser: saveUser
        };

        /**
         * Function to find all users.
         *
         * @returns {*}
         */
        function getUsers () {
            return get('users/find');
        }

        /**
         * Saves (updates or creates) a user.
         *
         * @param {*} user
         *
         * @returns {*}
         */
        function saveUser (user) {
            return get('users/save', user);
        }

        /**
         * Call the api route.
         *
         * @param {string} route
         * @param {*}      [params]
         * @returns {*}
         */
        function get (route, params) {
            var baseUrl = 'appsetting/';

            return api.route(baseUrl + route, params);
        }
    }
})();