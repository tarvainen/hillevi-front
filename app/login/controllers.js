(function () {
    'use strict';

    angular.module('LoginApp.Controllers', []);

    angular.module('LoginApp.Controllers')
        .controller('MainController', MainController)
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
                $toast('Fill all the required fields.'); // TODO: translation
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
                $toast('Logged in'); // TODO: translation
            }

            /**
             * Handle error.
             *
             * @param   {*} data
             */
            function onError (data) {
                $toast('Login failed'); // TODO: translation
            }
        };
    }

})();