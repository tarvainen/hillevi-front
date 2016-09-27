(function () {
    'use strict';

    angular.module('Login.Controllers', []);

    angular.module('Login.Controllers')
        .controller('Login.MainController', MainController)
    ;

    /////////////

    MainController.$inject = ['$scope', '$location', 'api', 'DataService', '$toast'];

    /**
     * Main controller for the login application.
     *
     * @param   {*} $scope
     * @param   {*} $location
     * @param   {*} api
     * @param   {*} DataService
     * @param   {*} $toast
     *
     * @constructor
     *
     * @ngInject
     */
    function MainController ($scope, $location, api, DataService, $toast) {
        var vm = this;

        vm.form = {};
        
        DataService.storage.set('jwt', null);

        /**
         * Does the authentication.
         *
         * @returns {boolean}
         */
        vm.login = function login () {
            if (!vm.form.username || !vm.form.password) {
                $toast('FILL_ALL_REQUIRED_FIELDS'); // TODO: translation
                return false;
            }

            /**
             * Do the query.
             */
            api.route('auth/login', vm.form)
                .then(onSuccess, onError)
            ;

            /**
             * Handle succession.
             *
             * @param  {*}  data
             */
            function onSuccess (data) {
                $scope.$emit('authChanged', data.data);
                $location.path('/');
            }

            /**
             * Handle error.
             *
             * @param   {*} data
             */
            function onError (data) {
                $toast('LOGIN_FAILED'); // TODO: translation
            }
        };
    }

})();