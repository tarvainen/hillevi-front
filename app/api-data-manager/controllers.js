(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('ApiDataManager.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('ApiDataManager.Controllers')
        .controller('ApiDataManager.MainController', MainController)
    ;

    //////////////////

    MainController.$inject = ['api', '$toast', '$q'];

    /**
     * Main controller for the api data manager interface.
     *
     * @param {*}   api
     * @param {*}   $toast
     * @param {*}   $q
     *
     * @constructor
     */
    function MainController (api, $toast, $q) {
        var vm = this;

        vm.selected = [];

        /**
         * Function for fetching APIs for the select input.
         */
        vm.fetchApis = function fetchApis () {
            vm.apis = [];
            vm.selectedApi = null;
            vm.loading = true;

            api.route('interface/all')
                .then(onSuccess, onError)
                .finally(onDone)
            ;

            /**
             * Called when the list of APIs is fetched successfully.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                vm.apis = data.data;
            }
        };

        /**
         * Loads the api's data when the api selection is changed.
         */
        vm.loadData = function loadData () {
            vm.data = [];
            vm.columns = [];
            vm.selectedColumns = [];

            var params = {
                id: vm.selectedApi
                // TODO add pager data
            };

            var dataCall = api.route('interface/data', params);
            var metaCall = api.route('interface/schema', params);

            $q.all([dataCall, metaCall])
                .then(onData, onError)
                .finally(onDone)
            ;

            /**
             * Called when the api's data is fetched.
             *
             * @param {*}   data
             */
            function onData (data) {
                vm.data = data[0].data;
                vm.columns = data[1].data;
            }
        };

        /**
         * Called when the data fetch is failed.
         */
        function onError () {
            $toast('DATA_FETCH_FAILED');
        }

        /**
         * Called when the query is done completely.
         */
        function onDone () {
            vm.loading = false;
        }

        vm.fetchApis();
    }

})();