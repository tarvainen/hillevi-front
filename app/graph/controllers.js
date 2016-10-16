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
        vm.scales = GraphDataService.getGraphScales();

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
            vm.data = {};

            vm.graph.chartType = vm.graphTypes[vm.chartType];
            vm.graph.scale = vm.scales[vm.scale];

            var params = angular.copy(vm.graph);

            GraphDataService.getData(params)
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
            vm.graph = {
                chartType: 0
            };

            vm.data = {};
            vm.graph.endDateTime = new Date();
            vm.graph.startDateTime = new Date(new Date().setDate(vm.graph.endDateTime.getDate() - 1));
        };

        vm.init();
    }

})();