(function () {
    'use strict';

    /**
     * Main module initialization.
     */
    angular.module('Settings.Controllers', []);

    /**
     * Controller initializations.
     */
    angular.module('Settings.Controllers')
        .controller('Settings.UserSettingsController', UserSettingsController)
    ;

    ///////////////

    /**
     * The controller for the user settings.
     *
     * @constructor
     */
    function UserSettingsController () {
        var vm = this;
    }

})();