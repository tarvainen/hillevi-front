(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Filters.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Filters.Controllers')
        .controller('GenericFilterController', GenericFilterController)
    ;

    ///////////

    GenericFilterController.$inject = ['$scope', 'FilterDataService', '$timeout'];

    /**
     * Controller for the generic filter.
     *
     * @param  {*} $scope
     * @param  {*} FilterDataService
     * @param  {*} $timeout
     *
     * @constructor
     */
    function GenericFilterController ($scope, FilterDataService, $timeout) {
        var vm = this;

        vm.load = function load () {
            FilterDataService
                .getOptions(vm.action)
                .then(onSuccess)
            ;

            function onSuccess (data) {
                $timeout(function () {
                    vm.options = data.data;
                    vm.collection = vm.options;
                });
            }
        };

        $scope.$on('reloadFilters', vm.load);

        vm.load();
    }

})();