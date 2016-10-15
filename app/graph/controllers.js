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

        vm.endDateTime = new Date();
        vm.startDateTime = new Date().setDate(vm.endDateTime.getDate() - 1);

        vm.graphTypes = GraphDataService.getGraphTypes();

        /**
         * Initialize the interface's data.
         */
        vm.init = function init () {
            GraphDataService
                .getColumns()
                .then(onSuccess);

            function onSuccess (data) {
                vm.columns = data.data;
            }
        };

        vm.init();
    }

})();