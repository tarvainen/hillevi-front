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
        .directive('dialogBase', dialogBase)
        .directive('ifSetting', ifSetting)
        .directive('enabledIfSetting', enabledIfSetting)
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

    /**
     * Directive for the base dialog.
     *
     * @returns {*}
     */
    function dialogBase () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/partials/dialog-base.html',
            controller: 'DialogBaseController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true,
            transclude: true,
            scope: {
                onSave: '=',
                onCancel: '=',
                title: '@',
                okButton: '@',
                backButton: '@'
            }
        };
    }

    ifSetting.$inject = ['UISettingService'];

    /**
     * Directive to hide elements due to the user's settings.
     *
     * @returns {*}
     */
    function ifSetting (UISettingService) {
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, el, attrs) {
            UISettingService.check(attrs.ifSetting, el[0]);
        }
    }

    enabledIfSetting.$inject = ['UISettingService'];

    /**
     * Directive to disable elements due to the user's settings.
     *
     * @returns {*}
     */
    function enabledIfSetting (UISettingService) {
        return {
            restrict: 'A',
            link: link
        };

        function link (scope, el, attrs) {
            UISettingService.check(attrs.enabledIfSetting, el[0], true);
        }
    }

})();