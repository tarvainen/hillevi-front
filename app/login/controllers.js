(function () {
    'use strict';

    angular.module('LoginApp.Controllers', []);

    angular.module('LoginApp.Controllers')
        .controller('MainController', MainController)
    ;

    /////////////

    MainController.$inject = ['$scope', '$location', 'api'];

    /**
     * Main controller for the login application.
     *
     * @param   {*} $scope
     * @param   {*} $location
     * @param   {*} api
     *
     * @constructor
     *
     * @ngInject
     */
    function MainController ($scope, $location, api) {
        var vm = this;

        vm.form = {};

        /**
         * Does the authentication.
         *
         * @returns {boolean}
         */
        vm.login = function login () {
            if (!vm.form.username || !vm.form.password) {
                // TODO: make error
                console.log('not enough params');
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
                // TODO: handle error
            }
        };
    }

})();