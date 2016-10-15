(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('App.Directives', []);

    /**
     * Directive initializations.
     */
    angular.module('App.Directives')
        .directive('loader', loader)
        .directive('dateTimePicker', dateTimePicker)
        .directive('dateTimePickerPopup', dateTimePickerPopup)
    ;

    ////////////////////

    /**
     * Loader directive to be used where ever you need.
     *
     * @returns {*}
     */
    function loader () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/partials/loader.html'
        };
    }

    /**
     * Wrapper directive for the date time picker popup input.
     *
     * @returns {*}
     */
    function dateTimePicker () {
        return {
            restrict: 'E',
            require: 'ngModel',
            scope: {
                ngModel: '=',
                label: '@',
                format: '@'
            },
            templateUrl: 'web/templates/partials/date-time-picker.html',
            controller: function () {},
            controllerAs: 'vm',
            bindToController: true
        }
    }

    dateTimePickerPopup.$inject = ['$mdDialog', '$filter'];

    /**
     * Directive for the date time picker popup input.
     *
     * @param  {*}  $mdDialog
     * @param  {*}  $filter
     *
     * @returns {*}
     */
    function dateTimePickerPopup ($mdDialog, $filter) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModelCtrl) {
                element.on('focus', function(){
                    $mdDialog.show({
                        parent: angular.element(document.querySelector('body')),
                        templateUrl: 'web/templates/partials/date-time-picker-modal.html',
                        controller: 'DateTimePickerPopupController',
                        controllerAs: 'vm',
                        locals: {
                            date: ngModelCtrl.$modelValue
                        },
                        show: true
                    }).then(function (newDate) {
                        ngModelCtrl.$setViewValue(newDate);
                        ngModelCtrl.$render();

                        element.val($filter('date')(newDate, 'd.M.yyyy HH:mm'));
                    });
                });
            }
        };
    }
})();