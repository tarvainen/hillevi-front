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
        .controller('DateTimeInputController', DateTimeInputController)
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

    DateTimeInputController.$inject = ['$scope'];

    /**
     * Controller for the date input.
     *
     * @param $scope
     * @constructor
     */
    function DateTimeInputController ($scope) {
        var vm = this;

        $scope.$watch('vm.date', createDate);
        $scope.$watch('vm.hours', hourWatcher);
        $scope.$watch('vm.minutes', minuteWatcher);

        /**
         * Watcher for the hours.
         *
         * @param {string} valueNew
         */
        function hourWatcher (valueNew) {
            valueNew = valueNew || 0;
            vm.hours = map(valueNew, 0, 23);

            createDate();
        }

        /**
         * Watcher for the minutes.
         *
         * @param {string} valueNew
         */
        function minuteWatcher (valueNew) {
            valueNew = valueNew || 0;
            vm.minutes = map(valueNew, 0, 59);

            createDate();
        }

        /**
         * Create date from different elements.
         */
        function createDate () {
            if (!vm.date) {
                vm.ngModel = null;
                vm.hours = '';
                vm.minutes = '';

                return;
            }

            vm.minutes = vm.minutes || 0;
            vm.hours = vm.hours || 0;

            vm.ngModel = angular.copy(vm.date);
            vm.ngModel.setHours(map(vm.hours, 0, 23));
            vm.ngModel.setMinutes(map(vm.minutes, 0, 59));

            vm.minutes = parseInt(vm.minutes).pad(2);
            vm.hours = parseInt(vm.hours).pad(2);
        }

        /**
         * Maps value between min and max.
         *
         * @param {Number|string} value
         * @param {Number|string} min
         * @param {Number|string} max
         *
         * @returns {Number|*}
         */
        function map (value, min, max) {
            value = parseInt(value);

            if (value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }

            return value;
        }

        /**
         * Initialize inputs.
         */
        vm.init = function init () {
            if (vm.ngModel instanceof Date) {
                vm.date = vm.ngModel;
                vm.hours = vm.ngModel.getHours();
                vm.minutes = vm.ngModel.getMinutes();
            } else {
                vm.date = '';
                vm.minutes = '';
                vm.hours = '';
            }
        };

        vm.init();
    }

})();