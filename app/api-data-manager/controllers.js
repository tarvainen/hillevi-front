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

    MainController.$inject = ['api', '$toast'];

    /**
     * Main controller for the api data manager interface.
     *
     * @param {*}   api
     * @param {*}   $toast
     *
     * @constructor
     */
    function MainController (api, $toast) {
        var vm = this;

        /**
         * Function for fetching APIs for the select input.
         */
        vm.fetchApis = function fetchApis () {
            vm.apis = [];
            vm.selectedApi = null;

            api.route('interface/all')
                .then(onSuccess, onError)
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
         * Called when the data fetch is failed.
         */
        function onError () {
            $toast('DATA_FETCH_FAILED');
        }
    }

})();