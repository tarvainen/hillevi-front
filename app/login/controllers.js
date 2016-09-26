(function () {
    'use strict';

    angular.module('LoginApp.Controllers', []);

    angular.module('LoginApp.Controllers')
        .controller('MainController', MainController)
    ;

    /////////////

    /**
     * Main controller for the login application.
     *
     * @constructor
     */
    function MainController () {
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

            console.log('login not implemented!');
        };
    }

})();