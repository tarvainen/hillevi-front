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
            bindToController: true
        };
    }
})();