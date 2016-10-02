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

        vm.selected = [];

        /**
         * Loads the interface data to the ui.
         */
        vm.load = function load () {
            vm.loading = true;

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

        /**
         * Fires when the row is selected.
         *
         * @param {*}   row
         */
        vm.onSelect = function onSelect (row) {
            if (!vm.selected.length <= 1) {
                vm.api = row;
            } else {
                vm.api = null;
            }
        };

        /**
         * Fires when the row is deselected.
         */
        vm.onDeselect = function onDeselect () {
            if (vm.selected.length === 1) {
                vm.api = vm.selected[0];
            } else {
                vm.api = null;
            }
        };

        /**
         * Fires when we cancel the api edition dialog.
         */
        vm.cancel = function cancel () {
            vm.api = null;
            vm.selected = [];
        };

        /**
         * Opens a new api creation tool.
         */
        vm.createNewApi = function createNewApi () {
            // TODO: implement
            $toast('NOT_IMPLEMENTED');
        };

        /**
         * Removes all selected apis.
         */
        vm.removeApis = function () {
            // TODO: implement
            $toast('NOT_IMPLEMENTED');
        };
    }

})();