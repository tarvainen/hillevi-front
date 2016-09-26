(function () {
    'use strict';

    angular.module('LoginApp.Controllers', []);

    angular.module('LoginApp.Controllers')
        .controller('MainController', MainController)
    ;

    /////////////

    MainController.$inject = ['$scope', 'api'];

    /**
     * Main controller for the login application.
     *
     * @param   {*} $scope
     * @param   {*} api
     *
     * @constructor
     *
     * @ngInject
     */
    function MainController ($scope, api) {
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
                $scope.$emit('authChanged');
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