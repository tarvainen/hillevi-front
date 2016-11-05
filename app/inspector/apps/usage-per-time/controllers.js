(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Apps.UsagePerTime.Controllers', []);

    /**
     * Main module initialization.
     */
    angular.module('Inspector.Apps.UsagePerTime.Controllers')
        .controller('UsagePerTimeMainController', UsagePerTimeMainController)
    ;

    ///////////////

    UsagePerTimeMainController.$inject = ['InspectorAppsDataService'];

    /**
     * Main controller for the interface.
     *
     * @constructor
     */
    function UsagePerTimeMainController (InspectorAppsDataService) {
        var vm = this;

        vm.loading = false;

        vm.chartOptions = {
            scales: {
                xAxes: [{
                    stacked: true
                }],
                yAxes: [{
                    stacked: true
                }]
            }
        };

        /**
         * Load the data for the interface throughout this function.
         */
        vm.load = function load () {
            vm.loading = true;

            var apps = [];

            /**
             * We are using the application names to match with the search results.
             * That's just because we can never be sure what the application name will be
             * because that is just always going to be different with different operating systems.
             *
             * In other words the separate application table will be worth of nothing.
             */
            vm.apps.map(function (app) {
                if (vm.form.apps.indexOf(app.id) >= 0) {
                    apps.push(app.name);
                }
            });

            var params = angular.extend({}, vm.filters, { apps: apps });

            InspectorAppsDataService
                .getUsagePerTime(params)
                .then(onSuccess)
                .finally(onDone);

            /**
             * Called when the data is fetched successfully.
             *
             * @param data
             */
            function onSuccess (data) {
                vm.data = data.data;
            }

            /**
             * Called always after the data fetch is over.
             */
            function onDone () {
                vm.loading = false;
            }
        };
    }

})();