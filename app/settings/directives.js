(function ()  {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Settings.Directives', []);

    /**
     * Directive initializations.
     */
    angular.module('Settings.Directives')
        .directive('userSettings', userSettings)
        .directive('dangerZone', dangerZone)
        .directive('appSettings', appSettings)
    ;

    ///////////////

    /**
     * Directive for the user settings dialog.
     *
     * @returns {*}
     */
    function userSettings () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/settings/partials/user-settings.html',
            controller: 'Settings.UserSettingsController',
            controllerAs: 'vm',
            scope: true,
            bindToController: true
        };
    }

    /**
     * Directive for the danger zone dialog.
     *
     * @returns {*}
     */
    function dangerZone () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/settings/partials/danger-zone.html',
            controller: 'Settings.DangerZoneController',
            controllerAs: 'vm',
            scope: true,
            bindToController: true
        };
    }

    /**
     * Directive for the danger zone dialog.
     *
     * @returns {*}
     */
    function appSettings () {
        return {
            restrict: 'E',
            templateUrl: 'web/templates/settings/partials/app-settings.html',
            controller: 'Settings.AppSettingsController',
            controllerAs: 'vm',
            scope: true,
            bindToController: true
        };
    }
})();