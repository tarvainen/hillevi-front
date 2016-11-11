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
            saveUser: saveUser,
            deleteUser: deleteUser
        };

        /**
         * Function to find all users or a single user.
         *
         * @param {number} [id]
         *
         * @returns {*}
         */
        function getUsers (id) {
            id = id || 0;

            return get('users/find/' + id);
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
         * Delete the user by id.
         *
         * @param {number} id
         *
         * @returns {*}
         */
        function deleteUser (id) {
            return get('users/delete/' + id);
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