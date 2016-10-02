(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiManager.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('ApiManager.Controllers')
        .controller('ApiManager.MainController', MainController)
    ;

    ////////////////////

    MainController.$inject = ['api', '$toast'];

    /**
     * Main controller for the api manager interface.
     *
     * @param   {*} api
     * @param   {*} $toast
     *
     * @constructor
     */
    function MainController (api, $toast) {
        var vm = this;

        /**
         * Loads the interface data to the ui.
         */
        vm.load = function load () {
            vm.loading = true;

            vm.selected = [];

            api.route('interface/all')
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            /**
             * Called when the data fetch is succeeded.
             *
             * @param {*} data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called on the data fetch fail.
             */
            function onError () {
                $toast('DATA_FETCH_FAILED');
            }

            /**
             * Called after the query is completed.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();