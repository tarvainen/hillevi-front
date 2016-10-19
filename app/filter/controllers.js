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
        .controller('DateTimeRangeInputController', DateTimeRangeInputController)
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

        $scope.$watch('vm.date', dateWatcher);
        $scope.$watch('vm.hours', hourWatcher);
        $scope.$watch('vm.minutes', minuteWatcher);
        $scope.$watch('vm.ngModel', modelWatcher);

        /**
         * Watcher for the date input.
         *
         * @param valueNew
         */
        function dateWatcher (valueNew) {
            if (valueNew) {
                if (!(vm.ngModel instanceof Date)) {
                    vm.ngModel = new Date();
                }

                vm.ngModel.setDate(valueNew.getDate());
                vm.ngModel.setMonth(valueNew.getMonth());
                vm.ngModel.setFullYear(valueNew.getFullYear());
            }
        }

        /**
         * Watcher for the hours.
         */
        function hourWatcher (valueNew, valueOld) {
            if (valueNew === valueOld) {
                return;
            }

            vm.hours = map(vm.hours, 0, 23);
            vm.ngModel.setHours(vm.hours);
            vm.hours = vm.hours.pad(2);
        }

        /**
         * Watcher for the minutes.
         */
        function minuteWatcher (valueNew, valueOld) {
            if (valueNew === valueOld) {
                return;
            }

            vm.minutes = map(vm.minutes, 0, 59);
            vm.ngModel.setMinutes(vm.minutes);
            vm.minutes = vm.minutes.pad(2);
        }

        /**
         * Watch for the model changes.
         *
         * @param {Date} valueNew
         * @param {Date} valueOld
         */
        function modelWatcher (valueNew, valueOld) {
            if (valueNew === valueOld) {
                return;
            }

            vm.date = valueNew;
            vm.hours = valueNew.getHours().pad(2);
            vm.minutes = valueNew.getMinutes().pad(2);
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

            if (isNaN(value)) {
                value = 0;
            }

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

    DateTimeRangeInputController.$inject = ['$scope'];

    /**
     * Controller for the date time range input directive.
     *
     * @param {*} $scope
     *
     * @constructor
     */
    function DateTimeRangeInputController ($scope) {
        var vm = this;

        vm.ranges = [];

        $scope.$watch('vm.dateRangePreSelect', preselectWatcher);
        $scope.$watch('vm.startDateTime', dateTimeWatcher, true);
        $scope.$watch('vm.endDateTime', dateTimeWatcher, true);

        /**
         * Watcher for the preselect.
         *
         * @param {string} valueNew
         * @param {string} valueOld
         */
        function preselectWatcher (valueNew, valueOld) {
            if (!vm.ranges || valueNew === valueOld) {
                return;
            }

            var selected = vm.ranges.find(function find (item) {
                return item.id === parseInt(valueNew);
            });

            if (selected) {
                vm.startDateTime = new Date(selected.start);
                vm.endDateTime = new Date(selected.end);
            }
        }

        /**
         * Try to find the matching date range from the preselect list. If this matching item
         * is found we will be select that so it will pop up in to the preselect list as a selected item.
         *
         * @param {string} valueNew
         * @param {string} valueOld
         */
        function dateTimeWatcher (valueNew, valueOld) {
            if (!vm.ranges || valueNew === valueOld || !vm.startDateTime || !vm.endDateTime) {
                vm.dateRangePreSelect = -1;
                return;
            }

            var same = vm.ranges.find(function find (item) {
                return new Date(item.start).getTime() === new Date(vm.startDateTime).getTime() &&
                    new Date(item.end).getTime() === new Date(vm.endDateTime).getTime();
            });

            if (!same) {
                vm.dateRangePreSelect = -1;
            } else {
                vm.dateRangePreSelect = same.id;
            }
        }
    }

})();