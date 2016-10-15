(function () {
    'use strict';

    angular.module('Graph.Controllers', []);

    angular.module('Graph.Controllers')
        .controller('Graph.MainController', MainController)
    ;

    ////////////////

    MainController.$inject = ['GraphDataService'];

    /**
     * Main controller for the graph interface.
     *
     * @constructor
     */
    function MainController (GraphDataService) {
        var vm = this;

        vm.columns = [];
        vm.graphTypes = GraphDataService.getGraphTypes();

        // TODO: remove this and make everything goooood!
        vm.data = {
            labels: ['ma', 'ti', 'ke', 'to', 'pe'],
            data: [[1, 2, 3, 2, 1], [2,6,1,2,6]]
        };

        /**
         * Initialize the interface's data.
         */
        vm.init = function init () {
            GraphDataService
                .getColumns()
                .then(onSuccess);

            function onSuccess (data) {
                vm.columns = data.data;

                vm.reset();
            }
        };

        /**
         * Load data by the settings.
         */
        vm.load = function load () {
            vm.loading = true;

            GraphDataService.getData(vm.graph)
                .then(onSuccess)
                .finally(onDone)
            ;

            /**
             * Called when the data fetch is done.
             *
             * @param {*}   data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called after the query is done.
             */
            function onDone () {
                vm.loading = false;
            }
        };

        /**
         * Reset the search setting.
         */
        vm.reset = function reset () {
            vm.graph = {};
            vm.endDateTime = new Date();
            vm.startDateTime = new Date().setDate(vm.endDateTime.getDate() - 1);
        };

        vm.init();
    }

})();