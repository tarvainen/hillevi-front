(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Services', []);

    /**
     * Service initializations.
     */
    angular.module('App.Services')
        .factory('DataService', DataService)
        .factory('api', api)
        .factory('JWTService', JWTService)
        .factory('$toast', $toast)
        .factory('$confirm', $confirm)
        .factory('$prompt', $prompt)
        .factory('$dialog', $dialog)
    ;

    ///////////////

    DataService.$inject = ['$http', '$window', 'API', '$httpParamSerializerJQLike', '$filter'];

    /**
     * The data service to handle the data requests.
     *
     * @param {*}   $http
     * @param {*}   $window
     * @param {*}   API
     * @param {*}   $httpParamSerializerJQLike
     * @param {*}   $filter
     *
     * @return {*}
     *
     * @constructor
     *
     * @ngInject
     */
    function DataService ($http, $window, API, $httpParamSerializerJQLike, $filter) {
        return {
            get: get,
            storage: {
                get: getFromStorage,
                set: setToStorage
            }
        };

        function get (path, params) {
            var options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'authorization': getFromStorage('jwt') || ''
                }
            };

            angular.forEach(params, function convert (value, key) {
                if (value instanceof Date) {
                    params[key] = $filter('date')(value, 'd.M.yyyy HH:mm');
                }
            });

            return $http.post(API.url + path, $httpParamSerializerJQLike(params || {}), options);
        }

        /**
         * Returns an item from the local storage.
         *
         * @param   {string}    key
         */
        function getFromStorage (key) {
            try {
                return JSON.parse($window.localStorage.getItem(key));
            } catch (e) {
                return null;
            }
        }

        /**
         * Sets the item to the local storage.
         *
         * @param   {string}    key
         * @param   {string}    value
         */
        function setToStorage (key, value) {
            return $window.localStorage.setItem(key, JSON.stringify(value));
        }
    }

    api.$inject = ['DataService'];

    /**
     * Wrapper service for the DataService.
     *
     * @param   {*} DataService
     *
     * @returns {*}
     */
    function api (DataService) {
        return {
            route: route
        };

        /**
         * Does a simple HTTP request to the route with the parameters.
         *
         * @param {string}  route
         * @param {*}       params
         *
         * @returns {*}
         */
        function route (route, params) {
            return DataService.get(route, params);
        }
    }

    JWTService.$inject = ['$window'];

    /**
     * Service to handle JWT objects.
     *
     * @param   {*} $window
     *
     * @returns {*}
     *
     * @constructor
     *
     * @ngInject
     */
    function JWTService ($window) {
        return {
            parse: parse
        };

        /**
         * Parses the jwt object from string.
         *
         * @param jwt
         */
        function parse (jwt) {
            var base64Url = jwt.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');

            return JSON.parse($window.atob(base64));
        }
    }

    $toast.$inject = ['$mdToast', '$translate'];

    /**
     * The toast service for making toasts.
     *
     * @param   {*} $mdToast
     * @param   {*} $translate
     *
     * @returns {Function}
     */
    function $toast ($mdToast, $translate) {
        return function (text) {
            $translate(text).then(onTranslation);

            /**
             * Create the toast after the translation text is returned.
             *
             * @param {string}  translation
             */
            function onTranslation (translation) {
                $mdToast.show(
                    $mdToast
                        .simple()
                        .textContent(translation)
                        .hideDelay(3000)
                );
            }
        }
    }

    $confirm.inject = ['$mdDialog', '$translate', '$q'];

    /**
     * The confirm service for more fluent usage.
     *
     * @param   {*} $mdDialog
     * @param   {*} $translate
     * @param   {*} $q
     *
     * @returns {Function}
     */
    function $confirm ($mdDialog, $translate, $q) {
        return function (text) {
            var defer = $q.defer();

            $mdDialog.show(
                $mdDialog
                    .confirm()
                    .title($translate.instant(text))
                    .ok($translate.instant('OK'))
                    .cancel($translate.instant('CANCEL'))
            ).then(defer.resolve, defer.reject);

            return defer.promise;
        }
    }

    $prompt.inject = ['$mdDialog', '$translate', '$q'];

    /**
     * The prompt service for more fluent usage.
     *
     * @param   {*} $mdDialog
     * @param   {*} $translate
     * @param   {*} $q
     *
     * @returns {Function}
     */
    function $prompt ($mdDialog, $translate, $q) {
        return function (params) {
            params.title = params.title || 'TELL_ME';
            params.textContent = params.textContent || 'I_ASK_YOU_TELL';
            params.placeholder = params.placeholder || 'TYPE_IT_HERE';

            var defer = $q.defer();

            var confirm = $mdDialog.prompt()
                .title($translate.instant(params.title))
                .textContent($translate.instant(params.textContent))
                .placeholder($translate.instant(params.placeholder))
                .initialValue(params.value)
                .ariaLabel($translate.instant(params.placeholder))
                .ok($translate.instant('OK'))
                .cancel($translate.instant('CANCEL'));

            $mdDialog.show(confirm).then(defer.resolve, defer.reject);

            return defer.promise;
        }
    }

    $dialog.inject = ['$mdDialog', '$q'];

    /**
     * The dialog service for more fluent usage.
     *
     * @param   {*} $mdDialog
     * @param   {*} $q
     *
     * @returns {Function}
     */
    function $dialog ($mdDialog, $q) {
        return function (params) {
            var defer = $q.defer();

            $mdDialog.show({
                controller: params.controller,
                controllerAs: 'vm',
                bindToController: true,
                locals: params.locals,
                templateUrl: params.template,
                parent: angular.element(document.body),
                clickOutsideToClose: false
            }).then(defer.resolve, defer.reject);

            return defer.promise;
        }
    }

})();